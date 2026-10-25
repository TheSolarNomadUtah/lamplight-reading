// v38: gentle UI sound effects from the Lamplight kit (all CC0), copied as-is into audio/sfx/.
// Opus first, MP3 fallback (AFMT from v25). Cached on the device for offline. Instruments are untouched.
const SFX_NAMES=['chime_correct','try_again','sparkle_star','tap_soft','page_turn','alt_correct_kenney'];
const SFX_GAIN={page_turn:.5,alt_correct_kenney:.5};                       // kit: page turn at 0.5; the rest play as delivered (pre-leveled)
const SFXB={},SFXLAST={};
function sfxLoad(n){if(n in SFXB)return SFXB[n];const c=ac();return SFXB[n]=c?fetch('audio/sfx/'+n+AEXT).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(a=>c.decodeAudioData(a)).catch(()=>{delete SFXB[n];return null}):Promise.resolve(null)}
async function sfx(n){try{const now=performance.now();if(SFXLAST[n]&&now-SFXLAST[n]<150)return;SFXLAST[n]=now;
 if(typeof window.LAMP_SFX!=='undefined'&&!window.LAMP_SFX)return;                    // no app mute exists yet; this is the hook for one
 const c=ac();if(!c)return;const b=await sfxLoad(n);if(!b)return;const s=c.createBufferSource(),g=c.createGain();
 g.gain.value=(SFX_GAIN[n]||1)*(document.body.classList.contains('bedtime')?.5:1);s.buffer=b;s.connect(g).connect(c.destination);s.start(c.currentTime+.01)}catch(e){}}
// keep them on the device for offline use (same pattern as the v25 heart cache)
(async function(){try{if(!('caches' in window)||!navigator.onLine)return;const k='lamp_sfx_cached_'+AFMT;if(RAW.get(k)==='v38')return;const c=await caches.open('lamplight-extra');
 for(const n of SFX_NAMES){const u='audio/sfx/'+n+AEXT;if(!(await c.match(u))){const r=await fetch(u);if(r.ok)await c.put(u,r)}}RAW.set(k,'v38')}catch(e){}})();

// Hooks
let SFX_SAVED=0;
{const gs=gSave;gSave=function(k,s){gs(k,s);SFX_SAVED=1;if(/^(rx|mel)_/.test(k))sfx(s>=3?'sparkle_star':s>=1?'chime_correct':'try_again')}}
{const rj=rxJudge;rxJudge=function(){const had=(GM.taps||[]).length;SFX_SAVED=0;const r=rj.apply(this,arguments);if(had&&!SFX_SAVED&&!GM.cr)sfx('try_again');return r}}
{const mt=melTap;melTap=function(id,m){const s0=MS[id],was=s0&&s0.done;const r=mt.apply(this,arguments);const s=MS[id];if(s&&s===s0&&!was&&s.done&&s.err>=3)sfx('try_again');return r}}
{const lk=ladKey;ladKey=async function(id,ch){const w=WL[id],n=w?w.chain.length:0;const r=await lk.apply(this,arguments);const w2=WL[id];if(w2&&w2===w&&w2.chain.length>n)sfx(w2.done?'sparkle_star':'tap_soft');return r}}
{const sa=spAns;spAns=function(n){const s=SP.st,i=s&&s.i,was=s&&s.done;const r=sa.apply(this,arguments);if(s&&!was){if(s.done&&s.i===i)sfx('try_again');else if(s.done)sfx(/🏆/.test(($('spfb')||{}).textContent||'')?'sparkle_star':'chime_correct');else if(s.i>i)sfx('alt_correct_kenney')}return r}}
{const sc=arScrCheck;arScrCheck=function(){const a=AR.ss;const r=sc.apply(this,arguments);if(AR.ss>a)sfx('alt_correct_kenney');return r}}
{const st=start;start=function(){sfx('page_turn');return st.apply(this,arguments)}}
{const so=soloStart;soloStart=function(){sfx('page_turn');return so.apply(this,arguments)}}

// Credits (About and Grown-ups, next to the singing credit)
const SFX_CREDIT='Interface and page sounds: Kenney (kenney.nl), CC0. Chimes and sparkles: made for Lamplight from simple harmonic ratios (3:2, 5:4), CC0.';
['adults','about'].forEach(k=>{const r=RENDER[k];if(r)RENDER[k]=function(){r.apply(this,arguments);const el=$(k);if(el&&!el.querySelector('.sfxcredit'))el.insertAdjacentHTML('beforeend',`<p class="soft card sfxcredit">🔔 ${gT(SFX_CREDIT)}</p>`)}});
