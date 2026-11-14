/* v105: a calm original turtle in every main area.
   Family inside joke, in Lamplight's soft glowing style. Never emoji.
   Hidden turtles are only to notice — no counter, no reward, no nag.
   Paint adds a turtle stamp and a turtle-shell (hex) pattern; both keep
   night-paper soft-glow rules. One new en story and one new es story,
   a sourced NOAA sea-turtle fact, a slow Waves turtle, counting turtles,
   a fourth companion (Shell / Concha), and an honest water-and-steps
   sound card. No network requests. No new voices. */
(function(){
 const s=document.createElement('style');
 s.id='v105css';
 s.textContent=[
  '#hub,#letters,#cards,#paint,#lookup,#songs88,#look,#about,#kids,#adults,#games,#lib,#math,#soundcards{position:relative}',
  '.turtle105{position:absolute;width:36px;height:40px;z-index:4;pointer-events:none;opacity:.92;line-height:0}',
  '.turtle105 svg{display:block;width:100%;height:100%;filter:drop-shadow(0 0 5px rgba(230,180,84,.28))}',
  '#hub>.turtle105{right:10px;top:10px}',
  '#letters>.turtle105{left:10px;top:8px}',
  '#cards>.turtle105{right:10px;top:8px}',
  '#paint>.turtle105{right:10px;top:8px}',
  '#lookup>.turtle105{right:10px;top:8px}',
  '#songs88>.turtle105{left:10px;top:8px}',
  '#look>.turtle105{right:10px;top:8px}',
  '#about>.turtle105{left:10px;top:8px}',
  '#kids>.turtle105{right:10px;top:8px}',
  '#adults>.turtle105{left:10px;top:8px}',
  '#games>.turtle105{right:10px;top:8px}',
  '#lib>.turtle105{left:10px;top:8px}',
  '#math>.turtle105{right:8px;top:8px}',
  '#soundcards>.turtle105{left:auto;right:14px;top:8px}',
  '#btword{z-index:6;text-shadow:0 1px 10px rgba(3,4,10,.6)}',
  '@media (max-width:700px){body.bedtime #btword{top:18%;bottom:auto}}',
  '#bedtime{position:relative}',
  '#bedtime>.turtle105{position:fixed;width:34px;height:38px;right:14px;top:16px;z-index:20;pointer-events:none}',
  '.luTurtleArt105{display:flex;justify-content:center;margin:.4rem 0 1rem}',
  '.luTurtleArt105 svg{width:200px;height:200px}',
  '.math-turtle{display:block;margin:0 auto}',
  '[data-luturtle105] .hubgrid{display:block}',
  '[data-luturtle105] .hubtile{width:100%;max-width:100%;display:flex;flex-direction:column;align-items:center;gap:.4rem;padding:16px}'
 ].join('');
 document.head.appendChild(s);
})();

function turtlePal105(){
 try{if(typeof lampPal101==='function'){const p=lampPal101();return {mid:p.mid,core:p.core,tip:p.tip,deep:p.deep}}}catch(e){}
 return {mid:'#e6b454',core:'#ffe4a4',tip:'#fff6d8',deep:'#855a00'};
}
function turtleInk105(){return '#72583f'}

/* One character, many poses. Tiles and cards never reuse the same picture. */
function turtleInner105(pose){
 const ink=turtleInk105(),pal=turtlePal105();
 const shell='#6f9a7a',shellLt='#c5ddd0',skin='#e8c894',belly='#f4e4c4';
 const glow=`<ellipse cx="40" cy="82" rx="20" ry="5" fill="${pal.mid}" opacity=".32" stroke="none"/>`;
 if(pose==='tuck'){
  return `${glow}<ellipse cx="42" cy="58" rx="20" ry="14" fill="${shell}" stroke="${ink}" stroke-width="1.7"/>
   <path d="M30 54 L38 48 L46 52 L54 46 L60 54" fill="none" stroke="${shellLt}" stroke-width="1.2"/>
   <path d="M38 50 Q42 46 48 50 Q52 56 44 58 Q36 56 38 50Z" fill="${shellLt}" stroke="${ink}" stroke-width=".9"/>
   <ellipse cx="22" cy="60" rx="7" ry="5.5" fill="${skin}" stroke="${ink}" stroke-width="1.4"/>
   <circle cx="19" cy="58.5" r="1.15" fill="${ink}" stroke="none"/>
   <ellipse cx="32" cy="70" rx="5" ry="3" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <ellipse cx="50" cy="71" rx="5" ry="3" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <path d="M60 60 Q66 58 64 66" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>`;
 }
 if(pose==='walk'){
  return `${glow}<ellipse cx="44" cy="54" rx="22" ry="15" fill="${shell}" stroke="${ink}" stroke-width="1.8"/>
   <path d="M30 50 L40 42 L50 50 L58 42 L64 52" fill="none" stroke="${ink}" stroke-width="1.15"/>
   <path d="M36 48 Q44 40 52 48 Q46 56 36 48Z" fill="${shellLt}" stroke="${ink}" stroke-width="1"/>
   <ellipse cx="20" cy="54" rx="8" ry="6" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
   <circle cx="17" cy="52.5" r="1.2" fill="${ink}" stroke="none"/>
   <path d="M17 57 Q20 59 23 57" fill="none" stroke="${ink}" stroke-width=".9"/>
   <ellipse cx="30" cy="70" rx="6" ry="3.4" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <ellipse cx="54" cy="68" rx="6" ry="3.4" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <path d="M62 58 Q70 54 68 66" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>`;
 }
 if(pose==='count'){
  return `${glow}<ellipse cx="40" cy="50" rx="22" ry="16" fill="${shell}" stroke="${ink}" stroke-width="1.8"/>
   <path d="M28 48 L36 40 L44 48 L52 40 L60 50" fill="none" stroke="${ink}" stroke-width="1.2"/>
   <polygon points="40,38 50,50 40,58 30,50" fill="${shellLt}" stroke="${ink}" stroke-width="1"/>
   <ellipse cx="40" cy="58" rx="10" ry="5" fill="${belly}" stroke="none" opacity=".7"/>
   <ellipse cx="40" cy="28" rx="8" ry="7" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
   <circle cx="37" cy="27" r="1.2" fill="${ink}" stroke="none"/>
   <circle cx="43" cy="27" r="1.2" fill="${ink}" stroke="none"/>
   <ellipse cx="24" cy="64" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <ellipse cx="56" cy="64" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>`;
 }
 if(pose==='swim'){
  return `<ellipse cx="42" cy="50" rx="22" ry="13" fill="${shell}" stroke="${ink}" stroke-width="1.7"/>
   <path d="M30 48 L40 42 L50 48 L58 42" fill="none" stroke="${shellLt}" stroke-width="1.2"/>
   <ellipse cx="18" cy="50" rx="8" ry="5.5" fill="${skin}" stroke="${ink}" stroke-width="1.4"/>
   <circle cx="15" cy="48.5" r="1.1" fill="${ink}" stroke="none"/>
   <path d="M36 58 Q28 70 18 68" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
   <path d="M52 58 Q62 72 70 66" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
   <path d="M34 40 Q28 28 20 32" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
   <path d="M54 40 Q64 28 72 34" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>`;
 }
 if(pose==='water'){
  return `<path d="M8 70 Q28 58 50 70 Q72 82 92 66 L92 92 H8Z" fill="#7ba9ba" stroke="${ink}" stroke-width="1.6"/>
   <path d="M12 76 Q30 68 50 76 Q70 84 88 72" fill="none" stroke="${ink}" stroke-width="1.1" opacity=".55"/>
   <ellipse cx="46" cy="52" rx="18" ry="11" fill="${shell}" stroke="${ink}" stroke-width="1.6"/>
   <path d="M36 50 L44 44 L52 50 L58 44" fill="none" stroke="${shellLt}" stroke-width="1.1"/>
   <ellipse cx="26" cy="52" rx="7" ry="5" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
   <circle cx="23.5" cy="50.5" r="1.05" fill="${ink}" stroke="none"/>
   <path d="M40 60 Q34 70 26 68" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <path d="M54 60 Q64 72 70 66" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>`;
 }
 if(pose==='hill'){
  return `<path d="M8 78 Q36 40 92 78 L92 92 H8Z" fill="#c4a07a" stroke="${ink}" stroke-width="1.7"/>
   <path d="M14 78 Q40 52 86 78" fill="none" stroke="${ink}" stroke-width="1.3"/>
   <circle cx="78" cy="22" r="10" fill="${pal.core}" stroke="${ink}" stroke-width="1.4"/>
   <ellipse cx="40" cy="70" rx="14" ry="9" fill="${shell}" stroke="${ink}" stroke-width="1.5"/>
   <path d="M32 68 L38 62 L44 68 L50 62" fill="none" stroke="${shellLt}" stroke-width="1"/>
   <ellipse cx="26" cy="70" rx="5.5" ry="4" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   <circle cx="24" cy="69" r=".95" fill="${ink}" stroke="none"/>
   <path d="M62 64 L66 52" fill="none" stroke="${ink}" stroke-width="1.5"/>
   <circle cx="66" cy="48" r="4.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>`;
 }
 if(pose==='lookup'){
  return `<rect width="200" height="200" fill="#0b1020"/>
   <ellipse cx="100" cy="100" rx="130" ry="26" transform="rotate(-18 100 100)" fill="#c9b8e8" opacity=".14"/>
   <circle cx="28" cy="30" r="1.4" fill="#f4e8c8" opacity=".7"/>
   <circle cx="70" cy="22" r="1.1" fill="#f4e8c8" opacity=".6"/>
   <circle cx="150" cy="36" r="1.5" fill="#f4e8c8" opacity=".75"/>
   <circle cx="176" cy="70" r="1.2" fill="#f4e8c8" opacity=".6"/>
   <circle cx="40" cy="80" r="1" fill="#f4e8c8" opacity=".5"/>
   <path d="M0 130 Q50 110 100 130 Q150 150 200 124 L200 200 H0Z" fill="#1a3048"/>
   <path d="M0 150 Q60 136 120 152 Q160 162 200 148 L200 200 H0Z" fill="#163044" opacity=".9"/>
   <g transform="translate(56 88) scale(1.15)">
    <ellipse cx="42" cy="28" rx="28" ry="15" fill="${shell}" stroke="${pal.mid}" stroke-width="1.4"/>
    <path d="M26 26 L38 18 L50 26 L62 18" fill="none" stroke="${shellLt}" stroke-width="1.3"/>
    <polygon points="42,16 54,28 42,36 30,28" fill="${shellLt}" opacity=".8" stroke="${ink}" stroke-width=".8"/>
    <ellipse cx="12" cy="28" rx="9" ry="6" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
    <circle cx="9" cy="26.5" r="1.2" fill="${ink}" stroke="none"/>
    <path d="M30 38 Q20 52 10 48" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
    <path d="M54 38 Q68 54 78 46" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
    <path d="M28 16 Q20 4 10 10" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
    <path d="M56 16 Q70 4 80 12" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
   </g>`;
 }
 /* sit / companion body is drawn in turtleArtStage105 */
 return turtleInner105('walk');
}

function turtleArt105(pose,w,h){
 pose=pose||'tuck';
 if(pose==='lookup'){
  return `<svg class="turtleArt105" data-turtle-pose="lookup" viewBox="0 0 200 200" width="${w||200}" height="${h||200}" aria-hidden="true" focusable="false">${turtleInner105('lookup')}</svg>`;
 }
 const vb='0 0 80 90';
 return `<svg class="turtleArt105" data-turtle-pose="${pose}" viewBox="${vb}" width="${w||80}" height="${h||90}" aria-hidden="true" focusable="false">${turtleInner105(pose)}</svg>`;
}

function turtleArtStage105(stage){
 const s=Math.max(1,Math.min(6,stage||1));
 const ink=turtleInk105(),pal=turtlePal105();
 const shell='#6f9a7a',shellLt='#c5ddd0',skin='#e8c894';
 const sand=`<ellipse cx="50" cy="86" rx="26" ry="5" fill="${pal.mid}" opacity=".3" stroke="none"/>`;
 if(s===1)return `${sand}<ellipse cx="52" cy="62" rx="15" ry="11" fill="${shell}" stroke="${ink}" stroke-width="1.8"/>
  <path d="M44 60 Q52 54 60 60" fill="none" stroke="${ink}" stroke-width="1.15"/>
  <ellipse cx="36" cy="64" rx="5.5" ry="4.2" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
  <circle cx="34.4" cy="63" r=".95" fill="${ink}" stroke="none"/>`;
 if(s===2)return `${sand}<ellipse cx="52" cy="60" rx="16" ry="12" fill="${shell}" stroke="${ink}" stroke-width="1.8"/>
  <ellipse cx="36" cy="62" rx="7" ry="5.5" fill="${skin}" stroke="${ink}" stroke-width="1.4"/>
  <circle cx="33.5" cy="60.5" r="1.1" fill="${ink}" stroke="none"/>`;
 if(s===3)return `${sand}<ellipse cx="52" cy="56" rx="20" ry="14" fill="${shell}" stroke="${ink}" stroke-width="1.9"/>
  <path d="M40 52 L48 46 L56 52 L64 46" fill="none" stroke="${ink}" stroke-width="1.15"/>
  <ellipse cx="30" cy="56" rx="8" ry="6" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="27.5" cy="54.5" r="1.2" fill="${ink}" stroke="none"/>
  <ellipse cx="40" cy="72" rx="5.5" ry="3" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <ellipse cx="62" cy="72" rx="5.5" ry="3" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>`;
 const scutes=`<path d="M38 46 L50 38 L62 46 L50 56Z" fill="${shellLt}" stroke="${ink}" stroke-width="1"/>
  <path d="M36 50 L28 56 M64 50 L72 56 M50 56 L50 66" fill="none" stroke="${ink}" stroke-width="1"/>`;
 if(s===4)return `${sand}<ellipse cx="52" cy="54" rx="22" ry="16" fill="${shell}" stroke="${ink}" stroke-width="2"/>${scutes}
  <ellipse cx="28" cy="54" rx="8.5" ry="6.2" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="25.5" cy="52.5" r="1.25" fill="${ink}" stroke="none"/>
  <path d="M25 58 Q29 61 33 58" fill="none" stroke="${ink}" stroke-width=".9"/>
  <ellipse cx="40" cy="72" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <ellipse cx="64" cy="72" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <path d="M70 56 Q80 52 78 66" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>`;
 const halo=`<ellipse cx="50" cy="52" rx="36" ry="32" fill="${pal.mid}" opacity=".18" stroke="none"/>`;
 if(s===5)return `${sand}${halo}<ellipse cx="52" cy="54" rx="23" ry="16.5" fill="${shell}" stroke="${ink}" stroke-width="2"/>${scutes}
  <path d="M42 44 Q50 36 58 44" fill="none" stroke="${pal.core}" stroke-width="1.1" opacity=".8"/>
  <ellipse cx="28" cy="54" rx="8.5" ry="6.2" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="25.5" cy="52.5" r="1.25" fill="${ink}" stroke="none"/>
  <circle cx="27" cy="51" r=".5" fill="${pal.tip}" stroke="none"/>
  <ellipse cx="40" cy="72" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <ellipse cx="64" cy="72" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <path d="M70 56 Q80 52 78 66" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>`;
 const stars=[[16,16],[84,14],[12,46],[90,44],[50,8],[22,84],[80,86]].map(([x,y],i)=>
  `<path d="M${x} ${y-3.4} L${x+.9} ${y-.85} L${x+3.4} ${y} L${x+.9} ${y+.85} L${x} ${y+3.4} L${x-.9} ${y+.85} L${x-3.4} ${y} L${x-.9} ${y-.85}Z" fill="${pal.mid}" stroke="none" opacity="${.6+i%3*.12}"/>`).join('');
 return `${sand}${halo}${stars}<ellipse cx="52" cy="54" rx="23" ry="16.5" fill="${shell}" stroke="${ink}" stroke-width="2"/>${scutes}
  <path d="M42 44 Q50 36 58 44" fill="none" stroke="${pal.core}" stroke-width="1.2"/>
  <ellipse cx="28" cy="54" rx="8.5" ry="6.2" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="25.5" cy="52.5" r="1.25" fill="${ink}" stroke="none"/>
  <circle cx="27" cy="51" r=".55" fill="${pal.tip}" stroke="none"/>
  <ellipse cx="40" cy="72" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <ellipse cx="64" cy="72" rx="6" ry="3.2" fill="${skin}" stroke="${ink}" stroke-width="1.2"/>
  <path d="M70 56 Q80 52 78 66" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>`;
}

if(typeof ART101==='object'){
 ART101.hillTurtle=()=>`<g fill="none" stroke="${turtleInk105()}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${turtleInner105('hill')}</g>`;
}

/* ---------------- Hidden turtles: notice only ---------------- */
const TURTLE_SECTIONS105=['hub','letters','cards','paint','lookup','songs88','look','about','kids','adults','games','lib','math','soundcards','bedtime'];
function turtlePlace105(id){
 if(!id||TURTLE_SECTIONS105.indexOf(id)<0)return;
 let root=typeof $==='function'?$(id):document.getElementById(id);
 if(!root||root.classList.contains('hidden'))return;
 /* Keep the tucked turtle on #bedtime (open sky), not on the control bar. */
 if(root.querySelector('[data-turtle105]'))return;
 const wrap=document.createElement('span');
 wrap.className='turtle105';
 wrap.setAttribute('data-turtle105','1');
 wrap.setAttribute('aria-hidden','true');
 wrap.innerHTML=turtleArt105('tuck',36,40);
 root.appendChild(wrap);
}

/* ---------------- Paint: turtle stamp + hex shell, night-soft ---------------- */
if(typeof PSTAMP_IDS101!=='undefined'&&PSTAMP_IDS101.indexOf('turtle')<0)PSTAMP_IDS101.push('turtle');
if(typeof PPAT101!=='undefined'&&PPAT101.indexOf('shell')<0)PPAT101.push('shell');
if(typeof STAMP101==='object'){
 STAMP101.turtle=function(x,c,s){
  x.save();
  x.translate(c[0],c[1]);
  x.beginPath();x.ellipse(s*.08,s*.02,s*.72,s*.48,0,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(-s*.72,s*.04,s*.28,s*.22,0,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(-s*.2,s*.55,s*.22,s*.14,0,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(s*.42,s*.52,s*.22,s*.14,0,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(-s*.15,-s*.48,s*.2,s*.16, -.4,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(s*.5,-s*.42,s*.2,s*.16,.4,0,Math.PI*2);x.fill();
  x.beginPath();x.moveTo(-s*.15,-s*.1);x.lineTo(s*.08,-s*.28);x.lineTo(s*.3,-s*.08);x.lineTo(s*.08,s*.16);x.closePath();
  x.globalAlpha*=.85;x.stroke();
  x.restore();
 };
}
{const prev=typeof paintPatternStamp101==='function'?paintPatternStamp101:null;
 if(prev)paintPatternStamp101=function(x,p){
  if((PT.pattern||'')==='shell'){
   const s=PT.size*PT.dpr,night=typeof paintNightSoft101==='function'&&paintNightSoft101();
   x.save();
   x.globalAlpha=night?.3:.5;
   if(night){x.shadowColor=x.strokeStyle||x.fillStyle||'#e6b454';x.shadowBlur=s*.22}
   x.lineWidth=Math.max(1,s*.08);x.lineJoin='round';
   const r=s*.26,w=r*1.75,h=r*1.55;
   for(let row=-2;row<=2;row++){
    for(let col=-2;col<=2;col++){
     const cx=p[0]+col*w+(row%2?w/2:0),cy=p[1]+row*h*.78;
     x.beginPath();
     for(let k=0;k<6;k++){
      const a=Math.PI/6+k*Math.PI/3,px=cx+r*Math.cos(a),py=cy+r*Math.sin(a);
      k?x.lineTo(px,py):x.moveTo(px,py);
     }
     x.closePath();x.stroke();
    }
   }
   x.restore();
   return;
  }
  return prev(x,p);
 };
}
{const prev=typeof paintStamp==='function'?paintStamp:null;
 if(prev)paintStamp=function(p){
  const night=typeof paintNightSoft101==='function'&&paintNightSoft101();
  const x=$('pcv')&&$('pcv').getContext('2d');
  if(x&&night&&PT.stampId==='turtle'){
   x.save();
   x.globalCompositeOperation='lighter';
   x.globalAlpha=.62;
   x.shadowColor=PT.col||'#e6b454';
   x.shadowBlur=10*(PT.dpr||1);
   const r=prev(p);
   x.restore();
   return r;
  }
  return prev(p);
 };
}
{const prev=typeof paintBar101==='function'?paintBar101:null;
 if(prev)paintBar101=function(){
  const r=prev.apply(this,arguments);
  const opt=document.querySelector('#paint select option[value="shell"], .pbar101 select option[value="shell"]');
  if(opt)opt.textContent=typeof gT==='function'?gT('Turtle shell'):'Turtle shell';
  return r;
 };
}

/* ---------------- Stories: merge happens via STORIES101 ---------------- */
function storiesTurtle105(){
 if(typeof STORIES101==='undefined')return;
 STORIES101.en=STORIES101.en||[];
 STORIES101.es=STORIES101.es||[];
 if(!STORIES101.en.some(s=>s.id==='d105_en_1_01'))STORIES101.en.push({
  id:'d105_en_1_01',grade:1,t:'The Hill Path',
  text:'The path went up a small hill. Tess walked. A turtle walked too, just beside her shoe.\n\nThe turtle was slow. Tess wanted to run. She looked back. The turtle was still coming, one careful step at a time.\n\nThe steep part was loose and sandy. The turtle tried and slid. It waited, then tried again. Tess waited too.\n\nThey reached a flat stone at the top. The town looked small and quiet below.\n\nTess sat. The turtle sat. The hill had not been in a hurry, and neither had they.',
  art:'hillTurtle',release101:0,
  q:[['Who walked beside Tess?',['A turtle','A bus','A cloud'],0],['What happened on the steep, sandy part?',['The turtle slid, then tried again','The hill disappeared','Tess ran ahead and hid'],0],['How did they reach the top?',['They went carefully and waited','They flew','They rolled down'],0]],
  talk:['Why did Tess wait?','What was the steep part like?'],
  coach:['Words: path, careful, steep.','Notice that trying again is quiet here, not a race.']
 });
 if(!STORIES101.es.some(s=>s.id==='d105_es_1_01'))STORIES101.es.push({
  id:'d105_es_1_01',grade:1,t:'Despacio por el huerto',
  text:'El huerto tenía un sendero de tierra. Nico caminaba. Una tortuga cruzaba el mismo sendero, cerca de su bota.\n\nLa tortuga iba despacio. Nico pensó en adelantarse. Miró atrás. La tortuga seguía, un paso corto y luego otro.\n\nUn tramo estaba blando por el riego. La tortuga resbaló. Se quedó quieta y lo intentó otra vez. Nico también esperó.\n\nLlegaron a la sombra de un limonero. El aire olía a hojas y a tierra húmeda.\n\nNico se sentó. La tortuga se quedó a su lado. El huerto no tenía prisa, y ellos tampoco.',
  art:'hillTurtle',release101:0,
  q:[['¿Quién cruzaba el sendero junto a Nico?',['Una tortuga','Un tren','Una nube'],0],['¿Qué pasó en el tramo blando?',['La tortuga resbaló y lo intentó otra vez','El huerto se cerró','Nico corrió y se escondió'],0],['¿Dónde se detuvieron al final?',['A la sombra de un limonero','En un autobús','Encima de un tejado'],0]],
  talk:['¿Por qué esperó Nico?','¿Cómo era el tramo del riego?'],
  coach:['Palabras: huerto, sendero, riego, despacio.','Noten que volver a intentarlo es calmo, no una carrera.']
 });
}
storiesTurtle105();

/* ---------------- Look Up: one sourced NOAA fact, no network ---------------- */
if(typeof LU_STORIES101==='object'){
 LU_STORIES101.seaturtle={
  src:'fisheries.noaa.gov',
  en:{
   t:'Sea turtles find their way',
   text:'A sea turtle can swim a very long way and still find the beach where it began.\n\nIt does not carry a map, of course. Scientists have learned that sea turtles can feel Earth\'s magnetic field — the same quiet field that makes a compass point north.\n\nTo a sea turtle, that field is both a compass and a kind of map. The ocean has a pattern of magnetic signatures, and the turtle can use them to stay on course.',
   facts:[
    'Sea turtles can detect Earth\'s magnetic field.',
    'They can use it as a compass and as a map.',
    'This helps them find their way across the ocean and back to a nesting beach.'
   ]
  },
  es:{
   t:'Las tortugas marinas encuentran el camino',
   text:'Una tortuga marina puede nadar un trecho muy largo y aun así encontrar la playa donde comenzó.\n\nNo lleva un mapa, claro. Quienes investigan han aprendido que las tortugas marinas pueden sentir el campo magnético de la Tierra: el mismo campo callado que hace que una brújula apunte al norte.\n\nPara una tortuga marina, ese campo es brújula y también una especie de mapa. El océano tiene un dibujo de firmas magnéticas, y la tortuga puede usarlas para seguir su rumbo.',
   facts:[
    'Las tortugas marinas pueden detectar el campo magnético de la Tierra.',
    'Pueden usarlo como brújula y como mapa.',
    'Eso les ayuda a cruzar el océano y volver a una playa de anidación.'
   ]
  }
 };
}
{const prev=typeof luStoryHTML101==='function'?luStoryHTML101:null;
 if(prev)luStoryHTML101=function(id){
  if(id==='seaturtle'){
   const s=luStoryLang101(id);if(!s)return '';
   const art=`<div class="luTurtleArt105">${turtleArt105('lookup',200,200)}</div>`;
   return `<div class="card luStory101"><button type="button" onclick="luStoryClose101()">${gT('Back')}</button><h2 class="kline">${esc(s.t)}</h2>${art}<p class="kline">${esc(s.text).replace(/\n\n/g,'</p><p class="kline">')}</p><ul class="facts101 kline">${s.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p class="soft lu83-credit">${esc(gT('Sea turtle facts follow NOAA Fisheries ({src}).',{src:s.src}))}</p></div>`;
  }
  return prev(id);
 };
}
function luTurtleNav105(){
 const s=typeof luStoryLang101==='function'?luStoryLang101('seaturtle'):null;
 if(!s)return '';
 return `<div class="card" data-luturtle105="1"><h3>${gT('A fact to notice')}</h3><p class="soft">${gT('A short, true note, with its source.')}</p><div class="hubgrid"><button class="hubtile" type="button" onclick="luStoryOpen101('seaturtle')">${turtleArt105('swim',80,90)}<span class="kline">${esc(s.t)}</span></button></div></div>`;
}
{const prev=typeof luRender83==='function'?luRender83:null;
 if(prev)luRender83=function(){
  const r=prev.apply(this,arguments);
  const root=$('lookup');if(!root)return r;
  if(LU83&&LU83.story101)return r;
  if(!root.querySelector('[data-luturtle105]')){
   const host=root.querySelector('[data-lustories101]')||root.querySelector('.card:last-child')||root;
   host.insertAdjacentHTML('afterend',luTurtleNav105());
  }
  turtlePlace105('lookup');
  return r;
 };
}

/* ---------------- Bedtime Waves: very slow drift, no flash ---------------- */
{const prev=typeof btDrawWaves101==='function'?btDrawWaves101:null;
 if(prev)btDrawWaves101=function(x,W,H,t,fade){
  prev(x,W,H,t,fade);
  const reduce=typeof lampReduced73==='function'&&lampReduced73();
  const period=64;
  const u=reduce?0.5:((t+32)/period)%2;
  const k=u<1?u:2-u;
  const ease=.5-.5*Math.cos(k*Math.PI);
  const px=W*(.14+.36*ease);
  const py=H*(.34+(reduce?0:.02)*Math.sin(t*.1));
  const sc=Math.min(W,H)*0.08;
  const pal=turtlePal105();
  x.save();
  x.globalAlpha=Math.max(0,.5*(fade||1));
  x.translate(px,py);
  x.scale(sc/40,sc/40);
  x.fillStyle='#6f9a7a';
  x.strokeStyle='#8fb8a4';
  x.lineWidth=1.2;
  x.beginPath();x.ellipse(6,0,22,13,0,0,Math.PI*2);x.fill();x.stroke();
  x.fillStyle='#e8c894';
  x.beginPath();x.ellipse(-20,0,8,5.5,0,0,Math.PI*2);x.fill();
  x.fillStyle='#72583f';
  x.beginPath();x.arc(-23,-1.2,1.2,0,Math.PI*2);x.fill();
  x.fillStyle='#e8c894';
  x.beginPath();x.ellipse(-6,12,7,3.2,-.4,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(14,12,7,3.2,.4,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(-8,-12,6,3.2,-.5,0,Math.PI*2);x.fill();
  x.beginPath();x.ellipse(16,-11,6,3.2,.5,0,Math.PI*2);x.fill();
  x.strokeStyle=pal.mid;x.globalAlpha*=.8;x.lineWidth=1.1;
  x.beginPath();x.moveTo(-4,-2);x.lineTo(6,-8);x.lineTo(16,-2);x.stroke();
  x.restore();
 };
}

/* ---------------- Companion: Shell / Concha, open from the start ---------------- */
if(typeof FRIENDS101!=='undefined'&&FRIENDS101.indexOf('turtle')<0)FRIENDS101.push('turtle');
/* v115 folded: friendsLoad101 / friendsPut101 live in v101.js (includes Shell, Dragon, and Phoenix). */
{const prev=typeof friendKindName101==='function'?friendKindName101:null;
 if(prev)friendKindName101=function(kind){return kind==='turtle'?gT('Shell'):prev(kind)};
}
{const prev=typeof friendState101==='function'?friendState101:null;
 if(prev)friendState101=function(kind,pid){
  if(kind==='turtle')return friendNorm101(friendsLoad101(pid).turtle);
  return prev(kind,pid);
 };
}
{const prev=typeof friendArtInner101==='function'?friendArtInner101:null;
 if(prev)friendArtInner101=function(id,stage){
  if(id==='turtle')return turtleArtStage105(stage);
  return prev(id,stage);
 };
}
{const prev=typeof friendOfferMaybe101==='function'?friendOfferMaybe101:null;
 if(prev)friendOfferMaybe101=function(){
  if(typeof LAMP73==='object'&&LAMP73.shown)return;
  if(document.querySelector('dialog.lamp73-dialog, dialog.friendOffer101'))return;
  const pid=curPid(),f=friendsLoad101(pid);
  if(f.offered)return;
  const s=lampLoad73(pid);
  if(s&&s.pending&&s.pending.length)return;
  f.offered=true;friendsPut101(f,pid);
  const d=document.createElement('dialog');
  d.className='friendOffer101';
  d.setAttribute('aria-modal','true');
  d.setAttribute('aria-label',gT('A new friend'));
  d.innerHTML=`<p class="kline">${esc(gT('A Moth, an Owl, and a Turtle named Shell would like to sit with you, if you want. You can pick one, or keep your Lamp. You can change anytime in Kids.'))}</p>
<div class="row101">
<button type="button" class="p" data-pick="moth">${esc(gT('Moth'))}</button>
<button type="button" class="p" data-pick="owl">${esc(gT('Owl'))}</button>
<button type="button" class="p" data-pick="turtle">${esc(gT('Shell'))}</button>
<button type="button" data-pick="lamp">${esc(gT('Keep the Lamp'))}</button>
</div>`;
  const finish=pick=>{
   if(pick&&pick!=='lamp'){f.active=pick;friendsPut101(f,pid)}
   try{if(d.open)d.close()}catch(e){}
   d.remove();
   if(typeof lampMountAll73==='function')lampMountAll73();
   friendLine101();
  };
  d.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>finish(b.dataset.pick));
  d.addEventListener('cancel',e=>{e.preventDefault();finish('lamp')});
  document.body.appendChild(d);
  if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');
  d.querySelector('button').focus({preventScroll:true});
 };
}
{const prev=typeof helpCompanion101==='function'?helpCompanion101:null;
 if(prev)helpCompanion101=function(){
  const r=prev.apply(this,arguments);
  const p=$('helpFriend101');
  if(p)p.textContent=gT('A Moth, an Owl, and a Turtle named Shell can sit with them too. Only the one who is with them grows; the others rest and keep what they have. You can switch at any time in Kids.');
  return r;
 };
}
{const prev=typeof whatsNewAttach101==='function'?whatsNewAttach101:null;
 if(prev)whatsNewAttach101=function(){
  const r=prev.apply(this,arguments);
  const box=document.querySelector('#whatsNew101, [data-whatsnew101], .whatsNew101');
  const p=box&&box.querySelector('p');
  if(p&&/Moth and an Owl|Polilla y un Búho|Polilla y un Buho/i.test(p.textContent||'')){
   p.textContent=gT("Today's Story now brings one new story each day. Paint, Sound cards, Look Up, and Bedtime Glow are ready to enjoy. A Moth, an Owl, and a Turtle named Shell can sit with your child — pick one in Kids, or keep the Lamp. Only the one who is with them grows.");
  }
  return r;
 };
}

/* ---------------- Sound card: honest water and soft steps, not a voice ---------------- */
if(typeof SCARDS101!=='undefined'&&!SCARDS101.some(c=>c.id==='turtle')){
 SCARDS101.push({id:'turtle',cat:'water',en:'A turtle swims',es:'Una tortuga nada',play:'turtle'});
}
if(typeof SCART101==='object'){
 SCART101.turtle=()=>ag101('<defs><clipPath id="scTurtleV3"><circle cx="50" cy="50" r="45.5"/></clipPath></defs><g clip-path="url(#scTurtleV3)"><path d="M0 64 Q22 52 40 64 Q58 76 78 60 Q90 52 100 58 L100 100 L0 100Z" fill="#C2DCE2"/><path d="M0 76 Q24 64 42 76 Q62 88 84 72 Q94 66 100 72 L100 100 L0 100Z" fill="#7BA9BA"/><path d="M8 64 Q22 56 34 64" fill="none" stroke="#FFF6D8" stroke-width="2"/><path d="M50 68 Q66 58 82 66" fill="none" stroke="#FFF6D8" stroke-width="2"/></g><ellipse cx="52" cy="48" rx="20" ry="13" fill="#6F9A7A"/><path d="M40 46 L48 40 L56 46 L64 40" fill="none" stroke="#C5DDD0" stroke-width="1.3"/><ellipse cx="28" cy="48" rx="8" ry="6" fill="#E8C894"/><circle cx="25" cy="46.5" r="1.4" fill="#463F52" stroke="none"/><circle cx="24.4" cy="45.8" r=".5" fill="#FFF6D8" stroke="none"/><path d="M28 51 Q32 53 34 51" fill="none" stroke-width="1.1"/><path d="M42 56 Q32 70 22 68" fill="#E8C894"/><path d="M60 54 Q74 68 80 60" fill="#E8C894"/><path d="M46 58 Q42 70 34 72" fill="#E8C894"/><path d="M58 58 Q66 72 74 70" fill="#E8C894"/><path d="M70 48 Q78 46 80 52" fill="none" stroke-width="1.5"/>','#6F9A7A');
}
if(typeof SCGAIN102==='object')SCGAIN102.turtle=2.1;
/* v115 folded: turtle swim sound lives in v102.js scPlay101. */

/* ---------------- Hooks: place turtles after shows and redraws, never wrap show() ---------------- */
{const prev=typeof afterShow95==='function'?afterShow95:null;
 if(prev)afterShow95=function(id){
  const r=prev.apply(this,arguments);
  turtlePlace105(id);
  return r;
 };
}
{const prev=typeof renderSoundcards101==='function'?renderSoundcards101:null;
 if(prev)renderSoundcards101=function(){const r=prev.apply(this,arguments);turtlePlace105('soundcards');return r};
}
function turtleHookDraw105(name){
 if(typeof window[name]!=='function')return;
 const prev=window[name];
 window[name]=function(){
  const r=prev.apply(this,arguments);
  if(name==='renderHub')turtlePlace105('hub');
  else turtlePlace105('math');
  return r;
 };
}
function turtleInstallHooks105(){
 if(turtleInstallHooks105.done)return;
 turtleInstallHooks105.done=true;
 ['renderMath','mathCountDraw','mathShapeDraw','mathTenDraw'].forEach(turtleHookDraw105);
 if(typeof RENDER==='object'&&typeof RENDER.hub==='function'&&!RENDER.hub._turtle105){
  const prev=RENDER.hub;
  RENDER.hub=function(){const r=prev.apply(this,arguments);turtlePlace105('hub');return r};
  RENDER.hub._turtle105=1;
 }
 if(typeof renderHub==='function'&&!renderHub._turtle105){
  const prev=renderHub;
  renderHub=function(){const r=prev.apply(this,arguments);turtlePlace105('hub');return r};
  renderHub._turtle105=1;
  if(typeof RENDER==='object')RENDER.hub=renderHub;
 }
 try{
  const vis=['hub','letters','cards','paint','lookup','songs88','look','about','kids','adults','games','lib','math','soundcards','bedtime'];
  vis.forEach(id=>{const el=$(id);if(el&&!el.classList.contains('hidden'))turtlePlace105(id)});
 }catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',turtleInstallHooks105);
else turtleInstallHooks105();
