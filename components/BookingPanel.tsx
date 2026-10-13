"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { fleet, pricingRules, type FleetVan } from "@/lib/data";
import {
  calculateRental,
  formatDateRo,
  formatLei,
  rentalDays,
} from "@/lib/pricing";
import { buildWhatsAppQuoteUrl } from "@/lib/whatsapp";
import FancySelect from "./FancySelect";
import DatePicker from "./DatePicker";

function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function addDaysIso(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

type BookingPanelProps = {
  defaultVanId: string;
  className?: string;
};

export default function BookingPanel({
  defaultVanId,
  className = "",
}: BookingPanelProps) {
  const initialPickup = todayIso();
  const [vanId, setVanId] = useState(defaultVanId);
  const [pickup, setPickup] = useState(initialPickup);
  const [dropoff, setDropoff] = useState(addDaysIso(initialPickup, 1));
  const [neededKm, setNeededKm] = useState(300);

  const van = useMemo(
    () => fleet.find((item) => item.id === vanId) as FleetVan | undefined,
    [vanId],
  );

  const days = rentalDays(pickup, dropoff);
  const quote =
    van && days > 0
      ? calculateRental(van, days, van.hasKmLimit ? neededKm : 0)
      : null;
  const valid = Boolean(van && quote && pickup && dropoff && days > 0);

  const whatsappHref =
    valid && van && quote
      ? buildWhatsAppQuoteUrl({
          vanName: van.name,
          categoryLabel: van.categoryLabel,
          pickup,
          dropoff,
          days: quote.days,
          total: quote.total,
          kmIncluded: quote.kmIncluded,
          neededKm: quote.neededKm,
          extraKmLei: quote.extraKmLei,
          depositLei: quote.depositLei,
        })
      : undefined;

  return (
    <div
      className={`rounded-[22px] border border-slate-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] ${className}`}
    >
      <div className="rounded-t-[22px] border-b border-slate-100 bg-[#F8FAFC] px-3.5 py-2.5 sm:px-5 sm:py-3">
        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-brand sm:text-[11px]">
          Calculator ofertă
        </p>
        <h2 className="mt-0.5 text-[0.95rem] font-extrabold tracking-tight text-ink sm:text-[1.05rem]">
          Alege perioada și vezi totalul
        </h2>
      </div>

      <div className="space-y-3 p-3.5 sm:p-5">
        <FancySelect
          label="Vehicul"
          value={vanId}
          onChange={setVanId}
          options={fleet.map((item) => ({
            value: item.id,
            label: item.name,
            hint: `de la ${item.priceFrom} lei/zi · ${item.categoryLabel}`,
          }))}
        />

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <DatePicker
            label="Preluare"
            value={pickup}
            min={todayIso()}
            placement="top"
            onChange={(next) => {
              setPickup(next);
              if (dropoff < next) setDropoff(addDaysIso(next, 1));
            }}
          />
          <DatePicker
            label="Predare"
            value={dropoff}
            min={pickup || todayIso()}
            placement="top"
            align="right"
            onChange={setDropoff}
          />
        </div>

        {van?.hasKmLimit ? (
          <label className="block">
            <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-muted sm:mb-1.5 sm:text-[12px]">
              Km necesari (estimare)
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={50}
              value={neededKm}
              onChange={(e) => setNeededKm(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-[15px] font-semibold text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 sm:py-3"
            />
            <span className="mt-1 block text-[11px] font-medium text-muted">
              Incluși: {pricingRulesKmHint(days)} · extra 50 lei / 100 km
            </span>
          </label>
        ) : van ? (
          <p className="rounded-xl border border-slate-100 bg-[#F8FAFC] px-3.5 py-2.5 text-[12.5px] font-medium text-muted sm:py-3 sm:text-[13px]">
            Remorcă: fără limită de kilometri și fără garanție.
          </p>
        ) : null}

        {quote && van ? (
          <div className="overflow-hidden rounded-xl border border-brand/15 bg-gradient-to-br from-brand-soft to-white p-3 sm:p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-0.5 text-[12px] font-medium text-muted sm:space-y-1">
                <p className="truncate text-[14px] font-extrabold text-ink">
                  {van.name}
                </p>
                <p>
                  {formatDateRo(pickup)} → {formatDateRo(dropoff)}
                </p>
                <p>
                  {quote.days} {quote.days === 1 ? "zi" : "zile"} ×{" "}
                  {formatLei(quote.daily)}
                  {quote.discountLei > 0 ? ` · ${quote.tierLabel}` : ""}
                </p>
                {quote.hasKmLimit ? (
                  <p>
                    ~{quote.kmIncluded} km incluși
                    {quote.extraKmLei > 0
                      ? ` · extra ${formatLei(quote.extraKmLei)}`
                      : ""}
                  </p>
                ) : (
                  <p>Fără limită km</p>
                )}
                <p>
                  Garanție{" "}
                  {quote.depositLei > 0
                    ? `${formatLei(quote.depositLei)} (cash)`
                    : "nu se aplică"}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand">
                  Total
                </p>
                <p className="mt-1 text-[1.45rem] font-extrabold leading-none text-ink">
                  {formatLei(quote.total)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[13px] font-medium text-muted">
            Alege o perioadă validă pentru estimare.
          </p>
        )}

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!valid}
          className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-extrabold text-white transition ${
            valid
              ? "bg-[#25D366] hover:bg-[#1ebe57]"
              : "pointer-events-none bg-slate-300"
          }`}
        >
          <MessageCircle className="size-4" strokeWidth={2.2} aria-hidden />
          Trimite oferta pe WhatsApp
        </a>
        <p className="text-center text-[11px] font-medium leading-snug text-muted">
          Trimițând solicitarea, accepti{" "}
          <a
            href="/termeni-si-conditii"
            className="font-extrabold text-brand underline-offset-2 hover:underline"
          >
            Termenii și condițiile
          </a>{" "}
          și{" "}
          <a
            href="/politica-de-confidentialitate"
            className="font-extrabold text-brand underline-offset-2 hover:underline"
          >
            Politica de confidențialitate
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function pricingRulesKmHint(days: number) {
  const d = Math.max(days, 1);
  const perDay = pricingRules.kmIncludedPerDay;
  return `${perDay * d} km (${d}×${perDay})`;
}
