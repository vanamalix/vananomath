import type { ReactElement } from 'react';
import { PROOFS, type Proof } from './site';
import { Home, NotFound } from './pages/Home';
import { Riemann } from './pages/Riemann';
import { Fermat } from './pages/Fermat';
import { LeanGuide } from './pages/LeanGuide';
import { Reading } from './pages/Reading';
import { About } from './pages/About';

export const ALL_PROOFS: Proof[] = PROOFS;

export interface Route {
  title: string;
  description: string;
  element: ReactElement;
}

const proofDescription = (p: Proof) => `${p.claim} ${p.statusText}`;

export const ROUTES: Record<string, Route> = {
  '/': {
    title: 'vananomath · proofs made with AI, one step at a time',
    description: 'Proofs made or machine-checked with AI, explained step by step, starting with the 2026 Lean proof of the Riemann Hypothesis.',
    element: <Home proofs={ALL_PROOFS} />,
  },
  '/riemann-hypothesis': { title: 'The Riemann Hypothesis · vananomath', description: proofDescription(PROOFS[0]), element: <Riemann /> },
  '/fermats-last-theorem': { title: 'Fermat’s Last Theorem · vananomath', description: proofDescription(PROOFS[1]), element: <Fermat /> },
  '/lean': { title: 'How to read Lean · vananomath', description: 'Read a Lean theorem statement and the top of its proof, with the Riemann Hypothesis as the example.', element: <LeanGuide /> },
  '/reading': { title: 'Reading list · vananomath', description: 'Primary sources on the 2026 Riemann Hypothesis proof, machine-checked proof, and the mathematics behind it.', element: <Reading /> },
  '/about': { title: 'About · vananomath', description: 'What this site is and how it is built.', element: <About /> },
};

export const NOT_FOUND: Route = { title: 'Page not found · vananomath', description: '', element: <NotFound /> };
