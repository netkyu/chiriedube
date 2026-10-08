import { Check, Plus } from "lucide-react";
import {
  priceExample,
  priceExtras,
  priceIncludes,
  pricingRules,
} from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import Reveal from "./Reveal";

export default function PriceIncludes() {
  const subtotal = priceExample.daily * priceExample.days;

  return (
    <SectionBackdrop
      id="preturi-include"
      variant="white"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-14">
          <div>
            <Reveal variant="clip">
              <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-brand">
                Transparență totală
              </span>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[2.92rem]">
                Ce include <span className="text-brand">prețul</span>
              </h2>
            </Reveal>
            <Reveal variant="blur" delay={160}>
              <p className="mt-3 max-w-md text-[16px] font-medium leading-relaxed text-muted">
                Fără surprize la predare: vezi clar ce e în tarif, ce e extra și
                cum scade prețul pe perioade mai lungi.
              </p>
            </Reveal>

            <Reveal variant="up" delay={220}>
              <div className="mt-8 overflow-hidden rounded-[24px] bg-ink p-5 text-white sm:p-6">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-orange-300">
                  Exemplu de calcul
                </p>
                <p className="mt-2 text-[1.15rem] font-extrabold">
                  {priceExample.vanName} · {priceExample.days} zile
                </p>

                <dl className="mt-5 space-y-3 text-[14px] font-medium text-slate-300">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt>
                      {priceExample.days} × {priceExample.daily} lei
                    </dt>
                    <dd className="font-extrabold text-white">{subtotal} lei</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt>{priceExample.discountLabel}</dt>
                    <dd className="font-extrabold text-emerald-300">
                      −{priceExample.discountLei} lei
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt>Km incluși</dt>
                    <dd className="font-extrabold text-white">
                      ~{priceExample.kmIncluded} km
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <dt className="text-[15px] font-extrabold text-white">
                      Total estimat
                    </dt>
                    <dd className="text-[1.85rem] font-extrabold leading-none text-white">
                      {priceExample.total} lei
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-[13px] font-medium text-slate-400">
                  {priceExample.note} Garanție {pricingRules.depositLei} lei —
                  rambursabilă.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {pricingRules.tiers.map((tier) => (
                    <div
                      key={tier.label}
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-1.5 py-2.5 text-center sm:px-2.5 sm:py-3"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-[11px]">
                        {tier.minDays === 7
                          ? "7+ zile"
                          : `${tier.minDays}–${tier.maxDays} zile`}
                      </p>
                      <p className="mt-1 text-[13px] font-extrabold text-white sm:text-[15px]">
                        {tier.discount === 0
                          ? "standard"
                          : `−${Math.round(tier.discount * 100)}%`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal variant="right" delay={120}>
              <div>
                <p className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-brand">
                  <Check className="size-3.5" strokeWidth={2.6} aria-hidden />
                  Inclus în tarif
                </p>
                <ul className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
                  {priceIncludes.map((item) => (
                    <li
                      key={item.title}
                      className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
                    >
                      <div>
                        <p className="text-[16px] font-extrabold text-ink">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[14px] font-medium leading-relaxed text-muted">
                          {item.detail}
                        </p>
                      </div>
                      <span className="inline-flex w-fit shrink-0 rounded-full bg-brand-soft px-3 py-1 text-[12px] font-extrabold text-brand">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <div>
                <p className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-brand">
                  <Plus className="size-3.5" strokeWidth={2.6} aria-hidden />
                  Extra / opțional
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {priceExtras.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[15px] font-extrabold text-ink">
                          {item.title}
                        </p>
                        <span className="shrink-0 text-[12px] font-extrabold text-brand">
                          {item.value}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionBackdrop>
  );
}
