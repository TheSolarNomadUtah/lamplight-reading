// v77: lamp credits keep going through the starlit stage. v75 still stopped at stage 3.
function lampCap77(){return Math.max(1,(LAMP73.need||[]).length)}
function lampMoment73(reason){if(!LAMP_KINDS75.includes(reason))return false;const s=lampLoad73();if(s.stage>=lampCap77())return false;
 const session=lampSession74(),day=lampDay74();if(s.session&&s.session===session)return false;if(s.day===day&&s.dayCredits>=2)return false;
 if(reason==='retry'){const c=P68.g;if(c?.lampRetry73)return false;if(c)c.lampRetry73=true}
 s.moments++;s.kinds=s.kinds||[];s.kinds.push(reason);s.session=session;s.dayCredits=s.day===day?s.dayCredits+1:1;s.day=day;
 const next=lampStageFor73(s.moments);if(next>s.stage){const why=lampPickReason74(s.kinds,reason);for(let st=s.stage+1;st<=next;st++)s.pending.push({stage:st,reason:why,from:st-1});s.stage=next;s.kinds=[]}lampPut73(s);return true}
