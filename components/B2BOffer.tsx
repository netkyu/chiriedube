"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  Send,
  Truck,
} from "lucide-react";
import CustomSelect from "./CustomSelect";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const perks = [
  {
    icon: FileSpreadsheet,
    title: "Contract și factură",
    text: "Ca la orice furnizor. Pe zi, pe lună sau pe proiect.",
  },
  {
    icon: Truck,
    title: "Cu sau fără șofer",
    text: "Spui ce ai de transportat și îți spunem ce se potrivește.",
  },
  {
    icon: Clock3,
    title: "Răspundem repede",
    text: "Îți trimitem o ofertă pe WhatsApp sau email.",
  },
];

export default function B2BOffer() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/bg-urban.jpg"
          alt=""
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(248,104,0,0.45),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_80%,rgba(248,104,0,0.25),transparent_45%)]" />
      </div>

      {/* Decorative big type */}
      <p
        aria-hidden
        className="pointer-events-none absolute -right-2 top-6 hidden select-none text-[5.5rem] font-extrabold leading-none tracking-tighter text-white/[0.04] sm:-right-4 sm:top-10 sm:block sm:text-[10rem] lg:right-8 lg:text-[14rem]"
      >
        B2B
      </p>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left editorial content */}
          <div className="flex flex-col justify-center sm:py-2 lg:min-h-full lg:py-0">
            <Reveal variant="clip">
              <SectionLabel icon={Building2} tone="light">
                Persoane juridice
              </SectionLabel>
            </Reveal>

            <Reveal variant="left" delay={100}>
              <h2 className="mt-3 max-w-xl text-[1.8rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-[3.45rem] lg:text-[3.98rem]">
                Pentru{" "}
                <span className="text-brand">firme</span>
              </h2>
            </Reveal>

            <Reveal variant="blur" delay={200}>
              <p className="mt-2.5 max-w-lg text-[14px] font-medium leading-relaxed text-slate-300 sm:mt-5 sm:text-[1.2rem]">
                Dacă ai nevoie constant de auto sau remorci, îți facem o ofertă
                pe volum. Factură și contract, ca la orice furnizor.
              </p>
            </Reveal>

            <div className="mt-5 grid gap-2 sm:mt-8 sm:gap-3 md:grid-cols-3">
              {perks.map((perk, index) => {
                const Icon = perk.icon;
                const variants = ["up", "scale", "tilt"] as const;
                return (
                  <Reveal
                    key={perk.title}
                    variant={variants[index % variants.length]}
                    delay={220 + index * 100}
                  >
                    {/* Mobile: compact row. md+: stacked card. */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 sm:rounded-2xl sm:p-4 md:block md:backdrop-blur-sm">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white sm:size-10">
                        <Icon className="size-4 sm:size-5" strokeWidth={2.2} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-extrabold text-white sm:text-[0.9375rem] md:mt-3">
                          {perk.title}
                        </p>
                        <p className="mt-0.5 text-[12px] font-medium leading-snug text-slate-400 sm:text-[0.8125rem] md:mt-1">
                          {perk.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Form card */}
          <Reveal variant="right" delay={180} duration={950} className="relative">
            <div className="absolute -inset-1 hidden rounded-[28px] bg-gradient-to-br from-brand/50 via-transparent to-brand/20 blur-sm sm:block" />
            <div className="relative rounded-[20px] border border-white/20 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.3)] sm:rounded-[24px] sm:shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between rounded-t-[20px] border-b border-slate-100 bg-surface px-4 py-3 sm:rounded-t-[24px] sm:px-6 sm:py-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand sm:text-[0.8125rem]">
                    Formular ofertă
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium text-muted sm:text-[0.9375rem]">
                    Formular scurt
                  </p>
                </div>
                <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-extrabold text-brand sm:px-3 sm:py-1 sm:text-[0.8125rem]">
                  Demo
                </span>
              </div>

              <div className="p-4 sm:p-8">
                {submitted ? (
                  <div className="flex min-h-[360px] flex-col items-start justify-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                      <CheckCircle2 className="size-7" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.6rem] font-extrabold text-ink">
                      Cererea a fost înregistrată
                    </h3>
                    <p className="mt-2 text-[0.9375rem] font-medium leading-relaxed text-muted">
                      Mulțumim! Te contactăm în curând cu oferta.
                    </p>
                    <button
                      type="button"
                      className="mt-6 text-[0.9375rem] font-extrabold text-brand"
                      onClick={() => setSubmitted(false)}
                    >
                      Trimite o altă cerere
                    </button>
                  </div>
                ) : (
                  <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <label className="block text-[14px] sm:text-[0.9375rem]">
                        <span className="mb-1.5 block font-extrabold text-ink">
                          Nume firmă
                        </span>
                        <input
                          required
                          name="company"
                          className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 font-medium sm:py-3 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                          placeholder="Ex: SC Transport SRL"
                        />
                      </label>
                      <label className="block text-[14px] sm:text-[0.9375rem]">
                        <span className="mb-1.5 block font-extrabold text-ink">
                          CUI
                        </span>
                        <input
                          required
                          name="cui"
                          className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 font-medium sm:py-3 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                          placeholder="RO12345678"
                        />
                      </label>
                    </div>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <CustomSelect
                        required
                        name="transportType"
                        label="Tip transport"
                        placeholder="Selectează"
                        options={[
                          "Mutări / mobilier",
                          "Transport marfă",
                          "Proiecte profesionale",
                          "Flotă recurentă",
                        ]}
                      />
                      <label className="block text-[14px] sm:text-[0.9375rem]">
                        <span className="mb-1.5 block font-extrabold text-ink">
                          Perioadă
                        </span>
                        <input
                          required
                          name="period"
                          className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 font-medium sm:py-3 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                          placeholder="Ex: 5-10 zile"
                        />
                      </label>
                    </div>
                    <label className="block text-[14px] sm:text-[0.9375rem]">
                      <span className="mb-1.5 block font-extrabold text-ink">
                        Email de contact
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        className="w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 font-medium sm:py-3 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                        placeholder="office@firma.ro"
                      />
                    </label>
                    <label className="block text-[14px] sm:text-[0.9375rem]">
                      <span className="mb-1.5 block font-extrabold text-ink">
                        Mesaj
                      </span>
                      <textarea
                        required
                        name="message"
                        rows={3}
                        className="w-full resize-y rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 font-medium sm:py-3 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                        placeholder="Volum, destinații, frecvență..."
                      />
                    </label>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-[15px] font-extrabold text-white shadow-[0_14px_32px_rgba(248,104,0,0.35)] transition hover:-translate-y-0.5 sm:py-3.5 sm:text-[16px] hover:bg-brand-dark"
                    >
                      Trimite cererea
                      <Send className="size-4" aria-hidden />
                    </button>
                    <p className="text-center text-[11px] font-medium leading-snug text-muted">
                      Prin trimitere accepti{" "}
                      <a
                        href="/termeni-si-conditii"
                        className="font-extrabold text-brand underline-offset-2 hover:underline"
                      >
                        Termenii
                      </a>{" "}
                      și{" "}
                      <a
                        href="/politica-de-confidentialitate"
                        className="font-extrabold text-brand underline-offset-2 hover:underline"
                      >
                        Confidențialitatea
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
