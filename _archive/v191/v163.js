/* v163: Zoom a Fractal 2 on the v106 explorer, plus a calm companion
   accent color in the looks picker. show() is not wrapped. Existing
   Mandelbrot / Julia / Koch / Sierpinski pixels stay the same. Dragon
   egg art is not edited. v4.2 SVGs are not used. */
(function(root){
'use strict';

const PI=Math.PI;
/* Superattractive centers (f^p(0)=0), computed as roots of the period
   polynomial. Period 3, 4 and 5 bulbs used for antenna counting sit on
   the main cardioid. Minibrots used for "find the baby" are isolated
   islands: the period-3 copy on the spike, and the period-4 copies north
   and south of the main set. */
const BULB163={
  3:{cx:-0.122561167,cy:0.744861767,span:0.62,spokes:3},
  4:{cx:0.282271391,cy:0.530060618,span:0.48,spokes:4},
  5:{cx:0.379513588,cy:0.334932306,span:0.36,spokes:5}
};
const BABY163=[
  {cx:-1.754877666,cy:0,span:0.14,period:3},
  {cx:-0.156520167,cy:1.032247109,span:0.12,period:4},
  {cx:-0.156520167,cy:-1.032247109,span:0.12,period:4}
];
const ROOTS163=[
  {re:1,im:0},
  {re:-0.5,im:Math.sqrt(3)/2},
  {re:-0.5,im:-Math.sqrt(3)/2}
];
/* Calm accent palette (about 6). Device-only. */
const PALETTE163=[
  {id:'amber',hex:'#E6B454',en:'Amber',es:'Ámbar'},
  {id:'honey',hex:'#D4A060',en:'Honey',es:'Miel'},
  {id:'leaf',hex:'#7A9A6A',en:'Leaf',es:'Hoja'},
  {id:'sage',hex:'#6F9A7A',en:'Sage',es:'Salvia'},
  {id:'rose',hex:'#C98990',en:'Rose',es:'Rosa'},
  {id:'sea',hex:'#2E8A82',en:'Sea',es:'Mar'}
];

function t163(s,v){return typeof gT==='function'?gT(s,v):(typeof patT==='function'?patT(s,v):s)}
function e163(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function reduced163(){return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}
function pid163(){return typeof curPid==='function'?curPid():''}
function sfxOn163(){return typeof lampSfxOn73==='function'?!!lampSfxOn73():(typeof LAMP_SFX==='undefined'||!!LAMP_SFX)}

/* Shared membership budget for the drag-a-dot mini-map and the connected/dust line (Pi v163 should-fix). */
const ITERS163=2000;
function inMandelbrot163(cr,ci,iters){
  iters=iters==null?ITERS163:iters;
  let zr=0,zi=0,k=0;
  while(k<iters&&zr*zr+zi*zi<=4){
    const nz=zr*zr-zi*zi+cr;zi=2*zr*zi+ci;zr=nz;k++;
  }
  return k>=iters;
}

function escapeCount163(cr,ci,iters){
  iters=iters||4000;
  let zr=0,zi=0,k=0;
  while(k<iters&&zr*zr+zi*zi<=4){
    const nz=zr*zr-zi*zi+cr;zi=2*zr*zi+ci;zr=nz;k++;
  }
  return k;
}

/* Dave Boll 1991: near c = -0.75 + εi, escape count × ε → π. */
function piNeck163(eps,iters){
  const n=escapeCount163(-0.75,eps,iters||200000);
  return {n:n,eps:eps,prod:n*eps,pi:PI};
}

function newtonIter163(x,y,iters){
  iters=iters||40;
  let zr=x,zi=y,k=0;
  for(;k<iters;k++){
    const r2=zr*zr+zi*zi;
    if(r2<1e-16)break;
    /* z - (z^3-1)/(3z^2) = (2z^3+1)/(3z^2) */
    const z2r=zr*zr-zi*zi,z2i=2*zr*zi;
    const z3r=z2r*zr-z2i*zi,z3i=z2r*zi+z2i*zr;
    const nr=2*z3r+1,ni=2*z3i;
    const den=3*r2*r2; /* 3 |z^2|^2 = 3 (z^2 * conj(z^2)) wait: 3z^2 in denom */
    /* 1/(3z^2) = conj(3z^2) / (9 |z^2|^2) = 3 conj(z^2) / (9 |z^2|^2) = conj(z^2)/(3 |z^2|^2) */
    const mag=z2r*z2r+z2i*z2i;
    if(mag<1e-20)break;
    const invr=z2r/(3*mag),invi=-z2i/(3*mag);
    const tr=nr*invr-ni*invi,ti=nr*invi+ni*invr;
    const dr=tr-zr,di=ti-zi;
    zr=tr;zi=ti;
    if(dr*dr+di*di<1e-16)break;
  }
  let best=0,bd=1e9;
  for(let i=0;i<3;i++){
    const d=(zr-ROOTS163[i].re)*(zr-ROOTS163[i].re)+(zi-ROOTS163[i].im)*(zi-ROOTS163[i].im);
    if(d<bd){bd=d;best=i}
  }
  return {root:best,k:k,zr:zr,zi:zi};
}

function hook163(name,wrap){
  const prev=root[name];
  if(typeof prev!=='function'||prev._v163)return prev;
  const next=wrap(prev);
  next._v163=1;
  next._base=prev._base||prev;
  root[name]=next;
  return next;
}

if(typeof document!=='undefined'&&!document.getElementById('v163css')){
  const s=document.createElement('style');
  s.id='v163css';
  s.textContent=[
    '#patterns .pat-tools163{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0}',
    '#patterns .pat-tools163 button{min-height:48px;min-width:48px}',
    '#patterns .pat-tools163 button.on{border-color:var(--acc,#4e6b5c);box-shadow:inset 0 0 0 2px var(--acc,#4e6b5c)}',
    '#patterns .pat-julia163{margin:8px 0}',
    '#patterns .pat-julia163 canvas{display:block;width:100%;max-width:280px;height:auto;margin:0 auto;border-radius:16px;background:#0d0f1a;touch-action:none}',
    '#patterns .pat-dot163{position:absolute;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;border:2px solid #fff6d8;background:#e6b454;box-shadow:0 0 0 2px #3a2a1a;pointer-events:none}',
    '#patterns .pat-mapwrap163{position:relative;max-width:280px;margin:0 auto}',
    '#patterns .pat-line163{min-height:1.4em}',
    '#look .accent163{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}',
    '#look .accent163 button{width:48px;height:48px;min-width:48px;min-height:48px;border-radius:50%;border:3px solid var(--soft,#e4dccb);padding:0}',
    '#look .accent163 button.on{box-shadow:inset 0 0 0 2px var(--ink,#2a2430);border-color:var(--hi,#d9b44a);border-width:5px}',
    '#look .accent163 button.own{background:conic-gradient(#e6b454,#7a9a6a,#c98990,#2e8a82,#e6b454)}',
    '#adults [data-pi163] .pi-art163{display:block;width:120px;height:64px;margin:0 0 .4rem}'
  ].join('');
  (document.documentElement||document.head).appendChild(s);
}

/* ---------- Zoom lullaby (v143 Bedtime Glow bus, soft falling pitch) ---------- */
let lull163=null;
function lullStop163(){
  if(!lull163)return;
  try{
    const c=lull163.c,t=c.currentTime;
    if(lull163.g)lull163.g.gain.setTargetAtTime(0,t,.08);
    if(lull163.o)lull163.o.stop(t+.2);
    if(lull163.o2)lull163.o2.stop(t+.2);
  }catch(e){}
  lull163=null;
}
function lullHz163(zoom){
  const z=Math.max(1,Math.min(1e13,zoom||1));
  const t=Math.log10(z)/13; /* 0 at home, 1 at the cap */
  return 196*Math.pow(65.4/196,t);
}
function lullStart163(){
  if(reduced163()||!sfxOn163())return;
  if(lull163)return;
  try{
    const c=typeof ac==='function'?ac():null;if(!c)return;
    const t=c.currentTime;
    const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();
    const hz=lullHz163(typeof patExZoomOf106==='function'&&PAT106&&PAT106.ex?patExZoomOf106(PAT106.ex.span):1);
    o.type='sine';o2.type='sine';
    o.frequency.setValueAtTime(hz,t);o2.frequency.setValueAtTime(hz*1.003,t);
    lp.type='lowpass';lp.frequency.value=520;lp.Q.value=.6;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+1.6);
    o.connect(g);o2.connect(g);g.connect(lp);lp.connect(c.destination);
    o.start(t);o2.start(t);
    lull163={c:c,o:o,o2:o2,g:g,lp:lp};
  }catch(e){}
}
function lullUpdate163(){
  if(!lull163||!PAT106||!PAT106.ex)return;
  if(!sfxOn163()){lullStop163();return}
  try{
    const hz=lullHz163(patExZoomOf106(PAT106.ex.span));
    const t=lull163.c.currentTime;
    lull163.o.frequency.linearRampToValueAtTime(hz,t+.45);
    lull163.o2.frequency.linearRampToValueAtTime(hz*1.003,t+.45);
  }catch(e){}
}

/* ---------- Explorer tools ---------- */
function mode163(){return (PAT106&&PAT106.ex&&PAT106.ex.mode163)||''}
function setMode163(m){
  if(!PAT106||!PAT106.ex)return;
  const ex=PAT106.ex;
  if(m==='newton'){
    const home=typeof patExKindHome106==='function'?patExKindHome106('newton'):{kind:'newton',cx:0,cy:0,span:3.2};
    Object.assign(ex,home,{limit:false,msg:'',mode163:'newton',lull:ex.lull});
  }else if(m==='juliaDot'){
    Object.assign(ex,{kind:'julia1',cx:0,cy:0,span:3.2,jr:-0.5,ji:0,limit:false,msg:'',mode163:'juliaDot'});
  }else{
    if(ex.kind==='newton'||m===''){
      if(ex.kind==='newton'&&m!=='newton'){
        const home=patExKindHome106('mandel');
        Object.assign(ex,home,{limit:false,msg:''});
      }
    }
    ex.mode163=m||'';
  }
  if(typeof patExDraw106==='function')patExDraw106();
}

function pal163(connected,night){
  if(night){
    return connected
      ?['#0d0f1a','#2a2418','#4e3f2a','#8a7048','#eac77d','#fff6d8']
      :['#0d0f1a','#1a2230','#2a3a4a','#4a6578','#8aa4b0','#d8e6ee'];
  }
  return connected
    ?['#fff8ec','#e8c894','#c45a3a','#b8864a','#6f9a7a','#3a2a1a']
    :['#eef2f6','#c8d4e0','#7a92a8','#5b7ea8','#6f8aa0','#2a3040'];
}

function renderNewton163(cv,rec,opts){
  const o=opts||{},x=cv.getContext('2d'),W=cv.width,H=cv.height;
  const span=rec.span,cx=rec.cx,cy=rec.cy,px=span/Math.max(W,H);
  if(typeof PAT_MIN_PX106==='number'&&px<PAT_MIN_PX106)return false;
  const night=typeof patNight==='function'&&patNight();
  const cols=night
    ?[[58,46,36],[48,64,52],[40,50,68]]
    :[[232,204,164],[186,204,180],[180,198,214]];
  const xmin=cx-span/2,ymin=cy-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
  const img=x.createImageData(W,H),d=img.data,iters=28;
  for(let j=0;j<H;j++){
    const y0=ymin+j*dy;
    for(let i=0;i<W;i++){
      const r=newtonIter163(xmin+i*dx,y0,iters);
      const c=cols[r.root],sh=0.45+0.55*(1-r.k/iters);
      const p=(j*W+i)*4;
      d[p]=c[0]*sh;d[p+1]=c[1]*sh;d[p+2]=c[2]*sh;d[p+3]=255;
    }
  }
  x.putImageData(img,0,0);
  return true;
}

let mapCache163=null;
function mandelMap163(cv,dot){
  const x=cv.getContext('2d'),W=cv.width,H=cv.height;
  const cx=-0.5,span=3.5,xmin=cx-span/2,ymin=0-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
  const night=typeof patNight==='function'&&patNight();
  const pal=night?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
  if(!mapCache163||mapCache163.w!==W||mapCache163.h!==H||mapCache163.night!==night||mapCache163.iters!==ITERS163){
    const img=x.createImageData(W,H),d=img.data,iters=ITERS163;
    for(let j=0;j<H;j++){
      const y0=ymin+j*dy;
      for(let i=0;i<W;i++){
        const x0=xmin+i*dx;
        let zr=0,zi=0,k=0;
        while(k<iters&&zr*zr+zi*zi<=4){const nz=zr*zr-zi*zi+x0;zi=2*zr*zi+y0;zr=nz;k++}
        const n=k/iters,inside=n>=.999;
        const col=(typeof patExColor106==='function')?patExColor106(pal,n,inside):[20,16,28];
        const p=(j*W+i)*4;d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255;
      }
    }
    mapCache163={w:W,h:H,night:night,iters:ITERS163,img:img};
  }
  x.putImageData(mapCache163.img,0,0);
  if(dot){
    const u=(dot.jr-xmin)/span,v=(dot.ji-ymin)/(span*H/W);
    x.save();
    x.beginPath();x.arc(u*W,v*H,Math.max(5,W*0.028),0,PI*2);
    x.fillStyle='#e6b454';x.strokeStyle='#fff6d8';x.lineWidth=2;x.fill();x.stroke();
    x.restore();
  }
}

function drawMarkers163(cv,items,color){
  const ex=PAT106.ex,x=cv.getContext('2d'),W=cv.width,H=cv.height;
  const span=ex.span,cx=ex.cx,cy=ex.cy,xmin=cx-span/2,ymin=cy-span*H/W/2;
  x.save();
  items.forEach(it=>{
    const u=(it.cx-xmin)/span,v=(it.cy-ymin)/(span*H/W);
    if(u<-0.05||u>1.05||v<-0.05||v>1.05)return;
    const r=Math.max(8,Math.min(W,H)*0.035);
    x.beginPath();x.arc(u*W,v*H,r,0,PI*2);
    x.fillStyle=color||'rgba(230,180,84,.55)';
    x.strokeStyle='rgba(255,246,216,.9)';x.lineWidth=1.6;x.fill();x.stroke();
    if(it.label){
      x.fillStyle='#3a2a1a';x.font='700 13px system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(it.label),u*W,v*H);
    }
  });
  x.restore();
}

function markerHit163(cv,clientX,clientY,items){
  if(typeof patExAt106!=='function')return null;
  const p=patExAt106(cv,clientX,clientY),ex=PAT106.ex;
  const span=ex.span,tol=span*0.045;
  let best=null,bd=1e9;
  items.forEach(it=>{
    const d=Math.hypot(p.x-it.cx,p.y-it.cy);
    if(d<tol&&d<bd){bd=d;best=it}
  });
  return best;
}

function breathZoom163(){
  const ex=PAT106.ex;if(!ex)return;
  if(ex.kind==='juliaDot')ex.kind='julia1';
  ex.breath163=1;
  const nxt=ex.span/2.2;
  if(typeof patExCanZoom106==='function'&&!patExCanZoom106(nxt)){
    ex.limit=true;ex.breath163=0;
    const lim=$('patExLimit');if(lim)lim.textContent=t163('This is as deep as we go today.');
    return;
  }
  const start={cx:ex.cx,cy:ex.cy,span:ex.span},end={cx:ex.cx,cy:ex.cy,span:nxt},cv=$('patExCv');
  const go=(k)=>{
    ex.cx=start.cx+(end.cx-start.cx)*k;ex.cy=start.cy+(end.cy-start.cy)*k;ex.span=start.span+(end.span-start.span)*k;
    ex.limit=false;
    if(cv){
      if(k<1&&!reduced163())patExRender106(cv,ex,{preview163:1});
      else patExRender106(cv,ex);
      paintOverlays163(cv);
    }
    const sc=$('patExScale');if(sc&&typeof patExScaleLine106==='function')sc.textContent=patExScaleLine106(patExZoomOf106(ex.span));
    lullUpdate163();
  };
  if(reduced163()){go(1);ex.breath163=0;return}
  const t0=performance.now(),dur=4000;
  const tick=(t)=>{const k=Math.min(1,(t-t0)/dur),e=k*k*(3-2*k);go(e);if(k<1)requestAnimationFrame(tick);else ex.breath163=0};
  requestAnimationFrame(tick);
}

function paintOverlays163(cv){
  if(!cv||!PAT106||!PAT106.ex)return;
  const m=mode163();
  if(m==='baby')drawMarkers163(cv,BABY163.map((b,i)=>({cx:b.cx,cy:b.cy,label:''})));
  if(m==='antenna')drawMarkers163(cv,[3,4,5].map(p=>({cx:BULB163[p].cx,cy:BULB163[p].cy,label:String(BULB163[p].spokes)})));
}

function juliaLine163(jr,ji){
  const ok=inMandelbrot163(jr,ji,ITERS163);
  return ok?t163('Looks like one piece'):t163('Looks like dust');
}

function bindDot163(map,dotEl){
  if(!map||map._dot163)return;map._dot163=1;
  const pick=(ev)=>{
    const r=map.getBoundingClientRect();
    const u=(ev.clientX-r.left)/r.width,v=(ev.clientY-r.top)/r.height;
    const span=3.5,cx=-0.5,cy=0,aspect=map.height/map.width;
    const jr=cx+(u-0.5)*span,ji=cy+(v-0.5)*span*aspect;
    const ex=PAT106.ex;ex.jr=jr;ex.ji=ji;
    mandelMap163(map,{jr:jr,ji:ji});
    const line=$('patJuliaLine163');if(line)line.textContent=juliaLine163(jr,ji);
    const jcv=$('patExCv');
    if(jcv){
      const coarse=ex._drag163?{preview163:1}:null;
      if(typeof patExRender106==='function'){
        if(coarse)renderJuliaPreview163(jcv,ex);
        else patExRender106(jcv,ex);
      }
    }
    lullUpdate163();
  };
  map.addEventListener('pointerdown',e=>{map.setPointerCapture(e.pointerId);PAT106.ex._drag163=1;pick(e)});
  map.addEventListener('pointermove',e=>{if(PAT106.ex&&PAT106.ex._drag163)pick(e)});
  const up=e=>{if(!PAT106.ex||!PAT106.ex._drag163)return;PAT106.ex._drag163=0;pick(e)};
  map.addEventListener('pointerup',up);map.addEventListener('pointercancel',up);
}

function renderJuliaPreview163(cv,ex){
  /* Half-res while the dot is moving, then a full pass on release. */
  const tmp=renderJuliaPreview163._cv||(renderJuliaPreview163._cv=document.createElement('canvas'));
  const W=cv.width,H=cv.height;
  tmp.width=Math.max(120,W>>1);tmp.height=Math.max(120,H>>1);
  if(typeof patExRender106==='function')patExRender106(tmp,ex,{noTurtle:true});
  const x=cv.getContext('2d');
  x.imageSmoothingEnabled=true;x.drawImage(tmp,0,0,W,H);
}

function toolRow163(){
  const m=mode163(),ex=PAT106.ex||{};
  const tools=[
    ['juliaDot',t163('Drag a dot')],
    ['baby',t163('Find the baby')],
    ['antenna',t163('Count the spokes')],
    ['newton',t163('Three wells')]
  ];
  const btns=tools.map(([id,lab])=>`<button type="button" class="${m===id?'on':''}" data-tool163="${id}">${e163(lab)}</button>`).join('');
  const breath=`<button type="button" data-breath163="1">${e163(t163('A slow breath'))}</button>`;
  const lull=`<button type="button" class="${ex.lull?'on':''}" data-lull163="1" aria-pressed="${ex.lull?'true':'false'}">${e163(t163('A quiet tone'))}</button>`;
  return `<div class="pat-tools163" data-tools163="1">${btns}${breath}${lull}</div>`;
}

function extraPanel163(){
  const m=mode163(),ex=PAT106.ex||{};
  if(m==='juliaDot'){
    const line=juliaLine163(ex.jr||0,ex.ji||0);
    return `<div class="pat-julia163"><p class="soft">${e163(t163('A dot on the Mandelbrot set picks a Julia set. Move the dot and the other picture changes.'))}</p>
      <div class="pat-zoombox"><div><p class="kline">${e163(t163('Mandelbrot'))}</p><div class="pat-mapwrap163"><canvas class="pat-cv" id="patMandelDot163" width="220" height="220" aria-label="${e163(t163('A Mandelbrot map with a moving dot'))}"></canvas></div></div>
      <div><p class="kline">${e163(t163('Julia'))}</p></div></div>
      <p class="kline pat-line163" id="patJuliaLine163">${e163(line)}</p></div>`;
  }
  if(m==='baby'){
    return `<p class="soft" id="patHint163">${e163(t163('A little Mandelbrot is hiding near a soft glow. You can zoom there.'))}</p>`;
  }
  if(m==='antenna'){
    return `<p class="soft" id="patHint163">${e163(t163('The spokes on a bulb\'s antenna match its period. You can count 3, 4, or 5.'))}</p>`;
  }
  if(m==='newton'||ex.kind==='newton'){
    return `<p class="soft">${e163(t163('Three wells. Each spot rolls into one. On every border you can still find all three.'))}</p>`;
  }
  return '';
}

function bindTools163(root){
  if(!root||root._tools163)return;root._tools163=1;
  root.addEventListener('click',ev=>{
    const tool=ev.target.closest('[data-tool163]');
    if(tool){
      ev.preventDefault();
      const id=tool.getAttribute('data-tool163');
      const cur=mode163();
      setMode163(cur===id?'':id);
      return;
    }
    if(ev.target.closest('[data-breath163]')){
      ev.preventDefault();breathZoom163();return;
    }
    if(ev.target.closest('[data-lull163]')){
      ev.preventDefault();
      const ex=PAT106.ex;ex.lull=!ex.lull;
      if(ex.lull)lullStart163();else lullStop163();
      const b=ev.target.closest('[data-lull163]');
      b.classList.toggle('on',!!ex.lull);
      b.setAttribute('aria-pressed',ex.lull?'true':'false');
    }
  });
}

function mountExplorer163(){
  const el=$('patterns');if(!el||!$('patExCv'))return;
  if(!el.querySelector('[data-tools163]')){
    const row=el.querySelector('.pat-row');
    const tools=document.createElement('div');
    tools.innerHTML=toolRow163();
    const node=tools.firstChild;
    if(row&&row.parentNode)row.parentNode.insertBefore(node,row);
    else el.querySelector('.card')&&el.querySelector('.card').appendChild(node);
    const panel=document.createElement('div');
    panel.innerHTML=extraPanel163();
    const first=panel.firstChild;
    if(first&&node&&node.parentNode)node.parentNode.insertBefore(first,node.nextSibling);
    else if(first)el.querySelector('.card')&&el.querySelector('.card').appendChild(first);
    bindTools163(el);
  }
  const cv=$('patExCv');
  if(cv)paintOverlays163(cv);
  const map=$('patMandelDot163');
  if(map&&PAT106.ex){
    mandelMap163(map,{jr:PAT106.ex.jr,ji:PAT106.ex.ji});
    bindDot163(map);
    /* Move the main Julia canvas into the right column if the zoom box is present. */
    const box=el.querySelector('.pat-zoombox');
    if(box&&cv.parentNode!==box){
      const right=box.children[1];
      if(right)right.appendChild(cv);
    }
  }
}

/* ---------- Hooks onto the v106 explorer (pixel-identical for old kinds) ---------- */
hook163('patExKindHome106',function(prev){
  return function(kind){
    if(kind==='newton')return {kind:'newton',cx:0,cy:0,span:3.2};
    if(kind==='juliaDot')return {kind:'julia1',cx:0,cy:0,span:3.2,jr:-0.5,ji:0};
    return prev.apply(this,arguments);
  };
});
hook163('patExCaption106',function(prev){
  return function(kind){
    if(kind==='newton')return t163('Three wells. Each spot rolls into one. On every border you can still find all three.');
    return prev.apply(this,arguments);
  };
});
hook163('patExKindOf107',function(prev){
  return function(rec){
    if(rec&&(rec.kind==='newton'||rec.fractal==='newton'))return 'newton';
    return prev.apply(this,arguments);
  };
});
hook163('patExRender106',function(prev){
  return function(cv,rec,opts){
    const o=opts||{};
    const kind=(typeof patExKindOf107==='function')?patExKindOf107(rec):(rec&&rec.kind);
    if(kind==='newton'){
      if(o.preview163){
        const tmp=renderNewton163._prev||(renderNewton163._prev=document.createElement('canvas'));
        tmp.width=Math.max(120,cv.width>>1);tmp.height=Math.max(120,cv.height>>1);
        const ok=renderNewton163(tmp,rec,{noTurtle:true});
        if(!ok)return false;
        const x=cv.getContext('2d');
        x.imageSmoothingEnabled=true;x.drawImage(tmp,0,0,cv.width,cv.height);
        return true;
      }
      return renderNewton163(cv,rec,o);
    }
    if(o.preview163&&kind!=='koch'&&kind!=='sierp'){
      const tmp=patExRender106._prev163||(patExRender106._prev163=document.createElement('canvas'));
      tmp.width=Math.max(120,cv.width>>1);tmp.height=Math.max(120,cv.height>>1);
      const ok=prev.call(this,tmp,rec,{noTurtle:true});
      if(!ok)return false;
      const x=cv.getContext('2d');
      x.imageSmoothingEnabled=true;x.drawImage(tmp,0,0,cv.width,cv.height);
      return true;
    }
    /* Optional warmer/cooler Julia palette only in drag-a-dot mode, via a
       temporary rec flag — default julia1/julia2 pixels stay untouched. */
    if(kind!=='newton'&&PAT106&&PAT106.ex&&PAT106.ex.mode163==='juliaDot'&&(kind==='julia1'||kind==='julia2')&&!o.plain163){
      const night=typeof patNight==='function'&&patNight();
      const ok=inMandelbrot163(rec.jr||0,rec.ji||0,ITERS163);
      const saved=patExColor106;
      const pal=pal163(ok,night);
      /* Reuse the original renderer: paint, then we cannot swap pal inside
         it without wrapping color. Wrap patExColor106 only for this call. */
      let result;
      if(typeof patExColor106==='function'&&!patExColor106._tmp163){
        const colPrev=patExColor106;
        patExColor106=function(p,n,inside){return colPrev(pal,n,false)};
        patExColor106._tmp163=1;
        try{result=prev.call(this,cv,rec,o)}finally{patExColor106=colPrev}
      }else result=prev.call(this,cv,rec,o);
      return result;
    }
    return prev.apply(this,arguments);
  };
});
hook163('patExDraw106',function(prev){
  return function(){
    const r=prev.apply(this,arguments);
    try{mountExplorer163()}catch(e){}
    try{if(PAT106&&PAT106.ex&&PAT106.ex.lull)lullStart163();lullUpdate163()}catch(e){}
    return r;
  };
});
hook163('patExGo106',function(prev){
  return function(nx,ny,span,slow){
    if(PAT106&&PAT106.ex&&PAT106.ex.breath163&&slow){
      /* breathZoom163 handles its own animation. */
    }
    const r=prev.apply(this,arguments);
    try{lullUpdate163();const cv=$('patExCv');if(cv)paintOverlays163(cv)}catch(e){}
    return r;
  };
});
hook163('patExTap106',function(prev){
  return function(cv,ev){
    const m=mode163();
    if(m==='baby'||m==='antenna'){
      const items=m==='baby'?BABY163:[3,4,5].map(p=>BULB163[p]);
      const hit=markerHit163(cv,ev.clientX,ev.clientY,items);
      if(hit){
        const target=m==='baby'?hit:hit;
        const span=target.span||0.5;
        if(m==='antenna'){
          const msg=t163('This antenna has {n} spokes.',{n:String(target.spokes)});
          PAT106.ex.msg=msg;
          const h=$('patHint163');if(h)h.textContent=msg;
        }else{
          PAT106.ex.msg=t163('You found a little Mandelbrot.');
          const h=$('patHint163');if(h)h.textContent=PAT106.ex.msg;
        }
        if(typeof patExGo106==='function')patExGo106(target.cx,target.cy,span,true);
        return;
      }
    }
    return prev.apply(this,arguments);
  };
});
hook163('patExSetKind106',function(prev){
  return function(kind){
    if(PAT106&&PAT106.ex)PAT106.ex.mode163='';
    if(kind==='newton'){setMode163('newton');return}
    return prev.apply(this,arguments);
  };
});

/* When kinds are listed, add Three wells as a kind button after Sierpinski
   only if we also want it in the kind row — tools already expose it. Leave
   the original five kind buttons unchanged. */

const prevAfter163=typeof afterShow95==='function'?afterShow95:null;
if(prevAfter163&&!prevAfter163._v163){
  afterShow95=function(id){
    const r=prevAfter163.apply(this,arguments);
    try{
      if(id!=='patterns')lullStop163();
      if(id==='adults')attachPi163();
      if(id==='look')attachAccent163();
    }catch(e){}
    return r;
  };
  afterShow95._v163=1;
}

/* ---------- Pi nerd card (Grown-ups, EN/ES) ---------- */
function attachPi163(){
  const root=typeof $==='function'?$('adults'):document.getElementById('adults');
  if(!root||root.querySelector('[data-pi163]'))return;
  if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
  const art='<svg class="pi-art163" viewBox="0 0 120 64" width="120" height="64" aria-hidden="true" focusable="false"><rect x="1" y="1" width="118" height="62" rx="10" fill="#fff8ec" stroke="#72583f" stroke-width="1.4"/><path d="M14 32 Q34 18 50 32 Q62 44 72 32 Q86 16 106 30" fill="none" stroke="#4e6b5c" stroke-width="2"/><circle cx="50" cy="32" r="4.5" fill="#e6b454" stroke="#3a2a1a" stroke-width="1.1"/><text x="86" y="50" font-size="16" font-family="Georgia,serif" fill="#3a2a1a">π</text></svg>';
  const html=`<div class="card" data-pi163="1"><h3 class="kline">${e163(t163('A hidden π'))}</h3>${art}<p>${e163(t163('Near the neck of the Mandelbrot set, at c = −0.75 + εi, the number of steps until the point escapes, times ε, gets closer and closer to π. Dave Boll noticed this in 1991.'))}</p></div>`;
  root.insertAdjacentHTML('beforeend',html);
}
const prevAdults163=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
if(typeof prevAdults163==='function'&&!prevAdults163._v163){
  renderAdults=function(){
    const r=prevAdults163.apply(this,arguments);
    try{attachPi163()}catch(e){}
    return r;
  };
  renderAdults._v163=1;
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
}

/* ---------- Companion accent colors (looks picker, device only) ---------- */
function accentKey163(pid){return 'lamp_accent163@'+(pid||pid163()||'device')}
function accentLoad163(pid){
  try{
    const raw=(typeof RAW!=='undefined'&&RAW.get)?RAW.get(accentKey163(pid)):localStorage.getItem(accentKey163(pid));
    const o=raw?(typeof safeJSON==='function'?safeJSON(raw,{}):JSON.parse(raw)):{};
    return (o&&typeof o==='object')?o:{};
  }catch(e){return {}}
}
function accentSave163(kind,id,pid){
  const all=accentLoad163(pid);
  if(!id||id==='own')delete all[kind];else all[kind]=id;
  const s=JSON.stringify(all);
  try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(accentKey163(pid),s);else localStorage.setItem(accentKey163(pid),s)}catch(e){}
}
function accentHex163(kind,pid){
  const id=accentLoad163(pid)[kind];
  const pal=PALETTE163.find(p=>p.id===id);
  return pal?pal.hex:null;
}
function friendKind163(){
  try{
    if(typeof previewKind147==='function')return previewKind147(pid163());
    if(typeof friendActive101==='function')return friendActive101(pid163())||'lamp';
  }catch(e){}
  return 'lamp';
}
function isDragonEgg163(kind,stage){
  return kind==='dragon'&&(!stage||stage==='hatchling'||stage==='egg');
}
function applyAccentSVG163(kind,html,stage){
  if(!html||isDragonEgg163(kind,stage))return html;
  const hex=accentHex163(kind);
  /* Strip a previous overlay so redraws stay a single accent. */
  html=String(html).replace(/<g class="il-accent163"[^>]*>[\s\S]*?<\/g>/g,'');
  if(!hex)return html;
  const glow=`<g class="il-accent163" data-accent163="1" pointer-events="none"><ellipse cx="100" cy="128" rx="62" ry="70" fill="${hex}" opacity=".26"/></g>`;
  if(/<svg[\s\S]*?>/i.test(html))return html.replace(/(<svg[^>]*>)/i,'$1'+glow);
  return glow+html;
}
function hookArt163(){
  if(typeof IL119==='object'&&typeof IL119.art==='function'&&!IL119.art._v163){
    const prev=IL119.art;
    IL119.art=function(kind,stage,opt){
      const html=prev.apply(this,arguments);
      try{return applyAccentSVG163(kind,html,stage)}catch(e){return html}
    };
    IL119.art._v163=1;
    IL119.art._base=prev._base||prev;
  }
  if(typeof friendArtInner101==='function'&&!friendArtInner101._v163acc){
    const prevF=friendArtInner101;
    friendArtInner101=function(id,stage){
      const html=prevF.apply(this,arguments);
      try{return applyAccentSVG163(id,html,stage)}catch(e){return html}
    };
    friendArtInner101._v163acc=1;
  }
}
function attachAccent163(){
  hookArt163();
  const root=typeof $==='function'?$('look'):document.getElementById('look');
  if(!root)return;
  let card=root.querySelector('[data-accent163-card]');
  const kind=friendKind163();
  const cur=accentLoad163()[kind]||'own';
  const chips=[{id:'own',hex:null,en:t163('Their own'),es:t163('Their own')}].concat(PALETTE163).map(p=>{
    const on=cur===p.id;
    const label=e163(p.id==='own'?t163('Their own'):t163(p.en));
    const bg=p.id==='own'?'':`style="background:${p.hex}"`;
    return `<button type="button" class="${p.id==='own'?'own':''}${on?' on':''}" data-accent163="${p.id}" aria-pressed="${on?'true':'false'}" aria-label="${label}" ${bg}></button>`;
  }).join('');
  const inner=`<h3 class="kline">${e163(t163('A small color'))}</h3><p class="soft">${e163(t163('Your friend keeps their own color. You can pick a small glow, saved on this device.'))}</p><div class="accent163">${chips}</div>`;
  if(!card){
    card=document.createElement('div');
    card.className='card';
    card.dataset.accent163Card='1';
    const looks=root.querySelector('[data-look147-card],[data-look147]');
    if(looks&&looks.parentNode){
      const host=looks.closest('.card')||looks;
      host.after(card);
    }else root.appendChild(card);
  }
  card.innerHTML=inner;
  if(!card._acc163){
    card._acc163=1;
    card.addEventListener('click',ev=>{
      const b=ev.target.closest('[data-accent163]');if(!b)return;
      ev.preventDefault();
      const id=b.getAttribute('data-accent163');
      accentSave163(friendKind163(),id);
      attachAccent163();
      try{if(typeof refreshAfterLook147==='function')refreshAfterLook147();
      else if(typeof artRefresh63==='function')artRefresh63(document);
      if(typeof lampMountAll73==='function')lampMountAll73()}catch(e){}
    });
  }
}
hookArt163();
if(typeof pWrap68==='function'){
  try{pWrap68('renderLook',null,function(){try{attachAccent163()}catch(e){}})}catch(e){}
}else if(typeof renderLook==='function'&&!renderLook._v163){
  const prevL=renderLook;
  renderLook=function(){const r=prevL.apply(this,arguments);try{attachAccent163()}catch(e){}return r};
  renderLook._v163=1;
  if(typeof RENDER==='object')RENDER.look=renderLook;
}

root.IL163={
  version:163,
  iters:ITERS163,
  inMandelbrot:inMandelbrot163,
  escapeCount:escapeCount163,
  piNeck:piNeck163,
  newton:newtonIter163,
  roots:ROOTS163,
  bulbs:BULB163,
  babies:BABY163,
  palette:PALETTE163,
  accentLoad:accentLoad163,
  accentSave:accentSave163,
  accentHex:accentHex163,
  applyAccent:applyAccentSVG163,
  isDragonEgg:isDragonEgg163,
  setMode:setMode163,
  mode:mode163,
  juliaLine:juliaLine163,
  breath:breathZoom163,
  lullStart:lullStart163,
  lullStop:lullStop163,
  lullHz:lullHz163
};
})(typeof window!=='undefined'?window:this);
