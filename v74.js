// v74: Challenge only on scored/timed rounds; gentler Lamp growth pacing and reasons.
// No new audio files, voices, or requests. Existing lamp stages are never lowered.
const LAMP74={now:null,games:['rx','mel','duet','lad','syl','scr','wk','sb','rm','lm','pp','op','mm','odd','order','drum63']};
function lampNow74(){return LAMP74.now?new Date(LAMP74.now.getTime?LAMP74.now:LAMP74.now):new Date()}
function lampDay74(d){return dkey(d||lampNow74())}
function lampSession74(){return P68.g?.id||[curPid(),P71?.game||GM.v||AR.v||'',L61.s?.lv||L63.s?.lv||SP?.lv||DP63.s?.lv||''].join('|')}
function lampViewStage74(s){s=s||lampLoad73();if(s.pending?.length)return Math.max(1,Math.min(s.shown||s.pending[0].from||s.stage-1,s.stage));return Math.max(1,Math.min(3,s.shown||s.stage||1))}
function lampPickReason74(kinds,trigger){const list=(kinds||[]).filter(k=>['rhyme','memory','retry'].includes(k));if(!list.length)return trigger;const count={};for(const k of list)count[k]=(count[k]||0)+1;let best=trigger,n=count[trigger]||0;for(const k of ['rhyme','memory','retry'])if((count[k]||0)>n){best=k;n=count[k]}return best}
function lampDefault73(){return {schema:1,name:'',moments:0,stage:1,shown:1,pending:[],kinds:[],day:'',dayCredits:0,session:'',lastSeen:0,hiddenAt:0}}
function lampLoad73(pid){const raw=safeJSON(RAW.get('lamp_companion@'+(pid||curPid())),null),s=Object.assign(lampDefault73(),raw&&typeof raw==='object'?raw:{});
 s.moments=Math.max(0,Number(s.moments)||0);s.stage=Math.max(1,Math.min(3,Number(s.stage)||1));s.stage=Math.max(s.stage,lampStageFor73(s.moments));
 s.pending=Array.isArray(s.pending)?s.pending.filter(p=>p&&p.stage>=2&&p.stage<=3&&['rhyme','memory','retry'].includes(p.reason)):[];
 s.kinds=Array.isArray(s.kinds)?s.kinds.filter(k=>['rhyme','memory','retry'].includes(k)):[];
 s.day=typeof s.day==='string'?s.day:'';s.dayCredits=Math.max(0,Number(s.dayCredits)||0);s.session=typeof s.session==='string'?s.session:'';
 if(!raw||!Number.isInteger(raw.shown)||raw.shown<1||raw.shown>3)s.shown=s.pending.length?Math.max(1,Number(s.pending[0].from)||s.stage-1):s.stage;
 s.shown=Math.max(1,Math.min(s.shown,s.stage));s.name=typeof s.name==='string'?s.name.trim().slice(0,20):'';return s}
function lampPut73(s,pid){const id=pid||curPid();if(!getProfiles().list.some(p=>p.id===id))return;RAW.set('lamp_companion@'+id,JSON.stringify({schema:1,name:s.name||'',moments:s.moments,stage:s.stage,shown:s.shown,pending:s.pending,kinds:s.kinds||[],day:s.day||'',dayCredits:s.dayCredits||0,session:s.session||'',lastSeen:s.lastSeen||0,hiddenAt:s.hiddenAt||0}))}
function lampMoment73(reason){if(!['rhyme','memory','retry'].includes(reason))return false;const s=lampLoad73();if(s.stage>=3)return false;
 const session=lampSession74(),day=lampDay74();if(s.session&&s.session===session)return false;if(s.day===day&&s.dayCredits>=2)return false;
 if(reason==='retry'){const c=P68.g;if(c?.lampRetry73)return false;if(c)c.lampRetry73=true}
 s.moments++;s.kinds=s.kinds||[];s.kinds.push(reason);s.session=session;s.dayCredits=s.day===day?s.dayCredits+1:1;s.day=day;
 const next=lampStageFor73(s.moments);if(next>s.stage){const why=lampPickReason74(s.kinds,reason);for(let st=s.stage+1;st<=next;st++)s.pending.push({stage:st,reason:why,from:st-1});s.stage=next;s.kinds=[]}lampPut73(s);return true}
function lampFigure73(s,extra=''){s=s||lampLoad73();const view=lampViewStage74(s);return `<figure class="lamp73-figure" data-lamp73="${view}" ${extra}><div class="lamp73-shell${LAMP73.away?' resting':''}" data-breath73><div class="lamp73-stage">${lampSvg73(view)}</div></div><figcaption class="kline">${esc(lampName73(s))}</figcaption></figure>`}
{const present=lampPresent73;lampPresent73=function(item){const r=present.apply(this,arguments);const d=document.querySelector('dialog.lamp73-dialog');if(!d||!item)return r;const pid=curPid();const on=()=>{const s=lampLoad73(pid);s.shown=Math.max(s.shown||1,item.stage);lampPut73(s,pid)};d.addEventListener('close',on,true);return r}}

function pScoredRound74(section='games'){if(!CONTENT.includes(LANG))return false;const key=section==='arcade'?AR.v:GM.v;if(!key||!LAMP74.games.includes(key==='comp'?'':key))return false;if(key==='drum63'&&DP63.s?.mode!=='copy')return false;return true}
function pTrimSwitch74(){for(const id of ['hub','paint','echo','solo','session','print','look','kids','adults','log','letters','lib','starsongs','cymatica','cymatics','lab','music'])$(id)?.querySelectorAll('[data-mode71]').forEach(el=>el.remove());
 for(const section of ['games','arcade']){const root=$(section);if(!root)continue;if(root.classList.contains('hidden')||!pScoredRound74(section))root.querySelectorAll('[data-mode71]').forEach(el=>el.remove())}}
{const decorate=pDecorate71;pDecorate71=function(section='games'){const r=decorate.apply(this,arguments);pTrimSwitch74();return r}}
{const sh=show;show=function(id){const r=sh.apply(this,arguments);pTrimSwitch74();return r}}
