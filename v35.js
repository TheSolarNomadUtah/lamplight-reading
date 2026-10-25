// v35: "Everything adds glow, reading most."
// Any practice lights today for the streak (missing a day is still fine). Per-profile glow points, localStorage only:
//   story read = 3 (derived from the existing reading log, so old profiles migrate with full credit),
//   game round = 1 and song = 1 (max 5 a day each), sound board = 1 after 3+ taps (max 1 a day),
//   Star songs session = 1 and Cymatica session = 1 (30 s on screen, max 1 a day each).
// Light page: story color layers unchanged; one soft cymatic ring per milestone in Music, Games, Sounds and Stars.
PKEYS.push('lamp_glow');
const GLOW_CAP={music:5,games:5,sounds:1,stars:1,cym:1};          // per day
const GLOW_CAT={music:'music',games:'games',sounds:'sounds',stars:'stars',cym:'stars'};
const RING_AT={music:[5,15,40,80],games:[5,15,40,80],sounds:[3,10,25,50],stars:[3,10,25,50]};
const RING_LOBES={music:5,games:6,sounds:4,stars:8};
function glowGet(pid){const g=safeJSON(pid?RAW.get('lamp_glow@'+pid):LS.get('lamp_glow'),{});g.pts=Object.assign({music:0,games:0,sounds:0,stars:0},g.pts||{});g.day=g.day||{};g.seen=g.seen||0;return g}
function glowSet(g){const k=dkey();for(const d in g.day)if(d!==k)delete g.day[d];LS.set('lamp_glow',JSON.stringify(g))}
function glowAdd(kind){try{const g=glowGet(),k=dkey(),d=g.day[k]=g.day[k]||{};if((d[kind]||0)>=GLOW_CAP[kind])return false;d[kind]=(d[kind]||0)+1;g.pts[GLOW_CAT[kind]]++;glowSet(g);return true}catch(e){return false}}
function glowStats(){const g=glowGet(),st=lightStats(),rings={};let n=0;for(const c in RING_AT){rings[c]=RING_AT[c].filter(x=>g.pts[c]>=x).length;n+=rings[c]}
 return{stories:st.n*3,pts:g.pts,total:st.n*3+g.pts.music+g.pts.games+g.pts.sounds+g.pts.stars,rings,nr:n,seen:g.seen}}
// Practice marks the day; markDay('music') is what songs and most games already call.
let GLOW_IN=0;
{const md=markDay;markDay=function(kind){md(kind);if(GLOW_IN)return;if(kind==='music'){const inGame=['games','arcade'].some(s=>$(s)&&!$(s).classList.contains('hidden'));glowAdd(inGame?'games':'music')}}}
{const as=arSave;arSave=function(k,v){as(k,v);GLOW_IN=1;try{markDay('games')}finally{GLOW_IN=0}glowAdd('games')}}
{const sb=sbTap;sbTap=function(el,id){const r=sb(el,id);try{const g=glowGet(),k=dkey(),d=g.day[k]=g.day[k]||{};d.taps=(d.taps||0)+1;glowSet(g);if(d.taps===3){GLOW_IN=1;try{markDay('sounds')}finally{GLOW_IN=0}glowAdd('sounds')}}catch(e){}return r}}
{let tm=null;const sh=show;show=function(id){sh(id);clearTimeout(tm);if(id==='starsongs'||id==='cymatica'){const kind=id==='starsongs'?'stars':'cym';
 tm=setTimeout(()=>{if($(id)&&!$(id).classList.contains('hidden')){GLOW_IN=1;try{markDay(kind==='cym'?'cymatica':'stars')}finally{GLOW_IN=0}glowAdd(kind)}},30000)}}}

// Rings: a transparent canvas laid over the Light canvas (same layout), drawn in the reading theme's colors.
function glowColors(){const L=getLook(),t=THEMES[L.theme]||THEMES.warm,h=hex2rgb,mix=(a,b,f)=>a.map((x,i)=>Math.round(x+(b[i]-x)*f));
 const acc=h(t[3]),ink=h(t[1]),bg=h(t[0]),lift=c=>mix(c,[255,250,235],.35);
 return{music:lift(acc),games:lift(mix(acc,[255,214,120],.45)),sounds:lift(mix(bg,acc,.5)),stars:lift(mix(ink,[200,220,255],.6))}}
function glowRings(cv,opts){const gs=glowStats(),list=[];['music','games','sounds','stars'].forEach(c=>{for(let i=0;i<gs.rings[c];i++)list.push([c,i])});
 const ov=document.createElement('canvas');ov.className='glowrings';ov.setAttribute('aria-hidden','true');cv.parentNode.style.position=cv.parentNode.style.position||'relative';cv.insertAdjacentElement('afterend',ov);
 const place=()=>{ov.style.cssText=`position:absolute;pointer-events:none;mix-blend-mode:screen;left:${cv.offsetLeft}px;top:${cv.offsetTop}px;width:${cv.offsetWidth}px;height:${cv.offsetHeight}px;border-radius:${getComputedStyle(cv).borderRadius}`};place();
 const col=glowColors(),rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`,fresh=opts.bloom?list.length-Math.max(0,opts.bloom):list.length,t0=performance.now();let raf=0;
 function draw(ts){if(!ov.isConnected||!cv.isConnected){cancelAnimationFrame(raf);ov.remove();return}place();const d=opts.dpr||1,W=ov.width=ov.offsetWidth*d,H=ov.height=ov.offsetHeight*d,cx=W/2,cy=H/2,S=Math.min(W,H)/2,x=ov.getContext('2d');
  const t=RMOTION?0:(ts-t0)/1000;x.clearRect(0,0,W,H);
  list.forEach(([c,i],j)=>{const n=RING_LOBES[c]+i,r0=S*(.52+.085*j/Math.max(1,list.length/4)*.9+.02*i),amp=S*.012,ph=j*1.7+t*.05*(j%2?1:-1);
   let a=.15;if(j>=fresh&&!RMOTION){const k=Math.min(1,(ts-t0)/1600);a=.15+.35*Math.sin(Math.PI*k)}
   x.beginPath();for(let s=0;s<=240;s++){const th=s/240*Math.PI*2,r=r0+amp*Math.cos(n*th+ph)*Math.cos(2*th-ph*.5);const px=cx+r*Math.cos(th),py=cy+r*Math.sin(th);s?x.lineTo(px,py):x.moveTo(px,py)}
   x.lineWidth=Math.max(1,S*.006);x.strokeStyle=rgba(col[c],a);x.shadowColor=rgba(col[c],.35);x.shadowBlur=S*.015;x.stroke()});
  if(!RMOTION&&!LOWEND)raf=requestAnimationFrame(draw);else if(!RMOTION)setTimeout(()=>raf=requestAnimationFrame(draw),200)}
 raf=requestAnimationFrame(draw);return ov}

{const rm=RENDER.mylight;RENDER.mylight=function(){rm();try{const gs=glowStats(),cv=$('lightbig');const bloom=gs.nr>gs.seen?gs.nr-gs.seen:0;
 if(bloom){const g=glowGet();g.seen=gs.nr;glowSet(g)}glowRings(cv,{dpr:Math.min(2,devicePixelRatio||1),bloom});
 const n=v=>gNum(v),p=document.createElement('div');p.className='glowpts';
 p.innerHTML=`<p><b>✨ ${gT('Glow points: {n}',{n:n(gs.total)})}</b> · 📚 ${gT('Stories {n}',{n:n(gs.stories)})} · 🎵 ${gT('Music {n}',{n:n(gs.pts.music)})} · 🎮 ${gT('Games {n}',{n:n(gs.pts.games)})} · 🔊 ${gT('Sounds {n}',{n:n(gs.pts.sounds)})} · ⭐ ${gT('Stars {n}',{n:n(gs.pts.stars)})}</p>
 <p class="soft" style="color:#bfb8a8">${gT('Everything adds glow, reading most: a story is worth 3, a game or song 1. Music, games, sounds and stars each add soft rings around your light.')} ${gT('Rings: {n}',{n:n(gs.nr)})}</p>`;
 const h=$('mylight').querySelector('h2');if(h&&h.nextElementSibling)h.nextElementSibling.insertAdjacentElement('afterend',p)}catch(e){console.warn(e)}}}
{const rh=renderHub;renderHub=function(){rh();try{const m=$('lightmini');if(m)glowRings(m,{dpr:1})}catch(e){}};RENDER.hub=renderHub}

// Daycare weekly sheet: a Play column so practice days are visible; streak keeps working from the same day log.
{const rd=renderDaycare;renderDaycare=function(){rd();document.querySelectorAll('#daycare table').forEach(tb=>{const hd=tb.querySelector('tr');if(!hd||hd.querySelector('.playh'))return;
 hd.lastElementChild.insertAdjacentHTML('beforebegin','<th class="playh">Play</th>');const id=tb.closest('.sheet');const rows=[...tb.querySelectorAll('tr')].slice(1);
 const sheets=[...document.querySelectorAll('#daycare .sheet')],idx=sheets.indexOf(id),ids=!DC.sheet?[]:DC.sheet==='all'?getProfiles().list.map(p=>p.id):[DC.sheet];const pid=ids[idx];if(!pid)return;
 const R=weekRows(pid);rows.forEach((tr,i)=>{const a=(R[i]||{}).a||{},n=['music','games','sounds','stars','cymatica'].reduce((s,k)=>s+(a[k]||0),0);tr.lastElementChild.insertAdjacentHTML('beforebegin',`<td>${n?'✔ '+n:''}</td>`)})})};RENDER.daycare=renderDaycare}
