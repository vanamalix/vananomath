import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

// Runs against the built dist/ (pnpm run check builds before testing).
const dist = path.resolve('dist');

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

const pages = existsSync(dist) ? htmlFiles(dist) : [];
const routes = new Set(
  pages.map((f) => {
    const rel = path.relative(dist, f).replace(/\\/g, '/');
    return rel === 'index.html' ? '/' : '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  }),
);

describe('built site', () => {
  it('has the core pages and a 404', () => {
    for (const p of ['/', '/riemann-hypothesis', '/infinitely-many-primes', '/root-two-is-irrational', '/lean', '/reading', '/about', '/404']) {
      expect(routes.has(p), p).toBe(true);
    }
  });

  it.each(pages.map((p) => [path.relative(dist, p), p]))('%s: internal links resolve', (_name, file) => {
    const html = readFileSync(file, 'utf8');
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith('/assets/') || href === '/favicon.svg') continue;
      expect(routes.has(href.replace(/\/$/, '') || '/'), `${file} links to ${href}`).toBe(true);
    }
  });

  it.each(pages.map((p) => [path.relative(dist, p), p]))('%s: no inline script, no third-party script, footer island present', (_name, file) => {
    const html = readFileSync(file, 'utf8');
    expect(html).not.toMatch(/<script(?![^>]*\bsrc="\/assets\/)[^>]*>/);
    expect(html).toContain('id="footer-island"');
    expect(html).toContain('albe.vananomad.com');
  });

  it('renders maths as MathML and never leaves raw TeX behind', () => {
    const html = readFileSync(path.join(dist, 'riemann-hypothesis', 'index.html'), 'utf8');
    expect(html).toContain('<math');
    // KaTeX keeps the TeX source in <annotation> for copying and assistive tech. Outside that, none may remain.
    const visible = html.replace(/<annotation[^>]*>[\s\S]*?<\/annotation>/g, '');
    expect(visible).not.toMatch(/\\(frac|operatorname|sum|tfrac)/);
  });

  it('never mentions the private safety portal or links the sleep app', () => {
    for (const f of pages) {
      const html = readFileSync(f, 'utf8').toLowerCase();
      expect(html).not.toContain('safety portal');
      expect(html).not.toMatch(/href="https?:\/\/sleep\./);
    }
  });

  it('keeps the strict CSP with only the Shielded frame added', () => {
    const headers = readFileSync(path.join(dist, '_headers'), 'utf8');
    expect(headers).toContain("script-src 'self'");
    expect(headers).toContain("style-src 'self'");
    expect(headers).toContain('frame-src https://staticcdn.co.nz');
  });
});
