// v10: Home hub, library filters, picture-word cards, trace-a-letter, daily lamp streak,
// record yourself, daycare mode, printable pages, Paint Studio. Zero data: nothing leaves this device.
PKEYS.push('lamp_days','lamp_trace','lamp_cards');
const SECTIONS=['hub','home','lib','session','log','print','look','about','solo','letters','echo','kids','cards','trace','paint','record','daycare','adults'];
document.querySelector('main').insertAdjacentHTML('afterbegin',['hub','cards','trace','paint','record','daycare','adults'].map(x=>`<section id="${x}" class="hidden"></section>`).join(''));
const RENDER={hub:renderHub,lib:renderLib,solo:renderSolo,letters:renderLetters,echo:renderEcho,kids:renderKids,about:renderAbout,cards:renderCards,trace:renderTrace,paint:renderPaint,record:renderRecord,daycare:renderDaycare,adults:renderAdults};
show=function(id){try{if(id!=='solo')stopRead()}catch(e){}if(id!=='record')recStopAll();if(id!=='paint')document.body.classList.remove('painting');
 SECTIONS.forEach(x=>{const e=$(x);if(e)e.classList.toggle('hidden',x!==id)});render();if(RENDER[id])RENDER[id]();window.scrollTo(0,0)};
// ---------- Day log + lamp streak ----------
const dkey=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const getDays=pid=>safeJSON(pid?RAW.get('lamp_days@'+pid):LS.get('lamp_days'),{});
function markDay(kind){const D=getDays(),k=dkey();D[k]=D[k]||{};D[k][kind]=(D[k][kind]||0)+1;LS.set('lamp_days',JSON.stringify(D))}
function streakOf(D,today){today=today||new Date();let n=0,d=new Date(today);if(!D[dkey(d)])d.setDate(d.getDate()-1);while(D[dkey(d)]){n++;d.setDate(d.getDate()-1)}return n}
function lampLevel(n){return Math.min(n,10)/10}
function lampSVG(n,size){const g=lampLevel(n),r=30+g*40;return `<svg viewBox="0 0 200 200" width="${size||150}" height="${size||150}" aria-label="lamp"><defs><radialGradient id="lg${size}"><stop offset="0" stop-color="#ffe9a8" stop-opacity="${.35+g*.65}"/><stop offset="1" stop-color="#ffcf6b" stop-opacity="0"/></radialGradient></defs>
 <circle cx="100" cy="85" r="${r+30}" fill="url(#lg${size})" class="glowpulse"/><path d="M78 60 Q100 30 122 60 L118 115 Q100 125 82 115 Z" fill="#f7e7c1" stroke="#8a6a3b" stroke-width="3"/>
 <ellipse cx="100" cy="88" rx="${6+g*8}" ry="${10+g*12}" fill="#ffb636" opacity="${.3+g*.7}"/><rect x="80" y="118" width="40" height="10" rx="4" fill="#8a6a3b"/><rect x="88" y="128" width="24" height="30" fill="#a8835a"/><rect x="70" y="156" width="60" height="10" rx="5" fill="#8a6a3b"/><path d="M95 30 Q100 15 105 30" stroke="#8a6a3b" stroke-width="3" fill="none"/></svg>`}
function hashStr(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
const BANDG={baby:[0,0.25],prek:[0,0.25],k:[0.25,0.99],g1:[1,1.99],g2:[2,2.99],g3:[3,3.99],g4:[4,4.99],g5:[5,5.99]};
function todayStory(band,date){const [a,b]=BANDG[band]||BANDG.k;const list=S.filter(s=>s.g>=a&&s.g<=b).sort((x,y)=>x.id<y.id?-1:1);const pool=list.length?list:S;return pool[hashStr(dkey(date)+'|'+band)%pool.length]}
// ---------- Story metadata for the library ----------
const TAGWORDS={animals:/\b(cat|dog|fox|bird|owl|bear|fish|frog|duck|hen|pig|cow|bug|bee|whale|turtle|horse|goat)s?\b/i,space:/\b(moon|star|stars|rocket|planet|comet|space|sky|telescope)\b/i,science:/\b(science|experiment|measure|magnet|seed|plant|water|ice|light)\b/i,humor:/\b(silly|funny|giggle|laugh|oops|ha)\b/i,family:/\b(mom|dad|grandma|grandpa|sister|brother|aunt|uncle|baby)\b/i,food:/\b(pie|cake|bread|apple|soup|jam|eat|snack|lunch)\b/i,nature:/\b(tree|rain|snow|wind|river|mountain|leaf|flower|garden)\b/i};
const sType=s=>/lesson/i.test(s.lvl)||/^Lesson/.test(s.t)?'lesson':'story';
function sTags(s){if(s._tags)return s._tags;const t=new Set(s.tags||[]);for(const[k,re]of Object.entries(TAGWORDS))if(re.test(s.text+' '+s.t))t.add(k);return s._tags=[...t]}
const GRADES=[['all','All',0,99],['prek','Pre-K',0,0.25],['k','K',0.25,0.99],['g12','Grades 1–2',1,2.99],['g35','Grades 3–5',3,99]];
let LF={g:'all',type:'all',tag:'',q:''};
function renderLib(){const sv=getSolo(),tags=[...new Set(S.flatMap(sTags))].sort(),G=GRADES.find(x=>x[0]===LF.g);
 const list=S.filter(s=>s.g>=G[2]&&s.g<=G[3]&&(LF.type==='all'||sType(s)===LF.type)&&(!LF.tag||sTags(s).includes(LF.tag))&&(!LF.q||(s.t+' '+s.lvl+' '+s.focus+' '+s.text).toLowerCase().includes(LF.q.toLowerCase()))).sort((a,b)=>a.g-b.g);
 $('lib').innerHTML=`<div class="card"><h2>📚 Story library</h2><input id="libq" type="search" placeholder="🔍 Search stories (e.g. fox, space, short a)" value="${esc(LF.q)}" oninput="LF.q=this.value;renderLibList()">
 <div class="filt"><b>Grade:</b> ${GRADES.map(g=>`<button class="${LF.g===g[0]?'p':''}" onclick="LF.g='${g[0]}';renderLib()">${g[1]}</button>`).join('')}</div>
 <div class="filt"><b>Type:</b> ${[['all','All'],['story','Stories'],['lesson','Lessons']].map(t=>`<button class="${LF.type===t[0]?'p':''}" onclick="LF.type='${t[0]}';renderLib()">${t[1]}</button>`).join('')}</div>
 <div class="filt"><b>About:</b> ${['',...tags].map(t=>`<button class="${LF.tag===t?'p':''}" onclick="LF.tag='${t}';renderLib()">${t||'Anything'}</button>`).join('')}</div></div><div id="liblist"></div>`;renderLibList()}
function renderLibList(){const sv=getSolo(),G=GRADES.find(x=>x[0]===LF.g);const list=S.filter(s=>s.g>=G[2]&&s.g<=G[3]&&(LF.type==='all'||sType(s)===LF.type)&&(!LF.tag||sTags(s).includes(LF.tag))&&(!LF.q||(s.t+' '+s.lvl+' '+s.focus+' '+s.text).toLowerCase().includes(LF.q.toLowerCase()))).sort((a,b)=>a.g-b.g);
 $('liblist').innerHTML=`<p class="soft">${list.length} of ${S.length}</p><div class="grid">`+list.map(s=>`<div class="card"><div class="soft">${s.lvl}</div><h3>${sType(s)==='lesson'?'🧩 ':''}${s.t} ${sv[s.id]?'⭐'.repeat(sv[s.id].stars):''}</h3><p class="soft">${wc(s)} words · ${sTags(s).slice(0,3).join(', ')}</p><button class="p" onclick="start('${s.id}')">Read together</button> <button onclick="show('solo');soloStart('${s.id}')">⭐ Solo</button> <button onclick="recordFor('${s.id}')">🎙️</button> <button onclick="printPage('${s.id}')">🖨️</button></div>`).join('')+'</div>'+(list.length?'':'<p class="soft">Nothing matches. Try fewer filters.</p>')}
// ---------- Home hub ----------
const ZERO='We collect zero data. No accounts, no tracking, no analytics. Everything stays on this device.';
function renderHub(){const p=curProfile(),D=getDays(),n=streakOf(D),total=Object.keys(D).length,ts=todayStory(p.band),done=!!D[dkey()];
 const msg=done?`Your lamp is lit today! ${n>1?n+' days in a row. ':''}✨`:(n?`${n} day${n>1?'s':''} glowing. Read today to keep it bright.`:(total?'Welcome back! Your lamp is ready to glow again.':'Read or play today to light your lamp.'));
 const A=[['📖','Read','lib'],['⭐','Solo','solo'],['🔤','Letters','letters'],['✍️','Trace','trace'],['🖼️','Cards','cards'],['🎨','Paint','paint'],['🎙️','Record','record'],['👶','Echo','echo']];
 const AGES=[['👶','Babies 0–3',"show('echo')",'Echo · Cards'],['🧸','Pre-K & K',"LF={g:'k',type:'all',tag:'',q:''};show('lib')",'Stories · Letters · Trace'],['📗','Grades 1–2',"LF={g:'g12',type:'all',tag:'',q:''};show('lib')",'Read · Solo'],['🚀','Grades 3–5',"LF={g:'g35',type:'all',tag:'',q:''};show('lib')",'Solo · Mysteries · Space']];
 $('hub').innerHTML=`<div class="card lampcard"><div>${lampSVG(n,140)}</div><div><h2 style="margin:.2em 0">${p.av} Hi, ${esc(p.name)}!</h2><p>${msg}</p>
 <p class="soft">Today's story</p><h3 style="margin:.1em 0">${ts.t}</h3><button class="bigbtn p" onclick="show('solo');soloStart('${ts.id}')">⭐ Read it</button> <button class="bigbtn" onclick="start('${ts.id}')">Read together</button></div></div>
 <h3 class="hh">Pick your age</h3><div class="hubgrid">${AGES.map(a=>`<button class="hubtile age" onclick="${a[2]}"><span>${a[0]}</span>${a[1]}<small>${a[3]}</small></button>`).join('')}</div>
 <h3 class="hh">What do you want to do?</h3><div class="hubgrid">${A.map(a=>`<button class="hubtile" onclick="show('${a[2]}')"><span>${a[0]}</span>${a[1]}</button>`).join('')}</div>
 <h3 class="hh">Grown-ups</h3><div class="hubgrid small">${[['🌙',"Tonight's plan",'home'],['👧','Kids','kids'],['🏫','Daycare','daycare'],['🎨','Look','look'],['🖨️','Print','lib'],['📈','Progress','log'],['❓','Help','about']].map(a=>`<button class="hubtile" onclick="show('${a[2]}')"><span>${a[0]}</span>${a[1]}</button>`).join('')}</div>`}
function renderAdults(){$('adults').innerHTML=`<div class="card"><h2>👪 Grown-ups</h2><div class="hubgrid small">${[['🌙',"Tonight's plan",'home'],['👧','Kids','kids'],['🏫','Daycare','daycare'],['🎨','Look','look'],['🖨️','Print pages (pick a story)','lib'],['📈','Progress','log'],['❓','Help & feedback','about']].map(a=>`<button class="hubtile" onclick="show('${a[2]}')"><span>${a[0]}</span>${a[1]}</button>`).join('')}</div><p class="zero">🔒 ${ZERO}</p></div>`}
// ---------- Picture-word cards ----------
const DECKS={animals:['🐾 Animals','#e9efe2'],home:['🏡 Home','#f3e9dc'],sky:['🌙 Sky','#1f2a44'],food:['🍎 Food','#f6eadf'],body:['✋ Body','#efe6ef'],feel:['💛 Feelings','#f4efd9']};
const CARDS=[['animals','cat','c-aaa-t','🐱'],['animals','dog','d-ooo-g','🐶'],['animals','fish','fff-iii-sh','🐟'],['animals','bee','b-eeee','🐝'],['animals','owl','ooo-wl','🦉'],['animals','duck','d-uuu-ck','🦆'],
['home','bed','b-eee-d','🛏️'],['home','cup','c-uuu-p','☕'],['home','lamp','lll-aaa-mp','🪔'],['home','door','d-ooor','🚪'],['home','book','b-ooo-k','📖'],
['sky','moon','mmm-oooon','🌙'],['sky','sun','sss-uuu-nnn','☀️'],['sky','star','sss-taaar','⭐'],['sky','cloud','c-lll-ouuud','☁️'],['sky','rain','rrr-aaain','🌧️'],
['food','apple','aaa-pple','🍎'],['food','egg','eee-gg','🥚'],['food','milk','mmm-iii-lk','🥛'],['food','bread','b-rrr-eee-d','🍞'],['food','pear','p-eeear','🍐'],
['body','hand','hhh-aaa-nd','✋'],['body','foot','fff-ooo-t','🦶'],['body','eye','eeeye','👁️'],['body','nose','nnn-ooo-zzz','👃'],['body','ear','eeear','👂'],
['feel','happy','hhh-aaa-ppy','😊'],['feel','sad','sss-aaa-d','😢'],['feel','calm','c-aaalm','😌'],['feel','mad','mmm-aaa-d','😠'],['feel','love','lll-uuu-v','💛']];
let CD={deck:null,i:0};
function cardSVG(c){const dark=c[0]==='sky';return `<svg viewBox="0 0 300 300" class="cardart"><defs><radialGradient id="cg"><stop offset="0" stop-color="${dark?'#fff3c4':'#fffaf0'}" stop-opacity="${dark?.55:1}"/><stop offset=".6" stop-color="${dark?'#ffd97a':'#ffe8b0'}" stop-opacity="${dark?.18:.45}"/><stop offset="1" stop-color="#ffd97a" stop-opacity="0"/></radialGradient></defs>
 <rect width="300" height="300" rx="36" fill="${DECKS[c[0]][1]}"/>${dark?[[40,50],[250,70],[70,240],[240,230],[150,30],[30,150]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${1.5+i%3}" fill="#fff6d8" class="twk" style="animation-delay:${i*.4}s"/>`).join(''):''}
 <circle cx="150" cy="150" r="125" fill="url(#cg)" class="glowpulse"/><text x="150" y="150" text-anchor="middle" dominant-baseline="central" font-size="130">${c[3]}</text></svg>`}
function renderCards(){const cnt=safeJSON(LS.get('lamp_cards'),{});
 if(!CD.deck){$('cards').innerHTML=`<div class="card"><h2>🖼️ Picture-word cards</h2><p class="soft">For babies, toddlers, Pre-K and K. Tap a card to hear the word, slowly stretched, then said. Grown-up: say it with them, and let them feel the hum of "mmm" on your cheek.</p></div>
  <div class="hubgrid">${Object.entries(DECKS).map(([k,d])=>`<button class="hubtile" onclick="CD={deck:'${k}',i:0};renderCards()"><span>${CARDS.find(c=>c[0]===k)[3]}</span>${d[0]}<small>${CARDS.filter(c=>c[0]===k).length} cards</small></button>`).join('')}</div>`;return}
 const deck=CARDS.filter(c=>c[0]===CD.deck),c=deck[CD.i%deck.length];
 $('cards').innerHTML=`<div class="card big wcard" style="text-align:center"><div class="soft">${DECKS[CD.deck][0]} · ${CD.i%deck.length+1} of ${deck.length}</div>
 <div class="reveal" onclick="cardSay()" role="button" aria-label="Hear ${c[1]}">${cardSVG(c)}</div>
 <div class="cword" onclick="cardSay()">${[...c[1]].map((l,i)=>`<span style="animation-delay:${.6+i*.18}s">${l}</span>`).join('')}</div>
 <p class="soft stretch">${c[2]}</p>
 <button class="bigbtn" onclick="CD.i=(CD.i+deck.length-1)%deck.length;renderCards()">◀</button> <button class="bigbtn p" onclick="cardSay()">🔊 Hear it</button> <button class="bigbtn" onclick="CD.i++;renderCards()">▶</button><br><button onclick="CD.deck=null;renderCards()">All decks</button></div>`}
function cardSay(){const deck=CARDS.filter(c=>c[0]===CD.deck),c=deck[CD.i%deck.length];document.querySelector('.wcard')?.classList.add('lit');
 try{speechSynthesis.cancel();const a=new SpeechSynthesisUtterance(c[2].replace(/-/g,' '));a.rate=.45;const b=new SpeechSynthesisUtterance(c[1]);b.rate=.8;speechSynthesis.speak(a);speechSynthesis.speak(b)}catch(e){}
 const cnt=safeJSON(LS.get('lamp_cards'),{});cnt[c[1]]=(cnt[c[1]]||0)+1;LS.set('lamp_cards',JSON.stringify(cnt));markDay('cards')}
// ---------- Trace a letter ----------
let TR={L:'A',low:false,cv:null,mask:null,pts:0,hit:null,drawing:false,ink:0,out:0};
function renderTrace(){const L=TR.low?TR.L.toLowerCase():TR.L,got=safeJSON(LS.get('lamp_trace'),{});
 $('trace').innerHTML=`<div class="card big" style="text-align:center"><h2>✍️ Trace a letter</h2><p class="soft">Start at the green dot. Follow the dots with your finger.</p>
 <button class="${!TR.low?'p':''}" onclick="TR.low=false;renderTrace()">Big ABC</button><button class="${TR.low?'p':''}" onclick="TR.low=true;renderTrace()">Little abc</button>
 <div class="trrow">${AB.map(x=>`<button class="pchip ${x===TR.L?'on':''}" onclick="TR.L='${x}';renderTrace()">${TR.low?x.toLowerCase():x}${got[TR.low?x.toLowerCase():x]?'⭐':''}</button>`).join('')}</div>
 <canvas id="trc" width="420" height="420" style="touch-action:none;max-width:100%;border-radius:20px;background:var(--card);border:2px solid var(--acc)"></canvas>
 <p id="trfb" style="font-size:1.4rem;min-height:1.6em"></p><button class="bigbtn" onclick="renderTrace()">↺ Again</button> <button class="bigbtn" onclick="speak('${L}')">🔊</button> <button class="bigbtn p" onclick="TR.L=AB[(AB.indexOf(TR.L)+1)%26];renderTrace()">Next ▶</button></div>`;traceSetup(L)}
function traceSetup(L){const cv=$('trc'),x=cv.getContext('2d'),W=420;TR.cv=cv;TR.done=false;
 const m=document.createElement('canvas');m.width=m.height=W;const mx=m.getContext('2d');mx.font='bold 300px Verdana, Arial, sans-serif';mx.textAlign='center';mx.textBaseline='alphabetic';mx.lineWidth=40;mx.lineJoin='round';
 const base=TR.low&&/[gjpqy]/.test(L)?300:340;mx.strokeStyle='#000';mx.fillStyle='#000';mx.fillText(L,W/2,base);
 const d=mx.getImageData(0,0,W,W).data;const pts=[];for(let y=6;y<W;y+=12)for(let X=6;X<W;X+=12)if(d[(y*W+X)*4+3]>128)pts.push([X,y]);TR.mask=pts;TR.hit=new Uint8Array(pts.length);TR.ink=0;TR.out=0;
 x.clearRect(0,0,W,W);x.font=mx.font;x.textAlign='center';x.setLineDash([4,10]);x.lineWidth=3;x.strokeStyle='#9a8f7d';x.strokeText(L,W/2,base);x.setLineDash([]);x.globalAlpha=.08;x.fillStyle='#5b7a6a';x.fillText(L,W/2,base);x.globalAlpha=1;
 const st=pts.reduce((a,p)=>p[1]<a[1]-6||(Math.abs(p[1]-a[1])<=6&&p[0]<a[0])?p:a,[W,W]);const round=/[cCoOsSeagdqGQ]/.test(L);
 x.fillStyle='#3f9d5a';x.beginPath();x.arc(st[0],st[1],13,0,7);x.fill();x.fillStyle='#fff';x.font='bold 16px sans-serif';x.fillText('1',st[0],st[1]+6);
 x.strokeStyle='#3f9d5a';x.lineWidth=4;x.beginPath();if(round){x.moveTo(st[0]-20,st[1]-22);x.lineTo(st[0]-55,st[1]-22);x.moveTo(st[0]-55,st[1]-22);x.lineTo(st[0]-45,st[1]-30);x.moveTo(st[0]-55,st[1]-22);x.lineTo(st[0]-45,st[1]-14)}else{x.moveTo(st[0]-28,st[1]);x.lineTo(st[0]-28,st[1]+40);x.lineTo(st[0]-36,st[1]+30);x.moveTo(st[0]-28,st[1]+40);x.lineTo(st[0]-20,st[1]+30)}x.stroke();
 const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*W/r.height]};let last=null;
 cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);last=pos(e);traceDot(last)};cv.onpointermove=e=>{if(!last)return;const p=pos(e);x.strokeStyle='#e0a030';x.lineWidth=22;x.lineCap='round';x.beginPath();x.moveTo(...last);x.lineTo(...p);x.stroke();
  const n=Math.ceil(Math.hypot(p[0]-last[0],p[1]-last[1])/6);for(let i=1;i<=n;i++)traceDot([last[0]+(p[0]-last[0])*i/n,last[1]+(p[1]-last[1])*i/n]);last=p};
 cv.onpointerup=cv.onpointercancel=()=>{last=null;traceCheck(L)}}
function traceDot(p){let near=false;TR.mask.forEach((m,i)=>{if((m[0]-p[0])**2+(m[1]-p[1])**2<26*26){TR.hit[i]=1;near=true}});TR.ink++;if(!near)TR.out++}
function traceCheck(L){if(TR.done)return;const cov=TR.hit.reduce((a,b)=>a+b,0)/TR.mask.length,stray=TR.out/Math.max(TR.ink,1);
 if(cov>=0.6&&stray<0.45){TR.done=true;const g=safeJSON(LS.get('lamp_trace'),{});g[L]=(g[L]||0)+1;LS.set('lamp_trace',JSON.stringify(g));markDay('trace');$('trfb').textContent='⭐ Beautiful '+L+'!';speak('Yes! '+L+'!');setTimeout(()=>{if($('trfb'))renderTrace()},1800)}
 else $('trfb').textContent=cov>0.25?'Keep going! Cover the rest of the dots.':'Start at the green dot and follow the dots.';return cov}
// ---------- Record yourself ----------
let RC={rec:null,chunks:[],clips:[],sid:null,stream:null};
function recordFor(id){RC.sid=id;show('record')}
function recStopAll(){try{if(RC.rec&&RC.rec.state!=='inactive')RC.rec.stop()}catch(e){}if(RC.stream){RC.stream.getTracks().forEach(t=>t.stop());RC.stream=null}}
function renderRecord(){const p=curProfile(),s=S.find(x=>x.id===RC.sid)||todayStory(p.band),ok=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
 $('record').innerHTML=`<div class="card big"><h2>🎙️ Record yourself</h2><p class="soft">🔒 Recordings stay only in this screen on this device. They are never uploaded, and they disappear when you close the app.</p>
 <h3>${s.t} <button onclick="show('lib')" class="soft" style="font-size:.9rem">pick another</button></h3><p class="story" style="font-size:calc(var(--fs,1.6rem)*.9)">${s.text.replace(/\n/g,'<br>')}</p>
 ${ok?`<button class="bigbtn p" id="recb" onclick="recToggle()">⏺ Start recording</button>`:''} <span id="recmsg" class="soft">${ok?'':'This browser cannot record here. You can still read aloud to a grown-up!'}</span>
 <div id="clips">${RC.clips.map((c,i)=>`<div class="clip">🎧 Take ${i+1} <audio controls src="${c}"></audio></div>`).join('')}</div></div>`}
async function recToggle(){const b=$('recb');if(RC.rec&&RC.rec.state==='recording'){RC.rec.stop();return}
 try{RC.stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){$('recmsg').textContent='No microphone found or permission was not given. That is OK! Read aloud to a grown-up instead.';return}
 RC.chunks=[];RC.rec=new MediaRecorder(RC.stream);RC.rec.ondataavailable=e=>e.data.size&&RC.chunks.push(e.data);
 RC.rec.onstop=()=>{const u=URL.createObjectURL(new Blob(RC.chunks,{type:RC.rec.mimeType||'audio/webm'}));RC.clips.push(u);if(RC.stream){RC.stream.getTracks().forEach(t=>t.stop());RC.stream=null}markDay('record');renderRecord();$('recmsg').textContent='Listen back! How did you sound?'};
 RC.rec.start();b.textContent='⏹ Stop';$('recmsg').textContent='🔴 Recording… read the story out loud!'}
// ---------- Daycare mode ----------
let DC={sheet:null};
function weekRows(pid){const D=getDays(pid),log=safeJSON(RAW.get('lamp_log@'+pid),[]),solo=safeJSON(RAW.get('lamp_solo@'+pid),{});const rows=[];
 for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dkey(d),a=D[k]||{};const rd=log.filter(e=>dkey(new Date(e.date))===k),so=Object.entries(solo).filter(([,v])=>v.date&&dkey(new Date(v.date))===k);
  rows.push({d,a,stories:[...rd.map(e=>(S.find(s=>s.id===e.story)||{}).t),...so.map(([id])=>(S.find(s=>s.id===id)||{}).t)].filter(Boolean)})}return rows}
function renderDaycare(){const P=getProfiles();
 if(DC.sheet){const ids=DC.sheet==='all'?P.list.map(p=>p.id):[DC.sheet];
  $('daycare').innerHTML=`<div class="noprint card"><button class="p" onclick="print()">🖨️ Print</button> <button onclick="DC.sheet=null;renderDaycare()">⬅ Back</button></div>`+ids.map(id=>{const p=P.list.find(x=>x.id===id),s=pStats(id),R=weekRows(id),n=streakOf(getDays(id));
   return `<div class="card sheet"><h2>${p.av} ${esc(p.name)}: this week at Lamplight Learning</h2><p class="soft">${BANDS[p.band]||''} · week ending ${new Date().toLocaleDateString()} · lamp streak: ${n} day${n===1?'':'s'}</p>
   <table><tr><th>Day</th><th>Read</th><th>Solo</th><th>Letters</th><th>Trace</th><th>Cards</th><th>Echo</th><th>Stories</th></tr>${R.map(r=>`<tr><td>${r.d.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</td>${['read','solo','letters','trace','cards','echo'].map(k=>`<td>${r.a[k]?'✔ '+r.a[k]:''}</td>`).join('')}<td>${r.stories.join(', ')}</td></tr>`).join('')}</table>
   <p><b>So far:</b> ${s.read} stor${s.read===1?'y':'ies'} read together · ${s.stars} solo stars · ${s.letters}/26 letters known · ${Object.keys(safeJSON(RAW.get('lamp_trace@'+id),{})).length} letters traced</p><p>Notes from the teacher: ____________________________________________</p><p class="soft">🔒 ${ZERO}</p></div>`}).join('');return}
 $('daycare').innerHTML=`<div class="card"><h2>🏫 Daycare mode</h2><p class="soft">Tap a child to switch to them. Print a weekly sheet for parents.</p>
 <div class="hubgrid">${P.list.map(p=>`<button class="hubtile ${p.id===P.cur?'cur':''}" onclick="switchP('${p.id}');show('hub')"><span>${p.av}</span>${esc(p.name)}<small>${BANDS[p.band]||''} · 🪔 ${streakOf(getDays(p.id))}</small></button>`).join('')}<button class="hubtile" onclick="show('kids');editP(null)"><span>＋</span>Add a child</button></div>
 <h3>Weekly sheets for parents</h3><p>${P.list.map(p=>`<button onclick="DC.sheet='${p.id}';renderDaycare()">📄 ${p.av} ${esc(p.name)}</button>`).join(' ')} <button class="p" onclick="DC.sheet='all';renderDaycare()">📄 All children</button></p></div>`}
// ---------- Printable story pages ----------
const OUTL={star:'<path d="M100 15 L124 75 L188 78 L138 118 L156 182 L100 146 L44 182 L62 118 L12 78 L76 75 Z"/>',moon:'<path d="M130 20 A85 85 0 1 0 170 150 A65 65 0 1 1 130 20 Z"/><circle cx="60" cy="40" r="6"/><circle cx="170" cy="40" r="4"/>',
 fox:'<path d="M40 40 L70 90 L130 90 L160 40 L150 120 Q100 185 50 120 Z"/><circle cx="80" cy="115" r="7"/><circle cx="120" cy="115" r="7"/><path d="M92 140 L108 140 L100 150 Z"/>',
 house:'<path d="M30 95 L100 30 L170 95"/><rect x="45" y="95" width="110" height="85"/><rect x="85" y="130" width="30" height="50"/><rect x="55" y="110" width="22" height="22"/><rect x="123" y="110" width="22" height="22"/>',
 rocket:'<path d="M100 15 Q140 60 130 140 L70 140 Q60 60 100 15 Z"/><circle cx="100" cy="75" r="16"/><path d="M70 110 L45 160 L72 140 M130 110 L155 160 L128 140 M85 140 L100 185 L115 140"/>',
 tree:'<circle cx="100" cy="75" r="55"/><circle cx="60" cy="100" r="30"/><circle cx="140" cy="100" r="30"/><rect x="88" y="120" width="24" height="65"/>'};
function outlineFor(s){const t=(s.t+' '+s.text).toLowerCase();const k=/fox|cat|dog|bear/.test(t)?'fox':/rocket|planet|comet|space/.test(t)?'rocket':/moon|night/.test(t)?'moon':/star/.test(t)?'star':/tree|leaf|garden|seed/.test(t)?'tree':'house';
 return `<svg viewBox="0 0 200 200" width="260" height="260" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round">${OUTL[k]}</svg>`}
function printPage(id){const s=S.find(x=>x.id===id);show('print');const kw=s.words.filter(w=>/^[a-z']+$/i.test(w)).slice(0,4);
 $('print').innerHTML=`<div class="card ppage"><p class="noprint"><button class="p" onclick="print()">🖨️ Print this page</button> <button onclick="show('lib')">⬅ Library</button> <button onclick="printSheet('${s.id}')">Practice sheet instead</button></p>
 <p>Name: ______________ &nbsp; Date: ________</p><h1 style="font-size:2rem;font-weight:normal">${s.t}</h1><div class="ptext">${s.text.replace(/\n/g,'<br>')}</div>
 <h3>Trace the words</h3>${kw.map(w=>`<div class="tline"><span class="tw">${w}</span><span class="tw">${w}</span><span class="tw">${w}</span></div>`).join('')}
 <h3>Color it in</h3><div style="text-align:center">${outlineFor(s)}</div><p class="soft">Lamplight Learning · ${s.lvl}</p></div>`}
// ---------- Paint Studio ----------
const PCOL=[['#e53935','red'],['#fb8c00','orange'],['#fdd835','yellow'],['#43a047','green'],['#1e88e5','blue'],['#8e24aa','purple'],['#ec407a','pink'],['#6d4c41','brown'],['#ffffff','white'],['#212121','black']];
const WHEEL=[['red',0],['red-orange',15],['orange',30],['yellow-orange',45],['yellow',60],['yellow-green',90],['green',120],['teal',165],['cyan',180],['blue',220],['violet',265],['magenta',300]];
const MIX={'blue+yellow':['green','Blue and yellow paint make green!'],'red+yellow':['orange','Red and yellow make orange, like a sunset.'],'blue+red':['purple','Red and blue make purple.'],'red+white':['pink','White makes a color lighter: red becomes pink.'],'black+red':['brown','A little black makes red darker, like brown.'],'blue+white':['sky blue','White plus blue gives sky blue.'],'green+red':['brown','Opposite colors mixed make a muddy brown. Opposites cancel out!'],'orange+blue':['brown','Opposites (blue and orange) mix to brown.'],'purple+yellow':['brown','Opposites (purple and yellow) mix to brown.']};
const MIXHEX={green:'#43a047',orange:'#fb8c00',purple:'#8e24aa',pink:'#f48fb1','sky blue':'#81d4fa',brown:'#795548'};
let PT={tool:'brush',col:'#1e88e5',size:16,sym:6,mirror:true,dark:true,hue:0,undo:[],stamp:'⭐',mixA:'blue',mixB:'yellow',light:false};
function renderPaint(){document.body.classList.add('painting');
 $('paint').innerHTML=`<div id="pstudio"><div class="pbar">
 <button onclick="show('hub')" title="Leave">✖</button>
 ${[['brush','🖌️'],['rainbow','🌈'],['glow','✨'],['stamp','⭐'],['eraser','🧽']].map(t=>`<button class="${PT.tool===t[0]?'on':''}" onclick="PT.tool='${t[0]}';renderPaintBar()" title="${t[0]}">${t[1]}</button>`).join('')}
 <span class="pcols">${PCOL.map(c=>`<button class="pc ${PT.col===c[0]?'on':''}" style="background:${c[0]}" title="${c[1]}" onclick="PT.col='${c[0]}';if(PT.tool==='eraser'||PT.tool==='stamp')PT.tool='brush';renderPaintBar()"></button>`).join('')}</span>
 <input type="range" min="3" max="60" value="${PT.size}" style="width:110px" oninput="PT.size=+this.value" title="Brush size">
 <select style="width:auto" onchange="PT.sym=+this.value;guides()">${[[1,'No mirror'],[2,'Mirror ⟷'],[4,'Kaleido 4'],[6,'Kaleido 6'],[8,'Kaleido 8'],[12,'Mandala 12']].map(o=>`<option value="${o[0]}" ${PT.sym===o[0]?'selected':''}>${o[1]}</option>`).join('')}</select>
 ${PT.tool==='stamp'?`<select style="width:auto" onchange="PT.stamp=this.value">${['⭐','🌙','✨','💛','🌸','🦊','A','B','C','a','b','c'].map(s=>`<option ${PT.stamp===s?'selected':''}>${s}</option>`).join('')}</select>`:''}
 <button onclick="paintUndo()" title="Undo">↶</button><button onclick="PT.dark=!PT.dark;paintClear(true)" title="Night/day paper">${PT.dark?'🌑':'☀️'}</button><button onclick="paintClear()" title="Clear">🗑️</button><button onclick="paintSave()" title="Save picture">💾</button><button onclick="toggleLab()" title="Color lab">🔬</button></div>
 <canvas id="pcv"></canvas><canvas id="pgd"></canvas><div id="plab" class="hidden"></div></div>`;
 paintSetup()}
function renderPaintBar(){const keep=$('pcv'),img=keep&&keep.toDataURL();const u=PT.undo;renderPaint();PT.undo=u;if(img){const im=new Image();im.onload=()=>{const c=$('pcv');c.getContext('2d').drawImage(im,0,0)};im.src=img}}
function paintSetup(){const cv=$('pcv'),g=$('pgd'),dpr=Math.min(window.devicePixelRatio||1,1.5);const r=cv.getBoundingClientRect();
 [cv,g].forEach(c=>{c.width=Math.max(300,Math.round(r.width*dpr));c.height=Math.max(300,Math.round(r.height*dpr))});PT.dpr=dpr;
 const x=cv.getContext('2d');if(!PT.inited){paintBg(x);PT.inited=true}else paintBg(x);guides();
 let last=null;const pos=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)*cv.width/b.width,(e.clientY-b.top)*cv.height/b.height]};
 cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);pushUndo();last=pos(e);if(PT.tool==='stamp'){paintStamp(last);last=null}else paintSeg(last,last)};
 cv.onpointermove=e=>{if(!last)return;const p=pos(e);paintSeg(last,p);last=p};cv.onpointerup=cv.onpointercancel=()=>{last=null}}
function paintBg(x){x.globalCompositeOperation='source-over';x.fillStyle=PT.dark?'#0d0f1a':'#fffdf8';x.fillRect(0,0,x.canvas.width,x.canvas.height)}
function guides(){const g=$('pgd');if(!g)return;const x=g.getContext('2d');x.clearRect(0,0,g.width,g.height);if(PT.sym<2)return;const cx=g.width/2,cy=g.height/2,R=Math.hypot(cx,cy);x.strokeStyle=PT.dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.07)';x.lineWidth=1;
 for(let i=0;i<PT.sym;i++){const a=i*2*Math.PI/PT.sym-Math.PI/2;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));x.stroke()}}
function symPts(p){const cv=$('pcv'),cx=cv.width/2,cy=cv.height/2,dx=p[0]-cx,dy=p[1]-cy,out=[];if(PT.sym<2)return[p];
 if(PT.sym===2)return[p,[cx-dx,p[1]]];const n=PT.sym/ (PT.mirror?2:1);for(let i=0;i<n;i++){const a=i*2*Math.PI/n,c=Math.cos(a),s=Math.sin(a);out.push([cx+dx*c-dy*s,cy+dx*s+dy*c]);if(PT.mirror)out.push([cx-(dx*c-dy*s),cy+dx*s+dy*c])}return out}
function brushStyle(x){const t=PT.tool;x.globalCompositeOperation='source-over';x.shadowBlur=0;
 if(t==='eraser'){x.strokeStyle=PT.dark?'#0d0f1a':'#fffdf8'}else if(t==='rainbow'){PT.hue=(PT.hue+3)%360;x.strokeStyle=`hsl(${PT.hue},90%,60%)`}else if(t==='glow'){x.globalCompositeOperation=PT.dark?'lighter':'source-over';x.shadowBlur=PT.size*1.2;x.shadowColor=PT.col;x.strokeStyle=PT.col}else x.strokeStyle=PT.col}
function paintSeg(a,b){const x=$('pcv').getContext('2d');brushStyle(x);x.lineWidth=PT.size*PT.dpr*(PT.tool==='glow'?.6:1);x.lineCap=x.lineJoin='round';const A=symPts(a),B=symPts(b);x.beginPath();for(let i=0;i<A.length;i++){x.moveTo(...A[i]);x.lineTo(...B[i])}x.stroke();x.shadowBlur=0;x.globalCompositeOperation='source-over'}
function paintStamp(p){const x=$('pcv').getContext('2d');x.font=`bold ${PT.size*3*PT.dpr}px Verdana, sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=PT.col;symPts(p).forEach(q=>x.fillText(PT.stamp,q[0],q[1]))}
function pushUndo(){const c=$('pcv');try{PT.undo.push(c.getContext('2d').getImageData(0,0,c.width,c.height));if(PT.undo.length>12)PT.undo.shift()}catch(e){}}
function paintUndo(){const u=PT.undo.pop();if(u)$('pcv').getContext('2d').putImageData(u,0,0)}
function paintClear(noAsk){if(!noAsk&&!confirm('Clear the whole picture?'))return;pushUndo();if(noAsk){renderPaint();return}paintBg($('pcv').getContext('2d'))}
function paintSave(){const a=document.createElement('a');a.href=$('pcv').toDataURL('image/png');a.download='lamplight-painting-'+dkey()+'.png';document.body.appendChild(a);a.click();a.remove();markDay('paint')}
function toggleLab(){const l=$('plab');l.classList.toggle('hidden');if(!l.classList.contains('hidden'))renderLab()}
function renderLab(){const names=PCOL.map(c=>c[1]),k=[PT.mixA,PT.mixB].sort().join('+'),hx=n=>(PCOL.find(c=>c[1]===n)||[])[0];
 let res,why;if(PT.light){const add={red:[1,0,0],green:[0,1,0],blue:[0,0,1]};const s=[0,1,2].map(i=>Math.min(1,(add[PT.mixA]||[0,0,0])[i]+(add[PT.mixB]||[0,0,0])[i]));const nm={'1,1,0':'yellow','1,0,1':'magenta','0,1,1':'cyan','1,0,0':'red','0,1,0':'green','0,0,1':'blue'}[s.join()]||'';res=`rgb(${s.map(v=>v*255)})`;why=PT.mixA===PT.mixB?'Same light, just brighter.':`Red, green and blue LIGHT add up. ${PT.mixA} + ${PT.mixB} light = ${nm}! Screens make every color this way.`}
 else{const m=PT.mixA===PT.mixB?[PT.mixA,'Same color, more of it!']:MIX[k];res=m?(MIXHEX[m[0]]||hx(m[0])):'#8d7b68';why=m?m[1]:'Many paints mixed together get darker and browner. Paint takes away light.'}
 const opts=PT.light?['red','green','blue']:names.slice(0,9);
 $('plab').innerHTML=`<div class="labcard"><button style="float:right" onclick="toggleLab()">✖</button><h3>🔬 Color lab</h3>
 <button class="${!PT.light?'p':''}" onclick="PT.light=false;PT.mixA='blue';PT.mixB='yellow';renderLab()">🎨 Paint</button><button class="${PT.light?'p':''}" onclick="PT.light=true;PT.mixA='red';PT.mixB='green';renderLab()">💡 Light</button>
 <div class="mixrow"><select style="width:auto" onchange="PT.mixA=this.value;renderLab()">${opts.map(n=>`<option ${n===PT.mixA?'selected':''}>${n}</option>`).join('')}</select>
 <span class="blob" style="background:${PT.light?{red:'#f00',green:'#0f0',blue:'#00f'}[PT.mixA]:hx(PT.mixA)}"></span> + <span class="blob" style="background:${PT.light?{red:'#f00',green:'#0f0',blue:'#00f'}[PT.mixB]:hx(PT.mixB)}"></span>
 <select style="width:auto" onchange="PT.mixB=this.value;renderLab()">${opts.map(n=>`<option ${n===PT.mixB?'selected':''}>${n}</option>`).join('')}</select> = <span class="blob big2" style="background:${res}"></span></div>
 <p>${why}</p><button onclick="PT.col='${res}'.startsWith('rgb')?rgbHex('${res}'):'${res}';PT.tool='brush';renderPaintBar()">🖌️ Paint with this</button>
 <h3>🎡 Color wheel</h3><p class="soft">Tap a color. Its opposite (complement) glows across the wheel. Opposites make each other pop!</p><div style="text-align:center">${wheelSVG()}</div><p id="wfact" style="min-height:3em"></p>
 <p class="soft">Fun fact: your eyes have just three kinds of color sensors (for red-ish, green-ish and blue-ish light). Every color you see is a mix of those three signals, so colors live in a 3-D "color space." Magenta isn't in the rainbow at all: your brain invents it when red and blue light arrive together!</p></div>`}
function rgbHex(s){return'#'+s.match(/\d+/g).map(v=>(+v).toString(16).padStart(2,'0')).join('')}
function wheelSVG(sel){const n=WHEEL.length;return `<svg viewBox="-110 -110 220 220" width="240" height="240">${WHEEL.map((w,i)=>{const a0=(i-.5)*2*Math.PI/n-Math.PI/2,a1=(i+.5)*2*Math.PI/n-Math.PI/2,R=100,r=45;
 const d=`M${r*Math.cos(a0)} ${r*Math.sin(a0)} L${R*Math.cos(a0)} ${R*Math.sin(a0)} A${R} ${R} 0 0 1 ${R*Math.cos(a1)} ${R*Math.sin(a1)} L${r*Math.cos(a1)} ${r*Math.sin(a1)} A${r} ${r} 0 0 0 ${r*Math.cos(a0)} ${r*Math.sin(a0)}Z`;
 const on=sel===i||sel===(i+n/2)%n?'stroke="#fff" stroke-width="4"':'stroke="#0000"';return `<path d="${d}" fill="hsl(${w[1]},85%,55%)" ${on} onclick="wheelPick(${i})" style="cursor:pointer"/>`}).join('')}${sel!=null?`<circle r="40" fill="hsl(${WHEEL[sel][1]},85%,55%)"/>`:''}</svg>`}
function wheelPick(i){const n=WHEEL.length,c=WHEEL[(i+n/2)%n];const svg=document.querySelector('#plab svg:last-of-type');document.querySelector('#plab div[style] svg').outerHTML=wheelSVG(i);
 $('wfact').innerHTML=`<b>${WHEEL[i][0]}</b>: its opposite is <b>${c[0]}</b>. <button onclick="PT.col='${hsl2hex(WHEEL[i][1])}';PT.tool='brush';renderPaintBar()">🖌️ Use ${WHEEL[i][0]}</button>`;speak(WHEEL[i][0]+'. Its opposite is '+c[0])}
function hsl2hex(h){const s=.85,l=.55,k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));return'#'+[f(0),f(8),f(4)].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('')}
// ---------- Hook streak into existing activities ----------
{const f0=finish;finish=function(){markDay('read');f0()};const f1=soloDone;soloDone=function(){markDay('solo');f1()};const f2=echoDone;echoDone=function(){markDay('echo');f2()};const f3=letGot;letGot=function(L){markDay('letters');f3(L)}}
// ---------- Nav, footer, zero-data ----------
document.querySelector('header nav').innerHTML=`<button onclick="show('hub')">🏠 Home</button><button onclick="show('lib')">📚 Library</button><button onclick="show('adults')">👪 Grown-ups</button>`;
document.querySelector('header h1').style.cursor='pointer';document.querySelector('header h1').onclick=()=>show('hub');
document.body.insertAdjacentHTML('beforeend',`<footer class="noprint zero">🔒 ${ZERO}</footer>`);
{const ra=renderAbout;renderAbout=function(){ra();$('about').insertAdjacentHTML('afterbegin',`<div class="card zerobox"><h2>🔒 Zero data</h2><p style="font-size:1.15rem">${ZERO}</p><p class="soft">No sign-ups, no ads, no cookies for tracking, no outside fonts or scripts. Progress, notes, paintings and recordings never leave this device unless you save a file yourself.</p></div>
 <div class="card"><h3>Where to find things</h3><ul><li><b>🏠 Home</b>: today's story, the kid's lamp (it glows brighter with each day in a row; missing a day is fine), and big buttons by age and by activity.</li><li><b>📚 Library</b>: every story and lesson, filter by grade, type, topic, or search. Each has Read together, Solo, 🎙️ Record and 🖨️ Print.</li><li><b>👪 Grown-ups</b>: Kids, Daycare (big tiles + weekly parent sheets), Look, Progress, Help.</li></ul></div>`);
 const tr=document.querySelector('#fb_tried');if(tr)tr.insertAdjacentHTML('beforeend',['Cards','Trace','Paint','Record','Daycare','Daily lamp'].map(x=>`<label style="display:inline-block;margin-right:12px"><input type="checkbox" style="width:auto" value="${x}"> ${x}</label>`).join(''))}}
show('hub');
