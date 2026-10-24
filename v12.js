// v12: Voice picker (6 Kokoro voices, sung songs) + "My Light": a personal generative light that grows with reading.
// Everything is made on this device. Voice packs are files on our own site. Zero data leaves the device.
const VOICES=[['heart','Heart','Warm and natural (default)'],['bella','Bella','Bright and playful'],['michael','Michael','Calm, friendly man'],['emma','Emma','Soft British storyteller'],['puck','Puck','Cheerful, bouncy man'],['nicole','Nicole','Gentle, hushed bedtime']];
PKEYS.push('lamp_voice','lamp_lightseen');
function curVoice(){const v=LS.get('lamp_voice')||RAW.get('lamp_voice_family')||'heart';return VOICES.some(x=>x[0]===v)?v:'heart'}
function SINGMODE(){return RAW.get('lamp_singmode')||'sing'}
const VIDX={};function voiceIndex(v){v=v||curVoice();return VIDX[v]||(VIDX[v]=fetch(`audio/${v}/index.json`).then(r=>r.ok?r.json():[]).then(a=>new Set(a.map(f=>f.replace(/\.mp3$/,'')))).catch(()=>new Set()))}
const PHRK={'yes':'p_yes','good try. pick another one.':'p_try','great job!':'p_great','you read it! great job!':'p_read'};
function clipKey(t){const s=String(t).trim(),l=s.toLowerCase();if(PHRK[l])return PHRK[l];if(/^[a-z]$/i.test(s))return 'n_'+l;const m=l.replace(/^yes!\s*/,'');if(/^[a-z']+[.!?]?$/.test(l))return 'w_'+l.replace(/[^a-z]/g,'');return null}
voiceIndex();
const speak0=speak;
speak=function(t,rate){const k=clipKey(t),idx=VIDX[curVoice()];const fake={onend:null,onerror:null};
 if(k&&idx){idx.then(set=>{if(!set.has(k)){const u=speak0(t,rate);if(u){u.onend=()=>fake.onend&&fake.onend();u.onerror=u.onend}return}
  try{speechSynthesis.cancel()}catch(e){}loadClip(k).then(b=>{if(!b){const u=speak0(t,rate);if(u)u.onend=()=>fake.onend&&fake.onend();return}const c=ac(),s=c.createBufferSource();s.buffer=b;s.playbackRate.value=1;s.connect(c.destination);s.start();s.onended=()=>fake.onend&&fake.onend()})});return fake}
 return speak0(t,rate)};
// Picture cards: stretched sound (device voice) then the word in the family voice.
const cardSay0=cardSay;cardSay=function(){const deck=CARDS.filter(c=>c[0]===CD.deck),c=deck[CD.i%deck.length];voiceIndex().then(set=>{if(!set.has('w_'+mslug(c[1])+'.mp3')&&!set.has('w_'+mslug(c[1])))return cardSay0();
 document.querySelector('.wcard')?.classList.add('lit');loadClip('w_'+mslug(c[1])).then(b=>{const a=ac();if(!b||!a)return;[[1,0],[1,b.duration+.5]].forEach(([r,d])=>{const s=a.createBufferSource();s.buffer=b;s.playbackRate.value=r;s.connect(a.destination);s.start(a.currentTime+d)})});
 const cnt=safeJSON(LS.get('lamp_cards'),{});cnt[c[1]]=(cnt[c[1]]||0)+1;LS.set('lamp_cards',JSON.stringify(cnt));markDay('cards');lightCheck()})};
// ---------- Voice picker ----------
let VP={msg:''};
async function voiceSample(v){musicStop();const b=await loadClip('p_sample',v);if(b)playClip(b,0,1);else speak0('Hi! I can read with you.')}
async function voicePick(v,scope){VP.msg='Getting '+v+' ready…';renderVoicePick();try{const list=await fetch(`audio/${v}/index.json`).then(r=>r.json());let n=0;const q=[...list];
 await Promise.all([0,1,2,3].map(async()=>{while(q.length){const f=q.shift();try{await fetch(`audio/${v}/${f}`)}catch(e){}n++;if(n%20===0){VP.msg=`Downloading ${v}: ${n}/${list.length}`;renderVoicePick()}}}));
 if(scope==='kid')LS.set('lamp_voice',v);else{RAW.set('lamp_voice_family',v);LS.del('lamp_voice')}VP.msg='✅ '+VOICES.find(x=>x[0]===v)[1]+' is ready, and works offline now.'}catch(e){VP.msg='Could not download that voice right now. Try again when online.'}renderVoicePick()}
function renderVoicePick(){const el=$('vpick');if(!el)return;const cur=curVoice(),fam=RAW.get('lamp_voice_family')||'heart',kid=LS.get('lamp_voice'),p=curProfile();
 el.innerHTML=`<h2>🗣️ Reading & singing voice</h2><p class="soft">Used for letters, picture cards, tap-a-word, solo questions and songs. Each voice is about 2 MB and downloads only when you pick it. Now using: <b>${VOICES.find(x=>x[0]===cur)[1]}</b>${kid?' (just for '+esc(p.name)+')':''}.</p>
 <div class="hubgrid">${VOICES.map(v=>`<div class="hubtile ${v[0]===cur?'cur':''}" style="min-height:0"><b>${v[1]}</b><small>${v[2]}</small><button onclick="voiceSample('${v[0]}')">▶ Hear sample</button><button onclick="voicePick('${v[0]}','fam')">${v[0]===fam&&!kid?'✓ Family':'Use for family'}</button><button onclick="voicePick('${v[0]}','kid')">${v[0]===kid?'✓ '+esc(p.name):'Just '+esc(p.name)}</button></div>`).join('')}</div>
 <p><label><input type="checkbox" style="width:auto" ${SINGMODE()==='sing'?'checked':''} onchange="RAW.set('lamp_singmode',this.checked?'sing':'chant');renderVoicePick()"> Sung songs (tuned voice). Turn off for the older spoken chant.</label></p><p id="vpmsg">${VP.msg}</p>
 <p class="soft">Voices: Kokoro-82M (Apache-2.0), recorded ahead of time onto our own site. Words without a recording use the device's built-in voice.</p>`}
const renderLook0=renderLook;renderLook=function(){renderLook0();$('look').insertAdjacentHTML('afterbegin','<div class="card big" id="vpick"></div>');renderVoicePick()};
// ---------- My Light ----------
const OLO='#00ffd5';
function lightStats(){const log=getLog(),solo=getSolo(),D=getDays(),ids=new Set([...log.map(x=>x.story),...Object.keys(solo)]);
 const sim=+(new URLSearchParams(location.search).get('simlight')||0);const all=typeof S!=='undefined'?S:[];
 const topics={};[...ids].forEach(id=>{const s=all.find(x=>x.id===id);const t=s?(s.lvl||'').split('·').pop().trim().toLowerCase():'story';topics[t]=(topics[t]||0)+1});
 const reads=log.length+Object.keys(solo).length;let n=reads,ntop=Object.keys(topics).length,letters=Object.keys(safeJSON(LS.get('lamp_letters'),{})).length,streak=streakOf(D),days=Object.keys(D).length;
 if(sim){n=sim;ntop=Math.min(12,Math.ceil(sim/8));letters=Math.min(26,sim);streak=Math.min(30,Math.floor(sim/4));days=sim;for(let i=0;i<ntop;i++)topics['t'+i]=1}
 return{n,topics,ntop,letters,streak,days}}
const LAYERS=[[1,'Candle Amber','A candle was the first light people read by.','#FFB347'],[5,'Sunrise Coral','Golden seeds now spiral like a sunflower, using the golden ratio.','#FF7F6A'],[10,'Firefly Gold-Green','Fireflies make cold light. It does not get hot!','#C8E64C'],[25,'Ocean Blue','Glowing plankton light up ocean waves at night.','#2EC5FF'],[50,'Aurora Green','Oxygen high in the sky glows green in the northern lights.','#5CFFB0'],[75,'Nebula Magenta',"Magenta isn't in the rainbow. Your brain mixes it!",'#E040FB'],[100,'Starlight White','All the colors together make white light, like Isaac Newton found.','#FFFFFF'],[150,'Olo Turquoise','In 2025 scientists made a brand-new color, olo, by lighting single cells in the eye with a laser. So rare!','#00FFD5'],[200,'Cosmic Iridescent','Colors that shift, like a beetle shell or a soap bubble.','iri']];
function lightLevel(st){return LAYERS.filter(l=>st.n>=l[0]).length+(st.streak>=7?1:0)+(st.letters>=26?1:0)}
const hex2rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
// Perceptual brightness: OKLab lightness grows in equal visible steps, then converted to sRGB.
function oklab2rgb(L,a,b){const l=(L+.3963377774*a+.2158037573*b)**3,m=(L-.1055613458*a-.0638541728*b)**3,s=(L-.0894841775*a-1.291485548*b)**3;
 const f=x=>{x=Math.max(0,Math.min(1,x));return Math.round(255*(x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055))};return[f(4.0767416621*l-3.3077115913*m+.2309699292*s),f(-1.2684380046*l+2.6097574011*m-.3413193965*s),f(-.0041960863*l-.7034186147*m+1.707614701*s)]}
function lightColor(st,hue,lift){const L=.45+.5*(1-Math.exp(-st.n/25))+(lift||0),white=Math.min(1,st.ntop/10),C=.16*(1-.8*white),h=hue*Math.PI/180;return oklab2rgb(Math.min(.98,L),C*Math.cos(h),C*Math.sin(h))}
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return((s>>>0)%1e6)/1e6}}
const LOWEND=(navigator.hardwareConcurrency||4)<=4,RMOTION=matchMedia('(prefers-reduced-motion: reduce)').matches;
function makeLight(cv,opts){const p=curProfile(),st=lightStats(),seed=hashStr(p.id+p.name),R=rng(seed),ctx=cv.getContext('2d');
 const hues=Object.keys(st.topics).map(t=>hashStr(t)%360);if(!hues.length)hues.push(seed%360);const baseHue=seed%360;
 const nStars=Math.min(st.n,160),stars=[];for(let i=0;i<nStars;i++){const a=R()*6.283,r=.15+.8*Math.sqrt(R());stars.push([Math.cos(a)*r,Math.sin(a)*r,hues[i%hues.length],R()*6.28])}
 const parts=[],NP=st.streak>=7?(LOWEND?40:120):0;for(let i=0;i<NP;i++)parts.push([R()*6.28,.3+R()*.7,.2+R(),R()]);
 const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;let raf=0,last=0;const fps=LOWEND?20:30,stop={on:true};
 function frame(ts){if(!stop.on)return;if(!cv.isConnected){stop.on=false;return}if(!RMOTION)raf=requestAnimationFrame(frame);if(ts-last<1000/fps&&!RMOTION)return;last=ts;const t=RMOTION?0:ts/1000;
  const W=cv.width=cv.clientWidth*(opts.dpr||1),H=cv.height=cv.clientHeight*(opts.dpr||1),cx=W/2,cy=H/2,S0=Math.min(W,H)/2;ctx.globalCompositeOperation='source-over';ctx.fillStyle='#070914';ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
  const core=lightColor(st,baseHue,.03),br=.25+.75*(1-Math.exp(-st.n/30));
  // aurora
  if(st.n>=50){for(let k=0;k<3;k++){const c=lightColor(st,(hues[k%hues.length]+k*40)%360);ctx.beginPath();for(let x=0;x<=W;x+=W/40){const y=H*(.2+.08*k)+Math.sin(x/W*6+t*.4+k)*H*.06+Math.sin(x/W*13-t*.7)*H*.02;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.lineWidth=S0*.12;ctx.strokeStyle=rgba(c,.07);ctx.stroke();ctx.lineWidth=S0*.03;ctx.strokeStyle=rgba(c,.12);ctx.stroke()}}
  // core orb with bloom
  const pulse=1+.05*Math.sin(t*1.3),g=ctx.createRadialGradient(cx,cy,0,cx,cy,S0*(.35+.5*br)*pulse);g.addColorStop(0,rgba([255,250,235],.9*br));g.addColorStop(.25,rgba(core,.55*br));g.addColorStop(1,rgba(core,0));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.translate(cx,cy);
  LAYERS.filter(l=>st.n>=l[0]).forEach((l,i,A)=>{const c=l[3]==='iri'?oklab2rgb(.85,.15*Math.cos(t*.7),.15*Math.sin(t*.7)):hex2rgb(l[3]),r=S0*(.12+.09*i),gg=ctx.createRadialGradient(0,0,r*.6,0,0,r*1.25);gg.addColorStop(0,rgba(c,0));gg.addColorStop(.5,rgba(c,l[3]==='#00FFD5'?.5:.22));gg.addColorStop(1,rgba(c,0));ctx.fillStyle=gg;ctx.beginPath();ctx.arc(0,0,r*1.25,0,6.283);ctx.fill()});
  // phyllotaxis golden seeds
  if(st.n>=5){const N=Math.min(400,40+st.n*3),ga=Math.PI*(3-Math.sqrt(5));for(let i=0;i<N;i++){const r=S0*.62*Math.sqrt(i/N),a=i*ga+t*.05;const c=lightColor(st,(baseHue+i*.6)%360);ctx.fillStyle=rgba(c,.22);ctx.beginPath();ctx.arc(Math.cos(a)*r,Math.sin(a)*r,S0*.008*(1+i/N),0,6.283);ctx.fill()}}
  // flower of life
  if(st.n>=10){const r=S0*.16,c=lightColor(st,(baseHue+60)%360);ctx.strokeStyle=rgba(c,.28+.1*Math.sin(t));ctx.lineWidth=Math.max(1,S0*.004);ctx.rotate(t*.03);const pts=[[0,0]];for(let ring=1;ring<=2;ring++)for(let k=0;k<6*ring;k++){const a=k/(6*ring)*6.283;const d=ring===1?r:(k%2?r*Math.sqrt(3):2*r);pts.push([Math.cos(a+(ring===2&&k%2?Math.PI/6-Math.PI/6:0))*d,Math.sin(a)*d])}
   pts.forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.stroke()});ctx.rotate(-t*.03)}
  // mandala petals + spirals
  if(st.n>=25){const P=12,c=lightColor(st,(baseHue+180)%360);ctx.rotate(-t*.06);for(let k=0;k<P;k++){ctx.rotate(6.283/P);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(S0*.25,S0*.08,S0*.55,0);ctx.quadraticCurveTo(S0*.25,-S0*.08,0,0);ctx.strokeStyle=rgba(c,.3);ctx.stroke()}
   for(let k=0;k<4;k++){ctx.beginPath();for(let a=0;a<12;a+=.1){const r=S0*.02*Math.exp(.18*a);if(r>S0*.8)break;ctx.lineTo(Math.cos(a+k*1.57+t*.2)*r,Math.sin(a+k*1.57+t*.2)*r)}ctx.strokeStyle=rgba(c,.22);ctx.stroke()}ctx.rotate(t*.06)}
  // Olo
  if(st.n>=150){const o=ctx.createRadialGradient(0,0,S0*.05,0,0,S0*.3);o.addColorStop(0,'rgba(0,255,213,.55)');o.addColorStop(1,'rgba(0,255,213,0)');ctx.fillStyle=o;ctx.beginPath();ctx.arc(0,0,S0*.3*(1+.08*Math.sin(t*2)),0,6.283);ctx.fill()}
  // constellation: one star per story, lines connect them
  ctx.lineWidth=Math.max(1,S0*.003);for(let i=0;i<stars.length;i++){const s=stars[i],x=s[0]*S0*.9,y=s[1]*S0*.9,c=lightColor(st,s[2],.05),tw=.6+.4*Math.sin(t*2+s[3]);
   if(i){const q=stars[i-1];ctx.strokeStyle=rgba(c,.12);ctx.beginPath();ctx.moveTo(q[0]*S0*.9,q[1]*S0*.9);ctx.lineTo(x,y);ctx.stroke()}
   const sg=ctx.createRadialGradient(x,y,0,x,y,S0*.04);sg.addColorStop(0,rgba(c,.9*tw));sg.addColorStop(1,rgba(c,0));ctx.fillStyle=sg;ctx.fillRect(x-S0*.04,y-S0*.04,S0*.08,S0*.08)}
  // letters ring
  if(st.letters>0){const c=lightColor(st,(baseHue+120)%360);for(let i=0;i<st.letters;i++){const a=i/26*6.283-1.57;ctx.fillStyle=rgba(c,.7);ctx.beginPath();ctx.arc(Math.cos(a)*S0*.93,Math.sin(a)*S0*.93,S0*.012,0,6.283);ctx.fill()}}
  // streak particles
  parts.forEach(pp=>{const a=pp[0]+t*.1*pp[2],r=S0*(pp[1]+.05*Math.sin(t+pp[3]*6)),c=lightColor(st,(baseHue+pp[3]*90)%360);ctx.fillStyle=rgba(c,.5);ctx.fillRect(Math.cos(a)*r,Math.sin(a)*r,2,2)});
  ctx.restore()}
 raf=requestAnimationFrame(frame);return{st,stop:()=>{stop.on=false;cancelAnimationFrame(raf)}}}
let LV=null;
function lightCheck(){try{const st=lightStats(),lv=lightLevel(st),seen=+(LS.get('lamp_lightseen')||0);if(lv>seen){LS.set('lamp_lightseen',String(lv));if(seen>0||st.n>0)lightCelebrate(st)}}catch(e){}}
function lightCelebrate(st){const L=LAYERS.filter(l=>st.n>=l[0]).pop()||['','Sparkles','Your streak and letters add sparkles!','#FFB347'],d=document.createElement('div');d.className='lcele';d.innerHTML=`<div>✨</div><b>Your light grew brighter!</b><div style="width:60px;height:60px;margin:8px auto;border-radius:50%;background:${L[3]==='iri'?'conic-gradient(#f0f,#0ff,#ff0,#f0f)':L[3]};box-shadow:0 0 30px ${L[3]==='iri'?'#fff':L[3]}"></div><p><b>${L[1]}</b></p><p>${L[2]}</p><button onclick="this.parentNode.remove()">OK</button>`;document.body.appendChild(d);try{[72,76,79,84].forEach((m,i)=>note(m,ac().currentTime+i*.18,.6,'bells',.15))}catch(e){}setTimeout(()=>d.remove(),9000)}
SECTIONS.push('mylight');document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="mylight" class="hidden"></section>');
let LMUS=null;function calmMusic(on){clearInterval(LMUS);LMUS=null;if(!on)return;const ch=[[57,64,69],[53,60,65],[55,62,67],[52,59,64]];let k=0;const go=()=>{const c=ac();if(!c)return;ch[k++%4].forEach(m=>note(m,c.currentTime,3.5,'pad',.08))};go();LMUS=setInterval(go,4000)}
RENDER.mylight=function(){if(LV)LV.stop();const st=lightStats(),p=curProfile(),next=LAYERS.find(l=>st.n<l[0]);
 $('mylight').innerHTML=`<div class="card big" style="padding:0;overflow:hidden;background:#070914;color:#f6efe0"><canvas id="lightbig" style="width:100%;height:70vh;display:block"></canvas>
 <div style="padding:14px"><h2 style="margin:.2em 0">${p.av} ${esc(p.name)}'s Light</h2><p>${st.n} stor${st.n===1?'y':'ies'} · ${st.ntop} kinds · ${st.letters}/26 letters · ${st.streak}-day streak. ${next?`Next color at ${next[0]} stor${next[0]===1?'y':'ies'}.`:'Every layer unlocked!'}</p>
 <p class="soft" style="color:#bfb8a8">Every kid's light is one of a kind. Each kind of story adds its own color, and reading many kinds blends toward white light, like Isaac Newton found when he mixed the rainbow.</p>
 <button class="bigbtn" onclick="calmMusic(!LMUS);this.textContent=LMUS?'🔇 Music off':'🎶 Calm music'">🎶 Calm music</button> <button class="bigbtn" onclick="calmMusic(false);show('hub')">⬅ Home</button>
 <h3>🪜 Light Ladder</h3><div class="ladder">${LAYERS.map(l=>{const on=st.n>=l[0],bg=l[3]==='iri'?'conic-gradient(#f0f,#0ff,#ff0,#f0f)':l[3];return `<div class="rung ${on?'on':''}" onclick="this.classList.toggle('open')"><span style="background:${on?bg:'#2a2d3a'};box-shadow:${on?'0 0 18px '+(l[3]==='iri'?'#fff':l[3]):'none'}"></span><b>${on?l[1]:'???'}</b><small>${l[0]} stor${l[0]===1?'y':'ies'}</small>${on?`<p>${l[2]}</p>`:''}</div>`}).join('')}</div>
 <p class="soft" style="color:#bfb8a8">${st.streak>=7?'✅':'🔒'} 7-day streak: sparkles · ${st.letters>=26?'✅':'🔒'} all 26 letters: ring of letter-stars</p></div></div>`;
 LV=makeLight($('lightbig'),{dpr:Math.min(2,devicePixelRatio||1)})};
const renderHub0=renderHub;renderHub=function(){renderHub0();lightCheck();const lc=document.querySelector('#hub .lampcard>div');if(!lc)return;lc.innerHTML='<canvas id="lightmini" title="My Light" style="width:150px;height:150px;border-radius:50%;cursor:pointer;display:block"></canvas><button onclick="show(\'mylight\')" style="margin-top:6px">✨ My Light</button>';$('lightmini').onclick=()=>show('mylight');makeLight($('lightmini'),{dpr:1})};
document.head.insertAdjacentHTML('beforeend','<style>.lcele{position:fixed;left:50%;top:30%;transform:translate(-50%,-30%);z-index:99;background:radial-gradient(#fffbe8,#ffe7a3);border-radius:24px;padding:24px;text-align:center;box-shadow:0 0 80px 30px #ffe08a;max-width:340px;animation:lce 1s ease}.lcele>div:first-child{font-size:3rem}.ladder{display:flex;flex-wrap:wrap;gap:10px}.rung{width:96px;text-align:center;opacity:.45;cursor:pointer}.rung.on{opacity:1}.rung span{display:block;width:44px;height:44px;border-radius:50%;margin:0 auto 4px}.rung small{display:block;color:#bfb8a8}.rung p{display:none;font-size:.85rem}.rung.open p{display:block}@keyframes lce{from{transform:translate(-50%,-30%) scale(.3);opacity:0}}</style>');
RENDER.hub=renderHub;if(!$('hub').classList.contains('hidden'))renderHub();
