"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "المعاينة ودراسة الموقع",
    desc: "زيارة ميدانية وتحليل هندسي كامل لظروف الموقع ومتطلبات العميل قبل البدء.",
  },
  {
    n: "02",
    title: "التصميم والتنسيق الفني",
    desc: "إعداد المخططات الإنشائية والتنسيق مع الاستشاري والموردين قبل التنفيذ.",
  },
  {
    n: "03",
    title: "التنفيذ والإشراف اليومي",
    desc: "متابعة يومية على الأرض من فريقنا الهندسي مع الالتزام بمعايير السلامة.",
  },
  {
    n: "04",
    title: "الفحص والتسليم النهائي",
    desc: "فحص جودة شامل قبل التسليم مع توثيق كامل لكل مراحل التنفيذ.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-32">
      {/* خلفية جمالية هادئة */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative mx-auto max-w-wrap px-6">
        <Reveal className="mb-16 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber-dim border border-amber/20 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber" />
            آلية العمل
          </div>
          <h2 className="font-display mb-3.5 text-[28px] font-black tracking-tight text-navy md:text-[40px]">
            من المعاينة وحتى <span className="text-amber-dim">التسليم النهائي</span>
          </h2>
          <p className="text-[16px] text-[#4B534A] leading-relaxed">
            أربع مراحل هندسية مدروسة تضمن دقة التنفيذ والتزاماً كاملاً بالمعايير في كل مشروع.
          </p>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {/* الخط الأفقي الرابط بين الخطوات (يعمل بالـ RTL من اليمين لليسار) */}
          <div className="pointer-events-none absolute right-0 left-0 top-6 hidden h-px bg-black/10 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "right" }}
              className="h-px w-full bg-amber shadow-sm"
            />
          </div>

          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} y={16}>
              <div className="group relative rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber/40 hover:bg-white hover:shadow-xl hover:shadow-navy/5">
                {/* رقم الخطوة بتفاعل أنيق */}
                <div className="font-display relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-amber/40 bg-paper text-[15px] font-black text-amber-dim transition-all duration-300 group-hover:bg-amber group-hover:text-navy group-hover:border-amber group-hover:scale-110 shadow-sm">
                  {s.n}
                </div>
                <h3 className="mb-2.5 text-[18px] font-bold text-navy font-display">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#5A6252]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}