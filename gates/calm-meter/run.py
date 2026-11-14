#!/usr/bin/env python3
"""Calm Meter entry point. QA thresholds from FAMILY_VOICE_AND_CALM_METER.md."""
import json, os, subprocess, sys, time
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT_DIR = Path(os.environ.get('OUT') or os.environ.get('CALM_OUT') or ROOT / 'gates' / 'calm-meter' / 'out')
BASELINE_PATH = HERE / 'baseline.json'
APP = os.environ.get('CALM_APP') or os.environ.get('APP') or 'http://127.0.0.1:8765'


def load_baseline():
    if not BASELINE_PATH.exists():
        return {'items': []}
    return json.loads(BASELINE_PATH.read_text())


def key_of(item):
    """Stable identity for a leftover or new fail. Families, not every instance."""
    rule = item.get('rule') or ''
    if rule in ('S-loudness',) or item.get('rel'):
        return 'loudness|' + (item.get('rel') or '')
    if rule == 'T1':
        return 'T1|' + (item.get('family') or item.get('cls') or item.get('id') or (item.get('tag') + '|' + (item.get('label') or '')[:40]))
    if rule == 'T1-css':
        return 'T1-css|%s|%s|%s' % (item.get('file'), item.get('selector'), item.get('prop'))
    if rule == 'T3-fill-none':
        return 'T3|%s|%s' % (item.get('file'), item.get('line'))
    if 'file' in item and 'line' in item:
        return '%s|%s|%s' % (rule, item.get('file'), item.get('line'))
    if item.get('section') and rule:
        return '%s|%s|%s' % (rule, item.get('section'), item.get('cls', ''))
    return json.dumps(item, sort_keys=True)[:200]


def run_py(mod):
    r = subprocess.run([sys.executable, str(HERE / mod)], cwd=str(ROOT), capture_output=True, text=True)
    if r.returncode != 0 and not r.stdout.strip():
        return {'ok': False, 'fails': [{'detail': r.stderr[-800:] or 'exit %s' % r.returncode}], 'warns': []}
    try:
        return json.loads(r.stdout)
    except Exception:
        return {'ok': False, 'fails': [{'detail': 'bad json from %s: %s' % (mod, r.stdout[-400:] or r.stderr[-400:])}], 'warns': []}


def run_taps():
    env = os.environ.copy()
    env['ROOT'] = APP
    r = subprocess.run(['node', str(HERE / 'taps.js')], cwd=str(ROOT), capture_output=True, text=True, env=env)
    if r.returncode != 0 and not r.stdout.strip():
        return {'ok': False, 'small': [], 'shapeFails': [], 'error': r.stderr[-800:]}
    try:
        return json.loads(r.stdout)
    except Exception:
        return {'ok': False, 'small': [], 'shapeFails': [], 'error': r.stdout[-400:] or r.stderr[-400:]}


def main():
    t0 = time.time()
    flash = run_py('flash_scan.py')
    shapes = run_py('shapes.py')
    css = run_py('css_taps.py')
    loud = run_py('loudness.py')
    taps = run_taps()

    fails = []
    warns = []
    # flash
    for it in flash.get('fails') or []:
        fails.append(it)
    for it in flash.get('warns') or []:
        warns.append(it)
    # shapes static
    for it in shapes.get('fails') or []:
        fails.append(it)
    for it in css.get('fails') or []:
        fails.append(it)
    # loudness
    for it in loud.get('fails') or []:
        fails.append({'rule': 'S-loudness', **it})
    for it in loud.get('warns') or []:
        warns.append({'rule': 'S-loudness', **it})
    # taps
    if taps.get('error'):
        fails.append({'rule': 'T-headless', 'detail': taps['error']})
    for it in taps.get('small') or []:
        fails.append(it)
    for it in taps.get('shapeFails') or []:
        fails.append(it)
    if taps.get('honeycomb') and taps['honeycomb'].get('open') and taps['honeycomb'].get('hit') is False:
        fails.append({'rule': 'T3-center-hit', 'section': 'honeycomb', 'detail': 'center tap on a ghost cell missed the cell', **taps['honeycomb']})
    rn = taps.get('rainbowNight')
    if rn:
        if rn.get('error'):
            fails.append({'rule': 'T-rainbow-night', 'section': 'paint', 'detail': 'rainbow night check error: %s' % rn.get('error')})
        elif rn.get('glowOnly') is not False or (rn.get('hue') or 0) < 20 or len(rn.get('buckets') or []) < 3:
            fails.append({'rule': 'T-rainbow-night', 'section': 'paint', 'detail': 'rainbow on night paper did not cycle hue', **{k: rn[k] for k in rn}})
    moon = taps.get('moon')
    if moon:
        if moon.get('error'):
            fails.append({'rule': 'T-moon', 'section': 'moon', 'detail': 'moon page error: %s' % moon.get('error')})
        elif not moon.get('open'):
            fails.append({'rule': 'T-moon', 'section': 'moon', 'detail': 'moon-phase dusk page did not open', **{k: moon[k] for k in moon}})
        elif moon.get('countdown'):
            fails.append({'rule': 'T-moon', 'section': 'moon', 'detail': 'longest-night copy looks like a countdown', **{k: moon[k] for k in moon}})
        else:
            g = moon.get('glow') or {}
            if g.get('error'):
                fails.append({'rule': 'T-moon-glow', 'section': 'moon', 'detail': 'equinox/full-moon glow check error: %s' % g.get('error')})
            else:
                eq_ok = all(
                    (g.get(k) or {}).get('eq') and not (g.get(k) or {}).get('full') and not (g.get(k) or {}).get('long')
                    and not (g.get(k) or {}).get('countdown') and 'Equinox' in ((g.get(k) or {}).get('line') or '')
                    for k in ('eqN', 'eqS')
                )
                full = g.get('full') or {}
                sol = g.get('solN') or {}
                ordinary = g.get('ordinary') or {}
                if (not eq_ok or not full.get('full') or full.get('eq') or full.get('long') or full.get('countdown')
                    or not sol.get('long') or sol.get('eq') or sol.get('full') or sol.get('countdown')
                    or ordinary.get('eq') or ordinary.get('full') or ordinary.get('long') or ordinary.get('countdown')):
                    fails.append({'rule': 'T-moon-glow', 'section': 'moon', 'detail': 'equinox or full-moon soft glow missing, applied on the wrong night, or looks like a countdown', **{k: g[k] for k in g}})
    cp = taps.get('candlePicker')
    if cp:
        if cp.get('error'):
            fails.append({'rule': 'T-breath-picker', 'section': 'candle', 'detail': 'picker check error: %s' % cp.get('error')})
        elif (not cp.get('mounted') or cp.get('n') != 3 or cp.get('selected') != 'normal'
              or (cp.get('minH') or 0) < 55.5
              or not cp.get('headingVisible') or cp.get('heading') not in ('How long?', '¿Cuánto tiempo?')):
            fails.append({'rule': 'T-breath-picker', 'section': 'candle', 'detail': 'Lamp Breathing picker missing, not default normal, under 56 px, or How long? heading not visible', **{k: cp[k] for k in cp}})
    ff = taps.get('fireflies')
    if ff:
        if ff.get('error'):
            fails.append({'rule': 'T-fireflies', 'section': 'fireflies', 'detail': 'fireflies page error: %s' % ff.get('error')})
        elif (not ff.get('open') or ff.get('n') != 10 or (ff.get('cols') or 0) != 5
              or (ff.get('k') or 0) < 1 or (ff.get('k') or 0) > 9 or ff.get('sum') != 10
              or (ff.get('minH') or 0) < 55.5 or (ff.get('minW') or 0) < 55.5):
            fails.append({'rule': 'T-fireflies', 'section': 'fireflies', 'detail': 'Fireflies Make Ten missing, not a 2×5 ten-frame, or spots under 56 px', **{k: ff[k] for k in ff}})
    sc = taps.get('starCount')
    if sc:
        if sc.get('error'):
            fails.append({'rule': 'T-starcount', 'section': 'starcount', 'detail': 'star count page error: %s' % sc.get('error')})
        elif (not sc.get('open') or sc.get('n') not in (3, 5, 7)
              or not sc.get('city') or (sc.get('cityN') or 0) < 21
              or sc.get('namesInKid')):
            fails.append({'rule': 'T-starcount', 'section': 'starcount', 'detail': 'Star Count missing, city picker is not the 21-city Sky Tonight list, or star names in kid chrome', **{k: sc[k] for k in sc}})
        elif sc.get('t3') is not None and not sc['t3'].get('ok'):
            fails.append({'rule': 'T3-star-nearest', 'section': 'starcount', 'detail': 'center tap on a star lit a neighbor, or nearest-star hit-testing failed', **{k: sc[k] for k in ('t3','minSep','n','id','title')}})
        elif (sc.get('minSep') or 0) < 55.5:
            fails.append({'rule': 'T3-star-spacing', 'section': 'starcount', 'detail': 'star centers are closer than 56 px at 390', **{k: sc[k] for k in ('minSep','n','id','title','board')}})
        elif sc.get('minSepTonight') is not None and (sc.get('minSepTonight') or 0) < 55.5:
            fails.append({'rule': 'T3-star-spacing-tonight', 'section': 'starcount', 'detail': 'tonight dipper centers are closer than 56 px after the final fit (Reykjavik case)', **{k: sc[k] for k in ('minSepTonight','tonightDipper','minSep')}})
    poly = taps.get('polygon')
    if poly:
        if poly.get('error'):
            fails.append({'rule': 'T-polygon', 'section': 'polygon', 'detail': 'polygon page error: %s' % poly.get('error')})
        elif (not poly.get('open') or (poly.get('n') or 0) != 3
              or (poly.get('minH') or 0) < 55.5
              or not poly.get('kepler')
              or (poly.get('name') or '') != 'Triangle'):
            fails.append({'rule': 'T-polygon', 'section': 'polygon', 'detail': 'Polygon to circle missing, not starting as a triangle, taps under 56 px, or Kepler art missing', **{k: poly[k] for k in poly if k!='steps'}})
        else:
            end = poly.get('end') or {}
            names = [(s.get('n'), s.get('name')) for s in (poly.get('steps') or [])]
            want_early = {3: 'Triangle', 4: 'Square', 5: 'Pentagon', 6: 'Hexagon'}
            bad_name = False
            for s in (poly.get('steps') or []):
                nn, nm = s.get('n'), s.get('name') or ''
                if nn in want_early and nm != want_early[nn]:
                    bad_name = True
                if nn in (7, 8, 9) and nm != ('%s corners' % nn):
                    bad_name = True
                if nn and nn >= 10 and 'looks round' not in nm.lower():
                    bad_name = True
            if (end.get('n') or 0) != 16 or not end.get('addGone') or 'looks round' not in (end.get('name') or '').lower() or bad_name:
                fails.append({'rule': 'T-polygon', 'section': 'polygon', 'detail': 'did not stop at 16 sides, kept adding, or used the wrong shape name', **{'end': end, 'names': names}})

    pr = taps.get('printables')
    if pr:
        if pr.get('error'):
            fails.append({'rule': 'T-printables', 'section': 'printables', 'detail': 'printables page error: %s' % pr.get('error')})
        elif (not pr.get('open') or pr.get('n') < 5 or 'seed' not in (pr.get('ids') or [])
              or (pr.get('minH') or 0) < 55.5 or not (pr.get('card') or {}).get('card')):
            fails.append({'rule': 'T-printables', 'section': 'printables', 'detail': 'Print card or print pages missing, or tiles under 56 px', **{k: pr[k] for k in pr}})

    cb = taps.get('companionBlink')
    if cb:
        if cb.get('error'):
            fails.append({'rule': 'F-blink-reduced-motion', 'section': 'friends', 'detail': 'companion blink check error: %s' % cb.get('error')})
        elif not cb.get('ok') or (cb.get('delta') or 0) != 0 or not cb.get('still'):
            fails.append({'rule': 'F-blink-reduced-motion', 'section': 'friends', 'detail': 'soft close must be still under reduced motion (delta 0, eyes stay open, no wo/wc/aura animation)', **{k: cb[k] for k in cb}})

    baseline = load_baseline()
    known = set(baseline.get('items') or [])
    known_hits, new_fails = [], []
    for it in fails:
        k = key_of(it)
        it['key'] = k
        if k in known:
            it['baseline'] = True
            known_hits.append(it)
        else:
            it['baseline'] = False
            new_fails.append(it)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    report = {
        'ok': len(new_fails) == 0,
        'when': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'elapsed_s': round(time.time() - t0, 2),
        'app': APP,
        'thresholds': {
            'flash_cycle_ms': 333,
            'S1': 'voice/song integrated -19 LUFS ±1.5, true peak ≤ -1.0 dBTP',
            'S2': 'UI/toy short-term max ≤ -18 LUFS, true peak ≤ -3.0 dBTP',
            'T1': 'tap targets ≥ 44×44 CSS px at 390',
            'T3': 'tappable SVG shapes need a fill-area hit'
        },
        'new_fails': new_fails,
        'baseline_fails': known_hits,
        'warns': warns,
        'counts': {
            'new_fails': len(new_fails),
            'baseline_fails': len(known_hits),
            'warns': len(warns),
            'audio': loud.get('n'),
            'tap_samples': taps.get('samples')
        },
        'honeycomb': taps.get('honeycomb'),
        'quilt': taps.get('quilt'),
        'rainbowNight': taps.get('rainbowNight'),
        'moon': taps.get('moon'),
        'candlePicker': taps.get('candlePicker'),
        'fireflies': taps.get('fireflies'),
        'starCount': taps.get('starCount'),
        'polygon': taps.get('polygon'),
        'printables': taps.get('printables'),
        'companionBlink': taps.get('companionBlink'),
        'flash_ok': flash.get('ok'),
        'loudness_raw_ok': loud.get('ok'),
        'shapes_ok': shapes.get('ok')
    }
    (OUT_DIR / 'calm-report.json').write_text(json.dumps(report, indent=2) + '\n')
    md = []
    md.append('# Calm Meter\n')
    md.append('Status: **%s**  \nElapsed: %ss\n' % ('PASS' if report['ok'] else 'FAIL', report['elapsed_s']))
    if new_fails:
        md.append('## New FAILs (block the release)\n')
        for it in new_fails:
            md.append('- `%s` %s\n' % (it.get('rule') or it.get('key'), it.get('detail') or it))
    if known_hits:
        md.append('## Known leftovers (reported, not blocking)\n')
        seen=set()
        for it in known_hits:
            k=it.get('key')
            if k in seen: continue
            seen.add(k)
            extra=it.get('detail') or it.get('rel') or it.get('label') or ''
            md.append('- `%s` %s\n' % (k, extra if isinstance(extra,str) else extra))
        md.append('(%d unique families, %d instances)\n' % (len(seen), len(known_hits)))
    if warns:
        quiet=sum(1 for it in warns if 'quieter' in str(it.get('detail') or ''))
        md.append('## WARN (%d; %d too-quiet short voice clips)\n' % (len(warns), quiet))
        shown=0
        for it in warns:
            if 'quieter' in str(it.get('detail') or ''):
                continue
            md.append('- `%s` %s\n' % (it.get('rule'), it.get('detail') or it.get('rel') or it))
            shown+=1
        if quiet:
            md.append('- S1 too-quiet short clips: %d (measurement artifact on short words; not re-encoded)\n' % quiet)
    (OUT_DIR / 'SUMMARY.md').write_text(''.join(md))
    print(''.join(md))
    print('Wrote', OUT_DIR / 'calm-report.json')
    return 0 if report['ok'] else 1


if __name__ == '__main__':
    sys.exit(main())
