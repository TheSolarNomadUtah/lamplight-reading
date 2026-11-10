// v73: one 3-stage Lamp companion. Growth from connection and retry moments, never speed or scores.
// No new audio files or voice edits. Soft WebAudio chimes only. Per-child, on this device.
PKEYS.push('lamp_companion');
const LAMP73={need:[0,3,8],midi:[60,64,67],limit:10**(-1.5/20),shown:false,raf:0,away:false};
(function lampSfxInit73(){const on=RAW.get('lamp_sfx')!=='off';window.LAMP_SFX=on})();
function lampSfxOn73(){return window.LAMP_SFX!==false&&RAW.get('lamp_sfx')!=='off'}
function lampSfxSet73(on){RAW.set('lamp_sfx',on?'on':'off');window.LAMP_SFX=!!on;if($('look')&&!$('look').classList.contains('hidden'))renderLook()}
function lampDefault73(){return {schema:1,name:'',moments:0,stage:1,pending:[],lastSeen:0,hiddenAt:0}}
function lampLoad73(pid){const raw=safeJSON(RAW.get('lamp_companion@'+(pid||curPid())),null);if(!raw||raw.schema!==1||typeof raw!=='object')return lampDefault73();const s=Object.assign(lampDefault73(),raw);s.moments=Math.max(0,Number(s.moments)||0);s.stage=Math.max(1,Math.min(3,Number(s.stage)||lampStageFor73(s.moments)));s.pending=Array.isArray(s.pending)?s.pending.filter(p=>p&&p.stage>=2&&p.stage<=3&&['rhyme','memory','retry'].includes(p.reason)): [];s.name=typeof s.name==='string'?s.name.trim().slice(0,20):'';return s}
function lampPut73(s,pid){const id=pid||curPid();if(!getProfiles().list.some(p=>p.id===id))return;RAW.set('lamp_companion@'+id,JSON.stringify({schema:1,name:s.name||'',moments:s.moments,stage:s.stage,pending:s.pending,lastSeen:s.lastSeen||0,hiddenAt:s.hiddenAt||0}))}
function lampStageFor73(n){return n>=LAMP73.need[2]?3:n>=LAMP73.need[1]?2:1}
function lampName73(s){s=s||lampLoad73();return s.name||gT('Lamp')}
function lampBusy73(){if(!$('hub')||$('hub').classList.contains('hidden'))return true;if(DA64&&DA64.pid===curPid()&&DA64.phase!=='glow'&&$(DA64.section)&&!$(DA64.section).classList.contains('hidden'))return true;if(document.querySelector('dialog[open],.reward66[open],.lamp73-dialog[open]'))return true;return false}
function lampMoment73(reason){if(!['rhyme','memory','retry'].includes(reason))return false;const s=lampLoad73();if(s.stage>=3)return false;if(reason==='retry'){const c=P68.g;if(c?.lampRetry73)return false;if(c)c.lampRetry73=true}s.moments++;const next=lampStageFor73(s.moments);if(next>s.stage){for(let st=s.stage+1;st<=next;st++)s.pending.push({stage:st,reason,from:st-1});s.stage=next}lampPut73(s);return true}
function lampArtInner73(stage){const ink='#463f52',line='#72583f',gold='#e6b454',flame='#ffe4a4',glow='#ffd58a';
 if(stage===1)return `<ellipse cx="50" cy="86" rx="24" ry="5" fill="${gold}" opacity=".28"/><path d="M28 68 Q32 58 50 58 Q68 58 72 68 Q50 78 28 68Z" fill="#e8c894" stroke="${line}" stroke-width="2.2"/><path d="M34 66 Q50 72 66 66" fill="none" stroke="${line}" stroke-width="1.5"/><rect x="48" y="50" width="4" height="10" rx="1" fill="${ink}"/><g fill="${glow}" stroke="#c9893a" stroke-width="1.15"><path d="M50 16 L53.2 32 L50 29 L46.8 32Z"/><path d="M50 16 L62 24 L50 22 L38 24Z"/><path d="M36 36 L47 30 L45 33 L48 35Z"/><path d="M64 36 L53 30 L55 33 L52 35Z"/></g><circle cx="50" cy="16" r="5" fill="#fff8d6" stroke="${gold}" stroke-width="1.4"/><circle cx="50" cy="16" r="2.2" fill="#fff"/>`;
 if(stage===2)return `<ellipse cx="50" cy="86" rx="24" ry="5" fill="${gold}" opacity=".3"/><path d="M36 20 Q50 8 64 20" fill="none" stroke="${line}" stroke-width="3.2" stroke-linecap="round"/><path d="M30 26 L70 26 76 62 Q50 76 24 62Z" fill="${flame}" stroke="${line}" stroke-width="2.4"/><path d="M33 26 H67" stroke="${line}" stroke-width="3.5" stroke-linecap="round"/><path d="M48 28 L50 18 52 28" fill="${ink}" stroke="${ink}" stroke-width="1"/><path d="M46 18 Q50 6 54 18 Q50 22 46 18Z" fill="${glow}" stroke="#c9893a" stroke-width="1.2"/><path d="M49 16 Q50 10 51 16" fill="none" stroke="#fff6d2" stroke-width="1.2"/>`;
 return `<ellipse cx="50" cy="88" rx="26" ry="5" fill="${gold}" opacity=".35"/><path d="M50 8 Q62 8 62 16 Q62 20 50 22 Q38 20 38 16 Q38 8 50 8Z" fill="#d9b27a" stroke="${line}" stroke-width="2"/><circle cx="50" cy="12" r="4" fill="none" stroke="${line}" stroke-width="2.4"/><rect x="26" y="22" width="48" height="58" rx="6" fill="${flame}" stroke="${line}" stroke-width="2.6"/><path d="M26 36 H74 M26 54 H74 M50 22 V80" stroke="${line}" stroke-width="2"/><rect x="30" y="26" width="16" height="8" rx="1" fill="${glow}" opacity=".85"/><rect x="54" y="26" width="16" height="8" rx="1" fill="${glow}" opacity=".85"/><rect x="30" y="40" width="16" height="10" rx="1" fill="#fff1c4"/><rect x="54" y="40" width="16" height="10" rx="1" fill="#fff1c4"/><rect x="30" y="58" width="16" height="12" rx="1" fill="${glow}"/><rect x="54" y="58" width="16" height="12" rx="1" fill="${glow}"/><path d="M46 48 Q50 36 54 48 Q50 54 46 48Z" fill="#f3c260" stroke="#c9893a" stroke-width="1"/><path d="M22 80 H78" stroke="${line}" stroke-width="3.5" stroke-linecap="round"/>`}
function lampSvg73(stage,cls=''){const s=Math.max(1,Math.min(3,stage||1));return `<svg class="lamp73-svg ${cls}" data-stage73="${s}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="lamp73-ink">${lampArtInner73(s)}</g></svg>`}
function lampFigure73(s,extra=''){s=s||lampLoad73();return `<figure class="lamp73-figure" data-lamp73="${s.stage}" ${extra}><div class="lamp73-shell${LAMP73.away?' resting':''}" data-breath73><div class="lamp73-stage">${lampSvg73(s.stage)}</div></div><figcaption class="kline">${esc(lampName73(s))}</figcaption></figure>`}
function lampReduced73(){return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}
function lampNarrating73(){try{if(window.speechSynthesis&&speechSynthesis.speaking)return true}catch(e){}try{if(typeof MSRC!=='undefined'&&MSRC.some(x=>x&&x.playbackState==='playing'))return true}catch(e){}return false}
function lampBuildChime73(c,t,stage,vol){const midi=LAMP73.midi[(stage||1)-1]||60,f=typeof mtof==='function'?mtof(midi):440*Math.pow(2,(midi-69)/12),master=c.createGain(),cap=c.createGain();
 cap.gain.value=1;master.gain.value=1;const peak=LAMP73.limit*0.92;
 const tone=(type,fr,v,dur,a=.018)=>{const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=fr;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(Math.min(peak,v*vol),t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g).connect(master);o.start(t);o.stop(t+dur+.05);return o};
 tone('sine',f,1,1.7);tone('sine',f*2.01,.18,.9);tone('triangle',f*.5,.08,1.2,.03);
 const sh=c.createWaveShaper();sh.curve=lampShaper73(peak);master.connect(sh).connect(cap);return cap}
function lampShaper73(peak){const n=2048,c=new Float32Array(n);for(let i=0;i<n;i++){const x=i/(n-1)*2-1,y=Math.tanh(x*1.15);c[i]=Math.max(-peak,Math.min(peak,y*peak/.76))}return c}
function lampChime73(stage){if(!lampSfxOn73())return;const c=ac();if(!c)return;const t=c.currentTime,vol=lampNarrating73()?.04:.09;const out=lampBuildChime73(c,t,stage,vol);out.connect(c.destination)}
async function lampPeakSample73(stage=3){const C=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!C)return 0;const c=new C(1,44100*2,44100);lampBuildChime73(c,0,stage,.09).connect(c.destination);const buf=await c.startRendering();let p=0;for(let ch=0;ch<buf.numberOfChannels;ch++){const d=buf.getChannelData(ch);for(let i=0;i<d.length;i++)p=Math.max(p,Math.abs(d[i]))}return p}
function lampReason73(reason){return gT({rhyme:'Your lamp grew because you found two words that sound alike.',memory:'Your lamp grew because you found a matching pair.',retry:'Your lamp grew because you tried again.'}[reason]||'Your lamp grew because you tried again.')}
function lampClose73(){const d=document.querySelector('dialog.lamp73-dialog');if(!d)return;if(d.open)d.close();d.remove();document.querySelector('.lamp73-backdrop')?.remove();LAMP73.shown=false}
function lampPresent73(item){if(!item||LAMP73.shown)return;lampClose73();LAMP73.shown=true;const s=lampLoad73(),d=document.createElement('dialog');d.className='lamp73-dialog';d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','lamp73-line');d.innerHTML=`<div class="lamp73-grow" data-from="${item.from||item.stage-1}" data-to="${item.stage}"><div class="lamp73-from">${lampSvg73(item.from||item.stage-1)}</div><div class="lamp73-to">${lampSvg73(item.stage)}</div></div><p id="lamp73-line">${esc(lampReason73(item.reason))}</p><button class="p" data-lamp73-ok>${esc(gT('OK'))}</button>`;
 const reduce=lampReduced73();d.classList.toggle('reduce73',reduce);const cleanup=()=>{d.remove();document.querySelector('.lamp73-backdrop')?.remove();if(LAMP73.shown){LAMP73.shown=false;lampMountAll73();lampMaybeShow73()}};d.addEventListener('close',cleanup,{once:true});d.addEventListener('cancel',e=>{e.preventDefault();d.close()});d.querySelector('[data-lamp73-ok]').onclick=()=>d.close();
 document.body.appendChild(d);if(typeof d.showModal==='function')d.showModal();else{d.setAttribute('open','');const b=document.createElement('div');b.className='lamp73-backdrop';b.onclick=()=>d.close();document.body.insertBefore(b,d)}d.querySelector('button').focus({preventScroll:true});
 const grow=d.querySelector('.lamp73-grow');const hold=reduce?80:500,unfold=reduce?1200:2000;setTimeout(()=>grow?.classList.add('unfold73'),hold);setTimeout(()=>lampChime73(item.stage),hold+(reduce?400:Math.round(unfold*.72)))}
function lampMaybeShow73(){if(lampBusy73()||LAMP73.shown)return;const s=lampLoad73();if(!s.pending.length)return;const item=s.pending.shift();lampPut73(s);lampPresent73(item)}
function lampAwayNow73(s){const now=Date.now();return !!((s.hiddenAt&&now-s.hiddenAt>120000)||(s.lastSeen&&s.lastSeen>0&&now-s.lastSeen>10*60*1000))}
function lampTouchSeen73(){const s=lampLoad73();if(!LAMP73.visit){LAMP73.away=lampAwayNow73(s);LAMP73.visit=Date.now()} }
function lampMarkLeave73(){const s=lampLoad73();s.lastSeen=Date.now();s.hiddenAt=document.hidden?Date.now():0;lampPut73(s);LAMP73.visit=0}
function lampMount73(host,mode){if(!host)return;const s=lampLoad73();let wrap=host.querySelector('[data-lamp73-slot]');if(!wrap){wrap=document.createElement('div');wrap.dataset.lamp73Slot=mode||'home';if(mode==='home'){const art=host.querySelector('.todayArt64');if(art)art.insertBefore(wrap,art.children[1]||null);else host.prepend(wrap)}else host.append(wrap)}wrap.innerHTML=lampFigure73(s);wrap.querySelector('.lamp73-shell')?.classList.toggle('resting',!!LAMP73.away);wrap.querySelector('.lamp73-shell')?.classList.add('breathe')}
function lampMountAll73(){const hub=$('hub');if(hub&&!hub.classList.contains('hidden')){lampTouchSeen73();const hero=hub.querySelector('.today64');if(hero)lampMount73(hero,'home')}const form=$('pform');if(form){let slot=form.querySelector('[data-lamp73-slot="profile"]');if(!slot){slot=document.createElement('div');slot.dataset.lamp73Slot='profile';const pic=form.querySelector('#pa');(pic||form.querySelector('#pg71')||form.querySelector('p')||form).insertAdjacentElement('afterend',slot)}const pid=form.dataset.pid73,s=pid?lampLoad73(pid):lampDefault73();const keep=$('lampname73')&&document.activeElement===$('lampname73')?$('lampname73').value:null;slot.innerHTML=lampFigure73(s,'data-profile73="1"')+`<label for="lampname73">${gT('Lamp name')}</label><input id="lampname73" maxlength="20" value="${esc(keep??s.name)}" placeholder="${esc(gT('Lamp'))}"><p class="soft">${gT('You can rename the lamp on this device. Its glow stays if you pick a different picture.')}</p>`}const glow=document.querySelector('.dailyGlowCard64 .finishGlow64');if(glow){glow.innerHTML=lampFigure73();glow.querySelector('.lamp73-shell')?.classList.add('breathe')}}
function lampSaveName73(pid,name){const s=lampLoad73(pid);s.name=(name||'').trim().slice(0,20);lampPut73(s,pid)}

pWrap68('l61Win',()=>{const s=L61.s;if(!s||s.won||s.done)return null;return{k:s.k,errors:s.errors}},t=>{if(!t)return;if(t.k==='rm')lampMoment73('rhyme');else if(t.errors>0)lampMoment73('retry')});
pWrap68('l61Pick',i=>{const s=L61.s;if(!s||s.k!=='mm'||s.done||s.busy)return null;return{matched:s.matched.length}},t=>{const s=L61.s;if(t&&s&&s.k==='mm'&&s.matched.length>t.matched)lampMoment73('memory')});
pWrap68('l63Win',()=>{const s=L63.s;if(!s||s.won||s.done)return null;return{errors:s.errors}},t=>{if(t?.errors>0)lampMoment73('retry')});
pWrap68('wkTap',()=>({found:WKS.found,errors:P68.g?.errors||0}),t=>{if(t&&WKS.found>t.found&&t.errors>0)lampMoment73('retry')});
// Word Ladder retry: a successful new step after earlier failed taps in this session.
{const prev=ladKey;ladKey=async function(id,ch){const w=WL[id],n=w?w.chain.length:0,errs=P68.g?.errors||0;const r=await prev.apply(this,arguments);const w2=WL[id];if(w2&&w2===w&&w2.chain.length>n&&errs>0)lampMoment73('retry');return r}}
pWrap68('spAns',()=>{const s=SP.st;return s?{i:s.i,done:s.done,errors:P68.g?.errors||0}:null},t=>{const s=SP.st;if(t&&s&&!t.done&&(s.i>t.i||s.done)&&t.errors>0)lampMoment73('retry')});
pWrap68('arScrCheck',()=>({score:AR.ss,errors:P68.g?.errors||0}),t=>{if(t&&AR.ss>t.score&&t.errors>0)lampMoment73('retry')});
{const tap=melTap;melTap=function(id,m){const s=MS[id],i=s?.i,err=P68.g?.errors||0;const r=tap.apply(this,arguments);const s2=MS[id];if(s2&&s2===s&&s2.i>i&&err>0)lampMoment73('retry');return r}}
{const tap=rxTap;rxTap=function(p){const i=pPractice71()?GM.practiceI71||0:(GM.taps||[]).length,err=P68.g?.errors||0;const r=tap.apply(this,arguments);const j=pPractice71()?GM.practiceI71||0:(GM.taps||[]).length;if(j>i&&err>0)lampMoment73('retry');return r}}
{const tap=dpTap63;dpTap63=function(i){const s=DP63.s,n=s?.taps?.length||0,err=P68.g?.errors||0;const r=tap.apply(this,arguments);const s2=DP63.s;if(s2&&s2===s&&(s2.taps?.length||0)>n&&err>0)lampMoment73('retry');return r}}

{const hub=RENDER.hub;RENDER.hub=renderHub=function(){const r=hub.apply(this,arguments);if($('hub')&&!$('hub').classList.contains('hidden')){lampMountAll73();lampMaybeShow73()}return r}}
pWrap68('dailyGlow64',null,()=>lampMountAll73());
pWrap68('editP',null,(_,a)=>{const form=$('pform');if(!form)return;form.dataset.pid73=a[0]||'';lampMountAll73()});
pWrap68('saveP',()=>({id:$('pform')?.dataset.pid73||null,name:$('lampname73')?.value,had:$('pn')?.value.trim()}),t=>{if(!t?.had)return;const pid=t.id||curPid();if(pid)lampSaveName73(pid,t.name)});
pWrap68('renderLook',null,()=>{const root=$('look');if(!root||root.querySelector('[data-sfx73]'))return;root.insertAdjacentHTML('beforeend',`<div class="card" data-sfx73><h3>${gT('Soft sounds')}</h3><p class="soft">${gT('A quiet chime can play when the lamp grows. This does not change story or game voices.')}</p><p><button class="p" data-sfx73-on aria-pressed="${lampSfxOn73()}" onclick="lampSfxSet73(true)">${gT('On')}</button> <button data-sfx73-off aria-pressed="${!lampSfxOn73()}" onclick="lampSfxSet73(false)">${gT('Off')}</button></p></div>`);artRefresh63(root)});RENDER.look=renderLook;
pWrap68('switchP',null,()=>{LAMP73.shown=false;lampClose73();if($('hub')&&!$('hub').classList.contains('hidden')){lampMountAll73();lampMaybeShow73()}});
{const sh=show;show=function(id){if(id==='home')id='hub';if(id!=='hub'&&LAMP73.visit)lampMarkLeave73();const r=sh.apply(this,arguments);if(id==='hub'){lampMountAll73();lampMaybeShow73()}return r}}
{const erase=pErase68;pErase68=function(){const pid=curPid(),before=RAW.get('lamp_activity@'+pid);const r=erase.apply(this,arguments);if(before!=null&&RAW.get('lamp_activity@'+pid)==null){const s=lampLoad73(pid);RAW.del('lamp_companion@'+pid);if(s.name)lampSaveName73(pid,s.name)}return r}}

document.addEventListener('visibilitychange',()=>{if(document.hidden)lampMarkLeave73();else{const s=lampLoad73();LAMP73.visit=0;LAMP73.away=lampAwayNow73(s);if(!document.querySelector('dialog.lamp73-dialog'))lampMountAll73();if($('hub')&&!$('hub').classList.contains('hidden'))lampMaybeShow73()}});

document.head.insertAdjacentHTML('beforeend',`<style>
.lamp73-figure{display:inline-flex;flex-direction:column;align-items:center;margin:0;gap:4px;min-width:88px}
.lamp73-figure figcaption{font-size:.95rem;color:var(--ink);max-width:8em;text-align:center;overflow-wrap:anywhere}
.lamp73-shell{width:96px;height:96px;display:grid;place-items:center;position:relative}
.lamp73-shell .lamp73-svg{width:92px;height:92px;display:block;overflow:visible}
.lamp73-shell.breathe .lamp73-stage{transform-origin:50% 70%;animation:lamp73-breath 5s ease-in-out infinite}
.lamp73-shell.breathe.resting .lamp73-stage{animation-duration:9s}
@keyframes lamp73-breath{0%,100%{transform:scale(1);filter:drop-shadow(0 0 5px #e6b45455)}50%{transform:scale(1.03);filter:drop-shadow(0 0 12px #e6b45499)}}
.today64 .todayArt64{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px}
.today64 .todayArt64>.av,.today64 .todayArt64>.av .artsvg{width:84px!important;height:84px!important;flex:none}
.today64 [data-lamp73-slot]{flex:none}
.today64 .todayArt64>.av{display:block}
#pform [data-lamp73-slot]{margin:16px 0;display:block}
#pform [data-lamp73-slot] .lamp73-figure{display:flex;margin-bottom:8px}
#pform [data-lamp73-slot] label,#pform #lampname73{display:block;width:100%;max-width:100%;box-sizing:border-box}
.dailyGlowCard64 .finishGlow64 .lamp73-figure{margin:0 auto}
.dailyGlowCard64 .finishGlow64 .lamp73-shell{width:150px;height:150px}.dailyGlowCard64 .finishGlow64 .lamp73-svg{width:146px;height:146px}
.lamp73-dialog{position:fixed;inset:0;margin:auto;width:min(340px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow:auto;padding:22px;border:2px solid #9c8265;border-radius:22px;background:var(--card,#fff9ec);color:var(--ink,#30261d);z-index:10002;text-align:center;box-shadow:0 12px 40px #241d1855}
.lamp73-dialog::backdrop,.lamp73-backdrop{background:#241d18aa}.lamp73-backdrop{position:fixed;inset:0;z-index:10001}
.lamp73-dialog p{margin:16px 0;font-size:1.15rem;line-height:1.45;overflow-wrap:anywhere}
.lamp73-dialog button{min-height:48px;min-width:96px}
.lamp73-grow{position:relative;width:160px;height:160px;margin:8px auto 4px}
.lamp73-grow .lamp73-from,.lamp73-grow .lamp73-to{position:absolute;inset:0;display:grid;place-items:center}
.lamp73-grow .lamp73-svg{width:150px;height:150px}
.lamp73-grow .lamp73-to{opacity:0;transform:scale(.96)}
.lamp73-grow.unfold73 .lamp73-from{opacity:0;transition:opacity 1s ease}
.lamp73-grow.unfold73 .lamp73-to{opacity:1;animation:lamp73-unfold 2s ease forwards}
@keyframes lamp73-unfold{0%{transform:scale(.96);opacity:0}70%{transform:scale(1.02);opacity:1}100%{transform:scale(1);opacity:1}}
.lamp73-dialog.reduce73 .lamp73-grow.unfold73 .lamp73-from,.lamp73-dialog.reduce73 .lamp73-grow.unfold73 .lamp73-to{animation:none;transition:opacity 1.2s ease}
.lamp73-dialog.reduce73 .lamp73-grow.unfold73 .lamp73-to{opacity:1;transform:none}
[data-sfx73] button[aria-pressed="true"]{outline:3px solid var(--acc);outline-offset:2px}
@media(max-width:440px){.lamp73-shell{width:84px;height:84px}.lamp73-shell .lamp73-svg{width:80px;height:80px}}
@media(prefers-reduced-motion:reduce){
  .lamp73-shell.breathe .lamp73-stage,.today64 .lamp73-shell.breathe .lamp73-stage,.daily64 .lamp73-shell.breathe .lamp73-stage{animation:none!important;filter:drop-shadow(0 0 8px #e6b45477);transform:none!important}
  .today64 .lamp73-dialog .lamp73-grow .lamp73-to,.daily64 .lamp73-dialog .lamp73-grow .lamp73-to,.lamp73-dialog.reduce73 .lamp73-grow.unfold73 .lamp73-to{animation:none!important;transition:opacity 1.2s ease!important;opacity:1}
  .lamp73-grow.unfold73 .lamp73-from{transition:opacity 1.2s ease!important}
}
</style>`);
if(!$('hub').classList.contains('hidden')){lampMountAll73();lampMaybeShow73()}
