#!/usr/bin/env python3
"""Flag tappable SVG shapes drawn with fill='none' (whole-shape tap rule)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKIP_TOP = {'.git', 'tools', 'gates', 'node_modules', 'packs'}
FILL_NONE = re.compile(r'''fill\s*=\s*["']none["']''', re.I)
# nearby signals that the shape is a hit target, not decoration
TAP = re.compile(
    r'onclick|addEventListener\(\s*[\'"]click|pointer-events\s*[:=]|cursor\s*:\s*pointer|data-q=|data-r=|data-tap|hex-ghost|role=["\']button',
    re.I)


def walk():
    for p in list(ROOT.glob('*.js')) + list(ROOT.glob('*.html')):
        yield p, p.name


def scan():
    fails, notes = [], []
    for p, rel in walk():
        text = p.read_text(encoding='utf-8', errors='ignore')
        # inspect ~400 chars around each fill="none"
        for m in FILL_NONE.finditer(text):
            line = text[:m.start()].count('\n') + 1
            lo, hi = max(0, m.start() - 280), min(len(text), m.end() + 280)
            ctx = text[lo:hi]
            if not TAP.search(ctx):
                continue
            # already given a fill-area hit
            if re.search(r'fill=["\']transparent["\']|pointer-events=["\']all["\']|fill-opacity=["\']0', ctx, re.I):
                notes.append({'file': rel, 'line': line, 'detail': 'fill none/transparent already has a fill-area hit'})
                continue
            fails.append({
                'rule': 'T3-fill-none',
                'file': rel,
                'line': line,
                'detail': 'tappable SVG shape uses fill="none" without a fill-area hit (use fill="transparent" or pointer-events="all")',
                'snippet': re.sub(r'\s+', ' ', ctx)[80:220]
            })
    return {'fails': fails, 'notes': notes, 'ok': not fails}


if __name__ == '__main__':
    import json
    print(json.dumps(scan(), indent=2))
