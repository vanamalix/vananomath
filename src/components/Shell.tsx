import type { ReactNode } from 'react';
import { Footer, LogoMark } from '@vanamalix/ui';
import { ALBE, NAV, SITE } from '../site';

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div className="vn-page">
      <a className="vn-skip" href="#main">Skip to content</a>
      <header className="vn-header">
        <div className="vn-container vn-header__inner">
          <a className="vn-logo" href="/" aria-label={`${SITE.name}, home`}>
            <LogoMark className="vn-logo__mark" />
            <span className="vn-logo__word">vanano<span className="brand-math">math</span></span>
          </a>
          <nav aria-label="Primary">
            <ul className="vn-nav">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} aria-current={path === n.href ? 'page' : undefined}>{n.label}</a>
                </li>
              ))}
              <li><a href={ALBE.href} className="nav-out">{ALBE.label} ↗</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      {/* The footer is the one hydrated island: its Shielded button needs a script. */}
      <div id="footer-island"><Footer /></div>
    </div>
  );
}

export function PageHead({ kicker, title, lede }: { kicker?: string; title: string; lede?: ReactNode }) {
  return (
    <header className="page-head">
      <div className="vn-container">
        {kicker && <p className="kicker">{kicker}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </header>
  );
}

/** A numbered step in a proof walkthrough. */
export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="step">
      <h3><span className="step-n" aria-hidden="true">{n}</span>{title}</h3>
      <div className="step-body">{children}</div>
    </li>
  );
}

export function Lean({ children, caption }: { children: string; caption?: ReactNode }) {
  return (
    <figure className="code">
      <pre tabIndex={0}><code>{children.replace(/^\n/, '').replace(/\s+$/, '')}</code></pre>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} rel="noopener noreferrer">{children}</a>;
}
