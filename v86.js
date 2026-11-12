// v86: Offer only English and Spanish in the language picker. Arabic and the
// 14 partial languages stay in the repo (lang/*.json) but are hidden behind
// one allowlist, dropped from the offline precache, and never fetched by the
// service worker. Flip the list to bring a language back.
//
// Allowlist: window.LANG_OPEN86 in the first <script> of index.html (head).
// Default is ['en','es']. Add a code (for example 'ar' or 'fr') there to
// offer it again, then put its lang/<code>.json back in sw.js F and the
// offline manifests.
//
// Also folds in three Look Up QA fixes: a gentle reply when a non-Earth
// planet is tapped on screen 4; start-edge margin on the screen 3 fact
// card while the floating Home button is visible; and keyboard focus
// after placing a planet, to the next unplaced planet or the fact card.
window.LANG_OPEN86=window.LANG_OPEN86||['en','es'];
function langOpen86(c){return (window.LANG_OPEN86||['en','es']).indexOf(c)>=0}
function langMigrate86(){
  try{
    const L=window.localStorage;
    for(let i=L.length-1;i>=0;i--){
      const n=L.key(i);if(!n)continue;
      if(n==='lamp_lang'||n==='lamp_lang_device'||/^lamp_lang@/.test(n)){
        const v=L.getItem(n);
        if(v&&!langOpen86(v)){
          L.setItem(n,'en');
          if(typeof RAW!=='undefined'&&RAW.set)RAW.set(n,'en');
        }
      }
    }
  }catch(e){}
}
function langApplyDir86(){
  const open=typeof LANG!=='undefined'&&langOpen86(LANG)?LANG:'en';
  document.documentElement.lang=open;
  document.documentElement.dir=(typeof RTL!=='undefined'&&RTL.includes(open))?'rtl':'ltr';
  document.documentElement.classList.remove('rtl');
  if(document.body)document.body.classList.remove('rtl');
}
function luFindLine86(id){
  const p=typeof luPlanet83==='function'?luPlanet83(id):null;
  const name=p?((typeof gT==='function'?gT(p.name):p.name)):id;
  const hint=typeof gT==='function'?gT('Find Earth, the blue one.'):'Find Earth, the blue one.';
  return name+'. '+hint;
}
function luPaintFind86(){
  const root=$('lookup');if(!root)return;
  root.querySelectorAll('.lu86-find').forEach(el=>el.remove());
  if(typeof LU83==='undefined'||LU83.screen!==4||LU83.foundEarth||!LU83.findMsg)return;
  const el=document.createElement('p');
  el.className='lu86-find';
  el.setAttribute('role','status');
  if(typeof luFact85==='function')el.innerHTML=luFact85(LU83.findMsg);
  else el.textContent=LU83.findMsg;
  const read=root.querySelector('.lu83-read');
  if(read)read.after(el);
  else root.querySelector('.lu83-card')?.insertAdjacentElement('beforeend',el);
}
function luFocusAfterPlace86(){
  const root=$('lookup');if(!root||typeof LU83==='undefined'||LU83.screen!==3)return;
  const go=()=>{
    if(LU83.order.every(Boolean)){
      const fact=root.querySelector('.lu83-planet-line');
      if(fact){fact.setAttribute('tabindex','-1');fact.focus({preventScroll:false});fact.scrollIntoView({block:'nearest',inline:'nearest'})}
      return;
    }
    const next=LU83.order.findIndex(x=>!x);
    const want=next>=0&&typeof LU_PLANETS83!=='undefined'?LU_PLANETS83[next].id:null;
    const token=(want&&root.querySelector('[data-lu-token="'+want+'"]'))||root.querySelector('[data-lu-token]');
    if(token)token.focus({preventScroll:false});
  };
  requestAnimationFrame(()=>requestAnimationFrame(go));
}
function luBoot86(){
  if(typeof luFindEarth83==='function'&&!luFindEarth83._v86){
    const prev=luFindEarth83;
    luFindEarth83=function(id){
      if(id==='earth'){LU83.findMsg='';return prev.apply(this,arguments)}
      if(typeof LU83==='undefined'||LU83.foundEarth)return;
      LU83.findMsg=luFindLine86(id);
      if(typeof luRender83==='function')luRender83();
      else luPaintFind86();
    };
    luFindEarth83._v86=1;
  }
  if(typeof luDropSlot83==='function'&&!luDropSlot83._v86){
    const prev=luDropSlot83;
    luDropSlot83=function(i){
      const before=(typeof LU83!=='undefined'&&LU83.order)?LU83.order.slice():[];
      const r=prev.apply(this,arguments);
      if(typeof LU83!=='undefined'&&LU83.screen===3&&LU83.order.some((id,idx)=>id&&!before[idx]))luFocusAfterPlace86();
      return r;
    };
    luDropSlot83._v86=1;
  }
  if(typeof luRender83==='function'&&!luRender83._v86){
    const prev=luRender83;
    luRender83=function(){
      const r=prev.apply(this,arguments);
      const fact=$('lookup')&&$('lookup').querySelector('.lu83-planet-line');
      if(fact&&!fact.hasAttribute('tabindex'))fact.setAttribute('tabindex','-1');
      luPaintFind86();
      return r;
    };
    luRender83._v86=1;
  }
  if(typeof luReset83==='function'&&!luReset83._v86){
    const prev=luReset83;
    luReset83=function(){if(typeof LU83!=='undefined')LU83.findMsg='';return prev.apply(this,arguments)};
    luReset83._v86=1;
  }
  const wrapClear=fn=>{
    if(typeof window[fn]!=='function'||window[fn]._v86clear)return;
    const prev=window[fn];
    window[fn]=function(){if(typeof LU83!=='undefined')LU83.findMsg='';return prev.apply(this,arguments)};
    window[fn]._v86clear=1;
  };
  wrapClear('luNext83');wrapClear('luBack83');
}
function langBoot86(){
  langMigrate86();
  langApplyDir86();
  if(typeof setLang==='function'){
    const prev=setLang;
    setLang=function(c,scope){if(!langOpen86(c))c='en';return prev(c,scope)};
  }
  if(typeof langPicker==='function'){
    const lp=langPicker;
    langPicker=function(){
      const html=lp();
      // Belt-and-suspenders: if an older cached i18n.js still listed every
      // language, drop hidden options from the rendered picker.
      const box=document.createElement('div');box.innerHTML=html;
      box.querySelectorAll('#langsel option').forEach(o=>{if(!langOpen86(o.value))o.remove()});
      const sel=box.querySelector('#langsel');
      if(sel&&!langOpen86(sel.value))sel.value='en';
      return box.innerHTML;
    };
  }
  // At phone width, v21 parks #fhome at bottom:56px. While that button is
  // visible, give the Look Up fact and notice cards start-edge margin so the button
  // does not cover them or "Hear it."
  if(typeof show==='function'&&!show._v86&&!show._v97){
    const prev=show;
    show=function(id){
      const r=prev.apply(this,arguments);
      document.body.classList.toggle('onlookup',id==='lookup');
      return r;
    };
    show._v86=1;
  }
  if($('lookup')&&!$('lookup').classList.contains('hidden'))document.body.classList.add('onlookup');
  luBoot86();
}
langMigrate86();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',langBoot86);
else langBoot86();
document.head.insertAdjacentHTML('beforeend',`<style id="v86css">
@media (max-width:640px){
  body.v20float.onlookup #lookup .lu83-planet-line,
  body.v20float.onlookup #lookup .lu83-explain,
  body.v20float.onlookup #lookup .lu83-notice,
  body.bedtime.onlookup #lookup .lu83-planet-line,
  body.bedtime.onlookup #lookup .lu83-explain,
  body.bedtime.onlookup #lookup .lu83-notice{margin-inline-start:60px}
}
#lookup .lu86-find{margin:12px 0;padding:8px 12px;text-align:start;border-inline-start:6px solid var(--acc);background:color-mix(in oklab,var(--card) 88%,var(--acc) 12%);font-weight:700;color:var(--ink)}
</style>`);
