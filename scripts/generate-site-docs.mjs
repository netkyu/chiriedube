#!/usr/bin/env node
/**
 * Ghid vizual chiriedube.ro
 * Captură: lățime completă + element + 20% din înălțime sus/jos.
 * Fără copertă / cuprins.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs/site-walkthrough");
const SHOTS = path.join(OUT, "screenshots");
const BASE = process.env.SITE_URL || "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const WIDTH = 1440;
const PAD = 0.2;

const SECTIONS = [
  {
    id: "header",
    title: "1. Bara de sus (meniul)",
    body: `<strong>Ce vezi:</strong> logo-ul firmei în stânga, meniul în mijloc (Acasă, Flotă, Servicii, Echipă, FAQ, Recenzii, B2B) și butonul portocaliu „Rezervă acum” în dreapta.<br><br><strong>La ce folosește:</strong> rămâne vizibil când derulezi pagina, ca să poți sări rapid la o altă parte a site-ului sau să începi o rezervare.`,
    shot: "01-header.png",
    url: "/",
    keepHeader: true,
    mark: "header",
  },
  {
    id: "hero",
    title: "2. Prima zonă a site-ului (pagina de start)",
    body: `<strong>Ce vezi:</strong> o poză mare cu duba, titlul „Închiriază o dubă simplu și rapid”, un text scurt și două butoane: „Vezi flota” și „Sună acum”. Sub poză apar cele 4 avantaje.<br><br><strong>La ce folosește:</strong> e prima impresie. Clientul înțelege imediat ce oferiți și poate fie să vadă mașinile, fie să sune direct.`,
    shot: "02-hero.png",
    url: "/",
    mark: "hero",
  },
  {
    id: "features",
    title: "3. Cele 4 avantaje de sub poza mare",
    body: `<strong>Ce vezi:</strong> banda albă cu 4 puncte: cu sau fără șofer, prețuri transparente, asistență rapidă, disponibilitate imediată.<br><br><strong>La ce folosește:</strong> răspunde rapid la temerile uzuale (costuri ascunse, șofer, dacă e liberă duba).`,
    shot: "03-features.png",
    url: "/",
    mark: "features",
  },
  {
    id: "fleet",
    title: "4. Flota de pe pagina principală",
    body: `<strong>Ce vezi:</strong> titlul „Dube disponibile pentru închiriere”, butonul „Vezi toată flota” și cardurile cu dube (poză, tip Mică/Mare, volum, preț, Detalii).<br><br><strong>La ce folosește:</strong> clientul compară din ochi câteva modele fără să iasă de pe prima pagină. Săgețile mută lista stânga/dreapta.`,
    shot: "04-fleet.png",
    url: "/",
    mark: "fleet",
  },
  {
    id: "how",
    title: "5. Cum funcționează închirierea",
    body: `<strong>Ce vezi:</strong> caseta „Cum funcționează” cu 3 pași: alegi duba → trimiți cererea → ridici și pleci.<br><br><strong>La ce folosește:</strong> arată că procesul e simplu, ca să nu pară complicat.`,
    shot: "05-how-it-works.png",
    url: "/",
    mark: "how",
  },
  {
    id: "price",
    title: "6. Ce este inclus în preț",
    body: `<strong>Ce vezi:</strong> zona pe fundal albastru închis care listează ce primești odată cu închirierea.<br><br><strong>La ce folosește:</strong> clientul înțelege că prețul pe zi nu e „doar mașina” — și că nu apar surprize la final.`,
    shot: "06-price-includes.png",
    url: "/",
    mark: "price",
  },
  {
    id: "services",
    title: "7. Servicii",
    body: `<strong>Ce vezi:</strong> cardul mare „Cu șofer sau fără” cu poză, plus cardurile: abonamente de tractare, asistență, consultanță, kilometri incluși.<br><br><strong>La ce folosește:</strong> arată că oferiți și variante cu șofer, ajutor pe drum și oferte pe termen mai lung.`,
    shot: "07-services.png",
    url: "/",
    mark: "services",
  },
  {
    id: "team",
    title: "8. Echipa",
    body: `<strong>Ce vezi:</strong> pozele oamenilor din firmă, numele, rolul și cum pot fi contactați.<br><br><strong>La ce folosește:</strong> dă încredere — clientul vede persoane reale, nu doar un formular.`,
    shot: "08-team.png",
    url: "/",
    mark: "team",
  },
  {
    id: "faq",
    title: "9. Întrebări frecvente (FAQ)",
    body: `<strong>Ce vezi:</strong> lista de întrebări; la click se deschide răspunsul (acte, kilometri, garanție, șofer etc.).<br><br><strong>La ce folosește:</strong> răspunde dinainte la nelămuriri, ca să nu trebuiască să sune pentru lucruri simple.`,
    shot: "09-faq.png",
    url: "/",
    mark: "faq",
  },
  {
    id: "reviews",
    title: "10. Recenzii de la clienți",
    body: `<strong>Ce vezi:</strong> carduri cu păreri: poză, nume, stele și citatul clientului.<br><br><strong>La ce folosește:</strong> dovezi că alții au închiriat deja și au fost mulțumiți.`,
    shot: "10-reviews.png",
    url: "/",
    mark: "reviews",
  },
  {
    id: "phonecta",
    title: "11. Bandă „Sună acum”",
    body: `<strong>Ce vezi:</strong> zona mare albastru închis cu mesaj tip „rezervarea e la un apel” și butoane telefon / WhatsApp.<br><br><strong>La ce folosește:</strong> împinge clientul indecis să ia legătura imediat.`,
    shot: "11-phone-cta.png",
    url: "/",
    mark: "phonecta",
  },
  {
    id: "pickup",
    title: "12. Cum preiei duba",
    body: `<strong>Ce vezi:</strong> explicații despre ce se întâmplă după ce rezervi: acte, rezervor, predare.<br><br><strong>La ce folosește:</strong> reduce stresul din ziua preluării.`,
    shot: "12-pickup.png",
    url: "/",
    mark: "pickup",
  },
  {
    id: "b2b",
    title: "13. Ofertă pentru firme + formular de contact",
    body: `<strong>Ce vezi:</strong> text pentru companii și formularul: nume, telefon, email, mesaj.<br><br><strong>La ce folosește:</strong> firmele pot cere o ofertă scrisă fără calculatorul de pe pagina dubei.`,
    shot: "13-b2b.png",
    url: "/",
    mark: "b2b",
  },
  {
    id: "footer",
    title: "14. Subsolul paginii (footer)",
    body: `<strong>Ce vezi:</strong> logo, datele firmei (DUAL SKYTECH SRL), linkuri de navigare, linkuri legale și contact (telefon, email, adresă).<br><br><strong>La ce folosește:</strong> locul cu informațiile oficiale și documentele legale.`,
    shot: "14-footer.png",
    url: "/",
    mark: "footer",
  },
  {
    id: "floating",
    title: "15. Butoanele care „plutesc” jos în dreapta",
    body: `<strong>Ce vezi:</strong> în colțul din dreapta-jos: buton verde WhatsApp și buton portocaliu cu numărul de telefon.<br><br><strong>La ce folosește:</strong> poți suna sau scrie oricând, fără să cauți contactul. Apar pe aproape toate paginile.`,
    shot: "15-contact-cta.png",
    url: "/",
    mark: "floating",
    floating: true,
  },
  {
    id: "cookies",
    title: "16. Fereastra de cookies",
    body: `<strong>Ce vezi:</strong> popup-ul de la prima vizită: poți accepta toate cookie-urile, doar pe cele esențiale, sau poți alege pe categorii.<br><br><strong>La ce folosește:</strong> respectă legea și îi dă vizitatorului control asupra datelor. Preferințele se pot schimba din subsol („Setări cookies”).`,
    shot: "16-cookies.png",
    url: "/",
    openCookies: true,
    mark: "cookies",
  },
  {
    id: "mobile",
    title: "17. Meniul pe telefon",
    body: `<strong>Ce vezi:</strong> pe ecran mic, meniul se ascunde în spatele celor 3 linii. La deschidere apar aceleași linkuri + butonul de rezervare.<br><br><strong>La ce folosește:</strong> site-ul rămâne ușor de folosit și pe telefon.`,
    shot: "17-mobile-menu.png",
    url: "/",
    mobile: true,
    keepHeader: true,
    mark: "mobile",
  },
  {
    id: "catalog",
    title: "18. Pagina cu toate dubele",
    body: `<strong>Ce vezi:</strong> pagina /flota cu toate modelele, filtre (mărime, marcă) și sortare.<br><br><strong>La ce folosește:</strong> când vrei să vezi toată oferta deodată, nu doar cele din caruselul de pe prima pagină.`,
    shot: "18-fleet-catalog.png",
    url: "/flota",
    mark: "catalog",
  },
  {
    id: "detail",
    title: "19. Pagina unei dube (detalii)",
    body: `<strong>Ce vezi:</strong> în stânga poza + miniaturi și specificații; în dreapta numele, prețul și calculatorul de ofertă.<br><br><strong>La ce folosește:</strong> aici clientul decide dacă duba e potrivită și calculează cât costă perioada aleasă.`,
    shot: "19-van-detail.png",
    url: "/flota/sprinter",
    mark: "detail",
  },
  {
    id: "booking",
    title: "20. Calculatorul de rezervare",
    body: `<strong>Ce vezi:</strong> caseta „Calculator ofertă” — alegi duba, datele de preluare/predare, vezi totalul și trimiți pe WhatsApp.<br><br><strong>La ce folosește:</strong> nu calculezi tu prețul; site-ul o face. Nu plătești pe site — confirmi pe WhatsApp.`,
    shot: "20-booking-panel.png",
    url: "/flota/sprinter",
    mark: "booking",
  },
  {
    id: "datepicker",
    title: "21. Calendarul pentru alegerea datelor",
    body: `<strong>Ce vezi:</strong> după ce apeși pe data de preluare, se deschide calendarul pe luni (în poza de mai jos e deja deschis).<br><br><strong>La ce folosește:</strong> e mai clar decât să tastezi data manual.`,
    shot: "21-datepicker.png",
    url: "/flota/sprinter",
    openDatepicker: true,
    mark: "datepicker",
  },
  {
    id: "vanseSelect",
    title: "22. Lista de dube din calculator",
    body: `<strong>Ce vezi:</strong> meniul deschis cu toate dubele, prețul pe zi și volumul. Poți schimba modelul fără să pleci de pe pagină.<br><br><strong>La ce folosește:</strong> dacă vrei alt model, totalul se recalculează pe loc.`,
    shot: "22-van-select.png",
    url: "/flota/sprinter",
    openVanSelect: true,
    mark: "vanseSelect",
  },
  {
    id: "compare",
    title: "23. Compararea a două dube",
    body: `<strong>Ce vezi:</strong> tabelul „Sprinter vs alt model”: preț, volum, greutate, dimensiuni, an. Bifele portocalii arată unde e mai avantajos fiecare.<br><br><strong>La ce folosește:</strong> vezi clar dacă merită să plătești mai mult pentru un model mai încăpător.`,
    shot: "23-compare.png",
    url: "/flota/sprinter",
    mark: "compare",
  },
  {
    id: "gallery",
    title: "24. Galeria de poze a dubei",
    body: `<strong>Ce vezi:</strong> poza principală și miniaturile (față, lateral, spate, interior). În poză e selectată a doua miniatură.<br><br><strong>La ce folosește:</strong> verifici aspectul exterior și spațiul din spate înainte să rezervi.`,
    shot: "24-gallery.png",
    url: "/flota/sprinter",
    openGallery: true,
    mark: "gallery",
  },
  {
    id: "terms",
    title: "25. Termeni și condiții",
    body: `<strong>Ce vezi:</strong> pagina cu regulile oficiale: rezervare, plată, garanție, anulare, răspundere, datele firmei.<br><br><strong>La ce folosește:</strong> e „contractul” pe scurt — merită citit înainte să confirmi o rezervare.`,
    shot: "25-termeni.png",
    url: "/termeni-si-conditii",
    mark: "legal",
  },
  {
    id: "privacy",
    title: "26. Politica de confidențialitate",
    body: `<strong>Ce vezi:</strong> ce date personale colectează site-ul, de ce le folosește și ce drepturi ai.<br><br><strong>La ce folosește:</strong> transparență față de clienți, conform legii.`,
    shot: "26-privacy.png",
    url: "/politica-de-confidentialitate",
    mark: "legal",
  },
  {
    id: "cookiePolicy",
    title: "27. Politica de cookies",
    body: `<strong>Ce vezi:</strong> tipurile de cookie-uri, la ce servesc și cum le poți opri.<br><br><strong>La ce folosește:</strong> explicația pe larg a ferestrei de cookies.`,
    shot: "27-cookies-policy.png",
    url: "/politica-cookies",
    mark: "legal",
  },
  {
    id: "notfound",
    title: "28. Pagina „nu am găsit” (404)",
    body: `<strong>Ce vezi:</strong> mesaj prietenos când linkul e greșit, plus butoane spre Acasă sau Flotă.<br><br><strong>La ce folosește:</strong> clientul nu rămâne blocat — e ghidat înapoi în site.`,
    shot: "28-404.png",
    url: "/pagina-inexistenta-demo-404",
    mark: "notfound",
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Marchează elementele cu data-docs pentru selecție stabilă. */
async function markTargets(page) {
  await page.evaluate(() => {
    document.querySelectorAll("[data-docs]").forEach((el) => {
      if (el.id?.startsWith("__docs-box")) el.remove();
      else el.removeAttribute("data-docs");
    });
    document.querySelectorAll("[id^='__docs-box']").forEach((el) => el.remove());

    function mark(el, id) {
      if (el) el.setAttribute("data-docs", id);
    }

    function absBox(top, height, id) {
      document.getElementById(`__docs-box-${id}`)?.remove();
      // curăță vechiul id singular dacă există
      const legacy = document.getElementById("__docs-box");
      if (legacy?.getAttribute("data-docs") === id) legacy.remove();
      const box = document.createElement("div");
      box.id = `__docs-box-${id}`;
      box.setAttribute("data-docs", id);
      box.style.cssText = `position:absolute;left:0;width:${window.innerWidth}px;top:${top}px;height:${Math.max(60, height)}px;pointer-events:none;z-index:-1;`;
      document.body.appendChild(box);
      return box;
    }

    mark(document.querySelector("header"), "header");
    mark(document.querySelector("#acasa"), "hero");

    const feat = [...document.querySelectorAll("div.rounded-2xl")].find(
      (n) =>
        (n.textContent || "").includes("Cu sau fără șofer") &&
        (n.textContent || "").includes("Prețuri transparente") &&
        n.getBoundingClientRect().height < 280,
    );
    mark(feat, "features");

    // fleet = #flota fără „Cum funcționează”
    {
      const section = document.querySelector("#flota");
      if (section) {
        const how = [...section.querySelectorAll("h2")].find((h) =>
          /cum funcționează/i.test(h.textContent || ""),
        );
        const howCard = how?.closest(".rounded-2xl");
        const top = section.getBoundingClientRect().top + window.scrollY;
        const bottom = howCard
          ? howCard.getBoundingClientRect().top + window.scrollY - 12
          : section.getBoundingClientRect().bottom + window.scrollY;
        absBox(top, bottom - top, "fleet");
      }
    }

    {
      const h = [...document.querySelectorAll("h2")].find((x) =>
        /cum funcționează/i.test(x.textContent || ""),
      );
      mark(h?.closest(".rounded-2xl") || h, "how");
    }

    mark(document.querySelector("#preturi-include"), "price");
    mark(document.querySelector("#servicii"), "services");
    mark(document.querySelector("#despre"), "team");
    mark(document.querySelector("#faq"), "faq");
    mark(document.querySelector("#recenzii"), "reviews");

    {
      const t = [...document.querySelectorAll("h2, span, p")].find((x) =>
        /rezervarea e la un apel/i.test(x.textContent || ""),
      );
      mark(t?.closest("section"), "phonecta");
    }

    mark(document.querySelector("#preluare"), "pickup");
    mark(document.querySelector("#contact"), "b2b");
    mark(document.querySelector("footer"), "footer");

    mark(
      document.querySelector("div.fixed a[href*='wa.me']")?.closest("div.fixed"),
      "floating",
    );

    mark(document.querySelector('[role="dialog"]'), "cookies");

    // catalog / 404 — doar pe paginile respective (fără a călca alte mark-uri)
    if (location.pathname.includes("/flota") && !location.pathname.match(/\/flota\/.+/)) {
      mark(document.querySelector("main"), "catalog");
    }
    if (document.title.toLowerCase().includes("negăsit") || document.title.includes("404") || document.querySelector("main h1")) {
      // 404 only if no fleet/van markers needed — set lightly
      if (!document.querySelector("#flota") && !location.pathname.includes("/flota")) {
        mark(document.querySelector("main"), "notfound");
      }
    }

    // detail: main până la comparație
    {
      const main = document.querySelector("main");
      const compare = [...document.querySelectorAll("p, h2")].find(
        (x) =>
          (/compară/i.test(x.textContent || "") &&
            (x.textContent || "").trim().length < 40) ||
          /vs alt model/i.test(x.textContent || ""),
      );
      const compareCard = compare?.closest(".rounded-2xl");
      if (main && compareCard) {
        const top = main.getBoundingClientRect().top + window.scrollY;
        const bottom =
          compareCard.getBoundingClientRect().top + window.scrollY - 16;
        absBox(top, bottom - top, "detail");
      } else if (main && location.pathname.match(/\/flota\/.+/)) {
        mark(main, "detail");
      }
    }

    {
      const h = [...document.querySelectorAll("p")].find((x) =>
        /calculator ofertă/i.test(x.textContent || ""),
      );
      let n = h;
      for (let i = 0; i < 8 && n; i++) {
        if (
          typeof n.className === "string" &&
          n.className.includes("rounded-[22px]")
        ) {
          mark(n, "booking");
          break;
        }
        n = n.parentElement;
      }
    }

    // datepicker: panel + dialog
    {
      const dialog = document.querySelector('[role="dialog"]');
      const booking = document.querySelector('[data-docs="booking"]');
      if (dialog && booking) {
        const r1 = booking.getBoundingClientRect();
        const r2 = dialog.getBoundingClientRect();
        const top = Math.min(r1.top, r2.top) + window.scrollY;
        const bottom = Math.max(r1.bottom, r2.bottom) + window.scrollY;
        absBox(top, bottom - top, "datepicker");
      } else if (dialog) {
        mark(dialog, "datepicker");
      }
    }

    // van select: trigger + list
    {
      const list = document.querySelector('[role="listbox"]');
      const btn = document.querySelector("button[aria-haspopup='listbox']");
      const wrap = btn?.parentElement;
      if (list && wrap) {
        const r1 = wrap.getBoundingClientRect();
        const r2 = list.getBoundingClientRect();
        const top = Math.min(r1.top, r2.top) + window.scrollY;
        const bottom = Math.max(r1.bottom, r2.bottom) + window.scrollY;
        absBox(top, bottom - top, "vanseSelect");
      } else if (list) {
        mark(list, "vanseSelect");
      }
    }

    {
      const h = [...document.querySelectorAll("p, h2")].find(
        (x) =>
          /compară/i.test(x.textContent || "") &&
          (x.textContent || "").trim().length < 40,
      );
      mark(h?.closest(".rounded-2xl") || h, "compare");
    }

    {
      const img = document.querySelector("main img");
      mark(
        img?.closest(".rounded-2xl") || img?.closest(".overflow-hidden") || img,
        "gallery",
      );
    }

    // legal: primele ~1100px din main
    {
      const main = document.querySelector("main");
      const path = location.pathname;
      if (
        main &&
        (path.includes("termeni") ||
          path.includes("confidentialitate") ||
          path.includes("cookies"))
      ) {
        const top = main.getBoundingClientRect().top + window.scrollY;
        absBox(top, 1100, "legal");
      }
    }
  });
}

async function preparePage(page, { keepHeader = false } = {}) {
  await page.evaluate((keepHeader) => {
    try {
      localStorage.setItem(
        "chiriedube_cookie_consent",
        JSON.stringify({
          essential: true,
          analytics: false,
          marketing: false,
          updatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      /* ignore */
    }
    [...document.querySelectorAll("button")]
      .find((b) => /acceptă toate/i.test(b.textContent || ""))
      ?.click();
    document.querySelectorAll('[role="dialog"]').forEach((d) => {
      if ((d.textContent || "").toLowerCase().includes("cookie")) {
        d.style.display = "none";
      }
    });
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));

    document.querySelectorAll("header").forEach((el) => {
      if (keepHeader) {
        el.style.setProperty("position", "relative", "important");
      } else {
        el.style.setProperty("position", "relative", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("height", "0px", "important");
        el.style.setProperty("min-height", "0", "important");
        el.style.setProperty("overflow", "hidden", "important");
        el.style.setProperty("margin", "0", "important");
        el.style.setProperty("padding", "0", "important");
        el.style.setProperty("border", "none", "important");
      }
    });

    // Ascunde CTA flotant în capturi normale (îl vrem doar la floating)
    document.querySelectorAll("div.fixed").forEach((el) => {
      if (el.getAttribute("role") === "dialog") return;
      if (el.querySelector('a[href*="wa.me"]')) {
        el.setAttribute("data-float-cta", "1");
      }
    });

    if (!document.getElementById("__docs-style")) {
      const style = document.createElement("style");
      style.id = "__docs-style";
      style.textContent = `
        *, *::before, *::after { animation: none !important; transition: none !important; }
        .reveal, .reveal:not(.is-in) {
          opacity: 1 !important; transform: none !important;
          filter: none !important; visibility: visible !important; clip-path: none !important;
        }
        nextjs-portal, [data-nextjs-toast] { display: none !important; }
        body:not([data-show-float]) [data-float-cta] { visibility: hidden !important; }
      `;
      document.documentElement.appendChild(style);
    }
  }, keepHeader);
  await sleep(200);
}

/**
 * Full-width clip around [data-docs=mark] with 20% vertical padding.
 */
async function shotMarked(page, mark, file, { floating = false, width = WIDTH, dpr = 1 } = {}) {
  const out = path.join(SHOTS, file);

  if (floating) {
    await page.evaluate(() => document.body.setAttribute("data-show-float", "1"));
    // context: scroll la flotă
    await page.evaluate(() => {
      const el = document.querySelector("#flota") || document.querySelector("#servicii");
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 80);
    });
    await sleep(300);
  }

  const el = await page.$(`[data-docs="${mark}"]`);
  if (!el) {
    console.log(`(missing ${mark}) `);
    await page.screenshot({ path: out });
    return;
  }

  // Adu elementul aproape de top, cu loc pentru padding
  await page.evaluate(
    (sel, padRatio) => {
      const node = document.querySelector(sel);
      if (!node) return;
      const r = node.getBoundingClientRect();
      const pad = r.height * padRatio;
      const target = window.scrollY + r.top - pad;
      window.scrollTo(0, Math.max(0, target));
    },
    `[data-docs="${mark}"]`,
    PAD,
  );
  await sleep(400);

  // Re-mark fleet/detail/legal boxes after scroll (absolute positions)
  if (["fleet", "detail", "legal", "datepicker", "vanseSelect"].includes(mark)) {
    await markTargets(page);
    await sleep(100);
  }

  const box = await page.evaluate(
    (sel, padRatio, floating) => {
      const node = document.querySelector(sel);
      if (!node) return null;
      const r = node.getBoundingClientRect();
      const pad = Math.max(8, r.height * padRatio);

      if (floating) {
        // bandă full-width care include butoanele + context deasupra
        const y = Math.max(0, r.top - 220);
        const bottom = Math.min(window.innerHeight, r.bottom + pad);
        return {
          x: 0,
          y: Math.round(y),
          width: window.innerWidth,
          height: Math.round(bottom - y),
        };
      }

      const y = Math.max(0, r.top - pad);
      const bottom = r.bottom + pad;
      return {
        x: 0,
        y: Math.round(y),
        width: window.innerWidth,
        height: Math.round(bottom - y),
        debug: {
          rTop: r.top,
          rH: r.height,
          text: (node.textContent || "").trim().slice(0, 40),
        },
      };
    },
    `[data-docs="${mark}"]`,
    PAD,
    floating,
  );

  if (!box || box.height < 20) {
    console.log(`(bad box ${mark}) `);
    await page.screenshot({ path: out });
    return;
  }

  // Asigură viewport suficient
  const need = box.y + box.height + 40;
  const vp = page.viewport();
  if (!vp || vp.height < need) {
    const scrollY = await page.evaluate(() => window.scrollY);
    await page.setViewport({
      width,
      height: Math.min(8000, Math.max(900, need)),
      deviceScaleFactor: dpr,
    });
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await sleep(200);
  }

  await page.screenshot({
    path: out,
    clip: {
      x: 0,
      y: box.y,
      width,
      height: box.height,
    },
  });

  if (floating) {
    await page.evaluate(() => document.body.removeAttribute("data-show-float"));
  }
}

async function capture(page, section) {
  const width = section.mobile ? 390 : WIDTH;
  const dpr = section.mobile ? 2 : 1;

  if (section.openCookies) {
    await page.setViewport({ width: WIDTH, height: 1200, deviceScaleFactor: 1 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 60000 });
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => /cookie|consent/i.test(k))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload({ waitUntil: "networkidle2" });
    await sleep(600);
    // Nu apela prepare care ascunde dialogul — doar reveals + hide header
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      document.querySelectorAll("header").forEach((el) => {
        el.style.setProperty("position", "relative", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("height", "0px", "important");
        el.style.setProperty("overflow", "hidden", "important");
        el.style.setProperty("margin", "0", "important");
        el.style.setProperty("padding", "0", "important");
        el.style.setProperty("border", "none", "important");
      });
      window.dispatchEvent(new Event("chiriedube:open-cookie-settings"));
    });
    await sleep(500);
    // Dacă tot nu e dialog, click pe ceva
    await page.evaluate(() => {
      if (!document.querySelector('[role="dialog"]')) {
        window.dispatchEvent(new Event("chiriedube:open-cookie-settings"));
      }
    });
    await sleep(300);
  } else if (section.mobile) {
    await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 2 });
    await page.goto(`${BASE}${section.url}`, { waitUntil: "networkidle2", timeout: 60000 });
    await preparePage(page, { keepHeader: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    const btn = await page.$('button[aria-label*="meniul"], button[aria-label*="Meniu"]');
    if (btn) await btn.click();
    await sleep(400);
    await page.evaluate(() => {
      document.querySelector("header")?.setAttribute("data-docs", "mobile");
    });
  } else {
    await page.setViewport({ width, height: 2000, deviceScaleFactor: dpr });
    await page.goto(`${BASE}${section.url}`, { waitUntil: "networkidle2", timeout: 60000 });
    await preparePage(page, { keepHeader: Boolean(section.keepHeader) });
  }

  if (section.openDatepicker) {
    await page.keyboard.press("Escape");
    await page.evaluate(() => {
      const h = [...document.querySelectorAll("p")].find((x) =>
        /calculator ofertă/i.test(x.textContent || ""),
      );
      h?.scrollIntoView({ block: "center" });
    });
    await sleep(250);
    await page.evaluate(() => {
      document.querySelector("button[aria-haspopup='dialog']")?.click();
    });
    await sleep(400);
  }

  if (section.openVanSelect) {
    await page.keyboard.press("Escape");
    await sleep(100);
    await page.evaluate(() => {
      const h = [...document.querySelectorAll("p")].find((x) =>
        /calculator ofertă/i.test(x.textContent || ""),
      );
      h?.scrollIntoView({ block: "center" });
    });
    await sleep(250);
    await page.evaluate(() => {
      const h = [...document.querySelectorAll("p")].find((x) =>
        /calculator ofertă/i.test(x.textContent || ""),
      );
      let panel = h;
      for (let i = 0; i < 8 && panel; i++) {
        if (
          typeof panel.className === "string" &&
          panel.className.includes("rounded-[22px]")
        )
          break;
        panel = panel.parentElement;
      }
      panel?.querySelector("button[aria-haspopup='listbox']")?.click();
    });
    await sleep(400);
  }

  if (section.openGallery) {
    await page.evaluate(() => {
      const thumbs = document.querySelectorAll("[class*='grid-cols-4'] button");
      if (thumbs[1]) thumbs[1].click();
    });
    await sleep(300);
  }

  await markTargets(page);
  await shotMarked(page, section.mark, section.shot, {
    floating: Boolean(section.floating),
    width,
    dpr,
  });
}

async function buildHtml(sections) {
  const blocks = sections
    .map((s) => {
      const img = `<figure>
        <img src="screenshots/${s.shot}" alt="${escapeHtml(s.title)}" />
        <figcaption>${escapeHtml(s.title)}</figcaption>
      </figure>`;
      return `<section class="sec" id="${s.id}">
        <h2>${escapeHtml(s.title)}</h2>
        <div class="body">${s.body}</div>
        ${img}
      </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="utf-8" />
<title>chiriedube.ro — Ghid secțiuni</title>
<style>
  @page { size: A4; margin: 11mm 10mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #001f38;
    font-size: 10.5pt;
    line-height: 1.5;
    margin: 0;
  }
  .sec {
    break-inside: avoid;
    page-break-inside: avoid;
    margin: 0 0 20px;
    padding: 0 0 14px;
    border-bottom: 1px solid #e2e8f0;
  }
  .sec h2 { font-size: 13.5pt; margin: 0 0 8px; }
  .sec .body { color: #334155; margin-bottom: 10px; }
  .sec .body strong { color: #001f38; }
  figure { margin: 0; }
  figure img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }
  figcaption { font-size: 8.5pt; color: #94a3b8; margin-top: 5px; }
</style>
</head>
<body>
  ${blocks}
</body>
</html>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  await fs.mkdir(SHOTS, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars", "--font-render-hinting=none"],
    defaultViewport: { width: WIDTH, height: 2000, deviceScaleFactor: 1 },
  });

  const page = await browser.newPage();

  console.log("Capturi reparate…");
  for (const section of SECTIONS) {
    process.stdout.write(`  · ${section.id}… `);
    try {
      await capture(page, section);
      console.log("ok");
    } catch (err) {
      console.log("FAIL:", err.message);
      try {
        await page.screenshot({ path: path.join(SHOTS, section.shot) });
      } catch {
        /* ignore */
      }
    }
  }

  const htmlPath = path.join(OUT, "ghid-sectiuni.html");
  const pdfPath = path.join(OUT, "chiriedube-ghid-sectiuni.pdf");
  await fs.writeFile(htmlPath, await buildHtml(SECTIONS), "utf8");

  console.log("PDF…");
  const pdfPage = await browser.newPage();
  await pdfPage.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 120000 });
  await sleep(600);
  await pdfPage.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "10mm", bottom: "10mm", left: "9mm", right: "9mm" },
  });

  await browser.close();
  console.log(`\nGata.\n${pdfPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
