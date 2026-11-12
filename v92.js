// v92: QA v90 fixes. Glowing smoke is a soft ink plume with no hard canvas
// edges; comb-jelly bands read on the lamp glass/body above the bowl; the
// Spanish Grown-ups > Look voice cards wrap instead of spilling, with the
// missing strings translated; Look Up screen 3 tabs Mercury..Neptune in
// visual order; a higher Lamp stage no longer auto-switches the flame color
// (unpicked lamps keep Hearth Amber; new colors only unlock); the flame tray
// is a balanced 3+3 grid; and the Lamp glow card shows a tiny live preview.
// Also: Sound Lab (and the other v54 trims) stay retired even when a device
// still has lamp_lab=1. v71 rewrote GHUB onclicks to pOpen71(...), so v54's
// CSS [onclick*="show('lab')"] no longer hid the tile.

// ---------- 5. Flame color: never auto-select on unlock ----------
// Cause (v81): lampFlameLoad81 returned FLAME81[max-1] — the newest unlocked
// color — whenever the child had not explicitly picked one, so reaching
// stage 2 turned an unpicked lamp Ember Coral, stage 3 Copper Teal, and so on.
function lampFlameLoad81(pid){
 const id=pid||curPid(),raw=safeJSON(RAW.get('lamp_flame@'+id),null),max=lampFlameMax81(lampLoad73(id));
 if(raw&&typeof raw==='object'){const f=FLAME81.find(x=>x.id===raw.id);if(f&&f.stage<=max)return {id:f.id,picked:!!raw.picked}}
 return {id:'amber',picked:false}
}
function lampFlamePal81(pid,s){
 const max=lampFlameMax81(s||lampLoad73(pid||FLAME_CTX81)),raw=lampFlameLoad81(pid||FLAME_CTX81);
 const f=FLAME81.find(x=>x.id===raw.id);
 return (f&&f.stage<=max)?f:FLAME81[0];
}

// ---------- 1. Glowing smoke: soft ink, alpha 0 before every edge ----------
function lampFxSmokeStart89(layer,canvas){
 lampFxSmokeStop89(layer);
 FX89_SMOKE.forEach((rec,k)=>{if(k!==layer){if(rec.raf)cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(k)}});
 if(lampFxReduced89()||lampFxLow89()){
  if(canvas)canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);
  return;
 }
 const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
 const W=canvas.width,H=canvas.height,parts=[],EDGE=W*.2;
 const mk=fresh=>{
  const p={x:W*(.5+(Math.random()-.5)*.26),y:H*(.56+Math.random()*.12),vx:(Math.random()-.5)*.12,vy:-.16-Math.random()*.2,
   life:.6+Math.random()*.6,age:fresh?0:Math.random()*.9,sz:W*(.1+Math.random()*.08),t:Math.random()*10};
  return p;
 };
 for(let i=0;i<30;i++)parts.push(mk(false));
 const rec={raf:0,last:0,frames:[],dead:false};
 FX89_SMOKE.set(layer,rec);
 const hex=c=>{c=String(c||'').trim();return c[0]==='#'&&c.length===7?[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)):[239,186,100]};
 const ss=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
 const loop=t=>{
  if(!canvas.isConnected){cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);return}
  rec.raf=requestAnimationFrame(loop);
  if(document.hidden||canvas.offsetParent===null)return;
  if(rec.last&&t-rec.last<33)return;
  const dt=rec.last?Math.min(50,t-rec.last):33;
  if(rec.last){rec.frames.push(t-rec.last);if(rec.frames.length>48)rec.frames.shift();
   if(rec.frames.length>=30){const mid=rec.frames.slice().sort((a,b)=>a-b)[Math.floor(rec.frames.length/2)];
    if(mid>52){rec.dead=true;FX89_LOW=true;cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);
     canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);return}}}
  rec.last=t;
  const step=dt/16.67,s=getComputedStyle(layer);
  const cols=['--f81-halo','--f81-core','--f81-tip','--f81-mid'].map(k=>hex(s.getPropertyValue(k)));
  const night=document.documentElement.dataset.lookTheme==='dark'||!!layer.closest('.lamp76-night')||document.body.classList.contains('bedtime');
  ctx.clearRect(0,0,W,H);
  ctx.globalCompositeOperation='source-over';
  for(let i=0;i<parts.length;i++){
   const p=parts[i];p.t+=.006*step;p.age+=.0032*step;
   const nx=lampFxNoise89(p.x*.012,p.t),ny=lampFxNoise89(p.y*.012+3,p.t);
   p.vx+=(nx-.5)*.05*step;p.vy+=(ny-.5)*.03*step-.006*step;p.vx*=.97;p.vy*=.97;
   p.x+=p.vx*step;p.y+=p.vy*step;
   const k=Math.min(1,p.age/p.life),r=p.sz*(1+k*.9);
   if(k>=1||p.y<H*.1){parts[i]=mk(true);continue}
   const edge=Math.min(p.x,W-p.x,p.y,H-p.y)-r*.35,ef=ss(edge/EDGE);
   const a=(night?.16:.08)*Math.sin(k*Math.PI)*ef;if(a<.003)continue;
   const c=cols[i%3],h=cols[3];
   const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
   g.addColorStop(0,`rgba(${c[0]},${c[1]},${c[2]},${a})`);
   g.addColorStop(.5,`rgba(${h[0]},${h[1]},${h[2]},${a*.45})`);
   g.addColorStop(1,`rgba(${c[0]},${c[1]},${c[2]},0)`);
   ctx.fillStyle=g;ctx.fillRect(p.x-r,p.y-r,r*2,r*2);
  }
  ctx.globalCompositeOperation='source-over';
 };
 rec.raf=requestAnimationFrame(loop);
}
function lampFxLayerHTML89(id,asleep,still){
 if(id==='spiral')return lampFxSpiralSVG89(asleep,still);
 if(id==='core')return '<div class="fx89-shell"></div><div class="fx89-mid"></div><div class="fx89-hot"></div>';
 if(id==='ember')return lampFxEmberSVG89(still);
 if(id==='jelly')return '<div class="fx89-jelly-clip"><div class="fx89-jelly-a"></div><div class="fx89-jelly-b"></div></div>';
 if(id==='smoke')return (still||lampFxLow89())?lampFxSmokeStatic89():'<canvas class="fx89-smoke-cv" width="360" height="360"></canvas>';
 return '';
}

// ---------- 6. Tiny live preview in the Lamp glow card ----------
function fxLive92(box){
 if(!box||!box.isConnected)return;
 const pid=box.dataset.pid||curPid();
 let live=box.querySelector('.fx92-live');
 if(!live){
  live=document.createElement('div');live.className='fx92-live';live.setAttribute('aria-hidden','true');
  const tray=box.querySelector('.fx89-tray');
  if(tray)tray.after(live);else box.append(live);
 }
 live.querySelectorAll('.fx89-layer').forEach(n=>lampFxSmokeStop89(n));
 const hold=FLAME_CTX81;FLAME_CTX81=pid;
 try{
  const s=lampLoad73(pid);
  live.innerHTML=`<div class="lamp76-hero fx92-hero">${lampFigure73(s,'data-hero76="1"')}</div>`;
  lampSetVars81(live,lampFlamePal81(pid));
  lampFxInsert89(live.firstElementChild,'preview');
 }finally{FLAME_CTX81=hold}
}
function fxLiveAll92(){document.querySelectorAll('#look [data-fx89-picker]').forEach(fxLive92)}
function fxHomeSmoke92(){
 const hub=$('hub');if(!hub||hub.classList.contains('hidden'))return;
 hub.querySelectorAll('.fx89-layer.fx89-smoke').forEach(layer=>{
  const cv=layer.querySelector('canvas.fx89-smoke-cv');
  if(cv&&!FX89_SMOKE.has(layer))lampFxSmokeStart89(layer,cv);
 });
}

// ---------- 3. Spanish Look: translate leftover strings ----------
function lookTr92(){
 const root=$('look');if(!root||typeof LANG==='undefined'||LANG==='en')return;
 const st=root.querySelector('p.story');
 if(st&&st.textContent.trim()==='The quick fox jumps. Read me to test your settings!')st.textContent=gT('The quick fox jumps. Read me to test your settings!');
 root.querySelectorAll('#vpick p.soft').forEach(p=>{
  const k='Voices: Kokoro-82M (Apache-2.0), recorded ahead of time onto our own site.';
  if(p.textContent.indexOf(k)===0)p.textContent=gT(k)+p.textContent.slice(k.length);
 });
 const m=$('vpmsg');
 if(m&&typeof VP!=='undefined'&&VP.msg){
  const nm=v=>{const x=(typeof VOICES!=='undefined'&&VOICES.find(y=>y[0]===v||y[1]===v));return x?x[1]:v};
  let t=VP.msg,r;
  if(r=t.match(/^Getting (\S+) ready…$/))t=gT('Getting {name} ready…',{name:nm(r[1])});
  else if(r=t.match(/^Downloading (\S+): (\d+)\/(\d+)$/))t=gT('Downloading {name}: {n}/{total}',{name:nm(r[1]),n:r[2],total:r[3]});
  else if(r=t.match(/^✅ (.+) is ready, and works offline now\.$/))t='✅ '+gT('{name} is ready, and works offline now.',{name:r[1]});
  else t=gT(t);
  if(m.textContent!==t)m.textContent=t;
 }
}

// ---------- 4. Look Up screen 3: DOM order = visual order ----------
function luOrder92(){
 if(typeof LU83==='undefined'||!Array.isArray(LU83.tray))return;
 const ix=id=>LU_PLANETS83.findIndex(p=>p.id===id);
 LU83.tray.sort((a,b)=>ix(a)-ix(b));
}
function luTuneTab87(){
 const root=document.getElementById('lookup');if(!root||typeof LU83==='undefined'||LU83.screen!==3)return;
 root.querySelectorAll('[data-lu-slot]').forEach(el=>{el.tabIndex=-1});
 root.querySelectorAll('[data-lu-token]').forEach(el=>{el.removeAttribute('tabindex');el.tabIndex=0});
 const kb=root.querySelector('#lu87-kb');if(kb)kb.tabIndex=-1;
}


// ---------- Retired v54 activities: drop from GHUB data, not just CSS ----------
// Cause: v44's LAB_ON still pushes LAB_TILE when localStorage lamp_lab=1.
// v54 hid that tile with [onclick*="show('lab')"] (and redirected show('lab')
// to the hub). v71 then rewrote every GHUB onclick to pOpen71('<key>'), so
// the CSS selector stopped matching, the tile came back, and a tap ran the
// saved show('lab') action, which v54 sent to the hub.
// Star songs ('star') and Cymatica ('cym') were skipped by that v71 rewrite,
// so they stayed CSS-hidden behind show('starsongs') / show('cymatica').
// They are still removed from GHUB here so they cannot leak the same way.
// 'cymatics' (Sound Shapes) was never a GHUB row; its show('cymatics')
// entry points stay CSS-hidden, and we also strip any leftover DOM nodes.
const RETIRED92=new Set(['lab','star','cym','cymatics','starsongs','cymatica']);
const RETIRED_ACT92=/show\('(lab|starsongs|cymatica|cymatics)'\)|pOpen71\('(lab|star|cym|cymatics|starsongs|cymatica)'\)|labSetOn/;
function ghTrim92(){
 if(typeof ghTrim100==='function')return ghTrim100();
 if(typeof GHUB==='undefined'||!Array.isArray(GHUB))return;
 for(let i=GHUB.length-1;i>=0;i--){
  const row=GHUB[i],k=row&&row[0],act=String(row&&row[5]||'');
  if(RETIRED92.has(k)||RETIRED_ACT92.test(act))GHUB.splice(i,1);
 }
 if(typeof P71!=='undefined'&&P71.actions)for(const k of RETIRED92)delete P71.actions[k];
}
function retireDom92(root){
 if(typeof retireDom100==='function')return retireDom100(root);
 if(!root)return;
 root.querySelectorAll('.labtoggle,[data-g="lab"],[data-g="star"],[data-g="cym"],[data-g="cymatics"],[data-stars],[data-starsongs],[data-cymatica],.labtile').forEach(el=>el.remove());
 root.querySelectorAll('[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(!(RETIRED_ACT92.test(on)||/MU=\{v:'(hum|make|compose)'\}/.test(on)))return;
  const wrap=el.closest('.hubtile,.card.labtoggle,.labtoggle');
  (wrap||el).remove();
 });
}
function labSetOn(on){if(typeof labSetOn100==='function')return labSetOn100(on);ghTrim92();document.querySelectorAll('.labtoggle').forEach(el=>el.remove())}
ghTrim92();

function boot92(){
 if(boot92._on)return;boot92._on=1;
 ghTrim92();
 if(typeof pOpen71==='function'&&!pOpen71._v92){const prev=pOpen71;pOpen71=function(key){if(RETIRED92.has(key))return;return prev.apply(this,arguments)};pOpen71._v92=1}
 if(typeof RENDER==='object'){
  for(const name of ['games','adults','hub','music','paint','echo','arcade','numbers','look']){
   const fn=RENDER[name];if(typeof fn!=='function'||fn._v92retire)continue;
   RENDER[name]=function(){if(name==='games')ghTrim92();const r=fn.apply(this,arguments);const el=typeof $==='function'&&$(name==='hub'?'hub':name);retireDom92(el||document.getElementById(name)||document.body);return r};
   RENDER[name]._v92retire=1;
   try{if(name==='hub'&&typeof renderHub==='function')renderHub=RENDER.hub;
    if(name==='music'&&typeof renderMusic==='function')renderMusic=RENDER.music;
    if(name==='adults'&&typeof renderAdults==='function')renderAdults=RENDER.adults}catch(e){}
  }
 }
 if(typeof luReset83==='function'){const prev=luReset83;luReset83=function(){const r=prev.apply(this,arguments);luOrder92();return r}}
 if(typeof luRender83==='function'){const prev=luRender83;luRender83=function(){luOrder92();const r=prev.apply(this,arguments);if(LU83.screen===3)luTuneTab87();return r}}
 if(typeof luFocusGo89==='function'){
  const prev=luFocusGo89;
  luFocusGo89=function(){const r=prev.apply(this,arguments);luTuneTab87();return r};
 }
 if(typeof lampFxPickerSync89==='function'){const prev=lampFxPickerSync89;lampFxPickerSync89=function(box){const r=prev.apply(this,arguments);fxLive92(box);return r}}
 if(typeof lampPickerSync81==='function'){const prev=lampPickerSync81;lampPickerSync81=function(){const r=prev.apply(this,arguments);fxLiveAll92();return r}}
 if(typeof pWrap68==='function')pWrap68('renderLook',null,()=>{fxLiveAll92();lookTr92();retireDom92($('look'))});
 if(typeof renderVoicePick==='function'){const prev=renderVoicePick;renderVoicePick=function(){const r=prev.apply(this,arguments);lookTr92();return r}}
 if(typeof voiceSample==='function'){const prev=voiceSample;voiceSample=async function(v){
  const b=[...document.querySelectorAll('button')].find(x=>(x.getAttribute('onclick')||'')===`voiceSample('${v}')`);
  const tr=()=>{
   if(!b)return;
   if(b.title)b.title=gT(b.title);
   const raw=b.textContent||'',core=raw.replace(/^[^\p{L}]+/u,'').trim();
   const map={'Loading…':gT('Loading…'),'Needs internet':gT('Needs internet'),'Could not play':gT('Could not play'),'Playing…':gT('Playing…'),'Hear sample':gT('Hear sample')};
   const k=Object.keys(map).find(x=>core===x||raw.endsWith(x));
   if(k&&map[k]!==k){const pre=raw.slice(0,raw.length-k.length);if(!raw.includes(map[k]))b.textContent=pre+map[k]}
  };
  const obs=b?new MutationObserver(tr):null;if(obs)obs.observe(b,{characterData:true,subtree:true,childList:true,attributes:true});
  tr();
  try{return await prev.apply(this,arguments)}finally{tr();[50,200,800,2000,4000].forEach(ms=>setTimeout(()=>{tr();if(ms>=4000&&obs)obs.disconnect()},ms))}}}
 if(typeof RENDER!=='undefined'&&typeof renderLook==='function')RENDER.look=renderLook;
 if(typeof show==='function'&&!show._v92&&!show._v97){
  const prev=show;
  show=function(id){
   if(id!=='look')document.querySelectorAll('#look .fx89-layer').forEach(n=>lampFxSmokeStop89(n));
   const r=prev.apply(this,arguments);
   if(id==='hub')setTimeout(fxHomeSmoke92,0);
   return r;
  };
  show._v92=1;
 }
 const look=$('look');if(look&&!look.classList.contains('hidden')){fxLiveAll92();lookTr92()}
 luOrder92();
 ['games','adults','hub','music','paint','echo','arcade','numbers'].forEach(id=>{const el=$(id);if(el&&!el.classList.contains('hidden'))retireDom92(el)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot92);
else boot92();
setTimeout(boot92,0);

if(document.head&&!document.getElementById('v92css'))document.head.insertAdjacentHTML('beforeend',`<style id="v92css">
.labtoggle,#adults .labtoggle,#look .labtoggle,
#games .hubtile[data-g="lab"],#games .hubtile[data-g="star"],#games .hubtile[data-g="cym"],#games .hubtile[data-g="cymatics"],
[onclick*="pOpen71('lab')"],[onclick*="pOpen71('star')"],[onclick*="pOpen71('cym')"],[onclick*="pOpen71('cymatics')"],
[onclick*="pOpen71('starsongs')"],[onclick*="pOpen71('cymatica')"]{display:none!important}
.today64>.lamp76-hero>.fx89-layer.fx89-smoke{width:min(380px,100%);height:min(380px,100vw);top:40%;overflow:visible}
@media(max-width:440px){.today64>.lamp76-hero>.fx89-layer.fx89-smoke{width:100%;height:min(330px,92vw)}}
.fx89-smoke-cv{-webkit-mask-image:radial-gradient(closest-side,#000 48%,rgba(0,0,0,.55) 74%,transparent 97%);mask-image:radial-gradient(closest-side,#000 48%,rgba(0,0,0,.55) 74%,transparent 97%);filter:blur(1.5px)}
html[data-look-theme="dark"] .fx89-smoke-cv,.today64.lamp76-night .fx89-smoke-cv{filter:blur(1.5px) saturate(1.1)}
.fx89-smoke-static{inset:-6%;-webkit-mask-image:radial-gradient(closest-side,#000 50%,transparent 98%);mask-image:radial-gradient(closest-side,#000 50%,transparent 98%)}
.fx89-smoke-static span{filter:blur(16px);opacity:.22}
.fx89-smoke-static span:nth-child(3){opacity:.16}.fx89-smoke-static span:nth-child(4){opacity:.14}
.lamp73-shell>.fx89-layer.fx89-jelly{z-index:4}
.lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-clip{left:27%;top:23%;width:46%;height:55%;border-radius:12%;
 -webkit-mask-image:radial-gradient(ellipse 58% 56% at 50% 50%,#000 62%,transparent 100%);mask-image:radial-gradient(ellipse 58% 56% at 50% 50%,#000 62%,transparent 100%)}
.lamp73-shell:has([data-stage73="1"]) .fx89-layer.fx89-jelly .fx89-jelly-clip{left:28%;top:44%;width:44%;height:34%;border-radius:50%}
.lamp73-shell:has([data-stage73="2"]) .fx89-layer.fx89-jelly .fx89-jelly-clip{left:29%;top:40%;width:42%;height:36%;border-radius:50%}
.lamp73-shell:has([data-stage73="3"]) .fx89-layer.fx89-jelly .fx89-jelly-clip{left:28%;top:25%;width:44%;height:44%;border-radius:14% 14% 40% 40%}
html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a,html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{
 inset:-40% 0;opacity:.62;mix-blend-mode:normal;filter:blur(.5px) saturate(1.15);
 background:repeating-linear-gradient(180deg,#ff6fb8c4 0 3px,transparent 3px 7px,#5ec8ffc4 7px 10px,transparent 10px 14px,#8fe36ac0 14px 17px,transparent 17px 21px,#ffd45ec4 21px 24px,transparent 24px 30px);
 background-size:100% 30px;animation:fx92-comb 7s linear infinite}
html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{opacity:.34;filter:blur(1px) hue-rotate(40deg);animation-duration:11s;animation-direction:reverse}
html[data-look-theme="dark"] .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a,.today64.lamp76-night .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a{mix-blend-mode:screen;opacity:.9}
html[data-look-theme="dark"] .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b,.today64.lamp76-night .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{mix-blend-mode:screen;opacity:.5}
@keyframes fx92-comb{from{background-position:0 0}to{background-position:0 30px}}
.fx92-live{display:flex;justify-content:center;margin:2px 0 6px;pointer-events:none}
.fx92-live .fx92-hero{position:relative;width:136px;height:136px;display:grid;place-items:center;margin:0}
.fx92-live .lamp73-figure{margin:0;position:relative;z-index:2}
.fx92-live .lamp73-shell{width:96px;height:96px}
.fx92-live .lamp73-svg{width:94px;height:94px}
.fx92-live figcaption{display:none}
.fx92-live .fx92-hero>.fx89-layer{position:absolute;left:50%;top:48%;width:136px;height:136px;transform:translate(-50%,-50%);z-index:1}
#vpick .hubgrid{grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr))}
#vpick .hubtile{min-width:0;overflow:hidden;padding:12px 8px}
#vpick .hubtile button{white-space:normal;width:100%;max-width:100%;box-sizing:border-box;overflow-wrap:anywhere;margin:4px 0;line-height:1.25}
#langcard button{white-space:normal;max-width:100%}
@media(max-width:640px){
 .lamp81-picker:not(.ring) .lamp81-tray{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:360px;margin:0 auto;justify-items:center}
 .lamp81-picker:not(.ring) .lamp81-swatch{width:100%;max-width:110px;min-width:0}
 .lamp81-picker:not(.ring) .lamp81-name,.lamp81-picker:not(.ring) .lamp81-lock{overflow-wrap:anywhere;text-align:center}
}
@media(prefers-reduced-motion:reduce){
 html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a,html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{animation:none!important}
}
</style>`);
