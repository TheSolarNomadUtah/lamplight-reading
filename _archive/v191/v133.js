// SPDX-License-Identifier: GPL-3.0-or-later
/* v133: Grown-ups Print card — five ink-light SVG pages, window.print,
 * plus the same pages at /print/. Also relies on the visible “How long?”
 * heading added to the Lamp Breathing picker. Does not wrap show(). */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('v133css')){
 const s=document.createElement('style');s.id='v133css';
 s.textContent=`
#adults .print133-art{display:block;width:80px;height:56px;margin:0 0 .4rem}
#adults [data-print133] .print133-open,#printables .print133-btn{
  min-width:56px;min-height:56px}
#printables .print133-hub{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin:12px 0}
#printables .print133-hub .hubtile{min-height:140px}
#printables .print133-sheet{max-width:8.5in;margin:12px auto;background:#fff;border-radius:8px}
#printables .print133-sheet svg{display:block;width:100%;height:auto}
#printables .print133-row{display:flex;flex-wrap:wrap;gap:12px;margin:8px 0}
#printables a.print133-static{display:inline-flex;align-items:center;min-height:56px;padding:0 12px}
@page{size:letter portrait;margin:10mm}
@media print{
  header,nav,footer,.noprint,#pbar{display:none!important}
  html,body,#printables{background:#fff!important;color:#222!important}
  #printables{display:block!important;position:static!important}
  #printables .print133-sheet{margin:0;background:#fff;border:none;border-radius:0;page-break-after:always;break-after:page;box-shadow:none}
  #printables .print133-sheet:last-child{page-break-after:auto;break-after:auto}
}
`;
 (document.documentElement||document.head).appendChild(s);
}

if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('printables')<0)SECTIONS.push('printables');
if(typeof document!=='undefined'&&document.querySelector('main')&&!document.getElementById('printables')){
 document.querySelector('main').insertAdjacentHTML('beforeend','<section id="printables" class="hidden"></section>');
}

function t133(s,v){return typeof gT==='function'?gT(s,v):s}
function e133(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function lang133(){
 try{
  const L=(typeof LANG==='string'&&LANG)||(typeof curLang==='function'?curLang():'en');
  return L==='es'?'es':'en';
 }catch(e){return 'en'}
}
function P133(){return typeof LampPrint133==='object'?LampPrint133:null}

function art133(){
 const P=P133();
 if(P&&P.thumb) return `<span class="print133-art">${P.thumb('honeycomb')}</span>`;
 return '';
}

function attachCard133(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root||root.querySelector('[data-print133]'))return;
 if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
 const html=`<div class="card" data-print133="1"><h3 class="kline">${e133(t133('Print'))}</h3>${art133()}<p class="soft">${e133(t133('Five ink-light pages to print and use offline.'))}</p><p><button type="button" class="p print133-open" onclick="show('printables')">${e133(t133('Open'))}</button></p></div>`;
 root.insertAdjacentHTML('beforeend',html);
}

function hookAdults133(){
 const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'&&!prev._v133){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{attachCard133()}catch(e){}
   return r;
  };
  renderAdults._v133=1;
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 const prevShow=typeof afterShow95==='function'?afterShow95:null;
 if(typeof prevShow==='function'&&!prevShow._v133){
  afterShow95=function(id){
   const r=prevShow.apply(this,arguments);
   try{if(id==='adults')attachCard133()}catch(e){}
   return r;
  };
  afterShow95._v133=1;
 }
}

const ST133={id:null};

function file133(id,lang){
 const L=lang||lang133();
 if(id==='all')return L==='es'?'print/all.es.html':'print/all.html';
 if(id==='index')return L==='es'?'print/index.es.html':'print/index.html';
 return L==='es'?('print/'+id+'.es.html'):('print/'+id+'.html');
}

function renderPrint133(){
 const el=typeof $==='function'?$('printables'):document.getElementById('printables');
 if(!el)return;
 const P=P133();
 const L=lang133();
 if(ST133.id==='all'&&P){
  const sheets=P.pages(L).map(p=>`<div class="print133-sheet" data-print-id="${e133(p.id)}">${p.svg}</div>`).join('');
  el.innerHTML=`<div class="card noprint"><button type="button" onclick="Printables133.hub()">${e133(t133('Back'))}</button>
    <h2>${e133(t133('Print all five'))}</h2>
    <div class="print133-row">
      <button type="button" class="p print133-btn" onclick="Printables133.print()">${e133(t133('Print this page'))}</button>
      <a class="print133-static" href="${e133(file133('all',L))}">${e133(t133('Open as a page'))}</a>
    </div>
  </div>${sheets}`;
  return;
 }
 if(ST133.id&&P&&P.page(ST133.id,L)){
  const p=P.page(ST133.id,L);
  el.innerHTML=`<div class="card noprint"><button type="button" onclick="Printables133.hub()">${e133(t133('Back'))}</button>
    <h2>${e133(p.title)}</h2>
    <div class="print133-row">
      <button type="button" class="p print133-btn" onclick="Printables133.print()">${e133(t133('Print this page'))}</button>
      <a class="print133-static" href="${e133(file133(ST133.id,L))}">${e133(t133('Open as a page'))}</a>
    </div>
  </div><div class="print133-sheet" data-print-id="${e133(p.id)}">${p.svg}</div>`;
  return;
 }
 const tiles=P?P.IDS.map(id=>{
  return `<button type="button" class="hubtile" data-print-id="${e133(id)}" onclick="Printables133.open('${e133(id)}')">${P.thumb(id)}<span>${e133(P.titleOf(id,L))}</span></button>`;
 }).join(''):'';
 el.innerHTML=`<div class="card"><button type="button" onclick="show('adults')">${e133(t133('Grown-ups'))}</button>
  <h2>${e133(t133('Print'))}</h2>
  <p class="soft">${e133(t133('Five ink-light pages to print and use offline.'))}</p>
  <div class="print133-hub">${tiles}</div>
  <p><button type="button" class="p print133-btn" onclick="Printables133.open('all')">${e133(t133('Print all five'))}</button>
     <a class="print133-static" href="${e133(file133('index',L))}">${e133(t133('Open as a page'))}</a></p>
 </div>`;
}

function open133(id){
 ST133.id=(id==='all'||(P133()&&P133().IDS.indexOf(id)>=0))?id:null;
 if(typeof show==='function')show('printables');
 else renderPrint133();
}
function hub133(){ST133.id=null;renderPrint133()}
function print133(){try{window.print()}catch(e){}}

if(typeof RENDER==='object')RENDER.printables=renderPrint133;
hookAdults133();
window.Printables133={open:open133,hub:hub133,print:print133,render:renderPrint133,state:function(){return {id:ST133.id}},set:function(id){ST133.id=id||null;renderPrint133()}};
})();
