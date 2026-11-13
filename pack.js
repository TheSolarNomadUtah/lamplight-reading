// Optional language packs. The core stays English and Spanish.
// Extra languages live in packs/<code>/ and are listed in packs/index.json.
// The picker only offers a pack once it is present. The core opens with none.
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

async function packDiscover(){
 const found=[];
 try{
  const r=await fetch('packs/index.json',{cache:'no-cache'});
  if(!r.ok)throw 0;
  const data=await r.json();
  const list=Array.isArray(data)?data:(data&&Array.isArray(data.packs)?data.packs:[]);
  for(const item of list){
   const code=typeof item==='string'?item:(item&&item.code);
   if(!code||packCoreLang(code)||!/^[a-z]{2,8}$/.test(code))continue;
   try{
    const pr=await fetch('packs/'+code+'/pack.json',{cache:'no-cache'});
    if(!pr.ok)continue;
    const meta=await pr.json();
    if(!meta||meta.code!==code||meta.reviewed!==true)continue;
    found.push({
     code:code,
     name:typeof meta.name==='string'&&meta.name?meta.name:code,
     hasPhonics:!!meta.hasPhonics,
     ui:'packs/'+code+'/ui.json',
     dir:'packs/'+code+'/'
    });
   }catch(e){}
  }
 }catch(e){}
 window.LAMP_PACKS=found;
 packRemember(found.map(p=>p.code));
 packInstallOpen();
 packHookLang();
 packRefreshPicker();
 return found;
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
   fetch(packUiUrl(c)).then(r=>r.json()).then(d=>{
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
// A remembered pack list lets curLang() accept a pack language on the next visit,
// after the pack was discovered once. First discovery still happens below.
(function(){
 const remembered=packRemembered();
 if(remembered.length){
  window.LAMP_PACKS=remembered.map(code=>({code:code,name:code,hasPhonics:false,ui:'packs/'+code+'/ui.json',dir:'packs/'+code+'/'}));
  packInstallOpen();
 }
})();

window.LAMP_PACKS_READY=packDiscover();
