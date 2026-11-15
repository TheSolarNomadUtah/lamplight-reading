/* v169: screen-aware Grow a Fractal limits. Pixel budget, offscreen + Path2D new level,
   6ms time-slices, first-two-levels speed test, thinner/lower-alpha deep lines,
   log-density ImageData for point fractals. Pinch-zoom tiles and WebGL are deferred.
   v168.js stays frozen. No show() wrap. Quilt, voices, official Dragon art untouched. */
(function(root){
'use strict';
var GOLD='#E6B454',I='#72583f',CR='#fff8ec',NK='#0d0f1a';
var BASE={koch:5,htree:7,levy:10,apollonian:4,pascal:10,chaos:8,hexrings:4,ripples:8,antler:6,sunflower:8,hilbert:4,fern:5,spirals:2,tree:6,dragon:6,pythagoras:6,triangle:6};
var SUNN=[1,13,21,34,55,89,144,233,377,610,987];
var SHR=[0.68,0.66,0.70,2/3];
var SPEED_KEY='lamp_gaf_speed169';
var SLICE=6,MINPX=0.75,HARD=2;
var GOLDANG=360*(1-1/(1+Math.sqrt(5))/1); /* overwritten below with exact 360*(1-1/phi) */
GOLDANG=360*(1-1/((1+Math.sqrt(5))/2));
var cache=null,speed={},tok=0,copies0=null,resizeT=0;

function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v169)return;var next=wrap(prev);next._v169=1;next._base=prev._base||prev;root[name]=next}
function isPhone(){var w=root.innerWidth||0,h=root.innerHeight||0;if(!w||!h)return true;return Math.min(w,h)<=390}
function dpr(){return Math.max(1,Math.min(2,root.devicePixelRatio||1))}
function cssSize(){if(isPhone())return 360;return Math.max(360,Math.min(720,Math.round((root.innerWidth||1280)*0.55)))}
function devicePx(){return isPhone()?360:Math.round(cssSize()*dpr())}
function baseCap(sh){return BASE[sh]!=null?BASE[sh]:6}
function sunN(d){d=Math.max(0,Math.min(SUNN.length-1,d|0));return SUNN[d]}
function ink(sh,d,depth){return(typeof IL154==='object'&&typeof IL154.ink==='function')?IL154.ink(sh,d,depth):GOLD}
function pal(rec,d){var cols=(typeof PAT_PAL106!=='undefined'&&PAT_PAL106[rec.pal||0])||[GOLD,'#C45A3A','#fff6d8'];return cols[d%cols.length]}

function pieceSize(sh,next,S){
  var d=Math.max(1,next|0),a;
  if(sh==='tree'||sh==='antler')return S*0.22*Math.pow(0.68,d);
  if(sh==='pythagoras'){a=Math.cos(28*Math.PI/180);return S*0.16*Math.pow(a,d)}
  if(sh==='dragon'||sh==='levy')return(S*0.5)/Math.pow(Math.SQRT2,d);
  if(sh==='koch')return(S*0.82)/Math.pow(3,d);
  if(sh==='hilbert')return(S*0.84)/Math.max(1,(1<<d)-1);
  if(sh==='htree')return S*0.22*Math.pow(0.707,d);
  if(sh==='spirals')return S*0.28*Math.pow(0.32,d);
  if(sh==='triangle')return(S*0.8)/Math.pow(2,d);
  if(sh==='hexrings')return(S/2)/(d+1+0.6);
  if(sh==='ripples')return(S/2)/Math.max(1,d);
  if(sh==='sunflower')return S*0.42/Math.sqrt(Math.max(1,sunN(d)));
  if(sh==='chaos')return S/Math.sqrt(Math.max(1,d*800));
  if(sh==='fern')return S/Math.sqrt(Math.max(1,d*4000));
  if(sh==='apollonian')return(S*0.46)/Math.pow(2.5,d);
  if(sh==='pascal')return S/Math.max(2,d+2);
  return S/Math.pow(2,d);
}
function speedExtra(){
  if(speed.t1==null||speed.t2==null)return HARD;
  var sum=speed.t1+speed.t2;
  if(sum>48)return 0;
  if(sum>24)return 1;
  return HARD;
}
function loadSpeed(){
  try{var s=root.localStorage&&localStorage.getItem(SPEED_KEY);if(!s)return;var o=JSON.parse(s);if(o&&isFinite(o.t1)&&isFinite(o.t2)){speed.t1=+o.t1;speed.t2=+o.t2}}catch(ex){}
}
function saveSpeed(){
  if(speed.t1==null||speed.t2==null)return;
  try{localStorage.setItem(SPEED_KEY,JSON.stringify({t1:speed.t1,t2:speed.t2,ms:speed.t1+speed.t2,at:Date.now()}))}catch(ex){}
}
function noteTime(depth,ms){
  if(!(ms>=0)||!isFinite(ms))return;
  if(depth===1&&(speed.t1==null||ms<speed.t1))speed.t1=ms;
  if(depth===2&&(speed.t2==null||ms<speed.t2))speed.t2=ms;
  if(speed.t1!=null&&speed.t2!=null)saveSpeed();
}
function capOf(sh){
  var b=baseCap(sh);
  if(isPhone())return b;
  var S=devicePx(),extra=0,maxE=Math.min(HARD,speedExtra()),d;
  for(d=1;d<=maxE;d++){
    if(pieceSize(sh,b+d,S)+1e-12>=MINPX)extra=d;
    else break;
  }
  return b+extra;
}
function copies(rec){
  rec=rec||{};
  var sh=rec.shape,cap=capOf(sh),d=Math.max(0,Math.min(cap,rec.depth||0));
  if(sh==='hilbert')return Math.pow(4,d);
  if(sh==='sunflower')return sunN(d);
  if(sh==='fern')return Math.max(0,d)*4000;
  if(sh==='spirals')return(Math.pow(5,d+1)-1)/4;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return(d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='pythagoras'||sh==='antler')return Math.pow(2,d);
  if(sh==='apollonian'&&typeof IL154==='object'&&typeof IL154.gasket==='function')return IL154.gasket(d).length;
  if(typeof copies0==='function')return copies0({shape:sh,depth:d,angle:rec.angle,poly:rec.poly,seed:rec.seed,season:rec.season});
  return Math.pow(2,d);
}

function css(){
  if(document.getElementById('v169css'))return;
  var s=document.createElement('style');s.id='v169css';
  s.textContent='#patterns canvas#patGrowCv{max-width:min(720px,92vw);height:auto}';
  document.head.appendChild(s);
}
function layout(cv){
  cv=cv||(typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'));
  if(!cv)return false;
  var cssPx=cssSize(),scale=isPhone()?1:dpr(),bw=Math.round(cssPx*scale),changed=cv.width!==bw||cv.height!==bw;
  if(changed){cv.width=bw;cv.height=bw;cache=null}
  cv.style.width=cssPx+'px';cv.style.height=cssPx+'px';cv.style.maxWidth=cssPx+'px';
  return changed;
}
function recKey(rec,W,H){
  return [rec.shape,rec.angle,rec.pal,rec.season,rec.poly,rec.seed,W,H,night()?'n':'d'].join('|');
}
function saveCache(cv,rec){
  var oc,x;
  try{
    oc=(cache&&cache.canvas&&cache.canvas.width===cv.width)?cache.canvas:document.createElement('canvas');
    oc.width=cv.width;oc.height=cv.height;
    x=oc.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cv,0,0);
    cache={canvas:oc,key:recKey(rec,cv.width,cv.height),depth:rec.depth||0,sh:rec.shape};
  }catch(ex){cache=null}
}
function blitCache(cv){
  if(!cache||!cache.canvas)return false;
  var x=cv.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cache.canvas,0,0);return true;
}
function bg(x,W,H){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function deepAlpha(level,base){var e=Math.max(0,level-base);return e<=0?1:e===1?0.72:0.52}
function deepLw(level,base,raw){var e=Math.max(0,level-base),s=e<=0?1:e===1?0.75:0.55;return Math.max(0.5,raw*s)}
function cancelWork(){tok++}

function strokePath(x,path){
  if(path&&typeof Path2D==='function')x.stroke(path);
}
function newPath(){return(typeof Path2D==='function')?new Path2D():null}

function hilbertPts(n){
  n=Math.max(1,Math.min(8,n||1));
  var pts=[],N=1<<n,i;
  function d2xy(m,d){
    var x=0,y=0,s,rx,ry,t;
    for(s=1;s<m;s*=2){
      rx=1&(d>>1);ry=1&(d^rx);
      if(!ry){if(rx){x=s-1-x;y=s-1-y}t=x;x=y;y=t}
      x+=s*rx;y+=s*ry;d>>=2;
    }
    return[x,y];
  }
  for(i=0;i<N*N;i++)pts.push(d2xy(N,i));
  return pts;
}
function levyPts(W,H,depth,kind){
  var pts,k,i,next,a,b,dx,dy,sign;
  if(kind==='dragon')pts=[{x:W*0.22,y:H*0.55},{x:W*0.78,y:H*0.55}];
  else pts=[{x:W*0.22,y:H*0.62},{x:W*0.72,y:H*0.62}];
  for(k=0;k<depth;k++){
    next=[];
    for(i=0;i<pts.length-1;i++){
      a=pts[i];b=pts[i+1];dx=b.x-a.x;dy=b.y-a.y;
      if(kind==='dragon'){sign=i%2===0?1:-1;next.push(a,{x:a.x+dx/2-sign*dy/2,y:a.y+dy/2+sign*dx/2})}
      else next.push(a,{x:(a.x+b.x)/2-(b.y-a.y)/2,y:(a.y+b.y)/2+(b.x-a.x)/2});
    }
    next.push(pts[pts.length-1]);pts=next;
  }
  return pts;
}
function pathFromPts(pts){
  var p=newPath(),i;
  if(!p||!pts||!pts.length)return null;
  p.moveTo(pts[0].x,pts[0].y);
  for(i=1;i<pts.length;i++)p.lineTo(pts[i].x,pts[i].y);
  return p;
}

function drawKoch(x,W,H,rec){
  var depth=rec.depth||0,s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2;
  var p=newPath();
  function side(ax,ay,bx,by,d){
    if(!d){if(p){p.moveTo(ax,ay);p.lineTo(bx,by)}else{x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke()}return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  x.strokeStyle=ink('koch',depth,depth);x.lineWidth=deepLw(depth,baseCap('koch'),Math.max(0.8,2.4-depth*0.25));x.globalAlpha=deepAlpha(depth,baseCap('koch'));
  if(!p){side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);return}
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);x.stroke(p);
}
function drawTreeLike(x,W,H,rec,sh,only){
  var depth=rec.depth||0,ang=(rec.angle||28)*Math.PI/180,ratio=SHR[Math.max(0,Math.min(3,rec.season||0))],se=rec.season||0,base=baseCap(sh);
  var p=newPath(),tips=[];
  if(!se&&sh==='tree')ratio=0.68;
  function br(px,py,len,a,d){
    if(d>depth||len<0.6)return;
    var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
    if(only==null||d===only){
      if(p){p.moveTo(px,py);p.lineTo(nx,ny)}
      else{x.beginPath();x.moveTo(px,py);x.lineTo(nx,ny);x.stroke()}
      if(se&&d>=depth-1)tips.push({x:nx,y:ny,d:d,a:a});
    }
    br(nx,ny,len*ratio,a-ang,d+1);br(nx,ny,len*ratio,a+ang,d+1);
  }
  var level=only==null?depth:only;
  x.strokeStyle=se||sh==='antler'?ink(sh,level,depth):pal(rec,level);
  x.lineWidth=deepLw(level,base,Math.max(0.6,(6-level)*0.85));
  x.globalAlpha=deepAlpha(level,base);
  br(W/2,H*0.92,H*0.22,Math.PI/2,0);
  if(p)x.stroke(p);
  if(se){
    x.globalAlpha=deepAlpha(level,base);
    tips.forEach(function(tp){
      if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tp.x,tp.y,2.1,0,Math.PI*2);x.fill()}
      else if(se===2){x.fillStyle=sh==='antler'?'#4e6b5c':'#3D6A62';x.beginPath();x.arc(tp.x,tp.y,3.1,0,Math.PI*2);x.fill()}
      else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tp.x+(sh==='antler'?3:(tp.d%2?4:-3)),tp.y+(sh==='antler'?6:5),2,0,Math.PI*2);x.fill()}
    });
  }
}
function drawHLevel(x,W,H,rec,only){
  var depth=rec.depth||0,base=baseCap('htree'),p=newPath();
  function Hn(cx,cy,len,hz,d){
    if(d<0||len<0.6)return;
    if(only==null||d===depth-only){
      if(p){if(hz){p.moveTo(cx-len,cy);p.lineTo(cx+len,cy)}else{p.moveTo(cx,cy-len);p.lineTo(cx,cy+len)}}
      else{x.beginPath();if(hz){x.moveTo(cx-len,cy);x.lineTo(cx+len,cy)}else{x.moveTo(cx,cy-len);x.lineTo(cx,cy+len)}x.stroke()}
    }
    if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
    else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
  }
  var level=only==null?depth:only;
  x.strokeStyle=ink('htree',level,depth);x.lineWidth=deepLw(level,base,Math.max(0.7,2.6-level*0.25));x.globalAlpha=deepAlpha(level,base);
  Hn(W/2,H/2,Math.min(W,H)*0.22,1,depth);
  if(p)x.stroke(p);
}
function drawSpiralLevel(x,W,H,rec,only){
  var depth=rec.depth||0,base=baseCap('spirals'),p;
  function sp(cx,cy,s,rot,d){
    var i,r,a,first,px,py,level=d;
    if(d>depth||s<2)return;
    if(only==null||d===only){
      p=newPath();
      x.strokeStyle=pal(rec,d);x.lineWidth=deepLw(d,base,Math.max(1,2.4-d*0.3));x.globalAlpha=deepAlpha(d,base);
      if(p){
        first=1;
        for(i=0;i<=90;i++){a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;first?(p.moveTo(px,py),first=0):p.lineTo(px,py)}
        x.stroke(p);
      }else{
        x.beginPath();first=1;
        for(i=0;i<=90;i++){a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;first?(x.moveTo(px,py),first=0):x.lineTo(px,py)}
        x.stroke();
      }
    }
    if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*0.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*0.32,rot+0.4,d+1)}
  }
  sp(W/2,H/2,Math.min(W,H)*0.28,0,0);
}
function drawPyth(x,W,H,rec){
  var depth=rec.depth||0,ang=(rec.angle||28)*Math.PI/180,boxes=[],base=baseCap('pythagoras'),i,j,b,p,minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9,pad,sc,cx,cy;
  function sq(px,py,s,a,d){
    if(d>depth||s<0.8)return;
    var c=Math.cos(a),si=Math.sin(a);
    var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
    boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
    if(d===depth)return;
    var sl=s*Math.cos(ang),sr=s*Math.sin(ang),bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
    sq(x2,y2,sl,a-ang,d+1);sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
  }
  var s0=Math.min(W,H)*0.16;
  sq(W/2-s0/2,H*0.86,s0,-Math.PI/2,0);
  if(!boxes.length)return;
  for(i=0;i<boxes.length;i++)for(j=0;j<4;j++){
    p=boxes[i].P[j];
    if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
    if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
  }
  pad=Math.min(W,H)*0.08;sc=Math.min((W-2*pad)/Math.max(maxx-minx,1e-6),(H-2*pad)/Math.max(maxy-miny,1e-6));
  cx=(minx+maxx)/2;cy=(miny+maxy)/2;
  function mx(v){return W/2+(v-cx)*sc}function my(v){return H/2+(v-cy)*sc}
  for(i=0;i<boxes.length;i++){
    b=boxes[i];p=b.P;
    x.globalAlpha=deepAlpha(b.d,base);
    x.fillStyle=x.strokeStyle=pal(rec,b.d);
    x.lineWidth=deepLw(b.d,base,Math.max(1,3-b.d*0.35));
    x.beginPath();x.moveTo(mx(p[0][0]),my(p[0][1]));
    for(j=1;j<4;j++)x.lineTo(mx(p[j][0]),my(p[j][1]));
    x.closePath();x.fill();x.stroke();
  }
}
function drawHil(x,W,H,rec){
  var n=Math.max(1,Math.min(8,rec.depth||1)),pts=hilbertPts(n),i,pad=W*0.08,span=W-pad*2,N=(1<<n)-1||1,p=newPath(),X,Y,base=baseCap('hilbert');
  x.strokeStyle=pal(rec,2);x.lineWidth=deepLw(n,base,Math.max(1,5-n));x.lineCap='round';x.globalAlpha=deepAlpha(n,base);
  if(p){
    for(i=0;i<pts.length;i++){X=pad+pts[i][0]/N*span;Y=pad+pts[i][1]/N*span;i?p.lineTo(X,Y):p.moveTo(X,Y)}
    x.stroke(p);
  }else{
    x.beginPath();
    for(i=0;i<pts.length;i++){X=pad+pts[i][0]/N*span;Y=pad+pts[i][1]/N*span;i?x.lineTo(X,Y):x.moveTo(X,Y)}
    x.stroke();
  }
  rec._hil=pts;rec._hilN=N;rec._hilPad=pad;rec._hilSpan=span;
}
function drawTri(x,W,H,rec){
  var depth=rec.depth||0,base=baseCap('triangle');
  x.globalAlpha=deepAlpha(depth,base);
  (function tri(ax,ay,bx,by,cx,cy,d){
    if(d>=depth){
      x.fillStyle=pal(rec,d);
      x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.lineTo(cx,cy);x.closePath();x.fill();
      return;
    }
    var mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px=(cx+ax)/2,py=(cy+ay)/2;
    tri(ax,ay,mx,my,px,py,d+1);tri(mx,my,bx,by,nx,ny,d+1);tri(px,py,nx,ny,cx,cy,d+1);
  })(W/2,H*0.1,W*0.08,H*0.9,W*0.92,H*0.9,0);
}
function drawPas(x,W,H,rec){
  var depth=rec.depth||0,mod=rec.angle===5?5:rec.angle===3?3:2,rows=[],n,k,cell,sz,y0,x0,base=baseCap('pascal');
  rows[0]=[1];
  for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
  sz=Math.min((W-24)/(depth+1),(H-24)/(depth+1),28);
  y0=(H-(depth+1)*sz)/2+sz/2;x0=W/2;
  for(n=0;n<=depth;n++){
    x.globalAlpha=n>base?deepAlpha(n,base):1;
    for(k=0;k<=n;k++){
      cell=rows[n][k];
      x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,mod);
      x.beginPath();x.arc(x0+(k-n/2)*sz,y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
    }
  }
}
function drawHex(x,W,H,rec){
  var depth=rec.depth||0,pad=6,size,R,q,r,s,px,py,ring,base=baseCap('hexrings');
  size=depth<=0?Math.min(W,H)*0.28:(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
  R=size/Math.sqrt(3);
  function hex(cx,cy,rad,col,a){
    var k,p=newPath();x.globalAlpha=a;x.strokeStyle=col;x.lineWidth=deepLw(depth,base,Math.max(0.8,2.2));
    if(p){for(k=0;k<6;k++)p[k?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+k*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+k*Math.PI/3)*rad);p.closePath();x.stroke(p)}
    else{x.beginPath();for(k=0;k<6;k++)x[k?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+k*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+k*Math.PI/3)*rad);x.closePath();x.stroke()}
  }
  for(q=-depth;q<=depth;q++)for(r=-depth;r<=depth;r++){
    s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
    px=W/2+(q+r/2)*size;py=H/2+r*size*Math.sqrt(3)/2;
    ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
    hex(px,py,R,ink('hexrings',ring,depth),ring>base?deepAlpha(ring,base):1);
  }
}
function drawRip(x,W,H,rec){
  var depth=rec.depth||0,i,Rmax=Math.min(W,H)/2-6,step,base=baseCap('ripples'),p;
  if(depth<=0){x.fillStyle=GOLD;x.beginPath();x.arc(W/2,H/2,5,0,Math.PI*2);x.fill();return}
  step=Rmax/Math.max(1,depth);
  for(i=1;i<=depth;i++){
    x.strokeStyle=ink('ripples',i,depth);x.lineWidth=deepLw(i,base,Math.max(0.9,3-i*0.2));x.globalAlpha=i>base?deepAlpha(i,base):1;
    p=newPath();
    if(p){p.arc(W/2,H/2,step*i,0,Math.PI*2);x.stroke(p)}
    else{x.beginPath();x.arc(W/2,H/2,step*i,0,Math.PI*2);x.stroke()}
  }
}
function drawApol(x,W,H,rec,onlyNew){
  var depth=rec.depth||0,cs,prev,sc=Math.min(W,H)*0.46,cx=W/2,cy=H/2,i,c,r,base=baseCap('apollonian'),seen={},k;
  if(typeof IL154!=='object'||typeof IL154.gasket!=='function')return;
  cs=IL154.gasket(depth);
  if(onlyNew&&depth>0){
    prev=IL154.gasket(depth-1);
    for(i=0;i<prev.length;i++){c=prev[i];seen[c.k.toFixed(4)+','+c.x.toFixed(4)+','+c.y.toFixed(4)]=1}
  }
  for(i=0;i<cs.length;i++){
    c=cs[i];k=c.k.toFixed(4)+','+c.x.toFixed(4)+','+c.y.toFixed(4);
    if(onlyNew&&seen[k])continue;
    r=Math.abs(1/c.k)*sc;
    x.globalAlpha=deepAlpha(depth,base);
    x.strokeStyle=ink('apollonian',i?1:0,Math.max(1,depth));
    x.lineWidth=c.k<0?2.2:Math.max(0.6,2-Math.log(c.k+1)*0.35);
    x.beginPath();x.arc(cx+c.x*sc,cy-c.y*sc,r,0,Math.PI*2);x.stroke();
    if(c.k>0&&r>14){
      x.fillStyle=I;x.font=Math.max(9,Math.min(16,r*0.55))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
    }
  }
}

/* ---- point fractals: log-density ImageData ---- */
function rgbOf(col){
  col=String(col||GOLD);
  if(col[0]==='#'&&col.length>=7)return[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
  return[230,180,84];
}
function stamp(buf,W,H,px,py,rad){
  var r=Math.max(1,rad||1),x0=Math.max(0,Math.floor(px-r)),x1=Math.min(W-1,Math.ceil(px+r));
  var y0=Math.max(0,Math.floor(py-r)),y1=Math.min(H-1,Math.ceil(py+r)),ix,iy,dx,dy,w,idx,rr=r*r;
  for(iy=y0;iy<=y1;iy++){
    dy=iy+0.5-py;
    for(ix=x0;ix<=x1;ix++){
      dx=ix+0.5-px;w=dx*dx+dy*dy;
      if(w<=rr){idx=iy*W+ix;buf[idx]+=1-w/(rr+0.0001);if(buf[idx]>stamp._max)stamp._max=buf[idx]}
    }
  }
}
function putLogDensity(x,W,H,pts,col,alphaMul,rad){
  var buf=new Float32Array(W*H),i,max,img,d,r,g,b,u,a,logm,rgb=rgbOf(col);
  r=rgb[0];g=rgb[1];b=rgb[2];alphaMul=alphaMul==null?1:alphaMul;rad=rad==null?1.6:rad;
  stamp._max=0;
  for(i=0;i<pts.length;i++) stamp(buf,W,H,pts[i][0],pts[i][1],typeof pts[i][2]==='number'?pts[i][2]:rad);
  max=stamp._max;

  img=x.getImageData(0,0,W,H);d=img.data;logm=Math.log(1+Math.max(1,max));
  for(i=0;i<buf.length;i++){
    if(!buf[i])continue;
    u=Math.log(1+buf[i])/logm;
    a=Math.max(0,Math.min(255,Math.round(255*Math.pow(u,0.85)*alphaMul)));
    d[i*4]=r;d[i*4+1]=g;d[i*4+2]=b;d[i*4+3]=Math.max(d[i*4+3],a);
  }
  x.putImageData(img,0,0);
}
function sunPts(W,H,rec){
  var n=sunN(rec.depth||0),phi=rec.angle||GOLDANG,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th,pts=new Array(n);
  if(Math.abs(phi-137.5)<0.8||Math.abs(phi-GOLDANG)<0.8)phi=GOLDANG;
  for(i=0;i<n;i++){r=c*Math.sqrt(i);th=i*phi*Math.PI/180;pts[i]=[W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.4,3.1-i/n*1.5)]}
  return pts;
}
function chaosPts(W,H,rec){
  var depth=rec.depth||0,N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=0.5,s=(rec.seed||109)>>>0,i,v=[],ang,p,j,last=-1,w=Math.min(W,H)*0.42,same,pts=new Array(N);
  if(typeof IL154==='object'&&typeof IL154.jumpOf==='function')fr=IL154.jumpOf(rec.angle);
  else if(Math.round(rec.angle||50)===33)fr=1/3;
  else if(Math.round(rec.angle||50)===38)fr=1/((1+Math.sqrt(5))/2)/((1+Math.sqrt(5))/2);
  else if((rec.angle||0)>=30&&(rec.angle||0)<=55)fr=(rec.angle||50)/100;
  same=poly===4&&Math.abs(fr-0.5)<1e-9;
  function rnd1(){s=(1664525*s+1013904223)>>>0;return s/4294967296}
  for(i=0;i<poly;i++){ang=-Math.PI/2+i*2*Math.PI/poly;v.push({x:W/2+Math.cos(ang)*w,y:H/2+Math.sin(ang)*w})}
  p={x:W/2,y:H/2};
  for(i=0;i<N;i++){
    j=Math.floor(rnd1()*poly);
    if(same&&j===last)j=(j+1+Math.floor(rnd1()*(poly-1)))%poly;
    last=j;p.x+=(v[j].x-p.x)*fr;p.y+=(v[j].y-p.y)*fr;
    pts[i]=[p.x,p.y];
  }
  return pts;
}
function fernPtsOf(rec,n){
  if(typeof IL149==='object'&&typeof IL149.fernPts==='function')return IL149.fernPts(rec.seed||109,n);
  if(typeof IL150==='object'&&typeof IL150.fernPts==='function')return IL150.fernPts(rec.seed||109,n);
  var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
  var rnd=(function(s){s=s>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}})(rec.seed||109);
  var pts=new Float32Array(n*2),x=0,y=0,i,k,r,a,nx,ny;
  for(i=0;i<n;i++){r=rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];nx=a[0]*x+a[1]*y+a[4];ny=a[2]*x+a[3]*y+a[5];x=nx;y=ny;pts[i*2]=x;pts[i*2+1]=y}
  return pts;
}
function fernXY(W,H,raw){
  var n=(raw.length/2)|0,pts=new Array(n),i;
  for(i=0;i<n;i++)pts[i]=[W*(0.5+raw[i*2]*0.18),H*(0.92-raw[i*2+1]*0.082)];
  return pts;
}
function drawPoints(x,W,H,rec,sh){
  var pts,base=baseCap(sh),a=deepAlpha(rec.depth||0,base),col=ink(sh,rec.depth||0,Math.max(1,rec.depth||0));
  bg(x,W,H);
  if(sh==='sunflower')pts=sunPts(W,H,rec);
  else if(sh==='chaos')pts=chaosPts(W,H,rec);
  else pts=fernXY(W,H,fernPtsOf(rec,Math.max(0,(rec.depth||0)*4000)));
  putLogDensity(x,W,H,pts,col,a);
}

var REPLACE={koch:1,levy:1,dragon:1,hilbert:1,triangle:1,pythagoras:1,pascal:1,hexrings:1,ripples:1,sunflower:1,chaos:1,fern:1};
var ADDITIVE={tree:1,antler:1,htree:1,spirals:1,apollonian:1};

function paintLevel(cv,rec,level){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,sh=rec.shape,slice={};
  for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))slice[k]=rec[k];
  slice.depth=level;
  x.setTransform(1,0,0,1,0,0);
  if(REPLACE[sh]){
    if(sh==='sunflower'||sh==='chaos'||sh==='fern'){drawPoints(x,W,H,slice,sh);x.globalAlpha=1;return}
    bg(x,W,H);
    if(sh==='koch')drawKoch(x,W,H,slice);
    else if(sh==='levy'||sh==='dragon'){
      var pts=levyPts(W,H,level,sh),p=pathFromPts(pts);
      x.strokeStyle=sh==='levy'?ink('levy',level,level):pal(rec,0);
      x.lineWidth=deepLw(level,baseCap(sh),sh==='dragon'?Math.max(1.2,3-level*0.3):Math.max(0.9,2.8-level*0.18));
      x.globalAlpha=deepAlpha(level,baseCap(sh));
      if(p)x.stroke(p);else{x.beginPath();pts.forEach(function(pt,i){i?x.lineTo(pt.x,pt.y):x.moveTo(pt.x,pt.y)});x.stroke()}
    }else if(sh==='hilbert')drawHil(x,W,H,slice);
    else if(sh==='triangle')drawTri(x,W,H,slice);
    else if(sh==='pythagoras')drawPyth(x,W,H,slice);
    else if(sh==='pascal')drawPas(x,W,H,slice);
    else if(sh==='hexrings')drawHex(x,W,H,slice);
    else if(sh==='ripples')drawRip(x,W,H,slice);
  }else if(ADDITIVE[sh]){
    if(sh==='tree'||sh==='antler')drawTreeLike(x,W,H,slice,sh,level);
    else if(sh==='htree')drawHLevel(x,W,H,slice,level);
    else if(sh==='spirals')drawSpiralLevel(x,W,H,slice,level);
    else if(sh==='apollonian')drawApol(x,W,H,slice,true);
  }
  x.globalAlpha=1;
}

function ensureBase(cv,rec,base,prev){
  var key=recKey(rec,cv.width,cv.height),copy,k;
  if(cache&&cache.key===key&&cache.sh===rec.shape&&cache.depth>=base&&cache.depth<=(rec.depth||0)){
    blitCache(cv);
    return cache.depth;
  }
  copy={};
  for(k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))copy[k]=rec[k];
  copy.depth=base;copy._rest=0;
  prev(cv,copy);
  saveCache(cv,copy);
  return base;
}

function addLevelsSync(cv,rec,from,to){
  var L,from2=from;
  if(cache&&cache.key===recKey(rec,cv.width,cv.height)&&cache.depth>=from&&cache.depth<to){
    blitCache(cv);from2=cache.depth;
  }
  for(L=from2+1;L<=to;L++){
    if(REPLACE[rec.shape]||L===from2+1){/* replacement redraws the whole figure */}
    if(ADDITIVE[rec.shape]&&L>from2+1){/* already on canvas */}
    paintLevel(cv,rec,L);
    try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=L;saveCache(cv,c)}catch(ex){}
  }
}

function addLevelsSliced(cv,rec,from,to,done){
  var my=++tok,L=from;
  if(cache&&cache.key===recKey(rec,cv.width,cv.height)&&cache.depth>=from&&cache.depth<to){
    blitCache(cv);L=cache.depth;
  }
  function step(){
    if(tok!==my)return;
    var t0=performance.now();
    do{
      L++;
      if(L>to){try{saveCache(cv,rec)}catch(ex){}if(done)done();return}
      paintLevel(cv,rec,L);
      try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=L;saveCache(cv,c)}catch(ex){}
    }while(performance.now()-t0<SLICE&&L<to);
    if(L<to)requestAnimationFrame(step);
    else{try{saveCache(cv,rec)}catch(ex){}if(done)done()}
  }
  requestAnimationFrame(step);
}

function hookStep(){
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g._rest)return prev.apply(this,arguments);
      if(g&&g.shape){
        var cap=capOf(g.shape),base=baseCap(g.shape);
        if((g.depth||0)>=cap){
          g.msg=t('That is as far as this seed grows.');
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        if((g.depth||0)>=base){
          g.depth=(g.depth||0)+1;
          if(g.depth>=cap)g.msg=t('That is as far as this seed grows.');
          else if(g.msg&&/as far as this seed grows/i.test(g.msg))g.msg='';
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
      }
      return prev.apply(this,arguments);
    };
  });
}
function hookDraw(){
  hookStep();
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!cv)return prev.apply(this,arguments);
      layout(cv);
      if(rec._rest){cancelWork();return prev.apply(this,arguments)}
      var sh=rec.shape,depth=rec.depth||0,base=baseCap(sh),t0,r,from;
      if(depth<=base){
        cancelWork();
        t0=(typeof performance!=='undefined'&&performance.now)?performance.now():0;
        r=prev.apply(this,arguments);
        if(t0)noteTime(depth,((typeof performance!=='undefined'&&performance.now)?performance.now():t0)-t0);
        try{saveCache(cv,rec)}catch(ex){}
        return r;
      }
      from=ensureBase(cv,rec,base,prev);
      if(rd()){addLevelsSync(cv,rec,from,depth);return}
      cancelWork();
      addLevelsSliced(cv,rec,from,depth);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments),cv;
      try{
        cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
        if(cv&&layout(cv)&&typeof patGrowDrawOn106==='function'){
          var g=grow();
          if(g)patGrowDrawOn106(cv,g);
        }
      }catch(ex){}
      return r;
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{if(id==='patterns'){layout();}}catch(ex){}
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){cancelWork();cache=null}
      return prev.apply(this,arguments);
    };
  });
}

function onResize(){
  if(resizeT)clearTimeout(resizeT);
  resizeT=setTimeout(function(){
    try{
      var el=document.getElementById('patterns');
      if(!el||(el.hidden===true))return;
      var g=grow(),cv=document.getElementById('patGrowCv');
      if(!cv||!g)return;
      cache=null;
      if(typeof patGrowDraw106==='function')patGrowDraw106();
    }catch(ex){}
  },80);
}

function install(){
  if(install._on)return;install._on=1;
  css();
  loadSpeed();
  if(typeof IL156==='object'&&typeof IL156.copies==='function')copies0=IL156.copies;
  else if(typeof IL154==='object'&&typeof IL154.copies==='function')copies0=IL154.copies;
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'&&!IL150.capOf._v169){
    var c0=IL150.capOf;IL150.capOf=function(sh){return capOf(sh)};IL150.capOf._v169=1;IL150.capOf._base=c0._base||c0;
  }
  if(typeof IL154==='object'){IL154.capOf=capOf;IL154.sunN=sunN;IL154.copies=copies}
  if(typeof IL155==='object'){IL155.copies=copies}
  if(typeof IL156==='object'){IL156.capOf=capOf;IL156.copies=copies}
  if(typeof IL157==='object'){IL157.capOf=capOf;IL157.copies=copies}
  hookDraw();
  try{root.addEventListener('resize',onResize);root.addEventListener('orientationchange',onResize)}catch(ex){}
}
root.IL169={version:169,capOf:capOf,baseCap:baseCap,copies:copies,sunN:sunN,layout:layout,pieceSize:pieceSize,SPEED_KEY:SPEED_KEY,devicePx:devicePx,cssSize:cssSize,isPhone:isPhone,install:install,
  notes:'Pinch-zoom tiles and WebGL are deferred to a later pass. v169 uses a pixel-budget cap, offscreen + Path2D new-level draws, 6ms slices, a first-two-levels speed test in localStorage, thinner/lower-alpha deep lines, and log-density ImageData for chaos, sunflower, and fern.'};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
