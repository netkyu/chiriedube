"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import Reveal from "./Reveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionBackdrop
      id="faq"
      variant="dark"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-orange-100">
              Întrebări și răspunsuri
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.86rem]">
              Ai întrebări? <span className="text-brand">Avem răspunsuri</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <p className="mt-3 text-[16px] font-medium leading-relaxed text-slate-300">
              Informații clare despre șofer, kilometri, documente și asistență
              rutieră.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          <Reveal
            variant="left"
            delay={120}
            duration={950}
            className="h-full min-h-[280px]"
          >
            <aside className="relative h-full min-h-[280px] overflow-hidden rounded-[24px]">
              <Image
                src="/images/faq-road-v4.jpg"
                alt="Dubă pe drum"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[1.2rem] font-extrabold text-white">
                  Flotă pregătită de drum
                </p>
                <p className="mt-1 max-w-xs text-[0.9375rem] font-medium text-white/80">
                  Răspunsuri clare înainte să pleci — ca să știi exact la ce să te
                  aștepți.
                </p>
              </div>
            </aside>
          </Reveal>

          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const variants = ["right", "up", "soft", "tilt", "scale", "blur"] as const;
              return (
                <Reveal
                  key={faq.question}
                  variant={variants[index % variants.length]}
                  delay={80 + index * 70}
                  duration={700}
                >
                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition ${
                      isOpen
                        ? "border-brand/35 shadow-[0_12px_32px_rgba(248,104,0,0.1)]"
                        : "border-slate-200/80"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span
                        className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-extrabold ${
                          isOpen
                            ? "bg-brand text-white"
                            : "bg-brand-soft text-brand"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[15px] font-extrabold text-ink sm:text-[16px]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-brand transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.4}
                        aria-hidden
                      />
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-5 sm:pl-[3.75rem]">
                          <p className="text-[14px] font-medium leading-relaxed text-muted sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </SectionBackdrop>
  );
}
