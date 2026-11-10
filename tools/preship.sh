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
for f in version.json offline.json offline-opus.json manifest.webmanifest; do
  if [[ -f $f ]]; then
    if python3 -c "import json,sys; json.load(open(sys.argv[1],encoding='utf-8'))" "$f"; then
      echo "OK  $f"
    else
      echo "FAIL $f"
      fail=1
    fi
  fi
done

if ((fail)); then
  echo "preship FAILED"
  exit 1
fi
echo "preship OK"
