import Image from "next/image";
import { CLIENT_LOGOS } from "@/data/projects";

export default function TrustBar() {
  return (
    <div className="border-b border-black/5 bg-paper py-7">
      <div className="mx-auto flex max-w-wrap flex-col items-center gap-5 px-6 md:flex-row md:justify-between">
        <span className="text-[12.5px] font-semibold tracking-wide text-[#7C8570]">
          موثّق من عملاء صناعيين رائدين
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
          {CLIENT_LOGOS.map((c) => (
            <div key={c.name} className="relative h-6 w-20">
              <Image src={c.src} alt={c.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
