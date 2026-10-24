// v16 art: hand-made SVG characters with feelings, for profile pictures and picture-word cards. Drawn on this device, no images downloaded.
const ART={};
ART.face=function(cx,cy,s,ex,ink){ink=ink||'#3a2a2a';const E=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="${4.2*s}" ry="${5.2*s}" fill="${ink}"/><circle cx="${x+1.4*s}" cy="${y-1.8*s}" r="${1.5*s}" fill="#fff"/><circle cx="${x-1.2*s}" cy="${y+1.6*s}" r="${.7*s}" fill="#fff" opacity=".8"/>`,
 A=(x,y,up)=>`<path d="M${x-4.5*s} ${y+(up?1.5:-1.5)*s} Q${x} ${y+(up?-4.5:4.5)*s} ${x+4.5*s} ${y+(up?1.5:-1.5)*s}" stroke="${ink}" stroke-width="${2.2*s}" fill="none" stroke-linecap="round"/>`,
 H=(x,y)=>`<path d="M${x} ${y+4*s} C${x-7*s} ${y-1*s} ${x-3*s} ${y-6*s} ${x} ${y-2.5*s} C${x+3*s} ${y-6*s} ${x+7*s} ${y-1*s} ${x} ${y+4*s}Z" fill="#e8457a"/>`,
 dx=9*s,ey=cy-2*s,my=cy+7*s,ck=`<ellipse cx="${cx-dx-4*s}" cy="${cy+4*s}" rx="${4*s}" ry="${2.6*s}" fill="#ff8a9a" opacity=".55"/><ellipse cx="${cx+dx+4*s}" cy="${cy+4*s}" rx="${4*s}" ry="${2.6*s}" fill="#ff8a9a" opacity=".55"/>`,
 smile=w=>`<path d="M${cx-w*s} ${my-2*s} Q${cx} ${my+4*s} ${cx+w*s} ${my-2*s}" stroke="${ink}" stroke-width="${2*s}" fill="none" stroke-linecap="round"/>`;
 switch(ex){
 case'joy':return A(cx-dx,ey,1)+A(cx+dx,ey,1)+ck+`<path d="M${cx-6*s} ${my-2*s} Q${cx} ${my+9*s} ${cx+6*s} ${my-2*s}Z" fill="${ink}"/><path d="M${cx-3*s} ${my+3*s} Q${cx} ${my+6*s} ${cx+3*s} ${my+3*s}" fill="#ff7a8a"/>`;
 case'wow':return E(cx-dx,ey)+E(cx+dx,ey)+ck+`<ellipse cx="${cx}" cy="${my+1*s}" rx="${3*s}" ry="${4*s}" fill="${ink}"/>`;
 case'sleepy':return A(cx-dx,ey,0)+A(cx+dx,ey,0)+ck+smile(3)+`<text x="${cx+16*s}" y="${cy-14*s}" font-size="${8*s}" fill="#7a8bd6" font-family="sans-serif" font-weight="bold">z</text>`;
 case'calm':return A(cx-dx,ey,0)+A(cx+dx,ey,0)+ck+smile(5);
 case'sad':return E(cx-dx,ey+1*s)+E(cx+dx,ey+1*s)+`<path d="M${cx-dx-5*s} ${ey-8*s} L${cx-dx+4*s} ${ey-10*s}M${cx+dx+5*s} ${ey-8*s} L${cx+dx-4*s} ${ey-10*s}" stroke="${ink}" stroke-width="${1.8*s}" stroke-linecap="round"/><path d="M${cx-5*s} ${my+3*s} Q${cx} ${my-3*s} ${cx+5*s} ${my+3*s}" stroke="${ink}" stroke-width="${2*s}" fill="none" stroke-linecap="round"/><path d="M${cx+dx+2*s} ${ey+6*s} q${-3*s} ${5*s} 0 ${7*s} q${3*s} ${-2*s} 0 ${-7*s}" fill="#6cc4ff"/>`;
 case'mad':return E(cx-dx,ey+1*s)+E(cx+dx,ey+1*s)+`<path d="M${cx-dx-6*s} ${ey-9*s} L${cx-dx+5*s} ${ey-5*s}M${cx+dx+6*s} ${ey-9*s} L${cx+dx-5*s} ${ey-5*s}" stroke="${ink}" stroke-width="${2.6*s}" stroke-linecap="round"/><path d="M${cx-5*s} ${my+3*s} Q${cx} ${my-2*s} ${cx+5*s} ${my+3*s}" stroke="${ink}" stroke-width="${2.2*s}" fill="none" stroke-linecap="round"/><ellipse cx="${cx-dx-4*s}" cy="${cy+4*s}" rx="${4*s}" ry="${2.6*s}" fill="#ff5a4a" opacity=".5"/><ellipse cx="${cx+dx+4*s}" cy="${cy+4*s}" rx="${4*s}" ry="${2.6*s}" fill="#ff5a4a" opacity=".5"/>`;
 case'love':return H(cx-dx,ey)+H(cx+dx,ey)+ck+smile(5);
 case'wink':return E(cx-dx,ey)+A(cx+dx,ey,1)+ck+smile(5);
 case'silly':return E(cx-dx,ey)+A(cx+dx,ey,1)+ck+smile(6)+`<path d="M${cx-1*s} ${my+1*s} q${1*s} ${7*s} ${5*s} ${5*s} q${1*s} ${-3*s} ${-1*s} ${-5*s}Z" fill="#ff7a8a"/>`;
 default:return E(cx-dx,ey)+E(cx+dx,ey)+ck+smile(5)}};
// Creature builder. b=body, e=ears, x=extra, ex=expression
ART.creature=function(o,size){const c=o.c,d=o.d||ART.shade(c,-.18),bl=o.belly||'#fff4e6',s=1,ex=o.ex||'happy';let back='',front='';
 const ears={cat:`<path d="M24 34 L28 8 L44 26Z M76 34 L72 8 L56 26Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M29 28 L30 16 L38 25Z M71 28 L70 16 L62 25Z" fill="#ffb3c1"/>`,
  round:`<circle cx="26" cy="26" r="11" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="74" cy="26" r="11" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="26" cy="26" r="5" fill="${o.inner||'#ffcfb0'}"/><circle cx="74" cy="26" r="5" fill="${o.inner||'#ffcfb0'}"/>`,
  bunny:`<ellipse cx="36" cy="14" rx="7" ry="18" fill="${c}" stroke="${d}" stroke-width="2" transform="rotate(-10 36 14)"/><ellipse cx="64" cy="14" rx="7" ry="18" fill="${c}" stroke="${d}" stroke-width="2" transform="rotate(12 64 14)"/><ellipse cx="36" cy="15" rx="3" ry="12" fill="#ffb3c1" transform="rotate(-10 36 15)"/><ellipse cx="64" cy="15" rx="3" ry="12" fill="#ffb3c1" transform="rotate(12 64 15)"/>`,
  floppy:`<ellipse cx="20" cy="46" rx="9" ry="18" fill="${d}" transform="rotate(20 20 46)"/><ellipse cx="80" cy="46" rx="9" ry="18" fill="${d}" transform="rotate(-20 80 46)"/>`,
  tufts:`<path d="M26 30 L22 10 L40 24Z M74 30 L78 10 L60 24Z" fill="${d}"/>`,
  big:`<ellipse cx="16" cy="50" rx="16" ry="20" fill="${d}"/><ellipse cx="84" cy="50" rx="16" ry="20" fill="${d}"/><ellipse cx="17" cy="50" rx="9" ry="13" fill="#ffc6c6"/><ellipse cx="83" cy="50" rx="9" ry="13" fill="#ffc6c6"/>`,
  antenna:`<path d="M40 22 Q34 8 30 6 M60 22 Q66 8 70 6" stroke="${d}" stroke-width="3" fill="none"/><circle cx="30" cy="6" r="5" fill="${o.x2||'#ffd54f'}"/><circle cx="70" cy="6" r="5" fill="${o.x2||'#ffd54f'}"/>`,
  horns:`<path d="M30 26 Q22 8 34 4 Q30 16 40 22Z M70 26 Q78 8 66 4 Q70 16 60 22Z" fill="${o.x2||'#fff1c1'}" stroke="#c9a86a" stroke-width="1.5"/>`,
  leaf:`<path d="M50 20 Q50 6 62 2 Q64 14 50 20Z" fill="#6cc070"/><path d="M50 22 L50 12" stroke="#4a8a4a" stroke-width="2"/>`,
  none:''};
 back+=ears[o.e||'none']||'';
 if(o.x==='mane')back=`<circle cx="50" cy="54" r="44" fill="${o.x2||'#e08a2a'}"/>`+[...Array(14)].map((_,i)=>{const a=i/14*6.283;return`<circle cx="${50+40*Math.cos(a)}" cy="${54+40*Math.sin(a)}" r="9" fill="${o.x2||'#e08a2a'}"/>`}).join('')+back;
 if(o.x==='spikes')back=[...Array(9)].map((_,i)=>{const a=Math.PI+i/8*Math.PI;return`<path d="M${50+30*Math.cos(a-.15)} ${56+30*Math.sin(a-.15)} L${50+46*Math.cos(a)} ${56+46*Math.sin(a)} L${50+30*Math.cos(a+.15)} ${56+30*Math.sin(a+.15)}Z" fill="${d}"/>`}).join('')+back;
 if(o.x==='tentacles')back=[20,34,50,66,80].map((x,i)=>`<path d="M${x} 70 q${i%2?6:-6} 14 0 24" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')+back;
 if(o.x==='gills')back=`<path d="M18 40 l-12 -8 M16 50 l-14 0 M18 60 l-12 8 M82 40 l12 -8 M84 50 l14 0 M82 60 l12 8" stroke="${o.x2||'#ff7aa8'}" stroke-width="6" stroke-linecap="round"/>`+back;
 const shape=o.shape==='square'?`<rect x="18" y="22" width="64" height="62" rx="16" fill="${c}" stroke="${d}" stroke-width="2.5"/>`:o.shape==='ghost'?`<path d="M18 86 V50 a32 32 0 0 1 64 0 V86 l-8 -7 -8 7 -8 -7 -8 7 -8 -7 -8 7 -8 -7Z" fill="${c}" stroke="${d}" stroke-width="2"/>`:o.shape==='drop'?`<path d="M50 14 C70 40 84 52 84 64 a34 30 0 0 1 -68 0 C16 52 30 40 50 14Z" fill="${c}" stroke="${d}" stroke-width="2"/>`:o.shape==='cap'?`<rect x="34" y="52" width="32" height="34" rx="12" fill="#fff4e0" stroke="#d9c4a0" stroke-width="2"/><path d="M10 56 Q50 -6 90 56Z" fill="${c}" stroke="${d}" stroke-width="2"/>${[[30,36],[56,26],[70,44]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`).join('')}`:`<ellipse cx="50" cy="56" rx="34" ry="31" fill="${c}" stroke="${d}" stroke-width="2.5"/>`;
 if(o.belly&&o.shape!=='cap')front+=`<ellipse cx="50" cy="${o.snout?64:68}" rx="${o.snout?17:20}" ry="${o.snout?13:15}" fill="${bl}"/>`;
 if(o.x==='mask')front+=`<path d="M22 50 Q36 40 46 52 Q36 60 22 50Z M78 50 Q64 40 54 52 Q64 60 78 50Z" fill="#3a3a3a" opacity=".85"/>`;
 if(o.x==='stripes')front+=`<path d="M50 26 l-4 10 l8 0Z M24 48 l10 2 M24 58 l10 0 M76 48 l-10 2 M76 58 l-10 0" stroke="${d}" stroke-width="3.5" stroke-linecap="round" fill="${d}"/>`;
 if(o.x==='shell')front+=`<path d="M20 70 Q50 30 80 70" fill="none"/>`;
 if(o.x==='visor')front+=`<rect x="24" y="36" width="52" height="30" rx="14" fill="#1d2a4a" opacity=".2"/>`;
 const fy=o.shape==='cap'?70:o.shape==='drop'?62:54,fs=o.shape==='cap'?.6:1;
 front+=ART.face(50,fy,fs,ex,o.ink);
 if(o.snout)front+=`<ellipse cx="50" cy="${fy+4}" rx="4" ry="3" fill="#3a2a2a"/>`;
 if(o.x==='beak')front+=`<path d="M44 ${fy+3} L56 ${fy+3} L50 ${fy+11}Z" fill="#ffb02e" stroke="#d98a10" stroke-width="1"/>`;
 if(o.x==='horn')front+=`<path d="M44 26 L50 0 L56 26Z" fill="#ffe9a8" stroke="#e0b860" stroke-width="1.5"/><path d="M46 20 L54 17 M47 13 L53 10" stroke="#e0b860" stroke-width="1.5"/>`;
 const acc={crown:`<path d="M34 22 L36 6 L44 16 L50 4 L56 16 L64 6 L66 22Z" fill="#ffd54f" stroke="#e0a800" stroke-width="1.5"/><circle cx="50" cy="12" r="2.5" fill="#e8457a"/>`,
  flower:`<g transform="translate(74 26)">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-6" rx="4" ry="6" fill="#ff9ac2" transform="rotate(${a})"/>`).join('')}<circle r="3.5" fill="#ffd54f"/></g>`,
  bow:`<g transform="translate(70 24)"><path d="M0 0 L-12 -8 L-12 8Z M0 0 L12 -8 L12 8Z" fill="#ff6fa0"/><circle r="3.5" fill="#e04a80"/></g>`,
  glasses:`<g fill="none" stroke="#3a2a2a" stroke-width="2.2"><circle cx="41" cy="${fy-2}" r="8"/><circle cx="59" cy="${fy-2}" r="8"/><path d="M49 ${fy-2} h2"/></g>`,
  phones:`<path d="M16 54 Q16 14 50 14 Q84 14 84 54" stroke="#4a4a6a" stroke-width="5" fill="none"/><rect x="8" y="46" width="12" height="20" rx="5" fill="#7c6cff"/><rect x="80" y="46" width="12" height="20" rx="5" fill="#7c6cff"/>`,
  star:`<path d="M78 8 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1Z" fill="#ffd54f"/>`,
  helmet:`<circle cx="50" cy="54" r="44" fill="#bfe6ff" opacity=".35" stroke="#e8f6ff" stroke-width="3"/><path d="M22 30 Q30 18 44 14" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>`,
  hat:`<path d="M30 24 L50 -4 L70 24Z" fill="#7c6cff"/><circle cx="50" cy="-2" r="4" fill="#ffd54f"/>`,
  scarf:`<path d="M24 80 Q50 92 76 80 L76 88 Q50 98 24 88Z" fill="#e8457a"/><rect x="62" y="84" width="9" height="14" rx="3" fill="#c23a66"/>`};
 const ac=(o.a||'').split(' ').map(k=>acc[k]||'').join('');
 return `<svg viewBox="-6 -8 112 112" width="${size||'1em'}" height="${size||'1em'}" class="artsvg" aria-hidden="true">${back}${shape}${front}${ac}</svg>`};
ART.shade=function(h,k){let n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(v+(k<0?v*k:(255-v)*k))));return'#'+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1)};
// Profile pictures (36)
const AVATARS={fox:{n:'Fox',c:'#f0883e',e:'cat',belly:'#fff4e6',snout:1,ex:'wink'},bear:{n:'Bear',c:'#a8744f',e:'round',belly:'#e8c9a4',snout:1,ex:'happy'},bunny:{n:'Bunny',c:'#f3ecf6',e:'bunny',belly:'#fff',ex:'joy'},
 turtle:{n:'Turtle',c:'#7fc28a',e:'none',x:'spikes',d:'#4f9a5e',ex:'calm',a:'flower'},owl:{n:'Owl',c:'#9c7bd1',e:'tufts',belly:'#efe2ff',x:'beak',ex:'wow'},cat:{n:'Kitty',c:'#9aa4b8',e:'cat',belly:'#eef1f6',snout:1,ex:'love'},
 pup:{n:'Pup',c:'#e7c08f',e:'floppy',belly:'#fff4e0',snout:1,ex:'silly'},unicorn:{n:'Unicorn',c:'#fdf3ff',e:'cat',x:'horn',ex:'joy',a:'star'},frog:{n:'Frog',c:'#7ed36f',e:'none',belly:'#dff7c8',ex:'joy',a:'crown'},
 astro:{n:'Astronaut',c:'#ffe1c6',e:'none',ex:'wow',a:'helmet'},star:{n:'Star',c:'#ffd54f',shape:'drop',ex:'joy'},moon:{n:'Moon',c:'#d6dcff',ex:'sleepy',a:'hat'},
 dragon:{n:'Dragon',c:'#6fc7b8',e:'horns',x:'spikes',belly:'#fff1c1',ex:'silly'},dino:{n:'Dino',c:'#9ad06b',x:'spikes',d:'#5f9a3a',belly:'#eaf7c8',ex:'joy'},penguin:{n:'Penguin',c:'#3d4a66',belly:'#fff',x:'beak',ex:'happy',ink:'#222',a:'scarf'},
 panda:{n:'Panda',c:'#ffffff',e:'round',inner:'#333',x:'mask',ex:'happy',d:'#cfcfcf'},koala:{n:'Koala',c:'#b9c0c9',e:'big',snout:1,ex:'sleepy'},lion:{n:'Lion',c:'#f4c25b',x:'mane',e:'round',snout:1,ex:'joy',a:'crown'},
 tiger:{n:'Tiger',c:'#f39a3c',e:'round',x:'stripes',belly:'#fff4e6',snout:1,ex:'wink'},monkey:{n:'Monkey',c:'#9a6b48',e:'round',belly:'#f2d2b0',inner:'#f2d2b0',ex:'silly'},octo:{n:'Octopus',c:'#ff8fb1',x:'tentacles',ex:'joy',a:'bow'},
 whale:{n:'Whale',c:'#6aa9ff',belly:'#dcecff',ex:'calm',a:'star'},robot:{n:'Robot',c:'#b8c6d9',shape:'square',e:'antenna',ex:'wow',ink:'#1d2a4a'},ghost:{n:'Friendly ghost',c:'#ffffff',shape:'ghost',ex:'silly',d:'#d6d6e6'},
 alien:{n:'Alien',c:'#a5f08a',e:'antenna',x2:'#ff6fa0',ex:'wow',a:'glasses'},mush:{n:'Mushroom',c:'#ff6b5b',shape:'cap',ex:'joy'},cactus:{n:'Cactus',c:'#5fbf7a',shape:'drop',ex:'calm',a:'flower'},
 sun:{n:'Sunny',c:'#ffc23a',x:'mane',x2:'#ffdf6a',ex:'joy',a:'glasses'},cloud:{n:'Cloud',c:'#f2f6ff',shape:'ghost',ex:'sleepy'},bee:{n:'Bee',c:'#ffd23f',e:'antenna',x:'stripes',d:'#3a2a2a',ex:'happy',x2:'#3a2a2a'},
 lady:{n:'Ladybug',c:'#ff4d4d',e:'antenna',x2:'#333',ex:'love',a:'bow'},sloth:{n:'Sloth',c:'#c9a884',x:'mask',belly:'#f3e2c8',ex:'sleepy'},hedge:{n:'Hedgehog',c:'#e7c9a3',x:'spikes',d:'#8a5d3b',snout:1,ex:'happy'},
 ele:{n:'Elephant',c:'#a9b4c9',e:'big',ex:'joy',a:'hat'},axo:{n:'Axolotl',c:'#ffc2d6',x:'gills',ex:'joy'},dj:{n:'DJ cat',c:'#6e5ba8',e:'cat',belly:'#e6dcff',ex:'wink',a:'phones'}};
const AV_LEGACY={'🦊':'fox','🐻':'bear','🐰':'bunny','🐢':'turtle','🦉':'owl','🐱':'cat','🐶':'pup','🦄':'unicorn','🐸':'frog','🚀':'astro','🌟':'star','🌙':'moon'};
function avHTML(id,size){const a=AVATARS[id]||AVATARS.fox;return `<span class="av" data-av="${id}" title="${a.n}">${ART.creature(a,size)}<span hidden>svg:${id}</span></span>`}
function avFix(v){if(typeof v!=='string')return avHTML('fox');if(v.startsWith('svg:'))return avHTML(v.slice(4));if(AV_LEGACY[v])return avHTML(AV_LEGACY[v]);const m=v.match(/data-av="([^"]+)"/);return m?avHTML(m[1]):v}
function avStore(v){if(typeof v!=='string')return v;const m=v.match(/data-av="([^"]+)"/)||v.match(/^svg:(\w+)/);if(m)return'svg:'+m[1];return v.trim().startsWith('svg:')?v.trim():(AV_LEGACY[v]?'svg:'+AV_LEGACY[v]:v)}
{const g=getProfiles,s=saveProfiles;getProfiles=function(){const P=g();if(P&&P.list)P.list.forEach(p=>p.av=avFix(p.av));return P};
 saveProfiles=function(P){const Q=JSON.parse(JSON.stringify(P));Q.list.forEach(p=>p.av=avStore((p.av||'').replace(/^\s+|\s+$/g,'')));s(Q)};
 AVS.length=0;Object.keys(AVATARS).forEach(k=>AVS.push(avHTML(k)))}
// Picture-word card art: each object has a body and a feeling
ART.obj={
 bed:(f)=>`<rect x="40" y="150" width="220" height="70" rx="20" fill="#7c9cff"/><rect x="40" y="120" width="60" height="100" rx="18" fill="#5a78d8"/><rect x="60" y="128" width="70" height="36" rx="16" fill="#fff"/><path d="M110 150 Q190 120 260 150 V190 H110Z" fill="#ffc6d9"/><rect x="48" y="216" width="14" height="30" fill="#5a78d8"/><rect x="238" y="216" width="14" height="30" fill="#5a78d8"/>${f(95,143,1.4,'sleepy')}`,
 cup:(f)=>`<path d="M80 110 H210 L196 240 Q145 256 94 240Z" fill="#ff9e7a" stroke="#d96a4a" stroke-width="4"/><path d="M206 135 Q260 140 248 185 Q238 215 200 210" stroke="#d96a4a" stroke-width="14" fill="none"/>${[0,1,2].map(i=>`<path d="M${115+i*30} 95 q-10 -20 0 -40 q10 -20 0 -40" stroke="#c9b8a8" stroke-width="6" fill="none" opacity=".6" class="steam"/>`).join('')}${f(145,175,2.6,'calm')}`,
 lamp:(f)=>`<path d="M100 70 H200 L230 160 H70Z" fill="#ffd54f" stroke="#e0a800" stroke-width="4"/><rect x="140" y="160" width="20" height="60" fill="#a8744f"/><ellipse cx="150" cy="230" rx="60" ry="14" fill="#8a5d3b"/><circle cx="150" cy="180" r="120" fill="#ffe680" opacity=".18" class="glowpulse"/>${f(150,118,2.4,'joy')}`,
 door:(f)=>`<rect x="85" y="40" width="130" height="220" rx="16" fill="#c98a5a" stroke="#8a5d3b" stroke-width="5"/><rect x="100" y="60" width="100" height="70" rx="8" fill="#b57849"/><circle cx="195" cy="160" r="8" fill="#ffd54f"/>${f(150,180,2.6,'wow')}`,
 book:(f)=>`<path d="M40 90 Q95 70 150 95 Q205 70 260 90 V230 Q205 210 150 235 Q95 210 40 230Z" fill="#fff" stroke="#7c6cff" stroke-width="6"/><path d="M150 95 V235" stroke="#7c6cff" stroke-width="4"/>${f(98,160,2,'happy')}${f(202,160,2,'wink')}`,
 moon:(f)=>`<path d="M200 50 A110 110 0 1 0 250 200 A90 90 0 1 1 200 50Z" fill="#fff0b8" stroke="#ffd56b" stroke-width="4"/>${f(125,165,2.6,'sleepy')}`,
 sun:(f)=>`${[...Array(12)].map((_,i)=>{const a=i*Math.PI/6;return`<path d="M${150+80*Math.cos(a)} ${150+80*Math.sin(a)} L${150+120*Math.cos(a+.12)} ${150+120*Math.sin(a+.12)} L${150+115*Math.cos(a-.12)} ${150+115*Math.sin(a-.12)}Z" fill="#ffb02e"/>`}).join('')}<circle cx="150" cy="150" r="72" fill="#ffd23f"/>${f(150,150,3,'joy')}`,
 star:(f)=>`<path d="M150 30 L182 110 L268 114 L200 166 L224 250 L150 202 L76 250 L100 166 L32 114 L118 110Z" fill="#ffd54f" stroke="#f0a800" stroke-width="5" stroke-linejoin="round"/>${f(150,150,2.4,'love')}`,
 cloud:(f)=>`<path d="M70 210 a50 50 0 0 1 10 -98 a70 70 0 0 1 130 -10 a55 55 0 0 1 20 108Z" fill="#fff" stroke="#cfd8ea" stroke-width="5"/>${f(150,160,2.8,'calm')}`,
 rain:(f)=>`<path d="M70 160 a45 45 0 0 1 10 -88 a65 65 0 0 1 120 -8 a50 50 0 0 1 20 96Z" fill="#cfd8ea" stroke="#9aa9c6" stroke-width="5"/>${[[90,200],[140,220],[190,200],[115,250],[170,255]].map(([x,y])=>`<path d="M${x} ${y} q-10 16 0 22 q10 -6 0 -22" fill="#6cb4ff"/>`).join('')}${f(150,125,2.4,'sad')}`,
 apple:(f)=>`<path d="M150 90 C90 60 40 110 60 180 C75 240 120 260 150 240 C180 260 225 240 240 180 C260 110 210 60 150 90Z" fill="#ff5a5a" stroke="#d63a3a" stroke-width="4"/><path d="M150 90 Q148 60 160 40" stroke="#7a4a2a" stroke-width="8" fill="none"/><path d="M160 55 Q190 35 210 55 Q185 72 160 55Z" fill="#6cc070"/>${f(150,165,3,'happy')}`,
 egg:(f)=>`<path d="M150 40 C215 40 245 150 240 190 C235 240 195 262 150 262 C105 262 65 240 60 190 C55 150 85 40 150 40Z" fill="#fffaf0" stroke="#e8d9bd" stroke-width="5"/>${f(150,170,3,'wow')}`,
 milk:(f)=>`<path d="M100 90 L120 50 H180 L200 90 V250 H100Z" fill="#fff" stroke="#9ac0e6" stroke-width="5"/><rect x="100" y="140" width="100" height="60" fill="#6cb4ff"/><text x="150" y="182" text-anchor="middle" font-size="30" font-weight="bold" fill="#fff" font-family="sans-serif">MILK</text>${f(150,108,1.7,'joy')}`,
 bread:(f)=>`<path d="M70 250 V140 Q40 130 50 100 Q70 60 150 60 Q230 60 250 100 Q260 130 230 140 V250Z" fill="#f4c27a" stroke="#c98a3a" stroke-width="5"/><path d="M90 245 V150 Q70 140 75 112 Q90 85 150 85 Q210 85 225 112 Q230 140 210 150 V245Z" fill="#fff0d0"/>${f(150,165,3,'calm')}`,
 pear:(f)=>`<path d="M150 70 C120 70 115 120 100 150 C70 200 90 260 150 260 C210 260 230 200 200 150 C185 120 180 70 150 70Z" fill="#c8e06a" stroke="#93ad3a" stroke-width="4"/><path d="M150 72 Q150 50 160 40" stroke="#7a4a2a" stroke-width="7" fill="none"/>${f(150,195,2.6,'wink')}`,
 hand:(f)=>`<path d="M95 250 Q70 200 70 160 L70 110 Q70 95 85 95 Q100 95 100 110 V80 Q100 62 117 62 Q133 62 133 80 V70 Q133 52 150 52 Q167 52 167 70 V82 Q167 66 183 66 Q200 66 200 84 V170 L215 140 Q230 120 245 135 Q255 148 240 170 L200 240 Q190 255 170 255Z" fill="#ffcfa8" stroke="#d99a70" stroke-width="4"/>${f(150,175,2.4,'joy')}`,
 foot:(f)=>`<path d="M90 70 Q80 160 90 210 Q100 255 160 255 Q230 255 235 215 Q238 185 190 175 Q150 168 150 120 V70Z" fill="#ffcfa8" stroke="#d99a70" stroke-width="4"/>${[[200,170,14],[222,182,11],[238,198,9]].map(([x,y,r])=>``).join('')}${f(150,210,2.2,'silly')}`,
 eye:(f)=>`<path d="M30 150 Q150 40 270 150 Q150 260 30 150Z" fill="#fff" stroke="#3a2a2a" stroke-width="6"/><circle cx="150" cy="150" r="52" fill="#5aa9e6"/><circle cx="150" cy="150" r="26" fill="#1d2a4a"/><circle cx="165" cy="135" r="11" fill="#fff"/>${[60,95,130,170,205,240].map((x,i)=>`<path d="M${x} ${112-Math.sin(i/5*3.14)*30} l${(i-2.5)*4} -22" stroke="#3a2a2a" stroke-width="5" stroke-linecap="round"/>`).join('')}`,
 nose:(f)=>`<circle cx="150" cy="150" r="110" fill="#ffd9b8"/><path d="M150 90 Q130 160 120 180 Q150 200 180 180 Q170 160 150 90Z" fill="#ffb98a" stroke="#d99a70" stroke-width="4"/>${f(150,140,3,'happy').replace(/<path d="M[^"]*Q[^"]*" stroke="#3a2a2a" stroke-width="6" fill="none" stroke-linecap="round"\/>$/,'')}<path d="M110 222 Q150 246 190 222" stroke="#3a2a2a" stroke-width="6" fill="none" stroke-linecap="round"/>`,
 ear:(f)=>`<path d="M120 50 C200 30 250 90 230 150 C215 200 180 190 170 230 C160 265 110 265 105 230" fill="#ffcfa8" stroke="#d99a70" stroke-width="6"/><path d="M140 90 C190 80 210 120 195 150 C180 175 160 160 160 190" stroke="#d99a70" stroke-width="6" fill="none"/>${[0,1,2].map(i=>`<path d="M${70-i*18} ${110-i*10} q-${16+i*6} 40 0 ${80+i*20}" stroke="#7c6cff" stroke-width="5" fill="none" opacity="${.8-i*.2}" class="steam"/>`).join('')}`,
 happy:(f)=>`<circle cx="150" cy="150" r="110" fill="#ffd54f" stroke="#f0a800" stroke-width="5"/>${f(150,150,4.2,'joy')}`,
 sad:(f)=>`<circle cx="150" cy="150" r="110" fill="#9cc8ff" stroke="#5a8ad8" stroke-width="5"/>${f(150,150,4.2,'sad')}`,
 calm:(f)=>`<circle cx="150" cy="150" r="110" fill="#b8e6c8" stroke="#6cc08a" stroke-width="5"/>${f(150,150,4.2,'calm')}`,
 mad:(f)=>`<circle cx="150" cy="150" r="110" fill="#ff8a6a" stroke="#e0503a" stroke-width="5"/>${f(150,150,4.2,'mad')}<path d="M230 50 l10 -20 M250 70 l20 -8 M210 40 l2 -22" stroke="#e0503a" stroke-width="6" stroke-linecap="round"/>`,
 love:(f)=>`<path d="M150 260 C40 190 30 120 60 85 C95 45 140 65 150 100 C160 65 205 45 240 85 C270 120 260 190 150 260Z" fill="#ff7aa8" stroke="#e0457a" stroke-width="5"/>${f(150,150,3.2,'love')}`};
ART.animal={cat:'cat',dog:'pup',bee:'bee',owl:'owl'};
ART.extra={fish:`<path d="M60 150 Q120 70 200 120 L260 80 L250 150 L260 220 L200 180 Q120 230 60 150Z" fill="#ff9f43" stroke="#e07a20" stroke-width="5"/><path d="M130 110 Q150 150 130 190" stroke="#ffd09a" stroke-width="8" fill="none"/>`,
 duck:`<ellipse cx="160" cy="200" rx="100" ry="60" fill="#ffd23f" stroke="#e0a800" stroke-width="4"/><circle cx="120" cy="120" r="60" fill="#ffd23f" stroke="#e0a800" stroke-width="4"/><path d="M60 125 Q30 130 40 145 Q60 150 75 140Z" fill="#ff8a2a"/><path d="M180 190 Q220 160 250 190" stroke="#e0a800" stroke-width="5" fill="none"/>`};
function cardArt(c){const w=c[1],f=ART.face;if(ART.obj[w])return ART.obj[w](f);
 if(ART.animal[w]){const a=AVATARS[ART.animal[w]];return `<g transform="translate(30 30) scale(2.1)">${ART.creature(a,'100').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`}
 if(w==='fish')return ART.extra.fish+f(115,150,2.2,'joy');if(w==='duck')return ART.extra.duck+f(122,118,1.9,'happy');return''}
cardSVG=function(c){const dark=c[0]==='sky';return `<svg viewBox="0 0 300 300" class="cardart"><defs><radialGradient id="cg"><stop offset="0" stop-color="${dark?'#fff3c4':'#fffaf0'}" stop-opacity="${dark?.45:1}"/><stop offset=".6" stop-color="${dark?'#ffd97a':'#ffe8b0'}" stop-opacity="${dark?.15:.4}"/><stop offset="1" stop-color="#ffd97a" stop-opacity="0"/></radialGradient></defs>
 <rect width="300" height="300" rx="36" fill="${DECKS[c[0]][1]}"/>${dark?[[40,50],[250,70],[70,240],[240,230],[150,30],[30,150]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${1.5+i%3}" fill="#fff6d8" class="twk" style="animation-delay:${i*.4}s"/>`).join(''):''}
 <circle cx="150" cy="150" r="135" fill="url(#cg)" class="glowpulse"/><g class="artbob">${cardArt(c)}</g></svg>`};
{const rc=renderCards;renderCards=function(){rc();if(!CD.deck)document.querySelectorAll('#cards .hubtile').forEach((b,i)=>{const k=Object.keys(DECKS)[i],c=CARDS.find(x=>x[0]===k),sp=b.querySelector('span');if(sp&&c)sp.innerHTML=cardSVG(c).replace('class="cardart"','class="cardart mini" width="64" height="64"')})};RENDER.cards=renderCards}
document.head.insertAdjacentHTML('beforeend',`<style>.av{display:inline-flex;vertical-align:-.2em;width:1.35em;height:1.35em}.av svg{width:100%;height:100%;overflow:visible}.hubtile .av{width:2.4em;height:2.4em}#pa .pchip{padding:4px 6px}#pa .av{width:2.6em;height:2.6em}#pa{display:flex;flex-wrap:wrap;gap:4px;max-height:280px;overflow:auto}
.artbob{animation:artbob 3.2s ease-in-out infinite;transform-origin:150px 160px}@keyframes artbob{50%{transform:translateY(-6px) rotate(-1.5deg)}}.steam{animation:steam 2.4s ease-in-out infinite}@keyframes steam{50%{opacity:.15;transform:translateY(-6px)}}
.cardart.mini{display:block;margin:0 auto}@media (prefers-reduced-motion:reduce){.artbob,.steam{animation:none}}</style>`);
