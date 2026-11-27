/* v190: fix release (QA v189 report). Approved by Ignacio 2026-11-27 12:51 PM MT ("Ship the fixes first, then part 3").
   - sw.js: upgrade race (LESSON 23): a late-activating older worker could wipe this version's core cache, so an
     upgraded device showed the browser's offline page. Cache lamplight-v190.
   - Help "Load progress file" readable in every look; drawn icons replace the arrow emoji on that card and the
     iPhone Share emoji; the Grown-ups hidden turtle no longer sits on the "What's new" heading.
   - The quiet Grown-ups version line reads 190 (APP_VERSION in index.html). Spanish text unchanged. */
/* v190 fixes (QA v189 report items 2 and 3). Paste as an IIFE at the end of the next vNN.js.
   1. Help > "Load progress file" (move.js label.button) had a hardcoded cream fill (#e9e1cf) and inherited
      the page ink, so it read cream on cream in Night, High contrast and custom dark. It now uses the same
      --card / --ink pair (and border) as every other button in every look.
   2. The emoji arrows on that card (Save / Load progress file) and the emoji in the iPhone install line
      ("tap the Share button ...") become small drawn icons. Art only: no words change, Spanish stays frozen.
      The swap runs after translation (deferred past the i18n MutationObserver), so the translated text is untouched.
   3. Grown-ups hidden turtle (#adults>.turtle105) no longer sits on the "W" of "What's new" (it did at 390 and 1280). */
(function(){
'use strict';
if(typeof document==='undefined')return;
var UP='\u2B06\uFE0F',DOWN='\u2B07\uFE0F',UP1='\u2B06',DOWN1='\u2B07';
/* Tray + arrow, the app's line style: round caps, currentColor so it always matches the button ink. */
function tray(dir){
 var arrow=dir==='up'?'M10 12.6V3.4M6.3 6.9 10 3.2l3.7 3.7':'M10 3.2v9.2M6.3 8.9 10 12.6l3.7-3.7';
 return '<svg class="ic190" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="'+arrow+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.6 11.8v3.1c0 .9.7 1.6 1.6 1.6h9.6c.9 0 1.6-.7 1.6-1.6v-3.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="14.3" r=".95" fill="#c28500"/></svg>';
}
/* Safari's Share icon: an open-topped square with an arrow leaving it, drawn in the same line style, all in the
   text ink so it reads at 3:1+ in every look (the gold accent fell to 2.9:1 on sepia). */
function share(){
 return '<svg class="ic190 share190" viewBox="0 0 20 20" role="img" aria-label="Share" focusable="false"><path d="M7.2 7.6H5.6c-.9 0-1.6.7-1.6 1.6v7.1c0 .9.7 1.6 1.6 1.6h8.8c.9 0 1.6-.7 1.6-1.6V9.2c0-.9-.7-1.6-1.6-1.6h-1.6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 12.2V2.6M6.9 5.6 10 2.5l3.1 3.1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
function css(){
 if(document.getElementById('fix190css'))return;
 var s=document.createElement('style');s.id='fix190css';
 s.textContent=
  /* same pair as the app's base button rule; html prefix beats move.js's plain label.button */
  'html label.button{background:var(--card);color:var(--ink);border:1px solid #d8cdb8;border-radius:10px;padding:8px 14px;font:inherit;line-height:1.3;cursor:pointer;opacity:1}'+
  'html #mvbar label.button{background:#fffdf8;color:#3a2a10;border-color:#c9bfa8}'+
  'html label.button:focus-within{outline:3px solid var(--acc);outline-offset:2px}'+
  '.ic190{display:inline-block;width:1.05em;height:1.05em;vertical-align:-.17em;margin-inline-end:.3em;flex:none}'+
  '.share190{margin-inline-start:.12em;margin-inline-end:.04em}'+
  'html #about label.button{margin:6px 0 4px}'+
  /* Grown-ups turtle: tuck it into the open strip above the first card (right side), never over a heading.
     It was left:10px;top:8px, which put it on the W of "What's new" (390 and 1280). */
  '#adults>.turtle105{left:auto;right:6px;top:-31px;width:26px;height:29px}'+
  '[dir=rtl] #adults>.turtle105{right:auto;left:6px}';
 document.head.appendChild(s);
}
function langReady(){try{return typeof LANG==='undefined'||LANG==='en'||(typeof DICT==='object'&&Object.keys(DICT).length>0)}catch(e){return true}}
/* Replace the leading arrow emoji in a control's own text node with the drawn icon. */
function iconize(el,dir){
 if(!el||el.querySelector('.ic190'))return false;
 for(var n=el.firstChild;n;n=n.nextSibling){
  if(n.nodeType!==3)continue;
  var v=n.nodeValue,e=dir==='up'?UP:DOWN,e1=dir==='up'?UP1:DOWN1,i=v.indexOf(e),len=e.length;
  if(i<0){i=v.indexOf(e1);len=1}
  if(i<0)continue;
  var rest=v.slice(i+len).replace(/^\s+/,'');
  n.nodeValue=v.slice(0,i)+rest;
  var t=document.createElement('template');t.innerHTML=tray(dir);
  el.insertBefore(t.content.firstChild,n);return true;
 }
 return false;
}
/* iPhone line: split the (already translated) text node at the emoji and drop in the Share icon. */
function shareIcon(p){
 if(!p||p.querySelector('.share190'))return false;
 var w=document.createTreeWalker(p,NodeFilter.SHOW_TEXT,null),n;
 while((n=w.nextNode())){
  var i=n.nodeValue.indexOf(UP),len=2;if(i<0){i=n.nodeValue.indexOf(UP1);len=1}
  if(i<0)continue;
  var after=n.splitText(i);after.nodeValue=after.nodeValue.slice(len);
  var t=document.createElement('template');t.innerHTML=share();
  n.parentNode.insertBefore(t.content.firstChild,after);return true;
 }
 return false;
}
var queued=0,tries=0;
function pass(){
 queued=0;
 if(!langReady()){if(tries++<40)later(250);return}
 tries=0;
 try{
  var ls=document.querySelectorAll('label.button');
  for(var i=0;i<ls.length;i++){if(ls[i].querySelector('input[type=file]'))iconize(ls[i],'up')}
  var bs=document.querySelectorAll('#about button[onclick^="exportAll"],#mvbar button[onclick^="exportAll"]');
  for(var j=0;j<bs.length;j++){if(bs[j].parentNode&&bs[j].parentNode.querySelector('label.button'))iconize(bs[j],'down')}
  var ps=document.querySelectorAll('#offcard details p');
  for(var k=0;k<ps.length;k++){if(ps[k].textContent.indexOf(UP1)>=0)shareIcon(ps[k])}
 }catch(e){}
}
function later(ms){if(queued)return;queued=1;setTimeout(pass,ms||0)}
css();
try{new MutationObserver(function(){later(0)}).observe(document.body||document.documentElement,{childList:true,subtree:true})}catch(e){}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){css();later(0)});else later(0);
window.addEventListener('load',function(){later(0)});
window.FIX190={pass:pass,version:190};
})();
