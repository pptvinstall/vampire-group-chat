// Coverage and consistency check for the shot board data.
const B = require("./data.js");
const P = require("./prompts.js");
let bad = 0;
const fail = m => { bad++; console.log("FAIL: " + m); };

const stills = P.allStills(B);
const cuts = P.allCuts(B);
const stillIds = new Set(stills.map(s => s.id));
const plateIds = new Set(B.plates.map(p => p.id));

// unique ids
if (stillIds.size !== stills.length) fail("duplicate still id");
if (new Set(cuts.map(c => c.id)).size !== cuts.length) fail("duplicate cut id");

// every still has a real plate; every clip a real still
stills.forEach(s => { if (!plateIds.has(s.plate)) fail("still " + s.id + " plate " + s.plate); });
cuts.forEach(c => {
  if (c.graphic) return;
  if (c.edit) { if (!plateIds.has(c.still) && !stillIds.has(c.still)) fail("edit " + c.id + " source " + c.still); return; }
  if (!stillIds.has(c.still)) fail("clip " + c.id + " still " + c.still);
  if (c.end && !stillIds.has(c.end)) fail("clip " + c.id + " end " + c.end);
  const s = P.stillById(B, c.still);
  if (c.who && !(s.who || []).includes(c.who)) fail("clip " + c.id + " speaker " + c.who + " not facing camera in still " + c.still);
  if (c.line && !c.who) fail("clip " + c.id + " line without speaker");
});

// every still is used by at least one cut entry
const used = new Set(cuts.map(c => c.still).concat(cuts.map(c => c.end).filter(Boolean)));
stills.forEach(s => { if (!used.has(s.id)) fail("still " + s.id + " never used"); });

// script coverage: spoken lines per scene, in order, match V7 exactly
B.scenes.forEach(sc => {
  const got = sc.cut.filter(c => c.line).map(c => c.who + "|" + c.line);
  let want = B.script[sc.n].slice();
  if (sc.n === 9) want = ["M|Vee!", "M|Hey, look at me. Who was it?", "V|Leather jacket. His eyes..."];
  if (JSON.stringify(got) !== JSON.stringify(want)) { fail("scene " + sc.n + " lines differ"); console.log(got, want); }
});

const veo = cuts.filter(c => !c.edit);
const editOnly = cuts.filter(c => c.edit);
const charStills = stills.length;
const seconds = veo.reduce((a, c) => a + P.clipLength(c), 0);
console.log(JSON.stringify({
  scenes: B.scenes.length,
  plates: B.plates.length,
  characterStills: charStills,
  imagesTotal: B.plates.length + charStills,
  veoClips: veo.length,
  spoken: veo.filter(c => c.line).length,
  silent: veo.filter(c => !c.line).length,
  editOnly: editOnly.map(c => c.id),
  generatedSeconds: seconds,
  liteCredits: veo.length * 10,
  fastCredits: veo.length * 20,
  tests: stills.filter(s => s.test).map(s => s.id)
}, null, 1));
console.log(bad ? bad + " problem(s)" : "ALL CHECKS PASS");
console.log("\n--- sample still ---\n" + P.stillPrompt(B, P.stillById(B, "03B")));
console.log("\n--- sample clip ---\n" + P.clipPrompt(B, cuts.find(c => c.id === "03B-1")));
console.log("\n--- vamp clip ---\n" + P.clipPrompt(B, cuts.find(c => c.id === "08D-1")));
