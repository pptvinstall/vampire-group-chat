# Notes for AI agents working in this repo

Read `HANDOFF.md` first, then `STATUS.md`. `README.md` has the working rules.

- JWood is the showrunner. Do not change dialogue, characters, scene order or approved images without his say-so.
- `board/data.js` is the source of truth for the shot breakdown. Prompt files in `02_prompts/` and `03_ep01/SHOT_LIST.md` are generated from it.
- After changing `board/data.js` or `board/prompts.js`, run `node board/check.js`, `node board/build.js` and `node board/gen_md.js`.
- Video clips are not stored in this repo. Approved images are.
- When something is made or approved, update `STATUS.md`.
