/* Lamplight v182 — QA fixes for live v181 (hunt dots, Endless re-root on real taps,
   Same Shape question, Float at cap, Sound Draws tone cut, Year Wheel tap size is
   in year-wheel/index.html, honest honeycomb count, lighter first paint). */
(function(root){
'use strict';

function $(id){return document.getElementById(id)}
function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  if(prev._v182)return true;
  var next=wrap(prev);
  next._v182=1;
  root[name]=next;
  return true;
}
function t182(s, vars){
  var out=s;
  try{
    if(typeof gT==='function') out=gT(s);
    else if(root.IL181&&typeof IL181.t==='function') out=IL181.t(s);
  }catch(e){}
  if(vars){
    Object.keys(vars).forEach(function(k){
      out=String(out).split('{'+k+'}').join(String(vars[k]));
    });
  }
  return out;
}
function reduced182(){
  try{return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}
}

/* ---- #1: redraw gold hunt dots after every deep Mandelbrot blit ---- */
function huntMode182(){
  try{
    if(root.IL163&&typeof IL163.mode==='function') return IL163.mode();
  }catch(e){}
  try{return (PAT106&&PAT106.ex&&PAT106.ex.mode163)||''}catch(e2){return ''}
}
function paintHuntDots182(cv){
  if(paintHuntDots182._busy) return 0;
  cv=cv||$('patExCv');
  if(!cv||typeof PAT106!=='object'||!PAT106.ex) return 0;
  var m=huntMode182();
  if(m!=='baby'&&m!=='antenna') return 0;
  var IL=root.IL163, items=null;
  if(m==='baby'&&IL&&IL.babies){
    items=IL.babies.map(function(b){return {cx:b.cx,cy:b.cy,label:''}});
  }else if(m==='antenna'&&IL&&IL.bulbs){
    items=[3,4,5].map(function(p){var b=IL.bulbs[p];return {cx:b.cx,cy:b.cy,label:String(b.spokes)}});
  }
  if(!items||!items.length) return 0;
  var ex=PAT106.ex, x=cv.getContext('2d');
  if(!x) return 0;
  var W=cv.width, H=cv.height;
  var span=ex.span, cx=ex.cx, cy=ex.cy;
  var xmin=cx-span/2, ymin=cy-span*H/W/2;
  var n=0;
  paintHuntDots182._busy=1;
  try{
    x.save();
    items.forEach(function(it){
      var u=(it.cx-xmin)/span, v=(it.cy-ymin)/(span*H/W);
      if(u<-0.05||u>1.05||v<-0.05||v>1.05) return;
      var r=Math.max(8,Math.min(W,H)*0.035);
      x.beginPath();x.arc(u*W,v*H,r,0,Math.PI*2);
      x.fillStyle='rgba(230,180,84,.55)';
      x.strokeStyle='rgba(255,246,216,.9)';x.lineWidth=1.6;x.fill();x.stroke();
      if(it.label){
        x.fillStyle='#3a2a1a';x.font='700 13px system-ui,sans-serif';
        x.textAlign='center';x.textBaseline='middle';
        x.fillText(String(it.label),u*W,v*H);
      }
      n++;
    });
    x.restore();
  }catch(e){}
  paintHuntDots182._busy=0;
  return n;
}
function wrapPutImageData182(){
  var proto=CanvasRenderingContext2D.prototype;
  if(proto.putImageData._v182) return;
  var prev=proto.putImageData;
  proto.putImageData=function(){
    var r=prev.apply(this,arguments);
    try{
      var cv=this.canvas;
      if(cv&&cv.id==='patExCv') paintHuntDots182(cv);
    }catch(e){}
    return r;
  };
  proto.putImageData._v182=1;
}

/* ---- #2: real-tap fill path uses the hooked global draw, so re-root runs ---- */
function litHexCount182(){
  var stage=$('eh181stage');
  var svg=stage&&stage.querySelector('svg');
  if(!svg) return 0;
  return svg.querySelectorAll('path.eh181-on').length;
}
function patchJarLine182(){
  var msg=$('eh181msg');
  if(!msg||typeof EH181!=='object') return;
  var level=EH181.level||0;
  var filled=(EH181.filled||[]).filter(Boolean).length;
  if((EH181.roots||0)>=1 && level===0 && filled===0){
    var hold=t182('Each tile you see holds everything you built before.');
    var cur=msg.textContent||'';
    if(cur && cur.indexOf(hold)<0){
      var next=cur.replace(/\.+$/,'')+'. '+hold;
      if(msg.textContent!==next) msg.textContent=next;
    }
    return;
  }
  if(level<1||level>=3) return;
  if(filled<1) return;
  var lit=litHexCount182();
  var mid=1,i;for(i=0;i<level;i++) mid*=7;
  if(!lit) lit=mid*(1+filled);
  var line=t182('The middle tile has {mid}. {lit} are filled on the screen.',{mid:mid,lit:lit});
  if(msg.textContent!==line) msg.textContent=line;
}
function ehFill182(idx){
  var E=root.EH181;if(!E) return;
  if(E.busy||E.level>=3||E.filled[idx]) return;
  E.filled[idx]=1;
  var draw=root.ehDraw181;
  if(E.filled.filter(Boolean).length<6){
    if(typeof draw==='function') draw();
    patchJarLine182();
    return;
  }
  E.busy=true;
  if(typeof draw==='function') draw();
  patchJarLine182();
  var stage=$('eh181stage'), svg=stage&&stage.querySelector('svg');
  var ang=19.1066, sc=Math.sqrt(7);
  function next(){
    E.level=Math.min(E.level+1,3);
    E.filled=[0,0,0,0,0,0];
    E.busy=false;
    E.zooms=(E.zooms||0)+1;
    try{if(E.zooms===1&&typeof earn124==='function') earn124('hex')}catch(e){}
    if(typeof draw==='function') draw();
    patchJarLine182();
  }
  if(!svg){next();return}
  if(reduced182()){
    svg.classList.add('eh181-fade');svg.style.opacity='0.2';
    setTimeout(next,800);
  }else{
    svg.classList.add('eh181-zoom');
    svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
    setTimeout(next,1400);
  }
}
function rebindEndless182(){
  var el=$('patterns');
  if(!el||typeof PAT106!=='object'||PAT106.unit!=='endless') return;
  var tile=el.querySelector('[data-pat="endless"]')||document.querySelector('#patterns [data-pat="endless"]');
  /* palette / reset: point at the hooked globals */
  el.querySelectorAll('[data-g181reset="endless"]').forEach(function(rst){
    rst.onclick=function(){if(!EH181.busy&&typeof root.ehOpen181==='function') root.ehOpen181()};
  });
  el.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){
      EH181.pal=+b.getAttribute('data-g181pal-i');
      if(typeof root.ehDraw181==='function') root.ehDraw181();
      patchJarLine182();
    };
  });
  /* rewrite mid-fill count after deep's jar line (rule 7: count what's drawn) */
  try{if(root.IL181DEEP&&typeof IL181DEEP.ehRewriteMsg==='function') IL181DEEP.ehRewriteMsg()}catch(e){}
  patchJarLine182();
  void tile;
}
var _ehCap182=false;
function onEndlessClick182(ev){
  var t=ev.target&&ev.target.closest?ev.target.closest('button, [data-pat], [data-g181reset], [data-g181pal-i]'):null;
  if(!t) return;
  /* grid tile */
  if(t.getAttribute&&t.getAttribute('data-pat')==='endless'){
    ev.preventDefault();ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    if(typeof root.ehOpen181==='function') root.ehOpen181();
    setTimeout(rebindEndless182,0);
    return;
  }
  if(typeof PAT106!=='object'||PAT106.unit!=='endless') return;
  if(t.getAttribute&&t.getAttribute('data-g181reset')==='endless'){
    if(EH181&&EH181.busy){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();return}
    ev.preventDefault();ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    if(typeof root.ehOpen181==='function') root.ehOpen181();
    setTimeout(rebindEndless182,0);
    return;
  }
  var stage=$('eh181stage');
  if(stage&&stage.contains(t)&&t.tagName==='BUTTON'&&!t.getAttribute('data-g181reset')&&!t.getAttribute('data-g181pal-i')){
    var btns=Array.prototype.slice.call(stage.querySelectorAll('button'));
    var idx=btns.indexOf(t);
    if(idx<0) return;
    ev.preventDefault();ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    ehFill182(idx);
  }
}
function watchEndless182(){
  if(watchEndless182._on) return;
  watchEndless182._on=1;
  document.addEventListener('click',onEndlessClick182,true);
  var ticking=false, lastSig='';
  var obs=new MutationObserver(function(){
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(function(){
      ticking=false;
      if(typeof PAT106!=='object'||PAT106.unit!=='endless') return;
      try{
        var E=EH181||{};
        var sig=[E.level,(E.filled||[]).join(''),E.roots,E.busy,E._pendingRoot,litHexCount182()].join('|');
        if(sig===lastSig) return;
        lastSig=sig;
        rebindEndless182();
        if((E.level||0)>=3&&!E.busy&&!E._pendingRoot&&!_ehCap182){
          _ehCap182=true;
          if(typeof root.ehDraw181==='function') root.ehDraw181();
        }
        if((E.level||0)<3) _ehCap182=false;
      }catch(e){}
    });
  });
  var el=$('patterns')||document.body;
  if(el) obs.observe(el,{childList:true,subtree:true});
}

/* ---- #3: Same Shape scale grows down, question stays readable ---- */
function css182(){
  if($('il182css')) return;
  var s=document.createElement('style');s.id='il182css';
  s.textContent=
    '#patterns [data-same-prompt] svg,#patterns .pat-art svg,#patterns .pat-art .lamp-art63{'+
      'transform-origin:center top!important}'+
    '#patterns [data-same181] p.soft{position:relative;z-index:3;background:var(--card,#fffdf8)}'+
    '#patterns [data-same-prompt]{overflow:visible;display:flex;flex-direction:column;align-items:center}';
  document.head.appendChild(s);
}

/* ---- #4: Float to the Sky at the seed cap (don't rely on a missing extraUI global) ---- */
function atSeedCap182(g){
  if(!g) return false;
  if(g._rest) return true;
  var cap=6;
  try{if(root.IL154&&typeof IL154.capOf==='function') cap=IL154.capOf(g.shape)}catch(e){}
  if((g.depth||0)>=cap) return true;
  if(/as far as this seed grows|hasta aquí llega esta semilla/i.test(g.msg||'')) return true;
  return false;
}
function ensureFloat182(){
  var el=$('patterns');
  if(!el||typeof PAT106!=='object'||PAT106.unit!=='grow') return;
  var g=PAT106.grow;if(!g) return;
  if(el.querySelector('[data-gaf3float]')) return;
  if(!atSeedCap182(g)) return;
  var btn=document.createElement('button');
  btn.type='button';
  btn.className='g3btn';
  btn.setAttribute('data-gaf3float','1');
  btn.textContent=t182('Float to the Sky');
  btn.onclick=function(){
    var gg=PAT106&&PAT106.grow;if(!gg) return;
    var go=function(){try{if(root.IL154&&typeof IL154.floatSky==='function') IL154.floatSky()}catch(e){}};
    if(!gg._rest){
      gg._rest=1;
      var c=$('patGrowCv');
      if(root.IL154&&typeof IL154.fadeRest==='function') IL154.fadeRest(c,go);
      else go();
    }else go();
  };
  var bar=el.querySelector('[data-g181ctrl]')||el.querySelector('[data-gaf3ctrl]')||el.querySelector('.g181-row');
  if(bar) bar.appendChild(btn);
  else el.appendChild(btn);
}

/* ---- #5: cut Sound Draws tone on Back, hide, pagehide, Soft sounds off ---- */
function stopSoundTone182(){
  try{
    var st=typeof PAT106==='object'&&PAT106.ch;
    if(st&&st.osc){
      try{st.osc.stop()}catch(e){}
      try{st.osc.disconnect()}catch(e2){}
      st.osc=null;
    }
    if(st&&st.gain){
      try{st.gain.gain&&(st.gain.gain.value=0)}catch(e3){}
      try{st.gain.disconnect()}catch(e4){}
    }
  }catch(e){}
}

/* ---- #8: don't run the 180-step settle on the first paint stack ---- */
function wrapSettle182(){
  hook('soundSettleNow181',function(prev){
    return function(){
      var self=this,args=arguments;
      var later=function(){try{prev.apply(self,args)}catch(e){}};
      if(typeof requestIdleCallback==='function'){
        requestIdleCallback(later,{timeout:200});
      }else{
        requestAnimationFrame(function(){setTimeout(later,0)});
      }
    };
  });
}

function wrapNav182(){
  /* Do not replace window.show — seatbelt/back/parity require the v99 history wrap to stay outermost. */
  hook('showCore10_97',function(prev){
    return function(id){
      try{
        if(id!=='patterns') stopSoundTone182();
        else if(typeof PAT106==='object'&&PAT106.unit&&PAT106.unit!=='sound') stopSoundTone182();
      }catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      try{
        if(id!=='patterns') stopSoundTone182();
      }catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('lampSfxSet73',function(prev){
    return function(on){
      var r=prev.apply(this,arguments);
      try{if(!on) stopSoundTone182()}catch(e){}
      return r;
    };
  });
  document.addEventListener('visibilitychange',function(){
    if(document.hidden) stopSoundTone182();
  });
  window.addEventListener('pagehide',stopSoundTone182);
  window.addEventListener('blur',function(){/* do not cut on blur: moving between controls shouldn't kill the tone */});
}

function wrapGrow182(){
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{ensureFloat182()}catch(e){}
      return r;
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{ensureFloat182()}catch(e){}
      return r;
    };
  });
}
function wrapHunt182(){
  hook('patExDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{paintHuntDots182($('patExCv'))}catch(e){}
      return r;
    };
  });
  hook('patExRender106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{paintHuntDots182($('patExCv'))}catch(e){}
      return r;
    };
  });
}

function install(){
  css182();
  wrapPutImageData182();
  wrapHunt182();
  watchEndless182();
  wrapGrow182();
  wrapNav182();
  wrapSettle182();
  try{rebindEndless182()}catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL182={
  version:182,
  paintHuntDots:paintHuntDots182,
  litHexCount:litHexCount182,
  ehFill:ehFill182,
  ensureFloat:ensureFloat182,
  stopSoundTone:stopSoundTone182,
  patchJarLine:patchJarLine182
};
root.paintHuntDots182=paintHuntDots182;
root.ehFill182=ehFill182;
root.stopSoundTone182=stopSoundTone182;

})(typeof window!=='undefined'?window:this);
