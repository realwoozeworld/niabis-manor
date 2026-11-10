import type { Plot } from "./sector2-plots";

const houseImages = [
  "/images/houses/house1.jpg",
  "/images/houses/house2.jpg",
  "/images/houses/house3.jpg",
];

const rawSector3Plots: Plot[] = [
  { id: "N-1",  status: "available", polygon: [
    { x: 1964, y: 426 }, { x: 1816, y: 472 }, { x: 1771, y: 314 }, { x: 1924, y: 262 },
  ]},
  { id: "N-2",  status: "available", polygon: [
    { x: 1818, y: 472 }, { x: 1665, y: 520 }, { x: 1612, y: 360 }, { x: 1769, y: 310 },
  ]},
  { id: "N-3",  status: "available", polygon: [
    { x: 1657, y: 528 }, { x: 1508, y: 574 }, { x: 1461, y: 406 }, { x: 1612, y: 360 },
  ]},
  { id: "N-4",  status: "available", polygon: [
    { x: 1504, y: 576 }, { x: 1357, y: 618 }, { x: 1304, y: 456 }, { x: 1461, y: 412 },
  ]},
  { id: "N-5",  status: "available", polygon: [
    { x: 1351, y: 618 }, { x: 1202, y: 674 }, { x: 1143, y: 502 }, { x: 1298, y: 450 },
  ]},
  { id: "N-6",  status: "available", polygon: [
    { x: 1194, y: 670 }, { x: 1043, y: 716 }, { x: 988, y: 560 }, { x: 1143, y: 512 },
  ]},
  { id: "N-7",  status: "reserved", ownerKa: "მაია დოლიძე", ownerEn: "Maia Dolidze", polygon: [
    { x: 1041, y: 718 }, { x: 891, y: 770 }, { x: 831, y: 602 }, { x: 988, y: 554 },
  ]},
  { id: "N-8",  status: "reserved", ownerKa: "მაია დოლიძე", ownerEn: "Maia Dolidze", polygon: [
    { x: 882, y: 764 }, { x: 732, y: 814 }, { x: 677, y: 654 }, { x: 831, y: 600 },
  ]},
  { id: "N-9",  status: "sold", ownerKa: "დავით კაპანაძე", ownerEn: "Davit Kapanadze", polygon: [
    { x: 728, y: 816 }, { x: 583, y: 864 }, { x: 526, y: 700 }, { x: 673, y: 648 },
  ]},
  { id: "N-10", status: "reserved", ownerKa: "ნოდარ ხუციშვილი", ownerEn: "Nodar Khutsishvili", polygon: [
    { x: 375, y: 758 }, { x: 434, y: 926 }, { x: 581, y: 868 }, { x: 522, y: 706 },
  ]},
  { id: "N-11", status: "reserved", polygon: [
    { x: 483, y: 1074 }, { x: 634, y: 1028 }, { x: 583, y: 874 }, { x: 432, y: 932 },
  ]},
  { id: "N-12", status: "reserved", polygon: [
    { x: 781, y: 984 }, { x: 634, y: 1028 }, { x: 581, y: 872 }, { x: 730, y: 820 },
  ]},
  { id: "N-13", status: "available", polygon: [
    { x: 781, y: 980 }, { x: 730, y: 818 }, { x: 889, y: 770 }, { x: 935, y: 932 },
  ]},
  { id: "N-14", status: "available", polygon: [
    { x: 1037, y: 720 }, { x: 889, y: 766 }, { x: 939, y: 932 }, { x: 1094, y: 884 },
  ]},
  { id: "N-15", status: "available", polygon: [
    { x: 1194, y: 678 }, { x: 1045, y: 724 }, { x: 1096, y: 884 }, { x: 1245, y: 836 },
  ]},
  { id: "N-16", status: "available", polygon: [
    { x: 1351, y: 626 }, { x: 1202, y: 676 }, { x: 1251, y: 834 }, { x: 1398, y: 788 },
  ]},
  { id: "N-17", status: "available", polygon: [
    { x: 1553, y: 736 }, { x: 1398, y: 782 }, { x: 1357, y: 624 }, { x: 1508, y: 578 },
  ]},
  { id: "N-18", status: "available", polygon: [
    { x: 1659, y: 526 }, { x: 1508, y: 576 }, { x: 1559, y: 734 }, { x: 1700, y: 676 },
  ]},
  { id: "N-19", status: "available", polygon: [
    { x: 1816, y: 484 }, { x: 1663, y: 530 }, { x: 1702, y: 682 }, { x: 1852, y: 642 },
  ]},
  { id: "N-20", status: "available", polygon: [
    { x: 1967, y: 436 }, { x: 1818, y: 484 }, { x: 1854, y: 634 }, { x: 1997, y: 594 },
  ]},
  { id: "N-21", status: "available", polygon: [
    { x: 2055, y: 836 }, { x: 1909, y: 884 }, { x: 1859, y: 724 }, { x: 2013, y: 674 },
  ]},
  { id: "N-22", status: "available", polygon: [
    { x: 1907, y: 880 }, { x: 1769, y: 938 }, { x: 1710, y: 774 }, { x: 1850, y: 728 },
  ]},
  { id: "N-23", status: "available", polygon: [
    { x: 1755, y: 936 }, { x: 1616, y: 980 }, { x: 1571, y: 816 }, { x: 1708, y: 778 },
  ]},
  { id: "N-24", status: "available", polygon: [
    { x: 1618, y: 984 }, { x: 1469, y: 1034 }, { x: 1416, y: 878 }, { x: 1563, y: 814 },
  ]},
  { id: "N-25", status: "available", polygon: [
    { x: 1471, y: 1032 }, { x: 1318, y: 1072 }, { x: 1269, y: 912 }, { x: 1418, y: 872 },
  ]},
  { id: "N-26", status: "available", polygon: [
    { x: 1316, y: 1078 }, { x: 1164, y: 1128 }, { x: 1111, y: 960 }, { x: 1263, y: 912 },
  ]},
  { id: "N-27", status: "reserved", polygon: [
    { x: 1155, y: 1126 }, { x: 1009, y: 1174 }, { x: 960, y: 1016 }, { x: 1107, y: 964 },
  ]},
  { id: "N-28", status: "available", polygon: [
    { x: 999, y: 1174 }, { x: 858, y: 1220 }, { x: 805, y: 1056 }, { x: 952, y: 1012 },
  ]},
  { id: "N-29", status: "available", polygon: [
    { x: 850, y: 1224 }, { x: 705, y: 1264 }, { x: 654, y: 1100 }, { x: 801, y: 1054 },
  ]},
  { id: "N-30", status: "available", polygon: [
    { x: 553, y: 1314 }, { x: 500, y: 1146 }, { x: 651, y: 1096 }, { x: 706, y: 1272 },
  ]},
  { id: "N-31", status: "sold", ownerKa: "ნოდო ხუციშვილი", ownerEn: "Nodo Khutsishvili", areaSqm: 600,polygon: [
    { x: 2191, y: 238 }, { x: 2372, y: 140 }, { x: 2315, y: 32 }, { x: 2132, y: 140 },
  ]},
  { id: "N-32", status: "sold", ownerKa: "არჩილი", ownerEn: "Archil", polygon: [
    { x: 2378, y: 142 }, { x: 2189, y: 238 }, { x: 2246, y: 350 }, { x: 2434, y: 254 },
  ]},
  { id: "N-33", status: "sold", ownerKa: "ნინი", ownerEn: "Nini", polygon: [
    { x: 2429, y: 254 }, { x: 2244, y: 354 }, { x: 2299, y: 464 }, { x: 2500, y: 376 },
  ]},
  { id: "N-34", status: "sold", ownerKa: "კახა", ownerEn: "Kakha", polygon: [
    { x: 2502, y: 376 }, { x: 2307, y: 468 }, { x: 2356, y: 582 }, { x: 2560, y: 506 },
  ]},
  { id: "N-35", status: "available", polygon: [
    { x: 2562, y: 501 }, { x: 2358, y: 585 }, { x: 2386, y: 710 }, { x: 2590, y: 638 },
  ]},
  { id: "N-36", status: "sold", ownerKa: "ზაქრო", ownerEn: "Zakhro", polygon: [
    { x: 2592, y: 638 }, { x: 2386, y: 718 }, { x: 2421, y: 832 }, { x: 2625, y: 770 },
  ]},
];

export const sector3Plots: Plot[] = rawSector3Plots.map((plot, i) => ({
  ...plot,
  image: plot.image || houseImages[i % houseImages.length],
}));