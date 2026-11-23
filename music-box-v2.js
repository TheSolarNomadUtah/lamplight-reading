/* Lamplight U15: Music Box player (Studio voices_v2, shipped in v186).
   Default voice is frozenglock5 (key u15-v2proto-1122-fg5). Sample-free Web Audio.
   Note data lives in music-box-data-v5.js. No fetch, no mic, no samples.
   Concurrent tines are capped so the ~100-node room plus ~9 nodes/note stay
   gentle on a low-end phone. Lookahead 0.3 s; stop fades then disconnects.

   Note data: a piece is {id, t:{en,es}, by, yr, bpm, g?, arr?, src?, m, b?}
   or {..., parts:['notes', {s:'notes', v:.5}, ...]} for 2-4 voices.
     tokens split by spaces:  PITCH[:BEATS]   BEATS sticky until changed
     PITCH  C4, F#5, Bb3, or a MIDI number (60) like music-data.js;
            chords with +  (C3+E3+G3);  r = rest
     BEATS  quarter notes (1 = quarter, .5 = eighth, .25 = sixteenth)
   MusicBox.add(piece) registers more pieces at runtime (e.g. Curator's).

   Stop rules (F1 lessons): one player at a time; stop() is idempotent and
   fades out (~0.3 s) then stops and disconnects; auto-stops on tab hidden,
   pagehide, leaving the screen, Soft sounds off; onStop(reason) keeps the
   play button honest. A look-ahead scheduler (0.3 s) means nothing long is
   pre-queued, so stopping is instant.

   window.MusicBox = { play, stop, isPlaying, list, get, add, parse,
                       renderOffline, setVolume, setVoice, VOICES, WIND_DOWN, version }
   play(id,{voice:'box'|'harp'|'piano', bedtime, windDown, repeats, tempo,
            loop, volume, host, isActive, onStop, onEnd})               */
(function(root){
'use strict';
var MASTER=.155, LOOK=.3, TICK=60, LP_HZ=3000, ECHO=.17;
var P=null, gen=0, vol=1, extra={};

function data(){return (root.MusicBoxData&&root.MusicBoxData.pieces)||[]}
function list(){return data().concat(Object.keys(extra).map(function(k){return extra[k]}))}
function get(id){if(typeof id==='object')return id;var l=list();for(var i=0;i<l.length;i++)if(l[i].id===id)return l[i];return null}
function add(p){if(p&&p.id&&(p.m||p.parts))extra[p.id]=p;return !!(p&&p.id)}

var SEMI={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function midi(n){
  var m=/^([A-G])(#|b)?(-?\d)$/.exec(n);if(!m)return null;
  return 12*(+m[3]+1)+SEMI[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0);
}
/* -> [{t, d, notes:[midi...]}] in beats; rests advance time only. */
function parse(str){
  var out=[],t=0,d=1;
  String(str||'').trim().split(/\s+/).forEach(function(tok){
    if(!tok||tok==='|')return;
    var p=tok.split(':');if(p[1]!=null&&p[1]!=='')d=+p[1];
    if(p[0]!=='r'){
      var ns=p[0].split('+').map(function(x){return /^\d+$/.test(x)?+x:midi(x)}).filter(function(x){return x!=null});
      if(ns.length)out.push({t:t,d:d,n:ns});
    }
    t+=d;
  });
  out.len=t;return out;
}
function events(piece){
  if(piece._ev)return piece._ev;
  /* m = melody, b = bass; or parts:[{s:'notes',v:.6}, ...] for 2-4 voices. */
  var parts=piece.parts?piece.parts.map(function(p){return typeof p==='string'?{s:p,v:.6}:p}):[];
  if(piece.m)parts.unshift({s:piece.m,v:1});
  if(piece.b)parts.push({s:piece.b,v:.6});
  var ev=[],len=0;
  parts.forEach(function(p){
    var q=parse(p.s);len=Math.max(len,q.len);
    q.forEach(function(e){e.n.forEach(function(n){ev.push({t:e.t,d:e.d,n:n,v:(e.n.length>1?p.v*.7:p.v)})})});
  });
  var g=piece.g||1;ev.forEach(function(x){x.v*=g});
  ev.sort(function(a,b){return a.t-b.t||a.n-b.n});
  ev.len=len;
  piece._ev=ev;return ev;
}

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

function bus(c,dest,vn){
  var V=VOICES[vn||voiceName]||VOICES.box;
  var m=c.createGain(),lp=c.createBiquadFilter(),dl=c.createDelay(1),fb=c.createGain(),wet=c.createGain(),dlp=c.createBiquadFilter(),sum=c.createGain();
  lp.type='lowpass';lp.frequency.value=V.blp||LP_HZ;lp.Q.value=.5;
  dl.delayTime.value=V.dt||.23;fb.gain.value=V.fb==null?.28:V.fb;wet.gain.value=V.echo==null?ECHO:V.echo;
  dlp.type='lowpass';dlp.frequency.value=1700;
  sum.connect(lp);if(!V.spread&&!V.verb)lp.connect(m);
  sum.connect(dl);dl.connect(dlp);dlp.connect(fb);fb.connect(dl);dlp.connect(wet);wet.connect(m);
  var destN=dest||c.destination, nodes=[m,lp,dl,fb,wet,dlp,sum];
  m.connect(destN);
  if(V.spread||V.verb)fx4(c,V,lp,m,nodes);
  /* Frost chorus: delayed L/R taps (2 dB down on the right) so the dry attack stays clean
     and the mono sum cannot fully null. */
  if(V.width){
    function tap(delayS,pan,gain,lfoHz){
      var dly=c.createDelay(.08),g=c.createGain(),p=c.createStereoPanner(),lfo=c.createOscillator(),lg=c.createGain();
      dly.delayTime.setValueAtTime(delayS,0);
      lfo.type='sine';lfo.frequency.value=lfoHz;lg.gain.value=.0008;
      lfo.connect(lg);lg.connect(dly.delayTime);
      g.gain.value=gain;p.pan.value=pan;
      lp.connect(dly);dly.connect(g);g.connect(p);p.connect(destN);
      lfo.start(0);
      nodes.push(dly,g,p,lfo,lg);
    }
    var w=V.width;
    tap(.019,-.22,w,.07);
    tap(.027,.22,w*Math.pow(10,-2/20),.09);
  }
  return {sum:sum,m:m,all:nodes};
}
/* fg4 only (V.spread / V.verb): stereo spread from two 1st-order allpasses
   (L/R phase offset, no delay smear) and a small Freeverb-style room (juce::Reverb
   layout: 8 damped combs + 4 allpasses per side), built once per play. Pure
   delays/gains/filters; no samples, no convolution. */
function iirAP(c,fc){var k=Math.tan(Math.PI*fc/c.sampleRate),a=(k-1)/(k+1);return c.createIIRFilter([a,1],[1,a])}
var CT=[1116,1188,1277,1356,1422,1491,1557,1617],AT=[556,441,341,225];
function fx4(c,V,lp,m,nodes){
  function G(v){var g=c.createGain();g.gain.value=v;nodes.push(g);return g}
  var dry=G(1);dry.channelCount=2;dry.channelCountMode='explicit';dry.channelInterpretation='speakers';lp.connect(dry);
  if(V.spread){
    var sp=c.createChannelSplitter(2),mg=c.createChannelMerger(2),aL=iirAP(c,V.spread[0]),aR=iirAP(c,V.spread[1]);
    dry.connect(sp);sp.connect(aL,0);sp.connect(aR,1);aL.connect(mg,0,0);aR.connect(mg,0,1);mg.connect(m);nodes.push(sp,mg,aL,aR);
  }else dry.connect(m);
  var R=V.verb;if(!R)return;
  var sc=c.sampleRate/44100,fbk=R.room*.28+.7,d=R.damp*.4,inG=G(.03),out=c.createChannelMerger(2);
  inG.channelCount=1;inG.channelCountMode='explicit';inG.channelInterpretation='speakers';
  lp.connect(inG);out.connect(m);nodes.push(out);
  [0,23].forEach(function(spr,ch){
    var acc=G(1);
    CT.forEach(function(n){
      var dl=c.createDelay(.1),f=c.createIIRFilter([1-d],[1,-d]),g=G(fbk);
      dl.delayTime.value=Math.floor((n+spr)*sc)/c.sampleRate;
      inG.connect(dl);dl.connect(f);f.connect(g);g.connect(dl);dl.connect(acc);nodes.push(dl,f);
    });
    var x=acc;
    AT.forEach(function(n){
      var v=G(1),dl=c.createDelay(.05),fb=G(.5),neg=G(-1),o=G(1);
      dl.delayTime.value=Math.floor((n+spr)*sc)/c.sampleRate;
      x.connect(v);v.connect(dl);dl.connect(fb);fb.connect(v);dl.connect(o);x.connect(neg);neg.connect(o);nodes.push(dl);x=o;
    });
    var w=G(R.wet*3/(R.dry*2));x.connect(w);w.connect(out,0,ch);
  });
}
/* Sample-free voices. Partials: [ratio, level, decay share]. Decay = seconds
   to about -60 dB at A4 (lower notes ring a bit longer, higher a bit shorter). */
var VOICES={
  box:  {att:.010,dec:3.0,parts:[[1,1,1],[2.76,.22,.45],[5.4,.07,.22]]},     /* pin drum / bell ratios */
  /* v2 candidates: brighter, shorter, drier. g = level trim, lo/hi = decay clamp (s),
     o = octave shift (semitones), echo/fb/dt = room, blp = bus lowpass. */
  bright:{att:.010,dec:2.2,lo:1.4,hi:3,g:.9,echo:.08,fb:.18,dt:.17,blp:5200,
          parts:[[1,1,1],[2.76,.32,.42],[5.4,.16,.2],[8.93,.07,.07]]},           /* box + sparkle */
  celesta:{att:.010,dec:1.5,lo:.9,hi:2.2,g:.99,o:12,echo:.07,fb:.15,dt:.15,blp:6500,
          parts:[[1,1,1],[4,.22,.22],[3,.06,.3],[10,.035,.06]]},
  kalimba:{att:.010,dec:1.25,lo:.8,hi:1.9,g:1.09,echo:.10,fb:.2,dt:.19,blp:3200,
          parts:[[1,1,1],[2,.10,.5],[5.95,.16,.10],[10.6,.04,.05]]},
  toy:  {att:.010,dec:1.1,lo:.7,hi:1.7,g:.95,echo:.07,fb:.15,dt:.15,blp:6000,
          parts:[[1,1,1],[6.27,.30,.12],[17.55,.06,.04]]},                    /* clamped rods */
  marimba:{att:.010,dec:.95,lo:.55,hi:1.6,g:1.08,echo:.06,fb:.15,dt:.15,blp:4200,
          parts:[[1,1,1],[3.93,.30,.16],[9.2,.06,.07]]},
  /* Frozen-glock STYLE (2026-11-22): inspired by a soft glock + slow pad.
     Pure synth, no samples. Bar ratios 1:2.76:5.4:8.93, ping an octave up,
     warm octave-below halo that breathes (~0.1 Hz). */
  frozenglock:{att:.008,dec:2.4,lo:1.3,hi:3.2,g:.86,o:12,sg:.68,echo:.10,fb:.18,dt:.19,blp:5800,
          parts:[[1,1,1],[2.76,.26,.38],[5.4,.13,.16],[8.93,.055,.07]],
          pad:{att:.12,dec:4.2,g:.22,detune:4,lfo:.10,lfoDepth:.18,lp:1600,lpMod:450,
               parts:[[.5,.55],[1,1],[2,.28]]}},
  /* v2 polish: longer sparkle tail, pad swells then holds ('freezes'),
     gentle delayed chorus for frost/width (dry attack stays clean). */
  frozenglock2:{att:.010,dec:3.8,lo:2.0,hi:5.0,g:.42,o:12,sg:.68,echo:.15,fb:.20,dt:.22,blp:6200,width:.20,
          parts:[[1,1,1],[2.76,.28,.48],[5.4,.15,.28],[8.93,.07,.16],[13.3,.03,.08]],
          pad:{att:.40,dec:8.0,hold:2.5,sustain:.55,g:.20,detune:9,lfo:.06,lfoDepth:.12,lp:1800,lpMod:600,
               parts:[[.5,.65],[1,1],[2,.40],[2.76,.12]]}},
  /* v3 blend: v1 warmth/closeness/cleaner mono body + v2 longer sparkle
     tail, swell-and-hold pad, and a light frost chorus/room (not washy). */
  frozenglock3:{att:.008,dec:3.2,lo:1.6,hi:4.2,g:.62,o:12,sg:.68,echo:.12,fb:.18,dt:.20,blp:6000,width:.11,
          parts:[[1,1,1],[2.76,.26,.42],[5.4,.14,.22],[8.93,.06,.12],[13.3,.02,.06]],
          pad:{att:.30,dec:6.5,hold:2.0,sustain:.62,g:.18,detune:6,lfo:.08,lfoDepth:.15,lp:1650,lpMod:500,
               parts:[[.5,.58],[1,1],[2,.32],[2.76,.08]]}},
  /* v4 MEASURED (2026-11-22) against Dan Keen's Frozen Glock (Pianobook, DS, soft layer),
     reference only, nothing copied: near-pure sine ping (bar partial 2.72 at -36 dB, gone
     in ~0.3 s), 2 ms attack + soft 560 Hz mallet knock (~10 ms), natural ring ~3-5 s with
     the preset's 4 s release after the written note length, pure-sine pad two octaves
     below with L/R detune + slow L/R swirl, log 0.8 s swell and 3.35 s release after the
     note (preset 'fx' fader at max), dry L/R allpass spread and a light Freeverb room. */
  frozenglock4:{att:.002,dec:4.5,lo:2.5,hi:5.5,rel:4.0,g:.62,o:12,sg:.68,echo:0,blp:12000,
          spread:[700,1800],verb:{room:.85,damp:.2,wet:.15,dry:.4},
          knock:{g:7.5,f:560,q:.9,lp:1100,tau:.009},
          parts:[[1,1,1],[2.72,.016,.1]],
          pad:{att:.8,rel:3.35,g:.075,lr:1,detune:1,lfo:.3,lfoR:.8,lfoDepth:.45,parts:[[.25,1],[.5,.03]]}},
  /* v5 (2026-11-22): v4 moved up a whole tone (o 14) so the Twinkle/Ode melodies
     center on key 79 / G6 sounding, the register Ignacio picked in the A/B.
     pmax 5 kHz drops the -36 dB bar partial on the top notes (no shrill highs). */
  frozenglock5:{att:.002,dec:4.5,lo:2.5,hi:5.5,rel:4.0,g:.57,o:14,pmax:5000,sg:.68,echo:0,blp:12000,
          spread:[700,1800],verb:{room:.85,damp:.2,wet:.15,dry:.4},
          knock:{g:7.5,f:560,q:.9,lp:1100,tau:.009},
          parts:[[1,1,1],[2.72,.016,.1]],
          pad:{att:.8,rel:3.35,g:.075,lr:1,detune:1,lfo:.3,lfoR:.8,lfoDepth:.45,parts:[[.25,1],[.5,.03]]}},
  harp: {att:.012,dec:2.4,parts:[[1,1,1],[2,.28,.5],[3,.1,.3],[4,.04,.2]]},
  piano:{att:.014,dec:3.6,parts:[[1,1,1],[2,.35,.6],[3,.12,.4],[4.01,.05,.25]],lp:2200}
};
var voiceName='frozenglock5', tineLive=0, MAX_TINES=12, MAX_PAD=8;
function tine(c,dest,t,n,v,track,vn,durS){
  /* Offline renders schedule every note up front; the live cap is for concurrent
     sounding voices only (onended cannot run until startRendering). */
  var offline=typeof OfflineAudioContext==='function'&&c instanceof OfflineAudioContext;
  if(!offline&&tineLive>=MAX_TINES)return;
  var skipPad=!offline&&tineLive>=MAX_PAD;
  if(!offline)tineLive++;
  var released=false;function releaseTine(){if(released||offline)return;released=true;if(tineLive>0)tineLive--}
  var V=VOICES[vn||voiceName]||VOICES.box;n+=V.o||0;v*=V.g||1;var f=440*Math.pow(2,(n-69)/12);
  var dec=Math.max(V.lo||2,Math.min(V.hi||4,V.dec*Math.pow(440/f,.25)));  /* clamp, box 2-4 s */
  var tau=dec/6.9;                                             /* e^-6.9 = -60 dB */
  var soft=n>=72+(V.o||0)?(V.sg||.8):1;   /* mid/high notes softened a little for bedtime */
  var g=c.createGain();
  var baseTrack=track, first=true;
  track=baseTrack&&function(osc,nodes){
    if(first){first=false;var prev=osc.onended;osc.addEventListener('ended',function(){releaseTine()})}
    baseTrack(osc,nodes||[]);
  };
  /* click-free: start at 0, short linear rise, then smooth exponential fall */
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(v*soft,t+V.att);
  g.gain.setTargetAtTime(0,t+V.att,tau);
  if(V.rel&&durS)g.gain.setTargetAtTime(0,t+Math.max(V.att,durS),1/(1/tau+6.9/V.rel));  /* note-off release */
  var out=g;
  if(V.lp){var lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=V.lp;g.connect(lp);out=lp}
  out.connect(dest);
  if(V.knock){  /* soft mallet knock: seeded procedural noise, band-passed, ~12 ms */
    var K=V.knock,nb=c.__mbNoise;
    if(!nb){nb=c.createBuffer(1,Math.ceil(c.sampleRate*.06),c.sampleRate);var nd=nb.getChannelData(0),sd=12345;
      for(var j=0;j<nd.length;j++){sd=(sd*1103515245+12345)>>>0;nd[j]=sd/2147483648-1}try{c.__mbNoise=nb}catch(e){}}
    var ns=c.createBufferSource(),bp=c.createBiquadFilter(),kg=c.createGain();
    ns.buffer=nb;bp.type='bandpass';bp.frequency.value=K.f;bp.Q.value=K.q;
    var kl=bp;if(K.lp){kl=c.createBiquadFilter();kl.type='lowpass';kl.frequency.value=K.lp;kl.Q.value=.7;bp.connect(kl)}
    kg.gain.setValueAtTime(0,t);kg.gain.linearRampToValueAtTime(K.g*v*soft,t+.001);kg.gain.setTargetAtTime(0,t+.001,K.tau);
    ns.connect(bp);kl.connect(kg);kg.connect(dest);ns.start(t);ns.stop(t+.06);
    if(track)track(ns,[bp,kg].concat(kl!==bp?[kl]:[]));
  }
  var end=t+dec+.1;
  V.parts.forEach(function(p){
    if(f*p[0]>(V.pmax||9000))return;
    var o=c.createOscillator(),pg=c.createGain();
    o.type='sine';o.frequency.value=f*p[0];
    pg.gain.setValueAtTime(p[1],t);
    if(p[2]<1)pg.gain.setTargetAtTime(0,t+V.att,tau*p[2]);
    o.connect(pg);pg.connect(g);o.start(t);o.stop(end);
    if(track)track(o,[pg,g].concat(out!==g?[out]:[]));
  });
  /* Slow-breathing pad under the ping (frozenglock). Gain starts at 0. */
  if(V.pad&&!skipPad){
    var Pd=V.pad,pdec=Pd.dec||4,ptau=pdec/6.9,pend=t+pdec+.1,patt=Pd.att||.12,pgt=t+(durS||Pd.hold||.6);
    if(Pd.rel)pend=pgt+Pd.rel+.1;
    var pEnv=c.createGain(),pLev=(Pd.g||.2)*v*soft;
    pEnv.gain.setValueAtTime(0,t);
    if(Pd.rel){pEnv.gain.setTargetAtTime(pLev,t,patt/4);pEnv.gain.setTargetAtTime(0,pgt,Pd.rel/6.9)}
    else pEnv.gain.linearRampToValueAtTime(pLev,t+patt);
    if(Pd.rel){}else if(Pd.hold){
      pEnv.gain.setTargetAtTime(pLev*(Pd.sustain==null?.75:Pd.sustain),t+patt,.8);
      pEnv.gain.setTargetAtTime(0,t+patt+Pd.hold,1.8);
    }else pEnv.gain.setTargetAtTime(0,t+patt,ptau);
    var breath=c.createGain();breath.gain.setValueAtTime(1,t);
    var lfo=c.createOscillator(),lfoG=c.createGain();
    lfo.type='sine';lfo.frequency.value=Pd.lfo||.1;lfoG.gain.value=Pd.lfoDepth||.2;
    lfo.connect(lfoG);lfoG.connect(breath.gain);
    var pOut=pEnv;
    if(Pd.lp){
      var plp=c.createBiquadFilter();plp.type='lowpass';plp.frequency.value=Pd.lp;plp.Q.value=.4;
      pEnv.connect(plp);pOut=plp;
      if(Pd.lpMod){
        var flfo=c.createOscillator(),fg=c.createGain();
        flfo.type='sine';flfo.frequency.value=(Pd.lfo||.1)*0.73;fg.gain.value=Pd.lpMod;
        plp.frequency.setValueAtTime(Pd.lp,t);
        flfo.connect(fg);fg.connect(plp.frequency);
        flfo.start(Math.max(0,t-(n%7)*.17));flfo.stop(pend);
        if(track)track(flfo,[fg]);
      }
    }
    var brR=null;
    if(Pd.lr){
      var pL=c.createStereoPanner(),pR=c.createStereoPanner(),lfoR=c.createOscillator(),lgR=c.createGain();
      brR=c.createGain();brR.gain.setValueAtTime(1,t);pL.pan.value=-Pd.lr;pR.pan.value=Pd.lr;
      lfoR.frequency.value=Pd.lfoR||Pd.lfo||.1;lgR.gain.value=Pd.lfoDepth||.2;lfoR.connect(lgR);lgR.connect(brR.gain);
      breath.connect(pL);pL.connect(pEnv);brR.connect(pR);pR.connect(pEnv);
      lfoR.start(Math.max(0,t-(n%5)*.31));lfoR.stop(pend);if(track)track(lfoR,[lgR,brR,pL,pR]);
    }else breath.connect(pEnv);
    pOut.connect(dest);
    (Pd.parts||[[1,1]]).forEach(function(p){
      var ff=f*p[0];if(ff>6000||ff<40)return;
      var o1=c.createOscillator(),o2=c.createOscillator(),gg=c.createGain();
      o1.type='sine';o2.type='sine';o1.frequency.value=ff;o2.frequency.value=ff;
      o1.detune.value=Pd.detune||4;o2.detune.value=-(Pd.detune||4);
      gg.gain.value=p[1];o1.connect(gg);gg.connect(breath);
      if(brR){var g2=c.createGain();g2.gain.value=p[1];o2.connect(g2);g2.connect(brR)}else o2.connect(gg);
      o1.start(t);o2.start(t);o1.stop(pend);o2.stop(pend);
      if(track){track(o1,[gg]);track(o2,[]);}
    });
    lfo.start(Math.max(0,t-(n%10)*.23));lfo.stop(pend);
    if(track)track(lfo,[lfoG,breath,pEnv].concat(pOut!==pEnv?[pOut]:[]));
  }
}

function schedule(c,dest,ev,spb,t0,from,to,track,vn,gainK){
  var batch=[],batchT=null,cb=P&&P.onNotes;
  function flush(){if(cb&&batch.length){try{cb(batch,batchT,spb)}catch(e){}}batch=[];batchT=null}
  for(var i=from;i<ev.length;i++){
    var e=ev[i],t=t0+e.t*spb;
    if(t>=to){flush();return i}
    if(batchT!=null&&e.t!==batchT)flush();
    batchT=e.t;batch.push(e);
    tine(c,dest,Math.max(t,c.currentTime),e.n,.22*e.v*(gainK||1),track,vn,e.d*spb);
  }
  flush();
  return ev.length;
}

function onVis(){if(document.hidden)stop('hidden')}
function onHide(){stop('pagehide')}

/* Repeat plan. Normal: tempo 1, plays once (or loops if loop:true).
   Bedtime: tempo 0.85 of the score, and wind-down: each repeat is a bit
   slower (x0.92) and quieter (-3 dB), then it stops by itself. Never plays
   the next song. */
var WD={tempo:.85,repeats:4,slow:.92,quiet:.708};
function plan(piece,o,k){
  var bed=!!(o.bedtime||o.windDown),tempo=o.tempo||(bed?WD.tempo:1),gk=1;
  if(o.windDown!==false&&bed){tempo*=Math.pow(WD.slow,k);gk=Math.pow(WD.quiet,k)}
  return {spb:60/((piece.bpm||80)*tempo),gk:gk};
}
function repeatsOf(o){return (o.bedtime||o.windDown)&&o.windDown!==false?(o.repeats||WD.repeats):(o.loop?Infinity:1)}

function play(id,o){
  o=o||{};
  var piece=get(id);if(!piece)return false;
  stop('switch');
  if(o.sound===false||!soundOn())return false;
  var c=ctxOf(o);if(!c)return false;
  var my=++gen,ev=events(piece),vn=o.voice||voiceName,R=repeatsOf(o),k=0,pl=plan(piece,o,0);
  var B=bus(c,o.dest,vn);
  var t=c.currentTime;
  B.m.gain.setValueAtTime(0,t);B.m.gain.linearRampToValueAtTime(MASTER*vol*(o.volume==null?1:o.volume),t+.05);
  var live=new Set();
  function track(osc,nodes){
    live.add(osc);osc.onended=function(){live.delete(osc);try{osc.disconnect()}catch(e){}nodes.forEach(function(n){try{n.disconnect()}catch(e){}})};
  }
  tineLive=0;
  P={id:piece.id,c:c,B:B,live:live,gen:my,timer:0,watch:0,onStop:o.onStop||null,onEnd:o.onEnd||null,onNotes:o.onNotes||null,onRepeat:o.onRepeat||null,k:0};
  var t0=t+.08,i=0,gap=(o.gap==null?2:o.gap);
  P.timer=setInterval(function(){
    if(!P||P.gen!==my)return;
    var now=c.currentTime,endT=t0+ev.len*pl.spb;
    i=schedule(c,B.sum,ev,pl.spb,t0,i,now+LOOK,track,vn,pl.gk);
    if(i>=ev.length&&now>endT){
      if(k+1<R){t0=endT+gap*pl.spb;k++;pl=plan(piece,o,k);i=0;P.k=k;try{o.onRepeat&&o.onRepeat(k,pl.gk,R)}catch(e){}}
      else if(now>endT+3){var cb=P.onEnd;stop('end');try{cb&&cb()}catch(e){}}
    }
  },TICK);
  if(typeof document!=='undefined'){
    document.addEventListener('visibilitychange',onVis);
    root.addEventListener&&root.addEventListener('pagehide',onHide);
    P.watch=setInterval(function(){
      if(!P||P.gen!==my)return;
      if(!soundOn())return stop('muted');
      var ok=true;try{ok=o.isActive?!!o.isActive():visible(o.host||null)}catch(e){ok=false}
      if(!ok)stop('left');
    },100);
  }
  return true;
}

function stop(reason){
  if(!P)return false;
  var p=P;P=null;gen++;tineLive=0;
  clearInterval(p.timer);clearInterval(p.watch);
  try{document.removeEventListener('visibilitychange',onVis);root.removeEventListener('pagehide',onHide)}catch(e){}
  try{
    var t=p.c.currentTime;
    p.B.m.gain.cancelScheduledValues(t);
    p.B.m.gain.setValueAtTime(p.B.m.gain.value,t);
    var fast=reason==='hidden'||reason==='pagehide'||reason==='left'||reason==='lang'||reason==='muted'||reason==='off'||reason==='switch';
    p.B.m.gain.setTargetAtTime(0,t,fast?.02:.08);
    p.live.forEach(function(o){try{o.stop(t+(fast?.08:.15))}catch(e){}});
  }catch(e){}
  setTimeout(function(){p.B.all.forEach(function(n){try{n.disconnect()}catch(e){}})},500);
  try{if(reason!=='end'&&reason!=='switch'&&p.onStop)p.onStop(reason||'off')}catch(e){}
  if(reason==='switch'&&p.onStop)try{p.onStop('switch')}catch(e){}
  return true;
}

/* Offline: schedule the whole piece (all repeats) into an OfflineAudioContext
   for previews and QA. Same options as play(). Returns the end time. */
function renderOffline(ctx,id,o){
  o=o||{};var piece=get(id);if(!piece)return 0;
  var ev=events(piece),B=bus(ctx,o.dest,o.voice),R=repeatsOf(o);if(R===Infinity)R=2;
  B.m.gain.value=MASTER*(o.volume==null?1:o.volume);
  var t0=o.at||.1,saved=tineLive;tineLive=0;
  try{
    for(var k=0;k<R;k++){
      var pl=plan(piece,o,k);
      ev.forEach(function(e){tine(ctx,B.sum,t0+e.t*pl.spb,e.n,.22*e.v*pl.gk,null,o.voice,e.d*pl.spb)});
      t0+=(ev.len+(o.gap==null?2:o.gap))*pl.spb;
    }
  }finally{tineLive=saved}
  return t0;
}
function setVolume(v){vol=Math.max(0,Math.min(1,+v||0));if(P)try{P.B.m.gain.setTargetAtTime(MASTER*vol,P.c.currentTime,.1)}catch(e){}return vol}

root.MusicBox={play:play,stop:stop,isPlaying:function(){return P?P.id:null},list:list,get:get,add:add,
  parse:parse,events:events,renderOffline:renderOffline,setVolume:setVolume,
  setVoice:function(v){if(VOICES[v])voiceName=v;return voiceName},
  voice:function(){return voiceName},tineLive:function(){return tineLive},
  MAX_TINES:MAX_TINES,VOICES:VOICES,WIND_DOWN:WD,version:'u15-v2proto-1122-fg5'};
try{voiceName='frozenglock5'}catch(e){}
})(typeof window!=='undefined'?window:globalThis);
