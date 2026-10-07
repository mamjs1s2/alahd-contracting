import Image from "next/image";
import Reveal from "./Reveal";
import { TEAM_PHOTOS } from "@/data/projects";

export default function Team() {
  return (
    <section id="team" className="bg-concrete py-24 md:py-28">
      <div className="mx-auto max-w-wrap px-6">
        <Reveal className="mb-10 max-w-xl">
          <span className="mb-4 inline-block rounded-full bg-amber/15 px-3.5 py-1.5 text-[13px] font-bold text-amber-dim">
            فريقنا
          </span>
          <h2 className="font-display mb-3.5 text-[26px] font-black tracking-tight text-navy md:text-[36px]">
            المهندسون خلف كل موقع
          </h2>
          <p className="text-[16px] text-[#4B534A]">
            فريقنا الهندسي والإشرافي متواجد يوميًا على أرض المشروع لمتابعة التنفيذ والسلامة عن قرب.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {TEAM_PHOTOS.map((src, i) => (
            <div
              key={src}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-black/10 bg-navy"
            >
              <Image
                src={src}
                alt={`فريق العهد للمقاولات في الموقع ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
