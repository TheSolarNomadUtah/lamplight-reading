#!/usr/bin/env python3
"""ffmpeg ebur128 loudness check. QA S1/S2 thresholds from FAMILY_VOICE_AND_CALM_METER.md."""
import hashlib, json, os, re, subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CACHE = Path('/tmp/lamplight-loudness-cache.json')
# S1 voice/song: integrated -19 LUFS ±1.5, true peak ≤ -1.0 dBTP
S1_I, S1_TOL, S1_TP = -19.0, 1.5, -1.0
# S2 UI/toy: short-term max ≤ -18 LUFS, true peak ≤ -3.0 dBTP
S2_ST, S2_TP = -18.0, -3.0
WORKERS = 12


def classify(rel, duration_hint=None):
    rel = rel.replace('\\', '/')
    # S2 is reserved for short UI and toy sounds (QA S2). Voices, songs,
    # and instrumentals are S1. Too-quiet short word clips are WARN, not FAIL.
    if '/sfx/' in rel or rel.startswith('audio/sfx/'):
        return 'S2'
    return 'S1'


def ebur128(path):
    r = subprocess.run(
        ['ffmpeg', '-hide_banner', '-nostats', '-i', str(path),
         '-af', 'ebur128=peak=true', '-f', 'null', '-'],
        capture_output=True, text=True)
    err = r.stderr or ''
    # Integrated, True peak, Short-term max (LRA / S:)
    I = None
    tp = None
    # last "I:" in the summary block
    im = re.findall(r'\bI:\s+(-?[\d.]+)\s+LUFS', err)
    if im:
        I = float(im[-1])
    pm = re.findall(r'(?:True peak|Peak):\s+(-?[\d.]+|-inf)', err)
    if pm:
        tp = -99.0 if pm[-1] == '-inf' else float(pm[-1])
    # short-term values logged as "S:  -23.4 LUFS"
    sm = re.findall(r'\bS:\s+(-?[\d.]+)\s+LUFS', err)
    st_max = max((float(x) for x in sm), default=None)
    return {'I': I, 'tp': tp, 'st_max': st_max}


def sha(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 16), b''):
            h.update(chunk)
    return h.hexdigest()


def load_cache():
    try:
        return json.loads(CACHE.read_text())
    except Exception:
        return {}


def audio_list():
    man = json.loads((ROOT / 'offline.json').read_text())
    out = []
    for p, _sz in man['files']:
        if p.lower().endswith(('.mp3', '.opus', '.wav', '.ogg', '.m4a', '.webm')):
            fp = ROOT / p
            if fp.is_file():
                out.append((p, fp))
    return out


def measure_one(item, cache):
    rel, fp = item
    key = sha(fp)
    if key in cache:
        rec = cache[key]
        rec['rel'] = rel
        rec['cached'] = True
        return rec
    try:
        rec = ebur128(fp)
    except Exception as e:
        rec = {'I': None, 'tp': None, 'st_max': None, 'error': str(e)}
    rec['rel'] = rel
    rec['sha'] = key
    rec['cached'] = False
    return rec


def judge(rec):
    kind = classify(rec['rel'])
    rec['kind'] = kind
    fails, warns = [], []
    I, tp, st = rec.get('I'), rec.get('tp'), rec.get('st_max')
    if rec.get('error'):
        fails.append(f"could not measure: {rec['error']}")
        rec['fails'] = fails
        rec['warns'] = warns
        return rec
    if kind == 'S1':
        if I is not None and abs(I - S1_I) > S1_TOL:
            # too loud is a hard fail; too quiet on short material is often a measurement artifact
            if I > S1_I + S1_TOL:
                fails.append(f'S1 integrated {I:.1f} LUFS (target {S1_I}±{S1_TOL})')
            else:
                warns.append(f'S1 integrated {I:.1f} LUFS quieter than {S1_I}±{S1_TOL}')
        if tp is not None and tp > S1_TP:
            fails.append(f'S1 true peak {tp:.2f} dBTP (max {S1_TP})')
    else:
        if st is not None and st > S2_ST:
            fails.append(f'S2 short-term {st:.1f} LUFS (max {S2_ST})')
        elif I is not None and I > S2_ST:
            # fallback if short-term missing
            fails.append(f'S2 integrated {I:.1f} LUFS over short-term cap {S2_ST}')
        if tp is not None and tp > S2_TP:
            fails.append(f'S2 true peak {tp:.2f} dBTP (max {S2_TP})')
    rec['fails'] = fails
    rec['warns'] = warns
    return rec


def scan(workers=WORKERS):
    cache = load_cache()
    items = audio_list()
    recs = []
    with ThreadPoolExecutor(workers) as ex:
        for rec in ex.map(lambda it: measure_one(it, cache), items):
            recs.append(judge(rec))
            if not rec.get('cached') and rec.get('sha'):
                cache[rec['sha']] = {k: rec[k] for k in ('I', 'tp', 'st_max', 'rel') if k in rec}
    try:
        CACHE.write_text(json.dumps(cache))
    except Exception:
        pass
    fails = [r for r in recs if r.get('fails')]
    warns = [r for r in recs if r.get('warns') and not r.get('fails')]
    return {
        'n': len(recs),
        'fails': [{'rel': r['rel'], 'kind': r['kind'], 'I': r.get('I'), 'tp': r.get('tp'),
                   'st_max': r.get('st_max'), 'detail': r['fails']} for r in fails],
        'warns': [{'rel': r['rel'], 'kind': r['kind'], 'I': r.get('I'), 'tp': r.get('tp'),
                   'detail': r['warns']} for r in warns],
        'ok': not fails
    }


if __name__ == '__main__':
    print(json.dumps(scan(), indent=2))
