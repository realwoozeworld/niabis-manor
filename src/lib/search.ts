import { sector1Locations } from "@/data/sector1-locations";
import { sector2Plots } from "@/data/sector2-plots";
import { sector3Plots } from "@/data/sector3-plots";

export type SearchResultType = "location" | "plot" | "sector";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  titleKa: string;
  titleEn?: string;
  subtitle?: string;
  sectorId: 1 | 2 | 3 | 4;
  keywords: string;
}

const statusKa: Record<string, string> = {
  sold: "გაყიდული",
  reserved: "დაჯავშნილი",
  available: "თავისუფალი",
};

export const searchIndex: SearchResult[] = [
  // Sectors
  {
    type: "sector",
    id: "sector-1",
    titleKa: "1 სექტორი",
    titleEn: "Sector 1",
    subtitle: "მასპინძლობის სექტორი",
    sectorId: 1,
    keywords: "1 სექტორი sector one მასპინძლობა vineyard winery",
  },
  {
    type: "sector",
    id: "sector-2",
    titleKa: "2 სექტორი",
    titleEn: "Sector 2",
    subtitle: "საცხოვრებელი ნაკვეთები",
    sectorId: 2,
    keywords: "2 სექტორი sector two საცხოვრებელი ნაკვეთები",
  },
  {
    type: "sector",
    id: "sector-3",
    titleKa: "3 სექტორი",
    titleEn: "Sector 3",
    subtitle: "აგრო / სათბურები",
    sectorId: 3,
    keywords: "3 სექტორი sector three აგრო სათბურები",
  },
  {
    type: "sector",
    id: "sector-4",
    titleKa: "4 სექტორი",
    titleEn: "Sector 4",
    subtitle: "ბაღები და ფერმა",
    sectorId: 4,
    keywords: "4 სექტორი sector four ბაღები ფერმა",
  },

  // Sector 1 — locations
  ...sector1Locations.map((loc) => ({
    type: "location" as const,
    id: loc.id,
    titleKa: loc.nameKa,
    titleEn: loc.nameEn,
    subtitle: loc.features?.join(" · "),
    sectorId: 1 as const,
    keywords: [
      loc.nameKa,
      loc.nameEn,
      loc.category,
      ...(loc.features || []),
      loc.descriptionKa || "",
    ]
      .join(" ")
      .toLowerCase(),
  })),

  // Sector 2 — plots
  ...sector2Plots.map((plot) => ({
    type: "plot" as const,
    id: plot.id,
    titleKa: plot.id,
    titleEn: `Plot ${plot.id.replace("N-", "")}`,
    subtitle: plot.ownerKa
      ? `${plot.ownerKa} · ${statusKa[plot.status]}`
      : statusKa[plot.status],
    sectorId: 2 as const,
    keywords: `plot ${plot.id} ${plot.ownerKa || ""} ${plot.status} ${statusKa[plot.status]}`.toLowerCase(),
  })),

  // Sector 3 — plots
  ...sector3Plots.map((plot) => ({
    type: "plot" as const,
    id: plot.id,
    titleKa: plot.id,
    titleEn: `Plot ${plot.id.replace("N-", "")}`,
    subtitle: plot.ownerKa
      ? `${plot.ownerKa} · ${statusKa[plot.status]}`
      : statusKa[plot.status],
    sectorId: 3 as const,
    keywords: `plot ${plot.id} ${plot.ownerKa || ""} ${plot.status} ${statusKa[plot.status]}`.toLowerCase(),
  })),
];

export function searchContent(query: string, limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchIndex
    .filter((item) => {
      const searchable = `${item.titleKa} ${item.titleEn || ""} ${item.subtitle || ""} ${item.keywords}`.toLowerCase();
      return searchable.includes(q);
    })
    .slice(0, limit);
}