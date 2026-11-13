/* v108: drop hidden paths from the offline save pack, honor Soft sounds
   and Bedtime on the Grow ending, and keep Koch / Sierpinski detail
   through the 10^13 zoom cap. Do not wrap show(). */
(function(){
 const prev=typeof patGrowPlayScale107==='function'?patGrowPlayScale107:null;
 patGrowPlayScale107=function(){
  try{
   if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
   const c=typeof ac==='function'?ac():null;if(!c)return;
   const bedtime=!!(document.body&&document.body.classList.contains('bedtime'));
   const night=typeof patNight==='function'&&patNight();
   const vol=(night||bedtime)?.06:.12,t0=c.currentTime+.04,step=.75;
   const freq=[261.63,293.66,329.63,392,440,523.25];
   freq.forEach((f,i)=>{
    const t=t0+i*step;
    const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),g2=c.createGain();
    o.type='sine';o.frequency.value=f;o2.type='sine';o2.frequency.value=f/2;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+.7);
    g2.gain.setValueAtTime(0,t);g2.gain.linearRampToValueAtTime(vol*.45,t+.06);g2.gain.exponentialRampToValueAtTime(.0001,t+1.15);
    o.connect(g);g.connect(c.destination);o2.connect(g2);g2.connect(c.destination);
    o.start(t);o.stop(t+.75);o2.start(t);o2.stop(t+1.2);
   });
  }catch(e){}
 };
})();

/* Koch needs ~33 levels to reach a one-pixel edge at 10^13× on the 360 canvas;
   Sierpinski halves, so it needs ~50. View culling plus the 1px stop keep
   the on-screen work bounded. 52 is the depth that lets the pixel stop,
   not the cap, end the detail. */
const PAT_GEOM_MAXD108=52;

patExGeomRender107=function(cv,rec,opts){
 const o=opts||{},x=cv.getContext('2d'),W=cv.width,H=cv.height;
 const span=rec.span,cx=rec.cx,cy=rec.cy,kind=patExKindOf107(rec);
 const night=patNight(),px=span/Math.max(W,H);
 if(px<PAT_MIN_PX106)return false;
 const zoom=patExZoomOf106(span);
 const pal=night?['#0d0f1a','#1c2a3a','#3a4e3f','#6f9a7a','#eac77d','#fff6d8']:['#fff8ec','#e8c894','#c45a3a','#5b7ea8','#6f9a7a','#3a2a1a'];
 const xmin=cx-span/2,ymin=cy-span*H/W/2,dx=span/W,dy=(span*H/W)/H;
 const xmax=xmin+span,ymax=ymin+span*H/W;
 const toX=v=>(v-xmin)/dx,toY=v=>(v-ymin)/dy;
 const minLen=span/Math.max(W,1);
 const maxD=PAT_GEOM_MAXD108;
 x.fillStyle=pal[0];x.fillRect(0,0,W,H);
 if(kind==='koch'){
  x.strokeStyle=pal[4]||pal[pal.length-1];
  x.lineWidth=Math.max(1.1,2.2-(Math.log10(Math.max(1,zoom))*0.15));
  x.lineCap='round';x.lineJoin='round';
  const peak=(ax,ay,bx,by)=>{
   const ux=(bx-ax)/3,uy=(by-ay)/3;
   return {mx:ax+ux,my:ay+uy,nx:ax+2*ux,ny:ay+2*uy,
    px:ax+ux+(ux/2+uy*Math.sqrt(3)/2),py:ay+uy+(uy/2-ux*Math.sqrt(3)/2)};
  };
  const side=function(ax,ay,bx,by,d){
   const len=Math.hypot(bx-ax,by-ay),pad=len*0.45;
   if(Math.max(ax,bx)+pad<xmin||Math.min(ax,bx)-pad>xmax||Math.max(ay,by)+pad<ymin||Math.min(ay,by)-pad>ymax)return;
   if(d>=maxD||len<=minLen){
    x.beginPath();x.moveTo(toX(ax),toY(ay));x.lineTo(toX(bx),toY(by));x.stroke();
    return;
   }
   const k=peak(ax,ay,bx,by);
   side(ax,ay,k.mx,k.my,d+1);side(k.mx,k.my,k.px,k.py,d+1);side(k.px,k.py,k.nx,k.ny,d+1);side(k.nx,k.ny,bx,by,d+1);
  };
  const h=Math.sqrt(3)/2;
  side(0,0,1,0,0);side(1,0,.5,h,0);side(.5,h,0,0,0);
 }else{
  const h=Math.sqrt(3)/2;
  (function tri(ax,ay,bx,by,cx,cy,d){
   const minx=Math.min(ax,bx,cx),maxx=Math.max(ax,bx,cx),miny=Math.min(ay,by,cy),maxy=Math.max(ay,by,cy);
   if(maxx<xmin||minx>xmax||maxy<ymin||miny>ymax)return;
   const size=Math.max(maxx-minx,maxy-miny);
   if(d>=maxD||size<=minLen){
    x.fillStyle=pal[4]||pal[pal.length-1];
    x.beginPath();x.moveTo(toX(ax),toY(ay));x.lineTo(toX(bx),toY(by));x.lineTo(toX(cx),toY(cy));x.closePath();x.fill();
    return;
   }
   const mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px=(cx+ax)/2,py=(cy+ay)/2;
   tri(ax,ay,mx,my,px,py,d+1);tri(mx,my,bx,by,nx,ny,d+1);tri(px,py,nx,ny,cx,cy,d+1);
  })(0,0,1,0,.5,h,0);
 }
 if(!o.noTurtle)patExMaybeTurtle106(x,cv,rec,zoom);
 return true;
};
