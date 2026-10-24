# Lamplight v12 voice packs. Run with /workspace/voices/venv/bin/python tools/gen_voices.py [voice ...]
# Kokoro-82M (Apache-2.0). Makes spoken word/letter clips + sung songs (per-syllable pitch shift to the melody).
import json,re,subprocess,os,sys,numpy as np,soundfile as sf,librosa
from kokoro_onnx import Kokoro
APP='/workspace/reading-app'; os.chdir('/workspace/voices')
VOICES={'heart':('af_heart','en-us',0),'bella':('af_bella','en-us',0),'michael':('am_michael','en-us',-12),
 'emma':('bf_emma','en-gb',0),'puck':('am_puck','en-us',-12),'nicole':('af_nicole','en-us',0)}
src=open(APP+'/music-data.js').read(); M=json.loads(src[src.index('{'):src.rindex('}')+1])
v10=open(APP+'/v10.js').read()
CARDW=re.findall(r"\['(?:animals|home|sky|food|body|feel)','([a-z]+)'",v10)
SIGHT='the a is i see can look it in on and to we my you go up me like here said was he she they are for of'.split()
PHR={'p_yes':'Yes!','p_try':'Good try. Pick another one.','p_great':'Great job!','p_read':'You read it! Great job!','p_sample':'Hi! I can read with you. Mmm, moon. Once upon a time, a little fox named Dot found a big red box.'}
slug=lambda w:re.sub(r'[^a-z]','',w.lower())
def jobs():
  J={}
  for s in M['songs']:
    for l in s['lines']:
      for w in l.split(): J['w_'+slug(w)]=w.replace('|','').strip(',.!?')
  for d in M['drum']:
    for w in d[1]: J['w_'+slug(w)]=w.replace('|','')
  for L,snd,a,b in M['letters']:
    J['l_'+L.lower()]=f"{L} says {snd}, {snd}, {snd}. {a} and {b}!"; J['n_'+L.lower()]=L+'.'
    J['w_'+slug(a)]=a; J['w_'+slug(b)]=b
  for w in CARDW+SIGHT: J['w_'+slug(w)]=w
  J.update(PHR); return J
def enc(wav,sr,p,af=None):
  sf.write('/tmp/g.wav',wav,sr)
  a=['ffmpeg','-loglevel','error','-y','-i','/tmp/g.wav']+(['-af',af] if af else [])+['-ac','1','-ar','24000','-b:a','32k',p]
  subprocess.run(a,check=True)
TRIM='silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
def rb(p,sr,rate,st):
  sf.write('/tmp/rb.wav',p,sr); subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/rb.wav','-af',f'rubberband=tempo={rate}:pitch={2**(st/12)}','/tmp/rb2.wav'],check=True); return sf.read('/tmp/rb2.wav')[0]
def sing(k,vid,lang,octv,s,out):
  b=60/s['bpm']; notes=[(int(x.split(':')[0]),float(x.split(':')[1]) if ':' in x else 1.) for x in s['notes'].split()]
  words=[(w.replace('|','').strip(',.!?'),len(w.split('|'))) for l in s['lines'] for w in l.split()]
  sr=24000; tot=sum(d for _,d in notes)*b+2; mix=np.zeros(int(tot*sr)); t=0; ni=0
  for w,ns in words:
    a,_=k.create(w,voice=vid,speed=0.9,lang=lang); a,_=librosa.effects.trim(a,top_db=40)
    parts=np.array_split(a,ns)
    for p in parts:
      if len(p)<4096: p=np.pad(p,(0,4096-len(p)))
      m,d=notes[ni]; ni+=1; dur=d*b*0.95
      f0=librosa.yin(p,fmin=70,fmax=500,sr=sr) if len(p)>2048 else np.array([200.])
      f=np.median(f0); tgt=librosa.midi_to_hz(m+octv); st=float(np.clip(12*np.log2(tgt/f),-14,14))
      rate=float(np.clip(len(p)/(dur*sr),0.35,2.5)); p=np.nan_to_num(p).astype(np.float32)
      try:
        y=librosa.effects.time_stretch(p,rate=rate); lead=librosa.effects.pitch_shift(y,sr=sr,n_steps=st); harm=librosa.effects.pitch_shift(y,sr=sr,n_steps=st+4)
      except Exception:
        y=rb(p,sr,rate,0); lead=rb(p,sr,rate,st); harm=rb(p,sr,rate,st+4); n=min(len(lead),len(harm)); lead,harm=lead[:n],harm[:n]
      y=lead+0.22*harm; n=len(y); env=np.minimum(1,np.minimum(np.arange(n)/(.02*sr),(n-np.arange(n))/(.06*sr)))
      i=int(t*sr); mix[i:i+n]+=(y*env)[:len(mix)-i]; t+=d*b
  mix/=max(1e-6,np.abs(mix).max())/0.8
  enc(mix,sr,out,'aecho=0.8:0.6:60|140:0.25|0.15,lowpass=f=7000')
for V in (sys.argv[1:] or VOICES):
  vid,lang,octv=VOICES[V]; out=f'{APP}/audio/{V}'; os.makedirs(out,exist_ok=True)
  k=Kokoro("kokoro-v1.0.onnx","voices-v1.0.bin"); J=jobs()
  for fn,t in J.items():
    p=f'{out}/{fn}.mp3'
    if os.path.exists(p): continue
    a,sr=k.create(t,voice=vid,speed=0.9,lang=lang); enc(a,sr,p,TRIM)
  for s in M['songs']:
    if s.get('notes'):
      p=f'{out}/s_{s["id"]}.mp3'
      if not os.path.exists(p): sing(k,vid,lang,octv,s,p)
  files=sorted(f for f in os.listdir(out) if f.endswith('.mp3'))
  json.dump(files,open(f'{out}/index.json','w')); print(V,len(files))
