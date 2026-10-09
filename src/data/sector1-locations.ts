export type LocationCategory =
  | "agriculture"
  | "wellness"
  | "production"
  | "culture";

export interface LocationPoint {
  x: number;
  y: number;
}

export interface Location {
  id: string;
  nameKa: string;
  nameEn: string;
  category: LocationCategory;
  points: LocationPoint[];
  labelX?: number;
  labelY?: number;
}

export const sector1Locations: Location[] = [
  {
    id: "cold-storage",
    nameKa: "სამაცივრე სივრცე",
    nameEn: "Cold storage",
    category: "production",
    points: [{ x: 319, y: 375 }],
  },
  {
    id: "canning",
    nameKa: "საკონსერვე საწარმო",
    nameEn: "Canning production",
    category: "production",
    points: [{ x: 212, y: 510 }],
  },
  {
    id: "orchards",
    nameKa: "ხეხილის ბაღები",
    nameEn: "Fruit orchards",
    category: "agriculture",
    points: [
      { x: 434, y: 498 },
      { x: 672, y: 742 },
      { x: 864, y: 913 },
    ],
  },
    {
    id: "greenhouses",
    nameKa: "სათბური ორანჟერია",
    nameEn: "Greenhouse orangery",
    category: "agriculture",
    points: [
      { x: 630, y: 649 },
      { x: 790, y: 823 },
      { x: 963, y: 1010 },
    ],
  },
  {
    id: "rose-garden",
    nameKa: "ვარდების ბაღი ბოსტანი",
    nameEn: "Rose garden",
    category: "agriculture",
    points: [{ x: 1072, y: 1079 }],
  },
  {
    id: "open-garden",
    nameKa: "ღია ბოსტანი",
    nameEn: "Open garden",
    category: "agriculture",
    points: [
      { x: 1222, y: 1312 },
      { x: 1460, y: 1311 },
    ],
  },
  {
    id: "cottages",
    nameKa: "კოტეჯები",
    nameEn: "Cottages",
    category: "wellness",
    points: [{ x: 1846, y: 1260 }],
  },
  {
    id: "spa",
    nameKa: "სპა ცენტრი",
    nameEn: "Spa center",
    category: "wellness",
    points: [{ x: 2012, y: 1100 }],
  },
  {
    id: "pool",
    nameKa: "საცურაო აუზი 4 სეზონი",
    nameEn: "4-season pool",
    category: "wellness",
    points: [{ x: 2097, y: 1136 }],
  },
  {
    id: "dining",
    nameKa: "სასადილო",
    nameEn: "Dining",
    category: "wellness",
    points: [{ x: 2210, y: 1130 }],
  },
  {
    id: "lake",
    nameKa: "ხელოვნური ტბა",
    nameEn: "Artificial lake",
    category: "wellness",
    points: [{ x: 2339, y: 1100 }],
  },
  {
    id: "shops",
    nameKa: "მაღაზიები ადგილობრივი ნაწარმის",
    nameEn: "Local products shops",
    category: "production",
    points: [{ x: 2320, y: 1210 }],
  },
  {
    id: "events",
    nameKa: "ღონისძიებების სივრცე",
    nameEn: "Events space",
    category: "culture",
    points: [{ x: 2120, y: 1230 }],
  },
];

export const categoryColors: Record<LocationCategory, string> = {
  agriculture: "rgba(140, 180, 90, 0.95)",
  wellness:    "rgba(120, 190, 220, 0.95)",
  production:  "rgba(212, 178, 86, 0.95)",
  culture:     "rgba(220, 140, 120, 0.95)",
};