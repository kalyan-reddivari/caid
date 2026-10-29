// The same "what happens next" after every lead form, so people know what to expect.
export default function NextSteps({ email, call = true }) {
  return (
    <ol className="next-list">
      <li><b>Within 1 business day</b> a senior consultant replies to {email || 'you'}{call ? ' with times for a call' : ''}.</li>
      <li><b>On the call</b> we listen, ask questions and tell you honestly if we are not the right fit. It is free.</li>
      <li><b>Afterwards</b> you get a short written summary and a recommended next step, usually a small discovery.</li>
    </ol>
  );
}
