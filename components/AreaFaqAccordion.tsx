"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

export default function AreaFaqAccordion({
  cityName,
  faqs,
}: {
  cityName: string;
  faqs: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-slate-100 bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <Reveal variant="up">
          <h2 className="text-[1.45rem] font-extrabold tracking-tight text-ink sm:text-[1.7rem]">
            Întrebări frecvente · {cityName}
          </h2>
        </Reveal>

        <div className="mt-6 flex flex-col gap-2.5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal
                key={item.question}
                variant="up"
                delay={60 + index * 70}
                duration={700}
              >
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition duration-300 ${
                    isOpen
                      ? "border-brand/35 shadow-[0_12px_32px_rgba(248,104,0,0.1)]"
                      : "border-slate-100"
                  }`}
                >
                  <button
                    type="button"
                    className="flex min-h-[48px] w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span
                      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-extrabold transition-colors duration-300 ${
                        isOpen
                          ? "bg-brand text-white"
                          : "bg-brand-soft text-brand"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[14px] font-extrabold leading-snug text-ink sm:text-[15px]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-brand transition-transform duration-300 ease-out ${
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
                      <div
                        className={`border-t border-slate-100 px-4 pb-4 pt-3 transition-opacity duration-300 sm:px-5 sm:pl-[3.75rem] ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <p className="text-[14px] font-medium leading-relaxed text-muted">
                          {item.answer}
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
    </section>
  );
}
