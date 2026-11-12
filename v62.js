// v62: offline retries/resume, Word Kinds stars, 27 reachable rhythm levels,
// content-language tracing guard, common ladder vocabulary, unique syllables, and name-only Echo letters.
// No audio assets are added or changed.
// ---------- Offline: bounded requests, backoff and resumable failures ----------
const OFF62_DELAYS=[500,1500,3500],OFF62_TIMEOUT=12000;
const offWait62=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function offRetry62(work){let error;for(let attempt=0;attempt<=OFF62_DELAYS.length;attempt++){try{return await work()}catch(e){error=e;if(attempt<OFF62_DELAYS.length)await offWait62(OFF62_DELAYS[attempt])}}throw error}
async function offFetch62(file,consume){return offRetry62(async()=>{const controller=new AbortController();let timer;
 try{return await Promise.race([(async()=>{const r=await fetch(file,{cache:'no-cache',signal:controller.signal});if(!r.ok)throw new Error('HTTP '+r.status);
  // The service worker's offline HTML fallback must not be saved as audio/JSON/JS.
  if(file!=='./'&&!/\.html$/.test(file)&&/text\/html/i.test(r.headers.get('content-type')||''))throw new Error('Offline fallback');return consume(r)})(),new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('Download timed out'))},OFF62_TIMEOUT)})])}
 finally{clearTimeout(timer)}})}
// Also retry the manifest; bad JSON/HTML is a failed attempt, never a successful save.
offList=async function(){return offFetch62(AFMT==='opus'?'offline-opus.json':'offline.json',async r=>{const d=await r.json();if(!Array.isArray(d.files)||!d.files.every(x=>Array.isArray(x)&&x.length===2&&typeof x[0]==='string'&&Number.isFinite(x[1])&&x[1]>=0))throw new Error('Invalid manifest');return d})};
function offProgress62(){const bar=$('offbar');if(bar){bar.value=OFF.bytes||0;bar.max=OFF.size||1;bar.classList.toggle('hidden',!OFF.busy&&!OFF.retry)}
 const m=$('offmsg');if(m){m.setAttribute('role','status');m.setAttribute('aria-live','polite');m.textContent=OFF.busy&&OFF.count?gT('Saving… {a}/{b} files ({c} of {d})',{a:gNum(OFF.done||0),b:gNum(OFF.count),c:fmtMB(OFF.bytes||0),d:fmtMB(OFF.size||0)}):OFF.msg}}
{const ro=renderOffline;renderOffline=function(){ro();offProgress62();if(OFF.retry&&!OFF.busy){const el=$('offcard');if(el)el.insertAdjacentHTML('beforeend',`<p><button class="bigbtn p" data-off-retry onclick="offSave()">${gT('Try again')}</button></p>`)}}}
offSave=async function(){if(OFF.busy)return;OFF.busy=true;OFF.retry=false;OFF.failed=[];OFF.done=0;OFF.bytes=0;OFF.msg=gT('Preparing offline download…');RAW.del('lamp_offline_all');renderOffline();
 try{if(!('caches' in window))throw new Error('Storage unavailable');
  try{if(navigator.storage?.persist)OFF.persist=await navigator.storage.persist()}catch(e){}
  const L=await offList();OFF.size=L.bytes;OFF.count=L.files.length;
  const cache=await caches.open(XC),queue=L.files.slice();
  // On a new release, refresh app/content files; immutable audio/font assets can be reused.
  const version=String(APP_VERSION),sameVersion=RAW.get('lamp_offline_version')===version;
  if(!sameVersion&&!OFF.fresh62)OFF.fresh62=new Set();
  const bar=()=>offProgress62();bar();
  await Promise.all(Array.from({length:6},async()=>{while(queue.length){const [file,size]=queue.shift();try{
   const old=await cache.match(file),immutable=/\.(mp3|opus|woff2|txt)$/.test(file),current=sameVersion||immutable||OFF.fresh62?.has(file);
   if(!old||!old.ok||!current)await offFetch62(file,r=>cache.put(file,r));
   if(OFF.fresh62)OFF.fresh62.add(file);OFF.done++;OFF.bytes+=size;
  }catch(e){OFF.failed.push(file)}bar()}}));
  if(OFF.failed.length)throw new Error('Files remain');
  RAW.set('lamp_offline_all','1');RAW.set('lamp_offline_version',version);OFF.msg=gT('Everything is saved ({size}). Every voice, language and song now works without internet.',{size:fmtMB(L.bytes)});
 }catch(e){OFF.retry=true;OFF.msg=gT('Some files could not be saved. Tap Try again to resume.')}
 finally{OFF.busy=false;renderOffline()}
};
{const remove=offRemove;offRemove=async function(){if(OFF.busy)return;OFF.fresh62=null;OFF.retry=false;OFF.failed=[];OFF.done=0;OFF.bytes=0;RAW.del('lamp_offline_version');return remove.apply(this,arguments)}}
// ---------- Word Kinds: only a complete sentence earns the one displayed star ----------
{const wn=wkNew;wkNew=function(){wn.apply(this,arguments);WKS.complete62=false}}
wkTap=function(i){const t=WKS.toks&&WKS.toks[i];if(!t||t.done||WKS.complete62)return;
 if(t.k===WKS.want){t.done=1;WKS.found++;const need=WKS.toks.filter(x=>x.k===WKS.want).length;
  if(WKS.found>=need){if(WKS.queue&&WKS.queue.length){WKS.want=WKS.queue.shift();WKS.found=0;WKS.msg=gT('Great! Now find the next kind.')}
   else{WKS.complete62=true;WKS.got++;WKS.msg=gT('You found them all!');const g=gStars();g.wk=(g.wk||0)+1;LS.set('lamp_games',JSON.stringify(g));markDay('words');l61Sound()}}
  else WKS.msg=gT('Yes!');
 }else{t.bad=1;const kk=t.k?WKN[t.k][0]:'';WKS.msg=kk?gT('That one is a {kind}.',{kind:gT(kk).toLowerCase()}):gT('Not that one. Try another!')}
 wkRender()
};
// ---------- Rhythm count: v27 had 12; v60 added 7, so 19, not the reported 27. ----------
// None of the v60 levels were lost. These eight distinct patterns fill the promised 27 slots.
{const gi=RXL.findIndex(x=>x.g);RXL.splice(gi,0,
 {id:'k13',n:'Steady lanterns',bpm:80,len:12,hits:RXP([0,1,2,3,4,5,6,7,8,9,10,11])},
 {id:'k14',n:'Little rests',bpm:90,len:12,hits:RXP([0,1,3,4,6,7,9,10])},
 {id:'k15',n:'Two-pad steps',bpm:95,len:8,hits:[0,1,2,3,4,5,6,7].map((t,i)=>[t,i%2?RXC:RXK])},
 {id:'k16',n:'Three-pad trail',bpm:100,len:12,hits:[0,1,2,3,4,5,6,7,8,9,10,11].map((t,i)=>[t,[RXK,RXC,RXH][i%3]])});
 RXL.push({id:'g8',n:'Off-beat reply',bpm:100,len:8,g:1,win:95,hits:[[0,RXK],[.5,RXC],[2,RXK],[2.5,RXC],[4,RXK],[4.5,RXC],[6,RXK],[6.5,RXC]]},
 {id:'g9',n:'Three-against-two trail',bpm:80,len:8,g:1,win:100,hits:[...[0,2,4,6].map(t=>[t,RXK]),...[0,4/3,8/3,4,16/3,20/3].map(t=>[t,RXC])]},
 {id:'g10',n:'Quiet spaces',bpm:100,len:16,g:1,win:85,once:1,hits:[[0,RXK],[1.5,RXC],[4,RXK],[5.5,RXH],[8,RXK],[9.5,RXC],[12,RXK],[13.5,RXH]]},
 {id:'g11',n:'Lantern finale',bpm:120,len:16,g:1,win:75,hits:[0,1,1.5,3,4,5,5.5,7,8,9,9.5,11,12,13,13.5,15].map((t,i)=>[t,[RXK,RXC,RXH][i%3]])})}
// ---------- Tracing language gate, including direct navigation ----------
if(!CONTENT.includes(LANG)){
 document.head.insertAdjacentHTML('beforeend',`<style>[onclick*="show('trace')"],[onclick*="TR.cur="]{display:none!important}</style>`);
 for(let i=GHUB.length-1;i>=0;i--)if(GHUB[i][0]==='wk')GHUB.splice(i,1);
}
{if(!show._v97){const sh=show;show=function(id){if(id==='trace'&&!CONTENT.includes(LANG))id='hub';return sh.apply(this,[id])}}}
{const rg=RENDER.games;RENDER.games=function(){if(GM.v==='wk'&&!CONTENT.includes(LANG))GM.v=null;return rg.apply(this,arguments)}}
// ---------- Syllable words: one spelling, one canonical split ----------
{const seen=new Set(),words=SPW.filter(w=>{const key=w.replace(/\|/g,'').toLowerCase();if(seen.has(key))return false;seen.add(key);return true}).map(w=>w==='zeb|ra'?'ze|bra':w);SPW.splice(0,SPW.length,...words)}
// ---------- Echo letters: only the selected language/voice's existing n_a/n_b ----------
function echoLetterVoice62(){return CONTENT.includes(LANG)?curVoice():null}
SBOARD.forEach(g=>g[1].forEach(x=>{if(x[0]==='a'||x[0]==='b'){x[2]=x[0].toUpperCase();x[3]=['n_'+x[0]]}}));
function echoLetterHide62(el){if(el)el.hidden=true;const grid=el?.closest('.sbgrid');if(grid){const hidden=[...grid.querySelectorAll('button')].every(b=>b.hidden);grid.hidden=hidden;if(grid.previousElementSibling?.tagName==='H3')grid.previousElementSibling.hidden=hidden}}
let echoLetterRender62=0;
{const re=RENDER.echo;RENDER.echo=renderEcho=function(){re.apply(this,arguments);const token=++echoLetterRender62,v=echoLetterVoice62();
 const bs=[...document.querySelectorAll('#echo [data-sb="a"],#echo [data-sb="b"]')];bs.forEach(echoLetterHide62);if(!v)return;
 voiceIndex(v).then(set=>{if(token!==echoLetterRender62||v!==echoLetterVoice62())return;bs.forEach(el=>{if(!el.isConnected||!set.has('n_'+el.dataset.sb))return;el.hidden=false;const grid=el.closest('.sbgrid');grid.hidden=false;if(grid.previousElementSibling?.tagName==='H3')grid.previousElementSibling.hidden=false})}).catch(()=>{})
}}
{const tap=sbTap;sbTap=async function(el,id){if(id!=='a'&&id!=='b')return tap.apply(this,arguments);musicStop();const v=echoLetterVoice62();if(!v)return echoLetterHide62(el);
 const set=await voiceIndex(v);if(!set.has('n_'+id))return echoLetterHide62(el);const buf=await loadClip('n_'+id,v);
 if(v!==echoLetterVoice62()||$('echo').classList.contains('hidden')||!el?.isConnected)return;
 if(!buf){delete BUF[v+'/n_'+id];return echoLetterHide62(el)}
 document.querySelectorAll('.sbbtn.say').forEach(x=>x.classList.remove('say'));el.classList.add('say');setTimeout(()=>el.classList.remove('say'),Math.min(1600,buf.duration*1000+100));return playClip(buf,0,1)
}}
// Author styles must not override the hidden attribute on sound-board buttons/grids.
document.head.insertAdjacentHTML('beforeend','<style>#echo [hidden]{display:none!important}</style>');
