// v9: Echo mode (babies & toddlers, with a grown-up), kid profiles, grown-ups guide + feedback.
const BANDS={baby:'Baby–toddler (0–3)',prek:'Pre-K (3–5)',k:'Kindergarten',g1:'Grade 1',g2:'Grade 2',g3:'Grade 3',g4:'Grade 4',g5:'Grade 5'};
const AVS=['🦊','🐻','🐰','🐢','🦉','🐱','🐶','🦄','🐸','🚀','🌟','🌙'];
const ECHO=[
{id:'e1',t:'Hello, Hello',kind:'You say, I say',lines:['Hel-lo, hel-lo!','How are YOU?','Hel-lo, hel-lo!','I see YOU!'],
 tip:'Hold your child close and face to face. Say each line slowly in a sing-song voice, then pause and wait. Any babble, smile, or sound back counts as their turn.'},
{id:'e2',t:'Clap, Clap, Pat',kind:'Rhythm',lines:['Clap, clap, PAT.','Clap, clap, PAT.','Tap your knees, tap, tap, tap.','Clap, clap, PAT!'],
 tip:'Help little hands clap with yours. Make the beat big and steady. Try it slow, then a bit faster, then slow again.'},
{id:'e3',t:'Who Says Moo?',kind:'Animal sounds',lines:['The cow says moooo.','The duck says quack, quack.','The cat says meow.','What do YOU say?'],
 tip:'Stretch the animal sounds out long. After each one, pause so your child can try the sound too. Use the sound board below to hear them again.'},
{id:'e4',t:'Mmm Is for Mama',kind:'Letter sounds',lines:['Mmm, mmm, mama.','Buh, buh, ball.','Sss, sss, sun.','Mmm, buh, sss!'],
 tip:'Let them feel your lips or cheek as you hum "mmm." Say the sound, then the word. Slow and clear is better than fast.'},
{id:'e5',t:'Hush, Little Moon',kind:'Lullaby rhyme',lines:['Hush, little moon, up high, so high.','Hush, little star, in the sky, the sky.','Rock, rock, rock, so slow,','Close your eyes, and off we go.'],
 tip:'Rock gently on each beat. Use a soft, low, slow voice. This one is for calming down before a nap or bed.'},
{id:'e6',t:'Up Goes the Ball',kind:'You say, I say',lines:['UP goes the ball!','DOWN goes the ball!','ROLL goes the ball!','Where is the ball?'],
 tip:'Use a real ball or toy and move it as you say each line. Take turns: you say it, then let them do the action or the sound.'},
{id:'e7',t:'Peek-a-Boo Names',kind:'Turn-taking',lines:['Where is (name)?','Peek-a-BOO!','There is (name)!','I love you!'],
 tip:'Say your child\'s name in place of (name). Hide your face, pause, then pop out on "BOO." The pause and the turn-taking are the fun part.'},
{id:'e8',t:'Beep, Zoom, Choo',kind:'Sound play',lines:['The car goes beep, beep.','The plane goes zoooom.','The train goes choo, choo.','Off we go, vroom!'],
 tip:'Make each sound big and fun with your voice. Point to toys or pictures. Wait and smile when your child tries a sound.'}];
const BOARD=[['🐮','Moo','The cow says moo'],['🦆','Quack','The duck says quack quack'],['🐶','Woof','The dog says woof woof'],['🐱','Meow','The cat says meow'],['🐑','Baa','The sheep says baa'],['🐍','Sss','S. Sss. Snake'],['🐝','Bzz','Bzz. Bee'],['🅰️','A','A. A says ah, like apple'],['🅱️','B','B. B says buh, like ball'],['Ⓜ️','M','M. M says mmm, like mama'],['👏','Clap','Clap. Clap. Clap'],['🌙','Night night','Night night. Sleep tight']];
const getEcho=()=>safeJSON(LS.get('lamp_echo'),{});
let ECUR=null;
function renderEcho(){const ev=getEcho();
 if(ECUR){const a=ECHO.find(x=>x.id===ECUR);$('echo').innerHTML=`<div class="card coach big"><div class="soft">👶 Echo · ${a.kind}</div><h2>${a.t}</h2>
 <p class="soft"><b>Grown-up tip:</b> ${a.tip}</p>
 <div class="story">${a.lines.map((l,i)=>`<div><button class="snd" style="min-height:auto;min-width:auto;font-size:1.4rem;padding:8px 14px" onclick="speak(this.dataset.l,0.7)" data-l="${l.replace(/"/g,'')}">🔊</button> ${l}</div>`).join('')}</div>
 <p class="soft">Tap 🔊 to hear a line, then say it yourself and let your child echo you. Your voice matters more than the device.</p>
 <button class="bigbtn" onclick="speak(ECHO.find(x=>x.id===ECUR).lines.join('. '),0.65)">🔊 Hear it all, slowly</button> <button class="bigbtn p" onclick="echoDone()">⭐ We did it</button> <button class="bigbtn" onclick="ECUR=null;renderEcho()">Back</button></div>`;return}
 $('echo').innerHTML=`<div class="card coach"><h2>👶 Echo: listen, babble, take turns</h2><p class="soft">For babies and toddlers (about 0–3) with a grown-up. Hold your child close, speak slowly with a big, sing-song rhythm, then pause and let them answer with any sound. A few minutes is plenty.</p></div>
 <div class="grid">${ECHO.map(a=>`<div class="card"><div class="soft">${a.kind}</div><h3>${a.t} ${ev[a.id]?'⭐×'+ev[a.id]:''}</h3><button class="p" onclick="ECUR='${a.id}';renderEcho()">Start</button></div>`).join('')}</div>
 <div class="card big"><h2>🔊 Sound board</h2><p class="soft">Tap a picture to hear it. Say it again yourself, then wait for your child's turn.</p>
 <div>${BOARD.map((b,i)=>`<button class="snd" onclick="boardTap(this,${i})">${b[0]}<small>${b[1]}</small></button>`).join('')}</div></div>`}
function boardTap(el,i){document.querySelectorAll('.snd.say').forEach(x=>x.classList.remove('say'));el.classList.add('say');speak(BOARD[i][2],0.7);setTimeout(()=>el.classList.remove('say'),1500)}
function echoDone(){const ev=getEcho();ev[ECUR]=(ev[ECUR]||0)+1;LS.set('lamp_echo',JSON.stringify(ev));speak('Yay! Great job!',0.8);ECUR=null;renderEcho()}

// ---------- Profiles ----------
function renderBar(){const P=getProfiles();$('pbar').innerHTML=P.list.map(p=>`<button class="pchip ${p.id===P.cur?'on':''}" onclick="switchP('${p.id}')" title="${esc(BANDS[p.band]||'')}">${p.av} ${esc(p.name)}</button>`).join('')+`<button class="pchip" onclick="show('kids')" title="Add or edit kids">＋</button>`}
function switchP(id){const P=getProfiles();P.cur=id;saveProfiles(P);try{stopRead()}catch(e){}ECUR=null;renderBar();const vis=[...document.querySelectorAll('main>section')].find(x=>!x.classList.contains('hidden'));show(vis&&vis.id!=='session'?vis.id:'home')}
function pStats(id){const g=k=>safeJSON(RAW.get(k+'@'+id),null);const log=g('lamp_log')||[],solo=g('lamp_solo')||{},let_=g('lamp_letters')||{},notes=g('lamp_notes')||{},ec=g('lamp_echo')||{};
 return{read:new Set(log.map(e=>e.story)).size,sessions:log.length,solo:Object.keys(solo).length,stars:Object.values(solo).reduce((a,x)=>a+(x.stars||0),0),letters:Object.values(let_).filter(n=>n>=3).length,notes:Object.values(notes).filter(x=>x&&String(x).trim()).length+log.filter(e=>e.note).length,echo:Object.values(ec).reduce((a,n)=>a+n,0),last:log.length?new Date(log[log.length-1].date).toLocaleDateString():''}}
function renderKids(){const P=getProfiles();
 $('kids').innerHTML=`<div class="card"><h2>👧 Kids on this device</h2><p class="soft">Each kid gets their own progress. Use a first name or nickname only. Tap a name at the top to switch.</p>
 <table><tr><th></th><th>Name</th><th>Age</th><th>Stories read</th><th>Solo ⭐</th><th>Letters known</th><th>Echo</th><th>Notes</th><th></th></tr>
 ${P.list.map(p=>{const s=pStats(p.id);return`<tr><td style="font-size:1.6rem">${p.av}</td><td><b>${esc(p.name)}</b>${p.id===P.cur?' <span class="soft">(now)</span>':''}</td><td>${BANDS[p.band]||''}</td><td>${s.read} <span class="soft">(${s.sessions} sessions)</span></td><td>${s.stars} <span class="soft">in ${s.solo}</span></td><td>${s.letters}/26</td><td>${s.echo}</td><td>${s.notes}</td>
 <td><button onclick="switchP('${p.id}')">Use</button> <button onclick="editP('${p.id}')">Edit</button> <button onclick="delP('${p.id}')">Delete</button></td></tr>`}).join('')}</table></div>
 <div class="card" id="pform"></div>
 <div class="card"><h3>Backup (good for daycares)</h3><p class="soft">Save all kids' progress to a file, or load it back on this or another device. Loading replaces what is on this device.</p>
 <button onclick="exportAll()">⬇️ Save all kids to a file</button> <label><button onclick="$('impf').click()">⬆️ Load from a file</button><input id="impf" type="file" accept=".json,application/json" class="hidden" onchange="importAll(this.files[0])"></label> <span id="impmsg" class="soft"></span></div>`;editP(null)}
function editP(id){const P=getProfiles(),p=id?P.list.find(x=>x.id===id):{name:'',band:'k',av:AVS[P.list.length%AVS.length]};
 $('pform').innerHTML=`<h3>${id?'Edit '+esc(p.name):'Add a kid'}</h3><label>Nickname</label><input id="pn" maxlength="20" value="${esc(p.name)}" placeholder="e.g. Mia or Bear">
 <label>Age</label><select id="pb">${Object.entries(BANDS).map(([k,v])=>`<option value="${k}" ${k===p.band?'selected':''}>${v}</option>`).join('')}</select>
 <label>Picture</label><div id="pa">${AVS.map(a=>`<button class="pchip ${a===p.av?'on':''}" onclick="document.querySelectorAll('#pa .pchip').forEach(x=>x.classList.remove('on'));this.classList.add('on')">${a}</button>`).join('')}</div>
 <p><button class="p" onclick="saveP(${id?`'${id}'`:'null'})">${id?'Save':'Add kid'}</button>${id?' <button onclick="editP(null)">Cancel</button>':''}</p>`}
function saveP(id){const name=$('pn').value.trim().slice(0,20);if(!name){$('pn').focus();return}const band=$('pb').value,av=(document.querySelector('#pa .on')||{}).textContent||'🦊';const P=getProfiles();
 if(id){Object.assign(P.list.find(x=>x.id===id),{name,band,av})}else{const nid='p'+Date.now().toString(36);P.list.push({id:nid,name,band,av});P.cur=nid}
 saveProfiles(P);renderBar();renderKids()}
function delP(id){const P=getProfiles();if(P.list.length<2){alert('Keep at least one kid. Use Edit to rename instead.');return}const p=P.list.find(x=>x.id===id);
 if(!confirm('Delete '+p.name+' and all of their progress and notes on this device? This cannot be undone.'))return;
 PKEYS.forEach(k=>RAW.del(k+'@'+id));P.list=P.list.filter(x=>x.id!==id);if(P.cur===id)P.cur=P.list[0].id;saveProfiles(P);renderBar();renderKids()}
function exportAll(){const P=getProfiles(),data={app:'lamplight',v:APP_VERSION,saved:new Date().toISOString(),profiles:P,progress:{}};
 P.list.forEach(p=>{data.progress[p.id]={};PKEYS.forEach(k=>{const v=RAW.get(k+'@'+p.id);if(v!=null)data.progress[p.id][k]=v})});
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,1)],{type:'application/json'}));a.download='lamplight-kids-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove()}
function importText(t){const d=JSON.parse(t);if(d.app!=='lamplight'||!d.profiles||!Array.isArray(d.profiles.list))throw new Error('Not a Lamplight backup file');
 getProfiles().list.forEach(p=>PKEYS.forEach(k=>RAW.del(k+'@'+p.id)));
 for(const[id,o]of Object.entries(d.progress||{}))for(const[k,v]of Object.entries(o))if(PKEYS.includes(k))RAW.set(k+'@'+id,String(v));
 saveProfiles(d.profiles);return d.profiles.list.length}
function importAll(f){if(!f)return;if(!confirm('Replace the kids and progress on this device with this file?'))return;const r=new FileReader();
 r.onload=()=>{try{const n=importText(r.result);renderBar();renderKids();$('impmsg').textContent='Loaded '+n+' kid(s).'}catch(e){$('impmsg').textContent='Could not load: '+e.message}};r.readAsText(f)}

// ---------- For grown-ups ----------
function renderAbout(){const p=curProfile(),s=pStats(p.id);
 $('about').innerHTML=`<div class="card"><h2>For grown-ups: how to use it</h2>
 <ol><li><b>Pick the kid.</b> Tap their name at the top. Tap ＋ or <b>👧 Kids</b> to add, rename, or remove someone. Each kid's progress is kept separately.</li>
 <li><b>Pick a tab for their age:</b><ul><li><b>Babies and toddlers (0–3):</b> 👶 Echo. You say a line, they echo with any sound. Use the sound board.</li>
 <li><b>Pre-K and Kindergarten:</b> 🔤 Letters for big/little letter matching, and <b>Stories</b> (Pre-K · Echo and K levels) read together.</li>
 <li><b>Grades 1–5:</b> <b>Tonight</b> or <b>Stories</b> to read together, and ⭐ Solo to read alone.</li></ul></li>
 <li><b>Read together:</b> Tap Begin. The child reads aloud, and you tap any word they find tricky. Talk about it, then save. About 10–15 minutes.</li>
 <li><b>⭐ Solo:</b> The child reads alone. They can tap a word to hear it, or use "Read to me." A few tap questions at the end give stars.</li>
 <li><b>🎨 Look:</b> Change colors, text size, spacing, and font.</li>
 <li><b>Notes and progress stay on this device.</b> Nothing is sent anywhere, and there are no accounts. Use 👧 Kids → "Save all kids to a file" for a backup.</li>
 <li>Read-aloud uses the device's built-in voice. The optional speech check only works in Chrome or Edge.</li></ol></div>
 <div class="card"><h2>💬 Send feedback</h2><p class="soft">Fill this in, tap Copy, then paste it into a text or email to Ignacio.</p>
 <label>Age group</label><select id="fb_band">${Object.entries(BANDS).map(([k,v])=>`<option value="${k}" ${k===p.band?'selected':''}>${v}</option>`).join('')}</select>
 <label>What did you try?</label><div id="fb_tried">${['Echo','Sound board','Letters','Read together','Solo','Look','Kids profiles'].map(x=>`<label style="display:inline-block;margin-right:12px"><input type="checkbox" style="width:auto" value="${x}"> ${x}</label>`).join('')}</div>
 <label>What worked, what didn't, what the kids liked</label><textarea id="fb_text" rows="5"></textarea>
 <p><button class="p" onclick="copyFb()">📋 Copy feedback summary</button> <span id="fb_msg" class="soft"></span></p></div>
 <div class="card"><p><button onclick="if(confirm('Erase all progress and notes for ${esc(p.name)} on this device?')){['lamp_log','lamp_notes','lamp_letters','lamp_solo','lamp_echo'].forEach(k=>LS.del(k));render();renderAbout()}">Erase ${esc(p.name)}'s progress</button> <button onclick="exportLog()">Export ${esc(p.name)}'s log (JSON)</button></p></div>`}
function fbSummary(){const b=BANDS[$('fb_band').value],tr=[...document.querySelectorAll('#fb_tried input:checked')].map(x=>x.value);
 return `Lamplight Learning feedback (v${APP_VERSION}, ${new Date().toLocaleDateString()})\nAge group: ${b}\nTried: ${tr.join(', ')||'(none checked)'}\nNotes: ${$('fb_text').value.trim()||'(none)'}`}
async function copyFb(){const t=fbSummary();let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){}
 if(!ok){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{ok=document.execCommand('copy')}catch(e){}ta.remove()}
 $('fb_msg').textContent=ok?'Copied! Now paste it into a text or email.':'Could not copy automatically. Select and copy this:';if(!ok)$('fb_msg').insertAdjacentHTML('afterend','<pre style="white-space:pre-wrap">'+esc(t)+'</pre>')}
