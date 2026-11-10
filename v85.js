// v85: Look Up tap-to-place, Earth nudge, Arabic LTR fact wrap, and in-diagram scale label.
function luCreditLine83(){return `<p class="soft lu83-credit">${luFact85(LU_CREDIT83)}</p>`}
function luRtl85(){return (typeof LANG!=='undefined'&&LANG==='ar')||document.documentElement.dir==='rtl'}
function luFact85(key){
 const t=(typeof gT==='function'?gT(key):key);
 const wrap=luRtl85()&&/[A-Za-z]/.test(t)&&!/[\u0600-\u06FF]/.test(t);
 return wrap?`<bdi dir="ltr">${esc(t)}</bdi>`:esc(t);
}

function luExplain83(text){
 if(!LU83.noticed)return '';
 return `<div class="lu83-explain" role="status"><p>${luFact85(text)}</p></div>`
}
function luReadBlock83(line,done){
 return `<div class="lu83-read">
  <p class="lu83-line" id="lu83-line">${luFact85(line)}</p>
  <div class="lu83-actions">
   <button type="button" class="lu83-btn" data-lu-speak aria-label="${esc(gT('Hear it'))}">${esc(gT('Hear it'))}</button>
   ${done?'':`<button type="button" class="lu83-btn p" data-lu-read>${esc(gT('I read it'))}</button>`}
  </div></div>`
}
function luSrList83(items){
 const rows=items.map(it=>`<li><b>${esc(gT(it.name))}</b>${it.line?': '+luFact85(it.line):''}${it.where?' — '+esc(gT(it.where)):''}</li>`).join('');
 return `<details class="lu83-sr"><summary>${esc(gT('Planets in this sky'))}</summary><ul>${rows}</ul></details>`
}

function luSlotsHtml83(){
 const done=LU83.order.every(Boolean);
 return `<div class="lu83-track">
  <div class="lu85-diagram">
   ${luOrderScene83()}
   <p class="lu83-scale">${esc(gT('not to scale'))}</p>
  </div>
  ${done?'':`<p class="lu85-how soft">${esc(gT('Drag or tap'))}</p>`}
  <ol class="lu83-slots" aria-label="${esc(gT('Planet paths, from the Sun out'))}">
   <li class="lu83-sunlab"><span>${esc(gT('The Sun'))}</span></li>
   ${LU_PLANETS83.map((p,i)=>{
     const id=LU83.order[i],pl=id&&luPlanet83(id);
     const label=pl?gT(pl.name):gT('Empty path {n}',{n:String(i+1)});
     return `<li><button type="button" class="lu83-slot${pl?' filled':''}${LU83.picked&&!pl?' ready':''}" data-lu-slot="${i}" aria-label="${esc(label)}" ${done?'':'aria-dropeffect="move"'}>${pl?esc(gT(pl.name)):esc(gT('Path {n}',{n:String(i+1)}))}</button></li>`
   }).join('')}
  </ol>
 </div>
 <div class="lu83-tray" role="list" aria-label="${esc(gT('Planets to place'))}">
  ${LU83.tray.map(id=>{const p=luPlanet83(id);return `<button type="button" class="lu83-token${LU83.picked===id?' on':''}" data-lu-token="${id}" role="listitem" aria-pressed="${LU83.picked===id?'true':'false'}" aria-label="${esc(gT(p.name))}"><svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">${luPlanetMark83(p,20,20,14)}</svg><span>${esc(gT(p.name))}</span></button>`}).join('')}
 </div>
 ${LU83.toast?`<p class="lu83-toast" role="status">${luFact85(LU83.toast)}</p>`:''}
 ${LU83.lineId?`<div class="lu83-planet-line" role="status"><p>${luFact85(luPlanet83(LU83.lineId).line)}</p><button type="button" class="lu83-btn" data-lu-speak-line="${esc(luPlanet83(LU83.lineId).line)}">${esc(gT('Hear it'))}</button></div>`:''}
 ${LU83.misses>=1&&!done?`<p><button type="button" class="lu83-btn" data-lu-hint>${esc(gT('A hint'))}</button></p>`:''}
 ${LU83.hint?`<p class="soft" role="status">${luFact85(LU_HINTS83[(LU83.hint-1)%LU_HINTS83.length])}</p>`:''}`
}

function luSizeScene83(){
 const maxD=132,unit=maxD/(11.21*2);
 const items=LU_PLANETS83.map(p=>{
  const d=Math.max(8,p.r*2*unit),hit=Math.max(48,d+8);
  const moonHit=Math.max(48,LU_MOON83.r*2*unit+16);
  const moon=p.id==='earth'?`<button type="button" class="lu83-disc lu83-moon${LU83.moon?' lit':''}${LU83.foundEarth?' named':''}" data-lu-moon style="min-width:${moonHit}px;min-height:${moonHit}px" aria-label="${esc(gT('The Moon'))}"><svg viewBox="0 0 40 40" width="${Math.max(12,LU_MOON83.r*2*unit)}" height="${Math.max(12,LU_MOON83.r*2*unit)}" aria-hidden="true">${luMoonMark83(20,20,14,LU83.moon)}</svg><span>${esc(gT('The Moon'))}</span></button>`:'';
  const nudge=p.id==='earth'&&LU83.nudge&&!LU83.foundEarth?' lu85-nudge':'';
  return `<div class="lu83-size-item"><button type="button" class="lu83-disc${p.id==='earth'&&LU83.foundEarth?' lit':''}${LU83.foundEarth?' named':''}${nudge}" data-lu-earth="${p.id}" style="width:${hit}px;height:${hit}px" aria-label="${esc(gT(p.name))}"><svg viewBox="0 0 40 40" width="${d}" height="${d}" aria-hidden="true">${luPlanetMark83(p,20,20,16,{lit:p.id==='earth'&&LU83.foundEarth})}</svg><span>${esc(gT(p.name))}</span></button>${moon}</div>`
 }).join('');
 return `<div class="lu83-sizes" data-lu-sizes><p class="lu83-scale">${esc(gT('sizes, not distances'))}</p><div class="lu83-size-row">${items}</div></div>`
}
function luRenderSize83(){
 return `<div class="lu83-scene" data-lu-screen="size">${luSizeScene83()}</div>
  ${luReadBlock83('Find Earth.',LU83.read||LU83.foundEarth)}
  ${LU83.foundEarth&&!LU83.noticed?luNoticeBlock83():''}
  ${luExplain83('If Earth were the size of a grape, Jupiter would be about as big as a basketball.')}
  ${LU83.moon?`<div class="lu83-planet-line" role="status"><p>${luFact85(LU_MOON83.line)}</p></div>`:''}
  ${luSrList83(LU_PLANETS83.map(p=>({name:p.name,line:p.line})).concat([{name:LU_MOON83.name,line:LU_MOON83.line}]))}
  ${luNav83(LU83.foundEarth&&LU83.noticed,false)}`
}
function luRenderNight83(){
 return `<div class="lu83-scene" data-lu-screen="night">${luNightScene83()}</div>
  <div class="lu83-read"><p class="lu83-line">${luFact85('Look up tonight and find the Moon.')}</p>
  <div class="lu83-actions"><button type="button" class="lu83-btn" data-lu-speak>${esc(gT('Hear it'))}</button></div></div>
  ${luSrList83([{name:'The Moon',line:LU_MOON83.line},{name:'The Sun',line:'The Sun is a star.'}])}
  ${luCreditLine83()}
  ${luNav83(true,true)}`
}

function luDoRead83(){
 if(LU83.read)return;
 LU83.read=true;
 const key={1:'sky',2:'sun'}[LU83.screen];
 if(key)luChime83(key);
 if(typeof pPractice68==='function')pPractice68('logic','Look Up',{screens:[String(LU83.screen)]},'lookup');
 luRender83();
}
function luTapToken85(id){
 const next=LU83.order.findIndex(x=>!x);
 if(next>=0&&LU_PLANETS83[next].id===id){LU83.picked=id;luDropSlot83(next);return}
 LU83.picked=LU83.picked===id?null:id;LU83.toast='';luRender83();
}
function luPickToken83(id){luTapToken85(id)}

function luClearNudge85(){
 if(LU83._nudgeT){clearTimeout(LU83._nudgeT);LU83._nudgeT=0}
}
function luEarthNudge85(){
 luClearNudge85();
 if(LU83.screen!==4||LU83.foundEarth){LU83.nudge=false;LU83.earthSince=0;return}
 if(!LU83.earthSince)LU83.earthSince=Date.now();
 const wait=Math.max(0,6000-(Date.now()-LU83.earthSince));
 const go=()=>{
  if(LU83.screen!==4||LU83.foundEarth)return;
  LU83.nudge=true;
  const el=document.querySelector('#lookup [data-lu-earth="earth"]');
  if(el)el.classList.add('lu85-nudge');
 };
 if(wait===0)go();
 else LU83._nudgeT=setTimeout(go,wait);
}
function luFindEarth83(id){
 if(id==='earth'){
  if(!LU83.foundEarth){LU83.foundEarth=true;LU83.read=true;LU83.nudge=false;LU83.earthSince=0;luClearNudge85();luChime83('earth');if(typeof pPractice68==='function')pPractice68('logic','Look Up',{screens:['4']},'lookup')}
  luRender83();
 }
}

function luBindDrag85(root){
 let start=null,drag=null,ghost=null,moved=false,handled=false;
 const clear=()=>{if(ghost)ghost.remove();ghost=null;drag=null;root.querySelectorAll('.lu83-slot.over').forEach(s=>s.classList.remove('over'))};
 root.querySelectorAll('[data-lu-token]').forEach(btn=>{
  btn.addEventListener('pointerdown',e=>{
   if(e.button!=null&&e.button!==0)return;
   start={id:btn.dataset.luToken,ptr:e.pointerId,x:e.clientX,y:e.clientY};
   moved=false;handled=false;
   try{btn.setPointerCapture(e.pointerId)}catch(err){}
  });
  btn.addEventListener('pointermove',e=>{
   if(!start||start.ptr!==e.pointerId)return;
   const dx=e.clientX-start.x,dy=e.clientY-start.y;
   if(!moved&&(dx*dx+dy*dy)<64)return;
   moved=true;
   if(!drag){
    drag={id:start.id,ptr:start.ptr};
    LU83.picked=drag.id;
    btn.classList.add('on');
    ghost=btn.cloneNode(true);
    ghost.className='lu83-ghost';
    ghost.style.position='fixed';ghost.style.left=e.clientX-28+'px';ghost.style.top=e.clientY-28+'px';ghost.style.pointerEvents='none';ghost.style.zIndex=40;
    document.body.appendChild(ghost);
   }
   if(!ghost)return;
   ghost.style.left=e.clientX-28+'px';ghost.style.top=e.clientY-28+'px';
   const el=document.elementFromPoint(e.clientX,e.clientY);
   root.querySelectorAll('.lu83-slot.over').forEach(s=>s.classList.remove('over'));
   el?.closest?.('[data-lu-slot]')?.classList.add('over');
  });
  const up=e=>{
   if(!start||start.ptr!==e.pointerId)return;
   const el=document.elementFromPoint(e.clientX,e.clientY);
   const slot=el&&el.closest&&el.closest('[data-lu-slot]');
   if(moved&&drag&&slot){
    const id=drag.id;clear();start=null;handled=true;
    LU83.picked=id;luDropSlot83(+slot.dataset.luSlot);
   }else if(!moved){
    const id=start.id;clear();start=null;handled=true;
    luTapToken85(id);
   }else{
    const id=(drag&&drag.id)||start.id;clear();start=null;handled=true;
    LU83.picked=id;luRender83();
   }
  };
  btn.addEventListener('pointerup',up);
  btn.addEventListener('pointercancel',()=>{clear();start=null});
  btn.addEventListener('click',e=>{
   if(handled){e.preventDefault();e.stopImmediatePropagation();handled=false;return}
   luTapToken85(btn.dataset.luToken);
  },true);
 });
}

function luBind83(root){
 root.querySelector('[data-lu-speak]')?.addEventListener('click',()=>{const t=root.querySelector('#lu83-line,.lu83-line')?.textContent||'';luSpeak83(t)});
 root.querySelectorAll('[data-lu-speak-line]').forEach(b=>b.addEventListener('click',()=>luSpeak83(gT(b.dataset.luSpeakLine))));
 root.querySelector('[data-lu-read]')?.addEventListener('click',luDoRead83);
 root.querySelector('[data-lu-noticed]')?.addEventListener('click',luDoNotice83);
 root.querySelector('[data-lu-next]')?.addEventListener('click',luNext83);
 root.querySelector('[data-lu-back]')?.addEventListener('click',luBack83);
 root.querySelectorAll('[data-lu-home]').forEach(b=>b.addEventListener('click',()=>show('hub')));
 root.querySelectorAll('[data-lu-slot]').forEach(b=>b.addEventListener('click',()=>luDropSlot83(+b.dataset.luSlot)));
 root.querySelector('[data-lu-hint]')?.addEventListener('click',luHint83);
 root.querySelectorAll('[data-lu-earth]').forEach(b=>b.addEventListener('click',()=>luFindEarth83(b.dataset.luEarth)));
 root.querySelector('[data-lu-moon]')?.addEventListener('click',luMoon83);
 luBindDrag85(root);
}

{const reset=luReset83;luReset83=function(){luClearNudge85();LU83.nudge=false;LU83.earthSince=0;return reset.apply(this,arguments)}}
{const rend=luRender83;luRender83=function(){const r=rend.apply(this,arguments);luEarthNudge85();return r}}
{const sh=show;show=function(id){if(id!=='lookup')luClearNudge85();return sh.apply(this,arguments)}}

document.head.insertAdjacentHTML('beforeend',`<style id="lu85-css">
#lookup .lu85-diagram{position:relative;max-width:420px;width:100%;margin:0 auto}
#lookup .lu85-diagram .lu83-svg{margin:0 auto}
#lookup .lu85-diagram .lu83-scale{position:absolute;bottom:8px;inset-inline-start:10px;margin:0;padding:2px 8px;font-size:.8rem;line-height:1.2;background:color-mix(in oklab,var(--lu-sky2,#f3eee4) 80%,var(--card) 20%);border-radius:8px;pointer-events:none;max-width:calc(100% - 20px);text-align:start}
#lookup .lu85-how{margin:8px 0 0;font-weight:700}
#lookup .lu83-token:focus-visible,#lookup .lu83-slot:focus-visible,#lookup .lu83-disc:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
#lookup .lu83-explain bdi[dir="ltr"],#lookup .lu83-planet-line bdi[dir="ltr"],#lookup .lu83-line bdi[dir="ltr"],#lookup .lu83-sr bdi[dir="ltr"],#lookup .lu83-toast bdi[dir="ltr"],#lookup .lu83-credit bdi[dir="ltr"]{unicode-bidi:isolate;direction:ltr;display:inline-block;max-width:100%;text-align:left}
html[dir="rtl"] #lookup .lu83-notice,html[dir="rtl"] #lookup .lu83-explain,html[dir="rtl"] #lookup .lu83-planet-line{border-left:0;border-inline-start:6px solid var(--acc)}
#lookup .lu83-disc.lu85-nudge{border-color:var(--acc);box-shadow:0 0 0 4px color-mix(in oklab,var(--acc) 45%,transparent),0 0 14px color-mix(in oklab,var(--acc) 40%,#e6b454);animation:lu85-nudge 2.8s ease-in-out infinite}
@keyframes lu85-nudge{0%,100%{box-shadow:0 0 0 3px color-mix(in oklab,var(--acc) 35%,transparent),0 0 8px color-mix(in oklab,var(--acc) 30%,#e6b454)}50%{box-shadow:0 0 0 7px color-mix(in oklab,var(--acc) 55%,transparent),0 0 18px color-mix(in oklab,var(--acc) 50%,#e6b454)}}
#lookup .lu83-reduce .lu83-disc.lu85-nudge,html[data-look-theme] .lu83-reduce .lu83-disc.lu85-nudge{animation:none}
@media(prefers-reduced-motion:reduce){#lookup .lu83-disc.lu85-nudge{animation:none}}
</style>`);
