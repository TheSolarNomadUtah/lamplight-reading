# Optional language packs

The core app is English and Spanish. Extra languages are optional packs in this folder. The core opens with none, and the language picker only shows a pack once it is present.

## A pack folder

```
packs/pt/
  pack.json
  ui.json
```

`packs/index.json` lists pack codes, for example `{"packs":["pt"]}`. The core ships `{"packs":[]}`.

`pack.json` shape:

```
{
  "code": "pt",
  "name": "Português",
  "hasPhonics": false,
  "reviewed": true
}
```

- `code` must match the folder name.
- `reviewed` must be true before the pack is offered. Unreviewed drafts stay out of the index.
- `hasPhonics` is true only after a native speaker has reviewed letter and reading content. Until then, letter games stay hidden and stories stay in English, as they do for UI-only languages today.
- `ui.json` is a dictionary of English source strings to translated UI labels, same shape as `lang/es.json`.

Do not add a pack to the core “Save everything” list (15 MiB). Families keep packs separately. The Seed can copy a pack folder in and register it, but the core Seed must still open with no packs.

Phonics, letter names, and stories must not ship from unreviewed machine translation. New recorded voices need Ignacio’s own approval; prefer synthesized audio.

This file is not part of the offline save.
