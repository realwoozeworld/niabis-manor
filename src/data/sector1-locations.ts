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
    descriptionKa:
      "თანამედროვე სამაცივრე სივრცე, სადაც ინახება მოსავალი, ხილი და ბოსტნეული მთელი წლის განმავლობაში.",
    descriptionEn:
      "Modern cold storage facility for year-round preservation of harvest, fruit and vegetables.",
    features: ["მთელი წლის შენახვა", "თანამედროვე მოწყობილობა"],
    points: [{ x: 319, y: 375 }],
  },
  {
    id: "canning",
    nameKa: "საკონსერვე საწარმო",
    nameEn: "Canning production",
    category: "production",
    descriptionKa:
      "საკონსერვო წარმოების სივრცე — ბოსტნეულის, ხილის, ჯემებისა და საწებლების დამზადება ტრადიციული ქვის ღუმელით.",
    descriptionEn:
      "Canning production space — vegetables, fruit, jams and sauces, prepared with a traditional stone oven.",
    features: ["ჯემები", "საწებლები", "კონსერვები"],
    image: "/images/sector1/canning.jpg",
    points: [{ x: 212, y: 510 }],
  },
  {
    id: "orchards",
    nameKa: "ხეხილის ბაღები",
    nameEn: "Fruit orchards",
    category: "agriculture",
    descriptionKa:
      "ხეხილის სამი ბაღი — ვაშლი, მსხალი, ატამი, გარგარი, ქლიავი, ალუბალი.",
    descriptionEn:
      "Three fruit orchards — apples, pears, peaches, apricots, plums and cherries.",
    features: ["სეზონური ხილი", "ადგილობრივი ჯიშები"],
    image: "/images/sector1/orchards.jpg",
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
    descriptionKa:
      "სამი მინის სათბური — მთელი წლის განმავლობაში ყვავილები, ბოსტნეული და იშვიათი მცენარეები.",
    descriptionEn:
      "Three glass greenhouses — year-round flowers, vegetables and rare plants.",
    features: ["მთელი წლის მოსავალი", "ეკოტურები"],
    image: "/images/sector1/greenhouses.jpg",
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
    descriptionKa:
      "ვარდების ბაღი და არომატული ბოსტანი — ყვავილები და სურნელოვანი მწვანილი ერთ სივრცეში.",
    descriptionEn:
      "Rose garden combined with aromatic herbs — flowers and fragrance in one space.",
    features: ["ვარდები", "მწვანილი", "არომათერაპია"],
    image: "/images/sector1/rose-garden.jpg",
    points: [{ x: 1072, y: 1079 }],
  },
  {
    id: "open-garden",
    nameKa: "ღია ბოსტანი",
    nameEn: "Open garden",
    category: "agriculture",
    descriptionKa:
      "ღია ცის ქვეშ მოწყობილი ორი ბოსტანი ქვის ტერასებზე — პომიდორი, კიტრი, ბადრიჯანი, წიწაკა.",
    descriptionEn:
      "Two open-air vegetable gardens on stone terraces — tomatoes, cucumbers, eggplant, peppers.",
    features: ["ეკო-ბოსტანი", "სეზონური ბოსტნეული"],
    image: "/images/sector1/open-garden.jpg",
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
    descriptionKa:
      "სასტუმრო კოტეჯები სტუმრებისთვის — ბუნებაში ჩაფლული, კომფორტული საცხოვრებელი ქვის არქიტექტურით.",
    descriptionEn:
      "Guest cottages nestled in nature — comfortable stone architecture.",
    features: ["სასტუმრო", "ბუნებაში", "ქვის არქიტექტურა"],
    image: "/images/sector1/cottages.jpg",
    points: [{ x: 1846, y: 1260 }],
  },
  {
    id: "spa",
    nameKa: "სპა ცენტრი",
    nameEn: "Spa center",
    category: "wellness",
    descriptionKa:
      "თანამედროვე სპა ცენტრი — საუნა, ჰამამი, მასაჟი, ცხელი წყაროს წყლით.",
    descriptionEn:
      "Modern spa center — sauna, hammam, massage with hot-spring water.",
    features: ["საუნა", "ჰამამი", "მასაჟი"],
    points: [{ x: 2012, y: 1100 }],
  },
  {
    id: "pool",
    nameKa: "საცურაო აუზი 4 სეზონი",
    nameEn: "4-season pool",
    category: "wellness",
    descriptionKa:
      "შიდა აუზი ღიაა მთელი წლის განმავლობაში — ცხელი წყაროს წყლით.",
    descriptionEn:
      "Indoor pool open year-round — supplied by hot-spring water.",
    features: ["შიდა აუზი", "მთელი წლის განმავლობაში", "თბილი წყალი"],
    image: "/images/sector1/pool.jpg",
    points: [{ x: 2097, y: 1136 }],
  },
  {
    id: "dining",
    nameKa: "სასადილო",
    nameEn: "Dining",
    category: "wellness",
    descriptionKa:
      "რესტორანი ტყეში — მენიუ ეფუძნება ადგილობრივ ბოსტანს, ვენახსა და საკონსერვო პროდუქციას.",
    descriptionEn:
      "Restaurant in the forest — menu based on the local garden, vineyard and canning production.",
    features: ["ფერმა-მაგიდა", "ქართული სამზარეულო"],
    image: "/images/sector1/dining.jpg",
    points: [{ x: 2210, y: 1130 }],
  },
  {
    id: "lake",
    nameKa: "ხელოვნური ტბა",
    nameEn: "Artificial lake",
    category: "wellness",
    descriptionKa:
      "ხელოვნური ტბა — დასვენების, თევზაობისა და ბუნებასთან სიახლოვის ადგილი.",
    descriptionEn:
      "Artificial lake — for relaxation, fishing and connecting with nature.",
    features: ["თევზაობა", "დასვენება"],
    image: "/images/sector1/lake.jpg",
    points: [{ x: 2339, y: 1100 }],
  },
  {
    id: "shops",
    nameKa: "მაღაზიები ადგილობრივი ნაწარმის",
    nameEn: "Local products shops",
    category: "production",
    descriptionKa:
      "მაღაზია, სადაც იყიდება მამულის მიერ წარმოებული პროდუქცია — ღვინო, ჯემი, კონსერვები, თაფლი.",
    descriptionEn:
      "Shop selling estate-produced goods — wine, jam, preserves, honey.",
    features: ["ღვინო", "ჯემი", "თაფლი", "სუვენირები"],
    image: "/images/sector1/shops.jpg",
    points: [{ x: 2320, y: 1210 }],
  },
  {
    id: "events",
    nameKa: "ღონისძიებების სივრცე",
    nameEn: "Events space",
    category: "culture",
    descriptionKa:
      "ღია სივრცე ქორწილებისთვის, კორპორატიული ღონისძიებებისა და ღვინის დეგუსტაციისთვის ტრადიციული ქვის სამზარეულოთი.",
    descriptionEn:
      "Open-air venue for weddings, corporate events and wine tastings, with a traditional stone kitchen.",
    features: ["ქორწილები", "დეგუსტაცია", "კორპორატიული"],
    image: "/images/sector1/events.jpg",
    points: [{ x: 2120, y: 1230 }],
  },
];

export const categoryColors: Record<LocationCategory, string> = {
  agriculture: "rgba(140, 180, 90, 0.95)",
  wellness: "rgba(120, 190, 220, 0.95)",
  production: "rgba(212, 178, 86, 0.95)",
  culture: "rgba(220, 140, 120, 0.95)",
};

export const categoryLabels: Record<LocationCategory, string> = {
  agriculture: "სოფლის მეურნეობა",
  wellness: "ველნესი",
  production: "წარმოება",
  culture: "კულტურა",
};