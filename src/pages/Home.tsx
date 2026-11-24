import { ALBE, PROOFS, SITE, type Proof } from '../site';

export function Home({ proofs = PROOFS }: { proofs?: Proof[] }) {
  return (
    <article>
      <header className="page-head home-head">
        <div className="vn-container">
          <h1>{SITE.tagline}</h1>
          <p className="lede">The big theorems of mathematics, explained step by step for the curious. First up is the newest: a proof of the Riemann Hypothesis announced in November 2026 by Levent Alpöge, working with Claude, and checked by computer in Lean.</p>
        </div>
      </header>
      <div className="vn-container">
        <ol className="proof-list">
          {proofs.map((p) => (
            <li key={p.path} className={`proof-card${p.status === 'checked-2026' ? ' proof-card--feature' : ''}`}>
              <h2><a href={p.path}>{p.title}</a></h2>
              <p className="claim">{p.claim}</p>
              <p className="meta">{p.who} · {p.when}</p>
              <p className="status-line"><span className="tag">{p.status === 'checked-2026' ? 'New' : 'Classic'}</span> {p.statusText}</p>
            </li>
          ))}
        </ol>
        <p className="aside-link">Also from vananomad: <a href={ALBE.href}>{ALBE.label}</a>, {ALBE.blurb}.</p>
      </div>
    </article>
  );
}

export function NotFound() {
  return (
    <article>
      <header className="page-head"><div className="vn-container"><h1>Page not found</h1></div></header>
      <div className="vn-container prose"><p>That page isn’t here. <a href="/">Back to the proofs</a>.</p></div>
    </article>
  );
}
