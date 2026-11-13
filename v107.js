/* v107: QA fixes from v106 (jar marks, Grow depth cap, turtle-swim level,
   56px Grow buttons) plus Professor Pi's eight v106 math must-fixes.
   Optional: a soft 5-second C D E G A C at the end of Grow.
   Do not wrap show(). */
(function(){
 const s=document.createElement('style');
 s.id='v107css';
 s.textContent='#patterns .pat-row button{min-height:56px;min-width:56px}';
 document.head.appendChild(s);
})();

if(typeof SCGAIN102==='object')SCGAIN102.turtle=1.49;

function patJarGeom107(fill){
 const top=16,height=108,bottom=top+height;
 const n=Math.max(0,Math.min(4,Math.round(Number(fill)||0)));
 const waterH=n*(height/4);
 return {top,height,bottom,fill:n,waterH,waterY:bottom-waterH,pct:n*25,halfY:bottom-height/2,quarterY:bottom-height/4};
}

patJarDraw106=function(){
 const el=$('patterns');if(!el)return;
 const f=PAT106.frac,goal=f.goal,fill=f.fill;
 const target=goal==='half'?2:1,ok=fill===target;
 const g=patJarGeom107(fill);
 const water=g.waterH>0?`<rect class="pat-jar-water" data-fill="${g.fill}" data-pct="${g.pct}" x="18" y="${g.waterY}" width="44" height="${g.waterH}" fill="#5b7ea8"/>`:'';
 el.innerHTML=patShell(patT('Fill a jar'),`
  <p class="soft">${goal==='half'?patT('Fill the jar halfway.'):patT('Fill the jar a quarter of the way.')}</p>
  <div class="pat-row">
   <button type="button" class="${goal==='half'?'on':''}" onclick="PAT106.frac={fill:0,goal:'half'};patJarDraw106()">${patT('halfway')}</button>
   <button type="button" class="${goal==='quarter'?'on':''}" onclick="PAT106.frac={fill:0,goal:'quarter'};patJarDraw106()">${patT('a quarter of the way')}</button>
  </div>
  <svg class="pat-jar" viewBox="0 0 80 140" aria-label="${patEsc(patT('A jar'))}">
   <rect class="pat-jar-glass" x="16" y="${g.top}" width="48" height="${g.height}" rx="8" fill="#fff8ec" stroke="${patInk()}" stroke-width="2"/>
   ${water}
   <line class="pat-jar-half" x1="16" y1="${g.halfY}" x2="64" y2="${g.halfY}" stroke="${patInk()}" stroke-dasharray="3 3"/>
   <line class="pat-jar-quarter" x1="16" y1="${g.quarterY}" x2="64" y2="${g.quarterY}" stroke="${patInk()}" stroke-dasharray="2 4" opacity=".6"/>
  </svg>
  <div class="pat-row">
   <button type="button" onclick="patJarPour106(1)">${patT('Pour a little')}</button>
   <button type="button" onclick="patJarPour106(-1)">${patT('Pour some out')}</button>
   <button type="button" onclick="patJarNew106()">${patT('Try again')}</button>
  </div>
  <p class="kline">${ok?patEsc(goal==='half'?patT('The jar is halfway full.'):patT('The jar is a quarter of the way full.')):patEsc(patT('Pour until it looks right.'))}</p>
 `);
 if(ok)try{if(!f.grew&&typeof lampMoment73==='function'){lampMoment73('notice');f.grew=true}}catch(e){}
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
};

patGrowStep106=function(){
 const g=PAT106.grow;
 const capMsg=()=>{g.q=[];g.msg=patT('That is as far as this seed grows.');};
 const apply=()=>{
  if((g.depth||0)>=6){capMsg();patGrowDraw106();return}
  g.depth=Math.min(6,(g.depth||0)+1);
  patGrowTone106(g.depth-1);
  if(g.depth>=6){capMsg();if(typeof patGrowPlayScale107==='function')patGrowPlayScale107()}
  patGrowDraw106();
 };
 if((g.depth||0)>=6){capMsg();patGrowDraw106();return}
 if(typeof patReduced==='function'&&patReduced())return apply();
 g.q=g.q||[];
 if((g.depth||0)+g.q.length>=6)return;
 g.q.push(apply);
 if(!g.busy){
  g.busy=true;
  const tick=()=>{
   const fn=g.q.shift();
   if(!fn){g.busy=false;return}
   fn();
   setTimeout(tick,420);
  };
  tick();
 }
};


/* ---- Pi math must-fixes ---- */

patSoundRun106=function(){
 const cv=$('patChCv');if(!cv)return;
 const x=cv.getContext('2d'),W=cv.width,H=cv.height,st=PAT106.ch,n=st.n,m=st.m;
 const N=patReduced()?80:220;
 st.parts=Array.from({length:N},()=>({x:Math.random(),y:Math.random()}));
 patSoundTone106(n,m);
 if(st.raf)cancelAnimationFrame(st.raf);
 const night=patNight(),start=performance.now();
 const stepOnce=(stepK)=>{
  st.parts.forEach(p=>{
   const v=patChladni106(p.x,p.y,n,m),a=Math.abs(v);
   if(a>0.08){
    const gx=-((Math.abs(patChladni106(p.x+0.01,p.y,n,m))-a)/0.01);
    const gy=-((Math.abs(patChladni106(p.x,p.y+0.01,n,m))-a)/0.01);
    const len=Math.hypot(gx,gy)||1;
    p.x=Math.max(0.02,Math.min(0.98,p.x+0.018*stepK*gx/len));
    p.y=Math.max(0.02,Math.min(0.98,p.y+0.018*stepK*gy/len));
   }
  });
 };
 const paint=()=>{
  x.fillStyle=night?'#0d0f1a':'#e8c894';x.fillRect(0,0,W,H);
  x.fillStyle=night?'#d8c8a4':'#5a4632';
  st.parts.forEach(p=>{x.beginPath();x.arc(p.x*W,p.y*H,1.6,0,Math.PI*2);x.fill()});
 };
 if(patReduced()){
  for(let i=0;i<80;i++)stepOnce(1);
  paint();
  return;
 }
 const dur=2400;
 const tick=(t)=>{
  const k=Math.min(1,(t-start)/dur);
  stepOnce(k);paint();
  if(k<1)st.raf=requestAnimationFrame(tick);
 };
 tick(start);
};

patShareDraw106=function(){
 const el=$('patterns');if(!el)return;
 const f=PAT106.frac,n=f.n,given=f.given||[];
 const names={2:patT('two'),3:patT('three'),4:patT('four')};
 const word=n===2?patT('half'):n===4?patT('quarter'):patT('one part for each');
 const turtles=Array.from({length:n},(_,i)=>{
  const got=given.includes(i);
  return `<button type="button" class="hubtile" data-turtle="${i}" ${got?'disabled':''} onclick="patShareGive106(${i})" aria-label="${patEsc(patT('Give a part to a turtle'))}">
    ${typeof turtleArt105==='function'?turtleArt105('tuck',72,80):(typeof friendArtInner101==='function'?friendArtInner101('turtle',1):'')}
    <small>${got?word:patT('waiting')}</small>
   </button>`;
 }).join('');
 const slices=Array.from({length:n},(_,i)=>{
  const a=-Math.PI/2+i*2*Math.PI/n,b=a+2*Math.PI/n,taken=given.includes(i);
  const x1=50+40*Math.cos(a),y1=50+40*Math.sin(a),x2=50+40*Math.cos(b),y2=50+40*Math.sin(b);
  return `<path d="M50 50 L${x1} ${y1} A40 40 0 0 1 ${x2} ${y2} Z" fill="${taken?'#c5ddd0':'#eac77d'}" stroke="${patInk()}" stroke-width="1.6"/>`;
 }).join('');
 el.innerHTML=patShell(patT('Share a pie'),`
  <p class="soft">${n===3?patT('Share this pie in three equal parts. One part for each turtle.'):patT('Share this pie fairly between {n} turtles.',{n:names[n]})}</p>
  <div class="pat-row">
   <button type="button" class="${n===2?'on':''}" onclick="PAT106.frac={n:2,given:[],ok:false};patShareDraw106()">${patT('two')}</button>
   <button type="button" class="${n===3?'on':''}" onclick="PAT106.frac={n:3,given:[],ok:false};patShareDraw106()">${patT('three')}</button>
   <button type="button" class="${n===4?'on':''}" onclick="PAT106.frac={n:4,given:[],ok:false};patShareDraw106()">${patT('four')}</button>
  </div>
  <svg class="pat-art" viewBox="0 0 100 100" width="180" height="180" aria-hidden="true">${slices}</svg>
  <div class="hubgrid">${turtles}</div>
  <p class="kline" id="patShareMsg">${f.ok?patEsc(patT('Each turtle has an equal part. That is a fair share.')):patEsc(patT('Tap a turtle to give it a part.'))}</p>
  <p class="soft">${patT('If it does not look fair yet, you can try again. Noticing is enough.')}</p>
 `);
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
};

patShareGive106=function(i){
 const f=PAT106.frac;if(f.given.includes(i))return;
 f.given.push(i);
 if(f.given.length===f.n){
  f.ok=true;
  try{if(typeof lampMoment73==='function')lampMoment73('notice')}catch(e){}
 }
 patShareDraw106();
};

{const prev=typeof patGrowTwist106==='function'?patGrowTwist106:null;
 if(prev)patGrowTwist106=function(d){return prev(-d)};
}

function patExKindOf107(rec){
 return (rec&&rec.kind==='zoom'?rec.fractal:rec&&rec.kind)||'mandel';
}
/* Koch / Sierpinski keep detail through the 10^13 zoom cap (folded from v108). */
const PAT_GEOM_MAXD108=52;
function patExGeomRender107(cv,rec,opts){
 const o=opts||{},x=cv.getContext('2d'),W=cv.width,H=cv.height;
 const span=rec.span,cx=rec.cx,cy=rec.cy,kind=patExKindOf107(rec);
 const night=patNight(),px=span/Math.max(W,H);
 if(px<PAT_MIN_PX106)return false;
 const zoom=patExZoomOf106(span);
 const pal=night?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
 const xmin=cx-span/2,ymin=cy-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
 const xmax=xmin+span,ymax=ymin+span*H/W;
 const toX=v=>(v-xmin)/dx,toY=v=>(v-ymin)/dy;
 const minLen=span/Math.max(W,1);
 const maxD=PAT_GEOM_MAXD108;
 x.fillStyle=pal[0];x.fillRect(0,0,W,H);
 if(kind==='koch'){
  x.strokeStyle=pal[4]||pal[pal.length-1];
  x.lineWidth=Math.max(1.1,2.2-(Math.log10(Math.max(1,zoom))*0.15));
  x.lineCap='round';x.lineJoin='round';
  const peak=(ax,ay,bx,by)=>{
   const ux=(bx-ax)/3,uy=(by-ay)/3;
   return {mx:ax+ux,my:ay+uy,nx:ax+2*ux,ny:ay+2*uy,
    px:ax+ux+(ux/2+uy*Math.sqrt(3)/2),py:ay+uy+(uy/2-ux*Math.sqrt(3)/2)};
  };
  const side=function(ax,ay,bx,by,d){
   const len=Math.hypot(bx-ax,by-ay),pad=len*0.45;
   if(Math.max(ax,bx)+pad<xmin||Math.min(ax,bx)-pad>xmax||Math.max(ay,by)+pad<ymin||Math.min(ay,by)-pad>ymax)return;
   if(d>=maxD||len<=minLen){
    x.beginPath();x.moveTo(toX(ax),toY(ay));x.lineTo(toX(bx),toY(by));x.stroke();
    return;
   }
   const k=peak(ax,ay,bx,by);
   side(ax,ay,k.mx,k.my,d+1);side(k.mx,k.my,k.px,k.py,d+1);side(k.px,k.py,k.nx,k.ny,d+1);side(k.nx,k.ny,bx,by,d+1);
  };
  const h=Math.sqrt(3)/2;
  side(0,0,1,0,0);side(1,0,.5,h,0);side(.5,h,0,0,0);
 }else{
  const h=Math.sqrt(3)/2;
  (function tri(ax,ay,bx,by,cx,cy,d){
   const minx=Math.min(ax,bx,cx),maxx=Math.max(ax,bx,cx),miny=Math.min(ay,by,cy),maxy=Math.max(ay,by,cy);
   if(maxx<xmin||minx>xmax||maxy<ymin||miny>ymax)return;
   const size=Math.max(maxx-minx,maxy-miny);
   if(d>=maxD||size<=minLen){
    x.fillStyle=pal[4]||pal[pal.length-1];
    x.beginPath();x.moveTo(toX(ax),toY(ay));x.lineTo(toX(bx),toY(by));x.lineTo(toX(cx),toY(cy));x.closePath();x.fill();
    return;
   }
   const mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px=(cx+ax)/2,py=(cy+ay)/2;
   tri(ax,ay,mx,my,px,py,d+1);tri(mx,my,bx,by,nx,ny,d+1);tri(px,py,nx,ny,cx,cy,d+1);
  })(0,0,1,0,.5,h,0);
 }
 if(!o.noTurtle)patExMaybeTurtle106(x,cv,rec,zoom);
 return true;
}
{const prev=typeof patExRender106==='function'?patExRender106:null;
 if(prev)patExRender106=function(cv,rec,opts){
  rec=Object.assign({},rec,{kind:patExKindOf107(rec)});
  if(rec.kind==='koch'||rec.kind==='sierp')return patExGeomRender107(cv,rec,opts);
  return prev(cv,rec,opts);
 };
}
{const prev=typeof patExKindHome106==='function'?patExKindHome106:null;
 if(prev)patExKindHome106=function(kind){
  if(kind==='koch')return {kind:'koch',cx:.5,cy:Math.sqrt(3)/6,span:1.5};
  return prev(kind);
 };
}

patExScaleLine106=function(zoom){
 if(zoom<20)return patT('A close look.');
 if(zoom<200)return patT('Deeper than a leaf compared with a shrub.');
 if(zoom<2e3)return patT('Deeper than a coin compared with a person.');
 if(zoom<2e4)return patT('Deeper than an ant compared with a bus.');
 if(zoom<2e5)return patT('Deeper than a grain of sand compared with a room.');
 if(zoom<2e6)return patT('Deeper than a grain of sand compared with a long path.');
 if(zoom<1e9)return patT('Deeper than a grain of sand compared with a mountain.');
 if(zoom<1e10)return patT('Deeper than a grain of sand compared with a whole country.');
 if(zoom<3e12)return patT('Deeper than a grain of sand compared with Earth.');
 return patT('Deeper than a tiny living cell compared with Earth.');
};

{const prev=typeof patPairArt106==='function'?patPairArt106:null;
 if(prev)patPairArt106=function(id){
  if(id==='flake'){
   return `<svg viewBox="0 0 120 120" width="140" height="140" aria-hidden="true"><rect width="120" height="120" rx="12" fill="#1b2838"/><g stroke="#e0fbfc" fill="none" stroke-width="2" stroke-linecap="round">${[0,60,120,180,240,300].map(a=>`<path d="M60 60 L60 28" transform="rotate(${a} 60 60)"/><path d="M60 36 L52 28 M60 36 L68 28" transform="rotate(${a} 60 60)"/>`).join('')}</g></svg>`;
  }
  return prev(id);
 };
}

/* Soft sounds and Bedtime mute the Grow ending (folded from v108). */
function patGrowPlayScale107(){
 try{
  if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
  const c=typeof ac==='function'?ac():null;if(!c)return;
  const bedtime=!!(document.body&&document.body.classList.contains('bedtime'));
  const night=typeof patNight==='function'&&patNight();
  const vol=(night||bedtime)?.06:.12,t0=c.currentTime+.04,step=.75;
  const freq=[261.63,293.66,329.63,392,440,523.25];
  freq.forEach((f,i)=>{
   const t=t0+i*step;
   const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),g2=c.createGain();
   o.type='sine';o.frequency.value=f;o2.type='sine';o2.frequency.value=f/2;
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+.7);
   g2.gain.setValueAtTime(0,t);g2.gain.linearRampToValueAtTime(vol*.45,t+.06);g2.gain.exponentialRampToValueAtTime(.0001,t+1.15);
   o.connect(g);g.connect(c.destination);o2.connect(g2);g2.connect(c.destination);
   o.start(t);o.stop(t+.75);o2.start(t);o2.stop(t+1.2);
  });
 }catch(e){}
}
