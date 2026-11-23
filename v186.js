/* Lamplight v186 — Music Box (U15). 21 public-domain pieces, frozenglock5 voice.
   Tile on Patterns Everywhere. No autoplay. Stop on every leave path (LESSON 14).
   Bedtime wind-down dims the Lamp. Chords draw a quiet Sound Draws plate.
   EN+ES song titles; other languages get UI strings only. No new samples or voices. */
(function(root){
'use strict';

var UNIT='mbox';
var IGNORE_MS=400; /* LESSON 11: ignore the tap that opened the screen */
var openedAt=0, sel=null, wind=false, dim=1, raf=0, pins=[], lastChord=0;

function t(s, o){
  return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s);
}
function esc(s){
  return typeof patEsc==='function'?patEsc(s):String(s==null?'':s).replace(/[&<>"']/g,function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]);
  });
}
function lang(){
  try{return (typeof curLang==='function'?curLang():'en')||'en'}catch(e){return 'en'}
}
function night(){
  try{return !!(typeof patNight==='function'&&patNight())}catch(e){return false}
}
function reduced(){
  try{return !!(typeof patReduced==='function'&&patReduced())}catch(e){return false}
}
function sfxOn(){
  try{return typeof lampSfxOn73==='function'?!!lampSfxOn73():true}catch(e){return true}
}
function bedtime(){
  try{return !!(document.body&&(document.body.classList.contains('bedtime')||document.body.classList.contains('candle')))}catch(e){return false}
}
function titleOf(p){
  var L=lang(), en=(p.t&&p.t.en)||p.id, es=(p.t&&p.t.es)||en;
  return L==='es'?es:en;
}
function pieces(){
  try{return (root.MusicBox&&root.MusicBox.list())||[]}catch(e){return []}
}
function box(){return root.MusicBox}
function playingId(){
  try{return box()&&box().isPlaying()}catch(e){return null}
}
function isActive(){
  var el=$('patterns');
  try{return !!(el&&!el.classList.contains('hidden')&&PAT106&&PAT106.unit===UNIT&&$('mb186'))}catch(e){return false}
}
function $$(id){return document.getElementById(id)}
function $(id){return (typeof root.$==='function'?root.$(id):$$(id))}

function css(){
  if(document.getElementById('v186css'))return;
  var s=document.createElement('style');s.id='v186css';
  s.textContent=
    '#patterns .hubtile[data-pat="mbox"] svg{display:block;margin:0 auto 4px}'+
    '#patterns .hubtile[data-pat="mbox"]{min-height:132px}'+
    '.mb186{max-width:720px;margin:0 auto}'+
    '.mb186-intro{margin:.4em 0 8px}'+
    '.mb186-stage{display:grid;grid-template-columns:1fr;gap:10px;align-items:stretch;margin:8px 0}'+
    '@media (min-width:720px){.mb186-stage{grid-template-columns:1.2fr .8fr}}'+
    '.mb186-cvwrap{position:relative;border-radius:16px;overflow:hidden;min-height:180px;background:#fff2d8;box-shadow:inset 0 0 0 2px #72583f22}'+
    'body.night .mb186-cvwrap,html[data-look-theme="dark"] .mb186-cvwrap,body.bedtime .mb186-cvwrap{background:#1C1624;box-shadow:inset 0 0 0 2px #E6B45444}'+
    '.mb186-cvwrap canvas{display:block;width:100%;height:auto;max-width:100%}'+
    '.mb186-lamp{position:absolute;right:8px;bottom:6px;width:56px;height:56px;pointer-events:none;transform-origin:50% 80%;transition:filter .6s linear,opacity .6s linear}'+
    '.mb186-lamp svg{width:56px;height:56px;display:block}'+
    '.mb186-list{display:grid;grid-template-columns:1fr;gap:8px;margin:10px 0 12px}'+
    '@media (min-width:720px){.mb186-list{grid-template-columns:1fr 1fr}}'+
    '.mb186-song{text-align:left;padding:10px 12px;min-height:56px;border-radius:14px;border:2px solid #72583f33;background:#fffdf6;color:inherit;font:inherit;cursor:pointer}'+
    '.mb186-song small{display:block;font-size:.85em;opacity:.8;margin-top:2px}'+
    'body.night .mb186-song,html[data-look-theme="dark"] .mb186-song,body.bedtime .mb186-song{background:#241c16;border-color:#E6B45444;color:#f6efe0}'+
    '.mb186-song[aria-pressed="true"],.mb186-song.on{box-shadow:inset 0 0 0 3px #E6B454;border-color:#E6B454}'+
    '.mb186-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}'+
    '.mb186-row button{min-height:48px;min-width:48px;padding:8px 16px;border-radius:24px}'+
    '.mb186-credit{margin:8px 0 0;font-size:.95em}'+
    '.mb186-back{min-height:48px}';
  document.head.appendChild(s);
}

function tileArt(){
  var ink=night()?'#E8E4DA':'#72583f';
  var gold='#E6B454', plate=night()?'#2A2230':'#fff2d8', wood=night()?'#3a2a20':'#c4a06a';
  return '<svg class="lamp-art63" data-original-art="pat-mbox" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">'+
    '<circle class="art-plate63" cx="50" cy="50" r="47" fill="'+plate+'" stroke="'+ink+'" stroke-width="2"/>'+
    '<rect x="22" y="38" width="56" height="28" rx="8" fill="'+wood+'" stroke="'+ink+'" stroke-width="1.6"/>'+
    '<ellipse cx="50" cy="38" rx="28" ry="10" fill="'+gold+'" stroke="'+ink+'" stroke-width="1.6"/>'+
    '<ellipse cx="50" cy="38" rx="18" ry="5" fill="none" stroke="'+ink+'" stroke-width="1" opacity=".55"/>'+
    '<circle cx="36" cy="36" r="1.6" fill="'+ink+'"/><circle cx="50" cy="33" r="1.6" fill="'+ink+'"/><circle cx="64" cy="36" r="1.6" fill="'+ink+'"/>'+
    '<circle cx="42" cy="40" r="1.4" fill="'+ink+'"/><circle cx="58" cy="40" r="1.4" fill="'+ink+'"/>'+
    '<path d="M70 30 l6-8 2 3" fill="none" stroke="'+gold+'" stroke-width="2" stroke-linecap="round"/>'+
    '</svg>';
}

function tile(){
  var g=document.querySelector('#patterns .pat-units');
  if(!g||g.querySelector('[data-pat="mbox"]'))return;
  var b=document.createElement('button');
  b.type='button';b.className='hubtile';b.setAttribute('data-pat',UNIT);
  b.setAttribute('onclick',"patOpen106('mbox')");
  b.innerHTML=tileArt()+esc(t('Music Box'))+'<small>'+esc(t('Classical songs the app plays itself.'))+'</small>';
  var after=g.querySelector('[data-pat="sound"]')||g.querySelector('[data-pat="seesound"]');
  if(after&&after.nextSibling)g.insertBefore(b,after.nextSibling);
  else g.appendChild(b);
}

function credit(p){
  if(!p)return '';
  var who=[p.by,p.yr].filter(Boolean).join(', ');
  var src=t('From a public-domain score.');
  return '<p class="soft mb186-credit" id="mb186credit">'+esc(who+(who?'. ':''))+esc(src)+'</p>';
}

function lampSvg(){
  try{
    var prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
    if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101='lamp';
    var art=typeof lampSvg73==='function'?lampSvg73(1,'',false):'';
    if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev;
    return art||'';
  }catch(e){return ''}
}

function open(){
  css();
  var el=$('patterns');if(!el)return;
  var reentry=false;
  try{reentry=PAT106.unit===UNIT&&!!$$('mb186')}catch(e){}
  try{PAT106.unit=UNIT}catch(e){}
  /* LESSON 11 only applies to the tap that opened the screen, not later song picks. */
  if(!reentry) openedAt=(typeof performance!=='undefined'?performance.now():Date.now());
  var list=pieces();
  if(!sel||!list.some(function(p){return p.id===sel}))sel=list[0]?list[0].id:null;
  var p=box()&&box().get&&box().get(sel);
  var on=playingId();
  var soft=bedtime()||wind;
  el.innerHTML='<div class="card math-card mb186" id="mb186">'+
    '<button type="button" class="mb186-back" onclick="patOpen106(null)">'+esc(t('← Patterns Everywhere'))+'</button>'+
    '<h2>'+esc(t('Music Box'))+'</h2>'+
    '<p class="soft mb186-intro">'+esc(t('Tap a song, then Play. Nothing starts by itself. Stop always works. At bedtime the song slowly winds down and the Lamp dims with it.'))+'</p>'+
    '<div class="mb186-stage">'+
      '<div class="mb186-cvwrap">'+
        '<canvas id="mb186drum" width="560" height="280" aria-label="'+esc(t('A gold pin drum turning as the notes play'))+'"></canvas>'+
        '<div class="mb186-lamp" id="mb186lamp" style="filter:brightness('+dim+');opacity:'+(0.55+0.45*dim)+'">'+lampSvg()+'</div>'+
      '</div>'+
      '<div class="mb186-cvwrap">'+
        '<canvas id="mb186plate" width="360" height="280" aria-label="'+esc(t('Sand on a plate, for the chords'))+'"></canvas>'+
      '</div>'+
    '</div>'+
    '<div class="mb186-row">'+
      '<button type="button" id="mb186play" class="p" aria-pressed="'+(on?'true':'false')+'">'+(on?esc(t('Stop')):esc(t('Play')))+'</button>'+
      '<button type="button" id="mb186wind" aria-pressed="'+(soft?'true':'false')+'">'+esc(t('Wind down'))+'</button>'+
    '</div>'+
    '<div class="mb186-list" id="mb186list">'+list.map(function(x){
      var pressed=x.id===sel;
      return '<button type="button" class="mb186-song'+(pressed?' on':'')+'" data-mb="'+esc(x.id)+'" aria-pressed="'+(pressed?'true':'false')+'">'+
        esc(titleOf(x))+'<small>'+esc([x.by,x.yr].filter(Boolean).join(', '))+'</small></button>';
    }).join('')+'</div>'+
    credit(p)+
    '</div>';
  if(typeof turtlePlace105==='function')turtlePlace105('patterns');
  if(typeof artRefresh63==='function')artRefresh63(el);
  bind();
  drawDrum(true);
  drawPlate(null, true);
  setLampDim(dim);
}

function bind(){
  var play=$$('mb186play'), w=$$('mb186wind'), list=$$('mb186list');
  if(play)play.addEventListener('click',onPlayTap);
  if(w)w.addEventListener('click',onWindTap);
  if(list)list.addEventListener('click',onSongTap);
}

function gated(){
  var now=(typeof performance!=='undefined'?performance.now():Date.now());
  return (now-openedAt)<IGNORE_MS;
}

function onSongTap(ev){
  if(gated())return;
  var b=ev.target&&ev.target.closest&&ev.target.closest('[data-mb]');
  if(!b)return;
  sel=b.getAttribute('data-mb');
  stop('switch');
  open(); /* re-render selection + credit; does not autoplay */
}

function onWindTap(ev){
  if(gated())return;
  wind=!wind;
  var b=$$('mb186wind');if(b)b.setAttribute('aria-pressed',wind?'true':'false');
  if(playingId()){ /* restart current with the new mode, only if already playing */
    var id=playingId();
    stop('switch');
    start(id);
  }
}

function onPlayTap(ev){
  if(gated())return;
  if(playingId()){stop('off');paintPlay(false);return}
  start(sel);
}

function paintPlay(on){
  var b=$$('mb186play');if(!b)return;
  b.textContent=on?t('Stop'):t('Play');
  b.setAttribute('aria-pressed',on?'true':'false');
}

function start(id){
  var M=box();if(!M||!id)return;
  if(!sfxOn()){paintPlay(false);return}
  try{M.setVoice('frozenglock5')}catch(e){}
  dim=1;setLampDim(1);
  var useBed=wind||bedtime();
  var ok=M.play(id,{
    voice:'frozenglock5',
    bedtime:useBed,
    windDown:useBed,
    host:$$('mb186'),
    isActive:isActive,
    onNotes:onNotes,
    onRepeat:onRepeat,
    onStop:function(reason){if(reason!=='switch'){paintPlay(false);if(reason!=='end')setLampDim(1)}},
    onEnd:function(){paintPlay(false);setLampDim(1)}
  });
  paintPlay(!!ok);
  if(ok){layoutPins(id);drawDrum(true)}
}

function stop(reason){
  try{if(box())box().stop(reason||'off')}catch(e){}
  paintPlay(false);
}

function layoutPins(id){
  pins=[];
  try{
    var p=box().get(id), ev=box().events(p);
    var len=ev.len||1, lo=128, hi=0;
    ev.forEach(function(e){if(e.n<lo)lo=e.n;if(e.n>hi)hi=e.n});
    if(hi<=lo)hi=lo+12;
    ev.forEach(function(e){
      pins.push({t:e.t/len, n:(e.n-lo)/(hi-lo), on:0, midi:e.n});
    });
  }catch(e){pins=[]}
}

function onNotes(batch){
  var now=(typeof performance!=='undefined'?performance.now():Date.now());
  batch.forEach(function(e){
    pins.forEach(function(p){
      if(p.midi===e.n)p.on=now;
    });
  });
  if(batch.length>=2)drawPlate(batch,false);
  if(!raf)raf=requestAnimationFrame(tickDrum);
}

function onRepeat(k, gk, R){
  /* k starts at 1 for the second pass. Dim toward a soft glow, then almost out. */
  var steps=Math.max(1,(R||4)-1);
  dim=Math.max(0.2, 1-0.8*(k/steps));
  setLampDim(dim);
}

function setLampDim(v){
  dim=v;
  var el=$$('mb186lamp');
  if(el){el.style.filter='brightness('+v+')';el.style.opacity=String(0.45+0.55*v)}
  var host=$('patterns');
  if(host){
    if(v<0.98)host.classList.add('pat-wind-dim');
    else host.classList.remove('pat-wind-dim');
  }
}

function tickDrum(){
  raf=0;
  drawDrum(false);
  if(playingId()||pins.some(function(p){return p.on && (performance.now()-p.on)<800})){
    raf=requestAnimationFrame(tickDrum);
  }
}

function drawDrum(fresh){
  var cv=$$('mb186drum');if(!cv)return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,dark=night();
  x.clearRect(0,0,W,H);
  x.fillStyle=dark?'#1C1624':'#fff6e4';x.fillRect(0,0,W,H);
  /* cylinder */
  var cx=W*0.5, cy=H*0.52, rx=W*0.42, ry=H*0.22;
  x.save();
  x.fillStyle=dark?'#3a2f1a':'#E6B454';
  x.beginPath();x.ellipse(cx,cy+ry*0.15,rx,ry,0,0,Math.PI*2);x.fill();
  x.fillStyle=dark?'#5a4630':'#f3d48a';
  x.beginPath();x.ellipse(cx,cy-ry*0.35,rx,ry*0.72,0,0,Math.PI*2);x.fill();
  x.strokeStyle=dark?'#E8E4DA':'#72583f';x.lineWidth=2;
  x.beginPath();x.ellipse(cx,cy-ry*0.35,rx,ry*0.72,0,0,Math.PI*2);x.stroke();
  x.beginPath();x.ellipse(cx,cy+ry*0.15,rx,ry,0,0,Math.PI*2);x.stroke();
  var now=(typeof performance!=='undefined'?performance.now():Date.now());
  var spin=playingId()?((now/8000)%1):0;
  pins.forEach(function(p,i){
    var a=((p.t+spin)%1)*Math.PI*1.2-Math.PI*0.6;
    var px=cx+Math.sin(a)*rx*0.86;
    var py=cy-ry*0.55+(1-p.n)*ry*1.35;
    var glow=p.on?Math.max(0,1-(now-p.on)/700):0;
    var r=glow?3.4:2.1;
    x.beginPath();x.arc(px,py,r,0,Math.PI*2);
    x.fillStyle=glow?(dark?'#fff3c4':'#fff8d0'):(dark?'#E6B454':'#72583f');
    x.fill();
    if(glow){
      x.beginPath();x.arc(px,py,r+4*glow,0,Math.PI*2);
      x.strokeStyle='rgba(230,180,84,'+(0.85*glow)+')';x.lineWidth=2;x.stroke();
    }
  });
  x.restore();
}

function ratioNM(batch){
  /* Map a chord to a Chladni mode. Use the two strongest (or first two) notes. */
  if(!batch||batch.length<2)return null;
  var ns=batch.map(function(e){return e.n}).sort(function(a,b){return a-b});
  var a=ns[0],b=ns[ns.length-1];
  var cents=Math.round((b-a)*100)/100;
  var semis=Math.abs(b-a);
  /* nearest simple ratio from interval */
  var table=[[12,1,2],[7,2,3],[5,3,4],[4,4,5],[3,5,6],[9,3,5],[8,5,8],[16,1,3]];
  var best=table[0],err=99;
  table.forEach(function(row){
    var e=Math.abs(semis-row[0]);if(e<err){err=e;best=row}
  });
  return {n:best[1],m:best[2]};
}

function drawPlate(batch, still){
  var cv=$$('mb186plate');if(!cv)return;
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,dark=night();
  var mode=ratioNM(batch)||{n:1,m:2};
  var N=reduced()?70:180;
  var parts=[];
  for(var i=0;i<N;i++)parts.push({x:Math.random(),y:Math.random()});
  function ch(px,py,n,m){return Math.cos(n*Math.PI*px)*Math.cos(m*Math.PI*py)-Math.cos(m*Math.PI*px)*Math.cos(n*Math.PI*py)}
  var steps=reduced()||still?60:28;
  for(var s=0;s<steps;s++){
    parts.forEach(function(p){
      var v=ch(p.x,p.y,mode.n,mode.m),a=Math.abs(v);
      if(a>0.08){
        var gx=-((Math.abs(ch(p.x+0.01,p.y,mode.n,mode.m))-a)/0.01);
        var gy=-((Math.abs(ch(p.x,p.y+0.01,mode.n,mode.m))-a)/0.01);
        var len=Math.hypot(gx,gy)||1;
        p.x=Math.max(0.02,Math.min(0.98,p.x+0.03*gx/len));
        p.y=Math.max(0.02,Math.min(0.98,p.y+0.03*gy/len));
      }
    });
  }
  x.fillStyle=dark?'#0d0f1a':'#e8c894';x.fillRect(0,0,W,H);
  x.fillStyle=dark?'#d8c8a4':'#5a4632';
  parts.forEach(function(p){x.beginPath();x.arc(p.x*W,p.y*H,1.5,0,Math.PI*2);x.fill()});
  lastChord=performance.now();
}

function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  var next=wrap(prev);
  next._v186=1;
  root[name]=next;
  return true;
}

function stopIfLeaving(unit, pageId){
  /* Stop whenever we leave the Music Box screen. */
  var stay=false;
  try{
    stay=(pageId==='patterns'||pageId==null)&&(unit===UNIT)&&isActive();
  }catch(e){stay=false}
  if(!stay){
    stop('left');
    setLampDim(1);
    var host=$('patterns');if(host)host.classList.remove('pat-wind-dim');
  }
}

function hookNav(){
  hook('patOpen106',function(prev){
    return function(u){
      if(u===UNIT){open();return}
      if(playingId()|| (typeof PAT106==='object'&&PAT106.unit===UNIT)) stop('left');
      var r=prev.apply(this,arguments);
      if(!u)try{tile()}catch(e){}
      return r;
    };
  });
  hook('renderPatterns106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{tile()}catch(e){}
      return r;
    };
  });
  if(typeof RENDER==='object'){
    var pr=RENDER.patterns;
    RENDER.patterns=function(){
      var r=typeof pr==='function'?pr.apply(this,arguments):undefined;
      try{if(PAT106&&PAT106.unit===UNIT)open();else tile()}catch(e){}
      return r;
    };
  }
  hook('showCore10_97',function(prev){
    return function(id){
      if(id!=='patterns') stopIfLeaving(null,id);
      else if(typeof PAT106==='object'&&PAT106.unit&&PAT106.unit!==UNIT) stop('left');
      return prev.apply(this,arguments);
    };
  });
  hook('lampSfxSet73',function(prev){
    return function(on){
      var r=prev.apply(this,arguments);
      try{if(!on)stop('muted')}catch(e){}
      return r;
    };
  });
  hook('setLang',function(prev){
    return function(){
      try{stop('lang')}catch(e){}
      return prev.apply(this,arguments);
    };
  });
  document.addEventListener('visibilitychange',function(){if(document.hidden)stop('hidden')});
  root.addEventListener('pagehide',function(){stop('pagehide')});
}

function boot(){
  css();
  try{if(box()&&box().setVoice)box().setVoice('frozenglock5')}catch(e){}
  hookNav();
  try{if(typeof renderPatterns106==='function'){ /* tile if grid already up */ tile() }}catch(e){}
}

boot();

root.IL186={
  open:open, stop:stop, start:start, unit:UNIT, version:186,
  pieces:function(){return pieces().map(function(p){return p.id})},
  isActive:isActive, playingId:playingId
};
})(typeof window!=='undefined'?window:globalThis);
