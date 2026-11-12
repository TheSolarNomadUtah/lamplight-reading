// v88: Nine Luna songs (Twinkle, Row, Hey Diddle Diddle, Hello, Clap,
// Sam and the Cap, The Little Lamp, Five Little Stars, and Mary Had a
// Little Lamb — first verse, traditional). QA's mixes are used as
// recorded. The singer's name is Luna. Who Says Moo? and Mmm, Moon stay
// glow-only. Also keeps Look Up keyboard focus on the next planet (or
// the fact card) after a re-render, using a delayed focus on a visible
// node so real Chrome does not drop to the page.
if(typeof SINGERS!=='undefined')SINGERS.splice(0,SINGERS.length,['luna','Luna','f']);
curSinger=function(){return 'luna'};
// SING_CREDIT is a const in v24.js — assigning it throws and would abort the rest of this file.
(function(){
  const txt='Singing: Luna. Played as recorded, with no pitch changes.';
  ['adults','about'].forEach(k=>{
    if(typeof RENDER==='undefined'||!RENDER[k]||RENDER[k]._v88credit)return;
    const r=RENDER[k];
    RENDER[k]=function(){
      const out=r.apply(this,arguments);
      const el=$(k),c=el&&el.querySelector('.singcredit');
      if(c)c.textContent=txt;
      else if(el)el.insertAdjacentHTML('beforeend','<p class="soft card singcredit">'+txt+'</p>');
      return out;
    };
    RENDER[k]._v88credit=1;
  });
})();

function luFocusGo88(){
  const root=document.getElementById('lookup');
  if(!root||typeof LU83==='undefined'||LU83.screen!==3)return false;
  if(LU83.order.every(Boolean)){
    const fact=root.querySelector('.lu83-planet-line');
    if(!fact)return false;
    fact.setAttribute('tabindex','-1');
    try{fact.focus({preventScroll:false})}catch(e){try{fact.focus()}catch(err){}}
    fact.scrollIntoView({block:'nearest',inline:'nearest'});
    return document.activeElement===fact;
  }
  const i=LU83.order.findIndex(x=>!x);
  const id=i>=0&&typeof LU_PLANETS83!=='undefined'?LU_PLANETS83[i].id:null;
  const token=id&&root.querySelector('[data-lu-token="'+id+'"]');
  if(!token)return false;
  token.setAttribute('tabindex','0');
  try{token.focus({preventScroll:false})}catch(e){try{token.focus()}catch(err){}}
  return document.activeElement===token;
}
function luRefocus88(){
  const go=()=>{luFocusGo88()};
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      go();
      setTimeout(go,0);
      setTimeout(()=>{if(!luFocusGo88())setTimeout(go,50)},50);
    });
  });
}
function luBootFocus88(){
  if(typeof luRefocus87==='function')luRefocus87=luRefocus88;
  if(typeof luFocusAfterPlace86==='function')luFocusAfterPlace86=luRefocus88;
  if(typeof luRender83==='function'&&!luRender83._v88){
    const prev=luRender83;
    luRender83=function(){
      const r=prev.apply(this,arguments);
      const fact=document.querySelector('#lookup .lu83-planet-line');
      if(fact)fact.setAttribute('tabindex','-1');
      return r;
    };
    luRender83._v88=1;
  }
}

function songList88(){return (typeof SONGS88!=='undefined'&&SONGS88)||(typeof MUSIC!=='undefined'&&MUSIC.songs)||[]}
function isLuna88(id){return {m1:1,m2:1,m3:1,m4:1,m5:1,m8:1,m9:1,m10:1,m11:1}[id]||false}


function songArt88(id){
  const ink='currentColor';
  const wrap=inner=>`<svg class="songart88" viewBox="0 0 80 80" width="72" height="72" aria-hidden="true" fill="none" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;
  if(id==='m1')return wrap(`<polygon points="40,8 47,30 70,30 51,44 58,68 40,54 22,68 29,44 10,30 33,30"/>`);
  if(id==='m2')return wrap(`<path d="M8 52h64"/><path d="M14 52c4 8 48 8 52 0"/><path d="M20 52l6-18h28l8 18"/><path d="M34 34v-10h4l4 4"/><circle cx="26" cy="62" r="3"/><circle cx="58" cy="62" r="3"/>`);
  if(id==='m3')return wrap(`<path d="M22 28c0-8 8-14 16-10c10 0 16 10 14 20c-2 12-16 18-26 12"/><path d="M36 36v22"/><path d="M36 58c6 6 16 4 18-4"/><ellipse cx="54" cy="22" rx="10" ry="7"/><path d="M62 26c8 2 12 12 6 20"/>`);
  if(id==='m4')return wrap(`<circle cx="40" cy="40" r="22"/><path d="M28 38c2-8 16-8 18 0"/><path d="M50 30l8-8M54 40h12M50 50l8 8"/>`);
  if(id==='m5')return wrap(`<path d="M24 28c-8 4-10 16-4 24c8 10 18 12 24 6"/><path d="M22 40h10M24 48h12"/><path d="M56 28c8 4 10 16 4 24c-8 10-18 12-24 6"/><path d="M58 40H48M56 48H44"/>`);
  if(id==='m6')return wrap(`<ellipse cx="40" cy="48" rx="24" ry="16"/><path d="M20 40c-4-16 8-22 16-14"/><path d="M60 40c4-16-8-22-16-14"/><ellipse cx="40" cy="50" rx="10" ry="8"/><circle cx="36" cy="48" r="1.4" fill="currentColor" stroke="none"/><circle cx="44" cy="48" r="1.4" fill="currentColor" stroke="none"/><path d="M36 54c3 3 5 3 8 0"/>`);
  if(id==='m7')return wrap(`<path d="M50 16c-16 2-28 18-26 34c2 16 18 26 34 22c-14 6-32-4-34-22c-2-18 12-36 26-34z"/>`);
  if(id==='m8')return wrap(`<path d="M22 36c0-12 10-18 22-18s18 6 22 18"/><path d="M18 36h52v8H18z"/><path d="M30 44v8M54 44v8"/>`);
  if(id==='m9')return wrap(`<path d="M32 58h16"/><path d="M36 58v-14h8v14"/><path d="M40 44c8-2 14-10 10-18c-4-6-14-6-16 2"/><path d="M40 24v-6"/>`);
  if(id==='m10')return wrap(`<g>${[[16,32,5],[32,16,5],[48,28,5],[64,18,5],[56,46,5]].map(([x,y,r],i)=>`<polygon points="${x},${y-r} ${x+r*.3},${y-r*.3} ${x+r},${y} ${x+r*.3},${y+r*.3} ${x},${y+r} ${x-r*.3},${y+r*.3} ${x-r},${y} ${x-r*.3},${y-r*.3}"/>`).join('')}</g>`);
  if(id==='m11')return wrap(`<path d="M20 50c-4-2-6-10-2-15c2-8 12-11 19-7c4-8 16-10 23-4c7-2 15 4 15 12c5 3 6 11 2 16c0 7-8 12-17 12c-6 4-15 4-22 0c-7 2-15-3-18-14z"/><path d="M28 42c2-3 7-3 9 0M41 38c2-3 6-3 7 1M53 40c2-3 6-2 7 2M32 54c3 3 8 2 10-1"/><ellipse cx="66" cy="46" rx="8.5" ry="7.5"/><path d="M61 40c-2-6 3-9 6-6c0 3-2 6-5 6"/><circle cx="68.5" cy="45" r="1.3" fill="currentColor" stroke="none"/><path d="M74 48c1 1 1 2-1 3"/><path d="M33 62v10M42 63v10M52 63v9M59 61v10"/><path d="M31 72h5M40 73h5M50 72h5M57 71h5"/><path d="M20 52c-4 2-5 8-1 8"/>`);
  return '';
}

function renderSongs88(){
  const root=$('songs88');if(!root)return;
  const id=MU&&MU.s,songs=songList88(),s=id&&songs.find(x=>x.id===id);
  const back=`<p><button class="bigbtn" type="button" data-songs-home>${gT('Home')}</button></p>`;
  if(!s){
    root.innerHTML=`<div class="card big" style="text-align:center"><h2>${esc(gT('Songs'))}</h2>
      <p class="soft">${esc(gT('Sung by Luna.'))}</p>
      <div class="grid songgrid88">${songs.map(x=>`<button class="card songtile88" type="button" data-song-open="${x.id}"><span class="songartwrap88">${songArt88(x.id)}</span><b>${esc(gT(x.t))}</b><br><span class="soft">${esc(gT(x.band))} · ${esc(gT(x.kind))}</span>${x.credit?`<br><span class="soft">${esc(gT(x.credit))}</span>`:''}${isLuna88(x.id)?'<br><span class="soft">Luna</span>':''}</button>`).join('')}</div>${back}</div>`;
    root.querySelectorAll('[data-song-open]').forEach(b=>b.addEventListener('click',()=>{MU.s=b.dataset.songOpen;renderSongs88()}));
    root.querySelector('[data-songs-home]')?.addEventListener('click',()=>show('hub'));
    return;
  }
  const n=s.lines.length,part={...s,lines:s.lines.slice()},tl=typeof songTimeline==='function'?songTimeline(part,s.bpm):[];
  const kar=typeof karaokeHTML==='function'?karaokeHTML(tl):s.lines.map(l=>`<p>${esc(gT(l.replace(/\|/g,'')))}</p>`).join('');
  root.innerHTML=`<div class="card big" style="text-align:center"><div class="soft">${esc(gT(s.band))} · ${esc(gT(s.kind))}${s.credit?' · '+esc(gT(s.credit)):''}</div>
    <div class="songartwrap88 songartlg88">${songArt88(s.id)}</div>
    <h2>${esc(gT(s.t))}</h2>
    <p class="soft">${isLuna88(s.id)?esc(gT('Sung by Luna.')):''}</p>
    <div class="karaoke">${kar}</div>
    <p><button class="bigbtn p" type="button" data-song-play>▶ ${esc(gT('Play'))}</button>
       <button class="bigbtn" type="button" data-song-stop>⏹ ${esc(gT('Stop'))}</button></p>
    <p id="sfb" class="soft"></p>
    <p><button class="bigbtn" type="button" data-song-back>⬅ ${esc(gT('Songs'))}</button> ${back}</p></div>`;
  root.querySelector('[data-song-play]')?.addEventListener('click',()=>playSong88(s));
  root.querySelector('[data-song-stop]')?.addEventListener('click',()=>{if(typeof musicStop==='function')musicStop();const f=$('sfb');if(f)f.textContent=''});
  root.querySelector('[data-song-back]')?.addEventListener('click',()=>{if(typeof musicStop==='function')musicStop();MU.s=null;renderSongs88()});
  root.querySelector('[data-songs-home]')?.addEventListener('click',()=>{if(typeof musicStop==='function')musicStop();show('hub')});
}
async function playSong88(s){
  if(typeof musicStop==='function')musicStop();
  const f=t=>{const e=$('sfb');if(e)e.textContent=t};
  if(isLuna88(s.id)&&typeof loadSingFor==='function'&&(typeof LANG==='undefined'||LANG!=='es')){
    f('⏳ '+((typeof gT==='function'?gT('Loading…'):'Loading…')));
    const buf=await loadSingFor(s.id,'luna');
    if(buf==='offline')return f('📶 '+(typeof gT==='function'?gT('Needs internet: this singing voice is not downloaded yet.'):'Needs internet: this singing voice is not downloaded yet.'));
    if(!buf)return f('⚠️ '+(typeof gT==='function'?gT('Could not play.'):'Could not play.'));
    f('🎤 Luna');
    const d=playSing(buf);
    const meta=(await (typeof songsSung==='function'?songsSung():Promise.resolve({})))[s.id]||{};
    const n=meta.lines||s.lines.length,part={...s,lines:s.lines.slice(0,n)};
    const tl=songTimeline(part,s.bpm),end=tl.length?tl[tl.length-1].end:1,k=d*.92/end;
    tl.forEach((w,i)=>later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));const e=$('kw'+i);if(e)e.classList.add('on','was')},(w.t*k+.3)*1000));
    later(()=>{document.querySelectorAll('.kw.on').forEach(e=>e.classList.remove('on'));try{markDay('music')}catch(e){}f('⭐ '+(typeof gT==='function'?gT('Great singing!'):'Great singing!'))},d*1000+300);
    return;
  }
  // m6, m7, and Spanish: same glow path as before.
  if(typeof singPlay==='function'){
    MU.v='sing';MU.s=s.id;
    return singPlay(false);
  }
}

function bootSongs88(){
  if(typeof SECTIONS!=='undefined'&&SECTIONS.indexOf('songs88')<0)SECTIONS.push('songs88');
  if(!$('songs88')&&document.querySelector('main'))document.querySelector('main').insertAdjacentHTML('afterbegin','<section id="songs88" class="hidden"></section>');
  RENDER.songs88=function(){if(typeof MU==='undefined')window.MU={};if(!MU||typeof MU!=='object')window.MU={};renderSongs88()};
  if(typeof show==='function'&&!show._v88songs){
    const prev=show;
    show=function(id){
      if(id!=='songs88'&&typeof musicStop==='function'&&$('songs88')&&!$('songs88').classList.contains('hidden'))musicStop();
      return prev.apply(this,arguments);
    };
    show._v88songs=1;
  }
  if(typeof RENDER!=='undefined'&&RENDER.hub){
    const hub=RENDER.hub;
    RENDER.hub=renderHub=function(){
      const r=hub.apply(this,arguments);
      const h=$('hub');if(!h||h.querySelector('[data-songs88]'))return r;
      const tile=document.createElement('button');
      tile.className='hubtile';tile.dataset.songs88='1';
      tile.setAttribute('onclick',"MU.s=null;show('songs88')");
      tile.innerHTML=`🎤 ${gT('Songs')}<small>${gT('Sung by Luna.')}</small>`;
      const lu=h.querySelector('[data-lu83]');
      if(lu)lu.after(tile);
      else{
        const paint=[...h.querySelectorAll('.hubtile')].find(b=>(b.getAttribute('onclick')||'')==="show('paint')");
        if(paint)paint.after(tile);
        else h.querySelector('.explore71 .hubgrid, .hubgrid')?.append(tile);
      }
      if(typeof artRefresh63==='function')artRefresh63(h);
      if(typeof lcHideEntry81==='function')lcHideEntry81(h);
      return r;
    };
  }
}

function bootSing88(){
  // Route every listed song, including Twinkle, through songs.json (opus first).
  if(typeof singPlay==='function'){
    const prev=singPlay;
    singPlay=async function(say){
      const s=typeof MUSIC!=='undefined'&&MUSIC.songs.find(x=>x.id===MU.s);
      if(s&&!say&&(typeof LANG==='undefined'||LANG!=='es')&&typeof songsSung==='function'){
        const songs=await songsSung();
        if(songs[s.id]&&typeof singSong==='function')return singSong(s,songs[s.id]);
      }
      return prev.apply(this,arguments);
    };
  }
  if(typeof loadSingFor==='function'){
    loadSing=function(v){return loadSingFor(MU&&MU.s||'m1','luna')};
  }
  // Cache Luna mixes in this device's format so they play offline after the first visit.
  (async function(){
    try{
      if(!('caches' in window)||!navigator.onLine||typeof songsSung!=='function')return;
      const songs=await songsSung(),c=await caches.open('lamplight-extra');
      const urls=[];
      for(const id of Object.keys(songs)){
        const plan=typeof singPlan==='function'?singPlan(songs[id],'luna'):null;
        if(plan)urls.push(...(plan.stems||[plan.mix]));
      }
      for(const u of urls){
        if(!(await c.match(u,{ignoreSearch:true}))){
          const r=await fetch(u);if(r.ok)await c.put(u,r);
        }
      }
    }catch(e){}
  })();
}

function boot88(){
  luBootFocus88();
  bootSing88();
  bootSongs88();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot88);
else boot88();
setTimeout(boot88,0);

if(document.head&&!document.getElementById('v88css'))document.head.insertAdjacentHTML('beforeend',`<style id="v88css">
#songs88 .songgrid88{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:12px}
#songs88 .songtile88{text-align:center;font-size:1.08rem;padding:14px 10px;display:flex;flex-direction:column;align-items:center;min-height:160px;color:var(--ink)}
#songs88 .songartwrap88{display:grid;place-items:center;margin:0 0 8px;color:var(--ink)}
#songs88 .songartlg88{margin:8px auto 4px}
#songs88 .songartlg88 .songart88{width:112px;height:112px}
#songs88 .songtile88 b{display:block;line-height:1.25}
</style>`);
