import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import BookingPanel from "@/components/BookingPanel";
import VanGallery from "@/components/VanGallery";
import VanCompare from "@/components/VanCompare";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import {
  ArrowLeft,
  Box,
  Ruler,
  Settings2,
  Users,
  Weight,
} from "lucide-react";
import {
  fleet,
  getVanById,
  pricingRules,
  siteConfig,
} from "@/lib/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return fleet.map((van) => ({ id: van.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const van = getVanById(id);
  if (!van) return { title: "Vehicul negăsit" };

  const title = `${van.name} | ${van.categoryLabel} din ${van.priceFrom} lei/zi`;
  const description = `${van.description} Rezervă pe chiriedube.ro.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/flota/${van.id}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/flota/${van.id}`,
      images: [{ url: van.image, alt: van.name }],
      type: "website",
      locale: siteConfig.locale,
    },
  };
}

export default async function VanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const van = getVanById(id);
  if (!van) notFound();

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: van.name,
    image: van.gallery.map((item) => `${siteConfig.url}${item.src}`),
    description: van.description,
    brand: { "@type": "Brand", name: van.brand },
    category: van.categoryLabel,
    offers: {
      "@type": "Offer",
      priceCurrency: "RON",
      price: van.priceFrom,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/flota/${van.id}`,
    },
  };

  return (
    <>
      <JsonLd data={productLd} />
      <Header />
      <main className="flex-1 bg-white">
        <section className="border-b border-slate-100 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 sm:py-4 lg:px-8">
            <a
              href="/flota"
              className="inline-flex min-h-[32px] items-center gap-1.5 text-[13px] font-bold text-brand transition hover:text-brand-dark sm:min-h-0"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2.4} aria-hidden />
              Înapoi la flotă
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          {/*
            Mobile (single column, via `contents` wrappers + order):
              title → gallery → booking → specs
            Desktop: gallery+specs in the left column, title+booking (sticky) on the right.
          */}
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-6">
            <div className="contents lg:block lg:overflow-hidden lg:rounded-2xl lg:shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
              <Reveal variant="up" className="order-2 lg:order-none">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)] lg:rounded-b-none lg:border-b-0 lg:shadow-none">
                  <VanGallery
                    images={van.gallery}
                    vanName={van.name}
                    badge={`${van.categoryLabel} · ${van.year}`}
                  />
                </div>
              </Reveal>

              <Reveal variant="up" delay={60} className="order-4 lg:order-none">
                <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-4 lg:rounded-t-none lg:border-t lg:shadow-none">
                  <h2 className="text-[13.5px] font-extrabold text-ink sm:text-[14px]">
                    Specificații
                  </h2>
                  <ul className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-2.5 sm:gap-2">
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Box className="size-3" aria-hidden />
                        Tip
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.volume}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Weight className="size-3" aria-hidden />
                        Detalii
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.payload.replace("Sarcină utilă: ", "")}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5 col-span-2">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Ruler className="size-3" aria-hidden />
                        Dimensiuni
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.heightCm > 0
                          ? `${van.lengthCm} × ${van.widthCm} × ${van.heightCm} cm`
                          : `${van.lengthCm} × ${van.widthCm} cm`}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Users className="size-3" aria-hidden />
                        Locuri / permis
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.category === "remorca"
                          ? "Talon vehicul tractare"
                          : `${van.seats} · ${pricingRules.license}`}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Settings2 className="size-3" aria-hidden />
                        Propulsie / tip
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.transmission}
                      </p>
                    </li>
                    {van.accessories.length > 0 ? (
                      <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5 col-span-2">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                          Accesorii
                        </p>
                        <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                          {van.accessories.join(" · ")}
                        </p>
                      </li>
                    ) : null}
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5 col-span-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        Km & garanție
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.hasKmLimit
                          ? `${pricingRules.kmIncludedPerDay} km/zi · garanție ${van.depositLei} lei (cash)`
                          : `Fără limită km · fără garanție`}
                      </p>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="contents lg:block lg:sticky lg:top-24 lg:space-y-4">
              <Reveal variant="up" className="order-1 lg:order-none">
                <div>
                  <h1 className="text-[1.5rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[2.1rem]">
                    {van.name}
                  </h1>
                  <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-muted sm:mt-2 sm:text-[14px]">
                    {van.description}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-muted sm:mt-2.5">
                    de la{" "}
                    <span className="text-[1.45rem] font-extrabold text-ink sm:text-[1.55rem]">
                      {van.priceFrom} lei
                    </span>
                    /zi
                  </p>
                </div>
              </Reveal>

              <Reveal variant="right" delay={80} className="order-3 lg:order-none">
                <BookingPanel defaultVanId={van.id} />
              </Reveal>
            </div>
          </div>

          <div className="mt-5">
            <Reveal variant="up" delay={100}>
              <VanCompare current={van} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}
