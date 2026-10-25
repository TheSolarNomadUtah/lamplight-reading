// v28: Star songs (real Kepler light curves turned into music) and Cymatica (a calm breathing + sound-shape prototype). Zero data, works offline.
SECTIONS.push('starsongs','cymatica');document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="starsongs" class="hidden"></section><section id="cymatica" class="hidden"></section>');
// ================= Star songs =================
let SGD=null;const sgData=()=>SGD||(SGD=fetch('stars.json').then(r=>r.json()));
const SG={i:0,mode:'pitch',on:0,pos:0};
const SGSCALE=[0,2,4,7,9];
const sgNote=v=>{const k=Math.round(v*14);return 57+Math.floor(k/5)*12+SGSCALE[k%5]};
function sgStop(){SG.on=0;clearTimeout(SG.tm);cancelAnimationFrame(SG.raf);if(SG.osc){const c=AC;SG.osc.forEach(o=>{try{o.g.gain.setTargetAtTime(0,c.currentTime,.1);o.stop(c.currentTime+.6)}catch(e){}});SG.osc=null}const b=$('sgplay');if(b)b.textContent='▶ '+String('Play the star')}
function sgNorm(f){const lo=Math.min(...f),hi=Math.max(...f);return f.map(x=>(x-lo)/((hi-lo)||1))}
function sgDraw(){const cv=$('sgc');if(!cv)return;const x=cv.getContext('2d'),W=cv.width,H=cv.height,s=SG.s;if(!s)return;const n=SG.n,N=n.length,p=Math.min(N-1,SG.pos|0),v=n[p];
 x.fillStyle='#050713';x.fillRect(0,0,W,H);
 // glowing star
 const cx=W*.2,cy=H*.45,r=30+v*40,g=x.createRadialGradient(cx,cy,0,cx,cy,r*2.6);g.addColorStop(0,`hsla(${s.kind==='cepheid'?40:s.kind==='binary'?200:50},100%,${70+v*25}%,1)`);g.addColorStop(.35,`hsla(${s.kind==='binary'?210:35},100%,60%,${.35+v*.5})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.beginPath();x.arc(cx,cy,r*2.6,0,7);x.fill();
 if(s.kind==='transit'&&v<.5){x.fillStyle='#050713';x.beginPath();x.arc(cx+(p%40-20)*.6,cy,9,0,7);x.fill()}
 // light curve
 const L=W*.38,R=W-16,T=24,B=H-30;x.strokeStyle='rgba(255,255,255,.18)';x.strokeRect(L,T,R-L,B-T);x.lineWidth=2;x.shadowBlur=10;x.shadowColor='#ffd54f';x.strokeStyle='#ffd54f';x.beginPath();n.forEach((y,i)=>{const X=L+i/(N-1)*(R-L),Y=B-y*(B-T);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();x.shadowBlur=0;
 x.strokeStyle='#7fe3ff';x.lineWidth=2;const X=L+p/(N-1)*(R-L);x.beginPath();x.moveTo(X,T);x.lineTo(X,B);x.stroke();x.fillStyle='#7fe3ff';x.beginPath();x.arc(X,B-v*(B-T),6,0,7);x.fill();
 x.fillStyle='#bfb8a8';x.font='14px system-ui';x.fillText((DICT&&DICT['brighter']||'brighter')+' ↑',L+4,T+16);x.fillText(`${gNum(p/(N-1)*s.days,1)} / ${gNum(s.days,1)} ${DICT&&DICT['days']||'days'}`,L+4,H-10)}
function sgPlay(){if(SG.on){sgStop();return}const c=ac();if(!c||!SG.s)return;SG.on=1;SG.pos=0;const N=SG.n.length,dur=24000/N;$('sgplay').textContent='⏸ '+String('Stop');
 if(SG.mode==='volume'){const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;lp.connect(c.destination);SG.osc=[220,330,440.5].map((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type=i?'sine':'triangle';o.frequency.value=f;g.gain.value=0;o.connect(g).connect(lp);o.start();o.g=g;return o})}
 let last=-1;const t0=performance.now();const step=()=>{if(!SG.on)return;SG.pos=(performance.now()-t0)/dur;const p=SG.pos|0;if(p>=N){sgStop();sgDraw();return}
  if(p!==last){last=p;const v=SG.n[p];if(SG.mode==='pitch'){if(p%2===0)note(sgNote(v),c.currentTime,.5,'glow',.16)}else SG.osc.forEach((o,i)=>o.g.gain.setTargetAtTime((.02+v*.11)/(i+1),c.currentTime,.05))}
  sgDraw();SG.raf=requestAnimationFrame(step)};step()}
RENDER.starsongs=function(){sgStop();$('starsongs').innerHTML=`<div class="card big" style="text-align:center;background:#050713;color:#f6efe0"><h2>✨ ${String('Star songs')}</h2><p>${String('Real starlight measured by NASA\'s Kepler space telescope, turned into music. Brighter light plays higher notes.')}</p><p id="sgpick"></p><canvas id="sgc" width="720" height="320" style="width:100%;max-width:720px;border-radius:20px"></canvas><p id="sgdesc" class="soft" style="color:#bfb8a8"></p>
 <p><button class="bigbtn p" id="sgplay" onclick="sgPlay()">▶ ${String('Play the star')}</button></p>
 <p><b>${gT('Brightness drives:')}</b> ${[['pitch','🎵 '+String('Pitch')],['volume','🔊 '+String('Volume')]].map(([k,l])=>`<button class="${SG.mode===k?'p':''}" onclick="sgStop();SG.mode='${k}';RENDER.starsongs()">${l}</button>`).join(' ')}</p>
 <p class="soft" style="color:#bfb8a8;font-size:.85rem" id="sgcred"></p><button class="bigbtn" onclick="sgStop();show('numbers')">⬅ ${String('Number music')}</button></div>`;
 sgData().then(d=>{const st=d.stars,s=SG.s=st[SG.i];SG.n=sgNorm(s.flux);$('sgpick').innerHTML=st.map((t,i)=>`<button class="${SG.i===i?'p':''}" onclick="sgStop();SG.i=${i};RENDER.starsongs()">${{transit:'🪐',binary:'👯',cepheid:'💓'}[t.kind]} ${String({transit:'Planet dip',binary:'Eclipsing stars',cepheid:'Pulsing star'}[t.kind])}</button>`).join(' ');
  const lo=Math.min(...s.flux),hi=Math.max(...s.flux);$('sgdesc').innerHTML=`<b>${s.name}</b><br><span>${s.desc}</span><br><span>${gT('Light changes by {p}',{p:gPct(hi-lo,s.kind==='transit'?2:0)})}</span>`;
  $('sgcred').innerHTML=`<span>${d.source}</span> KIC ${s.kic}, ${s.file}. <span>Bundled in the app, so it works offline.</span>`;sgDraw()}).catch(()=>{$('sgdesc').textContent=String('Could not load the star data.')})};
{const rn=RENDER.numbers;RENDER.numbers=function(){rn();const h=$('numbers').querySelector('h3');if(h&&!$('numbers').querySelector('[data-stars]'))h.insertAdjacentHTML('beforebegin',`<p><button class="bigbtn p" data-stars onclick="toyStop();nmStop();show('starsongs')">✨ ${String('Star songs')}</button> <span class="soft" style="color:#bfb8a8">${String('Real starlight from Kepler')}</span></p>`)}}
// ================= Cymatica (prototype) =================
const CMA={tone:136.1,pace:'46',min:5,on:0};
const CMPACE={'46':[4,0,6,'4 · 6'],'478':[4,7,8,'4 · 7 · 8'],'55':[5,0,5,'5 · 5']};
const CMTONES=[[136.1,'Ohm'],[174,'174 Hz'],[220,'A 220'],[256,'C 256']];
function cmStop(){CMA.on=0;cancelAnimationFrame(CMA.raf);clearTimeout(CMA.end);if(CMA.nodes){const c=AC;CMA.M.gain.setTargetAtTime(0,c.currentTime,.4);CMA.nodes.forEach(o=>{try{o.stop(c.currentTime+2)}catch(e){}});CMA.nodes=null}const b=$('cmgo');if(b)b.textContent='▶ '+String('Begin')}
function cmAudio(){const c=ac();if(!c)return;const M=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;M.gain.value=0;lp.connect(M).connect(c.destination);CMA.M=M;CMA.lp=lp;
 CMA.nodes=[[1,'sine',.5],[1.5,'sine',.22],[2,'triangle',.12],[1.003,'sine',.3]].map(([r,ty,v])=>{const o=c.createOscillator(),g=c.createGain();o.type=ty;o.frequency.value=CMA.tone*r;g.gain.value=v;o.connect(g).connect(lp);o.start();return o})}
function cmPhase(t){const [a,h,e]=CMPACE[CMA.pace],T=a+h+e,u=t%T,cyc=Math.floor(t/T);if(u<a)return['in',u/a,cyc];if(u<a+h)return['hold',1,cyc];return['out',1-(u-a-h)/e,cyc]}
function cmDraw(t){const cv=$('cmc');if(!cv)return;const x=cv.getContext('2d'),W=cv.width,N=120,[ph,b,cyc]=cmPhase(t),modes=[[0,2],[1,2],[2,3],[3,3],[1,4],[4,4],[2,5],[0,5]],[m,n]=modes[cyc%modes.length];
 if(!CMA.img)CMA.img=x.createImageData(N,N);const d=CMA.img.data,sharp=2+b*9,hue=200+40*Math.sin(cyc*.9);const col=[0,0,0].map((_,i)=>[150,190,255][i]);
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=i/(N-1)*2-1,v=j/(N-1)*2-1,r=Math.hypot(u,v),th=Math.atan2(v,u),k=(i+j*N)*4;if(r>1){d[k]=d[k+1]=d[k+2]=0;d[k+3]=255;continue}
  const val=besselJ(m,(n+1)*3.2*r)*Math.cos(m*th+t*.05),gl=Math.exp(-Math.abs(val)*sharp)*(.25+.75*b)*(1-r*r*.4);d[k]=gl*(hue>215?170:120);d[k+1]=gl*200;d[k+2]=gl*255;d[k+3]=255}
 if(!CMA.off){CMA.off=document.createElement('canvas');CMA.off.width=CMA.off.height=N}CMA.off.getContext('2d').putImageData(CMA.img,0,0);x.fillStyle='#03040c';x.fillRect(0,0,W,W);x.imageSmoothingEnabled=true;x.drawImage(CMA.off,0,0,W,W);x.globalCompositeOperation='lighter';x.filter='blur(6px)';x.drawImage(CMA.off,0,0,W,W);x.filter='none';x.globalCompositeOperation='source-over';
 x.strokeStyle=`rgba(255,213,79,${.25+b*.5})`;x.lineWidth=3;x.beginPath();x.arc(W/2,W/2,W*(.2+b*.27),0,7);x.stroke();
 const lab=$('cmbreath');if(lab){const s=ph==='in'?'Breathe in…':ph==='hold'?'Hold…':'Breathe out…';if(lab.dataset.s!==s){lab.dataset.s=s;lab.textContent=String(s)}}
 if(CMA.M){const c=AC;CMA.M.gain.setTargetAtTime(.05+b*.13,c.currentTime,.3);CMA.lp.frequency.setTargetAtTime(400+b*900,c.currentTime,.3)}}
function cmGo(){if(CMA.on){cmStop();return}cmAudio();CMA.on=1;$('cmgo').textContent='⏸ '+String('Rest');const t0=performance.now();const loop=()=>{if(!CMA.on)return;const t=(performance.now()-t0)/1000;cmDraw(t);const left=Math.max(0,CMA.min*60-t);const e=$('cmleft');if(e)e.textContent=`${Math.floor(left/60)}:${String(Math.floor(left%60)).padStart(2,'0')}`;
 if(left<=0){cmStop();try{note(84,AC.currentTime,3,'glow',.12);note(91,AC.currentTime+.4,3,'glow',.08)}catch(e){}const l=$('cmbreath');if(l)l.textContent=String('All done. Notice how you feel.');return}CMA.raf=requestAnimationFrame(loop)};loop()}
RENDER.cymatica=function(){cmStop();$('cymatica').innerHTML=`<div class="card big" style="text-align:center;background:#03040c;color:#f6efe0"><h2>🌀 Cymatica</h2><p class="soft" style="color:#bfb8a8">${String('Prototype. A soft tone, a slow breath, and a sound shape that forms as you breathe in and melts as you breathe out.')}</p>
 <canvas id="cmc" width="420" height="420" style="width:100%;max-width:420px;border-radius:50%"></canvas><p id="cmbreath" style="font-size:1.6rem;min-height:1.4em">${String('Ready when you are')}</p><p id="cmleft" class="soft" style="color:#bfb8a8"></p>
 <p><button class="bigbtn p" id="cmgo" onclick="cmGo()">▶ ${String('Begin')}</button></p>
 <p><b>${gT('Breath:')}</b> ${Object.entries(CMPACE).map(([k,v])=>`<button class="${CMA.pace===k?'p':''}" onclick="CMA.pace='${k}';RENDER.cymatica()">${v[3]}</button>`).join(' ')}</p>
 <p><b>${gT('Tone:')}</b> ${CMTONES.map(([f,l])=>`<button class="${CMA.tone===f?'p':''}" onclick="CMA.tone=${f};RENDER.cymatica()">${l}</button>`).join(' ')}</p>
 <p><b>${gT('Minutes:')}</b> ${[3,5,10].map(m=>`<button class="${CMA.min===m?'p':''}" onclick="CMA.min=${m};RENDER.cymatica()">${m}</button>`).join(' ')}</p>
 <p class="soft" style="color:#bfb8a8;font-size:.85rem">${String('The patterns use the same round-plate (Bessel) physics as Sound Shapes. This is for relaxing, not a medical treatment.')}</p><button class="bigbtn" onclick="cmStop();AR.v=null;show('arcade')">⬅ ${String('Grown-up arcade')}</button></div>`;cmDraw(0)};
{const sh=show;show=function(id){if(id!=='starsongs')sgStop();if(id!=='cymatica')cmStop();sh(id)}}
{const ra=RENDER.arcade;RENDER.arcade=function(){ra();if(!AR.v){const g=$('arcade').querySelector('.hubgrid');if(g&&!g.querySelector('[data-cymatica]'))g.insertAdjacentHTML('beforeend',`<button class="hubtile" data-cymatica onclick="show('cymatica')"><span>🌀</span>Cymatica<small>${String('Breathe with sound shapes')}</small></button>`)}}}
