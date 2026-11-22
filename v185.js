/* Lamplight v185 — Ignacio 22 Nov 3:56 PM America/Denver (t434u Yes):
   Pattern Loom Bloom buttons grow the picture and a visible Spin control;
   remove Find the baby, Count the spokes, and Honeycomb Builder;
   soft growth sound on Endless Honeycomb, stopped on every leave path. */
(function(root){
'use strict';

/* Reverses the Nov 20 keep-and-upgrade default. v181 reads this at tidy time. */
root.V181_REMOVE_HONEYCOMB=true;

function $(id){return document.getElementById(id)}
function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  if(prev._v185)return true;
  var next=wrap(prev);
  next._v185=1;
  root[name]=next;
  return true;
}
var ES185={Spin:'Girar'};
function t185(s, vars){
  var out=s;
  try{
    if(esLang185()&&ES185[s]) out=ES185[s];
    else if(typeof gT==='function') out=gT(s);
    else if(root.IL181&&typeof IL181.t==='function') out=IL181.t(s);
  }catch(e){}
  if(vars){
    Object.keys(vars).forEach(function(k){
      out=String(out).split('{'+k+'}').join(String(vars[k]));
    });
  }
  return out;
}
function esLang185(){
  try{
    var lang=(typeof lampLang==='function'?lampLang():'')||(root.LAMP_LANG)||'';
    if(/^es\b/i.test(lang)) return true;
    var html=document.documentElement;
    if(html&&/^es\b/i.test(html.lang||'')) return true;
    if(html&&html.getAttribute('data-lang')==='es') return true;
  }catch(e){}
  return false;
}
function esc185(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function reduced185(){
  try{if(typeof lampReduced73==='function'&&lampReduced73()) return true}catch(e){}
  try{return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e2){return false}
}
function soundOn185(){
  try{if(typeof lampSfxOn73==='function')return !!lampSfxOn73()}catch(e){}
  return root.LAMP_SFX!==false;
}
function ac185(){
  try{if(typeof ac==='function'){var c=ac();if(c){instrumentCtx185(c);return c}}}catch(e){}
  try{if(root.AC){if(root.AC.state==='suspended')root.AC.resume();instrumentCtx185(root.AC);return root.AC}}catch(e2){}
  return null;
}
var ehAllOsc185=[], ehCapture185=false;
function instrumentCtx185(c){
  if(!c||c._v185inst) return c;
  c._v185inst=1;
  try{
    var orig=c.createOscillator.bind(c);
    c.createOscillator=function(){
      var o=orig();
      if(ehCapture185) ehAllOsc185.push(o);
      return o;
    };
  }catch(e){}
  return c;
}
function withEhCapture185(fn){
  ehCapture185=true;
  try{return fn()}finally{ehCapture185=false}
}
function hookAc185(){
  hook('ac',function(prev){
    return function(){
      var c=prev.apply(this,arguments);
      instrumentCtx185(c);
      return c;
    };
  });
  try{if(root.AC) instrumentCtx185(root.AC)}catch(e){}
  try{
    [root.AudioContext, root.webkitAudioContext].forEach(function(C){
      if(!C||!C.prototype||C.prototype.createOscillator._v185) return;
      var prev=C.prototype.createOscillator;
      C.prototype.createOscillator=function(){
        var o=prev.apply(this,arguments);
        if(ehCapture185) ehAllOsc185.push(o);
        return o;
      };
      C.prototype.createOscillator._v185=1;
    });
  }catch(e2){}
  try{
    var SP=root.AudioScheduledSourceNode&&root.AudioScheduledSourceNode.prototype;
    if(SP&&SP.start&&!SP.start._v185){
      var prevS=SP.start;
      SP.start=function(){
        if(ehCapture185){
          try{if(ehAllOsc185.indexOf(this)<0) ehAllOsc185.push(this)}catch(e){}
        }
        return prevS.apply(this,arguments);
      };
      SP.start._v185=1;
    }
  }catch(e3){}
}

function css185(){
  if($('il185css')) return;
  var s=document.createElement('style');s.id='il185css';
  s.textContent=
    '.loom181-dial button[data-loom185-spin]{min-width:56px;min-height:56px;padding:6px 10px;font:600 14px system-ui,sans-serif}'+
    '.loom181-dial button[data-loom185-spin].on{box-shadow:inset 0 0 0 2px #c28500}'+
    '.loom181-dial button[data-loom185-spin][aria-disabled="true"]{opacity:.55}';
  document.head.appendChild(s);
}

/* ---- 1. Pattern Loom: Bloom grows the picture; visible Spin ---- */
function loomFigure185(n){
  var c=[[0,0]], i, a;
  n=+n||1;
  if(n<=1) return c;
  if(n===2){ c.push([1,0]); return c; }
  if(n===3){
    c.push([1,0]);
    c.push([0.5, Math.sin(Math.PI/3)]);
    return c;
  }
  /* Bloom 6: six equal circles around the one (seed of life). 7 centres. */
  for(i=0;i<6;i++){
    a=Math.PI/180*(60*i-90);
    c.push([Math.cos(a), Math.sin(a)]);
  }
  return c;
}
function loomCircleCount185(){
  var stage=$('loom181stage');
  return stage?stage.querySelectorAll('circle.loom181-c').length:0;
}
function loomStopSpin185(){
  try{
    if(typeof LOOM181==='object'){
      LOOM181.spinOn=false;
      LOOM181.holding=false;
    }
  }catch(e){}
  var b=document.querySelector('[data-loom185-spin]');
  if(b){ b.classList.remove('on'); b.setAttribute('aria-pressed','false'); }
}
function loomSpinTick185(now){
  try{
    if(typeof LOOM181!=='object') return;
    if(!(LOOM181.spinOn||LOOM181.holding)){ LOOM181.raf=0; return; }
    var last=LOOM181._spinLast||now;
    LOOM181.turn+=(now-last)/1000*(Math.PI/15);
    LOOM181._spinLast=now;
    var g=document.getElementById('loom181world');
    if(g) g.setAttribute('transform','rotate('+((LOOM181.turn*180/Math.PI).toFixed(3))+' 200 200)');
    LOOM181.raf=requestAnimationFrame(loomSpinTick185);
  }catch(e){}
}
function loomStartSpin185(){
  if(typeof LOOM181!=='object') return;
  if(reduced185()) return;
  LOOM181.spinOn=true;
  LOOM181._spinLast=performance.now();
  if(!LOOM181.raf) LOOM181.raf=requestAnimationFrame(loomSpinTick185);
  var b=document.querySelector('[data-loom185-spin]');
  if(b){ b.classList.add('on'); b.setAttribute('aria-pressed','true'); }
}
function loomApplyBloom185(n){
  if(typeof LOOM181!=='object') return;
  n=+n||1;
  LOOM181.bloom=n;
  LOOM181.centers=loomFigure185(n);
  if(n<6){ LOOM181.revealed=false; LOOM181.faded=false; }
  var draw=root.loomDraw181;
  if(typeof draw==='function') draw();
  else enhanceLoom185();
}
function enhanceLoom185(){
  var el=$('patterns');
  if(!el||typeof PAT106!=='object'||PAT106.unit!=='loom') return;
  var dial=el.querySelector('.loom181-dial');
  if(!dial) return;
  el.querySelectorAll('[data-loom181-bloom]').forEach(function(b){
    if(b._v185) return;
    b._v185=1;
    b.onclick=function(ev){
      if(ev){ ev.preventDefault(); if(ev.stopImmediatePropagation) ev.stopImmediatePropagation(); }
      loomApplyBloom185(+b.getAttribute('data-loom181-bloom'));
    };
  });
  var spin=el.querySelector('[data-loom185-spin]');
  if(!spin){
    spin=document.createElement('button');
    spin.type='button';
    spin.setAttribute('data-loom185-spin','1');
    spin.setAttribute('aria-label',t185('Spin'));
    spin.setAttribute('aria-pressed', (typeof LOOM181==='object'&&LOOM181.spinOn)?'true':'false');
    if(typeof LOOM181==='object'&&LOOM181.spinOn) spin.classList.add('on');
    if(reduced185()) spin.setAttribute('aria-disabled','true');
    spin.innerHTML='<span>'+esc185(t185('Spin'))+'</span>';
    dial.appendChild(spin);
  }
  if(spin&&!spin._v185){
    spin._v185=1;
    spin.onclick=function(){
      if(reduced185()) return;
      if(typeof LOOM181==='object'&&LOOM181.spinOn) loomStopSpin185();
      else loomStartSpin185();
    };
  }
  if(typeof LOOM181==='object'&&LOOM181.spinOn&&!reduced185()) loomStartSpin185();
}

/* ---- 2. Remove Find the baby and Count the spokes ---- */
function stripHunt185(){
  document.querySelectorAll('[data-tool163="baby"],[data-tool163="antenna"]').forEach(function(b){
    if(b.parentNode) b.parentNode.removeChild(b);
  });
  try{
    if(typeof PAT106==='object'&&PAT106.ex&&(PAT106.ex.mode163==='baby'||PAT106.ex.mode163==='antenna')){
      PAT106.ex.mode163='';
      var el=$('patterns');
      if(el) el.classList.remove('zoom-hunt181');
      var hint=$('patHint163');
      if(hint&&hint.parentNode) hint.parentNode.removeChild(hint);
    }
  }catch(e){}
}
function wrapSetMode185(fn){
  if(!fn||fn._v185) return fn;
  var next=function(m){
    if(m==='baby'||m==='antenna'){
      stripHunt185();
      return;
    }
    var r=fn.apply(this,arguments);
    stripHunt185();
    return r;
  };
  next._v185=1;
  return next;
}
function installHuntGone185(){
  try{if(root.setMode163) root.setMode163=wrapSetMode185(root.setMode163)}catch(e){}
  try{if(root.IL163&&IL163.setMode) IL163.setMode=wrapSetMode185(IL163.setMode)}catch(e2){}
  window.addEventListener('click',function(ev){
    var t=ev.target&&ev.target.closest&&ev.target.closest('[data-tool163="baby"],[data-tool163="antenna"]');
    if(!t) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    stripHunt185();
  },true);
}

/* ---- 3. Honeycomb Builder is hidden by V181_REMOVE_HONEYCOMB ---- */
function hideHoneyTile185(){
  try{
    var el=$('patterns'); if(!el) return;
    var hx=el.querySelector('[data-pat="honeycomb"]');
    if(hx&&hx.parentNode) hx.parentNode.removeChild(hx);
  }catch(e){}
}

/* ---- 4. Endless Honeycomb growth sound (Web Audio only) ---- */
var ehNodes185=[];
function ehChime185(i){
  if(!soundOn185()) return;
  var c=ac185(); if(!c) return;
  try{if(c.state==='suspended') c.resume()}catch(e){}
  withEhCapture185(function(){
  var freqs=[261.63,293.66,329.63,392,440,523.25,392];
  var f=freqs[Math.max(0,Math.min(freqs.length-1,i|0))];
  var o=c.createOscillator(), g=c.createGain();
  o.type='sine'; o.frequency.value=f;
  var vol=(document.body&&document.body.classList.contains('bedtime'))?0.035:0.055;
  var t=c.currentTime, atk=0.008, dur=0.85;
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol,t+atk);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t+dur+0.05);
  ehNodes185.push({o:o,g:g});
  o.onended=function(){try{o.disconnect();g.disconnect()}catch(e2){}};
  });
}
function ehSwell185(){
  if(!soundOn185()) return;
  var c=ac185(); if(!c) return;
  try{if(c.state==='suspended') c.resume()}catch(e){}
  withEhCapture185(function(){
  var o1=c.createOscillator(), o2=c.createOscillator(), g=c.createGain();
  o1.type='sine'; o2.type='sine';
  var t=c.currentTime;
  o1.frequency.setValueAtTime(196.00,t);
  o1.frequency.linearRampToValueAtTime(392.00,t+1.35);
  o2.frequency.setValueAtTime(293.66,t);
  o2.frequency.linearRampToValueAtTime(392.00,t+1.35);
  var vol=(document.body&&document.body.classList.contains('bedtime'))?0.025:0.04;
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol,t+0.008);
  g.gain.linearRampToValueAtTime(vol*0.8,t+1.05);
  g.gain.linearRampToValueAtTime(0,t+1.45);
  o1.connect(g); o2.connect(g); g.connect(c.destination);
  o1.start(t); o2.start(t);
  o1.stop(t+1.5); o2.stop(t+1.5);
  ehNodes185.push({o:o1,g:g},{o:o2,g:g});
  });
}
function ehCellsNow185(){
  var E=root.EH181||{};
  var level=E.level||0, filled=(E.filled||[]).filter(Boolean).length;
  var mid=1,i; for(i=0;i<level;i++) mid*=7;
  return mid*(1+filled);
}
function ehToneAttach185(){
  if(!soundOn185()) return;
  var HT=root.HoneyTone;
  if(!HT||typeof HT.attach!=='function') return;
  withEhCapture185(function(){
    HT.attach({
      host:$('eh181stage')||$('patterns'),
      cells:ehCellsNow185(),
      isActive:function(){
        try{return typeof PAT106==='object'&&PAT106.unit==='endless'&&!!$('eh181stage')}catch(e){return false}
      }
    });
  });
}
function ehToneSync185(grow){
  var HT=root.HoneyTone;
  if(!HT) return;
  if(typeof HT.isOn==='function'&&!HT.isOn()) ehToneAttach185();
  withEhCapture185(function(){
    if(grow&&typeof HT.grow==='function'&&HT.isOn()) HT.grow();
    else if(typeof HT.setCells==='function'&&HT.isOn()) HT.setCells(ehCellsNow185());
  });
}
function stopEhSound185(reason){
  try{
    var c=ac185();
    var t=c?c.currentTime:0;
    ehNodes185.forEach(function(n){
      try{
        if(n.g&&n.g.gain){
          n.g.gain.cancelScheduledValues(t);
          var cur=0;
          try{cur=n.g.gain.value}catch(e0){}
          n.g.gain.setValueAtTime(cur,t);
          n.g.gain.linearRampToValueAtTime(0,t+0.008);
        }
        if(n.o) n.o.stop(t+0.05);
      }catch(e){}
    });
    ehAllOsc185.forEach(function(o){
      try{o.stop(t+0.01)}catch(e1){try{o.stop()}catch(e1b){}}
    });
  }catch(e2){}
  ehNodes185=[];
  var leftover=ehAllOsc185.slice();
  ehAllOsc185=[];
  ehCapture185=false;
  try{if(root.HoneyTone&&typeof HoneyTone.detach==='function'&&HoneyTone.isOn()) HoneyTone.detach(reason||'left')}catch(e3){}
  /* HoneyTone.detach schedules stop at t+0.7; force those leftover voices off now. */
  leftover.forEach(function(o){
    try{o.stop(t+0.01)}catch(e4){try{o.stop()}catch(e5){}}
  });
}
function patchJar185(){
  try{if(root.IL182&&typeof IL182.patchJarLine==='function') IL182.patchJarLine()}catch(e){}
}
function ehFill185(idx){
  var E=root.EH181; if(!E) return;
  if(E.busy||E.level>=3||E.filled[idx]) return;
  E.filled[idx]=1;
  var draw=root.ehDraw181;
  var count=E.filled.filter(Boolean).length;
  ehCapture185=true;
  try{
    ehChime185(count-1);
    ehToneAttach185();
    ehToneSync185(false);
  }finally{ /* keep ehCapture185 true while the unit is open so later grow() voices are tracked */ }
  if(count<6){
    if(typeof draw==='function') draw();
    patchJar185();
    return;
  }
  E.busy=true;
  if(typeof draw==='function') draw();
  patchJar185();
  ehSwell185();
  var stage=$('eh181stage'), svg=stage&&stage.querySelector('svg');
  var ang=19.1066, sc=Math.sqrt(7);
  function next(){
    E.level=Math.min(E.level+1,3);
    E.filled=[0,0,0,0,0,0];
    E.busy=false;
    E.zooms=(E.zooms||0)+1;
    try{if(E.zooms===1&&typeof earn124==='function') earn124('hex')}catch(e){}
    if(typeof draw==='function') draw();
    patchJar185();
    ehToneSync185(true);
  }
  if(!svg){next();return}
  if(reduced185()){
    svg.classList.add('eh181-fade');svg.style.opacity='0.2';
    setTimeout(next,800);
  }else{
    svg.classList.add('eh181-zoom');
    svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
    setTimeout(next,1400);
  }
}
function onEndlessClick185(ev){
  if(typeof PAT106!=='object'||PAT106.unit!=='endless') return;
  var t=ev.target&&ev.target.closest?ev.target.closest('button'):null;
  if(!t) return;
  var stage=$('eh181stage');
  if(stage&&stage.contains(t)&&t.tagName==='BUTTON'&&!t.getAttribute('data-g181reset')&&!t.getAttribute('data-g181pal-i')){
    var btns=Array.prototype.slice.call(stage.querySelectorAll('button'));
    var idx=btns.indexOf(t);
    if(idx<0) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    ehFill185(idx);
  }
}
function onLoomReset185(ev){
  var t=ev.target&&ev.target.closest&&ev.target.closest('[data-g181reset="loom"]');
  if(t) loomStopSpin185();
}

function leavingEndless185(nextId, nextUnit){
  try{
    if(typeof PAT106!=='object'||PAT106.unit!=='endless') return false;
  }catch(e){return false}
  if(nextId&&nextId!=='patterns') return true;
  if(nextUnit!==undefined&&nextUnit!=='endless') return true;
  return false;
}
function leavingLoom185(nextId, nextUnit){
  try{
    if(typeof PAT106!=='object'||PAT106.unit!=='loom') return false;
  }catch(e){return false}
  if(nextId&&nextId!=='patterns') return true;
  if(nextUnit!==undefined&&nextUnit!=='loom') return true;
  return false;
}

function wrapNav185(){
  hook('patOpen106',function(prev){
    return function(u){
      var was=null;
      try{was=typeof PAT106==='object'&&PAT106.unit}catch(e){}
      if(was==='endless'&&u!=='endless'){ try{stopEhSound185('left')}catch(e2){} }
      if(was==='loom'&&u!=='loom'){ try{loomStopSpin185()}catch(e3){} }
      if(u==='loom'){ try{if(root.LOOM181) LOOM181.spinOn=false}catch(e4){} }
      var r=prev.apply(this,arguments);
      try{
        hideHoneyTile185();
        stripHunt185();
        if(u==='loom') enhanceLoom185();
        if(u==='zoom') stripHunt185();
      }catch(e5){}
      return r;
    };
  });
  hook('showCore10_97',function(prev){
    return function(id){
      try{
        if(leavingEndless185(id)) stopEhSound185('left');
        if(leavingLoom185(id)) loomStopSpin185();
      }catch(e){}
      var r=prev.apply(this,arguments);
      try{
        if(id==='patterns'){ hideHoneyTile185(); stripHunt185(); }
      }catch(e2){}
      return r;
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{
        if(id!=='patterns'){ stopEhSound185('left'); loomStopSpin185(); }
        else { hideHoneyTile185(); stripHunt185(); }
      }catch(e){}
      return r;
    };
  });
  hook('lampSfxSet73',function(prev){
    return function(on){
      var r=prev.apply(this,arguments);
      try{if(!on) stopEhSound185('muted')}catch(e){}
      return r;
    };
  });
  document.addEventListener('visibilitychange',function(){
    if(document.hidden) stopEhSound185('hidden');
  });
  window.addEventListener('pagehide',function(){ stopEhSound185('pagehide'); });
}

function hookLoomDraw185(){
  hook('loomDraw181',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{enhanceLoom185()}catch(e){}
      return r;
    };
  });
  hook('loomOpen181',function(prev){
    return function(){
      try{if(root.LOOM181) LOOM181.spinOn=false}catch(e){}
      var r=prev.apply(this,arguments);
      try{enhanceLoom185()}catch(e2){}
      return r;
    };
  });
}

function watchDom185(){
  if(watchDom185._on) return;
  watchDom185._on=1;
  var ticking=false;
  var obs=new MutationObserver(function(){
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(function(){
      ticking=false;
      try{
        hideHoneyTile185();
        stripHunt185();
        if(typeof PAT106==='object'&&PAT106.unit==='loom') enhanceLoom185();
      }catch(e){}
    });
  });
  var el=$('patterns')||document.body;
  if(el) obs.observe(el,{childList:true,subtree:true});
}

function install(){
  css185();
  hookAc185();
  hookLoomDraw185();
  installHuntGone185();
  wrapNav185();
  /* Window capture runs before v182's document capture, so the kid path hits ehFill185. */
  window.addEventListener('click',onEndlessClick185,true);
  window.addEventListener('click',onLoomReset185,true);
  watchDom185();
  try{hideHoneyTile185();stripHunt185()}catch(e){}
  root.ehFill182=ehFill185;
  try{if(root.IL182) IL182.ehFill=ehFill185}catch(e2){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL185={
  version:185,
  loomFigure:loomFigure185,
  loomApplyBloom:loomApplyBloom185,
  loomStartSpin:loomStartSpin185,
  loomStopSpin:loomStopSpin185,
  loomCircleCount:loomCircleCount185,
  ehFill:ehFill185,
  ehChime:ehChime185,
  ehSwell:ehSwell185,
  stopEhSound:stopEhSound185,
  stripHunt:stripHunt185
};
root.ehFill185=ehFill185;
root.stopEhSound185=stopEhSound185;
root.loomApplyBloom185=loomApplyBloom185;

})(typeof window!=='undefined'?window:this);
