# Crystal Index catalogue review, 20 November 2026

Source baseline `56258c19`, isolated `codex/crystal-index-product-polish`. This pass concerns the web directory, shared UI/navigation and source-level claim accuracy. It does not verify the native app, billing, identification models or production accounts.

## Actual repairs

The old zodiac filter searched prose substrings, so an unrelated word such as “varies” could match Aries. The element filter inferred a crystal's element from zodiac signs. Both now use explicitly recorded structured associations from the existing public catalogue metadata. Colour/chakra values are normalised; groups match any selected value within one group and combine across groups. Hardness and recent sorts put unknown values last without mutating source records.

Search, selected facets and sort now survive shareable URLs. Existing related-crystal search links are honoured. Cards are real links usable with keyboards and native browser navigation. Their detail URL carries only allowlisted directory query state, and the detail back link restores that view. Page-level failure is distinguished from a genuinely empty catalogue; retry preserves the current query. Catalogue payload validation strips unnecessary account-related fields before passing public display props to the client.

The directory has labelled search/sort, an explicit filter disclosure, fieldsets/legends, pressed states, removable chips, announced result counts, visible names and image fallbacks. Mineral characteristics are distinguished from traditional chakra/zodiac/element correspondences, with no inferred chemical-composition meaning. Layout uses the existing site's theme tokens and honours reduced motion.

Shared navigation uses a real menu button, active-page semantics, Escape closing and focus restoration. Search icon actions are keyboard buttons, and the existing shared input's Enter callback now actually runs. Image load failures produce an accessible fallback. Back-to-top is absent from keyboard navigation while hidden and respects reduced motion.

Font Awesome/react-icons, typed arrows, emoji and icon-font decoration were replaced with named Lucide icons across the source UI. Zodiac names stay as text labels; the unused Astronomicon font preload was removed, while the asset file remains intact. The shared guard and its eleven regressions are wired into normal lint/build/release scripts. The location globe remains a location visualisation, not per-specimen procedural 3D.

## Verification

Nine local regressions pass: five pure query/data cases and four actual-component DOM interactions. These cover recorded-metadata matching, facet logic, deterministic sorting, URL/return-path bounds, response validation/minimisation, filter interactions and detail URLs, menu/focus behaviour, Enter/icon actions and image-error fallback. DOM tests use in-memory fixtures and a stubbed Next image transport, not live image/provider/account services. The locked older React Testing Library emits its existing act deprecation warning; Node 24's test module mocks are explicitly enabled for the image adapter.

The strengthened shared icon suite passes 11 tests. Source scans across app/components/lib/pages/styles report 0 violations and 0 symbol-review candidates. Next lint completes with existing hook/image warnings in unrelated or legacy components. No full typecheck or production-build success is claimed.

`node scripts/build-catalogue-review.mjs` compiles the actual gallery/detail/navigation components and existing theme SCSS into an offline fixture review. `node scripts/serve-catalogue-review.mjs` serves it at 4817 with network connections blocked by CSP. Its image adapter is native/stubbed and fixtures intentionally lack real photos; it is not a production catalogue or full Next integration check. No auth, analytics, Prisma, environment or model initialisation is included.

Browser review used only that isolated fixture server. Verified desktop filters/sort and native Enter detail/back navigation restoring the directory query; phone menu Escape/focus, stable search labels, no-results recovery returning focus to search and image-error fallback. The initial expanded phone facets overflowed to 1095px; the corrected groups wrap at 308px and final page width is 390px. Temporary viewport override was reset and browser ownership released.

Locally saved, uncommitted JPEG evidence: `.codex-artifacts/crystal-directory-fixture-desktop.jpg` and `crystal-directory-fixture-mobile.jpg`. Both are explicitly offline fixture views. They must not replace or be described as live catalogue, native-app or provider-output evidence. The committed-baseline App Store link inconsistency remains visible in the fixture; preserve the owner's pending canonical link fix when integrating.

## Concrete full-check limits

The baseline TypeScript 4.6.2 compiler fails to parse locked modern Node 20/Zod declarations before useful application checking. The unchanged Next config already suppresses build-time TypeScript/ESLint failures; this pass does not count that suppression as verification. The production sitemap performs Prisma queries during prerender, so the full build was not executed without a confirmed database target. Normal live directory/detail routes still depend on their existing data service. The offline compilation does not prove production data loading, account ownership or image delivery.

Initial production dependency audit: 8 critical, 75 high, 78 moderate, 17 low advisories. A separately committed compatible cleanup follows; the Next 13 critical fixes require a framework-major migration. This candidate must not be called release-ready while that graph remains.

## Preserve the owner's draft

Main checkout already has substantial uncommitted work, including removed web-identify routes/component, changed landing/navigation/footer/detail links, catalogue data and vision context. All of it remains untouched. This branch starts from committed source and does not incorporate or supersede that draft.

Integration must retain the owner's identify deletions and canonical App Store link work. The icon-only change in `components/Organisms/IdentifyCrystal.tsx` is irrelevant if that owner-deleted file stays deleted; it must not resurrect it. Navigation/footer/detail and Hero icon edits overlap owner-modified files and require normal conflict-aware integration. No native/store or model-release claim follows from this web-source pass.

No DB command/connection, SQL, schema change, provider call, private state, actual credential, deletion, push, merge or deployment was used.
