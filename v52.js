// v52 launch fixes: no device-voice fallback when a recorded voice has no clip; no sideways scroll on phones.
speak=function(t,rate){const k=clipKey(t),v=curVoice(),idx=VOICES.some(x=>x[0]===v&&x[0]!=="device")?voiceIndex(v):null;const fake={onend:null,onerror:null};
 if(idx){const done=()=>setTimeout(()=>fake.onend&&fake.onend(),0);if(!k){done();return fake}
  idx.then(set=>{if(!set.has(k))return done();try{speechSynthesis.cancel()}catch(e){}
   loadClip(k).then(b=>{if(!b)return done();const c=ac(),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start();s.onended=()=>fake.onend&&fake.onend()})});return fake}
 return speak0(t,rate)};
document.head.insertAdjacentHTML('beforeend',`<style>
#cyc{max-width:100%!important;width:min(92vw,520px)}
#cymatics canvas,#cymatics svg{max-width:100%}
main table{display:block;max-width:100%;overflow-x:auto}
</style>`);
