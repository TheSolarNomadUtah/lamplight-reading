// SPDX-License-Identifier: GPL-3.0-or-later
/* v126: "Tell us" card in Grown-ups (mailto only; the app sends nothing
 * and keeps no answers), plus Pi's Sunflower disc growth in the optional
 * 34-seed mode and a plain true flag for lamp_earn124. */
(function(){
'use strict';

const ADDR126='scout.nomad+seedfeedback@mail.grokbot.com';
const Q126=[
 'What did your kid love?',
 'What did they skip?',
 'What was confusing?'
];
const NOTE126='This opens your own email. The app sends nothing and keeps no answers.';

if(typeof document!=='undefined'&&!document.getElementById('v126css')){
 const s=document.createElement('style');s.id='v126css';
 s.textContent=`
#adults .tell-art126{display:block;width:80px;height:56px;margin:0 0 .4rem}
#adults [data-tell126] a{display:inline-flex;align-items:center;min-height:44px;padding:0 .15rem;color:inherit;font-weight:700;text-underline-offset:3px}
#adults [data-tell126] ol{margin:.4rem 0 .7rem;padding-left:1.3rem}
#adults [data-tell126] li{margin:.25rem 0}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t126(s,o){return typeof gT==='function'?gT(s,o):s}
function e126(s){return typeof esc==='function'?esc(String(s)):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

function mailto126(){
 const qs=Q126.map(q=>t126(q));
 const subject=qs.join(' ');
 const body=qs.join('\n\n')+'\n\n';
 return 'mailto:'+ADDR126+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}

function art126(){
 return `<svg class="tell-art126" viewBox="0 0 80 56" width="80" height="56" aria-hidden="true" focusable="false"><rect x="10" y="14" width="60" height="36" rx="4" fill="#2a2430" stroke="#d4b483" stroke-width="1.2"/><path d="M12 16l28 18 28-18" fill="none" stroke="#e6b454" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 48l20-16M68 48L48 32" fill="none" stroke="#c4b8a4" stroke-width="1.2"/><circle cx="40" cy="12" r="6" fill="#e6b454"/><path d="M40 7.5c0-2.2 1.7-4 3.7-4s3.7 1.8 3.7 4c0 1.5-.9 2.6-1.9 3.3v1.6h-3.6V10.8c-1-.7-1.9-1.8-1.9-3.3z" fill="#fff6d8"/></svg>`;
}

function root126(){return typeof $==='function'?$('adults'):document.getElementById('adults')}

function attach126(){
 const root=root126();
 if(!root||root.querySelector('[data-tell126]'))return;
 if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
 const qs=Q126.map(q=>`<li>${e126(t126(q))}</li>`).join('');
 const href=mailto126();
 const html=`<div class="card" data-tell126="1"><h3 class="kline">${e126(t126('Tell us'))}</h3>${art126()}<ol>${qs}</ol><p class="soft">${e126(t126(NOTE126))}</p><p><a href="${e126(href)}">${e126(t126('Open your email'))}</a></p></div>`;
 root.insertAdjacentHTML('beforeend',html);
}

function hookAdults126(){
 const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{attach126()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 const prevShow=typeof afterShow95==='function'?afterShow95:null;
 if(typeof prevShow==='function'&&!prevShow._v126){
  afterShow95=function(id){
   const r=prevShow.apply(this,arguments);
   try{if(id==='adults')attach126()}catch(e){}
   return r;
  };
  afterShow95._v126=1;
 }
}

function migrateEarn126(){
 const keys=[];
 try{
  for(let i=0;i<localStorage.length;i++){
   const k=localStorage.key(i);
   if(k&&k.indexOf('lamp_earn124@')===0)keys.push(k);
  }
 }catch(e){}
 const parse=typeof safeJSON==='function'?safeJSON:(s,d)=>{try{return JSON.parse(s)}catch(e){return d}};
 keys.forEach(k=>{
  try{
   const raw=typeof RAW!=='undefined'?RAW.get(k):localStorage.getItem(k);
   const o=parse(raw,null);
   if(!o||typeof o!=='object')return;
   const out={};let changed=false;
   Object.keys(o).forEach(id=>{
    const v=o[id];
    if(v===true)out[id]=true;
    else if(v){out[id]=true;changed=true}
   });
   if(changed&&typeof RAW!=='undefined')RAW.set(k,JSON.stringify(out));
  }catch(e){}
 });
}

try{migrateEarn126()}catch(e){}
hookAdults126();
window.IL126={attach:attach126,mailto:mailto126,ADDR:ADDR126,Q:Q126,NOTE:NOTE126,migrateEarn:migrateEarn126};
})();
