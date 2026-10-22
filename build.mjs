// 1) Inlines vendor libraries into single-file ads (src.html -> index.html).
// 2) Builds per-network variants of each playable into dist/<network>/<ad>.html
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from "node:fs";

const ADS = ["pin-rescue", "crowd-gates", "merge-army"];
// What each network needs injected at the <!--MRAID--> marker.
const NETWORKS = {
  applovin: '<script src="mraid.js"></script>',
  unity: '<script src="mraid.js"></script>',
  ironsource: '<script src="mraid.js"></script>',
  mintegral: '<script src="mraid.js"></script>',
  google: '<meta name="ad.size" content="width=320,height=480"><script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>',
  web: ""
};

// Ads with a src.html reference ../vendor/*.js; inline it so the ad stays one file with no requests.
for (const ad of ADS) {
  const src = `${ad}/src.html`;
  if (!existsSync(src)) continue;
  const html = readFileSync(src, "utf8").replace(
    /<script src="\.\.\/vendor\/([^"]+)"><\/script><!--PIXI-->/,
    (_, file) => `<script>${readFileSync(`vendor/${file}`, "utf8").replace(/<\/script/gi, "<\\/script")}</script>`
  );
  writeFileSync(`${ad}/index.html`, html);
}

for (const [net, inject] of Object.entries(NETWORKS)) {
  mkdirSync(`dist/${net}`, { recursive: true });
  for (const ad of ADS) {
    const src = readFileSync(`${ad}/index.html`, "utf8");
    const out = `dist/${net}/${ad}.html`;
    writeFileSync(out, src.replace("<!--MRAID-->", inject));
    const kb = (statSync(out).size / 1024).toFixed(1);
    console.log(`${out}  ${kb} KB`);
  }
}
