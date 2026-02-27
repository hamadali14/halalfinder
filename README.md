# HalalFinder 🕌

A modern halal restaurant directory with a Liquid Glass (iOS-style) design system. Fully responsive, CMS-managed via Google Sheets, deployable on Vercel in minutes.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS (custom Liquid Glass design system) |
| CMS | Google Sheets (published CSV/JSON feed) |
| Hosting | Vercel |
| Images | Any public image URL (Google Drive, Imgur, etc.) |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/your-repo/halalfinder
cd halalfinder

# Install dependencies
npm install

# Copy env file
cp .env.local.example .env.local
# Leave GOOGLE_SHEET_URL empty to use sample data

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Google Sheets CMS Setup

### 1. Create the Sheet

Create a new Google Sheet and name it **HalalFinder CMS**. Create 4 tabs:

#### Tab: `restaurants`
Columns (in order):
```
id | name | slug | city | address | lat | lng | phone | website | coverImageUrl | galleryImageUrls | cuisines | halalStatus | certificationBody | priceLevel | rating | reviewCount | openingHours | features | isFeatured | isActive | lastUpdated
```

**Notes:**
- `halalStatus` must be one of: `certified`, `claimed`, `pork_free`, `alcohol_free`, `unknown`
- `features` is comma-separated: `prayer_space,wudu,family_seating,delivery,takeaway,wheelchair,vegetarian,vegan`
- `cuisines` is comma-separated: `Turkish,Indian,Burger`
- `galleryImageUrls` is comma-separated image URLs
- `isFeatured` and `isActive` must be `true` or `false`
- `priceLevel` is 1–4
- `rating` is 0.0–5.0
- `slug` must be unique, URL-safe (lowercase, hyphens only)

#### Tab: `cities`
```
city | country | isPopular
```

#### Tab: `site_settings`
```
heroTitle | heroSubtitle | brandName | accentStyle | featuredSectionTitle
```
(Single row of values, no header needed — or add a `key` | `value` format and adjust the parser)

#### Tab: `filters_config`
```
key | label | type | options | enabled | sortOrder
```

### 2. Publish the Sheet

1. Go to **File → Share → Publish to web**
2. For **Link**, choose the `restaurants` tab
3. Format: **Comma-separated values (.csv)**
4. Click **Publish** and copy the URL

Repeat for each tab, or use the JSON endpoint format:
```
https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json&sheet=restaurants
```

### 3. Connect to the Site

Set the environment variable:
```
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:json
```

In Vercel: Settings → Environment Variables → Add `GOOGLE_SHEET_URL`

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

**Environment Variables to set in Vercel:**
- `GOOGLE_SHEET_URL` — your published sheet URL

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── explore/page.tsx      # Directory + filters
│   ├── restaurants/[slug]/   # Restaurant detail
│   ├── cities/page.tsx       # Cities listing
│   ├── about/page.tsx        # About + disclaimer
│   ├── admin/
│   │   ├── page.tsx          # Admin control center
│   │   └── data-health/      # Data diagnostics
│   ├── api/data/route.ts     # Data API endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Liquid Glass CSS system
├── components/
│   ├── layout/               # Header, Footer
│   ├── restaurant/           # RestaurantCard
│   └── ui/                   # HalalBadge, StarRating, etc.
├── lib/
│   ├── data.ts               # Fetch, parse, filter, sort
│   └── sample-data.json      # 10 sample restaurants
└── types/index.ts            # TypeScript types
```

---

## Design System: Liquid Glass

The design system uses CSS custom properties and Tailwind utilities:

- **`.glass`** — Frosted glass panel
- **`.glass-strong`** — Stronger glass (overlays, modals)
- **`.glass-card`** — Interactive card with hover lift
- **`.glass-pill`** — Filter chips and small buttons
- **`.mesh-bg`** — Gradient mesh background (applied to body)
- **`.skeleton`** — Animated loading shimmer
- **`.badge-certified`** etc. — Halal status badge variants

---

## Customisation

### Colors
Edit `tailwind.config.ts` → `theme.extend.colors.halal` to change the accent color.

### Fonts
Edit `globals.css` → Google Fonts import + `--font-display` / `--font-body` variables.

### Filters
Edit the `filters_config` tab in Google Sheets to add/remove/reorder filter chips.

### Site Copy
Edit the `site_settings` tab in Google Sheets (heroTitle, heroSubtitle, etc.).

---

## Halal Status Values

| Value | Meaning |
|---|---|
| `certified` | Holds official certification (HFA, HMC, AHFC, etc.) |
| `claimed` | Claims halal but no certification |
| `pork_free` | No pork products served |
| `alcohol_free` | No alcohol served |
| `unknown` | Status not confirmed |

---

## Adding Images

Any public image URL works:
- **Google Drive**: Share → Anyone with link → Copy URL → Convert to direct link
- **Imgur**: Upload → Right-click image → Copy image address
- **Unsplash**: Use `https://images.unsplash.com/photo-ID?w=800&q=80`
- **Your own CDN**: Any publicly accessible URL

---

## License

MIT — Community-powered. Build freely.
