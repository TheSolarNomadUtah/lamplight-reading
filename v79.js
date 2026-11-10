// v79: Duck or Rabbit reread. Studied from Jastrow 1899, drawn original in the Lamplight style.
function lcMs75(item){
 if(item&&item.id==='duck')return lcReduced75()?1800:2400;
 return Math.max(800,lcReduced75()?800:item.ms||1000)}

function lcArtDuck75(){
 const fill='#e6c78a',line=LC_LINE;
 // Wide, rounded, gently diverging bill-halves (open duck bill = two floppy ears),
 // a plump round head facing right, and a small nose bump plus mouth notch on the right.
 const body=`M 40 106
  C 20 94, 32 72, 62 74
  C 120 78, 166 90, 198 118
  C 214 94, 234 82, 258 84
  C 298 86, 324 114, 326 146
  C 328 154, 336 156, 334 164
  C 328 170, 318 170, 316 176
  C 316 184, 322 194, 310 206
  C 296 218, 270 222, 246 218
  C 226 214, 210 200, 202 188
  C 158 208, 108 218, 60 208
  C 34 202, 20 180, 40 168
  C 98 178, 152 170, 198 156
  C 194 146, 148 132, 94 118
  C 68 112, 50 114, 40 106 Z`;
 return `<g class="lc79-head lc75-motion">
  <path d="${body}" fill="${fill}" stroke="${line}" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M 324 168 Q 314 176 322 184" fill="none" stroke="${line}" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="226" cy="140" r="8.6" fill="${LC_INK}"/>
  <circle cx="228.6" cy="137.4" r="2.6" fill="#fff8e8"/>
  <g class="lc79-duck-cue lc75-motion">
    <path d="M 62 74 C 120 78, 166 90, 198 118 M 94 118 C 148 132, 194 146, 198 156" fill="none" stroke="#c9893a" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M 112 128 C 130 134, 142 140, 134 148 C 122 146, 112 136, 112 128 Z" fill="#e8a070" stroke="#c9893a" stroke-width="1.2" stroke-linejoin="round"/>
  </g>
  <g class="lc79-rabbit-cue lc75-motion">
    <path d="M 62 74 C 120 78, 166 90, 198 118 M 94 118 C 148 132, 194 146, 198 156 M 198 156 C 152 170, 98 178, 40 168 M 60 208 C 108 218, 158 208, 202 188" fill="none" stroke="#5b7a6a" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="332" cy="162" r="4" fill="#5b7a6a"/>
    <path d="M 324 172 L 348 164 M 324 178 L 350 180 M 322 182 L 340 198" fill="none" stroke="#5b7a6a" stroke-width="1.8" stroke-linecap="round"/>
  </g>
 </g>
 <g class="lc79-duck-cue lc75-motion">
  <text x="24" y="40" font-size="14" font-weight="700" fill="${LC_INK}">${esc(gT('duck: beak'))}</text>
 </g>
 <g class="lc79-rabbit-cue lc75-motion">
  <text x="24" y="248" font-size="14" font-weight="700" fill="${LC_INK}">${esc(gT('rabbit: ears'))}</text>
 </g>`}

document.head.insertAdjacentHTML('beforeend',`<style>
#closer .lc75-svg .lc79-head,#closer .lc79-head{transform-box:view-box;transform-origin:252px 150px;transform:rotate(0deg)}
#closer .revealed[data-lc-id="duck"] .lc79-head{animation:lc79tilt var(--lc-ms,2400ms) ease-in-out both}
#closer .lc79-duck-cue,#closer .lc79-rabbit-cue{opacity:0}
#closer .revealed[data-lc-id="duck"] .lc79-duck-cue{animation:lc79duck var(--lc-ms,2400ms) ease-in-out both}
#closer .revealed[data-lc-id="duck"] .lc79-rabbit-cue{animation:lc79rabbit var(--lc-ms,2400ms) ease-in-out both}
@keyframes lc79tilt{0%,38%{transform:rotate(0deg)}52%,80%{transform:rotate(20deg)}94%,100%{transform:rotate(0deg)}}
@keyframes lc79duck{0%,6%{opacity:0}16%,36%{opacity:1}48%,100%{opacity:0}}
@keyframes lc79rabbit{0%,48%{opacity:0}58%,80%{opacity:1}92%,100%{opacity:0}}
#closer .reduce .lc79-head,#closer .reduce.revealed[data-lc-id="duck"] .lc79-head{animation:none;transform:none;transition-property:opacity,fill}
@media (prefers-reduced-motion:reduce){#closer .lc79-head,#closer .revealed[data-lc-id="duck"] .lc79-head{animation:none;transform:none}}
</style>`);
