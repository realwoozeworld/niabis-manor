export type SectorStatus = "showcase" | "register";

export interface Sector {
  id: 1 | 2 | 3 | 4;
  nameKa: string;
  nameEn: string;
  subtitleKa: string;
  subtitleEn: string;
  status: SectorStatus;
  image: string;
  mobileImage?: string;
}

export const sectors: Sector[] = [
  {
    id: 1,
    nameKa: "1 სექტორი",
    nameEn: "Sector 1",
    subtitleKa: "მასპინძლობის სექტორი",
    subtitleEn: "Hospitality sector",
    status: "showcase",
    image: "/images/sector-1.jpg",
    mobileImage: "/images/sector-1-mobile.jpg",
  },
  {
    id: 2,
    nameKa: "2 სექტორი",
    nameEn: "Sector 2",
    subtitleKa: "საცხოვრებელი ნაკვეთები",
    subtitleEn: "Residential plots",
    status: "showcase",
    image: "/images/sector-2.jpg",
  },
  {
    id: 3,
    nameKa: "3 სექტორი",
    nameEn: "Sector 3",
    subtitleKa: "აგრო / სათბურები",
    subtitleEn: "Agri / greenhouses",
    status: "register",
    image: "/images/sector-3.jpg",
  },
  {
    id: 4,
    nameKa: "4 სექტორი",
    nameEn: "Sector 4",
    subtitleKa: "ბაღები და ფერმა",
    subtitleEn: "Orchards & farm",
    status: "register",
    image: "/images/sector-4.jpg",
  },
];