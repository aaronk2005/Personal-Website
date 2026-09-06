# Aaron Kleiman — Portfolio

A Wii-style engineering portfolio built with React, TypeScript, and Vite. It combines the console's 4×3 channel rhythm, curved footer, launch screens, and numbered hand pointer with Aaron's real project screenshots, company marks, and portfolio content.

## Highlights

- Thirteen channels across Portfolio and Play pages, including a Mii Plaza and Arcade
- Mii character editor with local saving, player selection, and a guest parade
- Pocket Bowling (five frames), Target Rally (20 seconds), and Mii Match (six pairs)
- HOME overlay pauses games; optional synthesized sounds and local high scores
- Short, skippable console startup with a Wii-style safety screen and reduced-motion support
- Responsive channel grid with mobile-safe touch targets and keyboard-visible focus states
- Centralized portfolio content in `src/data/portfolio.ts`
- Local, deterministic Aaron AI guide with no API key, account, or remote text processing
- Direct contact links without a fragile form backend
- Per-route page titles, canonical metadata, Open Graph artwork, robots, and sitemap files

## Local development

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3005>.

To test the production build:

```bash
npm run build
npm run preview
```

## Content updates

Most portfolio copy, roles, projects, links, and tool groups live in:

```text
src/data/portfolio.ts
```

The current headshot is:

```text
public/images/linkedin-headshot.jpg
```

### Resume PDF

The supplied resume is published unchanged at `public/Aaron-Kleiman-Resume.pdf`. Replace that file to update the View PDF and Download PDF actions. Experience, skills, the three primary projects, and the local guide were aligned with the September 2026 supplied resume.

### Games and local data

Run `node --test tests/game-rules.test.mjs` for bowling scoring and memory deck invariants. Mii characters, the active player, sound preferences, and best scores are stored on the visitor's device. No accounts or online score service are used. Games pause while the HOME menu is open or the tab is hidden.

The characters and games are original browser adaptations, not Nintendo software or console emulation. Functional references:

- [Mii creation](https://en-americas-support.nintendo.com/app/answers/detail/a_id/2675/p/50/c/183)
- [Mii Parade to Plaza](https://www.nintendo.com/en-gb/Support/Legacy-system/Mii-Channel-Using-the-Mii-Parade-242333.html)
- [Wii channel paging](https://en-americas-support.nintendo.com/app/answers/detail/a_id/2796)
- [Wii manuals and HOME menu](https://en-americas-support.nintendo.com/app/answers/detail/a_id/16890/~/wii-manuals)

## Deployment

The existing Vercel configuration builds to `build/` and rewrites extensionless application routes to `index.html`, preserving browser refreshes on channel URLs.

Recommended release flow:

1. Run `npm run build` locally.
2. Preview desktop, mobile, keyboard-only, and reduced-motion behavior.
3. Push the reviewed branch to the repository.
4. Let the existing Vercel project create a preview deployment.
5. Verify direct visits to `/projects`, `/aaron-ai`, `/resume`, and `/contact`.
6. Promote the preview to the existing `aaronkleiman.dev` production domain.

Do not change DNS unless the existing Vercel project is no longer attached to the domain.

## Asset notes

Wii reference artwork, the wordmark, and the Wii-style pointer are documented in `public/images/wii/ATTRIBUTION.md`. Company logos and project screenshots are used to identify Aaron's real experience and work.
