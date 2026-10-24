// v11: Music & Singing. All sound is made on this device with Web Audio. Voice clips are files in audio/<voice>/.
// To swap the voice: run tools/gen_voice.py <voice> and change "voice" in music-data.js. Nothing is recorded or sent anywhere.
SECTIONS.push('music');document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="music" class="hidden"></section>');
RENDER.music=()=>renderMusic();
const mslug=w=>w.toLowerCase().normalize('NFD').replace(/[^a-z]/g,'');
let AC=null;const ac=()=>{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C()}if(AC.state==='suspended')AC.resume();return AC};
const BUF={};
function loadClip(name,vv){const V=vv||curVoice(),K=V+'/'+name;if(K in BUF)return BUF[K];const c=ac();return BUF[K]=(c?fetch(`audio/${V}/${name}.mp3`).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(b=>new Promise((ok,no)=>c.decodeAudioData(b,ok,no))).catch(()=>null):Promise.resolve(null))}
let MT=[],MSRC=[];const later=(f,ms)=>MT.push(setTimeout(f,ms));
function musicStop(){MT.forEach(clearTimeout);MT=[];MSRC.forEach(s=>{try{s.stop()}catch(e){}});MSRC=[];try{speechSynthesis.cancel()}catch(e){}}
function playClip(buf,when,gain,fallbackText){const c=ac();if(buf&&c){const s=c.createBufferSource(),g=c.createGain();g.gain.value=gain||1;s.buffer=buf;s.connect(g).connect(c.destination);s.start(when||c.currentTime);MSRC.push(s);return buf.duration}
 if(fallbackText){const d=Math.max(0,((when||0)-(c?c.currentTime:0))*1000);later(()=>{try{const u=new SpeechSynthesisUtterance(fallbackText);u.rate=.85;speechSynthesis.speak(u)}catch(e){}},d)}return 0.6}
// ---------- Instruments ----------
const mtof=m=>440*Math.pow(2,(m-69)/12);
function note(m,t,dur,inst,vol){const c=ac();if(!c)return;vol=vol||.25;const f=mtof(m),out=c.createGain();out.connect(c.destination);
 const osc=(type,fr,v,a,d)=>{const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=fr;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+d);o.connect(g).connect(out);o.start(t);o.stop(t+d+.05);MSRC.push(o)};
 out.gain.value=vol;
 if(inst==='bells'){osc('sine',f,1,.005,1.8);osc('sine',f*2.76,.35,.005,.8);osc('sine',f*5.4,.12,.005,.4)}
 else if(inst==='marimba'){osc('sine',f,1,.003,.5);osc('sine',f*4,.25,.002,.12)}
 else if(inst==='pad'){const o=c.createOscillator(),o2=c.createOscillator(),fl=c.createBiquadFilter(),g=c.createGain();o.type=o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f*1.006;fl.type='lowpass';fl.frequency.value=900;
  g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(.35,t+.35);g.gain.setValueAtTime(.35,t+Math.max(.36,dur));g.gain.exponentialRampToValueAtTime(0.0001,t+dur+.8);o.connect(fl);o2.connect(fl);fl.connect(g).connect(out);[o,o2].forEach(x=>{x.start(t);x.stop(t+dur+.9);MSRC.push(x)})}
 else {osc('triangle',f,1,.005,Math.max(.4,dur*1.2));osc('sine',f*2,.3,.005,.3)}}
function drumHit(kind,t){const c=ac();if(!c)return;t=t||c.currentTime;const g=c.createGain();g.connect(c.destination);
 if(kind==='kick'||kind==='tom'){const o=c.createOscillator();const f0=kind==='kick'?150:220;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(kind==='kick'?45:110,t+.25);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.9,t+.004);g.gain.exponentialRampToValueAtTime(.001,t+.35);g.gain.setTargetAtTime(0,t+.36,.01);o.connect(g);o.start(t);o.stop(t+.45)}
 else{const n=c.createBufferSource(),b=c.createBuffer(1,c.sampleRate*.3,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;n.buffer=b;const fl=c.createBiquadFilter();fl.type=kind==='hat'?'highpass':'bandpass';fl.frequency.value=kind==='hat'?7000:kind==='clap'?1500:1800;
  const len=kind==='hat'?.06:.18;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.6,t+.003);g.gain.exponentialRampToValueAtTime(.001,t+len);g.gain.setTargetAtTime(0,t+len,.005);n.connect(fl).connect(g);n.start(t);n.stop(t+len+.05)}}
// ---------- Song parsing (word/syllable tokens + melody) ----------
function parseSong(s){const words=[];s.lines.forEach((l,li)=>l.split(/\s+/).filter(Boolean).forEach(w=>words.push({w:w.replace(/\|/g,''),syl:w.split('|').length,li})));
 const total=words.reduce((n,x)=>n+x.syl,0);let notes;
 if(s.notes)notes=s.notes.trim().split(/\s+/).map(x=>{const[a,b]=x.split(':');return{m:+a,d:b?+b:1}});
 else{const P=[60,62,64,67,69,72],h=hashStr(s.id),st=[1,1,-1,2,-1,-2,1,0];notes=[];let i=2+h%2,k=0;words.forEach(w=>{for(let j=0;j<w.syl;j++){i=Math.max(0,Math.min(5,i+st[(h+k++)%8]));notes.push({m:P[i],d:/[.!?]$/.test(w.w)&&j===w.syl-1?2:1})}})}
 return{words,notes,ok:notes.length===total}}
function songTimeline(s,bpm){const {words,notes}=parseSong(s),b=60/(bpm||s.bpm||90);let t=0,ni=0;return words.map(w=>{const st=t;const ns=[];for(let j=0;j<w.syl;j++){const n=notes[ni++]||{m:60,d:1};ns.push({m:n.m,t,d:n.d*b});t+=n.d*b}return{...w,t:st,ns,end:t}})}
// ---------- UI ----------
let MU={v:null};
function renderMusic(){musicStop();const v=MU.v,el=$('music');
 const back=`<button class="bigbtn" onclick="musicStop();MU={v:null};renderMusic()">⬅ Music</button>`;
 if(!v){el.innerHTML=`<div class="card big" style="text-align:center"><h2>🎵 Music & Singing</h2><p style="font-size:1.15rem">Sing, chant, tap and hum. Sound helps the brain hear the parts of words.</p>
 <div class="hubgrid">${[['🎤','Sing-along','sing','Words light up'],['🔤','Letter songs','letters','A to Z sounds'],['🥁','Drum pad','drum','Tap the beats'],['〰️','Hum & match','hum','Match the note'],['🎼','Make a song','make','Story → song']].map(a=>`<button class="hubtile" onclick="MU={v:'${a[2]}'};renderMusic()"><span>${a[0]}</span>${a[1]}<small>${a[3]}</small></button>`).join('')}</div>
 <p class="soft">The voice is a computer voice (Kokoro, pick it in 🎨 Look). Songs with a real tune (Twinkle, Row Your Boat) are sung; the rest are chanted in rhythm. Nothing is recorded or saved.</p></div>`;return}
 if(v==='sing')return renderSing(back);if(v==='letters')return renderLSongs(back);if(v==='drum')return renderDrum(back);if(v==='hum')return renderHum(back);if(v==='make')return renderMake(back)}
function karaokeHTML(tl){let li=-1,h='';tl.forEach((w,i)=>{if(w.li!==li){if(li>=0)h+='</div>';h+='<div class="kline">';li=w.li}h+=`<span class="kw" id="kw${i}">${esc(w.w)}</span> `});return h+'</div>'}
function runKaraoke(tl,opts){musicStop();const c=ac();opts=opts||{};const t0=(c?c.currentTime:0)+.35;
 tl.forEach((w,i)=>{w.ns.forEach(n=>note(n.m,t0+n.t,n.d,opts.inst||'piano',opts.vol));later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));const e=$('kw'+i);if(e){e.classList.add('on','was')}},(t0-(c?c.currentTime:0)+w.t)*1000);
  if(opts.voice&&opts.bufs&&!opts.sung)playClip(opts.bufs[i],c?t0+w.t:0,1.1,w.w)});
 if(opts.sung)playClip(opts.sung,c?t0:0,1.2);const end=tl.length?tl[tl.length-1].end:0;if(opts.beat&&c)for(let t=0;t<end;t+=60/opts.bpm)drumHit(Math.round(t/(60/opts.bpm))%2?'hat':'kick',t0+t);
 later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));if(opts.done)opts.done()},(end+.6)*1000)}
function renderSing(back){const s=MUSIC.songs.find(x=>x.id===MU.s);
 if(!s){$('music').innerHTML=`<div class="card big"><h2>🎤 Sing-along</h2><p>Pick a song. The words light up with the music. Sing or chant along!</p><div class="grid">${MUSIC.songs.map(x=>`<button class="card" style="text-align:left;font-size:1.15rem" onclick="MU.s='${x.id}';renderMusic()"><b>${x.t}</b><br><span class="soft">${x.band} · ${x.kind}</span></button>`).join('')}</div>${back}</div>`;return}
 MU.sp=MU.sp||1;const tl=songTimeline(s,s.bpm*MU.sp);
 $('music').innerHTML=`<div class="card big" style="text-align:center"><div class="soft">${s.band} · ${s.kind}</div><h2>${s.t}</h2><div class="karaoke">${karaokeHTML(tl)}</div>
 <p><button class="bigbtn p" onclick="singPlay(true)">▶ Sing with voice</button> <button class="bigbtn" onclick="singPlay(false)">🎶 Music only (you sing)</button> <button class="bigbtn" onclick="musicStop()">⏹ Stop</button></p>
 <p>Speed: ${[[.8,'🐢 Slow'],[1,'Normal'],[1.15,'🐇 Fast']].map(x=>`<button class="${MU.sp===x[0]?'p':''}" onclick="MU.sp=${x[0]};renderMusic()">${x[1]}</button>`).join(' ')} <label><input type="checkbox" id="sbeat" ${MU.beat?'checked':''} onchange="MU.beat=this.checked"> drum beat</label></p>
 <p id="sfb" class="soft"></p><button class="bigbtn" onclick="MU.s=null;renderMusic()">⬅ Songs</button> ${back}</div>`}
async function singPlay(voice){const s=MUSIC.songs.find(x=>x.id===MU.s),tl=songTimeline(s,s.bpm*MU.sp);let bufs=null;if(voice){$('sfb').textContent='Getting the voice ready…';const sung=(s.notes&&(MU.sp||1)===1&&SINGMODE()==='sing')?await loadClip('s_'+s.id):null;bufs=sung?[]:await Promise.all(tl.map(w=>loadClip('w_'+mslug(w.w))));MU.sung=sung;$('sfb').textContent=''}
 runKaraoke(tl,{voice,bufs,sung:voice?MU.sung:null,beat:MU.beat,bpm:s.bpm*MU.sp,inst:'piano',done:()=>{try{markDay('music')}catch(e){}const f=$('sfb');if(f)f.textContent='⭐ Great singing!'}})}
// Letter songs: a 2-bar tune per letter + the voice clip "B says buh, buh, buh. Ball and bee!"
function letterTune(i){const P=[60,62,64,67,69],a=P[i%5],b=P[(i+2)%5],c2=P[(i+4)%5];return[[a,.5],[a,.5],[b,.5],[b,.5],[c2,1],[b,.5],[a,.5],[67,.5],[64,.5],[62,.5],[60,1.5]]}
function playLetterSong(L){musicStop();const i=MUSIC.letters.findIndex(x=>x[0]===L),r=MUSIC.letters[i],c=ac(),b=60/100;
 loadClip('l_'+L.toLowerCase()).then(buf=>{const t0=(c?c.currentTime:0)+.2;let t=0;for(let rep=0;rep<2;rep++)letterTune(i).forEach(([m,d])=>{note(m,t0+t,d*b,'marimba',.18);t+=d*b});
  playClip(buf,t0+.4*b,1.2,`${L} says ${r[1]}, ${r[1]}, ${r[1]}. ${r[2]} and ${r[3]}!`);const e=$('lsbig');if(e){e.classList.add('pop');later(()=>e.classList.remove('pop'),t*1000)}})}
function renderLSongs(back){const L=MU.L||'A',r=MUSIC.letters.find(x=>x[0]===L);
 $('music').innerHTML=`<div class="card big" style="text-align:center"><h2>🔤 Letter songs</h2><div id="lsbig" class="lsbig" onclick="playLetterSong('${L}')">${L}${L.toLowerCase()}</div>
 <p style="font-size:1.5rem"><b>${L}</b> ${typeof LANG!=="undefined"&&LANG==="es"?"suena":"says"} <b>${r[1]}</b> — ${r[2]} and ${r[3]}!</p><button class="bigbtn p" onclick="playLetterSong('${L}')">▶ Play the ${L} song</button> <button class="bigbtn" onclick="MU.L='${MUSIC.letters[(MUSIC.letters.findIndex(x=>x[0]===L)+1)%MUSIC.letters.length][0]}';renderMusic();playLetterSong(MU.L)">Next ➡</button>
 <div style="margin-top:10px">${MUSIC.letters.map(x=>`<button class="pchip ${x[0]===L?'p':''}" onclick="MU.L='${x[0]}';renderMusic();playLetterSong('${x[0]}')">${x[0]}</button>`).join('')}</div>${back}</div>`}
// Drum pad: tap once per syllable
function syllables(w){return w.split('|').length}
function checkSyllables(taps,word){const n=syllables(word);return taps===n?'yes':taps<n?'more':'less'}
function renderDrum(back){const D=MU.D=MU.D||{lvl:0,i:0,taps:0,score:0,free:false};
 if(D.free){$('music').innerHTML=`<div class="card big" style="text-align:center"><h2>🥁 Free play drums</h2><div class="drumgrid">${[['kick','🥁 Boom'],['tom','🪘 Bong'],['snare','💥 Tak'],['hat','✨ Tss'],['clap','👏 Clap']].map(d=>`<button class="drumpad" onpointerdown="drumHit('${d[0]}');this.classList.add('hit');setTimeout(()=>this.classList.remove('hit'),120)">${d[1]}</button>`).join('')}</div><button class="bigbtn" onclick="MU.D.free=false;renderMusic()">Word beats</button> ${back}</div>`;return}
 const lv=MUSIC.drum[D.lvl],w=lv[1][D.i%lv[1].length];
 $('music').innerHTML=`<div class="card big" style="text-align:center"><h2>🥁 Tap the beats</h2><div>${MUSIC.drum.map((l,k)=>`<button class="${k===D.lvl?'p':''}" onclick="MU.D={lvl:${k},i:0,taps:0,score:0};renderMusic()">${l[0]}</button>`).join(' ')}</div>
 <p class="lsbig" style="font-size:clamp(2.5rem,10vw,4.5rem)" onclick="drumSay()">${w.replace(/\|/g,'')}</p><p class="soft">Say it and tap the drum once for each beat. 🔊 Tap the word to hear it.</p>
 <button id="bigdrum" class="bigdrum" onpointerdown="drumTap()">🥁</button><p id="dtaps" style="font-size:2rem;min-height:1.3em"></p><p id="dfb" style="font-size:1.4rem;min-height:1.5em"></p>
 <p>Score: ${'⭐'.repeat(D.score)||'☆'}</p><button class="bigbtn" onclick="MU.D.free=true;renderMusic()">Free play drums</button> ${back}</div>`;MU.Dw=w;later(drumSay,300)}
function drumSay(){const w=MU.Dw;if(!w)return;loadClip('w_'+mslug(w)).then(b=>playClip(b,0,1.2,w.replace(/\|/g,'')))}
let dTimer=null;
function drumTap(){const D=MU.D;D.taps++;drumHit(D.taps%2?'kick':'tom');const b=$('bigdrum');b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),120);$('dtaps').textContent='● '.repeat(D.taps);clearTimeout(dTimer);dTimer=setTimeout(drumJudge,1300)}
function drumJudge(){const D=MU.D,w=MU.Dw,r=checkSyllables(D.taps,w),f=$('dfb');if(!f)return;
 if(r==='yes'){f.innerHTML=`✅ Yes! <b>${w.split('|').join(' · ')}</b> has ${syllables(w)} beat${syllables(w)>1?'s':''}!`;D.score++;try{markDay('music')}catch(e){};later(()=>{D.i++;D.taps=0;if(MU.v==='drum'&&!D.free)renderMusic()},1900)}
 else{f.innerHTML=r==='more'?'Almost! Try a few more taps. 👂':'Oops, a few too many. Try again! 👂';D.taps=0;const b=$('dtaps');later(()=>{if(b)b.textContent=''},900);later(drumSay,500)}}
// Hum & match: pitch detection by autocorrelation. Audio is analysed live and thrown away.
function detectPitch(buf,sr){const n=buf.length;let rms=0;for(let i=0;i<n;i++)rms+=buf[i]*buf[i];rms=Math.sqrt(rms/n);if(rms<0.01)return -1;
 const minL=Math.floor(sr/1000),maxL=Math.min(Math.floor(sr/70),n>>1);let best=-1,bv=0;const c=new Float32Array(maxL+2);
 for(let l=minL;l<=maxL+1;l++){let s=0,e1=0,e2=0;for(let i=0;i<n-l;i++){s+=buf[i]*buf[i+l];e1+=buf[i]*buf[i];e2+=buf[i+l]*buf[i+l]}c[l]=s/Math.sqrt(e1*e2||1)}
 let thr=0;for(let l=minL;l<=maxL;l++)thr=Math.max(thr,c[l]);thr*=0.9;
 for(let l=minL+1;l<=maxL;l++){if(c[l]>=thr&&c[l]>=c[l-1]&&c[l]>=c[l+1]){best=l;bv=c[l];break}}
 if(best<0||bv<0.5)return -1;const a=c[best-1],b=c[best],d=c[best+1],sh=(a-d)/(2*(a-2*b+d)||1);return sr/(best+(isFinite(sh)?sh:0))}
const HN=[['C',60],['D',62],['E',64],['G',67],['A',69],['Low C',48],['Low G',55]];
let HUM={stream:null,raf:0,hist:[],hit:0,target:60,stars:0};
function humStop(){cancelAnimationFrame(HUM.raf);if(HUM.stream){HUM.stream.getTracks().forEach(t=>t.stop());HUM.stream=null}}
function renderHum(back){humStop();$('music').innerHTML=`<div class="card big" style="text-align:center"><h2>〰️ Hum & match</h2><p>Hear the note, then hum it. Make your glowing line touch the gold line!</p>
 <div>${HN.map(h=>`<button class="${HUM.target===h[1]?'p':''}" onclick="HUM.target=${h[1]};renderMusic()">${h[0]}</button>`).join(' ')}</div>
 <canvas id="humc" width="640" height="260" class="humc"></canvas><p id="hfb" style="font-size:1.3rem;min-height:1.5em"></p>
 <button class="bigbtn" onclick="musicStop();note(HUM.target,ac().currentTime+.05,1.4,'pad',.3)">🔊 Hear the note</button> <button class="bigbtn p" id="hstart" onclick="humStart()">🎙️ Start humming</button> <button class="bigbtn" onclick="humStop();$('hfb').textContent='Microphone off.'">⏹ Stop</button>
 <p class="soft">🔒 The microphone is only listened to while this screen is open. Nothing is recorded, saved, or sent.</p>${back}</div>`;humDraw(null)}
function humDraw(hz){const cv=$('humc');if(!cv)return;const g=cv.getContext('2d'),W=cv.width,H=cv.height,tf=mtof(HUM.target),y=f=>H/2-Math.log2(f/tf)*12*14;
 g.fillStyle='#1b1830';g.fillRect(0,0,W,H);g.strokeStyle='#ffcf6b';g.lineWidth=6;g.shadowColor='#ffcf6b';g.shadowBlur=16;g.beginPath();g.moveTo(0,H/2);g.lineTo(W,H/2);g.stroke();
 HUM.hist.push(hz>0?hz:null);if(HUM.hist.length>W/4)HUM.hist.shift();g.strokeStyle='#7fe3ff';g.shadowColor='#7fe3ff';g.lineWidth=5;g.beginPath();let pen=false;HUM.hist.forEach((f,i)=>{if(f){const yy=Math.max(4,Math.min(H-4,y(f)));pen?g.lineTo(i*4,yy):g.moveTo(i*4,yy);pen=true}else pen=false});g.stroke();g.shadowBlur=0}
function humFallback(msg){const f=$('hfb');if(f)f.innerHTML=`🎤 ${msg}<br><span class="soft">No problem: tap “Hear the note” and hum along with it. A grown-up can listen and cheer!</span>`;const b=$('hstart');if(b)b.disabled=true}
async function humStart(){humStop();const c=ac();if(!c||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return humFallback('This device or browser has no microphone access.');
 try{HUM.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}})}catch(e){return humFallback('The microphone is off or not allowed.')}
 const src=c.createMediaStreamSource(HUM.stream),an=c.createAnalyser();an.fftSize=2048;src.connect(an);const buf=new Float32Array(an.fftSize);HUM.hist=[];HUM.hit=0;$('hfb').textContent='Listening… hum the note!';
 const loop=()=>{an.getFloatTimeDomainData(buf);const hz=detectPitch(buf,c.sampleRate);humDraw(hz);
  if(hz>0){const cents=1200*Math.log2(hz/mtof(HUM.target));let cc=((cents%1200)+1800)%1200-600;/* any octave counts */ if(Math.abs(cc)<60){HUM.hit++;if(HUM.hit===40){HUM.stars++;$('hfb').textContent='🌟 You matched it! '+'⭐'.repeat(Math.min(HUM.stars,10));try{markDay('music')}catch(e){}}}else{if(HUM.hit<40)$('hfb').textContent=cc<0?'A little higher ⬆':'A little lower ⬇';HUM.hit=Math.max(0,HUM.hit-2)}}
  HUM.raf=requestAnimationFrame(loop)};loop()}
// Make a song: story -> melody with words lit up
const MOODS={happy:{sc:[0,2,4,5,7,9,11,12],bpm:112,o:60,e:'😊'},calm:{sc:[0,2,4,7,9,12],bpm:72,o:60,e:'😌'},silly:{sc:[0,4,7,12,3,10,1,8],bpm:132,o:62,e:'🤪'},space:{sc:[0,2,4,6,8,10,12],bpm:64,o:55,e:'🚀'}};
function storyToSong(text,mood,maxWords){const M=MOODS[mood]||MOODS.happy,ws=text.split(/\n/).map(l=>l.trim()).filter(Boolean);let lines=[],n=0;for(const l of ws){if(n>=(maxWords||70))break;lines.push(l);n+=l.split(/\s+/).length}
 const s={id:'mk'+mood+hashStr(text),lines:lines.map(l=>l.replace(/\|/g,'')),bpm:M.bpm};let k=hashStr(text)%M.sc.length,notes=[];
 s.lines.forEach((l,li)=>{const w=l.split(/\s+/).filter(Boolean);w.forEach((x,j)=>{k=(k+[1,1,-1,2,-2,1,0][(j+li+x.length)%7]+M.sc.length)%M.sc.length;const last=j===w.length-1;notes.push((M.o+M.sc[last?0:k])+':'+(last?2:(mood==='silly'?.5:1)))})});s.notes=notes.join(' ');return s}
function renderMake(back){const st=S.find(x=>x.id===MU.ms),m=MU.mood||'happy',ins=MU.ins||'piano';
 const pick=`<p><b>Instrument:</b> ${[['piano','🎹 Piano'],['bells','🔔 Bells'],['marimba','🪵 Marimba'],['pad','☁️ Soft pad']].map(x=>`<button class="${ins===x[0]?'p':''}" onclick="MU.ins='${x[0]}';renderMusic()">${x[1]}</button>`).join(' ')}</p>
 <p><b>Mood:</b> ${Object.entries(MOODS).map(([k,v])=>`<button class="${m===k?'p':''}" onclick="MU.mood='${k}';renderMusic()">${v.e} ${k}</button>`).join(' ')}</p>`;
 if(!st){const list=S.filter(x=>x.g<3).slice(0,40);$('music').innerHTML=`<div class="card big"><h2>🎼 Make a song</h2>${pick}<p>Pick a story to turn into a song:</p><div class="grid">${list.map(x=>`<button class="card" style="text-align:left" onclick="MU.ms='${x.id}';renderMusic()"><b>${x.t}</b><br><span class="soft">${x.lvl.split('·')[0]}</span></button>`).join('')}</div>${back}</div>`;return}
 const s=storyToSong(st.text,m),tl=songTimeline(s,s.bpm);
 $('music').innerHTML=`<div class="card big" style="text-align:center"><h2>🎼 “${st.t}” as a song</h2>${pick}<div class="karaoke">${karaokeHTML(tl)}</div>
 <button class="bigbtn p" onclick="runKaraoke(songTimeline(storyToSong(S.find(x=>x.id===MU.ms).text,MU.mood||'happy'),MOODS[MU.mood||'happy'].bpm),{inst:MU.ins||'piano',vol:.22,done:()=>{try{markDay('music')}catch(e){}}})">▶ Play my song</button> <button class="bigbtn" onclick="musicStop()">⏹ Stop</button> <button class="bigbtn" onclick="MU.ms=null;renderMusic()">Pick another story</button> ${back}</div>`}
// ---------- Hooks: Home tile, Library, Grown-ups credits, stop on leave ----------
{const sh=show;show=function(id){if(id!=='music'){musicStop();humStop()}sh(id)}}
{const rh=renderHub;renderHub=function(){rh();const g=$('hub').querySelectorAll('.hubgrid')[1];if(g)g.insertAdjacentHTML('beforeend',`<button class="hubtile" onclick="MU={v:null};show('music')"><span>🎵</span>Music</button>`)}}
{const rl=renderLib;renderLib=function(){rl();const c=$('lib').querySelector('.card');if(c)c.insertAdjacentHTML('afterend',`<div class="card"><h3 style="margin-top:0">🎵 Music & Singing</h3>${MUSIC.songs.map(x=>`<button onclick="MU={v:'sing',s:'${x.id}'};show('music')">🎤 ${x.t}</button>`).join(' ')} <button onclick="MU={v:'letters'};show('music')">🔤 Letter songs</button> <button onclick="MU={v:'make'};show('music')">🎼 Turn a story into a song</button></div>`)}}
const KOKORO_CREDIT='Voice: Kokoro-82M voices (Apache-2.0 license), pre-recorded into audio files on our own site. Music is made live in your browser. No voice or sound is sent anywhere.';
{const ra=renderAbout;renderAbout=function(){ra();$('about').insertAdjacentHTML('beforeend',`<div class="card"><h3>🎵 Music & credits</h3><p>${KOKORO_CREDIT}</p><p class="soft">Hum & match uses the microphone only while that screen is open and never records.</p></div>`)}}
{const rad=renderAdults;renderAdults=function(){rad();$('adults').insertAdjacentHTML('beforeend',`<div class="card"><p class="soft">🎵 ${KOKORO_CREDIT}</p></div>`)}}
document.head.insertAdjacentHTML('beforeend',`<style>.karaoke{font-size:clamp(1.5rem,5vw,2.3rem);line-height:1.7;margin:14px 0}.kw{padding:2px 6px;border-radius:10px;transition:all .12s}.kw.was{color:var(--acc)}.kw.on{background:var(--hi);color:#2f2a24;transform:scale(1.15);display:inline-block;box-shadow:0 0 18px var(--hi)}
.lsbig{font-size:clamp(4rem,18vw,8rem);margin:10px;cursor:pointer;transition:transform .2s}.lsbig.pop{animation:lspop .5s infinite alternate}@keyframes lspop{to{transform:scale(1.12);text-shadow:0 0 24px var(--hi)}}
.bigdrum{font-size:clamp(5rem,22vw,9rem);width:clamp(160px,50vw,260px);height:clamp(160px,50vw,260px);border-radius:50%;border:6px solid var(--acc);background:radial-gradient(#fff7e0,#f2d69a);touch-action:manipulation}.bigdrum.hit,.drumpad.hit{transform:scale(.92);box-shadow:0 0 30px var(--hi)}
.drumgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:14px 0}.drumpad{font-size:1.6rem;min-height:130px;border-radius:22px;border:4px solid var(--acc);background:var(--card);touch-action:manipulation}.humc{width:100%;max-width:640px;border-radius:18px;margin:10px 0}</style>`);
RENDER.hub=renderHub;RENDER.lib=renderLib;RENDER.about=renderAbout;RENDER.adults=renderAdults;
