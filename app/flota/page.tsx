import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import FleetCatalog from "@/components/FleetCatalog";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Flotă",
  description:
    "Autoutilitare, remorci și auto de închiriat în Satu Mare. Filtrează după categorie, brand și preț.",
  alternates: { canonical: `${siteConfig.url}/flota` },
  openGraph: {
    title: "Flotă | chiriedube.ro",
    description:
      "Autoutilitare, remorci și auto. Rezervare pe WhatsApp.",
    url: `${siteConfig.url}/flota`,
  },
};

export default function FlotaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="border-b border-slate-100 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-12 lg:px-8">
            <Reveal variant="clip">
              <a
                href="/#flota"
                className="inline-flex min-h-[36px] items-center gap-1.5 text-[13px] font-bold text-brand transition hover:text-brand-dark sm:min-h-0 sm:text-[14px]"
              >
                <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                Înapoi la pagina principală
              </a>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <h1 className="mt-2 text-[1.7rem] font-extrabold tracking-tight text-ink sm:mt-4 sm:text-[2.92rem]">
                Toată <span className="text-brand">flota</span>
              </h1>
            </Reveal>
            <Reveal variant="blur" delay={160}>
              <p className="mt-1.5 max-w-2xl text-[14px] font-medium leading-relaxed text-muted sm:mt-3 sm:text-[16px]">
                Filtrează după categorie și preț, apoi rezervă pe WhatsApp.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <FleetCatalog />
        </section>
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}
