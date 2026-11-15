import { notFound } from "next/navigation";
import { Suspense } from "react";
import { sectors } from "@/data/sectors";
import SectorMap from "@/components/SectorMap";
import { getLiveSectorPlots, getLiveSector1Locations } from "@/data/live-plots";

export default async function SectorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = sectors.find((s) => s.id === Number(id));
  if (!sector) notFound();

  const [livePlots, liveLocations] = await Promise.all([
    sector.id === 2 || sector.id === 3 ? getLiveSectorPlots(sector.id) : Promise.resolve([]),
    sector.id === 1 ? getLiveSector1Locations() : Promise.resolve([]),
  ]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--bg)]">
      <Suspense fallback={null}>
        <SectorMap
          key={sector.id}
          sector={sector}
          initialPlots={livePlots}
          initialLocations={liveLocations}
        />
      </Suspense>
    </main>
  );
}