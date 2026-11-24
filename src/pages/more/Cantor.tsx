import { Ext, Lean, PageHead, Step } from '../../components/Shell';
import { M, MD } from '../../tex';

const SRC = {
  mactutor: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cantor/',
  sep: 'https://plato.stanford.edu/entries/settheory-early/',
  mathlibReal: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/Analysis/Real/Cardinality.html',
  mathlibCantor: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/Logic/Function/Basic.html',
};

const LEAN_REAL = `
theorem Cardinal.not_countable_real : ¬(Set.univ : Set ℝ).Countable`;

const LEAN_CANTOR = `
theorem Function.cantor_surjective {α} (f : α → Set α) : ¬Surjective f := fun hf ↦
  let ⟨a, ha⟩ := hf {a | a ∉ f a}
  iff_not_self <| .of_eq <| congrArg (a ∈ ·) ha`;

export function Cantor() {
  return (
    <article>
      <PageHead
        kicker="Set theory · Georg Cantor · 1874 and 1891"
        title="Cantor’s diagonal argument"
        lede={<>There are more real numbers than whole numbers. Both collections are infinite, but no list, however long, can contain every real number. The proof takes half a page and changed what mathematicians mean by “infinite”.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">At a glance</h2>
          <dl>
            <dt>Who and when</dt>
            <dd>Georg Cantor. According to <Ext href={SRC.mactutor}>MacTutor</Ext> he had proved the real numbers are not countable by December 1873 and published it in 1874, using a different argument. The diagonal argument shown here came in a short later paper, usually dated 1891 (the <Ext href={SRC.sep}>Stanford Encyclopedia</Ext> gives 1892, the year it appeared in print).</dd>
            <dt>Status</dt>
            <dd>Classical. In Mathlib as <code>Cardinal.not_countable_real</code>, and the general form as <code>Function.cantor_surjective</code>.</dd>
          </dl>
        </aside>

        <h2 id="what">What it says</h2>
        <p>A set is <em>countable</em> if you can list its members as a first, second, third and so on, with every member turning up somewhere in the list. The whole numbers are countable, obviously. Less obviously, so are the fractions: list them in order of numerator plus denominator, skipping repeats, and every fraction appears eventually.</p>
        <p>Cantor’s theorem is that the real numbers, all the points on the number line, are <em>not</em> countable. Every attempted list leaves some out.</p>

        <h2 id="why">Why it matters</h2>
        <p>It shows that infinity comes in different sizes, which was a genuinely new and, at the time, controversial idea. It has a striking side effect. Cantor had also shown the algebraic numbers (roots of polynomials with whole-number coefficients) are countable. So the real numbers that are <em>not</em> algebraic, the transcendental numbers like <M t="\pi" />, cannot be countable either. In that sense almost every real number is transcendental, even though proving any particular number is transcendental is hard.</p>
        <p>The diagonal trick itself turned out to be one of the most useful ideas in logic. It is the engine of <a href="/halting-problem">the halting problem</a> and of Gödel’s incompleteness theorems.</p>

        <h2 id="proof">The proof, step by step</h2>
        <p>This is the complete proof. It is enough to show that the numbers between 0 and 1 can’t be listed, because a list of all real numbers would contain a list of those.</p>
        <ol className="steps">
          <Step n={1} title="Suppose there is a list">
            <p>Assume, hoping for a contradiction, that <M t="r_1, r_2, r_3, \dots" /> is a list containing every real number strictly between 0 and 1.</p>
          </Step>

          <Step n={2} title="Write each number as a decimal">
            <p>Write out each number’s decimal expansion, and call the digits <M t="d_{n1}, d_{n2}, d_{n3}, \dots" />:</p>
            <MD t="\begin{aligned} r_1 &= 0.\,\mathbf{d_{11}}\,d_{12}\,d_{13}\,d_{14}\dots \\ r_2 &= 0.\,d_{21}\,\mathbf{d_{22}}\,d_{23}\,d_{24}\dots \\ r_3 &= 0.\,d_{31}\,d_{32}\,\mathbf{d_{33}}\,d_{34}\dots \end{aligned}" />
            <p>One snag: a few numbers have two expansions, such as <M t="0.5000\ldots = 0.4999\ldots" />. This only ever happens when one expansion ends in endless 0s and the other in endless 9s. For those numbers, pick the one ending in 0s, so each number has one agreed expansion.</p>
          </Step>

          <Step n={3} title="Walk down the diagonal">
            <p>Build a new number <M t="x = 0.e_1 e_2 e_3 \dots" /> by changing the bold diagonal digits. For each <M t="n" />, look at the <M t="n" />th digit of the <M t="n" />th number and choose</p>
            <MD t="e_n = \begin{cases} 6 & \text{if } d_{nn} = 5, \\ 5 & \text{otherwise.} \end{cases}" />
          </Step>

          <Step n={4} title="x is a real number between 0 and 1">
            <p>Every digit of <M t="x" /> is a 5 or a 6, so <M t="x" /> lies between 0.5 and 0.7. And since its expansion never ends in endless 0s or 9s, it is the only decimal expansion <M t="x" /> has.</p>
          </Step>

          <Step n={5} title="x is not on the list">
            <p>Pick any position <M t="n" />. The <M t="n" />th digit of <M t="x" /> is different from the <M t="n" />th digit of <M t="r_n" />, by construction. Two different expansions can only name the same number in the 0s-and-9s situation from step 2, and <M t="x" /> is not in that situation. So <M t="x \ne r_n" />. This holds for every <M t="n" />, so <M t="x" /> is nowhere on the list.</p>
          </Step>

          <Step n={6} title="Contradiction">
            <p>The list was supposed to contain every number between 0 and 1, and <M t="x" /> is one it misses. So no such list exists, and the real numbers are uncountable.</p>
          </Step>
        </ol>
        <p className="note">The choice of 5 and 6 is just to dodge the 0s-and-9s snag. Any rule that avoids producing 0 and 9 works.</p>

        <h2 id="general">The same idea, in general</h2>
        <p>Strip out the decimals and the argument says: no set can be matched up with all of its own subsets. Suppose <M t="f" /> sends each element <M t="a" /> of a set <M t="A" /> to a subset <M t="f(a)" />. Form the “diagonal” set</p>
        <MD t="D = \{\, a \in A : a \notin f(a) \,\}" />
        <p>If <M t="D" /> were <M t="f(d)" /> for some <M t="d" />, then <M t="d \in D" /> exactly when <M t="d \notin D" />, which is impossible. So <M t="f" /> misses <M t="D" />. The set of subsets is always strictly bigger, which gives an endless ladder of larger and larger infinities.</p>
        <p>Mathlib’s proof of this general form is three lines, and it is exactly the argument above: take the set <code>{'{a | a ∉ f a}'}</code> and derive “<code>a ∈ D</code> if and only if not <code>a ∈ D</code>”.</p>
        <Lean caption={<>From Mathlib’s <Ext href={SRC.mathlibCantor}><code>Logic.Function.Basic</code></Ext>, in full.</>}>{LEAN_CANTOR}</Lean>
        <Lean caption={<>From Mathlib’s <Ext href={SRC.mathlibReal}><code>Analysis.Real.Cardinality</code></Ext>: the set of all reals is not countable. The same file proves the stronger <code>Cardinal.mk_real</code>, that the reals have the cardinality of the continuum.</>}>{LEAN_REAL}</Lean>

        <h2 id="sources">Sources</h2>
        <ul>
          <li><Ext href={SRC.mactutor}>MacTutor: Georg Cantor</Ext></li>
          <li><Ext href={SRC.sep}>Stanford Encyclopedia of Philosophy: The Early Development of Set Theory</Ext></li>
          <li><Ext href={SRC.mathlibReal}>Mathlib: Analysis.Real.Cardinality</Ext></li>
          <li><Ext href={SRC.mathlibCantor}>Mathlib: Logic.Function.Basic</Ext></li>
        </ul>
      </div>
    </article>
  );
}
