# Aaron Kleiman — Portfolio

A Wii-style engineering portfolio built with React, TypeScript, and Vite. It combines the console's 4×3 channel rhythm, curved footer, launch screens, and numbered hand pointer with Aaron's real project screenshots, company marks, and portfolio content.

## Highlights

- Twelve deep-linkable channels, including Aaron AI, Hobbies, Bonus Level, GitHub, and LinkedIn
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

### Résumé PDF

The repository did not include a current résumé PDF, so the UI intentionally shows an unavailable state rather than a broken link.

1. Add the file as `public/Aaron-Kleiman-Resume.pdf`.
2. Set `resumeAvailable` to `true` in `src/components/ChannelPages.tsx`.
3. Run `npm run build` and verify the download from `/resume`.

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
