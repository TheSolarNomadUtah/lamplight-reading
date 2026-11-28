# Lamplight handover

This note is for the next person who has to change, test, or roll back the app. It describes the tree as of v192 (cleanup part 4) on top of live v191 (`5f97aae`).

## What the app is

A static site: HTML, JavaScript, CSS, images, and audio. No server-side code. GitHub Pages serves https://lamplightlearn.org from `main` of `TheSolarNomadUtah/lamplight-reading`. Kids use it offline after a first visit. There is no account and no analytics.

## Architecture: stacked IIFEs and bundle segments

For a long time every release added a new `vNN.js` at the end of `index.html`. Later files wrap or override earlier functions. That stack is the source of truth: the last script to define or wrap a function wins.

Cleanup part 3 (v191) concatenated **IIFE-only** override segments so the load list is shorter, without using `eval`:

- `v119-129.js`, `v131-132.js`, `v133-135.js`, `v137-145.js`, `v147-164.js`, `v165-174.js`, `v175-183.js`, `v184-185.js`

The original files are in `_archive/v191/` (and earlier `_archive/` folders). They are not served. Jekyll / GitHub Pages does not publish `_` directories.

Some files are **not** in those bundles and must stay their own tags:

- Non-IIFE files in the v76–v111 range that share lexical bindings (for example anything that would trip a TDZ if it were concatenated the same way — historically `ghTrim92` / `ghTrim100`).
- `companions-v167.js` is still its own script.
- Frozen later files such as `v186.js` … `v191.js`, then `v192.js` last.
- Named modules (`pack.js`, `math.js`, Music Box, looks, and so on) stay separate.

**LESSON 12:** an IIFE’s private `onclick` can skip a later hook. Kid-path tests must click the real control and check pixels. Do not put new behavior only behind a test hook.

**LESSON 19:** if you wrap `renderHub`, also assign `RENDER.hub` to the same wrap, and re-attach after `load` / boot reveal.

v192 itself is a small last file: it calls `navigator.storage.persist()` quietly, and it points the Grown-ups license links at the two remaining license files. It does not change the visible credit wording.

## Service worker cache rules

File: `sw.js`.

- The cache name is `const C='lamplight-vNN'` (v192: `lamplight-v192`). A new release must bump this, `APP_VERSION`, and `version.json` together.
- `F` is the precache list. Audio in `F` is split by format: the worker stores one of Opus or MP3 in `lamplight-fmt` and remembers the choice (`__afmt189`).
- **LESSON 23:** never delete a *newer* `lamplight-vNN` cache. An older worker can activate late; wiping a newer cache leaves the device offline-broken. `coreOk` / `coreFill` make sure `./` and `index.html` are in the main cache at install, at activate, and on online navigations. The offline fallback searches every cache, not only `C`.
- Extra downloaded media lives in `lamplight-extra` (“Save everything”). Language packs would use `lamplight-pack-*`.
- `offline.json` and `offline-opus.json` are the per-format “Save everything” manifests, built by `tools/gen_offline.py`. `_archive/`, `tools/`, `gates/`, dotfiles, and most `.md` files are left out (the content license file is included as `LICENSE-CONTENT`, which is not a `.md`).

## Where the gates live

There is no single in-repo test runner that is the whole ship set. Use the audit runner for the version you are shipping.

- This release: `/workspace/audit-v192/` (copied and ported from `/workspace/audit-v191/`). Ports start at **8880**.
- Shared / older gates still used as-is: `/workspace/audit-v187/` (hub-icons, idle-no-navigate, visual-center ancestry), `/workspace/audit-bugs189/` (C9, footer-clear, credit-repeat).
- Golden capture and compare: `/workspace/golden-v187/tools/capture.js` and `compare.py`. Baseline for v192 is a same-day same-box capture of live v191, kept under `/workspace/audit-v192/golden-v191today`.
- Permanent checks added in v191 and still required: Language card on a first cold Home load with the service worker allowed (`hub-lang-first.js`); Share nowrap; Paint Tools must not erase ink (`paint-tools-ink.js`, LESSON 25); Paint crash-loop breaker (`paint-boot-loop.js`, LESSON 26, `localStorage` only, count `#paint` boots).
- Permanent checks added in v192 (LESSON 27): Paint must restore the session bitmap after Home and back (`paint-home-back.js`, 0 ink lost at 320, 390, 1280); a 390 landscape/back rotate in `paint-tools-ink.js` must not thin the ink (full-resolution master, never shrink); Grow chrome must not leak onto other Patterns units (`grow-chrome-leftover.js`); golden classify may call a bottom-of-page diff a footer shift only if both sides still show the app footer (Online pill), and may allow the v192 license href remaps (`LICENSE.txt` → `LICENSE`, etc.) as `license_hrefs`. A Lamp-glow flake is a rerun, not a blanket allow.
- Pre-ship: `bash tools/preship.sh` (JSON-parse `lang/*.json`, `node --check` on the versioned scripts, manifest shape checks).
- Lessons that explain why those gates exist: `/workspace/team/LESSONS.md`. Rollback: `/workspace/team/RUNBOOK.md`.

Run at most two Playwright workers. Write down every browser profile you create, and delete only those (LESSON 21 / C11 — the second rule 21). Kill only processes you started.

## Release process (short)

See the README. In one line: bump `vNN.js` + `sw.js` `C` + `F` + `APP_VERSION` + `version.json`, run `gen_offline.py`, run preship, run the full gate set and the golden compare (0 unexpected diffs), measure real precache and “Save everything” bytes (LESSON 21), commit, and **wait for Ignacio before you push**.

## Known open items

- **AI audio and traditional-song relicensing.** Ignacio has not decided whether Kokoro / SoulX / Luna mixes should be CC BY-SA 4.0 (“Im not sure,” 13 Nov 2026). Until he does, those recordings keep their model terms. That is already written in `LICENSE-CONTENT` and in `credits.json`.
- **`sky/cities.min.json`.** No existing credit file names this path, so `credits.json` lists it as `unknown`. Do not invent a source.
- **Seed publishing is on hold.** The offline zip is built and tested locally under `/workspace/audit-v192/release/`. Do not publish a GitHub release or upload the zip unless Ignacio asks. Where the public Seed copy should live (site, GitHub, Internet Archive) is still his call.
- **Spanish review, and any voice change,** still wait on him.
- **Part 3 leftovers.** `companions-v167.js` remains a separate tag on purpose. Do not fold non-IIFE files into a bundle just to shorten the list.
- **Golden flakes.** Pixel compares can flake on Lamp glow and tight 390 layout. If a Grow or Kids screen diffs, recapture that screen before treating it as a product bug. Grow must match the previous live version at 0 px when the layout is unchanged.
- **`gates/calm-meter`** in a worktree is a local tool. Recent releases left it out of the ship commit.
- The long historical README was replaced in v192 with a maintainer guide. The old changelog is in `_archive/v192/README-v191-changelog.md`.

If something here is wrong, fix the note in the same change that fixes the code, and add a lesson if a kid was hurt.
