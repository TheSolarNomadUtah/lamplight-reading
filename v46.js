// v46: Sound Lab fixes and additions, Paint upgrades. Everything stays on this device; no new files to download.
// ================= Sound Lab =================
// 1) Kundt's tube: beads have a velocity, walls are soft (they no longer stick at the ends), beads at antinodes get small kicks and
//    drift toward the nodes, so piles break up and re-form when the frequency changes. Reset scatters them evenly.
function labBeadsReset(){BEADS=[];const N=380;for(let i=0;i<N;i++)BEADS.push({u:(i+.5)/N,v:0,h:Math.random()})}
// 3) Pitch from the mic by autocorrelation (time domain, normalised, parabolic peak). Returns 0 when there is no clear note.
const LAB_TD=new Float32Array(2048);
micPitch=function(){const an=LAB.an;if(!an)return 0;an.fftSize=2048;an.getFloatTimeDomainData(LAB_TD);const d=LAB_TD,N=d.length,sr=AC.sampleRate;let rms=0;for(let i=0;i<N;i++)rms+=d[i]*d[i];rms=Math.sqrt(rms/N);if(rms<.01)return 0;
 const minL=Math.floor(sr/1000),maxL=Math.min(N>>1,Math.ceil(sr/80));let best=0,bl=0;const r=new Float32Array(maxL+2);
 for(let l=minL;l<=maxL+1;l++){let s=0,e1=0,e2=0;for(let i=0;i<N-l;i++){s+=d[i]*d[i+l];e1+=d[i]*d[i];e2+=d[i+l]*d[i+l]}r[l]=s/Math.sqrt(e1*e2+1e-12)}
 for(let l=minL+1;l<=maxL;l++)if(r[l]>r[l-1]&&r[l]>=r[l+1]&&r[l]>best){best=r[l];bl=l;if(best>.93)break}
 if(best<.8||!bl)return 0;const a=r[bl-1],b=r[bl],c=r[bl+1],sh=(a-c)/(2*(a-2*b+c)||1);return sr/(bl+sh)};
LAB.pf=0;
drawKundt=function(x,cv,t){const W=cv.width,H=cv.height,L=LAB.len;let f=LAB.f,on=!!LAB.tone,mic=false;
 if(LAB.an){const p=micPitch();if(p){LAB.pf=LAB.pf?LAB.pf*.8+p*.2:p;LAB.pt=t}if(LAB.pf&&t-(LAB.pt||0)<.6){f=LAB.pf;on=true;mic=true;const e=$('lab_fv');if(e)e.textContent=gNum(Math.round(f))+' Hz'}}
 const n=2*L*f/343,near=Math.max(1,Math.round(n)),tol=mic?1.3:3.2,res=on?Math.exp(-Math.pow((n-near)*tol,2)):0,k=Math.PI*near;
 x.fillStyle='#0a0d1c';x.fillRect(0,0,W,H);const tx=40,tw=W-80,ty=H/2-55,th=110;
 const grd=x.createLinearGradient(0,ty,0,ty+th);grd.addColorStop(0,'rgba(190,220,255,.16)');grd.addColorStop(.5,'rgba(190,220,255,.04)');grd.addColorStop(1,'rgba(190,220,255,.14)');
 x.fillStyle=grd;x.strokeStyle='rgba(200,225,255,.45)';x.lineWidth=2;x.beginPath();x.roundRect?x.roundRect(tx,ty,tw,th,18):x.rect(tx,ty,tw,th);x.fill();x.stroke();
 x.fillStyle='#c9a86a';x.fillRect(tx-14,ty+8,14,th-16);x.fillStyle='#6b7aa0';x.fillRect(tx+tw,ty+8,14,th-16);
 if(!BEADS||BEADS[0].v===undefined)labBeadsReset();
 const sp=LAB_RM?.25:1,NB=Math.round(tw/7),bins=new Array(NB).fill(0);
 if(on&&res>.3&&LAB.kn!==near){if(LAB.kn)LAB.shk=1;LAB.kn=near}const shk=LAB.shk||0;if(shk)LAB.shk=shk<.02?0:shk*.97;   // new mode: tap the tube so beads leave old piles (ends too) and re-form
 for(const b of BEADS){const a=Math.abs(Math.sin(k*b.u));
  if(on){b.v+=-.00045*sp*res*Math.sin(2*k*b.u)/near;                        // toward the nodes
   b.v+=(Math.random()-.5)*(.0014*(.25+a*res)+.03*shk)*sp;}                            // kicks: strongest where the air moves, a little everywhere while sound plays
  if(b.u<.035)b.v+=.00012*sp*(on?1:0);if(b.u>.965)b.v-=.00012*sp*(on?1:0);     // soft walls: the ends don't trap beads
  b.v*=.86;b.u+=b.v;if(b.u<.003){b.u=.003;b.v=Math.abs(b.v)*.5}if(b.u>.997){b.u=.997;b.v=-Math.abs(b.v)*.5}}
 BEADS.sort((p,q)=>p.u-q.u);
 for(const b of BEADS){const bi=Math.min(NB-1,Math.floor(b.u*NB)),lvl=bins[bi]++,a=Math.abs(Math.sin(k*b.u))*res,
  wob=LAB_RM?0:Math.sin(t*5+b.h*30)*a*2.5;
  const px=tx+8+(bi+.5)/NB*(tw-16)+(b.h-.5)*4,py=ty+th-9-lvl*3.2-a*10*b.h+wob;
  if(py<ty+8)continue;x.fillStyle=`rgba(255,${232-a*50|0},${190-a*70|0},.88)`;x.beginPath();x.arc(px,py,2.5,0,6.283);x.fill()}
 x.font='18px sans-serif';x.textAlign='center';
 if(on){for(let i=0;i<=near;i++){const px=tx+6+(i/near)*(tw-12);x.fillStyle=`rgba(255,213,138,${.25+.5*res})`;x.fillRect(px-1,ty+th+8,2,10)}
  x.fillStyle='#f6efe0';x.fillText(mic?gT('Your voice: {f} Hz. Mode {n}.',{f:gNum(Math.round(f)),n:gNum(near)}):(res>.6?gT('Resonance! Mode {n}: {k} nodes',{n:gNum(near),k:gNum(near+1)}):gT('Close to mode {n}. Slide a little.',{n:gNum(near)})),W/2,ty+th+48)}
 else{x.fillStyle='#bfb8a8';x.fillText(LAB.an?gT('Sing or hum a steady note.'):gT('Play a tone or use the microphone.'),W/2,ty+th+48)}
 x.fillStyle='#8f99b8';x.font='14px sans-serif';x.fillText(gT('Resonant notes for this tube: {f} Hz × 1, 2, 3 …',{f:gNum(Math.round(343/(2*L)))}),W/2,ty-18)};

// 4) Songs for the circles. Events: [step, midi, length in steps, hand 0 right / 1 left]
const LAB_SONGS=(()=>{const tw=[],ma=[];
 const T=[[60,60,67,67,69,69,67],[65,65,64,64,62,62,60],[67,67,65,65,64,64,62],[67,67,65,65,64,64,62],[60,60,67,67,69,69,67],[65,65,64,64,62,62,60]],
  TL=[[48,48,41,48],[41,48,43,48],[48,41,48,43],[48,41,48,43],[48,48,41,48],[41,48,43,48]];
 T.forEach((ph,p)=>{const o=p*16;ph.forEach((m,i)=>tw.push([o+i*2,m,i===6?4:2,0]));TL[p].forEach((m,i)=>tw.push([o+i*4,m,4,1]))});
 const M=[64,62,60,62,64,64,64,62,62,62,64,67,67,64,62,60,62,64,64,64,64,62,62,64,62,60],ML=[2,2,2,2,2,2,4,2,2,4,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,8];
 let s=0;M.forEach((m,i)=>{ma.push([s,m,ML[i],0]);s+=ML[i]});[48,48,43,48,48,48,43,48].forEach((m,i)=>ma.push([i*8,m,8,1]));
 return {elise:{n:'Für Elise',step:FE_STEP,ev:FE},twinkle:{n:'Twinkle Twinkle',step:.26,ev:tw.sort((a,b)=>a[0]-b[0])},mary:{n:'Mary Had a Little Lamb',step:.26,ev:ma.sort((a,b)=>a[0]-b[0])},draw:{n:'Draw your own'}}})();
LAB.song='elise';
const labSong=()=>LAB_SONGS[LAB.song]||LAB_SONGS.elise;
feSchedule=function(c,t0,key){const S=LAB_SONGS[key||LAB.song]||LAB_SONGS.elise;return S.ev.map(([s,m,l,h])=>labVoice(c,h?'square':'sawtooth',mtof(m),t0+s*S.step,l*S.step*.92,FE_VOL[h]))};
fePlay=function(){if(LAB.fe)return feStop();if(LAB.song==='draw')return shapePlay();const c=ac();if(!c)return;const t0=c.currentTime+.25;LAB.fe={t0,osc:feSchedule(c,t0),song:LAB.song};const b=$('lab_feplay');if(b)b.textContent=gT('Stop')};
// draw your own: drag a closed shape; it is traced by epicycles (DFT) and played as a waveform through the limiter
LAB.shape=null;LAB.drawPts=null;
function shapeFromPts(P){if(P.length<12)return null;P=P.concat([P[0]]);const seg=[0];for(let i=1;i<P.length;i++)seg.push(seg[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const Ltot=seg[seg.length-1];if(Ltot<60)return null;
 const N=128,R=[];let j=0;for(let i=0;i<N;i++){const s=i/N*Ltot;while(seg[j+1]<s)j++;const u=(s-seg[j])/((seg[j+1]-seg[j])||1);R.push([P[j][0]+(P[j+1][0]-P[j][0])*u,P[j][1]+(P[j+1][1]-P[j][1])*u])}
 let cx=0,cy=0;R.forEach(p=>{cx+=p[0];cy+=p[1]});cx/=N;cy/=N;
 const C=[];for(let k=-N/2;k<N/2;k++){let re=0,im=0;R.forEach((p,n)=>{const a=-2*Math.PI*k*n/N,x=p[0]-cx,y=p[1]-cy;re+=x*Math.cos(a)-y*Math.sin(a);im+=x*Math.sin(a)+y*Math.cos(a)});C.push({k,re:re/N,im:im/N,r:Math.hypot(re,im)/N})}
 C.sort((a,b)=>b.r-a.r);return {C:C.filter(c=>c.k!==0).slice(0,40),cx,cy,pts:R}}
function shapeWave(c,S){const H=24,re=new Float32Array(H+1),im=new Float32Array(H+1),N=S.pts.length;let mx=0;
 for(let h=1;h<=H;h++){let a=0,b=0;S.pts.forEach((p,n)=>{const y=p[1]-S.cy,ph=2*Math.PI*h*n/N;a+=y*Math.cos(ph);b+=y*Math.sin(ph)});re[h]=a/N;im[h]=b/N;mx=Math.max(mx,Math.hypot(re[h],im[h]))}
 for(let h=1;h<=H;h++){re[h]/=mx||1;im[h]/=mx||1}return c.createPeriodicWave(re,im)}
function shapePlay(c0,t0){const c=c0||ac();if(!c||!LAB.shape)return null;const b=labBus(c),o=c.createOscillator(),g=c.createGain();o.setPeriodicWave(shapeWave(c,LAB.shape));o.frequency.value=196;
 const t=t0!=null?t0:c.currentTime+.05;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.13,t+.08);g.gain.setValueAtTime(.13,t+2.2);g.gain.linearRampToValueAtTime(0,t+2.8);o.connect(g).connect(b.in);o.start(t);o.stop(t+2.9);return o}
function shapeDraw(x,W,H){x.fillStyle='#0a0d1c';x.fillRect(0,0,W,H);x.textAlign='center';
 if(LAB.drawPts&&LAB.drawPts.length){x.strokeStyle='#ffd58a';x.lineWidth=3;x.lineCap='round';x.beginPath();LAB.drawPts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();return}
 const S=LAB.shape;if(!S){x.fillStyle='#bfb8a8';x.font='22px sans-serif';x.fillText(gT('Draw a closed shape here with your finger.'),W/2,H/2);return}
 const per=LAB_RM?36:12,tt=(performance.now()/1000)%per/per*2*Math.PI;S.trail=S.trail||[];let X=S.cx,Y=S.cy;
 x.lineWidth=1;for(const c of S.C){const a=c.k*tt+Math.atan2(c.im,c.re),nx=X+c.r*Math.cos(a),ny=Y+c.r*Math.sin(a);x.strokeStyle='rgba(255,154,60,.28)';x.beginPath();x.arc(X,Y,c.r,0,6.283);x.stroke();x.strokeStyle='rgba(255,213,138,.7)';x.beginPath();x.moveTo(X,Y);x.lineTo(nx,ny);x.stroke();X=nx;Y=ny}
 x.strokeStyle='rgba(88,166,255,.25)';x.lineWidth=2;x.beginPath();S.pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.stroke();
 S.trail.push([X,Y]);if(S.trail.length>420)S.trail.shift();x.strokeStyle='#ffb067';x.lineWidth=2.5;x.beginPath();S.trail.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();
 x.fillStyle='#fff4dc';x.beginPath();x.arc(X,Y,4,0,6.283);x.fill()}
function shapeInput(){const cv=$('labc');if(!cv)return;cv.style.touchAction='none';const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
 cv.onpointerdown=e=>{if(LAB.song!=='draw')return;cv.setPointerCapture(e.pointerId);LAB.drawPts=[pos(e)];LAB.shape=null};
 cv.onpointermove=e=>{if(!LAB.drawPts)return;const p=pos(e),l=LAB.drawPts[LAB.drawPts.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])>3)LAB.drawPts.push(p)};
 cv.onpointerup=cv.onpointercancel=()=>{if(!LAB.drawPts)return;const S=shapeFromPts(LAB.drawPts);LAB.drawPts=null;LAB.shape=S;if(S){shapePlay();labUI()}}}
// circles + keyboard + staff, laid out to the canvas (phones: circles sit between the staff and the keyboard)
drawElise=function(x,cv){const W=cv.width,H=cv.height,c=AC;if(LAB.song==='draw')return shapeDraw(x,W,H);const S=labSong(),EV=S.ev;x.fillStyle='#0a0d1c';x.fillRect(0,0,W,H);
 const step=LAB.fe&&c?(c.currentTime-LAB.fe.t0)/S.step:-1;if(LAB.fe&&step>EV[EV.length-1][0]+10)feStop();
 const act=EV.filter(([s,,l])=>step>=s&&step<s+l);const cur=[0,1].map(h=>act.filter(e=>e[3]===h).pop());
 const nar=W<700,sy=[30,80],ln=7,kh=nar?80:90,ky=H-kh-12,R=nar?48:46,top=sy[1]+4*ln+16,cyR=top+R*1.75,cyL=ky-16-R*1.75;
 const vs=LAB_RM?.05:.25,tt=(c?c.currentTime:performance.now()/1000);
 [[0,'#ff9a3c',cyR,'saw'],[1,'#58a6ff',cyL,'sq']].forEach(([h,col,cy,kind])=>{const e=cur[h],f=e?mtof(e[1]):mtof(h?45:69),ph=tt*vs*f/110*6.283;
  const cx0=nar?R*1.6:120,tr0=nar?cx0+R*1.9:260,trN=Math.max(40,Math.floor(W-14-tr0));let X=cx0,Y=cy;x.lineWidth=nar?1.4:1;
  for(let i=1;i<=8;i++){const kk=kind==='saw'?i:2*i-1,r=R*(kind==='saw'?2/(Math.PI*i):4/(Math.PI*kk)),a=ph*kk;
   x.strokeStyle=e?col+'55':'#ffffff22';x.beginPath();x.arc(X,Y,r,0,6.283);x.stroke();const nx=X+r*Math.cos(a),ny=Y+(kind==='saw'&&i%2===0?1:-1)*r*Math.sin(a);x.strokeStyle=e?col:'#ffffff44';x.beginPath();x.moveTo(X,Y);x.lineTo(nx,ny);x.stroke();X=nx;Y=ny}
  x.strokeStyle=e?col:col+'44';x.lineWidth=2;x.beginPath();x.moveTo(X,Y);
  for(let j=0;j<=Math.min(460,trN);j++){const a=ph-j*.03;let y=0;for(let i=1;i<=8;i++){const kk=kind==='saw'?i:2*i-1;y+=(kind==='saw'?(i%2?1:-1)*2/(Math.PI*i):4/(Math.PI*kk))*Math.sin(a*kk)}x.lineTo(tr0+j,cy-R*.8*y)}x.stroke();
  x.strokeStyle=col+'44';x.lineWidth=1;x.beginPath();x.moveTo(X,Y);x.lineTo(tr0,Y);x.stroke()});
 const white=[];for(let m=FE_LO;m<=FE_HI;m++)if(![1,3,6,8,10].includes(m%12))white.push(m);const kw=(W-40)/white.length;
 const lit=m=>{const e=act.find(a=>a[1]===m);return e?(e[3]?'#58a6ff':'#ff9a3c'):null};
 white.forEach((m,i)=>{const l=lit(m);x.fillStyle=l||'#efe8d8';x.fillRect(20+i*kw,ky,kw-2,kh);if(m%12===0){x.fillStyle='#5a5a5a';x.font='11px sans-serif';x.textAlign='center';x.fillText('C'+(m/12-1),20+i*kw+kw/2,ky+kh-6)}});
 for(let m=FE_LO;m<=FE_HI;m++)if([1,3,6,8,10].includes(m%12)){const i=white.indexOf(m-1)+1;const l=lit(m);x.fillStyle=l||'#1d1d24';x.fillRect(20+i*kw-kw*.32,ky,kw*.64,kh*.6)}
 const php=W*.3;x.strokeStyle='#ffffff33';x.lineWidth=1;sy.forEach(y0=>{for(let i=0;i<5;i++){x.beginPath();x.moveTo(20,y0+i*ln);x.lineTo(W-20,y0+i*ln);x.stroke()}});
 x.fillStyle='#ffffff66';x.font='26px serif';x.textAlign='left';x.fillText('𝄞',22,sy[0]+26);x.fillText('𝄢',22,sy[1]+22);
 const dia=m=>{const pc=[0,0,1,1,2,3,3,4,4,5,5,6][m%12];return Math.floor(m/12)*7+pc},sharp=m=>[1,3,6,8,10].includes(m%12);
 const s0=Math.max(step,0),dx=S.step>.2?14:22;EV.forEach(([s,m,l,h])=>{const px=php+(s-s0)*dx;if(px<60||px>W-20)return;const base=h?dia(43):dia(64),y0=h?sy[1]+4*ln:sy[0]+4*ln,py=y0-(dia(m)-base)*ln/2;
  const on=step>=s&&step<s+l;x.fillStyle=on?(h?'#58a6ff':'#ff9a3c'):(h?'#58a6ff77':'#ff9a3c77');x.beginPath();x.ellipse(px,py,5,3.8,-.4,0,6.283);x.fill();if(sharp(m)){x.font='12px serif';x.fillText('♯',px-15,py+4)}});
 x.strokeStyle='#ffd58a88';x.beginPath();x.moveTo(php,sy[0]-8);x.lineTo(php,sy[1]+4*ln+8);x.stroke()};

// 2) + 5) Moiré: full ranges, smooth redraw, optional soft hum whose beat follows the offset
const moAng=a=>{a=((a%360)+360)%360;return Math.min(a,360-a)};
function moBeat(){const M=LAB.mo;return Math.min(8,moAng(M.a)*.25+Math.abs(M.s-1)*20+Math.hypot(M.dx,M.dy)*.004)}
function moHumOn(){const c=ac();if(!c)return;if(LAB.hum)return moHumOff();const b=labBus(c),g=c.createGain(),o1=c.createOscillator(),o2=c.createOscillator();o1.frequency.value=196;o2.frequency.value=196+moBeat();
 g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(.05,c.currentTime+.8);g.gain.setValueAtTime(.05,c.currentTime+42);g.gain.linearRampToValueAtTime(0,c.currentTime+45);
 o1.connect(g);o2.connect(g);g.connect(b.in);o1.start();o2.start();LAB.hum={o1,o2,g};LAB.humTm=setTimeout(()=>moHumOff(),45200);labUI()}
function moHumOff(){clearTimeout(LAB.humTm);const H=LAB.hum;if(!H)return;LAB.hum=null;try{H.g.gain.setTargetAtTime(0,AC.currentTime,.1);H.o1.stop(AC.currentTime+.6);H.o2.stop(AC.currentTime+.6)}catch(e){}if($('lab_hum'))labUI()}
drawMoire=function(x,cv,t){const W=cv.width,H=cv.height,M=LAB.mo;
 if(M.auto){const sp=LAB_RM?.15:1;M.a=3.2+1.6*Math.sin(t*.18*sp);M.s=1.04+.012*Math.sin(t*.11*sp)}
 if(LAB.hum&&AC)LAB.hum.o2.frequency.setTargetAtTime(196+moBeat(),AC.currentTime,.08);
 const bg=x.createRadialGradient(W/2,H/2,10,W/2,H/2,Math.max(W,H)*.7);bg.addColorStop(0,'#f1d9a8');bg.addColorStop(1,'#b9a6c9');x.fillStyle=bg;x.fillRect(0,0,W,H);const g=W<500?8:11;
 const mesh=(col,ang,sc,ox,oy)=>{x.save();x.translate(W/2+ox,H/2+oy);x.rotate(ang*Math.PI/180);x.scale(sc,sc);x.strokeStyle=col;x.lineWidth=g*.24;x.beginPath();const R=(Math.hypot(W,H)/2+Math.hypot(ox,oy))/sc+g;
  for(let p=-R;p<=R;p+=g){x.moveTo(p,-R);x.lineTo(p,R);x.moveTo(-R,p);x.lineTo(R,p)}x.stroke();x.restore()};
 mesh('rgba(38,30,70,.78)',0,1,0,0);mesh('rgba(20,40,80,.78)',M.a,M.s,M.dx,M.dy);
 const v=$('lab_mv');if(v)v.textContent=`${gNum(Math.round(moAng(M.a)*10)/10,1)}° · ×${gNum(M.s,2)}`};
// stop the hum with everything else
{const ls=labStop;labStop=function(){moHumOff();return ls()}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)moHumOff()});

// UI additions
{const lu=labUI;labUI=function(){lu();const el=$('lab');if(!el||el.classList.contains('hidden'))return;const t=LAB.toy;
 if(t==='kundt'){const b=[...el.querySelectorAll('button')].find(x=>/labToneOn/.test(x.getAttribute('onclick')||''));if(b)b.insertAdjacentHTML('afterend',` <button class="bigbtn" onclick="labBeadsReset()">${gT('Reset beads')}</button>`);
  const m=el.querySelector('.labmic');if(m)m.insertAdjacentHTML('afterend',`<p class="soft">${gT('Hold a steady note: the beads stack at the nodes for your pitch.')}</p>`)}
 if(t==='elise'){const p=$('lab_feplay');if(p){p.parentNode.insertAdjacentHTML('beforebegin',`<p class="labsongs">${Object.entries(LAB_SONGS).map(([k,s])=>`<button class="${LAB.song===k?'p':''}" onclick="feStop();LAB.song='${k}';LAB.shape=LAB.song==='draw'?LAB.shape:null;labUI()">${gT(s.n)}</button>`).join(' ')}</p>`);
   if(LAB.song==='draw'){p.textContent=gT('Play my shape');p.disabled=!LAB.shape;const hint=el.querySelector('.lab_rh');if(hint)hint.parentNode.outerHTML=`<p class="soft">${gT('Your shape becomes a wave. Bigger wiggles make brighter sounds.')}</p>`}}
  shapeInput()}
 if(t==='moire'){const sl=el.querySelectorAll('.labsl input');if(sl[0]){sl[0].min=0;sl[0].max=360;sl[0].step=.1;sl[0].value=LAB.mo.a}if(sl[1]){sl[1].min=.5;sl[1].max=2;sl[1].step=.001;sl[1].value=LAB.mo.s}
  const row=el.querySelector('.labsl');if(row)row.insertAdjacentHTML('beforeend',`<b id="lab_mv" dir="ltr" class="soft"></b>`);
  const bb=[...el.querySelectorAll('button')].find(x=>/LAB\.mo\.auto=LAB\.mo\.auto/.test(x.getAttribute('onclick')||''));if(bb)bb.insertAdjacentHTML('afterend',` <button id="lab_hum" aria-pressed="${!!LAB.hum}" onclick="moHumOn()">${LAB.hum?gT('Stop the hum'):gT('Soft hum')}</button>`)}}}

// ================= Paint =================
// 6) Mirror button (off, 4, 6, 8 around the center) · 7) Singing brush · 8) Night glow brush · 9) Fridge shelf (this device only)
PT.sing=false;let PSING_T=0;
const PENTA=[0,2,4,7,9];
function paintSing(p){const now=performance.now();if(!PT.sing||now-PSING_T<170)return;PSING_T=now;const c=ac();if(!c)return;const cv=$('pcv');if(!cv)return;
 const yN=1-Math.min(1,Math.max(0,p[1]/cv.height)),i=Math.round(yN*9),m=60+12*Math.floor(i/5)+PENTA[i%5];
 const b=labBus(c),o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),t=c.currentTime+.01;o.type='sine';o2.type='sine';o.frequency.value=mtof(m);o2.frequency.value=mtof(m)*2.005;
 const g2=c.createGain();g2.gain.value=.18;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.11,t+.04);g.gain.setTargetAtTime(0,t+.12,.16);o.connect(g);o2.connect(g2).connect(g);g.connect(b.in);o.start(t);o2.start(t);o.stop(t+1.1);o2.stop(t+1.1)}
{const ps=paintSeg;paintSeg=function(a,b){const r=ps(a,b);try{paintSing(b)}catch(e){}return r}}
function paintMirror(){const seq=[1,4,6,8],i=seq.indexOf(PT.sym);PT.sym=seq[(i+1)%seq.length];PT.mirror=true;guides();renderPaintBar()}
function paintNightGlow(){if(!PT.dark){if(!confirm(gT('Switch to night paper? This starts a new picture.')))return;PT.dark=true;PT.tool='glow';paintClear(true);return}PT.tool='glow';renderPaintBar()}
{const rp=renderPaint;renderPaint=function(){rp();const bar=document.querySelector('#pstudio .pbar');if(!bar)return;
 const mir=[4,6,8].includes(PT.sym)?gT('Mirror {n}',{n:gNum(PT.sym)}):gT('Mirror off');
 bar.insertAdjacentHTML('beforeend',`<button class="${[4,6,8].includes(PT.sym)?'on':''}" onclick="paintMirror()" title="${gT('Mirror around the center')}" aria-label="${gT('Mirror around the center')}">🪞 <small>${mir}</small></button>
 <button class="${PT.tool==='glow'&&PT.dark?'on':''}" onclick="paintNightGlow()" title="${gT('Glow brush on night paper')}" aria-label="${gT('Glow brush on night paper')}">🌙✨</button>
 <button class="${PT.sing?'on':''}" onclick="PT.sing=!PT.sing;renderPaintBar()" aria-pressed="${PT.sing}" title="${PT.sing?gT('Singing brush: on'):gT('Singing brush: off')}" aria-label="${PT.sing?gT('Singing brush: on'):gT('Singing brush: off')}">🎵 <small>${PT.sing?gT('On'):gT('Off')}</small></button>
 <button onclick="fridgeOpen()" title="${gT('Fridge shelf')}" aria-label="${gT('Fridge shelf')}">🧲</button>`);
 if(!$('pfridge'))$('pstudio').insertAdjacentHTML('beforeend','<div id="pfridge" class="hidden" role="dialog" aria-modal="true"></div>')}}
RENDER.paint=renderPaint;
// Fridge: IndexedDB (falls back to localStorage). Per profile, never uploaded. Cap: 24 pictures (localStorage: 6, small).
const FR_CAP=24,FR_CAP_LS=6;let FRDB=null;
function frDB(){if(FRDB)return FRDB;FRDB=new Promise(ok=>{try{const r=indexedDB.open('lamplight',1);r.onupgradeneeded=()=>{r.result.createObjectStore('fridge',{keyPath:'id'})};r.onsuccess=()=>ok(r.result);r.onerror=()=>ok(null)}catch(e){ok(null)}});return FRDB}
async function frList(){const db=await frDB(),pid=curPid();if(!db)return safeJSON(RAW.get('lamp_fridge@'+pid),[]);return new Promise(ok=>{const q=db.transaction('fridge').objectStore('fridge').getAll();q.onsuccess=()=>ok(q.result.filter(x=>x.pid===pid).sort((a,b)=>b.ts-a.ts));q.onerror=()=>ok([])})}
function frShrink(max){const cv=$('pcv'),s=Math.min(1,max/Math.max(cv.width,cv.height)),t=document.createElement('canvas');t.width=Math.round(cv.width*s);t.height=Math.round(cv.height*s);t.getContext('2d').drawImage(cv,0,0,t.width,t.height);return t.toDataURL('image/jpeg',.82)}
async function frSave(){const db=await frDB(),pid=curPid(),L=await frList();const msg=$('frmsg');
 if(L.length>=(db?FR_CAP:FR_CAP_LS)){if(msg)msg.textContent=gT('The fridge is full. Take a picture down first.');return}
 const it={id:pid+'_'+Date.now(),pid,ts:Date.now(),img:frShrink(db?900:420)};
 if(db){await new Promise(ok=>{const tx=db.transaction('fridge','readwrite');tx.objectStore('fridge').put(it);tx.oncomplete=ok;tx.onerror=ok})}else{L.unshift(it);try{RAW.set('lamp_fridge@'+pid,JSON.stringify(L))}catch(e){if(msg)msg.textContent=gT('There is no more room on this device.');return}}
 fridgeOpen(gT('On the fridge!'))}
async function frDel(id){if(!confirm(gT('Take this picture off the fridge?')))return;const db=await frDB();if(db){await new Promise(ok=>{const tx=db.transaction('fridge','readwrite');tx.objectStore('fridge').delete(id);tx.oncomplete=ok;tx.onerror=ok})}
 else{const pid=curPid();RAW.set('lamp_fridge@'+pid,JSON.stringify(safeJSON(RAW.get('lamp_fridge@'+pid),[]).filter(x=>x.id!==id)))}fridgeOpen()}
async function frView(id){const L=await frList(),it=L.find(x=>x.id===id);if(!it)return;$('pfridge').innerHTML=`<div class="frbox"><img src="${it.img}" alt="${gT('Your picture')}" class="frbig"><p class="soft">${new Date(it.ts).toLocaleDateString(document.documentElement.lang)}</p>
 <p><button onclick="fridgeOpen()">⬅ ${gT('Back')}</button> <button onclick="frDel('${it.id}')">🗑️ ${gT('Delete')}</button></p></div>`}
async function fridgeOpen(note){const f=$('pfridge');if(!f)return;const L=await frList(),db=await frDB(),cap=db?FR_CAP:FR_CAP_LS;f.classList.remove('hidden');
 f.innerHTML=`<div class="frbox"><h2>🧲 ${gT('Fridge shelf')}</h2><p class="soft">${gT('Pictures stay on this device. Nothing is uploaded.')} ${gT('{n} of {m} spaces used.',{n:gNum(L.length),m:gNum(cap)})}</p>
 <p><button class="bigbtn p" onclick="frSave()">${gT('Put this picture on the fridge')}</button> <button class="bigbtn" onclick="$('pfridge').classList.add('hidden')">${gT('Close')}</button></p><p id="frmsg" role="status">${note||''}</p>
 <div class="frgrid">${L.map(it=>`<button class="frthumb" onclick="frView('${it.id}')" aria-label="${gT('Open picture')}"><img src="${it.img}" alt=""></button>`).join('')||`<p class="soft">${gT('Nothing on the fridge yet.')}</p>`}</div></div>`}
document.head.insertAdjacentHTML('beforeend',`<style>
.labsongs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
#pfridge{position:absolute;inset:58px 0 0 0;background:rgba(10,12,24,.94);z-index:5;overflow:auto;color:#f6efe0;padding:14px}#pfridge.hidden{display:none}
.frbox{max-width:900px;margin:0 auto;text-align:center}.frbox .soft{color:#bfb8a8}
.frgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}.frthumb{padding:0;border-radius:10px;overflow:hidden;background:#222;border:2px solid #3a3f58}.frthumb img{display:block;width:100%;height:110px;object-fit:cover}
.frbig{max-width:100%;max-height:70vh;border-radius:12px;box-shadow:0 0 30px #0008}
.pbar button small{font-size:.7rem}
</style>`);
