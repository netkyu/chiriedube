export const company = {
  legalName: "DUAL SKYTECH SRL",
  brandName: "chiriedube.ro",
  cif: "46952425",
  regCom: "J2022001150300",
  street: "Str. Nicolae Bălcescu, Nr. 54",
  city: "Ardud",
  county: "Satu Mare",
  country: "România",
  address: "Str. Nicolae Bălcescu, Nr. 54, Ardud, Jud. Satu Mare",
  addressLocality: "Ardud",
  addressRegion: "Satu Mare",
  postalCode: "",
  iban: "RO34RNCB0221178304450001",
  bank: "Banca Comercială Română",
  /** Data ultimei actualizări a documentelor legale */
  legalUpdated: "6 octombrie 2026",
  legalUpdatedIso: "2026-10-06",
};

export const contact = {
  phoneDisplay: "0770 123 456",
  phoneHref: "tel:+40770123456",
  whatsappNumber: "40770123456",
  whatsappHref: "https://wa.me/40770123456",
  email: "contact@chiriedube.ro",
  privacyEmail: "contact@chiriedube.ro",
  location: "Ardud, Jud. Satu Mare",
  address: company.address,
};

export const siteConfig = {
  name: "chiriedube.ro",
  url: "https://chiriedube.ro",
  locale: "ro_RO",
  description:
    "Închiriază o dubă simplu și rapid în Satu Mare. Flotă modernă, cu sau fără șofer, prețuri transparente și suport prompt. Operat de DUAL SKYTECH SRL.",
};

export const legalLinks = [
  {
    href: "/termeni-si-conditii",
    label: "Termeni și condiții",
  },
  {
    href: "/politica-de-confidentialitate",
    label: "Confidențialitate",
  },
  {
    href: "/politica-cookies",
    label: "Cookies",
  },
] as const;

export const pricingRules = {
  kmIncludedPerDay: 200,
  extraKmLei: 0.8,
  depositLei: 800,
  fuelPolicy: "Plin la preluare / plin la predare",
  insurance: "RCA inclus · CASCO opțional",
  minAge: 21,
  license: "Categoria B",
  /** Discount by rental length */
  tiers: [
    { minDays: 1, maxDays: 2, discount: 0, label: "Tarif standard" },
    { minDays: 3, maxDays: 6, discount: 0.1, label: "−10% (3–6 zile)" },
    { minDays: 7, maxDays: 365, discount: 0.2, label: "−20% (7+ zile)" },
  ],
};

export const priceIncludes = [
  {
    title: "RCA inclus",
    detail: "Asigurarea RCA e acoperită din tariful zilnic — fără linie separată pe factură.",
    value: "Inclus",
  },
  {
    title: "200 km / zi",
    detail: "Kilometrii se adună pe toată perioada. Ex.: 3 zile = 600 km incluși.",
    value: "200 km/zi",
  },
  {
    title: "Garanție rambursabilă",
    detail: "Depozit bloctat la preluare, returnat integral dacă duba revine în stare bună.",
    value: "800 lei",
  },
  {
    title: "Combustibil plin / plin",
    detail: "Preluezi cu rezervorul plin și predai la fel — fără taxe ascunse de realimentare.",
    value: "Plin/plin",
  },
  {
    title: "Permis categoria B",
    detail: "Toate dubele din flotă se conduc cu permis B. Vârsta minimă: 21 de ani.",
    value: "Cat. B",
  },
  {
    title: "Asistență Satu Mare",
    detail: "Asistență rutieră gratuită pe tot județul. În afara județului te ghidăm către opțiuni.",
    value: "Gratis SM",
  },
];

export const priceExtras = [
  {
    title: "Extra-kilometri",
    detail: "Doar dacă depășești pachetul inclus.",
    value: "0,80 lei/km",
  },
  {
    title: "Șofer profesionist",
    detail: "Opțional, pe oră sau pe zi — comunicat înainte.",
    value: "la cerere",
  },
  {
    title: "CASCO extins",
    detail: "Acoperire suplimentară pentru liniște maximă.",
    value: "opțional",
  },
  {
    title: "Al doilea șofer",
    detail: "Poți adăuga un șofer secundar pe contract.",
    value: "la cerere",
  },
];

export const priceExample = {
  vanName: "Mercedes Sprinter",
  days: 3,
  daily: 220,
  discountLabel: "−10% (3–6 zile)",
  discountLei: 66,
  total: 594,
  kmIncluded: 600,
  note: "Exemplu estimativ — fără garanție și fără extra-km.",
};

export const navLinks = [
  { href: "/#acasa", label: "Acasă", subtitle: "Începe de aici" },
  { href: "/flota", label: "Flotă", subtitle: "Dubele noastre" },
  { href: "/#servicii", label: "Servicii", subtitle: "Ce putem face" },
  { href: "/#despre", label: "Echipă", subtitle: "Cine suntem" },
  { href: "/#faq", label: "FAQ", subtitle: "Întrebări frecvente" },
  { href: "/#recenzii", label: "Recenzii", subtitle: "Ce zic clienții" },
  { href: "/#contact", label: "B2B", subtitle: "Oferte pentru firme" },
];

export const features = [
  {
    title: "Cu sau fără șofer",
    description: "Conduci tu, în deplină\nlibertate",
    icon: "rocket" as const,
  },
  {
    title: "Prețuri transparente",
    description: "Fără costuri\nascunse",
    icon: "coins" as const,
  },
  {
    title: "Asistență rapidă",
    description: "Răspundem prompt la orice\nîntrebare",
    icon: "headset" as const,
  },
  {
    title: "Disponibilitate imediată",
    description: "Dube pregătite\nde drum",
    icon: "clock" as const,
  },
];

export const fleet = [
  {
    id: "transit",
    name: "Ford Transit",
    brand: "Ford",
    image: "/images/fleet-transit-v3.jpg",
    gallery: [
      { src: "/images/fleet-transit-v3.jpg", label: "Exterior 3/4", alt: "vedere exterior" },
      { src: "/images/fleet-transit-side-v3.jpg", label: "Profil lateral", alt: "profil lateral" },
      { src: "/images/fleet-transit-rear-v3.jpg", label: "Spate", alt: "vedere spate" },
      { src: "/images/fleet-transit-cargo.jpg", label: "Interior cargo", alt: "interior portbagaj" },
    ],
    volume: "Volum: 10–11 m³",
    volumeM3: 11,
    payload: "Sarcină utilă: 1.200 kg",
    payloadKg: 1200,
    seats: "3 locuri",
    transmission: "Manuală / Diesel",
    priceFrom: 180,
    size: "mica" as const,
    sizeLabel: "Mică",
    lengthCm: 290,
    widthCm: 170,
    heightCm: 170,
    year: 2022,
    description:
      "Dubă compactă, agilă în oraș — ideală pentru mutări mici, livrări și transport mobilier ușor.",
  },
  {
    id: "sprinter",
    name: "Mercedes Sprinter",
    brand: "Mercedes",
    image: "/images/fleet-sprinter-v3.jpg",
    gallery: [
      { src: "/images/fleet-sprinter-v3.jpg", label: "Exterior 3/4", alt: "vedere exterior" },
      { src: "/images/fleet-sprinter-side-v3.jpg", label: "Profil lateral", alt: "profil lateral" },
      { src: "/images/fleet-sprinter-rear-v3.jpg", label: "Spate", alt: "vedere spate" },
      { src: "/images/fleet-sprinter-cargo.jpg", label: "Interior cargo", alt: "interior portbagaj" },
    ],
    volume: "Volum: 14–15 m³",
    volumeM3: 15,
    payload: "Sarcină utilă: 1.400 kg",
    payloadKg: 1400,
    seats: "3 locuri",
    transmission: "Manuală / Diesel",
    priceFrom: 220,
    size: "mare" as const,
    sizeLabel: "Mare",
    lengthCm: 340,
    widthCm: 178,
    heightCm: 190,
    year: 2023,
    description:
      "Sprinter spațios pentru mutări complete sau transport marfă pe distanțe medii și lungi.",
  },
  {
    id: "crafter",
    name: "VW Crafter",
    brand: "Volkswagen",
    image: "/images/fleet-crafter-v3.jpg",
    gallery: [
      { src: "/images/fleet-crafter-v3.jpg", label: "Exterior 3/4", alt: "vedere exterior" },
      { src: "/images/fleet-crafter-side-v3.jpg", label: "Profil lateral", alt: "profil lateral" },
      { src: "/images/fleet-crafter-rear-v3.jpg", label: "Spate", alt: "vedere spate" },
      { src: "/images/fleet-crafter-cargo.jpg", label: "Interior cargo", alt: "interior portbagaj" },
    ],
    volume: "Volum: 16–17 m³",
    volumeM3: 17,
    payload: "Sarcină utilă: 1.500 kg",
    payloadKg: 1500,
    seats: "3 locuri",
    transmission: "Manuală / Diesel",
    priceFrom: 240,
    size: "mare" as const,
    sizeLabel: "Mare",
    lengthCm: 370,
    widthCm: 180,
    heightCm: 200,
    year: 2023,
    description:
      "Cel mai încăpător din flotă — perfect pentru volume mari, paleți și proiecte profesionale.",
  },
  {
    id: "daily",
    name: "Iveco Daily",
    brand: "Iveco",
    image: "/images/fleet-daily-v3.jpg",
    gallery: [
      { src: "/images/fleet-daily-v3.jpg", label: "Exterior 3/4", alt: "vedere exterior" },
      { src: "/images/fleet-daily-side-v3.jpg", label: "Profil lateral", alt: "profil lateral" },
      { src: "/images/fleet-daily-rear-v3.jpg", label: "Spate", alt: "vedere spate" },
      { src: "/images/fleet-daily-cargo.jpg", label: "Interior cargo", alt: "interior portbagaj" },
    ],
    volume: "Volum: 12–13 m³",
    volumeM3: 13,
    payload: "Sarcină utilă: 1.300 kg",
    payloadKg: 1300,
    seats: "3 locuri",
    transmission: "Manuală / Diesel",
    priceFrom: 200,
    size: "medie" as const,
    sizeLabel: "Medie",
    lengthCm: 310,
    widthCm: 175,
    heightCm: 180,
    year: 2021,
    description:
      "Echilibru bun între volum și manevrabilitate — potrivită pentru mutări de apartament.",
  },
  {
    id: "master",
    name: "Renault Master",
    brand: "Renault",
    image: "/images/fleet-master-v3.jpg",
    gallery: [
      { src: "/images/fleet-master-v3.jpg", label: "Exterior 3/4", alt: "vedere exterior" },
      { src: "/images/fleet-master-side-v3.jpg", label: "Profil lateral", alt: "profil lateral" },
      { src: "/images/fleet-master-rear-v3.jpg", label: "Spate", alt: "vedere spate" },
      { src: "/images/fleet-master-cargo.jpg", label: "Interior cargo", alt: "interior portbagaj" },
    ],
    volume: "Volum: 13–14 m³",
    volumeM3: 14,
    payload: "Sarcină utilă: 1.350 kg",
    payloadKg: 1350,
    seats: "3 locuri",
    transmission: "Manuală / Diesel",
    priceFrom: 210,
    size: "medie" as const,
    sizeLabel: "Medie",
    lengthCm: 320,
    widthCm: 176,
    heightCm: 185,
    year: 2022,
    description:
      "Dubă versatilă pentru marfă și mutări, cu spațiu generos și consum rezonabil.",
  },
  {
    id: "ducato",
    name: "Fiat Ducato",
    brand: "Fiat",
    image: "/images/fleet-ducato-v3.jpg",
    gallery: [
      { src: "/images/fleet-ducato-v3.jpg", label: "Exterior 3/4", alt: "vedere exterior" },
      { src: "/images/fleet-ducato-side-v3.jpg", label: "Profil lateral", alt: "profil lateral" },
      { src: "/images/fleet-ducato-rear-v3.jpg", label: "Spate", alt: "vedere spate" },
      { src: "/images/fleet-ducato-cargo.jpg", label: "Interior cargo", alt: "interior portbagaj" },
    ],
    volume: "Volum: 11–12 m³",
    volumeM3: 12,
    payload: "Sarcină utilă: 1.250 kg",
    payloadKg: 1250,
    seats: "3 locuri",
    transmission: "Manuală / Diesel",
    priceFrom: 190,
    size: "mica" as const,
    sizeLabel: "Mică",
    lengthCm: 300,
    widthCm: 172,
    heightCm: 175,
    year: 2021,
    description:
      "Opțiune practică și economică pentru transporturi scurte și livrări urbane.",
  },
];

export type FleetVan = (typeof fleet)[number];
export type FleetSize = FleetVan["size"];

export function getVanById(id: string) {
  return fleet.find((van) => van.id === id);
}

export const services = [
  {
    title: "Cu șofer sau fără",
    description:
      "Închiriezi duba și conduci tu, sau optezi pentru șofer profesionist — perfect pentru mutări și transporturi fără stres.",
    icon: "driver" as const,
  },
  {
    title: "Abonamente de tractare",
    description:
      "Poți achiziționa abonamente de tractare pentru liniște pe termen lung, cu acoperire adaptată nevoilor tale.",
    icon: "tow" as const,
  },
  {
    title: "Asistență rutieră",
    description:
      "Asistența rutieră gratuită este disponibilă doar în județul Satu Mare. Pentru alte zone, te ghidăm cu opțiuni dedicate.",
    icon: "roadside" as const,
  },
  {
    title: "Consultanță",
    description:
      "Te ajutăm să alegi volumul, tipul de dubă și perioada potrivită pentru mutare, marfă sau proiecte profesionale.",
    icon: "consult" as const,
  },
  {
    title: "Limită de kilometri",
    description:
      "Fiecare închiriere include un pachet de kilometri clar comunicat. Extra-kilometrii se discută transparent înainte de rezervare.",
    icon: "km" as const,
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Alegi duba",
    description:
      "Selectezi modelul potrivit nevoilor tale din flota noastră.",
    icon: "search" as const,
  },
  {
    step: 2,
    title: "Trimiți cererea",
    description:
      "Completezi formularul sau ne contactezi telefonic / pe WhatsApp.",
    icon: "form" as const,
  },
  {
    step: 3,
    title: "Ridici și pleci",
    description:
      "Preiei duba din locația noastră și ești gata de drum, fără bătăi de cap.",
    icon: "key" as const,
  },
];

export const team = [
  {
    name: "Andrei Popescu",
    role: "Consultant clienți",
    bio: "Te ajută să alegi duba potrivită pentru mutare, transport marfă sau proiecte de business.",
    phone: "0770 123 456",
    email: "andrei@chiriedube.ro",
    image: "/images/team-andrei-v5.jpg",
  },
  {
    name: "Maria Ionescu",
    role: "Responsabil flotă",
    bio: "Se asigură că fiecare dubă este curată, verificată tehnic și gata de drum.",
    phone: "0770 123 457",
    email: "maria@chiriedube.ro",
    image: "/images/team-maria-v7.jpg",
  },
  {
    name: "Radu Marin",
    role: "Suport clienți",
    bio: "Gestionează rezervările și modificările rapid, pe telefon, WhatsApp sau email.",
    phone: "0770 123 458",
    email: "radu@chiriedube.ro",
    image: "/images/team-radu-v5.jpg",
  },
  {
    name: "Elena Dumitrescu",
    role: "Manager operațional",
    bio: "Coordonează activitatea zilnică și veghează ca experiența ta să fie fără griji.",
    phone: "0770 123 459",
    email: "elena@chiriedube.ro",
    image: "/images/team-elena-v5.jpg",
  },
];

export const teamValues = [
  {
    title: "Consultanță personalizată",
    description:
      "Recomandăm duba potrivită în funcție de nevoi și tipul de transport.",
    icon: "user" as const,
  },
  {
    title: "Răspuns rapid",
    description:
      "Răspundem prompt la orice întrebare pe telefon, WhatsApp sau email.",
    icon: "zap" as const,
  },
  {
    title: "Experiență în domeniu",
    description:
      "Peste 1.000 de clienți mulțumiți ne recomandă pentru seriozitate.",
    icon: "star" as const,
  },
];

export const reviews = [
  {
    name: "Ioana D.",
    role: "Mutare apartament",
    rating: 5,
    text: "Am închiriat un Transit pentru mutare — totul a fost clar, rapid și fără surprize la preț. Am ridicat duba fără așteptare și am terminat mutarea într-o zi. Recomand!",
    image: "/images/review-ioana.jpg",
  },
  {
    name: "Mihai R.",
    role: "Transport marfă",
    rating: 5,
    text: "Sprinterul a fost impecabil. Am apreciat consultanța și faptul că am putut alege cu șofer.",
    image: "/images/review-mihai.jpg",
  },
  {
    name: "SC Nord Logistics SRL",
    role: "Persoană juridică",
    rating: 5,
    text: "Colaborăm ocazional pentru transporturi. Oferta pentru firme a fost personalizată și promptă.",
    image: "/images/review-nord.jpg",
  },
  {
    name: "Andreea P.",
    role: "Proiect renovare",
    rating: 5,
    text: "Comunicare excelentă pe WhatsApp. Am ridicat duba din Satu Mare și am plecat în 15 minute.",
    image: "/images/review-andreea.jpg",
  },
];

export const faqs = [
  {
    question: "Pot închiria duba cu șofer sau fără?",
    answer:
      "Da. Poți conduce tu sau poți opta pentru șofer profesionist, în funcție de tipul transportului și de preferințele tale.",
  },
  {
    question: "Există o limită de kilometri?",
    answer:
      "Da. Fiecare rezervare include un număr de kilometri menționat clar înainte de confirmare. Extra-kilometrii se calculează transparent.",
  },
  {
    question: "Ce documente sunt necesare pentru închiriere?",
    answer:
      "Ai nevoie de buletin/carte de identitate și permis de conducere valabil (categoria B). Pentru persoane juridice, solicităm și datele firmei.",
  },
  {
    question: "Unde este valabilă asistența rutieră gratuită?",
    answer:
      "Asistența rutieră gratuită este disponibilă doar în județul Satu Mare. Pentru alte zone te putem orienta către soluții alternative.",
  },
  {
    question: "Pot cumpăra un abonament de tractare?",
    answer:
      "Da. Oferim abonamente de tractare — contactează-ne pentru detalii despre pachete și acoperire.",
  },
  {
    question: "Mașinile din poze sunt exact cele pe care le primesc?",
    answer:
      "Flota este similară ca model și capacitate, însă mașinile pot să difere față de imagini. Îți comunicăm detaliile la rezervare.",
  },
];
