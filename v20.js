// v20: fuller Spanish/Arabic, pattern translation, attributes, deck names, instant language select, nav always reachable.
(function(){if(typeof LANG==='undefined'||LANG==='en')return;
const AR=LANG==='ar',num=n=>AR?String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]):n,D=k=>DICT[k];
const PAREN={es:{'short a':'a corta','short e':'e corta','short i':'i corta','short o':'o corta','short u':'u corta','silent e':'e muda','Star Fleet!':'¡Flota Estelar!'},ar:{'short a':'a القصيرة','short e':'e القصيرة','short i':'i القصيرة','short o':'o القصيرة','short u':'u القصيرة','silent e':'e الصامتة','Star Fleet!':'أسطول النجوم!'}}[LANG]||{};
const one=s=>{s=s.trim().replace(/\(([^)]*)\)/g,(x,c)=>PAREN[c]?'('+PAREN[c]+')':x);if(!s)return s;if(!s)return s;if(D(s))return D(s);const m=s.match(/^(.*?)\s*(\([^)]*\))$/);if(m&&D(m[1]))return D(m[1])+' '+m[2];return null};
const RX=[
 [/^of (\d+)$/,m=>D('of')+' '+m[1]],[/^(cards?|stories|story|words)$/,m=>D(m[1])||D(m[1]+'s')],[/^words ·$/,m=>(D('words')||'words')+' ·'],[/^about (\d+) minutes$/,m=>AR?'نحو '+m[1]+' دقيقة':'unos '+m[1]+' minutos'],[/^sessions\)$/,m=>AR?'جلسات)':'sesiones)'],[/^(\d+) words$/,m=>m[1]+' '+(D('words')||'words')],[/^(\d+) stories$/,m=>m[1]+' '+(D('stories')||'stories')],[/^(\d+) cards?$/,m=>m[1]+' '+(D('cards')||'cards')],
 [/^(\d+) of (\d+)$/,m=>m[1]+' '+(D('of')||'of')+' '+m[2]],[/^Reader (\d+)$/,m=>D('Reader')+' '+m[1]],[/^Reader (\d+)'s Light$/,m=>AR?'نور القارئ '+m[1]:'La luz de Lector '+m[1]],
 [/^Grades? (\d)\s*[–-]\s*(\d)$/,m=>(AR?'الصفوف ':'Grados ')+m[1]+'–'+m[2]],[/^Grade (\d)$/,m=>D('Grade')+' '+m[1]],[/^App version (\d+)$/,m=>D('App version')+' '+m[1]],
 [/^Solo para Reader (\d+)$/,m=>'Solo para '+D('Reader')+' '+m[1]],[/^Erase (.+)'s progress$/,m=>AR?'امسح تقدّم '+m[1]:'Borrar el progreso de '+m[1]],[/^Export (.+)'s log \(JSON\)$/,m=>AR?'صدّر سجلّ '+m[1]+' (JSON)':'Exportar el registro de '+m[1]+' (JSON)'],
 [/^stories · (\d+) kinds · (\d+)\/26 letters · (\d+)-day streak\. Next color at (\d+) stor(?:y|ies)\.$/,m=>AR?`قصص · ${m[1]} أنواع · ${m[2]}/26 حرفًا · ${m[3]} أيام متتالية. اللون التالي عند ${m[4]} قصة.`:`cuentos · ${m[1]} tipos · ${m[2]}/26 letras · racha de ${m[3]} días. Siguiente color en ${m[4]} cuento(s).`],
 [/^Best scores stay on this device: Rhythm (\d+)% · Scramble (\d+) · Sprint (\d+)$/,m=>`${D('Best scores stay on this device: Rhythm')} ${m[1]}% · ${D('Scramble')} ${m[2]} · ${D('Sprint')} ${m[3]}`],
 [/^Save everything: (\d+) files, about$/,m=>`${D('Save everything:')} ${m[1]} ${D('files, about')}`],
 [/^Hz · (Square|Round) plate mode \(([^)]*)\) · resonates at (\d+) Hz · move the tone closer to resonate$/,m=>`Hz · ${D(m[1]+' plate')} (${m[2]}) · ${AR?'يرنّ عند':'resuena a'} ${m[3]} Hz · ${D('move the tone closer to resonate')}`],
 [/^Hz · (Square|Round) plate mode \(([^)]*)\) · resonates at (\d+) Hz(.*)$/,m=>`Hz · ${D(m[1]+' plate')} (${m[2]}) · ${AR?'يرنّ عند':'resuena a'} ${m[3]} Hz${m[4]?' · ✨':''}`],
];
function tr(core){for(const[r,f]of RX){const m=core.match(r);if(m){try{const o=f(m);if(o&&!/undefined/.test(o))return o}catch(e){}}}
 if(core.includes(' · ')){let ch=0;const o=core.split(' · ').map(seg=>{if(/^words(\s|$)/.test(seg)||/,/.test(seg)){const w=seg.match(/^words(?: · )?(.*)$/);const list=(w?w[1]:seg).split(/,\s*/).map(x=>one(x)||x);if(w){ch=1;return D('words')+(w[1]?' · '+list.join(AR?'، ':', '):'')}const t=list.join(AR?'، ':', ');if(t!==seg)ch=1;return t}
  const r=one(seg)||tr1(seg.trim());if(r&&r!==seg){ch=1;return r}return seg.trim()===seg?seg:seg.trim()}).join(' · ');return ch?o:null}
 if(/^words · /.test(core))return null;return tr1(core)}
function tr1(s){for(const[r,f]of RX){const m=s.match(r);if(m){try{return f(m)}catch(e){}}}return null}
const post=n=>{const v=n.nodeValue;let o=v.replace(/\bReader (\d+)/g,(x,d)=>D('Reader')+' '+d).replace(/, focus: /g,AR?'، التركيز: ':', enfoque: ').replace(/· about (\d+) minutes/,(x,d)=>'· '+(AR?'نحو '+d+' دقيقة':'unos '+d+' minutos'));if(o!==v)n.nodeValue=o};
const tt=trText;trText=function(n){tt(n);try{x(n)}finally{post(n)}};const x=function(n){const raw=n.nodeValue;if(!raw||!raw.trim())return;const m=raw.match(/^(\s*[^\p{L}]*?)([\p{L}].*?)(\s*)$/su);if(!m||DICT[m[2]])return;
 let core=m[2];if(/^words · /.test(core)||/^words$/.test(core)){const o=tr(core);if(o){n.nodeValue=m[1]+o+m[3]}return}const o=tr(core);if(o&&o!==core)n.nodeValue=m[1]+o+m[3]};
// placeholders, titles, aria-labels
function trAttrs(root){(root.querySelectorAll?root:document).querySelectorAll('[placeholder],[title],[aria-label]').forEach(e=>['placeholder','title','aria-label'].forEach(a=>{const v=e.getAttribute(a);if(!v)return;const k=v.trim();const o=DICT[k]||(k.match(/^(\S+)\s(.+)$/)&&DICT[k.replace(/^\S+\s/,'')]?k.split(' ')[0]+' '+DICT[k.replace(/^\S+\s/,'')]:null)||tr1(k);if(o&&o!==v)e.setAttribute(a,o)}))}
let at=0;new MutationObserver(()=>{if(at)return;at=requestAnimationFrame(()=>{at=0;trAttrs(document)})}).observe(document.documentElement,{childList:true,subtree:true});
// Deck names: Home is "house" here, not the Home screen.
const DN={es:{animals:'Animales',home:'Casa',sky:'Cielo',food:'Comida',body:'Cuerpo',feel:'Sentimientos'},ar:{animals:'الحيوانات',home:'بيت',sky:'السماء',food:'الطعام',body:'الجسم',feel:'المشاعر'}}[LANG];
if(DN&&typeof DECKS!=='undefined')Object.keys(DECKS).forEach(k=>{if(DN[k])DECKS[k][0]=DECKS[k][0].replace(/^(\S+)\s.*$/,'$1 '+DN[k])});
})();
// Language dropdown applies right away (device-wide). "Just <kid>" stays as a separate button.
document.addEventListener('change',e=>{if(e.target&&e.target.id==='langsel'&&e.target.value!==LANG){const s=e.target;s.disabled=true;const c=$('langcard');if(c)c.insertAdjacentHTML('beforeend','<p class="soft">⏳ …</p>');setLang(s.value,'dev')}});
// Nav always reachable: a small floating Home button when the header is hidden or scrolled away.
document.body.insertAdjacentHTML('beforeend',`<button id="fhome" class="noprint" onclick="try{document.body.classList.remove('bedtime')}catch(e){}try{btStop()}catch(e){}show('hub');scrollTo(0,0)" aria-label="Home">🏠</button>`);
document.head.insertAdjacentHTML('beforeend',`<style>#fhome{position:fixed;z-index:9999;top:10px;inset-inline-start:10px;width:44px;height:44px;border-radius:50%;padding:0;font-size:1.3rem;box-shadow:0 2px 8px #0004;display:none;margin:0}
body.v20float #fhome,body.bedtime #fhome{display:block!important;opacity:.85}
@media (max-width:640px){.sqcard label.button,.sqcard .button{display:inline-block!important;visibility:visible!important;opacity:1!important}.nbgrid,.sqroll{margin-bottom:6px}}
</style>`);
{const upd=()=>{const h=document.querySelector('header');const off=!h||h.getBoundingClientRect().bottom<0||getComputedStyle(h).display==='none';const onHub=$('hub')&&!$('hub').classList.contains('hidden');document.body.classList.toggle('v20float',off&&!onHub)};addEventListener('scroll',upd,{passive:true});setInterval(upd,700)}
// Composer: readable Import button, and no empty band under a short grid.
document.head.insertAdjacentHTML('beforeend','<style>.sqcard label.button{background:#f6efe0!important;color:#1b1f38!important;border:1px solid #c9bfa8;border-radius:8px;padding:.45em .8em;cursor:pointer;opacity:1!important}</style>');
{const rc=renderCompose;renderCompose=function(){rc.apply(this,arguments);const r=document.querySelector('.sqroll'),cv=$('sqc');if(r&&cv)requestAnimationFrame(()=>{const h=cv.getBoundingClientRect().height+16;r.style.height=Math.min(innerHeight*.5,h)+'px';const k=$('sqkeys'),w=$('sqwrap');if(k)k.style.height='100%';if(w)w.style.height='100%'})}}
