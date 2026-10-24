// v22: first screen drawn in the right language before reveal; avatar chip after reload; paint bar on phones; Make-a-song instruments.
// Draw the header chips and the visible screen again now that every script (avatars, translations) is loaded.
try{renderBar()}catch(e){}
try{const vis=SECTIONS.find(x=>$(x)&&!$(x).classList.contains('hidden'))||'hub';show(vis)}catch(e){}
(function reveal(){const h=document.documentElement;if(typeof LANG==='undefined'||LANG==='en'||Object.keys(DICT).length){try{trTree(document.body)}catch(e){}requestAnimationFrame(()=>{h.classList.remove('i18nwait','prewait')})}else setTimeout(reveal,30)})();
// Paint on phones: Home lives in the toolbar, and the canvas starts below the (wrapped) toolbar.
{const ps=paintSetup;paintSetup=function(){const bar=document.querySelector('#pstudio .pbar');if(bar){const x=bar.querySelector('button[title="Leave"]');if(x&&innerWidth<=640){x.textContent='🏠';x.setAttribute('aria-label','Home')}
 const h=bar.getBoundingClientRect().height;['pcv','pgd'].forEach(id=>{const c=$(id);if(c){c.style.top=h+'px';c.style.height=`calc(100% - ${h}px)`}});const l=$('plab');if(l)l.style.top=(h+8)+'px'}return ps.apply(this,arguments)}}
document.head.insertAdjacentHTML('beforeend',`<style>@media (max-width:640px){#pstudio .pbar{height:auto!important;min-height:58px;padding:6px!important;flex-wrap:wrap!important}}
body.inpaint #fhome{display:none!important}</style>`);

addEventListener('resize',()=>{if($('pstudio')&&!$('paint').classList.contains('hidden'))try{renderPaintBar()}catch(e){}});
