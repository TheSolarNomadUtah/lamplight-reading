/* v121: even companion picker grid, and a gentle first-offer line to Kids. UI only. */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('il121css')){
 const s=document.createElement('style');s.id='il121css';
 s.textContent=[
  '[data-friends101]{container-type:inline-size;width:100%;box-sizing:border-box}',
  '.friendPick101{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;justify-content:stretch;width:100%;margin:12px 0;box-sizing:border-box}',
  '@container (min-width:560px){.friendPick101{grid-template-columns:repeat(4,minmax(0,1fr))}}',
  '@supports not (container-type:inline-size){@media (min-width:720px){.friendPick101{grid-template-columns:repeat(4,minmax(0,1fr))}}}',
  '.friendPick101 button{min-width:0!important;max-width:none!important;width:100%;box-sizing:border-box;min-height:44px;text-align:center}',
  '.friendPick101 button .kline{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;text-overflow:ellipsis;text-wrap:wrap;overflow-wrap:break-word;word-break:break-word;line-height:1.2;max-height:2.4em;width:100%;font-size:.92em;text-align:center}',
  '.friendPick101 .lamp73-svg,.friendPick101 svg{width:88px;height:88px;max-width:100%;flex:none}',
  '.friendOffer101 p.soft[data-offer-more121]{margin:.85rem 0 0}',
  '.friendOfferKids121{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:.45rem .9rem;border:0;background:transparent;color:inherit;font:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px;border-radius:16px;cursor:pointer}',
  '.friendOfferKids121:focus-visible{outline:2px solid var(--acc,#c9a45e);outline-offset:2px}'
 ].join('');
 (document.documentElement||document.head).appendChild(s);
}

function offerKidsLabel121(){
 const t=typeof gT==='function'?gT:s=>s;
 return t('More friends in {section}',{section:t('Kids')});
}

if(typeof friendOfferHTML111==='function'||typeof friendOfferMaybe101==='function'){
 friendOfferHTML111=function(){
  const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
  return `<p class="kline">${e(t('A Moth, an Owl, a Turtle named Shell, a Dragon, and a Phoenix would like to sit with you, if you want. You can pick one, or keep your Lamp.'))}</p>
<div class="row101">
<button type="button" class="p" data-pick="moth">${e(t('Moth'))}</button>
<button type="button" class="p" data-pick="owl">${e(t('Owl'))}</button>
<button type="button" class="p" data-pick="turtle">${e(t('Shell'))}</button>
<button type="button" class="p" data-pick="dragon">${e(t('Dragon'))}</button>
<button type="button" class="p" data-pick="phoenix">${e(t('Phoenix'))}</button>
<button type="button" data-pick="lamp">${e(t('Keep the Lamp'))}</button>
</div>
<p class="soft" data-offer-more121="1"><button type="button" class="friendOfferKids121" data-offer-kids121="1">${e(offerKidsLabel121())}</button></p>`;
 };
}

{const prev=typeof friendOfferMaybe101==='function'?friendOfferMaybe101:null;
 if(prev){
  friendOfferMaybe101=function(){
   prev.apply(this,arguments);
   const d=document.querySelector('dialog.friendOffer101');
   const go=d&&d.querySelector('[data-offer-kids121]');
   if(!go||go._il121)return;
   go._il121=1;
   go.onclick=function(){
    try{if(d.open)d.close()}catch(e){}
    d.remove();
    if(typeof lampMountAll73==='function')lampMountAll73();
    if(typeof friendLine101==='function')friendLine101();
    const pid=typeof curPid==='function'?curPid():'';
    if(typeof show==='function')show('kids');
    if(typeof editP==='function')editP(pid);
    const form=typeof $==='function'?$('pform'):document.getElementById('pform');
    if(form&&form.scrollIntoView)form.scrollIntoView({block:'start'});
   };
  };
 }
}

window.IL121={offerKidsLabel:offerKidsLabel121};
})();
