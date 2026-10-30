// v44: Sound Lab (experimental, grown-ups). Behind a test flag: ?lab=1 or localStorage lamp_lab=1.
// Three toys made in code (Web Audio + canvas): Kundt's tube, Für Elise by Fourier epicycles, Moiré slider.
// No new files to download, no outside requests, no glow points or streak. All lab sound goes through one master limiter.
const LAB_ON=(()=>{try{if(/[?&]lab=1\b/.test(location.search))localStorage.setItem('lamp_lab','1');return localStorage.getItem('lamp_lab')==='1'}catch(e){return /[?&]lab=1\b/.test(location.search)}})();
SECTIONS.push('lab');document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="lab" class="hidden"></section>');
const LAB={toy:'kundt',raf:0,f:220,len:1,mic:null,micStream:null,an:null,fe:null,mo:{a:3.2,s:1.04,dx:0,dy:0,auto:1}};
const LAB_NARROW=()=>innerWidth<640;const LAB_RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const LAB_SVG=`<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><defs><radialGradient id="lg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd58a"/><stop offset="1" stop-color="#ffd58a" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="32" r="30" fill="url(#lg)" opacity=".35"/><path d="M6 32 Q 13 18 20 32 T 34 32 T 48 32 T 62 32" fill="none" stroke="#ffb067" stroke-width="2.4" stroke-linecap="round"/><path d="M6 32 Q 13 46 20 32 T 34 32 T 48 32 T 62 32" fill="none" stroke="#7fb8ff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>${[13,27,41,55].map(x=>`<circle cx="${x}" cy="32" r="2.6" fill="#fff4dc"/>`).join('')}</svg>`;

// ---------- Master bus: soft lowpass -> compressor/limiter -> output (half in Bedtime) ----------
// Measured with tools offline: peaks stay under -1.5 dBTP (see README v44).
const LAB_OUT=.42;function labBus(c){const bed=document.body.classList.contains('bedtime')?.5:1;if(c._lab){c._lab.out.gain.value=LAB_OUT*bed;return c._lab}const inG=c.createGain(),lp=c.createBiquadFilter(),cmp=c.createDynamicsCompressor(),out=c.createGain();
 lp.type='lowpass';lp.frequency.value=2600;lp.Q.value=.5;
 cmp.threshold.value=-20;cmp.knee.value=6;cmp.ratio.value=20;cmp.attack.value=.002;cmp.release.value=.15;
 out.gain.value=LAB_OUT*bed;inG.connect(lp).connect(cmp).connect(out).connect(c.destination);
 return c._lab={in:inG,out}}
function labVoice(c,type,f,t,dur,vol){const b=labBus(c),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.setTargetAtTime(vol*.55,t+.05,.12);g.gain.setTargetAtTime(0,t+Math.max(.06,dur),.06);
 o.connect(g).connect(b.in);o.start(t);o.stop(t+dur+.5);return o}

// ---------- Für Elise, opening (bars 1-8, first ending, played twice; A minor, 3/8). Steps are 16th notes. ----------
// [step, midi, length in 16ths, hand] hand 0 = right (sawtooth, orange), 1 = left (square, blue)
const FE=(()=>{const N={E2:40,A2:45,E3:52,'G#3':56,A3:57,C4:60,E4:64,'G#4':68,A4:69,B4:71,C5:72,D5:74,'D#5':75,E5:76};const ev=[];const r=(s,n,l)=>ev.push([s,N[n],l||1,0]),L=(s,n)=>ev.push([s,N[n],1,1]);
 const turn=s=>['E5','D#5','E5','B4','D5','C5'].forEach((n,i)=>r(s+i,n));
 for(let p=0;p<2;p++){const o=p*48;r(o,'E5');r(o+1,'D#5');turn(o+2);
  r(o+8,'A4',2);r(o+11,'C4');r(o+12,'E4');r(o+13,'A4');L(o+8,'A2');L(o+9,'E3');L(o+10,'A3');
  r(o+14,'B4',2);r(o+17,'E4');r(o+18,'G#4');r(o+19,'B4');L(o+14,'E2');L(o+15,'E3');L(o+16,'G#3');
  r(o+20,'C5',2);r(o+23,'E4');r(o+24,'E5');r(o+25,'D#5');L(o+20,'A2');L(o+21,'E3');L(o+22,'A3');
  turn(o+26);
  r(o+32,'A4',2);r(o+35,'C4');r(o+36,'E4');r(o+37,'A4');L(o+32,'A2');L(o+33,'E3');L(o+34,'A3');
  r(o+38,'B4',2);r(o+41,'E4');r(o+42,'C5');r(o+43,'B4');L(o+38,'E2');L(o+39,'E3');L(o+40,'G#3');
  r(o+44,'A4',p?6:4);L(o+44,'A2');L(o+45,'E3');L(o+46,'A3')}
 return ev.sort((p,q)=>p[0]-q[0])})();   // pass 2's pickup (steps 48-49) is the end of bar 8
const FE_STEP=.17;   // seconds per 16th (about dotted quarter = 59)
const FE_VOL=[.16,.11]; // right, left: quiet, the limiter keeps peaks safe
function feSchedule(c,t0){return FE.map(([s,m,l,h])=>labVoice(c,h?'square':'sawtooth',mtof(m),t0+s*FE_STEP,l*FE_STEP*.92,FE_VOL[h]))}
function feStop(){if(LAB.fe){(LAB.fe.osc||[]).forEach(o=>{try{o.stop()}catch(e){}});LAB.fe=null}const b=$('lab_feplay');if(b)b.textContent=gT('Play');}
function fePlay(){if(LAB.fe)return feStop();const c=ac();if(!c)return;const t0=c.currentTime+.25;LAB.fe={t0,osc:feSchedule(c,t0)};const b=$('lab_feplay');if(b)b.textContent=gT('Stop')}

// ---------- Mic (opt-in only) ----------
async function labMicOn(){if(LAB.micStream)return labMicOff();try{const s=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false}});
 const c=ac();LAB.micStream=s;const src=c.createMediaStreamSource(s),an=c.createAnalyser();an.fftSize=4096;src.connect(an);LAB.an=an;LAB.mic=src}catch(e){LAB.micMsg=gT('The microphone is not available.')}labUI()}
function labMicOff(){try{if(LAB.micStream)LAB.micStream.getTracks().forEach(t=>t.stop())}catch(e){}try{LAB.mic&&LAB.mic.disconnect()}catch(e){}LAB.micStream=null;LAB.mic=null;LAB.an=null;labUI()}
function micPitch(){const an=LAB.an;if(!an)return 0;const d=new Float32Array(an.frequencyBinCount);an.getFloatFrequencyData(d);const c=AC,bw=c.sampleRate/an.fftSize;let bi=0,bv=-200;
 for(let i=Math.floor(80/bw);i<Math.min(d.length,1300/bw);i++)if(d[i]>bv){bv=d[i];bi=i}return bv>-70?bi*bw:0}
document.addEventListener('visibilitychange',()=>{if(document.hidden){labMicOff();labToneOff();feStop()}});
{const sh=show;show=function(id){if(id!=='lab')labStop();return sh(id)}}

// ---------- Tone for the tube (gentle glow-style sine) ----------
function labToneOn(){const c=ac();if(!c)return;if(LAB.tone)return labToneOff();const b=labBus(c),o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain();o.type='sine';o2.type='triangle';
 o.frequency.value=LAB.f;o2.frequency.value=LAB.f;const g2=c.createGain();g2.gain.value=.25;o.connect(g);o2.connect(g2).connect(g);g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.32,c.currentTime+.4);g.connect(b.in);o.start();o2.start();LAB.tone={o,o2,g};labUI()}
function labToneOff(){const T=LAB.tone;if(!T)return;LAB.tone=null;const c=AC;try{T.g.gain.setTargetAtTime(0,c.currentTime,.08);T.o.stop(c.currentTime+.5);T.o2.stop(c.currentTime+.5)}catch(e){}labUI()}
function labSetF(f){LAB.f=f;if(LAB.tone){const c=AC;LAB.tone.o.frequency.setTargetAtTime(f,c.currentTime,.03);LAB.tone.o2.frequency.setTargetAtTime(f,c.currentTime,.03)}const e=$('lab_fv');if(e)e.textContent=gNum(Math.round(f))+' Hz'}
function labStop(){cancelAnimationFrame(LAB.raf);LAB.raf=0;labMicOff();labToneOff();feStop()}

// ---------- UI ----------
const labTxt={kundt:['Kundt\'s tube','Sound waves stack foam beads into columns. Beads gather where the air stays still (the nodes).'],
 elise:['Für Elise in circles','Spinning circles add up to the waves that play Beethoven\'s Für Elise: a sawtooth for the right hand, a square wave for the left.'],
 moire:['Moiré slider','Slide or turn one mesh over the other. Big ghost patterns appear from two fine grids.']};
function labUI(){const el=$('lab');if(!el||el.classList.contains('hidden'))return;const t=LAB.toy;
 const ctl=t==='kundt'?`<p><label>${gT('Tone')} <input id="lab_f" type="range" min="80" max="1200" step="1" value="${LAB.f}" oninput="labSetF(+this.value)" aria-label="${gT('Tone')}"></label> <b id="lab_fv" dir="ltr">${gNum(Math.round(LAB.f))} Hz</b></p>
  <p>${[['1','1'],['2','2'],['3','3'],['5','5'],['8','8']].map(([n])=>`<button onclick="labSetF(${n}*343/(2*LAB.len));const s=$('lab_f');if(s)s.value=LAB.f">${gT('Mode {n}',{n:gNum(+n)})}</button>`).join(' ')}</p>
  <p><label>${gT('Tube length')} <input type="range" min="0.6" max="1.6" step="0.01" value="${LAB.len}" oninput="LAB.len=+this.value;$('lab_lv').textContent=gNum(LAB.len,2)+' m'" aria-label="${gT('Tube length')}"></label> <b id="lab_lv" dir="ltr">${gNum(LAB.len,2)} m</b></p>
  <p><button class="bigbtn ${LAB.tone?'':'p'}" onclick="labToneOn()">${LAB.tone?gT('Stop tone'):gT('Play tone')}</button>
  <button class="bigbtn" onclick="labMicOn()" aria-pressed="${!!LAB.micStream}">${LAB.micStream?gT('Turn microphone off'):gT('Use microphone')}</button></p>
  ${LAB.micStream?`<p class="labmic" role="status"><span class="dot"></span> ${gT('Microphone is on. Sing or hum a note. Nothing is recorded or saved.')}</p>`:`<p class="soft">${gT('The microphone is only used if you turn it on. Nothing is recorded or saved.')}</p>`}${LAB.micMsg?`<p class="soft">${LAB.micMsg}</p>`:''}`
 :t==='elise'?`<p><button id="lab_feplay" class="bigbtn p" onclick="fePlay()">${LAB.fe?gT('Stop'):gT('Play')}</button></p><p class="soft"><span class="lab_rh">■</span> ${gT('Right hand: sawtooth wave')} · <span class="lab_lh">■</span> ${gT('Left hand: square wave')}</p>`
 :`<p><label>${gT('Turn')} <input type="range" min="0" max="20" step="0.05" value="${LAB.mo.a}" oninput="LAB.mo.a=+this.value;LAB.mo.auto=0"></label> <label>${gT('Size')} <input type="range" min="0.9" max="1.15" step="0.002" value="${LAB.mo.s}" oninput="LAB.mo.s=+this.value;LAB.mo.auto=0"></label></p>
  <p class="soft">${gT('Drag the picture to slide the top mesh.')}</p><p><button onclick="LAB.mo.auto=LAB.mo.auto?0:1;labUI()">${LAB.mo.auto?gT('Pause breathing'):gT('Let it breathe')}</button></p>`;
 el.innerHTML=`<div class="card big labcard"><div class="labhead">${LAB_SVG}<div><h2>${gT('Sound Lab')}</h2><b class="labexp">${gT('Experimental')}</b></div></div>
 <p class="soft">${gT('A test space for grown-ups and curious kids together. These toys do not count toward the light or the streak.')}</p>
 <div class="labtabs" role="tablist">${Object.entries(labTxt).map(([k,v])=>`<button role="tab" aria-selected="${k===t}" class="${k===t?'p':''}" onclick="labStop();LAB.toy='${k}';labUI()">${gT(v[0])}</button>`).join(' ')}</div>
 <h3>${gT(labTxt[t][0])}</h3><p>${gT(labTxt[t][1])}</p>
 <div class="labcv" dir="ltr"><canvas id="labc" width="${t==='moire'?(LAB_NARROW()?360:900):(LAB_NARROW()?560:900)}" height="${t==='elise'?560:t==='moire'?(LAB_NARROW()?380:520):(LAB_NARROW()?360:340)}"></canvas></div>${ctl}
 ${LAB_RM?`<p class="soft">${gT('Reduced motion is on, so the toys move slowly.')}</p>`:''}
 <p><button class="bigbtn" onclick="labStop();GM.v=null;show('games')">⬅ ${gT('Games')}</button></p></div>`;
 if(t==='moire')moireDrag();cancelAnimationFrame(LAB.raf);LAB.raf=requestAnimationFrame(labFrame)}
RENDER.lab=function(){labStop();labUI()};

// ---------- Drawing ----------
let LABT0=performance.now(),BEADS=null;
function labFrame(now){const cv=$('labc');if(!cv||$('lab').classList.contains('hidden')){LAB.raf=0;return}const x=cv.getContext('2d');const t=(now-LABT0)/1000;x.direction=document.documentElement.dir==='rtl'?'rtl':'ltr';
 if(LAB.toy==='kundt')drawKundt(x,cv,t);else if(LAB.toy==='elise')drawElise(x,cv);else drawMoire(x,cv,t);LAB.raf=requestAnimationFrame(labFrame)}
function drawKundt(x,cv,t){const W=cv.width,H=cv.height,L=LAB.len;let f=LAB.f,on=!!LAB.tone;if(LAB.an){const p=micPitch();if(p){f=p;on=true;const e=$('lab_fv');if(e)e.textContent=gNum(Math.round(p))+' Hz'}}
 const n=2*L*f/343,near=Math.round(n),res=on&&near>=1?Math.exp(-Math.pow((n-near)*3.2,2)):0,k=Math.PI*Math.max(near,1);   // resonance strength 0..1 and mode number
 x.fillStyle='#0a0d1c';x.fillRect(0,0,W,H);const tx=40,tw=W-80,ty=H/2-55,th=110;
 const grd=x.createLinearGradient(0,ty,0,ty+th);grd.addColorStop(0,'rgba(190,220,255,.16)');grd.addColorStop(.5,'rgba(190,220,255,.04)');grd.addColorStop(1,'rgba(190,220,255,.14)');
 x.fillStyle=grd;x.strokeStyle='rgba(200,225,255,.45)';x.lineWidth=2;x.beginPath();x.roundRect?x.roundRect(tx,ty,tw,th,18):x.rect(tx,ty,tw,th);x.fill();x.stroke();
 x.fillStyle='#c9a86a';x.fillRect(tx-14,ty+8,14,th-16);x.fillStyle='#6b7aa0';x.fillRect(tx+tw,ty+8,14,th-16);   // speaker + plug
 if(!BEADS){BEADS=[];for(let i=0;i<380;i++)BEADS.push({u:Math.random(),h:Math.random()})}
 const sp=LAB_RM?.2:1,NB=Math.round(tw/7),bins=new Array(NB).fill(0);
 for(const b of BEADS){                                                         // drift toward the nodes, with a little jostle so the piles stay soft
  if(res>.05)b.u+=-.0011*sp*res*Math.sin(2*k*b.u)/Math.max(near,1)*2;
  if(!LAB_RM)b.u+=(Math.random()-.5)*.0055*(on?.35+.65*res:.15);
  b.u=Math.min(.995,Math.max(.005,b.u))}
 BEADS.sort((p,q)=>p.u-q.u);
 for(const b of BEADS){const bi=Math.min(NB-1,Math.floor(b.u*NB)),lvl=bins[bi]++,a=Math.abs(Math.sin(k*b.u))*res,
  wob=LAB_RM?0:Math.sin(t*5+b.h*30)*a*2.5;                                     // small, slow shimmer where the air moves (antinodes)
  const px=tx+8+(bi+.5)/NB*(tw-16)+(b.h-.5)*4,py=ty+th-9-lvl*3.2-a*10*b.h+wob;
  if(py<ty+8)continue;x.fillStyle=`rgba(255,${232-a*50|0},${190-a*70|0},.88)`;x.beginPath();x.arc(px,py,2.5,0,6.283);x.fill()}
 x.fillStyle='rgba(255,213,138,.9)';x.font='18px sans-serif';x.textAlign='center';
 if(on&&near>=1){for(let i=0;i<=near;i++){const px=tx+6+(i/near)*(tw-12);x.fillStyle=`rgba(255,213,138,${.25+.5*res})`;x.fillRect(px-1,ty+th+8,2,10)}
  x.fillStyle='#f6efe0';x.fillText((res>.6?gT('Resonance! Mode {n}: {k} nodes',{n:gNum(near),k:gNum(near+1)}):gT('Close to mode {n}. Slide a little.',{n:gNum(near)})),W/2,ty+th+48)}
 else{x.fillStyle='#bfb8a8';x.fillText(gT('Play a tone or use the microphone.'),W/2,ty+th+48)}
 x.fillStyle='#8f99b8';x.font='14px sans-serif';x.fillText(gT('Resonant notes for this tube: {f} Hz × 1, 2, 3 …',{f:gNum(Math.round(343/(2*L)))}),W/2,ty-18)}

const FE_LO=40,FE_HI=76;
function drawElise(x,cv){const W=cv.width,H=cv.height,c=AC;x.fillStyle='#0a0d1c';x.fillRect(0,0,W,H);
 const step=LAB.fe&&c?(c.currentTime-LAB.fe.t0)/FE_STEP:-1;if(LAB.fe&&step>FE[FE.length-1][0]+8)feStop();
 const act=FE.filter(([s,,l])=>step>=s&&step<s+l);const cur=[0,1].map(h=>act.filter(e=>e[3]===h).pop());
 // epicycles (visual speed is slowed down a lot so nothing flickers)
 const vs=LAB_RM?.05:.25,tt=(c?c.currentTime:performance.now()/1000);
 [[0,'#ff9a3c',180,'saw'],[1,'#58a6ff',380,'sq']].forEach(([h,col,cy,kind])=>{const e=cur[h],f=e?mtof(e[1]):mtof(h?45:69),ph=tt*vs*f/110*6.283;
  let X=120,Y=cy;x.lineWidth=1;const R=46,trail=[];for(let i=1;i<=8;i++){const kk=kind==='saw'?i:2*i-1,r=R*(kind==='saw'?2/(Math.PI*i):4/(Math.PI*kk)),a=ph*kk;
   x.strokeStyle=e?col+'55':'#ffffff22';x.beginPath();x.arc(X,Y,r,0,6.283);x.stroke();const nx=X+r*Math.cos(a),ny=Y+(kind==='saw'&&i%2===0?1:-1)*r*Math.sin(a);x.strokeStyle=e?col:'#ffffff44';x.beginPath();x.moveTo(X,Y);x.lineTo(nx,ny);x.stroke();X=nx;Y=ny}
  // the wave the circles draw, as a slow-moving trace
  x.strokeStyle=e?col:col+'44';x.lineWidth=2;x.beginPath();x.moveTo(X,Y);
  for(let j=0;j<=460;j++){const a=ph-j*.03;let y=0;for(let i=1;i<=8;i++){const kk=kind==='saw'?i:2*i-1;y+=(kind==='saw'?(i%2?1:-1)*2/(Math.PI*i):4/(Math.PI*kk))*Math.sin(a*kk)}x.lineTo(260+j,cy-R*y)}x.stroke();
  x.strokeStyle=col+'44';x.lineWidth=1;x.beginPath();x.moveTo(X,Y);x.lineTo(260,Y);x.stroke()});
 // keyboard E2..E5
 const ky=440,kh=90,white=[];for(let m=FE_LO;m<=FE_HI;m++)if(![1,3,6,8,10].includes(m%12))white.push(m);const kw=(W-40)/white.length;
 const lit=m=>{const e=act.find(a=>a[1]===m);return e?(e[3]?'#58a6ff':'#ff9a3c'):null};
 white.forEach((m,i)=>{const l=lit(m);x.fillStyle=l||'#efe8d8';x.fillRect(20+i*kw,ky,kw-2,kh);if(m%12===0){x.fillStyle='#5a5a5a';x.font='11px sans-serif';x.textAlign='center';x.fillText('C'+(m/12-1),20+i*kw+kw/2,ky+kh-6)}});
 for(let m=FE_LO;m<=FE_HI;m++)if([1,3,6,8,10].includes(m%12)){const i=white.indexOf(m-1)+1;const l=lit(m);x.fillStyle=l||'#1d1d24';x.fillRect(20+i*kw-kw*.32,ky,kw*.64,kh*.6)}
 // simple sheet: treble + bass staff, notes scroll under a fixed playhead
 const sy=[30,80],ln=7,ph=W*.3;x.strokeStyle='#ffffff33';x.lineWidth=1;sy.forEach(y0=>{for(let i=0;i<5;i++){x.beginPath();x.moveTo(20,y0+i*ln);x.lineTo(W-20,y0+i*ln);x.stroke()}});
 x.fillStyle='#ffffff66';x.font='26px serif';x.textAlign='left';x.fillText('𝄞',22,sy[0]+26);x.fillText('𝄢',22,sy[1]+22);
 const dia=m=>{const pc=[0,0,1,1,2,3,3,4,4,5,5,6][m%12];return Math.floor(m/12)*7+pc},sharp=m=>[1,3,6,8,10].includes(m%12);
 const s0=Math.max(step,0);FE.forEach(([s,m,l,h])=>{const px=ph+(s-s0)*22;if(px<60||px>W-20)return;const base=h?dia(43):dia(64),y0=h?sy[1]+4*ln:sy[0]+4*ln,py=y0-(dia(m)-base)*ln/2;   // treble bottom line E4, bass G2
  const on=step>=s&&step<s+l;x.fillStyle=on?(h?'#58a6ff':'#ff9a3c'):(h?'#58a6ff77':'#ff9a3c77');x.beginPath();x.ellipse(px,py,5,3.8,-.4,0,6.283);x.fill();if(sharp(m)){x.font='12px serif';x.fillText('♯',px-15,py+4)}});
 x.strokeStyle='#ffd58a88';x.beginPath();x.moveTo(ph,sy[0]-8);x.lineTo(ph,sy[1]+4*ln+8);x.stroke()}

function moireDrag(){const cv=$('labc');if(!cv)return;let d=null;cv.style.touchAction='none';
 cv.onpointerdown=e=>{d={x:e.clientX,y:e.clientY,dx:LAB.mo.dx,dy:LAB.mo.dy};cv.setPointerCapture(e.pointerId);LAB.mo.auto=0};
 cv.onpointermove=e=>{if(!d)return;const r=cv.getBoundingClientRect(),s=cv.width/r.width;LAB.mo.dx=d.dx+(e.clientX-d.x)*s;LAB.mo.dy=d.dy+(e.clientY-d.y)*s};cv.onpointerup=cv.onpointercancel=()=>{d=null}}
function drawMoire(x,cv,t){const W=cv.width,H=cv.height,M=LAB.mo;
 if(M.auto){const sp=LAB_RM?.15:1;M.a=3.2+1.6*Math.sin(t*.18*sp);M.s=1.04+.012*Math.sin(t*.11*sp)}   // slow "breathing": well under 1 cycle per second
 const bg=x.createRadialGradient(W/2,H/2,10,W/2,H/2,Math.max(W,H)*.7);bg.addColorStop(0,'#f1d9a8');bg.addColorStop(1,'#b9a6c9');x.fillStyle=bg;x.fillRect(0,0,W,H);const g=W<500?8:11;
 const mesh=(col,ang,sc,ox,oy)=>{x.save();x.translate(W/2+ox,H/2+oy);x.rotate(ang*Math.PI/180);x.scale(sc,sc);x.strokeStyle=col;x.lineWidth=g*.24;x.beginPath();const R=Math.hypot(W,H);
  for(let p=-R;p<=R;p+=g){x.moveTo(p,-R);x.lineTo(p,R);x.moveTo(-R,p);x.lineTo(R,p)}x.stroke();x.restore()};
 mesh('rgba(38,30,70,.78)',0,1,0,0);mesh('rgba(20,40,80,.78)',M.a,M.s,M.dx,M.dy)}

// ---------- Hub tile (only with the flag), styles ----------
if(LAB_ON)GHUB.push(['lab','','Sound Lab','Experimental: tube, circles, moiré',10,"show('lab')"]);
{const rg=RENDER.games;RENDER.games=function(){rg();if(!LAB_ON||GM.v)return;const b=document.querySelector('#games .hubtile[data-g="lab"]');if(b){const s=b.querySelector('span');if(s)s.innerHTML=LAB_SVG;b.classList.add('labtile');b.insertAdjacentHTML('beforeend',`<b class="labexp">${gT('Experimental')}</b>`)}}}
document.head.insertAdjacentHTML('beforeend',`<style>
.labcard{text-align:center;background:#0b0e1d;color:#f6efe0}.labcard .soft{color:#bfb8a8}
.labhead{display:flex;gap:12px;align-items:center;justify-content:center}.labhead h2{margin:0}
.labexp{display:inline-block;font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:999px;background:#3a2a55;color:#e9dcff;border:1px solid #8a6fd1;letter-spacing:.04em;text-transform:uppercase}
.labtabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px 0}
.labcv canvas{width:100%;max-width:900px;height:auto;border-radius:14px;display:block;margin:8px auto;background:#0a0d1c}
.labmic{display:inline-flex;gap:8px;align-items:center;background:#4a1d1d;color:#ffe3e3;border:1px solid #ff8a8a;border-radius:999px;padding:6px 14px;font-weight:700}
.labmic .dot{width:12px;height:12px;border-radius:50%;background:#ff5a5a;box-shadow:0 0 8px #ff5a5a}
.lab_rh{color:#ff9a3c}.lab_lh{color:#58a6ff}.labcard input[type=range]{vertical-align:middle;width:min(60vw,320px)}
.labtile span svg{width:64px;height:64px}
</style>`);
