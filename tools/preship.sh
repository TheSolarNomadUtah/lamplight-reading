#!/usr/bin/env bash
# Pre-ship checks for Lamplight Learning. Run before every push.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
fail=0

echo "== lang/*.json =="
shopt -s nullglob
lang_files=(lang/*.json)
if ((${#lang_files[@]}==0)); then
  echo "FAIL: no lang/*.json files found"
  exit 1
fi
for f in "${lang_files[@]}"; do
  if python3 -c "import json,sys; json.load(open(sys.argv[1],encoding='utf-8'))" "$f"; then
    echo "OK  $f"
  else
    echo "FAIL $f"
    fail=1
  fi
done

echo "== node --check (vNN.js, sw.js) =="
js_files=(v[0-9]*.js)
for extra in pack.js math.js; do if [[ -f $extra ]]; then js_files+=("$extra"); fi; done
if [[ -f sw.js ]]; then js_files+=(sw.js); fi
if ((${#js_files[@]}==0)); then
  echo "FAIL: no vNN.js files found"
  fail=1
fi
for f in "${js_files[@]}"; do
  if node --check "$f"; then
    echo "OK  $f"
  else
    echo "FAIL $f"
    fail=1
  fi
done

echo "== other JSON manifests =="
for f in version.json offline.json offline-opus.json manifest.webmanifest packs/index.json lyrics/*.json; do
  if [[ -f $f ]]; then
    if python3 -c "import json,sys; json.load(open(sys.argv[1],encoding='utf-8'))" "$f"; then
      echo "OK  $f"
    else
      echo "FAIL $f"
      fail=1
    fi
  fi
done

echo "== lyrics/luna_timings.json shape =="
if python3 - <<'PYCHK'
import json,sys
d=json.load(open('lyrics/luna_timings.json',encoding='utf-8'))
want={'m1':32,'m2':18,'m3':30,'m4':10,'m5':15,'m8':25,'m9':24,'m10':27,'m11':20}
bad=[]
for k,n in want.items():
    v=d.get(k)
    if not isinstance(v,list) or len(v)!=n: bad.append(f'{k}: expected {n} times, got {len(v) if isinstance(v,list) else v!r}');continue
    if not all(isinstance(x,(int,float)) and x>=0 for x in v): bad.append(f'{k}: non-numeric or negative time');continue
    if any(b<=a for a,b in zip(v,v[1:])): bad.append(f'{k}: times not strictly increasing')
for k in ('m6','m7'):
    if k in d: bad.append(f'{k} must stay glow-only (no timings)')
if bad:
    print('\n'.join(bad));sys.exit(1)
print('OK  lyrics/luna_timings.json (9 songs, counts and order)')
PYCHK
then :; else echo "FAIL lyrics/luna_timings.json shape"; fail=1; fi



echo "== core offline lang list =="
if python3 - <<'PYCHK'
import json,sys
for name in ('offline.json','offline-opus.json'):
    d=json.load(open(name,encoding='utf-8'))
    langs=sorted(p for p,_ in d['files'] if p.startswith('lang/'))
    if langs!=['lang/es.json']:
        print(name,'expected only lang/es.json, got',langs);sys.exit(1)
    if d['bytes']>=20971520:
        print(name,'over 20 MiB cap',d['bytes']);sys.exit(1)
    packs=[p for p,_ in d['files'] if p.startswith('packs/')]
    if packs not in (['packs/index.json'],[]):
        print(name,'unexpected pack files',packs);sys.exit(1)
print('OK  core offline save: only lang/es.json, under 20 MiB, no language packs')
PYCHK
then :; else echo "FAIL core offline lang list"; fail=1; fi

echo "== offline size caps (core 20 MiB, pack 25 MiB, total ~1 GiB) =="
# Ignacio's limits: 20 MiB core save, at most 25 MiB per optional pack,
# and about 1 GiB for core plus all packs. No packs are built in this tree yet.
if python3 - <<'PYCHK'
import json, os, sys
from pathlib import Path

CORE_CAP = 20_971_520
PACK_CAP = 26_214_400
TOTAL_CAP = 1_073_741_824

def is_hidden(rel):
    for part in str(rel).replace("\\", "/").split("/"):
        if part in ("", ".", ".."):
            continue
        if part.startswith("."):
            return True
    return False

def dir_size(root: Path) -> int:
    total = 0
    if not root.is_dir():
        return 0
    for f in root.rglob("*"):
        if not f.is_file():
            continue
        rel = f.relative_to(root).as_posix()
        if is_hidden(rel):
            continue
        total += f.stat().st_size
    return total

packs_root = Path("packs")
pack_dirs = []
if packs_root.is_dir():
    pack_dirs = sorted(
        p for p in packs_root.iterdir()
        if p.is_dir() and not p.name.startswith(".")
    )

pack_sizes = {}
for pdir in pack_dirs:
    pack_sizes[pdir.name] = dir_size(pdir)

over = [f"{name} {size} (cap {PACK_CAP})" for name, size in pack_sizes.items() if size >= PACK_CAP]
if over:
    print("optional pack over 25 MiB cap:", "; ".join(over))
    sys.exit(1)

packs_sum = sum(pack_sizes.values())
for name in ("offline.json", "offline-opus.json"):
    d = json.load(open(name, encoding="utf-8"))
    core = d["bytes"]
    if core >= CORE_CAP:
        print(name, "over 20 MiB core cap", core)
        sys.exit(1)
    total = core + packs_sum
    if total >= TOTAL_CAP:
        print(name, "core + packs over 1 GiB cap", total, "core", core, "packs", packs_sum)
        sys.exit(1)

n = len(pack_sizes)
print(
    f"OK  size caps: core under {CORE_CAP}, "
    f"{n} optional pack(s) each under {PACK_CAP}, "
    f"core + packs under {TOTAL_CAP}"
    + (f" (packs total {packs_sum})" if n else " (no optional packs built)")
)
PYCHK
then :; else echo "FAIL offline size caps"; fail=1; fi

echo "== manifest and precache paths exist in the deploy tree =="
if python3 - <<'PYCHK'
import json,os,re,sys

def is_hidden(rel):
    for part in str(rel).replace("\\","/").split("/"):
        if part in ("", ".", ".."):
            continue
        if part.startswith("."):
            return True
    return False

def exists(p):
    if p in ("./", ".", "", "/"):
        return os.path.isfile("index.html")
    return os.path.isfile(p)

bad=[]
for name in ("offline.json","offline-opus.json"):
    d=json.load(open(name,encoding="utf-8"))
    for path,_ in d["files"]:
        if is_hidden(path):
            bad.append(f"{name}: hidden path {path!r}")
        elif not exists(path):
            bad.append(f"{name}: missing {path!r}")

sw=open("sw.js",encoding="utf-8").read()
m=re.search(r"const F=\[(.*?)\];",sw,re.S)
if not m:
    bad.append("sw.js: could not parse precache list F")
else:
    urls=re.findall(r"'([^']*)'",m.group(1))
    if not urls:
        bad.append("sw.js: precache list F is empty")
    for path in urls:
        if is_hidden(path):
            bad.append(f"sw.js: hidden path {path!r}")
        elif not exists(path):
            bad.append(f"sw.js: missing {path!r}")

if bad:
    print("\n".join(bad)); sys.exit(1)
print("OK  every manifest and precache URL exists and is not a hidden path")
PYCHK
then :; else echo "FAIL manifest and precache path check"; fail=1; fi

echo "== calm meter =="
if python3 "$ROOT/gates/calm-meter/run.py"; then
  echo "OK  calm meter"
else
  echo "FAIL calm meter"
  fail=1
fi

if ((fail)); then
  echo "preship FAILED"
  exit 1
fi
echo "preship OK"
