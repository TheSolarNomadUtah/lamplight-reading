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
