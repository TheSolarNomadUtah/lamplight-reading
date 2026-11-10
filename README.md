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

## v43
- Bells = VCSL Vibraphone, soft mallets (CC0), 7 samples (MIDI 55–76) copied as-is into `audio/inst/bells/`, Opus first with MP3 fallback, loaded like the piano (on first tap, cached on the device, in "Save everything"); the old synth bells play until they load. Used everywhere bells play: Free play, Melody Echo, Rhythm Echo count-in, Number Music, the sequencer.
- Nearest sample, pitch-shifted up to ±2 semitones. 77–84 (above F#5): the top sample (76) is pitched up rather than switching to the synth, so the timbre and level stay the same across the keyboard (measured within 0.8 dB of the 76 note; the synth was 1–2 dB louder and a different sound).
- Release: the note holds for its length, then fades (time constant 0.12 s). A fast Melody Echo phrase (0.21 s per note) has the previous note 10 dB down by the note after next and 20 dB down at 0.55 s; the raw tail would still be at full level there.
- Gain 0.22, which matches the piano at 0.5 (within 1 dB of max momentary loudness at C4, A4, E5). Bedtime half volume kept.

## Credits (bells)
- Bell sounds: Versilian Community Sample Library (VCSL), CC0.

## v44: Sound Lab (experimental)
- Hidden behind a test flag: open `https://lamplightlearn.org/?lab=1` once (it sets `localStorage.lamp_lab=1`), or set `localStorage.lamp_lab='1'` yourself. An "Experimental" Sound Lab tile then appears at the end of the Games hub (ages 10+). Without the flag nothing changes. Turn it off with `localStorage.removeItem('lamp_lab')`.
- Three toys made in code (Web Audio + canvas), no new files, no outside requests, no glow points or streak:
  - Kundt's tube: pick or slide a tone (or a "Mode n" button for the tube's n-th resonance, f = n·343/(2L)); foam beads drift into columns at the nodes. Microphone is opt-in, shows a red "Microphone is on" badge, and its tracks are stopped when you turn it off, switch toys, leave the lab, or the tab is hidden.
  - Für Elise in circles: the opening (bars 1–8 with the first ending, played twice, A minor 3/8). Right hand = sawtooth (orange), left hand = square (blue), drawn by 8 Fourier epicycles each; keyboard E2–E5 and a two-staff score light up as notes play.
  - Moiré slider: two fine meshes; turn, scale or drag the top one; slow "breathing" mode.
- Safety: all lab audio goes lowpass (2.6 kHz) → compressor/limiter (−20 dB threshold, 20:1, 2 ms attack) → 0.42 output; half volume in Bedtime. Measured (offline render of the real graph): Für Elise −22.2 LUFS, true peak −13.7 dBTP; loudest tube tone −14.4 dBTP; both together −12.9 dBTP. Flash check (12 canvas regions, 6 s each, ≥10% relative-luminance swings): 0 flashes per second in all three toys. Reduced motion slows every toy down.
- Inspiration (links only): Kundt's tube by wonderofscience (https://x.com/i/status/1986772622550368376); Für Elise by Fourier series by anish2good / maniclang.com (https://x.com/i/status/2115092008301891657); moiré mesh over an LED screen by mathelirium (https://x.com/i/status/2104056289860952548); twisted lattices by Dragonmaurizio (https://x.com/i/status/2115113611563545008); Be Smart, "This Weird Pattern Will Let Us Reshape Matter" (https://www.youtube.com/watch?v=w6hK2PML6Uc).

## v45: Sound Lab fixes
- Mic: taps are ignored while the permission prompt is pending; every stream is tracked and all are stopped on Off, toy switch, leaving the lab or a hidden tab; a stream that arrives after you left the lab or the tube is stopped at once. Tested with a fake mic delayed 0.7 s (leave during prompt, switch toy during prompt, double tap: 1 stream, all tracks ended).
- `?lab=0` removes `lamp_lab`. Grown-ups has a "Hide Sound Lab" / "Show Sound Lab" card (es/ar) once the lab has been turned on on this device.
- Tube tone gain 0.32 → 0.05 and an automatic fade-out after 45 s. Measured: 80 / 220 / 1200 Hz at −27.1 / −25.6 / −23.3 LUFS, all at or below Für Elise (−22.2 LUFS).
- Phones: the moiré sliders no longer wrap, the Für Elise circles are larger and the wave fits the canvas, and the Online badge is hidden in the lab on narrow screens.

## v46: Sound Lab and Paint additions
- Kundt's tube: a Reset button scatters the beads evenly. The beads now move with velocity and damping, and the tube gets a light "tap" when the mode changes, so the beads leave the old piles, including the ends, and re-form at the new nodes. Tested: mode 1 → mode 4 piles at 0, ¼, ½, ¾ and 1.
- Tube mic: sing or hum and the beads follow the pitch, found by normalised autocorrelation (80–1000 Hz, needs a clear note). Opt-in, with the v45 mic safety: pending guard, stops on leave, toy switch and hidden tab, and the red badge.
- Fourier circles: Für Elise, Twinkle Twinkle and Mary Had a Little Lamb. "Draw your own": drag a closed shape, it is traced by 40 epicycles (DFT), and "Play my shape" turns it into a 2.8 s tone through the lab limiter. On 360 px screens the circles sit clear of the staff and keyboard.
- Moiré: sliders cover 0–360° and 0.5–2× and redraw on every input. "Soft hum" plays two tones whose beat (max 8 Hz) follows the offset. Quiet, 45 s fade, through the limiter.
- Paint: Mirror button (off/4/6/8 around the center), Glow on night paper, Singing brush (pentatonic by height, at most ~6 notes a second, off by default, half volume in Bedtime, through the limiter), Fridge shelf (saved on this device only in IndexedDB, with a localStorage fallback; view, delete, 24 pictures max; nothing is uploaded).
- Measured with OfflineAudioContext through the real graph, true peak / integrated loudness: Für Elise −13.7 dBTP / −22.2 LUFS, Twinkle −13.8 / −22.6, Mary −13.8 / −22.7, shape −15.5 / −21.8, moiré hum −17.2 / −24.2, singing brush −14.1 / −22.2. Flashes: 0 per second in every toy, including a full 360° moiré sweep.
- The inspiration links for these toys stay in this README only. The app makes no outside requests.

## v47: Paint toolbar tidy
- The Mirror button is now the only control for 4-, 6- and 8-way symmetry. The symmetry menu no longer lists Kaleido 4/6/8; when one of them is on, the menu shows it as "Mirror n", so the default (6, mirrored) and any current setting keep working. Mirror cycles 4 → 6 → 8 → off; from any other menu choice it starts at 4.
- "Trippy color drift" is now "Color drift". All Paint toolbar labels (tool titles, symmetry menu) are translated into es and ar.

## v48: Paint multi-touch, smoother Moiré, calmer hum, tube shake
- Paint tracks each finger (pointerId) on its own, so two fingers draw two separate strokes instead of a zig-zag between them. Mirror, the glow brush and the singing brush still work per stroke.
- Paint opens with Mirror off (plain free drawing). The Mirror button still cycles 4 → 6 → 8 → off.
- Moiré: each mesh is drawn once to an offscreen canvas (redrawn only when the canvas size changes) and then rotated and scaled each frame, so it stays smooth at ×0.5.
- Moiré hum: the beat uses the angle folded into 0–45° (the grid repeats every 90°), so it stays calm when there is no ghost pattern.
- Kundt's tube: every Play gives the beads a gentle shake so they don't stay stuck at the sides.

## v49: Kundt's tube ends, Paint toolbar on phones
- Kundt's tube: the pull toward the two end nodes is weaker than toward the inner nodes, the soft wall is a little firmer while sound plays, and each end pile is capped at about half an inner pile, so extra beads spill inward. Beads no longer collect at the sides (mode 1 is the exception: its only nodes are the two ends).
- Paint: on narrow phones the toolbar wraps and the canvas now starts below it instead of being covered.

## v50: Tube starts on mode 2, gentle slope in mode 1
- Kundt's tube opens at 343 Hz (mode 2 for the 1 m tube), so the first Play shows a clear middle pile.
- Mode 1 (whose only nodes are the two ends) now shows a gentle slope: beads thin out toward the middle instead of forming two piles against the walls. Modes 2 and up are unchanged from v49.
- Modes 2 and up: each node gets a fair share of beads (end nodes half a share, since they touch a wall), whatever the starting layout, and piles spread sideways so no pile is taller than the tube (every bead stays visible). This replaces the v49 end-pile cap.

## v51 — launch fixes (approved scope)
- Sound board shows only buttons whose recordings play correctly (cow, duck, cat, A, B, clap); dog, sheep, snake, bee, M and night are hidden.
- Babies Echo: the eight spoken activities (device voice) are hidden; the sound board stays. Mmm, Moon has no "Say the words" button.
- Letter songs hidden (hub and Library).
- Save everything: fixed a malformed manifest row so progress reaches 100%; offline wording now says full offline needs Save everything; a gentle note appears when offline and not yet saved (en/es/ar).
- audio/inst/bells/72.opus trimmed 1 dB to meet the -1.5 dBTP limit. No voice clips changed.

## v52 — launch fixes from v51 QA
- When a recorded voice has no clip for a prompt (Letters "Find the little letter for…", Trace 🔊 letter), it stays silent instead of falling back to the device voice.
- No sideways scroll at 360/390 px: Cymatics canvas capped to the screen; Kids progress table scrolls inside its own box.

## v53
Ships QA's -0.3 dB gain-only trims for 5 voice clips (dora/l_x, michael/l_n, michael/l_p, michael/w_diamond, nicole/w_panda; mp3 and opus), approved by Ignacio. All voice clips now at or below -1.5 dBTP.

## v54
Hides Star songs, Cymatica, Sound Lab, Hum & match, Make a song, Note Blocks and Sound Shapes (Ignacio's trim). Their code stays but nothing links to them.

## v55
Number Music melody river: newest note glows at the center, older notes drift left (was stuck at the right edge).

## v56
Hides Number Music (Ignacio: needs more work). Code stays, no entry points.

## v57
Hides "Say the words" and its hint on every song (Ignacio). Play song stays.

## v58
About page: removed the Hum & match microphone note (feature hidden in v54).

## v59
New: Word Kinds game (tap the nouns, pronouns or adjectives; en/es/ar sentences) in Games, and Cursive ABC / Cursive abc tracing in Trace. Cursive font: Playwrite US Trad, SIL Open Font License (fonts/PlaywriteUSTrad-OFL.txt), bundled and subset, no outside requests.

## v60
More levels: Rhythm Echo +7 (27 total), Melody Echo +3, Syllable Sprint Master tier +33 words, Word Scramble +40 words, Word Ladder +52 ladders (88 total), Word Kinds +27 sentences and Levels 1-3.

## v61 — Six new learning games
- Sentence Builder: tap words into order, with undo/check controls; three levels from short phrases to longer sentences (18 sentences per language).
- Rhyme Match: find the rhyming word among three or four choices; three levels, with 18 pairs per language.
- Lamp Math: count 1–6 lamps, add groups up to 10, then subtract up to 12 (including zero); crossed-out lamps show what is taken away.
- Pattern Puzzles: complete repeating picture patterns; three levels from AB to AAB/ABC and four-place patterns. Shape, not color alone, identifies every picture.
- Opposites: choose the opposite word; three levels with 18 pairs per language.
- Memory Match: uncover 3, 4 or 6 picture pairs, with gentle timed mismatch reveals and no clock to race.
- Every level saves its best 1–3 stars in the existing per-child `lamp_games` store. Six rounds per level (Memory uses one full board); replay and next-level controls stay parent/child paced.
- English and Spanish learning content only. New games are absent from other language menus, and direct navigation is guarded. Spanish/Arabic menu and UI strings are bundled; both dictionaries are precached.
- Original inline SVG art, keyboard-operable buttons, labelled memory cards, live feedback and 390 px phone layouts. No outside requests, microphone or device speech. No voice files or audio clips added/changed; feedback reuses one quiet, rate-limited Bedtime Glow note.
- Release cache: `lamplight-v61`; `v61.js` is included in both offline-save manifests.

## v62 — QA fixes
- Save everything: four bounded attempts per file (12-second timeout, 0.5/1.5/3.5-second backoff), including manifest/body failures. Persistent failures show a translated Try again button that resumes from successful cached files; only a complete save sets the offline-ready flag. New releases refresh app/content files while reusing unchanged audio/font downloads.
- Word Kinds: one complete sentence earns one shown/saved star, regardless of level. Intermediate word kinds award nothing and do not chime.
- Rhythm Echo: investigation found no dropped/unreachable v60 levels: v27 had 12, and v60 added 7, making 19. Eight additional distinct patterns now provide the promised 27 selectable levels, preserving all existing IDs/progress.
- Cursive: English/Spanish only, with a direct-navigation guard. Actual font ink bounds fit all glyphs within a 32 px inset (including J, Y, Z and W); mask and visible guide use the identical font/position.
- Ladders: a reviewed positive common-word allowlist filters both solutions and accepted typed answers. 62 ladders remain (50 kid, 12 grown-up); named unsafe/obscure words and their flagged inflections are removed. `python3 tools/filter_ladders.py` enforces this for future data edits; the reviewed list is `games-data.json/commonWords`.
- Syllable Sprint: remove five repeated spellings, preserving the first canonical split; use ze|bra.
- Echo A/B: labels are letter names only; play exactly the existing n_a/n_b recording for the selected English/Spanish voice. No heart fallback, letter-song clip, device voice or tone. Hide buttons until their current-language recording is confirmed, or when missing (including Arabic).
- No audio files added or edited. Cache `lamplight-v62`; both offline manifests updated.

## v63 — Picture games, original art and Drum Garden
- Odd One Out: three levels, six rounds each; visual differences, everyday categories and useful relationships. Story Order: three levels with 3/4/5 illustrated steps in three everyday stories (growing a flower, making a sandwich, drawing a picture), undo/check controls. English/Spanish content only; best 1–3 stars per level in `lamp_games`.
- Drum pad moves from Music to the Games hub as Drum Garden: eight gentle synthesized pads, three kits with distinct pitch/timbre/decay, a three-level timing-and-pad copy game (`dp_1`–`dp_3` stars), and an eight-beat free-play loop recorder stored per child on this device. Bounded polyphony, quiet lowpassed tones through a limiter; stop on navigation/hidden tab. No microphone, new samples or recorded audio.
- Sing-along, all old Music links, the obsolete singing-voice picker/link, hidden-feature grown-up settings and Sound Lab toggle are UI-hidden/direct-navigation guarded. Reading voice choices remain. Previous code and all voice/audio files are unchanged.
- `art63.js` replaces 164 distinct legacy emoji picture types (559 references in the v62 source inventory) with shared original SVG art. Internal emoji IDs remain only for data/backups/old code compatibility; no emoji are used as rendered pictures. Arrow/play/check/status text glyphs remain text. Reuses v16 hand-drawn characters/objects and v61 art, including Spanish picture cards; all new games use the same art.
- Warm backing plates and dark outlines make pictures legible against both light/dark hub, tile and game backgrounds. Before/after phone screenshots and the inventory/contrast audit are retained at `/workspace/audit-v63/` on the build computer.
- QA note found: `/workspace/qa/handback/voice-cut-scope.md` identifies the twelve-option singing picker and hardcoded singing link (lines 19–21); it is a read-only scope note, not approval to delete/change voices. This release only hides the obsolete UI and does not act on its proposed audio cuts.
- Cache `lamplight-v63`; new scripts and translated menu/UI strings are bundled in both offline manifests. No outside requests.
- Validation: headless `playwright-core` + `/usr/bin/google-chrome` at 390 px in English, Spanish and Arabic; new games at all levels, copy-beat timing, loop persistence/stop, hidden UI, paint stamps, all v61/v62 regressions and offline reload. Zero console errors or outside requests. A 192 kHz OfflineAudioContext stress test checks all three drum kits and eight-voice stacks below the −1.5 dBTP ceiling.
- Offline manifests: 2,366 rows each; **11,782,270 bytes** standard / **10,616,186 bytes** Opus. Python recomputes every row and total; the `./` row now measures the served `index.html`, not a 4,096-byte directory stat. New art/game/drum scripts total under 49 KB.


## v64 — Today's Story
- A local-day story card sits beside the child's companion on Home. Grown-ups may set a K–5 grade per child; unset profiles keep the original age-band selection. An unread choice waits through missed days, unread stories come first, and saved favorites return after the pool is read. No daily streak or catch-up pressure.
- Twenty stories per grade, in each of English and Spanish (120 + 120): 55 existing English / 65 new, 15 existing Spanish / 105 new. Each has two or three comprehension questions. Arabic receives translated interface text, not English story content.
- Solo is text-first; Read Together retains the former Tonight's Plan coach, warm-up, level/focus, talk prompts and optional session note; Printed Page reuses full-story printing. Completion adds one quiet Bedtime Glow chime and a reduced-motion-safe glow.
- Date, title, grade, mode, quiz score and any session note join the existing local progress log. Older rows are kept intact. The old `home` route now opens Home; Tonight's Plan and the duplicate Grown-up arcade navigation are hidden. Games still uses the shared Scramble/Syllable Sprint engines.
- QA refinements: hidden Music entrypoints resolve to Drum Garden (English/Spanish), clearer violin/mouse/puppy/nose/sponge drawings, and a cloud replaces the arguable household fish in Odd One Out.
- No audio/voice files added or changed. Everything stays same-origin and offline-capable; both complete offline manifests remain below 15 MB. Phone/browser evidence is under `/workspace/audit-v64/`; physical-device, caregiver and editorial review are separate from automated tests.


## v65 — Echo, together; additive art requests
- Replaces the infant sound board with four calm caregiver-led choices: 28 picture/prompt cards, parent-paced cow/duck/cat turns, three complete lap-play text cards, and eight brief caregiver tips. Full English/Spanish copy; the upgraded entry is hidden in Arabic and other unsupported content languages.
- Parent-facing default, optional shared pictures, one-card stopping points, gentle real-world play/safety guidance. No feedback questions, child tests, stars, activity history, microphone, camera, recordings, device voice, autoplay or new audio files.
- Only audited existing Nicole/Puck (English) and Dora/Alex (Spanish) takes are offered: 21 English / 18 Spanish recorded word labels and 3 English / 2 Spanish animal answers per selected voice. All 28 prompts remain useful; missing takes get plain parent-voice text. Spanish duck has an explicitly parent-spoken idea, never a silent recording button. Songs/finger plays are parent-led text, with no unverified accompaniment.
- Each audio action appears only after that exact language/voice/encoding has decoded; readiness is per clip. Failed clips lose their action for the session. Playback is one source at restrained gain, stopped on navigation, voice change, Stop or backgrounding. Both encodings of the 88 reused takes are precached and already belong to the complete offline manifests.
- v64-to-v65 offline-update regression fixed: current-release cache wins over stale HTML/JS in the full-download extra cache. Progress/profile data and immutable voice assets are preserved. Today's Story's single glow chime is now scheduled on the current audio clock, including later sessions.
- The final avatar/icon requests arrived after v64 was already pushed and verified, so ship additively here: eight new original SVG choices (otter, raccoon, deer, seal, butterfly, red panda, puffin, beaver); separate call/answer Rhythm Echo and drum/waves Drum Garden pictures; distinct sentence, story-order, word-kind, library, cards, Look, Echo, sky and caregiver icons. Matching navigation destinations deliberately retain consistent icons across Home/Grown-ups.
- Evidence: `/workspace/audit-v65/` includes online/offline playback of all 176 voice encodings, failure injection, cache eviction/update tests, layout/keyboard/reduced-motion checks, warm/dark art screenshots and tile inventory. No claim that automated Chromium replaces physical iOS/Android, human listening, native-Spanish rhythm review or a caregiver/child usability pilot; those checks remain to be done. No family tester questionnaire is included.


## v66 — Opaque, accessible light rewards
- The shared light-celebration surface is now a centered modal with a fully opaque theme-matched panel and a dimmed backdrop, not translucent text over Today's Story. The legacy whole-panel fade was removed, including an early startup guard before the final script loads.
- All nine light-color rewards plus the Sparkles bonus share the fix. Titles, descriptions and the dismiss button have Spanish/Arabic UI translations. Original star art, soft colors and existing reward/audio/progress logic are retained; no voice/audio files changed.
- Focus stays in the popup; OK, Escape or backdrop dismissal restores focus/scrolling. Replacement popups do not stack, navigation closes them, and reduced motion has no entrance animation. A non-native-dialog fallback also blocks the background.
- EN/ES/AR × warm/dark checked at 390 px for every reward, first-frame opacity, readable panel/button contrast, keyboard dismissal, 200% text/zoom emulation, startup migration and offline/update behavior. Evidence and before/after screenshots: `/workspace/audit-v66/`.


## v67 — Printed Page, uncluttered status and reliable unlocks
- Printed Page and the legacy practice sheet render every UI label/instruction with `gT`, with ES/AR strings. Tracing keeps accented Spanish words; phone previews wrap their three repetitions inside the page. Print controls/status stay off paper.
- Connectivity status now lives in normal footer flow, never floats over game art, story text or Echo help. Echo tile labels also wrap at whole words at narrow widths.
- Spoken Echo picture cards/navigation and animal choices are gated by the selected language/voice's existing clip inventory: 21 EN / 18 ES words per shipped voice, 3 EN / 2 ES animal answers. Spanish duck *word* (`pato`) remains recorded; the unrecorded duck *sound* option, missing-word cards, no-recording messages and voice fallbacks are hidden. Decode/play failures remove the unavailable choice rather than offer a fallback. Parent-led lap plays and tips remain intentionally text-only. No audio files changed or generated.
- Today's Story had silently advanced `lamp_lightseen`, swallowing genuine color unlocks. Completion now checks and shows new unlocks after the quiz/glow view; its single existing glow chime is retained (no extra four-note reward chord). A daily Solo counts once, even though its progress is saved in both the log and Solo store. Existing log/score entries and seen-unlock markers are retained.
- **Reward QA repro:** use a new child profile/clean test context → set a K–5 grade in Grown-ups → Home → Today's Story → Read Together → Finish story → answer all questions, pressing Next after the last. The first completed reading opens Candle Amber immediately. OK and Home do not repeat it. Complete four more readings (repeats and any of Solo/Read Together/Printed Page are fine): the fifth opens Sunrise Coral. A perfect 3-star game level saves `lamp_games` stars but is not itself a story-color unlock.
- Color reading thresholds: 1, 5, 10, 25, 50, 75, 100, 150, 200. Legacy seven-activity-day and 26-letter bonuses also use the shared celebration. Already-seen unlocks are not replayed by upgrading. Evidence: `/workspace/audit-v67/`; EN/ES/AR at 360/390, warm/dark, print/PDF, real clips, full offline cache and upgrade checks. Blocked/unavailable service-worker registration also degrades without an unhandled error.

## v68 — A useful, honest per-child Progress log
- Calendar-week comparison (Monday–Sunday), reading days/reading-only streak, finished stories and question-weighted first-answer quiz accuracy per story grade, Solo/Read Together/Printed Page breakdowns, six skill groups, plain-language strengths/next steps, recent activity and opt-in weekly print preview. Selecting another report never changes the active child. Notes are excluded from printing unless explicitly included.
- New `lamp_activity@child` journal records dated game attempts/levels, repeated or lower scores, zero-star finishes, Sprint retries/slower finishes, Scramble points, practiced words/letters, synthetic-pad free play/loop saves and drawing sessions. Best scores remain in their original stores. New stars mean best-score improvements, not repeated awards; Word Kinds remains one star per sentence. Duet records the child’s half only. Echo baby activities deliberately stay untracked.
- Reading completions still use `lamp_log`: daily mode/grade/quiz/note plus measured foreground time; older library Solo now retains each completion instead of overwriting its history. Reports deduplicate the daily Solo mirror, including the Daycare sheet. Historical bests/counters remain separate: no invented dates, minutes, quiz scores or mastery. Missing/off-screen reading time is explicitly unknown. Timing pauses in hidden/unfocused tabs, on navigation, and after two idle minutes; it is active-screen time, not a clinical reading-speed measure.
- Fixed shared, stale Scramble bests: new results are child-scoped and reload on a child switch. Old shared scores remain unassigned and are retained in family backups. Kids now says “letters practiced”, without a misleading known/mastered claim or a fixed English-only /26 denominator.
- Storage failures no longer read back stale disk values over newly saved memory or resurrect failed deletes. The report visibly warns when a durable save failed, offers retry and a local family-backup download. Existing records remain unchanged; full-family backup/import/delete includes the new journal. All processing stays on device, no analytics/outside requests, no audio or voice assets added or changed.
- Full EN/ES report copy and AR interface strings; original Lamplight SVG art, high-contrast warm/dark layouts, 360/390 px, offline and v67→v68 upgrade coverage. Evidence: `/workspace/audit-v68/`. No claim to recover history the older app never saved; physical-device and caregiver usability review remain separate.

## v69 — Progress log language polish
- Counts use English/Spanish singulars and Arabic zero, one, two, few, many and other forms throughout on-screen and printable reports (readings, streak days, stars, points, questions and time).
- Resolve titles by stable story id in the current language, including older entries and saved notes. A bundled Spanish catalog covers all 258 shipped story ids; known practice words are translated only for display, with source-language/context checks. Names, unknown vocabulary and original local records are retained.
- Read Together note labels, print headings and print opt-in derive from the mode’s existing name (Spanish: Leer en compañía).
- Cache lamplight-v69; offline manifests include the small local-only localization module. No audio changes or outside requests.

## v70 — Every rung is one letter
- Repair The Word Ladder (kl3): hot → pot → pet → wet → wit → sit → sin → sun → bun → bug → hug. Body, complete preview/word list, bridge quizzes and talk questions agree; the level now lists short i too.
- Coach: “Let your child invent the next step.” Spanish/Arabic UI strings use the same neutral prompt.
- Audited all 133 English and 125 Spanish stories: cap → cat → can is valid; the four-sounds lesson is a blending list, not a claimed ladder. There is no separate Spanish kl3 story in the shipped Spanish library; no other skipped letter-ladder steps found. No new translated story or audio added.
- Cache lamplight-v70; offline manifest byte totals refreshed.

## v71 — Story first, practice at your own pace
- Home puts the existing Today's Story card first. Every other existing activity stays in a quieter Explore section; the Library still has its grade filters. Age and optional K–5 story grade can be edited together in each child's profile. Existing unset grades keep their familiar story choice and a gentle link to profile setup.
- All 16 active Games entries open in untimed, unscored Practice. A clearly labeled, session-only Challenge switch preserves the original levels, timers, speed settings, timing windows, best times, points and stars. Opening another game, switching children or reloading always returns to Practice; changing modes starts a fresh round.
- Practice keeps unlimited gentle retries, pitch/pad/word order and existing demonstrations, without response deadlines, mistake cutoffs, competing scores or best-record writes. Rhythm call-and-response finishes explicitly rather than after a pause. Free composition and Drum Garden's loop recorder remain intact (a loop's capture length is not a scored game timer).
- Practice still records intentional skill practice and foreground activity in the existing local journal, explicitly without stars, elapsed speed scores or points. All historical reading logs, notes, profiles, stars, best times, tunes and loops stay unchanged. Retired music and arcade links remain hidden.
- English and Spanish text; Arabic interface only. Existing art, Bedtime Glow sound design and shipped audio are unchanged. No new requests, services, companion features or audio assets.
- Cache `lamplight-v71`; `v71.js` is precached and both full-offline manifests are byte-recomputed.

## v72 — Neutral story-coach and notebook wording
- The notebook now prompts for “questions your child asked” and “funny things your child said,” with corresponding Spanish and Arabic strings.
- Audited all English/Spanish story coaching and notebook copy. Child references use neutral wording; story characters, story text, quizzes, talk questions and existing notes are untouched. The retained legacy Read Together coach and Spanish story-mode guidance are neutral too.
- Cache `lamplight-v72`; existing precached files retained and both offline manifests byte-recomputed. No new features, requests, art or audio files.

## v73 — A lamp that grows with connection
- One Lamp companion with three clear shapes: spark, wick flame, then lantern. It lives on the Today's Story card and in each child's profile, where it can be renamed on this device. Growth is per child, stays if you change the animal picture, never decays, and stops at the lantern.
- Stage-ups come from a correct Rhyme Match pair, a Memory Match pair, or trying again after a miss. Speed and perfect scores do not count. A short sentence explains why the lamp grew (English, Spanish, and Arabic interface strings). The celebration waits until Home, so it never interrupts a game.
- Reading Today's Story still plays its soft glow and breath. Breath is a slow 5-second rise and fall (slower after time away). Growth holds, unfolds, and settles gently; reduced motion uses a crossfade and still plays the chime.
- Each stage has one quiet WebAudio chime (C4, E4, G4) at the peak of the unfold, ducked under speech, with a Look-page off switch, peaking at or below -1.5 dBTP. No new voice or audio files.
- Cache `lamplight-v73`; `v73.js` is precached and both offline manifests are byte-recomputed.

## v74 — Challenge stays in scored rounds, and the lamp grows more slowly
- The Practice/Challenge switch appears only in the timed or scored rounds of the 16 games. It is hidden in open-ended play: Drum Garden free play and the loop recorder, Melody Echo’s Free play & compose, Paint, Echo, Today’s Story, and the Games hub itself. Practice and Challenge remain reachable in every scored or timed round.
- Lamp growth is at most one credit per game session and two credits per child per local day. Wick still takes 3 credits and the lantern 8, so the wick usually arrives over about two days and the lantern over about four or more. A child who already reached a stage in v73 keeps it.
- The growth sentence names the most common moment since the last stage (a rhyme pair, a matching pair, or trying again), using the credit that triggered the stage-up when kinds are tied. Home keeps the older lamp art until the stage-up popup or crossfade reveals the new stage.
- Cache `lamplight-v74`; `v74.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v75 — Look Closer
- A new Explore activity with nine still-picture illusions, each drawn in SVG in the Lamplight art style. There are no image files, no scores, and no "you were wrong."
- Every picture has a guess, a reveal the child starts with a tap (600 ms or longer), a short closing line, and the motto "Eyes make smart guesses." Optional finger-measure guides are on the length and size pictures.
- With reduced motion, every reveal is a crossfade. Motion never flashes, strobes, spins, or uses dense high-contrast stripes.
- A finished guess-then-reveal can earn one lamp "noticing" credit, with the sentence "Your lamp grew because you looked closer," still limited to one credit per session and two per local day.
- Full text in English and Spanish; Arabic includes the menus and the short lines. Cache `lamplight-v75`; `v75.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v76 — The Lamp becomes a hero light
- The Lamp sits in its own place above Today's Story, two to three times larger than the avatars, and acts as a real light: a warm radial glow behind the story header that grows at each stage. From the lantern onward, a few slow motes drift by; the last stages add orbiting fireflies and faint stars, especially in the night theme. Story buttons stay clear and tappable.
- There are six stages: spark, ember, candle, lantern, lantern with fireflies, and starlit lantern. Thresholds are 0, 4, 10, 18, 30 and 48 credits, still at most one credit per session and two per local day, so the final form takes a few weeks of regular play. Growth still comes from the same connection, retry and noticing moments, never from time spent or daily visits.
- Children who already grew a lamp in v73 keep it: spark stays spark, wick becomes candle, and lantern stays lantern, and a reached stage is never lowered.
- Each stage-up can play a short full-screen glow on Home only (never mid-game): a dusk hold, the old form breaking into warm motes, the new form assembling, and a soft bloom with one Bedtime Glow chime. The child taps Continue. Reduced motion uses a crossfade or still glow. A Look setting, "Full-screen glow," can turn the spectacle off for a quieter time.
- All art is original SVG and CSS. Full text in English and Spanish; Arabic includes the UI strings. Cache `lamplight-v76`; `v76.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v77 — Lamp credits reach the starlit stage
- v75 still stopped lamp credits at stage 3 (the old lantern). Credits now follow the v76 thresholds and only stop once the lamp is starlit (stage 6). The one-credit-per-session and two-credits-per-day caps are unchanged, and growth still comes from the same rhyme, memory, retry, and noticing moments.
- Look Closer picture cards now open on a mouse click, a touch tap, and Enter or Space, including on a wide desktop layout. The list had been drawn without binding those handlers.
- Cache `lamplight-v77`; `v77.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v78 — Look Closer art quality pass
- The nine illusions were redrawn from public study references as original Lamplight SVG, with no bundled or hotlinked images. Duck or Rabbit is a single head a child can read both ways: a clear left-pointing bill, an eye, a round head, and a small notch at the back for the rabbit's mouth. A reveal traces "duck: beak" and then "rabbit: ears," and tiny duck and rabbit hint icons sit under the choices.
- Checker Shadow now uses a real cylinder and a soft board shadow so squares A and B truly look different, though they are the same color. Kanizsa pac-men sit on an equilateral triangle so the illusory triangle pops. Rubin's vase uses recognizable facing profiles. Shepard's tables are congruent tabletops, one rotated a quarter turn. The Jastrow bananas are identical sectors nested tightly. Müller-Lyer, Ebbinghaus, and Ponzo were checked and lightly tightened so equal lengths and sizes still read with a strong effect.
- Every reveal still starts with a tap and lasts 600 ms or longer, with no flicker or strobe. Reduced motion keeps a crossfade. The motto remains "Eyes make smart guesses."
- Full text in English and Spanish; Arabic includes the new UI labels. Cache `lamplight-v78`; `v78.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v79 — Duck or Rabbit reread
- Duck or Rabbit was redrawn from Jastrow's 1899 study reference as original Lamplight SVG. The two bill halves are wider and longer, with soft rounded tips, a clear gap, and a gentle diverge, so they read as an open duck bill and as two floppy rabbit ears. The head is rounder, like a rabbit facing right, and a clearer notch on the right reads as the rabbit's mouth and nose.
- A tap starts a slow reveal of 1,600 ms or longer: a light duck cue on the bill with a tiny tongue, then a rabbit cue on the ears with a small nose and whiskers at the notch. The cues fade back out. The head may tilt about 20 degrees between the two highlights so the ears lift, then eases back. Reduced motion keeps a crossfade and does not tilt. The motto remains "Eyes make smart guesses."
- Cache `lamplight-v79`; `v79.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v80 — Duck or Rabbit as line art, and a truer Checker Shadow
- Duck or Rabbit leaves the filled silhouette behind and is redrawn as original single-weight line art, studied from Jastrow's 1892 duck-rabbit and from a two-prong cream line drawing. The head is a long horizontal oval, not a circle. Exactly two prongs, about as long as the head, have a thin gap that ends in a soft point at the head, plus an inner seam on the upper prong for the bill. The eye sits just behind the middle of the head, toward the right, not near the prongs. The right-side notch is a small nose bump, a short curved mouth, and one or two tiny feather tufts. There is no fill, no tilt, no whiskers, and no cheek or smile marks. Dark ink on the cream plate in the warm theme; cream lines on a dark plate in the night theme. The hint icons under the choices are gone so they do not give the picture away.
- A tap starts a slow reveal of 1,600 ms or longer: a gold tint and the label "duck: beak," then a sage tint and "rabbit: ears," then both fade back. With reduced motion, those cue animations are switched off (including leftover v79 cue keyframes) and both tints fade in once and stay visible.
- In Same-Color Squares, A stays a dark-checkered cell in the light. B moves to a light-checkered cell inside the cylinder's shadow. Both squares keep the exact same fill. The motto remains "Eyes make smart guesses."
- Cache `lamplight-v80`; `v80.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v81 — Lamp flame colors, a night sky, and clearer marks
- Each child can pick a Lamp glow color that unlocks as the Lamp grows: Hearth Amber (sodium) at spark, Ember Coral (strontium) at ember, Copper Teal (copper) at candle, Lilac Glow (potassium) at lantern, Moss Spark (boron) at fireflies, and Starfire at starlit. Switching colors never changes progress. If a child has not picked, the Lamp uses the highest unlocked color; once they pick, that choice stays even when a new color unlocks. Locked colors are a soft outline with "Grows with your Lamp."
- The six midtones are tuned in OKLab to a shared lightness and chroma so none glare and none look dull. Dark ink on every swatch meets body-text contrast. Each color has its own core-to-tip gradient, halo, spark shape, and name label, so colorblind kids can tell them apart without relying on hue. Short, honest kid facts sit under the picker (for example, "Real sodium flames glow a warm amber like this." Potassium's lilac is red light and violet light together. Starfire is not claimed as an element flame).
- The picker lives in the Lamp section of a child's profile and on the Look page. It opens with a gentle line about people learning to keep fire long ago, plus "Colors are made by light. Each element's fire plays its own chord of light." Unlocked flames start in a short row and, once Starfire unlocks, curl slowly into a ring with a soft white center. Reduced motion shows the final layout.
- The color carries through the hero Lamp glow, the stage-up reveal, the sparks, and the fireflies. A new unlock can be mentioned as "A new glow is ready: {name}."
- Home grows a quiet night sky of stars behind the Lamp. Each credited Lamp growth moment that already passes the session and daily caps adds one star, per child, kept on this device. Existing credits backfill as unnamed stars. Tapping a star shows a short line about what the child did, plus the local date. Stars last forever, are never ranked or bought, and older ones merge into brighter stars so nothing is lost. Today's Story stays the main card. Reduced motion keeps the sky still.
- Colorblind-safe marks elsewhere: Paint's ten color dots now have visible names; Read Together uses a check for heard words, a dotted underline for tricky words, and a caret in a box for the current word, and the speech-check line no longer says "Green words were heard"; Rhythm Echo rings use a check vs an X and no longer mention a "red ring"; Word Kinds found words get a check and darker green so white text meets 4.5:1; Letters "yes" tiles get a stronger outline; the selected theme gets a check and a thicker border; highlight and sage primary buttons were darkened so contrast holds in warm and Night themes.
- Look Closer is hidden in this release, behind `LOOK_CLOSER81` (set to false). The Explore tile and any entry points are removed, including routes from the Look page and `show('closer')`, which returns Home. The v75–v80 code and assets stay in the repo so the feature can be turned back on later. Existing Look Closer lamp credits and night-sky stars are kept. Look Closer is not listed in the Progress log as something kids can still do, and no modern illusion preview was added.
- Cache `lamplight-v81`; `v81.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v84 — Arabic language file fix
- `lang/ar.json` was missing its closing `}`, so Arabic could not load. The file now parses, and a pre-ship check (`tools/preship.sh`) JSON-parses every `lang/*.json` and runs `node --check` on `vNN.js` (and `sw.js`) before a push.
- Cache `lamplight-v84`; both offline manifests are byte-recomputed. No new audio, voices or requests.

## v83 — Look Up, the Solar System, and clearer marks
- Look Up is a short, five-screen visit to the Sun and the eight planets, opened from a new Explore tile. The child reads (or taps “I read it”) and is asked “What do you notice?” before each explanation. Art is drawn in the app; planet lines follow NASA. A soft Bedtime Glow chime marks each discovery. Reduced motion keeps the sky still. Noticing a pattern in the planets can grow the Lamp, under the usual caps. Look Closer stays hidden.
- A real click or tap now opens a night-sky star, including stars that sit behind the lantern. Each star has a 44 px target. Resting stars are small, calm, and visible in the warm and Night themes. The popup sits under “Your night sky” and pushes the fox and book down while it is open, so it no longer covers them. Star dates follow the app language (English, Spanish, or Arabic), not the device locale.
- In Word Kinds, a wrong tap shows an X next to “Try another word.”
- In Read Together, from the library and from Today’s Story, the heard check, the current-word caret, and the dotted underline for a tricky word actually render.
- High-contrast primary buttons use black text on the yellow fill. The current-word highlight (`--hi`) is `#c28500`, at least 3:1 against the card, with the ink outline kept.
- Cache `lamplight-v83`; `v83.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.

## v82 — Star popover, a filled Copper Teal ring, and a clearer Lilac leaf
- The tapped-star popup now sits above the Lamp, not behind it. It is placed just below the lantern so the Lamp stays visible, and it is kept inside the Home card at 360 and 390 px, in the warm and Night themes, in Spanish, and with reduced motion. Tap outside it or press Esc to close. Screen readers hear the same line through a live status region, and the star keeps aria-expanded.
- In the glow picker, unlocked Copper Teal keeps its ring shape but now has a visible teal fill and glow inside, so it no longer looks like a hollow locked swatch. Locked swatches stay outline-only.
- Unlocked Lilac Glow uses a pointed leaf silhouette so the shape reads more clearly as a leaf. Locked Lilac stays an outline.
- Cache `lamplight-v82`; `v82.js` is precached and both offline manifests are byte-recomputed. No new audio, voices or requests.
