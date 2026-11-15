// v161: merge tiny leftover patches that are comments, empty markers, or
// order-safe CSS / turtle-gain. Folded from files that stay on disk:
//   v98.js, v117.js (comments only)
//   v134.js, v136.js (empty; patches already live in v132/v112 and v135)
//   v142.js, v146.js, v158.js (version markers; pictures already in v101-art.js;
//     Look Closer already unloaded)
//   v96.js (Kids phone padding CSS)
//   v144.js (44px Calm leftovers CSS + IL144)
//   v107.js (56px Grow button CSS + live turtle gain 1.49; helpers already in v106)
// Does not wrap show(). Paint wraps and the quilt are not edited.
(function(root){
 'use strict';
 root.IL142={version:142};
 root.IL144={version:144};
 root.IL146={version:146};
 root.IL158={version:158};
 root.IL161={version:161};

 document.head.insertAdjacentHTML('beforeend',`<style id="v96css">
@media (max-width:640px){
  body.v20float #kids,body.bedtime #kids{padding-bottom:calc(56px + 44px + 20px)}
  body.v20float #kids [data-fx89-picker] > p.soft,
  body.bedtime #kids [data-fx89-picker] > p.soft,
  body.v20float #kids [data-flame81-picker] > p.soft,
  body.bedtime #kids [data-flame81-picker] > p.soft{padding-inline-start:60px}
}
</style>`);

 document.head.insertAdjacentHTML('beforeend',`<style id="calm144">
button, [role="button"], .hubtile, [data-tap], summary, .pchip, .pc, .filt button, nav button, .pbar button, .pbar101 button, .pstamp101 button, .lkeys button{
  min-width:44px;min-height:44px;box-sizing:border-box
}
select, input, textarea{min-height:44px;box-sizing:border-box}
input[type=range], .big input[type=range]{height:44px;min-height:44px}
#hub a[href]{
  display:inline-flex;align-items:center;min-height:44px;min-width:44px;padding:8px 4px
}
</style>`);

 const s=document.createElement('style');
 s.id='v107css';
 s.textContent='#patterns .pat-row button{min-height:56px;min-width:56px}';
 document.head.appendChild(s);
 if(typeof SCGAIN102==='object')SCGAIN102.turtle=1.49;
})(typeof window!=='undefined'?window:this);
