# Licenses

This is a plain-language map of the licenses that apply to Lamplight Learning (lamplightlearn.org). It does not replace the legal texts.

- The full GNU General Public License, version 3, is in [LICENSE](LICENSE).
- The full Creative Commons Attribution-ShareAlike 4.0 International legal code is in [LICENSE-CONTENT](LICENSE-CONTENT).

We do not relicense anything we do not own. Works listed under Exceptions keep the licenses and credits they already have.

## App code — GPL-3.0-or-later

All app code (JavaScript, HTML, CSS, the service worker, and tools) is licensed under the GNU General Public License, version 3 or later.

Copyright (C) 2026 Ignacio Valero / Lamplight Learning.

## Original stories, art, lessons, and lyrics — CC BY-SA 4.0

Original stories, art (including code-drawn companions and patterns), lessons, and lyrics written for Lamplight are licensed under Creative Commons Attribution-ShareAlike 4.0 International.

Please credit: Lamplight Learning (lamplightlearn.org).

## Exceptions

These keep their own licenses. Credits already shown in the app stay as they are.

### Quiet Gallery — core (`gallery/core/manifest.json`)

- Perspectiva Corporum Regularium, plates F.III and F.VI. Wenzel Jamnitzer (design) and Jost Amman (etchings), 1568. Public domain. Scan: The Metropolitan Museum of Art, Open Access (CC0).
- Harmonices Mundi, platonic solids plate. Johannes Kepler, 1619. Public domain. Scan: Internet Archive / Wikimedia Commons.
- Entdeckungen über die Theorie des Klanges, Tab. VIII, IX, and X. Ernst Florens Friedrich Chladni, 1787. Public domain. Scan: e-rara / Wikimedia Commons.
- Bark 014. ambientCG (Lennart Demes / ambientCG.com), 2024. CC0 — credit appreciated, not required.
- Rogland Clear Night. Greg Zaal (Poly Haven), 2024. CC0, credit appreciated, not required. Tone-mapped from the CC0 HDRI; the site's example-render preview is not used.
- Metamorphosis insectorum Surinamensium, Plate 11 (moth life cycle). Maria Sibylla Merian, 1705. Public domain. Scan: Minneapolis Institute of Art / Wikimedia Commons.

### Quiet Gallery — app pack (`gallery/app-pack/manifest.json`)

- Kunstformen der Natur, Plate 91 (Spumellaria). Ernst Haeckel; lithograph by Adolf Giltsch, 1904. Public domain. Scan: Wikimedia Commons.
- The Phantom Galaxy Across the Spectrum (M74). ESA/Webb, NASA & CSA, J. Lee and the PHANGS-JWST Team; ESA/Hubble & NASA, R. Chandar; acknowledgement: J. Schmidt, 2022. CC BY 4.0.

### Star and sky data

- `stars.json` (Star songs light curves): NASA Kepler mission, Quarter 1 long-cadence PDCSAP flux, from the Mikulski Archive for Space Telescopes (MAST). Courtesy of NASA and the Kepler Science Team. Downloaded 2026-10-24, then normalized and averaged. This is U.S. government data kept under its own terms; it is not relicensed as CC BY-SA 4.0.
- Look Up star places and brightness (`sky/stars.min.json` and related figures): a small copy of the HYG Star Database (v4.4, Astronomy Nexus, codeberg.org/astronexus/hyg), used under CC BY-SA 4.0. Positions are for the year 2000. Already credited in the app.
- Stick-figure constellation lines follow Stellarium's modern sky culture data (skycultures/modern), Text and data CC BY-SA 4.0. Stellarium's illustrations (Free Art License) are not used.
- Sky math (`sky/sky.min.js`) is original Lamplight code by Professor Pi, under the project's GPL-3.0-or-later. Sun, Moon and planet positions follow Paul Schlyter's published method, "How to compute planetary positions" (stjarnhimlen.se); no code was copied.
- Planet facts in Look Up follow NASA, as already credited in the app.
- Official constellation and star names follow the International Astronomical Union, including the IAU WGSN 2024 name Solitaire.
- The Noctua note in Look Up cites Jamieson, *A Celestial Atlas* (1822), Burritt’s 19th-century atlases, Ian Ridpath, *Star Tales*, HYG v4.4, and the IAU. Jamieson and Burritt are public-domain atlases. Ridpath’s *Star Tales* is a modern work that keeps its own rights and is cited only as a source.

### Fonts

- Playwrite US Trad (`fonts/cursive.woff2`). Copyright 2023 The Playwrite Project Authors. SIL Open Font License, Version 1.1. The license text is in `fonts/PlaywriteUSTrad-OFL.txt`.

### Word lists

- Word Ladder lists in `games-data.json` are based on the ENABLE word list (public domain), intersected with common English words and then filtered for children. ENABLE stays public domain.

### Songs and musical works

Traditional or public-domain songs and rhymes (the well-known words and melodies; recordings are listed separately):

- Twinkle, Twinkle, Little Star
- Row, Row, Row Your Boat
- Hey Diddle Diddle
- Mary Had a Little Lamb (credited “Traditional” in the app)
- Other well-known public-domain tunes used in Melody Echo or Sound Lab, including Hot Cross Buns, Frère Jacques, London Bridge, Ode to Joy, and Für Elise

Original songs and chants written for Lamplight are CC BY-SA 4.0, with credit to Lamplight Learning (lamplightlearn.org):

- Hello, Hello
- Clap, Clap, Pat
- Who Says Moo?
- Mmm, Moon
- Sam and the Cap
- The Little Lamp
- Five Little Stars

### Audio samples (not voice recordings)

- Interface and page sounds: Kenney (kenney.nl), CC0.
- Some chimes and sparkles made for Lamplight from simple harmonic ratios (3:2, 5:4), already documented as CC0.
- Piano: Upright Piano KW by FreePats (Gonzalo & Roberto), CC0.
- Drums: FreePats World Percussion (Xavimart, Gonzalo, Roberto; congas from the Versilian Community Sample Library), CC0.
- Bells: Versilian Community Sample Library (VCSL) Vibraphone, soft mallets, CC0.

### Audio voices and recordings

These are not relicensed here. Unless a source is already documented, their license is to be confirmed by the owner.

- Speech clips in `audio/<voice>/` (including heart, nicole, puck, dora, alex, and the other shipped Kokoro voice folders) were pre-recorded with Kokoro-82M (Apache-2.0), as already documented in the project README. These AI-made clips stay under their own model terms and are not licensed as CC BY-SA 4.0, pending Ignacio’s decision.
- Earlier singing experiments used SoulX-Singer (Apache-2.0) with Kokoro-82M voice timbres, also documented in the README. Those experiments stay under their own model terms and are not licensed as CC BY-SA 4.0, pending Ignacio’s decision.
- The nine Luna mixes in the app (Twinkle, Row, Hey Diddle Diddle, Hello, Clap, Sam and the Cap, The Little Lamp, Five Little Stars, and Mary) are QA mixes, played as recorded, and the singer is shown as Luna. These recordings are AI-made audio. They stay under their own model terms and are not licensed as CC BY-SA 4.0, pending Ignacio’s decision.

### Song list (every song in the app)

This table lists each song or sung rhyme the app plays or shows. Origins are taken only from credits already in the repo (`music-data.js`, this file, and in-app credit lines). Where a recording is an AI-made Luna mix, that audio stays under its own model terms and is **not** licensed as CC BY-SA 4.0; Ignacio has not yet decided whether those clips should be under CC BY-SA (“Im not sure,” 13 Nov 2026). The same is true of Kokoro-82M and SoulX-Singer speech clips in `audio/<voice>/`. Until he decides, those recordings keep their model terms, and this is pending his decision.

| Title | Origin | Source file |
| --- | --- | --- |
| Twinkle, Twinkle, Little Star | Public domain / traditional tune (words and melody), as already listed in this file. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/twinkle_luna.mp3`, `audio/sing/twinkle_luna.opus`; words and notes in `music-data.js` (id `m1`); also `audio/sing/songs.json` |
| Row, Row, Row Your Boat | Public domain / traditional tune (words and melody), as already listed in this file. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/row_luna.mp3`, `audio/sing/row_luna.opus`; `music-data.js` (id `m2`); also `audio/sing/songs.json` |
| Hey Diddle Diddle | Public domain / traditional tune (words and melody), as already listed in this file. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/hey_diddle_luna.mp3`, `audio/sing/hey_diddle_luna.opus`; `music-data.js` (id `m3`); also `audio/sing/songs.json` |
| Hello, Hello | Original Lamplight chant, listed in this file as CC BY-SA 4.0 for the words. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/hello_luna.mp3`, `audio/sing/hello_luna.opus`; `music-data.js` (id `m4`); also `audio/sing/songs.json` |
| Clap, Clap, Pat | Original Lamplight chant, listed in this file as CC BY-SA 4.0 for the words. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/clap_luna.mp3`, `audio/sing/clap_luna.opus`; `music-data.js` (id `m5`); also `audio/sing/songs.json` |
| Who Says Moo? | Original Lamplight chant, listed in this file as CC BY-SA 4.0 for the words. There is no Luna mix of this chant in the app. | `music-data.js` (id `m6`); also `echo.js` (id `e3`) |
| Mmm, Moon | Original Lamplight chant, listed in this file as CC BY-SA 4.0 for the words. There is no Luna mix of this chant in the app. | `music-data.js` (id `m7`) |
| Sam and the Cap | Original Lamplight chant, listed in this file as CC BY-SA 4.0 for the words. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/sam_and_the_cap_luna.mp3`, `audio/sing/sam_and_the_cap_luna.opus`; `music-data.js` (id `m8`); also `audio/sing/songs.json` |
| The Little Lamp | Original Lamplight song, listed in this file as CC BY-SA 4.0 for the words. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/little_lamp_luna.mp3`, `audio/sing/little_lamp_luna.opus`; `music-data.js` (id `m9`); also `audio/sing/songs.json` |
| Five Little Stars | Original Lamplight chant, listed in this file as CC BY-SA 4.0 for the words. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/five_little_stars_luna.mp3`, `audio/sing/five_little_stars_luna.opus`; `music-data.js` (id `m10`); also `audio/sing/songs.json` |
| Mary Had a Little Lamb | Public domain / traditional tune, credited “Traditional” in the app and already listed in this file. The sung Luna mix is AI-made audio under its own model terms, not CC BY-SA, pending Ignacio’s decision. | `audio/sing/mary_luna.mp3`, `audio/sing/mary_luna.opus`; `music-data.js` (id `m11`); also `audio/sing/songs.json` |
| Hot Cross Buns | Public domain / traditional tune, as already listed in this file for Melody Echo or Sound Lab. Played from notes in code; no separate audio file. | `v32.js` (id `hcb`) |
| Frère Jacques | Public domain / traditional tune, as already listed in this file for Melody Echo or Sound Lab. Played from notes in code; no separate audio file. | `v32.js` (id `frere`) |
| London Bridge | Public domain / traditional tune, as already listed in this file for Melody Echo or Sound Lab. Played from notes in code; no separate audio file. | `v32.js` (id `lon`) |
| Ode to Joy | Public domain / traditional tune, as already listed in this file for Melody Echo or Sound Lab. Played from notes in code; no separate audio file. | `v32.js` (id `ode`) |
| Für Elise | Public domain (Beethoven), as already listed in this file for Sound Lab. Played from notes in code (Fourier / Web Audio); no separate audio file. | `v44.js`, `v46.js` (id `elise`) |

No other sung titles are documented in the shipped song lists. If a further tune is found without a credit in the repo, its origin should be written “origin unconfirmed (Ignacio checking)” until he confirms it.

### Pictures inspired by public-domain works

The Shell, Owl, and Moth pictures take a little inspiration from two public-domain works: Ernst Haeckel, *Kunstformen der Natur* (1904), and John James Audubon, *The Birds of America*, plate 171, “Barn Owl” (1833, engraved by Robert Havell Jr.). The marks are original, drawn from code, not traced from those plates. The Lamp’s Inner light form and the other Inner light friends are original pictures, drawn from code. Those original pictures are CC BY-SA 4.0, with credit to Lamplight Learning (lamplightlearn.org).
