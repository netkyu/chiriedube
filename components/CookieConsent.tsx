"use client";

import { useEffect, useState } from "react";
import { Cookie, Settings2, X } from "lucide-react";

const STORAGE_KEY = "chiriedube_cookie_consent";

export type CookieConsentValue = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

function readConsent(): CookieConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentValue;
  } catch {
    return null;
  }
}

function writeConsent(value: Omit<CookieConsentValue, "essential" | "updatedAt">) {
  const payload: CookieConsentValue = {
    essential: true,
    analytics: value.analytics,
    marketing: value.marketing,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent("chiriedube:cookie-consent", { detail: payload }));
  return payload;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("chiriedube:open-cookie-settings"));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [panel, setPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }

    function onOpen() {
      const current = readConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setPanel(true);
      setVisible(true);
    }

    window.addEventListener("chiriedube:open-cookie-settings", onOpen);
    return () =>
      window.removeEventListener("chiriedube:open-cookie-settings", onOpen);
  }, []);

  function acceptAll() {
    writeConsent({ analytics: true, marketing: true });
    setVisible(false);
    setPanel(false);
  }

  function essentialOnly() {
    writeConsent({ analytics: false, marketing: false });
    setVisible(false);
    setPanel(false);
  }

  function savePreferences() {
    writeConsent({ analytics, marketing });
    setVisible(false);
    setPanel(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 z-[60] px-3 sm:px-4 sm:pr-28"
      style={{
        bottom:
          "max(5.25rem, calc(env(safe-area-inset-bottom, 0px) + 4.25rem))",
      }}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
        <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
          <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <Cookie className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h2
                id="cookie-title"
                className="text-[1.05rem] font-extrabold text-ink"
              >
                Cookies pe chiriedube.ro
              </h2>
              {panel ? (
                <button
                  type="button"
                  aria-label="Închide setările"
                  onClick={() => setPanel(false)}
                  className="rounded-lg p-1 text-muted transition hover:bg-surface hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
            <p
              id="cookie-desc"
              className="mt-1.5 text-[13px] font-medium leading-snug text-muted sm:text-[14px]"
            >
              Folosim cookies esențiale pentru funcționarea site-ului. Cu acordul
              tău putem folosi și cookies analitice / de marketing. Detalii în{" "}
              <a
                href="/politica-cookies"
                className="font-extrabold text-brand underline-offset-2 hover:underline"
              >
                Politica de cookies
              </a>{" "}
              și{" "}
              <a
                href="/politica-de-confidentialitate"
                className="font-extrabold text-brand underline-offset-2 hover:underline"
              >
                Confidențialitate
              </a>
              .
            </p>

            {panel ? (
              <div className="mt-4 space-y-3 rounded-xl bg-surface p-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 accent-brand"
                  />
                  <span>
                    <span className="block text-[14px] font-extrabold text-ink">
                      Esențiale
                    </span>
                    <span className="text-[12px] font-medium text-muted">
                      Necesare pentru site și memorarea consimțământului.
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 accent-brand"
                  />
                  <span>
                    <span className="block text-[14px] font-extrabold text-ink">
                      Analitice
                    </span>
                    <span className="text-[12px] font-medium text-muted">
                      Ne ajută să înțelegem cum e folosit site-ul.
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-1 accent-brand"
                  />
                  <span>
                    <span className="block text-[14px] font-extrabold text-ink">
                      Marketing
                    </span>
                    <span className="text-[12px] font-medium text-muted">
                      Măsurarea campaniilor (doar dacă sunt active).
                    </span>
                  </span>
                </label>
              </div>
            ) : null}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-[14px] font-extrabold text-white transition hover:bg-brand-dark"
              >
                Acceptă toate
              </button>
              <button
                type="button"
                onClick={essentialOnly}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-extrabold text-ink transition hover:bg-surface"
              >
                Doar esențiale
              </button>
              {panel ? (
                <button
                  type="button"
                  onClick={savePreferences}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[14px] font-extrabold text-white transition hover:bg-slate-800"
                >
                  Salvează preferințele
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPanel(true)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-extrabold text-ink transition hover:bg-surface"
                >
                  <Settings2 className="size-4" aria-hidden />
                  Personalizează
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
