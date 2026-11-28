/* v171: fix QA v170 fails and Pi's v170 recheck. v170.js stays frozen.
   QA: skipDragonUn is cleared only when the grow job finishes or cancel()
      runs. In-flight v149 unveils are blocked so a stepped 6→7 or 6→8
      Dragon matches a sync depth-8 draw. Time-slice unsliced base drawers
      (Koch, paintApolSync, heavy Pythagoras). Budget batches by device
      pixels so DPR 2 stays under 50 ms. Yield a frame between rapid
      patGrowStep106() calls. Reduced motion stays on the sync path.
   Pi: sunflower line uses the measured arms table and is refreshed on
      every level; extras use the base newest-level colour and alpha 1 on
      full-redraw shapes; gallery thumbs do not call layout() or share
      tok/cache/skip; Pythagoras jars count leaves; levyPtsStep accumulates
      with concat; IL154.paintCount uses the fixed key.
   A sideways phone (513 CSS px) keeps its +2 levels. No show() wrap.
   Lamp effects drop-in is not included. */
(function(root){
'use strict';
var GOLD='#E6B454',I='#72583f',CR='#fff8ec',NK='#0d0f1a';
var SLICE=6,HARD=2,MINCSS=1.5,tok=0,cache=null,gasketMemo={},skipDragonUn=0,resizeT=0,paintOwn=0,guardOn=0,coolTok=0,stepBusy=0,stepRaf=0,pendingDraw=0,lastFullAt=0,workOpen=0;
var GOLDANG=360*(1-1/((1+Math.sqrt(5))/2));
var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
var SHR=[0.68,0.66,0.70,2/3];
var REPLACE={koch:1,levy:1,dragon:1,hilbert:1,triangle:1,pythagoras:1,pascal:1,hexrings:1,ripples:1,sunflower:1,chaos:1,fern:1};
var SPEED_KEY='lamp_gaf_speed169';
var lastChrome=null;
var CAP_EN='That is as far as this seed grows.',REST_EN='It found its rest.';
var CAP_ES='Hasta aquí llega esta semilla.',REST_ES='Encontró su descanso.';

function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
var probingRd=0;
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function userReduced(){probingRd=1;try{return rd()}finally{probingRd=0}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v171)return;var next=wrap(prev);next._v171=1;next._base=prev._base||prev;root[name]=next}
function baseCap(sh){return(typeof IL169==='object'&&typeof IL169.baseCap==='function')?IL169.baseCap(sh):6}
function sunN(d){return(typeof IL169==='object'&&typeof IL169.sunN==='function')?IL169.sunN(d):(typeof IL154==='object'&&typeof IL154.sunN==='function')?IL154.sunN(d):1}
function ink(sh,d,depth){return(typeof IL154==='object'&&typeof IL154.ink==='function')?IL154.ink(sh,d,depth):GOLD}
function dpr(){return Math.max(1,Math.min(2,root.devicePixelRatio||1))}
function cssSize(){if(typeof IL169==='object'&&typeof IL169.cssSize==='function')return IL169.cssSize();var w=root.innerWidth||1280;return Math.max(360,Math.min(720,Math.round(w*0.55)))}
function devicePx(){if(typeof IL169==='object'&&typeof IL169.devicePx==='function')return IL169.devicePx();return Math.round(cssSize()*dpr())}
function compactCanvas(){return cssSize()<=360}
function minPx(){return MINCSS*dpr()}
function layout(cv){if(typeof IL169==='object'&&typeof IL169.layout==='function')return IL169.layout(cv);return false}
/* Deep extras must stay at least as visible as the base: alpha ≥ 0.85, lw ≥ 1 device px. */
function deepAlpha(level,base){var e=Math.max(0,level-base);return e<=0?1:e===1?0.92:0.85}
function deepLw(level,base,raw){var e=Math.max(0,level-base),s=e<=0?1:e===1?0.85:0.75;return Math.max(1,raw*s)}
function bg(x,W,H){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function recKey(rec,W,H){return[rec.shape,rec.angle,rec.pal,rec.season,rec.poly,rec.seed,W,H,night()?'n':'d'].join('|')}
function cancel(){tok++;skipDragonUn=0;if(workOpen){workOpen=0;busyDown()}}
function pathBudget(){
  var S=Math.max(1,devicePx());
  if(S>=1400)return 16;
  if(S>=900)return 24;
  return 48;
}
function stampN(){
  var S=Math.max(1,devicePx());
  return S>=900?8:16;
}
function putRows(){
  var S=Math.max(1,devicePx());
  if(S>=1400)return 24;
  if(S>=900)return 32;
  return 48;
}
function itemN(){
  var S=Math.max(1,devicePx());
  return S>=900?8:16;
}
function bgRows(){
  var S=Math.max(1,devicePx());
  if(S>=1400)return 128;
  if(S>=900)return 128;
  return 256;
}
function bgStep(job,t0){
  var x=job.x,W=job.W,H=job.H,rows,y1,u=0,cap=unitCap('bg');
  if(job._bg)return true;
  if(job._bgY==null){
    if(typeof x.reset==='function'){x.reset();x._v171g=0;wrapCv(x.canvas)}
    job._bgY=0;
  }
  /* Re-assert the fill on every slice: the shared 2d context can be
     restyled by another rAF between yields, and leftover rows would
     otherwise paint the wrong colour. A stale clip from prev() would
     also leave a halo, so the first slice resets the context. */
  x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';
  x.shadowBlur=0;x.shadowOffsetX=0;x.shadowOffsetY=0;x.shadowColor='rgba(0,0,0,0)';
  if(typeof x.filter==='string')x.filter='none';
  x.fillStyle=night()?NK:CR;x.lineCap='round';x.lineJoin='round';
  rows=bgRows();
  while(job._bgY<H){
    y1=Math.min(H,job._bgY+rows);
    x.fillRect(0,job._bgY,W,y1-job._bgY);
    job._bgY=y1;u++;
    if((u>=cap||timedOut(t0))&&job._bgY<H)return false;
  }
  job._bg=1;return true;
}
/* Canvas strokes are often recorded cheaply and rasterized at the end of the
   turn. At DPR 2 a 6 ms now() slice can still dump a 50–150 ms long task, so
   also cap work units per turn by backing size. */
function unitCap(kind){
  var S=Math.max(1,devicePx());
  if(S>=1400){
    if(kind==='path')return 2;
    if(kind==='item')return 8;
    if(kind==='stamp')return 800;
    if(kind==='put')return 2;
    if(kind==='bg')return 8;
    return 4;
  }
  if(S>=900){
    if(kind==='path')return 2;
    if(kind==='item')return 12;
    if(kind==='stamp')return 800;
    if(kind==='put')return 2;
    if(kind==='bg')return 8;
    return 8;
  }
  if(kind==='path')return 4;
  if(kind==='item')return 16;
  if(kind==='stamp')return 400;
  if(kind==='put')return 3;
  if(kind==='bg')return 8;
  return 16;
}
function armGuard(cv){
  skipDragonUn=1;guardOn=1;coolTok++;
  wrapCv(cv);
}
function dropGuard(){coolTok++;guardOn=0;skipDragonUn=0}
function startCool(){
  var my=++coolTok,n=40;
  (function later(){if(coolTok!==my)return;n--;if(n<=0){if(coolTok===my)guardOn=0;return}requestAnimationFrame(later)})();
}
function jobDone(){skipDragonUn=0;startCool();busyDown()}
function busyUp(){root.__gafBusy=(root.__gafBusy||0)+1}
function busyDown(){root.__gafBusy=Math.max(0,(root.__gafBusy||1)-1)}
function wrapCv(cv){
  if(!cv)return;
  var x;
  try{x=cv.getContext('2d')}catch(ex){return}
  if(!x||x._v171g)return;
  var put=x.putImageData,fill=x.fillRect,draw=x.drawImage,clr=x.clearRect;
  function blocked(){return guardOn&&!paintOwn}
  x.putImageData=function(){if(blocked())return;return put.apply(this,arguments)};
  x.fillRect=function(){if(blocked())return;return fill.apply(this,arguments)};
  x.drawImage=function(){if(blocked())return;return draw.apply(this,arguments)};
  x.clearRect=function(){if(blocked())return;return clr.apply(this,arguments)};
  x._v171g=1;
}
function own(fn){paintOwn++;try{return fn()}finally{paintOwn--}}
function sliceBase(sh){return sh==='koch'||sh==='apollonian'||sh==='pythagoras'||sh==='hilbert'}
var ADDITIVE={tree:1,antler:1,htree:1,spirals:1};
function timedOut(t0){return performance.now()-t0>=SLICE}
function speedExtra(){
  try{
    var s=root.localStorage&&localStorage.getItem(SPEED_KEY);if(!s)return HARD;
    var o=JSON.parse(s);if(!o||!isFinite(o.t1)||!isFinite(o.t2))return HARD;
    var sum=+o.t1+ +o.t2;if(sum>48)return 0;if(sum>24)return 1;return HARD;
  }catch(ex){return HARD}
}

function saveCache(cv,rec){
  try{
    var oc=(cache&&cache.canvas)?cache.canvas:null;
    if(!oc||oc.width!==cv.width||oc.height!==cv.height){
      oc=document.createElement('canvas');oc.width=cv.width;oc.height=cv.height;
    }
    oc.getContext('2d').drawImage(cv,0,0);
    cache={canvas:oc,key:recKey(rec,cv.width,cv.height),depth:rec.depth||0,sh:rec.shape};
  }catch(ex){cache=null}
}
function blitCache(cv){
  if(!cache||!cache.canvas)return false;
  var x=cv.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cache.canvas,0,0);return true;
}
function offCanvas(W,H){
  var c=document.createElement('canvas');c.width=W;c.height=H;
  var x=c.getContext('2d');x.lineCap='round';x.lineJoin='round';
  return{c:c,x:x};
}
function blitOff(x,W,H,off,alpha){
  bg(x,W,H);x.globalAlpha=alpha==null?1:alpha;x.drawImage(off.c,0,0);x.globalAlpha=1;
}

/* ---- Pi: messages, resize, fibArms, caps, copies ---- */
function capMsgList(){
  var a=t(CAP_EN),b=t(REST_EN),list=[CAP_EN,REST_EN,CAP_ES,REST_ES];
  if(a&&list.indexOf(a)<0)list.push(a);
  if(b&&list.indexOf(b)<0)list.push(b);
  return list;
}
function isCapOrRest(s){
  if(!s)return false;
  var list=capMsgList(),i;
  for(i=0;i<list.length;i++)if(list[i]&&s.indexOf(list[i])>=0)return true;
  return false;
}
function scrubGrow(g){
  if(!g||!g.shape)return false;
  var cap=capOf(g.shape),changed=false;
  if((g.depth||0)>cap){g.depth=cap;changed=true}
  if((g.depth||0)<cap&&isCapOrRest(g.msg)){g.msg='';changed=true}
  return changed;
}
function syncMsg(g){
  var el=document.getElementById('patGrowMsg');
  if(!el)return;
  el.textContent=(g&&g.msg)?g.msg:'';
}
var FIB_ARMS={89:[13,21],144:[13,21],233:[21,34],377:[34,55],610:[34,55],987:[55,89]};
function fibArmsFromLayout(n){
  n=Math.max(2,n|0);
  var phi=GOLDANG*Math.PI/180,pts=[],i,j,r,th,k,hist={},best1=0,best2=0,c1=0,c2=0,d,bd,dx,dy,start,a,b;
  for(i=0;i<n;i++){r=Math.sqrt(i);th=i*phi;pts.push([r*Math.cos(th),r*Math.sin(th)])}
  start=Math.max(0,n-Math.max(21,Math.floor(n/4)));
  for(i=start;i<n;i++){
    bd=1e9;k=0;
    for(j=0;j<n;j++)if(j!==i){
      dx=pts[i][0]-pts[j][0];dy=pts[i][1]-pts[j][1];d=dx*dx+dy*dy;
      if(d<bd){bd=d;k=Math.abs(i-j)}
    }
    if(k)hist[k]=(hist[k]||0)+1;
  }
  for(k in hist){
    if(hist[k]>c1){c2=c1;best2=best1;c1=hist[k];best1=+k}
    else if(hist[k]>c2){c2=hist[k];best2=+k}
  }
  if(best1>best2){a=best2;b=best1}else{a=best1;b=best2}
  if(!a||!b)return null;
  return{a:a,b:b};
}
function fibArms(n){
  n=n|0;
  if(FIB_ARMS[n])return{a:FIB_ARMS[n][0],b:FIB_ARMS[n][1]};
  var m=fibArmsFromLayout(n);
  if(m)return m;
  var f=[1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987],i;
  for(i=2;i<f.length;i++){
    if(f[i]===n)return{a:f[i-2],b:f[i-1]};
    if(f[i]>n)return{a:f[Math.max(0,i-2)],b:f[i-1]};
  }
  return{a:f[f.length-3],b:f[f.length-2]};
}
function isGoldSun(g){
  var ang=g&&g.angle||0;
  return Math.abs(ang-137.5)<0.6||Math.abs(ang-GOLDANG)<0.8;
}
function refreshMsg(g){
  if(!g||!g.shape)return;
  var cap=capOf(g.shape,g),line,fa,atCap=(g.depth||0)>=cap&&!g._rest;
  if(g.shape==='sunflower'&&(g.depth||0)>0&&!g._rest){
    if(isGoldSun(g)){
      fa=fibArms(copies(g));
      line=t('The spirals you can count: {a} and {b}.',{a:String(fa.a),b:String(fa.b)})+' '+t('At this turn the seeds pack tight.');
    }else if(Math.abs((g.angle||0)-135)<0.6)line=t('At this turn they line up in spokes.');
    if(line){
      if(atCap){var capLine=t(CAP_EN);g.msg=line.indexOf(capLine)<0?line+' '+capLine:line}
      else g.msg=line;
      return;
    }
  }
  if(atCap&&!isCapOrRest(g.msg))g.msg=t(CAP_EN);
  else if(!atCap&&isCapOrRest(g.msg))g.msg='';
}
function pythCount(rec,S){
  rec=rec||{};
  var depth=Math.max(0,rec.depth||0),ang=(rec.angle||28)*Math.PI/180,n=0,base=baseCap('pythagoras'),s0;
  S=S||devicePx();
  s0=S*0.16;
  /* Count leaves: drawn squares that have no drawn child. */
  if(depth<=base){
    (function sq(px,py,s,a,d){
      if(d>depth||s<2)return 0;
      var sl,sr,c,si,x2,y2,x3,y3,x4,y4,left=0,right=0;
      if(d<depth){
        sl=s*Math.cos(ang);sr=s*Math.sin(ang);
        c=Math.cos(a);si=Math.sin(a);
        x2=px+c*s;y2=py+si*s;x3=x2-si*s;y3=y2+c*s;x4=px-si*s;y4=py+c*s;
        left=sq(x4,y4,sl,a+ang,d+1);right=sq(x3,y3,sr,a+ang-Math.PI/2,d+1);
      }
      if(!left&&!right)n++;
      return 1;
    })(S/2-s0/2,S*0.86,s0,-Math.PI/2,0);
  }else{
    (function sq(px,py,s,a,d){
      if(d>depth||s<0.8)return 0;
      var sl,sr,bL,x2,y2,ax,ay,left=0,right=0;
      if(d<depth){
        sl=s*Math.cos(ang);sr=s*Math.sin(ang);bL=a+Math.PI/2-ang;
        x2=px+Math.cos(a)*s;y2=py+Math.sin(a)*s;
        ax=x2+Math.cos(bL)*sl;ay=y2+Math.sin(bL)*sl;
        left=sq(x2,y2,sl,a-ang,d+1);right=sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
      }
      if(!left&&!right)n++;
      return 1;
    })(S/2-s0/2,S*0.86,s0,-Math.PI/2,0);
  }
  return n;
}
function pieceSize(sh,next,S,rec){
  var d=Math.max(1,next|0),a,b,ang;
  if(sh==='tree'||sh==='antler')return S*0.22*Math.pow(0.68,d);
  if(sh==='pythagoras'){
    ang=(rec&&isFinite(rec.angle)?rec.angle:28);
    a=Math.abs(Math.cos(ang*Math.PI/180));b=Math.abs(Math.sin(ang*Math.PI/180));
    return S*0.16*Math.pow(Math.min(a,b),d);
  }
  if(sh==='dragon'||sh==='levy')return(S*0.5)/Math.pow(Math.SQRT2,d);
  if(sh==='koch')return(S*0.82)/Math.pow(3,d);
  if(sh==='hilbert')return(S*0.84)/Math.max(1,(1<<d)-1);
  if(sh==='htree')return S*0.22*Math.pow(0.707,d);
  if(sh==='spirals')return(S*0.28*Math.pow(0.32,d))/2;
  if(sh==='triangle')return(S*0.8)/Math.pow(2,d);
  if(sh==='hexrings')return(S/2)/(d+1+0.6);
  if(sh==='ripples')return(S/2)/Math.max(1,d);
  if(sh==='sunflower')return S*0.42/Math.sqrt(Math.max(1,sunN(d)));
  if(sh==='chaos')return S/Math.sqrt(Math.max(1,d*800));
  if(sh==='fern')return S/Math.sqrt(Math.max(1,d*4000));
  if(sh==='apollonian')return apolMinR(d,S);
  if(sh==='pascal')return S/Math.max(2,d+2);
  return S/Math.pow(2,d);
}
function capOf(sh,rec){
  var b=baseCap(sh);
  if(compactCanvas())return b;
  var S=devicePx(),extra=0,maxE=Math.min(HARD,speedExtra()),d;
  for(d=1;d<=maxE;d++){
    if(pieceSize(sh,b+d,S,rec)+1e-12>=minPx())extra=d;
    else break;
  }
  return b+extra;
}
function copies(rec){
  rec=rec||{};
  var sh=rec.shape,cap=capOf(sh,rec),d=Math.max(0,Math.min(cap,rec.depth||0));
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
  if(sh==='pythagoras')return pythCount({shape:sh,depth:d,angle:rec.angle},devicePx());
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='antler')return Math.pow(2,d);
  if(sh==='apollonian')return rawGasket(d).length;
  if(typeof IL169==='object'&&IL169.copies&&!IL169.copies._v170){
    /* fall through only if we somehow missed a shape; do not recurse */
  }
  return Math.pow(2,d);
}

/* ---- polyline / segment stroke in batches onto an opaque-AA offscreen ---- */
function strokePtsChunk(ox,pts,i,budget,style){
  if(i>=pts.length-1)return i;
  ox.strokeStyle=style.stroke;ox.lineWidth=style.lw;
  if(style.alpha!=null)ox.globalAlpha=style.alpha;
  var p=typeof Path2D==='function'?new Path2D():null,end=Math.min(pts.length-1,i+budget),j;
  if(p){p.moveTo(pts[i].x,pts[i].y);for(j=i+1;j<=end;j++)p.lineTo(pts[j].x,pts[j].y);ox.stroke(p)}
  else{ox.beginPath();ox.moveTo(pts[i].x,pts[i].y);for(j=i+1;j<=end;j++)ox.lineTo(pts[j].x,pts[j].y);ox.stroke()}
  return end;
}
function strokeSegsChunk(ox,segs,i,budget,style){
  if(i>=segs.length)return i;
  ox.strokeStyle=style.stroke;ox.lineWidth=style.lw;
  if(style.alpha!=null)ox.globalAlpha=style.alpha;
  var p=typeof Path2D==='function'?new Path2D():null,end=Math.min(segs.length,i+budget),j,s;
  if(p){for(j=i;j<end;j++){s=segs[j];p.moveTo(s[0],s[1]);p.lineTo(s[2],s[3])}ox.stroke(p)}
  else{ox.beginPath();for(j=i;j<end;j++){s=segs[j];ox.moveTo(s[0],s[1]);ox.lineTo(s[2],s[3])}ox.stroke()}
  return end;
}

function levyFit(pts,W,H){
  var i,minx=pts[0].x,miny=pts[0].y,maxx=pts[0].x,maxy=pts[0].y,bw,bh,sc,ox,oy,pad=10,p,out=new Array(pts.length);
  for(i=1;i<pts.length;i++){
    p=pts[i];if(p.x<minx)minx=p.x;if(p.y<miny)miny=p.y;if(p.x>maxx)maxx=p.x;if(p.y>maxy)maxy=p.y;
  }
  bw=Math.max(1e-6,maxx-minx);bh=Math.max(1e-6,maxy-miny);
  sc=Math.min((W-2*pad)/bw,(H-2*pad)/bh);
  ox=W/2-sc*(minx+maxx)/2;oy=H/2-sc*(miny+maxy)/2;
  for(i=0;i<pts.length;i++)out[i]={x:pts[i].x*sc+ox,y:pts[i].y*sc+oy};
  return out;
}
function levyPtsStep(st,t0){
  var i,next,a,b,dx,dy,sign,n;
  if(!st.pts){
    if(st.kind==='dragon')st.pts=[{x:st.W*0.22,y:st.H*0.55},{x:st.W*0.78,y:st.H*0.55}];
    else st.pts=[{x:0,y:0},{x:1,y:0}];
    st.k=0;
  }
  while(st.k<st.depth){
    next=[];n=st.pts.length-1;
    for(i=st.i||0;i<n;i++){
      a=st.pts[i];b=st.pts[i+1];dx=b.x-a.x;dy=b.y-a.y;
      if(st.kind==='dragon'){sign=i%2===0?1:-1;next.push(a,{x:a.x+dx/2-sign*dy/2,y:a.y+dy/2+sign*dx/2})}
      else next.push(a,{x:(a.x+b.x)/2-(b.y-a.y)/2,y:(a.y+b.y)/2+(b.x-a.x)/2});
      if((i&15)===15&&timedOut(t0)){st.i=i+1;st._acc=(st._acc||[]).concat(next);return false}
    }
    next=st._acc?st._acc.concat(next):next;
    next.push(st.pts[st.pts.length-1]);st.pts=next;st._acc=null;st.i=0;st.k++;
    if(timedOut(t0)&&st.k<st.depth)return false;
  }
  if(st.kind!=='dragon'&&!st._fitted){st.pts=levyFit(st.pts,st.W,st.H);st._fitted=1}
  return true;
}

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
function kochSegs(W,H,depth){
  var s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2,segs=[];
  function side(ax,ay,bx,by,d){
    if(!d){segs.push([ax,ay,bx,by]);return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);
  return segs;
}
function rgbOf(col){
  col=String(col||GOLD);
  if(col[0]==='#'&&col.length>=7)return[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
  return[230,180,84];
}
function stamp(buf,W,H,px,py,rad,st){
  var r=Math.max(1,rad||1),x0=Math.max(0,Math.floor(px-r)),x1=Math.min(W-1,Math.ceil(px+r));
  var y0=Math.max(0,Math.floor(py-r)),y1=Math.min(H-1,Math.ceil(py+r)),ix,iy,dx,dy,w,idx,rr=r*r;
  for(iy=y0;iy<=y1;iy++){
    dy=iy+0.5-py;
    for(ix=x0;ix<=x1;ix++){
      dx=ix+0.5-px;w=dx*dx+dy*dy;
      if(w<=rr){idx=iy*W+ix;buf[idx]+=1-w/(rr+0.0001);if(buf[idx]>st.max)st.max=buf[idx]}
    }
  }
}

/* ---- Apollonian gasket, v155 algorithm with −0 keys normalised ---- */
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return{x:a,y:b};
}
function tangent(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  var ext=Math.abs(dist-(r1+r2)),inn=Math.abs(dist-Math.abs(r1-r2));
  return{ok:ext<=eps||inn<=eps,res:Math.min(ext,inn)};
}
function overlaps(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  return dist<r1+r2-eps&&dist>Math.abs(r1-r2)+eps;
}
function solutions(c1,c2,c3){
  var k1=c1.k,k2=c2.k,k3=c3.k,rad=k1*k2+k1*k3+k2*k3,out=[],sk,sz,k4,kr,sr,si,rt,c;
  for(sk=1;sk>=-1;sk-=2){
    k4=k1+k2+k3+sk*2*Math.sqrt(Math.max(0,rad));
    if(!isFinite(k4)||Math.abs(k4)<1e-8)continue;
    kr=Math.round(k4);if(kr===0)continue;
    sr=k1*k2*(c1.x*c2.x-c1.y*c2.y)+k1*k3*(c1.x*c3.x-c1.y*c3.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y);
    si=k1*k2*(c1.x*c2.y+c1.y*c2.x)+k1*k3*(c1.x*c3.y+c1.y*c3.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x);
    rt=csqrt(sr,si);
    for(sz=1;sz>=-1;sz-=2){
      c={k:kr,x:(k1*c1.x+k2*c2.x+k3*c3.x+sz*2*rt.x)/kr,y:(k1*c1.y+k2*c2.y+k3*c3.y+sz*2*rt.y)/kr};
      if(tangent(c,c1,1e-6).ok&&tangent(c,c2,1e-6).ok&&tangent(c,c3,1e-6).ok)out.push(c);
    }
  }
  return out;
}
function fixed0(n){var s=Number(n).toFixed(5);return s==='-0.00000'?'0.00000':s}
function gasketKey(c){return Math.round(c.k)+':'+fixed0(c.x)+':'+fixed0(c.y)}
function gasketStart(){
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d=null,sols=solutions(a,b,c),i,cs,seen;
  for(i=0;i<sols.length;i++)if(sols[i].k>0&&Math.abs(sols[i].k-3)<1e-6){d=sols[i];break}
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];seen={};
  cs.forEach(function(c){seen[gasketKey(c)]=1});
  return{cs:cs,q:[[0,1,2],[0,1,3],[0,2,3],[1,2,3]],nq:[],seen:seen,gi:0,qi:0};
}
function gasketStep(st,depth,t0){
  var t,c1,c2,c3,sols,si,n,k,ok,j,ix;
  if(st.gi>=depth)return true;
  while(st.gi<depth){
    while(st.qi<st.q.length){
      t=st.q[st.qi];c1=st.cs[t[0]];c2=st.cs[t[1]];c3=st.cs[t[2]];
      sols=solutions(c1,c2,c3);
      for(si=0;si<sols.length;si++){
        n=sols[si];if(n.k<=0)continue;
        if(Math.hypot(n.x,n.y)+1/n.k>1.02)continue;
        k=gasketKey(n);if(st.seen[k])continue;
        ok=1;
        for(j=0;j<st.cs.length;j++){if(overlaps(n,st.cs[j],1e-4)){ok=0;break}}
        if(!ok)continue;
        st.seen[k]=1;st.cs.push(n);ix=st.cs.length-1;
        st.nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
      }
      st.qi++;
      if(timedOut(t0))return false;
    }
    st.q=st.nq;st.nq=[];st.qi=0;st.gi++;
    if(timedOut(t0)&&st.gi<depth)return false;
  }
  return true;
}
function rawGasket(depth){
  depth=Math.max(0,Math.min(8,depth|0));
  if(gasketMemo[depth])return gasketMemo[depth];
  var st=gasketStart(),forever=performance.now()+1e8,d;
  gasketStep(st,depth,forever);
  gasketMemo[depth]=st.cs;
  for(d=0;d<depth;d++)if(!gasketMemo[d]){
    /* leave holes; only store exact depth and any prefix we can */
  }
  return st.cs;
}
function apolMinR(d,S){
  var cs=rawGasket(d),sc=S*0.46,i,r,minr=Infinity;
  for(i=0;i<cs.length;i++){r=Math.abs(1/cs[i].k)*sc;if(r>0&&r<minr)minr=r}
  return isFinite(minr)?minr:0;
}

/* ---- a steppable painter for one level ---- */
function makeJob(cv,rec,level){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,sh=rec.shape,base=baseCap(sh);
  var slice={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))slice[k]=rec[k];
  slice.depth=level;
  var job={sh:sh,level:level,phase:'init',i:0,W:W,H:H,x:x,rec:slice,base:base,alpha:(REPLACE[sh]||sh==='htree')?1:deepAlpha(level,base)};
  if(sh==='levy'||sh==='dragon'){
    job.kind=sh;
    job.style={stroke:ink(sh,level,level),lw:deepLw(level,base,sh==='dragon'?Math.max(1.2,3-level*0.3):Math.max(0.9,2.8-level*0.18))};
    job.phase='pts';
  }else if(sh==='hilbert'){
    job.style={stroke:ink('hilbert',level,level),lw:deepLw(level,base,Math.max(level<=base?2:1,5-level))};
    job.phase='hilpts';
  }else if(sh==='koch'){
    job.style={stroke:ink('koch',level,level),lw:deepLw(level,base,Math.max(0.8,2.4-level*0.25))};
    job.phase='kochsegs';
  }else if(sh==='sunflower'||sh==='chaos'||sh==='fern'){
    job.phase='ptsgen';
    job.col=ink(sh,level,Math.max(1,level));
    job.rad=sh==='sunflower'?null:1.6;
  }else if(sh==='apollonian'){
    job.phase='gasket';
    job.onlyNew=false;
  }else if(sh==='triangle'){
    job.phase='tricollect';
  }else if(sh==='pythagoras'){
    job.phase='pythcollect';
  }else if(sh==='spirals'){
    job.phase='spicollect';
  }else if(sh==='tree'||sh==='antler'){
    job.phase='treecollect';
  }else if(sh==='htree'){
    job.phase='hcollect';
  }else if(sh==='pascal'){
    job.phase='pascal';
  }else if(sh==='hexrings'){
    job.phase='hex';
  }else if(sh==='ripples'){
    job.phase='ripples';
  }else{
    job.phase='fallback';
  }
  return job;
}

function sunPts(W,H,rec){
  var n=sunN(rec.depth||0),phi=rec.angle||GOLDANG,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th,pts=new Array(n),rim=Math.max(8,n/8);
  if(Math.abs(phi-137.5)<0.8||Math.abs(phi-GOLDANG)<0.8)phi=GOLDANG;
  for(i=0;i<n;i++){r=c*Math.sqrt(i);th=i*phi*Math.PI/180;pts[i]=[W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.4,3.1-i/n*1.5),i>=n-rim?1:0]}
  return pts;
}
function chaosPtsChunk(st,t0){
  var rec=st.rec,W=st.W,H=st.H,depth=rec.depth||0,N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=0.5,same,j;
  if(!st._chaos){
    if(typeof IL154==='object'&&typeof IL154.jumpOf==='function')fr=IL154.jumpOf(rec.angle);
    else if(Math.round(rec.angle||50)===33)fr=1/3;
    else if(Math.round(rec.angle||50)===38)fr=1/((1+Math.sqrt(5))/2)/((1+Math.sqrt(5))/2);
    else if((rec.angle||0)>=30&&(rec.angle||0)<=55)fr=(rec.angle||50)/100;
    same=poly===4&&Math.abs(fr-0.5)<1e-9;
    st._chaos={fr:fr,same:same,s:(rec.seed||109)>>>0,v:[],p:{x:W/2,y:H/2},last:-1,i:0,N:N,poly:poly,w:Math.min(W,H)*0.42};
    for(j=0;j<poly;j++)st._chaos.v.push({x:W/2+Math.cos(-Math.PI/2+j*2*Math.PI/poly)*st._chaos.w,y:H/2+Math.sin(-Math.PI/2+j*2*Math.PI/poly)*st._chaos.w});
    st.pts=[];
  }
  var C=st._chaos,rnd;
  function rnd1(){C.s=(1664525*C.s+1013904223)>>>0;return C.s/4294967296}
  while(C.i<C.N){
    j=Math.floor(rnd1()*C.poly);
    if(C.same&&j===C.last)j=(j+1+Math.floor(rnd1()*(C.poly-1)))%C.poly;
    C.last=j;C.p.x+=(C.v[j].x-C.p.x)*C.fr;C.p.y+=(C.v[j].y-C.p.y)*C.fr;
    st.pts.push([C.p.x,C.p.y]);C.i++;
    if((C.i&31)===0&&timedOut(t0))return false;
  }
  return true;
}
function fernPtsChunk(st,t0){
  var rec=st.rec,n=Math.max(0,(rec.depth||0)*4000),W=st.W,H=st.H;
  if(!st._fern){
    st._fern={rnd:(function(s){s=(rec.seed||109)>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}})(),x:0,y:0,i:0,n:n};
    st.pts=[];
  }
  var F=st._fern,r,k,a,nx,ny;
  while(F.i<F.n){
    r=F.rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];
    nx=a[0]*F.x+a[1]*F.y+a[4];ny=a[2]*F.x+a[3]*F.y+a[5];F.x=nx;F.y=ny;
    st.pts.push([W*(0.5+F.x*0.18),H*(0.92-F.y*0.082)]);F.i++;
    if((F.i&63)===0&&timedOut(t0))return false;
  }
  return true;
}

function stepJob(job,t0){
  var i,n,st,p,pad,span,N,X,Y,sc,cx,cy,minx,maxx,miny,maxy;
  if(job.phase==='pts'){
    job.depth=job.level;
    if(!levyPtsStep(job,t0))return false;
    job.i=0;job.phase='stroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hilpts'){
    st=hilbertPts(Math.max(1,Math.min(8,job.level||1)));
    pad=job.W*0.08;span=job.W-pad*2;N=(1<<Math.max(1,job.level))-1||1;
    job.pts=st.map(function(pt){return{x:pad+pt[0]/N*span,y:pad+pt[1]/N*span}});
    job.i=0;job.phase='stroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='kochsegs'){
    job.segs=kochSegs(job.W,job.H,job.level);
    job.i=0;job.phase='segstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='stroke'){
    if(!bgStep(job,t0))return false;
    job.style.alpha=job.alpha==null?1:job.alpha;
    var bud=pathBudget(),t1,u=0,cap=unitCap('path');
    while(job.i<job.pts.length-1){
      t1=performance.now();
      job.i=strokePtsChunk(job.x,job.pts,job.i,bud,job.style);
      if(performance.now()-t1>SLICE/2&&bud>1)bud=Math.max(1,bud>>1);
      u++;
      if((u>=cap||timedOut(t0))&&job.i<job.pts.length-1)return false;
    }
    job.x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='segstroke'){
    if(!bgStep(job,t0))return false;
    job.style.alpha=job.alpha==null?1:job.alpha;
    var bud2=pathBudget(),t2,u2=0,cap2=unitCap('path');
    while(job.i<job.segs.length){
      t2=performance.now();
      job.i=strokeSegsChunk(job.x,job.segs,job.i,bud2,job.style);
      if(performance.now()-t2>SLICE/2&&bud2>1)bud2=Math.max(1,bud2>>1);
      u2++;
      if((u2>=cap2||timedOut(t0))&&job.i<job.segs.length)return false;
    }
    job.x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='ptsgen'){
    if(job.sh==='sunflower'){job.pts=sunPts(job.W,job.H,job.rec);job.phase='sunfill';job.i=0}
    else if(job.sh==='chaos'){if(!chaosPtsChunk(job,t0))return false;job.phase='stamp';job.i=0;job._u0=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    else{if(!fernPtsChunk(job,t0))return false;job.phase='stamp';job.i=0;job._u0=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    if(timedOut(t0))return false;
  }
  if(job.phase==='sunfill'){
    var sx=job.x,sp,sn=job.pts.length,sdepth=job.level,su=0,scap=unitCap('item');
    if(!bgStep(job,t0))return false;
    sx.globalAlpha=1;
    while(job.i<sn){
      sp=job.pts[job.i];
      sx.fillStyle=ink('sunflower',sp[3]?sdepth:0,sdepth);
      sx.beginPath();sx.arc(sp[0],sp[1],sp[2],0,Math.PI*2);sx.fill();
      job.i++;su++;
      if((su>=scap||timedOut(t0))&&job.i<sn)return false;
    }
    job.phase='done';return true;
  }
  if(job.phase==='stamp'){
    n=job.pts.length;
    while(job.i<n){
      p=job.pts[job.i];
      stamp(job.buf,job.W,job.H,p[0],p[1],typeof p[2]==='number'?p[2]:(job.rad||1.6),job);
      job.i++;
      if((job.i%Math.max(1,stampN()))===0&&(timedOut(t0)||job.i-job._u0>=unitCap('stamp'))){job._u0=job.i;return false}
    }
    job.phase='put';job.i=0;
    job.rgb=rgbOf(job.col);
    job.bgc=night()?[13,15,26,255]:[255,248,236,255];
    job.logm=Math.log(1+Math.max(1,job.max));
    if(timedOut(t0))return false;
  }
  if(job.phase==='put'){
    var r=job.rgb[0],g=job.rgb[1],b=job.rgb[2],u,a,idx,row,rows=putRows(),y1,h,W=job.W,H=job.H,buf=job.buf,logm=job.logm,alphaMul=job.alpha,bgc=job.bgc,j,d,up=0,capP=unitCap('put');
    while(job.i<H){
      y1=Math.min(H,job.i+rows);h=y1-job.i;
      if(!job.img||job.img.width!==W||job.img.height!==h)job.img=job.x.createImageData(W,h);
      d=job.img.data;
      for(j=0;j<h*W*4;j+=4){d[j]=bgc[0];d[j+1]=bgc[1];d[j+2]=bgc[2];d[j+3]=255}
      for(row=0;row<h;row++){
        for(i=0;i<W;i++){
          idx=(job.i+row)*W+i;if(!buf[idx])continue;
          u=Math.log(1+buf[idx])/logm;
          a=Math.max(0,Math.min(255,Math.round(255*Math.pow(u,0.85)*alphaMul)));
          d[(row*W+i)*4]=r;d[(row*W+i)*4+1]=g;d[(row*W+i)*4+2]=b;d[(row*W+i)*4+3]=Math.max(d[(row*W+i)*4+3],a);
        }
      }
      job.x.putImageData(job.img,0,job.i);
      job.i=y1;up++;
      if((up>=capP||timedOut(t0))&&job.i<H)return false;
    }
    job.phase='done';return true;
  }

  if(job.phase==='gasket'){
    var mem=gasketMemo[job.level];
    if(mem){job.cs=mem;job.phase='apolstroke';job.i=0;if(timedOut(t0))return false}
    else{
      if(!job.gst)job.gst=gasketStart();
      if(!gasketStep(job.gst,job.level,t0))return false;
      job.cs=job.gst.cs;gasketMemo[job.level]=job.cs;
      job.phase='apolstroke';job.i=0;
      if(timedOut(t0))return false;
    }
  }
  if(job.phase==='apolstroke'){
    var cs=job.cs,sc=Math.min(job.W,job.H)*0.46,cx=job.W/2,cy=job.H/2,c,rad,ox=job.x,nA=itemN();
    if(!bgStep(job,t0))return false;ox.lineCap='round';
    ox.globalAlpha=job.alpha==null?1:job.alpha;
    var uA=0,capA=unitCap('item');
    while(job.i<cs.length){
      c=cs[job.i];
      job.i++;
      rad=Math.abs(1/c.k)*sc;
      ox.strokeStyle=ink('apollonian',job.i>1?1:0,Math.max(1,job.level));
      ox.lineWidth=c.k<0?2.2:Math.max(1,2-Math.log(c.k+1)*0.35);
      ox.beginPath();ox.arc(cx+c.x*sc,cy-c.y*sc,rad,0,Math.PI*2);ox.stroke();
      if(c.k>0&&rad>14){
        ox.fillStyle=I;ox.font=Math.max(9,Math.min(16,rad*0.55))+'px sans-serif';ox.textAlign='center';ox.textBaseline='middle';
        ox.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
      }
      uA++;
      if((uA>=capA||(job.i%nA===0&&timedOut(t0)))&&job.i<cs.length)return false;
    }
    ox.globalAlpha=1;
    job.phase='done';return true;
  }

  if(job.phase==='tricollect'){
    var depth=job.level,stack,item,ax,ay,bx,by,cx,cy,d,mx,my,nx,ny,px,py,n;
    if(!job.tris){
      job.tris=[];job.stack=[[job.W/2,job.H*0.1,job.W*0.08,job.H*0.9,job.W*0.92,job.H*0.9,0]];
    }
    stack=job.stack;
    while(stack.length){
      item=stack.pop();ax=item[0];ay=item[1];bx=item[2];by=item[3];cx=item[4];cy=item[5];d=item[6];
      if(d>=depth)job.tris.push(item);
      else{
        mx=(ax+bx)/2;my=(ay+by)/2;nx=(bx+cx)/2;ny=(by+cy)/2;px=(cx+ax)/2;py=(cy+ay)/2;
        stack.push([px,py,nx,ny,cx,cy,d+1],[mx,my,bx,by,nx,ny,d+1],[ax,ay,mx,my,px,py,d+1]);
      }
      if((job.tris.length&31)===0&&timedOut(t0))return false;
    }
    job.i=0;job.phase='trifill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='trifill'){
    var ox=job.x,tr,col=ink('triangle',job.level,job.level),nT=itemN();
    if(!bgStep(job,t0))return false;
    ox.globalAlpha=job.alpha==null?1:job.alpha;
    var uT=0,capT=unitCap('item');
    while(job.i<job.tris.length){
      tr=job.tris[job.i];
      ox.fillStyle=col;
      ox.beginPath();ox.moveTo(tr[0],tr[1]);ox.lineTo(tr[2],tr[3]);ox.lineTo(tr[4],tr[5]);ox.closePath();ox.fill();
      job.i++;uT++;
      if((uT>=capT||(job.i%nT===0&&timedOut(t0)))&&job.i<job.tris.length)return false;
    }
    ox.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='pythcollect'){
    var depth=job.level,ang=(job.rec.angle||28)*Math.PI/180,boxes=[],S=Math.min(job.W,job.H),s0=S*0.16,useBase=depth<=job.base,cut=useBase?2:0.8;
    (function sq(px,py,s,a,d){
      if(d>depth||s<cut)return;
      var c=Math.cos(a),si=Math.sin(a);
      var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
      boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
      if(d===depth)return;
      if(useBase){
        var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
        sq(x4,y4,sl,a+ang,d+1);sq(x3,y3,sr,a+ang-Math.PI/2,d+1);
      }else{
        var sl=s*Math.cos(ang),sr=s*Math.sin(ang),bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
        sq(x2,y2,sl,a-ang,d+1);sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
      }
    })(job.W/2-s0/2,job.H*0.86,s0,-Math.PI/2,0);
    job.fit=1;
    minx=1e9;maxx=-1e9;miny=1e9;maxy=-1e9;
    for(i=0;i<boxes.length;i++)for(n=0;n<4;n++){
      p=boxes[i].P[n];
      if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
      if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
    }
    pad=S*0.08;
    job.sc=Math.min((job.W-2*pad)/Math.max(maxx-minx,1e-6),(job.H-2*pad)/Math.max(maxy-miny,1e-6));
    job.cx=(minx+maxx)/2;job.cy=(miny+maxy)/2;
    job.boxes=boxes;job.i=0;job.phase='pythfill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='pythfill'){
    var ox=job.x,b,j,bbase=job.base,nP=itemN();
    if(!bgStep(job,t0))return false;
    function MX(v){return job.fit?job.W/2+(v-job.cx)*job.sc:v}
    function MY(v){return job.fit?job.H/2+(v-job.cy)*job.sc:v}
    var uP=0,capB=unitCap('item');
    while(job.i<job.boxes.length){
      b=job.boxes[job.i];p=b.P;
      ox.globalAlpha=deepAlpha(b.d,bbase);
      ox.fillStyle=ox.strokeStyle=ink('pythagoras',b.d,job.level);
      ox.lineWidth=deepLw(b.d,bbase,Math.max(1,3-b.d*0.35));
      ox.beginPath();ox.moveTo(MX(p[0][0]),MY(p[0][1]));
      for(j=1;j<4;j++)ox.lineTo(MX(p[j][0]),MY(p[j][1]));
      ox.closePath();ox.fill();ox.stroke();
      job.i++;uP++;
      if((uP>=capB||(job.i%nP===0&&timedOut(t0)))&&job.i<job.boxes.length)return false;
    }
    ox.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='spicollect'){
    var depth=job.level,only=job.level,list=[];
    (function sp(cx,cy,s,rot,d){
      var i,r,a;
      if(d>depth||s<2)return;
      if(d===only)list.push({cx:cx,cy:cy,s:s,rot:rot,d:d});
      if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*0.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*0.32,rot+0.4,d+1)}
    })(job.W/2,job.H/2,Math.min(job.W,job.H)*0.28,0,0);
    job.list=list;job.i=0;job.phase='spistroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='spistroke'){
    var sp,i,r,a,px,py,first,path,bbase=job.base,x=job.x;
    while(job.i<job.list.length){
      sp=job.list[job.i];
      x.strokeStyle=ink('spirals',sp.d,job.level);x.lineWidth=deepLw(sp.d,bbase,Math.max(1,2.4-sp.d*0.3));x.globalAlpha=deepAlpha(sp.d,bbase);
      path=typeof Path2D==='function'?new Path2D():null;first=1;
      if(path){
        for(i=0;i<=90;i++){a=sp.rot+i/90*Math.PI*4;r=sp.s*i/90;px=sp.cx+Math.cos(a)*r;py=sp.cy+Math.sin(a)*r;first?(path.moveTo(px,py),first=0):path.lineTo(px,py)}
        x.stroke(path);
      }else{
        x.beginPath();
        for(i=0;i<=90;i++){a=sp.rot+i/90*Math.PI*4;r=sp.s*i/90;px=sp.cx+Math.cos(a)*r;py=sp.cy+Math.sin(a)*r;first?(x.moveTo(px,py),first=0):x.lineTo(px,py)}
        x.stroke();
      }
      job.i++;
      if((job.i%unitCap('item')===0||timedOut(t0))&&job.i<job.list.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='treecollect'){
    var depth=job.level,only=job.level,ang=(job.rec.angle||28)*Math.PI/180,se=job.rec.season||0,sh=job.sh;
    var ratio=SHR[Math.max(0,Math.min(3,se))];if(!se&&sh==='tree')ratio=0.68;
    var segs=[],tips=[];
    (function br(px,py,len,a,d){
      if(d>depth||len<0.6)return;
      var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
      if(d===only){
        segs.push([px,py,nx,ny]);
        if(se&&d>=depth-1)tips.push({x:nx,y:ny,d:d,a:a});
      }
      br(nx,ny,len*ratio,a-ang,d+1);br(nx,ny,len*ratio,a+ang,d+1);
    })(job.W/2,job.H*0.92,job.H*0.22,Math.PI/2,0);
    job.segs=segs;job.tips=tips;job.se=se;job.i=0;
    job.style={stroke:ink(sh,only,depth),lw:deepLw(only,job.base,Math.max(1,(6-only)*0.85))};
    job.phase='treestroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='treestroke'){
    var x=job.x;
    x.globalAlpha=deepAlpha(job.level,job.base);
    var uTr=0,capTr=unitCap('path');
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(x,job.segs,job.i,pathBudget(),job.style);
      uTr++;
      if((uTr>=capTr||timedOut(t0))&&job.i<job.segs.length)return false;
    }
    if(job.se){
      var tips=job.tips,tp,se=job.se,sh=job.sh;
      x.globalAlpha=deepAlpha(job.level,job.base);
      for(i=0;i<tips.length;i++){
        tp=tips[i];
        if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tp.x,tp.y,2.1,0,Math.PI*2);x.fill()}
        else if(se===2){x.fillStyle=sh==='antler'?'#4e6b5c':'#3D6A62';x.beginPath();x.arc(tp.x,tp.y,3.1,0,Math.PI*2);x.fill()}
        else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tp.x+(sh==='antler'?3:(tp.d%2?4:-3)),tp.y+(sh==='antler'?6:5),2,0,Math.PI*2);x.fill()}
      }
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='hcollect'){
    var depth=job.level,only=job.level,segs=[];
    (function Hn(cx,cy,len,hz,d){
      if(d<0||len<0.6)return;
      if(d===depth-only){
        if(hz)segs.push([cx-len,cy,cx+len,cy]);else segs.push([cx,cy-len,cx,cy+len]);
      }
      if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
      else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
    })(job.W/2,job.H/2,Math.min(job.W,job.H)*0.22,1,depth);
    job.segs=segs;job.i=0;
    job.style={stroke:ink('htree',0,depth),lw:Math.max(1,2.6),alpha:1};
    job.phase='hstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hstroke'){
    var x=job.x;
    x.globalAlpha=1;
    var uH=0,capH=unitCap('path');
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(x,job.segs,job.i,pathBudget(),job.style);
      uH++;
      if((uH>=capH||timedOut(t0))&&job.i<job.segs.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='pascal'){
    var depth=job.level,mod=job.rec.angle===5?5:job.rec.angle===3?3:2,rows=[],n,k;
    rows[0]=[1];
    for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
    job.rows=rows;job.mod=mod;
    job.sz=Math.min((job.W-24)/(depth+1),(job.H-24)/(depth+1),28);
    job.y0=(job.H-(depth+1)*job.sz)/2+job.sz/2;job.x0=job.W/2;
    job.i=0;job.phase='pascalfill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='pascalfill'){
    var x=job.x,depth=job.level,base=job.base,sz=job.sz,n,k,cell;
    if(!bgStep(job,t0))return false;
    while(job.i<=depth){
      n=job.i;
      x.globalAlpha=n>base?deepAlpha(n,base):1;
      for(k=0;k<=n;k++){
        cell=job.rows[n][k];
        x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,job.mod);
        x.beginPath();x.arc(job.x0+(k-n/2)*sz,job.y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
      }
      job.i++;
      if((job.i%unitCap('item')===0||timedOut(t0))&&job.i<=depth)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='hex'){
    var depth=job.level,pad=6,size,R,q,r,s,cells=[],W=job.W,H=job.H;
    size=depth<=0?Math.min(W,H)*0.28:(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
    R=size/Math.sqrt(3);
    for(q=-depth;q<=depth;q++)for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      cells.push({px:W/2+(q+r/2)*size,py:H/2+r*size*Math.sqrt(3)/2,ring:Math.max(Math.abs(q),Math.abs(r),Math.abs(s))});
    }
    job.cells=cells;job.R=R;job.i=0;
    job.phase='hexstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hexstroke'){
    var x=job.x,base=job.base,depth=job.level,R=job.R,cell,nH=itemN(),k,p;
    if(!bgStep(job,t0))return false;
    while(job.i<job.cells.length){
      cell=job.cells[job.i];
      x.globalAlpha=cell.ring>base?deepAlpha(cell.ring,base):1;
      x.strokeStyle=ink('hexrings',cell.ring,depth);x.lineWidth=deepLw(depth,base,Math.max(1,2.2));
      p=typeof Path2D==='function'?new Path2D():null;
      if(p){for(k=0;k<6;k++)p[k?'lineTo':'moveTo'](cell.px+Math.cos(Math.PI/6+k*Math.PI/3)*R,cell.py+Math.sin(Math.PI/6+k*Math.PI/3)*R);p.closePath();x.stroke(p)}
      else{x.beginPath();for(k=0;k<6;k++)x[k?'lineTo':'moveTo'](cell.px+Math.cos(Math.PI/6+k*Math.PI/3)*R,cell.py+Math.sin(Math.PI/6+k*Math.PI/3)*R);x.closePath();x.stroke()}
      job.i++;
      if((job.i%unitCap('item')===0||(job.i%nH===0&&timedOut(t0)))&&job.i<job.cells.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='ripples'){
    var depth=job.level,Rmax=Math.min(job.W,job.H)/2-6,base=job.base,x=job.x,p;
    if(depth<=0){bg(x,job.W,job.H);x.fillStyle=GOLD;x.beginPath();x.arc(job.W/2,job.H/2,5,0,Math.PI*2);x.fill();job.phase='done';return true}
    if(!job._bg){job.i=1;job.step=Rmax/Math.max(1,depth)}
    if(!bgStep(job,t0))return false;
    while(job.i<=depth){
      x.strokeStyle=ink('ripples',job.i,depth);x.lineWidth=deepLw(job.i,base,Math.max(1,3-job.i*0.2));x.globalAlpha=job.i>base?deepAlpha(job.i,base):1;
      p=typeof Path2D==='function'?new Path2D():null;
      if(p){p.arc(job.W/2,job.H/2,job.step*job.i,0,Math.PI*2);x.stroke(p)}
      else{x.beginPath();x.arc(job.W/2,job.H/2,job.step*job.i,0,Math.PI*2);x.stroke()}
      job.i++;
      if((job.i%unitCap('item')===0||timedOut(t0))&&job.i<=depth)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='fallback'){job.phase='done';return true}
  return job.phase==='done';
}

function cacheOk(cv,rec,lo,hi){
  var key=recKey(rec,cv.width,cv.height);
  return !!(cache&&cache.key===key&&cache.sh===rec.shape&&cache.depth>=lo&&(hi==null||cache.depth<=hi));
}
function snapLevel(cv,rec,depth){
  try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=depth;saveCache(cv,c)}catch(ex){}
}
function startWork(cv,rec,from,to,prev,sliced){
  if(workOpen){workOpen=0;busyDown()}
  var my=++tok,L=from,job=null,needBase=0,sh=rec.shape;
  wrapCv(cv);
  workOpen=1;busyUp();
  function finish(){
    if(workOpen){workOpen=0;jobDone()}
    else{skipDragonUn=0;startCool()}
  }
  function done(){
    if(sliced){
      requestAnimationFrame(function(){
        if(tok!==my){finish();return}
        paintOwn++;
        try{saveCache(cv,rec)}catch(ex){cache=null}
        finally{paintOwn--}
        finish();
      });
      return;
    }
    try{saveCache(cv,rec)}catch(ex){}
    finish();
  }
  function yieldTick(){if(sliced)requestAnimationFrame(tick);else tick()}
  function tick(){
    if(tok!==my)return;
    var t0=sliced?performance.now():(performance.now()+1e8);
    paintOwn++;
    try{
      if(job){
        if(!stepJob(job,t0)){yieldTick();return}
        job=null;
        if(sliced){requestAnimationFrame(tick);return}
        t0=performance.now()+1e8;
      }
      if(needBase){
        needBase=0;
        if(ADDITIVE[sh]){
          L=0;
        }else{
          L=from;
          job=makeJob(cv,rec,from);
          if(!stepJob(job,t0)){yieldTick();return}
          job=null;
          if(sliced){requestAnimationFrame(tick);return}
          t0=performance.now()+1e8;
        }
      }
      if(L>=to){done();return}
      L++;
      job=makeJob(cv,rec,L);
      if(!stepJob(job,t0)){yieldTick();return}
      if(sliced){yieldTick();return}
      job=null;
      if(L<to)yieldTick();
      else done();
    }finally{paintOwn--}
  }
  function kick(){
    if(tok!==my)return;
    paintOwn++;
    try{
      wrapCv(cv);
      if(ADDITIVE[sh]){
        if(cacheOk(cv,rec,from,rec.depth||to)){
          blitCache(cv);L=cache.depth;needBase=0;
        }else if(from>0){
          needBase=1;L=from;
        }else{
          L=0;needBase=0;
        }
      }else{
        /* Full-redraw shapes only need the final level. */
        L=Math.max(-1,(to|0)-1);needBase=0;
      }
    }finally{paintOwn--}
    yieldTick();
  }
  if(sliced)requestAnimationFrame(kick);
  else kick();
}

function paintApolSync(cv,rec,prev){
  var depth=rec.depth||0,job,forever=performance.now()+1e8;
  if(depth<=0){prev(cv,rec);return}
  job=makeJob(cv,rec,depth);
  while(!stepJob(job,forever)){}
  try{saveCache(cv,rec)}catch(ex){}
}

function paintThumb(cv,rec,prev){
  var copy={},k,sh,cap,depth,L,job,forever=performance.now()+1e8;
  for(k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))copy[k]=rec[k];
  sh=copy.shape;cap=capOf(sh,copy);depth=Math.max(0,Math.min(cap,copy.depth||0));
  copy.depth=depth;copy._rest=0;
  if(depth<=0){
    var x=cv.getContext('2d');
    bg(x,cv.width,cv.height);
    x.fillStyle=GOLD;x.beginPath();x.arc(cv.width/2,cv.height*0.7,Math.max(3,cv.width*0.07),0,Math.PI*2);x.fill();
    return;
  }
  paintOwn++;
  try{
    if(ADDITIVE[sh]){
      for(L=1;L<=depth;L++){job=makeJob(cv,copy,L);while(!stepJob(job,forever)){}}
    }else{
      job=makeJob(cv,copy,depth);while(!stepJob(job,forever)){}
    }
  }finally{paintOwn--}
}
function recChrome(g){return[g&&g.shape,g&&g.angle,g&&g.pal,g&&g.season,g&&g.poly,g&&g.seed,night()?'n':'d'].join('|')}
function patchGrowChrome(g){
  var jar,lab,word,n,slot,figs,last,num;
  refreshMsg(g);
  syncMsg(g);
  n=copies(g);
  g._n=n;
  slot=document.getElementById('gaf149count');
  if(slot)slot.textContent=String(n);
  jar=document.querySelector('[data-gaf3jar] .g9c');
  if(jar){
    lab=jar.querySelector('.soft');word=lab?lab.textContent:'';
    jar.textContent='';
    jar.appendChild(document.createTextNode(String(n)));
    if(word){lab=document.createElement('span');lab.className='soft';lab.textContent=word;jar.appendChild(document.createTextNode(' '));jar.appendChild(lab)}
  }
  figs=document.querySelectorAll('[data-gafcode149] figure figcaption');
  if(figs&&figs.length){
    last=figs[figs.length-1];
    num=last.querySelector('.kline,b,span')||last;
    /* the depth sits as the first text in the figcaption */
    if(last.firstChild&&last.firstChild.nodeType===3)last.firstChild.nodeValue=String(g.depth||0);
    else if(last.firstChild&&last.firstChild.childNodes&&last.firstChild.childNodes.length){
      if(last.firstChild.firstChild&&last.firstChild.firstChild.nodeType===3)last.firstChild.firstChild.nodeValue=String(g.depth||0);
    }
  }
}

function hookDraw(){
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!cv)return prev.apply(this,arguments);
      if(cv.id!=='patGrowCv')return paintThumb(cv,rec,prev);
      layout(cv);
      if(rec._rest){cancel();dropGuard();return prev.apply(this,arguments)}
      var sh=rec.shape,depth=rec.depth||0,base=baseCap(sh),realRd=userReduced();
      if(sh==='apollonian'&&depth>0){
        cancel();
        if(realRd){startWork(cv,rec,depth,depth,prev,false);return}
        startWork(cv,rec,depth,depth,prev,true);
        return;
      }
      if(depth<=base){
        if(sliceBase(sh)&&depth>0){
          cancel();
          startWork(cv,rec,depth,depth,prev,!realRd);
          return;
        }
        cancel();dropGuard();
        paintOwn++;
        try{
          var r0=prev.apply(this,arguments);
          try{saveCache(cv,rec)}catch(ex){}
          return r0;
        }finally{paintOwn--}
      }
      cancel();
      if(!realRd)armGuard(cv);
      startWork(cv,rec,base,depth,prev,!realRd);
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g._rest)return prev.apply(this,arguments);
      if(g&&g.shape){
        var cap=capOf(g.shape,g),base=baseCap(g.shape);
        if((g.depth||0)>=cap){
          g.msg=t(CAP_EN);
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        if((g.depth||0)>=base){
          g.depth=(g.depth||0)+1;
          refreshMsg(g);
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          function drawNow(){if(typeof patGrowDraw106==='function')patGrowDraw106()}
          function flushStep(){
            stepRaf=0;stepBusy=0;
            var d=pendingDraw;pendingDraw=0;
            if(d)drawNow();
          }
          if(stepBusy){
            pendingDraw=1;
            if(!stepRaf)stepRaf=requestAnimationFrame(flushStep);
            return;
          }
          stepBusy=1;
          pendingDraw=0;
          if(!stepRaf)stepRaf=requestAnimationFrame(flushStep);
          drawNow();
          return;
        }
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var g=grow(),cv,el,fast,r;
      scrubGrow(g);
      cv=document.getElementById('patGrowCv');
      el=document.getElementById('patterns');
      fast=cv&&g&&g.shape&&!g._rest&&(g.depth||0)>0&&document.querySelector('[data-gaf3jar]')&&el&&el.hidden!==true&&lastChrome===recChrome(g)&&(lastFullAt>0||(g.depth||0)>baseCap(g.shape));
      if(fast){
        patchGrowChrome(g);
        try{layout(cv);if(typeof patGrowDrawOn106==='function')patGrowDrawOn106(cv,g)}catch(ex){}
        try{if(typeof patNatureCard106==='function')patNatureCard106()}catch(ex){}
        refreshMsg(g);syncMsg(g);
        return;
      }
      r=prev.apply(this,arguments);
      lastChrome=g?recChrome(g):null;
      lastFullAt=(g&&g.depth)||0;
      if(g){scrubGrow(g);refreshMsg(g);syncMsg(g)}
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){cancel();dropGuard();cache=null;lastChrome=null;lastFullAt=0}
      return prev.apply(this,arguments);
    };
  });
  hook('patReduced',function(prev){
    return function(){
      if(skipDragonUn&&!probingRd)return true;
      return prev.apply(this,arguments);
    };
  });
  if(typeof root.lampReduced73==='function'){
    hook('lampReduced73',function(prev){
      return function(){
        if(skipDragonUn&&!probingRd)return true;
        return prev.apply(this,arguments);
      };
    });
  }
}

function onResize(){
  if(resizeT)clearTimeout(resizeT);
  resizeT=setTimeout(function(){
    try{
      var el=document.getElementById('patterns');
      if(!el||el.hidden===true)return;
      var g=grow();
      if(!g)return;
      cache=null;
      if(scrubGrow(g)&&typeof patGrowDraw106==='function')patGrowDraw106();
      else if(typeof patGrowDraw106==='function')patGrowDraw106();
    }catch(ex){}
  },80);
}

function publish(){
  function wrapGasket(obj){
    if(!obj||typeof obj.gasket!=='function'||obj.gasket._v171)return;
    obj.gasket=function(depth){return rawGasket(depth)};
    obj.gasket._v171=1;
  }
  wrapGasket(root.IL154);wrapGasket(root.IL155);
  if(typeof IL154==='object'){
    IL154.capOf=function(sh){return capOf(sh)};IL154.copies=copies;IL154.fibArms=fibArms;
    IL154.paintCount=function(d){return rawGasket(d).length};
    if(typeof IL155==='object'&&typeof IL155.paintCount==='function')IL155.paintCount=function(d){return rawGasket(d).length};
  }
  if(typeof IL155==='object'){IL155.capOf=function(sh){return capOf(sh)};IL155.copies=copies}
  if(typeof IL156==='object'){IL156.capOf=function(sh){return capOf(sh)};IL156.copies=copies}
  if(typeof IL157==='object'){IL157.capOf=function(sh){return capOf(sh)};IL157.copies=copies}
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'){
    IL150.capOf=function(sh){return capOf(sh)};IL150.capOf._v171=1;
  }
  if(typeof IL169==='object'){
    IL169.capOf=capOf;IL169.copies=copies;IL169.pieceSize=function(sh,next,S){return pieceSize(sh,next,S)};
    capOf._v171=1;copies._v171=1;
  }
  if(typeof IL170==='object'){
    IL170.capOf=capOf;IL170.copies=copies;IL170.pieceSize=pieceSize;
  }
}

function install(){
  if(install._on)return;install._on=1;
  hookDraw();
  publish();
  try{root.addEventListener('resize',onResize);root.addEventListener('orientationchange',onResize)}catch(ex){}
}
root.IL171={version:171,install:install,SLICE:SLICE,capOf:capOf,baseCap:baseCap,copies:copies,pieceSize:pieceSize,cssSize:cssSize,devicePx:devicePx,minPx:minPx,fibArms:fibArms,gasket:rawGasket,pythCount:pythCount,compactCanvas:compactCanvas,
  notes:'v171 keeps skipDragonUn until the grow job finishes or cancel() runs, time-slices unsliced base drawers, budgets batches by device pixels, and yields a frame between rapid steps. It also applies Pi’s v170 recheck: measured sunflower arms refreshed every level, extras in the base newest-level colour with alpha 1 on full-redraw shapes, gallery thumbs drawn without layout/tok/cache, Pythagoras leaf counts, levyPtsStep concat, and a fixed IL154.paintCount. Reduced motion stays on the sync path. Pinch-zoom tiles and WebGL stay deferred.'};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
