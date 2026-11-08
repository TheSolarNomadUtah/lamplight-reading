// v58: About page no longer mentions removed features (Hum & match microphone note).
{const OLD=/Hum &(amp;)? match|Tararea|همهم/;const clean=()=>{const a=$('about');if(a)a.querySelectorAll('p.soft').forEach(p=>{if(OLD.test(p.textContent))p.remove()})};
 const sh=show;show=function(id){const r=sh.apply(this,arguments);if(id==='about')clean();return r};clean()}
