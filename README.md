# Isla Velaluz site

The website for Isla Velaluz, a fictional island resort and the home of a free synthetic dataset for analyst
portfolio projects. The resort is not real and nothing on the site can be booked.

- Dataset: https://www.kaggle.com/datasets/chadwambles/isla-velaluz-resort
- Generator and answer key (spoilers): https://github.com/chadwambles/isla-velaluz

## Run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

`npm run build` writes the finished static site to `out/`.

## How it is put together

- Next.js App Router, plain JavaScript, exported as static HTML (`output: 'export'`).
- `app/(resort)/` holds the resort pages, styled with the Lantern Hour theme.
- `app/data/` holds the Data Center, styled with the Chart Room theme.
- `styles/tokens-lantern.css` and `styles/tokens-chart.css` hold each theme's colors and fonts.
- `content/` will hold the JSON generated from the dataset by `tools/build_content.py` (added in Phase 1).

## Deploy

Vercel builds and publishes on every push to `main`. Framework preset: Next.js. No environment variables.
