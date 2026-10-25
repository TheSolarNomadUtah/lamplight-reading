// v27: Games. Rhythm Echo levels, call & response, Melody Echo, Word Ladder, Duet. Zero data: stars live in this browser only (per kid).
PKEYS.push('lamp_games');
SECTIONS.push('games');document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="games" class="hidden"></section>');
let GD=null;const gdata=()=>GD||(GD=fetch('games-data.json').then(r=>r.json()));
const GM={v:null};const gStars=()=>safeJSON(LS.get('lamp_games'),{});
function gSave(k,s){const g=gStars();if(!(g[k]>=s)){g[k]=s;LS.set('lamp_games',JSON.stringify(g))}try{markDay('music')}catch(e){}}
const starStr=n=>'⭐'.repeat(n)+'☆'.repeat(3-n);
const gCard=(h,inner)=>`<div class="card big gcard"><h2>${h}</h2>${inner}</div>`;
const gBack=`<p><button class="bigbtn" onclick="gStop();GM.v=null;RENDER.games()">⬅ Games</button></p>`;
function gStop(){try{musicStop()}catch(e){}clearTimeout(GM.rt);clearInterval(GM.tick);GM.busy=0}
// ================= Rhythm Echo =================
const PADS={kick:['🥁','#ffcf6b','Drum'],clap:['👏','#7fe3ff','Clap'],hat:['🔔','#c9a7ff','Bell']};
function padSound(p,t){drumHit(p==='hat'?'hat':p==='clap'?'clap':'kick',t)}
const RXK='kick',RXC='clap',RXH='hat',RXP=(a,p)=>a.map(t=>[t,p||RXK]);
const RXL=[
 {id:'k1',n:'6 beats',bpm:80,len:6,hits:RXP([0,1,2,4])},
 {id:'k2',n:'8 beats with rests',bpm:80,len:8,hits:RXP([0,1,3,4,6])},
 {id:'k3',n:'Dotted rhythm',bpm:100,len:8,hits:RXP([0,1.5,2,4,5.5,6])},
 {id:'k4',n:'Syncopation',bpm:100,len:8,hits:RXP([0,1.5,2.5,4,5.5,6.5])},
 {id:'k5',n:'12 beats',bpm:120,len:12,hits:RXP([0,1,2,4,5,7,8,9,10])},
 {id:'k6',n:'Two pads',bpm:100,len:8,hits:[[0,RXK],[1,RXC],[2,RXK],[2.5,RXK],[3,RXC],[4,RXK],[5,RXC],[6,RXK],[7,RXC]]},
 {id:'k7',n:'Three pads',bpm:120,len:8,hits:[[0,RXK],[0.5,RXH],[1,RXC],[1.5,RXH],[2,RXK],[3,RXC],[3.5,RXH],[4,RXK],[5,RXC],[6,RXK],[6.5,RXK],[7,RXC]]},
 {id:'k8',n:'Fast 140',bpm:140,len:8,hits:RXP([0,0.5,1.5,2,3,4,4.5,5.5,6,7])},
 {id:'g1',n:'3:2 polyrhythm',bpm:90,len:4,g:1,win:110,hits:[...[0,2/3,4/3,2,8/3,10/3].map(t=>[t,RXK]),...[0,1,2,3].map(t=>[t,RXC])]},
 {id:'g2',n:'Swing',bpm:120,len:8,g:1,win:100,swing:1,hits:[[0,RXK],[2/3,RXH],[1,RXC],[5/3,RXH],[2,RXK],[3,RXC],[11/3,RXH],[4,RXK],[14/3,RXK],[5,RXC],[6,RXK],[7,RXC],[23/3,RXH]]},
 {id:'g3',n:'Once only',bpm:120,len:8,g:1,win:100,once:1,hits:[[0,RXK],[0.75,RXH],[1.5,RXC],[2.5,RXK],[3,RXH],[3.5,RXC],[4.75,RXK],[5.5,RXC],[6,RXH],[6.5,RXK],[7.25,RXC]]},
 {id:'g4',n:'Tight timing',bpm:140,len:12,g:1,win:60,once:1,hits:RXP([0,1.5,2,3.5,4.5,6,7.5,8,9.5,10.5,11])}];
const BPMS=[80,100,120,140];
function rxLvl(){return RXL[GM.lvl||0]}
function rxPads(L){return [...new Set(L.hits.map(h=>h[1]))].sort((a,b)=>['kick','clap','hat'].indexOf(a)-['kick','clap','hat'].indexOf(b))}
function rxRender(){const L=GM.custom||rxLvl(),bpm=GM.custom?GM.custom.bpm:(GM.bpm||L.bpm),st=gStars(),cr=GM.cr;
 const lv=GM.custom?'':`<div class="glv">${RXL.map((x,i)=>`<button class="${i===GM.lvl?'p':''}" onclick="GM.lvl=${i};GM.bpm=null;GM.played=0;RENDER.games()">${x.g?'👪 ':''}${x.n}<br><small>${starStr(st['rx_'+x.id]||0)}</small></button>`).join('')}</div>
  <p>Speed: ${BPMS.map(b=>`<button class="${bpm===b?'p':''}" onclick="GM.bpm=${b};RENDER.games()">${b}</button>`).join(' ')} BPM</p>`;
 const info=GM.custom?'':`<p class="soft">${L.g?'Grown-up tier · ':''}${L.len} beats · ${L.hits.length} hits · window ±${L.win||180} ms${L.once?' · plays once, no replay':''}${L.swing?' · swing':''}</p>`;
 $('games').innerHTML=gCard(cr?`🗣️ Call & response · ${cr.turn==='call'?cr.who+' makes the call':cr.who+' answers'}`:'🥁 Rhythm Echo',`${lv}${info}${cr?`<p>Score: Kid <b>${cr.kid}</b> · Grown-up <b>${cr.grown}</b></p>`:''}
 <canvas id="grc" width="720" height="150" style="width:100%;max-width:720px"></canvas>
 <p>${cr&&cr.turn==='call'?`<button class="bigbtn p" onclick="crRecord()">⏺ Make a call</button>`:`<button class="bigbtn p" id="rxplay" onclick="rxPlay()" ${L.once&&GM.played?'disabled':''}>▶ ${L.once&&GM.played?'Played once':'Hear pattern'}</button> <button class="bigbtn" onclick="rxJudge()">✔ Done</button>`}</p>
 <div class="gpads">${(cr&&cr.turn==='call'?['kick','clap','hat']:rxPads(L)).map((p,i)=>`<button class="gpad" data-pad="${p}" style="--c:${PADS[p][1]}" onpointerdown="rxTap('${p}');event.preventDefault()">${PADS[p][0]}<small>${PADS[p][2]} · ${'FJK'[i]}</small></button>`).join('')}</div>
 <p id="grfb" class="gfb"></p>${cr?'':`<p><button onclick="crStart()">🗣️ Call & response (kid + grown-up)</button></p>`}${gBack}`);rxDraw()}
function rxDraw(taps){const cv=$('grc');if(!cv)return;const x=cv.getContext('2d'),W=cv.width,L=GM.custom||rxLvl(),pads=GM.cr&&GM.cr.turn==='call'?['kick','clap','hat']:rxPads(L),lh=130/pads.length,sx=t=>20+t*(W-40)/L.len;
 x.fillStyle='#14182c';x.fillRect(0,0,W,150);for(let b=0;b<=L.len;b++){x.fillStyle=b%4?'#262c48':'#3a4170';x.fillRect(sx(b),8,2,134)}
 if(!(L.once&&GM.played&&!taps))L.hits.forEach(([t,p])=>{const y=10+lh*(pads.indexOf(p)+.4);x.fillStyle=PADS[p][1];x.globalAlpha=.9;x.beginPath();x.arc(sx(t),y,8,0,7);x.fill()});
 x.globalAlpha=1;(taps||[]).forEach(([t,p,ok])=>{const y=10+lh*(pads.indexOf(p)+.75);x.strokeStyle=ok?'#9dff9d':'#ff8a8a';x.lineWidth=3;x.beginPath();x.arc(sx(t),y,6,0,7);x.stroke()})}
function rxPlay(){const L=GM.custom||rxLvl();if(L.once&&GM.played)return;const c=ac();if(!c)return;gStop();if(L.once){const p=$('rxplay');if(p){p.disabled=true;p.textContent='▶ Played once'}}const bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),b=60/bpm,t0=c.currentTime+.15;
 for(let i=0;i<4;i++)drumHit('hat',t0+i*b);L.hits.forEach(([t,p])=>padSound(p,t0+(4+t)*b));GM.played=1;GM.taps=[];GM.t0=null;GM.listen=1;
 const f=$('grfb');f.textContent='1, 2, 3, 4… listen';later(()=>{const f=$('grfb');if(f)f.textContent='Your turn! Start with the first hit.';GM.listen=0;if(L.once){const p=$('rxplay');if(p){p.disabled=true;p.textContent='▶ Played once'}rxDraw([])}},((4+L.len)*b+.2)*1000)}
function rxTap(p){if(GM.rec)return crTap(p);if(GM.listen)return;padSound(p);const L=GM.custom||rxLvl(),bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),now=performance.now();
 const el=document.querySelector(`.gpad[data-pad="${p}"]`);if(el){el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),90)}
 if(GM.t0==null)GM.t0=now-L.hits[0][0]*60000/bpm;GM.taps=GM.taps||[];GM.taps.push([(now-GM.t0)/(60000/bpm),p]);rxDraw(GM.taps.map(t=>[t[0],t[1],1]));
 clearTimeout(GM.rt);GM.rt=setTimeout(rxJudge,Math.max(1500,2.2*60000/bpm))}
function rxJudge(){clearTimeout(GM.rt);const L=GM.custom||rxLvl(),bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),ms=60000/bpm,win=GM.custom?200:(L.win||180),taps=(GM.taps||[]).map(t=>({t:t[0],p:t[1],used:0}));if(!taps.length)return;
 let hit=0,err=0;L.hits.forEach(([t,p])=>{let best=null;taps.forEach(x=>{if(!x.used&&x.p===p){const d=Math.abs(x.t-t)*ms;if(d<=win&&(!best||d<best.d))best={x,d}}});if(best){best.x.used=1;hit++;err+=best.d}});
 const extra=taps.filter(x=>!x.used).length,score=Math.max(0,Math.round(100*hit/L.hits.length-extra*5)),avg=hit?Math.round(err/hit):0;
 const stars=score>=95&&avg<=win*.5?3:score>=80?2:score>=60?1:0;rxDraw(taps.map(x=>[x.t,x.p,x.used]));GM.taps=[];GM.t0=null;
 const cr=GM.cr;if(cr){if(cr.turn==='answer'){cr[cr.ans]+=stars;cr.turn='call';const nx=cr.ans;cr.who=nx==='kid'?'Kid':'Grown-up';cr.callerKey=nx;GM.custom=null;$('grfb').innerHTML=`${starStr(stars)} ${score}% · ${avg} ms off. Now ${cr.who} makes the call.`;setTimeout(rxRender,1800)}return}
 if(stars)gSave('rx_'+L.id,stars);$('grfb').innerHTML=`${starStr(stars)} <b>${score}%</b> · ${hit}/${L.hits.length} hits · ${avg} ms off${extra?` · ${extra} extra`:''}${stars>=2&&GM.lvl<RXL.length-1?` <button class="p" onclick="GM.lvl++;GM.bpm=null;GM.played=0;RENDER.games()">Next ▶</button>`:''}`}
document.addEventListener('keydown',e=>{if(GM.v!=='rx'||$('games').classList.contains('hidden'))return;const i='fjk'.indexOf(e.key.toLowerCase());const pads=[...document.querySelectorAll('.gpad')];if(i>=0&&pads[i]){e.preventDefault();rxTap(pads[i].dataset.pad)}});
// Call & response: one makes up a pattern on the pads, the other echoes it. Then swap.
function crStart(){GM.cr={turn:'call',who:'Kid',callerKey:'kid',kid:0,grown:0};GM.custom=null;rxRender()}
function crRecord(){GM.rec=[];GM.recT0=null;$('grfb').textContent='Tap a pattern (up to 8 beats). Stop for 2 seconds to finish.'}
function crTap(p){padSound(p);const now=performance.now();if(GM.recT0==null)GM.recT0=now;GM.rec.push([(now-GM.recT0)/(60000/100),p]);clearTimeout(GM.rt);GM.rt=setTimeout(crDone,2000)}
function crDone(){const r=GM.rec;GM.rec=null;if(!r||r.length<2){$('grfb').textContent='Make a call with at least 2 taps.';return}const len=Math.min(12,Math.ceil(r[r.length-1][0]+1));
 const cr=GM.cr;cr.ans=cr.callerKey==='kid'?'grown':'kid';cr.who=cr.ans==='kid'?'Kid':'Grown-up';cr.turn='answer';GM.custom={id:'cr',bpm:100,len,hits:r.filter(h=>h[0]<len)};GM.played=0;rxRender();$('grfb').textContent=cr.who+': press ▶ to hear the call, then echo it.'}
// ================= Melody Echo =================
const MKEYS=[[60,'#ff6b6b'],[62,'#ffb86b'],[64,'#ffe66b'],[67,'#6bff9e'],[69,'#6bc8ff']],CHROM=[[61,'#a33'],[63,'#a63'],[65,'#aa3'],[66,'#3a6'],[68,'#36a'],[70,'#63a'],[71,'#a3a']];
const MEL=[{id:'k1',n:'3 notes',len:3},{id:'k2',n:'4 notes',len:4},{id:'k3',n:'5 notes',len:5},{id:'k4',n:'6 notes',len:6},
 {id:'g1',n:'8 notes',len:8,g:1},{id:'g2',n:'10 notes',len:10,g:1},{id:'g3',n:'10 + sharps',len:10,g:1,chrom:1},{id:'g4',n:'12 + sharps',len:12,g:1,chrom:1}];
function melKeys(L){return L.chrom?[...MKEYS,...CHROM].sort((a,b)=>a[0]-b[0]):MKEYS}
function melSeq(L,seed){const ks=melKeys(L).map(k=>k[0]);let s=seed||Math.floor(Math.random()*1e9),o=[];for(let i=0;i<L.len;i++){s=(s*1103515245+12345)%2147483648;let m=ks[s%ks.length];if(o.length&&m===o[o.length-1])m=ks[(s+1)%ks.length];o.push(m)}return o}
function melPanel(id,L,label){const ks=melKeys(L);return `<div class="mpanel" id="mp_${id}"><p><b>${label||''}</b> <span id="mfb_${id}" class="gfb"></span></p><div class="mkeys">${ks.map(([m,c])=>`<button class="mkey ${CHROM.some(x=>x[0]===m)?'sharp':''}" data-m="${m}" style="--c:${c}" onpointerdown="melTap('${id}',${m});event.preventDefault()"></button>`).join('')}</div></div>`}
function melRender(){const st=gStars(),L=MEL[GM.mlvl||0];
 $('games').innerHTML=gCard('🎹 Melody Echo',`<div class="glv">${MEL.map((x,i)=>`<button class="${i===(GM.mlvl||0)?'p':''}" onclick="GM.mlvl=${i};RENDER.games()">${x.g?'👪 ':''}${x.n}<br><small>${starStr(st['mel_'+x.id]||0)}</small></button>`).join('')}</div>
 <p class="soft">Watch and listen, then play the same notes back. 3 mistakes ends the round.</p>${melPanel('solo',L)}<p><button class="bigbtn p" onclick="melStart('solo')">▶ Play tune</button></p>${gBack}`)}
const MS={};
function melPlay(id,seq,t0){const c=ac(),b=.55;seq.forEach((m,i)=>{note(m,t0+i*b,.45,'bells',.3);later(()=>melLight(id,m),(t0-c.currentTime+i*b)*1000)});return seq.length*b}
function melLight(id,m){const k=document.querySelector(`#mp_${id} .mkey[data-m="${m}"]`);if(k){k.classList.add('lit');setTimeout(()=>k.classList.remove('lit'),330)}}
function melStart(id,seqOverride){gStop();const L=MEL[GM.mlvl||0],c=ac();if(!c)return;MS[id]={seq:seqOverride||melSeq(L),i:0,err:0,lock:1,L};const d=melPlay(id,MS[id].seq,c.currentTime+.2);$('mfb_'+id).textContent='Listen…';later(()=>{MS[id].lock=0;const f=$('mfb_'+id);if(f)f.textContent='Your turn!'},d*1000+300)}
function melTap(id,m){const s=MS[id];note(m,ac().currentTime,.35,'bells',.3);melLight(id,m);if(!s||s.lock||s.done)return;
 if(m===s.seq[s.i]){s.i++;if(s.i===s.seq.length){s.done=1;const stars=s.err===0?3:s.err===1?2:1;if(id==='solo')gSave('mel_'+s.L.id,stars);$('mfb_'+id).innerHTML=`${starStr(stars)} You got it!`;if(id!=='solo')duetDone(id,stars)}}
 else{s.err++;const k=document.querySelector(`#mp_${id} .mkeys`);if(k){k.classList.add('shake');setTimeout(()=>k.classList.remove('shake'),300)}
  if(s.err>=3){s.done=1;$('mfb_'+id).innerHTML=`${starStr(0)} 3 mistakes. Try again!`;if(id!=='solo')duetDone(id,0)}else{$('mfb_'+id).textContent=`Oops (${s.err}/3). Keep going from note ${s.i+1}.`}}}
// ================= Word Ladder =================
const WL={};
async function ladRender(){const d=await gdata(),st=gStars(),i=GM.lad||0,L=d.ladders[i];
 $('games').innerHTML=gCard('🪜 Word Ladder',`<div class="glv">${d.ladders.map((x,j)=>`<button class="${j===i?'p':''}" onclick="GM.lad=${j};RENDER.games()">${x.tier==='grown'?'👪 ⏱ ':''}${x.a.toUpperCase()} → ${x.b.toUpperCase()}<br><small>${starStr(st['lad_'+x.a+x.b]||0)}</small></button>`).join('')}</div>
 <p class="soft">Change one letter at a time. Every step must be a real word. ${L.tier==='grown'?'Grown-up ladder: beat the clock.':''} Best: ${L.par} steps.</p>${ladPanel('solo',L)}${gBack}`);ladStart('solo',L)}
function ladPanel(id,L){return `<div class="lpanel" id="lp_${id}"><p class="gfb" id="lt_${id}"></p><div class="lchain" id="lc_${id}"></div><div class="ltiles" id="lw_${id}"></div><p class="soft" id="lh_${id}">Goal: <b>${L.b.toUpperCase()}</b></p>
 <div class="lkeys">${'abcdefghijklmnopqrstuvwxyz'.split('').map(ch=>`<button onclick="ladKey('${id}','${ch}')">${ch}</button>`).join('')}</div><p><button onclick="ladUndo('${id}')">↶ Undo</button> <button onclick="ladStart('${id}')">↺ Restart</button></p><p id="lfb_${id}" class="gfb"></p></div>`}
function ladStart(id,L){L=L||WL[id].L;clearInterval((WL[id]||{}).tick);WL[id]={L,chain:[L.a],pos:null,done:0};if(L.tier==='grown'){WL[id].end=Date.now()+(L.a.length===4?120000:90000);WL[id].tick=setInterval(()=>ladTime(id),250)}ladShow(id)}
function ladTime(id){const w=WL[id];if(!w||w.done||!$('lt_'+id))return clearInterval(w&&w.tick);const s=Math.max(0,Math.ceil((w.end-Date.now())/1000));$('lt_'+id).textContent='⏱ '+s+'s';if(!s){w.done=1;clearInterval(w.tick);$('lfb_'+id).innerHTML=starStr(0)+' Time! One way: '+w.L.sol.join(' → ').toUpperCase();if(id!=='solo')duetDone(id,0)}}
function ladShow(id){const w=WL[id],cur=w.chain[w.chain.length-1];$('lc_'+id).textContent=w.chain.join(' → ').toUpperCase();
 $('lw_'+id).innerHTML=cur.split('').map((ch,i)=>`<button class="ltile ${w.pos===i?'sel':''}" onclick="WL['${id}'].pos=${i};ladShow('${id}')">${ch.toUpperCase()}</button>`).join('')}
async function ladKey(id,ch){const w=WL[id];if(!w||w.done)return;if(w.pos==null){$('lfb_'+id).textContent='Tap a letter in the word first.';return}const d=await gdata(),cur=w.chain[w.chain.length-1],nw=cur.slice(0,w.pos)+ch+cur.slice(w.pos+1);
 if(nw===cur)return;const S=new Set(cur.length===3?d.words3:d.words4);if(!S.has(nw)){$('lfb_'+id).textContent=`${nw.toUpperCase()} is not in our word list. Try another letter.`;return}
 w.chain.push(nw);ladSay(nw);$('lfb_'+id).textContent='';if(nw===w.L.b){w.done=1;clearInterval(w.tick);const steps=w.chain.length-1,stars=steps<=w.L.par?3:steps<=w.L.par+2?2:1;if(id==='solo')gSave('lad_'+w.L.a+w.L.b,stars);$('lfb_'+id).innerHTML=`${starStr(stars)} ${steps} steps (best ${w.L.par})!`;if(id!=='solo')duetDone(id,stars)}ladShow(id)}
function ladUndo(id){const w=WL[id];if(w&&!w.done&&w.chain.length>1){w.chain.pop();ladShow(id)}}
async function ladSay(w){try{const set=await voiceIndex();if(set.has('w_'+w)){const b=await loadClip('w_'+w);if(b){playClip(b,0,1);return}}}catch(e){}try{speak(w,.9)}catch(e){}}
// ================= Duet =================
async function duetRender(){const kind=GM.dk||'mel';
 $('games').innerHTML=gCard('👫 Duet',`<p>${[['mel','🎹 Melody'],['lad','🪜 Word']].map(([k,n])=>`<button class="${kind===k?'p':''}" onclick="GM.dk='${k}';RENDER.games()">${n}</button>`).join(' ')}</p>
 <p class="soft">One device, two players. The grown-up half is upside down so you can sit facing each other. Same round, harder for the grown-up.</p>
 <div class="duet"><div class="dhalf flip" id="dh_g"></div><div class="dhalf" id="dh_k"></div></div><p><button class="bigbtn p" onclick="duetGo()">▶ Start round</button></p><p id="dres" class="gfb"></p>${gBack}`);
 GM.duet={kid:null,grown:null};if(kind==='mel'){GM.mlvl=GM.mlvl||0;$('dh_k').innerHTML=melPanel('dk',MEL[1],'🧒 Kid');$('dh_g').innerHTML=melPanel('dg',MEL[6],'🧑 Grown-up')}
 else{const d=await gdata(),k=d.ladders.filter(x=>x.tier==='kid'),g=d.ladders.filter(x=>x.tier==='grown');const r=Math.floor(Math.random()*k.length);GM.dpair=[k[r],g[r%g.length]];$('dh_k').innerHTML='<p><b>🧒 Kid</b></p>'+ladPanel('dk',GM.dpair[0]);$('dh_g').innerHTML='<p><b>🧑 Grown-up</b></p>'+ladPanel('dg',GM.dpair[1]);ladStart('dk',GM.dpair[0]);ladStart('dg',GM.dpair[1])}}
function duetGo(){GM.duet={kid:null,grown:null};$('dres').textContent='';if((GM.dk||'mel')==='mel'){const base=melSeq(MEL[1]),c=ac();const hard=[...base,...melSeq(MEL[6]).slice(0,6)];
  MS.dk={seq:base,i:0,err:0,lock:1,L:MEL[1]};MS.dg={seq:hard,i:0,err:0,lock:1,L:MEL[6]};const d1=melPlay('dk',base,c.currentTime+.2),d2=melPlay('dg',hard,c.currentTime+.6+d1);
  $('mfb_dk').textContent='Listen…';$('mfb_dg').textContent='Wait, then listen…';later(()=>{MS.dk.lock=0;$('mfb_dk').textContent='Your turn!'},(d1+.4)*1000);later(()=>{MS.dg.lock=0;$('mfb_dg').textContent='Your turn!'},(d1+d2+.9)*1000)}
 else{ladStart('dk',GM.dpair[0]);ladStart('dg',GM.dpair[1])}}
function duetDone(id,stars){GM.duet[id==='dk'?'kid':'grown']=stars;const d=GM.duet;if(d.kid!=null&&d.grown!=null)$('dres').innerHTML=`🧒 ${starStr(d.kid)} · 🧑 ${starStr(d.grown)} — ${d.kid>d.grown?'Kid wins! 🎉':d.kid<d.grown?'Grown-up wins this time!':'A tie! 🤝'}`}
// ================= Hub =================
RENDER.games=function(){if(GM.v==='rx')return rxRender();if(GM.v==='mel')return melRender();if(GM.v==='lad')return ladRender();if(GM.v==='duet')return duetRender();const st=gStars(),n=Object.values(st).reduce((a,b)=>a+b,0);
 $('games').innerHTML=gCard('🎮 Games',`<p>Music and word games for kids and grown-ups. Stars stay on this device.</p><div class="hubgrid">
 <button class="hubtile" onclick="GM.v='rx';GM.lvl=0;GM.cr=null;GM.custom=null;GM.played=0;RENDER.games()"><span>🥁</span>Rhythm Echo<small>12 levels + call & response</small></button>
 <button class="hubtile" onclick="GM.v='mel';RENDER.games()"><span>🎹</span>Melody Echo<small>3 to 12 notes</small></button>
 <button class="hubtile" onclick="GM.v='lad';RENDER.games()"><span>🪜</span>Word Ladder<small>CAT → DOG</small></button>
 <button class="hubtile" onclick="GM.v='duet';RENDER.games()"><span>👫</span>Duet<small>Kid vs grown-up</small></button></div><p class="soft">Your stars: ${n} ⭐</p><p><button class="bigbtn" onclick="show('hub')">⬅ Home</button></p>`)};
{const sh=show;show=function(id){if(id!=='games')gStop();return sh.apply(this,arguments)}}
{const rh=renderHub;renderHub=function(){rh();const g=$('hub').querySelector('.hubgrid');if(g&&!g.querySelector('[data-games]'))g.insertAdjacentHTML('beforeend',`<button class="hubtile" data-games onclick="GM.v=null;show('games')"><span>🎮</span>Games<small>Rhythm, melody, words</small></button>`)};RENDER.hub=renderHub}
{const ra=RENDER.arcade;RENDER.arcade=function(){ra();if(!AR.v){const g=$('arcade').querySelector('.hubgrid');if(g)g.insertAdjacentHTML('beforeend',`<button class="hubtile" onclick="GM.v=null;show('games')"><span>🎮</span>Games<small>Grown-up tiers inside</small></button>`)}}}
document.head.insertAdjacentHTML('beforeend',`<style>
.gcard{background:#0b0d1c;color:#f6efe0;text-align:center}.gcard button{color:inherit}.gcard .soft{color:#bfb8a8}
.glv{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px 0}.glv button{background:#1b1f38;border-color:#2e3560;min-width:96px}.glv button.p{background:#ffd97a;color:#1b1f38}
.gcard p>button{background:#1b1f38;border-color:#2e3560}.gcard p>button.p,.gcard .bigbtn.p{background:#ffd97a;color:#1b1f38}
.gpads{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:10px 0;touch-action:manipulation}
.gpad{width:min(30vw,150px);height:min(30vw,150px);border-radius:24px;font-size:2.6rem;background:#1b1f38;border:3px solid var(--c);display:flex;flex-direction:column;align-items:center;justify-content:center;user-select:none;-webkit-user-select:none}
.gpad small{font-size:.8rem;opacity:.7}.gpad.hit{background:var(--c);transform:scale(.95)}
.gfb{min-height:1.6em;font-size:1.15rem}
.mkeys{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;touch-action:manipulation;margin:8px 0}.mkey{width:min(16vw,84px);height:min(30vw,150px);border-radius:16px;background:var(--c);opacity:.55;border:2px solid #0006;padding:0}
.mkey.sharp{width:min(11vw,56px);height:min(22vw,110px);opacity:.5}.mkey.lit{opacity:1;box-shadow:0 0 24px var(--c);transform:scale(1.05)}
.shake{animation:gshake .3s}@keyframes gshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
.ltiles{display:flex;gap:8px;justify-content:center;margin:8px 0}.ltile{font-size:2.2rem;width:64px;height:72px;background:#1b1f38;border:2px solid #3a4170;border-radius:12px}.ltile.sel{border-color:#ffd97a;box-shadow:0 0 12px #ffd97a}
.lkeys{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:560px;margin:0 auto}.lkeys button{width:38px;height:42px;padding:0;background:#1b1f38;border-color:#2e3560;font-size:1.1rem}
.lchain{font-size:1.1rem;letter-spacing:.05em;color:#ffd97a;min-height:1.4em}
.duet{display:flex;flex-direction:column;gap:10px}.dhalf{border:2px dashed #3a4170;border-radius:16px;padding:8px}.dhalf.flip{transform:rotate(180deg)}
@media (min-width:900px){.duet{flex-direction:row}.duet .dhalf{flex:1}.dhalf.flip{transform:none}}
</style>`);
try{if(!$('hub').classList.contains('hidden'))RENDER.hub()}catch(e){}
