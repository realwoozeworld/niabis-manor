import { sector2Plots, type Plot } from "@/data/sector2-plots";
import { sector3Plots } from "@/data/sector3-plots";

export interface SheetPlotUpdate {
  sector: number;
  id: string;
  ownerKa?: string;
  ownerEn?: string;
  areaSqm?: number;
  status?: "available" | "sold" | "reserved";
  planted?: string;
  isWatered?: boolean;
}

/**
 * Parses CSV text exported from Google Sheets
 */
function parseCSV(csvText: string): SheetPlotUpdate[] {
  const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ""));
  const sectorIdx = headers.findIndex((h) => h.includes("sector") || h.includes("სექტორი"));
  const idIdx = headers.findIndex((h) => h.includes("plot") || h.includes("id") || h.includes("ნაკვეთი"));
  const ownerKaIdx = headers.findIndex((h) => (h.includes("owner") && h.includes("ka")) || h.includes("მფლობელი"));
  const ownerEnIdx = headers.findIndex((h) => h.includes("owner") && h.includes("en"));
  const areaIdx = headers.findIndex((h) => h.includes("area") || h.includes("ფართობი") || h.includes("sqm"));
  const statusIdx = headers.findIndex((h) => h.includes("status") || h.includes("სტატუსი"));
  const plantedIdx = headers.findIndex((h) => h.includes("planted") || h.includes("ნარგავები"));
  const wateredIdx = headers.findIndex((h) => h.includes("water") || h.includes("მორწყვა"));

  const updates: SheetPlotUpdate[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Regex to handle comma-separated values with potential quotes
    const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((cell) => cell.replace(/^"|"$/g, "").trim());

    const sectorNum = sectorIdx !== -1 ? parseInt(row[sectorIdx], 10) : 0;
    const rawId = idIdx !== -1 ? row[idIdx] : "";
    if (!rawId) continue;

    // Standardize ID format: e.g. "1" or "N1" -> "N-1"
    const id = rawId.startsWith("N-") ? rawId : `N-${rawId.replace(/^N-?/, "")}`;

    const update: SheetPlotUpdate = {
      sector: sectorNum,
      id,
    };

    if (ownerKaIdx !== -1 && row[ownerKaIdx] !== undefined) update.ownerKa = row[ownerKaIdx];
    if (ownerEnIdx !== -1 && row[ownerEnIdx] !== undefined) update.ownerEn = row[ownerEnIdx];
    if (areaIdx !== -1 && row[areaIdx]) {
      const areaVal = parseFloat(row[areaIdx].replace(",", "."));
      if (!isNaN(areaVal)) update.areaSqm = areaVal;
    }
    if (statusIdx !== -1 && row[statusIdx]) {
      const st = row[statusIdx].toLowerCase();
      if (st.includes("sold") || st.includes("გაყიდ")) update.status = "sold";
      else if (st.includes("reserv") || st.includes("ჯავშ")) update.status = "reserved";
      else if (st.includes("avail") || st.includes("თავისუფ")) update.status = "available";
    }
    if (plantedIdx !== -1 && row[plantedIdx] !== undefined) update.planted = row[plantedIdx];
    if (wateredIdx !== -1 && row[wateredIdx] !== undefined) {
      const w = row[wateredIdx].toLowerCase();
      update.isWatered = w === "true" || w === "1" || w.includes("კი") || w.includes("დიახ") || w.includes("მორწყულ");
    }

    updates.push(update);
  }

  return updates;
}

/**
 * Fetches live plot data from Google Sheets if GOOGLE_SHEET_CSV_URL is set,
 * and merges with the hardcoded base plots (keeping geometry/coordinates intact).
 */
export async function getLiveSectorPlots(sectorId: number): Promise<Plot[]> {
  const basePlots = sectorId === 2 ? sector2Plots : sectorId === 3 ? sector3Plots : [];
  const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CSV_URL || process.env.GOOGLE_SHEETS_CSV_URL;

  if (!sheetUrl) {
    return basePlots;
  }

  try {
    const res = await fetch(sheetUrl, {
      next: { revalidate: 60 }, // Cache on edge/server, revalidate every 60 seconds
    });

    if (!res.ok) {
      console.warn("Failed to fetch Google Sheet, falling back to local data:", res.statusText);
      return basePlots;
    }

    const csvText = await res.text();
    const updates = parseCSV(csvText);

    if (updates.length === 0) return basePlots;

    return basePlots.map((plot) => {
      const match = updates.find(
        (u) => (u.sector === sectorId || u.sector === 0) && u.id.toLowerCase() === plot.id.toLowerCase()
      );
      if (!match) return plot;

      return {
        ...plot,
        ...(match.ownerKa !== undefined && { ownerKa: match.ownerKa }),
        ...(match.ownerEn !== undefined && { ownerEn: match.ownerEn }),
        ...(match.areaSqm !== undefined && { areaSqm: match.areaSqm }),
        ...(match.status !== undefined && { status: match.status }),
        ...(match.planted !== undefined && { planted: match.planted }),
        ...(match.isWatered !== undefined && { isWatered: match.isWatered }),
      };
    });
  } catch (error) {
    console.error("Error fetching live Google Sheet plots:", error);
    return basePlots;
  }
}
