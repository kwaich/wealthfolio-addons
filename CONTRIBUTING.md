# Contributing

Thanks for contributing to the Wealthfolio addon ecosystem.

## Contribution Types

### Community Directory Addon

Use this when you want your addon discoverable from Wealthfolio but do not need
in-app install support yet.

Required PR content:

```text
community/directory/<addon-id>/addon.store.json
```

Start from:

```text
templates/community-directory-addon/addon.store.json
```

Directory addons are author-maintained and unverified. Wealthfolio checks that
metadata is valid and the repository is appropriate, but does not build, review,
or host the package.

### Verified Community Addon

Use this when the addon should be installable from Wealthfolio.

Required PR content:

```text
community/verified/<addon-id>/addon.store.json
community/verified/<addon-id>/assets/cover-light.png
community/verified/<addon-id>/assets/cover-dark.png
```

Start from:

```text
templates/verified-community-addon/addon.store.json
```

Verified community addons require:

- public source repository
- pinned release tag and commit SHA
- valid Wealthfolio `manifest.json`
- declared permissions with clear purposes
- release notes and support URL
- 16:9 light and dark screenshots
- Wealthfolio-built artifact prepared for the catalog/store release pipeline

Do not attach arbitrary release zips directly to the PR. Wealthfolio CI should
build the zip from the pinned source; the catalog/store release pipeline handles
publishing after review.

### Official Addon

Official addons are owned and supported by Wealthfolio. Full source lives under:

```text
official/<addon-id>/
```

Official addon changes must update:

- `manifest.json`
- `addon.store.json`
- `CHANGELOG.md`
- tests or validation coverage when behavior changes

## Metadata Rules

`manifest.json` is the runtime contract:

- addon id
- display name
- runtime version
- SDK version
- entrypoint
- declared permissions

`addon.store.json` is the store contract:

- trust and verification state
- lifecycle status
- category tags
- release notes
- distribution path for the external catalog/store pipeline
- screenshot paths
- source and support links

Do not put dynamic metrics such as downloads, rating, or review count in
`addon.store.json`. Those belong to the store service.

## Status Values

| Status | Meaning |
| --- | --- |
| `active` | Visible and usable for its verification level |
| `coming-soon` | Visible but not installable yet |
| `deprecated` | Visible with warning; new installs discouraged |
| `inactive` | Hidden from normal browsing |

## Verification Values

| Verification | Meaning |
| --- | --- |
| `unverified` | Discovery listing only |
| `verified` | Reviewed and built by Wealthfolio |

## Local Checks

Run these before opening a PR:

```bash
pnpm install
pnpm validate:addons
pnpm generate
```

For official addon source changes, also run:

```bash
pnpm type-check:official
pnpm bundle:official
```

## Security Expectations

- Do not include secrets in source, docs, manifests, or screenshots.
- Do not request permissions that are not used.
- Explain every permission in plain language.
- Avoid remote script loading and dynamic code execution.
- Use lockfiles for external community source builds.
- Verified community submissions must pin both tag and commit SHA.

## Screenshots

Use 16:9 png or WebP screenshots:

```text
assets/cover-light.png
assets/cover-dark.png
```

The catalog/store release pipeline should upload them to:

```text
https://assets.wealthfolio.app/images/addons/<addon-id>/cover-light.png
https://assets.wealthfolio.app/images/addons/<addon-id>/cover-dark.png
```
