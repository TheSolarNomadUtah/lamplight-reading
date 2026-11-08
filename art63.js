// v63 original-art presentation layer. Reuses the hand-drawn v16 characters/objects.
// Legacy emoji identifiers stay in old data/backups, but are never used as pictures.
// Every picture has a warm, outlined backing so it remains legible in every theme.
// Strengthen the outlines of all reused art, preserving faces and the original silhouettes.
// A shared warm plate is also used by profile art and word cards on light/dark backgrounds.
{const face=ART.face;ART.face=function(){return '<g data-face63="">'+face.apply(this,arguments)+'</g>'};
 const outline=(markup,width)=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.innerHTML=markup;svg.querySelectorAll('path,circle,ellipse,rect,polygon,line,polyline').forEach(el=>{if(el.closest('[data-face63]')||Number(el.getAttribute('opacity')||1)<.5)return;el.setAttribute('stroke','#72583f');el.setAttribute('stroke-width',Math.max(width,Number(el.getAttribute('stroke-width')||0)))});return svg.innerHTML};
 for(const [k,fn] of Object.entries(ART.obj))ART.obj[k]=function(f){let art=fn(f);if(k==='milk')art=art.replace(/<text[^>]*>MILK<\/text>/,'<path d="M150 150Q125 177 150 187Q175 177 150 150Z" fill="#fffaf0"/>');return outline(art,5)};
 const creature=ART.creature;ART.creature=function(){let svg=creature.apply(this,arguments);const open=svg.match(/^<svg[^>]*>/)[0];return open+'<circle cx="50" cy="50" r="49" fill="#fff2d8" stroke="#72583f" stroke-width="1.5"/>'+outline(svg.slice(open.length,-6),1.6)+'</svg>'};
 const card=cardSVG;cardSVG=function(){return card.apply(this,arguments).replace('<g class="artbob">','<g class="artbob"><circle cx="150" cy="150" r="133" fill="#fff2d8" stroke="#72583f" stroke-width="4"/>')}
}
const ART63={cache:{},replaced:0,seen:new Set(),legacy:l61Art};
const ICON63={};
function iconGroup63(chars,key){chars.split(' ').filter(Boolean).forEach(c=>ICON63[c.replace(/\ufe0f/g,'')]=key)}
Object.entries({fox:'🦊',bear:'🐻 🧸',bunny:'🐰 🐇',turtle:'🐢',owl:'🦉',cat:'🐱',pup:'🐶',unicorn:'🦄',frog:'🐸',rocket:'🚀',star:'🌟 ⭐ ✨ 💫',moon:'🌙 🌑',cow:'🐮 🐄',duck:'🦆',sheep:'🐑',snake:'🐍',bee:'🐝',letterA:'🅰️',letterB:'🅱️',letterM:'Ⓜ️',hand:'👏 🙌 ✋ 👇 👍',baby:'👶',speaker:'🔊 🔇',person:'👧 👩 👨 🧒 🧑',letters:'🔤',palette:'🎨 🖌️',speech:'💬 🗣️ 🗣',paper:'📋 📄 📝',globe:'🌐',home:'🏡 🏠',notes:'🎵 🎶 🎼',microphone:'🎤 🎙️',drum:'🥁 🪘',spark:'💥 🎉',ear:'👂',lock:'🔒',happy:'😊 🙂 🤪',calm:'😌',piano:'🎹',bell:'🔔',cloud:'☁️',sun:'☀️',snail:'🐌',cup:'🥤 ☕',lady:'🐞',milk:'🥛',mouse:'🐭',ball:'⚽',bus:'🚌',book:'📚 📖 📗',search:'🔍',puzzle:'🧩',printer:'🖨️',pencil:'✍️',picture:'🖼️',school:'🏫 ⛪',chart:'📈',question:'❓',family:'👪 👫 👯 🤝',paw:'🐾',apple:'🍎',heart:'💛 💓 💗 💛',fish:'🐟',bed:'🛏️',lamp:'🪔 💡',door:'🚪',rain:'🌧️',egg:'🥚',bread:'🍞',pear:'🍐',foot:'🦶',eye:'👁️',nose:'👃',sad:'😢',mad:'😠',headphones:'🎧',dot:'🔴 ⭕',rainbow:'🌈',sponge:'🧽',flower:'🌸 🌻 🌹',trash:'🗑️',save:'💾',science:'🔬 🧪',wheel:'🎡',ladder:'🪜',spiral:'🌀',snow:'❄️',bubbles:'🫧',blocks:'🧱',wifi:'📶',phone:'📲',guitar:'🪕 🎸',bolt:'⚡',violin:'🎻',waves:'🌊',bow:'🎀',game:'🕹️ 🎮',shuffle:'🔀',clock:'⏱ ⏰ ⏳',target:'🎯',numbers:'🔢',planet:'🪐',sunrise:'🌅',space:'🌌',shell:'🐚',desert:'🏜️',wood:'🪵',flag:'🏁',trophy:'🏆',balance:'⚖️',mirror:'🪞',magnet:'🧲',noun:'🟦',pronoun:'🟪',adjective:'🟧',candle:'🕯️',repeat:'🔁'}).forEach(([key,chars])=>iconGroup63(chars,key));
const LABEL63={pup:'Dog',bunny:'Rabbit',lady:'Ladybug',letterA:'Letter A',letterB:'Letter B',letterM:'Letter M',notes:'Music',noun:'Noun',pronoun:'Pronoun',adjective:'Adjective',dot:'Circle'};
function artLabel63(k){return LABEL63[k]||k[0].toUpperCase()+k.slice(1)}
function artInner63(k){
 if(ART.obj[k])return `<g transform="translate(8 8) scale(.28)">${ART.obj[k](ART.face)}</g>`;
 if(k==='cactus')return '<g stroke="#72583f" stroke-width="2.5" stroke-linejoin="round"><path d="M39 88V24Q39 11 50 11Q61 11 61 24V88M39 59H22Q17 59 17 51V36H28V48H39M61 47H73V28H85V53Q85 60 77 60H61" fill="#8fbb92"/>'+ART.face(50,40,.85,'happy')+'</g>';
 if(k==='whale')return '<g stroke="#72583f" stroke-width="2.5" stroke-linejoin="round"><path d="M74 57Q86 37 96 40L90 64Q97 88 82 82L74 72C41 96 10 75 13 52Q17 22 50 31Q73 32 74 57Z" fill="#96bfd5"/><path d="M45 73Q63 96 67 66M35 28Q25 10 20 24M35 28Q40 6 48 18" fill="none"/>'+ART.face(40,52,.85,'happy')+'</g>';
 if(AVATARS[k])return `<svg x="8" y="8" width="84" height="84" viewBox="-6 -8 112 112">${ART.creature(AVATARS[k],100).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`;
 if(k==='dog')return artInner63('pup');
 if(k==='heart')return artInner63('love');
 if(k==='fish'||k==='duck')return `<g transform="translate(8 8) scale(.28)">${ART.extra[k]}${ART.face(k==='fish'?115:122,k==='fish'?150:118,2,'happy')}</g>`;
 const face=(x=50,y=49,s=1.2,ex='happy')=>ART.face(x,y,s,ex),path=d=>`<path d="${d}"/>`,rect=(x,y,w,h,r=5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
 const common={
 cow:()=>ART.creature({c:'#f5ead8',e:'horns',x2:'#dbc29a',ex:'happy',snout:1},100).replace(/^<svg[^>]*>|<\/svg>$/g,''),
 sheep:()=>`<g fill="#fffdf3">${[20,35,50,65,80].map(x=>`<circle cx="${x}" cy="44" r="15"/>`).join('')}<ellipse cx="50" cy="64" rx="33" ry="23"/></g><ellipse cx="50" cy="50" rx="22" ry="23" fill="#c8ac93"/>${face(50,49)}`,
 snake:()=>'<path d="M24 75Q10 59 31 55T64 40Q83 13 62 16Q40 14 48 37" fill="none" stroke="#6eac7b" stroke-width="15" stroke-linecap="round"/>'+face(60,24,.65),
 snail:()=>'<path d="M15 73H80Q88 48 75 45L72 30M79 47L85 32" fill="none" stroke="#86ad83" stroke-width="10" stroke-linecap="round"/><circle cx="43" cy="54" r="24" fill="#e0ad7c"/><path d="M55 52Q46 33 30 47T45 68Q58 58 44 50" fill="none"/>'+face(79,45,.5),
 mouse:()=>ART.creature({c:'#b5acba',e:'round',belly:'#f3e6e8',snout:1,ex:'happy'},100).replace(/^<svg[^>]*>|<\/svg>$/g,''),
 rocket:()=>'<path d="M38 69L31 90L50 80L69 90L62 69M31 51L18 73H37M69 51L82 73H63" fill="#d79477"/><path d="M50 9Q20 36 35 75H65Q80 36 50 9Z" fill="#b7d7df"/><circle cx="50" cy="40" r="12" fill="#fff2ce"/>',
 heart:()=>ART.obj.love(ART.face).replace(/(\d+(?:\.\d+)?)/g,x=>x),
 leaf:()=>'<path d="M17 78Q4 29 81 16Q93 72 36 79Z" fill="#8dc59a"/><path d="M15 86L70 28M35 65L30 43M49 50L71 52" fill="none"/>',
 tree:()=>'<path d="M43 51H57V89H43Z" fill="#a88361"/><path d="M50 8L77 41H65L87 66H13L35 41H23Z" fill="#83b78c"/>'+face(50,48,.9),
 butterfly:()=>'<path d="M49 45C15 4 0 48 33 57C5 87 39 96 49 62M51 45C85 4 100 48 67 57C95 87 61 96 51 62" fill="#b8a5d8"/><path d="M50 37V73M46 38L40 27M54 38L60 27" fill="none" stroke-width="6"/>',
 boat:()=>'<path d="M12 65H88L72 85H28Z" fill="#cf9b73"/><path d="M48 12V64H16Z" fill="#f2d483"/><path d="M54 24V61H81Z" fill="#92bed8"/><path d="M8 92Q19 86 30 92T52 92T74 92T96 92" fill="none"/>',
 kite:()=>'<path d="M50 10L77 40L50 70L23 40Z" fill="#b4c4e5"/><path d="M50 10V70M23 40H77M50 70Q72 78 47 92" fill="none"/>',
 flower:()=>`<path d="M50 48V88M49 77Q20 53 27 81Q40 90 49 85" fill="#91bc84"/><g fill="#d9a9c9">${[0,72,144,216,288].map(a=>`<ellipse cx="50" cy="27" rx="12" ry="19" transform="rotate(${a} 50 44)"/>`).join('')}</g><circle cx="50" cy="44" r="17" fill="#f4d280"/>${face(50,45,.8)}`,
 candle:()=>'<path d="M49 10Q22 36 50 40Q75 32 49 10Z" fill="#efb75e"/><path d="M33 44H67V88H33Z" fill="#f0cf8e"/><path d="M25 90H75"/>'+face(50,65,.85),
 home:()=>'<path d="M12 46L50 14L88 46M23 40V86H77V40" fill="#d5ac87"/><path d="M42 63H61V86H42Z" fill="#eacb96"/><path d="M28 51H39V62H28Z" fill="#b8d9e8"/>',
 school:()=>'<path d="M12 44L50 13L88 44M19 42V87H81V42" fill="#d1b1ce"/><path d="M42 64H58V87H42ZM26 49H35V59H26ZM65 49H74V59H65Z" fill="#fff0c8"/><circle cx="50" cy="37" r="9" fill="#fff0c8"/><path d="M50 31V37L56 41" fill="none"/>',
 paper:()=>'<path d="M24 12H63L79 29V89H24Z" fill="#fffaf0"/><path d="M63 12V29H79M34 43H65M34 55H65M34 67H56" fill="none"/>',
 pencil:()=>'<path d="M22 72L66 15L80 26L36 83L17 90Z" fill="#eac77d"/><path d="M22 72L36 83M17 90L23 78M66 15L80 26" fill="none"/>',
 palette:()=>'<path d="M50 13C1 8 3 82 43 88C77 93 55 64 80 59C108 52 83 14 50 13Z" fill="#d7b590"/><g stroke="none"><circle cx="31" cy="35" r="9" fill="#db8c89"/><circle cx="57" cy="29" r="9" fill="#eac77d"/><circle cx="77" cy="44" r="8" fill="#8fb6c9"/><circle cx="25" cy="61" r="8" fill="#8fb693"/></g>',
 picture:()=>'<path d="M11 17H89V84H11Z" fill="#d7bc92"/><path d="M19 25H81V76H19Z" fill="#c3dbdf"/><path d="M19 76L42 43L60 65L73 50L81 76Z" fill="#87aa86"/><circle cx="68" cy="37" r="8" fill="#f0cf85"/>',
 drum:()=>'<ellipse cx="50" cy="38" rx="34" ry="15" fill="#fff0d1"/><path d="M16 38V73Q50 96 84 73V38Q50 62 16 38Z" fill="#d49b8d"/><path d="M19 43L33 80L50 53L67 80L81 43M17 13L65 34M83 13L35 34" fill="none"/>',
 piano:()=>'<path d="M12 27H88V80H12Z" fill="#fffaf0"/><path d="M12 27H88V38H12Z" fill="#715e56"/><path d="M27 40V80M42 40V80M57 40V80M72 40V80" fill="none"/><path d="M22 38H31V61H22ZM37 38H46V61H37ZM67 38H76V61H67Z" fill="#715e56"/>',
 guitar:()=>'<path d="M61 43Q40 31 39 52Q12 43 18 72Q25 96 44 77Q65 78 58 57L84 24L73 16Z" fill="#d6a56d"/><circle cx="38" cy="62" r="9" fill="#77604c"/><path d="M38 62L79 20" fill="none"/>',
 violin:()=>'<path d="M61 43Q35 32 36 52Q14 48 22 77Q38 92 49 74Q69 78 60 57L78 22L68 17Z" fill="#ca9666"/><path d="M40 65L73 20M15 21L76 84" fill="none"/>',
 notes:()=>'<path d="M36 70V29L76 20V60M36 40L76 31" fill="none" stroke-width="6"/><ellipse cx="24" cy="74" rx="13" ry="9" fill="#a79bc9"/><ellipse cx="64" cy="65" rx="13" ry="9" fill="#a79bc9"/>',
 microphone:()=>'<rect x="36" y="12" width="28" height="48" rx="14" fill="#a9bdca"/><path d="M26 42V51Q26 76 50 76Q74 76 74 51V42M50 76V89M35 90H65M39 27H61M39 37H61" fill="none"/>',
 speaker:()=>'<path d="M15 38H33L55 19V81L33 62H15Z" fill="#9eb5ce"/><path d="M65 35Q81 50 65 65M74 20Q102 50 74 80" fill="none"/>',
 bell:()=>'<path d="M23 70Q31 63 31 41Q31 18 50 18Q69 18 69 41Q69 63 77 70Z" fill="#eac77d"/><path d="M42 80Q50 94 58 80M50 10V18" fill="none"/>',
 lock:()=>'<path d="M31 43V30Q31 9 50 9Q69 9 69 30V43" fill="none" stroke-width="8"/><rect x="20" y="40" width="60" height="48" rx="9" fill="#e8c57a"/><circle cx="50" cy="61" r="7" fill="#6b5440"/><path d="M50 64V74" fill="none"/>',
 search:()=>'<circle cx="42" cy="40" r="26" fill="#c6dde2"/><path d="M62 60L86 86" stroke-width="10"/>',
 puzzle:()=>'<path d="M17 17H43Q34 38 51 38Q69 38 60 17H83V43Q62 34 62 51Q62 69 83 60V83H58Q66 62 49 62Q32 62 41 83H17V60Q38 68 38 51Q38 34 17 42Z" fill="#aec598"/>',
 blocks:()=>'<path d="M13 49H48V86H13ZM51 49H87V86H51ZM32 12H68V46H32Z" fill="#c6afd2"/><path d="M19 62H41M58 62H80M39 26H61" fill="none"/>',
 ladder:()=>'<path d="M28 10V90M72 10V90M28 22H72M28 39H72M28 56H72M28 73H72" fill="none" stroke-width="7"/>',
 chart:()=>'<path d="M16 14V84H89M23 65L41 48L57 59L82 24" fill="none" stroke-width="6"/>',
 printer:()=>'<path d="M29 13H73V39H29Z" fill="#fffaf0"/><rect x="13" y="37" width="74" height="42" rx="8" fill="#b1bdc8"/><path d="M28 62H73V90H28Z" fill="#fffaf0"/><path d="M38 73H64M38 82H64" fill="none"/>',
 trash:()=>'<path d="M25 31H75L69 89H31ZM19 27H81M37 27V14H63V27M43 43V76M57 43V76" fill="#c1b5c9"/>',
 save:()=>'<path d="M18 13H72L86 27V88H18Z" fill="#aab5cf"/><path d="M31 13H65V41H31ZM31 61H72V88H31Z" fill="#fff6df"/>',
 sponge:()=>'<path d="M15 34Q17 20 29 25L77 35Q90 38 86 55L79 78Q76 89 61 85L20 74Q10 72 11 60Z" fill="#e6c37c"/><g fill="#bd9b5d" stroke="none"><circle cx="31" cy="44" r="5"/><circle cx="57" cy="54" r="6"/><circle cx="35" cy="65" r="4"/></g>',
 wifi:()=>'<path d="M13 35Q50 3 87 35M26 51Q50 30 74 51M39 67Q50 58 61 67" fill="none" stroke-width="8"/><circle cx="50" cy="82" r="5" fill="#8b9bc4"/>',
 phone:()=>'<rect x="28" y="10" width="45" height="80" rx="9" fill="#a9bbc9"/><rect x="34" y="23" width="33" height="50" fill="#fff5dd"/><path d="M46 82H54"/>',
 game:()=>'<path d="M31 29H69Q84 26 88 54L93 73Q87 90 73 72L66 64H34L27 72Q13 90 7 73L12 54Q16 26 31 29Z" fill="#c1afd1"/><path d="M24 42V59M16 50H32" fill="none"/><circle cx="71" cy="45" r="5" fill="#efc77a"/><circle cx="80" cy="57" r="5" fill="#dc9e9d"/>',
 numbers:()=>'<path d="M16 15V87M84 15V87M16 30H84M16 52H84M16 74H84" fill="none"/><g fill="#cf9c8e"><circle cx="30" cy="30" r="8"/><circle cx="53" cy="30" r="8"/><circle cx="64" cy="52" r="8"/><circle cx="37" cy="74" r="8"/></g>',
 globe:()=>'<circle cx="50" cy="50" r="36" fill="#adcfdc"/><path d="M16 45H84M19 64H81M50 14Q20 50 50 86Q80 50 50 14Z" fill="none"/>',
 planet:()=>'<circle cx="50" cy="49" r="27" fill="#c7b3d9"/><ellipse cx="50" cy="49" rx="46" ry="12" transform="rotate(-27 50 49)" fill="none" stroke="#bb956e" stroke-width="7"/>',
 space:()=>'<path d="M16 15H84V85H16Z" fill="#666f9b"/><circle cx="36" cy="37" r="12" fill="#f4d997"/><path d="M63 52L67 62L78 63L69 70L72 80L63 74L54 80L57 70L48 63L59 62Z" fill="#f4d997"/>',
 sunrise:()=>'<path d="M23 67A27 27 0 0 1 77 67" fill="#efc77a"/><path d="M11 69H89M50 18V28M18 30L25 38M82 30L75 38" fill="none"/>',
 rainbow:()=>'<path d="M12 80A38 38 0 0 1 88 80" fill="none" stroke="#ce8e91" stroke-width="12"/><path d="M24 80A26 26 0 0 1 76 80" fill="none" stroke="#e6c478" stroke-width="12"/><path d="M36 80A14 14 0 0 1 64 80" fill="none" stroke="#91b4a0" stroke-width="12"/>',
 snow:()=>'<path d="M50 12V88M17 31L83 69M17 69L83 31M40 20L50 30L60 20M40 80L50 70L60 80M24 29L28 42L16 46M84 54L72 58L76 71M17 55L28 58L24 72M76 28L72 42L84 46" fill="none" stroke="#6d9db3" stroke-width="5"/>',
 waves:()=>'<path d="M9 31Q20 15 31 31T53 31T75 31T97 31M9 51Q20 35 31 51T53 51T75 51T97 51M9 71Q20 55 31 71T53 71T75 71T97 71" fill="none" stroke="#7ba9ba" stroke-width="6"/>',
 bubbles:()=>'<g fill="#c2dce2"><circle cx="30" cy="63" r="22"/><circle cx="69" cy="37" r="19"/><circle cx="67" cy="79" r="12"/></g><path d="M18 58Q19 48 29 48M59 33Q61 24 70 24" fill="none" stroke="#fffaf0"/>',
 wood:()=>'<path d="M20 19H73Q88 50 74 85H20Z" fill="#c79c73"/><ellipse cx="22" cy="52" rx="14" ry="33" fill="#e8c599"/><path d="M44 29L70 29M44 46L77 46M43 66L70 66" fill="none"/>',
 shell:()=>'<path d="M50 86C-3 78 0 26 20 24Q31 0 50 19Q69 0 80 24C100 26 103 78 50 86Z" fill="#e0b1b8"/><path d="M50 86L21 28M50 86V22M50 86L79 28" fill="none"/>',
 desert:()=>'<path d="M8 74Q43 43 92 72V90H8Z" fill="#e3bd85"/><path d="M41 72V22Q41 12 49 12Q57 12 57 22V72M41 49H29V35M57 42H70V26" fill="none" stroke="#78a484" stroke-width="9"/>',
 bow:()=>'<path d="M49 46L15 20V80L49 55M51 46L85 20V80L51 55" fill="#dc9eae"/><circle cx="50" cy="50" r="12" fill="#c78294"/>',
 bolt:()=>'<path d="M55 10L18 56H46L38 91L84 39H55Z" fill="#ebc777"/>',
 target:()=>'<circle cx="50" cy="50" r="36" fill="#d79998"/><circle cx="50" cy="50" r="25" fill="#fff3d7"/><circle cx="50" cy="50" r="12" fill="#d79998"/>',
 clock:()=>'<circle cx="50" cy="53" r="32" fill="#c2d5d4"/><path d="M50 31V53L68 62M39 10H61M50 10V20" fill="none" stroke-width="5"/>',
 trophy:()=>'<path d="M28 18H72V46Q70 70 50 70Q30 70 28 46Z" fill="#ebcc83"/><path d="M28 27H12V42Q12 58 32 56M72 27H88V42Q88 58 68 56M50 70V87M32 89H68" fill="none"/>',
 flag:()=>'<path d="M22 12V91M25 15H83V56H25Z" fill="#fff3d7"/><path d="M25 15H44V35H25ZM44 35H63V56H44ZM63 15H83V35H63Z" fill="#79717d"/>',
 balance:()=>'<path d="M50 13V87M24 89H76M17 32H83M27 32L13 61H41ZM73 32L59 61H87Z" fill="#e6cb8d"/>',
 mirror:()=>'<ellipse cx="50" cy="39" rx="29" ry="31" fill="#c4dce4"/><path d="M43 68H57L64 90H36ZM35 25L61 49" fill="#d3ac92"/>',
 magnet:()=>'<path d="M24 19V58Q24 87 50 87Q76 87 76 58V19H59V58Q59 70 50 70Q41 70 41 58V19Z" fill="#cd8d91"/><path d="M24 19H41V35H24ZM59 19H76V35H59Z" fill="#b7ced8"/>',
 science:()=>'<path d="M40 11H61M44 11V43L22 80Q16 89 28 89H76Q86 89 80 80L57 43V11" fill="#c1d8d9"/><path d="M34 61H69L80 80Q85 89 73 89H28Q18 89 22 80Z" fill="#99bb97"/>',
 wheel:()=>'<circle cx="50" cy="42" r="30" fill="#c7b3d7"/><path d="M50 12V72M20 42H80M29 21L71 63M29 63L71 21M50 42L28 91M50 42L72 91" fill="none"/>',
 speech:()=>'<path d="M13 19H87V68H45L26 85V68H13Z" fill="#c4b9d8"/><path d="M28 35H73M28 49H63" fill="none"/>',
 headphones:()=>'<path d="M19 60V48Q19 12 50 12Q81 12 81 48V60" fill="none" stroke-width="8"/><path d="M12 48H29V79H12ZM71 48H88V79H71Z" fill="#b6a7d0"/>',
 paw:()=>'<ellipse cx="50" cy="65" rx="24" ry="19" fill="#cfaa8c"/><g fill="#cfaa8c"><ellipse cx="22" cy="40" rx="9" ry="12"/><ellipse cx="41" cy="27" rx="9" ry="12"/><ellipse cx="61" cy="27" rx="9" ry="12"/><ellipse cx="80" cy="40" rx="9" ry="12"/></g>',
 ball:()=>'<circle cx="50" cy="50" r="36" fill="#fff7e4"/><path d="M50 32L67 44L61 63H39L33 44Z" fill="#8b9bb6"/><path d="M33 44L16 37M50 32V14M67 44L84 37M61 63L72 80M39 63L28 80" fill="none"/>',
 bus:()=>'<rect x="10" y="25" width="80" height="51" rx="10" fill="#edcb7e"/><path d="M19 35H34V55H19ZM42 35H57V55H42ZM65 35H81V55H65Z" fill="#bdd8df"/><circle cx="28" cy="79" r="10" fill="#776b61"/><circle cx="72" cy="79" r="10" fill="#776b61"/>',
 person:()=>'<path d="M20 88Q20 56 50 56Q80 56 80 88Z" fill="#b4bfd3"/><circle cx="50" cy="34" r="22" fill="#e5bea0"/>'+face(50,34,.9),
 baby:()=>'<path d="M16 89L26 45H74L84 89Z" fill="#dcc1d6"/><circle cx="50" cy="34" r="25" fill="#e8c6a6"/><path d="M42 14Q55 5 53 17" fill="none"/>'+face(50,34,.8),
 family:()=>`<g transform="translate(-4 9) scale(.65)">${common.person()}</g><g transform="translate(43 9) scale(.65)">${common.person()}</g>`,
 letterA:()=>letter('A'),letterB:()=>letter('B'),letterM:()=>letter('M'),letters:()=>letter('ABC'),
 noun:()=>tag('#8eb6d2'),pronoun:()=>tag('#b7a3d3'),adjective:()=>tag('#ddb183'),dot:()=>'<circle cx="50" cy="50" r="30" fill="#d8a2a1"/>',
 question:()=>'<circle cx="50" cy="49" r="35" fill="#d9c2df"/><path d="M36 36Q38 18 56 25Q77 35 53 48V58M51 73H53" fill="none" stroke-width="6"/>',
 spiral:()=>'<path d="M51 50Q72 30 78 52Q80 80 49 81Q8 80 18 40Q29 6 67 17Q95 26 90 64" fill="none" stroke="#8fa7b5" stroke-width="8"/>',
 shuffle:()=>'<path d="M14 29H31L68 72H88M77 61L88 72L77 83M14 72H31L68 29H88M77 18L88 29L77 40" fill="none" stroke-width="6"/>',
 repeat:()=>'<path d="M19 44Q23 15 66 22L82 30M82 13V30H65M81 57Q77 86 34 79L18 71M18 88V71H35" fill="none" stroke-width="6"/>',
 spark:()=>'<path d="M50 9L59 35L85 21L71 46L93 61L64 64L64 91L44 74L23 91L28 64L7 55L30 43L16 18L42 31Z" fill="#e7c17f"/>'
 };
 function letter(t){return '<rect x="13" y="16" width="74" height="70" rx="10" fill="#e8cf99"/>'+`<text x="50" y="64" text-anchor="middle" fill="#5e4938" stroke="none" font-family="Georgia,serif" font-size="${t.length>1?27:44}">${t}</text>`}
 function tag(color){return `<rect x="19" y="19" width="62" height="62" rx="12" fill="${color}"/>`}
 if(common[k])return `<g fill="#c2bdac" stroke="#6b5440" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${common[k]()}</g>`;
 if(k==='book'||k==='lamp'||k==='sun'||k==='moon')return artInner63(k);
 // The few game-specific icons are already original v61 drawings, not pictographs.
 if(['rhyme','pattern','opposite','memory'].includes(k))return `<g transform="translate(8 8)">${ART63.legacy(k).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`;
 return artInner63('picture')
}
function lampArt63(k){if(!ART63.cache[k])ART63.cache[k]=`<svg class="lamp-art63" data-original-art="${k}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="art-ink63">${artInner63(k)}</g></svg>`;return ART63.cache[k]}
// v61 games now share exactly the same art as the rest of Lamplight.
l61Art=function(k){return lampArt63(k).replace('class="lamp-art63"','class="lamp-art63 l61art"')};
// Hub tile markup was captured when v61 first loaded; refresh those cached pictures too.
GHUB.forEach(tile=>{if(L61.meta[tile[0]])tile[1]=lampArt63(L61.meta[tile[0]][2])});
// Spanish cards use the same neutral art identifiers as English, never blank translated lookups.
{const original=cardArt;cardArt=function(c){const key=ICON63[String(c[3]).replace(/\ufe0f/g,'')],known=ART.obj[key]||ART.animal[key]||['pup','duck','fish'].includes(key);if(key&&known){if(ART.obj[key])return ART.obj[key](ART.face);return `<g transform="scale(3)">${artInner63(key)}</g>`}return original.apply(this,arguments)}}
const PICT63=/\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}\uFE0F?)*/gu;
function pictureKey63(x){return ICON63[x.replace(/\ufe0f/g,'')]}
function artText63(node){if(!node.nodeValue||!node.parentElement||node.parentElement.closest('script,style,textarea,option,svg,[data-lamp-art]'))return;
 const text=node.nodeValue;PICT63.lastIndex=0;const matches=[...text.matchAll(PICT63)].filter(m=>pictureKey63(m[0]));if(!matches.length)return;
 const f=document.createDocumentFragment();let pos=0;for(const m of matches){f.append(text.slice(pos,m.index));const key=pictureKey63(m[0]),el=document.createElement('span');el.className='picture63';el.dataset.lampArt=key;el.setAttribute('role','img');el.setAttribute('aria-label',gT(artLabel63(key)));el.innerHTML=lampArt63(key);f.append(el);pos=m.index+m[0].length;ART63.replaced++;ART63.seen.add(m[0])}f.append(text.slice(pos));node.replaceWith(f)
}
function artRefresh63(root){if(!root||root.nodeType!==1||root.closest('svg,[data-lamp-art],script,style,textarea'))return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];let n;while(n=w.nextNode())nodes.push(n);nodes.forEach(artText63);
 for(const el of [root,...root.querySelectorAll('[title],[aria-label],[placeholder],option')]){
  if(el.closest('svg,[data-lamp-art]'))continue;
  for(const a of ['title','aria-label','placeholder'])if(el.hasAttribute(a)){const raw=el.getAttribute(a),next=raw.replace(PICT63,x=>pictureKey63(x)?gT(artLabel63(pictureKey63(x))):x);if(raw!==next)el.setAttribute(a,next)}
  if(el.tagName==='OPTION'){const raw=el.textContent;let next=raw.replace(PICT63,x=>pictureKey63(x)?'':x);if(raw!==next){if(!el.hasAttribute('value'))el.setAttribute('value',raw);if(!next.trim())next=raw.replace(PICT63,x=>pictureKey63(x)?gT(artLabel63(pictureKey63(x))):x);el.textContent=next}}
 }
}
const ART63_OBSERVER=new MutationObserver(ms=>{const roots=new Set();for(const m of ms){if(m.type==='characterData')artText63(m.target);else for(const n of m.addedNodes){if(n.nodeType===3)artText63(n);else if(n.nodeType===1&&!n.closest('svg,[data-lamp-art]'))roots.add(n)}}for(const root of roots)if(root.isConnected)artRefresh63(root)});
ART63_OBSERVER.observe(document.body,{childList:true,subtree:true,characterData:true});artRefresh63(document.body);
document.head.insertAdjacentHTML('beforeend',`<style>
.picture63{display:inline-flex;align-items:center;justify-content:center;width:1.35em;height:1.35em;vertical-align:-.25em;line-height:1;flex-shrink:0}.lamp-art63{display:inline-block;max-width:100%;height:auto;vertical-align:middle}.picture63>.lamp-art63{width:100%;height:100%}.art-ink63{filter:drop-shadow(0 .6px 0 #71583f)}
.hubtile>span>.picture63{width:1.8em;height:1.8em}.hubtile .lamp-art63{width:72px}.gpad .picture63,.snd .picture63,.sbbtn .picture63{width:1.7em;height:1.7em}.l61card h2>.lamp-art63{width:58px}.l61lamp .lamp-art63{width:46px}.l61sequence .lamp-art63{width:54px}.l61memory .lamp-art63{width:100%}.pictures .lamp-art63{width:66px}
.cardart{border:2px solid #8d755c;border-radius:22px}.av>.artsvg{filter:drop-shadow(0 1px 0 #71583f)}.art-plate63{vector-effect:non-scaling-stroke}
@media(prefers-reduced-motion:reduce){.lamp-art63 *{animation:none!important}}
</style>`);

// Paint's six picture stamps must use the same original drawings, not a canvas emoji font.
const STAMP63={};for(const ch of ['⭐','🌙','✨','💛','🌸','🦊']){const image=new Image();image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(lampArt63(pictureKey63(ch)).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));STAMP63[ch]=image}
{const stamp=paintStamp;paintStamp=function(p){const image=STAMP63[PT.stamp];if(!image)return stamp.apply(this,arguments);const canvas=$('pcv'),points=symPts(p),size=PT.size*3*PT.dpr,draw=()=>{if(canvas?.isConnected){const x=canvas.getContext('2d');points.forEach(q=>x.drawImage(image,q[0]-size/2,q[1]-size/2,size,size))}};if(image.complete&&image.naturalWidth)draw();else image.decode().then(draw).catch(()=>{})}}
// v16 cached the avatar-picker strings before this art pass. Refresh those snapshots too.
AVS.splice(0,AVS.length,...Object.keys(AVATARS).map(k=>avHTML(k)));
document.querySelectorAll('.av[data-av]').forEach(el=>{const k=el.dataset.av,size=el.querySelector('svg')?.getAttribute('width')||'1em';if(AVATARS[k])el.outerHTML=avHTML(k,size)});
