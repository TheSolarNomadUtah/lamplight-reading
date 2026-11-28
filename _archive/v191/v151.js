/* v151: fern loop survives canvas rebuild; per-box recipe parse. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var FTOK=0,block=0,RAMP=['#3D6A62','#4e6b5c','#E6B454','#C45A3A'];
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function rd(){try{return (typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function grow(){return (typeof PAT106==='object'&&PAT106.grow)||{}}
function capOf(sh){return (typeof IL150==='object'&&IL150.capOf)?IL150.capOf(sh):(sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:6)}
function pidKey(){return 'lamp_gaf2@'+(typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():''))}
function isOpen(){try{var k=pidKey();return ((typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k))==='1'}catch(ex){return false}}
function markOpen(){try{var k=pidKey();if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,'1');else localStorage.setItem(k,'1')}catch(ex){}}
function hook(name,wrap){
  var prev=root[name];
  if(typeof prev!=='function'||prev._v151)return;
  var next=wrap(prev);
  next._v151=1;
  next._base=prev._base||prev;
  root[name]=next;
}
function curCv(){return typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv')}
function fernPts(seed,n){
  if(typeof IL149==='object'&&typeof IL149.fernPts==='function')return IL149.fernPts(seed,n);
  if(typeof IL150==='object'&&typeof IL150.fernPts==='function')return IL150.fernPts(seed,n);
  return new Float32Array(n*2);
}
function fernDot(W,H,pts,i){return [W*(.5+pts[i*2]*0.18),H*(.92-pts[i*2+1]*0.082)]}
function drawFernRange(x,W,H,pts,from,to){
  x.fillStyle=RAMP[2];
  for(var i=from;i<to;i++){var p=fernDot(W,H,pts,i);x.fillRect(p[0],p[1],1.6,1.6)}
}
function clearCv(cv){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  x.fillStyle=night()?'#0d0f1a':'#fff8ec';x.fillRect(0,0,W,H);
  x.lineCap='round';x.lineJoin='round';
  return {x:x,W:W,H:H};
}
function updateCount(rec){
  var slot=typeof $==='function'?$('gaf149count'):document.getElementById('gaf149count');
  if(slot)slot.textContent=String((typeof IL150==='object'&&IL150.copies)?IL150.copies(rec||grow()):(rec&&rec._n)||0);
}
function paintSoFar(cv,rec){
  if(!cv||!rec)return;
  var n=Math.max(0,rec._fernN||0),c=clearCv(cv);
  if(n>0){
    var cap=Math.max(n,Math.min(20000,(rec.depth||1)*4000));
    drawFernRange(c.x,c.W,c.H,fernPts(rec.seed||109,cap),0,n);
  }
}
function runFern(cv,rec,from,to,clearFirst){
  if(!rec)return;
  var tok=++FTOK;
  rec._fernTok=tok;
  var cap=Math.max(1,Math.min(20000,to));
  from=Math.max(0,Math.min(from||0,cap));
  function live(){return curCv()||cv}
  if(rd()){
    var c=live();if(!c)return;
    var d=clearCv(c);
    drawFernRange(d.x,d.W,d.H,fernPts(rec.seed||109,cap),0,cap);
    rec._fernN=rec._n=cap;
    if(tok===FTOK)block=0;
    updateCount(rec);return;
  }
  block=1;
  var pts=fernPts(rec.seed||109,cap),n=from,painted=null;
  function sync(c){
    if(!c||painted===c)return;
    clearCv(c);
    if(n>0)drawFernRange(c.getContext('2d'),c.width,c.height,pts,0,n);
    painted=c;
  }
  var c0=live();
  if(clearFirst)n=0;
  if(c0){clearCv(c0);if(n>0)drawFernRange(c0.getContext('2d'),c0.width,c0.height,pts,0,n);painted=c0}
  (function tick(){
    if(tok!==FTOK)return;
    var c=live();
    if(!c){if(n<cap)setTimeout(tick,50);return}
    sync(c);
    var next=Math.min(cap,n+15);
    drawFernRange(c.getContext('2d'),c.width,c.height,pts,n,next);
    n=next;rec._fernN=rec._n=n;updateCount(rec);
    if(n<cap)setTimeout(tick,50);
    else if(tok===FTOK)block=0;
  })();
}
function shapes(){
  if(typeof PAT_SHAPES106!=='undefined'&&PAT_SHAPES106&&PAT_SHAPES106.length)return PAT_SHAPES106;
  return ['tree','sunflower','triangle','dragon','pythagoras','hilbert','spirals','fern'];
}
function palMax(){return (typeof PAT_PAL106!=='undefined'&&PAT_PAL106&&PAT_PAL106.length)?PAT_PAL106.length-1:3}
function parseBox(s){
  s=String(s==null?'':s).trim();
  if(!s||/\s/.test(s))return null;
  if(!/^-?\d+(\.\d+)?$/.test(s))return null;
  var n=Number(s);
  return isFinite(n)?n:null;
}
function isInt(n){return typeof n==='number'&&isFinite(n)&&n===Math.round(n)}
function parseCode(vals){
  if(!vals||typeof vals==='string'||vals.length<4)return null;
  var a=parseBox(vals[0]),b=parseBox(vals[1]),c=parseBox(vals[2]),d=parseBox(vals[3]);
  if(a==null||b==null||c==null||d==null)return null;
  var SH=shapes();
  if(!isInt(a)||a<0||a>=SH.length)return null;
  if(!isInt(b)||b<0||b>palMax())return null;
  var sh=SH[a];
  if(sh==='sunflower'){if(!(c>=120&&c<=150))return null}
  else if(!(c>=8&&c<=90))return null;
  var cap=capOf(sh);
  if(!isInt(d)||d<0||d>cap)return null;
  return {shape:sh,shapeI:a,pal:b,angle:c,depth:d};
}
function cantRead(){return t("Hmm, I can't read that code.")}
function applyCode(rec){
  var g=grow();
  if(!g||!rec)return;
  FTOK++;
  g.shape=rec.shape;g.pal=rec.pal;g.angle=rec.angle;g.depth=rec.depth;g.msg='';g._n=null;g._fernN=0;
  if(g.shape==='fern'&&!g.seed)g.seed=109;
  if(g.q)g.q.length=0;g.busy=false;
  markOpen();
  if(g.shape!=='fern')block=0;
  if(typeof patGrowDraw106==='function')patGrowDraw106();
  if(g.shape==='fern'&&g.depth>0)runFern(curCv(),g,0,Math.min(20000,g.depth*4000),true);
}
var DIM_MS=600,DIM_A=.35;
function fadeDim(cv,on){
  cv=cv||curCv();
  if(!cv||rd())return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,st=cv._dim151||(cv._dim151={});
  if(!st.img){try{st.img=x.getImageData(0,0,W,H)}catch(ex){return}}
  if(st.raf)cancelAnimationFrame(st.raf);
  var from=st.a||0,to=on?DIM_A:0,t0=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
  function paint(a){
    x.putImageData(st.img,0,0);
    if(a>0.001){
      x.fillStyle='rgba(13,15,26,'+a+')';
      x.fillRect(0,0,W,H);
      var tmp=st.tmp||(st.tmp=document.createElement('canvas'));
      if(tmp.width!==W){tmp.width=W;tmp.height=H}
      tmp.getContext('2d').putImageData(st.img,0,0);
      x.save();
      x.beginPath();
      x.arc(W*0.62,H*0.38,Math.min(W,H)*0.16,0,Math.PI*2);
      x.clip();
      x.drawImage(tmp,0,0);
      x.restore();
    }
    st.a=a;
  }
  (function tick(now){
    var u=Math.max(0,Math.min(1,(now-t0)/DIM_MS));
    paint(from+(to-from)*u);
    if(u<1)st.raf=requestAnimationFrame(tick);
    else{st.raf=0;if(!on){st.img=null;st.a=0;st.tmp=null}}
  })(t0);
}
function bindDim(){
  var cv=curCv();
  if(!cv||cv._lp151)return;
  cv._lp151=1;
  var host=cv.parentElement||cv,hold=null,on=0;
  function start(ev){
    if(ev.target!==cv)return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    if(hold)clearTimeout(hold);
    hold=setTimeout(function(){on=1;fadeDim(curCv()||cv,true)},400);
  }
  function end(){
    if(hold)clearTimeout(hold);hold=null;
    if(on){fadeDim(curCv()||cv,false);on=0}
  }
  host.addEventListener('pointerdown',start,true);
  ['pointerup','pointerleave','pointercancel'].forEach(function(n){host.addEventListener(n,end,true)});
  cv.addEventListener('contextmenu',function(ev){ev.preventDefault()});
}
function rebind(){

  var el=typeof $==='function'?$('patterns'):document.getElementById('patterns');
  if(!el)return;
  bindDim();
  var again=el.querySelector('[data-gafern149]');
  if(again)again.onclick=function(){
    var g=grow();if(!g.seed)g.seed=109;
    runFern(curCv(),g,0,Math.min(20000,(g.depth||1)*4000),true);
  };
  var box=el.querySelector('[data-gafload150]');
  if(box){
    var go=box.querySelector('[data-gafloadgo]');
    function run(){
      var vals=[].map.call(box.querySelectorAll('[data-gafn]'),function(inp){return inp.value});
      var rec=parseCode(vals),msg=box.querySelector('[data-gafloadmsg]');
      if(!rec){if(msg){msg.hidden=false;msg.textContent=cantRead()}return}
      if(msg){msg.hidden=true;msg.textContent=''}
      applyCode(rec);
    }
    if(go)go.onclick=run;
  }
}
function install(){
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(rec.shape==='fern'&&block&&cv&&cv.id==='patGrowCv'){
        paintSoFar(cv,rec);
        rec._n=rec._fernN||0;
        return true;
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{rebind()}catch(ex){}
      return r;
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow(),cv=curCv(),self=this,args=arguments;
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
          var to=Math.min(20000,g.depth*4000);
          if(from>=to)from=0;
          runFern(curCv(),g,from,to,false);
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
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){FTOK++;block=0}
      return prev.apply(this,arguments);
    };
  });
  if(typeof IL150==='object'){
    IL150.runFern=runFern;
    IL150.parseCode=parseCode;
    IL150.applyCode=applyCode;
  }
  if(typeof IL150==='object')IL150.fadeDim=fadeDim;
  if(document.getElementById('patterns'))try{rebind()}catch(ex){}
}
root.IL151={version:151,runFern:runFern,parseCode:parseCode,applyCode:applyCode,install:install,fadeDim:fadeDim,ftok:function(){return FTOK},blocked:function(){return !!block},dimA:DIM_A,dimMs:DIM_MS};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
