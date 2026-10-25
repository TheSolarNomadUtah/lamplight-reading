// v36: translated "<name>'s Light", a visible "lit today" Home lamp, ring/bloom debug preview, ~30 s of singing = 1 song point.
// Zero data: localStorage only. No audio changes.

// 1) Light page heading in the reader's language ("{name}'s Light"), name isolated for RTL.
function lightName(p){const m=String(p.name).match(/^Reader (\d+)$/);return m?gT('Reader')+' '+gNum(+m[1]):p.name}
{const rm=RENDER.mylight;RENDER.mylight=function(){rm();const p=curProfile(),h=$('mylight').querySelector('h2');
 if(h){h.innerHTML=`${p.av} `+gT("{name}'s Light",{name:`<bdi>${esc(lightName(p))}</bdi>`})}}}

// 2) Home lamp: on any lit day a warm glow sits at a clear minimum brightness; the streak adds more (up to 10 days).
lampLevel=function(n){return n>0?.55+.45*Math.min(n,10)/10:0};
function litToday(){const D=getDays();return !!D[dkey()]}
{const rh=renderHub;renderHub=function(){rh();try{const m=$('lightmini');if(!m)return;const n=streakOf(getDays()),lit=litToday();m.parentNode.querySelectorAll('.litglow').forEach(x=>x.remove());if(!lit)return;
 const lv=lampLevel(Math.max(1,n)),d=document.createElement('div');d.className='litglow'+(RMOTION?'':' flick');d.setAttribute('aria-hidden','true');d.style.setProperty('--lv',lv);
 d.innerHTML=`<svg viewBox="0 0 100 100"><defs><radialGradient id="lgw" cx="50%" cy="58%"><stop offset="0" stop-color="#fff4d6" stop-opacity="1"/><stop offset=".35" stop-color="#ffcf6b" stop-opacity=".75"/><stop offset="1" stop-color="#ff9f43" stop-opacity="0"/></radialGradient>
 <radialGradient id="lgf" cx="50%" cy="70%"><stop offset="0" stop-color="#fffaf0"/><stop offset=".55" stop-color="#ffd27a"/><stop offset="1" stop-color="#ff9a3c" stop-opacity=".2"/></radialGradient></defs>
 <circle cx="50" cy="55" r="${30+14*lv}" fill="url(#lgw)" opacity="${lv}"/><path class="fl" d="M50 32 C57 42 61 49 61 57 A11 11 0 0 1 39 57 C39 49 43 42 50 32Z" fill="url(#lgf)" opacity="${.7+.3*lv}"/></svg>`;
 m.insertAdjacentElement('afterend',d);const place=()=>{if(!d.isConnected||!m.isConnected)return;d.style.left=m.offsetLeft+'px';d.style.top=m.offsetTop+'px';d.style.width=m.offsetWidth+'px';d.style.height=m.offsetHeight+'px'};place();setTimeout(place,300);
 m.title=gT('Lit today! Your streak: {n} days',{n:gNum(n)})}catch(e){}};RENDER.hub=renderHub}
document.head.insertAdjacentHTML('beforeend',`<style>.litglow{position:absolute;pointer-events:none;mix-blend-mode:screen;border-radius:50%;overflow:hidden}.litglow svg{width:100%;height:100%;display:block}
.litglow.flick .fl{transform-origin:50% 68%;animation:lflick 3.2s ease-in-out infinite}@keyframes lflick{0%,100%{transform:scale(1,1)}40%{transform:scale(.97,1.04)}70%{transform:scale(1.02,.98)}}
#hub .lampcard>div:first-child{position:relative}</style>`);

// 3) Debug preview (no real data is read for rings or written while it is on):
//   localStorage.setItem('lamp_glowsim','4')        -> 4 rings in every category (0-4)
//   localStorage.setItem('lamp_glowsim','1,2,3,4')  -> rings per category: music,games,sounds,stars
//   localStorage.setItem('lamp_glowbloom','2')      -> the last 2 rings bloom every time the Light page opens ('all' = every ring)
//   or the URL: ?glowsim=1,2,3,4&glowbloom=all       Clear with localStorage.removeItem('lamp_glowsim'), ...('lamp_glowbloom').
function glowSimCfg(){const q=new URLSearchParams(location.search);let s=q.get('glowsim'),b=q.get('glowbloom');try{if(s==null)s=localStorage.getItem('lamp_glowsim');if(b==null)b=localStorage.getItem('lamp_glowbloom')}catch(e){}
 if(s==null||s==='')return null;const a=String(s).split(',').map(x=>Math.max(0,Math.min(4,parseInt(x,10)||0)));const r=a.length>=4?a:[a[0],a[0],a[0],a[0]];return{r,bloom:b}}
{const gst=glowStats;glowStats=function(){const s=gst(),c=glowSimCfg();if(!c)return s;const cats=['music','games','sounds','stars'],rings={},pts={};let nr=0;
 cats.forEach((k,i)=>{rings[k]=c.r[i];pts[k]=c.r[i]?RING_AT[k][c.r[i]-1]:0;nr+=c.r[i]});const bl=c.bloom==='all'?nr:Math.min(nr,parseInt(c.bloom,10)||0);
 return{stories:s.stories,pts,total:s.stories+cats.reduce((t,k)=>t+pts[k],0),rings,nr,seen:nr-bl,sim:1}}}
{const gs=glowSet;glowSet=function(g){if(glowSimCfg())return;gs(g)}}   // preview never saves
{const rm=RENDER.mylight;RENDER.mylight=function(){rm();if(glowSimCfg()){const p=document.createElement('p');p.className='soft';p.style.cssText='color:#ffd97a';p.textContent='🧪 '+gT('Preview mode: rings are simulated and nothing is saved.');const g=$('mylight').querySelector('.glowpts');if(g)g.appendChild(p)}}}

// 4) Singing: about 30 s of a song counts as the song point (still max 5 a day); the end of the song doesn't count it twice.
const SING={id:0,alive:false,credited:false};
function singStart(){const id=++SING.id;SING.alive=true;SING.credited=false;setTimeout(()=>{const vis=$('music')&&!$('music').classList.contains('hidden');
 if(SING.id===id&&SING.alive&&!SING.credited&&vis){SING.credited=true;GLOW_IN=1;try{markDay('music')}finally{GLOW_IN=0}glowAdd('music')}},30000)}
{const ms=musicStop;musicStop=function(){SING.alive=false;return ms.apply(this,arguments)}}
{const rk=runKaraoke;runKaraoke=function(){const r=rk.apply(this,arguments);singStart();return r}}
{const ps=playSing;playSing=function(){const r=ps.apply(this,arguments);singStart();return r}}
{const md=markDay;markDay=function(kind){if(kind==='music'&&SING.credited&&!GLOW_IN&&$('music')&&!$('music').classList.contains('hidden')){SING.credited=false;GLOW_IN=1;try{return md(kind)}finally{GLOW_IN=0}}return md(kind)}}
{const rm=RENDER.mylight;RENDER.mylight=function(){rm();const g=$('mylight').querySelector('.glowpts p.soft');if(g&&g.firstChild&&g.firstChild.nodeType===3)g.firstChild.nodeValue=gT('Everything adds glow, reading most: a story is worth 3; a game round or about 30 seconds of singing is worth 1. Music, games, sounds and stars each add soft rings around your light.')+' '+gT('Rings: {n}',{n:gNum(glowStats().nr)})}}
