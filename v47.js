// v47: Paint toolbar tidy. Mirror button is the only control for 4/6/8-way symmetry (the menu shows it as "Mirror n" when on), calm "Color drift" label, all Paint labels translated.
paintMirror=function(){const n={4:6,6:8,8:1}[PT.sym];PT.sym=n===undefined?4:n;PT.mirror=true;guides();renderPaintBar()};
{const rp=renderPaint;renderPaint=function(){rp();const bar=document.querySelector('#pstudio .pbar');if(!bar)return;
 const sel=[...bar.querySelectorAll('select')].find(s=>/PT.sym/.test(s.getAttribute('onchange')||''));
 if(sel){[...sel.options].forEach(o=>{if(['4','6','8'].includes(o.value))o.remove()});
  if([4,6,8].includes(PT.sym)){const o=document.createElement('option');o.value=PT.sym;o.textContent=gT('Mirror {n}',{n:gNum(PT.sym)});o.selected=true;sel.insertBefore(o,sel.options[1]||null)}
  sel.addEventListener('change',()=>{if(PT.sym>2)PT.mirror=true;renderPaintBar()})}
 bar.querySelectorAll('[title="Trippy color drift"]').forEach(b=>{b.title='Color drift';b.setAttribute('aria-label','Color drift')});
 bar.querySelectorAll('[title],[aria-label],option').forEach(e=>{for(const a of ['title','aria-label'])if(e.getAttribute(a))e.setAttribute(a,gT(e.getAttribute(a)));if(e.tagName==='OPTION')e.textContent=gT(e.textContent)});
 if(!bar.querySelector('[aria-label]')||1)bar.querySelectorAll('button[title]:not([aria-label])').forEach(b=>b.setAttribute('aria-label',b.title))}}
RENDER.paint=renderPaint;
