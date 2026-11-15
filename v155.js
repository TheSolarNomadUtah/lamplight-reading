/* v155: Grow a Fractal 3 math and QA fixes. v154.js stays frozen. No show() wrap. Quilt untouched. */
(function(root){
'use strict';
var PHI=(1+Math.sqrt(5))/2, GOLD=360*(1-1/PHI), GOLDJ=1/(PHI*PHI);
var I='#72583f', A='#E6B454', CR='#fff8ec', NK='#0d0f1a', GOLDINK='#E6B454';
var HIGH={htree:1,levy:1,pascal:1,chaos:1,sunflower:1,ripples:1};
var BT=null,HOLD=0;
function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function e(s){return typeof patEsc==='function'?patEsc(s):String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function capOf(sh){return(typeof IL154==='object'&&IL154.capOf)?IL154.capOf(sh):(sh==='spirals'?2:sh==='hilbert'?4:sh==='fern'?5:6)}
function ink(sh,d,depth){return(typeof IL154==='object'&&IL154.ink)?IL154.ink(sh,d,depth):GOLDINK}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v155)return;var next=wrap(prev);next._v155=1;next._base=prev._base||prev;root[name]=next}
function bg(x,W,H){x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function sunN(d){return(typeof IL154==='object'&&IL154.sunN)?IL154.sunN(d):(function(){var f=[1,13,21,34,55,89,144,233,377];d=Math.max(0,Math.min(f.length-1,d|0));return f[d]})()}
function goldish(a){a=+a||0;return Math.abs(a-137.5)<0.8||Math.abs(a-GOLD)<0.8}
function jumpOf(angle){
  var a=Math.round(angle||50);
  if(a===33)return 1/3;
  if(a===38)return GOLDJ;
  if(a===50)return 0.5;
  if(angle>=30&&angle<=55)return angle/100;
  return 0.5;
}
function jumpLab(angle){
  var a=Math.round(angle||50);
  return a===33?'⅓':a===38?'1/φ²':a===50?'½':String(jumpOf(angle));
}

function copies(rec){
  var d=Math.max(0,rec&&rec.depth||0),sh=rec&&rec.shape;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hilbert')return Math.pow(4,Math.max(0,d-1));
  if(sh==='fern')return Math.min(20000,d*4000);
  if(sh==='sunflower')return sunN(d);
  if(sh==='spirals')return (Math.pow(5,d+1)-1)/4;
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
function jarWord(sh){
  return ({tree:'branch tips',antler:'branch tips',pythagoras:'tips',htree:'segments',levy:'segments',dragon:'segments',koch:'sides',triangle:'triangles',hexrings:'cells',pascal:'cells',ripples:'rings',sunflower:'seeds',chaos:'dots',fern:'dots',apollonian:'circles',spirals:'spirals',hilbert:'pieces'})[sh]||'pieces';
}
function jarSVG(n,label){
  var N=Math.max(0,n|0),show=Math.min(N,89),cols=8,i,dots='',r,c,x,y;
  for(i=0;i<show;i++){r=Math.floor(i/cols);c=i%cols;x=18+c*10;y=100-(r+1)*9;dots+='<circle cx="'+x+'" cy="'+y+'" r="2.2" fill="'+A+'"/>'}
  return '<div class="g3jar" data-gaf3jar="1"><p class="soft">'+e(t('How many?'))+'</p>'+
    '<svg viewBox="0 0 96 112" width="96" height="112" aria-hidden="true">'+
    '<path d="M28 8 H68 L74 18 V96 Q74 106 48 106 Q22 106 22 96 V18 Z" fill="none" stroke="'+I+'" stroke-width="2.2"/>'+
    '<path d="M24 18 H72" stroke="'+I+'" stroke-width="1.5"/>'+dots+'</svg>'+
    '<p class="g9c" style="margin:4px 0 0">'+e(String(N))+(label?' <span class="soft">'+e(label)+'</span>':'')+'</p></div>';
}

/* ---- Apollonian: rounded k, tangent to all three, no overlaps ---- */
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return {x:a,y:b};
}
function tangent(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  var ext=Math.abs(dist-(r1+r2)),inn=Math.abs(dist-Math.abs(r1-r2));
  return {ok:ext<=eps||inn<=eps,res:Math.min(ext,inn)};
}
function overlaps(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  return dist<r1+r2-eps && dist>Math.abs(r1-r2)+eps;
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
function gasket(depth){
  depth=Math.max(0,Math.min(capOf('apollonian'),depth||0));
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d=null,cs,q,seen,gi,i,t,c1,c2,c3,sols,si,n,k,ix,ok,j;
  sols=solutions(a,b,c);
  for(i=0;i<sols.length;i++)if(sols[i].k>0&&Math.abs(sols[i].k-3)<1e-6){d=sols[i];break}
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];q=[[0,1,2],[0,1,3],[0,2,3],[1,2,3]];seen={};
  function key(c){return Math.round(c.k)+':'+c.x.toFixed(5)+':'+c.y.toFixed(5)}
  cs.forEach(function(c){seen[key(c)]=1});
  for(gi=0;gi<depth;gi++){
    var nq=[];
    for(i=0;i<q.length;i++){
      t=q[i];c1=cs[t[0]];c2=cs[t[1]];c3=cs[t[2]];
      sols=solutions(c1,c2,c3);
      for(si=0;si<sols.length;si++){
        n=sols[si];if(n.k<=0)continue;
        if(Math.hypot(n.x,n.y)+1/n.k>1.02)continue;
        k=key(n);if(seen[k])continue;
        ok=1;
        for(j=0;j<cs.length;j++){
          if(overlaps(n,cs[j],1e-4)){ok=0;break}
        }
        if(!ok)continue;
        seen[k]=1;cs.push(n);ix=cs.length-1;
        nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
      }
    }
    q=nq;
  }
  return cs;
}
function paintCount(depth){return gasket(depth).length}

function dApol(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('apollonian'),rec.depth||0)),cs=gasket(depth),sc=Math.min(W,H)*0.46,cx=W/2,cy=H/2,i,c,r;
  for(i=0;i<cs.length;i++){
    c=cs[i];r=Math.abs(1/c.k)*sc;
    x.strokeStyle=ink('apollonian',i?1:0,Math.max(1,depth));
    x.lineWidth=c.k<0?2.2:Math.max(0.6,2-Math.log(c.k+1)*0.35);
    x.beginPath();x.arc(cx+c.x*sc,cy-c.y*sc,r,0,Math.PI*2);x.stroke();
    if(c.k>0&&r>14){
      x.fillStyle=I;x.font=Math.max(9,Math.min(16,r*0.55))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
    }
  }
}
function dH(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('htree'),rec.depth||0)),s2=Math.SQRT1_2;
  function Hn(cx,cy,len,hz,d){
    if(d<0||len<1.2)return;
    x.strokeStyle=ink('htree',d,depth);x.lineWidth=Math.max(0.7,2.6-d*0.25);
    x.beginPath();
    if(hz){x.moveTo(cx-len,cy);x.lineTo(cx+len,cy)}else{x.moveTo(cx,cy-len);x.lineTo(cx,cy+len)}
    x.stroke();
    if(hz){Hn(cx-len,cy,len*s2,0,d-1);Hn(cx+len,cy,len*s2,0,d-1)}
    else{Hn(cx,cy-len,len*s2,1,d-1);Hn(cx,cy+len,len*s2,1,d-1)}
  }
  Hn(W/2,H/2,Math.min(W,H)*0.22,1,depth);
}
function dLevy(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('levy'),rec.depth||0)),pts=[{x:0,y:0},{x:1,y:0}],k,i,next,a,b,mx,my,minx=0,miny=0,maxx=1,maxy=0,sc,ox,oy,pad=10,bw,bh;
  for(k=0;k<depth;k++){
    next=[];
    for(i=0;i<pts.length-1;i++){
      a=pts[i];b=pts[i+1];
      mx=(a.x+b.x)/2-(b.y-a.y)/2;my=(a.y+b.y)/2+(b.x-a.x)/2;
      next.push(a,{x:mx,y:my});
    }
    next.push(pts[pts.length-1]);pts=next;
  }
  for(i=0;i<pts.length;i++){minx=Math.min(minx,pts[i].x);miny=Math.min(miny,pts[i].y);maxx=Math.max(maxx,pts[i].x);maxy=Math.max(maxy,pts[i].y)}
  bw=Math.max(1e-6,maxx-minx);bh=Math.max(1e-6,maxy-miny);
  sc=Math.min((W-2*pad)/bw,(H-2*pad)/bh);
  ox=W/2-sc*(minx+maxx)/2;oy=H/2-sc*(miny+maxy)/2;
  x.strokeStyle=ink('levy',depth,depth);x.lineWidth=Math.max(0.9,2.8-depth*0.18);
  x.beginPath();pts.forEach(function(p,i){var X=p.x*sc+ox,Y=p.y*sc+oy;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
}
function dChaos(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('chaos'),rec.depth||0)),N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=jumpOf(rec.angle),s=(rec.seed||109)>>>0,i,v=[],ang,p,j,last=-1,w=Math.min(W,H)*0.42,same=poly===4&&Math.abs(fr-0.5)<1e-9;
  function rnd1(){s=(1664525*s+1013904223)>>>0;return s/4294967296}
  for(i=0;i<poly;i++){ang=-Math.PI/2+i*2*Math.PI/poly;v.push({x:W/2+Math.cos(ang)*w,y:H/2+Math.sin(ang)*w})}
  p={x:W/2,y:H/2};x.fillStyle=ink('chaos',depth,Math.max(1,depth));
  for(i=0;i<N;i++){
    j=Math.floor(rnd1()*poly);
    if(same&&j===last)j=(j+1+Math.floor(rnd1()*(poly-1)))%poly;
    last=j;p.x+=(v[j].x-p.x)*fr;p.y+=(v[j].y-p.y)*fr;
    x.fillRect(p.x,p.y,1.3,1.3);
  }
}
function dHex(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('hexrings'),rec.depth||0)),pad=6,size,R,q,r,s,px,py,ring;
  if(depth<=0)size=Math.min(W,H)*0.28;
  else size=(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
  R=size/Math.sqrt(3);
  function hex(cx,cy,rad,col){
    var a;x.beginPath();
    for(a=0;a<6;a++)x[a?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+a*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+a*Math.PI/3)*rad);
    x.closePath();x.strokeStyle=col;x.lineWidth=Math.max(0.8,2.2);x.stroke();
  }
  for(q=-depth;q<=depth;q++){
    for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      px=W/2+(q+r/2)*size;py=H/2+r*size*Math.sqrt(3)/2;
      ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
      hex(px,py,R,ink('hexrings',ring,depth));
    }
  }
}
function dRip(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('ripples'),rec.depth||0)),i,Rmax=Math.min(W,H)/2-6,step;
  if(depth<=0){x.fillStyle=GOLDINK;x.beginPath();x.arc(W/2,H/2,5,0,Math.PI*2);x.fill();return}
  step=Rmax/Math.max(1,depth);
  for(i=1;i<=depth;i++){
    x.strokeStyle=ink('ripples',i,depth);x.lineWidth=Math.max(0.9,3-i*0.2);
    x.beginPath();x.arc(W/2,H/2,step*i,0,Math.PI*2);x.stroke();
  }
}
function dSun(x,W,H,rec){
  var depth=Math.max(0,Math.min(capOf('sunflower'),rec.depth||0)),n=sunN(depth),phi=rec.angle||GOLD,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th;
  if(goldish(phi))phi=GOLD;
  for(i=0;i<n;i++){
    r=c*Math.sqrt(i);th=i*phi*Math.PI/180;
    x.fillStyle=ink('sunflower',i>=n-Math.max(8,n/8)?depth:0,Math.max(1,depth));
    x.beginPath();x.arc(W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.5,3.1-i/n*1.5),0,Math.PI*2);x.fill();
  }
}
var DRAW={sunflower:dSun,htree:dH,levy:dLevy,apollonian:dApol,chaos:dChaos,hexrings:dHex,ripples:dRip};

function d9(cv,rec){
  if(!cv||!rec||!DRAW[rec.shape])return false;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height;
  bg(x,W,H);
  if(rec._rest){if(typeof IL154==='object'&&IL154.starPts){/* v154 rest path */}return false}
  if((rec.depth||0)<=0&&rec.shape!=='ripples'&&rec.shape!=='hexrings'){
    x.fillStyle=GOLDINK;x.beginPath();x.arc(W/2,H*0.7,5,0,Math.PI*2);x.fill();return true;
  }
  DRAW[rec.shape](x,W,H,rec);return true;
}

function stopBreath(){if(BT){clearTimeout(BT);BT=null}HOLD=0}
function startBreath(){
  var g=grow();if(!g||rd())return;
  if((g.depth||0)>=capOf(g.shape)){g._br=0;if(typeof patGrowDraw106==='function')patGrowDraw106();return}
  g._br=1;HOLD=0;
  function afterStep(before){
    g=grow();
    if(!g||!g._br)return;
    if((g.depth||0)>=capOf(g.shape)||(g.depth||0)<=before){
      g._br=0;stopBreath();
      if((g.depth||0)>=capOf(g.shape)&&!(g.msg&&/as far as this seed grows/i.test(g.msg)))g.msg=t('It found its rest.');
      if(typeof patGrowDraw106==='function')patGrowDraw106();
      return;
    }
    BT=setTimeout(tick,4000);
  }
  function tick(){
    BT=null;g=grow();
    if(!g||!g._br||HOLD||rd())return;
    if((g.depth||0)>=capOf(g.shape)){
      g._br=0;stopBreath();
      if(!(g.msg&&/as far as this seed grows/i.test(g.msg)))g.msg=t('It found its rest.');
      if(typeof patGrowDraw106==='function')patGrowDraw106();
      return;
    }
    var before=g.depth||0;
    if(typeof patGrowStep106==='function')patGrowStep106();
    var n=0;
    (function wait(){
      g=grow();
      if(!g||!g._br||HOLD)return;
      if(g.busy||(g.q&&g.q.length)){if(++n<30){setTimeout(wait,50);return}}
      afterStep(before);
    })();
  }
  BT=setTimeout(tick,4000);
  if(typeof patGrowDraw106==='function')patGrowDraw106();
}

function css(){
  if(document.getElementById('v155css'))return;
  var s=document.createElement('style');s.id='v155css';
  s.textContent='#patterns .g9w{overflow:hidden}'+
    '#patterns .g9p{bottom:8px;right:8px;z-index:2}'+
    '#patterns [data-gaf3ctrl],#patterns [data-gaf3hold]{padding-right:72px;box-sizing:border-box}'+
    '#patterns [data-gaf3ctrl]{max-width:100%}'+
    '#patterns .g9l,#gaf149print .g9l{color:#2A2230}'+
    '#patterns .g9l .soft,#patterns .g9l figcaption,#patterns .g9l figcaption .soft,#gaf149print .g9l .soft,#gaf149print .g9l figcaption{color:#2A2230}'+
    '#patterns [data-gafload150]{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:flex-end}'+
    '#patterns [data-gafload150] .g9e-slot{display:inline-flex;flex-direction:column;align-items:center;gap:4px;color:#2A2230;font-size:.9rem}'+
    '#patterns [data-gafload150] input[data-gafn]{background:#fff8ec;color:#2A2230;border:2px solid #2A2230;width:4.6em;min-width:56px;min-height:56px;text-align:center;font:inherit}'+
    '#patterns [data-gafload150] input[data-gafn]::placeholder{color:#2A2230;opacity:.55}';
  document.head.appendChild(s);
}
function friendMark(kind){
  if(kind==='turtle')return '<svg viewBox="0 0 44 44" aria-hidden="true"><ellipse cx="22" cy="24" rx="12" ry="9" fill="none" stroke="#6F9A7A" stroke-width="2"/><path d="M22 15 C20 11 24 11 22 15" fill="none" stroke="#6F9A7A" stroke-width="2" stroke-linecap="round"/><path d="M12 20 L8 17 M32 20 L36 17 M14 32 L11 36 M30 32 L33 36" fill="none" stroke="#6F9A7A" stroke-width="1.8" stroke-linecap="round"/></svg>';
  if(kind==='deer')return '<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M22 38 V18 M22 22 L13 9 M22 22 L31 9 M16 16 L11 11 M28 16 L33 11" fill="none" stroke="#5B7A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if(kind==='firefly')return '<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="16" r="7" fill="#E6B454" opacity=".4"/><ellipse cx="22" cy="26" rx="4" ry="8" fill="none" stroke="#72583f" stroke-width="2"/><circle cx="22" cy="16" r="2.4" fill="#E6B454"/></svg>';
  return '';
}
function fixUI(){
  css();
  var g=grow(),el=document.getElementById('patterns'),row,b,slot,msg,hold,n,lab,btn;
  if(!g||!el)return;
  row=el.querySelector('[data-gaf3ctrl]');
  if(g.shape==='pythagoras'){
    b=el.querySelector('[data-gaf3season]');
    if(b)b.remove();
  }
  b=el.querySelector('[data-gaf3jump]');
  if(b)b.innerHTML=e(t('Jump'))+': '+e(jumpLab(g.angle||50));
  if(g.shape==='sunflower'&&(g.depth||0)>0){
    if(goldish(g.angle||GOLD)){
      var fa=(typeof IL154==='object'&&IL154.fibArms)?IL154.fibArms(copies(g)):{a:34,b:55};
      g.msg=t('The spirals you can count: {a} and {b}.',{a:String(fa.a),b:String(fa.b)})+' '+t('At this turn the seeds pack tight.');
    }
  }
  /* QA 8–9: dark ink on the cream recipe card; slot 1 is Shape on card and loader */
  var inkCard='#2A2230';
  [].forEach.call(el.querySelectorAll('[data-gafcode149] figcaption .soft, #gaf149print figcaption .soft'),function(s){
    var txt=(s.textContent||'').trim();
    if(txt===t('Seed')||txt==='Seed'||txt==='Semilla'||txt===t('Shape')||txt==='Shape'||txt==='Forma')s.textContent=t('Shape');
    s.style.color=inkCard;
  });
  [].forEach.call(el.querySelectorAll('[data-gafcode149] .soft, [data-gafcode149] figcaption, #gaf149print .g9l .soft, #gaf149print .g9l figcaption'),function(s){
    s.style.color=inkCard;
  });
  var load=el.querySelector('[data-gafload150]');
  if(load){
    var labs=[t('Shape'),t('Palette'),t('Bend'),t('Grow')];
    var inps=[].slice.call(load.querySelectorAll('[data-gafn]'));
    inps.forEach(function(inp,i){
      inp.setAttribute('placeholder',labs[i]);
      inp.setAttribute('aria-label',labs[i]);
      if(!inp.closest('.g9e-slot')){
        var wrap=document.createElement('label');
        wrap.className='g9e-slot';
        inp.parentNode.insertBefore(wrap,inp);
        wrap.appendChild(inp);
        var sp=document.createElement('span');
        sp.className='g9e-lab';
        sp.textContent=labs[i];
        wrap.appendChild(sp);
      }else{
        var sp=inp.parentNode.querySelector('.g9e-lab');
        if(sp)sp.textContent=labs[i];
      }
    });
  }
  /* jar: true counts + per-shape unit */
  n=copies(g);lab=jarWord(g.shape);
  slot=el.querySelector('[data-gaf3jar]');
  if((g.depth||0)>0){
    var jh=jarSVG(n,t(lab));
    if(slot)slot.outerHTML=jh;
    else{
      var cv=document.getElementById('patGrowCv');
      var hid=document.getElementById('gaf149count');
      if(hid){hid.hidden=true;hid.textContent=String(n);hid.insertAdjacentHTML('afterend',jh)}
      else if(cv)cv.insertAdjacentElement('afterend',(function(){var d=document.createElement('div');d.innerHTML=jh;return d.firstChild})());
    }
  }
  msg=document.getElementById('patGrowMsg');
  if(msg&&g.msg)msg.textContent=g.msg;
  /* friends: distinct marks, no shared plant badge */
  ['turtle','deer','firefly'].forEach(function(k){
    btn=el.querySelector('[data-gaf3fr="'+k+'"]');
    if(!btn)return;
    var mark=friendMark(k),span=btn.querySelector('span:last-child'),keep=span?span.outerHTML:'';
    var svg=btn.querySelector('svg'),dot=btn.querySelector('.g3dot');
    if(svg)svg.outerHTML=mark;
    else if(dot)dot.outerHTML=mark;
    else btn.innerHTML=mark+keep;
  });
  /* Breathe: v155 timer, no maybeRest */
  b=el.querySelector('[data-gaf3breathe]');
  if(b){
    b.onclick=function(){g=grow();if(g._br){g._br=0;stopBreath();if(typeof patGrowDraw106==='function')patGrowDraw106()}else startBreath()};
    b.onpointerdown=function(){if(grow()._br)HOLD=1};
    ['pointerup','pointerleave','pointercancel'].forEach(function(n){b.addEventListener(n,function(){if(grow()._br)HOLD=0})});
  }
}

function guardDragonWipe(cv){
  if(!cv)return;
  var x=cv.getContext('2d');
  if(!x._v155guard){
    var fill=x.fillRect;
    x.fillRect=function(a,b,c,d){
      if(this._v155blockWipe&&a===0&&b>0&&c===this.canvas.width&&d===this.canvas.height)return;
      return fill.apply(this,arguments);
    };
    x._v155guard=1;
  }
}

function growPast6(){
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&HIGH[g.shape]){
        var cap=capOf(g.shape);
        if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        var apply=function(){
          g=grow();
          if((g.depth||0)>=cap){g.msg=t('That is as far as this seed grows.');if(typeof patGrowDraw106==='function')patGrowDraw106();return}
          g.depth=(g.depth||0)+1;
          if(g.depth>=cap)g.msg=t('That is as far as this seed grows.');
          else if(g.msg&&/as far as this seed grows/i.test(g.msg))g.msg='';
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          if(typeof patGrowDraw106==='function')patGrowDraw106();
        };
        if(typeof patReduced==='function'&&patReduced()){apply();return}
        g.q=g.q||[];
        g.q.push(apply);
        if(!g.busy){
          g.busy=true;
          (function tick(){
            var fn=g.q.shift();
            if(!fn){g.busy=false;return}
            fn();
            setTimeout(tick,420);
          })();
        }
        return;
      }
      return prev.apply(this,arguments);
    };
  });
}

function install(){
  if(install._on)return;install._on=1;
  css();
  if(typeof IL154==='object'){
    IL154.copies=copies;IL154.gasket=gasket;IL154.startBreath=startBreath;IL154.stopBreath=stopBreath;
    IL154.GOLD=GOLD;IL154.jumpOf=jumpOf;IL154.paintCount=paintCount;IL154.jarWord=jarWord;
  }
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!rec._rest&&DRAW[rec.shape]&&d9(cv,rec))return;
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var g=grow(),cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
      if(g&&g.shape==='dragon'&&(g.depth||0)>=1&&cv)guardDragonWipe(cv);
      var r=prev.apply(this,arguments);
      try{
        g=grow();cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
        if(g&&g.shape==='dragon'&&(g.depth||0)>=1&&cv&&!g._rest){
          var x=cv.getContext('2d');
          x._v155blockWipe=1;
          if(typeof patGrowDrawOn106==='function')patGrowDrawOn106(cv,g);
          setTimeout(function(){try{x._v155blockWipe=0}catch(ex){}},1800);
        }
        fixUI();
      }catch(ex){}
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      var g=grow();
      if(k==='shape'&&g){g._rest=0;g._br=0;g._friend='';stopBreath()}
      var r=prev.apply(this,arguments);
      g=grow();
      if(k==='shape'&&g){
        if(v==='pascal')g.angle=2;
        else if(v==='chaos'){g.angle=50;g.poly=g.poly||3}
        else if(v==='sunflower')g.angle=goldish(g.angle)?GOLD:(g.angle&&g.angle>=120?g.angle:GOLD);
        if(typeof patGrowDraw106==='function')patGrowDraw106();
      }
      return r;
    };
  });
  hook('patGrowTwist106',function(prev){
    return function(d){
      var r=prev.apply(this,arguments),g=grow();
      if(g&&g.shape==='sunflower'){
        var ang=g.angle||GOLD;
        if(goldish(ang))g.angle=GOLD;
        [135,144,120].forEach(function(tg){if(Math.abs(ang-tg)<2)g.angle=tg});
      }
      return r;
    };
  });
  growPast6();
  hook('afterShow95',function(prev){return function(id){var r=prev.apply(this,arguments);try{if(id==='patterns')fixUI()}catch(ex){}return r}});
}

root.IL155={version:155,copies:copies,gasket:gasket,capOf:capOf,startBreath:startBreath,stopBreath:stopBreath,GOLD:GOLD,PHI:PHI,jumpOf:jumpOf,paintCount:paintCount,jarWord:jarWord,jarSVG:jarSVG,install:install,friendMark:friendMark,dHex:dHex,dLevy:dLevy,dRip:dRip};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
