"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  code: number;
}

const LAT = 41.92;
const LON = 44.42;
const LOCATION_KA = "ნიაბის მამული";

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

interface WeatherWidgetProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function WeatherWidget({ className = "", size = "md" }: WeatherWidgetProps) {
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
      <div className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full
                      border border-[var(--gold)]/30 bg-black/40 backdrop-blur
                      text-xs text-[var(--fg)]/60 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-[var(--gold)]/40 animate-pulse" />
        <span>იტვირთება...</span>
      </div>
    );
  }

  // Size variations
  if (size === "sm") {
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full
                      border border-[var(--gold)]/40 bg-black/60 backdrop-blur-xl
                      shadow-[0_4px_20px_-5px_rgba(0,0,0,0.6)] ${className}`}>
        <span className="text-sm">{weatherIcon(data.code)}</span>
        <div className="flex items-baseline gap-1">
          <span className="font-serif-display text-base text-[var(--gold-soft)] font-medium">
            {data.temp}°
          </span>
          <span className="text-[11px] text-[var(--fg)]/80 whitespace-nowrap">
            {weatherDescription(data.code)}
          </span>
        </div>
        <span className="w-px h-3 bg-[var(--gold)]/30" />
        <span className="text-[10.5px] text-[var(--fg)]/60 whitespace-nowrap">
          {LOCATION_KA}
        </span>
      </div>
    );
  }

  if (size === "lg") {
    return (
      <div className={`flex items-center gap-4 px-6 py-3 rounded-full
                      border border-[var(--gold)]/45 bg-black/60 backdrop-blur-2xl
                      shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)] ${className}`}>
        <span className="text-2xl">{weatherIcon(data.code)}</span>
        <div className="flex items-baseline gap-2.5">
          <span className="font-serif-display text-3xl text-[var(--gold-soft)]">
            {data.temp}°
          </span>
          <span className="text-sm text-[var(--fg)]/85 whitespace-nowrap">
            {weatherDescription(data.code)}
          </span>
        </div>
        <span className="w-px h-6 bg-[var(--gold)]/35" />
        <span className="text-sm text-[var(--fg)]/70 whitespace-nowrap">
          {LOCATION_KA}
        </span>
      </div>
    );
  }

  // Default "md"
  return (
    <div className={`flex items-center gap-2.5 sm:gap-4 px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full
                    border border-[var(--gold)]/40 bg-black/50 backdrop-blur-xl
                    shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] ${className}`}>
      <span className="text-base sm:text-xl">{weatherIcon(data.code)}</span>
      <div className="flex items-baseline gap-1.5 sm:gap-2">
        <span className="font-serif-display text-lg sm:text-2xl text-[var(--gold-soft)]">
          {data.temp}°
        </span>
        <span className="text-[11px] sm:text-xs text-[var(--fg)]/80 whitespace-nowrap">
          {weatherDescription(data.code)}
        </span>
      </div>
      <span className="w-px h-3.5 sm:h-5 bg-[var(--gold)]/30" />
      <span className="text-[11px] sm:text-xs text-[var(--fg)]/60 whitespace-nowrap">
        {LOCATION_KA}
      </span>
    </div>
  );
}