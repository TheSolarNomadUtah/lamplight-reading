/* v114: Patterns Everywhere Explore-tile label size, plus Sky Tonight
   wording for the years with no bright North Star (Kochab nearest).
   Do not wrap show(). */
(function(){
'use strict';

const WN114="The Patterns Everywhere tile now uses the same label size as the other Explore tiles. On Sky Tonight’s all-time slider, from about 1590 BCE to 380 CE, it says there was no bright North Star then, and that Kochab was nearest (about 6.4 degrees at its closest).";

function skyT114(en,es){
 try{if((typeof LANG!=='undefined'&&LANG==='es')||(typeof lang!=='undefined'&&lang==='es'))return es||en}catch(e){}
 return en;
}
function gT114(s){return typeof gT==='function'?gT(s):s}

function whatsNewText114(){return gT114(WN114)}
function whatsNewAttach114(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root)return;
 const old=root.querySelector('[data-whatsnew101], [data-whatsnew111], [data-whatsnew112], [data-whatsnew113], [data-whatsnew114]');
 if(old){
  const p=old.querySelector('p');
  if(p)p.textContent=whatsNewText114();
  old.setAttribute('data-whatsnew114','1');
  return;
 }
 try{if(typeof LS==='object'&&LS.get&&LS.get('lamp_whatsnew114'))return}catch(e){}
 if(root.querySelector('[data-whatsnew114]'))return;
 const html=`<div class="card whatsnew101" data-whatsnew114="1"><h2>${gT114("What's new")}</h2>
<p>${whatsNewText114()}</p>
<p><button type="button" class="p" onclick="whatsNewDismiss114()">${gT114('OK')}</button></p></div>`;
 root.insertAdjacentHTML('afterbegin',html);
}
function whatsNewDismiss114(){
 try{if(typeof LS==='object'&&LS.set)LS.set('lamp_whatsnew114','1')}catch(e){}
 const el=document.querySelector('[data-whatsnew114], [data-whatsnew113], [data-whatsnew112], [data-whatsnew111], [data-whatsnew101]');
 if(el)el.remove();
}
function skyAdultNote114(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 const card=root&&root.querySelector('[data-skyhelp112]');
 if(!card||card.querySelector('[data-skyhelp114]'))return;
 const p=document.createElement('p');
 p.className='soft';
 p.setAttribute('data-skyhelp114','1');
 p.textContent=skyT114(
  'From about 1590 BCE to 380 CE there was no bright North Star. Kochab, in the Little Bear, was nearest — about 6.4 degrees from the pole at its closest.',
  'Desde unos 1590 a. e. c. hasta 380 e. c. no hubo una Estrella Polar brillante. Kochab, en la Osa Menor, era la más cercana: a unos 6,4 grados del polo en su momento más cercano.'
 );
 card.appendChild(p);
}

function injectCss114(){
 if(document.getElementById('v114css'))return;
 const s=document.createElement('style');
 s.id='v114css';
 // .hubtile span{font-size:2.6rem} is the icon rule. Label spans with a class
 // (kline, or any leftover word label) inherit the tile size instead.
 s.textContent='.hubtile span.kline,.hubtile span.tlabel114{font-size:inherit;line-height:1.25}#patterns .hubtile>span,#math .math-units .hubtile>span{font-size:inherit;line-height:1.25}';
 document.head.appendChild(s);
}

function isIconOrArt114(el){
 if(!el||el.nodeType!==1)return false;
 if(el.tagName==='SVG'||el.tagName==='SMALL')return true;
 if(el.classList&&(el.classList.contains('lamp-art63')||el.classList.contains('picture63')))return true;
 if(el.querySelector&&el.querySelector('svg,.lamp-art63,.picture63'))return true;
 const t=(el.textContent||'').trim();
 return t.length<=4&&!/[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]/.test(t);
}
function unwrapBareLabelSpans114(root){
 const tiles=(root||document).querySelectorAll('#hub .explore71 .hubtile, #hub .hubtile, #patterns .hubtile, #math .math-units .hubtile');
 tiles.forEach(tile=>{
  [...tile.children].forEach(sp=>{
   if(sp.tagName!=='SPAN')return;
   if(sp.classList.contains('kline')||sp.classList.contains('tlabel114')||sp.classList.contains('picture63'))return;
   if(isIconOrArt114(sp))return;
   const t=sp.textContent;
   if(!t||!/[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]/.test(t))return;
   sp.replaceWith(document.createTextNode(t));
  });
 });
}

function hook114(){
 injectCss114();
 if(typeof showImpl97==='function'){
  const prev=showImpl97;
  showImpl97=function(id){
   const r=prev.apply(this,arguments);
   try{
    injectCss114();
    if(id==='hub')unwrapBareLabelSpans114();
    if(id==='adults'){whatsNewAttach114();skyAdultNote114()}
   }catch(e){}
   return r;
  };
 }
 if(typeof afterShow95==='function'){
  const prev=afterShow95;
  afterShow95=function(id){
   const r=prev.apply(this,arguments);
   try{
    injectCss114();
    if(id==='hub'||id==='patterns'||id==='math')unwrapBareLabelSpans114();
   }catch(e){}
   return r;
  };
 }
 if(typeof renderHub==='function'){
  const prev=renderHub;
  renderHub=function(){
   const r=prev.apply(this,arguments);
   try{injectCss114();unwrapBareLabelSpans114()}catch(e){}
   return r;
  };
 }
 const ra=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof ra==='function'){
  renderAdults=function(){const r=ra.apply(this,arguments);try{whatsNewAttach114();skyAdultNote114()}catch(e){}return r};
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{try{injectCss114();unwrapBareLabelSpans114()}catch(e){}});
 else try{injectCss114();unwrapBareLabelSpans114()}catch(e){}
}

hook114();
window.whatsNewText114=whatsNewText114;
window.whatsNewDismiss114=whatsNewDismiss114;
})();
