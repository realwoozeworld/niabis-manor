"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { sector2Plots } from "@/data/sector2-plots";
import { sector3Plots } from "@/data/sector3-plots";
import { sector1Locations } from "@/data/sector1-locations";

const COOKIE_NAME = "niabi_admin_auth";
const ALLOWED_STATUSES = ["available", "reserved", "sold"] as const;

// მარტივი Brute-force დაცვა სერვერის მეხსიერებაში
let failedAttempts = 0;
let lockUntil = 0;

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated";
}

export async function loginAdmin(password: string) {
  const now = Date.now();
  if (now < lockUntil) {
    const minsLeft = Math.ceil((lockUntil - now) / 60000);
    return { success: false, error: `ბევრი არასწორი ცდა. სცადეთ ${minsLeft} წუთში.` };
  }

  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminPass || password !== adminPass) {
    failedAttempts += 1;
    if (failedAttempts >= 5) {
      lockUntil = now + 15 * 60 * 1000; // 15 წუთი ბლოკი
      failedAttempts = 0;
      return { success: false, error: "5 არასწორი ცდა. შესვლა დაიბლოკა 15 წუთით." };
    }
    return { success: false, error: `პაროლი არასწორია (დარჩენილია ${5 - failedAttempts} ცდა)` };
  }

  failedAttempts = 0;
  lockUntil = 0;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function seedInitialData() {
  if (!(await checkAdminAuth())) throw new Error("Unauthorized");

  const allPlots = [
    ...sector2Plots.map((p) => ({
      sector_id: 2,
      id: p.id,
      status: p.status,
      owner_ka: p.ownerKa || "",
      owner_en: p.ownerEn || "",
      area_sqm: p.areaSqm || null,
      price: (p as { price?: number }).price || null,
      planted: p.planted?.trim() || "",
      is_watered: p.isWatered ?? false,
    })),
    ...sector3Plots.map((p) => ({
      sector_id: 3,
      id: p.id,
      status: p.status,
      owner_ka: p.ownerKa || "",
      owner_en: p.ownerEn || "",
      area_sqm: p.areaSqm || null,
      price: (p as { price?: number }).price || null,
      planted: p.planted?.trim() || "",
      is_watered: p.isWatered ?? false,
    })),
  ];

  await supabaseAdmin.from("plots").upsert(allPlots, { onConflict: "sector_id,id" });

  const allLocations = sector1Locations.map((l) => ({
    id: l.id,
    name_ka: l.nameKa,
    name_en: l.nameEn,
    description_ka: l.descriptionKa || "",
    description_en: l.descriptionEn || "",
    features: l.features || [],
  }));

  await supabaseAdmin.from("locations").upsert(allLocations, { onConflict: "id" });

  revalidatePath("/sector/1");
  revalidatePath("/sector/2");
  revalidatePath("/sector/3");
  revalidatePath("/admin");
}

export async function updatePlot(payload: {
  sector_id: number;
  id: string;
  status: "available" | "reserved" | "sold";
  owner_ka: string;
  owner_en: string;
  area_sqm: number | null;
  price: number | null;
  planted: string;
  is_watered: boolean;
}) {
  if (!(await checkAdminAuth())) throw new Error("Unauthorized");

  // ვალიდაცია
  if (![2, 3].includes(payload.sector_id)) throw new Error("Invalid sector");
  if (!ALLOWED_STATUSES.includes(payload.status)) throw new Error("Invalid status");
  if (payload.area_sqm !== null && (isNaN(payload.area_sqm) || payload.area_sqm < 0)) {
    throw new Error("Invalid area");
  }
  if (payload.price !== null && (isNaN(payload.price) || payload.price < 0)) {
    throw new Error("Invalid price");
  }

  const cleanData = {
    sector_id: payload.sector_id,
    id: String(payload.id).trim().slice(0, 30),
    status: payload.status,
    owner_ka: String(payload.owner_ka || "").trim().slice(0, 120),
    owner_en: String(payload.owner_en || "").trim().slice(0, 120),
    area_sqm: payload.area_sqm,
    price: payload.price,
    planted: String(payload.planted || "").trim().slice(0, 200),
    is_watered: Boolean(payload.is_watered),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("plots")
    .upsert(cleanData, { onConflict: "sector_id,id" });

  if (error) throw new Error(error.message);

  revalidatePath(`/sector/${payload.sector_id}`);
  revalidatePath("/admin");
}

export async function updateLocation(payload: {
  id: string;
  name_ka: string;
  name_en: string;
  description_ka: string;
  description_en: string;
  features: string[];
}) {
  if (!(await checkAdminAuth())) throw new Error("Unauthorized");

  const cleanData = {
    id: String(payload.id).trim().slice(0, 60),
    name_ka: String(payload.name_ka || "").trim().slice(0, 150),
    name_en: String(payload.name_en || "").trim().slice(0, 150),
    description_ka: String(payload.description_ka || "").trim().slice(0, 1000),
    description_en: String(payload.description_en || "").trim().slice(0, 1000),
    features: Array.isArray(payload.features)
      ? payload.features.map((f) => String(f).trim().slice(0, 100)).filter(Boolean)
      : [],
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("locations")
    .upsert(cleanData, { onConflict: "id" });

  if (error) throw new Error(error.message);

  revalidatePath("/sector/1");
  revalidatePath("/admin");
}