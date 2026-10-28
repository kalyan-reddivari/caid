import { Link } from 'react-router-dom';
import SITE from '../../site.config.js';

// Plain-language privacy policy and website terms. Have them reviewed by counsel before launch (see CONTENT-TODO.md).
const UPDATED = '28 October 2026';

function LegalPage({ title, intro, children }) {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Legal</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <p className="small muted">Last updated {UPDATED}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap legal-body">{children}</div>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <LegalPage title="Privacy policy" intro={`How ${SITE.legalName} handles the personal information you give us through this website.`}>
      <h2>Who we are</h2>
      <p>
        This website is run by {SITE.legalName} ("CAID", "we"), based in {SITE.city}, {SITE.region}, United States.
        Questions about this policy go to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><b>Contact form and call requests:</b> your name, work email, company, what you are interested in and your message.</li>
        <li><b>Project brief:</b> the same contact details, plus project type, stage, timeline, budget range, systems and goals.</li>
        <li><b>Job applications:</b> your name, email, phone number, a link to your resume or profile, and anything you write about the role.</li>
        <li><b>Basic usage data:</b> if we turn on website analytics, pages visited and buttons clicked, without advertising cookies.</li>
      </ul>

      <h2>Why we use it</h2>
      <p>
        Only to reply to you, prepare for a conversation you asked for, consider you for a role, and understand which
        pages help visitors. We do not sell your information or use it for advertising.
      </p>

      <h2>Who can see it</h2>
      <p>
        CAID staff who need it to respond to you, and the service providers that host our website and systems on
        our behalf, under agreements that protect it. We share information with authorities only when the law requires it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Inquiries and briefs: up to two years after our last conversation, unless you become a client. Job
        applications: up to one year, so we can contact you about later openings. You can ask us to delete it sooner.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete the information we hold about you by emailing{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We reply within 30 days. Depending on where you live, laws
        such as the CCPA or GDPR may give you further rights, and we will honor them.
      </p>

      <h2>Security</h2>
      <p>
        We send form data over encrypted connections and limit access to the people who need it. No system is
        perfectly secure, so please don't send passwords or other secrets through our forms.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy, we will update the date at the top of this page.</p>
      <p><Link to="/terms">Website terms of use</Link></p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage title="Website terms of use" intro="The terms that apply when you use this website.">
      <h2>Using this site</h2>
      <p>
        This website is provided by {SITE.legalName} for general information about our services and products. You
        may use it for that purpose. Please don't try to disrupt it, gain unauthorized access, or copy it in bulk.
      </p>

      <h2>No advice or offer</h2>
      <p>
        Content here describes how we usually work. It is not professional advice and not a binding offer.
        Any engagement is governed by a separate signed agreement, which takes precedence over this site.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The CAID name, the c&#123;Ai&#125;d wordmark, our product names and the content of this site belong to {SITE.legalName}.
        Underwrit and Orbitward have their own terms on their own websites.
      </p>

      <h2>Links to other sites</h2>
      <p>We link to sites we don't control and are not responsible for their content or practices.</p>

      <h2>Liability</h2>
      <p>
        The site is provided as is. To the extent the law allows, CAID is not liable for losses that come from
        using it or relying on its content.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of {SITE.region}, United States.</p>

      <h2>Contact</h2>
      <p>Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See also our <Link to="/privacy">privacy policy</Link>.</p>
    </LegalPage>
  );
}
