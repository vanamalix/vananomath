# vananomath

Famous proofs, one step at a time. Served at **[math.vananomad.com](https://math.vananomad.com)**.

The first proof on the list is the newest one. On 20 November 2026 Levent Alpöge announced a proof of the Riemann
Hypothesis that he found working with Claude, written entirely in Lean. Seventeen million lines of it. Nobody can
read that in a weekend, so this site tries to explain what it says, how it fits together and why people trust a
proof that no human has read end to end. Then it does the same for some older favourites that fit on a napkin.

If you like this sort of thing, the sister site **[albe](https://albe.vananomad.com)** lets you drop black holes on
a sheet of spacetime and watch light bend around them.

## What is on it

| Page | What you get |
| --- | --- |
| [`/`](https://math.vananomad.com/) | The list of proofs |
| [`/riemann-hypothesis`](https://math.vananomad.com/riemann-hypothesis) | The 2026 proof as a step by step map, how it was checked and the critique |
| [`/infinitely-many-primes`](https://math.vananomad.com/infinitely-many-primes) | Euclid, still the first proof anyone should see |
| [`/root-two-is-irrational`](https://math.vananomad.com/root-two-is-irrational) | The one that upset the Pythagoreans |
| [`/lean`](https://math.vananomad.com/lean) | How to read a Lean statement without learning Lean |
| [`/reading`](https://math.vananomad.com/reading) | Primary sources, from Riemann in 1859 to the Lean FRO in 2026 |
| [`/about`](https://math.vananomad.com/about) | What the site is and how it is built |

More proof pages live in `src/pages/more/` and add themselves to the list.

## A note on honesty

Every claim about the 2026 proof links to a primary source. The site says plainly what has been machine checked
(the Lean statement, the build, the axioms, several independent kernels) and what has not happened yet (a human
readable write up, journal peer review, the Clay prize). We read parts of the Lean source but have not built it
ourselves. If you spot something wrong, please open an issue. That is genuinely the most useful thing you can do here.

## How it is built

TypeScript and React, rendered to plain HTML at build time. KaTeX turns the maths into MathML during the build, so
your browser draws the equations itself and the reading pages need no JavaScript at all. The only script on the
site hydrates the footer, because the Shielded site button needs it.

The pages are served as static files by a Cloudflare Worker. No server code, no database, no cookies and no
analytics.

Why not Python and Django? Cloudflare Workers run JavaScript and TypeScript natively. Python Workers do exist, but
Django wants a long running server and a database, and a site full of explanations needs neither. Static pages are
faster, cheaper and harder to break.

It uses the shared vananomad packages (`@vanamalix/ui`, `config`, `testing` and `governance`) from GitHub Packages.

## Running it

You need Node 20 or newer and read access to the `@vanamalix` packages on GitHub Packages (a `read:packages` token
in your own `~/.npmrc`, never in the repo).

```sh
pnpm install --frozen-lockfile
pnpm run dev        # build, then serve dist/ with wrangler on http://localhost:8798
pnpm run check      # typecheck, build, JS budget and unit tests
pnpm run test:e2e   # Playwright and axe at 390px and 1280px, screenshots in screenshots/
```

## Adding a proof

Write a page in `src/pages/more/` using the components in `src/components/Shell.tsx` (`PageHead`, `Step`, `Lean`
and `Ext`) and the maths helpers in `src/tex.tsx` (`M` inline, `MD` on its own line). Register it in
`src/pages/more/index.ts`. Check every link and every Mathlib name before citing it. The build fails on any TeX
that KaTeX can't parse, which is a feature.

## Deploying

Deploys only happen with the owner's OK. Preview first, on workers.dev with no routes.

```sh
pnpm run check && pnpm exec wrangler deploy -c wrangler.preview.jsonc
pnpm run check && pnpm exec wrangler deploy     # production, attaches math.vananomad.com
```

Governance (tiers, gates, privacy scan and hooks) is in `governance.config.json` and `docs/governance/`.

## Licence

Code is MIT, see [LICENSE](LICENSE). Quoted Lean code belongs to its authors and is quoted for explanation, with
links back to the source.
