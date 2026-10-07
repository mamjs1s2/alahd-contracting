"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";

const SERVICES = [
  {
    num: "01",
    title: "الصوامع والمطاحن",
    desc: "تنفيذ إنشائي متكامل لمجمعات التخزين والطحن متعددة الأدوار وفق أعلى معايير الجودة.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M7 3h10l1 4v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l1-4Z" />
        <path d="M6 10h12M6 15h12" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "خطوط الإنتاج و MEP",
    desc: "أعمال مدنية وميكانيكا وكهرباء وسباكة متكاملة لمباني ومرافق الإنتاج الصناعي.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "أحواض الكيماويات",
    desc: "أحواض ومنشآت خرسانية متخصصة ومقاومة للمواد الكيميائية والأحماض الصناعية.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 2v6.3a4 4 0 0 1-.6 2.1L4.5 17a3 3 0 0 0 2.5 4.6h10a3 3 0 0 0 2.5-4.6l-3.9-6.6A4 4 0 0 1 15 8.3V2" />
        <path d="M8 2h8M6.5 15h11" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "فروع وأرضيات صناعية",
    desc: "تنفيذ فروع تشغيلية وأرضيات صناعية صلبة بمعايير تحمل عالية ومقاومة للتآكل.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 21h18M4 21V9l8-6 8 6v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightMask = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(211, 164, 58, 0.2), transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-navy-light/70 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber/50 hover:bg-navy-soft shadow-xl shadow-black/20"
    >
      {/* تأثير التوهج التفاعلي مع الماوس */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: spotlightMask }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/10 text-amber transition-all duration-300 group-hover:scale-110 group-hover:bg-amber group-hover:text-navy shadow-sm border border-amber/20">
          <span className="h-6 w-6">{s.icon}</span>
        </div>

        <div className="font-display absolute top-6 left-6 text-[14px] font-black tracking-wider text-white/20 transition-colors group-hover:text-amber/40">
          {s.num}
        </div>

        <h3 className="mb-3 text-[19px] font-bold text-white font-display transition-colors group-hover:text-amber">
          {s.title}
        </h3>
        
        <p className="text-[14.5px] leading-relaxed text-slate-300">{s.desc}</p>
      </div>

      {/* خط ذهبي متحرك أسفل البطاقة */}
      <span className="absolute bottom-0 right-0 h-[3px] w-0 bg-amber transition-all duration-500 group-hover:w-full z-20" />
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <Spotlight />

      {/* عناصر خلفية جمالية */}
      <div aria-hidden className="animate-blob pointer-events-none absolute top-1/3 left-10 h-[380px] w-[380px] rounded-full bg-amber/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-wrap px-6">
        <Reveal className="mb-16 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber border border-amber/20 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
            خدماتنا
          </div>
          <h2 className="font-display mb-4 text-[28px] font-black tracking-tight md:text-[42px]">
            مجالات تنفيذنا <span className="text-amber">الرئيسية والمتخصصة</span>
          </h2>
          <p className="text-[16px] text-slate-300 leading-relaxed">
            أربعة محاور هندسية متكاملة تغطي كافة احتياجات المنشآت الصناعية والغذائية الكبرى.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.num} s={s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}