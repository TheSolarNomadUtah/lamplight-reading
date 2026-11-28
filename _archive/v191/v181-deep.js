/* Lamplight v181 all-out deep work (preview only, do not push).
   Grow LOD + pan/pinch, Endless Honeycomb re-root past 343, deep Mandelbrot, Share a pie truths.
   Ignacio approved adding this to the v181 preview (Builder chat t415u, 20 Nov 2026). */
(function(root){
'use strict';

var SLICE_MS=6, LONG_MS=50, MIN_PX=1, EH_MIN_PX=6.8, FBITS=1024n, DEC_DIGITS=320, HILBERT_MAX=9;
var GROW_JOB=0, EX_JOB=0, MAX_SLICE=0, LAST_LONG=0, OBS=null;

var ES={
  'Pinch or drag to look closer. Grow adds more of the same rule.':'Pellizca o arrastra para mirar más de cerca. Crecer añade más de la misma regla.',
  'The twigs are as fine as this screen can show. Pinch to look closer, then you can Grow again.':'Las ramitas ya son tan finas como esta pantalla puede mostrar. Pellizca para mirar más de cerca, y luego puedes pulsar Crecer otra vez.',
  '{n} sevens multiplied together.':'{n} sietes multiplicados entre sí.',
  'Each tile you see holds everything you built before.':'Cada ficha que ves guarda todo lo que construiste antes.',
  'Each tile is everything you built.':'Cada ficha es todo lo que construiste.',
  'Fill the six around the one.':'Llena los seis alrededor del uno.',
  'Seven make one bigger tile.':'Siete forman una ficha más grande.',
  'The Mandelbrot set is made by repeating a simple rule. Its edge has wiggles inside wiggles. Reset brings you home.':'El conjunto de Mandelbrot se hace repitiendo una regla sencilla. Su borde tiene recovecos dentro de recovecos. Empezar de nuevo te lleva a casa.',
  'You have looked very, very close. The edge still has wiggles. Reset brings you home.':'Has mirado muy, muy de cerca. El borde todavía tiene recovecos. Empezar de nuevo te lleva a casa.',
  'You have looked very, very close. Reset brings you home.':'Has mirado muy, muy de cerca. Empezar de nuevo te lleva a casa.',
  'This is as far as this lamp can see.':'Hasta aquí puede ver esta lámpara.',
  'Deeper than one atom compared with the whole Earth.':'Más profundo que un átomo comparado con toda la Tierra.',
  'Halves of halves':'Mitades de mitades',
  'Each new piece is half of what is left. The pieces fill more and more of the pie, but a little sliver is always left.':'Cada pedazo nuevo es la mitad de lo que queda. Los pedazos llenan cada vez más del pastel, pero siempre queda un pedacito.',
  '{n} pieces so far: {sum}. The leftover sliver is {rest} of the pie.':'{n} pedazos hasta ahora: {sum}. El pedacito que queda es {rest} del pastel.',
  '1 piece so far: 1/2. The other half of the pie is still empty.':'1 pedazo hasta ahora: 1/2. La otra mitad del pastel sigue vacía.',
  'Add half of what is left':'Añadir la mitad de lo que queda',
  'This sliver is too thin to cut here. If you halve it in your mind, a smaller sliver is still left.':'Este pedacito es muy fino para cortarlo aquí. Si lo partes por la mitad en tu mente, todavía queda un pedacito más pequeño.',
  'The same amount':'La misma cantidad',
  'Both cuts make two halves. Fair means the same amount. The pieces do not have to be the same shape.':'Los dos cortes hacen dos mitades. Justo quiere decir la misma cantidad. Los pedazos no tienen que tener la misma forma.',
  'Cut straight':'Corte recto',
  'Corner to corner':'De esquina a esquina',
  'Each square has 2 pieces. A rectangle half and a triangle half are the same amount.':'Cada cuadrado tiene 2 pedazos. La mitad con forma de rectángulo y la mitad con forma de triángulo son la misma cantidad.',
  'The same share':'La misma parte',
  'Two quarters cover one half. They are the same amount.':'Dos cuartos cubren una mitad. Son la misma cantidad.',
  'Show 2/4 on 1/2':'Mostrar 2/4 sobre 1/2',
  '2/4 covers 1/2. They are the same amount.':'2/4 cubre 1/2. Son la misma cantidad.',
  'Fill the pie':'Llenar el pastel',
  'A hidden truth':'Una verdad escondida',
  'Too many to count on the screen. Each Grow makes more by the same rule.':'Son demasiados para contarlos en la pantalla. Cada vez que pulsas Crecer, salen más con la misma regla.',
  'Some are off the screen now. Reset to count them all.':'Ahora algunos están fuera de la pantalla. Pulsa Empezar de nuevo para contarlos todos.',
  'That is as far as this seed grows.':'Hasta aquí llega esta semilla.',
  'Reset':'Empezar de nuevo',
  'Back':'Atrás'
}

function esLang(){
  try{return (typeof LANG==='string'&&LANG==='es')||(typeof curLang==='function'&&curLang()==='es')}catch(e){return false}
}
function t(s,v){
  var out;
  if(esLang()&&ES[s]) out=ES[s];
  else if(typeof gT==='function'){try{out=gT(s,v)}catch(e){out=s}}
  else out=s;
  if(v&&typeof out==='string') out=out.replace(/\{(\w+)\}/g,function(_,k){return v[k]==null?'':String(v[k])});
  return out;
}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function reduced(){try{return (typeof reduced181==='function'&&reduced181())||(typeof lampReduced73==='function'&&lampReduced73())}catch(e){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(e){return false}}
function sfxOn(){try{return typeof lampSfxOn73!=='function'||!!lampSfxOn73()}catch(e){return true}}
function $(id){return typeof root.$==='function'?root.$(id):document.getElementById(id)}

function hookDeep(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v181deep) return prev;
  var next=wrap(prev);
  next._v181deep=1;
  next._base=prev;
  root[name]=next;
  return next;
}

function cssDeep(){
  if(document.getElementById('v181deepcss')) return;
  var s=document.createElement('style');
  s.id='v181deepcss';
  s.textContent=
    '#patGrowCv{touch-action:none;cursor:grab}'+
    '#patGrowCv.g181-drag{cursor:grabbing}'+
    '.g181-truth{display:flex;flex-wrap:wrap;gap:.5rem;margin:.6rem 0}'+
    '.g181-truth button{min-height:56px}'+
    '.frac-truth-art{display:block;margin:.4rem auto;max-width:100%;height:auto}'+
    '.frac-sq{display:flex;justify-content:space-around;align-items:flex-start;gap:1rem;flex-wrap:wrap}'+
    '.frac-sq figure{margin:0;text-align:center}'+
    '.frac-sq figcaption{font-size:.95rem;margin-top:.3rem}'+
    '.eh181-cellwarn{display:none}';
  document.head.appendChild(s);
}

function recordSlice(dt){
  if(dt>MAX_SLICE) MAX_SLICE=dt;
  if(dt>LONG_MS) LAST_LONG=dt;
}

function watchLongTasks(){
  if(OBS||typeof PerformanceObserver==='undefined') return;
  try{
    OBS=new PerformanceObserver(function(list){
      list.getEntries().forEach(function(e){
        if(e.duration>LAST_LONG) LAST_LONG=e.duration;
      });
    });
    try{OBS.observe({entryTypes:['longtask']})}catch(e){OBS.observe({type:'longtask',buffered:true})}
  }catch(e){OBS=null}
}

function softChime(level){
  if(!sfxOn()) return;
  try{
    var c=typeof ac==='function'?ac():null; if(!c) return;
    var quiet=night()||(document.body&&document.body.classList.contains('bedtime'));
    var vol=quiet?0.04:0.08;
    var freq=[261.63,293.66,329.63,349.23,392,440,493.88,523.25][Math.max(0,Math.min(level,7))];
    var t0=c.currentTime, o=c.createOscillator(), g=c.createGain();
    o.type='sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(0,t0);
    g.gain.linearRampToValueAtTime(vol,t0+0.04);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+0.7);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0+0.75);
  }catch(e){}
}

function pals(rec){
  var p=(typeof PAT_PAL106!=='undefined'&&PAT_PAL106[(rec&&rec.pal)||0])||null;
  if(p) return p;
  return night()?['#6f9a7a','#eac77d','#c45a3a']:['#4e6b5c','#E6B454','#C45A3A'];
}
function paper(){return night()?'#0d0f1a':'#fff8ec'}

function viewOf(g,W,H){
  g=g||{};
  var vs=g._vs!=null?g._vs:1;
  var vx=g._vx!=null?g._vx:W/2;
  var vy=g._vy!=null?g._vy:H/2;
  return {vx:vx,vy:vy,vs:vs,W:W,H:H};
}
function toS(V,x,y){return {x:(x-V.vx)*V.vs+V.W/2, y:(y-V.vy)*V.vs+V.H/2}}
function toW(V,x,y){return {x:(x-V.W/2)/V.vs+V.vx, y:(y-V.H/2)/V.vs+V.vy}}
function inView(V,x,y,pad){
  pad=pad==null?8:pad;
  var p=toS(V,x,y);
  return p.x>=-pad&&p.x<=V.W+pad&&p.y>=-pad&&p.y<=V.H+pad;
}
function segInView(V,ax,ay,bx,by,pad){
  pad=pad==null?12:pad;
  var a=toS(V,ax,ay),b=toS(V,bx,by);
  var minx=Math.min(a.x,b.x),maxx=Math.max(a.x,b.x),miny=Math.min(a.y,b.y),maxy=Math.max(a.y,b.y);
  return maxx>=-pad&&minx<=V.W+pad&&maxy>=-pad&&miny<=V.H+pad;
}

function cellPx(g,W,H){
  W=W||360; H=H||360;
  var V=viewOf(g,W,H), d=Math.max(0,g.depth||0), sh=g.shape||'tree', sc=V.vs;
  if(sh==='tree') return (H*0.22)*Math.pow(0.68,d)*sc;
  if(sh==='antler') return (H*0.22)*Math.pow(0.72,d)*sc;
  if(sh==='dragon'||sh==='levy') return (W*0.56)*Math.pow(1/Math.SQRT2,d)*sc;
  if(sh==='triangle') return (H*0.8)*Math.pow(0.5,d)*sc;
  if(sh==='koch') return (W*0.8)*Math.pow(1/3,d)*sc;
  if(sh==='htree') return (Math.min(W,H)*0.16)*Math.pow(0.7,d)*sc;
  if(sh==='pythagoras'){
    var th=((g.angle||28)*Math.PI/180), shk=Math.max(Math.abs(Math.cos(th)),Math.abs(Math.sin(th)))||0.7;
    return (Math.min(W,H)*0.16)*Math.pow(shk,d)*sc;
  }
  if(sh==='sunflower') return Math.max(1.2,3-d*0.15)*sc;
  if(sh==='hilbert') return (W*0.8)/Math.max(2,Math.pow(2,Math.min(9,d)))*sc;
  if(sh==='fern') return 1.4*sc;
  return Math.max(MIN_PX, 8*Math.pow(0.7,d)*sc);
}
function oldCapOf(s){
  try{ if(root.IL154&&typeof IL154.capOf==='function') return IL154.capOf(s); }catch(e){}
  if(s==='spirals') return 2; if(s==='hilbert') return 4; if(s==='fern') return 5; if(s==='sunflower') return 8; return 6;
}
function tooFine(g,W,H){
  var sh=g&&g.shape;
  if(sh==='fern'||sh==='sunflower') return false;
  return cellPx(g,W||360,H||360)<MIN_PX;
}
function fernWant(d){
  return Math.min(60000, 4000*Math.max(1,d|0));
}
function sunN181(d){
  try{ if(root.IL154&&typeof IL154.sunN==='function') return IL154.sunN(d); }catch(e){}
  var f=[1,13,21,34,55,89,144,233,377];
  d=Math.max(0,Math.min(f.length-1,d|0));
  return f[d];
}
function homeView(g,W,H){
  var V=viewOf(g,W,H);
  return Math.abs((V.vs||1)-1)<0.02 && Math.abs(V.vx-W/2)<2 && Math.abs(V.vy-H/2)<2;
}

function growResetView(g){
  if(!g) return;
  g._vx=g._vy=null; g._vs=1;
}

function clearGrow(cv){
  var x=cv.getContext('2d');
  x.setTransform(1,0,0,1,0,0);
  x.fillStyle=paper(); x.fillRect(0,0,cv.width,cv.height);
  x.lineCap='round'; x.lineJoin='round';
  return x;
}

/* -------- Grow LOD drawers (chunked) -------- */
function growDrawDeep(cv,rec,prev){
  if(!cv) return;
  rec=rec||{};
  var W=cv.width,H=cv.height,V=viewOf(rec,W,H);
  var sh=rec.shape||'tree';
  function oldCap(s){
    try{ if(root.IL154&&typeof IL154.capOf==='function') return IL154.capOf(s); }catch(e){}
    if(s==='spirals') return 2; if(s==='hilbert') return 4; if(s==='fern') return 5; return 6;
  }
  var home=homeView(rec,W,H);
  /* Frozen v154 Koch is an anti-snowflake; always use the outward deep drawer so the picture does not jump. */
  if(home && sh!=='koch' && (rec.depth||0)<=oldCap(sh) && typeof prev==='function'){
    try{ prev(cv, rec); }catch(e){}
    rec._drewAt=Date.now();
    return;
  }
  var x=clearGrow(cv);
  var job=++GROW_JOB;
  rec._job=job;
  var t0all=(performance&&performance.now)?performance.now():Date.now();

  function done(){
    rec._drewAt=Date.now();
    rec._sliceMs=MAX_SLICE;
  }

  var handled={tree:1,antler:1,dragon:1,levy:1,triangle:1,sunflower:1,fern:1,koch:1,htree:1,pythagoras:1,hilbert:1};
  if(!handled[sh]){
    /* Modest depth: fall back to earlier drawer in world space via transform. */
    if((rec.depth||0)<=6 && V.vs===1 && Math.abs(V.vx-W/2)<1 && Math.abs(V.vy-H/2)<1 && typeof prev==='function'){
      try{prev(cv,rec)}catch(e){}
      done(); return;
    }
    /* Still transform + prev at capped depth if we cannot LOD it. */
    if(typeof prev==='function' && (rec.depth||0)<=8){
      try{prev(cv,rec)}catch(e){}
    }
    done(); return;
  }

  var cols=pals(rec), stack=[], i;

  function strokeSeg(ax,ay,bx,by,d,w){
    var a=toS(V,ax,ay),b=toS(V,bx,by);
    x.strokeStyle=cols[d%cols.length];
    x.lineWidth=Math.max(0.6,(w||2)*Math.min(2.2,Math.sqrt(V.vs)));
    x.beginPath(); x.moveTo(a.x,a.y); x.lineTo(b.x,b.y); x.stroke();
  }
  function fillDot(px,py,r,col){
    var p=toS(V,px,py), rr=Math.max(0.6,r*V.vs);
    if(p.x+rr<0||p.x-rr>W||p.y+rr<0||p.y-rr>H) return;
    x.fillStyle=col;
    x.beginPath(); x.arc(p.x,p.y,rr,0,Math.PI*2); x.fill();
  }
  function fillPoly(pts,col){
    var k,p,any=false,out=[];
    for(k=0;k<pts.length;k++){ p=toS(V,pts[k][0],pts[k][1]); out.push(p); if(p.x>=-4&&p.x<=W+4&&p.y>=-4&&p.y<=H+4) any=true; }
    if(!any) return;
    x.fillStyle=col; x.beginPath();
    x.moveTo(out[0].x,out[0].y);
    for(k=1;k<out.length;k++) x.lineTo(out[k].x,out[k].y);
    x.closePath(); x.fill();
  }

  if(sh==='tree'||sh==='antler'){
    var ang=((rec.angle||(sh==='antler'?36:28))*Math.PI/180);
    var shrink=sh==='antler'?0.72:0.68;
    stack.push({x:W/2,y:H*0.92,len:H*0.22,a:Math.PI/2,d:0});
    var depth=rec.depth||0;
    function stepTree(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        if(n.d>depth) continue;
        var nx=n.x+Math.cos(n.a)*n.len, ny=n.y-Math.sin(n.a)*n.len;
        var scr=n.len*V.vs;
        var reach=n.len*(shrink/(1-shrink));
        if(!segInView(V,n.x,n.y,nx,ny,reach*V.vs+8) && n.d>0) continue;
        if(scr>=0.6) strokeSeg(n.x,n.y,nx,ny,n.d,Math.max(0.8,(6-n.d)*0.85*(W/320)));
        if(n.d>=depth) continue;
        if(scr*shrink<MIN_PX) continue;
        stack.push({x:nx,y:ny,len:n.len*shrink,a:n.a-ang,d:n.d+1});
        stack.push({x:nx,y:ny,len:n.len*shrink,a:n.a+ang,d:n.d+1});
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepTree);
      else done();
    }
    requestAnimationFrame(stepTree);
    return;
  }

  if(sh==='dragon'||sh==='levy'){
    var depth=rec.depth||0;
    /* Heighway (dragon) or Lévy C: recursive mid-point. */
    function fold(ax,ay,bx,by,d,sign){
      var len=Math.hypot(bx-ax,by-ay)*V.vs;
      if(!segInView(V,ax,ay,bx,by,len+12)) return;
      if(d>=depth || len<MIN_PX){ if(len>=0.5) strokeSeg(ax,ay,bx,by,d,Math.max(1,3-d*0.15)); return; }
      var mx=(ax+bx)/2, my=(ay+by)/2, dx=bx-ax, dy=by-ay;
      var px=mx-sign*dy/2, py=my+sign*dx/2;
      if(sh==='levy'){
        /* Lévy: always turn the same way */
        fold(ax,ay,px,py,d+1,sign);
        fold(px,py,bx,by,d+1,sign);
      }else{
        fold(ax,ay,px,py,d+1,1);
        fold(px,py,bx,by,d+1,-1);
      }
    }
    /* Chunk by top-level splits stored on a stack of segments to finish. */
    var ax=W*0.22, ay=H*0.55, bx=W*0.78, by=H*0.55;
    if(sh==='levy'){ ax=W*0.28; ay=H*0.62; bx=W*0.72; by=H*0.62; }
    stack=[{ax:ax,ay:ay,bx:bx,by:by,d:0,sign:1,phase:0}];
    function stepDrag(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        var len=Math.hypot(n.bx-n.ax,n.by-n.ay)*V.vs;
        if(!segInView(V,n.ax,n.ay,n.bx,n.by,len+12)) continue;
        if(n.d>=depth || len<MIN_PX){
          if(len>=0.5) strokeSeg(n.ax,n.ay,n.bx,n.by,n.d,Math.max(1,3-n.d*0.15));
          continue;
        }
        var mx=(n.ax+n.bx)/2, my=(n.ay+n.by)/2, dx=n.bx-n.ax, dy=n.by-n.ay;
        if(sh==='dragon'){
          var sgn=n.sign!=null?n.sign:1;
          var px=mx-sgn*dy/2, py=my+sgn*dx/2;
          stack.push({ax:px,ay:py,bx:n.bx,by:n.by,d:n.d+1,sign:-1});
          stack.push({ax:n.ax,ay:n.ay,bx:px,by:py,d:n.d+1,sign:1});
        }else{
          var qx=mx-dy/2, qy=my+dx/2;
          stack.push({ax:qx,ay:qy,bx:n.bx,by:n.by,d:n.d+1,sign:1});
          stack.push({ax:n.ax,ay:n.ay,bx:qx,by:qy,d:n.d+1,sign:1});
        }
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepDrag);
      else done();
    }
    requestAnimationFrame(stepDrag);
    return;
  }

  if(sh==='triangle'){
    var depth=rec.depth||0;
    stack=[{ax:W/2,ay:H*0.1,bx:W*0.08,by:H*0.9,cx:W*0.92,cy:H*0.9,d:0}];
    function triIn(n){
      var pad=8;
      var xs=[toS(V,n.ax,n.ay),toS(V,n.bx,n.by),toS(V,n.cx,n.cy)];
      var minx=Math.min(xs[0].x,xs[1].x,xs[2].x),maxx=Math.max(xs[0].x,xs[1].x,xs[2].x);
      var miny=Math.min(xs[0].y,xs[1].y,xs[2].y),maxy=Math.max(xs[0].y,xs[1].y,xs[2].y);
      return maxx>=-pad&&minx<=W+pad&&maxy>=-pad&&miny<=H+pad;
    }
    function stepTri(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        if(!triIn(n)) continue;
        var size=Math.max(Math.hypot(n.bx-n.ax,n.by-n.ay),Math.hypot(n.cx-n.ax,n.cy-n.ay))*V.vs;
        if(n.d>=depth || size<MIN_PX){
          fillPoly([[n.ax,n.ay],[n.bx,n.by],[n.cx,n.cy]], cols[n.d%cols.length]);
          continue;
        }
        var mx=(n.ax+n.bx)/2,my=(n.ay+n.by)/2,nx=(n.bx+n.cx)/2,ny=(n.by+n.cy)/2,px=(n.cx+n.ax)/2,py=(n.cy+n.ay)/2;
        stack.push({ax:n.ax,ay:n.ay,bx:mx,by:my,cx:px,cy:py,d:n.d+1});
        stack.push({ax:mx,ay:my,bx:n.bx,by:n.by,cx:nx,cy:ny,d:n.d+1});
        stack.push({ax:px,ay:py,bx:nx,by:ny,cx:n.cx,cy:n.cy,d:n.d+1});
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepTri);
      else done();
    }
    requestAnimationFrame(stepTri);
    return;
  }

  if(sh==='sunflower'){
    var depth=Math.max(0,Math.min(8,rec.depth||0)), n=sunN181(depth), phi=rec.angle||137.5;
    var c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n));
    i=0;
    rec._n=n;
    function stepSun(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(i<n && performance.now()-t0<SLICE_MS){
        var r=c*Math.sqrt(i), th=i*phi*Math.PI/180;
        var px=W/2+r*Math.cos(th), py=H/2+r*Math.sin(th);
        var rad=Math.max(1.5,3.1-i/Math.max(1,n)*1.5);
        if(rad*V.vs>=0.6 && inView(V,px,py,rad*V.vs+4)) fillDot(px,py,rad,cols[i%cols.length]);
        i++;
      }
      recordSlice(performance.now()-t0);
      if(i<n) requestAnimationFrame(stepSun);
      else done();
    }
    requestAnimationFrame(stepSun);
    return;
  }

  if(sh==='fern'){
    var depth=Math.max(1,rec.depth||1);
    var want=fernWant(depth);
    var maxIters=Math.min(2000000, Math.max(80000, Math.floor(want*Math.max(12, 48/Math.max(0.04,V.vs*V.vs)))));
    var seed=rec.seed||109;
    var idx=0, got=0;
    var FERN=[[0,0,0,.16,0,0],[.85,.04,-.04,.85,0,1.6],[.2,-.26,.23,.22,0,1.6],[-.15,.28,.26,.24,0,.44]];
    function lcg(s){s=s>>>0; return function(){s=(1664525*s+1013904223)>>>0; return s/4294967296}}
    var rnd=lcg(seed), fx=0, fy=0;
    var rdot=1.2/Math.max(0.2,V.vs);
    function stepFern(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(idx<maxIters && got<want && performance.now()-t0<SLICE_MS){
        var r=rnd(),k=r<.01?0:r<.86?1:r<.93?2:3,a=FERN[k];
        var nx=a[0]*fx+a[1]*fy+a[4], ny=a[2]*fx+a[3]*fy+a[5];
        fx=nx; fy=ny;
        var px=W*(0.5+fx*0.18), py=H*(0.92-fy*0.082);
        if(inView(V,px,py,6)){ fillDot(px,py,rdot,cols[1]||cols[0]); got++; }
        idx++;
      }
      recordSlice(performance.now()-t0);
      if(idx<maxIters && got<want) requestAnimationFrame(stepFern);
      else { rec._n=got; done(); }
    }
    requestAnimationFrame(stepFern);
    return;
  }

  if(sh==='koch'){
    var depth=rec.depth||0;
    function kochSide(ax,ay,bx,by){
      stack.push({ax:ax,ay:ay,bx:bx,by:by,d:0});
    }
    /* Same down-pointing triangle as v154, bumps flipped outward (true snowflake, area → 8/5). */
    var sK=Math.min(W,H)*0.82, x0=(W-sK)/2, y0=H*0.22, x1=x0+sK, y1=y0, x2=x0+sK/2, y2=y0+sK*Math.sqrt(3)/2;
    kochSide(x0,y0,x1,y1); kochSide(x1,y1,x2,y2); kochSide(x2,y2,x0,y0);
    function stepK(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        var len=Math.hypot(n.bx-n.ax,n.by-n.ay)*V.vs;
        if(!segInView(V,n.ax,n.ay,n.bx,n.by,len+10)) continue;
        if(n.d>=depth || len<MIN_PX){ if(len>=0.5) strokeSeg(n.ax,n.ay,n.bx,n.by,n.d,1.6); continue; }
        var ux=(n.bx-n.ax)/3, uy=(n.by-n.ay)/3;
        var mx=n.ax+ux,my=n.ay+uy, nx=n.ax+2*ux,ny=n.ay+2*uy;
        var px=n.ax+ux+(ux/2+uy*Math.sqrt(3)/2), py=n.ay+uy+(uy/2-ux*Math.sqrt(3)/2);
        stack.push({ax:nx,ay:ny,bx:n.bx,by:n.by,d:n.d+1});
        stack.push({ax:px,ay:py,bx:nx,by:ny,d:n.d+1});
        stack.push({ax:mx,ay:my,bx:px,by:py,d:n.d+1});
        stack.push({ax:n.ax,ay:n.ay,bx:mx,by:my,d:n.d+1});
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepK);
      else done();
    }
    requestAnimationFrame(stepK);
    return;
  }

  if(sh==='htree'||sh==='pythagoras'){
    var depth=rec.depth||0;
    if(sh==='htree'){
      stack.push({x:W/2,y:H/2,s:Math.min(W,H)*0.22,a:0,d:0}); /* a=0 horizontal bar */
    }else{
      var s0=Math.min(W,H)*0.16;
      stack.push({px:W/2-s0/2,py:H*0.86,s:s0,a:-Math.PI/2,d:0,kind:'sq'});
    }
    var angP=(rec.angle||28)*Math.PI/180;
    function stepHT(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(stack.length && performance.now()-t0<SLICE_MS){
        var n=stack.pop();
        if(sh==='htree'){
          var dx=Math.cos(n.a)*n.s, dy=Math.sin(n.a)*n.s;
          var ax=n.x-dx, ay=n.y-dy, bx=n.x+dx, by=n.y+dy;
          var len=n.s*2*V.vs;
          if(!segInView(V,ax,ay,bx,by,len+8)) continue;
          if(len>=0.6) strokeSeg(ax,ay,bx,by,n.d,Math.max(0.7,2.6-n.d*0.25));
          if(n.d>=depth || len/Math.SQRT2<MIN_PX) continue;
          stack.push({x:ax,y:ay,s:n.s/Math.SQRT2,a:n.a+Math.PI/2,d:n.d+1});
          stack.push({x:bx,y:by,s:n.s/Math.SQRT2,a:n.a+Math.PI/2,d:n.d+1});
        }else{
          var c=Math.cos(n.a),si=Math.sin(n.a);
          var x2=n.px+c*n.s,y2=n.py+si*n.s,x3=x2-si*n.s,y3=y2+c*n.s,x4=n.px-si*n.s,y4=n.py+c*n.s;
          var size=n.s*V.vs;
          if(size<MIN_PX && n.d>0) continue;
          fillPoly([[n.px,n.py],[x2,y2],[x3,y3],[x4,y4]], cols[n.d%cols.length]);
          if(n.d>=depth || size*0.5<MIN_PX) continue;
          var sl=n.s*Math.cos(angP), sr=n.s*Math.sin(angP);
          stack.push({px:x4,py:y4,s:sl,a:n.a+angP,d:n.d+1,kind:'sq'});
          stack.push({px:x3,py:y3,s:sr,a:n.a+angP-Math.PI/2,d:n.d+1,kind:'sq'});
        }
      }
      recordSlice(performance.now()-t0);
      if(stack.length) requestAnimationFrame(stepHT);
      else done();
    }
    requestAnimationFrame(stepHT);
    return;
  }

  if(sh==='hilbert'){
    var depth=Math.max(1,Math.min(9,rec.depth||1));
    var pad=W*0.08, span=W-pad*2, N=1<<depth, step=span/N;
    /* Walk the Hilbert curve; skip segments well outside the view. */
    var px=pad+step/2, py=pad+step/2, first=true, seq=hilbertWalk(depth);
    i=0;
    function stepHi(){
      if(rec._job!==job) return;
      var t0=performance.now();
      while(i<seq.length && performance.now()-t0<SLICE_MS){
        var d=seq[i++];
        var nx=px, ny=py;
        if(d===0) nx+=step; else if(d===1) ny+=step; else if(d===2) nx-=step; else ny-=step;
        if(step*V.vs>=0.5 && segInView(V,px,py,nx,ny,8)) strokeSeg(px,py,nx,ny,i%cols.length,1.4);
        px=nx; py=ny;
      }
      recordSlice(performance.now()-t0);
      if(i<seq.length) requestAnimationFrame(stepHi);
      else done();
    }
    requestAnimationFrame(stepHi);
    return;
  }

  done();
}

function hilbertWalk(order){
  /* Returns a list of 0,1,2,3 steps (E,S,W,N) for a Hilbert curve of given order. */
  var out=[];
  function rot(s,rx,ry,n){
    if(!ry){
      if(rx){ s.x=n-1-s.x; s.y=n-1-s.y; }
      var t=s.x; s.x=s.y; s.y=t;
    }
  }
  function xy(n,d){
    var s={x:0,y:0}, rx, ry, t=d;
    for(var sN=1;sN<n;sN*=2){
      rx=1&(t/2); ry=1&(t^rx); rot(s,rx,ry,sN);
      s.x+=sN*rx; s.y+=sN*ry; t/=4;
    }
    return s;
  }
  var n=1<<order, last=xy(n,0), i,p;
  for(i=1;i<n*n;i++){
    p=xy(n,i);
    if(p.x>last.x) out.push(0);
    else if(p.y>last.y) out.push(1);
    else if(p.x<last.x) out.push(2);
    else out.push(3);
    last=p;
  }
  return out;
}

function growAfterDraw(){
  var el=$('patterns'); if(!el) return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='grow') return}catch(e){return}
  var g=PAT106.grow, cv=$('patGrowCv');
  if(!g||!cv) return;
  if(!el.querySelector('[data-grow-zoom-hint]')){
    var hint=document.createElement('p');
    hint.className='soft';
    hint.setAttribute('data-grow-zoom-hint','1');
    hint.textContent=t('Pinch or drag to look closer. Grow adds more of the same rule.');
    var msg=$('patGrowMsg');
    if(msg&&msg.parentNode) msg.parentNode.insertBefore(hint,msg.nextSibling);
    else cv.parentNode.insertBefore(hint,cv.nextSibling);
  }
  try{ patchJarDeep(g); }catch(e){}
  var rst=el.querySelector('[data-g181reset="grow"]');
  if(rst&&!rst._deep){
    var old=rst.onclick;
    rst.onclick=function(){
      growResetView(g);
      if(typeof old==='function') old.apply(this,arguments);
      else{
        g.depth=0;g.q=[];g.msg='';
        if(typeof patGrowDraw106==='function') patGrowDraw106();
      }
    };
    rst._deep=1;
  }
  bindGrowCv(cv,g);
}

function patchJarDeep(g){
  if(!g) return;
  var cv=$('patGrowCv');
  var W=cv&&cv.width||360, H=cv&&cv.height||360;
  var cap=oldCapOf(g.shape||'tree');
  var jar=document.querySelector('[data-gaf3jar] .g9c');
  if(!jar) return;
  var past=(g.depth||0)>cap;
  var home=homeView(g,W,H);
  if(home && !past){
    if(jar.getAttribute('data-jar-line') || jar.getAttribute('data-jar-uncountable')==='1'){
      jar.removeAttribute('data-jar-line');
      jar.removeAttribute('data-jar-uncountable');
      try{
        var n=null, word='';
        if(root.IL156&&typeof IL156.copies==='function') n=IL156.copies(g);
        else if(root.IL155&&typeof IL155.copies==='function') n=IL155.copies(g);
        else if(root.IL154&&typeof IL154.copies==='function') n=IL154.copies(g);
        if(n==null) n=g._n;
        if(root.IL156&&typeof IL156.jarWord==='function') word=IL156.jarWord(g.shape);
        else if(root.IL155&&typeof IL155.jarWord==='function') word=IL155.jarWord(g.shape);
        else if(root.IL154&&typeof IL154.jarWord==='function') word=IL154.jarWord(g.shape);
        jar.textContent='';
        if(n!=null) jar.appendChild(document.createTextNode(String(n)));
        if(word){
          jar.appendChild(document.createTextNode(' '));
          var sp=document.createElement('span'); sp.className='soft'; sp.textContent=word; jar.appendChild(sp);
        }
      }catch(e){}
    }
    return;
  }
  var line=past
    ? t('Too many to count on the screen. Each Grow makes more by the same rule.')
    : t('Some are off the screen now. Reset to count them all.');
  var kind=past?'toomany':'offscreen';
  if(jar.getAttribute('data-jar-line')===kind && jar.textContent===line) return;
  jar.textContent='';
  jar.appendChild(document.createTextNode(line));
  jar.setAttribute('data-jar-uncountable','1');
  jar.setAttribute('data-jar-line',kind);
}

function atZoomCap(g, sc, raw, cv){
  if(!(raw>=400 && sc>=400)) return;
  var line=t('This is as far as this lamp can see.');
  if(g) g.msg=line;
  var msg=$('patGrowMsg'); if(msg) msg.textContent=line;
}

function bindGrowCv(cv,g){
  if(cv._g181deep) return;
  cv._g181deep=1;
  var pts={};
  function pos(ev,p){
    var r=cv.getBoundingClientRect();
    return {x:(p.clientX-r.left)/r.width*cv.width, y:(p.clientY-r.top)/r.height*cv.height, id:p.pointerId};
  }
  function ids(){return Object.keys(pts)}
  function pinch(){
    var k=ids(); if(k.length!==2) return null;
    var a=pts[k[0]], b=pts[k[1]];
    return {mx:(a.x+b.x)/2, my:(a.y+b.y)/2, d:Math.hypot(a.x-b.x,a.y-b.y)};
  }
  var lastPinch=null, dragging=0;
  cv.addEventListener('pointerdown',function(ev){
    cv.setPointerCapture(ev.pointerId);
    pts[ev.pointerId]=pos(ev,ev);
    cv.classList.add('g181-drag');
    if(ids().length===2) lastPinch=pinch();
    else dragging=1;
  });
  cv.addEventListener('pointermove',function(ev){
    if(!pts[ev.pointerId]) return;
    var p=pos(ev,ev), prev=pts[ev.pointerId];
    pts[ev.pointerId]=p;
    var W=cv.width,H=cv.height,V=viewOf(g,W,H);
    if(ids().length===2){
      var pn=pinch(); if(!pn||!lastPinch||!lastPinch.d) return;
      var world=toW(V,lastPinch.mx,lastPinch.my);
      var raw=V.vs*(pn.d/lastPinch.d);
      var sc=Math.max(0.4, Math.min(400, raw));
      g._vs=sc;
      /* keep the pinch midpoint on the same world point */
      g._vx=world.x-(pn.mx-W/2)/sc;
      g._vy=world.y-(pn.my-H/2)/sc;
      lastPinch=pn;
      atZoomCap(g,sc,raw,cv);
      scheduleGrowRedraw();
    }else if(dragging){
      var dx=p.x-prev.x, dy=p.y-prev.y;
      g._vx=(g._vx!=null?g._vx:W/2)-dx/V.vs;
      g._vy=(g._vy!=null?g._vy:H/2)-dy/V.vs;
      scheduleGrowRedraw();
    }
  });
  function end(ev){
    delete pts[ev.pointerId];
    if(ids().length<2) lastPinch=null;
    if(!ids().length){ dragging=0; cv.classList.remove('g181-drag'); }
  }
  cv.addEventListener('pointerup',end);
  cv.addEventListener('pointercancel',end);
  cv.addEventListener('wheel',function(ev){
    ev.preventDefault();
    var r=cv.getBoundingClientRect();
    var sx=(ev.clientX-r.left)/r.width*cv.width, sy=(ev.clientY-r.top)/r.height*cv.height;
    var W=cv.width,H=cv.height,V=viewOf(g,W,H);
    var world=toW(V,sx,sy);
    var raw=V.vs*(ev.deltaY<0?1.15:1/1.15);
    var sc=Math.max(0.4, Math.min(400, raw));
    g._vs=sc;
    g._vx=world.x-(sx-W/2)/sc;
    g._vy=world.y-(sy-H/2)/sc;
    atZoomCap(g,sc,raw,cv);
    scheduleGrowRedraw();
  },{passive:false});
}

var GROW_REDRAW=0;
function scheduleGrowRedraw(){
  if(GROW_REDRAW) return;
  GROW_REDRAW=requestAnimationFrame(function(){
    GROW_REDRAW=0;
    var cv=$('patGrowCv'), g=PAT106&&PAT106.grow;
    if(cv&&g){ growDrawDeep(cv,g,null); try{patchJarDeep(g)}catch(e){} }
  });
}

function growStepDeep(prev){
  return function(){
    var g=PAT106&&PAT106.grow; if(!g) return typeof prev==='function'?prev.apply(this,arguments):undefined;
    var LODSH={tree:1,antler:1,dragon:1,levy:1,triangle:1,sunflower:1,fern:1,koch:1,htree:1,pythagoras:1,hilbert:1};
    var sh=g.shape||'tree';
    var cv0=$('patGrowCv'), W0=cv0&&cv0.width||360, H0=cv0&&cv0.height||360;
    var home=homeView(g,W0,H0);
    /* Within the old per-shape cap, at home view, keep the earlier Grow step
       (fern progressive dots, spiral cap, queued tones). Past that cap, or when zoomed, use LOD. */
    if(!LODSH[sh] || (home && (g.depth||0)<oldCapOf(sh))){
      return typeof prev==='function'?prev.apply(this,arguments):undefined;
    }
    function seedCapMsg(){
      g.msg=t('That is as far as this seed grows.');
      var m=$('patGrowMsg'); if(m) m.textContent=g.msg;
    }
    if(sh==='sunflower' && (g.depth||0)>=oldCapOf(sh)){ seedCapMsg(); return; }
    if(sh==='hilbert' && (g.depth||0)>=9){ seedCapMsg(); return; }
    if(sh==='fern' && fernWant((g.depth||0)+1)<=fernWant(g.depth||0)){ seedCapMsg(); return; }
    var cv=$('patGrowCv');
    if(g._rest || /in the Sky|en el Cielo/i.test(g.msg||'')) return;
    var W=cv&&cv.width||360, H=cv&&cv.height||360;
    /* Would the *next* generation already be under 1 px at this zoom? */
    var probe={shape:g.shape,depth:(g.depth||0)+1,_vs:g._vs,_vx:g._vx,_vy:g._vy,pal:g.pal,angle:g.angle};
    if(tooFine(probe,W,H)){
      g.msg=t('The twigs are as fine as this screen can show. Pinch to look closer, then you can Grow again.');
      var msg=$('patGrowMsg'); if(msg) msg.textContent=g.msg;
      return;
    }
    function apply(){
      g.depth=(g.depth||0)+1;
      try{if(typeof patGrowTone106==='function') patGrowTone106(Math.min(5,g.depth-1))}catch(e){}
      if(g.depth===6){
        try{if(typeof patGrowPlayScale107==='function') patGrowPlayScale107()}catch(e){}
      }
      g.msg=''; g._rest=0;
      if(typeof patGrowDraw106==='function') patGrowDraw106();
      try{if(typeof ensureFloat181==='function') ensureFloat181(); if(typeof tidyGrow181==='function') tidyGrow181(); growAfterDraw()}catch(e){}
    }
    if(reduced()){ apply(); return; }
    g.q=g.q||[];
    g.q.push(apply);
    if(!g.busy){
      g.busy=true;
      var tick=function(){
        var fn=g.q.shift();
        if(!fn){g.busy=false;return}
        fn();
        setTimeout(tick,280);
      };
      tick();
    }
  };
}

/* -------- Endless Honeycomb re-root -------- */
function ehExp(){
  var E=root.EH181; if(!E) return 0;
  return (E.roots||0)*3 + (E.level||0);
}
function pow7str(n){
  /* 7^n as a decimal string, for n up to a few hundred (BigInt). */
  if(n<=0) return '1';
  try{return (7n**BigInt(n)).toString()}catch(e){return ''}
}
function groupDigits(s){
  s=String(s);
  if(esLang() && s.length<=4) return s;
  return s.replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0');
}
function ehCountKindly(n){
  if(n<=0) return '';
  if(n===1) return '7';
  if(n===2) return '7 × 7 = 49';
  if(n===3) return '7 × 7 × 7 = 343';
  var facts=[],i;
  for(i=0;i<n;i++) facts.push('7');
  if(n>=10) return t('{n} sevens multiplied together.',{n:String(n)});
  var raw=pow7str(n);
  if(!raw) return t('{n} sevens multiplied together.',{n:String(n)});
  return facts.join(' × ')+' = '+groupDigits(raw);
}

function ehMinCellPx(){
  try{
    var E=root.EH181; if(!E) return 0;
    var level=Math.min(E.level||0,3);
    var size=typeof ehFitSize==='function'?ehFitSize(level):12;
    var stage=document.getElementById('eh181stage');
    var svg=stage&&stage.querySelector('svg');
    var cssW=svg?svg.getBoundingClientRect().width:360;
    /* size is in SVG user units (viewBox 400). Cell drawing uses size*0.96. */
    return (size*0.96)*(cssW/400);
  }catch(e){return 0}
}

function ehRewriteMsg(){
  var E=root.EH181; if(!E) return;
  var el=document.getElementById('eh181msg'); if(!el) return;
  var n=ehExp();
  var filled=(E.filled||[]).filter(Boolean).length;
  var msg;
  function ehCore(k){ return String(ehCountKindly(k)||'').replace(/\.+$/,''); }
  if(E.level===0 && filled===0){
    msg=(n>0?ehCore(n)+'. ':'')+t('Fill the six around the one.');
  }else if(E.level===0 && filled===6){
    msg=t('Seven make one bigger tile.');
  }else if(n>=1){
    msg=ehCore(n);
    if((E.roots||0)>=1) msg+='. '+t('Each tile you see holds everything you built before.');
    else if(n>=3) msg+='. '+t('Each tile is everything you built.');
  }
  if(msg) el.textContent=msg;
  el.setAttribute('data-eh-exp', String(n));
  el.setAttribute('data-eh-cell', String(ehMinCellPx().toFixed(2)));
}

function ehReRootNow(animate){
  var E=root.EH181; if(!E) return;
  if((E.level||0)<3) return;
  E.busy=true;
  var stage=document.getElementById('eh181stage'), svg=stage&&stage.querySelector('svg');
  function done(){
    E.roots=(E.roots||0)+1;
    E.level=0;
    E.filled=[0,0,0,0,0,0];
    E.busy=false;
    E._pendingRoot=0;
    E.zooms=(E.zooms||0)+1;
    try{if(typeof ehChime181==='function') ehChime181(6)}catch(e){softChime(6)}
    if(typeof ehDraw181==='function') ehDraw181();
  }
  if(!animate||reduced()||!svg){ done(); return; }
  var ang=19.1066, sc=Math.sqrt(7);
  svg.classList.add('eh181-zoom');
  svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
  setTimeout(done, 1400);
}

function ehAfterDraw(){
  var E=root.EH181; if(!E) return;
  ehRewriteMsg();
  if((E.level||0)>=3 && !E.busy && !E._pendingRoot){
    E._pendingRoot=1;
    setTimeout(function(){ ehReRootNow(!reduced()); }, reduced()?200:1200);
  }
}

/* -------- Deep Mandelbrot -------- */
var EXD={worker:null,job:0,ready:0,cxQ:null,cyQ:null,spanQ:null,maxSlice:0,glitches:0,wiggles:0,unique:0,maxFrac:1,flat:0,atCap:0,lastPass:0,lastStep:0,iters:0};

function decToFp(s,F){
  s=String(s==null?'0':s).trim().replace(/\s+/g,'');
  if(typeof F!=='bigint') F=BigInt(F||1024);
  if(!s) return 0n;
  var neg=s.charAt(0)==='-';
  if(neg||s.charAt(0)==='+') s=s.slice(1);
  var e=s.indexOf('e'); if(e<0) e=s.indexOf('E');
  var exp=0;
  if(e>=0){ exp=parseInt(s.slice(e+1),10)||0; s=s.slice(0,e); }
  var a=s.split('.'), ip=a[0]||'0', fp=a[1]||'';
  if(exp>0){
    if(fp.length<=exp){ ip=ip+fp+new Array(exp-fp.length+1).join('0'); fp=''; }
    else{ ip=ip+fp.slice(0,exp); fp=fp.slice(exp); }
  }else if(exp<0){
    var k=-exp, all=ip+fp, loc=ip.length-k;
    if(loc<=0){ fp=new Array(1-loc).join('0')+all; ip='0'; }
    else{ fp=all.slice(loc); ip=all.slice(0,loc); }
  }
  ip=ip.replace(/^0+(?=\d)/,'');
  var intPart=BigInt(ip||'0')<<F, frac=0n;
  if(fp){ frac=(BigInt(fp)<<F)/(10n**BigInt(fp.length)); }
  var v=intPart+frac;
  return neg?-v:v;
}
function fpToDec(v,F,digits){
  digits=digits||DEC_DIGITS;
  if(typeof F!=='bigint') F=BigInt(F||1024);
  var neg=v<0n; if(neg)v=-v;
  var ip=v>>F;
  var fr=v&((1n<<F)-1n);
  var fracStr='';
  var i, num=fr, den=1n<<F;
  for(i=0;i<digits;i++){
    num*=10n;
    var d=num/den;
    fracStr+=d.toString();
    num=num%den;
    if(num===0n) break;
  }
  var s=ip.toString()+(fracStr?('.'+fracStr):'');
  return (neg?'-':'')+s;
}
function fpToNum(v,F){
  var keep=52n;
  if(F<=keep) return Number(v)/Math.pow(2,Number(F));
  var neg=v<0n; if(neg)v=-v;
  return (neg?-1:1)*Number(v>>(F-keep))/Math.pow(2,Number(keep));
}
function synchExQ(ex){
  if(!ex) return;
  if(!EXD.cxQ){ EXD.cxQ=fpToDec(decToFp(ex.cx!=null?ex.cx:-0.5,FBITS),FBITS,DEC_DIGITS); }
  if(!EXD.cyQ){ EXD.cyQ=fpToDec(decToFp(ex.cy!=null?ex.cy:0,FBITS),FBITS,DEC_DIGITS); }
  if(!EXD.spanQ){ EXD.spanQ=fpToDec(decToFp(ex.span!=null?ex.span:3.5,FBITS),FBITS,DEC_DIGITS); }
}
function resetExQ(ex){
  EXD.cxQ=fpToDec(decToFp(-0.5,FBITS),FBITS,DEC_DIGITS);
  EXD.cyQ=fpToDec(decToFp(0,FBITS),FBITS,DEC_DIGITS);
  EXD.spanQ=fpToDec(decToFp(3.5,FBITS),FBITS,DEC_DIGITS);
  if(ex){ ex.cx=-0.5; ex.cy=0; ex.span=3.5; ex.limit=false; }
}
function needPert(span){ return !(span>1e-13); }
function deepSpanOk(span){
  /* 1024-bit fixed point: refuse when span is smaller than ~2^{-900} (~3e271 zoom). */
  if(!(span>0) || !isFinite(span)) return false;
  return span>Math.pow(2,-900);
}

function log10Dec(s){
  s=String(s==null?'0':s).trim().replace(/\s+/g,'');
  if(!s) return -Infinity;
  if(s.charAt(0)==='-'||s.charAt(0)==='+') s=s.slice(1);
  var e=s.indexOf('e'); if(e<0) e=s.indexOf('E');
  if(e>=0){
    var mant=parseFloat(s.slice(0,e))||0, exp=parseInt(s.slice(e+1),10)||0;
    return Math.log10(Math.abs(mant)||1)+exp;
  }
  var a=s.split('.'), ip=(a[0]||'0').replace(/^0+/,''), fp=a[1]||'';
  if(ip.length){
    var head=ip[0]+'.'+(ip.slice(1)+fp).slice(0,12);
    return Math.log10(parseFloat(head)||1)+(ip.length-1);
  }
  var i=0; while(i<fp.length && fp.charAt(i)==='0') i++;
  if(i>=fp.length) return -Infinity;
  var rest=fp.slice(i,i+12);
  return Math.log10(parseFloat(rest.charAt(0)+'.'+rest.slice(1))||1)-(i+1);
}
function mandelZoomOf(span, spanQ){
  if(span>1e-18 && isFinite(span) && span>0) return 3.5/span;
  var lg=log10Dec(spanQ!=null?spanQ:EXD.spanQ);
  if(!isFinite(lg)) return 1;
  return 3.5*Math.pow(10, -lg);
}
function mandelItersFor(span, spanQ){
  var zoom=mandelZoomOf(span, spanQ);
  var lg=Math.log10(Math.max(1,zoom));
  if(!isFinite(lg)) lg=0;
  return Math.min(12000, Math.max(200, Math.floor(200+280*lg)));
}
function wigglesOk(unique, maxFrac){
  return (unique||0)>=8 && (maxFrac||1)<=0.90;
}

function ensureMandelWorker(){
  if(EXD.worker) return EXD.worker;
  try{
    EXD.worker=new Worker('v181-mandel-worker.js');
    EXD.worker.onmessage=onMandelMsg;
    EXD.worker.onerror=function(){ EXD.worker=null; };
    return EXD.worker;
  }catch(e){ EXD.worker=null; return null; }
}

function palList(rec){
  var nightOn=night();
  var pal=nightOn?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
  return pal;
}

function onMandelMsg(ev){
  var m=ev.data||{};
  if(m.id!==EXD.job) return;
  if(m.cmd!=='tile') return;
  var cv=$('patExCv'); if(!cv) return;
  if(cv.width!==m.W||cv.height!==m.H) return;
  var t0=performance.now();
  try{
    var img=new ImageData(new Uint8ClampedArray(m.data), m.W, m.H);
    cv.getContext('2d').putImageData(img,0,0);
  }catch(e){}
  var dt=performance.now()-t0;
  recordSlice(dt);
  EXD.maxSlice=Math.max(EXD.maxSlice,m.maxSlice||0,dt);
  EXD.glitches=m.glitches||0;
  EXD.ready=1;
  EXD.lastPass=m.pass;
  EXD.lastStep=m.step||1;
  EXD.unique=m.unique||0;
  EXD.maxFrac=m.maxFrac==null?1:m.maxFrac;
  EXD.wiggles=wigglesOk(EXD.unique, EXD.maxFrac)?1:0;
  EXD.flat=EXD.wiggles?0:1;
  try{
    var rec0=PAT106&&PAT106.ex;
    var sc=$('patExScale');
    if(sc&&rec0){
      var z=mandelZoomOf(rec0.span, EXD.spanQ);
      sc.textContent=typeof patExScaleLine106==='function'?patExScaleLine106(z):'';
    }
  }catch(e){}
  /* progressive sharpen: if this was a coarse pass, request a finer one */
  if((m.step||1)>1){
    var rec=PAT106&&PAT106.ex;
    if(rec) mandelKick(cv,rec,m.step>2?2:1, m.pass+1);
  }
}

function mandelKick(cv,rec,step,pass){
  var w=ensureMandelWorker();
  synchExQ(rec);
  var iters=mandelItersFor(rec.span, EXD.spanQ);
  EXD.iters=iters;
  var usePert=needPert(rec.span);
  if(usePert && !w){
    rec.limit=true;
    EXD.atCap=1;
    var lim=$('patExLimit'); if(lim) lim.textContent=t('This is as far as this lamp can see.');
    return false;
  }
  var msg={
    cmd:'render', id:EXD.job, W:cv.width, H:cv.height, iters:iters, step:step||1, pass:pass||0,
    kind:rec.kind||'mandel', cx:rec.cx, cy:rec.cy, span:rec.span,
    cxQ:EXD.cxQ, cyQ:EXD.cyQ, spanQ:EXD.spanQ,
    jr:rec.jr||0, ji:rec.ji||0, pal:palList(rec), usePert:usePert
  };
  if(w){
    try{ w.postMessage({cmd:'abort',id:EXD.job-1}); }catch(e){}
    w.postMessage(msg);
    return true;
  }
  return mandelMainThread(cv,rec,step,iters);
}

function mandelMainThread(cv,rec,step,iters){
  /* Chunked f64 (or skip pert if we have no worker — still f64 until the wall). */
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  var span=rec.span,cx=rec.cx,cy=rec.cy,kind=rec.kind||'mandel';
  var pal=palList(rec).map(function(h){
    h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];
  });
  var aspect=H/W, xmin=cx-span/2, ymin=cy-span*aspect/2, dx=span/W, dy=(span*aspect)/H;
  var img=x.createImageData(W,H), d=img.data, y=0, job=EXD.job, jr=rec.jr||0, ji=rec.ji||0;
  function color(n,inside){
    if(inside) return [20,16,28];
    var t=Math.max(0,Math.min(.999,n))*(pal.length-1),i=t|0,f=t-i,a=pal[i],b=pal[i+1]||pal[i];
    return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f].map(function(v){return v|0});
  }
  function slice(){
    if(job!==EXD.job) return;
    var t0=performance.now();
    while(y<H && performance.now()-t0<SLICE_MS){
      var y0=ymin+y*dy, i,k,zr,zi,cr,ci,nz,c,p,ii,jj;
      for(i=0;i<W;i+=step){
        var x0=xmin+i*dx;
        if(kind==='mandel'){zr=0;zi=0;cr=x0;ci=y0}else{zr=x0;zi=y0;cr=jr;ci=ji}
        k=0;
        while(k<iters&&zr*zr+zi*zi<=4){ nz=zr*zr-zi*zi+cr; zi=2*zr*zi+ci; zr=nz; k++; }
        c=color(k/iters, kind==='mandel'&&k>=iters);
        for(jj=0;jj<step&&y+jj<H;jj++) for(ii=0;ii<step&&i+ii<W;ii++){
          p=((y+jj)*W+(i+ii))*4; d[p]=c[0];d[p+1]=c[1];d[p+2]=c[2];d[p+3]=255;
        }
      }
      y+=step;
    }
    recordSlice(performance.now()-t0);
    if(y<H) requestAnimationFrame(slice);
    else{
      var t1=performance.now();
      x.putImageData(img,0,0);
      recordSlice(performance.now()-t1);
      EXD.ready=1;
      EXD.lastStep=step||1;
      EXD.lastPass=EXD.lastPass||0;
      /* Main-thread f64 path: count distinct colours already painted. */
      try{
        var seen={}, u=0, mx=0, tot=0, pi, key, cnt;
        for(pi=0;pi<d.length;pi+=16){
          key=d[pi]+','+d[pi+1]+','+d[pi+2];
          cnt=seen[key]=(seen[key]||0)+1;
          if(cnt===1) u++;
          if(cnt>mx) mx=cnt;
          tot++;
        }
        EXD.unique=u; EXD.maxFrac=tot?mx/tot:1;
        EXD.wiggles=wigglesOk(u, EXD.maxFrac)?1:0;
        EXD.flat=EXD.wiggles?0:1;
      }catch(e){}
      if((step||1)>1) mandelKick(cv,rec,step>2?2:1,(EXD.lastPass||0)+1);
    }
  }
  requestAnimationFrame(slice);
  return true;
}

function mandelRender(cv,rec,opts,prev){
  rec=rec||(PAT106&&PAT106.ex); if(!cv||!rec) return false;
  var kind=(rec.kind==='zoom'?rec.fractal:rec.kind)||'mandel';
  if(kind!=='mandel'){
    return typeof prev==='function'?prev(cv,rec,opts):false;
  }
  if(!deepSpanOk(rec.span)) return false;
  if(needPert(rec.span) && !ensureMandelWorker()){
    rec.limit=true;
    EXD.atCap=1;
    var lim=$('patExLimit'); if(lim) lim.textContent=t('This is as far as this lamp can see.');
    return typeof prev==='function'?prev(cv,rec,opts):false;
  }
  EXD.atCap=0;
  watchLongTasks();
  EXD.job++;
  EXD.ready=0;
  EXD.wiggles=0; EXD.flat=0;
  try{
  /* first a coarse pass, then sharpen */
  var step=reduced()?1:4;
    mandelKick(cv,rec,step,0);
  }catch(e){
    /* Fall back to the earlier renderer if high-precision setup fails. */
    try{ if(typeof prev==='function') return prev(cv,rec,opts); }catch(e2){}
    return false;
  }
  try{
    if(opts&&!opts.noTurtle && typeof patExMaybeTurtle106==='function'){
      /* turtle after a short wait so it lands on the sharpened frame if possible */
    }
  }catch(e){}
  return true;
}

function applyDeepGo(nx,ny,span){
  var F=FBITS;
  var cx=decToFp(EXD.cxQ,F), cy=decToFp(EXD.cyQ,F), sp=decToFp(EXD.spanQ,F);
  var spf=decToFp(span,F);
  /* Taps/pinches stash (u,v) from the screen. Add (u-0.5)·span in BigInt so
     steering still works when the f64 world coordinate rounds to 0. */
  if(EXD.lastAt){
    var uOff=decToFp(String(EXD.lastU-0.5),F);
    var vOff=decToFp(String(EXD.lastV-0.5),F);
    var asp=decToFp(String(EXD.lastAspect||1),F);
    cx=cx+((uOff*sp)>>F);
    cy=cy+((((vOff*sp)>>F)*asp)>>F);
    EXD.lastAt=0;
  }else if(typeof nx==='string'){
    cx=decToFp(nx,F); cy=decToFp(ny,F);
  }else if(nx!=null && isFinite(nx) && ny!=null && isFinite(ny) && !needPert(fpToNum(sp,F))){
    cx=decToFp(nx,F); cy=decToFp(ny,F);
  }
  EXD.cxQ=fpToDec(cx,F,DEC_DIGITS);
  EXD.cyQ=fpToDec(cy,F,DEC_DIGITS);
  EXD.spanQ=fpToDec(spf,F,DEC_DIGITS);
  return {cx:fpToNum(cx,F), cy:fpToNum(cy,F), span:fpToNum(spf,F), cxQ:EXD.cxQ, cyQ:EXD.cyQ, spanQ:EXD.spanQ};
}

/* -------- Share a pie truths -------- */
function fracDenom(n){ var s='1/'+Math.pow(2,n); return s; }
function fracSum(n){
  var parts=[],i;
  for(i=1;i<=n;i++) parts.push('1/'+Math.pow(2,i));
  return parts.join(' + ');
}

function fracOpenTruth(kind){
  try{ if(typeof PAT106==='object'){ PAT106.unit='frac'; PAT106.frac=PAT106.frac||{}; PAT106.frac.truth=kind; if(kind==='series') PAT106.frac.seriesN=PAT106.frac.seriesN||0; } }catch(e){}
  fracDrawTruth(kind);
}

function fracDrawTruth(kind){
  var el=$('patterns'); if(!el) return;
  var f=(typeof PAT106==='object'&&PAT106.frac)||{};
  var inner='', title='', lead='', count='';
  if(kind==='series'){
    var n=Math.max(0, Math.min(6, f.seriesN||0));
    title=t('Halves of halves');
    lead=t('Each new piece is half of what is left. The pieces fill more and more of the pie, but a little sliver is always left.');
    inner=seriesSvg(n)+
      '<div class="g181-row">'+
      '<button type="button" data-frac-add="1"'+(n>=6?' disabled':'')+'>'+esc(t('Add half of what is left'))+'</button>'+
      '<button type="button" data-g181reset="truth">'+esc(t('Reset'))+'</button></div>';
    if(!n) count='';
    else if(n===1) count=t('1 piece so far: 1/2. The other half of the pie is still empty.');
    else count=t('{n} pieces so far: {sum}. The leftover sliver is {rest} of the pie.',{n:String(n),sum:fracSum(n),rest:fracDenom(n)});
    if(n>=6) count=(count?count+' ':'')+t('This sliver is too thin to cut here. If you halve it in your mind, a smaller sliver is still left.');
  }else if(kind==='squares'){
    title=t('The same amount');
    lead=t('Both cuts make two halves. Fair means the same amount. The pieces do not have to be the same shape.');
    inner=squaresSvg()+
      '<div class="g181-row"><button type="button" data-g181reset="truth">'+esc(t('Reset'))+'</button></div>';
    count=t('Each square has 2 pieces. A rectangle half and a triangle half are the same amount.');
  }else{
    title=t('The same share');
    lead=t('Two quarters cover one half. They are the same amount.');
    var on=!!f.equalOn;
    inner=equalSvg(on)+
      '<div class="g181-row">'+
      '<button type="button" data-frac-equal="1">'+esc(t('Show 2/4 on 1/2'))+'</button>'+
      '<button type="button" data-g181reset="truth">'+esc(t('Reset'))+'</button></div>';
    count=on?t('2/4 covers 1/2. They are the same amount.'):'';
  }
  var body='<p class="soft" data-frac-truth-lead="1">'+esc(lead)+'</p>'+inner+
    '<p class="kline" id="fracTruthMsg" data-frac-truth="'+esc(kind)+'" aria-live="polite">'+esc(count)+'</p>'+
    '<div class="g181-row"><button type="button" data-frac-back="1">'+esc(t('Back'))+'</button></div>';
  el.innerHTML=(typeof patShell==='function'?patShell(esc(title),body):'<div class="card"><h2>'+esc(title)+'</h2>'+body+'</div>');
  var add=el.querySelector('[data-frac-add]');
  if(add) add.onclick=function(){
    if((f.seriesN||0)>=6) return;
    f.seriesN=Math.min(6,(f.seriesN||0)+1);
    softChime(Math.min(7,(f.seriesN||1)-1));
    fracDrawTruth('series');
  };
  var eq=el.querySelector('[data-frac-equal]');
  if(eq) eq.onclick=function(){
    f.equalOn=true;
    softChime(3);
    fracDrawTruth('equal');
  };
  var rst=el.querySelector('[data-g181reset="truth"]');
  if(rst) rst.onclick=function(){
    if(kind==='series'){ f.seriesN=0; fracDrawTruth('series'); }
    else if(kind==='equal'){ f.equalOn=false; fracDrawTruth('equal'); }
    else fracDrawTruth('squares');
  };
  var back=el.querySelector('[data-frac-back]');
  if(back) back.onclick=function(){
    try{ f.truth=null; if(typeof patFracHome106==='function') patFracHome106(); else if(typeof patShareDraw106==='function') patShareDraw106(); }catch(e){}
  };
  if(typeof turtlePlace105==='function') try{turtlePlace105('patterns')}catch(e){}
}

function seriesSvg(n){
  var ink=night()?'#d9c9a8':'#72583f';
  var golds=['#e6b454','#e0a04a','#d48a3c','#c45a3a','#b8874a','#c9a05a','#d4b36a','#e2c57a','#ead28a','#f0dc9a','#f4e4aa','#f7ecc0'];
  var paperC=paper();
  var paths='', i, a,b, large, x1,y1,x2,y2;
  /* start at top, go clockwise: first piece is a half (pi radians). */
  var ang=-Math.PI/2;
  for(i=0;i<Math.max(0,n);i++){
    var sweep=Math.PI/Math.pow(2,i); /* 1/2, 1/4, ... of the circle is  pi, pi/2, ...  wait: half the pie is 180deg = pi. Yes sweep = 2pi * 1/2^{i+1} = pi/2^i. */
    a=ang; b=ang+sweep; ang=b;
    large=sweep>Math.PI?1:0;
    x1=(50+40*Math.cos(a)).toFixed(2); y1=(50+40*Math.sin(a)).toFixed(2);
    x2=(50+40*Math.cos(b)).toFixed(2); y2=(50+40*Math.sin(b)).toFixed(2);
    paths+='<path data-frac-piece="'+(i+1)+'" d="M50 50 L'+x1+' '+y1+' A40 40 0 '+large+' 1 '+x2+' '+y2+' Z" fill="'+golds[i%golds.length]+'" stroke="'+ink+'" stroke-width="1.4"/>';
  }
  /* leftover sliver */
  if(n>0 && n<=6){
    a=ang; b=-Math.PI/2+Math.PI*2;
    if(b-a>0.0001){
      x1=(50+40*Math.cos(a)).toFixed(2); y1=(50+40*Math.sin(a)).toFixed(2);
      x2=(50+40*Math.cos(b)).toFixed(2); y2=(50+40*Math.sin(b)).toFixed(2);
      var sw=b-a; large=sw>Math.PI?1:0;
      paths+='<path data-frac-rest="1" d="M50 50 L'+x1+' '+y1+' A40 40 0 '+large+' 1 '+x2+' '+y2+' Z" fill="'+paperC+'" stroke="'+ink+'" stroke-width="1.4"/>';
    }
  }else if(n<=0){
    paths+='<circle cx="50" cy="50" r="40" fill="'+paperC+'" stroke="'+ink+'" stroke-width="1.8"/>';
  }
  return '<svg class="frac-truth-art" viewBox="0 0 100 100" width="220" height="220" role="img" aria-label="'+esc(t('Fill the pie'))+'">'+paths+'</svg>';
}

function squaresSvg(){
  var ink=night()?'#d9c9a8':'#72583f';
  var a='#eac77d', b='#e6b454';
  function sq(label, cuts){
    return '<figure><svg class="frac-truth-art" viewBox="0 0 80 90" width="160" height="180" role="img" aria-label="'+esc(label)+'">'+
      cuts+
      '</svg><figcaption>'+esc(label)+'</figcaption></figure>';
  }
  var straight='<rect x="8" y="8" width="32" height="64" fill="'+a+'" stroke="'+ink+'" stroke-width="1.8" data-half="L"/>'+
    '<rect x="40" y="8" width="32" height="64" fill="'+b+'" stroke="'+ink+'" stroke-width="1.8" data-half="R"/>';
  var diag='<path d="M8 8 L72 8 L8 72 Z" fill="'+a+'" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round" data-half="L"/>'+
    '<path d="M72 8 L72 72 L8 72 Z" fill="'+b+'" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round" data-half="R"/>';
  return '<div class="frac-sq">'+sq(t('Cut straight'),straight)+sq(t('Corner to corner'),diag)+'</div>';
}

function equalSvg(on){
  var ink=night()?'#d9c9a8':'#72583f';
  var gold='#e6b454', q1='#eac77d', q2='#c45a3a';
  /* Base: left half of the pie filled (from top, clockwise? show left/right as vertical diameter). */
  /* A vertical cut: left semicircle is a half. Overlay two quarter wedges on that half when on. */
  var half='<path d="M50 50 L50 10 A40 40 0 0 0 50 90 Z" fill="'+gold+'" stroke="'+ink+'" stroke-width="1.6" data-half-base="1"/>';
  var empty='<path d="M50 50 L50 90 A40 40 0 0 0 50 10 Z" fill="'+paper()+'" stroke="'+ink+'" stroke-width="1.6"/>';
  var ov='';
  var halfDash='';
  if(on){
    ov='<path data-quarter="1" d="M50 50 L50 10 A40 40 0 0 0 10 50 Z" fill="'+q1+'" fill-opacity="0.85" stroke="'+ink+'" stroke-width="1.5"/>'+
       '<path data-quarter="2" d="M50 50 L10 50 A40 40 0 0 0 50 90 Z" fill="'+q2+'" fill-opacity="0.8" stroke="'+ink+'" stroke-width="1.5"/>';
    /* 2 units outside the pie so the dashed half is visible over the quarter strokes. */
    halfDash='<path d="M50 8 A42 42 0 0 0 50 92" fill="none" stroke="'+ink+'" stroke-width="1.8" stroke-dasharray="3.5 2.5" data-half-outline="1"/>';
  }
  return '<svg class="frac-truth-art" viewBox="0 0 100 100" width="220" height="220" role="img" aria-label="'+esc(t('The same share'))+'">'+empty+half+ov+halfDash+'</svg>';
}

function enhanceFracTruths(){
  var el=$('patterns'); if(!el) return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='frac') return}catch(e){return}
  if(el.querySelector('[data-frac-truth]')) return; /* already on a truth screen (the msg carries the attr) — wait, we also want buttons on the home. */
  if(el.querySelector('[data-g181truth]')) return;
  var bar=document.createElement('div');
  bar.className='g181-truth';
  bar.setAttribute('data-g181truth','1');
  bar.innerHTML=
    '<button type="button" data-open-truth="series">'+esc(t('Halves of halves'))+'</button>'+
    '<button type="button" data-open-truth="squares">'+esc(t('The same amount'))+'</button>'+
    '<button type="button" data-open-truth="equal">'+esc(t('The same share'))+'</button>';
  var card=el.querySelector('.card')||el;
  card.appendChild(bar);
  bar.querySelectorAll('[data-open-truth]').forEach(function(b){
    b.onclick=function(){ fracOpenTruth(b.getAttribute('data-open-truth')); };
  });
}

/* -------- captions / zoom hooks -------- */
function mandelCaption(prev){
  return function(kind){
    if(!kind || kind==='mandel') return t('The Mandelbrot set is made by repeating a simple rule. Its edge has wiggles inside wiggles. Reset brings you home.');
    return typeof prev==='function'?prev(kind):'';
  };
}
function mandelScale(prev){
  return function(zoom){
    var final=EXD.ready && (EXD.lastStep===1 || !EXD.lastStep);
    /* Only at the arithmetic/no-worker cap, or at zoom ≥ 10^13 when the frame is honestly flat. */
    if(EXD.atCap) return t('This is as far as this lamp can see.');
    if(zoom>=1e13 && final && EXD.flat && !EXD.wiggles) return t('This is as far as this lamp can see.');
    if(zoom>=2e17) return t('Deeper than one atom compared with the whole Earth.');
    if(zoom>=1e15){
      if(EXD.wiggles) return t('You have looked very, very close. The edge still has wiggles. Reset brings you home.');
      return t('You have looked very, very close. Reset brings you home.');
    }
    return typeof prev==='function'?prev(zoom):'';
  };
}

function hookZoomReset(){
  /* After layoutZoom181 plants the Reset button, also clear high-prec state. */
  var el=$('patterns'); if(!el) return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='zoom') return}catch(e){return}
  var rst=el.querySelector('[data-g181reset="zoom"]');
  if(rst&&!rst._deep){
    var old=rst.onclick;
    rst.onclick=function(){
      resetExQ(PAT106.ex);
      EXD.job++;
      if(typeof old==='function') old.apply(this,arguments);
    };
    rst._deep=1;
  }
}

/* -------- install -------- */
function installDeep(){
  cssDeep();
  watchLongTasks();

  hookDeep('patGrowDrawOn106', function(prev){
    return function(cv,rec){ return growDrawDeep(cv, rec|| (PAT106&&PAT106.grow), prev); };
  });
  hookDeep('patGrowDraw106', function(prev){
    return function(){
      var g=PAT106&&PAT106.grow, keep=g&&g.depth, sh=g&&(g.shape||'tree');
      var LODSH={tree:1,antler:1,dragon:1,levy:1,triangle:1,sunflower:1,fern:1,koch:1,htree:1,pythagoras:1,hilbert:1};
      var r=prev.apply(this,arguments);
      try{
        /* v171 scrubGrow clamps depth to its cap on every redraw. Restore a deeper
           LOD depth and re-render the visible window without going through scrub again. */
        if(g && LODSH[sh] && keep>(g.depth||0)){
          g.depth=keep;
          if(g.msg&&/as far as this seed grows|hasta aquí llega/i.test(g.msg)) g.msg='';
          var cv=$('patGrowCv');
          if(cv) growDrawDeep(cv,g,null);
          var msg=$('patGrowMsg'); if(msg) msg.textContent=g.msg||'';
        }
        growAfterDraw();
      }catch(e){}
      return r;
    };
  });
  hookDeep('patGrowStep106', growStepDeep);
  hookDeep('patGrowNew106', function(prev){
    return function(){
      try{ if(PAT106&&PAT106.grow) growResetView(PAT106.grow); }catch(e){}
      return prev.apply(this,arguments);
    };
  });

  hookDeep('ehDraw181', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{ehAfterDraw()}catch(e){}
      return r;
    };
  });
  hookDeep('ehOpen181', function(prev){
    return function(){
      try{ if(root.EH181){ EH181.roots=0; EH181._pendingRoot=0; } }catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hookDeep('ehFill181', function(prev){
    return function(idx){
      var E=root.EH181;
      if(E && (E.level||0)>=3){
        /* Should already be re-rooting; ignore stray fills. */
        return;
      }
      return prev.apply(this,arguments);
    };
  });

  hookDeep('patExCanZoom106', function(prev){
    return function(span){
      var ex=PAT106&&PAT106.ex;
      var kind=ex&&((ex.kind==='zoom'?ex.fractal:ex.kind)||'mandel');
      if(kind==='mandel') return deepSpanOk(span) && span<1e6;
      return typeof prev==='function'?prev(span):true;
    };
  });
  hookDeep('patExRender106', function(prev){
    return function(cv,rec,opts){ return mandelRender(cv,rec,opts,prev); };
  });
  hookDeep('patExAt106', function(prev){
    return function(cv, clientX, clientY){
      var p=prev.apply(this,arguments);
      if(p){
        EXD.lastU=p.u; EXD.lastV=p.v;
        EXD.lastAspect=(cv&&cv.height&&cv.width)?(cv.height/cv.width):1;
        EXD.lastAt=1;
      }
      return p;
    };
  });
  hookDeep('patExZoomOf106', function(prev){
    return function(span){
      var ex=PAT106&&PAT106.ex;
      var kind=ex&&((ex.kind==='zoom'?ex.fractal:ex.kind)||'mandel');
      if(kind==='mandel') return mandelZoomOf(span, EXD.spanQ);
      return typeof prev==='function'?prev(span): (3.5/Math.max(span,1e-300));
    };
  });
  hookDeep('patExTap106', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      /* Turtle hits call At but not Go; do not leave a stale tap for the next Back. */
      EXD.lastAt=0;
      return r;
    };
  });
  hookDeep('patExGo106', function(prev){
    return function(nx,ny,span,slow){
      var ex=PAT106&&PAT106.ex;
      var kind=ex&&((ex.kind==='zoom'?ex.fractal:ex.kind)||'mandel');
      if(kind==='mandel'){
        if(!deepSpanOk(span)){
          ex.limit=true;
          var lim=$('patExLimit'); if(lim) lim.textContent=t('This is as far as this lamp can see.');
          return;
        }
        synchExQ(ex);
        var got=applyDeepGo(nx,ny,span);
        /* Animate at most a cheap preview, then kick a progressive render. */
        var start={cx:ex.cx,cy:ex.cy,span:ex.span};
        var end=got;
        var cv=$('patExCv');
        function go(k){
          ex.cx=start.cx+(end.cx-start.cx)*k;
          ex.cy=start.cy+(end.cy-start.cy)*k;
          ex.span=start.span+(end.span-start.span)*k;
          ex.limit=false;
          if(k>=1){
            ex.cx=end.cx; ex.cy=end.cy; ex.span=end.span;
            if(cv) mandelRender(cv,ex,{},null);
          }else if(cv){
            /* very coarse preview during the tween */
            EXD.job++; mandelKick(cv,ex,8,0);
          }
          var sc=$('patExScale'); if(sc&&typeof patExScaleLine106==='function') sc.textContent=patExScaleLine106(mandelZoomOf(ex.span, EXD.spanQ));
        }
        if(reduced()||!slow){ go(1); return; }
        var t0=performance.now(), dur=700;
        var tick=function(now){
          var k=Math.min(1,(now-t0)/dur), e=k*k*(3-2*k);
          go(e);
          if(k<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        return;
      }
      return prev.apply(this,arguments);
    };
  });
  hookDeep('patExCaption106', mandelCaption);
  hookDeep('patExScaleLine106', mandelScale);
  hookDeep('patExDraw106', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{hookZoomReset()}catch(e){}
      return r;
    };
  });
  hookDeep('patExSetKind106', function(prev){
    return function(kind){
      if(kind==='mandel'||!kind) resetExQ(PAT106&&PAT106.ex);
      return prev.apply(this,arguments);
    };
  });
  hookDeep('layoutZoom181', function(prev){
    return function(){
      var r=prev&&prev.apply(this,arguments);
      try{hookZoomReset()}catch(e){}
      return r;
    };
  });


  ['patFracHome106','patShareDraw106','patJarDraw106','patFoldDraw106'].forEach(function(n){
    hookDeep(n, function(prev){
      return function(){
        var r=prev.apply(this,arguments);
        try{enhanceFracTruths()}catch(e){}
        return r;
      };
    });
  });

  hookDeep('enhanceFrac181', function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{enhanceFracTruths()}catch(e){}
      return r;
    };
  });
  /* Also attach when frac home/share/jar/fold redraw. enhanceFrac181 already hooked there in v181; our hookDeep wraps that wrap. */

  /* If install of v181 already ran, patch current screen once. */
  try{
    if(typeof PAT106==='object'&&PAT106.unit==='grow') growAfterDraw();
    if(typeof PAT106==='object'&&PAT106.unit==='frac') enhanceFracTruths();
    if(typeof PAT106==='object'&&PAT106.unit==='zoom') hookZoomReset();
  }catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installDeep);
else installDeep();


function ehGotoExp(n){
  n=Math.max(0,n|0);
  var E=root.EH181; if(!E) return 0;
  E.roots=Math.floor(n/3);
  E.level=n%3;
  E.filled=[0,0,0,0,0,0];
  E.busy=false;
  E._pendingRoot=0;
  if(typeof ehDraw181==='function') ehDraw181();
  return ehExp();
}
function mandelSetView(cx,cy,span){
  var F=FBITS, ex=PAT106&&PAT106.ex;
  EXD.cxQ=fpToDec(decToFp(String(cx),F),F,DEC_DIGITS);
  EXD.cyQ=fpToDec(decToFp(String(cy),F),F,DEC_DIGITS);
  EXD.spanQ=fpToDec(decToFp(String(span),F),F,DEC_DIGITS);
  if(ex){
    ex.kind='mandel';
    ex.cx=fpToNum(decToFp(EXD.cxQ,F),F);
    ex.cy=fpToNum(decToFp(EXD.cyQ,F),F);
    ex.span=fpToNum(decToFp(EXD.spanQ,F),F);
    ex.limit=!deepSpanOk(ex.span);
    try{
      var sc=document.getElementById('patExScale');
      if(sc&&typeof patExScaleLine106==='function'){
        var z=mandelZoomOf(ex.span, EXD.spanQ);
        sc.textContent=patExScaleLine106(z);
      }
    }catch(e){}
  }
  return ex?{cx:ex.cx,cy:ex.cy,span:ex.span,cxQ:EXD.cxQ,cyQ:EXD.cyQ,spanQ:EXD.spanQ}:null;
}

function heighwayEdges(depth,W,H){
  W=W||360; H=H||360;
  var ax=W*0.22, ay=H*0.55, bx=W*0.78, by=H*0.55, out=[], seen={};
  function add(a,b,c,d){
    var k=[a.toFixed(3),b.toFixed(3),c.toFixed(3),d.toFixed(3)].join(',');
    var k2=[c.toFixed(3),d.toFixed(3),a.toFixed(3),b.toFixed(3)].join(',');
    if(seen[k]||seen[k2]) return;
    seen[k]=1; out.push([a,b,c,d]);
  }
  function fold(x0,y0,x1,y1,d,sign){
    if(d>=depth){ add(x0,y0,x1,y1); return; }
    var mx=(x0+x1)/2, my=(y0+y1)/2, dx=x1-x0, dy=y1-y0;
    var px=mx-sign*dy/2, py=my+sign*dx/2;
    fold(x0,y0,px,py,d+1,1);
    fold(px,py,x1,y1,d+1,-1);
  }
  fold(ax,ay,bx,by,0,1);
  return out;
}
function kochAreaRatio(depth){
  /* Shoelace area of the outward Koch snowflake over the starting down-triangle. */
  depth=Math.max(0,depth|0);
  var W=360,H=360,sK=Math.min(W,H)*0.82, x0=(W-sK)/2, y0=H*0.22, x1=x0+sK, y1=y0, x2=x0+sK/2, y2=y0+sK*Math.sqrt(3)/2;
  function area(pts){
    var a=0,i,n=pts.length;
    for(i=0;i<n;i++){ var p=pts[i],q=pts[(i+1)%n]; a+=p[0]*q[1]-q[0]*p[1]; }
    return Math.abs(a)/2;
  }
  var base=area([[x0,y0],[x1,y1],[x2,y2]]);
  var sides=[[[x0,y0],[x1,y1]],[[x1,y1],[x2,y2]],[[x2,y2],[x0,y0]]];
  var d,s,next,ax,ay,bx,by,ux,uy,mx,my,nx,ny,px,py;
  for(d=0;d<depth;d++){
    next=[];
    for(s=0;s<sides.length;s++){
      ax=sides[s][0][0]; ay=sides[s][0][1]; bx=sides[s][1][0]; by=sides[s][1][1];
      ux=(bx-ax)/3; uy=(by-ay)/3;
      mx=ax+ux; my=ay+uy; nx=ax+2*ux; ny=ay+2*uy;
      px=ax+ux+(ux/2+uy*Math.sqrt(3)/2);
      py=ay+uy+(uy/2-ux*Math.sqrt(3)/2);
      next.push([[ax,ay],[mx,my]],[[mx,my],[px,py]],[[px,py],[nx,ny]],[[nx,ny],[bx,by]]);
    }
    sides=next;
  }
  var pts=[],i;
  for(i=0;i<sides.length;i++) pts.push(sides[i][0]);
  return area(pts)/base;
}

root.IL181DEEP={
  version:181,
  sliceMs:SLICE_MS,
  minCell:MIN_PX,
  ehMinCell:EH_MIN_PX,
  maxSlice:function(){return MAX_SLICE},
  lastLong:function(){return LAST_LONG},
  resetSlices:function(){MAX_SLICE=0;LAST_LONG=0},
  cellPx:cellPx,
  tooFine:tooFine,
  ehExp:ehExp,
  ehCountKindly:ehCountKindly,
  ehMinCellPx:ehMinCellPx,
  ehReRootNow:function(){ehReRootNow(false)},
  ehRewriteMsg:ehRewriteMsg,
  fracOpenTruth:fracOpenTruth,
  fracDrawTruth:fracDrawTruth,
  resetMandelHome:function(){resetExQ(PAT106&&PAT106.ex)},
  needPert:needPert,
  deepSpanOk:deepSpanOk,
  exState:function(){return {cxQ:EXD.cxQ,cyQ:EXD.cyQ,spanQ:EXD.spanQ,ready:EXD.ready,glitches:EXD.glitches,maxSlice:EXD.maxSlice,job:EXD.job,lastPass:EXD.lastPass,lastStep:EXD.lastStep,wiggles:EXD.wiggles,unique:EXD.unique,maxFrac:EXD.maxFrac,flat:EXD.flat,atCap:EXD.atCap,iters:EXD.iters}},
  decDigits:DEC_DIGITS,
  hilbertMax:HILBERT_MAX,
  sunN:sunN181,
  fernWant:fernWant,
  patchJar:patchJarDeep,
  mandelZoomOf:mandelZoomOf,
  mandelItersFor:mandelItersFor,
  oldCapOf:oldCapOf,
  heighwayEdges:heighwayEdges,
  kochAreaRatio:kochAreaRatio,
  applyDeepGo:applyDeepGo,
  ehGotoExp:ehGotoExp,
  mandelSetView:mandelSetView,
  t:t,
  ES:ES
};
root.ehGotoExp181=ehGotoExp;
root.mandelSetView181=mandelSetView;

root.fracOpenTruth181=fracOpenTruth;
root.ehReRootNow181=function(){ehReRootNow(false)};
root.ehExp181=ehExp;
root.ehCountKindly181=ehCountKindly;

})(typeof window!=='undefined'?window:this);
