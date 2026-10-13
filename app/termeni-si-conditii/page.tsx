import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import {
  company,
  contact,
  pricingRules,
  siteConfig,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description:
    "Termenii și condițiile de închiriere a dubelor pe chiriedube.ro, operate de DUAL SKYTECH SRL.",
  alternates: { canonical: `${siteConfig.url}/termeni-si-conditii` },
  openGraph: {
    title: "Termeni și condiții, chiriedube.ro",
    description:
      "Condiții de rezervare, plată, garanție, răspundere și anulare pentru închirierea de dube.",
    url: `${siteConfig.url}/termeni-si-conditii`,
  },
};

export default function TermeniPage() {
  return (
    <LegalShell
      title="Termeni și condiții"
      description="Regulile care guvernează rezervarea și închirierea dubelor prin chiriedube.ro. Te rugăm să le citești înainte de a confirma o rezervare."
    >
      <LegalSection id="operator" title="1. Operatorul serviciului">
        <p>
          Site-ul <strong>{siteConfig.name}</strong> ({siteConfig.url}) și
          serviciile de închiriere de autoutilitare („dube”) sunt operate de:
        </p>
        <ul>
          <li>
            <strong>{company.legalName}</strong>
          </li>
          <li>
            CUI/CIF: <strong>{company.cif}</strong>
          </li>
          <li>
            Nr. Reg. Com.: <strong>{company.regCom}</strong>
          </li>
          <li>
            Sediu social: <strong>{company.address}</strong>
          </li>
          <li>
            IBAN: <strong>{company.iban}</strong>, {company.bank}
          </li>
          <li>
            Email:{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            Telefon:{" "}
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          </li>
        </ul>
        <p>
          În cuprinsul acestui document, „chiriedube.ro”, „noi” sau „Prestatorul”
          se referă la {company.legalName}. „Clientul” sau „Locatarul” este
          persoana fizică sau juridică care solicită și/sau încheie un contract
          de închiriere.
        </p>
      </LegalSection>

      <LegalSection id="obiect" title="2. Obiectul și domeniul de aplicare">
        <p>
          Prezentele Termeni și condiții („T&C”) reglementează accesul la site,
          formularul de rezervare / calculatorul de ofertă, comunicările pe
          WhatsApp, telefon sau email, precum și contractul de închiriere a
          vehiculelor din flota noastră.
        </p>
        <p>
          Prin trimiterea unei solicitări de ofertă, confirmarea unei rezervări
          sau semnarea contractului de închiriere, Clientul declară că a citit,
          a înțeles și acceptă aceste T&C, împreună cu{" "}
          <a href="/politica-de-confidentialitate">
            Politica de confidențialitate
          </a>{" "}
          și <a href="/politica-cookies">Politica de cookies</a>.
        </p>
        <p>
          Prețurile afișate pe site („de la X lei/zi”) sunt orientative. Oferta
          finală și condițiile contractuale pot varia în funcție de disponibilitate,
          perioadă, tip de vehicul, kilometri, șofer și alte opțiuni.
        </p>
      </LegalSection>

      <LegalSection id="eligibilitate" title="3. Condiții de eligibilitate">
        <p>Pentru a închiria o dubă fără șofer, Locatarul trebuie să îndeplinească cumulativ:</p>
        <ul>
          <li>
            vârsta minimă de <strong>{pricingRules.minAge} de ani</strong>;
          </li>
          <li>
            deținerea unui permis de conducere valabil{" "}
            <strong>{pricingRules.license}</strong>, eliberat de o autoritate
            competentă din UE/SEE sau recunoscut în România;
          </li>
          <li>
            prezentarea unui act de identitate valabil (CI / pașaport);
          </li>
          <li>
            acceptarea constituirii garanției (depozit) și a condițiilor de
            predare/preluare;
          </li>
          <li>
            pentru persoane juridice: date complete de facturare și, la cerere,
            împuternicire pentru reprezentant.
          </li>
        </ul>
        <p>
          Prestatorul își rezervă dreptul de a refuza închirierea dacă documentele
          sunt incomplete, neclare, expirate sau dacă există motive rezonabile de
          risc (istoric de daune, suspiciune de fraudă, intoxicație etc.).
        </p>
      </LegalSection>

      <LegalSection id="rezervare" title="4. Rezervare și confirmare">
        <ol>
          <li>
            Clientul selectează vehiculul, perioada și trimite solicitarea
            (WhatsApp, telefon, email sau formular B2B).
          </li>
          <li>
            Prestatorul confirmă disponibilitatea și transmite oferta / sumarul
            (tarif, km incluși, garanție, locul și ora preluării).
          </li>
          <li>
            Rezervarea este considerată fermă după confirmarea scrisă a
            Prestatorului și, după caz, după plata avansului sau a garanției
            indicate în ofertă.
          </li>
          <li>
            Calculatorul de pe site generează o <strong>estimare</strong>, nu un
            contract automat. Valorile pot fi ajustate la confirmare.
          </li>
        </ol>
      </LegalSection>

      <LegalSection id="preturi" title="5. Prețuri, plăți și facturare">
        <ul>
          <li>
            Tariful zilnic pentru autovehicule include, în condițiile afișate:
            RCA, rovignetă RO și pachetul de km incluși (
            {pricingRules.kmIncludedPerDay} km/zi, cumulat pe perioadă). Remorcile
            nu au limită de kilometri.
          </li>
          <li>
            Extra-kilometri (autovehicule):{" "}
            <strong>
              {pricingRules.extraKmBlockLei} lei pentru fiecare{" "}
              {pricingRules.extraKmBlockSize} km
            </strong>{" "}
            peste pachetul inclus, pe lângă tariful zilnic.
          </li>
          <li>
            Politica combustibil: <strong>{pricingRules.fuelPolicy}</strong>.
            Diferențele se facturează la predare, pe baza consumului / prețului
            pieței.
          </li>
          <li>
            Plățile pentru închiriere: card, numerar (cash) sau transfer bancar
            (OP) în contul <strong>{company.iban}</strong> ({company.bank}).
          </li>
          <li>
            Pentru persoane juridice se emit facturi fiscale conform legislației
            române. Datele de facturare trebuie să fie corecte și complete.
          </li>
          <li>
            Reducerile pe durată (ex. 3-6 zile, 7+ zile) se aplică doar dacă sunt
            menționate în ofertă și rezervarea este confirmată.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="garantie" title="6. Garanție (depozit)">
        <p>
          La preluare, pentru autoutilitare și autoturisme, Clientul constituie
          o garanție rambursabilă de regulă{" "}
          <strong>{pricingRules.depositVehicleLei} lei</strong>, plătibilă{" "}
          <strong>doar cash</strong>. Remorcile nu necesită garanție. Garanția
          poate fi reținută parțial sau total pentru:
        </p>
        <ul>
          <li>daune, lipsuri sau uzură anormală față de starea la preluare;</li>
          <li>combustibil lipsă față de politica plin/plin;</li>
          <li>amenzi, taxe de parcare, penalități rutiere aferente perioadei;</li>
          <li>extra-kilometri, întârzieri la predare, costuri de curățenie excesivă;</li>
          <li>alte sume datorate conform contractului.</li>
        </ul>
        <p>
          Soldul neutilizat al garanției se restituie după verificarea vehiculului,
          în termen rezonabil (de regulă până la 14 zile lucrătoare), pe același
          canal de plată sau prin transfer.
        </p>
      </LegalSection>

      <LegalSection id="preluare" title="7. Preluare și predare">
        <ul>
          <li>
            Locul și ora se stabilesc în confirmarea rezervării (de regulă{" "}
            {company.address}, dacă nu se convine altfel).
          </li>
          <li>
            La preluare se întocmește un proces-verbal privind starea vehiculului
            (exterioară, interioară, kilometraj, combustibil, accesorii).
          </li>
          <li>
            Clientul are obligația să verifice vehiculul și să semnaleze
            imediat orice neconformitate înainte de a părăsi locul de preluare.
          </li>
          <li>
            Predarea se face la data/ora convenite, în aceeași locație (sau alta
            agreată), cu aceleași documente și chei.
          </li>
          <li>
            Întârzierea la predare poate genera tarif suplimentar pe zi/oră și,
            după caz, costuri de înlocuire a rezervărilor următoare.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="obligatii" title="8. Obligațiile Locatarului">
        <p>Locatarul se obligă să:</p>
        <ul>
          <li>utilizeze vehiculul conform destinației și legislației rutiere;</li>
          <li>
            nu subînchirieze, nu împrumute vehiculul unor terți neautorizați pe
            contract;
          </li>
          <li>
            nu transporte persoane cu plată, materiale periculoase interzise,
            încărcături care depășesc sarcina utilă sau dimensiunile;
          </li>
          <li>
            nu participe la curse, testări, off-road agresiv sau alte utilizări
            abuzive;
          </li>
          <li>
            asigure încărcătura corespunzător și să nu deterioreze spațiul de
            cargo;
          </li>
          <li>
            anunțe imediat Prestatorul în caz de accident, pană, furt sau
            defecțiune;
          </li>
          <li>
            suporte amenzile și sancțiunile din perioada închirierii, chiar dacă
            sunt comunicate ulterior.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="asigurare" title="9. Asigurare și răspundere">
        <ul>
          <li>
            Vehiculul este asigurat RCA. CASCO sau franșize suplimentare pot fi
            disponibile opțional, conform ofertei.
          </li>
          <li>
            Locatarul răspunde pentru daunele cauzate din culpă, neglijință,
            încălcarea T&C sau a legii, în limita prevederilor contractuale și
            ale polițelor aplicabile.
          </li>
          <li>
            În caz de eveniment, Locatarul completează constatarea amiabilă /
            apelează autoritățile, păstrează dovezi foto și informează
            Prestatorul fără întârziere.
          </li>
          <li>
            Prestatorul nu răspunde pentru bunurile lăsate în vehicul, întârzieri
            cauzate de forță majoră, trafic, condiții meteo sau terți.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sofer" title="10. Închiriere cu șofer">
        <p>
          Când se contractează și serviciul cu șofer, șoferul acționează pentru
          Prestator în limitele traseului și programului agreate. Clientul
          asigură accesul la locațiile de încărcare/descărcare și respectă
          indicațiile de siguranță. Timpii de așteptare neanunțați pot fi
          facturate suplimentar.
        </p>
      </LegalSection>

      <LegalSection id="anulare" title="11. Anulare și modificare">
        <ul>
          <li>
            Modificările de perioadă sau model se acceptă în funcție de
            disponibilitate și pot schimba tariful.
          </li>
          <li>
            Anularea de către Client cu mai mult de 48 de ore înainte de preluare:
            de regulă fără penalitate (exceptând avansurile nerefundabile
            menționate expres în ofertă).
          </li>
          <li>
            Anularea cu mai puțin de 48 de ore sau neprezentarea (no-show):
            Prestatorul poate reține până la contravaloarea unei zile de
            închiriere sau avansul plătit.
          </li>
          <li>
            Dacă Prestatorul anulează din cauze proprii (indisponibilitate
            neprevăzută), Clientul primește alternative sau rambursarea sumelor
            plătite, fără alte daune, în măsura permisă de lege.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="consumatori" title="12. Drepturile consumatorilor">
        <p>
          Persoanele fizice care acționează în scopuri din afara activității
          profesionale beneficiază de protecția OUG nr. 34/2014 și a legislației
          consumatorului. Pentru reclamații:
        </p>
        <ul>
          <li>
            contactează-ne mai întâi la{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> sau{" "}
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>;
          </li>
          <li>
            ANPC:{" "}
            <a
              href="https://anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              anpc.ro
            </a>
          </li>
          <li>
            Soluționare online a litigiilor (SOL):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
          </li>
        </ul>
        <p>
          Având în vedere natura serviciului (închiriere de bunuri mobile la o
          dată precisă), dreptul de retragere de 14 zile prevăzut pentru
          contractele la distanță poate fi limitat sau inaplicabil după
          începerea executării, în condițiile legii, dacă Clientul a fost
          informat și a consimțit.
        </p>
      </LegalSection>

      <LegalSection id="pi" title="13. Proprietate intelectuală">
        <p>
          Conținutul site-ului (texte, fotografii, logo, design, cod) aparține{" "}
          {company.legalName} sau partenerilor săi și nu poate fi copiat,
          redistribuit sau folosit comercial fără acord scris.
        </p>
      </LegalSection>

      <LegalSection id="modificari" title="14. Modificarea T&C">
        <p>
          Putem actualiza aceste T&C. Data din antetul paginii indică versiunea
          în vigoare. Pentru rezervările confirmate, se aplică versiunea
          acceptată la momentul confirmării, dacă legea nu impune altfel.
        </p>
      </LegalSection>

      <LegalSection id="lege" title="15. Legea aplicabilă și litigiile">
        <p>
          T&C sunt guvernate de legea română. Litigiile se soluționează pe cale
          amiabilă; în caz contrar, de instanțele competente de la sediul
          Prestatorului ({company.city}, jud. {company.county}), fără a aduce
          atingere drepturilor imperative ale consumatorilor privind
          competența.
        </p>
      </LegalSection>

      <LegalSection id="contact-legal" title="16. Contact">
        <p>
          Pentru întrebări privind acești termeni:{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>,{" "}
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>, sediu{" "}
          {company.address}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
