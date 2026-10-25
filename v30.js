// v30: one language picker in the page at a time (no duplicate id="langsel").
{const lp=langPicker;langPicker=function(){document.querySelectorAll('#langcard').forEach(e=>e.remove());return lp()}}
{const vis=SECTIONS.find(s=>!$(s).classList.contains('hidden'));document.querySelectorAll('#langcard').forEach(e=>{if(!vis||!e.closest('#'+vis))e.remove()});const c=document.querySelectorAll('#langcard');for(let i=1;i<c.length;i++)c[i].remove()}
