'use client';

import { useState } from 'react';
import c from '@/app/data/chart.module.css';
import { GITHUB_URL as url } from './links';

// The link is only added to the page after a deliberate click.
export default function AnswersGate() {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <p className={c.actions}>
        <button type="button" className={c.primary} onClick={() => setOpen(true)}>
          I have tried the questions. Show me where the answers are.
        </button>
      </p>
    );
  }
  return (
    <div className={c.callout} role="status">
      <p>
        <strong>The answer key is on GitHub.</strong> Open <code>docs/ANSWER_KEY.md</code> in the repository below. It has
        its own spoiler notice at the top, then each finding with the query that recovers it.
      </p>
      <p style={{ marginTop: '0.75rem' }}><a href={url} rel="nofollow">{url}</a></p>
    </div>
  );
}
