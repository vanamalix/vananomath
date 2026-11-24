import { Ext, PageHead } from '../components/Shell';

type Item = { href: string; title: string; who: string; note: string };

const GROUPS: { id: string; heading: string; intro?: string; items: Item[] }[] = [
  {
    id: 'proof-2026',
    heading: 'The 2026 proof',
    items: [
      { href: 'https://alpo.ge/remark.pdf', title: 'Announcement (remark.pdf)', who: 'Levent Alpöge, 20 Nov 2026', note: 'Four pages: the claim, how it was found with Claude, and a rough timeline of the ideas.' },
      { href: 'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/', title: 'Lean verification of the Riemann Hypothesis', who: 'Lean FRO and Mathlib Initiative, 21 Nov 2026', note: 'The joint statement certifying the statement and proof, with their reasons.' },
      { href: 'https://math.mit.edu/~drew/grh/', title: 'Verification files for the Lean proof', who: 'Andrew Sutherland (MIT)', note: 'Every check run, with logs: builds, axioms, independent kernels, comparator.' },
      { href: 'https://github.com/CocoSgt/riemann-hypothesis-lean', title: 'Mirror of the Lean archive', who: 'GitHub', note: 'Browse the code without downloading 14 archive parts.' },
      { href: 'https://github.com/JGalego/riemann', title: 'JGalego/riemann', who: 'GitHub', note: 'Build script, axiom audit, plain-language sketch, and proof animations.' },
      { href: 'https://github.com/youbaiyun/riemann-hypothesis-claude-proof-does-not-hold', title: 'A source audit arguing the proof fails', who: 'GitHub, 24 Nov 2026', note: 'The main published critique. See our notes on why it does not reach the kernel checks.' },
    ],
  },
  {
    id: 'checking',
    heading: 'Machine-checked proof',
    items: [
      { href: 'https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/', title: '“…and the proof is checked in Lean”', who: 'Xena Project, 12 Nov 2026', note: 'Four questions to ask before believing an AI-generated Lean proof.' },
      { href: 'https://github.com/leanprover/comparator', title: 'comparator', who: 'Lean FRO', note: 'The tool that matches a proved theorem against a trusted statement.' },
      { href: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/LSeries/RiemannZeta.html', title: 'Mathlib: RiemannZeta', who: 'Mathlib docs', note: 'Where RiemannHypothesis and the functional equation are defined.' },
    ],
  },
  {
    id: 'background',
    heading: 'The hypothesis itself',
    items: [
      { href: 'https://www.claymath.org/wp-content/uploads/2023/04/Wilkins-translation.pdf', title: 'On the Number of Prime Numbers less than a Given Quantity', who: 'Bernhard Riemann, 1859 (tr. D. R. Wilkins)', note: 'The original eight pages, in English.' },
      { href: 'https://www.claymath.org/wp-content/uploads/2022/05/riemann.pdf', title: 'Problems of the Millennium: the Riemann Hypothesis', who: 'Enrico Bombieri, Clay Mathematics Institute', note: 'The official problem statement, with history and equivalent forms.' },
      { href: 'https://www.ams.org/notices/200303/fea-conrey-web.pdf', title: 'The Riemann Hypothesis', who: 'J. Brian Conrey, Notices of the AMS, 2003', note: 'A readable survey of the approaches tried before 2026.' },
      { href: 'https://www.claymath.org/millennium-problems/rules/', title: 'Rules for the Millennium Prize Problems', who: 'Clay Mathematics Institute', note: 'Publication, two years, general acceptance.' },
    ],
  },
  {
    id: 'ideas',
    heading: 'Ideas the proof builds on',
    intro: 'The papers below are the classical sources for the ideas named in the announcement. They are research mathematics. The first two are the most approachable.',
    items: [
      { href: 'https://doi.org/10.1090/S0002-9904-1949-09219-4', title: 'Numbers of solutions of equations in finite fields', who: 'André Weil, Bull. AMS, 1949', note: 'The Weil conjectures: Riemann Hypothesis analogues over finite fields.' },
      { href: 'https://www.numdam.org/item/SB_1972-1973__15__234_0/', title: 'Counting points on curves over finite fields', who: 'Enrico Bombieri, Séminaire Bourbaki, 1973', note: 'Stepanov’s multiplicity method, the ancestor of the 2026 argument.' },
      { href: 'https://www.numdam.org/item/PMIHES_1974__43__273_0/', title: 'La conjecture de Weil. I', who: 'Pierre Deligne, Publ. IHÉS, 1974', note: 'The finite-field Riemann Hypothesis in general.' },
      { href: 'https://doi.org/10.1112/plms/s2-50.2.107', title: 'A summation formula in the theory of prime numbers', who: 'A. P. Guinand, Proc. LMS, 1948', note: 'The explicit formula linking primes and zeros.' },
      { href: 'https://doi.org/10.1090/S0894-0347-1989-0985172-6', title: 'Transcending classical invariant theory', who: 'Roger Howe, J. AMS, 1989', note: 'The theta correspondence, behind the theta lifts.' },
      { href: 'https://arxiv.org/abs/0909.2999', title: 'Symplectic local root numbers, central critical L-values, and restriction problems', who: 'Gan, Gross and Prasad, 2009', note: 'The Gan–Gross–Prasad conjectures and Bessel periods.' },
      { href: 'https://www.numdam.org/item/SB_1994-1995__37__115_0/', title: 'Périodes et isogénies des variétés abéliennes sur les corps de nombres', who: 'Jean-Benoît Bost, Séminaire Bourbaki, 1995', note: 'The slope inequality from Arakelov theory.' },
    ],
  },
];

export function Reading() {
  return (
    <article>
      <PageHead kicker="Sources" title="Reading list" lede="Primary sources first. Each link was checked when this page was written (24 November 2026)." />
      <div className="vn-container prose">
        {GROUPS.map((g) => (
          <section key={g.id} aria-labelledby={g.id}>
            <h2 id={g.id}>{g.heading}</h2>
            {g.intro && <p>{g.intro}</p>}
            <ul className="refs">
              {g.items.map((i) => (
                <li key={i.href}>
                  <Ext href={i.href}>{i.title}</Ext>
                  <span className="ref-who">{i.who}</span>
                  <span className="ref-note">{i.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
