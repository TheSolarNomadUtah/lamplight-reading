#!/usr/bin/env node
const fs=require('fs');
const path=require('path');
const P=require('../print/draw.js');
const OUT=path.join(__dirname,'..','print');

const CSS=`*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;color:#222;font-family:sans-serif}
.noprint{padding:12px 16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.noprint button,.noprint a{
  min-width:56px;min-height:56px;display:inline-flex;align-items:center;justify-content:center;
  padding:8px 14px;border-radius:14px;border:1px solid #ccc;background:#fff;color:#222;
  text-decoration:none;font:inherit;cursor:pointer}
.sheet{max-width:8.5in;margin:0 auto}
.sheet svg{display:block;width:100%;height:auto}
.hub{max-width:40rem;margin:0 auto;padding:16px 16px 48px}
.hub h1{font-size:1.6rem;margin:.4em 0}
.hub p{line-height:1.4}
.hubgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin:16px 0}
.hubtile{display:flex;flex-direction:column;align-items:center;gap:8px;min-height:120px;padding:16px 8px;
  border:2px solid #e4dccb;border-radius:20px;text-decoration:none;color:#222;text-align:center}
.hubtile small{font-size:.85rem;color:#666}
@page{size:letter portrait;margin:10mm}
@media print{
  .noprint{display:none!important}
  html,body{background:#fff}
  .sheet{max-width:none;margin:0;page-break-after:always;break-after:page}
  .sheet:last-child{page-break-after:auto;break-after:auto}
  a{color:inherit}
}`;

function fileFor(id, lang){return lang==='es'?id+'.es.html':id+'.html'}
function href(id, lang, fromLang){
  if(id==='index') return lang==='es'?'index.es.html':'index.html';
  return fileFor(id, lang);
}

function chrome(lang, opts){
  const c=P.copy(lang);
  const other=lang==='es'?'en':'es';
  const otherLabel=lang==='es'?c.enLink:c.esLink;
  const otherHref=opts.otherHref || href(opts.id||'index', other);
  const back=opts.back!==false?`<a href="${href('index', lang)}">${esc(c.back)}</a>`:'';
  return `<p class="noprint">
  <button type="button" onclick="window.print()">${esc(c.print)}</button>
  ${back}
  <a href="${otherHref}" hreflang="${other}" lang="${other}">${esc(otherLabel)}</a>
</p>`;
}
function esc(s){return String(s).replace(/[&<>"]/g,ch=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[ch]))}

function pageDoc(id, lang){
  const p=P.page(id, lang);
  const c=P.copy(lang);
  return `<!DOCTYPE html>
<html lang="${lang}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} — ${esc(c.brand)}</title>
<style>${CSS}</style>
<body>
${chrome(lang,{id})}
<div class="sheet">${p.svg}</div>
</body>
</html>
`;
}

function allDoc(lang){
  const c=P.copy(lang);
  const sheets=P.IDS.map(id=>`<div class="sheet">${P.svg(id,lang)}</div>`).join('\n');
  return `<!DOCTYPE html>
<html lang="${lang}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.all)} — ${esc(c.brand)}</title>
<style>${CSS}</style>
<body>
${chrome(lang,{id:'all'})}
${sheets}
</body>
</html>
`;
}

function indexDoc(lang){
  const c=P.copy(lang);
  const tiles=P.IDS.map(id=>{
    return `<a class="hubtile" href="${fileFor(id,lang)}">${P.thumb(id)}<span>${esc(P.titleOf(id,lang))}</span></a>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="${lang}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.pages)} — ${esc(c.brand)}</title>
<style>${CSS}</style>
<body>
${chrome(lang,{id:'index',back:false})}
<main class="hub">
  <h1>${esc(c.pages)}</h1>
  <p>${esc(c.intro)}</p>
  <div class="hubgrid">${tiles}</div>
  <p><a class="hubtile" href="${fileFor('all',lang)}" style="min-height:56px">${esc(c.all)}</a></p>
</main>
</body>
</html>
`;
}

const written=[];
function write(name, body){
  const dest=path.join(OUT,name);
  fs.writeFileSync(dest, body);
  written.push(name+' '+fs.statSync(dest).size);
}
['en','es'].forEach(lang=>{
  write(lang==='es'?'index.es.html':'index.html', indexDoc(lang));
  write(fileFor('all',lang), allDoc(lang));
  P.IDS.forEach(id=>write(fileFor(id,lang), pageDoc(id,lang)));
});
console.log('wrote', written.join(', '));
