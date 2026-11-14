/* v140: Story picture styles for Night, Night (a5).
   Kids pick cave, paper, woodblock, or chalk, then a colorway.
   Cave + classic (ochre stone) is the default. Device-only preference.
   Does not wrap show(). */
(function(){
  const STYLES=['cave','paper','woodblock','chalk'];
  const STYLE_NAME={cave:'Cave art',paper:'Paper cut-out',woodblock:'Woodblock',chalk:'Chalk pastel'};
  const ALTS={
    cave:'A cave-wall painting of Night, Night: a sun, a tree, a sitting cat, a child waving to the moon, and a clay lantern.',
    paper:'A paper cut-out picture of Night, Night: a dusk-blue sky, sage hills, a sun, a tree, a sitting cat, a child waving to the moon, and a clay lantern.',
    woodblock:'A woodblock print of Night, Night: a carved sun, a pine tree, a sitting cat, a child waving to the moon, and a clay lantern.',
    chalk:'A chalk pastel picture of Night, Night: a dusk sky, a sun, a tree, a sitting cat, a child waving to the moon, and a glowing clay lantern.'
  };
  const SLICES={cave:['sun','pigment','wall'],paper:['sky','sun','hill-near'],woodblock:['paper','ink','accent'],chalk:['sky-bot','sun','tree']};
  const KEY_STYLE='ll-story-style';
  const KEY_PALS='ll-story-palettes';
  const BASE='story-styles/';
  const cache={pals:null,scene:{},swatch:{}};
  let pending=null;

  function t(s,o){return typeof gT==='function'?gT(s,o):s}
  function lang(){return typeof LANG==='string'?LANG:'en'}
  function storeGet(k){try{return (typeof LS!=='undefined'&&LS.get)?LS.get(k):localStorage.getItem(k)}catch(e){return null}}
  function storeSet(k,v){try{if(typeof LS!=='undefined'&&LS.set)LS.set(k,v);else localStorage.setItem(k,v)}catch(e){}}

  function hasRecipe(id){return id==='a5'}

  function loadStyle(){
    const v=storeGet(KEY_STYLE);
    return STYLES.includes(v)?v:'cave';
  }
  function loadPals(){
    let o={};
    try{o=JSON.parse(storeGet(KEY_PALS)||'{}')||{}}catch(e){o={}}
    if(typeof o!=='object'||!o)o={};
    return o;
  }
  function palettesOf(style){
    const st=cache.pals&&cache.pals.styles&&cache.pals.styles[style];
    return st&&st.palettes?st.palettes:{classic:{en:'Classic',es:'Clásico'}};
  }
  function loadPal(style){
    const rec=loadPals();
    const key=rec[style];
    const pals=palettesOf(style);
    return (key&&pals[key])?key:'classic';
  }
  function saveStyle(style){
    if(!STYLES.includes(style))style='cave';
    storeSet(KEY_STYLE,style);
  }
  function savePal(style, pal){
    const rec=loadPals();
    const pals=palettesOf(style);
    rec[style]=(pal&&pals[pal])?pal:'classic';
    storeSet(KEY_PALS,JSON.stringify(rec));
  }
  function palName(style, pal){
    const row=palettesOf(style)[pal]||{};
    const en=row.en||pal;
    // Sprite "Ember" is already "Brasa"; this colorway is "Ascua".
    const key=(style==='chalk'&&pal==='ember')?'Chalk ember':en;
    if(typeof DICT==='object'&&DICT&&DICT[key])return typeof gT==='function'?gT(key):DICT[key];
    if(lang()==='es'&&row.es)return row.es;
    return en;
  }
  function palColors(style, pal){
    const st=cache.pals.styles[style];
    const classic=st.tokens||{};
    const extra=(st.palettes[pal]&&st.palettes[pal].colors)||{};
    return Object.assign({},classic,extra);
  }

  function prefixIds(svg, pre){
    return String(svg)
      .replace(/\bid="([^"]+)"/g,(_,id)=>'id="'+pre+id+'"')
      .replace(/url\(#([^)]+)\)/g,(_,id)=>'url(#'+pre+id+')')
      .replace(/\bhref="#([^"]+)"/g,(_,id)=>'href="#'+pre+id+'"')
      .replace(/\bxlink:href="#([^"]+)"/g,(_,id)=>'xlink:href="#'+pre+id+'"');
  }
  function remap(svg, style, pal){
    const st=cache.pals.styles[style];
    if(!st)return svg;
    const colors=palColors(style, pal);
    const map={};
    Object.keys(st.tokens||{}).forEach(tok=>{
      const old=String(st.tokens[tok]||'').toUpperCase();
      if(old)map[old]=colors[tok]||st.tokens[tok];
    });
    return svg.replace(/#([0-9A-Fa-f]{6})/g,m=>map[m.toUpperCase()]||m);
  }
  function sliceCols(style, pal){
    const colors=palColors(style, pal);
    const keys=SLICES[style]||Object.keys(colors);
    return keys.map(k=>colors[k]).filter(Boolean).slice(0,3);
  }
  function sliceSvg(cols){
    if(!cols.length)cols=['#C4853A'];
    if(cols.length===1)return `<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="${cols[0]}"/></svg>`;
    const n=cols.length, step=360/n;
    const wedges=cols.map((c,i)=>{
      const a0=i*step-90, a1=(i+1)*step-90;
      const r0=a0*Math.PI/180, r1=a1*Math.PI/180;
      const x0=20+20*Math.cos(r0), y0=20+20*Math.sin(r0);
      const x1=20+20*Math.cos(r1), y1=20+20*Math.sin(r1);
      const large=step>180?1:0;
      return `<path d="M20 20L${x0} ${y0}A20 20 0 ${large} 1 ${x1} ${y1}Z" fill="${c}"/>`;
    }).join('');
    return `<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="${cols[0]}"/>${wedges}</svg>`;
  }

  function loadText(path){
    return fetch(path,{cache:'force-cache',credentials:'same-origin'}).then(r=>{
      if(!r.ok)throw new Error('missing '+path);
      return r.text();
    });
  }
  function ensure(){
    if(cache.pals&&STYLES.every(s=>cache.scene[s]&&cache.swatch[s]))return Promise.resolve(cache);
    if(pending)return pending;
    pending=Promise.all([
      cache.pals?Promise.resolve(null):loadText(BASE+'palettes.json').then(t=>cache.pals=JSON.parse(t)),
      ...STYLES.map(s=>cache.scene[s]?Promise.resolve(null):loadText(BASE+'night-night-'+s+'.svg').then(t=>cache.scene[s]=t)),
      ...STYLES.map(s=>cache.swatch[s]?Promise.resolve(null):loadText(BASE+'swatch-'+s+'.svg').then(t=>cache.swatch[s]=t))
    ]).then(()=>{pending=null;return cache}).catch(e=>{pending=null;throw e});
    return pending;
  }
  ensure().catch(()=>{});

  function innerSvg(raw){
    return String(raw).replace(/^\s*<svg[^>]*>/i,'').replace(/<\/svg>\s*$/i,'');
  }
  function sceneHtml(style, pal){
    let svg=remap(cache.scene[style], style, pal);
    svg=prefixIds(svg, 's140-'+style+'-');
    svg=svg.replace(/\saria-label="[^"]*"/,'');
    // keep role=img on the wrapper, not a nested label
    return svg;
  }
  function swatchHtml(style){
    let svg=prefixIds(cache.swatch[style], 'sw140-'+style+'-');
    svg=svg.replace(/\saria-label="[^"]*"/,'').replace(/\srole="img"/,'');
    return svg;
  }

  function paintBox(box){
    if(!box||!cache.pals)return;
    const style=loadStyle();
    const pal=loadPal(style);
    const alt=t(ALTS[style]||ALTS.cave);
    const scene=sceneHtml(style, pal);
    const styles=STYLES.map(s=>{
      const on=s===style;
      return `<div class="storyPic140-sw"><button type="button" class="storyPic140-style" data-style140="${s}" aria-pressed="${on?'true':'false'}" aria-label="${t(STYLE_NAME[s])}">${swatchHtml(s)}</button><span class="storyPic140-cap">${t(STYLE_NAME[s])}</span></div>`;
    }).join('');
    const pals=palettesOf(style);
    const palKeys=Object.keys(pals);
    const colors=palKeys.map(k=>{
      const on=k===pal;
      return `<div class="storyPic140-sw"><button type="button" class="storyPic140-pal" data-pal140="${k}" aria-pressed="${on?'true':'false'}" aria-label="${palName(style,k)}">${sliceSvg(sliceCols(style,k))}</button><span class="storyPic140-cap">${palName(style,k)}</span></div>`;
    }).join('');
    box.innerHTML=`<div class="storyPic140-art" role="img" aria-label="${alt.replace(/"/g,'&quot;')}">${scene}</div>
<div class="storyPic140-pick noprint" role="group" aria-label="${t('Pick a picture style')}">
<p class="storyPic140-title">${t('Pick a picture style')}</p>
<div class="storyPic140-styles">${styles}</div>
<div class="storyPic140-colors">${colors}</div>
</div>`;
    box.dataset.currentStyle140=style;
    box.dataset.currentPal140=pal;
    box.querySelectorAll('[data-style140]').forEach(b=>{
      b.addEventListener('click',()=>pickStyle(b.getAttribute('data-style140')));
    });
    box.querySelectorAll('[data-pal140]').forEach(b=>{
      b.addEventListener('click',()=>pickPal(b.getAttribute('data-pal140')));
    });
  }

  function findAnchor(root){
    return root&&root.querySelector('#st, #sst, .ptext, p.story');
  }
  function sectionRoot(hint){
    if(hint&&findAnchor(hint))return hint;
    const vis=['solo','session','print'].map(s=>$(s)).filter(el=>el&&!el.classList.contains('hidden')&&findAnchor(el));
    if(vis[0])return vis[0];
    return ['solo','session','print'].map(s=>$(s)).find(el=>el&&findAnchor(el))||null;
  }
  function mount(id, hint){
    if(!hasRecipe(id))return;
    const root=sectionRoot(hint);
    if(!root)return;
    const anchor=findAnchor(root);
    if(!anchor)return;
    let box=root.querySelector('.storyPic140');
    if(!box){
      box=document.createElement('figure');
      box.className='storyPic140';
      anchor.parentNode.insertBefore(box, anchor);
    }
    ensure().then(()=>paintBox(box)).catch(()=>{});
  }
  function refresh(){
    document.querySelectorAll('.storyPic140').forEach(box=>paintBox(box));
  }
  function pickStyle(style){
    if(!STYLES.includes(style))style='cave';
    saveStyle(style);
    if(!loadPals()[style])savePal(style, 'classic');
    refresh();
  }
  function pickPal(pal){
    const style=loadStyle();
    savePal(style, pal);
    refresh();
  }

  if(!document.getElementById('v140css')){
    const css=document.createElement('style');
    css.id='v140css';
    css.textContent=`
.storyPic140{margin:.4rem 0 1rem;padding:0}
.storyPic140-art svg{width:100%;height:auto;display:block;max-width:28rem;margin:0 auto}
.storyPic140-pick{margin:.7rem 0 0;padding:.7rem .6rem .8rem;border-radius:14px;background:#F6EFE0;color:#2F2A24}
body.bedtime .storyPic140-pick,html[data-look-theme="dark"] .storyPic140-pick{background:#1C1624;color:#E8E4DA}
.storyPic140-title{margin:0 0 .5rem;text-align:center;font-size:.95rem}
.storyPic140-styles,.storyPic140-colors{display:flex;flex-wrap:wrap;gap:.55rem;justify-content:center;align-items:flex-start}
.storyPic140-colors{margin-top:.55rem}
.storyPic140-sw{display:flex;flex-direction:column;align-items:center;gap:.2rem;max-width:4.6rem}
.storyPic140-style{width:64px;height:64px;min-width:64px;min-height:64px;padding:0;border-radius:50%;overflow:hidden;border:3px solid transparent;background:transparent;line-height:0}
.storyPic140-style svg{width:100%;height:100%;display:block}
.storyPic140-pal{width:44px;height:44px;min-width:44px;min-height:44px;padding:0;border-radius:50%;overflow:hidden;border:3px solid transparent;background:transparent;line-height:0}
.storyPic140-pal svg{width:100%;height:100%;display:block}
.storyPic140-style[aria-pressed="true"],.storyPic140-pal[aria-pressed="true"]{border-color:#E6B454;box-shadow:0 0 0 2px #E6B454}
.storyPic140-cap{font-size:.72rem;line-height:1.2;text-align:center}
@media (prefers-reduced-motion:reduce){.storyPic140,.storyPic140 *{transition:none!important;animation:none!important}}
@media print{.storyPic140-pick{display:none}}
`;
    document.head.appendChild(css);
  }

  function wrap(name, rootOf){
    const fn=typeof window[name]==='function'?window[name]:null;
    if(!fn||fn._v140)return;
    const wrapped=function(id){
      const r=fn.apply(this,arguments);
      try{mount(id, rootOf?rootOf(id,arguments[1]):null)}catch(e){}
      return r;
    };
    wrapped._v140=1;
    window[name]=wrapped;
    try{if(name==='soloStart')soloStart=wrapped; if(name==='start')start=wrapped; if(name==='printPage')printPage=wrapped}catch(e){}
  }
  wrap('soloStart',()=>$('solo'));
  wrap('start',()=>$('session'));
  wrap('printPage',()=>$('print'));
  if(typeof dailyOpen64==='function'&&!dailyOpen64._v140){
    const open=dailyOpen64;
    dailyOpen64=function(id,mode){
      const r=open.apply(this,arguments);
      const root=$(mode==='solo'?'solo':mode==='print'?'print':'session');
      try{mount(id, root)}catch(e){}
      return r;
    };
    dailyOpen64._v140=1;
  }

  window.IL140={
    mount,refresh,pickStyle,pickPal,loadStyle,loadPal,hasRecipe,ensure,STYLES,
    keys:{style:KEY_STYLE,pals:KEY_PALS}
  };
})();
