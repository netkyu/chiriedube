import { ChevronRight, FileText, KeyRound, Search } from "lucide-react";
import { howItWorks } from "@/lib/data";
import Reveal from "./Reveal";

const icons = {
  search: Search,
  form: FileText,
  key: KeyRound,
};

const stepVariants = ["left", "scale", "right"] as const;

export default function HowItWorks() {
  return (
    <Reveal variant="up" duration={850}>
      <div className="rounded-2xl bg-brand-soft px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
          <Reveal variant="left" delay={80} className="shrink-0 lg:w-[220px] xl:w-[260px]">
            <h2 className="text-[1.59rem] font-extrabold tracking-tight text-ink sm:text-[1.86rem]">
              Cum funcționează
            </h2>
            <p className="mt-1.5 text-[15px] font-medium leading-snug text-muted">
              Închirierea unei dube este simplă și rapidă. Urmează doar câțiva
              pași:
            </p>
          </Reveal>

          <div className="grid flex-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-3">
            {howItWorks.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <div key={item.step} className="contents">
                  <Reveal
                    variant={stepVariants[index % stepVariants.length]}
                    delay={140 + index * 120}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                        <Icon className="size-5" strokeWidth={2.2} aria-hidden />
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
                          {item.step}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-extrabold text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] font-medium leading-snug text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                  {index < howItWorks.length - 1 && (
                    <Reveal variant="scale" delay={200 + index * 120}>
                      <div className="hidden items-center justify-center md:flex">
                        <ChevronRight
                          className="size-5 text-brand/45"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </div>
                    </Reveal>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Reveal>
  );
}