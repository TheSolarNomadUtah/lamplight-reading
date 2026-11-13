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
