/* v102: QA fix release for v101.
   1. Timed Bedtime sessions: one smooth 90s fade when the timer ends (no last-60s
      pre-fade and no snap back to full).
   2. Home FAB clearance on Bedtime at narrow widths.
   3. Sun song (and its fact) only while Glow is the scene.
   4. Sound-card loudness leveled with a bus compressor/limiter; no clipping.
   5. Unused UI language packs dropped from offline manifests (see gen_offline.py).
   6. Spanish wording in five Today’s Story texts, natural for kids.
   7. Clearer Web Audio for dog, duck, frog, rain, waves, and train.
   Do not close the shared AudioContext. */
(function(){
 const s=document.createElement('style');
 s.id='v102css';
 s.textContent='@media (max-width:640px){body.bedtime #btui{padding-bottom:calc(56px + 44px + 24px)}}';
 document.head.appendChild(s);
})();

/* ---------------- 6. Spanish story wording ---------------- */
function storiesFix102(){
 const reps=[
  ['d101_es_4_01','Formaron un rocío suelto','Quedaron esparcidas'],
  ['d101_es_4_01','Formaron un rociado suelto','Quedaron esparcidas'],
  ['d101_es_5_03','y las piezas suaves costaban de oír','y costaba oír las piezas suaves'],
  ['d101_es_5_03','Midiaron el volumen a tres horas del día','Midieron el volumen en tres momentos del día'],
  ['d101_es_1_05','una por el abrigo, y la otra por la compañía','una por cubrirla, y la otra por la compañía'],
  ['d101_es_2_05','había sillas justas','había justo las sillas necesarias'],
  ['d101_es_5_04','En Mirar al cielo, la clase','En Mira arriba, la clase'],
  ['d101_es_5_04','pueden abrir Mirar al cielo en la aplicación','pueden abrir Mira arriba en la aplicación']
 ];
 function patch(s){
  if(!s||!s.id)return;
  reps.forEach(([id,a,b])=>{
   if(s.id!==id)return;
   if(typeof s.text==='string'&&s.text.indexOf(a)>=0)s.text=s.text.split(a).join(b);
   if(typeof s.coach==='string'&&s.coach.indexOf(a)>=0)s.coach=s.coach.split(a).join(b);
   if(Array.isArray(s.coach))s.coach=s.coach.map(x=>typeof x==='string'&&x.indexOf(a)>=0?x.split(a).join(b):x);
   if(Array.isArray(s.q)){
    const raw=JSON.stringify(s.q);
    if(raw.indexOf(a)>=0)s.q=JSON.parse(raw.split(a).join(b));
   }
  });
 }
 if(typeof STORIES101!=='undefined'&&STORIES101.es)STORIES101.es.forEach(patch);
 if(typeof S!=='undefined'&&Array.isArray(S))S.forEach(patch);
 if(typeof DAILY64!=='undefined'&&Array.isArray(DAILY64))DAILY64.forEach(patch);
}
storiesFix102();

/* ---------------- 1. One smooth sleep fade ---------------- */
function btStart(min,first){
 BT.min=min;BT.t0=performance.now();BT.end=BT.t0+min*60000;BT.fading=false;
 clearTimeout(BT.timer);
 if(!first)document.querySelectorAll('#btui button.p').forEach(b=>b.classList.remove('p'));
 btAudio();
 try{if(!first)$('btwrap').requestFullscreen?.().catch(()=>{})}catch(e){}
 cancelAnimationFrame(BT.raf);
 const st=typeof lightStats==='function'?lightStats():{topics:{}},hues=Object.keys(st.topics||{}).map(t=>hashStr(t)%360);
 if(!hues.length)hues.push(hashStr((typeof curProfile==='function'&&curProfile().id)||'1')%360);
 const cols=hues.slice(0,5).map(h=>typeof lightColor==='function'?lightColor(st,h):'230,200,140');
 const loop=ts=>{
  const cv=$('btc');if(!cv||!cv.isConnected){btStop();return}
  BT.raf=requestAnimationFrame(loop);
  const W=cv.width=cv.clientWidth,H=cv.height=cv.clientHeight,x=cv.getContext('2d'),t=(ts-BT.t0)/1000;
  let fade=1;
  if(!BT.fading){
   const left=Math.max(0,BT.end-ts);
   if(left<=0)btSleepFade101(false);
  }
  if(BT.fading){
   const k=Math.min(1,(ts-BT.fadeT0)/BT.fadeDur);
   fade=1-k;
   if(BT.master){try{BT.master.gain.setTargetAtTime(.18*Math.max(0,fade),(typeof AC!=='undefined'&&AC&&AC.currentTime)||0,.4)}catch(e){}}
   if(k>=1){btAudioStop();cv.style.opacity=.12;const w=$('btword');if(w)w.textContent=gT('Good night');cancelAnimationFrame(BT.raf);BT.raf=0;return}
  }
  cv.style.opacity=.22+.78*Math.max(.08,fade);
  const ph=(t%8)/8,br=BT.breathe?(ph<.5?ph*2:2-ph*2):.5+.5*Math.sin(t*.4),ease=.5-.5*Math.cos(br*Math.PI);
  const w=$('btword');
  if(w&&!BT.fading)w.textContent=BT.breathe?(ph<.5?gT('breathe in…'):gT('breathe out…')):'';
  x.fillStyle='#03040a';x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
  const scene=BT.scene||'glow';
  if(scene==='glow')btDrawGlow101(x,W,H,t,ease,fade,cols);
  else if(scene==='wind'){btDrawGlow101(x,W,H,t,ease,fade*.45,cols);x.globalCompositeOperation='source-over';btDrawWind101(x,W,H,t,fade)}
  else if(scene==='rain'){btDrawGlow101(x,W,H,t,ease,fade*.4,cols);x.globalCompositeOperation='source-over';btDrawRain101(x,W,H,t,fade)}
  else if(scene==='stream'){btDrawGlow101(x,W,H,t,ease,fade*.4,cols);x.globalCompositeOperation='source-over';btDrawStream101(x,W,H,t,fade)}
  else if(scene==='waves'){btDrawGlow101(x,W,H,t,ease,fade*.4,cols);x.globalCompositeOperation='source-over';btDrawWaves101(x,W,H,t,fade)}
  x.globalCompositeOperation='source-over';
 };
 BT.raf=requestAnimationFrame(loop);
}

/* ---------------- 3. Sun song only in Glow ---------------- */
function btSunVis102(){
 const glow=(BT.scene||'glow')==='glow';
 const ui=$('btui');if(!ui)return;
 let b=ui.querySelector('[data-btsun102]');
 if(!b){
  b=[...ui.querySelectorAll('button')].find(x=>/Sun song|Canción del sol/.test(x.textContent||''));
  if(b)b.setAttribute('data-btsun102','1');
 }
 const fact=$('btfact');
 if(!glow){
  if(b)b.hidden=true;
  if(fact)fact.classList.add('hidden');
  return;
 }
 if(!b){
  b=document.createElement('button');
  b.type='button';
  b.setAttribute('data-btsun102','1');
  b.onclick=function(){btToggleSun101(b)};
  const breathe=[...ui.querySelectorAll('button')].find(x=>/Breathing guide|Guía de respiración/.test(x.textContent||''));
  const times=[...ui.querySelectorAll('button')].find(x=>/\d+\s*min/.test(x.textContent||''));
  if(breathe)breathe.after(b);
  else if(times)times.before(b);
  else ui.appendChild(b);
 }
 b.hidden=false;
 b.textContent=BT.sun?gT('Sun song: on'):gT('Sun song: off');
 if(fact)fact.classList.toggle('hidden',!BT.sun);
}
function btSetScene101(id){
 BT.scene=id;BT.fading=false;
 document.querySelectorAll('.btScene101 button').forEach(b=>b.classList.toggle('on',b.dataset.scene===id));
 if(typeof btAudio==='function')btAudio();
 btSunVis102();
}
(function(){
 const prev=RENDER.bedtime;
 RENDER.bedtime=function(){
  const r=prev.apply(this,arguments);
  btSunVis102();
  return r;
 };
})();

/* ---------------- 4 + 7. Sound cards: levels and clearer maybe-sounds ---------------- */
function scWhite102(c,dur,rate){
 const n=Math.floor((rate||22050)*dur),b=c.createBuffer(1,n,rate||22050),d=b.getChannelData(0);
 for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
 return b;
}
function scBus101(c){
 const M=c.createGain(),comp=c.createDynamicsCompressor(),lim=c.createDynamicsCompressor();
 const lp=c.createBiquadFilter(),out=c.createGain();
 lp.type='lowpass';lp.frequency.value=4200;lp.Q.value=.7;
 comp.threshold.value=-22;comp.knee.value=12;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.16;
 lim.threshold.value=-6;lim.knee.value=0;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.08;
 M.gain.value=.0001;
 out.gain.value=1.15;
 M.connect(comp);comp.connect(lim);lim.connect(lp);lp.connect(out);out.connect(c.destination);
 SC101.master=M;SC101.out=out;
 return M;
}
// Per-kind gain into the leveled bus. Tuned against OfflineAudioContext measurements.
const SCGAIN102={
 cat:1.35,dog:2.4,cow:1.55,duck:2.6,bird:1.45,bee:.95,frog:2.2,owl:.55,turtle:2.1,
 rain:1.7,thunder:.14,wind:.48,waves:.38,
 drip:.85,bell:.55,drum:1.2,bike:.95,train:.32,horn:.55
};
function scDogYap103(c,dest,dt,spec){
 const o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();
 o.type='sawtooth';
 o.frequency.setValueAtTime(spec.f0,dt);
 o.frequency.exponentialRampToValueAtTime(spec.f1,dt+.045);
 f.type='bandpass';f.frequency.value=spec.form;f.Q.value=2.4;
 scEnv101(g,dt,.002,0,.055,spec.amp);
 o.connect(f);f.connect(g);g.connect(dest);
 o.start(dt);o.stop(dt+.09);
 SC101.nodes.push(o);
 const click=c.createBufferSource(),hp=c.createBiquadFilter(),cg=c.createGain();
 click.buffer=(typeof scWhite102==='function'?scWhite102:scNoise101)(c,.03,22050);
 hp.type='highpass';hp.frequency.value=1800;hp.Q.value=.8;
 scEnv101(cg,dt,.001,0,.02,spec.amp*.7);
 click.connect(hp);hp.connect(cg);cg.connect(dest);
 click.start(dt);click.stop(dt+.035);
 SC101.nodes.push(click);
 const body=c.createBufferSource(),bp=c.createBiquadFilter(),bg=c.createGain();
 body.buffer=scNoise101(c,.07,22050);
 bp.type='bandpass';bp.frequency.value=spec.body;bp.Q.value=1.8;
 scEnv101(bg,dt,.002,0,.045,spec.amp*.45);
 body.connect(bp);bp.connect(bg);bg.connect(dest);
 body.start(dt);body.stop(dt+.08);
 SC101.nodes.push(body);
}
function scPlay101(kind){
 scStop101();
 const c=typeof ac==='function'?ac():null;if(!c)return;
 const dest=scBus101(c),t=c.currentTime+.02;
 const gk=SCGAIN102[kind]!=null?SCGAIN102[kind]:1;
 try{SC101.master.gain.cancelScheduledValues(t)}catch(e){}
 SC101.master.gain.setValueAtTime(.22*gk,t);
 const N=()=>scNoise101(c,2.5,22050);
 const W=()=>scWhite102(c,2.5,22050);
 try{
  if(kind==='rain'){
   // Soft wash plus irregular drops — not a regular faucet.
   const wash=c.createBufferSource(),wbp=c.createBiquadFilter(),wg=c.createGain();
   wash.buffer=W();wash.loop=true;
   wbp.type='bandpass';wbp.frequency.value=2600;wbp.Q.value=.7;
   wash.connect(wbp);wbp.connect(wg);wg.connect(dest);
   wg.gain.setValueAtTime(.0001,t);
   wg.gain.linearRampToValueAtTime(.028,t+.4);
   wg.gain.setValueAtTime(.028,t+3.6);
   wg.gain.linearRampToValueAtTime(.0001,t+4.2);
   wash.start(t);wash.stop(t+4.2);SC101.nodes.push(wash,wg);
   // Hand-spaced Poisson-like times so the pattern stays natural and not periodic.
   const drops=[.11,.29,.47,.86,1.04,1.19,1.51,1.58,1.94,2.21,2.48,2.55,2.91,3.18,3.27,3.56,3.79];
   drops.forEach((off,i)=>{
    const dt=t+off,fq=900+((i*737)%2100),dur=.045+.03*(i%3);
    const src=c.createBufferSource(),bp=c.createBiquadFilter(),ng=c.createGain();
    src.buffer=scWhite102(c,dur+.04,22050);
    bp.type='bandpass';bp.frequency.value=fq;bp.Q.value=3.2+(i%4)*.7;
    scEnv101(ng,dt,.001,0,dur,.14+.08*(i%3===0?1:.5));
    src.connect(bp);bp.connect(ng);ng.connect(dest);
    src.start(dt);src.stop(dt+dur+.05);SC101.nodes.push(src);
    if(i%4===2){
     const o=c.createOscillator(),og=c.createGain();
     o.type='sine';o.frequency.setValueAtTime(520+(i%5)*90,dt);o.frequency.exponentialRampToValueAtTime(220,dt+.07);
     scEnv101(og,dt,.001,0,.08,.07);o.connect(og);og.connect(dest);o.start(dt);o.stop(dt+.12);SC101.nodes.push(o);
    }
   });
  }else if(kind==='thunder'){
   const src=c.createBufferSource(),b=scNoise101(c,3,18000),lp=c.createBiquadFilter(),g=c.createGain();
   src.buffer=b;lp.type='lowpass';lp.frequency.setValueAtTime(200,t);lp.frequency.exponentialRampToValueAtTime(80,t+2.4);
   scEnv101(g,t,.25,.4,2.2,.45);src.connect(lp);lp.connect(g);g.connect(dest);
   src.start(t);src.stop(t+3);SC101.nodes.push(src);
   const o=c.createOscillator(),og=c.createGain();
   o.type='sine';o.frequency.setValueAtTime(55,t);o.frequency.exponentialRampToValueAtTime(28,t+2);
   scEnv101(og,t,.2,.3,2,.28);o.connect(og);og.connect(dest);o.start(t);o.stop(t+2.6);SC101.nodes.push(o);
  }else if(kind==='wind'){
   const src=c.createBufferSource(),b=N(),bp=c.createBiquadFilter(),g=c.createGain(),lfo=c.createOscillator(),lg=c.createGain();
   src.buffer=b;src.loop=true;bp.type='bandpass';bp.frequency.value=800;bp.Q.value=.6;
   lfo.frequency.value=.18;lg.gain.value=280;lfo.connect(lg);lg.connect(bp.frequency);
   g.gain.value=.18;src.connect(bp);bp.connect(g);g.connect(dest);
   src.start(t);src.stop(t+5);lfo.start(t);lfo.stop(t+5);SC101.nodes.push(src,lfo,g);
  }else if(kind==='waves'){
   // Surge, break, and foam wash on a swell rhythm — quieter, not a wind whoosh.
   [0,2.35].forEach((off,i)=>{
    const dur=i?2.15:2.55,pk=i?.07:.1,rise=dur*.48,crash=rise+.06;
    const lo=c.createBufferSource(),lp=c.createBiquadFilter(),lg=c.createGain();
    lo.buffer=scNoise101(c,dur+.1,22050);
    lp.type='lowpass';lp.frequency.value=260;
    lo.connect(lp);lp.connect(lg);lg.connect(dest);
    lg.gain.setValueAtTime(.0001,t+off);
    lg.gain.linearRampToValueAtTime(pk,t+off+rise);
    lg.gain.linearRampToValueAtTime(pk*.8,t+off+rise+.15);
    lg.gain.exponentialRampToValueAtTime(.0001,t+off+dur);
    lo.start(t+off);lo.stop(t+off+dur+.02);SC101.nodes.push(lo,lg);
    const mid=c.createBufferSource(),mbp=c.createBiquadFilter(),mg=c.createGain();
    mid.buffer=scWhite102(c,dur+.1,22050);
    mbp.type='bandpass';mbp.frequency.value=680;mbp.Q.value=.85;
    mid.connect(mbp);mbp.connect(mg);mg.connect(dest);
    mg.gain.setValueAtTime(.0001,t+off);
    mg.gain.setValueAtTime(.0001,t+off+crash-.2);
    mg.gain.linearRampToValueAtTime(pk*.62,t+off+crash);
    mg.gain.exponentialRampToValueAtTime(.0001,t+off+dur);
    mid.start(t+off);mid.stop(t+off+dur+.02);SC101.nodes.push(mid,mg);
    const hi=c.createBufferSource(),hp=c.createBiquadFilter(),hg=c.createGain();
    hi.buffer=scWhite102(c,dur+.1,22050);
    hp.type='highpass';hp.frequency.value=3000;
    hi.connect(hp);hp.connect(hg);hg.connect(dest);
    hg.gain.setValueAtTime(.0001,t+off);
    hg.gain.setValueAtTime(.0001,t+off+crash);
    hg.gain.linearRampToValueAtTime(pk*.28,t+off+crash+.14);
    hg.gain.exponentialRampToValueAtTime(.0001,t+off+dur);
    hi.start(t+off);hi.stop(t+off+dur+.02);SC101.nodes.push(hi,hg);
   });
  }else if(kind==='drip'){
   for(let i=0;i<3;i++){
    const dt=t+i*.7,o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.setValueAtTime(980,dt);o.frequency.exponentialRampToValueAtTime(420,dt+.22);
    scEnv101(g,dt,.008,0,.28,.28);o.connect(g);g.connect(dest);o.start(dt);o.stop(dt+.35);SC101.nodes.push(o);
   }
  }else if(kind==='bell'){
   [660,1320,1760,2640].forEach((f,i)=>{
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    scEnv101(g,t,.01,0,1.8-i*.2,.2/(i+1));o.connect(g);g.connect(dest);o.start(t);o.stop(t+2);SC101.nodes.push(o);
   });
  }else if(kind==='drum'){
   const o=c.createOscillator(),g=c.createGain(),src=c.createBufferSource(),ng=c.createGain(),lp=c.createBiquadFilter();
   o.type='sine';o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(45,t+.18);
   scEnv101(g,t,.004,0,.28,.5);o.connect(g);g.connect(dest);o.start(t);o.stop(t+.35);
   src.buffer=scNoise101(c,.3,22050);lp.type='lowpass';lp.frequency.value=800;
   scEnv101(ng,t,.002,0,.12,.28);src.connect(lp);lp.connect(ng);ng.connect(dest);src.start(t);SC101.nodes.push(o,src);
  }else if(kind==='bike'){
   [0,.22].forEach(off=>{
    [2093,3136].forEach((f,i)=>{
     const o=c.createOscillator(),g=c.createGain();
     o.type='sine';o.frequency.value=f;
     scEnv101(g,t+off,.005,0,.35,.16/(i+1));o.connect(g);g.connect(dest);o.start(t+off);o.stop(t+off+.45);SC101.nodes.push(o);
    });
   });
  }else if(kind==='train'){
   // Horn, crossing bell, and a soft chug together.
   [440,523].forEach(f=>{
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    scEnv101(g,t,.08,.55,1,.13);o.connect(g);g.connect(dest);o.start(t);o.stop(t+1.75);SC101.nodes.push(o);
   });
   [1.55,2.05].forEach(off=>{
    [440,523].forEach(f=>{
     const o=c.createOscillator(),g=c.createGain();
     o.type='sine';o.frequency.value=f;
     scEnv101(g,t+off,.06,.32,.7,.12);o.connect(g);g.connect(dest);o.start(t+off);o.stop(t+off+1.15);SC101.nodes.push(o);
    });
   });
   for(let i=0;i<7;i++){
    const dt=t+i*.38;
    [1480,2220].forEach((f,j)=>{
     const o=c.createOscillator(),g=c.createGain();
     o.type='sine';o.frequency.value=f;
     scEnv101(g,dt,.002,0,.32,.09/(j+1));o.connect(g);g.connect(dest);o.start(dt);o.stop(dt+.4);SC101.nodes.push(o);
    });
   }
   for(let i=0;i<14;i++){
    const dt=t+.04+i*.2;
    const src=c.createBufferSource(),lp=c.createBiquadFilter(),ng=c.createGain();
    src.buffer=scNoise101(c,.09,22050);
    lp.type='lowpass';lp.frequency.value=170+(i%2)*70;
    scEnv101(ng,dt,.004,0,.07,.11);src.connect(lp);lp.connect(ng);ng.connect(dest);
    src.start(dt);src.stop(dt+.12);SC101.nodes.push(src);
    const o=c.createOscillator(),og=c.createGain();
    o.type='sine';o.frequency.setValueAtTime(88+(i%2)*18,dt);o.frequency.exponentialRampToValueAtTime(48,dt+.08);
    scEnv101(og,dt,.003,0,.08,.08);o.connect(og);og.connect(dest);o.start(dt);o.stop(dt+.12);SC101.nodes.push(o);
   }
  }else if(kind==='horn'){
   [370,311].forEach(f=>{
    const o=c.createOscillator(),g=c.createGain();
    o.type='sawtooth';o.frequency.value=f;
    const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=800;
    scEnv101(g,t,.04,.5,.4,.1);o.connect(lp);lp.connect(g);g.connect(dest);o.start(t);o.stop(t+1.1);SC101.nodes.push(o);
   });
  }else if(kind==='cat'){
   [[800,420],[1700,900]].forEach(([a,b],i)=>{
    const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
    o.type='sawtooth';o.frequency.setValueAtTime(a,t);o.frequency.exponentialRampToValueAtTime(b,t+.45);
    f.type='bandpass';f.frequency.setValueAtTime(a*1.1,t);f.frequency.exponentialRampToValueAtTime(b,t+.45);f.Q.value=6;
    scEnv101(g,t,.05,.12,.35,i?0.07:.13);o.connect(f);f.connect(g);g.connect(dest);o.start(t);o.stop(t+.6);SC101.nodes.push(o);
   });
   const t2=t+.7;
   [[900,500],[1800,1000]].forEach(([a,b],i)=>{
    const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
    o.type='sawtooth';o.frequency.setValueAtTime(a,t2);o.frequency.exponentialRampToValueAtTime(b,t2+.28);
    f.type='bandpass';f.frequency.value=a;f.Q.value=6;
    scEnv101(g,t2,.04,.08,.22,i?0.06:.11);o.connect(f);f.connect(g);g.connect(dest);o.start(t2);o.stop(t2+.4);SC101.nodes.push(o);
   });
  }else if(kind==='dog'){
   // Two short, separated yaps (about 80ms each, 0.28s apart) so they do not smear into one burst.
   scDogYap103(c,dest,t,{f0:980,f1:360,form:1600,body:850,amp:.26});
   scDogYap103(c,dest,t+.28,{f0:820,f1:300,form:1400,body:780,amp:.22});
  }else if(kind==='cow'){
   const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
   o.type='sawtooth';o.frequency.setValueAtTime(180,t);o.frequency.linearRampToValueAtTime(130,t+.35);o.frequency.linearRampToValueAtTime(160,t+.9);
   f.type='bandpass';f.frequency.setValueAtTime(400,t);f.frequency.linearRampToValueAtTime(280,t+.9);f.Q.value=4;
   scEnv101(g,t,.12,.4,.5,.16);o.connect(f);f.connect(g);g.connect(dest);o.start(t);o.stop(t+1.15);SC101.nodes.push(o);
  }else if(kind==='duck'){
   // Nasal descending mallard quack, two slightly uneven calls — not a toy squeak.
   [0,.34].forEach((off,i)=>{
    const dt=t+off,pk=i?.11:.14;
    const o=c.createOscillator(),f1=c.createBiquadFilter(),f2=c.createBiquadFilter(),g=c.createGain();
    o.type='square';
    o.frequency.setValueAtTime(i?230:255,dt);
    o.frequency.exponentialRampToValueAtTime(i?165:180,dt+.2);
    f1.type='bandpass';f1.frequency.setValueAtTime(1850,dt);f1.frequency.exponentialRampToValueAtTime(720,dt+.18);f1.Q.value=3.2;
    f2.type='bandpass';f2.frequency.setValueAtTime(980,dt);f2.frequency.exponentialRampToValueAtTime(520,dt+.18);f2.Q.value=2.4;
    const split1=c.createGain(),split2=c.createGain();
    split1.gain.value=.7;split2.gain.value=.5;
    o.connect(f1);f1.connect(split1);split1.connect(g);
    o.connect(f2);f2.connect(split2);split2.connect(g);
    scEnv101(g,dt,.012,.04,.16,pk);g.connect(dest);
    o.start(dt);o.stop(dt+.24);SC101.nodes.push(o);
    const src=c.createBufferSource(),nbp=c.createBiquadFilter(),ng=c.createGain();
    src.buffer=scWhite102(c,.2,22050);
    nbp.type='bandpass';nbp.frequency.value=1400;nbp.Q.value=2;
    scEnv101(ng,dt,.01,0,.14,pk*.45);src.connect(nbp);nbp.connect(ng);ng.connect(dest);
    src.start(dt);src.stop(dt+.22);SC101.nodes.push(src);
   });
  }else if(kind==='bird'){
   [0,.35,.7].forEach((off,i)=>{
    const dt=t+off,o=c.createOscillator(),g=c.createGain();
    o.type='sine';
    const f0=1800+i*120;
    o.frequency.setValueAtTime(f0,dt);o.frequency.linearRampToValueAtTime(f0+700,dt+.07);o.frequency.linearRampToValueAtTime(f0-100,dt+.14);
    scEnv101(g,dt,.01,0,.14,.12);o.connect(g);g.connect(dest);o.start(dt);o.stop(dt+.18);SC101.nodes.push(o);
   });
  }else if(kind==='bee'){
   const o=c.createOscillator(),g=c.createGain(),lfo=c.createOscillator(),lg=c.createGain();
   o.type='sawtooth';o.frequency.value=240;
   lfo.frequency.value=28;lg.gain.value=18;lfo.connect(lg);lg.connect(o.frequency);
   scEnv101(g,t,.15,1.6,.5,.08);o.connect(g);g.connect(dest);o.start(t);o.stop(t+2.4);lfo.start(t);lfo.stop(t+2.4);SC101.nodes.push(o,lfo);
  }else if(kind==='frog'){
   // Croak/ribbit: rising pulse with AM texture, not a clean sine.
   [0,.52].forEach((off,i)=>{
    const dt=t+off;
    const o=c.createOscillator(),bp=c.createBiquadFilter(),am=c.createGain(),g=c.createGain();
    o.type='sawtooth';
    o.frequency.setValueAtTime(95,dt);
    o.frequency.exponentialRampToValueAtTime(210,dt+.14);
    o.frequency.exponentialRampToValueAtTime(125,dt+.3);
    bp.type='bandpass';bp.frequency.setValueAtTime(420,dt);bp.frequency.exponentialRampToValueAtTime(740,dt+.14);bp.frequency.exponentialRampToValueAtTime(500,dt+.3);bp.Q.value=3.4;
    am.gain.value=.72;
    o.connect(bp);bp.connect(am);am.connect(g);g.connect(dest);
    scEnv101(g,dt,.02,.06,.22,.2);
    const lfo=c.createOscillator(),ld=c.createGain();
    lfo.type='sine';
    lfo.frequency.setValueAtTime(28,dt);lfo.frequency.linearRampToValueAtTime(58,dt+.16);lfo.frequency.linearRampToValueAtTime(36,dt+.3);
    ld.gain.value=.5;lfo.connect(ld);ld.connect(am.gain);
    o.start(dt);o.stop(dt+.36);lfo.start(dt);lfo.stop(dt+.36);SC101.nodes.push(o,lfo);
    const src=c.createBufferSource(),nbp=c.createBiquadFilter(),ng=c.createGain();
    src.buffer=scNoise101(c,.34,22050);
    nbp.type='bandpass';nbp.frequency.value=620;nbp.Q.value=2.2;
    scEnv101(ng,dt,.02,0,.24,.1);src.connect(nbp);nbp.connect(ng);ng.connect(dest);
    src.start(dt);src.stop(dt+.36);SC101.nodes.push(src);
   });
  }else if(kind==='owl'){
   [0,.55].forEach((off,i)=>{
    const dt=t+off,o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.setValueAtTime(420,dt);o.frequency.linearRampToValueAtTime(380,dt+.12);o.frequency.linearRampToValueAtTime(400,dt+.28);
    const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=5;lg.gain.value=8;lfo.connect(lg);lg.connect(o.frequency);
    scEnv101(g,dt,.05,.12,.22,.16);o.connect(g);g.connect(dest);
    o.start(dt);lfo.start(dt);o.stop(dt+.45);lfo.stop(dt+.45);SC101.nodes.push(o,lfo);
   });
  }else if(kind==='turtle'){
   const wash=c.createBufferSource(),lp=c.createBiquadFilter(),wg=c.createGain();
   wash.buffer=(typeof scWhite102==='function'?scWhite102:scNoise101)(c,2.8,22050);wash.loop=true;
   lp.type='lowpass';lp.frequency.value=1100;lp.Q.value=.6;
   wash.connect(lp);lp.connect(wg);wg.connect(dest);
   wg.gain.setValueAtTime(.0001,t);
   wg.gain.linearRampToValueAtTime(.07,t+.45);
   wg.gain.setValueAtTime(.07,t+3.6);
   wg.gain.linearRampToValueAtTime(.0001,t+4.4);
   wash.start(t);wash.stop(t+4.5);SC101.nodes.push(wash,wg);
   const pl=c.createOscillator(),pg=c.createGain(),plp=c.createBiquadFilter();
   pl.type='sine';pl.frequency.setValueAtTime(420,t+.08);pl.frequency.exponentialRampToValueAtTime(140,t+.28);
   plp.type='lowpass';plp.frequency.value=900;
   if(typeof scEnv101==='function')scEnv101(pg,t+.08,.01,0,.2,.16);
   else{pg.gain.setValueAtTime(.0001,t+.08);pg.gain.linearRampToValueAtTime(.16,t+.1);pg.gain.exponentialRampToValueAtTime(.0001,t+.32)}
   pl.connect(plp);plp.connect(pg);pg.connect(dest);
   pl.start(t+.08);pl.stop(t+.36);SC101.nodes.push(pl);
   const paddles=[.55,1.45,2.35,3.25];
   paddles.forEach((off,i)=>{
    const dt=t+off,src=c.createBufferSource(),bp=c.createBiquadFilter(),g=c.createGain();
    src.buffer=typeof scNoise101==='function'?scNoise101(c,.22,18000):W();
    bp.type='bandpass';bp.frequency.value=180+i*18;bp.Q.value=1.1;
    if(typeof scEnv101==='function')scEnv101(g,dt,.03,.04,.16,.12);
    else{g.gain.setValueAtTime(.0001,dt);g.gain.linearRampToValueAtTime(.12,dt+.04);g.gain.exponentialRampToValueAtTime(.0001,dt+.22)}
    src.connect(bp);bp.connect(g);g.connect(dest);
    src.start(dt);src.stop(dt+.26);SC101.nodes.push(src);
   });
  }
  SC101.playing=kind;
  const hold=kind==='dog'?1200:kind==='turtle'?5200:5600;
  SC101.t=setTimeout(()=>{if(SC101.playing===kind)scStop101()},hold);
 }catch(e){scStop101()}
}

// Cards hidden after the v102 rewrite if still unrecognizable. None hidden: all six
// maybe-sounds were rewritten to be nameable (dog, duck, frog, rain, waves, train).
const SCHIDE102=[];
SCHIDE102.forEach(id=>{
 const i=typeof SCARDS101!=='undefined'?SCARDS101.findIndex(c=>c.id===id):-1;
 if(i>=0)SCARDS101.splice(i,1);
});
