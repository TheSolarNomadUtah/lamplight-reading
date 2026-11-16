/* Lamplight U13: real-recording Sound Cards (Studio drop-in, 2026-11-15).
   Adds 12 cards that play short, credited public-domain recordings
   (audio/sc13/<id>.opus, mono Opus 24 kbps, 2.3-4 s, -23 LUFS, peak <= -6 dBTP).
   Plays through the existing Sound Cards bus (scBus101) and registers the
   source in SC101.nodes, so the existing scStop101() (tap again, leave screen)
   stops it. Also stops on tab hidden. No mic, no recording, no network beyond
   the app's own files. Does not wrap show(). Card art: Art Director
   (scArt101 falls back to the label only if no art exists yet).
   window.IL_SC13 = { CARDS, CREDITS, creditsHtml, version }              */
(function(root){
'use strict';
var DIR='audio/sc13/', BUF={}, GAIN=1;
var CARDS=[
 {id:'whale', cat:'wild',   en:'Humpback whale', es:'Ballena jorobada'},
 {id:'wolf',  cat:'wild',   en:'Wolf',           es:'Lobo'},
 {id:'elk',   cat:'wild',   en:'Elk',            es:'Uapití'},
 {id:'bison', cat:'wild',   en:'Bison',          es:'Bisonte'},
 {id:'loon',  cat:'wild',   en:'Loon',           es:'Colimbo'},
 {id:'crane', cat:'wild',   en:'Sandhill crane', es:'Grulla canadiense'},
 {id:'raven', cat:'wild',   en:'Raven',          es:'Cuervo'},
 {id:'geyser',cat:'water',  en:'Geyser',         es:'Géiser'},
 {id:'rooster',cat:'animals',en:'Rooster',       es:'Gallo'},
 {id:'horse', cat:'animals',en:'Horse',          es:'Caballo'},
 {id:'sheep', cat:'animals',en:'Sheep',          es:'Oveja'},
 {id:'purr',  cat:'animals',en:'Cat purring',    es:'Gato ronroneando'}
];
var CREDITS={
 whale:'Humpback whale song. NOAA PMEL (U.S. government work, public domain), via Wikimedia Commons.',
 wolf:'Wolves howling. NPS & MSU Acoustic Atlas / Jennifer Jerrett, Yellowstone Sound Library (public domain).',
 elk:'Elk bugle. NPS / Neal Herbert, Yellowstone Sound Library (public domain).',
 bison:'Bison bellow. NPS / Shan Burson, Yellowstone Sound Library (public domain).',
 loon:'Common loons. NPS & MSU Acoustic Atlas / Jennifer Jerrett, Yellowstone Sound Library (public domain), via Wikimedia Commons.',
 crane:'Sandhill crane. NPS & MSU Acoustic Atlas / Jennifer Jerrett, Yellowstone Sound Library (public domain), via Wikimedia Commons.',
 raven:'Common raven. NPS / David Restivo, Yellowstone Sound Library (public domain), via Wikimedia Commons.',
 geyser:'Old Faithful erupting. NPS / Jennifer Jerrett, Yellowstone Sound Library (public domain).',
 rooster:'Rooster crowing. "alys", pdsounds.org (public domain), via Wikimedia Commons.',
 horse:'Horse whinny. Wikimedia Commons user Hü. (public domain).',
 sheep:'Sheep bleating. "earthcalling", pdsounds.org (public domain), via Wikimedia Commons.',
 purr:'Cat purring. Wikimedia Commons user Mysid (public domain).'
};
var CAT={wild:['Wild places','Lugares salvajes']};

function has(id){for(var i=0;i<CARDS.length;i++)if(CARDS[i].id===id)return true;return false}
function load(c,id){
  if(BUF[id])return BUF[id];
  function get(ext){return fetch(DIR+id+'.'+ext).then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()})
    .then(function(b){return new Promise(function(ok,no){c.decodeAudioData(b,ok,no)})})}
  /* Opus first; .mp3 only if Builder ships the optional fallback files. */
  return BUF[id]=get('opus').catch(function(){return get('mp3')}).catch(function(){BUF[id]=null;return null});
}

/* Register cards once. */
if(typeof SCARDS101!=='undefined'){
  CARDS.forEach(function(k){if(!SCARDS101.some(function(c){return c.id===k.id}))SCARDS101.push({id:k.id,cat:k.cat,en:k.en,es:k.es,play:'rec13:'+k.id,rec:1})});
}
if(typeof SCCAT101!=='undefined'&&!SCCAT101.wild)SCCAT101.wild=CAT.wild;

/* Wrap scPlay101 for the new kinds only. */
if(typeof scPlay101==='function'&&!scPlay101._sc13){
  var prev=scPlay101;
  scPlay101=function(kind){
    if(typeof kind!=='string'||kind.indexOf('rec13:')!==0)return prev.apply(this,arguments);
    var id=kind.slice(6);
    scStop101();
    var c=typeof ac==='function'?ac():null;if(!c||!has(id))return;
    var dest=scBus101(c);
    SC101.playing=kind;
    var t=c.currentTime+.02;
    SC101.master.gain.setValueAtTime(.0001,t);
    load(c,id).then(function(buf){
      if(!buf||SC101.playing!==kind||!SC101.master)return;
      var s=c.createBufferSource(),t0=c.currentTime+.01;
      s.buffer=buf;s.connect(dest);
      SC101.master.gain.setTargetAtTime(.9*GAIN,t0,.03);
      s.start(t0);SC101.nodes.push(s);
      s.onended=function(){if(SC101.playing===kind)scStop101()};
    });
  };
  scPlay101._sc13=1;
}
document.addEventListener('visibilitychange',function(){if(document.hidden&&typeof scStop101==='function')try{scStop101()}catch(e){}});

function creditsHtml(esc){
  esc=esc||function(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})};
  return '<ul class="sc13-credits">'+CARDS.map(function(k){return '<li>'+esc(CREDITS[k.id])+'</li>'}).join('')+'</ul>';
}
root.IL_SC13={CARDS:CARDS,CREDITS:CREDITS,creditsHtml:creditsHtml,setGain:function(g){GAIN=+g||1},version:'u13-1115'};
})(window);
