import { notFound } from "next/navigation";
import { Suspense } from "react";
import { sectors } from "@/data/sectors";
import SectorMap from "@/components/SectorMap";

export default async function SectorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = sectors.find((s) => s.id === Number(id));
  if (!sector) notFound();

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--bg)]">
      <Suspense fallback={null}>
        <SectorMap key={sector.id} sector={sector} />
      </Suspense>
    </main>
  );
}