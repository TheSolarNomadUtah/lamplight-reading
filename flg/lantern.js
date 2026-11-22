/* First Letter Garden "Lantern Letter" v3 (Art Director draft, 2026-11-20). Our own code-drawn SVG, CC0 1.0.
   Hidden lesson: the vines show HOW TO WRITE the letter (Zaner-Bloser manuscript capitals: order + direction).
   v3 (Council fixes): every vine is ALWAYS visible. Route per stroke, best first: beside the stroke (9 units out),
   a hair beside it (6.6 units, used where the open side is tight, e.g. S's spine), or laid on top of the ink as a thin
   cased gold-green vine (A's crossbar, N's diagonal). Never under the ink; never inside a closed counter or a sharp
   stroke-to-stroke gap (the N/Ñ rule). A cased seed sits ON every pencil-down point; ONE flower at the last lift (on Ñ Á É Í Ó Ú: the mark, written last) opens
   once the page is read (class lt-read). LANTERN.svg(ch,{still,read,dark,dots}), LANTERN.plan(ch), LANTERN.play(box,ch). */
(function(R){'use strict';
var L={"A":"M32.4 74L50 26L67.6 74M38.8 58H61.2","B":"M37.2 26V74M37.2 26H51.6C66 26 66 48.4 51.6 48.4H37.2M51.6 48.4C69.2 48.4 69.2 74 51.6 74H37.2","C":"M67.6 34.8C61.2 24.4 42 22.8 35.6 37.2C29.2 51.6 34 72.4 50 74C58 74.8 64.4 70.8 67.6 65.2","D":"M35.6 26V74M35.6 26H48.4C72.4 26 72.4 74 48.4 74H35.6","E":"M62.8 26H37.2V74H62.8M37.2 50H56.4","F":"M62.8 26H37.2V74M37.2 50H56.4","G":"M67.6 34.8C61.2 24.4 42 22.8 35.6 37.2C29.2 51.6 34 72.4 50 74C61.2 74.8 67.6 67.6 67.6 56.4V50H53.2","H":"M34 26V74M66 26V74M34 50H66","I":"M50 26V74M42 26H58M42 74H58","J":"M56.4 26V61.2C56.4 74 40.4 75.6 35.6 66M48.4 26H64.4","K":"M35.6 26V74M66 26L37.2 54.8M42 50L67.6 74","L":"M38.8 26V74H64.4","M":"M30.8 74V26L50 74L69.2 26V74","N":"M34 74V26L66 74V26","O":"M63.6 33C56.1 23.7 43.9 23.7 36.4 33C28.9 42.4 28.9 57.6 36.4 67C43.9 76.3 56.1 76.3 63.6 67C71.1 57.6 71.1 42.4 63.6 33","P":"M37.2 74V26H51.6C67.6 26 67.6 51.6 51.6 51.6H37.2","Q":"M63.6 33C56.1 23.7 43.9 23.7 36.4 33C28.9 42.4 28.9 57.6 36.4 67C43.9 76.3 56.1 76.3 63.6 67C71.1 57.6 71.1 42.4 63.6 33M54.8 62.8L64.8 74","R":"M37.2 74V26H51.6C67.6 26 67.6 50 51.6 50H37.2L66 74","S":"M64.4 34.8C59.6 24.4 38.8 22.8 37.2 35.6C35.6 48.4 62.8 48.4 62.8 61.2C62.8 75.6 40.4 77.2 34 66","T":"M32.4 26H67.6M50 26V74","U":"M34 26V56.4C34 77.2 66 77.2 66 56.4V26","V":"M32.4 26L50 74L67.6 26","W":"M27.6 26L38.8 74L50 26L61.2 74L72.4 26","X":"M34 26L66 74M66 26L34 74","Y":"M32.4 26L50 50L67.6 26M50 50V74","Z":"M34 26H66L34 74H66","Ñ":"M34 74V26L66 74V26","Á":"M32.4 74L50 26L67.6 74M38.8 58H61.2","É":"M62.8 26H37.2V74H62.8M37.2 50H56.4","Í":"M50 26V74M42 26H58M42 74H58","Ó":"M63.6 33C56.1 23.7 43.9 23.7 36.4 33C28.9 42.4 28.9 57.6 36.4 67C43.9 76.3 56.1 76.3 63.6 67C71.1 57.6 71.1 42.4 63.6 33","Ú":"M34 26V56.4C34 77.2 66 77.2 66 56.4V26"},ST={"A":["M50 26L32.4 74","M50 26L67.6 74","M38.8 58H61.2"],"B":["M37.2 26V74","M37.2 26H51.6C66 26 66 48.4 51.6 48.4H37.2H51.6C69.2 48.4 69.2 74 51.6 74H37.2"],"C":["M67.6 34.8C61.2 24.4 42 22.8 35.6 37.2C29.2 51.6 34 72.4 50 74C58 74.8 64.4 70.8 67.6 65.2"],"D":["M35.6 26V74","M35.6 26H48.4C72.4 26 72.4 74 48.4 74H35.6"],"E":["M37.2 26V74","M37.2 26H62.8","M37.2 50H56.4","M37.2 74H62.8"],"F":["M37.2 26V74","M37.2 26H62.8","M37.2 50H56.4"],"G":["M67.6 34.8C61.2 24.4 42 22.8 35.6 37.2C29.2 51.6 34 72.4 50 74C61.2 74.8 67.6 67.6 67.6 56.4V50H53.2"],"H":["M34 26V74","M66 26V74","M34 50H66"],"I":["M50 26V74","M42 26H58","M42 74H58"],"J":["M56.4 26V61.2C56.4 74 40.4 75.6 35.6 66","M48.4 26H64.4"],"K":["M35.6 26V74","M66 26L42 50L67.6 74"],"L":["M38.8 26V74H64.4"],"M":["M30.8 26V74","M30.8 26L50 74L69.2 26V74"],"N":["M34 26V74","M34 26L66 74V26"],"O":["M63.6 33C56.1 23.7 43.9 23.7 36.4 33C28.9 42.4 28.9 57.6 36.4 67C43.9 76.3 56.1 76.3 63.6 67C71.1 57.6 71.1 42.4 63.6 33"],"P":["M37.2 26V74","M37.2 26H51.6C67.6 26 67.6 51.6 51.6 51.6H37.2"],"Q":["M63.6 33C56.1 23.7 43.9 23.7 36.4 33C28.9 42.4 28.9 57.6 36.4 67C43.9 76.3 56.1 76.3 63.6 67C71.1 57.6 71.1 42.4 63.6 33","M54.8 62.8L64.8 74"],"R":["M37.2 26V74","M37.2 26H51.6C67.6 26 67.6 50 51.6 50H37.2L66 74"],"S":["M64.4 34.8C59.6 24.4 38.8 22.8 37.2 35.6C35.6 48.4 62.8 48.4 62.8 61.2C62.8 75.6 40.4 77.2 34 66"],"T":["M50 26V74","M32.4 26H67.6"],"U":["M34 26V56.4C34 77.2 66 77.2 66 56.4V26"],"V":["M32.4 26L50 74L67.6 26"],"W":["M27.6 26L38.8 74L50 26L61.2 74L72.4 26"],"X":["M34 26L66 74","M66 26L34 74"],"Y":["M32.4 26L50 50","M67.6 26L50 50V74"],"Z":["M34 26H66L34 74H66"]},AC='M43.6 17.8Q46.4 13.4 49 8.8Q52.6 6 54.7 7.8Q56.3 10.1 53.1 13.4Q48.2 15.5 43.6 17.8Z',AV='M44.7 16.8L52.9 9.4',AW='M52.9 9.4L44.7 16.8',
TI='M38.5 16C42 9.6 46 9.6 50 12.6C54 15.6 58 15.6 61.5 9.4',MK={'\u00c1':1,'\u00c9':1,'\u00cd':1,'\u00d3':1,'\u00da':1,'\u00d1':2},
BASE={'\u00c1':'A','\u00c9':'E','\u00cd':'I','\u00d3':'O','\u00da':'U','\u00d1':'N'},
KS={Y:1,M:1},OFF=9,HAIR=6.6,RIM=5.3,SPD=28,GAP=.5,LEAF='M0 0C1.4-1.5 3.4-1.9 5.2 0C3.4 1.9 1.4 1.5 0 0Z',N=0,C={},
f=function(v){return Math.round(v*10)/10},hy=Math.hypot,PI=Math.PI;
function parse(d,segs){var t=d.match(/[A-Za-z]|-?\d*\.?\d+/g),i=0,c,x=0,y=0,sx,sy,o=[],p=null;
 function n(){return +t[i++]}function seg(fn,k){for(var j=1;j<=k;j++)p.push(fn(j/k))}
 function ln(X,Y){var a=x,b=y,k=Math.max(1,Math.ceil(hy(X-a,Y-b)/.5));if(segs&&hy(X-a,Y-b)>4)segs.push([a,b,X,Y]);seg(function(u){return[a+(X-a)*u,b+(Y-b)*u]},k);x=X;y=Y}
 while(i<t.length){if(/[A-Za-z]/.test(t[i]))c=t[i++];
  if(c=='M'){x=sx=n();y=sy=n();p=[[x,y]];o.push(p);c='L'}
  else if(c=='L')ln(n(),n());else if(c=='H')ln(n(),y);else if(c=='V')ln(x,n());else if(c=='Z')ln(sx,sy);
  else if(c=='C'||c=='Q'){var a=[x,y],b=[n(),n()],e=c=='C'?[n(),n()]:null,g=[n(),n()],q=c=='Q';
   seg(function(u){var v=1-u;return q?[v*v*a[0]+2*v*u*b[0]+u*u*g[0],v*v*a[1]+2*v*u*b[1]+u*u*g[1]]:
    [v*v*v*a[0]+3*v*v*u*b[0]+3*v*u*u*e[0]+u*u*u*g[0],v*v*v*a[1]+3*v*v*u*b[1]+3*v*u*u*e[1]+u*u*u*g[1]]},40);x=g[0];y=g[1]}}
 return o.map(function(p){return rs(p,.5)})}
function rs(p,h){var o=[p[0]],acc=0,i;for(i=1;i<p.length;i++){var a=p[i-1],b=p[i],l=hy(b[0]-a[0],b[1]-a[1]);
 while(acc+l>=h){var u=(h-acc)/l;a=[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u];o.push(a);l=hy(b[0]-a[0],b[1]-a[1]);acc=0}acc+=l}
 var z=p[p.length-1],w=o[o.length-1];if(hy(z[0]-w[0],z[1]-w[1])>.05)o.push(z);return o}
function md(q,A){var m=1e9;for(var i=0;i<A.length;i++){var d=hy(q[0]-A[i][0],q[1]-A[i][1]);if(d<m)m=d}return m}
function cr(p){var d='M'+f(p[0][0])+' '+f(p[0][1]),i,a,b,c,e;for(i=0;i<p.length-1;i++){a=p[Math.max(i-1,0)];b=p[i];c=p[i+1];e=p[Math.min(i+2,p.length-1)];
 d+='C'+f(b[0]+(c[0]-a[0])/6)+' '+f(b[1]+(c[1]-a[1])/6)+' '+f(c[0]-(e[0]-b[0])/6)+' '+f(c[1]-(e[1]-b[1])/6)+' '+f(c[0])+' '+f(c[1])}return d}
function plen(p){for(var s=0,i=1;i<p.length;i++)s+=hy(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);return s}
/* sharp gaps: two straight segments that meet (or touch within 3 units) at under 75 degrees enclose a wedge no vine may enter */
function wedges(S){var W=[],i,j;function cl(px,py,s){var dx=s[2]-s[0],dy=s[3]-s[1],u=Math.max(0,Math.min(1,((px-s[0])*dx+(py-s[1])*dy)/(dx*dx+dy*dy)));return [s[0]+dx*u,s[1]+dy*u]}
 for(i=0;i<S.length;i++)for(j=i+1;j<S.length;j++){var a=S[i],b=S[j],best=null;
  [[a,b],[b,a]].forEach(function(pr){[[pr[0][0],pr[0][1]],[pr[0][2],pr[0][3]]].forEach(function(e){var c=cl(e[0],e[1],pr[1]);if(hy(c[0]-e[0],c[1]-e[1])<3&&!best)best=c})});
  if(!best)continue;var v=best,ends=function(s){var d0=hy(s[0]-v[0],s[1]-v[1]),d1=hy(s[2]-v[0],s[3]-v[1]),r=[];if(d0>4)r.push([s[0],s[1]]);if(d1>4)r.push([s[2],s[3]]);return r};
  ends(a).forEach(function(p){ends(b).forEach(function(q){var u=[p[0]-v[0],p[1]-v[1]],w=[q[0]-v[0],q[1]-v[1]],an=Math.acos((u[0]*w[0]+u[1]*w[1])/hy(u[0],u[1])/hy(w[0],w[1]));
   if(an<75*PI/180)W.push([v,p,q])})})}return W}
function inTri(q,T){function s(a,b){return (b[0]-a[0])*(q[1]-a[1])-(b[1]-a[1])*(q[0]-a[0])}var a=s(T[0],T[1]),b=s(T[1],T[2]),c=s(T[2],T[0]);return (a>0&&b>0&&c>0)||(a<0&&b<0&&c<0)}
function plan(ch){ch=String(ch||'').toUpperCase();if(C[ch])return C[ch];var b=BASE[ch]||ch;if(!L[ch]||!ST[b])return null;var m=MK[ch],SG=[];
 var A=[].concat.apply([],parse(L[ch]));if(m)A=A.concat([].concat.apply([],parse(m==1?AC:TI)));ST[b].forEach(function(d){parse(d,SG)});var W=wedges(SG);
 var x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;A.forEach(function(p){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});
 var cx=(x0+x1)/2,cy=(y0+y1)/2,G=[],O=[],gx,gy,k;for(gy=0;gy<101;gy++)for(gx=0;gx<101;gx++){G.push(md([gx,gy],A)<RIM);O.push(0)}
 var Q=[0];O[0]=1;while(Q.length){k=Q.pop();[k-1,k+1,k-101,k+101].forEach(function(j){if(j>=0&&j<10201&&!O[j]&&!G[j]&&Math.abs(j%101-k%101)<2){O[j]=1;Q.push(j)}})} /* flood fill: closed counters = not ink, not reachable */
 function cell(x,y){x=Math.round(x);y=Math.round(y);return x>=0&&y>=0&&x<101&&y<101?y*101+x:-1}
 function ink(x,y){var c=cell(x,y);return c>=0&&G[c]}function counter(x,y){var c=cell(x,y);return c>=0&&!G[c]&&!O[c]}
 function hit(q,a,R){for(var r=1.5;r<R;r+=1)if(ink(q[0]+Math.cos(a)*r,q[1]+Math.sin(a)*r))return 1;return 0}
 function gapOK(q){if(q[0]<10||q[0]>90||q[1]<10||q[1]>90||counter(q[0],q[1]))return 0;for(var i=0;i<W.length;i++)if(inTri(q,W[i]))return 0;return 1}
 function wide(q,nx,ny){var a=Math.atan2(ny,nx),k;for(k=-1;k<=1;k++)if(hit(q,a+k*.45,26))return 0;for(k=0;k<8;k++)if(hit(q,k*PI/8,7)&&hit(q,k*PI/8+PI,7))return 0;return 1}
 var strokes=[],t=.6,SS=ST[b].concat(m?[m==1?AW:TI]:[]); /* Spanish mark = last stroke: acute from upper right down-left; tilde left to right */
 SS.forEach(function(d,si){var P=parse(d)[0],n=P.length,i,j,T=[],cost=[];
  for(i=0;i<n;i++){var a=P[Math.max(i-2,0)],e=P[Math.min(i+2,n-1)],tx=e[0]-a[0],ty=e[1]-a[1],l=hy(tx,ty)||1;tx/=l;ty/=l;T.push([tx,ty]);var c=[];
   [1,-1].forEach(function(s){var nx=-ty*s,ny=tx*s,q9=[P[i][0]+nx*OFF,P[i][1]+ny*OFF],qh=[P[i][0]+nx*HAIR,P[i][1]+ny*HAIR],out=nx*(P[i][0]-cx)+ny*(P[i][1]-cy)>0?0:.05;
    c.push(gapOK(q9)&&md(q9,A)>OFF-.4&&wide(q9,nx,ny)?out:1e9);c.push(gapOK(qh)&&md(qh,A)>HAIR-.3?.35+out:1e9)});
   if(m&&si==SS.length-1)c=[1e9,1e9,1e9,1e9];c.push(2.5);cost.push(c)} /* the mark is too thin to go beside: its vine lies on it */ /* states: 0 +9, 1 +hair, 2 -9, 3 -hair, 4 on the ink */
  var SIDE=[1,1,-1,-1,0],INF=1e9,D=[cost[0].slice()],B=[];
  for(i=1;i<n;i++){var nd=[],nb=[];for(var s2=0;s2<5;s2++){var bv=INF,bi=4;for(var p0=0;p0<5;p0++){var tr=p0==s2?0:SIDE[p0]==SIDE[s2]?.6:(SIDE[p0]==0||SIDE[s2]==0)?12:INF,v=D[i-1][p0]+tr;if(v<bv){bv=v;bi=p0}}nd.push(bv+cost[i][s2]);nb.push(bi)}D.push(nd);B.push(nb)}
  var S=new Array(n);k=D[n-1].indexOf(Math.min.apply(null,D[n-1]));for(i=n-1;i>=0;i--){S[i]=k;if(i)k=B[i-1][k]}
  var last=si==SS.length-1,cut=n;if(!last){for(j=n-1;j>0&&S[j-1]==S[n-1];j--);if(n-j<14&&j>n/2)cut=j} /* no sideways hook at a mid-letter lift */
  var mag=S.map(function(v){return SIDE[v]*(v==1||v==3?HAIR:v==4?0:OFF)}),sm=[];
  for(i=0;i<n;i++){var u=0,w=0;for(j=-5;j<=5;j++){var q=Math.min(Math.max(i+j,0),n-1);u+=q==0?0:mag[q];w++}sm.push(i==0?0:u/w)} /* starts ON the pencil-down point (the seed) */
  if(!last){var e0=Math.max(1,cut-18),m0=Math.abs(sm[e0]);if(m0-Math.abs(sm[cut-1])>3){for(i=e0;i<cut&&Math.abs(sm[i])>m0-.6;i++);cut=Math.max(i,2)}} /* end the vine before it swings sideways into the next stroke */
  var pts=[];for(i=0;i<cut;i++)pts.push([P[i][0]-T[i][1]*sm[i],P[i][1]+T[i][0]*sm[i]]);
  var fl=null,te=T[n-1];
  var cl=function(v){return Math.max(8,Math.min(92,v))};
  if(last&&m){var MA=parse(m==1?AC:TI)[0],LA=[].concat.apply([],parse(L[ch])),ta0=Math.atan2(te[1],te[0]),ok=null;fl=null;
   for(var rr=4;rr<10&&!ok;rr+=.5)[0,-.4,.4,-.8,.8,-1.2,1.2,-1.6,1.6].forEach(function(da){if(ok)return;var q=[P[n-1][0]+Math.cos(ta0+da)*rr,P[n-1][1]+Math.sin(ta0+da)*rr];
    if(q[0]>=8&&q[0]<=92&&q[1]>=8&&q[1]<=92&&md(q,MA)>=(m==1?4:5.6)&&md(q,LA)>=RIM+3.2)ok=q});
   fl=ok||[cl(P[n-1][0]+te[0]*4),cl(P[n-1][1]+te[1]*4)];pts.push(fl)} /* the mark is small: its flower opens at the mark's pencil-lift, just off the mark so it stays visible on both themes */
  else if(last){var o0=KS[b]&&Math.abs(sm[n-1])>3?pts[pts.length-1]:P[n-1]; /* Y, M (Pi): the flower continues the vine's own line, no sideways kick back to the centreline */
   for(var ex=RIM+3.4;ex<22;ex+=.5){fl=[o0[0]+te[0]*ex,o0[1]+te[1]*ex];if(md(fl,A)>=RIM+3.4||fl[0]<9||fl[0]>91||fl[1]<9||fl[1]>91)break}pts.push(fl)} /* flower clear of the ink, just past the last lift */
  var dec=rs(pts,2.2),len=plen(dec),dur=len/SPD,cum=[0];for(i=1;i<dec.length;i++)cum.push(cum[i-1]+hy(dec[i][0]-dec[i-1][0],dec[i][1]-dec[i-1][1]));
  var on=0,hr=0,bs=0;S.forEach(function(v){if(v==4)on+=.5;else if(v==1||v==3)hr+=.5;else bs+=.5});
  /* leaves: even arc-length spacing, only where the vine is fully out beside the stroke (9 units), pointing away from it */
  var cand=[];for(i=6;i<n-6;i++)if((S[i]==0||S[i]==2)&&S[i-6]==S[i]&&S[i+6]==S[i]&&Math.abs(sm[i])>8.5)cand.push(i);
  var nl=Math.min(3,Math.floor(cand.length*.5/16))||(cand.length>20?1:0),lv=[];
  for(k=0;k<nl;k++){var ii=cand[Math.floor((k+.5)*cand.length/nl)],pp=pts[ii],s1=SIDE[S[ii]],nxx=-T[ii][1]*s1,nyy=T[ii][0]*s1,ta=Math.atan2(T[ii][1],T[ii][0]),na=Math.atan2(nyy,nxx),dd=((ta-na+3*PI)%(2*PI))-PI;
   var bi2=0,bd=1e9;for(j=0;j<dec.length;j++){var dj=hy(dec[j][0]-pp[0],dec[j][1]-pp[1]);if(dj<bd){bd=dj;bi2=j}}
   lv.push([f(pp[0]),f(pp[1]),Math.round((na+(dd>0?.7:-.7))*180/PI),f(t+dur*cum[bi2]/len)])}
  strokes.push({mark:!!(m&&si==SS.length-1),d:cr(dec),t0:f(t),dur:f(dur),seed:[f(P[0][0]),f(P[0][1])],end:[f(P[n-1][0]),f(P[n-1][1])],leaves:lv,route:{beside:f(bs),hair:f(hr),onInk:f(on)},fl:fl&&[f(fl[0]),f(fl[1])]});
  t+=dur+GAP});
 return C[ch]={strokes:strokes,c:[f(cx),f(cy)],end:f(t-GAP),fl:strokes[strokes.length-1].fl,wedges:W.length}}
/* timeline (s): glow 0-1.6; stroke k: seed pops at t0-.3, vine draws t0..t0+dur (linear, 28 units/s), .5 s lift pause; flower 1.4 s after lt-read */
function svg(ch,o){o=o||{};ch=String(ch||'').toUpperCase();var p=L[ch];if(!p)return '';var v=plan(ch),id='lt'+(N++),m=MK[ch],
 s='<svg class="lt'+(o.still?' lt-still':'')+(o.read||o.still?' lt-read':'')+(o.dark?' lt-dark':'')+'" viewBox="0 0 100 100" aria-hidden="true" focusable="false">'
 +'<defs><radialGradient id="'+id+'" gradientUnits="userSpaceOnUse" cx="'+v.c[0]+'" cy="'+v.c[1]+'" r="44"><stop class="lt-g0"/><stop offset=".5" class="lt-g1"/><stop offset="1" class="lt-g2"/></radialGradient></defs>'
 +'<rect class="lt-p" x="3" y="3" width="94" height="94" rx="9"/><rect class="lt-gl" x="3.6" y="3.6" width="92.8" height="92.8" rx="8.5" fill="url(#'+id+')"/>';
 if(o.dots)[[9,9],[91,9],[9,91],[91,91]].forEach(function(c){s+='<circle class="lt-dt" cx="'+c[0]+'" cy="'+c[1]+'" r="1.3"/>'});
 s+='<path class="lt-o" d="'+p+'"/><path class="lt-l" d="'+p+'"/>';
 if(m==1)s+='<path class="lt-ma" d="'+AC+'"/><path class="lt-mv" d="'+AV+'"/>';if(m==2)s+='<path class="lt-mo" d="'+TI+'"/><path class="lt-ml" d="'+TI+'"/>';
 v.strokes.forEach(function(k,i){var st=' pathLength="1" style="--d:'+k.t0+'s;--u:'+k.dur+'s" d="'+k.d+'"';s+='<g class="lt-k" data-k="'+(i+1)+'"><path class="lt-vc"'+st+'/><path class="lt-v"'+st+'/>';
  k.leaves.forEach(function(l){s+='<g transform="translate('+l[0]+' '+l[1]+') rotate('+l[2]+')"><path class="lt-f" style="--d:'+l[3]+'s" d="'+LEAF+'"/></g>'});s+='</g>'});
 v.strokes.forEach(function(k,i){var c=0;for(var j=0;j<i;j++)if(Math.hypot(v.strokes[j].seed[0]-k.seed[0],v.strokes[j].seed[1]-k.seed[1])<3)c++;
  var a='data-k="'+(i+1)+'" style="--d:'+f(k.t0-.3)+'s" cx="'+k.seed[0]+'" cy="'+k.seed[1]+'" r="';
  /* a pencil-down shared with an earlier stroke ("start at the same point") gets a ring around the first seed, so each start stays visible */
  s+=c?'<circle class="lt-sd lt-sr lt-src" '+a+f(1.9+1.9*c)+'"/><circle class="lt-sd lt-sr" '+a+f(1.9+1.9*c)+'"/>':'<circle class="lt-sd" '+a+'1.9"/>'});
 if(v.fl){s+='<g transform="translate('+v.fl[0]+' '+v.fl[1]+')"><g class="lt-fl">';for(var k=0;k<5;k++)s+='<ellipse class="lt-pt" rx="1.25" ry="2" cy="-1.8" transform="rotate('+k*72+')"/>';s+='<circle class="lt-fc" r="1.1"/></g></g>'}
 return s+'</svg>'}
/* play once larger: the letter grows at ~160 px over the page, then settles into its drop cap (FLIP). Skipped under reduced motion. */
function play(box,ch,o){o=o||{};if(!box||!box.getBoundingClientRect||box.getAttribute('data-lt-played'))return;box.setAttribute('data-lt-played','1'); /* once per page: never loops, never replays */
 var mq=R.matchMedia&&R.matchMedia('(prefers-reduced-motion: reduce)');if(mq&&mq.matches)return;
 var v=plan(ch),z=o.size||160,r=box.getBoundingClientRect(),d=document.createElement('div'),x=(innerWidth-z)/2,y=Math.max(12,r.top-8);
 d.className='lt-play';d.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;width:'+z+'px;height:'+z+'px;transform-origin:0 0;transition:transform .9s cubic-bezier(.3,.7,.3,1),opacity .3s .9s;z-index:9';
 d.innerHTML=svg(ch,{dark:o.dark});document.body.appendChild(d);box.style.visibility='hidden';var read=function(){d.firstChild.classList.add('lt-read')};
 setTimeout(function(){read();setTimeout(function(){var q=box.getBoundingClientRect(),sv=box.querySelector('svg').getBoundingClientRect();d.style.transform='translate('+(sv.left-x)+'px,'+(sv.top-y)+'px) scale('+sv.width/z+')';
  setTimeout(function(){box.style.visibility='';d.remove()},1250)},1500)},(v.end+.4)*1000)}
/* settle: once every animation in a read letter has finished, switch it to the still class (animation:none, same final values),
   so the finished letter renders exactly like the still one and holds no animation layers. Nothing restarts or loops. */
function settle(sv){if(!sv||!sv.classList||sv.classList.contains('lt-still')||!sv.classList.contains('lt-read'))return;
 if(sv.getAnimations&&sv.getAnimations({subtree:true}).some(function(a){return a.playState==='running'||a.playState==='pending'}))return;sv.classList.add('lt-still')}
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('animationend',function(e){var t=e.target;settle(t&&t.closest&&t.closest('svg.lt'))},true);
R.LANTERN={settle:settle,svg:svg,plan:plan,play:play,letters:Object.keys(L),version:'3.0-draft'};
})(typeof window!=='undefined'?window:globalThis);
