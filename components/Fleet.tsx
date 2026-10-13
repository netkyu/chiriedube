import { ArrowRight, Truck } from "lucide-react";
import SectionBackdrop from "./SectionBackdrop";
import HowItWorks from "./HowItWorks";
import FleetCarousel from "./FleetCarousel";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Fleet() {
  return (
    <SectionBackdrop
      id="flota"
      variant="white"
      className="pt-10 pb-8 sm:pt-20 sm:pb-10"
    >
      <div id="preturi" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal variant="clip">
              <SectionLabel icon={Truck}>Flota noastră</SectionLabel>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h2 className="mt-2.5 text-[1.7rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:mt-4 sm:text-[3.02rem] lg:text-[3.45rem]">
                Ce poți{" "}
                <span className="text-brand">închiria</span>
              </h2>
            </Reveal>
            <Reveal variant="blur" delay={200}>
              <p className="mt-2 max-w-xl text-[14px] font-medium leading-relaxed text-muted sm:mt-3 sm:text-[1.0625rem]">
                Autoutilitare, remorci și auto. Prețuri clare și rezervare pe
                WhatsApp.
              </p>
            </Reveal>
          </div>
          <Reveal variant="right" delay={180} className="hidden sm:block">
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

      <div className="mx-auto mt-5 max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <Reveal variant="up" delay={120} duration={700} className="overflow-visible">
          <FleetCarousel />
        </Reveal>
        <Reveal variant="up" delay={220}>
          <p className="mt-3 text-center text-[12px] font-medium italic text-muted sm:mt-5 sm:text-[14px]">
            *Mașinile pot să difere față de imagini.
          </p>
        </Reveal>
        {/* Mobile: the "all fleet" CTA reads better after the cards */}
        <Reveal variant="up" delay={120} className="mt-4 sm:hidden">
          <a
            href="/flota"
            className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[14px] font-extrabold text-white transition hover:bg-brand-dark"
          >
            Vezi toată flota
            <ArrowRight className="size-4" strokeWidth={2.6} aria-hidden />
          </a>
        </Reveal>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <HowItWorks />
      </div>
    </SectionBackdrop>
  );
}
