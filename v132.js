// SPDX-License-Identifier: GPL-3.0-or-later
/* v132: Fireflies Make Ten and Star Count Tonight (Professor Pi).
 * Untimed, no score, no fail, no child data. Reuses Sky Tonight's city
 * pick and sky.js. Does not wrap show(). */
(function(){
'use strict';

const FACT_FF='Two groups can make ten: 7 and 3, 6 and 4, 5 and 5.';
const FACT_BELT="Orion's Belt is 3 stars in a row.";
const FACT_CAS='Cassiopeia makes a W with 5 stars.';
const FACT_DIP='The Big Dipper has 7 bright stars.';
/* Core catalog indices and J2000 RA/Dec from sky/stars.min.json (and the
 * UMa stick-figure order / lines from sky/constellations.min.json). */
const CORE132={
  belt:{id:'belt',n:3,fact:FACT_BELT,title:"Orion's Belt",lines:[[0,1],[1,2]],stars:[
    {name:'Mintaka',i:73,ra:83.00,dec:-0.30},
    {name:'Alnilam',i:29,ra:84.05,dec:-1.20},
    {name:'Alnitak',i:31,ra:85.19,dec:-1.94}
  ]},
  cas:{id:'cas',n:5,fact:FACT_CAS,title:"Cassiopeia's W",lines:[[0,1],[1,2],[2,3],[3,4]],stars:[
    {name:'Caph',i:74,ra:2.29,dec:59.15},
    {name:'Schedar',i:71,ra:10.13,dec:56.54},
    {name:'Gamma Cas',i:63,ra:14.18,dec:60.72},
    {name:'Ruchbah',i:108,ra:21.45,dec:60.24},
    {name:'Segin',i:244,ra:28.60,dec:63.67}
  ]},
  dipper:{id:'dipper',n:7,fact:FACT_DIP,title:'The Big Dipper',lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],stars:[
    {name:'Alkaid',i:38,ra:206.89,dec:49.31,x:0.069,y:0.412},
    {name:'Mizar',i:69,ra:200.98,dec:54.93,x:0.200,y:0.362},
    {name:'Alioth',i:33,ra:193.51,dec:55.96,x:0.285,y:0.385},
    {name:'Megrez',i:237,ra:183.86,dec:57.03,x:0.387,y:0.404},
    {name:'Dubhe',i:36,ra:165.93,dec:61.75,x:0.566,y:0.350},
    {name:'Merak',i:80,ra:165.46,dec:56.38,x:0.566,y:0.447},
    {name:'Phecda',i:85,ra:178.46,dec:53.69,x:0.426,y:0.477}
  ]}
};
const ORDER132=['belt','cas','dipper'];

const FF={k:7,spots:Array(10).fill(false),bag:[],nums:false,done:false};
const SC={id:null,tonight:false,lit:[],offer:[],date:null};

if(typeof document!=='undefined'&&!document.getElementById('v132css')){
 const s=document.createElement('style');s.id='v132css';
 s.textContent=`
#math .toy132-stage{position:relative;max-width:420px;margin:12px auto}
#math .toy132-stage>svg,#math .sc132-card{display:block;width:100%;height:auto;background:#120E18;border-radius:16px}
#math .ff132-jar-wrap{position:relative;background:#120E18;border-radius:16px;padding:64px 20px 36px;box-sizing:border-box;min-height:260px}
#math .ff132-frame{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
#math .ff132-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(5,minmax(56px,1fr));gap:8px;justify-items:stretch;align-items:stretch}
#math .ff132-cell{min-width:56px;min-height:56px;width:100%;aspect-ratio:1/1;padding:0;margin:0;border:0;background:transparent;border-radius:12px;display:grid;place-items:center;cursor:pointer;box-sizing:border-box}
#math .ff132-cell svg{width:40px;height:40px;overflow:visible;display:block}
#math .toy132-count{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:18px;margin:8px 0 4px}
#math .toy132-count i{display:block;width:10px;height:10px;border-radius:50%;background:#e6b454;box-shadow:0 0 6px rgba(230,180,84,.45)}
#math .toy132-count i.cool{background:#8ec5d6;box-shadow:0 0 6px rgba(142,197,214,.45)}
#math .toy132-eq{text-align:center;min-height:1.4em;direction:ltr}
#math .toy132-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:10px 0}
#math .toy132-row button,#math .toy132-city,#math .ff132-nums{
  min-width:56px;min-height:56px;padding:8px 12px;border-radius:14px;box-sizing:border-box}
#math .toy132-fig{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:96px}
#math .toy132-fig svg{width:56px;height:56px;background:#120E18;border-radius:12px}
#math .toy132-city{display:flex;align-items:center;gap:8px}
#math .toy132-city select{min-height:44px;font-size:1rem;max-width:220px}
#math .ff132-cell{cursor:pointer}
#math .sc132-hit{cursor:pointer}
#math .sc132-wrap{position:relative}
#math .sc132-board{position:absolute;inset:0;z-index:2;width:100%;height:100%;padding:0;margin:0;border:0;background:transparent;cursor:pointer;touch-action:manipulation}
#math .sc132-card .sc132-star{pointer-events:none}
#math .sc132-hot{position:absolute;width:56px;height:56px;min-width:56px;min-height:56px;padding:0;margin:0;border:0;border-radius:50%;background:transparent;transform:translate(-50%,-50%);cursor:pointer;box-sizing:border-box;pointer-events:none}
#math details.toy132-grown>summary{
  min-height:56px;display:flex;align-items:center;cursor:pointer;list-style:none}
#math details.toy132-grown>summary::-webkit-details-marker{display:none}
@keyframes ff132fade{from{opacity:0}to{opacity:1}}
@keyframes ff132drift{to{transform:translate(var(--dx),var(--dy));opacity:.2}}
#math .ff132-in{animation:ff132fade .7s ease both}
#math .ff132-go .ff132-fly{animation:ff132drift 2.6s ease forwards}
#math .ff132-go .ff132-lid{transform-origin:46px 38px;transform:rotate(-52deg)}
#math .sc132-lines{opacity:0}
#math .sc132-done .sc132-lines{animation:ff132fade 1s ease both;opacity:1}
#math .toy132-reduced .ff132-fly,#math .toy132-reduced .ff132-go .ff132-fly,
#math .toy132-reduced .sc132-done .sc132-lines{animation:none}
#math .toy132-reduced .ff132-go .ff132-fly{opacity:1}
#math .toy132-reduced .sc132-done .sc132-lines{opacity:1}
@media (prefers-reduced-motion:reduce){
  #math .ff132-in,#math .ff132-go .ff132-fly,#math .sc132-done .sc132-lines{animation:none}
  #math .ff132-go .ff132-fly{opacity:1}
  #math .sc132-done .sc132-lines{opacity:1}
}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t132(s,v){return typeof mathT==='function'?mathT(s,v):(typeof gT==='function'?gT(s,v):(typeof patT==='function'?patT(s,v):s))}
function e132(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function lang132(){try{return (typeof LANG==='string'&&LANG)||(typeof skyLang112==='function'?skyLang112():'en')}catch(e){return 'en'}}
function factOk132(){const L=lang132();return L==='en'||L==='es'}
function reduced132(){
 try{if(typeof lampReducedNow111==='function'&&lampReducedNow111())return true}catch(e){}
 try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
 try{if(typeof skyReduce112==='function'&&skyReduce112())return true}catch(e){}
 return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
}
function chime132(i){
 if(reduced132())return;
 try{if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return}catch(e){}
 try{
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;
  o.type='sine';o.frequency.value=392+(i||0)*24;
  g.gain.setValueAtTime(0.0001,t);
  g.gain.linearRampToValueAtTime(0.032,t+.03);
  g.gain.exponentialRampToValueAtTime(0.0001,t+.26);
  o.connect(g).connect(c.destination);o.start(t);o.stop(t+.3);
 }catch(e){}
}

/* ---------- Fireflies Make Ten ---------- */
function shuffle132(a){
 const b=a.slice();
 for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=b[i];b[i]=b[j];b[j]=t}
 return b;
}
function bagNext132(){
 if(!FF.bag.length) FF.bag=shuffle132([1,2,3,4,5,6,7,8,9]);
 return FF.bag.pop();
}
function ffSpotsOn132(){return (FF.spots||[]).reduce(function(n,v){return n+(v?1:0)},0)}
function ffNew132(){
 FF.k=bagNext132();
 FF.spots=Array(10).fill(false).map(function(_,i){return i<FF.k});
 FF.done=false;
 if(typeof MATH==='object')MATH.unit='fireflies';
 ffDraw132();
}
function ffFlySVG132(on,warm,i){
 if(!on) return `<circle class="ff132-empty" cx="0" cy="0" r="9" fill="none" stroke="#e6b454" stroke-width="1.4" opacity=".35"/>`;
 const glow=warm?'#f6e08a':'#b7e0ea';
 const body=warm?'#e6b454':'#8ec5d6';
 const dx=((i%5)-2)*18, dy=-28-(i%3)*16;
 return `<g class="ff132-fly" style="--dx:${dx}px;--dy:${dy}px">
  <ellipse cx="0" cy="-3.2" rx="5.2" ry="3.4" fill="#d9c9a8" opacity=".7"/>
  <ellipse cx="0" cy="1.2" rx="4.2" ry="5.2" fill="${body}"/>
  <circle cx="0" cy="5.2" r="3.4" fill="${glow}" opacity=".95">
   ${reduced132()?'':`<animate attributeName="opacity" values=".7;1;.7" dur="1.6s" repeatCount="indefinite"/>`}
  </circle>
  <circle cx="0" cy="5.2" r="7" fill="${glow}" opacity=".28"/>
 </g>`;
}
function ffJarHTML132(){
 const open=FF.done?' ff132-go':'';
 const reduce=reduced132()?' toy132-reduced':'';
 const cells=[];
 for(let i=0;i<10;i++){
  const on=!!(FF.spots&&FF.spots[i]), warm=i<FF.k;
  cells.push(`<button type="button" class="ff132-cell" data-i="${i}" aria-pressed="${on?'true':'false'}" aria-label="${e132(t132('Firefly {n}',{n:String(i+1)}))}" onclick="Fireflies132.tap(${i})">
    <svg viewBox="-16 -16 32 32" width="40" height="40" aria-hidden="true">${ffFlySVG132(on,warm,i)}</svg>
  </button>`);
 }
 return `<div class="ff132-jar-wrap${open}${reduce}" role="group" aria-label="${e132(t132('Fireflies Make Ten'))}">
  <svg class="ff132-frame" viewBox="0 0 200 240" preserveAspectRatio="none" aria-hidden="true">
   <rect width="200" height="240" fill="#120E18"/>
   <ellipse cx="100" cy="228" rx="70" ry="10" fill="#1C1624" opacity=".9"/>
   <path d="M54 40h92" stroke="#72583f" stroke-width="3" fill="none"/>
   <g class="ff132-lid"><path d="M58 40c0-10 10-16 42-16s42 6 42 16" fill="#d9b27a" stroke="#72583f" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="86" y="18" width="28" height="10" rx="3" fill="#e6b454" stroke="#72583f" stroke-width="1.6"/></g>
   <path d="M48 40c-6 22-8 48-8 84 0 36 26 64 60 64s60-28 60-64c0-36-2-62-8-84z" fill="#1a2430" stroke="#8aa0a8" stroke-width="2.4" opacity=".92"/>
  </svg>
  <div class="ff132-grid">${cells.join('')}</div>
 </div>`;
}
function ffEq132(){
 if(!FF.nums)return '';
 const n=typeof gNum==='function'?gNum:String;
 const added=Math.max(0,ffSpotsOn132()-FF.k);
 const a=n(FF.k), b=n(10-FF.k);
 if(FF.done||ffSpotsOn132()===10) return a+' + '+b+' = '+n(10);
 if(added<=0) return a;
 return a+' + '+n(added);
}
function ffCount132(){
 const a=FF.k, b=Math.max(0,ffSpotsOn132()-FF.k);
 let html='';
 for(let i=0;i<a;i++) html+='<i></i>';
 for(let i=0;i<b;i++) html+='<i class="cool"></i>';
 return html;
}
function ffDraw132(){
 const el=typeof $==='function'?$('math'):document.getElementById('math');if(!el)return;
 const fact=factOk132()?`<p class="soft toy132-fact">${e132(t132(FACT_FF))}</p>`:'';
 const again=FF.done?`<p><button type="button" class="p toy132-again" onclick="Fireflies132.again()">${e132(t132('Another jar'))}</button></p>`:'';
 const numsLab=FF.nums?t132('Hide numbers'):t132('Show numbers');
 el.innerHTML=(typeof mathShell==='function'?mathShell(t132('Fireflies Make Ten'),''):`<div class="card"><h2>${e132(t132('Fireflies Make Ten'))}</h2></div>`.replace('</div>','innerPH</div>')).replace('</div>',`
  ${fact}
  <p class="soft">${e132(t132('Make ten in the jar.'))}</p>
  <div class="toy132-stage${FF.done?' ff132-in':''}">${ffJarHTML132()}</div>
  <div class="toy132-count" aria-hidden="true">${ffCount132()}</div>
  <p class="toy132-eq">${FF.nums?e132(ffEq132()):''}</p>
  <div class="toy132-row">
   <button type="button" class="ff132-nums" aria-pressed="${FF.nums?'true':'false'}" onclick="Fireflies132.toggleNums()">${e132(numsLab)}</button>
  </div>
  ${again}
 </div>`);
 /* mathShell already closes the card; the replace above assumes a trailing </div>. If mathShell included the close, we injected before it. */
 bindFF132(el);
}
function bindFF132(el){ /* buttons use onclick */ }
function ffTap132(i){
 if(FF.done)return;
 if(!FF.spots)FF.spots=Array(10).fill(false);
 if(FF.spots[i])return; /* already glowing: do nothing, no error */
 FF.spots[i]=true;
 const n=ffSpotsOn132();
 chime132(n);
 if(n>=10) FF.done=true;
 ffDraw132();
}

function ffThumb132(){
 return `<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="14" fill="#120E18"/><path d="M18 22c-2 8-3 16-3 24 0 12 9 20 21 20s21-8 21-20c0-8-1-16-3-24z" fill="#1a2430" stroke="#8aa0a8" stroke-width="2"/><g fill="#e6b454"><circle cx="28" cy="36" r="3.2"/><circle cx="36" cy="40" r="3.2"/><circle cx="44" cy="36" r="3.2"/></g></svg>`;
}

/* ---------- Star Count Tonight ---------- */
function syncCore132(){
 try{
  const q=(typeof SKY112==='object'&&SKY112.stars&&SKY112.stars.q)||null;
  if(!q)return;
  ORDER132.forEach(id=>{
   CORE132[id].stars.forEach(st=>{
    if(q[st.i]){st.ra=q[st.i][0];st.dec=q[st.i][1]}
   });
  });
 }catch(e){}
}
function jdNow132(date){
 const d=date||new Date();
 if(typeof SkyTonight!=='undefined'&&SkyTonight.julianDate){
  return SkyTonight.julianDate(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),d.getUTCHours()+d.getUTCMinutes()/60+d.getUTCSeconds()/3600);
 }
 return (d.getTime()/86400000)+2440587.5;
}
function city132(){
 try{if(typeof skyCity112==='function')return skyCity112()}catch(e){}
 if(typeof SkyTonight!=='undefined'&&SkyTonight.DEFAULT_CITY)return Object.assign({i:0},SkyTonight.DEFAULT_CITY);
 return {name:'Cache County, Utah',lat:41.7,lon:-111.8,i:0};
}
function stillLight132(jd,city){
 try{
  if(typeof skyStillLight112==='function')return skyStillLight112(jd,city);
  const s=SkyTonight.sun(jd);
  return SkyTonight.altAz(s.ra,s.dec,city.lat,city.lon,jd).alt>-6;
 }catch(e){return false}
}
function starAlt132(st,jd,city){
 try{
  if(typeof skyAltAz112==='function')return skyAltAz112(st.ra,st.dec,jd,city).alt;
  if(typeof SkyTonight!=='undefined'){
   const p=SkyTonight.precess?SkyTonight.precess(st.ra,st.dec,SkyTonight.J2000,jd):{ra:st.ra,dec:st.dec};
   return SkyTonight.altAz(p.ra,p.dec,city.lat,city.lon,jd).alt;
  }
 }catch(e){}
 return 90;
}
function figUp132(fig,jd,city){
 return fig.stars.every(st=>starAlt132(st,jd,city)>10);
}
function offer132(jd,city){
 jd=jd==null?jdNow132(SC.date):jd;
 city=city||city132();
 if(stillLight132(jd,city))return [];
 return ORDER132.filter(id=>figUp132(CORE132[id],jd,city));
}
function duskInner132(date){
 let south=false;
 try{if(typeof MoonDusk131!=='undefined'&&typeof MoonDusk131.south==='function')south=!!MoonDusk131.south()}catch(e){}
 if(typeof MoonDusk==='undefined'||typeof MoonDusk.svg!=='function'){
  return '<rect width="200" height="200" fill="#120E18"/><ellipse cx="100" cy="200" rx="120" ry="70" fill="#1C1624" opacity=".85"/>';
 }
 const raw=MoonDusk.svg(date||new Date(),{stars:false,lantern:true,name:false,south:south,lang:lang132()==='es'?'es':'en',cx:182,cy:28,r:13,gid:'sc132mg'});
 const m=String(raw).match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
 return m?m[1]:String(raw);
}
function composeSky132(date,figureMarkup){
 const inner=duskInner132(date);
 const m=inner.match(/^(<rect\b[^>]*\/?>(?:<\/rect>)?)(<ellipse\b[^>]*\/?>(?:<\/ellipse>)?)([\s\S]*)$/i);
 if(m) return m[1]+m[2]+figureMarkup+m[3];
 return figureMarkup+inner;
}
function stageWidth132(){
 const math=document.getElementById('math');
 if(math){
  const card=math.querySelector('.math-card,.card')||math;
  const r=card.getBoundingClientRect();
  const cs=getComputedStyle(card);
  const pad=(parseFloat(cs.paddingLeft)||0)+(parseFloat(cs.paddingRight)||0);
  const w=r.width-pad;
  if(w>80) return Math.min(420,w);
 }
 return Math.min(420,Math.max(200,(typeof innerWidth==='number'?innerWidth:390)-48));
}
/* Enlarge and, at small widths, mildly stretch a figure so star centers
 * can sit at least 56 CSS px apart when the aspect ratio allows it.
 * Shape is preserved first (uniform scale); extra stretch is only used
 * to meet the spacing floor and is capped. */
function fitStars132(raw,box,opt){
 opt=opt||{};
 const pts=(raw||[]).map(p=>({x:+p.x,y:+p.y}));
 if(!pts.length) return pts;
 let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 pts.forEach(p=>{if(p.x<minX)minX=p.x;if(p.x>maxX)maxX=p.x;if(p.y<minY)minY=p.y;if(p.y>maxY)maxY=p.y});
 const bw=(maxX-minX)||1, bh=(maxY-minY)||1;
 const pad=6;
 const availW=Math.max(8,box.w-2*pad), availH=Math.max(8,box.h-2*pad);
 const displayW=opt.displayW||stageWidth132();
 const wantSep=opt.minSep!==false;
 const minCss=56.8;
 const minVB=minCss*(200/Math.max(120,displayW));
 /* Uniform scale to fill the box, shape first. */
 let useX=Math.min(availW/bw,availH/bh), useY=useX;
 const placed=pts.map(p=>({x:(p.x-minX)*useX,y:(p.y-minY)*useY}));
 if(wantSep){
  /* Push any pair closer than 56 CSS px apart, then refit. Close handle
   * stars need a little extra room the uniform scale cannot give. */
  for(let iter=0;iter<48;iter++){
   let moved=false;
   for(let i=0;i<placed.length;i++){
    for(let j=i+1;j<placed.length;j++){
     let dx=placed[j].x-placed[i].x, dy=placed[j].y-placed[i].y;
     const d=Math.hypot(dx,dy)||0.001;
     if(d<minVB){
      const push=(minVB-d)/2;
      const ux=dx/d, uy=dy/d;
      placed[i].x-=ux*push; placed[i].y-=uy*push;
      placed[j].x+=ux*push; placed[j].y+=uy*push;
      moved=true;
     }
    }
   }
   if(!moved) break;
  }
 }
 let pMinX=Infinity,pMaxX=-Infinity,pMinY=Infinity,pMaxY=-Infinity;
 placed.forEach(p=>{if(p.x<pMinX)pMinX=p.x;if(p.x>pMaxX)pMaxX=p.x;if(p.y<pMinY)pMinY=p.y;if(p.y>pMaxY)pMaxY=p.y});
 const pw=(pMaxX-pMinX)||1, ph=(pMaxY-pMinY)||1;
 const fit=Math.min(availW/pw,availH/ph,1);
 const w=pw*fit, h=ph*fit;
 const x0=box.x0+pad+(availW-w)/2;
 const y0=box.y0+pad+(availH-h)/2;
 return placed.map(p=>({x:x0+(p.x-pMinX)*fit,y:y0+(p.y-pMinY)*fit}));
}
function projectRaw132(fig,tonight,jd,city){
 const box={x0:22,y0:16,w:156,h:108};
 if(!tonight){
  return fig.stars.map(st=>{
   const x=st.x!=null?box.x0+st.x*box.w:box.x0+box.w/2;
   const y=st.y!=null?box.y0+st.y*box.h:box.y0+box.h/2;
   return {x,y};
  });
 }
 const pts=fig.stars.map(st=>{
  let az=180,alt=40;
  try{
   const a=typeof skyAltAz112==='function'?skyAltAz112(st.ra,st.dec,jd,city):SkyTonight.altAz(st.ra,st.dec,city.lat,city.lon,jd);
   az=a.az;alt=a.alt;
  }catch(e){}
  const rad=((az-180)*Math.PI)/180;
  const c=Math.cos((alt*Math.PI)/180);
  return {x:c*Math.sin(rad),y:-alt};
 });
 let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 pts.forEach(p=>{if(p.x<minX)minX=p.x;if(p.x>maxX)maxX=p.x;if(p.y<minY)minY=p.y;if(p.y>maxY)maxY=p.y});
 const sx=(maxX-minX)||1, sy=(maxY-minY)||1;
 const pad=16;
 return pts.map(p=>({
  x: box.x0+pad+((p.x-minX)/sx)*(box.w-2*pad),
  y: box.y0+pad+((p.y-minY)/sy)*(box.h-2*pad)
 }));
}
function project132(fig,tonight,jd,city,opt){
 opt=opt||{};
 /* Wide sky box: left of the tucked moon, above the lantern. */
 const box={x0:6,y0:10,w:188,h:126};
 return fitStars132(projectRaw132(fig,tonight,jd,city),box,opt);
}
function figMarkup132(fig,xy,lit){
 const lines=fig.lines.map(([a,b])=>{
  const A=xy[a],B=xy[b];if(!A||!B)return '';
  return `<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}"/>`;
 }).join('');
 const stars=xy.map((p,i)=>{
  const on=!!lit[i];
  return `<g class="sc132-star" data-i="${i}" role="button" tabindex="0" aria-pressed="${on?'true':'false'}" aria-label="${e132(t132('Star {n}',{n:String(i+1)}))}">
   <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${on?3.6:2.4}" fill="#fff6d8" opacity="${on?1:0.78}"/>
  </g>`;
 }).join('');
 return `<g class="sc132-fig${lit.filter(Boolean).length>=fig.n?' sc132-done':''}">
  <g class="sc132-lines" fill="none" stroke="#e6b454" stroke-width="1.4" stroke-linecap="round" opacity=".85">${lines}</g>
  ${stars}
 </g>`;
}
function miniFig132(id){
 const fig=CORE132[id];
 const xy=project132(fig,false,null,null,{minSep:false,displayW:200});
 const dots=xy.map(p=>`<circle cx="${(p.x).toFixed(1)}" cy="${(p.y).toFixed(1)}" r="3.2" fill="#fff6d8"/>`).join('');
 const lines=fig.lines.map(([a,b])=>{
  const A=xy[a],B=xy[b];if(!A||!B)return '';
  return `<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="#e6b454" stroke-width="1.2"/>`;
 }).join('');
 return `<svg viewBox="0 0 200 200" width="56" height="56" aria-hidden="true"><rect width="200" height="200" fill="#120E18"/>${lines}${dots}</svg>`;
}
function cities132(){
 try{if(typeof skyCities112==='function'){const q=skyCities112();if(q&&q.length)return q}}catch(e){}
 try{
  const S=(typeof SKY112==='object'&&SKY112)||(typeof SkyTonightUI==='object'&&SkyTonightUI.SKY112);
  const q=S&&S.cities&&S.cities.q;
  if(q&&q.length)return q;
 }catch(e){}
 return [];
}
function citySelect132(){
 const city=city132();
 let opts='';
 try{
  const list=cities132();
  if(list.length){
   opts=list.map((q,i)=>`<option value="${i}"${i===(city.i||0)?' selected':''}>${e132(q[0])}</option>`).join('');
  }
 }catch(e){}
 if(!opts) opts=`<option value="${city.i||0}" selected>${e132(city.name)}</option>`;
 return `<label class="toy132-city">${e132(t132('City'))}
  <select id="starCity132" onchange="StarCount132.setCity(parseInt(this.value,10))">${opts}</select>
 </label>`;
}
function grownNames132(fig){
 const names=fig.stars.map(s=>s.name).join(', ');
 return `<details class="toy132-grown soft"><summary>${e132(t132('For grown-ups'))}</summary>
  <p>${e132(names)}</p></details>`;
}
function scPick132(id,tonight){
 const fig=CORE132[id]||CORE132.dipper;
 SC.id=fig.id;
 SC.tonight=!!tonight;
 SC.lit=Array(fig.n).fill(false);
 scDraw132();
}
function scRefreshOffer132(){
 syncCore132();
 const jd=jdNow132(SC.date);
 const city=city132();
 SC.offer=offer132(jd,city);
 if(SC.offer.length){
  const keep=SC.offer.indexOf(SC.id)>=0?SC.id:SC.offer[0];
  if(SC.id!==keep||SC.tonight!==true||!SC.lit||SC.lit.length!==CORE132[keep].n){
   SC.id=keep;SC.tonight=true;SC.lit=Array(CORE132[keep].n).fill(false);
  }
 }else{
  if(SC.id!=='dipper'||SC.tonight!==false||!SC.lit||SC.lit.length!==7){
   SC.id='dipper';SC.tonight=false;SC.lit=Array(7).fill(false);
  }
 }
}
function scOpen132(){
 if(typeof MATH==='object')MATH.unit='stars';
 SC.date=SC.date||new Date();
 const go=()=>{syncCore132();scRefreshOffer132();scDraw132()};
 if(typeof skyLoad112==='function'&&!(typeof SKY112==='object'&&SKY112.ready)){
  skyLoad112().then(go).catch(go);
  /* draw a first frame with baked coords while the pack loads */
  scRefreshOffer132();scDraw132();
  return;
 }
 go();
}
function scDraw132(){
 const el=typeof $==='function'?$('math'):document.getElementById('math');if(!el)return;
 scRefreshOffer132();
 const fig=CORE132[SC.id]||CORE132.dipper;
 const jd=jdNow132(SC.date);
 const city=city132();
 const xy=project132(fig,SC.tonight,jd,city,{displayW:stageWidth132(),minSep:true});
 SC.xy=xy;
 const date=SC.date||new Date();
 const markup=figMarkup132(fig,xy,SC.lit||[]);
 const inner=composeSky132(date,markup);
 const title=SC.tonight?t132('Star Count Tonight'):t132('The Big Dipper');
 const fact=factOk132()?`<p class="soft toy132-fact">${e132(t132(fig.fact))}</p>`:'';
 const claim=SC.tonight?'':`<p class="soft">${e132(t132('A dipper of seven stars.'))}</p>`;
 const nLit=(SC.lit||[]).filter(Boolean).length;
 let chooser='';
 if(SC.offer.length>1){
  chooser='<div class="toy132-row" role="group" aria-label="'+e132(t132('Star Count Tonight'))+'">'+
   SC.offer.map(id=>{
    const on=id===SC.id;
    return `<button type="button" class="toy132-fig${on?' cur':''}" aria-pressed="${on?'true':'false'}" onclick="StarCount132.pick('${id}',true)">${miniFig132(id)}<span>${e132(t132(CORE132[id].title))}</span></button>`;
   }).join('')+'</div>';
 }
 const svg=`<svg class="sc132-card" viewBox="0 0 200 200" width="360" height="360" role="img" aria-label="${e132(title)}">${inner}</svg>`;
 el.innerHTML=(typeof mathShell==='function'?mathShell(title,''):`<div class="card math-card"><h2>${e132(title)}</h2>`).replace('</div>',`
  ${fact}${claim}
  ${chooser}
  <div class="toy132-stage"><div class="sc132-wrap">${svg}<button type="button" class="sc132-board" aria-label="${e132(title)}"></button></div></div>
  <div class="toy132-count" aria-hidden="true">${Array(nLit).fill('<i></i>').join('')}</div>
  <div class="toy132-row">${citySelect132()}</div>
  ${grownNames132(fig)}
 </div>`);
 bindSC132(el);
}
function cssToView132(svg,clientX,clientY){
 if(!svg||!svg.getScreenCTM)return null;
 const ctm=svg.getScreenCTM();
 if(!ctm)return null;
 const pt=svg.createSVGPoint();
 pt.x=clientX;pt.y=clientY;
 const loc=pt.matrixTransform(ctm.inverse());
 return {x:loc.x,y:loc.y};
}
function nearestStar132(clientX,clientY){
 const svg=document.querySelector('#math .sc132-card');
 const xy=SC.xy||[];
 if(!svg||!xy.length)return -1;
 const loc=cssToView132(svg,clientX,clientY);
 if(!loc)return -1;
 let best=-1,bestD=Infinity;
 xy.forEach((p,i)=>{
  const d=(p.x-loc.x)*(p.x-loc.x)+(p.y-loc.y)*(p.y-loc.y);
  if(d<bestD){bestD=d;best=i}
 });
 if(best<0)return -1;
 const w=svg.getBoundingClientRect().width||200;
 const maxVB=56*(200/w);
 if(Math.sqrt(bestD)>maxVB+0.51)return -1;
 return best;
}
function minSepCss132(){
 const xy=SC.xy||[];
 const svg=document.querySelector('#math .sc132-card');
 const w=svg?svg.getBoundingClientRect().width:0;
 if(xy.length<2||!w)return 0;
 let m=Infinity;
 for(let i=0;i<xy.length;i++){
  for(let j=i+1;j<xy.length;j++){
   const d=Math.hypot(xy[i].x-xy[j].x,xy[i].y-xy[j].y)*(w/200);
   if(d<m)m=d;
  }
 }
 return m;
}
function bindSC132(el){
 const svg=el.querySelector('.sc132-card');if(!svg)return;
 svg.querySelectorAll('.sc132-star').forEach(g=>{
  const go=()=>scTap132(parseInt(g.getAttribute('data-i'),10));
  g.addEventListener('click',go);
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
 });
 const board=el.querySelector('.sc132-board');
 if(board&&!board._sc132){
  board._sc132=1;
  board.addEventListener('click',function(ev){
   const i=nearestStar132(ev.clientX,ev.clientY);
   if(i>=0){ev.preventDefault();scTap132(i)}
  });
 }
}
function scTap132(i){
 const fig=CORE132[SC.id]||CORE132.dipper;
 if(!SC.lit||i<0||i>=fig.n)return;
 if(SC.lit[i])return;
 SC.lit[i]=true;
 chime132(SC.lit.filter(Boolean).length);
 scDraw132();
}
function scThumb132(){
 return `<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="14" fill="#120E18"/>
  <circle cx="18" cy="30" r="2.4" fill="#fff6d8"/><circle cx="28" cy="24" r="2.4" fill="#fff6d8"/>
  <circle cx="38" cy="26" r="2.4" fill="#fff6d8"/><circle cx="48" cy="22" r="2.4" fill="#fff6d8"/>
  <circle cx="50" cy="36" r="2.4" fill="#fff6d8"/><circle cx="38" cy="42" r="2.4" fill="#fff6d8"/>
  <circle cx="46" cy="46" r="2.4" fill="#fff6d8"/>
  <path d="M18 30 28 24 38 26 48 22 50 36 38 42 46 46" fill="none" stroke="#e6b454" stroke-width="1.2"/></svg>`;
}
function scSetCity132(i){
 try{if(typeof skySetCity112==='function')skySetCity112(i)}catch(e){}
 SC.lit=null; /* new sky, new count */
 scOpen132();
}

/* ---------- Numbers hub tiles ---------- */
function mountTiles132(){
 const grid=document.querySelector('#math .math-units');if(!grid)return;
 if(!grid.querySelector('[data-math="fireflies"]')){
  const b=document.createElement('button');
  b.type='button';b.className='hubtile';b.setAttribute('data-math','fireflies');
  b.setAttribute('onclick',"mathOpen('fireflies')");
  b.innerHTML=ffThumb132()+e132(t132('Fireflies Make Ten'))+'<small>'+e132(t132('Make ten in the jar.'))+'</small>';
  grid.appendChild(b);
 }
 if(!grid.querySelector('[data-math="stars"]')){
  const b=document.createElement('button');
  b.type='button';b.className='hubtile';b.setAttribute('data-math','stars');
  b.setAttribute('onclick',"mathOpen('stars')");
  b.innerHTML=scThumb132()+e132(t132('Star Count Tonight'))+'<small>'+e132(t132('Count the stars you can see.'))+'</small>';
  grid.appendChild(b);
 }
}

const prevRenderMath=typeof renderMath==='function'?renderMath:null;
function renderMath132(){
 if(typeof MATH==='object'&&MATH.unit==='fireflies')return ffDraw132();
 if(typeof MATH==='object'&&MATH.unit==='stars')return scDraw132();
 if(typeof prevRenderMath==='function')prevRenderMath();
 mountTiles132();
}
window.renderMath=renderMath132;
if(typeof RENDER==='object')RENDER.math=renderMath132;

const prevOpen=typeof mathOpen==='function'?mathOpen:null;
function mathOpen132(unit){
 if(unit==='fireflies'){if(typeof MATH==='object'){MATH.unit='fireflies';MATH.msg=''}return ffNew132()}
 if(unit==='stars'){if(typeof MATH==='object'){MATH.unit='stars';MATH.msg=''}return scOpen132()}
 if(typeof prevOpen==='function')return prevOpen(unit);
}
window.mathOpen=mathOpen132;

window.Fireflies132={
  again:ffNew132,
  tap:ffTap132,
  toggleNums:function(){FF.nums=!FF.nums;ffDraw132()},
  newRound:ffNew132,
  state:function(){return {k:FF.k,lit:ffSpotsOn132(),spots:(FF.spots||[]).slice(),done:FF.done,bag:FF.bag.slice(),nums:FF.nums}},
  set:function(o){
    if(!o)return;
    if(o.k!=null)FF.k=o.k;
    if(Array.isArray(o.spots))FF.spots=o.spots.slice();
    else if(o.lit!=null)FF.spots=Array(10).fill(false).map(function(_,i){return i<o.lit});
    if(o.done!=null)FF.done=!!o.done;
    if(Array.isArray(o.bag))FF.bag=o.bag.slice();
    if(o.nums!=null)FF.nums=!!o.nums;
    ffDraw132();
  },
  bagNext:bagNext132
};
window.StarCount132={
  pick:scPick132,
  tap:scTap132,
  setCity:scSetCity132,
  open:scOpen132,
  offer:offer132,
  figUp:figUp132,
  stillLight:stillLight132,
  jdNow:jdNow132,
  core:CORE132,
  nearest:nearestStar132,
  minSep:minSepCss132,
  xy:function(){return (SC.xy||[]).map(p=>({x:p.x,y:p.y}))},
  state:function(){return {id:SC.id,tonight:SC.tonight,lit:(SC.lit||[]).slice(),offer:SC.offer.slice()}},
  setDate:function(d){SC.date=d;SC.lit=null;scOpen132()}
};
})();
