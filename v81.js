// v81: flame colors that unlock with the Lamp, and a night sky of credited stars.
const FLAME81=[
 {id:'amber',stage:1,shape:'sparks',name:'Hearth Amber',
  mid:'#dca64b',core:'#efba64',tip:'#fbdcad',deep:'#855a00',halo:'#dbb06b',
  fact:'Real sodium flames glow a warm amber like this.'},
 {id:'coral',stage:2,shape:'motes',name:'Ember Coral',
  mid:'#f69184',core:'#ffa598',tip:'#ffd0c8',deep:'#98473f',halo:'#f19f94',
  fact:'Real strontium flames glow a deep red like this.'},
 {id:'teal',stage:3,shape:'rings',name:'Copper Teal',
  mid:'#1fc9ce',core:'#4cdce0',tip:'#aaf0f2',deep:'#00757a',halo:'#5ecbce',
  fact:'Real copper flames glow a blue-green like this.'},
 {id:'lilac',stage:4,shape:'leaf',name:'Lilac Glow',
  mid:'#cc99eb',core:'#deadfd',tip:'#f1d5ff',deep:'#784f90',halo:'#cda5e6',
  fact:'Real potassium flames glow a soft lilac like this. That color is red light and violet light together.'},
 {id:'moss',stage:5,shape:'firefly',name:'Moss Spark',
  mid:'#82c57a',core:'#96d88f',tip:'#c8eec3',deep:'#3b7335',halo:'#93c88c',
  fact:'Real boron flames glow a green like this.'},
 {id:'starfire',stage:6,shape:'glints',name:'Starfire',
  mid:'#a5a7fe',core:'#b8baff',tip:'#bfe6ff',deep:'#5a5aa0',halo:'#adb0f6',
  fact:'This last glow is a soft blue-violet, like starlight.'}
];
const FLAME81_INK='#2f2a24';
const FLAME81_MAXSTARS=20;
let FLAME_CTX81=null,lamp81gid=0;

function lampFlameById81(id){return FLAME81.find(f=>f.id===id)||FLAME81[0]}
function lampFlameMax81(s){s=s||lampLoad73();return Math.max(1,Math.min(6,Number(s.stage)||1))}
function lampFlameLoad81(pid){
 const id=pid||curPid(),raw=safeJSON(RAW.get('lamp_flame@'+id),null),s=lampLoad73(id),max=lampFlameMax81(s);
 if(raw&&typeof raw==='object'){
  const f=lampFlameById81(raw.id);
  if(f&&f.stage<=max&&raw.picked)return {id:f.id,picked:true};
 }
 return {id:FLAME81[max-1].id,picked:false}
}
function lampFlamePal81(pid,s){
 const who=pid||FLAME_CTX81,st=s||lampLoad73(who),rec=lampFlameLoad81(who),max=lampFlameMax81(st),f=lampFlameById81(rec.id);
 return (f.stage<=max)?f:FLAME81[max-1]
}
function lampFlameSet81(id,pid){
 const who=pid||curPid(),s=lampLoad73(who),max=lampFlameMax81(s),f=lampFlameById81(id);
 if(!f||f.stage>max)return;
 if(!getProfiles().list.some(p=>p.id===who))return;
 RAW.set('lamp_flame@'+who,JSON.stringify({id:f.id,picked:true}));
 lampMountAll73();
 document.querySelectorAll('[data-flame81-picker]').forEach(root=>lampPickerSync81(root,who));
}
function lampCssVars81(pal){return '--f81-mid:'+pal.mid+';--f81-core:'+pal.core+';--f81-tip:'+pal.tip+';--f81-deep:'+pal.deep+';--f81-halo:'+pal.halo+';--f81-ink:'+FLAME81_INK}
function lampSetVars81(el,pal){
 if(!el||!pal)return;el.dataset.flame81=pal.id;
 ['--f81-mid','--f81-core','--f81-tip','--f81-deep','--f81-halo','--f81-ink'].forEach(k=>el.style.removeProperty(k));
 el.style.setProperty('--f81-mid',pal.mid);el.style.setProperty('--f81-core',pal.core);
 el.style.setProperty('--f81-tip',pal.tip);el.style.setProperty('--f81-deep',pal.deep);
 el.style.setProperty('--f81-halo',pal.halo);el.style.setProperty('--f81-ink',FLAME81_INK);
}

function lampArtInner73(stage){
 const pal=lampFlamePal81(FLAME_CTX81),ink='#463f52',line='#72583f',clay='#d9b27a',bowl='#e8c894';
 const mid=pal.mid,core=pal.core,tip=pal.tip,deep=pal.deep,s=Math.max(1,Math.min(6,stage||1)),n=++lamp81gid;
 const flameFill=s===6?('url(#lf81g'+n+')'):core;
 const defs=s===6?`<defs><linearGradient id="lf81g${n}" x1="0" y1="1" x2="0.4" y2="0"><stop offset="0" stop-color="${mid}"/><stop offset=".45" stop-color="${core}"/><stop offset="1" stop-color="${tip}"/></linearGradient></defs>`:'';
 const spark=`<ellipse cx="50" cy="86" rx="24" ry="5" fill="${mid}" opacity=".28"/><path d="M28 68 Q32 58 50 58 Q68 58 72 68 Q50 78 28 68Z" fill="${bowl}" stroke="${line}" stroke-width="2.2"/><path d="M34 66 Q50 72 66 66" fill="none" stroke="${line}" stroke-width="1.5"/><rect x="48" y="50" width="4" height="10" rx="1" fill="${ink}"/><g fill="${core}" stroke="${deep}" stroke-width="1.15"><path d="M50 16 L53.2 32 L50 29 L46.8 32Z"/><path d="M50 16 L62 24 L50 22 L38 24Z"/><path d="M36 36 L47 30 L45 33 L48 35Z"/><path d="M64 36 L53 30 L55 33 L52 35Z"/></g><circle cx="50" cy="16" r="5" fill="${tip}" stroke="${mid}" stroke-width="1.4"/><circle cx="50" cy="16" r="2.2" fill="#fff"/>`;
 const ember=`<ellipse cx="50" cy="88" rx="26" ry="5" fill="${mid}" opacity=".3"/><path d="M26 70 Q30 54 50 52 Q70 54 74 70 Q50 84 26 70Z" fill="${clay}" stroke="${line}" stroke-width="2.2"/><path d="M34 66 Q50 74 66 66" fill="none" stroke="${line}" stroke-width="1.4"/><ellipse cx="50" cy="58" rx="16" ry="12" fill="${deep}" stroke="${deep}" stroke-width="1.4"/><ellipse cx="50" cy="56" rx="9" ry="7" fill="${core}"/><ellipse cx="47" cy="54" rx="3.2" ry="2.2" fill="${tip}" opacity=".9"/>`;
 const candle=`<ellipse cx="50" cy="86" rx="24" ry="5" fill="${mid}" opacity=".3"/><path d="M36 20 Q50 8 64 20" fill="none" stroke="${line}" stroke-width="3.2" stroke-linecap="round"/><path d="M30 26 L70 26 76 62 Q50 76 24 62Z" fill="${clay}" stroke="${line}" stroke-width="2.4"/><path d="M33 26 H67" stroke="${line}" stroke-width="3.5" stroke-linecap="round"/><path d="M48 28 L50 18 52 28" fill="${ink}" stroke="${ink}" stroke-width="1"/><path d="M46 18 Q50 6 54 18 Q50 22 46 18Z" fill="${core}" stroke="${deep}" stroke-width="1.2"/><path d="M49 16 Q50 10 51 16" fill="none" stroke="${tip}" stroke-width="1.2"/>`;
 const lantern=`<ellipse cx="50" cy="88" rx="26" ry="5" fill="${mid}" opacity=".35"/><path d="M50 8 Q62 8 62 16 Q62 20 50 22 Q38 20 38 16 Q38 8 50 8Z" fill="${clay}" stroke="${line}" stroke-width="2"/><circle cx="50" cy="12" r="4" fill="none" stroke="${line}" stroke-width="2.4"/><rect x="26" y="22" width="48" height="58" rx="6" fill="${flameFill}" stroke="${line}" stroke-width="2.6"/><path d="M26 36 H74 M26 54 H74 M50 22 V80" stroke="${line}" stroke-width="2"/><rect x="30" y="26" width="16" height="8" rx="1" fill="${core}" opacity=".9"/><rect x="54" y="26" width="16" height="8" rx="1" fill="${core}" opacity=".9"/><rect x="30" y="40" width="16" height="10" rx="1" fill="${tip}"/><rect x="54" y="40" width="16" height="10" rx="1" fill="${tip}"/><rect x="30" y="58" width="16" height="12" rx="1" fill="${core}"/><rect x="54" y="58" width="16" height="12" rx="1" fill="${core}"/><path d="M46 48 Q50 36 54 48 Q50 54 46 48Z" fill="${mid}" stroke="${deep}" stroke-width="1"/><path d="M22 80 H78" stroke="${line}" stroke-width="3.5" stroke-linecap="round"/>`;
 const flies=`<g class="lamp76-flies">${[[18,42],[82,36],[16,70],[84,68],[50,90]].map(([x,y],i)=>`<g class="lamp76-fly" style="--fly:${i}"><circle cx="${x}" cy="${y}" r="3.1" fill="${core}" stroke="${deep}" stroke-width=".8"/><circle cx="${x-1}" cy="${y-1}" r="1.1" fill="${tip}"/></g>`).join('')}</g>`;
 const stars=`<g class="lamp76-svgstars" fill="${mid}">${[[14,18],[86,16],[10,50],[90,48],[20,84],[80,86],[50,4]].map(([x,y],i)=>`<path d="M${x} ${y-4.5} L${x+1.1} ${y-1.1} L${x+4.5} ${y} L${x+1.1} ${y+1.1} L${x} ${y+4.5} L${x-1.1} ${y+1.1} L${x-4.5} ${y} L${x-1.1} ${y-1.1}Z" opacity="${.55+i%3*.15}"/>`).join('')}</g>`;
 if(s===1)return spark;if(s===2)return ember;if(s===3)return candle;if(s===4)return lantern;if(s===5)return lantern+flies;
 return defs+lantern+flies+stars
}
function lampSvg73(stage,cls,hero){
 const s=Math.max(1,Math.min(6,stage||1)),pal=lampFlamePal81(FLAME_CTX81);
 const plate=hero?`<circle class="lamp73-plate" cx="50" cy="50" r="48" fill="#fff2d8" opacity=".12" stroke="none"/>`:`<circle class="lamp73-plate" cx="50" cy="50" r="47" fill="#fff2d8" stroke="#72583f" stroke-width="2"/>`;
 return `<svg class="lamp73-svg ${cls||''}" data-stage73="${s}" data-flame81="${pal.id}" style="${lampCssVars81(pal)}" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">${plate}<g class="lamp73-ink">${lampArtInner73(s)}</g></svg>`
}
function lampDots76(kind,n){
 const shape=lampFlamePal81(FLAME_CTX81).shape;let h='';
 for(let i=0;i<n;i++)h+=`<span class="lamp76-${kind}" data-shape="${shape}" style="--i:${i}" aria-hidden="true"></span>`;
 return `<div class="lamp76-${kind}s" aria-hidden="true">${h}</div>`
}
function lampHero76(s){
 const view=lampViewStage74(s),shape=lampFlamePal81(FLAME_CTX81,s).shape;
 const orbit=`<div class="lamp76-orbit" aria-hidden="true"><span data-shape="${shape}"></span><span data-shape="${shape}"></span><span data-shape="${shape}"></span></div>`;
 return `<div class="lamp76-glow" aria-hidden="true"></div>${view>=6?lampDots76('star',10):''}${lampFigure73(s,'data-hero76="1"')}${view>=4?lampDots76('mote',view>=5?7:5):''}${view>=5?orbit:''}`
}

const _lampMount73=lampMount73;
lampMount73=function(host,mode){
 const pid=mode==='home'?curPid():(FLAME_CTX81||curPid());
 const prev=FLAME_CTX81;FLAME_CTX81=pid;
 try{
  _lampMount73.apply(this,arguments);
  if(mode==='home'&&host){lampSetVars81(host,lampFlamePal81(pid));lampSkyMount81(host,pid)}
 }finally{FLAME_CTX81=prev}
};
const _lampMountAll73=lampMountAll73;
lampMountAll73=function(){
 const prev=FLAME_CTX81;FLAME_CTX81=curPid();
 try{_lampMountAll73.apply(this,arguments)}finally{FLAME_CTX81=prev}
 const form=$('pform'),ppid=form&&form.dataset.pid73;
 if(!form||!ppid)return;
 const slot=form.querySelector('[data-lamp73-slot="profile"]');if(!slot)return;
 const hold=FLAME_CTX81;FLAME_CTX81=ppid;
 try{
  const st=lampLoad73(ppid),stage=slot.querySelector('.lamp73-stage');
  if(stage)stage.innerHTML=lampSvg73(lampViewStage74(st));
  if(!slot.querySelector('[data-flame81-picker]')){
   slot.insertAdjacentHTML('beforeend',lampPickerHTML81(ppid));
   lampPickerBind81(slot,ppid);
  }
 }finally{FLAME_CTX81=hold}
};

function lampPickerHTML81(pid){
 const s=lampLoad73(pid),max=lampFlameMax81(s),rec=lampFlameLoad81(pid),ring=max>=6,reduce=typeof lampReduced73==='function'&&lampReduced73();
 const intro=`<p class="soft">${esc(gT('People learned to keep fire long ago. It kept families warm and lit their stories.'))}</p><p class="soft">${esc(gT("Colors are made by light. Each element's fire plays its own chord of light."))}</p>`;
 const buttons=FLAME81.map((f,i)=>{
  const open=f.stage<=max,on=open&&f.id===rec.id;
  const label=open?gT(f.name):gT(f.name)+'. '+gT('Grows with your Lamp');
  const sx=((i%3)-1)*86, sy=(Math.floor(i/3)-0.5)*100;
  return `<button type="button" class="lamp81-swatch${on?' on':''}${open?'':' locked'}" data-flame-id="${f.id}" style="--a:${i*60}deg;--sx:${sx}px;--sy:${sy}px;${lampCssVars81(f)}" ${open?'':'disabled'} aria-pressed="${on?'true':'false'}" aria-label="${esc(label)}" role="listitem"><span class="lamp81-bloom" data-shape="${f.shape}"></span><span class="lamp81-name">${esc(gT(f.name))}</span>${open?'':`<span class="lamp81-lock">${esc(gT('Grows with your Lamp'))}</span>`}</button>`
 }).join('');
 const fact=lampFlameById81(rec.id).fact;
 return `<div class="lamp81-picker${ring?' ring':''}${ring&&!reduce?' curl':''}" data-flame81-picker data-pid="${esc(pid||'')}" data-sel="${rec.id}"><h3>${esc(gT('Lamp glow'))}</h3>${intro}<div class="lamp81-tray" role="list"><span class="lamp81-center" aria-hidden="true"></span>${buttons}</div><p class="lamp81-fact" data-flame81-fact>${esc(gT(fact))}</p></div>`
}
function lampPickerBind81(root,pid){
 const box=root.querySelector('[data-flame81-picker]');if(!box)return;
 box.querySelectorAll('.lamp81-swatch:not(.locked)').forEach(btn=>{
  btn.addEventListener('click',()=>lampFlameSet81(btn.dataset.flameId,pid||box.dataset.pid));
 });
}
function lampPickerSync81(box,pid){
 const rec=lampFlameLoad81(pid||box.dataset.pid),s=lampLoad73(pid||box.dataset.pid),max=lampFlameMax81(s);
 box.dataset.sel=rec.id;
 box.querySelectorAll('.lamp81-swatch').forEach(btn=>{
  const f=lampFlameById81(btn.dataset.flameId),open=f.stage<=max,on=open&&f.id===rec.id;
  btn.classList.toggle('on',on);btn.setAttribute('aria-pressed',on?'true':'false');
 });
 const fact=box.querySelector('[data-flame81-fact]');
 if(fact)fact.textContent=gT(lampFlameById81(rec.id).fact);
}

pWrap68('renderLook',null,()=>{
 const root=$('look');if(!root||root.querySelector('[data-flame81-picker]'))return;
 const pid=curPid();if(!pid)return;
 const card=document.createElement('div');card.className='card';card.dataset.flame81Card='1';
 card.innerHTML=lampPickerHTML81(pid);
 const sfx=root.querySelector('[data-sfx73],[data-reveal76]');
 if(sfx)root.insertBefore(card,sfx);else root.append(card);
 lampPickerBind81(card,pid);
});
RENDER.look=renderLook;

const _present81=lampPresent73;
lampPresent73=function(item){
 const r=_present81.apply(this,arguments);
 const d=document.querySelector('dialog.lamp73-dialog');
 if(!d||!item)return r;
 const pal=FLAME81[Math.max(0,Math.min(5,(item.stage||1)-1))];
 if(pal){
  lampSetVars81(d,pal);
  d.querySelectorAll('.lamp76-spark').forEach(el=>el.dataset.shape=pal.shape);
  const line=d.querySelector('#lamp73-line');
  if(line&&!d.querySelector('.lamp81-unlock')) line.insertAdjacentHTML('afterend',`<p class="lamp81-unlock">${esc(gT('A new glow is ready: {name}.',{name:gT(pal.name)}))}</p>`);
 }
 return r
};

function lampSkyKey81(pid){return 'lamp_sky@'+(pid||curPid())}
function lampSkyLoad81(pid){
 const raw=safeJSON(RAW.get(lampSkyKey81(pid)),null),data={filled:0,stars:[]};
 if(raw&&typeof raw==='object'){
  data.filled=raw.filled?1:0;
  if(Array.isArray(raw.stars)) data.stars=raw.stars.filter(x=>x&&typeof x==='object').map(x=>({k:['rhyme','memory','retry','notice',''].includes(x.k)?x.k:'',d:typeof x.d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.d)?x.d:''}));
 }
 return data
}
function lampSkySave81(data,pid){
 const id=pid||curPid();if(!getProfiles().list.some(p=>p.id===id))return;
 RAW.set(lampSkyKey81(id),JSON.stringify({filled:data.filled?1:0,stars:data.stars.map(x=>({k:x.k||'',d:x.d||''}))}))
}
function lampSkyEnsure81(count,pid){
 const data=lampSkyLoad81(pid);
 if(!data.filled&&data.stars.length===0&&count>0){
  for(let i=0;i<count;i++)data.stars.push({k:'',d:''});
  data.filled=1;lampSkySave81(data,pid);
 }
 return data
}
function lampSkyAdd81(reason,pid){
 if(!LAMP_KINDS75.includes(reason))return;
 const s=lampLoad73(pid);
 lampSkyEnsure81(Math.max(0,s.moments-1),pid);
 const data=lampSkyLoad81(pid);
 data.stars.push({k:reason,d:typeof lampDay74==='function'?lampDay74():(typeof dkey==='function'?dkey():'')});
 data.filled=1;lampSkySave81(data,pid);
}
const _moment81=lampMoment73;
lampMoment73=function(reason){
 const ok=_moment81.apply(this,arguments);
 if(ok)lampSkyAdd81(reason);
 return ok
};

function lampSkyHash81(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function lampDate81(d){
 if(!d)return '';
 const p=d.split('-').map(Number);if(p.length!==3||!p[0])return '';
 const dt=new Date(p[0],p[1]-1,p[2]);
 try{return dt.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})}catch(e){return d}
}
function lampStarLine81(item){
 if(item.n&&item.n>1)return gT('{n} earlier glows.',{n:String(item.n)});
 return gT({rhyme:'You found two words that sound alike.',memory:'You found a matching pair.',retry:'You tried again.',notice:'You looked closer.'}[item.k]||'An earlier glow.')
}
function lampSkyVisible81(stars){
 const list=stars||[];
 if(list.length<=FLAME81_MAXSTARS)return list.map((s,i)=>({k:s.k,d:s.d,n:1,i:[i]}));
 const keep=Math.min(12,FLAME81_MAXSTARS-4),older=list.slice(0,list.length-keep),newer=list.slice(list.length-keep);
 const slots=FLAME81_MAXSTARS-keep,size=Math.ceil(older.length/slots)||1,groups=[];
 for(let i=0;i<older.length;i+=size){
  const part=older.slice(i,i+size),dates=part.map(x=>x.d).filter(Boolean);
  groups.push({k:part.map(x=>x.k).find(Boolean)||'',d:dates[0]||'',d2:dates[dates.length-1]||'',n:part.length,i:part.map((_,j)=>i+j)});
 }
 return groups.concat(newer.map((s,i)=>({k:s.k,d:s.d,n:1,i:[older.length+i]})))
}
function lampSkyPos81(pid,index,total){
 const h=lampSkyHash81((pid||'')+'#'+index+'*'+total),h2=lampSkyHash81('y:'+(pid||'')+'#'+index);
 const ang=((h%1000)/1000)*Math.PI*2,rad=0.34+((h2%1000)/1000)*0.20;
 const x=50+Math.cos(ang)*rad*100,y=42+Math.sin(ang)*rad*72;
 return {x:Math.max(8,Math.min(92,x)),y:Math.max(8,Math.min(80,y))}
}
function lampSkyHTML81(pid){
 const s=lampLoad73(pid);if(!s||!s.moments)return {sky:'',list:''};
 const data=lampSkyEnsure81(s.moments,pid),vis=lampSkyVisible81(data.stars);
 if(!vis.length)return {sky:'',list:''};
 const items=vis.map((it,idx)=>{
  const pos=lampSkyPos81(pid,idx,vis.length),line=lampStarLine81(it);
  const date=it.d2&&it.d2!==it.d?[lampDate81(it.d),lampDate81(it.d2)].filter(Boolean).join(' – '):lampDate81(it.d);
  const label=date?line+' '+date:line;
  return `<button type="button" class="lamp81-star" data-sky-i="${idx}" data-n="${it.n||1}" style="--x:${pos.x.toFixed(2)}%;--y:${pos.y.toFixed(2)}%;--n:${it.n||1}" aria-label="${esc(label)}"><span class="lamp81-star-dot" aria-hidden="true"></span></button>`
 }).join('');
 const rows=vis.map((it,idx)=>{
  const line=lampStarLine81(it),date=it.d2&&it.d2!==it.d?[lampDate81(it.d),lampDate81(it.d2)].filter(Boolean).join(' – '):lampDate81(it.d);
  return `<li><button type="button" data-sky-i="${idx}">${esc(line)}${date?' — '+esc(date):''}</button></li>`
 }).join('');
 return {
  sky:`<div class="lamp81-sky" data-sky81><div class="lamp81-stars" role="list" aria-label="${esc(gT('Your night sky'))}">${items}</div><div class="lamp81-pop" hidden role="status"></div></div>`,
  list:`<details class="lamp81-sr" data-sky81-list><summary>${esc(gT('Your night sky'))}</summary><ul>${rows}</ul></details>`
 }
}
function lampSkyMount81(host,pid){
 if(!host)return;
 host.querySelectorAll('[data-sky81],[data-sky81-list]').forEach(n=>n.remove());
 const wrap=host.querySelector(':scope > [data-lamp73-slot="home"], :scope > .lamp76-hero');
 if(!wrap)return;
 const parts=lampSkyHTML81(pid);
 if(parts.sky)wrap.insertAdjacentHTML('afterbegin',parts.sky);
 if(parts.list)wrap.insertAdjacentHTML('beforeend',parts.list);
 const sky=wrap.querySelector('[data-sky81]');if(!sky)return;
 const open=btn=>{if(!btn||btn.dataset.skyI==null)return;lampStarOpen81(sky,sky.querySelector('.lamp81-star[data-sky-i="'+btn.dataset.skyI+'"]')||btn)};
 wrap.querySelectorAll('[data-sky-i]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open(btn)}));
}
function lampStarOpen81(sky,btn){
 if(!sky||!btn)return;
 const pop=sky.querySelector('.lamp81-pop');if(!pop)return;
 const label=btn.getAttribute('aria-label')||btn.textContent||'';
 const open=pop.getAttribute('data-for')===btn.dataset.skyI&&!pop.hidden;
 sky.querySelectorAll('.lamp81-star[aria-expanded]').forEach(b=>b.setAttribute('aria-expanded','false'));
 if(open){pop.hidden=true;pop.removeAttribute('data-for');return}
 pop.hidden=false;pop.dataset.for=btn.dataset.skyI;pop.textContent=label;
 btn.setAttribute('aria-expanded','true');
 const r=btn.getBoundingClientRect(),box=sky.getBoundingClientRect();
 pop.style.left=(r.left-box.left+r.width/2)+'px';
 pop.style.top=(r.top-box.top+r.height+4)+'px';
 pop.style.transform='translate(-50%,0)';
 const pr=pop.getBoundingClientRect();
 let dx=0,dy=0;
 if(pr.right>box.right-8)dx=(box.right-8)-pr.right;
 if(pr.left<box.left+8)dx=(box.left+8)-pr.left;
 if(pr.bottom>box.bottom-8)dy=(box.bottom-8)-pr.bottom;
 if(pr.top<box.top+8)dy=(box.top+8)-pr.top;
 pop.style.transform=`translate(calc(-50% + ${dx}px), ${dy}px)`;
}

document.addEventListener('click',e=>{
 if(e.target.closest('[data-sky81],[data-sky81-list],.lamp81-pop'))return;
 document.querySelectorAll('.lamp81-pop:not([hidden])').forEach(p=>{p.hidden=true;p.removeAttribute('data-for')});
},true);

document.head.insertAdjacentHTML('beforeend',`<style>
.today64[data-flame81] .lamp76-glow{background:radial-gradient(circle,var(--f81-tip,#fbdcad) 0%,color-mix(in oklab,var(--f81-halo,#dbb06b) 70%,transparent) 34%,transparent 74%)}
.today64[data-flame81="starfire"] .lamp76-glow{background:radial-gradient(circle,var(--f81-tip) 0%,color-mix(in oklab,var(--f81-core) 80%,transparent) 28%,color-mix(in oklab,var(--f81-mid) 55%,transparent) 50%,transparent 76%);animation:lamp81-shimmer 16s ease-in-out infinite}
.today64[data-flame81] .lamp76-mote,.today64[data-flame81] .lamp76-orbit span,.lamp76-reveal[data-flame81] .lamp76-spark{background:var(--f81-core);box-shadow:0 0 10px var(--f81-halo)}
.today64[data-flame81] .lamp76-star{background:var(--f81-tip);box-shadow:0 0 8px var(--f81-halo)}
.lamp76-reveal[data-flame81] .lamp76-bloom{background:radial-gradient(circle,var(--f81-tip) 0%,color-mix(in oklab,var(--f81-halo) 60%,transparent) 36%,transparent 72%)}
.lamp76-reveal[data-flame81] button.p{background:var(--f81-mid);color:var(--f81-ink,#2f2a24);border-color:var(--f81-deep)}
.lamp81-unlock{position:relative;z-index:1;max-width:22em;text-align:center;margin:.4em 0 0}
[data-shape="sparks"]{border-radius:2px 50% 50% 50%;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)}
[data-shape="motes"]{border-radius:50%}
[data-shape="rings"]{background:transparent!important;border:2px solid var(--f81-mid,currentColor);border-radius:50%;box-shadow:0 0 8px var(--f81-halo,#fff6)!important}
[data-shape="leaf"]{border-radius:80% 0 70% 0;width:34px;height:44px;transform:rotate(-42deg)}
[data-shape="firefly"]{position:relative;border-radius:50%;box-shadow:0 0 6px var(--f81-halo)}
[data-shape="firefly"]::after{content:"";position:absolute;width:13px;height:13px;border-radius:50%;background:var(--f81-tip,#fff);box-shadow:0 0 7px var(--f81-halo,#fff8);right:-7px;top:-5px}
[data-shape="glints"]{border-radius:0;clip-path:polygon(50% 0,61% 35%,100% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,0 35%,39% 35%);box-shadow:0 0 10px var(--f81-halo)}
.lamp81-picker{margin-top:8px}
.lamp81-tray{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;position:relative;padding:4px 0 8px}
.lamp81-center{display:none}
.lamp81-swatch{display:flex;flex-direction:column;align-items:center;gap:6px;width:88px;min-height:88px;padding:8px 6px;border:2px solid transparent;border-radius:16px;background:transparent;color:var(--ink);font:inherit;line-height:1.2}
.lamp81-swatch.on{border-color:var(--acc,#5b7a6a)}
.lamp81-swatch.locked{opacity:.92;cursor:default}
.lamp81-bloom{position:relative;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle at 40% 35%,var(--f81-tip,#fff) 0%,var(--f81-core,#eee) 42%,var(--f81-mid,#ccc) 78%);box-shadow:0 0 16px var(--f81-halo,#ccc8);flex:none}
.lamp81-swatch.locked .lamp81-bloom{background:transparent;box-shadow:none;border:2px solid color-mix(in oklab,var(--f81-mid,var(--ink)) 55%,transparent)}
.lamp81-swatch.locked .lamp81-bloom[data-shape="firefly"]::after{background:transparent;box-shadow:none;border:2px solid color-mix(in oklab,var(--f81-mid,var(--ink)) 55%,transparent)}
.lamp81-name{font-size:.85rem;font-weight:700;text-align:center;color:var(--ink)}
.lamp81-lock{font-size:.75rem;text-align:center;color:var(--ink);opacity:.8}
.lamp81-fact{margin:.4em 0 0;font-size:.95rem}
.lamp81-picker.ring .lamp81-tray{--rr:108px;width:min(320px,100%);height:320px;margin:0 auto;overflow:visible}
.lamp81-picker.ring .lamp81-center{display:block;position:absolute;left:50%;top:50%;width:58px;height:58px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,#fff 0%,#fff8 58%,transparent 72%);box-shadow:0 0 22px #fff8;pointer-events:none}
.lamp81-picker.ring .lamp81-swatch{position:absolute;left:50%;top:50%;width:80px;margin:0;--px:calc(cos(var(--a)) * var(--rr));--py:calc(sin(var(--a)) * var(--rr));transform:translate(-50%,-50%) translate(var(--px),var(--py))}
.lamp81-picker.ring.curl .lamp81-swatch{animation:lamp81-curl 1.4s ease both}
@keyframes lamp81-curl{from{transform:translate(-50%,-50%) translate(var(--sx),var(--sy))}to{transform:translate(-50%,-50%) translate(calc(cos(var(--a)) * var(--rr)),calc(sin(var(--a)) * var(--rr)))}}
@keyframes lamp81-shimmer{0%,100%{filter:hue-rotate(0deg) saturate(1)}50%{filter:hue-rotate(-12deg) saturate(1.08)}}
.lamp81-sky{position:absolute;inset:0;pointer-events:none;z-index:1}
.lamp81-stars{position:absolute;inset:0}
.lamp81-star{pointer-events:auto;position:absolute;left:var(--x);top:var(--y);width:44px;height:44px;transform:translate(-50%,-50%);border:0;padding:0;background:transparent;display:grid;place-items:center;z-index:3}
.lamp81-star-dot{width:calc(6px + (var(--n,1) - 1) * 1.4px);height:calc(6px + (var(--n,1) - 1) * 1.4px);border-radius:50%;background:#f7f1e6;box-shadow:0 0 calc(7px + var(--n,1) * 2px) #fff8e8,0 0 2px #fff;opacity:.88;animation:lamp81-twinkle calc(6s + var(--n,1) * .4s) ease-in-out infinite;animation-delay:calc(var(--x) * -0.04s)}
.lamp81-star{animation:lamp81-drift 16s ease-in-out infinite;animation-delay:calc(var(--y) * -0.08s)}
.lamp81-pop{pointer-events:auto;position:absolute;z-index:5;transform:translate(-50%,0);max-width:16em;padding:8px 12px;border-radius:12px;background:var(--card,#fffdf8);color:var(--ink,#2f2a24);box-shadow:0 4px 18px #0003;font-size:.9rem;line-height:1.3;text-align:center}
.lamp81-sr{position:relative;z-index:4;margin:2px auto 0;max-width:18em;font-size:.8rem;color:var(--ink);text-align:center;opacity:.82}
.lamp81-sr summary{cursor:pointer;list-style:none;display:inline-block;padding:6px 8px;min-height:32px}
.lamp81-sr summary::-webkit-details-marker{display:none}
.lamp81-sr ul{list-style:none;margin:4px 0 0;padding:0;text-align:left}
.lamp81-sr li button{width:100%;text-align:left;background:transparent;border:0;color:inherit;font:inherit;padding:8px 6px;min-height:44px}
@keyframes lamp81-twinkle{0%,100%{opacity:.4}50%{opacity:.9}}
@keyframes lamp81-drift{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(calc(-50% + 4px),calc(-50% - 5px))}}
.today64>.lamp76-hero{flex-direction:column;align-items:center;justify-content:flex-start;overflow:visible}
.today64[data-flame81][data-lamp-stage="6"]{--lamp-tint:color-mix(in oklab,var(--f81-halo) 33%,transparent);box-shadow:inset 0 50px 90px color-mix(in oklab,var(--f81-halo) 14%,transparent)}
@media(max-width:440px){
  .lamp81-picker.ring .lamp81-tray{--rr:96px;width:min(280px,100%);height:280px}
  .lamp81-picker.ring .lamp81-swatch{width:76px}
}
@media(prefers-reduced-motion:reduce){
  .today64[data-flame81="starfire"] .lamp76-glow{animation:none!important;filter:none}
  .lamp81-star,.lamp81-star-dot{animation:none!important}
  .lamp81-star{transform:translate(-50%,-50%)}
  .lamp81-star-dot{opacity:.7}
  .lamp81-picker.ring .lamp81-swatch,.lamp81-picker.ring.curl .lamp81-swatch{animation:none!important;transform:translate(-50%,-50%) translate(calc(cos(var(--a)) * var(--rr)),calc(sin(var(--a)) * var(--rr)))}
}
#pfridge{inset:var(--pbh,58px) 0 0 0}
</style>`);


/* Look Closer stays in the repo (v75–v80) but is off in v81. Set LOOK_CLOSER81 to true to bring the Explore tile and page back. */
const LOOK_CLOSER81=false;
function lcEnabled81(){return LOOK_CLOSER81}
function lcIsRecord81(e){return !!(e&&(e.section==='closer'||e.title==='Look Closer'||e.key==='practice:Look Closer'))}
function lcHideEntry81(root){
 if(lcEnabled81())return;
 (root||document).querySelectorAll('[data-lc75], [onclick="show(\'closer\')"], a[href="#closer"], a[href="#/closer"]').forEach(el=>el.remove());
}

{const hub=RENDER.hub;RENDER.hub=renderHub=function(){const r=hub.apply(this,arguments);lcHideEntry81($('hub')||document);return r}}
{const sh=show;show=function(id){if(id==='closer'&&!lcEnabled81())id='hub';return sh.apply(this,arguments)}}
{const rc=RENDER.closer;RENDER.closer=function(){if(!lcEnabled81()){show('hub');return}return rc.apply(this,arguments)}}
if(typeof pRecent68==='function'){const rec=pRecent68;pRecent68=function(reads,events){if(!lcEnabled81())events=(events||[]).filter(e=>!lcIsRecord81(e));return rec(reads,events)}}
if(typeof pRender68==='function'){const pr=pRender68;pRender68=function(){const r=pr.apply(this,arguments);lcHideEntry81($('log')||document);return r}}
if(typeof renderLook==='function'){pWrap68('renderLook',null,()=>lcHideEntry81($('look')||document))}
lcHideEntry81(document);
