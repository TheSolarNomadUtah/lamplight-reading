# Lamplight gates

These are build gates, not kid-facing app files. They stay out of the Offline Save and the service-worker precache.

## Calm Meter

Thresholds are QA's, from `/workspace/qa/specs/FAMILY_VOICE_AND_CALM_METER.md` (13 Nov 2026).

```
python3 gates/calm-meter/run.py
```

Optional: `CALM_APP=http://127.0.0.1:8765 OUT=/workspace/audit-vNN`. Do not use `ROOT` for the app URL; `tools/preship.sh` already sets `ROOT` to the repo path.

A **FAIL** blocks the release unless it is already listed in `gates/calm-meter/baseline.json` as a known leftover. New FAILs, or leftovers that get worse, fail the build. Known leftovers are listed in the report so they stay visible.

The runner is also called from `tools/preship.sh`.
