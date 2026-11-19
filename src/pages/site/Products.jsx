import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { IconTile } from '../../components/Icons.jsx';
import { AgentcraftArt, DryvaArt, OrbitwardArt, ProductsHeroArt, UnderwritArt } from '../../components/ProductGraphics.jsx';
import Reveal from '../../components/Reveal.jsx';
import UnderwritDemo from '../../components/UnderwritDemo.jsx';
import DotTerrain from '../../components/fx/DotTerrain.jsx';
import { PIPELINE, PRODUCTS, countWord } from '../../content/products.js';

const ART = { underwrit: UnderwritArt, orbitward: OrbitwardArt, agentcraft: AgentcraftArt, dryva: DryvaArt };

export default function Products() {
  return (
    <>
      <section className="page-hero has-art">
        <DotTerrain />
        <div className="wrap">
          <div>
            <span className="eyebrow">Products</span>
            <h1>Software we build and run ourselves</h1>
            <p>
              Four products you can use today: Underwrit approves and proves agent actions, Orbitward gives platform
              teams agents within guardrails, Agentcraft Studio designs agent workflows for free, and Dryva rehearses
              them against failures. {countWord(PIPELINE.length).replace(/^./, (c) => c.toUpperCase())} more, built on one shared platform, are in development.
            </p>
            <div className="hero-actions">
              {PRODUCTS.map((p, i) => (
                <a key={p.id} className={`btn ${i ? 'btn-ghost' : 'btn-primary'}`} href={`#${p.id}`}>{p.name}</a>
              ))}
              <a className="btn btn-ghost" href="#next">In development</a>
              <Link className="btn btn-ghost" to="/platform">How the stack works</Link>
            </div>
          </div>
          <div className="hero-art art-dark"><ProductsHeroArt /></div>
        </div>
      </section>

      {PRODUCTS.map((p, i) => (
        <Fragment key={p.id}>
        <section id={p.id} className={`section${i % 2 ? ' section-alt' : ''}`}>
          <div className={`wrap showcase${i % 2 ? ' flip' : ''}`}>
            <div className="showcase-copy">
              <Reveal>
                <div className="showcase-meta">
                  <span className="pill info">{p.category}</span>
                  <span className="status" data-state={p.state}>{p.status}</span>
                </div>
                <h2 className="showcase-name">{p.name}</h2>
                <p className="showcase-tagline">{p.tagline}</p>
                <p className="muted">{p.text}</p>
                <h3 className="showcase-label">Built for</h3>
                <div className="chips">{p.audience.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
              </Reveal>

              <div className="showcase-features">
                {p.features.map((f, k) => (
                  <Reveal key={f.title} className="point" delay={(k % 2) * 90}>
                    <IconTile name={f.icon} tone={k % 2 ? 'amber' : 'teal'} />
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {p.integrations && (
                <Reveal>
                  <h3 className="showcase-label">Works with</h3>
                  <div className="chips">{p.integrations.map((t) => <span className="chip mono" key={t}>{t}</span>)}</div>
                </Reveal>
              )}

              <Reveal className="showcase-actions">
                {p.url ? (
                  <>
                    <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer" data-track={`product-site:${p.id}`}>
                      {p.cta} <span aria-hidden="true">↗</span><span className="sr-only">(opens {p.url.replace('https://', '')} in a new tab)</span>
                    </a>
                    <Link className="btn btn-ghost" to={`/contact?interest=Products#book`} data-track={`product-talk:${p.id}`}>
                      Talk to us about {p.name}
                    </Link>
                  </>
                ) : (
                  <Link className="btn btn-primary" to={`/contact?interest=Products#book`} data-track={`product-talk:${p.id}`}>
                    {p.cta}
                  </Link>
                )}
                <span className="small muted">{p.note}</span>
              </Reveal>
            </div>

            <Reveal className="showcase-art art-dark" delay={120}>
              {(() => { const Art = ART[p.art]; return Art ? <Art /> : null; })()}
            </Reveal>
          </div>
        </section>
        {p.id === 'underwrit' && (
          <section className="section section-ink uw-demo-section" id="try-underwrit">
            <div className="wrap uw-demo-wrap">
              <Reveal>
                <span className="eyebrow">Try it</span>
                <h2>Approve an agent action yourself</h2>
                <p className="muted">
                  An AI agent wants to refund a customer. Watch Underwrit hold it, approve or deny it as the first
                  approver, and see the signed record it keeps either way.
                </p>
              </Reveal>
              <UnderwritDemo />
            </div>
          </section>
        )}
        </Fragment>
      ))}

      <section id="next" className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2>In development</h2>
              <p className="muted">{countWord(PIPELINE.length).replace(/^./, (c) => c.toUpperCase())} products on one shared platform, built from the integration, platform and AI work we do for clients. None is for sale yet; design partners shape what ships first. <Link to="/platform#roadmap">See the roadmap</Link>.</p>
            </div>
          </Reveal>
          <div className="pipeline-cards">
            {PIPELINE.map((p, i) => (
              <Reveal as="article" key={p.id} id={p.id} className="feature-card pipeline-card" delay={(i % 3) * 120}>
                <div className="pipeline-head">
                  <IconTile name={p.icon} tone={p.tone || 'teal'} />
                  <div>
                    <h3>{p.name}</h3>
                    <span className="pill info">{p.category}</span>
                  </div>
                </div>
                <p className="pipeline-problem">{p.problem}</p>
                <p>{p.text}</p>
                <h4 className="pipeline-built">Working in our lab today</h4>
                <ul className="pipeline-list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="chips">{p.buyers.map((b) => <span className="chip" key={b}>{b}</span>)}</div>
                <span className="small muted">Target for general availability: {p.ga}</span>
                <Link to="/contact?interest=Products#book" data-track={`product-partner:${p.id}`}>Become a design partner →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Have a product idea of your own? We build those for clients too.</h2>
          <Link className="btn" to="/process">See how a project runs</Link>
        </div>
      </section>
    </>
  );
}
