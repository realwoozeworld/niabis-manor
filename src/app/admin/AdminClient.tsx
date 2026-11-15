"use client";

import { useState } from "react";
import { loginAdmin, logoutAdmin, seedInitialData, updatePlot, updateLocation } from "./actions";
import type { Plot } from "@/data/sector2-plots";
import type { Location } from "@/data/sector1-locations";

interface Props {
  isAuthenticated: boolean;
  sector1: Location[];
  sector2: Plot[];
  sector3: Plot[];
}

export default function AdminClient({ isAuthenticated, sector1, sector2, sector3 }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(3);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e1510] flex items-center justify-center p-4 text-[#f4f4f4]">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await loginAdmin(password);
            if (res.success) window.location.reload();
            else setError(res.error || "შეცდომა");
          }}
          className="w-full max-w-sm bg-[#131a14] border border-[#b8912f]/40 rounded-2xl p-6 space-y-4 shadow-2xl"
        >
          <h1 className="text-xl font-serif text-[#d4b256] text-center">ნიაბის მამული • Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="შეიყვანეთ პაროლი"
            className="w-full px-4 py-2.5 rounded-lg bg-[#0e1510] border border-[#2d3b31] focus:border-[#b8912f] outline-none"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#b8912f] text-black font-semibold hover:bg-[#d4b256] transition"
          >
            შესვლა
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1510] text-[#f4f4f4] p-4 md:p-8">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#b8912f] text-black px-5 py-3 rounded-xl font-semibold shadow-2xl">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d3b31] pb-4">
          <div>
            <h1 className="text-2xl font-serif text-[#d4b256]">ნიაბის მამული • სამართავი პანელი</h1>
            <p className="text-xs text-white/60 mt-1">ცვლილებები საიტზე აისახება შენახვისთანავე</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                setSeeding(true);
                await seedInitialData();
                setSeeding(false);
                showToast("✅ საწყისი მონაცემები აიტვირთა ბაზაში!");
                window.location.reload();
              }}
              disabled={seeding}
              className="px-3.5 py-2 rounded-lg bg-[#1c261e] border border-[#b8912f]/40 text-xs text-[#d4b256] hover:bg-[#b8912f] hover:text-black transition"
            >
              {seeding ? "იტვირთება..." : "📥 ბაზის შევსება ფაილებიდან"}
            </button>
            <button
              onClick={async () => {
                await logoutAdmin();
                window.location.reload();
              }}
              className="px-3.5 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 hover:bg-red-500 hover:text-white transition"
            >
              გასვლა
            </button>
          </div>
        </div>

        {/* Sector Tabs */}
        <div className="flex gap-2">
          {([1, 2, 3] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveTab(sec)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === sec
                  ? "bg-[#b8912f] text-black"
                  : "bg-[#131a14] border border-[#2d3b31] text-white/70 hover:text-white"
              }`}
            >
              სექტორი {sec}
            </button>
          ))}
        </div>

        {/* Sector 1 Locations */}
        {activeTab === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            {sector1.map((loc) => (
              <LocationCard
                key={loc.id}
                loc={loc}
                saving={savingId === loc.id}
                onSave={async (updated) => {
                  setSavingId(loc.id);
                  await updateLocation(updated);
                  setSavingId(null);
                  showToast(`✅ ${loc.nameKa} შენახულია`);
                }}
              />
            ))}
          </div>
        )}

        {/* Sector 2 & 3 Plots */}
        {(activeTab === 2 || activeTab === 3) && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(activeTab === 2 ? sector2 : sector3).map((plot) => (
              <PlotCard
                key={plot.id}
                sectorId={activeTab}
                plot={plot}
                saving={savingId === `${activeTab}-${plot.id}`}
                onSave={async (updated) => {
                  setSavingId(`${activeTab}-${plot.id}`);
                  await updatePlot(updated);
                  setSavingId(null);
                  showToast(`✅ ნაკვეთი ${plot.id} შენახულია`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlotCard({
  sectorId,
  plot,
  saving,
  onSave,
}: {
  sectorId: number;
  plot: Plot & { price?: number };
  saving: boolean;
  onSave: (data: Parameters<typeof updatePlot>[0]) => Promise<void>;
}) {
  const [status, setStatus] = useState<"available" | "reserved" | "sold">(plot.status);
  const [ownerKa, setOwnerKa] = useState(plot.ownerKa || "");
  const [ownerEn, setOwnerEn] = useState(plot.ownerEn || "");
  const [areaSqm, setAreaSqm] = useState(plot.areaSqm?.toString() || "");
  const [price, setPrice] = useState(plot.price?.toString() || "");
  const [planted, setPlanted] = useState(plot.planted?.trim() || "");
  const [isWatered, setIsWatered] = useState(Boolean(plot.isWatered));

  return (
    <div className="bg-[#131a14] border border-[#2d3b31] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg text-[#d4b256] font-bold">{plot.id}</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "available" | "reserved" | "sold")}
          className="px-2.5 py-1 rounded-lg bg-[#0e1510] border border-[#2d3b31] text-xs outline-none"
        >
          <option value="available">🟡 თავისუფალი</option>
          <option value="reserved">🔵 დაჯავშნილი</option>
          <option value="sold">🔴 გაყიდული</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-white/50 block mb-1">ფართობი (მ²)</label>
          <input
            type="number"
            step="0.1"
            value={areaSqm}
            onChange={(e) => setAreaSqm(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
        <div>
          <label className="text-white/50 block mb-1">ფასი ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="მაგ: 45000"
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-white/50 block mb-1">მფლობელი (KA)</label>
          <input
            value={ownerKa}
            onChange={(e) => setOwnerKa(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
        <div>
          <label className="text-white/50 block mb-1">მფლობელი (EN)</label>
          <input
            value={ownerEn}
            onChange={(e) => setOwnerEn(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <div className="flex-1">
          <label className="text-white/50 block mb-1">🌱 ნარგავები</label>
          <input
            value={planted}
            onChange={(e) => setPlanted(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
        <label className="flex items-center gap-1.5 pt-4 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isWatered}
            onChange={(e) => setIsWatered(e.target.checked)}
            className="accent-[#b8912f] w-4 h-4"
          />
          <span>💧 მორწყული</span>
        </label>
      </div>

      <button
        disabled={saving}
        onClick={() =>
          onSave({
            sector_id: sectorId,
            id: plot.id,
            status,
            owner_ka: ownerKa,
            owner_en: ownerEn,
            area_sqm: areaSqm ? Number(areaSqm) : null,
            price: price ? Number(price) : null,
            planted,
            is_watered: isWatered,
          })
        }
        className="w-full py-2 rounded-lg bg-[#b8912f] text-black text-xs font-semibold hover:bg-[#d4b256] transition disabled:opacity-50"
      >
        {saving ? "ინახება..." : "შენახვა"}
      </button>
    </div>
  );
}

function LocationCard({
  loc,
  saving,
  onSave,
}: {
  loc: Location;
  saving: boolean;
  onSave: (data: Parameters<typeof updateLocation>[0]) => Promise<void>;
}) {
  const [nameKa, setNameKa] = useState(loc.nameKa);
  const [nameEn, setNameEn] = useState(loc.nameEn);
  const [descriptionKa, setDescriptionKa] = useState(loc.descriptionKa || "");
  const [descriptionEn, setDescriptionEn] = useState(loc.descriptionEn || "");
  const [featuresText, setFeaturesText] = useState((loc.features || []).join(", "));

  return (
    <div className="bg-[#131a14] border border-[#2d3b31] rounded-2xl p-4 space-y-3 text-xs">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-white/50 block mb-1">სახელი (KA)</label>
          <input
            value={nameKa}
            onChange={(e) => setNameKa(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
        <div>
          <label className="text-white/50 block mb-1">სახელი (EN)</label>
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
          />
        </div>
      </div>

      <div>
        <label className="text-white/50 block mb-1">აღწერა (KA)</label>
        <textarea
          rows={2}
          value={descriptionKa}
          onChange={(e) => setDescriptionKa(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
        />
      </div>

      <div>
        <label className="text-white/50 block mb-1">აღწერა (EN)</label>
        <textarea
          rows={2}
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
        />
      </div>

      <div>
        <label className="text-white/50 block mb-1">სერვისები / მახასიათებლები (მძიმით გამოყოფილი)</label>
        <input
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1510] border border-[#2d3b31]"
        />
      </div>

      <button
        disabled={saving}
        onClick={() =>
          onSave({
            id: loc.id,
            name_ka: nameKa,
            name_en: nameEn,
            description_ka: descriptionKa,
            description_en: descriptionEn,
            features: featuresText
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        className="w-full py-2 rounded-lg bg-[#b8912f] text-black font-semibold hover:bg-[#d4b256] transition disabled:opacity-50"
      >
        {saving ? "ინახება..." : "შენახვა"}
      </button>
    </div>
  );
}