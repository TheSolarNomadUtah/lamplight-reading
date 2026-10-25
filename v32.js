// v32: one Games hub for every age (no separate arcade), clearer Rhythm Echo, more Melody Echo (long tunes, kid songs, rhythm + pitch, free play),
// Syllable Sprint levels with best times, more Word Ladders, more Star songs (transit view, compare, kid words), bigger Echo sound board.
// Zero data: everything stays in this browser.
PKEYS.push('lamp_sprint','lamp_melodies');
const ageB=a=>`<b class="agebadge">${gT('Ages {n}+',{n:gNum(a)})}</b>`;
// ================= One Games hub =================
const GHUB=[
 ['rx','🥁','Rhythm Echo','Listen, then tap it back',4,"GM.v='rx';GM.lvl=0;GM.cr=null;GM.custom=null;GM.played=0;RENDER.games()"],
 ['mel','🎹','Melody Echo','Tunes, songs and free play',4,"GM.v='mel';RENDER.games()"],
 ['duet','👫','Duet','Kid vs grown-up',5,"GM.v='duet';RENDER.games()"],
 ['lad','🪜','Word Ladder','CAT → DOG',6,"GM.v='lad';RENDER.games()"],
 ['syl','⚡','Syllable Sprint','Count the beats, beat the clock',6,"AR.v='syl';SP.st=null;show('arcade')"],
 ['star','✨','Star songs','Real starlight from Kepler',6,"show('starsongs')"],
 ['scr','🔀','Word Scramble','Unscramble in 60 seconds',8,"AR.v='scr';show('arcade');arScrStart()"],
 ['cym','🌀','Cymatica','Breathe with sound shapes',10,"show('cymatica')"]];
{const rg=RENDER.games;RENDER.games=function(){if(GM.v==='comp')return compRender();if(GM.v)return rg();const st=gStars(),n=Object.values(st).reduce((a,b)=>a+b,0);
 $('games').innerHTML=gCard('🎮 '+gT('Games'),`<p>${gT('Music and word games for every age. Stars and best times stay on this device.')}</p><div class="hubgrid">${GHUB.map(([k,e,t,sub,a,on])=>`<button class="hubtile" data-g="${k}" onclick="${on}"><span>${e}</span>${gT(t)}<small>${gT(sub)}</small>${ageB(a)}</button>`).join('')}</div>
 <p class="soft">${gT('Your stars: {n} ⭐',{n:gNum(n)})}</p><p><button class="bigbtn" onclick="show('hub')">⬅ ${gT('Home')}</button></p>`)}}
// The arcade is no longer a separate place: its menu sends you to Games; Scramble and Sprint still play there.
{const ra=RENDER.arcade;RENDER.arcade=function(){if(!AR.v){GM.v=null;return show('games')}if(AR.v==='syl')return spRender();ra();$('arcade').querySelectorAll('button').forEach(b=>{if(/RENDER\.arcade\(\)/.test(b.getAttribute('onclick')||'')&&/AR\.v=null/.test(b.getAttribute('onclick'))){b.setAttribute('onclick',"AR.v=null;GM.v=null;show('games')");b.textContent='⬅ '+gT('Games')}})}}
{const sh=show;show=function(id){if(id==='arcade'&&!AR.v){GM.v=null;id='games'}return sh(id)}}
{const back=(sec,stop)=>{const b=[...$(sec).querySelectorAll('button.bigbtn')].pop();if(b){b.setAttribute('onclick',stop+";GM.v=null;show('games')");b.textContent='⬅ '+gT('Games')}};
 const rs=RENDER.starsongs;RENDER.starsongs=function(){rs();back('starsongs','sgStop()')};const rc=RENDER.cymatica;RENDER.cymatica=function(){rc();back('cymatica','cmStop()')}}

// ================= Rhythm Echo, clearer =================
const RXEASY=['k1','k2','k3','k4'];
function rxOv(t,big){const o=$('rxov');if(!o)return;o.innerHTML=t||'';o.className=t?(big?'on big':'on'):''}
rxRender=function(){const L=GM.custom||rxLvl(),bpm=GM.custom?GM.custom.bpm:(GM.bpm||L.bpm),st=gStars(),cr=GM.cr,call=cr&&cr.turn==='call';
 const lv=GM.custom||cr?'':`<div class="glv">${RXL.map((x,i)=>`<button class="${i===GM.lvl?'p':''}" onclick="GM.lvl=${i};GM.bpm=null;GM.played=0;RENDER.games()">${x.g?'👪 ':''}${gT('Level {n}',{n:gNum(i+1)})}<br><small class="lvn">${gT(x.n)}</small><small>${starStr(st['rx_'+x.id]||0)}</small></button>`).join('')}</div>
  <p>${gT('Speed:')} ${BPMS.map(b=>`<button class="${bpm===b?'p':''}" onclick="GM.bpm=${b};RENDER.games()">${b}</button>`).join(' ')} BPM</p>`;
 const info=GM.custom||cr?'':`<p class="soft">${L.g?gT('Grown-up tier')+' · ':''}${gT('{n} beats',{n:gNum(L.len)})} · ${gT('{n} hits',{n:gNum(L.hits.length)})} · ${gT('window ±{n} ms',{n:gNum(L.win||180)})}${L.once?' · '+gT('plays once, no replay'):''}${L.swing?' · '+gT('swing'):''}</p>`;
 const crHelp=cr?`<p class="soft">${gT('How it works: one player taps a new pattern on the pads (the call). The other player listens and taps it back (the response). Then you swap. A good echo earns stars.')}</p>`:'';
 $('games').innerHTML=gCard(cr?`🗣️ ${gT('Call & response')} · ${gT(cr.who+(cr.turn==='call'?' makes the call':' answers'))}`:'🥁 '+gT('Rhythm Echo'),`<p class="howto">${gT('Listen to the drum, then tap it back.')}</p>${lv}${info}${crHelp}${cr?`<p id="crscore">${crScore()}</p>`:''}
 <div class="rxwrap"><canvas id="grc" width="720" height="150" style="width:100%;max-width:720px"></canvas><div id="rxov"></div></div>
 <p class="soft rxleg">${call?gT('Tap any pads to make your call. Stop for 2 seconds to finish.'):gT('Gold dots show the pattern. After your turn: green ring = on time, red ring = off time or an extra tap.')}</p>
 <p>${call?`<button class="bigbtn p" onclick="crRecord()">⏺ ${gT('Make a call')}</button>`:`<button class="bigbtn p" id="rxplay" onclick="rxPlay()" ${L.once&&GM.played?'disabled':''}>▶ ${gT(L.once&&GM.played?'Played once':'Hear pattern')}</button>`}</p>
 <div class="gpads">${(call?['kick','clap','hat']:rxPads(L)).map((p,i)=>`<button class="gpad" data-pad="${p}" style="--c:${PADS[p][1]}" onpointerdown="rxTap('${p}');event.preventDefault()">${PADS[p][0]}<small>${gT(PADS[p][2])} · ${'FJK'[i]}</small></button>`).join('')}</div>
 <p id="grfb" class="gfb"></p>${cr?'':`<p><button onclick="crStart()">🗣️ ${gT('Call & response (kid + grown-up)')}</button></p>`}${gBack}`);rxDraw()};
rxDraw=function(taps,lit){const cv=$('grc');if(!cv)return;const x=cv.getContext('2d'),W=cv.width,call=GM.cr&&GM.cr.turn==='call',L=call?{len:8,hits:[]}:(GM.custom||rxLvl()),pads=call?['kick','clap','hat']:rxPads(L),lh=130/pads.length,X0=70,sx=t=>X0+t*(W-X0-20)/L.len;
 x.fillStyle='#14182c';x.fillRect(0,0,W,150);for(let b=0;b<=L.len;b++){x.fillStyle=b%4?'#262c48':'#3a4170';x.fillRect(sx(b),8,2,134)}
 x.font='15px system-ui';x.textBaseline='middle';pads.forEach((p,i)=>{x.fillStyle=PADS[p][1];x.fillText(gT(PADS[p][2]),8,10+lh*(i+.5))});
 if(!(L.once&&GM.played&&!taps&&lit==null))L.hits.forEach(([t,p],i)=>{const y=10+lh*(pads.indexOf(p)+.4),on=lit===i;x.fillStyle=PADS[p][1];x.globalAlpha=lit==null||on?.95:.35;if(on){x.shadowColor=PADS[p][1];x.shadowBlur=22}x.beginPath();x.arc(sx(t),y,on?13:8,0,7);x.fill();x.shadowBlur=0});
 x.globalAlpha=1;(taps||[]).forEach(([t,p,ok])=>{const y=10+lh*(pads.indexOf(p)+.75);x.strokeStyle=ok?'#9dff9d':'#ff8a8a';x.lineWidth=3;x.beginPath();x.arc(sx(t),y,6,0,7);x.stroke()})};
rxPlay=function(){const L=GM.custom||rxLvl();if(L.once&&GM.played)return;const c=ac();if(!c)return;gStop();if(L.once){const p=$('rxplay');if(p){p.disabled=true;p.textContent='▶ '+gT('Played once')}}
 const bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),b=60/bpm,t0=c.currentTime+.15;for(let i=0;i<4;i++)drumHit('hat',t0+i*b);
 L.hits.forEach(([t,p],i)=>{padSound(p,t0+(4+t)*b);later(()=>rxDraw(null,i),((4+t)*b+.15)*1000)});GM.played=1;GM.taps=[];GM.t0=null;GM.listen=1;GM.turn=0;
 rxOv('👂 '+gT('Listen…'));$('grfb').textContent='';const end=(4+L.len)*b+.25;
 // 3-2-1 count-in with sound, then "Your turn!"
 [3,2,1].forEach((n,k)=>{later(()=>{rxOv(gNum(n),1);const cc=ac();note(k<2?76:84,cc.currentTime,.12,'bells',.25)},(end+k*.6)*1000)});
 later(()=>{GM.listen=0;GM.turn=1;rxOv(gT('Your turn!'),1);rxDraw(L.once?[]:null);later(()=>{if(GM.turn&&!(GM.taps||[]).length)rxOv(gT('{n} hits left',{n:gNum(L.hits.length)}))},900);
  if(GM.custom||!RXEASY.includes(L.id)){clearTimeout(GM.rt);GM.rt=setTimeout(()=>{if(!(GM.taps||[]).length){rxOv('');$('grfb').textContent=gT('Tap the pads when you are ready, or press ▶ to hear it again.')}},9000)}},(end+1.8)*1000)};
rxTap=function(p){if(GM.rec)return crTap(p);padSound(p);const el=document.querySelector(`.gpad[data-pad="${p}"]`);if(el){el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),110)}
 if(GM.listen||!GM.played)return;const L=GM.custom||rxLvl(),bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),now=performance.now();
 if(GM.t0==null)GM.t0=now-L.hits[0][0]*60000/bpm;GM.taps=GM.taps||[];GM.taps.push([(now-GM.t0)/(60000/bpm),p]);rxDraw(GM.taps.map(t=>[t[0],t[1],1]));
 const left=L.hits.length-GM.taps.length;rxOv(left>0?gT('{n} hits left',{n:gNum(left)}):'');clearTimeout(GM.rt);
 if(left<=0){GM.rt=setTimeout(rxJudge,450);return}
 const easy=!GM.custom&&RXEASY.includes(L.id);GM.rt=setTimeout(rxJudge,easy?7000:GM.custom?3500:Math.max(2500,2.2*60000/bpm))};
rxJudge=function(){clearTimeout(GM.rt);GM.turn=0;rxOv('');const L=GM.custom||rxLvl(),bpm=GM.custom?L.bpm:(GM.bpm||L.bpm),ms=60000/bpm,win=GM.custom?260:(L.win||180),taps=(GM.taps||[]).map(t=>({t:t[0],p:t[1],used:0}));if(!taps.length)return;
 if(GM.custom&&taps.length===L.hits.length&&taps.length>1){const a0=taps[0].t,a1=taps[taps.length-1].t,h0=L.hits[0][0],h1=L.hits[L.hits.length-1][0];if(a1>a0){const k=(h1-h0)/(a1-a0);if(k>.75&&k<1.33)taps.forEach(x=>x.t=h0+(x.t-a0)*k)}}
 let hit=0,err=0;L.hits.forEach(([t,p])=>{let best=null;taps.forEach(x=>{if(!x.used&&x.p===p){const d=Math.abs(x.t-t)*ms;if(d<=win&&(!best||d<best.d))best={x,d}}});if(best){best.x.used=1;hit++;err+=best.d}});
 const N=L.hits.length,extra=taps.filter(x=>!x.used).length,score=Math.max(0,Math.round(100*hit/N-extra*5)),avg=hit?Math.round(err/hit):0;
 const stars=GM.custom?(score>=100?3:score>=80?2:score>=60?1:0):score>=95&&avg<=win*.5?3:score>=80?2:score>=60?1:0;rxDraw(taps.map(x=>[x.t,x.p,x.used]));GM.taps=[];GM.t0=null;
 const words=hit===N&&!extra?gT('All {n} on time! Great job!',{n:gNum(N)}):gT('{a} of {b} on time!',{a:gNum(hit),b:gNum(N)})+(extra?' '+(extra===1?gT('1 extra tap.'):gT('{n} extra taps.',{n:gNum(extra)})):'')+(stars<3?' '+gT('Try again'):'');
 const tight=hit&&stars>=2?` <span class="soft">(${gT('about {n} ms off',{n:gNum(avg)})})</span>`:'';
 const cr=GM.cr;if(cr){if(cr.turn==='answer'){cr[cr.ans]+=stars;cr.turn='call';const nx=cr.ans;cr.who=nx==='kid'?'Kid':'Grown-up';cr.callerKey=nx;GM.custom=null;const sc=$('crscore');if(sc)sc.innerHTML=crScore();$('grfb').innerHTML=`${starStr(stars)} ${words}${tight} ${gT(cr.who==='Kid'?'Now Kid makes the call.':'Now Grown-up makes the call.')}`;setTimeout(rxRender,2200)}return}
 if(stars)gSave('rx_'+L.id,stars);rxStarRow();$('grfb').innerHTML=`${starStr(stars)} ${words}${tight}${stars>=2&&GM.lvl<RXL.length-1?` <button class="p" onclick="GM.lvl++;GM.bpm=null;GM.played=0;RENDER.games()">${gT('Next ▶')}</button>`:''}`};
crStart=function(){GM.cr={turn:'call',who:'Kid',callerKey:'kid',kid:0,grown:0};GM.custom=null;GM.played=0;GM.taps=[];rxRender()};
{const cd=crDone;crDone=function(){cd();if(GM.custom)rxDraw()}}
{const cr0=crRecord;crRecord=function(){cr0();$('grfb').textContent=gT('Tap a pattern (up to 8 beats). Stop for 2 seconds to finish.')}}
gRows=function(pre,ids){const st=gStars();document.querySelectorAll('#games .glv button').forEach((b,i)=>{const s=[...b.querySelectorAll('small')].pop();if(s&&ids[i]!=null)s.textContent=starStr(st[pre+ids[i]]||0)})};

// ================= Melody Echo: long tunes, kid songs, rhythm + pitch, free play =================
// Public-domain songs, in C (MIDI notes) with beat lengths.
const KSONGS={
 hcb:['Hot Cross Buns',[64,62,60,64,62,60,60,60,60,60,62,62,62,62,64,62,60],[1,1,2,1,1,2,.5,.5,.5,.5,.5,.5,.5,.5,1,1,2]],
 mary:['Mary Had a Little Lamb',[64,62,60,62,64,64,64,62,62,62,64,67,67],[1,1,1,1,1,1,2,1,1,2,1,1,2]],
 twin:['Twinkle, Twinkle, Little Star',[60,60,67,67,69,69,67,65,65,64,64,62,62,60],[1,1,1,1,1,1,2,1,1,1,1,1,1,2]],
 frere:['Frère Jacques',[60,62,64,60,60,62,64,60,64,65,67,64,65,67],[1,1,1,1,1,1,1,1,1,1,2,1,1,2]],
 lon:['London Bridge',[67,69,67,65,64,65,67,62,64,65,64,65,67],[1.5,.5,1,1,1,1,2,1,1,2,1,1,2]],
 ode:['Ode to Joy',[64,64,65,67,67,65,64,62,60,60,62,64,64,62,62],[1,1,1,1,1,1,1,1,1,1,1,1,1.5,.5,2]]};
MEL.push({id:'g5',n:'14 notes',len:14,g:1,chrom:1},{id:'g6',n:'16 notes',len:16,g:1,chrom:1});
Object.entries(KSONGS).forEach(([k,[n,s,d]])=>MEL.push({id:'s_'+k,n,song:s,durs:d,len:s.length,chrom:1,kid:1}));
['mary','twin','ode'].forEach(k=>MEL.push({id:'r_'+k,n:'Rhythm + pitch: '+KSONGS[k][0],song:KSONGS[k][1],durs:KSONGS[k][2],len:KSONGS[k][1].length,chrom:1,rp:1,g:k==='ode'?1:0}));
{const ms=melSeq;melSeq=function(L,seed){return L.song?L.song.slice():ms(L,seed)}}
const MBEAT=.42;
melPlay=function(id,seq,t0){const c=ac(),L=(MS[id]||{}).L||{};let t=0;seq.forEach((m,i)=>{const d=L.durs?L.durs[i]*MBEAT:.55;note(m,t0+t,Math.max(.3,d*.9),'bells',.3);later(()=>melLight(id,m),(t0-c.currentTime+t)*1000);t+=d});return t};
{const mt=melTap;melTap=function(id,m){if(id==='comp')return compTap(m);const s=MS[id];
 if(s&&!s.lock&&!s.done&&s.L.rp&&m===s.seq[s.i]){const now=performance.now();if(s.i>0){const exp=s.L.durs[s.i-1]*MBEAT*1000,dt=now-s.last;if(Math.abs(dt-exp)>Math.max(.4*exp,160)){note(m,ac().currentTime,.35,'bells',.3);melLight(id,m);s.err++;s.last=now;
   if(s.err>=3){s.done=1;$('mfb_'+id).innerHTML=`${starStr(0)} ${gT('3 mistakes. Try again!')}`}else $('mfb_'+id).textContent=gT('Right note, wrong timing ({e}/3). Keep the beat!',{e:gNum(s.err)});s.i++;if(s.i===s.seq.length){s.done=1;const st=s.err===0?3:s.err===1?2:1;if(id==='solo'){gSave('mel_'+s.L.id,st);melStarRow()}$('mfb_'+id).innerHTML=`${starStr(st)} ${gT('You got it!')}`}return}}s.last=now}
 return mt(id,m)}}
melRender=function(){const st=gStars(),L=MEL[GM.mlvl||0],grp=[['Classic','',x=>!x.song&&!x.rp],['Kid songs','',x=>x.song&&!x.rp],['Rhythm + pitch','',x=>x.rp]];
 const btn=(x)=>{const i=MEL.indexOf(x);return `<button class="${i===(GM.mlvl||0)?'p':''}" onclick="GM.mlvl=${i};RENDER.games()">${x.g?'👪 ':''}${gT(x.n)}<br><small>${starStr(st['mel_'+x.id]||0)}</small></button>`};
 $('games').innerHTML=gCard('🎹 '+gT('Melody Echo'),`${grp.map(([g,_,f])=>`<h3 class="mgh">${gT(g)}</h3><div class="glv">${MEL.filter(f).map(btn).join('')}</div>`).join('')}
 <p><button onclick="GM.v='comp';RENDER.games()">🎼 ${gT('Free play & compose')}</button></p>
 <p class="soft">${L.rp?gT('Play the same notes with the same rhythm: long notes wait longer. 3 mistakes ends the round.'):L.song?gT('Listen to the song, then play it back. 3 mistakes ends the round.'):gT('Watch and listen, then play the same notes back. 3 mistakes ends the round.')}</p>${melPanel('solo',L)}<p><button class="bigbtn p" onclick="melStart('solo')">▶ ${gT('Play tune')}</button></p>${gBack}`)};
// Free play & compose: tap the piano, record a tune, play it back, keep up to 8 on this device.
const COMP={rec:null};const compList=()=>safeJSON(LS.get('lamp_melodies'),[]);
function compTap(m){note(m,ac().currentTime,.5,COMP.inst||'bells',.3);melLight('comp',m);if(COMP.rec){const now=performance.now();COMP.rec.push([m,COMP.t0==null?0:now-COMP.t0]);if(COMP.t0==null)COMP.t0=now;const e=$('compn');if(e)e.textContent=gT('{n} notes',{n:gNum(COMP.rec.length)})}}
function compPlay(seq){gStop();const c=ac();if(!c||!seq||!seq.length)return;const t0=c.currentTime+.15;seq.forEach(([m,ms])=>{note(m,t0+ms/1000,.5,COMP.inst||'bells',.3);later(()=>melLight('comp',m),ms+150)})}
function compRec(){if(COMP.rec){COMP.last=COMP.rec;COMP.rec=null;COMP.t0=null;return compRender()}COMP.rec=[];COMP.t0=null;compRender()}
function compSave(){const s=COMP.last;if(!s||!s.length)return;const L=compList();L.unshift({n:gT('Tune {n}',{n:gNum(L.length+1)}),s});LS.set('lamp_melodies',JSON.stringify(L.slice(0,8)));compRender()}
function compDel(i){const L=compList();L.splice(i,1);LS.set('lamp_melodies',JSON.stringify(L));compRender()}
function compRender(){const L=compList(),P={chrom:1};const panel=melPanel('comp',P,'');
 $('games').innerHTML=gCard('🎼 '+gT('Free play & compose'),`<p>${gT('Play anything you like. Press Record, play a tune, then press Stop. Saved tunes stay on this device.')}</p>${panel}
 <p>${[['bells','🔔'],['marimba','🪵'],['piano','🎹'],['glow','✨']].map(([k,e])=>`<button class="${(COMP.inst||'bells')===k?'p':''}" onclick="COMP.inst='${k}';compRender()">${e}</button>`).join(' ')}</p>
 <p><button class="bigbtn ${COMP.rec?'':'p'}" onclick="compRec()">${COMP.rec?'⏹ '+gT('Stop'):'⏺ '+gT('Record')}</button> <span id="compn" class="soft">${COMP.rec?gT('Recording…'):''}</span>
 ${COMP.last&&!COMP.rec?`<button onclick="compPlay(COMP.last)">▶ ${gT('Play')}</button> <button onclick="compSave()">💾 ${gT('Save')}</button>`:''}</p>
 ${L.length?`<h3>${gT('My tunes')}</h3>`+L.map((t,i)=>`<p><button onclick="compPlay(compList()[${i}].s)">▶ ${esc(t.n)}</button> <span class="soft">${gT('{n} notes',{n:gNum(t.s.length)})}</span> <button onclick="compDel(${i})" aria-label="${gT('Delete')}">🗑️</button></p>`).join(''):''}
 <p><button class="bigbtn" onclick="gStop();GM.v='mel';RENDER.games()">⬅ ${gT('Melody Echo')}</button></p>`)}

// ================= Syllable Sprint: levels and best times =================
const SPW=['cat','dog','sun','moon','fish','tree','book','star','frog','cake','ap|ple','ti|ger','pan|da','pen|cil','ro|bot','mon|key','pic|nic','rab|bit','bas|ket','win|dow','ba|na|na','din|o|saur','el|e|phant','to|ma|to','but|ter|fly','kan|ga|roo','oc|to|pus','straw|ber|ry','um|brel|la','com|put|er','wa|ter|mel|on','cat|er|pil|lar','al|li|ga|tor','cal|cu|la|tor','tel|e|vi|sion','av|o|ca|do','mac|a|ro|ni','hel|i|cop|ter','har|mon|i|ca','ar|ma|dil|lo','hip|po|pot|a|mus','u|ni|ver|si|ty','vo|cab|u|lar|y','cu|ri|os|i|ty','re|frig|er|a|tor','tri|ce|ra|tops','ab|bre|vi|a|tion','im|ag|i|na|tion','o|ri|gin|al|i|ty'];
const SPL={easy:['Easy',2,8],medium:['Medium',3,10],hard:['Hard',4,12],expert:['Expert',5,15]};
const SP={lv:'easy'};const spBest=()=>safeJSON(LS.get('lamp_sprint'),{});
function spPool(){const mx=SPL[SP.lv][1];return SPW.filter(w=>w.split('|').length<=mx)}
function spStart(){SP.st={i:0,t0:performance.now(),words:[]};const p=spPool();for(let i=0;i<SPL[SP.lv][2];i++){let w;do{w=p[Math.floor(Math.random()*p.length)]}while(SP.st.words.length&&w===SP.st.words[SP.st.words.length-1]);SP.st.words.push(w)}clearInterval(SP.tk);SP.tk=setInterval(spTick,100);spRender()}
function spTick(){const e=$('sptime');if(!e||!SP.st||SP.st.done){clearInterval(SP.tk);return}e.textContent=gT('{n} s',{n:gNum((performance.now()-SP.st.t0)/1000,1)})}
function spAns(n){const s=SP.st;if(!s||s.done)return;const w=s.words[s.i],k=w.split('|').length;
 if(n!==k){s.done=1;clearInterval(SP.tk);$('spfb').innerHTML=gT('It was {n}: {w}. Back to the start!',{n:gNum(k),w:'<b>'+w.split('|').join(' · ')+'</b>'});setTimeout(()=>{if(AR.v==='syl'&&SP.st===s)spStart()},1700);return}
 s.i++;if(s.i>=s.words.length){s.done=1;clearInterval(SP.tk);const t=(performance.now()-s.t0)/1000,b=spBest(),rec=!(b[SP.lv]<=t);if(rec){b[SP.lv]=Math.round(t*10)/10;LS.set('lamp_sprint',JSON.stringify(b))}
  try{markDay('music')}catch(e){}spRender();$('spfb').innerHTML=`🏁 ${gT('Done in {t} seconds!',{t:gNum(t,1)})} ${rec?'🏆 '+gT('New best time!'):''}`;return}spRender()}
function spRender(){const s=SP.st,b=spBest(),el=$('arcade');
 el.innerHTML=`<div class="card big" style="text-align:center;background:#0b0d1c;color:#f6efe0"><h2>⚡ ${gT('Syllable Sprint')}</h2><p>${gT('How many beats (syllables) in each word? Tap the number. One miss sends you back to the start.')}</p>
 <div class="glv">${Object.entries(SPL).map(([k,[n,mx,c]])=>`<button class="${SP.lv===k?'p':''}" onclick="SP.lv='${k}';SP.st=null;spRender()">${gT(n)}<br><small>${gT('{n} words · up to {m} beats',{n:gNum(c),m:gNum(mx)})}</small><small>${b[k]!=null?'🏆 '+gT('{t} s',{t:gNum(b[k],1)}):gT('No best time yet')}</small></button>`).join('')}</div>
 ${s&&!s.done?`<p><b id="sptime">0 s</b> · ${gT('Word {i} of {n}',{i:gNum(s.i+1),n:gNum(s.words.length)})}</p><p class="lsbig" style="font-size:clamp(2rem,8vw,3.5rem)">${s.words[s.i].replace(/\|/g,'')}</p>
 <p>${[1,2,3,4,5].map(n=>`<button class="bigbtn" onclick="spAns(${n})">${gNum(n)}</button>`).join(' ')}</p>`:`<p><button class="bigbtn p" onclick="spStart()">▶ ${gT('Start')}</button></p>`}
 <p id="spfb" style="min-height:1.5em"></p><p><button class="bigbtn" onclick="clearInterval(SP.tk);AR.v=null;GM.v=null;show('games')">⬅ ${gT('Games')}</button></p></div>`}

// ================= Star songs: more stars, transit view, compare, kid words =================
SG.view=SG.view||'curve';SG.cmp=SG.cmp||[0,3];
const SGKIND={transit:['🪐','Planet dip'],binary:['👯','Eclipsing stars'],cepheid:['💓','Pulsing star'],rrlyrae:['💗','Fast pulsing star']};
sgDraw=function(){const cv=$('sgc');if(!cv)return;const x=cv.getContext('2d'),W=cv.width,H=cv.height;x.fillStyle='#050713';x.fillRect(0,0,W,H);
 if(SG.view==='compare')return sgDrawCmp(x,W,H);const s=SG.s;if(!s)return;const n=SG.n,N=n.length,p=Math.min(N-1,SG.pos|0),v=n[p];
 if(SG.view==='transit'&&s.fold){// star disk with the planet crossing; planet size from the real dip depth (radius ratio = √depth)
  const cx=W*.3,cy=H*.48,R=H*.36,rp=Math.max(4,R*Math.sqrt(s.depth)),g=x.createRadialGradient(cx,cy,0,cx,cy,R);g.addColorStop(0,'#fff6d0');g.addColorStop(.8,'#ffcf6b');g.addColorStop(1,'#e08a2a');
  x.shadowColor='#ffcf6b';x.shadowBlur=40;x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,7);x.fill();x.shadowBlur=0;const px=cx-R*1.4+(p/(N-1))*R*2.8;x.fillStyle='#050713';x.beginPath();x.arc(px,cy+R*.15,rp,0,7);x.fill();
  const L=W*.58,Rr=W-16,T=30,B=H-36;x.strokeStyle='rgba(255,255,255,.18)';x.strokeRect(L,T,Rr-L,B-T);x.strokeStyle='#ffd54f';x.lineWidth=2;x.beginPath();n.forEach((y,i)=>{const X=L+i/(N-1)*(Rr-L),Y=B-y*(B-T);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
  x.fillStyle='#7fe3ff';x.beginPath();x.arc(L+p/(N-1)*(Rr-L),B-v*(B-T),6,0,7);x.fill();x.fillStyle='#bfb8a8';x.font='14px system-ui';x.fillText(gT('Dip: {p} of the light',{p:gPct(s.depth,2)}),L+4,H-12);return}
 const cx=W*.2,cy=H*.45,r=30+v*40,g=x.createRadialGradient(cx,cy,0,cx,cy,r*2.6);g.addColorStop(0,`hsla(${s.kind==='binary'?200:45},100%,${70+v*25}%,1)`);g.addColorStop(.35,`hsla(${s.kind==='binary'?210:35},100%,60%,${.35+v*.5})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.beginPath();x.arc(cx,cy,r*2.6,0,7);x.fill();
 const L=W*.38,R=W-16,T=24,B=H-30;x.strokeStyle='rgba(255,255,255,.18)';x.strokeRect(L,T,R-L,B-T);x.lineWidth=2;x.shadowBlur=10;x.shadowColor='#ffd54f';x.strokeStyle='#ffd54f';x.beginPath();n.forEach((y,i)=>{const X=L+i/(N-1)*(R-L),Y=B-y*(B-T);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();x.shadowBlur=0;
 x.strokeStyle='#7fe3ff';const X=L+p/(N-1)*(R-L);x.beginPath();x.moveTo(X,T);x.lineTo(X,B);x.stroke();x.fillStyle='#7fe3ff';x.beginPath();x.arc(X,B-v*(B-T),6,0,7);x.fill();
 x.fillStyle='#bfb8a8';x.font='14px system-ui';x.fillText(gT('brighter')+' ↑',L+4,T+16);x.fillText(`${gNum(p/(N-1)*s.days,1)} / ${gNum(s.days,1)} ${gT('days')}`,L+4,H-10)};
function sgDrawCmp(x,W,H){const st=SG.all;if(!st)return;const [a,b]=SG.cmp.map(i=>st[i]),rng=s=>{const lo=Math.min(...s.flux),hi=Math.max(...s.flux);return[lo,hi]},A=rng(a),B=rng(b),lo=Math.min(A[0],B[0]),hi=Math.max(A[1],B[1]);
 // Same brightness scale for both, so you can see which one changes more.
 [[a,'#ffd54f',0],[b,'#7fe3ff',1]].forEach(([s,c,k])=>{const T=20+k*(H/2),Bt=T+H/2-36;x.strokeStyle='rgba(255,255,255,.15)';x.strokeRect(12,T,W-24,Bt-T);x.strokeStyle=c;x.lineWidth=2;x.beginPath();s.flux.forEach((y,i)=>{const X=12+i/(s.flux.length-1)*(W-24),Y=Bt-(y-lo)/(hi-lo||1)*(Bt-T);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
  if(SG.cmpOn===k){const p=Math.min(s.flux.length-1,SG.pos|0);x.fillStyle=c;x.beginPath();x.arc(12+p/(s.flux.length-1)*(W-24),Bt-(s.flux[p]-lo)/(hi-lo||1)*(Bt-T),7,0,7);x.fill()}
  x.fillStyle=c;x.font='15px system-ui';x.fillText(s.name,18,T+16)})}
function sgCmpPlay(){if(SG.on){sgStop();SG.cmpOn=null;return sgDraw()}const st=SG.all,run=k=>{const s=st[SG.cmp[k]];SG.s=s;SG.n=sgNorm(s.flux);SG.cmpOn=k;SG.mode='pitch';sgPlayN(()=>{if(k===0&&SG.view==='compare')run(1);else{SG.cmpOn=null;sgDraw()}})};run(0)}
// Play the current curve; Compare mode plays each star in turn. Notes keep the real shape: bigger change = bigger jump in pitch.
function sgPlayN(done){const c=ac();if(!c)return;SG.on=1;SG.pos=0;const N=SG.n.length,dur=(SG.view==='transit'?10000:SG.view==='compare'?9000:24000)/N;const b=$('sgplay');if(b)b.textContent='⏸ '+gT('Stop');
 if(SG.mode==='volume'&&SG.view!=='compare'){const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;lp.connect(c.destination);SG.osc=[220,330,440.5].map((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type=i?'sine':'triangle';o.frequency.value=f;g.gain.value=0;o.connect(g).connect(lp);o.start();o.g=g;return o})}
 let last=-1;const t0=performance.now(),step=()=>{if(!SG.on)return;SG.pos=(performance.now()-t0)/dur;const p=SG.pos|0;if(p>=N){SG.on=0;if(SG.osc){SG.osc.forEach(o=>{try{o.g.gain.setTargetAtTime(0,c.currentTime,.1);o.stop(c.currentTime+.6)}catch(e){}});SG.osc=null}const bb=$('sgplay');if(bb)bb.textContent='▶ '+gT('Play the star');sgDraw();return done&&done()}
  if(p!==last){last=p;const v=SG.n[p];if(SG.mode==='pitch'||SG.view==='compare'){if(p%(SG.view==='transit'?1:2)===0)note(sgNote(v),c.currentTime,.5,'glow',.16)}else SG.osc.forEach((o,i)=>o.g.gain.setTargetAtTime((.02+v*.11)/(i+1),c.currentTime,.05))}
  sgDraw();SG.raf=requestAnimationFrame(step)};step()}
sgPlay=function(){if(SG.on){sgStop();return}if(SG.view==='compare')return sgCmpPlay();sgPlayN()};
RENDER.starsongs=function(){sgStop();sgData().then(d=>{const st=SG.all=d.stars;if(SG.i>=st.length)SG.i=0;let s=SG.s=st[SG.i];if(SG.view==='transit'&&!s.fold)SG.view='curve';SG.n=sgNorm(SG.view==='transit'?s.fold:s.flux);
 const lo=Math.min(...s.flux),hi=Math.max(...s.flux),[a,b]=SG.cmp.map(i=>st[i]),ch=x=>Math.max(...x.flux)-Math.min(...x.flux),ca=ch(a),cb=ch(b),ratio=Math.max(ca,cb)/Math.min(ca,cb);
 $('starsongs').innerHTML=`<div class="card big" style="text-align:center;background:#050713;color:#f6efe0"><h2>✨ ${gT('Star songs')}</h2>
 <p>${gT('A light curve is a picture of how bright a star is over time. These are real measurements from NASA\'s Kepler space telescope. Brighter light plays higher notes.')}</p>
 <p>${[['curve','📈 '+gT('Light curve')],['transit','🪐 '+gT('Planet crossing')],['compare','⚖️ '+gT('Compare two stars')]].map(([k,l])=>`<button class="${SG.view===k?'p':''}" onclick="sgStop();SG.view='${k}';${k==='transit'?"if(!SG.all[SG.i].fold)SG.i=0;":''}RENDER.starsongs()">${l}</button>`).join(' ')}</p>
 ${SG.view==='compare'?`<p>${[0,1].map(k=>`<select onchange="SG.cmp[${k}]=+this.value;RENDER.starsongs()" style="width:auto;border-color:${k?'#7fe3ff':'#ffd54f'}">${st.map((t,i)=>`<option value="${i}" ${SG.cmp[k]===i?'selected':''}>${SGKIND[t.kind][0]} ${esc(t.name)}</option>`).join('')}</select>`).join(' ')}</p>`
  :`<p class="sgpick">${st.map((t,i)=>(SG.view!=='transit'||t.fold)?`<button class="${SG.i===i?'p':''}" onclick="sgStop();SG.i=${i};RENDER.starsongs()">${SGKIND[t.kind][0]} ${esc(t.name)}<br><small>${gT(SGKIND[t.kind][1])}</small></button>`:'').join('')}</p>`}
 <canvas id="sgc" width="720" height="320" style="width:100%;max-width:720px;border-radius:20px"></canvas>
 <div id="sgdesc" class="sgkid">${SG.view==='compare'?`<p><b style="color:#ffd54f">${esc(a.name)}</b>: ${gT('Light changes by {p}',{p:gPct(ca,ca<.05?2:0)})}<br><b style="color:#7fe3ff">${esc(b.name)}</b>: ${gT('Light changes by {p}',{p:gPct(cb,cb<.05?2:0)})}</p><p>${ratio<1.15?gT('They change by about the same amount.'):gT('{s} changes about {n} times more.',{s:esc(ca>cb?a.name:b.name),n:gNum(ratio,ratio<10?1:0)})}</p>`
  :`<p class="big1">${gT(s.kid)}</p><p class="soft" style="color:#bfb8a8"><b>${esc(s.name)}</b> · ${gT(s.desc)} ${SG.view==='transit'?gT('Here many crossings are stacked on top of each other, so the dip is easy to see. The bigger the planet, the deeper the dip.'):gT('Light changes by {p}',{p:gPct(hi-lo,s.kind==='transit'?2:0)})}</p>`}</div>
 <p><button class="bigbtn p" id="sgplay" onclick="sgPlay()">▶ ${gT('Play the star')}</button></p>
 ${SG.view==='curve'?`<p><b>${gT('Brightness drives:')}</b> ${[['pitch','🎵 '+gT('Pitch')],['volume','🔊 '+gT('Volume')]].map(([k,l])=>`<button class="${SG.mode===k?'p':''}" onclick="sgStop();SG.mode='${k}';RENDER.starsongs()">${l}</button>`).join(' ')}</p>`:''}
 <p class="soft" style="color:#bfb8a8;font-size:.85rem">${gT(d.source)} ${SG.view==='compare'?'':`KIC ${s.kic}, ${s.file}.`} ${gT('Bundled in the app, so it works offline.')}</p><button class="bigbtn" onclick="sgStop();GM.v=null;show('games')">⬅ ${gT('Games')}</button></div>`;sgDraw()}).catch(()=>{$('starsongs').innerHTML='<p>'+gT('Could not load the star data.')+'</p>'})};

// ================= Echo sound board: bigger, grouped, labels match what is said =================
// Each button plays existing heart clips in order. sb_<id> is a placeholder for a future QA recording of the whole line;
// if neither exists for a part, a soft tone plays instead of the device voice.
const SBOARD=[['Animals',[['cow','🐮','Cow, moo',['w_cow','w_moo']],['duck','🦆','Duck, quack quack',['w_duck','w_quack','w_quack']],['cat','🐱','Cat, meow',['w_cat','w_meow']],['dog','🐶','Dog, woof woof',['w_dog',null]],['sheep','🐑','Sheep, baa',[null]],['snake','🐍','Snake, sss',[null]],['bee','🐝','Bee, bzz',['w_bee',null]]]],
 ['Letters',[['a','🅰️','A, ah',['n_a','l_a']],['b','🅱️','B, buh',['n_b','l_b']],['m','Ⓜ️','M, mmm',['n_m','l_m']]]],
 ['More',[['clap','👏','Clap, clap, clap',['w_clap','w_clap','w_clap']],['night','🌙','Night night, sleep tight',[null]]]]];
function sbTone(t){const c=ac();if(!c)return;note(72,t,.5,'glow',.14);note(79,t+.12,.45,'glow',.08)}
async function sbTap(el,id){document.querySelectorAll('.sbbtn.say').forEach(x=>x.classList.remove('say'));el.classList.add('say');setTimeout(()=>el.classList.remove('say'),1600);try{musicStop()}catch(e){}
 const it=SBOARD.flatMap(g=>g[1]).find(x=>x[0]===id),set=await voiceIndex('heart').catch(()=>new Set());
 if(set.has('sb_'+id)){const b=await loadClip('sb_'+id,'heart');if(b)return playClip(b,0,1)}
 const c=ac();if(!c)return;let t=c.currentTime+.05;for(const k of it[3]){const b=k&&set.has(k)?await loadClip(k,'heart'):null;if(b){const s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(t);MSRC.push(s);t+=b.duration+.12}else{sbTone(t);t+=.6}}}
{const re=RENDER.echo;RENDER.echo=renderEcho=function(){re();const h=[...document.querySelectorAll('#echo h2')].find(x=>/Sound board|🔊/.test(x.textContent));if(!h)return;const card=h.closest('.card');const grid=card.querySelector('div:last-child');if(!grid)return;
 grid.outerHTML=SBOARD.map(([g,items])=>`<h3 class="sbh">${gT(g)}</h3><div class="sbgrid">${items.map(([id,e,l])=>`<button class="sbbtn" data-sb="${id}" onclick="sbTap(this,'${id}')"><span>${e}</span><small>${gT(l)}</small></button>`).join('')}</div>`).join('')}}

document.head.insertAdjacentHTML('beforeend',`<style>
.agebadge{display:inline-block;margin-top:4px;font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:999px;background:#ffd54f;color:#2a1f12}
.howto{font-size:1.15rem;font-weight:600}.rxwrap{position:relative;max-width:720px;margin:0 auto}#rxov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;font-size:1.4rem;font-weight:700;color:#fff;text-shadow:0 2px 8px #000;opacity:0;transition:opacity .15s}
#rxov.on{opacity:1;background:#0006;border-radius:10px}#rxov.big{font-size:3rem}.lvn{display:block;opacity:.75;font-size:.72rem}.rxleg{font-size:.85rem}
.mgh{margin:.6em 0 .2em;font-size:1rem}.sgkid .big1{font-size:1.25rem;line-height:1.4}.sgpick button{min-width:0}
.sbgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;max-width:720px;margin:0 auto 10px;justify-items:stretch}
.sbbtn{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;border-radius:18px;font-size:1rem;min-height:130px}.sbbtn span{font-size:3.4rem;line-height:1}.sbbtn small{font-size:1rem;font-weight:600}
.sbbtn.say{outline:4px solid #ffd54f;transform:scale(1.04)}.sbh{text-align:center;margin:.8em 0 .4em}
</style>`);
