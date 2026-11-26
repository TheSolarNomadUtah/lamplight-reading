/* v188: pre-launch cleanup, part 1 (safety net).
   The only visible change: a small, quiet "Version 188" line at the very bottom of
   Grown-ups, so a parent (or QA) can tell which build a device is running.
   - Reads APP_VERSION; nothing is fetched, nothing is stored.
   - The word "Version" is its own text node, so the existing i18n pass translates it
     from lang/<code>.json ("Version" key); the number stays as digits.
   - Grown-ups is re-rendered by many older files (renderAdults / RENDER.adults wraps,
     late cards such as Grow a Fractal). A MutationObserver on #adults keeps exactly one
     line and keeps it last, so no later paint can drop it or push it mid-page (LESSON 19).
   - Colour is the page's own --soft ink (C9 contrast checked in every look and theme). */
(function(root){
'use strict';
var ID='ver188';
function ver(){try{return typeof APP_VERSION==='number'?APP_VERSION:188}catch(e){return 188}}
function css(){
  if(document.getElementById('ver188css'))return;
  var s=document.createElement('style');s.id='ver188css';
  s.textContent='#adults .ver188{text-align:center;margin:1.4rem 0 .6rem;letter-spacing:.02em}';
  document.head.appendChild(s);
}
function line(){
  var p=document.createElement('p');
  p.id=ID;p.className='soft ver188';
  var w=document.createElement('span');w.className='ver188-w';w.textContent='Version';
  p.appendChild(w);p.appendChild(document.createTextNode(' '+ver()));
  return p;
}
function keep(){
  var a=document.getElementById('adults');if(!a)return;
  var all=a.querySelectorAll('.ver188');
  for(var i=1;i<all.length;i++)all[i].remove();
  var el=all[0];
  if(!el){el=line();a.appendChild(el);return}
  if(a.lastElementChild!==el)a.appendChild(el);
}
var obs=null;
function boot(){
  var a=document.getElementById('adults');if(!a)return;
  css();keep();
  if(!obs&&typeof MutationObserver==='function'){
    obs=new MutationObserver(function(){keep()});
    obs.observe(a,{childList:true});
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
root.addEventListener&&root.addEventListener('load',boot);
root.IL188=root.IL188||{version:188};
root.IL188.versionLine=keep;
})(typeof window!=='undefined'?window:globalThis);
