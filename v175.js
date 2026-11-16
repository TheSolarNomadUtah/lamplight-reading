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
