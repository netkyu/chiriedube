import { Clock, Coins, Headset, Rocket } from "lucide-react";
import { features } from "@/lib/data";
import Reveal from "./Reveal";

const icons = {
  rocket: Rocket,
  coins: Coins,
  headset: Headset,
  clock: Clock,
};

const variants = ["up", "scale", "up", "right"] as const;

export default function FeaturesBar() {
  return (
    <Reveal variant="up" delay={500} duration={800} className="overflow-visible">
      <div className="rounded-2xl border border-slate-100/80 bg-white shadow-[0_18px_50px_rgba(248,104,0,0.22)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <Reveal
                key={feature.title}
                variant={variants[index % variants.length]}
                delay={620 + index * 90}
                duration={750}
              >
                <div
                  className={`flex items-center gap-3.5 px-4 py-3.5 sm:px-5 ${
                    index < features.length - 1
                      ? "lg:border-r lg:border-slate-100"
                      : ""
                  } ${
                    index % 2 === 0
                      ? "sm:border-r sm:border-slate-100 lg:border-r"
                      : ""
                  } ${
                    index < 2
                      ? "border-b border-slate-100 sm:border-b lg:border-b-0"
                      : ""
                  } ${index === 2 ? "border-b border-slate-100 sm:border-b-0" : ""}`}
                >
                  <Icon
                    className="size-8 shrink-0 text-brand sm:size-10"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold leading-tight text-ink sm:text-[16px]">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 whitespace-pre-line text-[13px] leading-snug text-muted sm:mt-1 sm:text-[14px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
