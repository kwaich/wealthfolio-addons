# Wealthfolio Addons

Official and community addons for Wealthfolio.

This repo is the source of truth for addon source, community submissions, and
release artifacts. The Wealthfolio app repo keeps the addon runtime, SDK,
developer tools, and host APIs. The public catalog, database, ratings, and
download metrics live outside this repo.

Addon developer documentation: [wealthfolio.app/docs/addons](https://wealthfolio.app/docs/addons/)

## Structure

```text
official/                    Wealthfolio-owned addon source
community/directory/         Community discovery entries
community/verified/          Community addons approved for install from Wealthfolio
templates/                   Submission templates
schemas/                     JSON schemas for addon metadata
scripts/                     Validation and README generation helpers
```

## Trust Model

| Label | Owner | Verification | Install behavior |
| --- | --- | --- | --- |
| Official | Wealthfolio | Verified | Installable from Wealthfolio |
| Verified Community | Community author | Verified | Installable from Wealthfolio, author-supported |
| Community Directory | Community author | Unverified | Discovery listing only |

`trust` and `verification` are intentionally separate:

- `trust`: who owns and supports the addon.
- `verification`: whether Wealthfolio reviewed and built the installable
  artifact.
- `status`: lifecycle state, such as `active`, `coming-soon`, `deprecated`, or
  `inactive`.

## Metadata Files

Each addon has two separate contracts:

- `manifest.json`: runtime contract consumed by Wealthfolio when installing and
  loading the addon.
- `addon.store.json`: catalog, release, review, and distribution metadata.

Official addons keep full source in this repo. Community directory addons only
need `addon.store.json` with a public repository link. Verified community addons
must include pinned source metadata so Wealthfolio CI can build and host the
artifact.

## Common Commands

```bash
pnpm install
pnpm validate:addons
pnpm generate
pnpm type-check:official
pnpm bundle:official
```

| Script | Description |
| --- | --- |
| `pnpm build:official` | Builds every addon under `official/*` and writes each addon's `dist/addon.js`. |
| `pnpm bundle:official` | Cleans, builds, and zips every official addon for release handoff. |
| `pnpm type-check:official` | Runs TypeScript checks for every official addon without emitting files. |
| `pnpm validate:addons` | Validates addon metadata, duplicate IDs, manifest consistency, dependency versions, and missing media warnings. |
| `pnpm generate:readme` | Regenerates the official and community addon tables from `addon.store.json` files. |
| `pnpm generate` | Alias for `pnpm generate:readme`. |
| `pnpm check` | Runs addon metadata validation and official addon type checks. |

Generated files:

- `community/README.md`: community addon table generated from metadata.
- `official/README.md`: official addon table generated from metadata.

## Official Addons

| Addon | Path |
| --- | --- |
| Goal Progress Tracker | `official/goal-progress-tracker-addon` |
| Investment Fees Tracker | `official/investment-fees-tracker-addon` |
| Swingfolio | `official/swingfolio-addon` |

## Release Flow

1. Update the addon source, `manifest.json`, `CHANGELOG.md`, and
   `addon.store.json`.
2. Run `pnpm validate:addons`.
3. Run `pnpm type-check:official` and the addon's tests if it has any.
4. Run `pnpm bundle:official`.
5. Hand off the generated zip and media assets to the catalog/store release
   pipeline.
6. Update the catalog/site repository or internal store service from the
   reviewed addon metadata.

For community verified addons, build with no secrets first. The separate
catalog/store release pipeline should publish artifacts only after review.
