// SPDX-License-Identifier: GPL-3.0-or-later
/* Lamp Breathing upgrade — drop-in replacement for v129-breathing.js.
   Same public API, --lb-k / --lb-dim, and i18n keys as the live v129 module.
   start() with no args is still a normal (about 2 min) session.
   Upgrades (Ignacio, 13 Nov 2026, 3:52 PM MT: "Yes lets try the upgrades"):
     1. The hum steps through a low C D E G A pentatonic, gliding softly,
        and settles back down in the final fade-to-night cycles.
     2. A very quiet sine 'ting' at the top of each in-breath, which goes
        quieter and drops out in the last cycles.
     3. start({length:'short'|'normal'|'long'}) for about 1 / 2 / 3 min.
        duration still wins if passed (so today's v129.js duration:120 is safe).
   Drive the existing lamp with paint:false and --lb-k / --lb-dim; do not
   repaint it. Not added to Bedtime Glow. Inert until start(). No mic,
   no network, no files. Keep PARAM in sync with render_previews.py. */
(function(root){
'use strict';

var IN0=4, OUT0=6, SLOW=.2, FADE_CYCLES=3, FADE_IN=2.8, STOP_FADE=1.2;
var DUR=120, F0=55, F_LIFT=.016, G_SWELL=.3, MASTER=.028, LP_LO=380, LP_HI=540, LP_Q=.7;
var PARTS=[[1,1],[1.5,.32],[2,.2],[3,.07],[4,.035]];
var LENGTHS={short:60,normal:120,long:180};
var LADDER=[36,38,40,43,45,48]; /* C2 D2 E2 G2 A2 C3 — gentle low register */
var CHIME_G=.003, CHIME_ATT=.05, CHIME_REL=1.08, CHIME_OCT=24;
var GLOW_TROUGH=.26, GLOW_AMP=.12, GLOW_SCALE=.04, SPILL_TROUGH=.16, SPILL_AMP=.08;
var REDUCE_GLOW=.32, REDUCE_SPILL=.2;

var STR={
 en:{
  'Lamp Breathing':'Lamp Breathing',
  'breathe in…':'breathe in…',
  'breathe out…':'breathe out…',
  'Good night':'Good night',
  'Done':'Done',
  'Hide words':'Hide words',
  'Show words':'Show words',
  'Tap the lamp or Done to stop.':'Tap the lamp or Done to stop.',
  'A slow wind-down. The lamp breathes with you, then the light goes to night.':'A slow wind-down. The lamp breathes with you, then the light goes to night.',
  'How long?':'How long?',
  'About 1 minute':'About 1 minute',
  'About 2 minutes':'About 2 minutes',
  'About 3 minutes':'About 3 minutes'
 },
 es:{
  'Lamp Breathing':'Respira con la lámpara',
  'breathe in…':'inhala…',
  'breathe out…':'exhala…',
  'Good night':'Buenas noches',
  'Done':'Listo',
  'Hide words':'Ocultar palabras',
  'Show words':'Mostrar palabras',
  'Tap the lamp or Done to stop.':'Toca la lámpara o Listo para terminar.',
  'A slow wind-down. The lamp breathes with you, then the light goes to night.':'Un cierre lento. La lámpara respira contigo, y luego la luz se va a la noche.',
  'How long?':'¿Cuánto tiempo?',
  'About 1 minute':'Cerca de 1 minuto',
  'About 2 minutes':'Cerca de 2 minutos',
  'About 3 minutes':'Cerca de 3 minutos'
 },
 ar:{
  'Lamp Breathing':'تنفّس مع المصباح',
  'breathe in…':'شهيق…',
  'breathe out…':'زفير…',
  'Good night':'تصبح على خير',
  'Done':'تم',
  'Hide words':'إخفاء الكلمات',
  'Show words':'إظهار الكلمات',
  'Tap the lamp or Done to stop.':'المس المصباح أو «تم» للتوقف.',
  'A slow wind-down. The lamp breathes with you, then the light goes to night.':'ختام هادئ. المصباح يتنفّس معك، ثم يهدأ الضوء إلى الليل.',
  'How long?':'كم المدة؟',
  'About 1 minute':'حوالي دقيقة',
  'About 2 minutes':'حوالي دقيقتين',
  'About 3 minutes':'حوالي 3 دقائق'
 }
};

var st=null; /* running session or null */
var quiet=false, vol=1, cssOn=false;

function langOf(opt){
  if(opt&&opt.lang)return String(opt.lang).slice(0,2);
  try{if(typeof LANG==='string'&&LANG)return LANG.slice(0,2)}catch(e){}
  try{var l=(root.document&&document.documentElement&&document.documentElement.lang)||'en';return String(l).slice(0,2)}catch(e){return 'en'}
}
function t128(s,opt){
  try{
    if(typeof gT==='function'){
      var r=gT(s);
      if(r&&r!==s)return r;
    }
  }catch(e){}
  var lg=langOf(opt||(st&&st.opt)||{});
  var d=STR[lg]||STR.en;
  return (d&&d[s])||(STR.en[s])||s;
}
function isReduced(explicit){
  if(explicit===true||explicit===false)return explicit;
  try{if(typeof lampReduced73==='function')return !!lampReduced73()}catch(e){}
  try{return !!(root.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}
}
function isSoundOn(){
  if(quiet)return false;
  try{if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return false}catch(e){}
  try{if(typeof root.LAMP_SFX!=='undefined'&&root.LAMP_SFX===false)return false}catch(e){}
  return true;
}
function ac128(){
  try{
    if(typeof ac==='function'){var c=ac();if(c)return c}
    if(typeof AC!=='undefined'&&AC){if(AC.state==='suspended')try{AC.resume()}catch(e){}return AC}
    var C=root.AudioContext||root.webkitAudioContext;if(!C)return null;
    var n=new C();root.AC=n;return n;
  }catch(e){return null}
}

/* ---- timeline (shared with the Python renderer) ---- */
function resolveDuration(opt){
  opt=opt||{};
  if(opt.duration>0)return opt.duration;
  var L=String(opt.length||'').toLowerCase();
  if(LENGTHS[L])return LENGTHS[L];
  return LENGTHS.normal;
}
function mtofLB(m){
  try{if(typeof mtof==='function')return mtof(m)}catch(e){}
  return 440*Math.pow(2,(m-69)/12);
}
function ladderIndex(i){
  var n=LADDER.length, period=(n-1)*2, x=((i%period)+period)%period;
  return x<n?x:period-x;
}
function assignNotes(cycles,fadeStart){
  var fadeI=cycles.length,i,j,prev,idx;
  for(i=0;i<cycles.length;i++){
    if(cycles[i].t0>=fadeStart-1e-9){fadeI=i;break}
  }
  for(i=0;i<cycles.length;i++){
    if(i<fadeI)idx=ladderIndex(i);
    else{
      prev=i>0?cycles[i-1].midi:LADDER[0];
      idx=0;
      for(j=0;j<LADDER.length;j++){if(LADDER[j]<prev)idx=j}
      if(prev<=LADDER[0])idx=0;
    }
    cycles[i].midi=LADDER[idx];
    cycles[i].i=i;
    cycles[i].fade=i>=fadeI;
  }
  for(i=0;i<cycles.length;i++)cycles[i].prevMidi=i>0?cycles[i-1].midi:cycles[i].midi;
  return fadeI;
}
function makeTimeline(duration){
  var cycles=[], t=0, i, p, s, inn, out;
  duration=duration>0?duration:DUR;
  for(i=0;i<64;i++){
    p=duration>0?Math.min(1,t/duration):0;
    s=1+SLOW*p;
    inn=IN0*s; out=OUT0*s;
    cycles.push({t0:t,inn:inn,out:out,mid:t+inn,t1:t+inn+out});
    t=t+inn+out;
    if(t>=duration)break;
  }
  var n=Math.min(FADE_CYCLES,cycles.length);
  var fadeStart=cycles[Math.max(0,cycles.length-n)].t0;
  var fadeI=assignNotes(cycles,fadeStart);
  return {cycles:cycles,fadeStart:fadeStart,fadeI:fadeI,end:cycles[cycles.length-1].t1,duration:duration};
}
function ease01(x){x=x<0?0:x>1?1:x;return .5-.5*Math.cos(Math.PI*x)}
function stateAt(tl,t){
  var rest=mtofLB(LADDER[0]);
  if(t>=tl.end)return {k:0,phase:'out',dim:0,cue:'',done:true,t:t,midi:LADDER[0],hz:rest,i:-1,fade:true};
  var dim=1;
  if(t>=tl.fadeStart){
    var fd=tl.end-tl.fadeStart;
    dim=1-ease01(fd>0?(t-tl.fadeStart)/fd:1);
  }
  var cy=null,i;
  for(i=0;i<tl.cycles.length;i++){if(t<tl.cycles[i].t1){cy=tl.cycles[i];break}}
  if(!cy)return {k:0,phase:'out',dim:0,cue:'',done:true,t:t,midi:LADDER[0],hz:rest,i:-1,fade:true};
  var k,phase,midi;
  if(t<cy.mid){
    phase='in';k=ease01((t-cy.t0)/cy.inn);
    midi=cy.prevMidi+(cy.midi-cy.prevMidi)*k;
  }else{
    phase='out';k=1-ease01((t-cy.mid)/cy.out);
    midi=cy.midi;
  }
  var hz=mtofLB(midi)*(1+F_LIFT*k);
  return {k:k,phase:phase,dim:dim,cue:phase==='in'?'breathe in…':'breathe out…',done:false,t:t,midi:midi,hz:hz,i:cy.i,fade:!!cy.fade};
}
function fadeInAt(t){return t<=0?0:t>=FADE_IN?1:ease01(t/FADE_IN)}
function gainAt(s,t){return MASTER*(1+G_SWELL*s.k)*s.dim*fadeInAt(t)}
function freqAt(s){return (s&&s.hz)?s.hz:(F0*(1+F_LIFT*((s&&s.k)||0)))}
function lpAt(s){return LP_LO+(LP_HI-LP_LO)*s.k}
function chimeGainAt(tl,cy){
  if(!cy)return 0;
  if(cy.fade){
    var i=cy.i, fadeI=tl.fadeI;
    if(i>fadeI)return 0; /* drop out after the first fade cycle */
    var s=stateAt(tl,cy.mid);
    return CHIME_G*s.dim*s.dim*.45;
  }
  return CHIME_G;
}

/* ---- CSS ---- */
function css128(){
  if(cssOn||typeof document==='undefined')return;
  if(document.getElementById('v128css')){cssOn=true;return}
  var s=document.createElement('style');s.id='v128css';
  s.textContent=
'#lb128root,.lb128-root{position:relative;inset:auto;min-height:100%;background:#120E18;color:#FFF6D8;overflow:hidden;--lb-k:0;--lb-dim:1;touch-action:manipulation}'+
'#lb128root.lb128-overlay{position:fixed;inset:0;z-index:160}'+
'.lb128-night{position:absolute;inset:0;background:#120E18;pointer-events:none}'+
'.lb128-spill,.lb128-halo,.lb128-bloom{position:absolute;pointer-events:none;will-change:opacity,transform;transform-origin:50% 50%}'+
'.lb128-spill{left:50%;top:72%;width:140%;height:48%;transform:translate(-50%,-50%) scaleX(calc(1 + var(--lb-k,0)*0.05));'+
 'background:radial-gradient(ellipse at 50% 50%,rgba(230,180,84,calc((.16 + var(--lb-k,0)*.08)*var(--lb-dim,1))) 0%,rgba(230,180,84,0) 72%);}'+
'.lb128-halo{left:50%;top:46%;width:min(92vw,720px);height:min(92vw,720px);transform:translate(-50%,-50%) scale(calc(1 + var(--lb-k,0)*0.04));'+
 'background:radial-gradient(circle at 50% 48%,rgba(255,246,216,calc((.26 + var(--lb-k,0)*.12)*var(--lb-dim,1))) 0%,rgba(230,180,84,calc((.14 + var(--lb-k,0)*.08)*var(--lb-dim,1))) 38%,rgba(230,180,84,0) 70%)}'+
'.lb128-bloom{left:50%;top:45%;width:min(28vw,220px);height:min(34vw,260px);transform:translate(-50%,-50%) scale(calc(1 + var(--lb-k,0)*0.03));'+
 'background:radial-gradient(ellipse at 50% 50%,rgba(255,246,216,calc((.32 + var(--lb-k,0)*.12)*var(--lb-dim,1))) 0%,rgba(255,228,164,calc((.14 + var(--lb-k,0)*.08)*var(--lb-dim,1))) 46%,rgba(255,228,164,0) 74%)}'+
'.lb128-lamp{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:min(28vw,168px);pointer-events:none;z-index:2}'+
'.lb128-lamp svg{display:block;width:100%;height:auto;overflow:visible}'+
'.lb128-flame{opacity:calc(0.9 + var(--lb-k,0)*0.1);transform-origin:50% 90%}'+
'.lb128-cue{position:absolute;left:50%;bottom:22%;transform:translate(-50%,0);margin:0;z-index:3;color:#FFF6D8;'+
 'background:rgba(18,14,24,.62);padding:.45rem 1.1rem;border-radius:999px;font:600 clamp(1.15rem,4.2vw,1.85rem)/1.3 system-ui,sans-serif;'+
 'letter-spacing:.08em;text-align:center;max-width:90%;pointer-events:none;min-height:1.4em}'+
'.lb128-cue.lb128-hide,.lb128-root.lb128-nocues .lb128-cue{opacity:0}'+
'.lb128-hint{position:absolute;left:50%;bottom:14%;transform:translate(-50%,0);z-index:3;margin:0;color:#c4b8a4;'+
 'font:400 .85rem/1.35 system-ui,sans-serif;text-align:center;max-width:90%;pointer-events:none;background:rgba(18,14,24,.4);'+
 'padding:.25rem .7rem;border-radius:999px}'+
'.lb128-bar{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;'+
 'align-items:center;padding:14px 14px calc(14px + env(safe-area-inset-bottom,0px));}'+
'.lb128-bar button{min-width:56px;min-height:56px;padding:10px 18px;border-radius:16px;border:1px solid rgba(230,180,84,.35);'+
 'background:rgba(28,22,36,.86);color:#FFF6D8;font:700 1rem/1.2 system-ui,sans-serif;cursor:pointer}'+
'.lb128-bar button:focus-visible{outline:3px solid #E6B454;outline-offset:3px}'+
'.lb128-bar button.lb128-done{background:#3b3420;border-color:#E6B454}'+
'@media (prefers-reduced-motion:reduce){'+
 '.lb128-spill{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(230,180,84,calc(.2*var(--lb-dim,1))) 0%,rgba(230,180,84,0) 72%)}'+
 '.lb128-halo{transform:translate(-50%,-50%)!important;background:radial-gradient(circle at 50% 48%,rgba(255,246,216,calc(.32*var(--lb-dim,1))) 0%,rgba(230,180,84,calc(.18*var(--lb-dim,1))) 38%,rgba(230,180,84,0) 70%)}'+
 '.lb128-bloom{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(255,246,216,calc(.36*var(--lb-dim,1))) 0%,rgba(255,228,164,calc(.16*var(--lb-dim,1))) 46%,rgba(255,228,164,0) 74%)}'+
 '.lb128-flame{opacity:.95!important}'+
 '}'+
'.lb128-root.lb-still .lb128-spill,.lb128-root.reduce73 .lb128-spill{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(230,180,84,calc(.2*var(--lb-dim,1))) 0%,rgba(230,180,84,0) 72%)}'+
'.lb128-root.lb-still .lb128-halo,.lb128-root.reduce73 .lb128-halo{transform:translate(-50%,-50%)!important;background:radial-gradient(circle at 50% 48%,rgba(255,246,216,calc(.32*var(--lb-dim,1))) 0%,rgba(230,180,84,calc(.18*var(--lb-dim,1))) 38%,rgba(230,180,84,0) 70%)}'+
'.lb128-root.lb-still .lb128-bloom,.lb128-root.reduce73 .lb128-bloom{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(255,246,216,calc(.36*var(--lb-dim,1))) 0%,rgba(255,228,164,calc(.16*var(--lb-dim,1))) 46%,rgba(255,228,164,0) 74%)}'+
'.lb128-root.lb-still .lb128-flame,.lb128-root.reduce73 .lb128-flame{opacity:.95!important}'+
'.lb128-picker-wrap{margin:.35rem 0}'+'.lb128-picker-label{display:block;text-align:center;margin:0 0 .35rem;font-weight:700;font-size:1.05rem;color:inherit}'+'.lb128-picker{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;margin:0}'+
'.lb128-picker button{min-width:56px;min-height:56px;padding:10px 16px;border-radius:16px;border:1px solid rgba(230,180,84,.35);'+
 'background:rgba(28,22,36,.86);color:#FFF6D8;font:700 1rem/1.2 system-ui,sans-serif;cursor:pointer}'+
'.lb128-picker button.on,.lb128-picker button[aria-checked="true"]{background:#E6B454;color:#120E18;border-color:#E6B454}'+
'.lb128-picker button:focus-visible{outline:3px solid #E6B454;outline-offset:3px}';
  (document.documentElement||document.head).appendChild(s);
  cssOn=true;
}

function lampSVG(){
  return '<svg class="lb128-svg" viewBox="0 0 100 130" aria-hidden="true" focusable="false">'+
   '<ellipse cx="50" cy="118" rx="34" ry="7" fill="#E6B454" opacity=".3"/>'+
   '<path d="M36 22 Q50 12 64 22" fill="none" stroke="#C9A06A" stroke-width="3.2" stroke-linecap="round"/>'+
   '<path d="M30 36 L70 36 76 82 Q50 98 24 82Z" fill="#C9A06A" stroke="#5C3D12" stroke-width="2.2"/>'+
   '<path d="M33 36 H67" stroke="#5C3D12" stroke-width="3.4" stroke-linecap="round"/>'+
   '<rect x="36" y="48" width="12" height="16" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<rect x="52" y="48" width="12" height="16" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<rect x="36" y="68" width="12" height="12" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<rect x="52" y="68" width="12" height="12" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<path d="M48 46 L50 34 52 46" fill="#5C3D12"/>'+
   '<path class="lb128-flame" d="M45.5 40 Q50 22 54.5 40 Q50 46 45.5 40Z" fill="#FFF6D8" stroke="#E6B454" stroke-width="1.1"/>'+
   '<path d="M49 38 Q50 30 51 38" fill="none" stroke="#855A00" stroke-width="1"/>'+
   '<ellipse cx="50" cy="96" rx="18" ry="5" fill="#8A6840"/>'+
   '</svg>';
}

function installI18n(opt){
  try{
    if(typeof DICT==='object'&&DICT){
      var lg=langOf(opt), extra=STR[lg]||{};
      Object.keys(extra).forEach(function(k){if(!DICT[k])DICT[k]=extra[k]});
    }
  }catch(e){}
}

/* ---- audio ---- */
function schedCurve(param,start,dur,from,to){
  if(!param||!(dur>0)){try{param.setValueAtTime(to,start)}catch(e){}return}
  var n=Math.max(8,Math.min(160,Math.round(dur*28))), a=new Float32Array(n),i,x;
  for(i=0;i<n;i++){x=i/(n-1);a[i]=from+(to-from)*ease01(x)}
  try{param.setValueCurveAtTime(a,start,dur)}catch(e){
    try{param.setValueAtTime(from,start);param.linearRampToValueAtTime(to,start+dur)}catch(e2){}
  }
}
function buildAudio(c,tl){
  var t0=c.currentTime+.06, i, o, g;
  var master=c.createGain(); master.gain.setValueAtTime(0,t0);
  var lp=c.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=LP_Q;
  lp.frequency.setValueAtTime(LP_LO,t0);
  var parts=[];
  for(i=0;i<PARTS.length;i++){
    o=c.createOscillator(); g=c.createGain();
    o.type='sine'; o.frequency.setValueAtTime(F0*PARTS[i][0],t0);
    g.gain.value=PARTS[i][1];
    o.connect(g); g.connect(lp);
    o.start(t0);
    parts.push({o:o,g:g,r:PARTS[i][0]});
  }
  lp.connect(master); master.connect(c.destination);

  /* Schedule gain, pitch and lowpass along the same cosine breath. */
  var t=0, step=.25, prevG=0, prevF=F0, prevLp=LP_LO, s, gn, fr, lv, at;
  s=stateAt(tl,0); prevG=gainAt(s,0)*vol; prevF=freqAt(s); prevLp=lpAt(s);
  master.gain.setValueAtTime(0,t0);
  while(t<tl.end+step){
    at=Math.min(t,tl.end);
    s=stateAt(tl,at);
    gn=gainAt(s,at)*vol;
    fr=freqAt(s);
    lv=lpAt(s);
    var dt=t===0?FADE_IN:step;
    if(t===0){
      schedCurve(master.gain,t0,FADE_IN,0,gainAt(stateAt(tl,FADE_IN),FADE_IN)*vol);
      /* after fade-in, continue from FADE_IN */
      t=FADE_IN;
      s=stateAt(tl,t); prevG=gainAt(s,t)*vol; prevF=freqAt(s); prevLp=lpAt(s);
      continue;
    }
    var tAbs=t0+at;
    try{master.gain.linearRampToValueAtTime(Math.max(0,gn),tAbs)}catch(e){}
    try{lp.frequency.linearRampToValueAtTime(lv,tAbs)}catch(e){}
    for(i=0;i<parts.length;i++){
      try{parts[i].o.frequency.linearRampToValueAtTime(fr*parts[i].r,tAbs)}catch(e){}
    }
    prevG=gn; prevF=fr; prevLp=lv;
    t+=step;
    if(s.done)break;
  }
  try{master.gain.linearRampToValueAtTime(0,t0+tl.end)}catch(e){}

  /* Quiet 'ting' at the top of each in-breath, on a fixed gain (not the breath swell). */
  var chimeBus=c.createGain(); chimeBus.gain.value=1;
  try{chimeBus.connect(c.destination)}catch(e){}
  var chimeNodes=[];
  for(i=0;i<tl.cycles.length;i++){
    var cy=tl.cycles[i], cg=chimeGainAt(tl,cy)*vol;
    if(cg>0.00012){
      var nn=scheduleChime(c,chimeBus,t0+cy.mid,mtofLB(cy.midi+CHIME_OCT),cg);
      if(nn)chimeNodes=chimeNodes.concat(nn);
    }
  }
  return {master:master,lp:lp,parts:parts,t0:t0,chimeBus:chimeBus,
    nodes:parts.map(function(p){return p.o}).concat(chimeNodes)}
}
function scheduleChime(c,dest,tAbs,hz,gain){
  if(!c||!(gain>0)||!(hz>0))return [];
  try{
    var o=c.createOscillator(), o2=c.createOscillator(), g=c.createGain(), g2=c.createGain();
    var lp=c.createBiquadFilter();
    o.type='sine'; o2.type='sine';
    o.frequency.setValueAtTime(hz,tAbs);
    o2.frequency.setValueAtTime(hz*2.003,tAbs);
    g2.gain.value=.18;
    lp.type='lowpass'; lp.frequency.value=1800; lp.Q.value=.55;
    g.gain.setValueAtTime(0,tAbs);
    g.gain.linearRampToValueAtTime(gain,tAbs+CHIME_ATT);
    g.gain.setValueAtTime(Math.max(1e-5,gain),tAbs+CHIME_ATT+.01);
    try{g.gain.exponentialRampToValueAtTime(0.00008,tAbs+CHIME_ATT+CHIME_REL)}catch(e){
      g.gain.linearRampToValueAtTime(0,tAbs+CHIME_ATT+CHIME_REL)
    }
    o.connect(g); o2.connect(g2).connect(g); g.connect(lp);
    if(dest)lp.connect(dest); else lp.connect(c.destination);
    o.start(tAbs); o2.start(tAbs);
    o.stop(tAbs+CHIME_ATT+CHIME_REL+.3); o2.stop(tAbs+CHIME_ATT+CHIME_REL+.3);
    return [o,o2];
  }catch(e){return []}
}
function killAudio(sess,fade){
  if(!sess||!sess.audio)return;
  var a=sess.audio, c=sess.ctx, t, i, d;
  try{t=c&&c.currentTime||0}catch(e){t=0}
  d=fade==null?STOP_FADE:Math.max(.05,fade);
  try{
    if(a.master){
      if(a.master.gain.cancelAndHoldAtTime)a.master.gain.cancelAndHoldAtTime(t);
      else{a.master.gain.cancelScheduledValues(t);a.master.gain.setValueAtTime(a.master.gain.value,t)}
      a.master.gain.linearRampToValueAtTime(0,t+d);
    }
  }catch(e){}
  a.nodes&&a.nodes.forEach(function(o){
    try{o.stop(t+d+.25)}catch(e){}
  });
  setTimeout(function(){
    try{a.master&&a.master.disconnect()}catch(e){}
    try{a.lp&&a.lp.disconnect()}catch(e){}
    try{a.chimeBus&&a.chimeBus.disconnect()}catch(e){}
  },(d+.4)*1000);
  sess.audio=null;
}

/* ---- visuals ---- */
function applyGlow(el,s,reduced){
  if(!el)return;
  var k=reduced?0.5:s.k;
  try{
    el.style.setProperty('--lb-k',String(k));
    el.style.setProperty('--lb-dim',String(s.dim));
    el.setAttribute('data-lb-phase',s.phase);
  }catch(e){}
}
function paintUI(sess){
  if(!sess||!sess.paint||!sess.root)return;
  var s=sess.last||stateAt(sess.tl,0);
  var cue=sess.root.querySelector('.lb128-cue');
  var hint=sess.root.querySelector('.lb128-hint');
  if(cue){
    if(s.done){cue.textContent=t128('Good night',sess.opt);cue.classList.remove('lb128-hide')}
    else if(!sess.cues||sess.reduced){cue.textContent=sess.reduced&&sess.cues?'':'';cue.classList.toggle('lb128-hide',!sess.cues||sess.reduced)}
    else{cue.textContent=t128(s.cue,sess.opt);cue.classList.remove('lb128-hide')}
  }
  if(hint){
    hint.textContent=s.done||s.dim<.35?'':t128('Tap the lamp or Done to stop.',sess.opt);
    hint.hidden=!!(s.done||s.dim<.35);
  }
}
function mountUI(host,opt){
  css128();
  var created=false, root;
  if(host){
    root=host;
    root.classList.add('lb128-root');
    root.setAttribute('id',root.id||'lb128root');
  }else{
    root=document.getElementById('lb128root');
    if(!root){
      root=document.createElement('div');
      root.id='lb128root';
      root.className='lb128-root lb128-overlay';
      (document.body||document.documentElement).appendChild(root);
      created=true;
    }
  }
  root.setAttribute('role','dialog');
  root.setAttribute('aria-label',t128('Lamp Breathing',opt));
  var lg=langOf(opt), dir='ltr';
  if(lg==='ar'||lg==='he'||lg==='fa'||lg==='ur')dir='rtl';
  else if(!(lg==='en'||lg==='es')){
    try{dir=(document.documentElement&&document.documentElement.dir)||'ltr'}catch(e){}
  }
  root.dir=dir;
  if(isReduced(opt&&opt.reduced))root.classList.add('lb-still','reduce73');
  else root.classList.remove('lb-still','reduce73');
  root.innerHTML='<div class="lb128-night"></div><div class="lb128-spill"></div><div class="lb128-halo"></div><div class="lb128-bloom"></div>'+
    '<div class="lb128-lamp">'+lampSVG()+'</div>'+
    '<p class="lb128-cue" aria-live="polite"></p>'+
    '<p class="lb128-hint"></p>'+
    '<div class="lb128-bar">'+
    '<button type="button" class="lb128-done">'+esc128(t128('Done',opt))+'</button>'+
    '<button type="button" class="lb128-cuesbtn">'+esc128(t128((opt&&opt.cues===false)?'Show words':'Hide words',opt))+'</button>'+
    '</div>';
  return {root:root,created:created};
}
function esc128(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

function tick(){
  if(!st)return;
  var now=performance.now();
  var t=(now-st.tPerf)/1000;
  if(st.stopping){
    /* visual dim-out in STOP_FADE */
    var k=Math.min(1,(now-st.stopAt)/ (STOP_FADE*1000));
    var s=st.last?Object.assign({},st.last):stateAt(st.tl,t);
    s.dim=(st.last?st.last.dim:1)*(1-ease01(k));
    applyGlow(st.target,s,st.reduced);
    if(st.paint)applyGlow(st.root,s,st.reduced);
    if(k>=1){finish(false);return}
    st.raf=requestAnimationFrame(tick);
    return;
  }
  var s=stateAt(st.tl,t);
  st.last=s;
  applyGlow(st.target,s,st.reduced);
  if(st.paint){applyGlow(st.root,s,st.reduced);paintUI(st)}
  if(st.opt&&typeof st.opt.onTick==='function'){
    try{st.opt.onTick(s)}catch(e){}
  }
  if(s.done){
    if(st.paint)paintUI(st);
    if(st.audio)killAudio(st,.4);
    /* linger on Good night, then finish */
    if(!st.endedAt)st.endedAt=now;
    if(now-st.endedAt>2800){finish(true);return}
  }
  st.raf=requestAnimationFrame(tick);
}

function onVis(){
  if(document.hidden&&st&&!st.stopping)stop({reason:'hidden'});
}

function start(opt){
  opt=opt||{};
  if(st)stop({fade:.2,silent:true});
  installI18n(opt);
  css128();
  var duration=resolveDuration(opt);
  var tl=makeTimeline(duration);
  var reduced=isReduced(opt.reduced);
  var cues=opt.cues!==false;
  var paint=opt.paint!==false;
  var mounted=null, root=null, created=false;
  if(paint){
    if(typeof document==='undefined')return false;
    mounted=mountUI(opt.host||null,opt);
    root=mounted.root; created=mounted.created;
    root.classList.toggle('lb128-nocues',!cues);
  }
  var target=opt.glowEl||opt.host||root;
  var sess={
    opt:opt,tl:tl,reduced:reduced,cues:cues,paint:paint,root:root,target:target,
    created:created,tPerf:performance.now(),ctx:null,audio:null,raf:0,stopping:false,
    last:stateAt(tl,0),endedAt:0
  };
  st=sess;
  applyGlow(target,sess.last,reduced);
  if(paint){applyGlow(root,sess.last,reduced);paintUI(sess);
    var done=root.querySelector('.lb128-done');
    var cueb=root.querySelector('.lb128-cuesbtn');
    if(done)done.addEventListener('click',function(e){e.stopPropagation();stop({reason:'tap'})});
    if(cueb)cueb.addEventListener('click',function(e){e.stopPropagation();setCues(!st.cues)});
    if(opt.tapToStop!==false){
      root.addEventListener('click',function(e){
        if(e.target&&e.target.closest&&e.target.closest('.lb128-bar'))return;
        stop({reason:'tap'});
      });
    }
  }
  if(isSoundOn()&&opt.sound!==false){
    var c=ac128();
    if(c){
      try{if(c.state==='suspended')c.resume()}catch(e){}
      sess.ctx=c;
      try{sess.audio=buildAudio(c,tl)}catch(e){sess.audio=null}
    }
    /* missing AudioContext: glow-only no-op */
  }
  try{
    document.addEventListener('visibilitychange',onVis);
    document.addEventListener('pagehide',onVis);
  }catch(e){}
  sess.raf=requestAnimationFrame(tick);
  return true;
}

function finish(completed){
  var sess=st; if(!sess)return;
  st=null;
  try{if(sess.raf)cancelAnimationFrame(sess.raf)}catch(e){}
  try{document.removeEventListener('visibilitychange',onVis);document.removeEventListener('pagehide',onVis)}catch(e){}
  if(sess.audio)killAudio(sess,.2);
  if(sess.created&&sess.root&&sess.root.parentNode){
    try{sess.root.parentNode.removeChild(sess.root)}catch(e){}
  }
  var fn=completed?(sess.opt&&sess.opt.onDone):(sess.opt&&sess.opt.onStop);
  /* always fire onDone when completed, onStop when user/hidden; also onDone(false) ? */
  try{if(completed&&sess.opt&&typeof sess.opt.onDone==='function')sess.opt.onDone()}catch(e){}
  try{if(!completed&&sess.opt&&typeof sess.opt.onStop==='function')sess.opt.onStop(sess.opt._reason||'stop')}catch(e){}
}

function stop(opts){
  opts=opts||{};
  if(!st)return;
  if(opts.silent){
    var sess=st; st=null;
    try{if(sess.raf)cancelAnimationFrame(sess.raf)}catch(e){}
    try{document.removeEventListener('visibilitychange',onVis);document.removeEventListener('pagehide',onVis)}catch(e){}
    if(sess.audio)killAudio(sess,opts.fade||.2);
    if(sess.created&&sess.root&&sess.root.parentNode){
      try{sess.root.parentNode.removeChild(sess.root)}catch(e){}
    }
    return;
  }
  if(st.stopping)return;
  st.stopping=true;
  st.opt=st.opt||{};
  st.opt._reason=opts.reason||'stop';
  st.stopAt=performance.now();
  killAudio(st,opts.fade==null?STOP_FADE:opts.fade);
  if(!st.raf)st.raf=requestAnimationFrame(tick);
}

function setCues(on){
  if(!st)return;
  st.cues=!!on;
  if(st.root){
    st.root.classList.toggle('lb128-nocues',!st.cues);
    var b=st.root.querySelector('.lb128-cuesbtn');
    if(b)b.textContent=t128(st.cues?'Hide words':'Show words',st.opt);
    paintUI(st);
  }
}
function setQuiet(on){
  quiet=!!on;
  if(st&&quiet&&st.audio)killAudio(st,.4);
  if(st&&!quiet&&isSoundOn()&&st.opt&&st.opt.sound!==false&&!st.audio&&!st.stopping&&!st.endedAt){
    /* remaining time: rebuild from now — simpler to leave muted until next start */
  }
}
function setVolume(v){
  vol=Math.max(0,Math.min(1,+v||0));
  /* live sessions keep the scheduled curve; volume applies on next start.
     For a running session, scale the master if we can hold and rescale. */
  if(st&&st.audio&&st.audio.master){
    /* can't safely rescale a fully scheduled curve without cancel; leave for next start */
  }
}

function isRunning(){return !!st}

var PICKER_LABELS={short:'About 1 minute',normal:'About 2 minutes',long:'About 3 minutes'};
function mountPicker(parent,opt){
  opt=opt||{};
  if(!parent||typeof document==='undefined')return null;
  css128();
  var existing=parent.querySelector('.lb128-picker-wrap')||parent.querySelector('.lb128-picker');
  if(existing)existing.parentNode.removeChild(existing);
  var sel=opt.selected||opt.length||'normal';
  if(!LENGTHS[sel])sel='normal';
  var wrap=document.createElement('div');
  wrap.className='lb128-picker-wrap';
  var heading=document.createElement('div');
  heading.className='lb128-picker-label';
  heading.id='lb128-how-long';
  heading.textContent=t128('How long?',opt);
  var group=document.createElement('div');
  group.className='lb128-picker';
  group.setAttribute('role','radiogroup');
  group.setAttribute('aria-labelledby','lb128-how-long');
  group.setAttribute('aria-label',t128('How long?',opt));
  ['short','normal','long'].forEach(function(L){
    var b=document.createElement('button');
    b.type='button';
    b.setAttribute('role','radio');
    b.setAttribute('data-lb-length',L);
    b.setAttribute('aria-checked',L===sel?'true':'false');
    if(L===sel)b.classList.add('on');
    b.textContent=t128(PICKER_LABELS[L],opt);
    b.addEventListener('click',function(e){
      if(e){e.preventDefault();e.stopPropagation()}
      sel=L;
      group.querySelectorAll('button').forEach(function(x){
        var on=x.getAttribute('data-lb-length')===sel;
        x.setAttribute('aria-checked',on?'true':'false');
        x.classList.toggle('on',on);
      });
      if(typeof opt.onPick==='function')try{opt.onPick(L)}catch(err){}
    });
    group.appendChild(b);
  });
  wrap.appendChild(heading);
  wrap.appendChild(group);
  parent.appendChild(wrap);
  return {
    el:group, wrap:wrap, label:heading,
    get:function(){return sel},
    set:function(L){
      if(!LENGTHS[L])return sel;
      sel=L;
      group.querySelectorAll('button').forEach(function(x){
        var on=x.getAttribute('data-lb-length')===sel;
        x.setAttribute('aria-checked',on?'true':'false');
        x.classList.toggle('on',on);
      });
      return sel;
    },
    relabel:function(o){
      var lab=t128('How long?',o||opt);
      heading.textContent=lab;
      group.setAttribute('aria-label',lab);
      group.querySelectorAll('button').forEach(function(x){
        var L=x.getAttribute('data-lb-length');
        x.textContent=t128(PICKER_LABELS[L],o||opt);
      });
    }
  };
}

/* public — same surface as v128 / live v129-breathing, plus length helpers */
var API={
  start:start,
  stop:stop,
  isRunning:isRunning,
  setCues:setCues,
  setQuiet:setQuiet,
  setVolume:setVolume,
  getVolume:function(){return vol},
  isQuiet:function(){return quiet},
  reduced:isReduced,
  soundOn:isSoundOn,
  t:t128,
  STRINGS:STR,
  makeTimeline:makeTimeline,
  stateAt:stateAt,
  gainAt:gainAt,
  freqAt:freqAt,
  lpAt:lpAt,
  resolveDuration:resolveDuration,
  mountPicker:mountPicker,
  LENGTHS:LENGTHS,
  PARAM:{IN0:IN0,OUT0:OUT0,SLOW:SLOW,FADE_CYCLES:FADE_CYCLES,FADE_IN:FADE_IN,STOP_FADE:STOP_FADE,
    DUR:DUR,F0:F0,F_LIFT:F_LIFT,G_SWELL:G_SWELL,MASTER:MASTER,LP_LO:LP_LO,LP_HI:LP_HI,LP_Q:LP_Q,
    PARTS:PARTS,GLOW_TROUGH:GLOW_TROUGH,GLOW_AMP:GLOW_AMP,GLOW_SCALE:GLOW_SCALE,
    SPILL_TROUGH:SPILL_TROUGH,SPILL_AMP:SPILL_AMP,REDUCE_GLOW:REDUCE_GLOW,REDUCE_SPILL:REDUCE_SPILL,
    LENGTHS:LENGTHS,LADDER:LADDER,CHIME_G:CHIME_G,CHIME_ATT:CHIME_ATT,CHIME_REL:CHIME_REL,CHIME_OCT:CHIME_OCT},
  version:129,
  css:css128,
  mount:mountUI
};
root.LampBreathing=API;
if(typeof module!=='undefined'&&module.exports)module.exports=API;
})(typeof window!=='undefined'?window:(typeof globalThis!=='undefined'?globalThis:this));
