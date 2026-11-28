/*v192 persist + license files 5→2; visible credits unchanged*/
(function(){
'use strict';

function persistQuiet192(){
  try{
    var s=navigator.storage;
    if(!s || typeof s.persist!=='function') return;
    var p=s.persist();
    if(p && typeof p.then==='function'){
      p.then(function(){}, function(){});
    }
  }catch(e){}
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', persistQuiet192);
}else{
  persistQuiet192();
}
window.addEventListener('load', persistQuiet192);

function mapLicenseHref192(h){
  if(!h) return h;
  var p=String(h).split('?')[0].split('#')[0];
  if(p==='LICENSE.txt') return 'LICENSE';
  if(p==='LICENSE-CONTENT.txt' || p==='LICENSES.md') return 'LICENSE-CONTENT';
  return h;
}
function fixLicenseHtml192(html){
  if(!html || typeof html!=='string') return html;
  return html
    .replace(/href="LICENSE\.txt"/g,'href="LICENSE"')
    .replace(/href="LICENSE-CONTENT\.txt"/g,'href="LICENSE-CONTENT"')
    .replace(/href="LICENSES\.md"/g,'href="LICENSE-CONTENT"');
}
function fixLicenseLinks192(root){
  try{
    var host=root && root.querySelectorAll ? root : document;
    var list=host.querySelectorAll('[data-licenses122] a');
    for(var i=0;i<list.length;i++){
      var a=list[i];
      var next=mapLicenseHref192(a.getAttribute('href')||'');
      if(next && next!==a.getAttribute('href')) a.setAttribute('href', next);
    }
  }catch(e){}
}

function wrapFun192(obj, key, wrap){
  try{
    var prev=obj && obj[key];
    if(typeof prev!=='function' || prev._v192) return prev;
    var fn=function(){ return wrap(prev, this, arguments); };
    fn._v192=1;
    obj[key]=fn;
    return fn;
  }catch(e){ return obj && obj[key]; }
}

function hookLicense192(){
  try{
    if(typeof licensesHTML122==='function' && !licensesHTML122._v192){
      var prevH=licensesHTML122;
      licensesHTML122=function(){ return fixLicenseHtml192(prevH.apply(this, arguments)); };
      licensesHTML122._v192=1;
    }
  }catch(e){}
  try{
    if(typeof licensesTxtHref123==='function' && !licensesTxtHref123._v192){
      var prevT=licensesTxtHref123;
      licensesTxtHref123=function(html){ return fixLicenseHtml192(prevT.apply(this, arguments)); };
      licensesTxtHref123._v192=1;
    }
  }catch(e){}
  try{
    if(typeof licensesTxtLinks123==='function' && !licensesTxtLinks123._v192){
      var prevL=licensesTxtLinks123;
      licensesTxtLinks123=function(root){
        var r=prevL.apply(this, arguments);
        fixLicenseLinks192(root);
        return r;
      };
      licensesTxtLinks123._v192=1;
    }
  }catch(e){}
  try{
    if(typeof IL122==='object' && typeof IL122.html==='function' && !IL122.html._v192){
      var prevI=IL122.html;
      IL122.html=function(){ return fixLicenseHtml192(prevI.apply(this, arguments)); };
      IL122.html._v192=1;
    }
  }catch(e){}
  function afterAdults(prev, th, args){
    var r=prev.apply(th, args);
    try{ fixLicenseLinks192(typeof $==='function'?$('adults'):document.getElementById('adults')); }catch(e){}
    return r;
  }
  try{
    if(typeof renderAdults==='function'){
      wrapFun192(window,'renderAdults', afterAdults);
    }
  }catch(e){}
  try{
    if(typeof RENDER==='object' && typeof RENDER.adults==='function'){
      wrapFun192(RENDER,'adults', afterAdults);
    }
  }catch(e){}
}

hookLicense192();
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', hookLicense192);
}
window.addEventListener('load', function(){
  hookLicense192();
  fixLicenseLinks192(document);
});
})();
/* v192: session Paint bitmap (Home/back + rotate); Grow chrome only on Grow */
(function(){
'use strict';
function $(id){try{return document.getElementById(id)}catch(e){return null}}

/* ---- 1. Paint: keep a full-resolution session copy; never shrink it ---- */
var master=null, busy=0, hooksOn=0;

function paperFill(){
  try{return (typeof PT==='object'&&PT.dark)?'#0d0f1a':'#fffdf8'}catch(e){return '#fffdf8'}
}
function mostlyPaper(cv){
  if(!cv||!cv.width) return true;
  try{
    var x=cv.getContext('2d'), w=cv.width, h=cv.height;
    var n=Math.min(w*h, 12000), step=Math.max(1, Math.floor((w*h)/n));
    var d=x.getImageData(0,0,w,h).data, ink=0, i, p, night, day;
    for(i=0;i<d.length;i+=4*step){
      if(d[i+3]<20) continue;
      night=Math.abs(d[i]-13)+Math.abs(d[i+1]-15)+Math.abs(d[i+2]-26);
      day=Math.abs(d[i]-255)+Math.abs(d[i+1]-253)+Math.abs(d[i+2]-248);
      if(night>18&&day>18) ink++;
    }
    return ink<8;
  }catch(e){return false}
}
function copyToMaster(cv){
  if(!cv||!cv.width||!cv.height) return;
  try{
    if(!master) master=document.createElement('canvas');
    if(master.width!==cv.width||master.height!==cv.height){
      master.width=cv.width; master.height=cv.height;
    }
    master.getContext('2d').drawImage(cv,0,0);
  }catch(e){}
}
function snapshot192(){
  var cv=$('pcv');
  if(!cv||!cv.width) return;
  if(mostlyPaper(cv) && master) return;
  if(master && (cv.width<master.width || cv.height<master.height)) return;
  copyToMaster(cv);
}
function displaySize192(){
  var a=$('pstudio'); if(!a) return null;
  var o=a.getBoundingClientRect(); if(!o.width||!o.height) return null;
  var dpr=Math.min(window.devicePixelRatio||1,1.5);
  try{if(typeof PT==='object'&&PT.dpr) dpr=PT.dpr}catch(e){}
  if(Math.min(innerWidth,innerHeight)<=400 && innerHeight<=700) dpr=Math.min(dpr,1);
  return {w:Math.max(1,Math.round(o.width*dpr)), h:Math.max(1,Math.round(o.height*dpr)), dpr:dpr};
}
function restore192(){
  var cv=$('pcv'), g=$('pgd'), f=$('pfx'), sz, x;
  if(!cv) return;
  sz=displaySize192(); if(!sz) return;
  try{
    if(cv.width!==sz.w||cv.height!==sz.h){
      cv.width=sz.w; cv.height=sz.h;
      if(g){g.width=sz.w;g.height=sz.h}
      if(f){f.width=sz.w;f.height=sz.h}
    }
    try{if(typeof PT==='object') PT.dpr=sz.dpr}catch(e){}
    x=cv.getContext('2d');
    if(typeof paintBg==='function') paintBg(x);
    else{x.fillStyle=paperFill();x.fillRect(0,0,sz.w,sz.h)}
    if(master&&master.width){
      x.drawImage(master,0,0,sz.w,sz.h);
    }
    try{if(typeof guides==='function') guides()}catch(e){}
  }catch(e){}
}
function aroundRebuild(prev, th, args){
  if(busy) return prev.apply(th, args);
  busy=1;
  try{
    snapshot192();
    var r=prev.apply(th, args);
    restore192();
    return r;
  }finally{busy=0}
}
function onClear(prev, th, args){
  var r=prev.apply(th, args);
  try{
    /* intentional clear or night/day paper: drop the session copy */
    var noAsk=args&&args[0];
    if(noAsk || !master){ master=null; snapshot192(); }
  }catch(e){}
  return r;
}
function refit192(){
  var cv=$('pcv');
  /* Snapshot only at 1:1. Never promote a scaled-up blit into the master
     (a 320→1280→320 pass would otherwise thicken the ink). */
  if(cv&&cv.width&&!mostlyPaper(cv)){
    if(!master || (cv.width===master.width && cv.height===master.height)) copyToMaster(cv);
  }
  try{
    var t=$('pstudio'), n=t&&t.querySelector('.pbar');
    if(t) t.style.setProperty('--pbar0h', Math.ceil(n&&n.getBoundingClientRect().height||58)+'px');
  }catch(e){}
  restore192();
}
function hookPaint192(){
  if(hooksOn) return;
  try{if(typeof renderPaint==='function') wrap('renderPaint', aroundRebuild)}catch(e){}
  try{if(typeof paintSetup==='function') wrap('paintSetup', aroundRebuild)}catch(e){}
  try{if(typeof paintClear==='function') wrap('paintClear', onClear)}catch(e){}
  try{
    if(typeof paintSeg==='function' && !paintSeg._v192snap){
      var ps=paintSeg;
      paintSeg=function(){var r=ps.apply(this,arguments);try{if($('pcv')&&!(master&&($('pcv').width<master.width||$('pcv').height<master.height)))copyToMaster($('pcv'))}catch(e){}return r};
      paintSeg._v192snap=1;
    }
  }catch(e){}
  try{
    window.paintBackingFit185=function(snap){
      if(snap&&snap.width&&!(master&&(snap.width<master.width||snap.height<master.height))){
        if(!mostlyPaper(snap)) copyToMaster(snap);
      }
      restore192();
    };
    window.paintRefit185=refit192;
  }catch(e){}
  try{
    if(typeof renderPaintBar==='function' && !renderPaintBar._v192p){
      var prev=renderPaintBar;
      renderPaintBar=function(){
        var a=$('paint');
        if(a&&!a.classList.contains('hidden')){ refit192(); return; }
        return prev.apply(this,arguments);
      };
      renderPaintBar._v192p=1;
    }
  }catch(e){}
  try{
    if(typeof afterShow95==='function'){
      wrap('afterShow95', function(prev,th,args){
        var id=args&&args[0], r=prev.apply(th,args);
        try{ if(id==='paint') restore192(); }catch(e){}
        return r;
      });
    }
  }catch(e){}
  hooksOn=1;
}
function wrap(key, fn){
  var prev=window[key];
  if(typeof prev!=='function' || prev._v192p) return prev;
  var w=function(){ return fn(prev, this, arguments); };
  w._v192p=1;
  window[key]=w;
  return w;
}
function onPointerUp192(){
  try{
    var cv=$('pcv'), a=$('paint');
    if(!cv||!a||a.classList.contains('hidden')) return;
    if(mostlyPaper(cv)) return;
    if(master && (cv.width<master.width || cv.height<master.height)) return;
    copyToMaster(cv);
  }catch(e){}
}

hookPaint192();
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', hookPaint192);
window.addEventListener('load', hookPaint192);
window.addEventListener('resize', function(){
  try{
    var a=$('paint');
    if(!a||a.classList.contains('hidden')||!$('pstudio')) return;
    refit192();
  }catch(e){}
});
try{
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize', function(){
      try{
        var a=$('paint');
        if(!a||a.classList.contains('hidden')||!$('pstudio')) return;
        refit192();
      }catch(e){}
    });
  }
}catch(e){}
document.addEventListener('pointerup', onPointerUp192, true);
document.addEventListener('pointercancel', onPointerUp192, true);
try{ window.IL192 = Object.assign(window.IL192||{}, {version:192, paintRefit:refit192, paintSnapshot:snapshot192, paintRestore:restore192}); }catch(e){}

/* ---- 2. Grow controls stay on Grow; never append Breathe to other Pattern units ---- */
function stripGrowChrome192(el){
  if(!el) el=$('patterns');
  if(!el) return;
  var list=el.querySelectorAll('[data-gaf3ctrl],[data-gaf3hold],[data-gaf3more],[data-gaf3friends],[data-gaf3jar]');
  for(var i=0;i<list.length;i++){
    try{ list[i].remove(); }catch(e){}
  }
}
function onGrow(){
  try{
    var cv=$('patGrowCv');
    var unit=(typeof PAT106==='object'&&PAT106.unit)||'';
    return !!(cv && unit==='grow');
  }catch(e){return false}
}
function hookGrow192(){
  try{
    if(typeof extraUI==='function' && !extraUI._v192){
      var prev=extraUI;
      extraUI=function(){
        if(!onGrow()){ try{stripGrowChrome192()}catch(e){} return; }
        return prev.apply(this, arguments);
      };
      extraUI._v192=1;
    }
  }catch(e){}
  try{
    if(typeof patOpen106==='function' && !patOpen106._v192){
      var po=patOpen106;
      patOpen106=function(unit){
        var r=po.apply(this, arguments);
        try{ if(unit!=='grow') stripGrowChrome192(); }catch(e){}
        return r;
      };
      patOpen106._v192=1;
    }
  }catch(e){}
  try{
    if(typeof afterShow95==='function' && !afterShow95._v192g){
      var as=afterShow95;
      afterShow95=function(id){
        var r=as.apply(this, arguments);
        try{ if(id==='patterns' && !onGrow()) stripGrowChrome192(); }catch(e){}
        return r;
      };
      afterShow95._v192g=1;
    }
  }catch(e){}
}
hookGrow192();
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', hookGrow192);
window.addEventListener('load', hookGrow192);
})();
