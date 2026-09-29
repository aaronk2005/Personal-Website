# Console channels

The menu contains twelve channels on one page. Mii Channel occupies slot 06, replacing Now Building. The Play page and game routes are retired; `/play/*` and `/arcade` redirect to the menu, and `/now` redirects to Mii Channel. Saved characters and historical game records are preserved.

Startup runs once per browser tab, with an immediate Skip intro button and A/Escape shortcuts. The menu only mounts after startup finishes. Skip to content stays visually hidden until keyboard focus, then moves focus to the main content.

## Wii references

- [Nintendo: Changing a Mii](https://www.nintendo.com/en-gb/Support/Legacy-system/Mii-Channel-Changing-a-Mii-242285.html) — feature tabs, character preview, drag-to-edit, and save/quit flow.
- [Nintendo: Using the Mii Plaza](https://www.nintendo.com/en-gb/Support/Legacy-system/Mii-Channel-Using-the-Mii-Plaza-242297.html) — plaza tools and arranging.
- [Nintendo: Photo Channel](https://www.nintendo.com/en-gb/Wii/Wii-Channels/Photo-Channel/Photo-Channel-621969.html) — photo browsing, slideshow, and six-piece picture puzzles.

This is a browser adaptation, not Nintendo's original software or 3D renderer. Mii Parade contains local guest characters, with no WiiConnect24 or online sharing. Mii characters and game records retain the portfolio's existing device-local storage model.

## Travel album

`src/data/photos.ts` is the public album manifest. It is intentionally empty until Aaron supplies travel photographs for publication. Add public asset paths, concise titles, optional locations, and image dimensions there. Do not substitute stock images as Aaron's travel photos.

Photo Channel's file picker is a private, temporary local viewer. It does not upload or persist files. Object URLs are released on clear/unmount. It accepts up to 24 JPEG/PNG/WebP files, each at most 15 MB and 40 megapixels. Reloading or leaving the channel clears these temporary selections.

## Validation

- `npm run build`
- `node --test tests/*.test.mjs`
- `node tests/browser-regression.mjs` with an installed Playwright module and a running preview; `PORTFOLIO_URL`, `PLAYWRIGHT_MODULE`, and `BROWSER_CHANNEL` can select the environment.
- Current browser checks: startup keyboard/focus trap; hidden skip link and keyboard activation; same-tab reload; blocked session storage; twelve-channel order; retired route redirects; Mii launch/return; HOME dialog; banner and clock layout; desktop and 320px, 390px, and 844px viewports. These are browser viewport checks, not physical-device tests.

## Historical phone layout checks (before Play removal)

The mobile stylesheet keeps game controls compact, preserves 44px primary controls and 52px Snake direction buttons, and allows document scrolling in short landscape windows. Form text remains 16px and viewport zoom is not disabled. Safe-area spacing is provided for notches and home indicators.

Checked in browser-sized viewports at 320×568, 375×667, 390×844, and 844×390: menu navigation, game start/pause/restart, Minesweeper flag toggling, paddle slider, Mii editor cancellation, and portfolio/Projects/Resume/Aaron AI/Photo Channel overflow. These are browser viewport checks, not physical iOS or Android device tests.
