# Lamplight Learning

Learn, play, and glow. A free, offline-capable early learning app (reading, sound, music, paint) that collects zero data.

Live: https://lamplightlearn.org

## Credits
- Speech voices: Kokoro-82M (Apache-2.0), pre-recorded into `audio/<voice>/`.
- Singing voices (Twinkle, `audio/sing/twinkle_<voice>.mp3`, 12 voices): sung with SoulX-Singer (Apache-2.0) using Kokoro-82M voice timbres (Apache-2.0). No third-party recordings; no pitch shifting after synthesis.

## Adding a sung song
1. Drop files into `audio/sing/`: `<slug>_backing.(opus|mp3)` (and `<slug>_backing_m.*` for the men's key, -12) plus `<slug>_<voice>_vox.(opus|mp3)`; or full mixes `<slug>_<voice>.(opus|mp3)`. Ship both formats (Opus is used when the browser supports it, MP3 otherwise).
2. Add an entry to `audio/sing/songs.json` keyed by the song id in `music-data.js`: `{"slug":"<slug>","lines":N,"backing":{"f":"<slug>_backing","m":"<slug>_backing_m"},"stems":[voices…],"mix":[voices…]}`.
3. Run `python3 tools/gen_offline.py`. Stems play together on one audio-clock start time (backing 0.6, vocal 1.0), rate 1, no pitch change.
- Audio formats: every clip ships as Opus (mono; speech 32 kbps, singing 56 kbps) with the original MP3 as fallback. Opus files are re-encoded from the MP3 sources by `tools/encode_audio.py` with no gain boost and a limiter, so every file is at or below -1.5 dBTP (loudness about -19.5 LUFS). Same Kokoro-82M / SoulX-Singer (Apache-2.0) content, just a different codec.
- Singing stems (`<song>_backing*.*` + `<song>_<voice>_vox.*`, when present) come from the same SoulX-Singer + Kokoro pipeline (Apache-2.0); backing tracks are generated in-house, with no third-party recordings.

## Star songs data (v28)
`stars.json` holds three real light curves from NASA's Kepler mission (Quarter 1 long-cadence PDCSAP flux, downloaded once from MAST, archive.stsci.edu, on 2026-10-24, then normalized and averaged to 300 points or fewer):
- HAT-P-7 b / Kepler-2 b transit (KIC 10666592), 3 orbits
- Kepler-16 eclipsing binary (KIC 12644769), the primary eclipse
- V1154 Cygni Cepheid (KIC 7548061), 3 pulses

Kepler data courtesy of NASA and the Kepler Science Team, via the Mikulski Archive for Space Telescopes (MAST). The data are bundled with the app, so no request ever leaves the device.

## Word Ladder word list (v30)
`games-data.json` words3/words4: ENABLE word list (public domain) ∩ common English words (wordfreq, zipf ≥ 2.6), plus required QA words, minus the LDNOOBW bad-word list and a hand-made kid-safety list. All ladders are checked by BFS; par is the true shortest path. Only words with a w_ clip are spoken.

## Cymatica (v28 prototype)
A breathing companion, only in the Grown-up arcade (v29: Star songs moved there too, out of Number Music): soft tones in the Bedtime Glow style, with round-plate (Bessel) patterns from Sound Shapes that form as you breathe in. It is for relaxation only, not a medical treatment.

## v32
- One Games hub for every age (the separate Grown-up arcade is gone). Each tile shows an age badge.
- Star songs now has 7 Kepler stars (HAT-P-7 b, TrES-2 b, Kepler-6 b, Kepler-16, Kepler-34, V1154 Cygni, RR Lyrae), a planet-crossing view (phase-folded transits; planet size from √depth), and a compare mode. All data: NASA Kepler, Quarter 1 PDCSAP flux via MAST.
- Melody Echo adds 14/16-note levels, public-domain kid songs (Hot Cross Buns, Mary Had a Little Lamb, Twinkle, Frère Jacques, London Bridge, Ode to Joy), rhythm + pitch levels, and free play/compose (saved in this browser).
- Echo sound board plays existing heart clips; `audio/heart/sb_<id>` are optional placeholders for QA recordings (soft tone until then).

## v33
- Games hub tiles are dark with light text in every reading theme (WCAG AA).
- Word Scramble timer/score/Skip and the Library "Nothing matches" line are translated (Spanish, Arabic).
- Rhythm Echo: the 3-2-1 count-in starts by itself right after the last demo hit.
- Sound board: a new `audio/heart/sb_<id>` clip, once listed in the heart index, plays first; otherwise the old clips, otherwise the soft tone.

## v34
- Rhythm Echo: the 3-2-1 count-in is scheduled on the audio clock, 0.5 s after the last demo hit, one beat per step (debug: localStorage lamp_rxdebug=1).
- Word Scramble status line ("Best", seconds, numbers) translated in Spanish and Arabic.
