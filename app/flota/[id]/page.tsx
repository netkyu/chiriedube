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
  if (!van) return { title: "Dubă negăsită" };

  const title = `${van.name} — închiriere din ${van.priceFrom} lei/zi`;
  const description = `${van.description} Volum ${van.volumeM3} m³, dimensiuni ${van.lengthCm}×${van.widthCm}×${van.heightCm} cm. Rezervă pe chiriedube.ro.`;

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
    category: "Închiriere dubă",
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
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <a
              href="/flota"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand transition hover:text-brand-dark"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2.4} aria-hidden />
              Înapoi la flotă
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-6">
            <Reveal variant="up">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                <VanGallery
                  images={van.gallery}
                  vanName={van.name}
                  badge={`${van.sizeLabel} · ${van.year}`}
                />

                <div className="border-t border-slate-100 p-3.5 sm:p-4">
                  <h2 className="text-[14px] font-extrabold text-ink">
                    Specificații
                  </h2>
                  <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Box className="size-3" aria-hidden />
                        Volum
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.volume.replace("Volum: ", "")}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Weight className="size-3" aria-hidden />
                        Sarcină utilă
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.payload.replace("Sarcină utilă: ", "")}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5 sm:col-span-2">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Ruler className="size-3" aria-hidden />
                        Dimensiuni interioare
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.lengthCm} × {van.widthCm} × {van.heightCm} cm
                        <span className="ml-1 text-[11px] font-semibold text-muted">
                          (L × l × Î)
                        </span>
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Users className="size-3" aria-hidden />
                        Locuri & permis
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.seats} · {pricingRules.license}
                      </p>
                    </li>
                    <li className="rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand">
                        <Settings2 className="size-3" aria-hidden />
                        Transmisie
                      </p>
                      <p className="mt-0.5 text-[13px] font-extrabold text-ink">
                        {van.transmission}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal
              variant="right"
              delay={80}
              className="space-y-4 lg:sticky lg:top-24"
            >
              <div>
                <h1 className="text-[1.65rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.1rem]">
                  {van.name}
                </h1>
                <p className="mt-2 text-[14px] font-medium leading-snug text-muted">
                  {van.description}
                </p>
                <p className="mt-2.5 text-[13px] font-semibold text-muted">
                  de la{" "}
                  <span className="text-[1.55rem] font-extrabold text-ink">
                    {van.priceFrom} lei
                  </span>
                  /zi
                </p>
              </div>
              <BookingPanel defaultVanId={van.id} />
            </Reveal>
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
