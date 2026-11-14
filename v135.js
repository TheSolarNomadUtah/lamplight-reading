// SPDX-License-Identifier: GPL-3.0-or-later
/* v135: Polygon to circle (The Council fit check #4) and the Star Count
 * 56 px spacing floor after the final fit (in v132.js). v136: side-split
 * morph, even-n flat-side orientation, and "looks round" from 10 sides.
 * Does not wrap show(). */
(function(){
'use strict';

const MIN135=3, MAX135=16, MORPH_MS=1100;
const CX=100, CY=100, R=72;
const KEPLER_SRC='gallery/core/images/kepler-harmonices-mundi.webp';
const P135={n:MIN135, target:MIN135, morph:null};

if(typeof document!=='undefined'&&!document.getElementById('v135css')){
 const s=document.createElement('style');s.id='v135css';
 s.textContent=`
#math .poly135-stage{position:relative;max-width:420px;margin:12px auto}
#math .poly135-card{display:block;width:100%;height:auto;background:#f7efe2;border-radius:16px}
#math .poly135-shape{fill:#f4e0b0;stroke:#8a5a28;stroke-width:2.6;stroke-linejoin:round;transition:none}
#math .poly135-dot{fill:#6b4a2a}
#math .poly135-btn{min-width:56px;min-height:56px;padding:8px 16px;border-radius:14px;box-sizing:border-box}
#math .toy132-row .poly135-btn{min-width:56px;min-height:56px}
#math .poly135-hit{position:absolute;inset:0;width:100%;height:100%;padding:0;margin:0;border:0;border-radius:16px;background:transparent;cursor:pointer}
#math .poly135-kepler{display:block;width:min(100%,220px);height:auto;border-radius:8px;margin:.4rem 0;background:#eee4cc}
#math details.toy132-grown>summary{min-height:56px;display:flex;align-items:center;cursor:pointer;list-style:none}
#math details.toy132-grown>summary::-webkit-details-marker{display:none}
@media (prefers-reduced-motion:reduce){
  #math .poly135-shape{transition:none}
}
`;
 (document.documentElement||document.head).appendChild(s);
}

function fill135(s,v){
 if(!v||typeof s!=='string')return s;
 return s.replace(/\{(\w+)\}/g,function(_,k){return v[k]!=null?String(v[k]):'{'+k+'}'});
}
function t135(s,v){
 const raw=typeof mathT==='function'?mathT(s,v):(typeof gT==='function'?gT(s,v):s);
 return fill135(raw,v);
}
function e135(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function reduced135(){
 try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
 return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
}
function name135(n){
 if(n===3)return t135('Triangle');
 if(n===4)return t135('Square');
 if(n===5)return t135('Pentagon');
 if(n===6)return t135('Hexagon');
 if(n>=10)return t135('So many corners, it looks round.');
 return t135('{n} corners',{n:String(n)});
}
/* Odd n: point-up (−π/2). Even n: rotate by π/n so a side sits on the bottom
 * (the square is axis-aligned, not a diamond; the hexagon is flat-topped). */
function rot135(n){
 return (n%2===0)?(-Math.PI/2+Math.PI/n):(-Math.PI/2);
}
function verts135(n){
 const rot=rot135(n), pts=[];
 for(let i=0;i<n;i++){
  const th=rot+2*Math.PI*i/n;
  pts.push({x:CX+R*Math.cos(th),y:CY+R*Math.sin(th)});
 }
 return pts;
}
/* Side-split start: n old vertices plus a new corner at the midpoint of the
 * first side (vertex 0 → 1). Count is n+1 from the first morph frame. */
function splitStart135(n){
 const old=verts135(n);
 const mid={x:(old[0].x+old[1].x)/2,y:(old[0].y+old[1].y)/2};
 return [old[0],mid].concat(old.slice(1));
}
function pairEnds135(start,end){
 const N=start.length;
 let bestK=0,best=Infinity;
 for(let k=0;k<N;k++){
  let s=0;
  for(let i=0;i<N;i++){
   const e=end[(i+k)%N];
   const dx=start[i].x-e.x, dy=start[i].y-e.y;
   s+=dx*dx+dy*dy;
  }
  if(s<best){best=s;bestK=k}
 }
 return start.map(function(_,i){return end[(i+bestK)%N]});
}
function morphVerts135(from,t,eased){
 const e=eased!=null?eased:(t<=0?0:t>=1?1:ease135(t));
 const start=splitStart135(from);
 const end=pairEnds135(start,verts135(from+1));
 return start.map(function(p,i){return {x:p.x+e*(end[i].x-p.x),y:p.y+e*(end[i].y-p.y)}});
}
function path135(pts){
 return pts.map((p,i)=>(i?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2)).join(' ')+' Z';
}
function dots135(pts){
 return pts.map(p=>`<circle class="poly135-dot" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="3.2"/>`).join('');
}

function stopMorph135(){
 if(P135.morph&&P135.morph.id){try{cancelAnimationFrame(P135.morph.id)}catch(e){}}
 P135.morph=null;
}
function ease135(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2}

function applyShape135(pts){
 const el=document.getElementById('poly135path');
 const dots=document.getElementById('poly135dots');
 if(!el||!pts||!pts.length)return;
 el.setAttribute('d',path135(pts));
 if(dots) dots.innerHTML=dots135(pts);
}
function drawShape135(n){applyShape135(verts135(n))}

function polyThumb135(){
 const pts=verts135(6);
 const d=path135(pts.map(p=>({x:p.x*72/200,y:p.y*72/200})));
 return `<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="14" fill="#f7efe2"/>
  <path d="${d}" fill="#f4e0b0" stroke="#8a5a28" stroke-width="2.2" stroke-linejoin="round"/></svg>`;
}

function kepler135(){
 const cap=t135('This idea is 400 years old.')+' '+t135('Johannes Kepler drew polygons and solids in 1619.');
 const credit=t135('Johannes Kepler, Harmonices Mundi, 1619. Scan: Internet Archive / Wikimedia Commons.');
 const alt=t135("A 1619 engraved plate from Kepler's Harmonices Mundi showing Platonic solids, their unfolded nets, star-shaped dodecahedra, and solids marked with fire, a tree, water, and a starry sky, on aged yellowish paper.");
 return `<details class="toy132-grown soft"><summary>${e135(t135('For grown-ups'))}</summary>
  <p>${e135(cap)}</p>
  <img class="poly135-kepler" src="${KEPLER_SRC}" alt="${e135(alt)}" width="220" height="160">
  <p class="soft">${e135(credit)}</p>
 </details>`;
}

function polyOpen135(){
 if(typeof MATH==='object'){MATH.unit='polygon';MATH.msg=''}
 stopMorph135();
 P135.n=MIN135;P135.target=MIN135;
 polyDraw135();
}
function polyReset135(){
 stopMorph135();
 P135.n=MIN135;P135.target=MIN135;
 polyDraw135();
}
function polyAdd135(){
 if((P135.target!=null?P135.target:P135.n)>=MAX135)return;
 P135.target=Math.min(MAX135,(P135.target!=null?P135.target:P135.n)+1);
 if(reduced135()){
  stopMorph135();
  P135.n=P135.target;
  polyDraw135();
  return;
 }
 if(P135.morph)return;
 startMorph135();
}
function startMorph135(){
 const from=P135.n;
 const to=Math.min(P135.target||from,from+1);
 if(to<=from){P135.morph=null;return}
 const t0=(typeof performance!=='undefined'?performance.now():Date.now());
 const start=splitStart135(from);
 const end=pairEnds135(start,verts135(to));
 P135.n=to;
 /* Labels show the shape we are becoming; the outline morphs slowly
  * from a side-split (new corner at a midpoint) to the settled n+1-gon. */
 polyDraw135();
 applyShape135(start);
 function tick(now){
  const t=Math.min(1,((now!=null?now:(typeof performance!=='undefined'?performance.now():Date.now()))-t0)/MORPH_MS);
  const e=ease135(t);
  applyShape135(start.map(function(p,i){return {x:p.x+e*(end[i].x-p.x),y:p.y+e*(end[i].y-p.y)}}));
  if(t<1){
   P135.morph={id:requestAnimationFrame(tick)};
  }else{
   P135.morph=null;
   drawShape135(to);
   if((P135.target||to)>P135.n) startMorph135();
  }
 }
 P135.morph={id:requestAnimationFrame(tick)};
}

function polyDraw135(){
 const el=typeof $==='function'?$('math'):document.getElementById('math');if(!el)return;
 const n=P135.n;
 const title=t135('Polygon to circle');
 const name=name135(n);
 const count=n>=10?`<p class="soft">${e135(t135('{n} corners',{n:String(n)}))}</p>`:'';
 const intro=`<p class="soft">${e135(t135('Add one corner at a time.'))}</p>`;
 const fact=`<h3 class="kline" id="poly135name">${e135(name)}</h3>${count}`;
 const pts=verts135(n);
 const svg=`<svg class="poly135-card" viewBox="0 0 200 200" width="360" height="360" role="img" aria-labelledby="poly135name">
  <rect width="200" height="200" rx="12" fill="#f7efe2"/>
  <path id="poly135path" class="poly135-shape" d="${path135(pts)}"/>
  <g id="poly135dots">${dots135(pts)}</g>
 </svg>`;
 const canAdd=n<MAX135;
 const addBtn=canAdd?`<button type="button" class="p poly135-btn" id="poly135add" onclick="Polygon135.add()">${e135(t135('Add a corner'))}</button>`:'';
 const again=`<button type="button" class="poly135-btn" id="poly135again" onclick="Polygon135.reset()">${e135(t135('Start again'))}</button>`;
 const hit=canAdd?`<button type="button" class="poly135-hit" aria-label="${e135(t135('Add a corner'))}" onclick="Polygon135.add()"></button>`:'';
 el.innerHTML=(typeof mathShell==='function'?mathShell(e135(title),''):`<div class="card math-card"><h2>${e135(title)}</h2>`).replace('</div>',`
  ${intro}${fact}
  <div class="poly135-stage">${svg}${hit}</div>
  <div class="toy132-row">${addBtn}${again}</div>
  ${kepler135()}
 </div>`);
}

function mountTile135(){
 const grid=document.querySelector('#math .math-units');if(!grid)return;
 if(grid.querySelector('[data-math="polygon"]'))return;
 const b=document.createElement('button');
 b.type='button';b.className='hubtile';b.setAttribute('data-math','polygon');
 b.setAttribute('onclick',"mathOpen('polygon')");
 b.innerHTML=polyThumb135()+e135(t135('Polygon to circle'))+'<small>'+e135(t135('Add one corner at a time.'))+'</small>';
 grid.appendChild(b);
}

const prevRender=typeof renderMath==='function'?renderMath:null;
function renderMath135(){
 if(typeof MATH==='object'&&MATH.unit==='polygon')return polyDraw135();
 if(typeof prevRender==='function')prevRender();
 mountTile135();
}
window.renderMath=renderMath135;
if(typeof RENDER==='object')RENDER.math=renderMath135;

const prevOpen=typeof mathOpen==='function'?mathOpen:null;
function mathOpen135(unit){
 if(unit==='polygon'){if(typeof MATH==='object'){MATH.unit='polygon';MATH.msg=''}return polyOpen135()}
 if(typeof prevOpen==='function')return prevOpen(unit);
}
window.mathOpen=mathOpen135;

window.Polygon135={
  add:polyAdd135,
  reset:polyReset135,
  open:polyOpen135,
  max:MAX135,
  min:MIN135,
  R:R, CX:CX, CY:CY,
  rot:rot135,
  verts:verts135,
  splitStart:splitStart135,
  morphVerts:morphVerts135,
  name:name135,
  ease:ease135,
  state:function(){return {n:P135.n,target:P135.target,morphing:!!P135.morph}},
  setN:function(n){
    stopMorph135();
    n=Math.max(MIN135,Math.min(MAX135,n|0));
    P135.n=n;P135.target=n;
    polyDraw135();
  }
};
})();
