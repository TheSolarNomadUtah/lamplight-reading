/* v148: Group B small delights — goodnight pose, picker tiles at the
   current growth stage, companion signature notes on the shared bus,
   moon glint on glow nights, a 3-tap first-run tour, and “Take it
   outside” closing lines (text only). Idle blink is not given a new
   flash; the pose reuses .il-wo / .il-wc and reduced motion is a still.
   Looks polish at il-xs (44 px) only: merge tiny glass voronoi cells,
   and raise constellation star radius and line opacity ~20%.
   Official Dragon and egg art are left as they are. Voices are unchanged.
   Does not wrap show(). */
(function(root){
'use strict';

function t148(s,o){return typeof gT==='function'?gT(s,o):s}
function e148(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function pid148(){try{return (typeof curPid==='function'&&curPid())||''}catch(e){return ''}}
function reduce148(){
  try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
  try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return true}catch(e){}
  return !!(document.documentElement.classList.contains('reduce73')||document.body.classList.contains('reduce73')||document.querySelector('.reduce73'));
}
function rawGet148(k){try{return (typeof RAW!=='undefined'&&RAW.get)?RAW.get(k):localStorage.getItem(k)}catch(e){return null}}
function rawSet148(k,v){try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(k,v);else localStorage.setItem(k,v)}catch(e){}}
function sfxOn148(){try{return typeof lampSfxOn73==='function'?!!lampSfxOn73():(typeof LAMP_SFX==='undefined'||LAMP_SFX!==false)}catch(e){return true}}

function css148(){
  if(document.getElementById('v148css'))return;
  var st=document.createElement('style');
  st.id='v148css';
  st.textContent=[
    /* Goodnight pose (from art/prelaunch/goodnight.css). Loaded last so
       it overrides existing idle-blink .il-wo / .il-wc rules. No flash.
       Reduced motion is the settled still (eyes closed, halo dim, 2 px down). */
    'svg.il-gn .il-gn-body{animation:ilgny 3s ease-out forwards}',
    'svg.il-gn .il-wo{animation:ilgnwo .7s ease-in-out forwards}',
    'svg.il-gn .il-wc{opacity:0;animation:ilgnwc .7s ease-in-out forwards}',
    'svg.il-gn .il-aura{animation:ilgna 3s ease-out forwards}',
    '@keyframes ilgnwo{0%{opacity:1}45%,100%{opacity:0}}',
    '@keyframes ilgnwc{0%{opacity:0}45%,100%{opacity:1}}',
    '@keyframes ilgna{to{opacity:.28}}',
    '@keyframes ilgny{to{transform:translateY(2px)}}',
    '@media(prefers-reduced-motion:reduce){svg.il-gn .il-gn-body,svg.il-gn .il-wo,svg.il-gn .il-wc,svg.il-gn .il-aura{animation:none}svg.il-gn .il-gn-body{transform:translateY(2px)}svg.il-gn .il-wo{opacity:0}svg.il-gn .il-wc{opacity:1}svg.il-gn .il-aura{opacity:.28}}',
    '.reduce73 svg.il-gn .il-gn-body,.reduce73 svg.il-gn .il-wo,.reduce73 svg.il-gn .il-wc,.reduce73 svg.il-gn .il-aura,svg.il-gn.reduce73 .il-gn-body,svg.il-gn.reduce73 .il-wo,svg.il-gn.reduce73 .il-wc,svg.il-gn.reduce73 .il-aura{animation:none}',
    '.reduce73 svg.il-gn .il-gn-body,svg.il-gn.reduce73 .il-gn-body{transform:translateY(2px)}',
    '.reduce73 svg.il-gn .il-wo,svg.il-gn.reduce73 .il-wo{opacity:0}',
    '.reduce73 svg.il-gn .il-wc,svg.il-gn.reduce73 .il-wc{opacity:1}',
    '.reduce73 svg.il-gn .il-aura,svg.il-gn.reduce73 .il-aura{opacity:.28}',
    /* Moon glint: still, no flash. Only on glow-night companions. */
    'svg.il-glow-night .il-moon-glint{fill:#FFF6D8;opacity:.7;pointer-events:none}',
    '@media(prefers-reduced-motion:reduce){svg.il-glow-night .il-moon-glint{opacity:.55}}',
    /* il-xs glass: hide full voronoi, show merged tiny cells. 88 px unchanged. */
    '.il-voro-sm{display:none}',
    'svg.il-xs .il-voro-full{display:none}',
    'svg.il-xs .il-voro-sm{display:inline}',
    /* il-xs constellation: star radius and line opacity +~20%. 88 px unchanged. */
    'svg.il-xs circle[fill="#FFF6D8"]{transform-box:fill-box;transform-origin:center;transform:scale(1.2)}',
    'svg.il-xs path[stroke="#D9C9A8"][opacity=".82"]{opacity:.984}',
    'svg.il-xs [stroke="#D9C9A8"][opacity=".42"]{opacity:.504}',
    /* Tour + take-it-outside */
    '.tour148{max-width:26rem;padding:1.2rem 1.4rem;border:none;border-radius:20px;background:var(--card,#fffaf0);color:var(--ink,#3a3228);text-align:center}',
    '.tour148::backdrop{background:#1a142088}',
    '.tour148 .row148{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}',
    '.tour148 button{min-width:56px;min-height:56px}',
    '.tour148 .friendPick101{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
    '.tour148 .style148{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
    '.out148{margin:.8em 0 0;color:var(--ink,#3a3228);line-height:1.45}',
    '#btwrap .gn148{width:120px;margin:12px auto 0}',
    '#candle .gn148-slot, #candleLamp129.il-gn-host{display:block}'
  ].join('');
  document.head.appendChild(st);
}

/* ---- 44 px glass: merge voronoi cells under ~2.5% of the silhouette area ---- */
function area148(poly){
  var a=0,n=poly&&poly.length||0,i,j;
  for(i=0,j=n-1;i<n;j=i++) a+=(poly[j][0]*poly[i][1]-poly[i][0]*poly[j][1]);
  return Math.abs(a)/2;
}
function ek148(a,b){
  function r(v){return Math.round(v*1e4)/1e4}
  var x1=r(a[0]),y1=r(a[1]),x2=r(b[0]),y2=r(b[1]);
  return (x1<x2||(x1===x2&&y1<y2))?x1+','+y1+'|'+x2+','+y2:x2+','+y2+'|'+x1+','+y1;
}
function mergeVoro148(src){
  var cells=(src&&src.cells||[]).map(function(c,i){return {j:i,i:c.i,site:c.site,poly:c.poly};});
  var n=cells.length;
  if(n<2) return {cells:cells};
  var areas=cells.map(function(c){return area148(c.poly);});
  var total=areas.reduce(function(s,a){return s+a;},0);
  if(!(total>0)) return {cells:cells};
  var edgeMap={},i,j,p,k,ids;
  cells.forEach(function(c,i){
    p=c.poly||[];
    for(j=0;j<p.length;j++){
      k=ek148(p[j],p[(j+1)%p.length]);
      if(!edgeMap[k])edgeMap[k]=[];
      if(edgeMap[k].indexOf(i)<0)edgeMap[k].push(i);
    }
  });
  var neigh=cells.map(function(){return [];});
  Object.keys(edgeMap).forEach(function(key){
    ids=edgeMap[key];
    if(ids.length===2){neigh[ids[0]].push(ids[1]);neigh[ids[1]].push(ids[0]);}
  });
  var parent=cells.map(function(_,i){return i;});
  function find(x){return parent[x]===x?x:(parent[x]=find(parent[x]));}
  var thresh=0.025*total,guard=0,changed=true;
  while(changed&&guard++<80){
    changed=false;
    var acc=cells.map(function(){return 0;});
    cells.forEach(function(_,i){acc[find(i)]+=areas[i];});
    var tiny=-1,tinyA=Infinity;
    acc.forEach(function(a,i){if(find(i)===i&&a>0&&a<thresh&&a<tinyA){tiny=i;tinyA=a;}});
    if(tiny<0)break;
    var best=-1,bestA=-1,seen={};
    cells.forEach(function(_,i){
      if(find(i)!==tiny)return;
      neigh[i].forEach(function(j){
        var r=find(j);
        if(r===tiny||seen[r])return;
        seen[r]=1;
        if(acc[r]>bestA){best=r;bestA=acc[r];}
      });
    });
    if(best<0){acc[tiny]=thresh;continue;}
    parent[tiny]=best;
    changed=true;
  }
  var groups={};
  cells.forEach(function(c,i){
    var r=find(i);
    if(!groups[r])groups[r]={j:r,parts:[]};
    groups[r].parts.push(c.poly);
  });
  var out=[];
  Object.keys(groups).forEach(function(key){
    var g=groups[key],ec={},edges=[];
    g.parts.forEach(function(poly){
      for(i=0;i<(poly||[]).length;i++){
        k=ek148(poly[i],poly[(i+1)%poly.length]);
        ec[k]=(ec[k]||0)+1;
      }
    });
    g.parts.forEach(function(poly){
      for(i=0;i<(poly||[]).length;i++){
        var a=poly[i],b=poly[(i+1)%poly.length];
        if(ec[ek148(a,b)]===1) edges.push([a,b]);
      }
    });
    g.parts.forEach(function(poly,pi){
      out.push({j:g.j,poly:poly,noStroke:true,edges:pi===g.parts.length-1?edges:undefined});
    });
  });
  return {n:src.n,sites:src.sites,cells:out};
}

/* ---- Goodnight pose ---- */
function wrapGn148(svg){
  if(!svg||svg.querySelector('.il-gn-body'))return;
  var NS='http://www.w3.org/2000/svg';
  var ink=svg.querySelector('.lamp73-ink');
  var g=document.createElementNS(NS,'g');
  g.setAttribute('class','il-gn-body');
  if(ink){
    while(ink.firstChild) g.appendChild(ink.firstChild);
    ink.appendChild(g);
  }else{
    var skip=function(n){
      if(!n||n.nodeType!==1)return true;
      var tag=n.tagName.toLowerCase(),cls=n.getAttribute('class')||'';
      if(tag==='defs'||tag==='style'||tag==='title')return true;
      if(/\blamp73-plate\b/.test(cls))return true;
      if(tag==='rect'&&(/dusk|il-dusk|il-sky-chip/.test(cls)||n.getAttribute('fill')==='#120E18'))return true;
      return false;
    };
    [].slice.call(svg.childNodes).forEach(function(n){if(!skip(n))g.appendChild(n);});
    svg.appendChild(g);
  }
}
function poseOn148(root){
  css148();
  var scope=root||document;
  var svgs=scope.querySelectorAll?scope.querySelectorAll('svg.lamp73-svg, svg[data-stage73]'):[];
  if(scope.tagName==='svg')svgs=[scope];
  svgs.forEach(function(svg){
    wrapGn148(svg);
    svg.classList.add('il-gn');
    if(reduce148())svg.classList.add('reduce73');
  });
}
function hookGoodnight148(){
  if(typeof candleGoodNight129==='function'&&!candleGoodNight129._v148){
    var prev=candleGoodNight129;
    candleGoodNight129=function(){
      var r=prev.apply(this,arguments);
      try{
        var host=$('candleLamp129')||document.querySelector('#candle .lamp73-shell')||$('candle');
        if(host)poseOn148(host);
      }catch(e){}
      return r;
    };
    candleGoodNight129._v148=1;
  }
  var w=$('btword');
  if(w&&!w._gn148){
    w._gn148=1;
    var settle=function(){
      var txt=w.textContent||'';
      if(!/Good night|Buenas noches/i.test(txt))return;
      var wrap=$('btwrap')||w.parentElement;
      if(wrap&&!wrap.querySelector('svg.lamp73-svg, .gn148')){
        var box=document.createElement('div');
        box.className='gn148';
        var art='';
        try{art=(typeof lampSvg73==='function'?lampSvg73((typeof lampViewStage74==='function'&&typeof lampLoad73==='function')?lampViewStage74(lampLoad73()):4,'',false):'')}catch(e){}
        box.innerHTML=art;
        wrap.appendChild(box);
      }
      poseOn148(wrap);
    };
    new MutationObserver(settle).observe(w,{childList:true,characterData:true,subtree:true});
    settle();
  }
}

/* ---- Moon glint on equinox / full-moon nights (v138) ---- */
function glowNight148(date){
  var d=date instanceof Date?date:new Date();
  function call(obj,name){
    try{if(obj&&typeof obj[name]==='function')return !!obj[name](d)}catch(e){}
    return false;
  }
  if(call(typeof MoonDusk131==='object'?MoonDusk131:null,'equinox'))return true;
  if(call(typeof IL138==='object'?IL138:null,'equinox'))return true;
  if(call(typeof MoonDusk131==='object'?MoonDusk131:null,'full'))return true;
  if(call(typeof IL138==='object'?IL138:null,'full'))return true;
  try{if(typeof moonEquinox138==='function'&&moonEquinox138(d))return true}catch(e){}
  try{if(typeof moonFull138==='function'&&moonFull138(d))return true}catch(e){}
  return false;
}
function glintOn148(svg){
  if(!svg||svg.querySelector('.il-moon-glint'))return;
  if(svg.querySelector('.il-sky-chip'))return;
  var NS='http://www.w3.org/2000/svg';
  var g=document.createElementNS(NS,'g');
  g.setAttribute('class','il-moon-glint');
  g.setAttribute('aria-hidden','true');
  var eyes=[];
  svg.querySelectorAll('circle').forEach(function(c){
    var fill=(c.getAttribute('fill')||'').toLowerCase();
    var r=parseFloat(c.getAttribute('r')||'0');
    if(r>=1.2&&r<=8&&/#2a2430|#163333|#1a1a1a|#120e18|#3a3228|#000/.test(fill)) eyes.push(c);
  });
  if(!eyes.length){
    svg.querySelectorAll('circle').forEach(function(c){
      var fill=(c.getAttribute('fill')||'');
      var r=parseFloat(c.getAttribute('r')||'0');
      if(r>0.5&&r<=2.2&&/#fff6d8|#f6efe0|#ffffff/i.test(fill)) eyes.push(c);
    });
  }
  eyes.slice(0,4).forEach(function(c){
    var cx=parseFloat(c.getAttribute('cx')||'0');
    var cy=parseFloat(c.getAttribute('cy')||'0');
    var r=Math.max(0.7,parseFloat(c.getAttribute('r')||'1')*0.35);
    var m=document.createElementNS(NS,'circle');
    m.setAttribute('class','il-moon-glint');
    m.setAttribute('cx',String(cx+r*0.6));
    m.setAttribute('cy',String(cy-r*0.7));
    m.setAttribute('r',String(r));
    g.appendChild(m);
  });
  if(g.childNodes.length)svg.appendChild(g);
}
function decorateGlow148(root){
  css148();
  var on=glowNight148();
  var scope=root||document;
  var svgs=scope.querySelectorAll?scope.querySelectorAll('svg.lamp73-svg, svg[data-stage73]'):[];
  svgs.forEach(function(svg){
    svg.classList.toggle('il-glow-night',on);
    if(on)glintOn148(svg);else{
      svg.querySelectorAll('.il-moon-glint').forEach(function(n){n.remove();});
    }
  });
}

/* ---- Signature notes on the v143 shared bus, within Bedtime Glow ---- */
var PENTA148=[261.63,293.66,329.63,392.00,440.00];
var MOTIF148={lamp:[0,2,4],moth:[2,4,3],owl:[4,3,1],turtle:[0,3,4],shell:[0,3,4],dragon:[3,1,0],phoenix:[4,2,0],sprites:[1,3,4],puff:[1,3,4],dew:[2,3,0],ember:[3,2,0],fox:[1,4,2]};
function motif148(kind){
  var k=String(kind||'lamp').toLowerCase();
  if(MOTIF148[k])return MOTIF148[k];
  var h=0,i;for(i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))|0;
  return [Math.abs(h)%5,Math.abs(h>>3)%5,Math.abs(h>>7)%5];
}
function note148(kind){
  if(!sfxOn148())return;
  var c=null;
  try{c=typeof ac==='function'?ac():(typeof AC!=='undefined'?AC:null)}catch(e){c=null}
  if(!c||typeof c.createOscillator!=='function')return;
  var t0;
  try{t0=c.currentTime+0.02}catch(e){return}
  var quiet=!!(document.body&&(document.body.classList.contains('bedtime')||document.body.classList.contains('candle')||document.documentElement.classList.contains('bedtime')));
  var gain=quiet?0.03:0.045;
  var mot=motif148(kind);
  mot.forEach(function(idx,i){
    try{
      var o=c.createOscillator(),g=c.createGain();
      o.type='sine';
      o.frequency.value=PENTA148[idx]||PENTA148[0];
      var t=t0+i*0.14;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(gain,t+0.018);
      g.gain.exponentialRampToValueAtTime(0.0008,t+0.22);
      o.connect(g);g.connect(c.destination);
      o.start(t);o.stop(t+0.24);
    }catch(e){}
  });
}
function hookNotes148(){
  if(typeof friendPick101==='function'&&!friendPick101._v148){
    var prev=friendPick101;
    friendPick101=function(id,pid){
      var r=prev.apply(this,arguments);
      try{note148(id)}catch(e){}
      return r;
    };
    friendPick101._v148=1;
  }
  if(!document._notes148){
    document._notes148=1;
    document.addEventListener('click',function(ev){
      var b=ev.target&&ev.target.closest&&ev.target.closest('[data-sprite137]');
      if(!b)return;
      try{note148(b.getAttribute('data-sprite137')||'sprites')}catch(e){}
    },true);
  }
}

/* ---- Picker tiles already use lampViewStage74; stamp + keep current stage ---- */
function viewStage148(kind,pid){
  var st=null;
  try{st=typeof friendState101==='function'?friendState101(kind,pid):null}catch(e){}
  if(st&&typeof lampViewStage74==='function')return lampViewStage74(st);
  var s=st&&st.stage;
  s=Number(s);
  if(!(s>=1))s=1;
  return Math.max(1,Math.min(6,s));
}
function hookPicker148(){
  if(typeof friendPickerHTML101==='function'&&!friendPickerHTML101._v148){
    var prev=friendPickerHTML101;
    friendPickerHTML101=function(pid){
      var html=prev.apply(this,arguments);
      try{
        html=html.replace(/data-friend="([^"]+)"/g,function(m,k){
          var v=viewStage148(k,pid);
          return 'data-friend="'+k+'" data-stage148="'+v+'"';
        });
      }catch(e){}
      return html;
    };
    friendPickerHTML101._v148=1;
  }
}

/* ---- 3-tap first-run tour ---- */
var STYLES148=['cave','paper','woodblock','chalk'];
var STYLE_NAME148={cave:'Cave art',paper:'Paper cut-out',woodblock:'Woodblock',chalk:'Chalk pastel'};
var CORE148=['lamp','moth','owl','turtle','dragon','phoenix'];
function tourSeen148(){return rawGet148('lamp_tour148')==='1'}
function tourFresh148(){
  if(tourSeen148())return false;
  if(rawGet148('lamp_move_seen')||rawGet148('lamp_moved'))return false;
  try{
    var i,k,raw,f;
    var store=(typeof RAW!=='undefined'&&RAW.keys)?null:localStorage;
    var keys=[];
    if(store){for(i=0;i<store.length;i++)keys.push(store.key(i))}
    else{try{for(i=0;i<localStorage.length;i++)keys.push(localStorage.key(i))}catch(e){}}
    for(i=0;i<keys.length;i++){
      k=keys[i]||'';
      if(/^lamp_(log|notes|solo|letters|echo)@/.test(k)){
        raw=rawGet148(k);
        if(raw&&raw!=='[]'&&raw!=='{}')return false;
      }
      if(/^lamp_friends101@/.test(k)){
        try{f=JSON.parse(rawGet148(k)||'{}')}catch(e){f=null}
        if(f&&(f.offered||(f.active&&f.active!=='lamp')))return false;
      }
    }
  }catch(e){}
  return true;
}
function closeTour148(){
  var d=document.querySelector('dialog.tour148');
  if(d&&d.open)try{d.close()}catch(e){}
  if(d)d.remove();
}
function finishTour148(){
  rawSet148('lamp_tour148','1');
  try{
    var f=typeof friendsLoad101==='function'?friendsLoad101(pid148()):null;
    if(f){f.offered=true;if(typeof friendsPut101==='function')friendsPut101(f,pid148());}
  }catch(e){}
  closeTour148();
}
function tourStep148(step){
  css148();
  closeTour148();
  var d=document.createElement('dialog');
  d.className='tour148';
  d.setAttribute('aria-modal','true');
  var title=t148('A first look');
  d.setAttribute('aria-label',title);
  var body='';
  if(step===1){
    body='<h2 class="kline">'+e148(title)+'</h2><p class="kline">'+e148(t148('Pick a friend, then pick a story style, then go.'))+'</p><p class="soft">'+e148(t148('Pick a friend'))+'</p>';
    body+='<div class="friendPick101" role="list">';
    CORE148.forEach(function(k){
      var art='',nm=k,st=viewStage148(k,pid148());
      try{
        if(typeof friendKindName101==='function')nm=friendKindName101(k);
        var prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
        try{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=k;art=typeof lampSvg73==='function'?lampSvg73(st,'',false):''}finally{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev;}
      }catch(e){}
      body+='<button type="button" role="listitem" data-tour-friend="'+k+'" data-stage148="'+st+'" aria-label="'+e148(nm)+'">'+art+'<span class="kline">'+e148(nm)+'</span></button>';
    });
    body+='</div>';
  }else if(step===2){
    body='<h2 class="kline">'+e148(title)+'</h2><p class="kline">'+e148(t148('Then pick a story style'))+'</p>';
    body+='<div class="style148">';
    var cur=(root.IL140&&IL140.loadStyle)?IL140.loadStyle():'cave';
    STYLES148.forEach(function(id){
      var nm=t148(STYLE_NAME148[id]);
      body+='<button type="button" data-tour-style="'+id+'" class="'+(cur===id?'p':'')+'" aria-pressed="'+(cur===id?'true':'false')+'">'+e148(nm)+'</button>';
    });
    body+='</div>';
  }else{
    body='<h2 class="kline">'+e148(title)+'</h2><p class="kline">'+e148(t148('Then go'))+'</p><p><button type="button" class="p" data-tour-go="1">'+e148(t148("Let's go"))+'</button></p>';
  }
  d.innerHTML=body;
  document.body.appendChild(d);
  try{d.showModal()}catch(e){try{d.show()}catch(e2){}}
  d.addEventListener('click',function(ev){
    var b=ev.target.closest('button');if(!b)return;
    var fr=b.getAttribute('data-tour-friend');
    var st=b.getAttribute('data-tour-style');
    if(fr){
      try{if(typeof friendPick101==='function')friendPick101(fr,pid148());else note148(fr);}catch(e){}
      tourStep148(2);return;
    }
    if(st){
      try{if(root.IL140&&typeof IL140.pickStyle==='function')IL140.pickStyle(st);else if(root.IL140&&typeof IL140.loadStyle==='function'){/* fallback */try{localStorage.setItem('ll-story-style',st)}catch(e){}}}catch(e){}
      tourStep148(3);return;
    }
    if(b.getAttribute('data-tour-go'))finishTour148();
  });
  d.addEventListener('cancel',function(ev){ev.preventDefault();});
}
function maybeTour148(){
  if(!tourFresh148())return;
  if(document.querySelector('dialog.tour148, dialog.lamp73-dialog, dialog.friendOffer101'))return;
  tourStep148(1);
}
function hookTour148(){
  if(typeof friendOfferMaybe101==='function'&&!friendOfferMaybe101._v148){
    var prev=friendOfferMaybe101;
    friendOfferMaybe101=function(){
      if(tourFresh148()||document.querySelector('dialog.tour148'))return;
      return prev.apply(this,arguments);
    };
    friendOfferMaybe101._v148=1;
  }
}

/* ---- Take it outside (text only) ---- */
var OUT148={
  bell:['When a bell rings, it really shakes. Dip a ringing fork in water and it splashes!','Cuando una campana suena, de verdad tiembla. ¡Mete un diapasón que está sonando en agua y salpica!'],
  sun:["Scientists turned the Sun's shaking into a low, sleepy hum",'Los científicos convirtieron el temblor del Sol en un zumbido bajo y somnoliento'],
  earth:["Way out in space, Earth looks like one tiny blue dot, and you're on it.",'Allá en el espacio, la Tierra se ve como un puntito azul, y tú estás en él.'],
  story:['When you go outside, notice one small thing and tell someone.','Cuando salgas, fíjate en una cosa pequeña y cuéntasela a alguien.']
};
function outLine148(key){
  var row=OUT148[key]||OUT148.story;
  var es=false;
  try{es=((typeof LANG!=='undefined'&&LANG==='es')||(typeof lang!=='undefined'&&lang==='es'))}catch(e){}
  return es?row[1]:row[0];
}
function outP148(key){return '<p class="out148 soft" data-out148="'+key+'">'+e148(t148(OUT148[key]?OUT148[key][0]:OUT148.story[0]))+'</p>'}
function insertOut148(host,key){
  if(!host||host.querySelector('[data-out148="'+key+'"]'))return;
  host.insertAdjacentHTML('beforeend',outP148(key));
}
function hookOutside148(){
  if(typeof start==='function'&&!start._v148){
    var prevS=start;
    start=function(){
      var r=prevS.apply(this,arguments);
      try{
        var card=document.querySelector('#session .card[style*="dashed"], #session .card');
        var all=document.querySelectorAll('#session .card');
        var take=null;
        all.forEach(function(c){if(/Takeaway|Para llevar|💡/.test(c.textContent||''))take=c;});
        if(take)insertOut148(take,'story');
      }catch(e){}
      return r;
    };
    start._v148=1;
  }
  if(typeof dailyGlow64==='function'&&!dailyGlow64._v148){
    var prevG=dailyGlow64;
    dailyGlow64=function(){
      var r=prevG.apply(this,arguments);
      try{
        var card=document.querySelector('.dailyGlowCard64');
        if(card)insertOut148(card,'story');
      }catch(e){}
      return r;
    };
    dailyGlow64._v148=1;
  }
  if(typeof scTap101==='function'&&!scTap101._v148){
    var prevT=scTap101;
    scTap101=function(id){
      var r=prevT.apply(this,arguments);
      try{
        if(id==='bell'||id==='bike'){
          var root=$('soundcards');
          if(root)insertOut148(root.querySelector('.card')||root,'bell');
        }
      }catch(e){}
      return r;
    };
    scTap101._v148=1;
  }
  if(typeof luRender83==='function'&&!luRender83._v148){
    var prevL=luRender83;
    luRender83=function(){
      var r=prevL.apply(this,arguments);
      try{
        var card=document.querySelector('#lookup .lu83-card');
        if(!card||typeof LU83!=='object')return r;
        if(LU83.screen===2)insertOut148(card,'sun');
        if(LU83.screen===4||LU83.foundEarth)insertOut148(card,'earth');
      }catch(e){}
      return r;
    };
    luRender83._v148=1;
  }
  if(typeof skyHTML112==='function'&&!skyHTML112._v148){
    var prevY=skyHTML112;
    skyHTML112=function(){
      var html=prevY.apply(this,arguments);
      try{
        if(html&&html.indexOf('data-out148="sun"')<0){
          html=html.replace(/<\/div>\s*$/,outP148('sun')+outP148('earth')+'</div>');
        }
      }catch(e){}
      return html;
    };
    skyHTML112._v148=1;
  }
}

function after148(id){
  css148();
  hookGoodnight148();
  decorateGlow148(id?$(id):document);
  if(id==='hub'||!id) try{maybeTour148()}catch(e){}
  if(id==='bedtime'||id==='candle') hookGoodnight148();
  if(id==='lookup'){try{if(typeof luRender83==='function'){/* lines hook already wraps */}}catch(e){}}
}

function install(){
  css148();
  hookNotes148();
  hookPicker148();
  hookTour148();
  hookOutside148();
  hookGoodnight148();
  if(typeof afterShow95==='function'&&!afterShow95._v148){
    var prev=afterShow95;
    afterShow95=function(id){
      var r=prev.apply(this,arguments);
      try{after148(id)}catch(e){}
      return r;
    };
    afterShow95._v148=1;
  }
  if(typeof lampMountAll73==='function'&&!lampMountAll73._v148){
    var prevM=lampMountAll73;
    lampMountAll73=function(){
      var r=prevM.apply(this,arguments);
      try{decorateGlow148(document)}catch(e){}
      return r;
    };
    lampMountAll73._v148=1;
  }
  try{decorateGlow148(document)}catch(e){}
  try{if(tourFresh148()&&$('hub')&&!$('hub').classList.contains('hidden'))maybeTour148()}catch(e){}
}

root.IL148={
  version:148,
  mergeVoro:mergeVoro148,
  glowNight:glowNight148,
  pose:poseOn148,
  note:note148,
  viewStage:viewStage148,
  startTour:function(){tourStep148(1)},
  install:install
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
