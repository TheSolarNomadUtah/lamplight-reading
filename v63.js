// v63: Odd One Out, Story Order, original art throughout and retired-feature settings tidy.
// All questions/captions are bundled in English/Spanish; other languages receive menus only.
const L63={s:null,
 odd:[
  [['cat','cat','cat','boat'],['sun','sun','sun','leaf'],['apple','apple','apple','moon'],['book','book','book','fish'],['flower','flower','flower','piano'],['duck','duck','duck','cup']],
  [['cat','pup','owl','apple','Three pictures are animals.'],['apple','pear','bread','door','Three pictures are things you can eat.'],['hand','foot','ear','boat','Three pictures are parts of the body.'],['sun','cloud','rain','book','Three pictures belong in a weather picture.'],['bed','lamp','door','fish','Three pictures are things in a home.'],['cow','sheep','pup','moon','Three pictures are animals.']],
  [['owl','bee','duck','cat','Three pictures show animals with wings.'],['flower','tree','cactus','cup','Three pictures are plants.'],['piano','drum','guitar','apple','Three pictures are musical instruments.'],['fish','whale','duck','book','Three pictures show animals that can swim.'],['moon','sun','star','bed','Three pictures are things in the sky.'],['pencil','palette','paper','fish','Three pictures are things used to make a drawing.']]],
 captions:{
 en:{pot:'Fill a pot with soil.',seed:'Plant a seed.',water:'Water the seed.',sprout:'A little sprout grows.',bloom:'A flower opens.',bread:'Put bread on a plate.',spread:'Spread butter on the bread.',filling:'Add the cheese.',close:'Put the second slice on top.',serve:'Serve the sandwich.',blank:'Get a clean sheet of paper.',outline:'Draw an outline.',color:'Color the picture.',frame:'Put the picture in a frame.',hang:'Hang up the picture.'},
 es:{pot:'Llena una maceta con tierra.',seed:'Planta una semilla.',water:'Riega la semilla.',sprout:'Crece un pequeño brote.',bloom:'Se abre una flor.',bread:'Pon pan en un plato.',spread:'Unta mantequilla en el pan.',filling:'Añade el queso.',close:'Pon la segunda rebanada encima.',serve:'Sirve el sándwich.',blank:'Busca una hoja de papel limpia.',outline:'Dibuja un contorno.',color:'Colorea el dibujo.',frame:'Pon el dibujo en un marco.',hang:'Cuelga el dibujo.'}},
 flows:[['pot','seed','water','sprout','bloom'],['bread','spread','filling','close','serve'],['blank','outline','color','frame','hang']]
};
function scene63(step){const frame='<rect x="5" y="5" width="190" height="150" rx="16" fill="#fff2d8" stroke="#72583f" stroke-width="3"/>',stroke='stroke="#72583f" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';let inner='';
 if(['pot','seed','water','sprout','bloom'].includes(step)){
  inner=`<path d="M58 92H142L132 142H68Z" fill="#cc9a7b" ${stroke}/><ellipse cx="100" cy="92" rx="42" ry="10" fill="#987451" ${stroke}/>`;
  if(step==='seed')inner+='<ellipse cx="100" cy="85" rx="6" ry="9" transform="rotate(25 100 85)" fill="#e8ce8c" stroke="#72583f" stroke-width="2"/>';
  if(step==='water')inner+=`<path d="M127 26H171V52H144L123 68L115 59L135 44H127Z" fill="#a6c9d7" ${stroke}/><g fill="#78a6bb"><path d="M115 69Q103 84 115 85Q125 82 115 69Z M97 64Q85 79 97 80Q107 77 97 64Z M104 83Q92 98 104 99Q114 96 104 83Z"/></g>`;
  if(step==='sprout')inner+=`<path d="M100 89V55M100 70Q69 46 76 71Q86 80 100 72M100 61Q128 34 126 58Q118 70 100 66" fill="#86b58a" ${stroke}/>`;
  if(step==='bloom')inner+=`<g transform="translate(52 4) scale(.96)">${artInner63('flower')}</g>`;
 }else if(['bread','spread','filling','close','serve'].includes(step)){
  inner='<ellipse cx="100" cy="127" rx="75" ry="17" fill="#d1dfe0" stroke="#72583f" stroke-width="3"/>';
  const slice=(y)=>`<path d="M50 ${y+43}V${y+6}Q39 ${y} 49 ${y-13}Q100 ${y-38} 151 ${y-13}Q161 ${y} 150 ${y+6}V${y+43}Z" fill="#f5d8a4" ${stroke}/>`;
  inner+=slice(76);
  if(step!=='bread')inner+=`<path d="M60 104V75Q100 50 140 75V104Z" fill="#f3df8c" ${stroke}/>`;
  if(['filling','close','serve'].includes(step))inner+=`<path d="M53 89L144 62L153 103L65 124Z" fill="#ebc65f" ${stroke}/><g fill="#cd9d4f"><circle cx="82" cy="92" r="4"/><circle cx="125" cy="88" r="5"/></g>`;
  if(['close','serve'].includes(step))inner+=slice(43);
  if(step==='serve')inner+=`<g transform="translate(153 19) scale(.45)">${artInner63('apple')}</g><path d="M18 54V113M12 54V72H24V54M178 95V122" fill="none" ${stroke}/>`;
 }else{
  const framed=['frame','hang'].includes(step);inner=`<rect x="${framed?36:43}" y="${framed?22:27}" width="${framed?128:114}" height="${framed?117:106}" rx="5" fill="${framed?'#c9a47d':'#fffdf7'}" ${stroke}/>`;
  if(framed)inner+=`<rect x="46" y="32" width="108" height="97" fill="#fffdf7" ${stroke}/>`;
  if(step!=='blank')inner+=`<path d="M62 110L86 67L111 103L133 76L144 112Z" fill="${step==='outline'?'none':'#91b98d'}" ${stroke}/><circle cx="128" cy="54" r="12" fill="${step==='outline'?'none':'#eac77c'}" ${stroke}/>`;
  if(step==='hang')inner+=`<path d="M41 23L100 10L159 23" fill="none" ${stroke}/><circle cx="100" cy="10" r="3" fill="#72583f"/>`;
 }
 return `<svg class="scene63" viewBox="0 0 200 160" width="200" height="160" aria-hidden="true">${frame}${inner}</svg>`
}
function l63Start(k,lv){if(!['odd','order'].includes(k)||!CONTENT.includes(LANG))return;gStop();GM.v=k;L63.s={k,lv:lv||1,pid:curPid(),round:0,errors:0,won:false,done:false,msg:'',deck:l61Mix(k==='odd'?L63.odd[(lv||1)-1]:L63.flows)};l63Round();l63Render()}
function l63Round(){const s=L63.s;s.won=false;s.msg='';s.bad=-1;
 if(s.k==='odd'){const q=s.deck[s.round];s.answer=q[3];s.group=q[4]||'Find the picture that is different.';s.options=l61Mix(q.slice(0,4))}
 else{const indices=s.lv===1?[0,2,4]:s.lv===2?[0,1,2,4]:[0,1,2,3,4];s.steps=indices.map(i=>s.deck[s.round][i]);s.pool=l61Mix(s.steps);if(s.pool.every((x,i)=>x===s.steps[i]))s.pool.push(s.pool.shift());s.chosen=[]}
}
function l63Award(){const s=L63.s;if(s.done)return;s.done=true;s.rating=s.errors===0?3:s.errors<=2?2:1;gSave(s.k+'_'+s.lv,s.rating);s.msg=gT('Level complete! Your stars are saved on this device.')}
function l63Win(){const s=L63.s;if(s.won||s.done)return;s.won=true;s.msg=gT('You got it!');l61Sound();if(s.round===(s.k==='odd'?5:2))l63Award()}
function l63Pick(i){const s=L63.s;if(!s||s.pid!==curPid()||s.won||s.done||GM.v!==s.k||!CONTENT.includes(LANG))return;
 if(s.k==='odd'){if(i<0||i>=s.options.length)return;if(s.options[i]===s.answer)l63Win();else{s.errors++;s.bad=i;s.msg=gT('Not quite. Take another look and try again.')}}
 else{if(i<0||i>=s.pool.length||s.chosen.includes(s.pool[i]))return;s.chosen.push(s.pool[i]);s.msg=''}l63Render()
}
function l63Undo(){const s=L63.s;if(s&&s.k==='order'&&!s.won&&!s.done){s.chosen.pop();s.msg='';l63Render()}}
function l63Check(){const s=L63.s;if(!s||s.k!=='order'||s.won||s.done||s.pid!==curPid()||s.chosen.length!==s.steps.length)return;if(s.chosen.every((x,i)=>x===s.steps[i]))l63Win();else{s.errors++;s.msg=gT('Not quite. Take another look and try again.')}l63Render()}
function l63Next(){const s=L63.s;if(!s||!s.won||s.done)return;s.round++;l63Round();l63Render()}
function l63Back(){L63.s=null;GM.v=null;gStop();RENDER.games()}
function l63Render(){if(!CONTENT.includes(LANG)){L63.s=null;GM.v=null;return RENDER.games()}const s=L63.s;if(!s||s.k!==GM.v||s.pid!==curPid())return l63Start(GM.v,1);const k=s.k,title=k==='odd'?'Odd One Out':'Story Order',st=gStars(),locked=s.won||s.done;let body;
 if(k==='odd')body=`<h3>${gT(s.group)}</h3><div class="l63choices kline">${s.options.map((x,i)=>`<button data-l63-pick="${i}" class="${s.bad===i?'l61retry':''}" onclick="l63Pick(${i})" ${locked?'disabled':''}>${lampArt63(x)}<span>${gT(artLabel63(x))}</span></button>`).join('')}</div>`;
 else{const cap=L63.captions[LANG];body=`<p>${gT('Tap the pictures to put the story in order. Use Undo to change your mind.')}</p><div class="l63tray kline" aria-label="${gT('Your story')}">${s.chosen.length?s.chosen.map((x,i)=>`<div><b>${gNum(i+1)}</b>${scene63(x)}<small>${esc(cap[x])}</small></div>`).join(''):gT('Your story goes here.')}</div><div class="l63choices steps kline">${s.pool.map((x,i)=>`<button data-l63-pick="${i}" onclick="l63Pick(${i})" ${locked||s.chosen.includes(x)?'disabled':''}>${scene63(x)}<span>${esc(cap[x])}</span></button>`).join('')}</div><p><button data-l63-undo onclick="l63Undo()" ${locked||!s.chosen.length?'disabled':''}>${gT('Undo picture')}</button> <button class="p" data-l63-check onclick="l63Check()" ${locked||s.chosen.length!==s.steps.length?'disabled':''}>${gT('Check story')}</button></p>`}
 $('games').innerHTML=gCard(`${lampArt63(k==='odd'?'search':'book')} ${gT(title)}`,`<div class="l61game l63game"><div class="l61levels">${[1,2,3].map(n=>`<button data-l63-level="${n}" class="${n===s.lv?'p':''}" aria-pressed="${n===s.lv}" onclick="l63Start('${k}',${n})">${gT('Level {n}',{n:gNum(n)})}<br>${l61Stars(st[k+'_'+n]||0)}</button>`).join('')}</div><p class="soft">${gT('Round {a} of {b}',{a:gNum(s.round+1),b:gNum(k==='odd'?6:3)})}</p>${body}<p role="status" aria-live="polite" id="l63feedback">${esc(s.msg)}</p>${s.done?`<p>${l61Stars(s.rating)}</p><button class="p" data-l63-replay onclick="l63Start('${k}',${s.lv})">${gT('Play again')}</button>${s.lv<3?` <button class="p" data-l63-next-level onclick="l63Start('${k}',${s.lv+1})">${gT('Next level')}</button>`:''}`:s.won?`<button class="p" data-l63-next onclick="l63Next()">${gT('Next')}</button>`:''}<p><button data-l63-back onclick="l63Back()">${gT('Back to Games')}</button></p></div>`);$('games').firstElementChild.classList.add('l61card','l63card');artRefresh63($('games'))
}
if(CONTENT.includes(LANG)){GHUB.push(['odd',lampArt63('search'),'Odd One Out','Find the picture that does not belong',4,"l63Start('odd',1)"],['order',lampArt63('book'),'Story Order','Put picture steps in order',5,"l63Start('order',1)"])}
{const rg=RENDER.games;RENDER.games=function(){if(GM.v==='odd'||GM.v==='order')return l63Render();return rg.apply(this,arguments)}}
// Hide obsolete settings only. Reading-voice choices and every audio file remain untouched.
singerPicker=function(){return''};
function settingsTidy63(root){if(!root)return;root.querySelectorAll('#singcard,#singlink,#spick,.labtoggle,.singcredit,[data-sing],[onchange*="lamp_singmode"]').forEach(el=>{const row=el.closest('label');(row||el).hidden=true});root.querySelectorAll('[onclick]').forEach(el=>{const on=el.getAttribute('onclick')||'';if(/show\('(lab|starsongs|cymatica|cymatics|numbers)'\)|labSetOn|singSample|lamp_singer/.test(on))el.hidden=true})}
for(const id of ['adults','look']){const r=RENDER[id];RENDER[id]=function(){r.apply(this,arguments);settingsTidy63($(id));artRefresh63($(id))}}
{const r=renderVoicePick;renderVoicePick=function(){r.apply(this,arguments);const el=$('vpick');if(!el)return;const p=el.querySelector('p.soft');if(p)p.textContent=gT('Used for letters, picture cards and reading. Missing recordings stay silent.')+' '+gT('Current voice: {name}',{name:(VOICES.find(v=>v[0]===curVoice())||[])[1]||''});el.querySelectorAll('p.soft').forEach(p=>{if(p.textContent.includes("Words without a recording use the device's built-in voice."))p.textContent=p.textContent.replace("Words without a recording use the device's built-in voice.",gT('Words without a recording stay silent.'))});settingsTidy63(el)}}
// Direct renderLook calls (theme sliders) must receive the same UI-only cleanup.
{const r=renderLook;renderLook=function(){r.apply(this,arguments);settingsTidy63($('look'));artRefresh63($('look'))};RENDER.look=renderLook}
document.head.insertAdjacentHTML('beforeend',`<style>
#singcard,#singlink,#spick,#adults .singcredit,#adults .labtoggle,#look .labtoggle,#adults [hidden],#look [hidden]{display:none!important}
.l63card h2>.lamp-art63{width:58px}.l63choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.l63choices button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px!important;font-size:1.08rem;min-width:0}.l63choices .lamp-art63{width:100px}.l63choices span{font-size:1rem}.scene63{max-width:100%;height:auto}.l63tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:90px;border:2px dashed #a68e6c;border-radius:16px;padding:10px;margin:16px 0}.l63tray>div{width:calc(50% - 8px);display:flex;flex-direction:column;align-items:center;gap:3px}.l63tray small{font-size:.9rem}.l61card .l63game button:disabled{opacity:1!important;color:#c8bca9;background:#272a3c}.l63game button:disabled .scene63{opacity:.45}.l63game #l63feedback{min-height:3em}.l63card .l63choices button:hover:not(:disabled){border-color:#ffd97a;background:#303652}
</style>`);
