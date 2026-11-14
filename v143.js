/* v143: one master sound bus + limiter. Singing Brush, Lamp Breathing, toy
   sounds and UI blips already talk to the shared AudioContext destination;
   this tightens that destination so stacked sources stay ≥ 6 dB under full
   scale (the Bedtime Glow ceiling). Soft sounds Off still only mutes toys
   and chimes, never story or game voices. show() is not wrapped. */
(function(root){
'use strict';
var CEIL=-6; /* dBFS: 6 dB under full scale, same cap as the Sound Cards bus */
var PEAK=Math.pow(10,CEIL/20);
var prevBus=typeof busInstall==='function'?busInstall:null;

function isOffline(c){
  try{
    if(typeof OfflineAudioContext!=='undefined'&&c instanceof OfflineAudioContext)return true;
    if(typeof webkitOfflineAudioContext!=='undefined'&&c instanceof webkitOfflineAudioContext)return true;
  }catch(e){}
  return false;
}

function ceiling(c){
  var sh=c.createWaveShaper(),n=2048,curve=new Float32Array(n),k=1.15,den=Math.tanh(k);
  for(var i=0;i<n;i++){
    var x=i/(n-1)*2-1,y=Math.tanh(x*k)/den;
    curve[i]=Math.max(-PEAK,Math.min(PEAK,y*PEAK));
  }
  sh.curve=curve;
  try{sh.oversample='2x'}catch(e){}
  return sh;
}

function attachCeil(c,lim,real){
  var sh=ceiling(c);
  try{lim.disconnect()}catch(e){}
  lim.connect(sh).connect(real);
  return sh;
}

function install(c){
  if(!c||isOffline(c))return c;
  if(c._bus143&&c._bus143.ceil)return c;
  try{if(prevBus)prevBus(c)}catch(e){}
  if(c._bus&&c._bus.lim&&c._bus.real){
    try{
      c._bus.lim.threshold.value=CEIL;
      c._bus.lim.ratio.value=20;
      c._bus.lim.knee.value=0;
      c._bus.lim.attack.value=.002;
      c._bus.lim.release.value=.08;
    }catch(e){}
    if(!c._bus.ceil){
      try{c._bus.ceil=attachCeil(c,c._bus.lim,c._bus.real)}catch(e){}
    }
    c._bus143=c._bus;
    return c;
  }
  try{
    var real=c.destination,g=c.createGain(),cp=c.createDynamicsCompressor(),lim=c.createDynamicsCompressor();
    g.gain.value=.8;
    cp.threshold.value=-18;cp.ratio.value=3;cp.knee.value=6;cp.attack.value=.01;cp.release.value=.2;
    lim.threshold.value=CEIL;lim.ratio.value=20;lim.knee.value=0;lim.attack.value=.002;lim.release.value=.08;
    var sh=ceiling(c);
    g.connect(cp).connect(lim).connect(sh).connect(real);
    Object.defineProperty(c,'destination',{value:g,configurable:true});
    c._bus={g:g,cp:cp,lim:lim,ceil:sh,real:real};
    c._bus143=c._bus;
  }catch(e){}
  return c;
}

root.busInstall=install;
if(typeof AC!=='undefined'&&AC)install(AC);
var prevAc=typeof ac==='function'?ac:null;
root.ac=function(){
  var c=prevAc?prevAc():null;
  if(!c){
    try{
      var C=root.AudioContext||root.webkitAudioContext;
      if(!C)return null;
      c=new C();
      root.AC=c;
    }catch(e){return null}
  }
  if(c&&c.state==='suspended')try{c.resume()}catch(e){}
  return install(c);
};

/* Catch fallbacks that construct their own context (Singing Brush, Lamp Breathing). */
var Native=root.AudioContext||root.webkitAudioContext;
if(Native&&!Native._v143){
  function AudioContext143(opts){
    var c=opts!==undefined?new Native(opts):new Native();
    return install(c);
  }
  AudioContext143.prototype=Native.prototype;
  try{Object.setPrototypeOf(AudioContext143,Native)}catch(e){}
  AudioContext143._v143=Native;
  root.AudioContext=AudioContext143;
  if(root.webkitAudioContext)root.webkitAudioContext=AudioContext143;
}

root.IL143={version:143,ceilingDb:CEIL,install:install};
})(window);
