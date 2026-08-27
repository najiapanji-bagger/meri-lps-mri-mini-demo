# LPS MRI Mini Demo Experience

A playful, motion-first teaser for **LPS MRI — LPS Media Monitoring & Risk Intelligence**, powered by **MERI**, created for Festival Inovasi LPS 2026 by Tim KJD.

This repository is intentionally separate from the production LPS MRI application. It does not contain production data, authentication, dashboards, or backend services.

## Dates

- Workshop: **9 September 2026**
- Official demo launch: **9 September 2026, 10:00 WIB**

## Experience

- Full-screen animated MERI reveal
- Interactive particle intelligence field
- Jakarta-time launch countdown with animated flip cards
- System preparation progress sequence
- Four abstract feature teasers
- Locked surprise cards for the full experience
- Floating MERI companion
- Dynamic QR code for mobile access
- Looping **Ku Aman Ada LPS** soundtrack with an accessible play/pause control
- Sound begins after the visitor's first interaction to comply with browser autoplay policies
- Reduced-motion and low-power fallbacks

## Run locally

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:4178/minidemo>.

## Validate

```bash
npm run test
npm run lint
npm run build
```

## Deploy

The project is Vercel-ready:

```bash
vercel
```

The Vite base path and Vercel rewrites make the experience available at `/minidemo` on its own deployment. Attaching it to `https://lpsmri.online/minidemo` still requires a path rewrite or proxy on the Vercel project that currently owns `lpsmri.online`; that routing change is deliberately outside this standalone repository.

## Authentic asset sources

No new mascot was generated for this site.

- MERI pose artwork was copied from the existing [`najiapanji-bagger/meri-game-booth`](https://github.com/najiapanji-bagger/meri-game-booth) character pack:
  - `meri_waving.png`
  - `meri_thinking.png`
  - `meri_chat.png`
  - `meri_detective.png`
  - `meri_jump.png`
- `public/meri.svg` is copied from the same MERI Game Booth repository for the favicon/fallback.
- The LPS MRI lockup and navy/orange/white visual language follow the current production LPS MRI application at <https://lpsmri.online>.

The assets remain part of the LPS MRI / MERI project identity and should not be treated as a generic public character pack.
