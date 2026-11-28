/* v175 (1): every Lamp glow sits on the friend. The glow layers (plate, halo/bloom light, Bright core,
   effect layers, the big hero glow) were centred on the 200x200 frame, but most friends sit low in it,
   so the glow rode above them. After each mount, measure the friend's ink and move the glow onto it.
   (2) Day page only (AD trap 3): wise/grown auras and effect glows were drawn for night and go faint on
   paper, so give them a warm ink tone and a little more strength there. Night is unchanged. */
(function(){
'use strict';
var SKIP='.lamp73-plate,.lamp-fx-light,.il-glow,.fx2-norma,.il-sky-chip';
function inkBox(svg){var g=svg.querySelector('.lamp73-ink')||svg.querySelector('[data-il-kind]');if(!g)return null;
 var a=1e9,b=1e9,c=-1e9,d=-1e9,n=0;
 g.querySelectorAll('path,ellipse,circle,polygon,rect,line,polyline').forEach(function(el){
  if(el.closest(SKIP))return;if(el.tagName==='rect'&&el.getAttribute('fill')==='#120E18')return;
  if(el.closest('defs,clipPath,mask,radialGradient,linearGradient'))return;
  var r=el.getBoundingClientRect();if(!r.width&&!r.height)return;
  a=Math.min(a,r.left);b=Math.min(b,r.top);c=Math.max(c,r.right);d=Math.max(d,r.bottom);n++});
 return n?{cx:(a+c)/2,cy:(b+d)/2}:null}
function ctr(el){var r=el.getBoundingClientRect();return {cx:r.left+r.width/2,cy:r.top+r.height/2,w:r.width}}
function mv(el,ink){if(!el)return;el.style.translate='';var c=ctr(el);if(!c.w)return;
 var dx=Math.round((ink.cx-c.cx)*10)/10,dy=Math.round((ink.cy-c.cy)*10)/10;
 if(Math.abs(dx)<.5&&Math.abs(dy)<.5)return;el.style.translate=dx+'px '+dy+'px'}
function centerShell(shell){
 var svg=shell.querySelector('svg.lamp73-svg');if(!svg)return;
 var plate=svg.querySelector('.lamp73-plate');if(plate)plate.removeAttribute('transform');
 var ink=inkBox(svg);if(!ink)return;
 if(plate){var pc=ctr(plate),sr=svg.getBoundingClientRect(),vb=svg.viewBox&&svg.viewBox.baseVal,k=(vb&&vb.width&&sr.width)?vb.width/sr.width:1;
  var dx=(ink.cx-pc.cx)*k,dy=(ink.cy-pc.cy)*k;if(Math.abs(dx)+Math.abs(dy)>.3)plate.setAttribute('transform','translate('+dx.toFixed(2)+' '+dy.toFixed(2)+')')}
 var light=shell.querySelector('svg.lamp-fx-light');
 if(light){light.style.translate='';var h=light.querySelector('.halo');
  if(h){var hc=ctr(h);var dx2=Math.round((ink.cx-hc.cx)*10)/10,dy2=Math.round((ink.cy-hc.cy)*10)/10;if(Math.abs(dx2)+Math.abs(dy2)>.5)light.style.translate=dx2+'px '+dy2+'px'}}
 shell.querySelectorAll(':scope>.fx89-layer,:scope>.fx111-core-soft').forEach(function(el){mv(el,ink)});
 var hero=shell.closest('.lamp76-hero');var g=hero&&hero.querySelector(':scope>.lamp76-glow');if(g)mv(g,ink)}
var busy=0;
function run(){busy=0;try{document.querySelectorAll('.lamp73-shell').forEach(function(s){if(s.offsetParent)centerShell(s)})}catch(e){}}
function soon(){if(busy)return;busy=1;requestAnimationFrame(function(){requestAnimationFrame(run)})}
['lampMountAll73','lampFxRemount89','lampFxInsert89','lampFxDecorate111'].forEach(function(n){var f=window[n];if(typeof f!=='function')return;
 window[n]=function(){var r=f.apply(this,arguments);soon();return r}});
try{var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;if(t&&t.closest&&t.closest('.lamp76-hero,.lamp73-shell')){soon();return}}});
 mo.observe(document.body,{childList:true,subtree:true})}catch(e){}
window.addEventListener('resize',soon);
soon();
try{var D='.lamp73-shell.lamp-fx-day',W='[data-il-stage="wise"]',G='[data-il-stage="grown"]';
 var css=
 /* wise/grown auras: cream/gold rings, rims and rosettes drawn for night get a warm ink tone on paper */
 [W,G].map(function(s){return D+' '+s+' [fill="none"][stroke="#FFE4A4"],'+D+' '+s+' [fill="none"][stroke="#FFF6D8"]'}).join(',')+'{stroke:#B98535}'+
 [W,G].map(function(s){return D+' '+s+' [fill="none"][stroke="#E6B454"]'}).join(',')+'{stroke:#A8762A}'+
 D+' '+W+' .il-fine[fill="none"][stroke="#E6B454"]{opacity:.6}'+
 D+' '+W+' .il-fine[fill="#FFE4A4"][opacity=".5"]{fill:#C08B34;opacity:.85}'+
 [W,G].map(function(s){return D+' '+s+' .il-p[stroke="#E6B454"]'}).join(',')+'{opacity:.7}'+
 D+' '+W+' .il-p[stroke="#FFE4A4"]{opacity:.8}'+
 D+' '+W+' .il-h,'+D+' '+G+' .il-h{filter:saturate(1.3)}'+
 /* effect glows on paper: a little stronger, and screen-blend layers drawn normally (screen washes out on light paper) */
 '.lamp-fx.lamp-fx-day .halo,.lamp-fx.lamp-fx-day .bloom{animation-name:lamp-breath-day175}'+
 '@keyframes lamp-breath-day175{0%,100%{opacity:.5;transform:scale(.88)}50%{opacity:.72;transform:scale(.94)}}'+
 D+'>.fx89-layer,'+D+'>.fx111-core-soft{mix-blend-mode:normal!important}'+
 D+'>.fx89-layer{filter:saturate(1.25) contrast(1.08)}';
 var st=document.createElement('style');st.id='v175css';st.textContent=css;document.head.appendChild(st)}catch(e){}
window.IL175={version:175,center:run};
})();

/* v175 (3): Studio's approved sounds (Ignacio, "Keep/Add", Nov 15).
   U6 "A soothing tone" on the 19-cell Honeycomb Builder (HoneyTone, honeycomb-tone.js).
   U5 option A "Sleepy shapes" in the Wind-down Gallery (WindDownShapes, wind-down-shapes.js).
   U13: 12 real public-domain Sound Cards (soundcards-u13.js + audio/sc13/), with art, credits and the
   corrected intro line. Every one stops on its toggle, on leaving the screen, on hide/pagehide, and
   when Soft sounds is off (built into Studio's modules). */
(function(){
'use strict';
function es(){try{return (typeof LANG==='string'&&LANG==='es')}catch(e){return false}}
function lg(){try{return typeof LANG==='string'?LANG:'en'}catch(e){return 'en'}}
function E(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}
function $$(id){return document.getElementById(id)}
function patOpen(){var p=$$('patterns');return !!p&&!p.classList.contains('hidden')}
function setBtn(b,on){if(!b)return;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false')}

/* ---- U6 honeycomb tone ---- */
var HT={on:false};
function hexActive(){try{return PAT106.unit==='honeycomb'&&patOpen()}catch(e){return false}}
function hexCells(){return document.querySelectorAll('#toy124hex .toy124-hex-on').length||1}
function hexUI(){if(!window.HoneyTone||!hexActive())return;var st=$$('toy124hex');if(!st)return;
 var row=st.parentNode.querySelector('.pat-row');if(!row||row.querySelector('[data-ht175]'))return;
 var b=document.createElement('button');b.type='button';b.setAttribute('data-ht175','1');b.textContent=HoneyTone.label(lg()==='ar'?'ar':(es()?'es':'en'));
 var note=document.createElement('p');note.className='soft';note.setAttribute('data-ht175n','1');note.textContent=HoneyTone.label(es()?'es':'en','note');
 setBtn(b,HT.on&&HoneyTone.isOn());
 b.onclick=function(){if(HoneyTone.isOn()){HT.on=false;HoneyTone.detach('off');setBtn(b,false);return}
  HT.on=true;HoneyTone.attach({cells:hexCells(),isActive:hexActive,onStop:function(){HT.on=false;document.querySelectorAll('[data-ht175]').forEach(function(x){setBtn(x,false)})}});
  setBtn(b,HoneyTone.isOn());if(!HoneyTone.isOn())HT.on=false};
 row.appendChild(b);row.parentNode.insertBefore(note,row.nextSibling);
 if(HoneyTone.isOn())HoneyTone.setCells(hexCells())}
/* hexDraw124 is private to v124 and rebuilds #patterns on every tap, so watch #patterns itself. */
(function(){var pt=$$('patterns');if(!pt||typeof MutationObserver!=='function')return;
 new MutationObserver(function(){if(document.getElementById('toy124hex'))try{hexUI()}catch(e){}}).observe(pt,{childList:true})})();

/* ---- U5 wind-down option A ---- */
var WT={en:{b:'Sleepy shapes',n:'Two soft tones draw a slow loop that gets smaller and quieter, then rests.',stop:'Stop',done:'Good night.',aria:'Two soft tones draw a slowly turning loop that gets smaller and fades.'},
 es:{b:'Formas con sueño',n:'Dos tonos suaves dibujan un lazo lento que se hace más pequeño y más bajito, y luego descansa.',stop:'Parar',done:'Buenas noches.',aria:'Dos tonos suaves dibujan un lazo que gira despacio, se hace pequeño y se apaga.'}};
function wt(k){return (es()?WT.es:WT.en)[k]}
function windActive(){try{return PAT106.unit==='wind'&&patOpen()}catch(e){return false}}
function windUI(){if(!window.WindDownShapes)return;var w=$$('patWind106');if(!w)return;var row=w.parentNode.querySelector('.pat-row');
 if(!row||row.querySelector('[data-wd175]'))return;
 var b=document.createElement('button');b.type='button';b.setAttribute('data-wd175','1');b.textContent=wt('b');
 var note=document.createElement('p');note.className='soft';note.id='wd175note';note.textContent=wt('n');
 var stage=$$('patWindStage106');
 function reset(){setBtn(b,false);b.textContent=wt('b');if(stage)stage.style.display=''}
 b.onclick=function(){if(WindDownShapes.isOn()){WindDownShapes.detach('off');reset();return}
  note.textContent=wt('n');if(stage)stage.style.display='none';
  WindDownShapes.attach({host:w,ratio:'2:3',ariaLabel:wt('aria'),isActive:windActive,
   onDone:function(){reset();note.textContent=wt('done')},onStop:function(){reset()}});
  if(WindDownShapes.isOn()){setBtn(b,true);b.textContent=wt('stop')}else reset()};
 row.appendChild(b);row.parentNode.insertBefore(note,row.nextSibling)}
if(typeof patWindDraw106==='function'){var wd=patWindDraw106;patWindDraw106=function(){try{if(window.WindDownShapes&&WindDownShapes.isOn())WindDownShapes.detach('off')}catch(e){}var r=wd.apply(this,arguments);try{windUI()}catch(e){}return r}}

/* ---- U13 sound cards: intro copy, art, credits ---- */
var OLD='Tap a picture to hear a sound. The sound is made on this device. Nothing is recorded.';
var NEW={en:'Tap a picture to hear a sound. Some sounds are made on this device; others are real recordings from nature, with credits. Nothing is recorded from you.',
 es:'Toca una imagen para oír un sonido. Algunos sonidos se hacen en este dispositivo; otros son grabaciones reales de la naturaleza, con créditos. No se graba nada tuyo.'};
if(typeof gT==='function'&&window.IL_SC13){var g0=gT;gT=function(s,o){if(s===OLD)return es()?NEW.es:NEW.en;return g0.apply(this,arguments)}}
var INK='#72583f';
function A(h,f){return typeof ag101==='function'?ag101(h,f):'<g fill="'+(f||'none')+'" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">'+h+'</g>'}
var EYE=function(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="2.4" fill="#463F52" stroke="none"/><circle cx="'+(x-.7)+'" cy="'+(y-.8)+'" r=".7" fill="#FFF6D8" stroke="none"/>'};
function WV(x,y){return '<path d="M'+x+' '+(y-6)+' Q'+(x+5)+' '+y+' '+x+' '+(y+6)+' M'+(x+6)+' '+(y-10)+' Q'+(x+14)+' '+y+' '+(x+6)+' '+(y+10)+'" fill="none" stroke="#E6B454" stroke-width="2"/>'}
var ART={
 whale:function(){return A('<path d="M10 74 Q30 68 50 74 T90 74" fill="none" stroke="#7aa7d8" stroke-width="2.2"/><path d="M16 56 Q20 36 46 38 Q70 40 74 52 Q80 48 86 40 Q88 52 80 58 Q86 64 88 70 Q78 66 72 62 Q60 70 38 68 Q18 66 16 56Z" fill="#5E7FA8"/><path d="M22 60 Q40 66 62 62" fill="none" stroke="#C2DCE2" stroke-width="1.6"/>'+EYE(30,52)+'<path d="M40 30 Q38 22 34 20 M40 30 Q42 22 46 20" fill="none" stroke="#7aa7d8" stroke-width="1.6"/>')},
 wolf:function(){return A('<circle cx="72" cy="24" r="9" fill="#FFF2C4"/><path d="M12 86 L36 56 L48 68 L62 50 L88 86Z" fill="#8a9ab0" stroke="none" opacity=".5"/><path d="M34 84 Q30 64 38 54 L34 34 L44 44 Q50 40 56 44 L60 30 L62 48 Q68 56 62 66 Q66 76 64 84Z" fill="#9AA3AE"/><path d="M44 54 Q50 58 56 54 L52 62 Q50 64 48 62Z" fill="#E8E2D4"/>'+EYE(45,48)+EYE(55,48)+'<ellipse cx="50" cy="55" rx="2.6" ry="1.8" fill="#463F52" stroke="none"/>')},
 elk:function(){return A('<path d="M38 34 Q28 24 30 12 M34 26 Q24 24 20 18 M32 18 Q34 12 40 10 M62 34 Q72 24 70 12 M66 26 Q76 24 80 18 M68 18 Q66 12 60 10" fill="none" stroke="#8A6A4A" stroke-width="2.4"/><ellipse cx="50" cy="48" rx="13" ry="16" fill="#B08356"/><path d="M38 38 Q30 36 28 42 Q34 44 40 42Z M62 38 Q70 36 72 42 Q66 44 60 42Z" fill="#B08356"/><ellipse cx="50" cy="60" rx="8" ry="6" fill="#D9B98A"/><path d="M40 64 Q50 84 60 64 L64 86 H36Z" fill="#8A6A4A"/>'+EYE(44,46)+EYE(56,46)+'<ellipse cx="50" cy="59" rx="2.4" ry="1.6" fill="#463F52" stroke="none"/>')},
 bison:function(){return A('<ellipse cx="50" cy="84" rx="30" ry="4.5" fill="#E8C894" stroke="none" opacity=".55"/><path d="M20 64 Q18 40 42 36 Q58 30 72 40 Q84 44 84 58 Q84 70 74 70 L72 82 H66 L64 70 H40 L38 82 H32 L30 68 Q20 70 20 64Z" fill="#7A5638"/><path d="M60 38 Q74 34 82 46 Q76 50 70 48" fill="#5E3F28"/><path d="M76 42 Q80 34 76 30" fill="none" stroke="#E8E2D4" stroke-width="2"/>'+EYE(74,52)+'<path d="M80 62 Q84 66 80 70" fill="none" stroke-width="1.6"/>')},
 loon:function(){return A('<path d="M10 72 Q30 66 50 72 T90 72" fill="none" stroke="#7aa7d8" stroke-width="2.2"/><path d="M22 66 Q24 52 46 52 Q60 52 64 46 Q64 34 72 32 Q82 32 82 40 L92 42 L82 44 Q80 52 74 58 Q70 68 44 70 Q26 70 22 66Z" fill="#2E3440"/><path d="M30 60 h4 M38 60 h4 M46 60 h4 M34 64 h4 M42 64 h4" fill="none" stroke="#FFF6D8" stroke-width="1.6"/><path d="M66 46 Q70 50 74 46" fill="none" stroke="#FFF6D8" stroke-width="1.6"/><circle cx="74" cy="38" r="2.2" fill="#C0392B" stroke="none"/>')},
 crane:function(){return A('<path d="M44 60 L40 88 M52 60 L56 88" fill="none" stroke="#8A6A4A" stroke-width="2"/><path d="M24 50 Q28 36 50 38 Q60 40 60 46 Q64 30 62 20 Q64 12 70 14 L82 18 L70 20 Q68 32 66 48 Q64 62 46 62 Q30 62 24 50Z" fill="#B8B8B0"/><path d="M64 14 Q68 12 70 16 Q66 18 64 16Z" fill="#C0392B" stroke="none"/><path d="M26 48 Q34 58 50 56" fill="none" stroke="#8a8478" stroke-width="1.6"/>'+EYE(67,17)+WV(76,36))},
 raven:function(){return A('<path d="M16 80 Q50 86 84 78" fill="none" stroke="#8A6A4A" stroke-width="2.4"/><path d="M24 58 Q12 54 12 66 Q22 70 32 64Z" fill="#3A3346"/><ellipse cx="44" cy="58" rx="20" ry="14" fill="#463F52"/><path d="M46 52 Q34 50 22 60 Q36 68 48 60Z" fill="#2E2838"/><circle cx="64" cy="44" r="11" fill="#463F52"/><path d="M74 42 L86 46 L74 49Z" fill="#2E2838"/><circle cx="67" cy="41" r="2.4" fill="#FFF6D8" stroke="none"/><circle cx="67.4" cy="41.3" r="1.2" fill="#2E2838" stroke="none"/><path d="M42 70 L40 79 M52 70 L54 79" fill="none" stroke-width="1.8"/>'+WV(84,30))},
 geyser:function(){return A('<path d="M14 82 Q50 72 86 82 L86 88 H14Z" fill="#C9B08A"/><path d="M40 78 Q42 50 38 30 Q44 14 50 12 Q56 14 62 30 Q58 50 60 78Z" fill="#E8F2F6"/><path d="M38 30 Q26 24 28 14 Q38 12 44 20 M62 30 Q74 24 72 14 Q62 12 56 20" fill="#F4F8FA"/><path d="M46 70 Q48 50 46 34 M54 70 Q52 50 54 34" fill="none" stroke="#7aa7d8" stroke-width="1.4"/><path d="M30 80 Q50 74 70 80" fill="none" stroke="#7aa7d8" stroke-width="2"/>')},
 rooster:function(){return A('<ellipse cx="50" cy="86" rx="22" ry="4" fill="#E8C894" stroke="none" opacity=".55"/><path d="M28 50 Q14 30 22 20 Q30 34 34 44 Q30 26 40 22 Q40 38 42 48Z" fill="#3E6B48"/><ellipse cx="46" cy="60" rx="20" ry="16" fill="#C0582E"/><path d="M40 56 Q54 50 58 64 Q46 68 40 56Z" fill="#9A3F20"/><circle cx="64" cy="42" r="10" fill="#D9824A"/><path d="M58 32 Q60 24 64 30 Q66 22 70 30 Q74 26 72 34Z" fill="#D63A2E"/><path d="M73 42 L80 44 L73 46Z" fill="#E6B454"/><path d="M68 50 Q70 56 66 56 Q64 52 66 50Z" fill="#D63A2E"/>'+EYE(66,40)+'<path d="M42 74 L40 84 M52 74 L54 84" fill="none" stroke="#E6B454" stroke-width="2"/>'+WV(82,24))},
 horse:function(){return A('<path d="M30 88 Q30 66 36 56 Q32 44 38 32 L36 20 L44 28 Q50 24 58 28 Q74 40 76 56 Q78 64 72 66 Q66 66 62 60 Q58 56 54 58 Q60 72 58 88Z" fill="#A8744A"/><path d="M38 30 Q30 40 32 58 Q36 46 42 38 M44 28 Q36 44 36 60" fill="none" stroke="#5E3F28" stroke-width="3"/><ellipse cx="70" cy="60" rx="5" ry="4" fill="#8A5A36"/><circle cx="69" cy="58" r="1.2" fill="#463F52" stroke="none"/>'+EYE(58,40))},
 sheep:function(){return A('<ellipse cx="50" cy="86" rx="26" ry="4" fill="#C5DDD0" stroke="none" opacity=".7"/><path d="M34 72 V84 M44 74 V84 M58 74 V84 M66 72 V84" fill="none" stroke="#463F52" stroke-width="3"/><path d="M24 58 Q18 48 28 44 Q30 34 42 38 Q48 30 58 36 Q68 32 72 42 Q82 46 76 58 Q80 68 68 70 Q60 78 48 72 Q36 78 30 68 Q20 68 24 58Z" fill="#F7F1E4"/><ellipse cx="74" cy="48" rx="9" ry="11" fill="#5A4E46"/><path d="M66 42 Q60 40 60 46 Q64 46 67 45Z M82 42 Q88 40 88 46 Q84 46 81 45Z" fill="#5A4E46"/><circle cx="71" cy="46" r="1.8" fill="#FFF6D8" stroke="none"/><circle cx="77" cy="46" r="1.8" fill="#FFF6D8" stroke="none"/>')},
 purr:function(){return A('<ellipse cx="50" cy="80" rx="32" ry="5" fill="#E8C894" stroke="none" opacity=".55"/><path d="M18 70 Q16 50 40 48 Q66 46 78 60 Q86 72 72 76 L28 76 Q18 76 18 70Z" fill="#B9A08A"/><path d="M22 72 Q14 62 24 58 Q34 64 46 70Z" fill="#A88361"/><circle cx="70" cy="60" r="13" fill="#B9A08A"/><path d="M60 52 L58 40 L68 48Z M80 52 L84 40 L74 48Z" fill="#B9A08A"/><path d="M63 60 Q66 58 69 60 M73 60 Q76 58 79 60" fill="none" stroke="#463F52" stroke-width="1.6"/><ellipse cx="71" cy="64" rx="1.5" ry="1" fill="#C67A5A" stroke="none"/><path d="M30 40 q4 -4 8 0 q4 4 8 0 M50 34 q4 -4 8 0" fill="none" stroke="#E6B454" stroke-width="1.6"/>')}
};
try{if(typeof SCART101==='object'&&window.IL_SC13)IL_SC13.CARDS.forEach(function(c){if(!SCART101[c.id]&&ART[c.id])SCART101[c.id]=ART[c.id]})}catch(e){}
function credits(){var el=$$('soundcards');if(!el||!window.IL_SC13||el.querySelector('.sc175-credits'))return;
 var d=document.createElement('details');d.className='card sc175-credits';
 d.innerHTML='<summary>'+E(es()?'Créditos de las grabaciones reales':'Credits for the real recordings')+'</summary><p class="soft">'+E(es()?'Grabaciones de dominio público. Gracias al Servicio de Parques Nacionales de EE. UU. (NPS), al Acoustic Atlas de MSU, a NOAA, a pdsounds.org y a Wikimedia Commons.':'Public-domain recordings. Thank you to the U.S. National Park Service (NPS), the MSU Acoustic Atlas, NOAA, pdsounds.org and Wikimedia Commons.')+'</p>'+IL_SC13.creditsHtml(E);
 el.appendChild(d)}
if(typeof RENDER==='object'){var rs=RENDER.soundcards;RENDER.soundcards=function(){var r=typeof rs==='function'?rs.apply(this,arguments):undefined;try{credits()}catch(e){}return r}}
if(typeof renderSoundcards101==='function'){var r1=renderSoundcards101;renderSoundcards101=function(){var r=r1.apply(this,arguments);try{credits()}catch(e){}return r}}
window.IL175.sounds={hexUI:hexUI,windUI:windUI,credits:credits};
})();
/* v176 — QA v175 fix: U13 Sound Cards recordings stop when the page is left (iOS pagehide).
   Purr clip re-mastered louder (audio/sc13/purr.*). Fractal grow fixes moved to a later release. */
window.addEventListener('pagehide',function(){if(typeof scStop101==='function')try{scStop101()}catch(e){}});
window.IL176={version:176,notes:'v176: U13 recordings stop on pagehide; purr louder'};
/* v177: "See your sound" (Pi's Seed toy spec, SEE_YOUR_SOUND_TOY_SPEC.md) as a Patterns Everywhere card,
   plus its bedtime picture (BEDTIME_VISUAL_SPEC.md: the figure slowly turns, then spirals in and goes quiet).
   Two dials 1-6 (left = X, right = Y). The picture is drawn from the numbers (x=sin 2πat, y=sin(2πbt+δ)),
   never from the speakers, so mute, one earbud or a phone speaker all show the same figure.
   Tones: two sines, lower tone fixed at 220 Hz, each ear ≤ 0.12 (−18 dBFS), 0.4 s fades, pitch glides
   (exponential) inside the fade. No microphone, no files, no network. Sound Draws Shapes is unchanged.
   Stops on its button, on leaving, on hidden/pagehide, and when Soft sounds is off. */
(function(){
'use strict';
var PR={"1,1":[1,1,1,220.0,220.0,0],"1,2":[1,2,0,220.0,440.0,0],"1,3":[1,3,1,220.0,660.0,0],"1,4":[1,4,0,220.0,880.0,0],"1,5":[1,5,1,220.0,1100.0,0],"1,6":[1,6,0,220.0,1320.0,0],"2,1":[2,1,0,440.0,220.0,0],"2,2":[1,1,1,220.0,220.0,1],"2,3":[2,3,0,220.0,330.0,0],"2,4":[1,2,0,220.0,440.0,1],"2,5":[2,5,0,220.0,550.0,0],"2,6":[1,3,1,220.0,660.0,1],"3,1":[3,1,1,660.0,220.0,0],"3,2":[3,2,0,330.0,220.0,0],"3,3":[1,1,1,220.0,220.0,1],"3,4":[3,4,0,220.0,293.33,0],"3,5":[3,5,1,220.0,366.67,0],"3,6":[1,2,0,220.0,440.0,1],"4,1":[4,1,0,880.0,220.0,0],"4,2":[2,1,0,440.0,220.0,1],"4,3":[4,3,0,293.33,220.0,0],"4,4":[1,1,1,220.0,220.0,1],"4,5":[4,5,0,220.0,275.0,0],"4,6":[2,3,0,220.0,330.0,1],"5,1":[5,1,1,1100.0,220.0,0],"5,2":[5,2,0,550.0,220.0,0],"5,3":[5,3,1,366.67,220.0,0],"5,4":[5,4,0,275.0,220.0,0],"5,5":[1,1,1,220.0,220.0,1],"5,6":[5,6,0,220.0,264.0,0],"6,1":[6,1,0,1320.0,220.0,0],"6,2":[3,1,1,660.0,220.0,1],"6,3":[2,1,0,440.0,220.0,1],"6,4":[3,2,0,330.0,220.0,1],"6,5":[6,5,0,264.0,220.0,0],"6,6":[1,1,1,220.0,220.0,1]};
var TX={en:{title:'See your sound',tile:'Two numbers draw a shape',intro:'Turn the two dials. Each number is a tone; together they draw a shape. Headphones are optional: the picture comes from the numbers.',
  left:'Left',right:'Right',on:'Sound on',off:'Sound off',count:'Count',top:'Count the bumps on top.',side:'Count the bumps on each side.',
  bed:'Bedtime',bedStop:'Stop',bedNote:'The shape turns slowly, then gets smaller and quieter until it rests.',night:'Good night.',
  aria:'A gold shape drawn by two numbers',down:'down',up:'up'},
 es:{title:'Mira tu sonido',tile:'Dos números dibujan una forma',intro:'Gira los dos diales. Cada número es un tono; juntos dibujan una forma. Los auriculares son opcionales: el dibujo sale de los números.',
  left:'Izquierda',right:'Derecha',on:'Sonido sí',off:'Sonido no',count:'Contar',top:'Cuenta los bultos de arriba.',side:'Cuenta los bultos de cada lado.',
  bed:'Hora de dormir',bedStop:'Parar',bedNote:'La forma gira despacio y luego se hace más pequeña y más suave hasta descansar.',night:'Buenas noches.',
  aria:'Una forma dorada dibujada por dos números',down:'menos',up:'más'}};
function L(){try{return (typeof LANG==='string'&&LANG==='es')?'es':'en'}catch(e){return 'en'}}
function T(k){return TX[L()][k]}
function E(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}
function $$(id){return document.getElementById(id)}
function reduced(){try{return (typeof patReduced==='function'&&patReduced())||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}}
function soft(){try{return typeof lampSfxOn73==='function'?!!lampSfxOn73():true}catch(e){return true}}
function active(){var p=$$('patterns');try{return PAT106.unit==='seesound'&&p&&!p.classList.contains('hidden')&&!!$$('sys177cv')}catch(e){return false}}
var MAX=.12,FADE=.4,S={a:2,b:3,on:false,breath:0,count:null,raf:0,watch:0,gen:0};
var A=null; /* audio graph */
function pair(){return PR[S.a+','+S.b]}
function audioStart(){if(A||!soft())return false;var c=null;try{c=typeof ac==='function'?ac():null}catch(e){}if(!c)return false;
 try{if(c.state==='suspended')c.resume()}catch(e){}
 var p=pair(),m=c.createGain(),mg=c.createChannelMerger(2),oL=c.createOscillator(),oR=c.createOscillator(),gL=c.createGain(),gR=c.createGain();
 oL.type=oR.type='sine';oL.frequency.value=p[3];oR.frequency.value=p[4];gL.gain.value=gR.gain.value=MAX;
 oL.connect(gL);gL.connect(mg,0,0);oR.connect(gR);gR.connect(mg,0,1);mg.connect(m);m.connect(c.destination);
 var t=c.currentTime;m.gain.setValueAtTime(0,t);m.gain.linearRampToValueAtTime(1,t+FADE);oL.start(t);oR.start(t);
 A={c:c,m:m,oL:oL,oR:oR,n:[m,mg,oL,oR,gL,gR]};return true}
function audioStop(fast){if(!A)return;var a=A;A=null;try{var t=a.c.currentTime,d=fast?.05:FADE;a.m.gain.cancelScheduledValues(t);a.m.gain.setValueAtTime(a.m.gain.value,t);a.m.gain.linearRampToValueAtTime(0,t+d);a.oL.stop(t+d+.05);a.oR.stop(t+d+.05)}catch(e){}
 setTimeout(function(){a.n.forEach(function(n){try{n.disconnect()}catch(e){}})},(fast?150:FADE*1000+200))}
function glide(o,to,t){var cur=o.frequency.value;o.frequency.cancelScheduledValues(t);o.frequency.setValueAtTime(cur,t);if(cur>0&&to>0)o.frequency.exponentialRampToValueAtTime(to,t+FADE);else o.frequency.linearRampToValueAtTime(to,t+FADE)}
function retune(){if(!A)return;var p=pair(),t=A.c.currentTime,g=A.m.gain.value;glide(A.oL,p[3],t);glide(A.oR,p[4],t);
 A.m.gain.cancelScheduledValues(t);A.m.gain.setValueAtTime(g,t);A.m.gain.linearRampToValueAtTime(g*.55,t+FADE*.35);A.m.gain.linearRampToValueAtTime(1,t+FADE)}
function setOn(v){S.on=v;var b=$$('sys177snd');if(b){b.textContent=v?T('on'):T('off');b.setAttribute('aria-pressed',v?'true':'false');b.classList.toggle('on',v)}}
function stopAll(why){audioStop(why==='hidden'||why==='pagehide');setOn(false);bedStop(true)}
/* drawing */
var cv=null,x=null,tr=null,tx=null,t0=0,last=0;
function draw(now){S.raf=0;if(!active()){stopAll('left');return}
 if(now-last>=33){last=now;var p=pair(),ra=p[0],rb=p[1],d=p[2]?Math.PI/2:0,w=cv.width,h=cv.height,cx=w/2,cy=h/2,sc=w*.36,i,tt,tb=reduced()?0:(now-t0)/1000*.25;
  tx.globalCompositeOperation='source-over';tx.fillStyle=reduced()?'#120E18':'rgba(18,14,24,0.16)';tx.fillRect(0,0,w,h);
  tx.beginPath();for(i=0;i<=720;i++){tt=tb+i/720;var px=cx+sc*Math.sin(2*Math.PI*ra*tt),py=cy-sc*Math.sin(2*Math.PI*rb*tt+d);if(i)tx.lineTo(px,py);else tx.moveTo(px,py)}
  var gl=S.breath>0?.55+.35*Math.sin((1-S.breath)*Math.PI):.8;tx.strokeStyle='rgba(230,180,84,'+gl.toFixed(3)+')';tx.lineWidth=Math.max(2,w/300);tx.lineJoin=tx.lineCap='round';tx.stroke();
  x.fillStyle='#120E18';x.fillRect(0,0,w,h);x.drawImage(tr,0,0);
  if(S.count){var el=now-S.count.at,k=Math.max(0,Math.min(S.count.st.length-1,Math.floor(el/900))),s=S.count.st[k];
   if(k>=S.count.nTop)wh(T('side'));
   x.beginPath();x.arc(cx+sc*s.x,cy-sc*s.y,w/90,0,Math.PI*2);x.fillStyle='#FFE4A4';x.globalAlpha=.85;x.fill();x.globalAlpha=1;
   if(el>S.count.st.length*900+400){S.count=null;wh('')}}
  if(S.breath>0)S.breath=Math.max(0,S.breath-.008)}
 S.raf=requestAnimationFrame(draw)}
function wh(s){var e=$$('sys177wh');if(e&&e.textContent!==s)e.textContent=s}
function startCount(){var p=pair(),ra=p[0],rb=p[1],d=p[2]?Math.PI/2:0,tops=[],sides=[],n,t;
 for(n=0;n<rb;n++){t=((.25-d/(2*Math.PI)+n)/rb+1)%1;tops.push({x:Math.sin(2*Math.PI*ra*t),y:1})}
 for(n=0;n<ra;n++){var tR=((.25+n)/ra)%1,tL=((.75+n)/ra)%1;sides.push({x:1,y:Math.sin(2*Math.PI*rb*tR+d)});sides.push({x:-1,y:Math.sin(2*Math.PI*rb*tL+d)})}
 S.count={st:tops.concat(sides),at:performance.now(),nTop:tops.length};wh(T('top'))}
function setDial(w,v){v=Math.max(1,Math.min(6,v));S[w]=v;var e=$$('sys177'+w);if(e)e.textContent=v;if(pair()[5])S.breath=1;S.count=null;wh('');retune();
 var c=$$('sys177cv');if(c)c.setAttribute('aria-label',T('aria')+' ('+S.a+':'+S.b+')')}
/* bedtime picture (Studio's WindDownShapes, Pi's bedtime spec: same envelope on both ears, no flashes) */
function bedStop(quiet){var b=$$('sys177bed');if(window.WindDownShapes&&WindDownShapes.isOn()&&quiet!==2)try{WindDownShapes.detach('off')}catch(e){}
 if(b){b.textContent=T('bed');b.classList.remove('on');b.setAttribute('aria-pressed','false')}var w=$$('sys177wrap');if(w)w.style.display=''}
function bed(){if(!window.WindDownShapes)return;if(WindDownShapes.isOn()){bedStop();return}
 audioStop();setOn(false);S.count=null;wh('');
 var p=pair(),r=p[0]+':'+p[1],k=WindDownShapes.PAIRS[r]?r:(WindDownShapes.PAIRS[p[1]+':'+p[0]]?p[1]+':'+p[0]:'2:3');
 var w=$$('sys177wrap');if(w)w.style.display='none';
 WindDownShapes.attach({host:$$('sys177bedhost'),ratio:k,sound:soft(),ariaLabel:T('bedNote'),isActive:active,
  onDone:function(){bedStop(2);wh(T('night'))},onStop:function(){bedStop(2)}});
 var b=$$('sys177bed');if(b&&WindDownShapes.isOn()){b.textContent=T('bedStop');b.classList.add('on');b.setAttribute('aria-pressed','true')}}
function open(){var el=$$('patterns');if(!el)return;try{PAT106.unit='seesound'}catch(e){}
 if(typeof cleanup124==='function')try{cleanup124()}catch(e){}
 var dial=function(w){return '<div class="sys177-dial"><div class="soft">'+E(T(w==='a'?'left':'right'))+'</div><div class="sys177-row"><button type="button" data-d="'+w+'" data-s="-1" aria-label="'+E(T(w==='a'?'left':'right')+' '+T('down'))+'">−</button><span class="sys177-n" id="sys177'+w+'">'+S[w]+'</span><button type="button" data-d="'+w+'" data-s="1" aria-label="'+E(T(w==='a'?'left':'right')+' '+T('up'))+'">+</button></div></div>'};
 var inner='<p class="soft">'+E(T('intro'))+'</p><div id="sys177wrap"><canvas id="sys177cv" class="sys177-cv" width="560" height="560" role="img" aria-label="'+E(T('aria'))+' ('+S.a+':'+S.b+')"></canvas>'+
  '<p class="soft sys177-wh" id="sys177wh" aria-live="polite"></p><div class="sys177-dials">'+dial('a')+dial('b')+'</div>'+
  '<div class="pat-row"><button type="button" id="sys177snd" aria-pressed="false">'+E(T('off'))+'</button><button type="button" id="sys177cnt">'+E(T('count'))+'</button></div></div>'+
  '<div class="pat-row"><button type="button" id="sys177bed" aria-pressed="false">'+E(T('bed'))+'</button></div><p class="soft">'+E(T('bedNote'))+'</p><div id="sys177bedhost"></div>';
 el.innerHTML=typeof patShell==='function'?patShell(E(T('title')),inner):'<div class="card"><h2>'+E(T('title'))+'</h2>'+inner+'</div>';
 cv=$$('sys177cv');var dp=Math.min(2,window.devicePixelRatio||1);cv.width=cv.height=Math.round(Math.min(560,Math.max(280,(cv.clientWidth||320)))*dp);
 x=cv.getContext('2d');tr=document.createElement('canvas');tr.width=tr.height=cv.width;tx=tr.getContext('2d');tx.fillStyle='#120E18';tx.fillRect(0,0,tr.width,tr.height);
 t0=performance.now();last=0;
 el.querySelectorAll('[data-d]').forEach(function(b){b.onclick=function(){setDial(b.getAttribute('data-d'),S[b.getAttribute('data-d')]+(+b.getAttribute('data-s')))}});
 $$('sys177snd').onclick=function(){if(A){audioStop();setOn(false)}else{if(audioStart())setOn(true)}};
 $$('sys177cnt').onclick=startCount;$$('sys177bed').onclick=bed;
 setOn(!!A);if(!S.raf)S.raf=requestAnimationFrame(draw);
 if(!S.watch)S.watch=setInterval(function(){if(!active()){if(A||S.on)stopAll('left');if(S.raf){cancelAnimationFrame(S.raf);S.raf=0}clearInterval(S.watch);S.watch=0;return}
  if(A&&!soft())stopAll('muted')},400);
 if(typeof turtlePlace105==='function')try{turtlePlace105('patterns')}catch(e){}}
document.addEventListener('visibilitychange',function(){if(document.hidden&&(A||S.on))stopAll('hidden')});
window.addEventListener('pagehide',function(){if(A||S.on)stopAll('pagehide')});
var ART='<svg width="56" height="56" viewBox="-30 -30 60 60" aria-hidden="true"><circle r="27" fill="#1d1726" stroke="#72583f" stroke-width="1.4"/><path d="M0-18C10-18 18-6 12 0S-12 6-18 0-10-18 0-18M18 0C18 10 6 18 0 12S-6-12 0-18" fill="none" stroke="#e6b454" stroke-width="2" stroke-linecap="round" opacity=".9"/><path d="M-20 14c2-3 4 3 6 0s4 3 6 0" fill="none" stroke="#ffe4a4" stroke-width="1.4" stroke-linecap="round"/></svg>';
function tile(){var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="seesound"]'))return;
 var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','seesound');b.setAttribute('onclick',"patOpen106('seesound')");
 b.innerHTML=ART+E(T('title'))+'<small>'+E(T('tile'))+'</small>';
 var after=g.querySelector('[data-pat="sound"],[data-pat="shapes"],[data-pat="sounddraw"]');if(after&&after.nextSibling)g.insertBefore(b,after.nextSibling);else g.appendChild(b)}
if(typeof patOpen106==='function'){var po=patOpen106;patOpen106=function(u){if(u==='seesound'){open();return}if(A||S.on)stopAll('left');var r=po.apply(this,arguments);if(!u)try{tile()}catch(e){}return r}}
if(typeof renderPatterns106==='function'){var rp=renderPatterns106;renderPatterns106=function(){var r=rp.apply(this,arguments);try{tile()}catch(e){}return r}}
if(typeof RENDER==='object'){var pr=RENDER.patterns;RENDER.patterns=function(){var r=typeof pr==='function'?pr.apply(this,arguments):undefined;try{if(PAT106.unit==='seesound')open();else tile()}catch(e){}return r}}
try{var st=document.createElement('style');st.id='v177css';st.textContent='.sys177-cv{display:block;width:min(100%,420px);max-width:100%;aspect-ratio:1;height:auto;margin:8px auto;border-radius:16px;background:#120E18}.sys177-dials{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 20px;margin:6px 0;max-width:100%}.sys177-dial{text-align:center}.sys177-row{display:flex;align-items:center;gap:6px;justify-content:center}.sys177-row button{min-width:44px;min-height:44px;font-size:1.3rem;border-radius:22px}.sys177-n{font-size:1.8rem;min-width:1.4em;text-align:center;color:#b98535}.sys177-wh{min-height:1.4em;text-align:center}#patterns .hubtile[data-pat="seesound"] svg{display:block;margin:0 auto 4px}';document.head.appendChild(st)}catch(e){}
window.IL177={version:177,PAIRS:PR,state:S,open:open,pair:pair,isOn:function(){return !!A},stop:stopAll,MAX:MAX};
})();
/* v178: centre every Lamp glow on the friend's body. v175 centred on the box around all of the art's
   shapes, but that box includes the ground shadow, sparkles and faint aura marks, so the glow sat off
   the body. Now the friend is drawn once to a small offscreen canvas (glow, plate, sparks and aura
   removed) and the solid pixels give the true centre. Results are cached per picture. */
(function(){
'use strict';
var DROP='.lamp73-plate,.il-glow,.il-sp,.fx2-norma,.il-sky-chip,.il-h,.lamp-fx-light';
var CACHE={},N=96;
function key(svg){var k=svg.querySelector('[data-il-kind]');return k?(k.getAttribute('data-il-kind')+'|'+k.getAttribute('data-il-stage')+'|'+(svg.getAttribute('data-stage73')||'')+'|'+svg.innerHTML.length):null}
function measure(svg,cb){
 var k=key(svg);if(!k)return cb(null);if(CACHE[k]!==undefined)return cb(CACHE[k]);
 try{
  var c=svg.cloneNode(true);c.querySelectorAll(DROP).forEach(function(e){e.remove()});
  c.querySelectorAll('rect[fill="#120E18"]').forEach(function(e){e.remove()});
  c.setAttribute('width',N);c.setAttribute('height',N);c.setAttribute('xmlns','http://www.w3.org/2000/svg');
  c.removeAttribute('class');
  var src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c));
  var im=new Image();
  im.onload=function(){try{var cv=document.createElement('canvas');cv.width=cv.height=N;var x=cv.getContext('2d');x.drawImage(im,0,0,N,N);
   var d=x.getImageData(0,0,N,N).data,a=N,b=N,cc=-1,dd=-1;
   for(var y=0;y<N;y++)for(var i=0;i<N;i++){if(d[(y*N+i)*4+3]>170){if(i<a)a=i;if(i>cc)cc=i;if(y<b)b=y;if(y>dd)dd=y}}
   CACHE[k]=cc<0?null:{fx:(a+cc+1)/2/N,fy:(b+dd+1)/2/N}}catch(e){CACHE[k]=null}cb(CACHE[k])};
  im.onerror=function(){CACHE[k]=null;cb(null)};im.src=src;
 }catch(e){cb(null)}}
function ctr(el){var r=el.getBoundingClientRect();return {cx:r.left+r.width/2,cy:r.top+r.height/2,w:r.width}}
function mv(el,ink){if(!el)return;el.style.translate='';var c=ctr(el);if(!c.w)return;
 var dx=Math.round((ink.cx-c.cx)*10)/10,dy=Math.round((ink.cy-c.cy)*10)/10;
 if(Math.abs(dx)<.5&&Math.abs(dy)<.5)return;el.style.translate=dx+'px '+dy+'px'}
function apply(shell,f){
 var svg=shell.querySelector('svg.lamp73-svg');if(!svg||!f)return;
 var sr=svg.getBoundingClientRect();if(!sr.width)return;
 var ink={cx:sr.left+f.fx*sr.width,cy:sr.top+f.fy*sr.height};
 var plate=svg.querySelector('.lamp73-plate');
 if(plate){plate.removeAttribute('transform');var pc=ctr(plate),vb=svg.viewBox&&svg.viewBox.baseVal,k=(vb&&vb.width)?vb.width/sr.width:1;
  var dx=(ink.cx-pc.cx)*k,dy=(ink.cy-pc.cy)*k;if(Math.abs(dx)+Math.abs(dy)>.3)plate.setAttribute('transform','translate('+dx.toFixed(2)+' '+dy.toFixed(2)+')')}
 var light=shell.querySelector('svg.lamp-fx-light');
 if(light){light.style.translate='';var h=light.querySelector('.halo');if(h){var hc=ctr(h);light.style.translate=Math.round((ink.cx-hc.cx)*10)/10+'px '+Math.round((ink.cy-hc.cy)*10)/10+'px'}}
 shell.querySelectorAll(':scope>.fx89-layer,:scope>.fx111-core-soft').forEach(function(el){mv(el,ink)});
 var hero=shell.closest('.lamp76-hero,dialog.lamp73-dialog');
 if(hero)hero.querySelectorAll(':scope>.lamp76-glow,:scope>.fx89-layer').forEach(function(el){mv(el,ink)});
}
var t=0;
function run(){t=0;try{document.querySelectorAll('.lamp73-shell').forEach(function(s){if(!s.offsetParent)return;var svg=s.querySelector('svg.lamp73-svg');if(svg)measure(svg,function(f){apply(s,f)})})}catch(e){}}
function soon(){if(t)return;t=setTimeout(function(){requestAnimationFrame(run)},80)}
['lampMountAll73','lampFxRemount89','lampFxInsert89','lampFxDecorate111'].forEach(function(n){var f=window[n];if(typeof f!=='function')return;
 window[n]=function(){var r=f.apply(this,arguments);soon();return r}});
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x&&x.closest&&x.closest('.lamp76-hero,.lamp73-shell,dialog.lamp73-dialog')){soon();return}}}).observe(document.body,{childList:true,subtree:true})}catch(e){}
window.addEventListener('resize',soon);
soon();
})();
/* v178b: friends (not the Lamp) had no centre for the v172 spiral group, so the rings
   circled the layer's top-left corner. Centre them in the 100 viewBox; the Lamp keeps its own rule. */
(function(){if(typeof document==='undefined'||document.getElementById('v178ctr'))return;
 var s=document.createElement('style');s.id='v178ctr';s.textContent='svg.fx2-spiral .fx2-ctr{transform:translate(50px,50px)}';
 (document.head||document.documentElement).appendChild(s);})();
/* v179: the Lamp glow and effects sit on every friend's drawn body (QA v178: Constellation Moth
   15 px left, Constellation Lamp 11 px high, Fox 8 px toward the tail).
   Why they missed: v175's older box-centring still ran after v178 on some redraws and won, and
   v178's small 96 px solid-only measure left out the soft parts of a friend the eye still reads
   as body. Now:
   - the friend is drawn once at 200 px (glow, plate, sparks, aura and sky square removed) and tiny
     isolated specks (stars, dust) are ignored; the ground shadow is not body; the glow goes to the midpoint
     of the body's box centre and its mass centre (see centre());
   - a measurement that looks wrong (empty, tiny, or far off the frame) is not used; the frame
     centre is used instead;
   - a result is only applied to the same picture it was measured from;
   - the move is held by a stylesheet rule, so older centring code can no longer pull it back.
   - the Lamp's own effect layers (v172) are drawn over the lantern art, so they stay on it (v178 moved them
     a second time, so the spiral sat 11-15 px low). On the Constellation Lamp the Bright core uses that jar's centre
     and the inner Lamp's redrawn belly window (it sat under the smaller jar) is hidden.
   Later in v179 (QA gate cross-check, Art Director audit, Pi):
   - body = the friend art only, same definition as the gate; centre = midpoint of the body's box centre and its
     alpha-mass centre (Builder's C1 rule); the dragon's gold aura and constellation star specks are not body;
   - a failed / implausible measure is never cached: retried after fonts and layout settle, then the drawn-shape box;
   - the Lamp's own effect layers are placed once per picture and never re-centred; its Sleeping spiral may draw
     past its box so the bottom seed is no longer cut;
   - ember motes get a small window over the face (night: motes no longer cross the eyes and mouth);
   - by day: no dark outline under smoke (it drew a grey-brown disc), and the night-sky dots are soft gold, not ink;
   - Firefly truth line says "On each wing" / "En cada ala" (1, 3, 9, 27 is per wing).
   Art, sounds and voices are unchanged. Nothing leaves the device. */
(function(){
'use strict';
if(typeof document==='undefined'||window.IL179)return;
var DROP='.lamp73-plate,.il-glow,.il-sp,.fx2-norma,.il-sky-chip,.il-h,.lamp-fx-light';
var N=200,TH=24,CACHE={};
/* also not body (QA gate cross-check): the dragon's gold aura ring and constellation star specks */
var BODYDROP='circle.il-p[r="69.8"],.starDot111,.starLantern111';
var st=document.createElement('style');st.id='v179ctr';
st.textContent='.v179t{translate:var(--v179t,0px 0px)!important}'+
 '.lamp73-shell.v179lk .fx2-cwin{display:none!important}'+
 'svg .lamp73-plate.v179p{transform:translate(var(--v179px,0px),var(--v179py,0px))!important}';
st.textContent+=
 /* ember window over the face (see faces()) */
 '.fx89-layer.fx89-ember.v179face{-webkit-mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,linear-gradient(#000,#000) var(--v179fp)/var(--v179fw) var(--v179fh) no-repeat!important;-webkit-mask-composite:xor!important;'+
 'mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,linear-gradient(#000,#000) var(--v179fp)/var(--v179fw) var(--v179fh) no-repeat!important;mask-composite:exclude!important}'+
 /* the Lamp's Sleeping spiral: its bottom seed ran past the layer's box and was cut. Let it draw past the box; the
    lantern-shaped cut-out stays exactly where it was, only the plain part of the mask is made bigger */
 '.lamp73-shell:has([data-il-kind="lamp"])>.fx89-layer.fx89-spiral,.lamp73-shell:has([data-il-kind="lamp"])>.fx89-layer.fx89-spiral>svg{overflow:visible!important}'+
 '.lamp73-shell:has([data-il-kind="lamp"])>.fx89-layer.fx89-spiral{mask-clip:no-clip!important;mask-size:100% 100%,200% 200%!important;mask-position:50% 92%,50% 50%!important}'+
 /* day theme (AD): v123's dark outline on a friend under smoke also shadowed the faint plate, drawing a grey-brown disc on
    the paper, and the night-sky dots were drawn in ink. By day: no outline under smoke, and the sky dots are soft gold. */
 'html:not([data-look-theme="dark"]):not([data-look-theme="contrast"]) .today64:not(.lamp76-night):has(.fx89-smoke) .lamp73-svg,'+
 'html:not([data-look-theme="dark"]):not([data-look-theme="contrast"]) body:not(.night76) dialog.lamp73-dialog .lamp73-shell:has(.fx89-smoke) .lamp73-svg{filter:none!important}'+
 'html:not([data-look-theme="dark"]):not([data-look-theme="contrast"]) .today64:not(.lamp76-night) .lamp81-star-dot{background:#d6a24c!important;box-shadow:0 0 6px rgba(230,180,84,.55),0 0 1px #b07f2c!important}';
(document.head||document.documentElement).appendChild(st);
/* key = the friend picture only (the art group, not the plate we move), so our own move never looks like a redraw */
function key(svg){var k=svg.querySelector('[data-il-kind]');if(!k)return null;var art=svg.querySelector('.lamp73-ink')||k;return k.getAttribute('data-il-kind')+'|'+k.getAttribute('data-il-stage')+'|'+(k.getAttribute('data-il-look')||'')+'|'+(svg.getAttribute('data-stage73')||'')+'|'+art.innerHTML.length}
/* Body centre from the drawn pixels (QA C1, 2026-11-19: body = no shadow, sparks or aura). Pieces
   smaller than 1% of the biggest piece (stars, dust) are ignored. The glow goes to the midpoint of the
   body's box centre and its alpha-weighted mass centre, so a long tail or tall horns pull it only halfway. */
/* Same body definition as the release gate (visual-center.js, QA cross-check): body alpha only; box = the 0.5..99.5
   percentile box of pixels with alpha >= 41/255; mass = alpha-weighted centre of pixels with alpha >= 15/255.
   Visual centre = midpoint of the two (Builder's C1 rule), so a long tail or tall horns pull it only halfway. */
function centre(d){
 var n=N*N,xs=[],ys=[],sa=0,sx=0,sy=0,i;
 for(i=0;i<n;i++){var al=d[i*4+3];if(al<15)continue;var x=i%N,y=(i-x)/N;sa+=al;sx+=al*x;sy+=al*y;if(al>=41){xs.push(x);ys.push(y)}}
 if(!xs.length||!sa)return null;
 xs.sort(function(a,b){return a-b});ys.sort(function(a,b){return a-b});
 var pc=function(a,p){return a[Math.min(a.length-1,Math.floor(p*(a.length-1)))]};
 var a0=pc(xs,.005),b0=pc(ys,.005),c0=pc(xs,.995),e0=pc(ys,.995);
 var bx=(a0+c0+1)/2/N,by=(b0+e0+1)/2/N,mx=(sx/sa+.5)/N,my=(sy/sa+.5)/N;
 return {fx:(bx+mx)/2,fy:(by+my)/2,bx:bx,by:by,mx:mx,my:my,w:(c0-a0+1)/N,h:(e0-b0+1)/N,n:xs.length};
}
function sane(r){return !!(r&&r.n>=N*N*.01&&r.w>=.15&&r.h>=.15&&r.fx>=.25&&r.fx<=.75&&r.fy>=.25&&r.fy<=.8)}
/* QA gate cross-check (v178): a failed or implausible measure was cached as the frame centre, so the glow
   could snap to the middle of the frame and stay there. Now a bad result is never cached: it is retried
   (after fonts, the stage and the layout settle), and only after 3 tries the friend's drawn-shape box
   (from the live art, shadow and aura left out) is used for that one draw. */
var TRIES={};
function boxFallback(svg){
 try{var vb=svg.viewBox&&svg.viewBox.baseVal,vw=(vb&&vb.width)||100,vh=(vb&&vb.height)||100,vx=(vb&&vb.x)||0,vy=(vb&&vb.y)||0;
  var art=svg.querySelector('.lamp73-ink')||svg,a=1e9,b=1e9,c=-1e9,e=-1e9;
  art.querySelectorAll('path,circle,ellipse,rect,polygon,polyline,line').forEach(function(el){
   if(el.closest(DROP)||el.matches(BODYDROP))return;if(el.matches('ellipse[fill="#E6B454"][opacity=".16"]')&&+el.getAttribute('cy')>=178)return;
   var bb;try{bb=el.getBBox()}catch(x){return}if(!bb||!bb.width||!bb.height||bb.width>=vw*.85&&bb.height>=vh*.85)return;
   if(bb.x<a)a=bb.x;if(bb.y<b)b=bb.y;if(bb.x+bb.width>c)c=bb.x+bb.width;if(bb.y+bb.height>e)e=bb.y+bb.height});
  if(c<a)return null;var f={fx:((a+c)/2-vx)/vw,fy:((b+e)/2-vy)/vh,fallback:'box'};
  return f.fx>.15&&f.fx<.85&&f.fy>.15&&f.fy<.9?f:null}catch(x){return null}}
function measure(svg,cb){
 var k=key(svg);if(!k)return cb(null,k);if(CACHE[k])return cb(CACHE[k],k);
 var bad=function(){var n=TRIES[k]=(TRIES[k]||0)+1;
  if(n<3){var again=function(){setTimeout(soon,250*n)};try{document.fonts&&document.fonts.ready?document.fonts.ready.then(again):again()}catch(x){again()}return cb(null,k)}
  cb(boxFallback(svg),k)};
 try{
  var c=svg.cloneNode(true);c.querySelectorAll(DROP+','+BODYDROP).forEach(function(e){e.remove()});
  c.querySelectorAll('rect[fill="#120E18"]').forEach(function(e){e.remove()});
  /* only the friend art group (.lamp73-ink) is body, as in the gate */
  var ink=c.querySelector('.lamp73-ink');if(ink)c.querySelectorAll('path,circle,ellipse,rect,polygon,polyline,line,text,use,image').forEach(function(e){if(!ink.contains(e)&&!e.closest('defs,clipPath,mask,pattern,symbol,linearGradient,radialGradient,filter'))e.remove()});
  /* the ground shadow under every friend (v165 art: a faint gold ellipse at the feet) is not body */
  c.querySelectorAll('ellipse[fill="#E6B454"][opacity=".16"]').forEach(function(e){if(+e.getAttribute('cy')>=178)e.remove()});
  c.setAttribute('width',N);c.setAttribute('height',N);c.setAttribute('xmlns','http://www.w3.org/2000/svg');
  c.removeAttribute('class');c.removeAttribute('style');
  var src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c));
  var im=new Image();
  im.onload=function(){var r=null;try{var cv=document.createElement('canvas');cv.width=cv.height=N;var x=cv.getContext('2d');x.drawImage(im,0,0,N,N);
    r=centre(x.getImageData(0,0,N,N).data)}catch(e){r=null}
   if(sane(r)){CACHE[k]=r;delete TRIES[k];cb(r,k)}else bad()};
  im.onerror=bad;im.src=src;
 }catch(e){bad()}}
function ctr(el){var r=el.getBoundingClientRect();return {cx:r.left+r.width/2,cy:r.top+r.height/2,w:r.width}}
function hold(el,dx,dy){el.style.setProperty('--v179t',(Math.round(dx*10)/10)+'px '+(Math.round(dy*10)/10)+'px');el.classList.add('v179t')}
function base(el){el.classList.remove('v179t');el.style.translate='';return ctr(el)}
function mv(el,ink){if(!el)return;var c=base(el);if(!c.w)return;hold(el,ink.cx-c.cx,ink.cy-c.cy)}
function apply(shell,svg,f,k){
 var sr=svg.getBoundingClientRect();if(!sr.width)return;
 var ink={cx:sr.left+f.fx*sr.width,cy:sr.top+f.fy*sr.height};
 var vb=svg.viewBox&&svg.viewBox.baseVal,vw=(vb&&vb.width)||100,vh=(vb&&vb.height)||100,vx=(vb&&vb.x)||0,vy=(vb&&vb.y)||0;
 var plate=svg.querySelector('.lamp73-plate');
 if(plate){var pcx=+plate.getAttribute('cx')||50,pcy=+plate.getAttribute('cy')||50;
  plate.style.setProperty('--v179px',(vx+f.fx*vw-pcx).toFixed(2)+'px');plate.style.setProperty('--v179py',(vy+f.fy*vh-pcy).toFixed(2)+'px');plate.classList.add('v179p')}
 var light=shell.querySelector('svg.lamp-fx-light');
 if(light){var h=light.querySelector('.halo');if(h){base(light);var hc=ctr(h);if(hc.w)hold(light,ink.cx-hc.cx,ink.cy-hc.cy)}}
 /* The Lamp's own effect layers (v172) are drawn over the lantern art with its stage geometry
    (--lx-wy window, --lx-cyn lantern centre), so they stay put on the inner Lamp (spiral included). A Lamp in another
    look (Constellation) has a smaller jar: give those layers this art's centre, and hide the inner
    Lamp's redrawn belly window, which would sit under the jar. */
 var lk=svg.querySelector('[data-il-kind="lamp"]'),other=!!lk&&(lk.getAttribute('data-il-look')||'inner')!=='inner',cy=(f.fy*100).toFixed(1);
 shell.classList.toggle('v179lk',other);
 shell.querySelectorAll(':scope>.fx89-layer,:scope>.fx111-core-soft').forEach(function(el){
  if(!lk){if(el.matches('.fx89-core,.fx89-core-flame'))return;mv(el,ink);return}
  /* placed once per picture; never moved again (QA: re-translating it cut the spiral's seeds) */
  var tag=k+'|'+other;if(el.getAttribute('data-v179k')===tag)return;el.setAttribute('data-v179k',tag);
  hold(el,0,0);
  if(other){el.style.setProperty('--lx-cyn',cy);el.style.setProperty('--lx-wy',cy+'%')}
  else{el.style.removeProperty('--lx-cyn');el.style.removeProperty('--lx-wy')}
 });
 if(!lk)coreGroup(shell,ink);
 var hero=shell.closest('.lamp76-hero,dialog.lamp73-dialog');
 if(hero)hero.querySelectorAll(':scope>.lamp76-glow,:scope>.fx89-layer').forEach(function(el){mv(el,ink)});
 faces(shell,svg);
}
/* Art Director (v178 audit): at night the ember motes crossed the friend's face (2-6% of it on dragon, bee,
   fox, sun tiger, axolotl). The ember layer now has a small window cut out over the face (the eyes and
   mouth group, .il-xs-hide, as AD measures it), so motes fade out there and show again above the head. */
function faces(shell,svg){
 var host=shell.closest('.lamp76-hero,dialog.lamp73-dialog')||shell;
 var fb=null;svg.querySelectorAll('.il-xs-hide').forEach(function(e){var r=e.getBoundingClientRect();if(!r.width||r.width>=200)return;
  fb=fb?{l:Math.min(fb.l,r.left),t:Math.min(fb.t,r.top),r:Math.max(fb.r,r.right),b:Math.max(fb.b,r.bottom)}:{l:r.left,t:r.top,r:r.right,b:r.bottom}});
 host.querySelectorAll('.fx89-layer.fx89-ember').forEach(function(el){
  if(!fb){el.classList.remove('v179face');return}
  var r=el.getBoundingClientRect();if(!r.width)return;var P=4;
  el.style.setProperty('--v179fw',(fb.r-fb.l+2*P).toFixed(1)+'px');el.style.setProperty('--v179fh',(fb.b-fb.t+2*P).toFixed(1)+'px');
  el.style.setProperty('--v179fp',(fb.l-P-r.left).toFixed(1)+'px '+(fb.t-P-r.top).toFixed(1)+'px');
  el.classList.add('v179face')});
}
/* Bright core (v89/v111): its glow pieces sit below the layer's middle (v89 places them at ~56% with the light at
   46-48% of each piece) and a small flame sits above, so centring the layer's box put the drawn light ~4 px below the
   body (gate). Centre the core by where its light is drawn instead: each piece's gradient centre, weighted by its
   area and strength. The core and its flame move together (the flame stays on top). */
function gradCentre(e){var r=e.getBoundingClientRect();if(!r.width)return null;var cs=getComputedStyle(e),bg=cs.backgroundImage;if(!bg||bg.indexOf('radial-gradient')<0)return null;
 var m=bg.match(/at ([\d.]+)% ([\d.]+)%/),px=m?+m[1]/100:.5,py=m?+m[2]/100:.5;
 var a=bg.match(/\/ ([\d.]+)\)/),al=1;var first=bg.slice(bg.indexOf('(')+1);var fc=first.match(/^[^,]*?(?:circle|ellipse|at [^,]*)?,\s*([a-z]+\([^)]*\))/);
 if(fc){var mm=fc[1].match(/\/ ([\d.]+)\)$/)||fc[1].match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);if(mm)al=+mm[1]}
 var w=r.width*r.height*al*(+cs.opacity||0);return {x:r.left+px*r.width,y:r.top+py*r.height,w:w}}
function coreGroup(shell,ink){
 var ls=shell.querySelectorAll(':scope>.fx89-layer.fx89-core,:scope>.fx89-layer.fx89-core-flame');if(!ls.length)return;
 var sw=0,sx=0,sy=0;ls.forEach(function(l){base(l)});
 ls.forEach(function(l){l.querySelectorAll('*').forEach(function(e){var g=gradCentre(e);if(g&&g.w>0){sw+=g.w;sx+=g.w*g.x;sy+=g.w*g.y}})});
 var c;if(sw){c={cx:sx/sw,cy:sy/sw}}else c=ctr(ls[0]);
 ls.forEach(function(l){hold(l,ink.cx-c.cx,ink.cy-c.cy)});
}
var t=0;
function one(s){var svg=s.querySelector('svg.lamp73-svg');if(!svg)return;
 measure(svg,function(f,k){if(!f)return;
  /* only apply to the picture we measured; if it was redrawn meanwhile, measure again */
  if(s.querySelector('svg.lamp73-svg')!==svg||key(svg)!==k){soon();return}
  try{apply(s,svg,f,k)}catch(e){}})}
function run(){t=0;watch();try{document.querySelectorAll('.lamp73-shell').forEach(function(s){if(s.offsetParent)one(s)})}catch(e){}}
function soon(){if(t)return;t=setTimeout(function(){requestAnimationFrame(run)},90)}
/* v178's wrappers dropped the wrapped functions' own markers (LampFx2's _lfx2 on lampFxInsert89),
   so anything guarding on _lfx2 would wrap again. Put it back, and keep every prop on our own wraps. */
try{if(typeof lampFxSpiralSVG89==='function'&&lampFxSpiralSVG89._lfx2&&typeof window.lampFxInsert89==='function'&&!window.lampFxInsert89._lfx2)window.lampFxInsert89._lfx2=1}catch(e){}
['lampMountAll73','lampFxRemount89','lampFxInsert89','lampFxDecorate111'].forEach(function(n){var f=window[n];if(typeof f!=='function')return;
 var w=function(){var r=f.apply(this,arguments);soon();return r};
 try{Object.keys(f).forEach(function(k){w[k]=f[k]})}catch(e){}
 window[n]=w});
/* re-centre on any redraw, on a friend / stage / look change, and when the hero's size changes
   after layout (fonts, images, card growth), so the result never depends on load timing */
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x&&x.closest&&x.closest('.lamp76-hero,.lamp73-shell,dialog.lamp73-dialog')){soon();return}}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-il-kind','data-il-stage','data-il-look','data-stage73']})}catch(e){}
var RO=null,seen=typeof WeakSet==='function'?new WeakSet():null;
try{RO=new ResizeObserver(function(){soon()})}catch(e){}
function watch(){if(!RO||!seen)return;document.querySelectorAll('.lamp73-shell,.lamp76-hero').forEach(function(el){if(!seen.has(el)){seen.add(el);try{RO.observe(el)}catch(e){}}})}
window.addEventListener('resize',soon);
window.addEventListener('load',soon);
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}catch(e){}
soon();
/* Pi (COMPANION_TRUTHS_v2): the Firefly's 1, 3, 9, 27 is drawn on EACH wing; counting both wings gives 2, 6, 18, 54.
   Say "on each wing" (as the Moth line does). ES: "En cada ala" (lang/es.json; flagged for the Spanish reviewer). */
(function(){var OLD='Take the middle out of every triangle, again and again: 1, 3, 9, 27.',NEW='On each wing, take the middle out of every triangle, again and again: 1, 3, 9, 27.';
 try{if(typeof window.gT==='function'&&!window.gT._v179){var G=window.gT;var w=function(s){if(s===OLD){var a=[].slice.call(arguments);a[0]=NEW;return G.apply(this,a)}return G.apply(this,arguments)};
  Object.keys(G).forEach(function(k){w[k]=G[k]});w._v179=1;window.gT=w}}catch(e){}})();
window.IL179={version:179,run:run,_centre:function(svg,cb){measure(svg,cb)}};
})();
/* v180: fixes from QA's v179 pass.
   1. Constellation look: ten friends (Bee, Fern, Fox, Sun Tiger, Lion Cub, Firefly, Moss Hedgehog, Glowcap, Axolotl,
      Highland Cow) have no Constellation drawing, and v165 skipped their own art whenever the look was not Inner light,
      so they showed the generic lamp flame. (Already so in v178.) Now any friend whose look has no drawing of its own
      keeps its Inner light art. Friends with real Constellation art (Turtle, Owl, Moth, Lamp, grown Phoenix) keep it.
   2. Grown Phoenix's Constellation star figure had no friend tag, so the glow and the Sleeping spiral could not find it
      (spiral ~187 px off). It is tagged now; the hatchling Phoenix (no star figure) keeps its Inner art.
   3. Ember pulses at night: v179's window hid the motes over a face, but on the grown Fox the left vent path still ran
      through the face. Mote paths that cross a friend's face (eyes + mouth box) are moved sideways (or up) to clear it,
      for every friend and stage; v179's window stays as a second guard.
   4. Comb jelly on hatchlings and young friends sat ~20 px below the body (its stage-1/2 slot is low in the layer).
      The jelly window is centred on the layer (which v179 centres on the body) for every friend except the Lamp,
      whose jelly sits in its glass (v172). The Lamp-only glass edges are not drawn for other friends.
   5. Sound Cards keep playing when Soft sounds is turned off: turning Soft sounds off now stops them (scStop101),
      as U5 / U6 / See Your Sound already do. No sound content changes.
   6. (Art Director, live v179) Ember at night, 1280, motion on: 3.3-6.3% of the face changed on Bee, Fox, Owl, Lamp, Lion,
      Fern. Not motes: the ember layer over the blinking eyes made Chrome draw the face ~1 px differently. The friend art now
      always has its own layer (same pixels with or without an effect), and the face window is soft-edged (no straight edge
      above the Fox's eyes).
   7. (Art Director) Lamp Sleeping spiral: the lantern cut-out follows the stage's lantern size again (v179 used the grown size,
      hiding the young Lamp's top seed), and each stage's resting pose keeps every bold seed clear of the lantern.
   Nothing leaves the device. */
(function(){
'use strict';
if(typeof window==='undefined'||window.IL180)return;

/* ---------- 1 + 2: art for looks without a drawing of their own ---------- */
function canon(k){try{if(typeof IL165==='object'&&IL165.canon)return IL165.canon(k)}catch(e){}return k==='shell'?'turtle':k}
function order(){try{if(typeof IL165==='object'&&IL165.order)return IL165.order}catch(e){}return []}
function phase(st){try{if(typeof IL165==='object'&&IL165.phase)return IL165.phase(st)}catch(e){}var s=+st||1;return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise'}
function lookNow(opt){if(opt&&opt.look)return opt.look;try{if(typeof IL147==='object'&&IL147.load)return IL147.load()||'inner'}catch(e){}return 'inner'}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function tagged(html){return /data-il-kind="/.test(String(html||''))}
function starFig(html){return /class="[^"]*\bstarTrace111\b/.test(String(html||''))&&/data-starfig="/.test(String(html||''))}
var busy=0;
function innerArt(kind,stage){
 if(busy)return '';busy++;
 try{return (typeof IL119==='object'&&typeof IL119.art==='function')?(IL119.art(kind,stage,{look:'inner'})||''):''}catch(e){return ''}finally{busy--}
}
/* html = what the look produced; returns the friend's own art when the look had none */
function fix(kind,stage,html,look){
 if(!look||look==='inner')return html;
 var sp=canon(kind);if(order().indexOf(sp)<0)return html;
 if(tagged(html))return html;                       // the look's own drawing (or an already tagged Inner art)
 if(sp==='phoenix'&&starFig(html)){                 // grown Phoenix star figure: tag it so the glow / effects find it
  return '<g class="il119 il180" data-il-kind="phoenix" data-il-stage="'+esc(phase(stage))+'" data-il-look="'+esc(look)+'" data-il-pattern="triangle">'+html+'</g>';
 }
 var own=innerArt(kind,stage);
 return own&&tagged(own)?own:html;
}
function copyProps(from,to){try{Object.keys(from).forEach(function(k){to[k]=from[k]})}catch(e){}return to}
function hookArt(){
 if(typeof IL119==='object'&&typeof IL119.art==='function'&&!IL119.art._v180){
  var prev=IL119.art;
  IL119.art=copyProps(prev,function(kind,stage,opt){
   var html=prev.apply(this,arguments);
   if(busy)return html;
   try{return fix(kind,stage,html,lookNow(opt))}catch(e){return html}
  });
  IL119.art._v180=1;IL119.art._base=prev._base||prev;
 }
 if(typeof window.friendArtInner101==='function'&&!window.friendArtInner101._v180){
  var prevF=window.friendArtInner101;
  window.friendArtInner101=copyProps(prevF,function(id,stage){
   var html=prevF.apply(this,arguments);
   if(busy)return html;
   try{return fix(id,stage,html,lookNow())}catch(e){return html}
  });
  window.friendArtInner101._v180=1;window.friendArtInner101._base=prevF._base||prevF;
 }
}
hookArt();

/* ---------- 4: comb jelly window on the body for every friend but the Lamp ---------- */
var st=document.createElement('style');st.id='v180css';
var NL=':is(.lamp73-shell,.lamp76-hero,dialog.lamp73-dialog):not(:has([data-il-kind="lamp"]))';
st.textContent=NL+' .fx89-layer.fx89-jelly .fx89-jelly-clip{top:50%!important;translate:0 -50%!important}'+
 NL+' .fx89-layer.fx89-jelly .fx2-jedge{display:none!important}'+
 /* Art Director (v179 live): on the young and hatchling Lamp the Sleeping spiral's lantern cut-out was the grown-size
    lantern (v179 set its size to 100%), so the top seed sat half under an invisible cap. The cut-out follows the stage's
    lantern again (v172's --lx-s); v179's bigger plain layer (seeds may draw past the box) is kept. */
 '.lamp73-shell:has([data-il-kind="lamp"][data-il-look="inner"])>.fx89-layer.fx89-spiral{-webkit-mask-size:calc(100% * var(--lx-s,1)) calc(100% * var(--lx-s,1)),200% 200%!important;mask-size:calc(100% * var(--lx-s,1)) calc(100% * var(--lx-s,1)),200% 200%!important}'+
 /* ...and the Sleeping spiral's resting pose puts every bold seed clear of the lantern (handle, cap, feet), per stage:
    a turn of the whole ring (the spin goes on from there) and, where no turn is enough, a slightly wider ring.
    Centre unchanged. Measured by probe-lampseeds.js (fraction of each seed under the cut-out, 0 at rest). */
 [['hatchling',0,1.06],['young',56,1],['grown',280,1.1],['wise',276,1.1]].map(function(a){
  return '.lamp73-shell:has([data-il-kind="lamp"][data-il-look="inner"][data-il-stage="'+a[0]+'"]):not(#fx2):not(#v180) svg.fx2-spiral .fx2-ctr{transform:translate(50px,calc(var(--lx-cyn) * 1px)) rotate('+a[1]+'deg) scale('+a[2]+')}'}).join('')+
 /* Art Director's FACE check (night, 1280, motion on: the page with the ember vs without it) read 3.3-6.3% on six
    friends. The ember motes are not over the face (the layer alone reads 0% in every frame); the face itself was
    drawn ~1 px differently: with the 200 px ember layer over the blinking eyes (an opacity animation), Chrome
    rasterised the friend art in a separate pass and the nose / mouth / outline snapped to other pixels. The friend
    art now always gets its own layer, so it is drawn the same with or without an effect over it. */
 'svg.lamp73-svg{will-change:opacity}'+
 /* ember face window: soft-edged (v179's was a hard rectangle that left a straight edge in the ember light above the
    Fox's eyes); see route() for its size */
 '.fx89-layer.fx89-ember.v179face.v180face{-webkit-mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,radial-gradient(closest-side,#000 62%,rgba(0,0,0,0) 100%) var(--v180fp)/var(--v180fw) var(--v180fh) no-repeat!important;-webkit-mask-composite:xor!important;'+
 'mask:linear-gradient(#000,#000) 0 0/100% 100% no-repeat,radial-gradient(closest-side,#000 62%,rgba(0,0,0,0) 100%) var(--v180fp)/var(--v180fw) var(--v180fh) no-repeat!important;mask-composite:exclude!important}';
(document.head||document.documentElement).appendChild(st);

/* ---------- 3: ember mote paths clear of the face ---------- */
var PAD=3.6;   // mote radius (<= 3.3 in the 100 box) + margin
function faceBox(svg){var fb=null;svg.querySelectorAll('.il-xs-hide').forEach(function(e){var r=e.getBoundingClientRect();if(!r.width||r.width>=200)return;
 fb=fb?{l:Math.min(fb.l,r.left),t:Math.min(fb.t,r.top),r:Math.max(fb.r,r.right),b:Math.max(fb.b,r.bottom)}:{l:r.left,t:r.top,r:r.right,b:r.bottom}});return fb}
function nums(s){return (String(s).match(/-?\d*\.?\d+/g)||[]).map(Number)}
function shiftPath(s,dx,dy){var i=0;return String(s).replace(/-?\d*\.?\d+/g,function(n){var v=+n+(i++%2?dy:dx);return (Math.round(v*100)/100).toString()})}
function bboxOf(s){var n=nums(s),b={l:1e9,t:1e9,r:-1e9,b:-1e9};for(var i=0;i+1<n.length;i+=2){b.l=Math.min(b.l,n[i]);b.r=Math.max(b.r,n[i]);b.t=Math.min(b.t,n[i+1]);b.b=Math.max(b.b,n[i+1])}return b}
function hit(a,F){return a.r+PAD>F.l&&a.l-PAD<F.r&&a.b+PAD>F.t&&a.t-PAD<F.b}
/* One move for all of a layer's mote paths, so the ember stays symmetric (its x centre does not move):
   spread the two vents apart by the same amount, or lift both by the same amount, whichever is smaller. */
function sideOf(B){var c=(B.l+B.r)/2;return c<49.5?-1:c>50.5?1:0}
function plan(Bs,F){
 if(!Bs.some(function(B){return hit(B,F)}))return {dx:0,dy:0};
 var spread=null,lift=null,d,ok;
 for(d=.25;d<=30;d+=.25){ok=Bs.every(function(B){var sd=sideOf(B);if(!sd)return !hit(B,F);var S={l:B.l+sd*d,r:B.r+sd*d,t:B.t,b:B.b};return S.l>=1&&S.r<=99&&!hit(S,F)});if(ok){spread=d;break}}
 for(d=.25;d<=40;d+=.25){ok=Bs.every(function(B){var S={l:B.l,r:B.r,t:B.t-d,b:B.b-d};return S.t>=-12&&!hit(S,F)});if(ok){lift=d;break}}
 if(spread==null&&lift==null)return null;
 if(lift==null||(spread!=null&&spread<=lift*1.3))return {spread:spread};
 return {lift:lift};
}
function moveOf(B,P){if(!P)return null;if(P.spread)return {dx:sideOf(B)*P.spread,dy:0};if(P.lift)return {dx:0,dy:-P.lift};return {dx:0,dy:0}}
function route(layer){
 var host=layer.closest('.lamp76-hero,dialog.lamp73-dialog')||layer.parentElement;if(!host)return;
 var svg=host.querySelector('svg.lamp73-svg'),es=layer.querySelector('svg');if(!svg||!es)return;
 var lr=es.getBoundingClientRect();if(!lr.width||!lr.height)return;
 var fb=faceBox(svg);
 var F=fb?{l:(fb.l-lr.left)/lr.width*100,r:(fb.r-lr.left)/lr.width*100,t:(fb.t-lr.top)/lr.height*100,b:(fb.b-lr.top)/lr.height*100}:null;
 var paths=[].slice.call(es.querySelectorAll('animateMotion[path],path.fx89-etrack'));
 var pts=[].slice.call(es.querySelectorAll('g.fx2-em[transform],circle.fx89-ed[cx]'));
 paths.forEach(function(el){var at=el.tagName.toLowerCase()==='animatemotion'?'path':'d';if(el.getAttribute('data-v180o')==null)el.setAttribute('data-v180o',el.getAttribute(at))});
 pts.forEach(function(el){if(el.getAttribute('data-v180o')==null)el.setAttribute('data-v180o',el.tagName.toLowerCase()==='g'?el.getAttribute('transform'):el.getAttribute('cx')+' '+el.getAttribute('cy'))});
 var boxes=paths.map(function(el){return bboxOf(el.getAttribute('data-v180o'))}).concat(pts.map(function(el){var n=nums(el.getAttribute('data-v180o'));return {l:n[0],r:n[0],t:n[1],b:n[1]}}));
 var P=F&&boxes.length?plan(boxes,F):{dx:0,dy:0},hidden=0;
 paths.forEach(function(el,i){
  var at=el.tagName.toLowerCase()==='animatemotion'?'path':'d',o=el.getAttribute('data-v180o');
  var mv=P&&(P.spread||P.lift)?moveOf(boxes[i],P):(P?{dx:0,dy:0}:null);
  var want=mv?shiftPath(o,mv.dx,mv.dy):o;if(el.getAttribute(at)!==want)el.setAttribute(at,want);
  var mote=at==='path'?el.parentNode:null;
  if(mote&&mote.style){if(!mv&&hit(boxes[i],F)){mote.style.display='none';hidden++}else if(mote.style.display==='none')mote.style.display=''}
 });
 pts.forEach(function(el,j){
  var B=boxes[paths.length+j],n=[B.l,B.t],isG=el.tagName.toLowerCase()==='g';
  var mv=P&&(P.spread||P.lift)?moveOf(B,P):(P?{dx:0,dy:0}:null);
  if(!mv){if(hit(B,F)){el.style.display='none';hidden++}return}
  if(el.style.display==='none')el.style.display='';
  var x=Math.round((n[0]+mv.dx)*100)/100,y=Math.round((n[1]+mv.dy)*100)/100;
  if(isG)el.setAttribute('transform','translate('+x+' '+y+')');else{el.setAttribute('cx',x);el.setAttribute('cy',y)}
 });
 /* soft window: an ellipse 1.6x the face box (+4 px), solid to 62% of its radius, fading out to its edge */
 if(fb){var lb=layer.getBoundingClientRect(),fw=(fb.r-fb.l+8)*1.6,fh=(fb.b-fb.t+8)*1.6,cx=(fb.l+fb.r)/2-lb.left,cy=(fb.t+fb.b)/2-lb.top;
  layer.style.setProperty('--v180fw',fw.toFixed(1)+'px');layer.style.setProperty('--v180fh',fh.toFixed(1)+'px');
  layer.style.setProperty('--v180fp',(cx-fw/2).toFixed(1)+'px '+(cy-fh/2).toFixed(1)+'px');layer.classList.add('v180face')}
 else layer.classList.remove('v180face');
 layer.setAttribute('data-v180face',!F?'none':!P?'hid'+hidden:P.spread?'spread'+P.spread:P.lift?'lift'+P.lift:'clear');
}
var tq=0;
function runEmbers(){tq=0;try{document.querySelectorAll('.fx89-layer.fx89-ember').forEach(function(l){if(l.getBoundingClientRect().width)route(l)})}catch(e){}}
function soon(){if(tq)return;tq=setTimeout(function(){requestAnimationFrame(runEmbers)},120)}
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x&&x.closest&&x.closest('.lamp76-hero,.lamp73-shell,dialog.lamp73-dialog')){soon();return}}})
 .observe(document.body||document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class','data-il-kind','data-il-stage','data-stage73']})}catch(e){}
window.addEventListener('resize',soon);window.addEventListener('load',soon);
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}catch(e){}
soon();

/* ---------- 5: Soft sounds off stops Sound Cards ---------- */
if(typeof window.lampSfxSet73==='function'&&!window.lampSfxSet73._v180){
 var prevS=window.lampSfxSet73;
 window.lampSfxSet73=copyProps(prevS,function(on){
  var r=prevS.apply(this,arguments);
  if(!on&&typeof window.scStop101==='function'){try{window.scStop101()}catch(e){}}
  return r;
 });
 window.lampSfxSet73._v180=1;
}

window.IL180={version:180,fixArt:fix,routeEmbers:runEmbers};
})();
/* v181: local preview (do not ship until Ignacio OKs it in Builder's chat).
   Refresh-flash skeleton (C4), Patterns tap lock (C5), Grow layout (no recipe / no gallery,
   counter under controls, Reset + colors, storage clear, Float at cap), fractal Reset + colors,
   Same Shape upgrade, See Your Sound polish, Half and Quarter upgrade, Zoom hunt + phone layout
   + kid wording, Paint Hide tools, Year Wheel back-to-Patterns, U11b bot pictures (file + snail
   word-art fix). Ignacio, 20 Nov 6:55 PM America/Denver: KEEP and upgrade the 19-cell Honeycomb
   Builder (colors, Reset, calm, keep U6 tone); Endless Honeycomb stays too. Sound Draws Shapes is
   upgraded per the spec (no hold flag). First Letter Garden and Spheres
   Lullaby are not in this drop. Old Paint stays reachable. Challenge mode is unchanged. */
(function(root){
try{if(root.document&&root.document.documentElement)root.document.documentElement.classList.add("lamp-boot181")}catch(e){}

'use strict';

/* Ignacio 6:55 PM: Builder stays and is upgraded; Endless Honeycomb stays too.
   Sound Draws is upgraded with no hold flag. The honeycomb-removal flag stays in the file
   only so a later ship could hide the 19-cell toy; it defaults to KEEP. */
if(typeof root.V181_REMOVE_HONEYCOMB==='undefined') root.V181_REMOVE_HONEYCOMB=false; /* KEEP the 19-cell Builder */
if(typeof root.V181_SOUND_DRAWS_UPGRADE==='undefined') root.V181_SOUND_DRAWS_UPGRADE=true; /* always upgrade Sound Draws */

var PAL=[{id:'honey',en:'Honey',es:'Miel',c:['#e6b454','#c45a3a','#fff6d8']},
         {id:'river',en:'River',es:'Río',c:['#5b7ea8','#c2dce2','#e8c894']},
         {id:'leaf',en:'Leaf',es:'Hoja',c:['#6f9a7a','#eac77d','#f4e4c4']},
         {id:'plum',en:'Plum',es:'Ciruela',c:['#8a5a7a','#e07a5f','#f4d35e']},
         {id:'night',en:'Night',es:'Noche',c:['#2a2233','#e6b454','#f6ecd8']},
         {id:'shell',en:'Shell',es:'Concha',c:['#c45a3a','#f4e4c4','#5b7ea8']}];

var ES={
  'Hide tools':'Ocultar herramientas',
  'Tools':'Herramientas',
  'Reset':'Empezar de nuevo',
  'Holding this seed on this screen.':'Se queda esta semilla en esta pantalla.',
  'A tiny copy of this shape is hiding. Tap the gold dot on it.':'Una copia chiquita de esta forma está escondida. Toca el puntito dorado.',
  'Tap a gold dot. Then count the little arms on that bump.':'Toca un puntito dorado. Luego cuenta los bracitos de ese bulto.',
  'You found a tiny copy.':'Encontraste una copia chiquita.',
  'This bump has 3 arms.':'Este bulto tiene 3 bracitos.',
  'This bump has 4 arms.':'Este bulto tiene 4 bracitos.',
  'This bump has 5 arms.':'Este bulto tiene 5 bracitos.',
  'Honey':'Miel','River':'Río','Leaf':'Hoja','Plum':'Ciruela','Night':'Noche','Shell':'Concha',
  'Same shape, different size.':'La misma forma, de otro tamaño.',
  'Make it bigger':'Hazla más grande',
  'Make it smaller':'Hazla más chica',
  'Which of these is the same shape as this one?':'¿Cuál de estas tiene la misma forma que esta?',
  'Yes — same shape.':'Sí: la misma forma.',
  'Not that one. Try another.':'Esa no. Prueba otra.',
  'half':'mitad','quarter':'cuarto',
  'Half':'Mitad','Quarter':'Cuarto',
  '2 of 2 pieces. Each one is a half.':'2 de 2 pedazos. Cada uno es una mitad.',
  '4 of 4 pieces. Each one is a quarter.':'4 de 4 pedazos. Cada uno es un cuarto.',
  'The jar is half full.':'El frasco está medio lleno.',
  'The jar is a quarter full.':'El frasco está un cuarto lleno.',
  'Folded in half.':'Doblado por la mitad.',
  'Folded in quarters.':'Doblado en cuartos.',
  'Draw it slowly':'Dibújalo despacio',
  'Favorite pair':'Par favorito',
  'Saved this pair.':'Se guardó este par.',
  'Show my favorite':'Ver mi favorito',
  'Look closer':'Mirar de cerca',
  'Endless Honeycomb':'Panal sin fin',
  'A tile that grows by the same rule, without end.':'Una ficha que crece con la misma regla, sin fin.',
  'Fill the six around the one.':'Llena los seis alrededor del uno.',
  'Seven make one bigger tile.':'Siete forman una ficha más grande.',
  'Each tile is everything you built.':'Cada ficha es todo lo que construiste.',
  "It's not a perfect hexagon. Copies still fit with no gaps.":'No es un hexágono perfecto. Sus copias encajan sin huecos.',
  'Start again':'Empezar de nuevo',
  'Circle plate':'Plato redondo',
  'Square plate':'Plato cuadrado',
  '3 curves':'3 curvas',
  'a sun':'un sol',
  'a zigzag':'un zigzag',
  'branches':'ramas',
  'a cross and a ring':'una cruz y un aro',
  'little dashes':'rayitas',
  'a loop':'un lazo',
  'a flower':'una flor',
  'a star':'una estrella',
  'twigs':'ramitas',
  'a web':'una telaraña',
  'loops':'aros',
  'a shower':'una lluvia',
  'a star in the middle':'una estrella en el medio',
  'many marks':'muchas marcas',
  'a star and little stars':'una estrella y estrellitas',
  'Pattern Loom':'Telar de patrones',
  'Bloom':'Flor',
  'Tap, and circles bloom.':'Toca, y los círculos florecen.',
  'Every circle is the same size. Exactly six fit around one.':'Todos los círculos son del mismo tamaño. Caben justo seis alrededor de uno.',
};



function esLang(){try{return (typeof LANG==='string'&&LANG==='es')||(typeof curLang==='function'&&curLang()==='es')}catch(e){return false}}
function t181(s,v){
  var out;
  if(esLang()&&ES[s]) out=ES[s];
  else if(typeof gT==='function'){try{out=gT(s,v)}catch(e){out=s}}
  else out=s;
  if(v&&typeof out==='string') out=out.replace(/\{(\w+)\}/g,function(_,k){return v[k]==null?'':String(v[k])});
  return out;
}
function esc181(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pid181(){try{return (typeof curPid==='function'?curPid():'')||''}catch(e){return ''}}
function reduced181(){try{return (typeof lampReduced73==='function'&&lampReduced73())||(root.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}}
function $(id){return document.getElementById(id)}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function')return;var next=wrap(prev);next._v181=1;next._base=prev;root[name]=next;return next}

/* ---- CSS ---- */
function css(){
  if(document.getElementById('v181css'))return;
  var s=document.createElement('style');s.id='v181css';
  s.textContent=
    '#patterns .pat-units.pat-lock181{pointer-events:none}'+
    '#patterns .g181-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:10px 0}'+
    '#patterns .g181-row button, #patterns .g181-pal button, .g181-row button{min-height:56px;min-width:56px}'+
    '#patterns .g181-pal{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}'+
    '#patterns .g181-pal button{width:56px;height:56px;border-radius:14px;border:2px solid #d8cdb8;padding:0}'+
    '#patterns .g181-pal button.on{box-shadow:inset 0 0 0 3px #2f2a24}'+
    '#patterns .g181-pal button span{display:block;font-size:.65rem;line-height:1.1;margin-top:2px;color:var(--ink,#2f2a24)}'+
    'body.night #patterns .g181-pal button.on,body.bedtime #patterns .g181-pal button.on{box-shadow:inset 0 0 0 3px #f6ecd8}'+
    '#patterns .g181-under{margin-top:12px}'+
    '#patterns [data-gaf3jar].g181-under{order:9}'+
    '#pstudio.paint-hide181 .pbar, #pstudio.paint-hide181 .pbar101{display:none!important}'+
    '#pstudio .paint-tab181,#pstudio .paint-leave181,#pstudio .paint-hidebtn181{min-height:56px;min-width:56px;z-index:5}'+
    '#pstudio.paint-hide181 .paint-tab181,#pstudio.paint-hide181 .paint-leave181{position:absolute;top:8px;display:inline-flex;align-items:center;justify-content:center;padding:8px 14px}'+
    '#pstudio.paint-hide181 .paint-tab181{left:8px}'+
    '#pstudio.paint-hide181 .paint-leave181{right:8px}'+
    '#pstudio:not(.paint-hide181) .paint-tab181,#pstudio:not(.paint-hide181) .paint-leave181{display:none}'+
    '@media (prefers-reduced-motion:reduce){#pstudio .pbar,#pstudio .pbar101,#pstudio .paint-tab181{transition:none}}'+
    '@media (max-width:700px){#patterns .zoom-stage181{margin:0 auto 8px;max-width:100%}#patterns .zoom-stage181 canvas{display:block;width:min(100%,360px);height:auto;margin:0 auto}}'+
    '#patterns.zoom-hunt181 [data-kind181]:not([data-kind181="mandel"]){opacity:.45;pointer-events:none}'+
    '.sys177-row button{min-width:56px!important;min-height:56px!important}'+
    '.same181-scale{display:flex;gap:8px;justify-content:center;margin:8px 0}'+
    '.same181-quiz{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-top:12px}'+
    '.frac181-pic{max-width:360px;margin:0 auto;text-align:center}'+'.eh181-stage{position:relative;max-width:420px;margin:12px auto}'+'.eh181-stage svg{display:block;width:100%;height:auto;background:#120E18;border-radius:16px}'+'.eh181-zoom{transform-origin:50% 50%;transition:transform 1.4s ease}'+'.eh181-fade{transition:opacity .8s ease}'+'@media(prefers-reduced-motion:reduce){.eh181-zoom,.eh181-fade{transition:none}}'+'.eh181-ghost{cursor:pointer;opacity:.45}'+'.eh181-glow .eh181-on{filter:drop-shadow(0 0 5px #e6b454)}'+'.loom181-stage{position:relative;max-width:420px;margin:12px auto;background:#120E18;border-radius:16px;overflow:hidden}'+'.loom181-stage svg{display:block;width:100%;height:auto;touch-action:none}'+'.loom181-toast{position:absolute;left:16px;right:16px;bottom:16px;background:#fffdf8ee;border-radius:16px;padding:10px 14px;color:#2f2a24;font:1rem/1.35 Georgia,serif;opacity:1;transition:opacity 1.6s ease}'+'.loom181-toast.loom181-out{opacity:0}'+'.loom181-dial{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:10px 0}'+'.loom181-dial button{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:56px;min-height:56px;padding:6px}'+'.loom181-dial button.on{box-shadow:inset 0 0 0 2px #c28500}'+'#patChCv.plate-circle181{border-radius:50%;overflow:hidden}'+'#patChCv.plate-circle181{border-radius:50%}'+
    '.hdr-ico181 svg,.hdr-ico181 .lamp-art63{width:100%;height:100%;display:block}'+
    'h1{white-space:nowrap}'+
    '@media (max-width:420px){header h1{font-size:1.05rem;white-space:normal}}';
  document.head.appendChild(s);
}

/* ---- upgrade clear (gallery / recipe; keep sky rings) ---- */
function clearUpgrade181(){
  var mark='lamp_v181_cleared';
  try{if(localStorage.getItem(mark)==='1')return}catch(e){}
  function drop(store,key){
    if(!key)return;
    if(/^lamp_fractals106@/.test(key)) store.removeItem(key);
    else if(/^lamp_gaf2@/.test(key)) store.removeItem(key);
    else if(/gaf.*recipe|gafload|gafprint/i.test(key)&&!/^lamp_gaf3sky@/.test(key)) store.removeItem(key);
  }
  try{
    var i,k,keys=[];
    for(i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
    keys.forEach(function(key){drop(localStorage,key)});
    localStorage.setItem(mark,'1');
  }catch(e){}
  try{
    if(typeof RAW==='object'&&RAW){
      if(typeof RAW.keys==='function'){
        (RAW.keys()||[]).slice().forEach(function(key){if(!/^lamp_gaf3sky@/.test(key)) drop(RAW,key)});
      }
    }
  }catch(e){}
}

/* ---- snail word picture: skip the Snail account picture ---- */
function fixSnail181(){
  if(typeof artInner63!=='function'||artInner63._v181)return;
  hook('artInner63',function(prev){
    return function(k){
      if(k==='snail'&&root.AVATARS&&AVATARS.snail){
        var hold=AVATARS.snail;
        try{delete AVATARS.snail;return prev.apply(this,arguments)}
        finally{AVATARS.snail=hold}
      }
      return prev.apply(this,arguments);
    };
  });
  try{if(typeof ART63!=='undefined') ART63.cache={}}catch(e){}
}

/* ---- first paint / C4 ---- */
function fillHeader181(){
  document.querySelectorAll('[data-art181]').forEach(function(el){
    if(el.getAttribute('data-filled181'))return;
    var k=el.getAttribute('data-art181');
    try{
      if(typeof lampArt63==='function'){el.innerHTML=lampArt63(k);el.setAttribute('data-filled181','1')}
    }catch(e){}
  });
  try{if(typeof artRefresh63==='function') artRefresh63(document.header||document.body)}catch(e){}
}
function reveal181(){
  if(root.__lampArtReady181)return;
  root.__lampArtReady181=true;
  fillHeader181();
  try{if(typeof artRefresh63==='function') artRefresh63(document.body)}catch(e){}
  document.documentElement.classList.add('art-ready');
  document.documentElement.classList.remove('lamp-boot181');
  var boot=$('lampBoot181');if(boot&&boot.parentNode)boot.parentNode.removeChild(boot);
}
function fromPatterns181(){
  try{
    var q=new URLSearchParams(location.search);
    if(q.get('from')==='patterns')return true;
    if((location.hash||'')==='#patterns')return true;
  }catch(e){}
  return false;
}
function bootReveal181(){
  fillHeader181();
  var wantPat=fromPatterns181();
  function mount(){
    try{
      if(wantPat&&typeof show==='function') show('patterns');
      else{
        var hub=$('hub');
        if(hub&&!hub.classList.contains('hidden')&&typeof renderHub==='function'){
          renderHub();
          if(typeof lampMountAll73==='function') lampMountAll73();
        }
      }
    }catch(e){}
    var n=0;
    (function tick(){
      var hero=document.querySelector('#hub .lamp73-shell, #home .lamp73-shell, #hub [data-il-kind], #patterns');
      if((wantPat&&$('patterns'))||hero||n++>40) reveal181();
      else setTimeout(tick,50);
    })();
  }
  requestAnimationFrame(function(){requestAnimationFrame(mount)});
}

/* ---- Patterns lock (C5) + removals ---- */
function lockPatTiles181(){
  var grid=document.querySelector('#patterns .pat-units');if(!grid)return;
  grid.classList.add('pat-lock181');
  var unlocked=false;
  function unlock(){if(unlocked)return;unlocked=true;grid.classList.remove('pat-lock181')}
  function onUp(){document.removeEventListener('pointerup',onUp,true);document.removeEventListener('mouseup',onUp,true);document.removeEventListener('touchend',onUp,true);setTimeout(unlock,400)}
  document.addEventListener('pointerup',onUp,true);
  document.addEventListener('mouseup',onUp,true);
  document.addEventListener('touchend',onUp,true);
  setTimeout(unlock,900);
}
function wrapShow181(){
  /* Do not replace window.show — seatbelt/back/parity require the v99 history wrap to stay outermost. */
  if(typeof showCore10_97==='function'&&!showCore10_97._v181){
    hook('showCore10_97',function(prevC){
      return function(id){
        var orig=window.scrollTo,pending=false;
        if(id==='patterns') window.scrollTo=function(){pending=true};
        var r=prevC.apply(this,arguments);
        if(id==='patterns'){
          window.scrollTo=orig;
          lockPatTiles181();
          tidyPatterns181();
          requestAnimationFrame(function(){try{orig.call(window,0,0)}catch(e){}});
        }
        if(id==='paint') try{paintHideUI181()}catch(e){}
        return r;
      };
    });
  }
  if(typeof afterShow95==='function'&&!afterShow95._v181){
    hook('afterShow95',function(prev){
      return function(id){
        var r=prev.apply(this,arguments);
        try{
          if(id==='patterns'){lockPatTiles181();tidyPatterns181()}
          if(id==='paint') paintHideUI181();
        }catch(e){}
        return r;
      };
    });
  }
}
function tidyPatterns181(){
  var el=$('patterns');if(!el)return;
  /* Look closer (Patterns lamp button) */
  var lamp=$('patLamp106');if(lamp&&lamp.parentNode)lamp.parentNode.removeChild(lamp);
  el.querySelectorAll('button').forEach(function(b){
    var lab=(b.textContent||'');
    if(/Look closer|Mirar de cerca/i.test(lab)&&b.getAttribute('onclick')&&b.getAttribute('onclick').indexOf('patLampLook106')>=0){
      if(b.parentNode) b.parentNode.removeChild(b);
    }
  });
  var sun=el.querySelector('[data-pat="sunflower"]');if(sun&&sun.parentNode)sun.parentNode.removeChild(sun);
  if(root.V181_REMOVE_HONEYCOMB){
    var hx=el.querySelector('[data-pat="honeycomb"]');if(hx&&hx.parentNode)hx.parentNode.removeChild(hx);
  }
  try{loomTile181()}catch(e){}
  try{ehTile181()}catch(e){}
  /* Year Wheel: go with from=patterns so Back can return here */
  var year=el.querySelector('[data-pat="year"]');
  if(year){
    year.onclick=function(ev){
      if(ev) ev.preventDefault();
      var lang='en';
      try{lang=(typeof curLang==='function'&&curLang())||(typeof LANG==='string'?LANG:'en')}catch(e){}
      location.assign('year-wheel/?from=patterns'+(lang==='es'?'&lang=es':''));
    };
  }
}


/* ---- Endless Honeycomb (Gosper; stays alongside the 19-cell Builder) ---- */
var EH181={level:0,filled:[0,0,0,0,0,0],pal:0,busy:false,zooms:0};
function ehRot60(q,r){return [-r,q+r]}
function ehSteps(){
  var q=3,r=-1,s=[],i,t;
  for(i=0;i<6;i++){s.push([q,r]);t=ehRot60(q,r);q=t[0];r=t[1]}
  return s;
}
function ehHexD(cx,cy,r){
  var d=[],i,a;
  for(i=0;i<6;i++){a=Math.PI/180*(60*i-30);d.push((i?'L':'M')+(cx+r*Math.cos(a)).toFixed(2)+' '+(cy+r*Math.sin(a)).toFixed(2))}
  return d.join(' ')+'Z';
}
function ehXY(q,r,size){return [size*Math.sqrt(3)*(q+r/2), size*1.5*r]}
function ehNeighbors(){var q=1,r=0,s=[],i,t;for(i=0;i<6;i++){s.push([q,r]);t=ehRot60(q,r);q=t[0];r=t[1]}return s}
function ehStepN(v,n){
  var q=v[0],r=v[1],k,t;
  for(k=1;k<n;k++){t=[3*q+r,-q+2*r];q=t[0];r=t[1]}
  return [q,r];
}
function ehCells(level){
  if(level<=0) return [[0,0]];
  if(level===1) return [[0,0]].concat(ehNeighbors());
  var kids=ehCells(level-1), out=[], seen={},i,j,q,r,key,offs=[[0,0]],base=ehSteps();
  for(i=0;i<6;i++) offs.push(ehStepN(base[i], level-1));
  for(i=0;i<offs.length;i++){
    for(j=0;j<kids.length;j++){
      q=kids[j][0]+offs[i][0]; r=kids[j][1]+offs[i][1];
      key=q+','+r; if(seen[key]) continue; seen[key]=1; out.push([q,r]);
    }
  }
  return out;
}
function ehGroupOffset(level,i){
  if(level<=0) return ehNeighbors()[i];
  return ehStepN(ehSteps()[i], Math.max(1,level));
}
function ehFitSize(level){
  var cells=ehCells(level), max=1,i,xy,st,k,q,r;
  function consider(q,r){xy=ehXY(q,r,1);var d=Math.hypot(xy[0],xy[1])+1;if(d>max)max=d}
  for(i=0;i<cells.length;i++) consider(cells[i][0],cells[i][1]);
  if(level<3){
    for(i=0;i<6;i++){
      st=ehGroupOffset(level,i);
      for(k=0;k<cells.length;k++) consider(cells[k][0]+st[0], cells[k][1]+st[1]);
    }
  }
  var size=186/max;
  if(size<6.8) size=6.8;
  if(size>32) size=32;
  return size;
}
function ehInk(i){
  var p=PAL[i]||PAL[0];
  return {fill:p.c[0], stroke:'#855A00', ghost:'#C4A07A'};
}
function ehArt(){
  return '<svg width="56" height="56" viewBox="-28 -28 56 56" aria-hidden="true">'+
    '<g fill="#e6b454" stroke="#72583f" stroke-width="1.2">'+
    [[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]].map(function(v){
      var x=6.5*Math.sqrt(3)*(v[0]+v[1]/2), y=6.5*1.5*v[1];
      return '<path d="'+ehHexD(x,y,6.2)+'"/>';
    }).join('')+'</g></svg>';
}
function ehTile181(){
  var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="endless"]'))return;
  var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','endless');
  b.innerHTML=ehArt()+esc181(t181('Endless Honeycomb'))+'<small>'+esc181(t181('A tile that grows by the same rule, without end.'))+'</small>';
  b.onclick=function(){ehOpen181()};
  var hx=g.querySelector('[data-pat="honeycomb"]');
  if(hx&&hx.nextSibling) g.insertBefore(b,hx.nextSibling);
  else if(hx) hx.parentNode.appendChild(b);
  else g.appendChild(b);
}
function ehChime181(i){
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
    var c=typeof ac==='function'?ac():null;if(!c)return;
    var freqs=[261.63,293.66,329.63,392,440,523.25,392];
    var f=freqs[Math.max(0,Math.min(freqs.length-1,i))];
    var o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    var vol=(document.body&&document.body.classList.contains('bedtime'))?0.05:0.09;
    var t=c.currentTime;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+0.04);g.gain.exponentialRampToValueAtTime(0.0001,t+0.9);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+1);
  }catch(e){}
}
function ehCountLine(){
  var n=EH181.level;
  if(n<=0) return t181('Fill the six around the one.');
  if(n===1) return '7';
  if(n===2) return '7 × 7 = 49';
  if(n===3) return '7 × 7 × 7 = 343';
  return t181('Each tile is everything you built.');
}
function ehOpen181(){
  try{
    if(typeof PAT106==='object'){
      PAT106.unit='endless';
      if(PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
    }
  }catch(e){}
  try{if(typeof scStop101==='function')scStop101()}catch(e){}
  var host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  EH181.level=0;EH181.filled=[0,0,0,0,0,0];EH181.busy=false;EH181.zooms=EH181.zooms||0;
  ehDraw181();
}
function ehDraw181(){
  var el=$('patterns');if(!el)return;
  var ink=ehInk(EH181.pal||0), level=Math.min(EH181.level,3), i;
  var size=ehFitSize(level), cx=200, cy=200, parts=[];
  function drawCluster(ox,oy,lev,cls,fill){
    var cells=ehCells(lev),k,xy,d,ghost=cls.indexOf('ghost')>=0;
    for(k=0;k<cells.length;k++){
      xy=ehXY(cells[k][0],cells[k][1],size);
      d=ehHexD(cx+ox+xy[0],cy+oy+xy[1],size*0.96);
      parts.push('<path class="'+cls+'" d="'+d+'" fill="'+fill+'" fill-opacity="'+(ghost?'0':'0.92')+'" stroke="'+(ghost?ink.ghost:ink.stroke)+'" stroke-width="1.4" stroke-linejoin="round"/>');
    }
  }
  drawCluster(0,0,level,'eh181-on',ink.fill);
  var showGhosts=level<3;
  if(showGhosts){
    for(i=0;i<6;i++){
      var st=ehGroupOffset(level,i), xy=ehXY(st[0],st[1],size), on=!!EH181.filled[i];
      drawCluster(xy[0],xy[1],level,on?'eh181-on':'eh181-ghost', on?ink.fill:'transparent');
    }
  }
  var fact=level>=1?('<p class="soft">'+esc181(t181("It's not a perfect hexagon. Copies still fit with no gaps."))+'</p>'):'';
  var msg=ehCountLine();
  if(level===0&&EH181.filled.filter(Boolean).length===0) msg=t181('Fill the six around the one.');
  if(level===0&&EH181.filled.filter(Boolean).length===6) msg=t181('Seven make one bigger tile.');
  if(level>=3) msg='7 × 7 × 7 = 343. '+t181('Each tile is everything you built.');
  var glow=showGhosts&&EH181.filled.filter(Boolean).length===6;
  var inner='<p class="soft">'+esc181(t181('A tile that grows by the same rule, without end.'))+'</p>'+
    '<div class="eh181-stage" id="eh181stage"><svg viewBox="0 0 400 400" width="360" height="360" class="'+(glow?'eh181-glow':'')+'" role="img" aria-label="'+esc181(t181('Endless Honeycomb'))+'">'+parts.join('')+'</svg></div>'+
    '<p class="kline" id="eh181msg" aria-live="polite">'+esc181(msg)+'</p>'+fact+
    '<div class="g181-row">'+
    '<button type="button" data-g181reset="endless">'+esc181(t181('Start again'))+'</button>'+
    palButtons181(EH181.pal||0)+'</div>';
  el.innerHTML=(typeof patShell==='function'?patShell(esc181(t181('Endless Honeycomb')),inner):'<div class="card"><h2>'+esc181(t181('Endless Honeycomb'))+'</h2>'+inner+'</div>');
  if(showGhosts&&!EH181.busy){
    var hits=document.createElement('div');hits.style.cssText='position:absolute;inset:0';
    var stage=el.querySelector('#eh181stage');
    if(stage){
      stage.style.position='relative';
      for(i=0;i<6;i++){
        (function(idx){
          var st=ehGroupOffset(level,idx), xy=ehXY(st[0],st[1],size);
          var btn=document.createElement('button');
          btn.type='button';btn.setAttribute('aria-label',t181('Fill the six around the one.'));
          var px=xy[0]+cx, py=xy[1]+cy;
          var span=level===0?18:level===1?22:28;
          btn.style.cssText='position:absolute;left:'+(px/400*100)+'%;top:'+(py/400*100)+'%;width:'+span+'%;height:'+span+'%;transform:translate(-50%,-50%);background:transparent;border:0;padding:0;min-width:56px;min-height:56px;cursor:pointer';
          if(EH181.filled[idx]) btn.disabled=true;
          btn.onclick=function(){ehFill181(idx)};
          hits.appendChild(btn);
        })(i);
      }
      stage.appendChild(hits);
    }
  }
  var rst=el.querySelector('[data-g181reset="endless"]');
  if(rst) rst.onclick=function(){if(!EH181.busy) ehOpen181()};
  el.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){EH181.pal=+b.getAttribute('data-g181pal-i');ehDraw181()};
  });
  if(typeof turtlePlace105==='function') try{turtlePlace105('patterns')}catch(e){}
}
function ehFill181(idx){
  if(EH181.busy||EH181.level>=3||EH181.filled[idx])return;
  EH181.filled[idx]=1;
  ehChime181(EH181.filled.filter(Boolean).length-1);
  if(EH181.filled.filter(Boolean).length<6){ehDraw181();return}
  EH181.busy=true;
  ehDraw181();
  var stage=$('eh181stage'), svg=stage&&stage.querySelector('svg');
  var ang=19.1066, sc=Math.sqrt(7);
  function next(){
    EH181.level=Math.min(EH181.level+1, 3);
    EH181.filled=[0,0,0,0,0,0];
    EH181.busy=false;
    EH181.zooms=(EH181.zooms||0)+1;
    try{if(EH181.zooms===1&&typeof earn124==='function') earn124('hex')}catch(e){}
    ehChime181(6);
    ehDraw181();
  }
  if(!svg){next();return}
  if(reduced181()){
    svg.classList.add('eh181-fade');svg.style.opacity='0.2';
    setTimeout(function(){next()},800);
  }else{
    svg.classList.add('eh181-zoom');
    svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
    setTimeout(function(){next()},1400);
  }
}



/* ---- Pattern Loom (U1): Bloom dial 1/2/3/6, turns only, Pi's line after the first ring of six ---- */
var LOOM181={bloom:1,centers:[[0,0]],turn:0,revealed:false,holding:false,holdT:null,raf:0};
function loomDots181(n){
  var d='',i,a,x,y;
  for(i=0;i<n;i++){
    a=Math.PI/180*(-90+360*i/n);
    x=24+14*Math.cos(a); y=24+14*Math.sin(a);
    d+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="#E6B454" stroke="#72583f" stroke-width="1.6"/>';
  }
  return '<svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#fffdf8" stroke="#72583f" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="none" stroke="#d9c9a8" stroke-width="1.2" stroke-dasharray="2 3"/>'+d+'</svg>';
}
function loomArt181(){
  var r=9,cx=28,cy=28,g='',i,a;
  g+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#e6b454" stroke-width="1.8"/>';
  for(i=0;i<6;i++){
    a=Math.PI/180*(60*i-90);
    g+='<circle cx="'+(cx+r*Math.cos(a)).toFixed(1)+'" cy="'+(cy+r*Math.sin(a)).toFixed(1)+'" r="'+r+'" fill="none" stroke="#e6b454" stroke-width="1.3"/>';
  }
  return '<svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">'+g+'</svg>';
}
function loomTile181(){
  var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="loom"]'))return;
  var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','loom');
  b.innerHTML=loomArt181()+esc181(t181('Pattern Loom'))+'<small>'+esc181(t181('Tap, and circles bloom.'))+'</small>';
  b.onclick=function(){loomOpen181()};
  if(g.firstChild) g.insertBefore(b,g.firstChild);
  else g.appendChild(b);
}
function loomNear181(p,q,eps){return Math.hypot(p[0]-q[0],p[1]-q[1])<(eps||0.15)}
function loomHas181(p){
  var i;for(i=0;i<LOOM181.centers.length;i++) if(loomNear181(LOOM181.centers[i],p)) return true;
  return false;
}
function loomAddCenter181(p){
  if(loomHas181(p)) return false;
  if(LOOM181.centers.length>=37) return false;
  LOOM181.centers.push([p[0],p[1]]);
  return true;
}
function loomCrossings181(){
  var out=[], seen={}, i,j,a,b,d,mid,h,ux,uy,mx,my,pts,k,key,r=1;
  function add(p){
    if(Math.hypot(p[0],p[1])>5.2) return;
    key=p[0].toFixed(3)+','+p[1].toFixed(3);
    if(seen[key]||loomHas181(p)) return;
    seen[key]=1; out.push(p);
  }
  if(LOOM181.centers.length<=1){
    for(i=0;i<6;i++) add([Math.cos(Math.PI/180*60*i), Math.sin(Math.PI/180*60*i)]);
    return out;
  }
  for(i=0;i<LOOM181.centers.length;i++){
    for(j=i+1;j<LOOM181.centers.length;j++){
      a=LOOM181.centers[i]; b=LOOM181.centers[j];
      d=Math.hypot(b[0]-a[0],b[1]-a[1]);
      if(d<0.05||d>2+0.05) continue;
      mid=d/2; h=Math.sqrt(Math.max(0,r*r-mid*mid));
      ux=(b[0]-a[0])/d; uy=(b[1]-a[1])/d;
      mx=a[0]+ux*mid; my=a[1]+uy*mid;
      add([mx-uy*h, my+ux*h]); add([mx+uy*h, my-ux*h]);
    }
  }
  return out;
}
function loomRingCount181(){
  /* Count centres on the first ring from the live list (rule 7). */
  var n=0,i,p;
  for(i=0;i<LOOM181.centers.length;i++){
    p=LOOM181.centers[i];
    if(Math.abs(Math.hypot(p[0],p[1])-1)<0.12) n++;
  }
  return n;
}
function loomBloomAt181(p){
  var N=LOOM181.bloom||1, i, a, q, added=0;
  for(i=0;i<N;i++){
    a=Math.PI*2*i/N;
    q=[p[0]*Math.cos(a)-p[1]*Math.sin(a), p[0]*Math.sin(a)+p[1]*Math.cos(a)];
    if(loomAddCenter181(q)) added++;
  }
  return added;
}
function loomOpen181(){
  try{if(typeof PAT106==='object'){
    PAT106.unit='loom';
    if(PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
  }}catch(e){}
  try{if(typeof scStop101==='function')scStop101()}catch(e){}
  var host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  LOOM181.bloom=1;LOOM181.centers=[[0,0]];LOOM181.turn=0;LOOM181.revealed=false;LOOM181.faded=false;LOOM181.holding=false;
  if(LOOM181.raf){cancelAnimationFrame(LOOM181.raf);LOOM181.raf=0}
  loomDraw181();
}
function loomDraw181(){
  var el=$('patterns');if(!el)return;
  var R=52, cx=200, cy=200, turn=LOOM181.turn||0;
  var parts=[], i, q, crossings;
  function xy0(p){return [cx+R*p[0], cy+R*p[1]]}
  function xy(p){
    var c=Math.cos(turn),s=Math.sin(turn);
    return [cx+R*(p[0]*c-p[1]*s), cy+R*(p[0]*s+p[1]*c)];
  }
  for(i=0;i<LOOM181.centers.length;i++){
    q=xy0(LOOM181.centers[i]);
    parts.push('<circle class="loom181-c" cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+R+'" fill="none" stroke="'+(i===0?'#FFF6D8':'#FFE4A4')+'" stroke-width="'+(i===0?'3':'2.4')+'" filter="url(#loom181gl)"/>');
  }
  var deg=(turn*180/Math.PI).toFixed(3);
  var world='<g id="loom181world" transform="rotate('+deg+' '+cx+' '+cy+')">'+parts.join('')+'<g id="loom181hint"></g></g>';
  crossings=loomCrossings181();
  var ring=loomRingCount181();
  var showLine=ring>=6;
  var toast='';
  if(showLine){
    toast='<div class="loom181-toast'+(LOOM181.faded?' loom181-out':'')+'" id="loom181toast">'+esc181(t181('Every circle is the same size. Exactly six fit around one.'))+'</div>';
    if(!LOOM181.revealed){
      LOOM181.revealed=true;
      setTimeout(function(){
        LOOM181.faded=true;
        var t=$('loom181toast');
        if(t) t.classList.add('loom181-out');
      }, reduced181()?0:5500);
    }
  }
  var dial='<div class="loom181-dial" aria-label="'+esc181(t181('Bloom'))+'"><span class="soft">'+esc181(t181('Bloom'))+'</span>';
  [1,2,3,6].forEach(function(n){
    dial+='<button type="button" data-loom181-bloom="'+n+'" class="'+(LOOM181.bloom===n?'on':'')+'" aria-label="'+esc181(t181('Bloom')+' '+n)+'">'+loomDots181(n)+'<span>'+n+'</span></button>';
  });
  dial+='</div>';
  var reset=LOOM181.centers.length>1?'<div class="g181-row"><button type="button" data-g181reset="loom">'+esc181(t181('Start again'))+'</button></div>':'';
  var inner='<div class="loom181-stage" id="loom181stage">'+
    '<svg viewBox="0 0 400 400" width="360" height="360" role="img" aria-label="'+esc181(t181('Pattern Loom'))+'">'+
    '<defs><filter id="loom181gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
    world+'</svg>'+toast+'</div>'+dial+reset;
  el.innerHTML=(typeof patShell==='function'?patShell(esc181(t181('Pattern Loom')),inner):'<div class="card"><h2>'+esc181(t181('Pattern Loom'))+'</h2>'+inner+'</div>');
  var stage=$('loom181stage'), svg=stage&&stage.querySelector('svg');
  if(svg){
    function localPt(ev){
      var r=svg.getBoundingClientRect(), px=((ev.clientX-r.left)/r.width)*400, py=((ev.clientY-r.top)/r.height)*400;
      var ux=(px-cx)/R, uy=(py-cy)/R;
      var c=Math.cos(-turn), si=Math.sin(-turn);
      return [ux*c-uy*si, ux*si+uy*c];
    }
    function nearest(pt){
      var best=null,bd=0.45,i,cr=loomCrossings181(),dd;
      for(i=0;i<cr.length;i++){dd=Math.hypot(cr[i][0]-pt[0],cr[i][1]-pt[1]); if(dd<bd){bd=dd;best=cr[i]}}
      return best;
    }
    function showHint(pt){
      var h=svg.querySelector('#loom181hint'); if(!h)return;
      var snap=nearest(pt); if(!snap){h.innerHTML='';return}
      var qq=xy0(snap);
      h.innerHTML='<circle cx="'+qq[0].toFixed(1)+'" cy="'+qq[1].toFixed(1)+'" r="'+R+'" fill="#FFF6D8" fill-opacity=".12" stroke="#FFF6D8" stroke-width="2"/>';
    }
    var down=null;
    svg.addEventListener('pointerdown',function(ev){
      ev.preventDefault();
      down={t:Date.now(),x:ev.clientX,y:ev.clientY,pt:localPt(ev)};
      LOOM181.holding=false;
      if(LOOM181.holdT) clearTimeout(LOOM181.holdT);
      if(!reduced181()){
        LOOM181.holdT=setTimeout(function(){
          if(!down)return;
          LOOM181.holding=true;
          var last=performance.now();
          (function spin(now){
            if(!LOOM181.holding)return;
            LOOM181.turn+=(now-last)/1000*(Math.PI/15);
            last=now;
            var g=document.getElementById('loom181world');
            if(g) g.setAttribute('transform','rotate('+((LOOM181.turn*180/Math.PI).toFixed(3))+' 200 200)');
            LOOM181.raf=requestAnimationFrame(spin);
          })(last);
        },280);
      }
    });
    svg.addEventListener('pointermove',function(ev){
      var pt=localPt(ev); showHint(pt);
      if(down&&Math.hypot(ev.clientX-down.x,ev.clientY-down.y)>10){ /* dragging starts a turn if held */ }
    });
    function endPtr(ev){
      if(LOOM181.holdT){clearTimeout(LOOM181.holdT);LOOM181.holdT=null}
      var wasHold=LOOM181.holding;
      LOOM181.holding=false;
      if(!down)return;
      var dt=Date.now()-down.t;
      if(!wasHold&&dt<500){
        var snap=nearest(localPt(ev)||down.pt);
        if(snap&&loomBloomAt181(snap)) loomDraw181();
      }
      down=null;
    }
    svg.addEventListener('pointerup',endPtr);
    svg.addEventListener('pointerleave',function(){ if(LOOM181.holdT){clearTimeout(LOOM181.holdT);LOOM181.holdT=null} LOOM181.holding=false; down=null; });
    svg.addEventListener('pointercancel',endPtr);
  }
  el.querySelectorAll('[data-loom181-bloom]').forEach(function(b){
    b.onclick=function(){LOOM181.bloom=+b.getAttribute('data-loom181-bloom');loomDraw181()};
  });
  var rst=el.querySelector('[data-g181reset="loom"]');
  if(rst) rst.onclick=function(){loomOpen181()};
  if(typeof turtlePlace105==='function') try{turtlePlace105('patterns')}catch(e){}
}

/* ---- Sound Draws: settle sand onto the nodal lines, then keep it there ---- */
function soundPaint181(){
  var cv=$('patChCv');if(!cv||!PAT106||!PAT106.ch||!PAT106.ch.parts)return;
  var st=PAT106.ch,x=cv.getContext('2d'),W=cv.width,H=cv.height;
  var night=typeof patNight==='function'&&patNight();
  x.fillStyle=night?'#0d0f1a':'#e8c894';x.fillRect(0,0,W,H);
  x.save();
  if(st.plate!=='square'){x.beginPath();x.arc(W/2,H/2,Math.min(W,H)/2-2,0,Math.PI*2);x.clip()}
  if(st.pal181){try{x.filter='hue-rotate('+(st.pal181*28)+'deg) saturate(1.15)'}catch(e){}}
  x.fillStyle=night?'#d8c8a4':'#5a4632';
  st.parts.forEach(function(p){x.beginPath();x.arc(p.x*W,p.y*H,1.8,0,Math.PI*2);x.fill()});
  x.restore();
}
function soundStep181(stepK){
  var st=PAT106.ch,n=st.n,m=st.m;
  if(!st.parts||typeof patChladni106!=='function')return;
  st.parts.forEach(function(p){
    var v=patChladni106(p.x,p.y,n,m),a=Math.abs(v);
    if(a>0.04){
      var gx=-((Math.abs(patChladni106(p.x+0.01,p.y,n,m))-a)/0.01);
      var gy=-((Math.abs(patChladni106(p.x,p.y+0.01,n,m))-a)/0.01);
      var len=Math.hypot(gx,gy)||1;
      p.x=Math.max(0.02,Math.min(0.98,p.x+0.02*stepK*gx/len));
      p.y=Math.max(0.02,Math.min(0.98,p.y+0.02*stepK*gy/len));
    }
  });
}
function soundSettleNow181(){
  var cv=$('patChCv');if(!cv||!PAT106||!PAT106.ch)return;
  var st=PAT106.ch;
  if(st.raf){cancelAnimationFrame(st.raf);st.raf=0}
  if(!st.parts||!st.parts.length){
    var N=reduced181()?160:480;
    st.parts=Array.from({length:N},function(){return {x:Math.random(),y:Math.random()}});
  }
  var i,steps=reduced181()?80:180;
  for(i=0;i<steps;i++) soundStep181(1);
  soundPaint181();
  st.settled181=true;
}
function patSoundRun181(){
  var cv=$('patChCv');if(!cv||!PAT106||!PAT106.ch)return;
  var st=PAT106.ch,n=st.n,m=st.m;
  if(st.n==null){st.n=1;st.m=2;n=1;m=2}
  var N=reduced181()?160:480;
  st.parts=Array.from({length:N},function(){return {x:Math.random(),y:Math.random()}});
  st.settled181=false;
  try{if(typeof patSoundTone106==='function') patSoundTone106(n,m)}catch(e){}
  if(st.raf){cancelAnimationFrame(st.raf);st.raf=0}
  if(reduced181()){soundSettleNow181();return}
  var start=performance.now(),dur=2200;
  var tick=function(t){
    var k=Math.min(1,(t-start)/dur);
    soundStep181(0.5+0.7*k);
    soundPaint181();
    if(k<1) st.raf=requestAnimationFrame(tick);
    else soundSettleNow181();
  };
  st.raf=requestAnimationFrame(tick);
}

/* ---- Honeycomb Builder upgrade: Reset + colors, keep U6 tone, stay calm ---- */
function enhanceHex181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='honeycomb')return}catch(e){return}
  /* hide gallery, consistent with Grow */
  var gal=$('patGal106');
  if(gal){
    el.querySelectorAll('h3').forEach(function(x){if(/gallery|galería/i.test(x.textContent||'')&&x.parentNode)x.parentNode.removeChild(x)});
    var prev=gal.previousElementSibling;if(prev&&/Up to|Hasta/i.test(prev.textContent||'')&&prev.parentNode)prev.parentNode.removeChild(prev);
    gal.parentNode.removeChild(gal);
  }
  if(!el.querySelector('[data-g181reset="honeycomb"]')){
    var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181hex','1');
    bar.innerHTML='<button type="button" data-g181reset="honeycomb">'+esc181(t181('Reset'))+'</button>'+palButtons181((root.HEX124&&HEX124.pal181)||0);
    var row=el.querySelector('.pat-row');
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-g181reset="honeycomb"]').onclick=function(){
      try{
        if(typeof HEX124==='object'){HEX124.filled=new Set(['0,0']);HEX124.last=null}
        if(typeof hexDraw124==='function') hexDraw124();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        try{if(typeof HEX124==='object') HEX124.pal181=i}catch(e){}
        var pal=PAL[i]||PAL[0];
        el.querySelectorAll('.toy124-hex-on').forEach(function(n){n.setAttribute('fill',pal.c[0])});
        bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
      };
    });
  }
  /* re-apply stored colour after each redraw */
  try{
    var i=(typeof HEX124==='object'&&HEX124.pal181)||0, pal=PAL[i]||PAL[0];
    el.querySelectorAll('.toy124-hex-on').forEach(function(n){n.setAttribute('fill',pal.c[0])});
  }catch(e){}
}

/* ---- Grow: recipe/gallery off, jar below, Reset + colors, Float at cap ---- */
function extendPals181(){
  try{
    if(typeof PAT_PAL106!=='undefined'&&PAT_PAL106&&PAT_PAL106.length<PAL.length){
      PAL.forEach(function(p,i){if(!PAT_PAL106[i]) PAT_PAL106[i]=p.c});
    }
  }catch(e){}
}
function palName181(i){var p=PAL[i]||PAL[0];return t181(p.en)}
function palButtons181(cur,attr){
  return '<div class="g181-pal" data-g181pal="1">'+PAL.map(function(p,i){
    return '<button type="button" class="'+(cur===i?'on':'')+'" data-g181pal-i="'+i+'" aria-label="'+esc181(palName181(i))+'" style="background:linear-gradient(135deg,'+p.c.join(',')+')"><span>'+esc181(palName181(i))+'</span></button>';
  }).join('')+'</div>';
}
function tidyGrow181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='grow')return}catch(e){return}
  extendPals181();
  /* recipe card + print/load */
  el.querySelectorAll('.g9l, #gaf149print, [data-gafcode149], [data-gafload150], [data-gafloadgo], [data-gaf149print]').forEach(function(n){
    if(n&&n.parentNode)n.parentNode.removeChild(n);
  });
  el.querySelectorAll('button, a').forEach(function(b){
    var t=(b.textContent||'').replace(/\s+/g,' ').trim();
    if(/^(Print recipe card|Load recipe|Imprimir tarjeta|Cargar receta)/i.test(t)){
      if(b.parentNode)b.parentNode.removeChild(b);
    }
  });
  /* gallery */
  var gal=$('patGal106');
  if(gal){
    var p=gal.previousElementSibling,h=p&&p.previousElementSibling;
    if(p&&/Up to|Hasta|gallery|galería/i.test(p.textContent||'')) p.parentNode.removeChild(p);
    if(h&&/gallery|galería/i.test(h.textContent||'')) h.parentNode.removeChild(h);
    /* also a nearby h3 */
    el.querySelectorAll('h3').forEach(function(x){
      if(/gallery|galería/i.test(x.textContent||'')&&x.parentNode)x.parentNode.removeChild(x);
    });
    gal.parentNode.removeChild(gal);
  }
  /* Reset + colors row */
  if(!el.querySelector('[data-g181reset="grow"]')){
    var growBtn=el.querySelector('button[onclick*="patGrowStep106"]');
    var row=growBtn&&growBtn.parentNode;
    var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181ctrl','1');
    bar.innerHTML='<button type="button" data-g181reset="grow">'+esc181(t181('Reset'))+'</button>'+palButtons181((PAT106.grow&&PAT106.grow.pal)||0);
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-g181reset="grow"]').onclick=function(){
      try{
        var g=PAT106.grow;if(!g)return;
        if((g.depth||0)===0&&!(g.q&&g.q.length)) return;
        g.depth=0;g.q=[];g.msg='';g._rest=0;
        if(typeof patGrowDraw106==='function') patGrowDraw106();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        try{
          if(typeof patGrowSet106==='function') patGrowSet106('pal',i);
          else{PAT106.grow.pal=i;if(typeof patGrowDraw106==='function')patGrowDraw106()}
        }catch(e){}
      };
    });
  }
  /* Move How many jar below all controls */
  var jar=el.querySelector('[data-gaf3jar]');
  if(jar){
    var last=el.querySelector('[data-g181ctrl], [data-gaf3ctrl], button[onclick*="patGrowKeep106"]');
    var host=last&&last.parentNode;
    jar.classList.add('g181-under');
    if(host){
      var anchor=el.querySelector('[data-g181ctrl]')||el.querySelector('[data-gaf3ctrl]')||last;
      if(anchor&&anchor.parentNode&&jar!==anchor.nextSibling){
        anchor.parentNode.insertBefore(jar,anchor.nextSibling);
      }
    }
  }
  ensureFloat181();
}
function ensureFloat181(){
  try{
    if(typeof PAT106!=='object'||PAT106.unit!=='grow')return;
    var g=PAT106.grow,el=$('patterns');if(!g||!el)return;
    var cap=6;
    try{if(typeof IL149==='object'&&IL149&&PAT106.grow.shape){/* cap stays per-shape in v149 */}}catch(e){}
    var atCap=!!(g._rest||g.msg&&/as far as this seed grows|hasta aquí llega/i.test(g.msg||''));
    if(!atCap&&(g.depth||0)>=6) atCap=true;
    if(!atCap)return;
    if(el.querySelector('[data-gaf3float]'))return;
    if(typeof extraUI==='function') try{extraUI()}catch(e){}
  }catch(e){}
}

/* ---- Zoom hunts (C5) + layout + wording + Reset/colors ---- */
function kidHint181(m,ex){
  if(m==='baby') return t181('A tiny copy of this shape is hiding. Tap the gold dot on it.');
  if(m==='antenna') return t181('Tap a gold dot. Then count the little arms on that bump.');
  if(ex&&ex.msg){
    var msg=ex.msg;
    if(/little Mandelbrot|pequeño Mandelbrot/i.test(msg)) return t181('You found a tiny copy.');
    if(/period 3|3 arms|3 brac/i.test(msg)) return t181('This bump has 3 arms.');
    if(/period 4|4 arms|4 brac/i.test(msg)) return t181('This bump has 4 arms.');
    if(/period 5|5 arms|5 brac/i.test(msg)) return t181('This bump has 5 arms.');
  }
  return null;
}
var _zoomForce181=false;
function forceHuntHome181(){
  try{
    if(!PAT106||!PAT106.ex)return false;
    var ex=PAT106.ex,m=ex.mode163;
    if(m!=='baby'&&m!=='antenna')return false;
    var home=typeof patExKindHome106==='function'?patExKindHome106('mandel'):{kind:'mandel',cx:-0.5,cy:0,span:3.5};
    if(ex.kind==='mandel'&&Math.abs((ex.cx||0)-home.cx)<0.05&&Math.abs((ex.cy||0)-home.cy)<0.05&&Math.abs((ex.span||0)-home.span)<0.05)return false;
    Object.assign(ex,home,{limit:false,msg:''});
    return true;
  }catch(e){return false}
}
function layoutZoom181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='zoom')return}catch(e){return}
  if(!_zoomForce181&&forceHuntHome181()){
    _zoomForce181=true;
    try{if(typeof patExDraw106==='function') patExDraw106()}finally{_zoomForce181=false}
    return;
  }
  var cv=$('patExCv');if(!cv)return;
  var card=cv.closest('.card')||el;
  var stage=card.querySelector('.zoom-stage181');
  if(!stage){
    stage=document.createElement('div');stage.className='zoom-stage181';
    cv.parentNode.insertBefore(stage,cv);stage.appendChild(cv);
  }
  var h2=card.querySelector('h2');
  var intro=h2&&h2.nextElementSibling;
  var after=intro||h2;
  if(after&&stage.parentNode===after.parentNode&&after.nextSibling!==stage){
    after.parentNode.insertBefore(stage,after.nextSibling);
  }
  var tools=card.querySelector('[data-tools163]');
  var panel=card.querySelector('[data-extra163], #patHint163')&&(card.querySelector('[data-tools163]')&&card.querySelector('[data-tools163]').nextElementSibling);
  /* kind row is the first .pat-row with patExSetKind106 */
  var kindRow=null;
  card.querySelectorAll('.pat-row').forEach(function(r){
    if(!kindRow&&r.querySelector('[onclick*="patExSetKind106"], [data-kind181]')) kindRow=r;
  });
  if(kindRow){
    kindRow.querySelectorAll('button[onclick*="patExSetKind106"]').forEach(function(b){
      var m=/patExSetKind106\('([^']+)'\)/.exec(b.getAttribute('onclick')||'');
      if(m) b.setAttribute('data-kind181',m[1]);
    });
    if(tools&&tools.parentNode) tools.parentNode.insertBefore(kindRow,tools);
    if(stage.nextSibling!==(tools||kindRow)){
      stage.parentNode.insertBefore(kindRow,stage.nextSibling);
      if(tools) kindRow.parentNode.insertBefore(tools,kindRow.nextSibling);
    }
  }else if(tools&&stage.nextSibling!==tools){
    stage.parentNode.insertBefore(tools,stage.nextSibling);
  }
  var scale=$('patExScale');if(scale&&stage.contains(cv)&&scale.parentNode!==stage){stage.appendChild(scale)}
  /* hide zoom gallery */
  var gal=$('patGal106');
  if(gal){
    el.querySelectorAll('h3').forEach(function(x){if(/gallery|galería/i.test(x.textContent||'')&&x.parentNode)x.parentNode.removeChild(x)});
    var prev=gal.previousElementSibling;if(prev&&/Up to|Hasta/i.test(prev.textContent||'')&&prev.parentNode)prev.parentNode.removeChild(prev);
    gal.parentNode.removeChild(gal);
  }
  var ex=PAT106.ex||{},m=ex.mode163||'';
  el.classList.toggle('zoom-hunt181',m==='baby'||m==='antenna');
  var hint=$('patHint163');
  var line=kidHint181(m,ex);
  if(!hint&&line){
    hint=document.createElement('p');hint.className='soft';hint.id='patHint163';
    var tools=card.querySelector('[data-tools163]');
    if(tools&&tools.parentNode) tools.parentNode.insertBefore(hint,tools.nextSibling);
    else card.appendChild(hint);
  }
  if(hint&&line) hint.textContent=line;
  if(ex.msg){
    var msg=$('patExMsg');
    var k=kidHint181('',ex);
    if(k&&msg) msg.textContent=k;
    if(k&&hint&&(m==='baby'||m==='antenna')) hint.textContent=k;
  }
  /* Reset + colors */
  if(!el.querySelector('[data-g181reset="zoom"]')){
    var bar=document.createElement('div');bar.className='g181-row';
    bar.innerHTML='<button type="button" data-g181reset="zoom">'+esc181(t181('Reset'))+'</button>'+palButtons181(ex.pal181||0);
    var back=el.querySelector('button[onclick*="patExBack106"]');
    var row=back&&back.parentNode;
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-g181reset="zoom"]').onclick=function(){
      try{
        var home=typeof patExKindHome106==='function'?patExKindHome106('mandel'):{kind:'mandel',cx:-0.5,cy:0,span:3.5};
        Object.assign(PAT106.ex,home,{limit:false,msg:'',mode163:''});
        if(typeof patExDraw106==='function') patExDraw106();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        PAT106.ex.pal181=i;
        try{
          if(typeof patExDraw106==='function') patExDraw106();
          var c=document.getElementById('patExCv');
          if(c) c.style.filter=i?('hue-rotate('+(i*36)+'deg) saturate(1.05)'):'';
        }catch(e){}
      };
    });
  }else{
    var c=document.getElementById('patExCv');
    if(c&&ex.pal181) c.style.filter='hue-rotate('+(ex.pal181*36)+'deg) saturate(1.05)';
  }
  try{if(cv&&(m==='baby'||m==='antenna')) cv.scrollIntoView({block:'nearest',behavior:reduced181()?'auto':'smooth'})}catch(e){}
}
function wrapZoom181(){
  /* setMode163 lives inside the v163 IIFE (exported as IL163.setMode), not as a global.
     Publish a global wrapper so hunts can be entered from tests and always land on Mandelbrot home. */
  var rawSet=(root.IL163&&typeof IL163.setMode==='function')?IL163.setMode:(typeof root.setMode163==='function'&&!root.setMode163._v181?root.setMode163:null);
  if(!root.setMode163||!root.setMode163._v181){
    var wrapped=function(m){
      if(m==='baby'||m==='antenna'){
        try{
          if(PAT106&&PAT106.ex){
            var home=typeof patExKindHome106==='function'?patExKindHome106('mandel'):{kind:'mandel',cx:-0.5,cy:0,span:3.5};
            Object.assign(PAT106.ex,home,{limit:false,msg:'',mode163:m});
          }
        }catch(e){}
      }
      var r=rawSet?rawSet.apply(this,arguments):undefined;
      if(m==='baby'||m==='antenna'){
        forceHuntHome181();
        try{if(typeof patExDraw106==='function') patExDraw106()}catch(e2){}
      }
      try{layoutZoom181()}catch(e3){}
      return r;
    };
    wrapped._v181=1;
    root.setMode163=wrapped;
    try{if(root.IL163) IL163.setMode=wrapped}catch(e){}
  }
  if(typeof patExDraw106==='function'&&!patExDraw106._v181){
    hook('patExDraw106',function(prev){
      return function(){
        var r=prev.apply(this,arguments);
        try{layoutZoom181()}catch(e){}
        return r;
      };
    });
  }
  if(typeof patExSetKind106==='function'&&!patExSetKind106._v181){
    hook('patExSetKind106',function(prev){
      return function(kind){
        try{
          var m=PAT106&&PAT106.ex&&PAT106.ex.mode163;
          if((m==='baby'||m==='antenna')&&kind!=='mandel') return;
        }catch(e){}
        return prev.apply(this,arguments);
      };
    });
  }
}

/* ---- Same Shape upgrade: scale + find-it ---- */
function sameQuiz181(fam){
  var keys=Object.keys(typeof PAT_PAIRS106==='object'?PAT_PAIRS106:{});
  var f=PAT_PAIRS106[fam];if(!f)return '';
  var items=f.items.slice();
  var prompt=items[0];
  var right=items[Math.min(1,items.length-1)];
  var others=[];
  keys.forEach(function(k){if(k!==fam){var it=PAT_PAIRS106[k].items[0];if(it) others.push({fam:k,it:it})}});
  others.sort(function(){return Math.random()-0.5});
  var choices=[{ok:1,it:right,fam:fam}].concat(others.slice(0,2).map(function(o){return {ok:0,it:o.it,fam:o.fam}}));
  choices.sort(function(){return Math.random()-0.5});
  function cap(it){try{return (typeof patPairLang106==='function'?patPairLang106(it):it).t}catch(e){return it.en&&it.en.t||it.id}}
  function art(id){return typeof patPairArt106==='function'?patPairArt106(id):''}
  return '<div class="same181" data-same181="1" data-fam="'+esc181(fam)+'">'+
    '<p class="soft">'+esc181(t181('Which of these is the same shape as this one?'))+'</p>'+
    '<div class="frac181-pic" data-same-prompt="1">'+art(prompt.id)+'<p class="kline"><b>'+esc181(cap(prompt))+'</b></p></div>'+
    '<div class="same181-quiz">'+choices.map(function(c,i){
      return '<button type="button" class="hubtile" data-same181-ok="'+c.ok+'" data-i="'+i+'">'+art(c.it.id)+'<small>'+esc181(cap(c.it))+'</small></button>';
    }).join('')+'</div><p class="soft" data-same181-msg aria-live="polite"></p></div>';
}
function enhanceSame181(fam){
  var el=$('patterns');if(!el||!fam)return;
  if(el.querySelector('[data-same181]'))return;
  var box=document.createElement('div');
  box.innerHTML='<div class="same181-scale g181-row">'+
    '<button type="button" data-same181-sz="-1">'+esc181(t181('Make it smaller'))+'</button>'+
    '<button type="button" data-same181-sz="1">'+esc181(t181('Make it bigger'))+'</button>'+
    '<button type="button" data-g181reset="same">'+esc181(t181('Reset'))+'</button></div>'+
    '<p class="soft">'+esc181(t181('Same shape, different size.'))+'</p>'+
    palButtons181(0)+sameQuiz181(fam);
  var zoom=el.querySelector('.pat-zoombox');
  if(zoom&&zoom.parentNode) zoom.parentNode.insertBefore(box,zoom.nextSibling);
  else el.appendChild(box);
  var scale=1;
  function applySz(){
    el.querySelectorAll('.pat-art svg, .pat-art .lamp-art63, [data-same-prompt] svg').forEach(function(svg){
      svg.style.transform='scale('+scale+')';
      svg.style.transformOrigin='center';
    });
  }
  box.querySelectorAll('[data-same181-sz]').forEach(function(b){
    b.onclick=function(){scale=Math.max(0.6,Math.min(1.8,scale+(+b.getAttribute('data-same181-sz'))*0.2));applySz()};
  });
  var rst=box.querySelector('[data-g181reset="same"]');
  if(rst) rst.onclick=function(){scale=1;applySz();if(typeof patSameDraw106==='function') patSameDraw106(fam)};
  box.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){
      var i=+b.getAttribute('data-g181pal-i');
      var p=PAL[i];if(!p)return;
      box.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
      el.querySelectorAll('.pat-art, [data-same181]').forEach(function(n){n.style.filter='hue-rotate('+(i*36)+'deg)'});
    };
  });
  box.querySelectorAll('[data-same181-ok]').forEach(function(b){
    b.onclick=function(){
      var ok=b.getAttribute('data-same181-ok')==='1';
      var msg=box.querySelector('[data-same181-msg]');
      if(msg) msg.textContent=ok?t181('Yes — same shape.'):t181('Not that one. Try another.');
      if(ok){b.classList.add('on');box.querySelectorAll('[data-same181-ok="0"]').forEach(function(x){x.disabled=true})}
    };
  });
}

/* ---- Half and Quarter upgrade ---- */
function enhanceFrac181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='frac')return}catch(e){return}
  if(el.querySelector('[data-g181frac]')) return;
  var f=PAT106.frac||{};
  var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181frac','1');
  bar.innerHTML='<button type="button" data-frac181="half">'+esc181(t181('Half'))+'</button>'+
    '<button type="button" data-frac181="quarter">'+esc181(t181('Quarter'))+'</button>'+
    '<button type="button" data-g181reset="frac">'+esc181(t181('Reset'))+'</button>'+
    palButtons181(f.pal181||0)+
    '<p class="soft" data-frac181-count aria-live="polite"></p>';
  var card=el.querySelector('.card')||el;
  card.appendChild(bar);
  function setCount(text){var n=bar.querySelector('[data-frac181-count]');if(n)n.textContent=text||''}
  function applyPal(i){
    f.pal181=i;
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',+x.getAttribute('data-g181pal-i')===i)});
    el.querySelectorAll('svg, canvas').forEach(function(n){n.style.filter=i?('hue-rotate('+(i*36)+'deg)'):''});
  }
  bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){b.onclick=function(){applyPal(+b.getAttribute('data-g181pal-i'))}});
  bar.querySelector('[data-g181reset="frac"]').onclick=function(){
    try{
      if(typeof patShareDraw106==='function'&&el.querySelector('[onclick*="patShareGive106"], .pat-share, [data-share]')){patShareNew106();return}
      if(typeof patJarDraw106==='function'&&(f.fill!=null||el.querySelector('[onclick*="patJarPour106"]'))){patJarNew106();return}
      if(typeof patFoldDraw106==='function'&&(f.folds!=null||el.querySelector('[onclick*="patFoldOnce106"]'))){patFoldNew106();return}
      if(typeof patFracHome106==='function') patFracHome106();
    }catch(e){}
  };
  bar.querySelector('[data-frac181="half"]').onclick=function(){
    try{
      if(el.querySelector('[onclick*="patShareGive106"]')|| (f.n!=null&&f.given)){PAT106.frac={n:2,given:[],ok:false,pal181:f.pal181};patShareDraw106();setCount(t181('2 of 2 pieces. Each one is a half.'));return}
      if(f.fill!=null||el.querySelector('[onclick*="patJarPour106"]')){PAT106.frac={fill:0.5,goal:'half',pal181:f.pal181};patJarDraw106();setCount(t181('The jar is half full.'));return}
      if(f.folds!=null||el.querySelector('[onclick*="patFoldOnce106"]')){PAT106.frac={folds:1,pal181:f.pal181};patFoldDraw106();setCount(t181('Folded in half.'));return}
    }catch(e){}
  };
  bar.querySelector('[data-frac181="quarter"]').onclick=function(){
    try{
      if(el.querySelector('[onclick*="patShareGive106"]')||(f.n!=null&&f.given)){PAT106.frac={n:4,given:[],ok:false,pal181:f.pal181};patShareDraw106();setCount(t181('4 of 4 pieces. Each one is a quarter.'));return}
      if(f.fill!=null||el.querySelector('[onclick*="patJarPour106"]')){PAT106.frac={fill:0.25,goal:'quarter',pal181:f.pal181};patJarDraw106();setCount(t181('The jar is a quarter full.'));return}
      if(f.folds!=null||el.querySelector('[onclick*="patFoldOnce106"]')){PAT106.frac={folds:2,pal181:f.pal181};patFoldDraw106();setCount(t181('Folded in quarters.'));return}
    }catch(e){}
  };
  /* initial count if already in a mode */
  if(f.n===2) setCount(t181('2 of 2 pieces. Each one is a half.'));
  else if(f.n===4) setCount(t181('4 of 4 pieces. Each one is a quarter.'));
  else if(f.fill===0.5) setCount(t181('The jar is half full.'));
  else if(f.fill===0.25||f.fill===0.26) setCount(t181('The jar is a quarter full.'));
  else if(f.folds===1) setCount(t181('Folded in half.'));
  else if(f.folds>=2) setCount(t181('Folded in quarters.'));
}

/* ---- See Your Sound: 56 px dials, slow replay, favorite ---- */
function enhanceSee181(){
  var el=$('patterns');if(!el||!$('sys177cv'))return;
  if(el.querySelector('[data-g181see]'))return;
  var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181see','1');
  bar.innerHTML='<button type="button" data-see181="slow">'+esc181(t181('Draw it slowly'))+'</button>'+
    '<button type="button" data-see181="fav">'+esc181(t181('Favorite pair'))+'</button>'+
    '<button type="button" data-see181="load">'+esc181(t181('Show my favorite'))+'</button>'+
    '<button type="button" data-g181reset="see">'+esc181(t181('Reset'))+'</button>'+
    palButtons181(0)+
    '<p class="soft" data-see181-msg aria-live="polite"></p>';
  var wrap=$('sys177wrap')||el;
  wrap.appendChild(bar);
  var msg=bar.querySelector('[data-see181-msg]');
  function favKey(){return 'lamp_sys177fav@'+pid181()}
  bar.querySelector('[data-see181="fav"]').onclick=function(){
    try{
      var S=root.IL177&&IL177.state;if(!S)return;
      localStorage.setItem(favKey(),JSON.stringify({a:S.a,b:S.b}));
      if(msg) msg.textContent=t181('Saved this pair.');
    }catch(e){}
  };
  bar.querySelector('[data-see181="load"]').onclick=function(){
    try{
      var v=JSON.parse(localStorage.getItem(favKey())||'null'),S=root.IL177&&IL177.state;
      if(!v||!S)return;
      S.a=v.a;S.b=v.b;
      if(typeof IL177.open==='function') IL177.open();
    }catch(e){}
  };
  bar.querySelector('[data-g181reset="see"]').onclick=function(){
    try{
      var S=root.IL177&&IL177.state;if(!S)return;
      S.a=2;S.b=3;
      if(typeof IL177.open==='function') IL177.open();
    }catch(e){}
  };
  bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){
      var i=+b.getAttribute('data-g181pal-i');
      var cv=$('sys177cv');if(cv) cv.style.filter=i?('hue-rotate('+(i*36)+'deg) saturate(1.1)'):'';
      bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
    };
  });
  bar.querySelector('[data-see181="slow"]').onclick=function(){
    try{
      var S=root.IL177&&IL177.state,cv=$('sys177cv');if(!S||!cv)return;
      if(S.raf){try{cancelAnimationFrame(S.raf)}catch(e){}S.raf=0}
      var p=(IL177.PAIRS&&IL177.PAIRS[S.a+','+S.b])||[S.a,S.b,1,220,220,0];
      var ra=p[0],rb=p[1],d=p[2]?Math.PI/2:0;
      var x=cv.getContext('2d'),w=cv.width,h=cv.height,cx=w/2,cy=h/2,sc=w*.36;
      var gold=getComputedStyle(cv).filter&&false;
      x.fillStyle='#120E18';x.fillRect(0,0,w,h);
      x.strokeStyle='rgba(230,180,84,0.9)';x.lineWidth=Math.max(2,w/300);x.lineJoin=x.lineCap='round';
      var n=0,total=720,steps=reduced181()?720:36;
      function step(){
        var upto=Math.min(total,n+Math.ceil(total/steps));
        x.beginPath();
        for(var i=0;i<=upto;i++){
          var tt=i/720,px=cx+sc*Math.sin(2*Math.PI*ra*tt),py=cy-sc*Math.sin(2*Math.PI*rb*tt+d);
          if(i)x.lineTo(px,py);else x.moveTo(px,py);
        }
        x.fillStyle='#120E18';x.fillRect(0,0,w,h);x.stroke();
        n=upto;
        if(n<total) setTimeout(step,reduced181()?0:28);
        else if(typeof IL177.open==='function'){ /* leave the finished slow drawing; live loop can resume on next dial */ }
      }
      step();
    }catch(e){}
  };
}

/* ---- Sound Draws Shapes upgrade (Ignacio: yes, per the spec; no hold flag) ---- */
/* Kid labels match the settled sand, counted as closed connected components
   (disk r=11, min 80 px, 8-connected, on the circular plate). (1,2) draws 3
   curves — a diagonal and two corner arcs — not 2 lines (LESSONS rule 7). */
var SOUND_MODES181=[
  [1,2,'3 curves'],[1,3,'a sun'],[2,3,'a zigzag'],[1,4,'branches'],[2,4,'a cross and a ring'],[3,4,'little dashes'],
  [2,5,'a loop'],[3,5,'a flower'],[1,5,'a star'],[1,6,'twigs'],[2,6,'a web'],[3,6,'loops'],
  [4,5,'a shower'],[4,6,'a star in the middle'],[2,7,'many marks'],[3,7,'a star and little stars']
];
var SOUND_RIDGES181={ /* expected piece counts after close r=11; (1,2) is exact */
  '1,2':[3,3],'1,3':[3,10],'2,3':[7,13],'1,4':[4,12],'2,4':[12,16],'3,4':[17,23],
  '2,5':[12,20],'3,5':[14,24],'1,5':[8,16],'1,6':[14,21],'2,6':[6,16],'3,6':[19,27],
  '4,5':[19,29],'4,6':[18,26],'2,7':[18,28],'3,7':[17,26]
};
function expandSoundModes181(){
  try{
    if(typeof PAT_MODES106==='undefined'||!PAT_MODES106)return;
    SOUND_MODES181.forEach(function(m){
      var has=PAT_MODES106.some(function(x){return x[0]===m[0]&&x[1]===m[1]});
      if(!has) PAT_MODES106.push([m[0],m[1]]);
    });
  }catch(e){}
}
function soundLabel181(n,m){
  var i,lab=n+' · '+m;
  for(i=0;i<SOUND_MODES181.length;i++) if(SOUND_MODES181[i][0]===n&&SOUND_MODES181[i][1]===m) lab=t181(SOUND_MODES181[i][2]);
  return lab;
}
function enhanceSound181(){
  var el=$('patterns');if(!el||!$('patChCv'))return;
  expandSoundModes181();
  var st=PAT106.ch||{};
  /* relabel mode buttons; if the original row is short, rebuild it */
  var row=el.querySelector('.pat-row');
  if(row){
    var have=row.querySelectorAll('button[onclick*="patSoundMode106"]').length;
    if(have<SOUND_MODES181.length){
      row.innerHTML=SOUND_MODES181.map(function(m){
        var on=(st.n===m[0]&&st.m===m[1])?'on':'';
        return '<button type="button" class="'+on+'" onclick="patSoundMode106('+m[0]+','+m[1]+')">'+esc181(t181(m[2]))+'</button>';
      }).join('');
    }else{
      row.querySelectorAll('button[onclick*="patSoundMode106"]').forEach(function(b){
        var m=/patSoundMode106\((\d+),(\d+)\)/.exec(b.getAttribute('onclick')||'');
        if(m) b.textContent=soundLabel181(+m[1],+m[2]);
      });
    }
  }
  var cv=$('patChCv');
  if(cv){
    if(!st.plate) st.plate='circle';
    cv.classList.toggle('plate-circle181', st.plate==='circle');
  }
  if(!el.querySelector('[data-g181sound]')){
    var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181sound','1');
    bar.innerHTML='<button type="button" data-sound181-plate="1">'+esc181(t181(st.plate==='square'?'Square plate':'Circle plate'))+'</button>'+
      '<button type="button" data-g181reset="sound">'+esc181(t181('Reset'))+'</button>'+palButtons181(st.pal181||0);
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-sound181-plate]').onclick=function(){
      st.plate=st.plate==='circle'?'square':'circle';
      if(cv) cv.classList.toggle('plate-circle181', st.plate==='circle');
      this.textContent=t181(st.plate==='square'?'Square plate':'Circle plate');
    };
    bar.querySelector('[data-g181reset="sound"]').onclick=function(){
      try{
        if(PAT106.ch){PAT106.ch.n=1;PAT106.ch.m=2;PAT106.ch.plate='circle';PAT106.ch.pal181=0}
        if(typeof patSoundDraw106==='function') patSoundDraw106();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        st.pal181=i;
        if(cv) cv.style.filter=i?('hue-rotate('+(i*28)+'deg) saturate(1.15)'):'';
        bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
      };
    });
  }
  if(cv&&st.pal181) cv.style.filter='hue-rotate('+(st.pal181*28)+'deg) saturate(1.15)';
  /* Soft sounds: stop a leftover tone if Soft sounds is off */
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73()&&PAT106.ch&&PAT106.ch.osc){try{PAT106.ch.osc.stop()}catch(e){}}
  }catch(e){}
}
function soundDrawsUpgrade181(){ enhanceSound181(); }

/* ---- Paint hide tools ---- */
var paintHidden181=false;
function paintHideKey(){return 'lamp_paint_hide@'+pid181()}
function loadPaintHide181(){
  try{var v=sessionStorage.getItem(paintHideKey());if(v==='1')paintHidden181=true;if(v==='0')paintHidden181=false}catch(e){}
}
function savePaintHide181(){
  try{sessionStorage.setItem(paintHideKey(),paintHidden181?'1':'0')}catch(e){}
}
function paintHideUI181(){
  var s=$('pstudio');if(!s)return;
  loadPaintHide181();
  if(!s.querySelector('.paint-hidebtn181')){
    var btn=document.createElement('button');
    btn.type='button';btn.className='paint-hidebtn181';
    btn.textContent=t181('Hide tools');
    var bar=s.querySelector('.pbar101')||s.querySelector('.pbar');
    if(bar) bar.appendChild(btn);else s.insertBefore(btn,s.firstChild);
    btn.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      if(s.hasAttribute('data-paint-ptr')) return;
      paintHidden181=true;savePaintHide181();applyPaintHide181();
    });
  }
  if(!s.querySelector('.paint-tab181')){
    var tab=document.createElement('button');
    tab.type='button';tab.className='paint-tab181';tab.textContent=t181('Tools');
    s.appendChild(tab);
    tab.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      paintHidden181=false;savePaintHide181();applyPaintHide181();
    });
  }
  if(!s.querySelector('.paint-leave181')){
    var leave=document.createElement('button');
    leave.type='button';leave.className='paint-leave181';
    leave.textContent=(typeof gT==='function'?gT('Leave'):'Leave');
    if(esLang()) leave.textContent=(typeof gT==='function'?gT('Leave'):'Salir');
    s.appendChild(leave);
    leave.addEventListener('click',function(){try{show('hub')}catch(e){}});
  }
  /* no accidental hide mid-stroke */
  if(!s._v181ptr){
    s._v181ptr=1;
    s.addEventListener('pointerdown',function(){s.setAttribute('data-paint-ptr','1')});
    s.addEventListener('pointerup',function(){s.removeAttribute('data-paint-ptr')});
    s.addEventListener('pointercancel',function(){s.removeAttribute('data-paint-ptr')});
  }
  applyPaintHide181();
}
function applyPaintHide181(){
  var s=$('pstudio');if(!s)return;
  s.classList.toggle('paint-hide181',!!paintHidden181);
  var btn=s.querySelector('.paint-hidebtn181');
  if(btn) btn.textContent=t181('Hide tools');
  var tab=s.querySelector('.paint-tab181');
  if(tab) tab.textContent=t181('Tools');
}

/* ---- shared install hooks ---- */
function wrapGrow181(){
  if(typeof patGrowDraw106==='function'&&!patGrowDraw106._v181){
    hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{tidyGrow181()}catch(e){}return r}});
  }
  if(typeof extraUI==='function'&&!extraUI._v181){
    hook('extraUI',function(prev){return function(){var r=prev.apply(this,arguments);try{tidyGrow181()}catch(e){}return r}});
  }
  if(typeof fixUI==='function'&&!fixUI._v181){
    hook('fixUI',function(prev){return function(){var r=prev.apply(this,arguments);try{tidyGrow181()}catch(e){}return r}});
  }
  if(typeof patGrowStep106==='function'&&!patGrowStep106._v181){
    hook('patGrowStep106',function(prev){return function(){var r=prev.apply(this,arguments);try{ensureFloat181();tidyGrow181()}catch(e){}return r}});
  }
  if(typeof patGrowKeep106==='function'&&!patGrowKeep106._v181){
    hook('patGrowKeep106',function(prev){
      return function(){
        try{
          var g=PAT106.grow;if(g) g.msg=t181('Holding this seed on this screen.');
          var msg=$('patGrowMsg');if(msg) msg.textContent=t181('Holding this seed on this screen.');
        }catch(e){}
        /* Do not write the 24-slot gallery. Zoom's Keep path (patExKeep106) stays for the seatbelt redraw test. */
      };
    });
  }
}
function wrapUnits181(){
  if(typeof patSameDraw106==='function'&&!patSameDraw106._v181){
    hook('patSameDraw106',function(prev){
      return function(fam){
        var r=prev.apply(this,arguments);
        try{if(fam) enhanceSame181(fam)}catch(e){}
        return r;
      };
    });
  }
  ['patFracHome106','patShareDraw106','patJarDraw106','patFoldDraw106'].forEach(function(n){
    if(typeof root[n]==='function'&&!root[n]._v181){
      hook(n,function(prev){return function(){var r=prev.apply(this,arguments);try{enhanceFrac181()}catch(e){}return r}});
    }
  });
  if(typeof patOpen106==='function'&&!patOpen106._v181){
    hook('patOpen106',function(prev){
      return function(u){
        if(u==='sunflower'||u==='look'||(u==='honeycomb'&&root.V181_REMOVE_HONEYCOMB)){
          return prev.call(this,null);
        }
        if(u==='endless'){ehOpen181();return}
        if(u==='loom'){loomOpen181();return}
        var r=prev.apply(this,arguments);
        try{
          if(!u) tidyPatterns181();
          if(u==='grow') tidyGrow181();
          if(u==='zoom') layoutZoom181();
          if(u==='seesound') enhanceSee181();
          if(u==='same'){/* home list: no quiz yet */}
          if(u==='frac') enhanceFrac181();
          if(u==='sound') enhanceSound181();
          if(u==='honeycomb') enhanceHex181();
        }catch(e){}
        return r;
      };
    });
  }
  if(typeof renderPatterns106==='function'&&!renderPatterns106._v181){
    hook('renderPatterns106',function(prev){
      return function(){var r=prev.apply(this,arguments);try{tidyPatterns181()}catch(e){}return r};
    });
  }
  if(typeof RENDER==='object'&&RENDER.patterns&&!RENDER.patterns._v181){
    var pr=RENDER.patterns;
    RENDER.patterns=function(){
      var r=pr.apply(this,arguments);
      try{
        if(typeof PAT106==='object'&&PAT106.unit){
          if(PAT106.unit==='grow') tidyGrow181();
          else if(PAT106.unit==='zoom') layoutZoom181();
          else if(PAT106.unit==='seesound') enhanceSee181();
          else if(PAT106.unit==='frac') enhanceFrac181();
          else if(PAT106.unit==='sound') enhanceSound181();
          else if(PAT106.unit==='honeycomb') enhanceHex181();
          else if(PAT106.unit==='endless') ehDraw181();
          else if(PAT106.unit==='loom') loomDraw181();
          else tidyPatterns181();
        }else tidyPatterns181();
      }catch(e){}
      return r;
    };
    RENDER.patterns._v181=1;
  }
  if(typeof renderPaint==='function'&&!renderPaint._v181){
    hook('renderPaint',function(prev){return function(){var r=prev.apply(this,arguments);try{paintHideUI181()}catch(e){}return r}});
  }
  if(typeof renderPaintBar==='function'&&!renderPaintBar._v181){
    hook('renderPaintBar',function(prev){return function(){var r=prev.apply(this,arguments);try{paintHideUI181()}catch(e){}return r}});
  }
  if(typeof hexDraw124==='function'&&!hexDraw124._v181){
    hook('hexDraw124',function(prev){return function(){var r=prev.apply(this,arguments);try{enhanceHex181()}catch(e){}return r}});
  }
  if(typeof patSoundRun106==='function'&&!patSoundRun106._v181){
    hook('patSoundRun106',function(prev){return function(){return patSoundRun181()}});
  }else if(typeof root.patSoundRun106==='undefined'){
    root.patSoundRun106=patSoundRun181;
  }
  if(typeof patSoundDraw106==='function'&&!patSoundDraw106._v181){
    hook('patSoundDraw106',function(prev){
      return function(){
        expandSoundModes181();
        var r=prev.apply(this,arguments);
        try{enhanceSound181()}catch(e){}
        return r;
      };
    });
  }
  if(typeof patSoundTone106==='function'&&!patSoundTone106._v181){
    hook('patSoundTone106',function(prev){
      return function(){
        try{if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return}catch(e){}
        return prev.apply(this,arguments);
      };
    });
  }
}

function install(){
  css();
  clearUpgrade181();
  fixSnail181();
  wrapShow181();
  wrapGrow181();
  wrapZoom181();
  wrapUnits181();
  bootReveal181();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL181={
  version:181,
  flags:{removeHoneycomb:!!root.V181_REMOVE_HONEYCOMB,soundDrawsUpgrade:!!root.V181_SOUND_DRAWS_UPGRADE},
  palettes:PAL,
  t:t181,
  reveal:reveal181,
  settleSound:soundSettleNow181,
  loomOpen:loomOpen181,
  loomBloomAt:loomBloomAt181,
  soundModes:SOUND_MODES181,
  soundRidges:SOUND_RIDGES181
};
root.LOOM181=LOOM181;
root.loomOpen181=loomOpen181;
root.loomDraw181=loomDraw181;
root.loomBloomAt181=loomBloomAt181;
root.loomRingCount181=loomRingCount181;
root.soundSettleNow181=soundSettleNow181;
root.ehOpen181=ehOpen181;
root.ehDraw181=ehDraw181;
root.EH181=EH181;
root.enhanceFrac181=enhanceFrac181;

})(typeof window!=='undefined'?window:this);
/* Lamplight v181 all-out deep work (preview only, do not push).
   Grow LOD + pan/pinch, Endless Honeycomb re-root past 343, deep Mandelbrot, Share a pie truths.
   Ignacio approved adding this to the v181 preview (Builder chat t415u, 20 Nov 2026). */
(function(root){
'use strict';

var SLICE_MS=6, LONG_MS=50, MIN_PX=1, EH_MIN_PX=6.8, FBITS=1024n, DEC_DIGITS=320, HILBERT_MAX=9;
var GROW_JOB=0, EX_JOB=0, MAX_SLICE=0, LAST_LONG=0, OBS=null;

var ES={
  'Pinch or drag to look closer. Grow adds more of the same rule.':'Pellizca o arrastra para mirar más de cerca. Crecer añade más de la misma regla.',
  'The twigs are as fine as this screen can show. Pinch to look closer, then you can Grow again.':'Las ramitas ya son tan finas como esta pantalla puede mostrar. Pellizca para mirar más de cerca, y luego puedes pulsar Crecer otra vez.',
  '{n} sevens multiplied together.':'{n} sietes multiplicados entre sí.',
  'Each tile you see holds everything you built before.':'Cada ficha que ves guarda todo lo que construiste antes.',
  'Each tile is everything you built.':'Cada ficha es todo lo que construiste.',
  'Fill the six around the one.':'Llena los seis alrededor del uno.',
  'Seven make one bigger tile.':'Siete forman una ficha más grande.',
  'The Mandelbrot set is made by repeating a simple rule. Its edge has wiggles inside wiggles. Reset brings you home.':'El conjunto de Mandelbrot se hace repitiendo una regla sencilla. Su borde tiene recovecos dentro de recovecos. Empezar de nuevo te lleva a casa.',
  'You have looked very, very close. The edge still has wiggles. Reset brings you home.':'Has mirado muy, muy de cerca. El borde todavía tiene recovecos. Empezar de nuevo te lleva a casa.',
  'You have looked very, very close. Reset brings you home.':'Has mirado muy, muy de cerca. Empezar de nuevo te lleva a casa.',
  'This is as far as this lamp can see.':'Hasta aquí puede ver esta lámpara.',
  'Deeper than one atom compared with the whole Earth.':'Más profundo que un átomo comparado con toda la Tierra.',
  'Halves of halves':'Mitades de mitades',
  'Each new piece is half of what is left. The pieces fill more and more of the pie, but a little sliver is always left.':'Cada pedazo nuevo es la mitad de lo que queda. Los pedazos llenan cada vez más del pastel, pero siempre queda un pedacito.',
  '{n} pieces so far: {sum}. The leftover sliver is {rest} of the pie.':'{n} pedazos hasta ahora: {sum}. El pedacito que queda es {rest} del pastel.',
  '1 piece so far: 1/2. The other half of the pie is still empty.':'1 pedazo hasta ahora: 1/2. La otra mitad del pastel sigue vacía.',
  'Add half of what is left':'Añadir la mitad de lo que queda',
  'This sliver is too thin to cut here. If you halve it in your mind, a smaller sliver is still left.':'Este pedacito es muy fino para cortarlo aquí. Si lo partes por la mitad en tu mente, todavía queda un pedacito más pequeño.',
  'The same amount':'La misma cantidad',
  'Both cuts make two halves. Fair means the same amount. The pieces do not have to be the same shape.':'Los dos cortes hacen dos mitades. Justo quiere decir la misma cantidad. Los pedazos no tienen que tener la misma forma.',
  'Cut straight':'Corte recto',
  'Corner to corner':'De esquina a esquina',
  'Each square has 2 pieces. A rectangle half and a triangle half are the same amount.':'Cada cuadrado tiene 2 pedazos. La mitad con forma de rectángulo y la mitad con forma de triángulo son la misma cantidad.',
  'The same share':'La misma parte',
  'Two quarters cover one half. They are the same amount.':'Dos cuartos cubren una mitad. Son la misma cantidad.',
  'Show 2/4 on 1/2':'Mostrar 2/4 sobre 1/2',
  '2/4 covers 1/2. They are the same amount.':'2/4 cubre 1/2. Son la misma cantidad.',
  'Fill the pie':'Llenar el pastel',
  'A hidden truth':'Una verdad escondida',
  'Too many to count on the screen. Each Grow makes more by the same rule.':'Son demasiados para contarlos en la pantalla. Cada vez que pulsas Crecer, salen más con la misma regla.',
  'Some are off the screen now. Reset to count them all.':'Ahora algunos están fuera de la pantalla. Pulsa Empezar de nuevo para contarlos todos.',
  'That is as far as this seed grows.':'Hasta aquí llega esta semilla.',
  'Reset':'Empezar de nuevo',
  'Back':'Atrás'
}

function esLang(){
  try{return (typeof LANG==='string'&&LANG==='es')||(typeof curLang==='function'&&curLang()==='es')}catch(e){return false}
}
function t(s,v){
  var out;
  if(esLang()&&ES[s]) out=ES[s];
  else if(typeof gT==='function'){try{out=gT(s,v)}catch(e){out=s}}
  else out=s;
  if(v&&typeof out==='string') out=out.replace(/\{(\w+)\}/g,function(_,k){return v[k]==null?'':String(v[k])});
  return out;
}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function reduced(){try{return (typeof reduced181==='function'&&reduced181())||(typeof lampReduced73==='function'&&lampReduced73())}catch(e){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(e){return false}}
function sfxOn(){try{return typeof lampSfxOn73!=='function'||!!lampSfxOn73()}catch(e){return true}}
function $(id){return typeof root.$==='function'?root.$(id):document.getElementById(id)}

function hookDeep(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v181deep) return prev;
  var next=wrap(prev);
  next._v181deep=1;
  next._base=prev;
  root[name]=next;
  return next;
}

function cssDeep(){
  if(document.getElementById('v181deepcss')) return;
  var s=document.createElement('style');
  s.id='v181deepcss';
  s.textContent=
    '#patGrowCv{touch-action:none;cursor:grab}'+
    '#patGrowCv.g181-drag{cursor:grabbing}'+
    '.g181-truth{display:flex;flex-wrap:wrap;gap:.5rem;margin:.6rem 0}'+
    '.g181-truth button{min-height:56px}'+
    '.frac-truth-art{display:block;margin:.4rem auto;max-width:100%;height:auto}'+
    '.frac-sq{display:flex;justify-content:space-around;align-items:flex-start;gap:1rem;flex-wrap:wrap}'+
    '.frac-sq figure{margin:0;text-align:center}'+
    '.frac-sq figcaption{font-size:.95rem;margin-top:.3rem}'+
    '.eh181-cellwarn{display:none}';
  document.head.appendChild(s);
}

function recordSlice(dt){
  if(dt>MAX_SLICE) MAX_SLICE=dt;
  if(dt>LONG_MS) LAST_LONG=dt;
}

function watchLongTasks(){
  if(OBS||typeof PerformanceObserver==='undefined') return;
  try{
    OBS=new PerformanceObserver(function(list){
      list.getEntries().forEach(function(e){
        if(e.duration>LAST_LONG) LAST_LONG=e.duration;
      });
    });
    try{OBS.observe({entryTypes:['longtask']})}catch(e){OBS.observe({type:'longtask',buffered:true})}
  }catch(e){OBS=null}
}

function softChime(level){
  if(!sfxOn()) return;
  try{
    var c=typeof ac==='function'?ac():null; if(!c) return;
    var quiet=night()||(document.body&&document.body.classList.contains('bedtime'));
    var vol=quiet?0.04:0.08;
    var freq=[261.63,293.66,329.63,349.23,392,440,493.88,523.25][Math.max(0,Math.min(level,7))];
    var t0=c.currentTime, o=c.createOscillator(), g=c.createGain();
    o.type='sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(0,t0);
    g.gain.linearRampToValueAtTime(vol,t0+0.04);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+0.7);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0+0.75);
  }catch(e){}
}

function pals(rec){
  var p=(typeof PAT_PAL106!=='undefined'&&PAT_PAL106[(rec&&rec.pal)||0])||null;
  if(p) return p;
  return night()?['#6f9a7a','#eac77d','#c45a3a']:['#4e6b5c','#E6B454','#C45A3A'];
}
function paper(){return night()?'#0d0f1a':'#fff8ec'}

function viewOf(g,W,H){
  g=g||{};
  var vs=g._vs!=null?g._vs:1;
  var vx=g._vx!=null?g._vx:W/2;
  var vy=g._vy!=null?g._vy:H/2;
  return {vx:vx,vy:vy,vs:vs,W:W,H:H};
}
function toS(V,x,y){return {x:(x-V.vx)*V.vs+V.W/2, y:(y-V.vy)*V.vs+V.H/2}}
function toW(V,x,y){return {x:(x-V.W/2)/V.vs+V.vx, y:(y-V.H/2)/V.vs+V.vy}}
function inView(V,x,y,pad){
  pad=pad==null?8:pad;
  var p=toS(V,x,y);
  return p.x>=-pad&&p.x<=V.W+pad&&p.y>=-pad&&p.y<=V.H+pad;
}
function segInView(V,ax,ay,bx,by,pad){
  pad=pad==null?12:pad;
  var a=toS(V,ax,ay),b=toS(V,bx,by);
  var minx=Math.min(a.x,b.x),maxx=Math.max(a.x,b.x),miny=Math.min(a.y,b.y),maxy=Math.max(a.y,b.y);
  return maxx>=-pad&&minx<=V.W+pad&&maxy>=-pad&&miny<=V.H+pad;
}

function cellPx(g,W,H){
  W=W||360; H=H||360;
  var V=viewOf(g,W,H), d=Math.max(0,g.depth||0), sh=g.shape||'tree', sc=V.vs;
  if(sh==='tree') return (H*0.22)*Math.pow(0.68,d)*sc;
  if(sh==='antler') return (H*0.22)*Math.pow(0.72,d)*sc;
  if(sh==='dragon'||sh==='levy') return (W*0.56)*Math.pow(1/Math.SQRT2,d)*sc;
  if(sh==='triangle') return (H*0.8)*Math.pow(0.5,d)*sc;
  if(sh==='koch') return (W*0.8)*Math.pow(1/3,d)*sc;
  if(sh==='htree') return (Math.min(W,H)*0.16)*Math.pow(0.7,d)*sc;
  if(sh==='pythagoras'){
    var th=((g.angle||28)*Math.PI/180), shk=Math.max(Math.abs(Math.cos(th)),Math.abs(Math.sin(th)))||0.7;
    return (Math.min(W,H)*0.16)*Math.pow(shk,d)*sc;
  }
  if(sh==='sunflower') return Math.max(1.2,3-d*0.15)*sc;
  if(sh==='hilbert') return (W*0.8)/Math.max(2,Math.pow(2,Math.min(9,d)))*sc;
  if(sh==='fern') return 1.4*sc;
  return Math.max(MIN_PX, 8*Math.pow(0.7,d)*sc);
}
function oldCapOf(s){
  try{ if(root.IL154&&typeof IL154.capOf==='function') return IL154.capOf(s); }catch(e){}
  if(s==='spirals') return 2; if(s==='hilbert') return 4; if(s==='fern') return 5; if(s==='sunflower') return 8; return 6;
}
function tooFine(g,W,H){
  var sh=g&&g.shape;
  if(sh==='fern'||sh==='sunflower') return false;
  return cellPx(g,W||360,H||360)<MIN_PX;
}
function fernWant(d){
  return Math.min(60000, 4000*Math.max(1,d|0));
}
function sunN181(d){
  try{ if(root.IL154&&typeof IL154.sunN==='function') return IL154.sunN(d); }catch(e){}
  var f=[1,13,21,34,55,89,144,233,377];
  d=Math.max(0,Math.min(f.length-1,d|0));
  return f[d];
}
function homeView(g,W,H){
  var V=viewOf(g,W,H);
  return Math.abs((V.vs||1)-1)<0.02 && Math.abs(V.vx-W/2)<2 && Math.abs(V.vy-H/2)<2;
}

function growResetView(g){
  if(!g) return;
  g._vx=g._vy=null; g._vs=1;
}

function clearGrow(cv){
  var x=cv.getContext('2d');
  x.setTransform(1,0,0,1,0,0);
  x.fillStyle=paper(); x.fillRect(0,0,cv.width,cv.height);
  x.lineCap='round'; x.lineJoin='round';
  return x;
}

/* -------- Grow LOD drawers (chunked) -------- */
function growDrawDeep(cv,rec,prev){
  if(!cv) return;
  rec=rec||{};
  var W=cv.width,H=cv.height,V=viewOf(rec,W,H);
  var sh=rec.shape||'tree';
  function oldCap(s){
    try{ if(root.IL154&&typeof IL154.capOf==='function') return IL154.capOf(s); }catch(e){}
    if(s==='spirals') return 2; if(s==='hilbert') return 4; if(s==='fern') return 5; return 6;
  }
  var home=homeView(rec,W,H);
  /* Frozen v154 Koch is an anti-snowflake; always use the outward deep drawer so the picture does not jump. */
  if(home && sh!=='koch' && (rec.depth||0)<=oldCap(sh) && typeof prev==='function'){
    try{ prev(cv, rec); }catch(e){}
    rec._drewAt=Date.now();
    return;
  }
  var x=clearGrow(cv);
  var job=++GROW_JOB;
  rec._job=job;
  var t0all=(performance&&performance.now)?performance.now():Date.now();

  function done(){
    rec._drewAt=Date.now();
    rec._sliceMs=MAX_SLICE;
  }

  var handled={tree:1,antler:1,dragon:1,levy:1,triangle:1,sunflower:1,fern:1,koch:1,htree:1,pythagoras:1,hilbert:1};
  if(!handled[sh]){
    /* Modest depth: fall back to earlier drawer in world space via transform. */
    if((rec.depth||0)<=6 && V.vs===1 && Math.abs(V.vx-W/2)<1 && Math.abs(V.vy-H/2)<1 && typeof prev==='function'){
      try{prev(cv,rec)}catch(e){}
      done(); return;
    }
    /* Still transform + prev at capped depth if we cannot LOD it. */
    if(typeof prev==='function' && (rec.depth||0)<=8){
      try{prev(cv,rec)}catch(e){}
    }
    done(); return;
  }

  var cols=pals(rec), stack=[], i;

  function strokeSeg(ax,ay,bx,by,d,w){
    var a=toS(V,ax,ay),b=toS(V,bx,by);
    x.strokeStyle=cols[d%cols.length];
    x.lineWidth=Math.max(0.6,(w||2)*Math.min(2.2,Math.sqrt(V.vs)));
    x.beginPath(); x.moveTo(a.x,a.y); x.lineTo(b.x,b.y); x.stroke();
  }
  function fillDot(px,py,r,col){
    var p=toS(V,px,py), rr=Math.max(0.6,r*V.vs);
    if(p.x+rr<0||p.x-rr>W||p.y+rr<0||p.y-rr>H) return;
    x.fillStyle=col;
    x.beginPath(); x.arc(p.x,p.y,rr,0,Math.PI*2); x.fill();
  }
  function fillPoly(pts,col){
    var k,p,any=false,out=[];
    for(k=0;k<pts.length;k++){ p=toS(V,pts[k][0],pts[k][1]); out.push(p); if(p.x>=-4&&p.x<=W+4&&p.y>=-4&&p.y<=H+4) any=true; }
    if(!any) return;
    x.fillStyle=col; x.beginPath();
    x.moveTo(out[0].x,out[0].y);
    for(k=1;k<out.length;k++) x.lineTo(out[k].x,out[k].y);
    x.closePath(); x.fill();
  }

  if(sh==='tree'||sh==='antler'){
    var ang=((rec.angle||(sh==='antler'?36:28))*Math.PI/180);
    var shrink=sh==='antler'?0.72:0.68;
    stack.push({x:W/2,y:H*0.92,len:H*0.22,a:Math.PI/2,d:0});
    var depth=rec.depth||0;
    function stepTree(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        if(n.d>depth) continue;
        var nx=n.x+Math.cos(n.a)*n.len, ny=n.y-Math.sin(n.a)*n.len;
        var scr=n.len*V.vs;
        var reach=n.len*(shrink/(1-shrink));
        if(!segInView(V,n.x,n.y,nx,ny,reach*V.vs+8) && n.d>0) continue;
        if(scr>=0.6) strokeSeg(n.x,n.y,nx,ny,n.d,Math.max(0.8,(6-n.d)*0.85*(W/320)));
        if(n.d>=depth) continue;
        if(scr*shrink<MIN_PX) continue;
        stack.push({x:nx,y:ny,len:n.len*shrink,a:n.a-ang,d:n.d+1});
        stack.push({x:nx,y:ny,len:n.len*shrink,a:n.a+ang,d:n.d+1});
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepTree);
      else done();
    }
    requestAnimationFrame(stepTree);
    return;
  }

  if(sh==='dragon'||sh==='levy'){
    var depth=rec.depth||0;
    /* Heighway (dragon) or Lévy C: recursive mid-point. */
    function fold(ax,ay,bx,by,d,sign){
      var len=Math.hypot(bx-ax,by-ay)*V.vs;
      if(!segInView(V,ax,ay,bx,by,len+12)) return;
      if(d>=depth || len<MIN_PX){ if(len>=0.5) strokeSeg(ax,ay,bx,by,d,Math.max(1,3-d*0.15)); return; }
      var mx=(ax+bx)/2, my=(ay+by)/2, dx=bx-ax, dy=by-ay;
      var px=mx-sign*dy/2, py=my+sign*dx/2;
      if(sh==='levy'){
        /* Lévy: always turn the same way */
        fold(ax,ay,px,py,d+1,sign);
        fold(px,py,bx,by,d+1,sign);
      }else{
        fold(ax,ay,px,py,d+1,1);
        fold(px,py,bx,by,d+1,-1);
      }
    }
    /* Chunk by top-level splits stored on a stack of segments to finish. */
    var ax=W*0.22, ay=H*0.55, bx=W*0.78, by=H*0.55;
    if(sh==='levy'){ ax=W*0.28; ay=H*0.62; bx=W*0.72; by=H*0.62; }
    stack=[{ax:ax,ay:ay,bx:bx,by:by,d:0,sign:1,phase:0}];
    function stepDrag(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        var len=Math.hypot(n.bx-n.ax,n.by-n.ay)*V.vs;
        if(!segInView(V,n.ax,n.ay,n.bx,n.by,len+12)) continue;
        if(n.d>=depth || len<MIN_PX){
          if(len>=0.5) strokeSeg(n.ax,n.ay,n.bx,n.by,n.d,Math.max(1,3-n.d*0.15));
          continue;
        }
        var mx=(n.ax+n.bx)/2, my=(n.ay+n.by)/2, dx=n.bx-n.ax, dy=n.by-n.ay;
        if(sh==='dragon'){
          var sgn=n.sign!=null?n.sign:1;
          var px=mx-sgn*dy/2, py=my+sgn*dx/2;
          stack.push({ax:px,ay:py,bx:n.bx,by:n.by,d:n.d+1,sign:-1});
          stack.push({ax:n.ax,ay:n.ay,bx:px,by:py,d:n.d+1,sign:1});
        }else{
          var qx=mx-dy/2, qy=my+dx/2;
          stack.push({ax:qx,ay:qy,bx:n.bx,by:n.by,d:n.d+1,sign:1});
          stack.push({ax:n.ax,ay:n.ay,bx:qx,by:qy,d:n.d+1,sign:1});
        }
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepDrag);
      else done();
    }
    requestAnimationFrame(stepDrag);
    return;
  }

  if(sh==='triangle'){
    var depth=rec.depth||0;
    stack=[{ax:W/2,ay:H*0.1,bx:W*0.08,by:H*0.9,cx:W*0.92,cy:H*0.9,d:0}];
    function triIn(n){
      var pad=8;
      var xs=[toS(V,n.ax,n.ay),toS(V,n.bx,n.by),toS(V,n.cx,n.cy)];
      var minx=Math.min(xs[0].x,xs[1].x,xs[2].x),maxx=Math.max(xs[0].x,xs[1].x,xs[2].x);
      var miny=Math.min(xs[0].y,xs[1].y,xs[2].y),maxy=Math.max(xs[0].y,xs[1].y,xs[2].y);
      return maxx>=-pad&&minx<=W+pad&&maxy>=-pad&&miny<=H+pad;
    }
    function stepTri(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        if(!triIn(n)) continue;
        var size=Math.max(Math.hypot(n.bx-n.ax,n.by-n.ay),Math.hypot(n.cx-n.ax,n.cy-n.ay))*V.vs;
        if(n.d>=depth || size<MIN_PX){
          fillPoly([[n.ax,n.ay],[n.bx,n.by],[n.cx,n.cy]], cols[n.d%cols.length]);
          continue;
        }
        var mx=(n.ax+n.bx)/2,my=(n.ay+n.by)/2,nx=(n.bx+n.cx)/2,ny=(n.by+n.cy)/2,px=(n.cx+n.ax)/2,py=(n.cy+n.ay)/2;
        stack.push({ax:n.ax,ay:n.ay,bx:mx,by:my,cx:px,cy:py,d:n.d+1});
        stack.push({ax:mx,ay:my,bx:n.bx,by:n.by,cx:nx,cy:ny,d:n.d+1});
        stack.push({ax:px,ay:py,bx:nx,by:ny,cx:n.cx,cy:n.cy,d:n.d+1});
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepTri);
      else done();
    }
    requestAnimationFrame(stepTri);
    return;
  }

  if(sh==='sunflower'){
    var depth=Math.max(0,Math.min(8,rec.depth||0)), n=sunN181(depth), phi=rec.angle||137.5;
    var c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n));
    i=0;
    rec._n=n;
    function stepSun(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(i<n && performance.now()-t0<SLICE_MS){
        var r=c*Math.sqrt(i), th=i*phi*Math.PI/180;
        var px=W/2+r*Math.cos(th), py=H/2+r*Math.sin(th);
        var rad=Math.max(1.5,3.1-i/Math.max(1,n)*1.5);
        if(rad*V.vs>=0.6 && inView(V,px,py,rad*V.vs+4)) fillDot(px,py,rad,cols[i%cols.length]);
        i++;
      }
      recordSlice(performance.now()-t0);
      if(i<n) requestAnimationFrame(stepSun);
      else done();
    }
    requestAnimationFrame(stepSun);
    return;
  }

  if(sh==='fern'){
    var depth=Math.max(1,rec.depth||1);
    var want=fernWant(depth);
    var maxIters=Math.min(2000000, Math.max(80000, Math.floor(want*Math.max(12, 48/Math.max(0.04,V.vs*V.vs)))));
    var seed=rec.seed||109;
    var idx=0, got=0;
    var FERN=[[0,0,0,.16,0,0],[.85,.04,-.04,.85,0,1.6],[.2,-.26,.23,.22,0,1.6],[-.15,.28,.26,.24,0,.44]];
    function lcg(s){s=s>>>0; return function(){s=(1664525*s+1013904223)>>>0; return s/4294967296}}
    var rnd=lcg(seed), fx=0, fy=0;
    var rdot=1.2/Math.max(0.2,V.vs);
    function stepFern(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(idx<maxIters && got<want && performance.now()-t0<SLICE_MS){
        var r=rnd(),k=r<.01?0:r<.86?1:r<.93?2:3,a=FERN[k];
        var nx=a[0]*fx+a[1]*fy+a[4], ny=a[2]*fx+a[3]*fy+a[5];
        fx=nx; fy=ny;
        var px=W*(0.5+fx*0.18), py=H*(0.92-fy*0.082);
        if(inView(V,px,py,6)){ fillDot(px,py,rdot,cols[1]||cols[0]); got++; }
        idx++;
      }
      recordSlice(performance.now()-t0);
      if(idx<maxIters && got<want) requestAnimationFrame(stepFern);
      else { rec._n=got; done(); }
    }
    requestAnimationFrame(stepFern);
    return;
  }

  if(sh==='koch'){
    var depth=rec.depth||0;
    function kochSide(ax,ay,bx,by){
      stack.push({ax:ax,ay:ay,bx:bx,by:by,d:0});
    }
    /* Same down-pointing triangle as v154, bumps flipped outward (true snowflake, area → 8/5). */
    var sK=Math.min(W,H)*0.82, x0=(W-sK)/2, y0=H*0.22, x1=x0+sK, y1=y0, x2=x0+sK/2, y2=y0+sK*Math.sqrt(3)/2;
    kochSide(x0,y0,x1,y1); kochSide(x1,y1,x2,y2); kochSide(x2,y2,x0,y0);
    function stepK(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        var len=Math.hypot(n.bx-n.ax,n.by-n.ay)*V.vs;
        if(!segInView(V,n.ax,n.ay,n.bx,n.by,len+10)) continue;
        if(n.d>=depth || len<MIN_PX){ if(len>=0.5) strokeSeg(n.ax,n.ay,n.bx,n.by,n.d,1.6); continue; }
        var ux=(n.bx-n.ax)/3, uy=(n.by-n.ay)/3;
        var mx=n.ax+ux,my=n.ay+uy, nx=n.ax+2*ux,ny=n.ay+2*uy;
        var px=n.ax+ux+(ux/2+uy*Math.sqrt(3)/2), py=n.ay+uy+(uy/2-ux*Math.sqrt(3)/2);
        stack.push({ax:nx,ay:ny,bx:n.bx,by:n.by,d:n.d+1});
        stack.push({ax:px,ay:py,bx:nx,by:ny,d:n.d+1});
        stack.push({ax:mx,ay:my,bx:px,by:py,d:n.d+1});
        stack.push({ax:n.ax,ay:n.ay,bx:mx,by:my,d:n.d+1});
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepK);
      else done();
    }
    requestAnimationFrame(stepK);
    return;
  }

  if(sh==='htree'||sh==='pythagoras'){
    var depth=rec.depth||0;
    if(sh==='htree'){
      stack.push({x:W/2,y:H/2,s:Math.min(W,H)*0.22,a:0,d:0}); /* a=0 horizontal bar */
    }else{
      var s0=Math.min(W,H)*0.16;
      stack.push({px:W/2-s0/2,py:H*0.86,s:s0,a:-Math.PI/2,d:0,kind:'sq'});
    }
    var angP=(rec.angle||28)*Math.PI/180;
    function stepHT(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        if(sh==='htree'){
          var dx=Math.cos(n.a)*n.s, dy=Math.sin(n.a)*n.s;
          var ax=n.x-dx, ay=n.y-dy, bx=n.x+dx, by=n.y+dy;
          var len=n.s*2*V.vs;
          if(!segInView(V,ax,ay,bx,by,len+8)) continue;
          if(len>=0.6) strokeSeg(ax,ay,bx,by,n.d,Math.max(0.7,2.6-n.d*0.25));
          if(n.d>=depth || len/Math.SQRT2<MIN_PX) continue;
          stack.push({x:ax,y:ay,s:n.s/Math.SQRT2,a:n.a+Math.PI/2,d:n.d+1});
          stack.push({x:bx,y:by,s:n.s/Math.SQRT2,a:n.a+Math.PI/2,d:n.d+1});
        }else{
          var c=Math.cos(n.a),si=Math.sin(n.a);
          var x2=n.px+c*n.s,y2=n.py+si*n.s,x3=x2-si*n.s,y3=y2+c*n.s,x4=n.px-si*n.s,y4=n.py+c*n.s;
          var size=n.s*V.vs;
          if(size<MIN_PX && n.d>0) continue;
          fillPoly([[n.px,n.py],[x2,y2],[x3,y3],[x4,y4]], cols[n.d%cols.length]);
          if(n.d>=depth || size*0.5<MIN_PX) continue;
          var sl=n.s*Math.cos(angP), sr=n.s*Math.sin(angP);
          stack.push({px:x4,py:y4,s:sl,a:n.a+angP,d:n.d+1,kind:'sq'});
          stack.push({px:x3,py:y3,s:sr,a:n.a+angP-Math.PI/2,d:n.d+1,kind:'sq'});
        }
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepHT);
      else done();
    }
    requestAnimationFrame(stepHT);
    return;
  }

  if(sh==='hilbert'){
    var depth=Math.max(1,Math.min(9,rec.depth||1));
    var pad=W*0.08, span=W-pad*2, N=1<<depth, step=span/N;
    /* Walk the Hilbert curve; skip segments well outside the view. */
    var px=pad+step/2, py=pad+step/2, first=true, seq=hilbertWalk(depth);
    i=0;
    function stepHi(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(i<seq.length && performance.now()-t0<SLICE_MS){
        var d=seq[i++];
        var nx=px, ny=py;
        if(d===0) nx+=step; else if(d===1) ny+=step; else if(d===2) nx-=step; else ny-=step;
        if(step*V.vs>=0.5 && segInView(V,px,py,nx,ny,8)) strokeSeg(px,py,nx,ny,i%cols.length,1.4);
        px=nx; py=ny;
      }
      recordSlice(performance.now()-t0);
      if(i<seq.length) requestAnimationFrame(stepHi);
      else done();
    }
    requestAnimationFrame(stepHi);
    return;
  }

  done();
}

function hilbertWalk(order){
  /* Returns a list of 0,1,2,3 steps (E,S,W,N) for a Hilbert curve of given order. */
  var out=[];
  function rot(s,rx,ry,n){
    if(!ry){
      if(rx){ s.x=n-1-s.x; s.y=n-1-s.y; }
      var t=s.x; s.x=s.y; s.y=t;
    }
  }
  function xy(n,d){
    var s={x:0,y:0}, rx, ry, t=d;
    for(var sN=1;sN<n;sN*=2){
      rx=1&(t/2); ry=1&(t^rx); rot(s,rx,ry,sN);
      s.x+=sN*rx; s.y+=sN*ry; t/=4;
    }
    return s;
  }
  var n=1<<order, last=xy(n,0), i,p;
  for(i=1;i<n*n;i++){
    p=xy(n,i);
    if(p.x>last.x) out.push(0);
    else if(p.y>last.y) out.push(1);
    else if(p.x<last.x) out.push(2);
    else out.push(3);
    last=p;
  }
  return out;
}

function growAfterDraw(){
  var el=$('patterns'); if(!el) return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='grow') return}catch(e){return}
  var g=PAT106.grow, cv=$('patGrowCv');
  if(!g||!cv) return;
  if(!el.querySelector('[data-grow-zoom-hint]')){
    var hint=document.createElement('p');
    hint.className='soft';
    hint.setAttribute('data-grow-zoom-hint','1');
    hint.textContent=t('Pinch or drag to look closer. Grow adds more of the same rule.');
    var msg=$('patGrowMsg');
    if(msg&&msg.parentNode) msg.parentNode.insertBefore(hint,msg.nextSibling);
    else cv.parentNode.insertBefore(hint,cv.nextSibling);
  }
  try{ patchJarDeep(g); }catch(e){}
  var rst=el.querySelector('[data-g181reset="grow"]');
  if(rst&&!rst._deep){
    var old=rst.onclick;
    rst.onclick=function(){
      growResetView(g);
      if(typeof old==='function') old.apply(this,arguments);
      else{
        g.depth=0;g.q=[];g.msg='';
        if(typeof patGrowDraw106==='function') patGrowDraw106();
      }
    };
    rst._deep=1;
  }
  bindGrowCv(cv,g);
}

function patchJarDeep(g){
  if(!g) return;
  var cv=$('patGrowCv');
  var W=cv&&cv.width||360, H=cv&&cv.height||360;
  var cap=oldCapOf(g.shape||'tree');
  var jar=document.querySelector('[data-gaf3jar] .g9c');
  if(!jar) return;
  var past=(g.depth||0)>cap;
  var home=homeView(g,W,H);
  if(home && !past){
    if(jar.getAttribute('data-jar-line') || jar.getAttribute('data-jar-uncountable')==='1'){
      jar.removeAttribute('data-jar-line');
      jar.removeAttribute('data-jar-uncountable');
      try{
        var n=null, word='';
        if(root.IL156&&typeof IL156.copies==='function') n=IL156.copies(g);
        else if(root.IL155&&typeof IL155.copies==='function') n=IL155.copies(g);
        else if(root.IL154&&typeof IL154.copies==='function') n=IL154.copies(g);
        if(n==null) n=g._n;
        if(root.IL156&&typeof IL156.jarWord==='function') word=IL156.jarWord(g.shape);
        else if(root.IL155&&typeof IL155.jarWord==='function') word=IL155.jarWord(g.shape);
        else if(root.IL154&&typeof IL154.jarWord==='function') word=IL154.jarWord(g.shape);
        jar.textContent='';
        if(n!=null) jar.appendChild(document.createTextNode(String(n)));
        if(word){
          jar.appendChild(document.createTextNode(' '));
          var sp=document.createElement('span'); sp.className='soft'; sp.textContent=word; jar.appendChild(sp);
        }
      }catch(e){}
    }
    return;
  }
  var line=past
    ? t('Too many to count on the screen. Each Grow makes more by the same rule.')
    : t('Some are off the screen now. Reset to count them all.');
  var kind=past?'toomany':'offscreen';
  if(jar.getAttribute('data-jar-line')===kind && jar.textContent===line) return;
  jar.textContent='';
  jar.appendChild(document.createTextNode(line));
  jar.setAttribute('data-jar-uncountable','1');
  jar.setAttribute('data-jar-line',kind);
}

function atZoomCap(g, sc, raw, cv){
  if(!(raw>=400 && sc>=400)) return;
  var line=t('This is as far as this lamp can see.');
  if(g) g.msg=line;
  var msg=$('patGrowMsg'); if(msg) msg.textContent=line;
}

function bindGrowCv(cv,g){
  if(cv._g181deep) return;
  cv._g181deep=1;
  var pts={};
  function pos(ev,p){
    var r=cv.getBoundingClientRect();
    return {x:(p.clientX-r.left)/r.width*cv.width, y:(p.clientY-r.top)/r.height*cv.height, id:p.pointerId};
  }
  function ids(){return Object.keys(pts)}
  function pinch(){
    var k=ids(); if(k.length!==2) return null;
    var a=pts[k[0]], b=pts[k[1]];
    return {mx:(a.x+b.x)/2, my:(a.y+b.y)/2, d:Math.hypot(a.x-b.x,a.y-b.y)};
  }
  var lastPinch=null, dragging=0;
  cv.addEventListener('pointerdown',function(ev){
    cv.setPointerCapture(ev.pointerId);
    pts[ev.pointerId]=pos(ev,ev);
    cv.classList.add('g181-drag');
    if(ids().length===2) lastPinch=pinch();
    else dragging=1;
  });
  cv.addEventListener('pointermove',function(ev){
    if(!pts[ev.pointerId]) return;
    var p=pos(ev,ev), prev=pts[ev.pointerId];
    pts[ev.pointerId]=p;
    var W=cv.width,H=cv.height,V=viewOf(g,W,H);
    if(ids().length===2){
      var pn=pinch(); if(!pn||!lastPinch||!lastPinch.d) return;
      var world=toW(V,lastPinch.mx,lastPinch.my);
      var raw=V.vs*(pn.d/lastPinch.d);
      var sc=Math.max(0.4, Math.min(400, raw));
      g._vs=sc;
      /* keep the pinch midpoint on the same world point */
      g._vx=world.x-(pn.mx-W/2)/sc;
      g._vy=world.y-(pn.my-H/2)/sc;
      lastPinch=pn;
      atZoomCap(g,sc,raw,cv);
      scheduleGrowRedraw();
    }else if(dragging){
      var dx=p.x-prev.x, dy=p.y-prev.y;
      g._vx=(g._vx!=null?g._vx:W/2)-dx/V.vs;
      g._vy=(g._vy!=null?g._vy:H/2)-dy/V.vs;
      scheduleGrowRedraw();
    }
  });
  function end(ev){
    delete pts[ev.pointerId];
    if(ids().length<2) lastPinch=null;
    if(!ids().length){ dragging=0; cv.classList.remove('g181-drag'); }
  }
  cv.addEventListener('pointerup',end);
  cv.addEventListener('pointercancel',end);
  cv.addEventListener('wheel',function(ev){
    ev.preventDefault();
    var r=cv.getBoundingClientRect();
    var sx=(ev.clientX-r.left)/r.width*cv.width, sy=(ev.clientY-r.top)/r.height*cv.height;
    var W=cv.width,H=cv.height,V=viewOf(g,W,H);
    var world=toW(V,sx,sy);
    var raw=V.vs*(ev.deltaY<0?1.15:1/1.15);
    var sc=Math.max(0.4, Math.min(400, raw));
    g._vs=sc;
    g._vx=world.x-(sx-W/2)/sc;
    g._vy=world.y-(sy-H/2)/sc;
    atZoomCap(g,sc,raw,cv);
    scheduleGrowRedraw();
  },{passive:false});
}

var GROW_REDRAW=0;
function scheduleGrowRedraw(){
  if(GROW_REDRAW) return;
  GROW_REDRAW=requestAnimationFrame(function(){
    GROW_REDRAW=0;
    var cv=$('patGrowCv'), g=PAT106&&PAT106.grow;
    if(cv&&g){ growDrawDeep(cv,g,null); try{patchJarDeep(g)}catch(e){} }
  });
}

function growStepDeep(prev){
  return function(){
    var g=PAT106&&PAT106.grow; if(!g) return typeof prev==='function'?prev.apply(this,arguments):undefined;
    var LODSH={tree:1,antler:1,dragon:1,levy:1,triangle:1,sunflower:1,fern:1,koch:1,htree:1,pythagoras:1,hilbert:1};
    var sh=g.shape||'tree';
    var cv0=$('patGrowCv'), W0=cv0&&cv0.width||360, H0=cv0&&cv0.height||360;
    var home=homeView(g,W0,H0);
    /* Within the old per-shape cap, at home view, keep the earlier Grow step
       (fern progressive dots, spiral cap, queued tones). Past that cap, or when zoomed, use LOD. */
    if(!LODSH[sh] || (home && (g.depth||0)<oldCapOf(sh))){
      return typeof prev==='function'?prev.apply(this,arguments):undefined;
    }
    function seedCapMsg(){
      g.msg=t('That is as far as this seed grows.');
      var m=$('patGrowMsg'); if(m) m.textContent=g.msg;
    }
    if(sh==='sunflower' && (g.depth||0)>=oldCapOf(sh)){ seedCapMsg(); return; }
    if(sh==='hilbert' && (g.depth||0)>=9){ seedCapMsg(); return; }
    if(sh==='fern' && fernWant((g.depth||0)+1)<=fernWant(g.depth||0)){ seedCapMsg(); return; }
    var cv=$('patGrowCv');
    if(g._rest || /in the Sky|en el Cielo/i.test(g.msg||'')) return;
    var W=cv&&cv.width||360, H=cv&&cv.height||360;
    /* Would the *next* generation already be under 1 px at this zoom? */
    var probe={shape:g.shape,depth:(g.depth||0)+1,_vs:g._vs,_vx:g._vx,_vy:g._vy,pal:g.pal,angle:g.angle};
    if(tooFine(probe,W,H)){
      g.msg=t('The twigs are as fine as this screen can show. Pinch to look closer, then you can Grow again.');
      var msg=$('patGrowMsg'); if(msg) msg.textContent=g.msg;
      return;
    }
    function apply(){
      g.depth=(g.depth||0)+1;
      try{if(typeof patGrowTone106==='function') patGrowTone106(Math.min(5,g.depth-1))}catch(e){}
      if(g.depth===6){
        try{if(typeof patGrowPlayScale107==='function') patGrowPlayScale107()}catch(e){}
      }
      g.msg=''; g._rest=0;
      if(typeof patGrowDraw106==='function') patGrowDraw106();
      try{if(typeof ensureFloat181==='function') ensureFloat181(); if(typeof tidyGrow181==='function') tidyGrow181(); growAfterDraw()}catch(e){}
    }
    if(reduced()){ apply(); return; }
    g.q=g.q||[];
    g.q.push(apply);
    if(!g.busy){
      g.busy=true;
      var tick=function(){
        var fn=g.q.shift();
        if(!fn){g.busy=false;return}
        fn();
        setTimeout(tick,280);
      };
      tick();
    }
  };
}

/* -------- Endless Honeycomb re-root -------- */
function ehExp(){
  var E=root.EH181; if(!E) return 0;
  return (E.roots||0)*3 + (E.level||0);
}
function pow7str(n){
  /* 7^n as a decimal string, for n up to a few hundred (BigInt). */
  if(n<=0) return '1';
  try{return (7n**BigInt(n)).toString()}catch(e){return ''}
}
function groupDigits(s){
  s=String(s);
  if(esLang() && s.length<=4) return s;
  return s.replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0');
}
function ehCountKindly(n){
  if(n<=0) return '';
  if(n===1) return '7';
  if(n===2) return '7 × 7 = 49';
  if(n===3) return '7 × 7 × 7 = 343';
  var facts=[],i;
  for(i=0;i<n;i++) facts.push('7');
  if(n>=10) return t('{n} sevens multiplied together.',{n:String(n)});
  var raw=pow7str(n);
  if(!raw) return t('{n} sevens multiplied together.',{n:String(n)});
  return facts.join(' × ')+' = '+groupDigits(raw);
}

function ehMinCellPx(){
  try{
    var E=root.EH181; if(!E) return 0;
    var level=Math.min(E.level||0,3);
    var size=typeof ehFitSize==='function'?ehFitSize(level):12;
    var stage=document.getElementById('eh181stage');
    var svg=stage&&stage.querySelector('svg');
    var cssW=svg?svg.getBoundingClientRect().width:360;
    /* size is in SVG user units (viewBox 400). Cell drawing uses size*0.96. */
    return (size*0.96)*(cssW/400);
  }catch(e){return 0}
}

function ehRewriteMsg(){
  var E=root.EH181; if(!E) return;
  var el=document.getElementById('eh181msg'); if(!el) return;
  var n=ehExp();
  var filled=(E.filled||[]).filter(Boolean).length;
  var msg;
  function ehCore(k){ return String(ehCountKindly(k)||'').replace(/\.+$/,''); }
  if(E.level===0 && filled===0){
    msg=(n>0?ehCore(n)+'. ':'')+t('Fill the six around the one.');
  }else if(E.level===0 && filled===6){
    msg=t('Seven make one bigger tile.');
  }else if(n>=1){
    msg=ehCore(n);
    if((E.roots||0)>=1) msg+='. '+t('Each tile you see holds everything you built before.');
    else if(n>=3) msg+='. '+t('Each tile is everything you built.');
  }
  if(msg) el.textContent=msg;
  el.setAttribute('data-eh-exp', String(n));
  el.setAttribute('data-eh-cell', String(ehMinCellPx().toFixed(2)));
}

function ehReRootNow(animate){
  var E=root.EH181; if(!E) return;
  if((E.level||0)<3) return;
  E.busy=true;
  var stage=document.getElementById('eh181stage'), svg=stage&&stage.querySelector('svg');
  function done(){
    E.roots=(E.roots||0)+1;
    E.level=0;
    E.filled=[0,0,0,0,0,0];
    E.busy=false;
    E._pendingRoot=0;
    E.zooms=(E.zooms||0)+1;
    try{if(typeof ehChime181==='function') ehChime181(6)}catch(e){softChime(6)}
    if(typeof ehDraw181==='function') ehDraw181();
  }
  if(!animate||reduced()||!svg){ done(); return; }
  var ang=19.1066, sc=Math.sqrt(7);
  svg.classList.add('eh181-zoom');
  svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
  setTimeout(done, 1400);
}

function ehAfterDraw(){
  var E=root.EH181; if(!E) return;
  ehRewriteMsg();
  if((E.level||0)>=3 && !E.busy && !E._pendingRoot){
    E._pendingRoot=1;
    setTimeout(function(){ ehReRootNow(!reduced()); }, reduced()?200:1200);
  }
}

/* -------- Deep Mandelbrot -------- */
var EXD={worker:null,job:0,ready:0,cxQ:null,cyQ:null,spanQ:null,maxSlice:0,glitches:0,wiggles:0,unique:0,maxFrac:1,flat:0,atCap:0,lastPass:0,lastStep:0,iters:0};

function decToFp(s,F){
  s=String(s==null?'0':s).trim().replace(/\s+/g,'');
  if(typeof F!=='bigint') F=BigInt(F||1024);
  if(!s) return 0n;
  var neg=s.charAt(0)==='-';
  if(neg||s.charAt(0)==='+') s=s.slice(1);
  var e=s.indexOf('e'); if(e<0) e=s.indexOf('E');
  var exp=0;
  if(e>=0){ exp=parseInt(s.slice(e+1),10)||0; s=s.slice(0,e); }
  var a=s.split('.'), ip=a[0]||'0', fp=a[1]||'';
  if(exp>0){
    if(fp.length<=exp){ ip=ip+fp+new Array(exp-fp.length+1).join('0'); fp=''; }
    else{ ip=ip+fp.slice(0,exp); fp=fp.slice(exp); }
  }else if(exp<0){
    var k=-exp, all=ip+fp, loc=ip.length-k;
    if(loc<=0){ fp=new Array(1-loc).join('0')+all; ip='0'; }
    else{ fp=all.slice(loc); ip=all.slice(0,loc); }
  }
  ip=ip.replace(/^0+(?=\d)/,'');
  var intPart=BigInt(ip||'0')<<F, frac=0n;
  if(fp){ frac=(BigInt(fp)<<F)/(10n**BigInt(fp.length)); }
  var v=intPart+frac;
  return neg?-v:v;
}
function fpToDec(v,F,digits){
  digits=digits||DEC_DIGITS;
  if(typeof F!=='bigint') F=BigInt(F||1024);
  var neg=v<0n; if(neg)v=-v;
  var ip=v>>F;
  var fr=v&((1n<<F)-1n);
  var fracStr='';
  var i, num=fr, den=1n<<F;
  for(i=0;i<digits;i++){
    num*=10n;
    var d=num/den;
    fracStr+=d.toString();
    num=num%den;
    if(num===0n) break;
  }
  var s=ip.toString()+(fracStr?('.'+fracStr):'');
  return (neg?'-':'')+s;
}
function fpToNum(v,F){
  var keep=52n;
  if(F<=keep) return Number(v)/Math.pow(2,Number(F));
  var neg=v<0n; if(neg)v=-v;
  return (neg?-1:1)*Number(v>>(F-keep))/Math.pow(2,Number(keep));
}
function synchExQ(ex){
  if(!ex) return;
  if(!EXD.cxQ){ EXD.cxQ=fpToDec(decToFp(ex.cx!=null?ex.cx:-0.5,FBITS),FBITS,DEC_DIGITS); }
  if(!EXD.cyQ){ EXD.cyQ=fpToDec(decToFp(ex.cy!=null?ex.cy:0,FBITS),FBITS,DEC_DIGITS); }
  if(!EXD.spanQ){ EXD.spanQ=fpToDec(decToFp(ex.span!=null?ex.span:3.5,FBITS),FBITS,DEC_DIGITS); }
}
function resetExQ(ex){
  EXD.cxQ=fpToDec(decToFp(-0.5,FBITS),FBITS,DEC_DIGITS);
  EXD.cyQ=fpToDec(decToFp(0,FBITS),FBITS,DEC_DIGITS);
  EXD.spanQ=fpToDec(decToFp(3.5,FBITS),FBITS,DEC_DIGITS);
  if(ex){ ex.cx=-0.5; ex.cy=0; ex.span=3.5; ex.limit=false; }
}
function needPert(span){ return !(span>1e-13); }
function deepSpanOk(span){
  /* 1024-bit fixed point: refuse when span is smaller than ~2^{-900} (~3e271 zoom). */
  if(!(span>0) || !isFinite(span)) return false;
  return span>Math.pow(2,-900);
}

function log10Dec(s){
  s=String(s==null?'0':s).trim().replace(/\s+/g,'');
  if(!s) return -Infinity;
  if(s.charAt(0)==='-'||s.charAt(0)==='+') s=s.slice(1);
  var e=s.indexOf('e'); if(e<0) e=s.indexOf('E');
  if(e>=0){
    var mant=parseFloat(s.slice(0,e))||0, exp=parseInt(s.slice(e+1),10)||0;
    return Math.log10(Math.abs(mant)||1)+exp;
  }
  var a=s.split('.'), ip=(a[0]||'0').replace(/^0+/,''), fp=a[1]||'';
  if(ip.length){
    var head=ip[0]+'.'+(ip.slice(1)+fp).slice(0,12);
    return Math.log10(parseFloat(head)||1)+(ip.length-1);
  }
  var i=0; while(i<fp.length && fp.charAt(i)==='0') i++;
  if(i>=fp.length) return -Infinity;
  var rest=fp.slice(i,i+12);
  return Math.log10(parseFloat(rest.charAt(0)+'.'+rest.slice(1))||1)-(i+1);
}
function mandelZoomOf(span, spanQ){
  if(span>1e-18 && isFinite(span) && span>0) return 3.5/span;
  var lg=log10Dec(spanQ!=null?spanQ:EXD.spanQ);
  if(!isFinite(lg)) return 1;
  return 3.5*Math.pow(10, -lg);
}
function mandelItersFor(span, spanQ){
  var zoom=mandelZoomOf(span, spanQ);
  var lg=Math.log10(Math.max(1,zoom));
  if(!isFinite(lg)) lg=0;
  return Math.min(12000, Math.max(200, Math.floor(200+280*lg)));
}
function wigglesOk(unique, maxFrac){
  return (unique||0)>=8 && (maxFrac||1)<=0.90;
}

function ensureMandelWorker(){
  if(EXD.worker) return EXD.worker;
  try{
    EXD.worker=new Worker('v181-mandel-worker.js');
    EXD.worker.onmessage=onMandelMsg;
    EXD.worker.onerror=function(){ EXD.worker=null; };
    return EXD.worker;
  }catch(e){ EXD.worker=null; return null; }
}

function palList(rec){
  var nightOn=night();
  var pal=nightOn?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
  return pal;
}

function onMandelMsg(ev){
  var m=ev.data||{};
  if(m.id!==EXD.job) return;
  if(m.cmd!=='tile') return;
  var cv=$('patExCv'); if(!cv) return;
  if(cv.width!==m.W||cv.height!==m.H) return;
  var t0=performance.now();
  try{
    var img=new ImageData(new Uint8ClampedArray(m.data), m.W, m.H);
    cv.getContext('2d').putImageData(img,0,0);
  }catch(e){}
  var dt=performance.now()-t0;
  recordSlice(dt);
  EXD.maxSlice=Math.max(EXD.maxSlice,m.maxSlice||0,dt);
  EXD.glitches=m.glitches||0;
  EXD.ready=1;
  EXD.lastPass=m.pass;
  EXD.lastStep=m.step||1;
  EXD.unique=m.unique||0;
  EXD.maxFrac=m.maxFrac==null?1:m.maxFrac;
  EXD.wiggles=wigglesOk(EXD.unique, EXD.maxFrac)?1:0;
  EXD.flat=EXD.wiggles?0:1;
  try{
    var rec0=PAT106&&PAT106.ex;
    var sc=$('patExScale');
    if(sc&&rec0){
      var z=mandelZoomOf(rec0.span, EXD.spanQ);
      sc.textContent=typeof patExScaleLine106==='function'?patExScaleLine106(z):'';
    }
  }catch(e){}
  /* progressive sharpen: if this was a coarse pass, request a finer one */
  if((m.step||1)>1){
    var rec=PAT106&&PAT106.ex;
    if(rec) mandelKick(cv,rec,m.step>2?2:1, m.pass+1);
  }
}

function mandelKick(cv,rec,step,pass){
  var w=ensureMandelWorker();
  synchExQ(rec);
  var iters=mandelItersFor(rec.span, EXD.spanQ);
  EXD.iters=iters;
  var usePert=needPert(rec.span);
  if(usePert && !w){
    rec.limit=true;
    EXD.atCap=1;
    var lim=$('patExLimit'); if(lim) lim.textContent=t('This is as far as this lamp can see.');
    return false;
  }
  var msg={
    cmd:'render', id:EXD.job, W:cv.width, H:cv.height, iters:iters, step:step||1, pass:pass||0,
    kind:rec.kind||'mandel', cx:rec.cx, cy:rec.cy, span:rec.span,
    cxQ:EXD.cxQ, cyQ:EXD.cyQ, spanQ:EXD.spanQ,
    jr:rec.jr||0, ji:rec.ji||0, pal:palList(rec), usePert:usePert
  };
  if(w){
    try{ w.postMessage({cmd:'abort',id:EXD.job-1}); }catch(e){}
    w.postMessage(msg);
    return true;
  }
  return mandelMainThread(cv,rec,step,iters);
}

function mandelMainThread(cv,rec,step,iters){
  /* Chunked f64 (or skip pert if we have no worker — still f64 until the wall). */
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  var span=rec.span,cx=rec.cx,cy=rec.cy,kind=rec.kind||'mandel';
  var pal=palList(rec).map(function(h){
    h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];
  });
  var aspect=H/W, xmin=cx-span/2, ymin=cy-span*aspect/2, dx=span/W, dy=(span*aspect)/H;
  var img=x.createImageData(W,H), d=img.data, y=0, job=EXD.job, jr=rec.jr||0, ji=rec.ji||0;
  function color(n,inside){
    if(inside) return [20,16,28];
    var t=Math.max(0,Math.min(.999,n))*(pal.length-1),i=t|0,f=t-i,a=pal[i],b=pal[i+1]||pal[i];
    return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f].map(function(v){return v|0});
  }
  function slice(){
    if(job!==EXD.job) return;
    var t0=performance.now();
    while(y<H && performance.now()-t0<SLICE_MS){
      var y0=ymin+y*dy, i,k,zr,zi,cr,ci,nz,c,p,ii,jj;
      for(i=0;i<W;i+=step){
        var x0=xmin+i*dx;
        if(kind==='mandel'){zr=0;zi=0;cr=x0;ci=y0}else{zr=x0;zi=y0;cr=jr;ci=ji}
        k=0;
        while(k<iters&&zr*zr+zi*zi<=4){ nz=zr*zr-zi*zi+cr; zi=2*zr*zi+ci; zr=nz; k++; }
        c=color(k/iters, kind==='mandel'&&k>=iters);
        for(jj=0;jj<step&&y+jj<H;jj++) for(ii=0;ii<step&&i+ii<W;ii++){
          p=((y+jj)*W+(i+ii))*4; d[p]=c[0];d[p+1]=c[1];d[p+2]=c[2];d[p+3]=255;
        }
      }
      y+=step;
    }
    recordSlice(performance.now()-t0);
    if(y<H) requestAnimationFrame(slice);
    else{
      var t1=performance.now();
      x.putImageData(img,0,0);
      recordSlice(performance.now()-t1);
      EXD.ready=1;
      EXD.lastStep=step||1;
      EXD.lastPass=EXD.lastPass||0;
      /* Main-thread f64 path: count distinct colours already painted. */
      try{
        var seen={}, u=0, mx=0, tot=0, pi, key, cnt;
        for(pi=0;pi<d.length;pi+=16){
          key=d[pi]+','+d[pi+1]+','+d[pi+2];
          cnt=seen[key]=(seen[key]||0)+1;
          if(cnt===1) u++;
          if(cnt>mx) mx=cnt;
          tot++;
        }
        EXD.unique=u; EXD.maxFrac=tot?mx/tot:1;
        EXD.wiggles=wigglesOk(u, EXD.maxFrac)?1:0;
        EXD.flat=EXD.wiggles?0:1;
      }catch(e){}
      if((step||1)>1) mandelKick(cv,rec,step>2?2:1,(EXD.lastPass||0)+1);
    }
  }
  requestAnimationFrame(slice);
  return true;
}

function mandelRender(cv,rec,opts,prev){
  rec=rec||(PAT106&&PAT106.ex); if(!cv||!rec) return false;
  var kind=(rec.kind==='zoom'?rec.fractal:rec.kind)||'mandel';
  if(kind!=='mandel'){
    return typeof prev==='function'?prev(cv,rec,opts):false;
  }
  if(!deepSpanOk(rec.span)) return false;
  if(needPert(rec.span) && !ensureMandelWorker()){
    rec.limit=true;
    EXD.atCap=1;
    var lim=$('patExLimit'); if(lim) lim.textContent=t('This is as far as this lamp can see.');
    return typeof prev==='function'?prev(cv,rec,opts):false;
  }
  EXD.atCap=0;
  watchLongTasks();
  EXD.job++;
  EXD.ready=0;
  EXD.wiggles=0; EXD.flat=0;
  try{
  /* first a coarse pass, then sharpen */
  var step=reduced()?1:4;
    mandelKick(cv,rec,step,0);
  }catch(e){
    /* Fall back to the earlier renderer if high-precision setup fails. */
    try{ if(typeof prev==='function') return prev(cv,rec,opts); }catch(e2){}
    return false;
  }
  try{
    if(opts&&!opts.noTurtle && typeof patExMaybeTurtle106==='function'){
      /* turtle after a short wait so it lands on the sharpened frame if possible */
    }
  }catch(e){}
  return true;
}

function applyDeepGo(nx,ny,span){
  var F=FBITS;
  var cx=decToFp(EXD.cxQ,F), cy=decToFp(EXD.cyQ,F), sp=decToFp(EXD.spanQ,F);
  var spf=decToFp(span,F);
  /* Taps/pinches stash (u,v) from the screen. Add (u-0.5)·span in BigInt so
     steering still works when the f64 world coordinate rounds to 0. */
  if(EXD.lastAt){
    var uOff=decToFp(String(EXD.lastU-0.5),F);
    var vOff=decToFp(String(EXD.lastV-0.5),F);
    var asp=decToFp(String(EXD.lastAspect||1),F);
    cx=cx+((uOff*sp)>>F);
    cy=cy+((((vOff*sp)>>F)*asp)>>F);
    EXD.lastAt=0;
  }else if(typeof nx==='string'){
    cx=decToFp(nx,F); cy=decToFp(ny,F);
  }else if(nx!=null && isFinite(nx) && ny!=null && isFinite(ny) && !needPert(fpToNum(sp,F))){
    cx=decToFp(nx,F); cy=decToFp(ny,F);
  }
  EXD.cxQ=fpToDec(cx,F,DEC_DIGITS);
  EXD.cyQ=fpToDec(cy,F,DEC_DIGITS);
  EXD.spanQ=fpToDec(spf,F,DEC_DIGITS);
  return {cx:fpToNum(cx,F), cy:fpToNum(cy,F), span:fpToNum(spf,F), cxQ:EXD.cxQ, cyQ:EXD.cyQ, spanQ:EXD.spanQ};
}

/* -------- Share a pie truths -------- */
function fracDenom(n){ var s='1/'+Math.pow(2,n); return s; }
function fracSum(n){
  var parts=[],i;
  for(i=1;i<=n;i++) parts.push('1/'+Math.pow(2,i));
  return parts.join(' + ');
}

function fracOpenTruth(kind){
  try{ if(typeof PAT106==='object'){ PAT106.unit='frac'; PAT106.frac=PAT106.frac||{}; PAT106.frac.truth=kind; if(kind==='series') PAT106.frac.seriesN=PAT106.frac.seriesN||0; } }catch(e){}
  fracDrawTruth(kind);
}

function fracDrawTruth(kind){
  var el=$('patterns'); if(!el) return;
  var f=(typeof PAT106==='object'&&PAT106.frac)||{};
  var inner='', title='', lead='', count='';
  if(kind==='series'){
    var n=Math.max(0, Math.min(6, f.seriesN||0));
    title=t('Halves of halves');
    lead=t('Each new piece is half of what is left. The pieces fill more and more of the pie, but a little sliver is always left.');
    inner=seriesSvg(n)+
      '<div class="g181-row">'+
      '<button type="button" data-frac-add="1"'+(n>=6?' disabled':'')+'>'+esc(t('Add half of what is left'))+'</button>'+
      '<button type="button" data-g181reset="truth">'+esc(t('Reset'))+'</button></div>';
    if(!n) count='';
    else if(n===1) count=t('1 piece so far: 1/2. The other half of the pie is still empty.');
    else count=t('{n} pieces so far: {sum}. The leftover sliver is {rest} of the pie.',{n:String(n),sum:fracSum(n),rest:fracDenom(n)});
    if(n>=6) count=(count?count+' ':'')+t('This sliver is too thin to cut here. If you halve it in your mind, a smaller sliver is still left.');
  }else if(kind==='squares'){
    title=t('The same amount');
    lead=t('Both cuts make two halves. Fair means the same amount. The pieces do not have to be the same shape.');
    inner=squaresSvg()+
      '<div class="g181-row"><button type="button" data-g181reset="truth">'+esc(t('Reset'))+'</button></div>';
    count=t('Each square has 2 pieces. A rectangle half and a triangle half are the same amount.');
  }else{
    title=t('The same share');
    lead=t('Two quarters cover one half. They are the same amount.');
    var on=!!f.equalOn;
    inner=equalSvg(on)+
      '<div class="g181-row">'+
      '<button type="button" data-frac-equal="1">'+esc(t('Show 2/4 on 1/2'))+'</button>'+
      '<button type="button" data-g181reset="truth">'+esc(t('Reset'))+'</button></div>';
    count=on?t('2/4 covers 1/2. They are the same amount.'):'';
  }
  var body='<p class="soft" data-frac-truth-lead="1">'+esc(lead)+'</p>'+inner+
    '<p class="kline" id="fracTruthMsg" data-frac-truth="'+esc(kind)+'" aria-live="polite">'+esc(count)+'</p>'+
    '<div class="g181-row"><button type="button" data-frac-back="1">'+esc(t('Back'))+'</button></div>';
  el.innerHTML=(typeof patShell==='function'?patShell(esc(title),body):'<div class="card"><h2>'+esc(title)+'</h2>'+body+'</div>');
  var add=el.querySelector('[data-frac-add]');
  if(add) add.onclick=function(){
    if((f.seriesN||0)>=6) return;
    f.seriesN=Math.min(6,(f.seriesN||0)+1);
    softChime(Math.min(7,(f.seriesN||1)-1));
    fracDrawTruth('series');
  };
  var eq=el.querySelector('[data-frac-equal]');
  if(eq) eq.onclick=function(){
    f.equalOn=true;
    softChime(3);
    fracDrawTruth('equal');
  };
  var rst=el.querySelector('[data-g181reset="truth"]');
  if(rst) rst.onclick=function(){
    if(kind==='series'){ f.seriesN=0; fracDrawTruth('series'); }
    else if(kind==='equal'){ f.equalOn=false; fracDrawTruth('equal'); }
    else fracDrawTruth('squares');
  };
  var back=el.querySelector('[data-frac-back]');
  if(back) back.onclick=function(){
    try{ f.truth=null; if(typeof patFracHome106==='function') patFracHome106(); else if(typeof patShareDraw106==='function') patShareDraw106(); }catch(e){}
  };
  if(typeof turtlePlace105==='function') try{turtlePlace105('patterns')}catch(e){}
}

function seriesSvg(n){
  var ink=night()?'#d9c9a8':'#72583f';
  var golds=['#e6b454','#e0a04a','#d48a3c','#c45a3a','#b8874a','#c9a05a','#d4b36a','#e2c57a','#ead28a','#f0dc9a','#f4e4aa','#f7ecc0'];
  var paperC=paper();
  var paths='', i, a,b, large, x1,y1,x2,y2;
  /* start at top, go clockwise: first piece is a half (pi radians). */
  var ang=-Math.PI/2;
  for(i=0;i<Math.max(0,n);i++){
    var sweep=Math.PI/Math.pow(2,i); /* 1/2, 1/4, ... of the circle is  pi, pi/2, ...  wait: half the pie is 180deg = pi. Yes sweep = 2pi * 1/2^{i+1} = pi/2^i. */
    a=ang; b=ang+sweep; ang=b;
    large=sweep>Math.PI?1:0;
    x1=(50+40*Math.cos(a)).toFixed(2); y1=(50+40*Math.sin(a)).toFixed(2);
    x2=(50+40*Math.cos(b)).toFixed(2); y2=(50+40*Math.sin(b)).toFixed(2);
    paths+='<path data-frac-piece="'+(i+1)+'" d="M50 50 L'+x1+' '+y1+' A40 40 0 '+large+' 1 '+x2+' '+y2+' Z" fill="'+golds[i%golds.length]+'" stroke="'+ink+'" stroke-width="1.4"/>';
  }
  /* leftover sliver */
  if(n>0 && n<=6){
    a=ang; b=-Math.PI/2+Math.PI*2;
    if(b-a>0.0001){
      x1=(50+40*Math.cos(a)).toFixed(2); y1=(50+40*Math.sin(a)).toFixed(2);
      x2=(50+40*Math.cos(b)).toFixed(2); y2=(50+40*Math.sin(b)).toFixed(2);
      var sw=b-a; large=sw>Math.PI?1:0;
      paths+='<path data-frac-rest="1" d="M50 50 L'+x1+' '+y1+' A40 40 0 '+large+' 1 '+x2+' '+y2+' Z" fill="'+paperC+'" stroke="'+ink+'" stroke-width="1.4"/>';
    }
  }else if(n<=0){
    paths+='<circle cx="50" cy="50" r="40" fill="'+paperC+'" stroke="'+ink+'" stroke-width="1.8"/>';
  }
  return '<svg class="frac-truth-art" viewBox="0 0 100 100" width="220" height="220" role="img" aria-label="'+esc(t('Fill the pie'))+'">'+paths+'</svg>';
}

function squaresSvg(){
  var ink=night()?'#d9c9a8':'#72583f';
  var a='#eac77d', b='#e6b454';
  function sq(label, cuts){
    return '<figure><svg class="frac-truth-art" viewBox="0 0 80 90" width="160" height="180" role="img" aria-label="'+esc(label)+'">'+
      cuts+
      '</svg><figcaption>'+esc(label)+'</figcaption></figure>';
  }
  var straight='<rect x="8" y="8" width="32" height="64" fill="'+a+'" stroke="'+ink+'" stroke-width="1.8" data-half="L"/>'+
    '<rect x="40" y="8" width="32" height="64" fill="'+b+'" stroke="'+ink+'" stroke-width="1.8" data-half="R"/>';
  var diag='<path d="M8 8 L72 8 L8 72 Z" fill="'+a+'" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round" data-half="L"/>'+
    '<path d="M72 8 L72 72 L8 72 Z" fill="'+b+'" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round" data-half="R"/>';
  return '<div class="frac-sq">'+sq(t('Cut straight'),straight)+sq(t('Corner to corner'),diag)+'</div>';
}

function equalSvg(on){
  var ink=night()?'#d9c9a8':'#72583f';
  var gold='#e6b454', q1='#eac77d', q2='#c45a3a';
  /* Base: left half of the pie filled (from top, clockwise? show left/right as vertical diameter). */
  /* A vertical cut: left semicircle is a half. Overlay two quarter wedges on that half when on. */
  var half='<path d="M50 50 L50 10 A40 40 0 0 0 50 90 Z" fill="'+gold+'" stroke="'+ink+'" stroke-width="1.6" data-half-base="1"/>';
  var empty='<path d="M50 50 L50 90 A40 40 0 0 0 50 10 Z" fill="'+paper()+'" stroke="'+ink+'" stroke-width="1.6"/>';
  var ov='';
  var halfDash='';
  if(on){
    ov='<path data-quarter="1" d="M50 50 L50 10 A40 40 0 0 0 10 50 Z" fill="'+q1+'" fill-opacity="0.85" stroke="'+ink+'" stroke-width="1.5"/>'+
       '<path data-quarter="2" d="M50 50 L10 50 A40 40 0 0 0 50 90 Z" fill="'+q2+'" fill-opacity="0.8" stroke="'+ink+'" stroke-width="1.5"/>';
    /* 2 units outside the pie so the dashed half is visible over the quarter strokes. */
    halfDash='<path d="M50 8 A42 42 0 0 0 50 92" fill="none" stroke="'+ink+'" stroke-width="1.8" stroke-dasharray="3.5 2.5" data-half-outline="1"/>';
  }
  return '<svg class="frac-truth-art" viewBox="0 0 100 100" width="220" height="220" role="img" aria-label="'+esc(t('The same share'))+'">'+empty+half+ov+halfDash+'</svg>';
}

function enhanceFracTruths(){
  var el=$('patterns'); if(!el) return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='frac') return}catch(e){return}
  if(el.querySelector('[data-frac-truth]')) return; /* already on a truth screen (the msg carries the attr) — wait, we also want buttons on the home. */
  if(el.querySelector('[data-g181truth]')) return;
  var bar=document.createElement('div');
  bar.className='g181-truth';
  bar.setAttribute('data-g181truth','1');
  bar.innerHTML=
    '<button type="button" data-open-truth="series">'+esc(t('Halves of halves'))+'</button>'+
    '<button type="button" data-open-truth="squares">'+esc(t('The same amount'))+'</button>'+
    '<button type="button" data-open-truth="equal">'+esc(t('The same share'))+'</button>';
  var card=el.querySelector('.card')||el;
  card.appendChild(bar);
  bar.querySelectorAll('[data-open-truth]').forEach(function(b){
    b.onclick=function(){ fracOpenTruth(b.getAttribute('data-open-truth')); };
  });
}

/* -------- captions / zoom hooks -------- */
function mandelCaption(prev){
  return function(kind){
    if(!kind || kind==='mandel') return t('The Mandelbrot set is made by repeating a simple rule. Its edge has wiggles inside wiggles. Reset brings you home.');
    return typeof prev==='function'?prev(kind):'';
  };
}
function mandelScale(prev){
  return function(zoom){
    var final=EXD.ready && (EXD.lastStep===1 || !EXD.lastStep);
    /* Only at the arithmetic/no-worker cap, or at zoom ≥ 10^13 when the frame is honestly flat. */
    if(EXD.atCap) return t('This is as far as this lamp can see.');
    if(zoom>=1e13 && final && EXD.flat && !EXD.wiggles) return t('This is as far as this lamp can see.');
    if(zoom>=2e17) return t('Deeper than one atom compared with the whole Earth.');
    if(zoom>=1e15){
      if(EXD.wiggles) return t('You have looked very, very close. The edge still has wiggles. Reset brings you home.');
      return t('You have looked very, very close. Reset brings you home.');
    }
    return typeof prev==='function'?prev(zoom):'';
  };
}

function hookZoomReset(){
  /* After layoutZoom181 plants the Reset button, also clear high-prec state. */
  var el=$('patterns'); if(!el) return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='zoom') return}catch(e){return}
  var rst=el.querySelector('[data-g181reset="zoom"]');
  if(rst&&!rst._deep){
    var old=rst.onclick;
    rst.onclick=function(){
      resetExQ(PAT106.ex);
      EXD.job++;
      if(typeof old==='function') old.apply(this,arguments);
    };
    rst._deep=1;
  }
}

/* -------- install -------- */
function installDeep(){
  cssDeep();
  watchLongTasks();

  hookDeep('patGrowDrawOn106', function(prev){
    return function(cv,rec){ return growDrawDeep(cv, rec|| (PAT106&&PAT106.grow), prev); };
  });
  hookDeep('patGrowDraw106', function(prev){
    return function(){
      var g=PAT106&&PAT106.grow, keep=g&&g.depth, sh=g&&(g.shape||'tree');
      var LODSH={tree:1,antler:1,dragon:1,levy:1,triangle:1,sunflower:1,fern:1,koch:1,htree:1,pythagoras:1,hilbert:1};
      var r=prev.apply(this,arguments);
      try{
        /* v171 scrubGrow clamps depth to its cap on every redraw. Restore a deeper
           LOD depth and re-render the visible window without going through scrub again. */
        if(g && LODSH[sh] && keep>(g.depth||0)){
          g.depth=keep;
          if(g.msg&&/as far as this seed grows|hasta aquí llega/i.test(g.msg)) g.msg='';
          var cv=$('patGrowCv');
          if(cv) growDrawDeep(cv,g,null);
          var msg=$('patGrowMsg'); if(msg) msg.textContent=g.msg||'';
        }
        growAfterDraw();
      }catch(e){}
      return r;
    };
  });
  hookDeep('patGrowStep106', growStepDeep);
  hookDeep('patGrowNew106', function(prev){
    return function(){
      try{ if(PAT106&&PAT106.grow) growResetView(PAT106.grow); }catch(e){}
      return prev.apply(this,arguments);
    };
  });

  hookDeep('ehDraw181', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{ehAfterDraw()}catch(e){}
      return r;
    };
  });
  hookDeep('ehOpen181', function(prev){
    return function(){
      try{ if(root.EH181){ EH181.roots=0; EH181._pendingRoot=0; } }catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hookDeep('ehFill181', function(prev){
    return function(idx){
      var E=root.EH181;
      if(E && (E.level||0)>=3){
        /* Should already be re-rooting; ignore stray fills. */
        return;
      }
      return prev.apply(this,arguments);
    };
  });

  hookDeep('patExCanZoom106', function(prev){
    return function(span){
      var ex=PAT106&&PAT106.ex;
      var kind=ex&&((ex.kind==='zoom'?ex.fractal:ex.kind)||'mandel');
      if(kind==='mandel') return deepSpanOk(span) && span<1e6;
      return typeof prev==='function'?prev(span):true;
    };
  });
  hookDeep('patExRender106', function(prev){
    return function(cv,rec,opts){ return mandelRender(cv,rec,opts,prev); };
  });
  hookDeep('patExAt106', function(prev){
    return function(cv, clientX, clientY){
      var p=prev.apply(this,arguments);
      if(p){
        EXD.lastU=p.u; EXD.lastV=p.v;
        EXD.lastAspect=(cv&&cv.height&&cv.width)?(cv.height/cv.width):1;
        EXD.lastAt=1;
      }
      return p;
    };
  });
  hookDeep('patExZoomOf106', function(prev){
    return function(span){
      var ex=PAT106&&PAT106.ex;
      var kind=ex&&((ex.kind==='zoom'?ex.fractal:ex.kind)||'mandel');
      if(kind==='mandel') return mandelZoomOf(span, EXD.spanQ);
      return typeof prev==='function'?prev(span): (3.5/Math.max(span,1e-300));
    };
  });
  hookDeep('patExTap106', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      /* Turtle hits call At but not Go; do not leave a stale tap for the next Back. */
      EXD.lastAt=0;
      return r;
    };
  });
  hookDeep('patExGo106', function(prev){
    return function(nx,ny,span,slow){
      var ex=PAT106&&PAT106.ex;
      var kind=ex&&((ex.kind==='zoom'?ex.fractal:ex.kind)||'mandel');
      if(kind==='mandel'){
        if(!deepSpanOk(span)){
          ex.limit=true;
          var lim=$('patExLimit'); if(lim) lim.textContent=t('This is as far as this lamp can see.');
          return;
        }
        synchExQ(ex);
        var got=applyDeepGo(nx,ny,span);
        /* Animate at most a cheap preview, then kick a progressive render. */
        var start={cx:ex.cx,cy:ex.cy,span:ex.span};
        var end=got;
        var cv=$('patExCv');
        function go(k){
          ex.cx=start.cx+(end.cx-start.cx)*k;
          ex.cy=start.cy+(end.cy-start.cy)*k;
          ex.span=start.span+(end.span-start.span)*k;
          ex.limit=false;
          if(k>=1){
            ex.cx=end.cx; ex.cy=end.cy; ex.span=end.span;
            if(cv) mandelRender(cv,ex,{},null);
          }else if(cv){
            /* very coarse preview during the tween */
            EXD.job++; mandelKick(cv,ex,8,0);
          }
          var sc=$('patExScale'); if(sc&&typeof patExScaleLine106==='function') sc.textContent=patExScaleLine106(mandelZoomOf(ex.span, EXD.spanQ));
        }
        if(reduced()||!slow){ go(1); return; }
        var t0=performance.now(), dur=700;
        var tick=function(now){
          var k=Math.min(1,(now-t0)/dur), e=k*k*(3-2*k);
          go(e);
          if(k<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        return;
      }
      return prev.apply(this,arguments);
    };
  });
  hookDeep('patExCaption106', mandelCaption);
  hookDeep('patExScaleLine106', mandelScale);
  hookDeep('patExDraw106', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{hookZoomReset()}catch(e){}
      return r;
    };
  });
  hookDeep('patExSetKind106', function(prev){
    return function(kind){
      if(kind==='mandel'||!kind) resetExQ(PAT106&&PAT106.ex);
      return prev.apply(this,arguments);
    };
  });
  hookDeep('layoutZoom181', function(prev){
    return function(){
      var r=prev&&prev.apply(this,arguments);
      try{hookZoomReset()}catch(e){}
      return r;
    };
  });


  ['patFracHome106','patShareDraw106','patJarDraw106','patFoldDraw106'].forEach(function(n){
    hookDeep(n, function(prev){
      return function(){
        var r=prev.apply(this,arguments);
        try{enhanceFracTruths()}catch(e){}
        return r;
      };
    });
  });

  hookDeep('enhanceFrac181', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{enhanceFracTruths()}catch(e){}
      return r;
    };
  });
  /* Also attach when frac home/share/jar/fold redraw. enhanceFrac181 already hooked there in v181; our hookDeep wraps that wrap. */

  /* If install of v181 already ran, patch current screen once. */
  try{
    if(typeof PAT106==='object'&&PAT106.unit==='grow') growAfterDraw();
    if(typeof PAT106==='object'&&PAT106.unit==='frac') enhanceFracTruths();
    if(typeof PAT106==='object'&&PAT106.unit==='zoom') hookZoomReset();
  }catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installDeep);
else installDeep();


function ehGotoExp(n){
  n=Math.max(0,n|0);
  var E=root.EH181; if(!E) return 0;
  E.roots=Math.floor(n/3);
  E.level=n%3;
  E.filled=[0,0,0,0,0,0];
  E.busy=false;
  E._pendingRoot=0;
  if(typeof ehDraw181==='function') ehDraw181();
  return ehExp();
}
function mandelSetView(cx,cy,span){
  var F=FBITS, ex=PAT106&&PAT106.ex;
  EXD.cxQ=fpToDec(decToFp(String(cx),F),F,DEC_DIGITS);
  EXD.cyQ=fpToDec(decToFp(String(cy),F),F,DEC_DIGITS);
  EXD.spanQ=fpToDec(decToFp(String(span),F),F,DEC_DIGITS);
  if(ex){
    ex.kind='mandel';
    ex.cx=fpToNum(decToFp(EXD.cxQ,F),F);
    ex.cy=fpToNum(decToFp(EXD.cyQ,F),F);
    ex.span=fpToNum(decToFp(EXD.spanQ,F),F);
    ex.limit=!deepSpanOk(ex.span);
    try{
      var sc=document.getElementById('patExScale');
      if(sc&&typeof patExScaleLine106==='function'){
        var z=mandelZoomOf(ex.span, EXD.spanQ);
        sc.textContent=patExScaleLine106(z);
      }
    }catch(e){}
  }
  return ex?{cx:ex.cx,cy:ex.cy,span:ex.span,cxQ:EXD.cxQ,cyQ:EXD.cyQ,spanQ:EXD.spanQ}:null;
}

function heighwayEdges(depth,W,H){
  W=W||360; H=H||360;
  var ax=W*0.22, ay=H*0.55, bx=W*0.78, by=H*0.55, out=[], seen={};
  function add(a,b,c,d){
    var k=[a.toFixed(3),b.toFixed(3),c.toFixed(3),d.toFixed(3)].join(',');
    var k2=[c.toFixed(3),d.toFixed(3),a.toFixed(3),b.toFixed(3)].join(',');
    if(seen[k]||seen[k2]) return;
    seen[k]=1; out.push([a,b,c,d]);
  }
  function fold(x0,y0,x1,y1,d,sign){
    if(d>=depth){ add(x0,y0,x1,y1); return; }
    var mx=(x0+x1)/2, my=(y0+y1)/2, dx=x1-x0, dy=y1-y0;
    var px=mx-sign*dy/2, py=my+sign*dx/2;
    fold(x0,y0,px,py,d+1,1);
    fold(px,py,x1,y1,d+1,-1);
  }
  fold(ax,ay,bx,by,0,1);
  return out;
}
function kochAreaRatio(depth){
  /* Shoelace area of the outward Koch snowflake over the starting down-triangle. */
  depth=Math.max(0,depth|0);
  var W=360,H=360,sK=Math.min(W,H)*0.82, x0=(W-sK)/2, y0=H*0.22, x1=x0+sK, y1=y0, x2=x0+sK/2, y2=y0+sK*Math.sqrt(3)/2;
  function area(pts){
    var a=0,i,n=pts.length;
    for(i=0;i<n;i++){ var p=pts[i],q=pts[(i+1)%n]; a+=p[0]*q[1]-q[0]*p[1]; }
    return Math.abs(a)/2;
  }
  var base=area([[x0,y0],[x1,y1],[x2,y2]]);
  var sides=[[[x0,y0],[x1,y1]],[[x1,y1],[x2,y2]],[[x2,y2],[x0,y0]]];
  var d,s,next,ax,ay,bx,by,ux,uy,mx,my,nx,ny,px,py;
  for(d=0;d<depth;d++){
    next=[];
    for(s=0;s<sides.length;s++){
      ax=sides[s][0][0]; ay=sides[s][0][1]; bx=sides[s][1][0]; by=sides[s][1][1];
      ux=(bx-ax)/3; uy=(by-ay)/3;
      mx=ax+ux; my=ay+uy; nx=ax+2*ux; ny=ay+2*uy;
      px=ax+ux+(ux/2+uy*Math.sqrt(3)/2);
      py=ay+uy+(uy/2-ux*Math.sqrt(3)/2);
      next.push([[ax,ay],[mx,my]],[[mx,my],[px,py]],[[px,py],[nx,ny]],[[nx,ny],[bx,by]]);
    }
    sides=next;
  }
  var pts=[],i;
  for(i=0;i<sides.length;i++) pts.push(sides[i][0]);
  return area(pts)/base;
}

root.IL181DEEP={
  version:181,
  sliceMs:SLICE_MS,
  minCell:MIN_PX,
  ehMinCell:EH_MIN_PX,
  maxSlice:function(){return MAX_SLICE},
  lastLong:function(){return LAST_LONG},
  resetSlices:function(){MAX_SLICE=0;LAST_LONG=0},
  cellPx:cellPx,
  tooFine:tooFine,
  ehExp:ehExp,
  ehCountKindly:ehCountKindly,
  ehMinCellPx:ehMinCellPx,
  ehReRootNow:function(){ehReRootNow(false)},
  ehRewriteMsg:ehRewriteMsg,
  fracOpenTruth:fracOpenTruth,
  fracDrawTruth:fracDrawTruth,
  resetMandelHome:function(){resetExQ(PAT106&&PAT106.ex)},
  needPert:needPert,
  deepSpanOk:deepSpanOk,
  exState:function(){return {cxQ:EXD.cxQ,cyQ:EXD.cyQ,spanQ:EXD.spanQ,ready:EXD.ready,glitches:EXD.glitches,maxSlice:EXD.maxSlice,job:EXD.job,lastPass:EXD.lastPass,lastStep:EXD.lastStep,wiggles:EXD.wiggles,unique:EXD.unique,maxFrac:EXD.maxFrac,flat:EXD.flat,atCap:EXD.atCap,iters:EXD.iters}},
  decDigits:DEC_DIGITS,
  hilbertMax:HILBERT_MAX,
  sunN:sunN181,
  fernWant:fernWant,
  patchJar:patchJarDeep,
  mandelZoomOf:mandelZoomOf,
  mandelItersFor:mandelItersFor,
  oldCapOf:oldCapOf,
  heighwayEdges:heighwayEdges,
  kochAreaRatio:kochAreaRatio,
  applyDeepGo:applyDeepGo,
  ehGotoExp:ehGotoExp,
  mandelSetView:mandelSetView,
  t:t,
  ES:ES
};
root.ehGotoExp181=ehGotoExp;
root.mandelSetView181=mandelSetView;

root.fracOpenTruth181=fracOpenTruth;
root.ehReRootNow181=function(){ehReRootNow(false)};
root.ehExp181=ehExp;
root.ehCountKindly181=ehCountKindly;

})(typeof window!=='undefined'?window:this);
/* Lamplight v182 — QA fixes for live v181 (hunt dots, Endless re-root on real taps,
   Same Shape question, Float at cap, Sound Draws tone cut, Year Wheel tap size is
   in year-wheel/index.html, honest honeycomb count, lighter first paint). */
(function(root){
'use strict';

function $(id){return document.getElementById(id)}
function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  if(prev._v182)return true;
  var next=wrap(prev);
  next._v182=1;
  root[name]=next;
  return true;
}
function t182(s, vars){
  var out=s;
  try{
    if(typeof gT==='function') out=gT(s);
    else if(root.IL181&&typeof IL181.t==='function') out=IL181.t(s);
  }catch(e){}
  if(vars){
    Object.keys(vars).forEach(function(k){
      out=String(out).split('{'+k+'}').join(String(vars[k]));
    });
  }
  return out;
}
function reduced182(){
  try{return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}
}

/* ---- #1: redraw gold hunt dots after every deep Mandelbrot blit ---- */
function huntMode182(){
  try{
    if(root.IL163&&typeof IL163.mode==='function') return IL163.mode();
  }catch(e){}
  try{return (PAT106&&PAT106.ex&&PAT106.ex.mode163)||''}catch(e2){return ''}
}
function paintHuntDots182(cv){
  if(paintHuntDots182._busy) return 0;
  cv=cv||$('patExCv');
  if(!cv||typeof PAT106!=='object'||!PAT106.ex) return 0;
  var m=huntMode182();
  if(m!=='baby'&&m!=='antenna') return 0;
  var IL=root.IL163, items=null;
  if(m==='baby'&&IL&&IL.babies){
    items=IL.babies.map(function(b){return {cx:b.cx,cy:b.cy,label:''}});
  }else if(m==='antenna'&&IL&&IL.bulbs){
    items=[3,4,5].map(function(p){var b=IL.bulbs[p];return {cx:b.cx,cy:b.cy,label:String(b.spokes)}});
  }
  if(!items||!items.length) return 0;
  var ex=PAT106.ex, x=cv.getContext('2d');
  if(!x) return 0;
  var W=cv.width, H=cv.height;
  var span=ex.span, cx=ex.cx, cy=ex.cy;
  var xmin=cx-span/2, ymin=cy-span*H/W/2;
  var n=0;
  paintHuntDots182._busy=1;
  try{
    x.save();
    items.forEach(function(it){
      var u=(it.cx-xmin)/span, v=(it.cy-ymin)/(span*H/W);
      if(u<-0.05||u>1.05||v<-0.05||v>1.05) return;
      var r=Math.max(8,Math.min(W,H)*0.035);
      x.beginPath();x.arc(u*W,v*H,r,0,Math.PI*2);
      x.fillStyle='rgba(230,180,84,.55)';
      x.strokeStyle='rgba(255,246,216,.9)';x.lineWidth=1.6;x.fill();x.stroke();
      if(it.label){
        x.fillStyle='#3a2a1a';x.font='700 13px system-ui,sans-serif';
        x.textAlign='center';x.textBaseline='middle';
        x.fillText(String(it.label),u*W,v*H);
      }
      n++;
    });
    x.restore();
  }catch(e){}
  paintHuntDots182._busy=0;
  return n;
}
function wrapPutImageData182(){
  var proto=CanvasRenderingContext2D.prototype;
  if(proto.putImageData._v182) return;
  var prev=proto.putImageData;
  proto.putImageData=function(){
    var r=prev.apply(this,arguments);
    try{
      var cv=this.canvas;
      if(cv&&cv.id==='patExCv') paintHuntDots182(cv);
    }catch(e){}
    return r;
  };
  proto.putImageData._v182=1;
}

/* ---- #2: real-tap fill path uses the hooked global draw, so re-root runs ---- */
function litHexCount182(){
  var stage=$('eh181stage');
  var svg=stage&&stage.querySelector('svg');
  if(!svg) return 0;
  return svg.querySelectorAll('path.eh181-on').length;
}
function patchJarLine182(){
  var msg=$('eh181msg');
  if(!msg||typeof EH181!=='object') return;
  var level=EH181.level||0;
  var filled=(EH181.filled||[]).filter(Boolean).length;
  if((EH181.roots||0)>=1 && level===0 && filled===0){
    var hold=t182('Each tile you see holds everything you built before.');
    var cur=msg.textContent||'';
    if(cur && cur.indexOf(hold)<0){
      var next=cur.replace(/\.+$/,'')+'. '+hold;
      if(msg.textContent!==next) msg.textContent=next;
    }
    return;
  }
  if(level<1||level>=3) return;
  if(filled<1) return;
  var lit=litHexCount182();
  var mid=1,i;for(i=0;i<level;i++) mid*=7;
  if(!lit) lit=mid*(1+filled);
  var line=t182('The middle tile has {mid}. {lit} are filled on the screen.',{mid:mid,lit:lit});
  if(msg.textContent!==line) msg.textContent=line;
}
function ehFill182(idx){
  var E=root.EH181;if(!E) return;
  if(E.busy||E.level>=3||E.filled[idx]) return;
  E.filled[idx]=1;
  var draw=root.ehDraw181;
  if(E.filled.filter(Boolean).length<6){
    if(typeof draw==='function') draw();
    patchJarLine182();
    return;
  }
  E.busy=true;
  if(typeof draw==='function') draw();
  patchJarLine182();
  var stage=$('eh181stage'), svg=stage&&stage.querySelector('svg');
  var ang=19.1066, sc=Math.sqrt(7);
  function next(){
    E.level=Math.min(E.level+1,3);
    E.filled=[0,0,0,0,0,0];
    E.busy=false;
    E.zooms=(E.zooms||0)+1;
    try{if(E.zooms===1&&typeof earn124==='function') earn124('hex')}catch(e){}
    if(typeof draw==='function') draw();
    patchJarLine182();
  }
  if(!svg){next();return}
  if(reduced182()){
    svg.classList.add('eh181-fade');svg.style.opacity='0.2';
    setTimeout(next,800);
  }else{
    svg.classList.add('eh181-zoom');
    svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
    setTimeout(next,1400);
  }
}
function rebindEndless182(){
  var el=$('patterns');
  if(!el||typeof PAT106!=='object'||PAT106.unit!=='endless') return;
  var tile=el.querySelector('[data-pat="endless"]')||document.querySelector('#patterns [data-pat="endless"]');
  /* palette / reset: point at the hooked globals */
  el.querySelectorAll('[data-g181reset="endless"]').forEach(function(rst){
    rst.onclick=function(){if(!EH181.busy&&typeof root.ehOpen181==='function') root.ehOpen181()};
  });
  el.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){
      EH181.pal=+b.getAttribute('data-g181pal-i');
      if(typeof root.ehDraw181==='function') root.ehDraw181();
      patchJarLine182();
    };
  });
  /* rewrite mid-fill count after deep's jar line (rule 7: count what's drawn) */
  try{if(root.IL181DEEP&&typeof IL181DEEP.ehRewriteMsg==='function') IL181DEEP.ehRewriteMsg()}catch(e){}
  patchJarLine182();
  void tile;
}
var _ehCap182=false;
function onEndlessClick182(ev){
  var t=ev.target&&ev.target.closest?ev.target.closest('button, [data-pat], [data-g181reset], [data-g181pal-i]'):null;
  if(!t) return;
  /* grid tile */
  if(t.getAttribute&&t.getAttribute('data-pat')==='endless'){
    ev.preventDefault();ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    if(typeof root.ehOpen181==='function') root.ehOpen181();
    setTimeout(rebindEndless182,0);
    return;
  }
  if(typeof PAT106!=='object'||PAT106.unit!=='endless') return;
  if(t.getAttribute&&t.getAttribute('data-g181reset')==='endless'){
    if(EH181&&EH181.busy){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();return}
    ev.preventDefault();ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    if(typeof root.ehOpen181==='function') root.ehOpen181();
    setTimeout(rebindEndless182,0);
    return;
  }
  var stage=$('eh181stage');
  if(stage&&stage.contains(t)&&t.tagName==='BUTTON'&&!t.getAttribute('data-g181reset')&&!t.getAttribute('data-g181pal-i')){
    var btns=Array.prototype.slice.call(stage.querySelectorAll('button'));
    var idx=btns.indexOf(t);
    if(idx<0) return;
    ev.preventDefault();ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    ehFill182(idx);
  }
}
function watchEndless182(){
  if(watchEndless182._on) return;
  watchEndless182._on=1;
  document.addEventListener('click',onEndlessClick182,true);
  var ticking=false, lastSig='';
  var obs=new MutationObserver(function(){
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(function(){
      ticking=false;
      if(typeof PAT106!=='object'||PAT106.unit!=='endless') return;
      try{
        var E=EH181||{};
        var sig=[E.level,(E.filled||[]).join(''),E.roots,E.busy,E._pendingRoot,litHexCount182()].join('|');
        if(sig===lastSig) return;
        lastSig=sig;
        rebindEndless182();
        if((E.level||0)>=3&&!E.busy&&!E._pendingRoot&&!_ehCap182){
          _ehCap182=true;
          if(typeof root.ehDraw181==='function') root.ehDraw181();
        }
        if((E.level||0)<3) _ehCap182=false;
      }catch(e){}
    });
  });
  var el=$('patterns')||document.body;
  if(el) obs.observe(el,{childList:true,subtree:true});
}

/* ---- #3: Same Shape scale grows down, question stays readable ---- */
function css182(){
  if($('il182css')) return;
  var s=document.createElement('style');s.id='il182css';
  s.textContent=
    '#patterns [data-same-prompt] svg,#patterns .pat-art svg,#patterns .pat-art .lamp-art63{'+
      'transform-origin:center top!important}'+
    '#patterns [data-same181] p.soft{position:relative;z-index:3;background:var(--card,#fffdf8)}'+
    '#patterns [data-same-prompt]{overflow:visible;display:flex;flex-direction:column;align-items:center}';
  document.head.appendChild(s);
}

/* ---- #4: Float to the Sky at the seed cap (don't rely on a missing extraUI global) ---- */
function atSeedCap182(g){
  if(!g) return false;
  if(g._rest) return true;
  var cap=6;
  try{if(root.IL154&&typeof IL154.capOf==='function') cap=IL154.capOf(g.shape)}catch(e){}
  if((g.depth||0)>=cap) return true;
  if(/as far as this seed grows|hasta aquí llega esta semilla/i.test(g.msg||'')) return true;
  return false;
}
function ensureFloat182(){
  var el=$('patterns');
  if(!el||typeof PAT106!=='object'||PAT106.unit!=='grow') return;
  var g=PAT106.grow;if(!g) return;
  if(el.querySelector('[data-gaf3float]')) return;
  if(!atSeedCap182(g)) return;
  var btn=document.createElement('button');
  btn.type='button';
  btn.className='g3btn';
  btn.setAttribute('data-gaf3float','1');
  btn.textContent=t182('Float to the Sky');
  btn.onclick=function(){
    var gg=PAT106&&PAT106.grow;if(!gg) return;
    var go=function(){try{if(root.IL154&&typeof IL154.floatSky==='function') IL154.floatSky()}catch(e){}};
    if(!gg._rest){
      gg._rest=1;
      var c=$('patGrowCv');
      if(root.IL154&&typeof IL154.fadeRest==='function') IL154.fadeRest(c,go);
      else go();
    }else go();
  };
  var bar=el.querySelector('[data-g181ctrl]')||el.querySelector('[data-gaf3ctrl]')||el.querySelector('.g181-row');
  if(bar) bar.appendChild(btn);
  else el.appendChild(btn);
}

/* ---- #5: cut Sound Draws tone on Back, hide, pagehide, Soft sounds off ---- */
function stopSoundTone182(){
  try{
    var st=typeof PAT106==='object'&&PAT106.ch;
    if(st&&st.osc){
      try{st.osc.stop()}catch(e){}
      try{st.osc.disconnect()}catch(e2){}
      st.osc=null;
    }
    if(st&&st.gain){
      try{st.gain.gain&&(st.gain.gain.value=0)}catch(e3){}
      try{st.gain.disconnect()}catch(e4){}
    }
  }catch(e){}
}

/* ---- #8: don't run the 180-step settle on the first paint stack ---- */
function wrapSettle182(){
  hook('soundSettleNow181',function(prev){
    return function(){
      var self=this,args=arguments;
      var later=function(){try{prev.apply(self,args)}catch(e){}};
      if(typeof requestIdleCallback==='function'){
        requestIdleCallback(later,{timeout:200});
      }else{
        requestAnimationFrame(function(){setTimeout(later,0)});
      }
    };
  });
}

function wrapNav182(){
  /* Do not replace window.show — seatbelt/back/parity require the v99 history wrap to stay outermost. */
  hook('showCore10_97',function(prev){
    return function(id){
      try{
        if(id!=='patterns') stopSoundTone182();
        else if(typeof PAT106==='object'&&PAT106.unit&&PAT106.unit!=='sound') stopSoundTone182();
      }catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      try{
        if(id!=='patterns') stopSoundTone182();
      }catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('lampSfxSet73',function(prev){
    return function(on){
      var r=prev.apply(this,arguments);
      try{if(!on) stopSoundTone182()}catch(e){}
      return r;
    };
  });
  document.addEventListener('visibilitychange',function(){
    if(document.hidden) stopSoundTone182();
  });
  window.addEventListener('pagehide',stopSoundTone182);
  window.addEventListener('blur',function(){/* do not cut on blur: moving between controls shouldn't kill the tone */});
}

function wrapGrow182(){
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{ensureFloat182()}catch(e){}
      return r;
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{ensureFloat182()}catch(e){}
      return r;
    };
  });
}
function wrapHunt182(){
  hook('patExDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{paintHuntDots182($('patExCv'))}catch(e){}
      return r;
    };
  });
  hook('patExRender106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{paintHuntDots182($('patExCv'))}catch(e){}
      return r;
    };
  });
}

function install(){
  css182();
  wrapPutImageData182();
  wrapHunt182();
  watchEndless182();
  wrapGrow182();
  wrapNav182();
  wrapSettle182();
  try{rebindEndless182()}catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL182={
  version:182,
  paintHuntDots:paintHuntDots182,
  litHexCount:litHexCount182,
  ehFill:ehFill182,
  ensureFloat:ensureFloat182,
  stopSoundTone:stopSoundTone182,
  patchJarLine:patchJarLine182
};
root.paintHuntDots182=paintHuntDots182;
root.ehFill182=ehFill182;
root.stopSoundTone182=stopSoundTone182;

})(typeof window!=='undefined'?window:this);
/* Lamplight v183 — leftover v182 QA fails: Sound Draws Back-link tone cut,
   Same Shape scale limited to the quiz prompt with reserved layout space. */
(function(root){
'use strict';

function $(id){return document.getElementById(id)}
function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  if(prev._v183)return true;
  var next=wrap(prev);
  next._v183=1;
  root[name]=next;
  return true;
}

function stopSoundTone183(){
  try{
    if(typeof root.stopSoundTone182==='function'){
      root.stopSoundTone182();
      return;
    }
  }catch(e){}
  try{
    var st=typeof PAT106==='object'&&PAT106.ch;
    if(st&&st.osc){
      try{st.osc.stop()}catch(e1){}
      try{st.osc.disconnect()}catch(e2){}
      st.osc=null;
    }
    if(st&&st.gain){
      try{st.gain.gain&&(st.gain.gain.value=0)}catch(e3){}
      try{st.gain.disconnect()}catch(e4){}
    }
  }catch(e){}
}

/* ---- #5: any patOpen106 that leaves Sound Draws must cut the tone ---- */
function wrapPatOpen183(){
  hook('patOpen106',function(prev){
    return function(u){
      var was=null;
      try{was=typeof PAT106==='object'&&PAT106.unit}catch(e){}
      if(was==='sound' && u!=='sound'){
        try{stopSoundTone183()}catch(e2){}
      }
      var r=prev.apply(this,arguments);
      try{afterPatOpen183(u)}catch(e3){}
      return r;
    };
  });
}
function afterPatOpen183(u){
  var el=$('patterns');
  if(!el) return;
  if(u==='same') el.classList.add('il183-same');
  else el.classList.remove('il183-same');
  if(u==='same') bindSameScale183();
}

/* ---- N1/N2: scale only the quiz prompt; reserve layout space ---- */
function css183(){
  if($('il183css')) return;
  var s=document.createElement('style');s.id='il183css';
  s.textContent=
    '#patterns.il183-same .pat-art svg,#patterns.il183-same .pat-art .lamp-art63{'+
      'transform:none!important;transform-origin:center center!important}'+
    '#patterns [data-same-prompt]{overflow:visible;display:flex;flex-direction:column;align-items:center}'+
    '#patterns [data-same-prompt] svg{transform:none!important;display:block;margin:0 auto;max-width:100%;height:auto}'+
    '#patterns [data-same181] p.soft{position:relative;z-index:3;background:var(--card,#fffdf8)}'+
    '#patterns .same181-quiz{position:relative;z-index:2}'+
    '#patterns .same181-scale{position:relative;z-index:4}';
  document.head.appendChild(s);
}
function promptBase183(svg){
  if(!svg) return {w:140,h:140};
  if(!svg._bw183){
    var w=parseFloat(svg.getAttribute('width'));
    var h=parseFloat(svg.getAttribute('height'));
    if(!w||!h){
      var r=svg.getBoundingClientRect();
      w=w||r.width||140;
      h=h||r.height||140;
    }
    svg._bw183=w; svg._bh183=h;
  }
  return {w:svg._bw183,h:svg._bh183};
}
function applySameScale183(scale){
  var el=$('patterns'); if(!el) return;
  el.classList.add('il183-same');
  el.querySelectorAll('.pat-art svg, .pat-art .lamp-art63').forEach(function(svg){
    svg.style.transform='';
    svg.style.transformOrigin='';
    svg.style.width='';
    svg.style.height='';
  });
  var prompt=el.querySelector('[data-same-prompt] svg');
  if(!prompt) return;
  var b=promptBase183(prompt);
  prompt.style.transform='';
  prompt.style.width=(b.w*scale)+'px';
  prompt.style.height=(b.h*scale)+'px';
}
function currentSameScale183(el){
  el=el||$('patterns');
  var n=parseFloat(el&&el.getAttribute('data-same-scale-183'));
  return isFinite(n)?n:1;
}
function setSameScale183(scale){
  var el=$('patterns'); if(!el) return 1;
  scale=Math.max(0.6,Math.min(1.8,scale));
  scale=Math.round(scale*10)/10;
  el.setAttribute('data-same-scale-183',String(scale));
  applySameScale183(scale);
  return scale;
}
function bindSameScale183(){
  var el=$('patterns');
  if(!el||!el.querySelector('[data-same181]')) return;
  el.classList.add('il183-same');
  var scale=currentSameScale183(el);
  el.querySelectorAll('[data-same181-sz]').forEach(function(b){
    b.onclick=function(){
      setSameScale183(currentSameScale183(el)+(+b.getAttribute('data-same181-sz'))*0.2);
    };
  });
  var rst=el.querySelector('[data-g181reset="same"]');
  if(rst){
    rst.onclick=function(){
      var fam=null;
      var box=el.querySelector('[data-same181]');
      if(box) fam=box.getAttribute('data-fam');
      setSameScale183(1);
      if(typeof patSameDraw106==='function'&&fam) patSameDraw106(fam);
      else if(typeof patSameDraw106==='function') patSameDraw106();
    };
  }
  applySameScale183(scale);
}
function wrapSame183(){
  hook('patSameDraw106',function(prev){
    return function(fam){
      var r=prev.apply(this,arguments);
      try{
        if(fam){
          var el=$('patterns');
          if(el) el.setAttribute('data-same-scale-183','1');
          bindSameScale183();
        }
      }catch(e){}
      return r;
    };
  });
}
function watchSame183(){
  if(watchSame183._on) return;
  watchSame183._on=1;
  document.addEventListener('click',function(ev){
    var t=ev.target&&ev.target.closest?ev.target.closest('[data-same181-sz]'):null;
    if(!t) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    var el=$('patterns');
    setSameScale183(currentSameScale183(el)+(+t.getAttribute('data-same181-sz'))*0.2);
  },true);
  var obs=new MutationObserver(function(){
    try{
      if(typeof PAT106==='object'&&PAT106.unit==='same'&&$('patterns')&&$('patterns').querySelector('[data-same181]')){
        bindSameScale183();
      }
    }catch(e){}
  });
  var host=$('patterns')||document.body;
  if(host) obs.observe(host,{childList:true,subtree:true});
}

function install(){
  css183();
  wrapPatOpen183();
  wrapSame183();
  watchSame183();
  try{
    if(typeof PAT106==='object'&&PAT106.unit==='same') bindSameScale183();
  }catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL183={
  version:183,
  stopSoundTone:stopSoundTone183,
  applySameScale:applySameScale183,
  bindSameScale:bindSameScale183,
  setSameScale:setSameScale183
};
root.stopSoundTone183=stopSoundTone183;

})(typeof window!=='undefined'?window:this);
