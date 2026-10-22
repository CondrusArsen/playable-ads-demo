// Builds per-network variants of each playable into dist/<network>/<ad>.html
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";

const ADS = ["pin-rescue", "crowd-gates"];
// What each network needs injected at the <!--MRAID--> marker.
const NETWORKS = {
  applovin: '<script src="mraid.js"></script>',
  unity: '<script src="mraid.js"></script>',
  ironsource: '<script src="mraid.js"></script>',
  mintegral: '<script src="mraid.js"></script>',
  google: '<meta name="ad.size" content="width=320,height=480"><script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>',
  web: ""
};

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
