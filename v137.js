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
