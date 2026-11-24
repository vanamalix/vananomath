import { Ext, Lean, PageHead, Step } from '../../components/Shell';
import { M, MD } from '../../tex';

const SRC = {
  euclid: 'https://mathcs.clarku.edu/~djoyce/java/elements/bookI/propI47.html',
  mactutor: 'https://mathshistory.st-andrews.ac.uk/Biographies/Pythagoras/',
  babylon: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Babylonian_Pythagoras/',
  mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/Geometry/Euclidean/Angle/Unoriented/RightAngle.html',
};

const MATHLIB_PYTH = `
theorem EuclideanGeometry.dist_sq_eq_dist_sq_add_dist_sq_iff_angle_eq_pi_div_two
    (p₁ p₂ p₃ : P) :
    dist p₁ p₃ * dist p₁ p₃ = dist p₁ p₂ * dist p₁ p₂ + dist p₃ p₂ * dist p₃ p₂ ↔
      ∠ p₁ p₂ p₃ = π / 2`;

export function Pythagoras() {
  return (
    <article>
      <PageHead
        kicker="Geometry · known in Babylon, proved in Greece"
        title="Pythagoras’ theorem"
        lede={<>In a right-angled triangle, the square on the longest side equals the sum of the squares on the other two: <M t="a^2 + b^2 = c^2" />. It is probably the most famous theorem there is, and it has a proof you can do with four paper triangles.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">At a glance</h2>
          <dl>
            <dt>Who</dt>
            <dd>Named after Pythagoras of Samos (born about 570 BCE). <Ext href={SRC.mactutor}>MacTutor</Ext> notes the result was known to the Babylonians about 1000 years earlier, and that Pythagoras “may have been the first to prove it”. Nothing he wrote survives, so nobody knows what his proof looked like.</dd>
            <dt>Oldest surviving proof</dt>
            <dd>Euclid’s <em>Elements</em>, Book I, <Ext href={SRC.euclid}>Proposition 47</Ext>, about 300 BCE. The very next proposition proves the converse.</dd>
            <dt>Status</dt>
            <dd>Classical, and in Lean’s Mathlib library as an if-and-only-if statement (below).</dd>
          </dl>
        </aside>

        <h2 id="what">What it says</h2>
        <p>Take a triangle with one right angle. Call the two short sides (the ones that meet at the right angle) <M t="a" /> and <M t="b" />, and the long side opposite the right angle <M t="c" />, the <em>hypotenuse</em>. Then</p>
        <MD t="a^2 + b^2 = c^2" />
        <p>The classic example is the 3, 4, 5 triangle: <M t="9 + 16 = 25" />. Whole-number solutions like this are called <em>Pythagorean triples</em>. A Babylonian clay tablet known as Plimpton 322 has fifteen rows of numbers built from such triples, which is part of why historians are confident the relationship was known long before Greek geometry (<Ext href={SRC.babylon}>MacTutor’s account</Ext> goes through the tablet in detail).</p>

        <h2 id="why">Why it matters</h2>
        <p>It is the rule behind every distance in flat space. The distance between two points on a grid, <M t="\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}" />, is this theorem applied to the triangle the two points make with the grid lines. Builders still check corners with a 3, 4, 5 rope or tape for the same reason.</p>
        <p>It also forced the Greeks to face numbers that are not fractions. A square with side 1 has a diagonal <M t="d" /> with <M t="d^2 = 1 + 1 = 2" />, and <a href="/root-two-is-irrational">no fraction squares to 2</a>.</p>

        <h2 id="proof">The proof, step by step</h2>
        <p>This is a complete proof by rearrangement. It needs only two facts: the angles of a triangle add to 180°, and the area of a right-angled triangle is half the product of its two short sides.</p>
        <ol className="steps">
          <Step n={1} title="Name the pieces">
            <p>Start with a right-angled triangle with short sides <M t="a" />, <M t="b" /> and hypotenuse <M t="c" />. Call its other two angles <M t="\alpha" /> and <M t="\beta" />. The three angles add to 180° and one of them is 90°, so</p>
            <MD t="\alpha + \beta = 90^\circ" />
          </Step>

          <Step n={2} title="Build a big square">
            <p>Draw a square with side <M t="a + b" />. On each side mark a point that splits it into a piece of length <M t="a" /> and a piece of length <M t="b" />, going round the square in the same direction each time, so every corner has an <M t="a" /> piece on one side and a <M t="b" /> piece on the other. Join the four marked points.</p>
          </Step>

          <Step n={3} title="The corners are copies of the triangle">
            <p>Each corner of the big square now holds a triangle with sides <M t="a" /> and <M t="b" /> meeting at a right angle. Two sides and the angle between them fix a triangle, so all four are exact copies of the original. In particular each of the four joining lines has length <M t="c" />.</p>
          </Step>

          <Step n={4} title="The middle is a square">
            <p>The shape in the middle has four sides of length <M t="c" />. Look at any of its corners. It sits on a side of the big square, which is a straight line, between one corner triangle’s angle <M t="\alpha" /> and the next one’s angle <M t="\beta" />. If <M t="\theta" /> is the angle in the middle shape, then</p>
            <MD t="\alpha + \theta + \beta = 180^\circ \quad\Longrightarrow\quad \theta = 180^\circ - 90^\circ = 90^\circ" />
            <p>Four equal sides and four right angles: the middle shape is a square with side <M t="c" />.</p>
          </Step>

          <Step n={5} title="Count the area two ways">
            <p>The big square’s area is <M t="(a+b)^2" />. It is also made of the middle square plus four triangles of area <M t="\tfrac12 ab" /> each:</p>
            <MD t="(a+b)^2 = c^2 + 4 \cdot \tfrac12 ab = c^2 + 2ab" />
          </Step>

          <Step n={6} title="Tidy up">
            <p>Multiply out the left side and take <M t="2ab" /> off both sides:</p>
            <MD t="a^2 + 2ab + b^2 = c^2 + 2ab \quad\Longrightarrow\quad a^2 + b^2 = c^2" />
            <p>That is the theorem.</p>
          </Step>
        </ol>

        <h2 id="euclid">How Euclid did it</h2>
        <p>Euclid’s proof is different and a bit cleverer. He draws a square on each side of the triangle, drops a line from the right angle down through the big square, and shows with a pair of congruent triangles that each small square has exactly the same area as one of the two rectangles that line cuts the big square into. It avoids algebra completely, which suited Greek geometry. David Joyce’s <Ext href={SRC.euclid}>edition of the <em>Elements</em></Ext> has the full text and diagram.</p>

        <h2 id="lean">In Lean</h2>
        <p>Mathlib states the theorem for any Euclidean space, in both directions: the squares add up exactly when the angle at the middle point is a right angle.</p>
        <Lean caption={<>From Mathlib’s <Ext href={SRC.mathlib}><code>RightAngle</code> file</Ext>, with the type-class assumptions on <code>V</code> and <code>P</code> left out. <code>∠ p₁ p₂ p₃</code> is the angle at <code>p₂</code>.</>}>{MATHLIB_PYTH}</Lean>

        <h2 id="sources">Sources</h2>
        <ul>
          <li><Ext href={SRC.euclid}>Euclid, <em>Elements</em> I.47</Ext>, ed. David E. Joyce (Clark University)</li>
          <li><Ext href={SRC.mactutor}>MacTutor: Pythagoras of Samos</Ext></li>
          <li><Ext href={SRC.babylon}>MacTutor: Pythagoras’s theorem in Babylonian mathematics</Ext></li>
          <li><Ext href={SRC.mathlib}>Mathlib: Geometry.Euclidean.Angle.Unoriented.RightAngle</Ext></li>
        </ul>
      </div>
    </article>
  );
}
