import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, MessageCircle, Phone, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import VanCard from "@/components/VanCard";
import { contact, fleet, siteConfig } from "@/lib/data";
import {
  getServiceArea,
  serviceAreaPath,
  serviceAreas,
} from "@/lib/service-areas";
import {
  absoluteUrl,
  breadcrumbLd,
  fleetItemListLd,
  pageOpenGraph,
  pageTwitter,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ oras: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ oras: area.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { oras } = await params;
  const area = getServiceArea(oras);
  if (!area) return {};

  const title = area.headline;
  const description =
    area.intro.length > 155
      ? `${area.intro.slice(0, 152).trim()}…`
      : area.intro;
  const path = serviceAreaPath(area.slug);

  return {
    title,
    description,
    keywords: [
      `închirieri dube ${area.name}`,
      `închiriere autoutilitare ${area.name}`,
      `remorci de închiriat ${area.name}`,
      `chiriedube ${area.name}`,
      `închirieri dube ${area.county}`,
    ],
    alternates: { canonical: path },
    openGraph: pageOpenGraph({
      title: `${title} | chiriedube.ro`,
      description,
      path,
    }),
    twitter: pageTwitter({
      title: `${title} | chiriedube.ro`,
      description,
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { oras } = await params;
  const area = getServiceArea(oras);
  if (!area) notFound();

  const path = serviceAreaPath(area.slug);
  const otherAreas = serviceAreas.filter((item) => item.slug !== area.slug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: area.headline,
    description: area.intro,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#business` },
    inLanguage: "ro-RO",
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: area.headline,
    serviceType: "Închiriere autoutilitare, remorci și auto",
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: area.county,
      },
    },
    url: absoluteUrl(path),
    description: area.intro,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "RON",
      lowPrice: Math.min(...fleet.map((van) => van.priceFrom)),
      highPrice: Math.max(...fleet.map((van) => van.priceFrom)),
      offerCount: fleet.length,
      url: absoluteUrl("/flota"),
    },
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="border-b border-slate-100 bg-surface/60">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Reveal variant="up">
              <Breadcrumbs
                items={[
                  { label: "Acasă", href: "/" },
                  { label: "Flotă", href: "/flota" },
                  { label: area.name },
                ]}
              />
            </Reveal>

            <Reveal variant="up" delay={80}>
              <SectionLabel icon={MapPin} className="mt-5">
                {area.name}, jud. {area.county} · {area.driveHint}
              </SectionLabel>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <h1 className="mt-3 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem]">
                {area.headline}
              </h1>
            </Reveal>

            <Reveal variant="up" delay={180}>
              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-relaxed text-muted sm:text-[17px]">
                {area.intro}
              </p>
            </Reveal>

            <Reveal variant="up" delay={240}>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-[15px] font-extrabold text-white transition hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="size-5" strokeWidth={2.2} aria-hidden />
                  Rezervă pe WhatsApp
                </a>
                <a
                  href="/flota"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-brand/25 bg-white px-5 text-[15px] font-extrabold text-ink transition hover:border-brand hover:text-brand"
                >
                  <Truck className="size-5" strokeWidth={2.2} aria-hidden />
                  Vezi flota
                  <ArrowRight className="size-4" strokeWidth={2.4} aria-hidden />
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-[15px] font-extrabold text-ink transition hover:border-brand hover:text-brand"
                >
                  <Phone className="size-5" strokeWidth={2.2} aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <Reveal variant="up">
                <h2 className="text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-[1.85rem]">
                  De ce clienții din {area.name} aleg chiriedube.ro
                </h2>
                <p className="mt-3 text-[15px] font-medium leading-relaxed text-muted sm:text-[16px]">
                  {area.whyHere}
                </p>
              </Reveal>

              <Reveal variant="up" delay={100}>
                <h3 className="mt-8 text-[1.15rem] font-extrabold text-ink">
                  Pentru ce se închiriază cel mai des
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {area.useCases.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] font-semibold text-ink sm:text-[15px]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal variant="up" delay={160}>
                <p className="mt-6 rounded-2xl border border-slate-100 bg-surface px-4 py-3.5 text-[13px] font-medium leading-relaxed text-muted sm:text-[14px]">
                  Preluarea standard e la{" "}
                  <span className="font-extrabold text-ink">
                    Str. Fabricii Nr. 29, Satu Mare
                  </span>
                  . Livrarea în {area.name} se discută la rezervare, în funcție
                  de program și disponibilitate.
                </p>
              </Reveal>
            </div>

            <Reveal variant="up" delay={120}>
              <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand">
                  Contact rapid
                </p>
                <p className="mt-2 text-[1.35rem] font-extrabold text-ink">
                  {contact.phoneDisplay}
                </p>
                <p className="mt-1 text-[13px] font-medium text-muted">
                  {contact.hoursShort}
                </p>
                <p className="mt-3 text-[13px] font-medium leading-relaxed text-muted">
                  Rezervare pentru clienți din {area.name}, cu preluare în Satu
                  Mare.
                </p>
                <a
                  href={contact.phoneHref}
                  className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand bg-white text-[14px] font-extrabold text-brand transition hover:bg-brand-soft"
                >
                  <Phone className="size-4" strokeWidth={2.2} aria-hidden />
                  Sună acum
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand text-[14px] font-extrabold text-white transition hover:bg-brand-dark"
                >
                  <MessageCircle className="size-4" strokeWidth={2.2} aria-hidden />
                  WhatsApp
                </a>
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-surface/50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
            <Reveal variant="up">
              <h2 className="text-[1.45rem] font-extrabold tracking-tight text-ink sm:text-[1.7rem]">
                Întrebări frecvente · {area.name}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-3">
              {area.faqs.map((item, index) => (
                <Reveal key={item.question} variant="up" delay={60 + index * 60}>
                  <details className="group rounded-2xl border border-slate-100 bg-white px-4 py-3.5 open:shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                    <summary className="cursor-pointer list-none text-[15px] font-extrabold text-ink marker:content-none">
                      {item.question}
                    </summary>
                    <p className="mt-2.5 text-[14px] font-medium leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Reveal variant="up">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <SectionLabel icon={Truck}>Flota disponibilă</SectionLabel>
                  <h2 className="mt-2 text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-[1.85rem]">
                    Dube, remorci și auto pentru {area.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-[14px] font-medium text-muted sm:text-[15px]">
                    Aceeași flotă ca în Satu Mare. Alege modelul, rezervă pe
                    WhatsApp și ridică vehiculul de la sediu.
                  </p>
                </div>
                <a
                  href="/flota"
                  className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-brand transition hover:text-brand-dark"
                >
                  Toată flota
                  <ArrowRight className="size-4" strokeWidth={2.4} aria-hidden />
                </a>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fleet.map((van, index) => (
                <Reveal
                  key={van.id}
                  variant="up"
                  delay={80 + (index % 6) * 50}
                  className="h-full"
                >
                  <VanCard van={van} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <Reveal variant="up">
              <h2 className="text-[1.2rem] font-extrabold text-ink">
                Alte zone pe care le acoperim
              </h2>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <div className="mt-4 flex flex-wrap gap-2">
                {otherAreas.map((item) => (
                  <a
                    key={item.slug}
                    href={serviceAreaPath(item.slug)}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition hover:border-brand hover:text-brand"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/"
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition hover:border-brand hover:text-brand"
                >
                  Satu Mare
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ContactCTA />
      <JsonLd data={webPageLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Acasă", path: "/" },
          { name: "Flotă", path: "/flota" },
          { name: area.headline, path },
        ])}
      />
      <JsonLd data={faqLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={fleetItemListLd()} />
    </>
  );
}
