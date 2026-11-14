/* v152: Enter in a recipe box uses the strict v151 loader, not v150's loose one. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function grow(){return (typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v152)return;
  var next=wrap(prev);
  next._v152=1;
  next._base=prev._base||prev;
  root[name]=next;
}
function cantRead(){return t("Hmm, I can't read that code.")}
function parseCode(vals){
  if(typeof IL151==='object'&&typeof IL151.parseCode==='function')return IL151.parseCode(vals);
  return null;
}
function applyCode(rec){
  if(typeof IL151==='object'&&typeof IL151.applyCode==='function')return IL151.applyCode(rec);
}
function bindEnter(){
  var el=typeof $==='function'?$('patterns'):document.getElementById('patterns');
  if(!el)return;
  var box=el.querySelector('[data-gafload150]');
  if(!box)return;
  if(!box._v152){
    var neu=box.cloneNode(true);
    box.parentNode.replaceChild(neu,box);
    box=neu;
    box._v152=1;
    function run(){
      var vals=[].map.call(box.querySelectorAll('[data-gafn]'),function(inp){return inp.value});
      var rec=parseCode(vals),msg=box.querySelector('[data-gafloadmsg]');
      if(!rec){if(msg){msg.hidden=false;msg.textContent=cantRead()}return}
      if(msg){msg.hidden=true;msg.textContent=''}
      applyCode(rec);
    }
    function onKey(ev){
      if(ev.key!=='Enter')return;
      ev.preventDefault();
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      run();
    }
    var go=box.querySelector('[data-gafloadgo]');
    if(go)go.onclick=run;
    box.addEventListener('keydown',onKey,true);
    [].forEach.call(box.querySelectorAll('[data-gafn]'),function(inp){
      inp.addEventListener('keydown',onKey);
    });
  }
}
function install(){
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{bindEnter()}catch(ex){}
      return r;
    };
  });
  if(document.getElementById('patterns'))try{bindEnter()}catch(ex){}
}
root.IL152={version:152,install:install,bindEnter:bindEnter};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
