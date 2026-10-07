import Image from "next/image";

const LINK_COLS = [
  {
    title: "الشركة",
    links: [
      { label: "عن الشركة", href: "#about" },
      { label: "خدماتنا", href: "#services" },
      { label: "فريقنا", href: "#team" },
      { label: "شركاؤنا", href: "#clients" },
    ],
  },
  {
    title: "المشاريع",
    links: [
      { label: "صوامع ومطاحن ومصانع", href: "#projects" },
      { label: "خطوط إنتاج و MEP", href: "#projects" },
      { label: "أحواض كيميائية", href: "#projects" },
      { label: "أرضيات صناعية", href: "#projects" },
    ],
  },
];

const CONTACT_INFO = [
  {
    icon: (
      <svg className="h-4 w-4 shrink-0 text-amber mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "برج المنار، كورنيش النيل، بنها",
  },
  {
    icon: (
      <svg className="h-4 w-4 shrink-0 text-amber mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    text: "0133 194775",
    href: "tel:0133194775",
  },
  {
    icon: (
      <svg className="h-4 w-4 shrink-0 text-amber mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    text: "info@alahd-contracting.com",
    href: "mailto:info@alahd-contracting.com",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy text-slate-300">
      {/* تأثيرات جمالية في الخلفية */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-amber/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-wrap px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-16">
          
          {/* العمود الأول: الشعار والنبذة وحساب لينكدإن */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="relative h-11 w-11 flex-none overflow-hidden rounded-xl bg-white/5 p-1 border border-white/10">
                <Image src="/images/brand/alahd-logo.png" alt="شعار شركة العهد للمقاولات" fill className="object-contain" />
              </span>
              <div>
                <span className="font-display text-[18px] font-black tracking-tight text-white block">العهد للمقاولات</span>
                <span dir="ltr" className="text-[11px] text-amber tracking-wider font-semibold block">AL AHD Industrial General Contracting</span>
              </div>
            </div>

            <p className="max-w-[34ch] text-[14px] leading-relaxed text-slate-400">
              تنفيذ المشروعات الصناعية الكبرى في مصر: الصوامع والمطاحن، خطوط الإنتاج وخدمات الـ MEP، أحواض الكيماويات، والأرضيات الصناعية المتقدمة.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/al-ahad-industrial-general-contracting"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 transition-all duration-300 hover:bg-amber hover:border-amber hover:text-navy hover:-translate-y-1 shadow-md"
                aria-label="صفحة الشركة على لينكدإن"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="2" y="9" width="4" height="12" rx="1" />
                  <circle cx="4" cy="4" r="2" />
                  <path d="M10 9h4v2c.7-1.3 2-2.3 4-2.3 3 0 4 2 4 5.3V21h-4v-5.5c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1.1V21h-4V9Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* أعمدة الروابط (الشركة والمشاريع) */}
          {LINK_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display mb-5 text-[14px] font-bold text-white uppercase tracking-wider relative inline-block">
                {col.title}
                <span className="absolute -bottom-1.5 right-0 h-0.5 w-6 bg-amber rounded-full" />
              </h3>
              <ul className="grid gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a 
                      href={l.href} 
                      className="group inline-flex items-center text-[13.5px] text-slate-400 transition-colors duration-200 hover:text-amber"
                    >
                      <span className="transition-transform duration-200 group-hover:-translate-x-1">›</span>
                      <span className="mr-1.5">{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* العمود الأخير: معلومات التواصل مع أيقونات بصرية */}
          <div>
            <h3 className="font-display mb-5 text-[14px] font-bold text-white uppercase tracking-wider relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-1.5 right-0 h-0.5 w-6 bg-amber rounded-full" />
            </h3>
            <ul className="grid gap-3.5 text-[13.5px]">
              {CONTACT_INFO.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-400">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      dir="ltr"
                      className="break-all text-right transition-colors duration-200 hover:text-amber"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="leading-relaxed">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* الشريط السفلي للحقوق */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12.5px] text-slate-500 md:flex-row">
          <p>© {currentYear} شركة العهد للمقاولات العامة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>تصميم وتنفيذ رقمي —</span>
            <span className="text-slate-400 font-medium">AL AHD Contracting</span>
          </div>
        </div>
      </div>
    </footer>
  );
}