// Prompt builders shared by the page and the checker.
const STYLE = "Grounded, expressive, cinematic stylized 3D animation. Soft geometric faces, expressive eyes, smooth but real skin shading, believable fabric. Not photoreal, not live-action, not anime, not flat illustration.";

function plateById(B, id) { return B.plates.find(p => p.id === id); }
function allStills(B) { return B.scenes.flatMap(sc => sc.stills.map(s => ({ ...s, scene: sc.n }))); }
function stillById(B, id) { return allStills(B).find(s => s.id === id); }
function allCuts(B) { return B.scenes.flatMap(sc => sc.cut.map(c => ({ ...c, scene: sc.n }))); }

function kickoffPrompt(B) {
  const C = B.chars;
  return [
    "You are the still-image artist for THE VAMPIRE GROUP CHAT, an original stylized 3D animated comedy set in Shadow Creek, Georgia, a fictional suburb of Atlanta.",
    "",
    "The cast is Eiesha, Bianca, Stefon, Daymondre, Marquell and Vanesha. We build one character sheet for each in this chat first. Once I approve a sheet, it is the only source of truth for that character's face, hair, skin tone, glasses, jewelry and outfit.",
    "",
    "Rules for every image in this chat:",
    "1. One look only: " + STYLE,
    "2. Never redesign anyone. No added tattoos, facial hair, accessories, hairstyles or outfit changes. Everyone wears the same clothes all episode, because the story happens in one day.",
    "3. Vertical 9:16, framed for a phone screen. Keep heads and hands out of the top and bottom 10% of the frame.",
    "4. No readable text of any kind: no signs, captions, phone-screen text, logos or watermarks. Leave sign panels and phone screens blank. Text gets added later in the edit.",
    "5. One single frame per prompt. Never a grid, a collage or multiple panels. The only exception is a prompt labelled CHARACTER SHEET.",
    "6. Only the characters I name appear in the foreground. Background people stay blurred and faceless.",
    "7. These are original characters. Do not base anyone on a real actor or on an existing show.",
    "8. I will send prompts labelled CHARACTER SHEET, PLATE or STILL with an ID. Reply with the image and repeat the ID. If something in a prompt conflicts with the character sheets, the sheets win; tell me what you changed.",
    "",
    "Identity locks:",
    "- " + C.S.lock,
    "- " + C.D.lock,
    "- Marquell wears the Creekside Grill dark polo and burgundy apron in every image. Vanesha is his older sister: family resemblance, not the same face.",
    "- Bianca is East Asian-American. Eiesha, Stefon and Daymondre are Black. Marquell and Vanesha are Latino. Skin tones never shift between images.",
    "",
    "Reply \"Locked in\" and wait for the first prompt."
  ].join("\n");
}

function sheetPrompt(B, sh, i) {
  const C = B.chars, ch = C[sh.k], first = i === 0;
  const lines = [
    "CHARACTER SHEET — " + ch.name + " (" + (i + 1) + " of " + B.sheets.length + ")",
    first
      ? "Update to the kickoff: we are making the six character sheets here first, one at a time. A prompt labelled CHARACTER SHEET is the one exception to rule 5."
      : "Same recipe as the Daymondre sheet. A prompt labelled CHARACTER SHEET is the one exception to rule 5.",
    "",
    "ATTACHED: " + sh.ref + " (old reference for " + ch.name + ")" + (first ? "." : ", plus the approved new Daymondre sheet as the style reference."),
    "Use the old reference for identity only: face shape, features, skin tone, hair and build. Redraw " + ch.name + " in our locked look: " + STYLE,
    first
      ? "This sheet sets the look for the whole cast, so get the shading and proportions right here."
      : "Match the approved Daymondre sheet exactly for rendering style, skin shading, eye size and body proportions, so the cast looks like one show. Different person, same show.",
    "",
    "WHO: " + ch.look,
    "OUTFIT (the only one, worn all episode): " + sh.outfit,
    "",
    "LAYOUT: one landscape 3:2 image on a plain mid-gray studio background.",
    "- Left: full body, front view, relaxed neutral stance.",
    "- Center: large face close-up, neutral expression.",
    "- Right: three smaller full-body views: three-quarter, side and back.",
    "- Bottom row: five head-and-shoulders expressions: " + sh.faces + "."
  ];
  if (sh.extra) lines.push("- " + sh.extra);
  lines.push("");
  lines.push("RULES:");
  lines.push("- The same face, hair and outfit in every panel.");
  lines.push("- No text, labels, names, captions or logos anywhere on the sheet.");
  lines.push("- An original character. Not based on any real actor or existing show.");
  if (ch.lock) lines.push("- " + ch.lock);
  lines.push("- " + sh.drop);
  return lines.join("\n");
}

function platePrompt(B, p) {
  return [
    "PLATE " + p.id + " — " + p.name,
    "Vertical 9:16 location plate. No characters in the foreground. No readable text anywhere.",
    "Style: " + STYLE,
    "",
    p.desc,
    "",
    "This is a locked set. Every later still in this location must match this layout, these colors and this lighting."
  ].join("\n");
}

function stillPrompt(B, s) {
  const C = B.chars;
  const p = plateById(B, s.plate);
  if (s.custom === "vamp") {
    return [
      "STILL 08V — edit of the approved STILL 08D (attach 08D).",
      "Change only three things:",
      "1. His irises become red-amber.",
      "2. Faint dark veins appear under both eyes.",
      "3. His lips part to show two small fangs.",
      "Everything else stays identical: same face shape, goatee, skin tone, hair, leather jacket, gold bat pendant, framing and lighting.",
      "No blood, no wounds, no text. Vertical 9:16."
    ].join("\n");
  }
  const who = (s.who || []).map(k => "- " + C[k].name + ": " + C[k].look);
  const back = (s.back || []).map(k => "- " + C[k].name + ", back to camera: we see only " + s.backNote);
  const inFrame = s.inFrame ? ["- " + s.inFrame] : who.concat(back);
  const keys = (s.who || []).concat(s.back || []);
  const rules = [
    "Only the people listed above appear in the foreground. Background people stay blurred and faceless.",
    "No captions, signs, logos or readable text. Phone screens and sign panels stay blank.",
    "No outfit, hair or skin-tone changes from the character sheets."
  ];
  if (keys.includes("S")) rules.push(C.S.lock);
  if (keys.includes("D")) rules.push(C.D.lock);
  const attach = ["plate " + s.plate].concat(keys.map(k => C[k].name + " sheet"));
  return [
    "STILL " + s.id + " — vertical 9:16, one single frame.",
    "Attach with this prompt: " + attach.join(", ") + ".",
    "Style: same locked look as the kickoff. " + STYLE,
    "",
    "LOCATION: plate " + p.id + ", " + p.name + ". Match the approved plate exactly." + (s.light ? " " + s.light : ""),
    "IN FRAME:",
    inFrame.join("\n"),
    "FRAMING: " + s.frame,
    "MOMENT: " + s.moment,
    "RULES:",
    rules.map(r => "- " + r).join("\n")
  ].join("\n");
}

function clipLength(c) {
  if (c.len) return c.len;
  if (!c.line) return 4;
  const words = c.line.trim().split(/\s+/).length;
  if (words <= 5) return 4;
  if (words <= 13) return 6;
  return 8;
}

function clipPrompt(B, c) {
  const C = B.chars;
  const s = stillById(B, c.still);
  const p = plateById(B, s.plate);
  const lines = [
    "CLIP " + c.id + " — start frame: STILL " + c.still + (c.end ? ". Last frame, if Flow offers one: STILL " + c.end : "") + ".",
    "Vertical 9:16. One continuous shot, no cuts. Length: " + clipLength(c) + " seconds.",
    "",
    "THE VAMPIRE GROUP CHAT. Premium expressive stylized 3D animation that matches the start frame exactly: same face, hair, skin tone, wardrobe, set and lighting from first frame to last. Natural, restrained acting. No morphing, no new characters, no outfit changes, no captions, no subtitles, no on-screen text.",
    "",
    "ACTION: " + c.act,
    "CAMERA: " + (c.cam || "Hold the start frame's framing. At most a very slow push-in.")
  ];
  if (c.line) {
    const ch = C[c.who];
    lines.push("DIALOGUE: " + ch.name + " says: " + c.line);
    lines.push("VOICE: " + ch.voice + ".");
    lines.push("Only " + ch.name + " speaks, once, then stops." + (c.ots ? " " + c.ots + " stays back-to-camera, silent, and does not turn around." : ""));
  } else {
    lines.push("DIALOGUE: none. Nobody speaks. Mouths stay closed unless the action says otherwise.");
  }
  lines.push("AUDIO: " + p.tone + ". No music.");
  return lines.join("\n");
}

function punchUpPrompt(B) {
  const C = B.chars;
  const out = [
    "You are the comedy punch-up writer for THE VAMPIRE GROUP CHAT, Season 1 Episode 1, \"New Blood, Who Dis?\" Below is the locked V7 script.",
    "",
    "Your job: make it funnier without breaking the shoot. The shots are already planned line by line, so these rules are hard limits:",
    "1. Same 12 scenes, same speakers, same number of lines in the same order.",
    "2. A new line can be at most 3 words longer than the line it replaces.",
    "3. Jokes come from character: Bianca's quick suspicion, Eiesha's dry wit, Marquell's literal deflection, Vanesha's independence, Stefon's stiff awkwardness, Daymondre's smug excuses.",
    "4. Atlanta references must be something that character would really say. Keep Peach Pass, lemon-pepper wet, Buckhead and 285 unless you can clearly beat them.",
    "5. No new characters, first names only, no narrator, nothing that makes Vanesha's attack a joke.",
    "6. Suggest at most 8 swaps. Leave a line alone if it already works.",
    "",
    "Give me a table: scene number, speaker, original line, new line, one sentence on why it is funnier.",
    "",
    "LOCKED V7 SCRIPT"
  ];
  B.scenes.forEach(sc => {
    out.push("");
    out.push("Scene " + sc.n + " — " + sc.title + ", " + sc.when);
    B.script[sc.n].forEach(l => {
      const [k, text] = l.split("|");
      out.push(C[k].name + ": " + text);
    });
    if (sc.n === 10) out.push("(Group chat on screen — Marquell: Vanesha got attacked. I'm with her. Call somebody! / Kari: AT CREEKSIDE??? / Bianca: I'm calling 911. Everybody stay inside.)");
  });
  return out.join("\n");
}

const PROMPTS = { STYLE, sheetPrompt, plateById, allStills, stillById, allCuts, kickoffPrompt, platePrompt, stillPrompt, clipLength, clipPrompt, punchUpPrompt };
if (typeof module !== "undefined") module.exports = PROMPTS;
