# Writes offline.json (MP3 audio) and offline-opus.json (Opus audio). Non-audio files are in both; each device downloads only its own format.
import os,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));fs=[]

def is_hidden(rel):
  """True if any path component is a dotfile or dotdir (.git, .gitignore, ...). The walk root '.' is not hidden."""
  for part in str(rel).replace('\\','/').split('/'):
    if part in ('', '.', '..'):
      continue
    if part.startswith('.'):
      return True
  return False

for d,_,n in os.walk(R):
  rel=os.path.relpath(d,R)
  if is_hidden(rel):
    continue
  top=(rel.replace('\\','/').split('/')[0] if rel!='.' else '')
  if top in ('tools','gates'):
    continue
  for f in n:
    if is_hidden(f):
      continue
    p=os.path.normpath(os.path.join(rel,f)).replace('\\','/')
    if p.startswith('./'):
      p=p[2:]
    if is_hidden(p):
      continue
    if f.endswith('.png') or (rel=='.' and f.endswith('.mp3')) or f in('offline.json','offline-opus.json','CNAME') or (f.endswith('.md') and f!='LICENSES.md'):continue
    # Core save is English + Spanish only. Hidden lang stubs and optional
    # language packs stay out of the 15 MiB bundle (packs/index.json stays,
    # so the app can see that no packs are installed).
    if p.startswith('lang/') and p!='lang/es.json':continue
    if p.startswith('packs/') and p!='packs/index.json':continue
    fs.append([p,os.path.getsize(os.path.join(d,f))])
fs.sort();fs.insert(0,['./',os.path.getsize(os.path.join(R,'index.html'))])
for name,skip in (('offline.json','.opus'),('offline-opus.json','.mp3')):
  L=[x for x in fs if not (x[0].startswith('audio/') and x[0].endswith(skip))]
  json.dump({'files':L,'bytes':sum(x[1] for x in L)},open(os.path.join(R,name),'w'))
  print(name,len(L),round(sum(x[1] for x in L)/1048576,2),'MB')
