// v100: one retirement-policy module.
//
// Canonical lists and filters for every v54-era retired feature (Star songs,
// Cymatica, Sound Lab, Sound Shapes, Number Music entry points, Hum & match,
// Make a song, Note Blocks, “Say the words”, leftover Music-hub tiles, and
// Grown-ups / Look settings leftovers). Effective behavior is the same:
// those features stay hidden, and every redirect still works.
//
// This file uses data filters (GHUB keys, data-g, known ids and classes)
// and function stubs. It does not add CSS that matches onclick text.
// Old onclick CSS in v54 / v56 / v57 / v92 is left in place as a
// mid-load belt — removing it in the same step is how Sound Lab leaked
// once before.
//
// show() redirects already live in showImpl97 (lab / starsongs / cymatica /
// cymatics / numbers → Home, music → Games, closer / echo when their
// flags are off). This module does not wrap show(), so the v99 history
// wrap stays outermost (show === showHist99, show._v99 and show._v97).
//
// Mid-load: v54–v58, v63 tidy, drum63 hide, and v92 trim still run as
// they did, then delegate here once this file has loaded.

const RETIRED100=new Set(['lab','star','cym','cymatics','starsongs','cymatica']);
const RETIRED_ACT100=/show\('(lab|starsongs|cymatica|cymatics)'\)|pOpen71\('(lab|star|cym|cymatics|starsongs|cymatica)'\)|labSetOn/;
const RETIRED_MU100=/MU=\{v:'(hum|make|compose)'\}/;
const SAY_WORDS100=/Say the words|Di las palabras|قل الكلمات/;
const ABOUT_OLD100=/Hum &(amp;)? match|Tararea|همهم/;

function ghTrim100(){
 if(typeof GHUB==='undefined'||!Array.isArray(GHUB))return;
 for(let i=GHUB.length-1;i>=0;i--){
  const row=GHUB[i],k=row&&row[0],act=String(row&&row[5]||'');
  if(RETIRED100.has(k)||RETIRED_ACT100.test(act))GHUB.splice(i,1);
 }
 if(typeof P71!=='undefined'&&P71.actions){
  for(const k of RETIRED100)delete P71.actions[k];
 }
}

function retireDom100(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('.labtoggle,[data-g="lab"],[data-g="star"],[data-g="cym"],[data-g="cymatics"],[data-stars],[data-starsongs],[data-cymatica],.labtile').forEach(el=>el.remove());
 root.querySelectorAll('[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(!(RETIRED_ACT100.test(on)||RETIRED_MU100.test(on)))return;
  const wrap=el.closest('.hubtile,.card.labtoggle,.labtoggle');
  (wrap||el).remove();
 });
}

function settingsTidy100(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('#singcard,#singlink,#spick,.labtoggle,.singcredit,[data-sing],[onchange*="lamp_singmode"]').forEach(el=>{
  const row=el.closest('label');
  (row||el).hidden=true;
 });
 root.querySelectorAll('[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(/show\('(lab|starsongs|cymatica|cymatics|numbers)'\)|labSetOn|singSample|lamp_singer/.test(on))el.hidden=true;
 });
}

function musicHide100(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(/show\('music'\)|singPlay\(|MU[.={]/.test(on))el.hidden=true;
 });
 const cards=[...(root.matches&&root.matches('.card')?[root]:[]),...root.querySelectorAll('.card')];
 cards.forEach(card=>{
  const links=[...card.querySelectorAll('[onclick]')];
  if(links.length&&links.some(el=>/show\('music'\)|singPlay\(|MU[.={]/.test(el.getAttribute('onclick')||''))&&links.every(el=>el.hidden))card.hidden=true;
 });
}

function aboutClean100(){
 const a=typeof $==='function'&&$('about');
 if(a)a.querySelectorAll('p.soft').forEach(p=>{if(ABOUT_OLD100.test(p.textContent))p.remove()});
}

function sayWords100(root){
 if(!root||!root.querySelectorAll)return;
 root.querySelectorAll('[onclick="singPlay(true)"]').forEach(b=>b.remove());
 root.querySelectorAll('p.soft').forEach(p=>{if(SAY_WORDS100.test(p.textContent))p.remove()});
}

function labSetOn100(on){
 ghTrim100();
 document.querySelectorAll('.labtoggle').forEach(el=>el.remove());
}
function labSetOn(on){return labSetOn100(on)}

function installPOpen100(){
 if(typeof pOpen71!=='function'||pOpen71._v100)return;
 const prev=pOpen71;
 pOpen71=function(key){
  if(RETIRED100.has(key))return;
  return prev.apply(this,arguments);
 };
 pOpen71._v100=1;
 pOpen71._v92=1;
}

function installMusic100(){
 if(typeof renderMusic!=='function'||renderMusic._v100)return;
 const rm=renderMusic;
 renderMusic=function(){
  if(typeof MU==='object'&&MU&&['hum','make','compose'].includes(MU.v))MU={v:null};
  const r=rm.apply(this,arguments);
  const el=typeof $==='function'&&$('music');
  if(el){sayWords100(el);musicHide100(el)}
  return r;
 };
 renderMusic._v100=1;
 if(typeof RENDER==='object')RENDER.music=renderMusic;
}

function installRender100(){
 if(typeof RENDER!=='object')return;
 for(const name of ['games','adults','hub','music','look']){
  const fn=RENDER[name];
  if(typeof fn!=='function'||fn._v100retire)continue;
  RENDER[name]=function(){
   if(name==='games')ghTrim100();
   const r=fn.apply(this,arguments);
   const el=typeof $==='function'&&$(name);
   if(name==='games'||name==='hub'){retireDom100(el||document.body);if(el)musicHide100(el)}
   if(name==='adults'||name==='look'){settingsTidy100(el);retireDom100(el)}
   if(name==='music'&&el){sayWords100(el);musicHide100(el)}
   return r;
  };
  RENDER[name]._v100retire=1;
  try{
   if(name==='hub'&&typeof renderHub==='function')renderHub=RENDER.hub;
   if(name==='music'&&typeof renderMusic==='function')renderMusic=RENDER.music;
   if(name==='adults'&&typeof renderAdults==='function')renderAdults=RENDER.adults;
   if(name==='look'&&typeof renderLook==='function')renderLook=RENDER.look;
  }catch(e){}
 }
}

function boot100(){
 if(boot100._on)return;
 boot100._on=1;
 ghTrim100();
 installPOpen100();
 installMusic100();
 installRender100();
 aboutClean100();
 ['games','adults','hub','music','look','about'].forEach(id=>{
  const el=typeof $==='function'&&$(id);
  if(!el||el.classList.contains('hidden'))return;
  retireDom100(el);
  if(id==='adults'||id==='look')settingsTidy100(el);
  if(id==='hub'||id==='music'||id==='games')musicHide100(el);
  if(id==='music')sayWords100(el);
  if(id==='about')aboutClean100();
 });
}

installPOpen100();
ghTrim100();
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',boot100);
}else{
 boot100();
}
setTimeout(boot100,0);
