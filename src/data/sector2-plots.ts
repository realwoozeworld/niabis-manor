export interface Plot {
  id: string;
  ownerKa?: string;
  ownerEn?: string;
  areaSqm?: number;
  status: "sold" | "available" | "reserved";
  x?: number;
  y?: number;
  polygon?: Array<{ x: number; y: number }>;
  image?: string;
  planted?: string;
  isWatered?: boolean;
}

const houseImages = [
  "/images/houses/house1.jpg",
  "/images/houses/house2.jpg",
  "/images/houses/house3.jpg",
];

const rawSector2Plots: Plot[] = [
  { id: "N-1",  ownerKa: "ვერონიკა ბეჟანიშვილი", ownerEn: "Veronika Bezhanishvili",  areaSqm: 2058.9, status: "sold", x: 2294, y: 713, planted: "საფერავის ვენახი", isWatered: true },
  { id: "N-2",  ownerKa: "მზევინარი ბერიძე", ownerEn: "Mzevinari Beridze",  areaSqm: 2027.7, status: "sold", x: 1815, y: 794, planted: "რქაწითელი & ხეხილი", isWatered: true },
  { id: "N-3",  ownerKa: "გიო უმეკაშვილი", ownerEn: "Gio Umekashvili",  areaSqm: 1001,   status: "sold", x: 1412, y: 842, planted: "ზეთისხილის ბაღი", isWatered: false },
  { id: "N-4",  ownerKa: "ჟეთო ჯოხიძე",      ownerEn: "Zheto Jokhidze", areaSqm: 1000,   status: "sold", x: 1150, y: 880, planted: "საფერავი", isWatered: true },
  { id: "N-5",  ownerKa: "ნათია ჭუმბაძე",    ownerEn: "Natia Chumbadze", areaSqm: 1000.3, status: "sold", x: 870,  y: 913, planted: " ", isWatered: true  },
  { id: "N-6",  ownerKa: "ქეთი უმეკაშვილი", ownerEn: "Qeti Umekashvili", areaSqm: 1002,   status: "sold", x: 600,  y: 937, planted: " ", isWatered: true  },
  { id: "N-7",  ownerKa: "ოთარ ქავთარაძე",   ownerEn: "Otar Kavtaradze", areaSqm: 1021,   status: "sold", x: 315,  y: 960, planted: " ", isWatered: true  },
  { id: "N-8",  ownerKa: "ნინო კაპანაძე",    ownerEn: "Nino Kapanadze", areaSqm: 2261.6, status: "sold", x: 640,  y: 480, planted: " ", isWatered: true  },
  { id: "N-9",  ownerKa: "ლევანი / სანდრო",  ownerEn: "Levan / Sandro", areaSqm: 2215.4, status: "sold", x: 970,  y: 390, planted: " ", isWatered: true  },
  { id: "N-10", ownerKa: "დათო ბარსეგიანი",  ownerEn: "Dato Barsegian", areaSqm: 2115,   status: "sold", x: 1240, y: 401, planted: " ", isWatered: true  },
  { id: "N-11", ownerKa: "გიორგი ანთაძე",    ownerEn: "Giorgi Antadze", areaSqm: 1101,   status: "sold",  x: 1510, y: 490, planted: " ", isWatered: true  },
  { id: "N-12", ownerKa: "პაატა მაღლაკელიძე", ownerEn: "Paata Maghlakelidze", areaSqm: 1101,   status: "sold", x: 1617, y: 259, planted: " ", isWatered: true  },
  { id: "N-13", ownerKa: "ლევანი ცინცაძე",   ownerEn: "Levan Tsintsadze", areaSqm: 1014.6, status: "sold", x: 1937, y: 313, planted: "", isWatered: true  },
  { id: "N-14", ownerKa: "თორნიკე თაბორიძე", ownerEn: "Tornike Taboridze", areaSqm: 1011.7, status: "sold", x: 2171, y: 346, planted: "", isWatered: true  },
  { id: "N-15", ownerKa: "ლაშა ანძაველიძე",   ownerEn: "Lasha Andzavelidze", areaSqm: 1005.7, status: "sold", x: 2366, y: 356, planted: "", isWatered: true  },
  { id: "N-16", ownerKa: "ლაშა ანძაველიძე",   ownerEn: "Lasha Andzavelidze", areaSqm: 1005.2, status: "sold", x: 2585, y: 373, planted: "", isWatered: true  },
];

export const sector2Plots: Plot[] = rawSector2Plots.map((plot, i) => ({
  ...plot,
  image: plot.image || houseImages[i % houseImages.length],
}));