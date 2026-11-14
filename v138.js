/* v138: Equinox and full-moon soft glow on Moon-phase dusk (no countdown),
   plus earned Pattern Quilt squares for dragon-curve, rosette, scallops and
   voronoi, using the existing recipes and Pi's facts. Companion growth
   awards one. Does not wrap show(). */
(function(){
'use strict';

function t138(s){return typeof patT==='function'?patT(s):(typeof gT==='function'?gT(s):s)}
function esc138(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

/* Meeus (Astronomical Algorithms, ch. 27) mean March / September equinox, JDE ≈ UT.
   Same Julian-date style as v131 solstices and moon.js. Device clock only; no location. */
function moonEquinoxJD138(year, month){
  const Y=(year-2000)/1000, Y2=Y*Y, Y3=Y2*Y, Y4=Y3*Y;
  if(month===9) return 2451810.21715 + 365242.01767*Y - 0.11575*Y2 + 0.00337*Y3 + 0.00078*Y4;
  return 2451623.80984 + 365242.37404*Y + 0.05169*Y2 - 0.00411*Y3 - 0.00057*Y4;
}
function sameLocalDay138(inst, y, m, d){
  return inst.getFullYear()===y && inst.getMonth()===m && inst.getDate()===d;
}
function moonEquinox138(date){
  const d=date instanceof Date?date:new Date();
  const y0=d.getFullYear(), m0=d.getMonth(), day0=d.getDate();
  for(let y=y0-1;y<=y0+1;y++){
    for(const month of [3,9]){
      const inst=new Date((moonEquinoxJD138(y, month)-2440587.5)*86400000);
      if(sameLocalDay138(inst,y0,m0,day0)) return true;
    }
  }
  return false;
}
function moonFull138(date){
  try{
    if(typeof MoonDusk==='undefined'||typeof MoonDusk.phase!=='function') return false;
    return MoonDusk.phase(date instanceof Date?date:new Date()).id==='full';
  }catch(e){return false}
}

function moonCss138(){
  if(document.getElementById('v138css'))return;
  const st=document.createElement('style');
  st.id='v138css';
  st.textContent=[
    '#patterns .moon131.moon-eq131,#patterns .moon131.moon-full131{box-shadow:inset 0 0 48px 8px rgba(230,180,84,.22),0 0 36px 4px rgba(230,180,84,.18)}',
    '#patterns .moon131.moon-eq131::after,#patterns .moon131.moon-full131::after{content:"";position:absolute;inset:8% 12% 28%;border-radius:50%;background:radial-gradient(circle,rgba(255,246,216,.28) 0%,rgba(230,180,84,.12) 42%,transparent 70%);pointer-events:none}',
    '#patterns .quilt-facts138{margin:8px auto 0;max-width:520px;padding:0 4px;list-style:none}',
    '#patterns .quilt-facts138 li{margin:0 0 14px;color:#463F52;line-height:1.45}',
    '#patterns .quilt-facts138 strong{display:block;color:#855A00;margin:0 0 4px}'
  ].join('');
  document.head.appendChild(st);
}

function decorateMoon138(optDate){
  moonCss138();
  const host=document.querySelector('#patterns .moon131');
  if(!host)return;
  const when=optDate instanceof Date?optDate:new Date();
  const longest=typeof moonLongest131==='function'&&moonLongest131(when);
  const eq=moonEquinox138(when);
  const full=moonFull138(when);
  host.classList.toggle('moon-eq131', !longest&&eq);
  host.classList.toggle('moon-full131', !longest&&!eq&&full);
  if(longest||!eq) return;
  let line=document.getElementById('moonLong131')||document.getElementById('moonEq138');
  if(!line){
    line=document.createElement('p');
    line.className='moon-longline131';
    line.id='moonEq138';
    const look=host.previousElementSibling;
    if(look&&look.parentNode) look.parentNode.insertBefore(line, host);
    else host.parentNode.insertBefore(line, host);
  }
  line.id='moonEq138';
  line.textContent=t138('Equinox');
}

const _renderMoon131=(window.MoonDusk131&&typeof window.MoonDusk131.render==='function')?window.MoonDusk131.render:null;
function renderMoon138(optDate){
  const r=_renderMoon131?_renderMoon131(optDate):undefined;
  try{decorateMoon138(optDate)}catch(e){}
  return r;
}
window.renderMoon131=renderMoon138;
if(window.MoonDusk131) window.MoonDusk131.render=renderMoon138;

/* ---- earned patterns ---- */
const GROW138={dragon:'heighway',lamp:'rosette',phoenix:'scallops',glowcap_m:'voronoi',glowcap_f:'voronoi'};
const ORDER138=['hex','sunflower','heighway','rosette','scallops','voronoi'];
const NAME138={hex:'Honeycomb',sunflower:'Sunflower',heighway:'Dragon curve',rosette:'Rosette',scallops:'Scallops',voronoi:'Voronoi'};
const FACT138={
  hex:'Bees build honeycomb from hexagons. They fit together with no gaps.',
  sunflower:'Sunflower seeds grow in spirals.',
  heighway:'Fold a paper strip in half again and again. Open it, and its edge draws this dragon.',
  rosette:'Each petal is turned the same amount, so the flower looks the same all the way around.',
  scallops:'3 and 5 make 8. Each new number is the two before it added up.',
  voronoi:'Each shape holds the spots closest to its own dot, a bit like giraffe patches.'
};

function earnPat138(id){
  if(window.IL124&&typeof window.IL124.earn==='function') return window.IL124.earn(id);
  try{
    const key='lamp_earn124@'+((typeof curPid==='function'?curPid():'')||'');
    const raw=(typeof RAW!=='undefined'&&RAW.get)?RAW.get(key):null;
    const o=raw?(typeof safeJSON==='function'?safeJSON(raw,{}):JSON.parse(raw||'{}')):{};
    o[id]=true;
    if(RAW&&RAW.set) RAW.set(key, JSON.stringify(o));
  }catch(e){}
}
function grantGrowth138(){
  const kinds=(typeof FRIENDS101!=='undefined'&&FRIENDS101.slice)?FRIENDS101.slice():Object.keys(GROW138);
  kinds.forEach(k=>{
    const pat=GROW138[k];if(!pat)return;
    try{
      const s=typeof friendState101==='function'?friendState101(k):null;
      if(s&&(s.stage|0)>=3)earnPat138(pat);
    }catch(e){}
  });
}

const _entries130=(window.PatternQuilt130&&typeof window.PatternQuilt130.entries==='function')?window.PatternQuilt130.entries:null;
function quiltEntries138(){
  try{grantGrowth138()}catch(e){}
  const out=_entries130?(_entries130.apply(this,arguments)||[]):[];
  const order=(typeof PatternQuilt!=='undefined'&&PatternQuilt.ids)||ORDER138;
  out.sort(function(a,b){return order.indexOf(a.id)-order.indexOf(b.id)});
  return out;
}
window.quiltEntries130=quiltEntries138;
if(window.PatternQuilt130) window.PatternQuilt130.entries=quiltEntries138;

function quiltFactsHTML138(entries){
  if(!entries||!entries.length)return '';
  const items=entries.map(function(e){
    const id=e.id, name=t138(NAME138[id]||id), fact=t138(FACT138[id]||'');
    if(!fact)return '';
    return '<li><strong>'+esc138(name)+'</strong>'+esc138(fact)+'</li>';
  }).join('');
  return items?'<ul class="quilt-facts138">'+items+'</ul>':'';
}

const _renderQuilt130=(window.PatternQuilt130&&typeof window.PatternQuilt130.render==='function')?window.PatternQuilt130.render:null;
function enhanceQuilt138(){
  moonCss138();
  const host=document.querySelector('#patterns .quilt130');
  if(!host)return;
  const entries=quiltEntries138();
  try{if(typeof PatternQuilt!=='undefined'&&PatternQuilt.quilt) host.innerHTML=PatternQuilt.quilt(entries)}catch(e){}
  document.querySelectorAll('#patterns .quilt-facts138').forEach(n=>n.remove());
  host.insertAdjacentHTML('afterend', quiltFactsHTML138(entries));
}
function renderQuilt138(){
  const r=_renderQuilt130?_renderQuilt130.apply(this,arguments):undefined;
  try{enhanceQuilt138()}catch(e){}
  return r;
}
window.renderQuilt130=renderQuilt138;
if(window.PatternQuilt130) window.PatternQuilt130.render=renderQuilt138;

const _open106=typeof patOpen106==='function'?patOpen106:null;
if(_open106){
  patOpen106=function(unit){
    const r=_open106.apply(this,arguments);
    try{
      if(unit==='moon') decorateMoon138();
      if(unit==='quilt') enhanceQuilt138();
    }catch(e){}
    return r;
  };
}

const _lampMoment73=typeof lampMoment73==='function'?lampMoment73:null;
if(_lampMoment73){
  lampMoment73=function(){
    const r=_lampMoment73.apply(this,arguments);
    try{grantGrowth138()}catch(e){}
    return r;
  };
}

if(window.MoonDusk131){
  window.MoonDusk131.equinox=moonEquinox138;
  window.MoonDusk131.equinoxJD=moonEquinoxJD138;
  window.MoonDusk131.full=moonFull138;
}
window.IL138={
  equinox:moonEquinox138,equinoxJD:moonEquinoxJD138,full:moonFull138,
  grant:grantGrowth138,facts:FACT138,grow:GROW138,order:ORDER138
};
try{grantGrowth138()}catch(e){}
moonCss138();
})();
