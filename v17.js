// v17: every song uses the warm "glow" synth from Bedtime Glow. No sung or pitch-shifted voices anywhere.
// Sound Shapes rebuilt on real plate physics (square-plate Chladni modes, round-plate Bessel modes, ripple tank) plus labeled nature patterns.
// ================= 1. GLOW SYNTH FOR ALL SONGS =================
{const nt=note;note=function(m,t,dur,inst,vol){if(inst!=='glow')return nt(m,t,dur,inst,vol);const c=ac();if(!c)return;vol=(vol||.25)*1.3;const f=mtof(m),lp=c.createBiquadFilter(),out=c.createGain();lp.type='lowpass';lp.frequency.value=Math.min(1400,Math.max(500,f*3));lp.Q.value=.3;out.gain.value=vol;lp.connect(out).connect(c.destination);
 const d=Math.max(.25,dur);[[f,.5],[f*1.0036,.5],[f*2,.1],[f/2,.12]].forEach(([fr,v])=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=fr;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+.07);g.gain.setValueAtTime(v,t+d*.85);g.gain.exponentialRampToValueAtTime(0.0001,t+d+.7);o.connect(g).connect(lp);o.start(t);o.stop(t+d+.8);MSRC.push(o)})}}
SINGMODE=function(){return'off'};
{const rk=runKaraoke;runKaraoke=function(tl,opts){opts=Object.assign({},opts||{},{inst:'glow',voice:false,bufs:null,sung:null});return rk(tl,opts)}}
singPlay=async function(say){const s=MUSIC.songs.find(x=>x.id===MU.s),tl=songTimeline(s,s.bpm*MU.sp);
 if(say){musicStop();speak(s.lines.map(l=>l.replace(/\|/g,'')).join('. '),.85);return}
 runKaraoke(tl,{beat:MU.beat,bpm:s.bpm*MU.sp,done:()=>{try{markDay('music')}catch(e){}const f=$('sfb');if(f)f.textContent='⭐ Great singing!'}})};
playLetterSong=function(L){musicStop();const i=MUSIC.letters.findIndex(x=>x[0]===L),r=MUSIC.letters[i],c=ac(),b=60/100;
 loadClip('l_'+L.toLowerCase()).then(buf=>{const t0=(c?c.currentTime:0)+.2;let t=0;letterTune(i).forEach(([m,d])=>{note(m,t0+t,d*b,'glow',.2);t+=d*b});
  playClip(buf,t0+t+.2,1.1,`${L} says ${r[1]}, ${r[1]}, ${r[1]}. ${r[2]} and ${r[3]}!`);const e=$('lsbig');if(e){e.classList.add('pop');later(()=>e.classList.remove('pop'),(t+2)*1000)}})};
cardSay=function(){const deck=CARDS.filter(c=>c[0]===CD.deck),c=deck[CD.i%deck.length];document.querySelector('.wcard')?.classList.add('lit');
 loadClip('w_'+mslug(c[1])).then(b=>{const a=ac();if(!b||!a){speak(c[1],.7);return}[0,b.duration+.6].forEach(d=>{const s=a.createBufferSource();s.buffer=b;s.connect(a.destination);s.start(a.currentTime+d)})});
 const cnt=safeJSON(LS.get('lamp_cards'),{});cnt[c[1]]=(cnt[c[1]]||0)+1;LS.set('lamp_cards',JSON.stringify(cnt));markDay('cards');try{lightCheck()}catch(e){}};
{const rm=renderMusic;renderMusic=function(){rm();const el=$('music');
 if(MU.v==='sing'&&MU.s){const bs=el.querySelectorAll('button');bs.forEach(b=>{const o=b.getAttribute('onclick')||'';if(o==='singPlay(true)'){b.textContent='🗣 Say the words';b.classList.remove('p')}if(o==='singPlay(false)'){b.textContent='▶ Play song';b.classList.add('p');b.parentNode.prepend(b)}});
  el.querySelector('.karaoke')?.insertAdjacentHTML('afterend','<p class="soft">The tune plays on the warm glow sound. Read or sing the glowing words. Tap “Say the words” to hear them spoken first.</p>')}
 if(MU.v==='make')el.querySelectorAll('button').forEach(b=>{if(/MU\.ins=/.test(b.getAttribute('onclick')||''))b.style.display='none'});
 el.querySelectorAll('p.soft').forEach(p=>{if(/are sung/.test(p.textContent))p.textContent='Every song plays on the same warm glow sound from Bedtime Glow. The words light up for you to read or sing. Nothing is recorded or saved.'})};RENDER.music=renderMusic}
{const vp=renderVoicePick;renderVoicePick=function(){vp();const el=$('vpick');if(el)el.querySelectorAll('label').forEach(l=>{if(/Sung songs/.test(l.textContent))l.parentNode.remove()})}}
// ================= 2. SOUND SHAPES: real physics =================
// Square plate: Chladni mode u=cos(nπx)cos(mπy) ± cos(mπx)cos(nπy); frequency grows with m²+n² (thin plate). Round plate: J_m(k_mn r)cos(mθ), frequency grows with k_mn².
// Ripple tank: wavelength = speed / frequency. A plate only "sings" a pattern near one of its resonant frequencies, so the nearest mode is shown.
CYPAT.length=0;CYPAT.push(['sq','Square plate'],['circle','Round plate'],['ripple','Ripple tank'],['interf','Two-source ripples'],['lissa','Lissajous (2 tones)'],['phyllo','Sunflower seeds'],['spiral','Spiral galaxy'],['shell','Nautilus shell'],['snow','Snowflake'],['dune','Sand dunes'],['rose','Rose curve'],['harmon','Harmonograph']);
const CYGROUP={physics:['sq','circle','ripple','interf','lissa'],nature:['phyllo','spiral','shell','snow','dune','rose','harmon']};
CY.pat='sq';CY.wave='glow';
function besJ(n,x){let s=0;const K=96;for(let k=0;k<K;k++){const t=Math.PI*(k+.5)/K;s+=Math.cos(n*t-x*Math.sin(t))}return s/K}
const BZ={};function besZeros(m){if(BZ[m])return BZ[m];const z=[];let x=m+.3,prev=besJ(m,x);while(z.length<6){x+=.02;const v=besJ(m,x);if(prev*v<0){let a=x-.02,b=x;for(let i=0;i<30;i++){const c=(a+b)/2;besJ(m,a)*besJ(m,c)<=0?b=c:a=c}z.push((a+b)/2)}prev=v}return BZ[m]=z}
const SQM=[];for(let m=1;m<=10;m++)for(let n=m+1;n<=12;n++)for(const sg of[1,-1])SQM.push({m,n,sg,k:m*m+n*n+(sg<0?.35:0)});SQM.sort((a,b)=>a.k-b.k);
const CIM=[];for(let m=0;m<=6;m++)besZeros(m).forEach((z,i)=>CIM.push({m,i,z,k:z*z}));CIM.sort((a,b)=>a.k-b.k);
const PLATE_F0=70;// lowest mode of each plate rings at 70 Hz
function plateMode(pat,hz){const L=pat==='sq'?SQM:CIM,k0=L[0].k,want=hz/PLATE_F0*k0;let best=L[0];L.forEach(md=>{if(Math.abs(Math.log(md.k/want))<Math.abs(Math.log(best.k/want)))best=md});return{md:best,res:PLATE_F0*best.k/k0}}
const CYCACHE={};
function plateField(pat,md,N){const key=pat+':'+JSON.stringify(md)+':'+N;if(CYCACHE[key])return CYCACHE[key];const F=new Float32Array(N*N);let mx=1e-9;
 for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=i/(N-1),v=j/(N-1);let val;
  if(pat==='sq')val=Math.cos(md.n*Math.PI*u)*Math.cos(md.m*Math.PI*v)+md.sg*Math.cos(md.m*Math.PI*u)*Math.cos(md.n*Math.PI*v);
  else{const x=u*2-1,y=v*2-1,r=Math.hypot(x,y);val=r>1?NaN:besJ(md.m,md.z*r)*Math.cos(md.m*Math.atan2(y,x))}
  F[j*N+i]=val;if(val===val)mx=Math.max(mx,Math.abs(val))}
 for(let k=0;k<F.length;k++)F[k]/=mx;return CYCACHE[key]=F}
cyDraw=function(cv,hz,t){const x=cv.getContext('2d'),W=cv.width,c=W/2,P=Math.PI,pat=CY.pat,hue=(Math.log2(hz/55)*120)%360,info=$('cyinfo');let label='';
 if(pat==='sq'||pat==='circle'){const N=170,{md,res}=plateMode(pat,hz),F=plateField(pat,md,N);if(!CY.pimg||CY.pimg.width!==N)CY.pimg=x.createImageData(N,N);const d=CY.pimg.data,[r0,g0,b0]=oklab2rgb(.8,.13*Math.cos(hue*P/180),.13*Math.sin(hue*P/180));
  const near=Math.abs(1200*Math.log2(hz/res)),amp=Math.max(.25,1-near/400),sh=.92+.08*Math.sin(t*6);
  for(let k=0;k<N*N;k++){const v=F[k],o=k*4;if(v!==v){d[o]=7;d[o+1]=9;d[o+2]=20;d[o+3]=255;continue}const sand=Math.exp(-Math.abs(v)*(10+20*amp))*amp*sh,plate=.12+.1*Math.abs(v);
   d[o]=Math.min(255,40*plate+r0*sand+120*sand*sand);d[o+1]=Math.min(255,40*plate+g0*sand+110*sand*sand);d[o+2]=Math.min(255,60*plate+b0*sand+100*sand*sand);d[o+3]=255}
  if(!CY.poff){CY.poff=document.createElement('canvas')}CY.poff.width=CY.poff.height=N;CY.poff.getContext('2d').putImageData(CY.pimg,0,0);x.globalCompositeOperation='source-over';x.fillStyle='#070914';x.fillRect(0,0,W,W);x.imageSmoothingEnabled=true;x.drawImage(CY.poff,0,0,W,W);
  x.globalCompositeOperation='lighter';x.filter='blur(4px)';x.globalAlpha=.6;x.drawImage(CY.poff,0,0,W,W);x.filter='none';x.globalAlpha=1;x.globalCompositeOperation='source-over';
  label=pat==='sq'?`Square plate mode (${md.m},${md.n}${md.sg<0?' −':' +'}) · resonates at ${Math.round(res)} Hz`:`Round plate mode: ${md.m} line${md.m===1?'':'s'} across, ${md.i} ring${md.i===1?"":"s"} inside · resonates at ${Math.round(res)} Hz`;
  label+=near<35?' · ✨ in resonance':' · move the tone closer to resonate'}
 else{x.globalCompositeOperation='source-over';x.fillStyle='rgba(7,9,20,.3)';x.fillRect(0,0,W,W);x.globalCompositeOperation='lighter';const col=a=>`hsla(${(hue+a)%360},90%,62%,`;const m=1+Math.floor(Math.log2(hz/55)*2),n=m+1+Math.round(hz/97)%3;
  if(pat==='ripple'||pat==='interf'){const N=130;if(!CY.rimg)CY.rimg=x.createImageData(N,N);const d=CY.rimg.data,lam=343/hz,k=2*P/(lam*W/ (2*N) *N/ (W/2))||1,kk=2*P/(lam/ (3.43/ (N/2)) );const K=2*P*hz/343*.06,om=2*P*.6;
   for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=(i/(N-1)*2-1)*N/2,v=(j/(N-1)*2-1)*N/2;let val;if(pat==='ripple'){const r=Math.hypot(u,v);val=Math.sin(K*r-om*t)/Math.sqrt(1+r*.15)}else{const a=Math.hypot(u-N*.15,v),b=Math.hypot(u+N*.15,v);val=(Math.sin(K*a-om*t)/Math.sqrt(1+a*.1)+Math.sin(K*b-om*t)/Math.sqrt(1+b*.1))}
    const g=Math.max(0,val)*1.4,o=(i+j*N)*4,[r0,g0,b0]=[90,170,255];d[o]=r0*g*.6+10;d[o+1]=g0*g*.8+14;d[o+2]=b0*g+30;d[o+3]=255}
   if(!CY.roff)CY.roff=document.createElement('canvas');CY.roff.width=CY.roff.height=N;CY.roff.getContext('2d').putImageData(CY.rimg,0,0);x.globalCompositeOperation='source-over';x.drawImage(CY.roff,0,0,W,W);label=`Ripple tank · ${Math.round(hz)} Hz → waves ${(343/hz*100).toFixed(0)} cm long in air. Higher tone = tighter rings.`+(pat==='interf'?' Two sources: bright and dark stripes are where waves add up or cancel.':'')}
  else if(pat==='lissa'){const r=hz/220;x.lineWidth=1.5;x.beginPath();for(let i=0;i<=3000;i++){const q=i/3000*2*P*12;const X=Math.sin(q*r+t*.3),Y=Math.sin(q);i?x.lineTo(c+X*W*.44,c+Y*W*.44):x.moveTo(c+X*W*.44,c+Y*W*.44)}x.strokeStyle=col(0)+'.8)';x.shadowColor=col(0)+'1)';x.shadowBlur=10;x.stroke();x.shadowBlur=0;label=`Lissajous: your tone (${Math.round(hz)} Hz) against 220 Hz. Simple ratios (2:1, 3:2) make still, closed shapes.`}
  else if(pat==='phyllo'){const k=Math.min(900,150+hz*.8);for(let i=0;i<k;i++){const a=i*2.39996,r=Math.sqrt(i)*W/2/Math.sqrt(k)*.95;x.fillStyle=col(i*.3)+'.85)';x.beginPath();x.arc(c+r*Math.cos(a),c+r*Math.sin(a),2+r/W*6,0,7);x.fill()}label='🌻 Nature pattern: seeds placed at the golden angle (137.5°). Higher tones add more seeds.'}
  else if(pat==='spiral'){const arms=2+m%4;for(let i=0;i<1400;i++){const arm=i%arms,f=i/1400,r=f*W*.47,a=arm*2*P/arms+f*(4+n)+t*.15;x.fillStyle=col(f*120)+(.7*(1-f)+.2)+')';x.beginPath();x.arc(c+r*Math.cos(a),c+r*Math.sin(a),1.6,0,7);x.fill()}label=`🌌 Nature pattern: a spiral galaxy with ${arms} arms.`}
  else if(pat==='shell'){const g=1.02+hz/20000;for(let i=0;i<120;i++){const a=i*.2,r=4*Math.pow(g,i*1.6);if(r>W)break;x.strokeStyle=col(i*2)+'.6)';x.lineWidth=1.2;x.beginPath();x.arc(c+Math.cos(a+t*.1)*r*.5,c+Math.sin(a+t*.1)*r*.5,r*.5,0,7);x.stroke()}label='🐚 Nature pattern: a nautilus grows a little bigger every turn (a logarithmic spiral).'}
  else if(pat==='snow'){const b=2+m%5;x.lineWidth=2;for(let s=0;s<6;s++){x.save();x.translate(c,c);x.rotate(s*P/3);x.strokeStyle=col(s*8)+'.9)';x.beginPath();x.moveTo(0,0);x.lineTo(0,-W*.44);for(let k=1;k<=b;k++){const y=-W*.44*k/(b+1),L=W*.12*(1-k/(b+2));x.moveTo(0,y);x.lineTo(L,y-L*.7);x.moveTo(0,y);x.lineTo(-L,y-L*.7)}x.stroke();x.restore()}label=`❄️ Nature pattern: snowflakes always have 6 arms. This one has ${b} branches per arm.`}
  else if(pat==='dune'){for(let row=0;row<40;row++){x.beginPath();for(let X=0;X<=W;X+=4){const Y=row*W/40+Math.sin(X/W*(n+2)*P+row*.4+t*.2)*W*.03;X?x.lineTo(X,Y):x.moveTo(X,Y)}x.strokeStyle=`hsla(${35+row},80%,${45+row%3*8}%,.8)`;x.lineWidth=2;x.stroke()}label='🏜️ Nature pattern: wind sorts sand into ripples and dunes.'}
  else if(pat==='rose'){x.lineWidth=1.5;x.beginPath();for(let i=0;i<=2400;i++){const q=i/2400*2*P*m,r=Math.cos(n/m*q);i?x.lineTo(c+r*Math.cos(q)*W*.44,c+r*Math.sin(q)*W*.44):x.moveTo(c+r*W*.44,c)}x.strokeStyle=col(0)+'.85)';x.stroke();label=`🌹 Math/nature pattern: rose curve ${n}/${m}.`}
  else{x.lineWidth=1.3;x.beginPath();for(let i=0;i<=2400;i++){const q=i/2400*2*P*12,dd=Math.exp(-q*.012);const X=(Math.sin(q*m*1.002+t*.2)+Math.sin(q*(n+.01)))*.5*dd,Y=(Math.sin(q*(n+.5)*1.001)+Math.sin(q*(m+1)+t*.1))*.5*dd;i?x.lineTo(c+X*W*.45,c+Y*W*.45):x.moveTo(c+X*W*.45,c+Y*W*.45)}x.strokeStyle=col(0)+'.85)';x.stroke();label='〰️ Math pattern: a harmonograph (two swinging pendulums drawing).'}
  x.globalCompositeOperation='source-over'}
 if(info)info.textContent=`${CY.src==='mic'?'🎙️ ':'🔊 '}${Math.round(hz)} Hz · ${label}`};
// Tones: audible on small speakers (fundamental + soft harmonics), glide when changed, and every button a different pitch
cyTone=function(hz){const c=ac();CY.tgt=hz;CY.src='tone';if(!c)return;if(CY.osc&&CY.osc.o.length){CY.osc.o.forEach((o,i)=>o.frequency.setTargetAtTime(hz*(i+1),c.currentTime,.04));return}
 const g=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2500;g.gain.value=0;g.gain.setTargetAtTime(.12,c.currentTime,.05);lp.connect(g).connect(c.destination);
 const os=[1,2,3].map((h,i)=>{const o=c.createOscillator(),og=c.createGain();o.type='sine';o.frequency.value=hz*h;og.gain.value=[1,.35,.15][i];o.connect(og).connect(lp);o.start();return o});CY.osc={o:os,g}};
cyToneOff=function(){if(CY.osc){const c=ac(),o=CY.osc;try{o.g.gain.setTargetAtTime(0,c.currentTime,.08);(o.o.length?o.o:[o.o]).forEach(x=>x.stop(c.currentTime+.4))}catch(e){}CY.osc=null}};
CYTONES.length=0;CYTONES.push(['90',90],['140',140],['200',200],['260',260],['330',330],['420',420],['520',520],['650',650],['800',800],['1000',1000]);
{const rc=RENDER.cymatics;RENDER.cymatics=function(){CY.hz=CY.tgt=CY.tgt||200;rc();const cv=$('cyc'),row=cv.previousElementSibling;
 if(row&&row.tagName==='DIV')row.outerHTML=`<div class="cygrp"><b>Plate physics</b> ${CYGROUP.physics.map(k=>`<button class="cypat ${CY.pat===k?'p':''}" onclick="cyPick('${k}',this)">${CYPAT.find(p=>p[0]===k)[1]}</button>`).join(' ')}</div><div class="cygrp"><b>Nature patterns</b> ${CYGROUP.nature.map(k=>`<button class="cypat ${CY.pat===k?'p':''}" onclick="cyPick('${k}',this)">${CYPAT.find(p=>p[0]===k)[1]}</button>`).join(' ')}</div>`;
 const sl=document.querySelector('#cymatics input[type=range]');if(sl){sl.setAttribute('min','80');sl.setAttribute('max','1100');sl.setAttribute('oninput',"cyTone(+this.value)");sl.value=Math.round(CY.tgt)}
 document.querySelectorAll('#cymatics p.soft').forEach(p=>{if(/Nature uses/.test(p.textContent))p.textContent='Plate physics: these are real vibration patterns. A metal plate only rings strongly at its resonant frequencies, and sand gathers on the lines that stay still (Chladni, 1787). Square plates follow cos·cos modes; round plates follow Bessel functions. Nature patterns are not made by sound; they are the shapes growth and wind make, played along with your tone.'})}}
function cyPick(k,b){CY.pat=k;document.querySelectorAll('.cypat').forEach(x=>x.classList.remove('p'));b.classList.add('p');const cv=$('cyc');if(cv){const x=cv.getContext('2d');x.fillStyle='#070914';x.fillRect(0,0,cv.width,cv.height)}}
document.head.insertAdjacentHTML('beforeend','<style>.cygrp{margin:6px 0;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center}</style>');
