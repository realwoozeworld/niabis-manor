"use client";

import { useState } from "react";
import type { Location } from "@/data/sector1-locations";

export default function LocationExperience({ location }: { location: Location }) {
  if (location.id === "cottages") {
    return <CottagesExperience />;
  }
  if (location.id === "spa") {
    return <SpaExperience />;
  }
  if (location.id === "pool") {
    return <PoolExperience />;
  }
  if (location.id === "dining") {
    return <DiningExperience />;
  }
  if (location.id === "shops") {
    return <ShopsExperience />;
  }
  if (location.id === "events") {
    return <EventsExperience />;
  }

  return null;
}

/* =========================================================================
   1. 🏡 COTTAGES EXPERIENCE
   ========================================================================= */
function CottagesExperience() {
  const [viewTime, setViewTime] = useState<"day" | "night">("day");
  const [addons, setAddons] = useState<Record<string, boolean>>({
    wine: true,
    cheese: false,
    fireplace: true,
  });

  const toggleAddon = (key: string) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addonPrices: Record<string, number> = {
    wine: 65,
    cheese: 40,
    fireplace: 0,
  };

  const totalExtra = Object.entries(addons).reduce(
    (sum, [k, v]) => sum + (v ? addonPrices[k] : 0),
    0
  );

  return (
    <div className="space-y-4 pt-3 border-t border-[var(--gold)]/20 text-xs">
      {/* Amenities Tags */}
      <div>
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider mb-2 font-semibold">
          კომფორტი & აღჭურვილობა
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["ქვის ბუხარი", "ხედი ვენახზე", "King Bed", "ღვინის კარადა", "Wi-Fi 100 Mbps", "Pet-Friendly"].map(
            (item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-[#1c261e] border border-[#2d3b31] text-[var(--fg)]/80 text-[11px]"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      {/* View Switcher */}
      <div className="p-3 rounded-xl bg-black/40 border border-[#2d3b31]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[var(--gold)]/80 uppercase tracking-wider">
            ატმოსფერო
          </span>
          <div className="flex bg-[#1c261e] p-0.5 rounded-lg border border-[#2d3b31]">
            <button
              type="button"
              onClick={() => setViewTime("day")}
              className={`px-2.5 py-0.5 rounded-md text-[10px] transition ${
                viewTime === "day" ? "bg-[var(--gold)] text-black font-semibold" : "text-[var(--fg)]/60"
              }`}
            >
              ☀️ დღე
            </button>
            <button
              type="button"
              onClick={() => setViewTime("night")}
              className={`px-2.5 py-0.5 rounded-md text-[10px] transition ${
                viewTime === "night" ? "bg-[var(--gold)] text-black font-semibold" : "text-[var(--fg)]/60"
              }`}
            >
              🌙 ღამე
            </button>
          </div>
        </div>
        <p className="text-[11px] text-[var(--fg)]/70 italic leading-relaxed">
          {viewTime === "day"
            ? "მზით განათებული ტერასა საფერავის ვენახების პანორამული ხედით და ჩიტების გალობით."
            : "დამამშვიდებელი ბუხრის ტკაცუნი, ცის ვარსკვლავები და მამულის ღვინო მყუდრო საღამოსთვის."}
        </p>
      </div>

      {/* Pre-Arrival Concierge */}
      <div className="space-y-2">
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-semibold">
          დახვედრის სერვისი (Pre-Arrival)
        </p>
        <div className="space-y-1.5">
          {[
            { id: "wine", label: "🍾 საფერავი რეზერვი 2022 ბოთლი ყინულზე", price: "65 ₾" },
            { id: "cheese", label: "🧀 მამულის ყველის დაფა & თაფლი", price: "40 ₾" },
            { id: "fireplace", label: "🔥 ბუხრის წინასწარ დანთება", price: "უფასო" },
          ].map((addon) => (
            <label
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition ${
                addons[addon.id]
                  ? "bg-[var(--gold)]/10 border-[var(--gold)]/40 text-[var(--gold-soft)]"
                  : "bg-black/30 border-[#2d3b31] text-[var(--fg)]/60"
              }`}
            >
              <span className="text-[11px] select-none">{addon.label}</span>
              <span className="text-[10px] font-semibold select-none">{addon.price}</span>
            </label>
          ))}
        </div>
        {totalExtra > 0 && (
          <p className="text-right text-[11px] text-[var(--gold)] font-medium">
            დამატებითი სერვისი: +{totalExtra} ₾
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   2. 🌿 SPA EXPERIENCE
   ========================================================================= */
function SpaExperience() {
  const [selectedRitual, setSelectedRitual] = useState<number>(0);

  const rituals = [
    {
      id: 0,
      title: "🍇 საფერავის ღვინოთერაპია & სკრაბი",
      duration: "75 წთ",
      benefits: "ანტიოქსიდანტური დეტოქსი, კანის განახლება",
      details: "ყურძნის წიპწის ექსფოლიაცია, საფერავის თბილი ექსტრაქტის აბაზანა და ზეთით მასაჟი.",
      price: "180 ₾",
    },
    {
      id: 1,
      title: "🌹 ვარდების ბაღის არომათერაპია",
      duration: "60 წთ",
      benefits: "ღრმა მოდუნება, სტრესის მოხსნა",
      details: "სექტორი 1-ის ბაღში მოკრეფილი ეთერზეთებით დამამშვიდებელი სრული სხეულის მასაჟი.",
      price: "150 ₾",
    },
    {
      id: 2,
      title: "♨️ მინერალური ჰამამი & საუნა",
      duration: "50 წთ",
      benefits: "კუნთების რელაქსაცია, იმუნიტეტი",
      details: "ქვის ორთქლის ოთახი ბუნებრივი მინერალური წყაროს წყლით და მუხის ცოცხით.",
      price: "120 ₾",
    },
  ];

  return (
    <div className="space-y-4 pt-3 border-t border-[var(--gold)]/20 text-xs">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-semibold">
          რიტუალები & ღვინოთერაპია
        </p>
        <span className="text-[10px] text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/30">
          💧 თერმული წყალი
        </span>
      </div>

      <div className="space-y-2">
        {rituals.map((r) => {
          const isSelected = selectedRitual === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setSelectedRitual(r.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#1c261e] border-[var(--gold)] shadow-[0_4px_20px_rgba(212,178,86,0.15)]"
                  : "bg-black/30 border-[#2d3b31] hover:border-[#3d4f43]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-serif-display text-[13px] text-[var(--gold-soft)] font-medium">
                  {r.title}
                </h4>
                <span className="text-[11px] font-bold text-[var(--gold)] shrink-0">
                  {r.price}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 mb-1.5 text-[10px] text-[var(--fg)]/60">
                <span>⏱ {r.duration}</span>
                <span>•</span>
                <span className="text-emerald-400/90">{r.benefits}</span>
              </div>
              {isSelected && (
                <p className="text-[11px] text-[var(--fg)]/80 mt-2 pt-2 border-t border-[#2d3b31] italic leading-relaxed">
                  {r.details}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   3. 🏊 4-SEASON POOL EXPERIENCE
   ========================================================================= */
function PoolExperience() {
  return (
    <div className="space-y-3.5 pt-3 border-t border-[var(--gold)]/20 text-xs">
      {/* Live Temperature & Vibe Badges */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center gap-2">
          <span className="text-xl">🌡️</span>
          <div>
            <p className="text-[9px] text-blue-300/80 uppercase font-bold">წყლის ტემპერატურა</p>
            <p className="font-serif-display text-lg text-blue-200 font-bold leading-none mt-0.5">
              32°C თბილი
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#1c261e] border border-[#2d3b31] flex items-center gap-2">
          <span className="text-xl">✨</span>
          <div>
            <p className="text-[9px] text-[var(--gold)] uppercase font-bold">კონფიდენციალურობა</p>
            <p className="font-serif-display text-sm text-[var(--gold-soft)] font-bold leading-none mt-0.5">
              Max 15 სტუმარი
            </p>
          </div>
        </div>
      </div>

      {/* Daily Experience Schedule */}
      <div>
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider mb-2 font-semibold">
          დღის ატმოსფერო
        </p>
        <div className="space-y-1.5 text-[11px]">
          {[
            { time: "08:00 – 11:00", title: "🌅 დილის ენერგია & ცურვა", desc: "მშვიდი მუსიკა და სუფთა მთის ჰაერი" },
            { time: "12:00 – 18:00", title: "☀️ Pool Lounge & შეზლონგები", desc: "მზის აბაზანები, ცივი წვენები და კოქტეილები" },
            { time: "18:00 – 22:00", title: "🍷 Sunset & Night Swim", desc: "წყალქვეშა განათება, ვენახის ხედი მზის ჩასვლისას" },
          ].map((item, i) => (
            <div key={i} className="p-2 rounded-lg bg-black/40 border border-[#2d3b31] flex items-start gap-2.5">
              <span className="text-[10px] text-[var(--gold)] font-mono shrink-0 mt-0.5">
                {item.time}
              </span>
              <div>
                <p className="font-medium text-[var(--fg)]/90">{item.title}</p>
                <p className="text-[10px] text-[var(--fg)]/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. 🍽️ DINING & SOMMELIER PAIRING
   ========================================================================= */
function DiningExperience() {
  const [selectedDish, setSelectedDish] = useState(0);

  const pairings = [
    {
      dish: "🍖 ხბოს ნეკნები ქვის ღუმელში",
      origin: "ადგილობრივი ფერმა, გამომცხვარი ალუბლის შეშით",
      wine: "🍷 საფერავი რეზერვი 2022",
      notes: "მუხის კასრში დაძველებული, შავი მოცვისა და სანელებლების არომატით.",
    },
    {
      dish: "🐟 ტბის კალმახი ბოსტნის მწვანილით",
      origin: "მამულის ტბიდან, ორანჟერიის ტარხუნითა და ლიმონით",
      wine: "🥂 რქაწითელი ქვევრი 2023",
      notes: "ქარვისფერი, ხავერდოვანი ტანინებითა და თეთრი ბლის ტონებით.",
    },
    {
      dish: "🧀 ყველის ასორტი & ლეღვის ჯემი",
      origin: "საკონსერვო საწარმოს ჯემი, მამულის თაფლი",
      wine: "🍾 ქისი ამბერი 2023",
      notes: "მინდვრის ყვავილებისა და გამომშრალი ხილის მდიდარი ბუკეტი.",
    },
  ];

  return (
    <div className="space-y-3.5 pt-3 border-t border-[var(--gold)]/20 text-xs">
      {/* Farm-to-Table Badge */}
      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-2">
        <span className="text-lg">🌿</span>
        <div>
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Zero-Kilometer Farm to Table</p>
          <p className="text-[10px] text-[var(--fg)]/70">
            ინგრედიენტები მოდის პირდაპირ სექტორი 1-ის ბაღებიდან, სათბურიდან და საკონსერვოდან.
          </p>
        </div>
      </div>

      {/* Sommelier Pairing */}
      <div>
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider mb-2 font-semibold">
          სომელიეს შეხამება (Wine Pairing)
        </p>
        <div className="space-y-1.5">
          {pairings.map((p, i) => {
            const isSelected = selectedDish === i;
            return (
              <div
                key={i}
                onClick={() => setSelectedDish(i)}
                className={`p-2.5 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? "bg-[#1c261e] border-[var(--gold)] shadow-md"
                    : "bg-black/30 border-[#2d3b31] hover:border-[#3d4f43]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--gold-soft)] text-[12px]">
                    {p.dish}
                  </span>
                  <span className="text-[10px] text-[var(--gold)] font-bold">
                    {p.wine.split(" ")[0]}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--fg)]/50 mt-0.5">{p.origin}</p>
                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-[#2d3b31] space-y-1">
                    <p className="text-[11px] text-[var(--gold)] font-medium">
                      რეკომენდებული ღვინო: {p.wine}
                    </p>
                    <p className="text-[10px] text-[var(--fg)]/75 italic">{p.notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. 🍯 ESTATE SHOP & TASTING BOX CUSTOMIZER
   ========================================================================= */
function ShopsExperience() {
  const [wine, setWine] = useState("საფერავი რეზერვი");
  const [honey, setHoney] = useState("მინდვრის თაფლი");
  const [jam, setJam] = useState("ლეღვის ჯემი");
  const [copied, setCopied] = useState(false);

  const priceMap: Record<string, number> = {
    "საფერავი რეზერვი": 65,
    "რქაწითელი ქვევრი": 45,
    "ქისი ამბერი": 55,
    "მინდვრის თაფლი": 25,
    "მაისის თაფლი": 30,
    "ლეღვის ჯემი": 18,
    "ატმის მურაბა": 15,
  };

  const totalPrice = 40 + (priceMap[wine] || 0) + (priceMap[honey] || 0) + (priceMap[jam] || 0); // 40 box

  const handleOrder = () => {
    const text = `გამარჯობა, მსურს ნიაბის მამულის სასაჩუქრე ყუთის შეკვეთა: ${wine}, ${honey}, ${jam} (${totalPrice} ₾).`;
    window.open(`https://wa.me/995598211275?text=${encodeURIComponent(text)}`, "_blank");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3.5 pt-3 border-t border-[var(--gold)]/20 text-xs">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-semibold">
          🎁 სასაჩუქრე ყუთის აწყობა (Custom Box)
        </p>
        <span className="text-[10px] text-amber-300 font-mono font-bold">
          {totalPrice} ₾
        </span>
      </div>

      <div className="space-y-2">
        {/* Wine selector */}
        <div>
          <label className="text-[10px] text-[var(--fg)]/60 block mb-1">🍷 ღვინის არჩევა:</label>
          <div className="grid grid-cols-3 gap-1">
            {["საფერავი რეზერვი", "რქაწითელი ქვევრი", "ქისი ამბერი"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setWine(item)}
                className={`py-1.5 px-1 rounded-lg text-[10px] border truncate transition ${
                  wine === item
                    ? "bg-[var(--gold)] text-black font-semibold border-[var(--gold)]"
                    : "bg-black/40 text-[var(--fg)]/70 border-[#2d3b31]"
                }`}
              >
                {item.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Honey selector */}
        <div>
          <label className="text-[10px] text-[var(--fg)]/60 block mb-1">🍯 თაფლის არჩევა:</label>
          <div className="grid grid-cols-2 gap-1">
            {["მინდვრის თაფლი", "მაისის თაფლი"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setHoney(item)}
                className={`py-1.5 px-2 rounded-lg text-[10px] border truncate transition ${
                  honey === item
                    ? "bg-[var(--gold)] text-black font-semibold border-[var(--gold)]"
                    : "bg-black/40 text-[var(--fg)]/70 border-[#2d3b31]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Jam selector */}
        <div>
          <label className="text-[10px] text-[var(--fg)]/60 block mb-1">🍓 ჯემი / მურაბა:</label>
          <div className="grid grid-cols-2 gap-1">
            {["ლეღვის ჯემი", "ატმის მურაბა"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setJam(item)}
                className={`py-1.5 px-2 rounded-lg text-[10px] border truncate transition ${
                  jam === item
                    ? "bg-[var(--gold)] text-black font-semibold border-[var(--gold)]"
                    : "bg-black/40 text-[var(--fg)]/70 border-[#2d3b31]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOrder}
        className="w-full py-2.5 rounded-xl bg-[var(--gold)] text-black font-semibold text-xs hover:bg-[var(--gold-soft)] active:scale-[0.98] transition flex items-center justify-center gap-1.5 shadow-lg"
      >
        <span>{copied ? "გადავდივართ WhatsApp-ში..." : "ყუთის შეკვეთა WhatsApp-ით"}</span>
        <span>→</span>
      </button>
    </div>
  );
}

/* =========================================================================
   6. 🎪 EVENTS & MASTERCLASSES
   ========================================================================= */
function EventsExperience() {
  const [tab, setTab] = useState<"wedding" | "retreat" | "masterclass">("wedding");

  return (
    <div className="space-y-3.5 pt-3 border-t border-[var(--gold)]/20 text-xs">
      {/* Category Tabs */}
      <div className="flex bg-[#1c261e] p-1 rounded-xl border border-[#2d3b31]">
        {[
          { key: "wedding", label: "👰 ქორწილები" },
          { key: "masterclass", label: "🍇 რთველი" },
          { key: "retreat", label: "💼 Retreat" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key as any)}
            className={`flex-1 py-1.5 rounded-lg text-[10.5px] transition ${
              tab === t.key
                ? "bg-[var(--gold)] text-black font-semibold shadow-sm"
                : "text-[var(--fg)]/60 hover:text-[var(--fg)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-3 rounded-xl bg-black/40 border border-[#2d3b31] space-y-2">
        {tab === "wedding" && (
          <>
            <div className="flex justify-between items-center text-[var(--gold-soft)] font-medium">
              <span>ღია ცის ქვეშ ქორწილი</span>
              <span className="text-[10px] text-emerald-400">150 სტუმარი</span>
            </div>
            <p className="text-[11px] text-[var(--fg)]/75 leading-relaxed">
              პანორამული სივრცე ვენახების ფონზე, ტრადიციული ქვის სამზარეულო, საღამოს სანთლების დეკორაცია და ფოტოსესია.
            </p>
          </>
        )}

        {tab === "masterclass" && (
          <>
            <div className="flex justify-between items-center text-[var(--gold-soft)] font-medium">
              <span>ღვინის დაწურვა & ჩურჩხელა</span>
              <span className="text-[10px] text-emerald-400">ყოველ შაბათ-კვირას</span>
            </div>
            <p className="text-[11px] text-[var(--fg)]/75 leading-relaxed">
              ყურძნის კრეფა, საწნახელში დაწურვა, თათარის მოდუღება და ჩურჩხელის ამოვლება. ცხელი თონის პურის ცხობა.
            </p>
          </>
        )}

        {tab === "retreat" && (
          <>
            <div className="flex justify-between items-center text-[var(--gold-soft)] font-medium">
              <span>კორპორატიული & გუნდური დასვენება</span>
              <span className="text-[10px] text-emerald-400">30 – 100 პერსონა</span>
            </div>
            <p className="text-[11px] text-[var(--fg)]/75 leading-relaxed">
              სრული იზოლაცია ბუნებაში, ღვინის დეგუსტაცია სომელიესთან, სპა და აუზი გუნდის განტვირთვისთვის.
            </p>
          </>
        )}
      </div>

      {/* Action Inquiry */}
      <a
        href="https://wa.me/995598211275?text=%E1%83%92%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%AF%E1%83%9D%E1%83%91%E1%83%90%2C%20%E1%83%9B%E1%83%A1%E1%83%A3%E1%83%A0%E1%83%A1%20%E1%83%A6%E1%83%9D%E1%83%9C%E1%83%98%E1%83%A1%E1%83%AB%E1%83%98%E1%83%94%E1%83%91%E1%83%98%E1%83%A1%20%E1%83%9B%E1%83%9D%E1%83%AC%E1%83%A7%E1%83%9D%E1%83%91%E1%83%98%E1%83%A1%20%E1%83%9E%E1%83%98%E1%83%A0%E1%83%9D%E1%83%91%E1%83%94%E1%83%91%E1%83%98%E1%83%A1%20%E1%83%92%E1%83%90%E1%83%92%E1%83%94%E1%83%91%E1%83%90"
        target="_blank"
        rel="noreferrer"
        className="w-full py-2.5 rounded-xl bg-[var(--gold)] text-black font-semibold text-xs hover:bg-[var(--gold-soft)] active:scale-[0.98] transition flex items-center justify-center gap-1.5 shadow-lg"
      >
        <span>ღონისძიების დაგეგმვა / კონსულტაცია</span>
        <span>→</span>
      </a>
    </div>
  );
}
