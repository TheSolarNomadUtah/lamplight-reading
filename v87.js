// v87: Look Up keyboard. After a screen 3 re-render, token buttons are
// new nodes, so a Tab-then-Enter pass can miss the next planet and leave
// focus on a detached node. Keep a focus target and a delegated key
// handler on #lookup, which survives the innerHTML replace, and put the
// next unplaced planet first in the tab order so Tab then Enter places it.
function luNextId87(){
  if(typeof LU83==='undefined'||typeof LU_PLANETS83==='undefined')return null;
  const i=LU83.order.findIndex(x=>!x);
  return i>=0?LU_PLANETS83[i].id:null;
}
function luReshell87(){
  const root=document.getElementById('lookup');if(!root)return null;
  let body=root.querySelector('#lu87-body'),kb=root.querySelector('#lu87-kb');
  if(body&&kb&&kb.parentNode===root&&body.parentNode===root)return {root,body,kb};
  body=document.createElement('div');body.id='lu87-body';
  while(root.firstChild)body.appendChild(root.firstChild);
  kb=document.createElement('button');
  kb.type='button';kb.id='lu87-kb';kb.className='lu87-kb';kb.tabIndex=-1;
  root.appendChild(kb);root.appendChild(body);
  return {root,body,kb};
}
function luTuneTab87(){
  const root=document.getElementById('lookup');if(!root||typeof LU83==='undefined'||LU83.screen!==3)return;
  const want=luNextId87();
  root.querySelectorAll('[data-lu-slot]').forEach(el=>{el.tabIndex=-1});
  root.querySelectorAll('[data-lu-token]').forEach(el=>{el.tabIndex=(want&&el.dataset.luToken===want)?0:-1});
  const kb=root.querySelector('#lu87-kb');
  if(!kb)return;
  if(want){
    const p=typeof luPlanet83==='function'?luPlanet83(want):null;
    const name=p?(typeof gT==='function'?gT(p.name):p.name):want;
    kb.setAttribute('aria-label',name);
  }else{
    kb.removeAttribute('aria-label');
  }
}
function luRefocus87(){
  const root=document.getElementById('lookup');
  if(!root||typeof LU83==='undefined'||LU83.screen!==3)return;
  const go=()=>{
    if(LU83.order.every(Boolean)){
      const fact=root.querySelector('.lu83-planet-line');
      if(fact){fact.setAttribute('tabindex','-1');fact.focus({preventScroll:false});fact.scrollIntoView({block:'nearest',inline:'nearest'})}
      return;
    }
    if(LU83.picked){
      const t=root.querySelector('[data-lu-token="'+LU83.picked+'"]');
      if(t){t.focus({preventScroll:false});return}
    }
    const kb=root.querySelector('#lu87-kb');
    if(kb)kb.focus({preventScroll:true});
  };
  requestAnimationFrame(()=>requestAnimationFrame(go));
}
function luDelegate87(){
  const root=document.getElementById('lookup');if(!root||root._lu87del)return;
  root._lu87del=1;
  root.addEventListener('keydown',e=>{
    if(e.repeat||(e.key!=='Enter'&&e.key!==' '))return;
    if(typeof LU83==='undefined'||LU83.screen!==3)return;
    const kb=e.target&&(e.target.id==='lu87-kb'||(e.target.closest&&e.target.closest('#lu87-kb')));
    const tok=e.target&&e.target.closest&&e.target.closest('[data-lu-token]');
    const slot=e.target&&e.target.closest&&e.target.closest('[data-lu-slot]');
    if(kb){
      const id=luNextId87();
      if(id&&typeof luTapToken85==='function'){e.preventDefault();luTapToken85(id)}
      return;
    }
    if(tok&&root.contains(tok)&&typeof luTapToken85==='function'){
      e.preventDefault();
      luTapToken85(tok.dataset.luToken);
      return;
    }
    if(slot&&root.contains(slot)&&typeof luDropSlot83==='function'){
      e.preventDefault();
      luDropSlot83(+slot.dataset.luSlot);
    }
  });
}
function luBoot87(){
  luDelegate87();
  if(typeof luRender83==='function'&&!luRender83._v87){
    const prev=luRender83;
    luRender83=function(){
      const r=prev.apply(this,arguments);
      if(typeof LU83!=='undefined'&&LU83.screen===3){
        luReshell87();
        luTuneTab87();
        luDelegate87();
        luRefocus87();
      }
      return r;
    };
    luRender83._v87=1;
  }
  if(typeof luFocusAfterPlace86==='function'){
    luFocusAfterPlace86=function(){luRefocus87()};
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',luBoot87);
else luBoot87();
setTimeout(luBoot87,0);
document.head.insertAdjacentHTML('beforeend',`<style id="v87css">
#lu87-kb.lu87-kb{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
#lookup:has(#lu87-kb:focus) #lu87-body [data-lu-token][tabindex="0"]{outline:3px solid var(--acc);outline-offset:2px}
</style>`);
