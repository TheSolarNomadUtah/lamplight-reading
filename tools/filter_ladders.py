#!/usr/bin/env python3
"""Keep ladder solutions and typed answers in the reviewed everyday allowlist.

Edit games-data.json/commonWords only after reviewing a word for familiarity
and child-appropriateness. Do not repopulate it from a general word-game dictionary.
Run this before releasing changes to the ladder data.
"""
import json
from pathlib import Path

path = Path(__file__).resolve().parents[1] / 'games-data.json'
data = json.loads(path.read_text())
common = set(data['commonWords'])
for key in ('words3', 'words4'):
    data[key] = sorted(set(data[key]) & common)
data['ladders'] = [ladder for ladder in data['ladders']
                   if all(word in common for word in ladder['sol'])]
for ladder in data['ladders']:
    words = ladder['sol']
    assert words[0] == ladder['a'] and words[-1] == ladder['b']
    assert ladder['par'] == len(words) - 1
    assert all(word in data['words' + str(len(word))] for word in words)
    assert all(len(a) == len(b) and sum(x != y for x, y in zip(a, b)) == 1
               for a, b in zip(words, words[1:]))
path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f"Reviewed ladders: {len(data['ladders'])}; "
      f"accepted words: {len(data['words3']) + len(data['words4'])}")
