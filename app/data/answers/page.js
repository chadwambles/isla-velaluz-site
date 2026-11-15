import Link from 'next/link';
import AnswersGate from '@/components/AnswersGate';
import c from '../chart.module.css';

export const metadata = {
  title: 'Answers (spoilers)',
  description: 'Where to find the answer key for the Isla Velaluz questions.',
  robots: { index: false, follow: false },
};

export default function Answers() {
  return (
    <div className={`wrap ${c.page}`}>
      <nav aria-label="Breadcrumb"><ol className={c.crumbs}><li><Link href="/data/">Data Center</Link></li><li><Link href="/data/questions/">Questions</Link></li><li>Answers</li></ol></nav>
      <h1 className={c.title}>Stop here if you have not tried the questions</h1>
      <p className={c.lede}>
        Every one of the 30 questions has a real answer that was built into the data and then recovered with plain SQL.
        The answer key gives each finding, the query behind it and how it was planted.
      </p>
      <ul className={c.projects}>
        <li>A finding is worth more in a portfolio when you reached it yourself. Once you have read an answer, you cannot discover it.</li>
        <li>The key also contains the code that generated the data, which gives away even more.</li>
        <li>No answers are on this website. This page only tells you where they are.</li>
      </ul>
      <p className={c.small}>Not ready? <Link href="/data/questions/">Go back to the questions.</Link></p>
      <AnswersGate />
    </div>
  );
}
