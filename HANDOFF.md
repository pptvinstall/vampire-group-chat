# Handoff — The Vampire Group Chat, Episode 1

Written November 10, 2026, at the end of the first production session. For whoever picks this up next (Codex or anyone else).

## The short version

Episode 1, "New Blood, Who Dis?", is a 2:51 vertical animated short. The script is locked (V7). The plan: ChatGPT makes every image, Google Flow animates each approved image into a short clip, and the clips get edited into one MP4 with music from JWood.

The look is locked and the pipeline is proven on three test shots. What remains is volume: 4 plates, 36 stills, 49 clips, then the edit.

JWood is the showrunner. He approves every image and clip. He works fast, wants prompts he can paste, and likes multiple-choice questions.

## What is done

### Decisions (all JWood's)

- ChatGPT makes images only. Google Flow makes video. Other tools come later if these fall short.
- Every clip starts from an approved still. No video from text alone.
- One speaker per clip. Two-person moments are shot over the shoulder so only one mouth is on camera.
- Cast sheets were redrawn in ChatGPT in one look, one character per prompt.
- The cast look is more cartoon than the "grounded" wording in `00_bible/STYLE_AND_IDENTITY.md`. JWood loves it. The approved sheets win over that wording.
- JWood supplies the music.
- He chose to upgrade from Google AI Plus to Google AI Pro for one month to finish the clips. Not confirmed done yet.

### Approved assets

| Asset | Where | Notes |
|---|---|---|
| Cast sheet, Daymondre | `01_cast/approved_sheets/Daymondre_sheet.png` | The style anchor. Includes his vampire face. |
| Cast sheet, Stefon | `01_cast/approved_sheets/Stefon_sheet.png` | |
| Cast sheet, Eiesha | `01_cast/approved_sheets/Eiesha_sheet.png` | |
| Cast sheet, Bianca | `01_cast/approved_sheets/Bianca_sheet.png` | Hair is down and wavy (changed from the old reference). |
| Cast sheet, Marquell | `01_cast/approved_sheets/Marquell_sheet.png` | Second version, restyled to match the cast. Grill uniform only. |
| Cast sheet, Vanesha | `01_cast/approved_sheets/Vanesha_sheet.png` | |
| Plate L2, school hallway | `03_ep01/plates/L2_school_hallway.png` | |
| Plate L4, grill interior | `03_ep01/plates/L4_grill_interior.png` | |
| Plate L5, parking lot at night | `03_ep01/plates/L5_parking_lot_night.png` | Its side door matches the door inside L4. |
| Still 02D, Stefon in the hallway | `03_ep01/stills/02D.png` | His eyes start camera-right; the clip turns him camera-left. |
| Still 05B, Daymondre at the booth | `03_ep01/stills/05B.png` | |
| Still 08C, Vanesha at her car | `03_ep01/stills/08C.png` | Car sits closer to the building than in the plate. Fine for a close-up. |

### Test clips (Google Flow)

Clips are kept in Google Drive, not in this repo.

| Clip | Model | Result |
|---|---|---|
| 02D-1, Stefon, "I can hear you." | Omni 1.2 Flash, 4s, 12 credits | Approved by JWood: face holds, line and voice right. |
| 05B-1, Daymondre, lemon-pepper line | 8s; model not confirmed | Face and outfit hold. Camera pushes in more than asked. JWood has not yet confirmed the line and voice. |
| 08C-1, Vanesha, "Need you to stop sneaking up on people." | 6s | Face and outfit hold. Keys and phone change hands and duplicate. A retry prompt with fixed props was given to JWood. He has not yet confirmed the line and voice. |

Measured voice pitch, for comparing later clips: Stefon about 113 Hz, Daymondre about 96 Hz, Vanesha about 216 Hz.

### What was built

- This repo: bible, cast references, approved images, prompts, shot list, status, board source.
- A Google Drive folder, "The Vampire Group Chat", inside JWood's Business folder, mirroring the repo plus two of the three test clips.
- An interactive shot board (a private page in JWood's Claude account) built from `board/`. `board/index.html` is the same page; open it in a browser.
- The shot breakdown in `board/data.js`: 12 scenes, 7 plates, 39 stills, 52 Flow clips (42 talking, 10 silent), 4 edit-only moments. `node board/check.js` proves every V7 line is covered exactly once.

## What the test taught us

1. **Faces hold on Omni 1.2 Flash** when the clip starts from an approved still. This was the main failure in every earlier attempt.
2. **Veo 3.1 Fast blocked Daymondre** with a "prominent people" error and only makes 8-second clips. Omni 1.2 Flash makes 4- and 6-second clips. Run everything on one model.
3. **Tell Flow the character is an original cartoon, not a real person.** That line is now in every clip prompt.
4. **Lock the camera.** "Very slow push-in" turned into a big zoom. Prompts now say locked camera, no zoom.
5. **Props drift.** Anything held must be told to stay in the same hand. Prefer one prop per shot.
6. **ChatGPT works best with self-contained prompts**: say what to attach, say "identity from the sheet, layout from the plate", give framing and moment, then rules. Attach the plate and the character sheet with every still.
7. **Attach the Daymondre sheet as a style reference** when a new image drifts toward photoreal. For women, add the Eiesha sheet.
8. **Flow output is 720x1280 at 24 fps.** The edit must conform to 1080x1920 at 30 fps.
9. **ChatGPT no longer makes video** (Sora closed in 2026). Perplexity Pro makes only a handful of 8-second clips a month. Neither is a video option.

## What to do next, in order

### 1. Close out the test

- Get JWood's ear on clips 05B-1 and 08C-1: is each line word for word, and does the voice fit?
- Run the Vanesha retry (fixed props, locked camera) if he has not.
- Ask what Flow charged for the 6-second and 8-second clips. Budget estimate: about 12 credits a clip means about 620 credits for all 52, about 940 with retries. Google AI Pro gives 1,000 a month plus 50 a day.

### 2. Finish the plates (4 left)

Prompts are in `02_prompts/02_plates.md`. In this session the plates were made with shorter self-contained prompts and a reference plate attached, which worked well:

| Plate | Attach as reference |
|---|---|
| L1, school exterior, morning | L2 |
| L3, grill storefront, afternoon | L4 and L5 |
| L3D, same storefront at dusk | L3, once approved |
| L6, back service exit, night | L5 |

L3 doubles as shot 04A and L3D as shot 07A. Both are moved in the edit; no video credits.

### 3. Make the stills (36 left)

Prompts are in `02_prompts/03_ep01_stills.md`, one per camera setup, grouped by scene. Go scene by scene so JWood can approve in small batches. Save each approved still to `03_ep01/stills/<ID>.png`.

Special cases:

- **08V** is an edit of approved still 08D: red-amber eyes, faint veins, two small fangs. It is the last frame of the transformation clip 08D-1.
- **08E** (phone on the asphalt) and plates used as shots need no video.
- **10G**, the group chat, is not an image. It is built in the edit so the text is exact.
- Over-the-shoulder stills (03B, 03C, 09B, 12D) show one face only. The other person is back-to-camera.

### 4. Make the clips (49 left)

Prompts are in `02_prompts/04_ep01_clips.md`, in cut order. Each names its start still. Several clips reuse one still (for example 04B feeds three clips).

- Model: Omni 1.2 Flash, vertical 9:16, one output per prompt.
- The prompt lengths are 4, 6 or 8 seconds. If Omni cannot do 8, use the longest it offers; the edit trims to the spoken part anyway.
- **Check voice drift early.** No character has two clips yet. Make a second clip for one character (for example 11B-1, Stefon) and compare it to 02D-1 before making the rest. If voices wander too much, the fallback is a separate voice and lip-sync tool. JWood has 155 Higgsfield credits on a Plus plan that his notes say runs to December 9.

### 5. Get the music

Three cues from JWood into `04_music/`:

- A, "Day": scenes 1–7, 0:00–1:40. Warm, laid-back, room for dialogue. About 1:45.
- B, "Night": scenes 8–11, 1:40–2:38. Dark, sparse, sub-heavy. About 1:05.
- C, "Sting": one hit with a 2–3 second tail for the red-eye flash at the end.

WAV preferred, stems if he has them. Only sounds he owns.

### 6. Edit

- Order: `03_ep01/SHOT_LIST.md`.
- Trim each clip to the action and the spoken line. Mute nothing by default; the clip audio carries the dialogue.
- Conform everything to 1080x1920, 30 fps, H.264, AAC.
- Build the group chat (shot 10G) as a graphic. Exact text:
  - Marquell: Vanesha got attacked. I'm with her. Call somebody!
  - Kari: AT CREEKSIDE???
  - Bianca: I'm calling 911. Everybody stay inside.
- Add the SHADOW CREEK HIGH and CREEKSIDE GRILL signs over the blank sign panels.
- Burn in captions inside safe margins and keep a clean master without them.
- Duck music under dialogue. Drop cue B to near silence at the fangs (08D-1). End on a hard cut to black after 12B-2.
- One encoded file per scene, joined with ffmpeg's concat demuxer, is the cheap way to re-render one scene without redoing the whole episode.

### 7. Still open for JWood

1. Voices: keep the model's voices (current default) or add a voice and lip-sync tool.
2. Add a three-second group-chat bubble before scene 1, or keep V7 exactly as written. The show is named for the chat, and in V7 it first appears at 2:06.
3. Where clips live. Claude's Drive connection cannot upload files over about 3 MB, so longer clips need JWood to drop them into the Drive folder himself.

## Things that are easy to get wrong

- `node board/gen_md.js` rewrites `02_prompts/*.md` and `03_ep01/SHOT_LIST.md`. It keeps the status column, so record statuses there by clip ID.
- The old references in `01_cast/old_refs/` are in three different rendering styles. Use them for identity only; the approved sheets are the standard.
- This repo is public. Two documents were left out on purpose: the master production bible (it has an internal table mapping the cast to the show being parodied) and a price guide to video generators (it has account notes). JWood has both.
- First names only, everywhere. No surnames in prompts, file names or on-screen text.
- Do not name any real show or actor in a prompt.
- The 3-shot test only proves three close-ups. Wide shots, two-person frames and the vampire transformation are untested.
