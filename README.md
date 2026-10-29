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

## v35: Everything adds glow, reading most
- Any practice lights today for the streak: a finished game round, a sung song, 3+ sound board taps, or 30 s of Star songs / Cymatica. Missing a day is still fine.
- Glow points per profile (`lamp_glow`, localStorage only): story 3 (from the reading log, so old profiles keep full credit), game round 1 and song 1 (max 5 a day each), sound board 1 (max 1 a day), Star songs 1 and Cymatica 1 (max 1 a day each).
- Light page: story color layers unchanged; one soft cymatic ring per milestone (Music and Games at 5/15/40/80, Sounds and Stars at 3/10/25/50) in the reading theme's colors, with a short bloom when earned (none with reduced motion).
- Daycare weekly sheet gets a Play column.

## v36
- Light page heading "{name}'s Light" translated (es "La luz de …", ar "نور …", name isolated for RTL).
- Home lamp: any lit day shows a warm flame and glow at 55% minimum; the streak adds up to 100% at 10 days (flicker off with reduced motion).
- About 30 s of singing counts as the song point (max 5 a day); finishing the same song doesn't count twice.
- QA preview (saves nothing while on): `localStorage.setItem('lamp_glowsim','1,2,3,4')` (rings per music,games,sounds,stars; a single number = all four) and `localStorage.setItem('lamp_glowbloom','all')` (or a number of last rings) to replay the bloom each time the Light page opens. URL form: `?glowsim=4&glowbloom=all`. Clear with `localStorage.removeItem('lamp_glowsim')` and `localStorage.removeItem('lamp_glowbloom')`.

## v37
- Light rings redrawn as symmetric cymatic patterns: Music 3-fold, Games 4-fold, Sounds 5-fold, Stars 6-fold, each in its own warm color derived from the theme accent. Ring levels: 1 scalloped petals, 2 mirrored petals (lattice), 3 inner rose, 4 outer halo with nodes. Thin, low-opacity lines with a soft glow.
- Bloom: 1.6 s fade + scale-in (0.86 to 1, ease-out) on newly earned rings; static under reduced motion. The ring canvas exposes `data-bloom` (0 to 1) for QA.
- Home lamp: the lit-today flame and rings now render on the first page load (the hub is re-rendered once all scripts have loaded).

## v38
- Gentle UI sounds (audio/sfx/, Opus first with MP3 fallback, cached on the device): chime_correct (round passed), try_again (missed round), sparkle_star (3 stars, Word Ladder solved, new Syllable Sprint best), tap_soft (valid ladder step), page_turn (opening a story, gain 0.5), alt_correct_kenney (correct Syllable Sprint / Word Scramble answer). Each plays at most once per 150 ms; half volume in Bedtime mode. Instrument sounds are unchanged.
- Translations: "All games, every age", the "Pad" instrument and the "Ohm" (Om, 136.1 Hz) tone label in Spanish and Arabic.
- Accessibility: the language picker has a label; the page has a meta description.

## Credits
- Interface and page sounds: Kenney (kenney.nl), CC0. Thank you, Kenney!
- Chimes and sparkles: made for Lamplight from simple harmonic ratios (3:2, 5:4), CC0.

## v39
- alt_correct sound at gain 0.5 (it was about 6 dB louder than the other effects).
- Number Music canvas hint "Press ▶ Play to hear …" translated (es, ar) and drawn right-to-left in Arabic.

## v40
- Number Music source names: "π Pi" translated (es "Pi", ar "π باي"); the "e" source name added to the es/ar dictionaries so every source name on that screen has an entry.

## v41
- Instruments (copied as-is from the Lamplight kit into `audio/inst/`, Opus first with MP3 fallback, loaded on first use and cached on the device, listed in "Save everything"):
  - Piano = FreePats Upright Piano KW, 10 samples (MIDI 57–84, every 3 semitones), nearest sample pitch-shifted by `playbackRate` (max ±1.5 st), 120 ms release. One 🎹 Piano button.
  - Drums = FreePats World Percussion conga kit: kick → low conga, tom → conga, hat → egg shaker, clap → hand clap. Rhythm Echo scheduler unchanged.
  - Synth fallback until samples load. Bells stay the default and are unchanged; Bedtime Glow levels unchanged. Marimba removed from every instrument picker.
- Free play & compose: a bigger two-octave piano (C4–C6) that scrolls sideways on upright phones and fits whole in landscape and on desktop; buttons 🔔 Bells · 🎹 Piano · ✨ Glow; hint translated (es, ar); keyboard stays left-to-right in Arabic.

## Credits (instruments)
- Piano: Upright Piano KW by FreePats (Gonzalo & Roberto), CC0.
- Drums: FreePats World Percussion (Xavimart, Gonzalo, Roberto; congas from the Versilian Community Sample Library), CC0.

## v42
- Piano sample start gain 0.8 → 0.5 (code only).
- Drums: egg shaker (hat) gain 0.8 → 1.44 (1.8x), peak −8.4 dBFS (Opus) / −12.4 dBFS (MP3). Hand clap 0.8 → 1.12 (1.4x, the most that keeps it below −6 dBFS): peak −6.4 dBFS (Opus) / −7.2 dBFS (MP3). Kick and tom unchanged. Sample files untouched.
- Removed the unused "Marimba" strings from the es/ar dictionaries.
