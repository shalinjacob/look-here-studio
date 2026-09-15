# Drop your real assets here — they appear automatically

Nothing else to change in code. The site preloads each asset and swaps it in
the moment the file exists; until then it shows the SVG logo / placeholder
drawings.

## Logo (the only colour on the site)

Save your acrylic renders as:

- `public/logo-stacked.png`  → used in the homepage hero (transparent PNG,
  roughly 3:2, ideally ~1200px+ wide)
- `public/logo-inline.png`   → optional, single-line version

To keep the built-in SVG logo instead, just don't add these files (or pass
`preferSvg` to `<Logo />`).

## Product photography

Put photos in `public/objects/` and list them per product in
`data/products.ts` under `photos: []`, e.g.

```ts
photos: [
  "/objects/jasmine-at-dusk-1.jpg",  // primary — shows in index + hero
  "/objects/jasmine-at-dusk-2.jpg",  // extra views show as a gallery on the page
],
```

The first image becomes the primary. Square-ish crops work best in the index
frames. Product photos may be in colour — the rest of the UI stays monochrome.
