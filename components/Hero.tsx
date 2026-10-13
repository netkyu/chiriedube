import Image from "next/image";
import { ArrowRight, MapPin, Phone, Truck } from "lucide-react";
import { contact } from "@/lib/data";
import FeaturesBar from "./FeaturesBar";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="acasa" className="relative overflow-x-clip bg-white">
      <div className="relative w-full overflow-hidden bg-white sm:h-[560px] lg:h-[600px]">
        <div className="relative h-[min(36vh,250px)] min-h-[200px] sm:absolute sm:inset-y-0 sm:right-0 sm:left-auto sm:h-auto sm:min-h-0 sm:w-[72%] lg:w-[70%]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-hq-v20.jpg"
              alt="Dubă ChirieDube pe șosea, la apus, disponibilă pentru închiriere"
              fill
              priority
              quality={100}
              className="object-cover object-[58%_48%] sm:object-[55%_50%]"
              sizes="(max-width: 640px) 100vw, 72vw"
            />
          </div>

          {/* Mobile: fade into white copy below */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background:
                "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.35) 42%, transparent 62%)",
            }}
          />

          {/* Seamless white fade where the photo meets the text side */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[42%] sm:block"
            style={{
              background:
                "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.92) 32%, rgba(255,255,255,0.4) 68%, transparent 100%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-14 bg-gradient-to-t from-white/40 to-transparent sm:block" />

        <div className="relative z-10 mx-auto -mt-16 flex w-full max-w-[1400px] px-4 pb-1 sm:mt-0 sm:h-full sm:items-center sm:pb-28 sm:pt-6 lg:px-5 lg:pb-32">
          <div className="max-w-xl lg:max-w-[42%]">
            <Reveal variant="clip" delay={40}>
              <SectionLabel icon={MapPin}>
                Închirieri dube în toată România
              </SectionLabel>
            </Reveal>

            <Reveal variant="up" delay={60} duration={700}>
              <h1 className="mt-2 text-[28px] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-4 sm:text-[3.18rem] lg:text-[3.71rem]">
                Închiriază o dubă simplu și{" "}
                <span className="text-brand">rapid</span>
              </h1>
            </Reveal>

            <Reveal variant="blur" delay={80}>
              <p className="mt-2 line-clamp-3 max-w-lg text-[14px] leading-relaxed text-muted sm:mt-4 sm:line-clamp-none sm:text-[1.2rem] lg:text-[1.3rem]">
                Dube moderne, fiabile și gata de drum pentru mutări, transport
                marfă și proiecte profesionale. Rezervare rapidă, prețuri
                corecte și suport prompt.
              </p>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-7 sm:flex sm:items-center sm:gap-3">
                <a
                  href="/flota"
                  className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl bg-brand px-3 text-[14px] font-extrabold text-white transition hover:bg-brand-dark sm:h-auto sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-[16px]"
                >
                  <Truck className="size-[18px] sm:size-5" strokeWidth={2.2} aria-hidden />
                  Vezi flota
                  <ArrowRight className="hidden size-4 sm:block" strokeWidth={2.4} aria-hidden />
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand bg-white px-3 text-[14px] font-extrabold text-brand transition hover:bg-brand-soft sm:h-auto sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-[16px]"
                >
                  <Phone className="size-[18px] sm:size-5" strokeWidth={2.2} aria-hidden />
                  Sună acum
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 sm:-mt-[52px]">
          <FeaturesBar />
        </div>
      </div>

      <div className="h-3 sm:h-8" />
    </section>
  );
}
