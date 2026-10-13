import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Phone,
  Shield,
  Truck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { contact, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Abonamente de tractare",
  description:
    "Abonamente de tractare în Satu Mare. Contactați-ne pe WhatsApp sau telefon pentru ofertă personalizată.",
  alternates: { canonical: `${siteConfig.url}/abonamente-tractare` },
};

const covers = [
  "Serviciu de tractare pe durata abonamentului",
  "Zonă de acoperire stabilită la contractare",
  "Tarif comunicat înainte de activare",
  "Contract și factură pentru persoane juridice",
];

const steps = [
  {
    n: "01",
    title: "Solicitați oferta",
    detail: "Ne transmiteți tipul vehiculului, zona și perioada dorită.",
  },
  {
    n: "02",
    title: "Confirmați condițiile",
    detail: "Primiți pe WhatsApp sau telefon detaliile și tariful.",
  },
  {
    n: "03",
    title: "Activați abonamentul",
    detail: "Semnați contractul și păstrați datele de contact pentru intervenții.",
  },
];

export default function TowSubscriptionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="relative min-h-[340px] overflow-hidden border-b border-slate-100 sm:min-h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/tow-hero-gradient-v4.jpg"
              alt=""
              fill
              priority
              className="object-cover object-[65%_center]"
              sizes="100vw"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-[72%] sm:w-[58%] lg:w-[48%]"
              style={{
                background:
                  "linear-gradient(90deg, #ffffff 0%, #ffffff 28%, rgba(255,255,255,0.92) 52%, rgba(255,255,255,0.45) 78%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent"
            />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[340px] max-w-7xl flex-col justify-center px-4 py-10 sm:min-h-[400px] sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <Reveal variant="clip">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-brand transition hover:text-brand-dark"
              >
                <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                Înapoi acasă
              </a>
            </Reveal>

            <Reveal variant="clip" delay={40}>
              <div className="mt-6">
                <SectionLabel icon={Truck}>Tractare</SectionLabel>
              </div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <h1 className="mt-3 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.85rem] lg:text-[3.2rem]">
                Abonamente de{" "}
                <span className="text-brand">tractare</span>
              </h1>
            </Reveal>

            <Reveal variant="blur" delay={140}>
              <p className="mt-4 max-w-2xl text-[16px] font-medium leading-relaxed text-muted sm:text-[18px]">
                Oferim abonamente de tractare pe perioade convenite, cu
                acoperire adaptată zonei și tipului de vehicul. Tariful se
                comunică la cerere, după evaluarea datelor transmise.
              </p>
            </Reveal>

            <Reveal variant="up" delay={180}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-[15px] font-extrabold text-white transition hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="size-4" strokeWidth={2.2} aria-hidden />
                  Scrie pe WhatsApp
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-brand/25 bg-white/90 px-6 text-[15px] font-extrabold text-ink backdrop-blur-sm transition hover:border-brand hover:text-brand"
                >
                  <Phone className="size-4 text-brand" strokeWidth={2.4} aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:items-start">
            <Reveal variant="up" delay={80}>
              <div>
                <SectionLabel icon={Shield}>Detalii</SectionLabel>
                <h2 className="mt-3 text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-[1.9rem]">
                  Condiții stabilite la contractare
                </h2>
                <p className="mt-3 max-w-xl text-[15px] font-medium leading-relaxed text-muted sm:text-[16px]">
                  Abonamentul este destinat persoanelor fizice și juridice
                  care doresc acces prioritar la serviciul de tractare.
                  Zona, perioada și tariful se stabilesc înainte de
                  semnare.
                </p>

                <ul className="mt-6 space-y-3.5">
                  {covers.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] font-semibold text-ink sm:text-[16px]"
                    >
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Check className="size-3.5" strokeWidth={2.6} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <div className="rounded-2xl bg-[#F8FAFC] p-5 sm:p-7">
                <SectionLabel icon={Truck}>Cum funcționează</SectionLabel>
                <ol className="mt-5 space-y-5">
                  {steps.map((step) => (
                    <li key={step.n} className="flex gap-3.5">
                      <span className="text-[13px] font-extrabold tracking-[0.08em] text-brand">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-[16px] font-extrabold text-ink">
                          {step.title}
                        </p>
                        <p className="mt-1 text-[14px] font-medium leading-snug text-muted">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-7 border-t border-slate-200/80 pt-5">
                  <p className="text-[14px] font-medium text-muted">
                    Contact telefonic
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 inline-flex items-center gap-2 text-[17px] font-extrabold text-ink transition hover:text-brand"
                  >
                    <Phone className="size-4 text-brand" strokeWidth={2.4} aria-hidden />
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}
