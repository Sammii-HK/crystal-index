"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Gem,
  ChevronDown,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import BImage from "../Atoms/BImage";
import BackToTop from "../Atoms/BackToTop";
import { slugify } from "../../lib/helpers/slugify";
import {
  CHAKRAS,
  COLOURS,
  ZODIAC,
  ELEMENTS,
  emptyFilters,
  parseCatalogueQuery,
  catalogueQuery,
  selectCatalogue,
  type CatalogueFilters,
  type CatalogueCrystal,
  type DetailIndex,
  type SortOption,
} from "../../lib/catalogue-filters";
const colourHex: Record<string, string> = {
  red: "#c82020",
  pink: "#d72c70",
  orange: "#eb5e00",
  yellow: "#daa000",
  green: "#95c012",
  blue: "#168ccc",
  indigo: "#0066cc",
  violet: "#9c4cc5",
  brown: "#663300",
  black: "#333333",
  white: "#ffffff",
  clear: "#e0e0e0",
};
const title = (value: string) =>
  value.replace(/\b\w/g, (letter) => letter.toUpperCase());
export default function FilterableCrystalGallery({
  crystals,
  details = {},
  initialFilters = emptyFilters(),
}: {
  crystals: CatalogueCrystal[];
  details?: DetailIndex;
  initialFilters?: CatalogueFilters;
}) {
  const [filters, setFilters] = useState(initialFilters),
    [expanded, setExpanded] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  function resetView() { update(emptyFilters()); searchInput.current?.focus() }
  function clearSearch() { update({ ...filters, search: "" }); searchInput.current?.focus() }
  useEffect(() => {
    function restore() {
      setFilters(parseCatalogueQuery(window.location.search));
    }
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function update(next: CatalogueFilters) {
    setFilters(next);
    const query = catalogueQuery(next);
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  }
  function toggle(
    group: "chakras" | "colours" | "zodiac" | "elements",
    value: string,
  ) {
    update({
      ...filters,
      [group]: filters[group].includes(value)
        ? filters[group].filter((item) => item !== value)
        : [...filters[group], value],
    });
  }
  const filtered = useMemo(
    () => selectCatalogue(crystals, filters, details),
    [crystals, filters, details],
  );
  const chips = [
    ...(filters.search.trim()
      ? [
          {
            key: "search",
            label: `Search: ${filters.search.trim()}`,
            remove: () => update({ ...filters, search: "" }),
          },
        ]
      : []),
    ...(["colours", "chakras", "zodiac", "elements"] as const).flatMap(
      (group) =>
        filters[group].map((value) => ({
          key: `${group}:${value}`,
          label: `${group === "colours" ? "Colour" : group === "chakras" ? "Chakra" : group === "zodiac" ? "Zodiac" : "Element"}: ${title(value)}`,
          remove: () => toggle(group, value),
        })),
    ),
  ];
  const query = catalogueQuery(filters);
  return (
    <div className="filterable-gallery">
      <section className="filter-bar" aria-label="Filter the crystal directory">
        <div className="directory-search-row">
          <div className="directory-search">
            <label htmlFor="directory-search" className="directory-label">Find a crystal</label>
            <span className="directory-search__field">
              <Search size={18} aria-hidden />
              <input
                ref={searchInput}
                id="directory-search"
                type="search"
                maxLength={200}
                value={filters.search}
                onChange={(event) =>
                  update({ ...filters, search: event.target.value })
                }
                placeholder="Name, alternative name, colour or origin"
              />
              {filters.search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={clearSearch}
                >
                  <X size={17} aria-hidden />
                </button>
              )}
            </span>
          </div>
          <label className="directory-sort">
            <span className="directory-label">Sort by</span>
            <span>
              <select
                value={filters.sort}
                onChange={(event) =>
                  update({ ...filters, sort: event.target.value as SortOption })
                }
              >
                <option value="name-asc">Name A to Z</option>
                <option value="name-desc">Name Z to A</option>
                <option value="recent">Recently added</option>
                <option value="hardness">Hardness, high to low</option>
              </select>
              <ChevronDown size={16} aria-hidden />
            </span>
          </label>
        </div>
        <div className="directory-filter-heading">
          <p>
            Search within the catalogue. Choose several values in a group to
            match any; different groups narrow the results.
          </p>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="directory-facets"
            onClick={() => setExpanded(!expanded)}
          >
            <SlidersHorizontal size={16} aria-hidden />
            {expanded ? "Hide filters" : "Show filters"}
          </button>
        </div>
        <div
          id="directory-facets"
          hidden={!expanded}
          className="directory-facets"
        >
          <fieldset>
            <legend>Colour</legend>
            <div className="filter-group__options">
              {COLOURS.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={filters.colours.includes(value)}
                  className={`filter-pill ${filters.colours.includes(value) ? "filter-pill--active" : ""}`}
                  onClick={() => toggle("colours", value)}
                >
                  <span
                    className="directory-swatch"
                    aria-hidden
                    style={{ backgroundColor: colourHex[value] }}
                  />
                  {title(value)}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="directory-associations">
            <h2>Traditional associations</h2>
            <p>
              Chakra, zodiac and elemental correspondences reflect traditions
              and beliefs. Element here is a symbolic association, not chemical
              composition.
            </p>
          </div>
          {(
            [
              { group: "chakras", label: "Chakra", values: CHAKRAS },
              { group: "zodiac", label: "Zodiac", values: ZODIAC },
              { group: "elements", label: "Element", values: ELEMENTS },
            ] as const
          ).map(({ group, label, values }) => (
            <fieldset key={group}>
              <legend>{label}</legend>
              <div className="filter-group__options">
                {values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={filters[group].includes(value)}
                    className={`filter-pill ${filters[group].includes(value) ? "filter-pill--active" : ""}`}
                    onClick={() => toggle(group, value)}
                  >
                    {title(value)}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        {(chips.length > 0 || filters.sort !== "name-asc") && (
          <div className="filter-bar__active">
            <div className="filter-chips">
              {chips.map((chip) => (
                <button
                  type="button"
                  key={chip.key}
                  className="filter-chip"
                  onClick={() => { chip.remove(); searchInput.current?.focus() }}
                  aria-label={`Remove ${chip.label} filter`}
                >
                  {chip.label}
                  <X size={14} aria-hidden />
                </button>
              ))}
            </div>
            <button
              className="filter-bar__clear-all"
              type="button"
              onClick={resetView}
            >
              Reset view
            </button>
          </div>
        )}
      </section>
      <p
        className="filter-results__count"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length} of {crystals.length}{" "}
        {crystals.length === 1 ? "crystal" : "crystals"}
        {chips.length ? " match this view" : " in the catalogue"}
      </p>
      {!filtered.length ? (
        <div className="empty-state">
          <Gem size={42} aria-hidden className="directory-empty-icon" />
          <h2 className="empty-state__title">
            {crystals.length
              ? "No crystals match this view."
              : "The catalogue is empty."}
          </h2>
          <p className="empty-state__description">
            {crystals.length
              ? "Try a broader phrase or remove a filter. Your search stays in the page address so you can return to it."
              : "There are no catalogue records to display yet."}
          </p>
          {crystals.length > 0 && (
            <button
              type="button"
              className="directory-reset"
              onClick={resetView}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="columns is-multiline crystal-gallery-grid">
          {filtered.map((crystal) => {
            const image = crystal.image?.[0];
            const href = `/crystals/${crystal.slug || slugify(crystal.name)}${query ? `?directory=${encodeURIComponent(query)}` : ""}`;
            return (
              <div
                key={crystal.id}
                className="column is-4-desktop is-6-tablet is-12-mobile"
              >
                <Link className="crystal-card directory-card" href={href}>
                  <div className="crystal-card__image-wrap">
                    {image ? (
                      <BImage
                        imageId={typeof image === "object" ? image.id : image}
                        blobUrl={
                          typeof image === "object"
                            ? (image.blobUrl ?? undefined)
                            : undefined
                        }
                        alt=""
                        fill
                      />
                    ) : (
                      <div className="directory-image-placeholder">
                        <Gem size={40} aria-hidden />
                        <span>Image not available</span>
                      </div>
                    )}
                  </div>
                  <div className="directory-card__body">
                    <div className="directory-card__title">
                      <h2>{crystal.name}</h2>
                      <ArrowUpRight size={18} aria-hidden />
                    </div>
                    {crystal.bio && <p>{crystal.bio}</p>}
                    <div className="directory-card__facts">
                      {(
                        details[crystal.id]?.colors ??
                        crystal.crystalInfo?.colour ??
                        []
                      )
                        .slice(0, 3)
                        .map((colour) => (
                          <span key={colour}>{colour}</span>
                        ))}
                      {(details[crystal.id]?.hardness ?? crystal.hardness) ? (
                        <span>
                          Mohs{" "}
                          {details[crystal.id]?.hardness ?? crystal.hardness}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <BackToTop />
    </div>
  );
}
