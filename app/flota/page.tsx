import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import FleetCatalog from "@/components/FleetCatalog";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbLd,
  fleetItemListLd,
  pageOpenGraph,
  pageTwitter,
} from "@/lib/seo";

const title = "Flotă";
const description =
  "Autoutilitare, remorci și auto de închiriat în Satu Mare. Filtrează după categorie, brand și preț. Rezervare pe WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/flota" },
  openGraph: pageOpenGraph({
    title: `${title} | chiriedube.ro`,
    description,
    path: "/flota",
  }),
  twitter: pageTwitter({
    title: `${title} | chiriedube.ro`,
    description,
  }),
};

export default function FlotaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Acasă", path: "/" },
          { name: "Flotă", path: "/flota" },
        ])}
      />
      <JsonLd data={fleetItemListLd()} />
      <Header />
      <main className="flex-1 bg-white">
        <section className="border-b border-slate-100 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-12 lg:px-8">
            <Reveal variant="clip">
              <Breadcrumbs
                items={[
                  { label: "Acasă", href: "/" },
                  { label: "Flotă" },
                ]}
              />
            </Reveal>
            <Reveal variant="clip" delay={40}>
              <a
                href="/#flota"
                className="mt-3 inline-flex min-h-[25px] items-center gap-1.5 text-[9px] font-bold text-brand transition hover:text-brand-dark sm:min-h-0 sm:text-[10px]"
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
              <p className="mt-1.5 max-w-2xl text-[10px] font-medium leading-relaxed text-muted sm:mt-3 sm:text-[11px]">
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
