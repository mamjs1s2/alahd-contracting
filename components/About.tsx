import Image from "next/image";
import Reveal from "./Reveal";

const POINTS = [
  "تنفيذ إنشائي كامل: أساسات، أعمدة، بلاطات خرسانية، وهياكل متعددة الأدوار",
  "أعمال مدنية وميكانيكا وكهرباء وسباكة (MEP) لخطوط الإنتاج",
  "أرضيات صناعية وأحواض كيميائية بمواصفات مقاومة للتآكل",
  "اشتراك فعّال في برامج إدارة السلامة لسلاسل التوريد الصناعية",
];

const STATS = [
  { value: "+٢٥", label: "مشروع صناعي ناجح" },
  { value: "+١٥", label: "عاماً من الخبرة" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-slate-50/50 to-white">
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-1/2 left-0 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-amber/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-wrap px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          
          {/* العمود الأيمن: النص والتعريف */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber-dim border border-amber/20 mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
              عن الشركة
            </div>

            <h2 className="font-display mb-5 text-[28px] font-black tracking-tight text-navy sm:text-[36px] md:text-[40px] leading-[1.2]">
              خبرة ميدانية متقدمة في قلب <span className="text-amber-dim">الصناعة الثقيلة</span>
            </h2>

            <p className="text-[17px] leading-[1.9] text-slate-700 font-normal">
              <strong className="text-navy font-semibold">العهد للمقاولات العامة</strong> شركة مصرية رائدة متخصصة في تنفيذ المشروعات الصناعية الكبرى، من الصوامع والمطاحن إلى خطوط الإنتاج ومحطات المعالجة الكيميائية. نعمل مع كبرى الكيانات الصناعية والغذائية داخل مصر، ملتزمين بأعلى معايير السلامة والجودة العالمية في كل موقع.
            </p>

            {/* النقاط الرئيسية */}
            <ul className="mt-8 grid gap-4">
              {POINTS.map((p, idx) => (
                <li key={idx} className="group flex items-start gap-3.5 text-[15.5px] text-slate-800 transition-transform duration-300 hover:translate-x-1">
                  <span className="relative mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber/20 text-amber-dim group-hover:bg-amber group-hover:text-navy transition-colors duration-300">
                    <svg className="h-3.5 w-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            {/* أرقام إحصائية سريعة لتعزيز الثقة */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-8">
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-3xl font-black text-navy">{stat.value}</span>
                  <span className="text-sm font-medium text-slate-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* العمود الأيسر: الصور والبطاقات العائمة */}
          <Reveal delay={0.1} className="relative pb-0 lg:pb-20">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/85 shadow-2xl shadow-navy/15 bg-slate-900 group">
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent z-10 pointer-events-none" />
              <Image
                src="/images/silos/3.jpg"
                alt="مجسم إنشائي ثلاثي الأبعاد لمشروع صوامع مطحن المجد"
                width={900}
                height={620}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* بطاقات الرؤية والرسالة (تم تصليح المشاكل التصميمية السابقة للأجهزة الصغيرة) */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:-bottom-8 lg:right-6 lg:left-6 lg:mt-0">
              
              {/* بطاقة الرؤية */}
              <div className="relative overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-xl shadow-navy/20 border border-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-1.5 w-full bg-amber" />
                <span className="font-display mb-1.5 block text-[16px] font-bold text-amber">رؤيتنا</span>
                <p className="text-[13.5px] leading-relaxed text-slate-300">
                  أن نكون الشريك الإنشائي الأول والأكثر موثوقية للصناعات الثقيلة والغذائية في مصر والمنطقة.
                </p>
              </div>

              {/* بطاقة الرسالة */}
              <div className="relative overflow-hidden rounded-2xl bg-amber p-6 text-navy shadow-xl shadow-amber/25 border border-black/5 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-1.5 w-full bg-navy/20" />
                <span className="font-display mb-1.5 block text-[16px] font-bold text-navy">رسالتنا</span>
                <p className="text-[13.5px] leading-relaxed text-navy/90 font-medium">
                  تنفيذ مشروعات صناعية آمنة وعالية الجودة بدقة زمنية والتزام تام بالتكلفة المتفق عليها.
                </p>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}