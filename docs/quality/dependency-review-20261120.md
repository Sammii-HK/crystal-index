# Crystal Index compatible dependency cleanup, 20 November 2026

Separate follow-up to the reviewed UI/source batch `ba6f28e0`. No forced framework, React, Prisma or authentication major migration; no DB, account, analytics or model service was contacted.

## Changes

Static usage searches across app/components/lib/pages found no imports, requires or dynamic references to `react-d3-library` or `react-icons`. Their unused package declarations were removed. The active globe uses Three/Fiber and the retained D3/geo packages; it was not changed into a specimen viewer. Removing the unused React/D3 wrapper also removes its obsolete production Babel/webpack tooling graph. No source, image or asset file was deleted.

NextAuth moves from 4.24.13 to 4.24.15 within major 4. Other updates remain within the existing declared major/range constraints. Next remains 13.5.11, the latest 13.x published line reported by the registry; React stays 18.3.1 and Prisma/client stay 5.22.0. These compatible changes do not cure the framework's remaining critical advisories.

Next 13 pins PostCSS 8.4.31 despite available security fixes within major 8. An explicit, narrowly scoped resolution selects `next@13.5.11>postcss:8.5.33`. A regression resolves the actual PostCSS instance under Next, verifies its patched 8.x line, and processes the application's real compiled SCSS. This checks the processor/stylesheet contract, not a full Next production build or data-backed route.

## Audit evidence

Registry-reported pnpm tallies are shown without suppressions. Multiple advisory records or dependency paths can affect the same package; these are not directly comparable to npm's affected-package totals.

| Scope | Before | After |
| --- | --- | --- |
| Production graph | 8 critical, 75 high, 78 moderate, 17 low | 3 critical, 38 high, 45 moderate, 16 low |
| Full graph | 8 critical, 94 high, 87 moderate, 19 low | 3 critical, 41 high, 46 moderate, 17 low |

The full baseline was recreated in an isolated temporary directory from only the product commit's manifest and lockfile. No environment files were copied. [Grouped critical/high paths and exact audit totals](dependency-audit-20261120.json) remain reviewable locally.

All three remaining critical records concern Next 13.5.11, with patched lines starting at 15.5.24/15.5.28. Fixing them requires a separately reviewed framework-major migration; this cleanup does not force one. Remaining high findings also include older Axios, Undici, Sharp, D3 color, Fastify busboy and Zod lines whose fixes cross their installed compatibility ranges/major lines. There are still substantial moderate/low and legacy development-tool findings. A clean audit, live exploit confirmation or release-ready application is not claimed.

The NextAuth email-normaliser advisory is specifically about the passwordless email provider; the inspected application configuration uses Auth0. The package-level fix is still applied, without asserting that the advisory was demonstrably reachable in this deployment.

## Checks and limits

Three new dependency regressions pass: the actual patched email-normaliser route rejects a homoglyph second separator before mock lookup/mail IO; fixture-only auth crypto round-trips and rejects the wrong fixture secret; and Next's resolved PostCSS accepts the actual compiled site stylesheet. The email route's valid fixture deliberately denies sign-in before mail or verification-token creation. No real credential or account was used.

The nine catalogue/DOM regressions, eleven shared icon regressions, source icon scans and normal Next lint still pass. The offline gallery/detail/navigation plus SCSS compile with the updated dependencies. The browser evidence belongs to the reviewed, unchanged product-source flows and is explicitly fixture-only. It does not establish live image, account, provider or native behaviour.

Full production build/typecheck remain constrained as recorded in the [source review](catalogue-review-20261120.md): TypeScript 4.6 cannot parse current declarations, Next already suppresses build-time type/lint failures, and sitemap prerender performs DB queries. Neither suppression nor a DB-backed build was used to assert success. Existing React/Three peer and legacy TopoJSON CLI-bin warnings remain; no globe CLI or production account integration was exercised.

The owner's dirty main checkout, identify deletions, catalogue changes and canonical App Store link work remain untouched. Normal conflict-aware integration must preserve those changes. No push, merge or deployment was performed.

## Sources

- [NextAuth 4.24.15 email-normaliser advisory](https://github.com/advisories/GHSA-7rqj-j65f-68wh).
- [PostCSS source-map fix](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp).
- Remaining Next advisories: [Windows-hosted server issue](https://github.com/advisories/GHSA-p293-qw3h-jr36), [AVIF image optimisation issue](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4), [SVG image optimisation issue](https://github.com/advisories/GHSA-2464-fhr4-w9xw). Their deployment prerequisites were not tested here.
