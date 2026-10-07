"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LINKS = [
  { href: "#about", label: "عن الشركة" },
  { href: "#services", label: "خدماتنا" },
  { href: "#projects", label: "مشاريعنا" },
  { href: "#team", label: "فريقنا" },
  { href: "#clients", label: "شركاؤنا" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur border-b border-white/10 shadow-lg shadow-black/20" : "bg-navy/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-wrap items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-3 text-white">
          <span className="relative h-11 w-11 flex-none">
            <Image src="/images/brand/alahd-logo.png" alt="AL AHD" fill className="object-contain" priority />
          </span>
          <span className="font-display leading-tight">
            <span className="block text-[19px] font-black">العهد للمقاولات</span>
            <span dir="ltr" className="block text-[10.5px] font-normal tracking-wide text-slate-300">
              AL AHD Industrial General Contracting
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[15px] text-slate-200">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="group relative py-1.5">
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-right scale-x-0 bg-amber transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="القائمة"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-navy md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-2 py-3 text-slate-200 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
