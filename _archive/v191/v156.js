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
