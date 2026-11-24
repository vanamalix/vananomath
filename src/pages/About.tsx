import { Ext, PageHead } from '../components/Shell';
import { ALBE } from '../site';

export function About() {
  return (
    <article>
      <PageHead kicker="About" title="About this site" />
      <div className="vn-container prose">
        <p>vananomath is a small, growing list of famous proofs, each explained one step at a time for someone who is curious but isn’t a mathematician. Where a proof has been formalised in Lean, the page shows the statement so you can see exactly what was proved.</p>
        <p>The explanations summarise published sources, linked on every page. Nobody behind this site has independently checked the 2026 Lean proof. Spotted a mistake? That’s useful to hear.</p>
        <p>The sister site <Ext href={ALBE.href}>{ALBE.label}</Ext> is {ALBE.blurb}.</p>

        <h2>How it is built</h2>
        <p>Every page is written in TypeScript with React, then rendered to plain HTML when the site is built. The maths is turned into MathML at the same time, so your browser draws it natively and the reading pages need no JavaScript. The one script is for the Shielded site button in the footer.</p>
        <p>The pages are served as static files from Cloudflare Workers. There is no server code, database, cookies or analytics, and nothing you do here is recorded.</p>
        <p>Why TypeScript and not, say, Django? Cloudflare Workers run JavaScript and TypeScript natively. Python Workers exist, but a framework like Django expects a long-running server and a database, which this site doesn’t need. A site of explanations is best as static pages, and TypeScript keeps it on the same tools as the other vananomad sites.</p>
      </div>
    </article>
  );
}
