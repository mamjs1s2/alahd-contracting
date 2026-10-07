"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { STATS } from "@/data/projects";
import Magnetic from "./Magnetic";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const headline = STATS[1]; // 24 صومعة
  const sub = STATS[0]; // 8 مشاريع

  return (
    <section
      ref={ref}
      id="top"
      className="vignette relative flex min-h-[92vh] items-end overflow-hidden pb-20 text-white md:min-h-[780px] md:pb-24"
    >
      {/* cinematic letterbox bars */}
      <div className="absolute inset-x-0 top-0 z-20 h-2 bg-gradient-to-b from-amber/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-2 bg-gradient-to-t from-amber/50 to-transparent" />

      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <div className="animate-ken-burns absolute inset-0">
          <Image
            src="/images/silos/2.jpg"
            alt="موقع تنفيذ مشروع صناعي - العهد للمقاولات"
            fill
            priority
            className="object-cover object-[center_30%] saturate-90 contrast-105"
          />
        </div>
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#050a16]/60 via-[#060b18]/65 to-[#04070f]/95"
      />

      {/* decorative floating blobs */}
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-amber/25 blur-[100px]"
      />
      <div
        aria-hidden
        className="animate-blob-slow pointer-events-none absolute -bottom-32 -left-16 h-[380px] w-[380px] rounded-full bg-amber/15 blur-[100px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-wrap px-6"
      >
        <motion.div
          variants={item}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/15 px-4 py-1.5 text-[13px] font-bold text-amber-light"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-amber" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          مقاولات عامة · مشروعات صناعية كبرى
        </motion.div>
        <motion.h1
          variants={item}
          className="font-display max-w-[16ch] text-[34px] font-black leading-[1.12] md:text-[58px]"
        >
          نبني البنية الصناعية الثقيلة لمصانع مصر
        </motion.h1>
        <motion.p variants={item} className="mt-5 max-w-[56ch] text-[16px] text-slate-200 md:text-[19px]">
          شركة العهد للمقاولات العامة تنفّذ الصوامع والمطاحن، خطوط الإنتاج وأعمال الـMEB، أحواض الكيماويات، والأرضيات
          الصناعية — من الأساسات وحتى التسليم النهائي.
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <Magnetic
            href="#projects"
            className="inline-block rounded-full bg-amber px-7 py-4 text-[15px] font-bold text-[#0A1730] shadow-lg shadow-amber/20 transition-colors hover:bg-amber-light"
          >
            مشاريعنا المنفذة
          </Magnetic>
          <Magnetic
            href="#contact"
            className="inline-block rounded-full border-[1.5px] border-white/40 px-7 py-4 text-[15px] font-bold text-white transition-colors hover:border-white"
          >
            تواصل معنا
          </Magnetic>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          variants={item}
          className="mt-10 flex max-w-xl flex-wrap gap-4 md:absolute md:-left-2 md:bottom-2 md:mt-0"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-navy shadow-2xl shadow-black/30"
          >
            <span className="font-display text-[26px] font-black text-amber-dim">{headline.to}+</span>
            <span className="max-w-[9ch] text-[12.5px] font-semibold leading-tight text-steel">
              {headline.label}
            </span>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="flex items-center gap-3 rounded-2xl bg-amber px-5 py-4 text-[#0A1730] shadow-2xl shadow-black/30"
          >
            <span className="font-display text-[26px] font-black">{sub.to}+</span>
            <span className="max-w-[9ch] text-[12.5px] font-semibold leading-tight">{sub.label}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex"
      >
        <span className="text-[11px] tracking-wider">مرر للأسفل</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 p-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        </motion.span>
      </motion.div>
    </section>
  );
}
