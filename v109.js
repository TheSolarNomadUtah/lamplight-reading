/* v109: add Curator's two Quiet Gallery pictures (Haeckel Spumellaria,
   Phantom Galaxy M74) beside the eight core Wind-down pieces. Both are
   bedtime_note "busy", so they appear only in daytime. Do not wrap show().
   Do not fetch source_url. */
function patWindBusy109(it){
 return String(it&&it.bedtime_note||'').toLowerCase()==='busy';
}
function patWindNight109(){
 return (typeof patNight==='function'&&patNight())||!!(document.body&&document.body.classList.contains('bedtime'));
}
function patWindCredit109(it){
 const credit=String((it&&it.credit)||[it&&it.artist,it&&it.year,it&&it.license].filter(Boolean).join(', ')).trim();
 const lic=String(it&&it.license||'').trim();
 if(/^CC BY(?!-)/i.test(lic)&&!/CC\s*BY/i.test(credit)){
  return (credit?credit.replace(/[.\s]+$/,'')+'. ':'')+lic+'.';
 }
 return credit;
}
function patWindSrc109(it){
 const base=it&&it.base?it.base:'gallery/core/';
 return base+String(it&&it.file||'').replace(/^\/+/,'');
}
function patWindVisible109(all){
 const night=patWindNight109();
 return (all||[]).filter(it=>it&&it.file&&(!night||!patWindBusy109(it)));
}
patWindLoad106=function(){
 const done=all=>{
  PAT106.windAll109=all;
  PAT106.windItems=patWindVisible109(all);
  return PAT106.windItems;
 };
 if(PAT106.windAll109)return Promise.resolve(done(PAT106.windAll109));
 const packs=[
  {url:'gallery/core/manifest.json',base:'gallery/core/'},
  {url:'gallery/app-pack/manifest.json',base:'gallery/app-pack/'}
 ];
 return Promise.all(packs.map(p=>fetch(p.url,{cache:'force-cache'}).then(r=>r.ok?r.json():[]).then(raw=>({base:p.base,raw})).catch(()=>({base:p.base,raw:[]})))).then(parts=>{
  const all=[];
  parts.forEach(({base,raw})=>{
   (Array.isArray(raw)?raw:[]).forEach(it=>{
    if(it&&it.file&&typeof patWindLicenseOk106==='function'&&patWindLicenseOk106(it.license)){
     all.push(Object.assign({},it,{base}));
    }
   });
  });
  return done(all);
 });
};
patWindDraw106=function(){
 const el=$('patterns');if(!el)return;
 PAT106.windI=PAT106.windI||0;
 el.innerHTML=patShell(patT('Wind-down Gallery'),`
  <p class="soft">${patT('A quiet look at real pictures, one at a time. Tap the picture, or Next, when you are ready.')}</p>
  <div class="pat-wind" id="patWind106">
   <div class="pat-wind-stage" id="patWindStage106" role="img"></div>
   <p class="kline" id="patWindTitle106"></p>
   <p class="soft pat-credit" id="patWindCredit106"></p>
  </div>
  <div class="pat-row">
   <button type="button" onclick="patWindNext106(-1)">${patT('Previous picture')}</button>
   <button type="button" class="p" onclick="patWindNext106(1)">${patT('Next picture')}</button>
  </div>
 `);
 if(patWindNight109())el.classList.add('pat-wind-dim');
 else el.classList.remove('pat-wind-dim');
 patWindLoad106().then(items=>{
  if(!items.length){
   const c=$('patWindCredit106');
   if(c)c.textContent=patT('These pictures are not on this device yet.');
   return;
  }
  let i=PAT106.windI||0;
  if(i<0||i>=items.length)i=0;
  patWindShow106(i,true);
  const stage=$('patWindStage106');
  if(stage&&!stage.dataset.bound){
   stage.dataset.bound='1';
   stage.addEventListener('click',()=>patWindNext106(1));
  }
 });
 if(typeof turtlePlace105==='function')turtlePlace105('patterns');
};
patWindShow106=function(i,instant){
 const items=patWindVisible109(PAT106.windAll109||PAT106.windItems||[]);
 PAT106.windItems=items;
 if(!items.length)return;
 const n=items.length;i=((i%n)+n)%n;PAT106.windI=i;
 const it=items[i],stage=$('patWindStage106');if(!stage)return;
 const L=(typeof LANG==='string'&&LANG==='es')?'es':'en';
 const alt=L==='es'?(it.alt_es||it.alt_en||it.title||''):(it.alt_en||it.title||'');
 const src=patWindSrc109(it);
 const img=new Image();
 img.alt=alt;img.src=src;
 const go=()=>{
  const old=[...stage.querySelectorAll('img')];
  img.className='';
  stage.appendChild(img);
  const reveal=()=>{img.classList.add('on');old.forEach(o=>{
   if(instant||(typeof patReduced==='function'&&patReduced())){o.remove();return}
   o.classList.remove('on');
   setTimeout(()=>{if(o.parentNode)o.remove()},1700);
  });};
  if(instant||(typeof patReduced==='function'&&patReduced()))reveal();
  else requestAnimationFrame(()=>requestAnimationFrame(reveal));
  const t=$('patWindTitle106');if(t)t.textContent=it.title||'';
  const c=$('patWindCredit106');if(c)c.textContent=patWindCredit109(it);
  stage.setAttribute('aria-label',alt||it.title||'');
 };
 if(img.complete)go();else img.onload=go;
};
patWindNext106=function(d){
 const items=patWindVisible109(PAT106.windAll109||PAT106.windItems||[]);
 PAT106.windItems=items;
 if(!items.length)return;
 patWindShow106((PAT106.windI||0)+(d||1),false);
};
