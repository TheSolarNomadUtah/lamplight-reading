/* v141: growth-v3 faces for remaining companions, bigger lamp face without il-er,
   and three equal Sprite picture tiles. */
(function(){
const LID={
 owl:'#E0C8A0',moth:'#E2C488',phoenix:'#E0A858',lamp:'#6E8E6A',
 fox:'#4A6A58','lion-cub':'#4A6A58','sun-tiger':'#4A6A58',
 glowcap:'#E2C488',firefly:'#E2C488','moss-hedgehog':'#E0C8A0',deer:'#4A6A58'
};
const CRESCENT={
 owl:['#5E4430',0],moth:['#5E4430',0],phoenix:['#6A3A20',0],lamp:['#14302A',1],
 fox:['#123028',1],'lion-cub':['#123028',1],'sun-tiger':['#123028',1],
 glowcap:['#5E4430',0],firefly:['#5E4430',0],'moss-hedgehog':['#5E4430',0],deer:['#123028',1]
};
const HALO={
 owl:[100,110,48],moth:[100,96,28],phoenix:[100,72,36],lamp:[100,124,42],
 fox:[64,100,30],'lion-cub':[70,100,34],'sun-tiger':[100,80,42],
 glowcap:[105,118,36],firefly:[100,96,28],'moss-hedgehog':[80,126,32],deer:[70,82,30]
};
const EXFACE={
 fox:[56,100,74,98.5,3.3,2.85,1.38,1],
 'lion-cub':[60,99,82,97,4.2,3.6,1.15,1],
 'sun-tiger':[88,80,114,79,4.0,3.6,1.15,1],
 glowcap:[96,122,114,122,3.3,3.3,1.12,1],
 firefly:[94.5,95,105.5,95,3.0,3.0,1.12,1],
 'moss-hedgehog':[72,126,90,125,3.4,2.9,1.12,1],
 deer:[64,80,81,79,3.2,2.75,1.38,1]
};
const SLUG={suntiger:'sun-tiger',lioncub:'lion-cub',fox:'fox',firefly:'firefly',mosshedgehog:'moss-hedgehog',glowcap:'glowcap',deer:'deer'};
const SMILE_CURVES=[
 'c3.4 4.1 8.6 4.1 12 0','c3.6 4.4 9.4 4.4 13 0','c5.6 6.8 14.4 6.8 20 0',
 'c5 6.1 13 6.1 18 0','c3.9 4.8 10.1 4.8 14 0'
];
const LION_BROWS=[
 '<path d="M55 96c4-2.2 8-2.2 10.5 0" fill="none" stroke="#72583F" stroke-width="1.1" stroke-linecap="round"/>',
 '<path d="M78 94c3-1.5 6-1.5 8 0" fill="none" stroke="#72583F" stroke-width=".95" stroke-linecap="round"/>'
];
const SPOTS={hatchling:3,young:5,grown:8,wise:8};
const BABIES_N={hatchling:0,young:1,grown:2,wise:3};
const BABY_SLOTS=[[50,154,.9],[154,156,.8],[78,162,.7]];
const STAR_FIELD={f:[106,85.5],m:[105,83]};
let n141=0;
function F(n,p){if(typeof IL==='object'&&typeof IL.f==='function')return IL.f(n);p=p==null?1:p;const s=Number(n).toFixed(p).replace(/\.?0+$/,'');return s==='-0'?'0':s}
function phase141(stage){
 if(typeof IL119==='object'&&typeof IL119.phase==='function')return IL119.phase(stage);
 const s=Number(stage);
 return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}
function uid141(html){
 const m=String(html||'').match(/url\(#([A-Za-z0-9_]+)H\)/)||String(html||'').match(/id=["']([A-Za-z0-9_]+)L["']/);
 return (m&&m[1])||('f141'+(++n141));
}
function freshUid(){return 'f141'+(++n141)}
function mouthAt(a,b,c,d,r,s){return [(a+c)/2,Math.max(b,d)+Math.max(r,s)*1.2,Math.max(r,s)*2.15]}
function face141(who,lx,ly,rx,ry,r,r2,stage,uid,opt){
 opt=opt||{};
 if(typeof IL!=='object'||typeof IL.g!=='function')return '';
 const lid=LID[who]||'#E2C488',ink=opt.mc||'#72583F';
 const k=opt.k==null?1.2:opt.k,sw=opt.sw==null?1.3:opt.sw,gap=opt.gap==null?2.4:opt.gap;
 const cr=CRESCENT[who]||['#5E4430',0];
 const smile=opt.smile!==false;
 const raw=IL.g(uid,stage,lx,ly,rx,ry,r,r2,lid,ink,opt.M||mouthAt,k,sw,cr[1]?1:0,gap,cr[0]);
 if(smile)return raw;
 // Beak / no-mouth species: drop the trailing mouth path IL.g always appends.
 return raw.replace(/<path d="[^"]+" fill="none" stroke="[^"]+" stroke-width="[^"]+" stroke-linecap="round" stroke-linejoin="round"\/>\s*$/,'');
}
function halo141(who,stage,uid){
 if(stage!=='wise'||typeof IL!=='object'||typeof IL.ha!=='function')return '';
 const h=HALO[who];if(!h)return '';
 return IL.ha(uid+'h',h[0],h[1],h[2]);
}

function dropSmiles(html){
 for(const c of SMILE_CURVES){
  const esc=c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp('<path d=["\']M[0-9.]+ [0-9.]+'+esc+'["\'] fill=["\']none["\'] stroke=["\']#72583F["\'] stroke-width=["\'][^"\']+["\'] stroke-linecap=["\']round["\']/>','g');
  html=html.replace(re,'');
 }
 return html;
}
function dropPupilsAndCatch(html){
 html=html.replace(/<circle cx=["'][0-9.]+["'] cy=["'][0-9.]+["'] r=["'][0-9.]+["'] fill=["']#72583F["']\/>/g,'');
 html=html.replace(/<circle cx=["'][0-9.]+["'] cy=["'][0-9.]+["'] r=["'][0-9.]+["'] fill=["']#FFF6D8["']\/>/g,'');
 return html;
}
function polishExtra(slug,html){
 html=dropPupilsAndCatch(html);
 html=dropSmiles(html);
 for(const b of LION_BROWS)html=html.split(b).join('');
 for(const b of LION_BROWS)html=html.split(b.replace(/"/g,"'")).join('');
 if(slug==='glowcap'){
  html=html.replace(/<ellipse cx=["']82["'] cy=["'](?:120|132)["'] rx=["']7["'] ry=["']5["'] fill=["']#E8C894["'] stroke-width=["']1\.3["']\/>/g,'');
  html=html.replace(/<ellipse cx=["']128["'] cy=["'](?:120|132)["'] rx=["']7["'] ry=["']5["'] fill=["']#E8C894["'] stroke-width=["']1\.3["']\/>/g,'');
  // Old baked baby caps (sticker faces, not stage-aware).
  html=html.replace(/<g transform=["']translate\([^"']+\) scale\([^"']+\)["']><path d=["']M-6 4c0 8[\s\S]*?<\/g>/g,'');
 }
 if(slug==='fox'){
  const ears=[
   ['d="M48 96c-2-24 14-28 18-8Z"','d="M48 96c-4-36 16-40 20-8Z"'],
   ['d="M74 94c5-24 20-18 13 2Z"','d="M74 94c6-36 22-32 16 4Z"'],
   ['d="M46 94c-2-24 14-28 18-8Z"','d="M46 94c-4-36 16-40 20-8Z"'],
   ['d="M72 92c5-24 20-18 13 2Z"','d="M72 92c6-36 22-32 16 4Z"']
  ];
  for(const [a,b] of ears){html=html.split(a).join(b);html=html.split(a.replace(/"/g,"'")).join(b.replace(/"/g,"'"));}
 }
 if(slug==='sun-tiger'){
  html=html.replace(/cx="100" cy="98" rx="22" ry="15.5" fill="#F4E4C4" stroke-width="1.15"/,'cx="100" cy="100" rx="14" ry="10" fill="#F4E4C4" stroke-width="1.1"');
  html=html.replace(/cx="100" cy="96" rx="4.2" ry="3" fill="#72583F"/,'cx="100" cy="99" rx="2.6" ry="1.9" fill="#72583F"');
  html=html.replace(/cx='100' cy='98' rx='22' ry='15.5' fill='#F4E4C4' stroke-width='1.15'/,"cx='100' cy='100' rx='14' ry='10' fill='#F4E4C4' stroke-width='1.1'");
  html=html.replace(/cx='100' cy='96' rx='4.2' ry='3' fill='#72583F'/,"cx='100' cy='99' rx='2.6' ry='1.9' fill='#72583F'");
 }
 if(slug==='lion-cub'){
  html=html.replace(/cx="70" cy="100" rx="25" ry="23"/,'cx="70" cy="100" rx="28" ry="26"');
  html=html.replace(/cx='70' cy='100' rx='25' ry='23'/,"cx='70' cy='100' rx='28' ry='26'");
 }
 return html;
}

function sunflowerPts(n,c){
 const g=137.50776*Math.PI/180,pts=[];
 for(let i=0;i<n;i++){const a=i*g,r=c*Math.sqrt(i);pts.push([r*Math.cos(a),r*Math.sin(a)])}
 return pts;
}
function star4(cx,cy,r,delay){
 const pts=[];
 for(let i=0;i<8;i++){
  const a=(-90+i*45)*Math.PI/180,rad=i%2===0?r:r*.38;
  pts.push(F(cx+rad*Math.cos(a))+' '+F(cy+rad*Math.sin(a)));
 }
 const d=delay?` style="animation-delay:-${F(delay,2)}s"`:'';
 return `<polygon class="il-spot" points="${pts.join(' ')}" fill="#E6B454" stroke="#E6B454" stroke-width="1.1"${d}/>`;
}
function glowcapStars(n,sex){
 const [cx,cy]=STAR_FIELD[sex]||STAR_FIELD.f,c=15,aspect=.31,out=[];
 const pts=sunflowerPts(n,c),period=7;
 for(let i=0;i<pts.length;i++)out.push(star4(cx+pts[i][0],cy+pts[i][1]*aspect,3.6,i*period/Math.max(n,1)));
 return out.join('');
}
function babyGlowcap(x,y,sc,uid,i){
 const face=face141('glowcap',-3,3.2,6,3.2,1.5,1.5,'hatchling',uid+'b'+i,{sw:.95,k:1.12,gap:1.2,smile:true});
 return `<g class="il-baby" transform="translate(${F(x)} ${F(y)}) scale(${F(sc,2)})"><path d="M-8 0c1 3 1 6 2 7c6 3 12 3 18 0c1-1 1-4 2-7Z" fill="#E8C894" stroke="#72583F" stroke-width="1.8" stroke-linejoin="round"/><path d="M-14 0c1-9 6-14 14-14c8 0 13 5 14 14c-6-3-16-3-28 0Z" fill="url(#${uid}L)" stroke="#72583F" stroke-width="2" stroke-linejoin="round"/>${face}</g>`;
}
function glowcapFoot(html,stage,uid){
 const n=BABIES_N[stage]||0;
 const sex=/M50 108c2-26/.test(html)?'f':'m';
 const cap=sex==='f'?'M50 108c2-26 22-40 56-40c34 0 54 14 56 40c-18-10-72-10-112 0Z':'M62 104c2-28 18-44 43-44c25 0 42 16 44 44c-14-8-54-8-87 0Z';
 const stars=`<clipPath id="${uid}cap"><path d="${cap}"/></clipPath><g clip-path="url(#${uid}cap)">${glowcapStars(SPOTS[stage]||8,sex)}</g>`;
 const babies=BABY_SLOTS.slice(0,n).map((s,i)=>babyGlowcap(s[0],s[1],s[2],uid,i)).join('');
 return {stars,babies};
}

function insertInScale(html,chunk,front){
 if(!chunk)return html;
 const inner=/<g transform="translate\(100 172\) scale\([^"]+\) translate\(-100 -172\)">/;
 if(inner.test(html)){
  if(front)return html.replace(inner,m=>m+chunk);
  return html.replace(/(<g transform="translate\(100 172\) scale\([^"]+\) translate\(-100 -172\)">)([\s\S]*)(<\/g>)(\s*<\/g>\s*)$/,function(_,a,b,c,d){return a+b+chunk+c+d});
 }
 // No body scale: place before the closing of the outer scale(.5) group.
 if(front){
  return html.replace(/(transform="scale\(\.5\)"[^>]*>)(<defs>[\s\S]*?<\/defs>)?/,function(m,a,defs){return a+(defs||'')+chunk});
 }
 return html.replace(/<\/g>\s*$/,chunk+'</g>');
}
function stripIlEr(html){return html.replace(/<circle class="il-fine il-er"[^>]*\/>/g,'')}
function stripBlush(html){return html.replace(/<ellipse cx="[^"]+" cy="[^"]+" rx="[^"]+" ry="[^"]+" fill="#C47A6A" opacity="[^"]+"\/>/g,'')}
function stripLampTiny(html){
 html=stripIlEr(html);
 html=stripBlush(html);
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.1" stroke-linecap="round"\/>/g,'');
 // Tiny pupils (r about 1.9–2.3) and their catchlights left by tinyFace120.
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#72583F"\/>/g,function(m,r){return (+r>=1.5&&+r<=2.6)?'':m});
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#FFF6D8"\/>/g,function(m,r){return (+r>=0.5&&+r<=1.1)?'':m});
 return html;
}
function lampFace(html,stage){
 const ph=phase141(stage);
 const s=ph==='young'?1.1:1.05,cy=ph==='hatchling'?142:ph==='young'?154:152;
 const r=3.4*s,span=7.2*s,uid=freshUid();
 html=stripLampTiny(html);
 const face=face141('lamp',100-span,cy,100+span,cy,r,r,ph,uid,{sw:1.2,k:1.5,gap:2,smile:true});
 const halo=halo141('lamp',ph,uid);
 html=insertInScale(html,face,false);
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function stripIlFace(html){
 html=stripBlush(html);
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.3[0-9]*" stroke-linecap="round"\/>/g,'');
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.35" stroke-linecap="round"\/>/g,'');
 html=html.replace(/<path d="M[^"]+" fill="none" stroke="#72583F" stroke-width="1\.2" stroke-linecap="round"\/>/g,'');
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#72583F"\/>/g,function(m,r){return (+r>=2&&+r<=8)?'':m});
 html=html.replace(/<circle cx="[^"]+" cy="[^"]+" r="([0-9.]+)" fill="#FFF6D8"\/>/g,function(m,r){return (+r>=0.6&&+r<=2.8)?'':m});
 return html;
}
function owlFace(html,stage){
 const ph=phase141(stage);
 const eyes={hatchling:[[87,126,5.8],[113,126,5.8]],young:[[84,107,6.5],[116,107,6.5]],grown:[[80,96,7.3],[120,96,7.3]],wise:[[80,96,7.3],[120,96,7.3]]}[ph];
 const uid=freshUid();
 html=stripIlFace(html);
 const e1=eyes[0],e2=eyes[1];
 const face=face141('owl',e1[0],e1[1],e2[0],e2[1],e1[2],e2[2],ph,uid,{sw:1.35,k:1.05,smile:false});
 let extra=face;
 if(ph==='hatchling'&&!/L[0-9.]+ [0-9.]+L[0-9.]+ [0-9.]+Z" fill="#E6B454"/.test(html)){
  const mid=(e1[0]+e2[0])/2,by= (e1[1]+e2[1])/2+e1[2]+2.2,bw=3.6,bh=4.6;
  extra+=`<path d="M${F(mid-bw)} ${F(by-2)}L${F(mid)} ${F(by+bh)}L${F(mid+bw)} ${F(by-2)}Z" fill="#E6B454" stroke="#72583F" stroke-width="1" stroke-linejoin="round"/>`;
 }
 const halo=halo141('owl',ph,uid);
 html=insertInScale(html,extra,false);
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function mothFace(html,stage){
 const ph=phase141(stage);
 const eyes=ph==='hatchling'?[62.8,134.5,73.6,134.5,3.6,3.6]:ph==='young'?[78.4,131,93.6,131,4.2,4.2]:[95.2,96,104.8,96,3.2,3.2];
 const uid=freshUid();
 html=stripIlFace(html);
 const face=face141('moth',eyes[0],eyes[1],eyes[2],eyes[3],eyes[4],eyes[5],ph,uid,{sw:ph==='hatchling'?1.3:1.2,k:ph==='hatchling'||ph==='young'?1.12:1.15,gap:1.6,smile:false});
 // Young face lives inside the rotated cocoon group — insert before that group's close if present.
 if(ph==='young'&&/rotate\(-16 100 128\)/.test(html)){
  html=html.replace(/(transform="rotate\(-16 100 128\)">)([\s\S]*?)(<\/g>)/,function(_,a,b,c){return a+b+face+c});
 }else{
  html=insertInScale(html,face,false);
 }
 const halo=halo141('moth',ph,uid);
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function extraFace(html,kind,stage){
 const parts=kind.split('_'),sp=parts[0],slug=SLUG[sp];
 if(!slug||!EXFACE[slug])return html;
 const ph=phase141(stage);
 const uid=uid141(html);
 html=polishExtra(slug,html);
 if(slug==='glowcap'){
  html=html.replace(/translate\(100 172\) scale\([^)]+\) translate\(-100 -172\)/,'translate(100 172) scale(1) translate(-100 -172)');
  const foot=glowcapFoot(html,ph,uid);
  const clip=(foot.stars.match(/<clipPath[\s\S]*?<\/clipPath>/)||[''])[0];
  const starG=(foot.stars.match(/<g clip-path[\s\S]*?<\/g>/)||[''])[0];
  if(clip){
   if(/<defs>/.test(html))html=html.replace(/<defs>/,'<defs>'+clip);
   else html=html.replace(/(transform="scale\(\.5\)"[^>]*>)/,'$1<defs>'+clip+'</defs>');
  }
  html=insertInScale(html,starG+foot.babies,false);
 }
 const f=EXFACE[slug];
 const face=face141(slug,f[0],f[1],f[2],f[3],f[4],f[5],ph,freshUid(),{sw:1.25,k:f[6],smile:!!f[7]});
 html=insertInScale(html,face,false);
 const halo=halo141(slug,ph,freshUid());
 if(halo&&!/il-aura/.test(html))html=insertInScale(html,halo,true);
 return html;
}
function paint141(kind,html,stage){
 if(!html)return html;
 if(kind==='turtle'||kind==='shell'||kind==='dragon'||kind==='sprites')return html;
 if(kind==='lamp')return lampFace(html,stage);
 if(kind==='owl')return owlFace(html,stage);
 if(kind==='moth')return mothFace(html,stage);
 if(/^(suntiger|lioncub|fox|firefly|mosshedgehog|glowcap|deer)_/.test(kind))return extraFace(html,kind,stage);
 return html;
}

/* ---- three Sprite picture tiles ---- */
function css141(){
 if(typeof document==='undefined'||document.getElementById('v141css'))return;
 const s=document.createElement('style');s.id='v141css';
 s.textContent=
  '.spriteRow141{width:100%;margin:12px 0 0;box-sizing:border-box}'+
  '.spriteTiles141{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%}'+
  '.spriteTiles141 button{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;width:100%;min-height:56px;padding:8px;border-radius:16px;border:2px solid var(--soft,#d7cbb8);background:var(--card,#fffaf0);color:inherit;font:inherit;font-weight:700;box-sizing:border-box;text-align:center}'+
  '.spriteTiles141 button.on{border-color:var(--acc,#c9a45e);box-shadow:0 0 0 3px #e6b45444}'+
  '.spriteTiles141 .lamp73-svg,.spriteTiles141 svg{width:88px;height:88px;max-width:100%;flex:none}'+
  '.spriteTiles141 .kline{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;text-overflow:ellipsis;line-height:1.2;max-height:2.4em;width:100%;font-size:.92em;text-align:center}';
 (document.documentElement||document.head).appendChild(s);
}
function spriteTileSvg(name,stage){
 const inner=(typeof IL137==='object'&&typeof IL137.sprite==='function')?IL137.sprite(name,stage):'';
 return `<svg class="lamp73-svg" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="lamp73-ink">${inner}</g></svg>`;
}
function spriteRowHTML(pid){
 const t=typeof gT==='function'?gT:s=>s,e=typeof esc==='function'?esc:s=>String(s);
 const ch=(typeof IL137==='object'&&typeof IL137.chosen==='function')?IL137.chosen(pid):(function(){
  const st=typeof friendState101==='function'?friendState101('sprites',pid):null;
  const c=st&&st.chosen;return (c==='dew'||c==='ember'||c==='puff')?c:'puff';
 })();
 const st=typeof friendState101==='function'?friendState101('sprites',pid):{stage:1};
 const view=typeof lampViewStage74==='function'?lampViewStage74(st):st.stage||1;
 const f=typeof friendsLoad101==='function'?friendsLoad101(pid):{};
 const tiles=[['puff','Puff'],['dew','Dew'],['ember','Ember']].map(([k,en])=>{
  const on=ch===k;
  const nm=e(t(en));
  return `<button type="button" class="${on?'on':''}" data-sprite137="${k}" aria-pressed="${on?'true':'false'}" aria-label="${nm}">${spriteTileSvg(k,view)}<span class="kline">${nm}</span></button>`;
 }).join('');
 const visit=e(t('The other two visit as this one grows.'));
 return `<div class="spriteRow141" data-sprite-row141="1"><div class="spriteTiles141">${tiles}</div><p class="soft">${visit}</p></div>`;
}

function hook141(){
 css141();
 if(typeof IL119==='object'&&typeof IL119.art==='function'){
  const prev=IL119.art;
  IL119.art=function(kind,stage,opt){return paint141(kind,prev(kind,stage,opt),stage)};
 }
 if(typeof friendArtInner101==='function'){
  const prev=friendArtInner101;
  friendArtInner101=function(id,stage){return paint141(id,prev(id,stage),stage)};
 }
 if(typeof friendsLoad101==='function'&&typeof friendsPut101==='function'){
  // Keep v139 Dew/Ember persistence; only the chooser UI changes.
 }
 const prevHTML=typeof friendPickerHTML101==='function'?friendPickerHTML101:null;
 if(prevHTML){
  friendPickerHTML101=function(pid){
   css141();
   let html=prevHTML(pid);
   html=html.replace(/<button[^>]*data-friend="sprites"[^>]*>[\s\S]*?<\/button>/,'');
   html=html.replace(/<div class="spritePick137"[^>]*>[\s\S]*?<\/div>(?=<\/div>)/,'');
   html=html.replace(/<\/div>\s*$/,spriteRowHTML(pid)+'</div>');
   return html;
  };
 }
 const prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
 if(prevAttach){
  friendPickerAttach101=function(){
   prevAttach.apply(this,arguments);
   const host=document.querySelector('[data-sprite-row141]');
   if(!host||host._il141)return;
   host._il141=1;
   host.addEventListener('click',function(ev){
    const b=ev.target.closest('[data-sprite137]');
    if(!b)return;
    ev.preventDefault();
    const k=b.getAttribute('data-sprite137');
    const pid=typeof curPid==='function'?curPid():'';
    const f=friendsLoad101(pid);
    f.sprites=f.sprites||(typeof friendNorm101==='function'?friendNorm101(null):{});
    f.sprites.chosen=k;
    f.sprites.mode=f.sprites.mode||'visit';
    f.active='sprites';
    friendsPut101(f,pid);
    const card=document.querySelector('[data-friends101]');
    if(card){card.outerHTML=friendPickerHTML101(pid);friendPickerAttach101();}
    if(typeof lampMountAll73==='function')lampMountAll73();
    if(typeof friendLine101==='function')friendLine101();
   });
  };
 }
}

hook141();
window.IL141={
 paint:paint141,face:face141,phase:phase141,slug:SLUG
};
})();
