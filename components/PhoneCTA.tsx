import Image from "next/image";
import { Phone } from "lucide-react";
import { contact } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function PhoneCTA() {
  return (
    <section className="relative overflow-x-clip bg-ink">
      <div className="absolute inset-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[78%] lg:w-[75%]">
        <Image
          src="/images/cta-fleet-branded-v3.jpg"
          alt="Flota chiriedube.ro, dube Mercedes, Ford și VW"
          fill
          className="object-cover object-[58%_center]"
          sizes="(max-width: 640px) 100vw, 78vw"
          priority={false}
        />
      </div>

      {/* Mobile: bottom→top solid. Desktop: left→right wash, navy brand ink */}
      <div
        aria-hidden
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to top, #001f38 0%, #001f38 42%, rgba(0,31,56,0.88) 62%, rgba(0,31,56,0.45) 82%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, #001f38 0%, #001f38 22%, rgba(0,31,56,0.9) 34%, rgba(0,31,56,0.55) 48%, rgba(0,31,56,0.2) 62%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-xl lg:max-w-[48%]">
          <Reveal variant="clip">
            <SectionLabel icon={Phone} tone="light">
              Contact rapid
            </SectionLabel>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="mt-2.5 text-[24px] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-3 sm:text-[2.92rem]">
              Ai nevoie de o dubă?{" "}
              <span className="text-brand">Sună sau scrie</span>
            </h2>
          </Reveal>

          <Reveal variant="blur" delay={160}>
            <p className="mt-2 max-w-lg text-[14px] font-medium leading-relaxed text-slate-300 sm:mt-3 sm:text-[16px]">
              Spune ce ai de mutat și în ce perioadă. Îți răspundem cu ce e liber
              și cu prețul.
            </p>
          </Reveal>

          <Reveal variant="up" delay={220}>
            <a
              href={contact.phoneHref}
              className="mt-4 inline-flex min-h-11 items-baseline gap-3 text-white transition hover:text-brand-soft sm:mt-6"
            >
              <span className="whitespace-nowrap text-[1.75rem] font-extrabold tracking-tight sm:text-[3.2rem] lg:text-[3.6rem]">
                {contact.phoneDisplay}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
