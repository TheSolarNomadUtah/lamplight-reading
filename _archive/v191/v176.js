/* v176 — QA v175 fix: U13 Sound Cards recordings stop when the page is left (iOS pagehide).
   Purr clip re-mastered louder (audio/sc13/purr.*). Fractal grow fixes moved to a later release. */
window.addEventListener('pagehide',function(){if(typeof scStop101==='function')try{scStop101()}catch(e){}});
window.IL176={version:176,notes:'v176: U13 recordings stop on pagehide; purr louder'};
