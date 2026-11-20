/* Lamplight U5 prototype: "Sound Draws Shapes" bedtime fade (Studio, 2026-11-15).
   Two soft tones, one per ear, in a simple ratio (default 2:3). The picture is
   drawn from the same numbers: x follows the left tone, y the right tone.
   A tiny mistune makes the loop turn slowly (one turn every 6 s). After a few
   quiet turns, both ears fade together with e^(-d t) (Professor Pi's
   harmonograph spec, d = 0.043), so the loop spirals in to a still dot and
   silence. About 95 s. Gold on night ink, no flashes, no colour changes.
   Generated tones only: no mic, no files, no fetch. Does not wrap show().
   Reduced motion: the loop does not turn; it only fades.

   window.WindDownShapes = { attach, detach, isOn, render, PAIRS, version }
   attach({host, ratio:'2:3', sound:true, reduced, onDone, onStop, ctx}) */
(function(root){
'use strict';
var PAIRS={'1:1':[1,1,Math.PI/2],'1:2':[1,2,0],'2:3':[2,3,0]}; /* Pi's kid picks */
var BASE=110, TURN=6, D=.043, HOLD=20, TAIL=75, IN=2, PEAK=.07;
var INK='#120E18', GOLD='#E6B454', TIP='#FFE4A4';
var S=null, gen=0;

function ctxOf(o){
  if(o&&o.ctx)return o.ctx;
  try{if(typeof root.ac==='function'){var c=root.ac();if(c)return c}}catch(e){}
  try{if(root.AC)return root.AC}catch(e){}
  return null;
}
function soundOn(){
  try{if(typeof root.lampSfxOn73==='function')return !!root.lampSfxOn73()}catch(e){}
  return root.LAMP_SFX!==false;
}
function reducedPref(){
  try{if(document.documentElement.classList.contains('reduce73'))return true}catch(e){}
  try{return root.matchMedia&&root.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}
}
function visible(el){
  if(!el)return true;
  if(!el.isConnected)return false;
  if(el.closest&&el.closest('.hidden'))return false;
  return !(el.getClientRects&&el.getClientRects().length===0);
}
/* Envelope shared by sound and picture (0..1). */
function env(t){
  if(t<0)return 0;
  if(t<IN)return t/IN;
  if(t<HOLD)return 1;
  var u=t-HOLD, e=Math.exp(-D*u);           /* 1 -> ~0.04 at 75 s */
  if(u>TAIL)return Math.max(0,e*(1-(u-TAIL)/3));
  return e;
}
function total(){return HOLD+TAIL+3}

function sound(c,p,t0,dest){
  var a=p[0],b=p[1],fx=BASE*a,fy=BASE*b+1/TURN;
  var ox=c.createOscillator(),oy=c.createOscillator(),gx=c.createGain(),gy=c.createGain(),
      m=c.createGain(),mg=c.createChannelMerger(2),lp=c.createBiquadFilter();
  ox.type=oy.type='sine';
  ox.frequency.value=fx;oy.frequency.value=fy;
  /* Y starts with the ratio's phase offset, via a tiny delay. */
  var dy=c.createDelay(1);dy.delayTime.value=p[2]?(p[2]/(2*Math.PI))/fy:0;
  lp.type='lowpass';lp.frequency.value=900;lp.Q.value=.5;
  gx.gain.value=gy.gain.value=1;
  /* Same envelope on both ears, so the loop spirals in without squashing. */
  m.gain.setValueAtTime(0,t0);
  var steps=64,T=total();
  for(var k=1;k<=steps;k++){var tt=T*k/steps;m.gain.linearRampToValueAtTime(PEAK*env(tt),t0+tt)}
  ox.connect(gx);oy.connect(dy);dy.connect(gy);
  gx.connect(mg,0,0);gy.connect(mg,0,1);
  mg.connect(lp);lp.connect(m);m.connect(dest||c.destination);
  ox.start(t0);oy.start(t0);ox.stop(t0+T+.1);oy.stop(t0+T+.1);
  return {ox:ox,oy:oy,m:m,nodes:[ox,oy,gx,gy,dy,mg,lp,m]};
}

function draw(cv,p,t,reduced){
  var g=cv.getContext('2d'),W=cv.width,H=cv.height,R=Math.min(W,H)*.38,e=env(t);
  g.fillStyle=INK;g.fillRect(0,0,W,H);
  if(e<=.002)return;
  var a=p[0],b=p[1],ph=p[2]+(reduced?0:2*Math.PI*t/TURN),N=720;
  /* The drawn loop is a slowed-down copy of the two tones: same ratio,
     same phase turn, same envelope. */
  g.lineJoin='round';g.lineCap='round';
  [[GOLD,Math.max(2,R*.05),.10*e+.04],[GOLD,Math.max(1.5,R*.016),.55*e+.15],[TIP,Math.max(1,R*.006),.6*e+.1]].forEach(function(L){
    g.strokeStyle=L[0];g.lineWidth=L[1];g.globalAlpha=Math.min(1,L[2]);g.beginPath();
    for(var i=0;i<=N;i++){
      var s=2*Math.PI*i/N,x=W/2+R*e*Math.sin(a*s),y=H/2-R*e*Math.sin(b*s+ph);
      i?g.lineTo(x,y):g.moveTo(x,y);
    }
    g.stroke();
  });
  g.globalAlpha=1;
}

function onVis(){if(document.hidden)detach('hidden')}
function onHide(){detach('pagehide')}

function attach(o){
  o=o||{};
  if(S)return true;
  var p=PAIRS[o.ratio]||PAIRS['2:3'];
  var reduced=o.reduced==null?reducedPref():!!o.reduced;
  var host=o.host||null,cv=o.canvas||null;
  if(!cv&&host&&typeof document!=='undefined'){
    cv=document.createElement('canvas');
    cv.width=cv.height=480;
    cv.setAttribute('role','img');
    cv.setAttribute('aria-label',o.ariaLabel||'Two soft tones draw a slowly turning loop that gets smaller and fades.');
    cv.style.cssText='display:block;width:min(86vw,420px);aspect-ratio:1;margin:0 auto;border-radius:16px;background:'+INK;
    host.appendChild(cv);cv._wds=1;
  }
  var my=++gen,c=null,snd=null;
  if(o.sound!==false&&soundOn()){c=ctxOf(o);if(c)try{snd=sound(c,p,c.currentTime+.05,o.dest)}catch(e){snd=null}}
  var t0=(typeof performance!=='undefined'?performance.now():Date.now());
  S={gen:my,p:p,cv:cv,c:c,snd:snd,host:host,onDone:o.onDone||null,onStop:o.onStop||null,raf:0,timer:0,last:0};
  function frame(now){
    if(!S||S.gen!==my)return;
    var t=(now-t0)/1000;
    if(cv&&now-S.last>=33){S.last=now;draw(cv,p,t,reduced)}  /* ~30 fps is plenty */
    if(t>=total()){var d=S.onDone;detach('done');try{d&&d()}catch(e){}return}
    S.raf=root.requestAnimationFrame?requestAnimationFrame(frame):setTimeout(function(){frame(Date.now())},33);
  }
  if(typeof document!=='undefined'){
    document.addEventListener('visibilitychange',onVis);
    root.addEventListener&&root.addEventListener('pagehide',onHide);
    S.timer=setInterval(function(){
      if(!S||S.gen!==my)return;
      if(S.snd&&!soundOn())return detach('muted');  /* Soft sounds off mid-play stops it (as U6/U15) */
      var ok=true;try{ok=o.isActive?!!o.isActive():visible(host)}catch(e){ok=false}
      if(!ok)detach('left');
    },400);
  }
  frame(t0);
  return true;
}

function detach(reason){
  if(!S)return false;
  var s=S;S=null;gen++;
  try{root.cancelAnimationFrame?cancelAnimationFrame(s.raf):clearTimeout(s.raf)}catch(e){}
  try{clearInterval(s.timer)}catch(e){}
  try{document.removeEventListener('visibilitychange',onVis);root.removeEventListener('pagehide',onHide)}catch(e){}
  if(s.snd&&s.c){
    try{
      var t=s.c.currentTime;
      s.snd.m.gain.cancelScheduledValues(t);
      s.snd.m.gain.setValueAtTime(s.snd.m.gain.value,t);
      s.snd.m.gain.setTargetAtTime(0,t,reason==='hidden'||reason==='pagehide'?.02:.15);
      s.snd.ox.stop(t+.9);s.snd.oy.stop(t+.9);
    }catch(e){}
    setTimeout(function(){s.snd.nodes.forEach(function(n){try{n.disconnect()}catch(e){}})},950);
  }
  if(s.cv&&s.cv._wds&&s.cv.parentNode)s.cv.parentNode.removeChild(s.cv);
  try{if(reason!=='done'&&s.onStop)s.onStop(reason||'off')}catch(e){}
  return true;
}

/* Offline helper for previews and QA: schedules the full piece into ctx. */
function render(ctx,ratio,dest){return sound(ctx,PAIRS[ratio]||PAIRS['2:3'],0,dest)}

root.WindDownShapes={attach:attach,detach:detach,isOn:function(){return !!S},render:render,
  env:env,total:total,draw:draw,PAIRS:PAIRS,PARAM:{BASE:BASE,TURN:TURN,D:D,HOLD:HOLD,TAIL:TAIL},version:'u5-1115'};
})(typeof window!=='undefined'?window:globalThis);
