import type { ReactElement } from 'react';
import { PROOFS, type Proof } from './site';
import { Home, NotFound } from './pages/Home';
import { Riemann } from './pages/Riemann';
import { Primes, RootTwo } from './pages/Classics';
import { LeanGuide } from './pages/LeanGuide';
import { Reading } from './pages/Reading';
import { About } from './pages/About';

type MoreProof = Proof & { Page: () => ReactElement };

// More proof pages live in src/pages/more/ and register themselves in its index.ts.
// The glob keeps the build working whether or not that folder exists yet.
const more = Object.values(import.meta.glob<{ MORE_PROOFS: MoreProof[] }>('./pages/more/index.ts', { eager: true }))[0]?.MORE_PROOFS ?? [];

export const ALL_PROOFS: Proof[] = [...PROOFS, ...more.map(({ Page: _p, ...p }) => p)];

export interface Route {
  title: string;
  description: string;
  element: ReactElement;
}

const proofDescription = (p: Proof) => `${p.claim} ${p.statusText}`;

export const ROUTES: Record<string, Route> = {
  '/': {
    title: 'vananomath · famous proofs, one step at a time',
    description: 'The big theorems of mathematics explained step by step, starting with the 2026 Lean proof of the Riemann Hypothesis.',
    element: <Home proofs={ALL_PROOFS} />,
  },
  '/riemann-hypothesis': { title: 'The Riemann Hypothesis · vananomath', description: proofDescription(PROOFS[0]), element: <Riemann /> },
  '/infinitely-many-primes': { title: 'There are infinitely many primes · vananomath', description: proofDescription(PROOFS[1]), element: <Primes /> },
  '/root-two-is-irrational': { title: 'The square root of 2 is irrational · vananomath', description: proofDescription(PROOFS[2]), element: <RootTwo /> },
  '/lean': { title: 'How to read Lean · vananomath', description: 'Read a Lean theorem statement and the top of its proof, with the Riemann Hypothesis as the example.', element: <LeanGuide /> },
  '/reading': { title: 'Reading list · vananomath', description: 'Primary sources on the 2026 Riemann Hypothesis proof, machine-checked proof, and the mathematics behind it.', element: <Reading /> },
  '/about': { title: 'About · vananomath', description: 'What this site is and how it is built.', element: <About /> },
  ...Object.fromEntries(more.map((p) => [p.path, { title: `${p.title} · vananomath`, description: proofDescription(p), element: <p.Page /> }])),
};

export const NOT_FOUND: Route = { title: 'Page not found · vananomath', description: '', element: <NotFound /> };
