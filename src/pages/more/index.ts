import type { JSX } from 'react';
import type { Proof } from '../../site';
import { Basel } from './Basel';
import { Cantor } from './Cantor';
import { Fermat } from './Fermat';
import { FourColour } from './FourColour';
import { Halting } from './Halting';
import { Pythagoras } from './Pythagoras';

/** Six more famous proofs, oldest first. Each entry carries its page component. */
export const MORE_PROOFS: Array<Proof & { Page: () => JSX.Element }> = [
  {
    path: '/pythagoras',
    title: 'Pythagoras’ theorem',
    claim: 'In a right-angled triangle, the square on the longest side equals the sum of the squares on the other two.',
    who: 'known in Babylon; oldest surviving proof in Euclid',
    when: 'about 300 BCE (Euclid)',
    status: 'classical',
    statusText: 'Classical. Also in Mathlib as EuclideanGeometry.dist_sq_eq_dist_sq_add_dist_sq_iff_angle_eq_pi_div_two.',
    Page: Pythagoras,
  },
  {
    path: '/basel-problem',
    title: 'The Basel problem',
    claim: 'The reciprocals of the square numbers add up to exactly pi squared over six.',
    who: 'Leonhard Euler',
    when: '1735',
    status: 'classical',
    statusText: 'Classical. Also in Mathlib as hasSum_zeta_two.',
    Page: Basel,
  },
  {
    path: '/cantor-diagonal',
    title: 'Cantor’s diagonal argument',
    claim: 'There are more real numbers than whole numbers: no list can contain them all.',
    who: 'Georg Cantor',
    when: '1891 (first proof of uncountability 1874)',
    status: 'classical',
    statusText: 'Classical. Also in Mathlib as Cardinal.not_countable_real and Function.cantor_surjective.',
    Page: Cantor,
  },
  {
    path: '/halting-problem',
    title: 'The halting problem',
    claim: 'No program can always correctly decide whether another program will eventually stop.',
    who: 'Alan Turing',
    when: '1936',
    status: 'classical',
    statusText: 'Classical. Also in Mathlib as ComputablePred.halting_problem.',
    Page: Halting,
  },
  {
    path: '/four-colour-theorem',
    title: 'The Four Colour Theorem',
    claim: 'Every map can be coloured with four colours so that neighbouring countries differ.',
    who: 'Kenneth Appel and Wolfgang Haken',
    when: '1976',
    status: 'classical',
    statusText: 'Computer-assisted; formally verified in Coq by Georges Gonthier (2005).',
    Page: FourColour,
  },
  {
    path: '/fermats-last-theorem',
    title: 'Fermat’s Last Theorem',
    claim: 'For any power n bigger than 2, a to the n plus b to the n never equals c to the n in positive whole numbers.',
    who: 'Andrew Wiles, with Richard Taylor',
    when: '1994 (published 1995)',
    status: 'classical',
    statusText: 'Peer reviewed and accepted since 1995. Fully formalised in Lean by Anthropic in September 2026.',
    Page: Fermat,
  },
];
