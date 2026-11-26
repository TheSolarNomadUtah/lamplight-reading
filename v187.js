/* Lamplight v187 — Music Box song tiles follow the look's card and ink colors.
   v186 hardcoded a cream tile with color:inherit, so High contrast and a
   family's own dark colors made the song names disappear (C9 / LESSON 16).
   Selected gold rim is unchanged. No audio or voice changes.
   Mint Play / Reader chip: white on the mint accent was 4.18:1, so those
   accent fills use black text, same idea as High contrast already did. */
(function(root){
'use strict';
function css(){
  if(document.getElementById('v187css'))return;
  var s=document.createElement('style');s.id='v187css';
  s.textContent=
    '#mb186 button.mb186-song{'+
      'background:var(--card,#fffdf6);'+
      'color:var(--ink,#2f2a24);'+
      'border-color:color-mix(in srgb,var(--ink,#2f2a24) 28%,transparent)'+
    '}'+
    '#mb186 button.mb186-song[aria-pressed="true"],#mb186 button.mb186-song.on{'+
      'box-shadow:inset 0 0 0 3px #E6B454;border-color:#E6B454'+
    '}'+
    'html[data-look-theme="mint"] button.p,'+
    'html[data-look-theme="mint"] .bigbtn.p,'+
    'html[data-look-theme="mint"] .pchip.on{color:#000}';
  document.head.appendChild(s);
}
function boot(){css()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
root.IL187={version:187,css:css};
})(typeof window!=='undefined'?window:globalThis);
