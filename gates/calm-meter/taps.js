#!/usr/bin/env node
/* Headless 390-px tap-target check (QA T1: kid targets >= 44x44 CSS px)
   plus a live fill="none" check on shapes that themselves carry a tap signal. */
const {chromium}=require('playwright-core');
const ROOT=process.env.ROOT||'http://127.0.0.1:8765';
const SECTIONS=process.env.CALM_SECTIONS
  ? process.env.CALM_SECTIONS.split(',')
  : ['hub','lib','games','look','kids','letters','paint','patterns','math','music','about','adults','candle'];

(async()=>{
  const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--autoplay-policy=no-user-gesture-required']});
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  await ctx.addInitScript(()=>{
    try{
      localStorage.setItem('lamp_move_seen','1');
      localStorage.setItem('lamp_lang_device','en');
    }catch(e){}
  });
  const p=await ctx.newPage();
  const errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(ROOT+'/',{waitUntil:'domcontentloaded',timeout:30000});
  await p.waitForFunction(()=>typeof show==='function'&&typeof APP_VERSION==='number',{timeout:20000});
  const small=[], shapeFails=[], samples=[];
  for(const id of SECTIONS){
    try{
      await p.evaluate(id=>{if(typeof show==='function')show(id)},id);
      await p.waitForTimeout(250);
      if(id==='patterns'){
        try{await p.evaluate(()=>{if(typeof renderPatterns106==='function')renderPatterns106()})}catch(e){}
        await p.waitForTimeout(200);
      }
      if(id==='candle'){
        try{await p.evaluate(()=>{
          try{if(window.LampCandle129&&LampCandle129.save){const s=LampCandle129.load?LampCandle129.load():{fade:180};LampCandle129.save({on:true,fade:s.fade||180});if(LampCandle129.apply)LampCandle129.apply()}}catch(e){}
          if(typeof show==='function')show('candle');
          if(window.LampCandle129&&LampCandle129.offer)LampCandle129.offer();
        })}catch(e){}
        await p.waitForTimeout(300);
      }
      const found=await p.evaluate(()=>{
        function familyOf(el){
          const cls=(el.className||'').toString();
          if(/\bpchip\b/.test(cls)) return 'pchip';
          if(/\bpc\b/.test(cls)) return 'paint-color';
          if(el.closest && el.closest('.lkeys')) return 'lkeys';
          if(el.closest && el.closest('.pstamp101')) return 'pstamp101';
          if(el.closest && el.closest('.pbar101')) return 'pbar101';
          if(el.closest && el.closest('nav')) return 'chrome-nav';
          if(el.closest && el.closest('.filt')) return 'lib-filter';
          const id=el.id||'';
          if(id) return 'id:'+id;
          const tag=el.tagName.toLowerCase();
          const label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||'').trim().replace(/\s+/g,' ').slice(0,40);
          if(tag==='a') return 'text-link:'+label;
          if(tag==='select') return 'select:'+label.slice(0,24);
          if(tag==='input') return 'input:'+(el.getAttribute('type')||'text');
          if(/\bp\b/.test(cls)) return 'chip-p:'+label;
          return tag+':'+(cls.split(/\s+/)[0]||label||'anon');
        }
        function isHidden(el){
          const s=getComputedStyle(el);
          if(s.display==='none'||s.visibility==='hidden'||s.pointerEvents==='none'||Number(s.opacity)===0) return true;
          if(el.closest('[hidden],.hidden,noscript,script,style,.sr-only,.visually-hidden')) return true;
          const r=el.getBoundingClientRect();
          if(r.width<=0||r.height<=0) return true;
          if(r.bottom<0||r.top>window.innerHeight||r.right<0||r.left>window.innerWidth) return true;
          return false;
        }
        const sel='button, a[href], [onclick], [role="button"], summary, input, select, textarea, .hubtile, [data-tap], .toy124-hex-ghost, .toy124-seed';
        const out=[];
        for(const el of document.querySelectorAll(sel)){
          if(isHidden(el)) continue;
          // skip inputs that sit inside a larger tappable label (the label is the target)
          if((el.tagName==='INPUT'||el.tagName==='SELECT') && el.closest('label') && el.closest('label').querySelector('input,select')===el){
            const lr=el.closest('label').getBoundingClientRect();
            if(lr.width>=44 && lr.height>=44) continue;
          }
          const r=el.getBoundingClientRect();
          const tag=el.tagName.toLowerCase();
          const label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||'').trim().replace(/\s+/g,' ').slice(0,80);
          out.push({tag,w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,x:Math.round(r.x),y:Math.round(r.y),label,id:el.id||'',cls:(el.className||'').toString().slice(0,80),family:familyOf(el)});
        }
        // live fill=none: only the shape itself may carry a tap signal
        const shapes=[];
        for(const el of document.querySelectorAll('svg path, svg circle, svg ellipse, svg rect, svg polygon, svg polyline')){
          const fill=(el.getAttribute('fill')||'').toLowerCase();
          const pe=(el.getAttribute('pointer-events')||'').toLowerCase();
          const selfTap=!!(el.getAttribute('onclick')||el.classList.contains('toy124-hex-ghost')||el.hasAttribute('data-q')||el.hasAttribute('data-r')||el.hasAttribute('data-tap')||el.getAttribute('role')==='button'||/\b(ghost|hit|tap|cell)\b/.test(el.getAttribute('class')||''));
          if(!selfTap) continue;
          const hasFillHit=fill==='transparent'||fill==='currentcolor'||/^rgba?\(\s*\d+[,\s]+\d+[,\s]+\d+[,\s]*0/.test(fill)||el.getAttribute('fill-opacity')==='0'||pe==='all'||pe==='fill'||pe==='visiblefill';
          if(fill==='none' && !hasFillHit){
            const r=el.getBoundingClientRect();
            shapes.push({tag:el.tagName,w:r.width,h:r.height,cls:(el.getAttribute('class')||'')});
          }
        }
        return {out,shapes,vis:document.querySelector('main>section:not(.hidden)')?.id||location.hash};
      });
      samples.push({section:id,vis:found.vis,n:found.out.length});
      for(const t of found.out){
        if(t.w<44-0.5||t.h<44-0.5){
          small.push({section:id,rule:'T1',w:t.w,h:t.h,label:t.label,tag:t.tag,cls:t.cls,id:t.id,family:t.family});
        }
      }
      for(const s of found.shapes){
        shapeFails.push({section:id,rule:'T3-fill-none-live',...s});
      }
    }catch(e){
      samples.push({section:id,error:String(e)});
    }
  }
  let honeycomb=null;
  try{
    await p.evaluate(()=>{show('patterns');if(typeof renderPatterns106==='function')renderPatterns106();if(typeof patOpen106==='function')patOpen106('honeycomb')});
    await p.waitForTimeout(400);
    honeycomb=await p.evaluate(()=>{
      const g=document.querySelector('#toy124hex .toy124-hex-ghost');
      if(!g)return {open:false};
      const r=g.getBoundingClientRect();
      const x=r.x+r.width/2,y=r.y+r.height/2;
      const top=document.elementFromPoint(x,y);
      const hit=!!(top&&(top===g||g.contains(top)||(top.closest&&top.closest('.toy124-hex-ghost'))));
      return {open:true,hit,fill:g.getAttribute('fill'),pe:g.getAttribute('pointer-events'),w:r.width,h:r.height};
    });
  }catch(e){honeycomb={error:String(e)}}

  let quilt=null;
  try{
    await p.evaluate(()=>{show('patterns');if(typeof patOpen106==='function')patOpen106('quilt')});
    await p.waitForTimeout(300);
    const foundQ=await p.evaluate(()=>{
      function isHidden(el){
        const s=getComputedStyle(el);
        if(s.display==='none'||s.visibility==='hidden'||s.pointerEvents==='none'||Number(s.opacity)===0) return true;
        if(el.closest('[hidden],.hidden,noscript,script,style,.sr-only,.visually-hidden')) return true;
        const r=el.getBoundingClientRect();
        if(r.width<=0||r.height<=0) return true;
        if(r.bottom<0||r.top>window.innerHeight||r.right<0||r.left>window.innerWidth) return true;
        return false;
      }
      const sel='#patterns button, #patterns a[href], #patterns [onclick], #patterns [role="button"], #patterns summary, #patterns input, #patterns select, #patterns textarea, #patterns .hubtile, #patterns [data-tap]';
      const out=[];
      for(const el of document.querySelectorAll(sel)){
        if(isHidden(el)) continue;
        const r=el.getBoundingClientRect();
        const label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||'').trim().replace(/\s+/g,' ').slice(0,80);
        out.push({tag:el.tagName.toLowerCase(),w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,label,id:el.id||'',cls:(el.className||'').toString().slice(0,80)});
      }
      const svg=document.querySelector('#patterns .quilt130 svg');
      const title=(document.querySelector('#patterns h2')||{}).textContent||'';
      const nG=svg?svg.querySelectorAll(':scope > g').length:0;
      return {out,title,open:!!svg,nSquares:nG,ariaWrap:(document.querySelector('#patterns .quilt130')||{}).getAttribute('aria-label')||''};
    });
    quilt={open:foundQ.open,title:foundQ.title,nSquares:foundQ.nSquares,ariaWrap:foundQ.ariaWrap,nTaps:foundQ.out.length};
    for(const t of foundQ.out){
      if(t.w<44-0.5||t.h<44-0.5){
        small.push({section:'quilt',rule:'T1',w:t.w,h:t.h,label:t.label,tag:t.tag,cls:t.cls,id:t.id,family:'quilt'});
      }
    }
    samples.push({section:'quilt',vis:'patterns',n:foundQ.out.length});
  }catch(e){quilt={error:String(e)}}

  let rainbowNight=null;
  try{
    await p.evaluate(()=>{
      if(typeof show==='function')show('paint');
      PT.dark=true;PT.tool='rainbow';PT.hue=0;PT.size=12;
      if(typeof renderPaintBar==='function')renderPaintBar();
      if(typeof paintBar101==='function')paintBar101();
    });
    await p.waitForTimeout(500);
    rainbowNight=await p.evaluate(()=>{
      PT.dark=true;PT.tool='rainbow';PT.hue=0;PT.size=12;
      if(typeof paintBg==='function')paintBg($('pcv').getContext('2d'));
      const cv=$('pcv');const w=cv.width,h=cv.height,y=h*0.55;
      let last=[w*0.1,y];
      for(let i=1;i<=60;i++){
        const next=[w*0.1+i*(w*0.75/60),y];
        paintSeg(last,next);last=next;
      }
      const x=cv.getContext('2d',{willReadFrequently:true});
      const cols=[];
      const yPix=Math.round(y);
      for(let i=6;i<54;i+=4){
        const px=Math.round(w*0.1+i*(w*0.75/60));
        const d=x.getImageData(px,yPix,1,1).data;
        if(d[0]+d[1]+d[2]<40) continue;
        cols.push([d[0],d[1],d[2]]);
      }
      const buckets=new Set(cols.map(c=>{
        const [r,g,b]=c,m=Math.max(r,g,b),n=Math.min(r,g,b);
        if(m-n<20) return 'grey';
        if(r>=g&&r>=b) return g>=b?'red-orange':'red-violet';
        if(g>=r&&g>=b) return r>=b?'yellow-green':'green';
        return g>=r?'blue-green':'blue-violet';
      }));
      return {
        tool:PT.tool,dark:!!PT.dark,hue:PT.hue,
        glowOnly:typeof paintToolIsGlowOnly101==='function'?paintToolIsGlowOnly101('rainbow'):null,
        buckets:[...buckets],samples:cols.length
      };
    });
  }catch(e){rainbowNight={error:String(e)}}

  let moon=null;
  try{
    await p.evaluate(()=>{show('patterns');if(typeof patOpen106==='function')patOpen106('moon')});
    await p.waitForTimeout(300);
    moon=await p.evaluate(()=>{
      function isHidden(el){
        const s=getComputedStyle(el);
        if(s.display==='none'||s.visibility==='hidden'||s.pointerEvents==='none'||Number(s.opacity)===0) return true;
        if(el.closest('[hidden],.hidden,noscript,script,style,.sr-only,.visually-hidden')) return true;
        const r=el.getBoundingClientRect();
        if(r.width<=0||r.height<=0) return true;
        return false;
      }
      const taps=[];
      for(const el of document.querySelectorAll('#patterns button')){
        if(isHidden(el)) continue;
        const r=el.getBoundingClientRect();
        taps.push({w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,label:(el.textContent||'').trim().slice(0,60),id:el.id||''});
      }
      const svg=document.querySelector('#patterns .moon131 svg');
      const title=(document.querySelector('#patterns h2')||{}).textContent||'';
      const line=(document.querySelector('#patterns .moon-line131')||{}).textContent||'';
      const long=!!document.querySelector('#patterns .moon-long131, #moonLong131');
      const countdown=/\d+\s*(day|days|día|días)/i.test((document.querySelector('#patterns')||document.body).innerText||'');
      return {open:!!svg,title,line,long,countdown,taps,aria:svg?svg.getAttribute('aria-label'):''};
    });
    for(const t of moon.taps||[]){
      if(t.w<44-0.5||t.h<44-0.5){
        small.push({section:'moon',rule:'T1',w:t.w,h:t.h,label:t.label,tag:'button',cls:'',id:t.id,family:'moon'});
      }
    }
    samples.push({section:'moon',vis:'patterns',n:(moon.taps||[]).length});
    try{
      moon.glow=await p.evaluate(()=>{
        function shot(date){
          if(typeof renderMoon131==='function') renderMoon131(date);
          const host=document.querySelector('#patterns .moon131');
          const txt=(document.querySelector('#patterns')||document.body).innerText||'';
          return {
            long:!!(host&&host.classList.contains('moon-long131')),
            eq:!!(host&&host.classList.contains('moon-eq131')),
            full:!!(host&&host.classList.contains('moon-full131')),
            line:(document.querySelector('#moonLong131,#moonEq138')||{}).textContent||'',
            countdown:/\d+\s*(day|days|día|días)|days until|countdown/i.test(txt)
          };
        }
        return {
          eqN:shot(new Date(2026,2,20)),
          eqS:shot(new Date(2026,8,22)),
          full:shot(new Date(2026,0,3)),
          solN:shot(new Date(2026,11,21)),
          ordinary:shot(new Date(2026,3,10))
        };
      });
    }catch(e){moon.glow={error:String(e)}}
  }catch(e){moon={error:String(e)}}

  let candlePicker=null;
  try{
    await p.evaluate(()=>{
      try{if(window.LampCandle129&&LampCandle129.save){const s=LampCandle129.load?LampCandle129.load():{fade:180};LampCandle129.save({on:true,fade:s.fade||180});if(LampCandle129.apply)LampCandle129.apply()}}catch(e){}
      if(typeof show==='function')show('candle');
      if(window.LampCandle129&&LampCandle129.offer)LampCandle129.offer();
    });
    await p.waitForTimeout(300);
    candlePicker=await p.evaluate(()=>{
      const host=document.getElementById('candlePicker131');
      const group=document.querySelector('#candlePicker131 .lb128-picker, .lb128-picker');
      const btns=[...document.querySelectorAll('.lb128-picker button')].map(b=>{
        const r=b.getBoundingClientRect();
        return {label:(b.textContent||'').trim(),w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,checked:b.getAttribute('aria-checked')==='true',len:b.getAttribute('data-lb-length')};
      });
      const selected=(btns.find(b=>b.checked)||{}).len||null;
      const offer=document.getElementById('candleOffer129');
      const lab=document.querySelector('#candlePicker131 .lb128-picker-label, .lb128-picker-label');
      const lr=lab?lab.getBoundingClientRect():null;
      const st=lab?getComputedStyle(lab):null;
      const headingText=lab?(lab.textContent||'').trim():'';
      return {
        mounted:!!(host&&group),
        n:btns.length,
        selected,
        buttons:btns,
        offerVisible:!!(offer&&!offer.hidden),
        minH:btns.length?Math.min(...btns.map(b=>b.h)):0,
        minW:btns.length?Math.min(...btns.map(b=>b.w)):0,
        heading:headingText,
        headingVisible:!!(lab&&st&&st.display!=='none'&&st.visibility!=='hidden'&&(st.position!=='absolute'||((lr.width*lr.height)>0))&&lr&&lr.height>8),
        headingH:lr?Math.round(lr.height*10)/10:0
      };
    });
    for(const b of candlePicker.buttons||[]){
      if(b.w<56-0.5||b.h<56-0.5){
        small.push({section:'candle',rule:'T1',w:b.w,h:b.h,label:b.label,tag:'button',cls:'lb128-picker',id:'',family:'lb-picker'});
      }
    }
  }catch(e){candlePicker={error:String(e)}}

  let fireflies=null;
  try{
    await p.evaluate(()=>{if(typeof show==='function')show('math');if(typeof mathOpen==='function')mathOpen('fireflies')});
    await p.waitForTimeout(300);
    fireflies=await p.evaluate(()=>{
      const cells=[...document.querySelectorAll('#math .ff132-cell')].map(b=>{
        const r=b.getBoundingClientRect();
        return {w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,pressed:b.getAttribute('aria-pressed')==='true'};
      });
      const title=(document.querySelector('#math h2')||{}).textContent||'';
      const fact=(document.querySelector('#math .toy132-fact')||{}).textContent||'';
      const grid=document.querySelector('#math .ff132-grid');
      const cs=grid?getComputedStyle(grid):null;
      const st=window.Fireflies132&&Fireflies132.state?Fireflies132.state():null;
      const txt=(document.querySelector('#math')||{}).innerText||'';
      return {
        open:cells.length===10 && /Fireflies Make Ten/i.test(title),
        title,
        fact,
        n:cells.length,
        cells,
        minH:cells.length?Math.min(...cells.map(c=>c.h)):0,
        minW:cells.length?Math.min(...cells.map(c=>c.w)):0,
        cols:cs?cs.gridTemplateColumns.split(' ').filter(Boolean).length:0,
        k:st&&st.k,
        lit:st&&st.lit,
        sum:st?st.lit+(10-st.lit):null,
        numsOff:st?st.nums===false:false,
        eqHidden:!(document.querySelector('#math .toy132-eq')||{}).textContent,
        countdown:/days until|countdown/i.test(txt)
      };
    });
    for(const c of fireflies.cells||[]){
      if(c.w<56-0.5||c.h<56-0.5){
        small.push({section:'fireflies',rule:'T1',w:c.w,h:c.h,label:'firefly',tag:'button',cls:'ff132-cell',id:'',family:'fireflies'});
      }
    }
    samples.push({section:'fireflies',vis:'math',n:(fireflies.cells||[]).length});
  }catch(e){fireflies={error:String(e)}}

  let starCount=null;
  try{
    await p.evaluate(()=>{if(typeof show==='function')show('math');if(typeof mathOpen==='function')mathOpen('stars')});
    try{await p.waitForFunction(()=>typeof skyLoad112==='function',{timeout:5000})}catch(e){}
    await p.evaluate(()=>{try{return (typeof skyLoad112==='function')?skyLoad112():null}catch(e){return null}});
    try{await p.waitForFunction(()=>typeof skyCities112==='function'&&skyCities112().length>=21,{timeout:8000})}catch(e){}
    /* Daytime fallback so T3 runs on the tight Big Dipper card QA filed. */
    await p.evaluate(()=>{if(window.StarCount132&&StarCount132.setDate)StarCount132.setDate(new Date(2026,5,21,12,0,0))});
    await p.waitForTimeout(400);
    starCount=await p.evaluate(()=>{
      const board=document.querySelector('#math .sc132-board');
      const br=board?board.getBoundingClientRect():null;
      const stars=[...document.querySelectorAll('#math .sc132-star')];
      const title=(document.querySelector('#math h2')||{}).textContent||'';
      const fact=(document.querySelector('#math .toy132-fact')||{}).textContent||'';
      const st=window.StarCount132&&StarCount132.state?StarCount132.state():null;
      const city=document.getElementById('starCity132');
      const cityN=city?city.options.length:0;
      const grown=document.querySelector('#math details.toy132-grown');
      const namesOpen=!!(grown&&grown.open);
      const kidText=[...document.querySelectorAll('#math h2, #math .toy132-fact, #math p.soft, #math .toy132-fig span')].filter(el=>!el.closest('details')).map(el=>el.textContent||'').join(' ');
      const named=['Alnitak','Alnilam','Mintaka','Caph','Schedar','Ruchbah','Segin','Dubhe','Merak','Phecda','Megrez','Alioth','Mizar','Alkaid'];
      const namesInKid=named.filter(n=>kidText.indexOf(n)>=0);
      const minSep=window.StarCount132&&StarCount132.minSep?Math.round(StarCount132.minSep()*10)/10:0;
      return {
        open:!!(document.querySelector('#math .sc132-card')&&board) && stars.length>=3,
        title,
        fact,
        n:stars.length,
        tonight:st?!!st.tonight:null,
        id:st&&st.id,
        offer:st&&st.offer,
        board:{w:br?Math.round(br.width*10)/10:0,h:br?Math.round(br.height*10)/10:0},
        minH:br?br.height:0,
        minW:br?br.width:0,
        city:!!city,
        cityN,
        cities:city?[...city.options].map(o=>o.textContent):[],
        grown:!!grown,
        namesOpen,
        namesInKid,
        minSep,
        countdown:/days until|countdown/i.test((document.querySelector('#math')||{}).innerText||'')
      };
    });
    /* T3: a center tap on stars 1, 3 and 4 (the v133 overlap misses) must light that star, not a neighbor. */
    const t3={hits:[],ok:false};
    try{
      const n=starCount.n||7;
      const idx=[...new Set([1,3,4,...Array.from({length:n},(_,i)=>i)])];
      for(const i of idx){
        await p.evaluate(()=>{if(window.StarCount132&&StarCount132.pick)StarCount132.pick('dipper',false)});
        await p.waitForTimeout(80);
        const pos=await p.evaluate((i)=>{
          const svg=document.querySelector('#math .sc132-card');
          const xy=StarCount132.xy&&StarCount132.xy();
          if(!svg||!xy||!xy[i]||!svg.getScreenCTM)return null;
          const pt=svg.createSVGPoint();pt.x=xy[i].x;pt.y=xy[i].y;
          const loc=pt.matrixTransform(svg.getScreenCTM());
          return {x:loc.x,y:loc.y};
        },i);
        if(!pos){t3.hits.push({i,ok:false,error:'no-pos'});continue}
        await p.mouse.click(pos.x,pos.y);
        await p.waitForTimeout(80);
        const lit=await p.evaluate(()=>StarCount132.state().lit.slice());
        const ok=!!lit[i] && lit.filter(Boolean).length===1 && lit.every((v,j)=>j===i?v:!v);
        t3.hits.push({i,ok,lit});
      }
      t3.ok=t3.hits.length>0 && t3.hits.every(h=>h.ok);
      const qa=t3.hits.filter(h=>[1,3,4].includes(h.i));
      t3.qa=qa;
      t3.qaOk=qa.length===3 && qa.every(h=>h.ok);
    }catch(e){t3.error=String(e);t3.ok=false}
    starCount.t3=t3;
    if(starCount.minSep==null){
      starCount.minSep=await p.evaluate(()=>window.StarCount132&&StarCount132.minSep?Math.round(StarCount132.minSep()*10)/10:0);
    }
    /* QA v134 low: tonight dipper at Reykjavik must still meet the 56 px floor after the final fit. */
    try{
      await p.evaluate(()=>{
        if(typeof skySetCity112==='function')skySetCity112(19);
        if(window.StarCount132){
          if(StarCount132.setCity)StarCount132.setCity(19);
          if(StarCount132.setDate)StarCount132.setDate(new Date(2026,0,15,21,0,0));
        }
      });
      await p.waitForTimeout(350);
      await p.evaluate(()=>{if(window.StarCount132&&StarCount132.pick)StarCount132.pick('dipper',true)});
      await p.waitForTimeout(200);
      const night=await p.evaluate(()=>{
        const st=StarCount132.state();
        return {
          cityN:document.getElementById('starCity132')?document.getElementById('starCity132').selectedIndex:-1,
          city:(document.getElementById('starCity132')||{}).value,
          id:st&&st.id, tonight:st&&st.tonight, n:(st&&st.lit||[]).length,
          minSep:StarCount132.minSep?Math.round(StarCount132.minSep()*10)/10:0
        };
      });
      starCount.tonightDipper=night;
      starCount.minSepTonight=night.minSep;
    }catch(e){starCount.tonightDipper={error:String(e)};starCount.minSepTonight=0}
    samples.push({section:'starcount',vis:'math',n:starCount.n||0});
  }catch(e){starCount={error:String(e)}}

  let polygon=null;
  try{
    await p.evaluate(()=>{if(typeof show==='function')show('math');if(typeof mathOpen==='function')mathOpen('polygon')});
    await p.waitForTimeout(300);
    polygon=await p.evaluate(()=>{
      const add=document.getElementById('poly135add');
      const again=document.getElementById('poly135again');
      const hit=document.querySelector('#math .poly135-hit');
      const name=(document.getElementById('poly135name')||{}).textContent||'';
      const title=(document.querySelector('#math h2')||{}).textContent||'';
      const st=window.Polygon135&&Polygon135.state?Polygon135.state():null;
      const img=document.querySelector('#math .poly135-kepler');
      function box(el){if(!el)return null;const r=el.getBoundingClientRect();return {w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10}}
      const btns=[add,again,hit].filter(Boolean).map(el=>({id:el.id||el.className, ...box(el)}));
      return {
        open:/Polygon to circle/i.test(title) && !!document.getElementById('poly135path'),
        title, name, n:st&&st.n, max:window.Polygon135&&Polygon135.max,
        add:box(add), again:box(again), hit:box(hit),
        minH:btns.length?Math.min(...btns.map(b=>b.h)):0,
        minW:btns.length?Math.min(...btns.filter(b=>b.id!=='poly135-hit'&&b.id.indexOf('poly135-hit')<0).map(b=>b.h===b.h? (b.id.includes('hit')?b.h:b.w) : 0), ...btns.map(b=>b.h)):0,
        buttons:btns,
        kepler:!!img, keplerSrc:img?img.getAttribute('src'):'',
        flashy:/blink|flash/i.test((document.getElementById('v135css')||{}).textContent||'')
      };
    });
    /* T1: Add a corner and Start again are 56 px; the shape overlay is the whole card. */
    for(const b of (polygon.buttons||[])){
      const isHit=/hit/.test(b.id||'');
      if(isHit){
        if((b.w||0)<55.5||(b.h||0)<55.5){
          small.push({section:'polygon',rule:'T1',w:b.w,h:b.h,label:'shape',tag:'button',cls:'poly135-hit',id:'',family:'polygon'});
        }
      }else if((b.w||0)<55.5||(b.h||0)<55.5){
        small.push({section:'polygon',rule:'T1',w:b.w,h:b.h,label:b.id,tag:'button',cls:'poly135-btn',id:b.id,family:'polygon'});
      }
    }
    /* Names 3-6, then the round phrase, and a stop at 16. Walk with setN so the slow morph is not skipped. */
    const steps=[];
    for(let n=3;n<=16;n++){
      await p.evaluate(n=>Polygon135.setN(n),n);
      const snap=await p.evaluate(()=>{
        const st=Polygon135.state();
        const name=(document.getElementById('poly135name')||{}).textContent||'';
        return {n:st.n,name};
      });
      steps.push(snap);
    }
    const end=await p.evaluate(()=>{
      const st=Polygon135.state();
      const add=document.getElementById('poly135add');
      const name=(document.getElementById('poly135name')||{}).textContent||'';
      return {n:st.n,name,addGone:!add};
    });
    /* One live slow morph: 3 → 4 should still be mid-morph shortly after the tap. */
    await p.evaluate(()=>Polygon135.setN(3));
    const d0=await p.evaluate(()=>(document.getElementById('poly135path')||{}).getAttribute('d')||'');
    await p.evaluate(()=>Polygon135.add());
    await p.waitForTimeout(180);
    const mid=await p.evaluate((d0)=>{
      const d=(document.getElementById('poly135path')||{}).getAttribute('d')||'';
      const st=Polygon135.state();
      return {n:st.n,morphing:st.morphing,changed:d!==d0,dlen:d.length};
    },d0);
    await p.waitForTimeout(1200);
    const after=await p.evaluate(()=>Polygon135.state());
    polygon.steps=steps;
    polygon.end=end;
    polygon.morph={mid,after,slow:!!(mid&&mid.changed&&(mid.morphing||after.n===4))};
    samples.push({section:'polygon',vis:'math',n:2});
  }catch(e){polygon={error:String(e)}}

  let printables=null;
  try{
    await p.evaluate(()=>{if(typeof show==='function')show('adults')});
    await p.waitForTimeout(200);
    const card=await p.evaluate(()=>{
      const c=document.querySelector('#adults [data-print133]');
      const btn=document.querySelector('#adults [data-print133] .print133-open, #adults [data-print133] button');
      const r=btn?btn.getBoundingClientRect():null;
      return {card:!!c,title:c?((c.querySelector('h3')||{}).textContent||''):'',btn:!!btn,w:r?r.width:0,h:r?r.height:0};
    });
    await p.evaluate(()=>{if(typeof show==='function')show('printables');if(window.Printables133)Printables133.hub()});
    await p.waitForTimeout(300);
    printables=await p.evaluate((card)=>{
      const tiles=[...document.querySelectorAll('#printables .print133-hub .hubtile, #printables [data-print-id].hubtile')].map(b=>{
        const r=b.getBoundingClientRect();
        return {id:b.getAttribute('data-print-id'),label:(b.textContent||'').trim(),w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10};
      });
      const title=(document.querySelector('#printables h2')||{}).textContent||'';
      return {card:card,open:/Print/i.test(title),title,n:tiles.length,tiles,ids:tiles.map(t=>t.id),
        minH:tiles.length?Math.min(...tiles.map(t=>t.h)):0,minW:tiles.length?Math.min(...tiles.map(t=>t.w)):0};
    },card);
    for(const b of printables.tiles||[]){
      if(b.w<56-0.5||b.h<56-0.5){
        small.push({section:'printables',rule:'T1',w:b.w,h:b.h,label:b.label,tag:'button',cls:'hubtile',id:b.id,family:'printables'});
      }
    }
    samples.push({section:'printables',vis:'printables',n:(printables.tiles||[]).length});
  }catch(e){printables={error:String(e)}}

  let companionBlink=null;
  try{
    const c2=await browser.newContext({viewport:{width:390,height:800},reducedMotion:'reduce',serviceWorkers:'block'});
    const p2=await c2.newPage();
    await p2.goto(ROOT+'/?cmblink='+Date.now(),{waitUntil:'domcontentloaded',timeout:30000});
    await p2.waitForFunction(()=>typeof friendArtInner101==='function'&&typeof IL!=='undefined',{timeout:20000});
    await p2.evaluate(()=>{
      const box=document.createElement('div');
      box.id='cmBlink137';
      box.style.cssText='position:fixed;left:0;top:0;padding:8px;background:#120E18;display:flex;gap:8px;z-index:99999';
      for(const [k,st] of [['turtle',6],['dragon',6],['sprites',6]]){
        const hold=document.createElement('div');
        hold.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="160" height="160">'+friendArtInner101(k,st)+'</svg>';
        box.appendChild(hold);
      }
      document.body.appendChild(box);
    });
    await p2.waitForTimeout(200);
    const sample=()=>p2.evaluate(()=>{
      const pick=sel=>{
        const el=document.querySelector('#cmBlink137 '+sel);
        if(!el)return null;
        const s=getComputedStyle(el);
        return {anim:(s.animationName||'').replace(/\s/g,''),dur:s.animationDuration,op:s.opacity};
      };
      const running=(document.getAnimations?document.getAnimations():[]).filter(a=>{
        const t=a.effect&&a.effect.target;
        return t&&t.closest&&t.closest('#cmBlink137');
      }).map(a=>({name:a.animationName,play:a.playState}));
      const sig=[...document.querySelectorAll('#cmBlink137 *')].map(el=>{
        const s=getComputedStyle(el);
        return [el.tagName,el.getAttribute('class')||'',s.opacity,s.visibility,s.display,s.fill,s.stroke,s.transform,s.filter,s.strokeDashoffset].join('|');
      });
      return {wo:pick('.il-wo'),wc:pick('.il-wc'),aura:pick('.il-aura'),running,nWo:document.querySelectorAll('#cmBlink137 .il-wo').length,nWc:document.querySelectorAll('#cmBlink137 .il-wc').length,sig};
    });
    const a=await sample();
    await p2.waitForTimeout(900);
    const b=await sample();
    let delta=0;
    if(!a.sig||!b.sig||a.sig.length!==b.sig.length){delta=-1;}
    else {for(let i=0;i<a.sig.length;i++) if(a.sig[i]!==b.sig[i]) delta++;}
    const styles={wo:b.wo,wc:b.wc,aura:b.aura,running:b.running,nWo:b.nWo,nWc:b.nWc,nodes:b.sig.length};
    const still=styles.wo&&/^(none|)?$/.test(styles.wo.anim)
      && styles.wc&&/^(none|)?$/.test(styles.wc.anim)
      && (!styles.aura||/^(none|)?$/.test(styles.aura.anim))
      && Number(styles.wc.op)===0
      && Number(styles.wo.op)===1
      && (styles.running||[]).length===0;
    companionBlink={
      delta,
      still:!!still,
      styles,
      ok:delta===0&&!!still&&(styles.nWo||0)>=3&&(styles.nWc||0)>=3
    };
    await c2.close();
  }catch(e){companionBlink={error:String(e)}}

  await browser.close();


  process.stdout.write(JSON.stringify({ok:small.length===0&&shapeFails.length===0,small,shapeFails,samples,honeycomb,quilt,rainbowNight,moon,candlePicker,fireflies,starCount,polygon,printables,companionBlink,errors},null,2));
})().catch(e=>{console.error(JSON.stringify({ok:false,error:String(e)}));process.exit(1)});
