// v37: crafted cymatic rings (Music 3-fold, Games 4-fold, Sounds 5-fold, Stars 6-fold) in four warm theme-derived colors,
// a real 1.6 s bloom (fade + scale-in; none with reduced motion), and the lit-today Home lamp on first load.

// Four warm hues pulled toward the theme accent so every theme gets its own family.
function glowColors(){const L=getLook(),t=THEMES[L.theme]||THEMES.warm,[r,g,b]=hex2rgb(t[3]).map(x=>x/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0;
 if(mx!==mn){const d=mx-mn;h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360}
 const pull=(warm)=>{let d=((h-warm+540)%360)-180;return (warm+d*.12+360)%360},hsl=(H,S,Lt)=>{const a=S*Math.min(Lt,1-Lt),f=n=>{const k=(n+H/30)%12;return Math.round(255*(Lt-a*Math.max(-1,Math.min(k-3,9-k,1))))};return[f(0),f(8),f(4)]};
 return{music:hsl(pull(40),.95,.66),games:hsl(pull(14),.9,.68),sounds:hsl(pull(335),.8,.74),stars:hsl(pull(52),.9,.76)}}
const RING_FOLD={music:3,games:4,sounds:5,stars:6},RING_BAND={music:.42,games:.55,sounds:.68,stars:.81};
glowRings=function(cv,opts){const gs=glowStats(),list=[];['music','games','sounds','stars'].forEach(c=>{for(let i=0;i<gs.rings[c];i++)list.push([c,i])});
 cv.parentNode.querySelectorAll('canvas.glowrings').forEach(x=>x.remove());if(!list.length)return null;
 const ov=document.createElement('canvas');ov.className='glowrings';ov.setAttribute('aria-hidden','true');if(getComputedStyle(cv.parentNode).position==='static')cv.parentNode.style.position='relative';cv.insertAdjacentElement('afterend',ov);
 const place=()=>{ov.style.cssText=`position:absolute;pointer-events:none;mix-blend-mode:screen;left:${cv.offsetLeft}px;top:${cv.offsetTop}px;width:${cv.offsetWidth}px;height:${cv.offsetHeight}px;border-radius:${getComputedStyle(cv).borderRadius}`};place();
 const col=glowColors(),nb=Math.max(0,Math.min(list.length,opts.bloom||0)),fresh=list.length-nb,t0=performance.now(),BL=1600,mini=(opts.dpr||1)===1&&cv.offsetWidth<300;let raf=0;
 const ease=x=>1-Math.pow(1-x,3);
 function curve(x,cx,cy,f,rgb,a){x.beginPath();for(let s=0;s<=480;s++){const th=s/480*Math.PI*2,rr=f(th);const px=cx+rr*Math.cos(th),py=cy+rr*Math.sin(th);s?x.lineTo(px,py):x.moveTo(px,py)}x.closePath();x.strokeStyle=`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;x.stroke()}
 // Level 1: k scalloped petals (Chladni nodal rim). Level 2: the mirrored petal set, giving a 2k-point lattice.
 // Level 3: an inner k-lobed rose. Level 4: an outer 2k-fold halo with petal-tip nodes.
 function layer(x,cx,cy,S,c,j,a,sc,rot){const k=RING_FOLD[c],R=S*RING_BAND[c]*sc,w=S*.03*sc,rgb=col[c],pet=(th,o)=>R-w+2*w*Math.pow(Math.abs(Math.cos(k*(th+rot+o)/2)),1.6);
  if(j===0)curve(x,cx,cy,th=>pet(th,0),rgb,a);
  else if(j===1)curve(x,cx,cy,th=>pet(th,Math.PI/k),rgb,a);
  else if(j===2)curve(x,cx,cy,th=>R-1.35*w+.35*w*Math.cos(k*(th+rot)),rgb,a);
  else{curve(x,cx,cy,th=>R+1.25*w+.22*w*Math.cos(2*k*(th+rot)),rgb,a*.8);
   if(!mini){x.fillStyle=`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.min(.6,a*2)})`;for(let i=0;i<k;i++){const th=i*2*Math.PI/k-rot,rr=R+w;x.beginPath();x.arc(cx+rr*Math.cos(th),cy+rr*Math.sin(th),Math.max(1.2,S*.005),0,7);x.fill()}}}}
 function draw(ts){if(!ov.isConnected||!cv.isConnected){cancelAnimationFrame(raf);ov.remove();return}place();const d=opts.dpr||1,W=ov.width=ov.offsetWidth*d,H=ov.height=ov.offsetHeight*d,cx=W/2,cy=H/2,S=Math.min(W,H)/2,x=ov.getContext('2d');
  const el=RMOTION?BL:Math.max(0,ts-t0),t=RMOTION?0:el/1000,p=Math.min(1,el/BL);ov.dataset.bloom=nb?p.toFixed(2):'';x.clearRect(0,0,W,H);x.lineWidth=Math.max(.8,S*(mini?.007:.0045));x.shadowBlur=S*.02;
  list.forEach(([c,j],i)=>{const base=.28-.035*j,rot=(RMOTION?0:t*.012*(RING_FOLD[c]%2?1:-1))-Math.PI/2/RING_FOLD[c];let a=base,sc=1;
   if(i>=fresh&&!RMOTION){const e=ease(p);a=base*e+.32*Math.sin(Math.PI*p);sc=.86+.14*e}
   x.shadowColor=`rgba(${col[c][0]},${col[c][1]},${col[c][2]},.55)`;layer(x,cx,cy,S,c,j,a,sc,rot)});
  if(RMOTION)return;raf=LOWEND&&p>=1?setTimeout(()=>requestAnimationFrame(draw),120):requestAnimationFrame(draw)}
 raf=requestAnimationFrame(draw);return ov};

// Home lamp on first load: v12 drew the hub before the later wrappers (rings, lit-today flame) existed, and the
// language loader re-shows the section before them too. Re-render once everything is loaded.
function hubFresh(){try{if($('hub')&&!$('hub').classList.contains('hidden'))RENDER.hub()}catch(e){}}
hubFresh();if(document.readyState!=='complete')addEventListener('load',()=>setTimeout(hubFresh,0),{once:true});
