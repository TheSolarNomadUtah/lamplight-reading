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
