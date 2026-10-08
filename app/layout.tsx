import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { company, contact, siteConfig } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "chiriedube.ro — Închirieri dube în Satu Mare",
    template: "%s | chiriedube.ro",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "chiriedube.ro — Închirieri dube în Satu Mare",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-hq-v3.jpg",
        width: 2560,
        height: 1440,
        alt: "Flota chiriedube.ro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "chiriedube.ro — Închirieri dube în Satu Mare",
    description: siteConfig.description,
    images: ["/images/hero-hq-v3.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: siteConfig.name,
  legalName: company.legalName,
  taxID: company.cif,
  vatID: `RO${company.cif}`,
  url: siteConfig.url,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  image: `${siteConfig.url}/images/hero-hq-v3.jpg`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    addressLocality: company.addressLocality,
    addressRegion: company.addressRegion,
    addressCountry: "RO",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Satu Mare",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={localBusinessLd} />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
