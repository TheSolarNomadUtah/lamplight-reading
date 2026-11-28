// v159: defer Glass and Constellation mode scripts. sils_v2.js and Inner light
// still load at boot. A saved lamp_il_look of glass or constellation is injected
// by the boot snippet in index.html so first paint is not Inner light. Opening
// the looks picker, or choosing those looks, loads the kits on demand. The
// files stay in the service-worker precache and offline manifests. show() is
// not wrapped. The quilt is not edited.
(function(root){
 'use strict';
 var pending={};
 function srcOf(look){
  if(look==='glass')return 'looks/mode_glass_v21.min.js';
  if(look==='constellation')return 'looks/mode_constellation_v2.min.js';
  return '';
 }
 function has(look){
  if(look==='glass')return typeof ilGlassV21==='function';
  if(look==='constellation')return typeof ilConstellationV2==='function';
  return true;
 }
 function ensure(look){
  look=(look==='glass'||look==='constellation')?look:'inner';
  if(look==='inner'||has(look))return Promise.resolve();
  if(pending[look])return pending[look];
  pending[look]=new Promise(function(res,rej){
   var s=document.createElement('script');
   s.src=srcOf(look);
   s.onload=function(){res()};
   s.onerror=function(){pending[look]=null;rej(new Error('look-mode '+look))};
   (document.head||document.documentElement).appendChild(s);
  });
  return pending[look];
 }
 function ensureAll(){return Promise.all([ensure('glass'),ensure('constellation')])}
 function visibleTile(el){
  if(!el||!el.closest)return false;
  var sec=el.closest('section');
  if(sec&&sec.classList.contains('hidden'))return false;
  if(el.closest('[hidden]'))return false;
  return true;
 }
 function hookFill(){
  if(typeof IL157!=='object'||typeof IL157.fillLookTiles!=='function'||IL157.fillLookTiles._v159)return;
  var prev=IL157.fillLookTiles;
  function next(root){
   var host=root&&root.querySelectorAll?root:document;
   var tiles=[],list=host.querySelectorAll('[data-il-lazy-look]'),i,looks={},jobs=[];
   for(i=0;i<list.length;i++) if(visibleTile(list[i])) tiles.push(list[i]);
   if(!tiles.length)return;
   for(i=0;i<tiles.length;i++) looks[tiles[i].getAttribute('data-il-lazy-look')]=1;
   if(looks.glass)jobs.push(ensure('glass'));
   if(looks.constellation)jobs.push(ensure('constellation'));
   var self=this,args=arguments;
   Promise.all(jobs).then(function(){prev.apply(self,args)}).catch(function(){try{prev.apply(self,args)}catch(e){}});
  }
  next._v159=1;next._base=prev._base||prev;
  IL157.fillLookTiles=next;
 }
 hookFill();
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hookFill);
 else hookFill();
 root.IL159={version:159,ensure:ensure,ensureAll:ensureAll,has:has};
})(typeof window!=='undefined'?window:this);
