// v94: Hearth Amber and Ember Coral are both open from stage 1; the other
// glows unlock one per stage (Teal 2, Lilac 3, Moss 4, Starfire 5) and stage 6
// gathers all six glows into the ring. Locked glows are not shown at all.
// No color is ever taken away: every stage shows at least as many glows as
// before, an unpicked lamp stays Hearth Amber, and unlocks never auto-switch.
// Comb-jelly bands use the pastel rainbow of their card icon.
// The story-reader current-word caret (a gold play triangle) is removed; the
// gold highlight stays. Look Up "Hear it" is hidden: speak() has no clip for
// those sentences and no device-voice fallback.
(function(){
 const ST={amber:1,coral:1,teal:2,lilac:3,moss:4,starfire:5};
 FLAME81.forEach(f=>{if(ST[f.id])f.stage=ST[f.id]});
})();
function lampFlameOpen94(max){return FLAME81.filter(f=>f.stage<=max)}
function lampPickerHTML81(pid){
 const s=lampLoad73(pid),max=lampFlameMax81(s),rec=lampFlameLoad81(pid),ring=max>=6,reduce=typeof lampReduced73==='function'&&lampReduced73();
 const intro=`<p class="soft">${esc(gT('People learned to keep fire long ago. It kept families warm and lit their stories.'))}</p><p class="soft">${esc(gT("Colors are made by light. Each element's fire plays its own chord of light."))}</p>`;
 const open=lampFlameOpen94(max),n=open.length;
 const buttons=open.map((f,i)=>{
  const on=f.id===rec.id,cols=n<=3?n:n===4?2:3;
  const sx=((i%cols)-(cols-1)/2)*86,sy=(Math.floor(i/cols)-0.5)*100;
  return `<button type="button" class="lamp81-swatch${on?' on':''}" data-flame-id="${f.id}" style="--a:${i*(360/n)}deg;--sx:${sx}px;--sy:${sy}px;${lampCssVars81(f)}" aria-pressed="${on?'true':'false'}" aria-label="${esc(gT(f.name))}" role="listitem"><span class="lamp81-bloom" data-shape="${f.shape}"></span><span class="lamp81-name">${esc(gT(f.name))}</span></button>`
 }).join('');
 const fact=lampFlameById81(rec.id).fact;
 return `<div class="lamp81-picker${ring?' ring':''}${ring&&!reduce?' curl':''}" data-flame81-picker data-pid="${esc(pid||'')}" data-sel="${rec.id}" data-count94="${n}"><h3>${esc(gT('Lamp glow'))}</h3>${intro}<div class="lamp81-tray" role="list" data-count94="${n}"><span class="lamp81-center" aria-hidden="true"></span>${buttons}</div><p class="lamp81-fact" data-flame81-fact>${esc(gT(fact))}</p></div>`
}
// The stage-up dialog names only glows that really just opened.
{const prev=lampPresent73;lampPresent73=function(item){
 const r=prev.apply(this,arguments);
 const d=document.querySelector('dialog.lamp73-dialog');if(!d||!item)return r;
 const to=Math.max(1,Math.min(6,item.stage||1)),from=Math.max(0,Math.min(to-1,item.from||to-1));
 const fresh=to<=1?[]:FLAME81.filter(f=>f.stage>Math.max(1,from)&&f.stage<=to);
 const line=d.querySelector('.lamp81-unlock');
 const pal=fresh.length?fresh[fresh.length-1]:lampFlamePal81(curPid());
 lampSetVars81(d,pal);d.querySelectorAll('.lamp76-spark').forEach(el=>el.dataset.shape=pal.shape);
 let txt='';
 if(fresh.length)txt=gT('A new glow is ready: {name}.',{name:fresh.map(f=>gT(f.name)).join(', ')});
 else if(to>=6&&from<6)txt=gT('All six glows now make a ring around your Lamp.');
 if(line){if(txt)line.textContent=txt;else line.remove()}
 else if(txt){const l=d.querySelector('#lamp73-line');if(l)l.insertAdjacentHTML('afterend',`<p class="lamp81-unlock">${esc(txt)}</p>`)}
 return r
}}
if(typeof RENDER!=='undefined'&&RENDER.look&&$('look')&&!$('look').classList.contains('hidden'))RENDER.look();
document.head.insertAdjacentHTML('beforeend',`<style id="v94css">
.lamp81-picker:not(.ring) .lamp81-tray{display:grid!important;gap:8px;margin:0 auto;justify-content:center;justify-items:center;grid-template-columns:repeat(var(--c94,3),minmax(0,110px));max-width:none}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="2"]{--c94:2}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="3"]{--c94:3}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="4"]{--c94:4}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="5"],.lamp81-picker:not(.ring) .lamp81-tray[data-count94="6"]{grid-template-columns:repeat(6,minmax(0,1fr));max-width:360px}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="5"] .lamp81-swatch,.lamp81-picker:not(.ring) .lamp81-tray[data-count94="6"] .lamp81-swatch{grid-column:span 2}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="5"] .lamp81-swatch:nth-of-type(4){grid-column:2 / span 2}
.lamp81-picker:not(.ring) .lamp81-tray[data-count94="5"] .lamp81-swatch:nth-of-type(5){grid-column:4 / span 2}
.lamp81-picker:not(.ring) .lamp81-swatch{width:100%;max-width:110px;min-width:0}
.lamp81-picker:not(.ring) .lamp81-tray>.lamp81-center{display:none}
@media(max-width:640px){.lamp81-picker:not(.ring) .lamp81-tray[data-count94="4"]{--c94:2}}
html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a,html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{
 background:repeating-linear-gradient(180deg,#ffa6c9 0 3px,transparent 3px 6px,#9fd8ff 6px 9px,transparent 9px 12px,#c4ffa0 12px 15px,transparent 15px 18px,#ffe49c 18px 21px,transparent 21px 24px,#ffa3dc 24px 27px,transparent 27px 30px,#a6f2f2 30px 33px,transparent 33px 36px);
 background-size:100% 36px;mix-blend-mode:normal;filter:blur(.45px) brightness(1.06);opacity:.8}
html .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{opacity:.28;filter:blur(1px) brightness(1.1);animation-duration:11s;animation-direction:reverse}
html[data-look-theme="dark"] .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a,.today64.lamp76-night .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-a{mix-blend-mode:screen;opacity:.92;filter:blur(.45px) brightness(1.1)}
html[data-look-theme="dark"] .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b,.today64.lamp76-night .lamp73-shell .fx89-layer.fx89-jelly .fx89-jelly-b{mix-blend-mode:screen;opacity:.4}
@keyframes fx92-comb{from{background-position:0 0}to{background-position:0 36px}}
/* The current-word marker was a CSS play triangle on .w.cur (Read Together).
   Tapping it only marks a tricky word; it never plays audio. Keep the gold
   highlight and focus ring, drop the triangle. Daily Solo words are not
   tappable, so they should not look like they are. */
.w.cur::before,#session .w.cur.miss::before{content:none!important;border:0!important;margin:0!important;width:0!important;height:0!important;display:none!important}
#solo.daily64 .w{cursor:text}
/* Look Up "Hear it" calls speak() on a sentence. With a recorded voice (the
   only options), v52 stays silent when there is no matching clip, and there
   is none for these lines. */
#lookup [data-lu-speak],#lookup [data-lu-speak-line]{display:none!important}
</style>`);
