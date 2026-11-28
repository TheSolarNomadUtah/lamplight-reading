/* v178: centre every Lamp glow on the friend's body. v175 centred on the box around all of the art's
   shapes, but that box includes the ground shadow, sparkles and faint aura marks, so the glow sat off
   the body. Now the friend is drawn once to a small offscreen canvas (glow, plate, sparks and aura
   removed) and the solid pixels give the true centre. Results are cached per picture. */
(function(){
'use strict';
var DROP='.lamp73-plate,.il-glow,.il-sp,.fx2-norma,.il-sky-chip,.il-h,.lamp-fx-light';
var CACHE={},N=96;
function key(svg){var k=svg.querySelector('[data-il-kind]');return k?(k.getAttribute('data-il-kind')+'|'+k.getAttribute('data-il-stage')+'|'+(svg.getAttribute('data-stage73')||'')+'|'+svg.innerHTML.length):null}
function measure(svg,cb){
 var k=key(svg);if(!k)return cb(null);if(CACHE[k]!==undefined)return cb(CACHE[k]);
 try{
  var c=svg.cloneNode(true);c.querySelectorAll(DROP).forEach(function(e){e.remove()});
  c.querySelectorAll('rect[fill="#120E18"]').forEach(function(e){e.remove()});
  c.setAttribute('width',N);c.setAttribute('height',N);c.setAttribute('xmlns','http://www.w3.org/2000/svg');
  c.removeAttribute('class');
  var src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c));
  var im=new Image();
  im.onload=function(){try{var cv=document.createElement('canvas');cv.width=cv.height=N;var x=cv.getContext('2d');x.drawImage(im,0,0,N,N);
   var d=x.getImageData(0,0,N,N).data,a=N,b=N,cc=-1,dd=-1;
   for(var y=0;y<N;y++)for(var i=0;i<N;i++){if(d[(y*N+i)*4+3]>170){if(i<a)a=i;if(i>cc)cc=i;if(y<b)b=y;if(y>dd)dd=y}}
   CACHE[k]=cc<0?null:{fx:(a+cc+1)/2/N,fy:(b+dd+1)/2/N}}catch(e){CACHE[k]=null}cb(CACHE[k])};
  im.onerror=function(){CACHE[k]=null;cb(null)};im.src=src;
 }catch(e){cb(null)}}
function ctr(el){var r=el.getBoundingClientRect();return {cx:r.left+r.width/2,cy:r.top+r.height/2,w:r.width}}
function mv(el,ink){if(!el)return;el.style.translate='';var c=ctr(el);if(!c.w)return;
 var dx=Math.round((ink.cx-c.cx)*10)/10,dy=Math.round((ink.cy-c.cy)*10)/10;
 if(Math.abs(dx)<.5&&Math.abs(dy)<.5)return;el.style.translate=dx+'px '+dy+'px'}
function apply(shell,f){
 var svg=shell.querySelector('svg.lamp73-svg');if(!svg||!f)return;
 var sr=svg.getBoundingClientRect();if(!sr.width)return;
 var ink={cx:sr.left+f.fx*sr.width,cy:sr.top+f.fy*sr.height};
 var plate=svg.querySelector('.lamp73-plate');
 if(plate){plate.removeAttribute('transform');var pc=ctr(plate),vb=svg.viewBox&&svg.viewBox.baseVal,k=(vb&&vb.width)?vb.width/sr.width:1;
  var dx=(ink.cx-pc.cx)*k,dy=(ink.cy-pc.cy)*k;if(Math.abs(dx)+Math.abs(dy)>.3)plate.setAttribute('transform','translate('+dx.toFixed(2)+' '+dy.toFixed(2)+')')}
 var light=shell.querySelector('svg.lamp-fx-light');
 if(light){light.style.translate='';var h=light.querySelector('.halo');if(h){var hc=ctr(h);light.style.translate=Math.round((ink.cx-hc.cx)*10)/10+'px '+Math.round((ink.cy-hc.cy)*10)/10+'px'}}
 shell.querySelectorAll(':scope>.fx89-layer,:scope>.fx111-core-soft').forEach(function(el){mv(el,ink)});
 var hero=shell.closest('.lamp76-hero,dialog.lamp73-dialog');
 if(hero)hero.querySelectorAll(':scope>.lamp76-glow,:scope>.fx89-layer').forEach(function(el){mv(el,ink)});
}
var t=0;
function run(){t=0;try{document.querySelectorAll('.lamp73-shell').forEach(function(s){if(!s.offsetParent)return;var svg=s.querySelector('svg.lamp73-svg');if(svg)measure(svg,function(f){apply(s,f)})})}catch(e){}}
function soon(){if(t)return;t=setTimeout(function(){requestAnimationFrame(run)},80)}
['lampMountAll73','lampFxRemount89','lampFxInsert89','lampFxDecorate111'].forEach(function(n){var f=window[n];if(typeof f!=='function')return;
 window[n]=function(){var r=f.apply(this,arguments);soon();return r}});
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x&&x.closest&&x.closest('.lamp76-hero,.lamp73-shell,dialog.lamp73-dialog')){soon();return}}}).observe(document.body,{childList:true,subtree:true})}catch(e){}
window.addEventListener('resize',soon);
soon();
})();
/* v178b: friends (not the Lamp) had no centre for the v172 spiral group, so the rings
   circled the layer's top-left corner. Centre them in the 100 viewBox; the Lamp keeps its own rule. */
(function(){if(typeof document==='undefined'||document.getElementById('v178ctr'))return;
 var s=document.createElement('style');s.id='v178ctr';s.textContent='svg.fx2-spiral .fx2-ctr{transform:translate(50px,50px)}';
 (document.head||document.documentElement).appendChild(s);})();
