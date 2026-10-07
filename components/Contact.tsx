"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import Spotlight from "./Spotlight";

const CARDS = [
  {
    key: "address",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
    label: "العنوان الرئيسي",
    value: "برج المنار، طريق كورنيش النيل، بنها، مصر",
    copy: null,
    href: "https://maps.google.com/?q=30.48288932165149,31.1843318073964",
  },
  {
    key: "phone",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c1 .4 2 .7 3 .8a2 2 0 0 1 1.7 2Z" />
      </svg>
    ),
    label: "اتصال هاتفي مباشر",
    value: "0133 194775",
    copy: "0133194775",
    href: "tel:0133194775",
  },
  {
    key: "email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    label: "البريد الإلكتروني",
    value: "info@alahd-contracting.com",
    copy: "info@alahd-contracting.com",
    href: "mailto:info@alahd-contracting.com",
  },
  {
    key: "linkedin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
        <path d="M10 9h4v2c.7-1.3 2-2.3 4-2.3 3 0 4 2 4 5.3V21h-4v-5.5c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1.1V21h-4V9Z" />
      </svg>
    ),
    label: "صفحة لينكدإن",
    value: "al-ahad-industrial-general-contracting",
    copy: null,
    href: "https://www.linkedin.com/company/al-ahad-industrial-general-contracting",
  },
];

function InteractiveCard({ card }: { card: (typeof CARDS)[number] }) {
  const [copied, setCopied] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleClick = async (e: React.MouseEvent) => {
    if (card.copy) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(card.copy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        if (card.href) window.location.href = card.href;
      }
    }
  };

  const spotlightMask = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(211, 164, 58, 0.25), transparent 80%)`;

  const cardContent = (
    <div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden flex items-center gap-4 rounded-3xl border border-white/10 bg-navy-light/60 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber/50 shadow-xl shadow-black/20"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: spotlightMask }}
      />

      <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-amber/10 text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-navy group-hover:scale-110 shadow-sm border border-amber/20">
        <span className="h-5 w-5">{card.icon}</span>
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <span className="font-display block text-[13px] font-bold text-slate-400 mb-0.5">{card.label}</span>
        <span
          dir={card.key === "phone" || card.key === "email" ? "ltr" : undefined}
          className="block truncate text-[14.5px] font-semibold text-white transition-colors group-hover:text-amber text-right"
        >
          {card.value}
        </span>
      </div>

      {card.copy && (
        <span className="relative z-10 text-[11px] text-amber/80 opacity-0 group-hover:opacity-100 transition-opacity bg-amber/10 px-2.5 py-1 rounded-md border border-amber/20 shrink-0 font-medium">
          {copied ? "تم النسخ ✓" : "اضغط للنسخ"}
        </span>
      )}

      {card.copy && copied && (
        <motion.span
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber px-3.5 py-1 text-[11px] font-black text-navy shadow-lg z-30"
        >
          تم نسخ النص بنجاح ✓
        </motion.span>
      )}
    </div>
  );

  if (card.href && !card.copy) {
    return (
      <a href={card.href} target="_blank" rel="noopener noreferrer" className="block w-full">
        {cardContent}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className="block w-full text-right cursor-pointer">
      {cardContent}
    </button>
  );
}

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      projectType: data.get("projectType"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || result.error) {
        setError("حدث خطأ أثناء إرسال الطلب. برجاء المحاولة لاحقًا أو التواصل هاتفيًا.");
      } else {
        setFormSubmitted(true);
        form.reset();
      }
    } catch {
      setError("تعذّر الاتصال بالخادم. برجاء المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <Spotlight />
      
      {/* عناصر خلفية جمالية متحركة */}
      <div aria-hidden className="animate-blob pointer-events-none absolute -top-40 right-1/4 h-[420px] w-[420px] rounded-full bg-amber/10 blur-[120px]" />
      <div aria-hidden className="animate-blob-slow pointer-events-none absolute -bottom-40 left-10 h-[360px] w-[360px] rounded-full bg-amber/10 blur-[120px]" />

      <div className="relative mx-auto max-w-wrap px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-4 py-1.5 text-[13px] font-bold text-amber border border-amber/20 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber animate-ping" />
            تواصل معنا
          </div>
          <h2 className="font-display mb-4 text-[28px] font-black md:text-[42px] tracking-tight">
            لنبدأ في تنفيـذ <span className="text-amber">مشروعك الصناعي القادم</span>
          </h2>
          <p className="text-[16px] text-slate-300 leading-relaxed">
            فريقنا الهندسي جاهز لدراسة متطلبات موقعك وتقديم الاستشارة الفنية وعروض الأسعار.
          </p>
        </Reveal>

        {/* شبكة البطاقات التفاعلية */}
        <Reveal delay={0.1} className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CARDS.map((c) => (
            <InteractiveCard key={c.key} card={c} />
          ))}
        </Reveal>

        {/* نموذج إرسال الطلب الفعلي (Interactive Contact Form) */}
        <Reveal delay={0.12} className="mb-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-navy-light/70 p-8 md:p-12 shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-l from-amber via-amber/60 to-transparent" />
            
            <div className="mb-8">
              <h3 className="text-[22px] font-bold font-display text-white mb-2">أرسل تفاصيل مشروعك وسنتواصل معك</h3>
              <p className="text-sm text-slate-300">قم بتعبئة النموذج أدناه وسيتم تحويل طلبك مباشرة إلى القسم الهندسي.</p>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-amber/15 border border-amber/30 p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber text-navy text-2xl font-black">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-white mb-2">تم إرسال طلبك بنجاح!</h4>
                <p className="text-slate-300 text-sm">شكراً لتواصلك مع شركة العهد للمقاولات. سيتواصل معك مهندس مختص خلال يوم عمل واحد.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 rounded-full bg-white/10 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
                >
                  إرسال طلب آخر
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">الاسم الكريم *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="أدخل اسمك أو صفتك"
                    className="w-full rounded-xl border border-white/10 bg-navy/60 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-amber focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">رقم الهاتف *</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="01xxxxxxxxx"
                    className="w-full rounded-xl border border-white/10 bg-navy/60 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-amber focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-white/10 bg-navy/60 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-amber focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">نوع المشروع المطلوب *</label>
                  <select
                    required
                    defaultValue=""
                    name="projectType"
                    className="w-full rounded-xl border border-white/10 bg-navy px-4 py-3.5 text-sm text-white focus:border-amber focus:outline-none transition-all"
                  >
                    <option value="" disabled>اختر مجال المشروع</option>
                    <option value="silos">صوامع ومطاحن</option>
                    <option value="mep">خطوط إنتاج و MEP</option>
                    <option value="chemicals">أحواض كيميائية</option>
                    <option value="floors">أرضيات صناعية</option>
                    <option value="other">أعمال إنشائية أخرى</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-2">تفاصيل الطلب أو المشروع</label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="اكتب نبذة عن تفاصيل الموقع أو المساحة أو المتطلبات الخاصة..."
                    className="w-full rounded-xl border border-white/10 bg-navy/60 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-amber focus:outline-none transition-all resize-none"
                  />
                </div>
                {error && (
                  <div className="md:col-span-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-full bg-amber px-10 py-4 text-[15px] font-bold text-navy shadow-xl shadow-amber/25 transition-all hover:bg-amber-light hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "جاري الإرسال..." : "إرسال الطلب الآن ←"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* الخريطة التفاعلية بالإحداثيات الدقيقة */}
        <Reveal delay={0.15} className="mb-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-navy-light/40 p-2 shadow-2xl backdrop-blur-md">
            <div className="absolute top-4 right-4 z-10 rounded-xl bg-navy/90 px-4 py-2 text-xs font-bold text-white border border-amber/30 shadow-lg backdrop-blur-md flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
              موقعنا على الخريطة (بنها، مصر)
            </div>
            <div className="h-[380px] w-full overflow-hidden rounded-2xl filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-500">
              <iframe
                title="موقع شركة العهد للمقاولات ببنها"
                src={`https://maps.google.com/maps?q=30.48288932165149,31.1843318073964&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}