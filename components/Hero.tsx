import Image from "next/image";
import { ArrowRight, Phone, Truck } from "lucide-react";
import { contact } from "@/lib/data";
import FeaturesBar from "./FeaturesBar";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="acasa" className="relative overflow-x-clip bg-white">
      <div className="relative flex min-h-[520px] w-full flex-col overflow-hidden bg-white sm:block sm:h-[560px] sm:min-h-0 lg:h-[600px]">
        <Reveal
          variant="soft"
          duration={1100}
          className="absolute inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-[75%]"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero-hq-v3.jpg"
              alt="Dubă Mercedes Sprinter disponibilă pentru închiriere"
              fill
              priority
              quality={100}
              className="object-cover object-[55%_40%] sm:object-[55%_55%]"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>
          {/* Mobile: keep photo visible, soft bottom wash for copy */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.96) 22%, rgba(255,255,255,0.72) 42%, rgba(255,255,255,0.2) 68%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[70%] md:block md:w-[42%]"
            style={{
              background:
                "linear-gradient(90deg, #ffffff 0%, #ffffff 18%, rgba(255,255,255,0.92) 32%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.18) 78%, transparent 100%)",
            }}
          />
        </Reveal>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/40 to-transparent" />

        <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1400px] flex-1 items-end px-4 pb-24 pt-20 sm:mt-0 sm:h-full sm:flex-none sm:items-center sm:px-4 sm:pb-28 sm:pt-6 lg:px-5 lg:pb-32">
          <div className="max-w-xl lg:max-w-[42%]">
            <Reveal variant="clip" delay={80}>
              <span className="inline-flex rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-brand sm:px-4 sm:text-[0.8125rem]">
                Închirieri dube în toată România
              </span>
            </Reveal>

            <Reveal variant="up" delay={160} duration={900}>
              <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-4 sm:text-[3.18rem] lg:text-[3.71rem]">
                Închiriază o dubă simplu și{" "}
                <span className="text-brand">rapid</span>
              </h1>
            </Reveal>

            <Reveal variant="blur" delay={280}>
              <p className="mt-3 max-w-lg text-[0.975rem] leading-relaxed text-muted sm:mt-4 sm:text-[1.2rem] lg:text-[1.3rem]">
                Dube moderne, fiabile și gata de drum pentru mutări, transport
                marfă și proiecte profesionale. Rezervare rapidă, prețuri corecte
                și suport prompt.
              </p>
            </Reveal>

            <Reveal variant="up" delay={400}>
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:gap-3">
                <a
                  href="/flota"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand px-5 py-3.5 text-[15px] font-extrabold text-white transition hover:bg-brand-dark sm:px-6 sm:text-[16px]"
                >
                  <Truck className="size-5" strokeWidth={2.2} aria-hidden />
                  Vezi flota
                  <ArrowRight className="size-4" strokeWidth={2.4} aria-hidden />
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-brand bg-white px-5 py-3.5 text-[15px] font-extrabold text-brand transition hover:bg-brand-soft sm:px-6 sm:text-[16px]"
                >
                  <Phone className="size-5" strokeWidth={2.2} aria-hidden />
                  Sună acum
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-[48px] sm:-mt-[52px]">
          <FeaturesBar />
        </div>
      </div>

      <div className="h-7 sm:h-8" />
    </section>
  );
}
