/* v147: three companion looks — Inner light, Constellation, Stained glass.
   Registers through IL_LOOKS119. Inner light stays the default.
   Looks apply to Shell, Owl, and Moth only; official Fox and Dragon are unchanged.
   show() is not wrapped. */
(function(){
'use strict';
var LOOKS=['inner','constellation','glass'];
var LABELS={inner:'Inner light',constellation:'Constellation',glass:'Stained glass'};
var n147=0;

function t147(s,vars){
  var out=typeof gT==='function'?gT(s):s;
  if(vars) Object.keys(vars).forEach(function(k){out=String(out).replace(new RegExp('\\{'+k+'\\}','g'),String(vars[k]))});
  return out;
}
function e147(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])})}
function pid147(){return typeof curPid==='function'?curPid():''}
function lookKey147(pid){return 'lamp_il_look@'+(pid||pid147()||'device')}
function lookNorm147(id){return (id==='glass'||id==='constellation'||id==='inner')?id:'inner'}
function lookLoad147(pid){
  try{
    if(typeof RAW==='object'&&typeof RAW.get==='function'){
      var v=RAW.get(lookKey147(pid));
      if(v) return lookNorm147(v);
    }
  }catch(e){}
  return 'inner';
}
function lookSave147(id,pid){
  id=lookNorm147(id);
  try{if(typeof RAW==='object'&&typeof RAW.set==='function') RAW.set(lookKey147(pid),id)}catch(e){}
  return id;
}

function css147(){
  if(typeof document==='undefined'||document.getElementById('v147css')) return;
  var s=document.createElement('style');
  s.id='v147css';
  s.textContent=[
    '.il-sky-chip{fill:#120E18!important}',    '.il-rose-sm{display:none}',    'svg.il-xs .il-rose-full{display:none}',    'svg.il-xs .il-rose-sm{display:inline}',    '@media(max-width:72px){.il-rose-full{display:none}.il-rose-sm{display:inline}}',
    '.lookPick147{width:100%;margin:12px 0;box-sizing:border-box}',
    '.lookTiles147{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%}',
    '.lookTiles147 button{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:56px;min-height:56px;width:100%;padding:8px;border-radius:16px;border:2px solid var(--soft,#d7cbb8);background:var(--card,#fffaf0);color:inherit;font:inherit;font-weight:700;box-sizing:border-box;text-align:center}',
    '.lookTiles147 button.on{border-color:var(--acc,#c9a45e);box-shadow:0 0 0 3px #e6b45444}',
    '.lookTiles147 .lamp73-svg,.lookTiles147 svg{width:88px;height:88px;max-width:100%;flex:none}',
    '.lookTiles147 .kline{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;text-overflow:ellipsis;line-height:1.2;max-height:2.4em;width:100%;font-size:.92em;text-align:center}'
  ].join('');
  (document.documentElement||document.head).appendChild(s);
}

function sils147(){
  var root=window.IL_SILS_V2||{};
  var list=root.animals||root||[];
  var map={};
  if(Array.isArray(list)) list.forEach(function(a){if(a&&a.name) map[a.name]=a});
  return map;
}
function silFor147(kind){
  kind=kind==='shell'?'turtle':kind;
  if(kind!=='turtle'&&kind!=='owl'&&kind!=='moth') return null;
  return sils147()[kind]||null;
}
function phase147(stage){
  if(typeof IL119==='object'&&typeof IL119.phase==='function') return IL119.phase(stage);
  var s=Number(stage);
  return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}

function wrapLook147(look,kind,phase,pattern,opt){
  opt=opt||{};
  var sil=silFor147(kind);
  var map=looksMap147(),innerFn=map&&map.inner;
  if(!sil) return innerFn?innerFn(kind,phase,pattern,opt):'';
  var uid=(opt.uid||('l147'+(++n147)));
  var body='';
  try{
    if(look==='constellation'&&typeof ilConstellationV2==='function') body=ilConstellationV2(sil,phase,{uid:uid});
    else if(look==='glass'&&typeof ilGlassV21==='function') body=ilGlassV21(sil,phase,{uid:uid});
  }catch(e){body=''}
  if(!body) return innerFn?innerFn(kind,phase,pattern,opt):'';
  body=String(body).replace(/<style>[^<]*<\/style>/g,'');
  var face='';
  try{
    if((kind==='turtle'||kind==='shell')&&typeof IL==='object'&&typeof IL.sh==='function'&&sil.face){
      var fa=sil.face;
      face=IL.sh(uid+'f',phase,fa.hx,fa.hy,fa.hrx,fa.hry);
    }
  }catch(e){}
  var halo='';
  try{
    if(phase==='wise'&&typeof IL==='object'&&typeof IL.ha==='function'){
      var hx=sil.heart&&sil.heart[0],hy=sil.heart&&sil.heart[1],R=sil.rose||36;
      if(hx!=null) halo=IL.ha(uid+'h',hx,hy,R);
    }
  }catch(e){}
  return '<g class="il119" data-il-kind="'+e147(kind)+'" data-il-stage="'+e147(phase)+'" data-il-look="'+e147(look)+'" data-il-pattern="'+e147(pattern||'')+'" transform="scale(.5)">'+body+face+halo+'</g>';
}

function looksMap147(){
  if(typeof IL119==='object'&&IL119.looks) return IL119.looks;
  if(typeof IL_LOOKS119==='object') return IL_LOOKS119;
  return null;
}
function registerLooks147(){
  var L=looksMap147();
  if(!L) return;
  L.constellation=function(kind,phase,pattern,opt){return wrapLook147('constellation',kind,phase,pattern,opt)};
  L.glass=function(kind,phase,pattern,opt){return wrapLook147('glass',kind,phase,pattern,opt)};
}

/* ilDefaultLook119 and ilArt119 live inside the v119 IIFE, so we inject the
   saved look through IL119.art and friendArtInner101 instead of replacing the closed-over default. */
function paintLook147(kind,html,stage){
  if(typeof IL141==='object'&&typeof IL141.paint==='function') return IL141.paint(kind,html,stage);
  return html;
}
function hookDefaultLook147(){
  if(typeof IL119==='object'){
    IL119.defaultLook=function(){return lookLoad147()};
    if(typeof IL119.art==='function'&&!IL119.art._v147){
      var prevArt=IL119.art;
      IL119.art=function(kind,stage,opt){
        opt=opt||{};
        var look=opt.look||lookLoad147();
        var k=kind==='shell'?'turtle':kind;
        // v137's IL119.art ignores opt.look for Shell (always official Inner light).
        // Glass and constellation must still reach wrapLook147 for turtle, owl, and moth.
        if((k==='turtle'||k==='owl'||k==='moth')&&(look==='glass'||look==='constellation')){
          return paintLook147(k,wrapLook147(look,k,phase147(stage),opt.pattern||'',opt),stage);
        }
        return prevArt(kind,stage,opt.look?opt:{look:look,pattern:opt.pattern,uid:opt.uid,panes:opt.panes});
      };
      IL119.art._v147=1;
    }
  }
  if(typeof friendArtInner101==='function'&&!friendArtInner101._v147){
    var prevFriend=friendArtInner101;
    friendArtInner101=function(id,stage){
      var kind=id==='shell'?'turtle':id;
      if((kind==='turtle'||kind==='owl'||kind==='moth')&&typeof IL119==='object'&&typeof IL119.art==='function'){
        return IL119.art(kind,stage,{look:lookLoad147()});
      }
      return prevFriend(id,stage);
    };
    friendArtInner101._v147=1;
  }
}

function previewKind147(pid){
  var k='';
  try{if(typeof friendActive101==='function') k=friendActive101(pid)}catch(e){}
  k=k==='shell'?'turtle':k;
  if(k==='turtle'||k==='owl'||k==='moth') return k;
  return 'owl';
}
function previewStage147(pid,kind){
  var st=null;
  try{st=typeof friendState101==='function'?friendState101(kind==='turtle'?'turtle':kind,pid):null}catch(e){}
  if(st&&typeof lampViewStage74==='function') return lampViewStage74(st);
  return (st&&st.stage)||1;
}
function lookTileSvg147(look,kind,stage){
  var inner='',lazy='';
  if(look==='glass'||look==='constellation'){
    lazy=' data-il-lazy-look="'+look+'" data-il-lazy-kind="'+kind+'" data-il-lazy-stage="'+stage+'"';
  }else{
    try{
      if(typeof IL119==='object'&&typeof IL119.art==='function') inner=IL119.art(kind,stage,{look:look})||'';
    }catch(e){inner=''}
  }
  return '<svg class="lamp73-svg" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"'+lazy+'><circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="lamp73-ink">'+inner+'</g></svg>';
}
function fillLazyLookTiles147(root){
  if(typeof IL157==='object'&&typeof IL157.fillLookTiles==='function'){IL157.fillLookTiles(root);return}
  root=root&&root.querySelectorAll?root:document;
  var list=root.querySelectorAll('[data-il-lazy-look]'),i,svg,look,kind,stage,inner,g;
  for(i=0;i<list.length;i++){
    svg=list[i];look=svg.getAttribute('data-il-lazy-look');kind=svg.getAttribute('data-il-lazy-kind');stage=svg.getAttribute('data-il-lazy-stage')||'1';inner='';
    try{if(typeof IL119==='object'&&typeof IL119.art==='function')inner=IL119.art(kind,stage,{look:look})||''}catch(e){inner=''}
    g=svg.querySelector('g.lamp73-ink');if(g)g.innerHTML=inner;
    svg.removeAttribute('data-il-lazy-look');svg.removeAttribute('data-il-lazy-kind');svg.removeAttribute('data-il-lazy-stage');
  }
}
function lookRowHTML147(pid){
  css147();
  var cur=lookLoad147(pid);
  var kind=previewKind147(pid);
  var stage=previewStage147(pid,kind);
  var tiles=LOOKS.map(function(id){
    var on=cur===id;
    var nm=e147(t147(LABELS[id]));
    return '<button type="button" class="'+(on?'on':'')+'" data-il-look147="'+id+'" aria-pressed="'+(on?'true':'false')+'" aria-label="'+nm+'">'+lookTileSvg147(id,kind,stage)+'<span class="kline">'+nm+'</span></button>';
  }).join('');
  var note=e147(t147('These looks are for Shell, Owl, and Moth.'));
  return '<div class="lookPick147" data-look147="1"><div class="lookTiles147">'+tiles+'</div><p class="soft">'+note+'</p></div>';
}

function refreshAfterLook147(){
  try{
    var pid=pid147();
    var card=document.querySelector('[data-friends101]');
    if(card&&typeof friendPickerHTML101==='function'&&typeof friendPickerAttach101==='function'){
      card.outerHTML=friendPickerHTML101(pid);
      friendPickerAttach101();
    }
  }catch(e){}
  try{if(typeof lampMountAll73==='function') lampMountAll73()}catch(e){}
  try{if(typeof friendLine101==='function') friendLine101()}catch(e){}
  try{if(typeof artRefresh63==='function') artRefresh63(document)}catch(e){}
  try{
    var look=$('look');
    if(look&&!look.classList.contains('hidden')&&typeof renderLook==='function') renderLook();
  }catch(e){}
  requestAnimationFrame(function(){try{markLookSize147(document)}catch(e){}});
}

function bindLookRow147(host,pid){
  if(!host||host._il147) return;
  host._il147=1;
  host.addEventListener('click',function(ev){
    var b=ev.target.closest('[data-il-look147]');
    if(!b) return;
    ev.preventDefault();
    var id=b.getAttribute('data-il-look147');
    function apply(){lookSave147(id,pid||pid147());refreshAfterLook147()}
    if(typeof IL159==='object'&&typeof IL159.ensure==='function'&&(id==='glass'||id==='constellation')) IL159.ensure(id).then(apply).catch(apply);
    else apply();
  });
}

function attachLookOnLook147(){
  var root=typeof $==='function'?$('look'):document.getElementById('look');
  if(!root||root.querySelector('[data-look147]')) return;
  css147();
  var card=document.createElement('div');
  card.className='card';
  card.dataset.look147Card='1';
  var title=e147(t147('Looks'));
  card.innerHTML='<h3 class="kline">'+title+'</h3>'+lookRowHTML147(pid147());
  var sfx=root.querySelector('[data-sfx73],[data-reveal76],[data-flame81-card],[data-flame81-picker]');
  if(sfx) root.insertBefore(card,sfx);
  else root.insertAdjacentElement('afterbegin',card);
  bindLookRow147(card.querySelector('[data-look147]'),pid147());
  markLookSize147(card);
  if(typeof requestIdleCallback==='function')requestIdleCallback(function(){fillLazyLookTiles147(card)},{timeout:800});else setTimeout(function(){fillLazyLookTiles147(card)},0);
}

function hookPicker147(){
  var prevHTML=typeof friendPickerHTML101==='function'?friendPickerHTML101:null;
  if(prevHTML&&!prevHTML._v147){
    friendPickerHTML101=function(pid){
      css147();
      var html=prevHTML(pid);
      if(/data-look147/.test(html)) return html;
      return String(html).replace(/<\/div>\s*$/,lookRowHTML147(pid)+'</div>');
    };
    friendPickerHTML101._v147=1;
  }
  var prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
  if(prevAttach&&!prevAttach._v147){
    friendPickerAttach101=function(){
      var r=prevAttach.apply(this,arguments);
      try{
        var host=document.querySelector('[data-friends101] [data-look147], [data-look147]');
        bindLookRow147(host,pid147());
        markLookSize147(host||document);
        if(typeof requestIdleCallback==='function')requestIdleCallback(function(){fillLazyLookTiles147(host||document)},{timeout:800});else setTimeout(function(){fillLazyLookTiles147(host||document)},0);
      }catch(e){}
      return r;
    };
    friendPickerAttach101._v147=1;
  }
  if(typeof pWrap68==='function'){
    pWrap68('renderLook',null,function(){try{attachLookOnLook147()}catch(e){}});
  }else if(typeof renderLook==='function'){
    var prev=renderLook;
    renderLook=function(){var r=prev.apply(this,arguments);try{attachLookOnLook147()}catch(e){}return r};
    if(typeof RENDER==='object') RENDER.look=renderLook;
  }
}

function markLookSize147(root){
  root=root&&root.querySelectorAll?root:document;
  var list=root.querySelectorAll?root.querySelectorAll('svg'):[];
  for(var i=0;i<list.length;i++){
    var svg=list[i];
    if(!svg.querySelector || !(svg.querySelector('[data-il-look="glass"],[data-il-look="constellation"],.il-sky-chip,.il-rose-full,.il-rose-sm'))) continue;
    var w=0;
    try{w=svg.getBoundingClientRect().width}catch(e){}
    if(!(w>0)) w=parseFloat(svg.getAttribute('width')||'0')||0;
    // 44 px tiles get il-xs (6-fold wise rose). 80 px and the 88 px picker tiles do not.
    svg.classList.toggle('il-xs', w>0 && w<=56);
  }
}

function hookSize147(){
  if(typeof markLampSize123==='function'&&!markLampSize123._v147){
    var prev=markLampSize123;
    markLampSize123=function(root){
      var r=prev.apply(this,arguments);
      try{markLookSize147(root||document)}catch(e){}
      return r;
    };
    markLampSize123._v147=1;
  }
  if(typeof document!=='undefined'){
    window.addEventListener('resize',function(){try{markLookSize147(document)}catch(e){}});
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){try{markLookSize147(document)}catch(e){}});
    else try{markLookSize147(document)}catch(e){}
  }
}

css147();
registerLooks147();
hookDefaultLook147();
hookPicker147();
hookSize147();
window.ilDefaultLook119=function(){return lookLoad147()};

window.IL147={
  version:147,
  load:lookLoad147,
  save:lookSave147,
  mark:markLookSize147,
  looks:LOOKS,
  sil:silFor147
};
})();
/* v148: Group B small delights — goodnight pose, picker tiles at the
   current growth stage, companion signature notes on the shared bus,
   moon glint on glow nights, a 3-tap first-run tour, and “Take it
   outside” closing lines (text only). Idle blink is not given a new
   flash; the pose reuses .il-wo / .il-wc and reduced motion is a still.
   Looks polish at il-xs (44 px) only: merge tiny glass voronoi cells,
   and raise constellation star radius and line opacity ~20%.
   Official Dragon and egg art are left as they are. Voices are unchanged.
   Does not wrap show(). */
(function(root){
'use strict';

function t148(s,o){return typeof gT==='function'?gT(s,o):s}
function e148(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function pid148(){try{return (typeof curPid==='function'&&curPid())||''}catch(e){return ''}}
function reduce148(){
  try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
  try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return true}catch(e){}
  return !!(document.documentElement.classList.contains('reduce73')||document.body.classList.contains('reduce73')||document.querySelector('.reduce73'));
}
function rawGet148(k){try{return (typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k)}catch(e){return null}}
function rawSet148(k,v){try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,v);else localStorage.setItem(k,v)}catch(e){}}
function sfxOn148(){try{return typeof lampSfxOn73==='function'?!!lampSfxOn73():(typeof LAMP_SFX==='undefined'||LAMP_SFX!==false)}catch(e){return true}}

function css148(){
  if(document.getElementById('v148css'))return;
  var st=document.createElement('style');
  st.id='v148css';
  st.textContent=[
    /* Goodnight pose (from art/prelaunch/goodnight.css). Loaded last so
       it overrides existing idle-blink .il-wo / .il-wc rules. No flash.
       Reduced motion is the settled still (eyes closed, halo dim, 2 px down). */
    'svg.il-gn .il-gn-body{animation:ilgny 3s ease-out forwards}',
    'svg.il-gn .il-wo{animation:ilgnwo .7s ease-in-out forwards}',
    'svg.il-gn .il-wc{opacity:0;animation:ilgnwc .7s ease-in-out forwards}',
    'svg.il-gn .il-aura{animation:ilgna 3s ease-out forwards}',
    '@keyframes ilgnwo{0%{opacity:1}45%,100%{opacity:0}}',
    '@keyframes ilgnwc{0%{opacity:0}45%,100%{opacity:1}}',
    '@keyframes ilgna{to{opacity:.28}}',
    '@keyframes ilgny{to{transform:translateY(2px)}}',
    '@media(prefers-reduced-motion:reduce){svg.il-gn .il-gn-body,svg.il-gn .il-wo,svg.il-gn .il-wc,svg.il-gn .il-aura{animation:none}svg.il-gn .il-gn-body{transform:translateY(2px)}svg.il-gn .il-wo{opacity:0}svg.il-gn .il-wc{opacity:1}svg.il-gn .il-aura{opacity:.28}}',
    '.reduce73 svg.il-gn .il-gn-body,.reduce73 svg.il-gn .il-wo,.reduce73 svg.il-gn .il-wc,.reduce73 svg.il-gn .il-aura,svg.il-gn.reduce73 .il-gn-body,svg.il-gn.reduce73 .il-wo,svg.il-gn.reduce73 .il-wc,svg.il-gn.reduce73 .il-aura{animation:none}',
    '.reduce73 svg.il-gn .il-gn-body,svg.il-gn.reduce73 .il-gn-body{transform:translateY(2px)}',
    '.reduce73 svg.il-gn .il-wo,svg.il-gn.reduce73 .il-wo{opacity:0}',
    '.reduce73 svg.il-gn .il-wc,svg.il-gn.reduce73 .il-wc{opacity:1}',
    '.reduce73 svg.il-gn .il-aura,svg.il-gn.reduce73 .il-aura{opacity:.28}',
    /* Moon glint: still, no flash. Only on glow-night companions. */
    'svg.il-glow-night .il-moon-glint{fill:#FFF6D8;opacity:.7;pointer-events:none}',
    '@media(prefers-reduced-motion:reduce){svg.il-glow-night .il-moon-glint{opacity:.55}}',
    /* il-xs glass: hide full voronoi, show merged tiny cells. 88 px unchanged. */
    '.il-voro-sm{display:none}',
    'svg.il-xs .il-voro-full{display:none}',
    'svg.il-xs .il-voro-sm{display:inline}',
    /* il-xs constellation: star radius and line opacity +~20%. 88 px unchanged. */
    'svg.il-xs circle[fill="#FFF6D8"]{transform-box:fill-box;transform-origin:center;transform:scale(1.2)}',
    'svg.il-xs path[stroke="#D9C9A8"][opacity=".82"]{opacity:.984}',
    'svg.il-xs [stroke="#D9C9A8"][opacity=".42"]{opacity:.504}',
    /* Tour + take-it-outside */
    '.tour148{max-width:26rem;padding:1.2rem 1.4rem;border:none;border-radius:20px;background:var(--card,#fffaf0);color:var(--ink,#3a3228);text-align:center}',
    '.tour148::backdrop{background:#1a142088}',
    '.tour148 .row148{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}',
    '.tour148 button{min-width:56px;min-height:56px}',
    '.tour148 .friendPick101{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
    '.tour148 .style148{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
    '.out148{margin:.8em 0 0;color:var(--ink,#3a3228);line-height:1.45}',
    '#btwrap .gn148{width:120px;margin:12px auto 0}',
    '#candle .gn148-slot, #candleLamp129.il-gn-host{display:block}'
  ].join('');
  document.head.appendChild(st);
}

/* ---- 44 px glass: merge voronoi cells under ~2.5% of the silhouette area ---- */
function area148(poly){
  var a=0,n=poly&&poly.length||0,i,j;
  for(i=0,j=n-1;i<n;j=i++) a+=(poly[j][0]*poly[i][1]-poly[i][0]*poly[j][1]);
  return Math.abs(a)/2;
}
function ek148(a,b){
  function r(v){return Math.round(v*1e4)/1e4}
  var x1=r(a[0]),y1=r(a[1]),x2=r(b[0]),y2=r(b[1]);
  return (x1<x2||(x1===x2&&y1<y2))?x1+','+y1+'|'+x2+','+y2:x2+','+y2+'|'+x1+','+y1;
}
function mergeVoro148(src){
  var cells=(src&&src.cells||[]).map(function(c,i){return {j:i,i:c.i,site:c.site,poly:c.poly};});
  var n=cells.length;
  if(n<2) return {cells:cells};
  var areas=cells.map(function(c){return area148(c.poly);});
  var total=areas.reduce(function(s,a){return s+a;},0);
  if(!(total>0)) return {cells:cells};
  var edgeMap={},i,j,p,k,ids;
  cells.forEach(function(c,i){
    p=c.poly||[];
    for(j=0;j<p.length;j++){
      k=ek148(p[j],p[(j+1)%p.length]);
      if(!edgeMap[k])edgeMap[k]=[];
      if(edgeMap[k].indexOf(i)<0)edgeMap[k].push(i);
    }
  });
  var neigh=cells.map(function(){return [];});
  Object.keys(edgeMap).forEach(function(key){
    ids=edgeMap[key];
    if(ids.length===2){neigh[ids[0]].push(ids[1]);neigh[ids[1]].push(ids[0]);}
  });
  var parent=cells.map(function(_,i){return i;});
  function find(x){return parent[x]===x?x:(parent[x]=find(parent[x]));}
  var thresh=0.025*total,guard=0,changed=true;
  while(changed&&guard++<80){
    changed=false;
    var acc=cells.map(function(){return 0;});
    cells.forEach(function(_,i){acc[find(i)]+=areas[i];});
    var tiny=-1,tinyA=Infinity;
    acc.forEach(function(a,i){if(find(i)===i&&a>0&&a<thresh&&a<tinyA){tiny=i;tinyA=a;}});
    if(tiny<0)break;
    var best=-1,bestA=-1,seen={};
    cells.forEach(function(_,i){
      if(find(i)!==tiny)return;
      neigh[i].forEach(function(j){
        var r=find(j);
        if(r===tiny||seen[r])return;
        seen[r]=1;
        if(acc[r]>bestA){best=r;bestA=acc[r];}
      });
    });
    if(best<0){acc[tiny]=thresh;continue;}
    parent[tiny]=best;
    changed=true;
  }
  var groups={};
  cells.forEach(function(c,i){
    var r=find(i);
    if(!groups[r])groups[r]={j:r,parts:[]};
    groups[r].parts.push(c.poly);
  });
  var out=[];
  Object.keys(groups).forEach(function(key){
    var g=groups[key],ec={},edges=[];
    g.parts.forEach(function(poly){
      for(i=0;i<(poly||[]).length;i++){
        k=ek148(poly[i],poly[(i+1)%poly.length]);
        ec[k]=(ec[k]||0)+1;
      }
    });
    g.parts.forEach(function(poly){
      for(i=0;i<(poly||[]).length;i++){
        var a=poly[i],b=poly[(i+1)%poly.length];
        if(ec[ek148(a,b)]===1) edges.push([a,b]);
      }
    });
    g.parts.forEach(function(poly,pi){
      out.push({j:g.j,poly:poly,noStroke:true,edges:pi===g.parts.length-1?edges:undefined});
    });
  });
  return {n:src.n,sites:src.sites,cells:out};
}

/* ---- Goodnight pose ---- */
function wrapGn148(svg){
  if(!svg||svg.querySelector('.il-gn-body'))return;
  var NS='http://www.w3.org/2000/svg';
  var ink=svg.querySelector('.lamp73-ink');
  var g=document.createElementNS(NS,'g');
  g.setAttribute('class','il-gn-body');
  if(ink){
    while(ink.firstChild) g.appendChild(ink.firstChild);
    ink.appendChild(g);
  }else{
    var skip=function(n){
      if(!n||n.nodeType!==1)return true;
      var tag=n.tagName.toLowerCase(),cls=n.getAttribute('class')||'';
      if(tag==='defs'||tag==='style'||tag==='title')return true;
      if(/\blamp73-plate\b/.test(cls))return true;
      if(tag==='rect'&&(/dusk|il-dusk|il-sky-chip/.test(cls)||n.getAttribute('fill')==='#120E18'))return true;
      return false;
    };
    [].slice.call(svg.childNodes).forEach(function(n){if(!skip(n))g.appendChild(n);});
    svg.appendChild(g);
  }
}
function poseOn148(root){
  css148();
  var scope=root||document;
  var svgs=scope.querySelectorAll?scope.querySelectorAll('svg.lamp73-svg, svg[data-stage73]'):[];
  if(scope.tagName==='svg')svgs=[scope];
  svgs.forEach(function(svg){
    wrapGn148(svg);
    svg.classList.add('il-gn');
    if(reduce148())svg.classList.add('reduce73');
  });
}
function hookGoodnight148(){
  if(typeof candleGoodNight129==='function'&&!candleGoodNight129._v148){
    var prev=candleGoodNight129;
    candleGoodNight129=function(){
      var r=prev.apply(this,arguments);
      try{
        var host=$('candleLamp129')||document.querySelector('#candle .lamp73-shell')||$('candle');
        if(host)poseOn148(host);
      }catch(e){}
      return r;
    };
    candleGoodNight129._v148=1;
  }
  var w=$('btword');
  if(w&&!w._gn148){
    w._gn148=1;
    var settle=function(){
      var txt=w.textContent||'';
      if(!/Good night|Buenas noches/i.test(txt))return;
      var wrap=$('btwrap')||w.parentElement;
      if(wrap&&!wrap.querySelector('svg.lamp73-svg, .gn148')){
        var box=document.createElement('div');
        box.className='gn148';
        var art='';
        try{art=(typeof lampSvg73==='function'?lampSvg73((typeof lampViewStage74==='function'&&typeof lampLoad73==='function')?lampViewStage74(lampLoad73()):4,'',false):'')}catch(e){}
        box.innerHTML=art;
        wrap.appendChild(box);
      }
      poseOn148(wrap);
    };
    new MutationObserver(settle).observe(w,{childList:true,characterData:true,subtree:true});
    settle();
  }
}

/* ---- Moon glint on equinox / full-moon nights (v138) ---- */
function glowNight148(date){
  var d=date instanceof Date?date:new Date();
  function call(obj,name){
    try{if(obj&&typeof obj[name]==='function')return !!obj[name](d)}catch(e){}
    return false;
  }
  if(call(typeof MoonDusk131==='object'?MoonDusk131:null,'equinox'))return true;
  if(call(typeof IL138==='object'?IL138:null,'equinox'))return true;
  if(call(typeof MoonDusk131==='object'?MoonDusk131:null,'full'))return true;
  if(call(typeof IL138==='object'?IL138:null,'full'))return true;
  try{if(typeof moonEquinox138==='function'&&moonEquinox138(d))return true}catch(e){}
  try{if(typeof moonFull138==='function'&&moonFull138(d))return true}catch(e){}
  return false;
}
function glintOn148(svg){
  if(!svg||svg.querySelector('.il-moon-glint'))return;
  if(svg.querySelector('.il-sky-chip'))return;
  var NS='http://www.w3.org/2000/svg';
  var g=document.createElementNS(NS,'g');
  g.setAttribute('class','il-moon-glint');
  g.setAttribute('aria-hidden','true');
  var eyes=[];
  svg.querySelectorAll('circle').forEach(function(c){
    var fill=(c.getAttribute('fill')||'').toLowerCase();
    var r=parseFloat(c.getAttribute('r')||'0');
    if(r>=1.2&&r<=8&&/#2a2430|#163333|#1a1a1a|#120e18|#3a3228|#000/.test(fill)) eyes.push(c);
  });
  if(!eyes.length){
    svg.querySelectorAll('circle').forEach(function(c){
      var fill=(c.getAttribute('fill')||'');
      var r=parseFloat(c.getAttribute('r')||'0');
      if(r>0.5&&r<=2.2&&/#fff6d8|#f6efe0|#ffffff/i.test(fill)) eyes.push(c);
    });
  }
  eyes.slice(0,4).forEach(function(c){
    var cx=parseFloat(c.getAttribute('cx')||'0');
    var cy=parseFloat(c.getAttribute('cy')||'0');
    var r=Math.max(0.7,parseFloat(c.getAttribute('r')||'1')*0.35);
    var m=document.createElementNS(NS,'circle');
    m.setAttribute('class','il-moon-glint');
    m.setAttribute('cx',String(cx+r*0.6));
    m.setAttribute('cy',String(cy-r*0.7));
    m.setAttribute('r',String(r));
    g.appendChild(m);
  });
  if(g.childNodes.length)svg.appendChild(g);
}
function decorateGlow148(root){
  css148();
  var on=glowNight148();
  var scope=root||document;
  var svgs=scope.querySelectorAll?scope.querySelectorAll('svg.lamp73-svg, svg[data-stage73]'):[];
  svgs.forEach(function(svg){
    svg.classList.toggle('il-glow-night',on);
    if(on)glintOn148(svg);else{
      svg.querySelectorAll('.il-moon-glint').forEach(function(n){n.remove();});
    }
  });
}

/* ---- Signature notes on the v143 shared bus, within Bedtime Glow ---- */
var PENTA148=[261.63,293.66,329.63,392.00,440.00];
var MOTIF148={lamp:[0,2,4],moth:[2,4,3],owl:[4,3,1],turtle:[0,3,4],shell:[0,3,4],dragon:[3,1,0],phoenix:[4,2,0],sprites:[1,3,4],puff:[1,3,4],dew:[2,3,0],ember:[3,2,0],fox:[1,4,2]};
function motif148(kind){
  var k=String(kind||'lamp').toLowerCase();
  if(MOTIF148[k])return MOTIF148[k];
  var h=0,i;for(i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))|0;
  return [Math.abs(h)%5,Math.abs(h>>3)%5,Math.abs(h>>7)%5];
}
function note148(kind){
  if(!sfxOn148())return;
  var c=null;
  try{c=typeof ac==='function'?ac():(typeof AC!=='undefined'?AC:null)}catch(e){c=null}
  if(!c||typeof c.createOscillator!=='function')return;
  var t0;
  try{t0=c.currentTime+0.02}catch(e){return}
  var quiet=!!(document.body&&(document.body.classList.contains('bedtime')||document.body.classList.contains('candle')||document.documentElement.classList.contains('bedtime')));
  var gain=quiet?0.03:0.045;
  var mot=motif148(kind);
  mot.forEach(function(idx,i){
    try{
      var o=c.createOscillator(),g=c.createGain();
      o.type='sine';
      o.frequency.value=PENTA148[idx]||PENTA148[0];
      var t=t0+i*0.14;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(gain,t+0.018);
      g.gain.exponentialRampToValueAtTime(0.0008,t+0.22);
      o.connect(g);g.connect(c.destination);
      o.start(t);o.stop(t+0.24);
    }catch(e){}
  });
}
function hookNotes148(){
  if(typeof friendPick101==='function'&&!friendPick101._v148){
    var prev=friendPick101;
    friendPick101=function(id,pid){
      var r=prev.apply(this,arguments);
      try{note148(id)}catch(e){}
      return r;
    };
    friendPick101._v148=1;
  }
  if(!document._notes148){
    document._notes148=1;
    document.addEventListener('click',function(ev){
      var b=ev.target&&ev.target.closest&&ev.target.closest('[data-sprite137]');
      if(!b)return;
      try{note148(b.getAttribute('data-sprite137')||'sprites')}catch(e){}
    },true);
  }
}

/* ---- Picker tiles already use lampViewStage74; stamp + keep current stage ---- */
function viewStage148(kind,pid){
  var st=null;
  try{st=typeof friendState101==='function'?friendState101(kind,pid):null}catch(e){}
  if(st&&typeof lampViewStage74==='function')return lampViewStage74(st);
  var s=st&&st.stage;
  s=Number(s);
  if(!(s>=1))s=1;
  return Math.max(1,Math.min(6,s));
}
function hookPicker148(){
  if(typeof friendPickerHTML101==='function'&&!friendPickerHTML101._v148){
    var prev=friendPickerHTML101;
    friendPickerHTML101=function(pid){
      var html=prev.apply(this,arguments);
      try{
        html=html.replace(/data-friend="([^"]+)"/g,function(m,k){
          var v=viewStage148(k,pid);
          return 'data-friend="'+k+'" data-stage148="'+v+'"';
        });
      }catch(e){}
      return html;
    };
    friendPickerHTML101._v148=1;
  }
}

/* ---- 3-tap first-run tour ---- */
var STYLES148=['cave','paper','woodblock','chalk'];
var STYLE_NAME148={cave:'Cave art',paper:'Paper cut-out',woodblock:'Woodblock',chalk:'Chalk pastel'};
var CORE148=['lamp','moth','owl','turtle','dragon','phoenix'];
function tourSeen148(){return rawGet148('lamp_tour148')==='1'}
function tourFresh148(){
  if(tourSeen148())return false;
  if(rawGet148('lamp_move_seen')||rawGet148('lamp_moved'))return false;
  try{
    var i,k,raw,f;
    var store=(typeof RAW!=='undefined'&&RAW.keys)?null:localStorage;
    var keys=[];
    if(store){for(i=0;i<store.length;i++)keys.push(store.key(i))}
    else{try{for(i=0;i<localStorage.length;i++)keys.push(localStorage.key(i))}catch(e){}}
    for(i=0;i<keys.length;i++){
      k=keys[i]||'';
      if(/^lamp_(log|notes|solo|letters|echo)@/.test(k)){
        raw=rawGet148(k);
        if(raw&&raw!=='[]'&&raw!=='{}')return false;
      }
      if(/^lamp_friends101@/.test(k)){
        try{f=JSON.parse(rawGet148(k)||'{}')}catch(e){f=null}
        if(f&&(f.offered||(f.active&&f.active!=='lamp')))return false;
      }
    }
  }catch(e){}
  return true;
}
function closeTour148(){
  var d=document.querySelector('dialog.tour148');
  if(d&&d.open)try{d.close()}catch(e){}
  if(d)d.remove();
}
function finishTour148(){
  rawSet148('lamp_tour148','1');
  try{
    var f=typeof friendsLoad101==='function'?friendsLoad101(pid148()):null;
    if(f){f.offered=true;if(typeof friendsPut101==='function')friendsPut101(f,pid148());}
  }catch(e){}
  closeTour148();
}
function tourStep148(step){
  css148();
  closeTour148();
  var d=document.createElement('dialog');
  d.className='tour148';
  d.setAttribute('aria-modal','true');
  var title=t148('A first look');
  d.setAttribute('aria-label',title);
  var body='';
  if(step===1){
    body='<h2 class="kline">'+e148(title)+'</h2><p class="kline">'+e148(t148('Pick a friend, then pick a story style, then go.'))+'</p><p class="soft">'+e148(t148('Pick a friend'))+'</p>';
    body+='<div class="friendPick101" role="list">';
    CORE148.forEach(function(k){
      var art='',nm=k,st=viewStage148(k,pid148());
      try{
        if(typeof friendKindName101==='function')nm=friendKindName101(k);
        var prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
        try{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=k;art=typeof lampSvg73==='function'?lampSvg73(st,'',false):''}finally{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev;}
      }catch(e){}
      body+='<button type="button" role="listitem" data-tour-friend="'+k+'" data-stage148="'+st+'" aria-label="'+e148(nm)+'">'+art+'<span class="kline">'+e148(nm)+'</span></button>';
    });
    body+='</div>';
  }else if(step===2){
    body='<h2 class="kline">'+e148(title)+'</h2><p class="kline">'+e148(t148('Then pick a story style'))+'</p>';
    body+='<div class="style148">';
    var cur=(root.IL140&&IL140.loadStyle)?IL140.loadStyle():'cave';
    STYLES148.forEach(function(id){
      var nm=t148(STYLE_NAME148[id]);
      body+='<button type="button" data-tour-style="'+id+'" class="'+(cur===id?'p':'')+'" aria-pressed="'+(cur===id?'true':'false')+'">'+e148(nm)+'</button>';
    });
    body+='</div>';
  }else{
    body='<h2 class="kline">'+e148(title)+'</h2><p class="kline">'+e148(t148('Then go'))+'</p><p><button type="button" class="p" data-tour-go="1">'+e148(t148("Let's go"))+'</button></p>';
  }
  d.innerHTML=body;
  document.body.appendChild(d);
  try{d.showModal()}catch(e){try{d.show()}catch(e2){}}
  d.addEventListener('click',function(ev){
    var b=ev.target.closest('button');if(!b)return;
    var fr=b.getAttribute('data-tour-friend');
    var st=b.getAttribute('data-tour-style');
    if(fr){
      try{if(typeof friendPick101==='function')friendPick101(fr,pid148());else note148(fr);}catch(e){}
      tourStep148(2);return;
    }
    if(st){
      try{if(root.IL140&&typeof IL140.pickStyle==='function')IL140.pickStyle(st);else if(root.IL140&&typeof IL140.loadStyle==='function'){/* fallback */try{localStorage.setItem('ll-story-style',st)}catch(e){}}}catch(e){}
      tourStep148(3);return;
    }
    if(b.getAttribute('data-tour-go'))finishTour148();
  });
  d.addEventListener('cancel',function(ev){ev.preventDefault();});
}
function maybeTour148(){
  if(!tourFresh148())return;
  if(document.querySelector('dialog.tour148, dialog.lamp73-dialog, dialog.friendOffer101'))return;
  tourStep148(1);
}
function hookTour148(){
  if(typeof friendOfferMaybe101==='function'&&!friendOfferMaybe101._v148){
    var prev=friendOfferMaybe101;
    friendOfferMaybe101=function(){
      if(tourFresh148()||document.querySelector('dialog.tour148'))return;
      return prev.apply(this,arguments);
    };
    friendOfferMaybe101._v148=1;
  }
}

/* ---- Take it outside (text only) ---- */
var OUT148={
  bell:['When a bell rings, it really shakes. Dip a ringing fork in water and it splashes!','Cuando una campana suena, de verdad tiembla. ¡Mete un diapasón que está sonando en agua y salpica!'],
  sun:["Scientists turned the Sun's shaking into a low, sleepy hum",'Los científicos convirtieron el temblor del Sol en un zumbido bajo y somnoliento'],
  earth:["Way out in space, Earth looks like one tiny blue dot, and you're on it.",'Allá en el espacio, la Tierra se ve como un puntito azul, y tú estás en él.'],
  story:['When you go outside, notice one small thing and tell someone.','Cuando salgas, fíjate en una cosa pequeña y cuéntasela a alguien.']
};
function outLine148(key){
  var row=OUT148[key]||OUT148.story;
  var es=false;
  try{es=((typeof LANG!=='undefined'&&LANG==='es')||(typeof lang!=='undefined'&&lang==='es'))}catch(e){}
  return es?row[1]:row[0];
}
function outP148(key){return '<p class="out148 soft" data-out148="'+key+'">'+e148(t148(OUT148[key]?OUT148[key][0]:OUT148.story[0]))+'</p>'}
function insertOut148(host,key){
  if(!host||host.querySelector('[data-out148="'+key+'"]'))return;
  host.insertAdjacentHTML('beforeend',outP148(key));
}
function hookOutside148(){
  if(typeof start==='function'&&!start._v148){
    var prevS=start;
    start=function(){
      var r=prevS.apply(this,arguments);
      try{
        var card=document.querySelector('#session .card[style*="dashed"], #session .card');
        var all=document.querySelectorAll('#session .card');
        var take=null;
        all.forEach(function(c){if(/Takeaway|Para llevar|💡/.test(c.textContent||''))take=c;});
        if(take)insertOut148(take,'story');
      }catch(e){}
      return r;
    };
    start._v148=1;
  }
  if(typeof dailyGlow64==='function'&&!dailyGlow64._v148){
    var prevG=dailyGlow64;
    dailyGlow64=function(){
      var r=prevG.apply(this,arguments);
      try{
        var card=document.querySelector('.dailyGlowCard64');
        if(card)insertOut148(card,'story');
      }catch(e){}
      return r;
    };
    dailyGlow64._v148=1;
  }
  if(typeof scTap101==='function'&&!scTap101._v148){
    var prevT=scTap101;
    scTap101=function(id){
      var r=prevT.apply(this,arguments);
      try{
        if(id==='bell'||id==='bike'){
          var root=$('soundcards');
          if(root)insertOut148(root.querySelector('.card')||root,'bell');
        }
      }catch(e){}
      return r;
    };
    scTap101._v148=1;
  }
  if(typeof luRender83==='function'&&!luRender83._v148){
    var prevL=luRender83;
    luRender83=function(){
      var r=prevL.apply(this,arguments);
      try{
        var card=document.querySelector('#lookup .lu83-card');
        if(!card||typeof LU83!=='object')return r;
        if(LU83.screen===2)insertOut148(card,'sun');
        if(LU83.screen===4||LU83.foundEarth)insertOut148(card,'earth');
      }catch(e){}
      return r;
    };
    luRender83._v148=1;
  }
  if(typeof skyHTML112==='function'&&!skyHTML112._v148){
    var prevY=skyHTML112;
    skyHTML112=function(){
      var html=prevY.apply(this,arguments);
      try{
        if(html&&html.indexOf('data-out148="sun"')<0){
          html=html.replace(/<\/div>\s*$/,outP148('sun')+outP148('earth')+'</div>');
        }
      }catch(e){}
      return html;
    };
    skyHTML112._v148=1;
  }
}

function after148(id){
  css148();
  hookGoodnight148();
  decorateGlow148(id?$(id):document);
  if(id==='hub'||!id) try{maybeTour148()}catch(e){}
  if(id==='bedtime'||id==='candle') hookGoodnight148();
  if(id==='lookup'){try{if(typeof luRender83==='function'){/* lines hook already wraps */}}catch(e){}}
}

function install(){
  css148();
  hookNotes148();
  hookPicker148();
  hookTour148();
  hookOutside148();
  hookGoodnight148();
  if(typeof afterShow95==='function'&&!afterShow95._v148){
    var prev=afterShow95;
    afterShow95=function(id){
      var r=prev.apply(this,arguments);
      try{after148(id)}catch(e){}
      return r;
    };
    afterShow95._v148=1;
  }
  if(typeof lampMountAll73==='function'&&!lampMountAll73._v148){
    var prevM=lampMountAll73;
    lampMountAll73=function(){
      var r=prevM.apply(this,arguments);
      try{decorateGlow148(document)}catch(e){}
      return r;
    };
    lampMountAll73._v148=1;
  }
  try{decorateGlow148(document)}catch(e){}
  try{if(tourFresh148()&&$('hub')&&!$('hub').classList.contains('hidden'))maybeTour148()}catch(e){}
}

root.IL148={
  version:148,
  mergeVoro:mergeVoro148,
  glowNight:glowNight148,
  pose:poseOn148,
  note:note148,
  viewStage:viewStage148,
  startTour:function(){tourStep148(1)},
  install:install
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v149: Grow a Fractal 2 (15-20 KB). No show() wrap. */
(function(root){'use strict';var SH=['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];var LAB={tree:'Tree',sunflower:'Sunflower',triangle:'Triangle',dragon:'Dragon',pythagoras:'Pythagoras tree',hilbert:'Hilbert',spirals:'Spiral of spirals',fern:'Fern'};var RAMP=['#3D6A62','#4e6b5c','#E6B454','#C45A3A'];var SECRET={lamp:'tree',dragon:'dragon',phoenix:'sunflower',turtle:'pythagoras',owl:'hilbert',moth:'fern'};var MAX={hilbert:4,fern:5};var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];var I='#72583f',A='#E6B454',G='#4e6b5c',T='#3D6A62',VO=[],FA=0;function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}function e(s){return typeof patEsc==='function'?patEsc(s):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}function pid(){try{return(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}catch(ex){return''}}function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}function sfx(){try{return typeof lampSfxOn73!=='function'||!!lampSfxOn73()}catch(ex){return true}}function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}function rG(k){try{return(typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k)}catch(ex){return null}}function rS(k,v){try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,v);else localStorage.setItem(k,v)}catch(ex){}}function oN(){return rG('lamp_gaf2@'+pid())==='1'}function oS(){rS('lamp_gaf2@'+pid(),'1')}function cO(sh){return MAX[sh]||6}function col(d){return RAMP[d%4]}function acx(){try{return typeof ac==='function'?ac():(typeof AC!=='undefined'?AC:null)}catch(ex){return null}}function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v149)return;var next=wrap(prev);next._v149=1;next._base=prev;root[name]=next;}function css(){if(document.getElementById('v149css'))return;var s=document.createElement('style');s.id='v149css';s.textContent='.g9w{position:relative;display:inline-block;max-width:100%}'+'.g9sw{transform-origin:50% 100%;animation:g9a 9s ease-in-out infinite}'+'.g9sp{transform-origin:50% 50%;animation:g9b 120s linear infinite}'+'@keyframes g9a{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}'+'@keyframes g9b{to{transform:rotate(360deg)}}'+'@media(prefers-reduced-motion:reduce){.g9sw,.g9sp{animation:none}}'+'.reduce73 .g9sw,.reduce73 .g9sp{animation:none}'+'.g9c{font-size:1.6rem;margin:.4rem 0;color:'+I+';text-align:center}'+'.g9p{position:absolute;right:6px;bottom:6px;width:56px;height:56px;pointer-events:none}'+'.g9p svg{width:56px;height:56px;filter:drop-shadow(0 0 6px '+A+')}'+'.g9k{display:flex;gap:8px;justify-content:center;align-items:flex-end;margin:10px 0;flex-wrap:wrap}'+'.g9k figure{margin:0;text-align:center}'+'.g9k svg,.g9n svg{display:block}'+'.g9l{border:2px solid '+I+';border-radius:18px 18px 40px 40px;padding:12px 14px 16px;background:#fff8ec;max-width:22rem;margin:8px auto;text-align:center}'+'.g9n{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:10px 0;list-style:none;padding:0}'+'.g9n li{margin:0;padding:8px;border-radius:14px;background:var(--card,#fffaf0);text-align:center;font-size:.9rem;line-height:1.35}'+'.g9n svg{width:72px;height:72px;margin:0 auto}'+'#gaf149print{display:none}'+'@media print{body>*{display:none!important}#gaf149print{display:block!important}}';document.head.appendChild(s);}function lcg(s){s=s>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}}function fernPts(seed,n){var rnd=lcg(seed||109),pts=new Float32Array(n*2),x=0,y=0,i,k,r,a,nx,ny;for(i=0;i<n;i++){r=rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];nx=a[0]*x+a[1]*y+a[4];ny=a[2]*x+a[3]*y+a[5];x=nx;y=ny;pts[i*2]=x;pts[i*2+1]=y;}return pts;}function hilbert(n){n=Math.max(1,Math.min(4,n||1));var pts=[],N=1<<n,i;function d2xy(n,d){var x=0,y=0,s,rx,ry,t;for(s=1;s<n;s*=2){rx=1&(d>>1);ry=1&(d^rx);if(!ry){if(rx){x=s-1-x;y=s-1-y}t=x;x=y;y=t}x+=s*rx;y+=s*ry;d>>=2;}return[x,y];}for(i=0;i<N*N;i++)pts.push(d2xy(N,i));return pts;}function dF(x,W,H,rec,upto){var seed=rec.seed||109,n=Math.max(1,Math.min(20000,upto||((rec.depth||1)*4000)));var pts=fernPts(seed,n),i;x.fillStyle=col(2);for(i=0;i<n;i++)x.fillRect(W*(.5+pts[i*2]*0.18),H*(.92-pts[i*2+1]*0.082),1.2,1.2);}function dP(x,W,H,rec){var depth=Math.max(0,Math.min(cO('pythagoras'),rec.depth||0));function sq(px,py,s,a,d){if(d>depth||s<2)return;var c=Math.cos(a),si=Math.sin(a);var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;x.fillStyle=x.strokeStyle=col(d);x.lineWidth=Math.max(.8,3-d*.35);x.beginPath();x.moveTo(px,py);x.lineTo(x2,y2);x.lineTo(x3,y3);x.lineTo(x4,y4);x.closePath();x.fill();x.stroke();if(d===depth)return;var ang=(rec.angle||28)*Math.PI/180,sl=s*Math.cos(ang),sr=s*Math.sin(ang);sq(x4,y4,sl,a+ang,d+1);sq(x3,y3,sr,a+ang-Math.PI/2,d+1);}var s=Math.min(W,H)*0.16;sq(W/2-s/2,H*0.86,s,-Math.PI/2,0);}function dH(x,W,H,rec){var n=Math.max(1,Math.min(4,rec.depth||1)),pts=hilbert(n),i,pad=W*0.08,span=W-pad*2,N=(1<<n)-1||1;x.strokeStyle=col(2);x.lineWidth=Math.max(1,5-n);x.lineCap='round';x.beginPath();for(i=0;i<pts.length;i++){var X=pad+pts[i][0]/N*span,Y=pad+pts[i][1]/N*span;i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();rec._hil=pts;rec._hilN=N;rec._hilPad=pad;rec._hilSpan=span;}function dS(x,W,H,rec){var depth=Math.max(0,Math.min(6,rec.depth||0));function sp(cx,cy,s,rot,d){if(d>depth||s<4)return;x.strokeStyle=col(d);x.lineWidth=Math.max(.7,2.4-d*.3);x.beginPath();var i,r,a,first=1,px,py;for(i=0;i<=90;i++){a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;first?(x.moveTo(px,py),first=0):x.lineTo(px,py);}x.stroke();if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*.32,rot+.4,d+1)}}sp(W/2,H/2,Math.min(W,H)*0.28,0,0);}function cC(cv){var x=cv.getContext('2d'),W=cv.width,H=cv.height;x.fillStyle=night()?'#0d0f1a':'#fff8ec';x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round';return{x:x,W:W,H:H};}var DRAW={fern:dF,pythagoras:dP,hilbert:dH,spirals:dS};function d9(cv,rec){if(rec.shape==='fern'&&FA)return;var c=cC(cv),fn=DRAW[rec.shape];if(fn)fn(c.x,c.W,c.H,rec);}function chop(){while(VO.length>4){try{VO.shift().stop()}catch(ex){}}}function tone(sh,level){if(!sfx())return;var c=acx();if(!c)return;var t0=c.currentTime+.02,quiet=night()||(document.body&&document.body.classList.contains('bedtime'));var vol=quiet?.04:.07,freq=[262,294,330,392,440,523][Math.max(0,Math.min(level,5))];var typ=sh==='dragon'?'triangle':sh==='hilbert'?'square':'sine';try{var o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),g2=c.createGain(),p=c.createStereoPanner&&c.createStereoPanner();o.type=typ;o.frequency.value=freq;o2.type='sine';o2.frequency.value=freq*5/4;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+.05);g.gain.exponentialRampToValueAtTime(.0008,t0+.7);g2.gain.setValueAtTime(0,t0);g2.gain.linearRampToValueAtTime(vol*.35,t0+.06);g2.gain.exponentialRampToValueAtTime(.0008,t0+1);if(p){p.pan.setValueAtTime((level%3-1)*.35,t0);o.connect(g);g.connect(p);o2.connect(g2);g2.connect(p);p.connect(c.destination)}else{o.connect(g);g.connect(c.destination);o2.connect(g2);g2.connect(c.destination)}o.start(t0);o.stop(t0+.75);o2.start(t0);o2.stop(t0+1.05);VO.push(o,o2);chop();}catch(ex){}}function copies(rec){var d=rec.depth||0,sh=rec.shape;if(sh==='triangle')return Math.pow(3,d);if(sh==='hilbert')return Math.pow(4,Math.max(0,d));if(sh==='fern')return Math.min(20000,Math.max(0,d)*4000);if(sh==='sunflower')return Math.min(240,8+d*d*8);if(sh==='spirals')return d?(Math.pow(5,d)-1)/4:1;return Math.pow(2,d);}function pth(d,c,w){return'<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(w||2)+'" stroke-linecap="round"/>'}function nS(id){var b='<svg viewBox="0 0 72 72" aria-hidden="true">',z='</svg>';if(id==='fern')return b+pth('M36 64 C34 44 28 28 20 16 M36 64 C38 44 44 28 52 16 M36 50 C28 46 22 40 16 36 M36 50 C44 46 50 40 56 36 M36 38 C30 34 26 28 22 24 M36 38 C42 34 46 28 50 24',G)+z;if(id==='romanesco')return b+'<circle cx="36" cy="42" r="16" fill="'+G+'" stroke="'+I+'"/><circle cx="36" cy="24" r="9" fill="'+A+'" stroke="'+I+'"/><circle cx="24" cy="34" r="7" fill="'+T+'" stroke="'+I+'"/><circle cx="48" cy="34" r="7" fill="'+T+'" stroke="'+I+'"/>'+z;if(id==='river')return b+pth('M36 8 C40 20 28 28 36 40 C44 52 30 58 36 66 M36 40 C22 44 18 52 16 62 M36 40 C50 46 56 54 58 64',T,2.2)+z;if(id==='lightning')return b+'<path d="M40 8 L28 32 H40 L30 64 L50 28 H36 Z" fill="'+A+'" stroke="'+I+'" stroke-linejoin="round"/>'+z;if(id==='tree')return b+pth('M36 64 V34 M36 48 L22 30 M36 48 L50 30 M22 30 L16 20 M22 30 L26 18 M50 30 L46 18 M50 30 L56 20',I)+'<circle cx="36" cy="32" r="3" fill="'+A+'"/>'+z;if(id==='shell')return b+pth('M36 56 C18 56 14 28 36 20 C58 28 54 56 36 56',A)+pth('M36 52 C24 48 24 32 36 28 C48 32 48 48 36 52',I,1.4)+pth('M36 44 C32 42 32 36 36 35',I)+z;if(id==='snow')return b+'<g stroke="'+T+'" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M36 12 V60 M16 24 L56 48 M16 48 L56 24"/><path d="M36 12 L32 18 M36 12 L40 18 M36 60 L32 54 M36 60 L40 54"/></g>'+z;var d='',i,a;for(i=0;i<6;i++){a=i*Math.PI/3-Math.PI/6;d+='<polygon points="36,36 '+(36+14*Math.cos(a)).toFixed(1)+','+(36+14*Math.sin(a)).toFixed(1)+' '+(36+14*Math.cos(a+Math.PI/3)).toFixed(1)+','+(36+14*Math.sin(a+Math.PI/3)).toFixed(1)+'"/>'}return b+'<g fill="'+A+'" stroke="'+I+'">'+d+'</g>'+z;}function pA(group,id){try{var items=PAT_PAIRS106[group].items,i,it,L=(document.documentElement.lang||'en').slice(0,2)==='es'?'es':'en';for(i=0;i<items.length;i++)if(items[i].id===id){it=items[i];return[it[L].t,it[L].c,it.src]}}catch(ex){}return null;}function nF(host){if(!host||host.dataset.gaf2)return;var prev=root.patNatureCard106&&root.patNatureCard106._base,ids=['fern','romanesco','river','lightning','tree'],extra=[['spirals','nautilus','shell'],['hexagons','flake','snow'],['hexagons','honey','honey']];var cred={fern:t('Haeckel, Plate 52 (1904); Blossfeldt (1928).'),river:t('A public river-delta picture (USGS / NASA).'),lightning:t('A public lightning picture (NOAA).'),snow:t('Wilson Bentley photographed snowflakes in 1902.')};if(typeof prev==='function'){delete host.dataset.on;prev()}var ul=host.querySelector('ul')||host;ul.classList.add('g9n');[].forEach.call(host.querySelectorAll('li'),function(li,i){var c=cred[ids[i]],s=li.querySelector('.soft');if(c&&s)s.textContent=c;li.insertAdjacentHTML('afterbegin',nS(ids[i]));});extra.forEach(function(r){var p=pA(r[0],r[1]);if(!p)return;var li=document.createElement('li');li.innerHTML=nS(r[2])+'<b>'+e(p[0])+'</b> — '+e(p[1])+' <span class="soft">'+e(cred[r[2]]||t('This fact follows {src}.',{src:p[2]}))+'</span>';ul.appendChild(li);});host.dataset.on=host.dataset.gaf2='1';}function rN(g){g=g||grow();return[Math.max(0,SH.indexOf(g.shape)),g.pal||0,Math.round((g.angle||28)*10)/10,g.depth||0];}function pic(i,n){var s='<svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">';if(i===0)s+='<circle cx="22" cy="22" r="6" fill="'+A+'" stroke="'+I+'"/>';else if(i===1)s+='<rect x="8" y="8" width="28" height="28" rx="6" fill="'+RAMP[n%4]+'" stroke="'+I+'"/>';else if(i===2)s+='<path d="M10 32 Q22 8 34 32" fill="none" stroke="'+I+'" stroke-width="2"/>';else s+='<path d="M8 34 H36 M8 26 H28 M8 18 H22" stroke="'+I+'" stroke-width="2" fill="none"/>';return s+'</svg>';}function cH(g){var n=rN(g),labs=[t('Seed'),t('Palette'),t('Bend'),t('Grow')];return'<div class="g9l" data-gafcode149="1"><p class="soft">'+e(t('A recipe with no data sent away.'))+'</p><div class="g9k">'+n.map(function(v,i){return'<figure>'+pic(i,v)+'<figcaption class="kline">'+e(String(v))+'<br><span class="soft">'+e(labs[i])+'</span></figcaption></figure>'}).join('')+'</div><p><button type="button" class="p" data-gafprint149="1">'+e(t('Print recipe card'))+'</button></p></div>';}function pC(){var g=grow(),box=document.getElementById('gaf149print');if(!box){box=document.createElement('div');box.id='gaf149print';document.body.appendChild(box)}box.innerHTML='<div class="g9l"><h2>'+e(t('Grow a Fractal'))+'</h2>'+cH(g)+'</div>';try{window.print()}catch(ex){}}function un(cv){if(rd()||!cv)return;var x=cv.getContext('2d'),W=cv.width,H=cv.height,img,i=0;try{img=x.getImageData(0,0,W,H)}catch(ex){return}(function tick(){i++;x.putImageData(img,0,0);x.fillStyle=night()?'#0d0f1a':'#fff8ec';x.fillRect(0,H*i/36,W,H);if(i<36)requestAnimationFrame(tick);})();}function dC(cv){var x=cv.getContext('2d'),W=cv.width,H=cv.height,img;try{img=x.getImageData(0,0,W,H)}catch(ex){return}x.fillStyle='rgba(13,15,26,.45)';x.fillRect(0,0,W,H);x.save();x.beginPath();x.arc(W*.62,H*.38,Math.min(W,H)*.16,0,Math.PI*2);x.clip();x.putImageData(img,0,0);x.restore();setTimeout(function(){x.putImageData(img,0,0)},2800);}function bead(cv,rec,gen){var pts=rec._hil;if(!pts||pts.length<2)return;var x=cv.getContext('2d'),pad=rec._hilPad||cv.width*0.08,span=rec._hilSpan||cv.width*0.84,N=rec._hilN||1,i=0;(function tick(){if(gen&&cv._b149!==gen||i>=pts.length)return;x.fillStyle='#FFF6D8';x.beginPath();x.arc(pad+pts[i][0]/N*span,pad+pts[i][1]/N*span,3.2,0,Math.PI*2);x.fill();i+=Math.max(1,Math.floor(pts.length/90));requestAnimationFrame(tick);})();}function wC(cv,rec){if(!cv)return;var host=cv.parentElement,peek,active='',want,art;if(host&&!host.classList.contains('g9w')){var w=document.createElement('div');w.className='g9w';host.insertBefore(w,cv);w.appendChild(cv);host=w;}cv.classList.remove('g9sw','g9sp');if(!rd()){if(rec.shape==='tree'||rec.shape==='pythagoras')cv.classList.add('g9sw');if(rec.shape==='spirals')cv.classList.add('g9sp');}peek=host&&host.querySelector('.g9p');try{active=typeof friendActive101==='function'?friendActive101(pid()):''}catch(ex){}want=SECRET[active];if(host&&want&&want===rec.shape&&(rec.depth||0)>=1){if(!peek){peek=document.createElement('div');peek.className='g9p';host.appendChild(peek)}art='';try{art=typeof friendArt101==='function'?friendArt101(active,3):''}catch(ex){}peek.innerHTML=art;peek.hidden=false;}else if(peek)peek.hidden=true;if(!cv._lp149){cv._lp149=1;var hold=null;cv.addEventListener('pointerdown',function(ev){if(hold)clearTimeout(hold);hold=setTimeout(function(){dC(cv)},400)});['pointerup','pointerleave','pointercancel'].forEach(function(n){cv.addEventListener(n,function(){clearTimeout(hold)})});}if(rec.shape==='hilbert'&&(rec.depth||0)>=1&&!rd()){cv._b149=(cv._b149||0)+1;bead(cv,rec,cv._b149)}if(rec.shape==='dragon'&&(rec.depth||0)>=1)un(cv);}function sD(cv){var c=cC(cv);c.x.fillStyle=A;c.x.beginPath();c.x.arc(c.W/2,c.H*0.7,5,0,Math.PI*2);c.x.fill()}function iH(cv,fn){if(rd()||!cv){fn();return}cv.style.transition='transform 1.2s ease';cv.style.transform='scale(1.03)';setTimeout(function(){cv.style.transform='';fn()},400);}function aF(){var g=grow(),cv=$('patGrowCv');if(!g||!cv)return;if(!g.seed)g.seed=109;var cap=Math.min(20000,(g.depth||1)*4000);if(rd()){var c=cC(cv);dF(c.x,c.W,c.H,g,cap);return}var n=0;(function tick(){n=Math.min(cap,n+15);var c=cC(cv);dF(c.x,c.W,c.H,g,n);if(n<cap)setTimeout(tick,50);})();}function snap(g){if(!g)return;(g.shape==='sunflower'?[137.5,144,120]:[15,30,45,60,90]).forEach(function(tg){if(Math.abs((g.angle||0)-tg)<(g.shape==='sunflower'?2:3))g.angle=tg});}function co(){var s='',C=[T,G,A,I];function tri(x1,y1,x2,y2,x3,y3,d){if(!d){s+='<polygon points="'+[x1,y1,x2,y2,x3,y3].map(function(n){return n.toFixed(1)}).join(' ')+'" fill="'+C[(x1+y1|0)%4]+'"/>';return}var a=(x1+x2)/2,b=(y1+y2)/2,c=(x2+x3)/2,d2=(y2+y3)/2,e2=(x3+x1)/2,f=(y3+y1)/2;tri(x1,y1,a,b,e2,f,d-1);tri(a,b,x2,y2,c,d2,d-1);tri(e2,f,c,d2,x3,y3,d-1);}tri(36,8,68,64,4,64,3);return'<svg viewBox="0 0 72 72" width="72" height="72" aria-hidden="true"><rect width="72" height="72" fill="#fff8ec" stroke="'+I+'"/>'+s+'</svg>';}function aC(){var box=$('adults');if(!box||box.querySelector('[data-gafad149]'))return;var d=document.createElement('div');d.className='card';d.dataset.gafad149='1';d.innerHTML='<h3 class="kline">'+e(t('Grow a Fractal'))+'</h3>'+'<p class="kline">'+e(t('Each split of a Pythagoras tree makes two smaller squares whose areas add up to the one they grew from.'))+'</p>'+'<p class="kline">'+e(t('A Koch edge keeps getting longer, but the area it encloses never gets bigger.'))+'</p>'+'<p class="soft kline">'+e(t('People drew this long ago: Haeckel, Plate 52 (1904); Blossfeldt, 1928; Bentley, 1902; Koch, 1904; Dürer, 1525.'))+'</p>'+'<p class="kline">'+co()+' '+e(t('Long ago, Cosmati floors were made of repeating little shapes.'))+'</p>';box.appendChild(d);}function en(){css();var el=$('patterns');if(!el)return;var g=grow(),cv=$('patGrowCv'),slot,row,b,host,msg;el.querySelectorAll('button[onclick*="patGrowSet106(\'shape\'"]').forEach(function(btn){var m=/patGrowSet106\('shape','([^']+)'\)/.exec(btn.getAttribute('onclick')||'');if(m&&LAB[m[1]]&&(!btn.textContent||btn.textContent==='undefined'||btn.textContent===m[1]))btn.textContent=t(LAB[m[1]]);});var rows=el.querySelectorAll('.pat-row');if(!oN()&&!(g.depth>0)){rows.forEach(function(r,i){if(i<2)r.hidden=true});var gal=$('patGal106');if(gal)[gal,gal.previousElementSibling,gal.previousElementSibling&&gal.previousElementSibling.previousElementSibling].forEach(function(n){if(n)n.hidden=true});if(cv)sD(cv);}else rows.forEach(function(r){r.hidden=false});if(cv&&(g.depth||0)>0)wC(cv,g);if((g.depth||0)>0){slot=$('gaf149count');if(!slot&&cv){slot=document.createElement('p');slot.id='gaf149count';slot.className='g9c';slot.setAttribute('aria-hidden','true');(cv.parentElement||cv).insertAdjacentElement('afterend',slot)}if(slot)slot.textContent=String(copies(g));}if(g.shape==='fern'&&(g.depth||0)>0&&!el.querySelector('[data-gafern149]')){b=document.createElement('button');b.type='button';b.dataset.gafern149='1';b.textContent=t('Again?');b.onclick=aF;row=el.querySelector('[onclick="patGrowStep106()"]');if(row&&row.parentNode)row.parentNode.appendChild(b);else el.appendChild(b);}host=el.querySelector('[data-gafcode149]');if((g.depth||0)>0){if(host)host.outerHTML=cH(g);else{(msg=$('patGrowMsg'))?msg.insertAdjacentHTML('afterend',cH(g)):cv&&cv.insertAdjacentHTML('afterend',cH(g))}var pb=el.querySelector('[data-gafprint149]');if(pb)pb.onclick=pC;}var nat=$('patNature106');if(nat&&(g.depth||0)>=2)nF(nat);}function install(){css();if(typeof PAT_SHAPES106!=='undefined')SH.forEach(function(id){if(PAT_SHAPES106.indexOf(id)<0)PAT_SHAPES106.push(id)});hook('patGrowDrawOn106',function(prev){return function(cv,rec){rec=rec||{};if(DRAW[rec.shape]){d9(cv,rec);return}return prev.apply(this,arguments)}});hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{en()}catch(ex){}return r}});hook('patGrowStep106',function(prev){return function(){var g=grow(),cv=$('patGrowCv'),self=this,args=arguments;if(g&&g.shape){var cap=cO(g.shape);if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;if(g.shape==='fern'&&!g.seed)g.seed=109;}function go(){var fern=g&&g.shape==='fern'&&!rd();if(fern)FA=1;prev.apply(self,args);FA=0;try{if(g&&g.shape){oS();tone(g.shape,g.depth||1)}if(fern)aF()}catch(ex){}}if(cv&&g&&!(g.depth>0)&&!oN()&&!rd()){if(g._ih)return;g._ih=1;iH(cv,function(){g._ih=0;go()})}else go();}});hook('patGrowSet106',function(prev){return function(k,v){var r=prev.apply(this,arguments);try{var g=grow();if(k==='shape'&&g){g.depth=0;if(v==='fern'&&!g.seed)g.seed=109;if(v==='sunflower')g.angle=g.angle||137.5}}catch(ex){}return r;}});hook('patGrowTwist106',function(prev){return function(){var r=prev.apply(this,arguments);try{snap(grow())}catch(ex){}return r}});hook('patNatureCard106',function(prev){var f=function(){var h=$('patNature106');if(h)nF(h)};f._base=prev;return f});hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='adults')aC();if(id==='patterns')en()}catch(ex){}return r}});}root.IL149={version:149,shapes:SH,fernPts:fernPts,hilbert:hilbert,copies:copies,install:install,secret:SECRET};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();})(typeof window!=='undefined'?window:this);
/* v150: Grow a Fractal 2 hotfix (Pi v149 recheck). No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var RAMP=['#3D6A62','#4e6b5c','#E6B454','#C45A3A'];
var MAX={hilbert:4,fern:5,spirals:2};
var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function rd(){try{return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function grow(){return (typeof PAT106==='object'&&PAT106.grow)||{}}
function col(d){return RAMP[d%4]}
function capOf(sh){return MAX[sh]||6}
function pidKey(){return 'lamp_gaf2@'+(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}
function isOpen(){try{var k=pidKey();return ((typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k))==='1'}catch(ex){return false}}
function markOpen(){try{var k=pidKey();if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,'1');else localStorage.setItem(k,'1')}catch(ex){}}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v150)return;
  var next=wrap(prev);
  next._v150=1;
  /* Keep v149's original _base. nF reads patNatureCard106._base; overwriting it with v149's wrapper recurses. */
  next._base=prev._base||prev;root[name]=next;
}
function lcg(s){s=s>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}}
function fernPts(seed,n){
  if(typeof IL149==='object'&&typeof IL149.fernPts==='function')return IL149.fernPts(seed,n);
  var rnd=lcg(seed||109),pts=new Float32Array(n*2),x=0,y=0,i,k,r,a,nx,ny;
  for(i=0;i<n;i++){
    r=rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];
    nx=a[0]*x+a[1]*y+a[4];ny=a[2]*x+a[3]*y+a[5];x=nx;y=ny;
    pts[i*2]=x;pts[i*2+1]=y;
  }
  return pts;
}
/* Collect Pythagoras squares with Pi's 3-line child placement. */
function treeBoxes(angDeg,depth){
  var boxes=[],ang=(angDeg==null?28:angDeg)*Math.PI/180;
  depth=Math.max(0,Math.min(6,depth||0));
  function sq(px,py,s,a,d){
    if(d>depth||s<2)return;
    var c=Math.cos(a),si=Math.sin(a);
    var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
    boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
    if(d===depth)return;
    var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
    var bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
    sq(x2,y2,sl,a-ang,d+1);
    sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
  }
  var s0=360*0.16;
  sq(360/2-s0/2,360*0.86,s0,-Math.PI/2,0);
  return boxes;
}
function drawPyth(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('pythagoras'),rec.depth||0));
  var ang=(rec.angle||28)*Math.PI/180,boxes=[];
  function sq(px,py,s,a,d){
    if(d>depth||s<2)return;
    var c=Math.cos(a),si=Math.sin(a);
    var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
    boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
    if(d===depth)return;
    var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
    var bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
    sq(x2,y2,sl,a-ang,d+1);
    sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
  }
  var s0=Math.min(W,H)*0.16;
  sq(W/2-s0/2,H*0.86,s0,-Math.PI/2,0);
  rec._n=0;
  for(var i=0;i<boxes.length;i++) if(boxes[i].d===depth) rec._n++;
  if(!boxes.length)return;
  var minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9,j,p,b;
  for(i=0;i<boxes.length;i++) for(j=0;j<4;j++){
    p=boxes[i].P[j];
    if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
    if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
  }
  var pad=Math.min(W,H)*0.08,sc=Math.min((W-2*pad)/Math.max(maxx-minx,1e-6),(H-2*pad)/Math.max(maxy-miny,1e-6));
  var cx=(minx+maxx)/2,cy=(miny+maxy)/2;
  function mx(v){return W/2+(v-cx)*sc}
  function my(v){return H/2+(v-cy)*sc}
  for(i=0;i<boxes.length;i++){
    b=boxes[i];p=b.P;
    x.fillStyle=x.strokeStyle=col(b.d);
    x.lineWidth=Math.max(1.5,3-b.d*.35);
    x.beginPath();x.moveTo(mx(p[0][0]),my(p[0][1]));
    for(j=1;j<4;j++)x.lineTo(mx(p[j][0]),my(p[j][1]));
    x.closePath();x.fill();x.stroke();
  }
}
function drawHil(x,W,H,rec){
  var n=Math.max(1,Math.min(4,rec.depth||1)),pts,i,pad=W*0.08,span=W-pad*2,N=(1<<n)-1||1;
  if(typeof IL149==='object'&&typeof IL149.hilbert==='function')pts=IL149.hilbert(n);
  else return;
  x.strokeStyle=col(2);x.lineWidth=Math.max(2,5-n);x.lineCap='round';x.beginPath();
  for(i=0;i<pts.length;i++){
    var X=pad+pts[i][0]/N*span,Y=pad+pts[i][1]/N*span;
    i?x.lineTo(X,Y):x.moveTo(X,Y);
  }
  x.stroke();
  rec._hil=pts;rec._hilN=N;rec._hilPad=pad;rec._hilSpan=span;
}
function drawSpirals(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('spirals'),rec.depth||0)),n=0;
  function sp(cx,cy,s,rot,d){
    if(d>depth||s<4)return;
    n++;
    x.strokeStyle=col(d);x.lineWidth=Math.max(1.8,2.4-d*.3);x.beginPath();
    var i,r,a,first=1,px,py;
    for(i=0;i<=90;i++){
      a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;
      first?(x.moveTo(px,py),first=0):x.lineTo(px,py);
    }
    x.stroke();
    if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*.32,rot+.4,d+1)}
  }
  sp(W/2,H/2,Math.min(W,H)*0.28,0,0);
  rec._n=n;
}
function fernDot(W,H,pts,i){return [W*(.5+pts[i*2]*0.18),H*(.92-pts[i*2+1]*0.082)]}
function drawFernRange(x,W,H,pts,from,to){
  x.fillStyle=col(2);
  for(var i=from;i<to;i++){
    var p=fernDot(W,H,pts,i);
    x.fillRect(p[0],p[1],1.6,1.6);
  }
}
function clearCv(cv){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  x.fillStyle=night()?'#0d0f1a':'#fff8ec';x.fillRect(0,0,W,H);
  x.lineCap='round';x.lineJoin='round';
  return {x:x,W:W,H:H};
}
function drawFernFull(x,W,H,rec,upto){
  var n=Math.max(1,Math.min(20000,upto||((rec.depth||1)*4000)));
  drawFernRange(x,W,H,fernPts(rec.seed||109,n),0,n);
  rec._n=n;
}
var block=0;
function runFern(cv,rec,from,to,clearFirst){
  if(!rec)return;
  cv=cv||(typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'));
  if(!cv)return;
  var tok=cv._f150=(cv._f150||0)+1;
  rec._fernTok=tok;
  var cap=Math.max(1,Math.min(20000,to));
  from=Math.max(0,Math.min(from||0,cap));
  if(rd()){
    var c=clearCv(cv);drawFernFull(c.x,c.W,c.H,rec,cap);block=0;rec._fernN=cv._fernN=cap;rec._n=cap;updateCount(rec);return;
  }
  block=1;
  var pts=fernPts(rec.seed||109,cap),x=cv.getContext('2d'),W=cv.width,H=cv.height,n=from;
  if(clearFirst){clearCv(cv);n=0}
  else if(n>0){clearCv(cv);drawFernRange(x,W,H,pts,0,n)}
  else clearCv(cv);
  (function tick(){
    if(cv._f150!==tok)return;
    var next=Math.min(cap,n+15);
    drawFernRange(x,W,H,pts,n,next);
    n=next;rec._fernN=cv._fernN=n;rec._n=n;updateCount(rec);
    if(n<cap)setTimeout(tick,50);
    else if(cv._f150===tok)block=0;
  })();
}
function cancelFern(cv){if(cv)cv._f150=(cv._f150||0)+1;block=0}
function copies(rec){
  rec=rec||{};
  var d=rec.depth||0,sh=rec.shape;
  if(sh==='pythagoras'||sh==='spirals'){
    if(rec._n!=null)return rec._n;
    if(sh==='spirals')return (Math.pow(5,Math.max(0,Math.min(capOf('spirals'),d))+1)-1)/4;
    return 0;
  }
  if(sh==='hilbert')return Math.pow(4,Math.max(0,d-1));
  if(sh==='fern')return rec._n!=null?rec._n:Math.min(20000,Math.max(0,d)*4000);
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='sunflower')return Math.min(240,8+d*d*8);
  return Math.pow(2,d);
}
function updateCount(rec){
  var slot=typeof $==='function'?$('gaf149count'):document.getElementById('gaf149count');
  if(slot)slot.textContent=String(copies(rec||grow()));
}
function draw150(cv,rec){
  rec=rec||{};
  var sh=rec.shape;
  if(sh==='fern'&&cv&&cv.id==='patGrowCv'&&block)return;
  if(sh==='fern'||sh==='pythagoras'||sh==='hilbert'||sh==='spirals'){
    var c=clearCv(cv);
    if(sh==='fern')drawFernFull(c.x,c.W,c.H,rec);
    else if(sh==='pythagoras')drawPyth(c.x,c.W,c.H,rec);
    else if(sh==='hilbert')drawHil(c.x,c.W,c.H,rec);
    else drawSpirals(c.x,c.W,c.H,rec);
    return true;
  }
  return false;
}
function thicken(rootEl){
  if(!rootEl)return;
  [].forEach.call(rootEl.querySelectorAll('svg [stroke]'),function(n){
    var w=parseFloat(n.getAttribute('stroke-width')||'1');
    if(!(w>=1.8))n.setAttribute('stroke-width','1.8');
  });
}
function relabelRecipe(el){
  if(!el)return;
  [].forEach.call(el.querySelectorAll('[data-gafcode149] figcaption .soft, #gaf149print figcaption .soft'),function(s){
    if(s.textContent===t('Seed')||s.textContent==='Seed'||s.textContent==='Semilla')s.textContent=t('Shape');
  });
  thicken(el.querySelector('[data-gafcode149]'));
  thicken(document.getElementById('gaf149print'));
}
function fixAdults(){
  var card=document.querySelector('[data-gafad149]');if(!card)return;
  var kochOld=t('A Koch edge keeps getting longer, but the area it encloses never gets bigger.');
  var kochNew=t('A Koch snowflake\'s edge gets 4/3 longer at every step, forever, but its area never grows past 8/5 of the first triangle.');
  var credOld=t('People drew this long ago: Haeckel, Plate 52 (1904); Blossfeldt, 1928; Bentley, 1902; Koch, 1904; Dürer, 1525.');
  var credNew=t('People drew and photographed this long ago: Haeckel, Plate 52 (1904); Blossfeldt, 1928; Bentley, 1902; Koch, 1904; Dürer, 1525.');
  [].forEach.call(card.querySelectorAll('p'),function(p){
    var txt=p.textContent||'';
    if(txt.indexOf('Koch edge')>=0||txt.indexOf('borde de Koch')>=0||txt===kochOld)p.textContent=kochNew;
    if(txt.indexOf('People drew this long ago')>=0||txt.indexOf('la gente dibujó esto')>=0||txt===credOld)p.textContent=credNew;
  });
}
function css150(){
  if(document.getElementById('v150css'))return;
  var s=document.createElement('style');
  s.id='v150css';
  s.textContent='#patGrowCv,.g9w #patGrowCv{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}'+
    '.g9e{margin:8px auto;max-width:22rem;text-align:center}'+
    '.g9e input,.g9e button{min-width:56px;min-height:56px;font-size:1.1rem;margin:4px;padding:8px 10px}'+
    '.g9e input{width:4.6em;text-align:center}';
  document.head.appendChild(s);
}
function shapes150(){
  if(typeof PAT_SHAPES106!=='undefined'&&PAT_SHAPES106&&PAT_SHAPES106.length)return PAT_SHAPES106;
  return ['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];
}
function palMax150(){return (typeof PAT_PAL106!=='undefined'&&PAT_PAL106&&PAT_PAL106.length)?PAT_PAL106.length-1:3}
function nums150(s){
  var out=[],m,re=/-?\d*\.?\d+(?:e[+-]?\d+)?/ig;
  s=Array.isArray(s)?s.join(' '):String(s||'');
  while((m=re.exec(s))&&out.length<4){var n=Number(m[0]);if(isFinite(n))out.push(n)}
  return out;
}
function parseCode150(s){
  var n=nums150(s),SH=shapes150();
  if(n.length<4)return null;
  var si=Math.max(0,Math.min(SH.length-1,Math.round(n[0])));
  var pal=Math.max(0,Math.min(palMax150(),Math.round(n[1])));
  var ang=n[2];
  if(!isFinite(ang))return null;
  var sh=SH[si]||'tree';
  var depth=Math.max(0,Math.min(capOf(sh),Math.round(n[3])));
  return {shape:sh,shapeI:si,pal:pal,angle:ang,depth:depth};
}
function applyCode150(rec){
  var g=grow();
  if(!g||!rec)return;
  cancelFern(typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'));
  g.shape=rec.shape;g.pal=rec.pal;g.angle=rec.angle;g.depth=rec.depth;g.msg='';g._n=null;g._fernN=0;
  if(g.shape==='fern'&&!g.seed)g.seed=109;
  if(g.q)g.q.length=0;g.busy=false;
  markOpen();
  block=g.shape==='fern'?1:0;
  if(typeof patGrowDraw106==='function')patGrowDraw106();
  if(g.shape==='fern'&&g.depth>0){
    var cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
    runFern(cv,g,0,Math.min(20000,g.depth*4000),true);
  }
}
function bindLoader150(el){
  var host=el&&el.querySelector('[data-gafcode149]');
  if(!host||host.querySelector('[data-gafload150]'))return;
  var box=document.createElement('div');
  box.className='g9e';box.setAttribute('data-gafload150','1');
  var labs=[t('Shape'),t('Palette'),t('Bend'),t('Grow')];
  var html='';
  for(var i=0;i<4;i++)html+='<input type="text" inputmode="decimal" aria-label="'+labs[i]+'" data-gafn="'+i+'">';
  html+='<button type="button" class="p" data-gafloadgo="1">'+t('Load recipe')+'</button>';
  html+='<p class="soft" data-gafloadmsg="1" hidden></p>';
  box.innerHTML=html;
  host.appendChild(box);
  var go=box.querySelector('[data-gafloadgo]');
  function run(){
    var vals=[].map.call(box.querySelectorAll('[data-gafn]'),function(inp){return inp.value});
    var rec=parseCode150(vals),msg=box.querySelector('[data-gafloadmsg]');
    if(!rec){
      if(msg){msg.hidden=false;msg.textContent=t("Hmm, I can't read that code.");}
      return;
    }
    if(msg){msg.hidden=true;msg.textContent='';}
    applyCode150(rec);
  }
  if(go)go.onclick=run;
  box.addEventListener('keydown',function(ev){if(ev.key==='Enter'){ev.preventDefault();run()}});
}
function peekArt150(active){
  var art='',prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
  try{
    if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=active;
    art=typeof lampSvg73==='function'?lampSvg73(3,'',false):'';
  }finally{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev;}
  return art;
}
function fixPeek150(){
  var cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'),g=grow();
  if(!cv)return;
  var host=cv.parentElement,peek=host&&host.querySelector('.g9p');
  var active='';
  try{active=typeof friendActive101==='function'?friendActive101(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():'')):''}catch(ex){}
  var want=(typeof IL149==='object'&&IL149.secret)?IL149.secret[active]:null;
  if(host&&want&&want===g.shape&&(g.depth||0)>=1){
    if(!peek){peek=document.createElement('div');peek.className='g9p';host.appendChild(peek)}
    var art=peekArt150(active);
    if(art)peek.innerHTML=art;
    peek.hidden=false;
  }else if(peek)peek.hidden=true;
}
var DIM_MS=360,DIM_A=.45;
function fadeDim150(cv,on){
  if(!cv||rd())return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,st=cv._dim150||(cv._dim150={});
  if(!st.img){try{st.img=x.getImageData(0,0,W,H)}catch(ex){return}}
  if(st.raf)cancelAnimationFrame(st.raf);
  var from=st.a||0,to=on?DIM_A:0,t0=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
  function paint(a){
    x.putImageData(st.img,0,0);
    if(a>0.001){
      x.fillStyle='rgba(13,15,26,'+a+')';
      x.fillRect(0,0,W,H);
      x.save();x.beginPath();x.arc(W*.62,H*.38,Math.min(W,H)*.16,0,Math.PI*2);x.clip();x.putImageData(st.img,0,0);x.restore();
    }
    st.a=a;
  }
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/DIM_MS));
    paint(from+(to-from)*u);
    if(u<1)st.raf=requestAnimationFrame(tick);
    else{st.raf=0;if(!on){st.img=null;st.a=0}}
  })(t0);
}
function bindDim150(cv){
  if(!cv||cv._lp150)return;
  cv._lp150=1;
  var hold=null,on=0;
  cv.addEventListener('pointerdown',function(ev){
    ev.stopImmediatePropagation();
    if(hold)clearTimeout(hold);
    hold=setTimeout(function(){on=1;fadeDim150(cv,true)},400);
  },true);
  function end(){if(hold)clearTimeout(hold);hold=null;if(on){fadeDim150(cv,false);on=0}}
  ['pointerup','pointerleave','pointercancel'].forEach(function(n){cv.addEventListener(n,end,true)});
  cv.addEventListener('contextmenu',function(ev){ev.preventDefault()});
}
function finishTour148(){
  try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set('lamp_tour148','1');else localStorage.setItem('lamp_tour148','1')}catch(ex){}
  try{
    var pid=typeof curPid==='function'?curPid():'';
    var f=typeof friendsLoad101==='function'?friendsLoad101(pid):null;
    if(f){f.offered=true;if(typeof friendsPut101==='function')friendsPut101(f,pid)}
  }catch(ex){}
  var d=document.querySelector('dialog.tour148');
  if(d&&d.open)try{d.close()}catch(ex){}
  if(d)d.remove();
}
function patchTour150(d){
  if(!d||d._v150)return;
  d._v150=1;
  if(!d.querySelector('[data-tour-skip]')){
    var row=document.createElement('div');row.className='row148';
    var b=document.createElement('button');
    b.type='button';b.setAttribute('data-tour-skip','1');b.textContent=t('Skip');
    b.style.minWidth='56px';b.style.minHeight='56px';
    b.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();finishTour148()});
    row.appendChild(b);d.appendChild(row);
  }
  d.addEventListener('cancel',function(){finishTour148()});
}
function watchTour150(){
  if(watchTour150._on)return;watchTour150._on=1;
  function scan(){var d=document.querySelector('dialog.tour148');if(d)patchTour150(d)}
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
  scan();
}
function hookFn150(obj,name,wrap){
  if(!obj)return;
  var prev=obj[name];
  if(typeof prev!=='function'||prev._v150)return;
  var next=wrap(prev);next._v150=1;obj[name]=next;
}
function bindCandleNight150(){
  var night=document.getElementById('candleNight129');
  if(night)night.onclick=function(){if(root.LampCandle129&&typeof LampCandle129.goodNight==='function')LampCandle129.goodNight()};
  var line=document.getElementById('candleLine129');
  if(line&&!line._v150){
    line._v150=1;
    new MutationObserver(function(){
      var txt=line.textContent||'';
      if(!/Good night|Buenas noches/i.test(txt))return;
      var host=document.getElementById('candleLamp129');
      if(host&&root.IL148&&typeof IL148.pose==='function')IL148.pose(host);
    }).observe(line,{childList:true,characterData:true,subtree:true});
  }
}
function hookCandle150(){
  hookFn150(root.LampCandle129,'goodNight',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{
        var host=document.getElementById('candleLamp129')||document.querySelector('#candle .lamp73-shell')||document.getElementById('candle');
        if(host&&root.IL148&&typeof IL148.pose==='function')IL148.pose(host);
      }catch(ex){}
      return r;
    };
  });
  hookFn150(root.LampCandle129,'render',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{bindCandleNight150()}catch(ex){}
      return r;
    };
  });
  if(typeof RENDER==='object'&&root.LampCandle129)RENDER.candle=root.LampCandle129.render;
  bindCandleNight150();
}
function polish(){

  var g=grow(),el=typeof $==='function'?$('patterns'):document.getElementById('patterns'),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
  if((g.depth||0)>0 && (g.shape==='pythagoras'||g.shape==='spirals') && g._n==null && cv){
    /* ensure a count if draw ran before the hook */
  }
  css150();
  updateCount(g);
  if(el){
    relabelRecipe(el);
    bindLoader150(el);
    var again=el.querySelector('[data-gafern149]');
    if(again)again.onclick=function(){var g2=grow();if(!g2.seed)g2.seed=109;var c2=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');runFern(c2,g2,0,Math.min(20000,(g2.depth||1)*4000),true)};
    thicken(el.querySelector('#patNature106'));
  }
  fixPeek150();
  bindDim150(cv);
  fixAdults();
}
function install(){
  css150();
  hookCandle150();
  watchTour150();
  hookFn150(root.IL148,'startTour',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      watchTour150();
      return r;
    };
  });
  if(typeof root.finishTour148!=='function')root.finishTour148=finishTour148;
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(draw150(cv,rec))return;
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{polish()}catch(ex){}
      return r;
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow(),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'),self=this,args=arguments;
      if(g&&g.shape==='spirals'){
        var cap=capOf('spirals');
        if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
      }
      if(g&&g.shape==='fern'){
        var capF=capOf('fern');
        if((g.depth||0)>=capF){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if(!g.seed)g.seed=109;
        function go(){
          var from=g._fernN||0;
          g.depth=(g.depth||0)+1;
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          block=1;
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          markOpen();
          var cv2=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
          var to=Math.min(20000,g.depth*4000);
          if(from>=to)from=0;
          runFern(cv2,g,from,to,false);
        }
        if(cv&&!(g.depth>0)){
          if(!isOpen()&&!rd()){
            if(g._ih)return;g._ih=1;
            cv.style.transition='transform 1.2s ease';cv.style.transform='scale(1.03)';
            setTimeout(function(){cv.style.transform='';g._ih=0;go()},400);
            return;
          }
        }
        go();
        return;
      }
      if(cv&&g&&!(g.depth>0)&&!isOpen()&&!rd()){
        /* Visual first-open breath only. Do not set _ih: v149 uses that as a lock and would swallow mashed Grow taps. */
        cv.style.transition='transform 1.2s ease';cv.style.transform='scale(1.03)';
        setTimeout(function(){cv.style.transform=''},400);
        markOpen();
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowSet106'
,function(prev){
    return function(k,v){
      if(k==='shape'){
        var cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
        cancelFern(cv);
        if(cv)cv._fernN=0;
        var g=grow();if(g){g._n=null;g.msg='';g._fernN=0;}
      }
      return prev.apply(this,arguments);
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{
        if(id==='adults')fixAdults();
        if(id==='patterns')polish();
        if(id==='candle')bindCandleNight150();
        if(id==='hub'||!id)watchTour150();
      }catch(ex){}
      return r;
    };
  });
  hook('patNatureCard106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{var nat=typeof $==='function'?$('patNature106'):document.getElementById('patNature106');thicken(nat)}catch(ex){}
      return r;
    };
  });
  if(typeof IL149==='object')IL149.copies=copies;
  if(document.getElementById('patterns'))try{polish()}catch(ex){}
  if(document.getElementById('adults'))try{fixAdults()}catch(ex){}
}
root.IL150={version:150,copies:copies,treeBoxes:treeBoxes,runFern:runFern,install:install,capOf:capOf,parseCode:parseCode150,applyCode:applyCode150,fadeDim:fadeDim150};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v151: fern loop survives canvas rebuild; per-box recipe parse. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var FTOK=0,block=0,RAMP=['#3D6A62','#4e6b5c','#E6B454','#C45A3A'];
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function rd(){try{return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function grow(){return (typeof PAT106==='object'&&PAT106.grow)||{}}
function capOf(sh){return (typeof IL150==='object'&&IL150.capOf)?IL150.capOf(sh):(sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:6)}
function pidKey(){return 'lamp_gaf2@'+(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}
function isOpen(){try{var k=pidKey();return ((typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k))==='1'}catch(ex){return false}}
function markOpen(){try{var k=pidKey();if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,'1');else localStorage.setItem(k,'1')}catch(ex){}}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v151)return;
  var next=wrap(prev);
  next._v151=1;
  next._base=prev._base||prev;
  root[name]=next;
}
function curCv(){return typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv')}
function fernPts(seed,n){
  if(typeof IL149==='object'&&typeof IL149.fernPts==='function')return IL149.fernPts(seed,n);
  if(typeof IL150==='object'&&typeof IL150.fernPts==='function')return IL150.fernPts(seed,n);
  return new Float32Array(n*2);
}
function fernDot(W,H,pts,i){return [W*(.5+pts[i*2]*0.18),H*(.92-pts[i*2+1]*0.082)]}
function drawFernRange(x,W,H,pts,from,to){
  x.fillStyle=RAMP[2];
  for(var i=from;i<to;i++){var p=fernDot(W,H,pts,i);x.fillRect(p[0],p[1],1.6,1.6)}
}
function clearCv(cv){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  x.fillStyle=night()?'#0d0f1a':'#fff8ec';x.fillRect(0,0,W,H);
  x.lineCap='round';x.lineJoin='round';
  return {x:x,W:W,H:H};
}
function updateCount(rec){
  var slot=typeof $==='function'?$('gaf149count'):document.getElementById('gaf149count');
  if(slot)slot.textContent=String((typeof IL150==='object'&&IL150.copies)?IL150.copies(rec||grow()):(rec&&rec._n)||0);
}
function paintSoFar(cv,rec){
  if(!cv||!rec)return;
  var n=Math.max(0,rec._fernN||0),c=clearCv(cv);
  if(n>0){
    var cap=Math.max(n,Math.min(20000,(rec.depth||1)*4000));
    drawFernRange(c.x,c.W,c.H,fernPts(rec.seed||109,cap),0,n);
  }
}
function runFern(cv,rec,from,to,clearFirst){
  if(!rec)return;
  var tok=++FTOK;
  rec._fernTok=tok;
  var cap=Math.max(1,Math.min(20000,to));
  from=Math.max(0,Math.min(from||0,cap));
  function live(){return curCv()||cv}
  if(rd()){
    var c=live();if(!c)return;
    var d=clearCv(c);
    drawFernRange(d.x,d.W,d.H,fernPts(rec.seed||109,cap),0,cap);
    rec._fernN=rec._n=cap;
    if(tok===FTOK)block=0;
    updateCount(rec);return;
  }
  block=1;
  var pts=fernPts(rec.seed||109,cap),n=from,painted=null;
  function sync(c){
    if(!c||painted===c)return;
    clearCv(c);
    if(n>0)drawFernRange(c.getContext('2d'),c.width,c.height,pts,0,n);
    painted=c;
  }
  var c0=live();
  if(clearFirst)n=0;
  if(c0){clearCv(c0);if(n>0)drawFernRange(c0.getContext('2d'),c0.width,c0.height,pts,0,n);painted=c0}
  (function tick(){
    if(tok!==FTOK)return;
    var c=live();
    if(!c){if(n<cap)setTimeout(tick,50);return}
    sync(c);
    var next=Math.min(cap,n+15);
    drawFernRange(c.getContext('2d'),c.width,c.height,pts,n,next);
    n=next;rec._fernN=rec._n=n;updateCount(rec);
    if(n<cap)setTimeout(tick,50);
    else if(tok===FTOK)block=0;
  })();
}
function shapes(){
  if(typeof PAT_SHAPES106!=='undefined'&&PAT_SHAPES106&&PAT_SHAPES106.length)return PAT_SHAPES106;
  return ['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];
}
function palMax(){return (typeof PAT_PAL106!=='undefined'&&PAT_PAL106&&PAT_PAL106.length)?PAT_PAL106.length-1:3}
function parseBox(s){
  s=String(s==null?'':s).trim();
  if(!s||/\s/.test(s))return null;
  if(!/^-?\d+(\.\d+)?$/.test(s))return null;
  var n=Number(s);
  return isFinite(n)?n:null;
}
function isInt(n){return typeof n==='number'&&isFinite(n)&&n===Math.round(n)}
function parseCode(vals){
  if(!vals||typeof vals==='string'||vals.length<4)return null;
  var a=parseBox(vals[0]),b=parseBox(vals[1]),c=parseBox(vals[2]),d=parseBox(vals[3]);
  if(a==null||b==null||c==null||d==null)return null;
  var SH=shapes();
  if(!isInt(a)||a<0||a>=SH.length)return null;
  if(!isInt(b)||b<0||b>palMax())return null;
  var sh=SH[a];
  if(sh==='sunflower'){if(!(c>=120&&c<=150))return null}
  else if(!(c>=8&&c<=90))return null;
  var cap=capOf(sh);
  if(!isInt(d)||d<0||d>cap)return null;
  return {shape:sh,shapeI:a,pal:b,angle:c,depth:d};
}
function cantRead(){return t("Hmm, I can't read that code.")}
function applyCode(rec){
  var g=grow();
  if(!g||!rec)return;
  FTOK++;
  g.shape=rec.shape;g.pal=rec.pal;g.angle=rec.angle;g.depth=rec.depth;g.msg='';g._n=null;g._fernN=0;
  if(g.shape==='fern'&&!g.seed)g.seed=109;
  if(g.q)g.q.length=0;g.busy=false;
  markOpen();
  if(g.shape!=='fern')block=0;
  if(typeof patGrowDraw106==='function')patGrowDraw106();
  if(g.shape==='fern'&&g.depth>0)runFern(curCv(),g,0,Math.min(20000,g.depth*4000),true);
}
var DIM_MS=600,DIM_A=.35;
function fadeDim(cv,on){
  cv=cv||curCv();
  if(!cv||rd())return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,st=cv._dim151||(cv._dim151={});
  if(!st.img){try{st.img=x.getImageData(0,0,W,H)}catch(ex){return}}
  if(st.raf)cancelAnimationFrame(st.raf);
  var from=st.a||0,to=on?DIM_A:0,t0=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
  function paint(a){
    x.putImageData(st.img,0,0);
    if(a>0.001){
      x.fillStyle='rgba(13,15,26,'+a+')';
      x.fillRect(0,0,W,H);
      var tmp=st.tmp||(st.tmp=document.createElement('canvas'));
      if(tmp.width!==W){tmp.width=W;tmp.height=H}
      tmp.getContext('2d').putImageData(st.img,0,0);
      x.save();
      x.beginPath();
      x.arc(W*0.62,H*0.38,Math.min(W,H)*0.16,0,Math.PI*2);
      x.clip();
      x.drawImage(tmp,0,0);
      x.restore();
    }
    st.a=a;
  }
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/DIM_MS));
    paint(from+(to-from)*u);
    if(u<1)st.raf=requestAnimationFrame(tick);
    else{st.raf=0;if(!on){st.img=null;st.a=0;st.tmp=null}}
  })(t0);
}
function bindDim(){
  var cv=curCv();
  if(!cv||cv._lp151)return;
  cv._lp151=1;
  var host=cv.parentElement||cv,hold=null,on=0;
  function start(ev){
    if(ev.target!==cv)return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    if(hold)clearTimeout(hold);
    hold=setTimeout(function(){on=1;fadeDim(curCv()||cv,true)},400);
  }
  function end(){
    if(hold)clearTimeout(hold);hold=null;
    if(on){fadeDim(curCv()||cv,false);on=0}
  }
  host.addEventListener('pointerdown',start,true);
  ['pointerup','pointerleave','pointercancel'].forEach(function(n){host.addEventListener(n,end,true)});
  cv.addEventListener('contextmenu',function(ev){ev.preventDefault()});
}
function rebind(){

  var el=typeof $==='function'?$('patterns'):document.getElementById('patterns');
  if(!el)return;
  bindDim();
  var again=el.querySelector('[data-gafern149]');
  if(again)again.onclick=function(){
    var g=grow();if(!g.seed)g.seed=109;
    runFern(curCv(),g,0,Math.min(20000,(g.depth||1)*4000),true);
  };
  var box=el.querySelector('[data-gafload150]');
  if(box){
    var go=box.querySelector('[data-gafloadgo]');
    function run(){
      var vals=[].map.call(box.querySelectorAll('[data-gafn]'),function(inp){return inp.value});
      var rec=parseCode(vals),msg=box.querySelector('[data-gafloadmsg]');
      if(!rec){if(msg){msg.hidden=false;msg.textContent=cantRead()}return}
      if(msg){msg.hidden=true;msg.textContent=''}
      applyCode(rec);
    }
    if(go)go.onclick=run;
  }
}
function install(){
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(rec.shape==='fern'&&block&&cv&&cv.id==='patGrowCv'){
        paintSoFar(cv,rec);
        rec._n=rec._fernN||0;
        return true;
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{rebind()}catch(ex){}
      return r;
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow(),cv=curCv(),self=this,args=arguments;
      if(g&&g.shape==='fern'){
        var capF=capOf('fern');
        if((g.depth||0)>=capF){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if(!g.seed)g.seed=109;
        function go(){
          var from=g._fernN||0;
          g.depth=(g.depth||0)+1;
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          block=1;
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          markOpen();
          var to=Math.min(20000,g.depth*4000);
          if(from>=to)from=0;
          runFern(curCv(),g,from,to,false);
        }
        if(cv&&!(g.depth>0)){
          if(!isOpen()&&!rd()){
            if(g._ih)return;g._ih=1;
            cv.style.transition='transform 1.2s ease';cv.style.transform='scale(1.03)';
            setTimeout(function(){cv.style.transform='';g._ih=0;go()},400);
            return;
          }
        }
        go();
        return;
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){FTOK++;block=0}
      return prev.apply(this,arguments);
    };
  });
  if(typeof IL150==='object'){
    IL150.runFern=runFern;
    IL150.parseCode=parseCode;
    IL150.applyCode=applyCode;
  }
  if(typeof IL150==='object')IL150.fadeDim=fadeDim;
  if(document.getElementById('patterns'))try{rebind()}catch(ex){}
}
root.IL151={version:151,runFern:runFern,parseCode:parseCode,applyCode:applyCode,install:install,fadeDim:fadeDim,ftok:function(){return FTOK},blocked:function(){return !!block},dimA:DIM_A,dimMs:DIM_MS};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v152: Enter in a recipe box uses the strict v151 loader, not v150's loose one. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function grow(){return (typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v152)return;
  var next=wrap(prev);
  next._v152=1;
  next._base=prev._base||prev;
  root[name]=next;
}
function cantRead(){return t("Hmm, I can't read that code.")}
function parseCode(vals){
  if(typeof IL151==='object'&&typeof IL151.parseCode==='function')return IL151.parseCode(vals);
  return null;
}
function applyCode(rec){
  if(typeof IL151==='object'&&typeof IL151.applyCode==='function')return IL151.applyCode(rec);
}
function bindEnter(){
  var el=typeof $==='function'?$('patterns'):document.getElementById('patterns');
  if(!el)return;
  var box=el.querySelector('[data-gafload150]');
  if(!box)return;
  if(!box._v152){
    var neu=box.cloneNode(true);
    box.parentNode.replaceChild(neu,box);
    box=neu;
    box._v152=1;
    function run(){
      var vals=[].map.call(box.querySelectorAll('[data-gafn]'),function(inp){return inp.value});
      var rec=parseCode(vals),msg=box.querySelector('[data-gafloadmsg]');
      if(!rec){if(msg){msg.hidden=false;msg.textContent=cantRead()}return}
      if(msg){msg.hidden=true;msg.textContent=''}
      applyCode(rec);
    }
    function onKey(ev){
      if(ev.key!=='Enter')return;
      ev.preventDefault();
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      run();
    }
    var go=box.querySelector('[data-gafloadgo]');
    if(go)go.onclick=run;
    box.addEventListener('keydown',onKey,true);
    [].forEach.call(box.querySelectorAll('[data-gafn]'),function(inp){
      inp.addEventListener('keydown',onKey);
    });
  }
}
function install(){
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{bindEnter()}catch(ex){}
      return r;
    };
  });
  if(document.getElementById('patterns'))try{bindEnter()}catch(ex){}
}
root.IL152={version:152,install:install,bindEnter:bindEnter};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v153: long-press dim fades 600 ms in and out, alpha stays 0.35. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var DIM_MS=600,DIM_A=.35;
function rd(){try{return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function curCv(){return typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv')}
function fadeDim(cv,on){
  cv=cv||curCv();
  if(!cv||rd())return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,st=cv._dim151||(cv._dim151={});
  if(!st.img){try{st.img=x.getImageData(0,0,W,H)}catch(ex){return}}
  if(st.raf)cancelAnimationFrame(st.raf);
  var from=st.a||0,to=on?DIM_A:0,t0=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
  function paint(a){
    x.putImageData(st.img,0,0);
    if(a>0.001){
      x.fillStyle='rgba(13,15,26,'+a+')';
      x.fillRect(0,0,W,H);
      var tmp=st.tmp||(st.tmp=document.createElement('canvas'));
      if(tmp.width!==W){tmp.width=W;tmp.height=H}
      tmp.getContext('2d').putImageData(st.img,0,0);
      x.save();
      x.beginPath();
      x.arc(W*0.62,H*0.38,Math.min(W,H)*0.16,0,Math.PI*2);
      x.clip();
      x.drawImage(tmp,0,0);
      x.restore();
    }
    st.a=a;
  }
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/DIM_MS));
    paint(from+(to-from)*u);
    if(u<1)st.raf=requestAnimationFrame(tick);
    else{st.raf=0;if(!on){st.img=null;st.a=0;st.tmp=null}}
  })(t0);
}
function install(){
  if(typeof IL151==='object'){IL151.fadeDim=fadeDim;IL151.dimMs=DIM_MS;IL151.dimA=DIM_A}
}
root.IL153={version:153,fadeDim:fadeDim,dimMs:DIM_MS,dimA:DIM_A,install:install};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v154: Grow a Fractal 3. No show() wrap. Quilt untouched. No Dragon egg art. */
(function(root){
'use strict';
var SH0=['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];
var SHN=['koch','htree','levy','apollonian','pascal','chaos','hexrings','ripples','antler'];
var LAB={koch:'Koch snowflake',htree:'H-tree',levy:'Lévy C',apollonian:'Apollonian circles',pascal:'Pascal',chaos:'Chaos game',hexrings:'Bee rings',ripples:'Turtle rings',antler:'Antlers'};
var CAP={koch:5,htree:7,levy:10,apollonian:4,pascal:10,chaos:8,hexrings:4,ripples:8,antler:6,sunflower:8};
var I='#72583f',A='#E6B454',CR='#fff8ec',NK='#0d0f1a';
var GOLD='#E6B454';
var PAL={dragon:{cool:'#C45A3A'},fern:{cool:'#4e6b5c'},hexrings:{cool:'#C9893A'},ripples:{cool:'#6F9A7A'},antler:{cool:'#5B7A6A'},triangle:{cool:'#E8E4DA'},tree:{cool:'#4e6b5c'},pythagoras:{cool:'#4e6b5c'},koch:{cool:'#5b7ea8'},htree:{cool:'#4e6b5c'},levy:{cool:'#C45A3A'},apollonian:{cool:'#5b7ea8'},pascal:{cool:'#8a5a7a'},chaos:{cool:'#8a5a7a'},hilbert:{cool:'#5b7ea8'},spirals:{cool:'#C45A3A'},sunflower:{cool:'#C9893A'}};
var FRI={dragon:'dragon',fern:'fern',bee:'hexrings',turtle:'ripples',deer:'antler',firefly:'triangle'};
var LINE={dragon:'Fold by fold, the path doubles.',fern:'Look closer. It\'s here again.',bee:'One ring, then seven, then nineteen.',turtle:'Each ring grows around the last.',deer:'Each branch makes two.',firefly:'Three little triangles make a bigger one.'};
var SHR=[0.68,0.66,0.70,2/3];
var BT=null,HOLD=0,VO=[];
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function e(s){return typeof patEsc==='function'?patEsc(s):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function pid(){try{return(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}catch(ex){return''}}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function sfx(){try{return typeof lampSfxOn73!=='function'||!!lampSfxOn73()}catch(ex){return true}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function rG(k){try{return(typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k)}catch(ex){return null}}
function rS(k,v){try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,v);else localStorage.setItem(k,v)}catch(ex){}}
function acx(){try{return typeof ac==='function'?ac():(typeof AC!=='undefined'?AC:null)}catch(ex){return null}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v154)return;var next=wrap(prev);next._v154=1;next._base=prev._base||prev;root[name]=next}
function shapes(){if(typeof PAT_SHAPES106!=='undefined'&&PAT_SHAPES106&&PAT_SHAPES106.length)return PAT_SHAPES106;return SH0.concat(SHN)}
function capOf(sh){if(CAP[sh]!=null)return CAP[sh];return(typeof IL150==='object'&&IL150.capOf&&!IL150.capOf._v154)?IL150.capOf(sh):(sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:6)}
function sunN(d){var f=[1,13,21,34,55,89,144,233,377];d=Math.max(0,Math.min(f.length-1,d|0));return f[d]}
function copies(rec){
  var d=Math.max(0,rec&&rec.depth||0),sh=rec&&rec.shape;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hilbert')return Math.pow(4,Math.max(0,d));
  if(sh==='fern')return Math.min(20000,d*4000);
  if(sh==='sunflower')return sunN(d);
  if(sh==='spirals')return d?(Math.pow(5,d)-1)/4:1;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='pythagoras'||sh==='antler')return Math.pow(2,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return (d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='apollonian')return gasket(d).length;
  return Math.pow(2,d);
}
function ink(sh,d,depth){
  var p=PAL[sh]||PAL.tree,cool=p.cool||I;
  if(depth<=0)return GOLD;
  var u=Math.max(0,Math.min(1,(depth-d)/Math.max(1,depth)));
  return mix(GOLD,cool,0.15+0.85*u);
}
function mix(a,b,u){
  function h(s){s=s.replace('#','');if(s.length===3)s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2];return[parseInt(s.slice(0,2),16),parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16)]}
  var A=h(a),B=h(b),i,o='#';
  for(i=0;i<3;i++)o+=('0'+Math.round(A[i]+(B[i]-A[i])*u).toString(16)).slice(-2);
  return o;
}
function css(){
  if(document.getElementById('v154css'))return;
  var s=document.createElement('style');s.id='v154css';
  s.textContent='.g3row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}'+
    '.g3row button,.g3btn{min-height:56px;min-width:56px;padding:8px 12px}'+
    '.g3fr{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0;padding:0;list-style:none}'+
    '.g3fr button{min-width:72px;min-height:72px;width:88px;padding:6px;border-radius:16px;background:var(--card,#fffaf0);border:2px solid '+I+';color:'+I+';font:inherit;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}'+
    '.g3fr button.on{border-color:'+A+';box-shadow:0 0 0 2px '+A+'}'+
    '.g3fr svg{width:44px;height:44px;display:block}'+
    '.g3fr .g3dot{width:18px;height:18px;border-radius:50%;background:'+A+';border:2px solid '+I+'}'+
    '.g3jar{display:flex;flex-direction:column;align-items:center;margin:8px auto;max-width:12rem;text-align:center}'+
    '.g3jar svg{width:96px;height:112px;display:block}'+
    '.g3msg{text-align:center;margin:.3rem auto .6rem;max-width:24rem}'+
    '.g3sky .lamp81-star-dot{background:#f7f1e6}'+
    '@media(prefers-reduced-motion:reduce){.g3fr button{transition:none}}';
  document.head.appendChild(s);
}
function lcg(s){s=(s||109)>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}}
function bg(x,W,H){x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}

/* ---- shapes ---- */
function dKoch(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('koch'),rec.depth||0)),s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2;
  function side(ax,ay,bx,by,d){
    if(!d){x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke();return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  x.strokeStyle=ink('koch',depth,depth);x.lineWidth=Math.max(0.8,2.4-depth*0.25);
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);
}
function dH(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('htree'),rec.depth||0));
  function Hn(cx,cy,len,hz,d){
    if(d<0||len<1.2)return;
    x.strokeStyle=ink('htree',d,depth);x.lineWidth=Math.max(0.7,2.6-d*0.25);
    x.beginPath();
    if(hz){x.moveTo(cx-len,cy);x.lineTo(cx+len,cy)}else{x.moveTo(cx,cy-len);x.lineTo(cx,cy+len)}
    x.stroke();
    if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
    else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
  }
  Hn(W/2,H/2,Math.min(W,H)*0.22,1,depth);
}
function dLevy(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('levy'),rec.depth||0)),pts=[{x:W*0.22,y:H*0.62},{x:W*0.72,y:H*0.62}],k,i,next,a,b,mx,my;
  for(k=0;k<depth;k++){
    next=[];
    for(i=0;i<pts.length-1;i++){
      a=pts[i];b=pts[i+1];
      mx=(a.x+b.x)/2-(b.y-a.y)/2;my=(a.y+b.y)/2+(b.x-a.x)/2;
      next.push(a,{x:mx,y:my});
    }
    next.push(pts[pts.length-1]);pts=next;
  }
  x.strokeStyle=ink('levy',depth,depth);x.lineWidth=Math.max(0.9,2.8-depth*0.18);
  x.beginPath();pts.forEach(function(p,i){i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y)});x.stroke();
}
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return {x:a,y:b};
}
function desc(c1,c2,c3,sk,sz){
  var k1=c1.k,k2=c2.k,k3=c3.k,rad=k1*k2+k1*k3+k2*k3,k4=k1+k2+k3+sk*2*Math.sqrt(Math.max(0,rad));
  if(!isFinite(k4)||Math.abs(k4)<1e-8)return null;
  var sr=k1*k2*(c1.x*c2.x-c1.y*c2.y)+k1*k3*(c1.x*c3.x-c1.y*c3.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y);
  var si=k1*k2*(c1.x*c2.y+c1.y*c2.x)+k1*k3*(c1.x*c3.y+c1.y*c3.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x);
  var rt=csqrt(sr,si);
  return {k:Math.round(k4),x:(k1*c1.x+k2*c2.x+k3*c3.x+sz*2*rt.x)/k4,y:(k1*c1.y+k2*c2.y+k3*c3.y+sz*2*rt.y)/k4};
}
function gasket(depth){
  depth=Math.max(0,Math.min(capOf('apollonian'),depth||0));
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d,cs,q,seen,gi,i;
  d=desc(a,b,c,1,-1)||desc(a,b,c,1,1);
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];q=[[0,1,2],[0,1,3],[0,2,3],[1,2,3]];seen={};
  function key(c){return c.k+':'+c.x.toFixed(4)+':'+c.y.toFixed(4)}
  cs.forEach(function(c){seen[key(c)]=1});
  for(gi=0;gi<depth;gi++){
    var nq=[];
    for(i=0;i<q.length;i++){
      (function(t){
        var c1=cs[t[0]],c2=cs[t[1]],c3=cs[t[2]];
        [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(sg){
          var n=desc(c1,c2,c3,sg[0],sg[1]);
          if(!n||n.k<=0)return;
          var k=key(n);if(seen[k])return;
          if(Math.hypot(n.x,n.y)+1/n.k>1.02)return;
          seen[k]=1;cs.push(n);
          var ix=cs.length-1;
          nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
        });
      })(q[i]);
    }
    q=nq;
  }
  return cs;
}
function dApol(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('apollonian'),rec.depth||0)),cs=gasket(depth),sc=Math.min(W,H)*0.46,cx=W/2,cy=H/2,i,c,r;
  for(i=0;i<cs.length;i++){
    c=cs[i];r=Math.abs(1/c.k)*sc;
    if(r<0.6)continue;
    x.strokeStyle=ink('apollonian',i?1:0,Math.max(1,depth));
    x.lineWidth=c.k<0?2.2:Math.max(0.6,2-Math.log(c.k+1)*0.35);
    x.beginPath();x.arc(cx+c.x*sc,cy-c.y*sc,r,0,Math.PI*2);x.stroke();
    if(c.k>0&&r>14){
      x.fillStyle=I;x.font=Math.max(9,Math.min(16,r*0.55))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
    }
  }
}
function dPas(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('pascal'),rec.depth||0)),mod=rec.angle===5?5:rec.angle===3?3:2,rows=[],n,k,cell,R,C,sz,y0,x0;
  rows[0]=[1];
  for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
  sz=Math.min((W-24)/(depth+1),(H-24)/(depth+1),28);
  y0=(H-(depth+1)*sz)/2+sz/2;x0=W/2;
  for(n=0;n<=depth;n++){
    for(k=0;k<=n;k++){
      cell=rows[n][k];
      x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,mod);
      x.beginPath();x.arc(x0+(k-n/2)*sz,y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
    }
  }
}
function dChaos(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('chaos'),rec.depth||0)),N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=rec.angle>=30&&rec.angle<=55?rec.angle/100:0.5,rnd=lcg(rec.seed||109),i,v=[],ang,p,j,last=-1,w=Math.min(W,H)*0.42,same=poly===4&&Math.abs(fr-0.5)<0.02;
  for(i=0;i<poly;i++){ang=-Math.PI/2+i*2*Math.PI/poly;v.push({x:W/2+Math.cos(ang)*w,y:H/2+Math.sin(ang)*w})}
  p={x:W/2,y:H/2};x.fillStyle=ink('chaos',depth,Math.max(1,depth));
  for(i=0;i<N;i++){
    j=Math.floor(rnd()*poly);
    if(same&&j===last)j=(j+1+Math.floor(rnd()*(poly-1)))%poly;
    last=j;p.x+=(v[j].x-p.x)*fr;p.y+=(v[j].y-p.y)*fr;
    x.fillRect(p.x,p.y,1.3,1.3);
  }
}
function dHex(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('hexrings'),rec.depth||0)),R=Math.min(W,H)*0.12,q,r,s,px,py,ring;
  function hex(cx,cy,rad,col){
    var a;x.beginPath();
    for(a=0;a<6;a++)x[a?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+a*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+a*Math.PI/3)*rad);
    x.closePath();x.strokeStyle=col;x.lineWidth=Math.max(0.8,2.2);x.stroke();
  }
  for(q=-depth;q<=depth;q++){
    for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      px=W/2+(q+r/2)*R*1.75;py=H/2+r*(R*Math.sqrt(3)*0.95);
      ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
      hex(px,py,R*0.86,ink('hexrings',ring,depth));
    }
  }
}
function dRip(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('ripples'),rec.depth||0)),i,R=Math.min(W,H)*0.06;
  if(depth<=0){x.fillStyle=GOLD;x.beginPath();x.arc(W/2,H/2,5,0,Math.PI*2);x.fill();return}
  for(i=1;i<=depth;i++){
    x.strokeStyle=ink('ripples',i,depth);x.lineWidth=Math.max(0.9,3-i*0.2);
    x.beginPath();x.arc(W/2,H/2,R*i*1.55,0,Math.PI*2);x.stroke();
  }
}
function dAnt(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('antler'),rec.depth||0)),ang=(rec.angle||36)*Math.PI/180,sh=SHR[Math.max(0,Math.min(3,rec.season||0))];
  function br(px,py,len,a,d){
    if(d>depth||len<1.4)return;
    x.strokeStyle=ink('antler',d,depth);x.lineWidth=Math.max(0.8,(6-d)*0.8);
    x.beginPath();x.moveTo(px,py);
    var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
    x.lineTo(nx,ny);x.stroke();
    tip(nx,ny,d,a);
    br(nx,ny,len*sh,a-ang,d+1);br(nx,ny,len*sh,a+ang,d+1);
  }
  function tip(tx,ty,d,a){
    var se=rec.season||0;if(!se||d<depth-1)return;
    if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tx,ty,2.2,0,Math.PI*2);x.fill()}
    else if(se===2){x.fillStyle='#4e6b5c';x.beginPath();x.ellipse?x.ellipse(tx+Math.cos(a-0.4)*4,ty-Math.sin(a-0.4)*4,4,2.2,a,0,Math.PI*2):x.arc(tx,ty,3,0,Math.PI*2);x.fill()}
    else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tx+3,ty+6,2,0,Math.PI*2);x.fill()}
  }
  br(W/2,H*0.92,H*0.22,Math.PI/2,0);
}
function dTreeSea(x,W,H,rec){
  var depth=Math.max(0,Math.min(6,rec.depth||0)),ang=(rec.angle||28)*Math.PI/180,sh=SHR[Math.max(0,Math.min(3,rec.season||0))],se=rec.season||0;
  function br(px,py,len,a,d){
    if(d>depth||len<1.4)return;
    x.strokeStyle=ink('tree',d,depth);x.lineWidth=Math.max(0.8,(6-d)*0.85);
    x.beginPath();x.moveTo(px,py);
    var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
    x.lineTo(nx,ny);x.stroke();
    if(se&&d>=depth-1){
      if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(nx,ny,2.1,0,Math.PI*2);x.fill()}
      else if(se===2){x.fillStyle='#3D6A62';x.beginPath();x.arc(nx,ny,3.1,0,Math.PI*2);x.fill()}
      else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(nx+(d%2?4:-3),ny+5,2,0,Math.PI*2);x.fill()}
    }
    br(nx,ny,len*sh,a-ang,d+1);br(nx,ny,len*sh,a+ang,d+1);
  }
  br(W/2,H*0.92,H*0.22,Math.PI/2,0);
}
function dSun(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('sunflower'),rec.depth||0)),n=sunN(depth),phi=rec.angle||137.5,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th;
  for(i=0;i<n;i++){
    r=c*Math.sqrt(i);th=i*phi*Math.PI/180;
    x.fillStyle=ink('sunflower',i>=n-Math.max(8,n/8)?depth:0,Math.max(1,depth));
    x.beginPath();x.arc(W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.5,3.1-i/n*1.5),0,Math.PI*2);x.fill();
  }
}
var DRAW={sunflower:dSun,koch:dKoch,htree:dH,levy:dLevy,apollonian:dApol,pascal:dPas,chaos:dChaos,hexrings:dHex,ripples:dRip,antler:dAnt,tree:dTreeSea};

function d9(cv,rec){
  if(!cv||!rec)return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,fn=DRAW[rec.shape];
  if(!fn)return;
  bg(x,W,H);
  if(rec._rest){starsOn(x,W,H,1);return}
  if((rec.depth||0)<=0&&rec.shape!=='ripples'&&rec.shape!=='hexrings'&&rec.shape!=='pascal'){
    x.fillStyle=GOLD;x.beginPath();x.arc(W/2,H*0.7,5,0,Math.PI*2);x.fill();return;
  }
  fn(x,W,H,rec);
}

/* ---- counts, singing, breath, rest ---- */
function fibArms(n){
  var f=[1,1,2,3,5,8,13,21,34,55,89,144,233,377],i;
  for(i=2;i<f.length;i++){
    if(f[i]===n)return {a:f[i-2],b:f[i-1]};
    if(f[i]>n)return {a:f[Math.max(0,i-2)],b:f[i-1]};
  }
  return {a:34,b:55};
}
function jarSVG(n,label){
  var N=Math.max(0,n|0),show=Math.min(N,89),cols=8,i,dots='',r,c,x,y,rows=Math.ceil(show/cols)||1;
  for(i=0;i<show;i++){r=Math.floor(i/cols);c=i%cols;x=18+c*10;y=100-(r+1)*9;dots+='<circle cx="'+x+'" cy="'+y+'" r="2.2" fill="'+A+'"/>'}
  return '<div class="g3jar" data-gaf3jar="1"><p class="soft">'+e(t('How many?'))+'</p>'+
    '<svg viewBox="0 0 96 112" width="96" height="112" aria-hidden="true">'+
    '<path d="M28 8 H68 L74 18 V96 Q74 106 48 106 Q22 106 22 96 V18 Z" fill="none" stroke="'+I+'" stroke-width="2.2"/>'+
    '<path d="M24 18 H72" stroke="'+I+'" stroke-width="1.5"/>'+dots+'</svg>'+
    '<p class="g9c" style="margin:4px 0 0">'+e(String(N))+(label?' <span class="soft">'+e(label)+'</span>':'')+'</p></div>';
}
function sing(rec,level){
  if(!sfx())return;
  var c=acx();if(!c)return;
  var se=Math.max(0,Math.min(3,rec&&rec.season||0)),ratio=SHR[se]||0.68,base=220,freq=base/ratio*Math.pow(1/ratio,Math.max(0,(level||1)-1));
  freq=Math.max(180,Math.min(880,freq));
  var t0=c.currentTime+0.02,vol=(night()||(document.body&&document.body.classList.contains('bedtime')))?0.035:0.06;
  try{
    var o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=freq;
    g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+0.06);g.gain.exponentialRampToValueAtTime(0.0008,t0+0.9);
    o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+1);
    VO.push(o);while(VO.length>4){try{VO.shift().stop()}catch(ex){}}
  }catch(ex){}
}
function stopBreath(){if(BT){clearTimeout(BT);BT=null}HOLD=0}
function startBreath(){
  var g=grow();if(!g||rd())return;
  if((g.depth||0)>=capOf(g.shape))return;
  g._br=1;HOLD=0;
  function tick(){
    BT=null;g=grow();
    if(!g||!g._br||HOLD||rd())return;
    if((g.depth||0)>=capOf(g.shape)){g._br=0;maybeRest();return}
    if(typeof patGrowStep106==='function')patGrowStep106();
    if(g._br&&(g.depth||0)<capOf(g.shape))BT=setTimeout(tick,4000);
    else {g._br=0;maybeRest()}
  }
  BT=setTimeout(tick,4000);
}
function starPts(){
  var i,out=[];
  for(i=0;i<12;i++)out.push([0.5+Math.cos(i*Math.PI/6-Math.PI/2)*0.32,0.5+Math.sin(i*Math.PI/6-Math.PI/2)*0.32]);
  return out;
}
function starsOn(x,W,H,a){
  var pts=starPts(),i;
  x.globalAlpha=a;
  for(i=0;i<pts.length;i++){
    x.fillStyle='#f7f1e6';x.beginPath();x.arc(pts[i][0]*W,pts[i][1]*H,4,0,Math.PI*2);x.fill();
    x.fillStyle=A;x.beginPath();x.arc(pts[i][0]*W,pts[i][1]*H,2.2,0,Math.PI*2);x.fill();
  }
  x.globalAlpha=1;
}
function fadeRest(cv,done){
  if(!cv){if(done)done();return}
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,img,t0,ms=1200;
  try{img=x.getImageData(0,0,W,H)}catch(ex){if(done)done();return}
  if(rd()){bg(x,W,H);starsOn(x,W,H,1);if(done)done();return}
  t0=performance.now();
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/ms));
    x.putImageData(img,0,0);
    x.fillStyle=night()?'rgba(13,15,26,'+u+')':'rgba(255,248,236,'+u+')';
    x.fillRect(0,0,W,H);
    starsOn(x,W,H,u);
    if(u<1)requestAnimationFrame(tick);else if(done)done();
  })(t0);
}
function maybeRest(){
  var g=grow(),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
  if(!g||!cv)return;
  if((g.depth||0)<capOf(g.shape))return;
  if(g._rest)return;
  g._rest=1;g._br=0;stopBreath();
  g.msg=t('It found its rest.');
  fadeRest(cv,function(){var g=grow();if(g&&g.msg&&/as far as this seed grows/i.test(g.msg)){/* keep cap line */}if(typeof patGrowDraw106==='function')patGrowDraw106()});
}
function skyKey(){return 'lamp_gaf3sky@'+pid()}
function skyLoad(){try{var r=rG(skyKey());return r?JSON.parse(r):{rings:[]}}catch(ex){return {rings:[]}}}
function skySave(d){rS(skyKey(),JSON.stringify({rings:(d.rings||[]).slice(-6)}))}
function floatSky(){
  var g=grow(),data=skyLoad(),pts=starPts();
  data.rings.push({shape:g.shape||'tree',dots:pts,when:(typeof lampDay74==='function'?lampDay74():'')});
  skySave(data);
  g.msg=t("It's in the Sky.");
  if(typeof patGrowDraw106==='function')patGrowDraw106();
}
function paintSky(host){
  var data=skyLoad(),rings=data.rings||[],wrap,sky,i,j,pts,btn,x,y;
  if(!rings.length||!host)return;
  wrap=host.querySelector(':scope > [data-lamp73-slot="home"], :scope > .lamp76-hero')||host;
  sky=wrap.querySelector('[data-gaf3sky]');
  if(!sky){sky=document.createElement('div');sky.className='lamp81-sky g3sky';sky.setAttribute('data-gaf3sky','1');sky.innerHTML='<div class="lamp81-stars" role="list" aria-label="'+e(t('A star ring from your fractal. It stays on this device.'))+'"></div>';wrap.style.position=wrap.style.position||'relative';wrap.appendChild(sky)}
  var box=sky.querySelector('.lamp81-stars');if(!box)return;
  box.innerHTML='';
  for(i=0;i<rings.length;i++){
    pts=rings[i].dots||[];
    for(j=0;j<pts.length;j++){
      x=(pts[j][0]*80+10).toFixed(2);y=(pts[j][1]*70+8).toFixed(2);
      btn=document.createElement('button');btn.type='button';btn.className='lamp81-star';
      btn.style.setProperty('--x',x+'%');btn.style.setProperty('--y',y+'%');btn.style.setProperty('--n','1');
      btn.setAttribute('aria-label',t('A star ring from your fractal. It stays on this device.'));
      btn.innerHTML='<span class="lamp81-star-dot" aria-hidden="true"></span>';
      box.appendChild(btn);
    }
  }
}

/* ---- companions (no Dragon egg art) ---- */
function pic(kind){
  var art='',ids,i;
  if(kind==='dragon')return '<span class="g3dot" aria-hidden="true"></span>';
  if(kind==='turtle')ids=['turtle'];
  else if(kind==='deer')ids=['deer_m','deer','deer_f'];
  else if(kind==='firefly')ids=['firefly_f','firefly','firefly_m'];
  else ids=[];
  for(i=0;i<ids.length;i++){
    try{if(typeof friendArt101==='function')art=friendArt101(ids[i],1)||friendArt101(ids[i],3)}catch(ex){}
    if(!art)try{
      var prev=root.FRIEND_ART_CTX101;
      root.FRIEND_ART_CTX101=ids[i];
      if(typeof lampSvg73==='function')art=lampSvg73(1,'',false)||lampSvg73(3,'',false);
      root.FRIEND_ART_CTX101=prev;
    }catch(ex){try{root.FRIEND_ART_CTX101=prev}catch(e2){}}
    if(art)return art;
  }
  if(kind==='fern')return '<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M22 40 C20 26 16 16 10 8 M22 40 C24 26 28 16 34 8 M22 28 C16 26 12 22 8 18 M22 28 C28 26 32 22 36 18" fill="none" stroke="#4e6b5c" stroke-width="2" stroke-linecap="round"/></svg>';
  if(kind==='bee')return '<svg viewBox="0 0 44 44" aria-hidden="true"><polygon points="22,8 34,15 34,29 22,36 10,29 10,15" fill="none" stroke="'+A+'" stroke-width="2"/></svg>';
  return '<span class="g3dot" aria-hidden="true"></span>';
}
function setFriend(kind){
  var g=grow(),sh=FRI[kind];if(!g||!sh)return;
  stopBreath();g._rest=0;g._br=0;g._friend=kind;
  if(typeof patGrowSet106==='function')patGrowSet106('shape',sh);
  g=grow();g.msg=t(LINE[kind]||'Look closer. It\'s here again.');
  if(sh==='chaos'){g.poly=3;g.angle=50}
  if(sh==='pascal')g.angle=2;
  if(sh==='sunflower')g.angle=137.5;
  if(typeof patGrowDraw106==='function')patGrowDraw106();
}

function extraUI(){
  css();
  var el=document.getElementById('patterns');if(!el)return;
  var g=grow(),cv=document.getElementById('patGrowCv'),host,row,n,lab;
  if(!g)return;
  /* regroup new shape buttons */
  var btns=[].slice.call(el.querySelectorAll('button[onclick*="patGrowSet106(\'shape\'"]'));
  var more=el.querySelector('[data-gaf3more]');
  if(!more){more=document.createElement('div');more.className='g3row';more.setAttribute('data-gaf3more','1');more.setAttribute('aria-label',t('More seeds'));
    if(btns[0]&&btns[0].parentNode)btns[0].parentNode.insertAdjacentElement('afterend',more);else if(cv)cv.insertAdjacentElement('beforebegin',more)}
  btns.forEach(function(btn){
    var m=/patGrowSet106\('shape','([^']+)'\)/.exec(btn.getAttribute('onclick')||'');
    if(!m)return;
    if(LAB[m[1]]){btn.textContent=t(LAB[m[1]]);if(btn.parentNode!==more)more.appendChild(btn)}
  });
  /* companions */
  host=el.querySelector('[data-gaf3friends]');
  if(!host){host=document.createElement('div');host.setAttribute('data-gaf3friends','1');if(more)more.insertAdjacentElement('beforebegin',host);else if(cv)cv.insertAdjacentElement('beforebegin',host)}
  host.innerHTML='<p class="soft g3msg">'+e(t('Friends'))+'</p><ul class="g3fr">'+
    ['dragon','fern','bee','turtle','deer','firefly'].map(function(k){
      var on=FRI[k]===g.shape?' on':'';
      return '<li><button type="button" data-gaf3fr="'+k+'" class="'+on+'" aria-label="'+e(t({dragon:'Dragon',fern:'Fern',bee:'Bee',turtle:'Turtle',deer:'Deer',firefly:'Firefly'}[k]))+'">'+pic(k)+'<span>'+e(t({dragon:'Dragon',fern:'Fern',bee:'Bee',turtle:'Turtle',deer:'Deer',firefly:'Firefly'}[k]))+'</span></button></li>';
    }).join('')+'</ul>';
  host.querySelectorAll('[data-gaf3fr]').forEach(function(b){b.onclick=function(){setFriend(b.getAttribute('data-gaf3fr'))}});

  /* seasons, breathe, chaos/pascal dials */
  row=el.querySelector('[data-gaf3ctrl]');
  if(!row){row=document.createElement('div');row.className='g3row';row.setAttribute('data-gaf3ctrl','1');if(cv)cv.insertAdjacentElement('afterend',row);else el.appendChild(row)}
  var html='';
  if(g.shape==='tree'||g.shape==='antler'||g.shape==='pythagoras'){
    lab=['Bare','Budding','Leafy','Falling'][g.season||0];
    html+='<button type="button" class="g3btn" data-gaf3season="1">'+e(t('Season'))+': '+e(t(lab))+'</button>';
  }
  if(g.shape==='chaos'){
    html+='<button type="button" class="g3btn" data-gaf3poly="1">'+e(t('Corners'))+': '+e(String(g.poly||3))+'</button>';
    html+='<button type="button" class="g3btn" data-gaf3jump="1">'+e(t('Jump'))+': '+(g.angle||50)/100+'</button>';
  }
  if(g.shape==='pascal'){
    html+='<button type="button" class="g3btn" data-gaf3mod="1">'+e(t('Mod {n}',{n:String(g.angle===5?5:g.angle===3?3:2)}))+'</button>';
  }
  if(!rd())html+='<button type="button" class="g3btn" data-gaf3breathe="1" aria-pressed="'+(g._br?'true':'false')+'">'+e(g._br?t('Pause'):t('Breathe'))+'</button>';
  if(g._rest||(g.depth||0)>=capOf(g.shape)){
    html+='<button type="button" class="g3btn" data-gaf3float="1">'+e(t('Float to the Sky'))+'</button>';
  }
  row.innerHTML=html;
  var b=row.querySelector('[data-gaf3season]');
  if(b)b.onclick=function(){g.season=((g.season||0)+1)%4;if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3poly]');
  if(b)b.onclick=function(){g.poly=(g.poly||3)>=6?3:(g.poly||3)+1;if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3jump]');
  if(b)b.onclick=function(){var o=[33,38,50],i=o.indexOf(Math.round(g.angle||50));g.angle=o[(i+1)%3];if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3mod]');
  if(b)b.onclick=function(){g.angle=g.angle===2?3:g.angle===3?5:2;if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3breathe]');
  if(b){
    b.onclick=function(){if(g._br){g._br=0;stopBreath();if(typeof patGrowDraw106==='function')patGrowDraw106()}else startBreath()};
    b.onpointerdown=function(){if(g._br)HOLD=1};
    ['pointerup','pointerleave','pointercancel'].forEach(function(n){b.addEventListener(n,function(){if(g._br)HOLD=0})});
  }
  b=row.querySelector('[data-gaf3float]');
  if(b)b.onclick=function(){if(!g._rest){g._rest=1;var c=document.getElementById('patGrowCv');fadeRest(c,floatSky)}else floatSky()};

  if((g.depth||0)>=capOf(g.shape)&&!g._rest&&!(g.msg&&/as far as this seed grows/i.test(g.msg))&&!g.msg)g.msg=t('It found its rest.');
  /* jar */
  n=copies(g);
  var slot=el.querySelector('[data-gaf3jar]');
  if((g.depth||0)>0){
    var jh=jarSVG(n,'');
    if(slot)slot.outerHTML=jh;else if(cv){(slot=document.getElementById('gaf149count'));if(slot){slot.hidden=true;slot.insertAdjacentHTML('afterend',jh)}else cv.insertAdjacentElement('afterend',(function(){var d=document.createElement('div');d.innerHTML=jh;return d.firstChild})())}
  }else if(slot)slot.remove();

  /* sunflower / apollonian / chaos lines */
  if(g.shape==='sunflower'&&(g.depth||0)>0){
    if(Math.abs((g.angle||0)-137.5)<0.6){var fa=fibArms(copies(g));g.msg=t('The spirals you can count: {a} and {b}.',{a:String(fa.a),b:String(fa.b)})+' '+t('At this turn the seeds pack tight.')}
    else if(Math.abs((g.angle||0)-135)<0.6)g.msg=t('At this turn they line up in spokes.');
  }
  if(g.shape==='apollonian'&&(g.depth||0)>0&&!g._rest)g.msg=t("Every circle's number is a whole number.");
  if(g.shape==='chaos'&&(g.depth||0)>0&&!g._rest)g.msg=t('A little jump, again and again.');
  if(g.shape==='pascal'&&(g.depth||0)>0&&!g._rest)g.msg=t('These two add up to the one below.');
  var msg=document.getElementById('patGrowMsg');
  if(msg&&g.msg)msg.textContent=g.msg;
  var hold=el.querySelector('[data-gaf3hold]');
  if(!hold&&!rd()){hold=document.createElement('p');hold.className='soft g3msg';hold.setAttribute('data-gaf3hold','1');hold.textContent=t('Hold to pause, like a held breath.');row.insertAdjacentElement('afterend',hold)}
}

function parseWrap(prev){
  return function(vals){
    var rec=prev?prev.apply(this,arguments):null,SH=shapes(),a,sh;
    if(rec)return rec;
    if(!vals||vals.length<4)return null;
    a=Number(vals[0]);if(a!==(a|0)||a<0||a>=SH.length)return null;
    sh=SH[a];
    if(sh==='pascal'){
      var m=Number(vals[2]);if(!(m===2||m===3||m===5))return null;
      var d=Number(vals[3]);if(d!==(d|0)||d<0||d>capOf(sh))return null;
      var pal=Number(vals[1]);if(pal!==(pal|0)||pal<0)return null;
      return {shape:sh,shapeI:a,pal:pal,angle:m,depth:d};
    }
    return null;
  };
}

function install(){
  css();
  if(typeof PAT_SHAPES106!=='undefined')SHN.forEach(function(id){if(PAT_SHAPES106.indexOf(id)<0)PAT_SHAPES106.push(id)});
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'&&!IL150.capOf._v154){
    var c0=IL150.capOf;IL150.capOf=function(sh){return CAP[sh]!=null?CAP[sh]:c0(sh)};IL150.capOf._v154=1;IL150.capOf._base=c0._base||c0;
  }
  if(typeof IL151==='object'&&typeof IL151.parseCode==='function'&&!IL151.parseCode._v154){
    var p0=IL151.parseCode,nw=parseWrap(p0);nw._v154=1;nw._base=p0._base||p0;IL151.parseCode=nw;
  }
  hook('patGrowDrawOn106',function(prev){return function(cv,rec){rec=rec||{};if(DRAW[rec.shape]){d9(cv,rec);return}if(rec.shape==='tree'&&(rec.season||0)>0){var x=cv.getContext('2d');bg(x,cv.width,cv.height);if((rec.depth||0)<=0){x.fillStyle=GOLD;x.beginPath();x.arc(cv.width/2,cv.height*0.7,5,0,Math.PI*2);x.fill();return}dTreeSea(x,cv.width,cv.height,rec);return}if(rec._rest){var x=cv.getContext('2d');bg(x,cv.width,cv.height);starsOn(x,cv.width,cv.height,1);return}return prev.apply(this,arguments)}});
  hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{extraUI()}catch(ex){}return r}});
  hook('patGrowSet106',function(prev){return function(k,v){var g=grow();if(k==='shape'&&g){g._rest=0;g._br=0;g._friend='';stopBreath();if(v==='pascal')g.angle=2;else if(v==='chaos'){g.angle=50;g.poly=g.poly||3}else if(v==='sunflower')g.angle=g.angle&&g.angle>=120?g.angle:137.5}var r=prev.apply(this,arguments);return r}});
  hook('patGrowTwist106',function(prev){return function(d){var g=grow();if(g&&g.shape==='pascal'){g.angle=g.angle===2?3:g.angle===3?5:2;if(typeof patGrowDraw106==='function')patGrowDraw106();return}if(g&&g.shape==='chaos'){var o=[33,38,50],i=o.indexOf(Math.round(g.angle||50));g.angle=o[(i+(d>0?1:o.length-1))%3];if(typeof patGrowDraw106==='function')patGrowDraw106();return}if(g&&g.shape==='sunflower'){var r=prev.apply(this,arguments);try{var ang=g.angle||137.5;[135,137.5,144,120].forEach(function(tg){if(Math.abs(ang-tg)<2)g.angle=tg})}catch(ex){}return r}return prev.apply(this,arguments)}});
  hook('patGrowStep106',function(prev){return function(){var g=grow(),r=prev.apply(this,arguments);try{g=grow();if(g&&(g.shape==='tree'||g.shape==='antler'||g.shape==='pythagoras'))sing(g,g.depth||1)}catch(ex){}return r}});
  hook('lampSkyMount81',function(prev){return function(host,pid_){var r=prev.apply(this,arguments);try{paintSky(host)}catch(ex){}return r}});
  hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='patterns')extraUI();if(id==='today'||id==='home'||id==='look'){var h=document.querySelector('.today64')||document.getElementById('today')||document.getElementById(id);if(h)paintSky(h)}}catch(ex){}return r}});
}

root.IL154={version:154,shapes:function(){return shapes().slice()},copies:copies,capOf:capOf,gasket:gasket,starPts:starPts,install:install,floatSky:floatSky,skyLoad:skyLoad,FRI:FRI,SHR:SHR,sing:sing,ink:ink,startBreath:startBreath,stopBreath:stopBreath,fadeRest:fadeRest,sunN:sunN,fibArms:fibArms};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v155: Grow a Fractal 3 math and QA fixes. v154.js stays frozen. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var PHI=(1+Math.sqrt(5))/2, GOLD=360*(1-1/PHI), GOLDJ=1/(PHI*PHI);
var I='#72583f', A='#E6B454', CR='#fff8ec', NK='#0d0f1a', GOLDINK='#E6B454';
var HIGH={htree:1,levy:1,pascal:1,chaos:1,sunflower:1,ripples:1};
var BT=null,HOLD=0;
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function e(s){return typeof patEsc==='function'?patEsc(s):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function capOf(sh){return(typeof IL154==='object'&&IL154.capOf)?IL154.capOf(sh):(sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:6)}
function ink(sh,d,depth){return(typeof IL154==='object'&&IL154.ink)?IL154.ink(sh,d,depth):GOLDINK}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v155)return;var next=wrap(prev);next._v155=1;next._base=prev._base||prev;root[name]=next}
function bg(x,W,H){x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function sunN(d){return(typeof IL154==='object'&&IL154.sunN)?IL154.sunN(d):(function(){var f=[1,13,21,34,55,89,144,233,377];d=Math.max(0,Math.min(f.length-1,d|0));return f[d]})()}
function goldish(a){a=+a||0;return Math.abs(a-137.5)<0.8||Math.abs(a-GOLD)<0.8}
function jumpOf(angle){
  var a=Math.round(angle||50);
  if(a===33)return 1/3;
  if(a===38)return GOLDJ;
  if(a===50)return 0.5;
  if(angle>=30&&angle<=55)return angle/100;
  return 0.5;
}
function jumpLab(angle){
  var a=Math.round(angle||50);
  return a===33?'⅓':a===38?'1/φ²':a===50?'½':String(jumpOf(angle));
}

function copies(rec){
  var d=Math.max(0,rec&&rec.depth||0),sh=rec&&rec.shape;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hilbert')return Math.pow(4,Math.max(0,d-1));
  if(sh==='fern')return Math.min(20000,d*4000);
  if(sh==='sunflower')return sunN(d);
  if(sh==='spirals')return (Math.pow(5,d+1)-1)/4;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='pythagoras'||sh==='antler')return Math.pow(2,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return (d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='apollonian')return gasket(d).length;
  return Math.pow(2,d);
}
function jarWord(sh){
  return ({tree:'branch tips',antler:'branch tips',pythagoras:'tips',htree:'segments',levy:'segments',dragon:'segments',koch:'sides',triangle:'triangles',hexrings:'cells',pascal:'cells',ripples:'rings',sunflower:'seeds',chaos:'dots',fern:'dots',apollonian:'circles',spirals:'spirals',hilbert:'pieces'})[sh]||'pieces';
}
function jarSVG(n,label){
  var N=Math.max(0,n|0),show=Math.min(N,89),cols=8,i,dots='',r,c,x,y;
  for(i=0;i<show;i++){r=Math.floor(i/cols);c=i%cols;x=18+c*10;y=100-(r+1)*9;dots+='<circle cx="'+x+'" cy="'+y+'" r="2.2" fill="'+A+'"/>'}
  return '<div class="g3jar" data-gaf3jar="1"><p class="soft">'+e(t('How many?'))+'</p>'+
    '<svg viewBox="0 0 96 112" width="96" height="112" aria-hidden="true">'+
    '<path d="M28 8 H68 L74 18 V96 Q74 106 48 106 Q22 106 22 96 V18 Z" fill="none" stroke="'+I+'" stroke-width="2.2"/>'+
    '<path d="M24 18 H72" stroke="'+I+'" stroke-width="1.5"/>'+dots+'</svg>'+
    '<p class="g9c" style="margin:4px 0 0">'+e(String(N))+(label?' <span class="soft">'+e(label)+'</span>':'')+'</p></div>';
}

/* ---- Apollonian: rounded k, tangent to all three, no overlaps ---- */
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return {x:a,y:b};
}
function tangent(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  var ext=Math.abs(dist-(r1+r2)),inn=Math.abs(dist-Math.abs(r1-r2));
  return {ok:ext<=eps||inn<=eps,res:Math.min(ext,inn)};
}
function overlaps(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  return dist<r1+r2-eps && dist>Math.abs(r1-r2)+eps;
}
function solutions(c1,c2,c3){
  var k1=c1.k,k2=c2.k,k3=c3.k,rad=k1*k2+k1*k3+k2*k3,out=[],sk,sz,k4,kr,sr,si,rt,c;
  for(sk=1;sk>=-1;sk-=2){
    k4=k1+k2+k3+sk*2*Math.sqrt(Math.max(0,rad));
    if(!isFinite(k4)||Math.abs(k4)<1e-8)continue;
    kr=Math.round(k4);if(kr===0)continue;
    sr=k1*k2*(c1.x*c2.x-c1.y*c2.y)+k1*k3*(c1.x*c3.x-c1.y*c3.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y);
    si=k1*k2*(c1.x*c2.y+c1.y*c2.x)+k1*k3*(c1.x*c3.y+c1.y*c3.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x);
    rt=csqrt(sr,si);
    for(sz=1;sz>=-1;sz-=2){
      c={k:kr,x:(k1*c1.x+k2*c2.x+k3*c3.x+sz*2*rt.x)/kr,y:(k1*c1.y+k2*c2.y+k3*c3.y+sz*2*rt.y)/kr};
      if(tangent(c,c1,1e-6).ok&&tangent(c,c2,1e-6).ok&&tangent(c,c3,1e-6).ok)out.push(c);
    }
  }
  return out;
}
function gasket(depth){
  depth=Math.max(0,Math.min(capOf('apollonian'),depth||0));
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d=null,cs,q,seen,gi,i,t,c1,c2,c3,sols,si,n,k,ix,ok,j;
  sols=solutions(a,b,c);
  for(i=0;i<sols.length;i++)if(sols[i].k>0&&Math.abs(sols[i].k-3)<1e-6){d=sols[i];break}
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];q=[[0,1,2],[0,1,3],[0,2,3],[1,2,3]];seen={};
  function key(c){return Math.round(c.k)+':'+c.x.toFixed(5)+':'+c.y.toFixed(5)}
  cs.forEach(function(c){seen[key(c)]=1});
  for(gi=0;gi<depth;gi++){
    var nq=[];
    for(i=0;i<q.length;i++){
      t=q[i];c1=cs[t[0]];c2=cs[t[1]];c3=cs[t[2]];
      sols=solutions(c1,c2,c3);
      for(si=0;si<sols.length;si++){
        n=sols[si];if(n.k<=0)continue;
        if(Math.hypot(n.x,n.y)+1/n.k>1.02)continue;
        k=key(n);if(seen[k])continue;
        ok=1;
        for(j=0;j<cs.length;j++){
          if(overlaps(n,cs[j],1e-4)){ok=0;break}
        }
        if(!ok)continue;
        seen[k]=1;cs.push(n);ix=cs.length-1;
        nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
      }
    }
    q=nq;
  }
  return cs;
}
function paintCount(depth){return gasket(depth).length}

function dApol(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('apollonian'),rec.depth||0)),cs=gasket(depth),sc=Math.min(W,H)*0.46,cx=W/2,cy=H/2,i,c,r;
  for(i=0;i<cs.length;i++){
    c=cs[i];r=Math.abs(1/c.k)*sc;
    x.strokeStyle=ink('apollonian',i?1:0,Math.max(1,depth));
    x.lineWidth=c.k<0?2.2:Math.max(0.6,2-Math.log(c.k+1)*0.35);
    x.beginPath();x.arc(cx+c.x*sc,cy-c.y*sc,r,0,Math.PI*2);x.stroke();
    if(c.k>0&&r>14){
      x.fillStyle=I;x.font=Math.max(9,Math.min(16,r*0.55))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
    }
  }
}
function dH(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('htree'),rec.depth||0)),s2=Math.SQRT1_2;
  function Hn(cx,cy,len,hz,d){
    if(d<0||len<1.2)return;
    x.strokeStyle=ink('htree',d,depth);x.lineWidth=Math.max(0.7,2.6-d*0.25);
    x.beginPath();
    if(hz){x.moveTo(cx-len,cy);x.lineTo(cx+len,cy)}else{x.moveTo(cx,cy-len);x.lineTo(cx,cy+len)}
    x.stroke();
    if(hz){Hn(cx-len,cy,len*s2,0,d-1);Hn(cx+len,cy,len*s2,0,d-1)}
    else{Hn(cx,cy-len,len*s2,1,d-1);Hn(cx,cy+len,len*s2,1,d-1)}
  }
  Hn(W/2,H/2,Math.min(W,H)*0.22,1,depth);
}
function dLevy(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('levy'),rec.depth||0)),pts=[{x:0,y:0},{x:1,y:0}],k,i,next,a,b,mx,my,minx=0,miny=0,maxx=1,maxy=0,sc,ox,oy,pad=10,bw,bh;
  for(k=0;k<depth;k++){
    next=[];
    for(i=0;i<pts.length-1;i++){
      a=pts[i];b=pts[i+1];
      mx=(a.x+b.x)/2-(b.y-a.y)/2;my=(a.y+b.y)/2+(b.x-a.x)/2;
      next.push(a,{x:mx,y:my});
    }
    next.push(pts[pts.length-1]);pts=next;
  }
  for(i=0;i<pts.length;i++){minx=Math.min(minx,pts[i].x);miny=Math.min(miny,pts[i].y);maxx=Math.max(maxx,pts[i].x);maxy=Math.max(maxy,pts[i].y)}
  bw=Math.max(1e-6,maxx-minx);bh=Math.max(1e-6,maxy-miny);
  sc=Math.min((W-2*pad)/bw,(H-2*pad)/bh);
  ox=W/2-sc*(minx+maxx)/2;oy=H/2-sc*(miny+maxy)/2;
  x.strokeStyle=ink('levy',depth,depth);x.lineWidth=Math.max(0.9,2.8-depth*0.18);
  x.beginPath();pts.forEach(function(p,i){var X=p.x*sc+ox,Y=p.y*sc+oy;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
}
function dChaos(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('chaos'),rec.depth||0)),N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=jumpOf(rec.angle),s=(rec.seed||109)>>>0,i,v=[],ang,p,j,last=-1,w=Math.min(W,H)*0.42,same=poly===4&&Math.abs(fr-0.5)<1e-9;
  function rnd1(){s=(1664525*s+1013904223)>>>0;return s/4294967296}
  for(i=0;i<poly;i++){ang=-Math.PI/2+i*2*Math.PI/poly;v.push({x:W/2+Math.cos(ang)*w,y:H/2+Math.sin(ang)*w})}
  p={x:W/2,y:H/2};x.fillStyle=ink('chaos',depth,Math.max(1,depth));
  for(i=0;i<N;i++){
    j=Math.floor(rnd1()*poly);
    if(same&&j===last)j=(j+1+Math.floor(rnd1()*(poly-1)))%poly;
    last=j;p.x+=(v[j].x-p.x)*fr;p.y+=(v[j].y-p.y)*fr;
    x.fillRect(p.x,p.y,1.3,1.3);
  }
}
function dHex(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('hexrings'),rec.depth||0)),pad=6,size,R,q,r,s,px,py,ring;
  if(depth<=0)size=Math.min(W,H)*0.28;
  else size=(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
  R=size/Math.sqrt(3);
  function hex(cx,cy,rad,col){
    var a;x.beginPath();
    for(a=0;a<6;a++)x[a?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+a*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+a*Math.PI/3)*rad);
    x.closePath();x.strokeStyle=col;x.lineWidth=Math.max(0.8,2.2);x.stroke();
  }
  for(q=-depth;q<=depth;q++){
    for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      px=W/2+(q+r/2)*size;py=H/2+r*size*Math.sqrt(3)/2;
      ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
      hex(px,py,R,ink('hexrings',ring,depth));
    }
  }
}
function dRip(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('ripples'),rec.depth||0)),i,Rmax=Math.min(W,H)/2-6,step;
  if(depth<=0){x.fillStyle=GOLDINK;x.beginPath();x.arc(W/2,H/2,5,0,Math.PI*2);x.fill();return}
  step=Rmax/Math.max(1,depth);
  for(i=1;i<=depth;i++){
    x.strokeStyle=ink('ripples',i,depth);x.lineWidth=Math.max(0.9,3-i*0.2);
    x.beginPath();x.arc(W/2,H/2,step*i,0,Math.PI*2);x.stroke();
  }
}
function dSun(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('sunflower'),rec.depth||0)),n=sunN(depth),phi=rec.angle||GOLD,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th;
  if(goldish(phi))phi=GOLD;
  for(i=0;i<n;i++){
    r=c*Math.sqrt(i);th=i*phi*Math.PI/180;
    x.fillStyle=ink('sunflower',i>=n-Math.max(8,n/8)?depth:0,Math.max(1,depth));
    x.beginPath();x.arc(W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.5,3.1-i/n*1.5),0,Math.PI*2);x.fill();
  }
}
var DRAW={sunflower:dSun,htree:dH,levy:dLevy,apollonian:dApol,chaos:dChaos,hexrings:dHex,ripples:dRip};

function d9(cv,rec){
  if(!cv||!rec||!DRAW[rec.shape])return false;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  bg(x,W,H);
  if(rec._rest){if(typeof IL154==='object'&&IL154.starPts){/* v154 rest path */}return false}
  if((rec.depth||0)<=0&&rec.shape!=='ripples'&&rec.shape!=='hexrings'){
    x.fillStyle=GOLDINK;x.beginPath();x.arc(W/2,H*0.7,5,0,Math.PI*2);x.fill();return true;
  }
  DRAW[rec.shape](x,W,H,rec);return true;
}

function stopBreath(){if(BT){clearTimeout(BT);BT=null}HOLD=0}
function startBreath(){
  var g=grow();if(!g||rd())return;
  if((g.depth||0)>=capOf(g.shape)){g._br=0;if(typeof patGrowDraw106==='function')patGrowDraw106();return}
  g._br=1;HOLD=0;
  function afterStep(before){
    g=grow();
    if(!g||!g._br)return;
    if((g.depth||0)>=capOf(g.shape)||(g.depth||0)<=before){
      g._br=0;stopBreath();
      if((g.depth||0)>=capOf(g.shape)&&!(g.msg&&/as far as this seed grows/i.test(g.msg)))g.msg=t('It found its rest.');
      if(typeof patGrowDraw106==='function')patGrowDraw106();
      return;
    }
    BT=setTimeout(tick,4000);
  }
  function tick(){
    BT=null;g=grow();
    if(!g||!g._br||HOLD||rd())return;
    if((g.depth||0)>=capOf(g.shape)){
      g._br=0;stopBreath();
      if(!(g.msg&&/as far as this seed grows/i.test(g.msg)))g.msg=t('It found its rest.');
      if(typeof patGrowDraw106==='function')patGrowDraw106();
      return;
    }
    var before=g.depth||0;
    if(typeof patGrowStep106==='function')patGrowStep106();
    var n=0;
    (function wait(){
      g=grow();
      if(!g||!g._br||HOLD)return;
      if(g.busy||(g.q&&g.q.length)){if(++n<30){setTimeout(wait,50);return}}
      afterStep(before);
    })();
  }
  BT=setTimeout(tick,4000);
  if(typeof patGrowDraw106==='function')patGrowDraw106();
}

function css(){
  if(document.getElementById('v155css'))return;
  var s=document.createElement('style');s.id='v155css';
  s.textContent='#patterns .g9w{overflow:hidden}'+
    '#patterns .g9p{bottom:8px;right:8px;z-index:2}'+
    '#patterns [data-gaf3ctrl],#patterns [data-gaf3hold]{padding-right:72px;box-sizing:border-box}'+
    '#patterns [data-gaf3ctrl]{max-width:100%}'+
    '#patterns .g9l,#gaf149print .g9l{color:#2A2230}'+
    '#patterns .g9l .soft,#patterns .g9l figcaption,#patterns .g9l figcaption .soft,#gaf149print .g9l .soft,#gaf149print .g9l figcaption{color:#2A2230}'+
    '#patterns [data-gafload150]{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:flex-end}'+
    '#patterns [data-gafload150] .g9e-slot{display:inline-flex;flex-direction:column;align-items:center;gap:4px;color:#2A2230;font-size:.9rem}'+
    '#patterns [data-gafload150] input[data-gafn]{background:#fff8ec;color:#2A2230;border:2px solid #2A2230;width:4.6em;min-width:56px;min-height:56px;text-align:center;font:inherit}'+
    '#patterns [data-gafload150] input[data-gafn]::placeholder{color:#2A2230;opacity:.55}';
  document.head.appendChild(s);
}
function friendMark(kind){
  if(kind==='turtle')return '<svg viewBox="0 0 44 44" aria-hidden="true"><ellipse cx="22" cy="24" rx="12" ry="9" fill="none" stroke="#6F9A7A" stroke-width="2"/><path d="M22 15 C20 11 24 11 22 15" fill="none" stroke="#6F9A7A" stroke-width="2" stroke-linecap="round"/><path d="M12 20 L8 17 M32 20 L36 17 M14 32 L11 36 M30 32 L33 36" fill="none" stroke="#6F9A7A" stroke-width="1.8" stroke-linecap="round"/></svg>';
  if(kind==='deer')return '<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M22 38 V18 M22 22 L13 9 M22 22 L31 9 M16 16 L11 11 M28 16 L33 11" fill="none" stroke="#5B7A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if(kind==='firefly')return '<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="16" r="7" fill="#E6B454" opacity=".4"/><ellipse cx="22" cy="26" rx="4" ry="8" fill="none" stroke="#72583f" stroke-width="2"/><circle cx="22" cy="16" r="2.4" fill="#E6B454"/></svg>';
  return '';
}
function fixUI(){
  css();
  var g=grow(),el=document.getElementById('patterns'),row,b,slot,msg,hold,n,lab,btn;
  if(!g||!el)return;
  row=el.querySelector('[data-gaf3ctrl]');
  if(g.shape==='pythagoras'){
    b=el.querySelector('[data-gaf3season]');
    if(b)b.remove();
  }
  b=el.querySelector('[data-gaf3jump]');
  if(b)b.innerHTML=e(t('Jump'))+': '+e(jumpLab(g.angle||50));
  if(g.shape==='sunflower'&&(g.depth||0)>0){
    if(goldish(g.angle||GOLD)){
      var fa=(typeof IL154==='object'&&IL154.fibArms)?IL154.fibArms(copies(g)):{a:34,b:55};
      g.msg=t('The spirals you can count: {a} and {b}.',{a:String(fa.a),b:String(fa.b)})+' '+t('At this turn the seeds pack tight.');
    }
  }
  /* QA 8–9: dark ink on the cream recipe card; slot 1 is Shape on card and loader */
  var inkCard='#2A2230';
  [].forEach.call(el.querySelectorAll('[data-gafcode149] figcaption .soft, #gaf149print figcaption .soft'),function(s){
    var txt=(s.textContent||'').trim();
    if(txt===t('Seed')||txt==='Seed'||txt==='Semilla'||txt===t('Shape')||txt==='Shape'||txt==='Forma')s.textContent=t('Shape');
    s.style.color=inkCard;
  });
  [].forEach.call(el.querySelectorAll('[data-gafcode149] .soft, [data-gafcode149] figcaption, #gaf149print .g9l .soft, #gaf149print .g9l figcaption'),function(s){
    s.style.color=inkCard;
  });
  var load=el.querySelector('[data-gafload150]');
  if(load){
    var labs=[t('Shape'),t('Palette'),t('Bend'),t('Grow')];
    var inps=[].slice.call(load.querySelectorAll('[data-gafn]'));
    inps.forEach(function(inp,i){
      inp.setAttribute('placeholder',labs[i]);
      inp.setAttribute('aria-label',labs[i]);
      if(!inp.closest('.g9e-slot')){
        var wrap=document.createElement('label');
        wrap.className='g9e-slot';
        inp.parentNode.insertBefore(wrap,inp);
        wrap.appendChild(inp);
        var sp=document.createElement('span');
        sp.className='g9e-lab';
        sp.textContent=labs[i];
        wrap.appendChild(sp);
      }else{
        var sp=inp.parentNode.querySelector('.g9e-lab');
        if(sp)sp.textContent=labs[i];
      }
    });
  }
  /* jar: true counts + per-shape unit */
  n=copies(g);lab=jarWord(g.shape);
  slot=el.querySelector('[data-gaf3jar]');
  if((g.depth||0)>0){
    var jh=jarSVG(n,t(lab));
    if(slot)slot.outerHTML=jh;
    else{
      var cv=document.getElementById('patGrowCv');
      var hid=document.getElementById('gaf149count');
      if(hid){hid.hidden=true;hid.textContent=String(n);hid.insertAdjacentHTML('afterend',jh)}
      else if(cv)cv.insertAdjacentElement('afterend',(function(){var d=document.createElement('div');d.innerHTML=jh;return d.firstChild})());
    }
  }
  msg=document.getElementById('patGrowMsg');
  if(msg&&g.msg)msg.textContent=g.msg;
  /* friends: distinct marks, no shared plant badge */
  ['turtle','deer','firefly'].forEach(function(k){
    btn=el.querySelector('[data-gaf3fr="'+k+'"]');
    if(!btn)return;
    var mark=friendMark(k),span=btn.querySelector('span:last-child'),keep=span?span.outerHTML:'';
    var svg=btn.querySelector('svg'),dot=btn.querySelector('.g3dot');
    if(svg)svg.outerHTML=mark;
    else if(dot)dot.outerHTML=mark;
    else btn.innerHTML=mark+keep;
  });
  /* Breathe: v155 timer, no maybeRest */
  b=el.querySelector('[data-gaf3breathe]');
  if(b){
    b.onclick=function(){g=grow();if(g._br){g._br=0;stopBreath();if(typeof patGrowDraw106==='function')patGrowDraw106()}else startBreath()};
    b.onpointerdown=function(){if(grow()._br)HOLD=1};
    ['pointerup','pointerleave','pointercancel'].forEach(function(n){b.addEventListener(n,function(){if(grow()._br)HOLD=0})});
  }
}

function guardDragonWipe(cv){
  if(!cv)return;
  var x=cv.getContext('2d');
  if(!x._v155guard){
    var fill=x.fillRect;
    x.fillRect=function(a,b,c,d){
      if(this._v155blockWipe&&a===0&&b>0&&c===this.canvas.width&&d===this.canvas.height)return;
      return fill.apply(this,arguments);
    };
    x._v155guard=1;
  }
}

function growPast6(){
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&HIGH[g.shape]){
        var cap=capOf(g.shape);
        if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        var apply=function(){
          g=grow();
          if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
          g.depth=(g.depth||0)+1;
          if(g.depth>=cap)g.msg=t('That is as far as this seed grows.');
          else if(g.msg&&/as far as this seed grows/i.test(g.msg))g.msg='';
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          if(typeof patGrowDraw106==='function')patGrowDraw106();
        };
        if(typeof patReduced==='function'&&patReduced()){apply();return}
        g.q=g.q||[];
        g.q.push(apply);
        if(!g.busy){
          g.busy=true;
          (function tick(){
            var fn=g.q.shift();
            if(!fn){g.busy=false;return}
            fn();
            setTimeout(tick,420);
          })();
        }
        return;
      }
      return prev.apply(this,arguments);
    };
  });
}

function install(){
  if(install._on)return;install._on=1;
  css();
  if(typeof IL154==='object'){
    IL154.copies=copies;IL154.gasket=gasket;IL154.startBreath=startBreath;IL154.stopBreath=stopBreath;
    IL154.GOLD=GOLD;IL154.jumpOf=jumpOf;IL154.paintCount=paintCount;IL154.jarWord=jarWord;
  }
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!rec._rest&&DRAW[rec.shape]&&d9(cv,rec))return;
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var g=grow(),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
      if(g&&g.shape==='dragon'&&(g.depth||0)>=1&&cv)guardDragonWipe(cv);
      var r=prev.apply(this,arguments);
      try{
        g=grow();cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
        if(g&&g.shape==='dragon'&&(g.depth||0)>=1&&cv&&!g._rest){
          var x=cv.getContext('2d');
          x._v155blockWipe=1;
          if(typeof patGrowDrawOn106==='function')patGrowDrawOn106(cv,g);
          setTimeout(function(){try{x._v155blockWipe=0}catch(ex){}},1800);
        }
        fixUI();
      }catch(ex){}
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      var g=grow();
      if(k==='shape'&&g){g._rest=0;g._br=0;g._friend='';stopBreath()}
      var r=prev.apply(this,arguments);
      g=grow();
      if(k==='shape'&&g){
        if(v==='pascal')g.angle=2;
        else if(v==='chaos'){g.angle=50;g.poly=g.poly||3}
        else if(v==='sunflower')g.angle=goldish(g.angle)?GOLD:(g.angle&&g.angle>=120?g.angle:GOLD);
        if(typeof patGrowDraw106==='function')patGrowDraw106();
      }
      return r;
    };
  });
  hook('patGrowTwist106',function(prev){
    return function(d){
      var r=prev.apply(this,arguments),g=grow();
      if(g&&g.shape==='sunflower'){
        var ang=g.angle||GOLD;
        if(goldish(ang))g.angle=GOLD;
        [135,144,120].forEach(function(tg){if(Math.abs(ang-tg)<2)g.angle=tg});
      }
      return r;
    };
  });
  growPast6();
  hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='patterns')fixUI()}catch(ex){}return r}});
}

root.IL155={version:155,copies:copies,gasket:gasket,capOf:capOf,startBreath:startBreath,stopBreath:stopBreath,GOLD:GOLD,PHI:PHI,jumpOf:jumpOf,paintCount:paintCount,jarWord:jarWord,jarSVG:jarSVG,install:install,friendMark:friendMark,dHex:dHex,dLevy:dLevy,dRip:dRip};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v156: Hilbert jar shows 4^d cells; honor capOf for every Grow shape. v155.js stays frozen. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var copies0=null,word0=null;
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function capOf(sh){
  if(typeof IL154==='object'&&typeof IL154.capOf==='function'&&IL154.capOf!==capOf)return IL154.capOf(sh);
  if(typeof IL155==='object'&&typeof IL155.capOf==='function')return IL155.capOf(sh);
  return sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:sh==='koch'?5:sh==='apollonian'?4:sh==='hexrings'?4:6;
}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v156)return;var next=wrap(prev);next._v156=1;next._base=prev._base||prev;root[name]=next}
function copies(rec){
  rec=rec||{};
  var sh=rec.shape,cap=capOf(sh),d=Math.max(0,Math.min(cap,rec.depth||0));
  if(sh==='hilbert')return Math.pow(4,d);
  if(typeof copies0==='function')return copies0({shape:sh,depth:d,angle:rec.angle,poly:rec.poly,seed:rec.seed,season:rec.season});
  return Math.pow(2,d);
}
function jarWord(sh){
  if(sh==='hilbert')return 'cells';
  if(typeof word0==='function')return word0(sh);
  return 'cells';
}
function capMsg(g){
  if(!g||g._rest)return;
  if((g.depth||0)<capOf(g.shape))return;
  g.msg=t('That is as far as this seed grows.');
  var el=document.getElementById('patGrowMsg');
  if(el)el.textContent=g.msg;
}
function growCap(){
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g.shape){
        var cap=capOf(g.shape);
        if((g.depth||0)>=cap){
          g.msg=t('That is as far as this seed grows.');
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
      }
      return prev.apply(this,arguments);
    };
  });
}
function fixJar(){
  var g=grow(),el=document.getElementById('patterns'),slot,n,lab;
  if(!g||!el)return;
  capMsg(g);
  if((g.depth||0)<=0)return;
  if(typeof IL155!=='object'||typeof IL155.jarSVG!=='function')return;
  n=copies(g);lab=jarWord(g.shape);
  slot=el.querySelector('[data-gaf3jar]');
  if(!slot)return;
  slot.outerHTML=IL155.jarSVG(n,t(lab));
}
function install(){
  if(install._on)return;install._on=1;
  if(typeof IL155==='object'){
    copies0=IL155.copies;word0=IL155.jarWord;
    IL155.copies=copies;IL155.jarWord=jarWord;
  }
  if(typeof IL154==='object'){IL154.copies=copies;IL154.jarWord=jarWord}
  hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{fixJar()}catch(ex){}return r}});
  hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='patterns')fixJar()}catch(ex){}return r}});
  growCap();
}
root.IL156={version:156,copies:copies,jarWord:jarWord,capOf:capOf,install:install};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v157: Group C start — GaF cap/jar/recipe/i18n fixes, lazy look previews. No show() wrap. Quilt untouched. Voices untouched. */
(function(root){
'use strict';
var I='#72583f',A='#E6B454';
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function e(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function capOf(sh){
  if(typeof IL156==='object'&&typeof IL156.capOf==='function')return IL156.capOf(sh);
  if(typeof IL155==='object'&&typeof IL155.capOf==='function')return IL155.capOf(sh);
  if(typeof IL154==='object'&&typeof IL154.capOf==='function')return IL154.capOf(sh);
  return sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:sh==='koch'?5:sh==='apollonian'?4:sh==='hexrings'?4:6;
}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v157)return;var next=wrap(prev);next._v157=1;next._base=prev._base||prev;root[name]=next}
function isEs(){try{return (typeof LANG==='string'&&LANG==='es')||(typeof lampLang==='function'&&lampLang()==='es')}catch(ex){return false}}
function unitLabel(sh){
  if(sh==='hilbert')return isEs()?'casillas':'cells';
  var w=(typeof IL156==='object'&&typeof IL156.jarWord==='function')?IL156.jarWord(sh):(typeof IL155==='object'&&typeof IL155.jarWord==='function')?IL155.jarWord(sh):'cells';
  return t(w);
}
function jarSVG(n,label){
  var N=Math.max(0,n|0),show=Math.min(N,89),cols=7,rows=Math.max(1,Math.ceil(show/cols)||1);
  var x0=30,x1=66,y0=26,y1=94,dx=cols>1?(x1-x0)/(cols-1):0,dy=rows>1?(y1-y0)/(rows-1):0;
  var i,r,c,x,y,dots='';
  for(i=0;i<show;i++){
    r=Math.floor(i/cols);c=i%cols;
    x=x0+c*dx;y=y1-r*dy;
    dots+='<circle cx="'+x.toFixed(2)+'" cy="'+y.toFixed(2)+'" r="2" fill="'+A+'"/>';
  }
  var p='M28 8 H68 L74 18 V96 Q74 106 48 106 Q22 106 22 96 V18 Z';
  return '<div class="g3jar" data-gaf3jar="1"><p class="soft">'+e(t('How many?'))+'</p>'+
    '<svg viewBox="0 0 96 112" width="96" height="112" aria-hidden="true">'+
    '<defs><clipPath id="gaf3jarclip"><path d="'+p+'"/></clipPath></defs>'+
    '<path d="'+p+'" fill="none" stroke="'+I+'" stroke-width="2.2"/>'+
    '<path d="M24 18 H72" stroke="'+I+'" stroke-width="1.5"/>'+
    '<g clip-path="url(#gaf3jarclip)">'+dots+'</g></svg>'+
    '<p class="g9c" style="margin:4px 0 0">'+e(String(N))+(label?' <span class="soft">'+e(label)+'</span>':'')+'</p></div>';
}
function copies(rec){
  if(typeof IL156==='object'&&typeof IL156.copies==='function')return IL156.copies(rec);
  if(typeof IL155==='object'&&typeof IL155.copies==='function')return IL155.copies(rec);
  return Math.pow(2,(rec&&rec.depth)||0);
}
function keepSky(g){
  if(!g||!g._rest)return;
  if(!g.msg||!/in the Sky|en el Cielo|It's in the Sky/i.test(g.msg))g.msg=t("It's in the Sky.");
  var el=document.getElementById('patGrowMsg');
  if(el)el.textContent=g.msg;
}
function fixJar(){
  var g=grow(),el=document.getElementById('patterns'),slot,n,lab;
  if(!g||!el)return;
  keepSky(g);
  if((g.depth||0)<=0)return;
  n=copies(g);lab=unitLabel(g.shape);
  slot=el.querySelector('[data-gaf3jar]');
  if(!slot)return;
  slot.outerHTML=jarSVG(n,lab);
}
function wrapParse(){
  if(typeof IL151!=='object'||typeof IL151.parseCode!=='function'||IL151.parseCode._v157)return;
  var prev=IL151.parseCode;
  function next(vals){
    var rec=prev.apply(this,arguments);
    if(rec)return rec;
    if(!vals||vals.length<4)return null;
    var d=Number(vals[3]);
    if(!isFinite(d)||d!==Math.round(d)||d<0)return null;
    var sh,cap,vals2,a;
    if(typeof IL154==='object'&&typeof IL154.shapes==='function'){
      var SH=IL154.shapes();a=Number(vals[0]);
      if(a!==(a|0)||a<0||a>=SH.length)return null;
      sh=SH[a];
    }else{
      return null;
    }
    cap=capOf(sh);
    if(d<=cap)return null;
    vals2=Array.prototype.slice.call(vals);
    vals2[3]=String(cap);
    return prev.call(this,vals2);
  }
  next._v157=1;next._base=prev._base||prev;
  IL151.parseCode=next;
  if(typeof IL150==='object')IL150.parseCode=next;
}
function protectSky(){
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g._rest){
        keepSky(g);
        if(typeof patGrowDraw106==='function')patGrowDraw106();
        return;
      }
      return prev.apply(this,arguments);
    };
  });
}
function fillLookTiles(root){
  root=root&&root.querySelectorAll?root:document;
  var list=root.querySelectorAll('[data-il-lazy-look]'),i,svg,look,kind,stage,inner,g;
  for(i=0;i<list.length;i++){
    svg=list[i];
    look=svg.getAttribute('data-il-lazy-look');
    kind=svg.getAttribute('data-il-lazy-kind');
    stage=svg.getAttribute('data-il-lazy-stage')||'1';
    inner='';
    try{if(typeof IL119==='object'&&typeof IL119.art==='function')inner=IL119.art(kind,stage,{look:look})||''}catch(ex){inner=''}
    g=svg.querySelector('g.lamp73-ink');
    if(g)g.innerHTML=inner;
    svg.removeAttribute('data-il-lazy-look');
    svg.removeAttribute('data-il-lazy-kind');
    svg.removeAttribute('data-il-lazy-stage');
  }
  try{if(typeof IL147==='object'&&typeof IL147.mark==='function')IL147.mark(root)}catch(ex){}
}
function scheduleLooks(root){
  var run=function(){try{fillLookTiles(root)}catch(ex){}};
  if(typeof requestIdleCallback==='function')requestIdleCallback(run,{timeout:800});
  else setTimeout(run,0);
}
function wrapFloat(){
  if(typeof IL154!=='object'||typeof IL154.floatSky!=='function'||IL154.floatSky._v157)return;
  var prev=IL154.floatSky;
  function next(){
    var g=grow();
    if(g)g._rest=1;
    var r=prev.apply(this,arguments);
    keepSky(g);
    return r;
  }
  next._v157=1;next._base=prev._base||prev;
  IL154.floatSky=next;
}
function hookLooks(){
  if(typeof friendPickerAttach101==='function'&&!friendPickerAttach101._v157){
    var prev=friendPickerAttach101;
    friendPickerAttach101=function(){
      var r=prev.apply(this,arguments);
      try{scheduleLooks(document)}catch(ex){}
      return r;
    };
    friendPickerAttach101._v157=1;
  }
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{if(id==='look'||id==='kids')scheduleLooks(document)}catch(ex){}
      return r;
    };
  });
}
function install(){
  if(install._on)return;install._on=1;
  if(typeof IL155==='object')IL155.jarSVG=jarSVG;
  wrapParse();
  wrapFloat();
  protectSky();
  hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{fixJar()}catch(ex){}return r}});
  hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='patterns')fixJar()}catch(ex){}return r}});
  hookLooks();
}
root.IL157={version:157,jarSVG:jarSVG,unitLabel:unitLabel,install:install,fillLookTiles:fillLookTiles};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
// v159: defer Glass and Constellation mode scripts. sils_v2.js and Inner light
// still load at boot. A saved lamp_il_look of glass or constellation is injected
// by the boot snippet in index.html so first paint is not Inner light. Opening
// the looks picker, or choosing those looks, loads the kits on demand. The
// files stay in the service-worker precache and offline manifests. show() is
// not wrapped. The quilt is not edited.
(function(root){
 'use strict';
 var pending={};
 function srcOf(look){
  if(look==='glass')return 'looks/mode_glass_v21.min.js';
  if(look==='constellation')return 'looks/mode_constellation_v2.min.js';
  return '';
 }
 function has(look){
  if(look==='glass')return typeof ilGlassV21==='function';
  if(look==='constellation')return typeof ilConstellationV2==='function';
  return true;
 }
 function ensure(look){
  look=(look==='glass'||look==='constellation')?look:'inner';
  if(look==='inner'||has(look))return Promise.resolve();
  if(pending[look])return pending[look];
  pending[look]=new Promise(function(res,rej){
   var s=document.createElement('script');
   s.src=srcOf(look);
   s.onload=function(){res()};
   s.onerror=function(){pending[look]=null;rej(new Error('look-mode '+look))};
   (document.head||document.documentElement).appendChild(s);
  });
  return pending[look];
 }
 function ensureAll(){return Promise.all([ensure('glass'),ensure('constellation')])}
 function visibleTile(el){
  if(!el||!el.closest)return false;
  var sec=el.closest('section');
  if(sec&&sec.classList.contains('hidden'))return false;
  if(el.closest('[hidden]'))return false;
  return true;
 }
 function hookFill(){
  if(typeof IL157!=='object'||typeof IL157.fillLookTiles!=='function'||IL157.fillLookTiles._v159)return;
  var prev=IL157.fillLookTiles;
  function next(root){
   var host=root&&root.querySelectorAll?root:document;
   var tiles=[],list=host.querySelectorAll('[data-il-lazy-look]'),i,looks={},jobs=[];
   for(i=0;i<list.length;i++) if(visibleTile(list[i])) tiles.push(list[i]);
   if(!tiles.length)return;
   for(i=0;i<tiles.length;i++) looks[tiles[i].getAttribute('data-il-lazy-look')]=1;
   if(looks.glass)jobs.push(ensure('glass'));
   if(looks.constellation)jobs.push(ensure('constellation'));
   var self=this,args=arguments;
   Promise.all(jobs).then(function(){prev.apply(self,args)}).catch(function(){try{prev.apply(self,args)}catch(e){}});
  }
  next._v159=1;next._base=prev._base||prev;
  IL157.fillLookTiles=next;
 }
 hookFill();
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hookFill);
 else hookFill();
 root.IL159={version:159,ensure:ensure,ensureAll:ensureAll,has:has};
})(typeof window!=='undefined'?window:this);
// v160: stop loading retired-only modules v29.js and v55.js.
// Reachability (see /workspace/audit-v160/REACHABILITY.md): no live tile, saved
// state, or Back/hash path can open Star songs, Cymatica, Sound Lab, Number
// Music, or the v29 arcade inject. showImpl97 still redirects those ids.
// v29 only injected a retired Star songs tile into the arcade hub and wrapped
// show() behind a dead _v97 guard. v55 only replaced nmLoop for Number Music,
// which cannot open. Mixed live files (v14 Bedtime, v16-seq note(), v32 GHUB,
// v44/v46/v49 Paint wraps) stay loaded. show() is not wrapped. The quilt and
// Paint wraps are not edited.
(function(root){
 'use strict';
 root.IL160={version:160};
})(typeof window!=='undefined'?window:this);
// v161: merge tiny leftover patches that are comments, empty markers, or
// order-safe CSS / turtle-gain. Folded from files that stay on disk:
//   v98.js, v117.js (comments only)
//   v134.js, v136.js (empty; patches already live in v132/v112 and v135)
//   v142.js, v146.js, v158.js (version markers; pictures already in v101-art.js;
//     Look Closer already unloaded)
//   v96.js (Kids phone padding CSS)
//   v144.js (44px Calm leftovers CSS + IL144)
//   v107.js (56px Grow button CSS + live turtle gain 1.49; helpers already in v106)
// Does not wrap show(). Paint wraps and the quilt are not edited.
(function(root){
 'use strict';
 root.IL142={version:142};
 root.IL144={version:144};
 root.IL146={version:146};
 root.IL158={version:158};
 root.IL161={version:161};

 document.head.insertAdjacentHTML('beforeend',`<style id="v96css">
@media (max-width:640px){
  body.v20float #kids,body.bedtime #kids{padding-bottom:calc(56px + 44px + 20px)}
  body.v20float #kids [data-fx89-picker] > p.soft,
  body.bedtime #kids [data-fx89-picker] > p.soft,
  body.v20float #kids [data-flame81-picker] > p.soft,
  body.bedtime #kids [data-flame81-picker] > p.soft{padding-inline-start:60px}
}
</style>`);

 document.head.insertAdjacentHTML('beforeend',`<style id="calm144">
button, [role="button"], .hubtile, [data-tap], summary, .pchip, .pc, .filt button, nav button, .pbar button, .pbar101 button, .pstamp101 button, .lkeys button{
  min-width:44px;min-height:44px;box-sizing:border-box
}
select, input, textarea{min-height:44px;box-sizing:border-box}
input[type=range], .big input[type=range]{height:44px;min-height:44px}
#hub a[href]{
  display:inline-flex;align-items:center;min-height:44px;min-width:44px;padding:8px 4px
}
</style>`);

 const s=document.createElement('style');
 s.id='v107css';
 s.textContent='#patterns .pat-row button{min-height:56px;min-width:56px}';
 document.head.appendChild(s);
 if(typeof SCGAIN102==='object')SCGAIN102.turtle=1.49;
})(typeof window!=='undefined'?window:this);
// v162: Seed voice tone pass over on-screen text (see
// /workspace/audit-seedvoice/CHANGES.md). Recorded clips and the strings
// they speak are unchanged. show() is not wrapped. The quilt and Paint
// wraps are not edited. No audio files were touched.
(function(root){
 'use strict';
 root.IL162={version:162};
})(typeof window!=='undefined'?window:this);
/* v163: Zoom a Fractal 2 on the v106 explorer, plus a calm companion
   accent color in the looks picker. show() is not wrapped. Existing
   Mandelbrot / Julia / Koch / Sierpinski pixels stay the same. Dragon
   egg art is not edited. v4.2 SVGs are not used. */
(function(root){
'use strict';

const PI=Math.PI;
/* Superattractive centers (f^p(0)=0), computed as roots of the period
   polynomial. Period 3, 4 and 5 bulbs used for antenna counting sit on
   the main cardioid. Minibrots used for "find the baby" are isolated
   islands: the period-3 copy on the spike, and the period-4 copies north
   and south of the main set. */
const BULB163={
  3:{cx:-0.122561167,cy:0.744861767,span:0.62,spokes:3},
  4:{cx:0.282271391,cy:0.530060618,span:0.48,spokes:4},
  5:{cx:0.379513588,cy:0.334932306,span:0.36,spokes:5}
};
const BABY163=[
  {cx:-1.754877666,cy:0,span:0.14,period:3},
  {cx:-0.156520167,cy:1.032247109,span:0.12,period:4},
  {cx:-0.156520167,cy:-1.032247109,span:0.12,period:4}
];
const ROOTS163=[
  {re:1,im:0},
  {re:-0.5,im:Math.sqrt(3)/2},
  {re:-0.5,im:-Math.sqrt(3)/2}
];
/* Calm accent palette (about 6). Device-only. */
const PALETTE163=[
  {id:'amber',hex:'#E6B454',en:'Amber',es:'Ámbar'},
  {id:'honey',hex:'#D4A060',en:'Honey',es:'Miel'},
  {id:'leaf',hex:'#7A9A6A',en:'Leaf',es:'Hoja'},
  {id:'sage',hex:'#6F9A7A',en:'Sage',es:'Salvia'},
  {id:'rose',hex:'#C98990',en:'Rose',es:'Rosa'},
  {id:'sea',hex:'#2E8A82',en:'Sea',es:'Mar'}
];

function t163(s,v){return typeof gT==='function'?gT(s,v):(typeof patT==='function'?patT(s,v):s)}
function e163(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function reduced163(){return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}
function pid163(){return typeof curPid==='function'?curPid():''}
function sfxOn163(){return typeof lampSfxOn73==='function'?!!lampSfxOn73():(typeof LAMP_SFX==='undefined'||!!LAMP_SFX)}

/* Shared membership budget for the drag-a-dot mini-map and the connected/dust line (Pi v163 should-fix). */
const ITERS163=2000;
function inMandelbrot163(cr,ci,iters){
  iters=iters==null?ITERS163:iters;
  let zr=0,zi=0,k=0;
  while(k<iters&&zr*zr+zi*zi<=4){
    const nz=zr*zr-zi*zi+cr;zi=2*zr*zi+ci;zr=nz;k++;
  }
  return k>=iters;
}

function escapeCount163(cr,ci,iters){
  iters=iters||4000;
  let zr=0,zi=0,k=0;
  while(k<iters&&zr*zr+zi*zi<=4){
    const nz=zr*zr-zi*zi+cr;zi=2*zr*zi+ci;zr=nz;k++;
  }
  return k;
}

/* Dave Boll 1991: near c = -0.75 + εi, escape count × ε → π. */
function piNeck163(eps,iters){
  const n=escapeCount163(-0.75,eps,iters||200000);
  return {n:n,eps:eps,prod:n*eps,pi:PI};
}

function newtonIter163(x,y,iters){
  iters=iters||40;
  let zr=x,zi=y,k=0;
  for(;k<iters;k++){
    const r2=zr*zr+zi*zi;
    if(r2<1e-16)break;
    /* z - (z^3-1)/(3z^2) = (2z^3+1)/(3z^2) */
    const z2r=zr*zr-zi*zi,z2i=2*zr*zi;
    const z3r=z2r*zr-z2i*zi,z3i=z2r*zi+z2i*zr;
    const nr=2*z3r+1,ni=2*z3i;
    const den=3*r2*r2; /* 3 |z^2|^2 = 3 (z^2 * conj(z^2)) wait: 3z^2 in denom */
    /* 1/(3z^2) = conj(3z^2) / (9 |z^2|^2) = 3 conj(z^2) / (9 |z^2|^2) = conj(z^2)/(3 |z^2|^2) */
    const mag=z2r*z2r+z2i*z2i;
    if(mag<1e-20)break;
    const invr=z2r/(3*mag),invi=-z2i/(3*mag);
    const tr=nr*invr-ni*invi,ti=nr*invi+ni*invr;
    const dr=tr-zr,di=ti-zi;
    zr=tr;zi=ti;
    if(dr*dr+di*di<1e-16)break;
  }
  let best=0,bd=1e9;
  for(let i=0;i<3;i++){
    const d=(zr-ROOTS163[i].re)*(zr-ROOTS163[i].re)+(zi-ROOTS163[i].im)*(zi-ROOTS163[i].im);
    if(d<bd){bd=d;best=i}
  }
  return {root:best,k:k,zr:zr,zi:zi};
}

function hook163(name,wrap){
  const prev=root[name];
  if(typeof prev!=='function'||prev._v163)return prev;
  const next=wrap(prev);
  next._v163=1;
  next._base=prev._base||prev;
  root[name]=next;
  return next;
}

if(typeof document!=='undefined'&&!document.getElementById('v163css')){
  const s=document.createElement('style');
  s.id='v163css';
  s.textContent=[
    '#patterns .pat-tools163{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0}',
    '#patterns .pat-tools163 button{min-height:48px;min-width:48px}',
    '#patterns .pat-tools163 button.on{border-color:var(--acc,#4e6b5c);box-shadow:inset 0 0 0 2px var(--acc,#4e6b5c)}',
    '#patterns .pat-julia163{margin:8px 0}',
    '#patterns .pat-julia163 canvas{display:block;width:100%;max-width:280px;height:auto;margin:0 auto;border-radius:16px;background:#0d0f1a;touch-action:none}',
    '#patterns .pat-dot163{position:absolute;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;border:2px solid #fff6d8;background:#e6b454;box-shadow:0 0 0 2px #3a2a1a;pointer-events:none}',
    '#patterns .pat-mapwrap163{position:relative;max-width:280px;margin:0 auto}',
    '#patterns .pat-line163{min-height:1.4em}',
    '#look .accent163{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}',
    '#look .accent163 button{width:48px;height:48px;min-width:48px;min-height:48px;border-radius:50%;border:3px solid var(--soft,#e4dccb);padding:0}',
    '#look .accent163 button.on{box-shadow:inset 0 0 0 2px var(--ink,#2a2430);border-color:var(--hi,#d9b44a);border-width:5px}',
    '#look .accent163 button.own{background:conic-gradient(#e6b454,#7a9a6a,#c98990,#2e8a82,#e6b454)}',
    '#adults [data-pi163] .pi-art163{display:block;width:120px;height:64px;margin:0 0 .4rem}'
  ].join('');
  (document.documentElement||document.head).appendChild(s);
}

/* ---------- Zoom lullaby (v143 Bedtime Glow bus, soft falling pitch) ---------- */
let lull163=null;
function lullStop163(){
  if(!lull163)return;
  try{
    const c=lull163.c,t=c.currentTime;
    if(lull163.g)lull163.g.gain.setTargetAtTime(0,t,.08);
    if(lull163.o)lull163.o.stop(t+.2);
    if(lull163.o2)lull163.o2.stop(t+.2);
  }catch(e){}
  lull163=null;
}
function lullHz163(zoom){
  const z=Math.max(1,Math.min(1e13,zoom||1));
  const t=Math.log10(z)/13; /* 0 at home, 1 at the cap */
  return 196*Math.pow(65.4/196,t);
}
function lullStart163(){
  if(reduced163()||!sfxOn163())return;
  if(lull163)return;
  try{
    const c=typeof ac==='function'?ac():null;if(!c)return;
    const t=c.currentTime;
    const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();
    const hz=lullHz163(typeof patExZoomOf106==='function'&&PAT106&&PAT106.ex?patExZoomOf106(PAT106.ex.span):1);
    o.type='sine';o2.type='sine';
    o.frequency.setValueAtTime(hz,t);o2.frequency.setValueAtTime(hz*1.003,t);
    lp.type='lowpass';lp.frequency.value=520;lp.Q.value=.6;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+1.6);
    o.connect(g);o2.connect(g);g.connect(lp);lp.connect(c.destination);
    o.start(t);o2.start(t);
    lull163={c:c,o:o,o2:o2,g:g,lp:lp};
  }catch(e){}
}
function lullUpdate163(){
  if(!lull163||!PAT106||!PAT106.ex)return;
  if(!sfxOn163()){lullStop163();return}
  try{
    const hz=lullHz163(patExZoomOf106(PAT106.ex.span));
    const t=lull163.c.currentTime;
    lull163.o.frequency.linearRampToValueAtTime(hz,t+.45);
    lull163.o2.frequency.linearRampToValueAtTime(hz*1.003,t+.45);
  }catch(e){}
}

/* ---------- Explorer tools ---------- */
function mode163(){return (PAT106&&PAT106.ex&&PAT106.ex.mode163)||''}
function setMode163(m){
  if(!PAT106||!PAT106.ex)return;
  const ex=PAT106.ex;
  if(m==='newton'){
    const home=typeof patExKindHome106==='function'?patExKindHome106('newton'):{kind:'newton',cx:0,cy:0,span:3.2};
    Object.assign(ex,home,{limit:false,msg:'',mode163:'newton',lull:ex.lull});
  }else if(m==='juliaDot'){
    Object.assign(ex,{kind:'julia1',cx:0,cy:0,span:3.2,jr:-0.5,ji:0,limit:false,msg:'',mode163:'juliaDot'});
  }else{
    if(ex.kind==='newton'||m===''){
      if(ex.kind==='newton'&&m!=='newton'){
        const home=patExKindHome106('mandel');
        Object.assign(ex,home,{limit:false,msg:''});
      }
    }
    ex.mode163=m||'';
  }
  if(typeof patExDraw106==='function')patExDraw106();
}

function pal163(connected,night){
  if(night){
    return connected
      ?['#0d0f1a','#2a2418','#4e3f2a','#8a7048','#eac77d','#fff6d8']
      :['#0d0f1a','#1a2230','#2a3a4a','#4a6578','#8aa4b0','#d8e6ee'];
  }
  return connected
    ?['#fff8ec','#e8c894','#c45a3a','#b8864a','#6f9a7a','#3a2a1a']
    :['#eef2f6','#c8d4e0','#7a92a8','#5b7ea8','#6f8aa0','#2a3040'];
}

function renderNewton163(cv,rec,opts){
  const o=opts||{},x=cv.getContext('2d'),W=cv.width,H=cv.height;
  const span=rec.span,cx=rec.cx,cy=rec.cy,px=span/Math.max(W,H);
  if(typeof PAT_MIN_PX106==='number'&&px<PAT_MIN_PX106)return false;
  const night=typeof patNight==='function'&&patNight();
  const cols=night
    ?[[58,46,36],[48,64,52],[40,50,68]]
    :[[232,204,164],[186,204,180],[180,198,214]];
  const xmin=cx-span/2,ymin=cy-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
  const img=x.createImageData(W,H),d=img.data,iters=28;
  for(let j=0;j<H;j++){
    const y0=ymin+j*dy;
    for(let i=0;i<W;i++){
      const r=newtonIter163(xmin+i*dx,y0,iters);
      const c=cols[r.root],sh=0.45+0.55*(1-r.k/iters);
      const p=(j*W+i)*4;
      d[p]=c[0]*sh;d[p+1]=c[1]*sh;d[p+2]=c[2]*sh;d[p+3]=255;
    }
  }
  x.putImageData(img,0,0);
  return true;
}

let mapCache163=null;
function mandelMap163(cv,dot){
  const x=cv.getContext('2d'),W=cv.width,H=cv.height;
  const cx=-0.5,span=3.5,xmin=cx-span/2,ymin=0-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
  const night=typeof patNight==='function'&&patNight();
  const pal=night?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
  if(!mapCache163||mapCache163.w!==W||mapCache163.h!==H||mapCache163.night!==night||mapCache163.iters!==ITERS163){
    const img=x.createImageData(W,H),d=img.data,iters=ITERS163;
    for(let j=0;j<H;j++){
      const y0=ymin+j*dy;
      for(let i=0;i<W;i++){
        const x0=xmin+i*dx;
        let zr=0,zi=0,k=0;
        while(k<iters&&zr*zr+zi*zi<=4){const nz=zr*zr-zi*zi+x0;zi=2*zr*zi+y0;zr=nz;k++}
        const n=k/iters,inside=n>=.999;
        const col=(typeof patExColor106==='function')?patExColor106(pal,n,inside):[20,16,28];
        const p=(j*W+i)*4;d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255;
      }
    }
    mapCache163={w:W,h:H,night:night,iters:ITERS163,img:img};
  }
  x.putImageData(mapCache163.img,0,0);
  if(dot){
    const u=(dot.jr-xmin)/span,v=(dot.ji-ymin)/(span*H/W);
    x.save();
    x.beginPath();x.arc(u*W,v*H,Math.max(5,W*0.028),0,PI*2);
    x.fillStyle='#e6b454';x.strokeStyle='#fff6d8';x.lineWidth=2;x.fill();x.stroke();
    x.restore();
  }
}

function drawMarkers163(cv,items,color){
  const ex=PAT106.ex,x=cv.getContext('2d'),W=cv.width,H=cv.height;
  const span=ex.span,cx=ex.cx,cy=ex.cy,xmin=cx-span/2,ymin=cy-span*H/W/2;
  x.save();
  items.forEach(it=>{
    const u=(it.cx-xmin)/span,v=(it.cy-ymin)/(span*H/W);
    if(u<-0.05||u>1.05||v<-0.05||v>1.05)return;
    const r=Math.max(8,Math.min(W,H)*0.035);
    x.beginPath();x.arc(u*W,v*H,r,0,PI*2);
    x.fillStyle=color||'rgba(230,180,84,.55)';
    x.strokeStyle='rgba(255,246,216,.9)';x.lineWidth=1.6;x.fill();x.stroke();
    if(it.label){
      x.fillStyle='#3a2a1a';x.font='700 13px system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(it.label),u*W,v*H);
    }
  });
  x.restore();
}

function markerHit163(cv,clientX,clientY,items){
  if(typeof patExAt106!=='function')return null;
  const p=patExAt106(cv,clientX,clientY),ex=PAT106.ex;
  const span=ex.span,tol=span*0.045;
  let best=null,bd=1e9;
  items.forEach(it=>{
    const d=Math.hypot(p.x-it.cx,p.y-it.cy);
    if(d<tol&&d<bd){bd=d;best=it}
  });
  return best;
}

function breathZoom163(){
  const ex=PAT106.ex;if(!ex)return;
  if(ex.kind==='juliaDot')ex.kind='julia1';
  ex.breath163=1;
  const nxt=ex.span/2.2;
  if(typeof patExCanZoom106==='function'&&!patExCanZoom106(nxt)){
    ex.limit=true;ex.breath163=0;
    const lim=$('patExLimit');if(lim)lim.textContent=t163('This is as deep as we go today.');
    return;
  }
  const start={cx:ex.cx,cy:ex.cy,span:ex.span},end={cx:ex.cx,cy:ex.cy,span:nxt},cv=$('patExCv');
  const go=(k)=>{
    ex.cx=start.cx+(end.cx-start.cx)*k;ex.cy=start.cy+(end.cy-start.cy)*k;ex.span=start.span+(end.span-start.span)*k;
    ex.limit=false;
    if(cv){
      if(k<1&&!reduced163())patExRender106(cv,ex,{preview163:1});
      else patExRender106(cv,ex);
      paintOverlays163(cv);
    }
    const sc=$('patExScale');if(sc&&typeof patExScaleLine106==='function')sc.textContent=patExScaleLine106(patExZoomOf106(ex.span));
    lullUpdate163();
  };
  if(reduced163()){go(1);ex.breath163=0;return}
  const t0=performance.now(),dur=4000;
  const tick=(t)=>{const k=Math.min(1,(t-t0)/dur),e=k*k*(3-2*k);go(e);if(k<1)requestAnimationFrame(tick);else ex.breath163=0};
  requestAnimationFrame(tick);
}

function paintOverlays163(cv){
  if(!cv||!PAT106||!PAT106.ex)return;
  const m=mode163();
  if(m==='baby')drawMarkers163(cv,BABY163.map((b,i)=>({cx:b.cx,cy:b.cy,label:''})));
  if(m==='antenna')drawMarkers163(cv,[3,4,5].map(p=>({cx:BULB163[p].cx,cy:BULB163[p].cy,label:String(BULB163[p].spokes)})));
}

function juliaLine163(jr,ji){
  const ok=inMandelbrot163(jr,ji,ITERS163);
  return ok?t163('Looks like one piece'):t163('Looks like dust');
}

function bindDot163(map,dotEl){
  if(!map||map._dot163)return;map._dot163=1;
  const pick=(ev)=>{
    const r=map.getBoundingClientRect();
    const u=(ev.clientX-r.left)/r.width,v=(ev.clientY-r.top)/r.height;
    const span=3.5,cx=-0.5,cy=0,aspect=map.height/map.width;
    const jr=cx+(u-0.5)*span,ji=cy+(v-0.5)*span*aspect;
    const ex=PAT106.ex;ex.jr=jr;ex.ji=ji;
    mandelMap163(map,{jr:jr,ji:ji});
    const line=$('patJuliaLine163');if(line)line.textContent=juliaLine163(jr,ji);
    const jcv=$('patExCv');
    if(jcv){
      const coarse=ex._drag163?{preview163:1}:null;
      if(typeof patExRender106==='function'){
        if(coarse)renderJuliaPreview163(jcv,ex);
        else patExRender106(jcv,ex);
      }
    }
    lullUpdate163();
  };
  map.addEventListener('pointerdown',e=>{map.setPointerCapture(e.pointerId);PAT106.ex._drag163=1;pick(e)});
  map.addEventListener('pointermove',e=>{if(PAT106.ex&&PAT106.ex._drag163)pick(e)});
  const up=e=>{if(!PAT106.ex||!PAT106.ex._drag163)return;PAT106.ex._drag163=0;pick(e)};
  map.addEventListener('pointerup',up);map.addEventListener('pointercancel',up);
}

function renderJuliaPreview163(cv,ex){
  /* Half-res while the dot is moving, then a full pass on release. */
  const tmp=renderJuliaPreview163._cv||(renderJuliaPreview163._cv=document.createElement('canvas'));
  const W=cv.width,H=cv.height;
  tmp.width=Math.max(120,W>>1);tmp.height=Math.max(120,H>>1);
  if(typeof patExRender106==='function')patExRender106(tmp,ex,{noTurtle:true});
  const x=cv.getContext('2d');
  x.imageSmoothingEnabled=true;x.drawImage(tmp,0,0,W,H);
}

function toolRow163(){
  const m=mode163(),ex=PAT106.ex||{};
  const tools=[
    ['juliaDot',t163('Drag a dot')],
    ['baby',t163('Find the baby')],
    ['antenna',t163('Count the spokes')],
    ['newton',t163('Three wells')]
  ];
  const btns=tools.map(([id,lab])=>`<button type="button" class="${m===id?'on':''}" data-tool163="${id}">${e163(lab)}</button>`).join('');
  const breath=`<button type="button" data-breath163="1">${e163(t163('A slow breath'))}</button>`;
  const lull=`<button type="button" class="${ex.lull?'on':''}" data-lull163="1" aria-pressed="${ex.lull?'true':'false'}">${e163(t163('A quiet tone'))}</button>`;
  return `<div class="pat-tools163" data-tools163="1">${btns}${breath}${lull}</div>`;
}

function extraPanel163(){
  const m=mode163(),ex=PAT106.ex||{};
  if(m==='juliaDot'){
    const line=juliaLine163(ex.jr||0,ex.ji||0);
    return `<div class="pat-julia163"><p class="soft">${e163(t163('A dot on the Mandelbrot set picks a Julia set. Move the dot and the other picture changes.'))}</p>
      <div class="pat-zoombox"><div><p class="kline">${e163(t163('Mandelbrot'))}</p><div class="pat-mapwrap163"><canvas class="pat-cv" id="patMandelDot163" width="220" height="220" aria-label="${e163(t163('A Mandelbrot map with a moving dot'))}"></canvas></div></div>
      <div><p class="kline">${e163(t163('Julia'))}</p></div></div>
      <p class="kline pat-line163" id="patJuliaLine163">${e163(line)}</p></div>`;
  }
  if(m==='baby'){
    return `<p class="soft" id="patHint163">${e163(t163('A little Mandelbrot is hiding near a soft glow. You can zoom there.'))}</p>`;
  }
  if(m==='antenna'){
    return `<p class="soft" id="patHint163">${e163(t163('The spokes on a bulb\'s antenna match its period. You can count 3, 4, or 5.'))}</p>`;
  }
  if(m==='newton'||ex.kind==='newton'){
    return `<p class="soft">${e163(t163('Three wells. Each spot rolls into one. On every border you can still find all three.'))}</p>`;
  }
  return '';
}

function bindTools163(root){
  if(!root||root._tools163)return;root._tools163=1;
  root.addEventListener('click',ev=>{
    const tool=ev.target.closest('[data-tool163]');
    if(tool){
      ev.preventDefault();
      const id=tool.getAttribute('data-tool163');
      const cur=mode163();
      setMode163(cur===id?'':id);
      return;
    }
    if(ev.target.closest('[data-breath163]')){
      ev.preventDefault();breathZoom163();return;
    }
    if(ev.target.closest('[data-lull163]')){
      ev.preventDefault();
      const ex=PAT106.ex;ex.lull=!ex.lull;
      if(ex.lull)lullStart163();else lullStop163();
      const b=ev.target.closest('[data-lull163]');
      b.classList.toggle('on',!!ex.lull);
      b.setAttribute('aria-pressed',ex.lull?'true':'false');
    }
  });
}

function mountExplorer163(){
  const el=$('patterns');if(!el||!$('patExCv'))return;
  if(!el.querySelector('[data-tools163]')){
    const row=el.querySelector('.pat-row');
    const tools=document.createElement('div');
    tools.innerHTML=toolRow163();
    const node=tools.firstChild;
    if(row&&row.parentNode)row.parentNode.insertBefore(node,row);
    else el.querySelector('.card')&&el.querySelector('.card').appendChild(node);
    const panel=document.createElement('div');
    panel.innerHTML=extraPanel163();
    const first=panel.firstChild;
    if(first&&node&&node.parentNode)node.parentNode.insertBefore(first,node.nextSibling);
    else if(first)el.querySelector('.card')&&el.querySelector('.card').appendChild(first);
    bindTools163(el);
  }
  const cv=$('patExCv');
  if(cv)paintOverlays163(cv);
  const map=$('patMandelDot163');
  if(map&&PAT106.ex){
    mandelMap163(map,{jr:PAT106.ex.jr,ji:PAT106.ex.ji});
    bindDot163(map);
    /* Move the main Julia canvas into the right column if the zoom box is present. */
    const box=el.querySelector('.pat-zoombox');
    if(box&&cv.parentNode!==box){
      const right=box.children[1];
      if(right)right.appendChild(cv);
    }
  }
}

/* ---------- Hooks onto the v106 explorer (pixel-identical for old kinds) ---------- */
hook163('patExKindHome106',function(prev){
  return function(kind){
    if(kind==='newton')return {kind:'newton',cx:0,cy:0,span:3.2};
    if(kind==='juliaDot')return {kind:'julia1',cx:0,cy:0,span:3.2,jr:-0.5,ji:0};
    return prev.apply(this,arguments);
  };
});
hook163('patExCaption106',function(prev){
  return function(kind){
    if(kind==='newton')return t163('Three wells. Each spot rolls into one. On every border you can still find all three.');
    return prev.apply(this,arguments);
  };
});
hook163('patExKindOf107',function(prev){
  return function(rec){
    if(rec&&(rec.kind==='newton'||rec.fractal==='newton'))return 'newton';
    return prev.apply(this,arguments);
  };
});
hook163('patExRender106',function(prev){
  return function(cv,rec,opts){
    const o=opts||{};
    const kind=(typeof patExKindOf107==='function')?patExKindOf107(rec):(rec&&rec.kind);
    if(kind==='newton'){
      if(o.preview163){
        const tmp=renderNewton163._prev||(renderNewton163._prev=document.createElement('canvas'));
        tmp.width=Math.max(120,cv.width>>1);tmp.height=Math.max(120,cv.height>>1);
        const ok=renderNewton163(tmp,rec,{noTurtle:true});
        if(!ok)return false;
        const x=cv.getContext('2d');
        x.imageSmoothingEnabled=true;x.drawImage(tmp,0,0,cv.width,cv.height);
        return true;
      }
      return renderNewton163(cv,rec,o);
    }
    if(o.preview163&&kind!=='koch'&&kind!=='sierp'){
      const tmp=patExRender106._prev163||(patExRender106._prev163=document.createElement('canvas'));
      tmp.width=Math.max(120,cv.width>>1);tmp.height=Math.max(120,cv.height>>1);
      const ok=prev.call(this,tmp,rec,{noTurtle:true});
      if(!ok)return false;
      const x=cv.getContext('2d');
      x.imageSmoothingEnabled=true;x.drawImage(tmp,0,0,cv.width,cv.height);
      return true;
    }
    /* Optional warmer/cooler Julia palette only in drag-a-dot mode, via a
       temporary rec flag — default julia1/julia2 pixels stay untouched. */
    if(kind!=='newton'&&PAT106&&PAT106.ex&&PAT106.ex.mode163==='juliaDot'&&(kind==='julia1'||kind==='julia2')&&!o.plain163){
      const night=typeof patNight==='function'&&patNight();
      const ok=inMandelbrot163(rec.jr||0,rec.ji||0,ITERS163);
      const saved=patExColor106;
      const pal=pal163(ok,night);
      /* Reuse the original renderer: paint, then we cannot swap pal inside
         it without wrapping color. Wrap patExColor106 only for this call. */
      let result;
      if(typeof patExColor106==='function'&&!patExColor106._tmp163){
        const colPrev=patExColor106;
        patExColor106=function(p,n,inside){return colPrev(pal,n,false)};
        patExColor106._tmp163=1;
        try{result=prev.call(this,cv,rec,o)}finally{patExColor106=colPrev}
      }else result=prev.call(this,cv,rec,o);
      return result;
    }
    return prev.apply(this,arguments);
  };
});
hook163('patExDraw106',function(prev){
  return function(){
    const r=prev.apply(this,arguments);
    try{mountExplorer163()}catch(e){}
    try{if(PAT106&&PAT106.ex&&PAT106.ex.lull)lullStart163();lullUpdate163()}catch(e){}
    return r;
  };
});
hook163('patExGo106',function(prev){
  return function(nx,ny,span,slow){
    if(PAT106&&PAT106.ex&&PAT106.ex.breath163&&slow){
      /* breathZoom163 handles its own animation. */
    }
    const r=prev.apply(this,arguments);
    try{lullUpdate163();const cv=$('patExCv');if(cv)paintOverlays163(cv)}catch(e){}
    return r;
  };
});
hook163('patExTap106',function(prev){
  return function(cv,ev){
    const m=mode163();
    if(m==='baby'||m==='antenna'){
      const items=m==='baby'?BABY163:[3,4,5].map(p=>BULB163[p]);
      const hit=markerHit163(cv,ev.clientX,ev.clientY,items);
      if(hit){
        const target=m==='baby'?hit:hit;
        const span=target.span||0.5;
        if(m==='antenna'){
          const msg=t163('This antenna has {n} spokes.',{n:String(target.spokes)});
          PAT106.ex.msg=msg;
          const h=$('patHint163');if(h)h.textContent=msg;
        }else{
          PAT106.ex.msg=t163('You found a little Mandelbrot.');
          const h=$('patHint163');if(h)h.textContent=PAT106.ex.msg;
        }
        if(typeof patExGo106==='function')patExGo106(target.cx,target.cy,span,true);
        return;
      }
    }
    return prev.apply(this,arguments);
  };
});
hook163('patExSetKind106',function(prev){
  return function(kind){
    if(PAT106&&PAT106.ex)PAT106.ex.mode163='';
    if(kind==='newton'){setMode163('newton');return}
    return prev.apply(this,arguments);
  };
});

/* When kinds are listed, add Three wells as a kind button after Sierpinski
   only if we also want it in the kind row — tools already expose it. Leave
   the original five kind buttons unchanged. */

const prevAfter163=typeof afterShow95==='function'?afterShow95:null;
if(prevAfter163&&!prevAfter163._v163){
  afterShow95=function(id){
    const r=prevAfter163.apply(this,arguments);
    try{
      if(id!=='patterns')lullStop163();
      if(id==='adults')attachPi163();
      if(id==='look')attachAccent163();
    }catch(e){}
    return r;
  };
  afterShow95._v163=1;
}

/* ---------- Pi nerd card (Grown-ups, EN/ES) ---------- */
function attachPi163(){
  const root=typeof $==='function'?$('adults'):document.getElementById('adults');
  if(!root||root.querySelector('[data-pi163]'))return;
  if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
  const art='<svg class="pi-art163" viewBox="0 0 120 64" width="120" height="64" aria-hidden="true" focusable="false"><rect x="1" y="1" width="118" height="62" rx="10" fill="#fff8ec" stroke="#72583f" stroke-width="1.4"/><path d="M14 32 Q34 18 50 32 Q62 44 72 32 Q86 16 106 30" fill="none" stroke="#4e6b5c" stroke-width="2"/><circle cx="50" cy="32" r="4.5" fill="#e6b454" stroke="#3a2a1a" stroke-width="1.1"/><text x="86" y="50" font-size="16" font-family="Georgia,serif" fill="#3a2a1a">π</text></svg>';
  const html=`<div class="card" data-pi163="1"><h3 class="kline">${e163(t163('A hidden π'))}</h3>${art}<p>${e163(t163('Near the neck of the Mandelbrot set, at c = −0.75 + εi, the number of steps until the point escapes, times ε, gets closer and closer to π. Dave Boll noticed this in 1991.'))}</p></div>`;
  root.insertAdjacentHTML('beforeend',html);
}
const prevAdults163=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
if(typeof prevAdults163==='function'&&!prevAdults163._v163){
  renderAdults=function(){
    const r=prevAdults163.apply(this,arguments);
    try{attachPi163()}catch(e){}
    return r;
  };
  renderAdults._v163=1;
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
}

/* ---------- Companion accent colors (looks picker, device only) ---------- */
function accentKey163(pid){return 'lamp_accent163@'+(pid||pid163()||'device')}
function accentLoad163(pid){
  try{
    const raw=(typeof RAW!=='undefined'&&RAW.get)?RAW.get(accentKey163(pid)):localStorage.getItem(accentKey163(pid));
    const o=raw?(typeof safeJSON==='function'?safeJSON(raw,{}):JSON.parse(raw)):{};
    return (o&&typeof o==='object')?o:{};
  }catch(e){return {}}
}
function accentSave163(kind,id,pid){
  const all=accentLoad163(pid);
  if(!id||id==='own')delete all[kind];else all[kind]=id;
  const s=JSON.stringify(all);
  try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(accentKey163(pid),s);else localStorage.setItem(accentKey163(pid),s)}catch(e){}
}
function accentHex163(kind,pid){
  const id=accentLoad163(pid)[kind];
  const pal=PALETTE163.find(p=>p.id===id);
  return pal?pal.hex:null;
}
function friendKind163(){
  try{
    if(typeof previewKind147==='function')return previewKind147(pid163());
    if(typeof friendActive101==='function')return friendActive101(pid163())||'lamp';
  }catch(e){}
  return 'lamp';
}
function isDragonEgg163(kind,stage){
  return kind==='dragon'&&(!stage||stage==='hatchling'||stage==='egg');
}
function applyAccentSVG163(kind,html,stage){
  if(!html||isDragonEgg163(kind,stage))return html;
  const hex=accentHex163(kind);
  /* Strip a previous overlay so redraws stay a single accent. */
  html=String(html).replace(/<g class="il-accent163"[^>]*>[\s\S]*?<\/g>/g,'');
  if(!hex)return html;
  const glow=`<g class="il-accent163" data-accent163="1" pointer-events="none"><ellipse cx="100" cy="128" rx="62" ry="70" fill="${hex}" opacity=".26"/></g>`;
  if(/<svg[\s\S]*?>/i.test(html))return html.replace(/(<svg[^>]*>)/i,'$1'+glow);
  return glow+html;
}
function hookArt163(){
  if(typeof IL119==='object'&&typeof IL119.art==='function'&&!IL119.art._v163){
    const prev=IL119.art;
    IL119.art=function(kind,stage,opt){
      const html=prev.apply(this,arguments);
      try{return applyAccentSVG163(kind,html,stage)}catch(e){return html}
    };
    IL119.art._v163=1;
    IL119.art._base=prev._base||prev;
  }
  if(typeof friendArtInner101==='function'&&!friendArtInner101._v163acc){
    const prevF=friendArtInner101;
    friendArtInner101=function(id,stage){
      const html=prevF.apply(this,arguments);
      try{return applyAccentSVG163(id,html,stage)}catch(e){return html}
    };
    friendArtInner101._v163acc=1;
  }
}
function attachAccent163(){
  hookArt163();
  const root=typeof $==='function'?$('look'):document.getElementById('look');
  if(!root)return;
  let card=root.querySelector('[data-accent163-card]');
  const kind=friendKind163();
  const cur=accentLoad163()[kind]||'own';
  const chips=[{id:'own',hex:null,en:t163('Their own'),es:t163('Their own')}].concat(PALETTE163).map(p=>{
    const on=cur===p.id;
    const label=e163(p.id==='own'?t163('Their own'):t163(p.en));
    const bg=p.id==='own'?'':`style="background:${p.hex}"`;
    return `<button type="button" class="${p.id==='own'?'own':''}${on?' on':''}" data-accent163="${p.id}" aria-pressed="${on?'true':'false'}" aria-label="${label}" ${bg}></button>`;
  }).join('');
  const inner=`<h3 class="kline">${e163(t163('A small color'))}</h3><p class="soft">${e163(t163('Your friend keeps their own color. You can pick a small glow, saved on this device.'))}</p><div class="accent163">${chips}</div>`;
  if(!card){
    card=document.createElement('div');
    card.className='card';
    card.dataset.accent163Card='1';
    const looks=root.querySelector('[data-look147-card],[data-look147]');
    if(looks&&looks.parentNode){
      const host=looks.closest('.card')||looks;
      host.after(card);
    }else root.appendChild(card);
  }
  card.innerHTML=inner;
  if(!card._acc163){
    card._acc163=1;
    card.addEventListener('click',ev=>{
      const b=ev.target.closest('[data-accent163]');if(!b)return;
      ev.preventDefault();
      const id=b.getAttribute('data-accent163');
      accentSave163(friendKind163(),id);
      attachAccent163();
      try{if(typeof refreshAfterLook147==='function')refreshAfterLook147();
      else if(typeof artRefresh63==='function')artRefresh63(document);
      if(typeof lampMountAll73==='function')lampMountAll73()}catch(e){}
    });
  }
}
hookArt163();
if(typeof pWrap68==='function'){
  try{pWrap68('renderLook',null,function(){try{attachAccent163()}catch(e){}})}catch(e){}
}else if(typeof renderLook==='function'&&!renderLook._v163){
  const prevL=renderLook;
  renderLook=function(){const r=prevL.apply(this,arguments);try{attachAccent163()}catch(e){}return r};
  renderLook._v163=1;
  if(typeof RENDER==='object')RENDER.look=renderLook;
}

root.IL163={
  version:163,
  iters:ITERS163,
  inMandelbrot:inMandelbrot163,
  escapeCount:escapeCount163,
  piNeck:piNeck163,
  newton:newtonIter163,
  roots:ROOTS163,
  bulbs:BULB163,
  babies:BABY163,
  palette:PALETTE163,
  accentLoad:accentLoad163,
  accentSave:accentSave163,
  accentHex:accentHex163,
  applyAccent:applyAccentSVG163,
  isDragonEgg:isDragonEgg163,
  setMode:setMode163,
  mode:mode163,
  juliaLine:juliaLine163,
  breath:breathZoom163,
  lullStart:lullStart163,
  lullStop:lullStop163,
  lullHz:lullHz163
};
})(typeof window!=='undefined'?window:this);
/* v164: Arabic translation-notice rewrite; drag-a-dot hedge
   ("Looks like one piece" / "Looks like dust") and one shared membership
   budget for the mini-map and the line (see v163.js ITERS163). show() is
   not wrapped. Newton colours, voice files, and recorded clips are
   unchanged. */
(function(root){
'use strict';
root.IL164={version:164,iters:(root.IL163&&root.IL163.iters)||2000};
})(typeof window!=='undefined'?window:this);
