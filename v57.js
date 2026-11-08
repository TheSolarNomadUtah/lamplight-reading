// v57: Ignacio: hide "Say the words" on every song (no full-lyric clips exist). Play song stays.
document.head.insertAdjacentHTML('beforeend',`<style>[onclick="singPlay(true)"]{display:none!important}</style>`);
{const rm=RENDER.music||renderMusic;RENDER.music=renderMusic=function(){rm.apply(this,arguments);const el=$('music');if(!el||!MU||MU.v!=='sing')return;
 el.querySelectorAll('[onclick="singPlay(true)"]').forEach(b=>b.remove());el.querySelectorAll('p.soft').forEach(p=>{if(/Say the words|Di las palabras|قل الكلمات/.test(p.textContent))p.remove()})}}
