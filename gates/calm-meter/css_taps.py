#!/usr/bin/env python3
"""Static CSS: explicit button/key widths or heights under 44 px (QA T1)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SIZE = re.compile(
    r'(?P<sel>[.#][\w-]+(?:\s+[\w.#:-]+){0,4})\s*\{[^{}]{0,600}?(?P<prop>(?<![-\w])(?:min-width|min-height|width|height))\s*:\s*(?P<val>[\d.]+)px',
    re.I | re.S)
INTEREST = re.compile(r'button|\.lkeys|\.pc\b|\.pchip|\.snd|\.pstamp|\.pbar|\[role=.button|\.hubtile|\.key\b', re.I)
SKIP_PROP_SEL = re.compile(r'icon|ico|dot|stroke|border|svg|img|bar\b|track|thumb|line-height', re.I)


def scan():
    fails = []
    for p in list(ROOT.glob('*.js')) + list(ROOT.glob('*.html')):
        text = p.read_text(encoding='utf-8', errors='ignore')
        for m in SIZE.finditer(text):
            sel, prop, val = m.group('sel').strip(), m.group('prop').lower(), float(m.group('val'))
            if val <= 0 or val >= 44:
                continue
            blob = sel + ' ' + m.group(0)[:200]
            if not INTEREST.search(blob):
                continue
            if SKIP_PROP_SEL.search(sel) and 'button' not in sel:
                continue
            # decorative icon inside a button
            if re.search(r'-(ico|dot|icon)$', sel) or '.pc-dot' in sel or '.p101-ico' in sel:
                continue
            line = text[:m.start()].count('\n') + 1
            fails.append({
                'rule': 'T1-css',
                'file': p.name,
                'line': line,
                'selector': sel,
                'prop': prop,
                'px': val,
                'detail': f'{sel} {{ {prop}: {val}px }} is under 44 px'
            })
    return {'fails': fails, 'ok': not fails}


if __name__ == '__main__':
    import json
    print(json.dumps(scan(), indent=2))
