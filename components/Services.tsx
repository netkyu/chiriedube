import Image from "next/image";
import {
  Gauge,
  Handshake,
  LifeBuoy,
  Route,
  UserRound,
  Wrench,
} from "lucide-react";
import { services } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import SectionLabel from "./SectionLabel";
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
      className="py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <SectionLabel icon={Wrench} tone="light">
              Servicii
            </SectionLabel>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="mt-2.5 text-[1.7rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-3 sm:text-[2.92rem]">
              Ce poți închiria{" "}
              <span className="text-brand">și ce mai facem</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-slate-300 sm:mt-3 sm:text-[16px]">
              Autoutilitare, remorci, auto, tractare și asistență în Satu Mare.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={160} duration={800} className="mt-5 overflow-visible sm:mt-8">
          <div className="relative overflow-hidden rounded-[20px] bg-white sm:rounded-[24px] lg:min-h-[320px]">
            <div className="relative z-10 flex flex-col justify-center p-4 sm:p-8 lg:max-w-[52%] lg:pr-6">
              <div className="flex items-center gap-3 sm:block">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white sm:size-12 sm:rounded-2xl">
                  <FeaturedIcon className="size-5 sm:size-6" strokeWidth={2.1} aria-hidden />
                </span>
                <h3 className="text-[1.15rem] font-extrabold leading-tight tracking-tight text-ink sm:mt-4 sm:text-[1.8rem]">
                  {featured.title}
                </h3>
              </div>
              <p className="mt-2 max-w-md text-[13.5px] font-medium leading-relaxed text-muted sm:text-[16px]">
                {featured.description}
              </p>
            </div>

            <div className="relative h-[150px] sm:mt-1 sm:h-[240px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[58%]">
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

        <div className="mt-3 grid gap-2.5 sm:mt-4 sm:auto-rows-fr sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {rest.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal
                key={service.title}
                variant={cardVariants[index % cardVariants.length]}
                delay={120 + index * 100}
                className="sm:h-full"
              >
                {/* Mobile: compact row (icon left). sm+: stacked card. */}
                <div className="flex h-full flex-row items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 sm:flex-col sm:rounded-[20px] sm:p-5 sm:backdrop-blur-sm">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white sm:size-11">
                    <Icon className="size-[18px] sm:size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="text-[14.5px] font-extrabold tracking-tight text-white sm:mt-4 sm:text-[16px]">
                      {service.title}
                    </h3>
                    <p className="mt-1 flex-1 text-[12.5px] font-medium leading-snug text-slate-300 sm:mt-2 sm:text-[14px]">
                      {service.description}
                    </p>
                    {"href" in service && service.href ? (
                      <a
                        href={service.href}
                        className="mt-2 inline-flex min-h-6 items-center text-[12.5px] font-extrabold text-brand transition hover:text-orange-300 sm:mt-3 sm:text-[13px]"
                      >
                        Vezi detalii →
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionBackdrop>
  );
}
