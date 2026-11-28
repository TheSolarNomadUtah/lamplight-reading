// SPDX-License-Identifier: GPL-3.0-or-later
/* v137: Companion art round 2 + wise v5. New engine (eye growth, wise A+halo,
 * calm blink), Shell and Dragon in the new art, Puff/Dew/Ember as one Sprites
 * slot (mode visit), Dove removed with a safe fallback, lamp eye-rims, and
 * AD's minus-sign formatter (already in the engine). Does not wrap show().
 * The rest of the companions keep their current faces. */
(function(){
'use strict';
if(typeof IL!=='object'||typeof IL.g!=='function'||typeof IL.sh!=='function'||typeof IL.ha!=='function'){
 console.warn('v137: engine.min.js (IL) is missing');
 return;
}

const D137={"accent":"#C47A5A","glass":["#2E8A82","#0A2C32"],"sig":"snout+s-neck+back-plates+one-curve-tail","pattern":"heighway+hex","curve":[3,3,3,3],"hex":["1","1+3","1+6","1+6+12"],"faceStyle":"growth-v3","lid":"#2E7A74","paths":{"head":"M16 18C24 8 26-4 20-10C14-20 4-26-6-24C-14-22-20-16-26-10C-34-4-42 0-50 6C-56 10-56 18-48 20C-38 24-24 26-10 24C2 24 10 24 16 18Z","neck":"M-10 2C-14-10-8-22-4-32L4-34L10-34C20-24 26-10 22 4C16 10 2 10-10 2Z","wing":"M0 0C8-32 22-70 38-92C46-102 60-96 56-82C52-72 44-68 40-72C48-62 62-56 60-44C58-34 46-30 40-36C48-22 56-10 46-2C38 6 22 8 10 2C4 2 0 2 0 0Z","horn":"M-4 2C-6-2-4-11 3-17C7-21 13-18 12-12C11-6 8 0 3 3C0 5-2 5-4 2Z","plate":"M-7 1C-8-4-4-10 0-13C4-10 8-4 7 1C3 4-3 4-7 1Z","bodySit":"M70 176C56 166 52 148 58 128C64 114 76 108 94 108C112 108 128 114 136 128C148 146 150 164 142 176C132 186 110 188 94 186C80 186 78 182 70 176Z","bodyBaby":"M74 170C62 162 58 146 66 132C72 122 84 118 98 118C114 118 128 126 132 140C136 154 130 168 118 174C104 180 86 178 74 170Z"},"struts":"M0 0L40-88M0 0L52-48M0 0L38-6","face":{"eyes":[[-37,0.2,7.2],[-12,-1.4,6.5]],"mouth":[-40,13,11],"nostrils":[[-48,8,1.8],[-43,14,1.5]],"horns":[[-5,-22,1.06,38],[10,-24,0.98,50]]},"order":["body","neck","head","nostrils","eyes","mouth","horns","plates","wings","tail","haunches","paws","belly","core_r","halo","body_s"],"stages":{"hatchling":["baby",[98,126,0.72,0],[90,90,0.94,0],[[-46,8,1.6],[-41,14,1.35]],[[-34,0.4,6.4],[-13,-0.8,5.8]],[-38,13,9],[[-5,-21,0.9,34],[9,-22,0.84,46]],[3,108,118,128,148,0.78,0.72,18,6,8],[[88,128,0.58,-6],[118,128,0.58,8]],[116,158,136,150,148,168,15,12],[[80,158,16,13],[122,158,18,14]],[[88,172,10,5],[114,172,10,5]],[102,146,18,16],[6,4.6],[100,132,78,64,46,0.22],null],"young":["sit",[96,118,0.88,0],[84,68,1.06,0],[[-48,8,1.7],[-43,14,1.45]],[[-36,0.2,7],[-12,-1.2,6.3]],[-40,13,10],[[-5,-22,1,36],[10,-23,0.92,48]],[3,110,112,136,150,0.9,0.82,16,6,10],[[86,122,0.86,-5],[124,122,0.86,7]],[124,160,152,148,166,172,17,12],[[76,160,20,16],[128,160,22,17]],[[86,176,11,5.2],[116,176,11,5.2]],[102,144,20,19],[6.4,4.8],[102,128,90,72,50,0.26],0.9],"grown":["sit",[96,114,1,0],[82,58,1.15,0],null,null,null,null,[3,114,114,138,154,1,0.86,14,4,10],[[86,122,0.96,-5],[124,122,0.96,7]],[128,158,158,146,174,176,18,13],[[74,162,22,17],[132,162,24,18]],[[86,178,12,5.4],[118,178,12,5.4]],[102,146,22,22],[7,5.2],[102,128,100,78,52,0.3],null],"wise":{"tail":[128,158,160,142,178,174,18,13],"halo":[102,128,104,80,54,0.32],"lantern":[22,168],"stars":true}}};
const S137={"slot":"sprites","label":{"en":"Sprites","es":"Duendecillos"},"chosen":"puff","mode":"visit","visits":{"young":"gem-thread","grown":"night-light","wise":"star-triangle"},"stage":{"hatchling":[134,21,25,-3,12,5.0,4.6,172,40],"young":[136,25,30,-4,15,5.8,5.0,178,48],"grown":[140,29,35,-6,17,6.6,5.3,186,56],"wise":[142,31,36,-6,18,6.8,5.3,188,60]},"keys":["cy","rx","ry","faceDy","gemDy","gemR","eyeR","groundCy","groundRx"],"face":"growth-v3","eyeRim":1.18,"sep":2.55,"lantern":[166,6,0.88],"sprites":{"puff":{"en":"Puff","es":"Semillita","tip":"seed","g":["#F4E4C4","#E0C078","#A87838"],"glow":"#E6B454","lid":"#E2C488","motif":"pappus","m":{"young":[7,24,10,0],"grown":[13,42,16,0],"wise":[11,40,18,5]}},"dew":{"en":"Dew","es":"Roc\u00edo","tip":"drop","g":["#C8E8E0","#4A9A8A","#0A2C32"],"glow":"#8AD0C0","lid":"#6FB2A2","motif":"hex-rings","m":{"young":[1.3,1.8],"grown":[1.05,1.5,1.95,2.4],"wise":"pool"}},"ember":{"en":"Ember","es":"Brasa","tip":"coal","g":["#F0C070","#C45A3A","#3A1810"],"glow":"#F0A060","lid":"#D08A58","motif":"log-motes","m":{"young":[8,6,20,0.7],"grown":[16,6,34,1.3],"wise":[14,6,30,1.45]}}}};
const T137={"accent":"#C98990","sig":"leaf","pattern":"hex","face":"growth-v3","lid":"#6E8E6A","mouth":"#2A4A42","stages":{"hatchling":{"sc":[111.8,145.3],"sr":[34.6,23.7],"head":[74.5,147.8,18.3,16.7],"feet":[[87.5,169.6,9.6,4.8],[110.6,172.2,10.2,4.8],[131,167,8.3,4.5]],"tail":"M143.8 153c3.2 1 5.1 3.2 3.2 5.1c-1.3.9-3.5.4-4.8-1.3","leaf":[96,124],"leaf_s":0.72,"leaf_tiny":true,"hex":"1","hex_size":12.5,"rays":false,"core_r":[5,3.6],"halo":[108,150,55,37,41,0.2],"lantern":null,"stars":false,"scallop":false},"young":{"sc":[113,136],"sr":[44,30.2],"head":[62,139,20.6,18.8],"feet":[[81,168,12.2,6.1],[111,171,13,6.1],[138,164,10.5,5.7]],"tail":"M154 146c5.5 1.5 8.5 5.6 5.6 9c-2.1 1.4-5.6.7-7.8-2.1","leaf":[90,110],"leaf_s":0.88,"leaf_tiny":false,"hex":"1+3","hex_size":12,"rays":true,"core_r":[6,4.4],"halo":[108,144,70,48,44,0.24],"lantern":null,"stars":false,"scallop":false},"grown":{"sc":[114,128],"sr":[54,37],"head":[52,132,23,21],"feet":[[76,166,15,7.5],[112,170,16,7.5],[144,162,13,7]],"tail":"M164 140c8 2 12 8 8 13c-3 2-8 1-11-3","leaf":[86,96],"leaf_s":1,"leaf_tiny":false,"hex":"1+6","hex_size":13.5,"rays":true,"core_r":[7.2,5.3],"halo":[108,136,86,58,46,0.3],"lantern":null,"stars":false,"scallop":false},"wise":{"sc":[114,128],"sr":[54,37],"head":[52,132,23,21],"feet":[[76,166,15,7.5],[112,170,16,7.5],[144,162,13,7]],"tail":"M164 140c8 2 12 8 8 13c-3 2-8 1-11-3","leaf":[86,96],"leaf_s":1,"leaf_tiny":false,"hex":"1+6+12","hex_size":9.2,"rays":true,"core_r":[7.2,5.3],"halo":[108,136,90,60,46,0.32],"lantern":[[170,122],null],"stars":true,"scallop":true}}};

const BK137={tw:[22,3],dw:[28,18],spw:[23,3],sdw:[21,16],sew:[23,7]};
const GONE137=new Set(['olivedove_m','olivedove_f','olivesprite_m','olivesprite_f']);
const EXTRA_KEEP137=['suntiger','lioncub','fox','firefly','mosshedgehog','glowcap','deer'];
const PHASE137=['hatchling','young','grown','wise'];
const JADE137=['#2E8A82','#0A2C32'];
const EMBER_MID137='#C47A5A';
const BELLY137='#E0E6D4';
const FOOT137='#A88361';
const INK137='#72583F';
const AMBER137='#E6B454';
const CATCH137='#FFF6D8';
const DRACO137=[[73,142.36],[78.41,144.38],[80.17,140.71],[78.02,136.58],[103.88,142.56],[97.34,142.31],[94.62,137.58],[90.37,130.01],[88.48,117.41],[79.31,117.4],[79.99,111.62],[116.14,133.78],[124.22,121.27],[131,115.66]];
const VISIT_CSS137=".il-vb{transform-box:fill-box;transform-origin:center;animation:ilvb 5s ease-in-out infinite alternate}@keyframes ilvb{from{opacity:.62;transform:scale(1)}to{opacity:.9;transform:scale(1.03)}}.ll-candle .il-vb{animation-duration:var(--ll-breath,10s)}@media(prefers-reduced-motion:reduce){.il-vb{animation:none;opacity:.78}}";

let n137=0;
function uid137(seed){n137+=1;return seed+n137;}
function F137(n,p){
 if(typeof IL.f==='function'&&(p==null||p===1))return IL.f(n);
 p=p==null?1:p;
 if(typeof n==='number'&&n===Math.floor(n)&&isFinite(n))return String(n);
 let s=Number(n).toFixed(p).replace(/\.?0+$/,'');
 if(s==='-0')s='0';
 return s.replace(/^(-?)0\./,'$1.');
}
function phase137(stage){
 if(typeof IL119==='object'&&IL119.phase)return IL119.phase(stage);
 const s=Math.max(1,Math.min(6,Number(stage)||1));
 return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}
function css137(){
 if(typeof document==='undefined')return;
 if(!document.getElementById('il137css')){
  const s=document.createElement('style');s.id='il137css';
  s.textContent=(IL.css||'')+VISIT_CSS137+
   '.friendPick101[data-cols="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}'+
   '@container (min-width:560px){.friendPick101[data-cols="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}}'+
   '@supports not (container-type:inline-size){@media (min-width:720px){.friendPick101[data-cols="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}}}'+
   '.spritePick137{display:flex;flex-wrap:wrap;gap:8px;margin:.6rem 0 0;align-items:stretch}'+
   '.spritePick137 button{min-height:56px;min-width:56px;padding:.45rem .8rem}'+
   '.spriteVisit137{margin:.6rem 0 0}.spriteVisit137 svg{display:block;width:100%;max-width:320px;height:auto}';
  (document.documentElement||document.head).appendChild(s);
 }
 try{if(typeof IL119==='object'&&typeof IL119.css==='function')IL119.css()}catch(e){}
}
function blinkStyle137(seed){
 const p=BK137[seed]||[24,0];
 return `--il-bk:${p[0]}s;--il-bk-d:${p[1]}s`;
}
function applyBlink137(html,seed){
 const st=blinkStyle137(seed);
 return html.replace(/style="--il-bk:[^"]*"/g,'style="'+st+'"');
}
function wrap137(kind,phase,pattern,uid,body,opts){
 opts=opts||{};
 const scale=opts.scale==null?'.5':opts.scale;
 const extra=opts.style?` style="${opts.style}"`:'';
 return `<g class="il119 il137" data-il-kind="${kind}" data-il-stage="${phase}" data-il-look="inner" data-il-pattern="${pattern||''}" transform="scale(${scale})"${extra}>${body}</g>`;
}

function hexCenters137(kind,size){
 function xy(q,r){return [size*(Math.sqrt(3)*q+Math.sqrt(3)/2*r), size*(1.5*r)];}
 function ring(n){
  if(n===0)return [[0,0]];
  const cells=[];let q=n,r=0;
  const dirs=[[0,-1],[-1,0],[-1,1],[0,1],[1,0],[1,-1]];
  for(const [dq,dr] of dirs){for(let i=0;i<n;i++){cells.push([q,r]);q+=dq;r+=dr;}}
  return cells;
 }
 let cells=[[0,0]];
 if(kind==='1+3'||kind==='1+6'||kind==='1+6+12'){
  const r1=ring(1);
  cells=cells.concat(kind==='1+3'?r1.filter((_,i)=>i%2===0):r1);
 }
 if(kind==='1+6+12')cells=cells.concat(ring(2));
 return cells.map(([q,r])=>xy(q,r));
}
function hexD137(cx,cy,r){
 const pts=[];
 for(let i=0;i<6;i++){
  const a=(30+60*i)*Math.PI/180;
  pts.push(F137(cx+r*Math.cos(a))+','+F137(cy+r*Math.sin(a)));
 }
 return 'M'+pts.join('L')+'Z';
}
function heighway137(order,x0,y0,x1,y1,amp,cls,color,sw,op){
 const n=1<<order;const src=[[0,0]];let x=0,y=0,dx=1,dy=0;
 for(let i=1;i<=n;i++){
  x+=dx;y+=dy;src.push([x,y]);
  if((i&((i&-i)<<1))===0){const t=dx;dx=-dy;dy=t;}
  else{const t=dx;dx=dy;dy=-t;}
 }
 const ax=src[0][0],ay=src[0][1],bx=src[src.length-1][0],by=src[src.length-1][1];
 const vx=bx-ax,vy=by-ay,L=Math.hypot(vx,vy)||1;
 const px=-vy/L,py=vx/L;
 let qx=-(y1-y0),qy=(x1-x0);const qL=Math.hypot(qx,qy)||1;qx/=qL;qy/=qL;
 const ext=src.map(p=>(p[0]-ax)*px+(p[1]-ay)*py);
 const span=Math.max(...ext.map(Math.abs),1e-6);
 const sAmp=amp?amp/span:0;
 const pts=src.map((p,i)=>{
  const t=((p[0]-ax)*vx+(p[1]-ay)*vy)/(L*L);
  const e=ext[i];
  return [x0+t*(x1-x0)+sAmp*e*qx,y0+t*(y1-y0)+sAmp*e*qy];
 });
 const d='M'+pts.map(p=>F137(p[0])+' '+F137(p[1])).join('L');
 return `<path class="${cls||'il-fine'}" d="${d}" fill="none" stroke="${color||AMBER137}" stroke-width="${F137(sw)}" stroke-linecap="round" stroke-linejoin="round" opacity="${F137(op,2)}"/>`;
}
function thickCurve137(x0,y0,cx,cy,x1,y1,w0,w1,n){
 w0=Math.max(11,w0);w1=Math.max(9,w1);n=n||18;
 const outer=[],inner=[],tips=[];
 for(let i=0;i<=n;i++){
  const u=i/n,u1=1-u;
  const x=u1*u1*x0+2*u1*u*cx+u*u*x1;
  const y=u1*u1*y0+2*u1*u*cy+u*u*y1;
  const dx=2*u1*(cx-x0)+2*u*(x1-cx);
  const dy=2*u1*(cy-y0)+2*u*(y1-cy);
  const L=Math.hypot(dx,dy)||1;
  const nx=-dy/L,ny=dx/L,w=(w0+(w1-w0)*u)/2;
  outer.push([x+nx*w,y+ny*w]);inner.push([x-nx*w,y-ny*w]);
  if(i===0||i===n){
   const sx=(dx/L)*w,sy=(dy/L)*w;
   tips.push(i===0?[x-sx,y-sy]:[x+sx,y+sy]);
  }
 }
 const P=pt=>F137(pt[0])+' '+F137(pt[1]);
 let d='M'+P(outer[0])+'Q'+P(tips[0])+' '+P(inner[0]);
 for(let i=1;i<inner.length;i++)d+='L'+P(inner[i]);
 d+='Q'+P(tips[1])+' '+P(outer[outer.length-1]);
 for(let i=outer.length-2;i>=0;i--)d+='L'+P(outer[i]);
 return d+'Z';
}
function plates137(spec){
 if(!spec||!spec.length)return [];
 if(typeof spec[0]==='number'){
  const [n,x0,y0,x1,y1,s0,s1,r0,r1,bulge]=spec;
  const mx=(x0+x1)/2+(bulge||16),my=(y0+y1)/2;
  const out=[];
  for(let i=0;i<n;i++){
   const u=i/Math.max(n-1,1);
   const x=(1-u)*(1-u)*x0+2*(1-u)*u*mx+u*u*x1;
   const y=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1;
   out.push([x,y,s0+(s1-s0)*u,r0+(r1-r0)*u]);
  }
  return out;
 }
 return spec;
}
function use137(id,x,y,rot,s){
 let tr=`translate(${F137(x)} ${F137(y)})`;
 if(rot)tr+=` rotate(${F137(rot)})`;
 if(s&&s!==1)tr+=` scale(${F137(s,2)})`;
 return `<use href="#${id}" transform="${tr}"/>`;
}
function spark137(x0,y0,x1,y1){
 return `<path class="il-sp" d="M${F137(x0)} ${F137(y0)}L${F137(x1)} ${F137(y1)}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round"/>`;
}
function core137(x,y,rx,ry,u){
 const r=(rx+ry)*.56;
 return `<circle class="il-c" cx="${F137(x)}" cy="${F137(y)}" r="${F137(r)}" fill="url(#${u}S)"/><circle cx="${F137(x)}" cy="${F137(y)}" r="${F137(r*.22)}" fill="#FFF6D8" opacity=".92"/>`;
}
function jadeDefs137(u,hop){
 hop=hop==null?'.28':hop;
 return `<radialGradient id="${u}L" cx="36%" cy="32%" r="78%"><stop offset="0" stop-color="${JADE137[0]}"/><stop offset="1" stop-color="${JADE137[1]}"/></radialGradient>`+
  `<radialGradient id="${u}S" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".45" stop-color="#E6B454"/><stop offset="1" stop-color="#855A00"/></radialGradient>`+
  `<radialGradient id="${u}H" cx="50%" cy="55%" r="52%"><stop offset="0" stop-color="#E6B454" stop-opacity="${hop}"/><stop offset="1" stop-color="#E6B454" stop-opacity="0"/></radialGradient>`;
}
function ground137(x,y,rx,ry,u,sp,o,ac){
 return `<ellipse class="il-h" cx="${F137(x)}" cy="${F137(y)}" rx="${F137(rx)}" ry="${F137(ry)}" fill="url(#${u}H)"/>`+
  `<ellipse class="il-h" cx="${F137(x)}" cy="${F137(y)}" rx="${F137(rx*.7)}" ry="${F137(ry*.7)}" fill="${ac}" opacity=".14"/>`+
  `<ellipse cx="${F137(x)}" cy="184" rx="${F137(sp)}" ry="6" fill="url(#${u}S)" opacity="${o}"/>`;
}
function lantern137(x,y,s){s=s==null?1.55:s;return IL.lantern(x,y,s);}

/* ---- Shell: same body as v119, growth face + wise halo ---- */
function turtle137(stage){
 const ph=phase137(stage);
 const g=T137.stages[ph];
 const uid=uid137('t'+ph[0]);
 const [scx,scy]=g.sc,[srx,sry]=g.sr,[hx,hy,hrx,hry]=g.head,h=g.halo;
 let defs=jadeDefs137(uid,F137(h[5],2)).replace(/#2E8A82/g,'#7A9A6A').replace(/#0A2C32/g,'#1A3A3A');
 // family sage glass for Shell
 defs=`<radialGradient id="${uid}L" cx="36%" cy="32%" r="78%"><stop offset="0" stop-color="#7A9A6A"/><stop offset="1" stop-color="#1A3A3A"/></radialGradient>`+
  `<radialGradient id="${uid}S" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".45" stop-color="#E6B454"/><stop offset="1" stop-color="#855A00"/></radialGradient>`+
  `<radialGradient id="${uid}H" cx="50%" cy="55%" r="52%"><stop offset="0" stop-color="#E6B454" stop-opacity="${F137(h[5],2)}"/><stop offset="1" stop-color="#E6B454" stop-opacity="0"/></radialGradient>`;
 defs+=`<clipPath id="${uid}C"><ellipse cx="${F137(scx)}" cy="${F137(scy)}" rx="${F137(srx)}" ry="${F137(sry)}"/></clipPath>`;
 let body=ground137(h[0],h[1],h[2],h[3],uid,h[4],h[5],'#C98990');
 if(ph==='wise'){
  body=IL.ha(uid,hx,hy-3,Math.max(hrx,hry)*1.35)+body;
 }
 body+=`<g fill="#E8C894" stroke="${INK137}" stroke-width="1.8">`+g.feet.map(f=>`<ellipse cx="${F137(f[0])}" cy="${F137(f[1])}" rx="${F137(f[2])}" ry="${F137(f[3])}"/>`).join('')+'</g>';
 body+=`<path d="${g.tail}" fill="#E8C894" stroke="${INK137}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>`;
 body+=`<ellipse cx="${F137(scx)}" cy="${F137(scy)}" rx="${F137(srx)}" ry="${F137(sry)}" fill="url(#${uid}L)"/>`;
 let pat={def:'',body:''};
 if(typeof IL119==='object'&&IL119.patterns&&IL119.patterns.hex){
  pat=IL119.patterns.hex({kind:'turtle',phase:ph,uid,cx:scx,cy:scy,rx:srx,ry:sry,coreR:g.core_r,hexSize:g.hex_size,dots:ph==='hatchling'?5:13,dotC:Math.max(4,g.hex_size*.4),stems:[[scx,scy,scx+srx*.7,scy-sry*.2]]})||pat;
 }
 if(pat.def)defs+=pat.def;
 body+=`<g clip-path="url(#${uid}C)">${pat.body||''}</g>`;
 // glass finish — reuse a light highlight
 body+=`<g clip-path="url(#${uid}C)"><ellipse cx="${F137(scx-srx*.3)}" cy="${F137(scy-sry*.36)}" rx="${F137(srx*.4)}" ry="${F137(sry*.28)}" fill="#FFF6D8" opacity=".16"/><ellipse cx="${F137(scx)}" cy="${F137(scy)}" rx="${F137(srx*.9)}" ry="${F137(sry*.88)}" fill="none" stroke="#163333" stroke-width="${ph==='hatchling'?1.9:2.2}" opacity=".35"/></g>`;
 if(g.scallop){
  let d='';const n=9,depth=4.4;
  for(let i=0;i<n;i++){
   const a0=2*Math.PI*i/n-Math.PI/2,a1=2*Math.PI*(i+1)/n-Math.PI/2,am=(a0+a1)/2;
   const x0=scx+srx*Math.cos(a0),y0=scy+sry*Math.sin(a0);
   const x1=scx+srx*Math.cos(a1),y1=scy+sry*Math.sin(a1);
   const xm=scx+(srx+depth)*Math.cos(am),ym=scy+(sry+depth)*Math.sin(am);
   d+=(i?'':'M'+F137(x0)+' '+F137(y0))+'Q'+F137(xm)+' '+F137(ym)+' '+F137(x1)+' '+F137(y1);
  }
  d+='Z';
  body+=`<path d="${d}" fill="none" stroke="${INK137}" stroke-width="2.1" stroke-linejoin="round"/>`;
 }
 const leaf=g.leaf,ls=g.leaf_s||1,tiny=!!g.leaf_tiny;
 const ld=tiny?'M0 0c-2.2-4.4 2.8-7.2 4.4-3.2c-2.2.4-2.8 2.2-1.6 3.6Z':'M0 0c-3.4-7.2 4.6-11.6 7.2-5.2c-3.4.6-4.4 3.4-2.6 5.8Z';
 body+=`<g transform="translate(${F137(leaf[0])} ${F137(leaf[1])}) rotate(-42) scale(${F137(ls,2)})"><path d="${ld}" fill="#5B7A6A" stroke="${INK137}" stroke-width="1.15" stroke-linejoin="round"/></g>`;
 body+=`<ellipse cx="${F137(hx)}" cy="${F137(hy)}" rx="${F137(hrx)}" ry="${F137(hry)}" fill="#E8C894" stroke="${INK137}" stroke-width="1.9"/>`;
 body+=applyBlink137(IL.sh(uid,ph,hx,hy,hrx,hry),'tw');
 if(g.lantern&&g.lantern[0])body+=lantern137(g.lantern[0][0],g.lantern[0][1],1.55);
 if(g.stars){
  const pts=[[126.77,100.96],[114.99,99.17],[120,112.94],[109.23,122.64],[124.28,143.63],[113.77,152.82]];
  body+=`<path d="${pts.map(p=>'M'+F137(p[0])+' '+F137(p[1])+'h0').join(' ')}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round" opacity=".52"/>`;
 }
 body+=spark137(scx,scy-2,scx,scy-18);
 css137();
 return wrap137('turtle',ph,'hex',uid,`<defs>${defs}</defs>`+body,{style:blinkStyle137('tw')});
}

/* ---- Dragon from compact data ---- */
function dragonGeom137(ph){
 const order=D137.order, face=D137.face||{};
 function fill(row){
  const o={};
  order.forEach((k,i)=>{
   let v=Array.isArray(row)?row[i]:(row&&row[k]!==undefined?row[k]:null);
   if(v==null&&face[k]!=null)v=face[k];
   o[k]=v;
  });
  return o;
 }
 if(ph==='wise'){
  const g=fill(D137.stages.grown);
  Object.assign(g,D137.stages.wise);
  return g;
 }
 return fill(D137.stages[ph]);
}
function dragon137(stage){
 const ph=phase137(stage);
 const g=dragonGeom137(ph);
 const uid=uid137('d'+ph[0]);
 const P=D137.paths;
 const hop=g.halo?g.halo[5]:.28;
 let defs=jadeDefs137(uid,F137(hop,2));
 const bodyD=g.body==='baby'?P.bodyBaby:P.bodySit;
 const curveN=(D137.curve&&D137.curve[PHASE137.indexOf(ph)])||3;
 const curve=heighway137(curveN,16,-22,38,-68,4.5,'il-fine',AMBER137,3.6,.12)+heighway137(curveN,16,-22,38,-68,4.5,'il-fine',AMBER137,1.7,.46);
 const struts=`<path d="${D137.struts}" fill="none" stroke="${INK137}" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>`;
 const tail=g.tail;
 const tailD=thickCurve137(tail[0],tail[1],tail[2],tail[3],tail[4],tail[5],tail[6],tail[7]);
 defs+=`<path id="${uid}T" d="${tailD}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>`+
  `<path id="${uid}W" d="${P.wing}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="1.7" stroke-linejoin="round"/>`+
  `<clipPath id="${uid}WC"><path d="${P.wing}"/></clipPath>`+
  `<g id="${uid}WG"><use href="#${uid}W"/>${struts}</g>`+
  `<g id="${uid}WH"><use href="#${uid}W"/>${struts}<g clip-path="url(#${uid}WC)">${curve}</g></g>`+
  `<path id="${uid}N" d="${P.horn}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="1.5" stroke-linejoin="round"/>`+
  `<path id="${uid}P" d="${P.plate}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="1.5" stroke-linejoin="round"/>`+
  `<path id="${uid}K" d="${P.neck}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="1.8" stroke-linejoin="round"/>`+
  `<path id="${uid}CR" d="${P.head}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="2" stroke-linejoin="round"/>`+
  `<path id="${uid}B" d="${bodyD}"/>`+
  `<clipPath id="${uid}O"><path d="${bodyD}"/></clipPath>`;
 const [bex,bey,berx,bery]=g.belly;
 defs+=`<clipPath id="${uid}C"><ellipse cx="${F137(bex)}" cy="${F137(bey)}" rx="${F137(berx)}" ry="${F137(bery)}"/></clipPath>`+
  `<g id="${uid}U"><path class="il-fine" d="${hexD137(0,0,7)}" fill="url(#${uid}L)" stroke="${AMBER137}" stroke-width="1.35" stroke-linejoin="round"/><circle class="il-fine" r="1.45" fill="${AMBER137}"/></g>`;
 const parts=[];
 if(ph==='wise'){
  const [hx0,hy0,hs0]=g.head;
  parts.push(IL.ha(uid,hx0-25*(hs0/1.15),hy0-12*(hs0/1.15),40*(hs0/1.15)));
 }
 const [ahx,ahy,arx,ary,spill,hop2]=g.halo;
 parts.push(ground137(ahx,ahy,arx,ary,uid,spill,hop2,EMBER_MID137));
 (g.wings||[]).forEach((w,i)=>{
  const [wx,wy,ws,wrot]=w;
  const href=i===0?(uid+'WG'):(uid+'WH');
  if(i===0)parts.push(`<use href="#${href}" transform="translate(${F137(wx)} ${F137(wy)}) scale(-1 1) rotate(${F137(-wrot)}) scale(${F137(ws,2)})"/>`);
  else parts.push(`<use href="#${href}" transform="translate(${F137(wx)} ${F137(wy)}) rotate(${F137(wrot)}) scale(${F137(ws,2)})"/>`);
 });
 (g.haunches||[]).forEach(h=>{
  parts.push(`<ellipse cx="${F137(h[0])}" cy="${F137(h[1])}" rx="${F137(h[2])}" ry="${F137(h[3])}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="1.6"/>`);
 });
 parts.push(`<use href="#${uid}T"/>`);
 const bodyS=g.body_s||1;
 const bodyTr=bodyS!==1?`<g transform="translate(100 176) scale(${F137(bodyS,2)}) translate(-100 -176)">`:'';
 const bodyTrEnd=bodyS!==1?'</g>':'';
 parts.push(`${bodyTr}<path d="${bodyD}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="2.1" stroke-linejoin="round"/><g clip-path="url(#${uid}O)"><ellipse cx="86" cy="128" rx="18" ry="16" fill="#FFF6D8" opacity=".2"/></g>${bodyTrEnd}`);
 const [nx,ny,ns,nrot]=g.neck;
 parts.push(use137(uid+'K',nx,ny,nrot,ns));
 const [hx,hy,hs,hrot]=g.head;
 let headTr=`translate(${F137(hx)} ${F137(hy)})`;
 if(hrot)headTr+=` rotate(${F137(hrot)})`;
 if(hs&&hs!==1)headTr+=` scale(${F137(hs,2)})`;
 const eyes=g.eyes, mouth=g.mouth, nost=g.nostrils||[];
 const face=applyBlink137(IL.g(uid,ph,eyes[0][0],eyes[0][1],eyes[1][0],eyes[1][1],eyes[0][2],eyes[1][2],'#2E7A74','#72583F',function(){return [mouth[0],mouth[1]+3.2,mouth[2]*1.05];},1.2,1.45,1,2.6,'#123434'),'dw');
 const nostH=nost.map(n=>`<circle cx="${F137(n[0])}" cy="${F137(n[1])}" r="${F137(n[2])}" fill="${INK137}"/>`).join('');
 const horns=(g.horns||[]).map(h=>use137(uid+'N',h[0],h[1],h[3],h[2])).join('');
 parts.push(`<g transform="${headTr}"><use href="#${uid}CR"/><ellipse cx="-18" cy="-8" rx="12" ry="8" fill="#FFF6D8" opacity=".18"/>${face}${nostH}${horns}</g>`);
 plates137(g.plates).forEach(p=>parts.push(use137(uid+'P',p[0],p[1],p[3],p[2])));
 const hexKind=D137.hex[PHASE137.indexOf(ph)]||'1';
 const hsz=(g.hex_size||7)/7;
 const scale=hexCenters137(hexKind,g.hex_size||7).map(c=>use137(uid+'U',bex+c[0],bey+c[1],null,hsz)).join('');
 const cr=g.core_r||[7,5.2];
 parts.push(`<g id="${uid}CH"><ellipse cx="${F137(bex)}" cy="${F137(bey)}" rx="${F137(berx)}" ry="${F137(bery)}" fill="${BELLY137}" opacity=".88" stroke="${INK137}" stroke-width="1.2"/><g clip-path="url(#${uid}C)">${scale}${core137(bex,bey,cr[0],cr[1],uid)}${spark137(bex,bey-2,bex,bey-18)}</g></g>`);
 (g.paws||[]).forEach(p=>{
  parts.push(`<ellipse cx="${F137(p[0])}" cy="${F137(p[1])}" rx="${F137(p[2])}" ry="${F137(p[3])}" fill="${FOOT137}" stroke="${INK137}" stroke-width="1.05"/>`);
 });
 if(g.lantern)parts.push(lantern137(g.lantern[0],g.lantern[1],1.55));
 if(g.stars){
  const d=DRACO137.map(p=>'M'+F137(p[0])+' '+F137(p[1])+'h0').join(' ');
  parts.push(`<g class="il-fine"><path d="${d}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round" opacity=".46"/></g>`);
 }
 css137();
 return wrap137('dragon',ph,'heighway+hex',uid,`<defs>${defs}</defs>`+parts.join(''),{style:blinkStyle137('dw')});
}

/* ---- Sprites trio ---- */
function pappus137(cx,cy,n,length,disc_r,shed){
 let parts=`<ellipse cx="${F137(cx)}" cy="${F137(cy)}" rx="${F137(disc_r*1.10)}" ry="${F137(disc_r*0.88)}" fill="#F4E4C4" opacity=".82"/><ellipse cx="${F137(cx)}" cy="${F137(cy)}" rx="${F137(disc_r*0.80)}" ry="${F137(disc_r*0.64)}" fill="#E8C894" opacity=".95"/>`;
 const span=n>=11?11:(n>=7?14:16);
 for(let i=0;i<n;i++){
  const rad=(-90+(i-(n-1)/2)*span)*Math.PI/180;
  const x1=cx+disc_r*0.30*Math.cos(rad),y1=cy+disc_r*0.22*Math.sin(rad);
  const x2=cx+length*Math.cos(rad),y2=cy+length*0.88*Math.sin(rad);
  const qx=cx+length*0.55*Math.cos(rad),qy=cy+length*0.48*Math.sin(rad);
  parts+=`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#F4E4C4" stroke-width="1.35" stroke-linecap="round" opacity=".92"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="2.15" fill="${AMBER137}" opacity=".96"/>`;
 }
 const ga=Math.PI*(3-Math.sqrt(5));
 const m=Math.max(7,Math.round(n*1.15));
 for(let i=0;i<m;i++){
  const rr=disc_r*0.20*Math.sqrt(i+0.55),a=i*ga-Math.PI/2;
  parts+=`<circle cx="${(cx+rr*Math.cos(a)).toFixed(1)}" cy="${(cy+rr*Math.sin(a)).toFixed(1)}" r="1.65" fill="${AMBER137}"/>`;
 }
 const drifts=[[cx+34,cy-22,0.58,16],[cx+50,cy-4,0.50,30],[cx+42,cy+18,0.44,48],[cx-38,cy-16,0.48,-20],[cx+20,cy-40,0.42,6]];
 for(const [sx,sy,sc,rot] of drifts.slice(0,shed||0)){
  parts+=`<g transform="translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${rot}) scale(${sc})"><ellipse cx="0" cy="8" rx="4.2" ry="5.4" fill="#E8C894" stroke="${INK137}" stroke-width="1.1"/>`;
  for(const a of [-70,-90,-110]){
   const rad=a*Math.PI/180;
   parts+=`<path d="M0 4L${(18*Math.cos(rad)).toFixed(1)} ${(18*Math.sin(rad)).toFixed(1)}" fill="none" stroke="#F4E4C4" stroke-width="1.15" stroke-linecap="round"/><circle cx="${(18*Math.cos(rad)).toFixed(1)}" cy="${(18*Math.sin(rad)).toFixed(1)}" r="1.55" fill="${AMBER137}"/>`;
  }
  parts+='</g>';
 }
 return parts;
}
function logMotes137(cx,cy,n,r0,r1,turns){
 turns=turns==null?1.25:turns;
 const t1=turns*2*Math.PI,k=Math.log(Math.max(r1,r0+1)/r0)/Math.max(t1,1e-6);
 let parts='';
 for(let i=0;i<n;i++){
  const u=i/Math.max(n-1,1),t=t1*u,r=r0*Math.exp(k*t);
  const x=cx+r*Math.cos(t),y=cy+r*Math.sin(t)*0.92;
  const rr=3.1-1.1*u,opv=0.95-0.30*u;
  parts+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${Math.max(1.6,rr*1.7).toFixed(1)}" fill="${AMBER137}" opacity="${(opv*0.45).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${Math.max(1.1,rr).toFixed(1)}" fill="${CATCH137}" opacity="${opv.toFixed(2)}"/>`;
 }
 return parts;
}
function trioBody137(cx,cy,rx,ry,tip){
 const yt=cy-ry,yb=cy+ry;
 let a,b;
 if(tip==='drop'){
  a=`C${F137(cx+rx*0.16)} ${F137(yt+ry*0.38)} ${F137(cx+rx)} ${F137(cy-ry*0.32)} ${F137(cx+rx)} ${F137(cy+ry*0.20)}`;
  b=`C${F137(cx-rx)} ${F137(cy-ry*0.32)} ${F137(cx-rx*0.16)} ${F137(yt+ry*0.38)} ${F137(cx)} ${F137(yt)}`;
 }else if(tip==='seed'){
  a=`C${F137(cx+rx*0.50)} ${F137(yt+ry*0.28)} ${F137(cx+rx)} ${F137(cy-ry*0.26)} ${F137(cx+rx)} ${F137(cy+ry*0.20)}`;
  b=`C${F137(cx-rx)} ${F137(cy-ry*0.26)} ${F137(cx-rx*0.50)} ${F137(yt+ry*0.28)} ${F137(cx)} ${F137(yt)}`;
 }else{
  a=`C${F137(cx+rx*0.64)} ${F137(yt)} ${F137(cx+rx)} ${F137(cy-ry*0.46)} ${F137(cx+rx)} ${F137(cy+ry*0.20)}`;
  b=`C${F137(cx-rx)} ${F137(cy-ry*0.46)} ${F137(cx-rx*0.64)} ${F137(yt)} ${F137(cx)} ${F137(yt)}`;
 }
 const lower=`C${F137(cx+rx)} ${F137(cy+ry*0.72)} ${F137(cx+rx*0.52)} ${F137(yb)} ${F137(cx)} ${F137(yb)}C${F137(cx-rx*0.52)} ${F137(yb)} ${F137(cx-rx)} ${F137(cy+ry*0.72)} ${F137(cx-rx)} ${F137(cy+ry*0.20)}`;
 return `M${F137(cx)} ${F137(yt)}${a}${lower}${b}Z`;
}
function gem137(cx,cy,r){
 return `<circle cx="${F137(cx)}" cy="${F137(cy)}" r="${F137(r*1.55)}" fill="${AMBER137}" opacity=".28"/><circle class="il-c" cx="${F137(cx)}" cy="${F137(cy)}" r="${F137(r)}" fill="${AMBER137}"/><circle cx="${F137(cx)}" cy="${F137(cy)}" r="${F137(r*0.46)}" fill="${CATCH137}"/>`;
}
function trioParts137(name,ph,uid,shared,motif){
 const T=S137.sprites[name];
 const st=S137.stage[ph];
 const keys=S137.keys;
 const G={};keys.forEach((k,i)=>G[k]=st[i]);
 const {cy,rx,ry,faceDy,gemDy,gemR,eyeR,groundCy,groundRx}=G;
 const [c0,c1,c2]=T.g;
 const seed=name==='puff'?'spw':name==='dew'?'sdw':'sew';
 let defs=`<radialGradient id="${uid}L" cx="36%" cy="30%" r="74%"><stop offset="0" stop-color="${c0}"/><stop offset=".55" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`+
  `<radialGradient id="${uid}G"><stop offset="0" stop-color="${T.glow}" stop-opacity=".42"/><stop offset=".6" stop-color="${T.glow}" stop-opacity=".14"/><stop offset="1" stop-color="${T.glow}" stop-opacity="0"/></radialGradient>`;
 let back='',front='';
 if(ph==='wise')back+=IL.ha(uid,100,cy-18,ry*1.3);
 if(shared!==false){
  back+=`<ellipse class="il-h" cx="100" cy="${F137(cy)}" rx="${F137(ry*2.0)}" ry="${F137(ry*1.8)}" fill="url(#${uid}G)"/><ellipse cx="100" cy="${groundCy}" rx="${groundRx}" ry="9" fill="${AMBER137}" opacity=".14"/><ellipse cx="100" cy="${groundCy}" rx="${F137(groundRx*0.6)}" ry="4.5" fill="#1A1420" opacity=".5"/>`;
 }
 const yt=cy-ry;
 if(motif!==false&&name==='puff'){
  if(ph==='hatchling'){
   back+=`<path d="M100 ${F137(yt+2)}C100 ${F137(yt-6)} 107 ${F137(yt-9)} 100 ${F137(yt-11)}C93 ${F137(yt-9)} 100 ${F137(yt-6)} 100 ${F137(yt+2)}Z" fill="#E8C894" stroke="${INK137}" stroke-width="1.3" stroke-linejoin="round"/><ellipse cx="100" cy="${F137(yt-6)}" rx="3.3" ry="2.5" fill="${AMBER137}" opacity=".85"/>`;
  }else{
   const [n,ln,dr,shed]=T.m[ph];
   back+=pappus137(100,yt-8,n,ln,dr,shed);
   back+=`<path d="M100 ${F137(yt+3)}L100 ${F137(yt-6)}" fill="none" stroke="${INK137}" stroke-width="1.8" stroke-linecap="round"/>`;
  }
 }else if(motif!==false&&name==='dew'){
  const m=T.m[ph];
  if(Array.isArray(m)){
   const ops=m.length===2?[[.60,1.5],[.34,1.2]]:[[.70,1.6],[.48,1.35],[.30,1.15],[.16,.95]];
   m.forEach((k,i)=>{const [o,s]=ops[i];back+=`<path d="${hexD137(100,cy,ry*k)}" fill="none" stroke="${AMBER137}" stroke-width="${s}" stroke-linejoin="round" opacity="${o}"/>`;});
  }
  if(ph==='wise'){
   const py=cy+ry-2;
   [[34,.7,1.45],[52,.48,1.2],[70,.3,1.05],[88,.16,.9]].forEach(([rr,o,s])=>{
    back+=`<g transform="translate(100 ${F137(py)}) scale(1 .4) translate(-100 ${F137(-py)})"><path d="${hexD137(100,py,rr)}" fill="none" stroke="${AMBER137}" stroke-width="${F137(s/.4)}" stroke-linejoin="round" opacity="${o}"/></g>`;
   });
   back+=`<ellipse cx="100" cy="${F137(py+2)}" rx="84" ry="24" fill="#0A2C32" opacity=".6"/><ellipse cx="100" cy="${F137(py)}" rx="80" ry="20" fill="url(#${uid}L)" opacity=".5" stroke="${INK137}" stroke-width="1.5"/><path d="M24 ${F137(py-1)}Q100 ${F137(py-8)} 176 ${F137(py-1)}" fill="none" stroke="${CATCH137}" stroke-width="1.25" opacity=".4" stroke-linecap="round"/><g opacity=".5" transform="translate(0 ${F137(2*py)}) scale(1 -1)"><g transform="translate(100 ${F137(py)}) scale(1 .30) translate(-100 ${F137(-py)})"><path d="${trioBody137(100,py-ry,rx*0.95,ry,'drop')}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="4"/></g></g>`;
  }
 }else if(motif!==false&&name==='ember'){
  if(ph==='hatchling'){
   [[76,cy-22,.72],[124,cy-14,.52]].forEach(([x,y,s])=>{
    const a=7.5*s,b=2.0*s;
    back+=`<path d="M${x} ${F137(y-a)}Q${F137(x+b*.3)} ${F137(y-b)} ${F137(x+b)} ${F137(y)}Q${F137(x+b*.3)} ${F137(y+b)} ${x} ${F137(y+a)}Q${F137(x-b*.3)} ${F137(y+b)} ${F137(x-b)} ${F137(y)}Q${F137(x-b*.3)} ${F137(y-b)} ${x} ${F137(y-a)}Z" fill="${CATCH137}" opacity=".9"/>`;
   });
   back+=`<circle cx="127" cy="${cy+6}" r="2" fill="${CATCH137}" opacity=".8"/><circle cx="73" cy="${cy+10}" r="1.6" fill="${CATCH137}" opacity=".65"/>`;
  }else{
   const [n,d0,d1,turns]=T.m[ph];
   back+=logMotes137(100,cy,n,ry+d0,ry+d1,turns);
  }
  if(ph==='wise'){
   const by=cy+ry-4;
   back+=`<path d="M38 ${F137(by)}C38 ${F137(by-12)} 58 ${F137(by-18)} 78 ${F137(by-14)}C90 ${F137(by-18)} 110 ${F137(by-18)} 122 ${F137(by-14)}C142 ${F137(by-18)} 162 ${F137(by-12)} 162 ${F137(by)}C162 ${F137(by+12)} 136 ${F137(by+20)} 100 ${F137(by+20)}C64 ${F137(by+20)} 38 ${F137(by+12)} 38 ${F137(by)}Z" fill="#3A2018" stroke="${INK137}" stroke-width="1.6" stroke-linejoin="round"/>`;
   front+=`<path d="M50 ${F137(by+2)}C66 ${F137(by+14)} 134 ${F137(by+14)} 150 ${F137(by+2)}" fill="none" stroke="#5A3020" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
  }
 }
 const fy=cy+faceDy,sep=eyeR*(S137.sep||2.55);
 const dk=name==='dew'?'#0A2C32':name==='ember'?'#3A1810':'#5E4430';
 const face=applyBlink137(IL.g(uid,ph,100-sep/2,fy,100+sep/2,fy,eyeR,eyeR,T.lid,'#72583F',function(a,b,c,d,r,s){return [100,Math.max(b,d)+Math.max(r,s)*1.25,r*2.1];},1.18,1.15,0,1.8,dk),seed);
 let body=`<path d="${trioBody137(100,cy,rx,ry,T.tip)}" fill="url(#${uid}L)" stroke="${INK137}" stroke-width="2" stroke-linejoin="round"/><ellipse cx="${F137(100-rx*0.34)}" cy="${F137(cy-ry*0.22)}" rx="${F137(rx*0.36)}" ry="${F137(ry*0.26)}" fill="${CATCH137}" opacity=".28"/>`+face+gem137(100,cy+gemDy,gemR)+spark137(100,cy+gemDy-2,100,cy+gemDy-16)+front;
 const lan=ph==='wise'?lantern137(166,cy+6,0.88):'';
 return {defs,back,body,lan,cy,seed,style:blinkStyle137(seed)};
}
function spriteSolo137(name,stage){
 const ph=phase137(stage);
 const uid=uid137('s'+name[0]+ph[0]);
 const p=trioParts137(name,ph,uid,true,true);
 css137();
 return wrap137('sprites',ph,'trio',uid,`<defs>${p.defs}</defs>${p.back}${p.body}${p.lan}`,{style:p.style});
}
function chosen137(pid){
 const st=typeof friendState101==='function'?friendState101('sprites',pid):null;
 const c=st&&st.chosen;
 return (c==='dew'||c==='ember'||c==='puff')?c:'puff';
}
function mode137(pid){
 const st=typeof friendState101==='function'?friendState101('sprites',pid):null;
 return (st&&st.mode==='all')?'all':'visit';
}
function spriteArt137(stage,pid){
 return spriteSolo137(chosen137(pid),stage);
}

/* ---- lamp rims ---- */
function addLampRims137(html){
 if(!html||/class="il-fine il-er"/.test(html))return html;
 return html.replace(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)" fill="#72583F"\/>/g,function(m,x,y,r){
  const rr=parseFloat(r);
  if(!(rr>=1.6&&rr<=6.5))return m;
  const rd=Math.min(rr*1.5,Math.max(rr*1.4,2.4));
  return '<circle class="il-fine il-er" cx="'+x+'" cy="'+y+'" r="'+F137(rd)+'" fill="#F4E4C4"/>'+m;
 });
}
function patchLamp137(){}

/* ---- friends list, fallback, names, picker grid ---- */
function migrate137(f){
 if(!f||typeof f!=='object')return f;
 const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
 const pick=function(a,b){
  if(!a&&!b)return null;
  if(a&&!b)return a;
  if(b&&!a)return b;
  const sa=Number(a.stage||a.moments||0),sb=Number(b.stage||b.moments||0);
  return sa>=sb?a:b;
 };
 if(!f.sprites){
  const src=pick(f.olivesprite_m,f.olivesprite_f);
  f.sprites=norm(src?{moments:src.moments,stage:src.stage,shown:src.shown,pending:src.pending,kinds:src.kinds,day:src.day,dayCredits:src.dayCredits,session:src.session,lastSeen:src.lastSeen}:null);
 }
 if(!f.sprites.chosen)f.sprites.chosen='puff';
 if(!f.sprites.mode)f.sprites.mode='visit';
 if(f.active==='olivesprite_m'||f.active==='olivesprite_f')f.active='sprites';
 if(f.active==='olivedove_m'||f.active==='olivedove_f')f.active='lamp';
 return f;
}
function installList137(){
 if(typeof FRIENDS101==='undefined')return;
 const six=['lamp','moth','owl','turtle','dragon','phoenix'];
 const extras=EXTRA_KEEP137.flatMap(s=>[s+'_m',s+'_f']).concat(['sprites']);
 const order=six.concat(extras);
 FRIENDS101.splice(0,FRIENDS101.length,...order);
 if(typeof IL120==='object'){
  IL120.ids=extras.slice();
  IL120.species=EXTRA_KEEP137.concat(['sprites']);
 }
}
function cols137(n,wide){
 if(wide){if(n%4===0)return 4;if(n%3===0)return 3;return 4;}
 if(n%2===0)return 2;if(n%3===0)return 3;return 2;
}

function hook137(){
 patchLamp137();
 installList137();

 const prevLoad=typeof friendsLoad101==='function'?friendsLoad101:null;
 if(prevLoad){
  friendsLoad101=function(pid){
   const f=migrate137(prevLoad(pid)||{active:'lamp',offered:false});
   const id=pid||(typeof curPid==='function'?curPid():'');
   const raw=(typeof RAW!=='undefined'&&typeof safeJSON==='function')?safeJSON(RAW.get('lamp_friends101@'+id),null):null;
   const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
   if(raw&&raw.sprites){
    const s=norm(raw.sprites);
    s.chosen=raw.sprites.chosen||f.sprites.chosen||'puff';
    s.mode=raw.sprites.mode||f.sprites.mode||'visit';
    f.sprites=s;
   }
   return f;
  };
 }
 const prevPut=typeof friendsPut101==='function'?friendsPut101:null;
 if(prevPut){
  friendsPut101=function(f,pid){
   prevPut(f,pid);
   const id=pid||(typeof curPid==='function'?curPid():'');
   if(typeof getProfiles==='function'&&!getProfiles().list.some(p=>p.id===id))return;
   if(typeof RAW==='undefined')return;
   const cur=(typeof safeJSON==='function'?safeJSON(RAW.get('lamp_friends101@'+id),null):null)||{};
   if(f&&f.sprites){
    const s=(typeof friendNorm101==='function'?friendNorm101(f.sprites):f.sprites)||{};
    s.chosen=f.sprites.chosen||'puff';
    s.mode=f.sprites.mode||'visit';
    cur.sprites=s;
    RAW.set('lamp_friends101@'+id,JSON.stringify(cur));
   }
  };
 }
 const prevState=typeof friendState101==='function'?friendState101:null;
 if(prevState){
  friendState101=function(kind,pid){
   if(kind==='sprites'){
    const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
    const s=norm(friendsLoad101(pid).sprites);
    s.chosen=s.chosen||'puff';s.mode=s.mode||'visit';
    return s;
   }
   return prevState(kind,pid);
  };
 }
 const prevName=typeof friendKindName101==='function'?friendKindName101:null;
 if(prevName){
  friendKindName101=function(kind){
   if(kind==='sprites'){
    const t=typeof gT==='function'?gT:s=>s;
    const ch=chosen137();
    const names={puff:t('Puff'),dew:t('Dew'),ember:t('Ember')};
    return names[ch]||t('Sprites');
   }
   return prevName(kind);
  };
 }
 const prevArt=typeof friendArtInner101==='function'?friendArtInner101:null;
 friendArtInner101=function(id,stage){
  css137();
  if(id==='turtle'||id==='shell')return turtle137(stage);
  if(id==='dragon')return dragon137(stage);
  if(id==='sprites')return spriteArt137(stage);
  const html=prevArt?prevArt(id,stage):'';
  return id==='lamp'?addLampRims137(html):html;
 };
 if(typeof IL119==='object'){
  const prevA=IL119.art;
  IL119.art=function(kind,stage,opt){
   if(kind==='turtle'||kind==='shell')return turtle137(stage);
   if(kind==='dragon')return dragon137(stage);
   if(kind==='sprites')return spriteArt137(stage);
   const html=prevA?prevA(kind,stage,opt):'';
   return kind==='lamp'?addLampRims137(html):html;
  };
  const prevK=IL119.kind;
  IL119.kind=function(k){return k==='sprites'||k==='dragon'?k:(prevK?prevK(k):k)};
  const prevP=IL119.defaultPattern;
  IL119.defaultPattern=function(kind){
   if(kind==='dragon')return 'heighway+hex';
   if(kind==='sprites')return 'trio';
   return prevP?prevP(kind):'hex';
  };
 }

 const prevHTML=typeof friendPickerHTML101==='function'?friendPickerHTML101:null;
 if(prevHTML){
  friendPickerHTML101=function(pid){
   let html=prevHTML(pid);
   const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
   const ch=chosen137(pid);
   const btns=[['puff','Puff'],['dew','Dew'],['ember','Ember']].map(([k,en])=>{
    const on=ch===k?' on':'';
    return `<button type="button" class="p${on}" data-sprite137="${k}" aria-pressed="${ch===k?'true':'false'}">${e(t(en))}</button>`;
   }).join('');
   const visit=t('The other two visit as this one grows.');
   html=html.replace('</div></div>',`</div><div class="spritePick137" data-sprite-pick137="1"><p class="soft">${e(t('Which sprite sits with you?'))}</p>${btns}<p class="soft">${e(visit)}</p></div></div>`);
   return html;
  };
 }
 const prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
 if(prevAttach){
  friendPickerAttach101=function(){
   prevAttach.apply(this,arguments);
   const host=document.querySelector('[data-sprite-pick137]');
   if(!host||host._il137)return;
   host._il137=1;
   host.addEventListener('click',function(ev){
    const b=ev.target.closest('[data-sprite137]');
    if(!b)return;
    ev.preventDefault();
    const k=b.getAttribute('data-sprite137');
    const pid=typeof curPid==='function'?curPid():'';
    const f=friendsLoad101(pid);
    f.sprites=f.sprites||(typeof friendNorm101==='function'?friendNorm101(null):{});
    f.sprites.chosen=k;f.sprites.mode=f.sprites.mode||'visit';
    f.active='sprites';
    friendsPut101(f,pid);
    if(typeof friendPickerAttach101==='function'){
     const card=document.querySelector('[data-friends101]');
     if(card){card.outerHTML=friendPickerHTML101(pid);friendPickerAttach101();}
    }
    if(typeof lampMountAll73==='function')lampMountAll73();
    if(typeof friendLine101==='function')friendLine101();
   });
  };
 }
}

hook137();

window.IL137={
 turtle:turtle137,dragon:dragon137,sprite:spriteSolo137,phase:phase137,
 chosen:chosen137,migrate:migrate137,data:{dragon:D137,sprites:S137,turtle:T137}
};
})();
/* v138: Equinox and full-moon soft glow on Moon-phase dusk (no countdown),
   plus earned Pattern Quilt squares for dragon-curve, rosette, scallops and
   voronoi, using the existing recipes and Pi's facts. Companion growth
   awards one. Does not wrap show(). */
(function(){
'use strict';

function t138(s){return typeof patT==='function'?patT(s):(typeof gT==='function'?gT(s):s)}
function esc138(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

/* Meeus (Astronomical Algorithms, ch. 27) mean March / September equinox, JDE ≈ UT.
   Same Julian-date style as v131 solstices and moon.js. Device clock only; no location. */
function moonEquinoxJD138(year, month){
  const Y=(year-2000)/1000, Y2=Y*Y, Y3=Y2*Y, Y4=Y3*Y;
  const mean=month===9?2451810.21715+365242.01767*Y-0.11575*Y2+0.00337*Y3+0.00078*Y4
    :2451623.80984+365242.37404*Y+0.05169*Y2-0.00411*Y3-0.00057*Y4;
  const peri=(typeof MoonDusk131==='object'&&MoonDusk131&&typeof MoonDusk131.periodic==='function')
    ?MoonDusk131.periodic:null;
  return peri?peri(mean):mean;
}
function sameLocalDay138(inst, y, m, d){
  return inst.getFullYear()===y && inst.getMonth()===m && inst.getDate()===d;
}
function moonEquinox138(date){
  const d=date instanceof Date?date:new Date();
  const y0=d.getFullYear(), m0=d.getMonth(), day0=d.getDate();
  for(let y=y0-1;y<=y0+1;y++){
    for(const month of [3,9]){
      const inst=new Date((moonEquinoxJD138(y, month)-2440587.5)*86400000);
      if(sameLocalDay138(inst,y0,m0,day0)) return true;
    }
  }
  return false;
}
function moonFull138(date){
  try{
    if(typeof MoonDusk==='undefined'||typeof MoonDusk.phase!=='function') return false;
    const p=MoonDusk.phase(date instanceof Date?date:new Date());
    if(p&&typeof p.frac==='number'&&typeof MoonDusk.SYNODIC==='number')
      return Math.abs(p.frac-0.5)*MoonDusk.SYNODIC<=1.5;
    return p&&p.id==='full';
  }catch(e){return false}
}

function moonCss138(){
  if(document.getElementById('v138css'))return;
  const st=document.createElement('style');
  st.id='v138css';
  st.textContent=[
    '#patterns .moon131.moon-eq131,#patterns .moon131.moon-full131{box-shadow:inset 0 0 48px 8px rgba(230,180,84,.22),0 0 36px 4px rgba(230,180,84,.18)}',
    '#patterns .moon131.moon-eq131::after,#patterns .moon131.moon-full131::after{content:"";position:absolute;inset:8% 12% 28%;border-radius:50%;background:radial-gradient(circle,rgba(255,246,216,.28) 0%,rgba(230,180,84,.12) 42%,transparent 70%);pointer-events:none}',
    '#patterns .quilt-facts138{margin:8px auto 0;max-width:520px;padding:0 4px;list-style:none}',
    '#patterns .quilt-facts138 li{margin:0 0 14px;color:#463F52;line-height:1.45}',
    '#patterns .quilt-facts138 strong{display:block;color:#855A00;margin:0 0 4px}'
  ].join('');
  document.head.appendChild(st);
}

function decorateMoon138(optDate){
  moonCss138();
  const host=document.querySelector('#patterns .moon131');
  if(!host)return;
  const when=optDate instanceof Date?optDate:new Date();
  const longest=typeof moonLongest131==='function'&&moonLongest131(when);
  const eq=moonEquinox138(when);
  const full=moonFull138(when);
  host.classList.toggle('moon-eq131', !longest&&eq);
  host.classList.toggle('moon-full131', !longest&&!eq&&full);
  if(longest||!eq) return;
  let line=document.getElementById('moonLong131')||document.getElementById('moonEq138');
  if(!line){
    line=document.createElement('p');
    line.className='moon-longline131';
    line.id='moonEq138';
    const look=host.previousElementSibling;
    if(look&&look.parentNode) look.parentNode.insertBefore(line, host);
    else host.parentNode.insertBefore(line, host);
  }
  line.id='moonEq138';
  line.textContent=t138('Equinox');
}

const _renderMoon131=(window.MoonDusk131&&typeof window.MoonDusk131.render==='function')?window.MoonDusk131.render:null;
function renderMoon138(optDate){
  const r=_renderMoon131?_renderMoon131(optDate):undefined;
  try{decorateMoon138(optDate)}catch(e){}
  return r;
}
window.renderMoon131=renderMoon138;
if(window.MoonDusk131) window.MoonDusk131.render=renderMoon138;

/* ---- earned patterns ---- */
const GROW138={dragon:'heighway',lamp:'rosette',phoenix:'scallops',glowcap_m:'voronoi',glowcap_f:'voronoi'};
const ORDER138=['hex','sunflower','heighway','rosette','scallops','voronoi'];
const NAME138={hex:'Honeycomb',sunflower:'Sunflower',heighway:'Dragon curve',rosette:'Rosette',scallops:'Scallops',voronoi:'Voronoi'};
const FACT138={
  hex:'Bees build honeycomb from hexagons. They fit together with no gaps.',
  sunflower:'Sunflower seeds grow in spirals.',
  heighway:'Fold a paper strip in half again and again. Open it, and its edge draws this dragon.',
  rosette:'Each petal is turned the same amount, so the flower looks the same all the way around.',
  scallops:'3 and 5 make 8. Each new number is the two before it added up.',
  voronoi:'Each shape holds the spots closest to its own dot, a bit like giraffe patches.'
};

function earnPat138(id){
  if(window.IL124&&typeof window.IL124.earn==='function') return window.IL124.earn(id);
  try{
    const key='lamp_earn124@'+((typeof curPid==='function'?curPid():'')||'');
    const raw=(typeof RAW!=='undefined'&&RAW.get)?RAW.get(key):null;
    const o=raw?(typeof safeJSON==='function'?safeJSON(raw,{}):JSON.parse(raw||'{}')):{};
    o[id]=true;
    if(RAW&&RAW.set) RAW.set(key, JSON.stringify(o));
  }catch(e){}
}
function grantGrowth138(){
  const kinds=(typeof FRIENDS101!=='undefined'&&FRIENDS101.slice)?FRIENDS101.slice():Object.keys(GROW138);
  kinds.forEach(k=>{
    const pat=GROW138[k];if(!pat)return;
    try{
      const s=typeof friendState101==='function'?friendState101(k):null;
      if(s&&(s.stage|0)>=3)earnPat138(pat);
    }catch(e){}
  });
}

const _entries130=(window.PatternQuilt130&&typeof window.PatternQuilt130.entries==='function')?window.PatternQuilt130.entries:null;
function quiltEntries138(){
  try{grantGrowth138()}catch(e){}
  const out=_entries130?(_entries130.apply(this,arguments)||[]):[];
  const order=(typeof PatternQuilt!=='undefined'&&PatternQuilt.ids)||ORDER138;
  out.sort(function(a,b){return order.indexOf(a.id)-order.indexOf(b.id)});
  return out;
}
window.quiltEntries130=quiltEntries138;
if(window.PatternQuilt130) window.PatternQuilt130.entries=quiltEntries138;

function quiltFactsHTML138(entries){
  if(!entries||!entries.length)return '';
  const items=entries.map(function(e){
    const id=e.id, name=t138(NAME138[id]||id), fact=t138(FACT138[id]||'');
    if(!fact)return '';
    return '<li><strong>'+esc138(name)+'</strong>'+esc138(fact)+'</li>';
  }).join('');
  return items?'<ul class="quilt-facts138">'+items+'</ul>':'';
}

const _renderQuilt130=(window.PatternQuilt130&&typeof window.PatternQuilt130.render==='function')?window.PatternQuilt130.render:null;
function enhanceQuilt138(){
  moonCss138();
  const host=document.querySelector('#patterns .quilt130');
  if(!host)return;
  const entries=quiltEntries138();
  try{if(typeof PatternQuilt!=='undefined'&&PatternQuilt.quilt) host.innerHTML=PatternQuilt.quilt(entries)}catch(e){}
  document.querySelectorAll('#patterns .quilt-facts138').forEach(n=>n.remove());
  host.insertAdjacentHTML('afterend', quiltFactsHTML138(entries));
}
function renderQuilt138(){
  const r=_renderQuilt130?_renderQuilt130.apply(this,arguments):undefined;
  try{enhanceQuilt138()}catch(e){}
  return r;
}
window.renderQuilt130=renderQuilt138;
if(window.PatternQuilt130) window.PatternQuilt130.render=renderQuilt138;

const _open106=typeof patOpen106==='function'?patOpen106:null;
if(_open106){
  patOpen106=function(unit){
    const r=_open106.apply(this,arguments);
    try{
      if(unit==='moon') decorateMoon138();
      if(unit==='quilt') enhanceQuilt138();
    }catch(e){}
    return r;
  };
}

const _lampMoment73=typeof lampMoment73==='function'?lampMoment73:null;
if(_lampMoment73){
  lampMoment73=function(){
    const r=_lampMoment73.apply(this,arguments);
    try{grantGrowth138()}catch(e){}
    return r;
  };
}

if(window.MoonDusk131){
  window.MoonDusk131.equinox=moonEquinox138;
  window.MoonDusk131.equinoxJD=moonEquinoxJD138;
  window.MoonDusk131.full=moonFull138;
}
window.IL138={
  equinox:moonEquinox138,equinoxJD:moonEquinoxJD138,full:moonFull138,
  grant:grantGrowth138,facts:FACT138,grow:GROW138,order:ORDER138
};
try{grantGrowth138()}catch(e){}
moonCss138();
})();
/* v139: Hotfix for v137 Sprite fallbacks.
   Olive-sprite users land on Sprites as Puff (progress kept); Dove users
   land on the Lamp (Lamp stage kept). Dew/Ember survive hide and reload.
   Chooser taps are at least 56 px tall. Does not wrap show(). */
(function(){
'use strict';
const GONE139=new Set(['olivesprite_m','olivesprite_f','olivedove_m','olivedove_f']);
let putting139=false;

function css139(){
  if(document.getElementById('v139css'))return;
  const st=document.createElement('style');
  st.id='v139css';
  st.textContent='.spritePick137 button,.spritePick137 button.p{min-height:56px;min-width:56px;padding:.45rem .8rem}'
  document.head.appendChild(st);
}

function rawFriends139(pid){
  const id=pid||(typeof curPid==='function'?curPid():'');
  try{
    if(typeof RAW==='undefined'||typeof safeJSON!=='function')return {id,raw:null};
    return {id, raw:safeJSON(RAW.get('lamp_friends101@'+id),null)};
  }catch(e){return {id,raw:null}}
}

const prevLoad=typeof friendsLoad101==='function'?friendsLoad101:null;
if(prevLoad){
  friendsLoad101=function(pid){
    const {id,raw}=rawFriends139(pid);
    const f=prevLoad(pid)||{active:'lamp',offered:false};
    if(raw&&GONE139.has(raw.active)){
      f.active=raw.active;
      const mig=(window.IL137&&typeof window.IL137.migrate==='function')?window.IL137.migrate:(typeof migrate137==='function'?migrate137:null);
      if(mig) mig(f);
      if(!putting139&&raw.active!==f.active){
        try{putting139=true;if(typeof friendsPut101==='function')friendsPut101(f,id)}catch(e){}
        finally{putting139=false}
      }
    }
    return f;
  };
}

const prevPut=typeof friendsPut101==='function'?friendsPut101:null;
if(prevPut){
  friendsPut101=function(f,pid){
    try{
      if(f&&f.sprites){
        const {raw}=rawFriends139(pid);
        const prev=(raw&&raw.sprites)||{};
        f.sprites.chosen=f.sprites.chosen||prev.chosen||'puff';
        f.sprites.mode=f.sprites.mode||prev.mode||'visit';
      }
    }catch(e){}
    return prevPut(f,pid);
  };
}

const prevLampLoad=typeof lampLoad73==='function'?lampLoad73:null;
if(prevLampLoad){
  lampLoad73=function(pid){
    const s=prevLampLoad(pid);
    try{
      const id=pid||(typeof curPid==='function'?curPid():'');
      const kind=(s&&s._kind101)||(typeof friendsLoad101==='function'&&friendsLoad101(id).active)||'lamp';
      if(kind==='sprites'&&s){
        const rec=(typeof friendsLoad101==='function'&&friendsLoad101(id).sprites)||{};
        s.chosen=s.chosen||rec.chosen||'puff';
        s.mode=s.mode||rec.mode||'visit';
      }
    }catch(e){}
    return s;
  };
}

const prevLampPut=typeof lampPut73==='function'?lampPut73:null;
if(prevLampPut){
  lampPut73=function(s,pid){
    const id=pid||(typeof curPid==='function'?curPid():'');
    let keep=null;
    try{
      const kind=(s&&s._kind101)||(typeof friendsLoad101==='function'&&friendsLoad101(id).active)||'lamp';
      if(kind==='sprites'){
        const prev=(typeof friendsLoad101==='function'&&friendsLoad101(id).sprites)||{};
        keep={chosen:(s&&s.chosen)||prev.chosen||'puff', mode:(s&&s.mode)||prev.mode||'visit'};
        if(s){s.chosen=keep.chosen;s.mode=keep.mode}
      }
    }catch(e){}
    const r=prevLampPut(s,pid);
    if(keep&&!putting139){
      try{
        putting139=true;
        const f=friendsLoad101(id);
        f.sprites=f.sprites||{};
        f.sprites.chosen=keep.chosen;
        f.sprites.mode=keep.mode;
        if(typeof friendsPut101==='function')friendsPut101(f,id);
      }catch(e){}
      finally{putting139=false}
    }
    return r;
  };
}

css139();
window.IL139={gone:GONE139,css:css139};
})();
/* v140: Story picture styles for Night, Night (a5).
   Kids pick cave, paper, woodblock, or chalk, then a colorway.
   Cave + classic (ochre stone) is the default. Device-only preference.
   Does not wrap show(). */
(function(){
  const STYLES=['cave','paper','woodblock','chalk'];
  const STYLE_NAME={cave:'Cave art',paper:'Paper cut-out',woodblock:'Woodblock',chalk:'Chalk pastel'};
  const ALTS={
    cave:'A cave-wall painting of Night, Night: a sun, a tree, a sitting cat, a child waving to the moon, and a clay lantern.',
    paper:'A paper cut-out picture of Night, Night: a dusk-blue sky, sage hills, a sun, a tree, a sitting cat, a child waving to the moon, and a clay lantern.',
    woodblock:'A woodblock print of Night, Night: a carved sun, a pine tree, a sitting cat, a child waving to the moon, and a clay lantern.',
    chalk:'A chalk pastel picture of Night, Night: a dusk sky, a sun, a tree, a sitting cat, a child waving to the moon, and a glowing clay lantern.'
  };
  const SLICES={cave:['sun','pigment','wall'],paper:['sky','sun','hill-near'],woodblock:['paper','ink','accent'],chalk:['sky-bot','sun','tree']};
  const KEY_STYLE='ll-story-style';
  const KEY_PALS='ll-story-palettes';
  const BASE='story-styles/';
  const cache={pals:null,scene:{},swatch:{}};
  let pending=null;

  function t(s,o){return typeof gT==='function'?gT(s,o):s}
  function lang(){return typeof LANG==='string'?LANG:'en'}
  function storeGet(k){try{return (typeof LS!=='undefined'&&LS.get)?LS.get(k):localStorage.getItem(k)}catch(e){return null}}
  function storeSet(k,v){try{if(typeof LS!=='undefined'&&LS.set)LS.set(k,v);else localStorage.setItem(k,v)}catch(e){}}

  function hasRecipe(id){return id==='a5'}

  function loadStyle(){
    const v=storeGet(KEY_STYLE);
    return STYLES.includes(v)?v:'cave';
  }
  function loadPals(){
    let o={};
    try{o=JSON.parse(storeGet(KEY_PALS)||'{}')||{}}catch(e){o={}}
    if(typeof o!=='object'||!o)o={};
    return o;
  }
  function palettesOf(style){
    const st=cache.pals&&cache.pals.styles&&cache.pals.styles[style];
    return st&&st.palettes?st.palettes:{classic:{en:'Classic',es:'Clásico'}};
  }
  function loadPal(style){
    const rec=loadPals();
    const key=rec[style];
    const pals=palettesOf(style);
    return (key&&pals[key])?key:'classic';
  }
  function saveStyle(style){
    if(!STYLES.includes(style))style='cave';
    storeSet(KEY_STYLE,style);
  }
  function savePal(style, pal){
    const rec=loadPals();
    const pals=palettesOf(style);
    rec[style]=(pal&&pals[pal])?pal:'classic';
    storeSet(KEY_PALS,JSON.stringify(rec));
  }
  function palName(style, pal){
    const row=palettesOf(style)[pal]||{};
    const en=row.en||pal;
    // Sprite "Ember" is already "Brasa"; this colorway is "Ascua".
    const key=(style==='chalk'&&pal==='ember')?'Chalk ember':en;
    if(typeof DICT==='object'&&DICT&&DICT[key])return typeof gT==='function'?gT(key):DICT[key];
    if(lang()==='es'&&row.es)return row.es;
    return en;
  }
  function palColors(style, pal){
    const st=cache.pals.styles[style];
    const classic=st.tokens||{};
    const extra=(st.palettes[pal]&&st.palettes[pal].colors)||{};
    return Object.assign({},classic,extra);
  }

  function prefixIds(svg, pre){
    return String(svg)
      .replace(/\bid="([^"]+)"/g,(_,id)=>'id="'+pre+id+'"')
      .replace(/url\(#([^)]+)\)/g,(_,id)=>'url(#'+pre+id+')')
      .replace(/\bhref="#([^"]+)"/g,(_,id)=>'href="#'+pre+id+'"')
      .replace(/\bxlink:href="#([^"]+)"/g,(_,id)=>'xlink:href="#'+pre+id+'"');
  }
  function remap(svg, style, pal){
    const st=cache.pals.styles[style];
    if(!st)return svg;
    const colors=palColors(style, pal);
    const map={};
    Object.keys(st.tokens||{}).forEach(tok=>{
      const old=String(st.tokens[tok]||'').toUpperCase();
      if(old)map[old]=colors[tok]||st.tokens[tok];
    });
    return svg.replace(/#([0-9A-Fa-f]{6})/g,m=>map[m.toUpperCase()]||m);
  }
  function sliceCols(style, pal){
    const colors=palColors(style, pal);
    const keys=SLICES[style]||Object.keys(colors);
    return keys.map(k=>colors[k]).filter(Boolean).slice(0,3);
  }
  function sliceSvg(cols){
    if(!cols.length)cols=['#C4853A'];
    if(cols.length===1)return `<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="${cols[0]}"/></svg>`;
    const n=cols.length, step=360/n;
    const wedges=cols.map((c,i)=>{
      const a0=i*step-90, a1=(i+1)*step-90;
      const r0=a0*Math.PI/180, r1=a1*Math.PI/180;
      const x0=20+20*Math.cos(r0), y0=20+20*Math.sin(r0);
      const x1=20+20*Math.cos(r1), y1=20+20*Math.sin(r1);
      const large=step>180?1:0;
      return `<path d="M20 20L${x0} ${y0}A20 20 0 ${large} 1 ${x1} ${y1}Z" fill="${c}"/>`;
    }).join('');
    return `<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="${cols[0]}"/>${wedges}</svg>`;
  }

  function loadText(path){
    return fetch(path,{cache:'force-cache',credentials:'same-origin'}).then(r=>{
      if(!r.ok)throw new Error('missing '+path);
      return r.text();
    });
  }
  function ensure(){
    if(cache.pals&&STYLES.every(s=>cache.scene[s]&&cache.swatch[s]))return Promise.resolve(cache);
    if(pending)return pending;
    pending=Promise.all([
      cache.pals?Promise.resolve(null):loadText(BASE+'palettes.json').then(t=>cache.pals=JSON.parse(t)),
      ...STYLES.map(s=>cache.scene[s]?Promise.resolve(null):loadText(BASE+'night-night-'+s+'.svg').then(t=>cache.scene[s]=t)),
      ...STYLES.map(s=>cache.swatch[s]?Promise.resolve(null):loadText(BASE+'swatch-'+s+'.svg').then(t=>cache.swatch[s]=t))
    ]).then(()=>{pending=null;return cache}).catch(e=>{pending=null;throw e});
    return pending;
  }
  ensure().catch(()=>{});

  function innerSvg(raw){
    return String(raw).replace(/^\s*<svg[^>]*>/i,'').replace(/<\/svg>\s*$/i,'');
  }
  function sceneHtml(style, pal){
    let svg=remap(cache.scene[style], style, pal);
    svg=prefixIds(svg, 's140-'+style+'-');
    svg=svg.replace(/\saria-label="[^"]*"/,'');
    // keep role=img on the wrapper, not a nested label
    return svg;
  }
  function swatchHtml(style){
    let svg=prefixIds(cache.swatch[style], 'sw140-'+style+'-');
    svg=svg.replace(/\saria-label="[^"]*"/,'').replace(/\srole="img"/,'');
    return svg;
  }

  function paintBox(box){
    if(!box||!cache.pals)return;
    const style=loadStyle();
    const pal=loadPal(style);
    const alt=t(ALTS[style]||ALTS.cave);
    const scene=sceneHtml(style, pal);
    const styles=STYLES.map(s=>{
      const on=s===style;
      return `<div class="storyPic140-sw"><button type="button" class="storyPic140-style" data-style140="${s}" aria-pressed="${on?'true':'false'}" aria-label="${t(STYLE_NAME[s])}">${swatchHtml(s)}</button><span class="storyPic140-cap">${t(STYLE_NAME[s])}</span></div>`;
    }).join('');
    const pals=palettesOf(style);
    const palKeys=Object.keys(pals);
    const colors=palKeys.map(k=>{
      const on=k===pal;
      return `<div class="storyPic140-sw"><button type="button" class="storyPic140-pal" data-pal140="${k}" aria-pressed="${on?'true':'false'}" aria-label="${palName(style,k)}">${sliceSvg(sliceCols(style,k))}</button><span class="storyPic140-cap">${palName(style,k)}</span></div>`;
    }).join('');
    box.innerHTML=`<div class="storyPic140-art" role="img" aria-label="${alt.replace(/"/g,'&quot;')}">${scene}</div>
<div class="storyPic140-pick noprint" role="group" aria-label="${t('Pick a picture style')}">
<p class="storyPic140-title">${t('Pick a picture style')}</p>
<div class="storyPic140-styles">${styles}</div>
<div class="storyPic140-colors">${colors}</div>
</div>`;
    box.dataset.currentStyle140=style;
    box.dataset.currentPal140=pal;
    box.querySelectorAll('[data-style140]').forEach(b=>{
      b.addEventListener('click',()=>pickStyle(b.getAttribute('data-style140')));
    });
    box.querySelectorAll('[data-pal140]').forEach(b=>{
      b.addEventListener('click',()=>pickPal(b.getAttribute('data-pal140')));
    });
  }

  function findAnchor(root){
    return root&&root.querySelector('#st, #sst, .ptext, p.story');
  }
  function sectionRoot(hint){
    if(hint&&findAnchor(hint))return hint;
    const vis=['solo','session','print'].map(s=>$(s)).filter(el=>el&&!el.classList.contains('hidden')&&findAnchor(el));
    if(vis[0])return vis[0];
    return ['solo','session','print'].map(s=>$(s)).find(el=>el&&findAnchor(el))||null;
  }
  function mount(id, hint){
    if(!hasRecipe(id))return;
    const root=sectionRoot(hint);
    if(!root)return;
    const anchor=findAnchor(root);
    if(!anchor)return;
    let box=root.querySelector('.storyPic140');
    if(!box){
      box=document.createElement('figure');
      box.className='storyPic140';
      anchor.parentNode.insertBefore(box, anchor);
    }
    ensure().then(()=>paintBox(box)).catch(()=>{});
  }
  function refresh(){
    document.querySelectorAll('.storyPic140').forEach(box=>paintBox(box));
  }
  function pickStyle(style){
    if(!STYLES.includes(style))style='cave';
    saveStyle(style);
    if(!loadPals()[style])savePal(style, 'classic');
    refresh();
  }
  function pickPal(pal){
    const style=loadStyle();
    savePal(style, pal);
    refresh();
  }

  if(!document.getElementById('v140css')){
    const css=document.createElement('style');
    css.id='v140css';
    css.textContent=`
.storyPic140{margin:.4rem 0 1rem;padding:0}
.storyPic140-art svg{width:100%;height:auto;display:block;max-width:28rem;margin:0 auto}
.storyPic140-pick{margin:.7rem 0 0;padding:.7rem .6rem .8rem;border-radius:14px;background:#F6EFE0;color:#2F2A24}
body.bedtime .storyPic140-pick,html[data-look-theme="dark"] .storyPic140-pick{background:#1C1624;color:#E8E4DA}
.storyPic140-title{margin:0 0 .5rem;text-align:center;font-size:.95rem}
.storyPic140-styles,.storyPic140-colors{display:flex;flex-wrap:wrap;gap:.55rem;justify-content:center;align-items:flex-start}
.storyPic140-colors{margin-top:.55rem}
.storyPic140-sw{display:flex;flex-direction:column;align-items:center;gap:.2rem;max-width:4.6rem}
.storyPic140-style{width:64px;height:64px;min-width:64px;min-height:64px;padding:0;border-radius:50%;overflow:hidden;border:3px solid transparent;background:transparent;line-height:0}
.storyPic140-style svg{width:100%;height:100%;display:block}
.storyPic140-pal{width:44px;height:44px;min-width:44px;min-height:44px;padding:0;border-radius:50%;overflow:hidden;border:3px solid transparent;background:transparent;line-height:0}
.storyPic140-pal svg{width:100%;height:100%;display:block}
.storyPic140-style[aria-pressed="true"],.storyPic140-pal[aria-pressed="true"]{border-color:#E6B454;box-shadow:0 0 0 2px #E6B454}
.storyPic140-cap{font-size:.72rem;line-height:1.2;text-align:center}
@media (prefers-reduced-motion:reduce){.storyPic140,.storyPic140 *{transition:none!important;animation:none!important}}
@media print{.storyPic140-pick{display:none}}
`;
    document.head.appendChild(css);
  }

  function wrap(name, rootOf){
    const fn=typeof window[name]==='function'?window[name]:null;
    if(!fn||fn._v140)return;
    const wrapped=function(id){
      const r=fn.apply(this,arguments);
      try{mount(id, rootOf?rootOf(id,arguments[1]):null)}catch(e){}
      return r;
    };
    wrapped._v140=1;
    window[name]=wrapped;
    try{if(name==='soloStart')soloStart=wrapped; if(name==='start')start=wrapped; if(name==='printPage')printPage=wrapped}catch(e){}
  }
  wrap('soloStart',()=>$('solo'));
  wrap('start',()=>$('session'));
  wrap('printPage',()=>$('print'));
  if(typeof dailyOpen64==='function'&&!dailyOpen64._v140){
    const open=dailyOpen64;
    dailyOpen64=function(id,mode){
      const r=open.apply(this,arguments);
      const root=$(mode==='solo'?'solo':mode==='print'?'print':'session');
      try{mount(id, root)}catch(e){}
      return r;
    };
    dailyOpen64._v140=1;
  }

  window.IL140={
    mount,refresh,pickStyle,pickPal,loadStyle,loadPal,hasRecipe,ensure,STYLES,
    keys:{style:KEY_STYLE,pals:KEY_PALS}
  };
})();
/* v141: growth-v3 faces for remaining companions, bigger lamp face without il-er,
   and three equal Sprite picture tiles. */
(function(){
const LID={
 owl:'#E0C8A0',moth:'#E2C488',phoenix:'#E0A858',lamp:'#6E8E6A',
 fox:'#4A6A58','lion-cub':'#4A6A58','sun-tiger':'#4A6A58',
 glowcap:'#E2C488',firefly:'#E2C488','moss-hedgehog':'#E0C8A0',deer:'#4A6A58'
};
const CRESCENT={
 owl:['#5E4430',0],moth:['#5E4430',0],phoenix:['#6A3A20',0],lamp:['#14302A',1],
 fox:['#123028',1],'lion-cub':['#123028',1],'sun-tiger':['#123028',1],
 glowcap:['#5E4430',0],firefly:['#5E4430',0],'moss-hedgehog':['#5E4430',0],deer:['#123028',1]
};
const HALO={
 owl:[100,110,48],moth:[100,96,28],phoenix:[100,72,36],lamp:[100,124,42],
 fox:[64,100,30],'lion-cub':[70,100,34],'sun-tiger':[100,80,42],
 glowcap:[105,118,36],firefly:[100,96,28],'moss-hedgehog':[80,126,32],deer:[70,82,30]
};
const EXFACE={
 fox:[56,100,74,98.5,3.3,2.85,1.38,1],
 'lion-cub':[60,99,82,97,4.2,3.6,1.15,1],
 'sun-tiger':[88,80,114,79,4.0,3.6,1.15,1],
 glowcap:[96,122,114,122,3.3,3.3,1.12,1],
 firefly:[94.5,95,105.5,95,3.0,3.0,1.12,1],
 'moss-hedgehog':[72,126,90,125,3.4,2.9,1.12,1],
 deer:[64,80,81,79,3.2,2.75,1.38,1]
};
const SLUG={suntiger:'sun-tiger',lioncub:'lion-cub',fox:'fox',firefly:'firefly',mosshedgehog:'moss-hedgehog',glowcap:'glowcap',deer:'deer'};
const SMILE_CURVES=[
 'c3.4 4.1 8.6 4.1 12 0','c3.6 4.4 9.4 4.4 13 0','c5.6 6.8 14.4 6.8 20 0',
 'c5 6.1 13 6.1 18 0','c3.9 4.8 10.1 4.8 14 0'
];
const LION_BROWS=[
 '<path d="M55 96c4-2.2 8-2.2 10.5 0" fill="none" stroke="#72583F" stroke-width="1.1" stroke-linecap="round"/>',
 '<path d="M78 94c3-1.5 6-1.5 8 0" fill="none" stroke="#72583F" stroke-width=".95" stroke-linecap="round"/>'
];
const SPOTS={hatchling:3,young:5,grown:8,wise:8};
const BABIES_N={hatchling:0,young:1,grown:2,wise:3};
const BABY_SLOTS=[[50,154,.9],[154,156,.8],[78,162,.7]];
const STAR_FIELD={f:[106,85.5],m:[105,83]};
let n141=0;
function F(n,p){if(typeof IL==='object'&&typeof IL.f==='function')return IL.f(n);p=p==null?1:p;const s=Number(n).toFixed(p).replace(/\.?0+$/,'');return s==='-0'?'0':s}
function phase141(stage){
 if(typeof IL119==='object'&&typeof IL119.phase==='function')return IL119.phase(stage);
 const s=Number(stage);
 return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}
function uid141(html){
 const m=String(html||'').match(/url\(#([A-Za-z0-9_]+)H\)/)||String(html||'').match(/id=["']([A-Za-z0-9_]+)L["']/);
 return (m&&m[1])||('f141'+(++n141));
}
function freshUid(){return 'f141'+(++n141)}
function mouthAt(a,b,c,d,r,s){return [(a+c)/2,Math.max(b,d)+Math.max(r,s)*1.2,Math.max(r,s)*2.15]}
function face141(who,lx,ly,rx,ry,r,r2,stage,uid,opt){
 opt=opt||{};
 if(typeof IL!=='object'||typeof IL.g!=='function')return '';
 const lid=LID[who]||'#E2C488',ink=opt.mc||'#72583F';
 const k=opt.k==null?1.2:opt.k,sw=opt.sw==null?1.3:opt.sw,gap=opt.gap==null?2.4:opt.gap;
 const cr=CRESCENT[who]||['#5E4430',0];
 const smile=opt.smile!==false;
 const raw=IL.g(uid,stage,lx,ly,rx,ry,r,r2,lid,ink,opt.M||mouthAt,k,sw,cr[1]?1:0,gap,cr[0]);
 if(smile)return raw;
 // Beak / no-mouth species: drop the trailing mouth path IL.g always appends.
 return raw.replace(/<path d="[^"]+" fill="none" stroke="[^"]+" stroke-width="[^"]+" stroke-linecap="round" stroke-linejoin="round"\/>\s*$/,'');
}
function halo141(who,stage,uid){
 if(stage!=='wise'||typeof IL!=='object'||typeof IL.ha!=='function')return '';
 const h=HALO[who];if(!h)return '';
 return IL.ha(uid+'h',h[0],h[1],h[2]);
}

function dropSmiles(html){
 for(const c of SMILE_CURVES){
  const esc=c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp('<path d=["\']M[0-9.]+ [0-9.]+'+esc+'["\'] fill=["\']none["\'] stroke=["\']#72583F["\'] stroke-width=["\'][^"\']+["\'] stroke-linecap=["\']round["\']/>','g');
  html=html.replace(re,'');
 }
 return html;
}
function dropPupilsAndCatch(html){
 html=html.replace(/<circle cx=["'][0-9.]+["'] cy=["'][0-9.]+["'] r=["'][0-9.]+["'] fill=["']#72583F["']\/>/g,'');
 html=html.replace(/<circle cx=["'][0-9.]+["'] cy=["'][0-9.]+["'] r=["'][0-9.]+["'] fill=["']#FFF6D8["']\/>/g,'');
 return html;
}
function polishExtra(slug,html){
 html=dropPupilsAndCatch(html);
 html=dropSmiles(html);
 for(const b of LION_BROWS)html=html.split(b).join('');
 for(const b of LION_BROWS)html=html.split(b.replace(/"/g,"'")).join('');
 if(slug==='glowcap'){
  html=html.replace(/<ellipse cx=["']82["'] cy=["'](?:120|132)["'] rx=["']7["'] ry=["']5["'] fill=["']#E8C894["'] stroke-width=["']1\.3["']\/>/g,'');
  html=html.replace(/<ellipse cx=["']128["'] cy=["'](?:120|132)["'] rx=["']7["'] ry=["']5["'] fill=["']#E8C894["'] stroke-width=["']1\.3["']\/>/g,'');
  // Old baked baby caps (sticker faces, not stage-aware).
  html=html.replace(/<g transform=["']translate\([^"']+\) scale\([^"']+\)["']><path d=["']M-6 4c0 8[\s\S]*?<\/g>/g,'');
 }
 if(slug==='fox'){
  const ears=[
   ['d="M48 96c-2-24 14-28 18-8Z"','d="M48 96c-4-36 16-40 20-8Z"'],
   ['d="M74 94c5-24 20-18 13 2Z"','d="M74 94c6-36 22-32 16 4Z"'],
   ['d="M46 94c-2-24 14-28 18-8Z"','d="M46 94c-4-36 16-40 20-8Z"'],
   ['d="M72 92c5-24 20-18 13 2Z"','d="M72 92c6-36 22-32 16 4Z"']
  ];
  for(const [a,b] of ears){html=html.split(a).join(b);html=html.split(a.replace(/"/g,"'")).join(b.replace(/"/g,"'"));}
 }
 if(slug==='sun-tiger'){
  html=html.replace(/cx="100" cy="98" rx="22" ry="15.5" fill="#F4E4C4" stroke-width="1.15"/,'cx="100" cy="100" rx="14" ry="10" fill="#F4E4C4" stroke-width="1.1"');
  html=html.replace(/cx="100" cy="96" rx="4.2" ry="3" fill="#72583F"/,'cx="100" cy="99" rx="2.6" ry="1.9" fill="#72583F"');
  html=html.replace(/cx='100' cy='98' rx='22' ry='15.5' fill='#F4E4C4' stroke-width='1.15'/,"cx='100' cy='100' rx='14' ry='10' fill='#F4E4C4' stroke-width='1.1'");
  html=html.replace(/cx='100' cy='96' rx='4.2' ry='3' fill='#72583F'/,"cx='100' cy='99' rx='2.6' ry='1.9' fill='#72583F'");
 }
 if(slug==='lion-cub'){
  html=html.replace(/cx="70" cy="100" rx="25" ry="23"/,'cx="70" cy="100" rx="28" ry="26"');
  html=html.replace(/cx='70' cy='100' rx='25' ry='23'/,"cx='70' cy='100' rx='28' ry='26'");
 }
 return html;
}

function sunflowerPts(n,c){
 const g=137.50776*Math.PI/180,pts=[];
 for(let i=0;i<n;i++){const a=i*g,r=c*Math.sqrt(i);pts.push([r*Math.cos(a),r*Math.sin(a)])}
 return pts;
}
function star4(cx,cy,r,delay){
 const pts=[];
 for(let i=0;i<8;i++){
  const a=(-90+i*45)*Math.PI/180,rad=i%2===0?r:r*.38;
  pts.push(F(cx+rad*Math.cos(a))+' '+F(cy+rad*Math.sin(a)));
 }
 const d=delay?` style="animation-delay:-${F(delay,2)}s"`:'';
 return `<polygon class="il-spot" points="${pts.join(' ')}" fill="#E6B454" stroke="#E6B454" stroke-width="1.1"${d}/>`;
}
function glowcapStars(n,sex){
 const [cx,cy]=STAR_FIELD[sex]||STAR_FIELD.f,c=15,aspect=.31,out=[];
 const pts=sunflowerPts(n,c),period=7;
 for(let i=0;i<pts.length;i++)out.push(star4(cx+pts[i][0],cy+pts[i][1]*aspect,3.6,i*period/Math.max(n,1)));
 return out.join('');
}
function babyGlowcap(x,y,sc,uid,i){
 const face=face141('glowcap',-3,3.2,6,3.2,1.5,1.5,'hatchling',uid+'b'+i,{sw:.95,k:1.12,gap:1.2,smile:true});
 return `<g class="il-baby" transform="translate(${F(x)} ${F(y)}) scale(${F(sc,2)})"><path d="M-8 0c1 3 1 6 2 7c6 3 12 3 18 0c1-1 1-4 2-7Z" fill="#E8C894" stroke="#72583F" stroke-width="1.8" stroke-linejoin="round"/><path d="M-14 0c1-9 6-14 14-14c8 0 13 5 14 14c-6-3-16-3-28 0Z" fill="url(#${uid}L)" stroke="#72583F" stroke-width="2" stroke-linejoin="round"/>${face}</g>`;
}
function glowcapFoot(html,stage,uid){
 const n=BABIES_N[stage]||0;
 const sex=/M50 108c2-26/.test(html)?'f':'m';
 const cap=sex==='f'?'M50 108c2-26 22-40 56-40c34 0 54 14 56 40c-18-10-72-10-112 0Z':'M62 104c2-28 18-44 43-44c25 0 42 16 44 44c-14-8-54-8-87 0Z';
 const stars=`<clipPath id="${uid}cap"><path d="${cap}"/></clipPath><g clip-path="url(#${uid}cap)">${glowcapStars(SPOTS[stage]||8,sex)}</g>`;
 const babies=BABY_SLOTS.slice(0,n).map((s,i)=>babyGlowcap(s[0],s[1],s[2],uid,i)).join('');
 return {stars,babies};
}

function insertInScale(html,chunk,front){
 if(!chunk)return html;
 const inner=/<g transform="translate\(100 172\) scale\([^"]+\) translate\(-100 -172\)">/;
 if(inner.test(html)){
  if(front)return html.replace(inner,m=>m+chunk);
  return html.replace(/(<g transform="translate\(100 172\) scale\([^"]+\) translate\(-100 -172\)">)([\s\S]*)(<\/g>)(\s*<\/g>\s*)$/,function(_,a,b,c,d){return a+b+chunk+c+d});
 }
 // No body scale: place before the closing of the outer scale(.5) group.
 if(front){
  return html.replace(/(transform="scale\(\.5\)"[^>]*>)(<defs>[\s\S]*?<\/defs>)?/,function(m,a,defs){return a+(defs||'')+chunk});
 }
 return html.replace(/<\/g>\s*$/,chunk+'</g>');
}
function stripIlEr(html){return html.replace(/<circle class="il-fine il-er"[^>]*\/>/g,'')}
function stripBlush(html){return html.replace(/<ellipse cx="[^"]+" cy="[^"]+" rx="[^"]+" ry="[^"]+" fill="#C47A6A" opacity="[^"]+"\/>/g,'')}
function stripLampTiny(html){
 html=stripIlEr(html);
 html=stripBlush(html);
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.1" stroke-linecap="round"\/>/g,'');
 // Tiny pupils (r about 1.9–2.3) and their catchlights left by tinyFace120.
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#72583F"\/>/g,function(m,r){return (+r>=1.5&&+r<=2.6)?'':m});
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#FFF6D8"\/>/g,function(m,r){return (+r>=0.5&&+r<=1.1)?'':m});
 return html;
}
function lampFace(html,stage){
 const ph=phase141(stage);
 const s=ph==='young'?1.1:1.05,cy=ph==='hatchling'?142:ph==='young'?154:152;
 const r=3.4*s,span=7.2*s,uid=freshUid();
 html=stripLampTiny(html);
 const face=face141('lamp',100-span,cy,100+span,cy,r,r,ph,uid,{sw:1.2,k:1.5,gap:2,smile:true});
 const halo=halo141('lamp',ph,uid);
 html=insertInScale(html,face,false);
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function stripIlFace(html){
 html=stripBlush(html);
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.3[0-9]*" stroke-linecap="round"\/>/g,'');
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.35" stroke-linecap="round"\/>/g,'');
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.2" stroke-linecap="round"\/>/g,'');
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#72583F"\/>/g,function(m,r){return (+r>=2&&+r<=8)?'':m});
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#FFF6D8"\/>/g,function(m,r){return (+r>=0.6&&+r<=2.8)?'':m});
 return html;
}
function owlFace(html,stage){
 const ph=phase141(stage);
 const eyes={hatchling:[[87,126,5.8],[113,126,5.8]],young:[[84,107,6.5],[116,107,6.5]],grown:[[80,96,7.3],[120,96,7.3]],wise:[[80,96,7.3],[120,96,7.3]]}[ph];
 const uid=freshUid();
 html=stripIlFace(html);
 const e1=eyes[0],e2=eyes[1];
 const face=face141('owl',e1[0],e1[1],e2[0],e2[1],e1[2],e2[2],ph,uid,{sw:1.35,k:1.05,smile:false});
 let extra=face;
 if(ph==='hatchling'&&!/L[0-9.]+ [0-9.]+L[0-9.]+ [0-9.]+Z" fill="#E6B454"/.test(html)){
  const mid=(e1[0]+e2[0])/2,by= (e1[1]+e2[1])/2+e1[2]+2.2,bw=3.6,bh=4.6;
  extra+=`<path d="M${F(mid-bw)} ${F(by-2)}L${F(mid)} ${F(by+bh)}L${F(mid+bw)} ${F(by-2)}Z" fill="#E6B454" stroke="#72583F" stroke-width="1" stroke-linejoin="round"/>`;
 }
 const halo=halo141('owl',ph,uid);
 html=insertInScale(html,extra,false);
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function mothFace(html,stage){
 const ph=phase141(stage);
 const eyes=ph==='hatchling'?[62.8,134.5,73.6,134.5,3.6,3.6]:ph==='young'?[78.4,131,93.6,131,4.2,4.2]:[95.2,96,104.8,96,3.2,3.2];
 const uid=freshUid();
 html=stripIlFace(html);
 const face=face141('moth',eyes[0],eyes[1],eyes[2],eyes[3],eyes[4],eyes[5],ph,uid,{sw:ph==='hatchling'?1.3:1.2,k:ph==='hatchling'||ph==='young'?1.12:1.15,gap:1.6,smile:false});
 // Young face lives inside the rotated cocoon group — insert before that group's close if present.
 if(ph==='young'&&/rotate\(-16 100 128\)/.test(html)){
  html=html.replace(/(transform="rotate\(-16 100 128\)">)([\s\S]*?)(<\/g>)/,function(_,a,b,c){return a+b+face+c});
 }else{
  html=insertInScale(html,face,false);
 }
 const halo=halo141('moth',ph,uid);
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function extraFace(html,kind,stage){
 const parts=kind.split('_'),sp=parts[0],slug=SLUG[sp];
 if(!slug||!EXFACE[slug])return html;
 const ph=phase141(stage);
 const uid=uid141(html);
 html=polishExtra(slug,html);
 if(slug==='glowcap'){
  html=html.replace(/translate\(100 172\) scale\([^)]+\) translate\(-100 -172\)/,'translate(100 172) scale(1) translate(-100 -172)');
  const foot=glowcapFoot(html,ph,uid);
  const clip=(foot.stars.match(/<clipPath[\s\S]*?<\/clipPath>/)||[''])[0];
  const starG=(foot.stars.match(/<g clip-path[\s\S]*?<\/g>/)||[''])[0];
  if(clip){
   if(/<defs>/.test(html))html=html.replace(/<defs>/,'<defs>'+clip);
   else html=html.replace(/(transform="scale\(\.5\)"[^>]*>)/,'$1<defs>'+clip+'</defs>');
  }
  html=insertInScale(html,starG+foot.babies,false);
 }
 const f=EXFACE[slug];
 const face=face141(slug,f[0],f[1],f[2],f[3],f[4],f[5],ph,freshUid(),{sw:1.25,k:f[6],smile:!!f[7]});
 html=insertInScale(html,face,false);
 const halo=halo141(slug,ph,freshUid());
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function paint141(kind,html,stage){
 if(!html)return html;
 if(kind==='turtle'||kind==='shell'||kind==='dragon'||kind==='sprites')return html;
 if(kind==='lamp')return lampFace(html,stage);
 if(kind==='owl')return owlFace(html,stage);
 if(kind==='moth')return mothFace(html,stage);
 if(/^(suntiger|lioncub|fox|firefly|mosshedgehog|glowcap|deer)_/.test(kind))return extraFace(html,kind,stage);
 return html;
}

/* ---- three Sprite picture tiles ---- */
function css141(){
 if(typeof document==='undefined'||document.getElementById('v141css'))return;
 const s=document.createElement('style');s.id='v141css';
 s.textContent=
  '.spriteRow141{width:100%;margin:12px 0 0;box-sizing:border-box}'+
  '.spriteTiles141{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%}'+
  '.spriteTiles141 button{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;width:100%;min-height:56px;padding:8px;border-radius:16px;border:2px solid var(--soft,#d7cbb8);background:var(--card,#fffaf0);color:inherit;font:inherit;font-weight:700;box-sizing:border-box;text-align:center}'+
  '.spriteTiles141 button.on{border-color:var(--acc,#c9a45e);box-shadow:0 0 0 3px #e6b45444}'+
  '.spriteTiles141 .lamp73-svg,.spriteTiles141 svg{width:88px;height:88px;max-width:100%;flex:none}'+
  '.spriteTiles141 .kline{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;text-overflow:ellipsis;line-height:1.2;max-height:2.4em;width:100%;font-size:.92em;text-align:center}';
 (document.documentElement||document.head).appendChild(s);
}
function spriteTileSvg(name,stage){
 const inner=(typeof IL137==='object'&&typeof IL137.sprite==='function')?IL137.sprite(name,stage):'';
 return `<svg class="lamp73-svg" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="lamp73-ink">${inner}</g></svg>`;
}
function spriteRowHTML(pid){
 const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
 const ch=(typeof IL137==='object'&&typeof IL137.chosen==='function')?IL137.chosen(pid):(function(){
  const st=typeof friendState101==='function'?friendState101('sprites',pid):null;
  const c=st&&st.chosen;return (c==='dew'||c==='ember'||c==='puff')?c:'puff';
 })();
 const st=typeof friendState101==='function'?friendState101('sprites',pid):{stage:1};
 const view=typeof lampViewStage74==='function'?lampViewStage74(st):st.stage||1;
 const f=typeof friendsLoad101==='function'?friendsLoad101(pid):{};
 const tiles=[['puff','Puff'],['dew','Dew'],['ember','Ember']].map(([k,en])=>{
  const on=ch===k;
  const nm=e(t(en));
  return `<button type="button" class="${on?'on':''}" data-sprite137="${k}" aria-pressed="${on?'true':'false'}" aria-label="${nm}">${spriteTileSvg(k,view)}<span class="kline">${nm}</span></button>`;
 }).join('');
 const visit=e(t('The other two visit as this one grows.'));
 return `<div class="spriteRow141" data-sprite-row141="1"><div class="spriteTiles141">${tiles}</div><p class="soft">${visit}</p></div>`;
}

function hook141(){
 css141();
 if(typeof IL119==='object'&&typeof IL119.art==='function'){
  const prev=IL119.art;
  IL119.art=function(kind,stage,opt){return paint141(kind,prev(kind,stage,opt),stage)};
 }
 if(typeof friendArtInner101==='function'){
  const prev=friendArtInner101;
  friendArtInner101=function(id,stage){return paint141(id,prev(id,stage),stage)};
 }
 if(typeof friendsLoad101==='function'&&typeof friendsPut101==='function'){
  // Keep v139 Dew/Ember persistence; only the chooser UI changes.
 }
 const prevHTML=typeof friendPickerHTML101==='function'?friendPickerHTML101:null;
 if(prevHTML){
  friendPickerHTML101=function(pid){
   css141();
   let html=prevHTML(pid);
   html=html.replace(/<button[^>]*data-friend="sprites"[^>]*>[\s\S]*?<\/button>/,'');
   html=html.replace(/<div class="spritePick137"[^>]*>[\s\S]*?<\/div>(?=<\/div>)/,'');
   html=html.replace(/<\/div>\s*$/,spriteRowHTML(pid)+'</div>');
   return html;
  };
 }
 const prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
 if(prevAttach){
  friendPickerAttach101=function(){
   prevAttach.apply(this,arguments);
   const host=document.querySelector('[data-sprite-row141]');
   if(!host||host._il141)return;
   host._il141=1;
   host.addEventListener('click',function(ev){
    const b=ev.target.closest('[data-sprite137]');
    if(!b)return;
    ev.preventDefault();
    const k=b.getAttribute('data-sprite137');
    const pid=typeof curPid==='function'?curPid():'';
    const f=friendsLoad101(pid);
    f.sprites=f.sprites||(typeof friendNorm101==='function'?friendNorm101(null):{});
    f.sprites.chosen=k;
    f.sprites.mode=f.sprites.mode||'visit';
    f.active='sprites';
    friendsPut101(f,pid);
    const card=document.querySelector('[data-friends101]');
    if(card){card.outerHTML=friendPickerHTML101(pid);friendPickerAttach101();}
    if(typeof lampMountAll73==='function')lampMountAll73();
    if(typeof friendLine101==='function')friendLine101();
   });
  };
 }
}

hook141();
window.IL141={
 paint:paint141,face:face141,phase:phase141,slug:SLUG
};
})();
/* v143: one master sound bus + limiter. Singing Brush, Lamp Breathing, toy
   sounds and UI blips already talk to the shared AudioContext destination;
   this tightens that destination so stacked sources stay ≥ 6 dB under full
   scale (the Bedtime Glow ceiling). Soft sounds Off still only mutes toys
   and chimes, never story or game voices. show() is not wrapped. */
(function(root){
'use strict';
var CEIL=-6; /* dBFS: 6 dB under full scale, the promised true-peak cap */
var PEAK=Math.pow(10,CEIL/20);
/* Hard-clip 1.2 dB under the cap so 2× oversample + reconstruction stays ≤ −6 dBTP.
   A clip at exactly PEAK still produced −5.1 dBTP on a five-tone stack. */
var CLIP=Math.pow(10,(CEIL-1.2)/20);
var prevBus=typeof busInstall==='function'?busInstall:null;

function isOffline(c){
  try{
    if(typeof OfflineAudioContext!=='undefined'&&c instanceof OfflineAudioContext)return true;
    if(typeof webkitOfflineAudioContext!=='undefined'&&c instanceof webkitOfflineAudioContext)return true;
  }catch(e){}
  return false;
}

function ceiling(c){
  var sh=c.createWaveShaper(),n=2048,curve=new Float32Array(n);
  for(var i=0;i<n;i++){
    var x=i/(n-1)*2-1,ax=Math.abs(x),s=x<0?-1:1,y;
    if(ax<=CLIP){
      y=x; /* already under the cap — do not change loudness */
    }else{
      /* fold overshoot into ±CLIP (true-peak headroom below PEAK) */
      y=s*CLIP;
    }
    curve[i]=y;
  }
  sh.curve=curve;
  try{sh.oversample='2x'}catch(e){}
  return sh;
}

function attachCeil(c,lim,real){
  var sh=ceiling(c);
  try{lim.disconnect()}catch(e){}
  lim.connect(sh).connect(real);
  return sh;
}

function install(c){
  if(!c||isOffline(c))return c;
  if(c._bus143&&c._bus143.ceil)return c;
  try{if(prevBus)prevBus(c)}catch(e){}
  if(c._bus&&c._bus.lim&&c._bus.real){
    /* Keep the v19/v141 limiter at −1 dB. A −6 dB compressor threshold
       applies makeup gain and would make single sources several LU louder.
       The waveshaper below is the −6 dB ceiling. */
    if(!c._bus.ceil){
      try{c._bus.ceil=attachCeil(c,c._bus.lim,c._bus.real)}catch(e){}
    }
    c._bus143=c._bus;
    return c;
  }
  try{
    var real=c.destination,g=c.createGain(),cp=c.createDynamicsCompressor(),lim=c.createDynamicsCompressor();
    g.gain.value=.8;
    cp.threshold.value=-18;cp.ratio.value=3;cp.knee.value=6;cp.attack.value=.01;cp.release.value=.2;
    lim.threshold.value=-1;lim.ratio.value=20;lim.knee.value=0;lim.attack.value=.002;lim.release.value=.08;
    var sh=ceiling(c);
    g.connect(cp).connect(lim).connect(sh).connect(real);
    Object.defineProperty(c,'destination',{value:g,configurable:true});
    c._bus={g:g,cp:cp,lim:lim,ceil:sh,real:real};
    c._bus143=c._bus;
  }catch(e){}
  return c;
}

root.busInstall=install;
if(typeof AC!=='undefined'&&AC)install(AC);
var prevAc=typeof ac==='function'?ac:null;
root.ac=function(){
  var c=prevAc?prevAc():null;
  if(!c){
    try{
      var C=root.AudioContext||root.webkitAudioContext;
      if(!C)return null;
      c=new C();
      root.AC=c;
    }catch(e){return null}
  }
  if(c&&c.state==='suspended')try{c.resume()}catch(e){}
  return install(c);
};

/* Catch fallbacks that construct their own context (Singing Brush, Lamp Breathing). */
var Native=root.AudioContext||root.webkitAudioContext;
if(Native&&!Native._v143){
  function AudioContext143(opts){
    var c=opts!==undefined?new Native(opts):new Native();
    return install(c);
  }
  AudioContext143.prototype=Native.prototype;
  try{Object.setPrototypeOf(AudioContext143,Native)}catch(e){}
  AudioContext143._v143=Native;
  root.AudioContext=AudioContext143;
  if(root.webkitAudioContext)root.webkitAudioContext=AudioContext143;
}

root.IL143={version:143,ceilingDb:CEIL,install:install};
})(window);
/* v145: trust surfaces — Seed-tree lantern icon/splash, an “All files
   saved, works offline” check in Grown-ups, a merged Keep the Seed
   forever + Where the art comes from card, and the Share a Seed
   printable (joins v133). Also folds the v143 ceiling fix: the
   waveshaper is unity-gain under the cap and only clips overshoot, and
   the compressor limiter stays at −1 dB so single sources stay within
   0.5 LU of v141 while a stacked-tone true peak stays ≤ −6 dBTP.
   show() is not wrapped. The Dragon is unchanged. */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('v145css')){
  var s=document.createElement('style');
  s.id='v145css';
  s.textContent=[
    '#offcheck145{margin:.6em 0 0;padding:.7em .9em;border-radius:14px;background:rgba(91,122,106,.12)}',
    '#offcheck145.ok145{background:rgba(91,122,106,.18)}',
    '#adults [data-seed145] p{line-height:1.45}',
    '#adults [data-seed145] .seed145-art{float:right;width:64px;height:64px;margin:0 0 .4rem .6rem}',
    '#adults [data-seed145] a[href]{display:inline-flex;align-items:center;min-height:44px;min-width:44px;padding:8px 4px}'
  ].join('\n');
  (document.documentElement||document.head).appendChild(s);
}

function t145(s,v){return typeof gT==='function'?gT(s,v):s}
function e145(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])})}
function num145(n){return typeof gNum==='function'?gNum(n):String(n)}

function norm145(f){
  var s=String(f==null?'':f).replace(/^\.\//,'');
  return s.replace(/^\/+/,'');
}
function key145(url){
  try{
    var u=new URL(url, location.href);
    var p=u.pathname||'';
    if(p==='/'||p==='') return '';
    p=p.replace(/^\/+/,'');
    try{p=decodeURIComponent(p)}catch(e){}
    return p;
  }catch(e){return String(url||'')}
}
function has145(set, f){
  var s=norm145(f);
  if(s==='' ){
    return set.has('')||set.has('index.html')||set.has('./')||set.has('/');
  }
  return set.has(s)||set.has(s+'/')||set.has('./'+s);
}

async function count145(){
  if(!('caches' in window)||typeof offList!=='function') return {ok:false,have:0,need:0,err:true};
  var L;
  try{L=await offList()}catch(e){return {ok:false,have:0,need:0,err:true}}
  var files=L&&L.files||[];
  var need=files.length;
  var have=0;
  try{
    var c=await caches.open('lamplight-extra');
    var keys=await c.keys();
    var set=new Set();
    for(var i=0;i<keys.length;i++) set.add(key145(keys[i].url));
    for(var j=0;j<files.length;j++){
      var item=files[j];
      var f=Array.isArray(item)?item[0]:item;
      if(has145(set,f)) have++;
    }
  }catch(e){return {ok:false,have:0,need:need,err:true}}
  return {ok:need>0&&have===need,have:have,need:need,err:false};
}

function line145(st){
  if(!st||st.err){
    return t145('The app already opens offline after a first visit. Tap Save everything for every voice, song and language.');
  }
  if(st.ok){
    return t145('All {n} files saved, works offline.',{n:num145(st.need)});
  }
  if(st.have>0){
    return t145('{have} of {need} files saved. Tap Save everything so it works in the car or on a plane.',{have:num145(st.have),need:num145(st.need)});
  }
  return t145('The app already opens offline after a first visit. Tap Save everything for every voice, song and language.');
}

function paintCheck145(){
  var el=typeof $==='function'?$('offcard'):document.getElementById('offcard');
  if(!el)return;
  var box=document.getElementById('offcheck145');
  if(!box){
    box=document.createElement('p');
    box.id='offcheck145';
    box.setAttribute('role','status');
    var h=el.querySelector('h2');
    if(h&&h.nextSibling) el.insertBefore(box,h.nextSibling);
    else el.insertBefore(box,el.firstChild);
  }
  if(!box._pending){
    box.textContent=t145('Checking what is saved for offline…');
    box.className='';
  }
  var token=++paintCheck145._gen;
  box._pending=true;
  count145().then(function(st){
    if(token!==paintCheck145._gen)return;
    box._pending=false;
    box.textContent=(st&&st.ok?'✅ ':'')+line145(st);
    box.className=st&&st.ok?'ok145':'';
  }).catch(function(){
    if(token!==paintCheck145._gen)return;
    box._pending=false;
    box.textContent=line145({err:true});
    box.className='';
  });
}
paintCheck145._gen=0;

function hookOffline145(){
  var prev=typeof renderOffline==='function'?renderOffline:null;
  if(typeof prev==='function'&&!prev._v145){
    renderOffline=function(){
      var r=prev.apply(this,arguments);
      try{paintCheck145()}catch(e){}
      return r;
    };
    renderOffline._v145=1;
  }
}

function seedArt145(){
  var P=typeof LampPrint133==='object'?LampPrint133:null;
  if(P&&P.thumb) return '<span class="seed145-art">'+P.thumb('seed')+'</span>';
  return '';
}

function seedCardHTML145(){
  return '<div class="card" data-seed145="1">'+
    '<h3 class="kline">'+e145(t145('Keep the Seed forever'))+'</h3>'+
    seedArt145()+
    '<p>'+e145(t145('The Seed is this app, kept as ordinary files on your device. Tap Save everything above so every voice, song and language works without internet — in the car, on a plane, or years from now.'))+'</p>'+
    '<p>'+e145(t145('You can copy that saved folder and share it with another family. Nothing is uploaded. Each child’s lamp and progress stay on their own device.'))+'</p>'+
    '<p>'+e145(t145('The code is free under the GPL. Our stories, pictures and songs are free to share and adapt under CC BY-SA, as long as you credit Lamplight Learning and share alike. Anyone may copy and improve it.'))+'</p>'+
    '<h3 class="kline">'+e145(t145('Where the art comes from'))+'</h3>'+
    '<p>'+e145(t145('The stained glass look follows Daniel Cottier’s flower window (Metropolitan Museum of Art, CC0).'))+'</p>'+
    '<p>'+e145(t145('The constellation look follows Sidney Hall’s Urania’s Mirror star cards (1824, public domain).'))+'</p>'+
    '<p>'+e145(t145('The sky chart follows Andreas Cellarius’s 1660 planisphere (public domain).'))+'</p>'+
    '<p class="soft">'+e145(t145('We draw our own lines. The old plates are the models, not copies pasted in.'))+'</p>'+
    '<p class="soft"><a href="LICENSES.md">'+e145(t145('Read the licenses'))+'</a></p>'+
  '</div>';
}

function attachSeed145(){
  var root=typeof $==='function'?$('adults'):document.getElementById('adults');
  if(!root||root.querySelector('[data-seed145]'))return;
  if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
  var printCard=root.querySelector('[data-print133]');
  var html=seedCardHTML145();
  if(printCard) printCard.insertAdjacentHTML('beforebegin',html);
  else root.insertAdjacentHTML('beforeend',html);
}

function hookAdults145(){
  var prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
  if(typeof prev==='function'&&!prev._v145){
    renderAdults=function(){
      var r=prev.apply(this,arguments);
      try{attachSeed145()}catch(e){}
      return r;
    };
    renderAdults._v145=1;
    if(typeof RENDER==='object')RENDER.adults=renderAdults;
  }
  var prevShow=typeof afterShow95==='function'?afterShow95:null;
  if(typeof prevShow==='function'&&!prevShow._v145){
    afterShow95=function(id){
      var r=prevShow.apply(this,arguments);
      try{if(id==='adults'){attachSeed145();paintCheck145()}}catch(e){}
      return r;
    };
    afterShow95._v145=1;
  }
}

hookOffline145();
hookAdults145();
window.IL145={version:145,count:count145,paint:paintCheck145};
})();
