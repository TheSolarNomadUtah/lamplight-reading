// v34: Rhythm Echo count-in timed on the audio clock (0.5 s after the last demo hit, one beat per step),
// Word Scramble status fully translated with locale numbers. Zero outside requests.
// Debug: set localStorage 'lamp_rxdebug'='1' (or window.RX_DEBUG=1) to log hit and count-in times to the console.
const rxDbg=(...a)=>{try{if(window.RX_DEBUG||localStorage.getItem('lamp_rxdebug')==='1')console.log('[rx]',...a)}catch(e){}};
rxPlay=function(){const L=GM.custom||rxLvl();if(L.once&&GM.played)return;const c=ac();if(!c)return;gStop();if(L.once){const p=$('rxplay');if(p){p.disabled=true;p.textContent='▶ '+gT('Played once')}}
 const bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),b=60/bpm,t0=c.currentTime+.15;for(let i=0;i<4;i++)drumHit('hat',t0+i*b);
 // wall-clock delay (ms) until an audio-clock time actually sounds
 const at=tA=>Math.max(0,(tA-c.currentTime+(c.outputLatency||0))*1000);
 L.hits.forEach(([t,p],i)=>{padSound(p,t0+(4+t)*b);later(()=>rxDraw(null,i),at(t0+(4+t)*b))});GM.played=1;GM.taps=[];GM.t0=null;GM.listen=1;GM.turn=0;
 rxOv('👂 '+gT('Listen…'));$('grfb').textContent='';
 const lastA=t0+(4+Math.max(...L.hits.map(h=>h[0])))*b,ciA=lastA+.5;
 const tok=GM.rxTok=(GM.rxTok||0)+1,ok=()=>GM.rxTok===tok&&GM.v==='rx',w0=performance.now();
 rxDbg('bpm',bpm,'beat s',b,'last hit in',(lastA-c.currentTime).toFixed(3),'count-in in',(ciA-c.currentTime).toFixed(3));
 [3,2,1].forEach((n,k)=>{note(k<2?76:84,ciA+k*b,.12,'bells',.25);later(()=>{if(!ok())return;rxDbg('show',n,'at ms',Math.round(performance.now()-w0));rxOv(gNum(n),1)},at(ciA+k*b))});
 later(()=>{if(!ok())return;rxDbg('your turn at ms',Math.round(performance.now()-w0));GM.listen=0;GM.turn=1;rxOv(gT('Your turn!'),1);rxDraw(L.once?[]:null);later(()=>{if(GM.turn&&!(GM.taps||[]).length)rxOv(gT('{n} hits left',{n:gNum(L.hits.length)}))},900);
  if(GM.custom||!RXEASY.includes(L.id)){clearTimeout(GM.rt);GM.rt=setTimeout(()=>{if(!(GM.taps||[]).length){rxOv('');$('grfb').textContent=gT('Tap the pads when you are ready, or press ▶ to hear it again.')}},9000)}},at(ciA+3*b))};
// The 3-2-1 bells are now scheduled on the audio clock above; stop them if the player leaves or replays.
// Word Scramble status (v19 shows it on every new word, v33 every tick): one translated line everywhere.
function scrStatus(){const t=$('scrt');if(!t||!AR.end)return;const left=Math.max(0,Math.ceil((AR.end-Date.now())/1000));
 t.innerHTML=`⏱ ${gT('{n} s',{n:gNum(left)})} · ${gT('Score')} <b>${gNum(AR.ss||0)}</b> · ${gT('Best')} ${gNum(AR.best.scr||0)}`}
{const sh=arScrShow;arScrShow=function(){sh();scrStatus()}}
{const st=arScrStart;arScrStart=function(){st();clearInterval(AR.st);scrStatus();AR.st=setInterval(()=>{const t=$('scrt');if(!t||AR.v!=='scr'){clearInterval(AR.st);return}scrStatus();
 if(Date.now()>=AR.end){clearInterval(AR.st);arSave('scr',AR.ss);$('scrfb').innerHTML='⏰ '+gT('Time! You got {n}. Best {b}.',{n:'<b>'+gNum(AR.ss)+'</b>',b:gNum(AR.best.scr)});$('scri').disabled=true;scrStatus()}},250)}}
