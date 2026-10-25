// v24: approved Twinkle singing voices (SoulX-Singer + Kokoro timbres, Apache-2.0). Only Twinkle sings; every other song stays glow-only.
const SINGERS=[['heart','Heart','f'],['bella','Bella','f'],['nicole','Nicole','f'],['emma','Emma','f'],['isabella','Isabella','f'],['nova','Nova','f'],['michael','Michael','m'],['liam','Liam','m'],['adam','Adam','m'],['puck','Puck','m'],['george','George','m'],['eric','Eric','m']];
const SING_URL=v=>`audio/sing/twinkle_${v}.mp3`;
function curSinger(){const s=LS.get('lamp_singer');if(s&&SINGERS.some(x=>x[0]===s))return s;let v='heart';try{v=curVoice()}catch(e){}return SINGERS.some(x=>x[0]===v)?v:'heart'}
const SBUF={};
async function singCached(v){try{return !!(await caches.match(SING_URL(v),{ignoreSearch:true}))}catch(e){return false}}
async function loadSing(v){if(SBUF[v])return SBUF[v];const c=ac();if(!c)return null;
 if(!navigator.onLine&&!(await singCached(v)))return 'offline';
 try{let r=null;try{r=await caches.match(SING_URL(v),{ignoreSearch:true})}catch(e){}
  if(!r){r=await fetch(SING_URL(v));if(!r.ok)throw 0;try{const cc=await caches.open('lamplight-extra');await cc.put(SING_URL(v),r.clone())}catch(e){}}
  const buf=await c.decodeAudioData(await r.arrayBuffer());SBUF[v]=buf;return buf}catch(e){return navigator.onLine?null:'offline'}}
// Plays the clip as-is: playbackRate 1, no pitch/stretch/effects, straight into the master bus (AC.destination).
function playSing(buf){const c=ac(),s=c.createBufferSource();s.buffer=buf;s.playbackRate.value=1;s.connect(c.destination);s.start(c.currentTime+.05);MSRC.push(s);return buf.duration}
function singMsg(t){const f=$('sfb')||$('singmsg');if(f)f.textContent=t}
{const sp=singPlay;singPlay=async function(say){const s=MUSIC.songs.find(x=>x.id===MU.s);if(say||!s||s.id!=='m1'||LANG==='es')return sp.apply(this,arguments);
 musicStop();const v=curSinger();singMsg('⏳ Loading…');const buf=await loadSing(v);
 if(buf==='offline'){singMsg('📶 Needs internet: this singing voice is not downloaded yet. Pick Heart, or connect once.');return}
 if(!buf){singMsg('⚠️ Could not play that voice. Playing the glow tune instead.');return sp.apply(this,arguments)}
 singMsg('🎤 '+SINGERS.find(x=>x[0]===v)[1]);const d=playSing(buf);
 // Glow visuals only (silent): light the first two lines across the clip.
 const two={...s,lines:s.lines.slice(0,2),notes:s.notes.split(' ').slice(0,14).join(' ')};let tl=songTimeline(two,s.bpm);const end=tl.length?tl[tl.length-1].end:1,k=(d*.92)/end;
 tl.forEach((w,i)=>later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));const e=$('kw'+i);if(e)e.classList.add('on','was')},(w.t*k+.3)*1000));
 later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));try{markDay('music')}catch(e){}singMsg('⭐ Great singing!')},d*1000+300);
 document.body.classList.add('singing');later(()=>document.body.classList.remove('singing'),d*1000)}}
async function singSample(v){musicStop();const b=document.querySelector(`[data-sing="${v}"]`),set=t=>{if(b)b.textContent=t};set('⏳');const buf=await loadSing(v);
 if(buf==='offline'){set('📶 Needs internet');setTimeout(()=>set('▶'),3000);return}if(!buf){set('⚠️');setTimeout(()=>set('▶'),3000);return}
 set('🔊');const c=ac(),s=c.createBufferSource(),g=c.createGain();s.buffer=buf;s.playbackRate.value=1;s.connect(g).connect(c.destination);const t=c.currentTime+.05;s.start(t);g.gain.setValueAtTime(1,t+5.5);g.gain.linearRampToValueAtTime(0,t+6);s.stop(t+6.1);MSRC.push(s);setTimeout(()=>set('▶'),6200)}
function singerPicker(){const cur=curSinger();return `<div class="card" id="singcard"><h3>🎤 Singing voice (Twinkle)</h3><p class="soft">Used for “Twinkle, Twinkle, Little Star”. Other songs use the glow sound. Heart is saved for offline; others download (about 185 KB) the first time.</p>
 <div id="spick">${SINGERS.map(x=>`<span class="nw" style="margin:3px"><button class="${x[0]===cur?'p':''}" onclick="LS.set('lamp_singer','${x[0]}');document.querySelectorAll('#singcard').forEach(e=>e.outerHTML=singerPicker())">${x[2]==='f'?'👩':'👨'} ${x[1]}</button><button data-sing="${x[0]}" onclick="singSample('${x[0]}')" aria-label="Sample">▶</button></span>`).join('')}</div></div>`}
{const rl=renderLook;renderLook=function(){rl();if(LANG!=='es')$('look').insertAdjacentHTML('beforeend',singerPicker())};RENDER.look=renderLook}
{const rm=renderMusic;renderMusic=function(){rm.apply(this,arguments);if(MU.v==='sing'&&MU.s==='m1'&&LANG!=='es'){const k=$('music').querySelector('.karaoke');if(k)k.insertAdjacentHTML('beforebegin',`<p id="singmsg" class="soft"></p>`+singerPicker())}}}
// Home never needs the floating button; clear any leftover inline display.
{const sh=show;show=function(id){const r=sh.apply(this,arguments);document.body.classList.toggle('onhub',id==='hub');const f=$('fhome');if(f)f.style.removeProperty('display');return r}}
document.head.insertAdjacentHTML('beforeend','<style>body.onhub #fhome{display:none!important}body.singing .karaoke{text-shadow:0 0 18px #ffd97a}</style>');
// Letter songs: translate the template bits.
if(LANG!=='en'){const t0=trText;trText=function(n){t0(n);const v=n.nodeValue;if(!v)return;const es=LANG==='es';let o=v
 .replace(/Play the (\S+) song/,(x,l)=>es?`Toca la canción de la ${l}`:`شغّل أغنية ${l}`).replace(/^(\s*)Next ➡/,(x,s)=>s+(es?'Siguiente ➡':'التالي ⬅'))
 .replace(/^(\s*—\s*)(.+) and (.+)!$/,(x,a,b,c)=>a+b+(es?' y ':' و')+c+'!');if(o!==v)n.nodeValue=o}}
const SING_CREDIT='Singing (Twinkle): sung with SoulX-Singer (Apache-2.0) using Kokoro-82M voice timbres (Apache-2.0). No third-party recordings. Played as recorded, with no pitch changes.';
['adults','about'].forEach(k=>{const r=RENDER[k];if(r)RENDER[k]=function(){r.apply(this,arguments);const el=$(k);if(el&&!el.querySelector('.singcredit'))el.insertAdjacentHTML('beforeend',`<p class="soft card singcredit">🎤 ${SING_CREDIT}</p>`)}});
