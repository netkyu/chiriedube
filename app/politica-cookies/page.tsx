import type { Metadata } from "next";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import { company, contact, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politica de cookies",
  description:
    "Ce cookies folosește chiriedube.ro, de ce, și cum îți poți gestiona consimțământul.",
  alternates: { canonical: `${siteConfig.url}/politica-cookies` },
  openGraph: {
    title: "Politica de cookies — chiriedube.ro",
    description:
      "Informații despre cookies esențiale, analitice și preferințe pe chiriedube.ro.",
    url: `${siteConfig.url}/politica-cookies`,
  },
};

export default function CookiesPage() {
  return (
    <LegalShell
      title="Politica de cookies"
      description="Această politică explică ce sunt cookies-urile, cum le folosim pe chiriedube.ro și ce opțiuni ai. Se completează cu Politica de confidențialitate."
    >
      <LegalSection id="ce-sunt" title="1. Ce sunt cookies-urile">
        <p>
          Cookies-urile sunt fișiere text de mici dimensiuni stocate pe
          dispozitivul tău când vizitezi un site. Pot fi „de sesiune” (se șterg
          la închiderea browserului) sau „persistente” (rămân până la expirare
          sau ștergere). Pot fi setate de noi (first-party) sau de parteneri
          (third-party).
        </p>
        <p>
          Tehnologii similare (localStorage, sessionStorage, pixeli) sunt
          tratate similar în această politică, unde se aplică.
        </p>
      </LegalSection>

      <LegalSection id="cum-folosim" title="2. Cum folosim cookies pe chiriedube.ro">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full min-w-[520px] text-left text-[13px]">
            <thead className="bg-[#F8FAFC] text-[11px] font-extrabold uppercase tracking-[0.08em] text-muted">
              <tr>
                <th className="px-3 py-2.5">Categorie</th>
                <th className="px-3 py-2.5">Scop</th>
                <th className="px-3 py-2.5">Durată tipică</th>
                <th className="px-3 py-2.5">Consimțământ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-3 py-3 font-extrabold text-ink">
                  Esențiale
                </td>
                <td className="px-3 py-3">
                  Funcționarea site-ului, memorarea consimțământului cookies,
                  securitate de bază, preferințe strict necesare.
                </td>
                <td className="px-3 py-3">Sesiune / până la 12 luni</td>
                <td className="px-3 py-3">Nu necesită (interes legitim / necesar)</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-extrabold text-ink">
                  Preferințe
                </td>
                <td className="px-3 py-3">
                  Reținerea unor setări de interfață (ex. filtre flotă), dacă
                  sunt activate.
                </td>
                <td className="px-3 py-3">Până la 6 luni</td>
                <td className="px-3 py-3">Da, dacă nu sunt strict necesare</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-extrabold text-ink">
                  Analitice
                </td>
                <td className="px-3 py-3">
                  Statistici anonimizate / agregate despre trafic (dacă
                  integrăm un instrument de analytics).
                </td>
                <td className="px-3 py-3">Până la 24 luni</td>
                <td className="px-3 py-3">Da</td>
              </tr>
              <tr>
                <td className="px-3 py-3 font-extrabold text-ink">
                  Marketing
                </td>
                <td className="px-3 py-3">
                  Remarketing / măsurarea campaniilor (doar dacă sunt activate
                  pe site).
                </td>
                <td className="px-3 py-3">Până la 12 luni</td>
                <td className="px-3 py-3">Da</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          În starea curentă a site-ului, folosim cu prioritate cookies / stocare
          locală <strong>esențială</strong> pentru a reține alegerea ta din
          bannerul de consimțământ (<code className="rounded bg-surface px-1.5 py-0.5 text-[13px] font-bold">chiriedube_cookie_consent</code>).
          Dacă adăugăm analytics sau marketing, acestea vor rula doar după
          accept.
        </p>
      </LegalSection>

      <LegalSection id="gestionare" title="3. Cum îți gestionezi opțiunile">
        <ul>
          <li>
            Folosește bannerul de cookies de pe site: <strong>Acceptă toate</strong>,{" "}
            <strong>Doar esențiale</strong> sau redeschide preferințele din
            linkul „Setări cookies” din footer.
          </li>
          <li>
            Poți șterge cookies din setările browserului (Chrome, Safari,
            Firefox, Edge etc.).
          </li>
          <li>
            Blocarea cookies esențiale poate afecta funcționarea unor părți
            ale site-ului.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="terti" title="4. Terți">
        <p>
          Când apeși linkuri către WhatsApp, Google Maps, ANPC sau alte site-uri,
          acei operatori pot seta propriile cookies, conform politicilor lor.
          {company.legalName} nu controlează cookies-urile terților de pe
          domeniile lor.
        </p>
      </LegalSection>

      <LegalSection id="temei" title="5. Temei legal">
        <p>
          Cookies esențiale: necesare pentru serviciul solicitat / interes
          legitim. Cookies neesențiale: consimțământ (Directiva ePrivacy, Legea
          nr. 506/2004, GDPR). Detalii despre prelucrarea datelor:{" "}
          <a href="/politica-de-confidentialitate">
            Politica de confidențialitate
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="contact-cookies" title="6. Contact">
        <p>
          Întrebări despre cookies:{" "}
          <a href={`mailto:${contact.privacyEmail}`}>
            {contact.privacyEmail}
          </a>{" "}
          · {company.legalName}, {company.address}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
