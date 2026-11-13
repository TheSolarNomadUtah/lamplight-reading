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
      return {
        mounted:!!(host&&group),
        n:btns.length,
        selected,
        buttons:btns,
        offerVisible:!!(offer&&!offer.hidden),
        minH:btns.length?Math.min(...btns.map(b=>b.h)):0,
        minW:btns.length?Math.min(...btns.map(b=>b.w)):0
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
    await p.waitForTimeout(600);
    starCount=await p.evaluate(()=>{
      const hots=[...document.querySelectorAll('#math .sc132-hot')].map(b=>{
        const r=b.getBoundingClientRect();
        return {w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10};
      });
      const title=(document.querySelector('#math h2')||{}).textContent||'';
      const fact=(document.querySelector('#math .toy132-fact')||{}).textContent||'';
      const st=window.StarCount132&&StarCount132.state?StarCount132.state():null;
      const city=document.getElementById('starCity132');
      const grown=document.querySelector('#math details.toy132-grown');
      const namesOpen=!!(grown&&grown.open);
      const kidText=[...document.querySelectorAll('#math h2, #math .toy132-fact, #math p.soft, #math .toy132-fig span')].filter(el=>!el.closest('details')).map(el=>el.textContent||'').join(' ');
      const named=['Alnitak','Alnilam','Mintaka','Caph','Schedar','Ruchbah','Segin','Dubhe','Merak','Phecda','Megrez','Alioth','Mizar','Alkaid'];
      const namesInKid=named.filter(n=>kidText.indexOf(n)>=0);
      return {
        open:hots.length>=3 && !!(document.querySelector('#math .sc132-card')),
        title,
        fact,
        n:hots.length,
        tonight:st?!!st.tonight:null,
        id:st&&st.id,
        offer:st&&st.offer,
        cells:hots,
        minH:hots.length?Math.min(...hots.map(c=>c.h)):0,
        minW:hots.length?Math.min(...hots.map(c=>c.w)):0,
        city:!!city,
        grown:!!grown,
        namesOpen,
        namesInKid,
        countdown:/days until|countdown/i.test((document.querySelector('#math')||{}).innerText||'')
      };
    });
    for(const c of starCount.cells||[]){
      if(c.w<56-0.5||c.h<56-0.5){
        small.push({section:'starcount',rule:'T1',w:c.w,h:c.h,label:'star',tag:'button',cls:'sc132-hot',id:'',family:'starcount'});
      }
    }
    samples.push({section:'starcount',vis:'math',n:(starCount.cells||[]).length});
  }catch(e){starCount={error:String(e)}}

  await browser.close();

  process.stdout.write(JSON.stringify({ok:small.length===0&&shapeFails.length===0,small,shapeFails,samples,honeycomb,quilt,rainbowNight,moon,candlePicker,fireflies,starCount,errors},null,2));
})().catch(e=>{console.error(JSON.stringify({ok:false,error:String(e)}));process.exit(1)});
