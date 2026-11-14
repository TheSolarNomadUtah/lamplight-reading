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
  return (st&&st.stage)||3;
}
function lookTileSvg147(look,kind,stage){
  var inner='';
  try{
    if(typeof IL119==='object'&&typeof IL119.art==='function') inner=IL119.art(kind,stage,{look:look})||'';
  }catch(e){inner=''}
  return '<svg class="lamp73-svg" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="lamp73-ink">'+inner+'</g></svg>';
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
    lookSave147(b.getAttribute('data-il-look147'),pid||pid147());
    refreshAfterLook147();
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
