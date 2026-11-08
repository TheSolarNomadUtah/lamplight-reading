// v67 QA: real unlocks, not every game star; daily reading keeps its single glow chime.
function rewardCheck67(quiet=false){try{const st=lightStats(),lv=lightLevel(st),seen=+(LS.get('lamp_lightseen')||0);if(lv<=seen)return false;LS.set('lamp_lightseen',String(lv));if(quiet)rewardOpen66(LAYERS.filter(l=>st.n>=l[0]).pop());else lightCelebrate(st);return true}catch(e){return false}}
lightCheck=rewardCheck67;
document.head.insertAdjacentHTML('beforeend',`<style>
/* Phone preview wraps tracing repetitions; paper retains all three copies. */
.ppage{min-width:0;overflow-wrap:anywhere}.ppage .tline{display:flex;flex-wrap:wrap;gap:12px 24px;font-size:clamp(1.3rem,6vw,2.4rem)}.ppage .tw{margin:0;max-width:100%;overflow-wrap:anywhere}.writeLine67{height:2em;border-bottom:1px solid #999}
/* A label is text, not the large picture span used by older hub tiles. */
.echo65 .ehub65 .hubtile span{font-size:1rem;line-height:1.4;word-break:normal;overflow-wrap:normal;hyphens:none}
</style>`);
