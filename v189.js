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
