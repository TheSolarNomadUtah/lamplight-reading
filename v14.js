// v14: Cymatics painter, Bedtime glow, Note-block composer, full offline mode. All made on this device. Zero data leaves it.
SECTIONS.push('cymatics','bedtime');document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="cymatics" class="hidden"></section><section id="bedtime" class="hidden"></section>');
PKEYS.push('lamp_songs');
// ================= 1. CYMATICS =================
let CY={stream:null,raf:0,hz:220,tgt:220,osc:null,frozen:false,src:'tone'};
const CYTONES=[['Low',110],['Hum',165],['Mid',220],['Sing',330],['High',440],['Bird',660]];
function cyMode(hz){const s=Math.max(0,Math.log2(hz/90)*12);const m=1+Math.floor(s/7),n=m+1+Math.floor(s%7/2.4);return[m,n,s]}
function cyStop(){cancelAnimationFrame(CY.raf);CY.raf=0;if(CY.stream){CY.stream.getTracks().forEach(t=>t.stop());CY.stream=null}cyToneOff()}
function cyToneOff(){if(CY.osc){const c=ac(),o=CY.osc;try{o.g.gain.setTargetAtTime(0,c.currentTime,.1);o.o.stop(c.currentTime+.5)}catch(e){}CY.osc=null}}
function cyTone(hz){cyToneOff();CY.tgt=hz;CY.src='tone';const c=ac();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=hz;g.gain.value=0;g.gain.setTargetAtTime(.12,c.currentTime,.05);o.connect(g).connect(c.destination);o.start();CY.osc={o,g}}
RENDER.cymatics=function(){cyStop();CY.frozen=false;$('cymatics').innerHTML=`<div class="card big" style="text-align:center;background:#070914;color:#f6efe0"><h2>🌀 Sound Shapes</h2>
<p>Every sound makes its own shape. Hum, sing, or tap a tone and watch the light dance like sand on a singing plate.</p>
<canvas id="cyc" width="360" height="360" style="width:min(92vw,520px);aspect-ratio:1;border-radius:24px;display:block;margin:10px auto"></canvas>
<p id="cyinfo" style="min-height:1.4em"></p>
<div>${CYTONES.map(t=>`<button onclick="cyTone(${t[1]})">🔊 ${t[0]}</button>`).join(' ')} <button onclick="cyToneOff()">🔇 Quiet</button></div>
<p><button class="bigbtn p" onclick="cyMic()">🎙️ Use my voice</button> <button class="bigbtn" id="cyfz" onclick="CY.frozen=!CY.frozen;this.textContent=CY.frozen?'▶ Unfreeze':'❄️ Freeze'">❄️ Freeze</button> <button class="bigbtn" onclick="cyToPaint()">🎨 Paint over it</button> <button class="bigbtn" onclick="cyStop();show('hub')">⬅ Home</button></p>
<p class="soft" style="color:#bfb8a8">🔒 The microphone is only listened to while this screen is open. Nothing is recorded, saved, or sent. Real fact: when a metal plate is played with a violin bow, sand jumps into patterns like these. Scientist Ernst Chladni showed it over 200 years ago. Higher notes make busier shapes.</p></div>`;cyLoop()};
async function cyMic(){const c=ac(),f=$('cyinfo');if(!c||!navigator.mediaDevices?.getUserMedia){f.textContent='🎤 No microphone here. Tap the tone buttons instead!';return}
 try{CY.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}})}catch(e){f.textContent='🎤 The microphone is off or not allowed. Tap the tone buttons instead!';return}
 cyToneOff();CY.src='mic';const an=c.createAnalyser();an.fftSize=2048;c.createMediaStreamSource(CY.stream).connect(an);CY.an=an;CY.buf=new Float32Array(2048);f.textContent='Listening… hum or sing!'}
function cyLoop(){const cv=$('cyc');if(!cv||!cv.isConnected){cyStop();return}CY.raf=requestAnimationFrame(cyLoop);if(CY.frozen)return;
 if(CY.src==='mic'&&CY.an){CY.an.getFloatTimeDomainData(CY.buf);const hz=detectPitch(CY.buf,ac().sampleRate);if(hz>60&&hz<1200)CY.tgt=hz}
 CY.hz+=(CY.tgt-CY.hz)*.06;cyDraw(cv,CY.hz,performance.now()/1000)}
let CYIMG=null;
function cyDraw(cv,hz,t){const N=180,x=cv.getContext('2d');if(!CYIMG)CYIMG=x.createImageData(N,N);const[m,n,s]=cyMode(hz),fr=s%1,d=CYIMG.data;
 const hue=(s*25)%360,[r0,g0,b0]=oklab2rgb(.82,.14*Math.cos(hue*Math.PI/180),.14*Math.sin(hue*Math.PI/180)),P=Math.PI,w=.35+.25*Math.sin(t*.8);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=i/(N-1),v=j/(N-1);
  const a=Math.cos(n*P*u)*Math.cos(m*P*v)-Math.cos(m*P*u)*Math.cos(n*P*v),b=Math.cos((n+1)*P*u)*Math.cos(m*P*v)+Math.cos(m*P*u)*Math.cos((n+1)*P*v);
  const val=a*(1-fr*.5)+b*fr*.5*w,gl=Math.exp(-Math.abs(val)*9),core=Math.exp(-Math.abs(val)*40),k=(i+j*N)*4;
  d[k]=Math.min(255,r0*gl+255*core*.8);d[k+1]=Math.min(255,g0*gl+240*core*.8);d[k+2]=Math.min(255,b0*gl+220*core*.8);d[k+3]=255}
 if(!CY.off){CY.off=document.createElement('canvas');CY.off.width=CY.off.height=N}CY.off.getContext('2d').putImageData(CYIMG,0,0);
 const W=cv.width;x.globalCompositeOperation='source-over';x.fillStyle='#070914';x.fillRect(0,0,W,W);x.imageSmoothingEnabled=true;x.drawImage(CY.off,0,0,W,W);
 x.globalCompositeOperation='lighter';x.filter='blur(6px)';x.globalAlpha=.7;x.drawImage(CY.off,0,0,W,W);x.filter='none';x.globalAlpha=1;x.globalCompositeOperation='source-over';
 const f=$('cyinfo');if(f&&CY.src==='tone')f.textContent=`${Math.round(hz)} Hz · shape ${m}·${n}`;else if(f&&CY.src==='mic')f.textContent=`🎙️ ${Math.round(hz)} Hz · shape ${m}·${n}`}
function cyToPaint(){const cv=$('cyc');if(!cv)return;const big=document.createElement('canvas');big.width=big.height=720;cyDraw(big,CY.hz,performance.now()/1000);const im=new Image();im.onload=()=>{PT.bgImg=im;PT.dark=true;PT.tool='glow';cyStop();show('paint')};im.src=big.toDataURL()}
{const pb=paintBg;paintBg=function(x){pb(x);if(PT.bgImg){const W=x.canvas.width,H=x.canvas.height,S=Math.min(W,H);x.globalAlpha=.9;x.drawImage(PT.bgImg,(W-S)/2,(H-S)/2,S,S);x.globalAlpha=1}}}
{const rp=renderPaint;renderPaint=function(){rp();const b=document.querySelector('#paint .pbar');if(b)b.insertAdjacentHTML('beforeend',`<button onclick="show('cymatics')" title="Sound Shapes">🌀</button>${PT.bgImg?'<button onclick="PT.bgImg=null;paintClear(true)" title="Remove sound shape">⛶</button>':''}`)}}
RENDER.paint=renderPaint;
// ================= 2. BEDTIME GLOW =================
let BT={raf:0,nodes:[],breathe:true,sun:false,min:10,t0:0,end:0,timer:0};
function btAudioStop(){const c=AC;BT.nodes.forEach(n=>{try{n.stop(c.currentTime+.6)}catch(e){}});if(BT.master&&c)BT.master.gain.setTargetAtTime(0,c.currentTime,.15);BT.nodes=[];BT.master=null;BT.sunG=null}
function btAudio(){btAudioStop();const c=ac();if(!c)return;const M=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;M.gain.value=0;M.gain.setTargetAtTime(.22,c.currentTime,2);lp.connect(M).connect(c.destination);BT.master=M;
 [[110,.3],[110.4,.3],[165,.12],[220.3,.06]].forEach(([f,v])=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;g.gain.value=v;o.connect(g).connect(lp);o.start();BT.nodes.push(o)});
 const sg=c.createGain();sg.gain.value=BT.sun?.5:0;sg.connect(lp);BT.sunG=sg;
 [55,82.4,61.7].forEach((f,i)=>{const o=c.createOscillator(),l=c.createOscillator(),lg=c.createGain(),g=c.createGain();o.type='triangle';o.frequency.value=f;l.frequency.value=.013+i*.007;lg.gain.value=f*.04;l.connect(lg).connect(o.frequency);g.gain.value=.18;o.connect(g).connect(sg);o.start();l.start();BT.nodes.push(o,l)})}
function btSun(on){BT.sun=on;if(BT.sunG)BT.sunG.gain.setTargetAtTime(on?.5:0,ac().currentTime,1.5)}
function btStop(){cancelAnimationFrame(BT.raf);clearTimeout(BT.timer);btAudioStop();document.body.classList.remove('bedtime');try{document.exitFullscreen&&document.fullscreenElement&&document.exitFullscreen()}catch(e){}}
RENDER.bedtime=function(){btStop();$('bedtime').innerHTML=`<div id="btwrap"><canvas id="btc"></canvas><div id="btword"></div>
<div id="btui"><button onclick="BT.breathe=!BT.breathe;this.textContent=BT.breathe?'🫧 Breathing guide: on':'🫧 Breathing guide: off'">🫧 Breathing guide: ${BT.breathe?'on':'off'}</button>
<button onclick="btSun(!BT.sun);this.textContent=BT.sun?'☀️ Sun song: on':'☀️ Sun song: off';$('btfact').classList.toggle('hidden',!BT.sun)">☀️ Sun song: ${BT.sun?'on':'off'}</button>
${[5,10,20].map(m=>`<button class="${BT.min===m?'p':''}" onclick="btStart(${m})">🌙 ${m} min</button>`).join('')}
<button onclick="btStop();show('hub')">⬅ Done</button>
<p id="btfact" class="${BT.sun?'':'hidden'}">☀️ Inspired by the Sun's vibrations. Scientists listen to the Sun's vibrations to learn what is inside it. This sound is made on your device, very slow and low.</p>
<p class="soft">A slow, gentle light and hum for winding down with a story. The screen fades and the sound goes quiet when the timer ends.</p></div></div>`;
 document.body.classList.add('bedtime');btStart(BT.min,true)};
function btStart(min,first){BT.min=min;BT.t0=performance.now();BT.end=BT.t0+min*60000;clearTimeout(BT.timer);if(!first)document.querySelectorAll('#btui button.p').forEach(b=>b.classList.remove('p'));
 btAudio();try{if(!first)$('btwrap').requestFullscreen?.().catch(()=>{})}catch(e){}cancelAnimationFrame(BT.raf);
 const st=lightStats(),hues=Object.keys(st.topics).map(t=>hashStr(t)%360);if(!hues.length)hues.push(hashStr(curProfile().id)%360);const cols=hues.slice(0,5).map(h=>lightColor(st,h));
 const loop=ts=>{const cv=$('btc');if(!cv||!cv.isConnected){btStop();return}BT.raf=requestAnimationFrame(loop);const W=cv.width=cv.clientWidth,H=cv.height=cv.clientHeight,x=cv.getContext('2d'),t=(ts-BT.t0)/1000;
  const left=Math.max(0,BT.end-ts),fade=Math.min(1,left/60000);if(left<=0){btAudioStop();cv.style.opacity=0;cancelAnimationFrame(BT.raf);$('btword').textContent='';return}
  if(BT.master&&left<60000)BT.master.gain.setTargetAtTime(.22*fade,ac().currentTime,.5);cv.style.opacity=.25+.75*fade;
  const ph=(t%8)/8,br=BT.breathe?(ph<.5?ph*2:2-ph*2):.5+.5*Math.sin(t*.4),ease=.5-.5*Math.cos(br*Math.PI);
  $('btword').textContent=BT.breathe?(ph<.5?'breathe in…':'and out…'):'';
  x.fillStyle='#03040a';x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';const S=Math.min(W,H)/2;
  cols.forEach((c,i)=>{const a=t*.05+i*2.1,r=S*(.35+.35*ease)*(1-i*.08),cx=W/2+Math.cos(a)*S*.08*i,cy=H/2+Math.sin(a)*S*.08*i,g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${c},${.35*fade})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(0,0,W,H)});
  const g=x.createRadialGradient(W/2,H/2,0,W/2,H/2,S*(.12+.12*ease));g.addColorStop(0,`rgba(255,244,220,${.5*fade})`);g.addColorStop(1,'rgba(255,244,220,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over'};
 BT.raf=requestAnimationFrame(loop)}
// ================= 3. NOTE-BLOCK COMPOSER =================
const NB_ROWS=[['C+',72,'#ff8fb1'],['A',69,'#ffb86b'],['G',67,'#ffe66b'],['E',64,'#9be86b'],['D',62,'#6be0e8'],['C',60,'#8fa8ff'],['👏 Clap','clap','#e0b3ff'],['🥁 Drum','kick','#ff7a7a']];
const NB_START={'Twinkle':['C:0,1;G:2,3;A:4,5;G:6;','kick:0,4,8,12'],'Twinkle 2':['E:0,1;D:2,3;D:4,5;C:6;','kick:0,8;clap:4,12'],'Rain drops':['C+:0;A:2;G:4;E:6;D:8;C:10;D:12;E:14','kick:0,8'],'Space beat':['C:0,3,6;G:8,11;A:14','kick:0,4,8,12;clap:2,6,10,14']};
let NB={g:null,bpm:100,ins:'bells',on:false,step:0,timer:0,name:''};
function nbEmpty(){return NB_ROWS.map(()=>Array(16).fill(0))}
function nbParse(s){const g=nbEmpty();s.join(';').split(';').filter(Boolean).forEach(p=>{const[k,v]=p.split(':'),r=NB_ROWS.findIndex(x=>x[0]===k||x[1]===k);if(r>=0)v.split(',').forEach(i=>g[r][+i]=1)});return g}
function nbSongs(){return safeJSON(LS.get('lamp_songs'),{})}
function drum(kind,t){const c=ac();if(!c)return;const g=c.createGain();g.connect(c.destination);
 if(kind==='kick'){const o=c.createOscillator();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(45,t+.2);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.6,t+.004);g.gain.exponentialRampToValueAtTime(.001,t+.3);g.gain.setTargetAtTime(0,t+.3,.008);o.connect(g);o.start(t);o.stop(t+.38);MSRC.push(o)}
 else{const b=c.createBuffer(1,c.sampleRate*.2,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(c.sampleRate*.03));const s=c.createBufferSource(),f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1500;s.buffer=b;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.003);g.gain.setTargetAtTime(0,t+.17,.008);s.connect(f).connect(g);s.start(t);MSRC.push(s)}}
function nbStop(){clearInterval(NB.timer);NB.on=false;document.querySelectorAll('.nbc.play').forEach(e=>e.classList.remove('play'))}
function nbSave(){const n=(prompt('Name your song:',NB.name||'My song')||'').trim().slice(0,30);if(!n)return;const S=nbSongs();S[n]={g:NB.g,bpm:NB.bpm,ins:NB.ins};LS.set('lamp_songs',JSON.stringify(S));NB.name=n;try{markDay('music')}catch(e){}renderCompose()}
function nbLoad(n,starter){nbStop();if(starter){NB.g=nbParse(NB_START[n]);NB.name=''}else{const s=nbSongs()[n];if(!s)return;NB.g=s.g;NB.bpm=s.bpm;NB.ins=s.ins;NB.name=n}renderCompose()}
function nbDel(n){if(!confirm('Delete '+n+'?'))return;const S=nbSongs();delete S[n];LS.set('lamp_songs',JSON.stringify(S));renderCompose()}
function renderCompose(){if(!NB.g)NB.g=nbParse(NB_START.Twinkle);const S=nbSongs(),el=$('music');
 el.innerHTML=`<div class="card big" style="background:#0b0d1c;color:#f6efe0"><h2>🧱 Note blocks</h2><p>Tap blocks to light them up, then press Play. Every note fits together, so it always sounds nice!</p>
 <div class="nbgrid">${NB_ROWS.map((row,r)=>`<div class="nbl" style="color:${row[2]}">${row[0]}</div>`+NB.g[r].map((v,s)=>`<button class="nbc ${v?'on':''} ${s%4===0?'beat':''}" style="--c:${row[2]}" data-r="${r}" data-s="${s}" onclick="nbTog(${r},${s})" aria-label="${row[0]} step ${s+1}"></button>`).join('')).join('')}</div>
 <p><button class="bigbtn p" id="nbplay" onclick="nbPlay()">${NB.on?'⏹ Stop':'▶ Play'}</button> <button class="bigbtn" onclick="nbStop();NB.g=nbEmpty();renderCompose()">🧽 Clear</button> <button class="bigbtn" onclick="nbSave()">💾 Save</button></p>
 <p><b>Instrument:</b> ${[['piano','🎹 Piano'],['bells','🔔 Bells'],['pad','☁️ Soft pad']].map(x=>`<button class="nbins ${NB.ins===x[0]?'p':''}" onclick="NB.ins='${x[0]}';document.querySelectorAll('.nbins').forEach(b=>b.classList.remove('p'));this.classList.add('p')">${x[1]}</button>`).join(' ')}
 <b>Speed:</b> <input type="range" min="60" max="160" value="${NB.bpm}" style="width:140px;vertical-align:middle" oninput="NB.bpm=+this.value;if(NB.on){nbStop();nbPlay()}"></p>
 <p><b>Try one:</b> ${Object.keys(NB_START).map(n=>`<button onclick="nbLoad('${n}',1)">${n}</button>`).join(' ')}</p>
 ${Object.keys(S).length?`<p><b>${esc(curProfile().name)}'s songs:</b> ${Object.keys(S).map(n=>`<button onclick="nbLoad(this.dataset.n)" data-n="${esc(n)}">🎵 ${esc(n)}</button><button onclick="nbDel(this.dataset.n)" data-n="${esc(n)}" title="Delete">✖</button>`).join(' ')}</p>`:''}
 <p class="soft" style="color:#bfb8a8">Songs are saved only on this device, for this kid. The notes are a pentatonic scale (C D E G A), used in music all over the world.</p>
 <button class="bigbtn" onclick="nbStop();MU={v:null};renderMusic()">⬅ Music</button></div>`}
{const rm=renderMusic;renderMusic=function(){nbStop();if(MU.v==='compose'){musicStop();return renderCompose()}rm();if(!MU.v){const g=$('music').querySelector('.hubgrid');if(g)g.insertAdjacentHTML('beforeend',`<button class="hubtile" onclick="MU={v:'compose'};renderMusic()"><span>🧱</span>Note blocks<small>Make a beat</small></button><button class="hubtile" onclick="show('cymatics')"><span>🌀</span>Sound shapes<small>See your voice</small></button>`)}};RENDER.music=renderMusic}
{const sh=show;show=function(id){if(id!=='cymatics')cyStop();if(id!=='bedtime')btStop();if(id!=='music')nbStop();sh(id)}}
// ================= 4. OFFLINE =================
const XC='lamplight-extra';let OFF={msg:'',size:null};
async function offList(){const r=await fetch('offline.json',{cache:'no-cache'});return r.json()}
function fmtMB(b){return(b/1048576).toFixed(1)+' MB'}
async function offSize(){try{const L=await offList();OFF.size=L.bytes;OFF.count=L.files.length}catch(e){OFF.size=null}renderOffline()}
async function offSave(){if(!('caches' in window)){OFF.msg='This browser cannot save for offline.';return renderOffline()}
 try{if(navigator.storage?.persist)OFF.persist=await navigator.storage.persist()}catch(e){}
 let L;try{L=await offList()}catch(e){OFF.msg='Connect to the internet once to download everything.';return renderOffline()}
 const c=await caches.open(XC),q=[...L.files];let done=0,bytes=0,fail=0;
 const bar=()=>{const p=$('offbar');if(p){p.value=bytes;p.max=L.bytes}const m=$('offmsg');if(m)m.textContent=`Saving… ${done}/${L.files.length} files (${fmtMB(bytes)} of ${fmtMB(L.bytes)})`};
 OFF.busy=true;renderOffline();
 await Promise.all([0,1,2,3,4,5].map(async()=>{while(q.length){const[f,sz]=q.shift();try{if(!(await c.match(f))){const r=await fetch(f,{cache:'no-cache'});if(!r.ok)throw 0;await c.put(f,r)}bytes+=sz}catch(e){fail++}done++;if(done%10===0||!q.length)bar()}}));
 OFF.busy=false;OFF.msg=fail?`Saved, but ${fail} files did not download. Tap again when the internet is steady.`:`✅ Everything is saved (${fmtMB(L.bytes)}). Every voice, language and song now works without internet.${OFF.persist?' This device promised to keep it.':''}`;RAW.set('lamp_offline_all',fail?'':'1');renderOffline()}
async function offRemove(){try{await caches.delete(XC)}catch(e){}RAW.del('lamp_offline_all');OFF.msg='Offline extras removed. The app still works offline with the voice and language you use.';renderOffline()}
function renderOffline(){const el=$('offcard');if(!el)return;const all=RAW.get('lamp_offline_all');
 el.innerHTML=`<h2>📶 Offline & install</h2><p><b>Works without internet after the first visit; tap Save everything to keep all voices and languages.</b></p>
 <p>${OFF.size?`Save everything: ${OFF.count} files, about <b>${fmtMB(OFF.size)}</b>.`:'Save everything: about 15 MB.'} ${all?'✅ Saved on this device.':''}</p>
 <button class="bigbtn p" onclick="offSave()" ${OFF.busy?'disabled':''}>⬇️ Save everything (all voices and languages)</button> <button class="bigbtn" onclick="offRemove()" ${OFF.busy?'disabled':''}>🗑️ Remove offline extras</button>
 <p><progress id="offbar" value="0" max="1" style="width:100%" class="${OFF.busy?'':'hidden'}"></progress></p><p id="offmsg">${OFF.msg}</p>
 <details><summary><b>📲 Add to home screen</b> (opens like an app)</summary>
 ${window.BIP?'<p><button class="bigbtn" onclick="BIP.prompt();BIP=null">📲 Install now</button></p>':''}
 <p><b>iPhone / iPad (Safari):</b> tap the Share button ⬆️, then “Add to Home Screen”.</p>
 <p><b>Android (Chrome):</b> tap the ⋮ menu, then “Add to Home screen” or “Install app”.</p>
 <p><b>Computer (Chrome or Edge):</b> click the install icon ⊕ at the right of the address bar, or the menu, then “Install Lamplight Learning”.</p>
 <p><b>Firefox on a computer:</b> bookmark the page. It still works offline after a visit.</p></details>`}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.BIP=e;renderOffline()});
{const ra=renderAdults;renderAdults=function(){ra();$('adults').insertAdjacentHTML('afterbegin','<div class="card" id="offcard"></div>');renderOffline();if(OFF.size==null)offSize()};RENDER.adults=renderAdults}
function netChip(){let c=$('netchip');if(!c){document.body.insertAdjacentHTML('beforeend','<div id="netchip"></div>');c=$('netchip')}const on=navigator.onLine;c.textContent=on?'● Online':'● Offline: still works';c.className=on?'on':'off'}
addEventListener('online',netChip);addEventListener('offline',netChip);netChip();
// Home tiles
{const rh=renderHub;renderHub=function(){rh();const g=$('hub').querySelectorAll('.hubgrid')[1];if(g)g.insertAdjacentHTML('beforeend',`<button class="hubtile" onclick="show('cymatics')"><span>🌀</span>Sound shapes</button><button class="hubtile" onclick="show('bedtime')"><span>🌙</span>Bedtime glow</button>`)};RENDER.hub=renderHub;if(!$('hub').classList.contains('hidden'))renderHub()}
{const re=renderEcho;renderEcho=function(){re();if(!ECUR)$('echo').insertAdjacentHTML('afterbegin',`<div class="card" style="text-align:center"><button class="bigbtn" onclick="show('cymatics')">🌀 Sound shapes: see your voice</button> <button class="bigbtn" onclick="show('bedtime')">🌙 Bedtime glow</button></div>`)};RENDER.echo=renderEcho}
document.head.insertAdjacentHTML('beforeend',`<style>
#netchip{position:fixed;right:8px;bottom:8px;z-index:200;font-size:.8rem;padding:3px 10px;border-radius:12px;background:#1d2a1d;color:#9fe29f;opacity:.85;pointer-events:none}#netchip.off{background:#2a1d1d;color:#ffcf8a}
body.bedtime header,body.bedtime nav,body.bedtime footer,body.bedtime #netchip{display:none!important}
#btwrap{position:fixed;inset:0;z-index:150;background:#03040a;color:#d9d2c3}#btc{position:absolute;inset:0;width:100%;height:100%;transition:opacity 2s}
#btword{position:absolute;top:46%;width:100%;text-align:center;font-size:clamp(1.4rem,5vw,2.4rem);color:#fff4dcaa;letter-spacing:.1em;pointer-events:none}
#btui{position:absolute;bottom:0;left:0;right:0;padding:12px;text-align:center;opacity:.45;transition:opacity .4s}#btui:hover,#btui:focus-within{opacity:1}#btui button{background:#151826;color:#d9d2c3;border-color:#333}#btui button.p{background:#3b3420}#btui p{max-width:560px;margin:8px auto;font-size:.9rem}
.nbgrid{display:grid;grid-template-columns:52px repeat(16,minmax(0,1fr));gap:3px;margin:12px 0;overflow-x:auto}.nbl{font-weight:bold;font-size:.85rem;align-self:center}
.nbc{aspect-ratio:1;min-width:0;width:100%;margin:0;padding:0;min-height:0;border-radius:6px;border:1px solid #2c3050;background:#161a30}.nbgrid .nbc{margin:0!important;padding:0!important}.nbc.beat{background:#1d2240}.nbc.on{background:var(--c);box-shadow:0 0 10px var(--c)}.nbc.play{outline:2px solid #fff8}.nbc.on.play{filter:brightness(1.6);box-shadow:0 0 22px var(--c),0 0 40px #fff6}
</style>`);
