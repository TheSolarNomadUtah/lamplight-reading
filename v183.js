/* Lamplight v183 — leftover v182 QA fails: Sound Draws Back-link tone cut,
   Same Shape scale limited to the quiz prompt with reserved layout space. */
(function(root){
'use strict';

function $(id){return document.getElementById(id)}
function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  if(prev._v183)return true;
  var next=wrap(prev);
  next._v183=1;
  root[name]=next;
  return true;
}

function stopSoundTone183(){
  try{
    if(typeof root.stopSoundTone182==='function'){
      root.stopSoundTone182();
      return;
    }
  }catch(e){}
  try{
    var st=typeof PAT106==='object'&&PAT106.ch;
    if(st&&st.osc){
      try{st.osc.stop()}catch(e1){}
      try{st.osc.disconnect()}catch(e2){}
      st.osc=null;
    }
    if(st&&st.gain){
      try{st.gain.gain&&(st.gain.gain.value=0)}catch(e3){}
      try{st.gain.disconnect()}catch(e4){}
    }
  }catch(e){}
}

/* ---- #5: any patOpen106 that leaves Sound Draws must cut the tone ---- */
function wrapPatOpen183(){
  hook('patOpen106',function(prev){
    return function(u){
      var was=null;
      try{was=typeof PAT106==='object'&&PAT106.unit}catch(e){}
      if(was==='sound' && u!=='sound'){
        try{stopSoundTone183()}catch(e2){}
      }
      var r=prev.apply(this,arguments);
      try{afterPatOpen183(u)}catch(e3){}
      return r;
    };
  });
}
function afterPatOpen183(u){
  var el=$('patterns');
  if(!el) return;
  if(u==='same') el.classList.add('il183-same');
  else el.classList.remove('il183-same');
  if(u==='same') bindSameScale183();
}

/* ---- N1/N2: scale only the quiz prompt; reserve layout space ---- */
function css183(){
  if($('il183css')) return;
  var s=document.createElement('style');s.id='il183css';
  s.textContent=
    '#patterns.il183-same .pat-art svg,#patterns.il183-same .pat-art .lamp-art63{'+
      'transform:none!important;transform-origin:center center!important}'+
    '#patterns [data-same-prompt]{overflow:visible;display:flex;flex-direction:column;align-items:center}'+
    '#patterns [data-same-prompt] svg{transform:none!important;display:block;margin:0 auto;max-width:100%;height:auto}'+
    '#patterns [data-same181] p.soft{position:relative;z-index:3;background:var(--card,#fffdf8)}'+
    '#patterns .same181-quiz{position:relative;z-index:2}'+
    '#patterns .same181-scale{position:relative;z-index:4}';
  document.head.appendChild(s);
}
function promptBase183(svg){
  if(!svg) return {w:140,h:140};
  if(!svg._bw183){
    var w=parseFloat(svg.getAttribute('width'));
    var h=parseFloat(svg.getAttribute('height'));
    if(!w||!h){
      var r=svg.getBoundingClientRect();
      w=w||r.width||140;
      h=h||r.height||140;
    }
    svg._bw183=w; svg._bh183=h;
  }
  return {w:svg._bw183,h:svg._bh183};
}
function applySameScale183(scale){
  var el=$('patterns'); if(!el) return;
  el.classList.add('il183-same');
  el.querySelectorAll('.pat-art svg, .pat-art .lamp-art63').forEach(function(svg){
    svg.style.transform='';
    svg.style.transformOrigin='';
    svg.style.width='';
    svg.style.height='';
  });
  var prompt=el.querySelector('[data-same-prompt] svg');
  if(!prompt) return;
  var b=promptBase183(prompt);
  prompt.style.transform='';
  prompt.style.width=(b.w*scale)+'px';
  prompt.style.height=(b.h*scale)+'px';
}
function currentSameScale183(el){
  el=el||$('patterns');
  var n=parseFloat(el&&el.getAttribute('data-same-scale-183'));
  return isFinite(n)?n:1;
}
function setSameScale183(scale){
  var el=$('patterns'); if(!el) return 1;
  scale=Math.max(0.6,Math.min(1.8,scale));
  scale=Math.round(scale*10)/10;
  el.setAttribute('data-same-scale-183',String(scale));
  applySameScale183(scale);
  return scale;
}
function bindSameScale183(){
  var el=$('patterns');
  if(!el||!el.querySelector('[data-same181]')) return;
  el.classList.add('il183-same');
  var scale=currentSameScale183(el);
  el.querySelectorAll('[data-same181-sz]').forEach(function(b){
    b.onclick=function(){
      setSameScale183(currentSameScale183(el)+(+b.getAttribute('data-same181-sz'))*0.2);
    };
  });
  var rst=el.querySelector('[data-g181reset="same"]');
  if(rst){
    rst.onclick=function(){
      var fam=null;
      var box=el.querySelector('[data-same181]');
      if(box) fam=box.getAttribute('data-fam');
      setSameScale183(1);
      if(typeof patSameDraw106==='function'&&fam) patSameDraw106(fam);
      else if(typeof patSameDraw106==='function') patSameDraw106();
    };
  }
  applySameScale183(scale);
}
function wrapSame183(){
  hook('patSameDraw106',function(prev){
    return function(fam){
      var r=prev.apply(this,arguments);
      try{
        if(fam){
          var el=$('patterns');
          if(el) el.setAttribute('data-same-scale-183','1');
          bindSameScale183();
        }
      }catch(e){}
      return r;
    };
  });
}
function watchSame183(){
  if(watchSame183._on) return;
  watchSame183._on=1;
  document.addEventListener('click',function(ev){
    var t=ev.target&&ev.target.closest?ev.target.closest('[data-same181-sz]'):null;
    if(!t) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    var el=$('patterns');
    setSameScale183(currentSameScale183(el)+(+t.getAttribute('data-same181-sz'))*0.2);
  },true);
  var obs=new MutationObserver(function(){
    try{
      if(typeof PAT106==='object'&&PAT106.unit==='same'&&$('patterns')&&$('patterns').querySelector('[data-same181]')){
        bindSameScale183();
      }
    }catch(e){}
  });
  var host=$('patterns')||document.body;
  if(host) obs.observe(host,{childList:true,subtree:true});
}

function install(){
  css183();
  wrapPatOpen183();
  wrapSame183();
  watchSame183();
  try{
    if(typeof PAT106==='object'&&PAT106.unit==='same') bindSameScale183();
  }catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL183={
  version:183,
  stopSoundTone:stopSoundTone183,
  applySameScale:applySameScale183,
  bindSameScale:bindSameScale183,
  setSameScale:setSameScale183
};
root.stopSoundTone183=stopSoundTone183;

})(typeof window!=='undefined'?window:this);
