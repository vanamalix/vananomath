import { Ext, Lean, PageHead, Step } from '../../components/Shell';
import { M, MD } from '../../tex';

const SRC = {
  e41: 'https://scholarlycommons.pacific.edu/euler-works/41/',
  mactutor: 'https://mathshistory.st-andrews.ac.uk/Biographies/Euler/',
  book: 'https://doi.org/10.1007/978-3-662-57265-8',
  mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/ZetaValues.html',
};

const LEAN_ZETA_TWO = `
theorem hasSum_zeta_two : HasSum (fun n : ℕ => (1 : ℝ) / (n : ℝ) ^ 2) (π ^ 2 / 6)`;

export function Basel() {
  return (
    <article>
      <PageHead
        kicker="Analysis · Leonhard Euler · 1735"
        title="The Basel problem"
        lede={<>Add up the reciprocals of the square numbers, <M t="1 + \tfrac14 + \tfrac19 + \tfrac1{16} + \cdots" />, and you get exactly <M t="\pi^2/6" />. Why a circle constant should appear in a sum about whole numbers is one of the great surprises of mathematics.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">At a glance</h2>
          <dl>
            <dt>Who and when</dt>
            <dd>Leonhard Euler. His paper <Ext href={SRC.e41}><em>De summis serierum reciprocarum</em></Ext> (“On the sums of series of reciprocals”) is dated 1735 by the Euler Archive and was printed in 1740. <Ext href={SRC.mactutor}>MacTutor</Ext> calls it perhaps the result that brought him the most fame as a young man. The problem had beaten many leading mathematicians, the Bernoullis among them.</dd>
            <dt>Status</dt>
            <dd>Classical. In Mathlib as <code>hasSum_zeta_two</code>.</dd>
          </dl>
        </aside>

        <h2 id="what">What it says</h2>
        <MD t="\sum_{n=1}^{\infty} \frac{1}{n^2} = 1 + \frac14 + \frac19 + \frac1{16} + \cdots = \frac{\pi^2}{6} \approx 1.6449" />
        <p>It is easy to see the sum is finite (it is less than 2, since <M t="\tfrac1{n^2} < \tfrac1{n-1} - \tfrac1n" /> and those differences add up to 1). Finding its exact value is the hard part. In the language of the <a href="/riemann-hypothesis">Riemann Hypothesis</a> page, this is <M t="\zeta(2)" />.</p>

        <h2 id="euler">Euler’s idea</h2>
        <p>A polynomial is determined, up to a constant, by its roots. Euler boldly treated <M t="\sin x / x" /> as a polynomial of infinite degree. Its roots are <M t="\pm\pi, \pm 2\pi, \pm 3\pi, \dots" /> and its value at 0 is 1, so he wrote</p>
        <MD t="\frac{\sin x}{x} = \left(1 - \frac{x^2}{\pi^2}\right)\left(1 - \frac{x^2}{4\pi^2}\right)\left(1 - \frac{x^2}{9\pi^2}\right)\cdots" />
        <p>Multiplying out, the coefficient of <M t="x^2" /> on the right is <M t="-\tfrac{1}{\pi^2}\left(1 + \tfrac14 + \tfrac19 + \cdots\right)" />. On the left, the power series <M t="\sin x / x = 1 - \tfrac{x^2}{6} + \cdots" /> gives <M t="-\tfrac16" />. Setting them equal gives the answer.</p>
        <p className="note">This is brilliant but not yet a proof. Infinite products don’t automatically behave like finite ones, so writing <M t="\sin x / x" /> as one needs real justification, which the 1735 argument doesn’t supply. Below is a different proof that is complete and uses only school trigonometry.</p>

        <h2 id="proof">A complete proof, step by step</h2>
        <ol className="steps">
          <Step n={1} title="A squeeze from the unit circle">
            <p>For an angle <M t="0 < x < \tfrac{\pi}{2}" />, compare three areas in the unit circle: the triangle inside the sector, the sector, and the larger triangle that contains it. They are <M t="\tfrac12\sin x" />, <M t="\tfrac12 x" /> and <M t="\tfrac12\tan x" />, so <M t="\sin x < x < \tan x" />. Square, flip, and use <M t="1/\sin^2 x = 1 + \cot^2 x" />:</p>
            <MD t="\cot^2 x < \frac{1}{x^2} < 1 + \cot^2 x" />
          </Step>

          <Step n={2} title="An identity from de Moivre">
            <p>Fix a whole number <M t="m \ge 1" /> and let <M t="n = 2m+1" />. De Moivre’s formula <M t="\cos nx + i\sin nx = (\cos x + i \sin x)^n" />, expanded with the binomial theorem, gives <M t="\sin nx" /> as the imaginary part. Dividing by <M t="\sin^n x" />:</p>
            <MD t="\frac{\sin nx}{\sin^n x} = \binom{n}{1}\cot^{2m} x - \binom{n}{3}\cot^{2m-2} x + \binom{n}{5}\cot^{2m-4} x - \cdots" />
            <p>The right side is a polynomial in <M t="t = \cot^2 x" />. Call it <M t="P(t) = \binom{n}{1} t^m - \binom{n}{3} t^{m-1} + \cdots" />, which has degree <M t="m" />.</p>
          </Step>

          <Step n={3} title="Find all the roots">
            <p>Take the angles <M t="x_k = \tfrac{k\pi}{n}" /> for <M t="k = 1, 2, \dots, m" />. They all lie strictly between 0 and <M t="\tfrac{\pi}{2}" />, and <M t="\sin(n x_k) = \sin(k\pi) = 0" />, so each <M t="\cot^2 x_k" /> is a root of <M t="P" />. Since <M t="\cot^2" /> is strictly decreasing on that interval, these are <M t="m" /> different roots. A degree-<M t="m" /> polynomial has no more than <M t="m" /> roots, so these are all of them.</p>
          </Step>

          <Step n={4} title="Add up the roots">
            <p>For any polynomial, the sum of the roots is minus the second coefficient divided by the first. So</p>
            <MD t="\sum_{k=1}^{m} \cot^2 x_k = \frac{\binom{n}{3}}{\binom{n}{1}} = \frac{(n-1)(n-2)}{6} = \frac{m(2m-1)}{3}" />
          </Step>

          <Step n={5} title="Trap the sum">
            <p>Apply step 1 at each <M t="x_k" />, where <M t="1/x_k^2 = n^2/(\pi^2 k^2)" />, and add up the <M t="m" /> inequalities using step 4:</p>
            <MD t="\frac{m(2m-1)}{3} < \frac{n^2}{\pi^2}\sum_{k=1}^{m}\frac{1}{k^2} < m + \frac{m(2m-1)}{3} = \frac{2m(m+1)}{3}" />
            <p>Multiply through by <M t="\pi^2/n^2 = \pi^2/(2m+1)^2" />:</p>
            <MD t="\frac{\pi^2\, m(2m-1)}{3(2m+1)^2} < \sum_{k=1}^{m}\frac{1}{k^2} < \frac{\pi^2\, 2m(m+1)}{3(2m+1)^2}" />
          </Step>

          <Step n={6} title="Let m grow">
            <p>As <M t="m \to \infty" />, both outer fractions behave like <M t="\pi^2 \cdot 2m^2 / (12 m^2)" />, so both tend to <M t="\pi^2/6" />. The partial sums in the middle are squeezed between them, so</p>
            <MD t="\sum_{k=1}^{\infty}\frac{1}{k^2} = \frac{\pi^2}{6}" />
          </Step>
        </ol>
        <p>You can sanity-check step 4 with <M t="m = 1" />: then <M t="n = 3" />, the only angle is <M t="\pi/3" />, and <M t="\cot^2(\pi/3) = \tfrac13 = \tfrac{1 \cdot 1}{3}" />.</p>

        <h2 id="lean">In Lean</h2>
        <p>Mathlib proves the general formula for <M t="\zeta" /> at even numbers using Bernoulli numbers, then reads off this case.</p>
        <Lean caption={<>From Mathlib’s <Ext href={SRC.mathlib}><code>NumberTheory.ZetaValues</code></Ext>. The sum starts at <code>n = 0</code>, which is harmless: Lean defines <code>1 / 0</code> to be <code>0</code>.</>}>{LEAN_ZETA_TWO}</Lean>

        <h2 id="sources">Sources</h2>
        <ul>
          <li><Ext href={SRC.e41}>Euler Archive: E41, <em>De summis serierum reciprocarum</em></Ext>, with an English translation</li>
          <li><Ext href={SRC.mactutor}>MacTutor: Leonhard Euler</Ext></li>
          <li>Martin Aigner and Günter M. Ziegler, <Ext href={SRC.book}><em>Proofs from THE BOOK</em></Ext> (Springer, 2018 edition), which gives several proofs of this sum</li>
          <li><Ext href={SRC.mathlib}>Mathlib: NumberTheory.ZetaValues</Ext></li>
        </ul>
      </div>
    </article>
  );
}
