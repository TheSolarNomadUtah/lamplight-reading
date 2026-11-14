// v101: new stories (one a day per grade), Sound cards, Paint tools,
// Look Up planet stories, Bedtime wind and water, two companions (Moth, Owl).
// Zero outside requests. No new voices or recordings. Core works fully offline.

/* ---------------- CSS ---------------- */
document.head.insertAdjacentHTML('beforeend',`<style id="v101css">
.sc101-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:12px;margin:12px 0}
.sc101-card{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 8px;border:2px solid var(--soft,#d7cbb8);border-radius:16px;background:var(--card,#fffaf0);color:var(--ink,#3a3228);font:inherit;font-weight:700;min-height:44px;cursor:pointer}
.sc101-card:focus-visible,.sc101-card.on{outline:3px solid var(--acc,#c9a45e);outline-offset:2px}
.sc101-card.on .scart101,.sc101-card.on .lamp-art63{animation:scPulse101 1.1s ease-in-out 2}
.sc101-card .lamp-art63,.sc101-card .scart101{width:88px;height:88px}
.sc101-cat{margin:22px 0 8px;font-size:1.2rem}
@keyframes scPulse101{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@media (prefers-reduced-motion:reduce){.sc101-card.on .scart101,.sc101-card.on .lamp-art63{animation:none}}
.pbar101{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:6px 8px;background:#161826;z-index:2;border-top:1px solid #2a2f44}
.pbar101 button{padding:6px 10px;min-height:44px;font-size:.95rem;background:#2a2f44;color:#fff;border:1px solid #3a3f58;border-radius:10px}
.pbar101 button.on{background:#ffd97a;color:#000}
.pbar101 .p101-ico{width:22px;height:22px;display:block;margin:0 auto}
.pbar101 .p101-lab{display:block;font-size:.7rem;line-height:1.1;margin-top:2px}
.pstamp101{display:flex;flex-wrap:wrap;gap:4px}
.pstamp101 button{width:44px;height:44px;padding:4px}
#pstudio.nightsoft101 .pbar101 [data-tool101="sparkle"],
#pstudio.nightsoft101 .pbar101 [data-tool101="constellation"]{opacity:.45}
.luStory101{max-width:40rem;margin:0 auto;padding:8px}
.luStory101 .luPlanetArt101{display:flex;justify-content:center;margin:8px 0 16px}
.luStory101 .luPlanetArt101 svg{width:min(72vw,280px);height:auto}
.luStory101 .facts101{margin:14px 0;padding:0;list-style:none}
.luStory101 .facts101 li{margin:8px 0;padding-left:1.1em;position:relative}
.luStory101 .facts101 li:before{content:"";position:absolute;left:0;top:.55em;width:.5em;height:.5em;border-radius:50%;background:var(--acc,#c9a45e)}
.luGrander101 .lu83-sky{filter:saturate(1.08) contrast(1.04)}
.btScene101{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}
.btScene101 button{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:72px;padding:8px;border-radius:14px;background:transparent;color:#f6efe0;border:1px solid #ffffff33}
.btScene101 button.on{border-color:#ffd97a;background:#ffd97a22}
.btScene101 svg{width:52px;height:52px}
.friendLine101{text-align:center;font-size:1.05rem;margin:.4em 0 0;color:var(--ink,#3a3228)}
.friendPick101{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:12px 0}
.friendPick101 button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px;border-radius:16px;border:2px solid var(--soft,#d7cbb8);background:var(--card,#fffaf0);color:inherit;font:inherit;font-weight:700;min-width:104px}
.friendPick101 button.on{border-color:var(--acc,#c9a45e);box-shadow:0 0 0 3px #e6b45444}
.friendPick101 .lamp73-svg,.friendPick101 svg{width:88px;height:88px}
.friendOffer101{max-width:26rem;padding:1.2rem 1.4rem;border:none;border-radius:20px;background:var(--card,#fffaf0);color:var(--ink,#3a3228);text-align:center}
.friendOffer101::backdrop{background:#1a142088}
.friendOffer101 .row101{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}
.whatsnew101{border:2px solid var(--acc,#c9a45e);padding:16px 18px;border-radius:16px;margin:12px 0}
.whatsnew101 h2{margin-top:0}
@media (prefers-reduced-motion:reduce){
  .lamp76-fly,.lamp76-svgstars{animation:none!important}
}
</style>`);

/* ---------------- Stories: one new story per day, per grade ---------------- */
function storiesDay0_101(){
 let d=typeof RAW!=='undefined'&&RAW.get('lamp_v101_day');
 if(!d){d=dkey();try{RAW.set('lamp_v101_day',d)}catch(e){}}
 return d;
}
function storiesDaysOpen101(){
 const a=storiesDay0_101().split('-').map(Number),b=dkey().split('-').map(Number);
 const da=new Date(a[0],a[1]-1,a[2]),db=new Date(b[0],b[1]-1,b[2]);
 return Math.max(0,Math.round((db-da)/86400000));
}
const MERGED101=new Set();
function storiesMerge101(){
 if(typeof STORIES101==='undefined'||typeof S==='undefined'||typeof DAILY64==='undefined')return;
 if(typeof CONTENT!=='undefined'&&!CONTENT.includes(LANG))return;
 const days=storiesDaysOpen101(),rows=STORIES101[LANG]||[];
 for(const row of rows){
  if((row.release101||0)>days)continue;
  if(MERGED101.has(row.id)||S.some(s=>s.id===row.id)){MERGED101.add(row.id);continue}
  const grade=row.grade;
  const s={id:row.id,t:row.t,text:row.text,g:grade===0?0.5:(grade||.5),
   lvl:(grade?(LANG==='es'?'Grado ':'Grade ')+grade:'K')+' · '+(LANG==='es'?'Cuento del día':"Today's Story"),
   focus:row.focus||(LANG==='es'?(grade<2?'leer con calma y comprender':'comprensión, causas y evidencias'):(grade<2?'read calmly and understand':'meaning, reasons and evidence')),
   words:(row.text||'').replace(/[^\p{L}\s'-]/gu,'').split(/\s+/).filter(w=>w.length>2).filter((w,i,a)=>a.indexOf(w)===i).slice(0,6),
   coach:row.coach&&row.coach.length?row.coach:(LANG==='es'?['Antes de leer, miren el título y comenten qué podría ocurrir.','Lean sin prisa. Hagan una pausa al final de cada párrafo.','Si una palabra cuesta, prueben por partes y vuelvan a leer la frase.']:['Warm-up: look at the title and preview a few words together.','Read without rushing. Pause at the end of a paragraph.','If a word is tricky, try its parts, then reread the sentence.']),
   talk:row.talk&&row.talk.length?row.talk:(LANG==='es'?['¿Qué detalle te ayudó a entender lo que pasó?','¿Qué te gustaría contar o dibujar sobre el cuento?']:['Which detail helped you understand what happened?','What would you like to tell or draw about this story?']),
   tags:['calm','daily'],
   takeaway:LANG==='es'?'Leer también es detenerse, pensar y compartir.':'Reading makes room to notice, think and share.',
   q:row.q,daily64:true,dailyGrade64:grade,art64:row.art,release101:row.release101||0};
  S.push(s);DAILY64.push(s);MERGED101.add(row.id);
 }
}
function storiesPreferNew101(date){
 const p=typeof curProfile==='function'?curProfile():null;
 if(!p)return null;
 const grade=typeof grade64==='function'?grade64(p):null;
 const days=storiesDaysOpen101(),seen=typeof dailySeen64==='function'?dailySeen64():new Set();
 const pool=DAILY64.filter(s=>s.release101===days&&!seen.has(s.id));
 if(grade!==null)return pool.find(s=>s.dailyGrade64===grade)||null;
 const band=(typeof BANDG!=='undefined'&&(BANDG[p.band]||BANDG.k))||[0.25,0.99];
 const [a,b]=band;
 return pool.find(s=>{const g=s.g!=null?s.g:(s.dailyGrade64===0?0.5:s.dailyGrade64);return g>=a&&g<=b})||null;
}
{if(typeof dailyChoice64==='function'){
 const prev=dailyChoice64;
 dailyChoice64=function(date){
  storiesMerge101();
  const p=curProfile(),grade=grade64(p);
  const fresh=storiesPreferNew101(date);
  if(p){
   const day=dkey(date),saved=safeJSON(LS.get('lamp_today'),{});
   const key=LANG+':'+(grade===null?('band:'+(p.band||'k')):grade);
   const cur=(saved.picks||{})[key];
   if(saved.day===day&&cur&&String(cur).indexOf('d101_')===0){
    const held=(typeof DAILY64!=='undefined'&&DAILY64.find(s=>s.id===cur))||(typeof S!=='undefined'&&S.find(s=>s.id===cur));
    if(held)return held;
   }
   if(fresh){
    const state={day,picks:Object.assign({},saved.picks||{})};
    state.picks[key]=fresh.id;
    LS.set('lamp_today',JSON.stringify(state));
    return fresh;
   }
  }
  return prev.apply(this,arguments);
 };
}}
if(typeof artInner63==='function'){
 const prev=artInner63;
 artInner63=function(k){
  if(typeof ART101==='object'&&ART101[k])return ART101[k]();
  return prev.apply(this,arguments);
 };
}

/* ---------------- Sound cards: only unmistakable, synthesized sounds ---------------- */
if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('soundcards')<0)SECTIONS.push('soundcards');
if(typeof LIVE99!=='undefined'&&LIVE99.indexOf('soundcards')<0)LIVE99.push('soundcards');
if(!$('soundcards')&&document.querySelector('main'))document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="soundcards" class="hidden"></section>');

const SCARDS101=[
 {id:'cat',cat:'animals',en:'Cat',es:'Gato',play:'cat'},
 {id:'dog',cat:'animals',en:'Dog',es:'Perro',play:'dog'},
 {id:'cow',cat:'animals',en:'Cow',es:'Vaca',play:'cow'},
 {id:'duck',cat:'animals',en:'Duck',es:'Pato',play:'duck'},
 {id:'bird',cat:'animals',en:'Bird',es:'Pájaro',play:'bird'},
 {id:'bee',cat:'animals',en:'Bee',es:'Abeja',play:'bee'},
 {id:'frog',cat:'animals',en:'Frog',es:'Rana',play:'frog'},
 {id:'owl',cat:'animals',en:'Owl',es:'Búho',play:'owl'},
 {id:'rain',cat:'weather',en:'Rain',es:'Lluvia',play:'rain'},
 {id:'thunder',cat:'weather',en:'Thunder',es:'Trueno',play:'thunder'},
 {id:'wind',cat:'weather',en:'Wind',es:'Viento',play:'wind'},
 {id:'waves',cat:'water',en:'Waves',es:'Olas',play:'waves'},
 {id:'drip',cat:'water',en:'Drip',es:'Gota',play:'drip'},
 {id:'bell',cat:'music',en:'Bell',es:'Campana',play:'bell'},
 {id:'drum',cat:'music',en:'Drum',es:'Tambor',play:'drum'},
 {id:'bike',cat:'things',en:'Bicycle bell',es:'Timbre de bici',play:'bike'},
 {id:'train',cat:'things',en:'Train',es:'Tren',play:'train'},
 {id:'horn',cat:'things',en:'Car horn',es:'Bocina',play:'horn'}
];
const SCCAT101={animals:['Animals','Animales'],weather:['Weather','Tiempo'],water:['Water','Agua'],music:['Music','Música'],things:['Things that go','Cosas que circulan']};
const SC101={nodes:[],master:null,playing:null,t:0};

function scStop101(){
 const c=typeof AC!=='undefined'?AC:null;
 SC101.nodes.forEach(n=>{try{if(n.stop)n.stop((c&&c.currentTime||0)+.4);if(n.gain&&c)n.gain.setTargetAtTime(0,c.currentTime,.12)}catch(e){}});
 if(SC101.master&&c){try{SC101.master.gain.setTargetAtTime(0,c.currentTime,.12)}catch(e){}}
 SC101.nodes=[];SC101.master=null;SC101.playing=null;
 document.querySelectorAll('.sc101-card.on').forEach(el=>el.classList.remove('on'));
}
function scBus101(c){
 const M=c.createGain(),lp=c.createBiquadFilter();
 lp.type='lowpass';lp.frequency.value=4200;lp.Q.value=.7;
 M.gain.value=.0001;
 M.connect(lp);lp.connect(c.destination);
 SC101.master=M;
 return M;
}
function scNoise101(c,dur,rate){
 const n=Math.floor((rate||22050)*dur),b=c.createBuffer(1,n,rate||22050),d=b.getChannelData(0);
 let v=0;
 for(let i=0;i<n;i++){v=.97*v+(Math.random()*2-1)*.35;d[i]=v}
 return b;
}
function scEnv101(g,t,a,h,d,v){
 g.gain.setValueAtTime(0,t);
 g.gain.linearRampToValueAtTime(v,t+a);
 if(h)g.gain.setValueAtTime(v,t+a+h);
 g.gain.exponentialRampToValueAtTime(.0001,t+a+h+Math.max(.05,d));
}
function scOsc101(c,dest,t,type,f,a,h,d,v){
 const o=c.createOscillator(),g=c.createGain();
 o.type=type||'sine';o.frequency.value=f;
 scEnv101(g,t,a,h,d,v);
 o.connect(g);g.connect(dest);
 o.start(t);o.stop(t+a+h+d+.05);
 SC101.nodes.push(o,g);
 return {o,g};
}

function scPlay101(kind){
 scStop101();
 const c=typeof ac==='function'?ac():null;if(!c)return;
 const dest=scBus101(c),t=c.currentTime+.02;
 SC101.master.gain.setTargetAtTime(.22,t,.05);
 const N=()=>scNoise101(c,2.5,22050);
 try{
  if(kind==='rain'){
   const src=c.createBufferSource(),b=N(),bp=c.createBiquadFilter(),g=c.createGain();
   src.buffer=b;src.loop=true;bp.type='bandpass';bp.frequency.value=1400;bp.Q.value=.8;
   g.gain.value=.22;src.connect(bp);bp.connect(g);g.connect(dest);
   src.start(t);src.stop(t+4.2);SC101.nodes.push(src,g);
   // gentle continuous drips, not sudden
   for(let i=0;i<10;i++){
    const dt=t+.3+i*.38,o=c.createOscillator(),gg=c.createGain();
    o.type='sine';o.frequency.setValueAtTime(1200,dt);o.frequency.exponentialRampToValueAtTime(700,dt+.12);
    scEnv101(gg,dt,.01,0,.15,.07);o.connect(gg);gg.connect(dest);o.start(dt);o.stop(dt+.2);SC101.nodes.push(o);
   }
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
   const src=c.createBufferSource(),b=N(),bp=c.createBiquadFilter(),g=c.createGain(),lfo=c.createOscillator(),lg=c.createGain();
   src.buffer=b;src.loop=true;bp.type='lowpass';bp.frequency.value=600;
   lfo.type='sine';lfo.frequency.value=.12;lg.gain.value=.14;lfo.connect(lg);lg.connect(g.gain);
   g.gain.value=.16;src.connect(bp);bp.connect(g);g.connect(dest);
   src.start(t);src.stop(t+5.5);lfo.start(t);lfo.stop(t+5.5);SC101.nodes.push(src,lfo,g);
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
   [440,523].forEach(f=>{
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    scEnv101(g,t,.08,.6,1.1,.16);o.connect(g);g.connect(dest);o.start(t);o.stop(t+1.9);SC101.nodes.push(o);
   });
   [1.6,2.1].forEach(off=>{
    [440,523].forEach(f=>{
     const o=c.createOscillator(),g=c.createGain();
     o.type='sine';o.frequency.value=f;
     scEnv101(g,t+off,.06,.35,.8,.14);o.connect(g);g.connect(dest);o.start(t+off);o.stop(t+off+1.3);SC101.nodes.push(o);
    });
   });
  }else if(kind==='horn'){
   [370,311].forEach(f=>{
    const o=c.createOscillator(),g=c.createGain();
    o.type='sawtooth';o.frequency.value=f;
    const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=800;
    scEnv101(g,t,.04,.5,.4,.1);o.connect(lp);lp.connect(g);g.connect(dest);o.start(t);o.stop(t+1.1);SC101.nodes.push(o);
   });
  }else if(kind==='cat'){
   // formant meow: two sweeps down
   [[800,420],[1700,900]].forEach(([a,b],i)=>{
    const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
    o.type='sawtooth';o.frequency.setValueAtTime(a,t);o.frequency.exponentialRampToValueAtTime(b,t+.45);
    f.type='bandpass';f.frequency.setValueAtTime(a*1.1,t);f.frequency.exponentialRampToValueAtTime(b,t+.45);f.Q.value=6;
    scEnv101(g,t,.05,.12,.35,i?0.07:.13);o.connect(f);f.connect(g);g.connect(dest);o.start(t);o.stop(t+.6);SC101.nodes.push(o);
   });
   // second shorter meow
   const t2=t+.7;
   [[900,500],[1800,1000]].forEach(([a,b],i)=>{
    const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
    o.type='sawtooth';o.frequency.setValueAtTime(a,t2);o.frequency.exponentialRampToValueAtTime(b,t2+.28);
    f.type='bandpass';f.frequency.value=a;f.Q.value=6;
    scEnv101(g,t2,.04,.08,.22,i?0.06:.11);o.connect(f);f.connect(g);g.connect(dest);o.start(t2);o.stop(t2+.4);SC101.nodes.push(o);
   });
  }else if(kind==='dog'){
   [0,.28].forEach(off=>{
    const dt=t+off,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter(),src=c.createBufferSource(),ng=c.createGain();
    o.type='sawtooth';o.frequency.setValueAtTime(280,dt);o.frequency.exponentialRampToValueAtTime(140,dt+.12);
    f.type='bandpass';f.frequency.value=400;f.Q.value=3;
    scEnv101(g,dt,.01,0,.16,.2);o.connect(f);f.connect(g);g.connect(dest);o.start(dt);o.stop(dt+.22);
    src.buffer=scNoise101(c,.2,22050);scEnv101(ng,dt,.005,0,.1,.1);src.connect(ng);ng.connect(dest);src.start(dt);
    SC101.nodes.push(o,src);
   });
  }else if(kind==='cow'){
   const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
   o.type='sawtooth';o.frequency.setValueAtTime(180,t);o.frequency.linearRampToValueAtTime(130,t+.35);o.frequency.linearRampToValueAtTime(160,t+.9);
   f.type='bandpass';f.frequency.setValueAtTime(400,t);f.frequency.linearRampToValueAtTime(280,t+.9);f.Q.value=4;
   scEnv101(g,t,.12,.4,.5,.16);o.connect(f);f.connect(g);g.connect(dest);o.start(t);o.stop(t+1.15);SC101.nodes.push(o);
  }else if(kind==='duck'){
   [0,.22,.44].forEach(off=>{
    const dt=t+off,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter(),src=c.createBufferSource(),ng=c.createGain();
    o.type='square';o.frequency.setValueAtTime(320,dt);o.frequency.exponentialRampToValueAtTime(180,dt+.1);
    f.type='bandpass';f.frequency.value=700;f.Q.value=4;
    scEnv101(g,dt,.008,0,.12,.14);o.connect(f);f.connect(g);g.connect(dest);o.start(dt);o.stop(dt+.16);
    src.buffer=scNoise101(c,.15,22050);scEnv101(ng,dt,.005,0,.1,.08);src.connect(ng);ng.connect(dest);src.start(dt);
    SC101.nodes.push(o,src);
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
   [0,.45].forEach((off,i)=>{
    const dt=t+off,o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain();
    o.type='sine';o2.type='sine';
    o.frequency.setValueAtTime(280,dt);o.frequency.linearRampToValueAtTime(180,dt+.18);
    o2.frequency.setValueAtTime(420,dt);o2.frequency.linearRampToValueAtTime(260,dt+.18);
    scEnv101(g,dt,.02,.04,.16,.18);o.connect(g);o2.connect(g);g.connect(dest);
    o.start(dt);o2.start(dt);o.stop(dt+.28);o2.stop(dt+.28);SC101.nodes.push(o,o2);
   });
  }else if(kind==='owl'){
   [0,.55].forEach((off,i)=>{
    const dt=t+off,o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.setValueAtTime(420,dt);o.frequency.linearRampToValueAtTime(380,dt+.12);o.frequency.linearRampToValueAtTime(400,dt+.28);
    const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=5;lg.gain.value=8;lfo.connect(lg);lg.connect(o.frequency);
    scEnv101(g,dt,.05,.12,.22,.16);o.connect(g);g.connect(dest);
    o.start(dt);lfo.start(dt);o.stop(dt+.45);lfo.stop(dt+.45);SC101.nodes.push(o,lfo);
   });
  }
  SC101.playing=kind;
  SC101.t=setTimeout(()=>{if(SC101.playing===kind)scStop101()},5600);
 }catch(e){scStop101()}
}

function scLabel101(c){return (LANG==='es'?c.es:c.en)}
function scCat101(k){const p=SCCAT101[k];return gT(LANG==='es'?p[1]:p[0])}

function renderSoundcards101(){
 scStop101();
 const el=$('soundcards');if(!el)return;
 const cats=[...new Set(SCARDS101.map(c=>c.cat))];
 let h=`<div class="card"><button onclick="show('hub')">${gT('Home')}</button><h2>${gT('Sound cards')}</h2><p class="soft">${gT('Tap a picture to hear a sound. The sound is made on this device. Nothing is recorded.')}</p></div>`;
 for(const cat of cats){
  const list=SCARDS101.filter(c=>c.cat===cat);
  h+=`<h3 class="sc101-cat kline">${scCat101(cat)}</h3><div class="sc101-grid">`;
  for(const c of list){
   const lab=scLabel101(c);
   h+=`<button type="button" class="sc101-card" data-sc="${c.id}" aria-label="${esc(gT('Play {name}',{name:lab}))}" onclick="scTap101('${c.id}')">${typeof scArt101==='function'?scArt101(c.id):''}<span>${esc(gT(lab))}</span></button>`;
  }
  h+='</div>';
 }
 el.innerHTML=h;
 if(typeof artRefresh63==='function')artRefresh63(el);
}
function scTap101(id){
 const c=SCARDS101.find(x=>x.id===id);if(!c)return;
 if(SC101.playing===c.play){scStop101();return}
 scPlay101(c.play);
 document.querySelectorAll('.sc101-card').forEach(el=>el.classList.toggle('on',el.dataset.sc===id));
}
RENDER.soundcards=renderSoundcards101;

function scTile101(){
 const h=$('hub');if(!h||h.querySelector('[data-sc101]'))return;
 const tile=document.createElement('button');
 tile.className='hubtile';tile.dataset.sc101='1';
 tile.setAttribute('onclick',"show('soundcards')");
 tile.innerHTML=`${typeof tileSvg101==='function'?tileSvg101('sound'):''}${gT('Sound cards')}<small>${gT('Tap a picture to hear a sound.')}</small>`;
 const cards=[...h.querySelectorAll('.hubtile')].find(b=>(b.getAttribute('onclick')||'')==="show('cards')");
 if(cards)cards.after(tile);
 else (h.querySelector('.explore71 .hubgrid, .hubgrid')||h).append(tile);
 if(typeof artRefresh63==='function')artRefresh63(h);
}



/* ---------------- Paint: more tools; night paper stays a soft glow ---------------- */
const PTOOLS101=['chalk','sparkle','watercolor','spray','constellation','pattern'];
const PSTAMP_IDS101=['star','moon','leaf','flower','heart','fish','bird','lamp','cloud','tree'];
const PPAT101=['dots','stripes','waves','checks','stars'];
if(typeof PT==='object'){PT.stampId=PT.stampId||'star';PT.pattern=PT.pattern||'dots';PT.pal101=PT.pal101||'classic'}
const PCOLS101={
 classic:[['#e53935','red'],['#fb8c00','orange'],['#fdd835','yellow'],['#43a047','green'],['#1e88e5','blue'],['#8e24aa','purple'],['#ec407a','pink'],['#6d4c41','brown'],['#ffffff','white'],['#212121','black'],['#d4a017','gold'],['#2a9d8f','teal'],['#e07a5f','coral'],['#f4e4c4','cream']],
 sunset:[['#6b2d5b','plum'],['#c44536','ember'],['#e07a5f','coral'],['#f2cc8f','sand'],['#f4d35e','gold'],['#ee6c4d','peach'],['#3d405b','dusk'],['#ffffff','white']],
 ocean:[['#0d1b2a','deep'],['#1b4965','sea'],['#5fa8d3','sky'],['#bee9e8','foam'],['#cae9ff','ice'],['#62b6cb','teal'],['#1d3557','navy'],['#ffffff','white']],
 garden:[['#344e41','pine'],['#588157','moss'],['#a3b18a','sage'],['#dad7cd','mist'],['#bc6c25','clay'],['#dda15e','wheat'],['#6d2e46','berry'],['#fff1d6','cream']],
 night:[['#0d0f1a','ink'],['#1b2838','navy'],['#3d5a80','blue'],['#98c1d9','ice'],['#e0fbfc','snow'],['#ee6c4d','coral'],['#e6b454','gold'],['#c9b0e8','lilac']]
};

function paintNightSoft101(){return !!(typeof PT==='object'&&PT.dark)}
function paintToolIsGlowOnly101(t){return t==='sparkle'||t==='constellation'}

function paintChalkSeg101(x,a,b){
 const n=Math.max(4,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/(3*PT.dpr)));
 const w=PT.size*PT.dpr;
 x.save();x.globalAlpha=.28;x.lineCap='round';x.lineJoin='round';
 for(let i=0;i<=n;i++){
  const t=i/n,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t;
  for(let k=0;k<5;k++){
   const jx=(Math.random()-.5)*w*.9,jy=(Math.random()-.5)*w*.9;
   x.beginPath();x.lineWidth=Math.max(1,w*(.25+Math.random()*.5));
   x.moveTo(px+jx,py+jy);x.lineTo(px+jx+(Math.random()-.5)*w*.4,py+jy+(Math.random()-.5)*w*.4);x.stroke();
  }
 }
 x.restore();
}
function paintSpraySeg101(x,a,b){
 const n=Math.max(3,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/(2*PT.dpr)));
 const r=PT.size*PT.dpr*1.6;
 x.save();x.globalAlpha=.22;
 for(let i=0;i<=n;i++){
  const t=i/n,px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t;
  for(let k=0;k<8;k++){
   const ang=Math.random()*Math.PI*2,rr=Math.random()*r;
   x.beginPath();x.arc(px+Math.cos(ang)*rr,py+Math.sin(ang)*rr,Math.max(0.6,PT.dpr*(.6+Math.random()*1.4)),0,Math.PI*2);x.fill();
  }
 }
 x.restore();
}
function paintWaterSeg101(x,a,b){
 x.save();x.globalAlpha=.16;x.lineWidth=PT.size*PT.dpr*1.8;x.lineCap='round';
 const jx=(Math.random()-.5)*PT.size*.4*PT.dpr,jy=(Math.random()-.5)*PT.size*.4*PT.dpr;
 x.beginPath();x.moveTo(a[0]+jx,a[1]+jy);x.lineTo(b[0]+jx,b[1]+jy);x.stroke();
 x.globalAlpha=.1;x.lineWidth=PT.size*PT.dpr*2.6;
 x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke();
 x.restore();
}
function paintSparkleSeg101(x,a,b){
 // used only on day paper; a few still stars, no rapid flicker
 const dist=Math.hypot(b[0]-a[0],b[1]-a[1]);
 if(Math.random()>.35)return;
 const t=Math.random(),px=a[0]+(b[0]-a[0])*t,py=a[1]+(b[1]-a[1])*t,s=PT.size*PT.dpr*(.5+Math.random()*.7);
 x.save();x.fillStyle=x.strokeStyle;x.globalAlpha=.85;
 if(typeof STAMP101!=='undefined')STAMP101.star(x,[px,py],s);
 x.restore();
}
function paintConstellationSeg101(x,a,b){
 PT._const=PT._const||[];
 const last=PT._const[PT._const.length-1];
 const p=[(a[0]+b[0])/2,(a[1]+b[1])/2];
 if(last&&Math.hypot(p[0]-last[0],p[1]-last[1])<PT.size*PT.dpr*2.2)return;
 PT._const.push(p);
 const s=PT.size*PT.dpr*.55;
 x.save();x.fillStyle=x.strokeStyle;x.globalAlpha=.9;
 if(typeof STAMP101!=='undefined')STAMP101.star(x,p,s);
 x.globalAlpha=.45;x.lineWidth=Math.max(1,PT.dpr);
 if(last){x.beginPath();x.moveTo(last[0],last[1]);x.lineTo(p[0],p[1]);x.stroke()}
 x.restore();
}
function paintPatternStamp101(x,p){
 const s=PT.size*PT.dpr,id=PT.pattern||'dots';
 x.save();x.globalAlpha=.55;
 if(id==='dots'){
  for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){x.beginPath();x.arc(p[0]+i*s*.7,p[1]+j*s*.7,s*.16,0,Math.PI*2);x.fill()}
 }else if(id==='stripes'){
  x.lineWidth=s*.2;for(let i=-3;i<=3;i++){x.beginPath();x.moveTo(p[0]-s+i*s*.35,p[1]-s);x.lineTo(p[0]+s+i*s*.35,p[1]+s);x.stroke()}
 }else if(id==='waves'){
  x.lineWidth=s*.18;x.beginPath();for(let i=-s;i<=s;i+=2){const y=p[1]+Math.sin((i+p[0])/s*3)*s*.25;i===-s?x.moveTo(p[0]+i,y):x.lineTo(p[0]+i,y)}x.stroke();
 }else if(id==='checks'){
  const u=s*.45;for(let i=-2;i<2;i++)for(let j=-2;j<2;j++)if((i+j+20)%2===0)x.fillRect(p[0]+i*u,p[1]+j*u,u,u);
 }else if(id==='stars'&&typeof STAMP101!=='undefined'){
  for(let k=0;k<3;k++)STAMP101.star(x,[p[0]+(k-1)*s*.6,p[1]+((k%2)-.5)*s*.4],s*.28);
 }
 x.restore();
}

{const ps=typeof paintSeg==='function'?paintSeg:null;
 if(ps)paintSeg=function(a,b){
  const night=paintNightSoft101(),tool=PT.tool;
  if(night&&paintToolIsGlowOnly101(tool)){const t=PT.tool;PT.tool='glow';const r=ps(a,b);PT.tool=t;return r}
  if(tool==='chalk'||tool==='watercolor'||tool==='spray'||tool==='sparkle'||tool==='constellation'||tool==='pattern'){
   const x=$('pcv')&&$('pcv').getContext('2d');if(!x)return;
   const A=typeof symPts==='function'?symPts(a):[a],B=typeof symPts==='function'?symPts(b):[b];
   if(typeof brushStyle==='function')brushStyle(x);
   x.fillStyle=x.strokeStyle||PT.col;
   for(let i=0;i<A.length;i++){
    if(tool==='chalk')paintChalkSeg101(x,A[i],B[i]);
    else if(tool==='watercolor')paintWaterSeg101(x,A[i],B[i]);
    else if(tool==='spray')paintSpraySeg101(x,A[i],B[i]);
    else if(tool==='sparkle'){ps(A[i],B[i]);paintSparkleSeg101(x,A[i],B[i])}
    else if(tool==='constellation')paintConstellationSeg101(x,A[i],B[i]);
    else if(tool==='pattern')paintPatternStamp101(x,B[i]);
   }
   x.shadowBlur=0;x.globalCompositeOperation='source-over';
   return;
  }
  return ps(a,b);
 };
}
{const pst=typeof paintStamp==='function'?paintStamp:null;
 if(pst)paintStamp=function(p){
  const x=$('pcv')&&$('pcv').getContext('2d');if(!x)return pst(p);
  const id=PT.stampId||'star',fn=typeof STAMP101!=='undefined'&&STAMP101[id];
  if(!fn)return pst(p);
  const pts=typeof symPts==='function'?symPts(p):[p],s=PT.size*2.2*(PT.dpr||1);
  x.save();x.fillStyle=PT.col;x.strokeStyle=PT.col;x.lineWidth=Math.max(1,(PT.dpr||1));
  pts.forEach(q=>fn(x,q,s));
  x.restore();
 };
}

function paintIcon101(id,on){
 const c=on?'#000':'#fff';
 const svg=(d)=>`<svg class="p101-ico" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</g></svg>`;
 if(id==='chalk')return svg('<path d="M6 16 L16 6 L19 9 L9 19 Z"/><path d="M6 16 L4 20 L8 18"/>');
 if(id==='sparkle')return svg('<path d="M12 3 L13.2 9 L19 10 L13.2 11 L12 17 L10.8 11 L5 10 L10.8 9 Z"/><path d="M18 15 L18.6 17.2 L21 17.8 L18.6 18.4 L18 20.6"/>');
 if(id==='watercolor')return svg('<circle cx="9" cy="13" r="5" fill="'+c+'" opacity=".35" stroke="none"/><circle cx="15" cy="12" r="5.5" fill="'+c+'" opacity=".25" stroke="none"/><path d="M7 8 Q12 4 17 8"/>');
 if(id==='spray')return svg('<path d="M8 14 h6 v6 H8 Z"/><path d="M11 14 V9 H14"/><path d="M16 6 l1.2 -2 M18 8 l2 -1 M18 11 l2 .4"/>');
 if(id==='constellation')return svg('<circle cx="6" cy="8" r="1.4" fill="'+c+'" stroke="none"/><circle cx="14" cy="5" r="1.4" fill="'+c+'" stroke="none"/><circle cx="18" cy="13" r="1.4" fill="'+c+'" stroke="none"/><circle cx="9" cy="17" r="1.4" fill="'+c+'" stroke="none"/><path d="M6 8 L14 5 L18 13 L9 17 Z"/>');
 if(id==='pattern')return svg('<circle cx="7" cy="7" r="1.6" fill="'+c+'" stroke="none"/><circle cx="12" cy="7" r="1.6" fill="'+c+'" stroke="none"/><circle cx="17" cy="7" r="1.6" fill="'+c+'" stroke="none"/><circle cx="7" cy="12" r="1.6" fill="'+c+'" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="'+c+'" stroke="none"/><circle cx="17" cy="12" r="1.6" fill="'+c+'" stroke="none"/>');
 return svg('<circle cx="12" cy="12" r="6"/>');
}

function paintBar101(){
 const s=$('pstudio');if(!s)return;
 s.classList.toggle('nightsoft101',paintNightSoft101());
 let bar=s.querySelector('.pbar101');
 if(!bar){bar=document.createElement('div');bar.className='pbar101';const old=s.querySelector('.pbar');if(old)old.after(bar);else s.prepend(bar)}
 const night=paintNightSoft101();
 const tools=[['chalk',gT('Chalk')],['sparkle',gT('Sparkle')],['watercolor',gT('Watercolor')],['spray',gT('Spray')],['constellation',gT('Constellation')],['pattern',gT('Pattern')],['stamp',gT('Stamp')]];
 let html=tools.map(([id,lab])=>{
  const on=PT.tool===id,soft=night&&paintToolIsGlowOnly101(id);
  return `<button type="button" data-tool101="${id}" class="${on?'on':''}" ${soft?'aria-disabled="true"':''} title="${esc(night&&soft?gT('On night paper, brushes stay a soft glow.'):lab)}" onclick="paintPick101('${id}')">${paintIcon101(id,on)}<span class="p101-lab">${esc(lab)}</span></button>`;
 }).join('');
 if(PT.tool==='stamp'){
  html+=`<span class="pstamp101">`+PSTAMP_IDS101.map(id=>`<button type="button" class="${PT.stampId===id?'on':''}" title="${esc(gT(id[0].toUpperCase()+id.slice(1)))}" onclick="PT.stampId='${id}';PT.tool='stamp';paintBar101()"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="${PT.stampId===id?'#000':'#fff'}" stroke="${PT.stampId===id?'#000':'#fff'}" stroke-width="1">${''}</g></svg></button>`).join('')+`</span>`;
 }
 if(PT.tool==='pattern'){
  html+=`<select aria-label="${esc(gT('Pattern'))}" onchange="PT.pattern=this.value">${PPAT101.map(p=>`<option value="${p}" ${PT.pattern===p?'selected':''}>${esc(gT(p[0].toUpperCase()+p.slice(1)))}</option>`).join('')}</select>`;
 }
 const pals=Object.keys(PCOLS101);
 html+=`<label class="p101-lab" style="color:#fff;margin-left:6px">${esc(gT('Palette'))} <select aria-label="${esc(gT('Palette'))}" onchange="paintPal101(this.value)">${pals.map(p=>`<option value="${p}" ${PT.pal101===p?'selected':''}>${esc(gT(p[0].toUpperCase()+p.slice(1)))}</option>`).join('')}</select></label>`;
 if(night)html+=`<span class="p101-lab" style="color:#ffd97a;max-width:14rem">${esc(gT('On night paper, brushes stay a soft glow.'))}</span>`;
 bar.innerHTML=html;
 // draw stamp previews
 if(PT.tool==='stamp'){
  bar.querySelectorAll('.pstamp101 button').forEach((btn,i)=>{
   const id=PSTAMP_IDS101[i],cv=document.createElement('canvas');cv.width=44;cv.height=44;
   const x=cv.getContext('2d');x.fillStyle=PT.stampId===id?'#000':'#fff';x.strokeStyle=x.fillStyle;
   if(STAMP101[id])STAMP101[id](x,[22,22],12);
   btn.innerHTML='';btn.appendChild(cv);
   btn.setAttribute('aria-label',gT(id[0].toUpperCase()+id.slice(1)));
  });
 }
 const host=s;
 const h=Math.max(58,Math.ceil((s.querySelector('.pbar')?.getBoundingClientRect().height||58)+(bar.getBoundingClientRect().height||48)));
 if(host.style.getPropertyValue('--pbh')!==h+'px'){host.style.setProperty('--pbh',h+'px');if(typeof paintSetup==='function')try{paintSetup()}catch(e){}}
}
function paintPick101(id){
 if(paintNightSoft101()&&paintToolIsGlowOnly101(id)){PT.tool='glow';if(typeof renderPaintBar==='function')renderPaintBar();else paintBar101();return}
 PT.tool=id;if(id==='stamp')PT.stamp=PT.stamp||'★';
 if(typeof renderPaintBar==='function')renderPaintBar();else paintBar101();
}
function paintPal101(name){
 const pal=PCOLS101[name];if(!pal)return;
 PT.pal101=name;
 // extend swatches: replace PCOL contents carefully — PCOL is const array we can mutate items
 if(typeof PCOL!=='undefined'&&Array.isArray(PCOL)){
  PCOL.length=0;pal.forEach(c=>PCOL.push(c));
 }
 if(typeof renderPaintBar==='function')renderPaintBar();
}
{const rp=RENDER.paint||(typeof renderPaint==='function'?renderPaint:null);
 if(rp){
  const wrap=function(){
   const r=rp.apply(this,arguments);
   try{
    // replace emoji stamp menu if present
    const bar=document.querySelector('#pstudio .pbar');
    if(bar){
     const sel=[...bar.querySelectorAll('select')].find(s=>(s.getAttribute('onchange')||'').includes('PT.stamp'));
     if(sel)sel.hidden=true;
    }
    paintBar101();
   }catch(e){}
   return r;
  };
  RENDER.paint=renderPaint=wrap;
 }
}



/* ---------------- Look Up: planet stories (NASA facts, comparisons), calmer grandeur ---------------- */
// Facts checked against NASA science.nasa.gov while building (Nov 2026). The app itself makes no requests.
const LU_STORIES101={
 mercury:{src:'science.nasa.gov/mercury',
  en:{t:'Mercury, the closest world',
   text:'Mercury is the closest planet to the Sun, and it is the smallest. NASA says it is a little more than one-third as wide as Earth.\n\nA year on Mercury — one trip around the Sun — takes only about 88 Earth days, less than three months here.\n\nMercury has almost no air to hold heat, so its days are very hot and its nights are very cold. It has no moons.',
   facts:['Closest to the Sun, and the smallest planet.','A little more than one-third as wide as Earth.','A year lasts about 88 Earth days.','Almost no air, and no moons.']},
  es:{t:'Mercurio, el mundo más cercano',
   text:'Mercurio es el planeta más cercano al Sol, y es el más pequeño. La NASA dice que mide un poco más de un tercio del ancho de la Tierra.\n\nUn año en Mercurio — una vuelta alrededor del Sol — dura solo unos 88 días terrestres, menos de tres meses aquí.\n\nMercurio casi no tiene aire que retenga el calor, así que sus días son muy calurosos y sus noches muy frías. No tiene lunas.',
   facts:['El más cercano al Sol, y el planeta más pequeño.','Un poco más de un tercio del ancho de la Tierra.','Un año dura unos 88 días terrestres.','Casi no tiene aire, y no tiene lunas.']}},
 venus:{src:'science.nasa.gov/venus',
  en:{t:'Venus, the hottest planet',
   text:'Venus is the second planet from the Sun. It is about as wide as Earth, and NASA sometimes calls it Earth’s twin for that reason.\n\nIt is the hottest planet, even though Mercury is closer to the Sun. A thick atmosphere of carbon dioxide traps the heat, like a heavy blanket that never comes off.\n\nVenus spins the opposite way from most of the other planets.',
   facts:['About as wide as Earth — sometimes called Earth’s twin.','The hottest planet: a thick atmosphere traps the heat.','It spins the opposite way from most planets.']},
  es:{t:'Venus, el planeta más caliente',
   text:'Venus es el segundo planeta desde el Sol. Tiene más o menos el mismo ancho que la Tierra, y por eso la NASA a veces lo llama el gemelo de la Tierra.\n\nEs el planeta más caliente, aunque Mercurio está más cerca del Sol. Una atmósfera espesa de dióxido de carbono atrapa el calor, como una manta pesada que no se quita nunca.\n\nVenus gira en el sentido contrario al de la mayoría de los demás planetas.',
   facts:['Más o menos del mismo ancho que la Tierra: a veces se le llama su gemelo.','El planeta más caliente: una atmósfera espesa atrapa el calor.','Gira en el sentido contrario al de la mayoría de los planetas.']}},
 earth:{src:'science.nasa.gov/earth',
  en:{t:'Earth, our home',
   text:'Earth is the third planet from the Sun, and it is our home. So far, it is the only planet we know of with life.\n\nIt has large oceans of water and an air rich in oxygen, which we breathe. One Moon travels around us, and sunlight on that Moon is what makes it glow in our night sky.',
   facts:['The third planet from the Sun, and our home.','The only planet we know of with life.','Large oceans, and air we can breathe.','One Moon, lit by sunlight.']},
  es:{t:'La Tierra, nuestro hogar',
   text:'La Tierra es el tercer planeta desde el Sol, y es nuestro hogar. Hasta ahora, es el único planeta que conocemos con vida.\n\nTiene grandes océanos de agua y un aire rico en oxígeno, que respiramos. Una Luna viaja a nuestro alrededor, y la luz del Sol sobre esa Luna es lo que la hace brillar en nuestro cielo nocturno.',
   facts:['El tercer planeta desde el Sol, y nuestro hogar.','El único planeta que conocemos con vida.','Grandes océanos, y un aire que podemos respirar.','Una Luna, iluminada por la luz del Sol.']}},
 mars:{src:'science.nasa.gov/mars',
  en:{t:'Mars, the rusty world',
   text:'Mars is the fourth planet from the Sun. NASA says it is about half as wide as Earth.\n\nIt looks red because its dust is rusty. It has the largest volcano in the Solar System, and two small moons.\n\nScientists have found signs that water once flowed on Mars, long ago.',
   facts:['About half as wide as Earth.','Red because its dust is rusty.','The largest volcano in the Solar System is here.','Two small moons, and signs of ancient water.']},
  es:{t:'Marte, el mundo de óxido',
   text:'Marte es el cuarto planeta desde el Sol. La NASA dice que mide más o menos la mitad del ancho de la Tierra.\n\nSe ve rojo porque su polvo está oxidado. Tiene el volcán más grande del sistema solar, y dos lunas pequeñas.\n\nLos científicos han encontrado señales de que alguna vez corrió agua en Marte, hace mucho tiempo.',
   facts:['Más o menos la mitad del ancho de la Tierra.','Rojo porque su polvo está oxidado.','Aquí está el volcán más grande del sistema solar.','Dos lunas pequeñas, y señales de agua antigua.']}},
 jupiter:{src:'science.nasa.gov/jupiter/jupiter-facts',
  en:{t:'Jupiter, the giant',
   text:'Jupiter is the largest planet. NASA says that if it were a hollow shell, about one thousand Earths could fit inside. If Earth were the size of a grape, Jupiter would be about as big as a basketball.\n\nIt is about eleven times wider than Earth. Its Great Red Spot is a giant storm, bigger than Earth, and people have been watching it for more than three hundred years.\n\nJupiter has the shortest day in the Solar System: it spins once in about ten hours. A year there lasts about twelve years on Earth.',
   facts:['If Jupiter were a hollow shell, about 1,000 Earths could fit inside.','If Earth were the size of a grape, Jupiter would be about as big as a basketball.','About eleven times wider than Earth.','The Great Red Spot is a storm bigger than Earth, seen for more than 300 years.','A day is about 10 hours; a year is about 12 Earth years.']},
  es:{t:'Júpiter, el gigante',
   text:'Júpiter es el planeta más grande. La NASA dice que si fuera una cáscara hueca, cabrían dentro unas mil Tierras. Si la Tierra fuera del tamaño de una uva, Júpiter sería más o menos del tamaño de un balón de básquetbol.\n\nMide unas once veces el ancho de la Tierra. Su Gran Mancha Roja es una tormenta gigante, más grande que la Tierra, y la hemos observado durante más de trescientos años.\n\nJúpiter tiene el día más corto del sistema solar: da una vuelta en unas diez horas. Un año allí dura unos doce años en la Tierra.',
   facts:['Si Júpiter fuera una cáscara hueca, cabrían unas 1.000 Tierras.','Si la Tierra fuera del tamaño de una uva, Júpiter sería más o menos del tamaño de un balón de básquetbol.','Unas once veces el ancho de la Tierra.','La Gran Mancha Roja es una tormenta más grande que la Tierra, observada más de 300 años.','Un día dura unas 10 horas; un año, unos 12 años terrestres.']}},
 saturn:{src:'science.nasa.gov/saturn/facts',
  en:{t:'Saturn and its rings',
   text:'Saturn is the second-largest planet, about nine times wider than Earth. NASA says that if Earth were the size of a nickel, Saturn would be about as big as a volleyball.\n\nIts rings are made of billions of chunks of ice and rock, some as small as dust and a few as large as mountains.\n\nSaturn is the only planet whose average density is less than water. NASA says it could float in a bathtub — if a bathtub that large existed.\n\nA day on Saturn is a little more than ten hours. A year lasts about twenty-nine years on Earth.',
   facts:['About nine times wider than Earth.','If Earth were the size of a nickel, Saturn would be about as big as a volleyball.','Rings of billions of chunks of ice and rock.','The only planet that would float in water, if a bathtub were big enough.','A year lasts about 29 Earth years.']},
  es:{t:'Saturno y sus anillos',
   text:'Saturno es el segundo planeta más grande, unas nueve veces más ancho que la Tierra. La NASA dice que si la Tierra fuera del tamaño de una moneda de cinco centavos, Saturno sería más o menos del tamaño de un balón de voleibol.\n\nSus anillos están hechos de miles de millones de trozos de hielo y roca, algunos tan pequeños como el polvo y unos pocos tan grandes como montañas.\n\nSaturno es el único planeta cuya densidad media es menor que la del agua. La NASA dice que podría flotar en una bañera, si existiera una bañera tan grande.\n\nUn día en Saturno dura un poco más de diez horas. Un año dura unos veintinueve años en la Tierra.',
   facts:['Unas nueve veces más ancho que la Tierra.','Si la Tierra fuera del tamaño de una moneda, Saturno sería más o menos del tamaño de un balón de voleibol.','Anillos de miles de millones de trozos de hielo y roca.','El único planeta que flotaría en el agua, si la bañera fuera lo bastante grande.','Un año dura unos 29 años terrestres.']}},
 uranus:{src:'science.nasa.gov/uranus',
  en:{t:'Uranus, the sideways spinner',
   text:'Uranus is an ice giant, about four times wider than Earth. It is about nineteen times farther from the Sun than we are.\n\nIt spins tipped over on its side, as if it were rolling along its path around the Sun.\n\nA year on Uranus lasts about eighty-four years on Earth.',
   facts:['An ice giant, about four times wider than Earth.','About 19 times farther from the Sun than Earth.','It spins tipped over on its side.','A year lasts about 84 Earth years.']},
  es:{t:'Urano, el que gira de lado',
   text:'Urano es un gigante de hielo, unas cuatro veces más ancho que la Tierra. Está unas diecinueve veces más lejos del Sol que nosotros.\n\nGira inclinado de lado, como si rodara por su camino alrededor del Sol.\n\nUn año en Urano dura unos ochenta y cuatro años en la Tierra.',
   facts:['Un gigante de hielo, unas cuatro veces más ancho que la Tierra.','Unas 19 veces más lejos del Sol que la Tierra.','Gira inclinado de lado.','Un año dura unos 84 años terrestres.']}},
 neptune:{src:'science.nasa.gov/neptune',
  en:{t:'Neptune, the farthest planet',
   text:'Neptune is the farthest planet from the Sun. It is about four times wider than Earth, and about thirty times farther from the Sun than we are.\n\nIt has the fastest winds in the Solar System — much faster than the strongest winds on Earth.\n\nA year on Neptune lasts about 165 years on Earth.',
   facts:['The farthest planet from the Sun.','About four times wider than Earth, and about 30 times farther from the Sun.','The fastest winds in the Solar System, much faster than the strongest winds on Earth.']},
  es:{t:'Neptuno, el planeta más lejano',
   text:'Neptuno es el planeta más lejano del Sol. Mide unas cuatro veces el ancho de la Tierra, y está unas treinta veces más lejos del Sol que nosotros.\n\nTiene los vientos más rápidos del sistema solar, mucho más rápidos que los vientos más fuertes de la Tierra.\n\nUn año en Neptuno dura unos 165 años en la Tierra.',
   facts:['El planeta más lejano del Sol.','Unas cuatro veces más ancho que la Tierra, y unas 30 veces más lejos del Sol.','Los vientos más rápidos del sistema solar, mucho más rápidos que los de la Tierra.']}},
 moon:{src:'science.nasa.gov/moon',
  en:{t:'The Moon, a borrowed light',
   text:'The Moon has no light of its own. Sunlight makes it glow.\n\nIt is about one-fourth as wide as Earth, and the same face looks toward us as it travels around our planet.\n\nThe Moon’s pull helps make the ocean tides that rise and fall along Earth’s shores.',
   facts:['No light of its own — sunlight makes it glow.','About one-fourth as wide as Earth.','The same face looks toward Earth.','Its pull helps make the ocean tides.']},
  es:{t:'La Luna, una luz prestada',
   text:'La Luna no tiene luz propia. La luz del Sol la hace brillar.\n\nMide más o menos una cuarta parte del ancho de la Tierra, y la misma cara nos mira mientras viaja alrededor de nuestro planeta.\n\nEl tirón de la Luna ayuda a crear las mareas del océano, que suben y bajan en las orillas de la Tierra.',
   facts:['No tiene luz propia: la luz del Sol la hace brillar.','Más o menos una cuarta parte del ancho de la Tierra.','La misma cara mira hacia la Tierra.','Su tirón ayuda a crear las mareas.']}},
 sun:{src:'science.nasa.gov/sun',
  en:{t:'The Sun, our star',
   text:'The Sun is a star — a hot ball of glowing gases. It is not a planet.\n\nThe planets travel around it, and its light and warmth reach Earth across a long distance. That light also makes the Moon glow, and it is the light we see in the day.',
   facts:['The Sun is a star, not a planet.','A hot ball of glowing gases.','The planets travel around it.','Its light and warmth reach Earth, and make the Moon glow.']},
  es:{t:'El Sol, nuestra estrella',
   text:'El Sol es una estrella: una bola caliente de gases que brillan. No es un planeta.\n\nLos planetas viajan a su alrededor, y su luz y su calor llegan a la Tierra a través de una larga distancia. Esa luz también hace brillar la Luna, y es la luz que vemos de día.',
   facts:['El Sol es una estrella, no un planeta.','Una bola caliente de gases que brillan.','Los planetas viajan a su alrededor.','Su luz y su calor llegan a la Tierra, y hacen brillar la Luna.']}}
};

function luStoryLang101(id){
 const s=LU_STORIES101[id];if(!s)return null;
 const L=(typeof LANG==='string'&&LANG==='es')?'es':'en';
 return {id,src:s.src,...s[L]};
}
function luStoryHTML101(id){
 const s=luStoryLang101(id);if(!s)return '';
 const p=(typeof luPlanet83==='function'&&luPlanet83(id))||(id==='moon'&&typeof LU_MOON83!=='undefined'&&LU_MOON83)||null;
 let art='';
 try{
  if(id==='sun'&&typeof luSunMark83==='function')art=`<svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">${luStars101()}${luSunMark83(100,100,36,false)}</svg>`;
  else if(id==='moon'&&typeof luMoonMark83==='function')art=`<svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">${luStars101()}${luMoonMark83(100,100,28,true)}</svg>`;
  else if(p&&typeof luPlanetMark83==='function')art=`<svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">${luStars101()}${luPlanetMark83(p,100,100,id==='jupiter'||id==='saturn'?48:36,{})}</svg>`;
 }catch(e){}
 return `<div class="card luStory101"><button type="button" onclick="luStoryClose101()">${gT('Back')}</button><h2 class="kline">${esc(s.t)}</h2><div class="luPlanetArt101">${art}</div><p class="kline">${esc(s.text).replace(/\n\n/g,'</p><p class="kline">')}</p><ul class="facts101 kline">${s.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p class="soft lu83-credit">${esc(gT('Planet facts follow NASA ({src}).',{src:s.src}))}</p></div>`;
}
function luStars101(){
 const reduce=typeof luReduce83==='function'&&luReduce83();
 let h=`<rect width="200" height="200" fill="#0b1020"/>`;
 // calm milky-way band
 h+=`<ellipse cx="100" cy="100" rx="130" ry="28" transform="rotate(-22 100 100)" fill="#c9b8e8" opacity="${reduce?.1:.16}"/>`;
 const pts=[[16,20],[40,12],[70,28],[110,16],[150,24],[184,14],[22,80],[60,70],[90,86],[140,66],[176,90],[30,150],[80,140],[120,160],[168,148],[50,170],[14,110],[190,120]];
 pts.forEach(([x,y],i)=>{h+=`<circle cx="${x}" cy="${y}" r="${1+(i%3)*.4}" fill="#f4e8c8" opacity="${.5+i%3*.15}"/>`});
 return h;
}
function luStoryOpen101(id){if(!LU_STORIES101[id])return;LU83.story101=id;if(typeof luRender83==='function')luRender83();window.scrollTo(0,0)}
function luStoryClose101(){LU83.story101=null;if(typeof luRender83==='function')luRender83();window.scrollTo(0,0)}
function luStoryNav101(){
 const ids=['sun','mercury','venus','earth','moon','mars','jupiter','saturn','uranus','neptune'];
 return `<div class="card" data-lustories101="1"><h3>${gT('Planet stories')}</h3><p class="soft">${gT('Short stories with real facts, from NASA.')}</p><div class="hubgrid">${ids.map(id=>{const s=luStoryLang101(id);return s?`<button class="hubtile" type="button" onclick="luStoryOpen101('${id}')">${esc(s.t)}</button>`:''}).join('')}</div></div>`;
}
{if(typeof luRender83==='function'){
 const prev=luRender83;
 luRender83=function(){
  if(LU83&&LU83.story101&&LU_STORIES101[LU83.story101]){
   const root=$('lookup');if(!root)return prev.apply(this,arguments);
   root.innerHTML=luStoryHTML101(LU83.story101);
   root.classList.add('luGrander101');
   return;
  }
  const r=prev.apply(this,arguments);
  const root=$('lookup');if(!root)return r;
  root.classList.add('luGrander101');
  if(!root.querySelector('[data-lustories101]')){
   const host=root.querySelector('.lu83-nav, .lu83-credit, .card:last-child')||root;
   host.insertAdjacentHTML('afterend',luStoryNav101());
  }
  return r;
 };
}}
// Grander, still sky: wrap luStars83 if it exists, add a soft band
{if(typeof luStars83==='function'){
 const prev=luStars83;
 luStars83=function(n,seed,dim){
  let h=prev.apply(this,arguments);
  const reduce=typeof luReduce83==='function'&&luReduce83();
  h+=`<ellipse cx="200" cy="90" rx="260" ry="36" transform="rotate(-18 200 90)" fill="#c9b8e8" opacity="${reduce?.08:.14}" stroke="none"/>`;
  return h;
 };
}}



/* ---------------- Bedtime Glow: wind, rain, stream, waves; sleep fade; no sudden sounds ---------------- */
const BTSCENES101=[
 {id:'glow',en:'Glow',es:'Brillo',icon:'glow'},
 {id:'wind',en:'Wind',es:'Viento',icon:'wind'},
 {id:'rain',en:'Rain',es:'Lluvia',icon:'rain'},
 {id:'stream',en:'Stream',es:'Arroyo',icon:'stream'},
 {id:'waves',en:'Waves',es:'Olas',icon:'waves'}
];
if(typeof BT==='object'){BT.scene=BT.scene||'glow';BT.fading=false;BT.fadeT0=0;BT.fadeDur=90000}

function btSceneLabel101(s){return gT(LANG==='es'?s.es:s.en)}

function btAudioStop(){const c=typeof AC!=='undefined'?AC:null;if(typeof BT!=='undefined'&&BT.nodes){BT.nodes.forEach(n=>{try{n.stop((c&&c.currentTime||0)+.6)}catch(e){}})}if(BT.master&&c){try{BT.master.gain.setTargetAtTime(0,c.currentTime,.2)}catch(e){}}BT.nodes=[];BT.master=null;BT.sunG=null}

function btNoiseBuf101(c,sec){
 const n=Math.floor(c.sampleRate*sec),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
 let v=0;for(let i=0;i<n;i++){v=.98*v+(Math.random()*2-1)*.28;d[i]=v}return b;
}
function btPad101(c,dest,f,v,type){
 const o=c.createOscillator(),g=c.createGain(),l=c.createOscillator(),lg=c.createGain();
 o.type=type||'sine';o.frequency.value=f;
 l.frequency.value=.03+f/20000;lg.gain.value=f*.015;l.connect(lg);lg.connect(o.frequency);
 g.gain.value=v;o.connect(g);g.connect(dest);o.start();l.start();BT.nodes.push(o,l);return g;
}

function btAudio(){
 btAudioStop();
 const c=typeof ac==='function'?ac():null;if(!c)return;
 const M=c.createGain(),lp=c.createBiquadFilter();
 lp.type='lowpass';lp.frequency.value=BT.scene==='glow'?600:BT.scene==='wind'?900:BT.scene==='rain'?1600:1100;
 M.gain.value=0;M.gain.setTargetAtTime(.18,c.currentTime,2.4);
 lp.connect(M);M.connect(c.destination);BT.master=M;BT.nodes=BT.nodes||[];
 const scene=BT.scene||'glow';
 if(scene==='glow'){
  [[110,.28],[110.4,.28],[165,.1],[220.3,.05]].forEach(([f,v])=>{
   const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(lp);o.start();BT.nodes.push(o);
  });
  const sg=c.createGain();sg.gain.value=BT.sun?.4:0;sg.connect(lp);BT.sunG=sg;
  [55,82.4,61.7].forEach((f,i)=>{
   const o=c.createOscillator(),l=c.createOscillator(),lg=c.createGain(),g=c.createGain();
   o.type='triangle';o.frequency.value=f;l.frequency.value=.013+i*.007;lg.gain.value=f*.04;l.connect(lg);lg.connect(o.frequency);
   g.gain.value=.14;o.connect(g);g.connect(sg);o.start();l.start();BT.nodes.push(o,l);
  });
  return;
 }
 // All water/wind: steady filtered noise, slow LFO, no transients
 const src=c.createBufferSource(),b=btNoiseBuf101(c,4),bp=c.createBiquadFilter(),g=c.createGain(),lfo=c.createOscillator(),lg=c.createGain();
 src.buffer=b;src.loop=true;
 if(scene==='wind'){bp.type='bandpass';bp.frequency.value=720;bp.Q.value=.55;g.gain.value=.14;lfo.frequency.value=.08;lg.gain.value=220;lfo.connect(lg);lg.connect(bp.frequency)}
 else if(scene==='rain'){bp.type='bandpass';bp.frequency.value=1300;bp.Q.value=.7;g.gain.value=.12;lfo.frequency.value=.05;lg.gain.value=180;lfo.connect(lg);lg.connect(bp.frequency)}
 else if(scene==='stream'){bp.type='bandpass';bp.frequency.value=1100;bp.Q.value=1.1;g.gain.value=.11;lfo.frequency.value=.07;lg.gain.value=140;lfo.connect(lg);lg.connect(bp.frequency)}
 else if(scene==='waves'){bp.type='lowpass';bp.frequency.value=540;bp.Q.value=.4;g.gain.value=.15;lfo.frequency.value=.07;lg.gain.value=.08;lfo.connect(lg);lg.connect(g.gain)}
 src.connect(bp);bp.connect(g);g.connect(lp);
 src.start();lfo.start();BT.nodes.push(src,lfo);
 // a very low steady bed so it still feels like Bedtime Glow
 btPad101(c,lp,73,.05,'sine');
 btPad101(c,lp,110,.04,'sine');
}

function btSleepFade101(fromBtn){
 if(!BT.fading){BT.fading=true;BT.fadeT0=performance.now();BT.fadeDur=90000}
 if(fromBtn){const w=$('btword');if(w)w.textContent=gT('Good night')}
}

function btDrawGlow101(x,W,H,t,ease,fade,cols){
 const S=Math.min(W,H)/2;
 cols.forEach((c,i)=>{
  const a=t*.05+i*2.1,r=S*(.35+.35*ease)*(1-i*.08),cx=W/2+Math.cos(a)*S*.08*i,cy=H/2+Math.sin(a)*S*.08*i;
  const g=x.createRadialGradient(cx,cy,0,cx,cy,r);
  g.addColorStop(0,`rgba(${c},${.35*fade})`);g.addColorStop(1,`rgba(${c},0)`);
  x.fillStyle=g;x.fillRect(0,0,W,H);
 });
 const g=x.createRadialGradient(W/2,H/2,0,W/2,H/2,S*(.12+.12*ease));
 g.addColorStop(0,`rgba(255,244,220,${.5*fade})`);g.addColorStop(1,'rgba(255,244,220,0)');
 x.fillStyle=g;x.fillRect(0,0,W,H);
}
function btDrawWind101(x,W,H,t,fade){
 const reduce=typeof lampReduced73==='function'&&lampReduced73();
 const drift=reduce?0:t*.12;
 for(let i=0;i<7;i++){
  x.beginPath();
  const y=H*(.22+i*.1),amp=H*.02*(1+i*.08);
  for(let px=0;px<=W;px+=8){
   const yy=y+Math.sin(px*.01+drift+i)*amp;
   px?x.lineTo(px,yy):x.moveTo(px,yy);
  }
  x.strokeStyle=`rgba(200,214,230,${(.12+i*.03)*fade})`;x.lineWidth=2;x.stroke();
 }
 // soft grass
 x.strokeStyle=`rgba(120,160,120,${.25*fade})`;x.lineWidth=2;
 for(let i=0;i<18;i++){
  const gx=W*(i+.5)/18,lean=reduce?0:Math.sin(t*.4+i)*.12;
  x.beginPath();x.moveTo(gx,H);x.quadraticCurveTo(gx+lean*40,H*.82,gx+lean*70,H*.7);x.stroke();
 }
}
function btDrawRain101(x,W,H,t,fade){
 const reduce=typeof lampReduced73==='function'&&lampReduced73();
 x.fillStyle=`rgba(80,110,150,${.12*fade})`;x.fillRect(0,H*.78,W,H*.22);
 const n=reduce?12:28;
 for(let i=0;i<n;i++){
  const sp=.18+(i%5)*.04, px=((i*97)%W+W)%W, py=reduce?(H*.3+(i*37)%(H*.5)):((t*sp*H+i*53)%(H+20)-10);
  x.strokeStyle=`rgba(190,210,230,${.28*fade})`;x.lineWidth=1.4;
  x.beginPath();x.moveTo(px,py);x.lineTo(px-2,py+14);x.stroke();
 }
}
function btDrawStream101(x,W,H,t,fade){
 const reduce=typeof lampReduced73==='function'&&lampReduced73();
 const flow=reduce?0:t*.35;
 for(let band=0;band<5;band++){
  x.beginPath();
  const y0=H*(.45+band*.08);
  for(let px=0;px<=W;px+=6){
   const yy=y0+Math.sin(px*.02-flow+band*1.1)*H*.025;
   px?x.lineTo(px,yy):x.moveTo(px,yy);
  }
  x.strokeStyle=`rgba(140,190,210,${(.18+band*.04)*fade})`;x.lineWidth=3;x.stroke();
 }
 // banks
 x.fillStyle=`rgba(60,80,60,${.35*fade})`;
 x.fillRect(0,0,W,H*.38);x.fillRect(0,H*.78,W,H*.22);
}
function btDrawWaves101(x,W,H,t,fade){
 const reduce=typeof lampReduced73==='function'&&lampReduced73();
 const swell=reduce?.5:.5+.5*Math.sin(t*.25);
 for(let i=0;i<6;i++){
  x.beginPath();
  const y=H*(.4+i*.08)+swell*H*.03*(6-i)/6;
  for(let px=0;px<=W;px+=8){
   const yy=y+Math.sin(px*.012+t*.3+i)*.02*H*(reduce?0:1);
   px?x.lineTo(px,yy):x.moveTo(px,yy);
  }
  x.lineTo(W,H);x.lineTo(0,H);x.closePath();
  x.fillStyle=`rgba(70,110,150,${(.08+i*.04)*fade})`;x.fill();
 }
}

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
  if(BT.fading){
   const k=Math.min(1,(ts-BT.fadeT0)/BT.fadeDur);
   fade=1-k;
   if(BT.master){try{BT.master.gain.setTargetAtTime(.18*Math.max(0,fade), (typeof AC!=='undefined'&&AC&&AC.currentTime)||0, .4)}catch(e){}}
   if(k>=1){btAudioStop();cv.style.opacity=.12;const w=$('btword');if(w)w.textContent=gT('Good night');cancelAnimationFrame(BT.raf);BT.raf=0;return}
  }else{
   const left=Math.max(0,BT.end-ts);
   fade=Math.min(1,left>60000?1:left/60000);
   if(left<=0){btSleepFade101(false);fade=1}
   if(BT.master&&left<60000&&left>0){try{BT.master.gain.setTargetAtTime(.18*fade, (typeof AC!=='undefined'&&AC&&AC.currentTime)||0, .5)}catch(e){}}
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

function btSetScene101(id){
 BT.scene=id;BT.fading=false;
 document.querySelectorAll('.btScene101 button').forEach(b=>b.classList.toggle('on',b.dataset.scene===id));
 if(typeof btAudio==='function')btAudio();
}


function btToggleBreathe101(btn){
 BT.breathe=!BT.breathe;
 if(btn)btn.textContent=BT.breathe?gT('Breathing guide: on'):gT('Breathing guide: off');
}
function btToggleSun101(btn){
 if(typeof btSun==='function')btSun(!BT.sun);
 if(btn)btn.textContent=BT.sun?gT('Sun song: on'):gT('Sun song: off');
 const f=$('btfact');if(f)f.classList.toggle('hidden',!BT.sun);
}

RENDER.bedtime=function(){
 btStop();
 const scenes=BTSCENES101.map(s=>`<button type="button" data-scene="${s.id}" class="${(BT.scene||'glow')===s.id?'on':''}" onclick="btSetScene101('${s.id}')">${typeof tileSvg101==='function'?tileSvg101(s.icon):''}<span>${esc(btSceneLabel101(s))}</span></button>`).join('');
 const sunBtn=(BT.scene||'glow')==='glow'?`<button type="button" onclick="btToggleSun101(this)">${esc(BT.sun?gT('Sun song: on'):gT('Sun song: off'))}</button>`:'';
 $('bedtime').innerHTML=`<div id="btwrap"><canvas id="btc"></canvas><div id="btword"></div>
<div id="btui">
<div class="btScene101" role="group" aria-label="${esc(gT('Bedtime sound'))}">${scenes}</div>
<button type="button" onclick="btToggleBreathe101(this)">${esc(BT.breathe?gT('Breathing guide: on'):gT('Breathing guide: off'))}</button>
${sunBtn}
${[5,10,20].map(m=>`<button type="button" class="${BT.min===m?'p':''}" onclick="btStart(${m})">${gT('{n} min',{n:m})}</button>`).join('')}
<button type="button" onclick="btSleepFade101(true)">${esc(gT('Fade to sleep'))}</button>
<button type="button" onclick="btStop();show('hub')">${esc(gT('Done'))}</button>
<p id="btfact" class="${BT.sun&&(BT.scene||'glow')==='glow'?'':'hidden'}">${esc(gT("Inspired by the Sun's vibrations. Scientists listen to the Sun's vibrations to learn what is inside it. This sound is made on your device, very slow and low."))}</p>
<p class="soft">${esc(gT('A slow, gentle light and sound for winding down. When the time ends, everything fades to sleep.'))}</p>
</div></div>`;
 document.body.classList.add('bedtime');btStart(BT.min,true);
};




/* ---------------- Companions: Lamp is the heart; Moth and Owl, two only ---------------- */
// One active companion per child, swappable anytime. Each keeps its own growth.
// Only the active one grows; the others rest and never fade or need anything.
// All three can be chosen from the start. No collection, no locks.
const FRIENDS101=['lamp','moth','owl'];
let FRIEND_ART_CTX101=null;
const _lampLoad73_101=typeof lampLoad73==='function'?lampLoad73:null;
const _lampPut73_101=typeof lampPut73==='function'?lampPut73:null;

function friendDefault101(){return {schema:1,gen:76,name:'',moments:0,stage:1,shown:1,pending:[],kinds:[],day:'',dayCredits:0,session:'',lastSeen:0,hiddenAt:0}}
function friendNorm101(raw){
 const s=Object.assign(friendDefault101(),raw&&typeof raw==='object'?raw:{});
 s.moments=Math.max(0,Number(s.moments)||0);
 s.stage=Math.max(1,Math.min(6,Number(s.stage)||1));
 s.shown=Math.max(1,Math.min(6,Number(s.shown)||s.stage||1));
 s.shown=Math.min(s.shown,s.stage);
 const kinds=typeof LAMP_KINDS75!=='undefined'?LAMP_KINDS75:['rhyme','memory','retry'];
 s.pending=Array.isArray(s.pending)?s.pending.filter(p=>p&&p.stage>=2&&p.stage<=6&&kinds.includes(p.reason)):[];
 s.kinds=Array.isArray(s.kinds)?s.kinds.filter(k=>kinds.includes(k)):[];
 s.day=typeof s.day==='string'?s.day:'';
 s.dayCredits=Math.max(0,Number(s.dayCredits)||0);
 s.session=typeof s.session==='string'?s.session:'';
 s.name=typeof s.name==='string'?s.name.trim().slice(0,20):'';
 s.lastSeen=Number(s.lastSeen)||0;s.hiddenAt=Number(s.hiddenAt)||0;
 return s;
}
function friendsLoad101(pid){
 const id=pid||(typeof curPid==='function'?curPid():'');
 const raw=typeof RAW!=='undefined'&&typeof safeJSON==='function'?safeJSON(RAW.get('lamp_friends101@'+id),null):null;
 const def=typeof friendDefault101==='function'?friendDefault101():{moments:0,stage:1,shown:1};
 const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||def);
 const f={active:'lamp',offered:false,moth:norm(def),owl:norm(def),turtle:norm(def),dragon:norm(def),phoenix:norm(def)};
 if(raw&&typeof raw==='object'){
  if(typeof FRIENDS101!=='undefined'&&FRIENDS101.includes(raw.active))f.active=raw.active;
  f.offered=!!raw.offered;
  ['moth','owl','turtle','dragon','phoenix'].forEach(k=>{f[k]=norm(raw[k])});
 }
 return f;
}
function friendsPut101(f,pid){
 const id=pid||(typeof curPid==='function'?curPid():'');
 if(typeof getProfiles==='function'&&!getProfiles().list.some(p=>p.id===id))return;
 if(typeof RAW==='undefined')return;
 const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
 RAW.set('lamp_friends101@'+id,JSON.stringify({
  active:(typeof FRIENDS101!=='undefined'&&FRIENDS101.includes(f.active))?f.active:'lamp',
  offered:!!f.offered,
  moth:norm(f.moth),owl:norm(f.owl),turtle:norm(f.turtle),
  dragon:norm(f.dragon),phoenix:norm(f.phoenix)
 }));
}
function friendActive101(pid){return friendsLoad101(pid).active||'lamp'}
function friendKindName101(kind){return kind==='moth'?gT('Moth'):kind==='owl'?gT('Owl'):gT('Lamp')}
function friendState101(kind,pid){
 if(kind==='lamp')return _lampLoad73_101?_lampLoad73_101(pid):lampLoad73(pid);
 const f=friendsLoad101(pid);
 return friendNorm101(kind==='owl'?f.owl:f.moth);
}

if(_lampLoad73_101){
 lampLoad73=function(pid){
  const id=pid||curPid(),f=friendsLoad101(id);
  if(f.active==='lamp'){
   const s=_lampLoad73_101(id);s._kind101='lamp';s._pid101=id;return s;
  }
  const s=friendNorm101(f[f.active]);s._kind101=f.active;s._pid101=id;return s;
 };
}
if(_lampPut73_101){
 lampPut73=function(s,pid){
  const id=pid||curPid();
  const kind=(s&&s._kind101)||friendsLoad101(id).active||'lamp';
  if(kind==='lamp'){
   const clean=Object.assign({},s||{});delete clean._kind101;delete clean._pid101;
   return _lampPut73_101(clean,id);
  }
  const f=friendsLoad101(id);
  f[kind]=friendNorm101({
   name:s.name||'',moments:s.moments,stage:s.stage,shown:s.shown,pending:s.pending,
   kinds:s.kinds||[],day:s.day||'',dayCredits:s.dayCredits||0,session:s.session||'',
   lastSeen:s.lastSeen||0,hiddenAt:s.hiddenAt||0
  });
  friendsPut101(f,id);
 };
}
// Flame colors and unlocks always follow the Lamp's own stage, never a friend's.
if(typeof lampFlameMax81==='function'&&_lampLoad73_101){
 const prev=lampFlameMax81;
 lampFlameMax81=function(s){
  const pid=(s&&s._pid101)||FLAME_CTX81||(typeof curPid==='function'&&curPid());
  return prev.call(this,_lampLoad73_101(pid));
 };
}
if(typeof lampName73==='function'){
 lampName73=function(s){
  s=s||lampLoad73();
  const kind=(s&&s._kind101)||friendActive101(s&&s._pid101);
  return (s&&s.name)||friendKindName101(kind);
 };
}
if(typeof lampArtInner73==='function'){
 lampArtInner73=function(stage){
  const kind=FRIEND_ART_CTX101||friendActive101(FLAME_CTX81||(typeof curPid==='function'&&curPid()));
  if(typeof friendArtInner101==='function')return friendArtInner101(kind,stage);
  if(typeof lampArtUpgrade101==='function'&&(kind==='lamp'||!kind))return lampArtUpgrade101(stage);
  return '';
 };
}

function friendLine101(){
 const hub=$('hub');if(!hub||hub.classList.contains('hidden'))return;
 const host=hub.querySelector('.today64 .lamp76-hero .lamp73-figure, .today64 .lamp73-figure, .today64');
 if(!host)return;
 let line=hub.querySelector('.friendLine101');
 if(!line){line=document.createElement('p');line.className='friendLine101 kline';
  const cap=host.querySelector('figcaption')||host;
  cap.insertAdjacentElement('afterend',line)}
 line.textContent=gT('Your {name} is with you tonight.',{name:lampName73()});
}

function friendPickerHTML101(pid){
 const f=friendsLoad101(pid);
 const kinds=FRIENDS101;
 return `<div class="card" data-friends101="1"><h3 class="kline">${gT('Who sits with you')}</h3>
<p class="soft">${gT('Pick one anytime. Each keeps its own glow. Only the one who is with you grows; the others rest and need nothing.')}</p>
<div class="friendPick101" role="list">${kinds.map(k=>{
  const st=friendState101(k,pid),view=typeof lampViewStage74==='function'?lampViewStage74(st):st.stage||1;
  const prev=FRIEND_ART_CTX101;FRIEND_ART_CTX101=k;
  let art='';
  try{art=typeof lampSvg73==='function'?lampSvg73(view,'',false):''}finally{FRIEND_ART_CTX101=prev}
  const nm=(st.name&&st.name.trim())||friendKindName101(k);
  const on=f.active===k;
  return `<button type="button" role="listitem" class="${on?'on':''}" data-friend="${k}" aria-pressed="${on?'true':'false'}" aria-label="${esc(nm)}" onclick="friendPick101('${k}','${esc(pid||'')}')">${art}<span class="kline">${esc(nm)}</span></button>`;
 }).join('')}</div></div>`;
}
function friendPickerAttach101(){
 const form=$('pform');if(!form)return;
 const pid=form.dataset.pid73;if(!pid)return;
 const slot=form.querySelector('[data-lamp73-slot="profile"]')||form;
 const keep=$('lampname73')&&document.activeElement===$('lampname73')?$('lampname73').value:null;
 let box=form.querySelector('[data-friends101]');
 const html=friendPickerHTML101(pid);
 if(box)box.outerHTML=html;else slot.insertAdjacentHTML('afterbegin',html);
 const inp=$('lampname73'),lab=inp&&form.querySelector('label[for="lampname73"]');
 const kind=friendActive101(pid),def=friendKindName101(kind);
 if(lab)lab.textContent=gT('Name');
 if(inp){inp.placeholder=def;if(keep!=null)inp.value=keep}
 const hint=inp&&inp.parentElement&&[...inp.parentElement.querySelectorAll('p.soft')].find(p=>/rename the lamp|renombrar la lámpara|Its glow stays/i.test(p.textContent||''));
 if(hint)hint.textContent=gT('You can rename them on this device. Their glow stays theirs.');
}

function friendPick101(id,pid){
 if(!FRIENDS101.includes(id))return;
 const who=pid||($('pform')&&$('pform').dataset.pid73)||curPid();
 const inp=$('lampname73');
 if(inp&&typeof lampSaveName73==='function')lampSaveName73(who,inp.value);
 const f=friendsLoad101(who);
 f.active=id;
 f.offered=true;
 friendsPut101(f,who);
 if(typeof lampMountAll73==='function')lampMountAll73();
 else friendPickerAttach101();
 friendLine101();
}

function friendOfferMaybe101(){
 if(typeof LAMP73==='object'&&LAMP73.shown)return;
 if(document.querySelector('dialog.lamp73-dialog, dialog.friendOffer101'))return;
 const pid=curPid(),f=friendsLoad101(pid);
 if(f.offered)return;
 const s=lampLoad73(pid);
 if(s&&s.pending&&s.pending.length)return;
 f.offered=true;friendsPut101(f,pid);
 const d=document.createElement('dialog');
 d.className='friendOffer101';
 d.setAttribute('aria-modal','true');
 d.setAttribute('aria-label',gT('A new friend'));
 d.innerHTML=`<p class="kline">${esc(gT('A Moth and an Owl would like to sit with you, if you want. You can pick one, or keep your Lamp. You can change anytime in Kids.'))}</p>
<div class="row101">
<button type="button" class="p" data-pick="moth">${esc(gT('Moth'))}</button>
<button type="button" class="p" data-pick="owl">${esc(gT('Owl'))}</button>
<button type="button" data-pick="lamp">${esc(gT('Keep the Lamp'))}</button>
</div>`;
 const finish=pick=>{
  if(pick&&pick!=='lamp'){f.active=pick;friendsPut101(f,pid)}
  try{if(d.open)d.close()}catch(e){}
  d.remove();
  if(typeof lampMountAll73==='function')lampMountAll73();
  friendLine101();
 };
 d.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>finish(b.dataset.pick));
 d.addEventListener('cancel',e=>{e.preventDefault();finish('lamp')});
 document.body.appendChild(d);
 if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');
 d.querySelector('button').focus({preventScroll:true});
}

if(typeof lampPresent73==='function'){
 const prev=lampPresent73;
 lampPresent73=function(item){
  const kind=friendActive101();
  const r=prev.apply(this,arguments);
  const d=document.querySelector('dialog.lamp73-dialog');
  if(d&&kind!=='lamp'){
   const u=d.querySelector('.lamp81-unlock');if(u)u.remove();
   if(typeof lampSetVars81==='function'&&typeof lampFlamePal81==='function'){
    try{lampSetVars81(d,lampFlamePal81(curPid()))}catch(e){}
   }
  }
  if(d){
   d.addEventListener('close',()=>{setTimeout(friendOfferMaybe101,450)},{once:true});
  }
  return r;
 };
}
if(typeof lampMountAll73==='function'){
 const prev=lampMountAll73;
 lampMountAll73=function(){
  const r=prev.apply(this,arguments);
  try{friendLine101();friendPickerAttach101()}catch(e){}
  return r;
 };
}

/* ---------------- What's new (Grown-ups, once) and Help ---------------- */
function whatsNewSeen101(){return typeof RAW!=='undefined'&&RAW.get('lamp_whatsnew101')==='1'}
function whatsNewDismiss101(){
 try{RAW.set('lamp_whatsnew101','1')}catch(e){}
 document.querySelectorAll('[data-whatsnew101]').forEach(n=>n.remove());
}
function whatsNewAttach101(){
 const root=$('adults');if(!root||whatsNewSeen101())return;
 if(root.querySelector('[data-whatsnew101]'))return;
 const html=`<div class="card whatsnew101" data-whatsnew101="1"><h2>${gT("What's new")}</h2>
<p>${gT("Today's Story now brings one new story each day. Paint, Sound cards, Look Up, and Bedtime Glow are ready to enjoy. A Moth and an Owl can sit with your child — pick one in Kids, or keep the Lamp. Only the one who is with them grows.")}</p>
<p><button type="button" class="p" onclick="whatsNewDismiss101()">${gT('OK')}</button></p></div>`;
 root.insertAdjacentHTML('afterbegin',html);
}
{const ra=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof ra==='function'){
  renderAdults=function(){const r=ra.apply(this,arguments);whatsNewAttach101();return r};
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}

function helpCompanion101(){
 const about=$('about');if(!about)return;
 const guide=about.querySelector('#helpGuide95');if(!guide||guide.querySelector('#helpFriend101'))return;
 const extra=`<p id="helpFriend101">${esc(gT('A Moth and an Owl can sit with them too. Only the one who is with them grows; the others rest and keep what they have. You can switch at any time in Kids.'))}</p>`;
 const hs=[...guide.querySelectorAll('h3')];
 const lampH=hs.find(h=>/^(Lamp|Lámpara)$/.test((h.textContent||'').trim()));
 const p=lampH&&lampH.nextElementSibling;
 if(p&&p.tagName==='P')p.insertAdjacentHTML('afterend',extra);
 else guide.insertAdjacentHTML('beforeend',extra);
}
if(typeof helpTidy95==='function'){
 const prev=helpTidy95;
 helpTidy95=function(){const r=prev.apply(this,arguments);helpCompanion101();return r};
}
if(typeof afterShow95==='function'){
 const prev=afterShow95;
 afterShow95=function(id){const r=prev.apply(this,arguments);if(id==='about')helpCompanion101();if(id==='adults')whatsNewAttach101();if(id==='hub'){scTile101();friendLine101()}if(id==='kids')friendPickerAttach101();return r};
}

/* ---------------- showImpl97: new screens, story merge, tiles ---------------- */
{if(typeof showImpl97==='function'){
 const prev=showImpl97;
 showImpl97=function(id){
  try{if(id!=='soundcards'&&typeof scStop101==='function')scStop101()}catch(e){}
  try{if(id!=='lookup'&&typeof LU83==='object')LU83.story101=null}catch(e){}
  try{storiesMerge101()}catch(e){}
  const r=prev.apply(this,arguments);
  try{
   if(id==='hub'){scTile101();friendLine101()}
   if(id==='adults')whatsNewAttach101();
   if(id==='kids')friendPickerAttach101();
   if(id==='about')helpCompanion101();
  }catch(e){}
  return r;
 };
}}
{const rh=typeof renderHub==='function'?renderHub:(typeof RENDER==='object'&&RENDER.hub);
 if(typeof rh==='function'){
  renderHub=function(){const r=rh.apply(this,arguments);try{scTile101();friendLine101()}catch(e){}return r};
  if(typeof RENDER==='object')RENDER.hub=renderHub;
 }
}

/* ---------------- Boot ---------------- */
function boot101(){
 try{storiesDay0_101();storiesMerge101()}catch(e){}
 try{if($('hub')&&!$('hub').classList.contains('hidden')){scTile101();friendLine101()}}catch(e){}
 try{if($('adults')&&!$('adults').classList.contains('hidden'))whatsNewAttach101()}catch(e){}
 try{if($('kids')&&!$('kids').classList.contains('hidden'))friendPickerAttach101()}catch(e){}
 try{if($('about')&&!$('about').classList.contains('hidden'))helpCompanion101()}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot101);
else boot101();
setTimeout(boot101,0);

