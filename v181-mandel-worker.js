/* Lamplight v181 Mandelbrot deep-zoom worker. Offline only. No imports. Preview. */
'use strict';
var ABORT=0, FBITS=1024n, SLICE_MS=6;

function decToFp(s,F){
  s=String(s==null?'0':s).trim().replace(/\s+/g,'');
  if(typeof F!=='bigint') F=BigInt(F||1024);
  if(!s) return 0n;
  var neg=s.charAt(0)==='-';
  if(neg||s.charAt(0)==='+') s=s.slice(1);
  var e=s.indexOf('e');
  if(e<0) e=s.indexOf('E');
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
  var intPart=BigInt(ip||'0')<<F;
  var frac=0n;
  if(fp){
    var den=10n**BigInt(fp.length);
    frac=(BigInt(fp)<<F)/den;
  }
  var v=intPart+frac;
  return neg?-v:v;
}
function fpToNum(v,F){
  var keep=52n;
  if(typeof F!=='bigint') F=BigInt(F||1024);
  if(F<=keep) return Number(v)/Math.pow(2,Number(F));
  var neg=v<0n; if(neg)v=-v;
  var n=Number(v>>(F-keep))/Math.pow(2,Number(keep));
  return neg?-n:n;
}
function hexRgb(h){
  h=String(h||'#000').replace('#','');
  if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  return [parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0];
}
function colorAt(pal,n,inside){
  if(inside) return [20,16,28];
  var t=Math.max(0,Math.min(.999,n))*(pal.length-1),i=t|0,f=t-i;
  var a=pal[i],b=pal[i+1]||pal[i];
  return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f].map(function(v){return v|0});
}

function refOrbit(cr,ci,iters,F){
  var zr=0n,zi=0n,esc=iters;
  var Zre=new Float64Array(iters+1),Zim=new Float64Array(iters+1);
  var lim=(4n<<(2n*F));
  for(var n=0;n<=iters;n++){
    Zre[n]=fpToNum(zr,F); Zim[n]=fpToNum(zi,F);
    if(zr*zr+zi*zi>lim){ esc=n; break; }
    if(n===iters) break;
    var nr=((zr*zr-zi*zi)>>F)+cr;
    var ni=((zr*zi<<1n)>>F)+ci;
    zr=nr; zi=ni;
  }
  return {Zre:Zre,Zim:Zim,esc:esc,cr:cr,ci:ci};
}

function pickRef(cx,cy,span,aspect,iters,F){
  var probes=[[0,0],[0.22,0],[-0.22,0],[0,0.22],[0,-0.22],[0.16,0.16],[-0.16,0.16],[0.16,-0.16],[-0.16,-0.16],[0.35,0],[0,0.35]];
  var best=null, i, pr, cr, ci, orb;
  for(i=0;i<probes.length;i++){
    pr=probes[i];
    cr=cx+decToFp(String(pr[0]*span),F);
    ci=cy+decToFp(String(pr[1]*span*aspect),F);
    orb=refOrbit(cr,ci,iters,F);
    if(!best || orb.esc>best.esc){ best=orb; }
    if(best.esc>=iters) break;
  }
  return best;
}

function now(){return (typeof performance!=='undefined'&&performance.now)?performance.now():Date.now()}

function render(m){
  var id=m.id|0;
  if(id===ABORT && m.cmd!=='render') return;
  var W=m.W|0,H=m.H|0,iters=Math.max(20,Math.min(12000,m.iters|0));
  var pal=(m.pal||[]).map(hexRgb);
  if(!pal.length) pal=[[13,15,26],[28,42,58],[58,78,63],[111,154,122],[234,199,125],[255,246,216]];
  var kind=m.kind||'mandel';
  var step=Math.max(1,m.step|0);
  var span=m.span,cx=m.cx,cy=m.cy;
  var usePert=!!m.usePert && kind==='mandel';
  var aspect=H/W;
  var xmin,ymin,dx,dy;
  var F=FBITS;
  var Zre,Zim,escAt=iters,refCr,refCi;
  var cxFp=decToFp(m.cxQ!=null?m.cxQ:cx,F);
  var cyFp=decToFp(m.cyQ!=null?m.cyQ:cy,F);
  var refOffR=0, refOffI=0;
  if(usePert){
    var orb=pickRef(cxFp,cyFp,span,aspect,iters,F);
    Zre=orb.Zre; Zim=orb.Zim; escAt=orb.esc; refCr=orb.cr; refCi=orb.ci;
    refOffR=fpToNum(cxFp-refCr,F);
    refOffI=fpToNum(cyFp-refCi,F);
    dx=span/W; dy=(span*aspect)/H;
  }else{
    xmin=cx-span/2; ymin=cy-span*aspect/2; dx=span/W; dy=(span*aspect)/H;
  }
  var jr=m.jr||0,ji=m.ji||0;
  var data=new Uint8ClampedArray(W*H*4);
  var escBuf=new Int16Array(W*H);
  var glitches=0, y=0, maxSlice=0, tAll=now();
  var unk=[];

  function paintPix(i,j,c){
    var jj,ii,p;
    for(jj=0;jj<step&&j+jj<H;jj++){
      for(ii=0;ii<step&&i+ii<W;ii++){
        p=((j+jj)*W+(i+ii))*4;
        data[p]=c[0];data[p+1]=c[1];data[p+2]=c[2];data[p+3]=255;
      }
    }
  }
  function storeEsc(i,j,n){
    var jj,ii;
    for(jj=0;jj<step&&j+jj<H;jj++){
      for(ii=0;ii<step&&i+ii<W;ii++){
        escBuf[(j+jj)*W+(i+ii)]=n;
      }
    }
  }

  function row(j){
    var i,k,zr,zi,cr,ci,n,c,nz,xr,xi,d0r,d0i,dr,di,Zr,Zi,d2r,d2i,nr,ni,hit,unkPix;
    var y0=usePert?((j+0.5)-H/2)*dy : (ymin+j*dy);
    for(i=0;i<W;i+=step){
      if(usePert){
        d0r=((i+0.5)-W/2)*dx; d0i=y0;
        /* d0 is relative to the view centre; shift into the picked reference */
        d0r += refOffR;
        d0i += refOffI;
        dr=0; di=0; k=0; hit=false; unkPix=false;
        while(k<iters){
          if(k>=escAt){ unkPix=true; break; }
          Zr=Zre[k]; Zi=Zim[k];
          xr=Zr+dr; xi=Zi+di;
          if(xr*xr+xi*xi>4){ hit=true; break; }
          d2r=dr*dr-di*di; d2i=2*dr*di;
          nr=2*(Zr*dr-Zi*di)+d2r+d0r;
          ni=2*(Zr*di+Zi*dr)+d2i+d0i;
          if(!isFinite(nr)||!isFinite(ni)||Math.abs(nr)>1e300||Math.abs(ni)>1e300){ glitches++; unkPix=true; break; }
          dr=nr; di=ni; k++;
        }
        n=k;
        if(unkPix){
          if(unk.length<8000) unk.push(i,j);
          glitches++;
          c=[20,16,28];
          storeEsc(i,j,-1);
        }else{
          c=colorAt(pal,n/iters,!hit);
          storeEsc(i,j, hit?n:iters);
        }
        paintPix(i,j,c);
      }else{
        var x0=xmin+i*dx;
        if(kind==='mandel'){zr=0;zi=0;cr=x0;ci=y0}
        else{zr=x0;zi=y0;cr=jr;ci=ji}
        k=0;
        while(k<iters&&zr*zr+zi*zi<=4){
          nz=zr*zr-zi*zi+cr; zi=2*zr*zi+ci; zr=nz; k++;
        }
        c=colorAt(pal,k/iters,kind==='mandel'&&k>=iters);
        storeEsc(i,j, k>=iters?iters:k);
        paintPix(i,j,c);
      }
    }
  }

  function redoUnknowns(){
    if(!usePert || unk.length<2) return;
    var i0=unk[0], j0=unk[1];
    var d0r=((i0+0.5)-W/2)*dx, d0i=((j0+0.5)-H/2)*dy;
    var cr=refCr+decToFp(String(d0r + refOffR),F);
    var ci=refCi+decToFp(String(d0i + refOffI),F);
    var orb2=refOrbit(cr,ci,iters,F);
    if(orb2.esc<=escAt) return;
    var Zre2=orb2.Zre, Zim2=orb2.Zim, esc2=orb2.esc;
    var u,i,j,d0r2,d0i2,dr,di,k,hit,Zr,Zi,xr,xi,d2r,d2i,nr,ni,c,unkPix;
    for(u=0;u<unk.length;u+=2){
      i=unk[u]; j=unk[u+1];
      d0r2=((i+0.5)-W/2)*dx + fpToNum(cxFp-orb2.cr,F);
      d0i2=((j+0.5)-H/2)*dy + fpToNum(cyFp-orb2.ci,F);
      dr=0; di=0; k=0; hit=false; unkPix=false;
      while(k<iters){
        if(k>=esc2){ unkPix=true; break; }
        Zr=Zre2[k]; Zi=Zim2[k];
        xr=Zr+dr; xi=Zi+di;
        if(xr*xr+xi*xi>4){ hit=true; break; }
        d2r=dr*dr-di*di; d2i=2*dr*di;
        nr=2*(Zr*dr-Zi*di)+d2r+d0r2;
        ni=2*(Zr*di+Zi*dr)+d2i+d0i2;
        if(!isFinite(nr)||!isFinite(ni)||Math.abs(nr)>1e300||Math.abs(ni)>1e300){ unkPix=true; break; }
        dr=nr; di=ni; k++;
      }
      if(unkPix) continue;
      c=colorAt(pal,k/iters,!hit);
      storeEsc(i,j, hit?k:iters);
      paintPix(i,j,c);
      glitches=Math.max(0,glitches-1);
    }
  }

  function hist(){
    var seen=Object.create(null), unique=0, maxc=0, total=0, i,v,n;
    var samples=Math.floor((W*H)/(step*step));
    for(i=0;i<escBuf.length;i+=Math.max(1,step)){
      /* count each physical pixel */
    }
    for(i=0;i<W*H;i++){
      v=escBuf[i];
      n=seen[v]=(seen[v]||0)+1;
      if(n===1) unique++;
      if(n>maxc) maxc=n;
      total++;
    }
    return {unique:unique, maxFrac:total?maxc/total:1, samples:total};
  }

  function slice(){
    if(id===ABORT){ postMessage({id:id,cmd:'abort'}); return; }
    var t0=now();
    while(y<H && (now()-t0)<SLICE_MS){
      row(y);
      y+=step;
    }
    var dt=now()-t0;
    if(dt>maxSlice) maxSlice=dt;
    if(y<H){
      if(typeof setImmediate==='function') setImmediate(slice);
      else setTimeout(slice,0);
    }else{
      try{ redoUnknowns(); }catch(e){}
      var h=hist();
      var wiggles=h.unique>=8 && h.maxFrac<=0.90;
      postMessage({
        id:id,cmd:'tile',W:W,H:H,data:data,pass:m.pass||0,step:step,
        glitches:glitches,maxSlice:maxSlice,ms:now()-tAll,usePert:usePert,
        unique:h.unique,maxFrac:h.maxFrac,wiggles:wiggles,escAt:escAt,iters:iters
      },[data.buffer]);
    }
  }
  slice();
}

onmessage=function(ev){
  var m=ev.data||{};
  if(m.cmd==='abort'){ ABORT=m.id|0; return; }
  if(m.cmd==='render'){ ABORT=0; render(m); }
};
