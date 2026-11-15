// v160: stop loading retired-only modules v29.js and v55.js.
// Reachability (see /workspace/audit-v160/REACHABILITY.md): no live tile, saved
// state, or Back/hash path can open Star songs, Cymatica, Sound Lab, Number
// Music, or the v29 arcade inject. showImpl97 still redirects those ids.
// v29 only injected a retired Star songs tile into the arcade hub and wrapped
// show() behind a dead _v97 guard. v55 only replaced nmLoop for Number Music,
// which cannot open. Mixed live files (v14 Bedtime, v16-seq note(), v32 GHUB,
// v44/v46/v49 Paint wraps) stay loaded. show() is not wrapped. The quilt and
// Paint wraps are not edited.
(function(root){
 'use strict';
 root.IL160={version:160};
})(typeof window!=='undefined'?window:this);
