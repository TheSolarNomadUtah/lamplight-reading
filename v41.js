// v41: real instruments from the Lamplight kit, copied as-is into audio/inst/ (all CC0, see Credits).
// Piano = FreePats Upright Piano KW (10 samples, every 3 semitones, MIDI 57-84). Drums = FreePats World Percussion conga kit.
// Opus first, MP3 fallback (AFMT from v25). Loaded on first use, never in first paint; cached on the device; synth fallback until loaded.
const PIANO_SM=[57,60,63,66,69,72,75,78,81,84],DRUM_SM=['kick','tom','hat','clap'];
const INSTB={};let PIANO_P=null,DRUM_P=null;
function instLoad(u){const c=ac();if(!c)return Promise.resolve(null);
 return fetch(u).then(r=>{if(!r.ok)throw 0;try{if('caches' in window){const cl=r.clone();caches.open('lamplight-extra').then(k=>k.put(u,cl)).catch(()=>{})}}catch(e){}return r.arrayBuffer()})
  .then(a=>new Promise((ok,no)=>c.decodeAudioData(a,ok,no))).then(b=>INSTB[u]=b).catch(()=>null)}
function pianoLoad(){return PIANO_P||(PIANO_P=Promise.all(PIANO_SM.map(m=>instLoad('audio/inst/piano/'+m+AEXT))))}
function drumsLoad(){return DRUM_P||(DRUM_P=Promise.all(DRUM_SM.map(k=>instLoad('audio/inst/drums/'+k+AEXT))))}
const bedGain=()=>document.body.classList.contains('bedtime')?.5:1;
{const nt=note;note=function(m,t,dur,inst,vol){
 if(inst==='marimba')inst='bells';                              // marimba removed in v41
 if(inst!=='piano')return nt(m,t,dur,inst,vol);
 const c=ac();if(!c)return;pianoLoad();
 let mm=m;while(mm<55.5)mm+=12;while(mm>85.5)mm-=12;             // clamp to the sampled range (±1.5 st outside is fine)
 const n=PIANO_SM.reduce((a,b)=>Math.abs(b-mm)<Math.abs(a-mm)?b:a),b=INSTB['audio/inst/piano/'+n+AEXT];
 if(!b)return nt(m,t,dur,inst,vol);                              // oscillator fallback while loading
 t=Math.max(t||0,c.currentTime);const s=c.createBufferSource(),g=c.createGain();s.buffer=b;s.playbackRate.value=2**((mm-n)/12);
 const v=.8*Math.min(1.25,(vol||.25)/.3)*bedGain(),end=t+Math.max(.15,dur||.5);
 g.gain.setValueAtTime(v,t);g.gain.setValueAtTime(v,end);g.gain.exponentialRampToValueAtTime(.0001,end+.12);
 s.connect(g).connect(c.destination);s.start(t);s.stop(end+.15);MSRC.push(s)}}
{const dh=drumHit;drumHit=function(kind,t){const c=ac();if(!c)return;drumsLoad();const b=INSTB['audio/inst/drums/'+kind+AEXT];
 if(!b)return dh(kind,t);t=Math.max(t||c.currentTime,c.currentTime);
 const s=c.createBufferSource(),g=c.createGain();s.buffer=b;g.gain.value=.8*bedGain();s.connect(g).connect(c.destination);s.start(t);MSRC.push(s)}}
// drums are tiny (8 KB): fetch them on the first tap anywhere so Rhythm Echo's first pattern already uses them
document.addEventListener('pointerdown',()=>{try{drumsLoad()}catch(e){}},{once:true,capture:true});

// Free play: a bigger two-octave piano (C4-C6), scrolls sideways on upright phones.
const FPCOL=['#ff6b6b','#ff8f6b','#ffb86b','#ffd06b','#ffe66b','#b8f06b','#6bff9e','#6be0d0','#6bc8ff','#7b9bff','#a98bff','#e08bff'];
function fpPanel(){const LO=60,HI=84,blk=[1,3,6,8,10],wh=[];for(let m=LO;m<=HI;m++)if(!blk.includes(m%12))wh.push(m);const W=wh.length;
 const k=(m,cls,st,lab)=>`<button class="mkey ${cls}" data-m="${m}" aria-label="${['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'][m%12]}${Math.floor(m/12)-1}" style="--c:${FPCOL[m%12]};${st}" onpointerdown="melTap('comp',${m});event.preventDefault()">${lab||''}</button>`;
 let h=wh.map(m=>k(m,'white','',m%12===0?'<span>C'+(Math.floor(m/12)-1)+'</span>':'')).join('');
 for(let m=LO;m<HI;m++)if(blk.includes(m%12)){const i=wh.indexOf(m-1)+1;h+=k(m,'sharp',`left:calc(${i}*100%/${W} - ${100/W*.32}%);width:${100/W*.64}%`)}
 return `<div class="mpanel" id="mp_comp"><div class="fpscroll" dir="ltr"><div class="fpkb">${h}</div></div><p class="soft fphint">${gT('← swipe for more notes → · turn sideways for the whole piano')}</p></div>`}
{const cr=compRender;compRender=function(){cr();const el=$('games');if(!el)return;const p=el.querySelector('#mp_comp');if(p)p.outerHTML=fpPanel();
 // instrument toggle: Bells (default) · Piano · Glow
 if(COMP.inst==='marimba')COMP.inst='bells';
 const row=[...el.querySelectorAll('p')].find(x=>/COMP\.inst=/.test(x.innerHTML));
 if(row)row.innerHTML=[['bells','🔔',gT('Bells')],['piano','🎹',gT('Piano')],['glow','✨',gT('Glow')]].map(([k,e,n])=>`<button class="${(COMP.inst||'bells')===k?'p':''}" onclick="COMP.inst='${k}';${k==='piano'?'pianoLoad();':''}compRender()">${e} ${n}</button>`).join(' ')}}
document.head.insertAdjacentHTML('beforeend',`<style>
.fpscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;padding-bottom:6px;margin:8px 0}
.fpkb{direction:ltr;position:relative;display:flex;height:190px;min-width:640px;touch-action:pan-x;user-select:none;-webkit-user-select:none}
.fpkb .mkey{margin:0;padding:0;box-sizing:border-box;min-width:0}
.fpkb .mkey.white{flex:1 1 0;width:auto;height:100%;border-radius:0 0 10px 10px;opacity:.78;border:2px solid #0008;background:linear-gradient(#fff 0 18%,var(--c));position:relative;scroll-snap-align:start}
.fpkb .mkey.white span{position:absolute;bottom:6px;left:0;right:0;text-align:center;font-size:.75rem;opacity:.6;color:#2b2620}
.fpkb .mkey.sharp{position:absolute;top:0;height:58%;border-radius:0 0 8px 8px;opacity:1;background:linear-gradient(#111 0 55%,var(--c));z-index:2;border:2px solid #000}
.fpkb .mkey.lit{opacity:1;filter:brightness(1.35);box-shadow:0 0 22px var(--c);transform:none}
@media (min-width:700px){.fpkb{min-width:0}.fphint{display:none}}
@media (orientation:landscape) and (max-height:500px){.fpkb{height:58vh;min-width:0}.fpscroll{overflow:visible}.fphint{display:none}}
</style>`);

// Credits (About and Grown-ups)
const INST_CREDIT='Piano: Upright Piano KW by FreePats (Gonzalo & Roberto), CC0. Drums (low conga, conga, egg shaker, hand clap): FreePats World Percussion (Xavimart, Gonzalo, Roberto; congas from the Versilian Community Sample Library), CC0.';
['adults','about'].forEach(k=>{const r=RENDER[k];if(r)RENDER[k]=function(){r.apply(this,arguments);const el=$(k);if(el&&!el.querySelector('.instcredit'))el.insertAdjacentHTML('beforeend',`<p class="soft card instcredit">🎹 ${gT(INST_CREDIT)}</p>`)}});
