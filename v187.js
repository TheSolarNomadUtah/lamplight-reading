/* Lamplight v187 — Music Box song tiles follow the look's card and ink colors.
   v186 hardcoded a cream tile with color:inherit, so High contrast and a
   family's own dark colors made the song names disappear (C9 / LESSON 16).
   The pin-drum wrap (.mb186-cvwrap) now matches its drum canvas in every look.
   Selected gold rim is unchanged. No audio or voice changes.
   Mint Play / Reader chip: white on the mint accent was 4.18:1, so those
   accent fills use black text, same idea as High contrast already did. */
(function(root){
'use strict';
function css(){
  if(document.getElementById('v187css'))return;
  var s=document.createElement('style');s.id='v187css';
  s.textContent=
    '#mb186 button.mb186-song{'+
      'background:var(--card,#fffdf6);'+
      'color:var(--ink,#2f2a24);'+
      'border-color:color-mix(in srgb,var(--ink,#2f2a24) 28%,transparent)'+
    '}'+
    '#mb186 button.mb186-song[aria-pressed="true"],#mb186 button.mb186-song.on{'+
      'box-shadow:inset 0 0 0 3px #E6B454;border-color:#E6B454'+
    '}'+
    /* pin-drum / sand-plate wrap: match the canvas, which paints plum whenever
       the page is dark (High contrast, a family's own dark colors), not only Night.
       light-dark() follows the color-scheme applyLook() sets; older browsers
       keep the v186 cream. Night, dark and bedtime stay explicit. */
    '#mb186 .mb186-cvwrap{'+
      'background:#fff2d8;background:light-dark(#fff2d8,#1C1624);'+
      'box-shadow:inset 0 0 0 2px #72583f22;box-shadow:inset 0 0 0 2px light-dark(#72583f22,#E6B45444)'+
    '}'+
    'body.night #mb186 .mb186-cvwrap,html[data-look-theme="dark"] #mb186 .mb186-cvwrap,body.bedtime #mb186 .mb186-cvwrap{'+
      'background:#1C1624;box-shadow:inset 0 0 0 2px #E6B45444'+
    '}'+
    'html[data-look-theme="mint"] button.p,'+
    'html[data-look-theme="mint"] .bigbtn.p,'+
    'html[data-look-theme="mint"] .pchip.on{color:#000}';
  document.head.appendChild(s);
}
function boot(){css()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
root.IL187={version:187,css:css};
})(typeof window!=='undefined'?window:globalThis);


/* v187 Patterns Everywhere home-tile icon (Ignacio, 2026-11-25: "needs its own icon since there already is one with a Star").
   Original art: a Sierpinski triangle, depth 3 - 27 small triangles in 3 corner groups of 9 (counted from the drawing).
   Same plate as every Explore tile (cream #fff2d8, ink #72583f rim). No star, no emoji, no network.
   Load BEFORE the v187 Patterns tile fix IIFE. v106.js stays frozen: patTile106() looks up the global
   patTileArt106 at paint time, so pointing that name here swaps the star on every paint path. */
(function(root){
'use strict';
var ART187='<svg class="lamp-art63" data-original-art="patterns187" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="art-ink63"><g stroke="#72583f" stroke-width=".8" stroke-linejoin="round"><polygon points="50,13.74 45.75,21.1 54.25,21.1" fill="#e3b45f"/><polygon points="45.75,21.1 41.5,28.46 50,28.46" fill="#e3b45f"/><polygon points="54.25,21.1 50,28.46 58.5,28.46" fill="#e3b45f"/><polygon points="41.5,28.46 37.25,35.82 45.75,35.82" fill="#e3b45f"/><polygon points="37.25,35.82 33,43.19 41.5,43.19" fill="#e3b45f"/><polygon points="45.75,35.82 41.5,43.19 50,43.19" fill="#e3b45f"/><polygon points="58.5,28.46 54.25,35.82 62.75,35.82" fill="#e3b45f"/><polygon points="54.25,35.82 50,43.19 58.5,43.19" fill="#e3b45f"/><polygon points="62.75,35.82 58.5,43.19 67,43.19" fill="#e3b45f"/><polygon points="33,43.19 28.75,50.55 37.25,50.55" fill="#6f9a7a"/><polygon points="28.75,50.55 24.5,57.91 33,57.91" fill="#6f9a7a"/><polygon points="37.25,50.55 33,57.91 41.5,57.91" fill="#6f9a7a"/><polygon points="24.5,57.91 20.25,65.27 28.75,65.27" fill="#6f9a7a"/><polygon points="20.25,65.27 16,72.63 24.5,72.63" fill="#6f9a7a"/><polygon points="28.75,65.27 24.5,72.63 33,72.63" fill="#6f9a7a"/><polygon points="41.5,57.91 37.25,65.27 45.75,65.27" fill="#6f9a7a"/><polygon points="37.25,65.27 33,72.63 41.5,72.63" fill="#6f9a7a"/><polygon points="45.75,65.27 41.5,72.63 50,72.63" fill="#6f9a7a"/><polygon points="67,43.19 62.75,50.55 71.25,50.55" fill="#6f97b8"/><polygon points="62.75,50.55 58.5,57.91 67,57.91" fill="#6f97b8"/><polygon points="71.25,50.55 67,57.91 75.5,57.91" fill="#6f97b8"/><polygon points="58.5,57.91 54.25,65.27 62.75,65.27" fill="#6f97b8"/><polygon points="54.25,65.27 50,72.63 58.5,72.63" fill="#6f97b8"/><polygon points="62.75,65.27 58.5,72.63 67,72.63" fill="#6f97b8"/><polygon points="75.5,57.91 71.25,65.27 79.75,65.27" fill="#6f97b8"/><polygon points="71.25,65.27 67,72.63 75.5,72.63" fill="#6f97b8"/><polygon points="79.75,65.27 75.5,72.63 84,72.63" fill="#6f97b8"/></g><polygon points="50,13.74 16,72.63 84,72.63" fill="none" stroke="#72583f" stroke-width="2.2" stroke-linejoin="round"/></g></svg>';
function patTileArt187(){return ART187}
root.patTileArt187=patTileArt187;
try{ root.patTileArt106=patTileArt187; }catch(e){}
})(typeof window!=='undefined'?window:globalThis);

/* v187 Patterns Everywhere home-tile fix (append inside v187 or load after v186).
   Root cause: v106.js patTile106() (lines 1065–1074) injects the Explore tile and
   wraps renderHub (1083–1089) but never assigns RENDER.hub. Late paints — v37
   hubFresh() on window load (RENDER.hub()) and v181 bootReveal181 (renderHub()) —
   rebuild #hub from scratch. When that call does not go through the v106 wrap,
   the tile is wiped and never put back. Other Explore injectors (math.js, v83,
   v101) set both renderHub and RENDER.hub, so only this tile drops.
   No network. Older vNN left frozen. */
(function(root){
'use strict';
function $(id){return document.getElementById(id)}
function exploreGrid(){
  var h=$('hub'); if(!h) return null;
  return h.querySelector('.explore71 .hubgrid:not(.small)') ||
         h.querySelector('.explore71 .hubgrid') ||
         h.querySelector('.hubgrid:not(.small)') ||
         h.querySelector('.hubgrid');
}
function art(){
  if(typeof patTileArt187==='function') return patTileArt187();
  if(typeof patTileArt106==='function') return patTileArt106();
  var ink=(typeof patInk==='function')?patInk():'#72583f';
  return '<svg class="lamp-art63" data-original-art="patterns106" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">'+
    '<circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M18 70 Q32 40 50 58 Q68 76 84 42" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M50 22 L58 38 L74 40 L62 52 L66 68 L50 60 L34 68 L38 52 L26 40 L42 38Z" fill="#eac77d" stroke="'+ink+'" stroke-width="1.4"/>'+
    '<polygon points="22,78 30,78 26,86" fill="#6f9a7a" stroke="'+ink+'" stroke-width="1.1"/>'+
    '</svg>';
}
function freshArt187(btn){
  /* v106 patTile106() may have painted the old star before v187 loaded; swap it for the new icon. */
  var s=btn&&btn.querySelector('svg.lamp-art63');
  if(!s||typeof patTileArt187!=='function'||s.getAttribute('data-original-art')==='patterns187') return;
  if((freshArt187.n=(freshArt187.n||0)+1)>40) return; /* safety: never fight another painter in a loop */
  var tmp=document.createElement('div'); tmp.innerHTML=patTileArt187();
  if(tmp.firstElementChild) s.replaceWith(tmp.firstElementChild);
}
function label(){
  try{
    if(typeof patT==='function') return patT('Patterns Everywhere');
    if(typeof gT==='function') return gT('Patterns Everywhere');
  }catch(e){}
  return 'Patterns Everywhere';
}
function place(btn, grid){
  if(!btn||!grid) return;
  if(btn.parentNode===grid) return;
  var paint=[].slice.call(grid.querySelectorAll('.hubtile,button')).filter(function(b){
    return (b.getAttribute('onclick')||'').indexOf("show('paint')")>=0;
  })[0];
  if(paint&&paint.parentNode===grid) paint.after(btn);
  else grid.appendChild(btn);
}
function ensurePatTile187(){
  var h=$('hub');
  if(!h||h.classList.contains('hidden')) return;
  var grid=exploreGrid();
  if(!grid) return;
  var btn=h.querySelector('[data-patterns106]');
  if(btn){ place(btn, grid); freshArt187(btn); }
  if(!btn){
    btn=document.createElement('button');
    btn.type='button';
    btn.className='hubtile';
    btn.setAttribute('data-patterns106','1');
    btn.setAttribute('onclick',"show('patterns')");
    btn.innerHTML=art()+label();
    place(btn, grid);
    try{ if(typeof artRefresh63==='function') artRefresh63(btn); }catch(e){}
  }else if(!btn.querySelector('svg,img,.lamp-art63,.picture63')){
    btn.innerHTML=art()+label();
    try{ if(typeof artRefresh63==='function') artRefresh63(btn); }catch(e){}
  }
}
function wrapFn(fn){
  if(typeof fn!=='function'||fn._v187pat) return fn;
  var next=function(){
    var r=fn.apply(this,arguments);
    try{ ensurePatTile187(); }catch(e){}
    return r;
  };
  next._v187pat=1;
  if(fn._math) next._math=fn._math;
  if(fn._turtle105) next._turtle105=1;
  if(fn._v100retire) next._v100retire=1;
  if(fn._v92retire) next._v92retire=1;
  return next;
}
function hookHub187(){
  try{
    if(typeof renderHub==='function') root.renderHub=wrapFn(renderHub);
    if(typeof RENDER==='object'&&typeof RENDER.hub==='function'){
      if(RENDER.hub!==root.renderHub) RENDER.hub=wrapFn(RENDER.hub);
      if(typeof root.renderHub==='function') RENDER.hub=root.renderHub;
    }
    if(typeof afterShow95==='function'&&!afterShow95._v187pat){
      var prev=afterShow95;
      root.afterShow95=function(id){
        var r=prev.apply(this,arguments);
        try{ if(id==='hub') ensurePatTile187(); }catch(e){}
        return r;
      };
      root.afterShow95._v187pat=1;
    }
  }catch(e){}
}
function watchHub187(){
  if(watchHub187._on) return;
  watchHub187._on=1;
  var mo=new MutationObserver(function(){
    try{ ensurePatTile187(); }catch(e){}
  });
  function arm(){
    var h=$('hub');
    if(h&&!watchHub187._armed){ watchHub187._armed=1; mo.observe(h,{childList:true,subtree:true}); }
  }
  arm();
  document.addEventListener('DOMContentLoaded',arm);
  window.addEventListener('load',arm);
}
function bootPat187(){
  hookHub187();
  watchHub187();
  try{ ensurePatTile187(); }catch(e){}
  var again=function(){ hookHub187(); try{ ensurePatTile187(); }catch(e){} };
  if(document.readyState!=='complete'){
    window.addEventListener('load',function(){
      again();
      setTimeout(again,0);
      setTimeout(again,60);
    },{once:true});
  }else{
    setTimeout(again,0);
    setTimeout(again,60);
  }
  requestAnimationFrame(function(){ requestAnimationFrame(again); });
}
root.ensurePatTile187=ensurePatTile187;
root.bootPat187=bootPat187;
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bootPat187);
else bootPat187();
})(typeof window!=='undefined'?window:globalThis);

/* v187 grow-guard — append this IIFE to v187.js (Music Box contrast CSS stays above).
   Older vNN files are frozen.

   Root cause: v170.js:956-969 and v171.js:1277-1290 onResize call
   patGrowDraw106() after 80 ms whenever #patterns exists and PAT106.grow is
   truthy (it is always an object). They bail only if el.hidden === true, but
   show() hides pages with class "hidden" (v10.js:11, v97.js:29), not the
   hidden attribute. A window resize, rotation, or the mobile URL bar
   showing/hiding therefore replaces the Patterns Everywhere grid (or any
   other Patterns unit) with Grow a Fractal, and never sets PAT106.unit.
   v169.js:619-631 also listens, but it at least requires #patGrowCv.

   This hook no-ops patGrowDraw106 unless Grow is actually the open unit. */
(function(root){
'use strict';
function inGrow(){
  try{
    var el=document.getElementById('patterns');
    if(!el||el.classList.contains('hidden'))return false;
    return typeof PAT106==='object'&&PAT106.unit==='grow';
  }catch(e){return false}
}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v187grow)return prev;
  var next=wrap(prev);
  next._v187grow=1;
  next._base=prev;
  root[name]=next;
  return next;
}
hook('patGrowDraw106',function(prev){
  return function(){
    if(!inGrow())return;
    return prev.apply(this,arguments);
  };
});
root.IL187=root.IL187||{version:187};
root.IL187.growGuard=true;
root.IL187.inGrow=inGrow;
})(typeof window!=='undefined'?window:globalThis);
