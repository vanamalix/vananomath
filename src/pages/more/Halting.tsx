import { Ext, Lean, PageHead, Step } from '../../components/Shell';
import { M } from '../../tex';

const SRC = {
  turing: 'https://doi.org/10.1112/plms/s2-42.1.230',
  sep: 'https://plato.stanford.edu/entries/turing-machine/',
  mactutor: 'https://mathshistory.st-andrews.ac.uk/Biographies/Turing/',
  mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/Computability/Halting.html',
};

const LEAN_HALT = `
theorem ComputablePred.halting_problem (n : ℕ) :
    ¬ComputablePred fun (c : Nat.Partrec.Code) => (c.eval n).Dom`;

export function Halting() {
  return (
    <article>
      <PageHead
        kicker="Logic and computing · Alan Turing · 1936"
        title="The halting problem"
        lede={<>No computer program can look at an arbitrary program and its input and always correctly say whether it will eventually stop or run forever. This is not a gap in current technology. It is a theorem, and the proof fits in a paragraph.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">At a glance</h2>
          <dl>
            <dt>Who and when</dt>
            <dd>Alan Turing, in <Ext href={SRC.turing}><em>On Computable Numbers, with an Application to the Entscheidungsproblem</em></Ext> (1936), the paper that introduced Turing machines. Alonzo Church reached the same conclusion about the Entscheidungsproblem independently the same year, by a different route (<Ext href={SRC.sep}>Stanford Encyclopedia</Ext>, section 2.4).</dd>
            <dt>A historical footnote</dt>
            <dd>Turing’s own undecidable question was slightly different: whether a machine goes on printing digits forever. The “will it halt?” version is the one taught today. The <Ext href={SRC.sep}>Stanford Encyclopedia</Ext> explains how the two relate.</dd>
            <dt>Status</dt>
            <dd>Classical. In Mathlib as <code>ComputablePred.halting_problem</code>.</dd>
          </dl>
        </aside>

        <h2 id="what">What it says</h2>
        <p>Imagine a program <M t="H" /> that takes two inputs, the source code of some program <M t="P" /> and an input <M t="w" />, and always finishes with one of two answers:</p>
        <ul>
          <li><strong>yes</strong> if <M t="P" /> run on <M t="w" /> would eventually stop,</li>
          <li><strong>no</strong> if it would run forever.</li>
        </ul>
        <p>The theorem says no such <M t="H" /> exists, in any programming language that can do what an ordinary computer does.</p>

        <h2 id="why">Why it matters</h2>
        <p>Turing’s goal was Hilbert’s <em>Entscheidungsproblem</em>: is there a mechanical procedure that decides whether any given statement of logic can be proved? To answer “no”, he first had to say precisely what a mechanical procedure is. His answer, the Turing machine, became the standard model of a computer, before any electronic computer had been built.</p>
        <p>The practical message is about limits on checking software. No tool can perfectly decide, for every program, whether it terminates, and the same reasoning rules out perfect general checkers for many other behaviours. Real tools prove termination for plenty of particular programs. What is impossible is one method that works for all of them.</p>

        <h2 id="proof">The proof, step by step</h2>
        <p>This is the complete argument, in the form usually taught. It uses one fact about computers: a program is just text, so it can be given to another program, or to itself, as input.</p>
        <ol className="steps">
          <Step n={1} title="Suppose a halting checker exists">
            <p>Assume, for a contradiction, that <M t="H(P, w)" /> always finishes and correctly answers whether program <M t="P" /> halts on input <M t="w" />.</p>
          </Step>

          <Step n={2} title="Build a contrary program">
            <p>Use <M t="H" /> to write a new program <M t="D" />. Given the source code of a program <M t="P" />, it does this:</p>
            <ul>
              <li>Run <M t="H(P, P)" />, asking whether <M t="P" /> halts when fed its own source code.</li>
              <li>If the answer is <strong>yes</strong>, go into an endless loop.</li>
              <li>If the answer is <strong>no</strong>, stop.</li>
            </ul>
            <p>Since <M t="H" /> always finishes, <M t="D" /> is a perfectly good program.</p>
          </Step>

          <Step n={3} title="Feed D its own code">
            <p>Now ask what <M t="D(D)" /> does. There are only two possibilities.</p>
            <ul>
              <li>If <M t="D(D)" /> halts, then <M t="H(D, D)" /> answered yes, so by its own instructions <M t="D" /> loops forever. It doesn’t halt.</li>
              <li>If <M t="D(D)" /> runs forever, then <M t="H(D, D)" /> answered no, so <M t="D" /> stops. It does halt.</li>
            </ul>
          </Step>

          <Step n={4} title="Contradiction">
            <p>Either way <M t="D(D)" /> does the opposite of what it does. The only assumption was that <M t="H" /> exists, so it can’t.</p>
          </Step>
        </ol>

        <h2 id="diagonal">Why this is Cantor’s trick again</h2>
        <p>Picture a table with every program down the side and every possible input across the top, each cell saying “halts” or “loops”. The program <M t="D" /> is built to disagree with row <M t="P" /> at column <M t="P" />, the diagonal. So <M t="D" />’s behaviour differs from every row in the table, yet <M t="D" /> is a program and must be one of the rows. This is exactly the shape of <a href="/cantor-diagonal">Cantor’s diagonal argument</a>, with programs in place of decimal expansions.</p>

        <h2 id="lean">In Lean</h2>
        <p>Mathlib models programs as codes for partial recursive functions (<code>Nat.Partrec.Code</code>), a standard equivalent of Turing machines. <code>(c.eval n).Dom</code> means “running program <code>c</code> on input <code>n</code> produces an answer”, that is, it halts. The theorem says that property is not computable. Mathlib derives it from Rice’s theorem, a generalisation which says no non-trivial property of what programs compute can be decided.</p>
        <Lean caption={<>From Mathlib’s <Ext href={SRC.mathlib}><code>Computability.Halting</code></Ext>.</>}>{LEAN_HALT}</Lean>

        <h2 id="sources">Sources</h2>
        <ul>
          <li>A. M. Turing, <Ext href={SRC.turing}>On Computable Numbers, with an Application to the Entscheidungsproblem</Ext>, <em>Proceedings of the London Mathematical Society</em> s2-42, pages 230 to 265</li>
          <li><Ext href={SRC.sep}>Stanford Encyclopedia of Philosophy: Turing Machines</Ext>, section 2.4</li>
          <li><Ext href={SRC.mactutor}>MacTutor: Alan Turing</Ext></li>
          <li><Ext href={SRC.mathlib}>Mathlib: Computability.Halting</Ext></li>
        </ul>
      </div>
    </article>
  );
}
