/* v172.js — Lamp effects v2 (Classic + five effects, Wise Lamp Norma stars) plus the Lamp-only dark-rim removal. */
/* lamp_effects_v2.js — the five Lamp effects (and the Wise Lamp star) re-fitted to the
 * round3 paper lantern (v165/v167 art). Load AFTER v123.js and v167.js. Same hooks:
 * lampFxSpiralSVG89, lampFxEmberSVG89, lampFxLayerHTML89, lampFxSmokeStart89,
 * lampFxPrev89, lampFxInsert89, lampSvg73. CSS goes in <style id="lampfx2">.
 * Everything is scoped to a shell that holds the Lamp ([data-il-kind="lamp"]);
 * other companions keep the v123 look. Geometry: the lantern art is a 200 box at
 * scale(.5), so 1 shell % = 2 art units. Stage scale about (100,184): hatchling .8,
 * young .89, grown/wise 1. Window (lower glass) 80..120 x 124..168, heart (100,146). */
(function(){
'use strict';
var L='.lamp73-shell:has([data-il-kind="lamp"]):not(#fx2)';
var S=function(st){return '.lamp73-shell:has([data-il-kind="lamp"][data-il-stage="'+st+'"]):not(#fx2)'};
/* Lantern silhouette in shell units (grown). Used as a hole in the mask so spiral seeds and
   smoke sit "behind" the Lamp on its night panel, with a 2-unit dark gap round the ink. */
var SIL='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><g stroke="#000" stroke-linejoin="round" stroke-linecap="round"><path d="M44 24c0-9 12-9 12 0" fill="none" stroke-width="5"/><path d="M34 34 41 24h18l7 10zM38 34h24l5 8v41l-5 5H38l-5-5V42zM38 88h24l5 6H33z" stroke-width="2.4"/><path d="M33 61c-8 2-13 7-10 12M67 61c8 2 13 7 10 12" fill="none" stroke-width="6.2"/><ellipse cx="43" cy="95" rx="4.5" ry="2.5" stroke-width="2.4"/><ellipse cx="57" cy="95" rx="4.5" ry="2.5" stroke-width="2.4"/></g></svg>';
var SILURL='url("data:image/svg+xml,'+encodeURIComponent(SIL)+'")';
var MASK='-webkit-mask-image:'+SILURL+',linear-gradient(#000,#000);-webkit-mask-composite:xor;'+
 'mask-image:'+SILURL+',linear-gradient(#000,#000);mask-composite:exclude;'+
 '-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;'+
 '-webkit-mask-size:calc(100% * var(--lx-s)) calc(100% * var(--lx-s)),100% 100%;mask-size:calc(100% * var(--lx-s)) calc(100% * var(--lx-s)),100% 100%;'+
 '-webkit-mask-position:50% 92%,0 0;mask-position:50% 92%,0 0;';
var HOLE=function(w,h){var g='linear-gradient(#000,#000)';return '-webkit-mask-image:'+g+','+g+';-webkit-mask-composite:xor;mask-image:'+g+','+g+';mask-composite:exclude;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%,'+w+' '+h+';mask-size:100% 100%,'+w+' '+h+';-webkit-mask-position:0 0,50% 50%;mask-position:0 0,50% 50%'};
var FACEHOLE=(function(){var g='linear-gradient(#000,#000)',sz='100% 100%,calc(20% * var(--lx-s)) calc(28% * var(--lx-s))',ps='0 0,50% var(--lx-fp)';
 return '-webkit-mask-image:'+g+','+g+';-webkit-mask-composite:xor;mask-image:'+g+','+g+';mask-composite:exclude;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:'+sz+';mask-size:'+sz+';-webkit-mask-position:'+ps+';mask-position:'+ps})();
var tip='var(--f81-tip,#FFF6D8)',core='var(--f81-core,#FFE4A4)',mid='var(--f81-mid,#E6B454)',halo='var(--f81-halo,#dbb06b)';
var mix=function(c,p){return 'color-mix(in oklab,'+c+' '+p+'%,transparent)'};
var CSS=[
/* stage geometry: --lx-s scale, --lx-wy window centre, --lx-cyn lantern centre (unitless) */
L+'{--lx-s:1;--lx-wy:73%;--lx-cyn:58;--lx-fp:47.2%}',
S('young')+'{--lx-s:.89;--lx-wy:75.1%;--lx-cyn:61.7;--lx-fp:53.8%}',
S('hatchling')+'{--lx-s:.8;--lx-wy:76.8%;--lx-cyn:64.8;--lx-fp:58.8%}',
/* layers sit inside the shell, over the art (the art has its own night panel) */
L+'>.fx89-layer.fx89-core,'+L+'>.fx89-layer.fx89-core-flame,'+L+'>.fx89-layer.fx89-smoke,'+L+'>.fx89-layer.fx89-spiral{inset:0!important;left:0!important;top:0!important;width:100%!important;height:100%!important;transform:none!important;z-index:3!important;overflow:hidden}',
L+'>.fx89-layer.fx89-core,'+L+'>.fx89-layer.fx89-smoke{mix-blend-mode:screen}',
/* blend on the layer itself: a z-indexed layer is its own group, so a blend on its children would only see the layer */
L+'>.fx89-layer.fx89-jelly{z-index:auto!important;mix-blend-mode:normal}',
/* the jelly layer is not a stacking context, so each part blends with the lantern art below it */
L+' .fx89-jelly-clip{position:absolute;z-index:3;mix-blend-mode:multiply}',
L+' .fx2-jedge{position:absolute;z-index:3;top:calc(92% - 50% * var(--lx-s));height:calc(41% * var(--lx-s));width:calc(5.4% * var(--lx-s));border-radius:2px;mix-blend-mode:normal;opacity:.62;filter:blur(.6px);background:repeating-linear-gradient(0deg,#f797b3 0 4px,#f4c276 4px 8px,#9fdc91 8px 12px,#86c6f5 12px 16px,#c5a3f7 16px 20px);background-size:100% 20px;animation:fx2-jrise 12s linear infinite}',
L+' .fx2-jl{left:calc(50% - 15.8% * var(--lx-s))}'+L+' .fx2-jr{left:calc(50% + 10.4% * var(--lx-s));animation-delay:-6s}',
'@keyframes fx2-jrise{from{background-position:0 0}to{background-position:0 -20px}}',
/* Bright core: light from the window, not a flame over the face */
L+' .fx89-shell,'+L+' .fx89-mid,'+L+' .fx89-hot,'+L+' .fx111-core-soft,'+L+' .fx89-flame{position:absolute;left:50%;top:var(--lx-wy);border-radius:50%}',
L+' .fx89-shell{width:calc(42% * var(--lx-s));height:calc(46% * var(--lx-s));filter:blur(5px);background:radial-gradient(closest-side,'+mix(tip,75)+','+mix(core,45)+' 55%,transparent)}',
L+' .fx89-mid{width:calc(19% * var(--lx-s));height:calc(21% * var(--lx-s));border-radius:8%;filter:blur(2px);background:radial-gradient(closest-side,'+mix(tip,16)+','+mix(tip,10)+' 70%,transparent)}',
L+' .fx89-hot{width:calc(6% * var(--lx-s));height:calc(6.6% * var(--lx-s));filter:blur(1px);background:radial-gradient(closest-side,'+mix(tip,34)+','+mix(tip,10)+' 50%,transparent)}',
L+' .fx111-core-soft{top:50%;width:100%;height:100%;border-radius:0;filter:none;background:radial-gradient(ellipse 72% 72% at 50% calc(var(--lx-cyn) * 1%),'+mix(core,80)+','+mix(mid,55)+' 38%,'+mix(halo,22)+' 72%,transparent 100%);animation:fx2-halo 18s ease-in-out infinite;'+FACEHOLE+'}',
'@keyframes fx2-halo{0%,100%{transform:translate(-50%,-50%);opacity:.86}50%{transform:translate(-50%,-50%);opacity:1}}',
L+' .fx89-flame{width:calc(26% * var(--lx-s));height:calc(28% * var(--lx-s));filter:blur(3px);background:radial-gradient(closest-side,transparent 55%,'+mix(tip,16)+' 75%,transparent)}',
/* the wide glows light the paper round the window, not the ring glass, so the ring ink keeps its contrast */
L+' .fx89-shell{'+HOLE('46%','46%')+'}',
/* Bright core window: a brighter glass with the belly rings redrawn in their ink, on top */
L+' .fx2-cwin{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
L+' .fx2-cwin .fx2-cst{transform-origin:100px 184px;transform:scale(var(--lx-s))}',
'.fx2-cwr{fill:none;stroke:#8A5E1C}',
S('hatchling')+' .fx2-cwin :is(.fx2-r5,.fx2-r7,.fx2-r13),'+S('young')+' .fx2-cwin :is(.fx2-r3,.fx2-r7,.fx2-r13),'+S('grown')+' .fx2-cwin :is(.fx2-r3,.fx2-r5,.fx2-r13),'+S('wise')+' .fx2-cwin :is(.fx2-r3,.fx2-r5,.fx2-r7){display:none}',
'.lamp73-shell:has(svg.il-xs) .fx2-cwr{display:none}',
/* Sleeping spiral: ring seeds round the Lamp, hidden behind it */
L+'>.fx89-layer.fx89-spiral,'+L+'>.fx89-layer.fx89-smoke{'+MASK+'}',
L+' .fx89-spiral{transform:none!important;animation:none!important;transition:none!important;overflow:hidden;filter:none}'+L+' svg.fx89-spiral{filter:drop-shadow(0 0 .8px '+halo+')}',
L+' .fx2-ctr{transform:translate(50px,calc(var(--lx-cyn) * 1px))}',
L+' .fx2-spin{transition:transform 8.5s cubic-bezier(.22,.61,.36,1)}',
L+' .fx89-spiral.asleep .fx2-spin{transform:scale(.28) rotate(-40deg)}',
L+' .fx89-spiral.awake:not(.still) .fx2-spin{animation:fx2-spin 140s linear 8.5s infinite}',
'@keyframes fx2-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}',
'.fx2-spiral circle.fx2-b,.fx89-prev-svg circle.fx2-b{fill:none;stroke:'+tip+';stroke-width:1.2;stroke-opacity:.9}.fx2-spiral circle.fx2-f{fill:'+mid+';stroke:none}',
S('hatchling')+' .fx2-g5,'+S('hatchling')+' .fx2-g7,'+S('hatchling')+' .fx2-g13,'+S('young')+' .fx2-g7,'+S('young')+' .fx2-g13,'+S('grown')+' .fx2-g13{display:none}',
/* Ember pulses: motes leave the cap vents */
L+' .fx2-st{transform-origin:50px 92px;transform:scale(var(--lx-s))}',
L+' .fx89-ember .fx89-etrack{stroke:'+core+';stroke-width:.5;opacity:.08}',
'.fx2-er{fill:none;stroke:'+core+';stroke-width:.7}.fx2-em .fx89-ed{fill:'+tip+';stroke:none}',
/* Comb jelly: rows of light inside the window glass */
L+' .fx89-jelly-clip{left:calc(50% - 9.6% * var(--lx-s));top:calc(var(--lx-wy) - 10.6% * var(--lx-s));width:calc(19.2% * var(--lx-s));height:calc(21.2% * var(--lx-s));border-radius:1px}',
L+' .fx89-jelly-a,'+L+' .fx89-jelly-b{background:repeating-linear-gradient(180deg,#ff9a3c 0 3px,#ff5f8f 3px 6px,#3fcf8e 6px 9px,#4f9dff 9px 12px,#b07cff 12px 15px);background-size:100% 15px;filter:blur(.6px);mix-blend-mode:normal;opacity:.7}',
L+' .fx89-jelly-b{filter:blur(1.6px) hue-rotate(24deg);opacity:.3}',
'.lamp73-shell:has(svg.il-sm) .fx89-jelly-a{background-size:100% 15px}',
/* Glowing smoke: a soft cloud from the window, the Lamp hides behind it */
L+' .fx89-smoke-cv{-webkit-mask-image:none;mask-image:none;filter:blur(1.2px)}',
L+' .fx111-smoke-haze{inset:6%;filter:blur(10px);opacity:.22;background:radial-gradient(circle at 50% var(--lx-wy),'+mix(halo,40)+',transparent 72%)}',
L+' .fx89-smoke-static{inset:0;-webkit-mask-image:none;mask-image:none}',
L+' .fx89-smoke-static span{filter:blur(2.5px);opacity:.75;border-radius:50%;background:radial-gradient(closest-side,'+mix(tip,70)+','+mix(core,35)+' 60%,transparent)}',
L+' .fx89-smoke-static span:nth-child(1){left:24%;top:2%;width:9%;height:30%;transform:rotate(-22deg)}',
L+' .fx89-smoke-static span:nth-child(2){left:67%;top:2%;width:9%;height:30%;transform:rotate(22deg)}',
L+' .fx89-smoke-static span:nth-child(3){left:10%;top:30%;width:8%;height:28%;transform:rotate(-34deg)}',
L+' .fx89-smoke-static span:nth-child(4){left:82%;top:30%;width:8%;height:28%;transform:rotate(34deg)}',
/* previews */
'.fx89-pv-core .fx89-pv-m{transform-box:fill-box;transform-origin:center}.fx89-prev-svg .fx89-pv-glow,.fx89-pv-core .fx89-pv-s{opacity:.3}.fx2-pv-ink{stroke:#72583F;stroke-width:1.3;stroke-linejoin:round}.fx2-pv-r{fill:none;stroke:#8A5E1C;stroke-width:1}',
/* 44 px: bold marks only */
'svg.il-sm~.fx89-layer .fx-fine,.lamp73-shell:has(svg.il-sm) .fx-fine{display:none}',
/* reduced motion and in-app reduce */
'@media (prefers-reduced-motion:reduce){'+L+' .fx2-spin{animation:none!important;transition:none!important;transform:none!important}}',
'.reduce73 .fx2-spin,.fx89-layer.still .fx2-spin{animation:none!important;transition:none!important;transform:none!important}',
'@media (prefers-reduced-motion:reduce){.fx2-jedge{animation:none!important}}.reduce73 .fx2-jedge,.fx89-layer.still .fx2-jedge{animation:none!important}',
/* v172: turn off the v123 smoke drop-shadow for the Lamp only, so the 44 px smoke tile has no dark rim. Other friends keep v123. */
L+':has(.fx89-smoke) .lamp73-svg{filter:none}',
'.today64:has([data-il-kind="lamp"]):has(.fx89-smoke) .lamp73-svg{filter:none}'
].join('\n');
function css(){
 if(typeof document==='undefined'||document.getElementById('lampfx2'))return;
 var s=document.createElement('style');s.id='lampfx2';s.textContent=CSS;
 (document.head||document.documentElement).appendChild(s);
}
var n2=0;
var f=function(x){return (+x).toFixed(1).replace(/\.0$/,'')};

/* Sleeping spiral: sunflower seeds round the lantern centre. Bold seeds are belly rings
   (same size, outline only); 3/5/7/13 of them show by stage. Fine seeds are fx-fine. */
function spiral(asleep,still){
 var GA=Math.PI*(3-Math.sqrt(5)),d=[],i,r,a,t;
 for(i=40;i<125;i+=2){r=4.2*Math.sqrt(i);if(r>47)break;if(r<37&&i%3===1)continue;a=i*GA;t=(r-26)/21;
  d.push('<circle class="fx2-f fx-fine" cx="'+f(r*Math.cos(a))+'" cy="'+f(r*Math.sin(a))+'" r="'+f(.6+.5*t)+'" opacity="'+(.22+.28*t).toFixed(2)+'"/>');}
 for(i=0;i<13;i++){a=i*GA-Math.PI/2;r=37+(i%3)*3.5;
  d.push('<circle class="fx2-b fx2-g'+(i<3?3:i<5?5:i<7?7:13)+'" cx="'+f(r*Math.cos(a))+'" cy="'+f(r*Math.sin(a))+'" r="2.6"/>');}
 var st=(still?' still':'')+(asleep&&!still?' asleep':' awake');
 return '<svg class="fx89-spiral fx111-spiral fx2-spiral'+st+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><g class="fx2-ctr"><g class="fx2-spin">'+d.join('')+'</g></g></svg>';
}
/* Ember pulses: ring motes rise from the two cap vents, 15-20 s each, fade in and out. */
function ember(still){
 var id='fx2eb'+(++n2),P=['M36 34C33 26 33 18 28 6','M64 34C67 26 67 18 72 6'],m='';
 [[0,15,0],[1,17.5,5],[0,20,11],[1,15,8],[0,17.5,3],[1,20,14]].forEach(function(v,i){
  var p=P[v[0]],inner='<circle class="fx2-er" r="'+f(2.4-i*.1)+'"/><circle class="fx89-ed" r="1.1"/>';
  if(still){var xy=[[34,28],[66,22],[31,16],[69,12],[30,10],[70,30]][i];
   m+='<g class="fx2-em" transform="translate('+xy[0]+' '+xy[1]+')" opacity="'+(.85-i*.08).toFixed(2)+'">'+inner+'</g>';}
  else m+='<g class="fx2-em" opacity="0">'+inner+'<animateMotion dur="'+v[1]+'s" begin="-'+v[2]+'s" repeatCount="indefinite" path="'+p+'"/><animate attributeName="opacity" values="0;.8;.7;0" keyTimes="0;.2;.7;1" dur="'+v[1]+'s" begin="-'+v[2]+'s" repeatCount="indefinite"/></g>';
 });
 return '<svg class="fx89-ember fx111-ember fx2-ember'+(still?' still':'')+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><defs><filter id="'+id+'" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation=".55" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g class="fx2-st"><path class="fx89-etrack" d="'+P[0]+'" fill="none"/><path class="fx89-etrack" d="'+P[1]+'" fill="none"/><g filter="url(#'+id+')">'+m+'</g></g></svg>';
}
/* Bright core window, in the art's 200 box: glass, the stage's belly rings, the heart. */
function coreWin(){
 var id='fx2cw'+(++n2),R=function(c,cls,w){return '<g class="fx2-cwr '+cls+'" stroke-width="'+w+'">'+c.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+'"/>'}).join('')+'</g>'};
 var hx=function(r){var o=[[100,146]];for(var k=0;k<6;k++){var a=k*Math.PI/3;o.push([f(100+r*Math.cos(a)),f(146+r*Math.sin(a))])}return o.map(function(p){return [p[0],p[1],r]})};
 var r3=[[100,146,8.5],[108.5,146,8.5],[91.5,146,8.5]],r5=r3.concat([[95.75,138.64,8.5],[104.25,138.64,8.5]]);
 var r13b=[];for(var k=0;k<6;k++){var a=k*Math.PI/3+Math.PI/6;r13b.push([f(100+12.12*Math.cos(a)),f(146+12.12*Math.sin(a)),7])}
 return '<svg class="fx2-cwin" viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="'+id+'" cx=".5" cy=".5" r=".62"><stop offset="0" style="stop-color:#FFFFFF"/><stop offset=".7" style="stop-color:#FFFCEC"/><stop offset="1" style="stop-color:'+core+'"/></radialGradient></defs><g class="fx2-cst"><rect x="81" y="125" width="38" height="42" fill="url(#'+id+')"/>'+
  R(r3,'fx2-r3',1.6)+R(r5,'fx2-r5',1.6)+R(hx(8),'fx2-r7',1.6)+R(hx(7),'fx2-r13',1.35)+R(r13b,'fx2-r13',1.15)+
  '<circle cx="100" cy="146" r="5" fill="'+core+'" stroke="#E6B454" stroke-width="1.3"/></g></svg>';
}
/* Picker previews: the lantern on its night disc, with the effect; 64 box, v89 classes.
   No <path> in the lantern itself: v89 dashes/animates every path in the ember and smoke previews. */
var DISC='<circle cx="32" cy="32" r="30" fill="#120E18"/>';
var LANT='<polyline class="fx2-pv-ink" points="29,14 29,11 30.5,9.5 33.5,9.5 35,11 35,14" fill="none"/><polygon class="fx2-pv-ink" points="26,14 38,14 43,21 21,21" fill="#A8843E"/><polygon class="fx2-pv-ink" points="24,21 40,21 43,25 43,47 40,50 24,50 21,47 21,25" fill="#E6B454"/><rect class="fx2-pv-ink" x="27" y="34" width="10" height="12" fill="#FFE4A4"/><circle class="fx2-pv-r" cx="32" cy="40" r="3"/><circle cx="28.5" cy="27" r="1.1" fill="#72583F"/><circle cx="35.5" cy="27" r="1.1" fill="#72583F"/>';
function prev(id){
 var o='<svg class="fx89-prev-svg fx89-pv-'+id+'" viewBox="0 0 64 64" aria-hidden="true">'+DISC,c='</svg>',GA=Math.PI*(3-Math.sqrt(5)),s='',i,r,a;
 var mote=function(p,k){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(3-k*.3)+'" fill="none" stroke="'+core+'" stroke-width="1.2"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="1.3" fill="'+tip+'"/>'};
 var RB=['#f797b3','#f4c276','#9fdc91','#86c6f5','#c5a3f7'];
 if(id==='classic')return o+'<ellipse class="fx89-pv-glow" cx="32" cy="36" rx="19" ry="19" opacity=".35"/>'+LANT+c;
 if(id==='spiral'){for(i=0;i<13;i++){a=i*GA;r=20+(i%3)*2.6;s+='<circle class="fx2-b" cx="'+f(32+r*Math.cos(a))+'" cy="'+f(33+r*Math.sin(a))+'" r="2.2"/>'}
  return '<svg class="fx89-prev-svg" viewBox="0 0 64 64" aria-hidden="true">'+DISC+'<g class="fx89-pv-spiral" style="transform-origin:32px 33px">'+s+'</g>'+LANT+c;}
 if(id==='core')return o+[29,25,21,16].map(function(r,k){return '<circle'+(k?'':' class="fx89-pv-s"')+' cx="32" cy="33" r="'+r+'" fill="'+[mid,mid,core,tip][k]+'" style="opacity:'+[.4,.45,.6,.75][k]+'"/>'}).join('')+LANT+'<rect class="fx89-pv-m" x="26" y="33" width="12" height="14" rx="2" fill="'+tip+'" opacity=".55"/><circle class="fx2-pv-r" cx="32" cy="40" r="3"/>'+c;
 if(id==='ember')return o+LANT+'<path d="M22 20C21 16 20 12 19 7M42 20C43 16 44 12 45 7" fill="none" stroke="'+core+'" stroke-width="1" opacity=".45" stroke-linecap="round"/>'+[[19.5,16],[44.5,13],[22,9],[41,8]].map(mote).join('')+c;
 if(id==='jelly'){for(i=0;i<8;i++){s+='<rect x="15.5" y="'+(22+i*3.5)+'" width="3.2" height="3.5" fill="'+RB[i%5]+'"/><rect x="45.3" y="'+(22+i*3.5)+'" width="3.2" height="3.5" fill="'+RB[(i+2)%5]+'"/>'}
  return o+LANT+'<g class="fx89-pv-rows">'+s+['#ff5f8f','#3fcf8e','#4f9dff','#ff9a3c'].map(function(h,k){return '<rect x="27.5" y="'+(34.6+k*2.8)+'" width="9" height="1.6" fill="'+h+'" opacity=".85"/>'}).join('')+'</g>'+c;}
 if(id==='smoke')return o+LANT+'<g fill="none" stroke-linecap="round">'+['M27 14C24 12 26 10 22 9','M37 14C40 12 38 10 42 9','M20 28C16 25 17 20 11 18','M44 28C48 25 47 20 53 18'].map(function(d){return '<path d="'+d+'" stroke="'+tip+'" stroke-width="4.6" opacity=".4"/><path d="'+d+'" stroke="'+tip+'" stroke-width="1.8"/>'}).join('')+'</g>'+c;
 return '';
}
/* Smoke: the v92 canvas hook, drawing soft wisps that rise past the cap and drift out at
   the sides (11-15 s each). Same FX89_SMOKE / low-power / reduced-motion paths. */
function smokeStart(prevStart){
 return function(layer,canvas){
  /* v89 starts the canvas before v123 moves the layer into the shell: move a Lamp's layer first */
  var sh=lampShell(layer);
  if(sh&&sh.querySelector('[data-il-kind="lamp"]')&&layer.parentElement!==sh)sh.appendChild(layer);
  var wy=parseFloat(getComputedStyle(layer).getPropertyValue('--lx-wy'));
  if(!wy||!canvas)return prevStart.apply(this,arguments);
  lampFxSmokeStop89(layer);
  FX89_SMOKE.forEach(function(rec,k){if(k!==layer){if(rec.raf)cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(k)}});
  if(lampFxReduced89()||lampFxLow89()){canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);return}
  var ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  var W=canvas.width,H=canvas.height,sc=parseFloat(getComputedStyle(layer).getPropertyValue('--lx-s'))||1,ws=[];
  /* six wisps: four leave the cap and curl out, two leave the shoulders and drift to the sides */
  var EM=[[-.12*sc,92-62*sc,-1,.24],[.12*sc,92-62*sc,1,.24],[-.06*sc,92-68*sc,-1,.22],[.06*sc,92-68*sc,1,.22],[-.18*sc,92-42*sc,-1,.3],[.18*sc,92-42*sc,1,.3]];
  var mk=function(i,fresh){var e=EM[i];return {i:i,x0:W*(.5+e[0]),y0:H*e[1]/100,dir:e[2],L:H*e[3],life:11+Math.random()*4,age:fresh?0:Math.random()*10,ph:Math.random()*6}};
  for(var i=0;i<EM.length;i++)ws.push(mk(i,false));
  var rec={raf:0,last:0,frames:[],dead:false};FX89_SMOKE.set(layer,rec);
  var hex=function(c){c=String(c||'').trim();return c[0]==='#'&&c.length===7?[1,3,5].map(function(i){return parseInt(c.slice(i,i+2),16)}):[239,186,100]};
  var loop=function(t){
   if(!canvas.isConnected){cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);return}
   rec.raf=requestAnimationFrame(loop);
   if(document.hidden||canvas.offsetParent===null)return;
   if(rec.last&&t-rec.last<33)return;
   var dt=rec.last?Math.min(50,t-rec.last):33;
   if(rec.last){rec.frames.push(t-rec.last);if(rec.frames.length>48)rec.frames.shift();
    if(rec.frames.length>=30){var md=rec.frames.slice().sort(function(a,b){return a-b})[Math.floor(rec.frames.length/2)];
     if(md>52){rec.dead=true;FX89_LOW=true;cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);
      canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);return}}}
   rec.last=t;
   var s=getComputedStyle(layer),tip=hex(s.getPropertyValue('--f81-tip')||'#FFF6D8'),cor=hex(s.getPropertyValue('--f81-core')||'#FFE4A4');
   ctx.clearRect(0,0,W,H);
   for(var i=0;i<ws.length;i++){
    var w=ws[i];w.age+=dt/1000;var k=w.age/w.life;
    if(k>=1){ws[i]=mk(w.i,true);continue}
    var fade=Math.sin(Math.PI*Math.min(1,k*1.15)),head=w.L*(.4+.6*k),len=w.L*.8,n=22;
    for(var j=0;j<=n;j++){
     var u=j/n,d=Math.max(0,head-len*(1-u));if(d<=0)continue;
     var q=d/w.L,x=w.x0+w.dir*W*.2*Math.pow(q,1.5)+Math.sin(d*.04+w.ph+w.age*.35)*W*.015,y=w.y0-d;
     var r=W*(.028+.04*q),al=.42*fade*Math.sin(Math.PI*u)*(1-.45*q);if(al<.004)continue;
     var c=j%2?tip:cor,g=ctx.createRadialGradient(x,y,0,x,y,r);
     g.addColorStop(0,'rgba('+c+','+al+')');g.addColorStop(1,'rgba('+c+',0)');
     ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
    }
   }
  };
  rec.raf=requestAnimationFrame(loop);
 };
}
/* Wise Lamp star: Norma, the Carpenter's Square, in the night panel's upper right
   (the old v123 hook path is not in the round3 art, so the stars had gone). */
var NORMA='<g class="fx2-norma" aria-hidden="true"><path class="il-fine" d="M176 32 173 50 154 50 150 22Z" fill="none" stroke="#FFF6D8" stroke-width="1" stroke-linejoin="round" opacity=".35"/><path class="il-n" d="M173 50h0M154 50h0M176 32h0" stroke-width="7" opacity=".8"/></g>';
function wise(html){
 html=String(html||'');
 if(html.indexOf('fx2-norma')>=0||!/class="il119 il165" data-il-kind="lamp" data-il-stage="wise"/.test(html))return html;
 return html.replace(/(class="il119 il165" data-il-kind="lamp" data-il-stage="wise"[\s\S]*?fill="#120E18"\/>)/,'$1'+NORMA);
}
function lampShell(layer){
 return layer.closest('.lamp73-shell')||(typeof shellForLayer123==='function'&&shellForLayer123(layer))||(layer.parentElement&&layer.parentElement.querySelector('.lamp73-shell'));
}
function install(){
 css();
 if(typeof lampFxSpiralSVG89==='function'&&!lampFxSpiralSVG89._lfx2){lampFxSpiralSVG89=spiral;spiral._lfx2=1}
 if(typeof lampFxEmberSVG89==='function'&&!lampFxEmberSVG89._lfx2){lampFxEmberSVG89=ember;ember._lfx2=1}
 if(typeof lampFxPrev89==='function'&&!lampFxPrev89._lfx2){var pp=lampFxPrev89;lampFxPrev89=function(id){return prev(id)||pp(id)};lampFxPrev89._lfx2=1}
 if(typeof lampFxLayerHTML89==='function'&&!lampFxLayerHTML89._lfx2){var pl=lampFxLayerHTML89;
  lampFxLayerHTML89=function(id){var h=pl.apply(this,arguments);return id==='jelly'?h+'<div class="fx2-jedge fx2-jl"></div><div class="fx2-jedge fx2-jr"></div>':h};lampFxLayerHTML89._lfx2=1}
 if(typeof lampFxSmokeStart89==='function'&&!lampFxSmokeStart89._lfx2){lampFxSmokeStart89=smokeStart(lampFxSmokeStart89);lampFxSmokeStart89._lfx2=1}
 if(typeof lampFxInsert89==='function'&&!lampFxInsert89._lfx2){
  var pi=lampFxInsert89;
  lampFxInsert89=function(host,mode){
   var r=pi.apply(this,arguments);
   try{(host&&host.querySelectorAll?host:document).querySelectorAll('.fx89-layer.fx89-core-flame').forEach(function(l){
    var sh=lampShell(l);if(sh&&sh.querySelector('[data-il-kind="lamp"]')&&!l.querySelector('.fx2-cwin'))l.insertAdjacentHTML('beforeend',coreWin())})}catch(e){}
   try{(host&&host.querySelectorAll?host:document).querySelectorAll('.fx89-layer.fx89-spiral').forEach(function(l){
    var sh=lampShell(l);if(sh&&sh.querySelector('[data-il-kind="lamp"]')&&l.parentElement!==sh)sh.appendChild(l)})}catch(e){}
   return r;
  };
  lampFxInsert89._lfx2=1;
 }
 if(typeof lampSvg73==='function'&&!lampSvg73._lfx2){
  var ps=lampSvg73,b=ps._base;
  lampSvg73=function(){return wise(ps.apply(this,arguments))};
  lampSvg73._lfx2=1;lampSvg73._v165=1;lampSvg73._base=b||ps;
 }
 if(typeof window!=='undefined')window.LampFx2={coreWin:coreWin,spiral:spiral,ember:ember,prev:prev,wise:wise,norma:NORMA,css:CSS};
}
install();
})();
