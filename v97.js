// v97: flatten the show() wrap chain (index / v10 through v95) into one function.
// Net behavior is kept, including retired redirects, Look Up onlookup, Lamp visit,
// Paint inpaint, v92 smoke, v95 after-show trim, and every other wrap side effect.
// Old wrap sites are guarded with show._v97 so delayed boots (v86, v90, v92) cannot
// double-wrap. This file loads last and re-installs on DOMContentLoaded and setTimeout(0).
//
// Call order (outer → inner), matching script load order of the wraps:
//   v95, v92, v90, v88, v85, v83, v81, v74, v73, v71, v68, v66, v65, v64,
//   drum63, v62, v61, v58, v56, v54, v44, v35, v32, v29, v28, v27, v24, v23,
//   v86, v16, v16-seq, v14, music.js, v10 core.
// After-effects run inner → outer. v64's music path and v65's echo+!CONTENT path
// call the inner chain with a different id, then still run outer afters with the
// id those outer wraps received (same as the previous closure chain).

let _showCur29=null;
let _showTm35=null;

function aboutClean58_97(){
 const OLD=/Hum &(amp;)? match|Tararea|همهم/;
 const a=$('about');
 if(a)a.querySelectorAll('p.soft').forEach(p=>{if(OLD.test(p.textContent))p.remove()});
}

function showCore10_97(id){
 try{if(id!=='solo')stopRead()}catch(e){}
 if(id!=='record')recStopAll();
 if(id!=='paint')document.body.classList.remove('painting');
 SECTIONS.forEach(x=>{const e=$(x);if(e)e.classList.toggle('hidden',x!==id)});
 render();
 if(RENDER[id])RENDER[id]();
 window.scrollTo(0,0);
}

function showFromDrum63_97(id){
 // drum63 before
 if(id==='music'){GM.v=null;id='games'}
 if(id!=='games'&&DP63.s){if(DP63.s.recording)dpFinishRecord63();dpStop63()}
 // v62
 if(id==='trace'&&!CONTENT.includes(LANG))id='hub';
 // v61
 if(id!=='games'){l61Clear();if(L61.s&&L61.s.k==='mm'){L61.s.open=[];L61.s.busy=false}}
 // v56
 if(id==='numbers')id='hub';
 // v54
 if(['starsongs','cymatica','lab','cymatics'].includes(id))id='hub';
 // v44
 if(id!=='lab')labStop();
 document.body.classList.toggle('inlab',id==='lab');
 // v32
 if(id==='arcade'&&!AR.v){GM.v=null;id='games'}
 // v29 (GROWN gate; v54 already redirected these, so this is usually a no-op)
 {const GROWN=['starsongs','cymatica'];
  if(GROWN.includes(id)&&!(_showCur29==='arcade'||_showCur29==='games'||GROWN.includes(_showCur29)))id='hub';
  _showCur29=id}
 // v28
 if(id!=='starsongs')sgStop();
 if(id!=='cymatica')cmStop();
 // v27
 if(id!=='games')gStop();
 // v23
 document.body.classList.toggle('inpaint',id==='paint');
 // v16
 if(id!=='numbers'){nmStop();toyStop()}
 if(id!=='paint')document.body.classList.remove('painting');
 // v16-seq
 if(id!=='music')sqStop();
 // v14
 if(id!=='cymatics')cyStop();
 if(id!=='bedtime')btStop();
 if(id!=='music')nbStop();
 // music.js
 if(id!=='music'){musicStop();humStop()}
 // v10 core
 showCore10_97(id);
 // afters, inner → outer, up through drum63
 document.body.classList.toggle('onlookup',id==='lookup');
 document.body.classList.toggle('onhub',id==='hub');
 {const f=$('fhome');if(f)f.style.removeProperty('display')}
 clearTimeout(_showTm35);
 if(id==='starsongs'||id==='cymatica'){
  const kind=id==='starsongs'?'stars':'cym',stay=id;
  _showTm35=setTimeout(()=>{if($(stay)&&!$(stay).classList.contains('hidden')){GLOW_IN=1;try{markDay(kind==='cym'?'cymatica':'stars')}finally{GLOW_IN=0}glowAdd(kind)}},30000);
 }
 if(id==='about')aboutClean58_97();
 retiredMusicHide63(document.body);
}

function showAfterOuter97(id){
 // v65, v66, v68, v71: no after (their work is in the before step)
 // v73 after — id is the one v73 received (after its home→hub redirect)
 if(id==='hub'){lampMountAll73();lampMaybeShow73()}
 pTrimSwitch74();
 // v81–v88: no after
 document.body.classList.toggle('onlook',id==='look');
 if(id==='hub')setTimeout(fxHomeSmoke92,0);
 afterShow95(id);
}

function showImpl97(id){
 // v95
 if(id==='echo'&&!echoEnabled95())id='hub';
 // v92
 if(id!=='look')document.querySelectorAll('#look .fx89-layer').forEach(n=>lampFxSmokeStop89(n));
 // v88
 if(id!=='songs88'&&typeof musicStop==='function'&&$('songs88')&&!$('songs88').classList.contains('hidden'))musicStop();
 // v85
 if(id!=='lookup')luClearNudge85();
 // v83
 if(id!=='lookup')LU83._open=false;
 // v81
 if(id==='closer'&&!lcEnabled81())id='hub';
 // v73
 if(id==='home')id='hub';
 if(id!=='hub'&&LAMP73.visit)lampMarkLeave73();
 // v71
 if(!['games','arcade'].includes(id)&&pCurrent71()){
  pStop68();pStop71();P71.game=null;P71.challenge=false;GM.rec=null;GM.cr=null;
  document.body.classList.remove('practice71');
 }
 // v68
 if(id!=='games'&&DP63.s?.recording)dpFinishRecord63();
 if(id==='log'&&!pVisible68('log')){P68.print=false;P68.notes=false;P68.report=curPid()}
 pTick68();
 if(P68.r&&id!==P68.r.section)pStop68('r');
 if(P68.g&&id!==P68.g.section)pStop68('g');
 document.body.classList.toggle('progress68',id==='log');
 // v66
 rewardClose66(false);
 // v65
 eStop65();
 E65.gen++;
 E65.slot=null;
 if(id==='echo'){
  try{musicStop();stopRead();calmMusic(false)}catch(e){}
  if(!CONTENT.includes(LANG)){
   // v65: return old('hub') — inner chain from v64 with hub; outer afters still see 'echo'
   showFromV64_97('hub');
   showAfterOuter97(id);
   return;
  }
 }
 showFromV64_97(id);
 showAfterOuter97(id);
}

function showFromV64_97(id){
 if(id==='home')id='hub';
 if(id==='arcade'&&!['scr','syl'].includes(AR.v)){GM.v=null;id='games'}
 if(id==='music'){
  DA64=null;GM.v=null;
  showFromDrum63_97('games');
  if(CONTENT.includes(LANG))dpStart63();
  return;
 }
 if(DA64&&(id!==DA64.section||DA64.pid!==curPid()))DA64=null;
 showFromDrum63_97(id);
}

function stampShow97(fn){
 fn._v97=1;fn._v86=1;fn._v88songs=1;fn._v90=1;fn._v92=1;
 return fn;
}

function installShow97(){
 if(show===showImpl97&&show._v97)return;
 show=stampShow97(showImpl97);
}
stampShow97(showImpl97);
installShow97();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installShow97);
else installShow97();
setTimeout(installShow97,0);
