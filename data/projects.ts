export type Category = "all" | "silos" | "mep" | "chemicals" | "floors" | "warehouses";

export const CATEGORIES: { key: string; label: string }[] = [
  { key: "all", label: "جميع المشاريع" },
  { key: "صوامع ومطاحن", label: "صوامع ومطاحن" },
  { key: "خطوط إنتاج وأعمال MEBJ", label: "خطوط إنتاج و MEP" },
  { key: "أحواض كيماويات", label: "أحواض كيميائية" },
  { key: "أرضيات صناعية", label: "أرضيات صناعية" },
  { key: "مستودعات وهناجر", label: "مستودعات وهناجر" },
];

export const CLIENT_LOGOS = [
  { name: "Amazon", src: "/images/brand/amazon.png" },
  { name: "Sprea Misr", src: "/images/brand/sprea-misr.png" },
  { name: "Saint-Gobain", src: "/images/brand/saint-gobain.png" },
  { name: "Pepsi", src: "/images/brand/pepsi.png" },
  { name: "Nestle", src: "/images/brand/nestle.png" },
  { name: "Paste & Juice", src: "/images/brand/paste-juice.png" },
  { name: "EPx Logistics", src: "/images/brand/epx-logistics.png" },
  { name: "Al-Magd Group", src: "/images/brand/al-magd-group.png" },
];

export const CERTIFICATIONS = [
  { name: "AVETTA", src: "/images/brand/avetta.png", note: "اعتماد السلامة والجودة لسلاسل التوريد الصناعية" },
];

function imgs(folder: string, count: number, ext: string = "jpg") {
  return Array.from({ length: count }, (_, i) => `/images/${folder}/${i + 1}.${ext}`);
}

export const TEAM_PHOTOS = imgs("team", 6);

export const STATS = [
  { to: 8, label: "مشاريع صناعية وغذائية منفذة" },
  { to: 24, label: "صومعة ومطحنة" },
  { to: 45, label: "متر أقصى ارتفاع إنشائي" },
  { to: 50, label: "ألف م² أرضيات صناعية منفذة" },
];