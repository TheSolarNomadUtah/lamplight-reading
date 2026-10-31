let K1=.004;   // mode 1: beads relax toward a gentle slope (density 1+8x from the middle), not two piles at the walls

// v49: Kundt's tube: end nodes pull weaker than inner nodes, a firmer soft wall while sound plays, and capped end piles (extra beads spill inward), so beads no longer collect at the ends.
drawKundt=function(x,cv,t){const W=cv.width,H=cv.height,L=LAB.len;let f=LAB.f,on=!!LAB.tone,mic=false;
 if(LAB.an){const p=micPitch();if(p){LAB.pf=LAB.pf?LAB.pf*.8+p*.2:p;LAB.pt=t}if(LAB.pf&&t-(LAB.pt||0)<.6){f=LAB.pf;on=true;mic=true;const e=$('lab_fv');if(e)e.textContent=gNum(Math.round(f))+' Hz'}}
 const n=2*L*f/343,near=Math.max(1,Math.round(n)),tol=mic?1.3:3.2,res=on?Math.exp(-Math.pow((n-near)*tol,2)):0,k=Math.PI*near;
 x.fillStyle='#0a0d1c';x.fillRect(0,0,W,H);const tx=40,tw=W-80,ty=H/2-55,th=110;
 const grd=x.createLinearGradient(0,ty,0,ty+th);grd.addColorStop(0,'rgba(190,220,255,.16)');grd.addColorStop(.5,'rgba(190,220,255,.04)');grd.addColorStop(1,'rgba(190,220,255,.14)');
 x.fillStyle=grd;x.strokeStyle='rgba(200,225,255,.45)';x.lineWidth=2;x.beginPath();x.roundRect?x.roundRect(tx,ty,tw,th,18):x.rect(tx,ty,tw,th);x.fill();x.stroke();
 x.fillStyle='#c9a86a';x.fillRect(tx-14,ty+8,14,th-16);x.fillStyle='#6b7aa0';x.fillRect(tx+tw,ty+8,14,th-16);
 if(!BEADS||BEADS[0].v===undefined)labBeadsReset();
 const sp=LAB_RM?.25:1,NB=Math.round(tw/7),bins=new Array(NB).fill(0);
 if(on&&res>.3&&LAB.kn!==near){if(LAB.kn)LAB.shk=1;LAB.kn=near}const shk=LAB.shk||0;if(shk)LAB.shk=shk<.02?0:shk*.97;   // new mode: tap the tube so beads leave old piles (ends too) and re-form
 const NBk=Math.round((W-80)/7);BEADS.forEach((b,i)=>b.i=i);for(const b of BEADS){const a=Math.abs(Math.sin(k*b.u));
  if(on){if(near===1){const r=(b.i+.5)/BEADS.length,c=r<.5?1-2*r:2*r-1,X=.93*(Math.sqrt(1+80*c)-1)/8;b.v+=K1*sp*res*((r<.5?.5-X/2:.5+X/2)-b.u)}else{const N=BEADS.length,r=(b.i+.5)/N*near,j=r<.5?0:r>near-.5?near:Math.round(r),lo=j===0?0:j-.5,hi=j===near?near:j+.5,q=(r-lo)/(hi-lo),cnt=(hi-lo)/near*N,w=Math.max(.012,cnt/(11*NBk));   // v50: every node gets a fair share by rank; piles spread sideways so none is taller than the tube
  const tu=j===0?q*w:j===near?1-(1-q)*w:j/near+(q-.5)*w;b.v+=.004*sp*res*(tu-b.u)}                        // toward the nodes
   b.v+=(Math.random()-.5)*(.0014*(.25+a*res)+.03*shk)*sp;}                            // kicks: strongest where the air moves, a little everywhere while sound plays
  if(on){if(b.u<.06)b.v+=.0003*sp*(1-b.u/.06);if(b.u>.94)b.v-=.0003*sp*(1-(1-b.u)/.06)}     // soft walls: the ends don't trap beads
  b.v*=.86;b.u+=b.v;if(b.u<.003){b.u=.003;b.v=Math.abs(b.v)*.5}if(b.u>.997){b.u=.997;b.v=-Math.abs(b.v)*.5}}
 BEADS.sort((p,q)=>p.u-q.u);
 for(const b of BEADS){const bi=Math.min(NB-1,Math.floor(b.u*NB)),lvl=bins[bi]++,a=Math.abs(Math.sin(k*b.u))*res,
  wob=LAB_RM?0:Math.sin(t*5+b.h*30)*a*2.5;
  const px=tx+8+(bi+.5)/NB*(tw-16)+(b.h-.5)*4,py=ty+th-9-lvl*3.2-a*10*b.h+wob;
  if(py<ty+8)continue;x.fillStyle=`rgba(255,${232-a*50|0},${190-a*70|0},.88)`;x.beginPath();x.arc(px,py,2.5,0,6.283);x.fill()}
 x.font='18px sans-serif';x.textAlign='center';
 if(on){for(let i=0;i<=near;i++){const px=tx+6+(i/near)*(tw-12);x.fillStyle=`rgba(255,213,138,${.25+.5*res})`;x.fillRect(px-1,ty+th+8,2,10)}
  x.fillStyle='#f6efe0';x.fillText(mic?gT('Your voice: {f} Hz. Mode {n}.',{f:gNum(Math.round(f)),n:gNum(near)}):(res>.6?gT('Resonance! Mode {n}: {k} nodes',{n:gNum(near),k:gNum(near+1)}):gT('Close to mode {n}. Slide a little.',{n:gNum(near)})),W/2,ty+th+48)}
 else{x.fillStyle='#bfb8a8';x.fillText(LAB.an?gT('Sing or hum a steady note.'):gT('Play a tone or use the microphone.'),W/2,ty+th+48)}
 x.fillStyle='#8f99b8';x.font='14px sans-serif';x.fillText(gT('Resonant notes for this tube: {f} Hz × 1, 2, 3 …',{f:gNum(Math.round(343/(2*L)))}),W/2,ty-18)};
// Paint on narrow phones: when the toolbar wraps onto more rows, the canvas starts below it instead of under it.
document.head.insertAdjacentHTML('beforeend','<style>#pcv,#pgd,#pfx{top:var(--pbh,58px)!important;height:calc(100% - var(--pbh,58px))!important}</style>');
{const st=paintSetup;paintSetup=function(){const s=$('pstudio'),bar=s&&s.querySelector('.pbar');if(bar)s.style.setProperty('--pbh',Math.max(58,Math.ceil(bar.getBoundingClientRect().height))+'px');return st.apply(this,arguments)}}
{const rp=renderPaint;renderPaint=function(){const r=rp.apply(this,arguments);const s=$('pstudio'),bar=s&&s.querySelector('.pbar');
 if(bar){const h=Math.max(58,Math.ceil(bar.getBoundingClientRect().height))+'px';if(s.style.getPropertyValue('--pbh')!==h){s.style.setProperty('--pbh',h);paintSetup()}}return r};RENDER.paint=renderPaint}
