import { company, contact, fleet, siteConfig } from "@/lib/data";

type FleetVan = (typeof fleet)[number];

function productUrl(van: FleetVan) {
  return absoluteUrl(`/flota/${van.id}`);
}

function rentalOfferLd(van: FleetVan) {
  const url = productUrl(van);
  const year = new Date().getFullYear();
  const today = new Date().toISOString().slice(0, 10);

  return {
    "@type": "Offer" as const,
    url,
    price: van.priceFrom,
    priceCurrency: "RON",
    priceValidUntil: `${year}-12-31`,
    validFrom: today,
    availability: "https://schema.org/InStoreOnly",
    itemCondition: "https://schema.org/UsedCondition",
    businessFunction: "https://purl.org/goodrelations/v1#LeaseOut",
    seller: {
      "@type": "Organization" as const,
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    // Local pickup only (rental at Satu Mare) — satisfies merchant listing checks
    shippingDetails: {
      "@type": "OfferShippingDetails" as const,
      shippingRate: {
        "@type": "MonetaryAmount" as const,
        value: 0,
        currency: "RON",
      },
      shippingDestination: {
        "@type": "DefinedRegion" as const,
        addressCountry: "RO",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime" as const,
        handlingTime: {
          "@type": "QuantitativeValue" as const,
          minValue: 0,
          maxValue: 1,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue" as const,
          minValue: 0,
          maxValue: 0,
          unitCode: "DAY",
        },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy" as const,
      applicableCountry: "RO",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    },
  };
}

/** Single Product definition per vehicle — reuse by @id elsewhere to avoid duplicates. */
export function productOfferLd(van: FleetVan) {
  const url = productUrl(van);
  return {
    "@type": "Product" as const,
    "@id": `${url}#product`,
    name: van.name,
    sku: van.id,
    url,
    image: absoluteUrl(van.image),
    description: van.description,
    brand: {
      "@type": "Brand" as const,
      name: van.brand,
    },
    category: van.categoryLabel,
    offers: rentalOfferLd(van),
  };
}

export const ogImage = {
  url: "/images/hero-hq-v20.jpg",
  width: 2560,
  height: 1440,
  alt: "Flota chiriedube.ro — autoutilitare și remorci în Satu Mare",
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? siteConfig.url : `${siteConfig.url}${normalized}`;
}

export function pageOpenGraph({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path: string;
  images?: { url: string; alt?: string; width?: number; height?: number }[];
}) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website" as const,
    images: (images ?? [ogImage]).map((img) => ({
      url: img.url.startsWith("http") ? img.url : absoluteUrl(img.url),
      alt: img.alt ?? ogImage.alt,
      width: img.width ?? ogImage.width,
      height: img.height ?? ogImage.height,
    })),
  };
}

export function pageTwitter({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images?: string[];
}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: images ?? [ogImage.url],
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: "ChirieDube",
    legalName: company.legalName,
    taxID: company.cif,
    vatID: `RO${company.cif}`,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logo-chiriedube-v2.png"),
    image: absoluteUrl(ogImage.url),
    description: siteConfig.description,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    priceRange: "$$",
    currenciesAccepted: "RON",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    openingHours: [...contact.openingHours],
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      addressLocality: company.addressLocality,
      addressRegion: company.addressRegion,
      postalCode: company.postalCode,
      addressCountry: "RO",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Satu Mare" },
      { "@type": "Country", name: "România" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phoneHref.replace("tel:", ""),
        contactType: "customer service",
        areaServed: "RO",
        availableLanguage: ["Romanian"],
        email: contact.email,
      },
    ],
    // Reference products by @id only — full Product lives in fleetItemListLd
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flota chiriedube.ro",
      itemListElement: fleet.map((van, index) => ({
        "@type": "Offer",
        position: index + 1,
        url: productUrl(van),
        price: van.priceFrom,
        priceCurrency: "RON",
        availability: "https://schema.org/InStoreOnly",
        itemOffered: { "@id": `${productUrl(van)}#product` },
      })),
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "ro-RO",
    publisher: { "@id": `${siteConfig.url}/#business` },
  };
}

export function breadcrumbLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function fleetItemListLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Flota chiriedube.ro",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: fleet.length,
    itemListElement: fleet.map((van, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productOfferLd(van),
    })),
  };
}

export function serviceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Abonamente de tractare",
    serviceType: "Towing subscription",
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Satu Mare",
    },
    description:
      "Abonamente de tractare în Satu Mare. Ofertă personalizată pe WhatsApp sau telefon.",
    url: absoluteUrl("/abonamente-tractare"),
  };
}
