// v33: readable Games hub tiles in every theme, translated Word Scramble + Library empty state,
// automatic Rhythm Echo count-in right after the demo, sound board prefers new sb_* heart clips.
// Zero outside requests; sounds stay on the soft Bedtime Glow voice.

// 1) Hub tiles inside the dark game cards: dark tile + light text, independent of the reading theme (AA in every theme).
document.head.insertAdjacentHTML('beforeend',`<style>
.gcard .hubtile,#arcade .hubtile{background:#1b1f38;color:#f6efe0;border-color:#3a4170}
.gcard .hubtile small,#arcade .hubtile small{color:#e2dccd}
.gcard .hubtile:hover,.gcard .hubtile:focus-visible,#arcade .hubtile:hover,#arcade .hubtile:focus-visible{background:#262c50;outline:3px solid #ffd97a;outline-offset:2px}
.gcard .agebadge{background:#ffd54f;color:#2a1f12}
</style>`);

// 2) Word Scramble: timer/score/end lines through the dictionary.
arScrStart=function(){AR.sl=[...SCR].sort(()=>Math.random()-.5);AR.si=0;AR.ss=0;AR.end=Date.now()+60000;clearInterval(AR.st);
 AR.st=setInterval(()=>{const t=$('scrt');if(!t||AR.v!=='scr'){clearInterval(AR.st);return}const left=Math.max(0,Math.ceil((AR.end-Date.now())/1000));
  t.innerHTML=`⏱ ${gT('{n} s',{n:gNum(left)})} · ${gT('Score')} <b>${gNum(AR.ss)}</b>`;
  if(!left){clearInterval(AR.st);arSave('scr',AR.ss);$('scrfb').innerHTML='⏰ '+gT('Time! You got {n}. Best {b}.',{n:'<b>'+gNum(AR.ss)+'</b>',b:gNum(AR.best.scr)});$('scri').disabled=true}},250);RENDER.arcade()};
{const ra=RENDER.arcade;RENDER.arcade=function(){ra();if(AR.v!=='scr')return;const el=$('arcade');
 const sk=[...el.querySelectorAll('button')].find(b=>b.textContent.trim()==='Skip');if(sk)sk.textContent=gT('Skip');
 const i=$('scri');if(i)i.placeholder=gT('type the word');
 const bk=[...el.querySelectorAll('button')].find(b=>/Arcade$/.test(b.textContent.trim()));if(bk){bk.textContent='⬅ '+gT('Games');bk.onclick=()=>{AR.v=null;GM.v=null;show('games')}}}}

// Library empty state through the dictionary too (also covered by text-node translation).
{const rll=renderLibList;renderLibList=function(){rll();const l=$('liblist');if(!l)return;l.querySelectorAll('p.soft').forEach(p=>{if(p.textContent.trim()==='Nothing matches. Try fewer filters.')p.textContent=gT('Nothing matches. Try fewer filters.')})}}

// 3) Rhythm Echo: the 3-2-1 count-in starts as soon as the last demo hit has sounded (no tap needed).
rxPlay=function(){const L=GM.custom||rxLvl();if(L.once&&GM.played)return;const c=ac();if(!c)return;gStop();if(L.once){const p=$('rxplay');if(p){p.disabled=true;p.textContent='▶ '+gT('Played once')}}
 const bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),b=60/bpm,t0=c.currentTime+.15;for(let i=0;i<4;i++)drumHit('hat',t0+i*b);
 L.hits.forEach(([t,p],i)=>{padSound(p,t0+(4+t)*b);later(()=>rxDraw(null,i),((4+t)*b+.15)*1000)});GM.played=1;GM.taps=[];GM.t0=null;GM.listen=1;GM.turn=0;
 rxOv('👂 '+gT('Listen…'));$('grfb').textContent='';
 const last=Math.max(...L.hits.map(h=>h[0])),end=(4+last)*b+.15+Math.min(.7,Math.max(.45,b*.75));
 const tok=GM.rxTok=(GM.rxTok||0)+1,ok=()=>GM.rxTok===tok&&GM.v==='rx';
 [3,2,1].forEach((n,k)=>{later(()=>{if(!ok())return;rxOv(gNum(n),1);const cc=ac();if(cc)note(k<2?76:84,cc.currentTime,.12,'bells',.25)},(end+k*.6)*1000)});
 later(()=>{if(!ok())return;GM.listen=0;GM.turn=1;rxOv(gT('Your turn!'),1);rxDraw(L.once?[]:null);later(()=>{if(GM.turn&&!(GM.taps||[]).length)rxOv(gT('{n} hits left',{n:gNum(L.hits.length)}))},900);
  if(GM.custom||!RXEASY.includes(L.id)){clearTimeout(GM.rt);GM.rt=setTimeout(()=>{if(!(GM.taps||[]).length){rxOv('');$('grfb').textContent=gT('Tap the pads when you are ready, or press ▶ to hear it again.')}},9000)}},(end+1.8)*1000)};

// 4) Sound board: a new whole-line heart clip (sb_<id>, listed in audio/heart/index.json) wins; otherwise the
// existing word clips; otherwise the soft glow tone. Never the device voice. A missing/broken clip falls through quietly.
sbTap=async function(el,id){document.querySelectorAll('.sbbtn.say').forEach(x=>x.classList.remove('say'));el.classList.add('say');setTimeout(()=>el.classList.remove('say'),1600);try{musicStop()}catch(e){}
 const it=SBOARD.flatMap(g=>g[1]).find(x=>x[0]===id);if(!it)return;const set=await voiceIndex('heart').catch(()=>new Set());
 if(set.has('sb_'+id)){try{const b=await loadClip('sb_'+id,'heart');if(b)return playClip(b,0,1)}catch(e){}}
 const c=ac();if(!c)return;let t=c.currentTime+.05;for(const k of it[3]){let b=null;if(k&&set.has(k)){try{b=await loadClip(k,'heart')}catch(e){}}
  if(b){const s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(t);MSRC.push(s);t+=b.duration+.12}else{sbTone(t);t+=.6}}};
