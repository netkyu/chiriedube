import { CreditCard, FileCheck2, IdCard, KeyRound, MapPin } from "lucide-react";
import { company, contact, pricingRules } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const items = [
  {
    icon: IdCard,
    title: "Acte la tine",
    text: `CI / pașaport și permis ${pricingRules.license}. Vârsta minimă: ${pricingRules.minAge} ani. La remorci: talonul mașinii de tractare.`,
  },
  {
    icon: CreditCard,
    title: "Garanție (doar cash)",
    text: `${pricingRules.depositVehicleLei} lei pentru autoutilitare/autoturisme. Remorcile: fără garanție. Restul plății: card, cash sau OP.`,
  },
  {
    icon: FileCheck2,
    title: "Contract clar",
    text: "Semnăm pe loc: stare vehicul, km, combustibil și perioada, fără surprize.",
  },
  {
    icon: MapPin,
    title: "Preluare locală",
    text: `${company.address}. Stabilim ora pe telefon sau WhatsApp.`,
  },
];

export default function PickupReady() {
  return (
    <SectionBackdrop
      id="preluare"
      variant="white"
      className="py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <SectionLabel icon={KeyRound}>Pregătit de drum</SectionLabel>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="mt-2.5 text-[1.7rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-3 sm:text-[2.92rem]">
              Ce ai nevoie{" "}
              <span className="text-brand">la preluare</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={160}>
            <p className="mt-2 max-w-xl text-[14px] font-medium leading-relaxed text-muted sm:mt-3 sm:text-[16px]">
              După ce ne sunți sau ne scrii, rezervarea e simplă. Vino cu
              documentele, semnezi contractul și pleci.
            </p>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                variant="up"
                delay={120 + index * 80}
              >
                {/* Mobile: icon-left row. sm+: stacked. */}
                <div className="flex items-start gap-3 sm:block">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white sm:size-11">
                    <Icon className="size-[18px] sm:size-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14.5px] font-extrabold text-ink sm:mt-4 sm:text-[1.05rem]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-muted sm:mt-1.5 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="up" delay={280}>
          <p className="mt-6 text-[14px] font-semibold text-ink sm:mt-10 sm:text-[15px]">
            Vrei să verifici ceva înainte?{" "}
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-8 items-center font-extrabold text-brand transition hover:text-brand-dark"
            >
              {contact.phoneDisplay}
            </a>
            {" · "}
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-8 items-center font-extrabold text-brand transition hover:text-brand-dark"
            >
              WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </SectionBackdrop>
  );
}
