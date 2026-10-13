"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, CircleHelp } from "lucide-react";
import { faqs } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionBackdrop
      id="faq"
      variant="dark"
      className="py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <SectionLabel icon={CircleHelp} tone="light">
              Întrebări și răspunsuri
            </SectionLabel>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="mt-2.5 text-[1.7rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-3 sm:text-[2.86rem]">
              Întrebări{" "}
              <span className="text-brand">frecvente</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-slate-300 sm:mt-3 sm:text-[16px]">
              Kilometri, garanție, acte și ce e inclus în preț.
            </p>
          </Reveal>
        </div>

        <div className="mt-5 grid items-stretch gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          <Reveal
            variant="left"
            delay={120}
            duration={950}
            className="hidden h-full min-h-[280px] lg:block"
          >
            <aside className="relative h-full min-h-[280px] overflow-hidden rounded-[24px]">
              <Image
                src="/images/faq-road-v4.jpg"
                alt="Dubă pe drum"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="text-[1rem] font-extrabold text-white sm:text-[1.2rem]">
                  Înainte să rezervi
                </p>
                <p className="mt-0.5 max-w-xs text-[12.5px] font-medium text-white/80 sm:mt-1 sm:text-[0.9375rem]">
                  Citește aici sau scrie-ne pe WhatsApp dacă ceva nu e clar.
                </p>
              </div>
            </aside>
          </Reveal>

          <div className="flex flex-col gap-2 sm:gap-2.5">
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
                    className={`overflow-hidden rounded-xl border bg-white transition sm:rounded-2xl ${
                      isOpen
                        ? "border-brand/35 shadow-[0_12px_32px_rgba(248,104,0,0.1)]"
                        : "border-slate-200/80"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex min-h-[48px] w-full items-center gap-2.5 px-3 py-2.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span
                        className={`inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-extrabold sm:size-8 sm:text-[13px] ${
                          isOpen
                            ? "bg-brand text-white"
                            : "bg-brand-soft text-brand"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[13.5px] font-extrabold leading-snug text-ink sm:text-[16px]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`size-[18px] shrink-0 text-brand transition-transform duration-300 sm:size-5 ${
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
                        <div className="border-t border-slate-100 px-3 pb-3.5 pt-2.5 sm:px-5 sm:pb-4 sm:pl-[3.75rem] sm:pt-3">
                          <p className="text-[13px] font-medium leading-relaxed text-muted sm:text-[15px]">
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
