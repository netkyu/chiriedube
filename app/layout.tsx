import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import LazyCookieConsent from "@/components/LazyCookieConsent";
import {
  ogImage,
  organizationLd,
  pageOpenGraph,
  pageTwitter,
  websiteLd,
} from "@/lib/seo";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const homeTitle = "chiriedube.ro | Autoutilitare și remorci în Satu Mare";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: "%s | chiriedube.ro",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "DUAL SKYTECH SRL", url: siteConfig.url }],
  creator: "DUAL SKYTECH SRL",
  publisher: "DUAL SKYTECH SRL",
  category: "vehicle rental",
  keywords: [
    "închirieri dube Satu Mare",
    "închirieri remorci",
    "autoutilitare de închiriat",
    "chiriedube",
    "închirieri auto Satu Mare",
  ],
  alternates: {
    canonical: "/",
    languages: { "ro-RO": siteConfig.url },
  },
  openGraph: pageOpenGraph({
    title: homeTitle,
    description: siteConfig.description,
    path: "/",
  }),
  twitter: pageTwitter({
    title: homeTitle,
    description: siteConfig.description,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
  other: {
    "og:image:alt": ogImage.alt,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${plusJakarta.variable} h-full antialiased`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-lcp.webp"
          fetchPriority="high"
          type="image/webp"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        {children}
        <LazyCookieConsent />
      </body>
    </html>
  );
}
