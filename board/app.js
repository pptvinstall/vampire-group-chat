(function () {
  const B = BOARD, P = PROMPTS, C = B.chars;
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const STRIP = { "ext-day": "EXT · DAY", "int-day": "INT · DAY", "int-night": "INT · NIGHT", "ext-night": "EXT · NIGHT" };

  const stills = P.allStills(B);
  const cuts = P.allCuts(B);
  const veo = cuts.filter(c => !c.edit);
  const spoken = veo.filter(c => c.line).length;
  const silent = veo.length - spoken;
  const imagesTotal = B.sheets.length + B.plates.length + stills.length;

  // ----- prompt registry -----
  const TEXT = {};
  TEXT.kickoff = P.kickoffPrompt(B);
  TEXT.punchup = P.punchUpPrompt(B);
  B.sheets.forEach((sh, i) => { TEXT["sheet-" + sh.k] = P.sheetPrompt(B, sh, i); });
  B.plates.forEach(p => { TEXT["plate-" + p.id] = P.platePrompt(B, p); });
  stills.forEach(s => { TEXT["still-" + s.id] = P.stillPrompt(B, s); });
  veo.forEach(c => { TEXT["clip-" + c.id] = P.clipPrompt(B, c); });

  // ----- saved ticks (this browser only) -----
  const KEY = "vgc-ep01-board-v1";
  let ticks = {};
  try { ticks = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { ticks = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(ticks)); } catch (e) { /* ticks just won't persist */ } };

  const copyBtn = (key, label, cls) => '<button type="button" class="copy ' + (cls || "") + '" data-copy="' + esc(key) + '">' + esc(label) + "</button>";
  const promptBox = (key) => '<details class="prompt" id="d-' + esc(key) + '"><summary>Read the prompt</summary><pre id="t-' + esc(key) + '">' + esc(TEXT[key]) + "</pre></details>";
  const okBox = (id, label) => '<label class="okbox"><input type="checkbox" id="ok-' + esc(id) + '" data-ok="' + esc(id) + '"' + (ticks[id] ? " checked" : "") + "> " + esc(label) + "</label>";
  const names = s => (s.who || []).map(k => C[k].name).concat((s.back || []).map(k => C[k].name + " (back)")).join(", ");

  // ----- slate -----
  const cell = (k, v) => '<div class="slate-cell"><span class="eyebrow">' + esc(k) + "</span><b>" + esc(v) + "</b></div>";
  const slate =
    '<header class="slate" id="top"><div class="clapper" aria-hidden="true"></div><div class="slate-body">' +
    '<p class="eyebrow">The Vampire Group Chat · Season 1 Episode 1 · Shot board</p>' +
    "<h1>New Blood, <span>Who Dis?</span></h1>" +
    '<p class="lede">Every still ChatGPT makes and every clip Google Flow animates, in cut order, each with a prompt you can copy. Built from your V7 script and V9 cast. Nothing here has been generated yet.</p>' +
    '<div class="slate-grid">' +
    cell("Script", "V7") + cell("Cast", "V9") + cell("Scenes", B.scenes.length) + cell("Images", imagesTotal) +
    cell("Clips", veo.length) + cell("Runtime", "2:51") + cell("Date", "Nov 10 2026") +
    "</div>" +
    '<div class="meters">' +
    '<div class="meter"><div class="meter-top"><span>Images approved</span><span class="mono" id="m-img">0 / ' + imagesTotal + '</span></div><div class="bar"><i id="b-img"></i></div></div>' +
    '<div class="meter"><div class="meter-top"><span>Clips approved</span><span class="mono" id="m-clip">0 / ' + veo.length + '</span></div><div class="bar"><i id="b-clip"></i></div></div>' +
    "</div></div></header>";

  // ----- jump bar -----
  const jumps = [["test", "3-shot test"], ["cast", "Cast sheets"], ["team", "Team"], ["looks", "Kickoff + plates"]]
    .concat(B.scenes.map(sc => ["scene-" + sc.n, "SC " + String(sc.n).padStart(2, "0")]))
    .concat([["beats", "Beats"], ["budget", "Budget"], ["calls", "Your calls"]]);
  const jump = '<nav class="jump" aria-label="Jump to section">' + jumps.map(j => '<button type="button" data-jump="' + j[0] + '">' + esc(j[1]) + "</button>").join("") + "</nav>";

  // ----- 3-shot test -----
  const testStills = stills.filter(s => s.test);
  const testPlates = [...new Set(testStills.map(s => s.plate))];
  const testClips = veo.filter(c => testStills.some(s => s.id === c.still)).filter((c, i, a) => a.findIndex(x => x.still === c.still) === i);
  const test =
    '<section id="test"><p class="eyebrow">Start here</p><h2>Tonight: the 3-shot test</h2>' +
    '<p class="lede">Your own bible says to prove the look on three shots before making the rest. One school shot, one grill shot, one parking-lot shot. First the six cast sheets, then six images and three clips.</p>' +
    '<ol class="steps">' +
    '<li><div class="step-body"><p><b>Open a new ChatGPT chat</b> and paste the kickoff.</p><div class="row">' + copyBtn("kickoff", "Copy kickoff") + "</div></div></li>" +
    '<li><div class="step-body"><p><b>Make the six cast sheets, one at a time.</b> Attach the old reference each prompt names. Daymondre goes first and sets the look; attach his approved new sheet with every sheet after him. Send me each one as it comes.</p><div class="row">' +
    B.sheets.map((sh, i) => copyBtn("sheet-" + sh.k, (i + 1) + " · " + C[sh.k].name)).join("") + "</div></div></li>" +
    '<li><div class="step-body"><p><b>Make three location plates.</b> One prompt each. Approve them before any character goes in.</p><div class="row">' +
    testPlates.map(id => copyBtn("plate-" + id, "Copy plate " + id)).join("") + "</div></div></li>" +
    '<li><div class="step-body"><p><b>Make three stills.</b> With each prompt, attach the plate and that character\'s new sheet again. Long chats forget.</p><div class="row">' +
    testStills.map(s => copyBtn("still-" + s.id, "Copy still " + s.id + " · " + names(s))).join("") + "</div></div></li>" +
    '<li><div class="step-body"><p><b>Send all six images to me.</b> Name them by ID (EP01_L2.png, EP01_02D.png). I check faces, outfits and sets against your bible and answer pass or fix.</p></div></li>' +
    '<li><div class="step-body"><p><b>Animate the three passed stills in Google Flow.</b> Start each video from the still, vertical, Veo 3.1 Fast, and paste the clip prompt. Cost: 60 credits.</p><div class="row">' +
    testClips.map(c => copyBtn("clip-" + c.id, "Copy clip " + c.id, "flow")).join("") + "</div></div></li>" +
    '<li><div class="step-body"><p><b>Send me the three clips.</b> If they pass, the other ' + (veo.length - 3) + " clips follow the same recipe. If not, we fix the recipe before spending more.</p>" +
    '<div class="passbar"><span class="eyebrow">Pass bar, from your style bible</span><ul>' +
    "<li>Same face in the clip as in the still, start to finish. Stefon most of all.</li>" +
    "<li>Same shading and color feel across school, grill and night.</li>" +
    "<li>Outfits do not change.</li><li>The right character speaks, in a voice that fits.</li><li>No burned-in captions or garbled text.</li>" +
    "</ul></div></div></li></ol></section>";

  // ----- cast sheets -----
  const sheetCard = (sh, i) =>
    '<div class="card" data-card="sheet-' + sh.k + '"><div class="card-top"><span class="sid">' + (i + 1) + '</span><span class="chip">Cast sheet</span>' +
    (i === 0 ? '<span class="chip test">Style anchor</span>' : "") + "</div>" +
    '<p class="who">' + esc(C[sh.k].name) + "</p><p>Attach: " + esc(sh.ref) + (i === 0 ? "." : " and the approved new Daymondre sheet.") + " " + esc(sh.outfit) + "</p>" +
    promptBox("sheet-" + sh.k) +
    '<div class="card-foot">' + copyBtn("sheet-" + sh.k, "Copy ChatGPT prompt") + okBox("img-sheet-" + sh.k, "Approved") + "</div></div>";
  const cast =
    '<section id="cast"><h2>Cast sheets</h2>' +
    '<p class="lede">Your old references are in three different looks: Stefon, Marquell, Vanesha and Bianca are close to photoreal, Daymondre is stylized 3D, and Eiesha is a cartoon face. Redrawing all six in ChatGPT, in one look, fixes that at the source. Daymondre is closest to the look your style bible describes, so he goes first and every later sheet is matched to his.</p>' +
    '<div class="grid">' + B.sheets.map(sheetCard).join("") + "</div></section>";

  // ----- team -----
  const players = [
    ["ChatGPT", "Stills", "Makes all " + imagesTotal + " images and punches up the jokes.", "Checked Nov 10: ChatGPT makes images only now. Its video tool, Sora, closed in 2026."],
    ["Google Flow", "Motion", "Turns each approved still into a clip with Veo 3.1.", "On Google AI Pro: 1,000 credits a month plus 50 a day. One clip costs 10 (Lite), 20 (Fast) or 100 (Quality)."],
    ["Claude", "Quarterback", "Shot list, prompts, a check on every image and clip, the group chat graphic, captions, the final cut.", "I build the on-screen text myself so it is always readable."],
    ["Perplexity", "Scout", "Looks up tool limits and platform rules before you spend.", "Its own video is a handful of 8-second clips a month on Pro with no model choice, so it stays off the production line."],
    ["JWood", "Showrunner", "Final say on every still and clip. Three music cues.", "Nothing is approved until you say so."],
    ["Higgsfield", "Bench", "Held back for a fix-it shot.", "155 credits left on your Plus plan, checked tonight. Your notes say the plan runs to Dec 9."]
  ];
  const team =
    '<section id="team"><h2>Who plays what</h2><div class="team">' +
    players.map(p => '<div class="player"><b>' + esc(p[0]) + '</b><span class="role">' + esc(p[1]) + "</span><div>" + esc(p[2]) + "<small>" + esc(p[3]) + "</small></div></div>").join("") +
    "</div>" +
    '<p class="lede">Every shot moves the same way: ChatGPT still, I check it, Flow clip, I check it, into the edit. Save stills as EP01_02D.png and clips as EP01_02D-1_v1.mp4 so nothing gets mixed up.</p></section>';

  // ----- kickoff + plates -----
  const plateCard = p =>
    '<div class="card" data-card="plate-' + p.id + '"><div class="card-top"><span class="sid">' + esc(p.id) + '</span><span class="chip">Plate</span>' +
    (p.doubles ? '<span class="chip edit">Also shot ' + esc(p.doubles) + "</span>" : "") + "</div>" +
    '<p class="who">' + esc(p.name) + "</p><p>" + esc(p.desc) + "</p>" + promptBox("plate-" + p.id) +
    '<div class="card-foot">' + copyBtn("plate-" + p.id, "Copy ChatGPT prompt") + okBox("img-" + p.id, "Approved") + "</div></div>";
  const looks =
    '<section id="looks"><h2>Kickoff and location plates</h2>' +
    '<p class="lede">The kickoff sets the rules for the whole ChatGPT chat. The seven plates are empty sets. Every still names the plate it has to match, which is what keeps the grill looking like the same grill.</p>' +
    '<div class="grid">' +
    '<div class="card"><div class="card-top"><span class="sid">Kickoff</span><span class="chip">Paste once</span></div><p>Paste it first. If ChatGPT starts drifting, open a fresh chat, paste it again and attach the six approved sheets.</p>' + promptBox("kickoff") + '<div class="card-foot">' + copyBtn("kickoff", "Copy kickoff") + "</div></div>" +
    '<div class="card"><div class="card-top"><span class="sid">Punch-up</span><span class="chip">Optional</span></div><p>Hands ChatGPT the locked V7 script with hard limits, so new jokes fit the shots already planned. Run it in a separate chat from the images.</p>' + promptBox("punchup") + '<div class="card-foot">' + copyBtn("punchup", "Copy punch-up prompt") + "</div></div>" +
    B.plates.map(plateCard).join("") + "</div></section>";

  // ----- scenes -----
  let cutNo = 0;
  const stillCard = s =>
    '<div class="card" data-card="still-' + s.id + '"><div class="card-top"><span class="sid">' + esc(s.id) + "</span>" +
    (s.test ? '<span class="chip test">Test shot</span>' : "") + (s.editOnly ? '<span class="chip edit">No video needed</span>' : "") +
    '<span class="chip">' + esc(s.custom === "vamp" ? "Edit of 08D" : "Plate " + s.plate) + "</span></div>" +
    '<p class="who">' + esc(s.custom === "vamp" ? "Daymondre, vampire face" : (names(s) || "No faces")) + "</p>" +
    "<p>" + esc(s.custom === "vamp" ? "The approved 08D with three changes: red-amber eyes, faint veins, two small fangs. Used as the last frame of the transformation." : s.frame + " " + s.moment) + "</p>" +
    promptBox("still-" + s.id) +
    '<div class="card-foot">' + copyBtn("still-" + s.id, "Copy ChatGPT prompt") + okBox("img-" + s.id, "Approved") + "</div></div>";
  const cutRow = c => {
    cutNo++;
    const n = '<span class="n">' + String(cutNo).padStart(2, "0") + "</span>";
    if (c.edit) {
      return '<li>' + n + '<span class="cid">' + esc(c.id) + '</span><div class="what"><div class="row"><span class="chip edit">' + (c.graphic ? "I build this" : "Edit only") + "</span></div>" +
        '<span class="act">' + esc(c.act) + "</span></div><div class=\"ctl\"></div></li>";
    }
    const sp = c.line ? '<span class="line"><b>' + esc(C[c.who].name) + ":</b> " + esc(c.line) + "</span>" : '<span class="line"><b>Silent.</b></span>';
    return '<li data-card="clip-' + c.id + '">' + n + '<span class="cid">' + esc(c.id) + '</span><div class="what">' + sp +
      '<span class="act">From still ' + esc(c.still) + (c.end ? " to " + esc(c.end) : "") + " · " + P.clipLength(c) + "s · " + esc(c.act) + (c.note ? " " + esc(c.note) : "") + "</span>" +
      promptBox("clip-" + c.id) + '</div><div class="ctl">' + copyBtn("clip-" + c.id, "Copy Flow prompt", "flow") + okBox("clip-" + c.id, "Approved") + "</div></li>";
  };
  const scenes =
    '<section id="scenes"><h2>The stripboard</h2>' +
    '<p class="lede">Twelve scenes in story order. Each still is one camera setup; some setups feed two or three clips, the way a real shoot covers a conversation. Only one face talks per clip.</p>' +
    '<div class="legend" aria-label="Strip colors"><span class="ext-day">Ext · Day</span><span class="int-day">Int · Day</span><span class="int-night">Int · Night</span><span class="ext-night">Ext · Night</span></div>' +
    B.scenes.map(sc =>
      '<div class="scene" id="scene-' + sc.n + '">' +
      '<div class="strip ' + sc.strip + '"><span class="num">' + String(sc.n).padStart(2, "0") + '</span><div><div class="ttl">' + esc(sc.title) + '</div><div class="meta">' + STRIP[sc.strip] + " · " + esc(sc.when) + '</div></div><span class="tc">' + esc(sc.tc) + "<br>" + sc.stills.length + " stills · " + sc.cut.filter(c => !c.edit).length + " clips</span></div>" +
      '<span class="sub">Stills for ChatGPT</span><div class="grid">' + sc.stills.map(stillCard).join("") + "</div>" +
      '<span class="sub">Cut order for Flow</span><ol class="cuts">' + sc.cut.map(cutRow).join("") + "</ol></div>"
    ).join("") + "</section>";

  // ----- beats -----
  const cue = (id, name, when, feel, len) =>
    '<div class="card"><div class="card-top"><span class="sid">' + id + '</span><span class="chip">' + esc(when) + "</span></div><p class=\"who\">" + esc(name) + "</p><p>" + esc(feel) + '</p><p class="mono" style="font-size:13px">' + esc(len) + "</p></div>";
  const beats =
    '<section id="beats"><h2>Beats I need from you</h2>' +
    '<p class="lede">Your music solves the rights problem outright: your bible bans commercial samples and recognizable songs, and these are yours. Three cues cover the episode.</p><div class="cues">' +
    cue("A", "Day", "Scenes 1–7 · 0:00–1:40", "Warm and laid-back. School morning into the grill. Leave the middle open so dialogue sits on top; no lead melody fighting the voices.", "About 1:45 long") +
    cue("B", "Night", "Scenes 8–11 · 1:40–2:38", "Dark, sparse, sub-heavy. I pull it down to almost nothing at the fangs, then bring it back under the confrontation.", "About 1:05 long") +
    cue("C", "Sting", "Scene 12 · the red eyes", "One hit for the eye flash, right before the cut to black.", "A hit with a 2–3 second tail") +
    "</div><p class=\"lede\">Instrumental WAV if you have it, 320 MP3 if not. Only sounds you own. Stems (drums, bass, melody) let me duck the beat under the lines cleanly.</p></section>";

  // ----- budget -----
  const num = n => n.toLocaleString("en-US");
  const mix = spoken * 10 + silent * 20;
  const budget =
    '<section id="budget"><h2>What it costs in Flow credits</h2>' +
    '<div class="tablewrap"><table><thead><tr><th>Batch</th><th class="num">Clips</th><th class="num">Veo 3.1 Lite</th><th class="num">Veo 3.1 Fast</th></tr></thead><tbody>' +
    "<tr><td>Tonight's test</td><td class=\"num\">3</td><td class=\"num\">30</td><td class=\"num\">60</td></tr>" +
    "<tr><td>Whole episode, one take each</td><td class=\"num\">" + veo.length + '</td><td class="num">' + num(veo.length * 10) + '</td><td class="num">' + num(veo.length * 20) + "</td></tr>" +
    "<tr><td>Whole episode with retries (×1.5)</td><td class=\"num\">" + Math.round(veo.length * 1.5) + '</td><td class="num">' + num(veo.length * 15) + '</td><td class="num">' + num(veo.length * 30) + "</td></tr>" +
    "<tr><td>My plan: " + spoken + " talking clips on Lite, " + silent + " silent hero shots on Fast, with retries</td><td class=\"num\">" + Math.round(veo.length * 1.5) + '</td><td class="num" colspan="2">' + num(Math.round(mix * 1.5)) + " credits</td></tr>" +
    "</tbody></table></div>" +
    '<p class="lede">Google AI Pro includes 1,000 credits a month plus 50 a day, so my plan fits inside one month if Lite passes the test. That is an assumption until I see the three clips: if Lite cannot hold a face, the episode runs on Fast and spills into a second month or a credit top-up. ChatGPT images have no posted count on Plus, but it slows you down in bursts, so expect the ' + imagesTotal + " images to take a few sittings.</p></section>";

  // ----- calls -----
  const call = (t, body, opts) => '<div class="card"><h3>' + esc(t) + "</h3><p>" + esc(body) + "</p><ol>" + opts.map(o => "<li>" + esc(o) + "</li>").join("") + "</ol></div>";
  const calls =
    '<section id="calls"><h2>Three calls that are yours</h2><div class="calls">' +
    call("1 · Voices", "Your style bible wants one recorded voice per character, lip-synced. None of your four subscriptions lip-syncs to a supplied voice track. For the test I let Veo speak each line, with the same voice description pasted every time.",
      ["Veo voices for the test; judge the drift when we hear it (my pick).", "Hold the bible's rule now: add a voice and lip-sync tool before any talking clip gets made."]) +
    call("2 · Open on the chat", "The show is called The Vampire Group Chat, but in V7 the chat first appears at 2:06. A three-second chat bubble before scene 1 costs no credits, because I build it in the edit, and gives the first seconds a hook.",
      ["Add a cold-open chat bubble; ChatGPT pitches the line (my pick).", "Keep V7 exactly as written."]) +
    call("3 · Your Google plan", "The credit math above assumes Google AI Pro. Tell me which one you pay for and I will redo the budget.",
      ["AI Pro, $19.99.", "AI Plus, $4.99.", "Ultra.", "Not sure. I will check."]) +
    "</div>" +
    '<h3>Calls I already made</h3><ul class="made">' +
    "<li>Two-person moments are shot over the shoulder, so only one mouth is on camera. That is the fix for the swapped voices in the old clip 5.</li>" +
    "<li>Signs, phone screens and the group chat are blank in every still. I add the words in the edit.</li>" +
    "<li>Four moments need no video credits: the two storefront shots, the phone on the asphalt, and the chat graphic.</li>" +
    "<li>Daymondre's vampire face is an edit of his own approved close-up, so the face under the fangs cannot change.</li>" +
    "<li>I added one silent beat in scene 12: Daymondre turns cold for two seconds before the AP History joke. Your continuity notes ask for that; the script did not have a shot for it. The script's red-eye flash still ends the episode.</li>" +
    "<li>Marquell's line in scene 9 is split so he shouts \"Vee!\" at the door and says the rest crouched beside her.</li>" +
    "<li>None of the V6 footage is used. Your continuity notes mark it as scratch.</li>" +
    "</ul></section>";

  document.getElementById("app").innerHTML = slate + jump + test + cast + team + looks + scenes + beats + budget + calls;

  // ----- behavior -----
  const toast = document.getElementById("toast");
  let toastTimer;
  const say = m => { toast.textContent = m; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2200); };

  function revealAndSelect(key) {
    const d = document.getElementById("d-" + key), pre = document.getElementById("t-" + key);
    if (!d || !pre) return;
    d.open = true;
    const r = document.createRange(); r.selectNodeContents(pre);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    pre.scrollIntoView({ block: "center" });
  }
  function flash(btn) { btn.classList.add("done"); const t = btn.textContent; btn.textContent = "Copied"; setTimeout(() => { btn.classList.remove("done"); btn.textContent = t; }, 1400); }

  function refresh() {
    const img = Object.keys(ticks).filter(k => ticks[k] && k.indexOf("img-") === 0).length;
    const clip = Object.keys(ticks).filter(k => ticks[k] && k.indexOf("clip-") === 0).length;
    document.getElementById("m-img").textContent = img + " / " + imagesTotal;
    document.getElementById("m-clip").textContent = clip + " / " + veo.length;
    document.getElementById("b-img").style.width = (100 * img / imagesTotal) + "%";
    document.getElementById("b-clip").style.width = (100 * clip / veo.length) + "%";
    document.querySelectorAll("[data-card]").forEach(el => {
      const k = el.getAttribute("data-card").replace(/^sheet-/, "img-sheet-").replace(/^(plate|still)-/, "img-");
      el.classList.toggle("is-ok", !!ticks[k]);
    });
  }

  document.addEventListener("click", e => {
    const cb = e.target.closest("[data-copy]");
    if (cb) {
      const key = cb.getAttribute("data-copy"), text = TEXT[key];
      let p;
      try { p = navigator.clipboard.writeText(text); } catch (err) { p = Promise.reject(err); }
      p.then(() => { flash(cb); say("Copied. Paste it into " + (key.indexOf("clip-") === 0 ? "Flow." : "ChatGPT.")); })
        .catch(() => { revealAndSelect(key); say("Copy is blocked here. The prompt is selected: press Ctrl+C or Cmd+C."); });
      return;
    }
    const jb = e.target.closest("[data-jump]");
    if (jb) { const t = document.getElementById(jb.getAttribute("data-jump")); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
  document.addEventListener("change", e => {
    const k = e.target.getAttribute && e.target.getAttribute("data-ok");
    if (!k) return;
    ticks[k] = e.target.checked; save(); refresh();
  });
  refresh();
})();
