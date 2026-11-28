/* v165: 16-friend companion art swap (Art Director round 3). New art is
   packed in companions-v165.js. Old vNN.js, official Dragon files,
   engine.min.js, dragon.min.json and recipes.js are not edited. show() is
   not wrapped. Deer and Sprites leave the picker; Axolotl and Highland Cow
   join. Saved Deer/Sprite progress is kept and a calm "pick a new friend"
   moment is shown. */
(function(root){
'use strict';
const ORDER165=['dragon','bee','turtle','fern','owl','fox','moth','phoenix','lamp','suntiger','lioncub','firefly','mosshedgehog','glowcap','axolotl','highlandcow'];
const SEXED165={fox:1,suntiger:1,lioncub:1,firefly:1,mosshedgehog:1,glowcap:1,axolotl:1,highlandcow:1};
const RETIRED165={deer_m:1,deer_f:1,deer:1,sprites:1,olivesprite_m:1,olivesprite_f:1,puff:1,dew:1,ember:1};
const ALIAS165={shell:'turtle',rippleturtle:'turtle',ripple:'turtle',lion:'lioncub',moss:'mosshedgehog',cow:'highlandcow','highland-cow':'highlandcow',sun_tiger:'suntiger',tiger:'suntiger'};
const NAME165={
  dragon:'Dragon',bee:'Bee',turtle:'Ripple Turtle',fern:'Fern',owl:'Owl',fox:'Fox',
  moth:'Moth',phoenix:'Phoenix',lamp:'Lamp',suntiger:'Sun Tiger',lioncub:'Lion',
  firefly:'Firefly',mosshedgehog:'Moss',glowcap:'Glowcap',axolotl:'Axolotl',highlandcow:'Highland Cow'
};
const PAT165={
  dragon:'heighway+hex',bee:'hex',turtle:'hex',fern:'self-copy',owl:'spiral',fox:'lissajous',
  moth:'veins',phoenix:'triangle',lamp:'rosette',suntiger:'cymatic',lioncub:'rosette',
  firefly:'sierpinski',mosshedgehog:'pairs',glowcap:'voronoi',axolotl:'equal-groups',highlandcow:'archimedes'
};

function t165(s,o){return typeof gT==='function'?gT(s,o):s}
function e165(s){return typeof esc==='function'?esc(String(s)):String(s).replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]))}
function pid165(){try{return (typeof curPid==='function'&&curPid())||'p1'}catch(e){return 'p1'}}
function phase165(stage){
  if(stage==='egg')return 'egg';
  if(typeof IL119==='object'&&typeof IL119.phase==='function'&&stage!=='hatchling'&&stage!=='young'&&stage!=='grown'&&stage!=='wise'){
    return IL119.phase(stage);
  }
  if(stage==='hatchling'||stage==='young'||stage==='grown'||stage==='wise')return stage;
  const s=Math.max(1,Math.min(6,Number(stage)||1));
  return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}
function canon165(id){
  if(!id)return 'lamp';
  if(ALIAS165[id])return ALIAS165[id];
  const m=/^([a-z]+)_([mf])$/.exec(id);
  if(m)return ALIAS165[m[1]]||m[1];
  return id;
}
function retired165(id){return !!(id&&RETIRED165[id])}

function artPack165(){return (root.IL165ART&&root.IL165ART.art)||(typeof IL165ART==='object'&&IL165ART.art)||null}

let n165=0;
function uniq165(html,uid){
  const ids=[];
  String(html).replace(/\bid="([^"]+)"/g,function(_,id){if(ids.indexOf(id)<0)ids.push(id);return _});
  ids.sort((a,b)=>b.length-a.length);
  let out=String(html);
  ids.forEach(id=>{
    const u=uid+'_'+id;
    out=out.split('id="'+id+'"').join('id="'+u+'"');
    out=out.split('url(#'+id+')').join('url(#'+u+')');
    out=out.split('href="#'+id+'"').join('href="#'+u+'"');
    out=out.split("href='#"+id+"'").join("href='#"+u+"'");
    out=out.split('xlink:href="#'+id+'"').join('xlink:href="#'+u+'"');
  });
  return out;
}

function sexOf165(kind,pid){
  kind=canon165(kind);
  if(!SEXED165[kind])return '';
  try{
    const f=typeof friendsLoad101==='function'?friendsLoad101(pid||pid165()):null;
    if(f&&f[kind]&&(f[kind].sex==='m'||f[kind].sex==='f'))return f[kind].sex;
    const id=kind; // may also be kind_m in the call
  }catch(e){}
  return 'f';
}
function sexFromId165(id,pid){
  const m=/^([a-z]+)_([mf])$/.exec(id||'');
  if(m)return m[2];
  return sexOf165(canon165(id),pid);
}

function markup165(kind,stage,sex){
  const pack=artPack165();if(!pack)return '';
  kind=canon165(kind);
  const ph=phase165(stage);
  const bucket=pack[kind];if(!bucket)return '';
  const want=SEXED165[kind]?(sex||'f'):'';
  const bySex=bucket[want]||bucket['']||bucket[sex==='m'?'f':'']||bucket.f;
  if(!bySex)return '';
  return bySex[ph]||bySex.hatchling||'';
}

function wrapArt165(kind,stage,sex){
  const inner=markup165(kind,stage,sex);
  if(!inner)return '';
  const ph=phase165(stage);
  const uid='c165'+(++n165);
  const pat=PAT165[kind]||'';
  const sx=SEXED165[kind]?(sex||'f'):'';
  const body=uniq165(inner,uid).replace(/xlink:href=/g,'href=');
  return '<g class="il119 il165" data-il-kind="'+e165(kind)+'" data-il-stage="'+e165(ph)+'" data-il-look="inner" data-il-pattern="'+e165(pat)+'" data-il-sex="'+e165(sx)+'" transform="scale(.5)">'+body+'</g>';
}


function currentLook165(opt){
  if(opt&&opt.look)return opt.look;
  try{
    if(typeof IL147==='object'&&typeof IL147.load==='function'){
      const L=IL147.load(pid165());
      if(L)return L;
    }
  }catch(e){}
  return 'inner';
}
function shouldPaintNew165(kind,opt){
  const look=currentLook165(opt);
  if(look&&look!=='inner')return false;
  return ORDER165.indexOf(canon165(kind))>=0;
}

function isDragonEggish165(kind,stage){
  if(canon165(kind)!=='dragon')return false;
  const ph=phase165(stage);
  return ph==='egg'||ph==='hatchling'||stage===1||stage==='egg';
}

function applyAccentMaybe165(kind,html,stage){
  if(!html||isDragonEggish165(kind,stage))return html;
  if(typeof IL163==='object'&&typeof IL163.applyAccent==='function'){
    try{return IL163.applyAccent(kind,html,phase165(stage))}catch(e){}
  }
  return html;
}

function placeholder165(){
  return '<g class="il119 il165" data-il-kind="rest" data-il-stage="rest" data-il-look="inner" transform="scale(.5)">'+
    '<ellipse cx="100" cy="128" rx="46" ry="52" fill="#fff8ec" stroke="#c4b8a4" stroke-width="3"/>'+
    '<circle cx="100" cy="118" r="10" fill="#e6b454" opacity=".45"/>'+
    '</g>';
}

/* ---------- truth lines (Pi-final for Phoenix, Lamp, Glowcap, Axolotl, Cow) ---------- */
function truth165(kind,stage){
  kind=canon165(kind);
  const ph=phase165(stage);
  const lines={
    dragon:"It is the same paper-fold path as the egg, four folds.",
    bee:"The honeycomb grows 1, 7, 19, 37, 61 cells.",
    turtle:"One more ripple ring each stage: 3, 4, 5, 6.",
    fern:"Each little leaf is a tiny copy of the whole fern leaf. The pairs grow 3, 5, 7, 9, and each pair is a little smaller than the one below it.",
    owl:"The counts grow 3, 5, 8, 13: each number is the two before added together.",
    fox:"Count the bumps on top: one more each time it grows.",
    moth:"On each wing it starts with one vein. Every split makes two, so the tips double: 1, 2, 4, 8.",
    phoenix:"Each new row has one more spark: 1, 3, 6, 10 in all.",
    suntiger:"Next-door patches always move opposite ways. At Grown, 2 still lines and 1 still ring make 8 patches.",
    lioncub:"Turn it a little and it looks the same. More petals, smaller turn: 4, 6, 8, then 12.",
    firefly:"Take the middle out of every triangle, again and again: 1, 3, 9, 27.",
    mosshedgehog:"Spines come in pairs. Count by twos: 2, 4, 6, 8.",
    glowcap:"Every spot in a patch is closest to that patch's light.",
    axolotl:"Each side has 3 gills, and every gill has the same number of frills. Equal groups: 3 groups of 1, 2, 3, then 4.",
    highlandcow:"It's one line that winds out from the middle. Go straight up from the middle and count how often you cross it: 1, 2, 3, 4. Each turn steps out the same amount."
  };
  let s=lines[kind]||'';
  if(kind==='lamp'){
    s='Each ring goes through its neighbours\' middles.';
    if(ph==='grown'||ph==='wise')s+=' Exactly six fit around one.';
    if(ph==='wise')s+=' Six more fit in the gaps, and each one lands on two middles.';
  }
  if(kind==='glowcap'&&ph==='wise')s='The wall sits exactly halfway between two lights.';
  if(kind==='axolotl'&&ph==='wise')s='3 groups of 4 make 12: 3 × 4 = 12.';
  return s?t165(s):'';
}

/* ---------- saved-state migration ---------- */
function pickSexRecord165(f,sp){
  const a=f[sp+'_f'],b=f[sp+'_m'];
  const score=x=>x?((Number(x.stage)||0)*100+(Number(x.moments)||0)): -1;
  if(score(a)>=score(b)&&a)return {rec:a,sex:'f'};
  if(b)return {rec:b,sex:'m'};
  if(a)return {rec:a,sex:'f'};
  return {rec:null,sex:'f'};
}
function migrateFriends165(f){
  if(!f||typeof f!=='object')f={active:'lamp',offered:false};
  const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
  ORDER165.forEach(sp=>{
    if(SEXED165[sp]){
      const cur=f[sp];
      if(!cur||(cur.sex!=='m'&&cur.sex!=='f'&&!cur.moments&&!cur.stage)){
        const picked=pickSexRecord165(f,sp);
        const base=norm(cur||picked.rec||null);
        base.sex=cur&&(cur.sex==='m'||cur.sex==='f')?cur.sex:picked.sex;
        f[sp]=base;
      }else if(!cur.sex){
        f[sp].sex=pickSexRecord165(f,sp).sex;
      }
    }else if(!f[sp]){
      f[sp]=norm(null);
    }
  });
  const act=f.active;
  if(retired165(act)&&!f.pickNeeded165){
    f.pickNeeded165=act;
  }
  return f;
}

function migrateAccents165(pid){
  if(typeof IL163!=='object'||typeof IL163.accentLoad!=='function')return;
  try{
    const all=Object.assign({},IL163.accentLoad(pid)||{});
    let changed=false;
    ORDER165.forEach(sp=>{
      if(all[sp])return;
      if(SEXED165[sp]){
        const src=all[sp+'_f']||all[sp+'_m'];
        if(src){all[sp]=src;changed=true}
      }
    });
    if(changed){
      const s=JSON.stringify(all);
      const key='lamp_accent163@'+(pid||pid165()||'device');
      try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(key,s);else localStorage.setItem(key,s)}catch(e){}
    }
  }catch(e){}
}

function installList165(){
  if(typeof FRIENDS101==='undefined')return;
  FRIENDS101.splice(0,FRIENDS101.length,...ORDER165);
  if(typeof IL120==='object'){
    IL120.ids=ORDER165.slice();
    IL120.species=ORDER165.slice();
  }
}

function css165(){
  if(typeof document==='undefined')return;
  if(document.getElementById('il165css'))return;
  const packCss=(root.IL165ART&&root.IL165ART.css)||'';
  const s=document.createElement('style');s.id='il165css';
  s.textContent=packCss+
    '.friendPick101[data-cols="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}'+
    '@container (min-width:560px){.friendPick101[data-cols="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}'+
    '@supports not (container-type:inline-size){@media (min-width:720px){.friendPick101[data-cols="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}}}'+
    '.sexPick165{display:flex;flex-wrap:wrap;gap:8px;margin:.6rem 0 0;align-items:stretch}'+
    '.sexPick165 button{min-height:56px;min-width:56px;padding:.45rem .8rem}'+
    '.friendTruth165{text-align:center;font-size:1.02rem;margin:.35em 0 0;color:var(--ink,#3a3228)}'+
    '.pickNeeded165{max-width:28rem;margin:1rem auto;padding:1rem 1.1rem;border-radius:16px}'+
    '.pickNeeded165 .row165{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:.8rem 0 0}'+
    '.pickNeeded165 button{min-height:56px;min-width:56px;padding:.45rem .9rem}';
  (document.documentElement||document.head).appendChild(s);
}

function markSizes165(rootEl){
  const host=rootEl&&rootEl.querySelectorAll?rootEl:document;
  host.querySelectorAll('svg.lamp73-svg').forEach(svg=>{
    const w=svg.getBoundingClientRect().width;
    if(w>0){
      svg.classList.toggle('il-sm',w<=72);
      svg.classList.toggle('il-xs',w<=52);
    }
  });
}

/* ---------- picker, names, state hooks ---------- */
function hook165(){
  css165();
  installList165();
  const prevSvg=typeof lampSvg73==='function'?lampSvg73:null;
  if(prevSvg&&!lampSvg73._v165){
    lampSvg73=function(){
      let html=prevSvg.apply(this,arguments);
      try{
        if(/xlink:/.test(html)&&!/xmlns:xlink=/.test(html)){
          html=String(html).replace('<svg ','<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
        }
      }catch(e){}
      return html;
    };
    lampSvg73._v165=1;
    lampSvg73._base=prevSvg._base||prevSvg;
  }


  migrateAccents165();

  const prevLoad=typeof friendsLoad101==='function'?friendsLoad101:null;
  if(prevLoad&&!friendsLoad101._v165){
    friendsLoad101=function(pid){
      const f=migrateFriends165(prevLoad(pid)||{active:'lamp',offered:false});
      const id=pid||pid165();
      const raw=(typeof RAW!=='undefined'&&typeof safeJSON==='function')?safeJSON(RAW.get('lamp_friends101@'+id),null):null;
      const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
      if(raw&&typeof raw==='object'){
        ORDER165.forEach(sp=>{
          if(raw[sp]){
            const rec=norm(raw[sp]);
            if(raw[sp].sex==='m'||raw[sp].sex==='f')rec.sex=raw[sp].sex;
            f[sp]=rec;
          }
        });
        if(raw.pickNeeded165)f.pickNeeded165=raw.pickNeeded165;
        else if(retired165(raw.active))f.pickNeeded165=raw.active;
        if(f.pickNeeded165)f.active=f.pickNeeded165;
      }
      return f;
    };
    friendsLoad101._v165=1;
    friendsLoad101._base=prevLoad._base||prevLoad;
  }

  const prevPut=typeof friendsPut101==='function'?friendsPut101:null;
  if(prevPut&&!friendsPut101._v165){
    friendsPut101=function(f,pid){
      const migrated=migrateFriends165(f||{});
      prevPut(migrated,pid);
      const id=pid||pid165();
      if(typeof getProfiles==='function'&&!getProfiles().list.some(p=>p.id===id))return;
      if(typeof RAW==='undefined'||typeof safeJSON!=='function')return;
      const cur=safeJSON(RAW.get('lamp_friends101@'+id),null)||{};
      const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
      ORDER165.forEach(sp=>{
        const rec=norm(migrated[sp]);
        if(migrated[sp]&&(migrated[sp].sex==='m'||migrated[sp].sex==='f'))rec.sex=migrated[sp].sex;
        cur[sp]=rec;
      });
      if(migrated.pickNeeded165){
        cur.pickNeeded165=migrated.pickNeeded165;
        cur.active=migrated.pickNeeded165;
      }else{
        delete cur.pickNeeded165;
      }
      RAW.set('lamp_friends101@'+id,JSON.stringify(cur));
    };
    friendsPut101._v165=1;
    friendsPut101._base=prevPut._base||prevPut;
  }

  const prevState=typeof friendState101==='function'?friendState101:null;
  if(prevState&&!friendState101._v165){
    friendState101=function(kind,pid){
      const raw=kind;
      const sp=canon165(kind);
      if(ORDER165.indexOf(sp)>=0){
        const norm=typeof friendNorm101==='function'?friendNorm101:(x=>x||{});
        const f=friendsLoad101(pid);
        const m=/^([a-z]+)_([mf])$/.exec(raw||'');
        if(m&&f[m[1]+'_'+m[2]])return norm(f[m[1]+'_'+m[2]]);
        return norm(f[sp]);
      }
      return prevState(kind,pid);
    };
    friendState101._v165=1;
    friendState101._base=prevState._base||prevState;
  }

  const prevName=typeof friendKindName101==='function'?friendKindName101:null;
  if(prevName&&!friendKindName101._v165){
    friendKindName101=function(kind){
      const m=/^([a-z]+)_([mf])$/.exec(kind||'');
      if(m&&NAME165[canon165(m[1])]){
        const who=t165(m[2]==='m'?'boy':'girl');
        return t165('{name}, {who}',{name:t165(NAME165[canon165(m[1])]),who});
      }
      const sp=canon165(kind);
      if(NAME165[sp])return t165(NAME165[sp]);
      return prevName(kind);
    };
    friendKindName101._v165=1;
    friendKindName101._base=prevName._base||prevName;
  }

  const prevArt=typeof friendArtInner101==='function'?friendArtInner101:null;
  if(prevArt&&!friendArtInner101._v165){
    friendArtInner101=function(id,stage){
      css165();
      if(retired165(id))return applyAccentMaybe165('lamp',placeholder165(),stage);
      if(shouldPaintNew165(id)){
        const sp=canon165(id);
        const html=wrapArt165(sp,stage,sexFromId165(id));
        if(html)return applyAccentMaybe165(sp,html,stage);
      }
      return prevArt(id,stage);
    };
    friendArtInner101._v165=1;
    friendArtInner101._base=prevArt._base||prevArt;
  }

  if(typeof IL119==='object'&&typeof IL119.art==='function'&&!IL119.art._v165){
    const prevA=IL119.art;
    IL119.art=function(kind,stage,opt){
      if(retired165(kind))return applyAccentMaybe165('lamp',placeholder165(),stage);
      if(shouldPaintNew165(kind,opt)){
        const sp=canon165(kind);
        const html=wrapArt165(sp,stage,sexFromId165(kind));
        if(html)return applyAccentMaybe165(sp,html,stage);
      }
      return prevA.apply(this,arguments);
    };
    IL119.art._v165=1;
    IL119.art._base=prevA._base||prevA;
    const prevK=IL119.kind;
    IL119.kind=function(k){
      const sp=canon165(k);
      if(ORDER165.indexOf(sp)>=0)return sp;
      return prevK?prevK(k):k;
    };
    const prevP=IL119.defaultPattern;
    IL119.defaultPattern=function(kind){
      const sp=canon165(kind);
      if(PAT165[sp])return PAT165[sp];
      return prevP?prevP(kind):'hex';
    };
  }

  const prevPick=typeof friendPick101==='function'?friendPick101:null;
  if(prevPick&&!friendPick101._v165){
    friendPick101=function(id,pid){
      const who=pid||($('pform')&&$('pform').dataset.pid73)||pid165();
      const sp=canon165(id);
      if(ORDER165.indexOf(sp)<0)return;
      const f=friendsLoad101(who);
      const m=/^([a-z]+)_([mf])$/.exec(id||'');
      if(m&&SEXED165[sp]){
        f[sp]=f[sp]||(typeof friendNorm101==='function'?friendNorm101(null):{});
        f[sp].sex=m[2];
      }
      if(f.pickNeeded165){
        copyAccentOnPick165(f.pickNeeded165,sp,who);
        delete f.pickNeeded165;
      }
      f.active=sp;
      f.offered=true;
      friendsPut101(f,who);
      if(typeof lampMountAll73==='function')lampMountAll73();
      else if(typeof friendPickerAttach101==='function')friendPickerAttach101();
      if(typeof friendLine101==='function')friendLine101();
    };
    friendPick101._v165=1;
    friendPick101._base=prevPick._base||prevPick;
  }

  if(typeof friendPickerHTML101==='function'&&!friendPickerHTML101._v165){
    friendPickerHTML101=function(pid){
      css165();
      const f=friendsLoad101(pid);
      const kinds=ORDER165;
      const tiles=kinds.map(k=>{
        const st=friendState101(k,pid),view=typeof lampViewStage74==='function'?lampViewStage74(st):st.stage||1;
        const prev=typeof FRIEND_ART_CTX101!=='undefined'?FRIEND_ART_CTX101:null;
        try{
          if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=k;
          let art='';
          try{art=typeof lampSvg73==='function'?lampSvg73(view,'',false):''}catch(e){}
          const nm=(st.name&&st.name.trim())||friendKindName101(k);
          const on=f.active===k;
          return '<button type="button" role="listitem" class="'+(on?'on':'')+'" data-friend="'+k+'" aria-pressed="'+(on?'true':'false')+'" aria-label="'+e165(nm)+'" onclick="friendPick101(\''+k+'\',\''+e165(pid||'')+'\')">'+art+'<span class="kline">'+e165(nm)+'</span></button>';
        }finally{if(typeof FRIEND_ART_CTX101!=='undefined')FRIEND_ART_CTX101=prev}
      }).join('');
      let sexRow='';
      const cur=canon165(f.active);
      if(SEXED165[cur]&&!f.pickNeeded165){
        const sx=sexOf165(cur,pid);
        const btns=[['f','girl'],['m','boy']].map(([k,en])=>{
          const on=sx===k?' on':'';
          return '<button type="button" class="p'+on+'" data-sex165="'+k+'" aria-pressed="'+(sx===k?'true':'false')+'">'+e165(t165(en))+'</button>';
        }).join('');
        sexRow='<div class="sexPick165" data-sex-pick165="1"><p class="soft">'+e165(t165('A girl or a boy? You can change anytime.'))+'</p>'+btns+'</div>';
      }
      return '<div class="card" data-friends101="1"><h3 class="kline">'+e165(t165('Who sits with you'))+'</h3>'+
        '<p class="soft">'+e165(t165('Pick one anytime. Each keeps its own glow. Only the one who is with you grows; the others rest and need nothing.'))+'</p>'+
        '<div class="friendPick101" data-cols="4" role="list">'+tiles+'</div>'+sexRow+'</div>';
    };
    friendPickerHTML101._v165=1;
  }

  const prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
  if(prevAttach&&!friendPickerAttach101._v165){
    friendPickerAttach101=function(){
      prevAttach.apply(this,arguments);
      css165();
      try{markSizes165(document.getElementById('pform')||document)}catch(e){}
      const host=document.querySelector('[data-sex-pick165]');
      if(host&&!host._il165){
        host._il165=1;
        host.addEventListener('click',function(ev){
          const b=ev.target.closest('[data-sex165]');if(!b)return;
          ev.preventDefault();
          const sex=b.getAttribute('data-sex165');
          const pid=typeof curPid==='function'?curPid():'';
          const form=$('pform');
          const who=(form&&form.dataset.pid73)||pid;
          const f=friendsLoad101(who);
          const sp=canon165(f.active);
          if(!SEXED165[sp])return;
          f[sp]=f[sp]||(typeof friendNorm101==='function'?friendNorm101(null):{});
          f[sp].sex=sex;
          f.active=sp;
          friendsPut101(f,who);
          if(typeof lampMountAll73==='function')lampMountAll73();
          else friendPickerAttach101();
          if(typeof friendLine101==='function')friendLine101();
        });
      }
      try{offerRetired165()}catch(e){}
    };
    friendPickerAttach101._v165=1;
    friendPickerAttach101._base=prevAttach._base||prevAttach;
  }

  const prevLine=typeof friendLine101==='function'?friendLine101:null;
  if(prevLine&&!friendLine101._v165){
    friendLine101=function(){
      prevLine.apply(this,arguments);
      try{drawTruth165();offerRetired165();markSizes165(document.getElementById('hub')||document)}catch(e){}
    };
    friendLine101._v165=1;
    friendLine101._base=prevLine._base||prevLine;
  }

  const prevMount=typeof lampMountAll73==='function'?lampMountAll73:null;
  if(prevMount&&!lampMountAll73._v165){
    lampMountAll73=function(){
      const r=prevMount.apply(this,arguments);
      try{markSizes165(document);drawTruth165()}catch(e){}
      return r;
    };
    lampMountAll73._v165=1;
    lampMountAll73._base=prevMount._base||prevMount;
  }
}

function copyAccentOnPick165(fromKind,toKind,pid){
  if(typeof IL163!=='object'||typeof IL163.accentLoad!=='function')return;
  try{
    const all=Object.assign({},IL163.accentLoad(pid)||{});
    if(all[toKind])return;
    const src=all[fromKind]||all[canon165(fromKind)]||all[fromKind+'_f']||all[fromKind+'_m']||all.sprites;
    if(!src)return;
    all[toKind]=src;
    const s=JSON.stringify(all);
    const key='lamp_accent163@'+(pid||pid165()||'device');
    try{if(typeof RAW!=='undefined'&&RAW.set)RAW.set(key,s);else localStorage.setItem(key,s)}catch(e){}
  }catch(e){}
}

function drawTruth165(){
  const hub=typeof $==='function'?$('hub'):document.getElementById('hub');
  if(!hub||hub.classList.contains('hidden'))return;
  const f=typeof friendsLoad101==='function'?friendsLoad101(pid165()):null;
  if(!f||f.pickNeeded165||retired165(f.active))return;
  const kind=canon165(f.active||'lamp');
  const st=typeof friendState101==='function'?friendState101(kind):null;
  const view=typeof lampViewStage74==='function'&&st?lampViewStage74(st):(st&&st.stage)||1;
  const text=truth165(kind,view);
  let line=hub.querySelector('.friendTruth165');
  if(!text){if(line)line.remove();return}
  if(!line){
    line=document.createElement('p');
    line.className='friendTruth165 soft';
    const host=hub.querySelector('.friendLine101');
    if(host&&host.parentNode)host.after(line);
    else{
      const fig=hub.querySelector('.today64 .lamp73-figure, .today64');
      if(fig)fig.after(line);else return;
    }
  }
  line.textContent=text;
}

function offerRetired165(){
  if(typeof document==='undefined')return;
  const f=typeof friendsLoad101==='function'?friendsLoad101(pid165()):null;
  if(!f||!f.pickNeeded165){
    document.querySelectorAll('[data-pick-needed165],dialog.pickNeeded165').forEach(n=>{
      if(n.tagName==='DIALOG'){try{if(n.open)n.close()}catch(e){}n.remove()}
      else n.remove();
    });
    return;
  }
  if(document.querySelector('dialog.pickNeeded165'))return;
  const d=document.createElement('dialog');
  d.className='pickNeeded165';
  d.setAttribute('aria-modal','true');
  d.setAttribute('data-pick-needed165','1');
  d.setAttribute('aria-label',t165('Pick a new friend'));
  d.innerHTML='<p class="kline">'+e165(t165('Pick a new friend'))+'</p>'+
    '<p>'+e165(t165('This friend has gone to rest. You can pick a new friend anytime. Their glow is still saved.'))+'</p>'+
    '<div class="row165"><button type="button" class="p" data-go="kids">'+e165(t165('Choose a friend'))+'</button>'+
    '<button type="button" data-go="later">'+e165(t165('Maybe later'))+'</button></div>';
  const finish=go=>{
    try{if(d.open)d.close()}catch(e){}
    d.remove();
    if(go==='kids'){
      try{
        if(typeof show==='function')show('kids');
        if(typeof renderKids==='function')renderKids();
        const pid=pid165();
        if(typeof editP==='function')editP(pid);
        if(typeof friendPickerAttach101==='function')friendPickerAttach101();
      }catch(e){}
    }
  };
  d.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>finish(b.getAttribute('data-go')));
  d.addEventListener('cancel',ev=>{ev.preventDefault();finish('later')});
  document.body.appendChild(d);
  if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');
  const first=d.querySelector('button');if(first)try{first.focus({preventScroll:true})}catch(e){}
}

hook165();
try{if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>markSizes165(document))}catch(e){}

root.IL165={
  version:165,
  order:ORDER165.slice(),
  sexed:Object.keys(SEXED165),
  names:NAME165,
  truth:truth165,
  phase:phase165,
  canon:canon165,
  retired:retired165,
  art:wrapArt165,
  markup:markup165,
  sexOf:sexOf165,
  placeholder:placeholder165
};
})(typeof window!=='undefined'?window:this);
(function(root){
'use strict';

function pid166(){
  try{return (typeof curPid==='function'&&curPid())||'p1'}catch(e){return 'p1'}
}
function laterKey166(pid){return 'il165-pick-later@'+(pid||pid166()||'p1')}
function laterHas166(pid){
  try{return sessionStorage.getItem(laterKey166(pid))==='1'}catch(e){return false}
}
function laterSet166(pid){
  try{sessionStorage.setItem(laterKey166(pid),'1')}catch(e){}
}
function laterClear166(pid){
  try{sessionStorage.removeItem(laterKey166(pid))}catch(e){}
}

var skipOffer166=false;

function withOfferSuppressed166(fn){
  var sentinel=null;
  var suppress=skipOffer166||laterHas166();
  if(suppress&&typeof document!=='undefined'){
    sentinel=document.createElement('dialog');
    sentinel.className='pickNeeded165';
    sentinel.setAttribute('data-il166-sentinel','1');
    sentinel.setAttribute('hidden','');
    sentinel.style.display='none';
    (document.documentElement||document.body).appendChild(sentinel);
  }
  try{return fn()}
  finally{if(sentinel&&sentinel.parentNode)sentinel.remove()}
}

function pickNeeded166(){
  try{
    var f=typeof friendsLoad101==='function'?friendsLoad101(pid166()):null;
    return !!(f&&f.pickNeeded165);
  }catch(e){return false}
}

function syncRetiredChrome166(){
  if(typeof document==='undefined')return;
  var hub=typeof $==='function'?$('hub'):document.getElementById('hub');
  if(!hub)return;
  var needed=pickNeeded166();
  var line=hub.querySelector('.friendLine101');
  var cap=hub.querySelector('.today64 .lamp73-figure figcaption, .lamp76-hero figcaption, .lamp73-figure figcaption');
  if(needed){
    if(line){line.textContent='';line.setAttribute('hidden','');line.setAttribute('data-il166-rest','1')}
    if(cap){cap.textContent='';cap.setAttribute('hidden','');cap.setAttribute('data-il166-rest','1')}
  }else{
    if(line&&line.getAttribute('data-il166-rest')){line.removeAttribute('hidden');line.removeAttribute('data-il166-rest')}
    if(cap&&cap.getAttribute('data-il166-rest')){cap.removeAttribute('hidden');cap.removeAttribute('data-il166-rest')}
  }
}

function hook166(){
  var prevLine=typeof friendLine101==='function'?friendLine101:null;
  if(prevLine&&!friendLine101._v166){
    friendLine101=function(){
      var out=withOfferSuppressed166(function(){return prevLine.apply(this,arguments)}.bind(this));
      try{syncRetiredChrome166()}catch(e){}
      return out;
    };
    friendLine101._v166=1;
    friendLine101._base=prevLine._base||prevLine;
  }

  var prevAttach=typeof friendPickerAttach101==='function'?friendPickerAttach101:null;
  if(prevAttach&&!friendPickerAttach101._v166){
    friendPickerAttach101=function(){
      return withOfferSuppressed166(function(){return prevAttach.apply(this,arguments)}.bind(this));
    };
    friendPickerAttach101._v166=1;
    friendPickerAttach101._base=prevAttach._base||prevAttach;
  }

  var prevMount=typeof lampMountAll73==='function'?lampMountAll73:null;
  if(prevMount&&!lampMountAll73._v166){
    lampMountAll73=function(){
      var out=prevMount.apply(this,arguments);
      try{syncRetiredChrome166()}catch(e){}
      return out;
    };
    lampMountAll73._v166=1;
    lampMountAll73._base=prevMount._base||prevMount;
  }

  var prevPick=typeof friendPick101==='function'?friendPick101:null;
  if(prevPick&&!friendPick101._v166){
    friendPick101=function(id,pid){
      var who=pid||(typeof $==='function'&&$('pform')&&$('pform').dataset.pid73)||pid166();
      var out=prevPick.apply(this,arguments);
      laterClear166(who);
      try{syncRetiredChrome166()}catch(e){}
      return out;
    };
    friendPick101._v166=1;
    friendPick101._base=prevPick._base||prevPick;
  }

  if(typeof document!=='undefined'&&!document._il166OfferHook){
    document._il166OfferHook=1;
    document.addEventListener('click',function(ev){
      var t=ev.target;
      var later=t&&t.closest&&t.closest('dialog.pickNeeded165:not([data-il166-sentinel]) [data-go="later"]');
      if(later){laterSet166();return}
      var kids=t&&t.closest&&t.closest('dialog.pickNeeded165:not([data-il166-sentinel]) [data-go="kids"]');
      if(kids){
        skipOffer166=true;
        setTimeout(function(){skipOffer166=false},0);
      }
    },true);
    document.addEventListener('cancel',function(ev){
      var d=ev.target;
      if(d&&d.classList&&d.classList.contains('pickNeeded165')&&!d.getAttribute('data-il166-sentinel')){
        laterSet166();
      }
    },true);
  }

  try{syncRetiredChrome166()}catch(e){}
}

hook166();

root.IL166={
  version:166,
  laterKey:laterKey166,
  laterHas:laterHas166,
  laterSet:laterSet166,
  laterClear:laterClear166
};
})(typeof window!=='undefined'?window:this);
(function(root){
'use strict';

function e167(s){
  return typeof esc==='function'?esc(String(s)):String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function phase167(stage){
  if(typeof IL165==='object'&&typeof IL165.phase==='function')return IL165.phase(stage);
  if(stage==='egg'||stage==='hatchling'||stage==='young'||stage==='grown'||stage==='wise')return stage;
  const s=Math.max(1,Math.min(6,Number(stage)||1));
  return s<=1?'hatchling':s===2?'young':s<=4?'grown':'wise';
}
function currentLook167(opt){
  if(opt&&opt.look)return opt.look;
  try{
    if(typeof IL147==='object'&&typeof IL147.load==='function'){
      const L=IL147.load();
      if(L)return L;
    }
  }catch(e){}
  return 'inner';
}
/* Current engine stages 3–6 are grown (3,4) and wise (5,6). Hatchling and young keep the painting. */
function starfigPhase167(stage){
  const ph=phase167(stage);
  if(ph==='grown'||ph==='wise')return ph;
  const s=Number(stage);
  if(s>=5)return 'wise';
  if(s>=3)return 'grown';
  return null;
}
function starfigBody167(ph){
  const pack=(root.IL165ART&&root.IL165ART.starfig)||(typeof IL165ART==='object'&&IL165ART.starfig)||null;
  return (pack&&ph&&pack[ph])||'';
}
function isStarfigHtml167(html){
  return !!(html&&/data-starfig="phe"/.test(String(html)));
}
function shouldStarfig167(kind,stage,opt){
  const k=(typeof IL165==='object'&&typeof IL165.canon==='function')?IL165.canon(kind):kind;
  if(k!=='phoenix')return false;
  if(currentLook167(opt)!=='inner')return false;
  return !!starfigPhase167(stage);
}
function wrapStarfig167(stage){
  const ph=starfigPhase167(stage);
  const inner=starfigBody167(ph);
  if(!inner||!ph)return '';
  /* Skip the 26% accent overlay: the star figure keeps its own night-sky colors. */
  return '<g class="il119 il165 il167" data-il-kind="phoenix" data-il-stage="'+e167(ph)+'" data-il-look="inner" data-il-pattern="triangle" transform="scale(.5)">'+inner+'</g>';
}

function skipAccentOnStarfig167(){
  if(typeof IL163==='object'&&typeof IL163.applyAccent==='function'&&!IL163.applyAccent._v167){
    const prev=IL163.applyAccent;
    IL163.applyAccent=function(kind,html,stage){
      if(isStarfigHtml167(html))return html;
      return prev.apply(this,arguments);
    };
    IL163.applyAccent._v167=1;
    IL163.applyAccent._base=prev._base||prev;
  }
  if(typeof applyAccentSVG163==='function'&&!applyAccentSVG163._v167){
    const prevA=applyAccentSVG163;
    applyAccentSVG163=function(kind,html,stage){
      if(isStarfigHtml167(html))return html;
      return prevA.apply(this,arguments);
    };
    applyAccentSVG163._v167=1;
  }
}

function hook167(){
  skipAccentOnStarfig167();

  const prevArt=typeof friendArtInner101==='function'?friendArtInner101:null;
  if(prevArt&&!friendArtInner101._v167){
    friendArtInner101=function(id,stage){
      if(shouldStarfig167(id,stage)){
        const html=wrapStarfig167(stage);
        if(html)return html;
      }
      return prevArt.apply(this,arguments);
    };
    friendArtInner101._v167=1;
    friendArtInner101._base=prevArt._base||prevArt;
    /* Keep v163 from re-wrapping us on Look and tinting the star figure. Accents still flow through applyAccentMaybe165 for everyone else. */
    friendArtInner101._v163acc=1;
  }

  if(typeof IL119==='object'&&typeof IL119.art==='function'&&!IL119.art._v167){
    const prev=IL119.art;
    IL119.art=function(kind,stage,opt){
      if(shouldStarfig167(kind,stage,opt)){
        const html=wrapStarfig167(stage);
        if(html)return html;
      }
      return prev.apply(this,arguments);
    };
    IL119.art._v167=1;
    IL119.art._base=prev._base||prev;
    IL119.art._v163=1;
  }
}

hook167();

root.IL167={
  version:167,
  starfigPhase:starfigPhase167,
  wrapStarfig:wrapStarfig167,
  shouldStarfig:shouldStarfig167
};
})(typeof window!=='undefined'?window:this);
(function(root){
'use strict';
/* v168: true-peak limit on the six slightly hot v144 voice clips.
   No new hooks. show() is not wrapped. */
root.IL168={version:168};
})(typeof window!=='undefined'?window:this);
/* v169: screen-aware Grow a Fractal limits. Pixel budget, offscreen + Path2D new level,
   6ms time-slices, first-two-levels speed test, thinner/lower-alpha deep lines,
   log-density ImageData for point fractals. Pinch-zoom tiles and WebGL are deferred.
   v168.js stays frozen. No show() wrap. Quilt, voices, official Dragon art untouched. */
(function(root){
'use strict';
var GOLD='#E6B454',I='#72583f',CR='#fff8ec',NK='#0d0f1a';
var BASE={koch:5,htree:7,levy:10,apollonian:4,pascal:10,chaos:8,hexrings:4,ripples:8,antler:6,sunflower:8,hilbert:4,fern:5,spirals:2,tree:6,dragon:6,pythagoras:6,triangle:6};
var SUNN=[1,13,21,34,55,89,144,233,377,610,987];
var SHR=[0.68,0.66,0.70,2/3];
var SPEED_KEY='lamp_gaf_speed169';
var SLICE=6,MINPX=0.75,HARD=2;
var GOLDANG=360*(1-1/(1+Math.sqrt(5))/1); /* overwritten below with exact 360*(1-1/phi) */
GOLDANG=360*(1-1/((1+Math.sqrt(5))/2));
var cache=null,speed={},tok=0,copies0=null,resizeT=0;

function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v169)return;var next=wrap(prev);next._v169=1;next._base=prev._base||prev;root[name]=next}
function isPhone(){var w=root.innerWidth||0,h=root.innerHeight||0;if(!w||!h)return true;return Math.min(w,h)<=390}
function dpr(){return Math.max(1,Math.min(2,root.devicePixelRatio||1))}
function cssSize(){if(isPhone())return 360;return Math.max(360,Math.min(720,Math.round((root.innerWidth||1280)*0.55)))}
function devicePx(){return isPhone()?360:Math.round(cssSize()*dpr())}
function baseCap(sh){return BASE[sh]!=null?BASE[sh]:6}
function sunN(d){d=Math.max(0,Math.min(SUNN.length-1,d|0));return SUNN[d]}
function ink(sh,d,depth){return(typeof IL154==='object'&&typeof IL154.ink==='function')?IL154.ink(sh,d,depth):GOLD}
function pal(rec,d){var cols=(typeof PAT_PAL106!=='undefined'&&PAT_PAL106[rec.pal||0])||[GOLD,'#C45A3A','#fff6d8'];return cols[d%cols.length]}

function pieceSize(sh,next,S){
  var d=Math.max(1,next|0),a;
  if(sh==='tree'||sh==='antler')return S*0.22*Math.pow(0.68,d);
  if(sh==='pythagoras'){a=Math.cos(28*Math.PI/180);return S*0.16*Math.pow(a,d)}
  if(sh==='dragon'||sh==='levy')return(S*0.5)/Math.pow(Math.SQRT2,d);
  if(sh==='koch')return(S*0.82)/Math.pow(3,d);
  if(sh==='hilbert')return(S*0.84)/Math.max(1,(1<<d)-1);
  if(sh==='htree')return S*0.22*Math.pow(0.707,d);
  if(sh==='spirals')return S*0.28*Math.pow(0.32,d);
  if(sh==='triangle')return(S*0.8)/Math.pow(2,d);
  if(sh==='hexrings')return(S/2)/(d+1+0.6);
  if(sh==='ripples')return(S/2)/Math.max(1,d);
  if(sh==='sunflower')return S*0.42/Math.sqrt(Math.max(1,sunN(d)));
  if(sh==='chaos')return S/Math.sqrt(Math.max(1,d*800));
  if(sh==='fern')return S/Math.sqrt(Math.max(1,d*4000));
  if(sh==='apollonian')return(S*0.46)/Math.pow(2.5,d);
  if(sh==='pascal')return S/Math.max(2,d+2);
  return S/Math.pow(2,d);
}
function speedExtra(){
  if(speed.t1==null||speed.t2==null)return HARD;
  var sum=speed.t1+speed.t2;
  if(sum>48)return 0;
  if(sum>24)return 1;
  return HARD;
}
function loadSpeed(){
  try{var s=root.localStorage&&localStorage.getItem(SPEED_KEY);if(!s)return;var o=JSON.parse(s);if(o&&isFinite(o.t1)&&isFinite(o.t2)){speed.t1=+o.t1;speed.t2=+o.t2}}catch(ex){}
}
function saveSpeed(){
  if(speed.t1==null||speed.t2==null)return;
  try{localStorage.setItem(SPEED_KEY,JSON.stringify({t1:speed.t1,t2:speed.t2,ms:speed.t1+speed.t2,at:Date.now()}))}catch(ex){}
}
function noteTime(depth,ms){
  if(!(ms>=0)||!isFinite(ms))return;
  if(depth===1&&(speed.t1==null||ms<speed.t1))speed.t1=ms;
  if(depth===2&&(speed.t2==null||ms<speed.t2))speed.t2=ms;
  if(speed.t1!=null&&speed.t2!=null)saveSpeed();
}
function capOf(sh){
  var b=baseCap(sh);
  if(isPhone())return b;
  var S=devicePx(),extra=0,maxE=Math.min(HARD,speedExtra()),d;
  for(d=1;d<=maxE;d++){
    if(pieceSize(sh,b+d,S)+1e-12>=MINPX)extra=d;
    else break;
  }
  return b+extra;
}
function copies(rec){
  rec=rec||{};
  var sh=rec.shape,cap=capOf(sh),d=Math.max(0,Math.min(cap,rec.depth||0));
  if(sh==='hilbert')return Math.pow(4,d);
  if(sh==='sunflower')return sunN(d);
  if(sh==='fern')return Math.max(0,d)*4000;
  if(sh==='spirals')return(Math.pow(5,d+1)-1)/4;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return(d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='pythagoras'||sh==='antler')return Math.pow(2,d);
  if(sh==='apollonian'&&typeof IL154==='object'&&typeof IL154.gasket==='function')return IL154.gasket(d).length;
  if(typeof copies0==='function')return copies0({shape:sh,depth:d,angle:rec.angle,poly:rec.poly,seed:rec.seed,season:rec.season});
  return Math.pow(2,d);
}

function css(){
  if(document.getElementById('v169css'))return;
  var s=document.createElement('style');s.id='v169css';
  s.textContent='#patterns canvas#patGrowCv{max-width:min(720px,92vw);height:auto}';
  document.head.appendChild(s);
}
function layout(cv){
  cv=cv||(typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv'));
  if(!cv)return false;
  var cssPx=cssSize(),scale=isPhone()?1:dpr(),bw=Math.round(cssPx*scale),changed=cv.width!==bw||cv.height!==bw;
  if(changed){cv.width=bw;cv.height=bw;cache=null}
  cv.style.width=cssPx+'px';cv.style.height=cssPx+'px';cv.style.maxWidth=cssPx+'px';
  return changed;
}
function recKey(rec,W,H){
  return [rec.shape,rec.angle,rec.pal,rec.season,rec.poly,rec.seed,W,H,night()?'n':'d'].join('|');
}
function saveCache(cv,rec){
  var oc,x;
  try{
    oc=(cache&&cache.canvas&&cache.canvas.width===cv.width)?cache.canvas:document.createElement('canvas');
    oc.width=cv.width;oc.height=cv.height;
    x=oc.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cv,0,0);
    cache={canvas:oc,key:recKey(rec,cv.width,cv.height),depth:rec.depth||0,sh:rec.shape};
  }catch(ex){cache=null}
}
function blitCache(cv){
  if(!cache||!cache.canvas)return false;
  var x=cv.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cache.canvas,0,0);return true;
}
function bg(x,W,H){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function deepAlpha(level,base){var e=Math.max(0,level-base);return e<=0?1:e===1?0.72:0.52}
function deepLw(level,base,raw){var e=Math.max(0,level-base),s=e<=0?1:e===1?0.75:0.55;return Math.max(0.5,raw*s)}
function cancelWork(){tok++}

function strokePath(x,path){
  if(path&&typeof Path2D==='function')x.stroke(path);
}
function newPath(){return(typeof Path2D==='function')?new Path2D():null}

function hilbertPts(n){
  n=Math.max(1,Math.min(8,n||1));
  var pts=[],N=1<<n,i;
  function d2xy(m,d){
    var x=0,y=0,s,rx,ry,t;
    for(s=1;s<m;s*=2){
      rx=1&(d>>1);ry=1&(d^rx);
      if(!ry){if(rx){x=s-1-x;y=s-1-y}t=x;x=y;y=t}
      x+=s*rx;y+=s*ry;d>>=2;
    }
    return[x,y];
  }
  for(i=0;i<N*N;i++)pts.push(d2xy(N,i));
  return pts;
}
function levyPts(W,H,depth,kind){
  var pts,k,i,next,a,b,dx,dy,sign;
  if(kind==='dragon')pts=[{x:W*0.22,y:H*0.55},{x:W*0.78,y:H*0.55}];
  else pts=[{x:W*0.22,y:H*0.62},{x:W*0.72,y:H*0.62}];
  for(k=0;k<depth;k++){
    next=[];
    for(i=0;i<pts.length-1;i++){
      a=pts[i];b=pts[i+1];dx=b.x-a.x;dy=b.y-a.y;
      if(kind==='dragon'){sign=i%2===0?1:-1;next.push(a,{x:a.x+dx/2-sign*dy/2,y:a.y+dy/2+sign*dx/2})}
      else next.push(a,{x:(a.x+b.x)/2-(b.y-a.y)/2,y:(a.y+b.y)/2+(b.x-a.x)/2});
    }
    next.push(pts[pts.length-1]);pts=next;
  }
  return pts;
}
function pathFromPts(pts){
  var p=newPath(),i;
  if(!p||!pts||!pts.length)return null;
  p.moveTo(pts[0].x,pts[0].y);
  for(i=1;i<pts.length;i++)p.lineTo(pts[i].x,pts[i].y);
  return p;
}

function drawKoch(x,W,H,rec){
  var depth=rec.depth||0,s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2;
  var p=newPath();
  function side(ax,ay,bx,by,d){
    if(!d){if(p){p.moveTo(ax,ay);p.lineTo(bx,by)}else{x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke()}return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  x.strokeStyle=ink('koch',depth,depth);x.lineWidth=deepLw(depth,baseCap('koch'),Math.max(0.8,2.4-depth*0.25));x.globalAlpha=deepAlpha(depth,baseCap('koch'));
  if(!p){side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);return}
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);x.stroke(p);
}
function drawTreeLike(x,W,H,rec,sh,only){
  var depth=rec.depth||0,ang=(rec.angle||28)*Math.PI/180,ratio=SHR[Math.max(0,Math.min(3,rec.season||0))],se=rec.season||0,base=baseCap(sh);
  var p=newPath(),tips=[];
  if(!se&&sh==='tree')ratio=0.68;
  function br(px,py,len,a,d){
    if(d>depth||len<0.6)return;
    var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
    if(only==null||d===only){
      if(p){p.moveTo(px,py);p.lineTo(nx,ny)}
      else{x.beginPath();x.moveTo(px,py);x.lineTo(nx,ny);x.stroke()}
      if(se&&d>=depth-1)tips.push({x:nx,y:ny,d:d,a:a});
    }
    br(nx,ny,len*ratio,a-ang,d+1);br(nx,ny,len*ratio,a+ang,d+1);
  }
  var level=only==null?depth:only;
  x.strokeStyle=se||sh==='antler'?ink(sh,level,depth):pal(rec,level);
  x.lineWidth=deepLw(level,base,Math.max(0.6,(6-level)*0.85));
  x.globalAlpha=deepAlpha(level,base);
  br(W/2,H*0.92,H*0.22,Math.PI/2,0);
  if(p)x.stroke(p);
  if(se){
    x.globalAlpha=deepAlpha(level,base);
    tips.forEach(function(tp){
      if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tp.x,tp.y,2.1,0,Math.PI*2);x.fill()}
      else if(se===2){x.fillStyle=sh==='antler'?'#4e6b5c':'#3D6A62';x.beginPath();x.arc(tp.x,tp.y,3.1,0,Math.PI*2);x.fill()}
      else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tp.x+(sh==='antler'?3:(tp.d%2?4:-3)),tp.y+(sh==='antler'?6:5),2,0,Math.PI*2);x.fill()}
    });
  }
}
function drawHLevel(x,W,H,rec,only){
  var depth=rec.depth||0,base=baseCap('htree'),p=newPath();
  function Hn(cx,cy,len,hz,d){
    if(d<0||len<0.6)return;
    if(only==null||d===depth-only){
      if(p){if(hz){p.moveTo(cx-len,cy);p.lineTo(cx+len,cy)}else{p.moveTo(cx,cy-len);p.lineTo(cx,cy+len)}}
      else{x.beginPath();if(hz){x.moveTo(cx-len,cy);x.lineTo(cx+len,cy)}else{x.moveTo(cx,cy-len);x.lineTo(cx,cy+len)}x.stroke()}
    }
    if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
    else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
  }
  var level=only==null?depth:only;
  x.strokeStyle=ink('htree',level,depth);x.lineWidth=deepLw(level,base,Math.max(0.7,2.6-level*0.25));x.globalAlpha=deepAlpha(level,base);
  Hn(W/2,H/2,Math.min(W,H)*0.22,1,depth);
  if(p)x.stroke(p);
}
function drawSpiralLevel(x,W,H,rec,only){
  var depth=rec.depth||0,base=baseCap('spirals'),p;
  function sp(cx,cy,s,rot,d){
    var i,r,a,first,px,py,level=d;
    if(d>depth||s<2)return;
    if(only==null||d===only){
      p=newPath();
      x.strokeStyle=pal(rec,d);x.lineWidth=deepLw(d,base,Math.max(1,2.4-d*0.3));x.globalAlpha=deepAlpha(d,base);
      if(p){
        first=1;
        for(i=0;i<=90;i++){a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;first?(p.moveTo(px,py),first=0):p.lineTo(px,py)}
        x.stroke(p);
      }else{
        x.beginPath();first=1;
        for(i=0;i<=90;i++){a=rot+i/90*Math.PI*4;r=s*i/90;px=cx+Math.cos(a)*r;py=cy+Math.sin(a)*r;first?(x.moveTo(px,py),first=0):x.lineTo(px,py)}
        x.stroke();
      }
    }
    if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*0.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*0.32,rot+0.4,d+1)}
  }
  sp(W/2,H/2,Math.min(W,H)*0.28,0,0);
}
function drawPyth(x,W,H,rec){
  var depth=rec.depth||0,ang=(rec.angle||28)*Math.PI/180,boxes=[],base=baseCap('pythagoras'),i,j,b,p,minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9,pad,sc,cx,cy;
  function sq(px,py,s,a,d){
    if(d>depth||s<0.8)return;
    var c=Math.cos(a),si=Math.sin(a);
    var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
    boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
    if(d===depth)return;
    var sl=s*Math.cos(ang),sr=s*Math.sin(ang),bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
    sq(x2,y2,sl,a-ang,d+1);sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
  }
  var s0=Math.min(W,H)*0.16;
  sq(W/2-s0/2,H*0.86,s0,-Math.PI/2,0);
  if(!boxes.length)return;
  for(i=0;i<boxes.length;i++)for(j=0;j<4;j++){
    p=boxes[i].P[j];
    if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
    if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
  }
  pad=Math.min(W,H)*0.08;sc=Math.min((W-2*pad)/Math.max(maxx-minx,1e-6),(H-2*pad)/Math.max(maxy-miny,1e-6));
  cx=(minx+maxx)/2;cy=(miny+maxy)/2;
  function mx(v){return W/2+(v-cx)*sc}function my(v){return H/2+(v-cy)*sc}
  for(i=0;i<boxes.length;i++){
    b=boxes[i];p=b.P;
    x.globalAlpha=deepAlpha(b.d,base);
    x.fillStyle=x.strokeStyle=pal(rec,b.d);
    x.lineWidth=deepLw(b.d,base,Math.max(1,3-b.d*0.35));
    x.beginPath();x.moveTo(mx(p[0][0]),my(p[0][1]));
    for(j=1;j<4;j++)x.lineTo(mx(p[j][0]),my(p[j][1]));
    x.closePath();x.fill();x.stroke();
  }
}
function drawHil(x,W,H,rec){
  var n=Math.max(1,Math.min(8,rec.depth||1)),pts=hilbertPts(n),i,pad=W*0.08,span=W-pad*2,N=(1<<n)-1||1,p=newPath(),X,Y,base=baseCap('hilbert');
  x.strokeStyle=pal(rec,2);x.lineWidth=deepLw(n,base,Math.max(1,5-n));x.lineCap='round';x.globalAlpha=deepAlpha(n,base);
  if(p){
    for(i=0;i<pts.length;i++){X=pad+pts[i][0]/N*span;Y=pad+pts[i][1]/N*span;i?p.lineTo(X,Y):p.moveTo(X,Y)}
    x.stroke(p);
  }else{
    x.beginPath();
    for(i=0;i<pts.length;i++){X=pad+pts[i][0]/N*span;Y=pad+pts[i][1]/N*span;i?x.lineTo(X,Y):x.moveTo(X,Y)}
    x.stroke();
  }
  rec._hil=pts;rec._hilN=N;rec._hilPad=pad;rec._hilSpan=span;
}
function drawTri(x,W,H,rec){
  var depth=rec.depth||0,base=baseCap('triangle');
  x.globalAlpha=deepAlpha(depth,base);
  (function tri(ax,ay,bx,by,cx,cy,d){
    if(d>=depth){
      x.fillStyle=pal(rec,d);
      x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.lineTo(cx,cy);x.closePath();x.fill();
      return;
    }
    var mx=(ax+bx)/2,my=(ay+by)/2,nx=(bx+cx)/2,ny=(by+cy)/2,px=(cx+ax)/2,py=(cy+ay)/2;
    tri(ax,ay,mx,my,px,py,d+1);tri(mx,my,bx,by,nx,ny,d+1);tri(px,py,nx,ny,cx,cy,d+1);
  })(W/2,H*0.1,W*0.08,H*0.9,W*0.92,H*0.9,0);
}
function drawPas(x,W,H,rec){
  var depth=rec.depth||0,mod=rec.angle===5?5:rec.angle===3?3:2,rows=[],n,k,cell,sz,y0,x0,base=baseCap('pascal');
  rows[0]=[1];
  for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
  sz=Math.min((W-24)/(depth+1),(H-24)/(depth+1),28);
  y0=(H-(depth+1)*sz)/2+sz/2;x0=W/2;
  for(n=0;n<=depth;n++){
    x.globalAlpha=n>base?deepAlpha(n,base):1;
    for(k=0;k<=n;k++){
      cell=rows[n][k];
      x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,mod);
      x.beginPath();x.arc(x0+(k-n/2)*sz,y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
    }
  }
}
function drawHex(x,W,H,rec){
  var depth=rec.depth||0,pad=6,size,R,q,r,s,px,py,ring,base=baseCap('hexrings');
  size=depth<=0?Math.min(W,H)*0.28:(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
  R=size/Math.sqrt(3);
  function hex(cx,cy,rad,col,a){
    var k,p=newPath();x.globalAlpha=a;x.strokeStyle=col;x.lineWidth=deepLw(depth,base,Math.max(0.8,2.2));
    if(p){for(k=0;k<6;k++)p[k?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+k*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+k*Math.PI/3)*rad);p.closePath();x.stroke(p)}
    else{x.beginPath();for(k=0;k<6;k++)x[k?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+k*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+k*Math.PI/3)*rad);x.closePath();x.stroke()}
  }
  for(q=-depth;q<=depth;q++)for(r=-depth;r<=depth;r++){
    s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
    px=W/2+(q+r/2)*size;py=H/2+r*size*Math.sqrt(3)/2;
    ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
    hex(px,py,R,ink('hexrings',ring,depth),ring>base?deepAlpha(ring,base):1);
  }
}
function drawRip(x,W,H,rec){
  var depth=rec.depth||0,i,Rmax=Math.min(W,H)/2-6,step,base=baseCap('ripples'),p;
  if(depth<=0){x.fillStyle=GOLD;x.beginPath();x.arc(W/2,H/2,5,0,Math.PI*2);x.fill();return}
  step=Rmax/Math.max(1,depth);
  for(i=1;i<=depth;i++){
    x.strokeStyle=ink('ripples',i,depth);x.lineWidth=deepLw(i,base,Math.max(0.9,3-i*0.2));x.globalAlpha=i>base?deepAlpha(i,base):1;
    p=newPath();
    if(p){p.arc(W/2,H/2,step*i,0,Math.PI*2);x.stroke(p)}
    else{x.beginPath();x.arc(W/2,H/2,step*i,0,Math.PI*2);x.stroke()}
  }
}
function drawApol(x,W,H,rec,onlyNew){
  var depth=rec.depth||0,cs,prev,sc=Math.min(W,H)*0.46,cx=W/2,cy=H/2,i,c,r,base=baseCap('apollonian'),seen={},k;
  if(typeof IL154!=='object'||typeof IL154.gasket!=='function')return;
  cs=IL154.gasket(depth);
  if(onlyNew&&depth>0){
    prev=IL154.gasket(depth-1);
    for(i=0;i<prev.length;i++){c=prev[i];seen[c.k.toFixed(4)+','+c.x.toFixed(4)+','+c.y.toFixed(4)]=1}
  }
  for(i=0;i<cs.length;i++){
    c=cs[i];k=c.k.toFixed(4)+','+c.x.toFixed(4)+','+c.y.toFixed(4);
    if(onlyNew&&seen[k])continue;
    r=Math.abs(1/c.k)*sc;
    x.globalAlpha=deepAlpha(depth,base);
    x.strokeStyle=ink('apollonian',i?1:0,Math.max(1,depth));
    x.lineWidth=c.k<0?2.2:Math.max(0.6,2-Math.log(c.k+1)*0.35);
    x.beginPath();x.arc(cx+c.x*sc,cy-c.y*sc,r,0,Math.PI*2);x.stroke();
    if(c.k>0&&r>14){
      x.fillStyle=I;x.font=Math.max(9,Math.min(16,r*0.55))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
      x.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
    }
  }
}

/* ---- point fractals: log-density ImageData ---- */
function rgbOf(col){
  col=String(col||GOLD);
  if(col[0]==='#'&&col.length>=7)return[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
  return[230,180,84];
}
function stamp(buf,W,H,px,py,rad){
  var r=Math.max(1,rad||1),x0=Math.max(0,Math.floor(px-r)),x1=Math.min(W-1,Math.ceil(px+r));
  var y0=Math.max(0,Math.floor(py-r)),y1=Math.min(H-1,Math.ceil(py+r)),ix,iy,dx,dy,w,idx,rr=r*r;
  for(iy=y0;iy<=y1;iy++){
    dy=iy+0.5-py;
    for(ix=x0;ix<=x1;ix++){
      dx=ix+0.5-px;w=dx*dx+dy*dy;
      if(w<=rr){idx=iy*W+ix;buf[idx]+=1-w/(rr+0.0001);if(buf[idx]>stamp._max)stamp._max=buf[idx]}
    }
  }
}
function putLogDensity(x,W,H,pts,col,alphaMul,rad){
  var buf=new Float32Array(W*H),i,max,img,d,r,g,b,u,a,logm,rgb=rgbOf(col);
  r=rgb[0];g=rgb[1];b=rgb[2];alphaMul=alphaMul==null?1:alphaMul;rad=rad==null?1.6:rad;
  stamp._max=0;
  for(i=0;i<pts.length;i++) stamp(buf,W,H,pts[i][0],pts[i][1],typeof pts[i][2]==='number'?pts[i][2]:rad);
  max=stamp._max;

  img=x.getImageData(0,0,W,H);d=img.data;logm=Math.log(1+Math.max(1,max));
  for(i=0;i<buf.length;i++){
    if(!buf[i])continue;
    u=Math.log(1+buf[i])/logm;
    a=Math.max(0,Math.min(255,Math.round(255*Math.pow(u,0.85)*alphaMul)));
    d[i*4]=r;d[i*4+1]=g;d[i*4+2]=b;d[i*4+3]=Math.max(d[i*4+3],a);
  }
  x.putImageData(img,0,0);
}
function sunPts(W,H,rec){
  var n=sunN(rec.depth||0),phi=rec.angle||GOLDANG,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th,pts=new Array(n);
  if(Math.abs(phi-137.5)<0.8||Math.abs(phi-GOLDANG)<0.8)phi=GOLDANG;
  for(i=0;i<n;i++){r=c*Math.sqrt(i);th=i*phi*Math.PI/180;pts[i]=[W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.4,3.1-i/n*1.5)]}
  return pts;
}
function chaosPts(W,H,rec){
  var depth=rec.depth||0,N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=0.5,s=(rec.seed||109)>>>0,i,v=[],ang,p,j,last=-1,w=Math.min(W,H)*0.42,same,pts=new Array(N);
  if(typeof IL154==='object'&&typeof IL154.jumpOf==='function')fr=IL154.jumpOf(rec.angle);
  else if(Math.round(rec.angle||50)===33)fr=1/3;
  else if(Math.round(rec.angle||50)===38)fr=1/((1+Math.sqrt(5))/2)/((1+Math.sqrt(5))/2);
  else if((rec.angle||0)>=30&&(rec.angle||0)<=55)fr=(rec.angle||50)/100;
  same=poly===4&&Math.abs(fr-0.5)<1e-9;
  function rnd1(){s=(1664525*s+1013904223)>>>0;return s/4294967296}
  for(i=0;i<poly;i++){ang=-Math.PI/2+i*2*Math.PI/poly;v.push({x:W/2+Math.cos(ang)*w,y:H/2+Math.sin(ang)*w})}
  p={x:W/2,y:H/2};
  for(i=0;i<N;i++){
    j=Math.floor(rnd1()*poly);
    if(same&&j===last)j=(j+1+Math.floor(rnd1()*(poly-1)))%poly;
    last=j;p.x+=(v[j].x-p.x)*fr;p.y+=(v[j].y-p.y)*fr;
    pts[i]=[p.x,p.y];
  }
  return pts;
}
function fernPtsOf(rec,n){
  if(typeof IL149==='object'&&typeof IL149.fernPts==='function')return IL149.fernPts(rec.seed||109,n);
  if(typeof IL150==='object'&&typeof IL150.fernPts==='function')return IL150.fernPts(rec.seed||109,n);
  var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
  var rnd=(function(s){s=s>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}})(rec.seed||109);
  var pts=new Float32Array(n*2),x=0,y=0,i,k,r,a,nx,ny;
  for(i=0;i<n;i++){r=rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];nx=a[0]*x+a[1]*y+a[4];ny=a[2]*x+a[3]*y+a[5];x=nx;y=ny;pts[i*2]=x;pts[i*2+1]=y}
  return pts;
}
function fernXY(W,H,raw){
  var n=(raw.length/2)|0,pts=new Array(n),i;
  for(i=0;i<n;i++)pts[i]=[W*(0.5+raw[i*2]*0.18),H*(0.92-raw[i*2+1]*0.082)];
  return pts;
}
function drawPoints(x,W,H,rec,sh){
  var pts,base=baseCap(sh),a=deepAlpha(rec.depth||0,base),col=ink(sh,rec.depth||0,Math.max(1,rec.depth||0));
  bg(x,W,H);
  if(sh==='sunflower')pts=sunPts(W,H,rec);
  else if(sh==='chaos')pts=chaosPts(W,H,rec);
  else pts=fernXY(W,H,fernPtsOf(rec,Math.max(0,(rec.depth||0)*4000)));
  putLogDensity(x,W,H,pts,col,a);
}

var REPLACE={koch:1,levy:1,dragon:1,hilbert:1,triangle:1,pythagoras:1,pascal:1,hexrings:1,ripples:1,sunflower:1,chaos:1,fern:1};
var ADDITIVE={tree:1,antler:1,htree:1,spirals:1,apollonian:1};

function paintLevel(cv,rec,level){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,sh=rec.shape,slice={};
  for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))slice[k]=rec[k];
  slice.depth=level;
  x.setTransform(1,0,0,1,0,0);
  if(REPLACE[sh]){
    if(sh==='sunflower'||sh==='chaos'||sh==='fern'){drawPoints(x,W,H,slice,sh);x.globalAlpha=1;return}
    bg(x,W,H);
    if(sh==='koch')drawKoch(x,W,H,slice);
    else if(sh==='levy'||sh==='dragon'){
      var pts=levyPts(W,H,level,sh),p=pathFromPts(pts);
      x.strokeStyle=sh==='levy'?ink('levy',level,level):pal(rec,0);
      x.lineWidth=deepLw(level,baseCap(sh),sh==='dragon'?Math.max(1.2,3-level*0.3):Math.max(0.9,2.8-level*0.18));
      x.globalAlpha=deepAlpha(level,baseCap(sh));
      if(p)x.stroke(p);else{x.beginPath();pts.forEach(function(pt,i){i?x.lineTo(pt.x,pt.y):x.moveTo(pt.x,pt.y)});x.stroke()}
    }else if(sh==='hilbert')drawHil(x,W,H,slice);
    else if(sh==='triangle')drawTri(x,W,H,slice);
    else if(sh==='pythagoras')drawPyth(x,W,H,slice);
    else if(sh==='pascal')drawPas(x,W,H,slice);
    else if(sh==='hexrings')drawHex(x,W,H,slice);
    else if(sh==='ripples')drawRip(x,W,H,slice);
  }else if(ADDITIVE[sh]){
    if(sh==='tree'||sh==='antler')drawTreeLike(x,W,H,slice,sh,level);
    else if(sh==='htree')drawHLevel(x,W,H,slice,level);
    else if(sh==='spirals')drawSpiralLevel(x,W,H,slice,level);
    else if(sh==='apollonian')drawApol(x,W,H,slice,true);
  }
  x.globalAlpha=1;
}

function ensureBase(cv,rec,base,prev){
  var key=recKey(rec,cv.width,cv.height),copy,k;
  if(cache&&cache.key===key&&cache.sh===rec.shape&&cache.depth>=base&&cache.depth<=(rec.depth||0)){
    blitCache(cv);
    return cache.depth;
  }
  copy={};
  for(k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))copy[k]=rec[k];
  copy.depth=base;copy._rest=0;
  prev(cv,copy);
  saveCache(cv,copy);
  return base;
}

function addLevelsSync(cv,rec,from,to){
  var L,from2=from;
  if(cache&&cache.key===recKey(rec,cv.width,cv.height)&&cache.depth>=from&&cache.depth<to){
    blitCache(cv);from2=cache.depth;
  }
  for(L=from2+1;L<=to;L++){
    if(REPLACE[rec.shape]||L===from2+1){/* replacement redraws the whole figure */}
    if(ADDITIVE[rec.shape]&&L>from2+1){/* already on canvas */}
    paintLevel(cv,rec,L);
    try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=L;saveCache(cv,c)}catch(ex){}
  }
}

function addLevelsSliced(cv,rec,from,to,done){
  var my=++tok,L=from;
  if(cache&&cache.key===recKey(rec,cv.width,cv.height)&&cache.depth>=from&&cache.depth<to){
    blitCache(cv);L=cache.depth;
  }
  function step(){
    if(tok!==my)return;
    var t0=performance.now();
    do{
      L++;
      if(L>to){try{saveCache(cv,rec)}catch(ex){}if(done)done();return}
      paintLevel(cv,rec,L);
      try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=L;saveCache(cv,c)}catch(ex){}
    }while(performance.now()-t0<SLICE&&L<to);
    if(L<to)requestAnimationFrame(step);
    else{try{saveCache(cv,rec)}catch(ex){}if(done)done()}
  }
  requestAnimationFrame(step);
}

function hookStep(){
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g._rest)return prev.apply(this,arguments);
      if(g&&g.shape){
        var cap=capOf(g.shape),base=baseCap(g.shape);
        if((g.depth||0)>=cap){
          g.msg=t('That is as far as this seed grows.');
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        if((g.depth||0)>=base){
          g.depth=(g.depth||0)+1;
          if(g.depth>=cap)g.msg=t('That is as far as this seed grows.');
          else if(g.msg&&/as far as this seed grows/i.test(g.msg))g.msg='';
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
      }
      return prev.apply(this,arguments);
    };
  });
}
function hookDraw(){
  hookStep();
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!cv)return prev.apply(this,arguments);
      layout(cv);
      if(rec._rest){cancelWork();return prev.apply(this,arguments)}
      var sh=rec.shape,depth=rec.depth||0,base=baseCap(sh),t0,r,from;
      if(depth<=base){
        cancelWork();
        t0=(typeof performance!=='undefined'&&performance.now)?performance.now():0;
        r=prev.apply(this,arguments);
        if(t0)noteTime(depth,((typeof performance!=='undefined'&&performance.now)?performance.now():t0)-t0);
        try{saveCache(cv,rec)}catch(ex){}
        return r;
      }
      from=ensureBase(cv,rec,base,prev);
      if(rd()){addLevelsSync(cv,rec,from,depth);return}
      cancelWork();
      addLevelsSliced(cv,rec,from,depth);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var r=prev.apply(this,arguments),cv;
      try{
        cv=typeof $==='function'?$('patGrowCv'):document.getElementById('patGrowCv');
        if(cv&&layout(cv)&&typeof patGrowDrawOn106==='function'){
          var g=grow();
          if(g)patGrowDrawOn106(cv,g);
        }
      }catch(ex){}
      return r;
    };
  });
  hook('afterShow95',function(prev){
    return function(id){
      var r=prev.apply(this,arguments);
      try{if(id==='patterns'){layout();}}catch(ex){}
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){cancelWork();cache=null}
      return prev.apply(this,arguments);
    };
  });
}

function onResize(){
  if(resizeT)clearTimeout(resizeT);
  resizeT=setTimeout(function(){
    try{
      var el=document.getElementById('patterns');
      if(!el||(el.hidden===true))return;
      var g=grow(),cv=document.getElementById('patGrowCv');
      if(!cv||!g)return;
      cache=null;
      if(typeof patGrowDraw106==='function')patGrowDraw106();
    }catch(ex){}
  },80);
}

function install(){
  if(install._on)return;install._on=1;
  css();
  loadSpeed();
  if(typeof IL156==='object'&&typeof IL156.copies==='function')copies0=IL156.copies;
  else if(typeof IL154==='object'&&typeof IL154.copies==='function')copies0=IL154.copies;
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'&&!IL150.capOf._v169){
    var c0=IL150.capOf;IL150.capOf=function(sh){return capOf(sh)};IL150.capOf._v169=1;IL150.capOf._base=c0._base||c0;
  }
  if(typeof IL154==='object'){IL154.capOf=capOf;IL154.sunN=sunN;IL154.copies=copies}
  if(typeof IL155==='object'){IL155.copies=copies}
  if(typeof IL156==='object'){IL156.capOf=capOf;IL156.copies=copies}
  if(typeof IL157==='object'){IL157.capOf=capOf;IL157.copies=copies}
  hookDraw();
  try{root.addEventListener('resize',onResize);root.addEventListener('orientationchange',onResize)}catch(ex){}
}
root.IL169={version:169,capOf:capOf,baseCap:baseCap,copies:copies,sunN:sunN,layout:layout,pieceSize:pieceSize,SPEED_KEY:SPEED_KEY,devicePx:devicePx,cssSize:cssSize,isPhone:isPhone,install:install,
  notes:'Pinch-zoom tiles and WebGL are deferred to a later pass. v169 uses a pixel-budget cap, offscreen + Path2D new-level draws, 6ms slices, a first-two-levels speed test in localStorage, thinner/lower-alpha deep lines, and log-density ImageData for chaos, sunflower, and fern.'};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v170: time-slice heavy Grow a Fractal paints inside a level (~6 ms)
   (QA: no long task over 50 ms at 4×), plus Pi's v169 must-fixes:
   360 CSS-px canvas keeps base caps; 1.5 CSS px × dpr visibility on the
   real smallest piece; ink() and visible deep strokes; Apollonian −0 key
   (164/488/1460) as an override, v155.js frozen; fitted Lévy; dragon tick
   skipped after extras; Pythagoras jars count what's drawn; fibArms 610/987;
   bilingual cap/rest clear; resize clamps depth and jar.
   Reduced motion stays on the sync path (with these same drawers).
   v169.js stays frozen. No show() wrap. */
(function(root){
'use strict';
var GOLD='#E6B454',I='#72583f',CR='#fff8ec',NK='#0d0f1a';
var SLICE=6,HARD=2,MINCSS=1.5,tok=0,cache=null,gasketMemo={},skipDragonUn=0,resizeT=0;
var GOLDANG=360*(1-1/((1+Math.sqrt(5))/2));
var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
var SHR=[0.68,0.66,0.70,2/3];
var REPLACE={koch:1,levy:1,dragon:1,hilbert:1,triangle:1,pythagoras:1,pascal:1,hexrings:1,ripples:1,sunflower:1,chaos:1,fern:1};
var SPEED_KEY='lamp_gaf_speed169';
var lastChrome=null;
var CAP_EN='That is as far as this seed grows.',REST_EN='It found its rest.';
var CAP_ES='Hasta aquí llega esta semilla.',REST_ES='Encontró su descanso.';

function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v170)return;var next=wrap(prev);next._v170=1;next._base=prev._base||prev;root[name]=next}
function baseCap(sh){return(typeof IL169==='object'&&typeof IL169.baseCap==='function')?IL169.baseCap(sh):6}
function sunN(d){return(typeof IL169==='object'&&typeof IL169.sunN==='function')?IL169.sunN(d):(typeof IL154==='object'&&typeof IL154.sunN==='function')?IL154.sunN(d):1}
function ink(sh,d,depth){return(typeof IL154==='object'&&typeof IL154.ink==='function')?IL154.ink(sh,d,depth):GOLD}
function dpr(){return Math.max(1,Math.min(2,root.devicePixelRatio||1))}
function cssSize(){if(typeof IL169==='object'&&typeof IL169.cssSize==='function')return IL169.cssSize();var w=root.innerWidth||1280;return Math.max(360,Math.min(720,Math.round(w*0.55)))}
function devicePx(){if(typeof IL169==='object'&&typeof IL169.devicePx==='function')return IL169.devicePx();return Math.round(cssSize()*dpr())}
function compactCanvas(){return cssSize()<=360}
function minPx(){return MINCSS*dpr()}
function layout(cv){if(typeof IL169==='object'&&typeof IL169.layout==='function')return IL169.layout(cv);return false}
/* Deep extras must stay at least as visible as the base: alpha ≥ 0.85, lw ≥ 1 device px. */
function deepAlpha(level,base){var e=Math.max(0,level-base);return e<=0?1:e===1?0.92:0.85}
function deepLw(level,base,raw){var e=Math.max(0,level-base),s=e<=0?1:e===1?0.85:0.75;return Math.max(1,raw*s)}
function bg(x,W,H){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function recKey(rec,W,H){return[rec.shape,rec.angle,rec.pal,rec.season,rec.poly,rec.seed,W,H,night()?'n':'d'].join('|')}
function cancel(){tok++}
function timedOut(t0){return performance.now()-t0>=SLICE}
function speedExtra(){
  try{
    var s=root.localStorage&&localStorage.getItem(SPEED_KEY);if(!s)return HARD;
    var o=JSON.parse(s);if(!o||!isFinite(o.t1)||!isFinite(o.t2))return HARD;
    var sum=+o.t1+ +o.t2;if(sum>48)return 0;if(sum>24)return 1;return HARD;
  }catch(ex){return HARD}
}

function saveCache(cv,rec){
  try{
    var oc=(cache&&cache.canvas&&cache.canvas.width===cv.width)?cache.canvas:document.createElement('canvas');
    oc.width=cv.width;oc.height=cv.height;
    oc.getContext('2d').drawImage(cv,0,0);
    cache={canvas:oc,key:recKey(rec,cv.width,cv.height),depth:rec.depth||0,sh:rec.shape};
  }catch(ex){cache=null}
}
function blitCache(cv){
  if(!cache||!cache.canvas)return false;
  var x=cv.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cache.canvas,0,0);return true;
}
function offCanvas(W,H){
  var c=document.createElement('canvas');c.width=W;c.height=H;
  var x=c.getContext('2d');x.lineCap='round';x.lineJoin='round';
  return{c:c,x:x};
}
function blitOff(x,W,H,off,alpha){
  bg(x,W,H);x.globalAlpha=alpha==null?1:alpha;x.drawImage(off.c,0,0);x.globalAlpha=1;
}

/* ---- Pi: messages, resize, fibArms, caps, copies ---- */
function capMsgList(){
  var a=t(CAP_EN),b=t(REST_EN),list=[CAP_EN,REST_EN,CAP_ES,REST_ES];
  if(a&&list.indexOf(a)<0)list.push(a);
  if(b&&list.indexOf(b)<0)list.push(b);
  return list;
}
function isCapOrRest(s){
  if(!s)return false;
  var list=capMsgList(),i;
  for(i=0;i<list.length;i++)if(list[i]&&s.indexOf(list[i])>=0)return true;
  return false;
}
function scrubGrow(g){
  if(!g||!g.shape)return false;
  var cap=capOf(g.shape),changed=false;
  if((g.depth||0)>cap){g.depth=cap;changed=true}
  if((g.depth||0)<cap&&isCapOrRest(g.msg)){g.msg='';changed=true}
  return changed;
}
function syncMsg(g){
  var el=document.getElementById('patGrowMsg');
  if(!el)return;
  el.textContent=(g&&g.msg)?g.msg:'';
}
function fibArms(n){
  var f=[1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987],i;
  for(i=2;i<f.length;i++){
    if(f[i]===n)return{a:f[i-2],b:f[i-1]};
    if(f[i]>n)return{a:f[Math.max(0,i-2)],b:f[i-1]};
  }
  return{a:f[f.length-3],b:f[f.length-2]};
}
function pythCount(rec,S){
  rec=rec||{};
  var depth=Math.max(0,rec.depth||0),ang=(rec.angle||28)*Math.PI/180,n=0,base=baseCap('pythagoras'),s0;
  S=S||devicePx();
  s0=S*0.16;
  if(depth<=base){
    /* Base drawer is v149 dP: cutoff s<2 and that branch geometry. */
    (function sq(px,py,s,a,d){
      if(d>depth||s<2)return;
      if(d===depth)n++;
      if(d===depth)return;
      var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
      var c=Math.cos(a),si=Math.sin(a);
      var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
      sq(x4,y4,sl,a+ang,d+1);sq(x3,y3,sr,a+ang-Math.PI/2,d+1);
    })(S/2-s0/2,S*0.86,s0,-Math.PI/2,0);
  }else{
    (function sq(px,py,s,a,d){
      if(d>depth||s<0.8)return;
      if(d===depth)n++;
      if(d===depth)return;
      var sl=s*Math.cos(ang),sr=s*Math.sin(ang),bL=a+Math.PI/2-ang;
      var x2=px+Math.cos(a)*s,y2=py+Math.sin(a)*s;
      var ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
      sq(x2,y2,sl,a-ang,d+1);sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
    })(S/2-s0/2,S*0.86,s0,-Math.PI/2,0);
  }
  return n;
}
function pieceSize(sh,next,S,rec){
  var d=Math.max(1,next|0),a,b,ang;
  if(sh==='tree'||sh==='antler')return S*0.22*Math.pow(0.68,d);
  if(sh==='pythagoras'){
    ang=(rec&&isFinite(rec.angle)?rec.angle:28);
    a=Math.abs(Math.cos(ang*Math.PI/180));b=Math.abs(Math.sin(ang*Math.PI/180));
    return S*0.16*Math.pow(Math.min(a,b),d);
  }
  if(sh==='dragon'||sh==='levy')return(S*0.5)/Math.pow(Math.SQRT2,d);
  if(sh==='koch')return(S*0.82)/Math.pow(3,d);
  if(sh==='hilbert')return(S*0.84)/Math.max(1,(1<<d)-1);
  if(sh==='htree')return S*0.22*Math.pow(0.707,d);
  if(sh==='spirals')return(S*0.28*Math.pow(0.32,d))/2;
  if(sh==='triangle')return(S*0.8)/Math.pow(2,d);
  if(sh==='hexrings')return(S/2)/(d+1+0.6);
  if(sh==='ripples')return(S/2)/Math.max(1,d);
  if(sh==='sunflower')return S*0.42/Math.sqrt(Math.max(1,sunN(d)));
  if(sh==='chaos')return S/Math.sqrt(Math.max(1,d*800));
  if(sh==='fern')return S/Math.sqrt(Math.max(1,d*4000));
  if(sh==='apollonian')return apolMinR(d,S);
  if(sh==='pascal')return S/Math.max(2,d+2);
  return S/Math.pow(2,d);
}
function capOf(sh,rec){
  var b=baseCap(sh);
  if(compactCanvas())return b;
  var S=devicePx(),extra=0,maxE=Math.min(HARD,speedExtra()),d;
  for(d=1;d<=maxE;d++){
    if(pieceSize(sh,b+d,S,rec)+1e-12>=minPx())extra=d;
    else break;
  }
  return b+extra;
}
function copies(rec){
  rec=rec||{};
  var sh=rec.shape,cap=capOf(sh,rec),d=Math.max(0,Math.min(cap,rec.depth||0));
  if(sh==='hilbert')return Math.pow(4,d);
  if(sh==='sunflower')return sunN(d);
  if(sh==='fern')return Math.max(0,d)*4000;
  if(sh==='spirals')return(Math.pow(5,d+1)-1)/4;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return(d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='pythagoras')return pythCount({shape:sh,depth:d,angle:rec.angle},devicePx());
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='antler')return Math.pow(2,d);
  if(sh==='apollonian')return rawGasket(d).length;
  if(typeof IL169==='object'&&IL169.copies&&!IL169.copies._v170){
    /* fall through only if we somehow missed a shape; do not recurse */
  }
  return Math.pow(2,d);
}

/* ---- polyline / segment stroke in batches onto an opaque-AA offscreen ---- */
function strokePtsChunk(ox,pts,i,budget,style){
  if(i>=pts.length-1)return i;
  ox.strokeStyle=style.stroke;ox.lineWidth=style.lw;ox.globalAlpha=1;
  var p=typeof Path2D==='function'?new Path2D():null,end=Math.min(pts.length-1,i+budget),j;
  if(p){p.moveTo(pts[i].x,pts[i].y);for(j=i+1;j<=end;j++)p.lineTo(pts[j].x,pts[j].y);ox.stroke(p)}
  else{ox.beginPath();ox.moveTo(pts[i].x,pts[i].y);for(j=i+1;j<=end;j++)ox.lineTo(pts[j].x,pts[j].y);ox.stroke()}
  return end;
}
function strokeSegsChunk(ox,segs,i,budget,style){
  if(i>=segs.length)return i;
  ox.strokeStyle=style.stroke;ox.lineWidth=style.lw;ox.globalAlpha=1;
  var p=typeof Path2D==='function'?new Path2D():null,end=Math.min(segs.length,i+budget),j,s;
  if(p){for(j=i;j<end;j++){s=segs[j];p.moveTo(s[0],s[1]);p.lineTo(s[2],s[3])}ox.stroke(p)}
  else{ox.beginPath();for(j=i;j<end;j++){s=segs[j];ox.moveTo(s[0],s[1]);ox.lineTo(s[2],s[3])}ox.stroke()}
  return end;
}

function levyFit(pts,W,H){
  var i,minx=pts[0].x,miny=pts[0].y,maxx=pts[0].x,maxy=pts[0].y,bw,bh,sc,ox,oy,pad=10,p,out=new Array(pts.length);
  for(i=1;i<pts.length;i++){
    p=pts[i];if(p.x<minx)minx=p.x;if(p.y<miny)miny=p.y;if(p.x>maxx)maxx=p.x;if(p.y>maxy)maxy=p.y;
  }
  bw=Math.max(1e-6,maxx-minx);bh=Math.max(1e-6,maxy-miny);
  sc=Math.min((W-2*pad)/bw,(H-2*pad)/bh);
  ox=W/2-sc*(minx+maxx)/2;oy=H/2-sc*(miny+maxy)/2;
  for(i=0;i<pts.length;i++)out[i]={x:pts[i].x*sc+ox,y:pts[i].y*sc+oy};
  return out;
}
function levyPtsStep(st,t0){
  var i,next,a,b,dx,dy,sign,n;
  if(!st.pts){
    if(st.kind==='dragon')st.pts=[{x:st.W*0.22,y:st.H*0.55},{x:st.W*0.78,y:st.H*0.55}];
    else st.pts=[{x:0,y:0},{x:1,y:0}];
    st.k=0;
  }
  while(st.k<st.depth){
    next=[];n=st.pts.length-1;
    for(i=st.i||0;i<n;i++){
      a=st.pts[i];b=st.pts[i+1];dx=b.x-a.x;dy=b.y-a.y;
      if(st.kind==='dragon'){sign=i%2===0?1:-1;next.push(a,{x:a.x+dx/2-sign*dy/2,y:a.y+dy/2+sign*dx/2})}
      else next.push(a,{x:(a.x+b.x)/2-(b.y-a.y)/2,y:(a.y+b.y)/2+(b.x-a.x)/2});
      if((i&63)===63&&timedOut(t0)){st.i=i+1;st._acc=next;return false}
    }
    next=st._acc?st._acc.concat(next):next;
    next.push(st.pts[st.pts.length-1]);st.pts=next;st._acc=null;st.i=0;st.k++;
    if(timedOut(t0)&&st.k<st.depth)return false;
  }
  if(st.kind!=='dragon'&&!st._fitted){st.pts=levyFit(st.pts,st.W,st.H);st._fitted=1}
  return true;
}

function hilbertPts(n){
  n=Math.max(1,Math.min(8,n||1));
  var pts=[],N=1<<n,i;
  function d2xy(m,d){
    var x=0,y=0,s,rx,ry,t;
    for(s=1;s<m;s*=2){
      rx=1&(d>>1);ry=1&(d^rx);
      if(!ry){if(rx){x=s-1-x;y=s-1-y}t=x;x=y;y=t}
      x+=s*rx;y+=s*ry;d>>=2;
    }
    return[x,y];
  }
  for(i=0;i<N*N;i++)pts.push(d2xy(N,i));
  return pts;
}
function kochSegs(W,H,depth){
  var s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2,segs=[];
  function side(ax,ay,bx,by,d){
    if(!d){segs.push([ax,ay,bx,by]);return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);
  return segs;
}
function rgbOf(col){
  col=String(col||GOLD);
  if(col[0]==='#'&&col.length>=7)return[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
  return[230,180,84];
}
function stamp(buf,W,H,px,py,rad,st){
  var r=Math.max(1,rad||1),x0=Math.max(0,Math.floor(px-r)),x1=Math.min(W-1,Math.ceil(px+r));
  var y0=Math.max(0,Math.floor(py-r)),y1=Math.min(H-1,Math.ceil(py+r)),ix,iy,dx,dy,w,idx,rr=r*r;
  for(iy=y0;iy<=y1;iy++){
    dy=iy+0.5-py;
    for(ix=x0;ix<=x1;ix++){
      dx=ix+0.5-px;w=dx*dx+dy*dy;
      if(w<=rr){idx=iy*W+ix;buf[idx]+=1-w/(rr+0.0001);if(buf[idx]>st.max)st.max=buf[idx]}
    }
  }
}

/* ---- Apollonian gasket, v155 algorithm with −0 keys normalised ---- */
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return{x:a,y:b};
}
function tangent(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  var ext=Math.abs(dist-(r1+r2)),inn=Math.abs(dist-Math.abs(r1-r2));
  return{ok:ext<=eps||inn<=eps,res:Math.min(ext,inn)};
}
function overlaps(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  return dist<r1+r2-eps&&dist>Math.abs(r1-r2)+eps;
}
function solutions(c1,c2,c3){
  var k1=c1.k,k2=c2.k,k3=c3.k,rad=k1*k2+k1*k3+k2*k3,out=[],sk,sz,k4,kr,sr,si,rt,c;
  for(sk=1;sk>=-1;sk-=2){
    k4=k1+k2+k3+sk*2*Math.sqrt(Math.max(0,rad));
    if(!isFinite(k4)||Math.abs(k4)<1e-8)continue;
    kr=Math.round(k4);if(kr===0)continue;
    sr=k1*k2*(c1.x*c2.x-c1.y*c2.y)+k1*k3*(c1.x*c3.x-c1.y*c3.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y);
    si=k1*k2*(c1.x*c2.y+c1.y*c2.x)+k1*k3*(c1.x*c3.y+c1.y*c3.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x);
    rt=csqrt(sr,si);
    for(sz=1;sz>=-1;sz-=2){
      c={k:kr,x:(k1*c1.x+k2*c2.x+k3*c3.x+sz*2*rt.x)/kr,y:(k1*c1.y+k2*c2.y+k3*c3.y+sz*2*rt.y)/kr};
      if(tangent(c,c1,1e-6).ok&&tangent(c,c2,1e-6).ok&&tangent(c,c3,1e-6).ok)out.push(c);
    }
  }
  return out;
}
function fixed0(n){var s=Number(n).toFixed(5);return s==='-0.00000'?'0.00000':s}
function gasketKey(c){return Math.round(c.k)+':'+fixed0(c.x)+':'+fixed0(c.y)}
function gasketStart(){
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d=null,sols=solutions(a,b,c),i,cs,seen;
  for(i=0;i<sols.length;i++)if(sols[i].k>0&&Math.abs(sols[i].k-3)<1e-6){d=sols[i];break}
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];seen={};
  cs.forEach(function(c){seen[gasketKey(c)]=1});
  return{cs:cs,q:[[0,1,2],[0,1,3],[0,2,3],[1,2,3]],nq:[],seen:seen,gi:0,qi:0};
}
function gasketStep(st,depth,t0){
  var t,c1,c2,c3,sols,si,n,k,ok,j,ix;
  if(st.gi>=depth)return true;
  while(st.gi<depth){
    while(st.qi<st.q.length){
      t=st.q[st.qi];c1=st.cs[t[0]];c2=st.cs[t[1]];c3=st.cs[t[2]];
      sols=solutions(c1,c2,c3);
      for(si=0;si<sols.length;si++){
        n=sols[si];if(n.k<=0)continue;
        if(Math.hypot(n.x,n.y)+1/n.k>1.02)continue;
        k=gasketKey(n);if(st.seen[k])continue;
        ok=1;
        for(j=0;j<st.cs.length;j++){if(overlaps(n,st.cs[j],1e-4)){ok=0;break}}
        if(!ok)continue;
        st.seen[k]=1;st.cs.push(n);ix=st.cs.length-1;
        st.nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
      }
      st.qi++;
      if(timedOut(t0))return false;
    }
    st.q=st.nq;st.nq=[];st.qi=0;st.gi++;
    if(timedOut(t0)&&st.gi<depth)return false;
  }
  return true;
}
function rawGasket(depth){
  depth=Math.max(0,Math.min(8,depth|0));
  if(gasketMemo[depth])return gasketMemo[depth];
  var st=gasketStart(),forever=performance.now()+1e8,d;
  gasketStep(st,depth,forever);
  gasketMemo[depth]=st.cs;
  for(d=0;d<depth;d++)if(!gasketMemo[d]){
    /* leave holes; only store exact depth and any prefix we can */
  }
  return st.cs;
}
function apolMinR(d,S){
  var cs=rawGasket(d),sc=S*0.46,i,r,minr=Infinity;
  for(i=0;i<cs.length;i++){r=Math.abs(1/cs[i].k)*sc;if(r>0&&r<minr)minr=r}
  return isFinite(minr)?minr:0;
}

/* ---- a steppable painter for one level ---- */
function makeJob(cv,rec,level){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,sh=rec.shape,base=baseCap(sh);
  var slice={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))slice[k]=rec[k];
  slice.depth=level;
  var job={sh:sh,level:level,phase:'init',i:0,W:W,H:H,x:x,rec:slice,base:base,alpha:deepAlpha(level,base)};
  if(sh==='levy'||sh==='dragon'){
    job.kind=sh;
    job.style={stroke:ink(sh,level,level),lw:deepLw(level,base,sh==='dragon'?Math.max(1.2,3-level*0.3):Math.max(0.9,2.8-level*0.18))};
    job.phase='pts';
  }else if(sh==='hilbert'){
    job.style={stroke:ink('hilbert',level,level),lw:deepLw(level,base,Math.max(1,5-level))};
    job.phase='hilpts';
  }else if(sh==='koch'){
    job.style={stroke:ink('koch',level,level),lw:deepLw(level,base,Math.max(0.8,2.4-level*0.25))};
    job.phase='kochsegs';
  }else if(sh==='sunflower'||sh==='chaos'||sh==='fern'){
    job.phase='ptsgen';
    job.col=ink(sh,level,Math.max(1,level));
    job.rad=sh==='sunflower'?null:1.6;
  }else if(sh==='apollonian'){
    job.phase='gasket';
    job.onlyNew=false;
  }else if(sh==='triangle'){
    job.phase='tricollect';
  }else if(sh==='pythagoras'){
    job.phase='pythcollect';
  }else if(sh==='spirals'){
    job.phase='spicollect';
  }else if(sh==='tree'||sh==='antler'){
    job.phase='treecollect';
  }else if(sh==='htree'){
    job.phase='hcollect';
  }else if(sh==='pascal'){
    job.phase='pascal';
  }else if(sh==='hexrings'){
    job.phase='hex';
  }else if(sh==='ripples'){
    job.phase='ripples';
  }else{
    job.phase='fallback';
  }
  return job;
}

function sunPts(W,H,rec){
  var n=sunN(rec.depth||0),phi=rec.angle||GOLDANG,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th,pts=new Array(n);
  if(Math.abs(phi-137.5)<0.8||Math.abs(phi-GOLDANG)<0.8)phi=GOLDANG;
  for(i=0;i<n;i++){r=c*Math.sqrt(i);th=i*phi*Math.PI/180;pts[i]=[W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.4,3.1-i/n*1.5)]}
  return pts;
}
function chaosPtsChunk(st,t0){
  var rec=st.rec,W=st.W,H=st.H,depth=rec.depth||0,N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=0.5,same,j;
  if(!st._chaos){
    if(typeof IL154==='object'&&typeof IL154.jumpOf==='function')fr=IL154.jumpOf(rec.angle);
    else if(Math.round(rec.angle||50)===33)fr=1/3;
    else if(Math.round(rec.angle||50)===38)fr=1/((1+Math.sqrt(5))/2)/((1+Math.sqrt(5))/2);
    else if((rec.angle||0)>=30&&(rec.angle||0)<=55)fr=(rec.angle||50)/100;
    same=poly===4&&Math.abs(fr-0.5)<1e-9;
    st._chaos={fr:fr,same:same,s:(rec.seed||109)>>>0,v:[],p:{x:W/2,y:H/2},last:-1,i:0,N:N,poly:poly,w:Math.min(W,H)*0.42};
    for(j=0;j<poly;j++)st._chaos.v.push({x:W/2+Math.cos(-Math.PI/2+j*2*Math.PI/poly)*st._chaos.w,y:H/2+Math.sin(-Math.PI/2+j*2*Math.PI/poly)*st._chaos.w});
    st.pts=[];
  }
  var C=st._chaos,rnd;
  function rnd1(){C.s=(1664525*C.s+1013904223)>>>0;return C.s/4294967296}
  while(C.i<C.N){
    j=Math.floor(rnd1()*C.poly);
    if(C.same&&j===C.last)j=(j+1+Math.floor(rnd1()*(C.poly-1)))%C.poly;
    C.last=j;C.p.x+=(C.v[j].x-C.p.x)*C.fr;C.p.y+=(C.v[j].y-C.p.y)*C.fr;
    st.pts.push([C.p.x,C.p.y]);C.i++;
    if((C.i&31)===0&&timedOut(t0))return false;
  }
  return true;
}
function fernPtsChunk(st,t0){
  var rec=st.rec,n=Math.max(0,(rec.depth||0)*4000),W=st.W,H=st.H;
  if(!st._fern){
    st._fern={rnd:(function(s){s=(rec.seed||109)>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}})(),x:0,y:0,i:0,n:n};
    st.pts=[];
  }
  var F=st._fern,r,k,a,nx,ny;
  while(F.i<F.n){
    r=F.rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];
    nx=a[0]*F.x+a[1]*F.y+a[4];ny=a[2]*F.x+a[3]*F.y+a[5];F.x=nx;F.y=ny;
    st.pts.push([W*(0.5+F.x*0.18),H*(0.92-F.y*0.082)]);F.i++;
    if((F.i&63)===0&&timedOut(t0))return false;
  }
  return true;
}

function stepJob(job,t0){
  var i,n,st,p,pad,span,N,X,Y,sc,cx,cy,minx,maxx,miny,maxy;
  if(job.phase==='pts'){
    job.depth=job.level;
    if(!levyPtsStep(job,t0))return false;
    job.off=offCanvas(job.W,job.H);job.i=0;job.phase='stroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hilpts'){
    st=hilbertPts(Math.max(1,Math.min(8,job.level||1)));
    pad=job.W*0.08;span=job.W-pad*2;N=(1<<Math.max(1,job.level))-1||1;
    job.pts=st.map(function(pt){return{x:pad+pt[0]/N*span,y:pad+pt[1]/N*span}});
    job.off=offCanvas(job.W,job.H);job.i=0;job.phase='stroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='kochsegs'){
    job.segs=kochSegs(job.W,job.H,job.level);
    job.off=offCanvas(job.W,job.H);job.i=0;job.phase='segstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='stroke'){
    while(job.i<job.pts.length-1){
      job.i=strokePtsChunk(job.off.x,job.pts,job.i,64,job.style);
      if(timedOut(t0)&&job.i<job.pts.length-1)return false;
    }
    blitOff(job.x,job.W,job.H,job.off,job.alpha);job.phase='done';return true;
  }
  if(job.phase==='segstroke'){
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(job.off.x,job.segs,job.i,64,job.style);
      if(timedOut(t0)&&job.i<job.segs.length)return false;
    }
    blitOff(job.x,job.W,job.H,job.off,job.alpha);job.phase='done';return true;
  }

  if(job.phase==='ptsgen'){
    if(job.sh==='sunflower'){job.pts=sunPts(job.W,job.H,job.rec);job.phase='stamp';job.i=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    else if(job.sh==='chaos'){if(!chaosPtsChunk(job,t0))return false;job.phase='stamp';job.i=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    else{if(!fernPtsChunk(job,t0))return false;job.phase='stamp';job.i=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    if(timedOut(t0))return false;
  }
  if(job.phase==='stamp'){
    n=job.pts.length;
    while(job.i<n){
      p=job.pts[job.i];
      stamp(job.buf,job.W,job.H,p[0],p[1],typeof p[2]==='number'?p[2]:(job.rad||1.6),job);
      job.i++;
      if((job.i&15)===0&&timedOut(t0))return false;
    }
    job.phase='put';job.i=0;
    job.img=job.x.createImageData(job.W,job.H);
    job.rgb=rgbOf(job.col);
    job.bgc=night()?[13,15,26,255]:[255,248,236,255];
    job.logm=Math.log(1+Math.max(1,job.max));
    if(timedOut(t0))return false;
  }
  if(job.phase==='put'){
    var d=job.img.data,r=job.rgb[0],g=job.rgb[1],b=job.rgb[2],u,a,idx,row,rows=32,y1,W=job.W,H=job.H,buf=job.buf,logm=job.logm,alphaMul=job.alpha,bgc=job.bgc,j,j0,j1;
    while(job.i<H){
      y1=Math.min(H,job.i+rows);
      j0=job.i*W*4;j1=y1*W*4;
      for(j=j0;j<j1;j+=4){d[j]=bgc[0];d[j+1]=bgc[1];d[j+2]=bgc[2];d[j+3]=255}
      for(row=job.i;row<y1;row++){
        for(i=0;i<W;i++){
          idx=row*W+i;if(!buf[idx])continue;
          u=Math.log(1+buf[idx])/logm;
          a=Math.max(0,Math.min(255,Math.round(255*Math.pow(u,0.85)*alphaMul)));
          d[idx*4]=r;d[idx*4+1]=g;d[idx*4+2]=b;d[idx*4+3]=Math.max(d[idx*4+3],a);
        }
      }
      job.x.putImageData(job.img,0,0,0,job.i,W,y1-job.i);
      job.i=y1;
      if(timedOut(t0)&&job.i<H)return false;
    }
    job.phase='done';return true;
  }

  if(job.phase==='gasket'){
    var mem=gasketMemo[job.level];
    if(mem){job.cs=mem;job.phase='apolstroke';job.i=0;job.off=offCanvas(job.W,job.H);if(timedOut(t0))return false}
    else{
      if(!job.gst)job.gst=gasketStart();
      if(!gasketStep(job.gst,job.level,t0))return false;
      job.cs=job.gst.cs;gasketMemo[job.level]=job.cs;
      job.phase='apolstroke';job.i=0;job.off=offCanvas(job.W,job.H);
      if(timedOut(t0))return false;
    }
  }
  if(job.phase==='apolstroke'){
    var cs=job.cs,sc=Math.min(job.W,job.H)*0.46,cx=job.W/2,cy=job.H/2,c,rad,ox=job.off.x;
    ox.lineCap='round';
    while(job.i<cs.length){
      c=cs[job.i];
      job.i++;
      rad=Math.abs(1/c.k)*sc;
      ox.globalAlpha=1;
      ox.strokeStyle=ink('apollonian',job.i>1?1:0,Math.max(1,job.level));
      ox.lineWidth=c.k<0?2.2:Math.max(1,2-Math.log(c.k+1)*0.35);
      ox.beginPath();ox.arc(cx+c.x*sc,cy-c.y*sc,rad,0,Math.PI*2);ox.stroke();
      if(c.k>0&&rad>14){
        ox.fillStyle=I;ox.font=Math.max(9,Math.min(16,rad*0.55))+'px sans-serif';ox.textAlign='center';ox.textBaseline='middle';
        ox.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
      }
      if((job.i&15)===0&&timedOut(t0))return false;
    }
    blitOff(job.x,job.W,job.H,job.off,job.alpha);
    job.phase='done';return true;
  }

  if(job.phase==='tricollect'){
    var depth=job.level,stack,item,ax,ay,bx,by,cx,cy,d,mx,my,nx,ny,px,py,n;
    if(!job.tris){
      job.tris=[];job.stack=[[job.W/2,job.H*0.1,job.W*0.08,job.H*0.9,job.W*0.92,job.H*0.9,0]];
    }
    stack=job.stack;
    while(stack.length){
      item=stack.pop();ax=item[0];ay=item[1];bx=item[2];by=item[3];cx=item[4];cy=item[5];d=item[6];
      if(d>=depth)job.tris.push(item);
      else{
        mx=(ax+bx)/2;my=(ay+by)/2;nx=(bx+cx)/2;ny=(by+cy)/2;px=(cx+ax)/2;py=(cy+ay)/2;
        stack.push([px,py,nx,ny,cx,cy,d+1],[mx,my,bx,by,nx,ny,d+1],[ax,ay,mx,my,px,py,d+1]);
      }
      if((job.tris.length&63)===0&&timedOut(t0))return false;
    }
    job.off=offCanvas(job.W,job.H);job.i=0;job.phase='trifill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='trifill'){
    var ox=job.off.x,tr,col=ink('triangle',job.level,job.level);
    while(job.i<job.tris.length){
      tr=job.tris[job.i];
      ox.globalAlpha=1;ox.fillStyle=col;
      ox.beginPath();ox.moveTo(tr[0],tr[1]);ox.lineTo(tr[2],tr[3]);ox.lineTo(tr[4],tr[5]);ox.closePath();ox.fill();
      job.i++;
      if((job.i&15)===0&&timedOut(t0))return false;
    }
    blitOff(job.x,job.W,job.H,job.off,job.alpha);job.phase='done';return true;
  }

  if(job.phase==='pythcollect'){
    var depth=job.level,ang=(job.rec.angle||28)*Math.PI/180,boxes=[];
    (function sq(px,py,s,a,d){
      if(d>depth||s<0.8)return;
      var c=Math.cos(a),si=Math.sin(a);
      var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
      boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
      if(d===depth)return;
      var sl=s*Math.cos(ang),sr=s*Math.sin(ang),bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
      sq(x2,y2,sl,a-ang,d+1);sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
    })(job.W/2-(Math.min(job.W,job.H)*0.16)/2,job.H*0.86,Math.min(job.W,job.H)*0.16,-Math.PI/2,0);
    job.boxes=boxes;
    minx=1e9;maxx=-1e9;miny=1e9;maxy=-1e9;
    for(i=0;i<boxes.length;i++)for(n=0;n<4;n++){
      p=boxes[i].P[n];
      if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
      if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
    }
    pad=Math.min(job.W,job.H)*0.08;
    job.sc=Math.min((job.W-2*pad)/Math.max(maxx-minx,1e-6),(job.H-2*pad)/Math.max(maxy-miny,1e-6));
    job.cx=(minx+maxx)/2;job.cy=(miny+maxy)/2;
    job.off=offCanvas(job.W,job.H);bg(job.off.x,job.W,job.H);job.i=0;job.phase='pythfill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='pythfill'){
    var ox=job.off.x,b,j,bbase=job.base;
    function MX(v){return job.W/2+(v-job.cx)*job.sc}function MY(v){return job.H/2+(v-job.cy)*job.sc}
    while(job.i<job.boxes.length){
      b=job.boxes[job.i];p=b.P;
      ox.globalAlpha=deepAlpha(b.d,bbase);
      ox.fillStyle=ox.strokeStyle=ink('pythagoras',b.d,job.level);
      ox.lineWidth=deepLw(b.d,bbase,Math.max(1,3-b.d*0.35));
      ox.beginPath();ox.moveTo(MX(p[0][0]),MY(p[0][1]));
      for(j=1;j<4;j++)ox.lineTo(MX(p[j][0]),MY(p[j][1]));
      ox.closePath();ox.fill();ox.stroke();
      job.i++;
      if((job.i&31)===0&&timedOut(t0))return false;
    }
    blitOff(job.x,job.W,job.H,job.off,1);job.phase='done';return true;
  }

  if(job.phase==='spicollect'){
    var depth=job.level,only=job.level,list=[];
    (function sp(cx,cy,s,rot,d){
      var i,r,a;
      if(d>depth||s<2)return;
      if(d===only)list.push({cx:cx,cy:cy,s:s,rot:rot,d:d});
      if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*0.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*0.32,rot+0.4,d+1)}
    })(job.W/2,job.H/2,Math.min(job.W,job.H)*0.28,0,0);
    job.list=list;job.i=0;job.phase='spistroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='spistroke'){
    var sp,i,r,a,px,py,first,path,bbase=job.base,x=job.x;
    while(job.i<job.list.length){
      sp=job.list[job.i];
      x.strokeStyle=ink('spirals',sp.d,job.level);x.lineWidth=deepLw(sp.d,bbase,Math.max(1,2.4-sp.d*0.3));x.globalAlpha=deepAlpha(sp.d,bbase);
      path=typeof Path2D==='function'?new Path2D():null;first=1;
      if(path){
        for(i=0;i<=90;i++){a=sp.rot+i/90*Math.PI*4;r=sp.s*i/90;px=sp.cx+Math.cos(a)*r;py=sp.cy+Math.sin(a)*r;first?(path.moveTo(px,py),first=0):path.lineTo(px,py)}
        x.stroke(path);
      }else{
        x.beginPath();
        for(i=0;i<=90;i++){a=sp.rot+i/90*Math.PI*4;r=sp.s*i/90;px=sp.cx+Math.cos(a)*r;py=sp.cy+Math.sin(a)*r;first?(x.moveTo(px,py),first=0):x.lineTo(px,py)}
        x.stroke();
      }
      job.i++;
      if(timedOut(t0)&&job.i<job.list.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='treecollect'){
    var depth=job.level,only=job.level,ang=(job.rec.angle||28)*Math.PI/180,se=job.rec.season||0,sh=job.sh;
    var ratio=SHR[Math.max(0,Math.min(3,se))];if(!se&&sh==='tree')ratio=0.68;
    var segs=[],tips=[];
    (function br(px,py,len,a,d){
      if(d>depth||len<0.6)return;
      var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
      if(d===only){
        segs.push([px,py,nx,ny]);
        if(se&&d>=depth-1)tips.push({x:nx,y:ny,d:d,a:a});
      }
      br(nx,ny,len*ratio,a-ang,d+1);br(nx,ny,len*ratio,a+ang,d+1);
    })(job.W/2,job.H*0.92,job.H*0.22,Math.PI/2,0);
    job.segs=segs;job.tips=tips;job.se=se;job.i=0;
    job.style={stroke:ink(sh,only,depth),lw:deepLw(only,job.base,Math.max(1,(6-only)*0.85))};
    job.phase='treestroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='treestroke'){
    var x=job.x;
    x.globalAlpha=deepAlpha(job.level,job.base);
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(x,job.segs,job.i,128,job.style);
      if(timedOut(t0)&&job.i<job.segs.length)return false;
    }
    if(job.se){
      var tips=job.tips,tp,se=job.se,sh=job.sh;
      x.globalAlpha=deepAlpha(job.level,job.base);
      for(i=0;i<tips.length;i++){
        tp=tips[i];
        if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tp.x,tp.y,2.1,0,Math.PI*2);x.fill()}
        else if(se===2){x.fillStyle=sh==='antler'?'#4e6b5c':'#3D6A62';x.beginPath();x.arc(tp.x,tp.y,3.1,0,Math.PI*2);x.fill()}
        else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tp.x+(sh==='antler'?3:(tp.d%2?4:-3)),tp.y+(sh==='antler'?6:5),2,0,Math.PI*2);x.fill()}
      }
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='hcollect'){
    var depth=job.level,only=job.level,segs=[];
    (function Hn(cx,cy,len,hz,d){
      if(d<0||len<0.6)return;
      if(d===depth-only){
        if(hz)segs.push([cx-len,cy,cx+len,cy]);else segs.push([cx,cy-len,cx,cy+len]);
      }
      if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
      else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
    })(job.W/2,job.H/2,Math.min(job.W,job.H)*0.22,1,depth);
    job.segs=segs;job.i=0;
    job.style={stroke:ink('htree',only,depth),lw:deepLw(only,job.base,Math.max(1,2.6-only*0.25))};
    job.phase='hstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hstroke'){
    var x=job.x;
    x.globalAlpha=deepAlpha(job.level,job.base);
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(x,job.segs,job.i,128,job.style);
      if(timedOut(t0)&&job.i<job.segs.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='pascal'){
    var depth=job.level,mod=job.rec.angle===5?5:job.rec.angle===3?3:2,rows=[],n,k,cell,sz,y0,x0,base=job.base,x=job.x;
    bg(x,job.W,job.H);
    rows[0]=[1];
    for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
    sz=Math.min((job.W-24)/(depth+1),(job.H-24)/(depth+1),28);
    y0=(job.H-(depth+1)*sz)/2+sz/2;x0=job.W/2;
    for(n=0;n<=depth;n++){
      x.globalAlpha=n>base?deepAlpha(n,base):1;
      for(k=0;k<=n;k++){
        cell=rows[n][k];
        x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,mod);
        x.beginPath();x.arc(x0+(k-n/2)*sz,y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
      }
    }
    x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='hex'){
    var depth=job.level,pad=6,size,R,q,r,s,px,py,ring,base=job.base,x=job.x,W=job.W,H=job.H;
    bg(x,W,H);
    size=depth<=0?Math.min(W,H)*0.28:(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
    R=size/Math.sqrt(3);
    function hex(cx,cy,rad,col,a){
      var k,p=typeof Path2D==='function'?new Path2D():null;
      x.globalAlpha=a;x.strokeStyle=col;x.lineWidth=deepLw(depth,base,Math.max(1,2.2));
      if(p){for(k=0;k<6;k++)p[k?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+k*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+k*Math.PI/3)*rad);p.closePath();x.stroke(p)}
      else{x.beginPath();for(k=0;k<6;k++)x[k?'lineTo':'moveTo'](cx+Math.cos(Math.PI/6+k*Math.PI/3)*rad,cy+Math.sin(Math.PI/6+k*Math.PI/3)*rad);x.closePath();x.stroke()}
    }
    for(q=-depth;q<=depth;q++)for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      px=W/2+(q+r/2)*size;py=H/2+r*size*Math.sqrt(3)/2;
      ring=Math.max(Math.abs(q),Math.abs(r),Math.abs(s));
      hex(px,py,R,ink('hexrings',ring,depth),ring>base?deepAlpha(ring,base):1);
    }
    x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='ripples'){
    var depth=job.level,i,Rmax=Math.min(job.W,job.H)/2-6,step,base=job.base,x=job.x,p;
    bg(x,job.W,job.H);
    if(depth<=0){x.fillStyle=GOLD;x.beginPath();x.arc(job.W/2,job.H/2,5,0,Math.PI*2);x.fill();job.phase='done';return true}
    step=Rmax/Math.max(1,depth);
    for(i=1;i<=depth;i++){
      x.strokeStyle=ink('ripples',i,depth);x.lineWidth=deepLw(i,base,Math.max(1,3-i*0.2));x.globalAlpha=i>base?deepAlpha(i,base):1;
      p=typeof Path2D==='function'?new Path2D():null;
      if(p){p.arc(job.W/2,job.H/2,step*i,0,Math.PI*2);x.stroke(p)}
      else{x.beginPath();x.arc(job.W/2,job.H/2,step*i,0,Math.PI*2);x.stroke()}
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='fallback'){job.phase='done';return true}
  return job.phase==='done';
}

function ensureBase(cv,rec,base,prev){
  var key=recKey(rec,cv.width,cv.height),copy,k;
  if(cache&&cache.key===key&&cache.sh===rec.shape&&cache.depth>=base&&cache.depth<=(rec.depth||0)){
    blitCache(cv);return cache.depth;
  }
  copy={};
  for(k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))copy[k]=rec[k];
  copy.depth=base;copy._rest=0;
  prev(cv,copy);
  saveCache(cv,copy);
  return base;
}

function startWork(cv,rec,from,to,prev,sliced){
  var my=++tok,L=from,job=null;
  function tick(){
    if(tok!==my)return;
    var t0=sliced?performance.now():(performance.now()+1e8);
    if(job){
      if(!stepJob(job,t0)){if(sliced)requestAnimationFrame(tick);else tick();return}
      try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=L;saveCache(cv,c)}catch(ex){}
      job=null;
      if(L>=to)return;
      if(sliced){requestAnimationFrame(tick);return}
      t0=performance.now()+1e8;
    }
    if(L>=to){try{saveCache(cv,rec)}catch(ex){}return}
    L++;
    job=makeJob(cv,rec,L);
    if(!stepJob(job,t0)){if(sliced)requestAnimationFrame(tick);else tick();return}
    try{var c2={};for(var k2 in rec)if(Object.prototype.hasOwnProperty.call(rec,k2))c2[k2]=rec[k2];c2.depth=L;saveCache(cv,c2)}catch(ex){}
    job=null;
    if(L<to){if(sliced)requestAnimationFrame(tick);else tick()}
    else try{saveCache(cv,rec)}catch(ex){}
  }
  function kick(){
    if(tok!==my)return;
    var from2=from;
    try{from2=ensureBase(cv,rec,from,prev)}catch(ex){}
    L=from2;
    if(cache&&cache.key===recKey(rec,cv.width,cv.height)&&cache.depth>=from&&cache.depth<to){
      blitCache(cv);L=cache.depth;
    }
    if(sliced)requestAnimationFrame(tick);
    else tick();
  }
  if(sliced)requestAnimationFrame(kick);
  else kick();
}

function paintApolSync(cv,rec,prev){
  var depth=rec.depth||0,job,forever=performance.now()+1e8;
  if(depth<=0){prev(cv,rec);return}
  job=makeJob(cv,rec,depth);
  while(!stepJob(job,forever)){}
  try{saveCache(cv,rec)}catch(ex){}
}

function recChrome(g){return[g&&g.shape,g&&g.angle,g&&g.pal,g&&g.season,g&&g.poly,g&&g.seed,night()?'n':'d'].join('|')}
function patchGrowChrome(g){
  var jar,lab,word,n,slot,figs,last,num;
  syncMsg(g);
  n=copies(g);
  jar=document.querySelector('[data-gaf3jar] .g9c');
  if(jar){
    lab=jar.querySelector('.soft');word=lab?lab.textContent:'';
    jar.textContent='';
    jar.appendChild(document.createTextNode(String(n)));
    if(word){lab=document.createElement('span');lab.className='soft';lab.textContent=word;jar.appendChild(document.createTextNode(' '));jar.appendChild(lab)}
  }
  figs=document.querySelectorAll('[data-gafcode149] figure figcaption');
  if(figs&&figs.length){
    last=figs[figs.length-1];
    num=last.querySelector('.kline,b,span')||last;
    /* the depth sits as the first text in the figcaption */
    if(last.firstChild&&last.firstChild.nodeType===3)last.firstChild.nodeValue=String(g.depth||0);
    else if(last.firstChild&&last.firstChild.childNodes&&last.firstChild.childNodes.length){
      if(last.firstChild.firstChild&&last.firstChild.firstChild.nodeType===3)last.firstChild.firstChild.nodeValue=String(g.depth||0);
    }
  }
}

function hookDraw(){
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!cv)return prev.apply(this,arguments);
      layout(cv);
      if(rec._rest){cancel();return prev.apply(this,arguments)}
      var sh=rec.shape,depth=rec.depth||0,base=baseCap(sh),realRd=rd();
      /* Apollonian: always our −0-fixed gasket, even at the base cap. */
      if(sh==='apollonian'&&depth>0){
        cancel();
        if(depth<=base||realRd){paintApolSync(cv,rec,prev);return}
        startWork(cv,rec,base,depth,prev,true);
        return;
      }
      if(depth<=base){cancel();var r0=prev.apply(this,arguments);try{saveCache(cv,rec)}catch(ex){}return r0}
      if(!realRd)skipDragonUn=1;
      if(realRd){cancel();startWork(cv,rec,base,depth,prev,false);return}
      startWork(cv,rec,base,depth,prev,true);
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g._rest)return prev.apply(this,arguments);
      if(g&&g.shape){
        var cap=capOf(g.shape,g),base=baseCap(g.shape);
        if((g.depth||0)>=cap){
          g.msg=t(CAP_EN);
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        if((g.depth||0)>=base){
          g.depth=(g.depth||0)+1;
          if(g.depth>=cap)g.msg=t(CAP_EN);
          else if(isCapOrRest(g.msg))g.msg='';
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var g=grow(),cv,el,fast,r;
      scrubGrow(g);
      cv=document.getElementById('patGrowCv');
      el=document.getElementById('patterns');
      fast=cv&&g&&g.shape&&!g._rest&&(g.depth||0)>baseCap(g.shape)&&document.querySelector('[data-gaf3jar]')&&el&&el.hidden!==true&&lastChrome===recChrome(g);
      if(fast){
        patchGrowChrome(g);
        try{layout(cv);if(typeof patGrowDrawOn106==='function')patGrowDrawOn106(cv,g)}catch(ex){}
        skipDragonUn=0;
        if(scrubGrow(g))syncMsg(g);
        return;
      }
      r=prev.apply(this,arguments);
      lastChrome=g?recChrome(g):null;
      skipDragonUn=0;
      if(scrubGrow(g))syncMsg(g);
      else if(g&&isCapOrRest(g.msg)&&(g.depth||0)<capOf(g.shape,g)){g.msg='';syncMsg(g)}
      if(g&&(g.depth||0)<capOf(g.shape,g)&&isCapOrRest(g.msg)){g.msg='';syncMsg(g)}
      if(g&&(g.depth||0)<capOf(g.shape,g))syncMsg(g);
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){cancel();cache=null;lastChrome=null}
      return prev.apply(this,arguments);
    };
  });
  hook('patReduced',function(prev){
    return function(){
      if(skipDragonUn)return true;
      return prev.apply(this,arguments);
    };
  });
  if(typeof root.lampReduced73==='function'){
    hook('lampReduced73',function(prev){
      return function(){
        if(skipDragonUn)return true;
        return prev.apply(this,arguments);
      };
    });
  }
}

function onResize(){
  if(resizeT)clearTimeout(resizeT);
  resizeT=setTimeout(function(){
    try{
      var el=document.getElementById('patterns');
      if(!el||el.hidden===true)return;
      var g=grow();
      if(!g)return;
      cache=null;
      if(scrubGrow(g)&&typeof patGrowDraw106==='function')patGrowDraw106();
      else if(typeof patGrowDraw106==='function')patGrowDraw106();
    }catch(ex){}
  },80);
}

function publish(){
  function wrapGasket(obj){
    if(!obj||typeof obj.gasket!=='function'||obj.gasket._v170)return;
    obj.gasket=function(depth){return rawGasket(depth)};
    obj.gasket._v170=1;
  }
  wrapGasket(root.IL154);wrapGasket(root.IL155);
  if(typeof IL154==='object'){
    IL154.capOf=function(sh){return capOf(sh)};IL154.copies=copies;IL154.fibArms=fibArms;
    if(typeof IL155==='object'&&typeof IL155.paintCount==='function')IL155.paintCount=function(d){return rawGasket(d).length};
  }
  if(typeof IL155==='object'){IL155.capOf=function(sh){return capOf(sh)};IL155.copies=copies}
  if(typeof IL156==='object'){IL156.capOf=function(sh){return capOf(sh)};IL156.copies=copies}
  if(typeof IL157==='object'){IL157.capOf=function(sh){return capOf(sh)};IL157.copies=copies}
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'){
    IL150.capOf=function(sh){return capOf(sh)};IL150.capOf._v170=1;
  }
  if(typeof IL169==='object'){
    IL169.capOf=capOf;IL169.copies=copies;IL169.pieceSize=function(sh,next,S){return pieceSize(sh,next,S)};
    capOf._v170=1;copies._v170=1;
  }
}

function install(){
  if(install._on)return;install._on=1;
  hookDraw();
  publish();
  try{root.addEventListener('resize',onResize);root.addEventListener('orientationchange',onResize)}catch(ex){}
}
root.IL170={version:170,install:install,SLICE:SLICE,capOf:capOf,baseCap:baseCap,copies:copies,pieceSize:pieceSize,cssSize:cssSize,devicePx:devicePx,minPx:minPx,fibArms:fibArms,gasket:rawGasket,pythCount:pythCount,compactCanvas:compactCanvas,
  notes:'v170 time-slices work inside a single Grow a Fractal level (~6 ms) and applies Pi’s v169 must-fixes (360 CSS caps, 1.5 CSS-px visibility, ink() + visible deep strokes, Apollonian −0, fitted Lévy, dragon tick, Pythagoras drawn counts, fibArms 610/987, bilingual cap/rest clear, resize clamp). Reduced motion still uses the sync path. Pinch-zoom tiles and WebGL stay deferred.'};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v171: fix QA v170 fails and Pi's v170 recheck. v170.js stays frozen.
   QA: skipDragonUn is cleared only when the grow job finishes or cancel()
      runs. In-flight v149 unveils are blocked so a stepped 6→7 or 6→8
      Dragon matches a sync depth-8 draw. Time-slice unsliced base drawers
      (Koch, paintApolSync, heavy Pythagoras). Budget batches by device
      pixels so DPR 2 stays under 50 ms. Yield a frame between rapid
      patGrowStep106() calls. Reduced motion stays on the sync path.
   Pi: sunflower line uses the measured arms table and is refreshed on
      every level; extras use the base newest-level colour and alpha 1 on
      full-redraw shapes; gallery thumbs do not call layout() or share
      tok/cache/skip; Pythagoras jars count leaves; levyPtsStep accumulates
      with concat; IL154.paintCount uses the fixed key.
   A sideways phone (513 CSS px) keeps its +2 levels. No show() wrap.
   Lamp effects drop-in is not included. */
(function(root){
'use strict';
var GOLD='#E6B454',I='#72583f',CR='#fff8ec',NK='#0d0f1a';
var SLICE=6,HARD=2,MINCSS=1.5,tok=0,cache=null,gasketMemo={},skipDragonUn=0,resizeT=0,paintOwn=0,guardOn=0,coolTok=0,stepBusy=0,stepRaf=0,pendingDraw=0,lastFullAt=0,workOpen=0;
var GOLDANG=360*(1-1/((1+Math.sqrt(5))/2));
var FERN=[[0,0,0,.16,0,0,.01],[.85,.04,-.04,.85,0,1.6,.85],[.2,-.26,.23,.22,0,1.6,.07],[-.15,.28,.26,.24,0,.44,.07]];
var SHR=[0.68,0.66,0.70,2/3];
var REPLACE={koch:1,levy:1,dragon:1,hilbert:1,triangle:1,pythagoras:1,pascal:1,hexrings:1,ripples:1,sunflower:1,chaos:1,fern:1};
var SPEED_KEY='lamp_gaf_speed169';
var lastChrome=null;
var CAP_EN='That is as far as this seed grows.',REST_EN='It found its rest.';
var CAP_ES='Hasta aquí llega esta semilla.',REST_ES='Encontró su descanso.';

function t(s,o){return typeof patT==='function'?patT(s,o):(typeof gT==='function'?gT(s,o):s)}
var probingRd=0;
function rd(){try{return(typeof patReduced==='function'&&patReduced())||(typeof lampReduced73==='function'&&lampReduced73())}catch(ex){return false}}
function userReduced(){probingRd=1;try{return rd()}finally{probingRd=0}}
function night(){try{return typeof patNight==='function'&&patNight()}catch(ex){return false}}
function grow(){return(typeof PAT106==='object'&&PAT106.grow)||{}}
function hook(name,wrap){var prev=root[name];if(typeof prev!=='function'||prev._v171)return;var next=wrap(prev);next._v171=1;next._base=prev._base||prev;root[name]=next}
function baseCap(sh){return(typeof IL169==='object'&&typeof IL169.baseCap==='function')?IL169.baseCap(sh):6}
function sunN(d){return(typeof IL169==='object'&&typeof IL169.sunN==='function')?IL169.sunN(d):(typeof IL154==='object'&&typeof IL154.sunN==='function')?IL154.sunN(d):1}
function ink(sh,d,depth){return(typeof IL154==='object'&&typeof IL154.ink==='function')?IL154.ink(sh,d,depth):GOLD}
function dpr(){return Math.max(1,Math.min(2,root.devicePixelRatio||1))}
function cssSize(){if(typeof IL169==='object'&&typeof IL169.cssSize==='function')return IL169.cssSize();var w=root.innerWidth||1280;return Math.max(360,Math.min(720,Math.round(w*0.55)))}
function devicePx(){if(typeof IL169==='object'&&typeof IL169.devicePx==='function')return IL169.devicePx();return Math.round(cssSize()*dpr())}
function compactCanvas(){return cssSize()<=360}
function minPx(){return MINCSS*dpr()}
function layout(cv){if(typeof IL169==='object'&&typeof IL169.layout==='function')return IL169.layout(cv);return false}
/* Deep extras must stay at least as visible as the base: alpha ≥ 0.85, lw ≥ 1 device px. */
function deepAlpha(level,base){var e=Math.max(0,level-base);return e<=0?1:e===1?0.92:0.85}
function deepLw(level,base,raw){var e=Math.max(0,level-base),s=e<=0?1:e===1?0.85:0.75;return Math.max(1,raw*s)}
function bg(x,W,H){x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.fillStyle=night()?NK:CR;x.fillRect(0,0,W,H);x.lineCap='round';x.lineJoin='round'}
function recKey(rec,W,H){return[rec.shape,rec.angle,rec.pal,rec.season,rec.poly,rec.seed,W,H,night()?'n':'d'].join('|')}
function cancel(){tok++;skipDragonUn=0;if(workOpen){workOpen=0;busyDown()}}
function pathBudget(){
  var S=Math.max(1,devicePx());
  if(S>=1400)return 16;
  if(S>=900)return 24;
  return 48;
}
function stampN(){
  var S=Math.max(1,devicePx());
  return S>=900?8:16;
}
function putRows(){
  var S=Math.max(1,devicePx());
  if(S>=1400)return 24;
  if(S>=900)return 32;
  return 48;
}
function itemN(){
  var S=Math.max(1,devicePx());
  return S>=900?8:16;
}
function bgRows(){
  var S=Math.max(1,devicePx());
  if(S>=1400)return 128;
  if(S>=900)return 128;
  return 256;
}
function bgStep(job,t0){
  var x=job.x,W=job.W,H=job.H,rows,y1,u=0,cap=unitCap('bg');
  if(job._bg)return true;
  if(job._bgY==null){
    if(typeof x.reset==='function'){x.reset();x._v171g=0;wrapCv(x.canvas)}
    job._bgY=0;
  }
  /* Re-assert the fill on every slice: the shared 2d context can be
     restyled by another rAF between yields, and leftover rows would
     otherwise paint the wrong colour. A stale clip from prev() would
     also leave a halo, so the first slice resets the context. */
  x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';
  x.shadowBlur=0;x.shadowOffsetX=0;x.shadowOffsetY=0;x.shadowColor='rgba(0,0,0,0)';
  if(typeof x.filter==='string')x.filter='none';
  x.fillStyle=night()?NK:CR;x.lineCap='round';x.lineJoin='round';
  rows=bgRows();
  while(job._bgY<H){
    y1=Math.min(H,job._bgY+rows);
    x.fillRect(0,job._bgY,W,y1-job._bgY);
    job._bgY=y1;u++;
    if((u>=cap||timedOut(t0))&&job._bgY<H)return false;
  }
  job._bg=1;return true;
}
/* Canvas strokes are often recorded cheaply and rasterized at the end of the
   turn. At DPR 2 a 6 ms now() slice can still dump a 50–150 ms long task, so
   also cap work units per turn by backing size. */
function unitCap(kind){
  var S=Math.max(1,devicePx());
  if(S>=1400){
    if(kind==='path')return 2;
    if(kind==='item')return 8;
    if(kind==='stamp')return 800;
    if(kind==='put')return 2;
    if(kind==='bg')return 8;
    return 4;
  }
  if(S>=900){
    if(kind==='path')return 2;
    if(kind==='item')return 12;
    if(kind==='stamp')return 800;
    if(kind==='put')return 2;
    if(kind==='bg')return 8;
    return 8;
  }
  if(kind==='path')return 4;
  if(kind==='item')return 16;
  if(kind==='stamp')return 400;
  if(kind==='put')return 3;
  if(kind==='bg')return 8;
  return 16;
}
function armGuard(cv){
  skipDragonUn=1;guardOn=1;coolTok++;
  wrapCv(cv);
}
function dropGuard(){coolTok++;guardOn=0;skipDragonUn=0}
function startCool(){
  var my=++coolTok,n=40;
  (function later(){if(coolTok!==my)return;n--;if(n<=0){if(coolTok===my)guardOn=0;return}requestAnimationFrame(later)})();
}
function jobDone(){skipDragonUn=0;startCool();busyDown()}
function busyUp(){root.__gafBusy=(root.__gafBusy||0)+1}
function busyDown(){root.__gafBusy=Math.max(0,(root.__gafBusy||1)-1)}
function wrapCv(cv){
  if(!cv)return;
  var x;
  try{x=cv.getContext('2d')}catch(ex){return}
  if(!x||x._v171g)return;
  var put=x.putImageData,fill=x.fillRect,draw=x.drawImage,clr=x.clearRect;
  function blocked(){return guardOn&&!paintOwn}
  x.putImageData=function(){if(blocked())return;return put.apply(this,arguments)};
  x.fillRect=function(){if(blocked())return;return fill.apply(this,arguments)};
  x.drawImage=function(){if(blocked())return;return draw.apply(this,arguments)};
  x.clearRect=function(){if(blocked())return;return clr.apply(this,arguments)};
  x._v171g=1;
}
function own(fn){paintOwn++;try{return fn()}finally{paintOwn--}}
function sliceBase(sh){return sh==='koch'||sh==='apollonian'||sh==='pythagoras'||sh==='hilbert'}
var ADDITIVE={tree:1,antler:1,htree:1,spirals:1};
function timedOut(t0){return performance.now()-t0>=SLICE}
function speedExtra(){
  try{
    var s=root.localStorage&&localStorage.getItem(SPEED_KEY);if(!s)return HARD;
    var o=JSON.parse(s);if(!o||!isFinite(o.t1)||!isFinite(o.t2))return HARD;
    var sum=+o.t1+ +o.t2;if(sum>48)return 0;if(sum>24)return 1;return HARD;
  }catch(ex){return HARD}
}

function saveCache(cv,rec){
  try{
    var oc=(cache&&cache.canvas)?cache.canvas:null;
    if(!oc||oc.width!==cv.width||oc.height!==cv.height){
      oc=document.createElement('canvas');oc.width=cv.width;oc.height=cv.height;
    }
    oc.getContext('2d').drawImage(cv,0,0);
    cache={canvas:oc,key:recKey(rec,cv.width,cv.height),depth:rec.depth||0,sh:rec.shape};
  }catch(ex){cache=null}
}
function blitCache(cv){
  if(!cache||!cache.canvas)return false;
  var x=cv.getContext('2d');x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.drawImage(cache.canvas,0,0);return true;
}
function offCanvas(W,H){
  var c=document.createElement('canvas');c.width=W;c.height=H;
  var x=c.getContext('2d');x.lineCap='round';x.lineJoin='round';
  return{c:c,x:x};
}
function blitOff(x,W,H,off,alpha){
  bg(x,W,H);x.globalAlpha=alpha==null?1:alpha;x.drawImage(off.c,0,0);x.globalAlpha=1;
}

/* ---- Pi: messages, resize, fibArms, caps, copies ---- */
function capMsgList(){
  var a=t(CAP_EN),b=t(REST_EN),list=[CAP_EN,REST_EN,CAP_ES,REST_ES];
  if(a&&list.indexOf(a)<0)list.push(a);
  if(b&&list.indexOf(b)<0)list.push(b);
  return list;
}
function isCapOrRest(s){
  if(!s)return false;
  var list=capMsgList(),i;
  for(i=0;i<list.length;i++)if(list[i]&&s.indexOf(list[i])>=0)return true;
  return false;
}
function scrubGrow(g){
  if(!g||!g.shape)return false;
  var cap=capOf(g.shape),changed=false;
  if((g.depth||0)>cap){g.depth=cap;changed=true}
  if((g.depth||0)<cap&&isCapOrRest(g.msg)){g.msg='';changed=true}
  return changed;
}
function syncMsg(g){
  var el=document.getElementById('patGrowMsg');
  if(!el)return;
  el.textContent=(g&&g.msg)?g.msg:'';
}
var FIB_ARMS={89:[13,21],144:[13,21],233:[21,34],377:[34,55],610:[34,55],987:[55,89]};
function fibArmsFromLayout(n){
  n=Math.max(2,n|0);
  var phi=GOLDANG*Math.PI/180,pts=[],i,j,r,th,k,hist={},best1=0,best2=0,c1=0,c2=0,d,bd,dx,dy,start,a,b;
  for(i=0;i<n;i++){r=Math.sqrt(i);th=i*phi;pts.push([r*Math.cos(th),r*Math.sin(th)])}
  start=Math.max(0,n-Math.max(21,Math.floor(n/4)));
  for(i=start;i<n;i++){
    bd=1e9;k=0;
    for(j=0;j<n;j++)if(j!==i){
      dx=pts[i][0]-pts[j][0];dy=pts[i][1]-pts[j][1];d=dx*dx+dy*dy;
      if(d<bd){bd=d;k=Math.abs(i-j)}
    }
    if(k)hist[k]=(hist[k]||0)+1;
  }
  for(k in hist){
    if(hist[k]>c1){c2=c1;best2=best1;c1=hist[k];best1=+k}
    else if(hist[k]>c2){c2=hist[k];best2=+k}
  }
  if(best1>best2){a=best2;b=best1}else{a=best1;b=best2}
  if(!a||!b)return null;
  return{a:a,b:b};
}
function fibArms(n){
  n=n|0;
  if(FIB_ARMS[n])return{a:FIB_ARMS[n][0],b:FIB_ARMS[n][1]};
  var m=fibArmsFromLayout(n);
  if(m)return m;
  var f=[1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987],i;
  for(i=2;i<f.length;i++){
    if(f[i]===n)return{a:f[i-2],b:f[i-1]};
    if(f[i]>n)return{a:f[Math.max(0,i-2)],b:f[i-1]};
  }
  return{a:f[f.length-3],b:f[f.length-2]};
}
function isGoldSun(g){
  var ang=g&&g.angle||0;
  return Math.abs(ang-137.5)<0.6||Math.abs(ang-GOLDANG)<0.8;
}
function refreshMsg(g){
  if(!g||!g.shape)return;
  var cap=capOf(g.shape,g),line,fa,atCap=(g.depth||0)>=cap&&!g._rest;
  if(g.shape==='sunflower'&&(g.depth||0)>0&&!g._rest){
    if(isGoldSun(g)){
      fa=fibArms(copies(g));
      line=t('The spirals you can count: {a} and {b}.',{a:String(fa.a),b:String(fa.b)})+' '+t('At this turn the seeds pack tight.');
    }else if(Math.abs((g.angle||0)-135)<0.6)line=t('At this turn they line up in spokes.');
    if(line){
      if(atCap){var capLine=t(CAP_EN);g.msg=line.indexOf(capLine)<0?line+' '+capLine:line}
      else g.msg=line;
      return;
    }
  }
  if(atCap&&!isCapOrRest(g.msg))g.msg=t(CAP_EN);
  else if(!atCap&&isCapOrRest(g.msg))g.msg='';
}
function pythCount(rec,S){
  rec=rec||{};
  var depth=Math.max(0,rec.depth||0),ang=(rec.angle||28)*Math.PI/180,n=0,base=baseCap('pythagoras'),s0;
  S=S||devicePx();
  s0=S*0.16;
  /* Count leaves: drawn squares that have no drawn child. */
  if(depth<=base){
    (function sq(px,py,s,a,d){
      if(d>depth||s<2)return 0;
      var sl,sr,c,si,x2,y2,x3,y3,x4,y4,left=0,right=0;
      if(d<depth){
        sl=s*Math.cos(ang);sr=s*Math.sin(ang);
        c=Math.cos(a);si=Math.sin(a);
        x2=px+c*s;y2=py+si*s;x3=x2-si*s;y3=y2+c*s;x4=px-si*s;y4=py+c*s;
        left=sq(x4,y4,sl,a+ang,d+1);right=sq(x3,y3,sr,a+ang-Math.PI/2,d+1);
      }
      if(!left&&!right)n++;
      return 1;
    })(S/2-s0/2,S*0.86,s0,-Math.PI/2,0);
  }else{
    (function sq(px,py,s,a,d){
      if(d>depth||s<0.8)return 0;
      var sl,sr,bL,x2,y2,ax,ay,left=0,right=0;
      if(d<depth){
        sl=s*Math.cos(ang);sr=s*Math.sin(ang);bL=a+Math.PI/2-ang;
        x2=px+Math.cos(a)*s;y2=py+Math.sin(a)*s;
        ax=x2+Math.cos(bL)*sl;ay=y2+Math.sin(bL)*sl;
        left=sq(x2,y2,sl,a-ang,d+1);right=sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
      }
      if(!left&&!right)n++;
      return 1;
    })(S/2-s0/2,S*0.86,s0,-Math.PI/2,0);
  }
  return n;
}
function pieceSize(sh,next,S,rec){
  var d=Math.max(1,next|0),a,b,ang;
  if(sh==='tree'||sh==='antler')return S*0.22*Math.pow(0.68,d);
  if(sh==='pythagoras'){
    ang=(rec&&isFinite(rec.angle)?rec.angle:28);
    a=Math.abs(Math.cos(ang*Math.PI/180));b=Math.abs(Math.sin(ang*Math.PI/180));
    return S*0.16*Math.pow(Math.min(a,b),d);
  }
  if(sh==='dragon'||sh==='levy')return(S*0.5)/Math.pow(Math.SQRT2,d);
  if(sh==='koch')return(S*0.82)/Math.pow(3,d);
  if(sh==='hilbert')return(S*0.84)/Math.max(1,(1<<d)-1);
  if(sh==='htree')return S*0.22*Math.pow(0.707,d);
  if(sh==='spirals')return(S*0.28*Math.pow(0.32,d))/2;
  if(sh==='triangle')return(S*0.8)/Math.pow(2,d);
  if(sh==='hexrings')return(S/2)/(d+1+0.6);
  if(sh==='ripples')return(S/2)/Math.max(1,d);
  if(sh==='sunflower')return S*0.42/Math.sqrt(Math.max(1,sunN(d)));
  if(sh==='chaos')return S/Math.sqrt(Math.max(1,d*800));
  if(sh==='fern')return S/Math.sqrt(Math.max(1,d*4000));
  if(sh==='apollonian')return apolMinR(d,S);
  if(sh==='pascal')return S/Math.max(2,d+2);
  return S/Math.pow(2,d);
}
function capOf(sh,rec){
  var b=baseCap(sh);
  if(compactCanvas())return b;
  var S=devicePx(),extra=0,maxE=Math.min(HARD,speedExtra()),d;
  for(d=1;d<=maxE;d++){
    if(pieceSize(sh,b+d,S,rec)+1e-12>=minPx())extra=d;
    else break;
  }
  return b+extra;
}
function copies(rec){
  rec=rec||{};
  var sh=rec.shape,cap=capOf(sh,rec),d=Math.max(0,Math.min(cap,rec.depth||0));
  if(sh==='hilbert')return Math.pow(4,d);
  if(sh==='sunflower')return sunN(d);
  if(sh==='fern')return Math.max(0,d)*4000;
  if(sh==='spirals')return(Math.pow(5,d+1)-1)/4;
  if(sh==='koch')return 3*Math.pow(4,d);
  if(sh==='htree')return Math.pow(2,d+1)-1;
  if(sh==='triangle')return Math.pow(3,d);
  if(sh==='hexrings')return 3*(d+1)*d+1;
  if(sh==='ripples')return Math.max(1,d);
  if(sh==='pascal')return(d+1)*(d+2)/2;
  if(sh==='chaos')return Math.min(8000,Math.max(0,d)*800);
  if(sh==='pythagoras')return pythCount({shape:sh,depth:d,angle:rec.angle},devicePx());
  if(sh==='levy'||sh==='dragon'||sh==='tree'||sh==='antler')return Math.pow(2,d);
  if(sh==='apollonian')return rawGasket(d).length;
  if(typeof IL169==='object'&&IL169.copies&&!IL169.copies._v170){
    /* fall through only if we somehow missed a shape; do not recurse */
  }
  return Math.pow(2,d);
}

/* ---- polyline / segment stroke in batches onto an opaque-AA offscreen ---- */
function strokePtsChunk(ox,pts,i,budget,style){
  if(i>=pts.length-1)return i;
  ox.strokeStyle=style.stroke;ox.lineWidth=style.lw;
  if(style.alpha!=null)ox.globalAlpha=style.alpha;
  var p=typeof Path2D==='function'?new Path2D():null,end=Math.min(pts.length-1,i+budget),j;
  if(p){p.moveTo(pts[i].x,pts[i].y);for(j=i+1;j<=end;j++)p.lineTo(pts[j].x,pts[j].y);ox.stroke(p)}
  else{ox.beginPath();ox.moveTo(pts[i].x,pts[i].y);for(j=i+1;j<=end;j++)ox.lineTo(pts[j].x,pts[j].y);ox.stroke()}
  return end;
}
function strokeSegsChunk(ox,segs,i,budget,style){
  if(i>=segs.length)return i;
  ox.strokeStyle=style.stroke;ox.lineWidth=style.lw;
  if(style.alpha!=null)ox.globalAlpha=style.alpha;
  var p=typeof Path2D==='function'?new Path2D():null,end=Math.min(segs.length,i+budget),j,s;
  if(p){for(j=i;j<end;j++){s=segs[j];p.moveTo(s[0],s[1]);p.lineTo(s[2],s[3])}ox.stroke(p)}
  else{ox.beginPath();for(j=i;j<end;j++){s=segs[j];ox.moveTo(s[0],s[1]);ox.lineTo(s[2],s[3])}ox.stroke()}
  return end;
}

function levyFit(pts,W,H){
  var i,minx=pts[0].x,miny=pts[0].y,maxx=pts[0].x,maxy=pts[0].y,bw,bh,sc,ox,oy,pad=10,p,out=new Array(pts.length);
  for(i=1;i<pts.length;i++){
    p=pts[i];if(p.x<minx)minx=p.x;if(p.y<miny)miny=p.y;if(p.x>maxx)maxx=p.x;if(p.y>maxy)maxy=p.y;
  }
  bw=Math.max(1e-6,maxx-minx);bh=Math.max(1e-6,maxy-miny);
  sc=Math.min((W-2*pad)/bw,(H-2*pad)/bh);
  ox=W/2-sc*(minx+maxx)/2;oy=H/2-sc*(miny+maxy)/2;
  for(i=0;i<pts.length;i++)out[i]={x:pts[i].x*sc+ox,y:pts[i].y*sc+oy};
  return out;
}
function levyPtsStep(st,t0){
  var i,next,a,b,dx,dy,sign,n;
  if(!st.pts){
    if(st.kind==='dragon')st.pts=[{x:st.W*0.22,y:st.H*0.55},{x:st.W*0.78,y:st.H*0.55}];
    else st.pts=[{x:0,y:0},{x:1,y:0}];
    st.k=0;
  }
  while(st.k<st.depth){
    next=[];n=st.pts.length-1;
    for(i=st.i||0;i<n;i++){
      a=st.pts[i];b=st.pts[i+1];dx=b.x-a.x;dy=b.y-a.y;
      if(st.kind==='dragon'){sign=i%2===0?1:-1;next.push(a,{x:a.x+dx/2-sign*dy/2,y:a.y+dy/2+sign*dx/2})}
      else next.push(a,{x:(a.x+b.x)/2-(b.y-a.y)/2,y:(a.y+b.y)/2+(b.x-a.x)/2});
      if((i&15)===15&&timedOut(t0)){st.i=i+1;st._acc=(st._acc||[]).concat(next);return false}
    }
    next=st._acc?st._acc.concat(next):next;
    next.push(st.pts[st.pts.length-1]);st.pts=next;st._acc=null;st.i=0;st.k++;
    if(timedOut(t0)&&st.k<st.depth)return false;
  }
  if(st.kind!=='dragon'&&!st._fitted){st.pts=levyFit(st.pts,st.W,st.H);st._fitted=1}
  return true;
}

function hilbertPts(n){
  n=Math.max(1,Math.min(8,n||1));
  var pts=[],N=1<<n,i;
  function d2xy(m,d){
    var x=0,y=0,s,rx,ry,t;
    for(s=1;s<m;s*=2){
      rx=1&(d>>1);ry=1&(d^rx);
      if(!ry){if(rx){x=s-1-x;y=s-1-y}t=x;x=y;y=t}
      x+=s*rx;y+=s*ry;d>>=2;
    }
    return[x,y];
  }
  for(i=0;i<N*N;i++)pts.push(d2xy(N,i));
  return pts;
}
function kochSegs(W,H,depth){
  var s=Math.min(W,H)*0.82,x0=(W-s)/2,y0=H*0.22,x1=x0+s,y1=y0,x2=x0+s/2,y2=y0+s*Math.sqrt(3)/2,segs=[];
  function side(ax,ay,bx,by,d){
    if(!d){segs.push([ax,ay,bx,by]);return}
    var vx=(bx-ax)/3,vy=(by-ay)/3,px=ax+vx,py=ay+vy,rx=ax+2*vx,ry=ay+2*vy;
    var qx=px+vx/2-vy*Math.sqrt(3)/2,qy=py+vy/2+vx*Math.sqrt(3)/2;
    side(ax,ay,px,py,d-1);side(px,py,qx,qy,d-1);side(qx,qy,rx,ry,d-1);side(rx,ry,bx,by,d-1);
  }
  side(x0,y0,x1,y1,depth);side(x1,y1,x2,y2,depth);side(x2,y2,x0,y0,depth);
  return segs;
}
function rgbOf(col){
  col=String(col||GOLD);
  if(col[0]==='#'&&col.length>=7)return[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
  return[230,180,84];
}
function stamp(buf,W,H,px,py,rad,st){
  var r=Math.max(1,rad||1),x0=Math.max(0,Math.floor(px-r)),x1=Math.min(W-1,Math.ceil(px+r));
  var y0=Math.max(0,Math.floor(py-r)),y1=Math.min(H-1,Math.ceil(py+r)),ix,iy,dx,dy,w,idx,rr=r*r;
  for(iy=y0;iy<=y1;iy++){
    dy=iy+0.5-py;
    for(ix=x0;ix<=x1;ix++){
      dx=ix+0.5-px;w=dx*dx+dy*dy;
      if(w<=rr){idx=iy*W+ix;buf[idx]+=1-w/(rr+0.0001);if(buf[idx]>st.max)st.max=buf[idx]}
    }
  }
}

/* ---- Apollonian gasket, v155 algorithm with −0 keys normalised ---- */
function csqrt(re,im){
  var r=Math.hypot(re,im),a=Math.sqrt(Math.max(0,(r+re)/2)),b=(im<0?-1:1)*Math.sqrt(Math.max(0,(r-re)/2));
  return{x:a,y:b};
}
function tangent(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  var ext=Math.abs(dist-(r1+r2)),inn=Math.abs(dist-Math.abs(r1-r2));
  return{ok:ext<=eps||inn<=eps,res:Math.min(ext,inn)};
}
function overlaps(c1,c2,eps){
  var dist=Math.hypot(c1.x-c2.x,c1.y-c2.y),r1=Math.abs(1/c1.k),r2=Math.abs(1/c2.k);
  return dist<r1+r2-eps&&dist>Math.abs(r1-r2)+eps;
}
function solutions(c1,c2,c3){
  var k1=c1.k,k2=c2.k,k3=c3.k,rad=k1*k2+k1*k3+k2*k3,out=[],sk,sz,k4,kr,sr,si,rt,c;
  for(sk=1;sk>=-1;sk-=2){
    k4=k1+k2+k3+sk*2*Math.sqrt(Math.max(0,rad));
    if(!isFinite(k4)||Math.abs(k4)<1e-8)continue;
    kr=Math.round(k4);if(kr===0)continue;
    sr=k1*k2*(c1.x*c2.x-c1.y*c2.y)+k1*k3*(c1.x*c3.x-c1.y*c3.y)+k2*k3*(c2.x*c3.x-c2.y*c3.y);
    si=k1*k2*(c1.x*c2.y+c1.y*c2.x)+k1*k3*(c1.x*c3.y+c1.y*c3.x)+k2*k3*(c2.x*c3.y+c2.y*c3.x);
    rt=csqrt(sr,si);
    for(sz=1;sz>=-1;sz-=2){
      c={k:kr,x:(k1*c1.x+k2*c2.x+k3*c3.x+sz*2*rt.x)/kr,y:(k1*c1.y+k2*c2.y+k3*c3.y+sz*2*rt.y)/kr};
      if(tangent(c,c1,1e-6).ok&&tangent(c,c2,1e-6).ok&&tangent(c,c3,1e-6).ok)out.push(c);
    }
  }
  return out;
}
function fixed0(n){var s=Number(n).toFixed(5);return s==='-0.00000'?'0.00000':s}
function gasketKey(c){return Math.round(c.k)+':'+fixed0(c.x)+':'+fixed0(c.y)}
function gasketStart(){
  var a={k:-1,x:0,y:0},b={k:2,x:-0.5,y:0},c={k:2,x:0.5,y:0},d=null,sols=solutions(a,b,c),i,cs,seen;
  for(i=0;i<sols.length;i++)if(sols[i].k>0&&Math.abs(sols[i].k-3)<1e-6){d=sols[i];break}
  if(!d)d={k:3,x:0,y:-2/3};
  cs=[a,b,c,d];seen={};
  cs.forEach(function(c){seen[gasketKey(c)]=1});
  return{cs:cs,q:[[0,1,2],[0,1,3],[0,2,3],[1,2,3]],nq:[],seen:seen,gi:0,qi:0};
}
function gasketStep(st,depth,t0){
  var t,c1,c2,c3,sols,si,n,k,ok,j,ix;
  if(st.gi>=depth)return true;
  while(st.gi<depth){
    while(st.qi<st.q.length){
      t=st.q[st.qi];c1=st.cs[t[0]];c2=st.cs[t[1]];c3=st.cs[t[2]];
      sols=solutions(c1,c2,c3);
      for(si=0;si<sols.length;si++){
        n=sols[si];if(n.k<=0)continue;
        if(Math.hypot(n.x,n.y)+1/n.k>1.02)continue;
        k=gasketKey(n);if(st.seen[k])continue;
        ok=1;
        for(j=0;j<st.cs.length;j++){if(overlaps(n,st.cs[j],1e-4)){ok=0;break}}
        if(!ok)continue;
        st.seen[k]=1;st.cs.push(n);ix=st.cs.length-1;
        st.nq.push([t[0],t[1],ix],[t[0],t[2],ix],[t[1],t[2],ix]);
      }
      st.qi++;
      if(timedOut(t0))return false;
    }
    st.q=st.nq;st.nq=[];st.qi=0;st.gi++;
    if(timedOut(t0)&&st.gi<depth)return false;
  }
  return true;
}
function rawGasket(depth){
  depth=Math.max(0,Math.min(8,depth|0));
  if(gasketMemo[depth])return gasketMemo[depth];
  var st=gasketStart(),forever=performance.now()+1e8,d;
  gasketStep(st,depth,forever);
  gasketMemo[depth]=st.cs;
  for(d=0;d<depth;d++)if(!gasketMemo[d]){
    /* leave holes; only store exact depth and any prefix we can */
  }
  return st.cs;
}
function apolMinR(d,S){
  var cs=rawGasket(d),sc=S*0.46,i,r,minr=Infinity;
  for(i=0;i<cs.length;i++){r=Math.abs(1/cs[i].k)*sc;if(r>0&&r<minr)minr=r}
  return isFinite(minr)?minr:0;
}

/* ---- a steppable painter for one level ---- */
function makeJob(cv,rec,level){
  var x=cv.getContext('2d'),W=cv.width,H=cv.height,sh=rec.shape,base=baseCap(sh);
  var slice={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))slice[k]=rec[k];
  slice.depth=level;
  var job={sh:sh,level:level,phase:'init',i:0,W:W,H:H,x:x,rec:slice,base:base,alpha:(REPLACE[sh]||sh==='htree')?1:deepAlpha(level,base)};
  if(sh==='levy'||sh==='dragon'){
    job.kind=sh;
    job.style={stroke:ink(sh,level,level),lw:deepLw(level,base,sh==='dragon'?Math.max(1.2,3-level*0.3):Math.max(0.9,2.8-level*0.18))};
    job.phase='pts';
  }else if(sh==='hilbert'){
    job.style={stroke:ink('hilbert',level,level),lw:deepLw(level,base,Math.max(level<=base?2:1,5-level))};
    job.phase='hilpts';
  }else if(sh==='koch'){
    job.style={stroke:ink('koch',level,level),lw:deepLw(level,base,Math.max(0.8,2.4-level*0.25))};
    job.phase='kochsegs';
  }else if(sh==='sunflower'||sh==='chaos'||sh==='fern'){
    job.phase='ptsgen';
    job.col=ink(sh,level,Math.max(1,level));
    job.rad=sh==='sunflower'?null:1.6;
  }else if(sh==='apollonian'){
    job.phase='gasket';
    job.onlyNew=false;
  }else if(sh==='triangle'){
    job.phase='tricollect';
  }else if(sh==='pythagoras'){
    job.phase='pythcollect';
  }else if(sh==='spirals'){
    job.phase='spicollect';
  }else if(sh==='tree'||sh==='antler'){
    job.phase='treecollect';
  }else if(sh==='htree'){
    job.phase='hcollect';
  }else if(sh==='pascal'){
    job.phase='pascal';
  }else if(sh==='hexrings'){
    job.phase='hex';
  }else if(sh==='ripples'){
    job.phase='ripples';
  }else{
    job.phase='fallback';
  }
  return job;
}

function sunPts(W,H,rec){
  var n=sunN(rec.depth||0),phi=rec.angle||GOLDANG,c=Math.min(W,H)*0.42/Math.sqrt(Math.max(1,n)),i,r,th,pts=new Array(n),rim=Math.max(8,n/8);
  if(Math.abs(phi-137.5)<0.8||Math.abs(phi-GOLDANG)<0.8)phi=GOLDANG;
  for(i=0;i<n;i++){r=c*Math.sqrt(i);th=i*phi*Math.PI/180;pts[i]=[W/2+r*Math.cos(th),H/2+r*Math.sin(th),Math.max(1.4,3.1-i/n*1.5),i>=n-rim?1:0]}
  return pts;
}
function chaosPtsChunk(st,t0){
  var rec=st.rec,W=st.W,H=st.H,depth=rec.depth||0,N=Math.min(8000,depth*800),poly=Math.max(3,Math.min(6,rec.poly||3));
  var fr=0.5,same,j;
  if(!st._chaos){
    if(typeof IL154==='object'&&typeof IL154.jumpOf==='function')fr=IL154.jumpOf(rec.angle);
    else if(Math.round(rec.angle||50)===33)fr=1/3;
    else if(Math.round(rec.angle||50)===38)fr=1/((1+Math.sqrt(5))/2)/((1+Math.sqrt(5))/2);
    else if((rec.angle||0)>=30&&(rec.angle||0)<=55)fr=(rec.angle||50)/100;
    same=poly===4&&Math.abs(fr-0.5)<1e-9;
    st._chaos={fr:fr,same:same,s:(rec.seed||109)>>>0,v:[],p:{x:W/2,y:H/2},last:-1,i:0,N:N,poly:poly,w:Math.min(W,H)*0.42};
    for(j=0;j<poly;j++)st._chaos.v.push({x:W/2+Math.cos(-Math.PI/2+j*2*Math.PI/poly)*st._chaos.w,y:H/2+Math.sin(-Math.PI/2+j*2*Math.PI/poly)*st._chaos.w});
    st.pts=[];
  }
  var C=st._chaos,rnd;
  function rnd1(){C.s=(1664525*C.s+1013904223)>>>0;return C.s/4294967296}
  while(C.i<C.N){
    j=Math.floor(rnd1()*C.poly);
    if(C.same&&j===C.last)j=(j+1+Math.floor(rnd1()*(C.poly-1)))%C.poly;
    C.last=j;C.p.x+=(C.v[j].x-C.p.x)*C.fr;C.p.y+=(C.v[j].y-C.p.y)*C.fr;
    st.pts.push([C.p.x,C.p.y]);C.i++;
    if((C.i&31)===0&&timedOut(t0))return false;
  }
  return true;
}
function fernPtsChunk(st,t0){
  var rec=st.rec,n=Math.max(0,(rec.depth||0)*4000),W=st.W,H=st.H;
  if(!st._fern){
    st._fern={rnd:(function(s){s=(rec.seed||109)>>>0;return function(){s=(1664525*s+1013904223)>>>0;return s/4294967296}})(),x:0,y:0,i:0,n:n};
    st.pts=[];
  }
  var F=st._fern,r,k,a,nx,ny;
  while(F.i<F.n){
    r=F.rnd();k=r<.01?0:r<.86?1:r<.93?2:3;a=FERN[k];
    nx=a[0]*F.x+a[1]*F.y+a[4];ny=a[2]*F.x+a[3]*F.y+a[5];F.x=nx;F.y=ny;
    st.pts.push([W*(0.5+F.x*0.18),H*(0.92-F.y*0.082)]);F.i++;
    if((F.i&63)===0&&timedOut(t0))return false;
  }
  return true;
}

function stepJob(job,t0){
  var i,n,st,p,pad,span,N,X,Y,sc,cx,cy,minx,maxx,miny,maxy;
  if(job.phase==='pts'){
    job.depth=job.level;
    if(!levyPtsStep(job,t0))return false;
    job.i=0;job.phase='stroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hilpts'){
    st=hilbertPts(Math.max(1,Math.min(8,job.level||1)));
    pad=job.W*0.08;span=job.W-pad*2;N=(1<<Math.max(1,job.level))-1||1;
    job.pts=st.map(function(pt){return{x:pad+pt[0]/N*span,y:pad+pt[1]/N*span}});
    job.i=0;job.phase='stroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='kochsegs'){
    job.segs=kochSegs(job.W,job.H,job.level);
    job.i=0;job.phase='segstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='stroke'){
    if(!bgStep(job,t0))return false;
    job.style.alpha=job.alpha==null?1:job.alpha;
    var bud=pathBudget(),t1,u=0,cap=unitCap('path');
    while(job.i<job.pts.length-1){
      t1=performance.now();
      job.i=strokePtsChunk(job.x,job.pts,job.i,bud,job.style);
      if(performance.now()-t1>SLICE/2&&bud>1)bud=Math.max(1,bud>>1);
      u++;
      if((u>=cap||timedOut(t0))&&job.i<job.pts.length-1)return false;
    }
    job.x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='segstroke'){
    if(!bgStep(job,t0))return false;
    job.style.alpha=job.alpha==null?1:job.alpha;
    var bud2=pathBudget(),t2,u2=0,cap2=unitCap('path');
    while(job.i<job.segs.length){
      t2=performance.now();
      job.i=strokeSegsChunk(job.x,job.segs,job.i,bud2,job.style);
      if(performance.now()-t2>SLICE/2&&bud2>1)bud2=Math.max(1,bud2>>1);
      u2++;
      if((u2>=cap2||timedOut(t0))&&job.i<job.segs.length)return false;
    }
    job.x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='ptsgen'){
    if(job.sh==='sunflower'){job.pts=sunPts(job.W,job.H,job.rec);job.phase='sunfill';job.i=0}
    else if(job.sh==='chaos'){if(!chaosPtsChunk(job,t0))return false;job.phase='stamp';job.i=0;job._u0=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    else{if(!fernPtsChunk(job,t0))return false;job.phase='stamp';job.i=0;job._u0=0;job.buf=new Float32Array(job.W*job.H);job.max=0}
    if(timedOut(t0))return false;
  }
  if(job.phase==='sunfill'){
    var sx=job.x,sp,sn=job.pts.length,sdepth=job.level,su=0,scap=unitCap('item');
    if(!bgStep(job,t0))return false;
    sx.globalAlpha=1;
    while(job.i<sn){
      sp=job.pts[job.i];
      sx.fillStyle=ink('sunflower',sp[3]?sdepth:0,sdepth);
      sx.beginPath();sx.arc(sp[0],sp[1],sp[2],0,Math.PI*2);sx.fill();
      job.i++;su++;
      if((su>=scap||timedOut(t0))&&job.i<sn)return false;
    }
    job.phase='done';return true;
  }
  if(job.phase==='stamp'){
    n=job.pts.length;
    while(job.i<n){
      p=job.pts[job.i];
      stamp(job.buf,job.W,job.H,p[0],p[1],typeof p[2]==='number'?p[2]:(job.rad||1.6),job);
      job.i++;
      if((job.i%Math.max(1,stampN()))===0&&(timedOut(t0)||job.i-job._u0>=unitCap('stamp'))){job._u0=job.i;return false}
    }
    job.phase='put';job.i=0;
    job.rgb=rgbOf(job.col);
    job.bgc=night()?[13,15,26,255]:[255,248,236,255];
    job.logm=Math.log(1+Math.max(1,job.max));
    if(timedOut(t0))return false;
  }
  if(job.phase==='put'){
    var r=job.rgb[0],g=job.rgb[1],b=job.rgb[2],u,a,idx,row,rows=putRows(),y1,h,W=job.W,H=job.H,buf=job.buf,logm=job.logm,alphaMul=job.alpha,bgc=job.bgc,j,d,up=0,capP=unitCap('put');
    while(job.i<H){
      y1=Math.min(H,job.i+rows);h=y1-job.i;
      if(!job.img||job.img.width!==W||job.img.height!==h)job.img=job.x.createImageData(W,h);
      d=job.img.data;
      for(j=0;j<h*W*4;j+=4){d[j]=bgc[0];d[j+1]=bgc[1];d[j+2]=bgc[2];d[j+3]=255}
      for(row=0;row<h;row++){
        for(i=0;i<W;i++){
          idx=(job.i+row)*W+i;if(!buf[idx])continue;
          u=Math.log(1+buf[idx])/logm;
          a=Math.max(0,Math.min(255,Math.round(255*Math.pow(u,0.85)*alphaMul)));
          d[(row*W+i)*4]=r;d[(row*W+i)*4+1]=g;d[(row*W+i)*4+2]=b;d[(row*W+i)*4+3]=Math.max(d[(row*W+i)*4+3],a);
        }
      }
      job.x.putImageData(job.img,0,job.i);
      job.i=y1;up++;
      if((up>=capP||timedOut(t0))&&job.i<H)return false;
    }
    job.phase='done';return true;
  }

  if(job.phase==='gasket'){
    var mem=gasketMemo[job.level];
    if(mem){job.cs=mem;job.phase='apolstroke';job.i=0;if(timedOut(t0))return false}
    else{
      if(!job.gst)job.gst=gasketStart();
      if(!gasketStep(job.gst,job.level,t0))return false;
      job.cs=job.gst.cs;gasketMemo[job.level]=job.cs;
      job.phase='apolstroke';job.i=0;
      if(timedOut(t0))return false;
    }
  }
  if(job.phase==='apolstroke'){
    var cs=job.cs,sc=Math.min(job.W,job.H)*0.46,cx=job.W/2,cy=job.H/2,c,rad,ox=job.x,nA=itemN();
    if(!bgStep(job,t0))return false;ox.lineCap='round';
    ox.globalAlpha=job.alpha==null?1:job.alpha;
    var uA=0,capA=unitCap('item');
    while(job.i<cs.length){
      c=cs[job.i];
      job.i++;
      rad=Math.abs(1/c.k)*sc;
      ox.strokeStyle=ink('apollonian',job.i>1?1:0,Math.max(1,job.level));
      ox.lineWidth=c.k<0?2.2:Math.max(1,2-Math.log(c.k+1)*0.35);
      ox.beginPath();ox.arc(cx+c.x*sc,cy-c.y*sc,rad,0,Math.PI*2);ox.stroke();
      if(c.k>0&&rad>14){
        ox.fillStyle=I;ox.font=Math.max(9,Math.min(16,rad*0.55))+'px sans-serif';ox.textAlign='center';ox.textBaseline='middle';
        ox.fillText(String(c.k),cx+c.x*sc,cy-c.y*sc);
      }
      uA++;
      if((uA>=capA||(job.i%nA===0&&timedOut(t0)))&&job.i<cs.length)return false;
    }
    ox.globalAlpha=1;
    job.phase='done';return true;
  }

  if(job.phase==='tricollect'){
    var depth=job.level,stack,item,ax,ay,bx,by,cx,cy,d,mx,my,nx,ny,px,py,n;
    if(!job.tris){
      job.tris=[];job.stack=[[job.W/2,job.H*0.1,job.W*0.08,job.H*0.9,job.W*0.92,job.H*0.9,0]];
    }
    stack=job.stack;
    while(stack.length){
      item=stack.pop();ax=item[0];ay=item[1];bx=item[2];by=item[3];cx=item[4];cy=item[5];d=item[6];
      if(d>=depth)job.tris.push(item);
      else{
        mx=(ax+bx)/2;my=(ay+by)/2;nx=(bx+cx)/2;ny=(by+cy)/2;px=(cx+ax)/2;py=(cy+ay)/2;
        stack.push([px,py,nx,ny,cx,cy,d+1],[mx,my,bx,by,nx,ny,d+1],[ax,ay,mx,my,px,py,d+1]);
      }
      if((job.tris.length&31)===0&&timedOut(t0))return false;
    }
    job.i=0;job.phase='trifill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='trifill'){
    var ox=job.x,tr,col=ink('triangle',job.level,job.level),nT=itemN();
    if(!bgStep(job,t0))return false;
    ox.globalAlpha=job.alpha==null?1:job.alpha;
    var uT=0,capT=unitCap('item');
    while(job.i<job.tris.length){
      tr=job.tris[job.i];
      ox.fillStyle=col;
      ox.beginPath();ox.moveTo(tr[0],tr[1]);ox.lineTo(tr[2],tr[3]);ox.lineTo(tr[4],tr[5]);ox.closePath();ox.fill();
      job.i++;uT++;
      if((uT>=capT||(job.i%nT===0&&timedOut(t0)))&&job.i<job.tris.length)return false;
    }
    ox.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='pythcollect'){
    var depth=job.level,ang=(job.rec.angle||28)*Math.PI/180,boxes=[],S=Math.min(job.W,job.H),s0=S*0.16,useBase=depth<=job.base,cut=useBase?2:0.8;
    (function sq(px,py,s,a,d){
      if(d>depth||s<cut)return;
      var c=Math.cos(a),si=Math.sin(a);
      var x2=px+c*s,y2=py+si*s,x3=x2-si*s,y3=y2+c*s,x4=px-si*s,y4=py+c*s;
      boxes.push({d:d,P:[[px,py],[x2,y2],[x3,y3],[x4,y4]]});
      if(d===depth)return;
      if(useBase){
        var sl=s*Math.cos(ang),sr=s*Math.sin(ang);
        sq(x4,y4,sl,a+ang,d+1);sq(x3,y3,sr,a+ang-Math.PI/2,d+1);
      }else{
        var sl=s*Math.cos(ang),sr=s*Math.sin(ang),bL=a+Math.PI/2-ang,ax=x2+Math.cos(bL)*sl,ay=y2+Math.sin(bL)*sl;
        sq(x2,y2,sl,a-ang,d+1);sq(ax,ay,sr,a+Math.PI/2-ang,d+1);
      }
    })(job.W/2-s0/2,job.H*0.86,s0,-Math.PI/2,0);
    job.fit=1;
    minx=1e9;maxx=-1e9;miny=1e9;maxy=-1e9;
    for(i=0;i<boxes.length;i++)for(n=0;n<4;n++){
      p=boxes[i].P[n];
      if(p[0]<minx)minx=p[0];if(p[0]>maxx)maxx=p[0];
      if(p[1]<miny)miny=p[1];if(p[1]>maxy)maxy=p[1];
    }
    pad=S*0.08;
    job.sc=Math.min((job.W-2*pad)/Math.max(maxx-minx,1e-6),(job.H-2*pad)/Math.max(maxy-miny,1e-6));
    job.cx=(minx+maxx)/2;job.cy=(miny+maxy)/2;
    job.boxes=boxes;job.i=0;job.phase='pythfill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='pythfill'){
    var ox=job.x,b,j,bbase=job.base,nP=itemN();
    if(!bgStep(job,t0))return false;
    function MX(v){return job.fit?job.W/2+(v-job.cx)*job.sc:v}
    function MY(v){return job.fit?job.H/2+(v-job.cy)*job.sc:v}
    var uP=0,capB=unitCap('item');
    while(job.i<job.boxes.length){
      b=job.boxes[job.i];p=b.P;
      ox.globalAlpha=deepAlpha(b.d,bbase);
      ox.fillStyle=ox.strokeStyle=ink('pythagoras',b.d,job.level);
      ox.lineWidth=deepLw(b.d,bbase,Math.max(1,3-b.d*0.35));
      ox.beginPath();ox.moveTo(MX(p[0][0]),MY(p[0][1]));
      for(j=1;j<4;j++)ox.lineTo(MX(p[j][0]),MY(p[j][1]));
      ox.closePath();ox.fill();ox.stroke();
      job.i++;uP++;
      if((uP>=capB||(job.i%nP===0&&timedOut(t0)))&&job.i<job.boxes.length)return false;
    }
    ox.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='spicollect'){
    var depth=job.level,only=job.level,list=[];
    (function sp(cx,cy,s,rot,d){
      var i,r,a;
      if(d>depth||s<2)return;
      if(d===only)list.push({cx:cx,cy:cy,s:s,rot:rot,d:d});
      if(d<depth)for(i=0;i<5;i++){a=rot+i*2*Math.PI/5;r=s*0.62;sp(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*0.32,rot+0.4,d+1)}
    })(job.W/2,job.H/2,Math.min(job.W,job.H)*0.28,0,0);
    job.list=list;job.i=0;job.phase='spistroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='spistroke'){
    var sp,i,r,a,px,py,first,path,bbase=job.base,x=job.x;
    while(job.i<job.list.length){
      sp=job.list[job.i];
      x.strokeStyle=ink('spirals',sp.d,job.level);x.lineWidth=deepLw(sp.d,bbase,Math.max(1,2.4-sp.d*0.3));x.globalAlpha=deepAlpha(sp.d,bbase);
      path=typeof Path2D==='function'?new Path2D():null;first=1;
      if(path){
        for(i=0;i<=90;i++){a=sp.rot+i/90*Math.PI*4;r=sp.s*i/90;px=sp.cx+Math.cos(a)*r;py=sp.cy+Math.sin(a)*r;first?(path.moveTo(px,py),first=0):path.lineTo(px,py)}
        x.stroke(path);
      }else{
        x.beginPath();
        for(i=0;i<=90;i++){a=sp.rot+i/90*Math.PI*4;r=sp.s*i/90;px=sp.cx+Math.cos(a)*r;py=sp.cy+Math.sin(a)*r;first?(x.moveTo(px,py),first=0):x.lineTo(px,py)}
        x.stroke();
      }
      job.i++;
      if((job.i%unitCap('item')===0||timedOut(t0))&&job.i<job.list.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='treecollect'){
    var depth=job.level,only=job.level,ang=(job.rec.angle||28)*Math.PI/180,se=job.rec.season||0,sh=job.sh;
    var ratio=SHR[Math.max(0,Math.min(3,se))];if(!se&&sh==='tree')ratio=0.68;
    var segs=[],tips=[];
    (function br(px,py,len,a,d){
      if(d>depth||len<0.6)return;
      var nx=px+Math.cos(a)*len,ny=py-Math.sin(a)*len;
      if(d===only){
        segs.push([px,py,nx,ny]);
        if(se&&d>=depth-1)tips.push({x:nx,y:ny,d:d,a:a});
      }
      br(nx,ny,len*ratio,a-ang,d+1);br(nx,ny,len*ratio,a+ang,d+1);
    })(job.W/2,job.H*0.92,job.H*0.22,Math.PI/2,0);
    job.segs=segs;job.tips=tips;job.se=se;job.i=0;
    job.style={stroke:ink(sh,only,depth),lw:deepLw(only,job.base,Math.max(1,(6-only)*0.85))};
    job.phase='treestroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='treestroke'){
    var x=job.x;
    x.globalAlpha=deepAlpha(job.level,job.base);
    var uTr=0,capTr=unitCap('path');
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(x,job.segs,job.i,pathBudget(),job.style);
      uTr++;
      if((uTr>=capTr||timedOut(t0))&&job.i<job.segs.length)return false;
    }
    if(job.se){
      var tips=job.tips,tp,se=job.se,sh=job.sh;
      x.globalAlpha=deepAlpha(job.level,job.base);
      for(i=0;i<tips.length;i++){
        tp=tips[i];
        if(se===1){x.fillStyle=GOLD;x.beginPath();x.arc(tp.x,tp.y,2.1,0,Math.PI*2);x.fill()}
        else if(se===2){x.fillStyle=sh==='antler'?'#4e6b5c':'#3D6A62';x.beginPath();x.arc(tp.x,tp.y,3.1,0,Math.PI*2);x.fill()}
        else if(se===3){x.fillStyle='#C45A3A';x.beginPath();x.arc(tp.x+(sh==='antler'?3:(tp.d%2?4:-3)),tp.y+(sh==='antler'?6:5),2,0,Math.PI*2);x.fill()}
      }
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='hcollect'){
    var depth=job.level,only=job.level,segs=[];
    (function Hn(cx,cy,len,hz,d){
      if(d<0||len<0.6)return;
      if(d===depth-only){
        if(hz)segs.push([cx-len,cy,cx+len,cy]);else segs.push([cx,cy-len,cx,cy+len]);
      }
      if(hz){Hn(cx-len,cy,len*0.707,0,d-1);Hn(cx+len,cy,len*0.707,0,d-1)}
      else{Hn(cx,cy-len,len*0.707,1,d-1);Hn(cx,cy+len,len*0.707,1,d-1)}
    })(job.W/2,job.H/2,Math.min(job.W,job.H)*0.22,1,depth);
    job.segs=segs;job.i=0;
    job.style={stroke:ink('htree',0,depth),lw:Math.max(1,2.6),alpha:1};
    job.phase='hstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hstroke'){
    var x=job.x;
    x.globalAlpha=1;
    var uH=0,capH=unitCap('path');
    while(job.i<job.segs.length){
      job.i=strokeSegsChunk(x,job.segs,job.i,pathBudget(),job.style);
      uH++;
      if((uH>=capH||timedOut(t0))&&job.i<job.segs.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='pascal'){
    var depth=job.level,mod=job.rec.angle===5?5:job.rec.angle===3?3:2,rows=[],n,k;
    rows[0]=[1];
    for(n=1;n<=depth;n++){rows[n]=[];for(k=0;k<=n;k++)rows[n][k]=((k?rows[n-1][k-1]:0)+(k<n?rows[n-1][k]:0))%mod}
    job.rows=rows;job.mod=mod;
    job.sz=Math.min((job.W-24)/(depth+1),(job.H-24)/(depth+1),28);
    job.y0=(job.H-(depth+1)*job.sz)/2+job.sz/2;job.x0=job.W/2;
    job.i=0;job.phase='pascalfill';
    if(timedOut(t0))return false;
  }
  if(job.phase==='pascalfill'){
    var x=job.x,depth=job.level,base=job.base,sz=job.sz,n,k,cell;
    if(!bgStep(job,t0))return false;
    while(job.i<=depth){
      n=job.i;
      x.globalAlpha=n>base?deepAlpha(n,base):1;
      for(k=0;k<=n;k++){
        cell=job.rows[n][k];
        x.fillStyle=cell===0?(night()?'#1a1e2c':'#e8dcc8'):ink('pascal',cell,job.mod);
        x.beginPath();x.arc(job.x0+(k-n/2)*sz,job.y0+n*sz,sz*0.38,0,Math.PI*2);x.fill();
      }
      job.i++;
      if((job.i%unitCap('item')===0||timedOut(t0))&&job.i<=depth)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='hex'){
    var depth=job.level,pad=6,size,R,q,r,s,cells=[],W=job.W,H=job.H;
    size=depth<=0?Math.min(W,H)*0.28:(Math.min(W,H)/2-pad)/(depth+1/Math.sqrt(3));
    R=size/Math.sqrt(3);
    for(q=-depth;q<=depth;q++)for(r=-depth;r<=depth;r++){
      s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))>depth)continue;
      cells.push({px:W/2+(q+r/2)*size,py:H/2+r*size*Math.sqrt(3)/2,ring:Math.max(Math.abs(q),Math.abs(r),Math.abs(s))});
    }
    job.cells=cells;job.R=R;job.i=0;
    job.phase='hexstroke';
    if(timedOut(t0))return false;
  }
  if(job.phase==='hexstroke'){
    var x=job.x,base=job.base,depth=job.level,R=job.R,cell,nH=itemN(),k,p;
    if(!bgStep(job,t0))return false;
    while(job.i<job.cells.length){
      cell=job.cells[job.i];
      x.globalAlpha=cell.ring>base?deepAlpha(cell.ring,base):1;
      x.strokeStyle=ink('hexrings',cell.ring,depth);x.lineWidth=deepLw(depth,base,Math.max(1,2.2));
      p=typeof Path2D==='function'?new Path2D():null;
      if(p){for(k=0;k<6;k++)p[k?'lineTo':'moveTo'](cell.px+Math.cos(Math.PI/6+k*Math.PI/3)*R,cell.py+Math.sin(Math.PI/6+k*Math.PI/3)*R);p.closePath();x.stroke(p)}
      else{x.beginPath();for(k=0;k<6;k++)x[k?'lineTo':'moveTo'](cell.px+Math.cos(Math.PI/6+k*Math.PI/3)*R,cell.py+Math.sin(Math.PI/6+k*Math.PI/3)*R);x.closePath();x.stroke()}
      job.i++;
      if((job.i%unitCap('item')===0||(job.i%nH===0&&timedOut(t0)))&&job.i<job.cells.length)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }
  if(job.phase==='ripples'){
    var depth=job.level,Rmax=Math.min(job.W,job.H)/2-6,base=job.base,x=job.x,p;
    if(depth<=0){bg(x,job.W,job.H);x.fillStyle=GOLD;x.beginPath();x.arc(job.W/2,job.H/2,5,0,Math.PI*2);x.fill();job.phase='done';return true}
    if(!job._bg){job.i=1;job.step=Rmax/Math.max(1,depth)}
    if(!bgStep(job,t0))return false;
    while(job.i<=depth){
      x.strokeStyle=ink('ripples',job.i,depth);x.lineWidth=deepLw(job.i,base,Math.max(1,3-job.i*0.2));x.globalAlpha=job.i>base?deepAlpha(job.i,base):1;
      p=typeof Path2D==='function'?new Path2D():null;
      if(p){p.arc(job.W/2,job.H/2,job.step*job.i,0,Math.PI*2);x.stroke(p)}
      else{x.beginPath();x.arc(job.W/2,job.H/2,job.step*job.i,0,Math.PI*2);x.stroke()}
      job.i++;
      if((job.i%unitCap('item')===0||timedOut(t0))&&job.i<=depth)return false;
    }
    x.globalAlpha=1;job.phase='done';return true;
  }

  if(job.phase==='fallback'){job.phase='done';return true}
  return job.phase==='done';
}

function cacheOk(cv,rec,lo,hi){
  var key=recKey(rec,cv.width,cv.height);
  return !!(cache&&cache.key===key&&cache.sh===rec.shape&&cache.depth>=lo&&(hi==null||cache.depth<=hi));
}
function snapLevel(cv,rec,depth){
  try{var c={};for(var k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))c[k]=rec[k];c.depth=depth;saveCache(cv,c)}catch(ex){}
}
function startWork(cv,rec,from,to,prev,sliced){
  if(workOpen){workOpen=0;busyDown()}
  var my=++tok,L=from,job=null,needBase=0,sh=rec.shape;
  wrapCv(cv);
  workOpen=1;busyUp();
  function finish(){
    if(workOpen){workOpen=0;jobDone()}
    else{skipDragonUn=0;startCool()}
  }
  function done(){
    if(sliced){
      requestAnimationFrame(function(){
        if(tok!==my){finish();return}
        paintOwn++;
        try{saveCache(cv,rec)}catch(ex){cache=null}
        finally{paintOwn--}
        finish();
      });
      return;
    }
    try{saveCache(cv,rec)}catch(ex){}
    finish();
  }
  function yieldTick(){if(sliced)requestAnimationFrame(tick);else tick()}
  function tick(){
    if(tok!==my)return;
    var t0=sliced?performance.now():(performance.now()+1e8);
    paintOwn++;
    try{
      if(job){
        if(!stepJob(job,t0)){yieldTick();return}
        job=null;
        if(sliced){requestAnimationFrame(tick);return}
        t0=performance.now()+1e8;
      }
      if(needBase){
        needBase=0;
        if(ADDITIVE[sh]){
          L=0;
        }else{
          L=from;
          job=makeJob(cv,rec,from);
          if(!stepJob(job,t0)){yieldTick();return}
          job=null;
          if(sliced){requestAnimationFrame(tick);return}
          t0=performance.now()+1e8;
        }
      }
      if(L>=to){done();return}
      L++;
      job=makeJob(cv,rec,L);
      if(!stepJob(job,t0)){yieldTick();return}
      if(sliced){yieldTick();return}
      job=null;
      if(L<to)yieldTick();
      else done();
    }finally{paintOwn--}
  }
  function kick(){
    if(tok!==my)return;
    paintOwn++;
    try{
      wrapCv(cv);
      if(ADDITIVE[sh]){
        if(cacheOk(cv,rec,from,rec.depth||to)){
          blitCache(cv);L=cache.depth;needBase=0;
        }else if(from>0){
          needBase=1;L=from;
        }else{
          L=0;needBase=0;
        }
      }else{
        /* Full-redraw shapes only need the final level. */
        L=Math.max(-1,(to|0)-1);needBase=0;
      }
    }finally{paintOwn--}
    yieldTick();
  }
  if(sliced)requestAnimationFrame(kick);
  else kick();
}

function paintApolSync(cv,rec,prev){
  var depth=rec.depth||0,job,forever=performance.now()+1e8;
  if(depth<=0){prev(cv,rec);return}
  job=makeJob(cv,rec,depth);
  while(!stepJob(job,forever)){}
  try{saveCache(cv,rec)}catch(ex){}
}

function paintThumb(cv,rec,prev){
  var copy={},k,sh,cap,depth,L,job,forever=performance.now()+1e8;
  for(k in rec)if(Object.prototype.hasOwnProperty.call(rec,k))copy[k]=rec[k];
  sh=copy.shape;cap=capOf(sh,copy);depth=Math.max(0,Math.min(cap,copy.depth||0));
  copy.depth=depth;copy._rest=0;
  if(depth<=0){
    var x=cv.getContext('2d');
    bg(x,cv.width,cv.height);
    x.fillStyle=GOLD;x.beginPath();x.arc(cv.width/2,cv.height*0.7,Math.max(3,cv.width*0.07),0,Math.PI*2);x.fill();
    return;
  }
  paintOwn++;
  try{
    if(ADDITIVE[sh]){
      for(L=1;L<=depth;L++){job=makeJob(cv,copy,L);while(!stepJob(job,forever)){}}
    }else{
      job=makeJob(cv,copy,depth);while(!stepJob(job,forever)){}
    }
  }finally{paintOwn--}
}
function recChrome(g){return[g&&g.shape,g&&g.angle,g&&g.pal,g&&g.season,g&&g.poly,g&&g.seed,night()?'n':'d'].join('|')}
function patchGrowChrome(g){
  var jar,lab,word,n,slot,figs,last,num;
  refreshMsg(g);
  syncMsg(g);
  n=copies(g);
  g._n=n;
  slot=document.getElementById('gaf149count');
  if(slot)slot.textContent=String(n);
  jar=document.querySelector('[data-gaf3jar] .g9c');
  if(jar){
    lab=jar.querySelector('.soft');word=lab?lab.textContent:'';
    jar.textContent='';
    jar.appendChild(document.createTextNode(String(n)));
    if(word){lab=document.createElement('span');lab.className='soft';lab.textContent=word;jar.appendChild(document.createTextNode(' '));jar.appendChild(lab)}
  }
  figs=document.querySelectorAll('[data-gafcode149] figure figcaption');
  if(figs&&figs.length){
    last=figs[figs.length-1];
    num=last.querySelector('.kline,b,span')||last;
    /* the depth sits as the first text in the figcaption */
    if(last.firstChild&&last.firstChild.nodeType===3)last.firstChild.nodeValue=String(g.depth||0);
    else if(last.firstChild&&last.firstChild.childNodes&&last.firstChild.childNodes.length){
      if(last.firstChild.firstChild&&last.firstChild.firstChild.nodeType===3)last.firstChild.firstChild.nodeValue=String(g.depth||0);
    }
  }
}

function hookDraw(){
  hook('patGrowDrawOn106',function(prev){
    return function(cv,rec){
      rec=rec||{};
      if(!cv)return prev.apply(this,arguments);
      if(cv.id!=='patGrowCv')return paintThumb(cv,rec,prev);
      layout(cv);
      if(rec._rest){cancel();dropGuard();return prev.apply(this,arguments)}
      var sh=rec.shape,depth=rec.depth||0,base=baseCap(sh),realRd=userReduced();
      if(sh==='apollonian'&&depth>0){
        cancel();
        if(realRd){startWork(cv,rec,depth,depth,prev,false);return}
        startWork(cv,rec,depth,depth,prev,true);
        return;
      }
      if(depth<=base){
        if(sliceBase(sh)&&depth>0){
          cancel();
          startWork(cv,rec,depth,depth,prev,!realRd);
          return;
        }
        cancel();dropGuard();
        paintOwn++;
        try{
          var r0=prev.apply(this,arguments);
          try{saveCache(cv,rec)}catch(ex){}
          return r0;
        }finally{paintOwn--}
      }
      cancel();
      if(!realRd)armGuard(cv);
      startWork(cv,rec,base,depth,prev,!realRd);
    };
  });
  hook('patGrowStep106',function(prev){
    return function(){
      var g=grow();
      if(g&&g._rest)return prev.apply(this,arguments);
      if(g&&g.shape){
        var cap=capOf(g.shape,g),base=baseCap(g.shape);
        if((g.depth||0)>=cap){
          g.msg=t(CAP_EN);
          if(typeof patGrowDraw106==='function')patGrowDraw106();
          return;
        }
        if((g.depth||0)+((g.q&&g.q.length)||0)>=cap)return;
        if((g.depth||0)>=base){
          g.depth=(g.depth||0)+1;
          refreshMsg(g);
          if(typeof patGrowTone106==='function')try{patGrowTone106(g.depth-1)}catch(ex){}
          function drawNow(){if(typeof patGrowDraw106==='function')patGrowDraw106()}
          function flushStep(){
            stepRaf=0;stepBusy=0;
            var d=pendingDraw;pendingDraw=0;
            if(d)drawNow();
          }
          if(stepBusy){
            pendingDraw=1;
            if(!stepRaf)stepRaf=requestAnimationFrame(flushStep);
            return;
          }
          stepBusy=1;
          pendingDraw=0;
          if(!stepRaf)stepRaf=requestAnimationFrame(flushStep);
          drawNow();
          return;
        }
      }
      return prev.apply(this,arguments);
    };
  });
  hook('patGrowDraw106',function(prev){
    return function(){
      var g=grow(),cv,el,fast,r;
      scrubGrow(g);
      cv=document.getElementById('patGrowCv');
      el=document.getElementById('patterns');
      fast=cv&&g&&g.shape&&!g._rest&&(g.depth||0)>0&&document.querySelector('[data-gaf3jar]')&&el&&el.hidden!==true&&lastChrome===recChrome(g)&&(lastFullAt>0||(g.depth||0)>baseCap(g.shape));
      if(fast){
        patchGrowChrome(g);
        try{layout(cv);if(typeof patGrowDrawOn106==='function')patGrowDrawOn106(cv,g)}catch(ex){}
        try{if(typeof patNatureCard106==='function')patNatureCard106()}catch(ex){}
        refreshMsg(g);syncMsg(g);
        return;
      }
      r=prev.apply(this,arguments);
      lastChrome=g?recChrome(g):null;
      lastFullAt=(g&&g.depth)||0;
      if(g){scrubGrow(g);refreshMsg(g);syncMsg(g)}
      return r;
    };
  });
  hook('patGrowSet106',function(prev){
    return function(k,v){
      if(k==='shape'){cancel();dropGuard();cache=null;lastChrome=null;lastFullAt=0}
      return prev.apply(this,arguments);
    };
  });
  hook('patReduced',function(prev){
    return function(){
      if(skipDragonUn&&!probingRd)return true;
      return prev.apply(this,arguments);
    };
  });
  if(typeof root.lampReduced73==='function'){
    hook('lampReduced73',function(prev){
      return function(){
        if(skipDragonUn&&!probingRd)return true;
        return prev.apply(this,arguments);
      };
    });
  }
}

function onResize(){
  if(resizeT)clearTimeout(resizeT);
  resizeT=setTimeout(function(){
    try{
      var el=document.getElementById('patterns');
      if(!el||el.hidden===true)return;
      var g=grow();
      if(!g)return;
      cache=null;
      if(scrubGrow(g)&&typeof patGrowDraw106==='function')patGrowDraw106();
      else if(typeof patGrowDraw106==='function')patGrowDraw106();
    }catch(ex){}
  },80);
}

function publish(){
  function wrapGasket(obj){
    if(!obj||typeof obj.gasket!=='function'||obj.gasket._v171)return;
    obj.gasket=function(depth){return rawGasket(depth)};
    obj.gasket._v171=1;
  }
  wrapGasket(root.IL154);wrapGasket(root.IL155);
  if(typeof IL154==='object'){
    IL154.capOf=function(sh){return capOf(sh)};IL154.copies=copies;IL154.fibArms=fibArms;
    IL154.paintCount=function(d){return rawGasket(d).length};
    if(typeof IL155==='object'&&typeof IL155.paintCount==='function')IL155.paintCount=function(d){return rawGasket(d).length};
  }
  if(typeof IL155==='object'){IL155.capOf=function(sh){return capOf(sh)};IL155.copies=copies}
  if(typeof IL156==='object'){IL156.capOf=function(sh){return capOf(sh)};IL156.copies=copies}
  if(typeof IL157==='object'){IL157.capOf=function(sh){return capOf(sh)};IL157.copies=copies}
  if(typeof IL150==='object'&&typeof IL150.capOf==='function'){
    IL150.capOf=function(sh){return capOf(sh)};IL150.capOf._v171=1;
  }
  if(typeof IL169==='object'){
    IL169.capOf=capOf;IL169.copies=copies;IL169.pieceSize=function(sh,next,S){return pieceSize(sh,next,S)};
    capOf._v171=1;copies._v171=1;
  }
  if(typeof IL170==='object'){
    IL170.capOf=capOf;IL170.copies=copies;IL170.pieceSize=pieceSize;
  }
}

function install(){
  if(install._on)return;install._on=1;
  hookDraw();
  publish();
  try{root.addEventListener('resize',onResize);root.addEventListener('orientationchange',onResize)}catch(ex){}
}
root.IL171={version:171,install:install,SLICE:SLICE,capOf:capOf,baseCap:baseCap,copies:copies,pieceSize:pieceSize,cssSize:cssSize,devicePx:devicePx,minPx:minPx,fibArms:fibArms,gasket:rawGasket,pythCount:pythCount,compactCanvas:compactCanvas,
  notes:'v171 keeps skipDragonUn until the grow job finishes or cancel() runs, time-slices unsliced base drawers, budgets batches by device pixels, and yields a frame between rapid steps. It also applies Pi’s v170 recheck: measured sunflower arms refreshed every level, extras in the base newest-level colour with alpha 1 on full-redraw shapes, gallery thumbs drawn without layout/tok/cache, Pythagoras leaf counts, levyPtsStep concat, and a fixed IL154.paintCount. Reduced motion stays on the sync path. Pinch-zoom tiles and WebGL stay deferred.'};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})(typeof window!=='undefined'?window:this);
/* v172.js — Lamp effects v2 (Classic + five effects, Wise Lamp Norma stars) plus the Lamp-only dark-rim removal. */
/* lamp_effects_v2.js — the five Lamp effects (and the Wise Lamp star) re-fitted to the
 * round3 paper lantern (v165/v167 art). Load AFTER v123.js and v167.js. Same hooks:
 * lampFxSpiralSVG89, lampFxEmberSVG89, lampFxLayerHTML89, lampFxSmokeStart89,
 * lampFxPrev89, lampFxInsert89, lampSvg73. CSS goes in <style id="lampfx2">.
 * Everything is scoped to a shell that holds the Lamp ([data-il-kind="lamp"]);
 * other companions keep the v123 look. Geometry: the lantern art is a 200 box at
 * scale(.5), so 1 shell % = 2 art units. Stage scale about (100,184): hatchling .8,
 * young .89, grown/wise 1. Window (lower glass) 80..120 x 124..168, heart (100,146). */
(function(){
'use strict';
var L='.lamp73-shell:has([data-il-kind="lamp"]):not(#fx2)';
var S=function(st){return '.lamp73-shell:has([data-il-kind="lamp"][data-il-stage="'+st+'"]):not(#fx2)'};
/* Lantern silhouette in shell units (grown). Used as a hole in the mask so spiral seeds and
   smoke sit "behind" the Lamp on its night panel, with a 2-unit dark gap round the ink. */
var SIL='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><g stroke="#000" stroke-linejoin="round" stroke-linecap="round"><path d="M44 24c0-9 12-9 12 0" fill="none" stroke-width="5"/><path d="M34 34 41 24h18l7 10zM38 34h24l5 8v41l-5 5H38l-5-5V42zM38 88h24l5 6H33z" stroke-width="2.4"/><path d="M33 61c-8 2-13 7-10 12M67 61c8 2 13 7 10 12" fill="none" stroke-width="6.2"/><ellipse cx="43" cy="95" rx="4.5" ry="2.5" stroke-width="2.4"/><ellipse cx="57" cy="95" rx="4.5" ry="2.5" stroke-width="2.4"/></g></svg>';
var SILURL='url("data:image/svg+xml,'+encodeURIComponent(SIL)+'")';
var MASK='-webkit-mask-image:'+SILURL+',linear-gradient(#000,#000);-webkit-mask-composite:xor;'+
 'mask-image:'+SILURL+',linear-gradient(#000,#000);mask-composite:exclude;'+
 '-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;'+
 '-webkit-mask-size:calc(100% * var(--lx-s)) calc(100% * var(--lx-s)),100% 100%;mask-size:calc(100% * var(--lx-s)) calc(100% * var(--lx-s)),100% 100%;'+
 '-webkit-mask-position:50% 92%,0 0;mask-position:50% 92%,0 0;';
var HOLE=function(w,h){var g='linear-gradient(#000,#000)';return '-webkit-mask-image:'+g+','+g+';-webkit-mask-composite:xor;mask-image:'+g+','+g+';mask-composite:exclude;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%,'+w+' '+h+';mask-size:100% 100%,'+w+' '+h+';-webkit-mask-position:0 0,50% 50%;mask-position:0 0,50% 50%'};
var FACEHOLE=(function(){var g='linear-gradient(#000,#000)',sz='100% 100%,calc(20% * var(--lx-s)) calc(28% * var(--lx-s))',ps='0 0,50% var(--lx-fp)';
 return '-webkit-mask-image:'+g+','+g+';-webkit-mask-composite:xor;mask-image:'+g+','+g+';mask-composite:exclude;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:'+sz+';mask-size:'+sz+';-webkit-mask-position:'+ps+';mask-position:'+ps})();
var tip='var(--f81-tip,#FFF6D8)',core='var(--f81-core,#FFE4A4)',mid='var(--f81-mid,#E6B454)',halo='var(--f81-halo,#dbb06b)';
var mix=function(c,p){return 'color-mix(in oklab,'+c+' '+p+'%,transparent)'};
var CSS=[
/* stage geometry: --lx-s scale, --lx-wy window centre, --lx-cyn lantern centre (unitless) */
L+'{--lx-s:1;--lx-wy:73%;--lx-cyn:58;--lx-fp:47.2%}',
S('young')+'{--lx-s:.89;--lx-wy:75.1%;--lx-cyn:61.7;--lx-fp:53.8%}',
S('hatchling')+'{--lx-s:.8;--lx-wy:76.8%;--lx-cyn:64.8;--lx-fp:58.8%}',
/* layers sit inside the shell, over the art (the art has its own night panel) */
L+'>.fx89-layer.fx89-core,'+L+'>.fx89-layer.fx89-core-flame,'+L+'>.fx89-layer.fx89-smoke,'+L+'>.fx89-layer.fx89-spiral{inset:0!important;left:0!important;top:0!important;width:100%!important;height:100%!important;transform:none!important;z-index:3!important;overflow:hidden}',
L+'>.fx89-layer.fx89-core,'+L+'>.fx89-layer.fx89-smoke{mix-blend-mode:screen}',
/* blend on the layer itself: a z-indexed layer is its own group, so a blend on its children would only see the layer */
L+'>.fx89-layer.fx89-jelly{z-index:auto!important;mix-blend-mode:normal}',
/* the jelly layer is not a stacking context, so each part blends with the lantern art below it */
L+' .fx89-jelly-clip{position:absolute;z-index:3;mix-blend-mode:multiply}',
L+' .fx2-jedge{position:absolute;z-index:3;top:calc(92% - 50% * var(--lx-s));height:calc(41% * var(--lx-s));width:calc(5.4% * var(--lx-s));border-radius:2px;mix-blend-mode:normal;opacity:.62;filter:blur(.6px);background:repeating-linear-gradient(0deg,#f797b3 0 4px,#f4c276 4px 8px,#9fdc91 8px 12px,#86c6f5 12px 16px,#c5a3f7 16px 20px);background-size:100% 20px;animation:fx2-jrise 12s linear infinite}',
L+' .fx2-jl{left:calc(50% - 15.8% * var(--lx-s))}'+L+' .fx2-jr{left:calc(50% + 10.4% * var(--lx-s));animation-delay:-6s}',
'@keyframes fx2-jrise{from{background-position:0 0}to{background-position:0 -20px}}',
/* Bright core: light from the window, not a flame over the face */
L+' .fx89-shell,'+L+' .fx89-mid,'+L+' .fx89-hot,'+L+' .fx111-core-soft,'+L+' .fx89-flame{position:absolute;left:50%;top:var(--lx-wy);border-radius:50%}',
L+' .fx89-shell{width:calc(42% * var(--lx-s));height:calc(46% * var(--lx-s));filter:blur(5px);background:radial-gradient(closest-side,'+mix(tip,75)+','+mix(core,45)+' 55%,transparent)}',
L+' .fx89-mid{width:calc(19% * var(--lx-s));height:calc(21% * var(--lx-s));border-radius:8%;filter:blur(2px);background:radial-gradient(closest-side,'+mix(tip,16)+','+mix(tip,10)+' 70%,transparent)}',
L+' .fx89-hot{width:calc(6% * var(--lx-s));height:calc(6.6% * var(--lx-s));filter:blur(1px);background:radial-gradient(closest-side,'+mix(tip,34)+','+mix(tip,10)+' 50%,transparent)}',
L+' .fx111-core-soft{top:50%;width:100%;height:100%;border-radius:0;filter:none;background:radial-gradient(ellipse 72% 72% at 50% calc(var(--lx-cyn) * 1%),'+mix(core,80)+','+mix(mid,55)+' 38%,'+mix(halo,22)+' 72%,transparent 100%);animation:fx2-halo 18s ease-in-out infinite;'+FACEHOLE+'}',
'@keyframes fx2-halo{0%,100%{transform:translate(-50%,-50%);opacity:.86}50%{transform:translate(-50%,-50%);opacity:1}}',
L+' .fx89-flame{width:calc(26% * var(--lx-s));height:calc(28% * var(--lx-s));filter:blur(3px);background:radial-gradient(closest-side,transparent 55%,'+mix(tip,16)+' 75%,transparent)}',
/* the wide glows light the paper round the window, not the ring glass, so the ring ink keeps its contrast */
L+' .fx89-shell{'+HOLE('46%','46%')+'}',
/* Bright core window: a brighter glass with the belly rings redrawn in their ink, on top */
L+' .fx2-cwin{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
L+' .fx2-cwin .fx2-cst{transform-origin:100px 184px;transform:scale(var(--lx-s))}',
'.fx2-cwr{fill:none;stroke:#8A5E1C}',
S('hatchling')+' .fx2-cwin :is(.fx2-r5,.fx2-r7,.fx2-r13),'+S('young')+' .fx2-cwin :is(.fx2-r3,.fx2-r7,.fx2-r13),'+S('grown')+' .fx2-cwin :is(.fx2-r3,.fx2-r5,.fx2-r13),'+S('wise')+' .fx2-cwin :is(.fx2-r3,.fx2-r5,.fx2-r7){display:none}',
'.lamp73-shell:has(svg.il-xs) .fx2-cwr{display:none}',
/* Sleeping spiral: ring seeds round the Lamp, hidden behind it */
L+'>.fx89-layer.fx89-spiral,'+L+'>.fx89-layer.fx89-smoke{'+MASK+'}',
L+' .fx89-spiral{transform:none!important;animation:none!important;transition:none!important;overflow:hidden;filter:none}'+L+' svg.fx89-spiral{filter:drop-shadow(0 0 .8px '+halo+')}',
L+' .fx2-ctr{transform:translate(50px,calc(var(--lx-cyn) * 1px))}',
L+' .fx2-spin{transition:transform 8.5s cubic-bezier(.22,.61,.36,1)}',
L+' .fx89-spiral.asleep .fx2-spin{transform:scale(.28) rotate(-40deg)}',
L+' .fx89-spiral.awake:not(.still) .fx2-spin{animation:fx2-spin 140s linear 8.5s infinite}',
'@keyframes fx2-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}',
'.fx2-spiral circle.fx2-b,.fx89-prev-svg circle.fx2-b{fill:none;stroke:'+tip+';stroke-width:1.2;stroke-opacity:.9}.fx2-spiral circle.fx2-f{fill:'+mid+';stroke:none}',
S('hatchling')+' .fx2-g5,'+S('hatchling')+' .fx2-g7,'+S('hatchling')+' .fx2-g13,'+S('young')+' .fx2-g7,'+S('young')+' .fx2-g13,'+S('grown')+' .fx2-g13{display:none}',
/* Ember pulses: motes leave the cap vents */
L+' .fx2-st{transform-origin:50px 92px;transform:scale(var(--lx-s))}',
L+' .fx89-ember .fx89-etrack{stroke:'+core+';stroke-width:.5;opacity:.08}',
'.fx2-er{fill:none;stroke:'+core+';stroke-width:.7}.fx2-em .fx89-ed{fill:'+tip+';stroke:none}',
/* Comb jelly: rows of light inside the window glass */
L+' .fx89-jelly-clip{left:calc(50% - 9.6% * var(--lx-s));top:calc(var(--lx-wy) - 10.6% * var(--lx-s));width:calc(19.2% * var(--lx-s));height:calc(21.2% * var(--lx-s));border-radius:1px}',
L+' .fx89-jelly-a,'+L+' .fx89-jelly-b{background:repeating-linear-gradient(180deg,#ff9a3c 0 3px,#ff5f8f 3px 6px,#3fcf8e 6px 9px,#4f9dff 9px 12px,#b07cff 12px 15px);background-size:100% 15px;filter:blur(.6px);mix-blend-mode:normal;opacity:.7}',
L+' .fx89-jelly-b{filter:blur(1.6px) hue-rotate(24deg);opacity:.3}',
'.lamp73-shell:has(svg.il-sm) .fx89-jelly-a{background-size:100% 15px}',
/* Glowing smoke: a soft cloud from the window, the Lamp hides behind it */
L+' .fx89-smoke-cv{-webkit-mask-image:none;mask-image:none;filter:blur(1.2px)}',
L+' .fx111-smoke-haze{inset:6%;filter:blur(10px);opacity:.22;background:radial-gradient(circle at 50% var(--lx-wy),'+mix(halo,40)+',transparent 72%)}',
L+' .fx89-smoke-static{inset:0;-webkit-mask-image:none;mask-image:none}',
L+' .fx89-smoke-static span{filter:blur(2.5px);opacity:.75;border-radius:50%;background:radial-gradient(closest-side,'+mix(tip,70)+','+mix(core,35)+' 60%,transparent)}',
L+' .fx89-smoke-static span:nth-child(1){left:24%;top:2%;width:9%;height:30%;transform:rotate(-22deg)}',
L+' .fx89-smoke-static span:nth-child(2){left:67%;top:2%;width:9%;height:30%;transform:rotate(22deg)}',
L+' .fx89-smoke-static span:nth-child(3){left:10%;top:30%;width:8%;height:28%;transform:rotate(-34deg)}',
L+' .fx89-smoke-static span:nth-child(4){left:82%;top:30%;width:8%;height:28%;transform:rotate(34deg)}',
/* previews */
'.fx89-pv-core .fx89-pv-m{transform-box:fill-box;transform-origin:center}.fx89-prev-svg .fx89-pv-glow,.fx89-pv-core .fx89-pv-s{opacity:.3}.fx2-pv-ink{stroke:#72583F;stroke-width:1.3;stroke-linejoin:round}.fx2-pv-r{fill:none;stroke:#8A5E1C;stroke-width:1}',
/* 44 px: bold marks only */
'svg.il-sm~.fx89-layer .fx-fine,.lamp73-shell:has(svg.il-sm) .fx-fine{display:none}',
/* reduced motion and in-app reduce */
'@media (prefers-reduced-motion:reduce){'+L+' .fx2-spin{animation:none!important;transition:none!important;transform:none!important}}',
'.reduce73 .fx2-spin,.fx89-layer.still .fx2-spin{animation:none!important;transition:none!important;transform:none!important}',
'@media (prefers-reduced-motion:reduce){.fx2-jedge{animation:none!important}}.reduce73 .fx2-jedge,.fx89-layer.still .fx2-jedge{animation:none!important}',
/* v172: turn off the v123 smoke drop-shadow for the Lamp only, so the 44 px smoke tile has no dark rim. Other friends keep v123. */
L+':has(.fx89-smoke) .lamp73-svg{filter:none}',
'.today64:has([data-il-kind="lamp"]):has(.fx89-smoke) .lamp73-svg{filter:none}'
].join('\n');
function css(){
 if(typeof document==='undefined'||document.getElementById('lampfx2'))return;
 var s=document.createElement('style');s.id='lampfx2';s.textContent=CSS;
 (document.head||document.documentElement).appendChild(s);
}
var n2=0;
var f=function(x){return (+x).toFixed(1).replace(/\.0$/,'')};

/* Sleeping spiral: sunflower seeds round the lantern centre. Bold seeds are belly rings
   (same size, outline only); 3/5/7/13 of them show by stage. Fine seeds are fx-fine. */
function spiral(asleep,still){
 var GA=Math.PI*(3-Math.sqrt(5)),d=[],i,r,a,t;
 for(i=40;i<125;i+=2){r=4.2*Math.sqrt(i);if(r>47)break;if(r<37&&i%3===1)continue;a=i*GA;t=(r-26)/21;
  d.push('<circle class="fx2-f fx-fine" cx="'+f(r*Math.cos(a))+'" cy="'+f(r*Math.sin(a))+'" r="'+f(.6+.5*t)+'" opacity="'+(.22+.28*t).toFixed(2)+'"/>');}
 for(i=0;i<13;i++){a=i*GA-Math.PI/2;r=37+(i%3)*3.5;
  d.push('<circle class="fx2-b fx2-g'+(i<3?3:i<5?5:i<7?7:13)+'" cx="'+f(r*Math.cos(a))+'" cy="'+f(r*Math.sin(a))+'" r="2.6"/>');}
 var st=(still?' still':'')+(asleep&&!still?' asleep':' awake');
 return '<svg class="fx89-spiral fx111-spiral fx2-spiral'+st+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><g class="fx2-ctr"><g class="fx2-spin">'+d.join('')+'</g></g></svg>';
}
/* Ember pulses: ring motes rise from the two cap vents, 15-20 s each, fade in and out. */
function ember(still){
 var id='fx2eb'+(++n2),P=['M36 34C33 26 33 18 28 6','M64 34C67 26 67 18 72 6'],m='';
 [[0,15,0],[1,17.5,5],[0,20,11],[1,15,8],[0,17.5,3],[1,20,14]].forEach(function(v,i){
  var p=P[v[0]],inner='<circle class="fx2-er" r="'+f(2.4-i*.1)+'"/><circle class="fx89-ed" r="1.1"/>';
  if(still){var xy=[[34,28],[66,22],[31,16],[69,12],[30,10],[70,30]][i];
   m+='<g class="fx2-em" transform="translate('+xy[0]+' '+xy[1]+')" opacity="'+(.85-i*.08).toFixed(2)+'">'+inner+'</g>';}
  else m+='<g class="fx2-em" opacity="0">'+inner+'<animateMotion dur="'+v[1]+'s" begin="-'+v[2]+'s" repeatCount="indefinite" path="'+p+'"/><animate attributeName="opacity" values="0;.8;.7;0" keyTimes="0;.2;.7;1" dur="'+v[1]+'s" begin="-'+v[2]+'s" repeatCount="indefinite"/></g>';
 });
 return '<svg class="fx89-ember fx111-ember fx2-ember'+(still?' still':'')+'" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><defs><filter id="'+id+'" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation=".55" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g class="fx2-st"><path class="fx89-etrack" d="'+P[0]+'" fill="none"/><path class="fx89-etrack" d="'+P[1]+'" fill="none"/><g filter="url(#'+id+')">'+m+'</g></g></svg>';
}
/* Bright core window, in the art's 200 box: glass, the stage's belly rings, the heart. */
function coreWin(){
 var id='fx2cw'+(++n2),R=function(c,cls,w){return '<g class="fx2-cwr '+cls+'" stroke-width="'+w+'">'+c.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+'"/>'}).join('')+'</g>'};
 var hx=function(r){var o=[[100,146]];for(var k=0;k<6;k++){var a=k*Math.PI/3;o.push([f(100+r*Math.cos(a)),f(146+r*Math.sin(a))])}return o.map(function(p){return [p[0],p[1],r]})};
 var r3=[[100,146,8.5],[108.5,146,8.5],[91.5,146,8.5]],r5=r3.concat([[95.75,138.64,8.5],[104.25,138.64,8.5]]);
 var r13b=[];for(var k=0;k<6;k++){var a=k*Math.PI/3+Math.PI/6;r13b.push([f(100+12.12*Math.cos(a)),f(146+12.12*Math.sin(a)),7])}
 return '<svg class="fx2-cwin" viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="'+id+'" cx=".5" cy=".5" r=".62"><stop offset="0" style="stop-color:#FFFFFF"/><stop offset=".7" style="stop-color:#FFFCEC"/><stop offset="1" style="stop-color:'+core+'"/></radialGradient></defs><g class="fx2-cst"><rect x="81" y="125" width="38" height="42" fill="url(#'+id+')"/>'+
  R(r3,'fx2-r3',1.6)+R(r5,'fx2-r5',1.6)+R(hx(8),'fx2-r7',1.6)+R(hx(7),'fx2-r13',1.35)+R(r13b,'fx2-r13',1.15)+
  '<circle cx="100" cy="146" r="5" fill="'+core+'" stroke="#E6B454" stroke-width="1.3"/></g></svg>';
}
/* Picker previews: the lantern on its night disc, with the effect; 64 box, v89 classes.
   No <path> in the lantern itself: v89 dashes/animates every path in the ember and smoke previews. */
var DISC='<circle cx="32" cy="32" r="30" fill="#120E18"/>';
var LANT='<polyline class="fx2-pv-ink" points="29,14 29,11 30.5,9.5 33.5,9.5 35,11 35,14" fill="none"/><polygon class="fx2-pv-ink" points="26,14 38,14 43,21 21,21" fill="#A8843E"/><polygon class="fx2-pv-ink" points="24,21 40,21 43,25 43,47 40,50 24,50 21,47 21,25" fill="#E6B454"/><rect class="fx2-pv-ink" x="27" y="34" width="10" height="12" fill="#FFE4A4"/><circle class="fx2-pv-r" cx="32" cy="40" r="3"/><circle cx="28.5" cy="27" r="1.1" fill="#72583F"/><circle cx="35.5" cy="27" r="1.1" fill="#72583F"/>';
function prev(id){
 var o='<svg class="fx89-prev-svg fx89-pv-'+id+'" viewBox="0 0 64 64" aria-hidden="true">'+DISC,c='</svg>',GA=Math.PI*(3-Math.sqrt(5)),s='',i,r,a;
 var mote=function(p,k){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(3-k*.3)+'" fill="none" stroke="'+core+'" stroke-width="1.2"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="1.3" fill="'+tip+'"/>'};
 var RB=['#f797b3','#f4c276','#9fdc91','#86c6f5','#c5a3f7'];
 if(id==='classic')return o+'<ellipse class="fx89-pv-glow" cx="32" cy="36" rx="19" ry="19" opacity=".35"/>'+LANT+c;
 if(id==='spiral'){for(i=0;i<13;i++){a=i*GA;r=20+(i%3)*2.6;s+='<circle class="fx2-b" cx="'+f(32+r*Math.cos(a))+'" cy="'+f(33+r*Math.sin(a))+'" r="2.2"/>'}
  return '<svg class="fx89-prev-svg" viewBox="0 0 64 64" aria-hidden="true">'+DISC+'<g class="fx89-pv-spiral" style="transform-origin:32px 33px">'+s+'</g>'+LANT+c;}
 if(id==='core')return o+[29,25,21,16].map(function(r,k){return '<circle'+(k?'':' class="fx89-pv-s"')+' cx="32" cy="33" r="'+r+'" fill="'+[mid,mid,core,tip][k]+'" style="opacity:'+[.4,.45,.6,.75][k]+'"/>'}).join('')+LANT+'<rect class="fx89-pv-m" x="26" y="33" width="12" height="14" rx="2" fill="'+tip+'" opacity=".55"/><circle class="fx2-pv-r" cx="32" cy="40" r="3"/>'+c;
 if(id==='ember')return o+LANT+'<path d="M22 20C21 16 20 12 19 7M42 20C43 16 44 12 45 7" fill="none" stroke="'+core+'" stroke-width="1" opacity=".45" stroke-linecap="round"/>'+[[19.5,16],[44.5,13],[22,9],[41,8]].map(mote).join('')+c;
 if(id==='jelly'){for(i=0;i<8;i++){s+='<rect x="15.5" y="'+(22+i*3.5)+'" width="3.2" height="3.5" fill="'+RB[i%5]+'"/><rect x="45.3" y="'+(22+i*3.5)+'" width="3.2" height="3.5" fill="'+RB[(i+2)%5]+'"/>'}
  return o+LANT+'<g class="fx89-pv-rows">'+s+['#ff5f8f','#3fcf8e','#4f9dff','#ff9a3c'].map(function(h,k){return '<rect x="27.5" y="'+(34.6+k*2.8)+'" width="9" height="1.6" fill="'+h+'" opacity=".85"/>'}).join('')+'</g>'+c;}
 if(id==='smoke')return o+LANT+'<g fill="none" stroke-linecap="round">'+['M27 14C24 12 26 10 22 9','M37 14C40 12 38 10 42 9','M20 28C16 25 17 20 11 18','M44 28C48 25 47 20 53 18'].map(function(d){return '<path d="'+d+'" stroke="'+tip+'" stroke-width="4.6" opacity=".4"/><path d="'+d+'" stroke="'+tip+'" stroke-width="1.8"/>'}).join('')+'</g>'+c;
 return '';
}
/* Smoke: the v92 canvas hook, drawing soft wisps that rise past the cap and drift out at
   the sides (11-15 s each). Same FX89_SMOKE / low-power / reduced-motion paths. */
function smokeStart(prevStart){
 return function(layer,canvas){
  /* v89 starts the canvas before v123 moves the layer into the shell: move a Lamp's layer first */
  var sh=lampShell(layer);
  if(sh&&sh.querySelector('[data-il-kind="lamp"]')&&layer.parentElement!==sh)sh.appendChild(layer);
  var wy=parseFloat(getComputedStyle(layer).getPropertyValue('--lx-wy'));
  if(!wy||!canvas)return prevStart.apply(this,arguments);
  lampFxSmokeStop89(layer);
  FX89_SMOKE.forEach(function(rec,k){if(k!==layer){if(rec.raf)cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(k)}});
  if(lampFxReduced89()||lampFxLow89()){canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);return}
  var ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  var W=canvas.width,H=canvas.height,sc=parseFloat(getComputedStyle(layer).getPropertyValue('--lx-s'))||1,ws=[];
  /* six wisps: four leave the cap and curl out, two leave the shoulders and drift to the sides */
  var EM=[[-.12*sc,92-62*sc,-1,.24],[.12*sc,92-62*sc,1,.24],[-.06*sc,92-68*sc,-1,.22],[.06*sc,92-68*sc,1,.22],[-.18*sc,92-42*sc,-1,.3],[.18*sc,92-42*sc,1,.3]];
  var mk=function(i,fresh){var e=EM[i];return {i:i,x0:W*(.5+e[0]),y0:H*e[1]/100,dir:e[2],L:H*e[3],life:11+Math.random()*4,age:fresh?0:Math.random()*10,ph:Math.random()*6}};
  for(var i=0;i<EM.length;i++)ws.push(mk(i,false));
  var rec={raf:0,last:0,frames:[],dead:false};FX89_SMOKE.set(layer,rec);
  var hex=function(c){c=String(c||'').trim();return c[0]==='#'&&c.length===7?[1,3,5].map(function(i){return parseInt(c.slice(i,i+2),16)}):[239,186,100]};
  var loop=function(t){
   if(!canvas.isConnected){cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);return}
   rec.raf=requestAnimationFrame(loop);
   if(document.hidden||canvas.offsetParent===null)return;
   if(rec.last&&t-rec.last<33)return;
   var dt=rec.last?Math.min(50,t-rec.last):33;
   if(rec.last){rec.frames.push(t-rec.last);if(rec.frames.length>48)rec.frames.shift();
    if(rec.frames.length>=30){var md=rec.frames.slice().sort(function(a,b){return a-b})[Math.floor(rec.frames.length/2)];
     if(md>52){rec.dead=true;FX89_LOW=true;cancelAnimationFrame(rec.raf);FX89_SMOKE.delete(layer);
      canvas.replaceWith(Object.assign(document.createElement('div'),{innerHTML:lampFxSmokeStatic89()}).firstChild);return}}}
   rec.last=t;
   var s=getComputedStyle(layer),tip=hex(s.getPropertyValue('--f81-tip')||'#FFF6D8'),cor=hex(s.getPropertyValue('--f81-core')||'#FFE4A4');
   ctx.clearRect(0,0,W,H);
   for(var i=0;i<ws.length;i++){
    var w=ws[i];w.age+=dt/1000;var k=w.age/w.life;
    if(k>=1){ws[i]=mk(w.i,true);continue}
    var fade=Math.sin(Math.PI*Math.min(1,k*1.15)),head=w.L*(.4+.6*k),len=w.L*.8,n=22;
    for(var j=0;j<=n;j++){
     var u=j/n,d=Math.max(0,head-len*(1-u));if(d<=0)continue;
     var q=d/w.L,x=w.x0+w.dir*W*.2*Math.pow(q,1.5)+Math.sin(d*.04+w.ph+w.age*.35)*W*.015,y=w.y0-d;
     var r=W*(.028+.04*q),al=.42*fade*Math.sin(Math.PI*u)*(1-.45*q);if(al<.004)continue;
     var c=j%2?tip:cor,g=ctx.createRadialGradient(x,y,0,x,y,r);
     g.addColorStop(0,'rgba('+c+','+al+')');g.addColorStop(1,'rgba('+c+',0)');
     ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
    }
   }
  };
  rec.raf=requestAnimationFrame(loop);
 };
}
/* Wise Lamp star: Norma, the Carpenter's Square, in the night panel's upper right
   (the old v123 hook path is not in the round3 art, so the stars had gone). */
var NORMA='<g class="fx2-norma" aria-hidden="true"><path class="il-fine" d="M176 32 173 50 154 50 150 22Z" fill="none" stroke="#FFF6D8" stroke-width="1" stroke-linejoin="round" opacity=".35"/><path class="il-n" d="M173 50h0M154 50h0M176 32h0" stroke-width="7" opacity=".8"/></g>';
function wise(html){
 html=String(html||'');
 if(html.indexOf('fx2-norma')>=0||!/class="il119 il165" data-il-kind="lamp" data-il-stage="wise"/.test(html))return html;
 return html.replace(/(class="il119 il165" data-il-kind="lamp" data-il-stage="wise"[\s\S]*?fill="#120E18"\/>)/,'$1'+NORMA);
}
function lampShell(layer){
 return layer.closest('.lamp73-shell')||(typeof shellForLayer123==='function'&&shellForLayer123(layer))||(layer.parentElement&&layer.parentElement.querySelector('.lamp73-shell'));
}
function install(){
 css();
 if(typeof lampFxSpiralSVG89==='function'&&!lampFxSpiralSVG89._lfx2){lampFxSpiralSVG89=spiral;spiral._lfx2=1}
 if(typeof lampFxEmberSVG89==='function'&&!lampFxEmberSVG89._lfx2){lampFxEmberSVG89=ember;ember._lfx2=1}
 if(typeof lampFxPrev89==='function'&&!lampFxPrev89._lfx2){var pp=lampFxPrev89;lampFxPrev89=function(id){return prev(id)||pp(id)};lampFxPrev89._lfx2=1}
 if(typeof lampFxLayerHTML89==='function'&&!lampFxLayerHTML89._lfx2){var pl=lampFxLayerHTML89;
  lampFxLayerHTML89=function(id){var h=pl.apply(this,arguments);return id==='jelly'?h+'<div class="fx2-jedge fx2-jl"></div><div class="fx2-jedge fx2-jr"></div>':h};lampFxLayerHTML89._lfx2=1}
 if(typeof lampFxSmokeStart89==='function'&&!lampFxSmokeStart89._lfx2){lampFxSmokeStart89=smokeStart(lampFxSmokeStart89);lampFxSmokeStart89._lfx2=1}
 if(typeof lampFxInsert89==='function'&&!lampFxInsert89._lfx2){
  var pi=lampFxInsert89;
  lampFxInsert89=function(host,mode){
   var r=pi.apply(this,arguments);
   try{(host&&host.querySelectorAll?host:document).querySelectorAll('.fx89-layer.fx89-core-flame').forEach(function(l){
    var sh=lampShell(l);if(sh&&sh.querySelector('[data-il-kind="lamp"]')&&!l.querySelector('.fx2-cwin'))l.insertAdjacentHTML('beforeend',coreWin())})}catch(e){}
   try{(host&&host.querySelectorAll?host:document).querySelectorAll('.fx89-layer.fx89-spiral').forEach(function(l){
    var sh=lampShell(l);if(sh&&sh.querySelector('[data-il-kind="lamp"]')&&l.parentElement!==sh)sh.appendChild(l)})}catch(e){}
   return r;
  };
  lampFxInsert89._lfx2=1;
 }
 if(typeof lampSvg73==='function'&&!lampSvg73._lfx2){
  var ps=lampSvg73,b=ps._base;
  lampSvg73=function(){return wise(ps.apply(this,arguments))};
  lampSvg73._lfx2=1;lampSvg73._v165=1;lampSvg73._base=b||ps;
 }
 if(typeof window!=='undefined')window.LampFx2={coreWin:coreWin,spiral:spiral,ember:ember,prev:prev,wise:wise,norma:NORMA,css:CSS};
}
install();
})();
/* v173: (1) Year Wheel card on Patterns Everywhere, opening year-wheel/ (standalone, offline, EN/ES).
   (2) F2: no dark square behind the friends. The round3 art painted a full #120E18 panel; make it
   invisible at load (opacity 0, same tag so v172 wise() still finds its Norma anchor), and fade the
   Bright core halo to 0 inside its shell so its square edge never shows. */
(function(){
'use strict';
var PANEL='<rect width="200" height="200" fill="#120E18"/>',CLEAR='<rect width="200" height="200" opacity="0" fill="#120E18"/>';
function strip(o,d){if(!o||d>5)return;for(var k in o){var v=o[k];if(typeof v==='string'){if(v.indexOf(PANEL)>=0)o[k]=v.split(PANEL).join(CLEAR)}else if(v&&typeof v==='object')strip(v,d+1)}}
try{if(window.IL165ART)strip(window.IL165ART.art,0);if(window.IL165ART&&window.IL165ART.starfig)strip(window.IL165ART.starfig,0)}catch(e){}
try{var st=document.createElement('style');st.id='v173css';st.textContent='.fx111-core-soft{-webkit-mask-image:radial-gradient(closest-side,#000 55%,transparent 100%);mask-image:radial-gradient(closest-side,#000 55%,transparent 100%)}#patterns .hubtile[data-pat="year"] svg{display:block;margin:0 auto 4px}';document.head.appendChild(st)}catch(e){}
function t(s){return typeof patT==='function'?patT(s):(typeof gT==='function'?gT(s):s)}
function lang(){try{return (typeof curLang==='function'&&curLang())||'en'}catch(e){return 'en'}}
var ART='<svg width="56" height="56" viewBox="-30 -30 60 60" aria-hidden="true"><g stroke="#72583f" stroke-width="1.2"><path d="M0 0L0-26A26 26 0 0 1 26 0Z" fill="#8cc98a"/><path d="M0 0L26 0A26 26 0 0 1 0 26Z" fill="#e6b454"/><path d="M0 0L0 26A26 26 0 0 1-26 0Z" fill="#e08a5a"/><path d="M0 0L-26 0A26 26 0 0 1 0-26Z" fill="#7aa7d8"/></g><circle r="10" fill="#1d1726" stroke="#72583f" stroke-width="1.2"/><circle r="4" fill="#ffe4a4"/></svg>';
function tile(){var g=document.querySelector('#patterns .pat-units');if(!g||g.querySelector('[data-pat="year"]'))return;
 var b=document.createElement('button');b.type='button';b.className='hubtile';b.setAttribute('data-pat','year');
 b.innerHTML=ART+t('Year Wheel')+'<small>'+t('Months, seasons and holidays')+'</small>';
 b.onclick=function(){location.href='year-wheel/'+(lang()==='es'?'?lang=es':'')};
 var m=g.querySelector('[data-pat="moon"]');if(m&&m.nextSibling)g.insertBefore(b,m.nextSibling);else g.appendChild(b)}
if(typeof renderPatterns106==='function'){var rp=renderPatterns106;renderPatterns106=function(){var r=rp.apply(this,arguments);try{tile()}catch(e){}return r}}
if(typeof patOpen106==='function'){var po=patOpen106;patOpen106=function(u){var r=po.apply(this,arguments);if(!u)try{tile()}catch(e){}return r}}
if(typeof RENDER==='object'){var pr=RENDER.patterns;RENDER.patterns=function(){if(typeof pr==='function')pr();try{tile()}catch(e){}}}
})();

/* v173 F1: "A quiet tone" always stops: on its toggle, on leaving the screen, when the page is hidden,
   and when Soft sounds is off. Every voice is tracked, so a second start can't leave one orphaned. */
(function(){
'use strict';
if(typeof lullStart163!=='function')return;
var V=[];
function kill(v){try{var t=v.c.currentTime;v.g.gain.cancelScheduledValues(t);v.g.gain.setValueAtTime(v.g.gain.value,t);v.g.gain.linearRampToValueAtTime(0,t+.12);v.o.stop(t+.15);v.o2.stop(t+.15);setTimeout(function(){try{v.lp.disconnect();v.g.disconnect()}catch(e){}},400)}catch(e){}}
function stopAll(){var l=V.splice(0);l.forEach(kill);try{lull163=null}catch(e){}}
var st=lullStart163;
lullStart163=function(){stopAll();st.apply(this,arguments);try{if(lull163)V.push(lull163)}catch(e){}};
lullStop163=function(){stopAll()};
function off(){if(!V.length)return;stopAll();try{if(PAT106&&PAT106.ex)PAT106.ex.lull=false}catch(e){}
 document.querySelectorAll('[data-lull163].on').forEach(function(b){b.classList.remove('on');b.setAttribute('aria-pressed','false')})}
document.addEventListener('visibilitychange',function(){if(document.hidden)off()});
window.addEventListener('pagehide',off);
setInterval(function(){if(!V.length)return;
 var b=document.querySelector('[data-lull163].on');
 var soft=true;try{soft=sfxOn163()}catch(e){}
 if(!b||!b.offsetParent||!soft)off()},500);
})();
/* v174: QA's v173 fixes. The quiet tone now also stops when the page is hidden or closed, and when its
   button is gone from view (it calls v163's own IL163.lullStop, and clears ex.lull so nothing restarts it). */
(function(){
'use strict';
function stop(){try{if(window.IL163&&IL163.lullStop)IL163.lullStop()}catch(e){}}
function off(){var on=false;try{on=!!(typeof PAT106!=="undefined"&&PAT106.ex&&PAT106.ex.lull)}catch(e){}
 if(!on)return;stop();try{PAT106.ex.lull=false}catch(e){}
 document.querySelectorAll('[data-lull163].on').forEach(function(b){b.classList.remove('on');b.setAttribute('aria-pressed','false')})}
document.addEventListener('visibilitychange',function(){if(document.hidden)off()});
window.addEventListener('pagehide',off);
setInterval(function(){var on=false;try{on=!!(typeof PAT106!=="undefined"&&PAT106.ex&&PAT106.ex.lull)}catch(e){}
 if(!on)return;var b=document.querySelector('[data-lull163].on');if(!b||!b.offsetParent)off()},500);
})();
