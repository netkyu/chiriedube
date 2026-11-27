import { Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Fleet from "@/components/Fleet";
import PriceIncludes from "@/components/PriceIncludes";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import PhoneCTA from "@/components/PhoneCTA";
import PickupReady from "@/components/PickupReady";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import { faqAnswerText, faqs } from "@/lib/data";
import { fleetItemListLd } from "@/lib/seo";

const FAQ = dynamic(() => import("@/components/FAQ"));
const B2BOffer = dynamic(() => import("@/components/B2BOffer"));
const Footer = dynamic(() => import("@/components/Footer"));

/** Cache homepage HTML so TTFB stays low; refresh reviews periodically. */
export const revalidate = 300;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqAnswerText(item),
    },
  })),
};

function ReviewsFallback() {
  return (
    <section
      id="recenzii"
      className="relative overflow-x-clip bg-white py-16 sm:py-20 lg:py-24"
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Fleet />
        <PriceIncludes />
        <Services />
        <Team />
        <FAQ />
        <Suspense fallback={<ReviewsFallback />}>
          <Reviews />
        </Suspense>
        <PhoneCTA />
        <PickupReady />
        <B2BOffer />
      </main>
      <Footer />
      <ContactCTA />
      <JsonLd data={faqLd} />
      <JsonLd data={fleetItemListLd()} />
    </>
  );
}
