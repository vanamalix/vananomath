import { Ext, Lean, PageHead, Step } from '../components/Shell';
import { M, MD } from '../tex';

const DOCS = 'https://leanprover-community.github.io/mathlib4_docs/';

export function Primes() {
  return (
    <article>
      <PageHead
        kicker="Proof 2 · number theory · about 300 BCE"
        title="There are infinitely many primes"
        lede={<>A prime is a whole number bigger than 1 whose only divisors are 1 and itself: 2, 3, 5, 7, 11 and so on. Euclid proved, in Book IX of the <em>Elements</em>, that the list never runs out. It is still the proof most mathematicians show first.</>}
      />
      <div className="vn-container prose">
        <ol className="steps">
          <Step n={1} title="Take any finite list of primes">
            <p>Suppose someone hands you a list of primes <M t="p_1, p_2, \dots, p_k" /> and claims it is all of them.</p>
          </Step>
          <Step n={2} title="Multiply them together and add one">
            <MD t="N = p_1 \, p_2 \cdots p_k + 1" />
            <p>For the list 2, 3, 5 this gives <M t="N = 31" />. For 2, 3, 5, 7, 11, 13 it gives <M t="N = 30031" />.</p>
          </Step>
          <Step n={3} title="None of the listed primes divides N">
            <p>Dividing <M t="N" /> by any <M t="p_i" /> leaves remainder 1, because <M t="p_i" /> divides the product exactly and the extra 1 is left over.</p>
          </Step>
          <Step n={4} title="But N has some prime factor">
            <p>Every whole number bigger than 1 is divisible by at least one prime. Its smallest divisor bigger than 1 has to be prime, since any smaller factor of that divisor would also divide <M t="N" />. Call that prime <M t="q" />.</p>
          </Step>
          <Step n={5} title="So the list was missing one">
            <p>By step 3, <M t="q" /> is not on the list. Whatever finite list you start with, there is a prime it misses. So there are infinitely many. ∎</p>
            <p className="note">A common slip is to say <M t="N" /> itself is prime. It need not be: <M t="30031 = 59 \times 509" />. The proof only needs <M t="N" /> to have a prime factor that isn’t on the list.</p>
          </Step>
        </ol>
        <h2>In Lean</h2>
        <p>Mathlib states it as “for every <M t="n" /> there is a prime at least as big”:</p>
        <Lean caption={<>From <Ext href={`${DOCS}Mathlib/Data/Nat/Prime/Infinite.html#Nat.exists_infinite_primes`}>Mathlib.Data.Nat.Prime.Infinite</Ext>.</>}>{`theorem Nat.exists_infinite_primes (n : ℕ) : ∃ p, n ≤ p ∧ p.Prime`}</Lean>
        <p>Read it as: for all natural numbers <code>n</code>, there exists a <code>p</code> with <code>n ≤ p</code> and <code>p</code> prime. Mathlib’s proof uses <M t="n! + 1" /> instead of a product of primes, which is the same idea. See <a href="/lean">Reading Lean</a>.</p>
        <h2>Connection to the Riemann Hypothesis</h2>
        <p>Euclid tells you the primes never stop. The <a href="/riemann-hypothesis">Riemann Hypothesis</a> is about how regularly they keep coming. Euler’s product formula, which links zeta to the primes, also gives a second proof of this theorem.</p>
        <h2>Sources</h2>
        <ul>
          <li>Euclid, <em>Elements</em>, Book IX, Proposition 20. <Ext href="https://mathcs.clarku.edu/~djoyce/elements/bookIX/propIX20.html">D. E. Joyce’s online edition</Ext> (Clark University)</li>
        </ul>
      </div>
    </article>
  );
}

export function RootTwo() {
  return (
    <article>
      <PageHead
        kicker="Proof 3 · number theory · about 400 BCE"
        title="The square root of 2 is irrational"
        lede={<>The diagonal of a 1 by 1 square has length <M t="\sqrt2" />. The Greeks found, to their alarm, that this length is not a ratio of whole numbers. This proof by contradiction is about 2,400 years old.</>}
      />
      <div className="vn-container prose">
        <ol className="steps">
          <Step n={1} title="Suppose it is a fraction">
            <p>Assume <M t="\sqrt2 = a/b" /> for whole numbers <M t="a, b" /> with <M t="b \neq 0" />. Cancel common factors first, so the fraction is in lowest terms and <M t="a" /> and <M t="b" /> are not both even.</p>
          </Step>
          <Step n={2} title="Square both sides">
            <MD t="2 = \frac{a^2}{b^2} \quad\Longrightarrow\quad a^2 = 2b^2" />
          </Step>
          <Step n={3} title="So a is even">
            <p><M t="a^2" /> is even. The square of an odd number is odd, since <M t="(2m+1)^2 = 4m^2 + 4m + 1" />, so <M t="a" /> must be even. Write <M t="a = 2c" />.</p>
          </Step>
          <Step n={4} title="So b is even too">
            <MD t="(2c)^2 = 2b^2 \quad\Longrightarrow\quad 4c^2 = 2b^2 \quad\Longrightarrow\quad b^2 = 2c^2" />
            <p>The same argument now shows <M t="b" /> is even.</p>
          </Step>
          <Step n={5} title="Contradiction">
            <p>Both <M t="a" /> and <M t="b" /> are even, but we chose them with no common factor. The assumption was wrong, so <M t="\sqrt2" /> is not a fraction. ∎</p>
          </Step>
        </ol>
        <h2>In Lean</h2>
        <Lean caption={<>From <Ext href={`${DOCS}Mathlib/NumberTheory/Real/Irrational.html#irrational_sqrt_two`}>Mathlib.NumberTheory.Real.Irrational</Ext>.</>}>{`theorem irrational_sqrt_two : Irrational √2`}</Lean>
        <p><code>Irrational x</code> is defined in Mathlib as “<code>x</code> is not in the range of the map from the rationals to the reals”. The statement is one line, and all the work is in the proof.</p>
        <h2>Sources</h2>
        <ul>
          <li>Aristotle mentions the argument in <em>Prior Analytics</em> (I.23) as the standard example of proof by contradiction.</li>
          <li><Ext href="https://mathshistory.st-andrews.ac.uk/HistTopics/Real_numbers_1/">MacTutor: the real numbers, Pythagoras to Stevin</Ext></li>
        </ul>
      </div>
    </article>
  );
}
