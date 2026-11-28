/* v139: Hotfix for v137 Sprite fallbacks.
   Olive-sprite users land on Sprites as Puff (progress kept); Dove users
   land on the Lamp (Lamp stage kept). Dew/Ember survive hide and reload.
   Chooser taps are at least 56 px tall. Does not wrap show(). */
(function(){
'use strict';
const GONE139=new Set(['olivesprite_m','olivesprite_f','olivedove_m','olivedove_f']);
let putting139=false;

function css139(){
  if(document.getElementById('v139css'))return;
  const st=document.createElement('style');
  st.id='v139css';
  st.textContent='.spritePick137 button,.spritePick137 button.p{min-height:56px;min-width:56px;padding:.45rem .8rem}'
  document.head.appendChild(st);
}

function rawFriends139(pid){
  const id=pid||(typeof curPid==='function'?curPid():'');
  try{
    if(typeof RAW==='undefined'||typeof safeJSON!=='function')return {id,raw:null};
    return {id, raw:safeJSON(RAW.get('lamp_friends101@'+id),null)};
  }catch(e){return {id,raw:null}}
}

const prevLoad=typeof friendsLoad101==='function'?friendsLoad101:null;
if(prevLoad){
  friendsLoad101=function(pid){
    const {id,raw}=rawFriends139(pid);
    const f=prevLoad(pid)||{active:'lamp',offered:false};
    if(raw&&GONE139.has(raw.active)){
      f.active=raw.active;
      const mig=(window.IL137&&typeof window.IL137.migrate==='function')?window.IL137.migrate:(typeof migrate137==='function'?migrate137:null);
      if(mig) mig(f);
      if(!putting139&&raw.active!==f.active){
        try{putting139=true;if(typeof friendsPut101==='function')friendsPut101(f,id)}catch(e){}
        finally{putting139=false}
      }
    }
    return f;
  };
}

const prevPut=typeof friendsPut101==='function'?friendsPut101:null;
if(prevPut){
  friendsPut101=function(f,pid){
    try{
      if(f&&f.sprites){
        const {raw}=rawFriends139(pid);
        const prev=(raw&&raw.sprites)||{};
        f.sprites.chosen=f.sprites.chosen||prev.chosen||'puff';
        f.sprites.mode=f.sprites.mode||prev.mode||'visit';
      }
    }catch(e){}
    return prevPut(f,pid);
  };
}

const prevLampLoad=typeof lampLoad73==='function'?lampLoad73:null;
if(prevLampLoad){
  lampLoad73=function(pid){
    const s=prevLampLoad(pid);
    try{
      const id=pid||(typeof curPid==='function'?curPid():'');
      const kind=(s&&s._kind101)||(typeof friendsLoad101==='function'&&friendsLoad101(id).active)||'lamp';
      if(kind==='sprites'&&s){
        const rec=(typeof friendsLoad101==='function'&&friendsLoad101(id).sprites)||{};
        s.chosen=s.chosen||rec.chosen||'puff';
        s.mode=s.mode||rec.mode||'visit';
      }
    }catch(e){}
    return s;
  };
}

const prevLampPut=typeof lampPut73==='function'?lampPut73:null;
if(prevLampPut){
  lampPut73=function(s,pid){
    const id=pid||(typeof curPid==='function'?curPid():'');
    let keep=null;
    try{
      const kind=(s&&s._kind101)||(typeof friendsLoad101==='function'&&friendsLoad101(id).active)||'lamp';
      if(kind==='sprites'){
        const prev=(typeof friendsLoad101==='function'&&friendsLoad101(id).sprites)||{};
        keep={chosen:(s&&s.chosen)||prev.chosen||'puff', mode:(s&&s.mode)||prev.mode||'visit'};
        if(s){s.chosen=keep.chosen;s.mode=keep.mode}
      }
    }catch(e){}
    const r=prevLampPut(s,pid);
    if(keep&&!putting139){
      try{
        putting139=true;
        const f=friendsLoad101(id);
        f.sprites=f.sprites||{};
        f.sprites.chosen=keep.chosen;
        f.sprites.mode=keep.mode;
        if(typeof friendsPut101==='function')friendsPut101(f,id);
      }catch(e){}
      finally{putting139=false}
    }
    return r;
  };
}

css139();
window.IL139={gone:GONE139,css:css139};
})();
