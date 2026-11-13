/* v131: Moon-phase dusk (Art Director moon.js) with a soft longest-night
   glow on the winter solstice — no countdown, no location. Also wires
   Studio's Lamp Breathing upgrade: short / normal / long under the Candle
   offer (normal is the default). Does not wrap show(). */
(function(){
'use strict';

function t131(s){return typeof patT==='function'?patT(s):(typeof gT==='function'?gT(s):s)}
function esc131(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

/* ---- Lamp Breathing length picker under the Candle offer ---- */
function candleLang131(){try{return (typeof LANG==='string'&&LANG)|| (typeof curLang==='function'?curLang():'en')}catch(e){return 'en'}}

function candlePickerHost131(){
  let host=$('candlePicker131');
  if(host)return host;
  const offer=$('candleOffer129');
  if(!offer)return null;
  host=document.createElement('div');
  host.id='candlePicker131';
  const actions=offer.closest('.candle-actions129')||offer.parentNode;
  if(actions&&actions.parentNode) actions.parentNode.insertBefore(host, actions.nextSibling);
  else offer.parentNode.appendChild(host);
  return host;
}

function candleMountPicker131(){
  if(typeof LampBreathing==='undefined'||typeof LampBreathing.mountPicker!=='function')return;
  const host=candlePickerHost131();if(!host)return;
  const lang=candleLang131();
  if(!host._lbPicker){
    host._lbPicker=LampBreathing.mountPicker(host,{selected:'normal',lang:lang});
  }else{
    try{host._lbPicker.relabel({lang:lang})}catch(e){}
  }
  host.hidden=false;
}

function candleHidePicker131(){
  const host=$('candlePicker131');
  if(host)host.hidden=true;
}

/* v129 closes candleOffer129 inside its IIFE, and #candleOffer129 would
   clobber any global of the same name. Hook the public API plus a hidden
   observer so the end-of-fade path also mounts the picker. */
function candleWatchOffer131(){
  const offer=$('candleOffer129');
  if(!offer||offer._lbWatch131)return;
  offer._lbWatch131=1;
  const obs=new MutationObserver(function(){
    try{
      if(!offer.hidden)candleMountPicker131();
      else candleHidePicker131();
    }catch(e){}
  });
  obs.observe(offer,{attributes:true,attributeFilter:['hidden']});
  if(!offer.hidden)try{candleMountPicker131()}catch(e){}
}

(function hookCandle131(){
  const api=window.LampCandle129;
  if(!api)return;
  const origOffer=api.offer, origRender=api.render;
  api.offer=function(){
    const r=typeof origOffer==='function'?origOffer.apply(this,arguments):undefined;
    try{candleWatchOffer131();candleMountPicker131()}catch(e){}
    return r;
  };
  api.render=function(){
    const r=typeof origRender==='function'?origRender.apply(this,arguments):undefined;
    try{candleWatchOffer131()}catch(e){}
    return r;
  };
  if(typeof RENDER==='object'){
    const prev=RENDER.candle;
    RENDER.candle=function(){
      if(typeof prev==='function')prev();
      else if(typeof api.render==='function')api.render();
      try{candleWatchOffer131()}catch(e){}
    };
  }
})();

/* ---- Moon-phase dusk ---- */
const SOUTH_KEY131='lamp_south131';

function moonSouth131(){
  try{
    if(typeof RAW!=='undefined'&&RAW&&typeof RAW.get==='function') return RAW.get(SOUTH_KEY131)==='1';
    return localStorage.getItem(SOUTH_KEY131)==='1';
  }catch(e){return false}
}
function moonSetSouth131(on){
  try{
    const v=on?'1':'';
    if(typeof RAW!=='undefined'&&RAW&&typeof RAW.set==='function'){ if(v)RAW.set(SOUTH_KEY131,v); else if(RAW.del)RAW.del(SOUTH_KEY131); else RAW.set(SOUTH_KEY131,''); }
    else { if(v)localStorage.setItem(SOUTH_KEY131,v); else localStorage.removeItem(SOUTH_KEY131); }
  }catch(e){}
}

/* Meeus (Astronomical Algorithms, ch. 27) mean June / December solstice, JDE ≈ UT.
   Same Julian-date style as moon.js / Sky Tonight. Device clock only; no location. */
function moonSolsticeJD131(year, south){
  const Y=(year-2000)/1000, Y2=Y*Y, Y3=Y2*Y, Y4=Y3*Y;
  if(south) return 2451716.56767 + 365241.62603*Y + 0.00325*Y2 + 0.00888*Y3 - 0.00030*Y4;
  return 2451900.05952 + 365242.74049*Y - 0.06223*Y2 - 0.00823*Y3 + 0.00032*Y4;
}
function moonLongest131(date){
  const d=date instanceof Date?date:new Date();
  const south=moonSouth131();
  const y0=d.getFullYear(), m0=d.getMonth(), day0=d.getDate();
  for(let y=y0-1;y<=y0+1;y++){
    const inst=new Date((moonSolsticeJD131(y,south)-2440587.5)*86400000);
    if(inst.getFullYear()===y0&&inst.getMonth()===m0&&inst.getDate()===day0) return true;
  }
  return false;
}

function moonCss131(){
  if(document.getElementById('v131css'))return;
  const st=document.createElement('style');
  st.id='v131css';
  st.textContent=[
    '#patterns .moon131{background:#120E18;border-radius:16px;padding:12px;margin:12px auto;max-width:420px;position:relative}',
    '#patterns .moon131 svg{display:block;width:100%;height:auto}',
    '#patterns .moon131.moon-long131{box-shadow:inset 0 0 48px 8px rgba(230,180,84,.22),0 0 36px 4px rgba(230,180,84,.18)}',
    '#patterns .moon131.moon-long131::after{content:"";position:absolute;inset:8% 12% 28%;border-radius:50%;background:radial-gradient(circle,rgba(255,246,216,.28) 0%,rgba(230,180,84,.12) 42%,transparent 70%);pointer-events:none}',
    '#patterns .moon-line131{text-align:center;margin:10px 0 4px}',
    '#patterns .moon-longline131{text-align:center;color:#E6B454;margin:6px 0}',
    '#patterns[data-unit="moon"] .math-card>button,#patterns[data-unit="moon"] .moon-south131{min-width:56px;min-height:56px;padding:12px 16px}',
    '#patterns .moon-south131{display:block;margin:12px auto 0}',
    '#patterns .pat-units [data-pat="moon"] .moon-tile131{width:72px;height:72px;display:block;margin:0 auto 6px}',
    '#patterns .pat-units [data-pat="moon"] .moon-tile131 svg{width:72px;height:72px}',
    '#candlePicker131{margin:10px auto 0;max-width:28rem}',
    '#candlePicker131[hidden]{display:none}'
  ].join('');
  document.head.appendChild(st);
}

function moonTileArt131(){
  try{
    if(typeof MoonDusk!=='undefined'&&MoonDusk.svg)
      return '<span class="moon-tile131">'+MoonDusk.svg(0.5,{lantern:false,stars:true,name:false,gid:'tile131'})+'</span>';
  }catch(e){}
  return '';
}

function moonTile131(){
  const grid=document.querySelector('#patterns .pat-units');
  if(!grid||grid.querySelector('[data-pat="moon"]'))return;
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='hubtile';
  btn.setAttribute('data-pat','moon');
  btn.setAttribute('onclick',"patOpen106('moon')");
  btn.innerHTML=moonTileArt131()+t131('Moon-phase dusk')+'<small>'+t131('Look outside')+'</small>';
  const quilt=grid.querySelector('[data-pat="quilt"]');
  if(quilt&&quilt.nextSibling) grid.insertBefore(btn,quilt.nextSibling);
  else if(quilt) grid.appendChild(btn);
  else grid.insertBefore(btn,grid.firstChild);
  try{if(typeof artRefresh63==='function')artRefresh63(btn)}catch(e){}
}

function renderMoon131(optDate){
  moonCss131();
  const el=$('patterns');if(!el)return;
  try{if(typeof PAT106==='object')PAT106.unit='moon'}catch(e){}
  el.setAttribute('data-unit','moon');
  const south=moonSouth131();
  const lang=(typeof LANG==='string'&&LANG==='es')?'es':'en';
  let info=null,svg='';
  try{
    if(typeof MoonDusk!=='undefined'){
      info=optDate!=null?MoonDusk.phase(optDate):MoonDusk.phase();
      svg=MoonDusk.svg(optDate!=null?optDate:undefined,{stars:true,lantern:true,name:false,south:south,lang:lang,gid:'moon131'});
    }
  }catch(e){}
  const title=t131('Moon-phase dusk');
  const longest=moonLongest131(optDate instanceof Date?optDate:new Date());
  const name=info?(lang==='es'?info.nameEs:info.name):'';
  const longLine=longest?`<p class="moon-longline131" id="moonLong131">${esc131(t131('Longest night'))}</p>`:'';
  const inner=`
    <p class="soft moon-line131">${esc131(t131('Look outside'))}</p>
    ${longLine}
    <div class="moon131${longest?' moon-long131':''}" role="img" aria-label="${esc131(name||title)}">${svg}</div>
    <p class="soft moon-line131" id="moonName131">${esc131(name)}</p>
    <button type="button" class="moon-south131" id="moonSouth131" aria-pressed="${south?'true':'false'}">${esc131(t131('Southern sky'))}</button>
  `;
  el.innerHTML=(typeof patShell==='function'?patShell(title,inner):`<div class="card"><h2>${esc131(title)}</h2>${inner}</div>`);
  const back=el.querySelector('.math-card>button, .card>button');
  if(back){back.style.minWidth='56px';back.style.minHeight='56px'}
  const tog=$('moonSouth131');
  if(tog) tog.onclick=function(){moonSetSouth131(!moonSouth131());renderMoon131(optDate)};
  try{if(typeof turtlePlace105==='function')turtlePlace105('patterns')}catch(e){}
  try{if(typeof artRefresh63==='function')artRefresh63(el)}catch(e){}
}

const _open131=typeof patOpen106==='function'?patOpen106:null;
patOpen106=function(unit){
  if(unit==='moon'){
    const host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
    try{if(typeof PAT106==='object'){PAT106.unit='moon';if(PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}}}catch(e){}
    if(typeof scStop101==='function')try{scStop101()}catch(e){}
    return renderMoon131();
  }
  const r=_open131?_open131.apply(this,arguments):undefined;
  if(!unit)try{moonTile131()}catch(e){}
  return r;
};
const _rp131=typeof renderPatterns106==='function'?renderPatterns106:null;
if(_rp131){
  renderPatterns106=function(){
    const r=_rp131.apply(this,arguments);
    try{moonTile131()}catch(e){}
    return r;
  };
  if(typeof RENDER==='object'){
    const prev=RENDER.patterns;
    RENDER.patterns=function(){
      if(typeof prev==='function')prev();
      else renderPatterns106();
      try{moonTile131()}catch(e){}
    };
  }
}

window.MoonDusk131={
  render:renderMoon131,
  south:moonSouth131,
  setSouth:moonSetSouth131,
  longest:moonLongest131,
  solsticeJD:moonSolsticeJD131
};
moonCss131();
})();
