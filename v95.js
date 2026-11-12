// v95: Letters and Trace keep recorded talking voices; story and picture-card
// speech is removed; the Grown-ups reading-voice picker is hidden. Echo is
// flagged off and filtered from entry points (code stays). Lamp glow and
// effect pickers move from Look to Kids (per child). Story grade leaves
// Grown-ups (it stays in Kids; unset never locks anyone out). The language
// switch leaves Look (it stays on Home). Help gets a first-time guide and
// drops retired features. The Body picture-card set is filtered out of the
// live decks (data and art stay). Look Up SVG height is set in CSS, not as
// the invalid height="auto" attribute (v83).
const ECHO95=false;
const BODY_CARDS95=false;
const VOICE_PICKER95=false;
function echoEnabled95(){return ECHO95}
function bodyCardsOn95(){return BODY_CARDS95}

const DECK_BODY95=(typeof DECKS==='object'&&DECKS.body)?DECKS.body:null;
function applyDecks95(){
 if(typeof DECKS!=='object'||!DECK_BODY95)return;
 if(bodyCardsOn95()){if(!DECKS.body)DECKS.body=DECK_BODY95}
 else if(DECKS.body)delete DECKS.body;
 if(!bodyCardsOn95()&&typeof CD==='object'&&CD.deck==='body')CD.deck=null;
}
applyDecks95();

function hideEcho95(root){
 if(echoEnabled95()||!root||!root.querySelectorAll)return;
 root.querySelectorAll('[data-icon65="echoTogether65"]').forEach(el=>el.remove());
 root.querySelectorAll('button,a,[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(/show\(\s*['"]echo['"]\s*\)/.test(on))(el.closest('.hubtile')||el).remove();
 });
 root.querySelectorAll('#fb_tried label').forEach(l=>{
  const v=(l.querySelector('input')||{}).value||'';
  if(/^Echo$/i.test(v)||(typeof gT==='function'&&v===gT('Echo')))l.remove();
 });
 const echoName=typeof gT==='function'?gT('Echo'):'Echo';
 root.querySelectorAll('table').forEach(table=>{
  const ths=[...table.querySelectorAll('th')];
  const i=ths.findIndex(th=>{
   const t=th.textContent.replace(/\s+/g,' ').trim();
   return t==='Echo'||t==='Eco'||t===echoName;
  });
  if(i<0)return;
  table.querySelectorAll('tr').forEach(tr=>{
   const cells=[...tr.children];
   if(cells[i])cells[i].remove();
  });
 });
}

function soloSilence95(){
 const root=typeof $==='function'&&$('solo');if(!root)return;
 const rtm=root.querySelector('#rtm');if(rtm)rtm.remove();
 root.querySelectorAll('[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(!/speak\(|readToMe\(/.test(on))return;
  if(el.id==='rtm'||(el.tagName==='BUTTON'&&/Read to me|Léeme|Stop|Detener/i.test(el.textContent))){el.remove();return}
  el.removeAttribute('onclick');
  el.classList.remove('sw');
  el.style.cursor='text';
 });
}

function cardsSilence95(){
 applyDecks95();
 const root=typeof $==='function'&&$('cards');if(!root)return;
 root.querySelectorAll('button.hubtile,[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(/deck:\s*['"]body['"]/.test(on))(el.closest('.hubtile')||el).remove();
 });
 root.querySelectorAll('[onclick]').forEach(el=>{
  const on=el.getAttribute('onclick')||'';
  if(!/cardSay\(/.test(on))return;
  if(el.tagName==='BUTTON'){el.remove();return}
  el.removeAttribute('onclick');
  el.removeAttribute('role');
  const aria=el.getAttribute('aria-label')||'';
  if(/^Hear |^Escúch/i.test(aria))el.removeAttribute('aria-label');
  el.style.cursor='default';
 });
 const intro=gT('For babies, toddlers, Pre-K and K. Look at a card together and say the word.');
 root.querySelectorAll('p.soft').forEach(p=>{
  if(/hear the word|oír la palabra|stretched/i.test(p.textContent))p.textContent=intro;
 });
}

function lookTrim95(){
 const root=typeof $==='function'&&$('look');if(!root)return;
 root.querySelectorAll('#vpick,[data-flame81-card],[data-fx89-card]').forEach(el=>el.remove());
 root.querySelectorAll('[data-flame81-picker],[data-fx89-picker]').forEach(el=>{
  const card=el.closest('.card');
  if(card&&card!==root&&!card.querySelector('#lbl_fs,[data-reveal76],[data-sfx73]'))card.remove();
  else el.remove();
 });
 const glow=typeof gT==='function'?gT('Lamp glow'):'Lamp glow';
 const fx=typeof gT==='function'?gT('Lamp effect'):'Lamp effect';
 root.querySelectorAll('.card').forEach(card=>{
  const h=(card.querySelector('h2,h3')?.textContent||'').replace(/\s+/g,' ').trim();
  if(h===glow||h==='Lamp glow'||h===fx||h==='Lamp effect'||h==='Brillo de la lámpara'||h==='Efecto de la lámpara')card.remove();
 });
 const lang=root.querySelector('#langcard');if(lang)lang.remove();
 if(!VOICE_PICKER95){const v=$('vpick');if(v)v.remove()}
}

function fxLiveAll95(){
 document.querySelectorAll('#kids [data-fx89-picker],#pform [data-fx89-picker],#look [data-fx89-picker]').forEach(box=>{
  if(typeof fxLive92==='function')fxLive92(box);
 });
}
if(typeof fxLiveAll92==='function')fxLiveAll92=fxLiveAll95;

function kidsAttach95(){
 const form=typeof $==='function'&&$('pform');if(!form)return;
 const pid=form.dataset.pid73;if(!pid)return;
 const slot=form.querySelector('[data-lamp73-slot="profile"]')||form;
 if(!slot.querySelector('[data-flame81-picker]')&&typeof lampPickerHTML81==='function'){
  slot.insertAdjacentHTML('beforeend',lampPickerHTML81(pid));
  if(typeof lampPickerBind81==='function')lampPickerBind81(slot,pid);
 }
 if(!form.querySelector('[data-fx89-picker]')&&typeof lampFxPickerHTML89==='function'){
  const flame=form.querySelector('[data-flame81-picker]');
  const host=(flame&&flame.parentElement)||slot;
  host.insertAdjacentHTML('beforeend',lampFxPickerHTML89(pid));
  if(typeof lampFxPickerBind89==='function')lampFxPickerBind89(host,pid);
 }
 fxLiveAll95();
}

function helpGuideHTML95(){
 const t=s=>esc(gT(s));
 return `<div class="card" id="helpGuide95">
  <h2>${t('First time here? Read me')}</h2>
  <p>${t('Lamplight is a quiet place to learn, play, and glow. Stories, games, and a Lamp that grows with your child — all on this device.')}</p>
  <h3>${t("Today's Story")}</h3>
  <p>${t("Today's Story is on Home. There are three ways to share it:")}</p>
  <ul>
   <li><b>${t('Solo')}</b> — ${t('Your child reads at their own pace, then a few gentle questions.')}</li>
   <li><b>${t('Read Together')}</b> — ${t('They read aloud, and you can tap a word that felt tricky.')}</li>
   <li><b>${t('Printed Page')}</b> — ${t('A page to print and read away from the screen.')}</li>
  </ul>
  <h3>${t('Kids on this device')}</h3>
  <p>${t('Kids on this device, in Grown-ups, is where you add a child, choose a picture, and set a story grade if you like. You can leave the grade unset; nothing is locked out. Each child keeps their own progress.')}</p>
  <h3>${t('Lamp')}</h3>
  <p>${t('The Lamp on Home grows when your child notices and tries again — never by going fast or chasing a score. In Kids, you can pick that child’s Lamp colors and glow effect.')}</p>
  <h3>${t('Explore')}</h3>
  <p>${t('Explore on Home holds more to enjoy, including games. Practice lets you take your time; Challenge keeps the original timing and scores, if you want them.')}</p>
  <p>${t('Everything stays on this device: no accounts, no tracking, and no data sent away. A grown-up can tap Save everything in Grown-ups so the app works offline.')}</p>
  <h3>${t('Where the settings are')}</h3>
  <p>${t('The menu language is on Home. Colors and text size are in Grown-ups → Look. A child’s Lamp colors, effects, and story grade are in Kids on this device. This Help page is in Grown-ups.')}</p>
 </div>`;
}

function helpTidy95(){
 const about=typeof $==='function'&&$('about');if(!about)return;
 const how=typeof gT==='function'?gT('For grown-ups: how to use it'):'';
 const where=typeof gT==='function'?gT('Where to find things'):'';
 about.querySelectorAll('.card').forEach(card=>{
  if(card.id==='helpGuide95')return;
  const h=(card.querySelector('h2,h3')?.textContent||'').replace(/\s+/g,' ').trim();
  const t=card.innerText||'';
  if(h==='For grown-ups: how to use it'||h===how||h==='Para adultos: cómo usarla')card.remove();
  else if(h==='Where to find things'||h===where||h==='Dónde encontrar las cosas')card.remove();
  else if(/Read to me|Pick a tab for their age|Babies and toddlers/.test(t)&&/Echo|Eco/.test(t)&&card.querySelector('ol'))card.remove();
 });
 about.querySelectorAll('p').forEach(p=>{
  if(/Hum & match|Tararea y acierta/.test(p.textContent))p.remove();
 });
 hideEcho95(about);
 if(!about.querySelector('#helpGuide95'))about.insertAdjacentHTML('afterbegin',helpGuideHTML95());
}

{if(!show._v97){const sh=show;show=function(id){
 if(id==='echo'&&!echoEnabled95())id='hub';
 const r=sh.call(this,id);
 afterShow95(id);
 return r;
}}}
function afterShow95(id){
 if(id==='look')lookTrim95();
 if(id==='about'){helpTidy95();hideEcho95($('about'))}
 if(id==='kids'){hideEcho95($('kids'));kidsAttach95()}
 if(id==='hub'){hideEcho95($('hub'));hubCopy95()}
 if(id==='cards')cardsSilence95();
 if(id==='solo')soloSilence95();
 if(id==='adults'||id==='daycare'||id==='games'||id==='log')hideEcho95($(id));
}
if(typeof RENDER==='object'&&typeof RENDER.echo==='function'){
 const re=RENDER.echo;
 RENDER.echo=function(){if(!echoEnabled95())return show('hub');return re.apply(this,arguments)};
 if(typeof renderEcho==='function')renderEcho=RENDER.echo;
}

{const ss=soloStart;soloStart=function(){const r=ss.apply(this,arguments);soloSilence95();return r}}
if(typeof readToMe==='function')readToMe=function(){try{stopRead()}catch(e){}};
['soloDone','soloQ','soloAns','renderSolo'].forEach(name=>{
 if(typeof window[name]==='function'){
  const prev=window[name];
  window[name]=function(){const r=prev.apply(this,arguments);soloSilence95();return r};
 }
});

if(typeof cardSay==='function')cardSay=function(){};
{const rc=renderCards;renderCards=function(){
 applyDecks95();
 const r=rc.apply(this,arguments);
 cardsSilence95();
 return r;
};if(typeof RENDER==='object')RENDER.cards=renderCards}

{const sp=speak;speak=function(){
 const quiet=['solo','cards','session','lookup','echo'];
 for(const id of quiet){
  const el=typeof $==='function'&&$(id);
  if(el&&!el.classList.contains('hidden'))return null;
 }
 return sp.apply(this,arguments);
}}

if(typeof dailyGrades64==='function')dailyGrades64=function(){return ''};

{const lk=typeof renderLook==='function'?renderLook:RENDER&&RENDER.look;
 if(typeof lk==='function'){
  renderLook=function(){const r=lk.apply(this,arguments);lookTrim95();return r};
  if(typeof RENDER==='object')RENDER.look=renderLook;
 }
}
if(typeof renderVoicePick==='function'&&!VOICE_PICKER95){
 const vp=renderVoicePick;
 renderVoicePick=function(){const el=$('vpick');if(el)el.remove();return};
}

{const ep=editP;editP=function(){const r=ep.apply(this,arguments);kidsAttach95();return r}}
if(typeof lampMountAll73==='function'){
 const mt=lampMountAll73;
 lampMountAll73=function(){const r=mt.apply(this,arguments);kidsAttach95();return r};
}
{const rk=typeof renderKids==='function'?renderKids:RENDER&&RENDER.kids;
 if(typeof rk==='function'){
  renderKids=function(){
   const r=rk.apply(this,arguments);
   hideEcho95($('kids'));
   const form=$('pform');
   if(form&&!form.dataset.pid73&&typeof curPid==='function'&&curPid()&&typeof editP==='function')editP(curPid());
   else kidsAttach95();
   return r;
  };
  if(typeof RENDER==='object')RENDER.kids=renderKids;
 }
}

function afterPage95(id,fn){
 if(typeof fn!=='function')return fn;
 return function(){const r=fn.apply(this,arguments);const el=typeof $==='function'&&$(id);if(el){hideEcho95(el);if(id==='about')helpTidy95();if(id==='hub')hubCopy95();if(id==='cards')cardsSilence95()}return r};
}
function hubCopy95(){
 const root=$('hub');if(!root)return;
 const want=gT("Today's Story is available in English and Spanish. You can still enjoy the games and change the menu language on Home.");
 root.querySelectorAll('p').forEach(p=>{
  const t=p.textContent||'';
  if(/menu language in Look|idioma de los menús en Apariencia|idioma de los menús en Aspecto/.test(t))p.textContent=want;
 });
}

if(typeof RENDER==='object'){
 for(const id of ['hub','adults','daycare','log','about','games']){
  if(typeof RENDER[id]==='function')RENDER[id]=afterPage95(id,RENDER[id]);
 }
 if(typeof renderHub==='function')renderHub=RENDER.hub;
 if(typeof renderAdults==='function')renderAdults=RENDER.adults;
 if(typeof renderDaycare==='function')renderDaycare=RENDER.daycare;
 if(typeof renderAbout==='function')renderAbout=RENDER.about;
}

{const ra=typeof renderAbout==='function'?renderAbout:null;
 if(ra){
  renderAbout=function(){const r=ra.apply(this,arguments);helpTidy95();hideEcho95($('about'));return r};
  if(typeof RENDER==='object')RENDER.about=renderAbout;
 }
}

document.head.insertAdjacentHTML('beforeend',`<style id="v95css">
#solo .w,#solo .sw{cursor:text}
#cards .reveal,#cards .cword{cursor:default}
#helpGuide95 h2{font-size:1.55rem;margin:.15em 0 .55em}
#helpGuide95 h3{font-size:1.15rem;margin:1em 0 .35em}
#helpGuide95 p,#helpGuide95 li{line-height:1.5}
#helpGuide95 ul{margin:.25em 0 .85em;padding-inline-start:1.2em}
#helpGuide95 li{margin:.28em 0}
#pform [data-flame81-picker],#pform [data-fx89-picker]{margin-top:16px}
#pform .fx92-live{margin-bottom:10px}
.lu83-svg{width:100%;height:auto;display:block}
</style>`);

function installLook95(){
 if(typeof pWrap68==='function')pWrap68('renderLook',null,()=>lookTrim95());
 else if(typeof renderLook==='function'){
  const lk=renderLook;
  renderLook=function(){const r=lk.apply(this,arguments);lookTrim95();return r};
 }
 if(typeof RENDER==='object'&&typeof renderLook==='function')RENDER.look=renderLook;
 lookTrim95();
}
installLook95();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installLook95);
setTimeout(installLook95,0);
if(typeof RENDER==='object'){
 const vis=id=>typeof $==='function'&&$(id)&&!$(id).classList.contains('hidden');
 if(vis('look')&&typeof renderLook==='function')renderLook();
 if(vis('kids')&&typeof renderKids==='function')renderKids();
 if(vis('about')&&typeof renderAbout==='function')renderAbout();
 if(vis('hub')&&typeof RENDER.hub==='function')RENDER.hub();
 if(vis('cards')&&typeof renderCards==='function')renderCards();
}
