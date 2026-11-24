import { Ext, Lean, PageHead, Step } from '../components/Shell';
import { M, MD } from '../tex';

const SRC = {
  remark: 'https://alpo.ge/remark.pdf',
  leanBlog: 'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/',
  drew: 'https://math.mit.edu/~drew/grh/',
  xena: 'https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/',
  mirror: 'https://github.com/CocoSgt/riemann-hypothesis-lean',
  galego: 'https://github.com/JGalego/riemann',
  galegoReport: 'https://jgalego.github.io/riemann/',
  critique: 'https://github.com/youbaiyun/riemann-hypothesis-claude-proof-does-not-hold',
  clay: 'https://www.claymath.org/millennium-problems/rules/',
  mathlibRH: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/LSeries/RiemannZeta.html',
};

const RH_OF_RIGHT = `
theorem Formalism.VW.rh_of_right
    (hz : ∀ s : ℂ, 1 / 2 < s.re → s ≠ 1 → riemannZeta s ≠ 0) :
    RiemannHypothesis := by
  unfold RiemannHypothesis
  intro s hs htriv hs1
  rcases lt_trichotomy s.re (1 / 2) with hlt | heq | hgt
  · exfalso
    -- s is left of the line, so 1 - s is right of it ...
    have key := riemannZeta_one_sub hnat h1   -- the functional equation
    ...
  · exact heq                                -- s is on the line: done
  · exact absurd hs (hz s hgt hs1)           -- right of the line: no zeros there`;

const RH_OF_EVERY = `
theorem Formalism.VW.rh_of_every (h : UpperTheory.EveryCharacter) : RiemannHypothesis :=
  Formalism.VW.rh_of_right fun s hs hs1 => by
    have := h 1 (1 : DirichletCharacter ℂ 1) s hs (Or.inr hs1)
    rwa [LFunction_modOne_eq] at this`;

const EVERY_CHARACTER = `
def UpperTheory.EveryCharacter : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ),
    1 / 2 < s.re → (χ ≠ 1 ∨ s ≠ 1) → DirichletCharacter.LFunction χ s ≠ 0`;

export function Riemann() {
  return (
    <article>
      <PageHead
        kicker="Proof 1 · number theory · 1859 to 2026"
        title="The Riemann Hypothesis"
        lede={<>Every non-trivial zero of the Riemann zeta function has real part exactly <M t="\tfrac12" />. Posed in 1859, one of the Clay Millennium Problems, and as of November 2026 the subject of a 17-million-line Lean proof found by Levent Alpöge working with Claude.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">Where things stand (24 November 2026)</h2>
          <dl>
            <dt>Claim</dt>
            <dd>On 20 November 2026 Levent Alpöge <Ext href={SRC.remark}>announced</Ext> a proof found “working with Claude”, extending to the Generalized Riemann Hypothesis for Dirichlet L-functions, and published it only as Lean code: 175,187 files and about 17 million lines, depending only on Mathlib.</dd>
            <dt>Checked</dt>
            <dd>On 21 November the Lean FRO and the Mathlib Initiative issued a <Ext href={SRC.leanBlog}>joint statement</Ext> certifying “that both the statement and the proof of the Riemann Hypothesis are correct”. Andrew Sutherland’s <Ext href={SRC.drew}>verification page</Ext> (MIT) records the code compiling, only Lean’s three standard axioms used, and acceptance by several independent proof checkers (nanoda, con-leche, con-ron, Lean’s default and paranoid kernels).</dd>
            <dt>Not yet</dt>
            <dd>There is no human-readable write-up. Alpöge calls the argument “incredibly long” and says he intends “to write it properly”. It has not been through journal peer review. The Clay prize <Ext href={SRC.clay}>rules</Ext> need publication in a qualifying outlet, two years’ wait and general acceptance, so the prize is not in play yet.</dd>
            <dt>Disputed</dt>
            <dd>A <Ext href={SRC.critique}>source audit</Ext> posted on 24 November argues the proof fails because some internal definitions are set to <code>True</code>. Its authors say they compiled nothing. See <a href="#critique">below</a> for why that argument does not reach the kernel checks.</dd>
          </dl>
          <p className="small">This page summarises primary sources linked in each line. It is an explainer, not an independent check. We have read parts of the Lean source but have not built or audited it.</p>
        </aside>

        <nav className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            <li><a href="#what">What the hypothesis says</a></li>
            <li><a href="#why">Why anyone cares: primes</a></li>
            <li><a href="#proof">The proof, step by step</a></li>
            <li><a href="#checked">How a proof nobody has read gets checked</a></li>
            <li><a href="#critique">The critique</a></li>
            <li><a href="#next">Where to go next</a></li>
          </ol>
        </nav>

        <h2 id="what">What the hypothesis says</h2>
        <p>For a number <M t="s" /> with real part bigger than 1, the zeta function is the infinite sum</p>
        <MD t="\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \cdots" />
        <p>Riemann showed this extends to a function on the whole complex plane (except a single pole at <M t="s=1" />). The extended function is zero at <M t="-2, -4, -6, \dots" />. These are the <em>trivial zeros</em>, and they are well understood.</p>
        <p>Every other zero lies in the <em>critical strip</em> <M t="0 < \operatorname{Re}(s) < 1" />. Riemann’s guess was that they all sit on the middle of that strip, the <em>critical line</em>:</p>
        <MD t="\zeta(s) = 0,\ \ s \notin \{-2,-4,-6,\dots\} \implies \operatorname{Re}(s) = \tfrac12" />
        <p>The first ten trillion or so zeros have been checked numerically and all lie on the line. Numbers can’t settle it though. There are infinitely many zeros, and a proof has to cover every one.</p>

        <h2 id="why">Why anyone cares: primes</h2>
        <p>Euler noticed that the sum over all whole numbers is also a product over the primes:</p>
        <MD t="\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}" />
        <p>So the zeta function encodes the primes. Riemann turned that into an exact formula for the number of primes up to <M t="x" />, with one correction term for each zero. The further a zero sits from the critical line, the bigger its term can grow. Zeros on the line keep the corrections as small as they can possibly be. In symbols, the hypothesis is equivalent to</p>
        <MD t="\pi(x) = \operatorname{Li}(x) + O\!\left(\sqrt{x}\,\log x\right)" />
        <p>where <M t="\pi(x)" /> counts the primes up to <M t="x" /> and <M t="\operatorname{Li}(x) = \int_2^x \frac{dt}{\log t}" /> is the smooth best guess. Put plainly, the primes are as evenly spread as they could be. Hundreds of published theorems begin “assuming the Riemann Hypothesis…”, and a proof turns those into plain theorems.</p>

        <h2 id="proof">The proof, step by step</h2>
        <p className="note">A map, not the proof. Steps 1 to 3 can be read directly from the top of the Lean code. Steps 4 to 7 follow Alpöge’s four-page <Ext href={SRC.remark}>announcement</Ext>. The whole walkthrough draws on the plain-language sketch in <Ext href={SRC.galego}>JGalego/riemann</Ext>. The announcement’s timeline of ideas is one “Claude provided”, and Alpöge notes that some of it paraphrases Claude and may need editing, so read steps 4 to 7 as headlines.</p>

        <ol className="steps">
          <Step n={1} title="Only the right half of the strip needs checking">
            <p>Zeta has a mirror symmetry, the <em>functional equation</em>, which relates <M t="\zeta(s)" /> to <M t="\zeta(1-s)" />:</p>
            <MD t="\zeta(1-s) = 2\,(2\pi)^{-s}\cos\!\left(\tfrac{\pi s}{2}\right)\Gamma(s)\,\zeta(s)" />
            <p>A zero to the left of the line would have a twin zero to the right of it. So “every zero is on the line” is the same statement as “there are no zeros to the right of the line”. The file <code>RhOfRight.lean</code> proves this reduction in about 60 lines, using Mathlib’s <code>riemannZeta_one_sub</code>:</p>
            <Lean caption={<>Shortened from <code>Formalism/GammaFactorNonvanishing/RhOfRight.lean</code>. The <code>...</code> hides the steps that check the other factors in the functional equation are non-zero.</>}>{RH_OF_RIGHT}</Lean>
          </Step>

          <Step n={2} title="Zeta is one member of a bigger family">
            <p>A <em>Dirichlet L-function</em> is the same kind of sum with a twist, <M t="L(s,\chi) = \sum \chi(n)\, n^{-s}" />, where <M t="\chi" /> is a <em>character</em>, a pattern that repeats every <M t="N" /> numbers. Zeta is the simplest case, the character mod 1. The proof does the harder job of proving the <em>Generalized</em> Riemann Hypothesis for every Dirichlet L-function, then reads off ordinary RH as the special case <M t="N = 1" />:</p>
            <Lean caption={<>Excerpt from <code>Formalism/GammaFactorNonvanishing/CritLine.lean</code>.</>}>{RH_OF_EVERY}</Lean>
          </Step>

          <Step n={3} title="Everything else proves one statement">
            <p>The remaining roughly 175,000 files prove a single proposition: no Dirichlet L-function has a zero with real part bigger than <M t="\tfrac12" />. This is where all the new mathematics lives.</p>
            <Lean caption={<><code>Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean</code>.</>}>{EVERY_CHARACTER}</Lean>
          </Step>

          <Step n={4} title="Borrow a trick from finite fields">
            <p>There is a version of the Riemann Hypothesis for curves over finite fields. Weil proved it in the 1940s and Deligne proved the general version in 1974. Stepanov later found an elementary route for hyperelliptic curves, which Bombieri extended to all curves in 1973. He builds an auxiliary polynomial that vanishes to <em>high multiplicity</em> at every point being counted, and that multiplicity forces the count to be close to its expected value.</p>
            <p>Over the ordinary integers there is no obvious notion of vanishing to high order. Alpöge describes it as “something like differentiating whole numbers”. That gap is why the finite-field proofs never carried over.</p>
          </Step>

          <Step n={5} title="Fake multiplicity with chains of theta lifts">
            <p>The new idea is to imitate multiplicity with a chain of <em>theta lifts</em>. These carry automorphic forms (highly symmetric functions) from one unitary group to a larger one, a step at a time. Each lift plays the part of one more order of vanishing.</p>
            <p>The line Alpöge singles out: for the sum over primes up to <M t="X" />, weighted by the von Mangoldt function <M t="\Lambda(n)" />, Claude suggested a chain about <M t="\sqrt{X}" /> lifts long. In the Lean code a chain is the inductive type <code>IsIterLift</code>.</p>
          </Step>

          <Step n={6} title="Turn positivity into “no zeros to the right”">
            <p>The <em>explicit formula</em> of Guinand and Weil links sums over primes to sums over zeros. If a carefully chosen prime sum can be shown to have a definite sign and the right size, a zero to the right of the line would contradict it. The theta-lift chain gives that control.</p>
          </Step>

          <Step n={7} title="A great deal of supporting machinery">
            <p>According to the announcement the full argument also uses Iwasawa towers, Bost’s slope inequality from Arakelov theory, a relative trace formula, Bessel periods and seesaw identities from the Gan–Gross–Prasad setting, a weakened form of Vandiver’s conjecture, and Behrend sets. Alpöge expects much of this to be simplified away. In his words, his “intuition insists it will be massively simplified, likely immediately”.</p>
          </Step>
        </ol>

        <h2 id="checked">How a proof nobody has read gets checked</h2>
        <p>Nobody can read 17 million lines. The trust comes from a different place. Kevin Buzzard’s <Ext href={SRC.xena}>Xena post</Ext> (12 November 2026) sets out four questions to ask of any AI-generated Lean proof. Here they are with what has been reported for this one.</p>
        <table>
          <caption>The four questions, and the answers reported so far</caption>
          <thead><tr><th scope="col">Question</th><th scope="col">Reported answer</th></tr></thead>
          <tbody>
            <tr><td>Is the Lean statement the real statement?</td><td>Yes. The headline theorem has type <Ext href={SRC.mathlibRH}><code>RiemannHypothesis</code></Ext>, defined in Mathlib by humans before this proof existed, not inside the proof’s own files.</td></tr>
            <tr><td>Does the code compile?</td><td>Yes. Dozens of independent builds reproduced the same proof export (Lean FRO statement). Sutherland’s sandboxed rebuild matched byte for byte.</td></tr>
            <tr><td>Does it prove that statement and nothing else, with no extra axioms?</td><td>Yes. Two independent tools (comparator and <code>con-leche --compare</code>) matched it to a file importing only Mathlib. <code>#print axioms</code> shows only <code>propext</code>, <code>Classical.choice</code> and <code>Quot.sound</code>.</td></tr>
            <tr><td>Could it be exploiting a bug in Lean itself?</td><td>Several independently written kernels accept it, and two (con-leche, con-ron) come with a formal proof, relative to set theory, that they cannot accept a false proof.</td></tr>
          </tbody>
        </table>
        <p>What the checks do <em>not</em> give is understanding. Lean says the argument is valid. It doesn’t say why it works or which parts matter, and that is the work still to come. See <a href="/lean">Reading Lean</a> for how to read the statement and the top-level proof yourself.</p>

        <h2 id="critique">The critique</h2>
        <p>The <Ext href={SRC.critique}>audit</Ext> makes two points. First, that the whole development rests on one proposition which is only ever defined, never proved. Second, that several internal conditions are “hardcoded to True”, for example <code>anyGeometry := fun _ _ _ =&gt; True</code>. Its authors say they did not compile anything and argue from the source text.</p>
        <p>We looked at the mirror’s source (read only, not built) on 24 November. The <code>True</code> definitions it quotes are real, for example <code>OverIx.lean</code> line 19 and <code>UnusedSlot72</code>. The first point doesn’t hold up, though. The proposition it says is never proved, <code>Row0b recT</code>, is proved as the theorem <code>galoisLocalGlobalStrong_recParameter</code> in <code>Foundations/GaloisRepresentations/IntegralStructures/RowSrc.lean</code>, and <code>MainConclusion.lean</code> feeds it straight into <code>everyCharacter</code>.</p>
        <p>On the second point, our reading, which you are welcome to check: in Lean, an internal definition that happens to be <code>True</code> cannot make a false theorem provable. It just makes that intermediate step trivial, and maybe means it was scaffolding that didn’t need to be there. What matters is whether the final theorem, with Mathlib’s statement and no hypotheses, is accepted by the kernel using only the standard axioms. That is exactly what the comparator and independent kernel checks above test. If a needed premise were missing, the theorem would carry it as a hypothesis or fail to type-check. The critique doesn’t address those checks. Its observations may still say something about how readable or efficient the code is, which is a fair point but a separate one.</p>

        <h2 id="next">Where to go next</h2>
        <ul>
          <li><Ext href={SRC.remark}>Alpöge’s announcement</Ext> (4 pages, PDF)</li>
          <li><Ext href={SRC.leanBlog}>Lean FRO and Mathlib Initiative statement</Ext></li>
          <li><Ext href={SRC.drew}>Sutherland’s verification files</Ext></li>
          <li>The code: <Ext href={SRC.mirror}>mirror of the Lean archive</Ext> and <Ext href={SRC.galego}>JGalego/riemann</Ext> with a build script and <Ext href={SRC.galegoReport}>report</Ext></li>
          <li><a href="/reading">The reading list</a>, from Riemann’s 1859 paper to the ideas the proof uses</li>
        </ul>
      </div>
    </article>
  );
}
