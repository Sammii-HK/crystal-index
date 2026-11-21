# Crystal Index

A crystal catalogue and collection web application, originally built to document crystals collected as mementos. Origin and purchase/memento locations are separate concepts. Its React Three Fiber globe visualises locations; it is not a procedural 3D viewer for each specimen.

The public directory supports name/alternative-name search, colour and hardness, plus clearly labelled traditional chakra, zodiac and symbolic-element associations. Filters and sort live in the URL, cards support normal keyboard/browser navigation and a detail back link restores the directory view. Traditional associations come from recorded metadata rather than prose matches or inferred zodiac elements.

The web checkout also contains legacy collection, account, provider and billing code. This review does not establish that those paths, the separate native app, identification output or purchases work in production. Existing owner work is moving the web/native boundary and must be retained during integration.

## Local checks

Use the declared pnpm package manager and Node 24. Install locked dependencies with scripts disabled. `pnpm test:catalogue` runs isolated query/data and component regressions without DB or model calls; its image transport is mocked. `pnpm lint` includes the shared Lucide-only guard and eleven icon regressions before Next lint.

The repository's legacy TypeScript 4.6 toolchain cannot parse its currently locked modern declarations. The existing Next configuration suppresses build-time type/lint failures, and the production sitemap queries Prisma during prerender. A full production build therefore requires a separately confirmed target and proper toolchain remediation; the offline source checks are not a substitute for that.

## Offline component review

`node scripts/build-catalogue-review.mjs` compiles the actual gallery/detail/navigation and theme SCSS against explicit fixture records. `node scripts/serve-catalogue-review.mjs` serves it on 127.0.0.1:4817. No accounts, analytics, database or model service is connected; the Next image adapter is stubbed. Fixture screenshots cannot establish a live catalogue or native-app outcome.

Historical screenshots remain under `public/project-images`; they were not refreshed as production evidence in this pass. See [the dated source review](docs/quality/catalogue-review-20261120.md) for verified behaviour, owner-draft overlaps and release limits.
