import { CreditCard, FileCheck2, IdCard, MapPin } from "lucide-react";
import { company, contact, pricingRules } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import Reveal from "./Reveal";

const items = [
  {
    icon: IdCard,
    title: "Acte la tine",
    text: `CI / pașaport și permis ${pricingRules.license}. Vârsta minimă: ${pricingRules.minAge} ani.`,
  },
  {
    icon: CreditCard,
    title: "Garanție rambursabilă",
    text: `${pricingRules.depositLei} lei la preluare — returnați după predare, dacă totul e în regulă.`,
  },
  {
    icon: FileCheck2,
    title: "Contract clar",
    text: "Semnăm pe loc: stare dubă, km, combustibil și perioada — fără surprize.",
  },
  {
    icon: MapPin,
    title: "Preluare locală",
    text: `${company.city}, jud. ${company.county}. Stabilim ora pe telefon sau WhatsApp.`,
  },
];

export default function PickupReady() {
  return (
    <SectionBackdrop
      id="preluare"
      variant="white"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-brand">
              Pregătit de drum
            </span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[2.92rem]">
              Ce ai nevoie{" "}
              <span className="text-brand">la preluare</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={160}>
            <p className="mt-3 max-w-xl text-[16px] font-medium leading-relaxed text-muted">
              După ce ne sunți sau ne scrii, rezervarea e simplă. Vino cu
              documentele, semnezi contractul și pleci cu duba.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                variant="up"
                delay={120 + index * 80}
              >
                <div>
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="size-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-extrabold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-medium leading-snug text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="up" delay={280}>
          <p className="mt-10 text-[15px] font-semibold text-ink">
            Ai întrebări înainte?{" "}
            <a
              href={contact.phoneHref}
              className="font-extrabold text-brand transition hover:text-brand-dark"
            >
              {contact.phoneDisplay}
            </a>
            {" · "}
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-brand transition hover:text-brand-dark"
            >
              WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </SectionBackdrop>
  );
}
