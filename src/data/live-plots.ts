import { supabase } from "@/lib/supabase";
import { sector2Plots, type Plot } from "@/data/sector2-plots";
import { sector3Plots } from "@/data/sector3-plots";
import { sector1Locations, type Location } from "@/data/sector1-locations";

export async function getLiveSectorPlots(sectorId: number): Promise<Plot[]> {
  const basePlots = sectorId === 2 ? sector2Plots : sectorId === 3 ? sector3Plots : [];
  if (basePlots.length === 0) return [];

  try {
    const { data, error } = await supabase
      .from("plots")
      .select("*")
      .eq("sector_id", sectorId);

    if (error || !data || data.length === 0) return basePlots;

    return basePlots.map((plot) => {
      const dbPlot = data.find((d) => d.id.toLowerCase() === plot.id.toLowerCase());
      if (!dbPlot) return plot;

      return {
        ...plot,
        status: dbPlot.status ?? plot.status,
        ownerKa: dbPlot.owner_ka ?? plot.ownerKa,
        ownerEn: dbPlot.owner_en ?? plot.ownerEn,
        areaSqm: dbPlot.area_sqm != null ? Number(dbPlot.area_sqm) : plot.areaSqm,
        planted: dbPlot.planted ?? plot.planted,
        isWatered: dbPlot.is_watered ?? plot.isWatered,
        ...(dbPlot.price != null && { price: Number(dbPlot.price) }),
      };
    });
  } catch {
    return basePlots;
  }
}

export async function getLiveSector1Locations(): Promise<Location[]> {
  try {
    const { data, error } = await supabase.from("locations").select("*");
    if (error || !data || data.length === 0) return sector1Locations;

    return sector1Locations.map((loc) => {
      const dbLoc = data.find((d) => d.id === loc.id);
      if (!dbLoc) return loc;

      return {
        ...loc,
        nameKa: dbLoc.name_ka || loc.nameKa,
        nameEn: dbLoc.name_en || loc.nameEn,
        descriptionKa: dbLoc.description_ka ?? loc.descriptionKa,
        descriptionEn: dbLoc.description_en ?? loc.descriptionEn,
        features: Array.isArray(dbLoc.features) ? dbLoc.features : loc.features,
      };
    });
  } catch {
    return sector1Locations;
  }
}