/* v113: Sky Tonight math fixes from Professor Pi's v112 recheck.
   Core files are unchanged. The four patches live in v112.js:
   Alderamin in skyNorthCopy112, honest Thuban distance, setUTCFullYear
   years 0–98 CE, and a blended precess() / precessLong() handoff. */
(function(){
'use strict';

function skyT113(en,es){
 try{if((typeof LANG!=='undefined'&&LANG==='es')||(typeof lang!=='undefined'&&lang==='es'))return es||en}catch(e){}
 return en;
}
function whatsNewText113(){
 return (typeof gT==='function'?gT:(s=>s))("Sky Tonight now names the closest well-known pole star, including Alderamin around the year 7500, and the all-time slider moves more smoothly across long ages.");
}
function whatsNewAttach113(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root)return;
 const old=root.querySelector('[data-whatsnew101], [data-whatsnew111], [data-whatsnew112], [data-whatsnew113]');
 if(old){
  const p=old.querySelector('p');
  if(p)p.textContent=whatsNewText113();
  return;
 }
 try{if(typeof LS==='object'&&LS.get&&LS.get('lamp_whatsnew113'))return}catch(e){}
 if(root.querySelector('[data-whatsnew113]'))return;
 const html=`<div class="card whatsnew101" data-whatsnew113="1"><h2>${typeof gT==='function'?gT("What's new"):"What's new"}</h2>
<p>${whatsNewText113()}</p>
<p><button type="button" class="p" onclick="whatsNewDismiss113()">${typeof gT==='function'?gT('OK'):'OK'}</button></p></div>`;
 root.insertAdjacentHTML('afterbegin',html);
}
function whatsNewDismiss113(){
 try{if(typeof LS==='object'&&LS.set)LS.set('lamp_whatsnew113','1')}catch(e){}
 const el=document.querySelector('[data-whatsnew113], [data-whatsnew112], [data-whatsnew111], [data-whatsnew101]');
 if(el)el.remove();
}
function skyAdultNote113(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 const card=root&&root.querySelector('[data-skyhelp112]');
 if(!card||card.querySelector('[data-skyhelp113]'))return;
 const p=document.createElement('p');
 p.className='soft';
 p.setAttribute('data-skyhelp113','1');
 p.textContent=skyT113(
  'Around the year 7500, the closest well-known pole star is Alderamin, in Cepheus, about 2.36 degrees from the pole — closer than Deneb then. Thuban, around 2700 BCE, stood about 0.75 degrees from the pole.',
  'Hacia el año 7500, la estrella polar conocida más cercana es Alderamin, en Cefeo, a unos 2,36 grados del polo, más cerca que Deneb en esa época. Thuban, hacia el 2700 a. e. c., estuvo a unos 0,75 grados del polo.'
 );
 card.appendChild(p);
}

{if(typeof showImpl97==='function'){
 const prev=showImpl97;
 showImpl97=function(id){
  const r=prev.apply(this,arguments);
  try{if(id==='adults'){whatsNewAttach113();skyAdultNote113()}}catch(e){}
  return r;
 };
}}
{const ra=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof ra==='function'){
  renderAdults=function(){const r=ra.apply(this,arguments);try{whatsNewAttach113();skyAdultNote113()}catch(e){}return r};
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}

window.whatsNewText113=whatsNewText113;
window.whatsNewDismiss113=whatsNewDismiss113;
})();
