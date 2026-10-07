"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/data/projects";
import Reveal from "./Reveal";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const start = performance.now();
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{val}</span>;
}

const ICONS = [
  // projects / briefcase
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
  </svg>,
  // silo / cylinder stack
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M7 3h10l1 4v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l1-4Z" />
    <path d="M6 10h12M6 15h12" />
  </svg>,
  // height / ruler
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M6 3v18M6 3l3 3M6 3 3 6M6 21l3-3M6 21l-3-3M6 8h4M6 13h4M6 18h4" />
  </svg>,
  // area / square
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 3v18M3 8h5" />
  </svg>,
];

export default function Stats() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-wrap px-6">
        <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => {
            const dark = i % 2 === 1;
            return (
              <div
                key={s.label}
                className={`rounded-2xl p-6 transition-transform hover:-translate-y-1 ${
                  dark ? "bg-navy text-white" : "bg-amber text-[#0A1730]"
                }`}
              >
                <div className={`mb-4 h-8 w-8 ${dark ? "text-amber" : "text-[#0A1730]"}`}>{ICONS[i]}</div>
                <b className="font-display block text-[30px] font-black md:text-[36px]">
                  <CountUp to={s.to} />+
                </b>
                <span className={`mt-1 block text-[13px] font-semibold ${dark ? "text-slate-300" : "text-[#0A1730]/80"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
