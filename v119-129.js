// v119: Inner light shared engine for Shell, Owl, and Moth.
// Look (render mode) and inner pattern are pluggable parameters so a later
// picker can pass "inner" / "glass" / "constellation" and "hex" / "spiral" /
// "veins". This release ships no picker: the default look is Inner light,
// and each species keeps its own pattern (turtle hex, owl spiral, moth veins).
// Lamp, Dragon, and Phoenix keep their current art. Patterns grow on this
// device only; no child data is stored. Owl chest dots start at n=4 (Pi).
(function(){
const I={
 N:'#120E18',INK:'#72583F',CLAY:'#E8C894',MUZ:'#F4E4C4',TIP:'#FFF6D8',AMB:'#E6B454',DEEP:'#855A00',
 SAGE:'#5B7A6A',FOOT:'#A88361',BLUSH:'#C47A6A',
 ROSE:{mid:'#C98990',tip:'#E8C8C8',deep:'#8A4A55'},
 VIOLET:{mid:'#A894C0',tip:'#D8CEE8',deep:'#5A4A78'},
 MOON:{mid:'#8AA4C0',tip:'#D0E0F0',deep:'#3A5470'},
 CSS:'.il-h,.il-c{animation:ilb 6s ease-in-out infinite}@keyframes ilb{0%,100%{opacity:.82}50%{opacity:1}}.il-sp{stroke-dasharray:6 200;stroke-dashoffset:8;animation:ils 6s ease-in-out infinite}@keyframes ils{from{stroke-dashoffset:8}to{stroke-dashoffset:-200}}@media(prefers-reduced-motion:reduce){.il-h,.il-c,.il-sp{animation:none}.il-sp{opacity:0}}',
 STARS:{lyra:[[126.77,100.96],[114.99,99.17],[120,112.94],[109.23,122.64],[124.28,143.63],[113.77,152.82]],noctua:[[84.44,120.89],[114.99,127.31],[99.39,100.69],[104.25,112.48],[68.75,114.1],[131.25,116.74]],musca:[[102.4,128.19],[97.03,138.27],[125.29,115.62],[129,135.99],[87.65,117.06],[71,93.73]]},
 n:0
};
function F(n,p){p=p==null?1:p;if(typeof n==='number'&&n===Math.floor(n)&&isFinite(n))return String(n);let s=Number(n).toFixed(p).replace(/\.?0+$/,'');if(s==='-0')s='0';if(s.slice(0,2)==='0.')s=s.slice(1);else if(s.slice(0,3)==='-0.')s='-.'+s.slice(3);return s}
function ilCss119(){if(typeof document==='undefined'||document.getElementById('il119css'))return;const s=document.createElement('style');s.id='il119css';s.textContent=I.CSS; (document.documentElement||document.head).appendChild(s)}
function ilKind119(k){return k==='shell'?'turtle':k}
function ilPhase119(stage){const s=Math.max(1,Math.min(6,Number(stage)||1));return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise'}
function ilDefaultLook119(){return 'inner'}
function ilDefaultPattern119(kind){kind=ilKind119(kind);return kind==='owl'?'spiral':kind==='moth'?'veins':'hex'}
const IL_LOOKS119={},IL_PATTERNS119={};

function ilDefs119(u,h){h=h==null?'.28':h;return `<radialGradient id="${u}L" cx="36%" cy="32%" r="78%"><stop offset="0" stop-color="#7A9A6A"/><stop offset="1" stop-color="#1A3A3A"/></radialGradient><radialGradient id="${u}S" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".45" stop-color="#E6B454"/><stop offset="1" stop-color="#855A00"/></radialGradient><radialGradient id="${u}H" cx="50%" cy="55%" r="52%"><stop offset="0" stop-color="#E6B454" stop-opacity="${h}"/><stop offset="1" stop-color="#E6B454" stop-opacity="0"/></radialGradient>`}
function ilGround119(x,y,rx,ry,u,sp,o,ac){return `<ellipse class="il-h" cx="${F(x)}" cy="${F(y)}" rx="${F(rx)}" ry="${F(ry)}" fill="url(#${u}H)"/><ellipse class="il-h" cx="${F(x)}" cy="${F(y)}" rx="${F(rx*.7)}" ry="${F(ry*.7)}" fill="${ac}" opacity=".14"/><ellipse cx="${F(x)}" cy="184" rx="${F(sp)}" ry="6" fill="url(#${u}S)" opacity="${F(o,2)}"/>`}
function ilCore119(x,y,rx,ry,u){const r=(rx+ry)*.56;return `<circle class="il-c" cx="${F(x)}" cy="${F(y)}" r="${F(r)}" fill="url(#${u}S)"/><circle cx="${F(x)}" cy="${F(y)}" r="${F(r*.22)}" fill="#FFF6D8" opacity=".92"/>`}
function ilFace119(lx,ly,rx,ry,r,r2,sy,sw,blush){r2=r2==null?r:r2;if(blush==null)blush=true;let p='';for(const [cx,cy,rr] of [[lx,ly,r],[rx,ry,r2]]){p+=`<circle cx="${F(cx)}" cy="${F(cy)}" r="${F(rr)}" fill="${I.INK}"/><circle cx="${F(cx-rr*.28)}" cy="${F(cy-rr*.38)}" r="${F(rr*.34)}" fill="#FFF6D8"/>`}if(blush){const br=Math.max(2.4,Math.min(5.2,(r+r2)*.42)),by=(ly+ry)/2+Math.max(r,r2)*1.05;p+=`<ellipse cx="${F(lx-r*.85)}" cy="${F(by)}" rx="${F(br)}" ry="${F(br*.62)}" fill="${I.BLUSH}" opacity=".32"/><ellipse cx="${F(rx+r2*.85)}" cy="${F(by)}" rx="${F(br)}" ry="${F(br*.62)}" fill="${I.BLUSH}" opacity=".32"/>`}if(sy==null)sy=(ly+ry)/2+Math.max(r,r2)*2.15;if(sw==null)sw=Math.max(8,Math.abs(rx-lx)*.55);const mid=(lx+rx)/2;p+=`<path d="M${F(mid-sw/2)} ${F(sy)}c${F(sw*.28)} ${F(sw*.28)} ${F(sw*.72)} ${F(sw*.28)} ${F(sw)} 0" fill="none" stroke="${I.INK}" stroke-width="1.3" stroke-linecap="round"/>`;return p}
function ilLantern119(x,y,s){s=s==null?1.55:s;const bw=9*s,bh=12*s,sw=Math.max(2,2.1*s);return `<ellipse cx="${F(x)}" cy="${F(y)}" rx="${F(bw*.9)}" ry="${F(bh*.85)}" fill="${I.AMB}" opacity=".28"/><rect x="${F(x-bw/2)}" y="${F(y-bh/2)}" width="${F(bw)}" height="${F(bh)}" rx="${F(1.8*s)}" fill="${I.AMB}" stroke="${I.INK}" stroke-width="${F(sw)}"/><rect x="${F(x-bw/2)}" y="${F(y-bh/2)}" width="${F(bw)}" height="${F(2.6*s)}" rx="${F(1.2*s)}" fill="${I.DEEP}"/><ellipse cx="${F(x)}" cy="${F(y+.8*s)}" rx="${F(2.4*s)}" ry="${F(3.4*s)}" fill="#FFF6D8"/><ellipse cx="${F(x)}" cy="${F(y+.2*s)}" rx="${F(1.1*s)}" ry="${F(1.5*s)}" fill="#FFFFFF" opacity=".7"/>`}
function ilSpark119(x0,y0,x1,y1){return `<path class="il-sp" d="M${F(x0)} ${F(y0)}L${F(x1)} ${F(y1)}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round"/>`}
function ilStars119(key,op){const pts=I.STARS[key]||[];if(!pts.length)return '';const d=pts.map(([x,y])=>`M${F(x)} ${F(y)}h0`).join(' ');return `<path d="${d}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round" opacity="${op||'.52'}"/>`}
function ilUse119(id,x,y,rot,s){let tr=`translate(${F(x)} ${F(y)})`;if(rot)tr+=` rotate(${F(rot)})`;if(s&&s!==1)tr+=` scale(${F(s,2)})`;return `<use href="#${id}" transform="${tr}"/>`}

/* ---- pluggable inner patterns (drawn in the species' pattern region) ---- */
function ilHexCenters119(kind,size){
 function xy(q,r){return [size*(Math.sqrt(3)*q+Math.sqrt(3)/2*r), size*(1.5*r)]}
 function ring(n){if(!n)return [[0,0]];const c=[];let q=n,r=0;for(const [dq,dr] of [[0,-1],[-1,0],[-1,1],[0,1],[1,0],[1,-1]]){for(let i=0;i<n;i++){c.push([q,r]);q+=dq;r+=dr}}return c}
 const cells=[[0,0]];
 if(kind==='1+3'||kind==='1+6'||kind==='1+6+12'){const r1=ring(1);cells.push(...(kind==='1+3'?r1.filter((_,i)=>i%2===0):r1))}
 if(kind==='1+6+12')cells.push(...ring(2));
 return cells.map(([q,r])=>xy(q,r));
}
function ilHexD119(cx,cy,size){const pts=[];for(let i=0;i<6;i++){const a=(30+60*i)*Math.PI/180;pts.push([cx+size*Math.cos(a),cy+size*Math.sin(a)])}return `M${F(pts[0][0])} ${F(pts[0][1])}`+pts.slice(1).map(p=>`L${F(p[0])} ${F(p[1])}`).join('')+'Z'}
function ilHexKind119(phase){return phase==='hatchling'?'1':phase==='young'?'1+3':phase==='grown'?'1+6':'1+6+12'}
IL_PATTERNS119.hex=function(ctx){
 const kind=ilHexKind119(ctx.phase),size=ctx.hexSize||(ctx.phase==='wise'?9.2:ctx.phase==='grown'?13.5:ctx.phase==='young'?12:12.5);
 const rays=ctx.phase!=='hatchling';
 const id=ctx.uid+'U';
 let def=`<g id="${id}"><path d="${ilHexD119(0,0,size*.98)}" fill="#2A4A48" opacity=".32" stroke="${I.ROSE.mid}" stroke-width="1.6" stroke-linejoin="round"/><circle r="1.55" fill="${I.AMB}"/>`;
 if(rays)def+=`<path d="M0-3.1v1.7M-2.7 1.55-1 .55M2.7 1.55 1 .55" fill="none" stroke="${I.AMB}" stroke-width="1.15" stroke-linecap="round"/>`;
 def+='</g>';
 const kept=[];
 for(const [dx,dy] of ilHexCenters119(kind,size)){const x=ctx.cx+dx,y=ctx.cy+dy;if(((x-ctx.cx)/ctx.rx)**2+((y-ctx.cy)/ctx.ry)**2>1.15)continue;kept.push([x,y])}
 const uses=kept.map(([x,y])=>ilUse119(id,x,y)).join('');
 let sa,sb;
 if(kind!=='1'&&kept.length>1){const [x1,y1]=kept[1];sa=[ctx.cx+(x1-ctx.cx)*.35,ctx.cy+(y1-ctx.cy)*.35];sb=[ctx.cx+(x1-ctx.cx)*.85,ctx.cy+(y1-ctx.cy)*.85]}
 else{sa=[ctx.cx+size*.55,ctx.cy];sb=[ctx.cx+size*1.4,ctx.cy]}
 return {def,body:uses+ilCore119(ctx.cx,ctx.cy,ctx.coreR[0],ctx.coreR[1],ctx.uid)+ilSpark119(sa[0],sa[1],sb[0],sb[1])}
};
/* Pi: start the sunflower index at n=4 so no dots hide under the core. */
function ilSunflower119(n,x,y,c,cap){n=Math.min(n,cap==null?13:cap);const g=137.508*Math.PI/180,p=[];for(let i=4;i<4+n;i++){const a=i*g,r=c*Math.sqrt(i+.6);p.push([x+r*Math.cos(a),y+r*Math.sin(a)])}return p}
function ilDotsPath119(pts,sw,col,op){const d=pts.map(([x,y])=>`M${F(x)} ${F(y)}h0`).join(' ');return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${F(sw)}" stroke-linecap="round" opacity="${op}"/>`}
IL_PATTERNS119.spiral=function(ctx){
 const n=ctx.dots==null?(ctx.phase==='hatchling'?5:13):ctx.dots;
 const c=ctx.dotC==null?5.2:ctx.dotC,cap=ctx.cap==null?13:ctx.cap;
 const pts=ilSunflower119(n,ctx.cx,ctx.cy,c,cap);
 const col=ctx.dotColor||I.VIOLET.tip;
 const sa=ctx.sparkA||[ctx.cx+(ctx.rx||20)*.32,ctx.cy],sb=ctx.sparkB||[ctx.cx+(ctx.rx||20)*.82,ctx.cy];
 return {def:'',body:ilDotsPath119(pts,ctx.dotSw||6.8,col,ctx.dotOp||'.88')+ilCore119(ctx.cx,ctx.cy,ctx.coreR[0],ctx.coreR[1],ctx.uid)+ilSpark119(sa[0],sa[1],sb[0],sb[1])}
};
function ilFork119(stems,depth,ratio,spr,sh){ratio=ratio==null?.7:ratio;spr=spr==null?22:spr;sh=sh==null?.55:sh;const s=[];const rec=(ax,ay,bx,by,k)=>{s.push([ax,ay,bx,by]);if(k<=1)return;const mx=ax+(bx-ax)*ratio,my=ay+(by-ay)*ratio,ang=Math.atan2(by-ay,bx-ax),L=Math.hypot(bx-ax,by-ay)*sh;for(const sg of[-1,1]){const a=ang+sg*spr*Math.PI/180;rec(mx,my,mx+L*Math.cos(a),my+L*Math.sin(a),k-1)}};for(const t of stems)rec(t[0],t[1],t[2],t[3],depth);return s}
function ilSegs119(segs,col,sw,op){const d=segs.map(s=>`M${F(s[0])} ${F(s[1])}L${F(s[2])} ${F(s[3])}`).join('');return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${F(sw)}" stroke-linecap="round" stroke-linejoin="round" opacity="${op||'.4'}"/>`}
IL_PATTERNS119.veins=function(ctx){
 const depth=ctx.depth==null?(ctx.phase==='wise'?4:ctx.phase==='grown'?3:2):ctx.depth;
 const stems=ctx.stems||[[ctx.cx,ctx.cy,ctx.cx+(ctx.rx||40),ctx.cy-(ctx.ry||10)*.4],[ctx.cx,ctx.cy+(ctx.ry||10)*.3,ctx.cx+(ctx.rx||36),ctx.cy+(ctx.ry||10)]];
 const segs=ilFork119(stems,Math.max(1,depth));
 const st=stems[0],sa=[st[0],st[1]],sb=[st[0]+(st[2]-st[0])*.7,st[1]+(st[3]-st[1])*.7];
 const core=ctx.coreR?ilCore119(ctx.coreX==null?ctx.cx:ctx.coreX,ctx.coreY==null?ctx.cy:ctx.coreY,ctx.coreR[0],ctx.coreR[1],ctx.uid):'';
 return {def:'',body:ilSegs119(segs,ctx.veinColor||I.MOON.mid,ctx.veinSw||1.15,ctx.veinOp||'.4')+core+ilSpark119(sa[0],sa[1],sb[0],sb[1])}
};
function ilPattern119(name,ctx){const fn=IL_PATTERNS119[name]||IL_PATTERNS119[ilDefaultPattern119(ctx.kind)];return fn(ctx)}

/* ---- silhouettes + Inner light look ---- */
function ilGlassFinish119(cx,cy,rx,ry,clip,sw){const hx=cx-rx*.3,hy=cy-ry*.36;let o=`<g clip-path="url(#${clip})"><ellipse cx="${F(hx)}" cy="${F(hy)}" rx="${F(rx*.4)}" ry="${F(ry*.28)}" fill="#FFF6D8" opacity=".2"/></g><ellipse cx="${F(cx)}" cy="${F(cy)}" rx="${F(rx*.9)}" ry="${F(ry*.88)}" fill="none" stroke="#163333" stroke-width="1.6" opacity=".7"/>`;if(sw)o+=`<ellipse cx="${F(cx)}" cy="${F(cy)}" rx="${F(rx)}" ry="${F(ry)}" fill="none" stroke="${I.INK}" stroke-width="${F(sw)}"/>`;return o}
function ilScallop119(cx,cy,rx,ry,n,depth){n=n||9;depth=depth==null?4.4:depth;let d='';for(let i=0;i<n;i++){const a0=2*Math.PI*i/n-Math.PI/2,a1=2*Math.PI*(i+1)/n-Math.PI/2,am=(a0+a1)/2,x0=cx+rx*Math.cos(a0),y0=cy+ry*Math.sin(a0),x1=cx+rx*Math.cos(a1),y1=cy+ry*Math.sin(a1),mx=cx+(rx+depth)*Math.cos(am),my=cy+(ry+depth)*Math.sin(am);d+=i===0?`M${F(x0)} ${F(y0)}`:'';d+=`Q${F(mx)} ${F(my)} ${F(x1)} ${F(y1)}`}return d+'Z'}
function ilLeaf119(x,y,ang,s,tiny){ang=ang==null?-42:ang;s=s==null?1:s;const d=tiny?'M0 0c-2.2-4.4 2.8-7.2 4.4-3.2c-2.2.4-2.8 2.2-1.6 3.6Z':'M0 0c-3.4-7.2 4.6-11.6 7.2-5.2c-3.6.6-4.8 3.6-2.6 6.2Z';const mid=tiny?'M.4-.2Q2-3.2 3.6-2.4':'M.6-.4Q3.2-5.2 6-3.8';return `<g transform="translate(${F(x)} ${F(y)}) rotate(${F(ang)}) scale(${F(s,2)})" fill="${I.SAGE}" stroke="${I.INK}" stroke-width="${tiny?1.2:1.3}" stroke-linejoin="round"><path d="${d}"/><path d="${mid}" fill="none" stroke="${I.AMB}" stroke-width="1" stroke-linecap="round"/></g>`}

function ilTurtleGeom119(ph){
 if(ph==='hatchling')return {sc:[111.8,145.3],sr:[34.6,23.7],head:[74.5,147.8,18.3,16.7],muz:[67.8,153.6,8.4,5.6],eyes:[[66.4,144.2,2.9],[75.8,142.9,1.7]],smile:[70.8,152.9,12],feet:[[87.5,169.6,9.6,4.8],[110.6,172.2,10.2,4.8],[131,167,8.3,4.5]],tail:'M143.8 153c3.2 1 5.1 3.2 3.2 5.1c-1.3.9-3.5.4-4.8-1.3',leaf:[96,124,.72,1],coreR:[5,3.6],halo:[108,150,55,37,41,.2],lantern:0,stars:0,scallop:0,hexSize:12.5};
 if(ph==='young')return {sc:[113,136],sr:[44,30.2],head:[62,139,20.6,18.8],muz:[54.4,145.6,9.5,6.3],eyes:[[52.6,135.6,3.2],[63.2,134.4,1.9]],smile:[57.6,145,13.4],feet:[[81,168,12.2,6.1],[111,171,13,6.1],[138,164,10.5,5.7]],tail:'M154 146c5.5 1.5 8.5 5.6 5.6 9c-2.1 1.4-5.6.7-7.8-2.1',leaf:[90,110,.88,0],coreR:[6,4.4],halo:[108,144,70,48,44,.24],lantern:0,stars:0,scallop:0,hexSize:12};
 if(ph==='grown')return {sc:[114,128],sr:[54,37],head:[52,132,23,21],muz:[43.5,139.2,10.6,7.1],eyes:[[41.8,127.4,3.6],[53.6,125.8,2.1]],smile:[46,138.4,15.2],feet:[[76,166,15,7.5],[112,170,16,7.5],[144,162,13,7]],tail:'M164 140c8 2 12 8 8 13c-3 2-8 1-11-3',leaf:[86,96,1,0],coreR:[7.2,5.3],halo:[108,136,86,58,46,.3],lantern:0,stars:0,scallop:0,hexSize:13.5};
 return {sc:[114,128],sr:[54,37],head:[52,132,23,21],muz:[43.5,139.2,10.6,7.1],eyes:[[41.8,127.4,3.6],[53.6,125.8,2.1]],smile:[46,138.4,15.2],feet:[[76,166,15,7.5],[112,170,16,7.5],[144,162,13,7]],tail:'M164 140c8 2 12 8 8 13c-3 2-8 1-11-3',leaf:[86,96,1,0],coreR:[7.2,5.3],halo:[108,136,90,60,46,.32],lantern:[170,122],stars:'lyra',scallop:1,hexSize:9.2};
}
function ilTurtle119(uid,ph,pattern){
 const g=ilTurtleGeom119(ph),[scx,scy]=g.sc,[srx,sry]=g.sr,h=g.halo;
 let defs=ilDefs119(uid,F(h[5],2))+`<clipPath id="${uid}C"><ellipse cx="${F(scx)}" cy="${F(scy)}" rx="${F(srx)}" ry="${F(sry)}"/></clipPath>`;
 let body=ilGround119(h[0],h[1],h[2],h[3],uid,h[4],h[5],I.ROSE.mid);
 body+=`<g fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.8">`+g.feet.map(f=>`<ellipse cx="${F(f[0])}" cy="${F(f[1])}" rx="${F(f[2])}" ry="${F(f[3])}"/>`).join('')+'</g>';
 body+=`<path d="${g.tail}" fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>`;
 body+=`<ellipse cx="${F(scx)}" cy="${F(scy)}" rx="${F(srx)}" ry="${F(sry)}" fill="url(#${uid}L)"/>`;
 const pat=ilPattern119(pattern,{kind:'turtle',phase:ph,uid,cx:scx,cy:scy,rx:srx,ry:sry,coreR:g.coreR,hexSize:g.hexSize,dots:ph==='hatchling'?5:13,dotC:Math.max(4,g.hexSize*.4),stems:[[scx,scy,scx+srx*.7,scy-sry*.2]]});
 if(pat.def)defs+=pat.def;
 body+=`<g clip-path="url(#${uid}C)">${pat.body}</g>`;
 if(g.scallop){body+=ilGlassFinish119(scx,scy,srx,sry,uid+'C',0)+`<path d="${ilScallop119(scx,scy,srx,sry,9,4.4)}" fill="none" stroke="${I.INK}" stroke-width="2.1" stroke-linejoin="round"/>`}
 else body+=ilGlassFinish119(scx,scy,srx,sry,uid+'C',ph==='hatchling'?1.9:2.2);
 body+=ilLeaf119(g.leaf[0],g.leaf[1],-42,g.leaf[2],g.leaf[3]);
 const [hx,hy,hrx,hry]=g.head,[mx,my,mrx,mry]=g.muz;
 body+=`<ellipse cx="${F(hx)}" cy="${F(hy)}" rx="${F(hrx)}" ry="${F(hry)}" fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.9"/><ellipse cx="${F(mx)}" cy="${F(my)}" rx="${F(mrx)}" ry="${F(mry)}" fill="${I.MUZ}"/>`;
 const e1=g.eyes[0],e2=g.eyes[1];
 body+=ilFace119(e1[0],e1[1],e2[0],e2[1],e1[2],e2[2],g.smile[1],g.smile[2]).replace('stroke-width="1.3"','stroke-width="1.4"');
 if(g.lantern)body+=ilLantern119(g.lantern[0],g.lantern[1],1.55);
 if(g.stars)body+=ilStars119(g.stars,'.52');
 return {defs,body};
}

function ilHeartDisc119(lx,ly,rx,ry,er){const mid=(lx+rx)/2,cy=(ly+ry)/2,lr=Math.max(er+8,Math.abs(rx-lx)/2*.85),bot=cy+lr+er*.35,join=`M${F(lx)} ${F(cy+lr*.2)}Q${F(mid)} ${F(bot)} ${F(rx)} ${F(cy+lr*.2)}Z`;return `<circle cx="${F(lx)}" cy="${F(ly)}" r="${F(lr)}" fill="#F4E4C4" opacity=".82"/><circle cx="${F(rx)}" cy="${F(ry)}" r="${F(lr)}" fill="#F4E4C4" opacity=".82"/><path d="${join}" fill="#F4E4C4" opacity=".82"/>`}
function ilHeartVeins119(lx,ly,rx,ry,er,n){
 const mid=(lx+rx)/2,cy=(ly+ry)/2,lr=Math.max(er+8,Math.abs(rx-lx)/2*.85);
 const tick=(cx,cy_,ang,rOut,len)=>{len=len||6.8;const rad=ang*Math.PI/180,dx=Math.cos(rad),dy=Math.sin(rad),sx=cx+dx*(rOut-1.2),sy=cy_+dy*(rOut-1.2);return `M${F(sx)} ${F(sy)}l${F(-dx*len)} ${F(-dy*len)}`};
 let segs=tick(lx,ly,210,lr)+tick(rx,ry,330,lr);
 if(n>=4)segs+=tick(lx,ly,150,lr)+tick(rx,ry,30,lr);
 else if(n===3)segs+=tick(lx,ly,150,lr);
 if(n===5){const top=cy-lr*.62;segs+=`M${F(mid)} ${F(top+4.5)}l0 3.6`}
 const stroke=n>=4?I.TIP:I.AMB,op=n>=4?'1':'.9';
 return `<path d="${segs}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" opacity="${op}"/>`;
}
function ilCleftStar119(lx,ly,rx,ry,er,s){s=s||3.1;const mid=(lx+rx)/2,lr=Math.max(er+8,Math.abs(rx-lx)/2*.85),top=Math.min(ly,ry)-lr*.72;return `<path d="M${F(mid)} ${F(top-s)}L${F(mid+s*.32)} ${F(top-s*.32)}L${F(mid+s)} ${F(top)}L${F(mid+s*.32)} ${F(top+s*.32)}L${F(mid)} ${F(top+s)}L${F(mid-s*.32)} ${F(top+s*.32)}L${F(mid-s)} ${F(top)}L${F(mid-s*.32)} ${F(top-s*.32)}Z" fill="${I.AMB}" stroke="${I.INK}" stroke-width=".8" stroke-linejoin="round"/>`}
const OWL_WR='M50 124Q40 72 92 84Q74 112 54 148Z',OWL_WL='M150 124Q160 72 108 84Q126 112 146 148Z';
function ilOwlGeom119(ph){
 if(ph==='hatchling')return {body:[100,138,44,40],belly:[100,152,24,16],eyes:[[87,126,5.8],[113,126,5.8]],smile:[100,142,12],tufts:0,wings:0,dots:5,dotC:5.2,cap:21,coreR:[6,4.4],halo:[100,126,66,50,46,.2],feet:[[86,172,6.5,3],[114,172,6.5,3]],beak:0,star:0,lantern:0,stars:0,veins:0};
 if(ph==='young')return {body:[100,128,46,48],belly:[100,148,27,18],eyes:[[84,107,6.5],[116,107,6.5]],smile:[100,124,13],tufts:[[78,86,6.5,7.4,-22],[122,86,6.5,7.4,22]],wings:1,wingS:.86,dots:13,dotC:5,cap:13,coreR:[6.4,4.7],halo:[100,122,78,58,48,.24],feet:[[84,172,7,3.2],[116,172,7,3.2]],beak:1,star:0,lantern:0,stars:0,veins:3};
 if(ph==='grown')return {body:[100,118,50,54],belly:[100,148,30,20],eyes:[[80,96,7.3],[120,96,7.3]],smile:[100,119,13],tufts:[[75,72.6,8,9.2,-22],[125,72.6,8,9.2,22]],wings:1,wingS:1,dots:13,dotC:5.2,cap:13,coreR:[7,5.2],halo:[100,120,92,70,50,.3],feet:[[82,172,8,3.5],[118,172,8,3.5]],beak:1,star:1,lantern:0,stars:0,veins:4};
 return {body:[100,118,50,54],belly:[100,148,30,20],eyes:[[80,96,7.3],[120,96,7.3]],smile:[100,119,13],tufts:[[75,72.6,8,9.2,-22],[125,72.6,8,9.2,22]],wings:1,wingS:1,dots:13,dotC:5.2,cap:13,coreR:[7,5.2],halo:[100,120,94,72,50,.32],feet:[[82,172,8,3.5],[118,172,8,3.5]],beak:1,star:1,lantern:[46,166],stars:'noctua',veins:5};
}
function ilOwl119(uid,ph,pattern){
 const g=ilOwlGeom119(ph),[bx,by,brx,bry]=g.body,[bex,bey,berx,bery]=g.belly,h=g.halo;
 let defs=ilDefs119(uid,F(h[5],2))+`<clipPath id="${uid}B"><ellipse cx="${F(bex)}" cy="${F(bey)}" rx="${F(berx)}" ry="${F(bery)}"/></clipPath><clipPath id="${uid}O"><ellipse cx="${F(bx)}" cy="${F(by)}" rx="${F(brx)}" ry="${F(bry)}"/></clipPath>`;
 let body=ilGround119(h[0],h[1],h[2],h[3],uid,h[4],h[5],I.VIOLET.mid);
 if(g.tufts)for(const t of g.tufts)body+=`<ellipse cx="${F(t[0])}" cy="${F(t[1])}" rx="${F(t[2])}" ry="${F(t[3])}" fill="url(#${uid}L)" stroke="${I.INK}" stroke-width="1.6" transform="rotate(${F(t[4])} ${F(t[0])} ${F(t[1])})"/>`;
 if(g.wings){const wr=`<path d="${OWL_WR}" fill="url(#${uid}L)" stroke="${I.INK}" stroke-width="1.5" stroke-linejoin="round"/><path d="${OWL_WL}" fill="url(#${uid}L)" stroke="${I.INK}" stroke-width="1.5" stroke-linejoin="round"/>`;body+=g.wingS!==1?`<g transform="translate(100 ${F(by)}) scale(${F(g.wingS,2)}) translate(-100 ${F(-by)})">${wr}</g>`:wr}
 body+=`<ellipse cx="${F(bx)}" cy="${F(by)}" rx="${F(brx)}" ry="${F(bry)}" fill="url(#${uid}L)" stroke="${I.INK}" stroke-width="2.1"/>`;
 body+=`<g clip-path="url(#${uid}O)"><ellipse cx="${F(bx-brx*.3)}" cy="${F(by-bry*.36)}" rx="${F(brx*.38)}" ry="${F(bry*.26)}" fill="#FFF6D8" opacity=".18"/></g><ellipse cx="${F(bx)}" cy="${F(by)}" rx="${F(brx*.9)}" ry="${F(bry*.88)}" fill="none" stroke="#163333" stroke-width="1.6" opacity=".65"/>`;
 const bop=ph==='hatchling'?'.82':'.88';
 body+=`<ellipse cx="${F(bex)}" cy="${F(bey)}" rx="${F(berx)}" ry="${F(bery)}" fill="#F4E4C4" opacity="${bop}" stroke="${I.INK}" stroke-width="1.2"/>`;
 const pat=ilPattern119(pattern,{kind:'owl',phase:ph,uid,cx:bex,cy:bey,rx:berx,ry:bery,coreR:g.coreR,dots:g.dots,dotC:g.dotC,cap:g.cap,hexSize:Math.max(7,berx/3),stems:[[bex,bey,bex+berx*.8,bey]]});
 if(pat.def)defs+=pat.def;
 body+=`<g clip-path="url(#${uid}B)">${pat.body}</g>`;
 const e1=g.eyes[0],e2=g.eyes[1];
 body+=ilHeartDisc119(e1[0],e1[1],e2[0],e2[1],e1[2]);
 if(ph!=='hatchling')body+=ilHeartVeins119(e1[0],e1[1],e2[0],e2[1],e1[2],g.veins);
 if(g.star)body+=ilCleftStar119(e1[0],e1[1],e2[0],e2[1],e1[2],3.1);
 body+=ilFace119(e1[0],e1[1],e2[0],e2[1],e1[2],e2[2],g.smile[1],g.smile[2]).replace('stroke-width="1.3"','stroke-width="1.35"');
 if(g.beak){const mid=(e1[0]+e2[0])/2,byb=(e1[1]+e2[1])/2+e1[2]+3.2;body+=`<path d="M${F(mid-5.5)} ${F(byb-2)}L${F(mid)} ${F(byb+7)}L${F(mid+5.5)} ${F(byb-2)}Z" fill="${I.AMB}" stroke="${I.INK}" stroke-width="1"/>`}
 for(const f of g.feet)body+=`<ellipse cx="${F(f[0])}" cy="${F(f[1])}" rx="${F(f[2])}" ry="${F(f[3])}" fill="${I.FOOT}" stroke="${I.INK}" stroke-width="1"/>`;
 if(g.lantern)body+=ilLantern119(g.lantern[0],g.lantern[1],1.55);
 if(g.stars)body+=ilStars119(g.stars,'.5');
 return {defs,body};
}

const WING_R='M110 98Q178 42 188 126Q140 148 114 132Z';
const ANT_D='M0 0C2-4.2 3.2-5.2 4.2-1.2C6-5.8 7.4-5.8 8.4-1.2C10-5.2 11.4-4.6 13 0C11.4 4.6 10 5.2 8.4 1.2C7.4 5.8 6 5.8 4.2 1.2C3.2 5.2 2 4.2 0 0Z';
function ilEyespot119(cx,cy,radii,uid){let p=`<circle cx="${F(cx)}" cy="${F(cy)}" r="${F(radii[0])}" fill="${I.MOON.tip}" opacity=".28"/>`;const cols=[I.MOON.mid,I.AMB];for(let i=0;i<radii.length-1;i++)p+=`<circle cx="${F(cx)}" cy="${F(cy)}" r="${F(radii[i])}" fill="none" stroke="${cols[i%2]}" stroke-width="1.6" opacity=".85"/>`;p+=`<circle cx="${F(cx)}" cy="${F(cy)}" r="${F(radii[radii.length-1])}" fill="url(#${uid}S)" stroke="${I.INK}" stroke-width=".8"/>`;return p}
function ilSpiralPath119(cx,cy,turns,a,b,n){turns=turns||2.3;a=a==null?2.4:a;b=b==null?4.6:b;n=n||52;const pts=[];for(let i=0;i<n;i++){const th=(i/(n-1))*turns*2*Math.PI,r=a+b*(th/(2*Math.PI));pts.push([cx+r*Math.cos(th),cy+r*Math.sin(th)])}return `<path d="M${pts.map(p=>`${F(p[0])} ${F(p[1])}`).join('L')}" fill="none" stroke="${I.MOON.mid}" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" opacity=".32"/>`}
function ilMoth119(uid,ph,pattern){
 if(ph==='hatchling'){
  let defs=ilDefs119(uid,'.16');
  let body=ilGround119(100,130,70,48,uid,44,.16,I.MOON.mid);
  for(const s of [[68,136,16,14],[88,128,16,14],[108,122,16,14],[128,118,16,14]])body+=`<ellipse cx="${s[0]}" cy="${s[1]}" rx="${s[2]}" ry="${s[3]}" fill="#E8C894" stroke="${I.INK}" stroke-width="1.8"/>`;
  body+=ilCore119(88,128,5.4,5.4,uid)+ilSpark119(88,128,102,122);
  body+=`<ellipse cx="68" cy="136" rx="14.5" ry="13.5" fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.5"/>`;
  body+=ilFace119(62.8,134.5,73.6,134.5,3.4,3.4,142.4,11);
  body+=`<path d="M62 124Q58 116 56 112M74 123Q78 116 80 112" fill="none" stroke="${I.INK}" stroke-width="1.8" stroke-linecap="round"/>`;
  if(pattern==='spiral')body+=`<g opacity=".7">${ilDotsPath119(ilSunflower119(5,88,128,4.2,13),4,I.MOON.tip,'.7')}</g>`;
  return {defs,body};
 }
 if(ph==='young'){
  let defs=ilDefs119(uid,'.16')+`<clipPath id="${uid}C"><ellipse cx="100" cy="128" rx="40" ry="23"/></clipPath>`;
  let body=ilGround119(100,128,72,50,uid,46,.16,I.MOON.mid);
  const inner=pattern==='hex'?ilPattern119('hex',{kind:'moth',phase:ph,uid,cx:100,cy:128,rx:40,ry:23,coreR:[8,8],hexSize:9}).body:ilSpiralPath119(110,128);
  body+=`<g transform="rotate(-16 100 128)"><ellipse cx="100" cy="128" rx="40" ry="23" fill="#F4E4C4" stroke="${I.INK}" stroke-width="2.2"/><g clip-path="url(#${uid}C)">${inner}</g>${ilCore119(100,128,8,8,uid)}${ilSpark119(100,128,118,128)}<ellipse cx="86" cy="132" rx="11" ry="10" fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.3"/>${ilFace119(81.2,131,91.2,131,2.6,2.6,138.2,10).replace('stroke-width="1.3"','stroke-width="1.2"')}</g>`;
  return {defs,body};
 }
 let defs=ilDefs119(uid,'.16')+`<ellipse id="${uid}P" cx="0" cy="0" rx="8" ry="6.2" fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.1"/><path id="${uid}N" d="${ANT_D}" fill="#FFE4A4" stroke="${I.INK}" stroke-width="1.4" stroke-linejoin="round"/><clipPath id="${uid}W"><path d="${WING_R}"/></clipPath>`;
 let body=ilGround119(100,118,78,54,uid,46,.16,I.MOON.mid);
 body+=`<ellipse cx="100" cy="114" rx="22" ry="26" fill="#F4E4C4" stroke="${I.INK}" stroke-width="1.8"/>${ilCore119(100,110,6.8,6.8,uid)}`;
 const stems=[[118,110,170,88],[120,120,166,136]];
 const pat=ilPattern119(pattern,{kind:'moth',phase:ph,uid,cx:118,cy:110,rx:50,ry:20,stems,depth:ph==='wise'?4:3,coreR:null,dots:13,dotC:7,hexSize:8,cx2:152,cy2:118});
 if(pat.def)defs+=pat.def;
 const radii=ph==='wise'?[13,8.5,3.8]:[11.5,6.2];
 const wing=`<path d="${WING_R}" fill="url(#${uid}L)" stroke="#FFF6D8" stroke-width="3.2" stroke-linejoin="round"/><path d="${WING_R}" fill="none" stroke="${I.INK}" stroke-width="1.5" stroke-linejoin="round"/><g clip-path="url(#${uid}W)">${pat.body}</g>${ilEyespot119(152,118,radii,uid)}`;
 body+=`<g id="${uid}G">${wing}</g><use href="#${uid}G" transform="translate(200 0) scale(-1 1)"/>`;
 const tufts=[[88,108,-28,1],[94,104,-12,.95],[100,102,0,1.05],[106,104,12,.95],[112,108,28,1]];
 body+=tufts.map(t=>ilUse119(uid+'P',t[0],t[1],t[2],t[3])).join('');
 body+=`<circle cx="100" cy="96" r="13.5" fill="${I.CLAY}" stroke="${I.INK}" stroke-width="1.6"/>`;
 body+=ilFace119(95.2,96,104.8,96,2.6,2.6,104.4,9.6).replace('stroke-width="1.3"','stroke-width="1.2"');
 body+=`<use href="#${uid}N" transform="translate(111 88) rotate(-52)"/><use href="#${uid}N" transform="translate(89 88) scale(-1 1) rotate(-52)"/>`;
 if(ph==='wise'){body+=ilLantern119(36,152,1.55)+ilStars119('musca','.46')}
 return {defs,body};
}

function ilArtInner119(kind,phase,pattern){
 const uid='i'+(++I.n);
 let part;
 if(kind==='turtle')part=ilTurtle119(uid,phase,pattern);
 else if(kind==='owl')part=ilOwl119(uid,phase,pattern);
 else if(kind==='moth')part=ilMoth119(uid,phase,pattern);
 else return '';
 return `<g class="il119" data-il-kind="${kind}" data-il-stage="${phase}" data-il-look="inner" data-il-pattern="${pattern}" transform="scale(.5)"><defs>${part.defs}</defs>${part.body}</g>`;
}
/* Later looks (stained glass, constellation-as-look) register here. Unregistered looks fall back to Inner light. No picker ships in v119. */
IL_LOOKS119.inner=function(kind,phase,pattern){return ilArtInner119(kind,phase,pattern)};

function ilArt119(kind,stage,opt){
 opt=opt||{};
 kind=ilKind119(kind);
 if(kind!=='turtle'&&kind!=='owl'&&kind!=='moth')return '';
 const phase=ilPhase119(stage);
 const look=opt.look||ilDefaultLook119();
 const pattern=opt.pattern||ilDefaultPattern119(kind);
 const fn=IL_LOOKS119[look]||IL_LOOKS119.inner;
 try{ilCss119()}catch(e){}
 return fn(kind,phase,pattern,opt);
}

/* ---- app hooks: restyle Shell, Owl, Moth only; leave Lamp, Dragon, Phoenix ---- */
function ilCreditHTML119(){
 const t=typeof gT==='function'?gT:s=>s;
 return `<div class="card" data-il-credit119="1"><p class="soft">${t('The Shell, Owl, and Moth pictures take a little inspiration from two public-domain works: Ernst Haeckel, Kunstformen der Natur (1904), and John James Audubon, The Birds of America, plate 171, “Barn Owl” (1833, engraved by Robert Havell Jr.). The marks are original, drawn from code, not traced from those plates.')}</p></div>`;
}
function ilAttachCredit119(){
 const t=typeof gT==='function'?gT:s=>s;
 const adults=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(adults&&!adults.querySelector('[data-il-credit119]'))adults.insertAdjacentHTML('beforeend',ilCreditHTML119());
 const about=typeof $==='function'?$('about'):document.getElementById('about');
 if(about){
  const host=about.querySelector('.card:last-child')||about;
  if(!about.querySelector('[data-il-credit119]'))host.insertAdjacentHTML('beforeend',`<p class="soft" data-il-credit119="1">${t('The Shell, Owl, and Moth pictures take a little inspiration from two public-domain works: Ernst Haeckel, Kunstformen der Natur (1904), and John James Audubon, The Birds of America, plate 171, “Barn Owl” (1833, engraved by Robert Havell Jr.). The marks are original, drawn from code, not traced from those plates.')}</p>`);
 }
}
function ilOwlLabel119(s){
 const stage=s&&(s.stage||s);
 const phase=ilPhase119(typeof lampViewStage74==='function'&&s&&typeof s==='object'?lampViewStage74(s):stage);
 if(phase!=='wise')return '';
 const t=typeof gT==='function'?gT:x=>x,escFn=typeof esc==='function'?esc:x=>String(x);
 return `<p class="soft" data-il-noctua119="1">${escFn(t('Noctua, a historical owl constellation.'))}</p>`;
}

try{ilCss119()}catch(e){}

{const prev=typeof friendArtInner101==='function'?friendArtInner101:null;
 friendArtInner101=function(id,stage){
  const kind=ilKind119(id);
  if(kind==='turtle'||kind==='owl'||kind==='moth')return ilArt119(kind,stage);
  return prev?prev(id,stage):'';
 };
}
{const prev=typeof lampFigure73==='function'?lampFigure73:null;
 if(prev)lampFigure73=function(s,extra){
  const html=prev.apply(this,arguments);
  try{
   const st=s||(typeof lampLoad73==='function'?lampLoad73():null);
   const kind=(st&&st._kind101)||(typeof friendActive101==='function'?friendActive101(st&&st._pid101):'');
   if(ilKind119(kind)!=='owl')return html;
   const label=ilOwlLabel119(st);
   if(!label||/data-il-noctua119/.test(html))return html;
   return html.replace('</figure>',label+'</figure>');
  }catch(e){return html}
 };
}
{const ra=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof ra==='function'){renderAdults=function(){const r=ra.apply(this,arguments);try{ilAttachCredit119()}catch(e){}return r};if(typeof RENDER==='object')RENDER.adults=renderAdults}
 const ro=typeof renderAbout==='function'?renderAbout:(typeof RENDER==='object'&&RENDER.about);
 if(typeof ro==='function'){renderAbout=function(){const r=ro.apply(this,arguments);try{ilAttachCredit119()}catch(e){}return r};if(typeof RENDER==='object')RENDER.about=renderAbout}
}

window.IL119={
 art:ilArt119,phase:ilPhase119,kind:ilKind119,
 defaultLook:ilDefaultLook119,defaultPattern:ilDefaultPattern119,
 looks:IL_LOOKS119,patterns:IL_PATTERNS119,css:ilCss119,
 LOOK:{INNER:'inner',GLASS:'glass',CONSTELLATION:'constellation'},
 PATTERN:{HEX:'hex',SPIRAL:'spiral',VEINS:'veins'}
};
})();
// v120: 18 Inner light extras in the core, all open from the start, plus the
// Lamp's Inner light form at all four stages. Shipping model from SIZE_PLAN.md:
// one base silhouette per species, a compact sex delta, and a shared stage
// table (scale, pattern density, wise lantern). Look and pattern stay pluggable;
// this release ships no picker. Dragon and Phoenix keep their current art (they
// are being redesigned). No review SVGs or PNGs are included. Kids' current
// companion and stage carry over; the Lamp keeps its progress, glow colors, and
// effects. Names inspire the friends; no personal names or data are stored.
// The glass pattern is called a rosette (es: roseta). Pi: owl chest dots still
// start at n=4; the young and grown/wise bellies are enlarged so the n=15
// center stays inside the clip.
(function(){
const D120={"stages":{"hatchling":{"s":0.72,"pat":0,"lantern":0},"young":{"s":0.86,"pat":1,"lantern":0},"grown":{"s":1,"pat":2,"lantern":0},"wise":{"s":1,"pat":2,"lantern":1,"const":1}},"sp":{"suntiger":{"base":"f","pal":{"S":["#FFD0C8","#F69184","#98473F"],"H":["#F19F94",0.3]},"pat":"cymatic","sil":"<defs><clipPath id='@C'><ellipse cx='100' cy='130' rx='40' ry='40'/><ellipse cx='132' cy='148' rx='32' ry='26'/></clipPath></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><path d='M142 150c24-8 44 2 40 20c-3 14-20 16-30 8c-8-6-12-16-10-28Z' fill='url(#@L)' stroke-width='1.8'/><g fill='none' stroke='#1A3A3A' stroke-width='4.4' opacity='.55'><path d='M152 148c6 6 8 12 4 18M166 154c4 6 4 10-1 16'/></g><ellipse cx='144' cy='172' rx='12' ry='6' fill='#F4E4C4' stroke-width='1.5'/><ellipse cx='132' cy='148' rx='32' ry='26' fill='url(#@L)' stroke-width='2'/><ellipse cx='100' cy='130' rx='40' ry='40' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='100' cy='128' rx='20' ry='18' fill='#F69184' opacity='.22'/><path d='M116 102c10 6 14 18 10 30M82 112c-9 8-10 20-6 30' fill='none' stroke='#1A3A3A' stroke-width='2.2' opacity='.45'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M107.3 128.6Q115 127.9 122.4 129.8M103.2 134.5Q105 141.5 109.5 147.1M95.5 132.9L84.7 144.5M93.2 126.4L76.1 122.3M97.2 122.1Q95.6 114.3 90.7 108.1M103.5 122.7Q109.7 116.5 112.9 108.2' stroke='#F69184' stroke-width='2.7' opacity='.92'/><path d='M122.4 129.8L128.7 128.5M122.4 129.8L128.4 132.2M109.5 147.1L113.6 151.4M109.5 147.1L110.3 153M84.7 144.5L82.4 150.8M84.7 144.5L78.7 147.3M76.1 122.3L68.8 123.6M76.1 122.3L70.2 117.9M90.7 108.1L85.6 104M90.7 108.1L90.9 101.6M112.9 108.2L114.6 101.1M112.9 108.2L118.7 103.8' stroke='#FFA598' stroke-width='2.2' opacity='.9'/></g><ellipse cx='100' cy='128' rx='7.2' ry='5.3' fill='url(#@S)' stroke='#72583F' stroke-width='1.1'/></g><ellipse cx='98' cy='138' rx='20' ry='26' fill='#F4E4C4' opacity='.85'/><ellipse cx='86' cy='156' rx='12' ry='18' fill='url(#@L)' stroke-width='1.6'/><ellipse cx='114' cy='157' rx='12' ry='18' fill='url(#@L)' stroke-width='1.6'/><ellipse cx='86' cy='174' rx='14' ry='7.5' fill='#F4E4C4' stroke-width='1.5'/><ellipse cx='114' cy='175' rx='14' ry='7.5' fill='#F4E4C4' stroke-width='1.5'/><ellipse cx='74' cy='52' rx='13' ry='16' fill='url(#@L)' stroke-width='1.6'/><ellipse cx='126' cy='52' rx='13' ry='16' fill='url(#@L)' stroke-width='1.6'/><ellipse cx='100' cy='78' rx='36.5' ry='35' fill='url(#@L)' stroke-width='2'/><path d='M90 46c-3 5-6 10-6 16M82 45c-3 7-5 14-3 20M110 46c3 5 6 10 6 16M118 45c3 7 5 14 3 20' fill='none' stroke='#1A3A3A' stroke-width='1.9' opacity='.5'/><ellipse cx='100' cy='98' rx='22' ry='15.5' fill='#F4E4C4' stroke-width='1.15'/><circle cx='100' cy='58' r='3.2' fill='#FFA598' stroke='#98473F' stroke-width='.8'/><path d='M100 53.7L100 51M103.7 55.9L106.1 54.5M103.7 60.1L106.1 61.5M100 62.3L100 65M96.3 60.1L93.9 61.5M96.3 55.9L93.9 54.5' fill='none' stroke='#98473F' stroke-width='1' stroke-linecap='round'/><circle cx='88' cy='80' r='4.3' fill='#72583F'/><circle cx='87.2' cy='78.7' r='1.5' fill='#FFF6D8'/><circle cx='114' cy='79' r='3.9' fill='#72583F'/><circle cx='113.5' cy='78.2' r='1.3' fill='#FFF6D8'/><path d='M90 104c5.6 6.8 14.4 6.8 20 0' fill='none' stroke='#72583F' stroke-width='1.5' stroke-linecap='round'/><ellipse cx='100' cy='96' rx='4.2' ry='3' fill='#72583F'/></g>","delta":[["r",768,769,"8"],["r",772,773,"4"],["r",775,776,"2"],["r",780,781,"6"],["r",782,784,"20"],["r",789,790,"4"],["r",792,793,"4"],["r",799,800,"10"],["r",804,805,"2"],["r",807,808,"2"],["r",812,813,"2"],["r",860,861,"8"],["r",2193,2197,"42"],["r",2204,2205,"7"],["i",2255,2255,"8c-4 6-8 12-8 18M80 4"],["r",2258,2259,"4"],["r",2260,2266,"8"],["r",2271,2275,"-"],["d",2276,2289,""],["r",2291,2292,"2"],["r",2298,2299,"8"],["r",2300,2303,"4"],["i",2306,2306,"8 "],["i",2307,2307,"2 8 18M12"],["i",2308,2308," 46c4 8"],["d",2313,2317,""],["d",2319,2331,""],["r",2333,2334,"2"],["r",2379,2380,"2"],["r",2381,2382,"6"],["r",2428,2430,"33"],["r",2437,2440,"8"],["r",2772,2773,"6"],["i",2779,2779,"7"],["d",2780,2781,""],["r",2788,2789,"5"],["r",2820,2821,"5"],["r",2830,2831,"6"],["r",2873,2874,"6"],["r",2881,2882,"7"],["r",2887,2888,"4"],["r",2889,2890,"1"],["r",2922,2923,"5"],["r",2932,2933,"6"],["r",2942,2943,"4"]]},"lioncub":{"base":"m","pal":{"S":["#FFD0C8","#F69184","#98473F"],"H":["#F19F94",0.3]},"pat":"rosette","sil":"<defs><clipPath id='@C'><ellipse cx='102' cy='140' rx='31' ry='24'/><ellipse cx='132' cy='142' rx='29' ry='26'/></clipPath><ellipse id='@mp' cx='0' cy='-26' rx='7' ry='13'/></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><path d='M154 138c22 0 28 18 16 26' fill='none' stroke='#2A4A48' stroke-width='7' stroke-linecap='round'/><ellipse cx='168' cy='164' rx='6.2' ry='7.2' fill='#2E5554' stroke-width='1.15'/><ellipse cx='86' cy='168' rx='11' ry='6' fill='#E8C894' stroke-width='1.5'/><ellipse cx='108' cy='172' rx='12' ry='6' fill='#E8C894' stroke-width='1.5'/><ellipse cx='138' cy='168' rx='12' ry='6.2' fill='#E8C894' stroke-width='1.5'/><ellipse cx='132' cy='142' rx='29' ry='26' fill='url(#@L)' stroke-width='2'/><ellipse cx='102' cy='140' rx='31' ry='24' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='110' cy='140' rx='16' ry='12' fill='#F69184' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M114.4 140.4L126.4 141.4M111.3 144.4L113.5 152.5M107 143.9Q103.3 147.6 100.7 152.2M105.5 138.9L94.5 136.3M108.3 136.5L103.7 126.9M112.7 137.3L121.5 128.7' stroke='#F69184' stroke-width='2.7' opacity='.92'/><path d='M126.4 141.4L131.2 139.7M126.4 141.4L130.8 143.8M113.5 152.5L115.7 155.8M113.5 152.5L113.4 156.3M100.7 152.2L100 154.8M100.7 152.2L98 153.9M94.5 136.3L89.8 137.1M94.5 136.3L90.7 133.3M103.7 126.9L101.4 124.7M103.7 126.9L103.5 124.2M121.5 128.7L122.5 126.3M121.5 128.7L124.6 127.4' stroke='#FFA598' stroke-width='2.2' opacity='.9'/></g><ellipse cx='110' cy='140' rx='6.5' ry='4.8' fill='url(#@S)' stroke='#72583F' stroke-width='1'/></g><ellipse cx='90' cy='148' rx='13' ry='14' fill='#F4E4C4'/><g transform='translate(70 100)' fill='url(#@L)' stroke='#72583F' stroke-width='1.15'><use href='#@mp' transform='rotate(-90)'/><use href='#@mp' transform='rotate(-42)'/><use href='#@mp' transform='rotate(6)'/><use href='#@mp' transform='rotate(54)'/><use href='#@mp' transform='rotate(102)'/><use href='#@mp' transform='rotate(150)'/><use href='#@mp' transform='rotate(198)'/></g><ellipse cx='55' cy='80' rx='8' ry='12' transform='rotate(-20 55 80)' fill='url(#@L)' stroke-width='1.5'/><ellipse cx='55' cy='81' rx='4' ry='6.2' transform='rotate(-20 55 81)' fill='#F4E4C4'/><ellipse cx='85' cy='81' rx='7.2' ry='11' transform='rotate(18 85 81)' fill='url(#@L)' stroke-width='1.5'/><ellipse cx='85' cy='82' rx='3.6' ry='5.8' transform='rotate(18 85 82)' fill='#F4E4C4'/><ellipse cx='70' cy='100' rx='25' ry='23' fill='url(#@L)' stroke-width='1.9'/><ellipse cx='58' cy='110' rx='12' ry='9' fill='#F4E4C4'/><circle cx='60' cy='99' r='3.5' fill='#72583F'/><circle cx='59.2' cy='97.7' r='1.2' fill='#FFF6D8'/><circle cx='82' cy='97' r='2.1' fill='#72583F'/><circle cx='81.5' cy='96.2' r='.7' fill='#FFF6D8'/><path d='M55 96c4-2.2 8-2.2 10.5 0' fill='none' stroke='#72583F' stroke-width='1.1' stroke-linecap='round'/><path d='M78 94c3-1.5 6-1.5 8 0' fill='none' stroke='#72583F' stroke-width='.95' stroke-linecap='round'/><path d='M52 116c3.6 4.4 9.4 4.4 13 0' fill='none' stroke='#72583F' stroke-width='1.4' stroke-linecap='round'/><ellipse cx='50' cy='110' rx='2.8' ry='2.2' fill='#72583F'/></g>","delta":[["d",122,172,""],["r",1697,1698,"circle"],["r",1699,1708,"cx"],["r",1710,1711,"71' cy='90' "],["r",1712,1720,"='2."],["d",1721,1727,""],["d",1735,1739,""],["r",1740,1743,"FFA598"],["i",1754,1754,"984"],["i",1755,1755,"3F' stroke-width='.8'/><path d='M71 86."],["i",1756,1756,"L71 84M74.3 88.1L76.2 87M74.3 91.9L76.2 93M71 93.8L71 96M67.7 91.9L6"],["i",1757,1757,"."],["i",1758,1758," 93M67.7 88.1L65.8 87' fill='none' stroke='#9847"],["d",1777,1797,""],["i",1799,1799,"s"],["i",1801,1801,"oke-linec"],["r",1802,1808,"p"],["r",1812,1821,"und"],["d",1823,2076,""],["r",2106,2107,"9"],["r",2114,2115,"4"],["i",2213,2213,".5"],["r",2219,2220,"7"],["r",2221,2222,"3"],["r",2299,2302,"8"],["r",2309,2310,"3"],["r",2406,2409,"4"],["r",2415,2416,"6"],["r",2417,2418,"9"],["r",2496,2497,"6"],["r",2504,2505,"4"]]},"fox":{"base":"f","pal":{"S":["#F1D5FF","#CC99EB","#784F90"],"H":["#CDA5E6",0.3]},"pat":"lissajous","sil":"<defs><clipPath id='@C'><ellipse cx='100' cy='138' rx='30' ry='23'/><ellipse cx='130' cy='140' rx='28' ry='25'/></clipPath></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='154' cy='118' rx='19' ry='34' transform='rotate(14 154 118)' fill='url(#@L)' stroke-width='1.9'/><ellipse cx='160' cy='88' rx='13' ry='13' fill='#FFE4A4' stroke-width='1.5'/><ellipse cx='84' cy='168' rx='11' ry='5.8' fill='#E8C894' stroke-width='1.5'/><ellipse cx='106' cy='172' rx='11.5' ry='5.8' fill='#E8C894' stroke-width='1.5'/><ellipse cx='136' cy='168' rx='11.5' ry='6' fill='#E8C894' stroke-width='1.5'/><ellipse cx='130' cy='140' rx='28' ry='25' fill='url(#@L)' stroke-width='2'/><ellipse cx='100' cy='138' rx='30' ry='23' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='112' cy='138' rx='14' ry='12' fill='#CC99EB' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M117.1 138.5Q122.7 137.7 128.1 139.5M113.2 141.5L116.2 150.1M109.2 141.4L103.5 148.2M106.9 136.9L96.5 134.8M110.5 134.4Q108.2 130.9 107.4 126.7M113.9 135.1Q115.7 130 119.5 126.2' stroke='#CC99EB' stroke-width='2.7' opacity='.92'/><path d='M128.1 139.5L132.5 138.5M128.1 139.5L132 141.1M116.2 150.1L117.7 151.9M116.2 150.1L116 152.2M103.5 148.2L102.8 151M103.5 148.2L100.1 149.8M96.5 134.8L92.1 135.2M96.5 134.8L92.9 132.7M107.4 126.7L105.3 124.3M107.4 126.7L107.1 123.9M119.5 126.2L121.3 125.1' stroke='#DEADFD' stroke-width='2.2' opacity='.9'/></g><ellipse cx='112' cy='138' rx='6.5' ry='4.8' fill='url(#@S)' stroke='#72583F' stroke-width='1'/></g><ellipse cx='86' cy='146' rx='11' ry='20' fill='#F4E4C4'/><path d='M48 96c-2-24 14-28 18-8Z' fill='url(#@L)' stroke-width='1.55'/><path d='M50 96c-1-16 8-18 11-5Z' fill='#F4E4C4'/><path d='M74 94c5-24 20-18 13 2Z' fill='url(#@L)' stroke-width='1.55'/><path d='M76 95c3-16 12-12 8 1Z' fill='#F4E4C4'/><ellipse cx='64' cy='102' rx='21' ry='18.5' fill='url(#@L)' stroke-width='1.85'/><path d='M58 104c-8 2-17 8-20 14c7 4 18 4 24 0c2-5 0-11-4-14Z' fill='#F4E4C4' stroke-width='1.15'/><circle cx='56' cy='100' r='3.3' fill='#72583F'/><circle cx='55.2' cy='98.7' r='1.1' fill='#FFF6D8'/><circle cx='74' cy='98.5' r='2' fill='#72583F'/><circle cx='73.5' cy='97.7' r='.7' fill='#FFF6D8'/><path d='M48 120c3.4 4.1 8.6 4.1 12 0' fill='none' stroke='#72583F' stroke-width='1.3' stroke-linecap='round'/><ellipse cx='40' cy='116' rx='2.7' ry='2.1' fill='#72583F'/></g>","delta":[["r",212,213,"6"],["r",221,222,"6"],["r",228,230,"22"],["r",237,238,"8"],["r",259,260,"6"],["r",263,264,"6"],["r",267,268,"6"],["r",322,323,"4"],["r",330,331,"4"],["r",338,339,"5"],["r",346,347,"5"],["r",1616,1617,"4"],["r",1624,1625,"2"],["r",1631,1633,"15"],["r",1662,1663,"6"],["r",1665,1666,"4"],["r",1733,1735,"48"],["r",1737,1738,"4"],["r",1784,1785,"2"],["r",1787,1788,"2"],["r",1855,1856,"4"],["r",1858,1859,"3"],["r",1907,1908,"2"],["r",1916,1917,"0"],["r",1924,1925,"3"],["r",1931,1935,"20"],["r",1985,1986,"6"],["r",1989,1990,"2"],["r",2086,2087,"4"],["r",2093,2096,"98"],["r",2135,2136,"3"],["r",2145,2146,"6"],["r",2187,2188,"2"],["r",2195,2196,"6"],["r",2235,2236,"1"],["r",2245,2246,"5"],["r",2284,2285,"6"],["r",2287,2289,"18"],["r",2397,2399,"38"],["r",2407,2408,"4"]]},"olivedove":{"base":"f","pal":{"S":["#AAF0F2","#1FC9CE","#00757A"],"H":["#5ECBCE",0.3]},"pat":"koch","sil":"<defs><clipPath id='@C'><ellipse cx='108' cy='120' rx='35' ry='24'/></clipPath><path id='@lf' d='M0 0C-4-4-3.5-11 0-16C3.5-11 4-4 0 0Z'/><g id='@ol'><ellipse cx='0' cy='0' rx='3.2' ry='4.4' fill='#5B7A6A' stroke-width='.8'/><ellipse cx='-.7' cy='-1' rx='1.1' ry='1.5' fill='#C5DDD0' opacity='.7' stroke='none'/></g></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='150' cy='126' rx='16' ry='7' transform='rotate(14 150 126)' fill='url(#@L)' stroke-width='1.3'/><ellipse cx='146' cy='138' rx='16' ry='7' transform='rotate(28 146 138)' fill='#5B7A6A' stroke-width='1.3'/><ellipse cx='118' cy='108' rx='28' ry='14' transform='rotate(-18 118 108)' fill='url(#@L)' stroke-width='1.5'/><ellipse cx='96' cy='150' rx='2.2' ry='10' fill='#855A00'/><ellipse cx='110' cy='150' rx='2.2' ry='10' fill='#855A00'/><ellipse cx='96' cy='160' rx='6' ry='2.4' fill='#855A00'/><ellipse cx='110' cy='160' rx='6' ry='2.4' fill='#855A00'/><ellipse cx='108' cy='120' rx='35' ry='24' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='108' cy='120' rx='16' ry='11' fill='#1FC9CE' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M112.9 120.4Q119.5 120 126 121.5M108.8 122.7L111.2 131.3M105.7 122.8L100.3 129.7M103.5 119.1L90.2 116.4M106.6 116.7L103.2 108.5M110.4 116.6Q113.3 113.9 114.9 110.2' stroke='#1FC9CE' stroke-width='2.7' opacity='.92'/><path d='M126 121.5L131.2 119.7M126 121.5L130.9 124.2M100.3 129.7L99.7 131.8M100.3 129.7L97.3 131.2M90.2 116.4L84.6 117.8M90.2 116.4L86.7 113.8M114.9 110.2L115.6 108.1M114.9 110.2L117.2 108.4' stroke='#4CDCE0' stroke-width='2.2' opacity='.9'/></g><ellipse cx='108' cy='120' rx='6.1' ry='4.5' fill='url(#@S)' stroke='#72583F' stroke-width='.9'/></g><ellipse cx='112' cy='126' rx='26' ry='13' transform='rotate(-12 112 126)' fill='#6F9A7A' stroke-width='1.5' opacity='.7'/><ellipse cx='92' cy='124' rx='14' ry='12' fill='#C5DDD0' opacity='.45'/><circle cx='74' cy='96' r='17' fill='#E8C894' stroke-width='1.8'/><path d='M56 98l-10 3 10 3Z' fill='#1FC9CE' stroke-width='1'/><circle cx='68' cy='94' r='3.1' fill='#72583F'/><circle cx='67.2' cy='92.7' r='1.1' fill='#FFF6D8'/><circle cx='82' cy='93' r='1.9' fill='#72583F'/><circle cx='81.5' cy='92.2' r='.6' fill='#FFF6D8'/><path d='M66 103c2.5 3.1 6.5 3.1 9 0' fill='none' stroke='#72583F' stroke-width='1.2' stroke-linecap='round'/><path d='M48 101c-10 6-22 8-34 4' fill='none' stroke='#5B7A6A' stroke-width='1.6' stroke-linecap='round'/><use href='#@lf' transform='translate(36 100) rotate(-55) scale(0.8)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@lf' transform='translate(26 98) rotate(-40) scale(0.8)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@lf' transform='translate(32 108) rotate(200) scale(0.8)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@ol' transform='translate(30 104) rotate(20)'/><use href='#@ol' transform='translate(22 110) rotate(-10) scale(0.9)'/><use href='#@lf' transform='translate(18 104) rotate(-20) scale(0.7)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@ol' transform='translate(40 106) rotate(30) scale(0.8)'/></g>","delta":[["r",56,57,"8"],["r",64,65,"6"],["r",985,986,"8"],["r",993,994,"6"],["d",1886,1890,""],["r",1891,1893,"ath"],["r",1894,1896,"d"],["r",1898,1899,"M66 110c8 8 "],["r",1900,1901,"0"],["r",1902,1907,"8 "],["r",1908,1924,"8-"],["r",1933,1940,"none"],["i",1942,1942,"str"],["r",1943,1949,"ke"],["i",1951,1951,"#1FC9CE' stroke-width='3"],["r",1952,1954,"2' stroke-linecap='round"],["r",1985,1986,"8"],["d",2945,3120,""]]},"olivesprite":{"base":"m","pal":{"S":["#AAF0F2","#1FC9CE","#00757A"],"H":["#5ECBCE",0.3]},"pat":"veins","sil":"<defs><clipPath id='@C'><path d='M82 112c10 6 26 6 36 0c2 16 4 34-4 46c-8 4-20 4-28 0c-8-12-6-30-4-46Z'/></clipPath><path id='@lf' d='M0 0C-4-4-3.5-11 0-16C3.5-11 4-4 0 0Z'/><g id='@ol'><ellipse cx='0' cy='0' rx='3.2' ry='4.4' fill='#5B7A6A' stroke-width='.8'/><ellipse cx='-.7' cy='-1' rx='1.1' ry='1.5' fill='#C5DDD0' opacity='.7' stroke='none'/></g></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='90' cy='166' rx='7' ry='10' fill='#E8C894' stroke-width='1.4'/><ellipse cx='110' cy='166' rx='7' ry='10' fill='#E8C894' stroke-width='1.4'/><path d='M82 112c10 6 26 6 36 0c2 16 4 34-4 46c-8 4-20 4-28 0c-8-12-6-30-4-46Z' fill='url(#@L)' stroke-width='1.8'/><g clip-path='url(#@C)'><ellipse cx='100' cy='132' rx='12' ry='14' fill='#1FC9CE' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M103 132.3L111.2 133M101.6 135.2Q104.7 139.3 106.2 144.2M97.9 134.7Q94.2 137.9 92 142.3M97.1 131.6L88.9 130.4M98.5 128.6Q95.6 124.6 94.4 119.7M102.6 129.2L108.1 123.4' stroke='#1FC9CE' stroke-width='2.7' opacity='.92'/><path d='M106.2 144.2L106.4 146.2M94.4 119.7L94.3 117.3M108.1 123.4L109.2 120.9M108.1 123.4L110.1 122.3' stroke='#4CDCE0' stroke-width='2.2' opacity='.9'/></g><ellipse cx='100' cy='132' rx='5.8' ry='4.2' fill='url(#@S)' stroke='#72583F' stroke-width='.9'/></g><path d='M84 118c-12 10-16 22-12 30' fill='none' stroke='#72583F' stroke-width='5.2' stroke-linecap='round'/><path d='M84 118c-12 10-16 22-12 30' fill='none' stroke='#E8C894' stroke-width='3.6' stroke-linecap='round'/><path d='M116 118c10 8 14 16 12 26' fill='none' stroke='#72583F' stroke-width='5.2' stroke-linecap='round'/><path d='M116 118c10 8 14 16 12 26' fill='none' stroke='#E8C894' stroke-width='3.6' stroke-linecap='round'/><circle cx='72' cy='148' r='4.2' fill='#E8C894' stroke-width='1.2'/><circle cx='128' cy='144' r='4.2' fill='#E8C894' stroke-width='1.2'/><path d='M70 168L76 108M76 112l-8-10M76 112l6-9' fill='none' stroke='#855A00' stroke-width='2' stroke-linecap='round'/><use href='#@lf' transform='translate(68 100) rotate(-30) scale(0.7)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@lf' transform='translate(84 101) rotate(25) scale(0.7)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@lf' transform='translate(88 74) rotate(-40) scale(0.9)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@lf' transform='translate(100 67) rotate(0) scale(1.2)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@lf' transform='translate(112 74) rotate(40) scale(0.9)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@lf' transform='translate(100 69) rotate(0) scale(1.15)' fill='#6F9A7A' stroke-width='1.1'/><circle cx='100' cy='86' r='20' fill='#E8C894' stroke-width='1.9'/><circle cx='92.5' cy='85' r='3.2' fill='#72583F'/><circle cx='91.7' cy='83.8' r='1.1' fill='#FFF6D8'/><circle cx='107.5' cy='85' r='3.2' fill='#72583F'/><circle cx='106.7' cy='83.8' r='1.1' fill='#FFF6D8'/><path d='M93 94c3.9 4.8 10.1 4.8 14 0' fill='none' stroke='#72583F' stroke-width='1.4' stroke-linecap='round'/></g>","delta":[["i",1360,1360,"6 "],["d",1362,1365,""],["r",1366,1368,"4"],["i",1370,1370,"0 8 "],["r",1371,1377,"4"],["i",1469,1469,"6 "],["d",1471,1474,""],["r",1475,1477,"4"],["i",1479,1479,"0 8 "],["r",1480,1486,"4"],["d",1578,1587,""],["i",1592,1592,"4 "],["r",1593,1594,"0-8 24"],["d",1686,1695,""],["i",1700,1700,"4 "],["r",1701,1702,"0-8 24"],["r",1788,1790,"94"],["r",1798,1799,"2"],["d",1805,1807,""],["r",1857,1859,"06"],["r",1867,1868,"2"],["d",1874,1876,""],["i",1914,1914,"elli"],["r",1915,1918,"se"],["r",1919,1920,"cx"],["d",1922,1933,""],["i",1935,1935,"0' cy='13"],["r",1936,1939,"'"],["i",1940,1940,"rx='"],["r",1942,1952,"'"],["i",1953,1953,"ry='"],["d",1955,1960,""],["r",1968,1972,"#1FC9CE"],["r",1974,1975,"opaci"],["r",1976,1980,"y"],["r",1982,2029,".4"],["i",2045,2045,"o"],["d",2046,2047,""],["d",2070,2073,""],["d",2076,2077,""],["r",2078,2086,"1"],["r",2087,2088,"8"],["d",2096,2131,""],["r",2133,2134,"3)"],["r",2178,2181,"86"],["r",2190,2192,"-90"],["r",2202,2203,"85"],["r",2279,2281,"90"],["r",2283,2284,"2"],["r",2294,2296,"36"],["r",2384,2385,"1"],["d",2387,2388,""],["i",2389,2389,"2"],["r",2398,2424,"3"],["d",2425,2503,""],["r",2591,2593,"16"],["i",2594,2594,"8"],["d",2595,2596,""],["i",2605,2605,"9"],["r",2614,2615,"0"],["r",2616,2617,"8"],["i",2653,2653,"'/><use href='#@ol' transform='translate(87 70) rotate(-20) scale(0.9)'/><use href='#@ol' transform='translate(113 70) rotate(20) scale(0.9)"]]},"firefly":{"base":"f","pal":{"S":["#BFE6FF","#A5A7FE","#5A5AA0"],"H":["#ADB0F6",0.3],"Lb":[["0","#BFE6FF",".7"],[".55","#A5A7FE",".35"],["1","#A5A7FE","0"]]},"pat":"sierpinski","sil":"<defs><clipPath id='@C'><ellipse cx='100' cy='148' rx='20' ry='22'/></clipPath></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='100' cy='148' rx='36' ry='36' fill='url(#@Lb)'/><ellipse cx='74' cy='104' rx='24' ry='15' transform='rotate(-22 74 104)' fill='#B8BAFF' fill-opacity='.55' stroke='#72583F' stroke-width='1.2'/><ellipse cx='126' cy='104' rx='24' ry='15' transform='rotate(22 126 104)' fill='#B8BAFF' fill-opacity='.55' stroke='#72583F' stroke-width='1.2'/><ellipse cx='78' cy='114' rx='18' ry='10' transform='rotate(-12 78 114)' fill='#B8BAFF' fill-opacity='.55' stroke='#72583F' stroke-width='1.2'/><ellipse cx='122' cy='114' rx='18' ry='10' transform='rotate(12 122 114)' fill='#B8BAFF' fill-opacity='.55' stroke='#72583F' stroke-width='1.2'/><ellipse cx='100' cy='148' rx='20' ry='22' fill='url(#@L)' stroke-width='1.7'/><g clip-path='url(#@C)'><ellipse cx='100' cy='146' rx='11' ry='12.1' fill='#BFE6FF' opacity='.8'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M103.4 148.3L110.9 149M101.3 151.6L104.2 159M97.7 150.5L92.9 155.7M96.5 147.8L89.5 147.5M98.6 144.5Q97.9 140.8 95.8 137.7M101.9 145.8Q103.7 142.3 106.9 139.8' stroke='#A5A7FE' stroke-width='2.7' opacity='.92'/><path d='M92.9 155.7L92.1 157.6' stroke='#B8BAFF' stroke-width='2.2' opacity='.9'/></g><ellipse cx='100' cy='148' rx='7.6' ry='5.6' fill='url(#@S)' stroke='#72583F' stroke-width='1.2'/></g><ellipse cx='100' cy='118' rx='16' ry='15' fill='#C4A07A' stroke-width='1.7'/><path d='M92 88c-8-10-14-12-18-10M108 88c8-10 14-12 18-10' fill='none' stroke='#72583F' stroke-width='1.4'/><circle cx='74' cy='78' r='2.3' fill='#A5A7FE' stroke-width='.8'/><circle cx='126' cy='78' r='2.3' fill='#A5A7FE' stroke-width='.8'/><circle cx='100' cy='96' r='14' fill='#E8C894' stroke-width='1.7'/><circle cx='94.5' cy='95' r='3' fill='#72583F'/><circle cx='93.7' cy='93.8' r='1' fill='#FFF6D8'/><circle cx='105.5' cy='95' r='3' fill='#72583F'/><circle cx='104.7' cy='93.8' r='1' fill='#FFF6D8'/><path d='M94 103c3.4 4.1 8.6 4.1 12 0' fill='none' stroke='#72583F' stroke-width='1.2' stroke-linecap='round'/></g>","delta":[["r",55,57,"16"],["r",64,65,"0"],["r",185,186,"2"],["r",193,194,"4"],["r",227,229,"68"],["r",237,238,"0"],["r",244,245,"3"],["i",275,275,"30 68 100)' fill='#B8BAFF' fill-opacity='.55' stroke='#7"],["i",276,276,"583F' stroke-width='1."],["i",277,277,"'/><ellipse cx='132' cy='100' rx='34' ry='15' transform='rotate(30 132 100)' fill='#B8BAFF' fill-opacity='.55' stroke='#72583F' stroke-width='1.2'/><ellipse cx='74' cy='112' rx='24' ry='10' transform='rotate(-18"],["r",282,284,"12"],["r",381,383,"12"],["d",391,680,""],["r",709,710,"8"],["r",713,714,"6"],["r",717,718,"2"],["r",823,825,"16"],["r",832,833,"0"],["r",926,928,"8.8"],["d",935,937,""],["r",1043,1044,"2"],["r",1045,1046,"7"],["i",1054,1054,"08.1 148.7M"],["i",1056,1056,"1.2 151.2L103.7 157.8M98 150.2L94 154.6M97.8 147.7L91"],["d",1061,1086,""],["d",1087,1128,""],["r",1136,1137,"5"],["r",1139,1140,"L"],["d",1141,1146,""],["d",1147,1189,""],["r",1196,1197,"1M101.7 145.7L105.5 140.6"],["d",1247,1330,""],["r",1471,1472,"4"],["r",1479,1480,"6"]]},"mosshedgehog":{"base":"f","pal":{"S":["#C8EEC3","#82C57A","#3B7335"],"H":["#93C88C",0.3]},"pat":"hex","sil":"<defs><clipPath id='@C'><ellipse cx='110' cy='126' rx='48' ry='37'/></clipPath><ellipse id='@pd' rx='10' ry='8'/><g id='@bl' fill='#C5DDD0' stroke-width='.5'><circle cx='2' cy='-2' r='2.2'/><circle cx='2' cy='2' r='2.2'/><circle cx='-2' cy='2' r='2.2'/><circle cx='-2' cy='-2' r='2.2'/><circle cx='0' cy='0' r='1.6' fill='#82C57A' stroke='none'/></g></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='82' cy='166' rx='10' ry='5.4' fill='#E8C894' stroke-width='1.35'/><ellipse cx='112' cy='168' rx='10' ry='5.4' fill='#E8C894' stroke-width='1.35'/><ellipse cx='136' cy='162' rx='8' ry='5' fill='#E8C894' stroke-width='1.25'/><ellipse cx='110' cy='126' rx='48' ry='37' fill='url(#@L)' stroke-width='2.1'/><use href='#@pd' transform='translate(145.3 103.2) rotate(50) scale(0.9)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@pd' transform='translate(155.9 128.8) rotate(94) scale(0.9)' fill='#7FA887' stroke-width='1.1'/><use href='#@pd' transform='translate(151.2 141.9) rotate(117) scale(0.9)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@pd' transform='translate(140.3 152.8) rotate(139) scale(0.9)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@pd' transform='translate(124.9 159.6) rotate(161) scale(0.9)' fill='#7FA887' stroke-width='1.1'/><use href='#@pd' transform='translate(107.3 161.5) rotate(183) scale(0.9)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@pd' transform='translate(90.1 158) rotate(206) scale(0.9)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@pd' transform='translate(75.9 149.9) rotate(228) scale(0.9)' fill='#7FA887' stroke-width='1.1'/><g clip-path='url(#@C)'><ellipse cx='110' cy='126' rx='20' ry='16' fill='#82C57A' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M116.2 126.5Q123.1 126 129.7 127.7M111.4 130.2L115.1 140.9M107.2 130.4L100.8 140.7M103.4 125.6Q96.1 124.3 88.6 124.6M107.3 121.2L102.2 112.1M112.6 121.6L118.3 111.9' stroke='#82C57A' stroke-width='2.7' opacity='.92'/><path d='M129.7 127.7L135.3 126.5M129.7 127.7L135 129.9M115.1 140.9L117.9 144.7M115.1 140.9L115.1 145.7M100.8 140.7L100.2 145.1M100.8 140.7L96.5 143.6M88.6 124.6L82.7 126.6M88.6 124.6L83 121.9M102.2 112.1L98.6 109.7M102.2 112.1L102 107.8M118.3 111.9L119.2 107.3M118.3 111.9L121.8 108.8' stroke='#96D88F' stroke-width='2.2' opacity='.9'/></g><ellipse cx='110' cy='126' rx='6.8' ry='5' fill='url(#@S)' stroke='#72583F' stroke-width='1'/></g><ellipse cx='72' cy='108' rx='5' ry='6' fill='#E8C894' stroke-width='1.2'/><ellipse cx='92' cy='110' rx='4.5' ry='5.5' fill='#E8C894' stroke-width='1.2'/><ellipse cx='80' cy='128' rx='24' ry='21' fill='#E8C894' stroke-width='1.7'/><ellipse cx='74' cy='134' rx='10' ry='8' fill='#F4E4C4'/><circle cx='72' cy='126' r='3.4' fill='#72583F'/><circle cx='71.2' cy='124.7' r='1.2' fill='#FFF6D8'/><circle cx='90' cy='125' r='2.1' fill='#72583F'/><circle cx='89.5' cy='124.2' r='.7' fill='#FFF6D8'/><path d='M70 138c3.9 4.8 10.1 4.8 14 0' fill='none' stroke='#72583F' stroke-width='1.4' stroke-linecap='round'/><ellipse cx='66' cy='134' rx='3.2' ry='2.4' fill='#72583F'/><use href='#@bl' transform='translate(128 98)'/><use href='#@bl' transform='translate(104 88) scale(.9)'/></g>","delta":"<defs><clipPath id='@C'><ellipse cx='110' cy='126' rx='50' ry='38'/></clipPath><ellipse id='@pd' rx='10' ry='8'/></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='82' cy='166' rx='10' ry='5.4' fill='#E8C894' stroke-width='1.35'/><ellipse cx='112' cy='168' rx='10' ry='5.4' fill='#E8C894' stroke-width='1.35'/><ellipse cx='136' cy='162' rx='8' ry='5' fill='#E8C894' stroke-width='1.25'/><ellipse cx='110' cy='126' rx='50' ry='38' fill='url(#@L)' stroke-width='2.1'/><use href='#@pd' transform='translate(149.1 101.1) rotate(50) scale(1.1)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@pd' transform='translate(160.2 132.7) rotate(100) scale(1.1)' fill='#7FA887' stroke-width='1.1'/><use href='#@pd' transform='translate(151.8 148.2) rotate(125) scale(1)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@pd' transform='translate(135.5 159.6) rotate(150) scale(1.1)' fill='#6F9A7A' stroke-width='1.1'/><use href='#@pd' transform='translate(114.4 164.6) rotate(175) scale(1)' fill='#7FA887' stroke-width='1.1'/><use href='#@pd' transform='translate(92.6 162.4) rotate(200) scale(1.1)' fill='#5B7A6A' stroke-width='1.1'/><use href='#@pd' transform='translate(73.9 153.4) rotate(225) scale(1)' fill='#6F9A7A' stroke-width='1.1'/><g clip-path='url(#@C)'><ellipse cx='110' cy='126' rx='20' ry='16' fill='#82C57A' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M116.5 126.6Q123.6 126 130.5 127.8M111.5 130.3L115.2 141.3M107.1 130.6L100.5 141.2M103.1 125.6Q95.5 124.2 87.7 124.5M107.3 121.1L102 111.7M112.7 121.4L118.5 111.5' stroke='#82C57A' stroke-width='2.7' opacity='.92'/><path d='M130.5 127.8L136.3 126.6M130.5 127.8L136 130M115.2 141.3L118.1 145.3M115.2 141.3L115.3 146.2M100.5 141.2L99.8 145.8M100.5 141.2L96.1 144.1M87.7 124.5L81.6 126.6M87.7 124.5L81.9 121.7M102 111.7L98.3 109.2M102 111.7L101.8 107.2M118.5 111.5L119.5 106.7M118.5 111.5L122.1 108.3' stroke='#96D88F' stroke-width='2.2' opacity='.9'/></g><ellipse cx='110' cy='126' rx='6.8' ry='5' fill='url(#@S)' stroke='#72583F' stroke-width='1'/></g><ellipse cx='72' cy='108' rx='5' ry='6' fill='#E8C894' stroke-width='1.2'/><ellipse cx='92' cy='110' rx='4.5' ry='5.5' fill='#E8C894' stroke-width='1.2'/><ellipse cx='80' cy='128' rx='24' ry='21' fill='#E8C894' stroke-width='1.7'/><ellipse cx='74' cy='134' rx='10' ry='8' fill='#F4E4C4'/><circle cx='72' cy='126' r='3.4' fill='#72583F'/><circle cx='71.2' cy='124.7' r='1.2' fill='#FFF6D8'/><circle cx='90' cy='125' r='2.1' fill='#72583F'/><circle cx='89.5' cy='124.2' r='.7' fill='#FFF6D8'/><path d='M70 138c3.9 4.8 10.1 4.8 14 0' fill='none' stroke='#72583F' stroke-width='1.4' stroke-linecap='round'/><ellipse cx='66' cy='134' rx='3.2' ry='2.4' fill='#72583F'/><ellipse cx='64' cy='164' rx='6.5' ry='7.5' fill='#DCA64B' stroke-width='1.15'/><path d='M57 160c4-5 10-5 14 0c-2 3-12 3-14 0Z' fill='#855A00' stroke-width='1.05'/><path d='M71 157l3-4' stroke='#855A00' stroke-width='1.2' stroke-linecap='round'/></g>"},"glowcap":{"base":"f","pal":{"S":["#C8EEC3","#82C57A","#3B7335"],"H":["#93C88C",0.3]},"pat":"voronoi","sil":"<defs><clipPath id='@C'><ellipse cx='106' cy='96' rx='54' ry='26'/></clipPath></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='106' cy='172' rx='40' ry='9' fill='#5B7A6A' stroke-width='1.4'/><ellipse cx='90' cy='170' rx='12' ry='5' fill='#6F9A7A'/><ellipse cx='122' cy='171' rx='10' ry='4.5' fill='#6F9A7A'/><path d='M78 168c-8 2-14 0-16-6M70 170c-6 4-6 8-2 10M136 168c8 1 14-2 16-8M130 172c6 4 10 4 12 0' fill='none' stroke='#5B7A6A' stroke-width='1.25'/><g transform='translate(50 160) scale(0.8)'><path d='M-6 4c0 8 0 12 2 14c3 2 7 2 10 0c2-2 2-6 2-14Z' fill='#E8C894' stroke-width='1.4'/><path d='M-12 4c0-10 6-16 12-16c6 0 12 6 12 16c-8-4-16-4-24 0Z' fill='url(#@L)' stroke-width='1.5'/><ellipse cx='0' cy='-4' rx='3' ry='2' fill='#C8EEC3' opacity='.7' stroke='none'/></g><g transform='translate(160 158) scale(0.7)'><path d='M-6 4c0 8 0 12 2 14c3 2 7 2 10 0c2-2 2-6 2-14Z' fill='#E8C894' stroke-width='1.4'/><path d='M-12 4c0-10 6-16 12-16c6 0 12 6 12 16c-8-4-16-4-24 0Z' fill='url(#@L)' stroke-width='1.5'/><ellipse cx='0' cy='-4' rx='3' ry='2' fill='#C8EEC3' opacity='.7' stroke='none'/></g><path d='M80 112c2 24 2 46 8 54c12 7 24 7 36 0c6-8 6-30 8-54Z' fill='#E8C894' stroke-width='1.9'/><ellipse cx='82' cy='132' rx='7' ry='5' fill='#E8C894' stroke-width='1.3'/><ellipse cx='128' cy='132' rx='7' ry='5' fill='#E8C894' stroke-width='1.3'/><circle cx='96' cy='128' r='3.3' fill='#72583F'/><circle cx='95.2' cy='126.8' r='1.1' fill='#FFF6D8'/><circle cx='114' cy='128' r='3.3' fill='#72583F'/><circle cx='113.2' cy='126.8' r='1.1' fill='#FFF6D8'/><path d='M96 138c5 6.1 13 6.1 18 0' fill='none' stroke='#72583F' stroke-width='1.5' stroke-linecap='round'/><path d='M50 108c2-26 22-40 56-40c34 0 54 14 56 40c-18-10-72-10-112 0Z' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='106' cy='94' rx='21.6' ry='10.4' fill='#82C57A' opacity='.28'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M113.3 94.7L129.2 96.1M107.1 97.2Q107.8 101.9 110.1 106M103.3 97.2L96.4 105.2M99.3 93.5Q91 90.8 82.5 92.1M105.1 91L102.4 82.1M107.8 91.1Q109.6 86.5 112.8 82.8' stroke='#82C57A' stroke-width='2.7' opacity='.92'/><path d='M129.2 96.1L135.8 94.7M129.2 96.1L135.4 98.6M96.4 105.2L94.2 106.4M82.5 92.1L75.8 94.7M82.5 92.1L76.3 88.6M112.8 82.8L114.7 81.2' stroke='#96D88F' stroke-width='2.2' opacity='.9'/></g><ellipse cx='106' cy='94' rx='6.5' ry='4.8' fill='url(#@S)' stroke='#72583F' stroke-width='1'/></g><path d='M50 108c2-26 22-40 56-40c34 0 54 14 56 40c-18-10-72-10-112 0Z' fill='none' stroke-width='2'/></g>","delta":"<defs><clipPath id='@C'><ellipse cx='105' cy='92' rx='42' ry='28'/></clipPath></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='106' cy='172' rx='40' ry='9' fill='#5B7A6A' stroke-width='1.4'/><ellipse cx='90' cy='170' rx='12' ry='5' fill='#6F9A7A'/><ellipse cx='122' cy='171' rx='10' ry='4.5' fill='#6F9A7A'/><path d='M78 168c-8 2-14 0-16-6M70 170c-6 4-6 8-2 10M136 168c8 1 14-2 16-8M130 172c6 4 10 4 12 0' fill='none' stroke='#5B7A6A' stroke-width='1.25'/><g transform='translate(54 158) scale(0.8)'><path d='M-6 4c0 8 0 12 2 14c3 2 7 2 10 0c2-2 2-6 2-14Z' fill='#E8C894' stroke-width='1.4'/><path d='M-12 4c0-10 6-16 12-16c6 0 12 6 12 16c-8-4-16-4-24 0Z' fill='url(#@L)' stroke-width='1.5'/><ellipse cx='0' cy='-4' rx='3' ry='2' fill='#C8EEC3' opacity='.7' stroke='none'/></g><path d='M84 108c2 28 2 52 6 60c10 6 20 6 30 0c4-8 4-32 6-60Z' fill='#E8C894' stroke-width='1.9'/><ellipse cx='82' cy='132' rx='7' ry='5' fill='#E8C894' stroke-width='1.3'/><ellipse cx='128' cy='132' rx='7' ry='5' fill='#E8C894' stroke-width='1.3'/><circle cx='96' cy='128' r='3.3' fill='#72583F'/><circle cx='95.2' cy='126.8' r='1.1' fill='#FFF6D8'/><circle cx='114' cy='128' r='3.3' fill='#72583F'/><circle cx='113.2' cy='126.8' r='1.1' fill='#FFF6D8'/><path d='M96 138c5 6.1 13 6.1 18 0' fill='none' stroke='#72583F' stroke-width='1.5' stroke-linecap='round'/><path d='M62 104c2-28 18-44 43-44c25 0 42 16 44 44c-14-8-54-8-87 0Z' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='105' cy='92' rx='16.8' ry='11.2' fill='#82C57A' opacity='.28'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M110.7 92.5L123.2 93.6M106.2 95.4Q106.9 100.4 109.4 104.8M102.2 95.2L95.3 103.4M99.8 91.4Q92.7 89.4 85.4 89.7M103.2 88.2L99 79.7M107.2 89.2Q109.5 84.8 113.2 81.6' stroke='#82C57A' stroke-width='2.7' opacity='.92'/><path d='M123.2 93.6L128.4 92.5M123.2 93.6L128.1 95.6M95.3 103.4L94.6 105.3M95.3 103.4L92.7 104.7M85.4 89.7L80.3 91.2M85.4 89.7L81.5 87.5M99 79.7L97.4 78.1M113.2 81.6L113.9 78.3M113.2 81.6L116.9 79.9' stroke='#96D88F' stroke-width='2.2' opacity='.9'/></g><ellipse cx='105' cy='92' rx='6.5' ry='4.8' fill='url(#@S)' stroke='#72583F' stroke-width='1'/></g><path d='M62 104c2-28 18-44 43-44c25 0 42 16 44 44c-14-8-54-8-87 0Z' fill='none' stroke-width='2'/></g>"},"deer":{"base":"m","pal":{"S":["#C8EEC3","#82C57A","#3B7335"],"H":["#93C88C",0.3]},"pat":"spiral","sil":"<defs><clipPath id='@C'><ellipse cx='122' cy='138' rx='38' ry='24'/></clipPath></defs><g stroke='#72583F' stroke-linejoin='round' stroke-linecap='round'><ellipse cx='158' cy='128' rx='6' ry='8' transform='rotate(30 158 128)' fill='#F4E4C4' stroke-width='1.25'/><ellipse cx='96' cy='164' rx='7.5' ry='12' fill='url(#@L)' stroke-width='1.35'/><ellipse cx='126' cy='166' rx='7.5' ry='11' fill='url(#@L)' stroke-width='1.35'/><ellipse cx='92' cy='174' rx='6.2' ry='3.4' fill='#855A00' stroke-width='1.05'/><ellipse cx='122' cy='176' rx='6.2' ry='3.4' fill='#855A00' stroke-width='1.05'/><ellipse cx='142' cy='160' rx='6.5' ry='10' fill='url(#@L)' stroke-width='1.25'/><ellipse cx='140' cy='170' rx='5.4' ry='3.1' fill='#855A00' stroke-width='1.05'/><ellipse cx='122' cy='138' rx='38' ry='24' fill='url(#@L)' stroke-width='2'/><g clip-path='url(#@C)'><ellipse cx='112' cy='128' rx='4' ry='3.1' fill='#F4E4C4' opacity='.92'/><ellipse cx='128' cy='124' rx='4' ry='3.1' fill='#F4E4C4' opacity='.92'/><ellipse cx='142' cy='130' rx='4' ry='3.1' fill='#F4E4C4' opacity='.92'/><ellipse cx='134' cy='142' rx='4' ry='3.1' fill='#F4E4C4' opacity='.92'/><ellipse cx='122' cy='138' rx='16' ry='10' fill='#82C57A' opacity='.22'/><g fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M127.3 138.5Q134.9 137.7 142.2 139.9M123.5 141.4Q125.9 144.5 126.7 148.4M119.9 140.4L113 148.6M115.5 137.6L103.4 136.8M120.8 135.1Q118.6 131.4 117.6 127.2M123.9 135.5Q127.5 132.2 129.6 127.8' stroke='#82C57A' stroke-width='2.7' opacity='.92'/><path d='M142.2 139.9L148.1 137.9M142.2 139.9L146.8 142.4M126.7 148.4L128.7 150.1M103.4 136.8L98.6 138.6M103.4 136.8L98.8 134.5M117.6 127.2L116 125.8M129.6 127.8L131.6 126.4' stroke='#96D88F' stroke-width='2.2' opacity='.9'/></g><ellipse cx='122' cy='138' rx='6.1' ry='4.5' fill='url(#@S)' stroke='#72583F' stroke-width='.9'/></g><path d='M92 128c-8-18-6-32 2-42c7-2 14 6 16 18c2 12-6 24-18 26Z' fill='url(#@L)' stroke-width='1.65'/><ellipse cx='64' cy='64' rx='4' ry='7' fill='#6F9A7A' stroke-width='1.2'/><ellipse cx='78' cy='62' rx='4' ry='7' fill='#5B7A6A' stroke-width='1.2'/><ellipse cx='58' cy='64' rx='7.5' ry='13' transform='rotate(-28 58 64)' fill='url(#@L)' stroke-width='1.45'/><ellipse cx='58' cy='64' rx='3.6' ry='7.4' transform='rotate(-28 58 64)' fill='#F4E4C4'/><ellipse cx='84' cy='62' rx='7' ry='12' transform='rotate(22 84 62)' fill='url(#@L)' stroke-width='1.45'/><ellipse cx='84' cy='62' rx='3.4' ry='6.8' transform='rotate(22 84 62)' fill='#F4E4C4'/><ellipse cx='72' cy='82' rx='19' ry='16' fill='url(#@L)' stroke-width='1.75'/><ellipse cx='60' cy='90' rx='11.5' ry='8' fill='#F4E4C4'/><circle cx='64' cy='80' r='3.2' fill='#72583F'/><circle cx='63.2' cy='78.7' r='1.1' fill='#FFF6D8'/><circle cx='81' cy='79' r='2' fill='#72583F'/><circle cx='80.5' cy='78.2' r='.7' fill='#FFF6D8'/><path d='M56 96c3.4 4.1 8.6 4.1 12 0' fill='none' stroke='#72583F' stroke-width='1.2' stroke-linecap='round'/><ellipse cx='51' cy='90' rx='3' ry='2.3' fill='#72583F'/></g>","delta":[["i",1152,1152,"18' cy='140' rx='4' ry='3.1' fill='#F4E4C4' opacity='.92'/><ellipse cx='1"],["i",1971,1971,"5"],["d",1972,2047,""],["r",2061,2138,"9"],["r",2145,2146,"6"],["r",2167,2169,"30"],["d",2171,2173,""],["d",2174,2367,""],["r",2423,2425,"56"],["r",2439,2440,"4"],["i",2448,2448,"9.2' transform='rotate(-30 5"],["i",2449,2449," 62)' fill='#F4E4C4'/><ellipse cx='86' cy='60' rx='8"],["r",2450,2451,"4' ry='15"],["r",2472,2473,"4"],["i",2475,2475,"6 60)' fill='url(#@L)' stroke-width='1.45'/><ellipse cx='86' cy='60' rx='4' ry='8.4' transform='rotate(2"],["i",2477,2477,"8"],["r",2478,2479," 60"]]}}};
let n120=0;
function uid120(){return 'x'+(++n120)}
const EXTRA_SP120=['suntiger','lioncub','fox','olivedove','olivesprite','firefly','mosshedgehog','glowcap','deer'];
const EXTRA_IDS120=EXTRA_SP120.flatMap(s=>[s+'_m',s+'_f']);
const EXTRA_SET120=new Set(EXTRA_IDS120);
const NAMES120={
 suntiger:{en:'Sun Tiger',es:'Tigre del sol'},
 lioncub:{en:'Lion cub',es:'Cachorro de león'},
 fox:{en:'Fox',es:'Zorro'},
 olivedove:{en:'Olive dove',es:'Paloma de olivo'},
 olivesprite:{en:'Olive sprite',es:'Duende de olivo'},
 firefly:{en:'Firefly',es:'Luciérnaga'},
 mosshedgehog:{en:'Moss hedgehog',es:'Erizo de musgo'},
 glowcap:{en:'Glowcap',es:'Gorro de luz'},
 deer:{en:'Deer',es:'Cervatillo'}
};
const PAT120={suntiger:'cymatic',lioncub:'rosette',fox:'lissajous',olivedove:'koch',olivesprite:'veins',firefly:'sierpinski',mosshedgehog:'hex',glowcap:'voronoi',deer:'spiral'};

function splitKind120(kind){
 const m=/^([a-z]+)_([mf])$/.exec(kind||'');
 return m?{sp:m[1],sex:m[2]}:null;
}
function applyDelta120(base,delta){
 if(typeof delta==='string')return delta;
 const out=[];let i=0;
 for(const op of delta){
  const tag=op[0],i1=op[1],i2=op[2],t=op[3];
  out.push(base.slice(i,i1));
  if(tag==='r'||tag==='i')out.push(t);
  i=i2;
 }
 out.push(base.slice(i));
 return out.join('');
}
function subst120(s,u){return s.replace(/@/g,u)}
function palDefs120(u,pal){
 let d=`<radialGradient id="${u}L" cx="46%" cy="48%" r="70%"><stop offset="0" stop-color="#7A9A6A"/><stop offset=".35" stop-color="#3D6A62"/><stop offset="1" stop-color="#1A3A3A"/></radialGradient>`;
 const S=pal&&pal.S||['#FFF6D8','#E6B454','#855A00'];
 d+=`<radialGradient id="${u}S" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${S[0]}"/><stop offset=".45" stop-color="${S[1]}"/><stop offset="1" stop-color="${S[2]}"/></radialGradient>`;
 const H=pal&&pal.H||['#E6B454',.3];
 const hop=H[1]==null?.3:H[1];
 d+=`<radialGradient id="${u}H" cx="50%" cy="55%" r="52%"><stop offset="0" stop-color="${H[0]}" stop-opacity="${hop}"/><stop offset="1" stop-color="${H[0]}" stop-opacity="0"/></radialGradient>`;
 if(pal&&pal.Lb){
  d+=`<radialGradient id="${u}Lb" cx="50%" cy="50%" r="50%">`;
  for(const st of pal.Lb){d+=`<stop offset="${st[0]}" stop-color="${st[1]}"`+(st[2]?` stop-opacity="${st[2]}"`:'')+'/>'}
  d+='</radialGradient>';
 }
 return d;
}
function F120(n,p){p=p==null?1:p;if(typeof n==='number'&&n===Math.floor(n)&&isFinite(n))return String(n);let s=Number(n).toFixed(p).replace(/\.?0+$/,'');if(s==='-0')s='0';if(s.slice(0,2)==='0.')s=s.slice(1);else if(s.slice(0,3)==='-0.')s='-.'+s.slice(3);return s}
function lantern120(x,y,s){s=s==null?1.55:s;const bw=9*s,bh=12*s,sw=Math.max(2,2.1*s);return `<ellipse cx="${F120(x)}" cy="${F120(y)}" rx="${F120(bw*.9)}" ry="${F120(bh*.85)}" fill="#E6B454" opacity=".28"/><rect x="${F120(x-bw/2)}" y="${F120(y-bh/2)}" width="${F120(bw)}" height="${F120(bh)}" rx="${F120(1.8*s)}" fill="#E6B454" stroke="#72583F" stroke-width="${F120(sw)}"/><rect x="${F120(x-bw/2)}" y="${F120(y-bh/2)}" width="${F120(bw)}" height="${F120(2.6*s)}" rx="${F120(1.2*s)}" fill="#855A00"/><ellipse cx="${F120(x)}" cy="${F120(y+.8*s)}" rx="${F120(2.4*s)}" ry="${F120(3.4*s)}" fill="#FFF6D8"/><ellipse cx="${F120(x)}" cy="${F120(y+.2*s)}" rx="${F120(1.1*s)}" ry="${F120(1.5*s)}" fill="#FFFFFF" opacity=".7"/>`}
function spark120(x0,y0,x1,y1){return `<path class="il-sp" d="M${F120(x0)} ${F120(y0)}L${F120(x1)} ${F120(y1)}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round"/>`}
function dots120(pts,op){const d=pts.map(p=>`M${F120(p[0])} ${F120(p[1])}h0`).join(' ');return `<path d="${d}" fill="none" stroke="#FFF6D8" stroke-width="2.2" stroke-linecap="round" opacity="${op||'.5'}"/>`}
function softStars120(seed){
 // Anonymous glow dots only — not a named constellation.
 const g=137.508*Math.PI/180,pts=[];
 for(let i=0;i<6;i++){
  const a=(i+seed)*g,r=28+((i*17+seed*3)%13);
  pts.push([100+r*Math.cos(a)*0.85, 86+r*Math.sin(a)*0.45]);
 }
 return pts;
}
function markCore120(body){
 // Add the shared breath class to the amber core (the non-ground S-paint).
 return body.replace(/<ellipse cx=["']([^"']+)["'] cy=["']([^"']+)["'] rx=["']([^"']+)["'] ry=["']([^"']+)["'] fill=["']url\(#([A-Za-z0-9]+)S\)["']/,
  function(m,cx,cy,rx,ry,id){
   if(cy==='184')return m;
   return `<ellipse class="il-c" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}S)"`;
  });
}
function coreAt120(body){
 const m=body.match(/<ellipse class="il-c" cx=["']([^"']+)["'] cy=["']([^"']+)["'] rx=["']([^"']+)["'] ry=["']([^"']+)["']/);
 if(!m){
  const n=body.match(/<ellipse cx=["']([^"']+)["'] cy=["']([^"']+)["'] rx=["']([^"']+)["'] ry=["']([^"']+)["'] fill=["']url\(#\w+S\)["']/);
  if(n&&n[2]!=='184')return [+n[1],+n[2],+n[3],+n[4]];
  return [100,132,6,5];
 }
 return [+m[1],+m[2],+m[3],+m[4]];
}
function fadePat120(body,pat){
 const op=pat<=0?.28:pat===1?.65:1;
 if(op===1)return body;
 return body.replace(/<g fill=['"]none['"] stroke-linecap=['"]round['"]/,'<g fill="none" stroke-linecap="round" opacity="'+op+'"');
}

function artExtra120(kind,stage,opt){
 opt=opt||{};
 const parts=splitKind120(kind);
 if(!parts||!D120.sp[parts.sp])return '';
 const rec=D120.sp[parts.sp];
 const phase=(typeof IL119==='object'&&IL119.phase)?IL119.phase(stage):(Number(stage)<=1?'hatchling':Number(stage)===2?'young':Number(stage)<=4?'grown':'wise');
 const st=(D120.stages&&D120.stages[phase])||{s:1,pat:2,lantern:0};
 const u=uid120();
 let body=rec.sil;
 if(parts.sex!==rec.base)body=applyDelta120(rec.sil,rec.delta);
 body=subst120(body,u);
 body=markCore120(body);
 body=fadePat120(body,st.pat);
 const look=opt.look||(typeof IL119==='object'&&IL119.defaultLook&&IL119.defaultLook())||'inner';
 const pattern=opt.pattern||rec.pat||PAT120[parts.sp]||'hex';
 const defs=palDefs120(u,rec.pal);
 const halo=`<ellipse class="il-h" cx="100" cy="122" rx="88" ry="66" fill="url(#${u}H)"/><ellipse class="il-h" cx="100" cy="122" rx="62" ry="46" fill="${(rec.pal&&rec.pal.H&&rec.pal.H[0])||'#E6B454'}" opacity=".14"/>`;
 const ground=`<ellipse cx="100" cy="184" rx="48" ry="6" fill="url(#${u}S)" opacity=".3"/>`;
 const [cx,cy,rx]=coreAt120(body);
 const spark=spark120(cx,cy,cx+Math.max(10,rx*2.2),cy-rx*0.4);
 let fig=body+spark;
 if(st.lantern)fig+=lantern120(28,166,1.55);
 if(st.const)fig+=dots120(softStars120(EXTRA_SP120.indexOf(parts.sp)+1),'.48');
 const sc=st.s==null?1:st.s;
 const scaled=sc===1?halo+fig:halo+`<g transform="translate(100 172) scale(${F120(sc,2)}) translate(-100 -172)">${fig}</g>`;
 try{if(typeof IL119==='object'&&typeof IL119.css==='function')IL119.css()}catch(e){}
 return `<g class="il119 il120" data-il-kind="${kind}" data-il-stage="${phase}" data-il-look="${look}" data-il-pattern="${pattern}" data-il-sex="${parts.sex}" transform="scale(.5)"><defs>${defs}</defs>${ground}${scaled}</g>`;
}

function fixOwlBelly120(svg,stage){
 if(!svg)return svg;
 const phase=(typeof IL119==='object'&&IL119.phase)?IL119.phase(stage):'';
 // Keep dots starting at n=4; enlarge the belly so the n=15 center stays inside the clip.
 if(phase==='young')return svg.replace(/cx="100" cy="148" rx="27" ry="18"/g,'cx="100" cy="148" rx="30" ry="20"');
 if(phase==='grown'||phase==='wise')return svg.replace(/cx="100" cy="148" rx="30" ry="20"/g,'cx="100" cy="148" rx="31" ry="21"');
 return svg;
}

function phrase120(sp,sex){
 const nm=NAMES120[sp];if(!nm)return '';
 const t=typeof gT==='function'?gT:s=>s;
 const who=t(sex==='m'?'boy':'girl');
 return t('{name}, {who}',{name:t(nm.en),who});
}


/* ---- Lamp Inner light form (compact 448 B data + rosette generator) ---- */
const LAMP120={"accent":"#D4A060","sig":"rosette+face","pattern":"rosette","flame":"M0 8c6 0 8-8 4-14c-2-3-4-6-4-10c0 4-2 7-4 10c-4 6-2 14 4 14Z","stages":{"hatchling":{"kind":"ember","r":30,"core":9,"rosette":[6,1],"face":0.78},"young":{"kind":"vessel","rx":28,"ry":32,"rosette":[6,1],"face":0.9},"grown":{"kind":"lantern","box":[52,58,12],"rosette":[8,1],"face":0.82},"wise":{"kind":"lantern","box":[52,58,12],"rosette":[8,2],"face":0.82,"motes":5}}};
function lampPal120(){
 try{if(typeof lampFlamePal81==='function')return lampFlamePal81(typeof FLAME_CTX81!=='undefined'?FLAME_CTX81:undefined)}catch(e){}
 try{if(typeof lampPal101==='function')return lampPal101()}catch(e){}
 return {mid:'#E6B454',core:'#FFE4A4',tip:'#FFF6D8',deep:'#855A00',halo:'#E6B454'};
}
function rosette120(cx,cy,r,n,rings,col,sw,op){
 n=Math.max(3,n|0);rings=Math.max(1,Math.min(rings|0,2));
 const parts=[`<circle cx="${F120(cx)}" cy="${F120(cy)}" r="${F120(r*.34)}" fill="none"/>`];
 for(let ring=1;ring<=rings;ring++){
  const cr=r*(rings===1?.48:.36*ring),pr=cr;
  for(let i=0;i<n;i++){
   const a=2*Math.PI*i/n-Math.PI/2;
   parts.push(`<circle cx="${F120(cx+cr*Math.cos(a))}" cy="${F120(cy+cr*Math.sin(a))}" r="${F120(pr)}" fill="none"/>`);
  }
 }
 parts.push(`<circle cx="${F120(cx)}" cy="${F120(cy)}" r="${F120(r)}" fill="none"/>`);
 return `<g class="il-fine" fill="none" stroke="${col}" stroke-width="${F120(sw,2)}" opacity="${F120(op,2)}">${parts.join('')}</g>`;
}
function tinyFace120(cx,cy,s){
 s=s==null?.85:s;const r=2.5*s,lx=cx-5.2*s,rx=cx+5.2*s,sy=cy+6.2*s,sw=8.5*s,mid=(lx+rx)/2;
 let p='';
 for(const [x,y] of [[lx,cy],[rx,cy]]){
  p+=`<circle cx="${F120(x)}" cy="${F120(y)}" r="${F120(r)}" fill="#72583F"/><circle cx="${F120(x-r*.28)}" cy="${F120(y-r*.38)}" r="${F120(r*.34)}" fill="#FFF6D8"/>`;
 }
 const br=Math.max(2.4,Math.min(5.2,r*.96)),by=cy+r*1.05;
 p+=`<ellipse cx="${F120(lx-r*.85)}" cy="${F120(by)}" rx="${F120(br)}" ry="${F120(br*.62)}" fill="#C47A6A" opacity=".32"/><ellipse cx="${F120(rx+r*.85)}" cy="${F120(by)}" rx="${F120(br)}" ry="${F120(br*.62)}" fill="#C47A6A" opacity=".32"/>`;
 p+=`<path d="M${F120(mid-sw/2)} ${F120(sy)}c${F120(sw*.28)} ${F120(sw*.28)} ${F120(sw*.72)} ${F120(sw*.28)} ${F120(sw)} 0" fill="none" stroke="#72583F" stroke-width="1.1" stroke-linecap="round"/>`;
 return p;
}
function core120(x,y,rx,ry,u){const r=(rx+ry)*.56;return `<circle class="il-c" cx="${F120(x)}" cy="${F120(y)}" r="${F120(r)}" fill="url(#${u}S)"/><circle cx="${F120(x)}" cy="${F120(y)}" r="${F120(r*.22)}" fill="#FFF6D8" opacity=".92"/>`}
function lampDefs120(u,pal,hop){
 hop=hop==null?'.28':hop;
 const tip=pal.tip||'#FFF6D8',mid=pal.mid||'#E6B454',deep=pal.deep||'#855A00',halo=pal.halo||mid;
 return `<radialGradient id="${u}L" cx="36%" cy="32%" r="78%"><stop offset="0" stop-color="#7A9A6A"/><stop offset="1" stop-color="#1A3A3A"/></radialGradient><radialGradient id="${u}S" cx="40%" cy="40%" r="60%"><stop offset="0" stop-color="${tip}"/><stop offset=".45" stop-color="${mid}"/><stop offset="1" stop-color="${deep}"/></radialGradient><radialGradient id="${u}H" cx="50%" cy="55%" r="52%"><stop offset="0" stop-color="${halo}" stop-opacity="${hop}"/><stop offset="1" stop-color="${halo}" stop-opacity="0"/></radialGradient><path id="${u}F" d="${LAMP120.flame}" fill="url(#${u}S)" stroke="#72583F" stroke-width="1.2" stroke-linejoin="round"/>`;
}
function artLamp120(stage,opt){
 opt=opt||{};
 const phase=(typeof IL119==='object'&&IL119.phase)?IL119.phase(stage):(Number(stage)<=1?'hatchling':Number(stage)===2?'young':Number(stage)<=4?'grown':'wise');
 const g=LAMP120.stages[phase]||LAMP120.stages.grown;
 const pal=lampPal120(),u=uid120(),honey=LAMP120.accent,deep=pal.deep||'#855A00',roseCol=pal.mid||'#E6B454';
 const look=opt.look||(typeof IL119==='object'&&IL119.defaultLook&&IL119.defaultLook())||'inner';
 const pattern=opt.pattern||'rosette';
 const hop=phase==='wise'?'.34':'.28';
 let defs=lampDefs120(u,pal,hop);
 let body='';
 const [rn,rr]=g.rosette||[6,1];
 if(g.kind==='ember'){
  defs+=`<clipPath id="${u}E"><circle cx="100" cy="128" r="30"/></clipPath>`;
  body+=`<ellipse class="il-h" cx="100" cy="132" rx="64" ry="50" fill="url(#${u}H)"/><ellipse class="il-h" cx="100" cy="132" rx="44.8" ry="35" fill="${honey}" opacity=".14"/><ellipse cx="100" cy="184" rx="44" ry="6" fill="url(#${u}S)" opacity=".22"/>`;
  const rose=pattern==='rosette'||!pattern?rosette120(100,128,22,rn,rr,roseCol,1.3,.55):'';
  body+=`<circle cx="100" cy="128" r="30" fill="url(#${u}L)" stroke="#72583F" stroke-width="2"/><circle cx="100" cy="128" r="26.5" fill="none" stroke="#163333" stroke-width="1.5" opacity=".65"/><ellipse cx="90" cy="116" rx="10" ry="8" fill="#FFF6D8" opacity=".22"/><g clip-path="url(#${u}E)">${rose}${core120(100,122,9,9,u)}</g>${spark120(100,118,100,100)}${tinyFace120(100,140,g.face)}`;
 }else if(g.kind==='vessel'){
  defs+=`<clipPath id="${u}E"><ellipse cx="100" cy="138" rx="28" ry="32"/></clipPath>`;
  body+=`<ellipse class="il-h" cx="100" cy="132" rx="70" ry="54" fill="url(#${u}H)"/><ellipse class="il-h" cx="100" cy="132" rx="49" ry="37.8" fill="${honey}" opacity=".14"/><ellipse cx="100" cy="184" rx="46" ry="6" fill="url(#${u}S)" opacity=".24"/>`;
  const rose=pattern==='rosette'||!pattern?rosette120(100,138,22,rn,rr,roseCol,1.3,.55):'';
  body+=`<ellipse cx="100" cy="168" rx="26" ry="6" fill="${deep}" stroke="#72583F" stroke-width="1.3"/><ellipse cx="100" cy="138" rx="28" ry="32" fill="url(#${u}L)" stroke="#72583F" stroke-width="2.1"/><ellipse cx="100" cy="138" rx="24" ry="28" fill="none" stroke="#163333" stroke-width="1.4" opacity=".65"/><ellipse cx="90" cy="124" rx="9" ry="8" fill="#FFF6D8" opacity=".2"/><g clip-path="url(#${u}E)">${rose}<use href="#${u}F" transform="translate(100 126) scale(1.05)"/>${core120(100,124,5,5,u)}</g>${spark120(100,118,100,102)}${tinyFace120(100,150,g.face)}`;
 }else{
  const gop=phase==='wise'?'.32':'.28';
  defs+=`<clipPath id="${u}E"><rect x="80" y="104" width="40" height="42" rx="8"/></clipPath>`;
  body+=`<ellipse class="il-h" cx="100" cy="124" rx="84" ry="66" fill="url(#${u}H)"/><ellipse class="il-h" cx="100" cy="124" rx="58.8" ry="46.2" fill="${honey}" opacity=".14"/><ellipse cx="100" cy="184" rx="50" ry="6" fill="url(#${u}S)" opacity="${gop}"/>`;
  body+=`<path d="M80 90Q100 66 120 90" fill="none" stroke="#72583F" stroke-width="3.4" stroke-linecap="round"/>`;
  const rose=pattern==='rosette'||!pattern?rosette120(100,126,16,rn,rr,roseCol,1.25,.6):'';
  body+=`<ellipse cx="100" cy="96" rx="26" ry="8" fill="${deep}" stroke="#72583F" stroke-width="1.6"/><rect x="74" y="96" width="52" height="58" rx="12" fill="url(#${u}L)" stroke="#72583F" stroke-width="2.1"/><rect x="80" y="104" width="40" height="42" rx="8" fill="#163333" opacity=".28"/><ellipse cx="92" cy="114" rx="10" ry="8" fill="#FFF6D8" opacity=".2"/><g clip-path="url(#${u}E)">${rose}<use href="#${u}F" transform="translate(100 122) scale(1.2)"/>${core120(100,120,6,6,u)}</g>${spark120(100,110,100,92)}<ellipse cx="100" cy="156" rx="24" ry="7" fill="${deep}" stroke="#72583F" stroke-width="1.5"/>${tinyFace120(100,146,g.face)}`;
  if(g.motes)body+=`<path class="il-fine" d="M64 108h0 M70 86h0 M130 86h0 M136 108h0 M100 72h0" fill="none" stroke="${pal.tip||'#FFF6D8'}" stroke-width="2.2" stroke-linecap="round" opacity=".46"/>`;
 }
 try{if(typeof IL119==='object'&&typeof IL119.css==='function')IL119.css()}catch(e){}
 return `<g class="il119 il120" data-il-kind="lamp" data-il-stage="${phase}" data-il-look="${look}" data-il-pattern="${pattern}" transform="scale(.5)"><defs>${defs}</defs>${body}</g>`;
}

/* ---- register 18 extras, persist their growth, leave the original six as they are ---- */
if(typeof FRIENDS101!=='undefined'){
 EXTRA_IDS120.forEach(k=>{if(FRIENDS101.indexOf(k)<0)FRIENDS101.push(k)});
}
{const prev=typeof friendsLoad101==='function'?friendsLoad101:null;
 friendsLoad101=function(pid){
  const f=prev?prev(pid):{active:'lamp',offered:false};
  const id=pid||(typeof curPid==='function'?curPid():'');
  const raw=(typeof RAW!=='undefined'&&typeof safeJSON==='function')?safeJSON(RAW.get('lamp_friends101@'+id),null):null;
  const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
  EXTRA_IDS120.forEach(k=>{f[k]=norm(raw&&typeof raw==='object'?raw[k]:null)});
  if(raw&&typeof raw==='object'&&typeof FRIENDS101!=='undefined'&&FRIENDS101.includes(raw.active))f.active=raw.active;
  return f;
 };
}
{const prev=typeof friendsPut101==='function'?friendsPut101:null;
 friendsPut101=function(f,pid){
  if(prev)prev(f,pid);
  const id=pid||(typeof curPid==='function'?curPid():'');
  if(typeof getProfiles==='function'&&!getProfiles().list.some(p=>p.id===id))return;
  if(typeof RAW==='undefined'||typeof safeJSON!=='function')return;
  const cur=safeJSON(RAW.get('lamp_friends101@'+id),null)||{};
  const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
  EXTRA_IDS120.forEach(k=>{cur[k]=norm(f&&f[k])});
  if(typeof FRIENDS101!=='undefined'&&FRIENDS101.includes(f&&f.active))cur.active=f.active;
  RAW.set('lamp_friends101@'+id,JSON.stringify(cur));
 };
}
{const prev=typeof friendKindName101==='function'?friendKindName101:null;
 friendKindName101=function(kind){
  const p=splitKind120(kind);
  if(p&&NAMES120[p.sp])return phrase120(p.sp,p.sex);
  return prev?prev(kind):kind;
 };
}
{const prev=typeof friendState101==='function'?friendState101:null;
 friendState101=function(kind,pid){
  if(EXTRA_SET120.has(kind)){
   const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
   return norm(friendsLoad101(pid)[kind]);
  }
  return prev?prev(kind,pid):null;
 };
}
{const prev=typeof friendArtInner101==='function'?friendArtInner101:null;
 friendArtInner101=function(id,stage){
  if(id==='lamp')return artLamp120(stage);
  if(EXTRA_SET120.has(id))return artExtra120(id,stage);
  const html=prev?prev(id,stage):'';
  if((id==='owl'||id==='Owl')&&html)return fixOwlBelly120(html,stage);
  return html;
 };
}
{const prev=typeof IL119==='object'&&IL119.defaultPattern;
 if(typeof IL119==='object'){
  IL119.defaultPattern=function(kind){
   if(kind==='lamp')return 'rosette';
   const p=splitKind120(kind);
   if(p&&PAT120[p.sp])return PAT120[p.sp];
   return prev?prev(kind):'hex';
  };
  if(IL119.patterns&&!IL119.patterns.rosette)IL119.patterns.rosette=function(ctx){
   const n=ctx.folds||(ctx.phase==='wise'||ctx.phase==='grown'?8:6);
   const rings=ctx.rings||(ctx.phase==='wise'?2:1);
   const r=ctx.r||16,sw=ctx.sw||1.25,op=ctx.op||.6;
   return {def:'',body:rosette120(ctx.cx,ctx.cy,r,n,rings,ctx.color||'#E6B454',sw,op)};
  };
  const prevArt=IL119.art;
  IL119.art=function(kind,stage,opt){
   if(kind==='lamp')return artLamp120(stage,opt);
   if(EXTRA_SET120.has(kind))return artExtra120(kind,stage,opt);
   const html=prevArt?prevArt(kind,stage,opt):'';
   if(kind==='owl')return fixOwlBelly120(html,stage);
   return html;
  };
  const prevKind=IL119.kind;
  IL119.kind=function(k){return EXTRA_SET120.has(k)?k:(prevKind?prevKind(k):k)};
 }
}

/* First-offer stays a short list; all 18 are already in Kids, open from the start. */
{const prev=typeof friendOfferHTML111==='function'?friendOfferHTML111:null;
 if(prev||typeof friendOfferMaybe101==='function'){
  friendOfferHTML111=function(){
   const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
   return `<p class="kline">${e(t('A Moth, an Owl, a Turtle named Shell, a Dragon, a Phoenix, and more friends would like to sit with you, if you want. You can pick one, or keep your Lamp. More friends are waiting in Kids, and you can change anytime there.'))}</p>
<div class="row101">
<button type="button" class="p" data-pick="moth">${e(t('Moth'))}</button>
<button type="button" class="p" data-pick="owl">${e(t('Owl'))}</button>
<button type="button" class="p" data-pick="turtle">${e(t('Shell'))}</button>
<button type="button" class="p" data-pick="dragon">${e(t('Dragon'))}</button>
<button type="button" class="p" data-pick="phoenix">${e(t('Phoenix'))}</button>
<button type="button" data-pick="lamp">${e(t('Keep the Lamp'))}</button>
</div>`;
  };
 }
}
{const prevMount=typeof lampMountAll73==='function'?lampMountAll73:null;
 // Grown-ups line about who can sit with a child — keep it true now that more friends exist.
 const prevRA=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prevRA==='function'){
  renderAdults=function(){
   const r=prevRA.apply(this,arguments);
   try{
    const adults=typeof $==='function'?$('adults'):document.getElementById('adults');
    if(adults){
     adults.querySelectorAll('p').forEach(p=>{
      const tx=p.textContent||'';
      if(/a Turtle named Shell, a Dragon, and a Phoenix can sit|una tortuga llamada Concha, un Dragón y un Fénix/.test(tx)){
       p.textContent=gT('A Moth, an Owl, a Turtle named Shell, a Dragon, a Phoenix, and more Inner light friends can sit with them too. Only the one who is with them grows; the others rest and keep what they have. You can change anytime in Kids.');
      }
     });
     const credit=adults.querySelector('[data-il-credit119] p, [data-il-credit119]');
     if(credit&&!adults.querySelector('[data-il-credit120]')){
      const host=adults.querySelector('[data-il-credit119]')||credit;
      host.insertAdjacentHTML('beforeend',`<p class="soft" data-il-credit120="1">${gT('The Lamp\'s Inner light form, and the other Inner light friends, are original pictures, drawn from code, in the same style. Name meanings inspired the friends; no names or personal data are in the app.')}</p>`);
     }
    }
   }catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 const prevRO=typeof renderAbout==='function'?renderAbout:(typeof RENDER==='object'&&RENDER.about);
 if(typeof prevRO==='function'){
  renderAbout=function(){
   const r=prevRO.apply(this,arguments);
   try{
    const about=typeof $==='function'?$('about'):document.getElementById('about');
    if(about&&!about.querySelector('[data-il-credit120]')){
     const host=about.querySelector('[data-il-credit119]')||about.querySelector('.card:last-child')||about;
     host.insertAdjacentHTML('beforeend',`<p class="soft" data-il-credit120="1">${gT('The Lamp\'s Inner light form, and the other Inner light friends, are original pictures, drawn from code, in the same style. Name meanings inspired the friends; no names or personal data are in the app.')}</p>`);
    }
   }catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.about=renderAbout;
 }
}

// Picker tiles stay readable with the longer names.
if(typeof document!=='undefined'&&!document.getElementById('il120css')){
 const s=document.createElement('style');s.id='il120css';
 s.textContent='.friendPick101 button{max-width:148px;text-align:center}.friendPick101 button .kline{font-size:.92em;line-height:1.15;text-wrap:balance}svg.il-sm .il-fine{display:none}@media(max-width:72px){.il-fine{display:none}}';
 (document.documentElement||document.head).appendChild(s);
}

window.IL120={
 art:artExtra120,lamp:artLamp120,rosette:rosette120,ids:EXTRA_IDS120.slice(),species:EXTRA_SP120.slice(),
 names:NAMES120,patterns:PAT120,data:D120,lampData:LAMP120,applyDelta:applyDelta120,
 phrase:phrase120
};
})();
/* v121: even companion picker grid, and a gentle first-offer line to Kids. UI only. */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('il121css')){
 const s=document.createElement('style');s.id='il121css';
 s.textContent=[
  '[data-friends101]{container-type:inline-size;width:100%;box-sizing:border-box}',
  '.friendPick101{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;justify-content:stretch;width:100%;margin:12px 0;box-sizing:border-box}',
  '@container (min-width:560px){.friendPick101{grid-template-columns:repeat(4,minmax(0,1fr))}}',
  '@supports not (container-type:inline-size){@media (min-width:720px){.friendPick101{grid-template-columns:repeat(4,minmax(0,1fr))}}}',
  '.friendPick101 button{min-width:0!important;max-width:none!important;width:100%;box-sizing:border-box;min-height:44px;text-align:center}',
  '.friendPick101 button .kline{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;text-overflow:ellipsis;text-wrap:wrap;overflow-wrap:break-word;word-break:break-word;line-height:1.2;max-height:2.4em;width:100%;font-size:.92em;text-align:center}',
  '.friendPick101 .lamp73-svg,.friendPick101 svg{width:88px;height:88px;max-width:100%;flex:none}',
  '.friendOffer101 p.soft[data-offer-more121]{margin:.85rem 0 0}',
  '.friendOfferKids121{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:.45rem .9rem;border:0;background:transparent;color:inherit;font:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px;border-radius:16px;cursor:pointer}',
  '.friendOfferKids121:focus-visible{outline:2px solid var(--acc,#c9a45e);outline-offset:2px}'
 ].join('');
 (document.documentElement||document.head).appendChild(s);
}

function offerKidsLabel121(){
 const t=typeof gT==='function'?gT:s=>s;
 return t('More friends in {section}',{section:t('Kids')});
}

if(typeof friendOfferHTML111==='function'||typeof friendOfferMaybe101==='function'){
 friendOfferHTML111=function(){
  const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
  return `<p class="kline">${e(t('A Moth, an Owl, a Turtle named Shell, a Dragon, and a Phoenix would like to sit with you, if you want. You can pick one, or keep your Lamp.'))}</p>
<div class="row101">
<button type="button" class="p" data-pick="moth">${e(t('Moth'))}</button>
<button type="button" class="p" data-pick="owl">${e(t('Owl'))}</button>
<button type="button" class="p" data-pick="turtle">${e(t('Shell'))}</button>
<button type="button" class="p" data-pick="dragon">${e(t('Dragon'))}</button>
<button type="button" class="p" data-pick="phoenix">${e(t('Phoenix'))}</button>
<button type="button" data-pick="lamp">${e(t('Keep the Lamp'))}</button>
</div>
<p class="soft" data-offer-more121="1"><button type="button" class="friendOfferKids121" data-offer-kids121="1">${e(offerKidsLabel121())}</button></p>`;
 };
}

{const prev=typeof friendOfferMaybe101==='function'?friendOfferMaybe101:null;
 if(prev){
  friendOfferMaybe101=function(){
   prev.apply(this,arguments);
   const d=document.querySelector('dialog.friendOffer101');
   const go=d&&d.querySelector('[data-offer-kids121]');
   if(!go||go._il121)return;
   go._il121=1;
   go.onclick=function(){
    try{if(d.open)d.close()}catch(e){}
    d.remove();
    if(typeof lampMountAll73==='function')lampMountAll73();
    if(typeof friendLine101==='function')friendLine101();
    const pid=typeof curPid==='function'?curPid():'';
    if(typeof show==='function')show('kids');
    if(typeof editP==='function')editP(pid);
    const form=typeof $==='function'?$('pform'):document.getElementById('pform');
    if(form&&form.scrollIntoView)form.scrollIntoView({block:'start'});
   };
  };
 }
}

window.IL121={offerKidsLabel:offerKidsLabel121};
})();
// SPDX-License-Identifier: GPL-3.0-or-later
/* v122: Grown-ups Licenses section; license files are same-origin and offline. */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('il122css')){
 const s=document.createElement('style');s.id='il122css';
 s.textContent='[data-licenses122] h3{margin:.2rem 0 .5rem;font-size:1.05rem}[data-licenses122] a{color:inherit;font-weight:700;text-underline-offset:3px}[data-licenses122] a{display:inline-flex;align-items:center;min-height:44px;padding:0 .15rem}';
 (document.documentElement||document.head).appendChild(s);
}

function licensesHTML122(){
 const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
 return `<div class="card" data-licenses122="1"><h3 class="kline">${e(t('Licenses'))}</h3><p class="soft">${e(t('The app\'s code is licensed under GPL-3.0. The original stories, art, and lessons are licensed under CC BY-SA 4.0. Some pictures and data keep their own licenses, shown with the credits already in the app.'))}</p><p class="soft"><a href="LICENSES.md">${e(t('License map'))}</a> · <a href="LICENSE">${e(t('GPL-3.0'))}</a> · <a href="LICENSE-CONTENT">${e(t('CC BY-SA 4.0'))}</a></p></div>`;
}

function licensesAttach122(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root||root.querySelector('[data-licenses122]'))return;
 root.insertAdjacentHTML('beforeend',licensesHTML122());
}

{const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{licensesAttach122()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}

window.IL122={html:licensesHTML122,attach:licensesAttach122};
})();
// SPDX-License-Identifier: GPL-3.0-or-later
/* v123: Lamp tune — Norma, readable motes, and the five effects. */
(function(){
'use strict';
const CSS123="/* lamp_effects.css \u2014 tune the five post-v83 Lamp effects for the Inner light glass Lamp.\n *\n * WHERE THIS GOES\n * ---------------\n * The live CSS is injected by v89.js as <style id=\"v89css\">, currently lines 445\u2013553\n * of /workspace/reading-app/v89.js (commit 4b008d9). v111.js then overrides some\n * durations and adds a soft core in starCss111(), lines 498\u2013505, and lampFxCss111()\n * (lines 846\u2013898) is the everyday breath \u2014 leave that everyday breath alone.\n *\n * Builder: APPEND THIS FILE AFTER v89 (e.g. a later <style id=\"v121fx\">),\n * or fold the blocks into a new v121.js that loads after v89. This is\n * required so the hottest-point rule overrides the old white core in v89\n * (.fx89-ed:nth-child(3){fill:#fff}). Do not delete the picker / tray rules.\n *\n * REQUIRED JS: recipe_lamp_tune.js is not optional. It replaces:\n *   lampFxSpiralSVG89   v89.js:55\u201367, already wrapped by v111.js:443\u2013457\n *     \u2014 8 cool bold dots in a ring, fine seeds classed il-fine/fx-fine so\n *       the 44 px hide applies, and a dark gap around the lantern.\n *   lampFxEmberSVG89    v89.js:68\u201378, already wrapped by v111.js:468\u2013480\n *     \u2014 vertical rising paths; the live v89 path climbs the old centreline\n *       and crosses the new mote crown and Norma. Pass still=true under\n *       reduce: CSS animation:none does not stop SMIL animateMotion.\n *   lampFxLayerHTML89   v89.js:83\u201388, already wrapped by v111.js:459\u2013466\n *\n * REQUIRED HTML for Comb jelly: a descendant of .lamp73-shell must have\n * data-il-kind=\"lamp\" and data-il-stage=\"hatchling|young|grown|wise\"\n * (the SVG root is the natural place). Without it, :has() never matches\n * and the jelly clip stays on the old clay pane (25%/21%/50%\u00d760% vs the\n * glass window 40%/52%/20%\u00d721%).\n *\n * WHAT CHANGED\n * ------------\n * Geometry is recalibrated to the Inner light glass Lamp (data-il-kind=\"lamp\"),\n * whose flame sits at about 60% down a 100-viewBox (200-viewBox art at scale .5),\n * with the glass window at 40%, 52%, 20% \u00d7 21%. The clay-lantern fallbacks stay\n * for any leftover stage art.\n *\n * Motion is slower and gentler (cycles 8\u201324 s, amplitude about 1.00\u20131.05).\n * Nothing flashes, and nothing is above 3 flashes/sec. Hottest points use\n * var(--f81-tip), never #fff. Under prefers-reduced-motion (and .still /\n * .reduce73): NO breathing, NO flashes, NO drift \u2014 a static mid glow only.\n * SVG animateMotion is not used when still=true (already true for reduced).\n *\n * At 44 px (svg.il-sm, or max-width 72 px): fine spiral seeds and ember tracks\n * hide; bold dots remain, sized \u22481.5 px or thicker. Jelly is a soft blurred\n * wash in the glass (the 9 px window cannot carry a fine ripple).\n */\n\n/* \u2014\u2014 geometry for the Inner light glass Lamp \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 */\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-shell,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-mid,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-hot,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx111-core-soft{\n  left:50%;\n  top:60%; /* flame at (100,120) in the 200 viewBox, after scale .5 */\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-shell,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-mid,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-hot{\n  top:61%;\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-shell,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-mid,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-hot{\n  top:62%;\n}\n\n/* Comb-jelly clip = the glass window, not the old 2\u00d72 clay panes. */\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"grown\"]) .fx89-jelly-clip,\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"wise\"]) .fx89-jelly-clip{\n  left:40%; top:52%; width:20%; height:21%;\n  border-radius:4px; /* rx=8 in 200 viewBox, after scale .5 */\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"hatchling\"]) .fx89-jelly-clip{\n  left:35%; top:49%; width:30%; height:30%; border-radius:50%;\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"][data-il-stage=\"young\"]) .fx89-jelly-clip{\n  left:36%; top:53%; width:28%; height:32%; border-radius:50%;\n}\n\n/* \u2014\u2014 shared breath: slow, gentle, one engine \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 */\n@keyframes fx89-breathe{\n  0%,100%{transform:translate(-50%,-50%) scale(1); opacity:.82}\n  50%{transform:translate(-50%,-50%) scale(1.05); opacity:1}\n}\n@keyframes fx89-hot{\n  0%,100%{transform:translate(-50%,-50%) scale(.97); opacity:.9}\n  50%{transform:translate(-50%,-50%) scale(1.05); opacity:1}\n}\n\n/* Bright core: slower than v89's 7s, calmer amplitude. v111 already set\n   shell 16s / mid 13s / hot 11s \u2014 keep those, just soften the keyframes. */\n.fx89-shell,.fx111-shell{animation:fx89-breathe 16s ease-in-out infinite}\n.fx89-mid,.fx111-mid{animation:fx89-breathe 13s ease-in-out infinite reverse}\n.fx89-hot,.fx111-hot,.fx89-flame{animation:fx89-hot 11s ease-in-out infinite}\n.fx111-core-soft{animation:fx89-breathe 18s ease-in-out infinite}\n\n/* Hottest point is the glow tip, never white. */\n.fx89-hot,.fx89-flame{\n  background:radial-gradient(ellipse at 50% 42%,\n    var(--f81-tip,#fbdcad) 0%,\n    var(--f81-tip,#fbdcad) 22%,\n    color-mix(in oklab,var(--f81-core,#efba64) 80%,transparent) 58%,\n    transparent 76%);\n}\n.fx89-ed:nth-child(3){fill:var(--f81-tip,#fbdcad)} /* was #fff */\n\n/* Sleeping spiral: keep v111's 140 s turn; a still spiral is just the dots.\n   Geometry (8 cool bold dots in a ring, \u22658 viewBox-unit dark gap, fine seeds\n   classed il-fine/fx-fine) is in recipe_lamp_tune.js \u2014 that JS is required. */\n.fx89-spiral.awake:not(.still),.fx111-spiral.awake:not(.still){\n  animation:fx89-spin 140s linear infinite 8.5s\n}\n\n/* Comb jelly: slow 24 s (already in v111). On the glass Lamp the 9 px window\n   cannot carry a fine ripple, so the bands are thicker, blurred, and read as\n   a soft iridescent wash \u2014 not a flag. The one-shot \"up\" swell is 5 s\n   (was 3.6 s), once, and is not played under reduced motion.\n   The review sheet shows overlapping ellipses as the intended look; this CSS\n   gets the existing two-layer DOM as close as a stylesheet can. */\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-jelly-a,\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-jelly-b{\n  animation-duration:24s;\n  background-size:100% 36px;\n  filter:blur(2.4px);\n  opacity:.62;\n}\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx89-jelly-b{\n  filter:blur(3px) hue-rotate(28deg) saturate(.85);\n  opacity:.42;\n}\n.fx89-jelly-a,.fx89-jelly-b{\n  animation-duration:24s;\n  background-size:100% 28px;\n}\n@keyframes fx89-ripple{\n  0%,100%{background-position:0 -10px; opacity:.42}\n  50%{background-position:0 14px; opacity:.68}\n}\n.fx89-jelly-up .fx89-jelly-a,\n.fx89-jelly-up .fx89-jelly-b{animation:fx89-ripple-up 5s ease-in-out 1}\n@keyframes fx89-ripple-up{\n  0%{background-position:0 -16px; opacity:.3}\n  50%{background-position:0 12px; opacity:.72}\n  100%{background-position:0 20px; opacity:.5}\n}\n\n/* Smoke haze stays a soft static veil, behind the lantern, and a little\n   smaller so it does not blur the rim at 44 px. The review sheet also draws\n   a thin dusk separation just outside the ink. The canvas (when used) is\n   already skipped under reduced motion and on low-power.\n   Opacity is left to the existing rules, including reduced motion. */\n.lamp73-shell:has([data-il-kind=\"lamp\"]) .fx111-smoke-haze{\n  inset:10% 14%;\n  filter:blur(10px);\n}\n.fx111-smoke-haze{opacity:.4}\n\n/* Optional Moss Spark nudge \u2014 FLAME81 hex is unchanged. When Moss is bound,\n   mix cream into the hot point so the heart reads off the jade glass. */\n.lamp73-shell[data-glow=\"moss\"] .fx89-hot,\n.lamp73-shell[data-glow=\"moss\"] .fx89-flame,\n.lamp73-shell:has([data-flame=\"moss\"]) .fx89-hot,\n.lamp73-shell:has([data-flame=\"moss\"]) .fx89-flame{\n  background:radial-gradient(ellipse at 50% 42%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 0%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 22%,\n    color-mix(in oklab,var(--f81-core,#96d88f) 70%,transparent) 58%,\n    transparent 76%);\n}\n\n/* Picker previews: no cycle faster than 6 s. */\n.fx89-pv-core .fx89-pv-s{animation-duration:8s}\n.fx89-pv-core .fx89-pv-m{animation-duration:6.5s}\n.fx89-pv-ember path{animation-duration:8s}\n.fx89-pv-jelly .fx89-pv-rows{animation-duration:8s}\n.fx89-pv-smoke path{animation-duration:8s}\n\n/* \u2014\u2014 44 px: hide fine seeds, keep bold marks \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 */\nsvg.il-sm .il-fine,\nsvg.il-sm .fx-fine{display:none}\n@media (max-width:72px){\n  .il-fine,.fx-fine{display:none}\n  .fx89-jelly-a,.fx89-jelly-b{background-size:100% 40px; opacity:.7; filter:blur(2px)}\n}\n\n/* \u2014\u2014 reduced motion: static mid glow, no breath, no flashes \u2014\u2014\u2014 */\n@media (prefers-reduced-motion:reduce){\n  .fx89-spiral,.fx89-spiral.awake,.fx89-spiral.asleep,.fx111-spiral,\n  .fx89-shell,.fx89-mid,.fx89-hot,.fx89-flame,.fx111-shell,.fx111-mid,.fx111-hot,\n  .fx111-core-soft,.fx89-ed,.fx89-ember,.fx111-ember,\n  .fx89-jelly-a,.fx89-jelly-b,\n  .fx89-jelly-up .fx89-jelly-a,.fx89-jelly-up .fx89-jelly-b,\n  .fx89-pv-spiral,.fx89-pv-core .fx89-pv-s,.fx89-pv-core .fx89-pv-m,\n  .fx89-pv-ember path,.fx89-pv-jelly .fx89-pv-rows,.fx89-pv-smoke path,\n  .today64.fx89-swap .lamp76-hero{\n    animation:none!important;\n    transition:none!important;\n  }\n  .fx89-spiral,.fx89-spiral.awake,.fx89-spiral.asleep,.fx111-spiral{\n    transform:scale(1)!important;\n  }\n  .fx89-shell,.fx89-mid,.fx89-hot,.fx111-shell,.fx111-mid,.fx111-hot,\n  .fx111-core-soft{\n    opacity:.88;\n    transform:translate(-50%,-50%) scale(1)!important;\n  }\n  .fx89-jelly-a,.fx89-jelly-b{\n    opacity:.55;\n    background-position:0 10px;\n  }\n  .fx89-flame{opacity:.95}\n  .fx111-smoke-haze{opacity:.36}\n}\n/* Same still look when JS sets .still or .reduce73 (lampReduced73). */\n.fx89-layer.still .fx89-shell,\n.fx89-layer.still .fx89-mid,\n.fx89-layer.still .fx89-hot,\n.fx89-layer.still .fx89-flame,\n.fx89-layer.still .fx111-core-soft,\n.reduce73 .fx89-shell,.reduce73 .fx89-mid,.reduce73 .fx89-hot,\n.reduce73 .fx89-flame,.reduce73 .fx111-core-soft{\n  animation:none!important;\n  transform:translate(-50%,-50%) scale(1)!important;\n  opacity:.88;\n}\n.fx89-layer.still .fx89-jelly-a,\n.fx89-layer.still .fx89-jelly-b,\n.reduce73 .fx89-jelly-a,.reduce73 .fx89-jelly-b{\n  animation:none!important;\n  background-position:0 10px;\n  opacity:.55;\n}\n\n/* QA: in-app reduce must also stop the everyday Inner light breath and hide\n   the spark, so .reduce73 / .fx89-layer.still match OS prefers-reduced-motion\n   and lamp_reduced.png. The media-query block above is unchanged.\n   Pass still=true into the ember JS: CSS animation:none does not stop SMIL\n   animateMotion. */\n.reduce73 .il-h,\n.reduce73 .il-c,\n.fx89-layer.still .il-h,\n.fx89-layer.still .il-c{\n  animation:none!important;\n}\n.reduce73 .il-sp,\n.fx89-layer.still .il-sp{\n  animation:none!important;\n  opacity:0;\n}\n\n\n/* v123 extras: QA final notes \u2014 smoke behind the lantern, Bright core sized to the box,\n   Moss hook uses the live data-flame81 attribute, reduce73 on .lamp73-shell reaches .il-h. */\n.il-n{fill:none;stroke:#FFF6D8;stroke-linecap:round}\n.lamp73-shell>.lamp73-stage{position:relative;z-index:2}\n.lamp73-shell>.fx89-layer.fx89-smoke{z-index:0!important}\n.today64>.lamp76-hero>.fx89-layer.fx89-smoke{z-index:0}\n.today64>.lamp76-hero .lamp73-figure{position:relative;z-index:2}\n.lamp73-shell:has(.fx89-smoke) .lamp73-svg,\n.today64:has(.fx89-smoke) .lamp73-svg{\n  filter:drop-shadow(0 0 0.6px #120E18) drop-shadow(0 0 1.4px #120E18);\n}\n.lamp73-shell>.fx89-layer.fx89-core{z-index:0!important}\n.lamp73-shell>.fx89-layer.fx89-core,\n.lamp73-shell>.fx89-layer.fx89-core-flame{\n  inset:0!important;width:100%!important;height:100%!important;\n  left:auto!important;top:auto!important;right:auto!important;bottom:auto!important;\n  transform:none;\n}\n.today64>.lamp76-hero>.fx89-layer.fx89-core{\n  inset:0!important;width:100%!important;height:100%!important;\n  left:0!important;top:0!important;right:0!important;bottom:0!important;\n  transform:none!important;\n}\n.lamp73-shell .fx89-shell,.lamp73-shell .fx111-shell{width:110%;height:110%}\n.lamp73-shell .fx89-mid,.lamp73-shell .fx111-mid{width:72%;height:72%}\n.lamp73-shell .fx89-hot,.lamp73-shell .fx111-hot{width:36%;height:40%}\n.lamp73-shell .fx111-core-soft{width:120%;height:120%;filter:blur(10px)}\n.lamp73-shell:has([data-flame81=\"moss\"]) .fx89-hot,\n.lamp73-shell:has([data-flame81=\"moss\"]) .fx89-flame,\n.lamp73-shell[data-glow=\"moss\"] .fx89-hot,\n.lamp73-shell[data-glow=\"moss\"] .fx89-flame{\n  background:radial-gradient(ellipse at 50% 42%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 0%,\n    color-mix(in oklab,var(--f81-tip,#c8eec3) 60%,#FFF6D8) 22%,\n    color-mix(in oklab,var(--f81-core,#96d88f) 70%,transparent) 58%,\n    transparent 76%);\n}\n.lamp73-shell.reduce73 .il-h,\n.lamp73-shell.reduce73 .il-c{animation:none!important}\n.lamp73-shell.reduce73 .il-sp{animation:none!important;opacity:0}\n";

function lampWiseTouch120(pal){
  const tip=pal&&pal.tip||'#FFF6D8', core=pal&&pal.core||'#FFE4A4';
  // Two shoulder motes, full-size only (il-fine). Exact mirror about x=100.
  const fine='<path class="il-fine" d="M64 108h0 M136 108h0" fill="none" stroke="'+core+'" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>';
  // Three crown motes, always on, r=4–4.2 (≈1.75–1.85 px at 44). Warmer gold.
  const motes='<g fill="'+core+'"><circle cx="100" cy="72" r="4.2" opacity=".92"/><circle cx="70" cy="86" r="4" opacity=".86"/><circle cx="130" cy="86" r="4" opacity=".86"/></g>';
  // Norma, the Carpenter's Square. Official 4-star Stellarium figure, stylized placement.
  // Bold at 44 px: γ², ε, η (the L). δ and the lines are il-fine.
  const norma='<path class="il-n" d="M110 62h0M91 62h0M113 44h0" stroke-width="7" opacity=".8"/><path class="il-n il-fine" d="M113 44 110 62 91 62 87 34Z" stroke-width="1.2" opacity=".4"/>';
  return fine+motes+norma;
}
/* Credit (Grown-ups / About), next to the existing HYG credit from v111:
 *   EN: "Norma, the Carpenter's Square. " + STAR_CREDIT111
 *   ES: "Norma, la Escuadra de carpintero. " + STAR_CREDIT_ES111
 *   Plus: the square is turned so it reads above the lantern; it is not a real
 *   sky placement. From Cache County, Utah, Norma only peeks a hair above our
 *   southern horizon, too low to see — its highest star culminates only about 3° up.
 *
 * ================================================================
 * 2) EFFECT JS  —  REQUIRED. The live v89 / v111 generators must be replaced.
 *    Coordinates are in the 100-viewBox of the effect SVG (200-vb art / 2).
 * ================================================================
 *
 * Sleeping spiral — 8 cool bold dots circling in a ring, with a dark gap
 * around the lantern (≥4 units in this 100-vb, = 8 in the 200-vb art).
 * Fine seeds are classed fx-fine so the 44 px hide applies (svg.il-sm .fx-fine
 * and the existing @media). Cool fills so this is not mistaken for embers.
 */
function lampFxSpiralSVG121(asleep,still){
  const cool=['#E0ECF6','#D4E4F4','#C8D8E8'];
  // 8 bold pockets, clockwise from top-right; exact mirror about x=50.
  const bold=[[70,34,1.95],[77,54,1.8],[76,75,1.95],[61,90,1.8],
              [39,90,1.95],[24,75,1.8],[23,54,1.95],[30,34,1.8]];
  const b=bold.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+
    '" fill="'+cool[i%3]+'" opacity="'+(i%2?'.76':'.86')+'"/>').join('');
  // 13 quieter fine seeds further out. Class fx-fine: hidden at 44 px.
  const GA=Math.PI*(3-Math.sqrt(5)),fine=[];
  for(let j=0;j<13;j++){
    const a=(j+0.25)*GA+0.4, grow=32+5*(j/12);
    const x=50+grow*Math.cos(a), y=63+grow*1.08*Math.sin(a);
    if(x<8||x>92||y<8||y>96)continue;
    // skip the Norma box (43–57, 17–31) and the crown motes
    if(x>41&&x<59&&y>15&&y<33)continue;
    fine.push('<circle class="fx-fine" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+
      '" r="'+(0.85+0.2*(j%3)/2).toFixed(2)+'" fill="'+cool[j%3]+
      '" opacity="'+(.4+.15*(j%3)/2).toFixed(2)+'"/>');
  }
  const st=(still?' still':'')+(asleep&&!still?' asleep':' awake');
  return '<svg class="fx89-spiral fx111-spiral'+st+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">'+fine.join('')+b+'</svg>';
}

/* Ember pulses — fewer, bigger WARM motes RISING on VERTICAL paths.
 * Distinct from the spiral's cool ring. The live v89 path (M50 92 C47 80…)
 * climbs the old centreline and crosses the new motes and Norma — do not
 * keep it.
 *
 * REQUIRED: pass still=true under lampFxReduced89 / .reduce73. CSS
 * animation:none does not stop SMIL animateMotion.
 */
function lampFxEmberSVG121(still){
  const warm=['#FFE0A0','#FFD078','#F0B85A'];
  // Two vertical tracks, 100-vb. Left and right of the lantern, clear of Norma.
  const L='M27 82 L25.5 36', R='M73 80 L75 29';
  const motes=[[27,74,3.2,4.25,0,.95],[26,54,2.8,3.7,1,.88],
               [73,66,3.1,4.1,0,.92],[74.5,45,2.7,3.5,2,.84]];
  const tracks='<path class="fx-fine" d="'+L+'" fill="none" stroke="#E0A850" stroke-width=".7" opacity=".28" stroke-linecap="round"/>'
    +'<path class="fx-fine" d="'+R+'" fill="none" stroke="#E0A850" stroke-width=".7" opacity=".28" stroke-linecap="round"/>';
  let dots='';
  if(still){
    motes.forEach((m,i)=>{
      const col=warm[m[4]];
      dots+='<ellipse cx="'+m[0]+'" cy="'+(m[1]+m[3]*1.15)+'" rx="'+(m[2]*.42).toFixed(2)+
        '" ry="'+(m[3]*.85).toFixed(2)+'" fill="'+col+'" opacity="'+(m[5]*0.32).toFixed(2)+'"/>'
        +'<ellipse cx="'+m[0]+'" cy="'+m[1]+'" rx="'+m[2]+'" ry="'+m[3]+
        '" fill="'+col+'" opacity="'+m[5]+'"/>';
    });
  }else{
    // Rise along the vertical tracks; 14–20 s, gentle. Still mid-path dots if reduced.
    const along=[[L,0],[L,4],[R,1.5],[R,6]];
    along.forEach((a,i)=>{
      const m=motes[i], col=warm[m[4]];
      dots+='<ellipse rx="'+m[2]+'" ry="'+m[3]+'" fill="'+col+'" opacity="'+m[5]+
        '"><animateMotion dur="'+(14+i*2)+'s" repeatCount="indefinite" begin="-'+(a[1])+'s" path="'+a[0]+'"/></ellipse>';
    });
  }
  return '<svg class="fx89-ember fx111-ember'+(still?' still':'')+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">'
    +tracks+'<g>'+dots+'</g></svg>';
}

/* Wire the two functions over the v89/v111 wrappers:
 *   lampFxSpiralSVG89 = lampFxSpiralSVG121;
 *   lampFxEmberSVG89  = lampFxEmberSVG121;
 * Keep passing still=true when lampFxReduced89() is true.
 *
 * Comb jelly: CSS-only, but the SVG root (a descendant of .lamp73-shell)
 * MUST have data-il-kind="lamp" and data-il-stage="hatchling|young|grown|wise"
 * or the clip stays on the old clay pane.
 *
 * Optional Moss Spark nudge (FLAME81 hex unchanged): when binding Moss,
 * set the hot point to color-mix(in oklab, var(--f81-tip) 60%, #FFF6D8).
 */


/* ---- v123 wiring (do not wrap show()) ---- */
if(typeof document!=='undefined'&&!document.getElementById('v123fx')){
 const s=document.createElement('style');s.id='v123fx';
 s.textContent=CSS123;
 (document.documentElement||document.head).appendChild(s);
}

function pal123(){
 try{if(typeof lampFlamePal81==='function')return lampFlamePal81(typeof FLAME_CTX81!=='undefined'?FLAME_CTX81:undefined)}catch(e){}
 try{if(typeof lampPal101==='function')return lampPal101()}catch(e){}
 return {mid:'#E6B454',core:'#FFE4A4',tip:'#FFF6D8',deep:'#855A00'};
}
function tuneWiseHtml123(html){
 if(!html||typeof html!=='string')return html;
 try{
  return html.replace(/<path class="il-fine" d="M64 108h0 M70 86h0 M130 86h0 M136 108h0 M100 72h0"[^>]*\/?>/,lampWiseTouch120(pal123()));
 }catch(e){return html}
}
function phase123(stage){
 if(typeof IL119==='object'&&IL119.phase)return IL119.phase(stage);
 const s=Number(stage);
 return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}

{const prevLamp=typeof window.IL120==='object'&&typeof IL120.lamp==='function'?IL120.lamp:null;
 if(prevLamp){
  IL120.lamp=function(stage,opt){return tuneWiseHtml123(prevLamp.apply(this,arguments))};
 }
}
{const prevInner=typeof friendArtInner101==='function'?friendArtInner101:null;
 if(prevInner){
  friendArtInner101=function(id,stage){return tuneWiseHtml123(prevInner.apply(this,arguments))};
 }
}

if(typeof lampFxSpiralSVG89==='function')lampFxSpiralSVG89=lampFxSpiralSVG121;
if(typeof lampFxEmberSVG89==='function')lampFxEmberSVG89=lampFxEmberSVG121;

{const prev=typeof lampFxReduced89==='function'?lampFxReduced89:null;
 lampFxReduced89=function(){
  try{if(prev&&prev())return true}catch(e){}
  try{if(typeof lampReducedNow111==='function'&&lampReducedNow111())return true}catch(e){}
  try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
  return false;
 };
}

{const prev=typeof lampSvg73==='function'?lampSvg73:null;
 if(prev){
  lampSvg73=function(stage,cls,hero){
   let html=tuneWiseHtml123(prev.apply(this,arguments));
   try{
    const kind=(typeof FRIEND_ART_CTX101!=='undefined'&&FRIEND_ART_CTX101)||(typeof friendActive101==='function'&&friendActive101(typeof FLAME_CTX81!=='undefined'&&FLAME_CTX81||(typeof curPid==='function'&&curPid())))||'lamp';
    if(kind==='lamp'||!kind){
     const phase=phase123(stage);
     const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
     html=html.replace('<svg ',`<svg data-il-kind="lamp" data-il-stage="${phase}" `);
     if(phase==='wise'){
      const label=e(t('Norma, the Carpenter\'s Square'));
      html=html.replace('aria-hidden="true"',`aria-hidden="false" aria-label="${label}"`);
     }
    }
   }catch(e){}
   return html;
  };
 }
}

function markLampSize123(root){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll('svg.lamp73-svg').forEach(svg=>{
  const w=svg.getBoundingClientRect().width;
  if(w>0)svg.classList.toggle('il-sm',w<=52);
 });
}
function glowOnShell123(shell){
 if(!shell)return;
 try{
  const pal=typeof lampFlamePal81==='function'?lampFlamePal81(typeof FLAME_CTX81!=='undefined'&&FLAME_CTX81||(typeof curPid==='function'&&curPid())):null;
  if(pal&&pal.id){
   shell.setAttribute('data-glow',pal.id);
   const svg=shell.querySelector('svg.lamp73-svg[data-flame81]');
   if(svg)shell.setAttribute('data-glow',svg.getAttribute('data-flame81')||pal.id);
  }
 }catch(e){}
}
function shellForLayer123(layer){
 return layer.closest('.lamp73-shell')||(layer.parentElement&&layer.parentElement.querySelector('.lamp73-shell'))||(layer.closest('.lamp73-figure')&&layer.closest('.lamp73-figure').querySelector('.lamp73-shell'))||(layer.closest('.lamp76-hero')&&layer.closest('.lamp76-hero').querySelector('.lamp73-shell'))||(layer.closest('.today64')&&layer.closest('.today64').querySelector('.lamp73-shell'));
}
function layersIntoShell123(root,sel){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll(sel).forEach(layer=>{
  const shell=shellForLayer123(layer);
  if(!shell)return;
  if(layer.parentElement!==shell){
   const stage=shell.querySelector('.lamp73-stage');
   if(stage)shell.insertBefore(layer,stage);
   else shell.insertBefore(layer,shell.firstChild);
  }
 });
}
function smokeBehind123(root){
 layersIntoShell123(root,'.fx89-layer.fx89-smoke');
 // Bright core must size to the lantern box, not the today card.
 layersIntoShell123(root,'.fx89-layer.fx89-core:not(.fx89-core-flame)');
}
function reduceOnShell123(root){
 const host=root&&root.querySelectorAll?root:document;
 const on=typeof lampFxReduced89==='function'&&lampFxReduced89();
 host.querySelectorAll('.lamp73-shell').forEach(el=>{
  el.classList.toggle('reduce73',!!on);
  glowOnShell123(el);
 });
}

{const prev=typeof lampFxInsert89==='function'?lampFxInsert89:null;
 if(prev){
  lampFxInsert89=function(host,mode){
   const r=prev.apply(this,arguments);
   try{
    smokeBehind123(host||document);
    reduceOnShell123(host||document);
    markLampSize123(host||document);
   }catch(e){}
   return r;
  };
 }
}
{const prev=typeof lampFxDecorate111==='function'?lampFxDecorate111:null;
 if(prev){
  lampFxDecorate111=function(root){
   const r=prev.apply(this,arguments);
   try{
    reduceOnShell123(root||document);
    markLampSize123(root||document);
   }catch(e){}
   return r;
  };
 }
}
if(typeof document!=='undefined'){
 const ready=()=>{try{reduceOnShell123(document);markLampSize123(document);smokeBehind123(document)}catch(e){}};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);
 else setTimeout(ready,0);
 if(typeof window!=='undefined'&&!window._il123resize){
  window._il123resize=1;
  window.addEventListener('resize',()=>{try{markLampSize123(document)}catch(e){}});
 }
}

function normaCredit123(){
 const t=typeof gT==='function'?gT:s=>s;
 return t('Norma, the Carpenter\'s Square. Star places and brightness come from a small copy of the HYG Star Database (v4.4, Astronomy Nexus), used under CC BY-SA 4.0. https://creativecommons.org/licenses/by-sa/4.0/ Positions are for the year 2000. The stick-figure lines follow the Stellarium modern star pictures. The app does not go online to fetch stars. The square is turned so it reads above the lantern; it is not a real sky placement. From Cache County, Utah, Norma only peeks a hair above our southern horizon, too low to see — its highest star culminates only about 3° up.');
}
function normaAttach123(){
 const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
 const html=`<p class="soft" data-il-credit123="1">${e(normaCredit123())}</p>`;
 function add(root){
  if(!root||root.querySelector('[data-il-credit123]'))return;
  const host=root.querySelector('[data-il-credit120], [data-il-credit119], .lu83-credit, .card:last-child')||root;
  host.insertAdjacentHTML('beforeend',html);
 }
 add(typeof $==='function'?$('adults'):document.getElementById('adults'));
 add(typeof $==='function'?$('about'):document.getElementById('about'));
}
{const prevA=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prevA==='function'){
  renderAdults=function(){
   const r=prevA.apply(this,arguments);
   try{normaAttach123();licensesTxtLinks123(typeof $==='function'?$('adults'):document.getElementById('adults'))}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}
{const prevO=typeof renderAbout==='function'?renderAbout:(typeof RENDER==='object'&&RENDER.about);
 if(typeof prevO==='function'){
  renderAbout=function(){
   const r=prevO.apply(this,arguments);
   try{normaAttach123()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.about=renderAbout;
 }
}

function licensesTxtHref123(html){
 if(!html||typeof html!=='string')return html;
 return html.replace(/href="LICENSE-CONTENT"/g,'href="LICENSE-CONTENT.txt"')
            .replace(/href="LICENSE"/g,'href="LICENSE.txt"');
}
function licensesTxtLinks123(root){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll('[data-licenses122] a').forEach(a=>{
  const h=(a.getAttribute('href')||'').split('?')[0];
  if(h==='LICENSE-CONTENT')a.setAttribute('href','LICENSE-CONTENT.txt');
  else if(h==='LICENSE')a.setAttribute('href','LICENSE.txt');
 });
}
{const prevLic=typeof window.licensesHTML122==='function'?licensesHTML122:(typeof IL122==='object'&&IL122.html);
 if(typeof prevLic==='function'){
  const wrapped=function(){return licensesTxtHref123(prevLic.apply(this,arguments))};
  try{licensesHTML122=wrapped}catch(e){}
  if(typeof IL122==='object')IL122.html=wrapped;
 }
}
{const prevAtt=typeof window.licensesAttach122==='function'?licensesAttach122:(typeof IL122==='object'&&IL122.attach);
 if(typeof prevAtt==='function'){
  const wrapped=function(){
   const r=prevAtt.apply(this,arguments);
   try{licensesTxtLinks123(document)}catch(e){}
   return r;
  };
  try{licensesAttach122=wrapped}catch(e){}
  if(typeof IL122==='object')IL122.attach=wrapped;
 }
}

window.IL123={
 wise:lampWiseTouch120,spiral:lampFxSpiralSVG121,ember:lampFxEmberSVG121,
 credit:normaCredit123,phase:phase123
};

})();
// SPDX-License-Identifier: GPL-3.0-or-later
/* v124: Sunflower Garden and Honeycomb Builder in Patterns Everywhere,
 * plus a song list in LICENSES.md. Earned glass patterns are recorded
 * locally only; the full earned-patterns picker is not in this release. */
(function(){
'use strict';

const GA124=137.508*Math.PI/180;
const C124=14; // seed 12 stays inside the disc; dots ≥ 6.8 apart on a 200 box
const DOT124=6.8;
const FACT_SUN='Sunflower seeds grow in spirals.';
const FACT_HEX='Bees build honeycomb from hexagons. They fit together with no gaps.';

if(typeof document!=='undefined'&&!document.getElementById('v124css')){
 const s=document.createElement('style');s.id='v124css';
 s.textContent=`
#patterns .toy124-stage{position:relative;max-width:420px;margin:12px auto}
#patterns .toy124-stage svg{display:block;width:100%;height:auto;background:#120E18;border-radius:16px}
#patterns .toy124-count{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:18px;margin:8px 0 4px}
#patterns .toy124-count i{display:block;width:10px;height:10px;border-radius:50%;background:#e6b454;box-shadow:0 0 6px rgba(230,180,84,.45)}
#patterns .toy124-glow .toy124-disc,#patterns .toy124-glow .toy124-hex-on{filter:url(#toy124glow)}
@keyframes toy124fade{from{opacity:0}to{opacity:1}}
#patterns .toy124-in{animation:toy124fade .8s ease both}
@media (prefers-reduced-motion:reduce){
  #patterns .toy124-in{animation:toy124fade .8s ease both;transform:none}
  #patterns .toy124-stage svg,#patterns .toy124-glow .toy124-disc{filter:none}
}
#patterns .turtle105-toy{position:absolute;width:28px;height:30px;right:10px;bottom:10px;pointer-events:none;opacity:.7;line-height:0;z-index:3}
#patterns .turtle105-toy svg{display:block;width:100%;height:100%;background:none;border-radius:0}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t124(s,v){return typeof patT==='function'?patT(s,v):(typeof gT==='function'?gT(s,v):s)}
function e124(s){return typeof patEsc==='function'?patEsc(s):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function pid124(){try{return typeof patPid==='function'?patPid():(typeof curPid==='function'?curPid():'p1')}catch(e){return 'p1'}}
function reduced124(){
 try{if(typeof patReduced==='function'&&patReduced())return true}catch(e){}
 try{if(typeof lampReducedNow111==='function'&&lampReducedNow111())return true}catch(e){}
 try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
 return false;
}
function earnKey124(){return 'lamp_earn124@'+pid124()}
function earnPlain124(o){
 const out={};
 if(!o||typeof o!=='object')return out;
 for(const k of Object.keys(o)){
  const v=o[k];
  if(v===true||(v&&typeof v==='object'&&(v.at||v.again))||v)out[k]=true;
 }
 return out;
}
function earnLoad124(){
 try{
  const raw=typeof RAW!=='undefined'?RAW.get(earnKey124()):null;
  const o=raw?(typeof safeJSON==='function'?safeJSON(raw,null):JSON.parse(raw)):null;
  const out=earnPlain124(o);
  const stale=!!(o&&typeof o==='object'&&Object.keys(o).some(k=>o[k]!==true));
  if(stale)earnSave124(out);
  return out;
 }catch(e){return {}}
}
function earnSave124(o){
 try{if(typeof RAW!=='undefined')RAW.set(earnKey124(),JSON.stringify(o))}catch(e){}
}
function earn124(id){
 const o=earnLoad124();
 o[id]=true;
 earnSave124(o);
 return o;
}

function sunPts124(n){
 const pts=[];
 const N=Math.max(0,n|0);
 for(let i=0;i<N;i++){
  const a=i*GA124,r=C124*Math.sqrt(i+0.6);
  pts.push([100+r*Math.cos(a),92+r*Math.sin(a)]);
 }
 return pts;
}
function sunDiscR124(n){
 const N=Math.max(0,n|0);
 if(N<=13)return 68;
 const far=C124*Math.sqrt((N-1)+0.6);
 const pad=DOT124/2+1.1/2;
 return Math.min(92,Math.max(68,far+pad));
}
function sunSVG124(n,opts){
 opts=opts||{};
 const cap=opts.cap||13;
 const N=Math.min(n,cap);
 const pts=sunPts124(N);
 const glow=N>=13;
 const fade=reduced124()||opts.still;
 const disc=sunDiscR124(N),mid=58*(disc/68);
 const seeds=pts.map((p,i)=>{
  const cls='toy124-seed'+(fade||i<N-1?'':' toy124-in');
  return `<circle class="${cls}" cx="${p[0].toFixed(2)}" cy="${p[1].toFixed(2)}" r="${(DOT124/2).toFixed(2)}" fill="#FFE4A4" stroke="#E6B454" stroke-width="1.1"/>`;
 }).join('');
 return `<svg class="toy124-sun${glow?' toy124-glow':''}" viewBox="0 0 200 200" width="${opts.w||360}" height="${opts.h||360}" role="img" aria-hidden="${opts.thumb?'true':'false'}" ${opts.thumb?'':'aria-label="'+e124(t124('Sunflower Garden'))+'"'}>
  <defs><filter id="toy124glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="200" height="200" fill="#120E18"/>
  <ellipse class="toy124-disc" cx="100" cy="92" rx="${disc.toFixed(2)}" ry="${disc.toFixed(2)}" fill="#2A3A28"/>
  <ellipse cx="100" cy="92" rx="${mid.toFixed(2)}" ry="${mid.toFixed(2)}" fill="#3A4A30"/>
  <ellipse cx="100" cy="92" rx="22" ry="22" fill="#855A00" stroke="#72583F" stroke-width="1.4"/>
  <ellipse cx="100" cy="92" rx="12" ry="12" fill="#E6B454"/>
  <g fill="#6F8F4A" stroke="#4A6A38" stroke-width="1">${[0,72,144,216,288].map((a,i)=>{
   const r=a*Math.PI/180,x=100+Math.cos(r)*74,y=92+Math.sin(r)*70;
   return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="16" ry="9" transform="rotate(${(a+90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join('')}</g>
  ${seeds}
 </svg>`;
}

/* Pointy-top axial hex, same law as the turtle (ilHexCenters119 / ilHexD119). */
function hexXY124(q,r,size){return [size*(Math.sqrt(3)*q+Math.sqrt(3)/2*r), size*(1.5*r)]}
function hexRing124(n){
 if(!n)return [[0,0]];
 const c=[];let q=n,r=0;
 for(const [dq,dr] of [[0,-1],[-1,0],[-1,1],[0,1],[1,0],[1,-1]]){
  for(let i=0;i<n;i++){c.push([q,r]);q+=dq;r+=dr}
 }
 return c;
}
function hexCells124(){
 const cells=[];
 for(let k=0;k<=2;k++)cells.push(...hexRing124(k));
 return cells.filter(([q,r])=>Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=2);
}
function hexD124(cx,cy,size){
 const pts=[];
 for(let i=0;i<6;i++){
  const a=(30+60*i)*Math.PI/180;
  pts.push([cx+size*Math.cos(a),cy+size*Math.sin(a)]);
 }
 return `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`+pts.slice(1).map(p=>`L${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join('')+'Z';
}
function hexKey124(q,r){return q+','+r}
function hexOpen124(filled){
 const has=k=>filled.has(k);
 const ring1=hexRing124(1),ring2=hexRing124(2);
 const r1full=ring1.every(([q,r])=>has(hexKey124(q,r)));
 const ghosts=[];
 if(!r1full)ring1.forEach(([q,r])=>{const k=hexKey124(q,r);if(!has(k))ghosts.push([q,r])});
 else ring2.forEach(([q,r])=>{const k=hexKey124(q,r);if(!has(k))ghosts.push([q,r])});
 return ghosts;
}
function hexSVG124(filled,opts){
 opts=opts||{};
 const size=18,cx=100,cy=100;
 const fade=reduced124()||opts.still;
 const glow=filled.size>=19;
 const ghosts=hexOpen124(filled);
 const parts=[];
 hexCells124().forEach(([q,r])=>{
  const [dx,dy]=hexXY124(q,r,size);
  const k=hexKey124(q,r);
  const on=filled.has(k);
  const ghost=ghosts.some(([qq,rr])=>qq===q&&rr===r);
  if(!on&&!ghost)return;
  const last=opts.last!==undefined?opts.last:HEX124.last;
  const fresh=on&&last&&k===last;
  const cls=(on?'toy124-hex-on':'toy124-hex-ghost')+(fade||!fresh?'':' toy124-in');
  const fill=on?'#E6B454':'transparent';
  const op=on?'.92':'0';
  const sw=on?'1.8':'1.6';
  const stroke=on?'#855A00':'#C4A07A';
  parts.push(`<path class="${cls}" data-q="${q}" data-r="${r}" d="${hexD124(cx+dx,cy+dy,size*.98)}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" pointer-events="all"/>`);
 });
 return `<svg class="toy124-hex${glow?' toy124-glow':''}" viewBox="0 0 200 200" width="${opts.w||360}" height="${opts.h||360}" role="img" aria-hidden="${opts.thumb?'true':'false'}" ${opts.thumb?'':'aria-label="'+e124(t124('Honeycomb Builder'))+'"'}>
  <defs><filter id="toy124glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="200" height="200" fill="#120E18" pointer-events="none"/>
  ${parts.join('')}
 </svg>`;
}

function countRow124(n){
 let s='';
 for(let i=0;i<n;i++)s+='<i></i>';
 return `<div class="toy124-count" aria-hidden="true">${s}</div>`;
}
function maybeTurtle124(){
 if(Math.random()>0.2)return '';
 const art=(typeof turtleArt105==='function')?turtleArt105('tuck',28,30):'';
 if(!art)return '';
 return `<span class="turtle105-toy" data-turtle124="1" aria-hidden="true">${art}</span>`;
}
function cleanup124(){
 try{
  const host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  if(typeof PAT106==='object'&&PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
  if(typeof scStop101==='function')scStop101();
 }catch(e){}
}

const SUN124={n:0};
const HEX124={filled:null,last:null};

function sunOpen124(){
 cleanup124();
 SUN124.n=0;
 if(typeof PAT106==='object')PAT106.unit='sunflower';
 sunDraw124();
}
function sunDraw124(){
 const el=$('patterns');if(!el)return;
 const n=SUN124.n;
 const cap=34;
 el.innerHTML=patShell(t124('Sunflower Garden'),`
  <p class="soft toy124-fact">${e124(t124(FACT_SUN))}</p>
  <div class="toy124-stage" id="toy124sun">${sunSVG124(n,{cap})}${maybeTurtle124()}</div>
  ${countRow124(n)}
  <div class="pat-row">
   <button type="button" class="p" onclick="window.IL124.sunKeep()">${e124(t124('Keep'))}</button>
  </div>
  <p class="soft" id="toy124msg"></p>
  <h3>${e124(t124('Your gallery'))}</h3>
  <p class="soft">${e124(t124('Up to {n} on this device. When it is full, hold one to let it go.',{n:String(typeof PAT_GALLERY_CAP106==='number'?PAT_GALLERY_CAP106:24)}))}</p>
  <div class="pat-gallery" id="patGal106"></div>
 `);
 const stage=$('toy124sun');
 if(stage){
  const go=ev=>{
   ev.preventDefault();
   if(SUN124.n>=cap)return;
   SUN124.n+=1;
   if(SUN124.n===13)earn124('spiral');
   sunDraw124();
  };
  stage.addEventListener('click',go);
  stage.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')go(e)});
  stage.setAttribute('tabindex','0');
  stage.style.cursor='pointer';
 }
 if(typeof patGalRender106==='function')patGalRender106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
 if(typeof artRefresh63==='function')artRefresh63(el);
}
function sunKeep124(){
 if(typeof patGalKeep!=='function')return;
 const r=patGalKeep({kind:'sunflower',n:SUN124.n,c:C124},t124('Sunflower Garden'));
 const msg=$('toy124msg');
 if(msg)msg.textContent=(!r.ok&&r.full)?t124('The gallery is full. Hold one picture to let it go, then you can keep this one.'):(r.grew?t124('Kept. The one who is with you grew a little.'):t124('Kept on this device.'));
 if(typeof patGalRender106==='function')patGalRender106();
}

function hexOpenToy124(){
 cleanup124();
 HEX124.filled=new Set(['0,0']);
 HEX124.last=null;
 if(typeof PAT106==='object')PAT106.unit='honeycomb';
 hexDraw124();
}
function hexDraw124(){
 const el=$('patterns');if(!el)return;
 const filled=HEX124.filled||new Set(['0,0']);
 el.innerHTML=patShell(t124('Honeycomb Builder'),`
  <p class="soft toy124-fact">${e124(t124(FACT_HEX))}</p>
  <div class="toy124-stage" id="toy124hex">${hexSVG124(filled,{last:HEX124.last})}${maybeTurtle124()}</div>
  ${countRow124(filled.size)}
  <div class="pat-row">
   <button type="button" class="p" onclick="window.IL124.hexKeep()">${e124(t124('Keep'))}</button>
  </div>
  <p class="soft" id="toy124msg"></p>
  <h3>${e124(t124('Your gallery'))}</h3>
  <p class="soft">${e124(t124('Up to {n} on this device. When it is full, hold one to let it go.',{n:String(typeof PAT_GALLERY_CAP106==='number'?PAT_GALLERY_CAP106:24)}))}</p>
  <div class="pat-gallery" id="patGal106"></div>
 `);
 const svg=document.querySelector('#toy124hex svg');
 if(svg){
  svg.querySelectorAll('.toy124-hex-ghost').forEach(p=>{
   p.style.cursor='pointer';
   p.addEventListener('click',ev=>{
    ev.preventDefault();ev.stopPropagation();
    const q=+p.getAttribute('data-q'),r=+p.getAttribute('data-r');
    const k=hexKey124(q,r);
    filled.add(k);
    HEX124.filled=filled;
    HEX124.last=k;
    if(filled.size===19)earn124('hex');
    hexDraw124();
   });
  });
 }
 if(typeof patGalRender106==='function')patGalRender106();
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
 if(typeof artRefresh63==='function')artRefresh63(el);
}
function hexKeep124(){
 if(typeof patGalKeep!=='function')return;
 const filled=HEX124.filled||new Set(['0,0']);
 const r=patGalKeep({kind:'honeycomb',filled:[...filled]},t124('Honeycomb Builder'));
 const msg=$('toy124msg');
 if(msg)msg.textContent=(!r.ok&&r.full)?t124('The gallery is full. Hold one picture to let it go, then you can keep this one.'):(r.grew?t124('Kept. The one who is with you grew a little.'):t124('Kept on this device.'));
 if(typeof patGalRender106==='function')patGalRender106();
}

function unitArt124(id){
 const ink=(typeof patInk==='function')?patInk():'#72583f';
 const plate=inner=>`<svg class="lamp-art63" data-original-art="pat-${id}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="${ink}" stroke-width="2"/>${inner}</svg>`;
 if(id==='sunflower'){
  const pts=sunPts124(13);
  // scale 200-box around (100,92) into the 100-plate
  const seeds=pts.map(p=>{
   const x=50+(p[0]-100)*0.38,y=50+(p[1]-92)*0.38;
   return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#E6B454"/>`;
  }).join('');
  return plate(`<circle cx="50" cy="50" r="22" fill="#3A4A30" stroke="${ink}" stroke-width="1.2"/><circle cx="50" cy="50" r="7" fill="#855A00"/><circle cx="50" cy="50" r="3.4" fill="#FFE4A4"/>${seeds}`);
 }
 if(id==='honeycomb'){
  const size=9,cells=hexCells124();
  const hexes=cells.map(([q,r])=>{
   const [dx,dy]=hexXY124(q,r,size);
   return `<path d="${hexD124(50+dx,52+dy,size*.98)}" fill="#E6B454" stroke="${ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
  }).join('');
  return plate(hexes);
 }
 return '';
}

function drawThumb124(cv,recipe){
 if(!cv||!recipe)return false;
 const w=cv.width,h=cv.height;
 const svg=recipe.kind==='sunflower'?sunSVG124(recipe.n||0,{w,h,cap:13,still:true,thumb:true})
  :recipe.kind==='honeycomb'?hexSVG124(new Set(recipe.filled||['0,0']),{w,h,still:true,thumb:true}):'';
 if(!svg)return false;
 const img=new Image();
 img.onload=()=>{const x=cv.getContext('2d');if(!x)return;x.clearRect(0,0,w,h);x.drawImage(img,0,0,w,h)};
 img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
 return true;
}

{const prev=typeof renderPatterns106==='function'?renderPatterns106:null;
 if(prev){
  renderPatterns106=function(){
   const r=prev.apply(this,arguments);
   try{
    const grid=document.querySelector('#patterns .pat-units');
    if(grid&&!grid.querySelector('[data-pat="sunflower"]')){
     const tiles=[
      ['sunflower',t124('Sunflower Garden'),t124(FACT_SUN)],
      ['honeycomb',t124('Honeycomb Builder'),t124(FACT_HEX)]
     ];
     tiles.forEach(([id,title,sub])=>{
      const b=document.createElement('button');
      b.type='button';b.className='hubtile';b.setAttribute('data-pat',id);
      b.setAttribute('onclick',`patOpen106('${id}')`);
      b.innerHTML=`${unitArt124(id)}${e124(title)}<small>${e124(sub)}</small>`;
      grid.appendChild(b);
     });
    }
   }catch(e){}
   return r;
  };
 }
}
{const prev=typeof patOpen106==='function'?patOpen106:null;
 if(prev){
  patOpen106=function(unit){
   if(unit==='sunflower'){sunOpen124();return}
   if(unit==='honeycomb'){hexOpenToy124();return}
   return prev.apply(this,arguments);
  };
 }
}
{const prev=typeof patGalRender106==='function'?patGalRender106:null;
 if(prev){
  patGalRender106=function(){
   const r=prev.apply(this,arguments);
   try{
    const host=$('patGal106');if(!host)return r;
    const g=typeof patGalLoad==='function'?patGalLoad():{items:[]};
    host.querySelectorAll('[data-gal]').forEach(btn=>{
     const it=g.items.find(x=>x.id===btn.dataset.gal);if(!it||!it.recipe)return;
     if(it.recipe.kind==='sunflower'||it.recipe.kind==='honeycomb'){
      const cv=btn.querySelector('canvas');
      drawThumb124(cv,it.recipe);
     }
    });
    // after let-go, stay on the current toy if open
    host.querySelectorAll('[data-gal]').forEach(btn=>{
     // hold-to-let-go already bound by prev; when it redraws grow/zoom only,
     // wrap doesn't rebind. Acceptable: letting go from our toys redraws via confirm path
    });
   }catch(e){}
   return r;
  };
 }
}

{const prevGo=typeof patGalLetGo==='function'?patGalLetGo:null;
 if(prevGo){
  patGalLetGo=function(id){
   const r=prevGo.apply(this,arguments);
   try{
    if(typeof PAT106==='object'&&PAT106.unit==='sunflower')sunDraw124();
    else if(typeof PAT106==='object'&&PAT106.unit==='honeycomb')hexDraw124();
   }catch(e){}
   return r;
  };
 }
}
{const prevGrow=typeof patGrowDraw106==='function'?patGrowDraw106:null;
 if(prevGrow){
  patGrowDraw106=function(){
   try{
    if(typeof PAT106==='object'&&PAT106.unit==='sunflower'){sunDraw124();return}
    if(typeof PAT106==='object'&&PAT106.unit==='honeycomb'){hexDraw124();return}
   }catch(e){}
   return prevGrow.apply(this,arguments);
  };
 }
}

window.IL124={
 sunOpen:sunOpen124,hexOpen:hexOpenToy124,
 sunKeep:sunKeep124,hexKeep:hexKeep124,
 earn:earn124,earned:earnLoad124,
 sunPts:sunPts124,sunDiscR:sunDiscR124,sunSVG:sunSVG124,
 hexCells:hexCells124,hexRing:hexRing124,
 FACT_SUN,FACT_HEX
};
})();
// SPDX-License-Identifier: GPL-3.0-or-later
/* v125: Make it yours — a grown-up translation page behind the Grown-ups
 * gate. Device-only save, local Blob export, no live import, no accounts,
 * no child data. */
(function(){
'use strict';

const KEY125='lamp_yours125';
const GATE125='lamp_yours125_ok';
const UI_PAGE125=40;
const NOTE125='A volunteer reviewer checks a pack for meaning and kid safety before it can ship in a future free language pack, credited “translated by” as you choose.';
const STAY125='Everything on this page is saved on this device only. The app does not send it anywhere.';

if(typeof document!=='undefined'&&!document.getElementById('v125css')){
 const s=document.createElement('style');s.id='v125css';
 s.textContent=`
#adults .yours-art125{display:block;width:80px;height:56px;margin:0 0 .4rem}
#adults .yours-row125{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch;margin:.6rem 0}
@media (max-width:640px){#adults .yours-row125{grid-template-columns:1fr}}
#adults .yours-en125{white-space:pre-wrap;background:rgba(255,248,230,.06);border:1px solid rgba(230,180,84,.22);border-radius:12px;padding:10px;min-height:4.5em;color:inherit}
#adults .yours-row125 textarea,#adults .yours-meta125 input,#adults .yours-find125 input,#adults .yours-gate125 input{
  width:100%;min-height:44px;border-radius:12px;padding:10px;font:inherit;background:rgba(255,248,230,.08);color:inherit;border:1px solid rgba(230,180,84,.28);box-sizing:border-box}
#adults .yours-row125 textarea{min-height:4.5em;resize:vertical}
#adults .yours-tabs125{display:flex;flex-wrap:wrap;gap:8px;margin:.6rem 0}
#adults .yours-list125{display:flex;flex-direction:column;gap:6px;margin:.4rem 0}
#adults .yours-list125 button{text-align:left}
#adults .yours-in125{animation:yours125fade .7s ease both}
@keyframes yours125fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){
  #adults .yours-in125{animation:yours125fade .7s ease both;transform:none}
}
#adults .yours-turtle125{position:absolute;right:8px;bottom:8px;pointer-events:none;opacity:.85}
#adults .yours-wrap125{position:relative}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t125(s,o){return typeof gT==='function'?gT(s,o):s}
function e125(s){return typeof esc==='function'?esc(String(s)):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

function pages125(text){
 const raw=String(text||'').replace(/\r\n/g,'\n').trim();
 if(!raw)return [''];
 if(/\n\s*\n/.test(raw))return raw.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
 const lines=raw.split('\n');
 if(lines.length>1&&lines.every(l=>l.length<=80))return lines.map(x=>x.trim()).filter(Boolean);
 return [raw];
}

function catalog125(){
 const out=[],seen=new Set();
 const add=s=>{
  if(!s||!s.id||s.text==null||s.text==='')return;
  if(seen.has(s.id))return;
  if(/^(es_|d\d+_es_)/.test(s.id)||/_es_/.test(s.id))return;
  seen.add(s.id);
  out.push({id:s.id,t:s.t||s.id,pages:pages125(s.text)});
 };
 (window.S_CORE_EN||[]).forEach(add);
 if(typeof STORIES64==='object'&&Array.isArray(STORIES64.en))STORIES64.en.forEach(s=>{if(!s.ref)add(s)});
 if(typeof STORIES101==='object'&&Array.isArray(STORIES101.en))STORIES101.en.forEach(add);
 out.sort((a,b)=>String(a.t).localeCompare(String(b.t),'en',{sensitivity:'base'}));
 return out;
}

function load125(){
 try{
  const d=JSON.parse(RAW.get(KEY125)||'{}')||{};
  if(typeof d!=='object')return {language:'',by:'',stories:{},ui:{}};
  d.language=typeof d.language==='string'?d.language:'';
  d.by=typeof d.by==='string'?d.by:'';
  d.stories=d.stories&&typeof d.stories==='object'?d.stories:{};
  d.ui=d.ui&&typeof d.ui==='object'?d.ui:{};
  return d;
 }catch(e){return {language:'',by:'',stories:{},ui:{}}}
}
function save125(d){
 d=d||load125();
 d.at=new Date().toISOString();
 try{RAW.set(KEY125,JSON.stringify(d))}catch(e){}
}

let saveTimer125=0;
function touch125(){
 const root=$('adults');
 if(!root||!root.querySelector('[data-yours-editor125]'))return;
 const d=load125();
 const lang=root.querySelector('[data-yours-lang125]');
 const by=root.querySelector('[data-yours-by125]');
 if(lang)d.language=lang.value;
 if(by)d.by=by.value;
 const story=root.querySelector('[data-yours-story125]');
 if(story){
  const id=story.getAttribute('data-yours-story125');
  const title=story.querySelector('[data-yours-title125]');
  const pages=[...story.querySelectorAll('[data-yours-page125]')].map(el=>el.value);
  d.stories[id]={title:title?title.value:'',pages};
 }
 root.querySelectorAll('[data-yours-ui125]').forEach(el=>{
  const k=el.getAttribute('data-yours-ui125');
  if(!k)return;
  if(el.value)d.ui[k]=el.value;else delete d.ui[k];
 });
 clearTimeout(saveTimer125);
 saveTimer125=setTimeout(()=>save125(d),200);
}

function gated125(){try{return sessionStorage.getItem(GATE125)==='1'}catch(e){return false}}
function unlock125(){try{sessionStorage.setItem(GATE125,'1')}catch(e){}}

function quiz125(){
 const a=11+Math.floor(Math.random()*9);
 const b=6+Math.floor(Math.random()*13);
 return {a,b,sum:a+b};
}

function art125(){
 return `<svg class="yours-art125" viewBox="0 0 80 56" width="80" height="56" aria-hidden="true" focusable="false"><rect x="5" y="10" width="31" height="36" rx="3" fill="#2a2430" stroke="#d4b483" stroke-width="1.2"/><rect x="44" y="10" width="31" height="36" rx="3" fill="#2a2430" stroke="#d4b483" stroke-width="1.2"/><path d="M36 10v36" stroke="#e6b454" stroke-width="2"/><path d="M14 18h13M14 24h10M14 30h12" stroke="#c4b8a4" stroke-width="1.2" stroke-linecap="round"/><path d="M53 18h13M53 24h10M53 30h12" stroke="#c4b8a4" stroke-width="1.2" stroke-linecap="round"/><path d="M37.5 8.5c0-3.4 2.6-6 5.5-6s5.5 2.6 5.5 6c0 2.2-1.3 3.8-2.8 4.8v2.4h-5.4v-2.4c-1.5-1-2.8-2.6-2.8-4.8z" fill="#e6b454"/><circle cx="43" cy="7.2" r="2" fill="#fff6d8"/></svg>`;
}

function maybeTurtle125(root){
 if(Math.random()>0.2)return;
 if(typeof turtleArt105!=='function')return;
 const box=document.createElement('div');
 box.className='yours-turtle125';
 box.setAttribute('aria-hidden','true');
 box.innerHTML=turtleArt105('tuck',28,30);
 root.appendChild(box);
}

function root125(){return typeof $==='function'?$('adults'):document.getElementById('adults')}

function attach125(){
 const root=root125();
 if(!root||root.querySelector('[data-yours125]')||root.querySelector('[data-yours-editor125],[data-yours-gate125]'))return;
 const html=`<div class="card" data-yours125="1"><h3 class="kline">${e125(t125('Make it yours'))}</h3>${art125()}<p class="soft">${e125(t125(NOTE125))}</p><p class="soft">${e125(t125(STAY125))}</p><p><button class="p" data-yours-open125="1">${e125(t125('Open'))}</button></p></div>`;
 root.insertAdjacentHTML('beforeend',html);
 const btn=root.querySelector('[data-yours-open125]');
 if(btn)btn.addEventListener('click',()=>{if(gated125())openEditor125();else openGate125()});
}

function openGate125(){
 const root=root125();if(!root)return;
 const q=quiz125();
 root.setAttribute('data-yours-open','gate');
 root.innerHTML=`<div class="card yours-wrap125 yours-in125 yours-gate125" data-yours-gate125="1"><p><button type="button" data-yours-back125="1">${e125(t125('Back to Grown-ups'))}</button></p><h2 class="kline">${e125(t125('Make it yours'))}</h2><p>${e125(t125('What is {a} plus {b}?',{a:String(q.a),b:String(q.b)}))}</p><p><label class="soft">${e125(t125('Answer'))}<input type="number" inputmode="numeric" data-yours-ans125="1" aria-label="${e125(t125('Answer'))}"></label></p><p><button class="p" type="button" data-yours-go125="1">${e125(t125('Continue'))}</button></p><p class="soft" data-yours-hint125="1" hidden>${e125(t125('Try again'))}</p></div>`;
 root.querySelector('[data-yours-back125]').addEventListener('click',leave125);
 const go=()=>{
  const el=root.querySelector('[data-yours-ans125]');
  const n=Number(el&&el.value);
  if(n===q.sum){unlock125();openEditor125();return}
  const hint=root.querySelector('[data-yours-hint125]');
  if(hint)hint.hidden=false;
  const nq=quiz125();q.a=nq.a;q.b=nq.b;q.sum=nq.sum;
  const p=root.querySelector('h2').nextElementSibling;
  if(p)p.textContent=t125('What is {a} plus {b}?',{a:String(q.a),b:String(q.b)});
  if(el)el.value='';
 };
 root.querySelector('[data-yours-go125]').addEventListener('click',go);
 const ans=root.querySelector('[data-yours-ans125]');
 if(ans)ans.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();go()}});
}

function leave125(){
 const root=root125();
 if(root){root.removeAttribute('data-yours-open');}
 if(typeof renderAdults==='function')renderAdults();
}

let uiKeys125=null;
let uiFrom125=0;
let tab125='stories';
let storyId125=null;
let find125='';

function loadUiKeys125(cb){
 if(uiKeys125){cb(uiKeys125);return}
 const done=d=>{uiKeys125=Array.isArray(d)?d:Object.keys(d||{});cb(uiKeys125)};
 try{
  fetch('lang/es.json').then(r=>r.ok?r.json():{}).then(done).catch(()=>done([]));
 }catch(e){done([])}
}

function metaBar125(d){
 return `<div class="yours-meta125"><p><label>${e125(t125('Language name'))}<input type="text" data-yours-lang125="1" autocomplete="off" value="${e125(d.language||'')}"></label></p><p><label>${e125(t125('Translated by'))}<input type="text" data-yours-by125="1" autocomplete="off" value="${e125(d.by||'')}"></label></p></div>`;
}

function editorShell125(){
 const root=root125();if(!root)return;
 const d=load125();
 root.setAttribute('data-yours-open','edit');
 root.innerHTML=`<div class="card yours-wrap125 yours-in125" data-yours-editor125="1"><p><button type="button" data-yours-back125="1">${e125(t125('Back to Grown-ups'))}</button></p><h2 class="kline">${e125(t125('Make it yours'))}</h2><p class="soft">${e125(t125(NOTE125))}</p><p class="soft">${e125(t125(STAY125))}</p>${metaBar125(d)}<div class="yours-tabs125"><button type="button" class="p" data-yours-tab125="stories">${e125(t125('Stories'))}</button><button type="button" data-yours-tab125="ui">${e125(t125('Menu words'))}</button></div><p class="yours-find125"><label>${e125(t125('Search'))}<input type="search" data-yours-find125="1" value="${e125(find125)}"></label></p><div data-yours-body125="1"></div><p><button class="p" type="button" data-yours-export125="1">${e125(t125('Export language pack'))}</button> <button type="button" data-yours-clear125="1">${e125(t125('Clear all'))}</button></p><p class="soft" data-yours-clearask125="1" hidden>${e125(t125('Clear all the translations saved on this device? This cannot be undone.'))} <button type="button" class="p" data-yours-clearyes125="1">${e125(t125('Yes'))}</button> <button type="button" data-yours-clearno125="1">${e125(t125('Not now'))}</button></p></div>`;
 maybeTurtle125(root.querySelector('[data-yours-editor125]'));
 root.querySelector('[data-yours-back125]').addEventListener('click',()=>{touch125();save125();leave125()});
 root.querySelector('[data-yours-export125]').addEventListener('click',()=>{touch125();save125();export125()});
 const ask=root.querySelector('[data-yours-clearask125]');
 root.querySelector('[data-yours-clear125]').addEventListener('click',()=>{if(ask)ask.hidden=false});
 root.querySelector('[data-yours-clearno125]').addEventListener('click',()=>{if(ask)ask.hidden=true});
 root.querySelector('[data-yours-clearyes125]').addEventListener('click',()=>clearAll125());

 root.querySelector('[data-yours-lang125]').addEventListener('input',touch125);
 root.querySelector('[data-yours-by125]').addEventListener('input',touch125);
 root.querySelector('[data-yours-find125]').addEventListener('input',ev=>{find125=ev.target.value||'';paintBody125()});
 root.querySelectorAll('[data-yours-tab125]').forEach(btn=>btn.addEventListener('click',()=>{tab125=btn.getAttribute('data-yours-tab125');storyId125=null;uiFrom125=0;paintBody125()}));
 paintBody125();
}

function openEditor125(){editorShell125()}

function paintBody125(){
 const root=root125();
 const body=root&&root.querySelector('[data-yours-body125]');
 if(!body)return;
 if(tab125==='ui'){paintUi125(body);return}
 paintStories125(body);
}

function paintStories125(body){
 const d=load125();
 const q=(find125||'').trim().toLowerCase();
 const all=catalog125().filter(s=>!q||String(s.t).toLowerCase().includes(q)||String(s.id).toLowerCase().includes(q));
 if(storyId125){
  const s=all.find(x=>x.id===storyId125)||catalog125().find(x=>x.id===storyId125);
  if(s){paintOneStory125(body,s,d);return}
  storyId125=null;
 }
 body.innerHTML=`<div class="yours-list125">${all.map(s=>`<button type="button" data-yours-pick125="${e125(s.id)}">${e125(s.t)}</button>`).join('')||`<p class="soft">${e125(t125('Search'))}</p>`}</div>`;
 body.querySelectorAll('[data-yours-pick125]').forEach(btn=>btn.addEventListener('click',()=>{storyId125=btn.getAttribute('data-yours-pick125');paintBody125()}));
}

function paintOneStory125(body,s,d){
 const saved=d.stories[s.id]||{};
 const pages=s.pages;
 const sp=Array.isArray(saved.pages)?saved.pages:[];
 const title=saved.title||'';
 let html=`<p><button type="button" data-yours-all125="1">${e125(t125('Stories'))}</button></p><div data-yours-story125="${e125(s.id)}">`;
 html+=`<div class="yours-row125"><div class="yours-en125 story" lang="en">${e125(s.t)}</div><textarea data-yours-title125="1" aria-label="${e125(s.t)}"></textarea></div>`;
 pages.forEach((p,i)=>{
  html+=`<div class="yours-row125"><div class="yours-en125 story" lang="en">${e125(p)}</div><textarea data-yours-page125="${i}" aria-label="${e125(s.t)} ${i+1}"></textarea></div>`;
 });
 html+='</div>';
 body.innerHTML=html;
 const titleEl=body.querySelector('[data-yours-title125]');
 if(titleEl)titleEl.value=title;
 body.querySelectorAll('[data-yours-page125]').forEach(el=>{
  const i=Number(el.getAttribute('data-yours-page125'));
  el.value=sp[i]||'';
  el.addEventListener('input',touch125);
 });
 if(titleEl)titleEl.addEventListener('input',touch125);
 body.querySelector('[data-yours-all125]').addEventListener('click',()=>{touch125();storyId125=null;paintBody125()});
}

function paintUi125(body){
 loadUiKeys125(keys=>{
  const d=load125();
  const q=(find125||'').trim().toLowerCase();
  const list=keys.filter(k=>!q||String(k).toLowerCase().includes(q)||String(d.ui[k]||'').toLowerCase().includes(q));
  const slice=list.slice(uiFrom125,uiFrom125+UI_PAGE125);
  let html=`<p class="soft">${uiFrom125+1}–${Math.min(uiFrom125+slice.length,list.length)} / ${list.length}</p>`;
  slice.forEach(k=>{
   html+=`<div class="yours-row125"><div class="yours-en125 story" lang="en">${e125(k)}</div><textarea data-yours-ui125="${e125(k)}" aria-label="${e125(k)}"></textarea></div>`;
  });
  if(uiFrom125>0)html+=`<p><button type="button" data-yours-prev125="1">${e125(t125('Back'))}</button></p>`;
  if(uiFrom125+UI_PAGE125<list.length)html+=`<p><button type="button" class="p" data-yours-more125="1">${e125(t125('Next'))}</button></p>`;
  body.innerHTML=html;
  body.querySelectorAll('[data-yours-ui125]').forEach(el=>{
   const k=el.getAttribute('data-yours-ui125');
   el.value=d.ui[k]||'';
   el.addEventListener('input',touch125);
  });
  const more=body.querySelector('[data-yours-more125]');
  if(more)more.addEventListener('click',()=>{touch125();uiFrom125+=UI_PAGE125;paintBody125()});
  const prev=body.querySelector('[data-yours-prev125]');
  if(prev)prev.addEventListener('click',()=>{touch125();uiFrom125=Math.max(0,uiFrom125-UI_PAGE125);paintBody125()});
 });
}

function slug125(s){
 return String(s||'').trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'').slice(0,40)||'language';
}

function clearAll125(){
 clearTimeout(saveTimer125);
 try{if(typeof RAW!=='undefined')RAW.del(KEY125)}catch(e){}
 find125='';storyId125=null;uiFrom125=0;tab125='stories';
 editorShell125();
}
function export125(){
 const d=load125();
 const cat=catalog125();
 const stories={};
 cat.forEach(s=>{
  const saved=d.stories[s.id];
  if(!saved)return;
  const title=(saved.title||'').trim();
  const pages=(saved.pages||[]).slice(0,s.pages.length).map(x=>String(x||'').trim());
  if(!title&&pages.every(x=>!x))return;
  stories[s.id]={title,pages};
 });
 const ui={};
 Object.keys(d.ui||{}).forEach(k=>{const v=String(d.ui[k]||'').trim();if(v)ui[k]=v});
 const pack={
  kind:'lamplight-language-pack',
  format:1,
  appVersion:typeof APP_VERSION==='number'?APP_VERSION:125,
  language:d.language||'',
  translatedBy:d.by||'',
  savedAt:d.at||new Date().toISOString(),
  stories,ui
 };
 const name='lamplight-'+slug125(d.language||'language')+'-pack.json';
 const blob=new Blob([JSON.stringify(pack,null,2)],{type:'application/json;charset=utf-8'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download=name;
 a.rel='noopener';
 document.body.appendChild(a);
 a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},400);
}

function hookAdults125(){
 const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{attach125()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 const prevShow=typeof afterShow95==='function'?afterShow95:null;
 if(typeof prevShow==='function'&&!prevShow._v125){
  afterShow95=function(id){
   const r=prevShow.apply(this,arguments);
   try{if(id==='adults')attach125()}catch(e){}
   return r;
  };
  afterShow95._v125=1;
 }
}

hookAdults125();
window.IL125={
 attach:attach125,open:openEditor125,gate:openGate125,leave:leave125,
 catalog:catalog125,pages:pages125,load:load125,save:save125,clear:clearAll125,exportPack:export125,
 KEY:KEY125,NOTE:NOTE125,STAY:STAY125
};
})();
// SPDX-License-Identifier: GPL-3.0-or-later
/* v126: "Tell us" card in Grown-ups (mailto only; the app sends nothing
 * and keeps no answers), plus Pi's Sunflower disc growth in the optional
 * 34-seed mode and a plain true flag for lamp_earn124. */
(function(){
'use strict';

const ADDR126='scout.nomad+seedfeedback@mail.grokbot.com';
const Q126=[
 'What did your kid love?',
 'What did they leave for later?',
 'What was confusing?'
];
const NOTE126='This opens your own email. The app sends nothing and keeps no answers.';

if(typeof document!=='undefined'&&!document.getElementById('v126css')){
 const s=document.createElement('style');s.id='v126css';
 s.textContent=`
#adults .tell-art126{display:block;width:80px;height:56px;margin:0 0 .4rem}
#adults [data-tell126] a{display:inline-flex;align-items:center;min-height:44px;padding:0 .15rem;color:inherit;font-weight:700;text-underline-offset:3px}
#adults [data-tell126] ol{margin:.4rem 0 .7rem;padding-left:1.3rem}
#adults [data-tell126] li{margin:.25rem 0}
`;
 (document.documentElement||document.head).appendChild(s);
}

function t126(s,o){return typeof gT==='function'?gT(s,o):s}
function e126(s){return typeof esc==='function'?esc(String(s)):String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

function mailto126(){
 const qs=Q126.map(q=>t126(q));
 const subject=qs.join(' ');
 const body=qs.join('\n\n')+'\n\n';
 return 'mailto:'+ADDR126+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}

function art126(){
 return `<svg class="tell-art126" viewBox="0 0 80 56" width="80" height="56" aria-hidden="true" focusable="false"><rect x="10" y="14" width="60" height="36" rx="4" fill="#2a2430" stroke="#d4b483" stroke-width="1.2"/><path d="M12 16l28 18 28-18" fill="none" stroke="#e6b454" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 48l20-16M68 48L48 32" fill="none" stroke="#c4b8a4" stroke-width="1.2"/><circle cx="40" cy="12" r="6" fill="#e6b454"/><path d="M40 7.5c0-2.2 1.7-4 3.7-4s3.7 1.8 3.7 4c0 1.5-.9 2.6-1.9 3.3v1.6h-3.6V10.8c-1-.7-1.9-1.8-1.9-3.3z" fill="#fff6d8"/></svg>`;
}

function root126(){return typeof $==='function'?$('adults'):document.getElementById('adults')}

function attach126(){
 const root=root126();
 if(!root||root.querySelector('[data-tell126]'))return;
 if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
 const qs=Q126.map(q=>`<li>${e126(t126(q))}</li>`).join('');
 const href=mailto126();
 const html=`<div class="card" data-tell126="1"><h3 class="kline">${e126(t126('A note'))}</h3>${art126()}<ol>${qs}</ol><p class="soft">${e126(t126(NOTE126))}</p><p><a href="${e126(href)}">${e126(t126('Open your email'))}</a></p></div>`;
 root.insertAdjacentHTML('beforeend',html);
}

function hookAdults126(){
 const prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof prev==='function'){
  renderAdults=function(){
   const r=prev.apply(this,arguments);
   try{attach126()}catch(e){}
   return r;
  };
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
 const prevShow=typeof afterShow95==='function'?afterShow95:null;
 if(typeof prevShow==='function'&&!prevShow._v126){
  afterShow95=function(id){
   const r=prevShow.apply(this,arguments);
   try{if(id==='adults')attach126()}catch(e){}
   return r;
  };
  afterShow95._v126=1;
 }
}

function migrateEarn126(){
 const keys=[];
 try{
  for(let i=0;i<localStorage.length;i++){
   const k=localStorage.key(i);
   if(k&&k.indexOf('lamp_earn124@')===0)keys.push(k);
  }
 }catch(e){}
 const parse=typeof safeJSON==='function'?safeJSON:(s,d)=>{try{return JSON.parse(s)}catch(e){return d}};
 keys.forEach(k=>{
  try{
   const raw=typeof RAW!=='undefined'?RAW.get(k):localStorage.getItem(k);
   const o=parse(raw,null);
   if(!o||typeof o!=='object')return;
   const out={};let changed=false;
   Object.keys(o).forEach(id=>{
    const v=o[id];
    if(v===true)out[id]=true;
    else if(v){out[id]=true;changed=true}
   });
   if(changed&&typeof RAW!=='undefined')RAW.set(k,JSON.stringify(out));
  }catch(e){}
 });
}

try{migrateEarn126()}catch(e){}
hookAdults126();
window.IL126={attach:attach126,mailto:mailto126,ADDR:ADDR126,Q:Q126,NOTE:NOTE126,migrateEarn:migrateEarn126};
})();
// SPDX-License-Identifier: GPL-3.0-or-later
/* Singing brush upgrade (draft for the next vNNN, currently v127).
   Color voices, mirror chords, stroke speed, night/bedtime. Same 🎵 button
   and i18n. Replaces paintSing; wraps paintSeg (so v101 chalk/spray/etc. and
   v16 neon/flow still sing) and paintStamp. No show() wrap, no network, no
   mic, no files. Missing AudioContext is a no-op. Peaks stay under v46. */
(function(root){
'use strict';

var TH=170, BASE=.058, CAP=.07, NG=.62, NR=1.55, GL=.88, GR=1.35;
var PF=[0,2,4,7,9], lastP=null, lastT=0, fired=0, quiet=false, vol=1, nbuf=null;
var RECIPES={
 bell:{att:.018,rel:.75,parts:[{r:1,g:1,d:1},{r:2.003,g:.38,d:.5},{r:2.995,g:.16,d:.32},{r:4.07,g:.09,d:.18},{r:5.04,g:.05,d:.12}]},
 hum:{att:.08,rel:1.45,parts:[{r:1,g:.9,d:1},{r:1.003,g:.7,d:1},{r:.5,g:.1,d:1.1},{r:2,g:.12,d:.7}]},
 marimba:{att:.014,rel:.58,parts:[{r:1,g:1,d:1},{r:2,g:.22,d:.28},{r:4,g:.08,d:.16}],noise:{g:.032,att:.01,dec:.07,hz:1800,q:.9,kind:'bandpass'}},
 flute:{att:.07,rel:1.15,parts:[{r:1,g:1,d:1},{r:2,g:.08,d:.65},{r:3,g:.03,d:.4}],noise:{g:.038,att:.08,dec:1.05,hz:0,q:3.2,kind:'bandpass',follow:2}},
 chime:{att:.016,rel:1.55,parts:[{r:1,g:.85,d:1},{r:2.003,g:.28,d:.7},{r:2.758,g:.3,d:.85},{r:5.404,g:.12,d:.45}]},
 kalimba:{att:.012,rel:.7,parts:[{r:1,g:1,d:1},{r:2.005,g:.28,d:.3},{r:6.7,g:.05,d:.1}]},
 water:{att:.03,rel:.85,parts:[{r:1,g:1,d:1},{r:2,g:.12,d:.4}],glide:.97,noise:{g:.028,att:.015,dec:.1,hz:2200,q:.8,kind:'lowpass'}},
 harp:{att:.02,rel:1.05,parts:[{r:1,g:1,d:1},{r:3,g:.14,d:.35},{r:5,g:.06,d:.2}]},
 air:{att:.08,rel:1.2,parts:[{r:2,g:.7,d:1},{r:3.003,g:.18,d:.6},{r:1,g:.25,d:1.1}],noise:{g:.042,att:.1,dec:1.1,hz:1400,q:.6,kind:'lowpass'}},
 low:{att:.028,rel:.65,parts:[{r:1,g:1,d:1},{r:.5,g:.28,d:1.05},{r:2,g:.08,d:.35}],noise:{g:.022,att:.02,dec:.1,hz:600,q:.8,kind:'lowpass'}}
};

function penta(){return (typeof PENTA!=='undefined'&&PENTA&&PENTA.length)?PENTA:PF}
function mtofSB(m){return (typeof mtof==='function')?mtof(m):440*Math.pow(2,(m-69)/12)}
function acSB(){
  try{
    if(typeof ac==='function'){var c=ac();if(c)return c}
    if(typeof AC!=='undefined'&&AC){if(AC.state==='suspended')try{AC.resume()}catch(e){}return AC}
    var C=root.AudioContext||root.webkitAudioContext;if(!C)return null;
    var n=new C();root.AC=n;return n;
  }catch(e){return null}
}
function busSB(c){
  if(!c)return null;
  try{if(typeof labBus==='function'){var b=labBus(c);if(b&&b.in)return b}}catch(e){}
  if(c._sbBus){
    var bed=isBed()? .5:1;
    try{c._sbBus.out.gain.value=.42*bed}catch(e){}
    return c._sbBus;
  }
  try{
    var i=c.createGain(),lp=c.createBiquadFilter(),cp=c.createDynamicsCompressor(),o=c.createGain();
    lp.type='lowpass';lp.frequency.value=2600;lp.Q.value=.5;
    cp.threshold.value=-20;cp.knee.value=6;cp.ratio.value=20;cp.attack.value=.002;cp.release.value=.15;
    o.gain.value=.42*(isBed()?.5:1);
    i.connect(lp).connect(cp).connect(o).connect(c.destination);
    return c._sbBus={in:i,out:o};
  }catch(e){return null}
}
function isBed(){try{return !!(root.document&&document.body&&document.body.classList.contains('bedtime'))}catch(e){return false}}
function isNight(){try{if(typeof PT==='object'&&PT&&PT.dark)return true}catch(e){}return isBed()}
function isMirror(){try{var s=typeof PT==='object'&&PT?PT.sym:1;return s>=2||s<0}catch(e){return false}}
function muted(){
  if(quiet||vol<=0)return true;
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return true;
    if(typeof root.LAMP_SFX!=='undefined'&&root.LAMP_SFX===false)return true;
  }catch(e){}
  return false;
}
function rgbHsl(r,g,b){
  r/=255;g/=255;b/=255;
  var x=Math.max(r,g,b),n=Math.min(r,g,b),l=(x+n)/2,s,h=0,d=x-n;
  if(x===n)s=0;
  else{
    s=l>.5?d/(2-x-n):d/(x+n);
    if(x===r)h=(g-b)/d+(g<b?6:0);
    else if(x===g)h=(b-r)/d+2;
    else h=(r-g)/d+4;
    h*=60;
  }
  return {h:h,s:s,l:l};
}
function parseCol(col){
  if(col==null)return {h:210,s:.8,l:.5};
  var s=String(col).trim(),m;
  m=s.match(/^#([0-9a-f]{3})$/i);
  if(m){s=m[1];return rgbHsl(parseInt(s[0]+s[0],16),parseInt(s[1]+s[1],16),parseInt(s[2]+s[2],16))}
  m=s.match(/^#([0-9a-f]{6})$/i);
  if(m){s=m[1];return rgbHsl(parseInt(s.slice(0,2),16),parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16))}
  m=s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if(m)return rgbHsl(+m[1],+m[2],+m[3]);
  m=s.match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i);
  if(m)return {h:+m[1],s:+m[2]/100,l:+m[3]/100};
  return {h:210,s:.8,l:.5};
}
function voiceFromHsl(h,s,l){
  if(l<.12)return 'low';
  if(s<.12)return l<.35?'low':'air';
  h=((h%360)+360)%360;
  if(h<20||h>=345)return 'marimba';
  if(h<45)return 'kalimba';
  if(h<75)return 'hum';
  if(h<150)return 'flute';
  if(h<195)return 'water';
  if(h<255)return 'bell';
  if(h<305)return 'chime';
  return 'harp';
}
function voiceFor(tool,col,hue){
  if(tool==='eraser')return 'swish';
  if(tool==='rainbow'){var u=hue;if(u==null&&typeof PT==='object'&&PT)u=PT.hue||0;return voiceFromHsl(u,0.9,0.5)}
  var c=parseCol(col!=null?col:(typeof PT==='object'&&PT?PT.col:null));
  return voiceFromHsl(c.h,c.s,c.l);
}
function midiIdx(p,h,night){
  var yN=1-Math.min(1,Math.max(0,(p&&p[1]||0)/Math.max(1,h||600)));
  var i=Math.round(yN*9),P=penta();
  var m=60+12*Math.floor(i/5)+P[i%5]+(night?-12:0);
  return {midi:m,idx:i};
}
function chordMidi(idx,night){
  var P=penta(),out=[],k;
  for(k=0;k<2;k++){var i=idx+2*(k+1);out.push(60+12*Math.floor(i/5)+P[i%5]+(night?-12:0))}
  return out;
}
function speedOf(p,prev,now){
  var q=prev||lastP,t0=lastT;
  if(!q||!t0)return .45;
  var dt=(now-t0)/1000;
  if(dt<=0||dt>.45)return .45;
  var cv=cvEl(),h=(cv&&cv.height)||600;
  var v=Math.hypot(p[0]-q[0],p[1]-q[1])/(dt*h);
  var s=(v-.12)/(2-.12);
  return Math.max(0,Math.min(1,s));
}
function cvEl(){try{if(typeof $==='function'){var e=$('pcv');if(e)return e}return (root.document&&document.getElementById('pcv'))||null}catch(e){return null}}
function env(g,t,att,dec,peak){
  att=Math.max(.012,att||.02);dec=Math.max(.08,dec||.4);
  peak=Math.max(.0002,peak);
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(peak,t+att);
  g.gain.exponentialRampToValueAtTime(.0001,t+att+dec);
}
function noiseSrc(c){
  if(nbuf&&nbuf.sampleRate===c.sampleRate)return nbuf;
  var n=Math.max(64,Math.floor(c.sampleRate*.4)),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0),v=0,i=0;
  for(;i<n;i++){v=.97*v+(Math.random()*2-1)*.3;d[i]=v}
  return nbuf=b;
}
function addNoise(c,dest,t,opt,f,peak,rel){
  if(!opt||!peak)return;
  var src=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();
  src.buffer=noiseSrc(c);src.loop=true;
  fl.type=opt.kind||'lowpass';
  fl.frequency.value=(opt.follow?f*opt.follow:(opt.hz||1400));
  fl.Q.value=opt.q||.8;
  var dec=opt.dec||rel,att=opt.att||.02;
  env(g,t,att,dec,peak*opt.g);
  src.connect(fl);fl.connect(g);g.connect(dest);
  src.start(t);src.stop(t+att+dec+.06);
}
function playNote(c,dest,opt){
  var voice=opt.voice||'bell',rec=RECIPES[voice],t=opt.when,f=opt.freq,spd=Math.max(0,Math.min(1,+opt.speed||.45));
  var night=!!opt.night,glow=!!opt.glow,amp=Math.min(1,.48+.52*spd)*(night?NG:1)*(glow?GL:1)*Math.max(0,Math.min(1,vol));
  if(voice==='swish'){
    var sw=c.createBiquadFilter(),sg=c.createGain(),ss=c.createBufferSource();
    ss.buffer=noiseSrc(c);ss.loop=true;
    sw.type='bandpass';sw.frequency.value=1400+(spd*600);sw.Q.value=.8;
    env(sg,t,.03,.12,Math.min(CAP,.028*amp*(night?.7:1)));
    ss.connect(sw);sw.connect(sg);sg.connect(dest);
    ss.start(t);ss.stop(t+.22);
    return;
  }
  if(!rec)rec=RECIPES.bell;
  var rel=rec.rel*(night?NR:1)*(glow?GR:1);
  var cut=Math.min(3000,(night?1200:1400)+spd*(night?800:1500));
  var sum=rec.parts.reduce(function(a,p){return a+p.g},0)||1;
  var peak=Math.min(CAP,BASE*amp)/sum;
  var lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=cut;lp.Q.value=.7;
  var mix=c.createGain();mix.gain.value=1;mix.connect(lp);lp.connect(dest);
  var det=(opt.detune!=null?opt.detune:(Math.random()*10-5));
  var f0=f*Math.pow(2,det/1200);
  rec.parts.forEach(function(p){
    var o=c.createOscillator(),g=c.createGain(),ff=f0*p.r,pd=rel*(p.d||1);
    o.type='sine';o.frequency.setValueAtTime(ff,t);
    if(rec.glide&&rec.glide>0){try{o.frequency.exponentialRampToValueAtTime(Math.max(20,ff*rec.glide),t+.3)}catch(e){}}
    env(g,t,rec.att,pd,peak*p.g);
    o.connect(g);g.connect(mix);
    o.start(t);o.stop(t+rec.att+pd+.08);
  });
  if(rec.noise)addNoise(c,mix,t,rec.noise,f0,Math.min(CAP,BASE*amp),rel);
}

function hear(p,prev,opts){
  opts=opts||{};
  var now=(typeof performance!=='undefined'?performance.now():Date.now());
  var spd=opts.speed!=null?opts.speed:speedOf(p,prev,now);
  lastP=p;lastT=now;
  if(!opts.force){
    if(typeof PT==='object'&&PT&&!PT.sing)return false;
    if(now-fired<TH)return false;
    if(muted())return false;
  }else if(muted()&&!opts.ignoreMute)return false;
  var c=opts.ctx||acSB();if(!c)return false;
  var b=busSB(c);if(!b||!b.in)return false;
  fired=now;
  var cv=cvEl(),h=opts.height||((cv&&cv.height)||600);
  var night=opts.night!=null?!!opts.night:isNight();
  var tool=opts.tool!=null?opts.tool:(typeof PT==='object'&&PT&&PT.tool)||'brush';
  var col=opts.col!=null?opts.col:(typeof PT==='object'&&PT?PT.col:null);
  var hue=opts.hue!=null?opts.hue:(typeof PT==='object'&&PT?PT.hue:0);
  var voice=opts.voice||voiceFor(tool,col,hue);
  var mi=midiIdx(p,h,night);
  var t=(opts.when!=null?opts.when:c.currentTime+.01);
  playNote(c,b.in,{voice:voice,freq:mtofSB(mi.midi),when:t,speed:spd,night:night,glow:tool==='glow'||!!opts.glow,detune:opts.detune});
  if((opts.chord!=null?opts.chord:isMirror())&&voice!=='swish'){
    chordMidi(mi.idx,night).forEach(function(m,i){
      var g=.36-i*.08,f=mtofSB(m)*Math.pow(2,((opts.detune||0)+(i+1)*1.2)/1200);
      playChordTone(c,b.in,f,t,g*Math.min(CAP,BASE*Math.min(1,.48+.52*spd)*(night?NG:1)*Math.max(0,Math.min(1,vol))),night,spd);
    });
  }
  return true;
}
function playChordTone(c,dest,f,t,peak,night,spd){
  var o=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();
  var rel=.9*(night?NR:1),cut=Math.min(2800,(night?1100:1300)+spd*1200);
  o.type='sine';o.frequency.value=f;
  lp.type='lowpass';lp.frequency.value=cut;lp.Q.value=.6;
  env(g,t,.03,rel,Math.max(.0002,peak));
  o.connect(g);g.connect(lp);lp.connect(dest);
  o.start(t);o.stop(t+.03+rel+.08);
}

function sbPaintSing(p,prev){
  try{if(!p)return;hear(p,prev)}catch(e){}
}

function hook(){
  root.paintSing=sbPaintSing;
  try{paintSing=sbPaintSing}catch(e){}
  var ps=root.paintSeg;
  if(typeof ps==='function'&&!ps._sb127){
    var w=function(a,b){var r=ps.apply(this,arguments);try{sbPaintSing(b,a)}catch(e){}return r};
    w._sb127=1;root.paintSeg=w;
    try{if(typeof paintSeg!=='undefined')paintSeg=w}catch(e){}
  }
  var pst=root.paintStamp;
  if(typeof pst==='function'&&!pst._sb127){
    var w2=function(p){var r=pst.apply(this,arguments);try{sbPaintSing(p,p)}catch(e){}return r};
    w2._sb127=1;root.paintStamp=w2;
    try{if(typeof paintStamp!=='undefined')paintStamp=w2}catch(e){}
  }
}
hook();

var api={
  paintSing:sbPaintSing,hear:hear,voiceFor:voiceFor,voiceFromHsl:voiceFromHsl,parseCol:parseCol,
  midiIdx:midiIdx,chordMidi:chordMidi,playNote:playNote,RECIPES:RECIPES,
  setQuiet:function(on){quiet=!!on;return quiet},isQuiet:function(){return quiet||muted()},
  setVolume:function(v){if(v==null||isNaN(+v))return vol;vol=Math.max(0,Math.min(1,+v));return vol},
  getVolume:function(){return vol},muted:muted,isNight:isNight,isMirror:isMirror,
  TH:TH,BASE:BASE,CAP:CAP,PENTA:PF,mtof:mtofSB
};
root.SingingBrush=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:this);
// SPDX-License-Identifier: GPL-3.0-or-later
/* Lamp Breathing upgrade — drop-in replacement for v129-breathing.js.
   Same public API, --lb-k / --lb-dim, and i18n keys as the live v129 module.
   start() with no args is still a normal (about 2 min) session.
   Upgrades (Ignacio, 13 Nov 2026, 3:52 PM MT: "Yes lets try the upgrades"):
     1. The hum steps through a low C D E G A pentatonic, gliding softly,
        and settles back down in the final fade-to-night cycles.
     2. A very quiet sine 'ting' at the top of each in-breath, which goes
        quieter and drops out in the last cycles.
     3. start({length:'short'|'normal'|'long'}) for about 1 / 2 / 3 min.
        duration still wins if passed (so today's v129.js duration:120 is safe).
   Drive the existing lamp with paint:false and --lb-k / --lb-dim; do not
   repaint it. Not added to Bedtime Glow. Inert until start(). No mic,
   no network, no files. Keep PARAM in sync with render_previews.py. */
(function(root){
'use strict';

var IN0=4, OUT0=6, SLOW=.2, FADE_CYCLES=3, FADE_IN=2.8, STOP_FADE=1.2;
var DUR=120, F0=55, F_LIFT=.016, G_SWELL=.3, MASTER=.028, LP_LO=380, LP_HI=540, LP_Q=.7;
var PARTS=[[1,1],[1.5,.32],[2,.2],[3,.07],[4,.035]];
var LENGTHS={short:60,normal:120,long:180};
var LADDER=[36,38,40,43,45,48]; /* C2 D2 E2 G2 A2 C3 — gentle low register */
var CHIME_G=.003, CHIME_ATT=.05, CHIME_REL=1.08, CHIME_OCT=24;
var GLOW_TROUGH=.26, GLOW_AMP=.12, GLOW_SCALE=.04, SPILL_TROUGH=.16, SPILL_AMP=.08;
var REDUCE_GLOW=.32, REDUCE_SPILL=.2;

var STR={
 en:{
  'Lamp Breathing':'Lamp Breathing',
  'breathe in…':'breathe in…',
  'breathe out…':'breathe out…',
  'Good night':'Good night',
  'Done':'Done',
  'Hide words':'Hide words',
  'Show words':'Show words',
  'Tap the lamp or Done to stop.':'Tap the lamp or Done to stop.',
  'A slow wind-down. The lamp breathes with you, then the light goes to night.':'A slow wind-down. The lamp breathes with you, then the light goes to night.',
  'How long?':'How long?',
  'About 1 minute':'About 1 minute',
  'About 2 minutes':'About 2 minutes',
  'About 3 minutes':'About 3 minutes'
 },
 es:{
  'Lamp Breathing':'Respira con la lámpara',
  'breathe in…':'inhala…',
  'breathe out…':'exhala…',
  'Good night':'Buenas noches',
  'Done':'Listo',
  'Hide words':'Ocultar palabras',
  'Show words':'Mostrar palabras',
  'Tap the lamp or Done to stop.':'Toca la lámpara o Listo para terminar.',
  'A slow wind-down. The lamp breathes with you, then the light goes to night.':'Un cierre lento. La lámpara respira contigo, y luego la luz se va a la noche.',
  'How long?':'¿Cuánto tiempo?',
  'About 1 minute':'Cerca de 1 minuto',
  'About 2 minutes':'Cerca de 2 minutos',
  'About 3 minutes':'Cerca de 3 minutos'
 },
 ar:{
  'Lamp Breathing':'تنفّس مع المصباح',
  'breathe in…':'شهيق…',
  'breathe out…':'زفير…',
  'Good night':'تصبح على خير',
  'Done':'تم',
  'Hide words':'إخفاء الكلمات',
  'Show words':'إظهار الكلمات',
  'Tap the lamp or Done to stop.':'المس المصباح أو «تم» للتوقف.',
  'A slow wind-down. The lamp breathes with you, then the light goes to night.':'ختام هادئ. المصباح يتنفّس معك، ثم يهدأ الضوء إلى الليل.',
  'How long?':'كم المدة؟',
  'About 1 minute':'حوالي دقيقة',
  'About 2 minutes':'حوالي دقيقتين',
  'About 3 minutes':'حوالي 3 دقائق'
 }
};

var st=null; /* running session or null */
var quiet=false, vol=1, cssOn=false;

function langOf(opt){
  if(opt&&opt.lang)return String(opt.lang).slice(0,2);
  try{if(typeof LANG==='string'&&LANG)return LANG.slice(0,2)}catch(e){}
  try{var l=(root.document&&document.documentElement&&document.documentElement.lang)||'en';return String(l).slice(0,2)}catch(e){return 'en'}
}
function t128(s,opt){
  try{
    if(typeof gT==='function'){
      var r=gT(s);
      if(r&&r!==s)return r;
    }
  }catch(e){}
  var lg=langOf(opt||(st&&st.opt)||{});
  var d=STR[lg]||STR.en;
  return (d&&d[s])||(STR.en[s])||s;
}
function isReduced(explicit){
  if(explicit===true||explicit===false)return explicit;
  try{if(typeof lampReduced73==='function')return !!lampReduced73()}catch(e){}
  try{return !!(root.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}
}
function isSoundOn(){
  if(quiet)return false;
  try{if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return false}catch(e){}
  try{if(typeof root.LAMP_SFX!=='undefined'&&root.LAMP_SFX===false)return false}catch(e){}
  return true;
}
function ac128(){
  try{
    if(typeof ac==='function'){var c=ac();if(c)return c}
    if(typeof AC!=='undefined'&&AC){if(AC.state==='suspended')try{AC.resume()}catch(e){}return AC}
    var C=root.AudioContext||root.webkitAudioContext;if(!C)return null;
    var n=new C();root.AC=n;return n;
  }catch(e){return null}
}

/* ---- timeline (shared with the Python renderer) ---- */
function resolveDuration(opt){
  opt=opt||{};
  if(opt.duration>0)return opt.duration;
  var L=String(opt.length||'').toLowerCase();
  if(LENGTHS[L])return LENGTHS[L];
  return LENGTHS.normal;
}
function mtofLB(m){
  try{if(typeof mtof==='function')return mtof(m)}catch(e){}
  return 440*Math.pow(2,(m-69)/12);
}
function ladderIndex(i){
  var n=LADDER.length, period=(n-1)*2, x=((i%period)+period)%period;
  return x<n?x:period-x;
}
function assignNotes(cycles,fadeStart){
  var fadeI=cycles.length,i,j,prev,idx;
  for(i=0;i<cycles.length;i++){
    if(cycles[i].t0>=fadeStart-1e-9){fadeI=i;break}
  }
  for(i=0;i<cycles.length;i++){
    if(i<fadeI)idx=ladderIndex(i);
    else{
      prev=i>0?cycles[i-1].midi:LADDER[0];
      idx=0;
      for(j=0;j<LADDER.length;j++){if(LADDER[j]<prev)idx=j}
      if(prev<=LADDER[0])idx=0;
    }
    cycles[i].midi=LADDER[idx];
    cycles[i].i=i;
    cycles[i].fade=i>=fadeI;
  }
  for(i=0;i<cycles.length;i++)cycles[i].prevMidi=i>0?cycles[i-1].midi:cycles[i].midi;
  return fadeI;
}
function makeTimeline(duration){
  var cycles=[], t=0, i, p, s, inn, out;
  duration=duration>0?duration:DUR;
  for(i=0;i<64;i++){
    p=duration>0?Math.min(1,t/duration):0;
    s=1+SLOW*p;
    inn=IN0*s; out=OUT0*s;
    cycles.push({t0:t,inn:inn,out:out,mid:t+inn,t1:t+inn+out});
    t=t+inn+out;
    if(t>=duration)break;
  }
  var n=Math.min(FADE_CYCLES,cycles.length);
  var fadeStart=cycles[Math.max(0,cycles.length-n)].t0;
  var fadeI=assignNotes(cycles,fadeStart);
  return {cycles:cycles,fadeStart:fadeStart,fadeI:fadeI,end:cycles[cycles.length-1].t1,duration:duration};
}
function ease01(x){x=x<0?0:x>1?1:x;return .5-.5*Math.cos(Math.PI*x)}
function stateAt(tl,t){
  var rest=mtofLB(LADDER[0]);
  if(t>=tl.end)return {k:0,phase:'out',dim:0,cue:'',done:true,t:t,midi:LADDER[0],hz:rest,i:-1,fade:true};
  var dim=1;
  if(t>=tl.fadeStart){
    var fd=tl.end-tl.fadeStart;
    dim=1-ease01(fd>0?(t-tl.fadeStart)/fd:1);
  }
  var cy=null,i;
  for(i=0;i<tl.cycles.length;i++){if(t<tl.cycles[i].t1){cy=tl.cycles[i];break}}
  if(!cy)return {k:0,phase:'out',dim:0,cue:'',done:true,t:t,midi:LADDER[0],hz:rest,i:-1,fade:true};
  var k,phase,midi;
  if(t<cy.mid){
    phase='in';k=ease01((t-cy.t0)/cy.inn);
    midi=cy.prevMidi+(cy.midi-cy.prevMidi)*k;
  }else{
    phase='out';k=1-ease01((t-cy.mid)/cy.out);
    midi=cy.midi;
  }
  var hz=mtofLB(midi)*(1+F_LIFT*k);
  return {k:k,phase:phase,dim:dim,cue:phase==='in'?'breathe in…':'breathe out…',done:false,t:t,midi:midi,hz:hz,i:cy.i,fade:!!cy.fade};
}
function fadeInAt(t){return t<=0?0:t>=FADE_IN?1:ease01(t/FADE_IN)}
function gainAt(s,t){return MASTER*(1+G_SWELL*s.k)*s.dim*fadeInAt(t)}
function freqAt(s){return (s&&s.hz)?s.hz:(F0*(1+F_LIFT*((s&&s.k)||0)))}
function lpAt(s){return LP_LO+(LP_HI-LP_LO)*s.k}
function chimeGainAt(tl,cy){
  if(!cy)return 0;
  if(cy.fade){
    var i=cy.i, fadeI=tl.fadeI;
    if(i>fadeI)return 0; /* drop out after the first fade cycle */
    var s=stateAt(tl,cy.mid);
    return CHIME_G*s.dim*s.dim*.45;
  }
  return CHIME_G;
}

/* ---- CSS ---- */
function css128(){
  if(cssOn||typeof document==='undefined')return;
  if(document.getElementById('v128css')){cssOn=true;return}
  var s=document.createElement('style');s.id='v128css';
  s.textContent=
'#lb128root,.lb128-root{position:relative;inset:auto;min-height:100%;background:#120E18;color:#FFF6D8;overflow:hidden;--lb-k:0;--lb-dim:1;touch-action:manipulation}'+
'#lb128root.lb128-overlay{position:fixed;inset:0;z-index:160}'+
'.lb128-night{position:absolute;inset:0;background:#120E18;pointer-events:none}'+
'.lb128-spill,.lb128-halo,.lb128-bloom{position:absolute;pointer-events:none;will-change:opacity,transform;transform-origin:50% 50%}'+
'.lb128-spill{left:50%;top:72%;width:140%;height:48%;transform:translate(-50%,-50%) scaleX(calc(1 + var(--lb-k,0)*0.05));'+
 'background:radial-gradient(ellipse at 50% 50%,rgba(230,180,84,calc((.16 + var(--lb-k,0)*.08)*var(--lb-dim,1))) 0%,rgba(230,180,84,0) 72%);}'+
'.lb128-halo{left:50%;top:46%;width:min(92vw,720px);height:min(92vw,720px);transform:translate(-50%,-50%) scale(calc(1 + var(--lb-k,0)*0.04));'+
 'background:radial-gradient(circle at 50% 48%,rgba(255,246,216,calc((.26 + var(--lb-k,0)*.12)*var(--lb-dim,1))) 0%,rgba(230,180,84,calc((.14 + var(--lb-k,0)*.08)*var(--lb-dim,1))) 38%,rgba(230,180,84,0) 70%)}'+
'.lb128-bloom{left:50%;top:45%;width:min(28vw,220px);height:min(34vw,260px);transform:translate(-50%,-50%) scale(calc(1 + var(--lb-k,0)*0.03));'+
 'background:radial-gradient(ellipse at 50% 50%,rgba(255,246,216,calc((.32 + var(--lb-k,0)*.12)*var(--lb-dim,1))) 0%,rgba(255,228,164,calc((.14 + var(--lb-k,0)*.08)*var(--lb-dim,1))) 46%,rgba(255,228,164,0) 74%)}'+
'.lb128-lamp{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:min(28vw,168px);pointer-events:none;z-index:2}'+
'.lb128-lamp svg{display:block;width:100%;height:auto;overflow:visible}'+
'.lb128-flame{opacity:calc(0.9 + var(--lb-k,0)*0.1);transform-origin:50% 90%}'+
'.lb128-cue{position:absolute;left:50%;bottom:22%;transform:translate(-50%,0);margin:0;z-index:3;color:#FFF6D8;'+
 'background:rgba(18,14,24,.62);padding:.45rem 1.1rem;border-radius:999px;font:600 clamp(1.15rem,4.2vw,1.85rem)/1.3 system-ui,sans-serif;'+
 'letter-spacing:.08em;text-align:center;max-width:90%;pointer-events:none;min-height:1.4em}'+
'.lb128-cue.lb128-hide,.lb128-root.lb128-nocues .lb128-cue{opacity:0}'+
'.lb128-hint{position:absolute;left:50%;bottom:14%;transform:translate(-50%,0);z-index:3;margin:0;color:#c4b8a4;'+
 'font:400 .85rem/1.35 system-ui,sans-serif;text-align:center;max-width:90%;pointer-events:none;background:rgba(18,14,24,.4);'+
 'padding:.25rem .7rem;border-radius:999px}'+
'.lb128-bar{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;'+
 'align-items:center;padding:14px 14px calc(14px + env(safe-area-inset-bottom,0px));}'+
'.lb128-bar button{min-width:56px;min-height:56px;padding:10px 18px;border-radius:16px;border:1px solid rgba(230,180,84,.35);'+
 'background:rgba(28,22,36,.86);color:#FFF6D8;font:700 1rem/1.2 system-ui,sans-serif;cursor:pointer}'+
'.lb128-bar button:focus-visible{outline:3px solid #E6B454;outline-offset:3px}'+
'.lb128-bar button.lb128-done{background:#3b3420;border-color:#E6B454}'+
'@media (prefers-reduced-motion:reduce){'+
 '.lb128-spill{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(230,180,84,calc(.2*var(--lb-dim,1))) 0%,rgba(230,180,84,0) 72%)}'+
 '.lb128-halo{transform:translate(-50%,-50%)!important;background:radial-gradient(circle at 50% 48%,rgba(255,246,216,calc(.32*var(--lb-dim,1))) 0%,rgba(230,180,84,calc(.18*var(--lb-dim,1))) 38%,rgba(230,180,84,0) 70%)}'+
 '.lb128-bloom{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(255,246,216,calc(.36*var(--lb-dim,1))) 0%,rgba(255,228,164,calc(.16*var(--lb-dim,1))) 46%,rgba(255,228,164,0) 74%)}'+
 '.lb128-flame{opacity:.95!important}'+
 '}'+
'.lb128-root.lb-still .lb128-spill,.lb128-root.reduce73 .lb128-spill{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(230,180,84,calc(.2*var(--lb-dim,1))) 0%,rgba(230,180,84,0) 72%)}'+
'.lb128-root.lb-still .lb128-halo,.lb128-root.reduce73 .lb128-halo{transform:translate(-50%,-50%)!important;background:radial-gradient(circle at 50% 48%,rgba(255,246,216,calc(.32*var(--lb-dim,1))) 0%,rgba(230,180,84,calc(.18*var(--lb-dim,1))) 38%,rgba(230,180,84,0) 70%)}'+
'.lb128-root.lb-still .lb128-bloom,.lb128-root.reduce73 .lb128-bloom{transform:translate(-50%,-50%)!important;background:radial-gradient(ellipse at 50% 50%,rgba(255,246,216,calc(.36*var(--lb-dim,1))) 0%,rgba(255,228,164,calc(.16*var(--lb-dim,1))) 46%,rgba(255,228,164,0) 74%)}'+
'.lb128-root.lb-still .lb128-flame,.lb128-root.reduce73 .lb128-flame{opacity:.95!important}'+
'.lb128-picker-wrap{margin:.35rem 0}'+'.lb128-picker-label{display:block;text-align:center;margin:0 0 .35rem;font-weight:700;font-size:1.05rem;color:inherit}'+'.lb128-picker{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;margin:0}'+
'.lb128-picker button{min-width:56px;min-height:56px;padding:10px 16px;border-radius:16px;border:1px solid rgba(230,180,84,.35);'+
 'background:rgba(28,22,36,.86);color:#FFF6D8;font:700 1rem/1.2 system-ui,sans-serif;cursor:pointer}'+
'.lb128-picker button.on,.lb128-picker button[aria-checked="true"]{background:#E6B454;color:#120E18;border-color:#E6B454}'+
'.lb128-picker button:focus-visible{outline:3px solid #E6B454;outline-offset:3px}';
  (document.documentElement||document.head).appendChild(s);
  cssOn=true;
}

function lampSVG(){
  return '<svg class="lb128-svg" viewBox="0 0 100 130" aria-hidden="true" focusable="false">'+
   '<ellipse cx="50" cy="118" rx="34" ry="7" fill="#E6B454" opacity=".3"/>'+
   '<path d="M36 22 Q50 12 64 22" fill="none" stroke="#C9A06A" stroke-width="3.2" stroke-linecap="round"/>'+
   '<path d="M30 36 L70 36 76 82 Q50 98 24 82Z" fill="#C9A06A" stroke="#5C3D12" stroke-width="2.2"/>'+
   '<path d="M33 36 H67" stroke="#5C3D12" stroke-width="3.4" stroke-linecap="round"/>'+
   '<rect x="36" y="48" width="12" height="16" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<rect x="52" y="48" width="12" height="16" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<rect x="36" y="68" width="12" height="12" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<rect x="52" y="68" width="12" height="12" rx="1.6" fill="#1A1620" stroke="#855A00" stroke-width="1.1"/>'+
   '<path d="M48 46 L50 34 52 46" fill="#5C3D12"/>'+
   '<path class="lb128-flame" d="M45.5 40 Q50 22 54.5 40 Q50 46 45.5 40Z" fill="#FFF6D8" stroke="#E6B454" stroke-width="1.1"/>'+
   '<path d="M49 38 Q50 30 51 38" fill="none" stroke="#855A00" stroke-width="1"/>'+
   '<ellipse cx="50" cy="96" rx="18" ry="5" fill="#8A6840"/>'+
   '</svg>';
}

function installI18n(opt){
  try{
    if(typeof DICT==='object'&&DICT){
      var lg=langOf(opt), extra=STR[lg]||{};
      Object.keys(extra).forEach(function(k){if(!DICT[k])DICT[k]=extra[k]});
    }
  }catch(e){}
}

/* ---- audio ---- */
function schedCurve(param,start,dur,from,to){
  if(!param||!(dur>0)){try{param.setValueAtTime(to,start)}catch(e){}return}
  var n=Math.max(8,Math.min(160,Math.round(dur*28))), a=new Float32Array(n),i,x;
  for(i=0;i<n;i++){x=i/(n-1);a[i]=from+(to-from)*ease01(x)}
  try{param.setValueCurveAtTime(a,start,dur)}catch(e){
    try{param.setValueAtTime(from,start);param.linearRampToValueAtTime(to,start+dur)}catch(e2){}
  }
}
function buildAudio(c,tl){
  var t0=c.currentTime+.06, i, o, g;
  var master=c.createGain(); master.gain.setValueAtTime(0,t0);
  var lp=c.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=LP_Q;
  lp.frequency.setValueAtTime(LP_LO,t0);
  var parts=[];
  for(i=0;i<PARTS.length;i++){
    o=c.createOscillator(); g=c.createGain();
    o.type='sine'; o.frequency.setValueAtTime(F0*PARTS[i][0],t0);
    g.gain.value=PARTS[i][1];
    o.connect(g); g.connect(lp);
    o.start(t0);
    parts.push({o:o,g:g,r:PARTS[i][0]});
  }
  lp.connect(master); master.connect(c.destination);

  /* Schedule gain, pitch and lowpass along the same cosine breath. */
  var t=0, step=.25, prevG=0, prevF=F0, prevLp=LP_LO, s, gn, fr, lv, at;
  s=stateAt(tl,0); prevG=gainAt(s,0)*vol; prevF=freqAt(s); prevLp=lpAt(s);
  master.gain.setValueAtTime(0,t0);
  while(t<tl.end+step){
    at=Math.min(t,tl.end);
    s=stateAt(tl,at);
    gn=gainAt(s,at)*vol;
    fr=freqAt(s);
    lv=lpAt(s);
    var dt=t===0?FADE_IN:step;
    if(t===0){
      schedCurve(master.gain,t0,FADE_IN,0,gainAt(stateAt(tl,FADE_IN),FADE_IN)*vol);
      /* after fade-in, continue from FADE_IN */
      t=FADE_IN;
      s=stateAt(tl,t); prevG=gainAt(s,t)*vol; prevF=freqAt(s); prevLp=lpAt(s);
      continue;
    }
    var tAbs=t0+at;
    try{master.gain.linearRampToValueAtTime(Math.max(0,gn),tAbs)}catch(e){}
    try{lp.frequency.linearRampToValueAtTime(lv,tAbs)}catch(e){}
    for(i=0;i<parts.length;i++){
      try{parts[i].o.frequency.linearRampToValueAtTime(fr*parts[i].r,tAbs)}catch(e){}
    }
    prevG=gn; prevF=fr; prevLp=lv;
    t+=step;
    if(s.done)break;
  }
  try{master.gain.linearRampToValueAtTime(0,t0+tl.end)}catch(e){}

  /* Quiet 'ting' at the top of each in-breath, on a fixed gain (not the breath swell). */
  var chimeBus=c.createGain(); chimeBus.gain.value=1;
  try{chimeBus.connect(c.destination)}catch(e){}
  var chimeNodes=[];
  for(i=0;i<tl.cycles.length;i++){
    var cy=tl.cycles[i], cg=chimeGainAt(tl,cy)*vol;
    if(cg>0.00012){
      var nn=scheduleChime(c,chimeBus,t0+cy.mid,mtofLB(cy.midi+CHIME_OCT),cg);
      if(nn)chimeNodes=chimeNodes.concat(nn);
    }
  }
  return {master:master,lp:lp,parts:parts,t0:t0,chimeBus:chimeBus,
    nodes:parts.map(function(p){return p.o}).concat(chimeNodes)}
}
function scheduleChime(c,dest,tAbs,hz,gain){
  if(!c||!(gain>0)||!(hz>0))return [];
  try{
    var o=c.createOscillator(), o2=c.createOscillator(), g=c.createGain(), g2=c.createGain();
    var lp=c.createBiquadFilter();
    o.type='sine'; o2.type='sine';
    o.frequency.setValueAtTime(hz,tAbs);
    o2.frequency.setValueAtTime(hz*2.003,tAbs);
    g2.gain.value=.18;
    lp.type='lowpass'; lp.frequency.value=1800; lp.Q.value=.55;
    g.gain.setValueAtTime(0,tAbs);
    g.gain.linearRampToValueAtTime(gain,tAbs+CHIME_ATT);
    g.gain.setValueAtTime(Math.max(1e-5,gain),tAbs+CHIME_ATT+.01);
    try{g.gain.exponentialRampToValueAtTime(0.00008,tAbs+CHIME_ATT+CHIME_REL)}catch(e){
      g.gain.linearRampToValueAtTime(0,tAbs+CHIME_ATT+CHIME_REL)
    }
    o.connect(g); o2.connect(g2).connect(g); g.connect(lp);
    if(dest)lp.connect(dest); else lp.connect(c.destination);
    o.start(tAbs); o2.start(tAbs);
    o.stop(tAbs+CHIME_ATT+CHIME_REL+.3); o2.stop(tAbs+CHIME_ATT+CHIME_REL+.3);
    return [o,o2];
  }catch(e){return []}
}
function killAudio(sess,fade){
  if(!sess||!sess.audio)return;
  var a=sess.audio, c=sess.ctx, t, i, d;
  try{t=c&&c.currentTime||0}catch(e){t=0}
  d=fade==null?STOP_FADE:Math.max(.05,fade);
  try{
    if(a.master){
      if(a.master.gain.cancelAndHoldAtTime)a.master.gain.cancelAndHoldAtTime(t);
      else{a.master.gain.cancelScheduledValues(t);a.master.gain.setValueAtTime(a.master.gain.value,t)}
      a.master.gain.linearRampToValueAtTime(0,t+d);
    }
  }catch(e){}
  a.nodes&&a.nodes.forEach(function(o){
    try{o.stop(t+d+.25)}catch(e){}
  });
  setTimeout(function(){
    try{a.master&&a.master.disconnect()}catch(e){}
    try{a.lp&&a.lp.disconnect()}catch(e){}
    try{a.chimeBus&&a.chimeBus.disconnect()}catch(e){}
  },(d+.4)*1000);
  sess.audio=null;
}

/* ---- visuals ---- */
function applyGlow(el,s,reduced){
  if(!el)return;
  var k=reduced?0.5:s.k;
  try{
    el.style.setProperty('--lb-k',String(k));
    el.style.setProperty('--lb-dim',String(s.dim));
    el.setAttribute('data-lb-phase',s.phase);
  }catch(e){}
}
function paintUI(sess){
  if(!sess||!sess.paint||!sess.root)return;
  var s=sess.last||stateAt(sess.tl,0);
  var cue=sess.root.querySelector('.lb128-cue');
  var hint=sess.root.querySelector('.lb128-hint');
  if(cue){
    if(s.done){cue.textContent=t128('Good night',sess.opt);cue.classList.remove('lb128-hide')}
    else if(!sess.cues||sess.reduced){cue.textContent=sess.reduced&&sess.cues?'':'';cue.classList.toggle('lb128-hide',!sess.cues||sess.reduced)}
    else{cue.textContent=t128(s.cue,sess.opt);cue.classList.remove('lb128-hide')}
  }
  if(hint){
    hint.textContent=s.done||s.dim<.35?'':t128('Tap the lamp or Done to stop.',sess.opt);
    hint.hidden=!!(s.done||s.dim<.35);
  }
}
function mountUI(host,opt){
  css128();
  var created=false, root;
  if(host){
    root=host;
    root.classList.add('lb128-root');
    root.setAttribute('id',root.id||'lb128root');
  }else{
    root=document.getElementById('lb128root');
    if(!root){
      root=document.createElement('div');
      root.id='lb128root';
      root.className='lb128-root lb128-overlay';
      (document.body||document.documentElement).appendChild(root);
      created=true;
    }
  }
  root.setAttribute('role','dialog');
  root.setAttribute('aria-label',t128('Lamp Breathing',opt));
  var lg=langOf(opt), dir='ltr';
  if(lg==='ar'||lg==='he'||lg==='fa'||lg==='ur')dir='rtl';
  else if(!(lg==='en'||lg==='es')){
    try{dir=(document.documentElement&&document.documentElement.dir)||'ltr'}catch(e){}
  }
  root.dir=dir;
  if(isReduced(opt&&opt.reduced))root.classList.add('lb-still','reduce73');
  else root.classList.remove('lb-still','reduce73');
  root.innerHTML='<div class="lb128-night"></div><div class="lb128-spill"></div><div class="lb128-halo"></div><div class="lb128-bloom"></div>'+
    '<div class="lb128-lamp">'+lampSVG()+'</div>'+
    '<p class="lb128-cue" aria-live="polite"></p>'+
    '<p class="lb128-hint"></p>'+
    '<div class="lb128-bar">'+
    '<button type="button" class="lb128-done">'+esc128(t128('Done',opt))+'</button>'+
    '<button type="button" class="lb128-cuesbtn">'+esc128(t128((opt&&opt.cues===false)?'Show words':'Hide words',opt))+'</button>'+
    '</div>';
  return {root:root,created:created};
}
function esc128(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

function tick(){
  if(!st)return;
  var now=performance.now();
  var t=(now-st.tPerf)/1000;
  if(st.stopping){
    /* visual dim-out in STOP_FADE */
    var k=Math.min(1,(now-st.stopAt)/ (STOP_FADE*1000));
    var s=st.last?Object.assign({},st.last):stateAt(st.tl,t);
    s.dim=(st.last?st.last.dim:1)*(1-ease01(k));
    applyGlow(st.target,s,st.reduced);
    if(st.paint)applyGlow(st.root,s,st.reduced);
    if(k>=1){finish(false);return}
    st.raf=requestAnimationFrame(tick);
    return;
  }
  var s=stateAt(st.tl,t);
  st.last=s;
  applyGlow(st.target,s,st.reduced);
  if(st.paint){applyGlow(st.root,s,st.reduced);paintUI(st)}
  if(st.opt&&typeof st.opt.onTick==='function'){
    try{st.opt.onTick(s)}catch(e){}
  }
  if(s.done){
    if(st.paint)paintUI(st);
    if(st.audio)killAudio(st,.4);
    /* linger on Good night, then finish */
    if(!st.endedAt)st.endedAt=now;
    if(now-st.endedAt>2800){finish(true);return}
  }
  st.raf=requestAnimationFrame(tick);
}

function onVis(){
  if(document.hidden&&st&&!st.stopping)stop({reason:'hidden'});
}

function start(opt){
  opt=opt||{};
  if(st)stop({fade:.2,silent:true});
  installI18n(opt);
  css128();
  var duration=resolveDuration(opt);
  var tl=makeTimeline(duration);
  var reduced=isReduced(opt.reduced);
  var cues=opt.cues!==false;
  var paint=opt.paint!==false;
  var mounted=null, root=null, created=false;
  if(paint){
    if(typeof document==='undefined')return false;
    mounted=mountUI(opt.host||null,opt);
    root=mounted.root; created=mounted.created;
    root.classList.toggle('lb128-nocues',!cues);
  }
  var target=opt.glowEl||opt.host||root;
  var sess={
    opt:opt,tl:tl,reduced:reduced,cues:cues,paint:paint,root:root,target:target,
    created:created,tPerf:performance.now(),ctx:null,audio:null,raf:0,stopping:false,
    last:stateAt(tl,0),endedAt:0
  };
  st=sess;
  applyGlow(target,sess.last,reduced);
  if(paint){applyGlow(root,sess.last,reduced);paintUI(sess);
    var done=root.querySelector('.lb128-done');
    var cueb=root.querySelector('.lb128-cuesbtn');
    if(done)done.addEventListener('click',function(e){e.stopPropagation();stop({reason:'tap'})});
    if(cueb)cueb.addEventListener('click',function(e){e.stopPropagation();setCues(!st.cues)});
    if(opt.tapToStop!==false){
      root.addEventListener('click',function(e){
        if(e.target&&e.target.closest&&e.target.closest('.lb128-bar'))return;
        stop({reason:'tap'});
      });
    }
  }
  if(isSoundOn()&&opt.sound!==false){
    var c=ac128();
    if(c){
      try{if(c.state==='suspended')c.resume()}catch(e){}
      sess.ctx=c;
      try{sess.audio=buildAudio(c,tl)}catch(e){sess.audio=null}
    }
    /* missing AudioContext: glow-only no-op */
  }
  try{
    document.addEventListener('visibilitychange',onVis);
    document.addEventListener('pagehide',onVis);
  }catch(e){}
  sess.raf=requestAnimationFrame(tick);
  return true;
}

function finish(completed){
  var sess=st; if(!sess)return;
  st=null;
  try{if(sess.raf)cancelAnimationFrame(sess.raf)}catch(e){}
  try{document.removeEventListener('visibilitychange',onVis);document.removeEventListener('pagehide',onVis)}catch(e){}
  if(sess.audio)killAudio(sess,.2);
  if(sess.created&&sess.root&&sess.root.parentNode){
    try{sess.root.parentNode.removeChild(sess.root)}catch(e){}
  }
  var fn=completed?(sess.opt&&sess.opt.onDone):(sess.opt&&sess.opt.onStop);
  /* always fire onDone when completed, onStop when user/hidden; also onDone(false) ? */
  try{if(completed&&sess.opt&&typeof sess.opt.onDone==='function')sess.opt.onDone()}catch(e){}
  try{if(!completed&&sess.opt&&typeof sess.opt.onStop==='function')sess.opt.onStop(sess.opt._reason||'stop')}catch(e){}
}

function stop(opts){
  opts=opts||{};
  if(!st)return;
  if(opts.silent){
    var sess=st; st=null;
    try{if(sess.raf)cancelAnimationFrame(sess.raf)}catch(e){}
    try{document.removeEventListener('visibilitychange',onVis);document.removeEventListener('pagehide',onVis)}catch(e){}
    if(sess.audio)killAudio(sess,opts.fade||.2);
    if(sess.created&&sess.root&&sess.root.parentNode){
      try{sess.root.parentNode.removeChild(sess.root)}catch(e){}
    }
    return;
  }
  if(st.stopping)return;
  st.stopping=true;
  st.opt=st.opt||{};
  st.opt._reason=opts.reason||'stop';
  st.stopAt=performance.now();
  killAudio(st,opts.fade==null?STOP_FADE:opts.fade);
  if(!st.raf)st.raf=requestAnimationFrame(tick);
}

function setCues(on){
  if(!st)return;
  st.cues=!!on;
  if(st.root){
    st.root.classList.toggle('lb128-nocues',!st.cues);
    var b=st.root.querySelector('.lb128-cuesbtn');
    if(b)b.textContent=t128(st.cues?'Hide words':'Show words',st.opt);
    paintUI(st);
  }
}
function setQuiet(on){
  quiet=!!on;
  if(st&&quiet&&st.audio)killAudio(st,.4);
  if(st&&!quiet&&isSoundOn()&&st.opt&&st.opt.sound!==false&&!st.audio&&!st.stopping&&!st.endedAt){
    /* remaining time: rebuild from now — simpler to leave muted until next start */
  }
}
function setVolume(v){
  vol=Math.max(0,Math.min(1,+v||0));
  /* live sessions keep the scheduled curve; volume applies on next start.
     For a running session, scale the master if we can hold and rescale. */
  if(st&&st.audio&&st.audio.master){
    /* can't safely rescale a fully scheduled curve without cancel; leave for next start */
  }
}

function isRunning(){return !!st}

var PICKER_LABELS={short:'About 1 minute',normal:'About 2 minutes',long:'About 3 minutes'};
function mountPicker(parent,opt){
  opt=opt||{};
  if(!parent||typeof document==='undefined')return null;
  css128();
  var existing=parent.querySelector('.lb128-picker-wrap')||parent.querySelector('.lb128-picker');
  if(existing)existing.parentNode.removeChild(existing);
  var sel=opt.selected||opt.length||'normal';
  if(!LENGTHS[sel])sel='normal';
  var wrap=document.createElement('div');
  wrap.className='lb128-picker-wrap';
  var heading=document.createElement('div');
  heading.className='lb128-picker-label';
  heading.id='lb128-how-long';
  heading.textContent=t128('How long?',opt);
  var group=document.createElement('div');
  group.className='lb128-picker';
  group.setAttribute('role','radiogroup');
  group.setAttribute('aria-labelledby','lb128-how-long');
  group.setAttribute('aria-label',t128('How long?',opt));
  ['short','normal','long'].forEach(function(L){
    var b=document.createElement('button');
    b.type='button';
    b.setAttribute('role','radio');
    b.setAttribute('data-lb-length',L);
    b.setAttribute('aria-checked',L===sel?'true':'false');
    if(L===sel)b.classList.add('on');
    b.textContent=t128(PICKER_LABELS[L],opt);
    b.addEventListener('click',function(e){
      if(e){e.preventDefault();e.stopPropagation()}
      sel=L;
      group.querySelectorAll('button').forEach(function(x){
        var on=x.getAttribute('data-lb-length')===sel;
        x.setAttribute('aria-checked',on?'true':'false');
        x.classList.toggle('on',on);
      });
      if(typeof opt.onPick==='function')try{opt.onPick(L)}catch(err){}
    });
    group.appendChild(b);
  });
  wrap.appendChild(heading);
  wrap.appendChild(group);
  parent.appendChild(wrap);
  return {
    el:group, wrap:wrap, label:heading,
    get:function(){return sel},
    set:function(L){
      if(!LENGTHS[L])return sel;
      sel=L;
      group.querySelectorAll('button').forEach(function(x){
        var on=x.getAttribute('data-lb-length')===sel;
        x.setAttribute('aria-checked',on?'true':'false');
        x.classList.toggle('on',on);
      });
      return sel;
    },
    relabel:function(o){
      var lab=t128('How long?',o||opt);
      heading.textContent=lab;
      group.setAttribute('aria-label',lab);
      group.querySelectorAll('button').forEach(function(x){
        var L=x.getAttribute('data-lb-length');
        x.textContent=t128(PICKER_LABELS[L],o||opt);
      });
    }
  };
}

/* public — same surface as v128 / live v129-breathing, plus length helpers */
var API={
  start:start,
  stop:stop,
  isRunning:isRunning,
  setCues:setCues,
  setQuiet:setQuiet,
  setVolume:setVolume,
  getVolume:function(){return vol},
  isQuiet:function(){return quiet},
  reduced:isReduced,
  soundOn:isSoundOn,
  t:t128,
  STRINGS:STR,
  makeTimeline:makeTimeline,
  stateAt:stateAt,
  gainAt:gainAt,
  freqAt:freqAt,
  lpAt:lpAt,
  resolveDuration:resolveDuration,
  mountPicker:mountPicker,
  LENGTHS:LENGTHS,
  PARAM:{IN0:IN0,OUT0:OUT0,SLOW:SLOW,FADE_CYCLES:FADE_CYCLES,FADE_IN:FADE_IN,STOP_FADE:STOP_FADE,
    DUR:DUR,F0:F0,F_LIFT:F_LIFT,G_SWELL:G_SWELL,MASTER:MASTER,LP_LO:LP_LO,LP_HI:LP_HI,LP_Q:LP_Q,
    PARTS:PARTS,GLOW_TROUGH:GLOW_TROUGH,GLOW_AMP:GLOW_AMP,GLOW_SCALE:GLOW_SCALE,
    SPILL_TROUGH:SPILL_TROUGH,SPILL_AMP:SPILL_AMP,REDUCE_GLOW:REDUCE_GLOW,REDUCE_SPILL:REDUCE_SPILL,
    LENGTHS:LENGTHS,LADDER:LADDER,CHIME_G:CHIME_G,CHIME_ATT:CHIME_ATT,CHIME_REL:CHIME_REL,CHIME_OCT:CHIME_OCT},
  version:129,
  css:css128,
  mount:mountUI
};
root.LampBreathing=API;
if(typeof module!=='undefined'&&module.exports)module.exports=API;
})(typeof window!=='undefined'?window:(typeof globalThis!=='undefined'?globalThis:this));
/* v129: Candle mode (Art Director tokens) + Merian Plate 11 + end-of-fade
   Lamp Breathing offer (Studio). CSS-first and tiny. Does not wrap show().
   No mic, no network. Local grown-up toggle only. */
(function(){
'use strict';

function candleCss129(){
  if(document.getElementById('v129css'))return;
  const st=document.createElement('style');
  st.id='v129css';
  st.textContent=[
    'html.ll-candle #pstudio,html.ll-candle body.bedtime,html.ll-candle #btwrap{background:var(--ll-night,#140C08)}',
    'html.ll-candle,html.ll-candle body{transition:background .8s ease,color .8s ease}',
    '#candle{margin:0;padding:0}',
    '.candle-root129{position:relative;min-height:70vh;background:var(--ll-night,#140C08);color:var(--ll-warm,#F3E0B8);border-radius:16px;overflow:hidden;padding:24px 16px 32px}',
    '.candle-sky129{position:absolute;inset:0;background:var(--ll-dusk,#22180C);pointer-events:none}',
    '.candle-stage129{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:12px}',
    '.candle-lamp129{width:min(220px,70vw);min-height:160px}',
    '.candle-line129{text-align:center;max-width:28em;color:var(--ll-warm,#F3E0B8)}',
    '.candle-actions129{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center}',
    '.candle-actions129 button,[data-candle129] button{min-width:56px;min-height:56px;padding:12px 16px}',
    '#candle .lamp73-shell{filter:brightness(calc(0.82 + 0.28 * var(--lb-k, 0.5)));opacity:calc(0.42 + 0.58 * var(--lb-dim, 1));transform-origin:50% 70%}',
    '.reduce73 .ll-candle .il-h,.reduce73 .ll-candle .il-c,.reduce73.ll-candle .il-h,.reduce73.ll-candle .il-c,.reduce73 .ll-wind .ll-dim{animation:none!important}',
    '.reduce73 .ll-wind .ll-dim{opacity:.55}',
    '@media (prefers-reduced-motion:reduce){#candle .lamp73-shell{filter:brightness(.96);opacity:.7}}',
    '.reduce73 #candle .lamp73-shell{filter:brightness(.96);opacity:.7}',
    'html.ll-candle,html.ll-candle body{background:var(--bg);color:var(--ink)}',
    '#candleHideWords129{min-width:56px;min-height:56px;padding:12px 16px;margin:0}',
    '#candle .lamp73-shell.candle-tappable129{cursor:pointer}'
  ].join('');
  document.head.appendChild(st);
}
const KEY129='lamp_candle129';
const FADE129={120:1,180:1,300:1};
let windT129=0, volT129=0, dimEl129=null;

function candleLoad129(){
  const raw=typeof safeJSON==='function'?safeJSON((typeof RAW!=='undefined'&&RAW.get(KEY129)),null):null;
  const on=!!(raw&&raw.on), fade=FADE129[raw&&raw.fade]?raw.fade:180;
  return {on,fade};
}
function candleSave129(s){
  try{RAW.set(KEY129,JSON.stringify({on:!!s.on,fade:FADE129[s.fade]?s.fade:180}))}catch(e){}
}
function candleOn129(){return candleLoad129().on}
function candleFadeSec129(){return candleLoad129().fade}

function candleApply129(){
  const s=candleLoad129(), html=document.documentElement, st=html.style;
  html.classList.toggle('ll-candle',s.on);
  st.setProperty('--ll-fade',s.fade+'s');
  st.setProperty('--ll-breath','10s');
  if(s.on){
    const bg='#E8D4A8', ink='#2A2218';
    st.setProperty('--bg',bg);
    st.setProperty('--card','#F0E0B8');
    st.setProperty('--ink',ink);
    st.setProperty('--soft','#6A5A40');
    st.setProperty('--acc','#5A6A48');
    st.setProperty('--hi','#C47A00');
    /* applyLook writes inline html/body backgrounds; replace those so Home warms too. */
    html.style.background=bg;
    if(document.body){document.body.style.backgroundColor=bg;document.body.style.color=ink}
  }else{
    try{if(typeof applyLook==='function')applyLook()}catch(e){}
    candleStopWind129(true);
    candleStopBreath129();
  }
}

function candleReduced129(){
  try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
  try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return true}catch(e){}
  return false;
}

function candleLampEl129(){return document.querySelector('#candle .lamp73-shell')||$('candleLamp129')}

function candleTickCues129(s){
  const line=$('candleLine129');if(!line)return;
  const show=window._candleCues129!==false, reduced=candleReduced129();
  if(s&&s.done){line.textContent=candleT129('Good night');return}
  if(!show||reduced){line.textContent='';return}
  line.textContent=candleT129((s&&s.cue)||'breathe in…');
}

function candleToggleCues129(){
  const on=window._candleCues129!==false;
  window._candleCues129=!on;
  try{if(typeof LampBreathing!=='undefined'&&LampBreathing.setCues)LampBreathing.setCues(!on)}catch(e){}
  const btn=$('candleHideWords129');
  if(btn)btn.textContent=candleT129(!on?'Hide words':'Show words');
  const line=$('candleLine129');
  if(line&&on)line.textContent='';
}

function candleAttachBreathUI129(){
  const lamp=candleLampEl129();
  if(lamp&&!lamp._tap129){
    const go=function(e){if(e){e.preventDefault();e.stopPropagation()}try{if(typeof LampBreathing!=='undefined')LampBreathing.stop({reason:'tap'})}catch(err){}};
    const key=function(e){if(e&&(e.key==='Enter'||e.key===' '))go(e)};
    lamp._tap129=go;lamp._key129=key;
    lamp.addEventListener('click',go);
    lamp.addEventListener('keydown',key);
    if(!lamp.hasAttribute('tabindex'))lamp.setAttribute('tabindex','0');
    lamp.setAttribute('role','button');
    lamp.setAttribute('aria-label',candleT129('Tap the lamp or Done to stop.'));
    lamp.classList.add('candle-tappable129');
  }
  let btn=$('candleHideWords129');
  if(!btn){
    btn=document.createElement('button');
    btn.type='button';
    btn.id='candleHideWords129';
    btn.textContent=candleT129('Hide words');
    const line=$('candleLine129');
    if(line&&line.parentNode)line.parentNode.insertBefore(btn,line.nextSibling);
    else{const stage=$('candleStage129');if(stage)stage.appendChild(btn)}
    btn.onclick=function(e){if(e)e.stopPropagation();candleToggleCues129()};
  }
  btn.hidden=false;
  window._candleCues129=true;
  const line=$('candleLine129');
  if(line)line.textContent=candleReduced129()?'':candleT129('breathe in…');
}

function candleDetachBreathUI129(){
  const lamp=candleLampEl129();
  if(lamp&&lamp._tap129){
    lamp.removeEventListener('click',lamp._tap129);
    if(lamp._key129)lamp.removeEventListener('keydown',lamp._key129);
    lamp.classList.remove('candle-tappable129');
    lamp.removeAttribute('role');
    lamp.removeAttribute('aria-label');
    delete lamp._tap129;delete lamp._key129;
  }
  const btn=$('candleHideWords129');
  if(btn)btn.hidden=true;
}

function candleStopBreath129(){
  try{if(typeof LampBreathing!=='undefined')LampBreathing.stop({fade:0.08})}catch(e){}
  try{candleDetachBreathUI129()}catch(e){}
}

function candleStopWind129(silent){
  if(windT129){clearTimeout(windT129);windT129=0}
  if(volT129){clearTimeout(volT129);volT129=0}
  if(dimEl129){dimEl129.removeEventListener('animationend',candleOffer129);dimEl129=null}
  const el=$('candle');
  if(el)el.classList.remove('ll-wind','candle-offer129');
  if(!silent){/* keep palette */}
}

function candleEnsure129(){
  if(!$('candle')&&document.querySelector('main'))
    document.querySelector('main').insertAdjacentHTML('beforeend','<section id="candle" class="hidden"></section>');
  try{if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('candle')<0)SECTIONS.push('candle')}catch(e){}
}

function candleT129(k){return typeof gT==='function'?gT(k):k}

function renderCandle129(){
  candleCss129();candleEnsure129();
  const el=$('candle');if(!el)return;
  const s=candleLoad129();
  if(!s.on){candleSave129({on:true,fade:s.fade});candleApply129()}
  el.innerHTML=`<div class="candle-root129 ll-wind" id="candleRoot129">
    <div class="candle-sky129 ll-dim" id="candleDim129"></div>
    <div class="candle-stage129" id="candleStage129">
      <div class="candle-lamp129" data-lamp73-slot="candle" id="candleLamp129"></div>
      <p class="soft candle-line129" id="candleLine129">${esc(candleT129('A slow wind-down. The lamp breathes with you, then the light goes to night.'))}</p>
      <div class="candle-actions129">
        <button type="button" class="p candle-offer129" id="candleOffer129" hidden>${esc(candleT129('Breathe with the Lamp'))}</button>
        <button type="button" id="candleNight129">${esc(candleT129('Good night'))}</button>
        <button type="button" id="candleHome129">${esc(candleT129('Done'))}</button>
      </div>
    </div>
  </div>`;
  try{if(typeof lampMount73==='function')lampMount73($('candleLamp129'),'candle')}catch(e){}
  const offer=$('candleOffer129'), night=$('candleNight129'), home=$('candleHome129');
  if(offer)offer.onclick=function(){candleStartBreath129()};
  if(night)night.onclick=function(){candleGoodNight129()};
  if(home)home.onclick=function(){candleStopBreath129();candleStopWind129();show('hub')};
  candleStartWind129();
}

function candleStartWind129(){
  candleStopWind129();
  const root=$('candleRoot129')||$('candle');if(!root)return;
  root.classList.add('ll-wind');
  const dim=$('candleDim129');dimEl129=dim;
  const reduce=candleReduced129();
  const ms=candleFadeSec129()*1000;
  if(reduce){
    root.classList.add('reduce73');
    if(dim)dim.style.opacity='.55';
    windT129=setTimeout(candleOffer129, 1600);
  }else{
    if(dim){
      dim.addEventListener('animationend', candleOffer129, {once:true});
    }
    windT129=setTimeout(candleOffer129, ms+80);
    volT129=setTimeout(candleSoftVol129, ms*0.75);
  }
}

function candleSoftVol129(){
  // About 6 dB quieter for the dim-out act. Never close the shared context.
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
    const now=(typeof AC!=='undefined'&&AC&&AC.currentTime)||0;
    const bus=(typeof BT==='object'&&BT&&BT.master)||null;
    if(bus&&bus.gain){
      const cur=typeof bus.gain.value==='number'?bus.gain.value:0.18;
      if(bus.gain.setTargetAtTime)bus.gain.setTargetAtTime(cur*0.5,now,1);
      else bus.gain.value=cur*0.5;
      return;
    }
    document.querySelectorAll('audio').forEach(a=>{try{a.volume=Math.max(0,(a.volume||1)*0.5)}catch(e){}});
  }catch(e){}
}

function candleOffer129(){
  if(windT129){clearTimeout(windT129);windT129=0}
  const el=$('candle');if(el)el.classList.add('candle-offer129');
  const offer=$('candleOffer129'), line=$('candleLine129');
  if(offer){offer.hidden=false;try{offer.focus()}catch(e){}}
  if(line)line.textContent=candleT129('Breathe with the Lamp');
}

function candleStartBreath129(){
  const offer=$('candleOffer129');if(offer)offer.hidden=true;
  const lamp=document.querySelector('#candle .lamp73-shell')||$('candleLamp129');
  const host=$('candleRoot129')||$('candle');
  if(typeof LampBreathing==='undefined'||typeof LampBreathing.start!=='function'){
    candleGoodNight129();
    return;
  }
  const ok=LampBreathing.start({
    host:host,
    glowEl:lamp,
    paint:false,
    cues:true,
    tapToStop:true,
    sound:true,
    length:(function(){const h=document.getElementById('candlePicker131');return (h&&h._lbPicker&&h._lbPicker.get())||'normal'})(),
    reduced:candleReduced129()?true:null,
    onTick:candleTickCues129,
    onDone:function(){try{candleDetachBreathUI129()}catch(e){}candleGoodNight129()},
    onStop:function(){try{candleDetachBreathUI129()}catch(e){}}
  });
  if(!ok)candleGoodNight129();
  else candleAttachBreathUI129();
}

function candleGoodNight129(){
  candleStopBreath129();
  const line=$('candleLine129'), offer=$('candleOffer129');
  if(offer)offer.hidden=true;
  if(line)line.textContent=candleT129('Good night');
}

function candleSizeLook129(root){
  (root||document).querySelectorAll('[data-candle129] button').forEach(b=>{b.style.minWidth='56px';b.style.minHeight='56px';b.style.padding='12px 16px'});
}
function candleLookCard129(){
  const root=$('look');if(!root)return;
  if(root.querySelector('[data-candle129]')){candleSizeLook129(root);return;}
  const s=candleLoad129();
  const btn=function(fade,label){
    return `<button type="button" class="${s.fade===fade?'p':''}" data-fade129="${fade}" aria-pressed="${s.fade===fade}">${candleT129(label)}</button>`;
  };
  root.insertAdjacentHTML('beforeend', `<div class="card" data-candle129>
    <h3>${esc(candleT129('Candle mode'))}</h3>
    <p class="soft">${esc(candleT129('A warm amber bedtime palette, with less blue. A slow dim can begin after a story or a song, then you can breathe with the lamp.'))}</p>
    <p><button type="button" class="p" data-candle129-on aria-pressed="${s.on}">${esc(candleT129('On'))}</button> <button type="button" data-candle129-off aria-pressed="${!s.on}">${esc(candleT129('Off'))}</button></p>
    <p class="soft">${esc(candleT129('Wind-down length'))}</p>
    <p>${btn(120,'2 minutes')} ${btn(180,'3 minutes')} ${btn(300,'5 minutes')}</p>
    <p><button type="button" class="p" data-candle129-go>${esc(candleT129('Begin wind-down'))}</button></p>
  </div>`);
  const card=root.querySelector('[data-candle129]');
  card.querySelector('[data-candle129-on]').onclick=function(){candleSave129({on:true,fade:candleFadeSec129()});candleApply129();if(typeof renderLook==='function')renderLook()};
  card.querySelector('[data-candle129-off]').onclick=function(){candleSave129({on:false,fade:candleFadeSec129()});candleApply129();if(typeof renderLook==='function')renderLook()};
  card.querySelectorAll('[data-fade129]').forEach(b=>{
    b.onclick=function(){candleSave129({on:candleOn129()||true,fade:+b.getAttribute('data-fade129')});candleApply129();if(typeof renderLook==='function')renderLook()};
  });
  card.querySelector('[data-candle129-go]').onclick=function(){
    if(!candleOn129()){candleSave129({on:true,fade:candleFadeSec129()});candleApply129()}
    show('candle');
  };
  try{if(typeof artRefresh63==='function')artRefresh63(card)}catch(e){}
  candleSizeLook129(root);
}

function candleMaybeWind129(){
  if(!candleOn129())return;
  try{show('candle')}catch(e){}
}

function candleCaption129(){
  if(typeof patWindShow106!=='function')return;
  const prev=patWindShow106;
  patWindShow106=function(i,instant){
    const r=prev.apply(this,arguments);
    try{
      const items=(typeof patWindVisible109==='function')?patWindVisible109(PAT106.windAll109||PAT106.windItems||[]):(PAT106.windItems||[]);
      const n=items.length;if(!n)return r;
      const idx=((i%n)+n)%n, it=items[idx]||items[PAT106.windI||0];
      if(!it)return r;
      const L=(typeof LANG==='string'&&LANG==='es')?'es':'en';
      const cap=L==='es'?(it.caption_es||it.caption_en||''):(it.caption_en||it.caption_es||'');
      let p=$('patWindCaption106');
      const credit=$('patWindCredit106');
      if(!p&&credit&&credit.parentNode){
        p=document.createElement('p');
        p.className='soft';p.id='patWindCaption106';
        credit.parentNode.insertBefore(p, credit);
      }
      if(p){p.textContent=cap;p.hidden=!cap}
    }catch(e){}
    return r;
  };
}

// hooks — do not wrap show()
if(typeof pWrap68==='function'){
  pWrap68('applyLook',null,()=>{if(candleOn129())candleApply129()});
  pWrap68('renderLook',null,candleLookCard129);
  pWrap68('finish',null,candleMaybeWind129);
}
if(typeof renderLook==='function'&&typeof RENDER==='object')RENDER.look=renderLook;
if(typeof applyLook==='function'&&typeof pWrap68!=='function'){
  const al=applyLook;applyLook=function(){const r=al.apply(this,arguments);if(candleOn129())candleApply129();return r};
}
if(typeof kwRun93==='function'){
  const kw=kwRun93;
  kwRun93=function(times,t0,d,done){
    return kw(times,t0,d,function(){try{if(typeof done==='function')done()}finally{candleMaybeWind129()}});
  };
}
const _after129=typeof afterShow95==='function'?afterShow95:null;
afterShow95=function(id){
  if(_after129)try{_after129(id)}catch(e){}
  try{if(id==='look')candleLookCard129()}catch(e){}
  try{if(id!=='candle'){candleStopBreath129();candleStopWind129()}}catch(e){}
};
candleEnsure129();
if(typeof RENDER==='object')RENDER.candle=renderCandle129;
candleCaption129();
window.LampCandle129={apply:candleApply129,offer:candleOffer129,startWind:candleStartWind129,startBreath:candleStartBreath129,stopBreath:candleStopBreath129,goodNight:candleGoodNight129,on:candleOn129,load:candleLoad129,save:candleSave129,render:renderCandle129};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',candleApply129);
else candleApply129();
})();
