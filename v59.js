// v59: Cursive tracing (capital and small letters) and Word Kinds, a game for nouns, pronouns and adjectives. All on this device, zero data.
// Cursive font: Playwrite US Trad (SIL Open Font License, fonts/PlaywriteUSTrad-OFL.txt), subset to A-Z, a-z, Ñ/ñ.
document.head.insertAdjacentHTML('beforeend',`<style>@font-face{font-family:LampCursive;src:url(fonts/cursive.woff2) format('woff2');font-display:block}
.wkw{display:inline-block;margin:.25rem;padding:.35rem .7rem;border-radius:14px;border:2px solid var(--acc);background:var(--card);font-size:1.5rem;cursor:pointer}
.wkw.ok{background:#3f9d5a;color:#fff;border-color:#3f9d5a}.wkw.no{opacity:.45}.wkkey span{display:inline-block;margin:.2rem .5rem}</style>`);
// ---------- Cursive tracing ----------
{
function curSetup(L){const cv=$('trc'),x=cv.getContext('2d'),W=420;TR.cv=cv;TR.done=false;
 const m=document.createElement('canvas');m.width=m.height=W;const mx=m.getContext('2d');mx.font='240px LampCursive';mx.textAlign='center';mx.textBaseline='alphabetic';mx.lineWidth=40;mx.lineJoin='round';
 // v62: fit actual ink bounds, not advance width (J/Y/Z descend; W has a long swash).
 const pad=32,bounds=mx.measureText(L),fit=Math.min(1,(W-pad*2)/Math.max(1,bounds.actualBoundingBoxLeft+bounds.actualBoundingBoxRight),(W-pad*2)/Math.max(1,bounds.actualBoundingBoxAscent+bounds.actualBoundingBoxDescent));
 mx.font=(240*fit)+'px LampCursive';const bb=mx.measureText(L),cx=W/2+(bb.actualBoundingBoxLeft-bb.actualBoundingBoxRight)/2;
 const base=Math.max(pad+bb.actualBoundingBoxAscent,Math.min(TR.low&&/[fgjpqyz]/.test(L)?250:300,W-pad-bb.actualBoundingBoxDescent));TR.glyphFit={cx,base,scale:fit};mx.strokeStyle='#000';mx.fillStyle='#000';mx.fillText(L,cx,base);
 const d=mx.getImageData(0,0,W,W).data;const pts=[];for(let y=6;y<W;y+=12)for(let X=6;X<W;X+=12)if(d[(y*W+X)*4+3]>128)pts.push([X,y]);TR.mask=pts;TR.hit=new Uint8Array(pts.length);TR.ink=0;TR.out=0;
 x.clearRect(0,0,W,W);x.font=mx.font;x.textAlign='center';x.setLineDash([4,10]);x.lineWidth=3;x.strokeStyle='#9a8f7d';x.strokeText(L,cx,base);x.setLineDash([]);x.globalAlpha=.08;x.fillStyle='#5b7a6a';x.fillText(L,cx,base);x.globalAlpha=1;
 const st=pts.reduce((a,p)=>p[1]<a[1]-6||(Math.abs(p[1]-a[1])<=6&&p[0]<a[0])?p:a,[W,W]);const round=/[cCoOsSeagdqGQ]/.test(L);
 x.fillStyle='#3f9d5a';x.beginPath();x.arc(st[0],st[1],13,0,7);x.fill();x.fillStyle='#fff';x.font='bold 16px sans-serif';x.fillText('1',st[0],st[1]+6);
 x.strokeStyle='#3f9d5a';x.lineWidth=4;x.beginPath();if(round){x.moveTo(st[0]-20,st[1]-22);x.lineTo(st[0]-55,st[1]-22);x.moveTo(st[0]-55,st[1]-22);x.lineTo(st[0]-45,st[1]-30);x.moveTo(st[0]-55,st[1]-22);x.lineTo(st[0]-45,st[1]-14)}else{x.moveTo(st[0]-28,st[1]);x.lineTo(st[0]-28,st[1]+40);x.lineTo(st[0]-36,st[1]+30);x.moveTo(st[0]-28,st[1]+40);x.lineTo(st[0]-20,st[1]+30)}x.stroke();
 const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*W/r.height]};let last=null;
 cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);last=pos(e);curDot(last)};cv.onpointermove=e=>{if(!last)return;const p=pos(e);x.strokeStyle='#e0a030';x.lineWidth=22;x.lineCap='round';x.beginPath();x.moveTo(...last);x.lineTo(...p);x.stroke();
  const n=Math.ceil(Math.hypot(p[0]-last[0],p[1]-last[1])/6);for(let i=1;i<=n;i++)curDot([last[0]+(p[0]-last[0])*i/n,last[1]+(p[1]-last[1])*i/n]);last=p};
 cv.onpointerup=cv.onpointercancel=()=>{last=null;curCheck(L)}}
function curDot(p){let near=false;TR.mask.forEach((m,i)=>{if((m[0]-p[0])**2+(m[1]-p[1])**2<26*26){TR.hit[i]=1;near=true}});TR.ink++;if(!near)TR.out++}
function curCheck(L){if(TR.done)return;const cov=TR.hit.reduce((a,b)=>a+b,0)/TR.mask.length,stray=TR.out/Math.max(TR.ink,1);
 if(cov>=0.6&&stray<0.45){TR.done=true;const g=safeJSON(LS.get('lamp_trace'),{});g[L]=(g[L]||0)+1;LS.set('lamp_trace',JSON.stringify(g));markDay('trace');$('trfb').textContent='⭐ Beautiful '+L+'!';speak('Yes! '+L+'!');setTimeout(()=>{if($('trfb'))renderTrace()},1800)}
 else $('trfb').textContent=cov>0.25?'Keep going! Cover the rest of the dots.':'Start at the green dot and follow the dots.';return cov}
 const ts=traceSetup;traceSetup=function(L){return TR.cur?curSetup(L):ts.apply(this,arguments)};
 const rt=renderTrace;renderTrace=function(){if(!CONTENT.includes(LANG)){TR.cur=false;$('trace').innerHTML='';return}if(TR.cur&&!document.fonts.check('240px LampCursive')){document.fonts.load('240px LampCursive').then(()=>{if(!$('trace').classList.contains('hidden'))renderTrace()});}
  rt.apply(this,arguments);const bs=[...$('trace').querySelectorAll('button')].filter(b=>/TR\.low=/.test(b.getAttribute('onclick')||''));
  bs.forEach(b=>{b.setAttribute('onclick',b.getAttribute('onclick').replace('TR.low=','TR.cur=false;TR.low='));if(TR.cur)b.classList.remove('p')});
  const last=bs[bs.length-1];if(last)last.insertAdjacentHTML('afterend',` <button class="${TR.cur&&!TR.low?'p':''}" onclick="TR.cur=true;TR.low=false;renderTrace()" style="font-family:LampCursive">${gT('Cursive ABC')}</button><button class="${TR.cur&&TR.low?'p':''}" onclick="TR.cur=true;TR.low=true;renderTrace()" style="font-family:LampCursive">${gT('Cursive abc')}</button>`);
  if(TR.cur)$('trace').querySelectorAll('.trrow .pchip').forEach(c=>c.style.fontFamily='LampCursive')};RENDER.trace=renderTrace}
// ---------- Word Kinds ----------
// [word:n] noun, [word:p] pronoun, [word:a] adjective. Plain words are other kinds.
const WK={
 en:["The [big:a] [dog:n] ran to [me:p].","[She:p] has a [red:a] [ball:n].","[We:p] saw a [tiny:a] [bird:n].","The [cat:n] is [soft:a].","[He:p] ate a [sweet:a] [apple:n].","[They:p] like the [warm:a] [sun:n].","My [mom:n] gave [it:p] to [you:p].","A [happy:a] [frog:n] jumped in the [pond:n].","[I:p] read a [funny:a] [book:n].","The [tall:a] [tree:n] has [green:a] [leaves:n].","[You:p] found a [shiny:a] [rock:n].","The [moon:n] is [bright:a] tonight.","[It:p] is a [cold:a] [day:n].","Our [teacher:n] told [us:p] a [long:a] [story:n].","The [little:a] [fish:n] swims fast."],
 es:["El [perro:n] [grande:a] corre hacia [mí:p].","[Ella:p] tiene una [pelota:n] [roja:a].","[Nosotros:p] vimos un [pájaro:n] [pequeño:a].","El [gato:n] es [suave:a].","[Él:p] comió una [manzana:n] [dulce:a].","[Ellos:p] quieren el [sol:n] [caliente:a].","[Yo:p] leo un [libro:n] [divertido:a].","La [luna:n] está [brillante:a].","[Tú:p] encontraste una [piedra:n] [bonita:a].","El [árbol:n] [alto:a] tiene [hojas:n] [verdes:a].","Mi [mamá:n] [me:p] dio una [flor:n].","La [rana:n] [feliz:a] salta en el [lago:n]."],
 ar:["[الكلبُ:n] [الكبيرُ:a] يركضُ [نحوي]","[هي:p] عندها [كرةٌ:n] [حمراءُ:a]","[نحن:p] رأينا [عصفورًا:n] [صغيرًا:a]","[القطُّ:n] [ناعمٌ:a]","[هو:p] أكلَ [تفاحةً:n] [حلوةً:a]","[أنا:p] أقرأُ [كتابًا:n] [جميلًا:a]","[القمرُ:n] [مضيءٌ:a] الليلةَ","[أنتَ:p] وجدتَ [حجرًا:n] [لامعًا:a]","[الشجرةُ:n] [الطويلةُ:a] لها [أوراقٌ:n] [خضراءُ:a]","[هم:p] يحبّون [الشمسَ:n] [الدافئةَ:a]","[الضفدعُ:n] [السعيدُ:a] قفزَ في [البركةِ:n]"]};
const WKN={n:['Noun','a person, place, animal or thing','🟦'],p:['Pronoun','a word that stands for a noun, like she or they','🟪'],a:['Adjective','a word that tells what something is like','🟧']};
let WKS={i:0,want:'n',got:0,tries:0,toks:null};
function wkParse(s){return s.split(/(\[[^\]]+\])/).filter(Boolean).flatMap(t=>{const m=t.match(/^\[([^:\]]+)(?::([npa]))?\]$/);if(m)return[{w:m[1],k:m[2]||''}];return t.split(/(\s+)/).filter(x=>x).map(x=>({w:x,k:null}))})}
function wkNew(){const L=WK[LANG]||WK.en;WKS.i=Math.floor(Math.random()*L.length);WKS.toks=wkParse(L[WKS.i]);const ks=[...new Set(WKS.toks.filter(t=>t.k).map(t=>t.k))];WKS.want=ks[Math.floor(Math.random()*ks.length)];WKS.found=0;WKS.miss=0}
function wkRender(){if(!WKS.toks)wkNew();const k=WKN[WKS.want],need=WKS.toks.filter(t=>t.k===WKS.want).length;
 $('games').innerHTML=gCard('🧩 '+gT('Word Kinds'),`<p class="wkkey">${Object.entries(WKN).map(([c,v])=>`<span>${v[2]} <b>${gT(v[0])}</b>: ${gT(v[1])}</span>`).join('<br>')}</p>
 <h3>${k[2]} ${gT('Tap every {kind}',{kind:gT(k[0]).toLowerCase()})} (${gNum(WKS.found)}/${gNum(need)})</h3>
 <p dir="auto" style="line-height:2.4">${WKS.toks.map((t,i)=>t.k===null?(/\s/.test(t.w)?' ':`<span style="font-size:1.5rem">${esc(t.w)}</span>`):`<button class="wkw${t.done?' ok':''}${t.bad?' no':''}" onclick="wkTap(${i})">${esc(t.w)}</button>`).join('')}</p>
 <p id="wkfb" style="font-size:1.3rem;min-height:1.5em">${WKS.msg||''}</p><p class="soft">${gT('Stars: {n} ⭐',{n:gNum(WKS.got)})}</p>
 <p><button class="bigbtn p" onclick="wkNew();WKS.msg='';wkRender()">${gT('Next')} ▶</button> <button class="bigbtn" onclick="GM.v=null;RENDER.games()">⬅ ${gT('Games')}</button></p>`)}
function wkTap(i){const t=WKS.toks[i];if(t.done)return;if(t.k===WKS.want){t.done=1;WKS.found++;const need=WKS.toks.filter(x=>x.k===WKS.want).length;
  if(WKS.found>=need){WKS.got++;WKS.msg='⭐ '+gT('You found them all!');try{const g=gStars();g.wk=(g.wk||0)+1;LS.set('lamp_games',JSON.stringify(g))}catch(e){}try{markDay('words')}catch(e){}try{const c=ac();if(c)note(76,c.currentTime,.6,'bells',.15)}catch(e){}}
  else WKS.msg=gT('Yes!')}
 else{t.bad=1;const kk=t.k?WKN[t.k][0]:'';WKS.msg=kk?gT('That one is a {kind}.',{kind:gT(kk).toLowerCase()}):gT('Not that one. Try another!')}wkRender()}
if(WK[LANG])GHUB.splice(4,0,['wk','🧩','Word Kinds','Nouns, pronouns, adjectives',6,"GM.v='wk';WKS.toks=null;WKS.msg='';RENDER.games()"]);
{const rg=RENDER.games;RENDER.games=function(){if(GM.v==='wk')return wkRender();return rg.apply(this,arguments)}}
