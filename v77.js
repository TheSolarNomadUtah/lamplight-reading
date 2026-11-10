// v77: lamp credits keep going through the starlit stage. v75 still stopped at stage 3.
// Also: Look Closer list cards open on mouse click, touch tap, and Enter or Space.
function lampCap77(){return Math.max(1,(LAMP73.need||[]).length)}
function lampMoment73(reason){if(!LAMP_KINDS75.includes(reason))return false;const s=lampLoad73();if(s.stage>=lampCap77())return false;
 const session=lampSession74(),day=lampDay74();if(s.session&&s.session===session)return false;if(s.day===day&&s.dayCredits>=2)return false;
 if(reason==='retry'){const c=P68.g;if(c?.lampRetry73)return false;if(c)c.lampRetry73=true}
 s.moments++;s.kinds=s.kinds||[];s.kinds.push(reason);s.session=session;s.dayCredits=s.day===day?s.dayCredits+1:1;s.day=day;
 const next=lampStageFor73(s.moments);if(next>s.stage){const why=lampPickReason74(s.kinds,reason);for(let st=s.stage+1;st<=next;st++)s.pending.push({stage:st,reason:why,from:st-1});s.stage=next;s.kinds=[]}lampPut73(s);return true}

function lcOpenFromCard77(btn,ev){if(!btn)return;const id=btn.getAttribute('data-lc-open');if(!id)return;if(ev){ev.preventDefault();ev.stopPropagation()}lcOpen75(id)}
function lcBind75(root,item){if(!root)return;
 root.querySelectorAll('[data-lc-open]').forEach(b=>{
  b.setAttribute('tabindex','0');
  b.onclick=e=>lcOpenFromCard77(b,e);
  b.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')lcOpenFromCard77(b,e)};
 });
 root.querySelectorAll('[data-lc-choice]').forEach(b=>b.onclick=()=>lcGuess75(b.dataset.lcChoice));
 root.querySelector('[data-lc-reveal]')?.addEventListener('click',()=>lcReveal75());
 root.querySelector('[data-lc-next]')?.addEventListener('click',()=>lcNext75());
 root.querySelectorAll('[data-lc-list]').forEach(b=>b.onclick=()=>lcList75());
 root.querySelector('[data-lc-measure]')?.addEventListener('click',()=>lcToggleMeasure75());
 const scene=root.querySelector('.lc75-scene');
 if(scene&&item)scene.addEventListener('click',e=>{if(e.target.closest('[data-lc-guide]'))return;if(LC75.guess!=null&&!LC75.revealed)lcReveal75()});
 lcBindGuide75(root)}
function lcRenderList75(root){
 const tiles=LC_ITEMS75.map((item,i)=>`<button type="button" class="hubtile lc75-tile" data-lc-open="${item.id}" tabindex="0"><span class="lc75-num">${i+1}</span>${gT(item.title)}<small>${gT(item.q)}</small></button>`).join('');
 root.innerHTML=`<div class="card big lc75-card"><h2>${lcTileArt75()} ${gT('Look Closer')}</h2>`+`
  <p>${gT('Pictures that trick your eyes. There is no score. Guess, then look closer.')}</p>
  <div class="hubgrid lc75-grid">${tiles}</div>
  <p><button type="button" class="bigbtn" onclick="show('hub')">${gT('Home')}</button></p></div>`;
 lcBind75(root)}
if(!$('closer')?.dataset.lcCards77){
 const root=$('closer');
 if(root){
  root.dataset.lcCards77='1';
  root.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-lc-open]');if(!b||!root.contains(b))return;lcOpenFromCard77(b,e)},true);
  root.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const b=e.target.closest&&e.target.closest('[data-lc-open]');if(!b||!root.contains(b))return;lcOpenFromCard77(b,e)},true);
 }
}
