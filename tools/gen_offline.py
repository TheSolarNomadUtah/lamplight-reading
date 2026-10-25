# Writes offline.json (MP3 audio) and offline-opus.json (Opus audio). Non-audio files are in both; each device downloads only its own format.
import os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));fs=[]
for d,_,n in os.walk(R):
  rel=os.path.relpath(d,R)
  if rel.startswith(('.git','tools')):continue
  for f in n:
    p=os.path.normpath(os.path.join(rel,f)).replace('\\','/')
    if f.endswith('.png') or (rel=='.' and f.endswith('.mp3')) or f in('offline.json','offline-opus.json','.nojekyll') or f.endswith('.md'):continue
    fs.append([p,os.path.getsize(os.path.join(d,f))])
fs.sort();fs.insert(0,['./',os.path.getsize(os.path.join(R,'index.html'))])
for name,skip in (('offline.json','.opus'),('offline-opus.json','.mp3')):
  L=[x for x in fs if not (x[0].startswith('audio/') and x[0].endswith(skip))]
  json.dump({'files':L,'bytes':sum(x[1] for x in L)},open(os.path.join(R,name),'w'))
  print(name,len(L),round(sum(x[1] for x in L)/1048576,2),'MB')
