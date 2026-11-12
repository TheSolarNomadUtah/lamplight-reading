// v56: Ignacio's trim. Hides Number Music (needs more work). Code stays; no entry points.
document.head.insertAdjacentHTML('beforeend',`<style>[onclick*="show('numbers')"]{display:none!important}</style>`);
(function(){if(show._v97)return;const sh=show;show=function(id){if(id==='numbers')id='hub';return sh.call(this,id)}})();
