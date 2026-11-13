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

  await browser.close();
  process.stdout.write(JSON.stringify({ok:small.length===0&&shapeFails.length===0,small,shapeFails,samples,honeycomb,errors},null,2));
})().catch(e=>{console.error(JSON.stringify({ok:false,error:String(e)}));process.exit(1)});
