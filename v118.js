/* v118: optional-pack loader. Zero real packs are shipped. Grown-ups get a
   Downloads card. Packs live in lamplight-pack-<code>, outside the core save.
   The pack cache is the source of truth. Do not wrap show(). */
const PACK_CAP118=26214400,PACK_TOTAL118=1073741824;
function packT118(s,o){return typeof gT==='function'?gT(s,o):s}
function packCacheName118(code){return 'lamplight-pack-'+code}
function packFmtSize118(b){
 const n=Math.max(0,Number(b)||0),mb=n/1048576;
 if(mb>=0.1)return mb.toFixed(1)+' MB';
 if(mb>=0.01)return mb.toFixed(2)+' MB';
 if(mb>=0.001)return mb.toFixed(3)+' MB';
 return n>0?'< 0.001 MB':'0 MB';
}
function packIsQuota118(e){
 if(!e)return false;
 const n=e.name||'',c=e.code;
 return n==='QuotaExceededError'||n==='NS_ERROR_DOM_QUOTA_REACHED'||c===22||c===1014||/quota/i.test(String(e.message||e));
}
function packSameOrigin118(u){
 try{
  const url=new URL(u,location.href);
  return url.origin===location.origin&&/^\/packs\/[a-z]{2,8}\//.test(url.pathname);
 }catch(e){return false}
}
function packFileUrl118(code,rel){
 const clean=String(rel||'').replace(/^\/+/,'');
 return new URL('packs/'+code+'/'+clean,location.href).href;
}
function packRelOk118(rel){
 return typeof rel==='string'&&!!rel&&rel.indexOf('..')<0&&!/^[a-z]+:/i.test(rel)&&rel.charAt(0)!=='/'&&rel.charAt(0)!=='\\';
}
function packFileList118(meta){
 const listed=meta&&Array.isArray(meta.files)?meta.files:[];
 const out=[];
 for(const rel of listed){
  if(!packRelOk118(rel))return null;
  if(out.indexOf(rel)<0)out.push(rel);
 }
 for(const rel of ['pack.json','ui.json'])if(out.indexOf(rel)<0)out.push(rel);
 return out;
}
function packCapCheck118(unpacked,coreBytes,installedBytes){
 const u=Number(unpacked)||0,core=Number(coreBytes)||0,inst=Number(installedBytes)||0;
 if(u>=PACK_CAP118)return {ok:false,reason:'pack',unpacked:u};
 if(core+inst+u>=PACK_TOTAL118)return {ok:false,reason:'total',unpacked:u,core:core,installed:inst};
 return {ok:true,unpacked:u,core:core,installed:inst};
}
function packIsInstalled118(code){return !!(typeof packByCode==='function'&&packByCode(code))}
async function packCoreBytes118(){
 try{
  if(typeof OFF==='object'&&OFF&&typeof OFF.size==='number'&&OFF.size>0)return OFF.size;
  const name=(typeof AFMT==='string'&&AFMT==='opus')?'offline-opus.json':'offline.json';
  const r=await fetch(name,{cache:'no-cache',credentials:'same-origin'});
  if(!r.ok)return 0;
  const d=await r.json();
  return Number(d&&d.bytes)||0;
 }catch(e){return 0}
}
async function packCacheBytes118(name){
 if(!('caches' in window))return 0;
 try{
  const c=await caches.open(name),keys=await c.keys();
  let n=0;
  for(const req of keys){
   const r=await c.match(req);if(!r)continue;
   const cl=r.headers.get('Content-Length');
   if(cl&&/^\d+$/.test(cl))n+=+cl;
   else n+=(await r.clone().arrayBuffer()).byteLength;
  }
  return n;
 }catch(e){return 0}
}
async function packInstalledBytes118(except){
 if(!('caches' in window))return 0;
 try{
  const names=await caches.keys();
  let n=0;
  for(const name of names){
   if(name.indexOf('lamplight-pack-')!==0)continue;
   if(except&&name===packCacheName118(except))continue;
   n+=await packCacheBytes118(name);
  }
  return n;
 }catch(e){return 0}
}
async function packCacheHas118(code){
 if(!('caches' in window)||!code)return false;
 try{
  const name=packCacheName118(code);
  if((await caches.keys()).indexOf(name)<0)return false;
  const c=await caches.open(name);
  const hit=await c.match(new URL('packs/'+code+'/pack.json',location.href).href,{ignoreSearch:true});
  return !!hit;
 }catch(e){return false}
}
async function packRestoreInstalled118(){
 const found=[];
 if('caches' in window){
  try{
   const names=await caches.keys();
   for(const name of names){
    if(name.indexOf('lamplight-pack-')!==0)continue;
    const code=name.slice('lamplight-pack-'.length);
    if(!/^[a-z]{2,8}$/.test(code)||(typeof packCoreLang==='function'&&packCoreLang(code)))continue;
    if(!(await packCacheHas118(code)))continue;
    let nameLabel=code,hasPhonics=false;
    try{
     const c=await caches.open(name);
     const hit=await c.match(new URL('packs/'+code+'/pack.json',location.href).href,{ignoreSearch:true});
     const meta=hit?await hit.json():null;
     if(meta&&typeof meta.name==='string'&&meta.name)nameLabel=meta.name;
     hasPhonics=!!(meta&&meta.hasPhonics);
    }catch(e){}
    found.push({code:code,name:nameLabel,hasPhonics:hasPhonics,ui:'packs/'+code+'/ui.json',dir:'packs/'+code+'/'});
   }
  }catch(e){}
 }
 window.LAMP_PACKS=found;
 if(typeof packRemember==='function')packRemember(found.map(p=>p.code));
 if(typeof packInstallOpen==='function')packInstallOpen();
 if(typeof packHookLang==='function')packHookLang();
 found.forEach(p=>{
  if(typeof LANGS!=='undefined'&&Array.isArray(LANGS)&&!LANGS.some(x=>x[0]===p.code))LANGS.push([p.code,p.name]);
 });
 if(typeof packRefreshPicker==='function')packRefreshPicker();
 return found;
}
function packMsg118(el,s){
 const host=el||document.querySelector('[data-packdl118] .pack-msg118');
 if(host)host.textContent=s||'';
}
function packDownloadsHTML118(){
 const catalog=window.LAMP_PACK_CATALOG||[];
 const installed=window.LAMP_PACKS||[];
 const rows=[];
 const seen={};
 const addRow=(item,on)=>{
  if(!item||!item.code||seen[item.code])return;
  seen[item.code]=1;
  const size=item.bytes!=null?packT118('About {size}',{size:packFmtSize118(item.bytes)}):'';
  const bytesAttr=item.bytes!=null?` data-packbytes="${item.bytes}"`:'';
  const kind=item.hasPhonics?packT118('A language pack with letter games, after a review.'):packT118('A language pack for the buttons and labels.');
  if(on){
   rows.push(`<div class="pack-row118" data-packcode="${item.code}" data-installed="1"${bytesAttr}>
    <p><b>${packEsc118(item.name)}</b>${size?' — '+packEsc118(size):''}</p>
    <p class="soft">${packEsc118(kind)} ${packEsc118(packT118('This pack stays on this device.'))}</p>
    <p><button type="button" class="p" data-packremove="${item.code}">${packEsc118(packT118('Remove this pack from this device.'))}</button></p>
   </div>`);
  }else{
   rows.push(`<div class="pack-row118" data-packcode="${item.code}"${bytesAttr}>
    <p><b>${packEsc118(item.name)}</b>${size?' — '+packEsc118(size):''}</p>
    <p class="soft">${packEsc118(kind)} ${packEsc118(packT118('This pack stays on this device.'))}</p>
    <p><button type="button" class="p" data-packadd="${item.code}">${packEsc118(packT118('Add {name}',{name:item.name}))}</button></p>
   </div>`);
  }
 };
 installed.forEach(p=>addRow(p,true));
 catalog.forEach(p=>addRow(p,packIsInstalled118(p.code)));
 const body=rows.length?rows.join(''):`<p class="soft">${packEsc118(packT118('No extra downloads yet'))}</p>`;
 return `<div class="card" data-packdl118="1"><h3>${packEsc118(packT118('Downloads'))}</h3>${body}<p class="soft pack-msg118" role="status"></p></div>`;
}
function packEsc118(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function packAttachDownloads118(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root)return;
 const html=packDownloadsHTML118();
 const old=root.querySelector('[data-packdl118]');
 if(old)old.outerHTML=html;else root.insertAdjacentHTML('beforeend',html);
 const card=root.querySelector('[data-packdl118]');
 if(!card||card._on118)return;
 card._on118=1;
 card.addEventListener('click',e=>{
  const add=e.target.closest('[data-packadd]'),rem=e.target.closest('[data-packremove]');
  if(add){e.preventDefault();packAdd118(add.getAttribute('data-packadd'));}
  if(rem){e.preventDefault();packRemove118(rem.getAttribute('data-packremove'));}
 });
}
function packMetered118(){
 try{
  if(window.LAMP_PACK_TEST&&LAMP_PACK_TEST.metered)return true;
  const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  return !!(c&&(c.saveData||c.type==='cellular'));
 }catch(e){return false}
}
async function packAdd118(code){
 const card=document.querySelector('[data-packdl118]');
 packMsg118(card&&card.querySelector('.pack-msg118'),'');
 if(!code||(typeof packCoreLang==='function'&&packCoreLang(code))||!/^[a-z]{2,8}$/.test(code))return {ok:false,reason:'code'};
 if(await packCacheHas118(code)){await packRestoreInstalled118();packAttachDownloads118();return {ok:true,already:true}}
 const catalog=(window.LAMP_PACK_CATALOG||[]).find(p=>p.code===code);
 const shown=catalog&&catalog.bytes!=null?packFmtSize118(catalog.bytes):null;
 if(shown&&packMetered118()){
  const ok=window.confirm(packT118('Download {name} ({size})? It stays on this device.',{name:(catalog&&catalog.name)||code,size:shown}));
  if(!ok)return {ok:false,reason:'cancel'};
 }
 const name=packCacheName118(code);
 const metaUrl=packFileUrl118(code,'pack.json');
 if(!packSameOrigin118(metaUrl)){packMsg118(null,packT118('This pack could not be added.'));return {ok:false,reason:'origin'}}
 let unpacked=0,stored=false;
 try{
  if(!navigator.onLine&&!(window.LAMP_PACK_TEST&&LAMP_PACK_TEST.allowOfflineAdd)){
   packMsg118(null,packT118('This pack is not on this device yet.'));
   return {ok:false,reason:'offline'};
  }
  const mr=await fetch(metaUrl,{cache:'no-cache',credentials:'same-origin'});
  if(!mr.ok)throw 0;
  const meta=await mr.json();
  if(!meta||meta.code!==code||meta.reviewed!==true)throw 0;
  const files=packFileList118(meta);
  if(!files){packMsg118(null,packT118('This pack could not be added.'));return {ok:false,reason:'origin'}}
  const bodies=[];
  for(const rel of files){
   const url=packFileUrl118(code,rel);
   if(!packSameOrigin118(url)){packMsg118(null,packT118('This pack could not be added.'));return {ok:false,reason:'origin'}}
   const r=await fetch(url,{cache:'no-cache',credentials:'same-origin'});
   if(!r.ok)throw 0;
   const buf=await r.arrayBuffer();
   unpacked+=buf.byteLength;
   bodies.push({url:url,buf:buf,type:r.headers.get('Content-Type')||'application/octet-stream'});
  }
  if(window.LAMP_PACK_TEST&&LAMP_PACK_TEST.measuredBytes!=null)unpacked=Number(LAMP_PACK_TEST.measuredBytes);
  const test=window.LAMP_PACK_TEST||{};
  const coreBytes=test.coreBytes!=null?Number(test.coreBytes):await packCoreBytes118();
  const instBytes=test.installedBytes!=null?Number(test.installedBytes):await packInstalledBytes118(code);
  const gate=packCapCheck118(unpacked,coreBytes,instBytes);
  if(!gate.ok){
   packMsg118(null,packT118(gate.reason==='pack'?'This pack is too big to add.':'Adding this pack would take more room than this app can keep.'));
   return {ok:false,reason:gate.reason,unpacked:unpacked};
  }
  const cache=await caches.open(name);
  for(const b of bodies){
   if(window.LAMP_PACK_TEST&&LAMP_PACK_TEST.quotaError){
    const err=new DOMException('The quota has been exceeded.','QuotaExceededError');
    throw err;
   }
   await cache.put(b.url,new Response(b.buf,{headers:{'Content-Type':b.type,'Content-Length':String(b.buf.byteLength)}}));
   stored=true;
  }
 }catch(e){
  try{if('caches' in window)await caches.delete(name)}catch(x){}
  if(packIsQuota118(e)){
   packMsg118(null,packT118('There is not enough room on this device.'));
   return {ok:false,reason:'quota'};
  }
  packMsg118(null,packT118('This pack could not be added.'));
  return {ok:false,reason:'fail',error:String(e&&e.message||e)};
 }
 await packRestoreInstalled118();
 packAttachDownloads118();
 return {ok:true,unpacked:unpacked};
}
async function packRemove118(code){
 if(!code||!/^[a-z]{2,8}$/.test(code))return {ok:false,reason:'code'};
 const name=packCacheName118(code);
 const core=typeof C==='string'?C:null;
 try{
  if('caches' in window){
   try{
    const c=await caches.open(name),keys=await c.keys();
    await Promise.all(keys.map(k=>c.delete(k)));
   }catch(e){}
   await caches.delete(name);
  }
 }catch(e){}
 const still=await packCacheHas118(code);
 if(still){
  try{if('caches' in window)await caches.delete(name)}catch(e){}
 }
 window.LAMP_PACKS=(window.LAMP_PACKS||[]).filter(p=>p.code!==code);
 if(typeof packRemember==='function')packRemember((window.LAMP_PACKS||[]).map(p=>p.code));
 if(typeof packInstallOpen==='function')packInstallOpen();
 if(typeof packRefreshPicker==='function')packRefreshPicker();
 packAttachDownloads118();
 const cur=typeof LANG==='string'?LANG:(typeof curLang==='function'?curLang():'en');
 if(cur===code){
  try{if(typeof RAW==='object'&&RAW.set)RAW.set('lamp_lang_device','en');if(typeof LS==='object'&&LS.set){LS.set('lamp_lang','en')}}catch(e){}
  if(!(window.LAMP_PACK_TEST&&LAMP_PACK_TEST.noReload))location.reload();
 }
 return {ok:!still,coreUntouched:true,cache:name};
}
function packBootFallback118(){
 try{
  const cur=typeof LANG==='string'?LANG:'';
  if(!cur||cur==='en'||cur==='es'||(typeof packCoreLang==='function'&&packCoreLang(cur)))return;
  if(packIsInstalled118(cur))return;
  if(sessionStorage.getItem('lamp_pack_fb118')===cur)return;
  sessionStorage.setItem('lamp_pack_fb118',cur);
  if(typeof RAW==='object'&&RAW.set)RAW.set('lamp_lang_device','en');
  if(typeof LS==='object'&&LS.del)LS.del('lamp_lang');
  location.reload();
 }catch(e){}
}
function boot118(){
 if(boot118._on)return;boot118._on=1;
 const ready=(window.LAMP_PACKS_READY||Promise.resolve()).then(()=>packRestoreInstalled118()).then(()=>{
  if(typeof packInstallOpen==='function')packInstallOpen();
  if(typeof packHookLang==='function')packHookLang();
  if(typeof packRefreshPicker==='function')packRefreshPicker();
  packBootFallback118();
  packAttachDownloads118();
 });
 window.LAMP_PACKS_READY=ready;
 ready.catch(()=>{});
 if(typeof showImpl97==='function'&&!showImpl97._v118){
  const prev=showImpl97;
  showImpl97=function(id){
   const r=prev.apply(this,arguments);
   try{if(id==='adults')packAttachDownloads118()}catch(e){}
   return r;
  };
  showImpl97._v118=1;
 }
 const ra=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof ra==='function'&&!ra._v118){
  renderAdults=function(){const r=ra.apply(this,arguments);try{packAttachDownloads118()}catch(e){}return r};
  renderAdults._v118=1;
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}
window.PackLoader118={
 CAP_PACK:PACK_CAP118,CAP_TOTAL:PACK_TOTAL118,
 cacheName:packCacheName118,capCheck:packCapCheck118,formatSize:packFmtSize118,
 add:packAdd118,remove:packRemove118,restore:packRestoreInstalled118,
 attach:packAttachDownloads118,isInstalled:packIsInstalled118,
 installedBytes:packInstalledBytes118,coreBytes:packCoreBytes118,
 sameOrigin:packSameOrigin118,cacheHas:packCacheHas118,fileList:packFileList118
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot118);
else boot118();
setTimeout(boot118,0);
