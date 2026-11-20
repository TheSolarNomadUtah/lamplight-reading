/* v179: the Lamp glow and effects sit on every friend's drawn body (QA v178: Constellation Moth
   15 px left, Constellation Lamp 11 px high, Fox 8 px toward the tail).
   Why they missed: v175's older box-centring still ran after v178 on some redraws and won, and
   v178's small 96 px solid-only measure left out the soft parts of a friend the eye still reads
   as body. Now:
   - the friend is drawn once at 200 px (glow, plate, sparks, aura and sky square removed) and tiny
     isolated specks (stars, dust) are ignored; the ground shadow is not body; the glow goes to the midpoint
     of the body's box centre and its mass centre (see centre());
   - a measurement that looks wrong (empty, tiny, or far off the frame) is not used; the frame
     centre is used instead;
   - a result is only applied to the same picture it was measured from;
   - the move is held by a stylesheet rule, so older centring code can no longer pull it back.
   - the Lamp's own effect layers (v172) are drawn over the lantern art, so they stay on it (v178 moved them
     a second time, so the spiral sat 11-15 px low). On the Constellation Lamp the Bright core uses that jar's centre
     and the inner Lamp's redrawn belly window (it sat under the smaller jar) is hidden.
   Later in v179 (QA gate cross-check, Art Director audit, Pi):
   - body = the friend art only, same definition as the gate; centre = midpoint of the body's box centre and its
     alpha-mass centre (Builder's C1 rule); the dragon's gold aura and constellation star specks are not body;
   - a failed / implausible measure is never cached: retried after fonts and layout settle, then the drawn-shape box;
   - the Lamp's own effect layers are placed once per picture and never re-centred; its Sleeping spiral may draw
     past its box so the bottom seed is no longer cut;
   - ember motes get a small window over the face (night: motes no longer cross the eyes and mouth);
   - by day: no dark outline under smoke (it drew a grey-brown disc), and the night-sky dots are soft gold, not ink;
   - Firefly truth line says "On each wing" / "En cada ala" (1, 3, 9, 27 is per wing).
   Art, sounds and voices are unchanged. Nothing leaves the device. */
(function(){
'use strict';
if(typeof document==='undefined'||window.IL179)return;
var DROP='.lamp73-plate,.il-glow,.il-sp,.fx2-norma,.il-sky-chip,.il-h,.lamp-fx-light';
var N=200,TH=24,CACHE={};
/* also not body (QA gate cross-check): the dragon's gold aura ring and constellation star specks */
var BODYDROP='circle.il-p[r="69.8"],.starDot111,.starLantern111';
var st=document.createElement('style');st.id='v179ctr';
st.textContent='.v179t{translate:var(--v179t,0px 0px)!important}'+
 '.lamp73-shell.v179lk .fx2-cwin{display:none!important}'+
 'svg .lamp73-plate.v179p{transform:translate(var(--v179px,0px),var(--v179py,0px))!important}';
st.textContent+=
 /* ember window over the face (see faces()) */
 '.fx89-layer.fx89-ember.v179face{-webkit-mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,linear-gradient(#000,#000) var(--v179fp)/var(--v179fw) var(--v179fh) no-repeat!important;-webkit-mask-composite:xor!important;'+
 'mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,linear-gradient(#000,#000) var(--v179fp)/var(--v179fw) var(--v179fh) no-repeat!important;mask-composite:exclude!important}'+
 /* the Lamp's Sleeping spiral: its bottom seed ran past the layer's box and was cut. Let it draw past the box; the
    lantern-shaped cut-out stays exactly where it was, only the plain part of the mask is made bigger */
 '.lamp73-shell:has([data-il-kind="lamp"])>.fx89-layer.fx89-spiral,.lamp73-shell:has([data-il-kind="lamp"])>.fx89-layer.fx89-spiral>svg{overflow:visible!important}'+
 '.lamp73-shell:has([data-il-kind="lamp"])>.fx89-layer.fx89-spiral{mask-clip:no-clip!important;mask-size:100% 100%,200% 200%!important;mask-position:50% 92%,50% 50%!important}'+
 /* day theme (AD): v123's dark outline on a friend under smoke also shadowed the faint plate, drawing a grey-brown disc on
    the paper, and the night-sky dots were drawn in ink. By day: no outline under smoke, and the sky dots are soft gold. */
 'html:not([data-look-theme="dark"]):not([data-look-theme="contrast"]) .today64:not(.lamp76-night):has(.fx89-smoke) .lamp73-svg,'+
 'html:not([data-look-theme="dark"]):not([data-look-theme="contrast"]) body:not(.night76) dialog.lamp73-dialog .lamp73-shell:has(.fx89-smoke) .lamp73-svg{filter:none!important}'+
 'html:not([data-look-theme="dark"]):not([data-look-theme="contrast"]) .today64:not(.lamp76-night) .lamp81-star-dot{background:#d6a24c!important;box-shadow:0 0 6px rgba(230,180,84,.55),0 0 1px #b07f2c!important}';
(document.head||document.documentElement).appendChild(st);
/* key = the friend picture only (the art group, not the plate we move), so our own move never looks like a redraw */
function key(svg){var k=svg.querySelector('[data-il-kind]');if(!k)return null;var art=svg.querySelector('.lamp73-ink')||k;return k.getAttribute('data-il-kind')+'|'+k.getAttribute('data-il-stage')+'|'+(k.getAttribute('data-il-look')||'')+'|'+(svg.getAttribute('data-stage73')||'')+'|'+art.innerHTML.length}
/* Body centre from the drawn pixels (QA C1, 2026-11-19: body = no shadow, sparks or aura). Pieces
   smaller than 1% of the biggest piece (stars, dust) are ignored. The glow goes to the midpoint of the
   body's box centre and its alpha-weighted mass centre, so a long tail or tall horns pull it only halfway. */
/* Same body definition as the release gate (visual-center.js, QA cross-check): body alpha only; box = the 0.5..99.5
   percentile box of pixels with alpha >= 41/255; mass = alpha-weighted centre of pixels with alpha >= 15/255.
   Visual centre = midpoint of the two (Builder's C1 rule), so a long tail or tall horns pull it only halfway. */
function centre(d){
 var n=N*N,xs=[],ys=[],sa=0,sx=0,sy=0,i;
 for(i=0;i<n;i++){var al=d[i*4+3];if(al<15)continue;var x=i%N,y=(i-x)/N;sa+=al;sx+=al*x;sy+=al*y;if(al>=41){xs.push(x);ys.push(y)}}
 if(!xs.length||!sa)return null;
 xs.sort(function(a,b){return a-b});ys.sort(function(a,b){return a-b});
 var pc=function(a,p){return a[Math.min(a.length-1,Math.floor(p*(a.length-1)))]};
 var a0=pc(xs,.005),b0=pc(ys,.005),c0=pc(xs,.995),e0=pc(ys,.995);
 var bx=(a0+c0+1)/2/N,by=(b0+e0+1)/2/N,mx=(sx/sa+.5)/N,my=(sy/sa+.5)/N;
 return {fx:(bx+mx)/2,fy:(by+my)/2,bx:bx,by:by,mx:mx,my:my,w:(c0-a0+1)/N,h:(e0-b0+1)/N,n:xs.length};
}
function sane(r){return !!(r&&r.n>=N*N*.01&&r.w>=.15&&r.h>=.15&&r.fx>=.25&&r.fx<=.75&&r.fy>=.25&&r.fy<=.8)}
/* QA gate cross-check (v178): a failed or implausible measure was cached as the frame centre, so the glow
   could snap to the middle of the frame and stay there. Now a bad result is never cached: it is retried
   (after fonts, the stage and the layout settle), and only after 3 tries the friend's drawn-shape box
   (from the live art, shadow and aura left out) is used for that one draw. */
var TRIES={};
function boxFallback(svg){
 try{var vb=svg.viewBox&&svg.viewBox.baseVal,vw=(vb&&vb.width)||100,vh=(vb&&vb.height)||100,vx=(vb&&vb.x)||0,vy=(vb&&vb.y)||0;
  var art=svg.querySelector('.lamp73-ink')||svg,a=1e9,b=1e9,c=-1e9,e=-1e9;
  art.querySelectorAll('path,circle,ellipse,rect,polygon,polyline,line').forEach(function(el){
   if(el.closest(DROP)||el.matches(BODYDROP))return;if(el.matches('ellipse[fill="#E6B454"][opacity=".16"]')&&+el.getAttribute('cy')>=178)return;
   var bb;try{bb=el.getBBox()}catch(x){return}if(!bb||!bb.width||!bb.height||bb.width>=vw*.85&&bb.height>=vh*.85)return;
   if(bb.x<a)a=bb.x;if(bb.y<b)b=bb.y;if(bb.x+bb.width>c)c=bb.x+bb.width;if(bb.y+bb.height>e)e=bb.y+bb.height});
  if(c<a)return null;var f={fx:((a+c)/2-vx)/vw,fy:((b+e)/2-vy)/vh,fallback:'box'};
  return f.fx>.15&&f.fx<.85&&f.fy>.15&&f.fy<.9?f:null}catch(x){return null}}
function measure(svg,cb){
 var k=key(svg);if(!k)return cb(null,k);if(CACHE[k])return cb(CACHE[k],k);
 var bad=function(){var n=TRIES[k]=(TRIES[k]||0)+1;
  if(n<3){var again=function(){setTimeout(soon,250*n)};try{document.fonts&&document.fonts.ready?document.fonts.ready.then(again):again()}catch(x){again()}return cb(null,k)}
  cb(boxFallback(svg),k)};
 try{
  var c=svg.cloneNode(true);c.querySelectorAll(DROP+','+BODYDROP).forEach(function(e){e.remove()});
  c.querySelectorAll('rect[fill="#120E18"]').forEach(function(e){e.remove()});
  /* only the friend art group (.lamp73-ink) is body, as in the gate */
  var ink=c.querySelector('.lamp73-ink');if(ink)c.querySelectorAll('path,circle,ellipse,rect,polygon,polyline,line,text,use,image').forEach(function(e){if(!ink.contains(e)&&!e.closest('defs,clipPath,mask,pattern,symbol,linearGradient,radialGradient,filter'))e.remove()});
  /* the ground shadow under every friend (v165 art: a faint gold ellipse at the feet) is not body */
  c.querySelectorAll('ellipse[fill="#E6B454"][opacity=".16"]').forEach(function(e){if(+e.getAttribute('cy')>=178)e.remove()});
  c.setAttribute('width',N);c.setAttribute('height',N);c.setAttribute('xmlns','http://www.w3.org/2000/svg');
  c.removeAttribute('class');c.removeAttribute('style');
  var src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c));
  var im=new Image();
  im.onload=function(){var r=null;try{var cv=document.createElement('canvas');cv.width=cv.height=N;var x=cv.getContext('2d');x.drawImage(im,0,0,N,N);
    r=centre(x.getImageData(0,0,N,N).data)}catch(e){r=null}
   if(sane(r)){CACHE[k]=r;delete TRIES[k];cb(r,k)}else bad()};
  im.onerror=bad;im.src=src;
 }catch(e){bad()}}
function ctr(el){var r=el.getBoundingClientRect();return {cx:r.left+r.width/2,cy:r.top+r.height/2,w:r.width}}
function hold(el,dx,dy){el.style.setProperty('--v179t',(Math.round(dx*10)/10)+'px '+(Math.round(dy*10)/10)+'px');el.classList.add('v179t')}
function base(el){el.classList.remove('v179t');el.style.translate='';return ctr(el)}
function mv(el,ink){if(!el)return;var c=base(el);if(!c.w)return;hold(el,ink.cx-c.cx,ink.cy-c.cy)}
function apply(shell,svg,f,k){
 var sr=svg.getBoundingClientRect();if(!sr.width)return;
 var ink={cx:sr.left+f.fx*sr.width,cy:sr.top+f.fy*sr.height};
 var vb=svg.viewBox&&svg.viewBox.baseVal,vw=(vb&&vb.width)||100,vh=(vb&&vb.height)||100,vx=(vb&&vb.x)||0,vy=(vb&&vb.y)||0;
 var plate=svg.querySelector('.lamp73-plate');
 if(plate){var pcx=+plate.getAttribute('cx')||50,pcy=+plate.getAttribute('cy')||50;
  plate.style.setProperty('--v179px',(vx+f.fx*vw-pcx).toFixed(2)+'px');plate.style.setProperty('--v179py',(vy+f.fy*vh-pcy).toFixed(2)+'px');plate.classList.add('v179p')}
 var light=shell.querySelector('svg.lamp-fx-light');
 if(light){var h=light.querySelector('.halo');if(h){base(light);var hc=ctr(h);if(hc.w)hold(light,ink.cx-hc.cx,ink.cy-hc.cy)}}
 /* The Lamp's own effect layers (v172) are drawn over the lantern art with its stage geometry
    (--lx-wy window, --lx-cyn lantern centre), so they stay put on the inner Lamp (spiral included). A Lamp in another
    look (Constellation) has a smaller jar: give those layers this art's centre, and hide the inner
    Lamp's redrawn belly window, which would sit under the jar. */
 var lk=svg.querySelector('[data-il-kind="lamp"]'),other=!!lk&&(lk.getAttribute('data-il-look')||'inner')!=='inner',cy=(f.fy*100).toFixed(1);
 shell.classList.toggle('v179lk',other);
 shell.querySelectorAll(':scope>.fx89-layer,:scope>.fx111-core-soft').forEach(function(el){
  if(!lk){if(el.matches('.fx89-core,.fx89-core-flame'))return;mv(el,ink);return}
  /* placed once per picture; never moved again (QA: re-translating it cut the spiral's seeds) */
  var tag=k+'|'+other;if(el.getAttribute('data-v179k')===tag)return;el.setAttribute('data-v179k',tag);
  hold(el,0,0);
  if(other){el.style.setProperty('--lx-cyn',cy);el.style.setProperty('--lx-wy',cy+'%')}
  else{el.style.removeProperty('--lx-cyn');el.style.removeProperty('--lx-wy')}
 });
 if(!lk)coreGroup(shell,ink);
 var hero=shell.closest('.lamp76-hero,dialog.lamp73-dialog');
 if(hero)hero.querySelectorAll(':scope>.lamp76-glow,:scope>.fx89-layer').forEach(function(el){mv(el,ink)});
 faces(shell,svg);
}
/* Art Director (v178 audit): at night the ember motes crossed the friend's face (2-6% of it on dragon, bee,
   fox, sun tiger, axolotl). The ember layer now has a small window cut out over the face (the eyes and
   mouth group, .il-xs-hide, as AD measures it), so motes fade out there and show again above the head. */
function faces(shell,svg){
 var host=shell.closest('.lamp76-hero,dialog.lamp73-dialog')||shell;
 var fb=null;svg.querySelectorAll('.il-xs-hide').forEach(function(e){var r=e.getBoundingClientRect();if(!r.width||r.width>=200)return;
  fb=fb?{l:Math.min(fb.l,r.left),t:Math.min(fb.t,r.top),r:Math.max(fb.r,r.right),b:Math.max(fb.b,r.bottom)}:{l:r.left,t:r.top,r:r.right,b:r.bottom}});
 host.querySelectorAll('.fx89-layer.fx89-ember').forEach(function(el){
  if(!fb){el.classList.remove('v179face');return}
  var r=el.getBoundingClientRect();if(!r.width)return;var P=4;
  el.style.setProperty('--v179fw',(fb.r-fb.l+2*P).toFixed(1)+'px');el.style.setProperty('--v179fh',(fb.b-fb.t+2*P).toFixed(1)+'px');
  el.style.setProperty('--v179fp',(fb.l-P-r.left).toFixed(1)+'px '+(fb.t-P-r.top).toFixed(1)+'px');
  el.classList.add('v179face')});
}
/* Bright core (v89/v111): its glow pieces sit below the layer's middle (v89 places them at ~56% with the light at
   46-48% of each piece) and a small flame sits above, so centring the layer's box put the drawn light ~4 px below the
   body (gate). Centre the core by where its light is drawn instead: each piece's gradient centre, weighted by its
   area and strength. The core and its flame move together (the flame stays on top). */
function gradCentre(e){var r=e.getBoundingClientRect();if(!r.width)return null;var cs=getComputedStyle(e),bg=cs.backgroundImage;if(!bg||bg.indexOf('radial-gradient')<0)return null;
 var m=bg.match(/at ([\d.]+)% ([\d.]+)%/),px=m?+m[1]/100:.5,py=m?+m[2]/100:.5;
 var a=bg.match(/\/ ([\d.]+)\)/),al=1;var first=bg.slice(bg.indexOf('(')+1);var fc=first.match(/^[^,]*?(?:circle|ellipse|at [^,]*)?,\s*([a-z]+\([^)]*\))/);
 if(fc){var mm=fc[1].match(/\/ ([\d.]+)\)$/)||fc[1].match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);if(mm)al=+mm[1]}
 var w=r.width*r.height*al*(+cs.opacity||0);return {x:r.left+px*r.width,y:r.top+py*r.height,w:w}}
function coreGroup(shell,ink){
 var ls=shell.querySelectorAll(':scope>.fx89-layer.fx89-core,:scope>.fx89-layer.fx89-core-flame');if(!ls.length)return;
 var sw=0,sx=0,sy=0;ls.forEach(function(l){base(l)});
 ls.forEach(function(l){l.querySelectorAll('*').forEach(function(e){var g=gradCentre(e);if(g&&g.w>0){sw+=g.w;sx+=g.w*g.x;sy+=g.w*g.y}})});
 var c;if(sw){c={cx:sx/sw,cy:sy/sw}}else c=ctr(ls[0]);
 ls.forEach(function(l){hold(l,ink.cx-c.cx,ink.cy-c.cy)});
}
var t=0;
function one(s){var svg=s.querySelector('svg.lamp73-svg');if(!svg)return;
 measure(svg,function(f,k){if(!f)return;
  /* only apply to the picture we measured; if it was redrawn meanwhile, measure again */
  if(s.querySelector('svg.lamp73-svg')!==svg||key(svg)!==k){soon();return}
  try{apply(s,svg,f,k)}catch(e){}})}
function run(){t=0;watch();try{document.querySelectorAll('.lamp73-shell').forEach(function(s){if(s.offsetParent)one(s)})}catch(e){}}
function soon(){if(t)return;t=setTimeout(function(){requestAnimationFrame(run)},90)}
/* v178's wrappers dropped the wrapped functions' own markers (LampFx2's _lfx2 on lampFxInsert89),
   so anything guarding on _lfx2 would wrap again. Put it back, and keep every prop on our own wraps. */
try{if(typeof lampFxSpiralSVG89==='function'&&lampFxSpiralSVG89._lfx2&&typeof window.lampFxInsert89==='function'&&!window.lampFxInsert89._lfx2)window.lampFxInsert89._lfx2=1}catch(e){}
['lampMountAll73','lampFxRemount89','lampFxInsert89','lampFxDecorate111'].forEach(function(n){var f=window[n];if(typeof f!=='function')return;
 var w=function(){var r=f.apply(this,arguments);soon();return r};
 try{Object.keys(f).forEach(function(k){w[k]=f[k]})}catch(e){}
 window[n]=w});
/* re-centre on any redraw, on a friend / stage / look change, and when the hero's size changes
   after layout (fonts, images, card growth), so the result never depends on load timing */
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x&&x.closest&&x.closest('.lamp76-hero,.lamp73-shell,dialog.lamp73-dialog')){soon();return}}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-il-kind','data-il-stage','data-il-look','data-stage73']})}catch(e){}
var RO=null,seen=typeof WeakSet==='function'?new WeakSet():null;
try{RO=new ResizeObserver(function(){soon()})}catch(e){}
function watch(){if(!RO||!seen)return;document.querySelectorAll('.lamp73-shell,.lamp76-hero').forEach(function(el){if(!seen.has(el)){seen.add(el);try{RO.observe(el)}catch(e){}}})}
window.addEventListener('resize',soon);
window.addEventListener('load',soon);
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}catch(e){}
soon();
/* Pi (COMPANION_TRUTHS_v2): the Firefly's 1, 3, 9, 27 is drawn on EACH wing; counting both wings gives 2, 6, 18, 54.
   Say "on each wing" (as the Moth line does). ES: "En cada ala" (lang/es.json; flagged for the Spanish reviewer). */
(function(){var OLD='Take the middle out of every triangle, again and again: 1, 3, 9, 27.',NEW='On each wing, take the middle out of every triangle, again and again: 1, 3, 9, 27.';
 try{if(typeof window.gT==='function'&&!window.gT._v179){var G=window.gT;var w=function(s){if(s===OLD){var a=[].slice.call(arguments);a[0]=NEW;return G.apply(this,a)}return G.apply(this,arguments)};
  Object.keys(G).forEach(function(k){w[k]=G[k]});w._v179=1;window.gT=w}}catch(e){}})();
window.IL179={version:179,run:run,_centre:function(svg,cb){measure(svg,cb)}};
})();
