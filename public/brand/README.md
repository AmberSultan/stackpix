# Brand assets

| File | Used for |
| --- | --- |
| `logo.svg` | The mark. Header tile, preloader, favicon, apple-touch-icon. |
| `logo-lockup.svg` | Mark + wordmark on a square tile. Not used by the site — kept for social avatars, invoices, decks. |

## Notes

- **Both files were cleaned on import.** The Figma export had captured a ~15px
  rectangle filled `#0D99FF` (Figma's own brand blue) inside a clip group — a
  stray blue speck in the corner of the mark. That group and its `clipPath`
  definition were removed from both files. If you re-export from Figma, check
  for `0D99FF` before committing:

  ```bash
  grep -c 0D99FF public/brand/*.svg   # should print 0
  ```

- **The mark is a full-bleed tile**, so the site clips it to the interface
  radius (`rounded-[0.6rem]`) rather than relying on the SVG's own corner
  rounding, which is much squarer than the rest of the UI.

- **The tile colour `#0D8A98` is baked in and does not follow the theme.** That
  is intentional — a logo should be one fixed colour everywhere. It sits a
  shade brighter than the light theme's `--p-brand` (`#0b7a87`), which is
  deliberate: that token is darkened only so small *text* clears contrast.

- **The wordmark beside the mark is HTML, not part of the SVG** — it stays
  crisp at any size and re-colours with the theme. `site.mark` renders behind
  the image as a fallback, so a failed request degrades to a lettered tile
  rather than an empty box.
