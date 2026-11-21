import React from "react";
import { createRoot } from "react-dom/client";
import FilterableCrystalGallery from "../../components/Organisms/FilterableCrystalGallery";
import ViewCrystal from "../../components/ViewCrystal";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import type { CatalogueCrystal } from "../../lib/catalogue-filters";
const crystals: CatalogueCrystal[] = [
  {
    id: 1,
    name: "Amethyst",
    slug: "amethyst",
    bio: "Illustrative record for the offline gallery review.",
    hardness: 7,
    createdAt: "2026-01-01",
    image: [999],
    crystalInfo: { colour: ["violet"], chakra: ["crown"] },
  },
  {
    id: 2,
    name: "Rose Quartz",
    slug: "rose-quartz",
    bio: "Illustrative record. Images are intentionally absent in this review.",
    hardness: 7,
    createdAt: "2026-01-02",
    image: [],
    crystalInfo: { colour: ["pink"], chakra: ["heart"] },
  },
  {
    id: 3,
    name: "Calcite",
    slug: "calcite",
    hardness: 3,
    createdAt: "2026-01-03",
    image: [],
    crystalInfo: { colour: ["white"], chakra: [] },
  },
];
const details = {
  1: { zodiacSigns: ["Aries"], elements: ["Air"] },
  2: { zodiacSigns: ["Taurus"], elements: ["Water"] },
};
const selected = crystals.find(
  (crystal) => window.location.pathname === `/crystals/${crystal.slug}`,
);
const query =
  new URLSearchParams(window.location.search).get("directory") ?? "";
createRoot(document.getElementById("root")!).render(
  <>
    <Navbar />
    <div className="section" style={{ paddingTop: "7rem" }}>
      <div className="container">
        <p
          style={{
            padding: "1rem",
            border: "1px solid var(--ci-divider)",
            borderRadius: 12,
            marginBottom: 24,
            color: "var(--ci-text-muted)",
          }}
        >
          Offline component review. These are illustrative fixture records with
          images intentionally absent. No database, account, analytics or model
          is connected.
        </p>
        {selected ? (
          <ViewCrystal crystal={selected as never} directoryQuery={query} />
        ) : (
          <>
            <header className="crystal-directory__header mb-5">
              <h1 className="title is-3">A closer look at every crystal.</h1>
              <p className="subtitle is-6">
                Search and filter the review fixtures. This is not the
                production catalogue.
              </p>
            </header>
            <FilterableCrystalGallery crystals={crystals} details={details} />
          </>
        )}
      </div>
    </div>
    <Footer />
  </>,
);
