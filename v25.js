// v25: Opus first with MP3 fallback, singing stems (backing + vocal) from audio/sing/songs.json, heart cached in the device's format.
const AFMT=(()=>{try{if(/[?&]fmt=mp3/.test(location.search)||localStorage.getItem('lamp_force_mp3'))return 'mp3';const a=document.createElement('audio');
 return (a.canPlayType('audio/ogg; codecs=opus')||a.canPlayType('audio/webm; codecs=opus'))?'opus':'mp3'}catch(e){return 'mp3'}})();
const AEXT='.'+AFMT;
// Speaking clips
loadClip=function(name,vv){const V=vv||curVoice(),K=V+'/'+name;if(K in BUF)return BUF[K];const c=ac();
 return BUF[K]=(c?fetch(`audio/${V}/${name}${AEXT}`).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(b=>new Promise((ok,no)=>c.decodeAudioData(b,ok,no))).catch(()=>null):Promise.resolve(null))};
voiceSample=async function(v){musicStop();const b=[...document.querySelectorAll('button')].find(x=>(x.getAttribute('onclick')||'')===`voiceSample('${v}')`),set=t=>{if(b)b.textContent=t};
 set('⏳ Loading…');let cached=false;try{cached=!!(await caches.match(`audio/${v}/p_sample${AEXT}`,{ignoreSearch:true}))}catch(e){}
 if(!navigator.onLine&&!cached){set('📶 Needs internet');if(b)b.title='This voice is not downloaded yet. Connect to the internet once to hear it.';setTimeout(()=>set('▶ Hear sample'),3500);return}
 const buf=await loadClip('p_sample',v);if(!buf){delete BUF[v+'/p_sample'];set('⚠️ Could not play');setTimeout(()=>set('▶ Hear sample'),3000);return}
 set('🔊 Playing…');const d=playClip(buf,0,1);setTimeout(()=>set('▶ Hear sample'),(d+.3)*1000)};
// "Save everything" downloads only this device's format.
offList=async function(){const r=await fetch(AFMT==='opus'?'offline-opus.json':'offline.json',{cache:'no-cache'});return r.json()};
try{offSize()}catch(e){}
// Heart is the one voice kept offline from the start, in this device's format only.
(async function(){try{if(!('caches' in window)||!navigator.onLine)return;const k='lamp_heart_cached_'+AFMT;if(RAW.get(k)==='v25')return;
 const idx=await (await fetch('audio/heart/index.json')).json();const urls=idx.map(f=>'audio/heart/'+f.replace(/\.mp3$/,'')+AEXT);urls.push('audio/sing/twinkle_heart'+AEXT);
 const c=await caches.open('lamplight-extra');let todo=[];for(const u of urls)if(!(await c.match(u)))todo.push(u);
 for(let i=0;i<todo.length;i+=12)await Promise.all(todo.slice(i,i+12).map(u=>fetch(u).then(r=>r.ok&&c.put(u,r)).catch(()=>{})));RAW.set(k,'v25')}catch(e){}})();
// ---------- Singing: stems or full mix, from a small manifest ----------
let SONGS_SUNG=null;const songsSung=()=>SONGS_SUNG||(SONGS_SUNG=fetch('audio/sing/songs.json').then(r=>r.json()).then(j=>j.songs||{}).catch(()=>({})));
const sex=v=>(SINGERS.find(x=>x[0]===v)||[,,'f'])[2];
function singPlan(song,v){if(!song)return null;const S=song.slug,f=s=>`audio/sing/${s}${AEXT}`;
 if((song.stems||[]).includes(v)&&song.backing){const bk=song.backing[sex(v)]||song.backing.f||song.backing.m;return {stems:[f(bk),f(`${S}_${v}_vox`)]}}
 if((song.mix||[]).includes(v))return {mix:f(`${S}_${v}`)};return null}
async function hasCache(u){try{return !!(await caches.match(u,{ignoreSearch:true}))}catch(e){return false}}
async function getBuf(u){const c=ac();let r=null;try{r=await caches.match(u,{ignoreSearch:true})}catch(e){}
 if(!r){r=await fetch(u);if(!r.ok)throw 0;try{(await caches.open('lamplight-extra')).put(u,r.clone())}catch(e){}}return c.decodeAudioData(await r.arrayBuffer())}
const SB2={};
async function loadSingFor(songId,v){const songs=await songsSung(),plan=singPlan(songs[songId],v);if(!plan)return null;const urls=plan.stems||[plan.mix],key=urls.join('|');if(SB2[key])return SB2[key];
 if(!navigator.onLine)for(const u of urls)if(!(await hasCache(u)))return 'offline';
 try{const bufs=await Promise.all(urls.map(getBuf));return SB2[key]=plan.stems?{stems:bufs}:bufs[0]}catch(e){return navigator.onLine?null:'offline'}}
loadSing=v=>loadSingFor(MU.s||'m1',v);
// Both stems start on the same audio-clock time through the master bus; rate 1, no pitch change. Backing 0.6, vocal 1.0.
playSing=function(b){const c=ac(),t=c.currentTime+.08,one=(buf,g)=>{const s=c.createBufferSource(),G=c.createGain();s.buffer=buf;s.playbackRate.value=1;G.gain.value=g;s.connect(G).connect(c.destination);s.start(t);MSRC.push(s);return buf.duration};
 if(b&&b.stems){const d0=one(b.stems[0],.6),d1=one(b.stems[1],1);return Math.max(d0,d1)}return one(b,1)};
// Any song listed in the manifest sings; others stay glow-only.
{const sp0=singPlay;singPlay=async function(say){const s=MUSIC.songs.find(x=>x.id===MU.s);if(s&&s.id!=='m1'&&!say&&LANG!=='es'){const songs=await songsSung();if(songs[s.id])return singSong(s,songs[s.id])}return sp0.apply(this,arguments)}}
async function singSong(s,meta){musicStop();const v=curSinger(),f=t=>{const e=$('sfb');if(e)e.textContent=t};f('⏳ Loading…');const buf=await loadSingFor(s.id,v);
 if(buf==='offline')return f('📶 Needs internet: this singing voice is not downloaded yet.');if(!buf)return f('⚠️ This voice has no recording for this song yet.');
 f('🎤 '+SINGERS.find(x=>x[0]===v)[1]);const d=playSing(buf),n=meta.lines||s.lines.length;const part={...s,lines:s.lines.slice(0,n)};const tl=songTimeline(part,s.bpm),end=tl.length?tl[tl.length-1].end:1,k=d*.92/end;
 tl.forEach((w,i)=>later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));const e=$('kw'+i);if(e)e.classList.add('on','was')},(w.t*k+.3)*1000));later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));f('⭐ Great singing!')},d*1000+300)}
{const rm=renderMusic;renderMusic=function(){rm.apply(this,arguments);if(MU.v==='sing'&&MU.s&&MU.s!=='m1'&&LANG!=='es')songsSung().then(sg=>{if(sg[MU.s]&&!$('singcard')){const k=$('music').querySelector('.karaoke');if(k)k.insertAdjacentHTML('beforebegin',singerPicker())}})}}
// Look: the speaking picker is the reading voice; singing voices have their own card.
{const rl=renderLook;renderLook=function(){rl();const h=[...$('look').querySelectorAll('h2')].find(x=>/Reading/.test(x.textContent)||/🗣️/.test(x.textContent));if(h){h.textContent='🗣️ '+(LANG==='en'?'Reading voice':(DICT['Reading voice']||'Reading voice'))}
 if(h&&$('singcard')&&!$('singlink'))h.insertAdjacentHTML('afterend','<p id="singlink"><a href="#singcard" onclick="event.preventDefault();$(\'singcard\').scrollIntoView({behavior:\'smooth\'})">🎤 Singing voices (12) are further down ↓</a></p>')};RENDER.look=renderLook}
