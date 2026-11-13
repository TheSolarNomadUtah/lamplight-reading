#!/usr/bin/env python3
"""Static scan: repeating opacity/luminance animations faster than 3 Hz (cycle < 333 ms)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKIP_TOP = {'.git', 'tools', 'gates', 'node_modules', 'packs'}
DUR_RE = re.compile(r'(-?[\d.]+)\s*(ms|s)\b', re.I)
# animation: name duration ...
ANIM_RE = re.compile(
    r'(?:^|[\s;{])animation(?:-duration)?\s*:\s*([^;{}]+)', re.I)
# JS template or CSS
KEY_RE = re.compile(r'@keyframes\s+([\w-]+)\s*\{', re.I)
SMIL_RE = re.compile(
    r'<animate[^>]*?(?:dur=["\']([^"\']+)["\'][^>]*?attributeName=["\']([^"\']+)["\']|attributeName=["\']([^"\']+)["\'][^>]*?dur=["\']([^"\']+)["\'])[^>]*',
    re.I)

LUM_PROPS = ('opacity', 'filter', 'brightness', 'luminance', 'fill', 'background',
             'background-color', 'color', 'stroke', 'flood-color', 'stop-color')


def walk_files():
    for p in ROOT.rglob('*'):
        if not p.is_file():
            continue
        rel = p.relative_to(ROOT).as_posix()
        top = rel.split('/', 1)[0]
        if top in SKIP_TOP or rel.startswith('.'):
            continue
        if p.suffix.lower() not in {'.js', '.css', '.html', '.svg'}:
            continue
        if any(part.startswith('.') for part in p.parts):
            continue
        yield p, rel


def to_ms(token):
    m = DUR_RE.search(token or '')
    if not m:
        return None
    v = float(m.group(1))
    return v if m.group(2).lower() == 'ms' else v * 1000


def parse_anim_shorthand(value):
    """Return list of {name, duration_ms, infinite, lum_in_value}."""
    out = []
    # split multiple animations on commas not inside ()
    parts, buf, depth = [], [], 0
    for ch in value:
        if ch == '(':
            depth += 1
            buf.append(ch)
        elif ch == ')':
            depth = max(0, depth - 1)
            buf.append(ch)
        elif ch == ',' and depth == 0:
            parts.append(''.join(buf).strip())
            buf = []
        else:
            buf.append(ch)
    if buf:
        parts.append(''.join(buf).strip())
    for part in parts:
        toks = part.split()
        if not toks:
            continue
        name = None
        dur = None
        # skip delays that look like times after the first time
        times = []
        for tok in toks:
            if tok.lower() in {'infinite', 'alternate', 'alternate-reverse',
                               'forwards', 'both', 'none', 'paused', 'running',
                               'ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out',
                               'normal', 'reverse'}:
                continue
            if DUR_RE.search(tok) and not tok.startswith('var('):
                times.append(to_ms(tok))
            elif re.match(r'^[A-Za-z_][\w-]*$', tok) and name is None and tok.lower() not in {'animation'}:
                name = tok
        dur = times[0] if times else None
        infinite = bool(re.search(r'\binfinite\b', part, re.I))
        # iteration count > 1
        it = re.search(r'\b(\d+(?:\.\d+)?)\s*$', part)
        many = infinite
        if it and float(it.group(1)) >= 3:
            many = True
        out.append({'name': name, 'duration_ms': dur, 'infinite': infinite or many, 'raw': part.strip()[:160]})
    return out


def keyframe_luminance(block):
    low = block.lower()
    return any(p in low for p in LUM_PROPS)


def extract_keyframes(text):
    keys = {}
    for m in KEY_RE.finditer(text):
        name = m.group(1)
        start = m.end() - 1
        # brace match
        depth, i = 0, start
        while i < len(text):
            if text[i] == '{':
                depth += 1
            elif text[i] == '}':
                depth -= 1
                if depth == 0:
                    keys[name] = text[start:i + 1]
                    break
            i += 1
    return keys


def scan():
    fails, warns, ok_notes = [], [], []
    for p, rel in walk_files():
        text = p.read_text(encoding='utf-8', errors='ignore')
        keys = extract_keyframes(text)
        # CSS/JS animation declarations
        for m in ANIM_RE.finditer(text):
            line = text[:m.start()].count('\n') + 1
            val = m.group(1)
            # animation-duration: .3s alone has no name
            for anim in parse_anim_shorthand(val):
                dur = anim['duration_ms']
                if dur is None:
                    continue
                name = anim['name']
                kf = keys.get(name, '') if name else ''
                lum = keyframe_luminance(kf) or keyframe_luminance(val)
                # one-shot transform-only shakes are not flashes
                if not lum:
                    continue
                if dur < 333 and anim['infinite']:
                    fails.append({
                        'rule': 'F-flash-rate',
                        'file': rel,
                        'line': line,
                        'duration_ms': dur,
                        'name': name,
                        'detail': f'repeating opacity/luminance cycle {dur:.0f} ms (< 333 ms, > 3 flashes/s): {anim["raw"]}'
                    })
                elif dur < 333 and lum:
                    warns.append({
                        'rule': 'F-flash-rate',
                        'file': rel,
                        'line': line,
                        'duration_ms': dur,
                        'name': name,
                        'detail': f'one-shot opacity/luminance under 333 ms: {anim["raw"]}'
                    })
        for m in SMIL_RE.finditer(text):
            dur_s = m.group(1) or m.group(4)
            attr = m.group(2) or m.group(3) or ''
            line = text[:m.start()].count('\n') + 1
            dur = to_ms(dur_s) if dur_s and not dur_s.endswith('%') else None
            if dur is None:
                # SMIL often uses "0.3s"
                dur = to_ms(dur_s or '')
            tag = m.group(0).lower()
            lum = any(p in attr.lower() or p in tag for p in LUM_PROPS)
            repeat = 'indefinite' in tag or re.search(r'repeatcount=["\'](\d+)', tag)
            if lum and dur is not None and dur < 333 and repeat:
                fails.append({
                    'rule': 'F-flash-rate',
                    'file': rel,
                    'line': line,
                    'duration_ms': dur,
                    'detail': f'SMIL {attr} dur={dur_s} repeats under 333 ms'
                })
    return {'fails': fails, 'warns': warns, 'ok': not fails}


if __name__ == '__main__':
    import json
    print(json.dumps(scan(), indent=2))
