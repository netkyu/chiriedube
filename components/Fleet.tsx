import { ArrowRight } from "lucide-react";
import SectionBackdrop from "./SectionBackdrop";
import HowItWorks from "./HowItWorks";
import FleetCarousel from "./FleetCarousel";
import Reveal from "./Reveal";

export default function Fleet() {
  return (
    <SectionBackdrop
      id="flota"
      variant="white"
      className="pt-16 pb-10 sm:pt-20"
    >
      <div id="preturi" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal variant="clip">
              <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-brand">
                Flotă modernă și fiabilă
              </span>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-tight text-ink sm:text-[3.02rem] lg:text-[3.45rem]">
                Dube disponibile pentru{" "}
                <span className="text-brand">închiriere</span>
              </h2>
            </Reveal>
            <Reveal variant="blur" delay={200}>
              <p className="mt-3 max-w-xl text-[15px] font-medium leading-relaxed text-muted sm:text-[1.0625rem]">
                Alege din flota noastră de dube moderne, potrivite pentru orice tip
                de transport. Prețuri corecte, fără costuri ascunse și rezervare
                rapidă.
              </p>
            </Reveal>
          </div>
          <Reveal variant="right" delay={180}>
            <a
              href="/flota"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-[15px] font-extrabold text-white transition hover:bg-brand-dark sm:w-auto"
            >
              Vezi toată flota
              <ArrowRight className="size-4" strokeWidth={2.6} aria-hidden />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <Reveal variant="up" delay={120} duration={700} className="overflow-visible">
          <FleetCarousel />
        </Reveal>
        <Reveal variant="up" delay={220}>
          <p className="mt-5 text-center text-[14px] font-medium italic text-muted">
            *Mașinile pot să difere față de imagini.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <HowItWorks />
      </div>
    </SectionBackdrop>
  );
}
