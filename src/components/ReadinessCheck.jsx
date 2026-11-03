import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { track } from '../utils/track.js';

// AI readiness self-check: eight questions, an instant result and a suggested first project.
// Answers stay in the browser; nothing is sent anywhere.

const QUESTIONS = [
  { q: 'Where does the data for your first AI idea live?', a: ['Spread across spreadsheets and inboxes', 'In a few systems, not connected', 'In connected systems or a data platform'] },
  { q: 'Can your core systems share data automatically?', a: ['No, people copy it', 'Some flows, some manual steps', 'Yes, through APIs or events'] },
  { q: 'Do you have a specific process in mind?', a: ['Not yet', 'A few ideas', 'One clear process with an owner'] },
  { q: 'Can you measure that process today?', a: ['No', 'Roughly', 'Yes, with numbers we trust'] },
  { q: 'Is there a policy for using AI at work?', a: ['No', 'Being written', 'Yes, and people know it'] },
  { q: 'Who would approve what AI does?', a: ['Unclear', 'Someone, informally', 'Named owners with clear limits'] },
  { q: 'Has your team used AI tools in their work?', a: ['Hardly at all', 'Some individuals', 'Widely, with shared practices'] },
  { q: 'Is there budget and a sponsor?', a: ['Not yet', 'Interest, no budget', 'A sponsor and a budget'] },
];

const BANDS = [
  {
    max: 6,
    title: 'Start with the foundations',
    text: 'AI will struggle until the data moves. Connect the two systems behind your most manual process first; that integration usually pays for itself and makes every later AI project faster.',
    first: 'Integrate the systems behind your most manual process',
  },
  {
    max: 11,
    title: 'Ready for a focused pilot',
    text: 'You have enough in place to prove value on one process. Pick it, agree how success is measured, and run a pilot on real data with a person approving its actions.',
    first: 'A six-week pilot on one measurable process',
  },
  {
    max: 16,
    title: 'Ready to scale',
    text: 'The groundwork is there. The next step is governance at scale: approvals, audit trails and evaluation, so more teams can use AI without more risk.',
    first: 'Governed rollout across teams, with approvals and audit',
  },
];

export default function ReadinessCheck() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [shown, setShown] = useState(false);
  const result = useRef(null);
  // The result replaces a long form, so bring it into view.
  useEffect(() => { if (shown) result.current?.scrollIntoView({ block: 'start' }); }, [shown]);
  const answered = answers.filter((x) => x !== null).length;
  const score = answers.reduce((n, x) => n + (x || 0), 0);
  const band = BANDS.find((b) => score <= b.max);

  const pick = (qi, ai) => setAnswers((list) => list.map((x, i) => (i === qi ? ai : x)));
  const finish = () => { setShown(true); track('readiness_check', { score }); };
  const reset = () => { setAnswers(Array(QUESTIONS.length).fill(null)); setShown(false); };

  if (shown) {
    return (
      <div className="rc-result" role="status" ref={result}>
        <div className="rc-score">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="50" className="rc-ring-bg" />
            <circle cx="60" cy="60" r="50" className="rc-ring" style={{ '--p': score / 16 }} />
          </svg>
          <span><b>{score}</b>/16</span>
        </div>
        <div>
          <span className="eyebrow">Your result</span>
          <h3>{band.title}</h3>
          <p>{band.text}</p>
          <p className="small"><strong>Suggested first project:</strong> {band.first}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact?interest=AI%20adoption#book" data-track="readiness:result">Talk it through with us</Link>
            <button type="button" className="btn btn-ghost" onClick={reset}>Start again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="rc" onSubmit={(e) => { e.preventDefault(); finish(); }}>
      <div className="rc-progress" aria-hidden="true"><i style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} /></div>
      <p className="small muted">{answered} of {QUESTIONS.length} answered. Your answers stay in your browser.</p>
      <ol className="rc-list">
        {QUESTIONS.map((item, qi) => (
          <li key={item.q}>
            <fieldset>
              <legend>{item.q}</legend>
              <div className="rc-options">
                {item.a.map((label, ai) => (
                  <label key={label} className={answers[qi] === ai ? 'on' : ''}>
                    <input type="radio" name={`rc-${qi}`} checked={answers[qi] === ai} onChange={() => pick(qi, ai)} />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <button type="submit" className="btn btn-primary" disabled={answered < QUESTIONS.length}>
        {answered < QUESTIONS.length ? `Answer ${QUESTIONS.length - answered} more to see your result` : 'See my result'}
      </button>
    </form>
  );
}
