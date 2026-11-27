/* v144: pay down the Calm Meter leftovers so every kid tap is at least
   44×44 CSS px and the leftover bells/UI clips meet the loudness caps.
   show() is not wrapped. The Dragon is unchanged. */
(function(){
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
window.IL144={version:144};
})();
