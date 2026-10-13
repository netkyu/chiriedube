import Image from "next/image";
import { Handshake, ShieldCheck, UserRound } from "lucide-react";
import { team } from "@/lib/data";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const points = [
  {
    icon: UserRound,
    title: "Comunicare directă",
    detail:
      "Vorbești direct cu mine, fără intermediari, pentru răspunsuri rapide și clare.",
    tone: "brand" as const,
  },
  {
    icon: ShieldCheck,
    title: "Dube bine întreținute",
    detail:
      "Mă asigur personal că fiecare dubă este curată, verificată și pregătită pentru drum.",
    tone: "ink" as const,
  },
  {
    icon: Handshake,
    title: "Seriozitate și încredere",
    detail:
      "Pun un accent pe corectitudine, respectarea acordurilor și o experiență simplă pentru fiecare client.",
    tone: "brand" as const,
  },
];

export default function Team() {
  const member = team[0];

  return (
    <section
      id="despre"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Soft brand wash — mobile atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-soft/70 to-transparent sm:h-48"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="min-w-0">
          <div className="max-w-[520px]">
            <Reveal variant="up" delay={30}>
              <SectionLabel icon={UserRound}>Despre mine</SectionLabel>
            </Reveal>

            <Reveal variant="up" delay={70} duration={750}>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink sm:text-[2.15rem] lg:text-[2.4rem]">
                Un singur om în spatele{" "}
                <span className="text-brand">fiecărei dube</span>.
              </h2>
            </Reveal>

            <Reveal variant="blur" delay={110}>
              <p className="mt-3.5 text-[14.5px] font-medium leading-[1.7] text-muted sm:mt-4 sm:text-[15.5px]">
                Numele meu este{" "}
                <span className="font-extrabold text-ink">{member.name}</span> și
                mă ocup personal de întreaga activitate de închirieri dube. De
                la întreținerea flotei, până la comunicarea cu clienții și
                livrarea dubei, sunt implicat direct pentru ca totul să fie
                simplu, transparent și fără probleme.
              </p>
            </Reveal>

            <ul className="mt-7 space-y-3.5 sm:mt-9 sm:space-y-4">
              {points.map((point, index) => {
                const Icon = point.icon;
                const isBrand = point.tone === "brand";
                return (
                  <Reveal
                    key={point.title}
                    variant="left"
                    delay={140 + index * 90}
                    duration={650}
                  >
                    <li className="group flex items-start gap-3.5 rounded-2xl border border-transparent bg-transparent p-2.5 transition duration-300 hover:border-brand/15 hover:bg-brand-soft/50 sm:gap-4 sm:p-3">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full transition duration-300 group-hover:scale-105 sm:size-12 ${
                          isBrand
                            ? "bg-brand text-white shadow-[0_8px_20px_rgba(248,104,0,0.28)]"
                            : "bg-ink text-white shadow-[0_8px_20px_rgba(0,31,56,0.22)]"
                        }`}
                      >
                        <Icon
                          className="size-[18px] sm:size-5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p
                          className={`text-[14.5px] font-extrabold leading-tight sm:text-[16px] ${
                            isBrand ? "text-brand" : "text-ink"
                          }`}
                        >
                          {point.title}
                        </p>
                        <p className="mt-1 text-[13px] font-medium leading-snug text-muted sm:text-[14px]">
                          {point.detail}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Photo — sits above features on very small? keep after copy; tighten for mobile */}
        <Reveal
          variant="soft"
          delay={120}
          duration={1000}
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:mx-0 lg:max-w-[440px]"
        >
          <div className="relative mx-auto aspect-square w-[88%] sm:w-[92%] lg:w-full">
            {/* Shape 1 — ink blue */}
            <div
              aria-hidden
              className="despre-shape-a absolute -bottom-[6%] -right-[8%] z-0 size-[86%] rounded-[1.5rem] bg-ink sm:rounded-[2rem] lg:rounded-[2.25rem]"
            />

            {/* Shape 2 — brand orange */}
            <div
              aria-hidden
              className="despre-shape-b absolute -left-[10%] -top-[8%] z-0 size-[54%] rounded-[1.35rem] bg-brand sm:rounded-[1.75rem] lg:rounded-[2rem]"
            />

            {/* Photo */}
            <div className="absolute inset-0 z-[1] overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-[0_18px_40px_rgba(0,31,56,0.14)] sm:rounded-[2rem] lg:rounded-[2.25rem]">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={`${member.name}, administrator ChirieDube`}
                  fill
                  className="object-cover object-[42%_8%] transition duration-700 ease-out will-change-transform hover:scale-[1.03]"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 400px, 440px"
                  quality={100}
                  priority
                />
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
