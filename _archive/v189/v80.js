// v80: Duck or Rabbit as original line art; Same-Color Squares B sits on a light cell in the shadow.
function lcMs75(item){
 if(item&&item.id==='duck')return lcReduced75()?1800:2200;
 return Math.max(800,lcReduced75()?800:item.ms||1000)}

function lcHint78(kind){return ''}

function lcArtDuck75(){
 // Studio cream line-art, head stretched into a Jastrow oval. Two leaves, thin gap,
 // eye just right of center, small nose bump + mouth + feather tufts. No fill.
 const sw=3;
 const outline=`M 181.13 102.53
  C 140 78, 90 62, 48 68
  C 30 72, 24 88, 40 96
  C 76 108, 118 116, 154 122
  C 164 124, 169 124, 170 126
  C 169 128, 164 130, 154 132
  C 120 140, 80 146, 46 152
  C 30 156, 28 170, 46 172
  C 88 174, 140 164, 179.31 147.13
  C 187.06 157.78, 200.42 166.35, 217.04 171.32
  C 224 186, 236 194, 250 194
  C 264 194, 274 186, 276.68 172.98
  C 289.54 169.98, 300.95 164.86, 309.75 158.14
  C 319.15 150.96, 325.21 142.24, 327.24 132.96
  C 334 132, 336 128, 334 124
  C 332 121, 329 119, 327.24 119.04
  C 325.21 109.76, 319.15 101.04, 309.75 93.86
  C 297.96 84.86, 281.6 78.8, 263.54 76.76
  C 245.49 74.72, 226.88 76.82, 211.0 82.7
  C 198.34 87.38, 187.99 94.25, 181.13 102.53 Z`;
 const upperSeam=`M 158 120 C 112 106, 76 94, 52 90`;
 const mouth=`M 324 136 C 326 142, 322 147, 316 149`;
 const tuft=`M 312 100 C 314 96, 318 94, 321 97 M 318 103 C 320 100, 324 99, 326 103`;
 const tintTop=`M 181.13 102.53 C 140 78, 90 62, 48 68 C 30 72, 24 88, 40 96 C 76 108, 118 116, 154 122 C 164 124, 169 124, 170 126 Z`;
 const tintBot=`M 170 126 C 169 128, 164 130, 154 132 C 120 140, 80 146, 46 152 C 30 156, 28 170, 46 172 C 88 174, 140 164, 179.31 147.13 Z`;
 return `<g class="lc80-ink" fill="none" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round">
  <path d="${outline}"/>
  <path d="${upperSeam}"/>
  <path d="${mouth}"/>
  <path d="${tuft}"/>
  <circle cx="268" cy="118" r="9"/>
 </g>
 <g class="lc80-tint-duck lc75-motion">
  <path d="${tintTop}" fill="#e6b454" fill-opacity=".4" stroke="none"/>
  <path d="${tintBot}" fill="#e6b454" fill-opacity=".4" stroke="none"/>
  <text x="20" y="36" font-size="14" font-weight="700" fill="currentColor">${esc(gT('duck: beak'))}</text>
 </g>
 <g class="lc80-tint-rabbit lc75-motion">
  <path d="${tintTop}" fill="#7d9574" fill-opacity=".4" stroke="none"/>
  <path d="${tintBot}" fill="#7d9574" fill-opacity=".4" stroke="none"/>
  <text x="20" y="246" font-size="14" font-weight="700" fill="currentColor">${esc(gT('rabbit: ears'))}</text>
 </g>`}

function lcArtSquares75(){
 const s=26,x0=16,y0=44,cols=10,rows=7,aR=3,aC=2,bR=3,bC=5,lit=LC78.lit,same=LC78.same;
 let a={x:0,y:0},b={x:0,y:0},cells='';
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const x=x0+c*s,y=y0+r*s,light=((r+c)%2===0);
  if(r===aR&&c===aC){a={x,y,light};continue}
  if(r===bR&&c===bC){b={x,y,light};continue}
  cells+=`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${light?lit:same}"/>`;
 }
 const boardW=cols*s,boardH=rows*s,cylX=x0+boardW-28,cylTop=y0+8,cylH=78,cylR=28,baseY=cylTop+cylH;
 return `<defs>
  <clipPath id="lc80board"><rect x="${x0-2}" y="${y0-2}" width="${boardW+8}" height="${boardH+18}" rx="2"/></clipPath>
  <linearGradient id="lc80cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c4b086"/><stop offset=".35" stop-color="#f3e2b3"/><stop offset="1" stop-color="#efe0c0"/></linearGradient>
  <filter id="lc80blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
 </defs>
 ${cells}
 <g clip-path="url(#lc80board)" style="mix-blend-mode:multiply" pointer-events="none">
  <path filter="url(#lc80blur)" d="M${cylX-cylR+4} ${baseY-6}
    C ${cylX-70} ${baseY+4}, ${cylX-120} ${baseY+18}, ${x0+86} ${y0+128}
    C ${x0+50} ${y0+150}, ${x0+48} ${y0+boardH+4}, ${x0+120} ${y0+boardH+2}
    L ${cylX+cylR-2} ${y0+boardH-8}
    L ${cylX+cylR-4} ${baseY+4}
    C ${cylX+8} ${baseY+10}, ${cylX-10} ${baseY+2}, ${cylX-cylR+4} ${baseY-6} Z" fill="#8c8c8c"/>
 </g>
 <g class="lc78-cyl">
  <rect x="${cylX-cylR}" y="${cylTop}" width="${cylR*2}" height="${cylH}" fill="url(#lc80cyl)" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="${cylX}" cy="${baseY}" rx="${cylR}" ry="11" fill="#d9c49a" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="${cylX}" cy="${cylTop}" rx="${cylR}" ry="13" fill="#f7ead0" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="${cylX-7}" cy="${cylTop-3}" rx="9" ry="3.4" fill="#fff8e8" opacity=".75"/>
 </g>
 <rect data-sq="A" data-cell="${a.light?'light':'dark'}" x="${a.x}" y="${a.y}" width="${s}" height="${s}" fill="${same}"/>
 <rect data-sq="B" data-cell="${b.light?'light':'dark'}" x="${b.x}" y="${b.y}" width="${s}" height="${s}" fill="${same}"/>
 <g data-reveal="bar" class="lc75-motion lc75-bar"><rect x="${a.x}" y="${a.y+5}" width="${(b.x+s)-a.x}" height="16" rx="3" fill="${same}" stroke="${LC_LINE}" stroke-width="1.2"/><text x="${(a.x+b.x+s)/2}" y="${a.y+17}" text-anchor="middle" font-size="11" fill="${LC_INK}">${esc(gT('same color'))}</text></g>
 <text x="${a.x+s/2}" y="${a.y+s/2+5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff8e8">${esc('A')}</text>
 <text x="${b.x+s/2}" y="${b.y+s/2+5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff8e8">${esc('B')}</text>`}

document.head.insertAdjacentHTML('beforeend',`<style>
#closer .lc75-scene[data-lc-id="duck"] .lc75-plate{fill:var(--card,#fff6e6);stroke:var(--ink,#2f2a24)}
#closer .lc80-ink{stroke:var(--ink,#2f2a24)}
#closer .lc80-tint-duck,#closer .lc80-tint-rabbit{opacity:0;color:var(--ink,#2f2a24)}
#closer .revealed[data-lc-id="duck"] .lc80-tint-duck{animation:lc80duck var(--lc-ms,2200ms) ease-in-out both}
#closer .revealed[data-lc-id="duck"] .lc80-tint-rabbit{animation:lc80rabbit var(--lc-ms,2200ms) ease-in-out both}
@keyframes lc80duck{0%,6%{opacity:0}16%,36%{opacity:1}48%,100%{opacity:0}}
@keyframes lc80rabbit{0%,48%{opacity:0}58%,80%{opacity:1}92%,100%{opacity:0}}
#closer .reduce.revealed[data-lc-id="duck"] .lc79-duck-cue,
#closer .reduce.revealed[data-lc-id="duck"] .lc79-rabbit-cue,
#closer .reduce.revealed[data-lc-id="duck"] .lc80-tint-duck,
#closer .reduce.revealed[data-lc-id="duck"] .lc80-tint-rabbit{
  animation:none;opacity:1;transition:opacity var(--lc-ms,1800ms) ease-in-out}
#closer .reduce .lc79-head,#closer .reduce.revealed[data-lc-id="duck"] .lc79-head{animation:none;transform:none;transition-property:opacity,fill}
@media (prefers-reduced-motion:reduce){
  #closer .revealed[data-lc-id="duck"] .lc79-duck-cue,
  #closer .revealed[data-lc-id="duck"] .lc79-rabbit-cue,
  #closer .revealed[data-lc-id="duck"] .lc80-tint-duck,
  #closer .revealed[data-lc-id="duck"] .lc80-tint-rabbit{animation:none;opacity:1;transition:opacity var(--lc-ms,1800ms) ease-in-out}
  #closer .lc79-head,#closer .revealed[data-lc-id="duck"] .lc79-head{animation:none;transform:none}
}
</style>`);
