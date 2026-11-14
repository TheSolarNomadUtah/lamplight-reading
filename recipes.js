/* Pattern Quilt. square(id,level 1-4) / quilt([{id,level}]). Offline, no locks. */
(function(R,F){typeof module==="object"&&module.exports?module.exports=F():R.PatternQuilt=F()})(typeof self!=="undefined"?self:this,function(){
var N="#120E18",K="#72583F",A="#E6B454",D="#855A00",C=["#FFF2D8","#F6EFE0","#F0D8B0"],G=137.508*Math.PI/180;
var NS="http://www.w3.org/2000/svg",ST=' stroke="'+D+'" stroke-width="',LJ='" stroke-linejoin="round"';
function f(n,d){var s=(+n).toFixed(d==null?1:d).replace(/\.?0+$/,"");if(s.indexOf("-0.")===0)s="-."+s.slice(3);else if(s[0]==="0"&&s[1]===".")s=s.slice(1);return s||"0"}
function st(l){l=+l;return l>=1&&l<=4?l:l>=0&&l<=3?l+1:1}
function P(p,z){return"M"+p.map(function(q){return f(q[0])+" "+f(q[1])}).join("L")+(z?"Z":"")}
function clip(u){return '<clipPath id="'+u+'"><rect x="8" y="8" width="84" height="84" rx="10"/></clipPath>'}
function cloth(i){return '<rect x="4" y="4" width="92" height="92" rx="12" fill="'+C[i%3]+'" stroke="'+K+'" stroke-width="1.4"/><rect x="8" y="8" width="84" height="84" rx="10" fill="none" stroke="'+D+'" stroke-width=".6" opacity=".35"/><rect x="4" y="4" width="92" height="92" rx="12" fill="none" stroke="'+K+'" stroke-width=".9" stroke-dasharray="2.4 1.8" stroke-linecap="round" opacity=".4"/>'}
function ring(n){if(!n)return[[0,0]];for(var c=[],q=n,r=0,s=[[0,-1],[-1,0],[-1,1],[0,1],[1,0],[1,-1]],k=0,i;k<6;k++)for(i=0;i<n;i++)c.push([q,r]),q+=s[k][0],r+=s[k][1];return c}
function hex(s,u){var kind=["1","1+3","1+6","1+6+12"][s-1],sz=[20,15.2,12.4,8.8][s-1],cells=[[0,0]],r1,i,q,r,x,y,j,a,p,d=[];
if(kind!=="1"){r1=ring(1);cells=cells.concat(kind==="1+3"?[r1[0],r1[2],r1[4]]:r1)}
if(kind==="1+6+12")cells=cells.concat(ring(2));
for(i=0;i<cells.length;i++){q=cells[i][0];r=cells[i][1];x=50+sz*(Math.sqrt(3)*q+Math.sqrt(3)/2*r);y=50+sz*1.5*r;p=[];for(j=0;j<6;j++){a=(30+60*j)*Math.PI/180;p.push([x+sz*.96*Math.cos(a),y+sz*.96*Math.sin(a)])}d.push(P(p,1))}
return '<g clip-path="url(#'+u+')"><path d="'+d.join("")+'" fill="'+A+'" fill-opacity=".22"'+ST+'1.8'+LJ+"/></g>"}
function sun(s,u){var n=[5,8,13,13][s-1],i,a,r,d="",c;for(i=4;i<=n+3;i++)c=Math.sqrt(i+.6);c=33/c;for(i=4;i<=n+3;i++){a=i*G;r=c*Math.sqrt(i+.6);d+="M"+f(50+r*Math.cos(a))+" "+f(50+r*Math.sin(a))+"h0"}
return '<g clip-path="url(#'+u+')"><circle cx="50" cy="50" r="5" fill="'+A+'"/><path d="'+d+'" fill="none" stroke="'+A+'" stroke-width="7" stroke-linecap="round"/></g>'}
function hwy(o){for(var p=[[0,0]],x=0,y=0,dx=1,dy=0,n=1<<o,i=1,t;i<=n;i++){x+=dx;y+=dy;p.push([x,y]);if((i&((i&-i)<<1))===0){t=dx;dx=-dy;dy=t}else{t=dx;dx=dy;dy=-t}}return p}
function fit(pts){var xs=pts.map(function(p){return p[0]}),ys=pts.map(function(p){return p[1]}),minx=Math.min.apply(null,xs),maxx=Math.max.apply(null,xs),miny=Math.min.apply(null,ys),maxy=Math.max.apply(null,ys),s=72/Math.max(maxx-minx,maxy-miny,1e-6),cx=(minx+maxx)/2,cy=(miny+maxy)/2;
return pts.map(function(p){return[50+(p[0]-cx)*s,50+(p[1]-cy)*s]})}
function dragon(s,u){return '<g clip-path="url(#'+u+')"><path d="'+P(fit(hwy([4,5,6,7][s-1])))+'" fill="none"'+ST+'2.6" stroke-linecap="round'+LJ+"/></g>"}
function rose(s,u){var n=s<3?6:8,rings=s<4?1:2,r=36,p=['<circle cx="50" cy="50" r="'+f(r*.34)+'"/>'],k,i,a,cr;
for(k=1;k<=rings;k++){cr=r*(rings===1?.48:.25*k);for(i=0;i<n;i++){a=2*Math.PI*i/n-Math.PI/2;p.push('<circle cx="'+f(50+cr*Math.cos(a))+'" cy="'+f(50+cr*Math.sin(a))+'" r="'+f(cr)+'"/>')}}
p.push('<circle cx="50" cy="50" r="'+f(r)+'"/>');
return '<g clip-path="url(#'+u+')" fill="none"'+ST+'1.8">'+p.join("")+"</g>"}
function lobe(n,r0,r1){var d="",i,a0,a1,am,x0,y0,x1,y1,tx,ty,px,py,tw,ml,mr,m=function(t,rr){return f(50+rr*Math.cos(t))+" "+f(50+rr*Math.sin(t))};
for(i=0;i<n;i++){a0=-Math.PI/2+2*Math.PI*i/n;a1=a0+2*Math.PI/n;am=(a0+a1)/2;
tx=50+r1*Math.cos(am);ty=50+r1*Math.sin(am);px=-Math.sin(am);py=Math.cos(am);tw=(r1-r0)*.28;ml=a0+(am-a0)*.42;mr=am+(a1-am)*.58;
d+=(i?"L":"M")+m(a0,r0)+"C"+m(ml,r0+(r1-r0)*.55)+" "+f(tx-px*tw)+" "+f(ty-py*tw)+" "+f(tx)+" "+f(ty)+"C"+f(tx+px*tw)+" "+f(ty+py*tw)+" "+m(mr,r0+(r1-r0)*.55)+" "+m(a1,r0)}
return d+"Z"}
function scallops(s,u){var L=[[3],[3,5],[3,5,8],[3,5,8]][s-1],R=[[10,34],[8,22,36],[7,18,28,38],[7,18,28,38]][s-1],o=[],i;
for(i=0;i<L.length;i++)o.push('<path d="'+lobe(L[i],R[i],R[i+1])+'" fill="'+A+'" fill-opacity="'+f(.16+i*.06,2)+'"'+ST+'1.7'+LJ+"/>");
return '<g clip-path="url(#'+u+')">'+o.join("")+"</g>"}
function lcg(n,s){for(var x=s,o=[],i=0;i<n;i++)x=(1664525*x+1013904223)>>>0,o.push(x);return o}
function sites(n,seed){var s=[[50,50]],v=lcg(Math.max(0,n-1),seed==null?109:seed),i,u,w,t;for(i=0;i<v.length;i++){t=v[i];u=((t%1000)/1000)*2-1;w=((((t/1000)|0)%1000)/1000)*2-1;if(u*u+w*w>1){u*=.7;w*=.7}s.push([50+u*31.2,50+w*31.2])}return s}
function hit(pr,cu,px,py,nx,ny){var dx=cu[0]-pr[0],dy=cu[1]-pr[1],de=nx*dx+ny*dy,t=Math.abs(de)<1e-12?0:(nx*(px-pr[0])+ny*(py-pr[1]))/de;t=t<0?0:t>1?1:t;return[pr[0]+t*dx,pr[1]+t*dy]}
function clp(poly,px,py,nx,ny){if(!poly.length)return[];var o=[],pr=poly[poly.length-1],pin=nx*pr[0]+ny*pr[1]<=nx*px+ny*py+1e-9,i,cu,cin;
for(i=0;i<poly.length;i++){cu=poly[i];cin=nx*cu[0]+ny*cu[1]<=nx*px+ny*py+1e-9;if(cin){if(!pin)o.push(hit(pr,cu,px,py,nx,ny));o.push(cu)}else if(pin)o.push(hit(pr,cu,px,py,nx,ny));pr=cu;pin=cin}return o}
function voronoi(s,u){var n=[5,7,9,11][s-1],S=sites(n),rg=[],i,a,d=[],poly,j;
for(i=0;i<24;i++){a=2*Math.PI*i/24;rg.push([50+40*Math.cos(a),50+40*Math.sin(a)])}
for(i=0;i<S.length;i++){poly=rg.slice();for(j=0;j<S.length;j++)if(i!==j){poly=clp(poly,(S[i][0]+S[j][0])/2,(S[i][1]+S[j][1])/2,S[j][0]-S[i][0],S[j][1]-S[i][1]);if(poly.length<3)break}if(poly.length>=3)d.push(P(poly,1))}
return '<g clip-path="url(#'+u+')"><path d="'+d.join("")+'" fill="'+A+'" fill-opacity=".18"'+ST+'1.7'+LJ+"/></g>"}
var DRAW={hex:hex,sunflower:sun,heighway:dragon,rosette:rose,scallops:scallops,voronoi:voronoi};
var AL={"dragon-curve":"heighway",dragon:"heighway",fibonacci:"scallops","fib-scallops":"scallops","golden-spiral":"sunflower"};
function res(id){id=String(id||"").toLowerCase().replace(/_/g,"-");return DRAW[id]?id:AL[id]||null}
function inner(id,level,idx,uid){var k=res(id);return k?'<svg xmlns="'+NS+'" viewBox="0 0 100 100"><defs>'+clip(uid)+"</defs>"+cloth(idx)+DRAW[k](st(level),uid)+"</svg>":""}
function square(id,level,opt){opt=opt||{};return inner(id,level,opt.idx||0,opt.uid||"q")}
function voronoiCells(s,opt){opt=opt||{};var n=opt.n||[5,7,9,11][st(s)-1],S=sites(n,opt.seed==null?109:opt.seed),rg=[],i,j,a,cells=[],poly;for(i=0;i<24;i++){a=2*Math.PI*i/24;rg.push([50+40*Math.cos(a),50+40*Math.sin(a)])}for(i=0;i<S.length;i++){poly=rg.slice();for(j=0;j<S.length;j++)if(i!==j){poly=clp(poly,(S[i][0]+S[j][0])/2,(S[i][1]+S[j][1])/2,S[j][0]-S[i][0],S[j][1]-S[i][1]);if(poly.length<3)break}if(poly.length>=3)cells.push({i:i,site:S[i],poly:poly})}return{n:n,sites:S,cells:cells}}
function rosetteCircles(s){s=st(s);var n=s<3?6:8,rings=s<4?1:2,r=36,o={n:n,rings:rings,r:r,circles:[{x:50,y:50,r:r*.34,kind:"boss"}]},k,i,a,cr;for(k=1;k<=rings;k++){cr=r*(rings===1?.48:.25*k);for(i=0;i<n;i++){a=2*Math.PI*i/n-Math.PI/2;o.circles.push({x:50+cr*Math.cos(a),y:50+cr*Math.sin(a),r:cr,kind:"petal"})}}o.circles.push({x:50,y:50,r:r,kind:"rim"});return o}
return{square:square,ids:["hex","sunflower","heighway","rosette","scallops","voronoi"],resolve:res,stage:st,depth:{hex:["1","4","7","19"],sunflower:[5,8,13,13],heighway:[4,5,6,7],rosette:["6x1","6x1","8x1","8x2"],scallops:["3","3+5","3+5+8","3+5+8"],voronoi:[5,7,9,11]},voronoiCells:voronoiCells,rosetteCircles:rosetteCircles}
});
