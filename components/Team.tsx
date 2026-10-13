import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { contact, team } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Suni sau scrii",
    detail: "Îmi spui perioada și ce ai de mutat.",
  },
  {
    n: "02",
    title: "Confirmăm vehiculul",
    detail: "Îți spun ce e liber și cât costă.",
  },
  {
    n: "03",
    title: "Predare rapidă",
    detail: "Vii pe Fabricii 29 și pleci.",
  },
];

const proofs = ["Flotă proprie", "Contract și factură", "Predare în Satu Mare"];

export default function Team() {
  const member = team[0];

  return (
    <section
      id="despre"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-[#FFF3E8] to-white"
      />

      <p
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-[-2%] z-0 hidden select-none whitespace-nowrap text-[6rem] font-extrabold leading-none tracking-[-0.04em] text-brand/[0.08] lg:block xl:right-0 xl:text-[7rem]"
      >
        SATU MARE
      </p>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:gap-12 lg:px-8 xl:gap-14">
        <Reveal variant="up" duration={700}>
          <div>
            <SectionLabel icon={UserRound}>Despre</SectionLabel>

            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.45rem] lg:text-[2.75rem]">
              Vorbești direct cu{" "}
              <span className="text-brand">{member.name}</span>.
            </h2>

            <p className="mt-3 max-w-2xl text-[16px] font-medium leading-relaxed text-muted sm:text-[17.5px]">
              {member.bio}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={contact.phoneHref}
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-extrabold text-white transition hover:bg-brand-dark sm:w-auto"
              >
                <Phone className="size-4" strokeWidth={2.4} aria-hidden />
                {member.phone}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 text-[15px] font-extrabold text-ink transition hover:text-brand sm:w-auto sm:justify-start"
              >
                <MessageCircle
                  className="size-4 text-brand"
                  strokeWidth={2.4}
                  aria-hidden
                />
                Scrie pe WhatsApp
              </a>
            </div>

            <ol className="mt-7 grid gap-4 border-t border-ink/10 pt-5 sm:mt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-ink/10">
              {steps.map((step) => (
                <li key={step.n} className="sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  <p className="text-[13px] font-extrabold tracking-[0.08em] text-brand">
                    {step.n}
                  </p>
                  <p className="mt-1 text-[15px] font-extrabold leading-snug text-ink sm:text-[16px]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[13.5px] font-medium leading-snug text-muted sm:text-[14px]">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {proofs.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted"
                >
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2.5 border-t border-ink/8 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-muted transition hover:text-brand"
              >
                <Mail className="size-4 text-brand" strokeWidth={2.2} aria-hidden />
                {member.email}
              </a>
              <p className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-muted">
                <MapPin className="size-4 text-brand" strokeWidth={2.2} aria-hidden />
                {contact.location}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal
          variant="scale"
          delay={100}
          duration={900}
          className="mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:mx-0 lg:w-full lg:max-w-none"
        >
          <figure className="relative mx-auto w-full lg:mx-0">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-5 rounded-[32px] bg-[radial-gradient(circle_at_55%_35%,rgba(248,104,0,0.16),transparent_68%)]"
            />
            <div
              aria-hidden
              className="absolute -bottom-2 -right-2 top-6 left-6 rounded-[22px] bg-brand/12"
            />
            <div className="relative overflow-hidden rounded-[22px] bg-[#EEF2F7] shadow-[0_16px_36px_rgba(0,31,56,0.11)]">
              <div className="relative aspect-[4/5]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} ChirieDube`}
                    fill
                    className="object-cover object-[50%_12%]"
                    sizes="(max-width: 1024px) 100vw, 540px"
                  />
                ) : null}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/45 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-1.5 bg-brand"
                />
              </div>
              <figcaption className="bg-white px-4 py-3.5 text-center">
                <p className="text-[16px] font-extrabold leading-none text-ink">
                  {member.name}
                </p>
                <p className="mt-1.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-brand">
                  {member.role}
                </p>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
