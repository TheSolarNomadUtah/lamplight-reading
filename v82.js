// v82: star popover above the Lamp, a filled Copper Teal ring, a clearer Lilac leaf.
function lampStarClose82(){
 document.querySelectorAll('.lamp81-pop:not([hidden])').forEach(p=>{p.hidden=true;p.removeAttribute('data-for')});
 document.querySelectorAll('.lamp81-star[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));
}
function lampStarPop82(sky){
 const card=sky&&(sky.closest('.today64')||sky.parentElement);
 if(!card)return sky&&sky.querySelector('.lamp81-pop');
 let pop=card.querySelector(':scope > .lamp81-pop');
 if(pop)return pop;
 pop=sky.querySelector('.lamp81-pop');
 if(pop)card.appendChild(pop);
 return pop;
}
function lampStarPlace82(pop,card,fig,btn){
 const box=card.getBoundingClientRect(),cs=getComputedStyle(card);
 const bl=parseFloat(cs.borderLeftWidth)||0,bt=parseFloat(cs.borderTopWidth)||0;
 const fr=(fig||btn).getBoundingClientRect(),pad=8,gap=8;
 pop.style.left=(fr.left+fr.width/2-box.left-bl)+'px';
 pop.style.top=(fr.bottom-box.top-bt+gap)+'px';
 pop.style.transform='translate(-50%,0)';
 const pr=pop.getBoundingClientRect();
 let dx=0,dy=0;
 if(pr.right>box.right-pad)dx=(box.right-pad)-pr.right;
 if(pr.left<box.left+pad)dx=(box.left+pad)-pr.left;
 if(pr.bottom>box.bottom-pad)dy=(box.bottom-pad)-pr.bottom;
 if(pr.top<box.top+pad)dy=(box.top+pad)-pr.top;
 pop.style.transform=`translate(calc(-50% + ${dx}px), ${dy}px)`;
}
function lampStarOpen82(sky,btn){
 if(!sky||!btn)return;
 const pop=lampStarPop82(sky);if(!pop)return;
 const card=pop.closest('.today64')||pop.parentElement;
 const label=btn.getAttribute('aria-label')||btn.textContent||'';
 const already=pop.getAttribute('data-for')===btn.dataset.skyI&&!pop.hidden;
 document.querySelectorAll('.lamp81-star[aria-expanded]').forEach(b=>b.setAttribute('aria-expanded','false'));
 if(already){pop.hidden=true;pop.removeAttribute('data-for');return}
 pop.hidden=false;pop.dataset.for=btn.dataset.skyI;pop.textContent=label;
 pop.setAttribute('role','status');pop.setAttribute('aria-live','polite');
 btn.setAttribute('aria-expanded','true');
 const fig=card&&(card.querySelector('.lamp76-hero .lamp73-figure')||card.querySelector('.lamp73-figure'));
 lampStarPlace82(pop,card,fig,btn);
}
if(typeof lampStarOpen81==='function')lampStarOpen81=lampStarOpen82;
if(typeof lampSkyMount81==='function'){
 const mount=lampSkyMount81;
 lampSkyMount81=function(host,pid){
  if(host)host.querySelectorAll(':scope > .lamp81-pop').forEach(n=>n.remove());
  return mount.apply(this,arguments);
 };
}
document.addEventListener('keydown',e=>{
 if(e.key!=='Escape'&&e.key!=='Esc')return;
 if(document.querySelector('dialog[open]'))return;
 if(!document.querySelector('.lamp81-pop:not([hidden])'))return;
 e.preventDefault();
 lampStarClose82();
});

document.head.insertAdjacentHTML('beforeend',`<style id="lamp82-css">
.today64>.lamp81-pop,.lamp81-pop{z-index:8!important;pointer-events:auto;border:1px solid color-mix(in oklab,var(--ink,#2f2a24) 16%,transparent)}
.lamp81-bloom[data-shape="rings"]{background:radial-gradient(circle at 50% 46%,var(--f81-tip,#aaf0f2) 0 34%,var(--f81-core,#4cdce0) 38% 52%,transparent 56% 62%,var(--f81-mid,#1fc9ce) 66% 100%)!important;border:3px solid var(--f81-deep,#00757a);box-shadow:0 0 16px var(--f81-halo,#5ecbce),inset 0 0 8px color-mix(in oklab,var(--f81-core,#4cdce0) 70%,transparent)!important}
.lamp81-swatch.locked .lamp81-bloom[data-shape="rings"]{background:transparent!important;box-shadow:none!important;border:2px solid color-mix(in oklab,var(--f81-mid,var(--ink)) 55%,transparent)}
.lamp81-swatch:not(.locked) .lamp81-bloom[data-shape="leaf"]{width:30px;height:46px;border-radius:0;transform:rotate(-28deg);clip-path:polygon(50% 0%,80% 18%,96% 48%,80% 78%,50% 100%,20% 78%,4% 48%,20% 18%)}
</style>`);
