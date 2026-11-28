/* v180: fixes from QA's v179 pass.
   1. Constellation look: ten friends (Bee, Fern, Fox, Sun Tiger, Lion Cub, Firefly, Moss Hedgehog, Glowcap, Axolotl,
      Highland Cow) have no Constellation drawing, and v165 skipped their own art whenever the look was not Inner light,
      so they showed the generic lamp flame. (Already so in v178.) Now any friend whose look has no drawing of its own
      keeps its Inner light art. Friends with real Constellation art (Turtle, Owl, Moth, Lamp, grown Phoenix) keep it.
   2. Grown Phoenix's Constellation star figure had no friend tag, so the glow and the Sleeping spiral could not find it
      (spiral ~187 px off). It is tagged now; the hatchling Phoenix (no star figure) keeps its Inner art.
   3. Ember pulses at night: v179's window hid the motes over a face, but on the grown Fox the left vent path still ran
      through the face. Mote paths that cross a friend's face (eyes + mouth box) are moved sideways (or up) to clear it,
      for every friend and stage; v179's window stays as a second guard.
   4. Comb jelly on hatchlings and young friends sat ~20 px below the body (its stage-1/2 slot is low in the layer).
      The jelly window is centred on the layer (which v179 centres on the body) for every friend except the Lamp,
      whose jelly sits in its glass (v172). The Lamp-only glass edges are not drawn for other friends.
   5. Sound Cards keep playing when Soft sounds is turned off: turning Soft sounds off now stops them (scStop101),
      as U5 / U6 / See Your Sound already do. No sound content changes.
   6. (Art Director, live v179) Ember at night, 1280, motion on: 3.3-6.3% of the face changed on Bee, Fox, Owl, Lamp, Lion,
      Fern. Not motes: the ember layer over the blinking eyes made Chrome draw the face ~1 px differently. The friend art now
      always has its own layer (same pixels with or without an effect), and the face window is soft-edged (no straight edge
      above the Fox's eyes).
   7. (Art Director) Lamp Sleeping spiral: the lantern cut-out follows the stage's lantern size again (v179 used the grown size,
      hiding the young Lamp's top seed), and each stage's resting pose keeps every bold seed clear of the lantern.
   Nothing leaves the device. */
(function(){
'use strict';
if(typeof window==='undefined'||window.IL180)return;

/* ---------- 1 + 2: art for looks without a drawing of their own ---------- */
function canon(k){try{if(typeof IL165==='object'&&IL165.canon)return IL165.canon(k)}catch(e){}return k==='shell'?'turtle':k}
function order(){try{if(typeof IL165==='object'&&IL165.order)return IL165.order}catch(e){}return []}
function phase(st){try{if(typeof IL165==='object'&&IL165.phase)return IL165.phase(st)}catch(e){}var s=+st||1;return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise'}
function lookNow(opt){if(opt&&opt.look)return opt.look;try{if(typeof IL147==='object'&&IL147.load)return IL147.load()||'inner'}catch(e){}return 'inner'}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function tagged(html){return /data-il-kind="/.test(String(html||''))}
function starFig(html){return /class="[^"]*\bstarTrace111\b/.test(String(html||''))&&/data-starfig="/.test(String(html||''))}
var busy=0;
function innerArt(kind,stage){
 if(busy)return '';busy++;
 try{return (typeof IL119==='object'&&typeof IL119.art==='function')?(IL119.art(kind,stage,{look:'inner'})||''):''}catch(e){return ''}finally{busy--}
}
/* html = what the look produced; returns the friend's own art when the look had none */
function fix(kind,stage,html,look){
 if(!look||look==='inner')return html;
 var sp=canon(kind);if(order().indexOf(sp)<0)return html;
 if(tagged(html))return html;                       // the look's own drawing (or an already tagged Inner art)
 if(sp==='phoenix'&&starFig(html)){                 // grown Phoenix star figure: tag it so the glow / effects find it
  return '<g class="il119 il180" data-il-kind="phoenix" data-il-stage="'+esc(phase(stage))+'" data-il-look="'+esc(look)+'" data-il-pattern="triangle">'+html+'</g>';
 }
 var own=innerArt(kind,stage);
 return own&&tagged(own)?own:html;
}
function copyProps(from,to){try{Object.keys(from).forEach(function(k){to[k]=from[k]})}catch(e){}return to}
function hookArt(){
 if(typeof IL119==='object'&&typeof IL119.art==='function'&&!IL119.art._v180){
  var prev=IL119.art;
  IL119.art=copyProps(prev,function(kind,stage,opt){
   var html=prev.apply(this,arguments);
   if(busy)return html;
   try{return fix(kind,stage,html,lookNow(opt))}catch(e){return html}
  });
  IL119.art._v180=1;IL119.art._base=prev._base||prev;
 }
 if(typeof window.friendArtInner101==='function'&&!window.friendArtInner101._v180){
  var prevF=window.friendArtInner101;
  window.friendArtInner101=copyProps(prevF,function(id,stage){
   var html=prevF.apply(this,arguments);
   if(busy)return html;
   try{return fix(id,stage,html,lookNow())}catch(e){return html}
  });
  window.friendArtInner101._v180=1;window.friendArtInner101._base=prevF._base||prevF;
 }
}
hookArt();

/* ---------- 4: comb jelly window on the body for every friend but the Lamp ---------- */
var st=document.createElement('style');st.id='v180css';
var NL=':is(.lamp73-shell,.lamp76-hero,dialog.lamp73-dialog):not(:has([data-il-kind="lamp"]))';
st.textContent=NL+' .fx89-layer.fx89-jelly .fx89-jelly-clip{top:50%!important;translate:0 -50%!important}'+
 NL+' .fx89-layer.fx89-jelly .fx2-jedge{display:none!important}'+
 /* Art Director (v179 live): on the young and hatchling Lamp the Sleeping spiral's lantern cut-out was the grown-size
    lantern (v179 set its size to 100%), so the top seed sat half under an invisible cap. The cut-out follows the stage's
    lantern again (v172's --lx-s); v179's bigger plain layer (seeds may draw past the box) is kept. */
 '.lamp73-shell:has([data-il-kind="lamp"][data-il-look="inner"])>.fx89-layer.fx89-spiral{-webkit-mask-size:calc(100% * var(--lx-s,1)) calc(100% * var(--lx-s,1)),200% 200%!important;mask-size:calc(100% * var(--lx-s,1)) calc(100% * var(--lx-s,1)),200% 200%!important}'+
 /* ...and the Sleeping spiral's resting pose puts every bold seed clear of the lantern (handle, cap, feet), per stage:
    a turn of the whole ring (the spin goes on from there) and, where no turn is enough, a slightly wider ring.
    Centre unchanged. Measured by probe-lampseeds.js (fraction of each seed under the cut-out, 0 at rest). */
 [['hatchling',0,1.06],['young',56,1],['grown',280,1.1],['wise',276,1.1]].map(function(a){
  return '.lamp73-shell:has([data-il-kind="lamp"][data-il-look="inner"][data-il-stage="'+a[0]+'"]):not(#fx2):not(#v180) svg.fx2-spiral .fx2-ctr{transform:translate(50px,calc(var(--lx-cyn) * 1px)) rotate('+a[1]+'deg) scale('+a[2]+')}'}).join('')+
 /* Art Director's FACE check (night, 1280, motion on: the page with the ember vs without it) read 3.3-6.3% on six
    friends. The ember motes are not over the face (the layer alone reads 0% in every frame); the face itself was
    drawn ~1 px differently: with the 200 px ember layer over the blinking eyes (an opacity animation), Chrome
    rasterised the friend art in a separate pass and the nose / mouth / outline snapped to other pixels. The friend
    art now always gets its own layer, so it is drawn the same with or without an effect over it. */
 'svg.lamp73-svg{will-change:opacity}'+
 /* ember face window: soft-edged (v179's was a hard rectangle that left a straight edge in the ember light above the
    Fox's eyes); see route() for its size */
 '.fx89-layer.fx89-ember.v179face.v180face{-webkit-mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,radial-gradient(closest-side,#000 62%,rgba(0,0,0,0) 100%) var(--v180fp)/var(--v180fw) var(--v180fh) no-repeat!important;-webkit-mask-composite:xor!important;'+
 'mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,radial-gradient(closest-side,#000 62%,rgba(0,0,0,0) 100%) var(--v180fp)/var(--v180fw) var(--v180fh) no-repeat!important;mask-composite:exclude!important}';
(document.head||document.documentElement).appendChild(st);

/* ---------- 3: ember mote paths clear of the face ---------- */
var PAD=3.6;   // mote radius (<= 3.3 in the 100 box) + margin
function faceBox(svg){var fb=null;svg.querySelectorAll('.il-xs-hide').forEach(function(e){var r=e.getBoundingClientRect();if(!r.width||r.width>=200)return;
 fb=fb?{l:Math.min(fb.l,r.left),t:Math.min(fb.t,r.top),r:Math.max(fb.r,r.right),b:Math.max(fb.b,r.bottom)}:{l:r.left,t:r.top,r:r.right,b:r.bottom}});return fb}
function nums(s){return (String(s).match(/-?\d*\.?\d+/g)||[]).map(Number)}
function shiftPath(s,dx,dy){var i=0;return String(s).replace(/-?\d*\.?\d+/g,function(n){var v=+n+(i++%2?dy:dx);return (Math.round(v*100)/100).toString()})}
function bboxOf(s){var n=nums(s),b={l:1e9,t:1e9,r:-1e9,b:-1e9};for(var i=0;i+1<n.length;i+=2){b.l=Math.min(b.l,n[i]);b.r=Math.max(b.r,n[i]);b.t=Math.min(b.t,n[i+1]);b.b=Math.max(b.b,n[i+1])}return b}
function hit(a,F){return a.r+PAD>F.l&&a.l-PAD<F.r&&a.b+PAD>F.t&&a.t-PAD<F.b}
/* One move for all of a layer's mote paths, so the ember stays symmetric (its x centre does not move):
   spread the two vents apart by the same amount, or lift both by the same amount, whichever is smaller. */
function sideOf(B){var c=(B.l+B.r)/2;return c<49.5?-1:c>50.5?1:0}
function plan(Bs,F){
 if(!Bs.some(function(B){return hit(B,F)}))return {dx:0,dy:0};
 var spread=null,lift=null,d,ok;
 for(d=.25;d<=30;d+=.25){ok=Bs.every(function(B){var sd=sideOf(B);if(!sd)return !hit(B,F);var S={l:B.l+sd*d,r:B.r+sd*d,t:B.t,b:B.b};return S.l>=1&&S.r<=99&&!hit(S,F)});if(ok){spread=d;break}}
 for(d=.25;d<=40;d+=.25){ok=Bs.every(function(B){var S={l:B.l,r:B.r,t:B.t-d,b:B.b-d};return S.t>=-12&&!hit(S,F)});if(ok){lift=d;break}}
 if(spread==null&&lift==null)return null;
 if(lift==null||(spread!=null&&spread<=lift*1.3))return {spread:spread};
 return {lift:lift};
}
function moveOf(B,P){if(!P)return null;if(P.spread)return {dx:sideOf(B)*P.spread,dy:0};if(P.lift)return {dx:0,dy:-P.lift};return {dx:0,dy:0}}
function route(layer){
 var host=layer.closest('.lamp76-hero,dialog.lamp73-dialog')||layer.parentElement;if(!host)return;
 var svg=host.querySelector('svg.lamp73-svg'),es=layer.querySelector('svg');if(!svg||!es)return;
 var lr=es.getBoundingClientRect();if(!lr.width||!lr.height)return;
 var fb=faceBox(svg);
 var F=fb?{l:(fb.l-lr.left)/lr.width*100,r:(fb.r-lr.left)/lr.width*100,t:(fb.t-lr.top)/lr.height*100,b:(fb.b-lr.top)/lr.height*100}:null;
 var paths=[].slice.call(es.querySelectorAll('animateMotion[path],path.fx89-etrack'));
 var pts=[].slice.call(es.querySelectorAll('g.fx2-em[transform],circle.fx89-ed[cx]'));
 paths.forEach(function(el){var at=el.tagName.toLowerCase()==='animatemotion'?'path':'d';if(el.getAttribute('data-v180o')==null)el.setAttribute('data-v180o',el.getAttribute(at))});
 pts.forEach(function(el){if(el.getAttribute('data-v180o')==null)el.setAttribute('data-v180o',el.tagName.toLowerCase()==='g'?el.getAttribute('transform'):el.getAttribute('cx')+' '+el.getAttribute('cy'))});
 var boxes=paths.map(function(el){return bboxOf(el.getAttribute('data-v180o'))}).concat(pts.map(function(el){var n=nums(el.getAttribute('data-v180o'));return {l:n[0],r:n[0],t:n[1],b:n[1]}}));
 var P=F&&boxes.length?plan(boxes,F):{dx:0,dy:0},hidden=0;
 paths.forEach(function(el,i){
  var at=el.tagName.toLowerCase()==='animatemotion'?'path':'d',o=el.getAttribute('data-v180o');
  var mv=P&&(P.spread||P.lift)?moveOf(boxes[i],P):(P?{dx:0,dy:0}:null);
  var want=mv?shiftPath(o,mv.dx,mv.dy):o;if(el.getAttribute(at)!==want)el.setAttribute(at,want);
  var mote=at==='path'?el.parentNode:null;
  if(mote&&mote.style){if(!mv&&hit(boxes[i],F)){mote.style.display='none';hidden++}else if(mote.style.display==='none')mote.style.display=''}
 });
 pts.forEach(function(el,j){
  var B=boxes[paths.length+j],n=[B.l,B.t],isG=el.tagName.toLowerCase()==='g';
  var mv=P&&(P.spread||P.lift)?moveOf(B,P):(P?{dx:0,dy:0}:null);
  if(!mv){if(hit(B,F)){el.style.display='none';hidden++}return}
  if(el.style.display==='none')el.style.display='';
  var x=Math.round((n[0]+mv.dx)*100)/100,y=Math.round((n[1]+mv.dy)*100)/100;
  if(isG)el.setAttribute('transform','translate('+x+' '+y+')');else{el.setAttribute('cx',x);el.setAttribute('cy',y)}
 });
 /* soft window: an ellipse 1.6x the face box (+4 px), solid to 62% of its radius, fading out to its edge */
 if(fb){var lb=layer.getBoundingClientRect(),fw=(fb.r-fb.l+8)*1.6,fh=(fb.b-fb.t+8)*1.6,cx=(fb.l+fb.r)/2-lb.left,cy=(fb.t+fb.b)/2-lb.top;
  layer.style.setProperty('--v180fw',fw.toFixed(1)+'px');layer.style.setProperty('--v180fh',fh.toFixed(1)+'px');
  layer.style.setProperty('--v180fp',(cx-fw/2).toFixed(1)+'px '+(cy-fh/2).toFixed(1)+'px');layer.classList.add('v180face')}
 else layer.classList.remove('v180face');
 layer.setAttribute('data-v180face',!F?'none':!P?'hid'+hidden:P.spread?'spread'+P.spread:P.lift?'lift'+P.lift:'clear');
}
var tq=0;
function runEmbers(){tq=0;try{document.querySelectorAll('.fx89-layer.fx89-ember').forEach(function(l){if(l.getBoundingClientRect().width)route(l)})}catch(e){}}
function soon(){if(tq)return;tq=setTimeout(function(){requestAnimationFrame(runEmbers)},120)}
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x&&x.closest&&x.closest('.lamp76-hero,.lamp73-shell,dialog.lamp73-dialog')){soon();return}}})
 .observe(document.body||document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class','data-il-kind','data-il-stage','data-stage73']})}catch(e){}
window.addEventListener('resize',soon);window.addEventListener('load',soon);
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}catch(e){}
soon();

/* ---------- 5: Soft sounds off stops Sound Cards ---------- */
if(typeof window.lampSfxSet73==='function'&&!window.lampSfxSet73._v180){
 var prevS=window.lampSfxSet73;
 window.lampSfxSet73=copyProps(prevS,function(on){
  var r=prevS.apply(this,arguments);
  if(!on&&typeof window.scStop101==='function'){try{window.scStop101()}catch(e){}}
  return r;
 });
 window.lampSfxSet73._v180=1;
}

window.IL180={version:180,fixArt:fix,routeEmbers:runEmbers};
})();
