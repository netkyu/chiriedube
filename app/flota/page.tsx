import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import FleetCatalog from "@/components/FleetCatalog";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Flotă completă",
  description:
    "Vezi toate dubele disponibile pentru închiriere. Filtrează după dimensiune, brand, volum și preț.",
  alternates: { canonical: `${siteConfig.url}/flota` },
  openGraph: {
    title: "Flotă completă — chiriedube.ro",
    description:
      "Compară dubele după dimensiune, brand, volum și preț — rezervă rapid pe WhatsApp.",
    url: `${siteConfig.url}/flota`,
  },
};

export default function FlotaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="border-b border-slate-100 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Reveal variant="clip">
              <a
                href="/#flota"
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-brand transition hover:text-brand-dark"
              >
                <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                Înapoi la pagina principală
              </a>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <h1 className="mt-4 text-[2rem] font-extrabold tracking-tight text-ink sm:text-[2.92rem]">
                Toată <span className="text-brand">flota</span>
              </h1>
            </Reveal>
            <Reveal variant="blur" delay={160}>
              <p className="mt-3 max-w-2xl text-[16px] font-medium leading-relaxed text-muted">
                Compară dubele după dimensiune, brand, volum și preț — apoi
                rezervă rapid pe WhatsApp.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <FleetCatalog />
        </section>
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}
