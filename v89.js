// v89: five Lamp effects as a per-child choice, next to the flame color
// picker on Look. The current look stays the default (Classic glow).
// Switching an effect never changes Lamp progress. All effects are drawn
// in code, in the child's flame color, slow, with no flicker. Reduced
// motion keeps every effect still (crossfades only).
// Also folds v88 QA: the Home Songs tile is no longer hidden by the
// retired-music hider (data-songs88 + click listener, unique drawn art,
// no emoji); the Luna credit on Grown-ups and About uses a new class and
// en/es strings so it is visible and the old Kokoro singing line is gone;
// Look Up keyboard focus retries with rAF until the next token is
// connected and visible (cap 500 ms), then scrollIntoView and focus.
const FX89=[
 {id:'classic',name:'Classic glow',
  fact:'This is the Lamp’s familiar, steady glow. A lamp sends light out in every direction, and the glow looks softer farther from the flame.'},
 {id:'spiral',name:'Sleeping spiral',
  fact:'Sunflower seeds grow in a spiral. The turn between each seed is a special angle that packs them tight.'},
 {id:'core',name:'Bright core',
  fact:'A real flame is brightest near the middle, with a softer glow around it.'},
 {id:'ember',name:'Ember pulses',
  fact:'An ember is a small piece of wood or coal that keeps glowing after the flames go down.'},
 {id:'jelly',name:'Comb jelly ripple',
  fact:'Comb jellies are sea animals. Tiny rows on their bodies bend light into rainbows, like a soap bubble.'},
 {id:'smoke',name:'Glowing smoke',
  fact:'Some deep-sea animals squirt a glowing cloud of ink, then hide behind it.'}
];
let FX89_SMOKE=new Map();
let FX89_LOW=null;

function lampFxById89(id){return FX89.find(f=>f.id===id)||FX89[0]}
function lampFxKey89(pid){return 'lamp_fx@'+(pid||(typeof curPid==='function'?curPid():''))}
function lampFxLoad89(pid){
 const raw=typeof safeJSON==='function'?safeJSON(RAW.get(lampFxKey89(pid)),null):null;
 if(raw&&typeof raw==='object'&&FX89.some(f=>f.id===raw.id))return raw.id;
 return 'classic';
}
function lampFxSet89(id,pid){
 const who=pid||curPid();
 if(!FX89.some(f=>f.id===id))return;
 if(typeof getProfiles==='function'&&!getProfiles().list.some(p=>p.id===who))return;
 RAW.set(lampFxKey89(who),JSON.stringify({id:id,picked:true}));
 lampFxRemount89();
 document.querySelectorAll('[data-fx89-picker]').forEach(box=>lampFxPickerSync89(box,who));
}
function lampFxReduced89(){return typeof lampReduced73==='function'&&lampReduced73()}
function lampFxLow89(){
 if(FX89_LOW!=null)return FX89_LOW;
 try{
  if(navigator.connection&&navigator.connection.saveData)return FX89_LOW=true;
  if(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)return FX89_LOW=true;
  if(navigator.deviceMemory&&navigator.deviceMemory<=2)return FX89_LOW=true;
 }catch(e){}
 return FX89_LOW=false;
}

function lampFxSpiralSVG89(asleep,still){
 const GA=Math.PI*(3-Math.sqrt(5)),N=144,d=[];
 for(let i=0;i<N;i++){
  const r=4.05*Math.sqrt(i);
  if(r<23||r>49)continue;
  const a=i*GA,x=(50+r*Math.cos(a)).toFixed(2),y=(50+r*Math.sin(a)).toFixed(2);
  const rad=(1.35+0.7*((r-23)/26)).toFixed(2),op=(0.55+0.4*((r-23)/26)).toFixed(2);
  const cls=i%3===0?'t':i%3===1?'c':'m';
  d.push(`<circle class="${cls}" cx="${x}" cy="${y}" r="${rad}" opacity="${op}"/>`);
 }
 const st=(still?' still':'')+(asleep&&!still?' asleep':' awake');
 return `<svg class="fx89-spiral${st}" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">${d.join('')}</svg>`;
}
function lampFxEmberSVG89(still){
 const path='M50 92 C47 80 44 70 48 60 C53 48 45 40 50 30 C54 20 50 14 50 8';
 const dots=still
  ? [[92,8],[78,20],[62,16],[48,22],[32,14]].map(([y],i)=>`<circle class="fx89-ed" cx="50" cy="${y}" r="${3.1-i*.2}" style="--d:${i}"/>`).join('')
  : [0,2.2,4.4,7,9.6].map((d,i)=>`<circle class="fx89-ed" r="${3.2-i*.25}" style="--d:${i}"><animateMotion dur="${11+i*2}s" repeatCount="indefinite" begin="${-d}s" path="${path}"/></circle>`).join('');
 return `<svg class="fx89-ember${still?' still':''}" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
  <defs><filter id="fx89eb" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <path class="fx89-etrack" d="${path}" fill="none"/>
  <g filter="url(#fx89eb)">${dots}</g>
 </svg>`;
}
function lampFxSmokeStatic89(){
 return `<div class="fx89-smoke-static" aria-hidden="true"><span></span><span></span><span></span><span></span></div>`;
}

function lampFxLayerHTML89(id,asleep,still){
 if(id==='spiral')return lampFxSpiralSVG89(asleep,still);
 if(id==='core')return '<div class="fx89-shell"></div><div class="fx89-mid"></div><div class="fx89-hot"></div>';
 if(id==='ember')return lampFxEmberSVG89(still);
 if(id==='jelly')return '<div class="fx89-jelly-clip"><div class="fx89-jelly-a"></div><div class="fx89-jelly-b"></div></div>';
 if(id==='smoke')return (still||lampFxLow89())?lampFxSmokeStatic89():'<canvas class="fx89-smoke-cv" width="320" height="320"></canvas>';
 return '';
}

function lampFxSmokeStop89(root){
 const rec=FX89_SMOKE.get(root);
 if(!rec)return;
 if(rec.raf)cancelAnimationFrame(rec.raf);
 FX89_SMOKE.delete(root);
}
function lampFxSmokeStopAll89(){
 FX89_SMOKE.forEach(rec=>{if(rec.raf)cancelAnimationFrame(rec.raf)});
 FX89_SMOKE.clear();
}
function lampFxN89(x,y){
 const s=Math.sin(x*127.1+y*311.7)*43758.5453;
 return s-Math.floor(s);
}
function lampFxNoise89(x,y){
 const x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0;
 const u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
 return (lampFxN89(x0,y0)*(1-u)+lampFxN89(x0+1,y0)*u)*(1-v)+(lampFxN89(x0,y0+1)*(1-u)+lampFxN89(x0+1,y0+1)*u)*v;
}
function lampFxSmokeStart89(layer,canvas){
 lampFxSmokeStop89(layer);
 if(lampFxReduced89()||lampFxLow89()){
  if(canvas)canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);
  return;
 }
 const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
 const pal=typeof lampFlamePal81==='function'?lampFlamePal81():{mid:'#dca64b',core:'#efba64',tip:'#fbdcad',halo:'#dbb06b'};
 const W=canvas.width,H=canvas.height,parts=[];
 const mk=()=>{
  const side=Math.random()<0.5;
  const loft=Math.random()<0.32;
  const x=loft?(W*.28+Math.random()*W*.44):(side?W*.04+Math.random()*W*.22:W*.74+Math.random()*W*.22);
  const y=loft?(H*.12+Math.random()*H*.2):(H*.32+Math.random()*H*.36);
  return {x,y,vx:(Math.random()-.5)*.2,vy:-.22-Math.random()*.28,life:.5+Math.random()*.75,age:Math.random()*.7,sz:16+Math.random()*28,t:Math.random()*10};
 };
 for(let i=0;i<68;i++)parts.push(mk());
 const rec={raf:0,last:0,frames:[],dead:false};
 FX89_SMOKE.set(layer,rec);
 const css=()=>{
  const s=getComputedStyle(layer);
  return [s.getPropertyValue('--f81-tip')||pal.tip,s.getPropertyValue('--f81-core')||pal.core,s.getPropertyValue('--f81-mid')||pal.mid,s.getPropertyValue('--f81-halo')||pal.halo];
 };
 const hex=c=>{c=c.trim();if(c[0]==='#'&&c.length===7)return [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];return [239,186,100]};
 const loop=t=>{
  rec.raf=requestAnimationFrame(loop);
  if(document.hidden)return;
  if(rec.last&&t-rec.last<33)return;
  const dt=rec.last?Math.min(50,t-rec.last):33;
  if(rec.last){rec.frames.push(t-rec.last);if(rec.frames.length>48)rec.frames.shift();
   if(rec.frames.length>=30){const mid=rec.frames.slice().sort((a,b)=>a-b)[Math.floor(rec.frames.length/2)];
    if(mid>52){rec.dead=true;FX89_LOW=true;cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);
     canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);return}}}
  rec.last=t;
  const step=dt/16.67;
  ctx.clearRect(0,0,W,H);
  const cols=css().map(hex);
  ctx.globalCompositeOperation='lighter';
  for(let i=0;i<parts.length;i++){
   const p=parts[i];p.t+=0.008*step;p.age+=0.0045*step;
   const nx=lampFxNoise89(p.x*.018,p.t),ny=lampFxNoise89(p.y*.018+2,p.t);
   p.vx+=(nx-.5)*.08*step;p.vy+=(ny-.5)*.05*step-.015*step;
   p.vx*=.96;p.vy*=.96;p.x+=p.vx*step*1.4;p.y+=p.vy*step*1.4;
   if(p.age>=p.life||p.y<H*.04||p.x<-16||p.x>W+16){const n=mk();n.age=0;if(Math.random()<0.7){n.y=H*.42+Math.random()*H*.28}parts[i]=n;continue}
   const fade=Math.sin(Math.min(1,p.age/p.life)*Math.PI),c=cols[i%3],night=document.documentElement.dataset.lookTheme==='dark'||!!document.querySelector('.today64.lamp76-night'),a=(night?.32:.18)+(night?.38:.24)*fade;
   const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.sz);
   g.addColorStop(0,`rgba(${c[0]},${c[1]},${c[2]},${a})`);
   g.addColorStop(.45,`rgba(${cols[3][0]},${cols[3][1]},${cols[3][2]},${a*.45})`);
   g.addColorStop(1,`rgba(${c[0]},${c[1]},${c[2]},0)`);
   ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);ctx.fill();
  }
  ctx.globalCompositeOperation='source-over';
 };
 rec.raf=requestAnimationFrame(loop);
}

function lampFxClear89(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('.fx89-layer').forEach(n=>{lampFxSmokeStop89(n);n.remove()});
}
function lampFxInsert89(host,mode){
 if(!host)return;
 const id=lampFxLoad89();
 host.dataset.fx89=id;
 const heroes=[];
 if(host.classList.contains('today64')){const h=host.querySelector('.lamp76-hero');if(h)heroes.push(h)}
 else if(host.classList.contains('lamp76-hero'))heroes.push(host);
 else if(host.matches&&host.matches('dialog.lamp73-dialog'))heroes.push(host);
 else{const h=host.querySelector('.lamp76-hero')||host.querySelector('.lamp73-figure');if(h)heroes.push(h.closest('.lamp76-hero')||h)}
 if(!heroes.length&&host.querySelector){const sh=host.querySelector('.lamp73-shell');if(sh)heroes.push(sh.parentElement||host)}
 const asleep=typeof LAMP73!=='undefined'&&!!LAMP73.away,still=lampFxReduced89();
 heroes.forEach(root=>{
  if(!root)return;
  lampFxClear89(root);
  root.dataset.fx89=id;
  if(id==='classic')return;
  const layer=document.createElement('div');
  layer.className='fx89-layer fx89-'+id+(still?' still':'');
  layer.setAttribute('aria-hidden','true');
  layer.innerHTML=lampFxLayerHTML89(id,asleep,still);
  const body=id==='ember'||id==='jelly';
  const shell=root.querySelector('.lamp73-shell');
  if(body&&shell){shell.appendChild(layer)}
  else{
   const fig=root.querySelector('.lamp73-figure');
   if(fig)fig.before(layer);else root.prepend(layer);
  }
  if(id==='core'&&shell){
   const inner=document.createElement('div');
   inner.className='fx89-layer fx89-core-flame'+(still?' still':'');
   inner.setAttribute('aria-hidden','true');
   inner.innerHTML='<div class="fx89-flame"></div>';
   shell.appendChild(inner);
  }
  if(id==='spiral'&&!still){
   const g=layer.querySelector('.fx89-spiral');
   if(!g)return;
   if(asleep){
    g.classList.add('asleep');g.classList.remove('awake');
    requestAnimationFrame(()=>setTimeout(()=>{g.classList.remove('asleep');g.classList.add('awake')},60));
   }else g.classList.add('awake');
  }
  if(id==='smoke'){
   const cv=layer.querySelector('.fx89-smoke-cv');
   if(cv)lampFxSmokeStart89(layer,cv);
  }
  if(id==='jelly'&&mode==='dialog'&&!still)layer.classList.add('fx89-jelly-up');
 });
}
function lampFxRemount89(){
 const hero=document.querySelector('.today64');
 if(hero){
  hero.classList.add('fx89-swap');
  if(typeof lampMount73==='function')lampMount73(hero,'home');
  requestAnimationFrame(()=>setTimeout(()=>hero.classList.remove('fx89-swap'),700));
 }else if(typeof lampMountAll73==='function')lampMountAll73();
 const form=$('pform');
 if(form){const slot=form.querySelector('[data-lamp73-slot="profile"]');if(slot)lampFxInsert89(slot,'profile')}
}

function lampFxPrev89(id){
 const ga=(n)=>{
  const GA=Math.PI*(3-Math.sqrt(5));let s='';
  for(let i=0;i<n;i++){const r=2.1*Math.sqrt(i+1),a=i*GA;
   s+=`<circle cx="${(32+r*Math.cos(a)).toFixed(1)}" cy="${(32+r*Math.sin(a)).toFixed(1)}" r="${(1.5-i*0.025).toFixed(2)}" fill="currentColor" opacity="${(0.9-i*0.025).toFixed(2)}"/>`}
  return s;
 };
 if(id==='classic')return `<svg class="fx89-prev-svg" viewBox="0 0 64 64" aria-hidden="true"><ellipse class="fx89-pv-glow" cx="32" cy="34" rx="20" ry="20"/><path d="M22 46 L42 46 38 58 26 58Z" fill="currentColor" opacity=".5"/><ellipse cx="32" cy="34" rx="7" ry="12" fill="var(--f81-core,currentColor)"/><ellipse cx="32" cy="30" rx="3.2" ry="5" fill="var(--f81-tip,#fff)" opacity=".9"/></svg>`;
 if(id==='spiral'){
  const GA=Math.PI*(3-Math.sqrt(5));let s='';
  const cols=['var(--f81-tip,#fbdcad)','var(--f81-core,#efba64)','var(--f81-mid,#dca64b)'];
  for(let i=0;i<28;i++){const r=2.35*Math.sqrt(i+1),a=i*GA;
   s+=`<circle cx="${(32+r*Math.cos(a)).toFixed(1)}" cy="${(32+r*Math.sin(a)).toFixed(1)}" r="${(2.1-i*0.03).toFixed(2)}" fill="${cols[i%3]}" opacity="${(0.95-i*0.015).toFixed(2)}"/>`}
  return `<svg class="fx89-prev-svg fx89-pv-spiral" viewBox="0 0 64 64" aria-hidden="true">${s}</svg>`;
 }
 if(id==='core')return `<svg class="fx89-prev-svg fx89-pv-core" viewBox="0 0 64 64" aria-hidden="true"><circle class="fx89-pv-s" cx="32" cy="32" r="26"/><circle class="fx89-pv-m" cx="32" cy="32" r="16"/><circle class="fx89-pv-h" cx="32" cy="32" r="7"/></svg>`;
 if(id==='ember')return `<svg class="fx89-prev-svg fx89-pv-ember" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 56 C28 44 36 36 32 24 C30 18 32 12 32 8" fill="none" stroke="var(--f81-deep,#855a00)" stroke-width="1.2" opacity=".35" stroke-linecap="round"/><circle cx="32" cy="50" r="3.2" fill="var(--f81-mid,#dca64b)"/><circle cx="33" cy="36" r="3.6" fill="var(--f81-core,#efba64)"/><circle cx="31" cy="22" r="4" fill="var(--f81-tip,#fbdcad)"/><circle cx="32" cy="12" r="3.2" fill="#fff"/></svg>`;
 if(id==='jelly'){const hues=['#e8a','#8cf','#bf8','#fd8','#f8c','#9ee'];
  return `<svg class="fx89-prev-svg fx89-pv-jelly" viewBox="0 0 64 64" aria-hidden="true"><g class="fx89-pv-rows">${[10,18,26,34,42,50].map((y,i)=>`<rect x="10" y="${y}" width="44" height="5" rx="2" fill="${hues[i]}" opacity=".85"/>`).join('')}</g></svg>`;}
 if(id==='smoke')return `<svg class="fx89-prev-svg fx89-pv-smoke" viewBox="0 0 64 64" aria-hidden="true"><path d="M20 50 Q16 36 26 30 Q14 28 22 16 Q32 8 30 22 Q40 10 38 26 Q52 22 42 36 Q54 40 40 50 Z" fill="var(--f81-halo,#dbb06b)" opacity=".8"/><path d="M28 52 Q26 40 34 36 Q26 34 32 24 Q40 18 36 32 Q44 28 40 40 Q48 46 36 52Z" fill="var(--f81-core,#efba64)" opacity=".7"/><circle cx="36" cy="28" r="7" fill="var(--f81-tip,#fbdcad)" opacity=".55"/></svg>`;
 return '';
}
function lampFxPickerHTML89(pid){
 const sel=lampFxLoad89(pid),still=lampFxReduced89(),f=lampFxById89(sel);
 const btns=FX89.map(x=>{
  const on=x.id===sel;
  return `<button type="button" class="fx89-swatch${on?' on':''}" data-fx89-id="${x.id}" aria-pressed="${on?'true':'false'}" aria-label="${esc(gT(x.name))}" role="listitem"><span class="fx89-preview${still?' still':''}" data-fx="${x.id}">${lampFxPrev89(x.id)}</span><span class="fx89-name">${esc(gT(x.name))}</span></button>`;
 }).join('');
 return `<div class="fx89-picker" data-fx89-picker data-pid="${esc(pid||'')}" data-sel="${sel}"><h3>${esc(gT('Lamp effect'))}</h3><p class="soft">${esc(gT('Pick a glow for your Lamp. You can change it any time. Your Lamp’s growth stays the same.'))}</p><div class="fx89-tray" role="list">${btns}</div><p class="fx89-fact" data-fx89-fact>${esc(gT(f.fact))}</p></div>`;
}
function lampFxPickerBind89(root,pid){
 const box=root.querySelector('[data-fx89-picker]');if(!box)return;
 box.querySelectorAll('.fx89-swatch').forEach(btn=>{
  btn.addEventListener('click',()=>lampFxSet89(btn.dataset.fx89Id,pid||box.dataset.pid));
 });
}
function lampFxPickerSync89(box,pid){
 const sel=lampFxLoad89(pid||box.dataset.pid);
 box.dataset.sel=sel;
 box.querySelectorAll('.fx89-swatch').forEach(btn=>{
  const on=btn.dataset.fx89Id===sel;
  btn.classList.toggle('on',on);btn.setAttribute('aria-pressed',on?'true':'false');
 });
 const fact=box.querySelector('[data-fx89-fact]');
 if(fact)fact.textContent=gT(lampFxById89(sel).fact);
}

function lampFxAttachLook89(){
 const root=$('look');if(!root||root.querySelector('[data-fx89-picker]'))return;
 const pid=typeof curPid==='function'?curPid():null;if(!pid)return;
 const html=lampFxPickerHTML89(pid);
 const flame=root.querySelector('[data-flame81-picker]');
 if(flame){
  const card=flame.closest('.card')||flame;
  card.insertAdjacentHTML('beforeend',html);
  lampFxPickerBind89(card,pid);
 }else{
  const card=document.createElement('div');card.className='card';card.dataset.fx89Card='1';
  card.innerHTML=html;
  const sfx=root.querySelector('[data-sfx73],[data-reveal76]');
  if(sfx)root.insertBefore(card,sfx);else root.append(card);
  lampFxPickerBind89(card,pid);
 }
}

function songsTileArt89(){
 return `<svg class="songs88-hubart" viewBox="0 0 72 72" width="48" height="48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round">
  <path d="M30 14c-12 3-20 16-17 28c3 13 16 21 29 18c-11 7-26-1-29-17c-3-15 8-28 17-29z"/>
  <path d="M42 46V24h9"/>
  <ellipse cx="42" cy="46" rx="5.2" ry="3.6" transform="rotate(-22 42 46)" fill="currentColor" stroke="none"/>
  <path d="M58 42V20h9"/>
  <ellipse cx="58" cy="42" rx="5.2" ry="3.6" transform="rotate(-22 58 42)" fill="currentColor" stroke="none"/>
  <path d="M51 24h16"/>
 </svg>`;
}
function songsTileFix89(root){
 const h=root&&root.querySelector?root:document;
 const tiles=h.querySelectorAll?h.querySelectorAll('[data-songs88]'):[];
 tiles.forEach(tile=>{
  tile.hidden=false;
  tile.removeAttribute('hidden');
  tile.removeAttribute('onclick');
  if(!tile.type)tile.type='button';
  if(!tile.querySelector('.songs88-hubart')){
   const name=typeof gT==='function'?gT('Songs'):'Songs';
   const sub=typeof gT==='function'?gT('Sung by Luna.'):'Sung by Luna.';
   tile.innerHTML=songsTileArt89()+' '+name+'<small>'+sub+'</small>';
  }
  if(!tile._v89click){
   tile._v89click=1;
   tile.addEventListener('click',e=>{
    e.preventDefault();
    if(typeof MU!=='undefined')MU.s=null;
    if(typeof show==='function')show('songs88');
   });
  }
 });
}
function creditFix89(el){
 if(!el)return;
 el.querySelectorAll('.singcredit').forEach(n=>n.remove());
 if(el.querySelector('.lunacredit89'))return;
 const txt=typeof gT==='function'?gT('Singing: Luna. Played as recorded, with no pitch changes.'):'Singing: Luna. Played as recorded, with no pitch changes.';
 const escFn=typeof esc==='function'?esc:s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 el.insertAdjacentHTML('beforeend','<p class="soft card lunacredit89">'+escFn(txt)+'</p>');
}
function luTokenReady89(el){
 if(!el||!el.isConnected)return false;
 if(el.hidden)return false;
 const r=el.getClientRects();
 if(!r||!r.length||r[0].width<=0||r[0].height<=0)return false;
 const st=getComputedStyle(el);
 if(st.display==='none'||st.visibility==='hidden')return false;
 return true;
}
function luFocusGo89(){
 const root=document.getElementById('lookup');
 if(!root||!root.isConnected||typeof LU83==='undefined'||LU83.screen!==3)return false;
 let el=null,fact=false;
 if(LU83.order.every(Boolean)){
  el=root.querySelector('.lu83-planet-line');
  fact=true;
 }else{
  const i=LU83.order.findIndex(x=>!x);
  const id=i>=0&&typeof LU_PLANETS83!=='undefined'?LU_PLANETS83[i].id:null;
  el=id?root.querySelector('[data-lu-token="'+id+'"]'):null;
 }
 if(!luTokenReady89(el))return false;
 el.setAttribute('tabindex',fact?'-1':'0');
 try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(e){}
 try{el.focus({preventScroll:false})}catch(e){try{el.focus()}catch(err){}}
 return document.activeElement===el;
}
function luRefocus89(){
 const t0=performance.now();
 const tick=()=>{
  if(luFocusGo89())return;
  if(performance.now()-t0>=500){luFocusGo89();return}
  requestAnimationFrame(tick);
 };
 requestAnimationFrame(tick);
}
function bootQa89(){
 if(typeof retiredMusicHide63==='function'&&!retiredMusicHide63._v89){
  const prev=retiredMusicHide63;
  retiredMusicHide63=function(root){
   prev.apply(this,arguments);
   songsTileFix89(root);
  };
  retiredMusicHide63._v89=1;
 }
 if(typeof RENDER!=='undefined'&&RENDER.hub&&!RENDER.hub._v89songs){
  const hub=RENDER.hub;
  RENDER.hub=renderHub=function(){
   const r=hub.apply(this,arguments);
   songsTileFix89($('hub'));
   return r;
  };
  RENDER.hub._v89songs=1;
 }
 ['adults','about'].forEach(k=>{
  if(typeof RENDER==='undefined'||!RENDER[k]||RENDER[k]._v89credit)return;
  const r=RENDER[k];
  RENDER[k]=function(){
   const out=r.apply(this,arguments);
   creditFix89($(k));
   return out;
  };
  RENDER[k]._v89credit=1;
 });
 if(typeof luRefocus87==='function')luRefocus87=luRefocus89;
 if(typeof luRefocus88==='function')luRefocus88=luRefocus89;
 if(typeof luFocusAfterPlace86==='function')luFocusAfterPlace86=luRefocus89;
 songsTileFix89(document);
 const ad=$('adults'),ab=$('about');
 if(ad&&!ad.classList.contains('hidden'))creditFix89(ad);
 if(ab&&!ab.classList.contains('hidden'))creditFix89(ab);
}

function lampFxBoot89(){
 if(lampFxBoot89._on)return;lampFxBoot89._on=1;
 if(typeof lampMount73==='function'){
  const prev=lampMount73;
  lampMount73=function(host,mode){
   const r=prev.apply(this,arguments);
   lampFxInsert89(host,mode);
   return r;
  };
 }
 if(typeof lampPresent73==='function'){
  const prev=lampPresent73;
  lampPresent73=function(item){
   const r=prev.apply(this,arguments);
   const d=document.querySelector('dialog.lamp73-dialog');
   if(d)lampFxInsert89(d,'dialog');
   return r;
  };
 }
 if(typeof pWrap68==='function')pWrap68('renderLook',null,lampFxAttachLook89);
 if(typeof RENDER!=='undefined')RENDER.look=typeof renderLook==='function'?renderLook:RENDER.look;
 lampFxAttachLook89();
 const hero=document.querySelector('.today64');
 if(hero)lampFxInsert89(hero,'home');
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden)return;
  FX89_SMOKE.forEach(rec=>{rec.last=0});
 });
 bootQa89();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{lampFxBoot89();bootQa89()});
else {lampFxBoot89();bootQa89()}
setTimeout(()=>{lampFxBoot89();bootQa89()},0);

if(document.head&&!document.getElementById('v89css'))document.head.insertAdjacentHTML('beforeend',`<style id="v89css">
.today64.fx89-swap .lamp76-hero{animation:fx89-cross .7s ease}
@keyframes fx89-cross{from{opacity:.35}to{opacity:1}}
.fx89-layer{position:absolute;inset:0;pointer-events:none;z-index:1;overflow:visible}
.lamp73-shell{position:relative}
.lamp73-shell>.fx89-layer{z-index:3;border-radius:inherit}
.today64>.lamp76-hero>.fx89-layer{left:50%;top:48%;right:auto;bottom:auto;width:min(320px,92%);height:min(320px,54vw);transform:translate(-50%,-50%);z-index:0}
.today64[data-fx89="spiral"],.today64[data-fx89="smoke"],.today64[data-fx89="core"]{overflow:visible;padding-top:32px}
.today64>.lamp76-hero>.fx89-layer.fx89-spiral{width:min(252px,82%);height:min(252px,66vw);top:44%;z-index:1}
.fx89-spiral{transform-origin:50% 50%;overflow:visible;width:100%;height:100%;filter:drop-shadow(0 0 3px var(--f81-halo,#dbb06b))}
.fx89-spiral.asleep{transform:scale(.28) rotate(-40deg)}
.fx89-spiral.awake{transform:scale(1) rotate(0deg);transition:transform 8.5s cubic-bezier(.22,.61,.36,1)}
.fx89-spiral.still,.fx89-spiral.still.asleep,.fx89-spiral.still.awake{transform:scale(1);transition:none}
.fx89-spiral circle.t{fill:var(--f81-tip,#fbdcad)}
.fx89-spiral circle.c{fill:var(--f81-core,#efba64)}
.fx89-spiral circle.m{fill:var(--f81-mid,#dca64b)}
.fx89-spiral circle{stroke:var(--f81-deep,#855a00);stroke-width:.35;stroke-opacity:.35}
.fx89-spiral.awake:not(.still){animation:fx89-spin 96s linear infinite 8.5s}
@keyframes fx89-spin{to{transform:scale(1) rotate(360deg)}}
.fx89-shell,.fx89-mid,.fx89-hot{position:absolute;left:50%;top:56%;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none}
.fx89-shell{width:155%;height:155%;background:radial-gradient(circle at 50% 48%,color-mix(in oklab,var(--f81-halo,#dbb06b) 88%,transparent) 0%,color-mix(in oklab,var(--f81-mid,#dca64b) 58%,transparent) 36%,color-mix(in oklab,var(--f81-deep,#855a00) 16%,transparent) 58%,transparent 74%);filter:blur(11px);animation:fx89-breathe 11s ease-in-out infinite}
.fx89-mid{width:88%;height:88%;background:radial-gradient(circle at 50% 46%,color-mix(in oklab,var(--f81-core,#efba64) 96%,#fff) 0%,color-mix(in oklab,var(--f81-mid,#dca64b) 78%,transparent) 42%,transparent 70%);filter:blur(5px);animation:fx89-breathe 8s ease-in-out infinite reverse}
.fx89-hot{width:42%;height:48%;background:radial-gradient(circle at 50% 42%,#fff 0%,#fff 18%,var(--f81-tip,#fbdcad) 36%,color-mix(in oklab,var(--f81-core,#efba64) 80%,transparent) 58%,transparent 76%);filter:blur(1.2px);animation:fx89-hot 7s ease-in-out infinite;z-index:3}
.fx89-flame{position:absolute;left:50%;top:36%;width:22%;height:34%;transform:translate(-50%,-50%);border-radius:50% 50% 46% 46%;pointer-events:none;
 background:radial-gradient(ellipse at 50% 68%,#fff 0%,#fff 16%,var(--f81-tip,#fbdcad) 38%,var(--f81-core,#efba64) 58%,transparent 76%);
 filter:blur(1.4px);mix-blend-mode:plus-lighter;animation:fx89-hot 7s ease-in-out infinite;opacity:.95}
.today64.lamp76-night .fx89-flame,html[data-look-theme="dark"] .fx89-flame{mix-blend-mode:screen}
@keyframes fx89-breathe{0%,100%{transform:translate(-50%,-50%) scale(.92);opacity:.8}50%{transform:translate(-50%,-50%) scale(1.1);opacity:1}}
@keyframes fx89-hot{0%,100%{transform:translate(-50%,-50%) scale(.88);opacity:.9}50%{transform:translate(-50%,-50%) scale(1.14);opacity:1}}
.today64[data-fx89="core"] .lamp76-glow{opacity:.55;filter:blur(3px) saturate(1.15)}
.fx89-etrack{stroke:var(--f81-deep,#855a00);stroke-width:1.2;opacity:.18;stroke-linecap:round}
.fx89-ed{fill:var(--f81-tip,#fbdcad);stroke:var(--f81-core,#efba64);stroke-width:.6}
.fx89-ed:nth-child(2){fill:var(--f81-core,#efba64)}
.fx89-ed:nth-child(3){fill:#fff}
.fx89-ember{overflow:visible;filter:drop-shadow(0 0 4px var(--f81-halo,#dbb06b)) drop-shadow(0 0 8px var(--f81-core,#efba64))}
@keyframes fx89-dash{to{stroke-dashoffset:-100}}
.fx89-jelly-clip{position:absolute;left:25%;top:21%;width:50%;height:60%;border-radius:7px;overflow:hidden;pointer-events:none;
 -webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 10%,#000 90%,transparent 100%);
 mask-image:linear-gradient(180deg,transparent 0%,#000 10%,#000 90%,transparent 100%)}
.lamp73-shell:has([data-stage73="1"]) .fx89-jelly-clip,.lamp73-shell:has([data-stage73="2"]) .fx89-jelly-clip{left:28%;top:42%;width:44%;height:32%;border-radius:50%}
.lamp73-shell:has([data-stage73="3"]) .fx89-jelly-clip{left:29%;top:24%;width:42%;height:48%;border-radius:10px 10px 40% 40%}
.fx89-jelly-a,.fx89-jelly-b{position:absolute;inset:-30% 0;pointer-events:none;opacity:.7;
 background:repeating-linear-gradient(180deg,
  color-mix(in oklab,var(--f81-tip,#fff) 30%,#f8c 16%) 0 1.5px,
  color-mix(in oklab,var(--f81-core,#efba64) 22%,#8cf 18%) 3px,
  color-mix(in oklab,var(--f81-mid,#dca64b) 18%,#bf8 16%) 5.5px,
  color-mix(in oklab,var(--f81-halo,#dbb06b) 16%,#fd8 16%) 8px,
  transparent 11px);
 background-size:100% 22px;mix-blend-mode:overlay;animation:fx89-ripple 16s ease-in-out infinite}
.fx89-jelly-b{opacity:.45;mix-blend-mode:color-dodge;animation-delay:-8s;filter:hue-rotate(22deg) saturate(.85)}
@keyframes fx89-ripple{0%,100%{background-position:0 -16px;opacity:.4}20%{background-position:0 10px;opacity:.75}40%,78%{background-position:0 20px;opacity:.5}}
.fx89-jelly-up .fx89-jelly-a,.fx89-jelly-up .fx89-jelly-b{animation:fx89-ripple-up 3.6s ease-in-out 1}
@keyframes fx89-ripple-up{0%{background-position:0 -28px;opacity:.25}45%{background-position:0 16px;opacity:.85}100%{background-position:0 32px;opacity:.5}}
.today64.lamp76-night .fx89-jelly-a,html[data-look-theme="dark"] .fx89-jelly-a{mix-blend-mode:screen;opacity:.85}
.today64.lamp76-night .fx89-jelly-b,html[data-look-theme="dark"] .fx89-jelly-b{mix-blend-mode:screen;opacity:.4}
.today64>.lamp76-hero>.fx89-layer.fx89-smoke{width:min(340px,96%);height:min(340px,88vw);top:40%;z-index:1;overflow:visible}
.fx89-smoke-cv{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
html[data-look-theme="dark"] .fx89-smoke-cv,.today64.lamp76-night .fx89-smoke-cv{mix-blend-mode:screen;filter:saturate(1.25) brightness(1.15)}
.fx89-smoke-static{position:absolute;inset:-20%;pointer-events:none}
.fx89-smoke-static span{position:absolute;border-radius:50%;filter:blur(10px);background:radial-gradient(circle,var(--f81-halo,#dbb06b) 0%,transparent 70%);opacity:.45}
.fx89-smoke-static span:nth-child(1){width:46%;height:38%;left:18%;top:28%}
.fx89-smoke-static span:nth-child(2){width:40%;height:42%;left:44%;top:18%;background:radial-gradient(circle,var(--f81-core,#efba64) 0%,transparent 70%)}
.fx89-smoke-static span:nth-child(3){width:36%;height:34%;left:28%;top:8%;opacity:.35}
.fx89-smoke-static span:nth-child(4){width:50%;height:36%;left:22%;top:42%;background:radial-gradient(circle,var(--f81-tip,#fbdcad) 0%,transparent 70%);opacity:.3}
.fx89-picker{margin-top:18px;padding-top:12px;padding-bottom:28px;border-top:1px solid color-mix(in oklab,var(--ink) 14%,transparent)}
.fx89-tray{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:8px 0 10px}
.fx89-swatch{display:flex;flex-direction:column;align-items:center;gap:6px;min-height:112px;padding:8px 6px;border:2px solid transparent;border-radius:16px;background:transparent;color:var(--ink);font:inherit;line-height:1.2;cursor:pointer}
.fx89-swatch.on{border-color:var(--acc,#5b7a6a)}
.fx89-preview{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 40% 35%,color-mix(in oklab,var(--f81-tip,#fff) 55%,transparent) 0%,color-mix(in oklab,var(--card,#fffdf8) 80%,var(--f81-halo,#dbb06b) 20%) 70%);box-shadow:0 0 14px color-mix(in oklab,var(--f81-halo,#ccc) 45%,transparent);color:var(--f81-mid,#dca64b);flex:none;overflow:hidden}
.fx89-prev-svg{width:58px;height:58px;display:block}
.fx89-name{font-size:.85rem;font-weight:700;text-align:center;color:var(--ink)}
.fx89-fact{margin:.4em 0 0;font-size:.95rem;color:var(--ink);line-height:1.4}
.fx89-pv-glow{fill:var(--f81-halo,#dbb06b);opacity:.7}
.fx89-pv-spiral{animation:fx89-pv-spin 16s linear infinite}
@keyframes fx89-pv-spin{to{transform:rotate(360deg)}}
.fx89-pv-core .fx89-pv-s{fill:var(--f81-halo,#dbb06b);opacity:.55;animation:fx89-pv-b 4.8s ease-in-out infinite}
.fx89-pv-core .fx89-pv-m{fill:var(--f81-core,#efba64);animation:fx89-pv-b 3.6s ease-in-out infinite reverse}
.fx89-pv-core .fx89-pv-h{fill:var(--f81-tip,#fff)}
@keyframes fx89-pv-b{0%,100%{transform:scale(.92)}50%{transform:scale(1.08)}}
.fx89-pv-ember path{stroke-dasharray:6 16;animation:fx89-dash 3.8s linear infinite}
.fx89-pv-jelly .fx89-pv-rows{animation:fx89-pv-j 5s ease-in-out infinite}
@keyframes fx89-pv-j{0%,100%{transform:translateY(-3px)}50%{transform:translateY(4px)}}
.fx89-pv-smoke path{transform-origin:32px 40px;animation:fx89-pv-sm 6s ease-in-out infinite}
.fx89-pv-smoke path:nth-child(2){animation-delay:-2.5s}
@keyframes fx89-pv-sm{0%,100%{transform:translate(0,2px) scale(1)}50%{transform:translate(2px,-4px) scale(1.06)}}
html[data-look-theme="dark"] .fx89-preview,body.bedtime .fx89-preview{background:radial-gradient(circle at 40% 35%,color-mix(in oklab,var(--f81-core) 40%,#1d1f24) 0%,#1d1f24 76%);box-shadow:0 0 16px color-mix(in oklab,var(--f81-halo) 50%,transparent)}
html[data-look-theme="dark"] .fx89-jelly-a,html[data-look-theme="dark"] .today64.lamp76-night .fx89-jelly-a{mix-blend-mode:screen}
html[data-look-theme="contrast"] .fx89-name,html[data-look-theme="contrast"] .fx89-fact{color:#fff}
.today64>.lamp76-hero figcaption{position:relative;z-index:4;text-shadow:0 0 8px var(--card,#fffdf8),0 1px 0 var(--card,#fffdf8)}
html[data-look-theme="dark"] .today64>.lamp76-hero figcaption{text-shadow:0 0 8px #1d1f24,0 1px 0 #1d1f24}
@media(max-width:440px){
  .today64>.lamp76-hero>.fx89-layer{width:280px;height:280px}
  .fx89-tray{gap:8px}
  .fx89-swatch{min-height:108px;padding:6px 4px}
  .fx89-preview{width:58px;height:58px}
}
[data-songs88]{display:flex!important}
[data-songs88] .songs88-hubart{width:48px;height:48px;display:block;margin:0 0 2px;color:var(--ink)}
#adults .lunacredit89,#about .lunacredit89{display:block!important;color:var(--ink);font-size:1rem;line-height:1.45}
#adults .singcredit,#about .singcredit{display:none!important}
@media(prefers-reduced-motion:reduce){
  .fx89-spiral,.fx89-spiral.awake,.fx89-spiral.asleep,.fx89-shell,.fx89-mid,.fx89-hot,.fx89-flame,
  .fx89-ed,.fx89-ember,.fx89-jelly-a,.fx89-jelly-b,.fx89-jelly-up .fx89-jelly-a,.fx89-jelly-up .fx89-jelly-b,
  .fx89-pv-spiral,.fx89-pv-core .fx89-pv-s,.fx89-pv-core .fx89-pv-m,.fx89-pv-ember path,.fx89-pv-jelly .fx89-pv-rows,.fx89-pv-smoke path,
  .today64.fx89-swap .lamp76-hero{animation:none!important;transition:opacity .8s ease!important}
  .fx89-spiral,.fx89-spiral.awake,.fx89-spiral.asleep{transform:scale(1)!important}
  .fx89-shell,.fx89-mid,.fx89-hot{opacity:.9}
  .fx89-jelly-a,.fx89-jelly-b{opacity:.5;background-position:0 10px}
}
</style>`);
