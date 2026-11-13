/* Lamplight Learning v115 — cleanup phase 3 (first release).
   Fold stacked vNN.js patches into their owning modules and drop the
   leftover override files. Behavior is unchanged. Do not wrap show().

   Folded and no longer loaded:
     v103.js — dog yap lives in v102.js; story wording already in v101-stories.js
     v104.js — empty stub; Pi’s math fixes already live in math.js
     v108.js — Grow Soft/Bedtime mute and 10^13 geometry live in v107.js
     v110.js — Phantom Galaxy CC BY 4.0 credit lives in v109.js
     v113.js — Sky Tonight math already in v112.js; adults notes folded there
     v114.js — Explore tile labels live in v106.js and math.js; kline CSS is in
               index.html; the runtime bare-span unwrap override was removed

   Also folded: friendsLoad101 / friendsPut101 (final Dragon and Phoenix
   hydration) into v101.js; turtle swim sound and card copy into v102.js / v105.js;
   Bedtime breathe-guide and Sound cards turtle placement into v105.css.

   tools/preship.sh now checks Ignacio’s three offline caps: 15,728,640 core,
   26,214,400 per optional pack, and 1,073,741,824 for core plus all packs.
   No packs are built in this release.

   Further wraps (v107→v106 unit patches, v111/v112 Look Up composition)
   are left for a later cleanup release after QA regresses v115.
*/
