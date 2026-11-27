/**
 * Local SEO landing pages for nearby cities.
 * Pickup remains Satu Mare; each page has unique copy (not thin duplicates).
 */
export type UseCaseIcon =
  | "home"
  | "truck"
  | "trailer"
  | "calendar"
  | "route"
  | "building"
  | "package"
  | "wrench";

export type ServiceArea = {
  slug: string;
  name: string;
  county: string;
  driveHint: string;
  headline: string;
  intro: string;
  whyHere: string;
  useCases: { text: string; icon: UseCaseIcon }[];
  faqs: { question: string; answer: string }[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "carei",
    name: "Carei",
    county: "Satu Mare",
    driveHint: "aprox. 35–40 minute de Satu Mare",
    headline: "Închirieri dube în Carei",
    intro:
      "Ai nevoie de o dubă sau remorcă din Carei? chiriedube.ro te ajută rapid: preluarea se face la sediul din Satu Mare (Str. Fabricii Nr. 29), iar drumul până în Carei e scurt. Ideal pentru mutări, transport marfă și proiecte pe axa Carei–Satu Mare.",
    whyHere:
      "Carei e aproape de baza noastră, deci poți rezerva pe WhatsApp și ridici mașina în aceeași zi, în programul de luni–vineri. Ai km incluși, RCA și rovignetă RO, fără surprize la preț.",
    useCases: [
      {
        text: "Mutări apartament sau casă în Carei și împrejurimi",
        icon: "home",
      },
      {
        text: "Transport materiale pentru șantier sau renovari",
        icon: "wrench",
      },
      {
        text: "Curse scurte Carei ↔ Satu Mare cu dubă sau remorcă",
        icon: "route",
      },
      {
        text: "Nevoi punctuale pentru firme locale",
        icon: "building",
      },
    ],
    faqs: [
      {
        question: "Pot prelua duba direct în Carei?",
        answer:
          "Preluarea standard e la sediul din Satu Mare. Pentru livrare în Carei, întreabă-ne pe WhatsApp: uneori putem aranja în funcție de program și disponibilitate.",
      },
      {
        question: "Cât durează drumul Satu Mare–Carei cu duba?",
        answer:
          "În condiții normale, cam 35–40 de minute. Ai 300 km/zi incluși la autoutilitare, deci curse locale intră lejer în pachet.",
      },
    ],
  },
  {
    slug: "baia-mare",
    name: "Baia Mare",
    county: "Maramureș",
    driveHint: "aprox. 1 oră–1 oră 15 de Satu Mare",
    headline: "Închirieri dube pentru Baia Mare",
    intro:
      "Din Baia Mare poți închiria autoutilitare și remorci de la chiriedube.ro, cu sediu în Satu Mare. Rezervi pe telefon sau WhatsApp, ridici flota modernă de la noi și pleci spre Maramureș sau înapoi, cu condiții clare și suport rapid.",
    whyHere:
      "Mulți clienți din Baia Mare aleg flota noastră pentru mutări și transport marfă când vor preț pe zi + km, nu pachete confuze. Comunicarea e directă cu echipa locală, nu cu un call-center.",
    useCases: [
      {
        text: "Mutări Baia Mare ↔ Satu Mare sau în județul Maramureș",
        icon: "home",
      },
      {
        text: "Transport mobilier, electrocasnice, paleți",
        icon: "package",
      },
      {
        text: "Remorcă pentru ATV, motociclete sau materiale lungi",
        icon: "trailer",
      },
      {
        text: "Închiriere pe câteva zile pentru proiecte de firmă",
        icon: "building",
      },
    ],
    faqs: [
      {
        question: "Merită să vin din Baia Mare doar ca să iau duba?",
        answer:
          "Da, dacă ai nevoie de un vehicul serios pe 1–3 zile. Drumul e fezabil, iar la noi ai dube verificate, km incluși și rezervare simplă pe WhatsApp.",
      },
      {
        question: "Livrați duba în Baia Mare?",
        answer:
          "Standard ridici din Satu Mare. Livrarea în Baia Mare se discută separat, în funcție de program și distanță. Scrie-ne pe WhatsApp cu data dorită.",
      },
    ],
  },
  {
    slug: "zalau",
    name: "Zalău",
    county: "Sălaj",
    driveHint: "aprox. 1 oră 15–1 oră 30 de Satu Mare",
    headline: "Închirieri dube Zalău și Sălaj",
    intro:
      "Cauți închiriere dubă aproape de Zalău? chiriedube.ro operează din Satu Mare și deservește clienți din Sălaj: mutări, transport marfă, remorci. Rezervare rapidă, flotă actuală, prețuri pe zi transparente.",
    whyHere:
      "Pentru Zalău oferim aceeași flotă ca în Satu Mare: autoutilitare, remorci și auto. Ideal când ai nevoie de un vehicul de încredere fără să te legi de contracte complicate.",
    useCases: [
      { text: "Mutări în Zalău sau spre alte județe", icon: "home" },
      {
        text: "Transport paleți și mărfuri pentru magazine locale",
        icon: "package",
      },
      {
        text: "Remorcă platformă pentru utilaje mici",
        icon: "trailer",
      },
      {
        text: "Curse Satu Mare–Zalău pentru firme și persoane fizice",
        icon: "route",
      },
    ],
    faqs: [
      {
        question: "Pot folosi duba doar pe raza Zalăului?",
        answer:
          "Da. După preluare la Satu Mare poți circula unde ai nevoie în țară, inclusiv pe Sălaj. Respectă regulile din contract și pachetul de km incluși.",
      },
      {
        question: "Ce acte îmi trebuie?",
        answer:
          "Permis categoria B, vârsta minimă 21 de ani și datele pentru contract. Detaliile le confirmăm la rezervare pe WhatsApp sau telefon.",
      },
    ],
  },
  {
    slug: "oradea",
    name: "Oradea",
    county: "Bihor",
    driveHint: "aprox. 1 oră 40–2 ore de Satu Mare",
    headline: "Închirieri dube Oradea",
    intro:
      "Dacă ești din Oradea și ai nevoie de o dubă sau remorcă de încredere, poți apela la chiriedube.ro din Satu Mare. Rezervi din timp, ridici vehiculul la sediu și îl folosești pentru mutări sau transport pe Bihor și nu numai.",
    whyHere:
      "Oradea e în zona noastră largă de clienți. Nu suntem o platformă anonimă: vorbești direct cu noi, vezi flota pe site și știi de la început ce e inclus (km, RCA, rovignetă RO).",
    useCases: [
      {
        text: "Mutări Oradea și împrejurimi cu dubă spațioasă",
        icon: "home",
      },
      {
        text: "Transport marfă între Bihor și Satu Mare",
        icon: "truck",
      },
      {
        text: "Remorcă pentru materiale de construcții",
        icon: "trailer",
      },
      {
        text: "Închirieri pe weekend sau pe săptămână",
        icon: "calendar",
      },
    ],
    faqs: [
      {
        question: "Pot rezerva din Oradea online?",
        answer:
          "Da: alegi modelul pe site și ne scrii pe WhatsApp cu perioada. Îți confirmăm disponibilitatea și detaliile de preluare din Satu Mare.",
      },
      {
        question: "Există limită de județ?",
        answer:
          "Nu ești blocat în Satu Mare. După preluare poți circula spre Oradea și în țară, în condițiile contractului și ale pachetului de km.",
      },
    ],
  },
  {
    slug: "negresti-oas",
    name: "Negrești-Oaș",
    county: "Satu Mare",
    driveHint: "aprox. 50–60 minute de Satu Mare",
    headline: "Închirieri dube Negrești-Oaș",
    intro:
      "Pentru Negrești-Oaș și zona Oașului, chiriedube.ro oferă autoutilitare și remorci cu preluare în Satu Mare. Potrivit pentru mutări, transport lemne/materiale și curse spre Țara Oașului.",
    whyHere:
      "Suntem în același județ, deci organizarea e simplă: rezervare pe WhatsApp, preluare la Fabricii 29, drum rezonabil până în Negrești-Oaș.",
    useCases: [
      {
        text: "Mutări în Negrești-Oaș și satele din Oaș",
        icon: "home",
      },
      {
        text: "Transport materiale și unelte pe șantiere locale",
        icon: "wrench",
      },
      {
        text: "Remorcă pentru nevoi agricole sau gospodărești",
        icon: "trailer",
      },
      {
        text: "Curse Satu Mare ↔ Negrești-Oaș",
        icon: "route",
      },
    ],
    faqs: [
      {
        question: "Aveți dubă disponibilă în weekend pentru Oaș?",
        answer:
          "Programul de preluare e de regulă luni–vineri 09:00–16:30. Pentru weekend, întreabă-ne din timp pe WhatsApp să vedem ce putem aranja.",
      },
      {
        question: "Ce remorci aveți?",
        answer:
          "În flotă găsești remorci de diferite lungimi, inclusiv variante mai grele. Vezi detaliile și prețurile pe pagina Flotă.",
      },
    ],
  },
  {
    slug: "tasnad",
    name: "Tășnad",
    county: "Satu Mare",
    driveHint: "aprox. 45–55 minute de Satu Mare",
    headline: "Închirieri dube Tășnad",
    intro:
      "Din Tășnad poți închiria dube și remorci prin chiriedube.ro. Sediu în Satu Mare, rezervare rapidă, flotă pregătită pentru mutări și transport marfă în sudul județului.",
    whyHere:
      "Tășnad e bine legat de Satu Mare, iar clienții din zonă folosesc flota noastră când vor un vehicul curat, cu acte în regulă și preț clar pe zi.",
    useCases: [
      {
        text: "Mutări în Tășnad și localitățile apropiate",
        icon: "home",
      },
      {
        text: "Transport pentru magazine și depozite mici",
        icon: "package",
      },
      {
        text: "Remorcă pentru proiecte casnice sau agricole",
        icon: "trailer",
      },
      {
        text: "Deplasări Tășnad–Satu Mare cu marfă voluminoasă",
        icon: "truck",
      },
    ],
    faqs: [
      {
        question: "Cum rezerv din Tășnad?",
        answer:
          "Ne suni sau ne scrii pe WhatsApp cu perioada și tipul de vehicul. Îți confirmăm și stabilim ora de preluare la sediul din Satu Mare.",
      },
      {
        question: "Garanția cum se plătește?",
        answer:
          "Garanția se plătește cash la preluare, conform tipului de vehicul. Restul detaliilor le vezi pe site și ți le confirmăm la rezervare.",
      },
    ],
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export function serviceAreaPath(slug: string) {
  return `/inchirieri-dube/${slug}`;
}
