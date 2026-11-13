// SPDX-License-Identifier: GPL-3.0-or-later
/* v124: Sunflower Garden and Honeycomb Builder in Patterns Everywhere,
 * plus a song list in LICENSES.md. Earned glass patterns are recorded
 * locally only; the full earned-patterns picker is not in this release. */
(function(){
'use strict';

const GA124=137.508*Math.PI/180;
const C124=14; // seed 12 stays inside the disc; dots ≥ 6.8 apart on a 200 box
const DOT124=6.8;
const FACT_SUN='Sunflower seeds grow in spirals.';
const FACT_HEX='Bees build honeycomb from hexagons. They fit together with no gaps.';

if(typeof document!=='undefined'&&!document.getElementById('v124css')){
 const s=document.createElement('style');s.id='v124css';
 s.textContent=`
#patterns .toy124-stage{position:relative;max-width:420px;margin:12px auto}
#patterns .toy124-stage svg{display:block;width:100%;height:auto;background:#120E18;border-radius:16px}
#patterns .toy124-count{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:18px;margin:8px 0 4px}
#patterns .toy124-count i{display:block;width:10px;height:10px;border-radius:50%;background:#e6b454;box-shadow:0 0 6px rgba(230,180,84,.45)}
#patterns .toy124-glow .toy124-disc,#patterns .toy124-glow .toy124-hex-on{filter:url(#toy124glow)}
@keyframes toy124fade{from{opacity:0}to{opacity:1}}
#patterns .toy124-in{animation:toy124fade .8s ease both}
@media (prefers-reduced-motion:reduce){
  #patterns .toy124-in{animation:toy124fade .8s ease both;transform:none}
  #patterns .toy124-stage svg,#patterns .toy124-glow .toy124-disc{filter:none}
}
#patterns .turtle105-toy{position:absolute;width:28px;height:30px;right:10px;bottom:10px;pointer-events:none;opacity:.7;line-height:0;z-index:3}
#patterns .turtle105-toy svg{display:block;width:100%;height:100%;background:none;border-radius:0}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t124(s,v){return typeof patT==='function'?patT(s,v):(typeof gT==='function'?gT(s,v):s)}
function e124(s){return typeof patEsc==='function'?patEsc(s):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function pid124(){try{return typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():'p1')}catch(e){return 'p1'}}
function reduced124(){
 try{if(typeof patReduced==='function'&&patReduced())return true}catch(e){}
 try{if(typeof lampReducedNow111==='function'&&lampReducedNow111())return true}catch(e){}
 try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
 return false;
}
function earnKey124(){return 'lamp_earn124@'+pid124()}
function earnLoad124(){
 try{
  const raw=typeof RAW!=='undefined'?RAW.get(earnKey124()):null;
  const o=raw?(typeof safeJSON==='function'?safeJSON(raw,null):JSON.parse(raw)):null;
  return o&&typeof o==='object'?o:{};
 }catch(e){return {}}
}
function earnSave124(o){
 try{if(typeof RAW!=='undefined')RAW.set(earnKey124(),JSON.stringify(o))}catch(e){}
}
function earn124(id){
 const o=earnLoad124();
 if(!o[id])o[id]={at:Date.now()};
 else o[id].again=Date.now();
 earnSave124(o);
 return o;
}

function sunPts124(n){
 const pts=[];
 const N=Math.max(0,n|0);
 for(let i=0;i<N;i++){
  const a=i*GA124,r=C124*Math.sqrt(i+0.6);
  pts.push([100+r*Math.cos(a),92+r*Math.sin(a)]);
 }
 return pts;
}
function sunSVG124(n,opts){
 opts=opts||{};
 const cap=opts.cap||13;
 const N=Math.min(n,cap);
 const pts=sunPts124(N);
 const glow=N>=13;
 const fade=reduced124()||opts.still;
 const seeds=pts.map((p,i)=>{
  const cls='toy124-seed'+(fade||i<N-1?'':' toy124-in');
  return `<circle class="${cls}" cx="${p[0].toFixed(2)}" cy="${p[1].toFixed(2)}" r="${(DOT124/2).toFixed(2)}" fill="#FFE4A4" stroke="#E6B454" stroke-width="1.1"/>`;
 }).join('');
 return `<svg class="toy124-sun${glow?' toy124-glow':''}" viewBox="0 0 200 200" width="${opts.w||360}" height="${opts.h||360}" role="img" aria-hidden="${opts.thumb?'true':'false'}" ${opts.thumb?'':'aria-label="'+e124(t124('Sunflower Garden'))+'"'}>
  <defs><filter id="toy124glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="200" height="200" fill="#120E18"/>
  <ellipse class="toy124-disc" cx="100" cy="92" rx="68" ry="68" fill="#2A3A28"/>
  <ellipse cx="100" cy="92" rx="58" ry="58" fill="#3A4A30"/>
  <ellipse cx="100" cy="92" rx="22" ry="22" fill="#855A00" stroke="#72583F" stroke-width="1.4"/>
  <ellipse cx="100" cy="92" rx="12" ry="12" fill="#E6B454"/>
  <g fill="#6F8F4A" stroke="#4A6A38" stroke-width="1">${[0,72,144,216,288].map((a,i)=>{
   const r=a*Math.PI/180,x=100+Math.cos(r)*74,y=92+Math.sin(r)*70;
   return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="16" ry="9" transform="rotate(${(a+90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join('')}</g>
  ${seeds}
 </svg>`;
}

/* Pointy-top axial hex, same law as the turtle (ilHexCenters119 / ilHexD119). */
function hexXY124(q,r,size){return [size*(Math.sqrt(3)*q+Math.sqrt(3)/2*r), size*(1.5*r)]}
function hexRing124(n){
 if(!n)return [[0,0]];
 const c=[];let q=n,r=0;
 for(const [dq,dr] of [[0,-1],[-1,0],[-1,1],[0,1],[1,0],[1,-1]]){
  for(let i=0;i<n;i++){c.push([q,r]);q+=dq;r+=dr}
 }
 return c;
}
function hexCells124(){
 const cells=[];
 for(let k=0;k<=2;k++)cells.push(...hexRing124(k));
 return cells.filter(([q,r])=>Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=2);
}
function hexD124(cx,cy,size){
 const pts=[];
 for(let i=0;i<6;i++){
  const a=(30+60*i)*Math.PI/180;
  pts.push([cx+size*Math.cos(a),cy+size*Math.sin(a)]);
 }
 return `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`+pts.slice(1).map(p=>`L${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join('')+'Z';
}
function hexKey124(q,r){return q+','+r}
function hexOpen124(filled){
 const has=k=>filled.has(k);
 const ring1=hexRing124(1),ring2=hexRing124(2);
 const r1full=ring1.every(([q,r])=>has(hexKey124(q,r)));
 const ghosts=[];
 if(!r1full)ring1.forEach(([q,r])=>{const k=hexKey124(q,r);if(!has(k))ghosts.push([q,r])});
 else ring2.forEach(([q,r])=>{const k=hexKey124(q,r);if(!has(k))ghosts.push([q,r])});
 return ghosts;
}
function hexSVG124(filled,opts){
 opts=opts||{};
 const size=18,cx=100,cy=100;
 const fade=reduced124()||opts.still;
 const glow=filled.size>=19;
 const ghosts=hexOpen124(filled);
 const parts=[];
 hexCells124().forEach(([q,r])=>{
  const [dx,dy]=hexXY124(q,r,size);
  const k=hexKey124(q,r);
  const on=filled.has(k);
  const ghost=ghosts.some(([qq,rr])=>qq===q&&rr===r);
  if(!on&&!ghost)return;
  const cls=(on?'toy124-hex-on':'toy124-hex-ghost')+(fade?'':' toy124-in');
  const fill=on?'#E6B454': 'none';
  const op=on?'.92':'.7';
  const sw=on?'1.8':'1.6';
  const stroke=on?'#855A00':'#C4A07A';
  parts.push(`<path class="${cls}" data-q="${q}" data-r="${r}" d="${hexD124(cx+dx,cy+dy,size*.98)}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`);
 });
 return `<svg class="toy124-hex${glow?' toy124-glow':''}" viewBox="0 0 200 200" width="${opts.w||360}" height="${opts.h||360}" role="img" aria-hidden="${opts.thumb?'true':'false'}" ${opts.thumb?'':'aria-label="'+e124(t124('Honeycomb Builder'))+'"'}>
  <defs><filter id="toy124glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="200" height="200" fill="#120E18"/>
  ${parts.join('')}
 </svg>`;
}

function countRow124(n){
 let s='';
 for(let i=0;i<n;i++)s+='<i></i>';
 return `<div class="toy124-count" aria-hidden="true">${s}</div>`;
}
function maybeTurtle124(){
 if(Math.random()>0.2)return '';
 const art=(typeof turtleArt105==='function')?turtleArt105('tuck',28,30):'';
 if(!art)return '';
 return `<span class="turtle105-toy" data-turtle124="1" aria-hidden="true">${art}</span>`;
}
function cleanup124(){
 try{
  const host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  if(typeof PAT106==='object'&&PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
  if(typeof scStop101==='function')scStop101();
 }catch(e){}
}

const SUN124={n:0};
const HEX124={filled:null};

function sunOpen124(){
 cleanup124();
 SUN124.n=0;
 if(typeof PAT106==='object')PAT106.unit='sunflower';
 sunDraw124();
}
function sunDraw124(){
 const el=$('patterns');if(!el)return;
 const n=SUN124.n;
 const cap=34;
 el.innerHTML=patShell(t124('Sunflower Garden'),`
  <p class="soft toy124-fact">${e124(t124(FACT_SUN))}</p>
  <div class="toy124-stage" id="toy124sun">${sunSVG124(n,{cap})}${maybeTurtle124()}</div>
  ${countRow124(n)}
  <div class="pat-row">
   <button type="button" class="p" onclick="window.IL124.sunKeep()">${e124(t124('Keep'))}</button>
  </div>
  <p class="soft" id="toy124msg"></p>
  <h3>${e124(t124('Your gallery'))}</h3>
  <p class="soft">${e124(t124('Up to {n} on this device. When it is full, hold one to let it go.',{n:String(typeof PAT_GALLERY_CAP106==='number'?PAT_GALLERY_CAP106:24)}))}</p>
  <div class="pat-gallery" id="patGal106"></div>
 `);
 const stage=$('toy124sun');
 if(stage){
  const go=ev=>{
   ev.preventDefault();
   if(SUN124.n>=cap)return;
   SUN124.n+=1;
   if(SUN124.n===13)earn124('spiral');
   sunDraw124();
  };
  stage.addEventListener('click',go);
  stage.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')go(e)});
  stage.setAttribute('tabindex','0');
  stage.style.cursor='pointer';
 }
 if(typeof patGalRender106==='function')patGalRender106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
 if(typeof artRefresh63==='function')artRefresh63(el);
}
function sunKeep124(){
 if(typeof patGalKeep!=='function')return;
 const r=patGalKeep({kind:'sunflower',n:SUN124.n,c:C124},t124('Sunflower Garden'));
 const msg=$('toy124msg');
 if(msg)msg.textContent=(!r.ok&&r.full)?t124('The gallery is full. Hold one picture to let it go, then you can keep this one.'):(r.grew?t124('Kept. The one who is with you grew a little.'):t124('Kept on this device.'));
 if(typeof patGalRender106==='function')patGalRender106();
}

function hexOpenToy124(){
 cleanup124();
 HEX124.filled=new Set(['0,0']);
 if(typeof PAT106==='object')PAT106.unit='honeycomb';
 hexDraw124();
}
function hexDraw124(){
 const el=$('patterns');if(!el)return;
 const filled=HEX124.filled||new Set(['0,0']);
 el.innerHTML=patShell(t124('Honeycomb Builder'),`
  <p class="soft toy124-fact">${e124(t124(FACT_HEX))}</p>
  <div class="toy124-stage" id="toy124hex">${hexSVG124(filled)}${maybeTurtle124()}</div>
  ${countRow124(filled.size)}
  <div class="pat-row">
   <button type="button" class="p" onclick="window.IL124.hexKeep()">${e124(t124('Keep'))}</button>
  </div>
  <p class="soft" id="toy124msg"></p>
  <h3>${e124(t124('Your gallery'))}</h3>
  <p class="soft">${e124(t124('Up to {n} on this device. When it is full, hold one to let it go.',{n:String(typeof PAT_GALLERY_CAP106==='number'?PAT_GALLERY_CAP106:24)}))}</p>
  <div class="pat-gallery" id="patGal106"></div>
 `);
 const svg=document.querySelector('#toy124hex svg');
 if(svg){
  svg.querySelectorAll('.toy124-hex-ghost').forEach(p=>{
   p.style.cursor='pointer';
   p.addEventListener('click',ev=>{
    ev.preventDefault();ev.stopPropagation();
    const q=+p.getAttribute('data-q'),r=+p.getAttribute('data-r');
    filled.add(hexKey124(q,r));
    HEX124.filled=filled;
    if(filled.size===19)earn124('hex');
    hexDraw124();
   });
  });
 }
 if(typeof patGalRender106==='function')patGalRender106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
 if(typeof artRefresh63==='function')artRefresh63(el);
}
function hexKeep124(){
 if(typeof patGalKeep!=='function')return;
 const filled=HEX124.filled||new Set(['0,0']);
 const r=patGalKeep({kind:'honeycomb',filled:[...filled]},t124('Honeycomb Builder'));
 const msg=$('toy124msg');
 if(msg)msg.textContent=(!r.ok&&r.full)?t124('The gallery is full. Hold one picture to let it go, then you can keep this one.'):(r.grew?t124('Kept. The one who is with you grew a little.'):t124('Kept on this device.'));
 if(typeof patGalRender106==='function')patGalRender106();
}

function unitArt124(id){
 const ink=(typeof patInk==='function')?patInk():'#72583f';
 const plate=inner=>`<svg class="lamp-art63" data-original-art="pat-${id}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${ink}" stroke-width="2"/>${inner}</svg>`;
 if(id==='sunflower'){
  const pts=sunPts124(13);
  // scale 200-box around (100,92) into the 100-plate
  const seeds=pts.map(p=>{
   const x=50+(p[0]-100)*0.38,y=50+(p[1]-92)*0.38;
   return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#E6B454"/>`;
  }).join('');
  return plate(`<circle cx="50" cy="50" r="22" fill="#3A4A30" stroke="${ink}" stroke-width="1.2"/><circle cx="50" cy="50" r="7" fill="#855A00"/><circle cx="50" cy="50" r="3.4" fill="#FFE4A4"/>${seeds}`);
 }
 if(id==='honeycomb'){
  const size=9,cells=hexCells124();
  const hexes=cells.map(([q,r])=>{
   const [dx,dy]=hexXY124(q,r,size);
   return `<path d="${hexD124(50+dx,52+dy,size*.98)}" fill="#E6B454" stroke="${ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
  }).join('');
  return plate(hexes);
 }
 return '';
}

function drawThumb124(cv,recipe){
 if(!cv||!recipe)return false;
 const w=cv.width,h=cv.height;
 const svg=recipe.kind==='sunflower'?sunSVG124(recipe.n||0,{w,h,cap:13,still:true,thumb:true})
  :recipe.kind==='honeycomb'?hexSVG124(new Set(recipe.filled||['0,0']),{w,h,still:true,thumb:true}):'';
 if(!svg)return false;
 const img=new Image();
 img.onload=()=>{const x=cv.getContext('2d');if(!x)return;x.clearRect(0,0,w,h);x.drawImage(img,0,0,w,h)};
 img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
 return true;
}

{const prev=typeof renderPatterns106==='function'?renderPatterns106:null;
 if(prev){
  renderPatterns106=function(){
   const r=prev.apply(this,arguments);
   try{
    const grid=document.querySelector('#patterns .pat-units');
    if(grid&&!grid.querySelector('[data-pat="sunflower"]')){
     const tiles=[
      ['sunflower',t124('Sunflower Garden'),t124(FACT_SUN)],
      ['honeycomb',t124('Honeycomb Builder'),t124(FACT_HEX)]
     ];
     tiles.forEach(([id,title,sub])=>{
      const b=document.createElement('button');
      b.type='button';b.className='hubtile';b.setAttribute('data-pat',id);
      b.setAttribute('onclick',`patOpen106('${id}')`);
      b.innerHTML=`${unitArt124(id)}${e124(title)}<small>${e124(sub)}</small>`;
      grid.appendChild(b);
     });
    }
   }catch(e){}
   return r;
  };
 }
}
{const prev=typeof patOpen106==='function'?patOpen106:null;
 if(prev){
  patOpen106=function(unit){
   if(unit==='sunflower'){sunOpen124();return}
   if(unit==='honeycomb'){hexOpenToy124();return}
   return prev.apply(this,arguments);
  };
 }
}
{const prev=typeof patGalRender106==='function'?patGalRender106:null;
 if(prev){
  patGalRender106=function(){
   const r=prev.apply(this,arguments);
   try{
    const host=$('patGal106');if(!host)return r;
    const g=typeof patGalLoad==='function'?patGalLoad():{items:[]};
    host.querySelectorAll('[data-gal]').forEach(btn=>{
     const it=g.items.find(x=>x.id===btn.dataset.gal);if(!it||!it.recipe)return;
     if(it.recipe.kind==='sunflower'||it.recipe.kind==='honeycomb'){
      const cv=btn.querySelector('canvas');
      drawThumb124(cv,it.recipe);
     }
    });
    // after let-go, stay on the current toy if open
    host.querySelectorAll('[data-gal]').forEach(btn=>{
     // hold-to-let-go already bound by prev; when it redraws grow/zoom only,
     // wrap doesn't rebind. Acceptable: letting go from our toys redraws via confirm path
    });
   }catch(e){}
   return r;
  };
 }
}

{const prevGo=typeof patGalLetGo==='function'?patGalLetGo:null;
 if(prevGo){
  patGalLetGo=function(id){
   const r=prevGo.apply(this,arguments);
   try{
    if(typeof PAT106==='object'&&PAT106.unit==='sunflower')sunDraw124();
    else if(typeof PAT106==='object'&&PAT106.unit==='honeycomb')hexDraw124();
   }catch(e){}
   return r;
  };
 }
}
{const prevGrow=typeof patGrowDraw106==='function'?patGrowDraw106:null;
 if(prevGrow){
  patGrowDraw106=function(){
   try{
    if(typeof PAT106==='object'&&PAT106.unit==='sunflower'){sunDraw124();return}
    if(typeof PAT106==='object'&&PAT106.unit==='honeycomb'){hexDraw124();return}
   }catch(e){}
   return prevGrow.apply(this,arguments);
  };
 }
}

window.IL124={
 sunOpen:sunOpen124,hexOpen:hexOpenToy124,
 sunKeep:sunKeep124,hexKeep:hexKeep124,
 earn:earn124,earned:earnLoad124,
 sunPts:sunPts124,hexCells:hexCells124,hexRing:hexRing124,
 FACT_SUN,FACT_HEX
};
})();
