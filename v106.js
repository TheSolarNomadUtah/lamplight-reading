/* v106: Patterns Everywhere / Patrones por todas partes.
   Calm, untimed Explore section: Grow a Fractal, Same Shape Big and Small,
   Sound Draws Shapes, Half and Quarter, and a deep fractal explorer.
   Also fixes v105 QA: Shell growth hydration, Bedtime breathe-guide at 390,
   Sound cards tucked turtle off the Home label, and a clearer turtle swim sound.
   No network, no new voices, original art, bedtime-safe. Do not wrap show(). */
(function(){
 const s=document.createElement('style');
 s.id='v106css';
 s.textContent=[
  '#btword{z-index:6;text-shadow:0 1px 10px rgba(3,4,10,.6)}',
  '@media (max-width:700px){body.bedtime #btword{top:18%;bottom:auto}}',
  '#soundcards>.turtle105{left:auto;right:14px;top:8px}',
  '#patterns{position:relative}',
  '#patterns>.turtle105{right:12px;top:8px;left:auto}',
  '#patterns .pat-units{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:16px 0}',
  '#patterns .hubtile{min-height:132px}',
  '#patterns canvas.pat-cv{display:block;width:100%;max-width:420px;height:auto;margin:12px auto;border-radius:16px;background:#0d0f1a;touch-action:none}',
  '#patterns .pat-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0}',
  '#patterns .pat-row button{min-height:48px;min-width:48px}',
  '#patterns .pat-row button.on{border-color:var(--acc,#4e6b5c);box-shadow:inset 0 0 0 2px var(--acc,#4e6b5c)}',
  '#patterns .pat-credit{font-size:.9rem}',
  '#patterns .pat-thread{margin:18px 0;padding:12px 16px;border-radius:16px;background:var(--card,#fffdf8);border:1px solid var(--soft,#e4dccb);font-size:1.05rem}',
  '#patterns .pat-zoombox{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start}',
  '@media (max-width:520px){#patterns .pat-zoombox{grid-template-columns:1fr}}',
  '#patterns .pat-art{display:flex;justify-content:center}',
  '#patterns .pat-art svg{width:140px;height:140px}',
  '#patterns .pat-gallery{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}',
  '#patterns .pat-gallery button{width:72px;height:72px;padding:4px;border-radius:12px;overflow:hidden}',
  '#patterns .pat-gallery canvas{width:100%;height:100%;display:block}',
  '#patterns .pat-lamp-look{display:flex;flex-direction:column;align-items:center;margin:18px 0}',
  '#patterns .pat-lamp-look svg{width:120px;height:120px;transition:transform 1.1s ease}',
  '#patterns .pat-lamp-look.zoom svg{transform:scale(1.85)}',
  '#patterns .pat-limit{margin:8px 0;font-size:1.05rem}',
  '#patterns .pat-jar{width:90px;height:140px;margin:8px auto;display:block}',
  '#patterns .pat-paper{width:200px;height:140px;margin:8px auto;display:block;cursor:pointer}'
  ,'#patterns .pat-wind{position:relative;max-width:520px;margin:16px auto;min-height:200px}'
  ,'#patterns .pat-wind-stage{position:relative;background:#0d0f1a;border-radius:16px;overflow:hidden;min-height:200px}'
  ,'#patterns .pat-wind-stage img{display:block;width:100%;height:auto;max-height:70vh;object-fit:contain;margin:0 auto;opacity:0;transition:opacity 1.6s ease}'
  ,'#patterns .pat-wind-stage img.on{opacity:1}'
  ,'#patterns.pat-wind-dim .pat-wind-stage{filter:brightness(.78) saturate(.92)}'
  ,'@media (prefers-reduced-motion:reduce){#patterns .pat-wind-stage img{transition:none}}'
 ].join('');
 document.head.appendChild(s);
})();

friendsLoad101=function(pid){
 const id=pid||(typeof curPid==='function'?curPid():'');
 const raw=typeof RAW!=='undefined'&&typeof safeJSON==='function'?safeJSON(RAW.get('lamp_friends101@'+id),null):null;
 const def=typeof friendDefault101==='function'?friendDefault101():{moments:0,stage:1,shown:1};
 const f={active:'lamp',offered:false,moth:friendNorm101(def),owl:friendNorm101(def),turtle:friendNorm101(def)};
 if(raw&&typeof raw==='object'){
  if(typeof FRIENDS101!=='undefined'&&FRIENDS101.includes(raw.active))f.active=raw.active;
  f.offered=!!raw.offered;
  f.moth=friendNorm101(raw.moth);
  f.owl=friendNorm101(raw.owl);
  f.turtle=friendNorm101(raw.turtle);
 }
 return f;
};

(function(){
 if(typeof SCARDS101!=='undefined'){
  const c=SCARDS101.find(x=>x.id==='turtle');
  if(c){c.en='A turtle swims';c.es='Una tortuga nada'}
 }
 if(typeof SCGAIN102==='object')SCGAIN102.turtle=2.1;
 const prev=typeof scPlay101==='function'?scPlay101:null;
 if(!prev)return;
 scPlay101=function(kind){
  if(kind!=='turtle')return prev(kind);
  scStop101();
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const dest=scBus101(c),t=c.currentTime+.02;
  const gk=SCGAIN102&&SCGAIN102.turtle!=null?SCGAIN102.turtle:2.1;
  try{SC101.master.gain.cancelScheduledValues(t)}catch(e){}
  SC101.master.gain.setValueAtTime(.22*gk,t);
  const W=typeof scWhite102==='function'?()=>scWhite102(c,2.8,22050):()=>scNoise101(c,2.8,22050);
  const wash=c.createBufferSource(),lp=c.createBiquadFilter(),wg=c.createGain();
  wash.buffer=W();wash.loop=true;
  lp.type='lowpass';lp.frequency.value=1100;lp.Q.value=.6;
  wash.connect(lp);lp.connect(wg);wg.connect(dest);
  wg.gain.setValueAtTime(.0001,t);
  wg.gain.linearRampToValueAtTime(.07,t+.45);
  wg.gain.setValueAtTime(.07,t+3.6);
  wg.gain.linearRampToValueAtTime(.0001,t+4.4);
  wash.start(t);wash.stop(t+4.5);SC101.nodes.push(wash,wg);
  const pl=c.createOscillator(),pg=c.createGain(),plp=c.createBiquadFilter();
  pl.type='sine';pl.frequency.setValueAtTime(420,t+.08);pl.frequency.exponentialRampToValueAtTime(140,t+.28);
  plp.type='lowpass';plp.frequency.value=900;
  if(typeof scEnv101==='function')scEnv101(pg,t+.08,.01,0,.2,.16);
  else{pg.gain.setValueAtTime(.0001,t+.08);pg.gain.linearRampToValueAtTime(.16,t+.1);pg.gain.exponentialRampToValueAtTime(.0001,t+.32)}
  pl.connect(plp);plp.connect(pg);pg.connect(dest);
  pl.start(t+.08);pl.stop(t+.36);SC101.nodes.push(pl);
  const paddles=[.55,1.45,2.35,3.25];
  paddles.forEach((off,i)=>{
   const dt=t+off,src=c.createBufferSource(),bp=c.createBiquadFilter(),g=c.createGain();
   src.buffer=typeof scNoise101==='function'?scNoise101(c,.22,18000):W();
   bp.type='bandpass';bp.frequency.value=180+i*18;bp.Q.value=1.1;
   if(typeof scEnv101==='function')scEnv101(g,dt,.03,.04,.16,.12);
   else{g.gain.setValueAtTime(.0001,dt);g.gain.linearRampToValueAtTime(.12,dt+.04);g.gain.exponentialRampToValueAtTime(.0001,dt+.22)}
   src.connect(bp);bp.connect(g);g.connect(dest);
   src.start(dt);src.stop(dt+.26);SC101.nodes.push(src);
  });
  SC101.playing='turtle';
  SC101.t=setTimeout(()=>{if(SC101.playing==='turtle')scStop101()},5200);
 };
})();

if(typeof LIVE99!=='undefined'&&LIVE99.indexOf('patterns')<0)LIVE99.push('patterns');
if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('patterns')<0)SECTIONS.push('patterns');
if(!$('patterns')&&document.querySelector('main'))document.querySelector('main').insertAdjacentHTML('beforeend','<section id="patterns" class="hidden"></section>');
if(typeof TURTLE_SECTIONS105!=='undefined'&&TURTLE_SECTIONS105.indexOf('patterns')<0)TURTLE_SECTIONS105.push('patterns');

const PAT106={unit:null,threadShown:false,lampZoom:false,frac:{},grow:{},ex:{},ch:{},pair:null};
function patT(s,v){return typeof gT==='function'?gT(s,v):s}
function patEsc(s){return typeof esc==='function'?esc(s):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function patReduced(){return typeof lampReduced73==='function'&&lampReduced73()}
function patNight(){
 try{
  const look=typeof RAW!=='undefined'?safeJSON(RAW.get('lamp_look')||localStorage.getItem('lamp_look'),null):null;
  if(look&&/night|dark/i.test(String(look.theme||look.color||look.paper||'')))return true;
  const b=getComputedStyle(document.body).backgroundColor||'';
  const m=b.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if(m)return(+m[1]+ +m[2]+ +m[3])<180;
 }catch(e){}
 return !!(typeof PT==='object'&&PT.dark);
}
function patPid(){return typeof curPid==='function'?curPid():''}
function patInk(){return '#72583f'}

function patTileArt106(){
 const ink=patInk();
 return `<svg class="lamp-art63" data-original-art="patterns106" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">
  <circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${ink}" stroke-width="2"/>
  <path d="M18 70 Q32 40 50 58 Q68 76 84 42" fill="none" stroke="${ink}" stroke-width="2"/>
  <path d="M50 22 L58 38 L74 40 L62 52 L66 68 L50 60 L34 68 L38 52 L26 40 L42 38Z" fill="#eac77d" stroke="${ink}" stroke-width="1.4"/>
  <polygon points="22,78 30,78 26,86" fill="#6f9a7a" stroke="${ink}" stroke-width="1.1"/>
 </svg>`;
}
function patUnitArt106(id){
 const ink=patInk();
 const plate=(inner)=>`<svg class="lamp-art63" data-original-art="pat-${id}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${ink}" stroke-width="2"/>${inner}</svg>`;
 if(id==='grow')return plate(`<path d="M50 82 V48 M50 62 L32 44 M50 62 L68 44 M32 44 L24 32 M32 44 L38 30 M68 44 L62 30 M68 44 L76 32" fill="none" stroke="${ink}" stroke-width="2"/><circle cx="50" cy="46" r="4" fill="#eac77d" stroke="${ink}"/>`);
 if(id==='same')return plate(`<ellipse cx="34" cy="50" rx="16" ry="10" fill="#5b7ea8" stroke="${ink}" stroke-width="1.5"/><path d="M34 50 Q28 46 24 50 Q28 54 34 50 Q40 46 44 50" fill="none" stroke="#fff6d8" stroke-width="1"/><path d="M62 62 Q72 44 80 58 Q86 70 74 72 Q60 70 62 62Z" fill="#c4a07a" stroke="${ink}" stroke-width="1.5"/>`);
 if(id==='sound')return plate(`<rect x="22" y="30" width="56" height="44" rx="4" fill="#e8c894" stroke="${ink}" stroke-width="1.6"/><path d="M30 52 Q40 40 50 52 Q60 64 70 52" fill="none" stroke="${ink}" stroke-width="1.6"/><circle cx="36" cy="46" r="2.2" fill="#6a5a48"/><circle cx="58" cy="58" r="2.2" fill="#6a5a48"/>`);
 if(id==='frac')return plate(`<circle cx="42" cy="50" r="22" fill="#eac77d" stroke="${ink}" stroke-width="1.8"/><path d="M42 28 V72 M42 50 H64" fill="none" stroke="${ink}" stroke-width="1.6"/><ellipse cx="74" cy="68" rx="8" ry="5" fill="#6f9a7a" stroke="${ink}" stroke-width="1.2"/>`);
 if(id==='zoom')return plate(`<path d="M28 60 Q36 36 50 44 Q64 52 72 32" fill="none" stroke="${ink}" stroke-width="2"/><circle cx="62" cy="40" r="16" fill="none" stroke="${ink}" stroke-width="1.8"/><path d="M74 52 L86 66" stroke="${ink}" stroke-width="2"/>`);
 if(id==='wind')return plate(`<rect x="22" y="28" width="56" height="44" rx="4" fill="#1b2838" stroke="${ink}" stroke-width="1.8"/><path d="M26 62 Q40 48 50 56 Q64 66 74 46" fill="none" stroke="#eac77d" stroke-width="1.5"/><circle cx="64" cy="40" r="4" fill="#f4e4c4"/>`);
 return plate('');
}

const PAT_GALLERY_CAP106=24;
function patGalKey(){return 'lamp_fractals106@'+patPid()}
function patGalLoad(){
 const raw=typeof RAW!=='undefined'?safeJSON(RAW.get(patGalKey()),null):null;
 const items=Array.isArray(raw&&raw.items)?raw.items.slice(0,PAT_GALLERY_CAP106):[];
 return {items,firstKeep:!!(raw&&raw.firstKeep)};
}
function patGalSave(g){
 if(typeof RAW==='undefined')return;
 if(typeof getProfiles==='function'&&!getProfiles().list.some(p=>p.id===patPid()))return;
 RAW.set(patGalKey(),JSON.stringify({items:(g.items||[]).slice(0,PAT_GALLERY_CAP106),firstKeep:!!g.firstKeep}));
}
function patGalKeep(recipe,title){
 const g=patGalLoad();
 if(g.items.length>=PAT_GALLERY_CAP106)return {ok:false,full:true,g};
 g.items.push({id:'p'+Date.now().toString(36),t:title||patT('A pattern'),recipe,made:Date.now()});
 let grew=false;
 if(!g.firstKeep){
  g.firstKeep=true;grew=true;
  try{if(typeof lampMoment73==='function')lampMoment73('notice')}catch(e){}
 }
 patGalSave(g);
 return {ok:true,g,grew};
}
function patGalLetGo(id){
 const g=patGalLoad();
 g.items=g.items.filter(x=>x.id!==id);
 patGalSave(g);
}
function patShell(title,inner){
 return `<div class="card math-card"><button type="button" onclick="patOpen106(null)">${patT('Patterns Everywhere')}</button>
  <h2>${title}</h2>${inner}</div>`;
}
function patOpen106(unit){
 const host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
 PAT106.unit=unit||null;
 if(PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
 if(typeof scStop101==='function'&&unit!=='sound')try{scStop101()}catch(e){}
 if(!unit)return renderPatterns106();
 if(unit==='grow')return patGrowNew106();
 if(unit==='same')return patSameDraw106();
 if(unit==='sound')return patSoundDraw106();
 if(unit==='frac')return patFracHome106();
 if(unit==='zoom')return patExNew106();
 if(unit==='wind')return patWindDraw106();
 return renderPatterns106();
}
function renderPatterns106(){
 const el=$('patterns');if(!el)return;
 const units=[
  ['grow',patT('Grow a Fractal'),patT('A shape that grows by the same rule.')],
  ['same',patT('Same Shape, Big and Small'),patT('One pattern at two scales.')],
  ['sound',patT('Sound Draws Shapes'),patT('A tone settles sand into a pattern.')],
  ['frac',patT('Half and Quarter'),patT('Share, fill, and fold, with pictures.')],
  ['zoom',patT('Zoom a Fractal'),patT('A slow, close look.')],
  ['wind',patT('Wind-down Gallery'),patT('A quiet look at real pictures, one at a time.')]
 ];
 let lamp='';
 try{
  const prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
  if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101='lamp';
  const art=typeof lampSvg73==='function'?lampSvg73(1,'',false):'';
  if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev;
  lamp=`<div class="pat-lamp-look${PAT106.lampZoom?' zoom':''}" id="patLamp106">
    <button type="button" class="hubtile" style="min-height:auto;width:auto;padding:12px 18px" onclick="patLampLook106()">${art}${patT('Look closer')}</button>
    <p class="soft" id="patLampMsg106">${PAT106.lampZoom?patT('Even a small glow has a soft swirl. Looking closer is how patterns show up.'):patT('Tap the Lamp to look closer at its glow.')}</p>
   </div>`;
 }catch(e){lamp=''}
 el.innerHTML=`<div class="card"><button type="button" onclick="show('hub')">${patT('Home')}</button>
  <h2>${patT('Patterns Everywhere')}</h2>
  <p class="soft">${patT('The same kinds of patterns show up in the sky, in a leaf, in a shell, and in a song. There is no timer. You can look as long as you like.')}</p></div>
  <div class="hubgrid pat-units">${units.map(([id,t,s])=>`<button type="button" class="hubtile" data-pat="${id}" onclick="patOpen106('${id}')">${patUnitArt106(id)}${t}<small>${s}</small></button>`).join('')}</div>
  ${lamp}`;
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
 if(typeof artRefresh63==='function')artRefresh63(el);
}
function patLampLook106(){
 PAT106.lampZoom=!PAT106.lampZoom;
 const box=$('patLamp106'),msg=$('patLampMsg106');
 if(box)box.classList.toggle('zoom',PAT106.lampZoom);
 if(msg)msg.textContent=PAT106.lampZoom?patT('Even a small glow has a soft swirl. Looking closer is how patterns show up.'):patT('Tap the Lamp to look closer at its glow.');
}
function patThreadMaybe106(kind){
 if(PAT106.threadShown)return '';
 if(Math.random()>0.34)return '';
 PAT106.threadShown=true;
 const lines={
  spirals:'The same spiral is in a galaxy, a shell, and your own ear. You are part of the pattern.',
  branching:'A tree, a river, and a bolt of lightning all branch in a similar way.',
  hex:'Six-sided shapes show up in honey, in stone, in snow, and on a turtle\'s shell.',
  waves:'The same kind of wave can move through water, sand, and air.',
  grow:'Every big branch is made of smaller copies of itself.',
  default:'The same kinds of patterns show up, big and small. You are part of them.'
 };
 return `<p class="pat-thread kline" id="patThread106">${patEsc(patT(lines[kind]||lines.default))}</p>`;
}

const PAT_SHAPES106=['tree','sunflower','triangle','dragon'];
const PAT_PAL106=[['#e6b454','#c45a3a','#fff6d8'],['#5b7ea8','#c2dce2','#e8c894'],['#6f9a7a','#eac77d','#f4e4c4'],['#8a5a7a','#e07a5f','#f4d35e']];
function patGrowNew106(){
 const g=PAT106.grow;
 g.shape=g.shape||'tree';g.pal=g.pal||0;g.depth=0;
 g.angle=g.shape==='sunflower'?137.5:28;g.msg='';
 patGrowDraw106();
}
function patGrowTone106(level){
 try{
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const freq=[261.63,293.66,329.63,392,440,523.25][Math.max(0,Math.min(level,5))];
  const vol=patNight()?.07:.14,t=c.currentTime;
  const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),g2=c.createGain();
  o.type='sine';o.frequency.value=freq;o2.type='sine';o2.frequency.value=freq/2;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+.65);
  g2.gain.setValueAtTime(0,t);g2.gain.linearRampToValueAtTime(vol*.45,t+.05);g2.gain.exponentialRampToValueAtTime(.0001,t+1.1);
  o.connect(g);g.connect(c.destination);o2.connect(g2);g2.connect(c.destination);
  o.start(t);o.stop(t+.7);o2.start(t);o2.stop(t+1.15);
 }catch(e){}
}
function patGrowDrawOn106(cv,rec){
 const x=cv.getContext('2d'),W=cv.width,H=cv.height;
 const night=patNight(),cols=PAT_PAL106[rec.pal||0]||PAT_PAL106[0];
 x.fillStyle=night?'#0d0f1a':'#fff8ec';x.fillRect(0,0,W,H);
 x.lineCap='round';x.lineJoin='round';
 const depth=Math.max(0,Math.min(6,rec.depth||0)),ang=rec.angle||28,shape=rec.shape||'tree';
 if(shape==='tree'){
  (function branch(px,py,len,a,d){
   if(d>depth||len<1.4)return;
   if(d>=5&&len<2.2)return;
   x.strokeStyle=cols[d%cols.length];
   x.lineWidth=Math.max(0.8,(6-d)*0.85*(W/320));
   x.beginPath();x.moveTo(px,py);
   const nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
   x.lineTo(nx,ny);x.stroke();
   const t=ang*Math.PI/180;
   branch(nx,ny,len*.68,a-t,d+1);branch(nx,ny,len*.68,a+t,d+1);
  })(W/2,H*0.92,H*0.22,Math.PI/2,0);
 }else if(shape==='sunflower'){
  const n=Math.min(240,8+depth*depth*8),phi=ang||137.5,c=Math.min(W,H)*0.018;
  for(let i=0;i<n;i++){
   const r=c*Math.sqrt(i),th=i*phi*Math.PI/180;
   x.fillStyle=cols[i%cols.length];
   x.beginPath();x.arc(W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.4,3-i/80),0,Math.PI*2);x.fill();
  }
 }else if(shape==='triangle'){
  (function tri(ax,ay,bx,by,cx,cy,d){
   if(d>=depth){
    x.fillStyle=cols[d%cols.length];
    x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.lineTo(cx,cy);x.closePath();x.fill();
    return;
   }
   const mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px=(cx+ax)/2,py=(cy+ay)/2;
   tri(ax,ay,mx,my,px,py,d+1);tri(mx,my,bx,by,nx,ny,d+1);tri(px,py,nx,ny,cx,cy,d+1);
  })(W/2,H*0.1,W*0.08,H*0.9,W*0.92,H*0.9,0);
 }else if(shape==='dragon'){
  let pts=[{x:W*0.22,y:H*0.55},{x:W*0.78,y:H*0.55}];
  for(let k=0;k<depth;k++){
   const next=[];
   for(let i=0;i<pts.length-1;i++){
    const a=pts[i],b=pts[i+1],dx=b.x-a.x,dy=b.y-a.y,sign=i%2===0?1:-1;
    next.push(a,{x:a.x+dx/2-sign*dy/2,y:a.y+dy/2+sign*dx/2});
   }
   next.push(pts[pts.length-1]);pts=next;
  }
  x.strokeStyle=cols[0];x.lineWidth=Math.max(1.2,3-depth*0.3);x.beginPath();
  pts.forEach((p,i)=>i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y));x.stroke();
 }
}
function patGrowRecipe106(){const g=PAT106.grow;return {kind:'grow',shape:g.shape,pal:g.pal,angle:g.angle,depth:g.depth}}
function patGrowDraw106(){
 const el=$('patterns');if(!el)return;
 const g=PAT106.grow,gal=patGalLoad();
 const shapes=PAT_SHAPES106.map(id=>`<button type="button" class="${g.shape===id?'on':''}" onclick="patGrowSet106('shape','${id}')">${patT({tree:'Tree',sunflower:'Sunflower',triangle:'Triangle',dragon:'Dragon'}[id])}</button>`).join('');
 const pals=PAT_PAL106.map((p,i)=>`<button type="button" class="${g.pal===i?'on':''}" aria-label="${patT('Palette {n}',{n:String(i+1)})}" onclick="patGrowSet106('pal',${i})" style="width:48px;height:48px;background:linear-gradient(135deg,${p[0]},${p[1]},${p[2]})"></button>`).join('');
 el.innerHTML=patShell(patT('Grow a Fractal'),`
  <p class="soft">${patT('Pick a seed, then tap Grow. The same rule repeats. There is no wrong shape.')}</p>
  <div class="pat-row">${shapes}</div>
  <div class="pat-row">${pals}</div>
  <canvas class="pat-cv" id="patGrowCv" width="360" height="360" aria-label="${patEsc(patT('Your fractal'))}"></canvas>
  <div class="pat-row">
   <button type="button" class="p" onclick="patGrowStep106()">${patT('Grow')}</button>
   <button type="button" onclick="patGrowTwist106(-4)">${patT('Bendier')}</button>
   <button type="button" onclick="patGrowTwist106(4)">${patT('Straighter')}</button>
   <button type="button" onclick="patGrowKeep106()">${patT('Keep')}</button>
  </div>
  <p class="soft" id="patGrowMsg">${g.msg?patEsc(g.msg):''}</p>
  <div id="patNature106"></div>
  <h3>${patT('Your gallery')}</h3>
  <p class="soft">${patT('Up to {n} on this device. When it is full, hold one to let it go.',{n:String(PAT_GALLERY_CAP106)})}</p>
  <div class="pat-gallery" id="patGal106"></div>
 `)+(g.depth>=3?patThreadMaybe106('grow'):'');
 const cv=$('patGrowCv');if(cv)patGrowDrawOn106(cv,g);
 patGalRender106();
 if(g.depth>=3)patNatureCard106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patGrowSet106(k,v){
 if(k==='shape'){PAT106.grow.shape=v;PAT106.grow.depth=0;PAT106.grow.angle=v==='sunflower'?137.5:28}
 if(k==='pal')PAT106.grow.pal=v;
 patGrowDraw106();
}
function patGrowStep106(){
 const g=PAT106.grow;
 if(g.depth>=6){g.msg=patT('That is as far as this seed grows.');patGrowDraw106();return}
 const go=()=>{g.depth++;patGrowTone106(g.depth-1);patGrowDraw106()};
 if(patReduced())return go();
 g.q=g.q||[];
 g.q.push(go);
 if(!g.busy){
  g.busy=true;
  const tick=()=>{const fn=g.q.shift();if(!fn){g.busy=false;return}fn();setTimeout(tick,420)};
  tick();
 }
}
function patGrowTwist106(d){
 const g=PAT106.grow;
 if(g.shape==='sunflower')g.angle=Math.max(120,Math.min(150,+(g.angle+d/2).toFixed(1)));
 else g.angle=Math.max(8,Math.min(70,g.angle+d));
 patGrowDraw106();
}
function patGrowKeep106(){
 const g=PAT106.grow;
 if(!g.depth){g.msg=patT('Grow it a little first, then you can keep it.');patGrowDraw106();return}
 const r=patGalKeep(patGrowRecipe106(),patT({tree:'Tree',sunflower:'Sunflower',triangle:'Triangle',dragon:'Dragon'}[g.shape]||'A pattern'));
 if(!r.ok&&r.full){g.msg=patT('The gallery is full. Hold one picture to let it go, then you can keep this one.');patGrowDraw106();return}
 g.msg=r.grew?patT('Kept. The one who is with you grew a little.'):patT('Kept on this device.');
 patGrowDraw106();
}
function patNatureCard106(){
 const host=$('patNature106');if(!host||host.dataset.on)return;
 host.dataset.on='1';
 const rows=[
  [patT('Fern'),patT('Many ferns uncurl in a spiral, and their leaflets repeat the same frond shape.'),'britannica.com'],
  [patT('Romanesco'),patT('Romanesco broccoli grows little cones in a spiral, each a smaller copy of the whole.'),'si.edu'],
  [patT('River delta'),patT('A river splits into smaller branches as it meets the sea.'),'usgs.gov'],
  [patT('Lightning'),patT('A lightning stroke branches as it finds its way through the air.'),'noaa.gov'],
  [patT('Tree'),patT('A tree\'s twigs repeat the same branching, smaller and smaller.'),'britannica.com']
 ];
 host.innerHTML=`<div class="card"><h3>${patT('Where nature grows this')}</h3>
  <ul class="kline">${rows.map(r=>`<li><b>${patEsc(r[0])}</b> — ${patEsc(r[1])} <span class="soft pat-credit">${patEsc(patT('This fact follows {src}.',{src:r[2]}))}</span></li>`).join('')}</ul></div>`;
}
function patGalRender106(){
 const host=$('patGal106');if(!host)return;
 const g=patGalLoad();
 host.innerHTML=g.items.map(it=>`<button type="button" data-gal="${it.id}" aria-label="${patEsc(it.t)}" title="${patEsc(patT('Hold to let go'))}"><canvas width="72" height="72"></canvas></button>`).join('')||`<p class="soft">${patT('Nothing kept yet.')}</p>`;
 host.querySelectorAll('[data-gal]').forEach(btn=>{
  const it=g.items.find(x=>x.id===btn.dataset.gal);if(!it)return;
  const cv=btn.querySelector('canvas');
  if(it.recipe&&it.recipe.kind==='zoom')patExThumb106(cv,it.recipe);
  else if(it.recipe)patGrowDrawOn106(cv,it.recipe);
  let hold=null;
  const start=()=>{hold=setTimeout(()=>{if(confirm(patT('Let this one go?'))){patGalLetGo(it.id);if(PAT106.unit==='zoom')patExDraw106();else patGrowDraw106()}},650)};
  const end=()=>clearTimeout(hold);
  btn.addEventListener('pointerdown',start);btn.addEventListener('pointerup',end);btn.addEventListener('pointerleave',end);
 });
}

const PAT_PAIRS106={
 spirals:{title:['Spirals','Espirales'],items:[
  {id:'galaxy',src:'science.nasa.gov',en:{t:'A spiral galaxy',c:'A spiral galaxy has arms that wind out from the center.'},es:{t:'Una galaxia espiral',c:'Una galaxia espiral tiene brazos que se enrollan desde el centro.'}},
  {id:'hurricane',src:'noaa.gov',en:{t:'A hurricane',c:'A hurricane forms a spiral of clouds and rain around a calm eye.'},es:{t:'Un huracán',c:'Un huracán forma una espiral de nubes y lluvia alrededor de un ojo en calma.'}},
  {id:'nautilus',src:'britannica.com',en:{t:'A nautilus shell',c:'A nautilus shell grows in a smooth spiral, so each new chamber is a little larger than the last.'},es:{t:'Una concha de nautilo',c:'Una concha de nautilo crece en una espiral suave, y cada cámara nueva es un poco más grande que la anterior.'}},
  {id:'sunflower',src:'si.edu',en:{t:'Sunflower seeds',c:'Many sunflower heads show two families of spirals, and the counts are often Fibonacci numbers such as 34 and 55.'},es:{t:'Semillas de girasol',c:'En muchas cabezas de girasol se ven dos familias de espirales, y las cuentas suelen ser números de Fibonacci, como 34 y 55.'}},
  {id:'cochlea',src:'britannica.com',en:{t:'The inner ear',c:'The cochlea of the inner ear is shaped like a spiral, which helps us hear high and low sounds.'},es:{t:'El oído interno',c:'La cóclea del oído interno tiene forma de espiral, y eso ayuda a oír sonidos agudos y graves.'}}
 ]},
 branching:{title:['Branching','Ramificaciones'],items:[
  {id:'treeb',src:'britannica.com',en:{t:'A tree',c:'A tree branches so its leaves can find the light.'},es:{t:'Un árbol',c:'Un árbol se ramifica para que sus hojas encuentren la luz.'}},
  {id:'river',src:'usgs.gov',en:{t:'A river',c:'Rivers branch into smaller streams as they gather water.'},es:{t:'Un río',c:'Los ríos se ramifican en arroyos más pequeños a medida que reúnen agua.'}},
  {id:'bolt',src:'noaa.gov',en:{t:'Lightning',c:'A lightning stroke branches as it finds its way through the air.'},es:{t:'Un rayo',c:'Un rayo se ramifica mientras busca su camino por el aire.'}},
  {id:'lungs',src:'britannica.com',en:{t:'Lungs',c:'The airways in the lungs branch into smaller and smaller tubes.'},es:{t:'Los pulmones',c:'Las vías de los pulmones se ramifican en tubos cada vez más pequeños.'}},
  {id:'leafvein',src:'si.edu',en:{t:'Veins in a leaf',c:'The veins in a leaf branch so water can reach every part.'},es:{t:'Las nervaduras de una hoja',c:'Las nervaduras de una hoja se ramifican para que el agua llegue a cada parte.'}}
 ]},
 hexagons:{title:['Hexagons','Hexágonos'],items:[
  {id:'honey',src:'si.edu',en:{t:'A honeycomb',c:'Honeybees build six-sided cells that pack together tightly.'},es:{t:'Un panal',c:'Las abejas construyen celdas de seis lados que encajan de forma apretada.'}},
  {id:'shellhex',src:'britannica.com',en:{t:'A turtle shell',c:'The plates on many turtle shells include six-sided shapes.'},es:{t:'Un caparazón de tortuga',c:'Las placas de muchos caparazones de tortuga incluyen formas de seis lados.'}},
  {id:'causeway',src:'usgs.gov',en:{t:"Giant's Causeway",c:'Cooling lava can crack into tall columns, often with six sides, as at the Giant\'s Causeway.'},es:{t:'La Calzada del Gigante',c:'La lava al enfriarse puede agrietarse en columnas altas, a menudo de seis lados, como en la Calzada del Gigante.'}},
  {id:'flake',src:'noaa.gov',en:{t:'A snowflake',c:'Ice crystals grow with six sides because of the way water molecules join.'},es:{t:'Un copo de nieve',c:'Los cristales de hielo crecen con seis lados por la forma en que se unen las moléculas de agua.'}}
 ]},
 waves:{title:['Waves','Ondas'],items:[
  {id:'ocean',src:'noaa.gov',en:{t:'Ocean waves',c:'Wind moving over water makes ocean waves.'},es:{t:'Olas del mar',c:'El viento que pasa sobre el agua forma las olas del mar.'}},
  {id:'ripples',src:'usgs.gov',en:{t:'Sand ripples',c:'Wind or water can leave ripple marks in sand.'},es:{t:'Ondas en la arena',c:'El viento o el agua pueden dejar marcas de ondas en la arena.'}},
  {id:'soundw',src:'nasa.gov',en:{t:'Sound',c:'Sound travels as waves through air.'},es:{t:'El sonido',c:'El sonido viaja como ondas a través del aire.'}}
 ]},
 symmetry:{title:['Symmetry','Simetría'],items:[
  {id:'butterfly',src:'si.edu',en:{t:'A butterfly',c:'A butterfly\'s two wings are a mirror pair, left and right.'},es:{t:'Una mariposa',c:'Las dos alas de una mariposa son un par en espejo, izquierda y derecha.'}},
  {id:'starfish',src:'noaa.gov',en:{t:'A sea star',c:'Many sea stars have five arms arranged around the center.'},es:{t:'Una estrella de mar',c:'Muchas estrellas de mar tienen cinco brazos alrededor del centro.'}},
  {id:'face',src:'britannica.com',en:{t:'A face',c:'A face is roughly a left-and-right mirror, though the two sides are not exactly the same.'},es:{t:'Un rostro',c:'Un rostro es, a grandes rasgos, un espejo izquierda-derecha, aunque los dos lados no son exactamente iguales.'}}
 ]}
};
function patPairLang106(item){
 const L=(typeof LANG==='string'&&LANG==='es')?'es':'en';
 return {id:item.id,src:item.src,t:item[L].t,c:item[L].c};
}
function patPairArt106(id){
 const ink=patInk();
 const g=(h)=>`<svg viewBox="0 0 120 120" width="140" height="140" aria-hidden="true">${h}</svg>`;
 if(id==='galaxy')return g(`<rect width="120" height="120" rx="12" fill="#0b1020"/><ellipse cx="60" cy="60" rx="40" ry="14" transform="rotate(-20 60 60)" fill="#c9b8e8" opacity=".3"/><ellipse cx="60" cy="60" rx="34" ry="10" transform="rotate(-20 60 60)" fill="none" stroke="#e6c07a" stroke-width="2"/><circle cx="60" cy="60" r="6" fill="#f4e4c4"/>`);
 if(id==='hurricane')return g(`<rect width="120" height="120" rx="12" fill="#1a3048"/><path d="M60 60 Q80 30 100 44 Q70 50 60 60 Q40 90 20 74 Q50 70 60 60Z" fill="#7ba9ba" stroke="${ink}"/><circle cx="60" cy="60" r="6" fill="#e8f0f4"/>`);
 if(id==='nautilus')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><path d="M90 70 C90 40 60 28 46 46 C30 70 70 92 86 70" fill="#d5ac87" stroke="${ink}" stroke-width="1.6"/><path d="M64 62 Q70 50 78 58 Q70 72 64 62" fill="none" stroke="${ink}"/>`);
 if(id==='sunflower')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><circle cx="60" cy="60" r="16" fill="#6a5a48" stroke="${ink}"/><g fill="#eac77d" stroke="${ink}">${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<ellipse cx="${60+Math.cos(a)*28}" cy="${60+Math.sin(a)*28}" rx="6" ry="11" transform="rotate(${i*30} ${60+Math.cos(a)*28} ${60+Math.sin(a)*28})"/>`}).join('')}</g>`);
 if(id==='cochlea')return g(`<rect width="120" height="120" rx="12" fill="#f4e4c4"/><path d="M86 64 C86 34 50 30 44 54 C40 74 70 80 74 64 C74 50 58 52 58 62" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`);
 if(id==='treeb')return g(`<rect width="120" height="120" rx="12" fill="#eef4e8"/><path d="M60 100 V58 M60 74 L40 52 M60 74 L80 52 M40 52 L32 38 M40 52 L46 36 M80 52 L74 36 M80 52 L88 38" fill="none" stroke="${ink}" stroke-width="2.2"/>`);
 if(id==='river')return g(`<rect width="120" height="120" rx="12" fill="#e8f0f4"/><path d="M20 30 Q40 40 38 70 Q36 100 60 110 M38 70 Q70 60 90 90 M38 70 Q20 80 16 100" fill="none" stroke="#5b7ea8" stroke-width="3"/>`);
 if(id==='bolt')return g(`<rect width="120" height="120" rx="12" fill="#1b2838"/><path d="M60 18 L48 52 H66 L50 102 L86 56 H64 L72 18Z" fill="#eac77d" stroke="${ink}" stroke-width="1.2"/>`);
 if(id==='lungs')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><path d="M60 24 V50 M60 50 Q36 48 32 78 Q36 100 58 90 M60 50 Q84 48 88 78 Q84 100 62 90" fill="none" stroke="${ink}" stroke-width="2"/><path d="M44 70 L34 64 M44 76 L34 82 M76 70 L86 64 M76 76 L86 82" fill="none" stroke="${ink}"/>`);
 if(id==='leafvein')return g(`<rect width="120" height="120" rx="12" fill="#eef4e8"/><path d="M60 16 Q96 60 60 106 Q24 60 60 16Z" fill="#8fbb92" stroke="${ink}"/><path d="M60 20 V100 M60 50 Q40 46 32 58 M60 50 Q80 46 88 58 M60 72 Q44 70 38 82 M60 72 Q76 70 82 82" fill="none" stroke="${ink}"/>`);
 if(id==='honey')return g(`<rect width="120" height="120" rx="12" fill="#fff6df"/>${[[40,40],[70,40],[25,66],[55,66],[85,66],[40,92],[70,92]].map(([x,y])=>`<polygon points="${x-12},${y} ${x-6},${y-10} ${x+6},${y-10} ${x+12},${y} ${x+6},${y+10} ${x-6},${y+10}" fill="#eac77d" stroke="${ink}"/>`).join('')}`);
 if(id==='shellhex')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><ellipse cx="64" cy="62" rx="30" ry="22" fill="#6f9a7a" stroke="${ink}" stroke-width="1.6"/><path d="M50 58 L64 48 L78 58 L64 72Z" fill="#c5ddd0" stroke="${ink}"/><ellipse cx="34" cy="64" rx="10" ry="7" fill="#e8c894" stroke="${ink}"/>`);
 if(id==='causeway')return g(`<rect width="120" height="120" rx="12" fill="#e8d4b0"/>${[[30,80],[54,70],[78,82],[42,96],[66,98]].map(([x,y],i)=>`<polygon points="${x-12},${y} ${x-6},${y-28-i*2} ${x+6},${y-28-i*2} ${x+12},${y}" fill="#9a9288" stroke="${ink}"/>`).join('')}`);
 if(id==='flake')return g(`<rect width="120" height="120" rx="12" fill="#1b2838"/><g stroke="#e0fbfc" fill="none" stroke-width="2" stroke-linecap="round">${[0,60,120].map(a=>`<path d="M60 60 L60 28" transform="rotate(${a} 60 60)"/><path d="M60 36 L52 28 M60 36 L68 28" transform="rotate(${a} 60 60)"/>`).join('')}</g>`);
 if(id==='ocean')return g(`<rect width="120" height="120" rx="12" fill="#1a3048"/><path d="M8 50 Q28 36 48 50 T88 50 T128 50" fill="none" stroke="#7ba9ba" stroke-width="3"/><path d="M8 70 Q28 56 48 70 T88 70 T128 70" fill="none" stroke="#7ba9ba" stroke-width="3"/><path d="M8 90 Q28 76 48 90 T88 90 T128 90" fill="none" stroke="#7ba9ba" stroke-width="3"/>`);
 if(id==='ripples')return g(`<rect width="120" height="120" rx="12" fill="#e8c894"/><path d="M8 44 Q28 34 48 44 T88 44 T128 44 M8 64 Q28 54 48 64 T88 64 T128 64 M8 84 Q28 74 48 84 T88 84 T128 84" fill="none" stroke="${ink}" stroke-width="2"/>`);
 if(id==='soundw')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><path d="M36 50 V70 L50 62 V58Z" fill="#c4a07a" stroke="${ink}"/><path d="M58 46 Q72 60 58 74 M68 38 Q90 60 68 82" fill="none" stroke="${ink}" stroke-width="2"/>`);
 if(id==='butterfly')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><path d="M60 30 V90" stroke="${ink}" stroke-width="2"/><path d="M60 50 Q28 20 24 58 Q30 80 60 66 Q90 80 96 58 Q92 20 60 50Z" fill="#e07a5f" stroke="${ink}"/>`);
 if(id==='starfish')return g(`<rect width="120" height="120" rx="12" fill="#e8f0f4"/><path d="M60 20 L68 48 L98 48 L74 66 L84 96 L60 78 L36 96 L46 66 L22 48 L52 48Z" fill="#e07a5f" stroke="${ink}"/>`);
 if(id==='face')return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/><ellipse cx="60" cy="62" rx="26" ry="30" fill="#e8c894" stroke="${ink}"/><circle cx="50" cy="58" r="3" fill="${ink}"/><circle cx="70" cy="58" r="3" fill="${ink}"/><path d="M52 74 Q60 80 68 74" fill="none" stroke="${ink}"/>`);
 return g(`<rect width="120" height="120" rx="12" fill="#fff2d8"/>`);
}
function patSameDraw106(fam){
 const el=$('patterns');if(!el)return;
 if(!fam){
  el.innerHTML=patShell(patT('Same Shape, Big and Small'),`
   <p class="soft">${patT('Pick a pattern. You will see it in more than one place and size.')}</p>
   <div class="hubgrid pat-units">${Object.keys(PAT_PAIRS106).map(k=>{
     const f=PAT_PAIRS106[k],L=(LANG==='es')?1:0;
     return `<button type="button" class="hubtile" onclick="patSameDraw106('${k}')">${patPairArt106(f.items[0].id)}${patEsc(f.title[L])}</button>`;
   }).join('')}</div>`);
  if(typeof turtlePlace105==='function')turtlePlace105('patterns');
  return;
 }
 const f=PAT_PAIRS106[fam];if(!f)return patSameDraw106();
 const L=(typeof LANG==='string'&&LANG==='es')?1:0;
 const items=f.items.map(patPairLang106);
 const a=items[0],b=items[Math.min(1,items.length-1)];
 el.innerHTML=patShell(patEsc(f.title[L]),`
  <p class="soft">${patT('The same kind of pattern, far away and up close.')}</p>
  <div class="pat-zoombox">
   <figure class="pat-art">${patPairArt106(a.id)}<figcaption class="kline"><b>${patEsc(a.t)}</b><br>${patEsc(a.c)}<br><span class="soft pat-credit">${patEsc(patT('This fact follows {src}.',{src:a.src}))}</span></figcaption></figure>
   <figure class="pat-art">${patPairArt106(b.id)}<figcaption class="kline"><b>${patEsc(b.t)}</b><br>${patEsc(b.c)}<br><span class="soft pat-credit">${patEsc(patT('This fact follows {src}.',{src:b.src}))}</span></figcaption></figure>
  </div>
  <div class="hubgrid" style="margin-top:12px">${items.slice(2).map(it=>`<div class="card"><div class="pat-art">${patPairArt106(it.id)}</div><p class="kline"><b>${patEsc(it.t)}</b></p><p class="kline">${patEsc(it.c)}</p><p class="soft pat-credit">${patEsc(patT('This fact follows {src}.',{src:it.src}))}</p></div>`).join('')}</div>
  ${patThreadMaybe106(fam==='hexagons'?'hex':fam)}
 `);
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}

const PAT_MODES106=[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4],[2,5],[3,5]];
function patSoundDraw106(){
 const el=$('patterns');if(!el)return;
 const st=PAT106.ch;if(st.n==null){st.n=1;st.m=2}
 el.innerHTML=patShell(patT('Sound Draws Shapes'),`
  <p class="soft">${patT('A steady tone can settle sand into a pattern on a plate. This is a quiet toy, not a real metal plate.')}</p>
  <canvas class="pat-cv" id="patChCv" width="360" height="360" aria-label="${patEsc(patT('Sand on a plate'))}"></canvas>
  <div class="pat-row">${PAT_MODES106.map(([n,m])=>`<button type="button" class="${st.n===n&&st.m===m?'on':''}" onclick="patSoundMode106(${n},${m})">${n} · ${m}</button>`).join('')}</div>
  <p class="soft">${patT('This fact follows {src}.',{src:'britannica.com'})}</p>
  ${patThreadMaybe106('waves')}
 `);
 patSoundRun106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patChladni106(x,y,n,m){
 return Math.cos(n*Math.PI*x)*Math.cos(m*Math.PI*y)-Math.cos(m*Math.PI*x)*Math.cos(n*Math.PI*y);
}
function patSoundMode106(n,m){PAT106.ch.n=n;PAT106.ch.m=m;patSoundDraw106()}
function patSoundTone106(n,m){
 try{
  const c=typeof ac==='function'?ac():null;if(!c)return;
  if(PAT106.ch.osc){try{PAT106.ch.osc.stop()}catch(e){}}
  const o=c.createOscillator(),g=c.createGain();
  o.type='sine';o.frequency.value=180+n*40+m*28;
  const vol=patNight()?.05:.1;
  g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(vol,c.currentTime+.08);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+1.6);
  o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+1.7);
  PAT106.ch.osc=o;
 }catch(e){}
}
function patSoundRun106(){
 const cv=$('patChCv');if(!cv)return;
 const x=cv.getContext('2d'),W=cv.width,H=cv.height,st=PAT106.ch,n=st.n,m=st.m;
 const N=patReduced()?80:220;
 st.parts=Array.from({length:N},()=>({x:Math.random(),y:Math.random()}));
 patSoundTone106(n,m);
 if(st.raf)cancelAnimationFrame(st.raf);
 const night=patNight(),start=performance.now(),dur=patReduced()?0:2400;
 const tick=(t)=>{
  const k=dur?Math.min(1,(t-start)/dur):1;
  x.fillStyle=night?'#0d0f1a':'#e8c894';x.fillRect(0,0,W,H);
  x.fillStyle=night?'#d8c8a4':'#5a4632';
  st.parts.forEach(p=>{
   const v=patChladni106(p.x,p.y,n,m);
   if(Math.abs(v)>0.08){
    const gx=-((patChladni106(p.x+0.01,p.y,n,m)-v)/0.01);
    const gy=-((patChladni106(p.x,p.y+0.01,n,m)-v)/0.01);
    const len=Math.hypot(gx,gy)||1;
    p.x=Math.max(0.02,Math.min(0.98,p.x+0.018*k*gx/len));
    p.y=Math.max(0.02,Math.min(0.98,p.y+0.018*k*gy/len));
   }
   x.beginPath();x.arc(p.x*W,p.y*H,1.6,0,Math.PI*2);x.fill();
  });
  if(k<1)st.raf=requestAnimationFrame(tick);
 };
 tick(start);
}

function patFracHome106(){
 const el=$('patterns');if(!el)return;
 el.innerHTML=patShell(patT('Half and Quarter'),`
  <p class="soft">${patT('You can share, fill, and fold. The words are half and quarter. There are no fraction marks.')}</p>
  <div class="hubgrid pat-units">
   <button type="button" class="hubtile" onclick="patShareNew106()">${patUnitArt106('frac')}${patT('Share a pie')}</button>
   <button type="button" class="hubtile" onclick="patJarNew106()"><svg class="lamp-art63" data-original-art="pat-jar" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${patInk()}" stroke-width="2"/><rect x="34" y="24" width="32" height="54" rx="6" fill="#c2dce2" stroke="${patInk()}"/><rect x="36" y="50" width="28" height="26" fill="#5b7ea8"/></svg>${patT('Fill a jar')}</button>
   <button type="button" class="hubtile" onclick="patFoldNew106()"><svg class="lamp-art63" data-original-art="pat-fold" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${patInk()}" stroke-width="2"/><rect x="22" y="30" width="56" height="40" fill="#f4e4c4" stroke="${patInk()}"/><path d="M50 30 V70" stroke="${patInk()}"/></svg>${patT('Fold a paper')}</button>
  </div>
 `);
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patShareNew106(){
 PAT106.frac={n:2,given:[],ok:false};
 patShareDraw106();
}
function patShareDraw106(){
 const el=$('patterns');if(!el)return;
 const f=PAT106.frac,n=f.n,given=f.given||[];
 const names={2:patT('two'),3:patT('three'),4:patT('four')};
 const word=n===2?patT('half'):n===4?patT('quarter'):patT('one part for each');
 const turtles=Array.from({length:n},(_,i)=>{
  const got=given[i];
  return `<button type="button" class="hubtile" ${got?'disabled':''} onclick="patShareGive106(${i})" aria-label="${patEsc(patT('Give a part to a turtle'))}">
    ${typeof turtleArt105==='function'?turtleArt105('tuck',72,80):(typeof friendArtInner101==='function'?friendArtInner101('turtle',1):'')}
    <small>${got?word:patT('waiting')}</small>
   </button>`;
 }).join('');
 const slices=Array.from({length:n},(_,i)=>{
  const a=-Math.PI/2+i*2*Math.PI/n,b=a+2*Math.PI/n,taken=given.includes(i);
  const x1=50+40*Math.cos(a),y1=50+40*Math.sin(a),x2=50+40*Math.cos(b),y2=50+40*Math.sin(b);
  return `<path d="M50 50 L${x1} ${y1} A40 40 0 0 1 ${x2} ${y2} Z" fill="${taken?'#c5ddd0':'#eac77d'}" stroke="${patInk()}" stroke-width="1.6"/>`;
 }).join('');
 el.innerHTML=patShell(patT('Share a pie'),`
  <p class="soft">${n===3?patT('Share this pie in three equal parts. One part for each turtle.'):patT('Share this pie fairly between {n} turtles.',{n:names[n]})}</p>
  <div class="pat-row">
   <button type="button" class="${n===2?'on':''}" onclick="PAT106.frac={n:2,given:[],ok:false};patShareDraw106()">${patT('two')}</button>
   <button type="button" class="${n===3?'on':''}" onclick="PAT106.frac={n:3,given:[],ok:false};patShareDraw106()">${patT('three')}</button>
   <button type="button" class="${n===4?'on':''}" onclick="PAT106.frac={n:4,given:[],ok:false};patShareDraw106()">${patT('four')}</button>
  </div>
  <svg class="pat-art" viewBox="0 0 100 100" width="180" height="180" aria-hidden="true">${slices}</svg>
  <div class="hubgrid">${turtles}</div>
  <p class="kline" id="patShareMsg">${f.ok?patEsc(patT('Each turtle has an equal part. That is a fair share.')):patEsc(patT('Tap a turtle to give it a part.'))}</p>
  <p class="soft">${patT('If it does not look fair yet, you can try again. Noticing is enough.')}</p>
 `);
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patShareGive106(i){
 const f=PAT106.frac;if(f.given.includes(i))return;
 const next=Array.from({length:f.n},(_,k)=>k).find(k=>!f.given.includes(k)&&k!==undefined);
 if(next==null)return;
 f.given.push(i);
 if(f.given.length===f.n){
  f.ok=true;
  try{if(typeof lampMoment73==='function')lampMoment73('notice')}catch(e){}
 }
 patShareDraw106();
}
function patJarNew106(){PAT106.frac={fill:0,goal:'half'};patJarDraw106()}
function patJarDraw106(){
 const el=$('patterns');if(!el)return;
 const f=PAT106.frac,goal=f.goal,fill=f.fill;
 const target=goal==='half'?2:1,ok=fill===target;
 const h=16+fill*28;
 el.innerHTML=patShell(patT('Fill a jar'),`
  <p class="soft">${goal==='half'?patT('Fill the jar halfway.'):patT('Fill the jar a quarter of the way.')}</p>
  <div class="pat-row">
   <button type="button" class="${goal==='half'?'on':''}" onclick="PAT106.frac={fill:0,goal:'half'};patJarDraw106()">${patT('halfway')}</button>
   <button type="button" class="${goal==='quarter'?'on':''}" onclick="PAT106.frac={fill:0,goal:'quarter'};patJarDraw106()">${patT('a quarter of the way')}</button>
  </div>
  <svg class="pat-jar" viewBox="0 0 80 140" aria-label="${patEsc(patT('A jar'))}">
   <rect x="16" y="16" width="48" height="108" rx="8" fill="#fff8ec" stroke="${patInk()}" stroke-width="2"/>
   <rect x="18" y="${124-h}" width="44" height="${h}" fill="#5b7ea8"/>
   <line x1="16" y1="70" x2="64" y2="70" stroke="${patInk()}" stroke-dasharray="3 3"/>
   <line x1="16" y1="97" x2="64" y2="97" stroke="${patInk()}" stroke-dasharray="2 4" opacity=".6"/>
  </svg>
  <div class="pat-row">
   <button type="button" onclick="patJarPour106(1)">${patT('Pour a little')}</button>
   <button type="button" onclick="patJarPour106(-1)">${patT('Pour some out')}</button>
   <button type="button" onclick="patJarNew106()">${patT('Try again')}</button>
  </div>
  <p class="kline">${ok?patEsc(goal==='half'?patT('The jar is halfway full.'):patT('The jar is a quarter of the way full.')):patEsc(patT('Pour until it looks right.'))}</p>
 `);
 if(ok)try{if(!f.grew&&typeof lampMoment73==='function'){lampMoment73('notice');f.grew=true}}catch(e){}
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patJarPour106(d){
 const f=PAT106.frac;f.fill=Math.max(0,Math.min(4,f.fill+d));patJarDraw106();
}
function patFoldNew106(){PAT106.frac={folds:0};patFoldDraw106()}
function patFoldDraw106(){
 const el=$('patterns');if(!el)return;
 const folds=PAT106.frac.folds||0;
 const lines=folds>=1?`<line x1="100" y1="10" x2="100" y2="130" stroke="${patInk()}" stroke-width="2"/>`:'';
 const lines2=folds>=2?`<line x1="10" y1="70" x2="190" y2="70" stroke="${patInk()}" stroke-width="2"/>`:'';
 const word=folds===0?patT('A whole paper.'):folds===1?patT('Folded in half.'):patT('Folded in half and in half again. That makes quarters.');
 el.innerHTML=patShell(patT('Fold a paper'),`
  <p class="soft">${patT('Tap the paper to fold it in half. Fold it again to make quarters.')}</p>
  <svg class="pat-paper" viewBox="0 0 200 140" role="button" tabindex="0" onclick="patFoldOnce106()" aria-label="${patEsc(patT('Fold the paper'))}">
   <rect x="10" y="10" width="180" height="120" fill="#f4e4c4" stroke="${patInk()}" stroke-width="2"/>
   ${lines}${lines2}
  </svg>
  <p class="kline">${patEsc(word)}</p>
  <div class="pat-row"><button type="button" onclick="patFoldNew106()">${patT('Try again')}</button></div>
 `);
 if(folds===2)try{const f=PAT106.frac;if(!f.grew&&typeof lampMoment73==='function'){lampMoment73('notice');f.grew=true}}catch(e){}
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patFoldOnce106(){
 const f=PAT106.frac;if(f.folds>=2)return;f.folds++;patFoldDraw106();
}

const PAT_ZOOM_MAX106=1e13,PAT_ZOOM_HOME106=3.5,PAT_MIN_PX106=2e-16,PAT_ITER_CAP106=240;
function patExKindHome106(kind){
 if(kind==='julia1')return {kind:'julia1',cx:0,cy:0,span:3.2,jr:-.745,ji:.113};
 if(kind==='julia2')return {kind:'julia2',cx:0,cy:0,span:3.2,jr:-.4,ji:.6};
 if(kind==='koch')return {kind:'koch',cx:.5,cy:.35,span:1.4};
 if(kind==='sierp')return {kind:'sierp',cx:.5,cy:.45,span:1.3};
 return {kind:'mandel',cx:-.5,cy:0,span:PAT_ZOOM_HOME106};
}
function patExNew106(){
 PAT106.ex=Object.assign({limit:false,msg:'',found:false,turtle:null,hold:0},patExKindHome106('mandel'));
 patExDraw106();
}
function patExIters106(zoom){
 return Math.min(PAT_ITER_CAP106,80+Math.floor(28*Math.log10(Math.max(1,zoom))));
}
function patExZoomOf106(span){return PAT_ZOOM_HOME106/Math.max(span,1e-20)}
function patExScaleLine106(zoom){
 if(zoom<20)return patT('A close look.');
 if(zoom<200)return patT('Deeper than a leaf compared with a shrub.');
 if(zoom<2e3)return patT('Deeper than a coin compared with a person.');
 if(zoom<2e4)return patT('Deeper than an ant compared with a bus.');
 if(zoom<2e5)return patT('Deeper than a grain of sand compared with a room.');
 if(zoom<2e6)return patT('Deeper than a grain of sand compared with a long path.');
 if(zoom<2e8)return patT('Deeper than a grain of sand compared with a mountain.');
 if(zoom<2e11)return patT('Deeper than a grain of sand compared with Earth.');
 return patT('Deeper than a tiny living cell compared with Earth.');
}
function patExHash106(s){
 let h=2166136261;
 for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}
 return h>>>0;
}
function patExCaption106(kind){
 if(kind==='julia1'||kind==='julia2')return patT('A Julia set uses one nearby number again and again. The shape changes with that number.');
 if(kind==='koch')return patT('A Koch edge keeps getting longer, while the area it encloses stays finite.');
 if(kind==='sierp')return patT('Each triangle in a Sierpinski pattern is a smaller copy of the whole.');
 return patT('The Mandelbrot set is made by repeating a simple rule. The edge stays detailed no matter how close you look, until this lamp cannot follow the numbers any farther.');
}
function patExRender106(cv,rec,opts){
 const o=opts||{},x=cv.getContext('2d'),W=cv.width,H=cv.height;
 const span=rec.span,cx=rec.cx,cy=rec.cy,kind=rec.kind||'mandel';
 const night=patNight(),px=span/Math.max(W,H);
 if(px<PAT_MIN_PX106)return false;
 const zoom=patExZoomOf106(span),iters=patExIters106(zoom);
 const pal=night?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
 const xmin=cx-span/2,ymin=cy-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
 const jr=rec.jr||0,ji=rec.ji||0;
 const toX=v=>(v-xmin)/dx,toY=v=>(v-ymin)/dy;
 if(kind==='koch'){
  x.fillStyle=pal[0];x.fillRect(0,0,W,H);
  x.strokeStyle=pal[4]||pal[pal.length-1];x.lineWidth=Math.max(1.2,2.2-(Math.log10(Math.max(1,zoom))*0.15));x.lineCap='round';x.lineJoin='round';
  const depth=Math.min(7,2+Math.floor(Math.log2(Math.max(2,iters/20))));
  (function koch(ax,ay,bx,by,d){
   if(d<=0){x.beginPath();x.moveTo(toX(ax),toY(ay));x.lineTo(toX(bx),toY(by));x.stroke();return}
   const ux=(bx-ax)/3,uy=(by-ay)/3,mx=ax+ux,my=ay+uy,nx=ax+2*ux,ny=ay+2*uy;
   const px=ax+ux+(ux/2-uy*Math.sqrt(3)/2),py=ay+uy+(uy/2+ux*Math.sqrt(3)/2);
   koch(ax,ay,mx,my,d-1);koch(mx,my,px,py,d-1);koch(px,py,nx,ny,d-1);koch(nx,ny,bx,by,d-1);
  })(0,0,1,0,depth);
 }else if(kind==='sierp'){
  x.fillStyle=pal[0];x.fillRect(0,0,W,H);
  const depth=Math.min(7,2+Math.floor(Math.log2(Math.max(2,iters/16))));
  (function tri(ax,ay,bx,by,cx,cy,d){
   if(d>=depth){
    x.fillStyle=pal[4]||pal[pal.length-1];
    x.beginPath();x.moveTo(toX(ax),toY(ay));x.lineTo(toX(bx),toY(by));x.lineTo(toX(cx),toY(cy));x.closePath();x.fill();
    return;
   }
   const mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px=(cx+ax)/2,py=(cy+ay)/2;
   tri(ax,ay,mx,my,px,py,d+1);tri(mx,my,bx,by,nx,ny,d+1);tri(px,py,nx,ny,cx,cy,d+1);
  })(0,0,1,0,.5,Math.sqrt(3)/2,0);
 }else{
  const img=x.createImageData(W,H),d=img.data;
  for(let j=0;j<H;j++){
   const y0=ymin+j*dy;
   for(let i=0;i<W;i++){
    const x0=xmin+i*dx;
    let zr,zi,cr,ci;
    if(kind==='mandel'){zr=0;zi=0;cr=x0;ci=y0}
    else{zr=x0;zi=y0;cr=jr;ci=ji}
    let k=0;
    while(k<iters&&zr*zr+zi*zi<=4){
     const nz=zr*zr-zi*zi+cr;zi=2*zr*zi+ci;zr=nz;k++;
    }
    const n=k/iters;
    const c=patExColor106(pal,n,kind==='mandel'&&n>=.999);
    const p=(j*W+i)*4;d[p]=c[0];d[p+1]=c[1];d[p+2]=c[2];d[p+3]=255;
   }
  }
  x.putImageData(img,0,0);
 }
  if(!o.noTurtle)patExMaybeTurtle106(x,cv,rec,zoom);
 return true;
}
function patExColor106(pal,n,inside){
 if(inside)return [20,16,28];
 const t=Math.max(0,Math.min(.999,n))*(pal.length-1),i=t|0,f=t-i;
 const a=patExHex106(pal[i]),b=patExHex106(pal[i+1]||pal[i]);
 return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f].map(v=>v|0);
}
function patExHex106(h){
 const n=h.replace('#','');
 return [parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)];
}
function patExGeomShade106(kind,x,y,iters){
 if(kind==='koch'){
  let ax=0,ay=0,bx=1,by=0,d=0,max=Math.min(7,2+Math.floor(Math.log2(Math.max(2,iters/20))));
  return patExKochDist106(x,y,ax,ay,bx,by,max)>0.008?0.15:0.85;
 }
 let ax=0,ay=0,bx=1,by=0,cx=.5,cy=Math.sqrt(3)/2,depth=Math.min(8,2+Math.floor(Math.log2(Math.max(2,iters/16))));
 return patExSierpIn106(x,y,ax,ay,bx,by,cx,cy,depth)?0.8:0.12;
}
function patExKochDist106(px,py,ax,ay,bx,by,d){
 const dx=bx-ax,dy=by-ay,len=Math.hypot(dx,dy)||1;
 const t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(len*len)));
 const dist=Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
 if(d<=0)return dist;
 const ux=dx/3,uy=dy/3,mx=ax+ux,my=ay+uy,nx=ax+2*ux,ny=ay+2*uy;
 const px2=ax+ux+(ux/2-uy*Math.sqrt(3)/2),py2=ay+uy+(uy/2+ux*Math.sqrt(3)/2);
 return Math.min(
  patExKochDist106(px,py,ax,ay,mx,my,d-1),
  patExKochDist106(px,py,mx,my,px2,py2,d-1),
  patExKochDist106(px,py,px2,py2,nx,ny,d-1),
  patExKochDist106(px,py,nx,ny,bx,by,d-1)
 );
}
function patExSierpIn106(px,py,ax,ay,bx,by,cx,cy,d){
 const area=(x1,y1,x2,y2,x3,y3)=>(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2));
 const a0=area(ax,ay,bx,by,cx,cy);
 if(Math.abs(area(px,py,bx,by,cx,cy))+Math.abs(area(ax,ay,px,py,cx,cy))+Math.abs(area(ax,ay,bx,by,px,py))-Math.abs(a0)>1e-8)return false;
 if(d<=0)return true;
 const mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px2=(cx+ax)/2,py2=(cy+ay)/2;
 if(patExSierpIn106(px,py,ax,ay,mx,my,px2,py2,d-1))return true;
 if(patExSierpIn106(px,py,mx,my,bx,by,nx,ny,d-1))return true;
 if(patExSierpIn106(px,py,px2,py2,nx,ny,cx,cy,d-1))return true;
 return false;
}
function patExMaybeTurtle106(x,cv,rec,zoom){
 const ex=PAT106.ex;
 if(zoom<80){ex.turtle=null;return}
 const q=8,qx=rec.cx.toFixed(q),qy=rec.cy.toFixed(q),qz=Math.round(Math.log10(zoom)*10);
 const seed=patExHash106((rec.kind||'mandel')+'|'+qx+'|'+qy+'|'+qz);
 if((seed%15)!==0){ex.turtle=null;return}
 const u=((seed>>>8)&1023)/1023,v=((seed>>>18)&1023)/1023;
 const tx=0.12+u*0.76,ty=0.12+v*0.76,W=cv.width,H=cv.height;
 ex.turtle={x:tx,y:ty};
 x.save();x.translate(tx*W,ty*H);x.scale(Math.min(W,H)*0.03,Math.min(W,H)*0.03);
 x.fillStyle='rgba(234,199,125,.9)';x.strokeStyle='rgba(255,246,216,.95)';x.lineWidth=.18;
 x.beginPath();x.ellipse(0,0,1.1,.8,0,0,Math.PI*2);x.fill();x.stroke();
 x.beginPath();x.arc(1.15,-.15,.38,0,Math.PI*2);x.fill();
 x.beginPath();x.arc(-.9,-.55,.28,0,Math.PI*2);x.arc(.7,-.55,.28,0,Math.PI*2);x.arc(-.9,.5,.28,0,Math.PI*2);x.arc(.7,.5,.28,0,Math.PI*2);x.fill();
 x.restore();
}
function patExChime106(){
 try{
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const t=c.currentTime,o=c.createOscillator(),g=c.createGain();
  o.type='sine';o.frequency.setValueAtTime(660,t);o.frequency.exponentialRampToValueAtTime(990,t+.18);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.08,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.6);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.65);
 }catch(e){}
}
function patExThumb106(cv,rec){patExRender106(cv,rec,{noTurtle:true})}

function patExDraw106(){
 const el=$('patterns');if(!el)return;
 const ex=PAT106.ex,zoom=patExZoomOf106(ex.span);
 const kinds=[['mandel',patT('Mandelbrot')],['julia1',patT('Julia one')],['julia2',patT('Julia two')],['koch',patT('Koch snowflake')],['sierp',patT('Sierpinski triangle')]];
 el.innerHTML=patShell(patT('Zoom a Fractal'),`
  <p class="soft">${patEsc(patExCaption106(ex.kind))}</p>
  <div class="pat-row">${kinds.map(([k,l])=>`<button type="button" class="${ex.kind===k?'on':''}" onclick="patExSetKind106('${k}')">${l}</button>`).join('')}</div>
  <canvas class="pat-cv" id="patExCv" width="360" height="360" aria-label="${patEsc(patT('A fractal you can zoom'))}"></canvas>
  <p class="kline" id="patExScale">${patEsc(patExScaleLine106(zoom))}</p>
  <p class="pat-limit kline" id="patExLimit">${ex.limit?patEsc(patT('This is as far as this lamp can see.')):''}</p>
  <p class="soft" id="patExMsg">${ex.msg?patEsc(ex.msg):patEsc(patT('Tap to zoom in slowly. Hold to keep this view. Back out zooms out.'))}</p>
  <div class="pat-row">
   <button type="button" onclick="patExBack106()">${patT('Back out')}</button>
   <button type="button" onclick="patExKeep106()">${patT('Keep this view')}</button>
  </div>
  <h3>${patT('Your gallery')}</h3>
  <p class="soft">${patT('Up to {n} on this device. When it is full, hold one to let it go.',{n:String(PAT_GALLERY_CAP106)})}</p>
  <div class="pat-gallery" id="patGal106"></div>
 `);
 const cv=$('patExCv');
 if(cv){
  const ok=patExRender106(cv,ex);
  if(!ok){ex.limit=true;const lim=$('patExLimit');if(lim)lim.textContent=patT('This is as far as this lamp can see.')}
  patExBind106(cv);
 }
 patGalRender106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patExSetKind106(kind){
 PAT106.ex=Object.assign({limit:false,msg:'',found:false,turtle:null,hold:0},patExKindHome106(kind));
 patExDraw106();
}
function patExCanZoom106(span){
 return (span/360)>=PAT_MIN_PX106 && patExZoomOf106(span)<=PAT_ZOOM_MAX106+1e-6;
}
function patExGo106(nx,ny,span,slow){
 const ex=PAT106.ex;
 if(!patExCanZoom106(span)){
  ex.limit=true;
  const lim=$('patExLimit');if(lim)lim.textContent=patT('This is as far as this lamp can see.');
  return;
 }
 const start={cx:ex.cx,cy:ex.cy,span:ex.span},end={cx:nx,cy:ny,span:span},cv=$('patExCv');
 const go=(k)=>{ex.cx=start.cx+(end.cx-start.cx)*k;ex.cy=start.cy+(end.cy-start.cy)*k;ex.span=start.span+(end.span-start.span)*k;ex.limit=false;if(cv)patExRender106(cv,ex);const sc=$('patExScale');if(sc)sc.textContent=patExScaleLine106(patExZoomOf106(ex.span))};
 if(patReduced()||!slow){go(1);return}
 const t0=performance.now(),dur=900;
 const tick=(t)=>{const k=Math.min(1,(t-t0)/dur),e=k*k*(3-2*k);go(e);if(k<1)requestAnimationFrame(tick)};
 requestAnimationFrame(tick);
}
function patExAt106(cv,clientX,clientY){
 const r=cv.getBoundingClientRect();
 const u=(clientX-r.left)/r.width,v=(clientY-r.top)/r.height;
 const aspect=cv.height/cv.width;
 return {u,v,x:exX(u),y:exY(v,aspect)};
 function exX(u){return PAT106.ex.cx+(u-0.5)*PAT106.ex.span}
 function exY(v,a){return PAT106.ex.cy+(v-0.5)*PAT106.ex.span*a}
}
function patExTap106(cv,ev){
 const p=patExAt106(cv,ev.clientX,ev.clientY),ex=PAT106.ex;
 if(ex.turtle){
  const d=Math.hypot(p.u-ex.turtle.x,p.v-ex.turtle.y);
  if(d<0.08){
   if(!ex.found){ex.found=true;patExChime106()}
   ex.msg=patT('A small glow was waiting in the pattern.');
   const m=$('patExMsg');if(m)m.textContent=ex.msg;
   return;
  }
 }
 patExGo106(p.x,p.y,ex.span/2.2,true);
}
function patExBack106(){
 const ex=PAT106.ex,home=patExKindHome106(ex.kind);
 if(ex.span>=home.span*0.98){Object.assign(ex,home,{limit:false,msg:'',found:false,turtle:null});patExDraw106();return}
 patExGo106(ex.cx,ex.cy,Math.min(home.span,ex.span*2.2),true);
}
function patExKeep106(){
 const ex=PAT106.ex;
 const r=patGalKeep({kind:'zoom',fractal:ex.kind,cx:ex.cx,cy:ex.cy,span:ex.span,jr:ex.jr,ji:ex.ji},patT('A close view'));
 ex.msg=(!r.ok&&r.full)?patT('The gallery is full. Hold one picture to let it go, then you can keep this one.'):(r.grew?patT('Kept. The one who is with you grew a little.'):patT('Kept on this device.'));
 patExDraw106();
}
function patExBind106(cv){
 let holding=0,moved=0,sx=0,sy=0,pointers=new Map();
 const clearHold=()=>{if(holding){clearTimeout(holding);holding=0}};
 cv.addEventListener('pointerdown',e=>{
  cv.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  sx=e.clientX;sy=e.clientY;moved=0;
  if(pointers.size===1)holding=setTimeout(()=>{holding=0;if(moved<10)patExKeep106()},700);
 });
 cv.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId))return;
  const prev=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  moved+=Math.hypot(e.clientX-sx,e.clientY-sy);
  if(pointers.size===2){
   clearHold();
   const pts=[...pointers.values()];
   const d0=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
   /* store last gap on the canvas */
   const last=cv._patGap||d0;cv._patGap=d0;
   if(last>8&&d0>8){
    const factor=Math.pow(last/d0,.55);
    const mid={x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2};
    const p=patExAt106(cv,mid.x,mid.y);
    patExGo106(p.x,p.y,PAT106.ex.span*factor,false);
   }
  }
 });
 const up=e=>{
  pointers.delete(e.pointerId);if(pointers.size<2)cv._patGap=0;
  const was=holding;clearHold();
  if(was&&moved<12)patExTap106(cv,e);
 };
 cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 cv.addEventListener('wheel',e=>{
  e.preventDefault();
  const p=patExAt106(cv,e.clientX,e.clientY);
  const factor=e.deltaY>0?1.18:1/1.18;
  patExGo106(p.x,p.y,PAT106.ex.span*factor,false);
 },{passive:false});
}


function patWindLicenseOk106(lic){
 const s=String(lic||'').trim();
 if(/^PD$/i.test(s)||/^public domain$/i.test(s))return true;
 if(/^CC0\b/i.test(s))return true;
 if(/^CC BY(?!-)/i.test(s))return true;
 return false;
}
function patWindLoad106(){
 if(PAT106.windItems)return Promise.resolve(PAT106.windItems);
 return fetch('gallery/core/manifest.json',{cache:'force-cache'}).then(r=>r.ok?r.json():[]).then(raw=>{
  const items=(Array.isArray(raw)?raw:[]).filter(it=>it&&it.file&&patWindLicenseOk106(it.license));
  PAT106.windItems=items;
  return items;
 }).catch(()=>{PAT106.windItems=[];return PAT106.windItems});
}
function patWindDraw106(){
 const el=$('patterns');if(!el)return;
 PAT106.windI=PAT106.windI||0;
 el.innerHTML=patShell(patT('Wind-down Gallery'),`
  <p class="soft">${patT('A quiet look at real pictures, one at a time. Tap the picture, or Next, when you are ready.')}</p>
  <div class="pat-wind" id="patWind106">
   <div class="pat-wind-stage" id="patWindStage106" role="img"></div>
   <p class="kline" id="patWindTitle106"></p>
   <p class="soft pat-credit" id="patWindCredit106"></p>
  </div>
  <div class="pat-row">
   <button type="button" onclick="patWindNext106(-1)">${patT('Previous picture')}</button>
   <button type="button" class="p" onclick="patWindNext106(1)">${patT('Next picture')}</button>
  </div>
 `);
 if(patNight()||document.body.classList.contains('bedtime'))el.classList.add('pat-wind-dim');
 else el.classList.remove('pat-wind-dim');
 patWindLoad106().then(items=>{
  if(!items.length){
   const c=$('patWindCredit106');
   if(c)c.textContent=patT('These pictures are not on this device yet.');
   return;
  }
  patWindShow106(0,true);
  const stage=$('patWindStage106');
  if(stage&&!stage.dataset.bound){
   stage.dataset.bound='1';
   stage.addEventListener('click',()=>patWindNext106(1));
  }
 });
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
}
function patWindShow106(i,instant){
 const items=PAT106.windItems||[];if(!items.length)return;
 const n=items.length;i=((i%n)+n)%n;PAT106.windI=i;
 const it=items[i],stage=$('patWindStage106');if(!stage)return;
 const L=(typeof LANG==='string'&&LANG==='es')?'es':'en';
 const alt=L==='es'?(it.alt_es||it.alt_en||it.title||''):(it.alt_en||it.title||'');
 const src='gallery/core/'+String(it.file).replace(/^\/+/,'');
 const img=new Image();
 img.alt=alt;img.src=src;
 const go=()=>{
  const old=[...stage.querySelectorAll('img')];
  img.className='';
  stage.appendChild(img);
  const reveal=()=>{img.classList.add('on');old.forEach(o=>{
   if(instant||patReduced()){o.remove();return}
   o.classList.remove('on');
   setTimeout(()=>{if(o.parentNode)o.remove()},1700);
  });};
  if(instant||patReduced())reveal();
  else requestAnimationFrame(()=>requestAnimationFrame(reveal));
  const t=$('patWindTitle106');if(t)t.textContent=it.title||'';
  const c=$('patWindCredit106');if(c)c.textContent=it.credit||[it.artist,it.year,it.license].filter(Boolean).join(', ');
  stage.setAttribute('aria-label',alt||it.title||'');
 };
 if(img.complete)go();else img.onload=go;
}
function patWindNext106(d){
 const items=PAT106.windItems||[];if(!items.length)return;
 patWindShow106((PAT106.windI||0)+(d||1),false);
}

function patTile106(){
 const grid=document.querySelector('#hub .hubgrid,#hub .grid,.hubgrid');
 if(!grid||grid.querySelector('[data-patterns106]'))return;
 const paint=[...grid.querySelectorAll('button,[role="button"],.hubtile')].find(b=>(b.getAttribute('onclick')||'').includes("show('paint')"));
 const btn=document.createElement('button');
 btn.type='button';btn.className='hubtile';btn.setAttribute('data-patterns106','1');
 btn.setAttribute('onclick',"show('patterns')");
 btn.innerHTML=patTileArt106()+patT('Patterns Everywhere');
 if(paint&&paint.parentNode===grid)paint.after(btn);else grid.appendChild(btn);
 if(typeof artRefresh63==='function')artRefresh63(btn);
}

const _afterShow95_106=typeof afterShow95==='function'?afterShow95:null;
afterShow95=function(id){
 if(_afterShow95_106)try{_afterShow95_106(id)}catch(e){}
 try{if(id==='hub')patTile106()}catch(e){}
 try{if(id==='patterns'){if(!PAT106.unit)renderPatterns106();else patOpen106(PAT106.unit)}}catch(e){}
};
const _renderHub106=typeof renderHub==='function'?renderHub:null;
if(_renderHub106){
 renderHub=function(){
  _renderHub106();
  try{patTile106()}catch(e){}
 };
}
if(typeof RENDER==='object'){
 const prev=RENDER.patterns;
 RENDER.patterns=function(){if(typeof prev==='function')try{prev()}catch(e){}renderPatterns106()};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{try{patTile106()}catch(e){}});
else try{patTile106()}catch(e){}
