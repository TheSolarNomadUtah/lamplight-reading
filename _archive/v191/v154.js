/* v154: Grow a Fractal 3. No show() wrap. Quilt untouched. No Dragon egg art. */
(function(root){
'use strict';
var SH0=['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];
var SHN=['koch','htree','levy','apollonian','pascal','chaos','hexrings','ripples','antler'];
var LAB={koch:'Koch snowflake',htree:'H-tree',levy:'Lévy C',apollonian:'Apollonian circles',pascal:'Pascal',chaos:'Chaos game',hexrings:'Bee rings',ripples:'Turtle rings',antler:'Antlers'};
var CAP={koch:5,htree:7,levy:10,apollonian:4,pascal:10,chaos:8,hexrings:4,ripples:8,antler:6,sunflower:8};
var I='#72583f',A='#E6B454',CR='#fff8ec',NK='#0d0f1a';
var GOLD='#E6B454';
var PAL={dragon:{cool:'#C45A3A'},fern:{cool:'#4e6b5c'},hexrings:{cool:'#C9893A'},ripples:{cool:'#6F9A7A'},antler:{cool:'#5B7A6A'},triangle:{cool:'#E8E4DA'},tree:{cool:'#4e6b5c'},pythagoras:{cool:'#4e6b5c'},koch:{cool:'#5b7ea8'},htree:{cool:'#4e6b5c'},levy:{cool:'#C45A3A'},apollonian:{cool:'#5b7ea8'},pascal:{cool:'#8a5a7a'},chaos:{cool:'#8a5a7a'},hilbert:{cool:'#5b7ea8'},spirals:{cool:'#C45A3A'},sunflower:{cool:'#C9893A'}};
var FRI={dragon:'dragon',fern:'fern',bee:'hexrings',turtle:'ripples',deer:'antler',firefly:'triangle'};
var LINE={dragon:'Fold by fold, the path doubles.',fern:'Look closer. It\'s here again.',bee:'One ring, then seven, then nineteen.',turtle:'Each ring grows around the last.',deer:'Each branch makes two.',firefly:'Three little triangles make a bigger one.'};
var SHR=[0.68,0.66,0.70,2/3];
var BT=null,HOLD=0,VO=[];
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function e(s){return typeof patEsc==='function'?patEsc(s):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function pid(){try{return(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}catch(ex){return''}}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function sfx(){try{return typeof lampSfxOn73!=='function'||!!lampSfxOn73()}catch(ex){return true}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function rG(k){try{return(typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k)}catch(ex){return null}}
function rS(k,v){try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,v);else localStorage.setItem(k,v)}catch(ex){}}
function acx(){try{return typeof ac==='function'?ac():(typeof AC!=='undefined'?AC:null)}catch(ex){return null}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v154)return;var next=wrap(prev);next._v154=1;next._base=prev._base||prev;root[name]=next}
function shapes(){if(typeof PAT_SHAPES106!=='undefined'&&PAT_SHAPES106&&PAT_SHAPES106.length)return PAT_SHAPES106;return SH0.concat(SHN)}
function capOf(sh){if(CAP[sh]!=null)return CAP[sh];return(typeof IL150==='object'&&IL150.capOf&&!IL150.capOf._v154)?IL150.capOf(sh):(sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:6)}
function sunN(d){var f=[1,13,21,34,55,89,144,233,377];d=Math.max(0,Math.min(f.length-1,d|0));return f[d]}
function copies(rec){
  var d=Math.max(0,rec&&rec.depth||0),sh=rec&&rec.shape;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hilbert')return Math.pow(4,Math.max(0,d));
  if(sh==='fern')return Math.min(20000,d*4000);
  if(sh==='sunflower')return sunN(d);
  if(sh==='spirals')return d?(Math.pow(5,d)-1)/4:1;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='pythagoras'||sh==='antler')return Math.pow(2,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return (d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='apollonian')return gasket(d).length;
  return Math.pow(2,d);
}
function ink(sh,d,depth){
  var p=PAL[sh]||PAL.tree,cool=p.cool||I;
  if(depth<=0)return GOLD;
  var u=Math.max(0,Math.min(1,(depth-d)/Math.max(1,depth)));
  return mix(GOLD,cool,0.15+0.85*u);
}
function mix(a,b,u){
  function h(s){s=s.replace('#','');if(s.length===3)s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2];return[parseInt(s.slice(0,2),16),parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16)]}
  var A=h(a),B=h(b),i,o='#';
  for(i=0;i<3;i++)o+=('0'+Math.round(A[i]+(B[i]-A[i])*u).toString(16)).slice(-2);
  return o;
}
function css(){
  if(document.getElementById('v154css'))return;
  var s=document.createElement('style');s.id='v154css';
  s.textContent='.g3row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}'+
    '.g3row button,.g3btn{min-height:56px;min-width:56px;padding:8px 12px}'+
    '.g3fr{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0;padding:0;list-style:none}'+
    '.g3fr button{min-width:72px;min-height:72px;width:88px;padding:6px;border-radius:16px;background:var(--card,#fffaf0);border:2px solid '+I+';color:'+I+';font:inherit;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}'+
    '.g3fr button.on{border-color:'+A+';box-shadow:0 0 0 2px '+A+'}'+
    '.g3fr svg{width:44px;height:44px;display:block}'+
    '.g3fr .g3dot{width:18px;height:18px;border-radius:50%;background:'+A+';border:2px solid '+I+'}'+
    '.g3jar{display:flex;flex-direction:column;align-items:center;margin:8px auto;max-width:12rem;text-align:center}'+
    '.g3jar svg{width:96px;height:112px;display:block}'+
    '.g3msg{text-align:center;margin:.3rem auto .6rem;max-width:24rem}'+
    '.g3sky .lamp81-star-dot{background:#f7f1e6}'+
    '@media(prefers-reduced-motion:reduce){.g3fr button{transition:none}}';
  document.head.appendChild(s);
}
function lcg(s){s=(s||109)>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}}
function bg(x,W,H){x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}

/* ---- shapes ---- */
function dKoch(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('koch'),rec.depth||0)),s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2;
  function side(ax,ay,bx,by,d){
    if(!d){x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke();return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  x.strokeStyle=ink('koch',depth,depth);x.lineWidth=Math.max(0.8,2.4-depth*0.25);
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);
}
function dH(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('htree'),rec.depth||0));
  function Hn(cx,cy,len,hz,d){
    if(d<0||len<1.2)return;
    x.strokeStyle=ink('htree',d,depth);x.lineWidth=Math.max(0.7,2.6-d*0.25);
    x.beginPath();
    if(hz){x.moveTo(cx-len,cy);x.lineTo(cx+len,cy)}else{x.moveTo(cx,cy-len);x.lineTo(cx,cy+len)}
    x.stroke();
    if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
    else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
  }
  Hn(W/2,H/2,Math.min(W,H)*0.22,1,depth);
}
function dLevy(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('levy'),rec.depth||0)),pts=[{x:W*0.22,y:H*0.62},{x:W*0.72,y:H*0.62}],k,i,next,a,b,mx,my;
  for(k=0;k<depth;k++){
    next=[];
    for(i=0;i<pts.length-1;i++){
      a=pts[i];b=pts[i+1];
      mx=(a.x+b.x)/2-(b.y-a.y)/2;my=(a.y+b.y)/2+(b.x-a.x)/2;
      next.push(a,{x:mx,y:my});
    }
    next.push(pts[pts.length-1]);pts=next;
  }
  x.strokeStyle=ink('levy',depth,depth);x.lineWidth=Math.max(0.9,2.8-depth*0.18);
  x.beginPath();pts.forEach(function(p,i){i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y)});x.stroke();
}
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return {x:a,y:b};
}
function desc(c1,c2,c3,sk,sz){
  var k1=c1.k,k2=c2.k,k3=c3.k,rad=k1*k2+k1*k3+k2*k3,k4=k1+k2+k3+sk*2*Math.sqrt(Math.max(0,rad));
  if(!isFinite(k4)||Math.abs(k4)<1e-8)return null;
  var sr=k1*k2*(c1.x*c2.x-c1.y*c2.y)+k1*k3*(c1.x*c3.x-c1.y*c3.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y);
  var si=k1*k2*(c1.x*c2.y+c1.y*c2.x)+k1*k3*(c1.x*c3.y+c1.y*c3.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x);
  var rt=csqrt(sr,si);
  return {k:Math.round(k4),x:(k1*c1.x+k2*c2.x+k3*c3.x+sz*2*rt.x)/k4,y:(k1*c1.y+k2*c2.y+k3*c3.y+sz*2*rt.y)/k4};
}
function gasket(depth){
  depth=Math.max(0,Math.min(capOf('apollonian'),depth||0));
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d,cs,q,seen,gi,i;
  d=desc(a,b,c,1,-1)||desc(a,b,c,1,1);
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];q=[[0,1,2],[0,1,3],[0,2,3],[1,2,3]];seen={};
  function key(c){return c.k+':'+c.x.toFixed(4)+':'+c.y.toFixed(4)}
  cs.forEach(function(c){seen[key(c)]=1});
  for(gi=0;gi<depth;gi++){
    var nq=[];
    for(i=0;i<q.length;i++){
      (function(t){
        var c1=cs[t[0]],c2=cs[t[1]],c3=cs[t[2]];
        [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(sg){
          var n=desc(c1,c2,c3,sg[0],sg[1]);
          if(!n||n.k<=0)return;
          var k=key(n);if(seen[k])return;
          if(Math.hypot(n.x,n.y)+1/n.k>1.02)return;
          seen[k]=1;cs.push(n);
          var ix=cs.length-1;
          nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
        });
      })(q[i]);
    }
    q=nq;
  }
  return cs;
}
function dApol(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('apollonian'),rec.depth||0)),cs=gasket(depth),sc=Math.min(W,H)*0.46,cx=W/2,cy=H/2,i,c,r;
  for(i=0;i<cs.length;i++){
    c=cs[i];r=Math.abs(1/c.k)*sc;
    if(r<0.6)continue;
    x.strokeStyle=ink('apollonian',i?1:0,Math.max(1,depth));
    x.lineWidth=c.k<0?2.2:Math.max(0.6,2-Math.log(c.k+1)*0.35);
    x.beginPath();x.arc(cx+c.x*sc,cy-c.y*sc,r,0,Math.PI*2);x.stroke();
    if(c.k>0&&r>14){
      x.fillStyle=I;x.font=Math.max(9,Math.min(16,r*0.55))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
    }
  }
}
function dPas(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('pascal'),rec.depth||0)),mod=rec.angle===5?5:rec.angle===3?3:2,rows=[],n,k,cell,R,C,sz,y0,x0;
  rows[0]=[1];
  for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
  sz=Math.min((W-24)/(depth+1),(H-24)/(depth+1),28);
  y0=(H-(depth+1)*sz)/2+sz/2;x0=W/2;
  for(n=0;n<=depth;n++){
    for(k=0;k<=n;k++){
      cell=rows[n][k];
      x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,mod);
      x.beginPath();x.arc(x0+(k-n/2)*sz,y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
    }
  }
}
function dChaos(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('chaos'),rec.depth||0)),N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=rec.angle>=30&&rec.angle<=55?rec.angle/100:0.5,rnd=lcg(rec.seed||109),i,v=[],ang,p,j,last=-1,w=Math.min(W,H)*0.42,same=poly===4&&Math.abs(fr-0.5)<0.02;
  for(i=0;i<poly;i++){ang=-Math.PI/2+i*2*Math.PI/poly;v.push({x:W/2+Math.cos(ang)*w,y:H/2+Math.sin(ang)*w})}
  p={x:W/2,y:H/2};x.fillStyle=ink('chaos',depth,Math.max(1,depth));
  for(i=0;i<N;i++){
    j=Math.floor(rnd()*poly);
    if(same&&j===last)j=(j+1+Math.floor(rnd()*(poly-1)))%poly;
    last=j;p.x+=(v[j].x-p.x)*fr;p.y+=(v[j].y-p.y)*fr;
    x.fillRect(p.x,p.y,1.3,1.3);
  }
}
function dHex(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('hexrings'),rec.depth||0)),R=Math.min(W,H)*0.12,q,r,s,px,py,ring;
  function hex(cx,cy,rad,col){
    var a;x.beginPath();
    for(a=0;a<6;a++)x[a?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+a*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+a*Math.PI/3)*rad);
    x.closePath();x.strokeStyle=col;x.lineWidth=Math.max(0.8,2.2);x.stroke();
  }
  for(q=-depth;q<=depth;q++){
    for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      px=W/2+(q+r/2)*R*1.75;py=H/2+r*(R*Math.sqrt(3)*0.95);
      ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
      hex(px,py,R*0.86,ink('hexrings',ring,depth));
    }
  }
}
function dRip(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('ripples'),rec.depth||0)),i,R=Math.min(W,H)*0.06;
  if(depth<=0){x.fillStyle=GOLD;x.beginPath();x.arc(W/2,H/2,5,0,Math.PI*2);x.fill();return}
  for(i=1;i<=depth;i++){
    x.strokeStyle=ink('ripples',i,depth);x.lineWidth=Math.max(0.9,3-i*0.2);
    x.beginPath();x.arc(W/2,H/2,R*i*1.55,0,Math.PI*2);x.stroke();
  }
}
function dAnt(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('antler'),rec.depth||0)),ang=(rec.angle||36)*Math.PI/180,sh=SHR[Math.max(0,Math.min(3,rec.season||0))];
  function br(px,py,len,a,d){
    if(d>depth||len<1.4)return;
    x.strokeStyle=ink('antler',d,depth);x.lineWidth=Math.max(0.8,(6-d)*0.8);
    x.beginPath();x.moveTo(px,py);
    var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
    x.lineTo(nx,ny);x.stroke();
    tip(nx,ny,d,a);
    br(nx,ny,len*sh,a-ang,d+1);br(nx,ny,len*sh,a+ang,d+1);
  }
  function tip(tx,ty,d,a){
    var se=rec.season||0;if(!se||d<depth-1)return;
    if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tx,ty,2.2,0,Math.PI*2);x.fill()}
    else if(se===2){x.fillStyle='#4e6b5c';x.beginPath();x.ellipse?x.ellipse(tx+Math.cos(a-0.4)*4,ty-Math.sin(a-0.4)*4,4,2.2,a,0,Math.PI*2):x.arc(tx,ty,3,0,Math.PI*2);x.fill()}
    else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tx+3,ty+6,2,0,Math.PI*2);x.fill()}
  }
  br(W/2,H*0.92,H*0.22,Math.PI/2,0);
}
function dTreeSea(x,W,H,rec){
  var depth=Math.max(0,Math.min(6,rec.depth||0)),ang=(rec.angle||28)*Math.PI/180,sh=SHR[Math.max(0,Math.min(3,rec.season||0))],se=rec.season||0;
  function br(px,py,len,a,d){
    if(d>depth||len<1.4)return;
    x.strokeStyle=ink('tree',d,depth);x.lineWidth=Math.max(0.8,(6-d)*0.85);
    x.beginPath();x.moveTo(px,py);
    var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
    x.lineTo(nx,ny);x.stroke();
    if(se&&d>=depth-1){
      if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(nx,ny,2.1,0,Math.PI*2);x.fill()}
      else if(se===2){x.fillStyle='#3D6A62';x.beginPath();x.arc(nx,ny,3.1,0,Math.PI*2);x.fill()}
      else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(nx+(d%2?4:-3),ny+5,2,0,Math.PI*2);x.fill()}
    }
    br(nx,ny,len*sh,a-ang,d+1);br(nx,ny,len*sh,a+ang,d+1);
  }
  br(W/2,H*0.92,H*0.22,Math.PI/2,0);
}
function dSun(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('sunflower'),rec.depth||0)),n=sunN(depth),phi=rec.angle||137.5,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th;
  for(i=0;i<n;i++){
    r=c*Math.sqrt(i);th=i*phi*Math.PI/180;
    x.fillStyle=ink('sunflower',i>=n-Math.max(8,n/8)?depth:0,Math.max(1,depth));
    x.beginPath();x.arc(W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.5,3.1-i/n*1.5),0,Math.PI*2);x.fill();
  }
}
var DRAW={sunflower:dSun,koch:dKoch,htree:dH,levy:dLevy,apollonian:dApol,pascal:dPas,chaos:dChaos,hexrings:dHex,ripples:dRip,antler:dAnt,tree:dTreeSea};

function d9(cv,rec){
  if(!cv||!rec)return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,fn=DRAW[rec.shape];
  if(!fn)return;
  bg(x,W,H);
  if(rec._rest){starsOn(x,W,H,1);return}
  if((rec.depth||0)<=0&&rec.shape!=='ripples'&&rec.shape!=='hexrings'&&rec.shape!=='pascal'){
    x.fillStyle=GOLD;x.beginPath();x.arc(W/2,H*0.7,5,0,Math.PI*2);x.fill();return;
  }
  fn(x,W,H,rec);
}

/* ---- counts, singing, breath, rest ---- */
function fibArms(n){
  var f=[1,1,2,3,5,8,13,21,34,55,89,144,233,377],i;
  for(i=2;i<f.length;i++){
    if(f[i]===n)return {a:f[i-2],b:f[i-1]};
    if(f[i]>n)return {a:f[Math.max(0,i-2)],b:f[i-1]};
  }
  return {a:34,b:55};
}
function jarSVG(n,label){
  var N=Math.max(0,n|0),show=Math.min(N,89),cols=8,i,dots='',r,c,x,y,rows=Math.ceil(show/cols)||1;
  for(i=0;i<show;i++){r=Math.floor(i/cols);c=i%cols;x=18+c*10;y=100-(r+1)*9;dots+='<circle cx="'+x+'" cy="'+y+'" r="2.2" fill="'+A+'"/>'}
  return '<div class="g3jar" data-gaf3jar="1"><p class="soft">'+e(t('How many?'))+'</p>'+
    '<svg viewBox="0 0 96 112" width="96" height="112" aria-hidden="true">'+
    '<path d="M28 8 H68 L74 18 V96 Q74 106 48 106 Q22 106 22 96 V18 Z" fill="none" stroke="'+I+'" stroke-width="2.2"/>'+
    '<path d="M24 18 H72" stroke="'+I+'" stroke-width="1.5"/>'+dots+'</svg>'+
    '<p class="g9c" style="margin:4px 0 0">'+e(String(N))+(label?' <span class="soft">'+e(label)+'</span>':'')+'</p></div>';
}
function sing(rec,level){
  if(!sfx())return;
  var c=acx();if(!c)return;
  var se=Math.max(0,Math.min(3,rec&&rec.season||0)),ratio=SHR[se]||0.68,base=220,freq=base/ratio*Math.pow(1/ratio,Math.max(0,(level||1)-1));
  freq=Math.max(180,Math.min(880,freq));
  var t0=c.currentTime+0.02,vol=(night()||(document.body&&document.body.classList.contains('bedtime')))?0.035:0.06;
  try{
    var o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=freq;
    g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+0.06);g.gain.exponentialRampToValueAtTime(0.0008,t0+0.9);
    o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+1);
    VO.push(o);while(VO.length>4){try{VO.shift().stop()}catch(ex){}}
  }catch(ex){}
}
function stopBreath(){if(BT){clearTimeout(BT);BT=null}HOLD=0}
function startBreath(){
  var g=grow();if(!g||rd())return;
  if((g.depth||0)>=capOf(g.shape))return;
  g._br=1;HOLD=0;
  function tick(){
    BT=null;g=grow();
    if(!g||!g._br||HOLD||rd())return;
    if((g.depth||0)>=capOf(g.shape)){g._br=0;maybeRest();return}
    if(typeof patGrowStep106==='function')patGrowStep106();
    if(g._br&&(g.depth||0)<capOf(g.shape))BT=setTimeout(tick,4000);
    else {g._br=0;maybeRest()}
  }
  BT=setTimeout(tick,4000);
}
function starPts(){
  var i,out=[];
  for(i=0;i<12;i++)out.push([0.5+Math.cos(i*Math.PI/6-Math.PI/2)*0.32,0.5+Math.sin(i*Math.PI/6-Math.PI/2)*0.32]);
  return out;
}
function starsOn(x,W,H,a){
  var pts=starPts(),i;
  x.globalAlpha=a;
  for(i=0;i<pts.length;i++){
    x.fillStyle='#f7f1e6';x.beginPath();x.arc(pts[i][0]*W,pts[i][1]*H,4,0,Math.PI*2);x.fill();
    x.fillStyle=A;x.beginPath();x.arc(pts[i][0]*W,pts[i][1]*H,2.2,0,Math.PI*2);x.fill();
  }
  x.globalAlpha=1;
}
function fadeRest(cv,done){
  if(!cv){if(done)done();return}
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,img,t0,ms=1200;
  try{img=x.getImageData(0,0,W,H)}catch(ex){if(done)done();return}
  if(rd()){bg(x,W,H);starsOn(x,W,H,1);if(done)done();return}
  t0=performance.now();
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/ms));
    x.putImageData(img,0,0);
    x.fillStyle=night()?'rgba(13,15,26,'+u+')':'rgba(255,248,236,'+u+')';
    x.fillRect(0,0,W,H);
    starsOn(x,W,H,u);
    if(u<1)requestAnimationFrame(tick);else if(done)done();
  })(t0);
}
function maybeRest(){
  var g=grow(),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
  if(!g||!cv)return;
  if((g.depth||0)<capOf(g.shape))return;
  if(g._rest)return;
  g._rest=1;g._br=0;stopBreath();
  g.msg=t('It found its rest.');
  fadeRest(cv,function(){var g=grow();if(g&&g.msg&&/as far as this seed grows/i.test(g.msg)){/* keep cap line */}if(typeof patGrowDraw106==='function')patGrowDraw106()});
}
function skyKey(){return 'lamp_gaf3sky@'+pid()}
function skyLoad(){try{var r=rG(skyKey());return r?JSON.parse(r):{rings:[]}}catch(ex){return {rings:[]}}}
function skySave(d){rS(skyKey(),JSON.stringify({rings:(d.rings||[]).slice(-6)}))}
function floatSky(){
  var g=grow(),data=skyLoad(),pts=starPts();
  data.rings.push({shape:g.shape||'tree',dots:pts,when:(typeof lampDay74==='function'?lampDay74():'')});
  skySave(data);
  g.msg=t("It's in the Sky.");
  if(typeof patGrowDraw106==='function')patGrowDraw106();
}
function paintSky(host){
  var data=skyLoad(),rings=data.rings||[],wrap,sky,i,j,pts,btn,x,y;
  if(!rings.length||!host)return;
  wrap=host.querySelector(':scope > [data-lamp73-slot="home"], :scope > .lamp76-hero')||host;
  sky=wrap.querySelector('[data-gaf3sky]');
  if(!sky){sky=document.createElement('div');sky.className='lamp81-sky g3sky';sky.setAttribute('data-gaf3sky','1');sky.innerHTML='<div class="lamp81-stars" role="list" aria-label="'+e(t('A star ring from your fractal. It stays on this device.'))+'"></div>';wrap.style.position=wrap.style.position||'relative';wrap.appendChild(sky)}
  var box=sky.querySelector('.lamp81-stars');if(!box)return;
  box.innerHTML='';
  for(i=0;i<rings.length;i++){
    pts=rings[i].dots||[];
    for(j=0;j<pts.length;j++){
      x=(pts[j][0]*80+10).toFixed(2);y=(pts[j][1]*70+8).toFixed(2);
      btn=document.createElement('button');btn.type='button';btn.className='lamp81-star';
      btn.style.setProperty('--x',x+'%');btn.style.setProperty('--y',y+'%');btn.style.setProperty('--n','1');
      btn.setAttribute('aria-label',t('A star ring from your fractal. It stays on this device.'));
      btn.innerHTML='<span class="lamp81-star-dot" aria-hidden="true"></span>';
      box.appendChild(btn);
    }
  }
}

/* ---- companions (no Dragon egg art) ---- */
function pic(kind){
  var art='',ids,i;
  if(kind==='dragon')return '<span class="g3dot" aria-hidden="true"></span>';
  if(kind==='turtle')ids=['turtle'];
  else if(kind==='deer')ids=['deer_m','deer','deer_f'];
  else if(kind==='firefly')ids=['firefly_f','firefly','firefly_m'];
  else ids=[];
  for(i=0;i<ids.length;i++){
    try{if(typeof friendArt101==='function')art=friendArt101(ids[i],1)||friendArt101(ids[i],3)}catch(ex){}
    if(!art)try{
      var prev=root.FRIEND_ART_CTX101;
      root.FRIEND_ART_CTX101=ids[i];
      if(typeof lampSvg73==='function')art=lampSvg73(1,'',false)||lampSvg73(3,'',false);
      root.FRIEND_ART_CTX101=prev;
    }catch(ex){try{root.FRIEND_ART_CTX101=prev}catch(e2){}}
    if(art)return art;
  }
  if(kind==='fern')return '<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M22 40 C20 26 16 16 10 8 M22 40 C24 26 28 16 34 8 M22 28 C16 26 12 22 8 18 M22 28 C28 26 32 22 36 18" fill="none" stroke="#4e6b5c" stroke-width="2" stroke-linecap="round"/></svg>';
  if(kind==='bee')return '<svg viewBox="0 0 44 44" aria-hidden="true"><polygon points="22,8 34,15 34,29 22,36 10,29 10,15" fill="none" stroke="'+A+'" stroke-width="2"/></svg>';
  return '<span class="g3dot" aria-hidden="true"></span>';
}
function setFriend(kind){
  var g=grow(),sh=FRI[kind];if(!g||!sh)return;
  stopBreath();g._rest=0;g._br=0;g._friend=kind;
  if(typeof patGrowSet106==='function')patGrowSet106('shape',sh);
  g=grow();g.msg=t(LINE[kind]||'Look closer. It\'s here again.');
  if(sh==='chaos'){g.poly=3;g.angle=50}
  if(sh==='pascal')g.angle=2;
  if(sh==='sunflower')g.angle=137.5;
  if(typeof patGrowDraw106==='function')patGrowDraw106();
}

function extraUI(){
  css();
  var el=document.getElementById('patterns');if(!el)return;
  var g=grow(),cv=document.getElementById('patGrowCv'),host,row,n,lab;
  if(!g)return;
  /* regroup new shape buttons */
  var btns=[].slice.call(el.querySelectorAll('button[onclick*="patGrowSet106(\'shape\'"]'));
  var more=el.querySelector('[data-gaf3more]');
  if(!more){more=document.createElement('div');more.className='g3row';more.setAttribute('data-gaf3more','1');more.setAttribute('aria-label',t('More seeds'));
    if(btns[0]&&btns[0].parentNode)btns[0].parentNode.insertAdjacentElement('afterend',more);else if(cv)cv.insertAdjacentElement('beforebegin',more)}
  btns.forEach(function(btn){
    var m=/patGrowSet106\('shape','([^']+)'\)/.exec(btn.getAttribute('onclick')||'');
    if(!m)return;
    if(LAB[m[1]]){btn.textContent=t(LAB[m[1]]);if(btn.parentNode!==more)more.appendChild(btn)}
  });
  /* companions */
  host=el.querySelector('[data-gaf3friends]');
  if(!host){host=document.createElement('div');host.setAttribute('data-gaf3friends','1');if(more)more.insertAdjacentElement('beforebegin',host);else if(cv)cv.insertAdjacentElement('beforebegin',host)}
  host.innerHTML='<p class="soft g3msg">'+e(t('Friends'))+'</p><ul class="g3fr">'+
    ['dragon','fern','bee','turtle','deer','firefly'].map(function(k){
      var on=FRI[k]===g.shape?' on':'';
      return '<li><button type="button" data-gaf3fr="'+k+'" class="'+on+'" aria-label="'+e(t({dragon:'Dragon',fern:'Fern',bee:'Bee',turtle:'Turtle',deer:'Deer',firefly:'Firefly'}[k]))+'">'+pic(k)+'<span>'+e(t({dragon:'Dragon',fern:'Fern',bee:'Bee',turtle:'Turtle',deer:'Deer',firefly:'Firefly'}[k]))+'</span></button></li>';
    }).join('')+'</ul>';
  host.querySelectorAll('[data-gaf3fr]').forEach(function(b){b.onclick=function(){setFriend(b.getAttribute('data-gaf3fr'))}});

  /* seasons, breathe, chaos/pascal dials */
  row=el.querySelector('[data-gaf3ctrl]');
  if(!row){row=document.createElement('div');row.className='g3row';row.setAttribute('data-gaf3ctrl','1');if(cv)cv.insertAdjacentElement('afterend',row);else el.appendChild(row)}
  var html='';
  if(g.shape==='tree'||g.shape==='antler'||g.shape==='pythagoras'){
    lab=['Bare','Budding','Leafy','Falling'][g.season||0];
    html+='<button type="button" class="g3btn" data-gaf3season="1">'+e(t('Season'))+': '+e(t(lab))+'</button>';
  }
  if(g.shape==='chaos'){
    html+='<button type="button" class="g3btn" data-gaf3poly="1">'+e(t('Corners'))+': '+e(String(g.poly||3))+'</button>';
    html+='<button type="button" class="g3btn" data-gaf3jump="1">'+e(t('Jump'))+': '+(g.angle||50)/100+'</button>';
  }
  if(g.shape==='pascal'){
    html+='<button type="button" class="g3btn" data-gaf3mod="1">'+e(t('Mod {n}',{n:String(g.angle===5?5:g.angle===3?3:2)}))+'</button>';
  }
  if(!rd())html+='<button type="button" class="g3btn" data-gaf3breathe="1" aria-pressed="'+(g._br?'true':'false')+'">'+e(g._br?t('Pause'):t('Breathe'))+'</button>';
  if(g._rest||(g.depth||0)>=capOf(g.shape)){
    html+='<button type="button" class="g3btn" data-gaf3float="1">'+e(t('Float to the Sky'))+'</button>';
  }
  row.innerHTML=html;
  var b=row.querySelector('[data-gaf3season]');
  if(b)b.onclick=function(){g.season=((g.season||0)+1)%4;if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3poly]');
  if(b)b.onclick=function(){g.poly=(g.poly||3)>=6?3:(g.poly||3)+1;if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3jump]');
  if(b)b.onclick=function(){var o=[33,38,50],i=o.indexOf(Math.round(g.angle||50));g.angle=o[(i+1)%3];if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3mod]');
  if(b)b.onclick=function(){g.angle=g.angle===2?3:g.angle===3?5:2;if(typeof patGrowDraw106==='function')patGrowDraw106()};
  b=row.querySelector('[data-gaf3breathe]');
  if(b){
    b.onclick=function(){if(g._br){g._br=0;stopBreath();if(typeof patGrowDraw106==='function')patGrowDraw106()}else startBreath()};
    b.onpointerdown=function(){if(g._br)HOLD=1};
    ['pointerup','pointerleave','pointercancel'].forEach(function(n){b.addEventListener(n,function(){if(g._br)HOLD=0})});
  }
  b=row.querySelector('[data-gaf3float]');
  if(b)b.onclick=function(){if(!g._rest){g._rest=1;var c=document.getElementById('patGrowCv');fadeRest(c,floatSky)}else floatSky()};

  if((g.depth||0)>=capOf(g.shape)&&!g._rest&&!(g.msg&&/as far as this seed grows/i.test(g.msg))&&!g.msg)g.msg=t('It found its rest.');
  /* jar */
  n=copies(g);
  var slot=el.querySelector('[data-gaf3jar]');
  if((g.depth||0)>0){
    var jh=jarSVG(n,'');
    if(slot)slot.outerHTML=jh;else if(cv){(slot=document.getElementById('gaf149count'));if(slot){slot.hidden=true;slot.insertAdjacentHTML('afterend',jh)}else cv.insertAdjacentElement('afterend',(function(){var d=document.createElement('div');d.innerHTML=jh;return d.firstChild})())}
  }else if(slot)slot.remove();

  /* sunflower / apollonian / chaos lines */
  if(g.shape==='sunflower'&&(g.depth||0)>0){
    if(Math.abs((g.angle||0)-137.5)<0.6){var fa=fibArms(copies(g));g.msg=t('The spirals you can count: {a} and {b}.',{a:String(fa.a),b:String(fa.b)})+' '+t('At this turn the seeds pack tight.')}
    else if(Math.abs((g.angle||0)-135)<0.6)g.msg=t('At this turn they line up in spokes.');
  }
  if(g.shape==='apollonian'&&(g.depth||0)>0&&!g._rest)g.msg=t("Every circle's number is a whole number.");
  if(g.shape==='chaos'&&(g.depth||0)>0&&!g._rest)g.msg=t('A little jump, again and again.');
  if(g.shape==='pascal'&&(g.depth||0)>0&&!g._rest)g.msg=t('These two add up to the one below.');
  var msg=document.getElementById('patGrowMsg');
  if(msg&&g.msg)msg.textContent=g.msg;
  var hold=el.querySelector('[data-gaf3hold]');
  if(!hold&&!rd()){hold=document.createElement('p');hold.className='soft g3msg';hold.setAttribute('data-gaf3hold','1');hold.textContent=t('Hold to pause, like a held breath.');row.insertAdjacentElement('afterend',hold)}
}

function parseWrap(prev){
  return function(vals){
    var rec=prev?prev.apply(this,arguments):null,SH=shapes(),a,sh;
    if(rec)return rec;
    if(!vals||vals.length<4)return null;
    a=Number(vals[0]);if(a!==(a|0)||a<0||a>=SH.length)return null;
    sh=SH[a];
    if(sh==='pascal'){
      var m=Number(vals[2]);if(!(m===2||m===3||m===5))return null;
      var d=Number(vals[3]);if(d!==(d|0)||d<0||d>capOf(sh))return null;
      var pal=Number(vals[1]);if(pal!==(pal|0)||pal<0)return null;
      return {shape:sh,shapeI:a,pal:pal,angle:m,depth:d};
    }
    return null;
  };
}

function install(){
  css();
  if(typeof PAT_SHAPES106!=='undefined')SHN.forEach(function(id){if(PAT_SHAPES106.indexOf(id)<0)PAT_SHAPES106.push(id)});
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'&&!IL150.capOf._v154){
    var c0=IL150.capOf;IL150.capOf=function(sh){return CAP[sh]!=null?CAP[sh]:c0(sh)};IL150.capOf._v154=1;IL150.capOf._base=c0._base||c0;
  }
  if(typeof IL151==='object'&&typeof IL151.parseCode==='function'&&!IL151.parseCode._v154){
    var p0=IL151.parseCode,nw=parseWrap(p0);nw._v154=1;nw._base=p0._base||p0;IL151.parseCode=nw;
  }
  hook('patGrowDrawOn106',function(prev){return function(cv,rec){rec=rec||{};if(DRAW[rec.shape]){d9(cv,rec);return}if(rec.shape==='tree'&&(rec.season||0)>0){var x=cv.getContext('2d');bg(x,cv.width,cv.height);if((rec.depth||0)<=0){x.fillStyle=GOLD;x.beginPath();x.arc(cv.width/2,cv.height*0.7,5,0,Math.PI*2);x.fill();return}dTreeSea(x,cv.width,cv.height,rec);return}if(rec._rest){var x=cv.getContext('2d');bg(x,cv.width,cv.height);starsOn(x,cv.width,cv.height,1);return}return prev.apply(this,arguments)}});
  hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{extraUI()}catch(ex){}return r}});
  hook('patGrowSet106',function(prev){return function(k,v){var g=grow();if(k==='shape'&&g){g._rest=0;g._br=0;g._friend='';stopBreath();if(v==='pascal')g.angle=2;else if(v==='chaos'){g.angle=50;g.poly=g.poly||3}else if(v==='sunflower')g.angle=g.angle&&g.angle>=120?g.angle:137.5}var r=prev.apply(this,arguments);return r}});
  hook('patGrowTwist106',function(prev){return function(d){var g=grow();if(g&&g.shape==='pascal'){g.angle=g.angle===2?3:g.angle===3?5:2;if(typeof patGrowDraw106==='function')patGrowDraw106();return}if(g&&g.shape==='chaos'){var o=[33,38,50],i=o.indexOf(Math.round(g.angle||50));g.angle=o[(i+(d>0?1:o.length-1))%3];if(typeof patGrowDraw106==='function')patGrowDraw106();return}if(g&&g.shape==='sunflower'){var r=prev.apply(this,arguments);try{var ang=g.angle||137.5;[135,137.5,144,120].forEach(function(tg){if(Math.abs(ang-tg)<2)g.angle=tg})}catch(ex){}return r}return prev.apply(this,arguments)}});
  hook('patGrowStep106',function(prev){return function(){var g=grow(),r=prev.apply(this,arguments);try{g=grow();if(g&&(g.shape==='tree'||g.shape==='antler'||g.shape==='pythagoras'))sing(g,g.depth||1)}catch(ex){}return r}});
  hook('lampSkyMount81',function(prev){return function(host,pid_){var r=prev.apply(this,arguments);try{paintSky(host)}catch(ex){}return r}});
  hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='patterns')extraUI();if(id==='today'||id==='home'||id==='look'){var h=document.querySelector('.today64')||document.getElementById('today')||document.getElementById(id);if(h)paintSky(h)}}catch(ex){}return r}});
}

root.IL154={version:154,shapes:function(){return shapes().slice()},copies:copies,capOf:capOf,gasket:gasket,starPts:starPts,install:install,floatSky:floatSky,skyLoad:skyLoad,FRI:FRI,SHR:SHR,sing:sing,ink:ink,startBreath:startBreath,stopBreath:stopBreath,fadeRest:fadeRest,sunN:sunN,fibArms:fibArms};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
