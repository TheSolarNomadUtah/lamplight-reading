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
