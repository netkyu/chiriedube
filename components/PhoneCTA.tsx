import Image from "next/image";
import { Phone } from "lucide-react";
import { contact } from "@/lib/data";
import Reveal from "./Reveal";

export default function PhoneCTA() {
  return (
    <section className="relative overflow-x-clip bg-ink">
      <div className="absolute inset-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[78%] lg:w-[75%]">
        <Image
          src="/images/cta-fleet-branded-v3.jpg"
          alt="Flota chiriedube.ro — dube Mercedes, Ford și VW"
          fill
          className="object-cover object-[58%_center]"
          sizes="(max-width: 640px) 100vw, 78vw"
          priority={false}
        />
      </div>

      {/* Mobile: bottom→top solid. Desktop: left→right wash — navy brand ink */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-xl lg:max-w-[48%]">
          <Reveal variant="clip">
            <span className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-orange-300">
              <Phone className="size-3.5" strokeWidth={2.4} aria-hidden />
              Contact rapid
            </span>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.92rem]">
              Hai să vorbim —{" "}
              <span className="text-brand">rezervarea e la un apel</span>
            </h2>
          </Reveal>

          <Reveal variant="blur" delay={160}>
            <p className="mt-3 max-w-lg text-[16px] font-medium leading-relaxed text-slate-300">
              Spune-ne ce ai de mutat sau transportat și îți găsim duba potrivită
              în câteva minute.
            </p>
          </Reveal>

          <Reveal variant="up" delay={220}>
            <a
              href={contact.phoneHref}
              className="mt-6 inline-flex items-baseline gap-3 text-white transition hover:text-brand-soft"
            >
              <span className="whitespace-nowrap text-[1.85rem] font-extrabold tracking-tight sm:text-[3.2rem] lg:text-[3.6rem]">
                {contact.phoneDisplay}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
