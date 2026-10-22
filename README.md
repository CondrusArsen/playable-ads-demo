# Playable ads — demos

Two HTML5 playable ads in the most common mobile UA formats. **Live:** https://condrusarsen.github.io/playable-ads-demo/

| Ad | Mechanic | Flow |
|---|---|---|
| [Tower Rescue](pin-rescue/index.html) | Pin-pull puzzle with particle fluids (gold, water, lava → stone) | tutorial → 3-pin puzzle → fail/retry → end card |
| [Crowd Gates](crowd-gates/index.html) | Crowd runner with +, −, × gates and a boss army | auto-play until first touch → gates → battle → end card |
| [Merge Army](merge-army/index.html) | Merge battler on **PixiJS 8** (source: `merge-army/src.html`) | drag-to-merge tutorial → buy units → fight → end card |

Bonus: [Stack Up](tg-stack/index.html) — a Telegram Mini App game (Telegram WebApp SDK: haptics, MainButton, CloudStorage best score, share to chats). To run it inside Telegram: @BotFather → `/newapp` (or bot settings → Menu Button) → URL `https://condrusarsen.github.io/playable-ads-demo/tg-stack/`.

## Tech
- Single self-contained HTML per ad, zero external requests: 12–17 KB (vanilla canvas) or ~0.8 MB (PixiJS inlined by `build.mjs`).
- MRAID 2.0 lifecycle (`ready` → `viewable`), CTA through `mraid.open()`, Google `ExitApi.exit()`, plain-web fallback.
- Logical 360×640 canvas, letterboxed for any aspect ratio, portrait and landscape, devicePixelRatio-aware.
- Tiny WebAudio sound, started only after a user gesture.

## Network builds
```bash
node build.mjs
```
Writes `dist/<network>/<ad>.html` for AppLovin, Unity Ads, ironSource, Mintegral, Google Ads and plain web.

Game names and store links are fictional; all code and art are original (drawn in code, no third-party assets).

Made by Arseni Atrokhov with AI coding agents (Claude Code). Design, mechanics tuning and testing are mine.
