// v93: Luna lyric highlights follow QA's real per-word timings.
// lyrics/luna_timings.json holds, per song id, one start time (seconds from
// the start of the shipped Luna mix) per .kw index. Highlights run on the
// audio clock from the buffer's real start time (playSing starts it at
// currentTime+0.08), so they stay aligned in MP3 and Opus, and if the audio
// context is suspended and resumed. Songs without timings keep the old estimate.
let LUNA_T=null;
const LUNA_T_READY93=fetch('lyrics/luna_timings.json').then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{LUNA_T=j;return j}).catch(()=>{LUNA_T=LUNA_T||{};return LUNA_T});
const KW93={tok:0,raf:0,t0:null,log:[]};
function kwStop93(){KW93.tok++;if(KW93.raf)cancelAnimationFrame(KW93.raf);KW93.raf=0;clearInterval(KW93.iv);KW93.iv=0}
{const ms=musicStop;musicStop=function(){kwStop93();return ms.apply(this,arguments)}}
// Record the exact `when` the Luna buffer is started with.
function playSingAt93(buf){
 const P=AudioBufferSourceNode.prototype,orig=P.start;let when=null;
 P.start=function(w){if(when==null)when=(typeof w==='number'&&w>0)?w:ac().currentTime;return orig.apply(this,arguments)};
 let d;try{d=playSing(buf)}finally{P.start=orig}
 return {d,t0:when==null?ac().currentTime:when};
}
function kwRun93(times,t0,d,done){
 kwStop93();const tok=KW93.tok,c=ac();let cur=-1;KW93.t0=t0;KW93.log=[];let fin=false;
 const tick=()=>{
  if(tok!==KW93.tok)return;
  const el=c.currentTime-t0;
  let i=cur;while(i+1<times.length&&el>=times[i+1])i++;
  if(i!==cur){
   for(let j=cur+1;j<=i;j++){KW93.log.push({i:j,at:+el.toFixed(4)})}
   cur=i;document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));
   const e=$('kw'+i);if(e)e.classList.add('on','was');
  }
  if(!fin&&el>=d+.2){fin=true;document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));done&&done();kwStop93();return}
 };
 const loop=()=>{if(tok!==KW93.tok)return;tick();KW93.raf=requestAnimationFrame(loop)};
 KW93.raf=requestAnimationFrame(loop);
 KW93.iv=setInterval(()=>{if(document.hidden)tick()},100); // rAF sleeps in hidden tabs
}
async function playSong88(s){
 if(typeof musicStop==='function')musicStop();
 const f=t=>{const e=$('sfb');if(e)e.textContent=t};
 if(isLuna88(s.id)&&typeof loadSingFor==='function'&&(typeof LANG==='undefined'||LANG!=='es')){
  f('⏳ '+gT('Loading…'));
  const [buf]=await Promise.all([loadSingFor(s.id,'luna'),LUNA_T_READY93]);
  if(buf==='offline')return f('📶 '+gT('Needs internet: this singing voice is not downloaded yet.'));
  if(!buf)return f('⚠️ '+gT('Could not play.'));
  const meta=(await (typeof songsSung==='function'?songsSung():Promise.resolve({})))[s.id]||{};
  const n=meta.lines||s.lines.length,part={...s,lines:s.lines.slice(0,n)};
  f('🎤 Luna');
  const {d,t0}=playSingAt93(buf);
  const tl=songTimeline(part,s.bpm),end=tl.length?tl[tl.length-1].end:1,k=d*.92/end;
  const real=LUNA_T&&LUNA_T[s.id];
  // Old estimate was (w.t*k+.3) s after the click; the buffer starts .08 s after it.
  const times=tl.map((w,i)=>{const v=real&&real[i];return typeof v==='number'?v:Math.max(0,w.t*k+.3-.08)});
  kwRun93(times,t0,d,()=>{try{markDay('music')}catch(e){}f('⭐ '+gT('Great singing!'))});
  return;
 }
 // m6, m7, and Spanish: same glow path as before.
 if(typeof singPlay==='function'){MU.v='sing';MU.s=s.id;return singPlay(false)}
}
