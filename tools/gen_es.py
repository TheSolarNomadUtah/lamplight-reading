# Spanish voice packs (Kokoro ef_dora, em_alex; Apache-2.0). Run with /workspace/voices/venv/bin/python tools/gen_es.py
import re,os,json,subprocess,unicodedata,soundfile as sf
from kokoro_onnx import Kokoro
APP='/workspace/reading-app'; os.chdir('/workspace/voices')
def slug(w): return re.sub(r'[^a-z]','',unicodedata.normalize('NFD',w.lower()).encode('ascii','ignore').decode())
src=open(APP+'/stories-es.js').read()
def arr(name):
  out=subprocess.run(['node','-e',src+f';console.log(JSON.stringify({name}))'],capture_output=True,text=True).stdout; return json.loads(out)
S,E,L,C=arr('ES_STORIES'),arr('ES_ECHO'),arr('ES_LETTERS'),arr('ES_CARDS')
NAMES={'A':'a','B':'be','C':'ce','CH':'che','D':'de','E':'e','F':'efe','G':'ge','H':'hache','I':'i','J':'jota','K':'ka','L':'ele','LL':'elle','M':'eme','N':'ene','Ñ':'eñe','O':'o','P':'pe','Q':'cu','R':'erre','S':'ese','T':'te','U':'u','V':'uve','W':'uve doble','X':'equis','Y':'ye','Z':'zeta'}
J={}
for s in S:
  for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+",s['text']): J['w_'+slug(w)]=w.lower()
for e in E:
  for l in e['lines']:
    for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]+",l): J['w_'+slug(w.replace('-',''))]=w.replace('-','').lower()
for w in 'sol pan luz mar flor pez luna gato casa perro oso mano camisa paloma tomate conejo mariposa chocolate elefante'.split(): J['w_'+w]=w
for w in C.values(): J['w_'+slug(w)]=w
for x,snd,a,b in L:
  J['l_'+x.lower()]=(f"La {NAMES[x]}. ¡{a.capitalize()} y {b}!" if not snd else f"La {NAMES[x]}. {snd}, {snd}, {snd}. ¡{a.capitalize()} y {b}!")
  J['n_'+x.lower()]=NAMES[x]; J['w_'+slug(a)]=a; J['w_'+slug(b)]=b
J.update({'p_yes':'¡Sí!','p_try':'Buen intento. Elige otra.','p_great':'¡Muy bien!','p_read':'¡Lo leíste! ¡Muy bien!','p_sample':'¡Hola! Puedo leer contigo. Mmm, la luna. Había una vez una zorrita llamada Dot.'})
k=Kokoro("kokoro-v1.0.onnx","voices-v1.0.bin")
for V,vid in [('dora','ef_dora'),('alex','em_alex')]:
  out=f'{APP}/audio/{V}'; os.makedirs(out,exist_ok=True)
  for fn,t in J.items():
    p=f'{out}/{fn}.mp3'
    if os.path.exists(p): continue
    a,sr=k.create(t,voice=vid,speed=0.9,lang='es'); sf.write('/tmp/e.wav',a,sr)
    subprocess.run(['ffmpeg','-loglevel','error','-y','-i','/tmp/e.wav','-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse','-ac','1','-ar','24000','-b:a','32k',p],check=True)
  json.dump(sorted(f for f in os.listdir(out) if f.endswith('.mp3')),open(out+'/index.json','w'),ensure_ascii=False); print(V,len(J))
