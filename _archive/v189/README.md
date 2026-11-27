# Archived in v189 (cleanup part 2) — kept, not deleted

These files were in the deployed tree but nothing in the live app loads them. They are here for history and can be
restored with `git mv _archive/v189/<file> .` (then add its `<script>` tag / sw.js entry back if it should run again).
GitHub Pages builds with Jekyll, which does not publish folders that start with `_`, so nothing here is served,
precached, or part of "Save everything" (tools/gen_offline.py skips `_archive/`).

How "unused" was decided (reference trace, /workspace/audit-v189/trace/):
1. not a `<script src>` in index.html, not in the sw.js precache list, not a Worker or a look-kit loader target (v159),
2. every remaining mention is a code comment (static trace over all served text incl. data URIs and dynamic paths),
3. no request for it on the candidate server during every gate run (audit-v189/scan-404.py).

| file | bytes | what it was | unloaded in |
|---|---|---|---|
| seq-demos.js | 36,451 | Note Blocks demo songs (guarded fallback in v16-seq.js / v98) | v96 |
| v29.js | 1,060 | Star songs / Cymatica arcade inject | v160 |
| v55.js | 1,462 | Number Music melody river | v160 |
| v75.js | 27,550 | Look Closer (mothballed) | v158 |
| v77.js | 3,122 | Look Closer cards + lamp credits (live bits moved to v76.js) | v158 |
| v78.js | 17,159 | Look Closer art pass (was still in Save everything) | v96 |
| v80.js | 6,869 | Look Closer Duck or Rabbit (was still in Save everything) | v96 |
| v96.js, v98.js, v107.js, v117.js, v134.js, v136.js, v142.js, v144.js, v146.js, v158.js | 5,594 | folded / empty / marker files (see v161.js header) | v161 |

Kept on purpose: stars.json (fetched by v28.js), lang/*.json (loaded by code), LICENSE + LICENSE.txt pairs (legal),
duplicate-content voice clips (voices are never touched), parked art/QA files, hide guards, old Paint, storage keys.
