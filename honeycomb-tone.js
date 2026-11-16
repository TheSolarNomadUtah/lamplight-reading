/* Lamplight U6: Honeycomb soothing tone (Studio drop-in, 2026-11-15).
   A calm, generative WebAudio drone that grows with the Honeycomb. Each new
   ring fades in one soft partial of a low C (harmonic series 1:2:3:4:5:6,
   then 8:10:12: pure just C-major chord tones C C G C E G C E G; Pi checked
   Nov 15). From ring 9 on it keeps going: the
   oldest voice fades out as the newest fades in, so the "infinite" honeycomb
   never piles up sound (max 6 voices, 12 oscillators).
   Code only: no audio files, no mic, no fetch. Does not wrap show().
   Copy rule: call it calm or soothing. Never "healing" or anything medical.

   F1 lessons built in (the v163 "A quiet tone" bug):
   - one owner handle; attach() twice never stacks a second graph
   - detach() is idempotent, silences now, then stops AND disconnects nodes
   - stops by itself on: tab hidden (visibilitychange), pagehide, leaving the
     screen (isActive() false or host hidden/removed), Soft sounds off
   - onStop(reason) lets the toggle button flip back to off, so UI == audio
   - a generation counter stops a late timer from an old graph restarting it

   window.HoneyTone = { attach, detach, isOn, setRings, setCells, grow,
                        setVolume, label, version, PARTIALS }            */
(function(root){
'use strict';
var ROOT_HZ=130.81;                    /* C3 */
var PARTIALS=[1,2,3,4,5,6,8,10,12];    /* C3 C4 G4 C5 E5 G5 C6 E6 G6: just C major */
var MAXV=6, MASTER=.038, LP_HZ=1100, FADE_IN=3.2, FADE_OUT=4.5;
var S=null, gen=0, vol=1;
var COPY={
  en:{btn:'A soothing tone',note:'A soft, calm hum that grows with your honeycomb.'},
  es:{btn:'Un tono tranquilo',note:'Un sonido suave y tranquilo que crece con tu panal.'},
  ar:{btn:'نغمة هادئة',note:'صوت ناعم وهادئ يكبر مع خلية النحل.'}
};

function ctxOf(o){
  if(o&&o.ctx)return o.ctx;
  try{if(typeof root.ac==='function'){var c=root.ac();if(c)return c}}catch(e){}
  try{if(root.AC){if(root.AC.state==='suspended')root.AC.resume();return root.AC}}catch(e){}
  return null;
}
function soundOn(){
  try{if(typeof root.lampSfxOn73==='function')return !!root.lampSfxOn73()}catch(e){}
  return root.LAMP_SFX!==false;
}
function visible(el){
  if(!el)return true;
  if(!el.isConnected)return false;
  if(el.closest&&el.closest('.hidden'))return false;
  return !(el.getClientRects&&el.getClientRects().length===0);
}
function ringsFromCells(n){ /* 1,7,19,37,61: cells = 3r(r+1)+1 */
  n=Math.max(1,n|0);var r=0;while(3*(r+1)*(r+2)+1<=n)r++;return r;
}

function voice(c,bus,i,t){
  var h=PARTIALS[i%PARTIALS.length], lap=Math.floor(i/PARTIALS.length);
  var f=ROOT_HZ*h*(lap%2?1.0015:1); /* later laps sit a hair apart: slow shimmer, no beating fast */
  var o=c.createOscillator(), g=c.createGain(), lfo=c.createOscillator(), lg=c.createGain(), amp=c.createGain();
  o.type='sine';o.frequency.value=f;
  var a=.55/Math.sqrt(h);
  amp.gain.value=a;
  lfo.type='sine';lfo.frequency.value=.035+.013*(i%5);  /* 7 to 30 s swells */
  lg.gain.value=a*.35;
  lfo.connect(lg);lg.connect(amp.gain);
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(1,t+FADE_IN);
  o.connect(amp);amp.connect(g);g.connect(bus);
  o.start(t);lfo.start(t);
  return {o:o,lfo:lfo,g:g,amp:amp,lg:lg,i:i};
}
function killVoice(c,v,t,fade){
  try{
    v.g.gain.cancelScheduledValues(t);
    v.g.gain.setValueAtTime(v.g.gain.value,t);
    v.g.gain.linearRampToValueAtTime(0,t+fade);
    v.o.stop(t+fade+.05);v.lfo.stop(t+fade+.05);
    v.o.onended=function(){try{v.o.disconnect();v.lfo.disconnect();v.lg.disconnect();v.amp.disconnect();v.g.disconnect()}catch(e){}};
  }catch(e){}
}

function sync(){
  if(!S)return;
  var c=S.c,t=c.currentTime,want=S.rings+1;     /* ring 0 = centre cell = root */
  var lo=Math.max(0,want-MAXV);
  S.voices=S.voices.filter(function(v){
    if(v.i<lo||v.i>=want){killVoice(c,v,t,FADE_OUT);return false}
    return true;
  });
  for(var i=lo;i<want;i++){
    if(!S.voices.some(function(v){return v.i===i}))S.voices.push(voice(c,S.bus,i,t+.02));
  }
}

function onVis(){if(document.hidden)detach('hidden')}
function onHide(){detach('pagehide')}

function attach(o){
  o=o||{};
  if(S){ /* already on: refresh options only, never a second graph */
    if(o.rings!=null)setRings(o.rings);else if(o.cells!=null)setCells(o.cells);
    if(o.onStop)S.onStop=o.onStop;
    return true;
  }
  if(o.sound===false||!soundOn())return false;
  var c=ctxOf(o);if(!c)return false;
  var my=++gen;
  try{
    var t=c.currentTime;
    var bus=c.createGain(),lp=c.createBiquadFilter(),m=c.createGain();
    lp.type='lowpass';lp.frequency.value=LP_HZ;lp.Q.value=.5;
    bus.gain.value=1;
    m.gain.setValueAtTime(0,t);
    m.gain.linearRampToValueAtTime(MASTER*vol,t+2.5);
    bus.connect(lp);lp.connect(m);m.connect(o.dest||c.destination);
    S={c:c,bus:bus,lp:lp,m:m,voices:[],rings:0,gen:my,host:o.host||null,
       isActive:o.isActive||null,onStop:o.onStop||null,live:!o.ctx||!!o.watch,timer:0};
    S.rings=o.rings!=null?Math.max(0,o.rings|0):(o.cells!=null?ringsFromCells(o.cells):0);
    sync();
    if(S.live&&typeof document!=='undefined'){
      document.addEventListener('visibilitychange',onVis);
      root.addEventListener&&root.addEventListener('pagehide',onHide);
      S.timer=setInterval(function(){
        if(!S||S.gen!==my)return;
        if(!soundOn())return detach('muted');
        var ok=true;
        try{ok=S.isActive?!!S.isActive():visible(S.host)}catch(e){ok=false}
        if(!ok)detach('left');
      },400);
    }
    return true;
  }catch(e){S=null;return false}
}

function detach(reason){
  if(!S)return false;
  var s=S;S=null;gen++;
  try{clearInterval(s.timer)}catch(e){}
  try{document.removeEventListener('visibilitychange',onVis)}catch(e){}
  try{root.removeEventListener&&root.removeEventListener('pagehide',onHide)}catch(e){}
  try{
    var t=s.c.currentTime;
    s.m.gain.cancelScheduledValues(t);
    s.m.gain.setValueAtTime(s.m.gain.value,t);
    s.m.gain.setTargetAtTime(0,t,reason==='hidden'||reason==='pagehide'?.02:.12);
    s.voices.forEach(function(v){try{v.o.stop(t+.7);v.lfo.stop(t+.7)}catch(e){}});
  }catch(e){}
  /* Belt and braces: pull the bus off the speakers even if the context is
     suspended and the stop() times never arrive. */
  setTimeout(function(){try{s.m.disconnect();s.lp.disconnect();s.bus.disconnect()}catch(e){}},750);
  try{if(s.onStop)s.onStop(reason||'off')}catch(e){}
  return true;
}

function setRings(n){
  if(!S)return;n=Math.max(0,n|0);
  if(n===S.rings)return;S.rings=n;sync();
}
function setCells(n){setRings(ringsFromCells(n))}
function grow(){if(S)setRings(S.rings+1)}
function setVolume(v){
  vol=Math.max(0,Math.min(1,+v||0));
  if(S)try{S.m.gain.setTargetAtTime(MASTER*vol,S.c.currentTime,.3)}catch(e){}
  return vol;
}
function label(lang,key){var L=COPY[lang]||COPY.en;return L[key||'btn']}

root.HoneyTone={attach:attach,detach:detach,isOn:function(){return !!S},
  setRings:setRings,setCells:setCells,grow:grow,setVolume:setVolume,
  rings:function(){return S?S.rings:0},ringsFromCells:ringsFromCells,
  label:label,COPY:COPY,PARTIALS:PARTIALS,ROOT_HZ:ROOT_HZ,version:'u6-1115'};
})(typeof window!=='undefined'?window:globalThis);
