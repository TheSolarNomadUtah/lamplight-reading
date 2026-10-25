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
