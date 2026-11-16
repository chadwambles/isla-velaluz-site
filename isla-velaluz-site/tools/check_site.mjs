// Runs after every build. Fails the build if the spoiler wall has a hole or an internal link is broken.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = 'out';
const GENERATOR_REPO = /github\.com\/chadwambles\/isla-velaluz(?!-site)/; // the answer key lives here
// Words that belong to analysis of the company, not to anything a guest would read.
const RESORT_BLOCKLIST = [
  'answer key', 'spoiler', 'breakdown', 'broke down', 'downtime', 'out of service', 'deferred', 'maintenance', 'work order',
  'understaff', 'turnover', 'overtime', 'stockout', 'late deliver', 'supplier', 'budget', 'ledger', 'holdout', 'attribution',
  'churn', 'renewal rate', 'cannibal', 'root cause', 'rolled back', 'incident', 'complaint', 'refund', 'wait times rose', 'wait times fell',
];
// The home page mentions the ledger when it points to the dataset. The about page describes the dataset and is exempt.
const ALLOWED = { ledger: ['/index.html'] };
const EXEMPT = ['/about/index.html', '/404.html'];

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) pages.push(p);
  }
})(OUT);

const problems = [];
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').toLowerCase();

for (const file of pages) {
  const rel = '/' + relative(OUT, file).replaceAll('\\', '/');
  const html = readFileSync(file, 'utf8');
  const inData = rel.startsWith('/data/');
  const isGate = rel === '/data/answers/index.html';

  // 1. The generator repo address is in no page's HTML. The gate adds it only after a click.
  if (GENERATOR_REPO.test(html)) problems.push(`${rel}: links to the generator repo`);

  // 2. Resort pages carry none of the analysis vocabulary.
  if (!inData && !EXEMPT.includes(rel)) {
    const body = text(html.replace(/<footer[\s\S]*?<\/footer>/g, ' '));
    for (const word of RESORT_BLOCKLIST) {
      if (body.includes(word) && !(ALLOWED[word] || []).includes(rel)) problems.push(`${rel}: contains "${word}"`);
    }
  }

  // 3. The gate is kept out of search engines.
  if (isGate && !/<meta name="robots" content="noindex/.test(html)) problems.push(`${rel}: missing noindex`);

  // 4. Only the questions page and the Data Center footer link to the gate.
  if (!inData && html.includes('href="/data/answers/"')) problems.push(`${rel}: resort page links to the answers gate`);

  // 5. Internal links resolve.
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith('/_next')) continue;
    const target = join(OUT, href, href.endsWith('/') ? 'index.html' : '');
    if (!existsSync(target)) problems.push(`${rel}: broken link ${href}`);
  }
}

if (problems.length) {
  console.error(`\nSite check failed (${problems.length}):\n` + [...new Set(problems)].slice(0, 40).join('\n'));
  process.exit(1);
}
console.log(`Site check passed: ${pages.length} pages, spoiler wall intact, no broken links.`);
