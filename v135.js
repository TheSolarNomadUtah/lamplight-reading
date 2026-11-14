// SPDX-License-Identifier: GPL-3.0-or-later
/* v135: Polygon to circle (The Council fit check #4) and the Star Count
 * 56 px spacing floor after the final fit (in v132.js). Uses Pi's wording,
 * stops at 16 sides, slow morph, Curator's Kepler corner art. Does not
 * wrap show(). */
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

function t135(s,v){return typeof mathT==='function'?mathT(s,v):(typeof gT==='function'?gT(s,v):s)}
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
 return t135('So many corners, it looks round.');
}
function rGon135(n,th){
 const slice=2*Math.PI/n;
 const rot=-Math.PI/2;
 let x=((th-rot)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);
 const local=x%slice-slice/2;
 const c=Math.cos(local);
 const den=Math.abs(c)<1e-6?(c<0?-1e-6:1e-6):c;
 return R*Math.cos(Math.PI/n)/den;
}
function verts135(n,nEff){
 const count=Math.max(3,Math.round(nEff!=null?nEff:n));
 const use=nEff!=null?nEff:n;
 const pts=[];
 for(let i=0;i<count;i++){
  const th=-Math.PI/2+2*Math.PI*i/count;
  const r=rGon135(use,th);
  pts.push({x:CX+r*Math.cos(th),y:CY+r*Math.sin(th)});
 }
 return pts;
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

function drawShape135(n,nEff){
 const el=document.getElementById('poly135path');
 const dots=document.getElementById('poly135dots');
 if(!el)return;
 const pts=verts135(n,nEff);
 el.setAttribute('d',path135(pts));
 if(dots) dots.innerHTML=dots135(pts);
}

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
 P135.n=to;
 /* Labels show the shape we are becoming; the outline morphs slowly. */
 polyDraw135();
 const path=document.getElementById('poly135path');
 const dots=document.getElementById('poly135dots');
 if(!path){P135.morph=null;return}
 function tick(now){
  const t=Math.min(1,((now!=null?now:(typeof performance!=='undefined'?performance.now():Date.now()))-t0)/MORPH_MS);
  const e=ease135(t);
  const nEff=from+e*(to-from);
  const pts=verts135(to,nEff);
  path.setAttribute('d',path135(pts));
  if(dots) dots.innerHTML=dots135(pts);
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
 const count=n<=6?'':`<p class="soft">${e135(t135('{n} corners',{n:String(n)}))}</p>`;
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
  state:function(){return {n:P135.n,target:P135.target,morphing:!!P135.morph}},
  setN:function(n){
    stopMorph135();
    n=Math.max(MIN135,Math.min(MAX135,n|0));
    P135.n=n;P135.target=n;
    polyDraw135();
  }
};
})();
