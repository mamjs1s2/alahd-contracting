export type Category = "all" | "silos" | "mep" | "chemicals" | "floors";

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "جميع المشاريع" },
  { key: "silos", label: "صوامع ومطاحن ومصانع" },
  { key: "mep", label: "خطوط إنتاج و MEP" },
  { key: "chemicals", label: "أحواض كيميائية" },
  { key: "floors", label: "أرضيات صناعية" },
];

export interface Project {
  key: string;
  title: string;
  client?: string;
  loc: string;
  cat: Category;
  meta: string;
  desc: string;
  images: string[];
}

function imgs(folder: string, count: number, ext: string = "jpg") {
  return Array.from({ length: count }, (_, i) => `/images/${folder}/${i + 1}.${ext}`);
}

export const PROJECTS: Project[] = [
  {
    key: "silos",
    title: "تنفيذ مشروع صوامع ومطحن لعدد 24 صومعة",
    client: "مجموعة المجد",
    loc: "مصر",
    cat: "silos",
    meta: "أعمال إنشائية كاملة + أساسات وهياكل معدنية",
    desc:
      "تنفيذ إنشائي متكامل لمشروع صوامع ومطحن يضم 24 صومعة تخزين، بدءًا من أعمال الأساسات والبنية التحتية وحتى تركيب الهياكل المعدنية والمعدات الملحقة، بما يخدم تخزين ومناولة الحبوب على أعلى مستوى من الكفاءة والسلامة.",
    images: imgs("silos", 5),
  },
  {
    key: "jasmine",
    title: "خط إنتاج Jasmine — أعمال مدنية و MEP",
    client: "نستله للمياه مصر",
    loc: "مصر",
    cat: "mep",
    meta: "أعمال مدنية وميكانيكا وكهرباء وسباكة (MEP)",
    desc:
      "تنفيذ الأعمال المدنية وأعمال الـ MEP الكاملة لخط إنتاج Jasmine الخاص بشركة نستله للمياه مصر، شاملة التأسيس الإنشائي وتركيب شبكات الكهرباء والميكانيكا والسباكة لخدمة خط الإنتاج.",
    images: imgs("jasmine", 8),
  },
  {
    key: "food-concentrates",
    title: "مصنع مركزات غذائية",
    client: "Paste & Juice",
    loc: "مصر",
    cat: "mep",
    meta: "إنشاءات + أعمال مدنية ومبنى إداري",
    desc:
      "تنفيذ مشروع متكامل لمصنع إنتاج المركزات الغذائية يشمل الإنشاءات الصناعية، المعدات والخطوط التكنولوجية، والمبنى الإداري الملحق بالمصنع، وذلك ضمن تخصص شركة العهد الأساسي في إنشاء المصانع الغذائية.",
    images: imgs("food-concentrates", 14),
  },
  {
    key: "acid-tank",
    title: "حوض حمض الكبريتيك",
    client: "Sprea Misr for Chemicals & Plastics",
    loc: "مصر",
    cat: "chemicals",
    meta: "أحواض وخزانات كيميائية مقاومة للتآكل",
    desc:
      "تنفيذ حوض تخزين حمض الكبريتيك لصالح شركة Sprea Misr للكيماويات والبلاستيك، بمواصفات فنية دقيقة تضمن مقاومة التآكل والسلامة الكيميائية الكاملة للمنشأة.",
    images: imgs("acid-tank", 2),
  },
  {
    key: "amazon-10th-ramadan",
    title: "فرع العاشر من رمضان",
    client: "Amazon",
    loc: "العاشر من رمضان، مصر",
    cat: "mep",
    meta: "إنشاء مبنى لوجستي وأعمال تشطيب داخلي",
    desc:
      "تنفيذ أعمال الإنشاء والتجهيز لفرع أمازون اللوجستي بمدينة العاشر من رمضان، شاملة الأعمال الإنشائية والهيكلية والتشطيبات الداخلية للمبنى.",
    images: imgs("amazon-10th-ramadan", 13),
  },
  {
    key: "amazon-qattamiya",
    title: "فرع القطامية",
    client: "Amazon",
    loc: "القطامية، مصر",
    cat: "mep",
    meta: "أعمال تشغيل وصيانة بمبنى لوجستي",
    desc:
      "تنفيذ ومتابعة أعمال التجهيز والصيانة الفنية لفرع أمازون اللوجستي بمنطقة القطامية.",
    images: imgs("amazon-qattamiya", 3),
  },
  {
    key: "epx-logistics",
    title: "مكتب إدارية — EPx Logistics",
    client: "EPx Logistics",
    loc: "مصر",
    cat: "mep",
    meta: "تشطيبات مكتبية وأعمال داخلية متكاملة",
    desc:
      "تنفيذ وتشطيب المبنى الإداري الخاص بشركة EPx Logistics بأعلى مستوى من الجودة في التشطيبات الداخلية والممرات والمكاتب.",
    images: imgs("epx-logistics", 5),
  },
  {
    key: "ain-sokhna",
    title: "عين السخنة — سيابن كابينات الموقع",
    client: "Saint-Gobain",
    loc: "العين السخنة، مصر",
    cat: "mep",
    meta: "توريد وتركيب كابينات الموقع الإدارية",
    desc:
      "توريد وتركيب كابينات الموقع الإدارية والخدمية لصالح شركة Saint-Gobain في منطقة العين السخنة، لخدمة فريق العمل الهندسي والإداري بالموقع.",
    images: imgs("ain-sokhna", 6),
  },
  {
    key: "epoxy-pepsi",
    title: "أرضيات إيبوكسي صناعية",
    client: "Pepsi",
    loc: "مصر",
    cat: "floors",
    meta: "أرضيات إيبوكسي صناعية عالية المقاومة",
    desc:
      "تنفيذ أرضيات إيبوكسي صناعية عالية الجودة لصالح مصنع بيبسي، بمواصفات مقاومة للأحمال والمواد الكيميائية، ابتداءً من تجهيز الأرضية الخرسانية وحتى الطبقة النهائية اللامعة.",
    images: imgs("epoxy-pepsi", 8),
  },
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

export const TEAM_PHOTOS = imgs("team", 6);

export const STATS = [
  { to: 8, label: "مشاريع صناعية وغذائية منفذة" },
  { to: 24, label: "صومعة ومطحنة" },
  { to: 45, label: "متر أقصى ارتفاع إنشائي" },
  { to: 50, label: "ألف م² أرضيات صناعية منفذة" },
];
