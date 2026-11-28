# Archived in v191 (cleanup part 3, rebased on v190 fixes)

These files were plain-concatenated, IIFEs unchanged, into segment files at the repo root
(`v119-129.js`, `v131-132.js`, `v133-135.js`, `v137-145.js`, `v147-164.js`, `v165-174.js`,
`v175-183.js`, `v184-185.js`). Load order relative to named modules is the same.

Non-IIFE programs with their own top-level bindings stay as separate `<script>` tags at
the repo root (the v76–v111 stack, plus `v112.js`, `v116.js`, and `v118.js`). Concatenating
those would hoist later `function` / `var` bindings so earlier `typeof laterFn === 'function'`
calls (for example `ghTrim92()` at the end of `v92.js` calling `ghTrim100` before
`RETIRED100` is assigned) would run too soon. The shipped app does not use string `eval`
to recover per-file program boundaries.

`v86.js`, `v130.js`, `v186.js`, and `v181-mandel-worker.js` were left in place.
`v190.js` is the v190 fix-release IIFE and is left in place.

`v115.js` was comments only (the v115 fold already lived in earlier modules) and is not
loaded any more. It remains here for history.

GitHub Pages builds with Jekyll, which does not publish folders that start with `_`.
`tools/gen_offline.py` also skips `_archive/`.
