export const company = {
  legalName: "DUAL SKYTECH SRL",
  brandName: "chiriedube.ro",
  cif: "46952425",
  regCom: "J2022001150300",
  street: "Str. Fabricii Nr. 29",
  city: "Satu Mare",
  county: "Satu Mare",
  country: "România",
  address: "Str. Fabricii Nr. 29, Satu Mare, Jud. Satu Mare",
  addressLocality: "Satu Mare",
  addressRegion: "Satu Mare",
  postalCode: "",
  iban: "RO34RNCB0221178304450001",
  bank: "Banca Comercială Română",
  /** Data ultimei actualizări a documentelor legale */
  legalUpdated: "12 octombrie 2026",
  legalUpdatedIso: "2026-10-12",
};

export const contact = {
  phoneDisplay: "0746 949 866",
  phoneHref: "tel:+40746949866",
  whatsappNumber: "40746949866",
  whatsappHref: "https://wa.me/40746949866",
  email: "dual.vanzari@gmail.com",
  privacyEmail: "dual.vanzari@gmail.com",
  location: "Satu Mare, Str. Fabricii Nr. 29",
  address: company.address,
  /** Program afișat pe site */
  hoursWeekdays: "Luni până vineri, 09:00 la 16:30",
  hoursWeekend: "Sâmbătă–duminică închis",
  hoursShort: "Luni–vineri 09:00–16:30",
  hoursNote:
    "Pentru urgențe în județul Satu Mare, ne poți contacta și în afara programului.",
  /** Schema.org OpeningHoursSpecification */
  openingHours: ["Mo-Fr 09:00-16:30"] as const,
};

export const siteConfig = {
  name: "chiriedube.ro",
  url: "https://chiriedube.ro",
  locale: "ro_RO",
  description:
    "Autoutilitare, remorci și auto de închiriat în Satu Mare. 300 km/zi incluși, RCA și rovignetă RO. Operat de DUAL SKYTECH SRL.",
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
  /** km incluși / zi pentru autoutilitare și autoturisme */
  kmIncludedPerDay: 300,
  /** 50 lei pentru fiecare 100 km peste pachetul inclus */
  extraKmBlockLei: 50,
  extraKmBlockSize: 100,
  /** fallback, se folosește depositLei pe tip de vehicul */
  depositLei: 1000,
  depositVehicleLei: 1000,
  depositTrailerLei: 0,
  fuelPolicy: "Plin la preluare / plin la predare (autovehicule)",
  insurance: "RCA inclus · Rovignetă RO inclusă · asigurări/taxe externe opționale",
  minAge: 21,
  license: "Categoria B",
  paymentMethods: ["Card", "Cash", "Transfer bancar (OP)"],
  depositPaymentNote: "Garanția se plătește doar cash",
  tiers: [
    { minDays: 1, maxDays: 2, discount: 0, label: "Tarif standard" },
    { minDays: 3, maxDays: 6, discount: 0.1, label: "10% reducere (3 la 6 zile)" },
    { minDays: 7, maxDays: 365, discount: 0.2, label: "20% reducere (7+ zile)" },
  ],
};

export const priceIncludes = [
  {
    title: "RCA + rovignetă RO",
    detail:
      "Asigurarea RCA și rovigneta pentru România sunt incluse. Pentru alte țări putem adăuga asigurare/taxe la cerere.",
    value: "Inclus RO",
  },
  {
    title: "300 km / zi",
    detail:
      "Pentru autoutilitare și autoturisme. Remorcile nu au limită de km. Extra: 50 lei / fiecare 100 km peste pachet.",
    value: "300 km/zi",
  },
  {
    title: "Garanție rambursabilă",
    detail:
      "1000 lei pentru autoutilitare și autoturisme (doar cash). Remorcile nu necesită garanție.",
    value: "1000 lei",
  },
  {
    title: "Plăți acceptate",
    detail: "Card, cash sau transfer bancar (OP). Garanția se plătește doar cash.",
    value: "Card · Cash · OP",
  },
  {
    title: "Permis categoria B",
    detail: "Autoutilitarele și autoturismele se conduc cu permis B. Vârsta minimă: 21 de ani.",
    value: "Cat. B",
  },
  {
    title: "Asistență Satu Mare",
    detail:
      "Asistență rutieră pe județul Satu Mare. În afara județului te ghidăm către opțiuni.",
    value: "Gratis SM",
  },
];

export const priceExtras = [
  {
    title: "Extra-kilometri",
    detail: "50 lei pentru fiecare 100 km peste pachetul inclus (autovehicule).",
    value: "50 lei/100 km",
  },
  {
    title: "Asigurare / taxe externe",
    detail: "Rovignetă și asigurări pentru alte țări, la cerere.",
    value: "opțional",
  },
  {
    title: "Șofer profesionist",
    detail: "Opțional, pe oră sau pe zi. Îți spunem prețul înainte.",
    value: "la cerere",
  },
  {
    title: "Al doilea șofer",
    detail: "Poți adăuga un șofer secundar pe contract.",
    value: "la cerere",
  },
];

export const priceExample = {
  vanName: "Opel Movano L3H2",
  days: 1,
  daily: 300,
  discountLabel: "Tarif standard",
  discountLei: 0,
  neededKm: 500,
  extraKmLei: 100,
  total: 400,
  kmIncluded: 300,
  note: "Exemplu: 1 zi × 300 lei + 200 km extra (2 × 50 lei) = 400 lei, fără garanție.",
};

export const navLinks = [
  { href: "/#acasa", label: "Acasă", subtitle: "Începe de aici" },
  { href: "/flota", label: "Flotă", subtitle: "Vehiculele noastre" },
  { href: "/#servicii", label: "Servicii", subtitle: "Ce putem face" },
  { href: "/#despre", label: "Despre", subtitle: "Cine suntem" },
  { href: "/#faq", label: "FAQ", subtitle: "Întrebări frecvente" },
  { href: "/#recenzii", label: "Recenzii", subtitle: "Încrederea clienților" },
  { href: "/abonamente-tractare", label: "Tractare", subtitle: "Abonamente" },
  { href: "/#contact", label: "B2B", subtitle: "Oferte pentru firme" },
];

export const features = [
  {
    title: "Autoutilitare și remorci",
    description: "Pentru mutări\nși transport marfă",
    icon: "rocket" as const,
  },
  {
    title: "Preț pe zi + km",
    description: "De la 300 lei/zi,\nextra km separat",
    icon: "coins" as const,
  },
  {
    title: "Răspundem repede",
    description: "Telefon sau WhatsApp,\nde obicei în aceeași zi",
    icon: "headset" as const,
  },
  {
    title: "Preluare Satu Mare",
    description: "Str. Fabricii Nr. 29",
    icon: "clock" as const,
  },
];

export type FleetCategory = "autoutilitara" | "remorca" | "autoturism";

export const fleet = [
  {
    id: "movano",
    name: "Opel Movano L3H2",
    brand: "Opel",
    category: "autoutilitara" as const,
    categoryLabel: "Autoutilitară",
    image: "/images/fleet-movano-front-v9.jpg",
    gallery: [
      { src: "/images/fleet-movano-front-v9.jpg", label: "Față", alt: "Opel Movano L3H2, unghi față" },
      { src: "/images/fleet-movano-side-v8.jpg", label: "Lateral", alt: "Opel Movano L3H2, profil" },
      { src: "/images/fleet-movano-rear-v9.jpg", label: "Spate", alt: "Opel Movano L3H2, unghi spate" },
    ],
    volume: "Caroserie L3H2",
    volumeM3: 14,
    payload: "150 CP · diesel",
    payloadKg: 0,
    seats: "3 locuri",
    transmission: "Manuală / Diesel · 150 CP",
    priceFrom: 300,
    size: "mare" as const,
    sizeLabel: "Autoutilitară",
    lengthCm: 370,
    widthCm: 180,
    heightCm: 200,
    year: 2013,
    hasKmLimit: true,
    depositLei: 1000,
    accessories: [] as string[],
    description:
      "Opel Movano L3H2 roșie, 150 CP. Bună pentru mutări și transport marfă.",
  },
  {
    id: "master",
    name: "Renault Master L2H2",
    brand: "Renault",
    category: "autoutilitara" as const,
    categoryLabel: "Autoutilitară",
    image: "/images/fleet-master-front-v9.jpg",
    gallery: [
      { src: "/images/fleet-master-front-v9.jpg", label: "Față", alt: "Renault Master L2H2, unghi față" },
      { src: "/images/fleet-master-side-v8.jpg", label: "Lateral", alt: "Renault Master L2H2, profil" },
      { src: "/images/fleet-master-rear-v9.jpg", label: "Spate", alt: "Renault Master L2H2, unghi spate" },
    ],
    volume: "Caroserie L2H2",
    volumeM3: 12,
    payload: "125 CP · diesel",
    payloadKg: 0,
    seats: "3 locuri",
    transmission: "Manuală / Diesel · 125 CP",
    priceFrom: 300,
    size: "medie" as const,
    sizeLabel: "Autoutilitară",
    lengthCm: 320,
    widthCm: 176,
    heightCm: 185,
    year: 2011,
    hasKmLimit: true,
    depositLei: 1000,
    accessories: [] as string[],
    description:
      "Renault Master L2H2 roșie-portocalie, 125 CP. Potrivită pentru oraș și drumuri pe județ.",
  },
  {
    id: "trailer-45",
    name: "Remorcă 4,5 m · 2700 kg",
    brand: "Remorcă",
    category: "remorca" as const,
    categoryLabel: "Remorcă",
    image: "/images/fleet-trailer-45-front-v10.jpg",
    gallery: [
      { src: "/images/fleet-trailer-45-front-v10.jpg", label: "Față", alt: "Remorcă 4,5 m, unghi față" },
      { src: "/images/fleet-trailer-45-side-v10.jpg", label: "Lateral", alt: "Remorcă 4,5 m, profil" },
      { src: "/images/fleet-trailer-45-rear-v10.jpg", label: "Spate", alt: "Remorcă 4,5 m, unghi spate" },
    ],
    volume: "Platformă 4,5 m · 2 axe",
    volumeM3: 0,
    payload: "Max. autorizat 2700 kg",
    payloadKg: 2700,
    seats: "Nu e cazul",
    transmission: "2 axe",
    priceFrom: 150,
    size: "mare" as const,
    sizeLabel: "Remorcă",
    lengthCm: 450,
    widthCm: 200,
    heightCm: 0,
    year: 2020,
    hasKmLimit: false,
    depositLei: 0,
    accessories: ["Chingi", "Troliu (la cerere)"],
    description:
      "Remorcă 4,5 m, 2700 kg, 2 axe. Fără limită de km. La închiriere e nevoie de talonul vehiculului de tractare.",
  },
  {
    id: "trailer-40",
    name: "Remorcă 4 m · 2000 kg",
    brand: "Remorcă",
    category: "remorca" as const,
    categoryLabel: "Remorcă",
    image: "/images/fleet-trailer-40-front-v8.jpg",
    gallery: [
      { src: "/images/fleet-trailer-40-front-v8.jpg", label: "Față", alt: "Remorcă 4 m, unghi față" },
      { src: "/images/fleet-trailer-40-side-v8.jpg", label: "Lateral", alt: "Remorcă 4 m, profil" },
      { src: "/images/fleet-trailer-40-rear-v8.jpg", label: "Spate", alt: "Remorcă 4 m, unghi spate" },
    ],
    volume: "Platformă 4 m · 2 axe",
    volumeM3: 0,
    payload: "Max. autorizat 2000 kg",
    payloadKg: 2000,
    seats: "Nu e cazul",
    transmission: "2 axe",
    priceFrom: 120,
    size: "medie" as const,
    sizeLabel: "Remorcă",
    lengthCm: 400,
    widthCm: 200,
    heightCm: 0,
    year: 2020,
    hasKmLimit: false,
    depositLei: 0,
    accessories: ["Chingi", "Troliu (la cerere)"],
    description:
      "Remorcă 4 m, 2000 kg, 2 axe. Fără limită de km. Necesar talonul mașinii de tractare pentru asigurare.",
  },
  {
    id: "trailer-750",
    name: "Remorcă 750 kg · 1,3×2 m",
    brand: "Remorcă",
    category: "remorca" as const,
    categoryLabel: "Remorcă",
    image: "/images/fleet-trailer-750-front-v8.jpg",
    gallery: [
      { src: "/images/fleet-trailer-750-front-v8.jpg", label: "Față", alt: "Remorcă 750 kg, unghi față" },
      { src: "/images/fleet-trailer-750-side-v8.jpg", label: "Lateral", alt: "Remorcă 750 kg, profil" },
      { src: "/images/fleet-trailer-750-rear-v8.jpg", label: "Spate", alt: "Remorcă 750 kg, unghi spate" },
    ],
    volume: "Platformă 1,3 × 2 m",
    volumeM3: 0,
    payload: "Max. autorizat 750 kg",
    payloadKg: 750,
    seats: "Nu e cazul",
    transmission: "1 ax · 750 kg",
    priceFrom: 70,
    size: "mica" as const,
    sizeLabel: "Remorcă",
    lengthCm: 200,
    widthCm: 130,
    heightCm: 0,
    year: 2018,
    hasKmLimit: false,
    depositLei: 0,
    accessories: ["Chingi"],
    description:
      "Remorcă ușoară 750 kg, platformă 1,3×2 m. Ideală pentru transporturi mici. Fără garanție și fără limită de km.",
  },
  {
    id: "trailer-cover",
    name: "Remorcă cu prelată · 2×1,2 m",
    brand: "Remorcă",
    category: "remorca" as const,
    categoryLabel: "Remorcă",
    image: "/images/fleet-trailer-cover-front-v2.jpg",
    gallery: [
      {
        src: "/images/fleet-trailer-cover-front-v2.jpg",
        label: "Față",
        alt: "Remorcă cu prelată, unghi față",
      },
      {
        src: "/images/fleet-trailer-cover-side-v2.jpg",
        label: "Lateral",
        alt: "Remorcă cu prelată, profil",
      },
      {
        src: "/images/fleet-trailer-cover-rear-v2.jpg",
        label: "Spate",
        alt: "Remorcă cu prelată, unghi spate",
      },
    ],
    volume: "Prelată 2 × 1,2 × 1,2 m",
    volumeM3: 2.9,
    payload: "Max. autorizat 750 kg",
    payloadKg: 750,
    seats: "Nu e cazul",
    transmission: "1 ax · prelată",
    priceFrom: 70,
    size: "mica" as const,
    sizeLabel: "Remorcă",
    lengthCm: 200,
    widthCm: 120,
    heightCm: 120,
    year: 2022,
    hasKmLimit: false,
    depositLei: 0,
    accessories: ["Chingi", "Prelată"],
    description:
      "Remorcă ușoară cu prelată, 2 × 1,2 × 1,2 m, 1 ax. Marfa stă acoperită. Fără garanție și fără limită de km.",
  },
  {
    id: "jetta",
    name: "Volkswagen Jetta 1.6",
    brand: "Volkswagen",
    category: "autoturism" as const,
    categoryLabel: "Autoturism",
    image: "/images/fleet-jetta-front-v9.jpg",
    gallery: [
      { src: "/images/fleet-jetta-front-v9.jpg", label: "Față", alt: "Volkswagen Jetta, unghi față" },
      { src: "/images/fleet-jetta-side-v8.jpg", label: "Lateral", alt: "Volkswagen Jetta, profil" },
      { src: "/images/fleet-jetta-rear-v9.jpg", label: "Spate", alt: "Volkswagen Jetta, unghi spate" },
    ],
    volume: "Sedan · 5 locuri",
    volumeM3: 0,
    payload: "1.6 diesel",
    payloadKg: 0,
    seats: "5 locuri",
    transmission: "Manuală / Diesel · 2011",
    priceFrom: 180,
    size: "mica" as const,
    sizeLabel: "Autoturism",
    lengthCm: 464,
    widthCm: 177,
    heightCm: 148,
    year: 2011,
    hasKmLimit: true,
    depositLei: 1000,
    accessories: [] as string[],
    description:
      "VW Jetta gri, 1.6 diesel, cutie manuală. Autoturism simplu pentru deplasări.",
  },
  {
    id: "passat",
    name: "Volkswagen Passat Variant",
    brand: "Volkswagen",
    category: "autoturism" as const,
    categoryLabel: "Autoturism",
    image: "/images/fleet-passat-front-v9.jpg",
    gallery: [
      { src: "/images/fleet-passat-front-v9.jpg", label: "Față", alt: "Volkswagen Passat Variant, unghi față" },
      { src: "/images/fleet-passat-side-v8.jpg", label: "Lateral", alt: "Volkswagen Passat Variant, profil" },
      { src: "/images/fleet-passat-rear-v9.jpg", label: "Spate", alt: "Volkswagen Passat Variant, unghi spate" },
    ],
    volume: "Break · 5 locuri",
    volumeM3: 0,
    payload: "2.0 TDI",
    payloadKg: 0,
    seats: "5 locuri",
    transmission: "Automată DSG / Diesel · 2010",
    priceFrom: 200,
    size: "medie" as const,
    sizeLabel: "Autoturism",
    lengthCm: 477,
    widthCm: 182,
    heightCm: 147,
    year: 2010,
    hasKmLimit: true,
    depositLei: 1000,
    accessories: [] as string[],
    description:
      "VW Passat Variant albastru, 2.0 TDI, cutie DSG. Potrivit când ai de mers mai mult.",
  },
  {
    id: "a4",
    name: "Audi A4 Avant 2.0 TDI",
    brand: "Audi",
    category: "autoturism" as const,
    categoryLabel: "Autoturism",
    image: "/images/fleet-a4-front-v2.jpg",
    gallery: [
      { src: "/images/fleet-a4-front-v2.jpg", label: "Față", alt: "Audi A4 Avant, unghi față" },
      { src: "/images/fleet-a4-side-v2.jpg", label: "Lateral", alt: "Audi A4 Avant, profil" },
      { src: "/images/fleet-a4-rear-v2.jpg", label: "Spate", alt: "Audi A4 Avant, unghi spate" },
    ],
    volume: "Break · 5 locuri",
    volumeM3: 0,
    payload: "2.0 TDI · 140 CP",
    payloadKg: 0,
    seats: "5 locuri",
    transmission: "Manuală / Diesel · 140 CP",
    priceFrom: 220,
    size: "medie" as const,
    sizeLabel: "Autoturism",
    lengthCm: 470,
    widthCm: 183,
    heightCm: 144,
    year: 2013,
    hasKmLimit: true,
    depositLei: 1000,
    accessories: [] as string[],
    description:
      "Audi A4 Avant alb, 2.0 TDI 140 CP, cutie manuală. Break practic pentru drumuri mai lungi.",
  },
];

export type FleetVan = (typeof fleet)[number];
export type FleetSize = FleetVan["size"];

export function getVanById(id: string) {
  return fleet.find((van) => van.id === id);
}

export const services = [
  {
    title: "Autoutilitare, remorci, auto",
    description:
      "Spui ce ai de mutat sau transportat și îți spunem ce ți se potrivește din flotă.",
    icon: "driver" as const,
  },
  {
    title: "Abonamente de tractare",
    description:
      "Serviciu pe perioadă convenită. Solicitați oferta pe WhatsApp sau telefon.",
    icon: "tow" as const,
    href: "/abonamente-tractare",
  },
  {
    title: "Asistență rutieră",
    description:
      "În județul Satu Mare asistența rutieră e inclusă. În afara județului te îndrumăm către o soluție.",
    icon: "roadside" as const,
  },
  {
    title: "Remorci cu accesorii",
    description:
      "La remorci ai chingi și, la cerere, troliu. Te rugăm să aduci talonul mașinii de tractare.",
    icon: "consult" as const,
  },
  {
    title: "300 km / zi",
    description:
      "La auto și autoutilitare: 300 km/zi incluși. Peste: 50 lei la fiecare 100 km. Remorcile nu au limită.",
    icon: "km" as const,
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Alegi vehiculul",
    description: "Te uiți pe flotă și alegi ce ai nevoie.",
    icon: "search" as const,
  },
  {
    step: 2,
    title: "Trimiți cererea",
    description: "Ne scrii perioada și câți km estimezi, pe WhatsApp.",
    icon: "form" as const,
  },
  {
    step: 3,
    title: "Ridici și pleci",
    description: "Vii pe Str. Fabricii Nr. 29, semnezi și pleci.",
    icon: "key" as const,
  },
];

export const team = [
  {
    name: "Dumitru",
    role: "Administrator",
    bio: "Numele meu este Dumitru și mă ocup personal de întreaga activitate de închirieri dube. De la întreținerea flotei, până la comunicarea cu clienții și livrarea dubei, sunt implicat direct pentru ca totul să fie simplu, transparent și fără probleme.",
    phone: contact.phoneDisplay,
    email: contact.email,
    image: "/images/team-dumitru.jpg",
  },
];

export const faqs = [
  {
    question: "Cum rezerv un vehicul?",
    intro: "Rezervarea se face în câțiva pași simpli:",
    points: [
      "Alegeți vehiculul potrivit din flotă",
      "Ne scrieți pe WhatsApp perioada dorită și kilometrii estimați",
      "Confirmăm disponibilitatea și detaliile",
      "Ridicați vehiculul de pe Str. Fabricii nr. 29, semnați contractul și puteți pleca",
    ],
  },
  {
    question: "Ce documente sunt necesare?",
    intro: "La preluare aveți nevoie de:",
    points: [
      "Carte de identitate sau pașaport",
      "Permis de conducere categoria B (vârsta minimă: 21 de ani)",
      "Pentru remorci: talonul autovehiculului cu care tractați",
      "Pentru persoane juridice: CUI și datele societății",
    ],
  },
  {
    question: "Câți kilometri sunt incluși?",
    intro: "Regula de kilometraj diferă în funcție de tipul de vehicul:",
    points: [
      "Autoutilitare și autoturisme: 300 km incluși pe zi",
      "Depășire: 50 lei pentru fiecare 100 km suplimentari",
      "Remorci: fără limită de kilometri",
    ],
  },
  {
    question: "Cât este garanția și cum se plătește?",
    intro: "Condițiile de plată sunt următoarele:",
    points: [
      "Garanție: 1.000 lei, exclusiv cash, pentru autoutilitare și autoturisme",
      "Garanția se restituie la predare, dacă vehiculul este în stare corespunzătoare",
      "Remorcile nu necesită garanție",
      "Tariful de închiriere se poate achita cu cardul, cash sau transfer bancar (OP)",
    ],
  },
  {
    question: "Ce este inclus în prețul pe zi?",
    intro: "Tariful zilnic cuprinde:",
    points: [
      "Asigurare RCA și rovignetă valabilă pe teritoriul României",
      "Pachetul de 300 km pe zi (autoutilitare și autoturisme)",
      "Politica de combustibil: plin la preluare, plin la predare",
      "Asistență rutieră pe raza județului Satu Mare",
      "Asigurări și taxe pentru alte țări: disponibile la cerere",
    ],
  },
  {
    question: "Oferiți abonamente de tractare?",
    intro: "Da. Putem pregăti o ofertă personalizată:",
    points: [
      "Contactați-ne pe WhatsApp sau telefon",
      "Oferta depinde de zonă și de tipul vehiculului",
      "Detalii suplimentare găsiți pe pagina Abonamente de tractare",
    ],
  },
  {
    question: "Care este programul și cum ne contactați?",
    intro: "Ne găsiți astfel:",
    points: [
      "Program: luni–vineri, 09:00–16:30 (weekend închis)",
      "Telefon / WhatsApp: 0746 949 866",
      "Email: dual.vanzari@gmail.com",
      "Sediu: Str. Fabricii Nr. 29, Satu Mare",
    ],
  },
];

/** Text plat pentru schema FAQPage / SEO */
export function faqAnswerText(faq: (typeof faqs)[number]) {
  return [faq.intro, ...faq.points].join(" ");
}
