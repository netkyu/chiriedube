import { preload } from "react-dom";
import { ArrowRight, MapPin, Phone, Truck } from "lucide-react";
import { contact } from "@/lib/data";
import FeaturesBar from "./FeaturesBar";
import SectionLabel from "./SectionLabel";

export default function Hero() {
  // Mobile LCP: sharp enough 800w (not the mushy 480-only path)
  preload("/images/hero-lcp-800.webp", {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
  });

  return (
    <section id="acasa" className="relative overflow-x-clip bg-white">
      <div className="relative w-full overflow-hidden bg-white sm:h-[520px] lg:h-[560px]">
        <div className="relative h-[min(36vh,250px)] min-h-[160px] sm:absolute sm:inset-y-0 sm:right-0 sm:left-auto sm:h-auto sm:min-h-0 sm:w-[68%] lg:w-[66%]">
          <div className="absolute inset-0">
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet="/images/hero-lcp-640.webp 640w, /images/hero-lcp-800.webp 800w, /images/hero-lcp-960.webp 960w"
                sizes="100vw"
                type="image/webp"
              />
              <img
                src="/images/hero-lcp.webp"
                srcSet="/images/hero-lcp-1200.webp 1200w, /images/hero-lcp.webp 1600w, /images/hero-lcp-2400.webp 2400w"
                sizes="(max-width: 1024px) 70vw, 66vw"
                alt="Dubă ChirieDube pe șosea, la apus, disponibilă pentru închiriere"
                width={1600}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[58%_48%] sm:object-[52%_50%]"
              />
            </picture>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background:
                "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.35) 42%, transparent 62%)",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[36%] sm:block"
            style={{
              background:
                "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.9) 28%, rgba(255,255,255,0.35) 65%, transparent 100%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-14 bg-gradient-to-t from-white/40 to-transparent sm:block" />

        {/* Full-bleed gutters like before — text left, room to breathe, no squeeze into the van */}
        <div className="relative z-10 mx-auto -mt-14 flex w-full max-w-[1400px] px-4 pb-1 sm:mt-0 sm:h-full sm:items-center sm:px-8 sm:pb-24 sm:pt-6 lg:px-10 lg:pb-28">
          <div className="w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[32rem]">
            <SectionLabel icon={MapPin}>
              Închirieri dube în toată România
            </SectionLabel>

            <h1 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-tight text-ink sm:mt-4 sm:text-[2.65rem] lg:text-[3.05rem]">
              Închiriază o dubă{" "}
              <span className="whitespace-nowrap">
                simplu și <span className="text-brand">rapid</span>
              </span>
            </h1>

            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted sm:mt-4 sm:text-[1.05rem] lg:text-[1.125rem]">
              Dube moderne, fiabile și gata de drum pentru mutări, transport
              marfă și proiecte profesionale. Rezervare rapidă, prețuri
              corecte și suport prompt.
            </p>

            <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-7 sm:flex sm:items-center sm:gap-3">
              <a
                href="/flota"
                className="inline-flex h-[40px] items-center justify-center gap-2 rounded-xl bg-brand px-3 text-[13px] font-extrabold text-white transition hover:bg-brand-dark sm:h-auto sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-[15px]"
              >
                <Truck className="size-[16px] sm:size-5" strokeWidth={2.2} aria-hidden />
                Vezi flota
                <ArrowRight className="hidden size-4 sm:block" strokeWidth={2.4} aria-hidden />
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex h-[40px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand bg-white px-3 text-[13px] font-extrabold text-brand transition hover:bg-brand-soft sm:h-auto sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-[15px]"
              >
                <Phone className="size-[16px] sm:size-5" strokeWidth={2.2} aria-hidden />
                Sună acum
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 sm:-mt-[44px]">
          <FeaturesBar />
        </div>
      </div>

      <div className="h-3 sm:h-8" />
    </section>
  );
}
