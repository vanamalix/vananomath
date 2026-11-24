# Decisions pending: rules and template

The decisions file holds questions only the owner can answer, and the record of the answers. Agents
never settle these.

## Rules

- An agent that reaches an owner question **stops, writes it to the decisions file**, and surfaces it
  in its report as `DECISION NEEDED:`. Interim behaviour is the safe, already-shipped behaviour.
- When the owner answers, **write the answer to the file in the same turn** (move it to "Decided" with
  the date and a pointer to where it is implemented), and add or amend an ADR if behaviour changes. A
  decision that exists only in a chat transcript is lost.
- Say what the system should do, not who it is for. No personal details.
- Engineering questions that only need judgement (naming, structure, library choice within policy) are
  the orchestrator's call, not the owner's; record significant ones in an ADR instead.

## Template

```
### P-<n> — <question in one line>
- Raised: <date>, by <agent or session>
- Why it matters: <consequence of each answer>
- Options: A ... / B ... (recommendation, if any, marked as such)
- Interim behaviour shipped: <what happens until answered>
- Blocks: <work waiting on this>
```

Decided table row: `| <date> | <decision in one line> | <record: ADR or doc path> |`

## App rules

### P-3 — CI read access to the private @vanamalix packages
- Raised: 2026-11-24, by the setup session
- Why it matters: `.github/workflows/check.yml` installs with `npm ci` and `GITHUB_TOKEN` (`packages: read`). That works only after the owner grants `vanamalix/vananomath` Actions read access on each package it installs (ui, edge, config, testing, governance). Otherwise CI fails at install.
- Options: A grant per-package Actions access / B a read-only `read:packages` token as an Actions secret (a secret: owner OK) / C drop the workflow until one of those is done (thefreemockmmi and albe have no CI)
- Interim behaviour shipped: the workflow is in the repo and will fail at install until A or B
- Blocks: green CI

Decided:

| Date | Decision | Record |
| --- | --- | --- |
| 2026-11-24 | P-1: the repo is public, `vanamalix/vananomath` (owner in the conversation: "make it public", following albe). The hub records the CONTRACT §2 exception | README.md, CLAUDE.md |
| 2026-11-24 | P-2: MIT for the code, copyright "Vanamali" as in albe's public repo. Quoted Lean code stays its authors', quoted for explanation | LICENSE, README.md |
| 2026-11-24 | P-4: production deploy and the `math.vananomad.com` custom domain (owner in the conversation: "deploy when ready", "deploy what you have for now"). Deployed after the preview smoke checks and before the independent review finished, at the owner's request. The review's fixes went out in a second deploy | INCIDENTS.md |
