// v23: Paint hides the floating Home button via a class set inside show(); "“X” as a song" title translated.
{const sh=show;show=function(id){document.body.classList.toggle('inpaint',id==='paint');return sh.apply(this,arguments)}}
document.head.insertAdjacentHTML('beforeend','<style>body.inpaint #fhome{display:none!important}</style>');
if(typeof LANG!=='undefined'&&LANG!=='en'){const t0=trText;trText=function(n){t0(n);const v=n.nodeValue;const m=v&&v.match(/^(\s*\S*\s*)“(.+)” as a song(\s*)$/);if(m)n.nodeValue=m[1]+(LANG==='ar'?'«'+(DICT[m[2]]||m[2])+'» كأغنية':'“'+(DICT[m[2]]||m[2])+'” como canción')+m[3]}}
