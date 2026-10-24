// v19: QA fixes. Master audio bus, lookahead timing, softer synths, UI polish. Songs stay on the glow sound only.
// ---------- Master bus: everything → gain 0.8 → compressor (-18 dB, 3:1) → limiter (-1 dB, 20:1) → speakers ----------
function busInstall(c){if(!c||c._bus)return c;const real=c.destination,g=c.createGain(),cp=c.createDynamicsCompressor(),lim=c.createDynamicsCompressor();g.gain.value=.8;
 cp.threshold.value=-18;cp.ratio.value=3;cp.knee.value=6;cp.attack.value=.01;cp.release.value=.2;lim.threshold.value=-1;lim.ratio.value=20;lim.knee.value=0;lim.attack.value=.002;lim.release.value=.08;
 g.connect(cp).connect(lim).connect(real);Object.defineProperty(c,'destination',{value:g,configurable:true});c._bus={g,cp,lim,real};return c}
{const C=window.AudioContext||window.webkitAudioContext;if(C&&!AC){try{AC=busInstall(new C())}catch(e){}}else if(AC)busInstall(AC)}
{const pc=playClip;playClip=function(buf,when,gain,fb){return pc(buf,when,Math.min(1,gain||1),fb)}}
// ---------- Lookahead scheduler on the audio clock ----------
function lookahead(stepSec,onStep){const c=ac();if(!c)return{stop(){}};let next=c.currentTime+.06,i=0,on=true;const id=setInterval(()=>{if(!on)return;const hor=c.currentTime+.15;while(next<hor){onStep(i,next);i++;next+=typeof stepSec==='function'?stepSec(i):stepSec}},25);return{stop(){on=false;clearInterval(id)},get i(){return i}}}
let LMUS2=null;calmMusic=function(on){if(LMUS2){LMUS2.stop();LMUS2=null}LMUS=null;if(!on)return;const ch=[[57,64,69],[53,60,65],[55,62,67],[52,59,64]];LMUS2=lookahead(4,(k,t)=>ch[k%4].forEach(m=>note(m,t,3.5,'glow',.08)));LMUS=LMUS2};
nmPlay=function(){if(NM.on){nmStop();return}NM.on=true;NM.seq=nmDigits();NM.i=0;NM.hist=[];const b=$('nmplay');if(b)b.textContent='⏹ Stop';const c=ac();
 NM.sch=lookahead(()=>60/NM.bpm,(i,t)=>{if(!$('nmc')){nmStop();return}if(i>=NM.seq.length&&['times','fib','collatz','bday','own'].includes(NM.src)){setTimeout(nmStop,(t-c.currentTime)*1000);return}
  const v=NM.seq[i%NM.seq.length],m=nmNote(v,i);note(m,t,.5,NM.inst,.22);if(i%4===0&&NM.bass)note(m-24,t,1.2,'pad',.12);if(NM.drum&&i%2===0)drumHit(i%8===0?'kick':'hat',t);
  setTimeout(()=>{if(!NM.on)return;NM.i=i+1;NM.hist.push({v,m,i});if(NM.hist.length>160)NM.hist.shift();const d=$('nmdig');if(d)d.innerHTML=NM.seq.slice(Math.max(0,i-24),i+1).map((x,k,a)=>k===a.length-1?`<b>${x}</b>`:x).join(' ')},Math.max(0,(t-c.currentTime)*1000))});nmLoop()};
nmStop=function(){NM.on=false;if(NM.sch){NM.sch.stop();NM.sch=null}clearInterval(NM.timer);cancelAnimationFrame(NM.raf);const b=$('nmplay');if(b)b.textContent='▶ Play';nmIdle()};
function nmIdle(){const cv=$('nmc');if(!cv||NM.on||NM.toy)return;const x=cv.getContext('2d'),W=cv.width,H=cv.height;x.fillStyle='#070914';x.fillRect(0,0,W,H);const ds=nmDigits().slice(0,60);
 ds.forEach((v,i)=>{const a=i*2.39996,r=Math.sqrt(i+1)*H/18;x.fillStyle=`hsla(${(nmNote(v,i)*29)%360},80%,60%,.55)`;x.beginPath();x.arc(W/2+r*Math.cos(a),H/2+r*Math.sin(a),4+(v%10)*.6,0,7);x.fill()});
 x.fillStyle='#f6efe0';x.font='20px sans-serif';x.textAlign='center';x.fillText('Press ▶ Play to hear '+NSRC[NM.src][0],W/2,H-24);x.textAlign='start'}
{const rn=RENDER.numbers;RENDER.numbers=function(){rn();nmIdle()}}
nbPlay=function(){MU={v:'compose'};renderMusic();sqPlay()};
// ---------- Hear sample: loading / playing / error / needs internet ----------
voiceSample=async function(v){musicStop();const b=[...document.querySelectorAll('button')].find(x=>(x.getAttribute('onclick')||'')===`voiceSample('${v}')`),set=t=>{if(b)b.textContent=t};
 set('⏳ Loading…');let cached=false;try{cached=!!(await caches.match(`audio/${v}/p_sample.mp3`,{ignoreSearch:true}))}catch(e){}
 if(!navigator.onLine&&!cached){set('📶 Needs internet');if(b)b.title='This voice is not downloaded yet. Connect to the internet once to hear it.';setTimeout(()=>set('▶ Hear sample'),3500);return}
 const buf=await loadClip('p_sample',v);if(!buf){delete BUF[v+'/p_sample'];set('⚠️ Could not play');setTimeout(()=>set('▶ Hear sample'),3000);return}
 set('🔊 Playing…');const d=playClip(buf,0,1);setTimeout(()=>set('▶ Hear sample'),(d+.3)*1000)};
// ---------- Paint eraser really erases ----------
{const bs=brushStyle;brushStyle=function(x){bs(x);if(PT.tool==='eraser'){x.globalCompositeOperation='destination-out';x.strokeStyle='#000'}}}
{const pb=paintBg;paintBg=function(x){pb(x);const s=$('pstudio');if(s)s.style.background=PT.dark?'#0d0f1a':'#fffdf8'}}
paintSave=function(){const c=$('pcv'),o=document.createElement('canvas');o.width=c.width;o.height=c.height;const x=o.getContext('2d');x.fillStyle=PT.dark?'#0d0f1a':'#fffdf8';x.fillRect(0,0,o.width,o.height);x.drawImage(c,0,0);const a=document.createElement('a');a.href=o.toDataURL('image/png');a.download='lamplight-painting-'+dkey()+'.png';document.body.appendChild(a);a.click();a.remove();markDay('paint')};
// ---------- Trace: no hidden start badges, no text selection ----------
// ---------- Word scramble: timer and score visible from the start ----------
{const sh=arScrShow;arScrShow=function(){if(!AR.sl){AR.sl=[...SCR].sort(()=>Math.random()-.5);AR.si=0;AR.ss=0;if(!AR.end)AR.end=Date.now()+60000}sh();const t=$('scrt');if(t&&AR.end){const left=Math.max(0,Math.ceil((AR.end-Date.now())/1000));t.innerHTML=`⏱ ${left}s · Score <b>${AR.ss}</b> · Best ${AR.best.scr||0}`}}}
// ---------- Print explanation, Look heading, cards ----------
let PRINTMODE=0;
{const rl=renderLib;renderLib=function(){rl();if(PRINTMODE){$('lib').insertAdjacentHTML('afterbegin','<div class="card" id="printnote"><h2>🖨️ Print pages</h2><p>Pick any story below, then tap <b>🖨️ Print</b> on it. You get a one-page sheet with the story, the words to practice, and tracing lines. Nothing is sent anywhere; it prints from this device.</p><button onclick="PRINTMODE=0;renderLib()">Done</button></div>')}};RENDER.lib=renderLib}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const o=b.getAttribute('onclick')||'';if(o==="show('lib')"&&/Print/.test(b.textContent))PRINTMODE=1;else if(/show\(/.test(o)&&!/lib/.test(o))PRINTMODE=0},true);
{const lk=renderLook;renderLook=function(){lk();const lc=$('langcard');if(lc)$('look').appendChild(lc)};RENDER.look=renderLook}
// ---------- Spanish coach card preview words ----------
if(typeof LANG!=='undefined'&&LANG==='es')S.forEach(s=>{if(!s.words||!s.words.length){const seen=new Set();(s.text||'').split(/[^\p{L}]+/u).forEach(w=>{const k=w.toLowerCase();if(w.length>2&&!seen.has(k)&&seen.size<6)seen.add(k)});s.words=[...seen]}});
// ---------- Greeting: Arabic comma and translated default name ----------
{const rh=renderHub;renderHub=function(){rh();if(typeof LANG==='undefined'||LANG==='en')return;const h=$('hub').querySelector('h2');if(h)h.childNodes.forEach(n=>{if(n.nodeType===3){let t=n.nodeValue;const m=t.match(/^(\s*)(?:Hi|\S+)[,،]\s*(.+)!\s*$/);if(m){const nm=m[2].replace(/^Reader (\d+)$/,(x,d)=>(DICT.Reader||'Reader')+' '+d);t=m[1]+(DICT.Hi||'Hi')+(LANG==='ar'?'، ':', ')+nm+'!'}n.nodeValue=t}})};RENDER.hub=renderHub}
{const rb=renderBar;renderBar=function(){rb();if(typeof LANG!=='undefined'&&LANG!=='en'&&DICT.Reader)$('pbar').querySelectorAll('.pchip').forEach(b=>b.childNodes.forEach(n=>{if(n.nodeType===3)n.nodeValue=n.nodeValue.replace(/Reader (\d+)/,DICT.Reader+' $1')}))}}
document.head.insertAdjacentHTML('beforeend',`<style>
.cardart.mini{width:72px!important;height:72px!important;max-width:72px}#cards .hubtile span{display:block;height:76px;overflow:hidden}#cards .hubtile{overflow:hidden}
#trc{user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}#trace .card{user-select:none;-webkit-user-select:none}
.nw{white-space:nowrap;display:inline-block}#vpick button{white-space:nowrap}
@media (max-width:640px){.sqtracks{flex-direction:column}.sqtr{flex-wrap:wrap;width:100%;box-sizing:border-box}.sqtr select{max-width:46vw}.sqcard .bigbtn{padding:.5em .8em}.sqroll{height:50vh}#sqkeys{width:44px}}
</style>`);

{const tt=trText;trText=function(n){tt(n);const v=n.nodeValue;if(!v||typeof DICT==='undefined')return;let o=v;if(DICT['Coach card'])o=o.replace(/^(\s*)Coach card/,'$1'+DICT['Coach card']);const j=o.match(/^(\s*)Just (.+)$/);if(j&&DICT['Just'])o=j[1]+DICT['Just']+' '+j[2];if(o!==v)n.nodeValue=o}}
