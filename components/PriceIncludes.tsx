import { Check, Coins, Plus } from "lucide-react";
import {
  priceExample,
  priceExtras,
  priceIncludes,
  pricingRules,
} from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function PriceIncludes() {
  const subtotal = priceExample.daily * priceExample.days;

  return (
    <SectionBackdrop
      id="preturi-include"
      variant="white"
      className="py-16 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: full width */}
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <SectionLabel icon={Coins}>Prețuri</SectionLabel>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="mt-2.5 text-[1.7rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-3 sm:text-[2.92rem]">
              Ce include <span className="text-brand">prețul</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={140}>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-muted sm:mt-3 sm:text-[16px]">
              RCA, rovignetă RO, 300 km/zi. Extra km și reduceri pe zile le vezi
              mai jos.
            </p>
          </Reveal>
        </div>

        {/* Main: example + included */}
        <div className="mt-6 grid gap-6 sm:mt-8 lg:mt-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <Reveal variant="up" delay={160}>
            <div className="h-full min-w-0 rounded-2xl bg-ink p-4 text-white sm:p-6">
              <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-orange-300 sm:text-[12px]">
                Exemplu de calcul
              </p>
              <p className="mt-1.5 text-[15px] font-extrabold sm:mt-2 sm:text-[1.05rem]">
                {priceExample.vanName} · {priceExample.days}{" "}
                {priceExample.days === 1 ? "zi" : "zile"}
              </p>

              <dl className="mt-4 space-y-0 text-[13px] font-medium text-slate-300 sm:mt-5 sm:text-[14px]">
                <div className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2.5">
                  <dt className="min-w-0">
                    {priceExample.days} × {priceExample.daily} lei
                  </dt>
                  <dd className="shrink-0 font-extrabold text-white">
                    {subtotal} lei
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2.5">
                  <dt className="min-w-0">{priceExample.discountLabel}</dt>
                  <dd className="shrink-0 font-extrabold text-emerald-300">
                    {priceExample.discountLei} lei
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2.5">
                  <dt>Km incluși</dt>
                  <dd className="shrink-0 font-extrabold text-white">
                    ~{priceExample.kmIncluded} km
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2.5">
                  <dt className="min-w-0">
                    Extra km (
                    {priceExample.neededKm - priceExample.kmIncluded} km)
                  </dt>
                  <dd className="shrink-0 font-extrabold text-orange-300">
                    +{priceExample.extraKmLei} lei
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pt-3">
                  <dt className="text-[14px] font-extrabold text-white sm:text-[15px]">
                    Total estimat
                  </dt>
                  <dd className="text-[1.45rem] font-extrabold leading-none text-white sm:text-[1.65rem]">
                    {priceExample.total} lei
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-[12px] font-medium leading-snug text-slate-400 sm:mt-4 sm:text-[13px]">
                {priceExample.note} Garanție {pricingRules.depositVehicleLei} lei
                (doar cash).
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5">
                {pricingRules.tiers.map((tier) => (
                  <div
                    key={tier.label}
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[0.05] px-1.5 py-2.5 text-center sm:px-2 sm:py-3"
                  >
                    <p className="truncate text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-[11px]">
                      {tier.minDays === 7
                        ? "7+ zile"
                        : `${tier.minDays} la ${tier.maxDays}`}
                    </p>
                    <p className="mt-1 text-[13px] font-extrabold text-white sm:text-[14px]">
                      {tier.discount === 0
                        ? "standard"
                        : `${Math.round(tier.discount * 100)}%`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-brand sm:text-[12px]">
                <Check className="size-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
                Inclus în tarif
              </p>
              <ul className="mt-3 divide-y divide-slate-100 border-y border-slate-100 sm:mt-4">
                {priceIncludes.map((item) => (
                  <li key={item.title} className="py-3 sm:py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 text-[14px] font-extrabold text-ink sm:text-[15px]">
                        {item.title}
                      </p>
                      <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-extrabold text-brand sm:text-[12px]">
                        {item.value}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] font-medium leading-relaxed text-muted sm:text-[13.5px]">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Extras: full width below */}
        <Reveal variant="up" delay={220}>
          <div className="mt-8 sm:mt-10">
            <p className="inline-flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-brand sm:text-[12px]">
              <Plus className="size-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
              Extra / opțional
            </p>
            <ul className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
              {priceExtras.map((item) => (
                <li
                  key={item.title}
                  className="min-w-0 rounded-xl border border-slate-100 bg-[#F8FAFC] p-3.5 sm:p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 text-[13.5px] font-extrabold leading-snug text-ink sm:text-[14px]">
                      {item.title}
                    </p>
                    <span className="shrink-0 text-[11px] font-extrabold text-brand sm:text-[12px]">
                      {item.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] font-medium leading-snug text-muted sm:text-[13px]">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionBackdrop>
  );
}
