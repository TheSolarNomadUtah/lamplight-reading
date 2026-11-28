/* v181: local preview (do not ship until Ignacio OKs it in Builder's chat).
   Refresh-flash skeleton (C4), Patterns tap lock (C5), Grow layout (no recipe / no gallery,
   counter under controls, Reset + colors, storage clear, Float at cap), fractal Reset + colors,
   Same Shape upgrade, See Your Sound polish, Half and Quarter upgrade, Zoom hunt + phone layout
   + kid wording, Paint Hide tools, Year Wheel back-to-Patterns, U11b bot pictures (file + snail
   word-art fix). Ignacio, 20 Nov 6:55 PM America/Denver: KEEP and upgrade the 19-cell Honeycomb
   Builder (colors, Reset, calm, keep U6 tone); Endless Honeycomb stays too. Sound Draws Shapes is
   upgraded per the spec (no hold flag). First Letter Garden and Spheres
   Lullaby are not in this drop. Old Paint stays reachable. Challenge mode is unchanged. */
(function(root){
try{if(root.document&&root.document.documentElement)root.document.documentElement.classList.add("lamp-boot181")}catch(e){}

'use strict';

/* Ignacio 6:55 PM: Builder stays and is upgraded; Endless Honeycomb stays too.
   Sound Draws is upgraded with no hold flag. The honeycomb-removal flag stays in the file
   only so a later ship could hide the 19-cell toy; it defaults to KEEP. */
if(typeof root.V181_REMOVE_HONEYCOMB==='undefined') root.V181_REMOVE_HONEYCOMB=false; /* KEEP the 19-cell Builder */
if(typeof root.V181_SOUND_DRAWS_UPGRADE==='undefined') root.V181_SOUND_DRAWS_UPGRADE=true; /* always upgrade Sound Draws */

var PAL=[{id:'honey',en:'Honey',es:'Miel',c:['#e6b454','#c45a3a','#fff6d8']},
         {id:'river',en:'River',es:'Río',c:['#5b7ea8','#c2dce2','#e8c894']},
         {id:'leaf',en:'Leaf',es:'Hoja',c:['#6f9a7a','#eac77d','#f4e4c4']},
         {id:'plum',en:'Plum',es:'Ciruela',c:['#8a5a7a','#e07a5f','#f4d35e']},
         {id:'night',en:'Night',es:'Noche',c:['#2a2233','#e6b454','#f6ecd8']},
         {id:'shell',en:'Shell',es:'Concha',c:['#c45a3a','#f4e4c4','#5b7ea8']}];

var ES={
  'Hide tools':'Ocultar herramientas',
  'Tools':'Herramientas',
  'Reset':'Empezar de nuevo',
  'Holding this seed on this screen.':'Se queda esta semilla en esta pantalla.',
  'A tiny copy of this shape is hiding. Tap the gold dot on it.':'Una copia chiquita de esta forma está escondida. Toca el puntito dorado.',
  'Tap a gold dot. Then count the little arms on that bump.':'Toca un puntito dorado. Luego cuenta los bracitos de ese bulto.',
  'You found a tiny copy.':'Encontraste una copia chiquita.',
  'This bump has 3 arms.':'Este bulto tiene 3 bracitos.',
  'This bump has 4 arms.':'Este bulto tiene 4 bracitos.',
  'This bump has 5 arms.':'Este bulto tiene 5 bracitos.',
  'Honey':'Miel','River':'Río','Leaf':'Hoja','Plum':'Ciruela','Night':'Noche','Shell':'Concha',
  'Same shape, different size.':'La misma forma, de otro tamaño.',
  'Make it bigger':'Hazla más grande',
  'Make it smaller':'Hazla más chica',
  'Which of these is the same shape as this one?':'¿Cuál de estas tiene la misma forma que esta?',
  'Yes — same shape.':'Sí: la misma forma.',
  'Not that one. Try another.':'Esa no. Prueba otra.',
  'half':'mitad','quarter':'cuarto',
  'Half':'Mitad','Quarter':'Cuarto',
  '2 of 2 pieces. Each one is a half.':'2 de 2 pedazos. Cada uno es una mitad.',
  '4 of 4 pieces. Each one is a quarter.':'4 de 4 pedazos. Cada uno es un cuarto.',
  'The jar is half full.':'El frasco está medio lleno.',
  'The jar is a quarter full.':'El frasco está un cuarto lleno.',
  'Folded in half.':'Doblado por la mitad.',
  'Folded in quarters.':'Doblado en cuartos.',
  'Draw it slowly':'Dibújalo despacio',
  'Favorite pair':'Par favorito',
  'Saved this pair.':'Se guardó este par.',
  'Show my favorite':'Ver mi favorito',
  'Look closer':'Mirar de cerca',
  'Endless Honeycomb':'Panal sin fin',
  'A tile that grows by the same rule, without end.':'Una ficha que crece con la misma regla, sin fin.',
  'Fill the six around the one.':'Llena los seis alrededor del uno.',
  'Seven make one bigger tile.':'Siete forman una ficha más grande.',
  'Each tile is everything you built.':'Cada ficha es todo lo que construiste.',
  "It's not a perfect hexagon. Copies still fit with no gaps.":'No es un hexágono perfecto. Sus copias encajan sin huecos.',
  'Start again':'Empezar de nuevo',
  'Circle plate':'Plato redondo',
  'Square plate':'Plato cuadrado',
  '3 curves':'3 curvas',
  'a sun':'un sol',
  'a zigzag':'un zigzag',
  'branches':'ramas',
  'a cross and a ring':'una cruz y un aro',
  'little dashes':'rayitas',
  'a loop':'un lazo',
  'a flower':'una flor',
  'a star':'una estrella',
  'twigs':'ramitas',
  'a web':'una telaraña',
  'loops':'aros',
  'a shower':'una lluvia',
  'a star in the middle':'una estrella en el medio',
  'many marks':'muchas marcas',
  'a star and little stars':'una estrella y estrellitas',
  'Pattern Loom':'Telar de patrones',
  'Bloom':'Flor',
  'Tap, and circles bloom.':'Toca, y los círculos florecen.',
  'Every circle is the same size. Exactly six fit around one.':'Todos los círculos son del mismo tamaño. Caben justo seis alrededor de uno.',
};



function esLang(){try{return (typeof LANG==='string'&&LANG==='es')||(typeof curLang==='function'&&curLang()==='es')}catch(e){return false}}
function t181(s,v){
  var out;
  if(esLang()&&ES[s]) out=ES[s];
  else if(typeof gT==='function'){try{out=gT(s,v)}catch(e){out=s}}
  else out=s;
  if(v&&typeof out==='string') out=out.replace(/\{(\w+)\}/g,function(_,k){return v[k]==null?'':String(v[k])});
  return out;
}
function esc181(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pid181(){try{return (typeof curPid==='function'?curPid():'')||''}catch(e){return ''}}
function reduced181(){try{return (typeof lampReduced73==='function'&&lampReduced73())||(root.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}}
function $(id){return document.getElementById(id)}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function')return;var next=wrap(prev);next._v181=1;next._base=prev;root[name]=next;return next}

/* ---- CSS ---- */
function css(){
  if(document.getElementById('v181css'))return;
  var s=document.createElement('style');s.id='v181css';
  s.textContent=
    '#patterns .pat-units.pat-lock181{pointer-events:none}'+
    '#patterns .g181-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:10px 0}'+
    '#patterns .g181-row button, #patterns .g181-pal button, .g181-row button{min-height:56px;min-width:56px}'+
    '#patterns .g181-pal{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}'+
    '#patterns .g181-pal button{width:56px;height:56px;border-radius:14px;border:2px solid #d8cdb8;padding:0}'+
    '#patterns .g181-pal button.on{box-shadow:inset 0 0 0 3px #2f2a24}'+
    '#patterns .g181-pal button span{display:block;font-size:.65rem;line-height:1.1;margin-top:2px;color:var(--ink,#2f2a24)}'+
    'body.night #patterns .g181-pal button.on,body.bedtime #patterns .g181-pal button.on{box-shadow:inset 0 0 0 3px #f6ecd8}'+
    '#patterns .g181-under{margin-top:12px}'+
    '#patterns [data-gaf3jar].g181-under{order:9}'+
    '#pstudio.paint-hide181 .pbar, #pstudio.paint-hide181 .pbar101{display:none!important}'+
    '#pstudio .paint-tab181,#pstudio .paint-leave181,#pstudio .paint-hidebtn181{min-height:56px;min-width:56px;z-index:5}'+
    '#pstudio.paint-hide181 .paint-tab181,#pstudio.paint-hide181 .paint-leave181{position:absolute;top:8px;display:inline-flex;align-items:center;justify-content:center;padding:8px 14px}'+
    '#pstudio.paint-hide181 .paint-tab181{left:8px}'+
    '#pstudio.paint-hide181 .paint-leave181{right:8px}'+
    '#pstudio:not(.paint-hide181) .paint-tab181,#pstudio:not(.paint-hide181) .paint-leave181{display:none}'+
    '@media (prefers-reduced-motion:reduce){#pstudio .pbar,#pstudio .pbar101,#pstudio .paint-tab181{transition:none}}'+
    '@media (max-width:700px){#patterns .zoom-stage181{margin:0 auto 8px;max-width:100%}#patterns .zoom-stage181 canvas{display:block;width:min(100%,360px);height:auto;margin:0 auto}}'+
    '#patterns.zoom-hunt181 [data-kind181]:not([data-kind181="mandel"]){opacity:.45;pointer-events:none}'+
    '.sys177-row button{min-width:56px!important;min-height:56px!important}'+
    '.same181-scale{display:flex;gap:8px;justify-content:center;margin:8px 0}'+
    '.same181-quiz{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-top:12px}'+
    '.frac181-pic{max-width:360px;margin:0 auto;text-align:center}'+'.eh181-stage{position:relative;max-width:420px;margin:12px auto}'+'.eh181-stage svg{display:block;width:100%;height:auto;background:#120E18;border-radius:16px}'+'.eh181-zoom{transform-origin:50% 50%;transition:transform 1.4s ease}'+'.eh181-fade{transition:opacity .8s ease}'+'@media(prefers-reduced-motion:reduce){.eh181-zoom,.eh181-fade{transition:none}}'+'.eh181-ghost{cursor:pointer;opacity:.45}'+'.eh181-glow .eh181-on{filter:drop-shadow(0 0 5px #e6b454)}'+'.loom181-stage{position:relative;max-width:420px;margin:12px auto;background:#120E18;border-radius:16px;overflow:hidden}'+'.loom181-stage svg{display:block;width:100%;height:auto;touch-action:none}'+'.loom181-toast{position:absolute;left:16px;right:16px;bottom:16px;background:#fffdf8ee;border-radius:16px;padding:10px 14px;color:#2f2a24;font:1rem/1.35 Georgia,serif;opacity:1;transition:opacity 1.6s ease}'+'.loom181-toast.loom181-out{opacity:0}'+'.loom181-dial{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:10px 0}'+'.loom181-dial button{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:56px;min-height:56px;padding:6px}'+'.loom181-dial button.on{box-shadow:inset 0 0 0 2px #c28500}'+'#patChCv.plate-circle181{border-radius:50%;overflow:hidden}'+'#patChCv.plate-circle181{border-radius:50%}'+
    '.hdr-ico181 svg,.hdr-ico181 .lamp-art63{width:100%;height:100%;display:block}'+
    'h1{white-space:nowrap}'+
    '@media (max-width:420px){header h1{font-size:1.05rem;white-space:normal}}';
  document.head.appendChild(s);
}

/* ---- upgrade clear (gallery / recipe; keep sky rings) ---- */
function clearUpgrade181(){
  var mark='lamp_v181_cleared';
  try{if(localStorage.getItem(mark)==='1')return}catch(e){}
  function drop(store,key){
    if(!key)return;
    if(/^lamp_fractals106@/.test(key)) store.removeItem(key);
    else if(/^lamp_gaf2@/.test(key)) store.removeItem(key);
    else if(/gaf.*recipe|gafload|gafprint/i.test(key)&&!/^lamp_gaf3sky@/.test(key)) store.removeItem(key);
  }
  try{
    var i,k,keys=[];
    for(i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
    keys.forEach(function(key){drop(localStorage,key)});
    localStorage.setItem(mark,'1');
  }catch(e){}
  try{
    if(typeof RAW==='object'&&RAW){
      if(typeof RAW.keys==='function'){
        (RAW.keys()||[]).slice().forEach(function(key){if(!/^lamp_gaf3sky@/.test(key)) drop(RAW,key)});
      }
    }
  }catch(e){}
}

/* ---- snail word picture: skip the Snail account picture ---- */
function fixSnail181(){
  if(typeof artInner63!=='function'||artInner63._v181)return;
  hook('artInner63',function(prev){
    return function(k){
      if(k==='snail'&&root.AVATARS&&AVATARS.snail){
        var hold=AVATARS.snail;
        try{delete AVATARS.snail;return prev.apply(this,arguments)}
        finally{AVATARS.snail=hold}
      }
      return prev.apply(this,arguments);
    };
  });
  try{if(typeof ART63!=='undefined') ART63.cache={}}catch(e){}
}

/* ---- first paint / C4 ---- */
function fillHeader181(){
  document.querySelectorAll('[data-art181]').forEach(function(el){
    if(el.getAttribute('data-filled181'))return;
    var k=el.getAttribute('data-art181');
    try{
      if(typeof lampArt63==='function'){el.innerHTML=lampArt63(k);el.setAttribute('data-filled181','1')}
    }catch(e){}
  });
  try{if(typeof artRefresh63==='function') artRefresh63(document.header||document.body)}catch(e){}
}
function reveal181(){
  if(root.__lampArtReady181)return;
  root.__lampArtReady181=true;
  fillHeader181();
  try{if(typeof artRefresh63==='function') artRefresh63(document.body)}catch(e){}
  document.documentElement.classList.add('art-ready');
  document.documentElement.classList.remove('lamp-boot181');
  var boot=$('lampBoot181');if(boot&&boot.parentNode)boot.parentNode.removeChild(boot);
}
function fromPatterns181(){
  try{
    var q=new URLSearchParams(location.search);
    if(q.get('from')==='patterns')return true;
    if((location.hash||'')==='#patterns')return true;
  }catch(e){}
  return false;
}
function bootReveal181(){
  fillHeader181();
  var wantPat=fromPatterns181();
  function mount(){
    try{
      if(wantPat&&typeof show==='function') show('patterns');
      else{
        var hub=$('hub');
        if(hub&&!hub.classList.contains('hidden')&&typeof renderHub==='function'){
          renderHub();
          if(typeof lampMountAll73==='function') lampMountAll73();
        }
      }
    }catch(e){}
    var n=0;
    (function tick(){
      var hero=document.querySelector('#hub .lamp73-shell, #home .lamp73-shell, #hub [data-il-kind], #patterns');
      if((wantPat&&$('patterns'))||hero||n++>40) reveal181();
      else setTimeout(tick,50);
    })();
  }
  requestAnimationFrame(function(){requestAnimationFrame(mount)});
}

/* ---- Patterns lock (C5) + removals ---- */
function lockPatTiles181(){
  var grid=document.querySelector('#patterns .pat-units');if(!grid)return;
  grid.classList.add('pat-lock181');
  var unlocked=false;
  function unlock(){if(unlocked)return;unlocked=true;grid.classList.remove('pat-lock181')}
  function onUp(){document.removeEventListener('pointerup',onUp,true);document.removeEventListener('mouseup',onUp,true);document.removeEventListener('touchend',onUp,true);setTimeout(unlock,400)}
  document.addEventListener('pointerup',onUp,true);
  document.addEventListener('mouseup',onUp,true);
  document.addEventListener('touchend',onUp,true);
  setTimeout(unlock,900);
}
function wrapShow181(){
  /* Do not replace window.show — seatbelt/back/parity require the v99 history wrap to stay outermost. */
  if(typeof showCore10_97==='function'&&!showCore10_97._v181){
    hook('showCore10_97',function(prevC){
      return function(id){
        var orig=window.scrollTo,pending=false;
        if(id==='patterns') window.scrollTo=function(){pending=true};
        var r=prevC.apply(this,arguments);
        if(id==='patterns'){
          window.scrollTo=orig;
          lockPatTiles181();
          tidyPatterns181();
          requestAnimationFrame(function(){try{orig.call(window,0,0)}catch(e){}});
        }
        if(id==='paint') try{paintHideUI181()}catch(e){}
        return r;
      };
    });
  }
  if(typeof afterShow95==='function'&&!afterShow95._v181){
    hook('afterShow95',function(prev){
      return function(id){
        var r=prev.apply(this,arguments);
        try{
          if(id==='patterns'){lockPatTiles181();tidyPatterns181()}
          if(id==='paint') paintHideUI181();
        }catch(e){}
        return r;
      };
    });
  }
}
function tidyPatterns181(){
  var el=$('patterns');if(!el)return;
  /* Look closer (Patterns lamp button) */
  var lamp=$('patLamp106');if(lamp&&lamp.parentNode)lamp.parentNode.removeChild(lamp);
  el.querySelectorAll('button').forEach(function(b){
    var lab=(b.textContent||'');
    if(/Look closer|Mirar de cerca/i.test(lab)&&b.getAttribute('onclick')&&b.getAttribute('onclick').indexOf('patLampLook106')>=0){
      if(b.parentNode) b.parentNode.removeChild(b);
    }
  });
  var sun=el.querySelector('[data-pat="sunflower"]');if(sun&&sun.parentNode)sun.parentNode.removeChild(sun);
  if(root.V181_REMOVE_HONEYCOMB){
    var hx=el.querySelector('[data-pat="honeycomb"]');if(hx&&hx.parentNode)hx.parentNode.removeChild(hx);
  }
  try{loomTile181()}catch(e){}
  try{ehTile181()}catch(e){}
  /* Year Wheel: go with from=patterns so Back can return here */
  var year=el.querySelector('[data-pat="year"]');
  if(year){
    year.onclick=function(ev){
      if(ev) ev.preventDefault();
      var lang='en';
      try{lang=(typeof curLang==='function'&&curLang())||(typeof LANG==='string'?LANG:'en')}catch(e){}
      location.assign('year-wheel/?from=patterns'+(lang==='es'?'&lang=es':''));
    };
  }
}


/* ---- Endless Honeycomb (Gosper; stays alongside the 19-cell Builder) ---- */
var EH181={level:0,filled:[0,0,0,0,0,0],pal:0,busy:false,zooms:0};
function ehRot60(q,r){return [-r,q+r]}
function ehSteps(){
  var q=3,r=-1,s=[],i,t;
  for(i=0;i<6;i++){s.push([q,r]);t=ehRot60(q,r);q=t[0];r=t[1]}
  return s;
}
function ehHexD(cx,cy,r){
  var d=[],i,a;
  for(i=0;i<6;i++){a=Math.PI/180*(60*i-30);d.push((i?'L':'M')+(cx+r*Math.cos(a)).toFixed(2)+' '+(cy+r*Math.sin(a)).toFixed(2))}
  return d.join(' ')+'Z';
}
function ehXY(q,r,size){return [size*Math.sqrt(3)*(q+r/2), size*1.5*r]}
function ehNeighbors(){var q=1,r=0,s=[],i,t;for(i=0;i<6;i++){s.push([q,r]);t=ehRot60(q,r);q=t[0];r=t[1]}return s}
function ehStepN(v,n){
  var q=v[0],r=v[1],k,t;
  for(k=1;k<n;k++){t=[3*q+r,-q+2*r];q=t[0];r=t[1]}
  return [q,r];
}
function ehCells(level){
  if(level<=0) return [[0,0]];
  if(level===1) return [[0,0]].concat(ehNeighbors());
  var kids=ehCells(level-1), out=[], seen={},i,j,q,r,key,offs=[[0,0]],base=ehSteps();
  for(i=0;i<6;i++) offs.push(ehStepN(base[i], level-1));
  for(i=0;i<offs.length;i++){
    for(j=0;j<kids.length;j++){
      q=kids[j][0]+offs[i][0]; r=kids[j][1]+offs[i][1];
      key=q+','+r; if(seen[key]) continue; seen[key]=1; out.push([q,r]);
    }
  }
  return out;
}
function ehGroupOffset(level,i){
  if(level<=0) return ehNeighbors()[i];
  return ehStepN(ehSteps()[i], Math.max(1,level));
}
function ehFitSize(level){
  var cells=ehCells(level), max=1,i,xy,st,k,q,r;
  function consider(q,r){xy=ehXY(q,r,1);var d=Math.hypot(xy[0],xy[1])+1;if(d>max)max=d}
  for(i=0;i<cells.length;i++) consider(cells[i][0],cells[i][1]);
  if(level<3){
    for(i=0;i<6;i++){
      st=ehGroupOffset(level,i);
      for(k=0;k<cells.length;k++) consider(cells[k][0]+st[0], cells[k][1]+st[1]);
    }
  }
  var size=186/max;
  if(size<6.8) size=6.8;
  if(size>32) size=32;
  return size;
}
function ehInk(i){
  var p=PAL[i]||PAL[0];
  return {fill:p.c[0], stroke:'#855A00', ghost:'#C4A07A'};
}
function ehArt(){
  return '<svg width="56" height="56" viewBox="-28 -28 56 56" aria-hidden="true">'+
    '<g fill="#e6b454" stroke="#72583f" stroke-width="1.2">'+
    [[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]].map(function(v){
      var x=6.5*Math.sqrt(3)*(v[0]+v[1]/2), y=6.5*1.5*v[1];
      return '<path d="'+ehHexD(x,y,6.2)+'"/>';
    }).join('')+'</g></svg>';
}
function ehTile181(){
  var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="endless"]'))return;
  var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','endless');
  b.innerHTML=ehArt()+esc181(t181('Endless Honeycomb'))+'<small>'+esc181(t181('A tile that grows by the same rule, without end.'))+'</small>';
  b.onclick=function(){ehOpen181()};
  var hx=g.querySelector('[data-pat="honeycomb"]');
  if(hx&&hx.nextSibling) g.insertBefore(b,hx.nextSibling);
  else if(hx) hx.parentNode.appendChild(b);
  else g.appendChild(b);
}
function ehChime181(i){
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
    var c=typeof ac==='function'?ac():null;if(!c)return;
    var freqs=[261.63,293.66,329.63,392,440,523.25,392];
    var f=freqs[Math.max(0,Math.min(freqs.length-1,i))];
    var o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=f;
    var vol=(document.body&&document.body.classList.contains('bedtime'))?0.05:0.09;
    var t=c.currentTime;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+0.04);g.gain.exponentialRampToValueAtTime(0.0001,t+0.9);
    o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+1);
  }catch(e){}
}
function ehCountLine(){
  var n=EH181.level;
  if(n<=0) return t181('Fill the six around the one.');
  if(n===1) return '7';
  if(n===2) return '7 × 7 = 49';
  if(n===3) return '7 × 7 × 7 = 343';
  return t181('Each tile is everything you built.');
}
function ehOpen181(){
  try{
    if(typeof PAT106==='object'){
      PAT106.unit='endless';
      if(PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
    }
  }catch(e){}
  try{if(typeof scStop101==='function')scStop101()}catch(e){}
  var host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  EH181.level=0;EH181.filled=[0,0,0,0,0,0];EH181.busy=false;EH181.zooms=EH181.zooms||0;
  ehDraw181();
}
function ehDraw181(){
  var el=$('patterns');if(!el)return;
  var ink=ehInk(EH181.pal||0), level=Math.min(EH181.level,3), i;
  var size=ehFitSize(level), cx=200, cy=200, parts=[];
  function drawCluster(ox,oy,lev,cls,fill){
    var cells=ehCells(lev),k,xy,d,ghost=cls.indexOf('ghost')>=0;
    for(k=0;k<cells.length;k++){
      xy=ehXY(cells[k][0],cells[k][1],size);
      d=ehHexD(cx+ox+xy[0],cy+oy+xy[1],size*0.96);
      parts.push('<path class="'+cls+'" d="'+d+'" fill="'+fill+'" fill-opacity="'+(ghost?'0':'0.92')+'" stroke="'+(ghost?ink.ghost:ink.stroke)+'" stroke-width="1.4" stroke-linejoin="round"/>');
    }
  }
  drawCluster(0,0,level,'eh181-on',ink.fill);
  var showGhosts=level<3;
  if(showGhosts){
    for(i=0;i<6;i++){
      var st=ehGroupOffset(level,i), xy=ehXY(st[0],st[1],size), on=!!EH181.filled[i];
      drawCluster(xy[0],xy[1],level,on?'eh181-on':'eh181-ghost', on?ink.fill:'transparent');
    }
  }
  var fact=level>=1?('<p class="soft">'+esc181(t181("It's not a perfect hexagon. Copies still fit with no gaps."))+'</p>'):'';
  var msg=ehCountLine();
  if(level===0&&EH181.filled.filter(Boolean).length===0) msg=t181('Fill the six around the one.');
  if(level===0&&EH181.filled.filter(Boolean).length===6) msg=t181('Seven make one bigger tile.');
  if(level>=3) msg='7 × 7 × 7 = 343. '+t181('Each tile is everything you built.');
  var glow=showGhosts&&EH181.filled.filter(Boolean).length===6;
  var inner='<p class="soft">'+esc181(t181('A tile that grows by the same rule, without end.'))+'</p>'+
    '<div class="eh181-stage" id="eh181stage"><svg viewBox="0 0 400 400" width="360" height="360" class="'+(glow?'eh181-glow':'')+'" role="img" aria-label="'+esc181(t181('Endless Honeycomb'))+'">'+parts.join('')+'</svg></div>'+
    '<p class="kline" id="eh181msg" aria-live="polite">'+esc181(msg)+'</p>'+fact+
    '<div class="g181-row">'+
    '<button type="button" data-g181reset="endless">'+esc181(t181('Start again'))+'</button>'+
    palButtons181(EH181.pal||0)+'</div>';
  el.innerHTML=(typeof patShell==='function'?patShell(esc181(t181('Endless Honeycomb')),inner):'<div class="card"><h2>'+esc181(t181('Endless Honeycomb'))+'</h2>'+inner+'</div>');
  if(showGhosts&&!EH181.busy){
    var hits=document.createElement('div');hits.style.cssText='position:absolute;inset:0';
    var stage=el.querySelector('#eh181stage');
    if(stage){
      stage.style.position='relative';
      for(i=0;i<6;i++){
        (function(idx){
          var st=ehGroupOffset(level,idx), xy=ehXY(st[0],st[1],size);
          var btn=document.createElement('button');
          btn.type='button';btn.setAttribute('aria-label',t181('Fill the six around the one.'));
          var px=xy[0]+cx, py=xy[1]+cy;
          var span=level===0?18:level===1?22:28;
          btn.style.cssText='position:absolute;left:'+(px/400*100)+'%;top:'+(py/400*100)+'%;width:'+span+'%;height:'+span+'%;transform:translate(-50%,-50%);background:transparent;border:0;padding:0;min-width:56px;min-height:56px;cursor:pointer';
          if(EH181.filled[idx]) btn.disabled=true;
          btn.onclick=function(){ehFill181(idx)};
          hits.appendChild(btn);
        })(i);
      }
      stage.appendChild(hits);
    }
  }
  var rst=el.querySelector('[data-g181reset="endless"]');
  if(rst) rst.onclick=function(){if(!EH181.busy) ehOpen181()};
  el.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){EH181.pal=+b.getAttribute('data-g181pal-i');ehDraw181()};
  });
  if(typeof turtlePlace105==='function') try{turtlePlace105('patterns')}catch(e){}
}
function ehFill181(idx){
  if(EH181.busy||EH181.level>=3||EH181.filled[idx])return;
  EH181.filled[idx]=1;
  ehChime181(EH181.filled.filter(Boolean).length-1);
  if(EH181.filled.filter(Boolean).length<6){ehDraw181();return}
  EH181.busy=true;
  ehDraw181();
  var stage=$('eh181stage'), svg=stage&&stage.querySelector('svg');
  var ang=19.1066, sc=Math.sqrt(7);
  function next(){
    EH181.level=Math.min(EH181.level+1, 3);
    EH181.filled=[0,0,0,0,0,0];
    EH181.busy=false;
    EH181.zooms=(EH181.zooms||0)+1;
    try{if(EH181.zooms===1&&typeof earn124==='function') earn124('hex')}catch(e){}
    ehChime181(6);
    ehDraw181();
  }
  if(!svg){next();return}
  if(reduced181()){
    svg.classList.add('eh181-fade');svg.style.opacity='0.2';
    setTimeout(function(){next()},800);
  }else{
    svg.classList.add('eh181-zoom');
    svg.style.transform='scale('+sc.toFixed(4)+') rotate('+ang+'deg)';
    setTimeout(function(){next()},1400);
  }
}



/* ---- Pattern Loom (U1): Bloom dial 1/2/3/6, turns only, Pi's line after the first ring of six ---- */
var LOOM181={bloom:1,centers:[[0,0]],turn:0,revealed:false,holding:false,holdT:null,raf:0};
function loomDots181(n){
  var d='',i,a,x,y;
  for(i=0;i<n;i++){
    a=Math.PI/180*(-90+360*i/n);
    x=24+14*Math.cos(a); y=24+14*Math.sin(a);
    d+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="#E6B454" stroke="#72583f" stroke-width="1.6"/>';
  }
  return '<svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#fffdf8" stroke="#72583f" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="none" stroke="#d9c9a8" stroke-width="1.2" stroke-dasharray="2 3"/>'+d+'</svg>';
}
function loomArt181(){
  var r=9,cx=28,cy=28,g='',i,a;
  g+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#e6b454" stroke-width="1.8"/>';
  for(i=0;i<6;i++){
    a=Math.PI/180*(60*i-90);
    g+='<circle cx="'+(cx+r*Math.cos(a)).toFixed(1)+'" cy="'+(cy+r*Math.sin(a)).toFixed(1)+'" r="'+r+'" fill="none" stroke="#e6b454" stroke-width="1.3"/>';
  }
  return '<svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">'+g+'</svg>';
}
function loomTile181(){
  var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="loom"]'))return;
  var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','loom');
  b.innerHTML=loomArt181()+esc181(t181('Pattern Loom'))+'<small>'+esc181(t181('Tap, and circles bloom.'))+'</small>';
  b.onclick=function(){loomOpen181()};
  if(g.firstChild) g.insertBefore(b,g.firstChild);
  else g.appendChild(b);
}
function loomNear181(p,q,eps){return Math.hypot(p[0]-q[0],p[1]-q[1])<(eps||0.15)}
function loomHas181(p){
  var i;for(i=0;i<LOOM181.centers.length;i++) if(loomNear181(LOOM181.centers[i],p)) return true;
  return false;
}
function loomAddCenter181(p){
  if(loomHas181(p)) return false;
  if(LOOM181.centers.length>=37) return false;
  LOOM181.centers.push([p[0],p[1]]);
  return true;
}
function loomCrossings181(){
  var out=[], seen={}, i,j,a,b,d,mid,h,ux,uy,mx,my,pts,k,key,r=1;
  function add(p){
    if(Math.hypot(p[0],p[1])>5.2) return;
    key=p[0].toFixed(3)+','+p[1].toFixed(3);
    if(seen[key]||loomHas181(p)) return;
    seen[key]=1; out.push(p);
  }
  if(LOOM181.centers.length<=1){
    for(i=0;i<6;i++) add([Math.cos(Math.PI/180*60*i), Math.sin(Math.PI/180*60*i)]);
    return out;
  }
  for(i=0;i<LOOM181.centers.length;i++){
    for(j=i+1;j<LOOM181.centers.length;j++){
      a=LOOM181.centers[i]; b=LOOM181.centers[j];
      d=Math.hypot(b[0]-a[0],b[1]-a[1]);
      if(d<0.05||d>2+0.05) continue;
      mid=d/2; h=Math.sqrt(Math.max(0,r*r-mid*mid));
      ux=(b[0]-a[0])/d; uy=(b[1]-a[1])/d;
      mx=a[0]+ux*mid; my=a[1]+uy*mid;
      add([mx-uy*h, my+ux*h]); add([mx+uy*h, my-ux*h]);
    }
  }
  return out;
}
function loomRingCount181(){
  /* Count centres on the first ring from the live list (rule 7). */
  var n=0,i,p;
  for(i=0;i<LOOM181.centers.length;i++){
    p=LOOM181.centers[i];
    if(Math.abs(Math.hypot(p[0],p[1])-1)<0.12) n++;
  }
  return n;
}
function loomBloomAt181(p){
  var N=LOOM181.bloom||1, i, a, q, added=0;
  for(i=0;i<N;i++){
    a=Math.PI*2*i/N;
    q=[p[0]*Math.cos(a)-p[1]*Math.sin(a), p[0]*Math.sin(a)+p[1]*Math.cos(a)];
    if(loomAddCenter181(q)) added++;
  }
  return added;
}
function loomOpen181(){
  try{if(typeof PAT106==='object'){
    PAT106.unit='loom';
    if(PAT106.ch&&PAT106.ch.raf){cancelAnimationFrame(PAT106.ch.raf);PAT106.ch.raf=0}
  }}catch(e){}
  try{if(typeof scStop101==='function')scStop101()}catch(e){}
  var host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  LOOM181.bloom=1;LOOM181.centers=[[0,0]];LOOM181.turn=0;LOOM181.revealed=false;LOOM181.faded=false;LOOM181.holding=false;
  if(LOOM181.raf){cancelAnimationFrame(LOOM181.raf);LOOM181.raf=0}
  loomDraw181();
}
function loomDraw181(){
  var el=$('patterns');if(!el)return;
  var R=52, cx=200, cy=200, turn=LOOM181.turn||0;
  var parts=[], i, q, crossings;
  function xy0(p){return [cx+R*p[0], cy+R*p[1]]}
  function xy(p){
    var c=Math.cos(turn),s=Math.sin(turn);
    return [cx+R*(p[0]*c-p[1]*s), cy+R*(p[0]*s+p[1]*c)];
  }
  for(i=0;i<LOOM181.centers.length;i++){
    q=xy0(LOOM181.centers[i]);
    parts.push('<circle class="loom181-c" cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+R+'" fill="none" stroke="'+(i===0?'#FFF6D8':'#FFE4A4')+'" stroke-width="'+(i===0?'3':'2.4')+'" filter="url(#loom181gl)"/>');
  }
  var deg=(turn*180/Math.PI).toFixed(3);
  var world='<g id="loom181world" transform="rotate('+deg+' '+cx+' '+cy+')">'+parts.join('')+'<g id="loom181hint"></g></g>';
  crossings=loomCrossings181();
  var ring=loomRingCount181();
  var showLine=ring>=6;
  var toast='';
  if(showLine){
    toast='<div class="loom181-toast'+(LOOM181.faded?' loom181-out':'')+'" id="loom181toast">'+esc181(t181('Every circle is the same size. Exactly six fit around one.'))+'</div>';
    if(!LOOM181.revealed){
      LOOM181.revealed=true;
      setTimeout(function(){
        LOOM181.faded=true;
        var t=$('loom181toast');
        if(t) t.classList.add('loom181-out');
      }, reduced181()?0:5500);
    }
  }
  var dial='<div class="loom181-dial" aria-label="'+esc181(t181('Bloom'))+'"><span class="soft">'+esc181(t181('Bloom'))+'</span>';
  [1,2,3,6].forEach(function(n){
    dial+='<button type="button" data-loom181-bloom="'+n+'" class="'+(LOOM181.bloom===n?'on':'')+'" aria-label="'+esc181(t181('Bloom')+' '+n)+'">'+loomDots181(n)+'<span>'+n+'</span></button>';
  });
  dial+='</div>';
  var reset=LOOM181.centers.length>1?'<div class="g181-row"><button type="button" data-g181reset="loom">'+esc181(t181('Start again'))+'</button></div>':'';
  var inner='<div class="loom181-stage" id="loom181stage">'+
    '<svg viewBox="0 0 400 400" width="360" height="360" role="img" aria-label="'+esc181(t181('Pattern Loom'))+'">'+
    '<defs><filter id="loom181gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
    world+'</svg>'+toast+'</div>'+dial+reset;
  el.innerHTML=(typeof patShell==='function'?patShell(esc181(t181('Pattern Loom')),inner):'<div class="card"><h2>'+esc181(t181('Pattern Loom'))+'</h2>'+inner+'</div>');
  var stage=$('loom181stage'), svg=stage&&stage.querySelector('svg');
  if(svg){
    function localPt(ev){
      var r=svg.getBoundingClientRect(), px=((ev.clientX-r.left)/r.width)*400, py=((ev.clientY-r.top)/r.height)*400;
      var ux=(px-cx)/R, uy=(py-cy)/R;
      var c=Math.cos(-turn), si=Math.sin(-turn);
      return [ux*c-uy*si, ux*si+uy*c];
    }
    function nearest(pt){
      var best=null,bd=0.45,i,cr=loomCrossings181(),dd;
      for(i=0;i<cr.length;i++){dd=Math.hypot(cr[i][0]-pt[0],cr[i][1]-pt[1]); if(dd<bd){bd=dd;best=cr[i]}}
      return best;
    }
    function showHint(pt){
      var h=svg.querySelector('#loom181hint'); if(!h)return;
      var snap=nearest(pt); if(!snap){h.innerHTML='';return}
      var qq=xy0(snap);
      h.innerHTML='<circle cx="'+qq[0].toFixed(1)+'" cy="'+qq[1].toFixed(1)+'" r="'+R+'" fill="#FFF6D8" fill-opacity=".12" stroke="#FFF6D8" stroke-width="2"/>';
    }
    var down=null;
    svg.addEventListener('pointerdown',function(ev){
      ev.preventDefault();
      down={t:Date.now(),x:ev.clientX,y:ev.clientY,pt:localPt(ev)};
      LOOM181.holding=false;
      if(LOOM181.holdT) clearTimeout(LOOM181.holdT);
      if(!reduced181()){
        LOOM181.holdT=setTimeout(function(){
          if(!down)return;
          LOOM181.holding=true;
          var last=performance.now();
          (function spin(now){
            if(!LOOM181.holding)return;
            LOOM181.turn+=(now-last)/1000*(Math.PI/15);
            last=now;
            var g=document.getElementById('loom181world');
            if(g) g.setAttribute('transform','rotate('+((LOOM181.turn*180/Math.PI).toFixed(3))+' 200 200)');
            LOOM181.raf=requestAnimationFrame(spin);
          })(last);
        },280);
      }
    });
    svg.addEventListener('pointermove',function(ev){
      var pt=localPt(ev); showHint(pt);
      if(down&&Math.hypot(ev.clientX-down.x,ev.clientY-down.y)>10){ /* dragging starts a turn if held */ }
    });
    function endPtr(ev){
      if(LOOM181.holdT){clearTimeout(LOOM181.holdT);LOOM181.holdT=null}
      var wasHold=LOOM181.holding;
      LOOM181.holding=false;
      if(!down)return;
      var dt=Date.now()-down.t;
      if(!wasHold&&dt<500){
        var snap=nearest(localPt(ev)||down.pt);
        if(snap&&loomBloomAt181(snap)) loomDraw181();
      }
      down=null;
    }
    svg.addEventListener('pointerup',endPtr);
    svg.addEventListener('pointerleave',function(){ if(LOOM181.holdT){clearTimeout(LOOM181.holdT);LOOM181.holdT=null} LOOM181.holding=false; down=null; });
    svg.addEventListener('pointercancel',endPtr);
  }
  el.querySelectorAll('[data-loom181-bloom]').forEach(function(b){
    b.onclick=function(){LOOM181.bloom=+b.getAttribute('data-loom181-bloom');loomDraw181()};
  });
  var rst=el.querySelector('[data-g181reset="loom"]');
  if(rst) rst.onclick=function(){loomOpen181()};
  if(typeof turtlePlace105==='function') try{turtlePlace105('patterns')}catch(e){}
}

/* ---- Sound Draws: settle sand onto the nodal lines, then keep it there ---- */
function soundPaint181(){
  var cv=$('patChCv');if(!cv||!PAT106||!PAT106.ch||!PAT106.ch.parts)return;
  var st=PAT106.ch,x=cv.getContext('2d'),W=cv.width,H=cv.height;
  var night=typeof patNight==='function'&&patNight();
  x.fillStyle=night?'#0d0f1a':'#e8c894';x.fillRect(0,0,W,H);
  x.save();
  if(st.plate!=='square'){x.beginPath();x.arc(W/2,H/2,Math.min(W,H)/2-2,0,Math.PI*2);x.clip()}
  if(st.pal181){try{x.filter='hue-rotate('+(st.pal181*28)+'deg) saturate(1.15)'}catch(e){}}
  x.fillStyle=night?'#d8c8a4':'#5a4632';
  st.parts.forEach(function(p){x.beginPath();x.arc(p.x*W,p.y*H,1.8,0,Math.PI*2);x.fill()});
  x.restore();
}
function soundStep181(stepK){
  var st=PAT106.ch,n=st.n,m=st.m;
  if(!st.parts||typeof patChladni106!=='function')return;
  st.parts.forEach(function(p){
    var v=patChladni106(p.x,p.y,n,m),a=Math.abs(v);
    if(a>0.04){
      var gx=-((Math.abs(patChladni106(p.x+0.01,p.y,n,m))-a)/0.01);
      var gy=-((Math.abs(patChladni106(p.x,p.y+0.01,n,m))-a)/0.01);
      var len=Math.hypot(gx,gy)||1;
      p.x=Math.max(0.02,Math.min(0.98,p.x+0.02*stepK*gx/len));
      p.y=Math.max(0.02,Math.min(0.98,p.y+0.02*stepK*gy/len));
    }
  });
}
function soundSettleNow181(){
  var cv=$('patChCv');if(!cv||!PAT106||!PAT106.ch)return;
  var st=PAT106.ch;
  if(st.raf){cancelAnimationFrame(st.raf);st.raf=0}
  if(!st.parts||!st.parts.length){
    var N=reduced181()?160:480;
    st.parts=Array.from({length:N},function(){return {x:Math.random(),y:Math.random()}});
  }
  var i,steps=reduced181()?80:180;
  for(i=0;i<steps;i++) soundStep181(1);
  soundPaint181();
  st.settled181=true;
}
function patSoundRun181(){
  var cv=$('patChCv');if(!cv||!PAT106||!PAT106.ch)return;
  var st=PAT106.ch,n=st.n,m=st.m;
  if(st.n==null){st.n=1;st.m=2;n=1;m=2}
  var N=reduced181()?160:480;
  st.parts=Array.from({length:N},function(){return {x:Math.random(),y:Math.random()}});
  st.settled181=false;
  try{if(typeof patSoundTone106==='function') patSoundTone106(n,m)}catch(e){}
  if(st.raf){cancelAnimationFrame(st.raf);st.raf=0}
  if(reduced181()){soundSettleNow181();return}
  var start=performance.now(),dur=2200;
  var tick=function(t){
    var k=Math.min(1,(t-start)/dur);
    soundStep181(0.5+0.7*k);
    soundPaint181();
    if(k<1) st.raf=requestAnimationFrame(tick);
    else soundSettleNow181();
  };
  st.raf=requestAnimationFrame(tick);
}

/* ---- Honeycomb Builder upgrade: Reset + colors, keep U6 tone, stay calm ---- */
function enhanceHex181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='honeycomb')return}catch(e){return}
  /* hide gallery, consistent with Grow */
  var gal=$('patGal106');
  if(gal){
    el.querySelectorAll('h3').forEach(function(x){if(/gallery|galería/i.test(x.textContent||'')&&x.parentNode)x.parentNode.removeChild(x)});
    var prev=gal.previousElementSibling;if(prev&&/Up to|Hasta/i.test(prev.textContent||'')&&prev.parentNode)prev.parentNode.removeChild(prev);
    gal.parentNode.removeChild(gal);
  }
  if(!el.querySelector('[data-g181reset="honeycomb"]')){
    var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181hex','1');
    bar.innerHTML='<button type="button" data-g181reset="honeycomb">'+esc181(t181('Reset'))+'</button>'+palButtons181((root.HEX124&&HEX124.pal181)||0);
    var row=el.querySelector('.pat-row');
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-g181reset="honeycomb"]').onclick=function(){
      try{
        if(typeof HEX124==='object'){HEX124.filled=new Set(['0,0']);HEX124.last=null}
        if(typeof hexDraw124==='function') hexDraw124();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        try{if(typeof HEX124==='object') HEX124.pal181=i}catch(e){}
        var pal=PAL[i]||PAL[0];
        el.querySelectorAll('.toy124-hex-on').forEach(function(n){n.setAttribute('fill',pal.c[0])});
        bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
      };
    });
  }
  /* re-apply stored colour after each redraw */
  try{
    var i=(typeof HEX124==='object'&&HEX124.pal181)||0, pal=PAL[i]||PAL[0];
    el.querySelectorAll('.toy124-hex-on').forEach(function(n){n.setAttribute('fill',pal.c[0])});
  }catch(e){}
}

/* ---- Grow: recipe/gallery off, jar below, Reset + colors, Float at cap ---- */
function extendPals181(){
  try{
    if(typeof PAT_PAL106!=='undefined'&&PAT_PAL106&&PAT_PAL106.length<PAL.length){
      PAL.forEach(function(p,i){if(!PAT_PAL106[i]) PAT_PAL106[i]=p.c});
    }
  }catch(e){}
}
function palName181(i){var p=PAL[i]||PAL[0];return t181(p.en)}
function palButtons181(cur,attr){
  return '<div class="g181-pal" data-g181pal="1">'+PAL.map(function(p,i){
    return '<button type="button" class="'+(cur===i?'on':'')+'" data-g181pal-i="'+i+'" aria-label="'+esc181(palName181(i))+'" style="background:linear-gradient(135deg,'+p.c.join(',')+')"><span>'+esc181(palName181(i))+'</span></button>';
  }).join('')+'</div>';
}
function tidyGrow181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='grow')return}catch(e){return}
  extendPals181();
  /* recipe card + print/load */
  el.querySelectorAll('.g9l, #gaf149print, [data-gafcode149], [data-gafload150], [data-gafloadgo], [data-gaf149print]').forEach(function(n){
    if(n&&n.parentNode)n.parentNode.removeChild(n);
  });
  el.querySelectorAll('button, a').forEach(function(b){
    var t=(b.textContent||'').replace(/\s+/g,' ').trim();
    if(/^(Print recipe card|Load recipe|Imprimir tarjeta|Cargar receta)/i.test(t)){
      if(b.parentNode)b.parentNode.removeChild(b);
    }
  });
  /* gallery */
  var gal=$('patGal106');
  if(gal){
    var p=gal.previousElementSibling,h=p&&p.previousElementSibling;
    if(p&&/Up to|Hasta|gallery|galería/i.test(p.textContent||'')) p.parentNode.removeChild(p);
    if(h&&/gallery|galería/i.test(h.textContent||'')) h.parentNode.removeChild(h);
    /* also a nearby h3 */
    el.querySelectorAll('h3').forEach(function(x){
      if(/gallery|galería/i.test(x.textContent||'')&&x.parentNode)x.parentNode.removeChild(x);
    });
    gal.parentNode.removeChild(gal);
  }
  /* Reset + colors row */
  if(!el.querySelector('[data-g181reset="grow"]')){
    var growBtn=el.querySelector('button[onclick*="patGrowStep106"]');
    var row=growBtn&&growBtn.parentNode;
    var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181ctrl','1');
    bar.innerHTML='<button type="button" data-g181reset="grow">'+esc181(t181('Reset'))+'</button>'+palButtons181((PAT106.grow&&PAT106.grow.pal)||0);
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-g181reset="grow"]').onclick=function(){
      try{
        var g=PAT106.grow;if(!g)return;
        if((g.depth||0)===0&&!(g.q&&g.q.length)) return;
        g.depth=0;g.q=[];g.msg='';g._rest=0;
        if(typeof patGrowDraw106==='function') patGrowDraw106();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        try{
          if(typeof patGrowSet106==='function') patGrowSet106('pal',i);
          else{PAT106.grow.pal=i;if(typeof patGrowDraw106==='function')patGrowDraw106()}
        }catch(e){}
      };
    });
  }
  /* Move How many jar below all controls */
  var jar=el.querySelector('[data-gaf3jar]');
  if(jar){
    var last=el.querySelector('[data-g181ctrl], [data-gaf3ctrl], button[onclick*="patGrowKeep106"]');
    var host=last&&last.parentNode;
    jar.classList.add('g181-under');
    if(host){
      var anchor=el.querySelector('[data-g181ctrl]')||el.querySelector('[data-gaf3ctrl]')||last;
      if(anchor&&anchor.parentNode&&jar!==anchor.nextSibling){
        anchor.parentNode.insertBefore(jar,anchor.nextSibling);
      }
    }
  }
  ensureFloat181();
}
function ensureFloat181(){
  try{
    if(typeof PAT106!=='object'||PAT106.unit!=='grow')return;
    var g=PAT106.grow,el=$('patterns');if(!g||!el)return;
    var cap=6;
    try{if(typeof IL149==='object'&&IL149&&PAT106.grow.shape){/* cap stays per-shape in v149 */}}catch(e){}
    var atCap=!!(g._rest||g.msg&&/as far as this seed grows|hasta aquí llega/i.test(g.msg||''));
    if(!atCap&&(g.depth||0)>=6) atCap=true;
    if(!atCap)return;
    if(el.querySelector('[data-gaf3float]'))return;
    if(typeof extraUI==='function') try{extraUI()}catch(e){}
  }catch(e){}
}

/* ---- Zoom hunts (C5) + layout + wording + Reset/colors ---- */
function kidHint181(m,ex){
  if(m==='baby') return t181('A tiny copy of this shape is hiding. Tap the gold dot on it.');
  if(m==='antenna') return t181('Tap a gold dot. Then count the little arms on that bump.');
  if(ex&&ex.msg){
    var msg=ex.msg;
    if(/little Mandelbrot|pequeño Mandelbrot/i.test(msg)) return t181('You found a tiny copy.');
    if(/period 3|3 arms|3 brac/i.test(msg)) return t181('This bump has 3 arms.');
    if(/period 4|4 arms|4 brac/i.test(msg)) return t181('This bump has 4 arms.');
    if(/period 5|5 arms|5 brac/i.test(msg)) return t181('This bump has 5 arms.');
  }
  return null;
}
var _zoomForce181=false;
function forceHuntHome181(){
  try{
    if(!PAT106||!PAT106.ex)return false;
    var ex=PAT106.ex,m=ex.mode163;
    if(m!=='baby'&&m!=='antenna')return false;
    var home=typeof patExKindHome106==='function'?patExKindHome106('mandel'):{kind:'mandel',cx:-0.5,cy:0,span:3.5};
    if(ex.kind==='mandel'&&Math.abs((ex.cx||0)-home.cx)<0.05&&Math.abs((ex.cy||0)-home.cy)<0.05&&Math.abs((ex.span||0)-home.span)<0.05)return false;
    Object.assign(ex,home,{limit:false,msg:''});
    return true;
  }catch(e){return false}
}
function layoutZoom181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='zoom')return}catch(e){return}
  if(!_zoomForce181&&forceHuntHome181()){
    _zoomForce181=true;
    try{if(typeof patExDraw106==='function') patExDraw106()}finally{_zoomForce181=false}
    return;
  }
  var cv=$('patExCv');if(!cv)return;
  var card=cv.closest('.card')||el;
  var stage=card.querySelector('.zoom-stage181');
  if(!stage){
    stage=document.createElement('div');stage.className='zoom-stage181';
    cv.parentNode.insertBefore(stage,cv);stage.appendChild(cv);
  }
  var h2=card.querySelector('h2');
  var intro=h2&&h2.nextElementSibling;
  var after=intro||h2;
  if(after&&stage.parentNode===after.parentNode&&after.nextSibling!==stage){
    after.parentNode.insertBefore(stage,after.nextSibling);
  }
  var tools=card.querySelector('[data-tools163]');
  var panel=card.querySelector('[data-extra163], #patHint163')&&(card.querySelector('[data-tools163]')&&card.querySelector('[data-tools163]').nextElementSibling);
  /* kind row is the first .pat-row with patExSetKind106 */
  var kindRow=null;
  card.querySelectorAll('.pat-row').forEach(function(r){
    if(!kindRow&&r.querySelector('[onclick*="patExSetKind106"], [data-kind181]')) kindRow=r;
  });
  if(kindRow){
    kindRow.querySelectorAll('button[onclick*="patExSetKind106"]').forEach(function(b){
      var m=/patExSetKind106\('([^']+)'\)/.exec(b.getAttribute('onclick')||'');
      if(m) b.setAttribute('data-kind181',m[1]);
    });
    if(tools&&tools.parentNode) tools.parentNode.insertBefore(kindRow,tools);
    if(stage.nextSibling!==(tools||kindRow)){
      stage.parentNode.insertBefore(kindRow,stage.nextSibling);
      if(tools) kindRow.parentNode.insertBefore(tools,kindRow.nextSibling);
    }
  }else if(tools&&stage.nextSibling!==tools){
    stage.parentNode.insertBefore(tools,stage.nextSibling);
  }
  var scale=$('patExScale');if(scale&&stage.contains(cv)&&scale.parentNode!==stage){stage.appendChild(scale)}
  /* hide zoom gallery */
  var gal=$('patGal106');
  if(gal){
    el.querySelectorAll('h3').forEach(function(x){if(/gallery|galería/i.test(x.textContent||'')&&x.parentNode)x.parentNode.removeChild(x)});
    var prev=gal.previousElementSibling;if(prev&&/Up to|Hasta/i.test(prev.textContent||'')&&prev.parentNode)prev.parentNode.removeChild(prev);
    gal.parentNode.removeChild(gal);
  }
  var ex=PAT106.ex||{},m=ex.mode163||'';
  el.classList.toggle('zoom-hunt181',m==='baby'||m==='antenna');
  var hint=$('patHint163');
  var line=kidHint181(m,ex);
  if(!hint&&line){
    hint=document.createElement('p');hint.className='soft';hint.id='patHint163';
    var tools=card.querySelector('[data-tools163]');
    if(tools&&tools.parentNode) tools.parentNode.insertBefore(hint,tools.nextSibling);
    else card.appendChild(hint);
  }
  if(hint&&line) hint.textContent=line;
  if(ex.msg){
    var msg=$('patExMsg');
    var k=kidHint181('',ex);
    if(k&&msg) msg.textContent=k;
    if(k&&hint&&(m==='baby'||m==='antenna')) hint.textContent=k;
  }
  /* Reset + colors */
  if(!el.querySelector('[data-g181reset="zoom"]')){
    var bar=document.createElement('div');bar.className='g181-row';
    bar.innerHTML='<button type="button" data-g181reset="zoom">'+esc181(t181('Reset'))+'</button>'+palButtons181(ex.pal181||0);
    var back=el.querySelector('button[onclick*="patExBack106"]');
    var row=back&&back.parentNode;
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-g181reset="zoom"]').onclick=function(){
      try{
        var home=typeof patExKindHome106==='function'?patExKindHome106('mandel'):{kind:'mandel',cx:-0.5,cy:0,span:3.5};
        Object.assign(PAT106.ex,home,{limit:false,msg:'',mode163:''});
        if(typeof patExDraw106==='function') patExDraw106();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        PAT106.ex.pal181=i;
        try{
          if(typeof patExDraw106==='function') patExDraw106();
          var c=document.getElementById('patExCv');
          if(c) c.style.filter=i?('hue-rotate('+(i*36)+'deg) saturate(1.05)'):'';
        }catch(e){}
      };
    });
  }else{
    var c=document.getElementById('patExCv');
    if(c&&ex.pal181) c.style.filter='hue-rotate('+(ex.pal181*36)+'deg) saturate(1.05)';
  }
  try{if(cv&&(m==='baby'||m==='antenna')) cv.scrollIntoView({block:'nearest',behavior:reduced181()?'auto':'smooth'})}catch(e){}
}
function wrapZoom181(){
  /* setMode163 lives inside the v163 IIFE (exported as IL163.setMode), not as a global.
     Publish a global wrapper so hunts can be entered from tests and always land on Mandelbrot home. */
  var rawSet=(root.IL163&&typeof IL163.setMode==='function')?IL163.setMode:(typeof root.setMode163==='function'&&!root.setMode163._v181?root.setMode163:null);
  if(!root.setMode163||!root.setMode163._v181){
    var wrapped=function(m){
      if(m==='baby'||m==='antenna'){
        try{
          if(PAT106&&PAT106.ex){
            var home=typeof patExKindHome106==='function'?patExKindHome106('mandel'):{kind:'mandel',cx:-0.5,cy:0,span:3.5};
            Object.assign(PAT106.ex,home,{limit:false,msg:'',mode163:m});
          }
        }catch(e){}
      }
      var r=rawSet?rawSet.apply(this,arguments):undefined;
      if(m==='baby'||m==='antenna'){
        forceHuntHome181();
        try{if(typeof patExDraw106==='function') patExDraw106()}catch(e2){}
      }
      try{layoutZoom181()}catch(e3){}
      return r;
    };
    wrapped._v181=1;
    root.setMode163=wrapped;
    try{if(root.IL163) IL163.setMode=wrapped}catch(e){}
  }
  if(typeof patExDraw106==='function'&&!patExDraw106._v181){
    hook('patExDraw106',function(prev){
      return function(){
        var r=prev.apply(this,arguments);
        try{layoutZoom181()}catch(e){}
        return r;
      };
    });
  }
  if(typeof patExSetKind106==='function'&&!patExSetKind106._v181){
    hook('patExSetKind106',function(prev){
      return function(kind){
        try{
          var m=PAT106&&PAT106.ex&&PAT106.ex.mode163;
          if((m==='baby'||m==='antenna')&&kind!=='mandel') return;
        }catch(e){}
        return prev.apply(this,arguments);
      };
    });
  }
}

/* ---- Same Shape upgrade: scale + find-it ---- */
function sameQuiz181(fam){
  var keys=Object.keys(typeof PAT_PAIRS106==='object'?PAT_PAIRS106:{});
  var f=PAT_PAIRS106[fam];if(!f)return '';
  var items=f.items.slice();
  var prompt=items[0];
  var right=items[Math.min(1,items.length-1)];
  var others=[];
  keys.forEach(function(k){if(k!==fam){var it=PAT_PAIRS106[k].items[0];if(it) others.push({fam:k,it:it})}});
  others.sort(function(){return Math.random()-0.5});
  var choices=[{ok:1,it:right,fam:fam}].concat(others.slice(0,2).map(function(o){return {ok:0,it:o.it,fam:o.fam}}));
  choices.sort(function(){return Math.random()-0.5});
  function cap(it){try{return (typeof patPairLang106==='function'?patPairLang106(it):it).t}catch(e){return it.en&&it.en.t||it.id}}
  function art(id){return typeof patPairArt106==='function'?patPairArt106(id):''}
  return '<div class="same181" data-same181="1" data-fam="'+esc181(fam)+'">'+
    '<p class="soft">'+esc181(t181('Which of these is the same shape as this one?'))+'</p>'+
    '<div class="frac181-pic" data-same-prompt="1">'+art(prompt.id)+'<p class="kline"><b>'+esc181(cap(prompt))+'</b></p></div>'+
    '<div class="same181-quiz">'+choices.map(function(c,i){
      return '<button type="button" class="hubtile" data-same181-ok="'+c.ok+'" data-i="'+i+'">'+art(c.it.id)+'<small>'+esc181(cap(c.it))+'</small></button>';
    }).join('')+'</div><p class="soft" data-same181-msg aria-live="polite"></p></div>';
}
function enhanceSame181(fam){
  var el=$('patterns');if(!el||!fam)return;
  if(el.querySelector('[data-same181]'))return;
  var box=document.createElement('div');
  box.innerHTML='<div class="same181-scale g181-row">'+
    '<button type="button" data-same181-sz="-1">'+esc181(t181('Make it smaller'))+'</button>'+
    '<button type="button" data-same181-sz="1">'+esc181(t181('Make it bigger'))+'</button>'+
    '<button type="button" data-g181reset="same">'+esc181(t181('Reset'))+'</button></div>'+
    '<p class="soft">'+esc181(t181('Same shape, different size.'))+'</p>'+
    palButtons181(0)+sameQuiz181(fam);
  var zoom=el.querySelector('.pat-zoombox');
  if(zoom&&zoom.parentNode) zoom.parentNode.insertBefore(box,zoom.nextSibling);
  else el.appendChild(box);
  var scale=1;
  function applySz(){
    el.querySelectorAll('.pat-art svg, .pat-art .lamp-art63, [data-same-prompt] svg').forEach(function(svg){
      svg.style.transform='scale('+scale+')';
      svg.style.transformOrigin='center';
    });
  }
  box.querySelectorAll('[data-same181-sz]').forEach(function(b){
    b.onclick=function(){scale=Math.max(0.6,Math.min(1.8,scale+(+b.getAttribute('data-same181-sz'))*0.2));applySz()};
  });
  var rst=box.querySelector('[data-g181reset="same"]');
  if(rst) rst.onclick=function(){scale=1;applySz();if(typeof patSameDraw106==='function') patSameDraw106(fam)};
  box.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){
      var i=+b.getAttribute('data-g181pal-i');
      var p=PAL[i];if(!p)return;
      box.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
      el.querySelectorAll('.pat-art, [data-same181]').forEach(function(n){n.style.filter='hue-rotate('+(i*36)+'deg)'});
    };
  });
  box.querySelectorAll('[data-same181-ok]').forEach(function(b){
    b.onclick=function(){
      var ok=b.getAttribute('data-same181-ok')==='1';
      var msg=box.querySelector('[data-same181-msg]');
      if(msg) msg.textContent=ok?t181('Yes — same shape.'):t181('Not that one. Try another.');
      if(ok){b.classList.add('on');box.querySelectorAll('[data-same181-ok="0"]').forEach(function(x){x.disabled=true})}
    };
  });
}

/* ---- Half and Quarter upgrade ---- */
function enhanceFrac181(){
  var el=$('patterns');if(!el)return;
  try{if(typeof PAT106!=='object'||PAT106.unit!=='frac')return}catch(e){return}
  if(el.querySelector('[data-g181frac]')) return;
  var f=PAT106.frac||{};
  var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181frac','1');
  bar.innerHTML='<button type="button" data-frac181="half">'+esc181(t181('Half'))+'</button>'+
    '<button type="button" data-frac181="quarter">'+esc181(t181('Quarter'))+'</button>'+
    '<button type="button" data-g181reset="frac">'+esc181(t181('Reset'))+'</button>'+
    palButtons181(f.pal181||0)+
    '<p class="soft" data-frac181-count aria-live="polite"></p>';
  var card=el.querySelector('.card')||el;
  card.appendChild(bar);
  function setCount(text){var n=bar.querySelector('[data-frac181-count]');if(n)n.textContent=text||''}
  function applyPal(i){
    f.pal181=i;
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',+x.getAttribute('data-g181pal-i')===i)});
    el.querySelectorAll('svg, canvas').forEach(function(n){n.style.filter=i?('hue-rotate('+(i*36)+'deg)'):''});
  }
  bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){b.onclick=function(){applyPal(+b.getAttribute('data-g181pal-i'))}});
  bar.querySelector('[data-g181reset="frac"]').onclick=function(){
    try{
      if(typeof patShareDraw106==='function'&&el.querySelector('[onclick*="patShareGive106"], .pat-share, [data-share]')){patShareNew106();return}
      if(typeof patJarDraw106==='function'&&(f.fill!=null||el.querySelector('[onclick*="patJarPour106"]'))){patJarNew106();return}
      if(typeof patFoldDraw106==='function'&&(f.folds!=null||el.querySelector('[onclick*="patFoldOnce106"]'))){patFoldNew106();return}
      if(typeof patFracHome106==='function') patFracHome106();
    }catch(e){}
  };
  bar.querySelector('[data-frac181="half"]').onclick=function(){
    try{
      if(el.querySelector('[onclick*="patShareGive106"]')|| (f.n!=null&&f.given)){PAT106.frac={n:2,given:[],ok:false,pal181:f.pal181};patShareDraw106();setCount(t181('2 of 2 pieces. Each one is a half.'));return}
      if(f.fill!=null||el.querySelector('[onclick*="patJarPour106"]')){PAT106.frac={fill:0.5,goal:'half',pal181:f.pal181};patJarDraw106();setCount(t181('The jar is half full.'));return}
      if(f.folds!=null||el.querySelector('[onclick*="patFoldOnce106"]')){PAT106.frac={folds:1,pal181:f.pal181};patFoldDraw106();setCount(t181('Folded in half.'));return}
    }catch(e){}
  };
  bar.querySelector('[data-frac181="quarter"]').onclick=function(){
    try{
      if(el.querySelector('[onclick*="patShareGive106"]')||(f.n!=null&&f.given)){PAT106.frac={n:4,given:[],ok:false,pal181:f.pal181};patShareDraw106();setCount(t181('4 of 4 pieces. Each one is a quarter.'));return}
      if(f.fill!=null||el.querySelector('[onclick*="patJarPour106"]')){PAT106.frac={fill:0.25,goal:'quarter',pal181:f.pal181};patJarDraw106();setCount(t181('The jar is a quarter full.'));return}
      if(f.folds!=null||el.querySelector('[onclick*="patFoldOnce106"]')){PAT106.frac={folds:2,pal181:f.pal181};patFoldDraw106();setCount(t181('Folded in quarters.'));return}
    }catch(e){}
  };
  /* initial count if already in a mode */
  if(f.n===2) setCount(t181('2 of 2 pieces. Each one is a half.'));
  else if(f.n===4) setCount(t181('4 of 4 pieces. Each one is a quarter.'));
  else if(f.fill===0.5) setCount(t181('The jar is half full.'));
  else if(f.fill===0.25||f.fill===0.26) setCount(t181('The jar is a quarter full.'));
  else if(f.folds===1) setCount(t181('Folded in half.'));
  else if(f.folds>=2) setCount(t181('Folded in quarters.'));
}

/* ---- See Your Sound: 56 px dials, slow replay, favorite ---- */
function enhanceSee181(){
  var el=$('patterns');if(!el||!$('sys177cv'))return;
  if(el.querySelector('[data-g181see]'))return;
  var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181see','1');
  bar.innerHTML='<button type="button" data-see181="slow">'+esc181(t181('Draw it slowly'))+'</button>'+
    '<button type="button" data-see181="fav">'+esc181(t181('Favorite pair'))+'</button>'+
    '<button type="button" data-see181="load">'+esc181(t181('Show my favorite'))+'</button>'+
    '<button type="button" data-g181reset="see">'+esc181(t181('Reset'))+'</button>'+
    palButtons181(0)+
    '<p class="soft" data-see181-msg aria-live="polite"></p>';
  var wrap=$('sys177wrap')||el;
  wrap.appendChild(bar);
  var msg=bar.querySelector('[data-see181-msg]');
  function favKey(){return 'lamp_sys177fav@'+pid181()}
  bar.querySelector('[data-see181="fav"]').onclick=function(){
    try{
      var S=root.IL177&&IL177.state;if(!S)return;
      localStorage.setItem(favKey(),JSON.stringify({a:S.a,b:S.b}));
      if(msg) msg.textContent=t181('Saved this pair.');
    }catch(e){}
  };
  bar.querySelector('[data-see181="load"]').onclick=function(){
    try{
      var v=JSON.parse(localStorage.getItem(favKey())||'null'),S=root.IL177&&IL177.state;
      if(!v||!S)return;
      S.a=v.a;S.b=v.b;
      if(typeof IL177.open==='function') IL177.open();
    }catch(e){}
  };
  bar.querySelector('[data-g181reset="see"]').onclick=function(){
    try{
      var S=root.IL177&&IL177.state;if(!S)return;
      S.a=2;S.b=3;
      if(typeof IL177.open==='function') IL177.open();
    }catch(e){}
  };
  bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
    b.onclick=function(){
      var i=+b.getAttribute('data-g181pal-i');
      var cv=$('sys177cv');if(cv) cv.style.filter=i?('hue-rotate('+(i*36)+'deg) saturate(1.1)'):'';
      bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
    };
  });
  bar.querySelector('[data-see181="slow"]').onclick=function(){
    try{
      var S=root.IL177&&IL177.state,cv=$('sys177cv');if(!S||!cv)return;
      if(S.raf){try{cancelAnimationFrame(S.raf)}catch(e){}S.raf=0}
      var p=(IL177.PAIRS&&IL177.PAIRS[S.a+','+S.b])||[S.a,S.b,1,220,220,0];
      var ra=p[0],rb=p[1],d=p[2]?Math.PI/2:0;
      var x=cv.getContext('2d'),w=cv.width,h=cv.height,cx=w/2,cy=h/2,sc=w*.36;
      var gold=getComputedStyle(cv).filter&&false;
      x.fillStyle='#120E18';x.fillRect(0,0,w,h);
      x.strokeStyle='rgba(230,180,84,0.9)';x.lineWidth=Math.max(2,w/300);x.lineJoin=x.lineCap='round';
      var n=0,total=720,steps=reduced181()?720:36;
      function step(){
        var upto=Math.min(total,n+Math.ceil(total/steps));
        x.beginPath();
        for(var i=0;i<=upto;i++){
          var tt=i/720,px=cx+sc*Math.sin(2*Math.PI*ra*tt),py=cy-sc*Math.sin(2*Math.PI*rb*tt+d);
          if(i)x.lineTo(px,py);else x.moveTo(px,py);
        }
        x.fillStyle='#120E18';x.fillRect(0,0,w,h);x.stroke();
        n=upto;
        if(n<total) setTimeout(step,reduced181()?0:28);
        else if(typeof IL177.open==='function'){ /* leave the finished slow drawing; live loop can resume on next dial */ }
      }
      step();
    }catch(e){}
  };
}

/* ---- Sound Draws Shapes upgrade (Ignacio: yes, per the spec; no hold flag) ---- */
/* Kid labels match the settled sand, counted as closed connected components
   (disk r=11, min 80 px, 8-connected, on the circular plate). (1,2) draws 3
   curves — a diagonal and two corner arcs — not 2 lines (LESSONS rule 7). */
var SOUND_MODES181=[
  [1,2,'3 curves'],[1,3,'a sun'],[2,3,'a zigzag'],[1,4,'branches'],[2,4,'a cross and a ring'],[3,4,'little dashes'],
  [2,5,'a loop'],[3,5,'a flower'],[1,5,'a star'],[1,6,'twigs'],[2,6,'a web'],[3,6,'loops'],
  [4,5,'a shower'],[4,6,'a star in the middle'],[2,7,'many marks'],[3,7,'a star and little stars']
];
var SOUND_RIDGES181={ /* expected piece counts after close r=11; (1,2) is exact */
  '1,2':[3,3],'1,3':[3,10],'2,3':[7,13],'1,4':[4,12],'2,4':[12,16],'3,4':[17,23],
  '2,5':[12,20],'3,5':[14,24],'1,5':[8,16],'1,6':[14,21],'2,6':[6,16],'3,6':[19,27],
  '4,5':[19,29],'4,6':[18,26],'2,7':[18,28],'3,7':[17,26]
};
function expandSoundModes181(){
  try{
    if(typeof PAT_MODES106==='undefined'||!PAT_MODES106)return;
    SOUND_MODES181.forEach(function(m){
      var has=PAT_MODES106.some(function(x){return x[0]===m[0]&&x[1]===m[1]});
      if(!has) PAT_MODES106.push([m[0],m[1]]);
    });
  }catch(e){}
}
function soundLabel181(n,m){
  var i,lab=n+' · '+m;
  for(i=0;i<SOUND_MODES181.length;i++) if(SOUND_MODES181[i][0]===n&&SOUND_MODES181[i][1]===m) lab=t181(SOUND_MODES181[i][2]);
  return lab;
}
function enhanceSound181(){
  var el=$('patterns');if(!el||!$('patChCv'))return;
  expandSoundModes181();
  var st=PAT106.ch||{};
  /* relabel mode buttons; if the original row is short, rebuild it */
  var row=el.querySelector('.pat-row');
  if(row){
    var have=row.querySelectorAll('button[onclick*="patSoundMode106"]').length;
    if(have<SOUND_MODES181.length){
      row.innerHTML=SOUND_MODES181.map(function(m){
        var on=(st.n===m[0]&&st.m===m[1])?'on':'';
        return '<button type="button" class="'+on+'" onclick="patSoundMode106('+m[0]+','+m[1]+')">'+esc181(t181(m[2]))+'</button>';
      }).join('');
    }else{
      row.querySelectorAll('button[onclick*="patSoundMode106"]').forEach(function(b){
        var m=/patSoundMode106\((\d+),(\d+)\)/.exec(b.getAttribute('onclick')||'');
        if(m) b.textContent=soundLabel181(+m[1],+m[2]);
      });
    }
  }
  var cv=$('patChCv');
  if(cv){
    if(!st.plate) st.plate='circle';
    cv.classList.toggle('plate-circle181', st.plate==='circle');
  }
  if(!el.querySelector('[data-g181sound]')){
    var bar=document.createElement('div');bar.className='g181-row';bar.setAttribute('data-g181sound','1');
    bar.innerHTML='<button type="button" data-sound181-plate="1">'+esc181(t181(st.plate==='square'?'Square plate':'Circle plate'))+'</button>'+
      '<button type="button" data-g181reset="sound">'+esc181(t181('Reset'))+'</button>'+palButtons181(st.pal181||0);
    if(row&&row.parentNode) row.parentNode.insertBefore(bar,row.nextSibling);
    else el.appendChild(bar);
    bar.querySelector('[data-sound181-plate]').onclick=function(){
      st.plate=st.plate==='circle'?'square':'circle';
      if(cv) cv.classList.toggle('plate-circle181', st.plate==='circle');
      this.textContent=t181(st.plate==='square'?'Square plate':'Circle plate');
    };
    bar.querySelector('[data-g181reset="sound"]').onclick=function(){
      try{
        if(PAT106.ch){PAT106.ch.n=1;PAT106.ch.m=2;PAT106.ch.plate='circle';PAT106.ch.pal181=0}
        if(typeof patSoundDraw106==='function') patSoundDraw106();
      }catch(e){}
    };
    bar.querySelectorAll('[data-g181pal-i]').forEach(function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-g181pal-i');
        st.pal181=i;
        if(cv) cv.style.filter=i?('hue-rotate('+(i*28)+'deg) saturate(1.15)'):'';
        bar.querySelectorAll('[data-g181pal-i]').forEach(function(x){x.classList.toggle('on',x===b)});
      };
    });
  }
  if(cv&&st.pal181) cv.style.filter='hue-rotate('+(st.pal181*28)+'deg) saturate(1.15)';
  /* Soft sounds: stop a leftover tone if Soft sounds is off */
  try{
    if(typeof lampSfxOn73==='function'&&!lampSfxOn73()&&PAT106.ch&&PAT106.ch.osc){try{PAT106.ch.osc.stop()}catch(e){}}
  }catch(e){}
}
function soundDrawsUpgrade181(){ enhanceSound181(); }

/* ---- Paint hide tools ---- */
var paintHidden181=false;
function paintHideKey(){return 'lamp_paint_hide@'+pid181()}
function loadPaintHide181(){
  try{var v=sessionStorage.getItem(paintHideKey());if(v==='1')paintHidden181=true;if(v==='0')paintHidden181=false}catch(e){}
}
function savePaintHide181(){
  try{sessionStorage.setItem(paintHideKey(),paintHidden181?'1':'0')}catch(e){}
}
function paintHideUI181(){
  var s=$('pstudio');if(!s)return;
  loadPaintHide181();
  if(!s.querySelector('.paint-hidebtn181')){
    var btn=document.createElement('button');
    btn.type='button';btn.className='paint-hidebtn181';
    btn.textContent=t181('Hide tools');
    var bar=s.querySelector('.pbar101')||s.querySelector('.pbar');
    if(bar) bar.appendChild(btn);else s.insertBefore(btn,s.firstChild);
    btn.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      if(s.hasAttribute('data-paint-ptr')) return;
      paintHidden181=true;savePaintHide181();applyPaintHide181();
    });
  }
  if(!s.querySelector('.paint-tab181')){
    var tab=document.createElement('button');
    tab.type='button';tab.className='paint-tab181';tab.textContent=t181('Tools');
    s.appendChild(tab);
    tab.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      paintHidden181=false;savePaintHide181();applyPaintHide181();
    });
  }
  if(!s.querySelector('.paint-leave181')){
    var leave=document.createElement('button');
    leave.type='button';leave.className='paint-leave181';
    leave.textContent=(typeof gT==='function'?gT('Leave'):'Leave');
    if(esLang()) leave.textContent=(typeof gT==='function'?gT('Leave'):'Salir');
    s.appendChild(leave);
    leave.addEventListener('click',function(){try{show('hub')}catch(e){}});
  }
  /* no accidental hide mid-stroke */
  if(!s._v181ptr){
    s._v181ptr=1;
    s.addEventListener('pointerdown',function(){s.setAttribute('data-paint-ptr','1')});
    s.addEventListener('pointerup',function(){s.removeAttribute('data-paint-ptr')});
    s.addEventListener('pointercancel',function(){s.removeAttribute('data-paint-ptr')});
  }
  applyPaintHide181();
}
function applyPaintHide181(){
  var s=$('pstudio');if(!s)return;
  s.classList.toggle('paint-hide181',!!paintHidden181);
  var btn=s.querySelector('.paint-hidebtn181');
  if(btn) btn.textContent=t181('Hide tools');
  var tab=s.querySelector('.paint-tab181');
  if(tab) tab.textContent=t181('Tools');
}

/* ---- shared install hooks ---- */
function wrapGrow181(){
  if(typeof patGrowDraw106==='function'&&!patGrowDraw106._v181){
    hook('patGrowDraw106',function(prev){return function(){var r=prev.apply(this,arguments);try{tidyGrow181()}catch(e){}return r}});
  }
  if(typeof extraUI==='function'&&!extraUI._v181){
    hook('extraUI',function(prev){return function(){var r=prev.apply(this,arguments);try{tidyGrow181()}catch(e){}return r}});
  }
  if(typeof fixUI==='function'&&!fixUI._v181){
    hook('fixUI',function(prev){return function(){var r=prev.apply(this,arguments);try{tidyGrow181()}catch(e){}return r}});
  }
  if(typeof patGrowStep106==='function'&&!patGrowStep106._v181){
    hook('patGrowStep106',function(prev){return function(){var r=prev.apply(this,arguments);try{ensureFloat181();tidyGrow181()}catch(e){}return r}});
  }
  if(typeof patGrowKeep106==='function'&&!patGrowKeep106._v181){
    hook('patGrowKeep106',function(prev){
      return function(){
        try{
          var g=PAT106.grow;if(g) g.msg=t181('Holding this seed on this screen.');
          var msg=$('patGrowMsg');if(msg) msg.textContent=t181('Holding this seed on this screen.');
        }catch(e){}
        /* Do not write the 24-slot gallery. Zoom's Keep path (patExKeep106) stays for the seatbelt redraw test. */
      };
    });
  }
}
function wrapUnits181(){
  if(typeof patSameDraw106==='function'&&!patSameDraw106._v181){
    hook('patSameDraw106',function(prev){
      return function(fam){
        var r=prev.apply(this,arguments);
        try{if(fam) enhanceSame181(fam)}catch(e){}
        return r;
      };
    });
  }
  ['patFracHome106','patShareDraw106','patJarDraw106','patFoldDraw106'].forEach(function(n){
    if(typeof root[n]==='function'&&!root[n]._v181){
      hook(n,function(prev){return function(){var r=prev.apply(this,arguments);try{enhanceFrac181()}catch(e){}return r}});
    }
  });
  if(typeof patOpen106==='function'&&!patOpen106._v181){
    hook('patOpen106',function(prev){
      return function(u){
        if(u==='sunflower'||u==='look'||(u==='honeycomb'&&root.V181_REMOVE_HONEYCOMB)){
          return prev.call(this,null);
        }
        if(u==='endless'){ehOpen181();return}
        if(u==='loom'){loomOpen181();return}
        var r=prev.apply(this,arguments);
        try{
          if(!u) tidyPatterns181();
          if(u==='grow') tidyGrow181();
          if(u==='zoom') layoutZoom181();
          if(u==='seesound') enhanceSee181();
          if(u==='same'){/* home list: no quiz yet */}
          if(u==='frac') enhanceFrac181();
          if(u==='sound') enhanceSound181();
          if(u==='honeycomb') enhanceHex181();
        }catch(e){}
        return r;
      };
    });
  }
  if(typeof renderPatterns106==='function'&&!renderPatterns106._v181){
    hook('renderPatterns106',function(prev){
      return function(){var r=prev.apply(this,arguments);try{tidyPatterns181()}catch(e){}return r};
    });
  }
  if(typeof RENDER==='object'&&RENDER.patterns&&!RENDER.patterns._v181){
    var pr=RENDER.patterns;
    RENDER.patterns=function(){
      var r=pr.apply(this,arguments);
      try{
        if(typeof PAT106==='object'&&PAT106.unit){
          if(PAT106.unit==='grow') tidyGrow181();
          else if(PAT106.unit==='zoom') layoutZoom181();
          else if(PAT106.unit==='seesound') enhanceSee181();
          else if(PAT106.unit==='frac') enhanceFrac181();
          else if(PAT106.unit==='sound') enhanceSound181();
          else if(PAT106.unit==='honeycomb') enhanceHex181();
          else if(PAT106.unit==='endless') ehDraw181();
          else if(PAT106.unit==='loom') loomDraw181();
          else tidyPatterns181();
        }else tidyPatterns181();
      }catch(e){}
      return r;
    };
    RENDER.patterns._v181=1;
  }
  if(typeof renderPaint==='function'&&!renderPaint._v181){
    hook('renderPaint',function(prev){return function(){var r=prev.apply(this,arguments);try{paintHideUI181()}catch(e){}return r}});
  }
  if(typeof renderPaintBar==='function'&&!renderPaintBar._v181){
    hook('renderPaintBar',function(prev){return function(){var r=prev.apply(this,arguments);try{paintHideUI181()}catch(e){}return r}});
  }
  if(typeof hexDraw124==='function'&&!hexDraw124._v181){
    hook('hexDraw124',function(prev){return function(){var r=prev.apply(this,arguments);try{enhanceHex181()}catch(e){}return r}});
  }
  if(typeof patSoundRun106==='function'&&!patSoundRun106._v181){
    hook('patSoundRun106',function(prev){return function(){return patSoundRun181()}});
  }else if(typeof root.patSoundRun106==='undefined'){
    root.patSoundRun106=patSoundRun181;
  }
  if(typeof patSoundDraw106==='function'&&!patSoundDraw106._v181){
    hook('patSoundDraw106',function(prev){
      return function(){
        expandSoundModes181();
        var r=prev.apply(this,arguments);
        try{enhanceSound181()}catch(e){}
        return r;
      };
    });
  }
  if(typeof patSoundTone106==='function'&&!patSoundTone106._v181){
    hook('patSoundTone106',function(prev){
      return function(){
        try{if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return}catch(e){}
        return prev.apply(this,arguments);
      };
    });
  }
}

function install(){
  css();
  clearUpgrade181();
  fixSnail181();
  wrapShow181();
  wrapGrow181();
  wrapZoom181();
  wrapUnits181();
  bootReveal181();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL181={
  version:181,
  flags:{removeHoneycomb:!!root.V181_REMOVE_HONEYCOMB,soundDrawsUpgrade:!!root.V181_SOUND_DRAWS_UPGRADE},
  palettes:PAL,
  t:t181,
  reveal:reveal181,
  settleSound:soundSettleNow181,
  loomOpen:loomOpen181,
  loomBloomAt:loomBloomAt181,
  soundModes:SOUND_MODES181,
  soundRidges:SOUND_RIDGES181
};
root.LOOM181=LOOM181;
root.loomOpen181=loomOpen181;
root.loomDraw181=loomDraw181;
root.loomBloomAt181=loomBloomAt181;
root.loomRingCount181=loomRingCount181;
root.soundSettleNow181=soundSettleNow181;
root.ehOpen181=ehOpen181;
root.ehDraw181=ehDraw181;
root.EH181=EH181;
root.enhanceFrac181=enhanceFrac181;

})(typeof window!=='undefined'?window:this);
