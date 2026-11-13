// v116: ship Luna's fixed Mary Had a Little Lamb. Same path and name,
// encoded to the existing formats (LAME VBR V2 MP3, libopus 56 kbps mono).
// ?v=116 so lamplight-extra and the service worker pick up the new bytes
// instead of the previous mix. Do not wrap show(); the v99 Back wrap stays outermost.
const MARY_URLS116=['audio/sing/mary_luna.mp3','audio/sing/mary_luna.opus'];
function isMaryUrl116(u){
 const path=String(u||'').split('?')[0];
 return MARY_URLS116.some(s=>path===s||path.endsWith('/'+s));
}
function bustMary116(u){
 if(!u||!isMaryUrl116(u))return u;
 const i=String(u).indexOf('?'),path=i>=0?u.slice(0,i):u,qs=i>=0?u.slice(i+1):'';
 const p=new URLSearchParams(qs);
 p.set('v','116');
 return path+'?'+p.toString();
}
async function evictStaleMary116(c){
 const keys=await c.keys();
 await Promise.all(keys.filter(r=>{
  const url=new URL(r.url,location.href);
  return isMaryUrl116(url.pathname)&&url.searchParams.get('v')!=='116';
 }).map(r=>c.delete(r)));
}
async function refreshMary116(){
 if(!('caches' in window))return;
 try{
  const c=await caches.open('lamplight-extra');
  await evictStaleMary116(c);
  if(typeof AFMT==='string'&&navigator.onLine){
   const u='audio/sing/mary_luna.'+AFMT,q=u+'?v=116';
   try{
    if(!(await c.match(q))){
     const r=await fetch(q,{cache:'no-cache',credentials:'same-origin'});
     if(r.ok)await c.put(q,r);
    }
   }catch(e){}
   await evictStaleMary116(c);
  }
 }catch(e){}
}
let ready116=refreshMary116();
function boot116(){
 if(boot116._on)return;boot116._on=1;
 if(typeof singPlan==='function'&&!singPlan._v116){
  const prev=singPlan;
  singPlan=function(song,v){
   const plan=prev.apply(this,arguments);
   if(plan){
    if(plan.mix)plan.mix=bustMary116(plan.mix);
    if(plan.stems)plan.stems=plan.stems.map(bustMary116);
   }
   return plan;
  };
  singPlan._v116=1;
 }
 const wrap=fn=>{
  if(typeof fn!=='function'||fn._v116)return fn;
  const prev=fn;
  const wrapped=async function(u){
   if(isMaryUrl116(u))await ready116;
   return prev.apply(this,arguments);
  };
  wrapped._v116=1;
  return wrapped;
 };
 if(typeof getBuf==='function')getBuf=wrap(getBuf);
 if(typeof hasCache==='function')hasCache=wrap(hasCache);
 setTimeout(()=>{ready116=refreshMary116();ready116.catch(()=>{})},1200);
 ready116.catch(()=>{});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot116);
else boot116();
setTimeout(boot116,0);
