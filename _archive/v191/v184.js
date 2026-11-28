/* Lamplight v184 — First Letter Garden (Lantern Letter) in stories,
   hunt empty-tap does not zoom, Same Shape Home-button clearance. */
(function(root){
'use strict';

function $(id){return document.getElementById(id)}
function hook(name, wrap){
  var prev=root[name];
  if(typeof prev!=='function')return false;
  if(prev._v184)return true;
  var next=wrap(prev);
  next._v184=1;
  root[name]=next;
  return true;
}
function t184(s, vars){
  var out=s;
  try{if(typeof gT==='function') out=gT(s)}catch(e){}
  if(vars){
    Object.keys(vars).forEach(function(k){
      out=String(out).split('{'+k+'}').join(String(vars[k]));
    });
  }
  return out;
}
function reduced184(){
  try{
    if(typeof lampReduced73==='function'&&lampReduced73()) return true;
  }catch(e){}
  try{return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e2){return false}
}
function rawGet184(k){
  try{if(typeof RAW!=='undefined'&&RAW.get) return RAW.get(k)}catch(e){}
  try{return localStorage.getItem(k)}catch(e2){return null}
}
function rawSet184(k,v){
  try{if(typeof RAW!=='undefined'&&RAW.set){RAW.set(k,v);return}}catch(e){}
  try{localStorage.setItem(k,v)}catch(e2){}
}
function isDark184(){
  try{
    if(typeof patNight==='function'&&patNight()) return true;
  }catch(e){}
  try{
    var th=(document.documentElement.dataset.lookTheme||'');
    if(/night|dark|contrast/i.test(th)) return true;
    var b=getComputedStyle(document.body).backgroundColor||'';
    var m=b.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if(m) return (+m[1]+ +m[2]+ +m[3])<384;
  }catch(e2){}
  return false;
}

/* ---- CSS: lantern story chrome, two-plate highlight, Same Shape Home room ---- */
function css184(){
  if($('il184css')) return;
  var s=document.createElement('style');s.id='il184css';
  s.textContent=
    '#session .story,#solo .story{position:relative;display:flow-root}'+
    '#session .story .w.is-drop.cur,#solo .story .w.is-drop.cur{background:transparent;box-shadow:none}'+
    '#session .story .w.is-drop.cur::before,#solo .story .w.is-drop.cur::before{content:none!important;display:none!important}'+
    '.lt-hi-plate{position:absolute;background:var(--hi,#c28500);box-shadow:inset 0 0 0 2px var(--ink,#2f2a24);border-radius:10px;pointer-events:none;z-index:0}'+
    '.lt-drop{float:left;display:block;position:relative;box-sizing:border-box;margin-right:.35em}'+
    '.lt-pre{position:absolute;left:0;top:0;line-height:normal;white-space:nowrap;font:inherit;color:inherit;z-index:2}'+
    '.lt-pre::before{content:attr(data-ch)}'+
    '.lt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}'+
    'html.lt-noanim .lt .lt-gl,html.lt-noanim .lt .lt-vc,html.lt-noanim .lt .lt-v,'+
    'html.lt-noanim .lt .lt-f,html.lt-noanim .lt .lt-sd,html.lt-noanim .lt .lt-fl{'+
      'animation:none!important;opacity:1;stroke-dashoffset:0;transform:none}'+
    'html[data-look-theme="dark"] .lt,html[data-look-theme="contrast"] .lt{'+
      '--lt-field:#140C08;--lt-g:#E8A840;--lt-ga:.3;--lt-frame:#C47A00;--lt-dot:#E6B454;'+
      '--lt-ink:#F3E0B8;--lt-rim:#C47A00;--lt-leaf:#9AB07A;--lt-pet:#F4D09A;--lt-fc:#C47A00}'+
    '@media (max-width:640px){'+
      '#patterns.il184-same,#patterns.il183-same{padding-bottom:calc(56px + 44px + 24px)}'+ 
      '#patterns.il184-same .same181-quiz,#patterns.il183-same .same181-quiz{padding-bottom:calc(56px + 44px + 24px)}'+
    '}';
  document.head.appendChild(s);
}

/* ---- 1. First Letter Garden ---- */
var LEAD184=/^[\s¿¡«“‘"'(\[—–-]*/;
var LETTER184=/[A-Za-zÀ-ÖØ-öø-ÿ]/;

function letterOn184(){return rawGet184('lamp_letter')!=='off'}
function stillLetter184(){return !letterOn184()||reduced184()}
function applyNoanimClass184(){
  try{document.documentElement.classList.toggle('lt-noanim',!letterOn184())}catch(e){}
}
function refreshAllDrops184(){
  storyRoots184().forEach(function(p){
    var w=p.querySelector('.w.is-drop');
    var box=p.querySelector('.lt-drop');
    if(box&&w&&w.dataset.ch) refreshDrop184(box,w.dataset.ch);
    if(box) fitLantern184(p);
    syncHighlight184(p);
  });
}
function letterSet184(on){
  rawSet184('lamp_letter',on?'on':'off');
  applyNoanimClass184();
  try{
    if($('look')&&!$('look').classList.contains('hidden')&&typeof renderLook==='function') renderLook();
  }catch(e){}
  try{refreshAllDrops184();applyLantern184()}catch(e2){}
}

function lanternDrop184(wordSpan, opts){
  opts=opts||{};
  if(!wordSpan||!root.LANTERN||typeof LANTERN.svg!=='function') return null;
  if(wordSpan.querySelector('.lt-drop')) return wordSpan.querySelector('.lt-drop');
  var w=document.createTreeWalker(wordSpan,4),n,i=-1;
  while((n=w.nextNode())){i=n.data.search(LETTER184);if(i>=0)break}
  if(!n) return null;
  var ch=n.data.charAt(i);
  var up=ch.toUpperCase();
  if(!LANTERN.plan||!LANTERN.plan(up)||!LEAD184.test(n.data.slice(0,i))) return null;
  var lead=n.data.slice(0,i),vis=lead.replace(/\s+/g,'');
  var rest=n.splitText(i);rest.splitText(1);
  var sr=document.createElement('span');sr.className='lt-sr';
  rest.parentNode.replaceChild(sr,rest);sr.appendChild(rest);
  if(vis){n.data='';sr.insertBefore(document.createTextNode(lead),rest)}
  var box=document.createElement('span');box.className='lt-drop';box.setAttribute('aria-hidden','true');
  wordSpan.insertBefore(box,wordSpan.firstChild);
  var still=opts.still!=null?opts.still:stillLetter184();
  var dark=opts.dark!=null?opts.dark:isDark184();
  box.innerHTML=LANTERN.svg(ch,{still:still,read:still||!!opts.read,dark:dark});
  if(vis){var pre=document.createElement('span');pre.className='lt-pre';pre.setAttribute('data-ch',vis);box.insertBefore(pre,box.firstChild)}
  wordSpan.classList.add('is-drop');
  wordSpan.dataset.ch=ch;
  return box;
}

function refreshDrop184(box, ch){
  if(!box||!root.LANTERN||typeof LANTERN.svg!=='function') return;
  var pre=box.querySelector('.lt-pre');
  var still=stillLetter184();
  var dark=isDark184();
  var html=LANTERN.svg(ch,{still:still,read:still,dark:dark});
  box.innerHTML=html;
  if(pre) box.insertBefore(pre,box.firstChild);
}

function fitLantern184(p){
  var box=p&&p.querySelector('.lt-drop');if(!box)return;
  var cs=getComputedStyle(p),fs=parseFloat(cs.fontSize),lh=parseFloat(cs.lineHeight);
  if(!(lh>0)) lh=fs*1.2;
  var pr=document.createElement('span');pr.style.cssText='display:inline-block;width:0;height:0';
  var parent=box.parentNode;
  box.style.display='none';parent.insertBefore(pr,box);
  var b1=pr.getBoundingClientRect().bottom-p.getBoundingClientRect().top-parseFloat(cs.paddingTop||0)-parseFloat(cs.borderTopWidth||0);
  pr.remove();box.style.display='';
  var cap=fs*.7;
  try{
    var c=document.createElement('canvas').getContext('2d');
    c.font=cs.fontStyle+' '+cs.fontWeight+' 400px '+cs.fontFamily;
    var m=c.measureText('H');
    if(m.actualBoundingBoxAscent>0) cap=m.actualBoundingBoxAscent*fs/400;
  }catch(e){}
  var top=b1-cap,h=2*lh+cap,pw=0,pre=box.querySelector('.lt-pre');
  if(pre){
    pre.style.top='0px';
    var q=document.createElement('span');q.style.cssText='display:inline-block;width:0;height:0';
    pre.appendChild(q);
    var off=q.getBoundingClientRect().bottom-pre.getBoundingClientRect().top;q.remove();
    pre.style.top=(cap-off)+'px';
    pw=pre.getBoundingClientRect().width+fs*.12;
  }
  box.style.marginTop=top+'px';box.style.height=h+'px';box.style.width=(h+pw)+'px';box.style.paddingLeft=pw+'px';
  var sv=box.querySelector('svg');if(sv){sv.style.width=sv.style.height=h+'px'}
}

function syncHighlight184(p){
  if(!p) return null;
  p.querySelectorAll('.lt-hi-plate').forEach(function(el){el.remove()});
  var w=p.querySelector('.w.is-drop.cur');
  if(!w) return null;
  var pr=p.getBoundingClientRect();
  var drop=w.querySelector('.lt-drop');
  var boxes=[];
  if(drop){
    var dr=drop.getBoundingClientRect();
    var pre=drop.querySelector('.lt-pre');
    if(pre){
      var pp=pre.getBoundingClientRect();
      var left=Math.min(dr.left,pp.left), top=Math.min(dr.top,pp.top), right=Math.max(dr.right,pp.right), bottom=Math.max(dr.bottom,pp.bottom);
      dr={x:left,y:top,left:left,top:top,right:right,bottom:bottom,width:right-left,height:bottom-top};
    }
    boxes.push(dr);
  }
  var range=document.createRange(), node, walker=document.createTreeWalker(w,4);
  while((node=walker.nextNode())){
    if(node.parentElement&&node.parentElement.classList.contains('lt-sr')) continue;
    if(!node.data||!node.data.trim()) continue;
    range.selectNode(node);
    Array.prototype.push.apply(boxes, range.getClientRects());
  }
  var pad=4, plates=[];
  boxes.forEach(function(r){
    if(r.width<1||r.height<1) return;
    var plate=document.createElement('span');
    plate.className='lt-hi-plate';
    plate.setAttribute('aria-hidden','true');
    plate.style.left=(r.left-pr.left-pad)+'px';
    plate.style.top=(r.top-pr.top-pad)+'px';
    plate.style.width=(r.width+pad*2)+'px';
    plate.style.height=(r.height+pad*2)+'px';
    p.insertBefore(plate,p.firstChild);
    plates.push(r);
  });
  return plates;
}

function storyRoots184(){
  var roots=[];
  ['session','solo'].forEach(function(id){
    var el=$(id);
    if(!el||el.classList.contains('hidden')) return;
    el.querySelectorAll('.story').forEach(function(p){
      if(p.querySelector('.w')) roots.push(p);
    });
  });
  return roots;
}

function applyLantern184(){
  applyNoanimClass184();
  if(!root.LANTERN||typeof LANTERN.svg!=='function') return 0;
  var n=0;
  storyRoots184().forEach(function(p){
    var first=p.querySelector('.w');
    if(!first) return;
    var box=first.querySelector('.lt-drop');
    if(!box){
      box=lanternDrop184(first,{still:stillLetter184(),read:stillLetter184(),dark:isDark184()});
    }
    if(box){
      fitLantern184(p);
      syncHighlight184(p);
      n++;
    }
  });
  return n;
}

function markPageRead184(){
  document.querySelectorAll('#session .lt, #solo .lt').forEach(function(sv){
    sv.classList.add('lt-read');
  });
}

function mountLetterCard184(){
  var rootEl=$('look');
  if(!rootEl||rootEl.querySelector('[data-flg184]')) return;
  var on=letterOn184();
  var card=document.createElement('div');
  card.className='card';
  card.setAttribute('data-flg184','1');
  card.innerHTML='<h3>'+esc184(t184('Animated first letter'))+'</h3>'+
    '<p class="soft">'+esc184(t184('A glowing letter can grow once at the start of a story. It shows how the letter is written. This does not change story voices.'))+'</p>'+
    '<p><button class="p" data-flg184-on aria-pressed="'+(on?'true':'false')+'">'+esc184(t184('On'))+'</button> '+
    '<button data-flg184-off aria-pressed="'+(!on?'true':'false')+'">'+esc184(t184('Off'))+'</button></p>';
  var onBtn=card.querySelector('[data-flg184-on]');
  var offBtn=card.querySelector('[data-flg184-off]');
  if(on) onBtn.classList.add('p'); else offBtn.classList.add('p');
  onBtn.onclick=function(){letterSet184(true)};
  offBtn.onclick=function(){letterSet184(false)};
  rootEl.appendChild(card);
}
function esc184(s){
  return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});
}

function hookStories184(){
  hook('start',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{applyLantern184()}catch(e){}
      return r;
    };
  });
  hook('soloStart',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{applyLantern184()}catch(e){}
      return r;
    };
  });
  hook('dailyOpen64',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{applyLantern184()}catch(e){}
      return r;
    };
  });
  hook('lampTogetherCur83',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{
        storyRoots184().forEach(function(p){syncHighlight184(p)});
      }catch(e){}
      return r;
    };
  });
  hook('finish',function(prev){
    return function(){
      try{markPageRead184()}catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('dailyFinish64',function(prev){
    return function(){
      try{markPageRead184()}catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('soloDone',function(prev){
    return function(){
      try{markPageRead184()}catch(e){}
      return prev.apply(this,arguments);
    };
  });
  hook('applyLook',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{
        applyNoanimClass184();
        storyRoots184().forEach(function(p){
          var box=p.querySelector('.lt-drop');
          var w=p.querySelector('.w.is-drop');
          if(box&&w&&w.dataset.ch) refreshDrop184(box,w.dataset.ch);
          if(box) fitLantern184(p);
          syncHighlight184(p);
        });
      }catch(e){}
      return r;
    };
  });
  hook('renderLook',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{mountLetterCard184()}catch(e){}
      return r;
    };
  });
  try{if(typeof RENDER==='object') RENDER.look=root.renderLook}catch(e){}
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{if(id==='look') mountLetterCard184()}catch(e){}
      return r;
    };
  });
}

function watchStories184(){
  if(watchStories184._on) return;
  watchStories184._on=1;
  var t=0;
  var obs=new MutationObserver(function(){
    if(t) return;
    t=requestAnimationFrame(function(){
      t=0;
      try{
        var needs=false;
        storyRoots184().forEach(function(p){
          var w=p.querySelector('.w');
          if(w&&!w.querySelector('.lt-drop')) needs=true;
        });
        if(needs) applyLantern184();
        else storyRoots184().forEach(function(p){if(p.querySelector('.w.cur.is-drop')) syncHighlight184(p)});
      }catch(e){}
    });
  });
  ['session','solo'].forEach(function(id){
    var el=$(id);if(el) obs.observe(el,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  });
  addEventListener('resize',function(){
    try{storyRoots184().forEach(function(p){fitLantern184(p);syncHighlight184(p)})}catch(e){}
  });
  try{
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){
      try{storyRoots184().forEach(function(p){fitLantern184(p);syncHighlight184(p)})}catch(e){}
    });
  }catch(e2){}
}

/* ---- 2. Hunt empty tap: no zoom; optional pulse of gold dots ---- */
function huntMode184(){
  try{if(root.IL163&&typeof IL163.mode==='function') return IL163.mode()}catch(e){}
  try{return (PAT106&&PAT106.ex&&PAT106.ex.mode163)||''}catch(e2){return ''}
}
function huntItems184(){
  var m=huntMode184(), IL=root.IL163;
  if(m==='baby'&&IL&&IL.babies) return IL.babies;
  if(m==='antenna'&&IL&&IL.bulbs) return [3,4,5].map(function(p){return IL.bulbs[p]});
  return [];
}
function huntHit184(cv, ev){
  if(typeof patExAt106!=='function'||typeof PAT106!=='object'||!PAT106.ex) return null;
  var clientX=ev&&ev.clientX, clientY=ev&&ev.clientY;
  if(clientX==null||clientY==null) return null;
  var p=patExAt106(cv,clientX,clientY), ex=PAT106.ex;
  var span=ex.span, tol=span*0.045, best=null, bd=1e9;
  huntItems184().forEach(function(it){
    var d=Math.hypot(p.x-it.cx,p.y-it.cy);
    if(d<tol&&d<bd){bd=d;best=it}
  });
  return best;
}
function paintPulseDots184(cv, scale, alpha){
  var items=huntItems184();
  if(!cv||!items.length||typeof PAT106!=='object'||!PAT106.ex) return 0;
  var ex=PAT106.ex, x=cv.getContext('2d');
  if(!x) return 0;
  var W=cv.width, H=cv.height, span=ex.span, cx=ex.cx, cy=ex.cy;
  var xmin=cx-span/2, ymin=cy-span*H/W/2, n=0;
  x.save();
  items.forEach(function(it){
    var u=(it.cx-xmin)/span, v=(it.cy-ymin)/(span*H/W);
    if(u<-0.05||u>1.05||v<-0.05||v>1.05) return;
    var r=Math.max(8,Math.min(W,H)*0.035)*(scale||1);
    x.beginPath();x.arc(u*W,v*H,r,0,Math.PI*2);
    x.fillStyle='rgba(230,180,84,'+(alpha!=null?alpha:0.7)+')';
    x.strokeStyle='rgba(255,246,216,.95)';x.lineWidth=2;x.fill();x.stroke();
    if(it.spokes||it.label){
      x.fillStyle='#3a2a1a';x.font='700 13px system-ui,sans-serif';
      x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(it.spokes||it.label),u*W,v*H);
    }
    n++;
  });
  x.restore();
  return n;
}
function pulseHuntDots184(cv){
  cv=cv||$('patExCv');
  if(!cv) return;
  if(reduced184()){
    try{if(typeof paintHuntDots182==='function') paintHuntDots182(cv)}catch(e){}
    return;
  }
  if(pulseHuntDots184._on) return;
  pulseHuntDots184._on=1;
  var x=cv.getContext('2d');
  var snap=null;
  try{snap=x.getImageData(0,0,cv.width,cv.height)}catch(e){}
  var t0=performance.now(), dur=650;
  function frame(t){
    var k=Math.min(1,(t-t0)/dur);
    var wave=Math.sin(k*Math.PI);
    if(snap) x.putImageData(snap,0,0);
    paintPulseDots184(cv, 1+0.5*wave, 0.55+0.35*wave);
    if(k<1) requestAnimationFrame(frame);
    else{
      if(snap) x.putImageData(snap,0,0);
      try{if(typeof paintHuntDots182==='function') paintHuntDots182(cv)}catch(e2){}
      pulseHuntDots184._on=0;
    }
  }
  requestAnimationFrame(frame);
}
function wrapHuntTap184(){
  hook('patExTap106',function(prev){
    return function(cv,ev){
      var m=huntMode184();
      if(m==='baby'||m==='antenna'){
        var hit=huntHit184(cv,ev);
        if(hit) return prev.apply(this,arguments);
        try{pulseHuntDots184(cv)}catch(e){}
        return;
      }
      return prev.apply(this,arguments);
    };
  });
}

/* ---- 3. Same Shape: room so cards can scroll clear of #fhome ---- */
function markSame184(u){
  var el=$('patterns');
  if(!el) return;
  if(u==='same') el.classList.add('il184-same');
  else el.classList.remove('il184-same');
}
function wrapSameHome184(){
  hook('patOpen106',function(prev){
    return function(u){
      var r=prev.apply(this,arguments);
      try{markSame184(u)}catch(e){}
      return r;
    };
  });
  hook('patSameDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments);
      try{var el=$('patterns');if(el) el.classList.add('il184-same')}catch(e){}
      return r;
    };
  });
}

function install(){
  css184();
  applyNoanimClass184();
  hookStories184();
  watchStories184();
  wrapHuntTap184();
  wrapSameHome184();
  try{if($('look')&&!$('look').classList.contains('hidden')) mountLetterCard184()}catch(e){}
  try{
    if(typeof PAT106==='object') markSame184(PAT106.unit);
  }catch(e2){}
  try{applyLantern184()}catch(e3){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
else install();

root.IL184={
  version:184,
  letterOn:letterOn184,
  letterSet:letterSet184,
  stillLetter:stillLetter184,
  applyLantern:applyLantern184,
  fit:fitLantern184,
  syncHighlight:syncHighlight184,
  huntMode:huntMode184,
  huntHit:huntHit184,
  pulseHuntDots:pulseHuntDots184
};
root.letterSet184=letterSet184;
root.letterOn184=letterOn184;

})(typeof window!=='undefined'?window:this);
