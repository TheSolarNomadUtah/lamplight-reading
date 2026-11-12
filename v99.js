// v99: Browser and Android Back move between in-app screens.
//
// After showImpl97 runs (including redirects such as music→Games, arcade
// fallback, retired ids→Home), we pushState the screen that is actually
// visible. Same-screen re-renders do not push. popstate calls show() with
// a flag so it does not push, which keeps Back/Forward loop-free and lets
// existing leave-teardown run (songs stop, smoke rAF stops, practice
// closes, reward overlay closes) — the same path as the in-app Home button.
//
// The URL hash is #hub, #letters, #games, … so a reload, including an
// offline deep load of a hashed URL, can reopen that screen. The hash is
// never sent to a server. The move-progress hash #lamp-import= is never
// overwritten. Unknown hashes (#pform, #grades64, …) are ignored.
//
// Back on Home:
//  - In a browser tab, Back walks the in-app stack, then leaves the site.
//    We do not add a trap entry, so families are not stuck on the page.
//  - In an installed PWA (display-mode standalone or fullscreen, or iOS
//    navigator.standalone), one guard entry sits under the first screen
//    so the first Back from Home, when there is no previous in-app
//    screen, stays on Home and does not close the app. Leaving the
//    installed app is via the system Home or Recents control.

const HIST99={fromPop:false,last:null,inited:false,bootTimer:0};

const LIVE99=['hub','letters','trace','cards','paint','lookup','songs88',
 'look','about','kids','adults','games','lib','solo','session','print',
 'bedtime','record','daycare','log','arcade'];

function isStandalone99(){
 try{
  return !!(window.matchMedia&&(
   window.matchMedia('(display-mode: standalone)').matches||
   window.matchMedia('(display-mode: fullscreen)').matches
  ))||!!(navigator.standalone);
 }catch(e){return false}
}

function reservedHash99(h){
 h=h==null?(location.hash||''):h;
 return /^#lamp-import=/.test(h);
}

function knownId99(id){
 if(!id||typeof id!=='string')return false;
 if(id==='home')return true;
 return LIVE99.indexOf(id)>=0;
}

function visId99(){
 try{
  const vis=[];
  document.querySelectorAll('main>section').forEach(el=>{
   if(el.id&&!el.classList.contains('hidden'))vis.push(el.id);
  });
  if(vis.length===1)return vis[0];
  if(vis.length>1)return vis.find(id=>id!=='hub')||vis[0];
 }catch(e){}
 return HIST99.last||'hub';
}

function parseHash99(){
 if(reservedHash99())return null;
 const h=(location.hash||'').replace(/^#/,'');
 if(h==='home')return 'home';
 return knownId99(h)?h:null;
}

function url99(id){
 return location.pathname+location.search+'#'+(id==='home'?'hub':(id||'hub'));
}

function sameState99(id){
 const s=history.state;
 return !!(s&&s.lamp===99&&s.id===id&&!s.guard&&location.hash==='#'+id);
}

function writeState99(id,how){
 if(reservedHash99())return;
 id=id==='home'?'hub':id;
 if(!knownId99(id))id='hub';
 const st={lamp:99,id:id};
 if(how==='guard')st.guard=1;
 try{
  if(how==='push'){
   if(sameState99(id)){HIST99.last=id;return}
   history.pushState(st,'',url99(id));
  }else{
   history.replaceState(st,'',url99(id));
  }
 }catch(e){}
 HIST99.last=id;
}

function showHist99(id){
 const fromPop=HIST99.fromPop;
 const impl=typeof showImpl97==='function'?showImpl97:HIST99.base;
 const r=impl.apply(this,arguments);
 let actual=visId99();
 if(!knownId99(actual))actual=(id==='home'?'hub':id);
 if(actual==='home')actual='hub';
 if(fromPop){
  HIST99.last=actual;
 }else if(!reservedHash99()){
  writeState99(actual,'push');
 }
 return r;
}

function onPop99(ev){
 if(reservedHash99())return;
 const st=ev&&ev.state;
 const ours=st&&st.lamp===99;
 const hashed=parseHash99();
 // Foreign or empty state: do not intercept — a browser tab can leave.
 if(!ours&&!hashed)return;

 let id=ours&&knownId99(st.id)?st.id:(hashed||'hub');
 if(id==='home')id='hub';

 HIST99.fromPop=true;
 try{
  if(typeof show==='function')show(id);
 }catch(e){}
 HIST99.fromPop=false;
 HIST99.last=visId99();
 // Hash-only navigation (deep link, or a same-document hash change)
 // has no state object: stamp this entry without pushing.
 if(!ours)writeState99(HIST99.last,'replace');

 // Installed PWA: we popped onto the guard under Home. Re-seed one
 // cushion entry so this Back stays on Home instead of closing the app.
 if(ours&&st.guard&&isStandalone99()){
  try{history.pushState({lamp:99,id:HIST99.last||'hub'},'',url99(HIST99.last||'hub'))}catch(e){}
 }
}

function bootHist99(){
 if(HIST99.inited)return;
 if(typeof show!=='function'||typeof showImpl97!=='function')return;
 if(reservedHash99())return;
 HIST99.inited=true;

 const hashed=parseHash99();
 if(hashed){
  HIST99.fromPop=true;
  try{show(hashed)}catch(e){}
  HIST99.fromPop=false;
 }
 const landing=visId99()||'hub';

 if(isStandalone99()){
  writeState99('hub','guard');
  if(landing!=='hub')writeState99(landing,'push');
  else{
   // Cushion above the guard so the first Back from Home stays.
   try{history.pushState({lamp:99,id:'hub'},'',url99('hub'))}catch(e){}
   HIST99.last='hub';
  }
 }else{
  writeState99(landing,'replace');
 }

 window.addEventListener('popstate',onPop99);
}

function stamp99(fn){
 fn._v99=1;
 fn._v97=1;fn._v86=1;fn._v88songs=1;fn._v90=1;fn._v92=1;
 return fn;
}

function installShow99(){
 if(typeof showImpl97!=='function')return;
 if(typeof show==='function'&&!HIST99.base&&show!==showHist99&&show!==showImpl97)
  HIST99.base=show;
 if(show===showHist99&&show._v99)return;
 show=stamp99(showHist99);
}

installShow99();
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',function(){installShow99();bootHist99()});
}else{
 installShow99();
}
setTimeout(function(){installShow99();bootHist99()},0);
