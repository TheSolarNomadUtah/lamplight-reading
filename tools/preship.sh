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
for f in version.json offline.json offline-opus.json manifest.webmanifest lyrics/*.json; do
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

if ((fail)); then
  echo "preship FAILED"
  exit 1
fi
echo "preship OK"
