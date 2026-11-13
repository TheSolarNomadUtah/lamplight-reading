/* v107 leftover after the v117 fold into v106.
   Live jar / Grow / share / scale / Koch / snowflake / twist helpers now live in v106.js.
   This file keeps the 56px Grow buttons, the live turtle gain, and PAT_GEOM_MAXD108
   is defined in v106.js. Do not wrap show(). */
(function(){
 const s=document.createElement('style');
 s.id='v107css';
 s.textContent='#patterns .pat-row button{min-height:56px;min-width:56px}';
 document.head.appendChild(s);
})();

if(typeof SCGAIN102==='object')SCGAIN102.turtle=1.49;

/* v117 folded into v106.js: patJarDraw106, patJarGeom107, patGrowStep106,
   patGrowTwist106, patGrowPlayScale107, patSoundRun106, patShareDraw106,
   patShareGive106, patExKindHome106, patExScaleLine106, patPairArt106,
   patExRender106, patExKindOf107, patExGeomRender107, PAT_GEOM_MAXD108. */
