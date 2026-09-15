# LOOK HERE STUDIO

An independent design studio storefront — warm cream editorial ground, near‑black
type, IBM Plex Mono labels. The only strong colour is the logo and the product
photography. Built as a real, working commerce site (cart, product pages,
collection, journal, process, contact), not a static mockup.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Don't run `npm run build` while `npm run dev` is running — the production
> build overwrites the dev `.next` cache. Use one at a time.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Plain CSS** design system in `app/globals.css` (no Tailwind — precise control
  over the editorial grid, hairlines and type)
- Fonts via `next/font`: **Inter** (display headlines), **IBM Plex Mono**
  (labels / nav / most body), **Roboto** (long‑form article + product prose)
- Cart via React Context + `localStorage`

## Routes

| Route | What |
|---|---|
| `/` | Home — hero, why, objects, made‑here (video), at‑home, current drop, newsletter |
| `/objects` | Full catalogue with filters (ALL / WALL / TABLE / LIGHT / MIRROR / FRAME / FESTIVAL) |
| `/objects/[slug]` | Product detail — gallery, status‑driven CTA, specs, process, at‑home, good‑to‑know, related, prev/next |
| `/collections/[slug]` | Collection page (`festival-01`) |
| `/process` | Process film + the 7 build steps |
| `/why-look-here` | Studio story |
| `/journal` + `/journal/[slug]` | Notes listing + articles |
| `/contact` | Working contact form |
| `/api/waitlist`, `/api/contact` | Form endpoints (see “Forms”) |

## Project structure

```
app/                routes, globals.css, layout (fonts + CartProvider + Nav/Footer/CartDrawer)
components/         AnimatedLogo, Nav, Footer, ProductTile, CatalogueGrid, AddToCart,
                    VideoPlayer, Newsletter, ContactForm, SmartImage, CTA, SpecTable, Reveal
components/cart/    CartContext (state + localStorage), CartDrawer
components/sections/ Hero, WhyLookHere, ObjectsPreview, MadeHere, AtHome, CurrentDrop, NewsletterSection
data/               products.ts, collections.ts, journal.ts  (all content lives here)
lib/types.ts        the data contract (CMS/commerce‑ready)
public/objects/     product photography      public/lifestyle/  room + festival shots
public/media/       process-film.mp4 + poster public/logo-*.png  the logo
```

## Adding / editing products

Everything comes from `data/products.ts`. Add an entry to the `products` array and
it appears in the catalogue **and** gets its own page at `/objects/<slug>`, is
picked up by filters, related items, the sitemap, etc. Fields are typed in
`lib/types.ts`. Each product has `id, objectNumber, slug, name, shortName,
category, subcategory, tags, description, shortDescription, material, finish,
colour, dimensions, price, currency, status, images, lifestyleImages, collection,
leadTime, care, installation, featured, process, seoTitle, seoDescription`.

- `featured: true` puts it in the homepage “Objects” preview (first 7).
- `tags` drives the `/objects` filters.
- Collections are defined in `data/collections.ts` by listing `productSlugs`.

### Pricing note
No final prices were supplied, so the numbers in `data/products.ts` are
**provisional placeholders** (so the cart is demonstrable). Items whose price is
genuinely undecided use `price: null` + `status: "coming-soon"`, which the UI
renders as **PRICE COMING SOON**. Replace the numbers before launch.

### Product status → UI (driven from data, never hardcoded per page)
| status | price shown | button |
|---|---|---|
| `available` | price | ADD TO CART |
| `preorder` | price | PREORDER (adds to cart) |
| `coming-soon` | PRICE COMING SOON | TELL ME WHEN → (waitlist) |
| `sold-out` | price | JOIN WAITLIST → |
| `waitlist` | price / soon | JOIN WAITLIST → |

## Replacing images (they auto‑upgrade)

`SmartImage` preloads a file and swaps it in the moment it exists; the logo and
tiles fall back gracefully until then.

- **Logo**: `public/logo-stacked.png` (used by `AnimatedLogo`). Replace to change it.
- **Products**: put photos in `public/objects/` and list them per product under
  `images: []` in `data/products.ts` (first = primary). Room shots go in
  `public/lifestyle/` under `lifestyleImages: []`.
- **Process film**: `public/media/process-film.mp4` (+ `process-poster.jpg`).

The current product/lifestyle images and the process film are placeholders built
from the supplied reference material — swap in final assets the same way.

## The animated logo

`components/AnimatedLogo.tsx` — the real logo raster with a one‑off “liquid
settle” entrance (fade + rise + jelly squash/overshoot + an SVG
turbulence/displacement that resolves to **zero**, so the final frame is the
pristine artwork; the filter is then removed for a sharp result). Desktop hover
gives one tiny wobble. `prefers-reduced-motion` gets a plain fade. It lives once,
centred, in the nav.

## Forms (configurable endpoints)

Both forms POST to Next route handlers that are **provider‑agnostic**. Copy
`.env.example` → `.env.local` and set what you use; with nothing set, dev writes
to `data/*.local.json` so everything works locally.

- **Waitlist** (`/api/waitlist`): Buttondown / ConvertKit / Mailchimp / generic webhook.
- **Contact** (`/api/contact`): generic webhook (Zapier / Make / Slack / your API).

## Connecting real commerce later

- **Cart** state is centralised in `components/cart/CartContext.tsx`. Swap the
  `localStorage` persistence and wire the checkout button in `CartDrawer.tsx`
  (currently a stub `alert`) to **Shopify** (Storefront API / cart) or **Stripe**
  (Checkout Session). The line‑item shape is small and documented in the file.
- **Products** can be sourced from a CMS/commerce backend by replacing
  `data/products.ts` with a fetch that returns the same `Product` shape.

## Accessibility / SEO
Semantic HTML, skip link, keyboard‑operable nav/menu/cart/forms, focus states,
`prefers-reduced-motion` support, per‑route metadata, `sitemap.xml`, `robots.txt`.
