// v51 launch fixes (approved scope only): hide unfinished sounds, fix Save everything, explain offline.
// 1) Sound board: keep only buttons whose recordings play correctly (cow, duck, cat, A, B, clap).
(function(){const BAD=['dog','sheep','snake','bee','m','night'];
 SBOARD.forEach(g=>{for(let i=g[1].length-1;i>=0;i--)if(BAD.includes(g[1][i][0]))g[1].splice(i,1)});
 for(let i=SBOARD.length-1;i>=0;i--)if(!SBOARD[i][1].length)SBOARD.splice(i,1)})();
// 2) Babies Echo: the spoken lines used the device voice. Hide the eight Echo activities (they have no sound left); the sound board stays.
{const re=RENDER.echo||renderEcho;RENDER.echo=renderEcho=function(){if(ECUR)ECUR=null;re();
 document.querySelectorAll('#echo .grid').forEach(g=>{if(g.querySelector('[onclick*="ECUR="]'))g.remove()});
 document.querySelectorAll('#echo [onclick*="speak("]').forEach(b=>b.remove())}}
// 3) Letter songs hidden; Mmm, Moon loses its spoken "Say the words" action.
{const rm=RENDER.music||renderMusic;RENDER.music=renderMusic=function(){if(typeof MU!=='undefined'&&MU&&MU.v==='letters')MU={};rm();const el=$('music');if(!el)return;
 el.querySelectorAll('[onclick*="v:\'letters\'"]').forEach(b=>b.remove());
 if(MU&&MU.v==='sing'&&MU.s==='m7'){el.querySelectorAll('[onclick="singPlay(true)"]').forEach(b=>b.remove());el.querySelectorAll('p.soft').forEach(p=>{if(/Say the words|Di las palabras|قل الكلمات/.test(p.textContent))p.remove()})}}}
{const rl=RENDER.lib||renderLib;RENDER.lib=renderLib=function(){rl();document.querySelectorAll('#lib [onclick*="v:\'letters\'"]').forEach(b=>b.remove())}}
// 4) Offline: full offline use needs Save everything. Say so gently when offline and not yet saved.
{const rh=RENDER.hub||renderHub;RENDER.hub=renderHub=function(){rh();const h=$('hub');if(!h||navigator.onLine!==false||RAW.get('lamp_offline_all'))return;
 h.insertAdjacentHTML('afterbegin',`<div class="card soft" style="text-align:center">${gT('Some sounds need internet. For full offline use, a grown-up can tap Save everything in Grown-ups.')}</div>`)}}
