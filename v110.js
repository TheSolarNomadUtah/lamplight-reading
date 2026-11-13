/* v110: Phantom Galaxy M74 credit names CC BY 4.0 and shows the
   license URL as plain text (not a tappable link). Do not wrap show(). */
(function(){
 const URL40='https://creativecommons.org/licenses/by/4.0/';
 const prev=typeof patWindCredit109==='function'?patWindCredit109:null;
 patWindCredit109=function(it){
  const credit=String((it&&it.credit)||[it&&it.artist,it&&it.year,it&&it.license].filter(Boolean).join(', ')).trim();
  const lic=String(it&&it.license||'').trim();
  if(!/^CC BY(?!-)/i.test(lic))return prev?prev(it):credit;
  const name='CC BY 4.0';
  let out=credit
   .replace(/\s*https?:\/\/creativecommons\.org\/licenses\/by\/4\.0\/?\s*/ig,' ')
   .replace(/\s*CC BY(?:\s*4\.0)?\.?\s*$/i,'')
   .replace(/[.\s]+$/,'');
  const line=(out?out+'. ':'')+name+'. '+URL40;
  return line.replace(/\s+/g,' ').trim();
 };
})();
