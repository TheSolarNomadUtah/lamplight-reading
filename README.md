# Lamplight Learning

Lamplight is a calm, offline-first app for early reading, stories, sound, music, drawing, and quiet looking. It collects no personal data. Kids can use it with no account and no connection after the first visit (or after someone uses “Save everything”).

Live site: https://lamplightlearn.org

This README is for a future maintainer. It is not a changelog. The older version-by-version notes from v191 and earlier are archived at `_archive/v192/README-v191-changelog.md`.

## What you need to know first

- **No outside requests.** The app must run from its own files. Do not add analytics, fonts, CDNs, or any call to a host other than the app itself.
- **Full content is English and Spanish only.** Other language files may exist as stubs or packs, but core “Save everything” and the shipped experience stay EN and ES.
- **Voices and new recordings ship only with Ignacio’s approval.** Do not add, replace, or retune a voice, a sung mix, or a speech clip unless he has said yes.
- **Spanish strings stay frozen** unless he asks for a wording change.
- **Nothing ships until Ignacio says to ship** (or, for this v192 work, until he OKs the ship after PUSH_READY).

## How to run it locally

From this folder:

```bash
python3 -m http.server 8880 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8880/`. Use a local server, not a random public port. A service worker will install on that origin.

To try a copy that is already zipped for offline use, see “Offline zip” below.

## How to run it offline

There are three ordinary ways:

1. **The live site, after a first online visit.** The service worker precaches the core app (one audio format per device, Opus or MP3). “Save everything” on Grown-ups stores the rest in `lamplight-extra`.
2. **A local folder on a small server.** Unzip `lamplight-v192-offline.zip` (built by the script under `/workspace/audit-v192/release/`) and run the `start.sh` (or `python3 -m http.server`) inside that folder. The app should open and work with no network beyond that server.
3. **A plain folder (file://).** Opening `index.html` directly can work for many screens because the files are all there, but service workers do not run on `file://`, and some browsers restrict `fetch` of local files. Prefer a local server when you can.

The app also calls `navigator.storage.persist()` quietly (feature-detected, never throws, no extra UI) so a browser is less likely to evict saved offline content. The browser may still show its own permission prompt; we do not add another.

## License and credits

- **Code** is GNU GPL 3.0 or later. The legal text is in `LICENSE`. Copyright (C) 2026 Ignacio Valero / Lamplight Learning.
- **Original stories, art, lessons, and lyrics** are CC BY-SA 4.0. The legal text, then the plain-language third-party map (formerly `LICENSES.md`, copied word for word), is in `LICENSE-CONTENT`.
- **Machine-readable provenance** for shipped files is in `credits.json`. If a source is not already documented, that row says `unknown`. Do not guess. The credits people already see in the app must stay as they are.

## Release process

Each visible release is one new version `N`:

1. Start from the live commit (the current `main`). Use a new worktree and branch `vN`.
2. Add work as a new last script `vNN.js` when you can. Older `vNN.js` files stay frozen. Since v191, many IIFE-only overrides live in concat bundles (`v119-129.js` … `v184-185.js`); the originals sit in `_archive/`. Do not use `eval`. See `docs/HANDOVER.md`.
3. Bump all of these together:
   - `const APP_VERSION=N` in `index.html`, and a `<script src="vNN.js">` if you added one
   - `version.json` → `{"version":N}`
   - `sw.js`: `const C='lamplight-vN'`, and add the new file to the `F` precache list
4. Keep the service-worker rules in `sw.js` (never delete a newer `lamplight-vNN` cache; refill `./` and `index.html` at install, activate, and online loads; offline fallback searches every cache). That is LESSON 23.
5. Regenerate the offline manifests:
   ```bash
   python3 tools/gen_offline.py
   ```
   This writes `offline.json` (MP3 devices) and `offline-opus.json` (Opus devices). Measure the real per-device download (precache + each “Save everything” list) before you quote a size change. That is LESSON 21. Do not count files on disk that a device would not fetch.
6. Run the pre-ship checks:
   ```bash
   bash tools/preship.sh
   python3 -c "import json,sys; [json.load(open(p)) for p in ['lang/es.json']]"
   node --check sw.js v192.js
   ```
   `preship.sh` already JSON-parses `lang/*.json` and runs `node --check` on the versioned scripts.
7. Run the full gate set (the current runner lives next to the audit folder for this version, copied forward from v191): smoke, companions, parity, back, seatbelt, pack-loader, looks-defer, Language card, Share nowrap, Paint ink and crash-loop, mute, C4/C5, deep-checks, Music Box and real taps, audio formats, sw-wipe T1/T2, upgrades from the previous versions, C9 contrast, visual-center, hub-icons, idle-no-navigate, footer-clear, credit-repeat, server-404, and a golden pixel/text/tap compare against a same-day baseline of the previous live version. Unexpected golden diffs must be 0. Use at most two browser workers. Ports for this release start at 8880.
8. Commit on the version branch. **Do not push until Ignacio OKs the ship.** Then, and only then, `git push origin <commit>:main`.
9. After a live push: check `version.json`, the service-worker cache name, the Version line on Grown-ups, and an offline reload after an upgrade from the previous version. Update `/workspace/team/STATUS.md` and write a QA note.

If a release is bad, follow `/workspace/team/RUNBOOK.md`. Roll back by shipping a *higher* cache version whose tree equals the last good tag, so phones already on the bad worker will update.

## Tests and lessons

- Permanent lessons (how we got hurt, and the rule that would have caught it) are in `/workspace/team/LESSONS.md`. Read them before you build, check, or approve anything.
- Gate scripts for recent releases live under `/workspace/audit-vNN/gates/` (and a few older ones under `/workspace/audit-v187/` and `/workspace/audit-bugs189/`). The official golden tools are `/workspace/golden-v187/tools/`.
- Look at pixels, not only boxes. Test light and dark, 390 and 1280. A kid action has to be a real tap, not only a test hook (LESSON 12).

## Offline zip

The script `/workspace/audit-v192/release/build-offline-zip.sh` builds `lamplight-v192-offline.zip`. It is a local artifact. Do not publish a GitHub release or upload the zip unless Ignacio asks. Seed publishing is on hold.

## Architecture in brief

See `docs/HANDOVER.md` for the stacked IIFE / bundle layout, the cache names, where the gates live, and the known open items.
