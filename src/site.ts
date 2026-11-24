export const SITE = {
  name: 'vananomath',
  host: 'math.vananomad.com',
  origin: 'https://math.vananomad.com',
  tagline: 'Famous proofs, one step at a time',
};

/** Sister site: curved spacetime you can play with. */
export const ALBE = { href: 'https://albe.vananomad.com/', label: 'albe', blurb: 'curved spacetime you can play with' };

export const NAV = [
  { href: '/', label: 'Proofs' },
  { href: '/lean', label: 'Reading Lean' },
  { href: '/reading', label: 'Reading list' },
  { href: '/about', label: 'About' },
];

export type Status = 'checked-2026' | 'classical';

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
    path: '/infinitely-many-primes',
    title: 'There are infinitely many primes',
    claim: 'The list of prime numbers never ends.',
    who: 'Euclid',
    when: 'about 300 BCE',
    status: 'classical',
    statusText: 'Classical. Also in Mathlib as Nat.exists_infinite_primes.',
  },
  {
    path: '/root-two-is-irrational',
    title: 'The square root of 2 is irrational',
    claim: 'No fraction of whole numbers squares to exactly 2.',
    who: 'the Pythagorean school',
    when: 'about 400 BCE',
    status: 'classical',
    statusText: 'Classical. Also in Mathlib as irrational_sqrt_two.',
  },
];
