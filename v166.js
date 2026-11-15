(function(root){
'use strict';

function pid166(){
  try{return (typeof curPid==='function'&&curPid())||'p1'}catch(e){return 'p1'}
}
function laterKey166(pid){return 'il165-pick-later@'+(pid||pid166()||'p1')}
function laterHas166(pid){
  try{return sessionStorage.getItem(laterKey166(pid))==='1'}catch(e){return false}
}
function laterSet166(pid){
  try{sessionStorage.setItem(laterKey166(pid),'1')}catch(e){}
}
function laterClear166(pid){
  try{sessionStorage.removeItem(laterKey166(pid))}catch(e){}
}

var skipOffer166=false;

function withOfferSuppressed166(fn){
  var sentinel=null;
  var suppress=skipOffer166||laterHas166();
  if(suppress&&typeof document!=='undefined'){
    sentinel=document.createElement('dialog');
    sentinel.className='pickNeeded165';
    sentinel.setAttribute('data-il166-sentinel','1');
    sentinel.setAttribute('hidden','');
    sentinel.style.display='none';
    (document.documentElement||document.body).appendChild(sentinel);
  }
  try{return fn()}
  finally{if(sentinel&&sentinel.parentNode)sentinel.remove()}
}

function pickNeeded166(){
  try{
    var f=typeof friendsLoad101==='function'?friendsLoad101(pid166()):null;
    return !!(f&&f.pickNeeded165);
  }catch(e){return false}
}

function syncRetiredChrome166(){
  if(typeof document==='undefined')return;
  var hub=typeof $==='function'?$('hub'):document.getElementById('hub');
  if(!hub)return;
  var needed=pickNeeded166();
  var line=hub.querySelector('.friendLine101');
  var cap=hub.querySelector('.today64 .lamp73-figure figcaption, .lamp76-hero figcaption, .lamp73-figure figcaption');
  if(needed){
    if(line){line.textContent='';line.setAttribute('hidden','');line.setAttribute('data-il166-rest','1')}
    if(cap){cap.textContent='';cap.setAttribute('hidden','');cap.setAttribute('data-il166-rest','1')}
  }else{
    if(line&&line.getAttribute('data-il166-rest')){line.removeAttribute('hidden');line.removeAttribute('data-il166-rest')}
    if(cap&&cap.getAttribute('data-il166-rest')){cap.removeAttribute('hidden');cap.removeAttribute('data-il166-rest')}
  }
}

function hook166(){
  var prevLine=typeof friendLine101==='function'?friendLine101:null;
  if(prevLine&&!friendLine101._v166){
    friendLine101=function(){
      var out=withOfferSuppressed166(function(){return prevLine.apply(this,arguments)}.bind(this));
      try{syncRetiredChrome166()}catch(e){}
      return out;
    };
    friendLine101._v166=1;
    friendLine101._base=prevLine._base||prevLine;
  }

  var prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
  if(prevAttach&&!friendPickerAttach101._v166){
    friendPickerAttach101=function(){
      return withOfferSuppressed166(function(){return prevAttach.apply(this,arguments)}.bind(this));
    };
    friendPickerAttach101._v166=1;
    friendPickerAttach101._base=prevAttach._base||prevAttach;
  }

  var prevMount=typeof lampMountAll73==='function'?lampMountAll73:null;
  if(prevMount&&!lampMountAll73._v166){
    lampMountAll73=function(){
      var out=prevMount.apply(this,arguments);
      try{syncRetiredChrome166()}catch(e){}
      return out;
    };
    lampMountAll73._v166=1;
    lampMountAll73._base=prevMount._base||prevMount;
  }

  var prevPick=typeof friendPick101==='function'?friendPick101:null;
  if(prevPick&&!friendPick101._v166){
    friendPick101=function(id,pid){
      var who=pid||(typeof $==='function'&&$('pform')&&$('pform').dataset.pid73)||pid166();
      var out=prevPick.apply(this,arguments);
      laterClear166(who);
      try{syncRetiredChrome166()}catch(e){}
      return out;
    };
    friendPick101._v166=1;
    friendPick101._base=prevPick._base||prevPick;
  }

  if(typeof document!=='undefined'&&!document._il166OfferHook){
    document._il166OfferHook=1;
    document.addEventListener('click',function(ev){
      var t=ev.target;
      var later=t&&t.closest&&t.closest('dialog.pickNeeded165:not([data-il166-sentinel]) [data-go="later"]');
      if(later){laterSet166();return}
      var kids=t&&t.closest&&t.closest('dialog.pickNeeded165:not([data-il166-sentinel]) [data-go="kids"]');
      if(kids){
        skipOffer166=true;
        setTimeout(function(){skipOffer166=false},0);
      }
    },true);
    document.addEventListener('cancel',function(ev){
      var d=ev.target;
      if(d&&d.classList&&d.classList.contains('pickNeeded165')&&!d.getAttribute('data-il166-sentinel')){
        laterSet166();
      }
    },true);
  }

  try{syncRetiredChrome166()}catch(e){}
}

hook166();

root.IL166={
  version:166,
  laterKey:laterKey166,
  laterHas:laterHas166,
  laterSet:laterSet166,
  laterClear:laterClear166
};
})(typeof window!=='undefined'?window:this);
