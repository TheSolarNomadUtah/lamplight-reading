/* v145: trust surfaces — Seed-tree lantern icon/splash, an “All files
   saved, works offline” check in Grown-ups, a merged Keep the Seed
   forever + Where the art comes from card, and the Share a Seed
   printable (joins v133). Also folds the v143 ceiling fix: the
   waveshaper is unity-gain under the cap and only clips overshoot, and
   the compressor limiter stays at −1 dB so single sources stay within
   0.5 LU of v141 while a stacked-tone true peak stays ≤ −6 dBTP.
   show() is not wrapped. The Dragon is unchanged. */
(function(){
'use strict';

if(typeof document!=='undefined'&&!document.getElementById('v145css')){
  var s=document.createElement('style');
  s.id='v145css';
  s.textContent=[
    '#offcheck145{margin:.6em 0 0;padding:.7em .9em;border-radius:14px;background:rgba(91,122,106,.12)}',
    '#offcheck145.ok145{background:rgba(91,122,106,.18)}',
    '#adults [data-seed145] p{line-height:1.45}',
    '#adults [data-seed145] .seed145-art{float:right;width:64px;height:64px;margin:0 0 .4rem .6rem}',
    '#adults [data-seed145] a[href]{display:inline-flex;align-items:center;min-height:44px;min-width:44px;padding:8px 4px}'
  ].join('\n');
  (document.documentElement||document.head).appendChild(s);
}

function t145(s,v){return typeof gT==='function'?gT(s,v):s}
function e145(s){return typeof esc==='function'?esc(String(s==null?'':s)):String(s==null?'':s).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])})}
function num145(n){return typeof gNum==='function'?gNum(n):String(n)}

function norm145(f){
  var s=String(f==null?'':f).replace(/^\.\//,'');
  return s.replace(/^\/+/,'');
}
function key145(url){
  try{
    var u=new URL(url, location.href);
    var p=u.pathname||'';
    if(p==='/'||p==='') return '';
    return p.replace(/^\/+/,'');
  }catch(e){return String(url||'')}
}
function has145(set, f){
  var s=norm145(f);
  if(s==='' ){
    return set.has('')||set.has('index.html')||set.has('./')||set.has('/');
  }
  return set.has(s)||set.has(s+'/')||set.has('./'+s);
}

async function count145(){
  if(!('caches' in window)||typeof offList!=='function') return {ok:false,have:0,need:0,err:true};
  var L;
  try{L=await offList()}catch(e){return {ok:false,have:0,need:0,err:true}}
  var files=L&&L.files||[];
  var need=files.length;
  var have=0;
  try{
    var c=await caches.open('lamplight-extra');
    var keys=await c.keys();
    var set=new Set();
    for(var i=0;i<keys.length;i++) set.add(key145(keys[i].url));
    for(var j=0;j<files.length;j++){
      var item=files[j];
      var f=Array.isArray(item)?item[0]:item;
      if(has145(set,f)) have++;
    }
  }catch(e){return {ok:false,have:0,need:need,err:true}}
  return {ok:need>0&&have===need,have:have,need:need,err:false};
}

function line145(st){
  if(!st||st.err){
    return t145('The app already opens offline after a first visit. Tap Save everything for every voice, song and language.');
  }
  if(st.ok){
    return t145('All {n} files saved, works offline.',{n:num145(st.need)});
  }
  if(st.have>0){
    return t145('{have} of {need} files saved. Tap Save everything so it works in the car or on a plane.',{have:num145(st.have),need:num145(st.need)});
  }
  return t145('The app already opens offline after a first visit. Tap Save everything for every voice, song and language.');
}

function paintCheck145(){
  var el=typeof $==='function'?$('offcard'):document.getElementById('offcard');
  if(!el)return;
  var box=document.getElementById('offcheck145');
  if(!box){
    box=document.createElement('p');
    box.id='offcheck145';
    box.setAttribute('role','status');
    var h=el.querySelector('h2');
    if(h&&h.nextSibling) el.insertBefore(box,h.nextSibling);
    else el.insertBefore(box,el.firstChild);
  }
  if(!box._pending){
    box.textContent=t145('Checking what is saved for offline…');
    box.className='';
  }
  var token=++paintCheck145._gen;
  box._pending=true;
  count145().then(function(st){
    if(token!==paintCheck145._gen)return;
    box._pending=false;
    box.textContent=(st&&st.ok?'✅ ':'')+line145(st);
    box.className=st&&st.ok?'ok145':'';
  }).catch(function(){
    if(token!==paintCheck145._gen)return;
    box._pending=false;
    box.textContent=line145({err:true});
    box.className='';
  });
}
paintCheck145._gen=0;

function hookOffline145(){
  var prev=typeof renderOffline==='function'?renderOffline:null;
  if(typeof prev==='function'&&!prev._v145){
    renderOffline=function(){
      var r=prev.apply(this,arguments);
      try{paintCheck145()}catch(e){}
      return r;
    };
    renderOffline._v145=1;
  }
}

function seedArt145(){
  var P=typeof LampPrint133==='object'?LampPrint133:null;
  if(P&&P.thumb) return '<span class="seed145-art">'+P.thumb('seed')+'</span>';
  return '';
}

function seedCardHTML145(){
  return '<div class="card" data-seed145="1">'+
    '<h3 class="kline">'+e145(t145('Keep the Seed forever'))+'</h3>'+
    seedArt145()+
    '<p>'+e145(t145('The Seed is this app, kept as ordinary files on your device. Tap Save everything above so every voice, song and language works without internet — in the car, on a plane, or years from now.'))+'</p>'+
    '<p>'+e145(t145('You can copy that saved folder and share it with another family. Nothing is uploaded. Each child’s lamp and progress stay on their own device.'))+'</p>'+
    '<p>'+e145(t145('The code is free under the GPL. Our stories, pictures and songs are free to share and adapt under CC BY-SA, as long as you credit Lamplight Learning and share alike. Anyone may copy and improve it.'))+'</p>'+
    '<h3 class="kline">'+e145(t145('Where the art comes from'))+'</h3>'+
    '<p>'+e145(t145('The stained glass look follows Daniel Cottier’s flower window (Metropolitan Museum of Art, CC0).'))+'</p>'+
    '<p>'+e145(t145('The constellation look follows Sidney Hall’s Urania’s Mirror star cards (1824, public domain).'))+'</p>'+
    '<p>'+e145(t145('The sky chart follows Andreas Cellarius’s 1660 planisphere (public domain).'))+'</p>'+
    '<p class="soft">'+e145(t145('We draw our own lines. The old plates are the models, not copies pasted in.'))+'</p>'+
    '<p class="soft"><a href="LICENSES.md">'+e145(t145('Read the licenses'))+'</a></p>'+
  '</div>';
}

function attachSeed145(){
  var root=typeof $==='function'?$('adults'):document.getElementById('adults');
  if(!root||root.querySelector('[data-seed145]'))return;
  if(root.querySelector('[data-yours-editor125],[data-yours-gate125]')||root.getAttribute('data-yours-open'))return;
  var printCard=root.querySelector('[data-print133]');
  var html=seedCardHTML145();
  if(printCard) printCard.insertAdjacentHTML('beforebegin',html);
  else root.insertAdjacentHTML('beforeend',html);
}

function hookAdults145(){
  var prev=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
  if(typeof prev==='function'&&!prev._v145){
    renderAdults=function(){
      var r=prev.apply(this,arguments);
      try{attachSeed145()}catch(e){}
      return r;
    };
    renderAdults._v145=1;
    if(typeof RENDER==='object')RENDER.adults=renderAdults;
  }
  var prevShow=typeof afterShow95==='function'?afterShow95:null;
  if(typeof prevShow==='function'&&!prevShow._v145){
    afterShow95=function(id){
      var r=prevShow.apply(this,arguments);
      try{if(id==='adults'){attachSeed145();paintCheck145()}}catch(e){}
      return r;
    };
    afterShow95._v145=1;
  }
}

hookOffline145();
hookAdults145();
window.IL145={version:145,count:count145,paint:paintCheck145};
})();
