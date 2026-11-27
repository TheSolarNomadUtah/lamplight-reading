/* v189: pre-launch cleanup, part 2 (lighter). Same pixels, same taps, fewer bytes.
   - Audio: the service worker (sw.js, lamplight-v189) now precaches only the audio format this device
     plays. The page's format is AFMT from v25.js (Opus when canPlayType says so, else MP3; ?fmt=mp3 and
     lamp_force_mp3 force MP3). This file writes it to the small 'lamplight-fmt' marker cache as the page
     starts (the SW install waits up to 8 s for it) and, after load, tells the active SW, which adds any
     missing clips of that format and drops the other format from its precache. If the format is never
     known, the SW keeps both formats (v188 behaviour). "Save everything" already downloads one format
     (v25/v62 offList), so it is unchanged.
   - Old iOS Safari: some versions answer canPlayType for Opus but cannot decode Ogg Opus. Once per device,
     a 177-byte silent Ogg Opus probe (and a 120-byte silent MP3) is decoded offline (no sound, no fetch).
     Only if Opus fails and MP3 works: lamp_force_mp3 is set (the existing v25 switch) so the next launch
     plays MP3, the SW keeps MP3, and the undecodable saved Opus clips are freed. Every browser that
     decodes Opus is unchanged.
   - Nothing is fetched from outside; no Math.random; nothing drawn; no audio file is changed. */
(function(root){
'use strict';
var KEY='lamp_afmt189',FK='lamplight-fmt',FU='__afmt189';
var OPUS='T2dnUwACAAAAAAAAAAAAAAAAAAAAAAIotXIBE09wdXNIZWFkAQE4AYC7AAAAAABPZ2dTAAAAAAAAAAAAAAAAAAABAAAASZW+VAEuT3B1c1RhZ3MGAAAAZmZtcGVnAQAAABQAAABlbmNvZGVyPUxhdmMgbGlib3B1c09nZ1MABHgMAAAAAAAAAAAAAAIAAAAU6RciBAcGBgYIC+Y7I6tgCAissw7GCAissw7GCAissw7G';
var MP3='//MUxAAAAANIAAAAAExBTUUzLjEwMFVV//MUxAsAAANIAAAAAFVVVVVVVVVVVVVV//MUxBYAAANIAAAAAFVVVVVVVVVVVVVV//MUxCEAAANIAAAAAFVVVVVVVVVVVVVV//MUxCwAAANIAAAAAFVVVVVVVVVVVVVV';
function fmt(){try{return (typeof AFMT==='string'&&(AFMT==='opus'||AFMT==='mp3'))?AFMT:null}catch(e){return null}}
function bytes(b64){var s=atob(b64),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u.buffer}
function decodes(b64){
  return new Promise(function(ok){
    try{
      var O=root.OfflineAudioContext||root.webkitOfflineAudioContext;if(!O)return ok(null);
      var c=new O(1,1,48000),done=false,fin=function(v){if(!done){done=true;ok(v)}};
      var p=c.decodeAudioData(bytes(b64),function(){fin(true)},function(){fin(false)});
      if(p&&p.then)p.then(function(){fin(true)},function(){fin(false)});
      setTimeout(function(){fin(null)},4000);
    }catch(e){ok(null)}
  });
}
/* Only on a device that cannot decode Opus: its saved Opus clips can never play, so free them. */
function dropExtra(ext){
  if(!('caches' in root))return Promise.resolve();
  return caches.open('lamplight-extra').then(function(c){return c.keys().then(function(ks){return Promise.all(ks.filter(function(r){var p=new URL(r.url).pathname;return /\/audio\/.+/.test(p)&&p.slice(-ext.length)===ext}).map(function(r){return c.delete(r)}))})}).catch(function(){});
}
function markerUrl(){try{return new URL(FU,location.href).href}catch(e){return FU}}
function mark(f){
  if(!f||!('caches' in root)||location.protocol==='file:')return Promise.resolve();
  return caches.open(FK).then(function(c){return c.put(markerUrl(),new Response(f,{headers:{'Content-Type':'text/plain'}}))}).catch(function(){});
}
function tell(f){
  if(!f||!('serviceWorker' in navigator)||location.protocol==='file:')return Promise.resolve();
  return mark(f).then(function(){
    return navigator.serviceWorker.ready.then(function(r){var w=r.active||r.waiting||r.installing;if(w)w.postMessage({t:'afmt189',fmt:f})});
  }).catch(function(){});
}
function effective(){
  var f=fmt();if(!f)return Promise.resolve(null);
  var seen=null;try{seen=localStorage.getItem(KEY)}catch(e){}
  if(f==='mp3'||seen==='opus')return Promise.resolve(f);
  return decodes(OPUS).then(function(o){
    if(o===true){try{localStorage.setItem(KEY,'opus')}catch(e){}return 'opus'}
    if(o===false)return decodes(MP3).then(function(m){
      if(m===true){try{localStorage.setItem('lamp_force_mp3','1');localStorage.setItem(KEY,'mp3')}catch(e){}return dropExtra('.opus').then(function(){return 'mp3'})}
      return f;
    });
    return f;
  });
}
/* The marker goes in as the page starts, so a service worker installing right now reads it. */
if('serviceWorker' in navigator)mark(fmt());
var started=false;
function run(){if(started)return;started=true;effective().then(tell).catch(function(){})}
function later(){setTimeout(run,1500)}
if(document.readyState==='complete')later();else root.addEventListener('load',later);
root.IL189={version:189,format:fmt,effective:effective,tell:tell};
})(typeof window!=='undefined'?window:globalThis);

/* bugs189: four small fixes for bugs already in live v188 (append to the next vNN.js; older files stay frozen).
   No outside requests, no storage, no audio. Spanish strings are untouched (only existing gT keys are used).
   1. Footer vs floating Home button (#fhome). On phones (<=640 px) v21 parks #fhome at bottom:56px,
      inset-inline-start:10px (44 px wide), so on any page scrolled to the bottom it sat on the start of
      "We collect zero data..." (and its translations). Give the footer text symmetric inline room
      (60 px each side: clears the button's 10..54 px band, in LTR and RTL, and keeps the text centered).
      Always on at phone width, not only while the button shows, so the page never reflows mid-scroll.
   2. "Singing: Luna..." credit (.lunacredit89). v89 only wrapped RENDER.adults / RENDER.about at
      DOMContentLoaded; v185 (also at DOMContentLoaded, later) reassigns RENDER.adults/about from the global
      renderAdults/renderAbout chains, which don't carry the v89 wrap (Help never had it; Grown-ups only
      when a v92/v100 boot had copied RENDER.adults back into renderAdults first), so whichever path painted
      last decided whether the credit was there. Same cure as LESSON 19: a MutationObserver on each
      section's own child list keeps exactly one credit, just before the v188 version line (or last).
      It only writes when something is wrong, never touches what it observes otherwise, so it cannot loop
      with v188's observer (v188 only needs .ver188 to be last; we insert before it).
   3. Candle page height. The Candle card starts in "wind-down" (long line, offer button hidden, no
      "How long?" picker) and switches to "offer" when the dim animation ends (animationend, or a timer):
      the line gets shorter, the "Breathe with the Lamp" button and the v131 length picker appear, and at
      390 px the card grows 591 -> 671 px (page 940 -> 1021). Any screenshot / reflow racing that switch saw
      either height. Fix: reserve the offer-phase height from the first paint. We measure the offer layout
      in one synchronous step (show offer + picker, set the offer line, read, restore; no paint in between)
      and set the card's min-height to max(70vh, that). Re-measured on re-render and when the stage
      resizes (width, font size, language); the stage's size never depends on the min-height, so no loop.
   4. Grown-ups "Offline & install" install-help lines: not a real contrast problem. They live inside a
      closed <details> ("Add to home screen"), are not painted, and C9 sampled their (unpainted) boxes
      over the Grown-ups tiles below. Opened, every line passes in every look. No app change; C9 now
      skips text inside closed <details> (see audit-bugs189/c9.js). */
(function(root){
'use strict';
if(root.IL189B&&root.IL189B.on)return;
var D=document;
function $i(id){return D.getElementById(id)}
function T(k){try{return typeof gT==='function'?gT(k):k}catch(e){return k}}

/* ---------- 1. footer clears the floating Home button ---------- */
function css189b(){
  if($i('bugs189css'))return;
  var s=D.createElement('style');s.id='bugs189css';
  s.textContent=
    '@media (max-width:640px){body>footer.zero{padding-inline-start:60px;padding-inline-end:60px}}';
  (D.head||D.documentElement).appendChild(s);
}

/* ---------- 2. Luna credit: exactly one, survives every repaint ---------- */
var CREDIT='Singing: Luna. Played as recorded, with no pitch changes.';
function creditEl(){
  var p=D.createElement('p');
  p.className='soft card lunacredit89';
  p.textContent=T(CREDIT);
  return p;
}
function keepCredit(sec){
  if(!sec)return;
  var all=sec.querySelectorAll('.lunacredit89'),i;
  for(i=1;i<all.length;i++)all[i].remove();
  var c=all[0];
  if(c&&c.parentNode!==sec){c.remove();c=null}
  if(!c)c=creditEl();
  else{var t=T(CREDIT);if(c.textContent!==t)c.textContent=t}
  var ver=null,k=sec.children;
  for(i=0;i<k.length;i++)if(k[i].classList&&k[i].classList.contains('ver188')){ver=k[i];break}
  if(ver){if(c.nextElementSibling!==ver)sec.insertBefore(c,ver)}
  else if(sec.lastElementChild!==c)sec.appendChild(c);
}
var credObs={};
function bootCredit(){
  ['adults','about'].forEach(function(id){
    var sec=$i(id);if(!sec)return;
    keepCredit(sec);
    if(credObs[id]&&credObs[id].el===sec)return;
    if(credObs[id])credObs[id].o.disconnect();
    if(typeof MutationObserver!=='function')return;
    var o=new MutationObserver(function(){keepCredit(sec)});
    o.observe(sec,{childList:true});
    credObs[id]={o:o,el:sec};
  });
}

/* ---------- 3. Candle: reserve the offer-phase height from the start ---------- */
function candleLang(){try{return (typeof LANG==='string'&&LANG)||(typeof curLang==='function'?curLang():'en')}catch(e){return 'en'}}
var measuring=false;
function reserveCandle(){
  if(measuring)return;
  var rt=$i('candleRoot129');if(!rt||!rt.isConnected||!rt.getClientRects().length)return;
  var offer=$i('candleOffer129'),line=$i('candleLine129');
  var acts=rt.querySelector('.candle-actions129');
  if(!offer||!line||!acts)return;
  measuring=true;
  var host=$i('candlePicker131'),tmp=null;
  var sec=$i('candle'),sCls=sec?sec.classList.contains('candle-offer129'):true;
  var sOffer=offer.hidden,sText=line.textContent,sHost=host?host.hidden:null,sMin=rt.style.minHeight;
  var h=0;
  try{
    rt.style.minHeight='0px';
    if(sec&&!sCls)sec.classList.add('candle-offer129');
    offer.hidden=false;
    line.textContent=T('Breathe with the Lamp');
    if(host)host.hidden=false;
    else if(typeof LampBreathing!=='undefined'&&LampBreathing&&typeof LampBreathing.mountPicker==='function'){
      tmp=D.createElement('div');tmp.id='candlePicker131';tmp.setAttribute('aria-hidden','true');
      acts.parentNode.insertBefore(tmp,acts.nextSibling);
      try{LampBreathing.mountPicker(tmp,{selected:'normal',lang:candleLang()})}catch(e){}
    }
    h=rt.getBoundingClientRect().height;
  }catch(e){h=0}
  finally{
    if(tmp&&tmp.parentNode)tmp.parentNode.removeChild(tmp);
    if(host)host.hidden=sHost;
    if(line.textContent!==sText)line.textContent=sText;
    offer.hidden=sOffer;
    if(sec&&!sCls)sec.classList.remove('candle-offer129');
    rt.style.minHeight=sMin;
    measuring=false;
  }
  if(h>0){
    var v='max(70vh, '+Math.ceil(h)+'px)';
    if(rt.style.minHeight!==v)rt.style.minHeight=v;
  }
}
var candleRO=null,candleStage=null,candleMO=null,candleSec=null;
function watchCandle(){
  var sec=$i('candle');if(!sec)return false;
  if(candleSec!==sec){
    if(candleMO)candleMO.disconnect();
    candleSec=sec;
    if(typeof MutationObserver==='function'){
      candleMO=new MutationObserver(function(){attachStage();reserveCandle()});
      candleMO.observe(sec,{childList:true});
    }
  }
  attachStage();reserveCandle();
  return true;
}
function attachStage(){
  var st=$i('candleStage129');
  if(st===candleStage)return;
  if(candleRO&&candleStage)candleRO.unobserve(candleStage);
  candleStage=st;
  if(!st||typeof ResizeObserver!=='function')return;
  if(!candleRO)candleRO=new ResizeObserver(function(){if(!measuring)reserveCandle()});
  candleRO.observe(st);
}
var mainMO=null;
function bootCandle(){
  if(watchCandle())return;
  /* #candle is created lazily by v129 on first render */
  var m=D.querySelector('main');
  if(!m||mainMO||typeof MutationObserver!=='function')return;
  mainMO=new MutationObserver(function(){if(watchCandle()){mainMO.disconnect();mainMO=null}});
  mainMO.observe(m,{childList:true});
}

function boot(){css189b();bootCredit();bootCandle()}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',boot);else boot();
root.addEventListener&&root.addEventListener('load',boot);
root.IL189B={on:1,keepCredit:keepCredit,reserveCandle:reserveCandle};
})(typeof window!=='undefined'?window:globalThis);
