export const SITE = {
  name: 'vananomath',
  host: 'math.vananomad.com',
  origin: 'https://math.vananomad.com',
  tagline: 'Proofs made with AI, one step at a time',
};

/** Sister site: curved spacetime you can play with. */
export const ALBE = { href: 'https://albe.vananomad.com/', label: 'albe', blurb: 'curved spacetime you can play with' };

export const NAV = [
  { href: '/', label: 'Proofs' },
  { href: '/lean', label: 'Reading Lean' },
  { href: '/reading', label: 'Reading list' },
  { href: '/about', label: 'About' },
];

export type Status = 'checked-2026';

export interface Proof {
  path: string;
  title: string;
  /** Plain statement, no notation. */
  claim: string;
  who: string;
  when: string;
  status: Status;
  statusText: string;
}

/** The list on the home page, in order. */
export const PROOFS: Proof[] = [
  {
    path: '/riemann-hypothesis',
    title: 'The Riemann Hypothesis',
    claim: 'Every non-trivial zero of the Riemann zeta function lies on the line where the real part is one half.',
    who: 'Levent Alpöge, working with Claude',
    when: 'announced 20 November 2026',
    status: 'checked-2026',
    statusText: 'Machine-checked in Lean and certified by the Lean FRO and Mathlib Initiative. No human-readable write-up or peer review yet.',
  },
  {
    path: '/fermats-last-theorem',
    title: 'Fermat’s Last Theorem',
    claim: 'For any power n bigger than 2, a to the n plus b to the n never equals c to the n in positive whole numbers.',
    who: 'Andrew Wiles, with Richard Taylor; formalised in Lean by an Anthropic model',
    when: 'proved 1994, formalised 4 September 2026',
    status: 'checked-2026',
    statusText: 'Peer reviewed since 1995. Fully formalised in Lean by an AI model in September 2026 and checked by Kevin Buzzard.',
  },
];
