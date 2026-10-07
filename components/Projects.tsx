"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { CATEGORIES, PROJECTS, Category, Project } from "@/data/projects";

function SiteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className={className}>
      <path d="M3 21h18M5 21V9l4-3v15M13 21V6l4 3v12M9 12h0M9 15h0M9 18h0" />
    </svg>
  );
}

function ProjectCard({ p, onOpen, index }: { p: Project; onOpen: (p: Project) => void; index: number }) {
  const catLabel = CATEGORIES.find((c) => c.key === p.cat)?.label ?? "";
  const hasImg = p.images.length > 0;

  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 24 });
  const sry = useSpring(ry, { stiffness: 300, damping: 24 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(p)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-navy/15"
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy-soft to-navy">
        {hasImg ? (
          <Image
            src={p.images[0]}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            <SiteIcon className="h-11 w-11" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        
        {/* شارة التصنيف */}
        <span className="absolute top-4 right-4 rounded-full bg-navy/80 backdrop-blur-md px-3.5 py-1.5 text-[11.5px] font-bold text-amber border border-white/10 shadow-sm">
          {catLabel}
        </span>

        {/* شارة الموقع الجغرافي */}
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-[11.5px] font-bold text-navy shadow-lg">
          <span className="text-amber-dim">📍</span> {p.loc}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pb-7">
        <h4 className="mb-2.5 text-[18px] font-bold leading-snug text-navy font-display">{p.title}</h4>
        {p.client && <div className="mb-3 text-[13.5px] font-semibold text-amber-dim">{p.client}</div>}
        <div className="mt-auto border-t border-black/5 pt-4 text-[13px] text-slate-500 font-medium">
          {hasImg ? p.meta : <span className="font-bold text-amber-dim">الصور والتفاصيل قيد الإضافة قريبًا</span>}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const catLabel = CATEGORIES.find((c) => c.key === project.cat)?.label ?? "";
  return (
    <Reveal className="mb-12">
      <div
        onClick={() => onOpen(project)}
        className="group grid cursor-pointer grid-cols-1 overflow-hidden rounded-3xl border border-black/10 bg-white md:grid-cols-2 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-navy md:aspect-auto">
          {project.images[0] && (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent md:bg-gradient-to-l" />
          <span className="absolute top-5 right-5 rounded-full bg-amber px-4 py-1.5 text-[12px] font-bold text-navy shadow-lg">
            مشروع مميز
          </span>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="mb-4 inline-block w-fit rounded-full bg-amber/10 px-3.5 py-1.5 text-[12px] font-bold text-amber-dim border border-amber/20">
            {catLabel}
          </span>
          <h3 className="font-display mb-3.5 text-[26px] font-black leading-snug text-navy md:text-[32px]">
            {project.title}
          </h3>
          {project.client && <div className="mb-2 text-[14.5px] font-semibold text-amber-dim">{project.client}</div>}
          <div className="mb-4 text-[14px] text-slate-500 font-medium">📍 {project.loc}</div>
          <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-slate-600">{project.desc}</p>
          <span className="inline-flex w-fit items-center gap-2 text-[14.5px] font-bold text-navy transition-transform group-hover:translate-x-[-6px]">
            عرض الصور والتفاصيل الكاملة
            <span aria-hidden>←</span>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const hasImg = project.images.length > 0;
  const catLabel = CATEGORIES.find((c) => c.key === project.cat)?.label ?? "";

  const prev = () => setIdx((i) => (i - 1 + project.images.length) % project.images.length);
  const next = () => setIdx((i) => (i + 1) % project.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-[1050px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* شاشة عرض الصور الرئيسية */}
        <div className="relative aspect-[16/9] flex-none bg-slate-950">
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-amber hover:text-navy shadow-lg"
          >
            ✕
          </button>
          
          {hasImg ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image src={project.images[idx]} alt={project.title} fill className="object-contain" priority />
                </motion.div>
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="السابق"
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-md transition hover:bg-amber hover:text-navy shadow-lg z-10"
                  >
                    ›
                  </button>
                  <button
                    onClick={next}
                    aria-label="التالي"
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-md transition hover:bg-amber hover:text-navy shadow-lg z-10"
                  >
                    ‹
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-[13px] font-bold text-white backdrop-blur-md">
                    {idx + 1} / {project.images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
              <SiteIcon className="h-10 w-10" />
              <span>سيتم إضافة صور هذا المشروع قريبًا</span>
            </div>
          )}
        </div>

        {/* شريط الصور المصغرة المحسّن */}
        {hasImg && project.images.length > 1 && (
          <div className="flex flex-none gap-3 overflow-x-auto border-b border-black/10 bg-paper p-4">
            {project.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIdx(i)}
                className={`relative h-16 w-24 flex-none overflow-hidden rounded-xl border-2 transition-all ${
                  i === idx ? "border-amber opacity-100 scale-105 shadow-md" : "border-transparent opacity-50 hover:opacity-90"
                }`}
                aria-label={`صورة ${i + 1}`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* تفاصيل المشروع */}
        <div className="overflow-y-auto p-8 md:p-10">
          <span className="mb-3.5 inline-block rounded-full bg-amber/10 px-3.5 py-1.5 text-[12.5px] font-bold text-amber-dim border border-amber/20">
            {catLabel}
          </span>
          <h3 className="mb-2 text-[24px] font-bold text-navy font-display">{project.title}</h3>
          {project.client && <div className="mb-1.5 text-[14px] font-semibold text-amber-dim">{project.client}</div>}
          <div className="mb-4 text-[14px] text-slate-500 font-medium">📍 {project.loc}</div>
          <p className="text-[15.5px] leading-[1.85] text-slate-700">{project.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Category>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) => filter === "all" || p.cat === filter).filter(
    (p) => !(filter === "all" && p.key === PROJECTS[0].key)
  );

  return (
    <section id="projects" className="py-24 md:py-32 bg-gradient-to-b from-white to-concrete/30">
      <div className="mx-auto max-w-wrap px-6">
        <Reveal className="mb-14 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber-dim border border-amber/20 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber" />
            معرض الأعمال
          </div>
          <h2 className="font-display mb-3.5 text-[28px] font-black tracking-tight text-navy md:text-[40px]">
            مشروعات صناعية <span className="text-amber-dim">رائدة ومنفذة</span>
          </h2>
          <p className="text-[16px] text-slate-600">اضغط على أي مشروع لعرض الصور والتفاصيل الهندسية الكاملة.</p>
        </Reveal>

        {/* أزرار الفلترة */}
        <LayoutGroup>
          <Reveal delay={0.1} className="mb-12 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`relative rounded-full border-[1.5px] px-6 py-3 text-[14px] font-bold transition-all duration-300 ${
                  filter === c.key ? "border-navy text-white shadow-md shadow-navy/20" : "border-black/10 text-slate-700 bg-white hover:border-navy/40"
                }`}
              >
                {filter === c.key && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {c.label}
              </button>
            ))}
          </Reveal>
        </LayoutGroup>

        {filter === "all" && (
          <FeaturedProject project={PROJECTS[0]} onOpen={setSelected} />
        )}

        {/* شبكة المشاريع */}
        <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.key} p={p} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* النافذة المنبثقة (Modal) لعرض صور المشروع */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}