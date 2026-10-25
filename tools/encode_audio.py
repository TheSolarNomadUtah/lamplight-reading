# Re-encode every audio/**/<name>.opus from its <name>.mp3 source: no boost, true-peak safe (<= -1.5 dBTP).
# Also limits any MP3 that is over -1.5 dBTP. Usage: python3 tools/encode_audio.py
import subprocess,re,os,sys,glob,json
from concurrent.futures import ThreadPoolExecutor
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));A=os.path.join(R,'audio')
def tp(f):
  o=subprocess.run(['ffmpeg','-nostats','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
  m=re.findall(r'Peak:\s+(-?[\d.]+|-inf)',o);i=re.findall(r'I:\s+(-?[\d.]+)',o)
  return (float(m[-1]) if m and m[-1]!='-inf' else -99.0),(float(i[-1]) if i else None)
def enc(src,dst,gain,opus):
  af=f'aresample=48000,volume={gain}dB,alimiter=limit=0.708:attack=1:release=50:level=false'  # -3 dBFS sample ceiling before the codec
  codec=['-c:a','libopus','-b:a','56k' if '/sing/' in src else '32k','-vbr','on','-application','audio' if '/sing/' in src else 'voip'] if opus else ['-c:a','libmp3lame','-b:a','96k' if '/sing/' in src else '40k','-ar','44100' if '/sing/' in src else '24000']
  subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-af',af,'-ac','1',*codec,dst],check=True)
def job(src):
  out=[];dst=src[:-4]+'.opus';g=0.0
  for _ in range(4):
    enc(src,dst,g,True);p,_i=tp(dst)
    if p<=-1.5:break
    g-=(p+1.5)+0.3
  out.append((dst,p))
  p0,_=tp(src)
  if p0>-1.5:
    tmp=src[:-4]+'.tmp.mp3';g=0.0
    for _ in range(4):
      enc(src,tmp,g,False);p,_i=tp(tmp)
      if p<=-1.5:break
      g-=(p+1.5)+0.3
    os.replace(tmp,src);out.append((src,p))
  return out
srcs=sorted(glob.glob(A+'/**/*.mp3',recursive=True))
with ThreadPoolExecutor(16) as ex:res=[x for r in ex.map(job,srcs) for x in r]
print('encoded',len(res),'max TP among re-encoded',max(p for _,p in res))
