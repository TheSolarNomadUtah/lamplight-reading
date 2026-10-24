import json,re,subprocess,os,sys,soundfile as sf
from kokoro_onnx import Kokoro
os.chdir('/workspace/voices')
VOICE=sys.argv[1] if len(sys.argv)>1 else 'heart'
src=open('/workspace/reading-app/music-data.js').read()
M=json.loads(src[src.index('{'):src.rindex('}')+1])
out=f'/workspace/reading-app/audio/{VOICE}'; os.makedirs(out,exist_ok=True)
slug=lambda w:re.sub(r'[^a-z]','',w.lower())
jobs={}
for s in M['songs']:
  for l in s['lines']:
    for w in l.split(): jobs['w_'+slug(w)]=w.replace('|','').strip(',.!?')
for d in M['drum']:
  for w in d[1]: jobs['w_'+slug(w)]=w.replace('|','')
for L,snd,a,b in M['letters']:
  jobs['l_'+L.lower()]=f"{L} says {snd}, {snd}, {snd}. {a} and {b}!"
  jobs['w_'+slug(a)]=a; jobs['w_'+slug(b)]=b
k=Kokoro("kokoro-v1.0.onnx","voices-v1.0.bin")
for fn,t in jobs.items():
  p=f'{out}/{fn}.mp3'
  if os.path.exists(p): continue
  a,sr=k.create(t,voice='af_'+VOICE if '_' not in VOICE else VOICE,speed=0.9,lang='en-us')
  sf.write('/tmp/t.wav',a,sr)
  subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/t.wav','-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse','-ac','1','-ar','24000','-b:a','40k',p],check=True)
print(len(jobs),'files')
