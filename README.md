# Alishba Zainab — Portfolio

A personal portfolio site built with **HTML, CSS, and JavaScript only**
— no framework, no build step. Everything is written so you can open
any file and explain exactly what it does to an evaluator.

## Languages / technologies used

- **HTML5** — page structure (`index.html`)
- **CSS3** — all styling, layout (CSS Grid/Flexbox), and animation (`css/style.css`)
- **JavaScript (vanilla, ES6+)** — nav behavior, scroll-reveal animations, hero card swap, contact form (`js/script.js`)
- **Google Fonts** (Fraunces, Inter, IBM Plex Mono) loaded via a CSS `<link>` — no local font files

No React, no Tailwind, no build tools — everything renders straight from these three files, which keeps it easy to read and explain line by line.

## Folder structure

```
portfolio/
├── index.html          → all page content and structure
├── css/
│   └── style.css       → design tokens + every style rule, organized by section
├── js/
│   └── script.js       → 7 small, independent features (see comments in the file)
├── assets/
│   ├── favicon.svg
│   └── avatar.svg       → dummy placeholder portrait
└── README.md
```

Project media is embedded live instead of using screenshots:
- **DocMind** — the actual live site, embedded in an iframe
- **Flight Delay Prediction** and **OutfitPicker** — Google Drive demo videos, embedded in an iframe

## Design concept

A "drafting desk / blueprint" theme: deep navy backgrounds with a
literal grid pattern (like blueprint paper), warm amber as the ink
accent, and pasted "paper"-colored cards for the project section.
Fraunces (serif) carries the headlines, Inter is the body text, and
IBM Plex Mono is used for technical labels.

Animation is used in a few deliberate places rather than everywhere:
- A **tech-stack card swap** in the hero (six cards in one spot, a JS timer toggles which one is visible, CSS just fades)
- A staggered **scroll-reveal** on section content, driven by `IntersectionObserver`
- A small **orbiting dot** near the contact section (a 2D animated object)
- A **scale-up on hover** effect on project cards (pure CSS, no JS)
- All animation respects `prefers-reduced-motion`

## Placeholder to replace before you present or deploy

- `assets/avatar.svg` → your real photo

## Run it locally

No build tools needed — just open `index.html` in a browser, or serve
it locally so relative links behave the same as they will online:

```bash
# from inside the portfolio/ folder
npx serve .
# or
python3 -m http.server 5500
```

## Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy on Vercel

1. Go to vercel.com → **Add New Project** → import the GitHub repo.
2. Framework preset: **Other** (this is static HTML — no build command
   or output directory needed).
3. Click **Deploy**. Vercel serves `index.html` as-is.

Any time you push to `main`, Vercel redeploys automatically.
