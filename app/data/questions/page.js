import Link from 'next/link';
import { questions, href } from '@/lib/content';
import c from '../chart.module.css';

export const metadata = {
  title: 'Questions',
  description: 'Thirty business questions to answer with the Isla Velaluz dataset, plus twelve open portfolio projects.',
};

const SIZE = (s) => (s === 'any' ? 'Works in any size' : s.startsWith('any') ? `Works in ${s}` : `Needs ${s}`);

export default function Questions() {
  return (
    <div className={`wrap ${c.page}`}>
      <nav aria-label="Breadcrumb"><ol className={c.crumbs}><li><Link href="/data/">Data Center</Link></li><li>Questions</li></ol></nav>
      <h1 className={c.title}>Thirty questions someone at the resort needs answered</h1>
      <p className={c.lede}>
        Each one is written the way it would arrive at work: from a person, without telling you which tables to join or
        what you will find. Every question has a real answer in the data.
      </p>
      <div className={c.callout}>
        <p>
          <strong>How to read an entry.</strong> Asked by is who wants the answer, so write your result for that person.
          Start with names the tables most likely to matter. Level runs from 1 (a few queries) to 3 (several steps and a
          judgment call). A good answer says what you found, how sure you are, what else could explain it and what you
          would do about it.
        </p>
      </div>

      {questions.themes.map((t) => (
        <section key={t.theme}>
          <h2 className={c.h2}>{t.theme}</h2>
          <ol className={c.questions}>
            {t.questions.map((q) => (
              <li key={q.number} value={q.number} id={`q${q.number}`}>
                <h3 className={c.qTitle}>{q.title}</h3>
                <p><span className={c.asked}>Asked by the {q.asked_by}.</span> {q.body}</p>
                <dl className={c.qMeta}>
                  <div><dt>Start with</dt><dd>{q.start_with.map((n, i) => <span key={n}>{i > 0 && ', '}<Link href={href.table(n)} className={c.code}>{n}</Link></span>)}</dd></div>
                  <div><dt>Skills</dt><dd>{q.skills}</dd></div>
                  <div><dt>Size</dt><dd>{SIZE(q.size)}</dd></div>
                  <div><dt>Level</dt><dd>{q.level} of 3</dd></div>
                </dl>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <h2 className={c.h2}>Open projects</h2>
      <p className={c.small}>No planted answer here. These are the standard portfolio builds, and the data is wide enough to support all of them.</p>
      <ul className={c.projects}>
        {questions.projects.map((p) => <li key={p.name}><strong>{p.name}.</strong> {p.body}</li>)}
      </ul>

      <div className={c.callout}>
        <p>
          <strong>Checking your work.</strong> The answers are published separately, behind a spoiler notice. A finding is
          worth more in a portfolio when it is yours, so try the question first. If you publish what you find, please mark
          spoilers.
        </p>
      </div>
    </div>
  );
}
