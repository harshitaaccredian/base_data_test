// Runs on Vercel at deploy time: injects env vars into the page and writes public/index.html
const fs = require("fs");

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_ANON_KEY || "";

if (!url || !key) {
  console.warn("⚠️ Notice: SUPABASE_URL or SUPABASE_ANON_KEY is not set in Vercel Environment Variables.");
  console.warn("Building public/index.html with interactive Connect DB modal & demo fallback.");
} else {
  console.log("✅ Found SUPABASE_URL and SUPABASE_ANON_KEY in environment. Injecting into build...");
}

fs.mkdirSync("public", { recursive: true });
const srcFile = fs.existsSync("src/index.html") ? "src/index.html" : "index.html";
const html = fs.readFileSync(srcFile, "utf8")
  .replace("__SUPABASE_URL__", url)
  .replace("__SUPABASE_ANON_KEY__", key);

fs.writeFileSync("public/index.html", html);
console.log("Built public/index.html successfully");
