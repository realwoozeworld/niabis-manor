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
  descriptionKa?: string;
  descriptionEn?: string;
  features?: string[];
  image?: string;
  points: LocationPoint[];        // დესკტოპისთვის (ჰორიზონტალური)
  mobilePoints?: LocationPoint[]; // მობილურისთვის (ვერტიკალური)
  labelX?: number;
  labelY?: number;
}

export const sector1Locations: Location[] = [
  {
    id: "cold-storage",
    nameKa: "სამაცივრე სივრცე",
    nameEn: "Cold storage",
    category: "production",
    descriptionKa: "თანამედროვე სამაცივრე სივრცე, სადაც ინახება მოსავალი, ხილი და ბოსტნეული მთელი წლის განმავლობაში.",
    descriptionEn: "Modern cold storage facility for year-round preservation.",
    features: ["მთელი წლის შენახვა", "თანამედროვე მოწყობილობა"],
    image: "/images/sector1/cold-storage.jpg",
    points: [{ x: 319, y: 375 }],
    mobilePoints: [{ x: 65, y: 700 }],
  },
  {
    id: "canning",
    nameKa: "საკონსერვე საწარმო",
    nameEn: "Canning production",
    category: "production",
    descriptionKa: "საკონსერვო წარმოების სივრცე — ბოსტნეულის, ხილის, ჯემებისა და საწებლების დამზადება ტრადიციული ქვის ღუმელით.",
    descriptionEn: "Canning production space — vegetables, fruit, jams and sauces.",
    features: ["ჯემები", "საწებლები", "კონსერვები"],
    image: "/images/sector1/canning.jpg",
    points: [{ x: 212, y: 510 }],
    mobilePoints: [{ x: 18, y: 770 }],
  },
  {
    id: "orchards",
    nameKa: "ხეხილის ბაღები",
    nameEn: "Fruit orchards",
    category: "agriculture",
    descriptionKa: "ხეხილის სამი ბაღი — ვაშლი, მსხალი, ატამი, გარგარი, ქლიავი, ალუბალი.",
    descriptionEn: "Three fruit orchards — apples, pears, peaches, apricots, plums and cherries.",
    features: ["სეზონური ხილი", "ადგილობრივი ჯიშები"],
    image: "/images/sector1/orchards.jpg",
    points: [{ x: 450, y: 580 }, { x: 680, y: 770 }, { x: 870, y: 913 }],
    mobilePoints: [{ x: 117, y: 780 }],
  },
  {
    id: "greenhouses",
    nameKa: "სათბური ორანჟერია",
    nameEn: "Greenhouse orangery",
    category: "agriculture",
    descriptionKa: "სამი მინის სათბური — მთელი წლის განმავლობაში ყვავილები, ბოსტნეული და იშვიათი მცენარეები.",
    descriptionEn: "Three glass greenhouses — year-round flowers and vegetables.",
    features: ["მთელი წლის მოსავალი", "ეკოტურები"],
    image: "/images/sector1/greenhouses.jpg",
    points: [{ x: 630, y: 649 }, { x: 800, y: 823 }, { x: 963, y: 1000 }],
    mobilePoints: [{ x: 190, y: 840 }], 
  },
  {
    id: "rose-garden",
    nameKa: "ვარდების ბაღი ბოსტანი",
    nameEn: "Rose garden",
    category: "agriculture",
    descriptionKa: "ვარდების ბაღი და არომატული ბოსტანი — ყვავილები და სურნელოვანი მწვანილი ერთ სივრცეში.",
    descriptionEn: "Rose garden combined with aromatic herbs.",
    features: ["ვარდები", "მწვანილი", "არომათერაპია"],
    image: "/images/sector1/rose-garden.jpg",
    points: [{ x: 1072, y: 1079 }],
    mobilePoints: [{ x: 400, y: 1020 }],
  },
  {
    id: "open-garden",
    nameKa: "ღია ბოსტანი",
    nameEn: "Open garden",
    category: "agriculture",
    descriptionKa: "ღია ცის ქვეშ მოწყობილი ორი ბოსტანი ქვის ტერასებზე — პომიდორი, კიტრი, ბადრიჯანი, წიწაკა.",
    descriptionEn: "Two open-air vegetable gardens on stone terraces.",
    features: ["ეკო-ბოსტანი", "სეზონური ბოსტნეული"],
    image: "/images/sector1/open-garden.jpg",
    points: [{ x: 1220, y: 1250 }, { x: 1470, y: 1250 }],
    mobilePoints: [{ x: 470, y: 1100 }],
  },
  {
    id: "vineyards",
    nameKa: "ვენახები",
    nameEn: "Vineyards",
    category: "agriculture",
    descriptionKa: "8000 წლის ქართული ვინიკულტურის ტრადიცია — საფერავი, რქაწითელი და მწვანე.",
    descriptionEn: "8000 years of Georgian winemaking tradition.",
    features: ["საფერავი", "რქაწითელი", "ღვინის დეგუსტაცია"],
    image: "/images/sector1/vineyards.jpg",
    points: [{ x: 1800, y: 1100 }],
    mobilePoints: [{ x: 585, y: 1100 }],
  },
  {
    id: "cottages",
    nameKa: "კოტეჯები",
    nameEn: "Cottages",
    category: "wellness",
    descriptionKa: "სასტუმრო კოტეჯები სტუმრებისთვის — ბუნებაში ჩაფლული, კომფორტული საცხოვრებელი ქვის არქიტექტურით.",
    descriptionEn: "Guest cottages nestled in nature.",
    features: ["სასტუმრო", "ბუნებაში", "ქვის არქიტექტურა"],
    image: "/images/sector1/cottages.jpg",
    points: [{ x: 1846, y: 1260 }],
    mobilePoints: [{ x: 755, y: 1100 }],
  },
  {
    id: "spa",
    nameKa: "სპა ცენტრი",
    nameEn: "Spa center",
    category: "wellness",
    descriptionKa: "თანამედროვე სპა ცენტრი — საუნა, ჰამამი, მასაჟი, ცხელი წყაროს წყლით.",
    descriptionEn: "Modern spa center — sauna, hammam, massage.",
    features: ["საუნა", "ჰამამი", "მასაჟი"],
    image: "/images/sector1/spa.jpg",
    points: [{ x: 2012, y: 1100 }],
    mobilePoints: [{ x: 830, y: 1028 }],
  },
  {
    id: "pool",
    nameKa: "საცურაო აუზი 4 სეზონი",
    nameEn: "4-season pool",
    category: "wellness",
    descriptionKa: "შიდა აუზი ღიაა მთელი წლის განმავლობაში — ცხელი წყაროს წყლით.",
    descriptionEn: "Indoor pool open year-round.",
    features: ["შიდა აუზი", "თბილი წყალი"],
    image: "/images/sector1/pool.jpg",
    points: [{ x: 2097, y: 1136 }],
    mobilePoints: [{ x: 870, y: 1030 }],
  },
  {
    id: "dining",
    nameKa: "სასადილო",
    nameEn: "Dining",
    category: "wellness",
    descriptionKa: "რესტორანი ტყეში — მენიუ ეფუძნება ადგილობრივ ბოსტანს, ვენახსა და საკონსერვო პროდუქციას.",
    descriptionEn: "Restaurant with farm-to-table menu.",
    features: ["ფერმა-მაგიდა", "ქართული სამზარეულო"],
    image: "/images/sector1/dining.jpg",
    points: [{ x: 2210, y: 1130 }],
    mobilePoints: [{ x: 925, y: 1030 }],
  },
  {
    id: "lake",
    nameKa: "ხელოვნური ტბა",
    nameEn: "Artificial lake",
    category: "wellness",
    descriptionKa: "ხელოვნური ტბა — დასვენების, თევზაობისა და ბუნებასთან სიახლოვის ადგილი.",
    descriptionEn: "Artificial lake for relaxation and fishing.",
    features: ["თევზაობა", "დასვენება"],
    image: "/images/sector1/lake.jpg",
    points: [{ x: 2339, y: 1100 }],
    mobilePoints: [{ x: 980, y: 1030 }],
  },
  {
    id: "shops",
    nameKa: "მაღაზიები ადგილობრივი ნაწარმის",
    nameEn: "Local products shops",
    category: "production",
    descriptionKa: "მაღაზია, სადაც იყიდება მამულის მიერ წარმოებული პროდუქცია — ღვინო, ჯემი, კონსერვები, თაფლი.",
    descriptionEn: "Shop selling estate-produced goods.",
    features: ["ღვინო", "ჯემი", "თაფლი", "სუვენირები"],
    image: "/images/sector1/shops.jpg",
    points: [{ x: 2320, y: 1210 }],
    mobilePoints: [{ x: 975, y: 1080 }],
  },
  {
    id: "events",
    nameKa: "ღონისძიებების სივრცე",
    nameEn: "Events space",
    category: "culture",
    descriptionKa: "ღია სივრცე ქორწილებისთვის, კორპორატიული ღონისძიებებისა და ღვინის დეგუსტაციისთვის ტრადიციული ქვის სამზარეულოთი.",
    descriptionEn: "Open-air venue for weddings and wine tastings.",
    features: ["ქორწილები", "დეგუსტაცია", "კორპორატიული"],
    image: "/images/sector1/events.jpg",
    points: [{ x: 2115, y: 1225 }],
    mobilePoints: [{ x: 880, y: 1080 }],
  },
];

export const categoryColors: Record<LocationCategory, string> = {
  agriculture: "rgba(140, 180, 90, 0.95)",
  wellness: "rgba(120, 190, 220, 0.95)",
  production: "rgba(212, 178, 86, 0.95)",
  culture: "rgba(220, 140, 120, 0.95)",
};

export const categoryLabels: Record<LocationCategory, string> = {
  agriculture: "აგრო",
  wellness: "ველნესი",
  production: "წარმოება",
  culture: "კულტურა",
};