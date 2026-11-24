import { Ext, Lean, PageHead, Step } from '../../components/Shell';
import { M, MD } from '../../tex';

const SRC = {
  wiles: 'https://annals.math.princeton.edu/1995/141-3/p01',
  taylorWiles: 'https://doi.org/10.2307/2118560',
  ribet: 'https://doi.org/10.1007/BF01231195',
  bcdt: 'https://doi.org/10.1090/S0894-0347-01-00370-8',
  mactutor: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Fermat%27s_last_theorem/',
  flt: 'https://imperialcollegelondon.github.io/FLT/',
  anthropic: 'https://github.com/anthropics/fermats-last-theorem',
  buzzard: 'https://xenaproject.wordpress.com/2026/09/04/flt-anthropic-has-beaten-me-to-it/',
  mathlibBasic: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/FLT/Basic.html',
  mathlibFour: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/FLT/Four.html',
};

const LEAN_FLT = `
def FermatLastTheorem : Prop := ∀ n ≥ 3, FermatLastTheoremFor n

theorem fermatLastTheoremFour : FermatLastTheoremFor 4`;

export function Fermat() {
  return (
    <article>
      <PageHead
        kicker="Number theory · Andrew Wiles · 1994"
        title="Fermat’s Last Theorem"
        lede={<>For any whole number <M t="n" /> bigger than 2, the equation <M t="a^n + b^n = c^n" /> has no solutions in positive whole numbers. Fermat claimed a proof in a margin. The real one took more than 350 years and some of the deepest mathematics of the twentieth century.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">At a glance</h2>
          <dl>
            <dt>The claim</dt>
            <dd>Pierre de Fermat wrote it, around 1630 according to <Ext href={SRC.mactutor}>MacTutor</Ext>, in the margin of his copy of Diophantus’s <em>Arithmetica</em>, adding that he had “a truly remarkable proof which this margin is too small to contain”. His son Samuel published the note after his death. Nobody believes Fermat had a correct general proof.</dd>
            <dt>The proof</dt>
            <dd>Andrew Wiles announced a proof in Cambridge on 23 June 1993. A gap turned up during refereeing. Working with Richard Taylor, he found a way round it, and on 6 October 1994 sent the repaired proof to colleagues. It appeared in 1995 as two papers in the <em>Annals of Mathematics</em>: <Ext href={SRC.wiles}>Wiles</Ext>, and <Ext href={SRC.taylorWiles}>Taylor and Wiles</Ext>.</dd>
            <dt>Status</dt>
            <dd>Peer reviewed and accepted for three decades. On 4 September 2026 Anthropic released a <Ext href={SRC.anthropic}>complete Lean formalisation</Ext>, over 13 million lines, made by one of its models. Kevin Buzzard <Ext href={SRC.buzzard}>compiled it and ran comparator</Ext>, and reports that it checks out.</dd>
          </dl>
        </aside>

        <h2 id="what">What it says</h2>
        <p>Squares are easy: <M t="3^2 + 4^2 = 5^2" />, and there are infinitely many solutions like it (see <a href="/pythagoras">Pythagoras’ theorem</a>). Fermat’s claim is that for cubes, fourth powers and every higher power, there are none at all:</p>
        <MD t="a^n + b^n = c^n \quad\text{has no solutions with } a, b, c \ge 1 \text{ and } n \ge 3" />

        <h2 id="why">Why it matters</h2>
        <p>On its own the equation has no applications. What matters is what proving it took. Attempts over three centuries created much of algebraic number theory, and Wiles’s proof established a large part of the <em>modularity conjecture</em>, a bridge between two areas of mathematics that seemed unrelated. That bridge, rather than Fermat’s equation, is the real legacy.</p>

        <h2 id="proof">The proof, as a map</h2>
        <p className="note">This is a map of the proof, not the proof. The two Annals papers run to well over a hundred pages and rest on decades of earlier work. Each step below names what is proved and by whom, without the machinery.</p>
        <ol className="steps">
          <Step n={1} title="Reduce to prime powers">
            <p>Every <M t="n \ge 3" /> is a multiple of 4 or of an odd prime <M t="p" />. A solution for <M t="n = pk" /> gives one for <M t="p" />, since <M t="(a^k)^p + (b^k)^p = (c^k)^p" />. So it is enough to handle <M t="n = 4" /> and odd primes. Both of those small cases were settled long ago, and according to MacTutor Fermat himself knew how to prove <M t="n = 3" /> and <M t="n = 4" />. The hard case is every prime <M t="p \ge 5" />.</p>
          </Step>

          <Step n={2} title="Turn a solution into a curve">
            <p>In the 1980s Gerhard Frey suggested that a solution <M t="a^p + b^p = c^p" /> would give a very strange <em>elliptic curve</em>:</p>
            <MD t="y^2 = x\,(x - a^p)\,(x + b^p)" />
            <p>Elliptic curves are equations like this, and they are among the most studied objects in number theory. This one would be too unusual to exist: its basic invariants are built from perfect <M t="p" />th powers.</p>
          </Step>

          <Step n={3} title="That curve can’t be modular">
            <p>An elliptic curve is <em>modular</em> if it is linked to a modular form, a function with an enormous amount of symmetry. Following an idea of Serre, Ken Ribet <Ext href={SRC.ribet}>proved</Ext> that Frey’s curve could not be modular. So if every elliptic curve of the right kind is modular, Fermat’s Last Theorem follows.</p>
          </Step>

          <Step n={4} title="Wiles: semistable curves are modular">
            <p>The modularity conjecture, associated with Taniyama, Shimura and Weil, said every elliptic curve over the rational numbers is modular. Wiles proved it for <em>semistable</em> curves, a class that includes Frey’s curve. Put together with step 3, a solution to Fermat’s equation would give a curve that is both modular and not modular. So there is no solution.</p>
          </Step>

          <Step n={5} title="How Wiles proved it, in one paragraph">
            <p>Any elliptic curve gives a family of symmetries of its points, called <em>Galois representations</em>, one for each prime. Earlier work of Langlands and Tunnell shows that the one for the prime 3 matches a modular form, at least when it can’t be broken into simpler pieces. Wiles’s key result, a <em>modularity lifting</em> theorem often summarised as <M t="R = T" />, shows that when this matching holds for 3 it carries up to the whole family, and hence to the curve. When the prime 3 doesn’t work, a switching trick uses the prime 5 instead.</p>
          </Step>

          <Step n={6} title="The gap and the repair">
            <p>The 1993 argument depended on a construction, extending a method of Flach, that Wiles could not complete. After months of work with Taylor, he saw that what blocked the Flach approach was exactly what would make an earlier abandoned approach work. The Taylor and Wiles paper supplies the step that closes the argument.</p>
          </Step>

          <Step n={7} title="Afterwards">
            <p>In 2001 Breuil, Conrad, Diamond and Taylor <Ext href={SRC.bcdt}>completed</Ext> the modularity theorem for all elliptic curves over the rational numbers, not just semistable ones.</p>
          </Step>
        </ol>

        <h2 id="lean">In Lean</h2>
        <p>Mathlib contains the statement, written by people, so any formal proof has a fixed target. It proves the small cases itself, and reduces the full theorem to odd prime exponents (<code>FermatLastTheorem.of_odd_primes</code>), which is step 1 above.</p>
        <p>The full proof was formalised in 2026 in <Ext href={SRC.anthropic}>anthropics/fermats-last-theorem</Ext>. According to <Ext href={SRC.buzzard}>Buzzard</Ext> it follows the 1995 Darmon–Diamond–Taylor account of the Wiles–Taylor–Wiles argument, not the modern route his own <Ext href={SRC.flt}>Imperial project</Ext> is formalising. It was the last open item on Freek Wiedijk’s list of 100 theorems to formalise. In Buzzard’s words, “mathematically this work of anthropic tells us essentially nothing”, because the proof was already trusted. What it shows is that a proof this large can now be checked by machine.</p>
        <Lean caption={<>From Mathlib’s <Ext href={SRC.mathlibBasic}><code>NumberTheory.FLT.Basic</code></Ext> and <Ext href={SRC.mathlibFour}><code>NumberTheory.FLT.Four</code></Ext>. The case <M t="n = 3" /> is <code>fermatLastTheoremThree</code>.</>}>{LEAN_FLT}</Lean>

        <h2 id="sources">Sources</h2>
        <ul>
          <li>A. Wiles, <Ext href={SRC.wiles}>Modular elliptic curves and Fermat’s Last Theorem</Ext>, <em>Annals of Mathematics</em> 141, no. 3 (1995)</li>
          <li>R. Taylor and A. Wiles, <Ext href={SRC.taylorWiles}>Ring-theoretic properties of certain Hecke algebras</Ext>, <em>Annals of Mathematics</em> 141, no. 3 (1995)</li>
          <li><Ext href={SRC.mactutor}>MacTutor: Fermat’s last theorem</Ext>, for the history including 1993 and 1994</li>
          <li><Ext href={SRC.buzzard}>“FLT: Anthropic has beaten me to it”</Ext>, Kevin Buzzard, Xena, 4 September 2026</li>
          <li><Ext href={SRC.anthropic}>anthropics/fermats-last-theorem</Ext>, the Lean formalisation</li>
          <li><Ext href={SRC.flt}>The Lean FLT project</Ext> (Imperial College London)</li>
        </ul>
      </div>
    </article>
  );
}
