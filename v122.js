// SPDX-License-Identifier: GPL-3.0-or-later
/* v122: Grown-ups Licenses section; license files are same-origin and offline. */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('il122css')){
 const s=document.createElement('style');s.id='il122css';
 s.textContent='[data-licenses122] h3{margin:.2rem 0 .5rem;font-size:1.05rem}[data-licenses122] a{color:inherit;font-weight:700;text-underline-offset:3px}[data-licenses122] a{display:inline-flex;align-items:center;min-height:44px;padding:0 .15rem}';
 (document.documentElement||document.head).appendChild(s);
}

function licensesHTML122(){
 const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
 return `<div class="card" data-licenses122="1"><h3 class="kline">${e(t('Licenses'))}</h3><p class="soft">${e(t('The app\'s code is licensed under GPL-3.0. The original stories, art, and lessons are licensed under CC BY-SA 4.0. Some pictures and data keep their own licenses, shown with the credits already in the app.'))}</p><p class="soft"><a href="LICENSES.md">${e(t('License map'))}</a> · <a href="LICENSE">${e(t('GPL-3.0'))}</a> · <a href="LICENSE-CONTENT">${e(t('CC BY-SA 4.0'))}</a></p></div>`;
}

function licensesAttach122(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root||root.querySelector('[data-licenses122]'))return;
 root.insertAdjacentHTML('beforeend',licensesHTML122());
}

{const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{licensesAttach122()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}

window.IL122={html:licensesHTML122,attach:licensesAttach122};
})();
