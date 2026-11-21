import FilterableCrystalGallery from "../../components/Organisms/FilterableCrystalGallery";
import { parseCatalogueResponse } from "../../lib/catalogue-response";
import type { CatalogueCrystal } from "../../lib/catalogue-filters";
import { Metadata } from "next";
import { enrichCrystalData } from "../../lib/crystal-data-enrichment";
import {
  parseCatalogueQuery,
  type DetailIndex,
} from "../../lib/catalogue-filters";
import { RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Crystal Directory: browse colours, properties and traditional associations",
  description:
    "Browse the crystal directory by name, colour, hardness and recorded traditional associations.",
  keywords: [
    "crystals",
    "crystal directory",
    "crystal meanings",
    "chakra crystals",
    "zodiac crystals",
    "crystal colours",
    "healing crystals",
    "crystal properties",
  ],
};

async function getCrystals(): Promise<{ crystals: CatalogueCrystal[] } | null> {
  const basePath =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const allCrystalsPath = `${basePath}/api/crystal/allCrystals`;

  try {
    const res = await fetch(allCrystalsPath, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error("Failed to fetch crystals:", res.status);
      return null;
    }

    return parseCatalogueResponse(await res.json());
  } catch (error) {
    console.error("Crystal directory request failed");
    return null;
  }
}

export default async function Page({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const allCrystals = await getCrystals();
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams))
    for (const item of Array.isArray(value)
      ? value
      : value === undefined
        ? []
        : [value])
      query.append(key, item);
  const details: DetailIndex = {};
  for (const crystal of allCrystals?.crystals ?? []) {
    const enriched = enrichCrystalData(crystal.name);
    if (enriched)
      details[crystal.id] = {
        alternativeNames: enriched.alternativeNames,
        zodiacSigns: enriched.zodiacSigns,
        elements: enriched.elements,
        colors: enriched.colors,
        chakras: enriched.chakras,
        hardness: enriched.hardness,
      };
  }

  return (
    <div className="section crystal-directory">
      <div className="container">
        <div className="crystal-directory__header mb-5">
          <h1 className="title is-3 has-text-white">
            A closer look at every crystal.
          </h1>
          <p className="subtitle is-6 has-text-grey-light">
            Search by name, colour and origin. Explore mineral characteristics
            alongside clearly labelled traditional associations.
          </p>
        </div>
        {allCrystals ? (
          <FilterableCrystalGallery
            crystals={allCrystals.crystals}
            details={details}
            initialFilters={parseCatalogueQuery(query)}
          />
        ) : (
          <section className="directory-load-error" role="alert">
            <h2>The directory could not load.</h2>
            <p>
              Your filters have not been cleared. Reload this view to try again.
            </p>
            <form method="get" action="/crystals">
              {Array.from(query.entries()).map(([key, value], index) => (
                <input
                  key={`${key}:${index}`}
                  type="hidden"
                  name={key}
                  value={value}
                />
              ))}
              <button type="submit" className="directory-reset">
                <RefreshCw size={16} aria-hidden />
                Try again
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
