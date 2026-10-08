import Image from "next/image";
import { Mail, Phone, Star, UserRound, Zap } from "lucide-react";
import { team, teamValues } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import Reveal from "./Reveal";

const valueIcons = {
  user: UserRound,
  zap: Zap,
  star: Star,
};

const valueVariants = ["up", "scale", "tilt"] as const;
const cardVariants = ["up", "right", "scale", "left"] as const;

export default function Team() {
  return (
    <SectionBackdrop
      id="despre"
      variant="photo"
      src="/images/bg-depot.jpg"
      overlay="soft"
      className="py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="clip">
          <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-brand">
            Echipa noastră
          </span>
        </Reveal>

        <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-10">
          <div>
            <Reveal variant="left" delay={80}>
              <h2 className="text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[3.02rem] lg:text-[3.34rem]">
                Oamenii din spatele{" "}
                <span className="text-brand">fiecărei închirieri</span>
              </h2>
            </Reveal>
            <Reveal variant="blur" delay={180}>
              <p className="mt-3 max-w-xl text-[15px] font-medium leading-relaxed text-muted sm:text-[16px]">
                Suntem o echipă pasionată, gata să te ajute să găsești rapid duba
                potrivită pentru nevoile tale. Îți oferim consultanță sinceră,
                suport prompt și o experiență de închiriere cât mai simplă și fără
                griji.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-3 sm:gap-5">
            {teamValues.map((value, index) => {
              const Icon = valueIcons[value.icon];
              return (
                <Reveal
                  key={value.title}
                  variant={valueVariants[index % valueVariants.length]}
                  delay={120 + index * 110}
                >
                  <div className="text-left">
                    <Icon
                      className="size-9 text-brand sm:size-10"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <p className="mt-3 text-[17px] font-extrabold leading-snug text-ink sm:text-[18px]">
                      {value.title}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted sm:text-[16px]">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              variant={cardVariants[index % cardVariants.length]}
              delay={100 + index * 110}
              duration={850}
              className="overflow-visible"
            >
              <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
                <div className="relative aspect-[4/3] bg-[#EEF2F7]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[1.2rem] font-extrabold text-ink">
                    {member.name}
                  </h3>
                  <span className="mt-1.5 inline-flex rounded-full bg-brand-soft px-2.5 py-0.5 text-[12px] font-bold text-brand">
                    {member.role}
                  </span>
                  <p className="mt-2 line-clamp-2 text-[14px] font-medium leading-snug text-muted">
                    {member.bio}
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Phone className="size-3.5" strokeWidth={2.4} aria-hidden />
                      </span>
                      {member.phone}
                    </p>
                    <p className="flex items-center gap-2.5 text-[14px] font-extrabold text-ink">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Mail className="size-3.5" strokeWidth={2.4} aria-hidden />
                      </span>
                      <span className="truncate">{member.email}</span>
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionBackdrop>
  );
}