/* Lamplight Learning v117 — cleanup phase 3 (second release).
   Fold v107's wraps of the v106 unit helpers into v106.js, and fold the
   v111/v112 Look Up composition wraps into v112.js. Behavior is unchanged.
   Do not wrap show(); the v99 history wrap stays outermost around showImpl97.

   Folded into v106.js (v107.js keeps only the 56px button CSS and turtle gain):
     patJarDraw106 / patJarGeom107, patGrowStep106 / patGrowTwist106 /
     patGrowPlayScale107, patSoundRun106, patShareDraw106 / patShareGive106,
     patExKindHome106, patExScaleLine106, patPairArt106 (six-arm flake),
     patExRender106 / patExKindOf107 / patExGeomRender107 / PAT_GEOM_MAXD108

   Folded into v112.js (removed from v111.js):
     luRender83 star pages and star-nav injection, plus Sky Tonight composition
     already in v112; showImpl97 and renderAdults adults hooks. afterShow95 in
     v111.js still attaches What's new.

   No audio changes. No packs were built.
*/
