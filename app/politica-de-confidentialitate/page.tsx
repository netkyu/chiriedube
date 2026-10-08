import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import { company, contact, pricingRules, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Cum prelucrează DUAL SKYTECH SRL (chiriedube.ro) datele cu caracter personal, conform GDPR.",
  alternates: {
    canonical: `${siteConfig.url}/politica-de-confidentialitate`,
  },
  openGraph: {
    title: "Politica de confidențialitate — chiriedube.ro",
    description:
      "Informații GDPR: ce date colectăm, de ce, cât le păstrăm și ce drepturi ai.",
    url: `${siteConfig.url}/politica-de-confidentialitate`,
  },
};

export default function ConfidentialitatePage() {
  return (
    <LegalShell
      title="Politica de confidențialitate"
      description="Informații clare despre prelucrarea datelor cu caracter personal pe chiriedube.ro, conform Regulamentului (UE) 2016/679 (GDPR) și Legii nr. 190/2018."
    >
      <LegalSection id="operator-gdpr" title="1. Operatorul de date">
        <p>
          Operatorul datelor cu caracter personal este{" "}
          <strong>{company.legalName}</strong>, CUI <strong>{company.cif}</strong>,
          Reg. Com. <strong>{company.regCom}</strong>, sediu{" "}
          <strong>{company.address}</strong>, email{" "}
          <a href={`mailto:${contact.privacyEmail}`}>
            {contact.privacyEmail}
          </a>
          , telefon{" "}
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
        </p>
        <p>
          Nu am desemnat un DPO (Responsabil cu protecția datelor). Pentru
          solicitări GDPR folosește adresa de email de mai sus, cu subiectul
          „GDPR”.
        </p>
      </LegalSection>

      <LegalSection id="ce-date" title="2. Ce date prelucrăm">
        <p>În funcție de interacțiune, putem prelucra:</p>
        <ul>
          <li>
            <strong>Date de identificare:</strong> nume, prenume, serie/nr. CI,
            dată naștere (verificare vârstă / permis), semnătură pe contract;
          </li>
          <li>
            <strong>Date de contact:</strong> telefon, email, adresă (dacă este
            necesară pentru facturare sau predare);
          </li>
          <li>
            <strong>Date de conducere:</strong> nr. permis, categorii, valabilitate;
          </li>
          <li>
            <strong>Date de rezervare:</strong> model dubă, perioadă, loc
            preluare/predare, preferințe (cu/fără șofer), mesaje WhatsApp;
          </li>
          <li>
            <strong>Date de facturare / plată:</strong> pentru PJ — CUI, sediu,
            IBAN; dovezi de plată; nu stocăm integral datele cardului pe site
            (plățile card, dacă există, rulează prin procesatori terți);
          </li>
          <li>
            <strong>Date tehnice:</strong> adresă IP, tip dispozitiv/browser,
            pagini vizitate, identificatori cookie — vezi{" "}
            <a href="/politica-cookies">Politica de cookies</a>;
          </li>
          <li>
            <strong>Date din formularul B2B:</strong> firmă, volum estimat,
            mesaj.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="scopuri" title="3. Scopuri și temeiuri legale">
        <ul>
          <li>
            <strong>Executarea contractului</strong> (art. 6 alin. (1) lit. b
            GDPR): rezervare, închiriere, predare/preluare, asistență, facturare.
          </li>
          <li>
            <strong>Obligații legale</strong> (lit. c): contabilitate, arhivare
            fiscală, răspunsuri către autorități.
          </li>
          <li>
            <strong>Interes legitim</strong> (lit. f): securitatea site-ului,
            prevenirea fraudelor, îmbunătățirea serviciilor, apărarea
            drepturilor în justiție.
          </li>
          <li>
            <strong>Consimțământ</strong> (lit. a): cookies neesențiale,
            marketing direct (dacă îl soliciți / îl accepți). Poți retrage
            consimțământul oricând.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="surse" title="4. Sursele datelor">
        <p>
          Datele provin de la tine (site, WhatsApp, telefon, email, contract) sau,
          ocazional, de la reprezentantul firmei tale. Nu cumpărăm baze de date
          de marketing.
        </p>
      </LegalSection>

      <LegalSection id="destinatari" title="5. Destinatari / împuterniciți">
        <p>Datele pot fi dezvăluite, strict necesar, către:</p>
        <ul>
          <li>prestatori IT (hosting, email, mentenanță site);</li>
          <li>procesatori de plăți / bănci (ex. {company.bank});</li>
          <li>asigurători, service-uri auto, asistență rutieră;</li>
          <li>contabili / consultanți, în baza contractelor de confidențialitate;</li>
          <li>
            autorități publice (Poliție, ANAF, instanțe) când legea o cere;
          </li>
          <li>
            platforme de mesagerie folosite de tine pentru a ne contacta
            (ex. WhatsApp / Meta) — conform politicilor lor.
          </li>
        </ul>
        <p>
          Nu vindem date personale. Transferurile în afara SEE au loc doar cu
          garanții adecvate (clauze contractuale tip etc.), dacă este cazul.
        </p>
      </LegalSection>

      <LegalSection id="pastrare" title="6. Durata de stocare">
        <ul>
          <li>
            Date de contract / facturare: conform termenelor legale de arhivare
            (de regulă 10 ani pentru documente contabile).
          </li>
          <li>
            Solicitări de ofertă nefinalizate: până la 24 de luni, apoi ștergere
            sau anonimizare.
          </li>
          <li>
            Corespondență suport: cât este necesar pentru soluționare + termen
            de prescripție rezonabil.
          </li>
          <li>
            Cookies: conform duratelor din{" "}
            <a href="/politica-cookies">Politica de cookies</a>.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="drepturi" title="7. Drepturile tale">
        <p>Ai dreptul la:</p>
        <ul>
          <li>informare și acces la date;</li>
          <li>rectificare;</li>
          <li>ștergere („dreptul de a fi uitat”), în limitele legii;</li>
          <li>restricționarea prelucrării;</li>
          <li>portabilitate, unde este aplicabil;</li>
          <li>opoziție la prelucrări bazate pe interes legitim;</li>
          <li>retragerea consimțământului;</li>
          <li>
            plângere la{" "}
            <a
              href="https://www.dataprotection.ro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ANSPDCP
            </a>{" "}
            (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
            Caracter Personal).
          </li>
        </ul>
        <p>
          Pentru exercitarea drepturilor:{" "}
          <a href={`mailto:${contact.privacyEmail}`}>
            {contact.privacyEmail}
          </a>
          . Răspundem în cel mult 30 de zile (cu posibilă prelungire conform
          GDPR, în cazuri complexe).
        </p>
      </LegalSection>

      <LegalSection id="securitate" title="8. Securitate">
        <p>
          Aplicăm măsuri tehnice și organizatorice rezonabile (acces limitat,
          conexiuni securizate, bune practici de stocare). Nicio transmisie pe
          internet nu este 100% sigură; te rugăm să nu trimiți parole sau date
          sensibile inutile pe canale nesigure.
        </p>
      </LegalSection>

      <LegalSection id="minori" title="9. Minori">
        <p>
          Serviciile de închiriere (fără șofer) nu se adresează persoanelor sub{" "}
          {pricingRules.minAge} de ani. Nu prelucrăm în mod intenționat date ale
          minorilor. Dacă ai sesizat o astfel de situație, contactează-ne pentru
          ștergere.
        </p>
      </LegalSection>

      <LegalSection id="actualizari" title="10. Actualizări">
        <p>
          Putem actualiza această politică. Versiunea curentă este cea publicată
          pe această pagină, cu data din antet. Pentru schimbări majore, vom
          afișa un anunț pe site sau te vom informa pe canalul folosit la
          rezervare, când este cazul.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
