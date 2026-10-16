"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";
import { isValidContactName, normalizeContactName, normalizeEgyptianMobile } from "@/lib/contact-validation";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = normalizeContactName(String(data.get("name") ?? ""));
    const phone = normalizeEgyptianMobile(String(data.get("phone") ?? ""));
    const validName = isValidContactName(name);

    setNameError(validName ? null : "اكتب الاسم الأول واسم العائلة بحروف عربية أو إنجليزية.");
    setPhoneError(phone ? null : "أدخل رقم هاتف مصري صحيحًا يبدأ بـ 010 أو 011 أو 012 أو 015.");

    if (!validName || !phone) {
      form.querySelector<HTMLInputElement>(!validName ? '[name="name"]' : '[name="phone"]')?.focus();
      return;
    }

    setLoading(true);
    const payload = {
      name,
      phone,
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
        if (result.error === "invalid-name") {
          setNameError("اكتب الاسم الأول واسم العائلة بحروف عربية أو إنجليزية.");
        } else if (result.error === "invalid-phone") {
          setPhoneError("أدخل رقم هاتف مصري صحيحًا يبدأ بـ 010 أو 011 أو 012 أو 015.");
        } else {
          setError("حدث خطأ أثناء إرسال الطلب. برجاء المحاولة لاحقًا أو التواصل هاتفيًا.");
        }
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
                <p className="text-slate-300 text-sm">شكراً لتواصلك مع شركة العهد الصناعي للمقاولات العامة. سيتواصل معك مهندس مختص خلال يوم عمل واحد.</p>
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
                  <label className="block text-xs font-bold text-slate-300 mb-2">الاسم *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    minLength={4}
                    maxLength={60}
                    placeholder="الاسم الأول واسم العائلة"
                    aria-invalid={Boolean(nameError)}
                    aria-describedby={nameError ? "contact-name-error" : undefined}
                    onChange={() => setNameError(null)}
                    className="w-full rounded-xl border border-white/10 bg-navy/60 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-amber focus:outline-none transition-all"
                  />
                  {nameError && <p id="contact-name-error" className="mt-2 text-xs text-red-300">{nameError}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">رقم الهاتف *</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                    placeholder="01xxxxxxxxx أو +20 1xxxxxxxxx"
                    aria-invalid={Boolean(phoneError)}
                    aria-describedby={phoneError ? "contact-phone-error" : undefined}
                    onChange={() => setPhoneError(null)}
                    className="w-full rounded-xl border border-white/10 bg-navy/60 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-amber focus:outline-none transition-all"
                  />
                  {phoneError && <p id="contact-phone-error" className="mt-2 text-xs text-red-300">{phoneError}</p>}
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
                title="موقع شركة العهد الصناعي للمقاولات العامة ببنها"
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