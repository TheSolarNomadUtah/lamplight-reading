// v13: Languages. UI strings live in lang/<code>.json (downloaded only when picked). Spanish also swaps in Spanish stories,
// letters (with Ñ, CH, LL), picture-card words and Spanish voices. Other languages: UI only for now; English phonics games are hidden.
const LANGS=[['en','English'],['es','Español'],['pt','Português'],['fr','Français'],['zh','中文（简体）'],['hi','हिन्दी'],['ar','العربية'],['vi','Tiếng Việt'],['tl','Tagalog',1],['ko','한국어'],['ja','日本語'],['de','Deutsch'],['it','Italiano'],['ru','Русский'],['nv','Diné bizaad',1],['sw','Kiswahili',1],['uk','Українська']];
const RTL=['ar','he','ur','fa'],CONTENT=['en','es'];
PKEYS.push('lamp_lang');
function curLang(){const ok=c=>LANGS.some(x=>x[0]===c);const k=LS.get('lamp_lang')||RAW.get('lamp_lang_device');if(k&&ok(k))return k;const n=(navigator.language||'en').slice(0,2).toLowerCase();return ok(n)?n:'en'}
let DICT={};const LANG=curLang();
function T(s){return DICT[s]||s}
function trText(node){const raw=node.nodeValue;if(!raw||!raw.trim())return;const m=raw.match(/^(\s*[^\p{L}]*?)([\p{L}].*?)(\s*)$/su);if(!m)return;
 let core=m[2],out=DICT[core];if(!out){const h=core.match(/^Hi, (.+)!$/);if(h&&DICT.Hi)out=DICT.Hi+', '+h[1]+'!'}if(!out&&/[!?.]$/.test(core)&&DICT[core.slice(0,-1)])out=DICT[core.slice(0,-1)]+core.slice(-1);if(out&&out!==core)node.nodeValue=m[1]+out+m[3]}
function trTree(root){if(LANG==='en')return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement&&n.parentElement.closest('.story,.kline,#sst,script,style,textarea')?2:1});let n;while(n=w.nextNode())trText(n)}
function setLang(c,scope){if(scope==='kid')LS.set('lamp_lang',c);else{RAW.set('lamp_lang_device',c);LS.del('lamp_lang')}location.reload()}
function langPicker(){const p=curProfile();return `<div class="card" id="langcard"><h3>🌐 Language</h3><select id="langsel" style="font-size:1.1rem">${LANGS.map(l=>`<option value="${l[0]}" ${l[0]===LANG?'selected':''}>${l[1]}${l[2]?' (beta, help us improve)':''}</option>`).join('')}</select>
 <button onclick="setLang($('langsel').value,'dev')">Use on this device</button> <button onclick="setLang($('langsel').value,'kid')">Just ${esc(p.name)}</button>
 <p class="soft">Translations are new; tell us if something sounds wrong.${CONTENT.includes(LANG)?'':' Stories and letter games are in English for now; the letter games are hidden in this language.'}</p></div>`}
document.documentElement.lang=LANG;if(RTL.includes(LANG))document.documentElement.dir='rtl';
if(LANG==='es'){
 ES_STORIES.forEach(s=>{s.talk=s.talk||['¿Qué parte te gustó más?','¿Qué pasaría después?'];s.coach=s.coach||[];s.words=s.words||[];s.takeaway=s.takeaway||s.hook;s.tags=s.tags||[]});S.splice(0,S.length,...ES_STORIES);ECHO.splice(0,ECHO.length,...ES_ECHO);MUSIC.letters=ES_LETTERS.map(x=>[x[0],x[1]||'(muda)',x[2],x[3]]);
 AB.splice(14,0,'Ñ');CARDS.forEach(c=>{if(ES_CARDS[c[1]]){c[1]=ES_CARDS[c[1]];c[2]=c[1].split('').join('-')}});
 VOICES.splice(0,VOICES.length,['dora','Dora','Voz cálida (predeterminada)'],['alex','Alex','Voz tranquila de hombre']);window.SPEAK_LANG='es-ES';
 MUSIC.songs=ES_ECHO.map((e,i)=>({id:'es_m'+i,t:e.t,band:'Eco 0–3',kind:e.kind,bpm:84,lines:e.lines.map(l=>l.replace(/-/g,'|'))}));MUSIC.drum=[['Nivel 1 · un golpe',['sol','pan','luz','mar','flor','pez']],['Nivel 2 · dos golpes',['lu|na','ga|to','ca|sa','pe|rro','o|so','ma|no']],['Nivel 3 · tres golpes',['ca|mi|sa','pa|lo|ma','to|ma|te','co|ne|jo']],['Nivel 4 · cuatro golpes',['ma|ri|po|sa','cho|co|la|te','e|le|fan|te']]];
 Object.assign(PHRK,{'¡sí!':'p_yes','¡muy bien!':'p_great'});
}
const curVoice0=curVoice;curVoice=function(){const v=LS.get('lamp_voice')||RAW.get('lamp_voice_family');return VOICES.some(x=>x[0]===v)?v:VOICES[0][0]};
const clipKey0=clipKey;clipKey=function(t){const s=String(t).trim();if(/^(ch|ll|[a-zñ])$/i.test(s))return 'n_'+s.toLowerCase();const n=s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[¡¿]/g,'');return PHRK[s.toLowerCase()]||(/^[a-z']+[.!?]?$/.test(n)?'w_'+n.replace(/[^a-z]/g,''):clipKey0(t))};
if(!CONTENT.includes(LANG))document.head.insertAdjacentHTML('beforeend',`<style>[onclick*="show('letters')"],[onclick*="show('trace')"],[onclick*="show('cards')"],[onclick*="MU={v:'letters'}"]{display:none!important}</style>`);
if(RTL.includes(LANG))document.head.insertAdjacentHTML('beforeend','<style>html[dir=rtl] body{text-align:right}html[dir=rtl] .hubgrid,html[dir=rtl] nav,html[dir=rtl] header{direction:rtl}</style>');
// Language picker on Home and Look, and the note in Grown-ups.
const rHub13=renderHub;renderHub=function(){rHub13();$('hub').insertAdjacentHTML('beforeend',langPicker())};RENDER.hub=renderHub;
const rLook13=renderLook;renderLook=function(){rLook13();$('look').insertAdjacentHTML('afterbegin',langPicker())};
const rAd13=renderAdults;renderAdults=function(){rAd13();$('adults').insertAdjacentHTML('afterbegin','<p class="card soft">🌐 Translations are new; tell us if something sounds wrong.</p>')};RENDER.adults=renderAdults;
if(LANG!=='en'){document.documentElement.classList.add('i18nwait');setTimeout(()=>document.documentElement.classList.remove('i18nwait'),2500);const cd=safeJSON(RAW.get('lamp_dict_'+LANG),null);if(cd){DICT=cd;trTree(document.body);window.I18N_OBS=1;new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>n.nodeType===3?trText(n):n.nodeType===1&&trTree(n)))).observe(document.body,{childList:true,subtree:true});}else{document.documentElement.classList.add('i18nwait');setTimeout(()=>document.documentElement.classList.remove('i18nwait'),1500)}document.head.insertAdjacentHTML('beforeend','<style>html.i18nwait body{visibility:hidden}</style>')}
(LANG==='en'?Promise.resolve({}):fetch('lang/'+LANG+'.json').then(r=>r.json()).catch(()=>safeJSON(RAW.get('lamp_dict_'+LANG),{}))).then(d=>{DICT=d;if(LANG!=='en'){try{RAW.set('lamp_dict_'+LANG,JSON.stringify(d))}catch(e){}}document.documentElement.classList.remove('i18nwait');trTree(document.body);if(!window.I18N_OBS){window.I18N_OBS=1;new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>n.nodeType===3?trText(n):n.nodeType===1&&trTree(n)))).observe(document.body,{childList:true,subtree:true});}
 const vis=SECTIONS.find(x=>$(x)&&!$(x).classList.contains('hidden'))||'hub';show(vis)});
// v30: translate a whole string at render time ({name} slots filled after lookup), and format numbers for the current language.
function gT(s,o){let r=(typeof DICT!=='undefined'&&DICT[s])||s;if(o)for(const k in o)r=r.split('{'+k+'}').join(o[k]);return r}
function gNum(n,d){try{return Number(n).toLocaleString(LANG,{minimumFractionDigits:d||0,maximumFractionDigits:d||0})}catch(e){return Number(n).toFixed(d||0)}}
function gPct(f,d){try{return new Intl.NumberFormat(LANG,{style:'percent',minimumFractionDigits:d||0,maximumFractionDigits:d||0}).format(f)}catch(e){return (f*100).toFixed(d||0)+'%'}}
