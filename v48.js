// v48: Paint multi-touch (one stroke per finger), Paint opens with Mirror off, Moiré drawn from a cached mesh image (smooth at x0.5),
// calm hum (angle folded to 0-45°, the grid repeats every 90°), tube beads get a gentle shake on every Play.
PT.sym=1;
// 1) Paint: last point per pointerId
{const st=paintSetup;paintSetup=function(){st();const cv=$('pcv');if(!cv)return;const L=new Map();
 const pos=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)*cv.width/b.width,(e.clientY-b.top)*cv.height/b.height]};
 cv.onpointerdown=e=>{try{cv.setPointerCapture(e.pointerId)}catch(_){}if(!L.size)pushUndo();const p=pos(e);if(PT.tool==='stamp'){paintStamp(p);return}L.set(e.pointerId,p);paintSeg(p,p)};
 cv.onpointermove=e=>{const l=L.get(e.pointerId);if(!l)return;const p=pos(e);paintSeg(l,p);L.set(e.pointerId,p)};
 cv.onpointerup=cv.onpointercancel=e=>{L.delete(e.pointerId)}}}
// 3) calm hum: fold angle into 0-45°
function moFold(a){a=((a%90)+90)%90;return Math.min(a,90-a)}
moBeat=function(){const M=LAB.mo;return Math.min(8,moFold(M.a)*.25+Math.abs(M.s-1)*20+Math.hypot(M.dx,M.dy)*.004)};
// 2) Moiré: mesh drawn once per size into an offscreen canvas, then rotated/scaled each frame
const MO_C={};
function moTile(col,W,H,g){const k=col+W+'x'+H+':'+g;if(MO_C[k])return MO_C[k];for(const j in MO_C)if(j.indexOf(col)===0)delete MO_C[j];
 const R=Math.ceil(Math.hypot(W,H)/2/.5+2*g),c=document.createElement('canvas');c.width=c.height=2*R;const x=c.getContext('2d');x.strokeStyle=col;x.lineWidth=g*.24;x.beginPath();
 for(let p=-R;p<=R;p+=g){x.moveTo(p+R,0);x.lineTo(p+R,2*R);x.moveTo(0,p+R);x.lineTo(2*R,p+R)}x.stroke();return MO_C[k]={c,R}}
drawMoire=function(x,cv,t){const W=cv.width,H=cv.height,M=LAB.mo;
 if(M.auto){const sp=LAB_RM?.15:1;M.a=3.2+1.6*Math.sin(t*.18*sp);M.s=1.04+.012*Math.sin(t*.11*sp)}
 if(LAB.hum&&AC)LAB.hum.o2.frequency.setTargetAtTime(196+moBeat(),AC.currentTime,.08);
 if(!MO_C.bg||MO_C.bgk!==W+'x'+H){const b=document.createElement('canvas');b.width=W;b.height=H;const y=b.getContext('2d'),bg=y.createRadialGradient(W/2,H/2,10,W/2,H/2,Math.max(W,H)*.7);bg.addColorStop(0,'#f1d9a8');bg.addColorStop(1,'#b9a6c9');y.fillStyle=bg;y.fillRect(0,0,W,H);MO_C.bg=b;MO_C.bgk=W+'x'+H}
 x.drawImage(MO_C.bg,0,0);const g=W<500?8:11;
 const mesh=(col,ang,sc,ox,oy)=>{const T=moTile(col,W,H,g),r=ang*Math.PI/180,c=Math.cos(r),s=Math.sin(r);
  let lx=(ox*c+oy*s)/sc,ly=(-ox*s+oy*c)/sc;lx=((lx%g)+g)%g;ly=((ly%g)+g)%g;   // grid is periodic: only the offset mod g matters
  x.save();x.translate(W/2,H/2);x.rotate(r);x.scale(sc,sc);x.drawImage(T.c,-T.R+lx-g,-T.R+ly-g);x.restore()};
 mesh('rgba(38,30,70,.78)',0,1,0,0);mesh('rgba(20,40,80,.78)',M.a,M.s,M.dx,M.dy);
 const v=$('lab_mv');if(v)v.textContent=`${gNum(Math.round(moAng(M.a)*10)/10,1)}° · ×${gNum(M.s,2)}`};
// 4) Tube: gentle shake on every Play
{const on=labToneOn;labToneOn=function(){const was=!!LAB.tone;const r=on.apply(this,arguments);if(!was&&LAB.tone&&LAB.toy==='kundt')LAB.shk=Math.max(LAB.shk||0,.5);return r}}
