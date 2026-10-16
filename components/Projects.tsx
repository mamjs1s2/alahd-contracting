"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { CATEGORIES } from "@/data/projects";

export interface DBProject {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  images?: string[];
  featured?: boolean;
  client?: string;
  loc?: string;
  meta?: string;
}

function SiteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className={className}>
      <path d="M3 21h18M5 21V9l4-3v15M13 21V6l4 3v12M9 12h0M9 15h0M9 18h0" />
    </svg>
  );
}

function ProjectCard({ p, onOpen, index }: { p: DBProject; onOpen: (p: DBProject) => void; index: number }) {
  const catLabel = CATEGORIES.find((c) => c.key === p.category || c.label === p.category)?.label ?? p.category;
  const mainImage = p.images && p.images.length > 0 ? p.images[0] : p.image_url;
  const hasImg = Boolean(mainImage);

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
            src={mainImage}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            <SiteIcon className="h-11 w-11" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        
        <span className="absolute top-4 right-4 rounded-full bg-navy/80 backdrop-blur-md px-3.5 py-1.5 text-[11.5px] font-bold text-amber border border-white/10 shadow-sm">
          {catLabel}
        </span>

        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-[11.5px] font-bold text-navy shadow-lg">
          <span className="text-amber-dim">📍</span> {p.loc || "مصر"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pb-7">
        <h4 className="mb-2.5 text-[18px] font-bold leading-snug text-navy font-display">{p.title}</h4>
        {p.client && <div className="mb-3 text-[13.5px] font-semibold text-amber-dim">{p.client}</div>}
        <div className="mt-auto border-t border-black/5 pt-4 text-[13px] text-slate-500 font-medium">
          {p.meta || p.description || "مشروع مقاولات صناعية منفذ بأعلى معايير الجودة."}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProject({ project, onOpen }: { project: DBProject; onOpen: (p: DBProject) => void }) {
  const catLabel = CATEGORIES.find((c) => c.key === project.category || c.label === project.category)?.label ?? project.category;
  const mainImage = project.images && project.images.length > 0 ? project.images[0] : project.image_url;

  return (
    <Reveal className="mb-12">
      <div
        onClick={() => onOpen(project)}
        className="group grid cursor-pointer grid-cols-1 overflow-hidden rounded-3xl border border-black/10 bg-white md:grid-cols-2 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-navy md:aspect-auto">
          {mainImage && (
            <Image
              src={mainImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
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
          <div className="mb-4 text-[14px] text-slate-500 font-medium">📍 {project.loc || "جمهورية مصر العربية"}</div>
          <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-slate-600 line-clamp-3">
            {project.description || "تم تنفيذ هذا المشروع بأعلى المواصفات الهندسية والهيكلية مع التسليم الكامل."}
          </p>
          <span className="inline-flex w-fit items-center gap-2 text-[14.5px] font-bold text-navy transition-transform group-hover:translate-x-[-6px]">
            عرض التفاصيل الكاملة
            <span aria-hidden>←</span>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }: { project: DBProject; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const projectImages = project.images && project.images.length > 0 
    ? project.images 
    : (project.image_url ? [project.image_url] : []);

  const hasImg = projectImages.length > 0;
  const catLabel = CATEGORIES.find((c) => c.key === project.category || c.label === project.category)?.label ?? project.category;

  const prev = () => {
    setDirection(-1);
    setIdx((i) => (i - 1 + projectImages.length) % projectImages.length);
  };

  const next = () => {
    setDirection(1);
    setIdx((i) => (i + 1) % projectImages.length);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") next();
      if (event.key === "ArrowRight") prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, projectImages.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-navy/90 p-3 backdrop-blur-md md:items-center md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="my-auto w-full max-w-[920px] overflow-hidden rounded-2xl bg-white shadow-2xl md:rounded-3xl"
      >
        <div className="max-h-[92vh] overflow-y-auto overscroll-contain">
          
          {/* المعرض التفاعلي للصور المجهزة بالسحب والتحريك (Swipe / Drag) */}
          <div className="relative h-[38vh] min-h-[220px] max-h-[520px] bg-slate-950 md:h-[48vh] select-none overflow-hidden">
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="absolute left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-amber hover:text-navy md:left-4 md:top-4"
            >
              ✕
            </button>

            {hasImg ? (
              <>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={idx}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -10000 || offset.x < -100) {
                        next();
                      } else if (swipe > 10000 || offset.x > 100) {
                        prev();
                      }
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
                  >
                    <Image
                      src={projectImages[idx]}
                      alt={`${project.title} - صورة ${idx + 1}`}
                      fill
                      className="object-contain pointer-events-none"
                      priority
                      sizes="(max-width: 920px) 100vw, 920px"
                    />
                  </motion.div>
                </AnimatePresence>

                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="السابق"
                      className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur-md transition hover:bg-amber hover:text-navy md:right-5 md:h-12 md:w-12"
                    >
                      ›
                    </button>
                    <button
                      onClick={next}
                      aria-label="التالي"
                      className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white backdrop-blur-md transition hover:bg-amber hover:text-navy md:left-5 md:h-12 md:w-12"
                    >
                      ‹
                    </button>
                    <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-[13px] font-bold text-white backdrop-blur-md">
                      {idx + 1} / {projectImages.length}
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

          {/* شريط الصور المصغرة (Thumbnails) */}
          {hasImg && projectImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto border-b border-slate-200 bg-slate-50 p-3 md:p-4">
              {projectImages.map((src, i) => (
                <button
                  key={src}
                  onClick={() => {
                    setDirection(i > idx ? 1 : -1);
                    setIdx(i);
                  }}
                  className={`relative h-16 w-24 flex-none overflow-hidden rounded-lg border-2 transition-all md:h-20 md:w-28 ${
                    i === idx ? "border-amber opacity-100 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`عرض الصورة ${i + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover pointer-events-none" sizes="112px" />
                </button>
              ))}
            </div>
          )}

          {/* التفاصيل والمعلومات */}
          <div className="bg-white p-5 md:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-amber/20 bg-amber/10 px-3 py-1.5 text-xs font-bold text-amber-dim">
                {catLabel}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {projectImages.length} صور
              </span>
            </div>

            <h3 id="project-modal-title" className="font-display text-2xl font-black leading-tight text-navy md:text-3xl">
              {project.title}
            </h3>

            <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.client && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <dt className="text-xs font-bold text-slate-500">العميل</dt>
                  <dd className="mt-1 break-words text-sm font-bold text-navy">{project.client}</dd>
                </div>
              )}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs font-bold text-slate-500">الموقع</dt>
                <dd className="mt-1 text-sm font-bold text-navy">{project.loc || "جمهورية مصر العربية"}</dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <dt className="text-xs font-bold text-slate-500">نطاق الأعمال</dt>
                <dd className="mt-1 text-sm font-bold leading-relaxed text-navy">
                  {project.meta || project.category}
                </dd>
              </div>
            </dl>

            <div className="mt-5">
              <h4 className="mb-2 text-sm font-black text-navy">تفاصيل المشروع</h4>
              <p className="text-sm leading-8 text-slate-700 md:text-base">
                {project.description || "تم تنفيذ هذا المشروع بجهود فريق العهد الصناعي وفق أعلى معايير السلامة والجودة الهندسية."}
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ initialProjects = [] }: { initialProjects?: DBProject[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<DBProject | null>(null);

  const filteredProjects = initialProjects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter || CATEGORIES.find((c) => c.key === filter)?.label === p.category;
  });

  const featuredProject = initialProjects.find((p) => p.featured) || initialProjects[0];
  
  const gridProjects = filter === "all" && featuredProject
    ? filteredProjects.filter((p) => p.id !== featuredProject.id)
    : filteredProjects;

  return (
    <section id="projects" className="py-24 md:py-32 bg-gradient-to-b from-white to-concrete/30" dir="rtl">
      <div className="mx-auto max-w-wrap px-6">
        <Reveal className="mb-14 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber-dim border border-amber/20 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber" />
            معرض الأعمال
          </div>
          <h2 className="font-display mb-3.5 text-[28px] font-black tracking-tight text-navy md:text-[40px]">
            مشروعات صناعية <span className="text-amber-dim">رائدة ومنفذة</span>
          </h2>
          <p className="text-[16px] text-slate-600">اضغط على أي مشروع لعرض التفاصيل الهندسية والصور الكاملة.</p>
        </Reveal>

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

        {filter === "all" && featuredProject && (
          <FeaturedProject project={featuredProject} onOpen={setSelected} />
        )}

        <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {gridProjects.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}