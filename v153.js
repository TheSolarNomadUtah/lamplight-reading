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
