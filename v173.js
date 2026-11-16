/* v173: (1) Year Wheel card on Patterns Everywhere, opening year-wheel/ (standalone, offline, EN/ES).
   (2) F2: no dark square behind the friends. The round3 art painted a full #120E18 panel; make it
   invisible at load (opacity 0, same tag so v172 wise() still finds its Norma anchor), and fade the
   Bright core halo to 0 inside its shell so its square edge never shows. */
(function(){
'use strict';
var PANEL='<rect width="200" height="200" fill="#120E18"/>',CLEAR='<rect width="200" height="200" opacity="0" fill="#120E18"/>';
function strip(o,d){if(!o||d>5)return;for(var k in o){var v=o[k];if(typeof v==='string'){if(v.indexOf(PANEL)>=0)o[k]=v.split(PANEL).join(CLEAR)}else if(v&&typeof v==='object')strip(v,d+1)}}
try{if(window.IL165ART)strip(window.IL165ART.art,0);if(window.IL165ART&&window.IL165ART.starfig)strip(window.IL165ART.starfig,0)}catch(e){}
try{var st=document.createElement('style');st.id='v173css';st.textContent='.fx111-core-soft{-webkit-mask-image:radial-gradient(closest-side,#000 55%,transparent 100%);mask-image:radial-gradient(closest-side,#000 55%,transparent 100%)}#patterns .hubtile[data-pat="year"] svg{display:block;margin:0 auto 4px}';document.head.appendChild(st)}catch(e){}
function t(s){return typeof patT==='function'?patT(s):(typeof gT==='function'?gT(s):s)}
function lang(){try{return (typeof curLang==='function'&&curLang())||'en'}catch(e){return 'en'}}
var ART='<svg width="56" height="56" viewBox="-30 -30 60 60" aria-hidden="true"><g stroke="#72583f" stroke-width="1.2"><path d="M0 0L0-26A26 26 0 0 1 26 0Z" fill="#8cc98a"/><path d="M0 0L26 0A26 26 0 0 1 0 26Z" fill="#e6b454"/><path d="M0 0L0 26A26 26 0 0 1-26 0Z" fill="#e08a5a"/><path d="M0 0L-26 0A26 26 0 0 1 0-26Z" fill="#7aa7d8"/></g><circle r="10" fill="#1d1726" stroke="#72583f" stroke-width="1.2"/><circle r="4" fill="#ffe4a4"/></svg>';
function tile(){var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="year"]'))return;
 var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','year');
 b.innerHTML=ART+t('Year Wheel')+'<small>'+t('Months, seasons and holidays')+'</small>';
 b.onclick=function(){location.href='year-wheel/'+(lang()==='es'?'?lang=es':'')};
 var m=g.querySelector('[data-pat="moon"]');if(m&&m.nextSibling)g.insertBefore(b,m.nextSibling);else g.appendChild(b)}
if(typeof renderPatterns106==='function'){var rp=renderPatterns106;renderPatterns106=function(){var r=rp.apply(this,arguments);try{tile()}catch(e){}return r}}
if(typeof patOpen106==='function'){var po=patOpen106;patOpen106=function(u){var r=po.apply(this,arguments);if(!u)try{tile()}catch(e){}return r}}
if(typeof RENDER==='object'){var pr=RENDER.patterns;RENDER.patterns=function(){if(typeof pr==='function')pr();try{tile()}catch(e){}}}
})();

/* v173 F1: "A quiet tone" always stops: on its toggle, on leaving the screen, when the page is hidden,
   and when Soft sounds is off. Every voice is tracked, so a second start can't leave one orphaned. */
(function(){
'use strict';
if(typeof lullStart163!=='function')return;
var V=[];
function kill(v){try{var t=v.c.currentTime;v.g.gain.cancelScheduledValues(t);v.g.gain.setValueAtTime(v.g.gain.value,t);v.g.gain.linearRampToValueAtTime(0,t+.12);v.o.stop(t+.15);v.o2.stop(t+.15);setTimeout(function(){try{v.lp.disconnect();v.g.disconnect()}catch(e){}},400)}catch(e){}}
function stopAll(){var l=V.splice(0);l.forEach(kill);try{lull163=null}catch(e){}}
var st=lullStart163;
lullStart163=function(){stopAll();st.apply(this,arguments);try{if(lull163)V.push(lull163)}catch(e){}};
lullStop163=function(){stopAll()};
function off(){if(!V.length)return;stopAll();try{if(PAT106&&PAT106.ex)PAT106.ex.lull=false}catch(e){}
 document.querySelectorAll('[data-lull163].on').forEach(function(b){b.classList.remove('on');b.setAttribute('aria-pressed','false')})}
document.addEventListener('visibilitychange',function(){if(document.hidden)off()});
window.addEventListener('pagehide',off);
setInterval(function(){if(!V.length)return;
 var b=document.querySelector('[data-lull163].on');
 var soft=true;try{soft=sfxOn163()}catch(e){}
 if(!b||!b.offsetParent||!soft)off()},500);
})();
