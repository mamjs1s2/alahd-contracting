import Image from "next/image";
import Reveal from "./Reveal";
import { CLIENT_LOGOS, CERTIFICATIONS } from "@/data/projects";

export default function Clients() {
  // تكرار المصفوفة مرتين بدقة ليتطابق تماماً مع الـ -50%
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section id="clients" className="relative overflow-hidden bg-concrete py-24 md:py-32">
      {/* خلفية جمالية خفيفة */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="mx-auto max-w-wrap px-6">
        {/* عنوان القسم */}
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber-dim border border-amber/20 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber" />
            عملاؤنا وشركاؤنا
          </div>
          <h2 className="font-display text-[28px] font-black text-navy sm:text-[36px] md:text-[40px] tracking-tight">
            نحفظ ثقة <span className="text-amber-dim">أكبر الكيانات والشركات</span> الصناعية
          </h2>
          <p className="mt-3 text-slate-600 text-[16px]">
            نفخر بشراكتنا المستمرة مع المؤسسات الرائدة في مجالات الصناعة، الصوامع، والأغذية بمصر.
          </p>
        </Reveal>
      </div>

      {/* الشريط المتحرك النظيف */}
      <Reveal delay={0.1} className="relative w-full overflow-hidden py-2">
        {/* تدرجات جانبية لإخفاء حواف الشريط بشكل احترافي */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-concrete to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-concrete to-transparent" />
        
        {/* حاوية الـ Marquee مع تثبيت اتجاه الحركة لتتحرك بسلاسة */}
        <div className="flex w-full overflow-hidden" dir="ltr">
          <div className="flex w-max animate-marquee gap-6 items-center">
            {marqueeItems.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="group flex h-28 w-[230px] flex-none items-center justify-center rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-amber/40"
              >
                <Image 
                  src={c.src} 
                  alt={c.name} 
                  width={170} 
                  height={85} 
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* قسم الاعتمادات والشهادات */}
      <div className="mx-auto mt-20 max-w-wrap px-6">
        <div className="text-center mb-8">
          <h3 className="font-display text-[16px] font-bold text-slate-700">الاعتمادات وضمان الجودة</h3>
        </div>

        <Reveal delay={0.2} className="flex flex-wrap justify-center gap-6">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.name}
              className="group flex h-32 w-[240px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-black/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-amber/40"
            >
              <Image 
                src={c.src} 
                alt={c.name} 
                width={130} 
                height={45} 
                className="max-h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <span className="text-[12px] font-medium text-slate-500">{c.note}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}