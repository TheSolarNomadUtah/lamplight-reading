/* v129: Candle mode (Art Director tokens) + Merian Plate 11 + end-of-fade
   Lamp Breathing offer (Studio). CSS-first and tiny. Does not wrap show().
   No mic, no network. Local grown-up toggle only. */
(function(){
'use strict';

function candleCss129(){
  if(document.getElementById('v129css'))return;
  const st=document.createElement('style');
  st.id='v129css';
  st.textContent=[
    'html.ll-candle #pstudio,html.ll-candle body.bedtime,html.ll-candle #btwrap{background:var(--ll-night,#140C08)}',
    'html.ll-candle,html.ll-candle body{transition:background .8s ease,color .8s ease}',
    '#candle{margin:0;padding:0}',
    '.candle-root129{position:relative;min-height:70vh;background:var(--ll-night,#140C08);color:var(--ll-warm,#F3E0B8);border-radius:16px;overflow:hidden;padding:24px 16px 32px}',
    '.candle-sky129{position:absolute;inset:0;background:var(--ll-dusk,#22180C);pointer-events:none}',
    '.candle-stage129{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:12px}',
    '.candle-lamp129{width:min(220px,70vw);min-height:160px}',
    '.candle-line129{text-align:center;max-width:28em;color:var(--ll-warm,#F3E0B8)}',
    '.candle-actions129{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center}',
    '.candle-actions129 button,[data-candle129] button{min-width:56px;min-height:56px;padding:12px 16px}',
    '#candle .lamp73-shell{filter:brightness(calc(0.82 + 0.28 * var(--lb-k, 0.5)));opacity:calc(0.42 + 0.58 * var(--lb-dim, 1));transform-origin:50% 70%}',
    '.reduce73 .ll-candle .il-h,.reduce73 .ll-candle .il-c,.reduce73.ll-candle .il-h,.reduce73.ll-candle .il-c,.reduce73 .ll-wind .ll-dim{animation:none!important}',
    '.reduce73 .ll-wind .ll-dim{opacity:.55}',
    '@media (prefers-reduced-motion:reduce){#candle .lamp73-shell{filter:brightness(.96);opacity:.7}}',
    '.reduce73 #candle .lamp73-shell{filter:brightness(.96);opacity:.7}',
    'html.ll-candle,html.ll-candle body{background:var(--bg);color:var(--ink)}',
    '#candleHideWords129{min-width:56px;min-height:56px;padding:12px 16px;margin:0}',
    '#candle .lamp73-shell.candle-tappable129{cursor:pointer}'
  ].join('');
  document.head.appendChild(st);
}
const KEY129='lamp_candle129';
const FADE129={120:1,180:1,300:1};
let windT129=0, volT129=0, dimEl129=null;

function candleLoad129(){
  const raw=typeof safeJSON==='function'?safeJSON((typeof RAW!=='undefined'&&RAW.get(KEY129)),null):null;
  const on=!!(raw&&raw.on), fade=FADE129[raw&&raw.fade]?raw.fade:180;
  return {on,fade};
}
function candleSave129(s){
  try{RAW.set(KEY129,JSON.stringify({on:!!s.on,fade:FADE129[s.fade]?s.fade:180}))}catch(e){}
}
function candleOn129(){return candleLoad129().on}
function candleFadeSec129(){return candleLoad129().fade}

function candleApply129(){
  const s=candleLoad129(), html=document.documentElement, st=html.style;
  html.classList.toggle('ll-candle',s.on);
  st.setProperty('--ll-fade',s.fade+'s');
  st.setProperty('--ll-breath','10s');
  if(s.on){
    const bg='#E8D4A8', ink='#2A2218';
    st.setProperty('--bg',bg);
    st.setProperty('--card','#F0E0B8');
    st.setProperty('--ink',ink);
    st.setProperty('--soft','#6A5A40');
    st.setProperty('--acc','#5A6A48');
    st.setProperty('--hi','#C47A00');
    /* applyLook writes inline html/body backgrounds; replace those so Home warms too. */
    html.style.background=bg;
    if(document.body){document.body.style.backgroundColor=bg;document.body.style.color=ink}
  }else{
    try{if(typeof applyLook==='function')applyLook()}catch(e){}
    candleStopWind129(true);
    candleStopBreath129();
  }
}

function candleReduced129(){
  try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
  try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return true}catch(e){}
  return false;
}

function candleLampEl129(){return document.querySelector('#candle .lamp73-shell')||$('candleLamp129')}

function candleTickCues129(s){
  const line=$('candleLine129');if(!line)return;
  const show=window._candleCues129!==false, reduced=candleReduced129();
  if(s&&s.done){line.textContent=candleT129('Good night');return}
  if(!show||reduced){line.textContent='';return}
  line.textContent=candleT129((s&&s.cue)||'breathe in…');
}

function candleToggleCues129(){
  const on=window._candleCues129!==false;
  window._candleCues129=!on;
  try{if(typeof LampBreathing!=='undefined'&&LampBreathing.setCues)LampBreathing.setCues(!on)}catch(e){}
  const btn=$('candleHideWords129');
  if(btn)btn.textContent=candleT129(!on?'Hide words':'Show words');
  const line=$('candleLine129');
  if(line&&on)line.textContent='';
}

function candleAttachBreathUI129(){
  const lamp=candleLampEl129();
  if(lamp&&!lamp._tap129){
    const go=function(e){if(e){e.preventDefault();e.stopPropagation()}try{if(typeof LampBreathing!=='undefined')LampBreathing.stop({reason:'tap'})}catch(err){}};
    const key=function(e){if(e&&(e.key==='Enter'||e.key===' '))go(e)};
    lamp._tap129=go;lamp._key129=key;
    lamp.addEventListener('click',go);
    lamp.addEventListener('keydown',key);
    if(!lamp.hasAttribute('tabindex'))lamp.setAttribute('tabindex','0');
    lamp.setAttribute('role','button');
    lamp.setAttribute('aria-label',candleT129('Tap the lamp or Done to stop.'));
    lamp.classList.add('candle-tappable129');
  }
  let btn=$('candleHideWords129');
  if(!btn){
    btn=document.createElement('button');
    btn.type='button';
    btn.id='candleHideWords129';
    btn.textContent=candleT129('Hide words');
    const line=$('candleLine129');
    if(line&&line.parentNode)line.parentNode.insertBefore(btn,line.nextSibling);
    else{const stage=$('candleStage129');if(stage)stage.appendChild(btn)}
    btn.onclick=function(e){if(e)e.stopPropagation();candleToggleCues129()};
  }
  btn.hidden=false;
  window._candleCues129=true;
  const line=$('candleLine129');
  if(line)line.textContent=candleReduced129()?'':candleT129('breathe in…');
}

function candleDetachBreathUI129(){
  const lamp=candleLampEl129();
  if(lamp&&lamp._tap129){
    lamp.removeEventListener('click',lamp._tap129);
    if(lamp._key129)lamp.removeEventListener('keydown',lamp._key129);
    lamp.classList.remove('candle-tappable129');
    lamp.removeAttribute('role');
    lamp.removeAttribute('aria-label');
    delete lamp._tap129;delete lamp._key129;
  }
  const btn=$('candleHideWords129');
  if(btn)btn.hidden=true;
}

function candleStopBreath129(){
  try{if(typeof LampBreathing!=='undefined')LampBreathing.stop({fade:0.08})}catch(e){}
  try{candleDetachBreathUI129()}catch(e){}
}

function candleStopWind129(silent){
  if(windT129){clearTimeout(windT129);windT129=0}
  if(volT129){clearTimeout(volT129);volT129=0}
  if(dimEl129){dimEl129.removeEventListener('animationend',candleOffer129);dimEl129=null}
  const el=$('candle');
  if(el)el.classList.remove('ll-wind','candle-offer129');
  if(!silent){/* keep palette */}
}

function candleEnsure129(){
  if(!$('candle')&&document.querySelector('main'))
    document.querySelector('main').insertAdjacentHTML('beforeend','<section id="candle" class="hidden"></section>');
  try{if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('candle')<0)SECTIONS.push('candle')}catch(e){}
}

function candleT129(k){return typeof gT==='function'?gT(k):k}

function renderCandle129(){
  candleCss129();candleEnsure129();
  const el=$('candle');if(!el)return;
  const s=candleLoad129();
  if(!s.on){candleSave129({on:true,fade:s.fade});candleApply129()}
  el.innerHTML=`<div class="candle-root129 ll-wind" id="candleRoot129">
    <div class="candle-sky129 ll-dim" id="candleDim129"></div>
    <div class="candle-stage129" id="candleStage129">
      <div class="candle-lamp129" data-lamp73-slot="candle" id="candleLamp129"></div>
      <p class="soft candle-line129" id="candleLine129">${esc(candleT129('A slow wind-down. The lamp breathes with you, then the light goes to night.'))}</p>
      <div class="candle-actions129">
        <button type="button" class="p candle-offer129" id="candleOffer129" hidden>${esc(candleT129('Breathe with the Lamp'))}</button>
        <button type="button" id="candleNight129">${esc(candleT129('Good night'))}</button>
        <button type="button" id="candleHome129">${esc(candleT129('Done'))}</button>
      </div>
    </div>
  </div>`;
  try{if(typeof lampMount73==='function')lampMount73($('candleLamp129'),'candle')}catch(e){}
  const offer=$('candleOffer129'), night=$('candleNight129'), home=$('candleHome129');
  if(offer)offer.onclick=function(){candleStartBreath129()};
  if(night)night.onclick=function(){candleGoodNight129()};
  if(home)home.onclick=function(){candleStopBreath129();candleStopWind129();show('hub')};
  candleStartWind129();
}

function candleStartWind129(){
  candleStopWind129();
  const root=$('candleRoot129')||$('candle');if(!root)return;
  root.classList.add('ll-wind');
  const dim=$('candleDim129');dimEl129=dim;
  const reduce=candleReduced129();
  const ms=candleFadeSec129()*1000;
  if(reduce){
    root.classList.add('reduce73');
    if(dim)dim.style.opacity='.55';
    windT129=setTimeout(candleOffer129, 1600);
  }else{
    if(dim){
      dim.addEventListener('animationend', candleOffer129, {once:true});
    }
    windT129=setTimeout(candleOffer129, ms+80);
    volT129=setTimeout(candleSoftVol129, ms*0.75);
  }
}

function candleSoftVol129(){
  // About 6 dB quieter for the dim-out act. Never close the shared context.
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
    const now=(typeof AC!=='undefined'&&AC&&AC.currentTime)||0;
    const bus=(typeof BT==='object'&&BT&&BT.master)||null;
    if(bus&&bus.gain){
      const cur=typeof bus.gain.value==='number'?bus.gain.value:0.18;
      if(bus.gain.setTargetAtTime)bus.gain.setTargetAtTime(cur*0.5,now,1);
      else bus.gain.value=cur*0.5;
      return;
    }
    document.querySelectorAll('audio').forEach(a=>{try{a.volume=Math.max(0,(a.volume||1)*0.5)}catch(e){}});
  }catch(e){}
}

function candleOffer129(){
  if(windT129){clearTimeout(windT129);windT129=0}
  const el=$('candle');if(el)el.classList.add('candle-offer129');
  const offer=$('candleOffer129'), line=$('candleLine129');
  if(offer){offer.hidden=false;try{offer.focus()}catch(e){}}
  if(line)line.textContent=candleT129('Breathe with the Lamp');
}

function candleStartBreath129(){
  const offer=$('candleOffer129');if(offer)offer.hidden=true;
  const lamp=document.querySelector('#candle .lamp73-shell')||$('candleLamp129');
  const host=$('candleRoot129')||$('candle');
  if(typeof LampBreathing==='undefined'||typeof LampBreathing.start!=='function'){
    candleGoodNight129();
    return;
  }
  const ok=LampBreathing.start({
    host:host,
    glowEl:lamp,
    paint:false,
    cues:true,
    tapToStop:true,
    sound:true,
    length:(function(){const h=document.getElementById('candlePicker131');return (h&&h._lbPicker&&h._lbPicker.get())||'normal'})(),
    reduced:candleReduced129()?true:null,
    onTick:candleTickCues129,
    onDone:function(){try{candleDetachBreathUI129()}catch(e){}candleGoodNight129()},
    onStop:function(){try{candleDetachBreathUI129()}catch(e){}}
  });
  if(!ok)candleGoodNight129();
  else candleAttachBreathUI129();
}

function candleGoodNight129(){
  candleStopBreath129();
  const line=$('candleLine129'), offer=$('candleOffer129');
  if(offer)offer.hidden=true;
  if(line)line.textContent=candleT129('Good night');
}

function candleSizeLook129(root){
  (root||document).querySelectorAll('[data-candle129] button').forEach(b=>{b.style.minWidth='56px';b.style.minHeight='56px';b.style.padding='12px 16px'});
}
function candleLookCard129(){
  const root=$('look');if(!root)return;
  if(root.querySelector('[data-candle129]')){candleSizeLook129(root);return;}
  const s=candleLoad129();
  const btn=function(fade,label){
    return `<button type="button" class="${s.fade===fade?'p':''}" data-fade129="${fade}" aria-pressed="${s.fade===fade}">${candleT129(label)}</button>`;
  };
  root.insertAdjacentHTML('beforeend', `<div class="card" data-candle129>
    <h3>${esc(candleT129('Candle mode'))}</h3>
    <p class="soft">${esc(candleT129('A warm amber bedtime palette, with less blue. A slow dim can begin after a story or a song, then you can breathe with the lamp.'))}</p>
    <p><button type="button" class="p" data-candle129-on aria-pressed="${s.on}">${esc(candleT129('On'))}</button> <button type="button" data-candle129-off aria-pressed="${!s.on}">${esc(candleT129('Off'))}</button></p>
    <p class="soft">${esc(candleT129('Wind-down length'))}</p>
    <p>${btn(120,'2 minutes')} ${btn(180,'3 minutes')} ${btn(300,'5 minutes')}</p>
    <p><button type="button" class="p" data-candle129-go>${esc(candleT129('Begin wind-down'))}</button></p>
  </div>`);
  const card=root.querySelector('[data-candle129]');
  card.querySelector('[data-candle129-on]').onclick=function(){candleSave129({on:true,fade:candleFadeSec129()});candleApply129();if(typeof renderLook==='function')renderLook()};
  card.querySelector('[data-candle129-off]').onclick=function(){candleSave129({on:false,fade:candleFadeSec129()});candleApply129();if(typeof renderLook==='function')renderLook()};
  card.querySelectorAll('[data-fade129]').forEach(b=>{
    b.onclick=function(){candleSave129({on:candleOn129()||true,fade:+b.getAttribute('data-fade129')});candleApply129();if(typeof renderLook==='function')renderLook()};
  });
  card.querySelector('[data-candle129-go]').onclick=function(){
    if(!candleOn129()){candleSave129({on:true,fade:candleFadeSec129()});candleApply129()}
    show('candle');
  };
  try{if(typeof artRefresh63==='function')artRefresh63(card)}catch(e){}
  candleSizeLook129(root);
}

function candleMaybeWind129(){
  if(!candleOn129())return;
  try{show('candle')}catch(e){}
}

function candleCaption129(){
  if(typeof patWindShow106!=='function')return;
  const prev=patWindShow106;
  patWindShow106=function(i,instant){
    const r=prev.apply(this,arguments);
    try{
      const items=(typeof patWindVisible109==='function')?patWindVisible109(PAT106.windAll109||PAT106.windItems||[]):(PAT106.windItems||[]);
      const n=items.length;if(!n)return r;
      const idx=((i%n)+n)%n, it=items[idx]||items[PAT106.windI||0];
      if(!it)return r;
      const L=(typeof LANG==='string'&&LANG==='es')?'es':'en';
      const cap=L==='es'?(it.caption_es||it.caption_en||''):(it.caption_en||it.caption_es||'');
      let p=$('patWindCaption106');
      const credit=$('patWindCredit106');
      if(!p&&credit&&credit.parentNode){
        p=document.createElement('p');
        p.className='soft';p.id='patWindCaption106';
        credit.parentNode.insertBefore(p, credit);
      }
      if(p){p.textContent=cap;p.hidden=!cap}
    }catch(e){}
    return r;
  };
}

// hooks — do not wrap show()
if(typeof pWrap68==='function'){
  pWrap68('applyLook',null,()=>{if(candleOn129())candleApply129()});
  pWrap68('renderLook',null,candleLookCard129);
  pWrap68('finish',null,candleMaybeWind129);
}
if(typeof renderLook==='function'&&typeof RENDER==='object')RENDER.look=renderLook;
if(typeof applyLook==='function'&&typeof pWrap68!=='function'){
  const al=applyLook;applyLook=function(){const r=al.apply(this,arguments);if(candleOn129())candleApply129();return r};
}
if(typeof kwRun93==='function'){
  const kw=kwRun93;
  kwRun93=function(times,t0,d,done){
    return kw(times,t0,d,function(){try{if(typeof done==='function')done()}finally{candleMaybeWind129()}});
  };
}
const _after129=typeof afterShow95==='function'?afterShow95:null;
afterShow95=function(id){
  if(_after129)try{_after129(id)}catch(e){}
  try{if(id==='look')candleLookCard129()}catch(e){}
  try{if(id!=='candle'){candleStopBreath129();candleStopWind129()}}catch(e){}
};
candleEnsure129();
if(typeof RENDER==='object')RENDER.candle=renderCandle129;
candleCaption129();
window.LampCandle129={apply:candleApply129,offer:candleOffer129,startWind:candleStartWind129,startBreath:candleStartBreath129,stopBreath:candleStopBreath129,goodNight:candleGoodNight129,on:candleOn129,load:candleLoad129,save:candleSave129,render:renderCandle129};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',candleApply129);
else candleApply129();
})();
