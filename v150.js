/* v150: Grow a Fractal 2 hotfix (Pi v149 recheck). No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var RAMP=['#3D6A62','#4e6b5c','#E6B454','#C45A3A'];
var MAX={hilbert:4,fern:5,spirals:2};
var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function rd(){try{return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function grow(){return (typeof PAT106==='object'&&PAT106.grow)||{}}
function col(d){return RAMP[d%4]}
function capOf(sh){return MAX[sh]||6}
function pidKey(){return 'lamp_gaf2@'+(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}
function isOpen(){try{var k=pidKey();return ((typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k))==='1'}catch(ex){return false}}
function markOpen(){try{var k=pidKey();if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,'1');else localStorage.setItem(k,'1')}catch(ex){}}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v150)return;
  var next=wrap(prev);
  next._v150=1;
  /* Keep v149's original _base. nF reads patNatureCard106._base; overwriting it with v149's wrapper recurses. */
  next._base=prev._base||prev;root[name]=next;
}
function lcg(s){s=s>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}}
function fernPts(seed,n){
  if(typeof IL149==='object'&&typeof IL149.fernPts==='function')return IL149.fernPts(seed,n);
  var rnd=lcg(seed||109),pts=new Float32Array(n*2),x=0,y=0,i,k,r,a,nx,ny;
  for(i=0;i<n;i++){
    r=rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];
    nx=a[0]*x+a[1]*y+a[4];ny=a[2]*x+a[3]*y+a[5];x=nx;y=ny;
    pts[i*2]=x;pts[i*2+1]=y;
  }
  return pts;
}
/* Collect Pythagoras squares with Pi's 3-line child placement. */
function treeBoxes(angDeg,depth){
  var boxes=[],ang=(angDeg==null?28:angDeg)*Math.PI/180;
  depth=Math.max(0,Math.min(6,depth||0));
  function sq(px,py,s,a,d){
    if(d>depth||s<2)return;
    var c=Math.cos(a),si=Math.sin(a);
    var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
    boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
    if(d===depth)return;
    var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
    var bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
    sq(x2,y2,sl,a-ang,d+1);
    sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
  }
  var s0=360*0.16;
  sq(360/2-s0/2,360*0.86,s0,-Math.PI/2,0);
  return boxes;
}
function drawPyth(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('pythagoras'),rec.depth||0));
  var ang=(rec.angle||28)*Math.PI/180,boxes=[];
  function sq(px,py,s,a,d){
    if(d>depth||s<2)return;
    var c=Math.cos(a),si=Math.sin(a);
    var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
    boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
    if(d===depth)return;
    var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
    var bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
    sq(x2,y2,sl,a-ang,d+1);
    sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
  }
  var s0=Math.min(W,H)*0.16;
  sq(W/2-s0/2,H*0.86,s0,-Math.PI/2,0);
  rec._n=0;
  for(var i=0;i<boxes.length;i++) if(boxes[i].d===depth) rec._n++;
  if(!boxes.length)return;
  var minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9,j,p,b;
  for(i=0;i<boxes.length;i++) for(j=0;j<4;j++){
    p=boxes[i].P[j];
    if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
    if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
  }
  var pad=Math.min(W,H)*0.08,sc=Math.min((W-2*pad)/Math.max(maxx-minx,1e-6),(H-2*pad)/Math.max(maxy-miny,1e-6));
  var cx=(minx+maxx)/2,cy=(miny+maxy)/2;
  function mx(v){return W/2+(v-cx)*sc}
  function my(v){return H/2+(v-cy)*sc}
  for(i=0;i<boxes.length;i++){
    b=boxes[i];p=b.P;
    x.fillStyle=x.strokeStyle=col(b.d);
    x.lineWidth=Math.max(1.5,3-b.d*.35);
    x.beginPath();x.moveTo(mx(p[0][0]),my(p[0][1]));
    for(j=1;j<4;j++)x.lineTo(mx(p[j][0]),my(p[j][1]));
    x.closePath();x.fill();x.stroke();
  }
}
function drawHil(x,W,H,rec){
  var n=Math.max(1,Math.min(4,rec.depth||1)),pts,i,pad=W*0.08,span=W-pad*2,N=(1<<n)-1||1;
  if(typeof IL149==='object'&&typeof IL149.hilbert==='function')pts=IL149.hilbert(n);
  else return;
  x.strokeStyle=col(2);x.lineWidth=Math.max(2,5-n);x.lineCap='round';x.beginPath();
  for(i=0;i<pts.length;i++){
    var X=pad+pts[i][0]/N*span,Y=pad+pts[i][1]/N*span;
    i?x.lineTo(X,Y):x.moveTo(X,Y);
  }
  x.stroke();
  rec._hil=pts;rec._hilN=N;rec._hilPad=pad;rec._hilSpan=span;
}
function drawSpirals(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('spirals'),rec.depth||0)),n=0;
  function sp(cx,cy,s,rot,d){
    if(d>depth||s<4)return;
    n++;
    x.strokeStyle=col(d);x.lineWidth=Math.max(1.8,2.4-d*.3);x.beginPath();
    var i,r,a,first=1,px,py;
    for(i=0;i<=90;i++){
      a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;
      first?(x.moveTo(px,py),first=0):x.lineTo(px,py);
    }
    x.stroke();
    if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*.32,rot+.4,d+1)}
  }
  sp(W/2,H/2,Math.min(W,H)*0.28,0,0);
  rec._n=n;
}
function fernDot(W,H,pts,i){return [W*(.5+pts[i*2]*0.18),H*(.92-pts[i*2+1]*0.082)]}
function drawFernRange(x,W,H,pts,from,to){
  x.fillStyle=col(2);
  for(var i=from;i<to;i++){
    var p=fernDot(W,H,pts,i);
    x.fillRect(p[0],p[1],1.6,1.6);
  }
}
function clearCv(cv){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  x.fillStyle=night()?'#0d0f1a':'#fff8ec';x.fillRect(0,0,W,H);
  x.lineCap='round';x.lineJoin='round';
  return {x:x,W:W,H:H};
}
function drawFernFull(x,W,H,rec,upto){
  var n=Math.max(1,Math.min(20000,upto||((rec.depth||1)*4000)));
  drawFernRange(x,W,H,fernPts(rec.seed||109,n),0,n);
  rec._n=n;
}
var block=0;
function runFern(cv,rec,from,to,clearFirst){
  if(!rec)return;
  cv=cv||(typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'));
  if(!cv)return;
  var tok=cv._f150=(cv._f150||0)+1;
  rec._fernTok=tok;
  var cap=Math.max(1,Math.min(20000,to));
  from=Math.max(0,Math.min(from||0,cap));
  if(rd()){
    var c=clearCv(cv);drawFernFull(c.x,c.W,c.H,rec,cap);block=0;rec._fernN=cv._fernN=cap;rec._n=cap;updateCount(rec);return;
  }
  block=1;
  var pts=fernPts(rec.seed||109,cap),x=cv.getContext('2d'),W=cv.width,H=cv.height,n=from;
  if(clearFirst){clearCv(cv);n=0}
  else if(n>0){clearCv(cv);drawFernRange(x,W,H,pts,0,n)}
  else clearCv(cv);
  (function tick(){
    if(cv._f150!==tok)return;
    var next=Math.min(cap,n+15);
    drawFernRange(x,W,H,pts,n,next);
    n=next;rec._fernN=cv._fernN=n;rec._n=n;updateCount(rec);
    if(n<cap)setTimeout(tick,50);
    else if(cv._f150===tok)block=0;
  })();
}
function cancelFern(cv){if(cv)cv._f150=(cv._f150||0)+1;block=0}
function copies(rec){
  rec=rec||{};
  var d=rec.depth||0,sh=rec.shape;
  if(sh==='pythagoras'||sh==='spirals'){
    if(rec._n!=null)return rec._n;
    if(sh==='spirals')return (Math.pow(5,Math.max(0,Math.min(capOf('spirals'),d))+1)-1)/4;
    return 0;
  }
  if(sh==='hilbert')return Math.pow(4,Math.max(0,d-1));
  if(sh==='fern')return rec._n!=null?rec._n:Math.min(20000,Math.max(0,d)*4000);
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='sunflower')return Math.min(240,8+d*d*8);
  return Math.pow(2,d);
}
function updateCount(rec){
  var slot=typeof $==='function'?$('gaf149count'):document.getElementById('gaf149count');
  if(slot)slot.textContent=String(copies(rec||grow()));
}
function draw150(cv,rec){
  rec=rec||{};
  var sh=rec.shape;
  if(sh==='fern'&&cv&&cv.id==='patGrowCv'&&block)return;
  if(sh==='fern'||sh==='pythagoras'||sh==='hilbert'||sh==='spirals'){
    var c=clearCv(cv);
    if(sh==='fern')drawFernFull(c.x,c.W,c.H,rec);
    else if(sh==='pythagoras')drawPyth(c.x,c.W,c.H,rec);
    else if(sh==='hilbert')drawHil(c.x,c.W,c.H,rec);
    else drawSpirals(c.x,c.W,c.H,rec);
    return true;
  }
  return false;
}
function thicken(rootEl){
  if(!rootEl)return;
  [].forEach.call(rootEl.querySelectorAll('svg [stroke]'),function(n){
    var w=parseFloat(n.getAttribute('stroke-width')||'1');
    if(!(w>=1.8))n.setAttribute('stroke-width','1.8');
  });
}
function relabelRecipe(el){
  if(!el)return;
  [].forEach.call(el.querySelectorAll('[data-gafcode149] figcaption .soft, #gaf149print figcaption .soft'),function(s){
    if(s.textContent===t('Seed')||s.textContent==='Seed'||s.textContent==='Semilla')s.textContent=t('Shape');
  });
  thicken(el.querySelector('[data-gafcode149]'));
  thicken(document.getElementById('gaf149print'));
}
function fixAdults(){
  var card=document.querySelector('[data-gafad149]');if(!card)return;
  var kochOld=t('A Koch edge keeps getting longer, but the area it encloses never gets bigger.');
  var kochNew=t('A Koch snowflake\'s edge gets 4/3 longer at every step, forever, but its area never grows past 8/5 of the first triangle.');
  var credOld=t('People drew this long ago: Haeckel, Plate 52 (1904); Blossfeldt, 1928; Bentley, 1902; Koch, 1904; Dürer, 1525.');
  var credNew=t('People drew and photographed this long ago: Haeckel, Plate 52 (1904); Blossfeldt, 1928; Bentley, 1902; Koch, 1904; Dürer, 1525.');
  [].forEach.call(card.querySelectorAll('p'),function(p){
    var txt=p.textContent||'';
    if(txt.indexOf('Koch edge')>=0||txt.indexOf('borde de Koch')>=0||txt===kochOld)p.textContent=kochNew;
    if(txt.indexOf('People drew this long ago')>=0||txt.indexOf('la gente dibujó esto')>=0||txt===credOld)p.textContent=credNew;
  });
}
function css150(){
  if(document.getElementById('v150css'))return;
  var s=document.createElement('style');
  s.id='v150css';
  s.textContent='#patGrowCv,.g9w #patGrowCv{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}'+
    '.g9e{margin:8px auto;max-width:22rem;text-align:center}'+
    '.g9e input,.g9e button{min-width:56px;min-height:56px;font-size:1.1rem;margin:4px;padding:8px 10px}'+
    '.g9e input{width:4.6em;text-align:center}';
  document.head.appendChild(s);
}
function shapes150(){
  if(typeof PAT_SHAPES106!=='undefined'&&PAT_SHAPES106&&PAT_SHAPES106.length)return PAT_SHAPES106;
  return ['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];
}
function palMax150(){return (typeof PAT_PAL106!=='undefined'&&PAT_PAL106&&PAT_PAL106.length)?PAT_PAL106.length-1:3}
function nums150(s){
  var out=[],m,re=/-?\d*\.?\d+(?:e[+-]?\d+)?/ig;
  s=Array.isArray(s)?s.join(' '):String(s||'');
  while((m=re.exec(s))&&out.length<4){var n=Number(m[0]);if(isFinite(n))out.push(n)}
  return out;
}
function parseCode150(s){
  var n=nums150(s),SH=shapes150();
  if(n.length<4)return null;
  var si=Math.max(0,Math.min(SH.length-1,Math.round(n[0])));
  var pal=Math.max(0,Math.min(palMax150(),Math.round(n[1])));
  var ang=n[2];
  if(!isFinite(ang))return null;
  var sh=SH[si]||'tree';
  var depth=Math.max(0,Math.min(capOf(sh),Math.round(n[3])));
  return {shape:sh,shapeI:si,pal:pal,angle:ang,depth:depth};
}
function applyCode150(rec){
  var g=grow();
  if(!g||!rec)return;
  cancelFern(typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'));
  g.shape=rec.shape;g.pal=rec.pal;g.angle=rec.angle;g.depth=rec.depth;g.msg='';g._n=null;g._fernN=0;
  if(g.shape==='fern'&&!g.seed)g.seed=109;
  if(g.q)g.q.length=0;g.busy=false;
  markOpen();
  block=g.shape==='fern'?1:0;
  if(typeof patGrowDraw106==='function')patGrowDraw106();
  if(g.shape==='fern'&&g.depth>0){
    var cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
    runFern(cv,g,0,Math.min(20000,g.depth*4000),true);
  }
}
function bindLoader150(el){
  var host=el&&el.querySelector('[data-gafcode149]');
  if(!host||host.querySelector('[data-gafload150]'))return;
  var box=document.createElement('div');
  box.className='g9e';box.setAttribute('data-gafload150','1');
  var labs=[t('Shape'),t('Palette'),t('Bend'),t('Grow')];
  var html='';
  for(var i=0;i<4;i++)html+='<input type="text" inputmode="decimal" aria-label="'+labs[i]+'" data-gafn="'+i+'">';
  html+='<button type="button" class="p" data-gafloadgo="1">'+t('Load recipe')+'</button>';
  html+='<p class="soft" data-gafloadmsg="1" hidden></p>';
  box.innerHTML=html;
  host.appendChild(box);
  var go=box.querySelector('[data-gafloadgo]');
  function run(){
    var vals=[].map.call(box.querySelectorAll('[data-gafn]'),function(inp){return inp.value});
    var rec=parseCode150(vals),msg=box.querySelector('[data-gafloadmsg]');
    if(!rec){
      if(msg){msg.hidden=false;msg.textContent=t("That code isn't one I can read.");}
      return;
    }
    if(msg){msg.hidden=true;msg.textContent='';}
    applyCode150(rec);
  }
  if(go)go.onclick=run;
  box.addEventListener('keydown',function(ev){if(ev.key==='Enter'){ev.preventDefault();run()}});
}
function peekArt150(active){
  var art='',prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
  try{
    if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=active;
    art=typeof lampSvg73==='function'?lampSvg73(3,'',false):'';
  }finally{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev;}
  return art;
}
function fixPeek150(){
  var cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'),g=grow();
  if(!cv)return;
  var host=cv.parentElement,peek=host&&host.querySelector('.g9p');
  var active='';
  try{active=typeof friendActive101==='function'?friendActive101(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():'')):''}catch(ex){}
  var want=(typeof IL149==='object'&&IL149.secret)?IL149.secret[active]:null;
  if(host&&want&&want===g.shape&&(g.depth||0)>=1){
    if(!peek){peek=document.createElement('div');peek.className='g9p';host.appendChild(peek)}
    var art=peekArt150(active);
    if(art)peek.innerHTML=art;
    peek.hidden=false;
  }else if(peek)peek.hidden=true;
}
var DIM_MS=360,DIM_A=.45;
function fadeDim150(cv,on){
  if(!cv||rd())return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,st=cv._dim150||(cv._dim150={});
  if(!st.img){try{st.img=x.getImageData(0,0,W,H)}catch(ex){return}}
  if(st.raf)cancelAnimationFrame(st.raf);
  var from=st.a||0,to=on?DIM_A:0,t0=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
  function paint(a){
    x.putImageData(st.img,0,0);
    if(a>0.001){
      x.fillStyle='rgba(13,15,26,'+a+')';
      x.fillRect(0,0,W,H);
      x.save();x.beginPath();x.arc(W*.62,H*.38,Math.min(W,H)*.16,0,Math.PI*2);x.clip();x.putImageData(st.img,0,0);x.restore();
    }
    st.a=a;
  }
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/DIM_MS));
    paint(from+(to-from)*u);
    if(u<1)st.raf=requestAnimationFrame(tick);
    else{st.raf=0;if(!on){st.img=null;st.a=0}}
  })(t0);
}
function bindDim150(cv){
  if(!cv||cv._lp150)return;
  cv._lp150=1;
  var hold=null,on=0;
  cv.addEventListener('pointerdown',function(ev){
    ev.stopImmediatePropagation();
    if(hold)clearTimeout(hold);
    hold=setTimeout(function(){on=1;fadeDim150(cv,true)},400);
  },true);
  function end(){if(hold)clearTimeout(hold);hold=null;if(on){fadeDim150(cv,false);on=0}}
  ['pointerup','pointerleave','pointercancel'].forEach(function(n){cv.addEventListener(n,end,true)});
  cv.addEventListener('contextmenu',function(ev){ev.preventDefault()});
}
function finishTour148(){
  try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set('lamp_tour148','1');else localStorage.setItem('lamp_tour148','1')}catch(ex){}
  try{
    var pid=typeof curPid==='function'?curPid():'';
    var f=typeof friendsLoad101==='function'?friendsLoad101(pid):null;
    if(f){f.offered=true;if(typeof friendsPut101==='function')friendsPut101(f,pid)}
  }catch(ex){}
  var d=document.querySelector('dialog.tour148');
  if(d&&d.open)try{d.close()}catch(ex){}
  if(d)d.remove();
}
function patchTour150(d){
  if(!d||d._v150)return;
  d._v150=1;
  if(!d.querySelector('[data-tour-skip]')){
    var row=document.createElement('div');row.className='row148';
    var b=document.createElement('button');
    b.type='button';b.setAttribute('data-tour-skip','1');b.textContent=t('Skip');
    b.style.minWidth='56px';b.style.minHeight='56px';
    b.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();finishTour148()});
    row.appendChild(b);d.appendChild(row);
  }
  d.addEventListener('cancel',function(){finishTour148()});
}
function watchTour150(){
  if(watchTour150._on)return;watchTour150._on=1;
  function scan(){var d=document.querySelector('dialog.tour148');if(d)patchTour150(d)}
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
  scan();
}
function hookFn150(obj,name,wrap){
  if(!obj)return;
  var prev=obj[name];
  if(typeof prev!=='function'||prev._v150)return;
  var next=wrap(prev);next._v150=1;obj[name]=next;
}
function bindCandleNight150(){
  var night=document.getElementById('candleNight129');
  if(night)night.onclick=function(){if(root.LampCandle129&&typeof LampCandle129.goodNight==='function')LampCandle129.goodNight()};
  var line=document.getElementById('candleLine129');
  if(line&&!line._v150){
    line._v150=1;
    new MutationObserver(function(){
      var txt=line.textContent||'';
      if(!/Good night|Buenas noches/i.test(txt))return;
      var host=document.getElementById('candleLamp129');
      if(host&&root.IL148&&typeof IL148.pose==='function')IL148.pose(host);
    }).observe(line,{childList:true,characterData:true,subtree:true});
  }
}
function hookCandle150(){
  hookFn150(root.LampCandle129,'goodNight',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{
        var host=document.getElementById('candleLamp129')||document.querySelector('#candle .lamp73-shell')||document.getElementById('candle');
        if(host&&root.IL148&&typeof IL148.pose==='function')IL148.pose(host);
      }catch(ex){}
      return r;
    };
  });
  hookFn150(root.LampCandle129,'render',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{bindCandleNight150()}catch(ex){}
      return r;
    };
  });
  if(typeof RENDER==='object'&&root.LampCandle129)RENDER.candle=root.LampCandle129.render;
  bindCandleNight150();
}
function polish(){

  var g=grow(),el=typeof $==='function'?$('patterns'):document.getElementById('patterns'),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
  if((g.depth||0)>0 && (g.shape==='pythagoras'||g.shape==='spirals') && g._n==null && cv){
    /* ensure a count if draw ran before the hook */
  }
  css150();
  updateCount(g);
  if(el){
    relabelRecipe(el);
    bindLoader150(el);
    var again=el.querySelector('[data-gafern149]');
    if(again)again.onclick=function(){var g2=grow();if(!g2.seed)g2.seed=109;var c2=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');runFern(c2,g2,0,Math.min(20000,(g2.depth||1)*4000),true)};
    thicken(el.querySelector('#patNature106'));
  }
  fixPeek150();
  bindDim150(cv);
  fixAdults();
}
function install(){
  css150();
  hookCandle150();
  watchTour150();
  hookFn150(root.IL148,'startTour',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      watchTour150();
      return r;
    };
  });
  if(typeof root.finishTour148!=='function')root.finishTour148=finishTour148;
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(draw150(cv,rec))return;
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{polish()}catch(ex){}
      return r;
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow(),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'),self=this,args=arguments;
      if(g&&g.shape==='spirals'){
        var cap=capOf('spirals');
        if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
      }
      if(g&&g.shape==='fern'){
        var capF=capOf('fern');
        if((g.depth||0)>=capF){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if(!g.seed)g.seed=109;
        function go(){
          var from=g._fernN||0;
          g.depth=(g.depth||0)+1;
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          block=1;
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          markOpen();
          var cv2=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
          var to=Math.min(20000,g.depth*4000);
          if(from>=to)from=0;
          runFern(cv2,g,from,to,false);
        }
        if(cv&&!(g.depth>0)){
          if(!isOpen()&&!rd()){
            if(g._ih)return;g._ih=1;
            cv.style.transition='transform 1.2s ease';cv.style.transform='scale(1.03)';
            setTimeout(function(){cv.style.transform='';g._ih=0;go()},400);
            return;
          }
        }
        go();
        return;
      }
      if(cv&&g&&!(g.depth>0)&&!isOpen()&&!rd()){
        /* Visual first-open breath only. Do not set _ih: v149 uses that as a lock and would swallow mashed Grow taps. */
        cv.style.transition='transform 1.2s ease';cv.style.transform='scale(1.03)';
        setTimeout(function(){cv.style.transform=''},400);
        markOpen();
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowSet106'
,function(prev){
    return function(k,v){
      if(k==='shape'){
        var cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
        cancelFern(cv);
        if(cv)cv._fernN=0;
        var g=grow();if(g){g._n=null;g.msg='';g._fernN=0;}
      }
      return prev.apply(this,arguments);
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{
        if(id==='adults')fixAdults();
        if(id==='patterns')polish();
        if(id==='candle')bindCandleNight150();
        if(id==='hub'||!id)watchTour150();
      }catch(ex){}
      return r;
    };
  });
  hook('patNatureCard106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{var nat=typeof $==='function'?$('patNature106'):document.getElementById('patNature106');thicken(nat)}catch(ex){}
      return r;
    };
  });
  if(typeof IL149==='object')IL149.copies=copies;
  if(document.getElementById('patterns'))try{polish()}catch(ex){}
  if(document.getElementById('adults'))try{fixAdults()}catch(ex){}
}
root.IL150={version:150,copies:copies,treeBoxes:treeBoxes,runFern:runFern,install:install,capOf:capOf,parseCode:parseCode150,applyCode:applyCode150,fadeDim:fadeDim150};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
