// v76: the Lamp becomes a six-stage hero light on Home. No new audio or voice files.
const LAMP76={need:[0,4,10,18,30,48],midi:[60,62,64,67,69,72],map:{1:1,2:3,3:4},names:['spark','ember','candle','lantern','fireflies','starlit']};
LAMP73.need=LAMP76.need;LAMP73.midi=LAMP76.midi;
function lampStageFor73(n){const need=LAMP73.need;let s=1;for(let i=1;i<need.length;i++)if(n>=need[i])s=i+1;return s}
function lampMapStage76(st){st=Math.max(1,Number(st)||1);return LAMP76.map[st]||st}
function lampRevealOn76(){return RAW.get('lamp_reveal')!=='off'}
function lampRevealSet76(on){RAW.set('lamp_reveal',on?'on':'off');if($('look')&&!$('look').classList.contains('hidden'))renderLook()}
function lampThemeDark76(){const c=getComputedStyle(document.body).backgroundColor||'rgb(246,241,231)',m=c.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);if(!m)return false;return (+m[1])+(+m[2])+(+m[3])<384}
function lampViewStage74(s){s=s||lampLoad73();if(s.pending?.length)return Math.max(1,Math.min(s.shown||s.pending[0].from||s.stage-1,s.stage));return Math.max(1,Math.min(6,s.shown||s.stage||1))}
function lampDefault73(){return {schema:1,gen:76,name:'',moments:0,stage:1,shown:1,pending:[],kinds:[],day:'',dayCredits:0,session:'',lastSeen:0,hiddenAt:0}}
function lampLoad73(pid){const raw=safeJSON(RAW.get('lamp_companion@'+(pid||curPid())),null),s=Object.assign(lampDefault73(),raw&&typeof raw==='object'?raw:{});
 s.moments=Math.max(0,Number(s.moments)||0);s.stage=Math.max(1,Number(s.stage)||1);
 s.pending=Array.isArray(s.pending)?s.pending.filter(p=>p&&p.stage>=2&&p.stage<=6&&LAMP_KINDS75.includes(p.reason)):[];
 s.kinds=Array.isArray(s.kinds)?s.kinds.filter(k=>LAMP_KINDS75.includes(k)):[];
 s.day=typeof s.day==='string'?s.day:'';s.dayCredits=Math.max(0,Number(s.dayCredits)||0);s.session=typeof s.session==='string'?s.session:'';
 const legacy=!raw||raw.gen==null||raw.gen<76;
 if(legacy){if((raw?Number(raw.stage)||1:s.stage)<=3){s.stage=lampMapStage76(raw?raw.stage:s.stage);s.pending=s.pending.map(p=>({...p,stage:lampMapStage76(p.stage),from:lampMapStage76(p.from||p.stage-1)}))}s.gen=76}
 if(!raw||!Number.isInteger(raw.shown)||raw.shown<1||raw.shown>6)s.shown=s.pending.length?Math.max(1,Number(s.pending[0].from)||s.stage-1):s.stage;
 else s.shown=legacy&&raw.shown<=3?lampMapStage76(raw.shown):Math.max(1,Math.min(6,raw.shown));
 s.stage=Math.max(1,Math.min(6,Math.max(s.stage,lampStageFor73(s.moments),s.shown||1)));
 s.shown=Math.max(1,Math.min(s.shown,s.stage));s.name=typeof s.name==='string'?s.name.trim().slice(0,20):'';return s}
function lampPut73(s,pid){const id=pid||curPid();if(!getProfiles().list.some(p=>p.id===id))return;RAW.set('lamp_companion@'+id,JSON.stringify({schema:1,gen:76,name:s.name||'',moments:s.moments,stage:s.stage,shown:s.shown,pending:s.pending,kinds:s.kinds||[],day:s.day||'',dayCredits:s.dayCredits||0,session:s.session||'',lastSeen:s.lastSeen||0,hiddenAt:s.hiddenAt||0}))}

function lampArtInner73(stage){const ink='#463f52',line='#72583f',gold='#e6b454',flame='#ffe4a4',glow='#ffd58a',coal='#e08a3c',violet='#c9b0e8';
 const s=Math.max(1,Math.min(6,stage||1));
 const spark=`<ellipse cx="50" cy="86" rx="24" ry="5" fill="${gold}" opacity=".28"/><path d="M28 68 Q32 58 50 58 Q68 58 72 68 Q50 78 28 68Z" fill="#e8c894" stroke="${line}" stroke-width="2.2"/><path d="M34 66 Q50 72 66 66" fill="none" stroke="${line}" stroke-width="1.5"/><rect x="48" y="50" width="4" height="10" rx="1" fill="${ink}"/><g fill="${glow}" stroke="#c9893a" stroke-width="1.15"><path d="M50 16 L53.2 32 L50 29 L46.8 32Z"/><path d="M50 16 L62 24 L50 22 L38 24Z"/><path d="M36 36 L47 30 L45 33 L48 35Z"/><path d="M64 36 L53 30 L55 33 L52 35Z"/></g><circle cx="50" cy="16" r="5" fill="#fff8d6" stroke="${gold}" stroke-width="1.4"/><circle cx="50" cy="16" r="2.2" fill="#fff"/>`;
 const ember=`<ellipse cx="50" cy="88" rx="26" ry="5" fill="${gold}" opacity=".3"/><path d="M26 70 Q30 54 50 52 Q70 54 74 70 Q50 84 26 70Z" fill="#d9b27a" stroke="${line}" stroke-width="2.2"/><path d="M34 66 Q50 74 66 66" fill="none" stroke="${line}" stroke-width="1.4"/><ellipse cx="50" cy="58" rx="16" ry="12" fill="${coal}" stroke="#a85a28" stroke-width="1.4"/><ellipse cx="50" cy="56" rx="9" ry="7" fill="#ffb060"/><ellipse cx="47" cy="54" rx="3.2" ry="2.2" fill="#fff3c8" opacity=".9"/>`;
 const candle=`<ellipse cx="50" cy="86" rx="24" ry="5" fill="${gold}" opacity=".3"/><path d="M36 20 Q50 8 64 20" fill="none" stroke="${line}" stroke-width="3.2" stroke-linecap="round"/><path d="M30 26 L70 26 76 62 Q50 76 24 62Z" fill="${flame}" stroke="${line}" stroke-width="2.4"/><path d="M33 26 H67" stroke="${line}" stroke-width="3.5" stroke-linecap="round"/><path d="M48 28 L50 18 52 28" fill="${ink}" stroke="${ink}" stroke-width="1"/><path d="M46 18 Q50 6 54 18 Q50 22 46 18Z" fill="${glow}" stroke="#c9893a" stroke-width="1.2"/><path d="M49 16 Q50 10 51 16" fill="none" stroke="#fff6d2" stroke-width="1.2"/>`;
 const lantern=`<ellipse cx="50" cy="88" rx="26" ry="5" fill="${gold}" opacity=".35"/><path d="M50 8 Q62 8 62 16 Q62 20 50 22 Q38 20 38 16 Q38 8 50 8Z" fill="#d9b27a" stroke="${line}" stroke-width="2"/><circle cx="50" cy="12" r="4" fill="none" stroke="${line}" stroke-width="2.4"/><rect x="26" y="22" width="48" height="58" rx="6" fill="${flame}" stroke="${line}" stroke-width="2.6"/><path d="M26 36 H74 M26 54 H74 M50 22 V80" stroke="${line}" stroke-width="2"/><rect x="30" y="26" width="16" height="8" rx="1" fill="${glow}" opacity=".85"/><rect x="54" y="26" width="16" height="8" rx="1" fill="${glow}" opacity=".85"/><rect x="30" y="40" width="16" height="10" rx="1" fill="#fff1c4"/><rect x="54" y="40" width="16" height="10" rx="1" fill="#fff1c4"/><rect x="30" y="58" width="16" height="12" rx="1" fill="${glow}"/><rect x="54" y="58" width="16" height="12" rx="1" fill="${glow}"/><path d="M46 48 Q50 36 54 48 Q50 54 46 48Z" fill="#f3c260" stroke="#c9893a" stroke-width="1"/><path d="M22 80 H78" stroke="${line}" stroke-width="3.5" stroke-linecap="round"/>`;
 const flies=`<g class="lamp76-flies">${[[18,42],[82,36],[16,70],[84,68],[50,90]].map(([x,y],i)=>`<g class="lamp76-fly" style="--fly:${i}"><circle cx="${x}" cy="${y}" r="3.1" fill="#ffe9a0" stroke="#c9893a" stroke-width=".8"/><circle cx="${x-1}" cy="${y-1}" r="1.1" fill="#fff"/></g>`).join('')}</g>`;
 const stars=`<g class="lamp76-svgstars" fill="${violet}">${[[14,18],[86,16],[10,50],[90,48],[20,84],[80,86],[50,4]].map(([x,y],i)=>`<path d="M${x} ${y-4.5} L${x+1.1} ${y-1.1} L${x+4.5} ${y} L${x+1.1} ${y+1.1} L${x} ${y+4.5} L${x-1.1} ${y+1.1} L${x-4.5} ${y} L${x-1.1} ${y-1.1}Z" opacity="${.55+i%3*.15}"/>`).join('')}</g>`;
 if(s===1)return spark;if(s===2)return ember;if(s===3)return candle;if(s===4)return lantern;if(s===5)return lantern+flies;
 return `<g class="lamp76-violet">${lantern.replaceAll(flame,'#f3e0b0').replaceAll('#fff1c4','#ead9ff')}</g>`+flies+stars}

function lampSvg73(stage,cls='',hero=false){const s=Math.max(1,Math.min(6,stage||1));const plate=hero?`<circle class="lamp73-plate" cx="50" cy="50" r="48" fill="#fff2d8" opacity=".12" stroke="none"/>`:`<circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/>`;return `<svg class="lamp73-svg ${cls}" data-stage73="${s}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">${plate}<g class="lamp73-ink">${lampArtInner73(s)}</g></svg>`}
function lampFigure73(s,extra=''){s=s||lampLoad73();const view=lampViewStage74(s),hero=/\bdata-hero76=/.test(extra||'');return `<figure class="lamp73-figure" data-lamp73="${view}" ${extra}><div class="lamp73-shell${LAMP73.away?' resting':''}" data-breath73><div class="lamp73-stage">${lampSvg73(view,'',hero)}</div></div><figcaption class="kline">${esc(lampName73(s))}</figcaption></figure>`}
function lampDots76(kind,n){let h='';for(let i=0;i<n;i++)h+=`<span class="lamp76-${kind}" style="--i:${i}" aria-hidden="true"></span>`;return `<div class="lamp76-${kind}s" aria-hidden="true">${h}</div>`}
function lampHero76(s){const view=lampViewStage74(s);return `<div class="lamp76-glow" aria-hidden="true"></div>${view>=6?lampDots76('star',10):''}${lampFigure73(s,'data-hero76="1"')}${view>=4?lampDots76('mote',view>=5?7:5):''}${view>=5?`<div class="lamp76-orbit" aria-hidden="true"><span></span><span></span><span></span></div>`:''}`}

function lampMount73(host,mode){if(!host)return;const s=mode==='profile'?arguments[2]||lampLoad73():lampLoad73();
 if(mode==='home'){const view=lampViewStage74(s);host.dataset.lampStage=view;host.classList.toggle('lamp76-night',lampThemeDark76());host.querySelectorAll('.todayArt64 [data-lamp73-slot]').forEach(n=>n.remove());let wrap=host.querySelector(':scope > [data-lamp73-slot="home"]');if(!wrap){wrap=document.createElement('div');wrap.dataset.lamp73Slot='home';wrap.className='lamp76-hero';host.prepend(wrap)}wrap.innerHTML=lampHero76(s);wrap.querySelector('.lamp73-shell')?.classList.toggle('resting',!!LAMP73.away);wrap.querySelector('.lamp73-shell')?.classList.add('breathe');return}
 let wrap=host.querySelector('[data-lamp73-slot]');if(!wrap){wrap=document.createElement('div');wrap.dataset.lamp73Slot=mode||'home';host.append(wrap)}wrap.innerHTML=lampFigure73(s,mode==='profile'?'data-profile73="1"':'');wrap.querySelector('.lamp73-shell')?.classList.toggle('resting',!!LAMP73.away);wrap.querySelector('.lamp73-shell')?.classList.add('breathe')}
function lampMountAll73(){const hub=$('hub');if(hub&&!hub.classList.contains('hidden')){lampTouchSeen73();const hero=hub.querySelector('.today64');if(hero)lampMount73(hero,'home')}const form=$('pform');if(form){let slot=form.querySelector('[data-lamp73-slot="profile"]');if(!slot){slot=document.createElement('div');slot.dataset.lamp73Slot='profile';const pic=form.querySelector('#pa');(pic||form.querySelector('#pg71')||form.querySelector('p')||form).insertAdjacentElement('afterend',slot)}const pid=form.dataset.pid73,s=pid?lampLoad73(pid):lampDefault73();const keep=$('lampname73')&&document.activeElement===$('lampname73')?$('lampname73').value:null;slot.innerHTML=lampFigure73(s,'data-profile73="1"')+`<label for="lampname73">${gT('Lamp name')}</label><input id="lampname73" maxlength="20" value="${esc(keep??s.name)}" placeholder="${esc(gT('Lamp'))}"><p class="soft">${gT('You can rename the lamp on this device. Its glow stays if you pick a different picture.')}</p>`}const glow=document.querySelector('.dailyGlowCard64 .finishGlow64');if(glow){glow.innerHTML=lampFigure73();glow.querySelector('.lamp73-shell')?.classList.add('breathe')}}

function lampClose73(){const fn=LAMP76.onFinish;LAMP76.onFinish=null;LAMP76.ignoreClose=true;document.querySelectorAll('dialog.lamp73-dialog').forEach(d=>{if(fn)d.removeEventListener('close',fn);try{if(d.open)d.close()}catch(e){}d.remove()});document.querySelector('.lamp73-backdrop')?.remove();(LAMP76.timers||[]).forEach(clearTimeout);LAMP76.timers=[];LAMP73.shown=false;LAMP76.ignoreClose=false}
function lampMaybeShow73(){if(lampBusy73()||LAMP73.shown)return;const s=lampLoad73();if(!s.pending.length)return;lampPresent73(s.pending[0])}
function lampPresent73(item){if(!item||LAMP73.shown)return;lampClose73();LAMP73.shown=true;const cinematic=lampRevealOn76()&&!lampReduced73(),d=document.createElement('dialog'),from=item.from||item.stage-1,to=item.stage,pid=curPid();
 d.className='lamp73-dialog'+(cinematic?' lamp76-reveal':'');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','lamp73-line');
 if(cinematic)d.innerHTML=`<div class="lamp76-dusk" aria-hidden="true"></div><div class="lamp76-cast" data-from="${from}" data-to="${to}"><div class="lamp76-old">${lampSvg73(from,'',true)}</div><div class="lamp76-burst">${lampDots76('spark',14)}</div><div class="lamp76-new">${lampSvg73(to,'',true)}</div><div class="lamp76-bloom" aria-hidden="true"></div></div><p id="lamp73-line">${esc(lampReason73(item.reason))}</p><button class="p" data-lamp73-ok>${esc(gT('Continue'))}</button>`;
 else d.innerHTML=`<div class="lamp73-grow" data-from="${from}" data-to="${to}"><div class="lamp73-from">${lampSvg73(from)}</div><div class="lamp73-to">${lampSvg73(to)}</div></div><p id="lamp73-line">${esc(lampReason73(item.reason))}</p><button class="p" data-lamp73-ok>${esc(gT('Continue'))}</button>`;
 const reduce=lampReduced73()||!cinematic;d.classList.toggle('reduce73',reduce);
 const finish=()=>{if(LAMP76.ignoreClose){LAMP73.shown=false;return}const s=lampLoad73(pid);s.shown=Math.max(s.shown||1,item.stage);const i=(s.pending||[]).findIndex(p=>p&&p.stage===item.stage&&p.reason===item.reason);if(i>=0)s.pending.splice(i,1);lampPut73(s,pid);d.remove();document.querySelector('.lamp73-backdrop')?.remove();if(LAMP73.shown){LAMP73.shown=false;lampMountAll73();lampMaybeShow73()}};
 LAMP76.onFinish=finish;d.addEventListener('close',finish,{once:true});d.addEventListener('cancel',e=>{e.preventDefault();d.close()});d.querySelector('[data-lamp73-ok]').onclick=()=>d.close();
 document.body.appendChild(d);if(typeof d.showModal==='function')d.showModal();else{d.setAttribute('open','');const b=document.createElement('div');b.className='lamp73-backdrop';b.onclick=()=>d.close();document.body.insertBefore(b,d)}
 d.querySelector('button').focus({preventScroll:true});
 LAMP76.timers=(LAMP76.timers||[]).slice();
 if(cinematic){const go=cls=>d.querySelector('.lamp76-cast')?.classList.add(cls);go('hold76');LAMP76.timers.push(setTimeout(()=>go('break76'),1000),setTimeout(()=>go('assemble76'),2000),setTimeout(()=>{go('bloom76');d.classList.add('blooming76')},2600),setTimeout(()=>lampChime73(to),2800))}
 else{const grow=d.querySelector('.lamp73-grow'),hold=reduce?80:500,unfold=reduce?1200:2000;LAMP76.timers.push(setTimeout(()=>grow?.classList.add('unfold73'),hold),setTimeout(()=>lampChime73(to),hold+(reduce?400:Math.round(unfold*.72))))}}

pWrap68('renderLook',null,()=>{const root=$('look');if(!root||root.querySelector('[data-reveal76]'))return;root.insertAdjacentHTML('beforeend',`<div class="card" data-reveal76><h3>${gT('Full-screen glow')}</h3><p class="soft">${gT('A short glow can play on Home when the lamp grows. You can turn it off for a quieter time. This stays on this device.')}</p><p><button class="p" data-reveal76-on aria-pressed="${lampRevealOn76()}" onclick="lampRevealSet76(true)">${gT('On')}</button> <button data-reveal76-off aria-pressed="${!lampRevealOn76()}" onclick="lampRevealSet76(false)">${gT('Off')}</button></p></div>`);artRefresh63(root)});RENDER.look=renderLook;

document.head.insertAdjacentHTML('beforeend',`<style>
.today64{position:relative;display:flex!important;flex-direction:column;align-items:center!important;overflow:visible;isolation:isolate;--lamp-glow:90px;--lamp-tint:#e6b45400;gap:6px!important;padding:10px 14px 12px}
.today64>.lamp76-hero{order:-1;position:relative;z-index:1;width:100%;display:flex;justify-content:center;align-items:flex-end;min-height:0;margin:0;pointer-events:none}
.today64>.lamp76-hero .lamp73-figure{pointer-events:auto;position:relative;z-index:2;margin:0}
.today64>.lamp76-hero .lamp73-shell{width:200px;height:200px}
.today64>.lamp76-hero .lamp73-svg{width:196px;height:196px;overflow:visible}
.today64>.lamp76-hero figcaption{font-size:1.05rem;max-width:12em;margin:2px 0 0;line-height:1.2}
.today64 .todayArt64{position:relative;z-index:2;margin:0!important}
.today64>.todayArt64 + div{width:100%}
.today64 .todayModes64, .today64 a, .today64 h2, .today64 h3, .today64 p{position:relative;z-index:2}
.today64 h2{margin:.1em 0 .05em}
.today64 h3{margin:.12em 0}
.today64 p{margin:.25em 0}
.today64 .todayModes64{display:grid!important;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:4px;width:100%}
.today64 .todayModes64 button{width:auto;min-width:0;flex:unset;padding:8px 6px;line-height:1.2}
.lamp76-glow{position:absolute;left:50%;top:62%;width:var(--lamp-glow);height:var(--lamp-glow);transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,var(--lamp-tint) 0%,#e6b45444 32%,#e6b45400 72%);filter:blur(2px)}
.today64[data-lamp-stage="1"]{--lamp-glow:120px;--lamp-tint:#e6b45433}
.today64[data-lamp-stage="2"]{--lamp-glow:160px;--lamp-tint:#e08a3c40}
.today64[data-lamp-stage="3"]{--lamp-glow:200px;--lamp-tint:#ffd58a4d}
.today64[data-lamp-stage="4"]{--lamp-glow:250px;--lamp-tint:#f3c26059}
.today64[data-lamp-stage="5"]{--lamp-glow:300px;--lamp-tint:#ffd58a66}
.today64[data-lamp-stage="6"]{--lamp-glow:340px;--lamp-tint:#e8c9ff55;box-shadow:inset 0 50px 90px #c9b0e824}
.today64[data-lamp-stage="6"] .lamp76-glow{background:radial-gradient(circle,#f3e0b0aa 0%,#c9b0e866 40%,#6a4d9a00 74%)}
.lamp76-motes,.lamp76-stars,.lamp76-orbit,.lamp76-burst{pointer-events:none;position:absolute;inset:0}
.lamp76-mote,.lamp76-star{position:absolute;border-radius:50%;display:block}
.lamp76-mote{width:7px;height:7px;background:#ffe9a0;box-shadow:0 0 8px #e6b454;left:calc(18% + var(--i) * 10%);top:calc(30% + (var(--i) * 7%));animation:lamp76-drift calc(11s + var(--i) * .7s) ease-in-out infinite;animation-delay:calc(var(--i) * -.9s);opacity:.75}
.lamp76-star{width:3px;height:3px;background:#f2e9ff;box-shadow:0 0 6px #c9b0e8;left:calc(8% + var(--i) * 9%);top:calc(8% + (var(--i) % 4) * 18%);animation:lamp76-twinkle 5s ease-in-out infinite;animation-delay:calc(var(--i) * -1.1s);opacity:.55}
.lamp76-orbit{width:230px;height:230px;left:50%;top:50%;transform:translate(-50%,-58%);animation:lamp76-spin 18s linear infinite}
.lamp76-orbit span{position:absolute;width:8px;height:8px;border-radius:50%;background:#ffe9a0;box-shadow:0 0 10px #ffd58a;left:50%;top:0}
.lamp76-orbit span:nth-child(2){top:auto;bottom:8%;left:8%}
.lamp76-orbit span:nth-child(3){top:40%;left:auto;right:0}
@keyframes lamp76-drift{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(10px,-16px);opacity:.85}}
@keyframes lamp76-twinkle{0%,100%{opacity:.25}50%{opacity:.7}}
@keyframes lamp76-spin{to{transform:translate(-50%,-58%) rotate(360deg)}}
.today64.lamp76-night .lamp76-star{opacity:.85;box-shadow:0 0 8px #efe6ff}
.today64.lamp76-night .lamp76-glow{filter:blur(3px) saturate(1.15)}
dialog.lamp73-dialog.lamp76-reveal{position:fixed;inset:0;width:100%!important;max-width:none!important;height:100%!important;max-height:none!important;margin:0!important;padding:24px 18px 32px;border:0;border-radius:0;overflow:hidden;background:#162038;color:#f6efe0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;z-index:10020;box-shadow:none}
.lamp76-reveal::backdrop,.lamp76-reveal + .lamp73-backdrop,.lamp73-backdrop{background:#162038}
.lamp76-dusk{position:absolute;inset:0;background:#162038;z-index:0;animation:lamp76-dim 1s ease forwards}
.lamp76-cast{position:absolute;left:50%;top:42%;width:min(72vw,288px);height:min(72vw,288px);transform:translate(-50%,-50%);transform-origin:center;display:grid;place-items:center;z-index:1}
.lamp76-cast .lamp73-svg{width:100%;height:100%;overflow:visible}
.lamp76-old,.lamp76-new,.lamp76-burst,.lamp76-bloom{position:absolute;inset:0;display:grid;place-items:center}
.lamp76-new,.lamp76-burst{opacity:0}
.lamp76-bloom{border-radius:50%;background:radial-gradient(circle,#ffe9a0bb 0%,#e6b45466 36%,#e6b45400 72%);opacity:0;transform:scale(.7);pointer-events:none}
.lamp76-cast.break76 .lamp76-old{animation:lamp76-break 1s ease forwards}
.lamp76-cast.break76 .lamp76-burst{opacity:1}
.lamp76-cast.assemble76 .lamp76-old{opacity:0}
.lamp76-cast.assemble76 .lamp76-new{animation:lamp76-assemble 1s ease forwards}
.lamp76-cast.bloom76 .lamp76-bloom{animation:lamp76-bloom 1.1s ease forwards}
.lamp76-reveal.blooming76{animation:lamp76-warmbg 1.1s ease forwards}
.lamp76-burst .lamp76-spark{position:absolute;width:11px;height:11px;border-radius:50%;background:#ffe4a4;box-shadow:0 0 12px #e6b454;left:50%;top:50%;opacity:0}
.lamp76-cast.break76 .lamp76-spark{animation:lamp76-pop 1s ease forwards;animation-delay:calc(var(--i) * 40ms)}
.lamp76-fly{animation:lamp76-drift calc(9s + var(--fly) * .6s) ease-in-out infinite;animation-delay:calc(var(--fly) * -.8s);transform-box:fill-box;transform-origin:center}
@keyframes lamp76-dim{from{opacity:0}to{opacity:1}}
@keyframes lamp76-warmbg{from{background:#162038}to{background:#2f2618}}
@keyframes lamp76-break{0%{opacity:1;filter:brightness(1)}40%{filter:brightness(1.25)}100%{opacity:0;filter:brightness(1.1)}}
@keyframes lamp76-assemble{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes lamp76-bloom{0%{opacity:0;transform:scale(.7)}50%{opacity:.75;transform:scale(1.08)}100%{opacity:.4;transform:scale(1.22)}}
@keyframes lamp76-pop{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}20%{opacity:1}70%{opacity:.9}100%{opacity:.2;transform:translate(calc(-50% + (var(--i) - 7) * 16px),calc(-50% + (var(--i) % 5 - 2) * 18px)) scale(1.05)}}
.lamp76-reveal #lamp73-line{position:relative;z-index:1;max-width:22em;text-align:center;color:#f6efe0;text-shadow:0 1px 0 #162038}
.lamp76-reveal button{position:relative;z-index:1;min-height:52px;background:#e6b454;color:#2f2a24;border-color:#c9893a}
.lamp73-dialog.reduce73 .lamp73-grow.unfold73 .lamp73-to{opacity:1;transform:none}
[data-reveal76] button[aria-pressed="true"]{outline:3px solid var(--acc);outline-offset:2px}
@media(max-width:440px){.today64>.lamp76-hero .lamp73-shell{width:176px;height:176px}.today64>.lamp76-hero .lamp73-svg{width:172px;height:172px}}
@media(prefers-reduced-motion:reduce){
  .lamp76-mote,.lamp76-star,.lamp76-orbit,.lamp76-fly,.today64 .lamp73-shell.breathe .lamp73-stage{animation:none!important;transform:none}
  .lamp76-mote,.lamp76-star{opacity:.55}
  .lamp76-dusk,.lamp76-cast.break76 .lamp76-old,.lamp76-cast.assemble76 .lamp76-new,.lamp76-cast.bloom76 .lamp76-bloom{animation:none!important}
  .lamp76-cast .lamp76-old{opacity:0;transition:opacity 1.2s ease}
  .lamp76-cast .lamp76-new{opacity:1;transition:opacity 1.2s ease}
}
</style>`);
