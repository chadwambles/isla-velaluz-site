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
- `content/*.json` is generated from the dataset by `tools/build_content.py`. Do not edit it by hand.
- `content/copy/*.json` is the hand-written text for each page, keyed by the page's slug. A park, land,
  attraction, venue or hotel gets its own page once it has an entry here.
- `lib/content.js` joins the two and is what the pages import.

## Refreshing the content after the dataset changes

```
pip install duckdb
python tools/build_content.py --data "C:/path/to/isla-velaluz-kaggle"
```

The folder must hold `sample/`, `DATA_DICTIONARY.md`, `data_dictionary.csv` and `QUESTIONS.md` (the Kaggle download has all four).
Commit the changed JSON. The website build itself never needs Python or the dataset.

## The spoiler wall

`npm run build` finishes by running `tools/check_site.mjs`. The build fails if a resort page uses analysis vocabulary
(breakdowns, budgets, turnover and so on), if any page's HTML contains the address of the generator repo, if the answers
gate loses its `noindex`, or if an internal link is broken. No answers live in this repo.

## Deploy

Vercel builds and publishes on every push to `main`. Framework preset: Next.js. No environment variables.

When the custom domain is attached, change `SITE_URL` in `components/links.js` to the new address and push. That one
value feeds the sitemap, `robots.txt` and the social preview image links.
