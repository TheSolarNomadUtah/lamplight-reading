// Untimed early-math units for Explore: Counting, Shapes, and Adding to 10.
// English and Spanish. Code-drawn art, synthesized tones, no new voices.
// Practice is untimed. Companion growth uses notice and retry, never speed.
// Section id is "math" — not the retired Number Music id "numbers".
// This file does not wrap show(), so the v99 Back wrap stays outermost.

if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('math')<0)SECTIONS.push('math');
if(typeof LIVE99!=='undefined'&&LIVE99.indexOf('math')<0)LIVE99.push('math');
if(!$('math')&&document.querySelector('main'))document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="math" class="hidden"></section>');

const MATH={unit:null,round:0,missed:false,credited:false,n:0,tapped:null,want:'',mode:'',filled:0,start:0,msg:'',shapes:null};
const MATH_SHAPES=['circle','triangle','square','rectangle'];
const MATH_SCALE=[261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25,587.33,659.25];

function mathT(s,o){return typeof gT==='function'?gT(s,o):s}
function mathStop(){
 MATH.unit=null;
 try{if(typeof musicStop==='function'&&MATH._osc){}}catch(e){}
}
function mathTone(freq,dur,vol){
 try{
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;
  o.type='sine';o.frequency.value=freq;
  g.gain.setValueAtTime(0.0001,t);
  g.gain.linearRampToValueAtTime(vol||.11,t+.05);
  g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||.32));
  o.connect(g).connect(c.destination);o.start(t);o.stop(t+(dur||.32)+.06);
 }catch(e){}
}
function mathCountTone(i){mathTone(MATH_SCALE[Math.max(0,Math.min(i,MATH_SCALE.length-1))],.28,.11)}
function mathYes(){mathTone(392,.22,.1);setTimeout(()=>mathTone(523.25,.4,.12),140)}
function mathHmm(){mathTone(196,.35,.07)}

function mathCredit(reason){
 if(MATH.credited&&reason==='notice')return;
 if(reason==='notice')MATH.credited=true;
 try{if(typeof lampMoment73==='function')lampMoment73(reason)}catch(e){}
 if(reason==='notice'){
  try{if(typeof markDay==='function')markDay('games')}catch(e){}
  try{if(typeof glowAdd==='function')glowAdd('games')}catch(e){}
 }
}

function mathArtTurtle(){
 if(typeof turtleArt105==='function')return turtleArt105('count',72,80).replace('class="turtleArt105"','class="turtleArt105 math-turtle"');
 const ink='#72583f';
 return `<svg class="math-turtle" viewBox="0 0 80 90" width="72" height="80" aria-hidden="true" focusable="false">
  <ellipse cx="40" cy="82" rx="18" ry="5" fill="#e8d4b0" stroke="none" opacity=".55"/>
  <ellipse cx="40" cy="50" rx="22" ry="16" fill="#6f9a7a" stroke="${ink}" stroke-width="1.8"/>
  <polygon points="40,38 50,50 40,58 30,50" fill="#c5ddd0" stroke="${ink}" stroke-width="1"/>
  <ellipse cx="40" cy="28" rx="8" ry="7" fill="#e8c894" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="37" cy="27" r="1.2" fill="${ink}" stroke="none"/>
  <circle cx="43" cy="27" r="1.2" fill="${ink}" stroke="none"/>
 </svg>`;
}
function mathCountKind(){return MATH.countKind==='turtle'?'turtle':'lamp'}
function mathCountArt(){return mathCountKind()==='turtle'?mathArtTurtle():mathArtLamp()}
function mathArtLamp(kind){
 const ink='#72583f';
 const added=kind==='added';
 const base=added?'#6f8f7c':'#c4a07a';
 const body=added?'#cfe3d6':'#f4e0b0';
 const cap=added?'#7eaa88':'#efc77a';
 const glow=added?'#c5d9cc':'#e8d4b0';
 return `<svg class="math-lamp${added?' added':''}" viewBox="0 0 80 90" width="72" height="80" aria-hidden="true" focusable="false">
  <ellipse cx="40" cy="82" rx="18" ry="5" fill="${glow}" stroke="none" opacity=".55"/>
  <path d="M28 70 H52 L48 78 H32Z" fill="${base}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M34 40 Q26 58 32 70 H48 Q54 58 46 40Z" fill="${body}" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"/>
  <ellipse cx="40" cy="36" rx="16" ry="8" fill="${cap}" stroke="${ink}" stroke-width="1.8"/>
  <path d="M40 28 Q42 18 40 12" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round"/>
 </svg>`;
}
function mathArtShape(kind,opt){
 const ink='#72583f';
 const size=(opt&&opt.size)||88;
 const rot=(opt&&opt.rot)||0;
 const fill={circle:'#eac77d',triangle:'#8fbb92',square:'#96bfd5',rectangle:'#e8c894'}[kind]||'#f4e4c4';
 const inner={
  circle:`<circle cx="50" cy="50" r="28" fill="${fill}" stroke="${ink}" stroke-width="2.2"/>`,
  triangle:`<path d="M50 20 L78 74 H22Z" fill="${fill}" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"/>`,
  square:`<rect x="22" y="22" width="56" height="56" rx="4" fill="${fill}" stroke="${ink}" stroke-width="2.2"/>`,
  rectangle:`<rect x="14" y="30" width="72" height="40" rx="5" fill="${fill}" stroke="${ink}" stroke-width="2.2"/>`
 }[kind];
 return `<svg class="math-shape" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="47" fill="#fff2d8" stroke="${ink}" stroke-width="2"/><g transform="rotate(${rot} 50 50)">${inner}</g></svg>`;
}
function mathShapePool(want){
 const all=MATH_SHAPES.slice();
 if(want==='rectangle')return all.filter(s=>s!=='square');
 if(want==='square')return all.filter(s=>s!=='rectangle');
 return all;
}
function mathShapeStamp(){
 const art=[];
 (MATH.shapes||[]).forEach(()=>{
  art.push({rot:Math.round((Math.random()*36-18)*10)/10,size:70+Math.floor(Math.random()*20)});
 });
 MATH.shapeArt=art;
}
function mathTileArt(){
 const ink='#72583f';
 return `<svg class="lamp-art63" data-original-art="math" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">
  <circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${ink}" stroke-width="2"/>
  <rect x="22" y="54" width="16" height="22" rx="2" fill="#8fbb92" stroke="${ink}" stroke-width="1.8"/>
  <rect x="42" y="40" width="16" height="36" rx="2" fill="#96bfd5" stroke="${ink}" stroke-width="1.8"/>
  <rect x="62" y="28" width="16" height="48" rx="2" fill="#eac77d" stroke="${ink}" stroke-width="1.8"/>
 </svg>`;
}

function mathShell(title,inner){
 return `<div class="card math-card"><button type="button" data-math-home onclick="mathOpen(null)">${mathT('Numbers')}</button>
  <h2>${title}</h2>${inner}</div>`;
}
function mathMsg(){return `<p class="math-msg" id="mathmsg" role="status" aria-live="polite">${esc(MATH.msg||'')}</p>`}

function mathOpen(unit){
 MATH.unit=unit||null;MATH.round=0;MATH.missed=false;MATH.credited=false;MATH.msg='';
 if(!unit)return renderMath();
 if(unit==='count')return mathCountNew();
 if(unit==='shapes')return mathShapeNew();
 if(unit==='ten')return mathTenNew();
 return renderMath();
}

function renderMath(){
 const el=$('math');if(!el)return;
 if(MATH.unit==='count')return mathCountDraw();
 if(MATH.unit==='shapes')return mathShapeDraw();
 if(MATH.unit==='ten')return mathTenDraw();
 el.innerHTML=`<div class="card"><button type="button" onclick="show('hub')">${mathT('Home')}</button>
  <h2>${mathT('Numbers')}</h2>
  <p class="soft">${mathT('Count, add, and notice. There is no timer. You can take your time and try again.')}</p></div>
  <div class="hubgrid math-units">
   <button type="button" class="hubtile" data-math="count" onclick="mathOpen('count')">${mathArtLamp()}${mathT('Counting')}<small>${mathT('How many lamps or turtles?')}</small></button>
   <button type="button" class="hubtile" data-math="shapes" onclick="mathOpen('shapes')">${mathArtShape('triangle',{size:72})}${mathT('Shapes')}<small>${mathT('Circles, triangles, squares, and rectangles.')}</small></button>
   <button type="button" class="hubtile" data-math="ten" onclick="mathOpen('ten')">${mathTileArt()}${mathT('Adding to 10')}<small>${mathT('Make ten at your own pace.')}</small></button>
  </div>`;
 if(typeof artRefresh63==='function')artRefresh63(el);
}

function mathCountNew(){
 MATH.n=1+Math.floor(Math.random()*10);
 MATH.tapped=Array(MATH.n).fill(0);
 MATH.countKind=MATH.countKind==='turtle'?'lamp':'turtle';
 MATH.missed=false;MATH.credited=false;
 MATH.msg=mathCountKind()==='turtle'?mathT('Tap each turtle, then choose how many you see.'):mathT('Tap each lamp, then choose how many you see.');
 mathCountDraw();
}
function mathCountDraw(){
 const el=$('math');if(!el)return;
 const n=MATH.n,tapped=MATH.tapped||[];
 const turtle=mathCountKind()==='turtle';
 const row=n>=6?' math-lamps-5':'';
 let lamps='<div class="math-lamps'+row+'" role="group" aria-label="'+esc(turtle?mathT('Turtles'):mathT('Lamps'))+'">';
 for(let i=0;i<n;i++){
  const ord=tapped[i]||0;
  const label=ord?(turtle?mathT('Turtle {n}',{n:String(ord)}):mathT('Lamp {n}',{n:String(ord)})):(turtle?mathT('Turtle'):mathT('Lamp'));
  lamps+=`<button type="button" class="math-lamp-btn${ord?' on':''}" data-i="${i}" aria-pressed="${ord?'true':'false'}" aria-label="${esc(label)}" onclick="mathCountTap(${i})">${mathCountArt()}${ord?`<span class="math-count">${ord}</span>`:''}</button>`;
 }
 lamps+='</div>';
 let nums='<div class="math-nums" role="group" aria-label="'+esc(mathT('How many?'))+'">';
 for(let i=1;i<=10;i++){
  nums+=`<button type="button" class="tile" data-n="${i}" onclick="mathCountPick(${i})">${typeof gNum==='function'?gNum(i):i}</button>`;
 }
 nums+='</div>';
 el.innerHTML=mathShell(mathT('Counting'),`<p class="soft">${mathT('There is no timer.')}</p>${lamps}${nums}${mathMsg()}
  <p><button type="button" onclick="mathCountNew()">${mathT('Another count')}</button></p>`);
}
function mathCountTap(i){
 if(!MATH.tapped||MATH.credited)return;
 if(!MATH.tapped[i]){
  const soFar=MATH.tapped.filter(Boolean).length+1;
  MATH.tapped[i]=soFar;
  mathCountTone(soFar-1);
 }
 mathCountDraw();
}
function mathCountPick(n){
 if(n===MATH.n){
  MATH.msg=mathT('You counted them. There are {n}.',{n:String(MATH.n)});
  mathYes();
  if(MATH.missed)mathCredit('retry');
  mathCredit('notice');
 }else{
  MATH.missed=true;
  MATH.msg=mathCountKind()==='turtle'?mathT('Try again. Count slowly, one turtle at a time.'):mathT('Try again. Count slowly, one lamp at a time.');
  mathHmm();
 }
 mathCountDraw();
}

function mathShapeName(k){return mathT({circle:'circle',triangle:'triangle',square:'square',rectangle:'rectangle'}[k]||k)}
function mathShapeGender(k){
 const g=(typeof DICT==='object'&&DICT[k+'.gender'])||'m';
 return g==='f'?'f':'m';
}
function mathShapeLex(kind,g){
 const key='shape-art-'+kind+'-'+g;
 if(typeof DICT==='object'&&DICT[key])return DICT[key];
 return ({a:{m:'a',f:'a'},the:{m:'the',f:'the'},dem:{m:'That one is a',f:'That one is a'}})[kind][g];
}
function mathShapeMsg(en,shapeKey,wantKey){
 const o={};
 if(shapeKey){
  const g=mathShapeGender(shapeKey);
  o.shape=mathShapeName(shapeKey);
  o.a=mathShapeLex('a',g);
  o.dem=mathShapeLex('dem',g);
  if(!wantKey)o.the=mathShapeLex('the',g);
 }
 if(wantKey){
  const g=mathShapeGender(wantKey);
  o.want=mathShapeName(wantKey);
  o.the=mathShapeLex('the',g);
 }
 return mathT(en,o);
}
function mathShapeNew(){
 const modes=['name','odd','find'];
 MATH.mode=modes[MATH.round%3];
 MATH.missed=false;MATH.credited=false;
 if(MATH.mode==='name'){
  MATH.want=MATH_SHAPES[Math.floor(Math.random()*MATH_SHAPES.length)];
  MATH.shapes=mathShapePool(MATH.want).slice().sort(()=>Math.random()-.5);
  MATH.msg=mathShapeMsg('Tap the {shape}.',MATH.want);
 }else if(MATH.mode==='odd'){
  MATH.want=MATH_SHAPES[Math.floor(Math.random()*MATH_SHAPES.length)];
  const otherPool=mathShapePool(MATH.want).filter(s=>s!==MATH.want);
  const other=otherPool[Math.floor(Math.random()*otherPool.length)];
  MATH.shapes=[MATH.want,other,other,other].sort(()=>Math.random()-.5);
  MATH.msg=mathT('Which one is different?');
 }else{
  MATH.want=MATH_SHAPES[Math.floor(Math.random()*MATH_SHAPES.length)];
  const pool=mathShapePool(MATH.want);
  const arr=[];
  for(let i=0;i<6;i++)arr.push(Math.random()<.45?MATH.want:pool[Math.floor(Math.random()*pool.length)]);
  if(!arr.includes(MATH.want))arr[0]=MATH.want;
  MATH.shapes=arr;
  MATH.tapped=Array(arr.length).fill(false);
  MATH.msg=mathT('Find every {shape}. Then you can go on.',{shape:mathShapeName(MATH.want)});
 }
 mathShapeStamp();
 mathShapeDraw();
}
function mathShapeDraw(){
 const el=$('math');if(!el)return;
 const shapes=MATH.shapes||[];
 let grid='<div class="math-shapes" role="group">';
 shapes.forEach((s,i)=>{
  const on=MATH.mode==='find'&&MATH.tapped&&MATH.tapped[i];
  grid+=`<button type="button" class="math-shape-btn${on?' on':''}" data-s="${s}" aria-label="${esc(mathShapeName(s))}" onclick="mathShapeTap(${i})">${mathArtShape(s,(MATH.shapeArt&&MATH.shapeArt[i])||null)}</button>`;
 });
 grid+='</div>';
 const next=MATH.credited?`<p><button type="button" class="p" onclick="MATH.round++;mathShapeNew()">${mathT('Another shape')}</button></p>`:'';
 el.innerHTML=mathShell(mathT('Shapes'),`<p class="soft">${mathT('There is no timer.')}</p>${grid}${mathMsg()}${next}`);
}
function mathShapeTap(i){
 const s=MATH.shapes[i];
 if(MATH.mode==='find'){
  if(s===MATH.want){
   MATH.tapped[i]=true;
   mathCountTone(MATH.tapped.filter(Boolean).length-1);
   const need=MATH.shapes.map((x,j)=>x===MATH.want?j:-1).filter(j=>j>=0);
   if(need.every(j=>MATH.tapped[j])){
    MATH.msg=mathT('You found every {shape}.',{shape:mathShapeName(MATH.want)});
    mathYes();
    if(MATH.missed)mathCredit('retry');
    mathCredit('notice');
   }else{
    MATH.msg=mathT('Yes. Look for the others.');
   }
  }else{
   MATH.missed=true;
   MATH.msg=mathShapeMsg('That one is a {shape}. Look for the {want}.',s,MATH.want);
   mathHmm();
  }
  mathShapeDraw();
  return;
 }
 if(MATH.credited)return;
 const ok=(MATH.mode==='name'&&s===MATH.want)||(MATH.mode==='odd'&&s===MATH.want);
 if(ok){
  MATH.msg=MATH.mode==='odd'?mathShapeMsg('You found the one that is different. It is a {shape}.',s):mathShapeMsg('Yes, that is a {shape}.',s);
  mathYes();
  if(MATH.missed)mathCredit('retry');
  mathCredit('notice');
 }else{
  MATH.missed=true;
  MATH.msg=mathShapeMsg('That one is a {shape}. Try again.',s);
  mathHmm();
 }
 mathShapeDraw();
}

function mathTenNew(){
 MATH.start=1+Math.floor(Math.random()*9);
 MATH.filled=MATH.start;
 MATH.missed=false;MATH.credited=false;
 MATH.msg=mathT('There are {n}. Add lamps until there are 10. You can put one back if you need to.',{n:String(MATH.start)});
 mathTenDraw();
}
function mathTenDraw(){
 const el=$('math');if(!el)return;
 let frame='<div class="math-ten" role="group" aria-label="'+esc(mathT('Ten lamps'))+'">';
 for(let i=0;i<10;i++){
  const on=i<MATH.filled;
  const given=i<MATH.start;
  frame+=`<button type="button" class="math-nest${on?' on':''}${given?' given':''}${on&&!given?' added':''}" data-i="${i}" aria-pressed="${on?'true':'false'}" aria-label="${esc(mathT('Space {n}',{n:String(i+1)}))}" onclick="mathTenTap(${i})">${on?mathArtLamp(given?'given':'added'):''}</button>`;
 }
 frame+='</div>';
 const again=MATH.credited?`<p><button type="button" class="p" onclick="mathTenNew()">${mathT('Make 10 again')}</button></p>`:'';
 el.innerHTML=mathShell(mathT('Adding to 10'),`<p class="soft">${mathT('There is no timer.')}</p>${frame}
  <p class="math-eq" dir="ltr">${mathTenEq()}</p>${mathMsg()}${again}`);
}
function mathTenEq(){
 const n=typeof gNum==='function'?gNum:String;
 const a=n(MATH.start), added=MATH.filled-MATH.start;
 if(MATH.filled>=10)return a+' + '+n(added)+' = '+n(10);
 if(added<=0)return a;
 return a+' + '+n(added);
}
function mathTenTap(i){
 if(MATH.credited)return;
 if(i<MATH.start){
  MATH.msg=mathT('Those lamps were already there. Add new ones in the empty spaces.');
  mathTenDraw();
  return;
 }
 if(i<MATH.filled){
  MATH.filled=i;
  mathCountTone(Math.max(0,MATH.filled-1));
 }else{
  MATH.filled=Math.min(10,MATH.filled+1);
  mathCountTone(MATH.filled-1);
 }
 if(MATH.filled>10)MATH.filled=10;
 if(MATH.filled===10){
  const b=10-MATH.start;
  MATH.msg=mathT('Yes. {a} and {b} make 10.',{a:String(MATH.start),b:String(b)});
  mathYes();
  if(MATH.missed)mathCredit('retry');
  mathCredit('notice');
 }else if(MATH.filled>10){
  MATH.missed=true;
  MATH.msg=mathT("That's more than 10. You can put some back.");
  mathHmm();
 }else{
  MATH.msg=mathT('There are {n}. How many more make 10?',{n:String(MATH.filled)});
 }
 mathTenDraw();
};

function mathTile(){
 const h=$('hub');if(!h||h.querySelector('[data-math102]'))return;
 const tile=document.createElement('button');
 tile.className='hubtile';tile.dataset.math102='1';
 tile.setAttribute('onclick',"show('math')");
 tile.innerHTML=`${mathTileArt()}${mathT('Numbers')}<small>${mathT('Count, shapes, and adding to 10.')}</small>`;
 const sc=h.querySelector('[data-sc101]');
 const cards=[...h.querySelectorAll('.hubtile')].find(b=>(b.getAttribute('onclick')||'')==="show('cards')");
 if(sc)sc.after(tile);
 else if(cards)cards.after(tile);
 else (h.querySelector('.explore71 .hubgrid, .hubgrid')||h).append(tile);
 if(typeof artRefresh63==='function')artRefresh63(h);
}

RENDER.math=renderMath;

if(typeof afterShow95==='function'){
 const prev=afterShow95;
 afterShow95=function(id){
  const r=prev.apply(this,arguments);
  if(id==='hub')mathTile();
  if(id!=='math')mathStop();
  return r;
 };
}else if(typeof show==='function'){
 // Do not wrap show(). Hub tile still appears on the first hub render below.
}


{const rh=typeof renderHub==='function'?renderHub:(typeof RENDER==='object'&&RENDER.hub);
 if(typeof rh==='function'&&!rh._math){
  renderHub=function(){const r=rh.apply(this,arguments);try{mathTile()}catch(e){}return r};
  renderHub._math=1;
  if(typeof RENDER==='object')RENDER.hub=renderHub;
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{try{if($('hub')&&!$('hub').classList.contains('hidden'))mathTile()}catch(e){}});
else try{if($('hub')&&!$('hub').classList.contains('hidden'))mathTile()}catch(e){}

document.head.insertAdjacentHTML('beforeend',`<style id="mathcss">
#math .math-card h2{margin:.2em 0 .4em}
#math .math-units .hubtile{min-height:140px}
#math .math-lamps,#math .math-shapes,#math .math-nums{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:16px 0}
#math .math-ten,#math .math-lamps-5{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;justify-content:center;margin:16px auto;width:100%;max-width:calc(5 * 72px + 4 * 8px);box-sizing:border-box}
#math .math-lamps-5 .math-lamp-btn{min-width:0;width:100%;max-width:72px;height:auto;aspect-ratio:72 / 88;padding:4px;justify-self:center}
#math .math-lamp-btn,#math .math-shape-btn{background:var(--card,#fffdf8);border:2px solid #e4dccb;border-radius:18px;padding:8px;min-width:72px;min-height:88px;position:relative;cursor:pointer;box-sizing:border-box}
#math .math-nest{background:var(--card,#fffdf8);border:2px solid #e4dccb;border-radius:14px;padding:4px;min-width:0;width:100%;max-width:72px;height:auto;aspect-ratio:72 / 88;min-height:0;position:relative;cursor:pointer;display:grid;place-items:center;justify-self:center;box-sizing:border-box}
#math .math-lamp-btn.on,#math .math-shape-btn.on{border-color:var(--acc,#4e6b5c);box-shadow:inset 0 0 0 2px var(--acc,#4e6b5c);background:#fff6df}
#math .math-nest.given{cursor:default;background:#fff6df;border-color:#c9a56e;box-shadow:inset 0 0 0 2px #c9a56e}
#math .math-nest.added{background:#e7f2ea;border-color:var(--acc,#4e6b5c);box-shadow:inset 0 0 0 2px var(--acc,#4e6b5c)}
#math .math-nest .math-lamp{width:100%;height:auto;max-width:100%;max-height:100%;display:block}
#math .math-count{position:absolute;right:6px;bottom:4px;font-size:1.05rem;color:var(--acc,#4e6b5c)}
#math .math-nums .tile{min-width:56px;min-height:56px;font-size:1.35rem}
#math .math-msg{min-height:1.6em;font-size:1.15rem}
#math .math-eq{font-size:1.5rem;text-align:center}
#math .math-shape{display:block;margin:0 auto}
#math .hubtile .math-lamp,#math .hubtile .math-shape,#math .hubtile .lamp-art63{width:56px;height:56px}
</style>`);
