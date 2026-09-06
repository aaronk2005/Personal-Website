# Console channels

The Play menu links directly to nine games, each with its own channel tile. `/arcade` remains a redirect for older links.

Brick Breaker includes five stages, armor, combos, and falling power-ups. Snake adds difficulty-dependent wrapping and obstacles, increasing speed, and touch controls. Minesweeper supports a safe first reveal, flags, and number chording. Reversi includes legal-move hints, automatic passes, and three computer search depths. Four in a Row also has three computer difficulty settings. HOME pauses active game clocks.

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
- Browser checks: game tile navigation; Mii create/edit/cancel/delete; keyboard sliders; computer turn and restart; tennis HOME pause; local photo loading, effects, slideshow and puzzle completion; mobile widths 390px and 320px.
