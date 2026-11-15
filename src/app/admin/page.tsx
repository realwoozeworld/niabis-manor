import { checkAdminAuth } from "./actions";
import { getLiveSectorPlots, getLiveSector1Locations } from "@/data/live-plots";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    return <AdminClient isAuthenticated={false} sector1={[]} sector2={[]} sector3={[]} />;
  }

  const [sector1, sector2, sector3] = await Promise.all([
    getLiveSector1Locations(),
    getLiveSectorPlots(2),
    getLiveSectorPlots(3),
  ]);

  return (
    <AdminClient
      isAuthenticated={true}
      sector1={sector1}
      sector2={sector2}
      sector3={sector3}
    />
  );
}