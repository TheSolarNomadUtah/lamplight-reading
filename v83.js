// v83: Look Up part 1 — the Solar System. Reading opens the sky.
SECTIONS.push('lookup');
if(!$('lookup'))document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="lookup" class="hidden"></section>');
if(Array.isArray(LAMP_KINDS75)&&!LAMP_KINDS75.includes('planets'))LAMP_KINDS75.push('planets');

const LU_PLANETS83=[
 {id:'mercury',name:'Mercury',kind:'rock',r:.383,fill:'#b7a894',spot:'#8e7f6d',line:'Mercury is the closest to the Sun. It is the smallest planet.',src:'science.nasa.gov/mercury'},
 {id:'venus',name:'Venus',kind:'rock',r:.949,fill:'#e6c98a',spot:'#c9a45e',line:'Venus is the hottest planet. Its thick atmosphere traps the heat.',src:'science.nasa.gov/venus'},
 {id:'earth',name:'Earth',kind:'rock',r:1,fill:'#7ea7c4',spot:'#6a9a6c',line:'Earth is our home. It is the only planet we know of with life.',src:'science.nasa.gov/earth'},
 {id:'mars',name:'Mars',kind:'rock',r:.532,fill:'#c67a5a',spot:'#9a5440',line:'Mars looks red because its dust is rusty. It has the largest volcano in the Solar System.',src:'science.nasa.gov/mars'},
 {id:'jupiter',name:'Jupiter',kind:'giant',r:11.21,fill:'#d4a36a',spot:'#c45a3a',line:'Jupiter is the biggest planet. Its big red spot is a giant storm.',src:'science.nasa.gov/jupiter'},
 {id:'saturn',name:'Saturn',kind:'giant',r:9.45,fill:'#e2cc8a',spot:'#c9b06a',line:"Saturn's rings are made of ice and rock.",src:'science.nasa.gov/saturn'},
 {id:'uranus',name:'Uranus',kind:'giant',r:4.01,fill:'#9ec9c8',spot:'#7aa9a8',line:'Uranus spins tipped over on its side.',src:'science.nasa.gov/uranus'},
 {id:'neptune',name:'Neptune',kind:'giant',r:3.88,fill:'#5b7ea8',spot:'#3e5e86',line:'Neptune is the farthest planet. It has very fast winds.',src:'science.nasa.gov/neptune'}
];
const LU_MOON83={id:'moon',name:'The Moon',r:.273,fill:'#cfc6b8',spot:'#9a9288',line:'The Moon has no light of its own. Sunlight makes it glow.',src:'science.nasa.gov/moon'};
const LU_HINTS83=['Mercury is the closest to the Sun.','Venus comes next, after Mercury.','Earth is the third planet from the Sun.','The four giant planets go after Mars.'];
const LU_CREDIT83='Planet facts follow NASA (science.nasa.gov) for Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, and the Moon.';
const LU83={screen:1,read:false,noticed:false,order:[],tray:[],picked:null,misses:0,hint:0,foundEarth:false,moon:false,credited:{},chimed:{},toast:''};

function luReset83(){LU83.screen=1;LU83.read=false;LU83.noticed=false;LU83.order=Array(8).fill('');LU83.tray=LU_PLANETS83.map(p=>p.id);luShuffle83(LU83.tray);LU83.picked=null;LU83.misses=0;LU83.hint=0;LU83.foundEarth=false;LU83.moon=false;LU83.credited={};LU83.chimed={};LU83.toast='';LU83.lineId=null}
function luShuffle83(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function luPlanet83(id){return LU_PLANETS83.find(p=>p.id===id)}
function luDark83(){return typeof lampThemeDark76==='function'?lampThemeDark76():false}
function luReduce83(){return typeof lampReduced73==='function'?lampReduced73():!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}
function luChime83(key){if(LU83.chimed[key])return;LU83.chimed[key]=1;if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;try{const c=typeof ac==='function'?ac():null;if(!c||typeof note!=='function')return;note(67,c.currentTime,.25,'glow',.045)}catch(e){}}
function luCredit83(key){if(LU83.credited[key])return false;const ok=typeof lampMoment73==='function'&&lampMoment73('planets');LU83.credited[key]=true;return !!ok}
function luSpeak83(text){if(typeof speak==='function')speak(text,.85)}
function luHash83(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

function luTileArt83(){return `<svg class="lamp-art63" data-original-art="lookUp83" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false"><circle class="art-plate63" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/><g class="art-ink63"><path d="M18 78 Q50 42 82 78" fill="#efe0c0" stroke="#72583f" stroke-width="1.6"/><circle cx="28" cy="36" r="2.1" fill="#7d9574"/><circle cx="46" cy="26" r="1.5" fill="#7d9574"/><circle cx="62" cy="34" r="1.8" fill="#7d9574"/><circle cx="74" cy="24" r="1.3" fill="#7d9574"/><circle cx="70" cy="52" r="6.5" fill="#c67a5a" stroke="#72583f" stroke-width="1.3"/><circle cx="32" cy="58" r="4" fill="#7ea7c4" stroke="#72583f" stroke-width="1.3"/><path d="M22 70 Q36 62 50 70" fill="none" stroke="#e6b454" stroke-width="1.6" stroke-linecap="round"/></g></svg>`}

function luStars83(n,seed,dim){
 const bits=[];
 for(let i=0;i<n;i++){const h=luHash83(seed+'*'+i),x=6+(h%88),y=6+((h>>>8)%52),r=0.6+((h>>>16)%10)/14,o=dim?(.28+((h>>>20)%6)/20):(.45+((h>>>20)%8)/16);bits.push(`<circle class="lu83-star" cx="${x}" cy="${y}" r="${r.toFixed(2)}" opacity="${o.toFixed(2)}"/>`)}
 return bits.join('')
}
function luDust83(){
 if(luReduce83())return '';
 let d='';
 for(let i=0;i<7;i++){const h=luHash83('dust'+i),x=8+(h%84),y=20+((h>>>7)%46);d+=`<circle class="lu83-dust" cx="${x}" cy="${y}" r="0.9" opacity=".18"/>`}
 return `<g class="lu83-dusts" aria-hidden="true">${d}</g>`
}
function luPlanetMark83(p,cx,cy,r,opts){
 opts=opts||{};
 const ring=p.id==='saturn'?`<ellipse cx="${cx}" cy="${cy}" rx="${(r*1.85).toFixed(1)}" ry="${(r*.42).toFixed(1)}" fill="none" stroke="${p.spot}" stroke-width="${Math.max(1.2,r*.12).toFixed(1)}" opacity=".9" transform="rotate(-18 ${cx} ${cy})"/>`:'';
 const tip=p.id==='uranus'?` transform="rotate(18 ${cx} ${cy})"`:'';
 const bands=p.id==='jupiter'?`<path d="M${cx-r} ${cy-r*.25} Q${cx} ${cy-r*.4} ${cx+r} ${cy-r*.25}" fill="none" stroke="${p.spot}" stroke-width="${Math.max(1,r*.08)}" opacity=".55"/><ellipse cx="${cx+r*.28}" cy="${cy+r*.18}" rx="${r*.22}" ry="${r*.14}" fill="${p.spot}"/>`:'';
 const land=p.id==='earth'?`<path d="M${cx-r*.4} ${cy-r*.1} Q${cx-r*.1} ${cy-r*.45} ${cx+r*.15} ${cy-r*.15} Q${cx} ${cy+.1} ${cx-r*.35} ${cy+.15}Z" fill="${p.spot}" opacity=".85"/>`:'';
 const glow=opts.lit?`<circle cx="${cx}" cy="${cy}" r="${(r*1.55).toFixed(1)}" fill="${p.fill}" opacity=".28"/>`:'';
 return `${glow}${ring}<g${tip}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${p.fill}" stroke="var(--lu-line,#72583f)" stroke-width="${Math.max(1.1,r*.08).toFixed(1)}"/>${bands}${land}</g>`
}
function luMoonMark83(cx,cy,r,lit){
 return `${lit?`<circle cx="${cx}" cy="${cy}" r="${r*1.5}" fill="#f6efe0" opacity=".25"/>`:''}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${LU_MOON83.fill}" stroke="var(--lu-line,#72583f)" stroke-width="1.2"/><circle cx="${cx+r*.25}" cy="${cy-r*.15}" r="${r*.28}" fill="${LU_MOON83.spot}" opacity=".45"/>`
}
function luSunMark83(cx,cy,r,breathe){
 return `<g class="${breathe&&!luReduce83()?'lu83-breath':''}" style="transform-origin:${cx}px ${cy}px">
  <circle cx="${cx}" cy="${cy}" r="${r*1.55}" fill="#e6b454" opacity=".22"/>
  <circle cx="${cx}" cy="${cy}" r="${r*1.2}" fill="#f3c260" opacity=".4"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffe4a4" stroke="#c9893a" stroke-width="1.6"/>
  <circle cx="${cx-r*.22}" cy="${cy-r*.22}" r="${r*.22}" fill="#fff8d6" opacity=".7"/>
 </g>`
}

function luSkySvg83(kind,extra){
 extra=extra||'';
 const dim=kind==='night';
 return `<svg class="lu83-svg" viewBox="0 0 100 72" width="100%" height="auto" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
  <defs><linearGradient id="lu83sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--lu-sky1)"/><stop offset="1" stop-color="var(--lu-sky2)"/></linearGradient></defs>
  <rect class="lu83-skyfill" x="0" y="0" width="100" height="72" rx="6" fill="url(#lu83sky)"/>
  <g class="lu83-stars" fill="var(--lu-star)">${luStars83(kind==='sun'?16:26,kind,dim)}</g>
  ${luDust83()}${extra}
 </svg>`
}

function luReadBlock83(line,done){
 const text=gT(line);
 return `<div class="lu83-read">
  <p class="lu83-line" id="lu83-line">${esc(text)}</p>
  <div class="lu83-actions">
   <button type="button" class="lu83-btn" data-lu-speak aria-label="${esc(gT('Hear it'))}">${esc(gT('Hear it'))}</button>
   ${done?'':`<button type="button" class="lu83-btn p" data-lu-read>${esc(gT('I read it'))}</button>`}
  </div>
 </div>`
}
function luNoticeBlock83(){
 if(!LU83.read||LU83.noticed)return '';
 return `<div class="lu83-notice" role="status"><p>${esc(gT('What do you notice?'))}</p>
  <p><button type="button" class="lu83-btn p" data-lu-noticed>${esc(gT('I noticed'))}</button></p></div>`
}
function luExplain83(text){
 if(!LU83.noticed)return '';
 return `<div class="lu83-explain" role="status"><p>${esc(gT(text))}</p></div>`
}
function luNav83(canNext,last){
 const back=LU83.screen>1?`<button type="button" class="lu83-btn" data-lu-back>${esc(gT('Back'))}</button>`:'';
 const home=last?'':`<button type="button" class="lu83-btn" data-lu-home>${esc(gT('Home'))}</button>`;
 const next=last?`<button type="button" class="lu83-btn p" data-lu-home>${esc(gT('Home'))}</button>`:
  canNext?`<button type="button" class="lu83-btn p" data-lu-next>${esc(gT('Next'))}</button>`:'';
 return `<p class="lu83-nav">${back}${home}${next}</p>`
}
function luDots83(){return `<ol class="lu83-dots" aria-label="${esc(gT('Look Up screens'))}">${[1,2,3,4,5].map(n=>`<li${n===LU83.screen?' aria-current="step"':''}></li>`).join('')}</ol>`}
function luSrList83(items){
 const rows=items.map(it=>`<li><b>${esc(gT(it.name))}</b>${it.line?': '+esc(gT(it.line)):''}${it.where?' — '+esc(gT(it.where)):''}</li>`).join('');
 return `<details class="lu83-sr"><summary>${esc(gT('Planets in this sky'))}</summary><ul>${rows}</ul></details>`
}
function luCreditLine83(){return `<p class="soft lu83-credit">${esc(gT(LU_CREDIT83))}</p>`}

function luSkyScene83(){
 const lit=LU83.read,reduce=luReduce83();
 const planet=`<g class="lu83-wander${lit?' lit':''}${reduce?'':' drift'}" data-lu-dot>
   ${luPlanetMark83({id:'wander',fill:'#c9b48a',spot:'#8a7354'},72,34,lit?3.4:2.2,{lit})}
  </g>`;
 return luSkySvg83('calm',planet)
}
function luSunScene83(){
 const lit=LU83.read;
 return luSkySvg83('sun',luSunMark83(50,38,lit?16:13,true))
}
function luOrderScene83(){
 const slots=LU83.order.map((id,i)=>{
  const p=id&&luPlanet83(id),cx=16+i*10.7,cy=38,r=p?Math.max(2.4,Math.min(4.2,p.r*1.15+2.1)):2.2;
  const mark=p?luPlanetMark83(p,cx,cy,r,{lit:true}):`<circle cx="${cx}" cy="${cy}" r="2.4" fill="none" stroke="var(--lu-line)" stroke-width="0.8" stroke-dasharray="1.2 1.1" opacity=".7"/>`;
  return `<g>${mark}</g>`
 }).join('');
 const orbits=LU_PLANETS83.map((_,i)=>{const rx=10+i*10.7;return `<path d="M4 38 Q${16+i*10.7} 22 ${16+i*10.7+8} 38" fill="none" stroke="var(--lu-line)" stroke-width=".55" opacity=".45"/>`}).join('');
 return `<svg class="lu83-svg lu83-order-svg" viewBox="0 0 100 56" width="100%" height="auto" aria-hidden="true" focusable="false">
  <defs><linearGradient id="lu83sky-order" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--lu-sky1)"/><stop offset="1" stop-color="var(--lu-sky2)"/></linearGradient></defs>
  <rect x="0" y="0" width="100" height="56" rx="6" fill="url(#lu83sky-order)"/>
  <g class="lu83-stars" fill="var(--lu-star)">${luStars83(14,'order',LU83.noticed)}</g>
  ${orbits}${luSunMark83(7,38,5.5,false)}${slots}
 </svg>`
}
function luSizeScene83(){
 const maxD=132,unit=maxD/(11.21*2);
 const items=LU_PLANETS83.map(p=>{
  const d=Math.max(8,p.r*2*unit),hit=Math.max(48,d+8);
  const moonHit=Math.max(48,LU_MOON83.r*2*unit+16);
  const moon=p.id==='earth'?`<button type="button" class="lu83-disc lu83-moon${LU83.moon?' lit':''}${LU83.foundEarth?' named':''}" data-lu-moon style="min-width:${moonHit}px;min-height:${moonHit}px" aria-label="${esc(gT('The Moon'))}"><svg viewBox="0 0 40 40" width="${Math.max(12,LU_MOON83.r*2*unit)}" height="${Math.max(12,LU_MOON83.r*2*unit)}" aria-hidden="true">${luMoonMark83(20,20,14,LU83.moon)}</svg><span>${esc(gT('The Moon'))}</span></button>`:'';
  return `<div class="lu83-size-item"><button type="button" class="lu83-disc${p.id==='earth'&&LU83.foundEarth?' lit':''}${LU83.foundEarth?' named':''}" data-lu-earth="${p.id}" style="width:${hit}px;height:${hit}px" aria-label="${esc(gT(p.name))}"><svg viewBox="0 0 40 40" width="${d}" height="${d}" aria-hidden="true">${luPlanetMark83(p,20,20,16,{lit:p.id==='earth'&&LU83.foundEarth})}</svg><span>${esc(gT(p.name))}</span></button>${moon}</div>`
 }).join('');
 return `<div class="lu83-sizes" data-lu-sizes><p class="lu83-scale">${esc(gT('sizes, not distances'))}</p><div class="lu83-size-row">${items}</div></div>`
}
function luNightScene83(){
 const lamp=typeof lampSvg73==='function'?lampSvg73((typeof lampViewStage74==='function'?lampViewStage74():(lampLoad73()?.stage||1)),'lu83-lamp-svg'):'';
 const moon=luMoonMark83(78,22,4.2,true);
 return `<div class="lu83-goodnight">${luSkySvg83('night',moon)}<div class="lu83-lamp">${lamp}<p class="kline">${esc(typeof lampName73==='function'?lampName73():gT('Lamp'))}</p></div></div>`
}

function luRenderCalm83(){
 const can=LU83.noticed;
 return `<div class="lu83-scene" data-lu-screen="calm">${luSkyScene83()}</div>
  ${luReadBlock83('One dot moves. It is a planet.',LU83.read)}
  ${luNoticeBlock83()}${luExplain83('Planet comes from an old word that means wanderer.')}
  ${luSrList83([{name:'A planet',line:'One dot moves. It is a planet.'}])}
  ${luNav83(can,false)}`
}
function luRenderSun83(){
 return `<div class="lu83-scene" data-lu-screen="sun">${luSunScene83()}</div>
  ${luReadBlock83('The Sun is a star.',LU83.read)}
  ${luNoticeBlock83()}${luExplain83('It is the closest star to us. The stars at night are faraway suns.')}
  ${luSrList83([{name:'The Sun',line:'The Sun is a star.'}])}
  ${luNav83(LU83.noticed,false)}`
}
function luSlotsHtml83(){
 const done=LU83.order.every(Boolean);
 return `<div class="lu83-track">
  <p class="lu83-scale">${esc(gT('not to scale'))}</p>
  ${luOrderScene83()}
  <ol class="lu83-slots" aria-label="${esc(gT('Planet paths, from the Sun out'))}">
   <li class="lu83-sunlab"><span>${esc(gT('The Sun'))}</span></li>
   ${LU_PLANETS83.map((p,i)=>{
     const id=LU83.order[i],pl=id&&luPlanet83(id);
     const label=pl?gT(pl.name):gT('Empty path {n}',{n:String(i+1)});
     return `<li><button type="button" class="lu83-slot${pl?' filled':''}${LU83.picked&&!pl?' ready':''}" data-lu-slot="${i}" aria-label="${esc(label)}" ${done?'':'aria-dropeffect="move"'}>${pl?esc(gT(pl.name)):esc(gT('Path {n}',{n:String(i+1)}))}</button></li>`
   }).join('')}
  </ol>
 </div>
 <div class="lu83-tray" role="list" aria-label="${esc(gT('Planets to place'))}">
  ${LU83.tray.map(id=>{const p=luPlanet83(id);return `<button type="button" class="lu83-token${LU83.picked===id?' on':''}" data-lu-token="${id}" role="listitem" aria-pressed="${LU83.picked===id?'true':'false'}" aria-label="${esc(gT(p.name))}"><svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">${luPlanetMark83(p,20,20,14)}</svg><span>${esc(gT(p.name))}</span></button>`}).join('')}
 </div>
 ${LU83.toast?`<p class="lu83-toast" role="status">${esc(gT(LU83.toast))}</p>`:''}
 ${LU83.lineId?`<div class="lu83-planet-line" role="status"><p>${esc(gT(luPlanet83(LU83.lineId).line))}</p><button type="button" class="lu83-btn" data-lu-speak-line="${esc(luPlanet83(LU83.lineId).line)}">${esc(gT('Hear it'))}</button></div>`:''}
 ${LU83.misses>=1&&!done?`<p><button type="button" class="lu83-btn" data-lu-hint>${esc(gT('A hint'))}</button></p>`:''}
 ${LU83.hint?`<p class="soft" role="status">${esc(gT(LU_HINTS83[(LU83.hint-1)%LU_HINTS83.length]))}</p>`:''}`
}
function luRenderOrder83(){
 const done=LU83.order.every(Boolean);
 const list=LU_PLANETS83.map((p,i)=>{const placed=LU83.order[i]===p.id;return {name:p.name,line:p.line,where:placed?gT('In place {n}, from the Sun out.',{n:String(i+1)}):gT('Not placed yet.')}});
 let body=luSlotsHtml83();
 if(done){
  body+=luNoticeBlock83()+luExplain83('The four small rocky planets are close to the Sun. The four giant planets are far away.');
 }
 return `<div class="lu83-scene" data-lu-screen="order">
  <p class="lu83-line">${esc(gT('Put the planets in order, from the Sun out.'))}</p>
  ${body}</div>
  ${luSrList83(list)}
  ${luNav83(done&&LU83.noticed,false)}`
}
function luRenderSize83(){
 return `<div class="lu83-scene" data-lu-screen="size">${luSizeScene83()}</div>
  ${luReadBlock83('Find Earth.',LU83.foundEarth)}
  ${LU83.foundEarth&&!LU83.noticed?luNoticeBlock83():''}
  ${luExplain83('If Earth were the size of a grape, Jupiter would be about as big as a basketball.')}
  ${LU83.moon?`<div class="lu83-planet-line" role="status"><p>${esc(gT(LU_MOON83.line))}</p></div>`:''}
  ${luSrList83(LU_PLANETS83.map(p=>({name:p.name,line:p.line})).concat([{name:LU_MOON83.name,line:LU_MOON83.line}]))}
  ${luNav83(LU83.noticed,false)}`
}
function luRenderNight83(){
 return `<div class="lu83-scene" data-lu-screen="night">${luNightScene83()}</div>
  <div class="lu83-read"><p class="lu83-line">${esc(gT('Look up tonight and find the Moon.'))}</p>
  <div class="lu83-actions"><button type="button" class="lu83-btn" data-lu-speak>${esc(gT('Hear it'))}</button></div></div>
  ${luSrList83([{name:'The Moon',line:LU_MOON83.line},{name:'The Sun',line:'The Sun is a star.'}])}
  ${luCreditLine83()}
  ${luNav83(true,true)}`
}

function luRender83(){
 const root=$('lookup');if(!root)return;
 const dark=luDark83(),reduce=luReduce83();
 const title=gT('Look Up');
 const screens={1:luRenderCalm83,2:luRenderSun83,3:luRenderOrder83,4:luRenderSize83,5:luRenderNight83};
 const inner=(screens[LU83.screen]||luRenderCalm83)();
 root.innerHTML=`<div class="card big lu83-card${dark?' lu83-dark':''}${reduce?' lu83-reduce':''}" data-lu83>
  <h2>${luTileArt83()} ${esc(title)}</h2>
  ${luDots83()}
  ${inner}
 </div>`;
 if(typeof artRefresh63==='function')artRefresh63(root);
 luBind83(root);
}

function luDoRead83(){
 if(LU83.read)return;
 LU83.read=true;
 const key={1:'sky',2:'sun',4:'earth'}[LU83.screen];
 if(LU83.screen===4)LU83.foundEarth=true;
 if(key)luChime83(key);
 if(typeof pPractice68==='function')pPractice68('logic','Look Up',{screens:[String(LU83.screen)]},'lookup');
 luRender83();
}
function luDoNotice83(){
 if(!LU83.read&&!(LU83.screen===3&&LU83.order.every(Boolean)))return;
 if(LU83.screen===3&&!LU83.order.every(Boolean))return;
 LU83.noticed=true;
 if(LU83.screen===3){luCredit83('notice');luChime83('notice')}
 if(typeof pPractice68==='function')pPractice68('logic','Look Up',{noticed:[String(LU83.screen)]},'lookup');
 luRender83();
}
function luPickToken83(id){LU83.picked=LU83.picked===id?null:id;LU83.toast='';luRender83()}
function luDropSlot83(i){
 const id=LU83.picked;if(!id)return;
 const want=LU_PLANETS83[i].id;
 if(LU83.order[i])return;
 if(id!==want){
  LU83.misses++;
  LU83.toast='Try a different path.';
  LU83.picked=null;
  luRender83();
  return;
 }
 LU83.order[i]=id;
 LU83.tray=LU83.tray.filter(x=>x!==id);
 LU83.picked=null;
 LU83.toast='';
 LU83.lineId=id;
 if(typeof pPractice68==='function')pPractice68('logic','Look Up',{planets:[id]},'lookup');
 if(LU83.order.every(Boolean)){
  LU83.read=true;
  luCredit83('order');
  luChime83('order');
 }
 luRender83();
}
function luHint83(){LU83.hint=Math.min(LU_HINTS83.length,LU83.hint+1);luRender83()}
function luFindEarth83(id){
 if(id==='earth'){
  if(!LU83.foundEarth){LU83.foundEarth=true;LU83.read=true;luChime83('earth');if(typeof pPractice68==='function')pPractice68('logic','Look Up',{screens:['4']},'lookup')}
  luRender83();
 }
}
function luMoon83(){LU83.moon=true;luRender83()}
function luNext83(){if(LU83.screen>=5)return;LU83.screen++;LU83.read=LU83.screen===5;LU83.noticed=false;LU83.toast='';LU83.lineId=null;if(LU83.screen===5)luChime83('night');luRender83();window.scrollTo(0,0)}
function luBack83(){if(LU83.screen<=1)return;LU83.screen--;LU83.read=LU83.screen===3?LU83.order.every(Boolean):LU83.screen===4?LU83.foundEarth:true;LU83.noticed=LU83.screen===3?LU83.order.every(Boolean)&&LU83.credited.notice:LU83.screen===4?LU83.foundEarth&&!!LU83.chimed.earth&&false:true;if(LU83.screen<=2){LU83.read=true;LU83.noticed=true}if(LU83.screen===4){LU83.read=LU83.foundEarth;LU83.noticed=false}if(LU83.screen===3){LU83.read=LU83.order.every(Boolean);LU83.noticed=!!LU83.credited.notice}LU83.toast='';luRender83();window.scrollTo(0,0)}

function luBind83(root){
 root.querySelector('[data-lu-speak]')?.addEventListener('click',()=>{const t=root.querySelector('#lu83-line,.lu83-line')?.textContent||'';luSpeak83(t)});
 root.querySelectorAll('[data-lu-speak-line]').forEach(b=>b.addEventListener('click',()=>luSpeak83(gT(b.dataset.luSpeakLine))));
 root.querySelector('[data-lu-read]')?.addEventListener('click',luDoRead83);
 root.querySelector('[data-lu-noticed]')?.addEventListener('click',luDoNotice83);
 root.querySelector('[data-lu-next]')?.addEventListener('click',luNext83);
 root.querySelector('[data-lu-back]')?.addEventListener('click',luBack83);
 root.querySelectorAll('[data-lu-home]').forEach(b=>b.addEventListener('click',()=>show('hub')));
 root.querySelectorAll('[data-lu-token]').forEach(b=>b.addEventListener('click',()=>luPickToken83(b.dataset.luToken)));
 root.querySelectorAll('[data-lu-slot]').forEach(b=>b.addEventListener('click',()=>luDropSlot83(+b.dataset.luSlot)));
 root.querySelector('[data-lu-hint]')?.addEventListener('click',luHint83);
 root.querySelectorAll('[data-lu-earth]').forEach(b=>b.addEventListener('click',()=>luFindEarth83(b.dataset.luEarth)));
 root.querySelector('[data-lu-moon]')?.addEventListener('click',luMoon83);
 luBindDrag83(root);
}

function luBindDrag83(root){
 let drag=null,ghost=null;
 const clear=()=>{if(ghost)ghost.remove();ghost=null;drag=null;root.querySelectorAll('.lu83-slot.over').forEach(s=>s.classList.remove('over'))};
 root.querySelectorAll('[data-lu-token]').forEach(btn=>{
  btn.addEventListener('pointerdown',e=>{
   if(e.button!=null&&e.button!==0)return;
   drag={id:btn.dataset.luToken,ptr:e.pointerId};
   LU83.picked=drag.id;
   btn.classList.add('on');
   ghost=btn.cloneNode(true);
   ghost.className='lu83-ghost';
   ghost.style.position='fixed';ghost.style.left=e.clientX-28+'px';ghost.style.top=e.clientY-28+'px';ghost.style.pointerEvents='none';ghost.style.zIndex=40;
   document.body.appendChild(ghost);
   try{btn.setPointerCapture(e.pointerId)}catch(err){}
  });
  btn.addEventListener('pointermove',e=>{
   if(!drag||drag.ptr!==e.pointerId||!ghost)return;
   ghost.style.left=e.clientX-28+'px';ghost.style.top=e.clientY-28+'px';
   const el=document.elementFromPoint(e.clientX,e.clientY);
   root.querySelectorAll('.lu83-slot.over').forEach(s=>s.classList.remove('over'));
   el?.closest?.('[data-lu-slot]')?.classList.add('over');
  });
  const up=e=>{
   if(!drag||drag.ptr!==e.pointerId)return;
   const el=document.elementFromPoint(e.clientX,e.clientY);
   const slot=el&&el.closest&&el.closest('[data-lu-slot]');
   const id=drag.id;
   clear();
   if(slot){LU83.picked=id;luDropSlot83(+slot.dataset.luSlot)}
  };
  btn.addEventListener('pointerup',up);
  btn.addEventListener('pointercancel',()=>clear());
 });
}

RENDER.lookup=function(){if(typeof pPractice68==='function')pPractice68('logic','Look Up',{},'lookup');if(!LU83._open){luReset83();LU83._open=true}luRender83()};
{const sh=show;show=function(id){if(id!=='lookup')LU83._open=false;return sh.apply(this,arguments)}}
{const hub=RENDER.hub;RENDER.hub=renderHub=function(){const r=hub.apply(this,arguments);const h=$('hub');if(!h||h.querySelector('[data-lu83]'))return r;const tile=document.createElement('button');tile.className='hubtile';tile.dataset.lu83='1';tile.setAttribute('onclick',"show('lookup')");tile.innerHTML=`${luTileArt83()}${gT('Look Up')}<small>${gT('The Sun and the planets.')}</small>`;const paint=[...h.querySelectorAll('.hubtile')].find(b=>(b.getAttribute('onclick')||'')==="show('paint')");if(paint)paint.after(tile);else h.querySelector('.explore71 .hubgrid, .hubgrid')?.append(tile);if(typeof artRefresh63==='function')artRefresh63(h);if(typeof lcHideEntry81==='function')lcHideEntry81(h);return r}}
{if(typeof pTrimSwitch74==='function'){const trim=pTrimSwitch74;pTrimSwitch74=function(){const r=trim.apply(this,arguments);$('lookup')?.querySelectorAll('[data-mode71]').forEach(el=>el.remove());return r}}}
{if(typeof lampReason73==='function'){const why=lampReason73;lampReason73=function(reason){return reason==='planets'?gT('Your lamp grew because you noticed a pattern in the planets.'):why.apply(this,arguments)}}}
{if(typeof lampStarLine81==='function'){const line=lampStarLine81;lampStarLine81=function(item){if(item&&item.k==='planets'&&!(item.n>1))return gT('You noticed a pattern in the planets.');return line.apply(this,arguments)}}}
{if(typeof lampSkyLoad81==='function'){lampSkyLoad81=function(pid){const raw=safeJSON(RAW.get(lampSkyKey81(pid)),null),data={filled:0,stars:[]};if(raw&&typeof raw==='object'){data.filled=raw.filled?1:0;if(Array.isArray(raw.stars))data.stars=raw.stars.filter(x=>x&&typeof x==='object').map(x=>({k:['rhyme','memory','retry','notice','planets',''].includes(x.k)?x.k:'',d:typeof x.d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.d)?x.d:''}))}return data}}}

document.head.insertAdjacentHTML('beforeend',`<style id="lu83-css">
#lookup .lu83-card{--lu-sky1:#e9e2d4;--lu-sky2:#f3eee4;--lu-star:#4e6b5c;--lu-line:#72583f;background:var(--card);color:var(--ink);text-align:center;padding:14px 14px 18px}
#lookup .lu83-card.lu83-dark{--lu-sky1:#10182c;--lu-sky2:#243050;--lu-star:#f6efe0;--lu-line:#d9c9a8}
#lookup .lu83-card h2{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
#lookup .lu83-card h2 .lamp-art63{width:52px}
#lookup .lu83-svg{display:block;width:100%;max-width:420px;margin:0 auto;border-radius:14px;overflow:visible}
#lookup .lu83-scene{margin:8px auto 12px}
#lookup .lu83-line{font-size:1.2rem;font-weight:700;margin:.4em 0;color:var(--ink)}
#lookup .lu83-actions,.lu83-nav,.lu83-track{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center}
#lookup .lu83-btn{min-height:52px;min-width:52px;padding:12px 16px;font-size:1.08rem;border-radius:14px;background:var(--card);color:var(--ink);border:2px solid color-mix(in oklab,var(--ink) 25%,transparent)}
#lookup .lu83-btn.p,#lookup .lu83-btn[data-lu-read],#lookup .lu83-btn[data-lu-noticed],#lookup .lu83-btn[data-lu-next],#lookup .lu83-btn[data-lu-home].p{background:var(--acc);color:#fff;border-color:var(--acc)}
#lookup .lu83-dark .lu83-btn.p,#lookup .lu83-dark .lu83-btn[data-lu-read],#lookup .lu83-dark .lu83-btn[data-lu-noticed],#lookup .lu83-dark .lu83-btn[data-lu-next]{color:#f6efe0}
#lookup .lu83-notice,#lookup .lu83-explain,#lookup .lu83-planet-line{border-left:6px solid var(--acc);padding:8px 12px;margin:12px 0;background:color-mix(in oklab,var(--card) 88%,var(--acc) 12%);text-align:start}
#lookup .lu83-explain p,#lookup .lu83-notice p,#lookup .lu83-planet-line p{margin:.35em 0}
#lookup .lu83-dots{display:flex;gap:8px;justify-content:center;list-style:none;padding:0;margin:6px 0 10px}
#lookup .lu83-dots li{width:10px;height:10px;border-radius:50%;background:color-mix(in oklab,var(--ink) 28%,transparent)}
#lookup .lu83-dots li[aria-current="step"]{background:var(--acc);width:14px}
#lookup .lu83-scale{font-size:.92rem;font-weight:700;margin:4px 0 8px;color:var(--ink)}
#lookup .lu83-sr{margin:12px auto;max-width:28em;text-align:start}
#lookup .lu83-sr summary{min-height:44px;cursor:pointer;font-weight:700;display:flex;align-items:center;gap:.45em}#lookup .lu83-sr summary::-webkit-details-marker{display:none}#lookup .lu83-sr summary::before{content:"";width:0;height:0;border-top:.34em solid transparent;border-bottom:.34em solid transparent;border-left:.48em solid currentColor;flex:none}#lookup .lu83-sr[open] summary::before{transform:rotate(90deg)}#lookup .lu83-disc.lu83-moon.named span{position:static;width:auto;height:auto;clip:auto;overflow:visible}
#lookup .lu83-sr ul{padding-left:1.2em}
#lookup .lu83-credit{font-size:.86rem;max-width:28em;margin:14px auto 4px}
#lookup .lu83-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0;min-height:64px}
#lookup .lu83-token,#lookup .lu83-disc{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:52px;min-height:52px;padding:6px;border-radius:14px;border:2px solid color-mix(in oklab,var(--ink) 22%,transparent);background:var(--card);color:var(--ink);font-size:.85rem}
#lookup .lu83-token.on,#lookup .lu83-slot.ready,#lookup .lu83-slot.over{border-color:var(--acc);box-shadow:0 0 0 3px color-mix(in oklab,var(--acc) 35%,transparent)}
#lookup .lu83-slots{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;list-style:none;padding:0;margin:8px 0;align-items:end}
#lookup .lu83-slot,#lookup .lu83-sunlab{min-width:52px;min-height:52px;padding:6px 4px;border-radius:14px;border:2px dashed color-mix(in oklab,var(--ink) 30%,transparent);background:transparent;color:var(--ink);font-size:.78rem}
#lookup .lu83-slot.filled{border-style:solid;background:color-mix(in oklab,var(--card) 80%,var(--acc) 20%)}
#lookup .lu83-sunlab{border-style:solid;display:grid;place-items:center;font-weight:700}
#lookup .lu83-toast{color:var(--ink);font-weight:700}
#lookup .lu83-sizes{margin:0 auto}
#lookup .lu83-size-row{display:flex;flex-wrap:wrap;gap:8px 10px;justify-content:center;align-items:flex-end}
#lookup .lu83-size-item{display:flex;align-items:flex-end;gap:2px}
#lookup .lu83-disc span,#lookup .lu83-token span{max-width:5.5em;line-height:1.15}
#lookup .lu83-disc:not(.named) span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
#lookup .lu83-disc.named span,#lookup .lu83-moon span{position:static;width:auto;height:auto;clip:auto;overflow:visible}
#lookup .lu83-disc.lit,#lookup .lu83-moon.lit{box-shadow:0 0 0 3px color-mix(in oklab,var(--acc) 50%,transparent);border-color:var(--acc)}
#lookup .lu83-goodnight{position:relative}
#lookup .lu83-lamp{position:relative;margin-top:-36px;z-index:2}
#lookup .lu83-lamp .lamp73-svg,#lookup .lu83-lamp .lu83-lamp-svg{width:120px;height:120px}
#lookup .lu83-ghost{margin:0;opacity:.92;box-shadow:0 6px 16px #0004}
#lookup .lu83-wander.drift{animation:lu83-drift 18s ease-in-out infinite alternate}
#lookup .lu83-dusts{animation:lu83-dust 42s linear infinite}
#lookup .lu83-breath{animation:lu83-breath 9s ease-in-out infinite}
#lookup .lu83-wander{transition:opacity 1s ease}
#lookup .lu83-wander.lit circle{transition:r 1s ease,opacity 1s ease}
@keyframes lu83-drift{from{transform:translate(0,0)}to{transform:translate(-6px,3px)}}
@keyframes lu83-dust{from{transform:translateX(0)}to{transform:translateX(8px)}}
@keyframes lu83-breath{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
#lookup .lu83-reduce .lu83-wander.drift,#lookup .lu83-reduce .lu83-dusts,#lookup .lu83-reduce .lu83-breath{animation:none!important;transform:none!important}
@media(prefers-reduced-motion:reduce){#lookup .lu83-wander.drift,#lookup .lu83-dusts,#lookup .lu83-breath{animation:none!important;transform:none!important}}
@media(max-width:400px){#lookup .lu83-card{padding:12px 10px 16px}#lookup .lu83-btn{padding:10px 12px}}
</style>`);


/* v83 QA fixes from the v81/v82 report: star taps, Word Kinds X, LANG dates, Read Together marks, high-contrast text, --hi fill. */
function lampDate81(d){
 if(!d)return '';
 const p=d.split('-').map(Number);if(p.length!==3||!p[0])return '';
 const dt=new Date(p[0],p[1]-1,p[2]);
 const loc=(typeof LANG==='string'&&LANG)?LANG:undefined;
 try{return dt.toLocaleDateString(loc,{year:'numeric',month:'long',day:'numeric'})}catch(e){return d}
}
function lampStarPop83(sky){
 const card=sky&&(sky.closest('.today64')||sky.parentElement);
 if(!card)return sky&&sky.querySelector('.lamp81-pop');
 const hero=card.querySelector('.lamp76-hero')||card;
 let pop=hero.querySelector(':scope > .lamp81-pop')||card.querySelector('.lamp81-pop')||(sky&&sky.querySelector('.lamp81-pop'));
 if(!pop)return null;
 const sr=hero.querySelector('.lamp81-sr, [data-sky81-list]');
 if(sr)sr.insertAdjacentElement('afterend',pop);
 else hero.appendChild(pop);
 pop.style.left='';pop.style.top='';pop.style.transform='';
 return pop;
}
function lampStarOpen83(sky,btn){
 if(!sky||!btn)return;
 const pop=lampStarPop83(sky);if(!pop)return;
 const label=btn.getAttribute('aria-label')||btn.textContent||'';
 const already=pop.getAttribute('data-for')===btn.dataset.skyI&&!pop.hidden;
 document.querySelectorAll('.lamp81-star[aria-expanded]').forEach(b=>b.setAttribute('aria-expanded','false'));
 if(already){pop.hidden=true;pop.removeAttribute('data-for');return}
 pop.hidden=false;pop.dataset.for=btn.dataset.skyI;pop.textContent=label;
 pop.setAttribute('role','status');pop.setAttribute('aria-live','polite');
 btn.setAttribute('aria-expanded','true');
 pop.style.left='';pop.style.top='';pop.style.transform='';
}
if(typeof lampStarOpen81==='function')lampStarOpen81=lampStarOpen83;
if(typeof lampStarOpen82==='function')lampStarOpen82=lampStarOpen83;
if(typeof lampStarClose82==='function'){
 const close=lampStarClose82;
 lampStarClose82=function(){close.apply(this,arguments);document.querySelectorAll('.lamp76-hero > .lamp81-pop, .today64 > .lamp81-pop').forEach(p=>{p.style.left='';p.style.top='';p.style.transform=''})}
}
if(typeof lampSkyMount81==='function'){
 const mount=lampSkyMount81;
 lampSkyMount81=function(host,pid){
  if(host)host.querySelectorAll('.lamp81-pop').forEach(n=>{if(!n.closest('[data-sky81]'))n.remove()});
  return mount.apply(this,arguments);
 };
}

function lampTogetherCur83(){
 const root=$('session');if(!root||root.classList.contains('hidden'))return;
 const spans=[...root.querySelectorAll('#st .w, .story .w')];
 if(!spans.length)return;
 spans.forEach(s=>s.classList.remove('cur'));
 const next=spans.find(s=>!s.classList.contains('ok'));
 if(next)next.classList.add('cur');
}
if(typeof start==='function'){const st=start;start=function(){const r=st.apply(this,arguments);lampTogetherCur83();return r}}
if(typeof dailyOpen64==='function'){
 const open=dailyOpen64;
 dailyOpen64=function(id,mode){
  const r=open.apply(this,arguments);
  if(mode==='together'){
   const bar=$('session')&&($('tb')?.parentElement||$('session').querySelector('.noprint'));
   if(bar&&!$('mic'))bar.insertAdjacentHTML('beforeend',` <button type="button" id="mic" onclick="mic()">${(typeof gT==='function'?gT:s=>s)('Read-aloud check')}</button> <span class="soft" id="ms"></span>`);
   lampTogetherCur83();
  }
  return r
 }
}
if(typeof mic==='function'){
 const m=mic;
 mic=function(){
  const r=m.apply(this,arguments);
  if(window.rec&&typeof rec.onresult==='function'&&!rec._lu83){
   rec._lu83=1;const orig=rec.onresult;rec.onresult=function(){orig.apply(this,arguments);lampTogetherCur83()}
  }
  lampTogetherCur83();
  return r
 }
}
if(typeof mark==='function'){const mk=mark;mark=function(){const r=mk.apply(this,arguments);lampTogetherCur83();return r}}

function wkMarkNo83(){
 const fb=$('wkfb');if(!fb)return;
 fb.querySelectorAll('.wk-x83,.wk-x83-msg').forEach(n=>n.remove());
 fb.classList.remove('wk-no83');
 if(!window.WK_WRONG83)return;
 fb.classList.add('wk-no83');
 const msg=(WKS&&WKS.msg)||fb.textContent||'';
 const tryTxt=(typeof gT==='function'?gT('Try another word'):'Try another word');
 const idx=msg.toLowerCase().indexOf(tryTxt.toLowerCase());
 const before=idx>=0?msg.slice(0,idx):'';
 const after=idx>=0?msg.slice(idx):msg;
 fb.textContent='';
 if(before)fb.appendChild(document.createTextNode(before));
 fb.insertAdjacentHTML('beforeend','<span class="wk-x83" aria-hidden="true"></span>');
 const s=document.createElement('span');s.className='wk-x83-msg';s.textContent=after;fb.appendChild(s);
}
if(typeof wkTap==='function'&&typeof pWrap68==='function'){
 pWrap68('wkTap',i=>{const t=WKS&&WKS.toks&&WKS.toks[i];return {willWrong:!!(t&&!t.done&&t.k!==WKS.want)}},token=>{window.WK_WRONG83=!!(token&&token.willWrong);wkMarkNo83()});
}

if(typeof applyLook==='function'){
 const ap=applyLook;
 applyLook=function(){
  const r=ap.apply(this,arguments);
  const L=typeof getLook==='function'?getLook():{};
  document.documentElement.style.setProperty('--hi','#c28500');
  document.documentElement.dataset.lookTheme=L.theme||'warm';
  return r
 }
 applyLook();
}

document.head.insertAdjacentHTML('beforeend',`<style id="lamp83-qa-css">
:root{--hi:#c28500}
.today64>.lamp76-hero .lamp73-figure,.today64>.lamp76-hero .lamp73-figure *{pointer-events:none!important}
.today64 .lamp81-star,.today64 .lamp81-star *{pointer-events:auto!important}
.today64 .lamp81-star{width:44px;height:44px;min-width:44px;min-height:44px;background:transparent!important;border:0;z-index:4}
.today64 .lamp81-star-dot{width:8px!important;height:8px!important;min-width:0!important;min-height:0!important;background:var(--ink,#2f2a24);box-shadow:0 0 6px color-mix(in oklab,var(--acc,#4e6b5c) 40%,transparent);opacity:.86}
.today64.lamp76-night .lamp81-star-dot,html[data-look-theme="dark"] .today64 .lamp81-star-dot,html[data-look-theme="contrast"] .today64 .lamp81-star-dot{background:#f7f1e6;box-shadow:0 0 8px #fff6d8,0 0 2px #fff;opacity:.92}
@keyframes lamp81-twinkle{0%,100%{opacity:.72}50%{opacity:.95}}
@media(prefers-reduced-motion:reduce){.today64 .lamp81-star-dot{opacity:.88!important;animation:none!important}}
.lamp76-hero>.lamp81-pop:not([hidden]){position:relative!important;left:auto!important;top:auto!important;transform:none!important;margin:8px auto 12px;z-index:8;width:calc(100% - 16px);max-width:16em;pointer-events:auto}
#wkfb.wk-no83{display:block;text-align:center}#wkfb.wk-no83 .wk-x83{display:inline-block;vertical-align:-.12em;margin:0 .2em}#wkfb.wk-no83 .wk-x83-msg{display:inline}
.wk-x83{position:relative;width:.9em;height:.9em;flex:none}
.wk-x83::before,.wk-x83::after{content:"";position:absolute;left:50%;top:8%;width:2.5px;height:84%;background:currentColor;border-radius:2px}
.wk-x83::before{transform:translateX(-50%) rotate(45deg)}
.wk-x83::after{transform:translateX(-50%) rotate(-45deg)}
#session .w.cur.miss::before{content:"";display:inline-block;width:0;height:0;margin-inline-end:.28em;border-top:.32em solid transparent;border-bottom:.32em solid transparent;border-left:.45em solid var(--ink);vertical-align:middle}
html[data-look-theme="contrast"] button.p,html[data-look-theme="contrast"] .bigbtn.p,html[data-look-theme="contrast"] button.p.lu83-btn,html[data-look-theme="contrast"] .lu83-btn.p,html[data-look-theme="contrast"] .pchip.on{color:#000!important;background:var(--acc,#ffd400)!important;border-color:var(--acc,#ffd400)!important}
</style>`);
