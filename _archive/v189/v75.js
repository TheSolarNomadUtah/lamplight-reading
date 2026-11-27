// v75: Look Closer, nine still-picture illusions drawn as SVG. No image or audio files.
SECTIONS.push('closer');
document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="closer" class="hidden"></section>');
const LAMP_KINDS75=['rhyme','memory','retry','notice'];
const LC75={id:null,guess:null,revealed:false,measure:false,guide:{x:26,y:86}};
function lampPickReason74(kinds,trigger){const list=(kinds||[]).filter(k=>LAMP_KINDS75.includes(k));if(!list.length)return trigger;const count={};for(const k of list)count[k]=(count[k]||0)+1;let best=trigger,n=count[trigger]||0;for(const k of LAMP_KINDS75)if((count[k]||0)>n){best=k;n=count[k]}return best}
function lampLoad73(pid){const raw=safeJSON(RAW.get('lamp_companion@'+(pid||curPid())),null),s=Object.assign(lampDefault73(),raw&&typeof raw==='object'?raw:{});
 s.moments=Math.max(0,Number(s.moments)||0);s.stage=Math.max(1,Math.min(3,Number(s.stage)||1));s.stage=Math.max(s.stage,lampStageFor73(s.moments));
 s.pending=Array.isArray(s.pending)?s.pending.filter(p=>p&&p.stage>=2&&p.stage<=3&&LAMP_KINDS75.includes(p.reason)):[];
 s.kinds=Array.isArray(s.kinds)?s.kinds.filter(k=>LAMP_KINDS75.includes(k)):[];
 s.day=typeof s.day==='string'?s.day:'';s.dayCredits=Math.max(0,Number(s.dayCredits)||0);s.session=typeof s.session==='string'?s.session:'';
 if(!raw||!Number.isInteger(raw.shown)||raw.shown<1||raw.shown>3)s.shown=s.pending.length?Math.max(1,Number(s.pending[0].from)||s.stage-1):s.stage;
 s.shown=Math.max(1,Math.min(s.shown,s.stage));s.name=typeof s.name==='string'?s.name.trim().slice(0,20):'';return s}
function lampMoment73(reason){if(!LAMP_KINDS75.includes(reason))return false;const s=lampLoad73();if(s.stage>=3)return false;
 const session=lampSession74(),day=lampDay74();if(s.session&&s.session===session)return false;if(s.day===day&&s.dayCredits>=2)return false;
 if(reason==='retry'){const c=P68.g;if(c?.lampRetry73)return false;if(c)c.lampRetry73=true}
 s.moments++;s.kinds=s.kinds||[];s.kinds.push(reason);s.session=session;s.dayCredits=s.day===day?s.dayCredits+1:1;s.day=day;
 const next=lampStageFor73(s.moments);if(next>s.stage){const why=lampPickReason74(s.kinds,reason);for(let st=s.stage+1;st<=next;st++)s.pending.push({stage:st,reason:why,from:st-1});s.stage=next;s.kinds=[]}lampPut73(s);return true}
function lampReason73(reason){return gT({rhyme:'Your lamp grew because you found two words that sound alike.',memory:'Your lamp grew because you found a matching pair.',retry:'Your lamp grew because you tried again.',notice:'Your lamp grew because you looked closer.'}[reason]||'Your lamp grew because you tried again.')}

const LC_INK='#463f52',LC_LINE='#72583f',LC_CREAM='#f3e4c4',LC_SAGE='#7d9574',LC_SAME='#8ea07a',LC_GOLD='#e6b454',LC_PLATE='#fff6e6',LC_SOFT='#d9c7a4';
const LC_ITEMS75=[
 {id:'squares',title:'Same-Color Squares',q:'Which square is darker, A or B?',choices:['A','B'],measure:false,ms:900,
  line:"They're the exact same color! The shadow tricked your eyes.",
  desc:'A cream and sage checkerboard with a lamp casting a soft shadow. Square A sits in the light. Square B sits in the shadow.',
  reveal:'A solid sage bar slides in and joins the two squares, showing they are the same color.'},
 {id:'arrows',title:'Arrow-Tip Lines',q:'Which line is longer?',choices:['The top line','The bottom line'],measure:true,ms:1000,
  line:"They're the same length! Your eyes guessed from the arrow tips.",
  desc:'Two horizontal lines of equal length. The top line has arrow tips pointing out. The bottom line has arrow tips pointing in.',
  reveal:'The arrow tips fade, and ruler marks appear beside both lines to show they match.'},
 {id:'duck',title:'Duck or Rabbit',q:'What animal do you see?',choices:['A duck','A rabbit'],measure:false,ms:1600,
  line:"It's both! Your brain can pick which one to see.",
  desc:'A soft line drawing that can look like a duck facing one way, or a rabbit facing the other way.',
  reveal:'A gentle outline traces the duck bill, then the same lines as the rabbit ears.'},
 {id:'friends',title:'Big and Small Friends',q:'Which middle circle is bigger?',choices:['The left one','The right one'],measure:true,ms:1200,
  line:'The middle circles are the same size! Their neighbors fooled you.',
  desc:'Two equal middle circles. The left one is ringed by large circles. The right one is ringed by small circles.',
  reveal:'The surrounding circles slowly drift away, leaving the two matching middle circles.'},
 {id:'tracks',title:'Train Tracks',q:'Which bar is longer?',choices:['The top bar','The bottom bar'],measure:true,ms:900,
  line:'Same size! The tracks made one look farther away.',
  desc:'Two equal horizontal bars sit between train tracks that meet in the distance. The top bar is closer to the meeting point.',
  reveal:'The tracks fade, leaving the two bars so they are easier to compare.'},
 {id:'triangle',title:'Invisible Triangle',q:'Do you see a triangle?',choices:['Yes','No'],measure:false,ms:1000,
  line:'There was no triangle! Your brain drew it to fill the gaps.',
  desc:'Three pac-man circles face inward, leaving a blank triangular gap in the middle.',
  reveal:'The circles slide apart, and the suggested triangle disappears.'},
 {id:'vase',title:'Vase or Faces',q:'Do you see a vase or two faces?',choices:['A vase','Two faces'],measure:false,ms:1000,
  line:'Both! It depends which part your eyes pick.',
  desc:'A cream vase on a sage background. The sides of the vase also look like two faces in profile.',
  reveal:'The colors gently swap, so the vase and the faces take turns standing out.'},
 {id:'tables',title:'Two Tables',q:'Which tabletop is longer?',choices:['The left table','The right table'],measure:true,ms:2200,
  line:'Same shape! The legs made your brain think 3D.',
  desc:'Two tabletops that are the same shape, with legs that make them look like they sit in different directions.',
  reveal:'The legs fade, then one tabletop slowly turns and slides onto the other. It moves once, and does not spin.'},
 {id:'banana',title:'Banana Shapes',q:'Which curve is bigger?',choices:['The top curve','The bottom curve'],measure:true,ms:1000,
  line:'Same size! The short edge next to the long edge fooled you.',
  desc:'Two identical curved banana shapes, stacked so the short edge of one sits beside the long edge of the other.',
  reveal:'One shape slides onto the other to show they match.'}
];
function lcItem75(id){return LC_ITEMS75.find(x=>x.id===id)||LC_ITEMS75[0]}
function lcReduced75(){return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}
function lcMs75(item){return Math.max(800,lcReduced75()?800:item.ms||1000)}
function lcSvgWrap75(inner,label){return `<svg class="lc75-svg" viewBox="0 0 360 260" width="360" height="260" role="img" aria-label="${attr64(gT(label))}"><rect class="lc75-plate" x="2" y="2" width="356" height="256" rx="18" fill="${LC_PLATE}" stroke="${LC_LINE}" stroke-width="2"/>${inner}</svg>`}

function lcArtSquares75(){
 const cells=[],same=LC_SAME,row=3,aC=2,bC=5;let a={x:0,y:0},b={x:0,y:0};
 for(let r=0;r<6;r++)for(let c=0;c<8;c++){
  const x=24+c*28,y=40+r*28,light=c<4,odd=(r+c)%2;
  if(r===row&&c===aC){a={x,y};continue}
  if(r===row&&c===bC){b={x,y};continue}
  cells.push(`<rect x="${x}" y="${y}" width="28" height="28" fill="${odd?LC_SAGE:LC_CREAM}"/>`);
 }
 return `${cells.join('')}
  <path d="M160 88 L160 208 L198 222 L316 208 L316 78 Q230 108 160 88Z" fill="#2f2a24" opacity=".36"/>
  <ellipse cx="276" cy="86" rx="36" ry="44" fill="#d8c39a" stroke="${LC_LINE}" stroke-width="2"/>
  <ellipse cx="276" cy="64" rx="24" ry="18" fill="#e8d4ac" stroke="${LC_LINE}" stroke-width="1.5"/>
  <rect x="272" y="40" width="8" height="16" rx="2" fill="${LC_INK}"/>
  <rect data-sq="A" x="${a.x}" y="${a.y}" width="28" height="28" fill="${same}"/>
  <rect data-sq="B" x="${b.x}" y="${b.y}" width="28" height="28" fill="${same}"/>
  <text x="${a.x+14}" y="${a.y-6}" text-anchor="middle" font-size="13" font-weight="700" fill="${LC_INK}">A</text>
  <text x="${b.x+14}" y="${b.y-6}" text-anchor="middle" font-size="13" font-weight="700" fill="${LC_INK}">B</text>
  <g data-reveal="bar" class="lc75-motion lc75-bar"><rect x="${a.x}" y="${a.y+5}" width="${(b.x+28)-a.x}" height="18" rx="3" fill="${same}" stroke="${LC_LINE}" stroke-width="1.2"/><text x="${(a.x+b.x+28)/2}" y="${a.y+18}" text-anchor="middle" font-size="11" fill="${LC_INK}">${esc(gT('same color'))}</text></g>`}

function lcArtArrows75(){
 const ticks=n=>{let s='';for(let i=0;i<=10;i++)s+=`<line x1="${60+i*22}" y1="${n}" x2="${60+i*22}" y2="${n+10}" stroke="${LC_LINE}" stroke-width="${i%5?1.2:2}"/>`;return s+`<line x1="60" y1="${n+5}" x2="280" y2="${n+5}" stroke="${LC_LINE}" stroke-width="1.5"/>`}
 return `<g stroke="${LC_LINE}" stroke-linecap="round" fill="none">
  <line x1="70" y1="80" x2="270" y2="80" stroke-width="4"/>
  <path data-hide="tips" d="M70 80 L46 62 M70 80 L46 98 M270 80 L294 62 M270 80 L294 98" stroke-width="4"/>
  <line x1="70" y1="160" x2="270" y2="160" stroke-width="4"/>
  <path data-hide="tips" d="M70 160 L94 142 M70 160 L94 178 M270 160 L246 142 M270 160 L246 178" stroke-width="4"/>
 </g>
 <g data-reveal="ruler" class="lc75-motion lc75-fadein" fill="${LC_INK}">
  ${ticks(94)}${ticks(176)}
  <text x="180" y="122" text-anchor="middle" font-size="12">${esc(gT('same length'))}</text>
 </g>`}

function lcArtDuck75(){
 const body="M228 118 C258 90 292 104 304 136 C314 166 296 200 252 208 C214 214 188 200 178 176 C160 198 112 186 70 160 C42 144 40 124 66 116 C96 106 140 124 172 142 C148 112 92 92 58 78 C36 66 42 46 72 44 C112 42 166 66 188 98 C200 78 214 88 228 118Z";
 return `<path d="${body}" fill="#efe0c0" stroke="${LC_LINE}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="246" cy="148" r="6.5" fill="${LC_INK}"/>
  <circle cx="248" cy="146" r="2.1" fill="#fff8e8"/>
  <path d="M268 168 Q248 178 230 166" fill="none" stroke="${LC_LINE}" stroke-width="1.5" stroke-linecap="round"/>
  <g data-reveal="beak" class="lc75-motion lc75-trace">
    <path d="M176 128 C130 100 86 84 60 78 C48 74 46 58 70 54 C114 50 158 78 184 108" fill="none" stroke="#c9893a" stroke-width="3" stroke-linecap="round"/>
    <text x="70" y="36" font-size="13" fill="${LC_INK}">${esc(gT('duck bill'))}</text>
  </g>
  <g data-reveal="ears" class="lc75-motion lc75-trace2">
    <path d="M176 128 C130 100 86 84 60 78 M172 142 C140 130 96 116 66 116 C44 128 48 144 70 158 C112 182 154 176 176 160" fill="none" stroke="#5b7a6a" stroke-width="3" stroke-linecap="round"/>
    <text x="70" y="200" font-size="13" fill="${LC_INK}">${esc(gT('rabbit ears'))}</text>
  </g>`}

function lcRing75(cx,cy,r,fill,cls=''){return `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${LC_LINE}" stroke-width="2"/>`}
function lcArtFriends75(){
 const mid=22,left=[],right=[];
 for(let i=0;i<6;i++){const a=(-90+i*60)*Math.PI/180;left.push(lcRing75(96+Math.cos(a)*58,130+Math.sin(a)*58,30,LC_SAGE,'lc75-drift lc75-motion'))}
 for(let i=0;i<8;i++){const a=(-90+i*45)*Math.PI/180;right.push(lcRing75(264+Math.cos(a)*36,130+Math.sin(a)*36,11,LC_CREAM,'lc75-drift lc75-motion'))}
 return `${left.join('')}${right.join('')}${lcRing75(96,130,mid,LC_GOLD)}${lcRing75(264,130,mid,LC_GOLD)}
  <text x="96" y="226" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Left'))}</text>
  <text x="264" y="226" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Right'))}</text>`}

function lcArtTracks75(){
 return `<g data-hide="tracks" class="lc75-motion" stroke="${LC_LINE}" fill="none">
   <path d="M80 230 L170 36" stroke-width="4" stroke-linecap="round"/>
   <path d="M280 230 L190 36" stroke-width="4" stroke-linecap="round"/>
   <path d="M110 196 L250 196 M122 164 L238 164 M136 128 L224 128 M150 92 L210 92 M162 62 L198 62" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g fill="#c9893a" stroke="${LC_LINE}" stroke-width="2">
    <rect data-bar="top" x="130" y="86" width="100" height="14" rx="3"/>
    <rect data-bar="bottom" x="130" y="186" width="100" height="14" rx="3"/>
  </g>`}

function lcPac75(cx,cy,rot){return `<g class="lc75-pac lc75-motion" transform="translate(${cx} ${cy}) rotate(${rot})"><circle r="36" fill="${LC_INK}"/><path d="M0 0 L34 -22 A36 36 0 0 1 34 22 Z" fill="${LC_PLATE}"/></g>`}
function lcArtTriangle75(){return `${lcPac75(180,78,90)}${lcPac75(112,188,-30)}${lcPac75(248,188,210)}`}

function lcArtVase75(){
 const vase='M180 32 C206 32 216 44 214 62 C212 78 200 86 198 96 C214 104 220 118 200 126 C210 134 208 146 196 152 C200 164 198 180 190 196 L208 226 L152 226 L170 196 C162 180 160 164 164 152 C152 146 150 134 160 126 C140 118 146 104 162 96 C160 86 148 78 146 62 C144 44 154 32 180 32Z';
 return `<rect class="lc75-vase-bg lc75-motion" x="36" y="24" width="288" height="212" rx="12" fill="${LC_SAGE}"/>
  <path class="lc75-vase lc75-motion" d="${vase}" fill="${LC_CREAM}" stroke="${LC_LINE}" stroke-width="2.2"/>
  <circle cx="96" cy="116" r="3.6" fill="#463f52" opacity=".55"/><circle cx="264" cy="116" r="3.6" fill="#463f52" opacity=".55"/>`}

function lcTablePoly(){return '0,0 110,0 142,46 32,46'}
function lcArtTables75(){
 const top=`<polygon points="${lcTablePoly()}" fill="#e8c894" stroke="${LC_LINE}" stroke-width="2.2"/>`;
 const legs=`<g data-hide="legs" class="lc75-motion lc75-legs" fill="#8a6a45" stroke="${LC_LINE}" stroke-width="1.6"><rect x="18" y="46" width="8" height="52" rx="2"/><rect x="96" y="46" width="8" height="36" rx="2"/><rect x="8" y="96" width="36" height="7" rx="2"/><rect x="86" y="80" width="36" height="7" rx="2"/></g>`;
 return `<g class="lc75-tables-over" data-reveal="over"><g transform="translate(44 58)">${top}</g></g>
  <g class="lc75-table-a lc75-table-move">${top}${legs}<text data-hide="label" class="lc75-motion" x="71" y="28" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Left'))}</text></g>
  <g class="lc75-table-b"><g class="lc75-table-rot lc75-motion">${top}${legs}<text data-hide="label" class="lc75-motion" x="71" y="28" text-anchor="middle" font-size="13" fill="${LC_INK}">${esc(gT('Right'))}</text></g></g>`}

function lcBananaPath(flip){const p='M20 70 C70 10 170 10 230 40 C180 58 90 70 36 96 Z';return flip?`<g transform="translate(250 0) scale(-1,1)"><path d="${p}"/></g>`:`<path d="${p}"/>`}
function lcArtBanana75(){
 const shape=`<path d="M24 72 C80 14 186 16 238 52 C184 68 96 80 40 100 Z" fill="#e6b454" stroke="${LC_LINE}" stroke-width="2.4" stroke-linejoin="round"/>`;
 return `<g class="lc75-ban-top lc75-motion" transform="translate(70 28)">${shape}</g>
  <g class="lc75-ban-bot" transform="translate(70 112)">${shape}</g>`}

function lcPicture75(item){
 const art={squares:lcArtSquares75,arrows:lcArtArrows75,duck:lcArtDuck75,friends:lcArtFriends75,tracks:lcArtTracks75,triangle:lcArtTriangle75,vase:lcArtVase75,tables:lcArtTables75,banana:lcArtBanana75}[item.id];
 return lcSvgWrap75(art(),item.desc)}

function lcTileArt75(){return `<svg class="lamp-art63" data-original-art="lookCloser75" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="art-ink63"><ellipse cx="50" cy="46" rx="22" ry="26" fill="#efe0c0" stroke="#72583f" stroke-width="2"/><ellipse cx="50" cy="48" rx="12" ry="14" fill="#7d9574" stroke="#72583f" stroke-width="1.4"/><circle cx="50" cy="48" r="6" fill="#463f52"/><circle cx="52" cy="45" r="2" fill="#fff8e8"/><path d="M28 78 H44 M56 78 H72" stroke="#72583f" stroke-width="3" stroke-linecap="round"/><path d="M68 28 Q80 36 72 50" fill="none" stroke="#e6b454" stroke-width="2.2" stroke-linecap="round"/></g></svg>`}

function lcRender75(opts){
 const root=$('closer');if(!root)return;
 LC75.reduced=lcReduced75();
 if(!LC75.id){lcRenderList75(root);return}
 const item=lcItem75(LC75.id);
 const guessed=LC75.guess!=null,revealed=!!LC75.revealed,hold=!!(opts&&opts.hold);
 const choices=item.choices.map(c=>`<button type="button" class="lc75-choice${LC75.guess===c?' on':''}" data-lc-choice="${esc(c)}" aria-pressed="${LC75.guess===c}" ${revealed?'disabled':''}>${esc(gT(c))}</button>`).join('');
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

function lcRenderList75(root){
 const tiles=LC_ITEMS75.map((item,i)=>`<button type="button" class="hubtile lc75-tile" data-lc-open="${item.id}"><span class="lc75-num">${i+1}</span>${gT(item.title)}<small>${gT(item.q)}</small></button>`).join('');
 root.innerHTML=`<div class="card big lc75-card"><h2>${lcTileArt75()} ${gT('Look Closer')}</h2>`+`
  <p>${gT('Pictures that trick your eyes. There is no score. Guess, then look closer.')}</p>
  <div class="hubgrid lc75-grid">${tiles}</div>
  <p><button type="button" class="bigbtn" onclick="show('hub')">${gT('Home')}</button></p></div>`;}

function lcBind75(root,item){
 root.querySelectorAll('[data-lc-open]').forEach(b=>b.onclick=()=>lcOpen75(b.dataset.lcOpen));
 root.querySelectorAll('[data-lc-choice]').forEach(b=>b.onclick=()=>lcGuess75(b.dataset.lcChoice));
 root.querySelector('[data-lc-reveal]')?.addEventListener('click',()=>lcReveal75());
 root.querySelector('[data-lc-next]')?.addEventListener('click',()=>lcNext75());
 root.querySelectorAll('[data-lc-list]').forEach(b=>b.onclick=()=>lcList75());
 root.querySelector('[data-lc-measure]')?.addEventListener('click',()=>lcToggleMeasure75());
 const scene=root.querySelector('.lc75-scene');
 if(scene&&item)scene.addEventListener('click',e=>{if(e.target.closest('[data-lc-guide]'))return;if(LC75.guess!=null&&!LC75.revealed)lcReveal75()});
 lcBindGuide75(root)}

function lcBindGuide75(root){
 const g=root.querySelector('[data-lc-guide]'),scene=root.querySelector('.lc75-scene');if(!g||!scene)return;
 let drag=null;
 const set=(x,y)=>{const box=scene.getBoundingClientRect();const px=Math.max(0,Math.min(box.width-g.offsetWidth,x)),py=Math.max(0,Math.min(box.height-g.offsetHeight,y));g.style.left=(px/box.width*100)+'%';g.style.top=(py/box.height*100)+'%';LC75.guide={x:px/box.width*100,y:py/box.height*100}};
 g.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation();g.setPointerCapture(ev.pointerId);const r=g.getBoundingClientRect();drag={dx:ev.clientX-r.left,dy:ev.clientY-r.top}});
 g.addEventListener('pointermove',ev=>{if(!drag)return;const box=scene.getBoundingClientRect();set(ev.clientX-box.left-drag.dx,ev.clientY-box.top-drag.dy)});
 g.addEventListener('pointerup',()=>drag=null);g.addEventListener('pointercancel',()=>drag=null)}

function lcOpen75(id){LC75.id=id;LC75.guess=null;LC75.revealed=false;LC75.measure=false;lcRender75()}
function lcList75(){LC75.id=null;LC75.guess=null;LC75.revealed=false;lcRender75()}
function lcNext75(){const i=LC_ITEMS75.findIndex(x=>x.id===LC75.id);lcOpen75(LC_ITEMS75[(i+1)%LC_ITEMS75.length].id)}
function lcGuess75(choice){if(LC75.revealed)return;LC75.guess=choice;lcRender75()}
function lcToggleMeasure75(){LC75.measure=!LC75.measure;lcRender75()}
function lcReveal75(){if(LC75.revealed||LC75.guess==null)return;const item=lcItem75(LC75.id);LC75.revealed=true;pPractice68('logic','Look Closer',{illusions:[item.id]},'closer');lampMoment73('notice');lcRender75({hold:true});const scene=$('closer')?.querySelector('.lc75-scene');if(!scene)return;scene.style.setProperty('--lc-ms',lcMs75(item)+'ms');void scene.getBoundingClientRect();requestAnimationFrame(()=>requestAnimationFrame(()=>lcApplyReveal75(scene,item,false)))}
function lcApplyReveal75(scene,item,instant){
 if(!scene)return;if(lcReduced75())scene.classList.add('reduce');scene.style.setProperty('--lc-ms',(instant?0:lcMs75(item))+'ms');if(instant)scene.classList.add('revealed');else{void scene.getBoundingClientRect();scene.classList.add('revealed')}}

RENDER.closer=function(){pPractice68('logic','Look Closer',{},'closer');lcRender75()};
{const hub=RENDER.hub;RENDER.hub=renderHub=function(){const r=hub.apply(this,arguments);const h=$('hub');if(!h||h.querySelector('[data-lc75]'))return r;const tile=document.createElement('button');tile.className='hubtile';tile.dataset.lc75='1';tile.setAttribute('onclick',"show('closer')");tile.innerHTML=`${lcTileArt75()}${gT('Look Closer')}<small>${gT('Pictures that trick your eyes')}</small>`;const paint=[...h.querySelectorAll('.hubtile')].find(b=>(b.getAttribute('onclick')||'')==="show('paint')");if(paint)paint.after(tile);else h.querySelector('.explore71 .hubgrid, .hubgrid')?.append(tile);return r}}
{const trim=pTrimSwitch74;pTrimSwitch74=function(){const r=trim.apply(this,arguments);$('closer')?.querySelectorAll('[data-mode71]').forEach(el=>el.remove());return r}}

document.head.insertAdjacentHTML('beforeend',`<style>
#closer .lc75-scene{position:relative;margin:12px auto;max-width:360px;background:transparent}
#closer .lc75-svg{width:100%;height:auto;display:block;overflow:visible}
#closer .lc75-choices{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}
#closer .lc75-choice,#closer .lc75-measure,#closer .lc75-reveal,#closer [data-lc-next],#closer [data-lc-list],#closer .lc75-tile{min-height:52px;min-width:52px;padding:12px 16px;font-size:1.12rem}
#closer .lc75-choice.on{background:var(--hi,#f3e2b3);border-color:var(--acc)}
#closer .lc75-line{border-left:6px solid var(--acc);padding:8px 12px;margin:14px 0;background:var(--card)}
#closer .lc75-motto{font-weight:700}
#closer .lc75-grid .lc75-num{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#fff2d8;border:2px solid #72583f;color:#463f52;font-size:1.1rem}
#closer .lc75-guide{position:absolute;width:46%;min-width:120px;height:36px;border:3px solid #5b7a6a;border-radius:18px;background:#e6b45499;box-shadow:0 0 0 6px #fff6e680;display:flex;align-items:center;justify-content:center;touch-action:none;cursor:grab;color:#2f2a24;font-size:.9rem;z-index:2}
#closer .lc75-svg .lc75-motion,#closer .lc75-pac,#closer .lc75-table-a,#closer .lc75-table-b,#closer .lc75-ban-top,#closer .lc75-ban-bot,#closer .lc75-drift{transform-box:view-box;transform-origin:0 0}
#closer .lc75-table-b{transform-origin:71px 23px}
#closer .lc75-motion,#closer .lc75-pac,#closer .lc75-table-b,#closer .lc75-ban-top{transition:transform var(--lc-ms,900ms) ease-in-out,opacity var(--lc-ms,900ms) ease-in-out,fill var(--lc-ms,900ms) ease-in-out}
#closer .lc75-bar{transform:translateX(-72%);opacity:0}
#closer .revealed .lc75-bar{transform:none;opacity:1}
#closer .lc75-fadein,#closer [data-reveal]{opacity:0}
#closer .revealed .lc75-fadein,#closer .revealed [data-reveal]{opacity:1}
#closer .revealed [data-hide]{opacity:0}
#closer .lc75-trace{transition-delay:0s}
#closer .lc75-trace2{transition-delay:0s;transition-duration:calc(var(--lc-ms,1600ms) * .5);transition-delay:calc(var(--lc-ms,1600ms) * .5)}
#closer .reduce .lc75-trace2{transition-delay:0s;transition-duration:var(--lc-ms,800ms)}
#closer .revealed[data-lc-id="friends"] .lc75-drift{transform:translateY(-28px) scale(1.15);opacity:.25}
#closer .revealed[data-lc-id="triangle"] .lc75-pac:nth-of-type(1){transform:translate(180px,36px) rotate(90deg)}
#closer .revealed[data-lc-id="triangle"] .lc75-pac:nth-of-type(2){transform:translate(70px,214px) rotate(-30deg)}
#closer .revealed[data-lc-id="triangle"] .lc75-pac:nth-of-type(3){transform:translate(290px,214px) rotate(210deg)}
#closer .revealed[data-lc-id="vase"] .lc75-vase-bg{fill:${LC_CREAM}}
#closer .revealed[data-lc-id="vase"] .lc75-vase{fill:${LC_SAGE}}
#closer .revealed[data-lc-id="banana"] .lc75-ban-top{transform:translate(70px,112px)}
#closer .reduce .lc75-motion,#closer .reduce .lc75-pac,#closer .reduce .lc75-table-b,#closer .reduce .lc75-ban-top,#closer .reduce .lc75-drift{transition-property:opacity,fill}
#closer .reduce.revealed[data-lc-id="friends"] .lc75-drift{opacity:.15}
#closer .reduce.revealed[data-lc-id="triangle"] .lc75-pac{opacity:0}
#closer .reduce.revealed[data-lc-id="tables"] .lc75-table-a,#closer .reduce.revealed[data-lc-id="tables"] .lc75-table-b{opacity:0}
#closer .reduce.revealed[data-lc-id="tables"] .lc75-tables-over{opacity:1}
#closer .reduce.revealed[data-lc-id="banana"] .lc75-ban-top{opacity:0}
#closer .lc75-tile{text-align:center}
#closer .lc75-card{background:var(--card);color:var(--ink);text-align:center}
#closer .lc75-card button{color:inherit}
#closer .lc75-card .soft{color:var(--soft)}
#closer .lc75-card p>button{background:var(--card);border-color:#d8cdb8;color:var(--ink)}
#closer .lc75-card p>button.p,#closer .lc75-card .bigbtn.p{background:var(--acc);color:#fff;border-color:var(--acc)}
#closer .lc75-tile{background:var(--card);color:var(--ink);border-color:#e4dccb}
#closer .lc75-tile small{color:var(--soft)}
#closer .lc75-table-move{transform:translate(44px,58px);transform-box:view-box;transform-origin:0 0}
#closer .lc75-table-b{transform:translate(236px,40px);transform-box:view-box;transform-origin:0 0}
#closer .lc75-table-rot{transform:rotate(90deg);transform-box:fill-box;transform-origin:50% 50%;transition:transform var(--lc-ms,2200ms) ease-in-out}
#closer .lc75-table-b,#closer .lc75-table-move{transition:transform var(--lc-ms,2200ms) ease-in-out,opacity var(--lc-ms,2200ms) ease-in-out}
#closer .revealed[data-lc-id="tables"] .lc75-table-b{transform:translate(44px,58px)}
#closer .revealed[data-lc-id="tables"] .lc75-table-rot{transform:rotate(0deg)}
#closer .lc75-tables-over{opacity:0}
#closer .reduce.revealed[data-lc-id="tables"] .lc75-table-a,#closer .reduce.revealed[data-lc-id="tables"] .lc75-table-b{opacity:0}
#closer .reduce.revealed[data-lc-id="tables"] .lc75-tables-over{opacity:1}
#closer .lc75-scene.measuring{padding-bottom:44px}

@media (prefers-reduced-motion:reduce){#closer .lc75-motion,#closer .lc75-pac,#closer .lc75-table-b,#closer .lc75-ban-top{transition-property:opacity,fill}}
</style>`);
