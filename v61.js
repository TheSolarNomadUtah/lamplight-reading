// v61: six gentle learning games, three levels each. English/Spanish content only.
// All art and questions are bundled. No requests, recordings, voices or new audio files.
// Stars use the existing per-child lamp_games store; sound uses the existing Bedtime Glow synth.
const L61={
 meta:{sb:['Sentence Builder','Put words in order','book',6,'Tap the words to build a sentence.'],rm:['Rhyme Match','Find words that rhyme','rhyme',5,'Which word rhymes with this one?'],lm:['Lamp Math','Count, add and subtract','lamp',4,'Count the glowing lamps.'],pp:['Pattern Puzzles','Find what comes next','pattern',4,'Look for the repeating pattern. What comes next?'],op:['Opposites','Find the opposite','opposite',5,'Which word means the opposite?'],mm:['Memory Match','Find the picture pairs','memory',4,'Turn over two cards. Find every matching pair.']},
 sentence:{
 en:[['I can hop.','We see stars.','The dog runs.','She likes apples.','Birds can fly.','My cat sleeps.'],['The little bird can sing.','We play under the tree.','My red kite flies high.','She reads a funny book.','The warm sun feels nice.','A tiny frog hops away.'],['After lunch we walk to the park.','The sleepy cat rests beside the lamp.','My little brother likes to draw boats.','In the morning the birds sing softly.','We put our books on the shelf.','The kind girl shares her crayons today.']],
 es:[['Yo puedo saltar.','Nosotros vemos estrellas.','El perro corre.','Ella come manzanas.','Los pájaros vuelan.','Mi gato duerme.'],['El pajarito canta muy bien.','Nosotros jugamos bajo el árbol.','Mi cometa roja vuela alto.','Ella lee un libro divertido.','El sol calienta mi cara.','Una rana pequeña salta lejos.'],['Después del almuerzo caminamos hacia el parque.','El gato dormido descansa junto a la lámpara.','A mi hermano pequeño le gusta dibujar barcos.','Por la mañana los pájaros cantan suavemente.','Nosotros ponemos nuestros libros en el estante.','La niña amable comparte sus crayones hoy.']]},
 rhyme:{
 en:[[['cat','hat'],['sun','fun'],['dog','log'],['bee','tree'],['fox','box'],['hen','pen']],[['light','night'],['rain','train'],['boat','goat'],['star','car'],['cake','snake'],['ring','spring']],[['flower','tower'],['moon','spoon'],['bright','flight'],['dream','stream'],['snail','trail'],['sheep','sleep']]],
 es:[[['gato','pato'],['sol','caracol'],['luna','cuna'],['casa','masa'],['ratón','botón'],['pez','nuez']],[['conejo','espejo'],['piscina','cocina'],['pelota','bota'],['corazón','canción'],['sombrero','florero'],['vestido','nido']],[['mariposa','hermosa'],['estrella','bella'],['amarillo','grillo'],['elefante','gigante'],['alegría','sandía'],['ardilla','semilla']]]},
 opposite:{
 en:[[['big','small'],['hot','cold'],['up','down'],['day','night'],['in','out'],['open','closed']],[['empty','full'],['wet','dry'],['fast','slow'],['near','far'],['happy','sad'],['loud','quiet']],[['early','late'],['heavy','light'],['rough','smooth'],['wide','narrow'],['awake','asleep'],['above','below']]],
 es:[[['grande','pequeño'],['caliente','frío'],['arriba','abajo'],['día','noche'],['dentro','fuera'],['abierto','cerrado']],[['vacío','lleno'],['mojado','seco'],['rápido','lento'],['cerca','lejos'],['feliz','triste'],['ruidoso','silencioso']],[['temprano','tarde'],['pesado','ligero'],['áspero','suave'],['ancho','estrecho'],['despierto','dormido'],['encima','debajo']]]},
 shapes:['lamp','sun','moon','leaf','boat','heart','kite','flower'],
 labels:{lamp:'Lamp',sun:'Sun',moon:'Moon',leaf:'Leaf',boat:'Boat',heart:'Heart',kite:'Kite',flower:'Flower'},s:null,timer:0,lastSound:0
};
function l61Mix(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function l61Art(k){const face='<circle cx="35" cy="40" r="2" fill="#463f52"/><circle cx="49" cy="40" r="2" fill="#463f52"/><path d="M37 47 Q42 52 47 47" fill="none" stroke="#463f52" stroke-width="2" stroke-linecap="round"/>';
 const art={lamp:`<ellipse cx="42" cy="70" rx="29" ry="7" fill="#e6b454" opacity=".25"/><path d="M34 16 Q42 4 50 16" fill="none" stroke="#786450" stroke-width="4"/><path d="M27 23 L57 23 63 62 Q42 74 21 62Z" fill="#ffe4a4" stroke="#92724d" stroke-width="3"/><path d="M26 23H58M21 62H63" stroke="#92724d" stroke-width="5"/>${face}`,
 sun:`<g stroke="#dba453" stroke-width="4" stroke-linecap="round"><path d="M42 5V12M42 72V79M5 42H12M72 42H79M16 16L21 21M63 63L68 68M16 68L21 63M63 21L68 16"/></g><circle cx="42" cy="42" r="25" fill="#ffd58a"/>${face}`,
 moon:'<path d="M58 10C15 6 5 63 43 74Q67 78 76 54C46 65 27 30 58 10Z" fill="#c9c8ee" stroke="#8b86b0" stroke-width="2"/><path d="M25 41Q29 46 33 41M39 48Q43 53 47 48M29 53Q33 59 37 55" fill="none" stroke="#57516c" stroke-width="2" stroke-linecap="round"/>',
 leaf:'<path d="M13 68Q1 21 70 12Q86 65 35 70Z" fill="#9fc8a5" stroke="#527963" stroke-width="3"/><path d="M12 76L61 25M30 57L26 37M43 44L60 47" fill="none" stroke="#527963" stroke-width="3"/>',
 boat:'<path d="M10 52H76L61 69H27Z" fill="#d69b78" stroke="#92674f" stroke-width="2"/><path d="M42 12V51H17Z" fill="#ffe4a4"/><path d="M46 19V49H70Z" fill="#a3c7d8"/><path d="M6 74Q15 68 24 74T42 74T60 74T78 74" fill="none" stroke="#6d9dad" stroke-width="3"/>',
 heart:'<path d="M42 72L14 44C-3 18 26 5 42 25C58 5 87 18 70 44Z" fill="#e9a8ac" stroke="#b97683" stroke-width="2"/><path d="M20 28Q22 21 29 23" fill="none" stroke="#fff1e7" stroke-width="4" stroke-linecap="round"/>',
 kite:'<path d="M42 7L65 34L42 60L19 34Z" fill="#b5c5e7" stroke="#7486b0" stroke-width="2"/><path d="M42 7V60M19 34H65" stroke="#7486b0" stroke-width="2"/><path d="M42 60Q58 68 40 77" fill="none" stroke="#b97683" stroke-width="2"/><path d="M46 67L38 63L39 72Z" fill="#e9a8ac"/>',
 flower:'<g fill="#d4b2dc">'+[0,60,120,180,240,300].map(a=>`<ellipse cx="42" cy="25" rx="12" ry="17" transform="rotate(${a} 42 42)"/>`).join('')+'</g><circle cx="42" cy="42" r="16" fill="#ffe4a4"/>'+face,
 book:'<path d="M8 19Q25 12 42 22Q59 12 76 19V65Q59 58 42 68Q25 58 8 65Z" fill="#ffe4a4" stroke="#92724d" stroke-width="3"/><path d="M42 23V66M16 30H32M16 40H32M16 50H29M51 30H67M51 40H67M51 50H64" stroke="#b58b61" stroke-width="3" stroke-linecap="round"/>',
 rhyme:'<path d="M8 16H53Q60 16 60 23V44Q60 51 53 51H29L17 62V51H8Z" fill="#b5c5e7"/><path d="M34 36H73V65H65V76L52 65H34Z" fill="#e9bca4"/><path d="M18 30Q26 20 34 30T50 30M42 50Q50 40 58 50T70 50" fill="none" stroke="#57516c" stroke-width="3"/>',
 pattern:'<path d="M7 20L20 7L33 20L20 33Z M47 20L60 7L73 20L60 33Z" fill="#b5c5e7"/><circle cx="20" cy="58" r="14" fill="#ffd58a"/><circle cx="60" cy="58" r="14" fill="#ffd58a"/><path d="M15 59Q20 65 25 59M55 59Q60 65 65 59" fill="none" stroke="#786450" stroke-width="2"/>',
 opposite:'<circle cx="24" cy="30" r="19" fill="#ffd58a"/><path d="M63 33C37 27 34 69 61 72Q77 71 79 58C56 66 47 43 63 33Z" fill="#b5c5e7"/><path d="M15 33Q24 42 33 33M40 45L47 39M40 45L47 51M40 45H58" fill="none" stroke="#786450" stroke-width="2"/>',
 memory:'<rect x="9" y="12" width="43" height="55" rx="9" fill="#b5c5e7" stroke="#7486b0" stroke-width="2"/><rect x="32" y="24" width="43" height="55" rx="9" fill="#ffe4a4" stroke="#92724d" stroke-width="2"/><path d="M53 65L40 51C34 40 47 36 53 45C60 36 73 40 66 51Z" fill="#d69ca8"/>'};
 return `<svg class="l61art" viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">${art[k]||art.lamp}</svg>`}
function l61Stars(n){return `<span class="l61stars" role="img" aria-label="${esc(gT('{n} of 3 stars',{n:gNum(n)}))}">${[1,2,3].map(i=>`<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" fill="${i<=n?'#e4b458':'none'}" stroke="#a08048"/></svg>`).join('')}</span>`}
function l61Sound(){// One quiet glow at a time: rapid taps cannot stack sounds.
 const now=performance.now();if(now-L61.lastSound<1200)return;L61.lastSound=now;
 try{const c=ac();if(c)note(67,c.currentTime,.25,'glow',.045)}catch(e){}
}
function l61Clear(){clearTimeout(L61.timer);L61.timer=0}
function l61Start(k,lv){if(!L61.meta[k]||!CONTENT.includes(LANG))return;l61Clear();gStop();GM.v=k;
 const s=L61.s={k,lv:Math.max(1,Math.min(3,lv||1)),pid:curPid(),round:0,errors:0,done:false,won:false,msg:''};
 if(k==='sb')s.deck=l61Mix(L61.sentence[LANG][s.lv-1]);
 if(k==='rm'||k==='op')s.deck=l61Mix(L61[k==='rm'?'rhyme':'opposite'][LANG][s.lv-1]);
 if(k==='lm')s.deck=l61Mix(s.lv===1?[1,2,3,4,5,6]:s.lv===2?[[1,2],[2,3],[4,2],[3,4],[5,3],[4,6]]:[[3,1],[5,2],[7,3],[9,4],[12,6],[4,4]]);
 if(k==='mm'){s.cards=l61Mix(l61Mix(L61.shapes).slice(0,[3,4,6][s.lv-1]).flatMap(x=>[x,x]));s.open=[];s.matched=[];s.busy=false}else l61Round();
 l61Render()
}
function l61Round(){const s=L61.s;s.won=false;s.msg='';s.bad=null;
 if(s.k==='sb'){s.words=s.deck[s.round].split(' ');s.pool=l61Mix(s.words.map((_,i)=>i));if(s.pool.every((v,i)=>v===i))s.pool.push(s.pool.shift());s.chosen=[]}
 if(s.k==='rm'||s.k==='op'){const pair=s.deck[s.round];s.prompt=pair[0];s.answer=pair[1];s.options=l61Mix([s.answer,...l61Mix(s.deck.filter(p=>p!==pair).map(p=>p[1])).slice(0,s.lv===1?2:3)])}
 if(s.k==='lm'){const p=s.deck[s.round];s.a=s.lv===1?p:p[0];s.b=s.lv===1?0:p[1];s.answer=s.lv===1?s.a:s.lv===2?s.a+s.b:s.a-s.b;
  const ns=[s.answer];for(let d=1;ns.length<4;d++){if(s.answer-d>=0)ns.push(s.answer-d);if(ns.length<4)ns.push(s.answer+d)}s.options=l61Mix(ns)}
 if(s.k==='pp'){const patterns=s.lv===1?[[0,1]]:s.lv===2?[[0,0,1],[0,1,1],[0,1,2]]:[[0,1,0,2],[0,0,1,2],[0,1,1,2],[0,1,2,3]];
  const pat=patterns[s.round%patterns.length],icons=l61Mix(L61.shapes),offset=s.round%pat.length;s.sequence=Array.from({length:pat.length*2},(_,i)=>icons[pat[(i+offset)%pat.length]]);s.answer=icons[pat[offset]];s.options=l61Mix([s.answer,...icons.filter(x=>x!==s.answer).slice(0,s.lv===1?2:3)])}
}
function l61Award(){const s=L61.s;if(s.done)return;s.done=true;s.won=true;s.rating=s.errors===0?3:s.errors<=2?2:1;gSave(s.k+'_'+s.lv,s.rating);s.msg=gT('Level complete! Your stars are saved on this device.');l61Sound()}
function l61Win(){const s=L61.s;if(s.won||s.done)return;s.won=true;s.msg=gT('You got it!');l61Sound();if(s.round===5)l61Award()}
function l61Miss(){const s=L61.s;s.errors++;s.msg=gT('Not quite. Take another look and try again.')}
function l61Pick(i){const s=L61.s;if(!s||s.pid!==curPid()||s.done||s.won||s.busy||!CONTENT.includes(LANG)||GM.v!==s.k)return;
 if(s.k==='sb'){if(!Number.isInteger(i)||i<0||i>=s.words.length||s.chosen.includes(i))return;s.chosen.push(i);s.msg=''}
 else if(s.k==='mm'){if(i<0||i>=s.cards.length||s.open.includes(i)||s.matched.includes(i))return;s.open.push(i);s.msg='';
  if(s.open.length===2){const [a,b]=s.open;if(s.cards[a]===s.cards[b]){s.matched.push(a,b);s.open=[];l61Sound();s.msg=gT('A matching pair!');if(s.matched.length===s.cards.length)l61Award()}
   else{s.busy=true;l61Miss();L61.timer=setTimeout(()=>{if(L61.s!==s)return;s.open=[];s.busy=false;if(GM.v===s.k&&!$('games').classList.contains('hidden'))l61Render()},950)}}}
 else{if(i<0||i>=s.options.length)return;if(s.options[i]===s.answer)l61Win();else{l61Miss();s.bad=i}}
 l61Render();const el=$('l61pick'+i);if(el&&!el.disabled)el.focus({preventScroll:true})
}
function l61Check(){const s=L61.s;if(!s||s.k!=='sb'||s.won||s.done||s.pid!==curPid()||GM.v!=='sb')return;
 if(s.chosen.length!==s.words.length)return;if(s.chosen.every((v,i)=>s.words[v]===s.words[i]))l61Win();else l61Miss();l61Render()
}
function l61Undo(){const s=L61.s;if(s&&s.k==='sb'&&!s.won&&!s.done){s.chosen.pop();s.msg='';l61Render()}}
function l61Next(){const s=L61.s;if(!s||!s.won||s.done)return;s.round++;l61Round();l61Render()}
function l61Back(){l61Clear();L61.s=null;gStop();GM.v=null;RENDER.games()}
function l61LampGroup(n,removed){return `<span class="l61lamps" role="img" aria-label="${esc(gT('{n} lamps',{n:gNum(n)}))}">${Array.from({length:n},(_,i)=>`<span class="l61lamp${i<(removed||0)?' removed':''}">${l61Art('lamp')}</span>`).join('')}</span>`}
function l61Render(){const k=GM.v;if(!CONTENT.includes(LANG)){L61.s=null;GM.v=null;return RENDER.games()}if(!L61.s||L61.s.k!==k||L61.s.pid!==curPid())return l61Start(k,1);
 const s=L61.s,m=L61.meta[k],st=gStars(),locked=s.won||s.done;let body='';
 if(k==='sb'){body=`<div class="l61tray kline" aria-label="${esc(gT('Your sentence'))}">${s.chosen.length?s.chosen.map(i=>`<span>${esc(s.words[i])}</span>`).join(' '):gT('Your sentence goes here.')}</div><div class="l61choices kline">${s.pool.map(i=>`<button id="l61pick${i}" data-pick="${i}" onclick="l61Pick(${i})" ${locked||s.chosen.includes(i)?'disabled':''}>${esc(s.words[i])}</button>`).join('')}</div><p><button data-undo onclick="l61Undo()" ${locked||!s.chosen.length?'disabled':''}>${gT('Undo word')}</button> <button class="p" data-check onclick="l61Check()" ${locked||s.chosen.length!==s.words.length?'disabled':''}>${gT('Check sentence')}</button></p>`}
 if(k==='rm'||k==='op'){body=`<div class="l61prompt kline">${esc(s.prompt)}</div>`}
 if(k==='lm'){body=`<div class="l61math" dir="ltr">${l61LampGroup(s.a,s.lv===3?s.b:0)}${s.lv===2?`<b>+</b>${l61LampGroup(s.b)}`:''}</div>${s.lv>1?`<p class="l61equation" dir="ltr">${gNum(s.a)} ${s.lv===2?'+':'−'} ${gNum(s.b)} = ?</p>`:''}${s.lv===3?`<p>${gT('The crossed-out lamps go away. How many are left?')}</p>`:''}`}
 if(k==='pp'){body=`<div class="l61sequence" dir="ltr">${s.sequence.map(x=>`<span role="img" aria-label="${esc(gT(L61.labels[x]))}">${l61Art(x)}</span>`).join('')}<span class="l61missing" aria-label="${esc(gT('Missing picture'))}">?</span></div>`}
 if(s.options&&k!=='sb'&&k!=='mm'){body+=`<div class="l61choices${k==='pp'?' pictures':''} kline">${s.options.map((v,i)=>`<button id="l61pick${i}" data-pick="${i}" class="${s.bad===i?'l61retry':''}" onclick="l61Pick(${i})" ${locked?'disabled':''} ${k==='pp'?`aria-label="${esc(gT(L61.labels[v]))}"`:''}>${k==='pp'?l61Art(v):k==='lm'?gNum(v):esc(v)}</button>`).join('')}</div>`}
 if(k==='mm'){body=`<p>${gT('Pairs found: {a} of {b}',{a:gNum(s.matched.length/2),b:gNum(s.cards.length/2)})}</p><div class="l61memory" style="--cols:${s.lv===1?3:4}">${s.cards.map((v,i)=>{const matched=s.matched.includes(i),up=matched||s.open.includes(i);return `<button id="l61pick${i}" data-pick="${i}" class="${matched?'matched':''}" onclick="l61Pick(${i})" aria-label="${esc(up?gT(L61.labels[v])+' · '+gT(matched?'Matched':'Face up'):gT('Hidden card {n}',{n:gNum(i+1)}))}" ${matched||s.busy||s.done?'disabled':''}>${up?l61Art(v):'<span aria-hidden="true" class="l61back">?</span>'}</button>`}).join('')}</div>`}
 $('games').innerHTML=gCard(`${l61Art(m[2])} ${gT(m[0])}`,`<div class="l61game"><div class="l61levels" aria-label="${esc(gT('Levels'))}">${[1,2,3].map(n=>`<button data-level="${n}" class="${n===s.lv?'p':''}" aria-pressed="${n===s.lv}" onclick="l61Start('${k}',${n})">${gT('Level {n}',{n:gNum(n)})}<br>${l61Stars(st[k+'_'+n]||0)}</button>`).join('')}</div><p>${gT(k==='lm'?(s.lv===2?'Add the two groups of lamps.':s.lv===3?'Take away the crossed-out lamps.':m[4]):m[4])}</p>${k!=='mm'?`<p class="soft">${gT('Round {a} of {b}',{a:gNum(s.round+1),b:gNum(6)})}</p>`:''}${body}<p id="l61feedback" role="status" aria-live="polite">${esc(s.msg)}</p>${s.done?`<p>${l61Stars(s.rating)}</p><button class="p" data-replay onclick="l61Start('${k}',${s.lv})">${gT('Play again')}</button>${s.lv<3?` <button class="p" data-next-level onclick="l61Start('${k}',${s.lv+1})">${gT('Next level')}</button>`:''}`:s.won?`<button class="p" data-next onclick="l61Next()">${gT('Next')}</button>`:''}<p><button data-games-back onclick="l61Back()">${gT('Back to Games')}</button></p></div>`);
 $('games').querySelector('.gcard').classList.add('l61card')
}
document.head.insertAdjacentHTML('beforeend',`<style>
.l61art{display:inline-block;vertical-align:middle;max-width:100%;height:auto}.l61card{text-align:center}.l61card h2>.l61art{width:58px}.hubtile[data-g]>.l61icon{line-height:1}.l61icon .l61art{width:72px}
.l61game{max-width:620px;margin:auto;overflow-wrap:anywhere}.l61levels,.l61choices{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.l61stars{display:inline-flex;vertical-align:middle;gap:2px}.l61levels button{flex:1;min-width:75px}.l61game button{margin:0;min-height:48px;max-width:100%}.l61choices button{font-size:1.35rem;min-width:64px;overflow-wrap:anywhere}.l61card .l61game button{background:#1b1f38;color:#f6efe0;border-color:#3a4170}.l61card .l61game button.p{background:#ffd97a;color:#1b1f38}.l61game button:focus-visible{outline:3px solid #ffd97a;outline-offset:3px}.l61game button:disabled{cursor:default;opacity:.55}.l61game .matched:disabled{opacity:1;border-color:var(--acc);background:var(--hi)}
.l61tray{padding:15px 10px;border:2px dashed var(--acc);border-radius:16px;min-height:90px;margin:16px 0;font-size:1.35rem}.l61tray span{display:inline-block;margin:3px}.l61prompt{font-size:clamp(1.8rem,8vw,3rem);padding:22px 0}.l61retry{border-style:dashed!important}.l61sequence{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin:20px 0}.l61sequence>span{width:54px;display:grid;place-items:center}.l61missing{border:2px dashed var(--acc);border-radius:14px;font-size:2rem}.pictures button{padding:6px!important;flex:1}.pictures .l61art{width:66px}
.l61math{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px;margin:18px 0}.l61math>b{font-size:2rem}.l61lamps{display:flex;flex-wrap:wrap;max-width:260px;justify-content:center;gap:4px}.l61lamp{position:relative;width:46px}.l61lamp.removed{opacity:.45}.l61lamp.removed:after{content:'';position:absolute;left:3px;right:3px;top:50%;height:3px;background:var(--ink);transform:rotate(-45deg)}.l61equation{font-size:1.8rem}
.l61memory{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));gap:8px}.l61memory button{min-width:0;padding:5px!important;aspect-ratio:3/4;border:2px solid #b6a68a;border-radius:14px}.l61memory .l61art{width:100%}.l61back{display:block;font-size:2rem;color:var(--acc)}#l61feedback{min-height:3em;margin:14px 0}.l61card .l61levels button{font-size:1rem;padding:8px 3px}
@media(max-width:440px){.l61card{padding:16px 12px}.l61game .l61choices button{padding:10px}.l61memory{gap:6px}.l61sequence>span{width:45px}}
</style>`);
if(CONTENT.includes(LANG))Object.entries(L61.meta).forEach(([k,m])=>GHUB.push([k,`<i class="l61icon">${l61Art(m[2])}</i>`,m[0],m[1],m[3],`l61Start('${k}',1)`]));
{const rg=RENDER.games;RENDER.games=function(){if(L61.meta[GM.v])return l61Render();l61Clear();return rg.apply(this,arguments)}}
{const sh=show;show=function(id){if(id!=='games'){l61Clear();if(L61.s&&L61.s.k==='mm'){L61.s.open=[];L61.s.busy=false}}return sh.apply(this,arguments)}}
