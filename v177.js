/* v177: "See your sound" (Pi's Seed toy spec, SEE_YOUR_SOUND_TOY_SPEC.md) as a Patterns Everywhere card,
   plus its bedtime picture (BEDTIME_VISUAL_SPEC.md: the figure slowly turns, then spirals in and goes quiet).
   Two dials 1-6 (left = X, right = Y). The picture is drawn from the numbers (x=sin 2πat, y=sin(2πbt+δ)),
   never from the speakers, so mute, one earbud or a phone speaker all show the same figure.
   Tones: two sines, lower tone fixed at 220 Hz, each ear ≤ 0.12 (−18 dBFS), 0.4 s fades, pitch glides
   (exponential) inside the fade. No microphone, no files, no network. Sound Draws Shapes is unchanged.
   Stops on its button, on leaving, on hidden/pagehide, and when Soft sounds is off. */
(function(){
'use strict';
var PR={"1,1":[1,1,1,220.0,220.0,0],"1,2":[1,2,0,220.0,440.0,0],"1,3":[1,3,1,220.0,660.0,0],"1,4":[1,4,0,220.0,880.0,0],"1,5":[1,5,1,220.0,1100.0,0],"1,6":[1,6,0,220.0,1320.0,0],"2,1":[2,1,0,440.0,220.0,0],"2,2":[1,1,1,220.0,220.0,1],"2,3":[2,3,0,220.0,330.0,0],"2,4":[1,2,0,220.0,440.0,1],"2,5":[2,5,0,220.0,550.0,0],"2,6":[1,3,1,220.0,660.0,1],"3,1":[3,1,1,660.0,220.0,0],"3,2":[3,2,0,330.0,220.0,0],"3,3":[1,1,1,220.0,220.0,1],"3,4":[3,4,0,220.0,293.33,0],"3,5":[3,5,1,220.0,366.67,0],"3,6":[1,2,0,220.0,440.0,1],"4,1":[4,1,0,880.0,220.0,0],"4,2":[2,1,0,440.0,220.0,1],"4,3":[4,3,0,293.33,220.0,0],"4,4":[1,1,1,220.0,220.0,1],"4,5":[4,5,0,220.0,275.0,0],"4,6":[2,3,0,220.0,330.0,1],"5,1":[5,1,1,1100.0,220.0,0],"5,2":[5,2,0,550.0,220.0,0],"5,3":[5,3,1,366.67,220.0,0],"5,4":[5,4,0,275.0,220.0,0],"5,5":[1,1,1,220.0,220.0,1],"5,6":[5,6,0,220.0,264.0,0],"6,1":[6,1,0,1320.0,220.0,0],"6,2":[3,1,1,660.0,220.0,1],"6,3":[2,1,0,440.0,220.0,1],"6,4":[3,2,0,330.0,220.0,1],"6,5":[6,5,0,264.0,220.0,0],"6,6":[1,1,1,220.0,220.0,1]};
var TX={en:{title:'See your sound',tile:'Two numbers draw a shape',intro:'Turn the two dials. Each number is a tone; together they draw a shape. Headphones are optional: the picture comes from the numbers.',
  left:'Left',right:'Right',on:'Sound on',off:'Sound off',count:'Count',top:'Count the bumps on top.',side:'Count the bumps on each side.',
  bed:'Bedtime',bedStop:'Stop',bedNote:'The shape turns slowly, then gets smaller and quieter until it rests.',night:'Good night.',
  aria:'A gold shape drawn by two numbers',down:'down',up:'up'},
 es:{title:'Mira tu sonido',tile:'Dos números dibujan una forma',intro:'Gira los dos diales. Cada número es un tono; juntos dibujan una forma. Los auriculares son opcionales: el dibujo sale de los números.',
  left:'Izquierda',right:'Derecha',on:'Sonido sí',off:'Sonido no',count:'Contar',top:'Cuenta los bultos de arriba.',side:'Cuenta los bultos de cada lado.',
  bed:'Hora de dormir',bedStop:'Parar',bedNote:'La forma gira despacio y luego se hace más pequeña y más bajita hasta descansar.',night:'Buenas noches.',
  aria:'Una forma dorada dibujada por dos números',down:'menos',up:'más'}};
function L(){try{return (typeof LANG==='string'&&LANG==='es')?'es':'en'}catch(e){return 'en'}}
function T(k){return TX[L()][k]}
function E(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}
function $$(id){return document.getElementById(id)}
function reduced(){try{return (typeof patReduced==='function'&&patReduced())||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}}
function soft(){try{return typeof lampSfxOn73==='function'?!!lampSfxOn73():true}catch(e){return true}}
function active(){var p=$$('patterns');try{return PAT106.unit==='seesound'&&p&&!p.classList.contains('hidden')&&!!$$('sys177cv')}catch(e){return false}}
var MAX=.12,FADE=.4,S={a:2,b:3,on:false,breath:0,count:null,raf:0,watch:0,gen:0};
var A=null; /* audio graph */
function pair(){return PR[S.a+','+S.b]}
function audioStart(){if(A||!soft())return false;var c=null;try{c=typeof ac==='function'?ac():null}catch(e){}if(!c)return false;
 try{if(c.state==='suspended')c.resume()}catch(e){}
 var p=pair(),m=c.createGain(),mg=c.createChannelMerger(2),oL=c.createOscillator(),oR=c.createOscillator(),gL=c.createGain(),gR=c.createGain();
 oL.type=oR.type='sine';oL.frequency.value=p[3];oR.frequency.value=p[4];gL.gain.value=gR.gain.value=MAX;
 oL.connect(gL);gL.connect(mg,0,0);oR.connect(gR);gR.connect(mg,0,1);mg.connect(m);m.connect(c.destination);
 var t=c.currentTime;m.gain.setValueAtTime(0,t);m.gain.linearRampToValueAtTime(1,t+FADE);oL.start(t);oR.start(t);
 A={c:c,m:m,oL:oL,oR:oR,n:[m,mg,oL,oR,gL,gR]};return true}
function audioStop(fast){if(!A)return;var a=A;A=null;try{var t=a.c.currentTime,d=fast?.05:FADE;a.m.gain.cancelScheduledValues(t);a.m.gain.setValueAtTime(a.m.gain.value,t);a.m.gain.linearRampToValueAtTime(0,t+d);a.oL.stop(t+d+.05);a.oR.stop(t+d+.05)}catch(e){}
 setTimeout(function(){a.n.forEach(function(n){try{n.disconnect()}catch(e){}})},(fast?150:FADE*1000+200))}
function glide(o,to,t){var cur=o.frequency.value;o.frequency.cancelScheduledValues(t);o.frequency.setValueAtTime(cur,t);if(cur>0&&to>0)o.frequency.exponentialRampToValueAtTime(to,t+FADE);else o.frequency.linearRampToValueAtTime(to,t+FADE)}
function retune(){if(!A)return;var p=pair(),t=A.c.currentTime,g=A.m.gain.value;glide(A.oL,p[3],t);glide(A.oR,p[4],t);
 A.m.gain.cancelScheduledValues(t);A.m.gain.setValueAtTime(g,t);A.m.gain.linearRampToValueAtTime(g*.55,t+FADE*.35);A.m.gain.linearRampToValueAtTime(1,t+FADE)}
function setOn(v){S.on=v;var b=$$('sys177snd');if(b){b.textContent=v?T('on'):T('off');b.setAttribute('aria-pressed',v?'true':'false');b.classList.toggle('on',v)}}
function stopAll(why){audioStop(why==='hidden'||why==='pagehide');setOn(false);bedStop(true)}
/* drawing */
var cv=null,x=null,tr=null,tx=null,t0=0,last=0;
function draw(now){S.raf=0;if(!active()){stopAll('left');return}
 if(now-last>=33){last=now;var p=pair(),ra=p[0],rb=p[1],d=p[2]?Math.PI/2:0,w=cv.width,h=cv.height,cx=w/2,cy=h/2,sc=w*.36,i,tt,tb=reduced()?0:(now-t0)/1000*.25;
  tx.globalCompositeOperation='source-over';tx.fillStyle=reduced()?'#120E18':'rgba(18,14,24,0.16)';tx.fillRect(0,0,w,h);
  tx.beginPath();for(i=0;i<=720;i++){tt=tb+i/720;var px=cx+sc*Math.sin(2*Math.PI*ra*tt),py=cy-sc*Math.sin(2*Math.PI*rb*tt+d);if(i)tx.lineTo(px,py);else tx.moveTo(px,py)}
  var gl=S.breath>0?.55+.35*Math.sin((1-S.breath)*Math.PI):.8;tx.strokeStyle='rgba(230,180,84,'+gl.toFixed(3)+')';tx.lineWidth=Math.max(2,w/300);tx.lineJoin=tx.lineCap='round';tx.stroke();
  x.fillStyle='#120E18';x.fillRect(0,0,w,h);x.drawImage(tr,0,0);
  if(S.count){var el=now-S.count.at,k=Math.max(0,Math.min(S.count.st.length-1,Math.floor(el/900))),s=S.count.st[k];
   if(k>=S.count.nTop)wh(T('side'));
   x.beginPath();x.arc(cx+sc*s.x,cy-sc*s.y,w/90,0,Math.PI*2);x.fillStyle='#FFE4A4';x.globalAlpha=.85;x.fill();x.globalAlpha=1;
   if(el>S.count.st.length*900+400){S.count=null;wh('')}}
  if(S.breath>0)S.breath=Math.max(0,S.breath-.008)}
 S.raf=requestAnimationFrame(draw)}
function wh(s){var e=$$('sys177wh');if(e&&e.textContent!==s)e.textContent=s}
function startCount(){var p=pair(),ra=p[0],rb=p[1],d=p[2]?Math.PI/2:0,tops=[],sides=[],n,t;
 for(n=0;n<rb;n++){t=((.25-d/(2*Math.PI)+n)/rb+1)%1;tops.push({x:Math.sin(2*Math.PI*ra*t),y:1})}
 for(n=0;n<ra;n++){var tR=((.25+n)/ra)%1,tL=((.75+n)/ra)%1;sides.push({x:1,y:Math.sin(2*Math.PI*rb*tR+d)});sides.push({x:-1,y:Math.sin(2*Math.PI*rb*tL+d)})}
 S.count={st:tops.concat(sides),at:performance.now(),nTop:tops.length};wh(T('top'))}
function setDial(w,v){v=Math.max(1,Math.min(6,v));S[w]=v;var e=$$('sys177'+w);if(e)e.textContent=v;if(pair()[5])S.breath=1;S.count=null;wh('');retune();
 var c=$$('sys177cv');if(c)c.setAttribute('aria-label',T('aria')+' ('+S.a+':'+S.b+')')}
/* bedtime picture (Studio's WindDownShapes, Pi's bedtime spec: same envelope on both ears, no flashes) */
function bedStop(quiet){var b=$$('sys177bed');if(window.WindDownShapes&&WindDownShapes.isOn()&&quiet!==2)try{WindDownShapes.detach('off')}catch(e){}
 if(b){b.textContent=T('bed');b.classList.remove('on');b.setAttribute('aria-pressed','false')}var w=$$('sys177wrap');if(w)w.style.display=''}
function bed(){if(!window.WindDownShapes)return;if(WindDownShapes.isOn()){bedStop();return}
 audioStop();setOn(false);S.count=null;wh('');
 var p=pair(),r=p[0]+':'+p[1],k=WindDownShapes.PAIRS[r]?r:(WindDownShapes.PAIRS[p[1]+':'+p[0]]?p[1]+':'+p[0]:'2:3');
 var w=$$('sys177wrap');if(w)w.style.display='none';
 WindDownShapes.attach({host:$$('sys177bedhost'),ratio:k,sound:soft(),ariaLabel:T('bedNote'),isActive:active,
  onDone:function(){bedStop(2);wh(T('night'))},onStop:function(){bedStop(2)}});
 var b=$$('sys177bed');if(b&&WindDownShapes.isOn()){b.textContent=T('bedStop');b.classList.add('on');b.setAttribute('aria-pressed','true')}}
function open(){var el=$$('patterns');if(!el)return;try{PAT106.unit='seesound'}catch(e){}
 if(typeof cleanup124==='function')try{cleanup124()}catch(e){}
 var dial=function(w){return '<div class="sys177-dial"><div class="soft">'+E(T(w==='a'?'left':'right'))+'</div><div class="sys177-row"><button type="button" data-d="'+w+'" data-s="-1" aria-label="'+E(T(w==='a'?'left':'right')+' '+T('down'))+'">−</button><span class="sys177-n" id="sys177'+w+'">'+S[w]+'</span><button type="button" data-d="'+w+'" data-s="1" aria-label="'+E(T(w==='a'?'left':'right')+' '+T('up'))+'">+</button></div></div>'};
 var inner='<p class="soft">'+E(T('intro'))+'</p><div id="sys177wrap"><canvas id="sys177cv" class="sys177-cv" width="560" height="560" role="img" aria-label="'+E(T('aria'))+' ('+S.a+':'+S.b+')"></canvas>'+
  '<p class="soft sys177-wh" id="sys177wh" aria-live="polite"></p><div class="sys177-dials">'+dial('a')+dial('b')+'</div>'+
  '<div class="pat-row"><button type="button" id="sys177snd" aria-pressed="false">'+E(T('off'))+'</button><button type="button" id="sys177cnt">'+E(T('count'))+'</button></div></div>'+
  '<div class="pat-row"><button type="button" id="sys177bed" aria-pressed="false">'+E(T('bed'))+'</button></div><p class="soft">'+E(T('bedNote'))+'</p><div id="sys177bedhost"></div>';
 el.innerHTML=typeof patShell==='function'?patShell(E(T('title')),inner):'<div class="card"><h2>'+E(T('title'))+'</h2>'+inner+'</div>';
 cv=$$('sys177cv');var dp=Math.min(2,window.devicePixelRatio||1);cv.width=cv.height=Math.round(Math.min(560,Math.max(280,(cv.clientWidth||320)))*dp);
 x=cv.getContext('2d');tr=document.createElement('canvas');tr.width=tr.height=cv.width;tx=tr.getContext('2d');tx.fillStyle='#120E18';tx.fillRect(0,0,tr.width,tr.height);
 t0=performance.now();last=0;
 el.querySelectorAll('[data-d]').forEach(function(b){b.onclick=function(){setDial(b.getAttribute('data-d'),S[b.getAttribute('data-d')]+(+b.getAttribute('data-s')))}});
 $$('sys177snd').onclick=function(){if(A){audioStop();setOn(false)}else{if(audioStart())setOn(true)}};
 $$('sys177cnt').onclick=startCount;$$('sys177bed').onclick=bed;
 setOn(!!A);if(!S.raf)S.raf=requestAnimationFrame(draw);
 if(!S.watch)S.watch=setInterval(function(){if(!active()){if(A||S.on)stopAll('left');if(S.raf){cancelAnimationFrame(S.raf);S.raf=0}clearInterval(S.watch);S.watch=0;return}
  if(A&&!soft())stopAll('muted')},400);
 if(typeof turtlePlace105==='function')try{turtlePlace105('patterns')}catch(e){}}
document.addEventListener('visibilitychange',function(){if(document.hidden&&(A||S.on))stopAll('hidden')});
window.addEventListener('pagehide',function(){if(A||S.on)stopAll('pagehide')});
var ART='<svg width="56" height="56" viewBox="-30 -30 60 60" aria-hidden="true"><circle r="27" fill="#1d1726" stroke="#72583f" stroke-width="1.4"/><path d="M0-18C10-18 18-6 12 0S-12 6-18 0-10-18 0-18M18 0C18 10 6 18 0 12S-6-12 0-18" fill="none" stroke="#e6b454" stroke-width="2" stroke-linecap="round" opacity=".9"/><path d="M-20 14c2-3 4 3 6 0s4 3 6 0" fill="none" stroke="#ffe4a4" stroke-width="1.4" stroke-linecap="round"/></svg>';
function tile(){var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="seesound"]'))return;
 var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','seesound');b.setAttribute('onclick',"patOpen106('seesound')");
 b.innerHTML=ART+E(T('title'))+'<small>'+E(T('tile'))+'</small>';
 var after=g.querySelector('[data-pat="sound"],[data-pat="shapes"],[data-pat="sounddraw"]');if(after&&after.nextSibling)g.insertBefore(b,after.nextSibling);else g.appendChild(b)}
if(typeof patOpen106==='function'){var po=patOpen106;patOpen106=function(u){if(u==='seesound'){open();return}if(A||S.on)stopAll('left');var r=po.apply(this,arguments);if(!u)try{tile()}catch(e){}return r}}
if(typeof renderPatterns106==='function'){var rp=renderPatterns106;renderPatterns106=function(){var r=rp.apply(this,arguments);try{tile()}catch(e){}return r}}
if(typeof RENDER==='object'){var pr=RENDER.patterns;RENDER.patterns=function(){var r=typeof pr==='function'?pr.apply(this,arguments):undefined;try{if(PAT106.unit==='seesound')open();else tile()}catch(e){}return r}}
try{var st=document.createElement('style');st.id='v177css';st.textContent='.sys177-cv{display:block;width:min(100%,420px);max-width:100%;aspect-ratio:1;height:auto;margin:8px auto;border-radius:16px;background:#120E18}.sys177-dials{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 20px;margin:6px 0;max-width:100%}.sys177-dial{text-align:center}.sys177-row{display:flex;align-items:center;gap:6px;justify-content:center}.sys177-row button{min-width:44px;min-height:44px;font-size:1.3rem;border-radius:22px}.sys177-n{font-size:1.8rem;min-width:1.4em;text-align:center;color:#b98535}.sys177-wh{min-height:1.4em;text-align:center}#patterns .hubtile[data-pat="seesound"] svg{display:block;margin:0 auto 4px}';document.head.appendChild(st)}catch(e){}
window.IL177={version:177,PAIRS:PR,state:S,open:open,pair:pair,isOn:function(){return !!A},stop:stopAll,MAX:MAX};
})();
