/* v130: Pattern Quilt — Art Director recipes.js + quilt.js.
   Uses only local earn flags (lamp_earn124 and the like). No counts, no
   streaks, no locks. Does not wrap show(). */
(function(){
'use strict';
const MAP130={
  spiral:'sunflower',sunflower:'sunflower','golden-spiral':'sunflower',
  hex:'hex',honeycomb:'hex',honey:'hex',
  heighway:'heighway','dragon-curve':'heighway',dragon:'heighway',
  rosette:'rosette',
  scallops:'scallops',fibonacci:'scallops','fib-scallops':'scallops',
  voronoi:'voronoi',glowcap:'voronoi'
};

function quiltT130(s){return typeof patT==='function'?patT(s):(typeof gT==='function'?gT(s):s)}
function esc130(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function quiltFlags130(){
  const o={};
  try{if(typeof earnLoad124==='function') Object.assign(o,earnLoad124())}catch(e){}
  try{
    const pid=(typeof pid124==='function'?pid124():(typeof curPid==='function'?curPid():''))+'';
    const take=function(raw){
      const parsed=typeof safeJSON==='function'?safeJSON(raw,null):(raw?JSON.parse(raw):null);
      if(!parsed||typeof parsed!=='object')return;
      Object.keys(parsed).forEach(k=>{const v=parsed[k]; if(v===true||(v&&typeof v==='object')||v)o[k]=true});
    };
    if(typeof RAW!=='undefined'&&RAW&&typeof RAW.get==='function'&&pid){
      take(RAW.get('lamp_earn124@'+pid));
    }
    if(typeof localStorage!=='undefined'){
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i);
        if(!k||k.indexOf('lamp_earn')!==0)continue;
        if(pid&&k.indexOf('@')>=0&&k.slice(k.lastIndexOf('@')+1)!==pid)continue;
        take(localStorage.getItem(k));
      }
    }
  }catch(e){}
  return o;
}

function quiltEntries130(){
  const o=quiltFlags130(), seen={}, out=[];
  const resolve=function(id){
    if(typeof PatternQuilt!=='undefined'&&PatternQuilt.resolve) return PatternQuilt.resolve(MAP130[id]||id)||PatternQuilt.resolve(id);
    return MAP130[id]||id;
  };
  Object.keys(o).forEach(k=>{
    if(!o[k])return;
    const id=resolve(k);
    if(!id||seen[id])return;
    seen[id]=true;
    out.push({id:id,level:4});
  });
  return out;
}

function quiltCss130(){
  if(document.getElementById('v130css'))return;
  const st=document.createElement('style');
  st.id='v130css';
  st.textContent=[
    '#patterns .quilt130{background:#120E18;border-radius:16px;padding:12px;margin:12px auto;max-width:520px}',
    '#patterns .quilt130 svg{display:block;width:100%;height:auto}',
    '#patterns .pat-units [data-pat="quilt"] .quilt-tile130{width:88px;height:88px;display:block;margin:0 auto 6px}',
    '#patterns .pat-units [data-pat="quilt"] .quilt-tile130 svg{width:88px;height:88px}',
    '#patterns[data-unit="quilt"] .math-card>button{min-width:56px;min-height:56px;padding:12px 16px}'
  ].join('');
  document.head.appendChild(st);
}

function quiltTileArt130(){
  try{
    if(typeof PatternQuilt!=='undefined'&&PatternQuilt.square)
      return '<span class="quilt-tile130">'+PatternQuilt.square('rosette',2,{idx:1,uid:'tile130'}).replace(/stroke-width="1\.8"/g,'stroke-width="2.2"')+'</span>';
  }catch(e){}
  return '';
}

function quiltTile130(){
  const grid=document.querySelector('#patterns .pat-units');
  if(!grid||grid.querySelector('[data-pat="quilt"]'))return;
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='hubtile';
  btn.setAttribute('data-pat','quilt');
  btn.setAttribute('onclick',"patOpen106('quilt')");
  btn.innerHTML=quiltTileArt130()+quiltT130('My patterns')+'<small>'+quiltT130('Pattern quilt')+'</small>';
  grid.insertBefore(btn,grid.firstChild);
  try{if(typeof artRefresh63==='function')artRefresh63(btn)}catch(e){}
}

function renderQuilt130(){
  quiltCss130();
  const el=$('patterns');if(!el)return;
  try{if(typeof PAT106==='object')PAT106.unit='quilt'}catch(e){}
  el.setAttribute('data-unit','quilt');
  const entries=quiltEntries130();
  let svg='';
  try{
    if(typeof PatternQuilt!=='undefined'&&PatternQuilt.quilt) svg=PatternQuilt.quilt(entries);
  }catch(e){svg=''}
  const title=quiltT130('My patterns');
  el.innerHTML=(typeof patShell==='function'?patShell(title,`
    <div class="quilt130" role="img" aria-label="${esc130(title)}">${svg}</div>
  `):`<div class="card"><h2>${title}</h2><div class="quilt130">${svg}</div></div>`);
  const back=el.querySelector('.math-card>button, .card>button');
  if(back){back.style.minWidth='56px';back.style.minHeight='56px'}
  try{if(typeof turtlePlace105==='function')turtlePlace105('patterns')}catch(e){}
  try{if(typeof artRefresh63==='function')artRefresh63(el)}catch(e){}
}

const _open130=typeof patOpen106==='function'?patOpen106:null;
patOpen106=function(unit){
  if(unit==='quilt'){
    const host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
    try{if(typeof PAT106==='object'){PAT106.unit='quilt';if(PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}}}catch(e){}
    if(typeof scStop101==='function')try{scStop101()}catch(e){}
    return renderQuilt130();
  }
  const host=$('patterns');if(host)host.removeAttribute('data-unit');
  const r=_open130?_open130.apply(this,arguments):undefined;
  if(!unit)try{quiltTile130()}catch(e){}
  return r;
};
const _rp130=typeof renderPatterns106==='function'?renderPatterns106:null;
if(_rp130){
  renderPatterns106=function(){
    const r=_rp130.apply(this,arguments);
    try{quiltTile130()}catch(e){}
    return r;
  };
  if(typeof RENDER==='object')RENDER.patterns=function(){
    try{if(typeof PAT106==='object')PAT106.unit=null}catch(e){}
    const host=document.getElementById('patterns');
    if(host)host.removeAttribute('data-unit');
    renderPatterns106();
  };
}

window.PatternQuilt130={entries:quiltEntries130,flags:quiltFlags130,render:renderQuilt130};
quiltCss130();
})();
