import Image from "next/image";
import {
  Gauge,
  Handshake,
  LifeBuoy,
  Route,
  UserRound,
} from "lucide-react";
import { services } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import Reveal from "./Reveal";

const icons = {
  driver: UserRound,
  tow: Route,
  roadside: LifeBuoy,
  consult: Handshake,
  km: Gauge,
};

const cardVariants = ["up", "right", "scale", "left"] as const;

export default function Services() {
  const [featured, ...rest] = services;
  const FeaturedIcon = icons[featured.icon];

  return (
    <SectionBackdrop
      id="servicii"
      variant="dark"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-orange-100">
              Servicii complete
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.92rem]">
              Tot ce ai nevoie,{" "}
              <span className="text-brand">clar de la început</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <p className="mt-3 text-[16px] font-medium leading-relaxed text-slate-300">
              Opțiuni și suport pentru transport — fără costuri sau condiții
              ascunse.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={160} duration={800} className="mt-8 overflow-visible">
          <div className="relative overflow-hidden rounded-[24px] bg-white lg:min-h-[320px]">
            <div className="relative z-10 flex flex-col justify-center p-5 sm:p-8 lg:max-w-[52%] lg:pr-6">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-white">
                <FeaturedIcon className="size-6" strokeWidth={2.1} aria-hidden />
              </span>
              <h3 className="mt-4 text-[1.4rem] font-extrabold tracking-tight text-ink sm:text-[1.8rem]">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-md text-[15px] font-medium leading-relaxed text-muted sm:text-[16px]">
                {featured.description}
              </p>
            </div>

            <div className="relative mt-1 h-[210px] sm:h-[240px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[58%]">
              <Image
                src="/images/service-driver-wide-v7.jpg"
                alt="Închiriere cu sau fără șofer"
                fill
                className="object-cover object-[72%_center]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-[45%] bg-gradient-to-r from-white via-white/80 to-transparent lg:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent lg:hidden"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal
                key={service.title}
                variant={cardVariants[index % cardVariants.length]}
                delay={120 + index * 100}
              >
                <div className="flex h-full flex-col rounded-[20px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[16px] font-extrabold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] font-medium leading-snug text-slate-300">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionBackdrop>
  );
}
