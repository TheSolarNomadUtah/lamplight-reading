import os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));fs=[]
for d,_,n in os.walk(R):
  rel=os.path.relpath(d,R)
  if rel.startswith(('.git','tools')):continue
  for f in n:
    p=os.path.normpath(os.path.join(rel,f)).replace('\\','/')
    if f.endswith('.png') or (rel=='.' and f.endswith('.mp3')) or f in('offline.json','.nojekyll') or f.endswith('.md'):continue
    fs.append([p,os.path.getsize(os.path.join(d,f))])
fs.sort();fs.insert(0,['./',os.path.getsize(os.path.join(R,'index.html'))])
json.dump({'files':fs,'bytes':sum(x[1] for x in fs)},open(os.path.join(R,'offline.json'),'w'))
print(len(fs),sum(x[1] for x in fs)/1048576)
