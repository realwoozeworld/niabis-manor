import type { Plot } from "./sector2-plots";

const houseImages = [
  "/images/houses/house1.jpg",
  "/images/houses/house2.jpg",
  "/images/houses/house3.jpg",
];

const rawSector3Plots: Plot[] = [
  { id: "N-1",  status: "available",ownerKa: "", ownerEn: "", areaSqm: 498, polygon: [
    { x: 1782, y: 465 }, { x: 1737, y: 300 }, { x: 1890, y: 255 }, { x: 1923, y: 425 }, 
  ]},
  { id: "N-2",  status: "available", ownerKa: "", ownerEn: "", areaSqm: 498, polygon: [
    { x: 1629, y: 520 }, { x: 1586, y: 360 }, { x: 1732, y: 307 }, { x: 1772, y: 472 },
  ]},
  { id: "N-3",  status: "available", ownerKa: "", ownerEn: "", areaSqm: 498, polygon: [
    { x: 1428, y: 405 }, { x: 1580, y: 365 }, { x: 1617, y: 519 }, { x: 1474, y: 565 },
  ]},
  { id: "N-4",  status: "available", ownerKa: "", ownerEn: "", areaSqm: 501, polygon: [
    { x: 1330, y: 613 }, { x: 1281, y: 452 }, { x: 1422, y: 410 }, { x: 1464, y: 565 },
  ]},
  { id: "N-5",  status: "sold", ownerKa: "ვლადიმერ ქუხილავა", ownerEn: "Vladimir Qukhilava", areaSqm: 514.3 , polygon: [
    { x: 1171, y: 665 }, { x: 1121, y: 508 }, { x: 1273, y: 457 }, { x: 1321, y: 615 },
  ]},
  { id: "N-6",  status: "sold", ownerKa: "ბექა ტერტერაშვილი", ownerEn: "Beqa Terterashvili", areaSqm: 528, polygon: [
    { x: 1023, y: 711 }, { x: 972, y: 553 }, { x: 1118, y: 510 }, { x: 1166, y: 663 },
  ]},
  { id: "N-7",  status: "sold", ownerKa:"მაია დოლიძე", ownerEn: "Maia Dolidze", areaSqm: 542, polygon: [
    { x: 869, y: 759 }, { x: 820, y: 603 }, { x: 965, y: 560 }, { x: 1011, y: 710 },
  ]},
  { id: "N-8",  status: "sold", ownerKa: "მაია დოლიძე", ownerEn: "Maia Dolidze", areaSqm: 555, polygon: [
    { x: 714, y: 809 }, { x: 667, y: 656 }, { x: 812, y: 610 }, { x: 858, y: 760 },
  ]},
  { id: "N-9",  status: "sold", ownerKa: "თეა მათითაშვილი", ownerEn: "Tea Matithashvili", areaSqm: 547, polygon: [
    { x: 568, y: 859 }, { x: 518, y: 706 }, { x: 655, y: 667 }, { x: 702, y: 814 },
  ]},
  { id: "N-10", status: "reserved", ownerKa: "", ownerEn: "",  areaSqm: 532, polygon: [
    { x: 416, y: 912 }, { x: 368, y: 761 }, { x: 507, y: 715 }, { x: 554, y: 859 },
  ]},
  { id: "N-11", status: "reserved", ownerKa: "", ownerEn: "", areaSqm: 498, polygon: [
    { x: 420, y: 923 }, { x: 559, y: 880 }, { x: 607, y: 1024 }, { x: 475, y: 1067 },
  ]},
  { id: "N-12", status: "sold", ownerKa: "ბესო-მაკა სულამანიძე", ownerEn: "beso-maka sulamanidze", areaSqm: 498.5, polygon: [
    { x: 571, y: 876 }, { x: 709, y: 828 }, { x: 759, y: 976 }, { x: 621, y: 1021 },
  ]},
  { id: "N-13", status: "sold", ownerKa: "ლევანი ცინცაძე", ownerEn: "Levan Tsintsadze", areaSqm: 498.5, polygon: [
    { x: 721, y: 825 }, { x: 865, y: 778 }, { x: 910, y: 928 }, { x: 771, y: 971 },
  ]},
  { id: "N-14", status: "sold", ownerKa: "ლევანი ცინცაძე", ownerEn: "Levan Tsintsadze ", areaSqm: 498.5, polygon: [
    { x: 875, y: 775 }, { x: 1018, y: 728 }, { x: 1065, y: 876 }, { x: 927, y: 919 },
  ]},
  { id: "N-15", status: "sold", ownerKa: "ნიკა ტერტერაშვილი", ownerEn: "Nika Terterashvili", areaSqm: 498.5, polygon: [
    { x: 1029, y: 727 }, { x: 1171, y: 682 }, { x: 1211, y: 823 }, { x: 1077, y: 871 },
  ]},
  { id: "N-16", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 1182, y: 680 }, { x: 1323, y: 636 }, { x: 1364, y: 780 }, { x: 1223, y: 820 },
  ]},
  { id: "N-17", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 1331, y: 632 }, { x: 1472, y: 581 }, { x: 1515, y: 734 }, { x: 1369, y: 778 },
  ]},
  { id: "N-18", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
   { x: 1483, y: 579 }, { x: 1624, y: 538 }, { x: 1665, y: 682 }, { x: 1526, y: 730 },
  ]},
  { id: "N-19", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 1636, y: 538 }, { x: 1773, y: 489 }, { x: 1808, y: 632 }, { x: 1675, y: 680 },
  ]},
  { id: "N-20", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 1782, y: 489 }, { x: 1920, y: 443 }, { x: 1959, y: 589 }, { x: 1820, y: 634 },
  ]},
  { id: "N-21", status: "sold", ownerKa: "ხათუნა ხელაია", ownerEn: "Khatuna Khelaia", areaSqm: 498.5, polygon: [
    { x: 1816, y: 716 }, { x: 1870, y: 887 }, { x: 2023, y: 835 }, { x: 1976, y: 672 },
  ]},
  { id: "N-22", status: "sold", ownerKa: "სალომე ღუღუნიშვილი", ownerEn: "Salome Gugunishvili", areaSqm: 498.5, polygon: [
    { x: 1725, y: 935 }, { x: 1675, y: 766 }, { x: 1815, y: 722 }, { x: 1866, y: 885 },
  ]},
  { id: "N-23", status: "sold", ownerKa: "მარინა კაზანცევა", ownerEn: "Marina Kazanceva", areaSqm: 498.5, polygon: [
    { x: 1534, y: 811 }, { x: 1668, y: 775 }, { x: 1715, y: 935 }, { x: 1589, y: 976 },
  ]},
  { id: "N-24", status: "sold", ownerKa: "რომან ოვჩარენკო", ownerEn: "Roman Ovcarenko", areaSqm:498.5, polygon: [
    { x: 1438, y: 1023 }, { x: 1391, y: 863 }, { x: 1526, y: 821 }, { x: 1570, y: 978 },
  ]},
  { id: "N-25", status: "sold", ownerKa: "რომან ოვჩარენკო", ownerEn: "Roman Ovcarenko", areaSqm: 498.5, polygon: [
    { x: 1295, y: 1074 }, { x: 1245, y: 912 }, { x: 1383, y: 869 }, { x: 1426, y: 1021 },
  ]},
  { id: "N-26", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 1085, y: 962 }, { x: 1233, y: 919 }, { x: 1280, y: 1072 }, { x: 1132, y: 1119 },
  ]},
  { id: "N-27", status: "reserved", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 939, y: 1009 }, { x: 1075, y: 971 }, { x: 1120, y: 1124 }, { x: 986, y: 1164 },
  ]},
  { id: "N-28", status: "sold", ownerKa: "ინა პაიჭაძე", ownerEn: "Ina Paichadze", areaSqm: 498.5, polygon: [
    { x: 784, y: 1054 }, { x: 929, y: 1016 }, { x: 974, y: 1169 }, { x: 832, y: 1220 },
  ]},
  { id: "N-29", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 643, y: 1098 }, { x: 777, y: 1064 }, { x: 829, y: 1219 }, { x: 691, y: 1260 },
  ]},
  { id: "N-30", status: "available", ownerKa: "", ownerEn: "", areaSqm: 498.5, polygon: [
    { x: 494, y: 1145 }, { x: 630, y: 1103 }, { x: 676, y: 1263 }, { x: 537, y: 1313 },
  ]},
  { id: "N-31", status: "sold", ownerKa: "ნოდო ხუციშვილი", ownerEn: "Nodo Khutsishvili", areaSqm: 600 , polygon: [
    { x: 2086, y: 135 }, { x: 2205, y: 59 }, { x: 2282, y: 63 }, { x: 2325, y: 138 }, { x: 2145, y: 228 }
  ]},
  { id: "N-32", status: "sold", ownerKa: "არჩილი", ownerEn: "Archil", areaSqm: 570, polygon: [
    { x: 2148, y: 240 }, { x: 2325, y: 145 }, { x: 2386, y: 255 }, { x: 2205, y: 347 },
  ]},
  { id: "N-33", status: "sold", ownerKa: "ნინი", ownerEn: "Nini", areaSqm: 573, polygon: [
    { x: 2210, y: 355 }, { x: 2384, y: 264 }, { x: 2441, y: 372 }, { x: 2262, y: 464 },
  ]},
  { id: "N-34", status: "sold", ownerKa: "კახა", ownerEn: "Kakha", areaSqm: 605, polygon: [
    { x: 2264, y: 472 }, { x: 2446, y: 386 }, { x: 2503, y: 507 }, { x: 2313, y: 586 },
  ]},
  { id: "N-35", status: "sold", ownerKa: "ვაჟა", ownerEn: "Vazha", areaSqm: 550, polygon: [
    { x: 2319, y: 593 }, { x: 2503, y: 522 }, { x: 2542, y: 634 }, { x: 2353, y: 711 },
  ]},
  { id: "N-36", status: "sold", ownerKa: "ზაქრო", ownerEn: "Zakhro", areaSqm: 556, polygon: [
    { x: 2355, y: 722 }, { x: 2537, y: 648 }, { x: 2570, y: 768 }, { x: 2380, y: 833 },
  ]},
];

export const sector3Plots: Plot[] = rawSector3Plots.map((plot, i) => ({
  ...plot,
  image: plot.image || houseImages[i % houseImages.length],
}));