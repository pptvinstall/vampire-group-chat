const fs = require("fs");
const R = process.argv[2] || require("path").resolve(__dirname, "..");
const B = require(R + "/board/data.js"), P = require(R + "/board/prompts.js"), C = B.chars;
const fence = t => "```text\n" + t + "\n```\n";
const w = (f, t) => fs.writeFileSync(R + "/" + f, t);

w("02_prompts/00_kickoff.md", "# ChatGPT kickoff\n\nPaste once at the top of a new ChatGPT image chat.\n\n" + fence(P.kickoffPrompt(B)));
w("02_prompts/01_cast_sheets.md", "# Cast sheets\n\nOne character at a time, in this order. Daymondre is the style anchor: attach his approved new sheet with every sheet after him.\n\n" +
  B.sheets.map((sh, i) => "## " + (i + 1) + ". " + C[sh.k].name + "\n\nAttach: `01_cast/old_refs/" + sh.ref + "`" + (i ? " and the approved Daymondre sheet" : "") + ".\n\n" + fence(P.sheetPrompt(B, sh, i))).join("\n"));
w("02_prompts/02_plates.md", "# Location plates\n\nEmpty sets. Every still names the plate it must match.\n\n" +
  B.plates.map(p => "## " + p.id + " — " + p.name + "\n\n" + fence(P.platePrompt(B, p))).join("\n"));
w("02_prompts/03_ep01_stills.md", "# Episode 1 stills (ChatGPT)\n\nOne still per camera setup. Attach the plate and the character sheet(s) named in each prompt.\n\n" +
  B.scenes.map(sc => "## Scene " + sc.n + " — " + sc.title + ", " + sc.when + " (" + sc.tc + ")\n\n" +
    sc.stills.map(s => "### STILL " + s.id + (s.test ? " (test shot)" : "") + (s.editOnly ? " (no video needed)" : "") + "\n\n" + fence(P.stillPrompt(B, s))).join("\n")).join("\n"));
w("02_prompts/04_ep01_clips.md", "# Episode 1 clips (Google Flow, Veo 3.1)\n\nIn cut order. Each clip starts from an approved still. One speaker per clip.\n\n" +
  B.scenes.map(sc => "## Scene " + sc.n + " — " + sc.title + ", " + sc.when + "\n\n" +
    sc.cut.map(c => c.edit ? "### " + c.id + " (edit only, no video credits)\n\n" + c.act + "\n" : "### CLIP " + c.id + "\n\n" + fence(P.clipPrompt(B, c))).join("\n")).join("\n"));
w("02_prompts/05_punchup.md", "# Joke punch-up (ChatGPT, separate chat from the images)\n\n" + fence(P.punchUpPrompt(B)));

// keep statuses already recorded in the shot list
const keep = {};
try {
  fs.readFileSync(R + "/03_ep01/SHOT_LIST.md", "utf8").split("\n").forEach(l => {
    const c = l.split("|").map(x => x.trim());
    if (c.length >= 9 && /^\d+$/.test(c[1])) keep[c[3]] = c[8];
  });
} catch (e) {}
let n = 0;
const rows = B.scenes.flatMap(sc => sc.cut.map(c => {
  n++;
  const kind = c.graphic ? "graphic (Claude builds)" : c.edit ? "edit only" : "Flow clip";
  const sp = c.line ? C[c.who].name + ": " + c.line.replace(/\|/g, "/") : (c.edit ? c.act : "silent — " + c.act);
  return "| " + n + " | " + sc.n + " | " + c.id + " | " + (c.still || "") + " | " + kind + " | " + sp + " | " + (c.edit ? "" : P.clipLength(c) + "s") + " | " + (keep[c.id] || "todo") + " |";
}));
const veo = P.allCuts(B).filter(c => !c.edit);
w("03_ep01/SHOT_LIST.md", "# Episode 1 shot list — \"New Blood, Who Dis?\"\n\nV7 script, V9 cast. " + B.scenes.length + " scenes, " + B.plates.length + " plates, " + P.allStills(B).length + " stills, " + veo.length + " Flow clips (" + veo.filter(c => c.line).length + " talking, " + veo.filter(c => !c.line).length + " silent).\n\nStatus values: todo, made, approved, redo.\n\n| # | Scene | ID | Start still | Kind | What happens | Length | Status |\n|---|---|---|---|---|---|---|---|\n" + rows.join("\n") + "\n");
console.log("markdown written; cut rows:", n);
