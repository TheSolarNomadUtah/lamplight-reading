/* v103: Language packs and untimed Explore Numbers, plus QA copy and sound fixes.
   1. Optional language-pack folders (pack.js). Core picker stays English and Spanish.
   2. Explore Numbers: untimed counting, shapes, and adding to 10 (math.js).
   3. Spanish shape miss lines use gender stored in es.json (un/una, el/la, ese/esa).
   4. d101_es_4_01: "Quedaron esparcidas" in place of "Formaron un rociado suelto".
   5. Sound-card dog is a crisper synthesized double yap, still leveled on the v102 bus.
   Do not wrap show(). Do not close the shared AudioContext. */
(function(){
 const s=document.createElement('style');
 s.id='v103css';
 document.head.appendChild(s);
})();

/* ---------------- 4. Story wording (also patched in v101-stories.js) ---------------- */
function storiesFix103(){
 const reps=[
  ['d101_es_4_01','Formaron un rocío suelto','Quedaron esparcidas'],
  ['d101_es_4_01','Formaron un rociado suelto','Quedaron esparcidas']
 ];
 function patch(s){
  if(!s||!s.id)return;
  reps.forEach(([id,a,b])=>{
   if(s.id!==id)return;
   if(typeof s.text==='string'&&s.text.indexOf(a)>=0)s.text=s.text.split(a).join(b);
  });
 }
 if(typeof STORIES101!=='undefined'&&STORIES101.es)STORIES101.es.forEach(patch);
 if(typeof S!=='undefined'&&Array.isArray(S))S.forEach(patch);
 if(typeof DAILY64!=='undefined'&&Array.isArray(DAILY64))DAILY64.forEach(patch);
}
storiesFix103();

/* ---------------- 5. Crisper double yap for the dog card ---------------- */
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

if(typeof scPlay101==='function'&&!scPlay101._v103){
 const prev=scPlay101;
 scPlay101=function(kind){
  if(kind!=='dog')return prev.apply(this,arguments);
  scStop101();
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const dest=scBus101(c),t=c.currentTime+.02;
  const gk=(typeof SCGAIN102==='object'&&SCGAIN102.dog!=null)?SCGAIN102.dog:2.4;
  try{SC101.master.gain.cancelScheduledValues(t)}catch(e){}
  SC101.master.gain.setValueAtTime(.22*gk,t);
  try{
   // Two short, separated yaps (about 80ms each, 0.28s apart) so they do not smear into one burst.
   scDogYap103(c,dest,t,{f0:980,f1:360,form:1600,body:850,amp:.26});
   scDogYap103(c,dest,t+.28,{f0:820,f1:300,form:1400,body:780,amp:.22});
   SC101.playing='dog';
   SC101.t=setTimeout(()=>{if(SC101.playing==='dog')scStop101()},1200);
  }catch(e){scStop101()}
 };
 scPlay101._v103=1;
}
