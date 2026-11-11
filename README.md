# The Vampire Group Chat

An original stylized 3D animated comedy set in Shadow Creek, Georgia, a fictional suburb of Atlanta. Short vertical episodes (9:16). This repo is the shared production folder for Season 1, Episode 1, "New Blood, Who Dis?"

JWood is the showrunner and has final say on everything. Nothing is approved until he says so.

## Who does what

| Who | Job |
|---|---|
| JWood | Showrunner. Approves every sheet, still and clip. Supplies the music. |
| Claude | Quarterback. Shot list, prompts, checks on every image and clip, group-chat graphics, captions, final edit. |
| ChatGPT | Makes the images: cast sheets, location plates, stills. Punches up jokes. |
| Google Flow (Veo 3.1) | Turns each approved still into a short clip. |

## How a shot moves

1. ChatGPT makes the image from a prompt in `02_prompts/`.
2. Claude checks it against `00_bible/`. JWood approves.
3. The approved image goes into this repo under its ID.
4. Flow animates the approved still using the clip prompt.
5. Claude checks the clip, JWood approves, and it goes into the edit.

## Where things are

| Folder | What is in it |
|---|---|
| `00_bible/` | The Episode 1 script (V7), the style and identity bible, and the continuity rules. Source of truth. |
| `01_cast/old_refs/` | Earlier character references. Use for identity only: they are in mixed rendering styles. |
| `01_cast/approved_sheets/` | New cast sheets in the one locked look. Empty until JWood approves each one. |
| `02_prompts/` | Copy-paste prompts: ChatGPT kickoff, cast sheets, plates, stills, Flow clips, joke punch-up. |
| `03_ep01/SHOT_LIST.md` | Every shot in cut order with a status column. |
| `03_ep01/plates/`, `03_ep01/stills/` | Approved images, named by ID (`L2.png`, `02D.png`). |
| `04_music/` | JWood's cues: A (day), B (night), C (sting). |
| `board/` | Source for the interactive shot board. `data.js` holds the shot breakdown; the prompt files are generated from it. |
| `STATUS.md` | Where the production stands and the decisions made so far. |
| `HANDOFF.md` | Full handoff notes: what is done, what was learned, and the next steps in order. Start here. |

## Rules for anyone, human or AI, working here

1. First names only: Eiesha, Bianca, Stefon, Daymondre, Marquell, Vanesha, Kari.
2. One look: grounded, expressive, cinematic stylized 3D animation. Not photoreal, not anime.
3. Characters wear one outfit all episode. The story happens in one day.
4. No readable text inside generated images or video. Signs, phone screens and the group chat are added in the edit.
5. One speaker per clip. Two-person moments are shot over the shoulder.
6. Do not change dialogue, add characters or reorder scenes without JWood's say-so.
7. These are original characters. Nothing is based on a real actor, and no footage, music or logos from any existing show are used.
8. When you finish something, update `STATUS.md` and the status column in `03_ep01/SHOT_LIST.md`.

## Changing the shot breakdown

Edit `board/data.js`, then run:

```
node board/check.js   # confirms every script line is covered once and every clip has a still
node board/build.js   # rebuilds board/index.html
node board/gen_md.js  # regenerates 02_prompts/*.md and 03_ep01/SHOT_LIST.md (resets the status column; re-apply statuses from STATUS.md)
```
