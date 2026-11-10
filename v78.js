// v78: Look Closer art quality pass. Original SVG, studied from public canonical illusions, not copied.
function lcHex78(r,g,b){const h=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0');return '#'+h(r)+h(g)+h(b)}
function lcRgb78(hex){const n=parseInt(String(hex).slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]}
function lcMul78(hex,f){const [r,g,b]=lcRgb78(hex);return lcHex78(r*f,g*f,b*f)}
const LC78={lit:'#f0dfb8',shade:0.55};
LC78.same=lcMul78(LC78.lit,LC78.shade);
LC78.deep=lcMul78(LC78.same,LC78.shade);

function lcArtSquares75(){
 const s=26,x0=16,y0=44,cols=10,rows=7,aR=3,aC=2,bR=3,bC=6,lit=LC78.lit,same=LC78.same;
 let a={x:0,y:0},b={x:0,y:0},cells='';
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const x=x0+c*s,y=y0+r*s,light=((r+c)%2===0);
  if(r===aR&&c===aC){a={x,y};continue}
  if(r===bR&&c===bC){b={x,y};continue}
  cells+=`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${light?lit:same}"/>`;
 }
 const boardW=cols*s,boardH=rows*s,cylX=x0+boardW-28,cylTop=y0+8,cylH=78,cylR=28,baseY=cylTop+cylH;
 return `<defs>
  <clipPath id="lc78board"><rect x="${x0-2}" y="${y0-2}" width="${boardW+8}" height="${boardH+18}" rx="2"/></clipPath>
  <linearGradient id="lc78cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c4b086"/><stop offset=".35" stop-color="#f3e2b3"/><stop offset="1" stop-color="#efe0c0"/></linearGradient>
  <filter id="lc78blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
 </defs>
 ${cells}
 <g clip-path="url(#lc78board)" style="mix-blend-mode:multiply" pointer-events="none">
  <path filter="url(#lc78blur)" d="M${cylX-cylR+4} ${baseY-6}
    C ${cylX-70} ${baseY+4}, ${cylX-120} ${baseY+18}, ${x0+86} ${y0+128}
    C ${x0+50} ${y0+150}, ${x0+48} ${y0+boardH+4}, ${x0+120} ${y0+boardH+2}
    L ${cylX+cylR-2} ${y0+boardH-8}
    L ${cylX+cylR-4} ${baseY+4}
    C ${cylX+8} ${baseY+10}, ${cylX-10} ${baseY+2}, ${cylX-cylR+4} ${baseY-6} Z" fill="#8c8c8c"/>
 </g>
 <g class="lc78-cyl">
  <rect x="${cylX-cylR}" y="${cylTop}" width="${cylR*2}" height="${cylH}" fill="url(#lc78cyl)" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="${cylX}" cy="${baseY}" rx="${cylR}" ry="11" fill="#d9c49a" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="${cylX}" cy="${cylTop}" rx="${cylR}" ry="13" fill="#f7ead0" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="${cylX-7}" cy="${cylTop-3}" rx="9" ry="3.4" fill="#fff8e8" opacity=".75"/>
 </g>
 <rect data-sq="A" x="${a.x}" y="${a.y}" width="${s}" height="${s}" fill="${same}"/>
 <rect data-sq="B" x="${b.x}" y="${b.y}" width="${s}" height="${s}" fill="${same}"/>
 <g data-reveal="bar" class="lc75-motion lc75-bar"><rect x="${a.x}" y="${a.y+5}" width="${(b.x+s)-a.x}" height="16" rx="3" fill="${same}" stroke="${LC_LINE}" stroke-width="1.2"/><text x="${(a.x+b.x+s)/2}" y="${a.y+17}" text-anchor="middle" font-size="11" fill="${LC_INK}">${esc(gT('same color'))}</text></g>
 <text x="${a.x+s/2}" y="${a.y+s/2+5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff8e8">${esc('A')}</text>
 <text x="${b.x+s/2}" y="${b.y+s/2+5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff8e8">${esc('B')}</text>`}
function lcArtArrows75(){
 const x1=74,x2=274,len=x2-x1;
 const ticks=n=>{let s=`<line x1="${x1}" y1="${n+5}" x2="${x2}" y2="${n+5}" stroke="${LC_LINE}" stroke-width="1.6"/>`;for(let i=0;i<=10;i++)s+=`<line x1="${x1+i*(len/10)}" y1="${n}" x2="${x1+i*(len/10)}" y2="${n+10}" stroke="${LC_LINE}" stroke-width="${i%5?1.2:2}"/>`;return s};
 return `<g stroke="${LC_LINE}" stroke-linecap="round" fill="none">
  <line data-shaft="top" x1="${x1}" y1="78" x2="${x2}" y2="78" stroke-width="4.5"/>
  <path data-hide="tips" d="M${x1} 78 L${x1-30} 54 M${x1} 78 L${x1-30} 102 M${x2} 78 L${x2+30} 54 M${x2} 78 L${x2+30} 102" stroke-width="4.5"/>
  <line data-shaft="bottom" x1="${x1}" y1="168" x2="${x2}" y2="168" stroke-width="4.5"/>
  <path data-hide="tips" d="M${x1} 168 L${x1+30} 144 M${x1} 168 L${x1+30} 192 M${x2} 168 L${x2-30} 144 M${x2} 168 L${x2-30} 192" stroke-width="4.5"/>
 </g>
 <g data-reveal="ruler" class="lc75-motion lc75-fadein" fill="${LC_INK}">
  ${ticks(94)}${ticks(184)}
  <text x="174" y="128" text-anchor="middle" font-size="12">${esc(gT('same length'))}</text>
 </g>`}

function lcArtDuck75(){
 const fill='#e6c78a',line=LC_LINE;
 const body=`M54 92
  C 108 80, 156 86, 198 108
  C 214 84, 240 70, 268 74
  C 302 78, 322 102, 322 130
  C 322 152, 310 168, 294 176
  C 286 178, 280 170, 282 160
  C 284 174, 276 192, 250 200
  C 226 208, 206 196, 196 180
  C 150 172, 104 166, 56 160
  C 42 158, 40 148, 56 146
  C 108 150, 156 146, 196 142
  C 186 134, 128 126, 58 120
  C 42 118, 40 102, 54 92 Z`;
 return `<path d="${body}" fill="${fill}" stroke="${line}" stroke-width="3.6" stroke-linejoin="round"/>
  <circle cx="228" cy="120" r="8.4" fill="${LC_INK}"/>
  <circle cx="230.6" cy="117.4" r="2.6" fill="#fff8e8"/>
  <g data-reveal="beak" class="lc75-motion lc75-trace">
    <path d="M54 92 C108 80, 156 86, 198 108 M58 120 C128 126, 186 134, 196 142" fill="none" stroke="#c9893a" stroke-width="3.4" stroke-linecap="round"/>
    <text x="62" y="72" font-size="14" font-weight="700" fill="${LC_INK}">${esc(gT('duck: beak'))}</text>
  </g>
  <g data-reveal="ears" class="lc75-motion lc75-trace2">
    <path d="M54 92 C108 80, 156 86, 198 108 M58 120 C128 126, 186 134, 196 142 M56 146 C108 150, 156 146, 196 142 M56 160 C104 166, 150 172, 196 180" fill="none" stroke="#5b7a6a" stroke-width="3.4" stroke-linecap="round"/>
    <text x="62" y="226" font-size="14" font-weight="700" fill="${LC_INK}">${esc(gT('rabbit: ears'))}</text>
  </g>`}

function lcRing75(cx,cy,r,fill,cls=''){return `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${LC_LINE}" stroke-width="2"/>`}
function lcArtFriends75(){
 const mid=22,left=[],right=[];
 for(let i=0;i<6;i++){const a=(-90+i*60)*Math.PI/180;left.push(lcRing75(98+Math.cos(a)*64,128+Math.sin(a)*64,33,LC_SAGE,'lc75-drift lc75-motion'))}
 for(let i=0;i<8;i++){const a=(-90+i*45)*Math.PI/180;right.push(lcRing75(262+Math.cos(a)*32,128+Math.sin(a)*32,9,LC_CREAM,'lc75-drift lc75-motion'))}
 return `${left.join('')}${right.join('')}${lcRing75(98,128,mid,LC_GOLD,'lc78-mid')}${lcRing75(262,128,mid,LC_GOLD,'lc78-mid')}
  <text x="98" y="232" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Left'))}</text>
  <text x="262" y="232" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Right'))}</text>`}

function lcArtTracks75(){
 return `<g data-hide="tracks" class="lc75-motion" stroke="${LC_LINE}" fill="none">
   <path d="M64 240 L172 18" stroke-width="4.2" stroke-linecap="round"/>
   <path d="M296 240 L188 18" stroke-width="4.2" stroke-linecap="round"/>
   <path d="M88 214 L272 214 M104 180 L256 180 M120 146 L240 146 M136 112 L224 112 M152 78 L208 78 M164 48 L196 48" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g fill="#c9893a" stroke="${LC_LINE}" stroke-width="2">
    <rect data-bar="top" x="126" y="68" width="108" height="14" rx="3"/>
    <rect data-bar="bottom" x="126" y="204" width="108" height="14" rx="3"/>
  </g>`}

function lcPac78(cx,cy,r,deg,cls){
 const rad=d=>d*Math.PI/180,a0=rad(deg-30),a1=rad(deg+30);
 const x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
 return `<path class="lc75-pac lc75-motion lc78-pac ${cls||''}" d="M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 1 0 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${LC_INK}"/>`}
function lcArtTriangle75(){
 const s=156,topX=180,topY=64,h=s*Math.sqrt(3)/2;
 const L={x:topX-s/2,y:topY+h},R={x:topX+s/2,y:topY+h},T={x:topX,y:topY};
 const C={x:(T.x+L.x+R.x)/3,y:(T.y+L.y+R.y)/3};
 const ang=from=>(Math.atan2(C.y-from.y,C.x-from.x)*180/Math.PI);
 const r=42,pts=`${T.x.toFixed(1)},${T.y.toFixed(1)} ${L.x.toFixed(1)},${L.y.toFixed(1)} ${R.x.toFixed(1)},${R.y.toFixed(1)}`;
 return `${lcPac78(T.x,T.y,r,ang(T),'lc78-pac-t')}${lcPac78(L.x,L.y,r,ang(L),'lc78-pac-l')}${lcPac78(R.x,R.y,r,ang(R),'lc78-pac-r')}
  <polygon data-reveal="tri" class="lc75-motion lc75-kan-outline" points="${pts}" fill="none" stroke="#c9893a" stroke-width="3.2" stroke-linejoin="round"/>`}

function lcArtVase75(){
 const d=lcVasePath78(lcVaseRight78());
 return `<rect class="lc75-vase-bg lc75-motion" x="24" y="16" width="312" height="228" rx="14" fill="#5d7460"/>
  <path class="lc75-vase lc75-motion" d="${d}" fill="#f3e4c4" stroke="${LC_LINE}" stroke-width="2.4" stroke-linejoin="round"/>
  <g data-hide="eyes" class="lc75-motion lc78-face-eye">
    <circle cx="236" cy="78" r="3.6" fill="#2a241c"/>
    <circle cx="124" cy="78" r="3.6" fill="#2a241c"/>
  </g>`}
function lcVaseRight78(){
 // Right silhouette of the vase = left-facing profile. The nose comes well inward so both faces read at a glance.
 return [
  ['M',180,26],
  ['C',200,24, 218,30, 230,46],
  ['C',240,60, 240,72, 232,82],
  ['C',226,88, 222,92, 224,96],
  ['C',210,104, 196,112, 186,120],
  ['C',200,124, 214,128, 210,134],
  ['C',200,138, 198,142, 206,146],
  ['C',218,152, 220,158, 214,164],
  ['C',232,174, 236,186, 226,198],
  ['C',216,210, 208,220, 206,228],
  ['C',214,236, 228,240, 238,246],
  ['L',180,246]
 ]}
function lcVasePath78(ops){
 const fmt=(cmd,pts)=>{
  if(cmd==='M'||cmd==='L')return cmd+pts[0]+' '+pts[1];
  if(cmd==='C')return 'C'+pts[0]+' '+pts[1]+' '+pts[2]+' '+pts[3]+' '+pts[4]+' '+pts[5];
  return '';
 };
 const flip=pts=>pts.map((n,i)=>i%2===0?(360-n):n);
 let d=ops.map(o=>fmt(o[0],o.slice(1))).join(' ');
 const rev=[];
 for(let i=ops.length-2;i>=0;i--){
  const o=ops[i],n=ops[i+1];
  if(n[0]==='C'){
   // previous cubic's end is o's end; reverse cubic: C prev-c2, prev-c1, prev-start
   const c2x=n[3],c2y=n[4],c1x=n[1],c1y=n[2];
   const sx=o[0]==='C'?o[5]:o[1],sy=o[0]==='C'?o[6]:o[2];
   rev.push(['C',c2x,c2y,c1x,c1y,sx,sy]);
  }else if(n[0]==='L'){
   const sx=o[0]==='C'?o[5]:o[1],sy=o[0]==='C'?o[6]:o[2];
   rev.push(['L',sx,sy]);
  }
 }
 d+=' '+rev.map(o=>fmt(o[0],flip(o.slice(1)))).join(' ')+' Z';
 return d}

function lcParaU78(){return [110,28]}
function lcParaV78(){return [32,70]}
function lcCorners78(o,u,v){return [o,[o[0]+u[0],o[1]+u[1]],[o[0]+u[0]+v[0],o[1]+u[1]+v[1]],[o[0]+v[0],o[1]+v[1]]]}
function lcPoly78(pts){return pts.map(p=>p[0]+','+p[1]).join(' ')}
function lcLegs78(corners,len){
 const cx=corners.reduce((s,p)=>s+p[0],0)/4;
 return corners.map(([x,y])=>{
  const sx=x+(x>=cx?6:-6), fy=Math.min(246,y+len);
  return `<path d="M${sx} ${y} L${sx} ${fy} M${sx-7} ${fy} L${sx+7} ${fy}" fill="none"/>`}).join('')}
function lcTableDraw78(corners,len){
 const top=`<polygon data-top="1" points="${lcPoly78(corners)}" fill="#e8c894" stroke="${LC_LINE}" stroke-width="2.2"/>`;
 const legs=`<g data-hide="legs" class="lc75-motion lc75-legs" stroke="${LC_LINE}" stroke-width="3" stroke-linecap="round">${lcLegs78(corners,len)}</g>`;
 return top+legs}
function lcArtTables75(){
 const u=lcParaU78(),v=lcParaV78(),uL=[-u[1],u[0]],vL=[-v[1],v[0]];
 const leftO=[138,20],rightO=[170,78],leg=52;
 const L=lcCorners78(leftO,uL,vL),R=lcCorners78(rightO,u,v);
 const overC=lcCorners78([102,86],u,v);
 const lx=(L[0][0]+L[1][0]+L[2][0]+L[3][0])/4,rx=(R[0][0]+R[1][0]+R[2][0]+R[3][0])/4;
 return `<g class="lc75-tables-over" data-reveal="over">${lcTableDraw78(overC,0)}
   <text x="180" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="${LC_INK}">${esc(gT('same size'))}</text></g>
  <g class="lc75-table-a">${lcTableDraw78(L,leg)}
   <text data-hide="label" class="lc75-motion" x="${lx}" y="250" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Left'))}</text></g>
  <g class="lc75-table-b">${lcTableDraw78(R,leg)}
   <text data-hide="label" class="lc75-motion" x="${rx}" y="250" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Right'))}</text></g>`}

function lcBananaPath78(){
 const cx=90,cy=130,r=62,R=108,a0=-62*Math.PI/180,a1=32*Math.PI/180;
 const ox=a=>(cx+R*Math.cos(a)).toFixed(2),oy=a=>(cy+R*Math.sin(a)).toFixed(2);
 const ix=a=>(cx+r*Math.cos(a)).toFixed(2),iy=a=>(cy+r*Math.sin(a)).toFixed(2);
 return `M${ox(a0)} ${oy(a0)} A${R} ${R} 0 0 1 ${ox(a1)} ${oy(a1)} L${ix(a1)} ${iy(a1)} A${r} ${r} 0 0 0 ${ix(a0)} ${iy(a0)} Z`}
function lcArtBanana75(){
 const d=lcBananaPath78();
 const shape=`<path data-banana="1" d="${d}" fill="#e6b454" stroke="${LC_LINE}" stroke-width="2.4" stroke-linejoin="round"/>`;
 return `<g class="lc75-ban-top lc75-motion">${shape}</g>
  <g class="lc75-ban-bot">${shape}</g>`}

function lcHint78(kind){
 const s=LC_LINE,f='#e6c78a',i=LC_INK;
 if(kind==='A duck')return `<svg class="lc75-hint" viewBox="0 0 52 24" width="52" height="24" aria-hidden="true"><ellipse cx="32" cy="16" rx="11" ry="6.2" fill="${f}" stroke="${s}" stroke-width="1.5"/><circle cx="20" cy="13" r="6.2" fill="${f}" stroke="${s}" stroke-width="1.5"/><path d="M15 11.5 L3 10 L4 15 L15 15 Z" fill="${f}" stroke="${s}" stroke-width="1.4" stroke-linejoin="round"/><circle cx="18.5" cy="12" r="1.5" fill="${i}"/><path d="M42 15 Q48 11 50 16" fill="none" stroke="${s}" stroke-width="1.4" stroke-linecap="round"/></svg>`;
 if(kind==='A rabbit')return `<svg class="lc75-hint" viewBox="0 0 52 24" width="52" height="24" aria-hidden="true"><path d="M18 14 C18 5 21 1 24 1 C26 1 27 7 26 13" fill="none" stroke="${s}" stroke-width="1.7" stroke-linecap="round"/><path d="M28 13 C28 6 31 1 34 1 C36 1 37 7 36 14" fill="none" stroke="${s}" stroke-width="1.7" stroke-linecap="round"/><ellipse cx="28" cy="17.5" rx="12" ry="5.6" fill="${f}" stroke="${s}" stroke-width="1.5"/><circle cx="34" cy="16.5" r="1.5" fill="${i}"/></svg>`;
 return ''}

function lcRender75(opts){
 const root=$('closer');if(!root)return;
 LC75.reduced=lcReduced75();
 if(!LC75.id){lcRenderList75(root);return}
 const item=lcItem75(LC75.id);
 const guessed=LC75.guess!=null,revealed=!!LC75.revealed,hold=!!(opts&&opts.hold);
 const choices=item.choices.map(c=>`<button type="button" class="lc75-choice${LC75.guess===c?' on':''}" data-lc-choice="${esc(c)}" aria-pressed="${LC75.guess===c}" ${revealed?'disabled':''}><span>${esc(gT(c))}</span>${item.id==='duck'?lcHint78(c):''}</button>`).join('');
 const measure=item.measure?`<p class="soft">${gT('Hold your finger up to the picture to compare, or drag this guide.')}</p>
  <p><button type="button" class="lc75-measure" data-lc-measure aria-pressed="${LC75.measure}">${gT('Measure with your finger')}</button></p>`:'';
 const line=revealed?`<div class="lc75-line" role="status"><p>${esc(gT(item.line))}</p><p class="lc75-motto">${esc(gT('Eyes make smart guesses.'))}</p><p class="soft">${esc(gT(item.reveal))}</p></div>`:'';
 const revealBtn=!revealed?`<p><button type="button" class="bigbtn p lc75-reveal" data-lc-reveal ${guessed?'':'disabled'}>${gT('Look closer')}</button></p>`:'';
 const next=revealed?`<p><button type="button" class="p" data-lc-next>${gT('Next picture')}</button> <button type="button" data-lc-list>${gT('All pictures')}</button></p>`:'';
 root.innerHTML=`<div class="card big lc75-card"><h2>${lcTileArt75()} ${gT(item.title)}</h2>`+`
  <p class="howto">${esc(gT(item.q))}</p>
  <div class="lc75-scene ${LC75.reduced?'reduce':''} ${revealed&&!hold?'revealed':''} ${LC75.measure?'measuring':''}" data-lc-id="${item.id}" data-lc-ms="${lcMs75(item)}">${lcPicture75(item)}
   ${LC75.measure?`<div class="lc75-guide" data-lc-guide style="left:${LC75.guide.x}%;top:${LC75.guide.y}%" role="slider" aria-label="${attr64(gT('Measuring guide'))}" tabindex="0"><span>${esc(gT('Guide'))}</span></div>`:''}
  </div>
  ${measure}
  <div class="lc75-choices" role="group" aria-label="${attr64(gT(item.q))}">${choices}</div>
  ${guessed&&!revealed?`<p class="soft">${gT('You chose {x}. Tap Look closer when you are ready.',{x:gT(LC75.guess)})}</p>`:''}
  ${revealBtn}${line}${next}
  <p><button type="button" data-lc-list>${gT('All pictures')}</button> <button type="button" onclick="show('hub')">${gT('Home')}</button></p></div>`;
 const scene=root.querySelector('.lc75-scene');
 if(revealed&&!hold)lcApplyReveal75(scene,item,true);
 lcBind75(root,item)}

document.head.insertAdjacentHTML('beforeend',`<style>
#closer .lc75-choice{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
#closer .lc75-hint{display:block;margin-top:2px}
#closer .lc75-table-move,#closer .lc75-table-a,#closer .lc75-table-b,#closer .lc75-table-rot{transform:none}
#closer .revealed[data-lc-id="tables"] .lc75-table-b,#closer .revealed[data-lc-id="tables"] .lc75-table-rot,#closer .revealed[data-lc-id="tables"] .lc75-table-a{transform:none}
#closer .revealed[data-lc-id="tables"] .lc75-table-a,#closer .revealed[data-lc-id="tables"] .lc75-table-b{opacity:0}
#closer .lc75-tables-over{opacity:0}
#closer .revealed[data-lc-id="tables"] .lc75-tables-over{opacity:1}
#closer .lc75-ban-top{transform:translate(22px,6px)}
#closer .lc75-ban-bot{transform:translate(22px,48px)}
#closer .revealed[data-lc-id="banana"] .lc75-ban-top{transform:translate(22px,48px)}
#closer .revealed[data-lc-id="triangle"] .lc75-pac.lc78-pac{transform:none;opacity:.38}
#closer .reduce.revealed[data-lc-id="triangle"] .lc75-pac.lc78-pac{opacity:0}
</style>`);
