// SPDX-License-Identifier: GPL-3.0-or-later
/* Singing brush upgrade (draft for the next vNNN, currently v127).
   Color voices, mirror chords, stroke speed, night/bedtime. Same 🎵 button
   and i18n. Replaces paintSing; wraps paintSeg (so v101 chalk/spray/etc. and
   v16 neon/flow still sing) and paintStamp. No show() wrap, no network, no
   mic, no files. Missing AudioContext is a no-op. Peaks stay under v46. */
(function(root){
'use strict';

var TH=170, BASE=.058, CAP=.07, NG=.62, NR=1.55, GL=.88, GR=1.35;
var PF=[0,2,4,7,9], lastP=null, lastT=0, fired=0, quiet=false, vol=1, nbuf=null;
var RECIPES={
 bell:{att:.018,rel:.75,parts:[{r:1,g:1,d:1},{r:2.003,g:.38,d:.5},{r:2.995,g:.16,d:.32},{r:4.07,g:.09,d:.18},{r:5.04,g:.05,d:.12}]},
 hum:{att:.08,rel:1.45,parts:[{r:1,g:.9,d:1},{r:1.003,g:.7,d:1},{r:.5,g:.1,d:1.1},{r:2,g:.12,d:.7}]},
 marimba:{att:.014,rel:.58,parts:[{r:1,g:1,d:1},{r:2,g:.22,d:.28},{r:4,g:.08,d:.16}],noise:{g:.032,att:.01,dec:.07,hz:1800,q:.9,kind:'bandpass'}},
 flute:{att:.07,rel:1.15,parts:[{r:1,g:1,d:1},{r:2,g:.08,d:.65},{r:3,g:.03,d:.4}],noise:{g:.038,att:.08,dec:1.05,hz:0,q:3.2,kind:'bandpass',follow:2}},
 chime:{att:.016,rel:1.55,parts:[{r:1,g:.85,d:1},{r:2.003,g:.28,d:.7},{r:2.758,g:.3,d:.85},{r:5.404,g:.12,d:.45}]},
 kalimba:{att:.012,rel:.7,parts:[{r:1,g:1,d:1},{r:2.005,g:.28,d:.3},{r:6.7,g:.05,d:.1}]},
 water:{att:.03,rel:.85,parts:[{r:1,g:1,d:1},{r:2,g:.12,d:.4}],glide:.97,noise:{g:.028,att:.015,dec:.1,hz:2200,q:.8,kind:'lowpass'}},
 harp:{att:.02,rel:1.05,parts:[{r:1,g:1,d:1},{r:3,g:.14,d:.35},{r:5,g:.06,d:.2}]},
 air:{att:.08,rel:1.2,parts:[{r:2,g:.7,d:1},{r:3.003,g:.18,d:.6},{r:1,g:.25,d:1.1}],noise:{g:.042,att:.1,dec:1.1,hz:1400,q:.6,kind:'lowpass'}},
 low:{att:.028,rel:.65,parts:[{r:1,g:1,d:1},{r:.5,g:.28,d:1.05},{r:2,g:.08,d:.35}],noise:{g:.022,att:.02,dec:.1,hz:600,q:.8,kind:'lowpass'}}
};

function penta(){return (typeof PENTA!=='undefined'&&PENTA&&PENTA.length)?PENTA:PF}
function mtofSB(m){return (typeof mtof==='function')?mtof(m):440*Math.pow(2,(m-69)/12)}
function acSB(){
  try{
    if(typeof ac==='function'){var c=ac();if(c)return c}
    if(typeof AC!=='undefined'&&AC){if(AC.state==='suspended')try{AC.resume()}catch(e){}return AC}
    var C=root.AudioContext||root.webkitAudioContext;if(!C)return null;
    var n=new C();root.AC=n;return n;
  }catch(e){return null}
}
function busSB(c){
  if(!c)return null;
  try{if(typeof labBus==='function'){var b=labBus(c);if(b&&b.in)return b}}catch(e){}
  if(c._sbBus){
    var bed=isBed()? .5:1;
    try{c._sbBus.out.gain.value=.42*bed}catch(e){}
    return c._sbBus;
  }
  try{
    var i=c.createGain(),lp=c.createBiquadFilter(),cp=c.createDynamicsCompressor(),o=c.createGain();
    lp.type='lowpass';lp.frequency.value=2600;lp.Q.value=.5;
    cp.threshold.value=-20;cp.knee.value=6;cp.ratio.value=20;cp.attack.value=.002;cp.release.value=.15;
    o.gain.value=.42*(isBed()?.5:1);
    i.connect(lp).connect(cp).connect(o).connect(c.destination);
    return c._sbBus={in:i,out:o};
  }catch(e){return null}
}
function isBed(){try{return !!(root.document&&document.body&&document.body.classList.contains('bedtime'))}catch(e){return false}}
function isNight(){try{if(typeof PT==='object'&&PT&&PT.dark)return true}catch(e){}return isBed()}
function isMirror(){try{var s=typeof PT==='object'&&PT?PT.sym:1;return s>=2||s<0}catch(e){return false}}
function muted(){
  if(quiet||vol<=0)return true;
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return true;
    if(typeof root.LAMP_SFX!=='undefined'&&root.LAMP_SFX===false)return true;
  }catch(e){}
  return false;
}
function rgbHsl(r,g,b){
  r/=255;g/=255;b/=255;
  var x=Math.max(r,g,b),n=Math.min(r,g,b),l=(x+n)/2,s,h=0,d=x-n;
  if(x===n)s=0;
  else{
    s=l>.5?d/(2-x-n):d/(x+n);
    if(x===r)h=(g-b)/d+(g<b?6:0);
    else if(x===g)h=(b-r)/d+2;
    else h=(r-g)/d+4;
    h*=60;
  }
  return {h:h,s:s,l:l};
}
function parseCol(col){
  if(col==null)return {h:210,s:.8,l:.5};
  var s=String(col).trim(),m;
  m=s.match(/^#([0-9a-f]{3})$/i);
  if(m){s=m[1];return rgbHsl(parseInt(s[0]+s[0],16),parseInt(s[1]+s[1],16),parseInt(s[2]+s[2],16))}
  m=s.match(/^#([0-9a-f]{6})$/i);
  if(m){s=m[1];return rgbHsl(parseInt(s.slice(0,2),16),parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16))}
  m=s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if(m)return rgbHsl(+m[1],+m[2],+m[3]);
  m=s.match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i);
  if(m)return {h:+m[1],s:+m[2]/100,l:+m[3]/100};
  return {h:210,s:.8,l:.5};
}
function voiceFromHsl(h,s,l){
  if(l<.12)return 'low';
  if(s<.12)return l<.35?'low':'air';
  h=((h%360)+360)%360;
  if(h<20||h>=345)return 'marimba';
  if(h<45)return 'kalimba';
  if(h<75)return 'hum';
  if(h<150)return 'flute';
  if(h<195)return 'water';
  if(h<255)return 'bell';
  if(h<305)return 'chime';
  return 'harp';
}
function voiceFor(tool,col,hue){
  if(tool==='eraser')return 'swish';
  if(tool==='rainbow'){var u=hue;if(u==null&&typeof PT==='object'&&PT)u=PT.hue||0;return voiceFromHsl(u,0.9,0.5)}
  var c=parseCol(col!=null?col:(typeof PT==='object'&&PT?PT.col:null));
  return voiceFromHsl(c.h,c.s,c.l);
}
function midiIdx(p,h,night){
  var yN=1-Math.min(1,Math.max(0,(p&&p[1]||0)/Math.max(1,h||600)));
  var i=Math.round(yN*9),P=penta();
  var m=60+12*Math.floor(i/5)+P[i%5]+(night?-12:0);
  return {midi:m,idx:i};
}
function chordMidi(idx,night){
  var P=penta(),out=[],k;
  for(k=0;k<2;k++){var i=idx+2*(k+1);out.push(60+12*Math.floor(i/5)+P[i%5]+(night?-12:0))}
  return out;
}
function speedOf(p,prev,now){
  var q=prev||lastP,t0=lastT;
  if(!q||!t0)return .45;
  var dt=(now-t0)/1000;
  if(dt<=0||dt>.45)return .45;
  var cv=cvEl(),h=(cv&&cv.height)||600;
  var v=Math.hypot(p[0]-q[0],p[1]-q[1])/(dt*h);
  var s=(v-.12)/(2-.12);
  return Math.max(0,Math.min(1,s));
}
function cvEl(){try{if(typeof $==='function'){var e=$('pcv');if(e)return e}return (root.document&&document.getElementById('pcv'))||null}catch(e){return null}}
function env(g,t,att,dec,peak){
  att=Math.max(.012,att||.02);dec=Math.max(.08,dec||.4);
  peak=Math.max(.0002,peak);
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(peak,t+att);
  g.gain.exponentialRampToValueAtTime(.0001,t+att+dec);
}
function noiseSrc(c){
  if(nbuf&&nbuf.sampleRate===c.sampleRate)return nbuf;
  var n=Math.max(64,Math.floor(c.sampleRate*.4)),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0),v=0,i=0;
  for(;i<n;i++){v=.97*v+(Math.random()*2-1)*.3;d[i]=v}
  return nbuf=b;
}
function addNoise(c,dest,t,opt,f,peak,rel){
  if(!opt||!peak)return;
  var src=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();
  src.buffer=noiseSrc(c);src.loop=true;
  fl.type=opt.kind||'lowpass';
  fl.frequency.value=(opt.follow?f*opt.follow:(opt.hz||1400));
  fl.Q.value=opt.q||.8;
  var dec=opt.dec||rel,att=opt.att||.02;
  env(g,t,att,dec,peak*opt.g);
  src.connect(fl);fl.connect(g);g.connect(dest);
  src.start(t);src.stop(t+att+dec+.06);
}
function playNote(c,dest,opt){
  var voice=opt.voice||'bell',rec=RECIPES[voice],t=opt.when,f=opt.freq,spd=Math.max(0,Math.min(1,+opt.speed||.45));
  var night=!!opt.night,glow=!!opt.glow,amp=Math.min(1,.48+.52*spd)*(night?NG:1)*(glow?GL:1)*Math.max(0,Math.min(1,vol));
  if(voice==='swish'){
    var sw=c.createBiquadFilter(),sg=c.createGain(),ss=c.createBufferSource();
    ss.buffer=noiseSrc(c);ss.loop=true;
    sw.type='bandpass';sw.frequency.value=1400+(spd*600);sw.Q.value=.8;
    env(sg,t,.03,.12,Math.min(CAP,.028*amp*(night?.7:1)));
    ss.connect(sw);sw.connect(sg);sg.connect(dest);
    ss.start(t);ss.stop(t+.22);
    return;
  }
  if(!rec)rec=RECIPES.bell;
  var rel=rec.rel*(night?NR:1)*(glow?GR:1);
  var cut=Math.min(3000,(night?1200:1400)+spd*(night?800:1500));
  var sum=rec.parts.reduce(function(a,p){return a+p.g},0)||1;
  var peak=Math.min(CAP,BASE*amp)/sum;
  var lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=cut;lp.Q.value=.7;
  var mix=c.createGain();mix.gain.value=1;mix.connect(lp);lp.connect(dest);
  var det=(opt.detune!=null?opt.detune:(Math.random()*10-5));
  var f0=f*Math.pow(2,det/1200);
  rec.parts.forEach(function(p){
    var o=c.createOscillator(),g=c.createGain(),ff=f0*p.r,pd=rel*(p.d||1);
    o.type='sine';o.frequency.setValueAtTime(ff,t);
    if(rec.glide&&rec.glide>0){try{o.frequency.exponentialRampToValueAtTime(Math.max(20,ff*rec.glide),t+.3)}catch(e){}}
    env(g,t,rec.att,pd,peak*p.g);
    o.connect(g);g.connect(mix);
    o.start(t);o.stop(t+rec.att+pd+.08);
  });
  if(rec.noise)addNoise(c,mix,t,rec.noise,f0,Math.min(CAP,BASE*amp),rel);
}

function hear(p,prev,opts){
  opts=opts||{};
  var now=(typeof performance!=='undefined'?performance.now():Date.now());
  var spd=opts.speed!=null?opts.speed:speedOf(p,prev,now);
  lastP=p;lastT=now;
  if(!opts.force){
    if(typeof PT==='object'&&PT&&!PT.sing)return false;
    if(now-fired<TH)return false;
    if(muted())return false;
  }else if(muted()&&!opts.ignoreMute)return false;
  var c=opts.ctx||acSB();if(!c)return false;
  var b=busSB(c);if(!b||!b.in)return false;
  fired=now;
  var cv=cvEl(),h=opts.height||((cv&&cv.height)||600);
  var night=opts.night!=null?!!opts.night:isNight();
  var tool=opts.tool!=null?opts.tool:(typeof PT==='object'&&PT&&PT.tool)||'brush';
  var col=opts.col!=null?opts.col:(typeof PT==='object'&&PT?PT.col:null);
  var hue=opts.hue!=null?opts.hue:(typeof PT==='object'&&PT?PT.hue:0);
  var voice=opts.voice||voiceFor(tool,col,hue);
  var mi=midiIdx(p,h,night);
  var t=(opts.when!=null?opts.when:c.currentTime+.01);
  playNote(c,b.in,{voice:voice,freq:mtofSB(mi.midi),when:t,speed:spd,night:night,glow:tool==='glow'||!!opts.glow,detune:opts.detune});
  if((opts.chord!=null?opts.chord:isMirror())&&voice!=='swish'){
    chordMidi(mi.idx,night).forEach(function(m,i){
      var g=.36-i*.08,f=mtofSB(m)*Math.pow(2,((opts.detune||0)+(i+1)*1.2)/1200);
      playChordTone(c,b.in,f,t,g*Math.min(CAP,BASE*Math.min(1,.48+.52*spd)*(night?NG:1)*Math.max(0,Math.min(1,vol))),night,spd);
    });
  }
  return true;
}
function playChordTone(c,dest,f,t,peak,night,spd){
  var o=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();
  var rel=.9*(night?NR:1),cut=Math.min(2800,(night?1100:1300)+spd*1200);
  o.type='sine';o.frequency.value=f;
  lp.type='lowpass';lp.frequency.value=cut;lp.Q.value=.6;
  env(g,t,.03,rel,Math.max(.0002,peak));
  o.connect(g);g.connect(lp);lp.connect(dest);
  o.start(t);o.stop(t+.03+rel+.08);
}

function sbPaintSing(p,prev){
  try{if(!p)return;hear(p,prev)}catch(e){}
}

function hook(){
  root.paintSing=sbPaintSing;
  try{paintSing=sbPaintSing}catch(e){}
  var ps=root.paintSeg;
  if(typeof ps==='function'&&!ps._sb127){
    var w=function(a,b){var r=ps.apply(this,arguments);try{sbPaintSing(b,a)}catch(e){}return r};
    w._sb127=1;root.paintSeg=w;
    try{if(typeof paintSeg!=='undefined')paintSeg=w}catch(e){}
  }
  var pst=root.paintStamp;
  if(typeof pst==='function'&&!pst._sb127){
    var w2=function(p){var r=pst.apply(this,arguments);try{sbPaintSing(p,p)}catch(e){}return r};
    w2._sb127=1;root.paintStamp=w2;
    try{if(typeof paintStamp!=='undefined')paintStamp=w2}catch(e){}
  }
}
hook();

var api={
  paintSing:sbPaintSing,hear:hear,voiceFor:voiceFor,voiceFromHsl:voiceFromHsl,parseCol:parseCol,
  midiIdx:midiIdx,chordMidi:chordMidi,playNote:playNote,RECIPES:RECIPES,
  setQuiet:function(on){quiet=!!on;return quiet},isQuiet:function(){return quiet||muted()},
  setVolume:function(v){if(v==null||isNaN(+v))return vol;vol=Math.max(0,Math.min(1,+v));return vol},
  getVolume:function(){return vol},muted:muted,isNight:isNight,isMirror:isMirror,
  TH:TH,BASE:BASE,CAP:CAP,PENTA:PF,mtof:mtofSB
};
root.SingingBrush=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:this);
