// v54: Ignacio's trims. Hides Star songs, Cymatica, Sound Lab, Hum & match, Make a song, Note Blocks and Sound Shapes. Code stays; no entry points.
document.head.insertAdjacentHTML('beforeend',`<style>[onclick*="show('starsongs')"],[onclick*="show('cymatica')"],[onclick*="show('lab')"],[onclick*="show('cymatics')"],[onclick*="MU={v:'hum'}"],[onclick*="MU={v:'make'}"],[onclick*="MU={v:'compose'}"],[data-stars],[data-stars]+.soft{display:none!important}</style>`);
(function(){const OFF=['starsongs','cymatica','lab','cymatics'],sh=show;show=function(id){if(OFF.includes(id))id='hub';return sh.call(this,id)};
 const rm=renderMusic;renderMusic=renderMusic&&function(){if(MU&&['hum','make','compose'].includes(MU.v))MU={v:null};return rm.apply(this,arguments)};
 if(typeof RENDER==='object'&&RENDER.music)RENDER.music=renderMusic;
 try{if(cur&&OFF.includes(cur))show('hub')}catch(e){}})();
