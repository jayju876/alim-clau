import fs from "fs";
import path from "path";

const distDir = path.resolve(process.cwd(), "dist");
const indexFile = path.join(distDir, "index.html");
const fallbackFile = path.join(distDir, "404.html");

if (!fs.existsSync(indexFile)) {
  console.error("Build output not found:", indexFile);
  process.exit(1);
}

fs.copyFileSync(indexFile, fallbackFile);
console.log("Created dist/404.html fallback for GitHub Pages SPA routing.");
