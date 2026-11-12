// v91: ship QA's smaller LAME-V2 Luna song MP3s. Same filenames, with a
// ?v=91 cache-bust so lamplight-extra and the service worker pick up the
// new bytes instead of stale 192k copies. Opus and other audio are untouched.
const LUNA_SLUGS91=['twinkle','row','hey_diddle','hello','clap','sam_and_the_cap','little_lamp','five_little_stars','mary'];
const LUNA_MP3_91=LUNA_SLUGS91.map(s=>'audio/sing/'+s+'_luna.mp3');
function isLunaMp3Url91(u){
 const path=String(u||'').split('?')[0];
 return LUNA_MP3_91.some(s=>path===s||path.endsWith('/'+s));
}
async function evictStaleLunaMp3_91(c){
 const keys=await c.keys();
 await Promise.all(keys.filter(r=>{
  const url=new URL(r.url,location.href);
  return isLunaMp3Url91(url.pathname)&&url.searchParams.get('v')!=='91';
 }).map(r=>c.delete(r)));
}
async function refreshLunaMp3_91(){
 if(!('caches' in window))return;
 try{
  const c=await caches.open('lamplight-extra');
  await evictStaleLunaMp3_91(c);
  if(typeof AFMT==='string'&&AFMT==='mp3'&&navigator.onLine){
   for(const u of LUNA_MP3_91){
    const q=u+'?v=91';
    try{
     if(!(await c.match(q))){
      const r=await fetch(q,{cache:'no-cache',credentials:'same-origin'});
      if(r.ok)await c.put(q,r);
     }
    }catch(e){}
   }
   await evictStaleLunaMp3_91(c);
  }
 }catch(e){}
}
let ready91=refreshLunaMp3_91();
function boot91(){
 if(boot91._on)return;boot91._on=1;
 if(typeof singPlan==='function'&&!singPlan._v91){
  const prev=singPlan;
  singPlan=function(song,v){
   const plan=prev.apply(this,arguments);
   if(plan&&typeof AFMT==='string'&&AFMT==='mp3'){
    const bust=u=>u&&!/[?&]v=91(?:&|$)/.test(u)?u+((u.indexOf('?')>=0)?'&':'?')+'v=91':u;
    if(plan.mix)plan.mix=bust(plan.mix);
    if(plan.stems)plan.stems=plan.stems.map(bust);
   }
   return plan;
  };
  singPlan._v91=1;
 }
 const wrap=fn=>{
  if(typeof fn!=='function'||fn._v91)return fn;
  const prev=fn;
  const wrapped=async function(u){
   if(isLunaMp3Url91(u))await ready91;
   return prev.apply(this,arguments);
  };
  wrapped._v91=1;
  return wrapped;
 };
 if(typeof getBuf==='function')getBuf=wrap(getBuf);
 if(typeof hasCache==='function')hasCache=wrap(hasCache);
 // Catch a prefetch that may have put a no-query copy after the first evict.
 setTimeout(()=>{ready91=refreshLunaMp3_91();ready91.catch(()=>{})},1200);
 ready91.catch(()=>{});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot91);
else boot91();
setTimeout(boot91,0);
