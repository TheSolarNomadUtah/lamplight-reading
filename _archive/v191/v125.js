// SPDX-License-Identifier: GPL-3.0-or-later
/* v125: Make it yours — a grown-up translation page behind the Grown-ups
 * gate. Device-only save, local Blob export, no live import, no accounts,
 * no child data. */
(function(){
'use strict';

const KEY125='lamp_yours125';
const GATE125='lamp_yours125_ok';
const UI_PAGE125=40;
const NOTE125='A volunteer reviewer checks a pack for meaning and kid safety before it can ship in a future free language pack, credited “translated by” as you choose.';
const STAY125='Everything on this page is saved on this device only. The app does not send it anywhere.';

if(typeof document!=='undefined'&&!document.getElementById('v125css')){
 const s=document.createElement('style');s.id='v125css';
 s.textContent=`
#adults .yours-art125{display:block;width:80px;height:56px;margin:0 0 .4rem}
#adults .yours-row125{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch;margin:.6rem 0}
@media (max-width:640px){#adults .yours-row125{grid-template-columns:1fr}}
#adults .yours-en125{white-space:pre-wrap;background:rgba(255,248,230,.06);border:1px solid rgba(230,180,84,.22);border-radius:12px;padding:10px;min-height:4.5em;color:inherit}
#adults .yours-row125 textarea,#adults .yours-meta125 input,#adults .yours-find125 input,#adults .yours-gate125 input{
  width:100%;min-height:44px;border-radius:12px;padding:10px;font:inherit;background:rgba(255,248,230,.08);color:inherit;border:1px solid rgba(230,180,84,.28);box-sizing:border-box}
#adults .yours-row125 textarea{min-height:4.5em;resize:vertical}
#adults .yours-tabs125{display:flex;flex-wrap:wrap;gap:8px;margin:.6rem 0}
#adults .yours-list125{display:flex;flex-direction:column;gap:6px;margin:.4rem 0}
#adults .yours-list125 button{text-align:left}
#adults .yours-in125{animation:yours125fade .7s ease both}
@keyframes yours125fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){
  #adults .yours-in125{animation:yours125fade .7s ease both;transform:none}
}
#adults .yours-turtle125{position:absolute;right:8px;bottom:8px;pointer-events:none;opacity:.85}
#adults .yours-wrap125{position:relative}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t125(s,o){return typeof gT==='function'?gT(s,o):s}
function e125(s){return typeof esc==='function'?esc(String(s)):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

function pages125(text){
 const raw=String(text||'').replace(/\r\n/g,'\n').trim();
 if(!raw)return [''];
 if(/\n\s*\n/.test(raw))return raw.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
 const lines=raw.split('\n');
 if(lines.length>1&&lines.every(l=>l.length<=80))return lines.map(x=>x.trim()).filter(Boolean);
 return [raw];
}

function catalog125(){
 const out=[],seen=new Set();
 const add=s=>{
  if(!s||!s.id||s.text==null||s.text==='')return;
  if(seen.has(s.id))return;
  if(/^(es_|d\d+_es_)/.test(s.id)||/_es_/.test(s.id))return;
  seen.add(s.id);
  out.push({id:s.id,t:s.t||s.id,pages:pages125(s.text)});
 };
 (window.S_CORE_EN||[]).forEach(add);
 if(typeof STORIES64==='object'&&Array.isArray(STORIES64.en))STORIES64.en.forEach(s=>{if(!s.ref)add(s)});
 if(typeof STORIES101==='object'&&Array.isArray(STORIES101.en))STORIES101.en.forEach(add);
 out.sort((a,b)=>String(a.t).localeCompare(String(b.t),'en',{sensitivity:'base'}));
 return out;
}

function load125(){
 try{
  const d=JSON.parse(RAW.get(KEY125)||'{}')||{};
  if(typeof d!=='object')return {language:'',by:'',stories:{},ui:{}};
  d.language=typeof d.language==='string'?d.language:'';
  d.by=typeof d.by==='string'?d.by:'';
  d.stories=d.stories&&typeof d.stories==='object'?d.stories:{};
  d.ui=d.ui&&typeof d.ui==='object'?d.ui:{};
  return d;
 }catch(e){return {language:'',by:'',stories:{},ui:{}}}
}
function save125(d){
 d=d||load125();
 d.at=new Date().toISOString();
 try{RAW.set(KEY125,JSON.stringify(d))}catch(e){}
}

let saveTimer125=0;
function touch125(){
 const root=$('adults');
 if(!root||!root.querySelector('[data-yours-editor125]'))return;
 const d=load125();
 const lang=root.querySelector('[data-yours-lang125]');
 const by=root.querySelector('[data-yours-by125]');
 if(lang)d.language=lang.value;
 if(by)d.by=by.value;
 const story=root.querySelector('[data-yours-story125]');
 if(story){
  const id=story.getAttribute('data-yours-story125');
  const title=story.querySelector('[data-yours-title125]');
  const pages=[...story.querySelectorAll('[data-yours-page125]')].map(el=>el.value);
  d.stories[id]={title:title?title.value:'',pages};
 }
 root.querySelectorAll('[data-yours-ui125]').forEach(el=>{
  const k=el.getAttribute('data-yours-ui125');
  if(!k)return;
  if(el.value)d.ui[k]=el.value;else delete d.ui[k];
 });
 clearTimeout(saveTimer125);
 saveTimer125=setTimeout(()=>save125(d),200);
}

function gated125(){try{return sessionStorage.getItem(GATE125)==='1'}catch(e){return false}}
function unlock125(){try{sessionStorage.setItem(GATE125,'1')}catch(e){}}

function quiz125(){
 const a=11+Math.floor(Math.random()*9);
 const b=6+Math.floor(Math.random()*13);
 return {a,b,sum:a+b};
}

function art125(){
 return `<svg class="yours-art125" viewBox="0 0 80 56" width="80" height="56" aria-hidden="true" focusable="false"><rect x="5" y="10" width="31" height="36" rx="3" fill="#2a2430" stroke="#d4b483" stroke-width="1.2"/><rect x="44" y="10" width="31" height="36" rx="3" fill="#2a2430" stroke="#d4b483" stroke-width="1.2"/><path d="M36 10v36" stroke="#e6b454" stroke-width="2"/><path d="M14 18h13M14 24h10M14 30h12" stroke="#c4b8a4" stroke-width="1.2" stroke-linecap="round"/><path d="M53 18h13M53 24h10M53 30h12" stroke="#c4b8a4" stroke-width="1.2" stroke-linecap="round"/><path d="M37.5 8.5c0-3.4 2.6-6 5.5-6s5.5 2.6 5.5 6c0 2.2-1.3 3.8-2.8 4.8v2.4h-5.4v-2.4c-1.5-1-2.8-2.6-2.8-4.8z" fill="#e6b454"/><circle cx="43" cy="7.2" r="2" fill="#fff6d8"/></svg>`;
}

function maybeTurtle125(root){
 if(Math.random()>0.2)return;
 if(typeof turtleArt105!=='function')return;
 const box=document.createElement('div');
 box.className='yours-turtle125';
 box.setAttribute('aria-hidden','true');
 box.innerHTML=turtleArt105('tuck',28,30);
 root.appendChild(box);
}

function root125(){return typeof $==='function'?$('adults'):document.getElementById('adults')}

function attach125(){
 const root=root125();
 if(!root||root.querySelector('[data-yours125]')||root.querySelector('[data-yours-editor125],[data-yours-gate125]'))return;
 const html=`<div class="card" data-yours125="1"><h3 class="kline">${e125(t125('Make it yours'))}</h3>${art125()}<p class="soft">${e125(t125(NOTE125))}</p><p class="soft">${e125(t125(STAY125))}</p><p><button class="p" data-yours-open125="1">${e125(t125('Open'))}</button></p></div>`;
 root.insertAdjacentHTML('beforeend',html);
 const btn=root.querySelector('[data-yours-open125]');
 if(btn)btn.addEventListener('click',()=>{if(gated125())openEditor125();else openGate125()});
}

function openGate125(){
 const root=root125();if(!root)return;
 const q=quiz125();
 root.setAttribute('data-yours-open','gate');
 root.innerHTML=`<div class="card yours-wrap125 yours-in125 yours-gate125" data-yours-gate125="1"><p><button type="button" data-yours-back125="1">${e125(t125('Back to Grown-ups'))}</button></p><h2 class="kline">${e125(t125('Make it yours'))}</h2><p>${e125(t125('What is {a} plus {b}?',{a:String(q.a),b:String(q.b)}))}</p><p><label class="soft">${e125(t125('Answer'))}<input type="number" inputmode="numeric" data-yours-ans125="1" aria-label="${e125(t125('Answer'))}"></label></p><p><button class="p" type="button" data-yours-go125="1">${e125(t125('Continue'))}</button></p><p class="soft" data-yours-hint125="1" hidden>${e125(t125('Try again'))}</p></div>`;
 root.querySelector('[data-yours-back125]').addEventListener('click',leave125);
 const go=()=>{
  const el=root.querySelector('[data-yours-ans125]');
  const n=Number(el&&el.value);
  if(n===q.sum){unlock125();openEditor125();return}
  const hint=root.querySelector('[data-yours-hint125]');
  if(hint)hint.hidden=false;
  const nq=quiz125();q.a=nq.a;q.b=nq.b;q.sum=nq.sum;
  const p=root.querySelector('h2').nextElementSibling;
  if(p)p.textContent=t125('What is {a} plus {b}?',{a:String(q.a),b:String(q.b)});
  if(el)el.value='';
 };
 root.querySelector('[data-yours-go125]').addEventListener('click',go);
 const ans=root.querySelector('[data-yours-ans125]');
 if(ans)ans.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();go()}});
}

function leave125(){
 const root=root125();
 if(root){root.removeAttribute('data-yours-open');}
 if(typeof renderAdults==='function')renderAdults();
}

let uiKeys125=null;
let uiFrom125=0;
let tab125='stories';
let storyId125=null;
let find125='';

function loadUiKeys125(cb){
 if(uiKeys125){cb(uiKeys125);return}
 const done=d=>{uiKeys125=Array.isArray(d)?d:Object.keys(d||{});cb(uiKeys125)};
 try{
  fetch('lang/es.json').then(r=>r.ok?r.json():{}).then(done).catch(()=>done([]));
 }catch(e){done([])}
}

function metaBar125(d){
 return `<div class="yours-meta125"><p><label>${e125(t125('Language name'))}<input type="text" data-yours-lang125="1" autocomplete="off" value="${e125(d.language||'')}"></label></p><p><label>${e125(t125('Translated by'))}<input type="text" data-yours-by125="1" autocomplete="off" value="${e125(d.by||'')}"></label></p></div>`;
}

function editorShell125(){
 const root=root125();if(!root)return;
 const d=load125();
 root.setAttribute('data-yours-open','edit');
 root.innerHTML=`<div class="card yours-wrap125 yours-in125" data-yours-editor125="1"><p><button type="button" data-yours-back125="1">${e125(t125('Back to Grown-ups'))}</button></p><h2 class="kline">${e125(t125('Make it yours'))}</h2><p class="soft">${e125(t125(NOTE125))}</p><p class="soft">${e125(t125(STAY125))}</p>${metaBar125(d)}<div class="yours-tabs125"><button type="button" class="p" data-yours-tab125="stories">${e125(t125('Stories'))}</button><button type="button" data-yours-tab125="ui">${e125(t125('Menu words'))}</button></div><p class="yours-find125"><label>${e125(t125('Search'))}<input type="search" data-yours-find125="1" value="${e125(find125)}"></label></p><div data-yours-body125="1"></div><p><button class="p" type="button" data-yours-export125="1">${e125(t125('Export language pack'))}</button> <button type="button" data-yours-clear125="1">${e125(t125('Clear all'))}</button></p><p class="soft" data-yours-clearask125="1" hidden>${e125(t125('Clear all the translations saved on this device? This cannot be undone.'))} <button type="button" class="p" data-yours-clearyes125="1">${e125(t125('Yes'))}</button> <button type="button" data-yours-clearno125="1">${e125(t125('Not now'))}</button></p></div>`;
 maybeTurtle125(root.querySelector('[data-yours-editor125]'));
 root.querySelector('[data-yours-back125]').addEventListener('click',()=>{touch125();save125();leave125()});
 root.querySelector('[data-yours-export125]').addEventListener('click',()=>{touch125();save125();export125()});
 const ask=root.querySelector('[data-yours-clearask125]');
 root.querySelector('[data-yours-clear125]').addEventListener('click',()=>{if(ask)ask.hidden=false});
 root.querySelector('[data-yours-clearno125]').addEventListener('click',()=>{if(ask)ask.hidden=true});
 root.querySelector('[data-yours-clearyes125]').addEventListener('click',()=>clearAll125());

 root.querySelector('[data-yours-lang125]').addEventListener('input',touch125);
 root.querySelector('[data-yours-by125]').addEventListener('input',touch125);
 root.querySelector('[data-yours-find125]').addEventListener('input',ev=>{find125=ev.target.value||'';paintBody125()});
 root.querySelectorAll('[data-yours-tab125]').forEach(btn=>btn.addEventListener('click',()=>{tab125=btn.getAttribute('data-yours-tab125');storyId125=null;uiFrom125=0;paintBody125()}));
 paintBody125();
}

function openEditor125(){editorShell125()}

function paintBody125(){
 const root=root125();
 const body=root&&root.querySelector('[data-yours-body125]');
 if(!body)return;
 if(tab125==='ui'){paintUi125(body);return}
 paintStories125(body);
}

function paintStories125(body){
 const d=load125();
 const q=(find125||'').trim().toLowerCase();
 const all=catalog125().filter(s=>!q||String(s.t).toLowerCase().includes(q)||String(s.id).toLowerCase().includes(q));
 if(storyId125){
  const s=all.find(x=>x.id===storyId125)||catalog125().find(x=>x.id===storyId125);
  if(s){paintOneStory125(body,s,d);return}
  storyId125=null;
 }
 body.innerHTML=`<div class="yours-list125">${all.map(s=>`<button type="button" data-yours-pick125="${e125(s.id)}">${e125(s.t)}</button>`).join('')||`<p class="soft">${e125(t125('Search'))}</p>`}</div>`;
 body.querySelectorAll('[data-yours-pick125]').forEach(btn=>btn.addEventListener('click',()=>{storyId125=btn.getAttribute('data-yours-pick125');paintBody125()}));
}

function paintOneStory125(body,s,d){
 const saved=d.stories[s.id]||{};
 const pages=s.pages;
 const sp=Array.isArray(saved.pages)?saved.pages:[];
 const title=saved.title||'';
 let html=`<p><button type="button" data-yours-all125="1">${e125(t125('Stories'))}</button></p><div data-yours-story125="${e125(s.id)}">`;
 html+=`<div class="yours-row125"><div class="yours-en125 story" lang="en">${e125(s.t)}</div><textarea data-yours-title125="1" aria-label="${e125(s.t)}"></textarea></div>`;
 pages.forEach((p,i)=>{
  html+=`<div class="yours-row125"><div class="yours-en125 story" lang="en">${e125(p)}</div><textarea data-yours-page125="${i}" aria-label="${e125(s.t)} ${i+1}"></textarea></div>`;
 });
 html+='</div>';
 body.innerHTML=html;
 const titleEl=body.querySelector('[data-yours-title125]');
 if(titleEl)titleEl.value=title;
 body.querySelectorAll('[data-yours-page125]').forEach(el=>{
  const i=Number(el.getAttribute('data-yours-page125'));
  el.value=sp[i]||'';
  el.addEventListener('input',touch125);
 });
 if(titleEl)titleEl.addEventListener('input',touch125);
 body.querySelector('[data-yours-all125]').addEventListener('click',()=>{touch125();storyId125=null;paintBody125()});
}

function paintUi125(body){
 loadUiKeys125(keys=>{
  const d=load125();
  const q=(find125||'').trim().toLowerCase();
  const list=keys.filter(k=>!q||String(k).toLowerCase().includes(q)||String(d.ui[k]||'').toLowerCase().includes(q));
  const slice=list.slice(uiFrom125,uiFrom125+UI_PAGE125);
  let html=`<p class="soft">${uiFrom125+1}–${Math.min(uiFrom125+slice.length,list.length)} / ${list.length}</p>`;
  slice.forEach(k=>{
   html+=`<div class="yours-row125"><div class="yours-en125 story" lang="en">${e125(k)}</div><textarea data-yours-ui125="${e125(k)}" aria-label="${e125(k)}"></textarea></div>`;
  });
  if(uiFrom125>0)html+=`<p><button type="button" data-yours-prev125="1">${e125(t125('Back'))}</button></p>`;
  if(uiFrom125+UI_PAGE125<list.length)html+=`<p><button type="button" class="p" data-yours-more125="1">${e125(t125('Next'))}</button></p>`;
  body.innerHTML=html;
  body.querySelectorAll('[data-yours-ui125]').forEach(el=>{
   const k=el.getAttribute('data-yours-ui125');
   el.value=d.ui[k]||'';
   el.addEventListener('input',touch125);
  });
  const more=body.querySelector('[data-yours-more125]');
  if(more)more.addEventListener('click',()=>{touch125();uiFrom125+=UI_PAGE125;paintBody125()});
  const prev=body.querySelector('[data-yours-prev125]');
  if(prev)prev.addEventListener('click',()=>{touch125();uiFrom125=Math.max(0,uiFrom125-UI_PAGE125);paintBody125()});
 });
}

function slug125(s){
 return String(s||'').trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'').slice(0,40)||'language';
}

function clearAll125(){
 clearTimeout(saveTimer125);
 try{if(typeof RAW!=='undefined')RAW.del(KEY125)}catch(e){}
 find125='';storyId125=null;uiFrom125=0;tab125='stories';
 editorShell125();
}
function export125(){
 const d=load125();
 const cat=catalog125();
 const stories={};
 cat.forEach(s=>{
  const saved=d.stories[s.id];
  if(!saved)return;
  const title=(saved.title||'').trim();
  const pages=(saved.pages||[]).slice(0,s.pages.length).map(x=>String(x||'').trim());
  if(!title&&pages.every(x=>!x))return;
  stories[s.id]={title,pages};
 });
 const ui={};
 Object.keys(d.ui||{}).forEach(k=>{const v=String(d.ui[k]||'').trim();if(v)ui[k]=v});
 const pack={
  kind:'lamplight-language-pack',
  format:1,
  appVersion:typeof APP_VERSION==='number'?APP_VERSION:125,
  language:d.language||'',
  translatedBy:d.by||'',
  savedAt:d.at||new Date().toISOString(),
  stories,ui
 };
 const name='lamplight-'+slug125(d.language||'language')+'-pack.json';
 const blob=new Blob([JSON.stringify(pack,null,2)],{type:'application/json;charset=utf-8'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download=name;
 a.rel='noopener';
 document.body.appendChild(a);
 a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},400);
}

function hookAdults125(){
 const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{attach125()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 const prevShow=typeof afterShow95==='function'?afterShow95:null;
 if(typeof prevShow==='function'&&!prevShow._v125){
  afterShow95=function(id){
   const r=prevShow.apply(this,arguments);
   try{if(id==='adults')attach125()}catch(e){}
   return r;
  };
  afterShow95._v125=1;
 }
}

hookAdults125();
window.IL125={
 attach:attach125,open:openEditor125,gate:openGate125,leave:leave125,
 catalog:catalog125,pages:pages125,load:load125,save:save125,clear:clearAll125,exportPack:export125,
 KEY:KEY125,NOTE:NOTE125,STAY:STAY125
};
})();
