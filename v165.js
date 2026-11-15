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
