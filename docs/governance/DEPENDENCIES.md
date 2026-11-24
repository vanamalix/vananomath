# Dependencies

Every dependency is code we ship without having written it. Changes to them are deliberate,
reviewable and reproducible.

## Rules

- **One package manager**: pnpm, pinned in the root `package.json` `packageManager` field, as a workspace
  (`pnpm-workspace.yaml`). No npm or yarn lockfiles alongside it.
- **Exact pins** in every `package.json` (`"1.2.3"`, not `^1.2.3` or `~1.2.3`). The lockfile is
  committed.
- **Frozen lockfile everywhere**: CI, release worktrees and agents install with
  `pnpm install --frozen-lockfile`. An install that wants to change the lockfile is a failure, not a
  prompt to regenerate it.
- **No silent upgrades.** A dependency is added, removed or upgraded only in a commit that says so
  (what, why, from which version to which), with the lockfile diff, and is at least tier T2.
  Dependency changes are never folded into an unrelated commit.
- **Monthly update PR.** A scheduled workflow opens one pull request a month with available updates,
  runs the gates, and never merges or deploys by itself; a human reviews the changelog of each bump.
  Security fixes may go out between those PRs, with the advisory linked in the commit.
- **Audit**: `pnpm audit --prod` is reviewed with each update PR and before a release. Each finding is
  fixed, or recorded as not applicable with the reason (unreachable code path, dev-only), in the PR.
- **Install scripts are denied by default.** pnpm runs dependency lifecycle scripts only for packages
  on the allow-list (`onlyBuiltDependencies` in `pnpm-workspace.yaml`). Adding a package to it is a T3
  change: say what the script does and why the package cannot work without it.
- New dependencies: prefer the platform (Web APIs, WebCrypto, the standard library) and existing
  packages; check maintenance, licence and transitive size before adding one.

## App rules

**npm, not pnpm, overriding the shared pnpm rules above.** One static site, no workspace, and the folder sits inside the hub repo, so pnpm would walk up and act on the hub workspace (the `pnpmRoot` command-guard rule refuses it). `package-lock.json` is the lockfile and `npm ci` the install. `@vanamalix` packages use exact pins and come only from GitHub Packages (`.npmrc`), never the public npm registry. The lockfile names those private packages and versions, which is acceptable in the public repo; it holds no token.

| Package | Used here? | Where or why |
| --- | --- | --- |
| `ui` 0.2.0 | yes | `Footer`, `LogoMark`, styles, `SHIELDED_CSP`, and `headersFile()` in `vite.config.ts` |
| `edge` 0.5.0 | yes, through `ui` | the security-header baseline behind `headersFile()` |
| `config` 0.2.1 | yes | strict tsconfig base |
| `testing` 0.2.0 | yes | vitest network guard, `vn-js-budget`, Playwright and axe helpers |
| `governance` 0.5.0 | yes | tiers, gates, privacy scan, hooks, CI |
| `katex` 0.19.1 | build time only | TeX to MathML in `src/tex.tsx`; nothing ships to the browser |
| everything else (`crypto`, `e2ee`, `mail`, `backup`, `throttle`, `secrets`, `features`) | no | no data, secrets, mail or Worker code |
