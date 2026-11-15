"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { sector2Plots } from "@/data/sector2-plots";
import { sector3Plots } from "@/data/sector3-plots";
import { sector1Locations } from "@/data/sector1-locations";

const COOKIE_NAME = "niabi_admin_auth";

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated";
}

export async function loginAdmin(password: string) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "პაროლი არასწორია" };
  }
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 დღე
    path: "/",
  });
  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ერთჯერადად გადაიტანს არსებულ ფაილებს Supabase-ში
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

  const { error } = await supabaseAdmin
    .from("plots")
    .upsert({ ...payload, updated_at: new Date().toISOString() }, { onConflict: "sector_id,id" });

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

  const { error } = await supabaseAdmin
    .from("locations")
    .upsert({ ...payload, updated_at: new Date().toISOString() }, { onConflict: "id" });

  if (error) throw new Error(error.message);

  revalidatePath("/sector/1");
  revalidatePath("/admin");
}