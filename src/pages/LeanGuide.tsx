import { Ext, Lean, PageHead } from '../components/Shell';

const MATHLIB_RH = `
def RiemannHypothesis : Prop :=
  ∀ (s : ℂ) (_ : riemannZeta s = 0) (_ : ¬∃ n : ℕ, s = -2 * (n + 1)) (_ : s ≠ 1),
    s.re = 1 / 2`;

const MAIN = `
import Statements
import Supplements.Kernels.MainTheoremsAll

theorem riemannHypothesis : RiemannHypothesis := rhOfAll`;

const AXIOMS = `
#print axioms riemannHypothesis
-- 'riemannHypothesis' depends on axioms: [propext, Classical.choice, Quot.sound]`;

const SYMBOLS: [string, string][] = [
  ['∀ x : T, P x', 'for every x of type T, P x holds'],
  ['∃ x, P x', 'there is some x with P x'],
  ['P → Q', 'if P then Q (also: a function turning a proof of P into a proof of Q)'],
  ['¬P', 'not P (in Lean, P → False)'],
  ['P ∧ Q, P ∨ Q', 'and, or'],
  ['ℕ ℤ ℚ ℝ ℂ', 'natural numbers (from 0), integers, rationals, reals, complex numbers'],
  ['s.re', 'the real part of the complex number s'],
  ['x : T', 'x has type T. For a statement, “h : P” means h is a proof of P'],
  ['def … : Prop :=', 'defines a statement. It says nothing about whether it is true'],
  ['theorem name : P := proof', 'a claim that P holds, followed by its proof. The kernel checks the proof'],
  ['(_ : P)', 'an unnamed hypothesis: “assuming P”'],
  ['[NeZero N]', 'a side condition Lean finds automatically (here: N is not 0)'],
  ['fun x => …', 'a function, the way proofs of “for all” are often built'],
  ['⟨a, b⟩', 'build a pair, e.g. a proof of P ∧ Q from proofs of P and Q'],
  ['by …', 'start a proof written with tactics, step by step'],
];

const TACTICS: [string, string][] = [
  ['intro h', 'assume the hypothesis of an “if” or take an arbitrary “for all” variable, and call it h'],
  ['have h : P := …', 'prove a small fact P along the way and remember it as h'],
  ['rcases h with a | b', 'split into cases, or unpack an “exists” or “and”'],
  ['rw [h]', 'rewrite the goal using an equation h'],
  ['exact h', 'h is exactly what we need. Done'],
  ['apply f', 'reduce the goal to the hypotheses of f'],
  ['simp, norm_num', 'simplify, and do arithmetic with literal numbers'],
  ['linarith, ring', 'finish by linear inequalities, or by algebra on polynomials'],
  ['exfalso, by_contra', 'prove a contradiction instead, or assume the opposite and reach one'],
  ['·', 'begins the proof of the next case or subgoal'],
];

export function LeanGuide() {
  return (
    <article>
      <PageHead
        kicker="Guide"
        title="How to read Lean"
        lede="Lean is a programming language in which a proof is a program and a theorem is the type that program must have. If the program type-checks, the proof is correct. You don’t need to write Lean to read the parts that matter: the statement, and the top few lines of the proof."
      />
      <div className="vn-container prose">
        <h2>Statement first, proof second</h2>
        <p>The most important habit is to keep two questions apart. <strong>What does it claim?</strong> And <strong>is the claim proved?</strong> Lean answers the second question automatically. The first is on you, because a mis-stated theorem can be perfectly “proved”. The Xena blog gives a Fermat example over <code>ℕ</code>, which includes 0, so <M0 /> is a counterexample and the statement is false as written.</p>
        <p>So start with the statement. Here is Mathlib’s definition of the Riemann Hypothesis:</p>
        <Lean caption={<>From <Ext href="https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/LSeries/RiemannZeta.html">Mathlib.NumberTheory.LSeries.RiemannZeta</Ext>.</>}>{MATHLIB_RH}</Lean>
        <p>Read it left to right:</p>
        <ol>
          <li><code>def RiemannHypothesis : Prop :=</code> means “here is a statement called RiemannHypothesis”. <code>Prop</code> is the type of statements.</li>
          <li><code>∀ (s : ℂ)</code>: for every complex number <code>s</code>…</li>
          <li><code>(_ : riemannZeta s = 0)</code>: …assuming zeta of <code>s</code> is zero…</li>
          <li><code>(_ : ¬∃ n : ℕ, s = -2 * (n + 1))</code>: …and <code>s</code> is not one of <code>-2, -4, -6, …</code> (the trivial zeros)…</li>
          <li><code>(_ : s ≠ 1)</code>: …and <code>s</code> isn’t 1. (Mathlib gives zeta a junk value at its pole, so this rules it out.)</li>
          <li><code>s.re = 1 / 2</code>: …then the real part of <code>s</code> is one half.</li>
        </ol>
        <p>That is the whole hypothesis, matching the <a href="/riemann-hypothesis#what">usual statement</a>. Because this definition sits in Mathlib, which human experts review, and not inside the proof’s own files, you can trust it means what it says.</p>

        <h2>Then the top of the proof</h2>
        <Lean caption={<>The relevant lines of <code>src/Main.lean</code> in Alpöge’s library.</>}>{MAIN}</Lean>
        <p><code>theorem riemannHypothesis : RiemannHypothesis := rhOfAll</code> says “here is a proof, called <code>rhOfAll</code>, that the statement holds”. There are no hypotheses between the name and the colon, so nothing is being assumed. Everything else in the library exists to build <code>rhOfAll</code>.</p>

        <h2>Check what it rests on</h2>
        <Lean caption="What the axiom audit reports (Sutherland, JGalego).">{AXIOMS}</Lean>
        <p>Those three are the standard axioms that almost all of Mathlib uses: propositional extensionality, the axiom of choice, and quotient soundness. A proof that sneaked in a new axiom, or left a gap with <code>sorry</code>, would show it here.</p>

        <h2>Symbols you will see</h2>
        <table>
          <caption>Common Lean notation</caption>
          <thead><tr><th scope="col">Lean</th><th scope="col">Read it as</th></tr></thead>
          <tbody>{SYMBOLS.map(([a, b]) => <tr key={a}><td><code>{a}</code></td><td>{b}</td></tr>)}</tbody>
        </table>

        <h2>Reading a tactic proof</h2>
        <p>Proofs after <code>by</code> are a list of instructions. Each one changes the current <em>goal</em> (what is left to prove). You can’t see the goal in the text, which is why tactic proofs look cryptic on paper. In an editor, Lean shows it next to every line. The usual moves:</p>
        <table>
          <caption>Common tactics</caption>
          <thead><tr><th scope="col">Tactic</th><th scope="col">What it does</th></tr></thead>
          <tbody>{TACTICS.map(([a, b]) => <tr key={a}><td><code>{a}</code></td><td>{b}</td></tr>)}</tbody>
        </table>
        <p>Try it on <a href="/riemann-hypothesis#proof">step 1 of the Riemann proof</a>. <code>intro s hs htriv hs1</code> takes the zero and the three assumptions. <code>rcases lt_trichotomy s.re (1 / 2)</code> splits into left of the line, on it, or right of it. The middle case is <code>exact heq</code>, and the right-hand case contradicts the hypothesis that there are no zeros there.</p>

        <h2>How a big proof is trusted</h2>
        <ul>
          <li><strong>The kernel.</strong> A small core of Lean rechecks every proof term from scratch. Tactics can be buggy and it doesn’t matter, because only the kernel’s verdict counts.</li>
          <li><strong>Independent kernels.</strong> Other people have written their own checkers in other languages (nanoda in Rust, con-leche and others). Lean can export a proof to a plain file, and each checker reads it separately.</li>
          <li><strong>Comparator.</strong> <Ext href="https://github.com/leanprover/comparator">comparator</Ext> checks that the theorem proved in untrusted code is exactly the statement in a trusted file that imports only Mathlib, and that only the standard axioms are used.</li>
          <li><strong>Sandboxing.</strong> Lean code can run programs while it compiles. Build AI-generated libraries in a sandbox, not on your own laptop.</li>
        </ul>

        <h2>Learn more</h2>
        <ul>
          <li><Ext href="https://live.lean-lang.org/">Lean in the browser</Ext>, nothing to install</li>
          <li><Ext href="https://adam.math.hhu.de/">The Lean game server</Ext>, including the Natural Number Game, the gentlest start</li>
          <li><Ext href="https://leanprover-community.github.io/mathematics_in_lean/">Mathematics in Lean</Ext>, for using Mathlib</li>
          <li><Ext href="https://lean-lang.org/theorem_proving_in_lean4/">Theorem Proving in Lean 4</Ext>, the language itself</li>
          <li><Ext href="https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/">“…and the proof is checked in Lean”</Ext>, Xena’s four questions</li>
          <li><Ext href="https://lean-lang.org/install/">Installing Lean</Ext></li>
        </ul>
      </div>
    </article>
  );
}

/** a = b = c = 0, n = 3 */
function M0() {
  return <code>a = b = c = 0, n = 3</code>;
}
