// SPDX-License-Identifier: GPL-3.0-or-later
/* v123: Lamp tune — Norma, readable motes, and the five effects. */
(function(){
'use strict';
const CSS123="/* lamp_effects.css \u2014 tune the five post-v83 Lamp effects for the Inner light glass Lamp.\n *\n * WHERE THIS GOES\n * ---------------\n * The live CSS is injected by v89.js as <style id=\"v89css\">, currently lines 445\u2013553\n * of /workspace/reading-app/v89.js (commit 4b008d9). v111.js then overrides some\n * durations and adds a soft core in starCss111(), lines 498\u2013505, and lampFxCss111()\n * (lines 846\u2013898) is the everyday breath \u2014 leave that everyday breath alone.\n *\n * Builder: APPEND THIS FILE AFTER v89 (e.g. a later <style id=\"v121fx\">),\n * or fold the blocks into a new v121.js that loads after v89. This is\n * required so the hottest-point rule overrides the old white core in v89\n * (.fx89-ed:nth-child(3){fill:#fff}). Do not delete the picker / tray rules.\n *\n * REQUIRED JS: recipe_lamp_tune.js is not optional. It replaces:\n *   lampFxSpiralSVG89   v89.js:55\u201367, already wrapped by v111.js:443\u2013457\n *     \u2014 8 cool bold dots in a ring, fine seeds classed il-fine/fx-fine so\n *       the 44 px hide applies, and a dark gap around the lantern.\n *   lampFxEmberSVG89    v89.js:68\u201378, already wrapped by v111.js:468\u2013480\n *     \u2014 vertical rising paths; the live v89 path climbs the old centreline\n *       and crosses the new mote crown and Norma. Pass still=true under\n *       reduce: CSS animation:none does not stop SMIL animateMotion.\n *   lampFxLayerHTML89   v89.js:83\u201388, already wrapped by v111.js:459\u2013466\n *\n * REQUIRED HTML for Comb jelly: a descendant of .lamp73-shell must have\n * data-il-kind=\"lamp\" and data-il-stage=\"hatchling|young|grown|wise\"\n * (the SVG root is the natural place). Without it, :has() never matches\n * and the jelly clip stays on the old clay pane (25%/21%/50%\u00d760% vs the\n * glass window 40%/52%/20%\u00d721%).\n *\n * WHAT CHANGED\n * ------------\n * Geometry is recalibrated to the Inner light glass Lamp (data-il-kind=\"lamp\"),\n * whose flame sits at about 60% down a 100-viewBox (200-viewBox art at scale .5),\n * with the glass window at 40%, 52%, 20% \u00d7 21%. The clay-lantern fallbacks stay\n * for any leftover stage art.\n *\n * Motion is slower and gentler (cycles 8\u201324 s, amplitude about 1.00\u20131.05).\n * Nothing flashes, and nothing is above 3 flashes/sec. Hottest points use\n * var(--f81-tip), never #fff. Under prefers-reduced-motion (and .still /\n * .reduce73): NO breathing, NO flashes, NO drift \u2014 a static mid glow only.\n * SVG animateMotion is not used when still=true (already true for reduced).\n *\n * At 44 px (svg.il-sm, or max-width 72 px): fine spiral seeds and ember tracks\n * hide; bold dots remain, sized \u22481.5 px or thicker. Jelly is a soft blurred\n * wash in the glass (the 9 px window cannot carry a fine ripple).\n */\n\n/* \u2014\u2014 geometry for the Inner light glass Lamp \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 */\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-shell,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-mid,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-hot,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx111-core-soft{\n  left:50%;\n  top:60%; /* flame at (100,120) in the 200 viewBox, after scale .5 */\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-shell,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-mid,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-hot{\n  top:61%;\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-shell,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-mid,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-hot{\n  top:62%;\n}\n\n/* Comb-jelly clip = the glass window, not the old 2\u00d72 clay panes. */\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"grown\"]) .fx89-jelly-clip,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"wise\"]) .fx89-jelly-clip{\n  left:40%; top:52%; width:20%; height:21%;\n  border-radius:4px; /* rx=8 in 200 viewBox, after scale .5 */\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-jelly-clip{\n  left:35%; top:49%; width:30%; height:30%; border-radius:50%;\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-jelly-clip{\n  left:36%; top:53%; width:28%; height:32%; border-radius:50%;\n}\n\n/* \u2014\u2014 shared breath: slow, gentle, one engine \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 */\n@keyframes fx89-breathe{\n  0%,100%{transform:translate(-50%,-50%) scale(1); opacity:.82}\n  50%{transform:translate(-50%,-50%) scale(1.05); opacity:1}\n}\n@keyframes fx89-hot{\n  0%,100%{transform:translate(-50%,-50%) scale(.97); opacity:.9}\n  50%{transform:translate(-50%,-50%) scale(1.05); opacity:1}\n}\n\n/* Bright core: slower than v89's 7s, calmer amplitude. v111 already set\n   shell 16s / mid 13s / hot 11s \u2014 keep those, just soften the keyframes. */\n.fx89-shell,.fx111-shell{animation:fx89-breathe 16s ease-in-out infinite}\n.fx89-mid,.fx111-mid{animation:fx89-breathe 13s ease-in-out infinite reverse}\n.fx89-hot,.fx111-hot,.fx89-flame{animation:fx89-hot 11s ease-in-out infinite}\n.fx111-core-soft{animation:fx89-breathe 18s ease-in-out infinite}\n\n/* Hottest point is the glow tip, never white. */\n.fx89-hot,.fx89-flame{\n  background:radial-gradient(ellipse at 50% 42%,\n    var(--f81-tip,#fbdcad) 0%,\n    var(--f81-tip,#fbdcad) 22%,\n    color-mix(in oklab,var(--f81-core,#efba64) 80%,transparent) 58%,\n    transparent 76%);\n}\n.fx89-ed:nth-child(3){fill:var(--f81-tip,#fbdcad)} /* was #fff */\n\n/* Sleeping spiral: keep v111's 140 s turn; a still spiral is just the dots.\n   Geometry (8 cool bold dots in a ring, \u22658 viewBox-unit dark gap, fine seeds\n   classed il-fine/fx-fine) is in recipe_lamp_tune.js \u2014 that JS is required. */\n.fx89-spiral.awake:not(.still),.fx111-spiral.awake:not(.still){\n  animation:fx89-spin 140s linear infinite 8.5s\n}\n\n/* Comb jelly: slow 24 s (already in v111). On the glass Lamp the 9 px window\n   cannot carry a fine ripple, so the bands are thicker, blurred, and read as\n   a soft iridescent wash \u2014 not a flag. The one-shot \"up\" swell is 5 s\n   (was 3.6 s), once, and is not played under reduced motion.\n   The review sheet shows overlapping ellipses as the intended look; this CSS\n   gets the existing two-layer DOM as close as a stylesheet can. */\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-jelly-a,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-jelly-b{\n  animation-duration:24s;\n  background-size:100% 36px;\n  filter:blur(2.4px);\n  opacity:.62;\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-jelly-b{\n  filter:blur(3px) hue-rotate(28deg) saturate(.85);\n  opacity:.42;\n}\n.fx89-jelly-a,.fx89-jelly-b{\n  animation-duration:24s;\n  background-size:100% 28px;\n}\n@keyframes fx89-ripple{\n  0%,100%{background-position:0 -10px; opacity:.42}\n  50%{background-position:0 14px; opacity:.68}\n}\n.fx89-jelly-up .fx89-jelly-a,\n.fx89-jelly-up .fx89-jelly-b{animation:fx89-ripple-up 5s ease-in-out 1}\n@keyframes fx89-ripple-up{\n  0%{background-position:0 -16px; opacity:.3}\n  50%{background-position:0 12px; opacity:.72}\n  100%{background-position:0 20px; opacity:.5}\n}\n\n/* Smoke haze stays a soft static veil, behind the lantern, and a little\n   smaller so it does not blur the rim at 44 px. The review sheet also draws\n   a thin dusk separation just outside the ink. The canvas (when used) is\n   already skipped under reduced motion and on low-power.\n   Opacity is left to the existing rules, including reduced motion. */\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx111-smoke-haze{\n  inset:10% 14%;\n  filter:blur(10px);\n}\n.fx111-smoke-haze{opacity:.4}\n\n/* Optional Moss Spark nudge \u2014 FLAME81 hex is unchanged. When Moss is bound,\n   mix cream into the hot point so the heart reads off the jade glass. */\n.lamp73-shell[data-glow=\"moss\"] .fx89-hot,\n.lamp73-shell[data-glow=\"moss\"] .fx89-flame,\n.lamp73-shell:has([data-flame=\"moss\"]) .fx89-hot,\n.lamp73-shell:has([data-flame=\"moss\"]) .fx89-flame{\n  background:radial-gradient(ellipse at 50% 42%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 0%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 22%,\n    color-mix(in oklab,var(--f81-core,#96d88f) 70%,transparent) 58%,\n    transparent 76%);\n}\n\n/* Picker previews: no cycle faster than 6 s. */\n.fx89-pv-core .fx89-pv-s{animation-duration:8s}\n.fx89-pv-core .fx89-pv-m{animation-duration:6.5s}\n.fx89-pv-ember path{animation-duration:8s}\n.fx89-pv-jelly .fx89-pv-rows{animation-duration:8s}\n.fx89-pv-smoke path{animation-duration:8s}\n\n/* \u2014\u2014 44 px: hide fine seeds, keep bold marks \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 */\nsvg.il-sm .il-fine,\nsvg.il-sm .fx-fine{display:none}\n@media (max-width:72px){\n  .il-fine,.fx-fine{display:none}\n  .fx89-jelly-a,.fx89-jelly-b{background-size:100% 40px; opacity:.7; filter:blur(2px)}\n}\n\n/* \u2014\u2014 reduced motion: static mid glow, no breath, no flashes \u2014\u2014\u2014 */\n@media (prefers-reduced-motion:reduce){\n  .fx89-spiral,.fx89-spiral.awake,.fx89-spiral.asleep,.fx111-spiral,\n  .fx89-shell,.fx89-mid,.fx89-hot,.fx89-flame,.fx111-shell,.fx111-mid,.fx111-hot,\n  .fx111-core-soft,.fx89-ed,.fx89-ember,.fx111-ember,\n  .fx89-jelly-a,.fx89-jelly-b,\n  .fx89-jelly-up .fx89-jelly-a,.fx89-jelly-up .fx89-jelly-b,\n  .fx89-pv-spiral,.fx89-pv-core .fx89-pv-s,.fx89-pv-core .fx89-pv-m,\n  .fx89-pv-ember path,.fx89-pv-jelly .fx89-pv-rows,.fx89-pv-smoke path,\n  .today64.fx89-swap .lamp76-hero{\n    animation:none!important;\n    transition:none!important;\n  }\n  .fx89-spiral,.fx89-spiral.awake,.fx89-spiral.asleep,.fx111-spiral{\n    transform:scale(1)!important;\n  }\n  .fx89-shell,.fx89-mid,.fx89-hot,.fx111-shell,.fx111-mid,.fx111-hot,\n  .fx111-core-soft{\n    opacity:.88;\n    transform:translate(-50%,-50%) scale(1)!important;\n  }\n  .fx89-jelly-a,.fx89-jelly-b{\n    opacity:.55;\n    background-position:0 10px;\n  }\n  .fx89-flame{opacity:.95}\n  .fx111-smoke-haze{opacity:.36}\n}\n/* Same still look when JS sets .still or .reduce73 (lampReduced73). */\n.fx89-layer.still .fx89-shell,\n.fx89-layer.still .fx89-mid,\n.fx89-layer.still .fx89-hot,\n.fx89-layer.still .fx89-flame,\n.fx89-layer.still .fx111-core-soft,\n.reduce73 .fx89-shell,.reduce73 .fx89-mid,.reduce73 .fx89-hot,\n.reduce73 .fx89-flame,.reduce73 .fx111-core-soft{\n  animation:none!important;\n  transform:translate(-50%,-50%) scale(1)!important;\n  opacity:.88;\n}\n.fx89-layer.still .fx89-jelly-a,\n.fx89-layer.still .fx89-jelly-b,\n.reduce73 .fx89-jelly-a,.reduce73 .fx89-jelly-b{\n  animation:none!important;\n  background-position:0 10px;\n  opacity:.55;\n}\n\n/* QA: in-app reduce must also stop the everyday Inner light breath and hide\n   the spark, so .reduce73 / .fx89-layer.still match OS prefers-reduced-motion\n   and lamp_reduced.png. The media-query block above is unchanged.\n   Pass still=true into the ember JS: CSS animation:none does not stop SMIL\n   animateMotion. */\n.reduce73 .il-h,\n.reduce73 .il-c,\n.fx89-layer.still .il-h,\n.fx89-layer.still .il-c{\n  animation:none!important;\n}\n.reduce73 .il-sp,\n.fx89-layer.still .il-sp{\n  animation:none!important;\n  opacity:0;\n}\n\n\n/* v123 extras: QA final notes \u2014 smoke behind the lantern, Bright core sized to the box,\n   Moss hook uses the live data-flame81 attribute, reduce73 on .lamp73-shell reaches .il-h. */\n.il-n{fill:none;stroke:#FFF6D8;stroke-linecap:round}\n.lamp73-shell>.lamp73-stage{position:relative;z-index:2}\n.lamp73-shell>.fx89-layer.fx89-smoke{z-index:0!important}\n.today64>.lamp76-hero>.fx89-layer.fx89-smoke{z-index:0}\n.today64>.lamp76-hero .lamp73-figure{position:relative;z-index:2}\n.lamp73-shell:has(.fx89-smoke) .lamp73-svg,\n.today64:has(.fx89-smoke) .lamp73-svg{\n  filter:drop-shadow(0 0 0.6px #120E18) drop-shadow(0 0 1.4px #120E18);\n}\n.lamp73-shell>.fx89-layer.fx89-core{z-index:0!important}\n.lamp73-shell>.fx89-layer.fx89-core,\n.lamp73-shell>.fx89-layer.fx89-core-flame{\n  inset:0!important;width:100%!important;height:100%!important;\n  left:auto!important;top:auto!important;right:auto!important;bottom:auto!important;\n  transform:none;\n}\n.today64>.lamp76-hero>.fx89-layer.fx89-core{\n  inset:0!important;width:100%!important;height:100%!important;\n  left:0!important;top:0!important;right:0!important;bottom:0!important;\n  transform:none!important;\n}\n.lamp73-shell .fx89-shell,.lamp73-shell .fx111-shell{width:110%;height:110%}\n.lamp73-shell .fx89-mid,.lamp73-shell .fx111-mid{width:72%;height:72%}\n.lamp73-shell .fx89-hot,.lamp73-shell .fx111-hot{width:36%;height:40%}\n.lamp73-shell .fx111-core-soft{width:120%;height:120%;filter:blur(10px)}\n.lamp73-shell:has([data-flame81=\"moss\"]) .fx89-hot,\n.lamp73-shell:has([data-flame81=\"moss\"]) .fx89-flame,\n.lamp73-shell[data-glow=\"moss\"] .fx89-hot,\n.lamp73-shell[data-glow=\"moss\"] .fx89-flame{\n  background:radial-gradient(ellipse at 50% 42%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 0%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 22%,\n    color-mix(in oklab,var(--f81-core,#96d88f) 70%,transparent) 58%,\n    transparent 76%);\n}\n.lamp73-shell.reduce73 .il-h,\n.lamp73-shell.reduce73 .il-c{animation:none!important}\n.lamp73-shell.reduce73 .il-sp{animation:none!important;opacity:0}\n";

function lampWiseTouch120(pal){
  const tip=pal&&pal.tip||'#FFF6D8', core=pal&&pal.core||'#FFE4A4';
  // Two shoulder motes, full-size only (il-fine). Exact mirror about x=100.
  const fine='<path class="il-fine" d="M64 108h0 M136 108h0" fill="none" stroke="'+core+'" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>';
  // Three crown motes, always on, r=4–4.2 (≈1.75–1.85 px at 44). Warmer gold.
  const motes='<g fill="'+core+'"><circle cx="100" cy="72" r="4.2" opacity=".92"/><circle cx="70" cy="86" r="4" opacity=".86"/><circle cx="130" cy="86" r="4" opacity=".86"/></g>';
  // Norma, the Carpenter's Square. Official 4-star Stellarium figure, stylized placement.
  // Bold at 44 px: γ², ε, η (the L). δ and the lines are il-fine.
  const norma='<path class="il-n" d="M110 62h0M91 62h0M113 44h0" stroke-width="7" opacity=".8"/><path class="il-n il-fine" d="M113 44 110 62 91 62 87 34Z" stroke-width="1.2" opacity=".4"/>';
  return fine+motes+norma;
}
/* Credit (Grown-ups / About), next to the existing HYG credit from v111:
 *   EN: "Norma, the Carpenter's Square. " + STAR_CREDIT111
 *   ES: "Norma, la Escuadra de carpintero. " + STAR_CREDIT_ES111
 *   Plus: the square is turned so it reads above the lantern; it is not a real
 *   sky placement. From Cache County, Utah, Norma only peeks a hair above our
 *   southern horizon, too low to see — its highest star culminates only about 3° up.
 *
 * ================================================================
 * 2) EFFECT JS  —  REQUIRED. The live v89 / v111 generators must be replaced.
 *    Coordinates are in the 100-viewBox of the effect SVG (200-vb art / 2).
 * ================================================================
 *
 * Sleeping spiral — 8 cool bold dots circling in a ring, with a dark gap
 * around the lantern (≥4 units in this 100-vb, = 8 in the 200-vb art).
 * Fine seeds are classed fx-fine so the 44 px hide applies (svg.il-sm .fx-fine
 * and the existing @media). Cool fills so this is not mistaken for embers.
 */
function lampFxSpiralSVG121(asleep,still){
  const cool=['#E0ECF6','#D4E4F4','#C8D8E8'];
  // 8 bold pockets, clockwise from top-right; exact mirror about x=50.
  const bold=[[70,34,1.95],[77,54,1.8],[76,75,1.95],[61,90,1.8],
              [39,90,1.95],[24,75,1.8],[23,54,1.95],[30,34,1.8]];
  const b=bold.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+
    '" fill="'+cool[i%3]+'" opacity="'+(i%2?'.76':'.86')+'"/>').join('');
  // 13 quieter fine seeds further out. Class fx-fine: hidden at 44 px.
  const GA=Math.PI*(3-Math.sqrt(5)),fine=[];
  for(let j=0;j<13;j++){
    const a=(j+0.25)*GA+0.4, grow=32+5*(j/12);
    const x=50+grow*Math.cos(a), y=63+grow*1.08*Math.sin(a);
    if(x<8||x>92||y<8||y>96)continue;
    // skip the Norma box (43–57, 17–31) and the crown motes
    if(x>41&&x<59&&y>15&&y<33)continue;
    fine.push('<circle class="fx-fine" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+
      '" r="'+(0.85+0.2*(j%3)/2).toFixed(2)+'" fill="'+cool[j%3]+
      '" opacity="'+(.4+.15*(j%3)/2).toFixed(2)+'"/>');
  }
  const st=(still?' still':'')+(asleep&&!still?' asleep':' awake');
  return '<svg class="fx89-spiral fx111-spiral'+st+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">'+fine.join('')+b+'</svg>';
}

/* Ember pulses — fewer, bigger WARM motes RISING on VERTICAL paths.
 * Distinct from the spiral's cool ring. The live v89 path (M50 92 C47 80…)
 * climbs the old centreline and crosses the new motes and Norma — do not
 * keep it.
 *
 * REQUIRED: pass still=true under lampFxReduced89 / .reduce73. CSS
 * animation:none does not stop SMIL animateMotion.
 */
function lampFxEmberSVG121(still){
  const warm=['#FFE0A0','#FFD078','#F0B85A'];
  // Two vertical tracks, 100-vb. Left and right of the lantern, clear of Norma.
  const L='M27 82 L25.5 36', R='M73 80 L75 29';
  const motes=[[27,74,3.2,4.25,0,.95],[26,54,2.8,3.7,1,.88],
               [73,66,3.1,4.1,0,.92],[74.5,45,2.7,3.5,2,.84]];
  const tracks='<path class="fx-fine" d="'+L+'" fill="none" stroke="#E0A850" stroke-width=".7" opacity=".28" stroke-linecap="round"/>'
    +'<path class="fx-fine" d="'+R+'" fill="none" stroke="#E0A850" stroke-width=".7" opacity=".28" stroke-linecap="round"/>';
  let dots='';
  if(still){
    motes.forEach((m,i)=>{
      const col=warm[m[4]];
      dots+='<ellipse cx="'+m[0]+'" cy="'+(m[1]+m[3]*1.15)+'" rx="'+(m[2]*.42).toFixed(2)+
        '" ry="'+(m[3]*.85).toFixed(2)+'" fill="'+col+'" opacity="'+(m[5]*0.32).toFixed(2)+'"/>'
        +'<ellipse cx="'+m[0]+'" cy="'+m[1]+'" rx="'+m[2]+'" ry="'+m[3]+
        '" fill="'+col+'" opacity="'+m[5]+'"/>';
    });
  }else{
    // Rise along the vertical tracks; 14–20 s, gentle. Still mid-path dots if reduced.
    const along=[[L,0],[L,4],[R,1.5],[R,6]];
    along.forEach((a,i)=>{
      const m=motes[i], col=warm[m[4]];
      dots+='<ellipse rx="'+m[2]+'" ry="'+m[3]+'" fill="'+col+'" opacity="'+m[5]+
        '"><animateMotion dur="'+(14+i*2)+'s" repeatCount="indefinite" begin="-'+(a[1])+'s" path="'+a[0]+'"/></ellipse>';
    });
  }
  return '<svg class="fx89-ember fx111-ember'+(still?' still':'')+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">'
    +tracks+'<g>'+dots+'</g></svg>';
}

/* Wire the two functions over the v89/v111 wrappers:
 *   lampFxSpiralSVG89 = lampFxSpiralSVG121;
 *   lampFxEmberSVG89  = lampFxEmberSVG121;
 * Keep passing still=true when lampFxReduced89() is true.
 *
 * Comb jelly: CSS-only, but the SVG root (a descendant of .lamp73-shell)
 * MUST have data-il-kind="lamp" and data-il-stage="hatchling|young|grown|wise"
 * or the clip stays on the old clay pane.
 *
 * Optional Moss Spark nudge (FLAME81 hex unchanged): when binding Moss,
 * set the hot point to color-mix(in oklab, var(--f81-tip) 60%, #FFF6D8).
 */


/* ---- v123 wiring (do not wrap show()) ---- */
if(typeof document!=='undefined'&&!document.getElementById('v123fx')){
 const s=document.createElement('style');s.id='v123fx';
 s.textContent=CSS123;
 (document.documentElement||document.head).appendChild(s);
}

function pal123(){
 try{if(typeof lampFlamePal81==='function')return lampFlamePal81(typeof FLAME_CTX81!=='undefined'?FLAME_CTX81:undefined)}catch(e){}
 try{if(typeof lampPal101==='function')return lampPal101()}catch(e){}
 return {mid:'#E6B454',core:'#FFE4A4',tip:'#FFF6D8',deep:'#855A00'};
}
function tuneWiseHtml123(html){
 if(!html||typeof html!=='string')return html;
 try{
  return html.replace(/<path class="il-fine" d="M64 108h0 M70 86h0 M130 86h0 M136 108h0 M100 72h0"[^>]*\/?>/,lampWiseTouch120(pal123()));
 }catch(e){return html}
}
function phase123(stage){
 if(typeof IL119==='object'&&IL119.phase)return IL119.phase(stage);
 const s=Number(stage);
 return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}

{const prevLamp=typeof window.IL120==='object'&&typeof IL120.lamp==='function'?IL120.lamp:null;
 if(prevLamp){
  IL120.lamp=function(stage,opt){return tuneWiseHtml123(prevLamp.apply(this,arguments))};
 }
}
{const prevInner=typeof friendArtInner101==='function'?friendArtInner101:null;
 if(prevInner){
  friendArtInner101=function(id,stage){return tuneWiseHtml123(prevInner.apply(this,arguments))};
 }
}

if(typeof lampFxSpiralSVG89==='function')lampFxSpiralSVG89=lampFxSpiralSVG121;
if(typeof lampFxEmberSVG89==='function')lampFxEmberSVG89=lampFxEmberSVG121;

{const prev=typeof lampFxReduced89==='function'?lampFxReduced89:null;
 lampFxReduced89=function(){
  try{if(prev&&prev())return true}catch(e){}
  try{if(typeof lampReducedNow111==='function'&&lampReducedNow111())return true}catch(e){}
  try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
  return false;
 };
}

{const prev=typeof lampSvg73==='function'?lampSvg73:null;
 if(prev){
  lampSvg73=function(stage,cls,hero){
   let html=tuneWiseHtml123(prev.apply(this,arguments));
   try{
    const kind=(typeof FRIEND_ART_CTX101!=='undefined'&&FRIEND_ART_CTX101)||(typeof friendActive101==='function'&&friendActive101(typeof FLAME_CTX81!=='undefined'&&FLAME_CTX81||(typeof curPid==='function'&&curPid())))||'lamp';
    if(kind==='lamp'||!kind){
     const phase=phase123(stage);
     const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
     html=html.replace('<svg ',`<svg data-il-kind="lamp" data-il-stage="${phase}" `);
     if(phase==='wise'){
      const label=e(t('Norma, the Carpenter\'s Square'));
      html=html.replace('aria-hidden="true"',`aria-hidden="false" aria-label="${label}"`);
     }
    }
   }catch(e){}
   return html;
  };
 }
}

function markLampSize123(root){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll('svg.lamp73-svg').forEach(svg=>{
  const w=svg.getBoundingClientRect().width;
  if(w>0)svg.classList.toggle('il-sm',w<=52);
 });
}
function glowOnShell123(shell){
 if(!shell)return;
 try{
  const pal=typeof lampFlamePal81==='function'?lampFlamePal81(typeof FLAME_CTX81!=='undefined'&&FLAME_CTX81||(typeof curPid==='function'&&curPid())):null;
  if(pal&&pal.id){
   shell.setAttribute('data-glow',pal.id);
   const svg=shell.querySelector('svg.lamp73-svg[data-flame81]');
   if(svg)shell.setAttribute('data-glow',svg.getAttribute('data-flame81')||pal.id);
  }
 }catch(e){}
}
function shellForLayer123(layer){
 return layer.closest('.lamp73-shell')||(layer.parentElement&&layer.parentElement.querySelector('.lamp73-shell'))||(layer.closest('.lamp73-figure')&&layer.closest('.lamp73-figure').querySelector('.lamp73-shell'))||(layer.closest('.lamp76-hero')&&layer.closest('.lamp76-hero').querySelector('.lamp73-shell'))||(layer.closest('.today64')&&layer.closest('.today64').querySelector('.lamp73-shell'));
}
function layersIntoShell123(root,sel){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll(sel).forEach(layer=>{
  const shell=shellForLayer123(layer);
  if(!shell)return;
  if(layer.parentElement!==shell){
   const stage=shell.querySelector('.lamp73-stage');
   if(stage)shell.insertBefore(layer,stage);
   else shell.insertBefore(layer,shell.firstChild);
  }
 });
}
function smokeBehind123(root){
 layersIntoShell123(root,'.fx89-layer.fx89-smoke');
 // Bright core must size to the lantern box, not the today card.
 layersIntoShell123(root,'.fx89-layer.fx89-core:not(.fx89-core-flame)');
}
function reduceOnShell123(root){
 const host=root&&root.querySelectorAll?root:document;
 const on=typeof lampFxReduced89==='function'&&lampFxReduced89();
 host.querySelectorAll('.lamp73-shell').forEach(el=>{
  el.classList.toggle('reduce73',!!on);
  glowOnShell123(el);
 });
}

{const prev=typeof lampFxInsert89==='function'?lampFxInsert89:null;
 if(prev){
  lampFxInsert89=function(host,mode){
   const r=prev.apply(this,arguments);
   try{
    smokeBehind123(host||document);
    reduceOnShell123(host||document);
    markLampSize123(host||document);
   }catch(e){}
   return r;
  };
 }
}
{const prev=typeof lampFxDecorate111==='function'?lampFxDecorate111:null;
 if(prev){
  lampFxDecorate111=function(root){
   const r=prev.apply(this,arguments);
   try{
    reduceOnShell123(root||document);
    markLampSize123(root||document);
   }catch(e){}
   return r;
  };
 }
}
if(typeof document!=='undefined'){
 const ready=()=>{try{reduceOnShell123(document);markLampSize123(document);smokeBehind123(document)}catch(e){}};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);
 else setTimeout(ready,0);
 if(typeof window!=='undefined'&&!window._il123resize){
  window._il123resize=1;
  window.addEventListener('resize',()=>{try{markLampSize123(document)}catch(e){}});
 }
}

function normaCredit123(){
 const t=typeof gT==='function'?gT:s=>s;
 return t('Norma, the Carpenter\'s Square. Star places and brightness come from a small copy of the HYG Star Database (v4.4, Astronomy Nexus), used under CC BY-SA 4.0. https://creativecommons.org/licenses/by-sa/4.0/ Positions are for the year 2000. The stick-figure lines follow the Stellarium modern star pictures. The app does not go online to fetch stars. The square is turned so it reads above the lantern; it is not a real sky placement. From Cache County, Utah, Norma only peeks a hair above our southern horizon, too low to see — its highest star culminates only about 3° up.');
}
function normaAttach123(){
 const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
 const html=`<p class="soft" data-il-credit123="1">${e(normaCredit123())}</p>`;
 function add(root){
  if(!root||root.querySelector('[data-il-credit123]'))return;
  const host=root.querySelector('[data-il-credit120], [data-il-credit119], .lu83-credit, .card:last-child')||root;
  host.insertAdjacentHTML('beforeend',html);
 }
 add(typeof $==='function'?$('adults'):document.getElementById('adults'));
 add(typeof $==='function'?$('about'):document.getElementById('about'));
}
{const prevA=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prevA==='function'){
  renderAdults=function(){
   const r=prevA.apply(this,arguments);
   try{normaAttach123();licensesTxtLinks123(typeof $==='function'?$('adults'):document.getElementById('adults'))}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}
{const prevO=typeof renderAbout==='function'?renderAbout:(typeof RENDER==='object'&&RENDER.about);
 if(typeof prevO==='function'){
  renderAbout=function(){
   const r=prevO.apply(this,arguments);
   try{normaAttach123()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.about=renderAbout;
 }
}

function licensesTxtHref123(html){
 if(!html||typeof html!=='string')return html;
 return html.replace(/href="LICENSE-CONTENT"/g,'href="LICENSE-CONTENT.txt"')
            .replace(/href="LICENSE"/g,'href="LICENSE.txt"');
}
function licensesTxtLinks123(root){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll('[data-licenses122] a').forEach(a=>{
  const h=(a.getAttribute('href')||'').split('?')[0];
  if(h==='LICENSE-CONTENT')a.setAttribute('href','LICENSE-CONTENT.txt');
  else if(h==='LICENSE')a.setAttribute('href','LICENSE.txt');
 });
}
{const prevLic=typeof window.licensesHTML122==='function'?licensesHTML122:(typeof IL122==='object'&&IL122.html);
 if(typeof prevLic==='function'){
  const wrapped=function(){return licensesTxtHref123(prevLic.apply(this,arguments))};
  try{licensesHTML122=wrapped}catch(e){}
  if(typeof IL122==='object')IL122.html=wrapped;
 }
}
{const prevAtt=typeof window.licensesAttach122==='function'?licensesAttach122:(typeof IL122==='object'&&IL122.attach);
 if(typeof prevAtt==='function'){
  const wrapped=function(){
   const r=prevAtt.apply(this,arguments);
   try{licensesTxtLinks123(document)}catch(e){}
   return r;
  };
  try{licensesAttach122=wrapped}catch(e){}
  if(typeof IL122==='object')IL122.attach=wrapped;
 }
}

window.IL123={
 wise:lampWiseTouch120,spiral:lampFxSpiralSVG121,ember:lampFxEmberSVG121,
 credit:normaCredit123,phase:phase123
};

})();
