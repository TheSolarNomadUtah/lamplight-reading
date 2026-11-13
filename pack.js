// Optional language packs. The core stays English and Spanish.
// Extra languages live in packs/<code>/ and are listed in packs/index.json.
// The picker only offers a pack once it is installed in its own cache.
// A catalog listing is not an install. The core opens with none.
// This file does not wrap show(), so the v99 Back wrap stays outermost.

window.LAMP_PACKS=window.LAMP_PACKS||[];
window.LAMP_PACKS_READY=window.LAMP_PACKS_READY||null;

const PACK_CORE=['en','es'];
function packCoreLang(c){return PACK_CORE.indexOf(c)>=0}
function packCodes(){
 const extra=window.LAMP_PACKS.map(p=>p&&p.code).filter(c=>c&&!packCoreLang(c));
 return PACK_CORE.concat(extra);
}
function packByCode(c){return (window.LAMP_PACKS||[]).find(p=>p&&p.code===c)||null}
function packUiUrl(c){
 const p=packByCode(c);
 return p?(p.ui||('packs/'+p.code+'/ui.json')):('lang/'+c+'.json');
}

function packInstallOpen(){
 const prev=typeof langOpen86==='function'?langOpen86:function(c){return (window.LANG_OPEN86||PACK_CORE).indexOf(c)>=0};
 langOpen86=function(c){return packCoreLang(c)||prev(c)||!!packByCode(c)};
}

function packRemember(codes){
 try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set('lamp_packs',JSON.stringify(codes||[]))}catch(e){}
}
function packRemembered(){
 try{
  const v=(typeof RAW!=='undefined'&&RAW.get)?RAW.get('lamp_packs'):(localStorage.getItem('lamp_packs'));
  const a=typeof safeJSON==='function'?safeJSON(v,[]):JSON.parse(v||'[]');
  return Array.isArray(a)?a.filter(c=>typeof c==='string'&&/^[a-z]{2,8}$/.test(c)&&!packCoreLang(c)):[];
 }catch(e){return []}
}

function packCatalogItem(item){
 if(typeof item==='string')item={code:item};
 if(!item||!item.code||packCoreLang(item.code)||!/^[a-z]{2,8}$/.test(item.code))return null;
 const bytes=Number(item.bytes);
 return {
  code:item.code,
  name:typeof item.name==='string'&&item.name?item.name:item.code,
  hasPhonics:!!item.hasPhonics,
  bytes:Number.isFinite(bytes)&&bytes>0?bytes:null,
  ui:'packs/'+item.code+'/ui.json',
  dir:'packs/'+item.code+'/'
 };
}

async function packDiscover(){
 const catalog=[];
 try{
  const r=await fetch('packs/index.json',{cache:'no-cache'});
  if(!r.ok)throw 0;
  const data=await r.json();
  const list=Array.isArray(data)?data:(data&&Array.isArray(data.packs)?data.packs:[]);
  for(const item of list){
   const row=packCatalogItem(item);
   if(row)catalog.push(row);
  }
 }catch(e){}
 try{
  const test=window.LAMP_PACK_TEST;
  if(test&&Array.isArray(test.catalog)){
   for(const item of test.catalog){
    const row=packCatalogItem(item);
    if(row&&!catalog.some(p=>p.code===row.code))catalog.push(row);
   }
  }
 }catch(e){}
 window.LAMP_PACK_CATALOG=catalog;
 // Catalog listings are not installed. Do not write them to lamp_packs or LAMP_PACKS.
 packInstallOpen();
 packHookLang();
 packRefreshPicker();
 return catalog;
}

function packHookLang(){
 if(typeof setLang==='function'&&!setLang._pack){
  const prev=setLang;
  setLang=function(c,scope){
   if(!langOpen86(c))c='en';
   if(packCoreLang(c)||c==='en')return prev(c,scope);
   const go=()=>{
    if(scope==='kid')LS.set('lamp_lang',c);
    else{RAW.set('lamp_lang_device',c);LS.del('lamp_lang')}
    location.reload();
   };
   const url=packUiUrl(c);
   const fromCache=(!('caches' in window))?Promise.resolve(null):caches.open('lamplight-pack-'+c).then(cache=>cache.match(url,{ignoreSearch:true})).then(r=>r?r.json():null).catch(()=>null);
   fromCache.then(d=>d||fetch(url,{cache:'no-cache',credentials:'same-origin'}).then(r=>{if(!r.ok)throw 0;return r.json()})).then(d=>{
    try{RAW.set('lamp_dict_'+c,JSON.stringify(d))}catch(e){}
   }).catch(()=>{}).then(go);
  };
  setLang._pack=1;
 }
 if(typeof CONTENT!=='undefined'&&Array.isArray(CONTENT)){
  window.LAMP_PACKS.forEach(p=>{
   if(p.hasPhonics&&CONTENT.indexOf(p.code)<0)CONTENT.push(p.code);
  });
 }
}

function packRefreshPicker(){
 try{
  const box=typeof $==='function'&&($('langcard')||($('hub')&&$('hub').querySelector('#langcard')));
  if(!box||typeof langPicker!=='function')return;
  const html=langPicker();
  if(box.parentNode)box.outerHTML=html;
 }catch(e){}
}

packInstallOpen();
window.LAMP_PACK_CATALOG=window.LAMP_PACK_CATALOG||[];
window.LAMP_PACKS=window.LAMP_PACKS||[];
window.LAMP_PACKS_READY=packDiscover();
