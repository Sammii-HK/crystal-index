import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyFilters,
  parseCatalogueQuery,
  catalogueQuery,
  catalogueBackHref,
  selectCatalogue,
} from "../lib/catalogue-filters.ts";
import { parseCatalogueResponse } from "../lib/catalogue-response.ts";
const entries = [
  {
    id: 1,
    name: "Amethyst",
    bio: "A purple quartz",
    hardness: 7,
    createdAt: "2026-01-01",
    image: [],
    crystalInfo: { colour: ["Violet"], chakra: ["Crown Chakra"] },
  },
  {
    id: 2,
    name: "Rose Quartz",
    bio: "Colour varies",
    hardness: null,
    createdAt: "invalid-date",
    image: [],
    crystalInfo: { colour: ["Pink"], chakra: ["Heart"] },
  },
  {
    id: 3,
    name: "Calcite",
    hardness: 3,
    createdAt: "2026-01-02",
    image: [],
    crystalInfo: { colour: ["White"], chakra: [] },
  },
];
const details = {
  1: {
    alternativeNames: ["Purple quartz"],
    zodiacSigns: ["Aries"],
    elements: ["Air"],
    hardness: 7,
  },
  2: { elements: ["Water"] },
};
test("zodiac and element filters use recorded metadata, not prose or inferred zodiac elements", () => {
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), zodiac: ["aries"] },
      details,
    ).map((v) => v.id),
    [1],
  );
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), elements: ["fire"] },
      details,
    ),
    [],
  );
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), elements: ["air"] },
      details,
    ).map((v) => v.id),
    [1],
  );
});
test("OR within a facet, AND across groups, case-normalised chakra labels and trimmed search", () => {
  assert.equal(
    selectCatalogue(
      entries,
      { ...emptyFilters(), colours: ["violet", "pink"] },
      details,
    ).length,
    2,
  );
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), colours: ["violet", "pink"], chakras: ["crown"] },
      details,
    ).map((v) => v.id),
    [1],
  );
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), search: "  PURPLE QUARTZ  " },
      details,
    ).map((v) => v.id),
    [1],
  );
});
test("all sorts are deterministic and leave source records untouched; unknown hardness/dates sort last", () => {
  const original = entries.map((v) => v.id);
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), sort: "hardness" },
      details,
    ).map((v) => v.id),
    [1, 3, 2],
  );
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), sort: "recent" },
      details,
    ).map((v) => v.id),
    [3, 1, 2],
  );
  assert.deepEqual(
    selectCatalogue(
      entries,
      { ...emptyFilters(), sort: "name-desc" },
      details,
    ).map((v) => v.id),
    [2, 3, 1],
  );
  assert.deepEqual(
    entries.map((v) => v.id),
    original,
  );
});
test("filter URLs round-trip and reject unknown values, duplicated facets and external return paths", () => {
  const value = parseCatalogueQuery(
    "search=moon&colour=Pink&colour=pink&zodiac=aries,evil&element=Air&sort=hardness&redirect=https://evil.test",
  );
  assert.deepEqual(value.colours, ["pink"]);
  assert.deepEqual(value.zodiac, ["aries"]);
  assert.deepEqual(parseCatalogueQuery(catalogueQuery(value)), value);
  assert.equal(
    catalogueBackHref("redirect=https://evil.test&search=rose"),
    "/crystals?search=rose",
  );
  assert.equal(catalogueBackHref("https://evil.test"), "/crystals");
  assert.equal(
    parseCatalogueQuery("search=" + "x".repeat(300)).search.length,
    200,
  );
});
test("response validation distinguishes failure from empty data and strips unneeded account fields", () => {
  assert.equal(parseCatalogueResponse({ crystals: null }), null);
  assert.equal(
    parseCatalogueResponse({ crystals: [{ name: "Broken" }] }),
    null,
  );
  assert.deepEqual(parseCatalogueResponse({ crystals: [] }), { crystals: [] });
  const parsed = parseCatalogueResponse({
    crystals: [
      {
        ...entries[0],
        createdBy: { email: "fixture@example.test" },
        privateToken: "fixture",
      },
    ],
  });
  assert.ok(parsed);
  assert.equal("createdBy" in parsed.crystals[0], false);
  assert.equal("privateToken" in parsed.crystals[0], false);
});

test("hyphenated chakra names from the sitemap select the chakra", () => {
  const value = parseCatalogueQuery(new URLSearchParams("chakra=solar-plexus,third-eye"));
  assert.deepEqual(value.chakras, ["solar plexus", "third eye"]);
});
