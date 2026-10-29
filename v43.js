// v43: bells = VCSL Vibraphone, soft mallets (CC0), copied as-is into audio/inst/bells/. 7 samples, MIDI 55-76.
// Loaded like the piano (Opus first, MP3 fallback, cached on the device); the v11 synth bells play until the samples load.
// Nearest sample, pitch-shifted up to ±2 semitones. Above F#5 (77-84) the top sample (76) is pitched up: same timbre across
// the keyboard, no jump to the synth mid-tune (see README v43). Below 53 an octave shift, like the piano.
const BELL_SM=[55,59,62,65,69,72,76];let BELL_P=null;
const BELL_GAIN=.22;   // matches the piano at 0.5: vibes peak ~7.2 dB louder (max momentary loudness), 0.5*10^(-7.2/20)=0.22
const BELL_TAU=.12;    // release after the note's length (long vibe tail would blur fast Melody Echo phrases)
function bellsLoad(){return BELL_P||(BELL_P=Promise.all(BELL_SM.map(m=>instLoad('audio/inst/bells/'+m+AEXT))))}
{const nt=note;note=function(m,t,dur,inst,vol){
 if(inst!=='bells'&&inst!=='marimba')return nt(m,t,dur,inst,vol);
 const c=ac();if(!c)return;bellsLoad();
 let mm=m;while(mm<53)mm+=12;while(mm>88)mm-=12;
 const n=mm>76?76:BELL_SM.reduce((a,b)=>Math.abs(b-mm)<Math.abs(a-mm)?b:a),b=INSTB['audio/inst/bells/'+n+AEXT];
 if(!b)return nt(m,t,dur,'bells',vol);                          // synth bells until loaded
 t=Math.max(t||0,c.currentTime);const s=c.createBufferSource(),g=c.createGain();s.buffer=b;s.playbackRate.value=2**((mm-n)/12);
 const v=BELL_GAIN*Math.min(1.25,(vol||.25)/.3)*bedGain(),hold=t+Math.max(.12,dur||.5);
 g.gain.setValueAtTime(v,t);g.gain.setValueAtTime(v,hold);g.gain.setTargetAtTime(0,hold,BELL_TAU);
 s.connect(g).connect(c.destination);s.start(t);s.stop(hold+BELL_TAU*8);MSRC.push(s)}}
// bells are the default instrument: fetch them on the first tap so the first tune already uses them
document.addEventListener('pointerdown',()=>{try{bellsLoad()}catch(e){}},{once:true,capture:true});
const BELL_CREDIT='Bell sounds: Versilian Community Sample Library (VCSL), CC0.';
['adults','about'].forEach(k=>{const r=RENDER[k];if(r)RENDER[k]=function(){r.apply(this,arguments);const el=$(k);if(el&&!el.querySelector('.bellcredit'))el.insertAdjacentHTML('beforeend',`<p class="soft card bellcredit">🔔 ${gT(BELL_CREDIT)}</p>`)}});
