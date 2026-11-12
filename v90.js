// v90: the Lamp-glow color ring must stay an even ring at rest and
// while it settles — the old curl interpolated from a 3×2 grid onto
// ring angles, so swatches crossed and piled mid-animation. The
// effect-fact line gets the same Home-button start-edge clearance as
// the Look Up cards. Comb-jelly bands are made clearly visible, still
// soft, especially on the Night hero.
function boot90(){
 if(boot90._on)return;boot90._on=1;
 if(typeof show==='function'&&!show._v90&&!show._v97){
  const prev=show;
  show=function(id){
   const r=prev.apply(this,arguments);
   document.body.classList.toggle('onlook',id==='look');
   return r;
  };
  show._v90=1;
 }
 const look=$('look');
 if(look&&!look.classList.contains('hidden'))document.body.classList.add('onlook');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot90);
else boot90();
setTimeout(boot90,0);

if(document.head&&!document.getElementById('v90css'))document.head.insertAdjacentHTML('beforeend',`<style id="v90css">
@keyframes lamp81-curl{
 from{transform:translate(-50%,-50%) translate(calc(cos(var(--a)) * var(--rr) * .78),calc(sin(var(--a)) * var(--rr) * .78))}
 to{transform:translate(-50%,-50%) translate(calc(cos(var(--a)) * var(--rr)),calc(sin(var(--a)) * var(--rr)))}
}
@media (max-width:640px){
 body.v20float.onlook #look .fx89-fact,
 body.bedtime.onlook #look .fx89-fact{margin-inline-start:60px}
}
.fx89-jelly-a,.fx89-jelly-b{
 opacity:.88;
 background:repeating-linear-gradient(180deg,
  color-mix(in oklab,var(--f81-tip,#fff) 35%,#f6a 45%) 0 2.5px,
  color-mix(in oklab,var(--f81-core,#efba64) 28%,#6bf 42%) 4px 6.5px,
  color-mix(in oklab,var(--f81-mid,#dca64b) 24%,#9e6 42%) 8px 10.5px,
  color-mix(in oklab,var(--f81-halo,#dbb06b) 22%,#fd6 45%) 12px 14.5px,
  transparent 17px);
 background-size:100% 28px;
 mix-blend-mode:soft-light;
}
.fx89-jelly-b{opacity:.6;mix-blend-mode:color;filter:hue-rotate(28deg) saturate(1.15)}
.today64.lamp76-night .fx89-jelly-a,html[data-look-theme="dark"] .fx89-jelly-a{
 mix-blend-mode:plus-lighter;opacity:.8;filter:saturate(1.2)
}
.today64.lamp76-night .fx89-jelly-b,html[data-look-theme="dark"] .fx89-jelly-b{
 mix-blend-mode:screen;opacity:.55;filter:hue-rotate(28deg) saturate(1.25)
}
@media(prefers-reduced-motion:reduce){
 .fx89-jelly-a,.fx89-jelly-b{animation:none!important;opacity:.75;background-position:0 10px}
}
</style>`);
