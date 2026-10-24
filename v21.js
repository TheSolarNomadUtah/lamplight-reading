// v21: switch language without an English flash, paint toolbar wraps on phones, readable instrument menus.
setLang=function(c,scope){const go=()=>{if(scope==='kid')LS.set('lamp_lang',c);else{RAW.set('lamp_lang_device',c);LS.del('lamp_lang')}location.reload()};
 if(c==='en')return go();fetch('lang/'+c+'.json').then(r=>r.json()).then(d=>{try{RAW.set('lamp_dict_'+c,JSON.stringify(d))}catch(e){}}).catch(()=>{}).then(go)};
document.head.insertAdjacentHTML('beforeend',`<style>
@media (max-width:640px){#paint .pbar{flex-wrap:wrap!important;overflow-x:visible!important;row-gap:6px}#fhome{top:auto!important;bottom:56px}}
.sqcard select{min-height:2.3em;padding:.25em .5em;line-height:1.4;font-size:16px}.sqcard option,.sqcard optgroup{color:#1b1f38;background:#fff}
</style>`);
// Translate "descriptor: Title" in the Start-at-level options.
if(typeof LANG!=='undefined'&&LANG!=='en'){const t0=trText;trText=function(n){t0(n);const v=n.nodeValue;if(!v||!/: /.test(v)||!n.parentElement||n.parentElement.tagName!=='OPTION')return;
 const o=v.split(' · ').map(seg=>{const m=seg.match(/^(.*?): (.+)$/);if(!m)return seg;return (DICT[m[1].trim()]||m[1])+': '+(DICT[m[2].trim()]||m[2])}).join(' · ');if(o!==v)n.nodeValue=o}}

// The first screen is drawn before the language swaps in stories; redraw it now, then reveal (only if the dictionary is ready).
if(typeof LANG!=='undefined'&&LANG!=='en'){try{const vis=SECTIONS.find(x=>$(x)&&!$(x).classList.contains('hidden'))||'hub';show(vis)}catch(e){}if(Object.keys(DICT).length)document.documentElement.classList.remove('i18nwait')}
