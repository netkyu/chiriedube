import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Fleet from "@/components/Fleet";
import PriceIncludes from "@/components/PriceIncludes";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import B2BOffer from "@/components/B2BOffer";
import PhoneCTA from "@/components/PhoneCTA";
import PickupReady from "@/components/PickupReady";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/data";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd} />
      <Header />
      <main className="flex-1">
        <Hero />
        <Fleet />
        <PriceIncludes />
        <Services />
        <Team />
        <FAQ />
        <Reviews />
        <PhoneCTA />
        <PickupReady />
        <B2BOffer />
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}
