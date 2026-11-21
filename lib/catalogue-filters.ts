export const CHAKRAS = [
  "root",
  "sacral",
  "solar plexus",
  "heart",
  "throat",
  "third eye",
  "crown",
] as const;
export const COLOURS = [
  "red",
  "pink",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "brown",
  "black",
  "white",
  "clear",
] as const;
export const ZODIAC = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;
export const ELEMENTS = ["earth", "air", "fire", "water"] as const;
export type SortOption = "name-asc" | "name-desc" | "recent" | "hardness";
export interface CatalogueFilters {
  search: string;
  chakras: string[];
  colours: string[];
  zodiac: string[];
  elements: string[];
  sort: SortOption;
}
export interface CatalogueCrystal {
  id: number;
  name: string;
  slug?: string | null;
  bio?: string | null;
  otherNames?: string | null;
  origin?: string | null;
  originLocation?: string | null;
  memento?: string | null;
  intention?: string[];
  hardness?: number | null;
  createdAt: string;
  image: Array<number | { id: number; blobUrl: string | null }>;
  crystalInfo?: {
    info?: string | null;
    colour: string[];
    chakra: string[];
  } | null;
}
export interface CatalogueDetails {
  alternativeNames?: string[];
  zodiacSigns?: string[];
  elements?: string[];
  chakras?: string[];
  colors?: string[];
  hardness?: number;
}
export type DetailIndex = Record<string, CatalogueDetails>;
export const emptyFilters = (): CatalogueFilters => ({
  search: "",
  chakras: [],
  colours: [],
  zodiac: [],
  elements: [],
  sort: "name-asc",
});
const normal = (value: string) => value.trim().toLowerCase();
function allowed(
  query: URLSearchParams,
  key: string,
  options: readonly string[],
) {
  return [
    ...new Set(
      query
        .getAll(key)
        .flatMap((value) => value.split(","))
        .map(normal)
        .filter((value) => options.includes(value)),
    ),
  ];
}
export function parseCatalogueQuery(
  query: string | URLSearchParams,
): CatalogueFilters {
  const input = typeof query === "string" ? new URLSearchParams(query) : query;
  const sort = input.get("sort");
  return {
    search: (input.get("search") ?? "").slice(0, 200),
    chakras: allowed(input, "chakra", CHAKRAS),
    colours: allowed(input, "colour", COLOURS),
    zodiac: allowed(input, "zodiac", ZODIAC),
    elements: allowed(input, "element", ELEMENTS),
    sort: ["name-asc", "name-desc", "recent", "hardness"].includes(sort ?? "")
      ? (sort as SortOption)
      : "name-asc",
  };
}
export function catalogueQuery(filters: CatalogueFilters) {
  const query = new URLSearchParams();
  if (filters.search.trim())
    query.set("search", filters.search.trim().slice(0, 200));
  for (const [key, values] of [
    ["chakra", filters.chakras],
    ["colour", filters.colours],
    ["zodiac", filters.zodiac],
    ["element", filters.elements],
  ] as const)
    for (const value of [...values].sort()) query.append(key, value);
  if (filters.sort !== "name-asc") query.set("sort", filters.sort);
  return query.toString();
}
export function catalogueBackHref(query: string) {
  const safe = catalogueQuery(parseCatalogueQuery(query));
  return `/crystals${safe ? `?${safe}` : ""}`;
}
function hardness(crystal: CatalogueCrystal, details: DetailIndex) {
  const value = details[crystal.id]?.hardness ?? crystal.hardness;
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : null;
}
export function selectCatalogue<T extends CatalogueCrystal>(
  crystals: T[],
  filters: CatalogueFilters,
  details: DetailIndex = {},
): T[] {
  const includes = (
    selected: string[],
    values: readonly string[] | undefined,
    chakra = false,
  ) =>
    !selected.length ||
    !!values?.some((value) =>
      selected.includes(
        normal(value).replace(chakra ? /\s+chakra$/ : /$^/, ""),
      ),
    );
  const search = normal(filters.search);
  const matches = crystals.filter((crystal) => {
    const extra = details[crystal.id];
    const text = [
      crystal.name,
      crystal.bio,
      crystal.otherNames,
      crystal.crystalInfo?.info,
      crystal.origin,
      crystal.originLocation,
      crystal.memento,
      ...(crystal.intention ?? []),
      ...(extra?.alternativeNames ?? []),
      ...(extra?.zodiacSigns ?? []),
      ...(extra?.elements ?? []),
      ...(extra?.colors ?? crystal.crystalInfo?.colour ?? []),
      ...(extra?.chakras ?? crystal.crystalInfo?.chakra ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return (
      (!search || text.includes(search)) &&
      includes(filters.colours, extra?.colors ?? crystal.crystalInfo?.colour) &&
      includes(
        filters.chakras,
        extra?.chakras ?? crystal.crystalInfo?.chakra,
        true,
      ) &&
      includes(filters.zodiac, extra?.zodiacSigns) &&
      includes(filters.elements, extra?.elements)
    );
  });
  const collator = new Intl.Collator("en-GB", {
    numeric: true,
    sensitivity: "base",
  });
  return matches.sort((a, b) => {
    const names = collator.compare(a.name, b.name) || a.id - b.id;
    if (filters.sort === "name-desc") return -names;
    if (filters.sort === "hardness") {
      const left = hardness(a, details),
        right = hardness(b, details);
      return left === null
        ? right === null
          ? names
          : 1
        : right === null
          ? -1
          : right - left || names;
    }
    if (filters.sort === "recent") {
      const left = Date.parse(a.createdAt),
        right = Date.parse(b.createdAt);
      return (
        (Number.isFinite(right) ? right : -Infinity) -
          (Number.isFinite(left) ? left : -Infinity) || names
      );
    }
    return names;
  });
}
