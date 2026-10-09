"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  code: number;
}

const LAT = 41.92;
const LON = 44.42;
const LOCATION_KA = "ბორტა, კასპი";

function weatherDescription(code: number): string {
  if (code === 0) return "მზიანი";
  if (code <= 3) return "ნაწილობრივ მოღრუბლული";
  if (code <= 48) return "ნისლი";
  if (code <= 57) return "ჟინჟღლი";
  if (code <= 67) return "წვიმა";
  if (code <= 77) return "თოვლი";
  if (code <= 82) return "ძლიერი წვიმა";
  if (code <= 86) return "თოვლის შხაპი";
  if (code >= 95) return "ჭექა-ქუხილი";
  return "—";
}

function weatherIcon(code: number): string {
  if (code === 0) return "☀";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫";
  if (code <= 67) return "🌧";
  if (code <= 77) return "❄";
  if (code >= 95) return "⛈";
  return "☀";
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=auto`
    )
      .then((r) => r.json())
      .then((json) => {
        setData({
          temp: Math.round(json.current.temperature_2m),
          code: json.current.weather_code,
        });
      })
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 rounded-full
                      border border-[var(--gold)]/30 bg-black/40 backdrop-blur
                      text-xs text-[var(--fg)]/60">
        <span className="w-2 h-2 rounded-full bg-[var(--gold)]/40 animate-pulse" />
        <span>იტვირთება...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 px-5 py-2.5 rounded-full
                    border border-[var(--gold)]/40 bg-black/50 backdrop-blur-xl
                    shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]">
      <span className="text-xl">{weatherIcon(data.code)}</span>
      <div className="flex items-baseline gap-2">
        <span className="font-serif-display text-2xl text-[var(--gold-soft)]">
          {data.temp}°
        </span>
        <span className="text-xs text-[var(--fg)]/80">
          {weatherDescription(data.code)}
        </span>
      </div>
      <span className="w-px h-5 bg-[var(--gold)]/30" />
      <span className="text-xs text-[var(--fg)]/60 whitespace-nowrap">
        {LOCATION_KA}
      </span>
    </div>
  );
}