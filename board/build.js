const fs = require("fs");
const rd = f => fs.readFileSync(__dirname + "/" + f, "utf8");
const strip = s => s.replace(/if \(typeof module !== "undefined"\)[^\n]*\n?/g, "");
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vampire Group Chat Ep 1 Shot Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
${rd("style.css")}
</style>
</head>
<body>
<main id="app"></main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
${strip(rd("data.js"))}
${strip(rd("prompts.js"))}
${rd("app.js")}
</script>
</body>
</html>
`;
fs.writeFileSync(__dirname + "/index.html", html);
console.log("built", html.length, "bytes");
