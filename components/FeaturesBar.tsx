import { Clock, Coins, Headset, Rocket } from "lucide-react";
import { features } from "@/lib/data";

const icons = {
  rocket: Rocket,
  coins: Coins,
  headset: Headset,
  clock: Clock,
};

/** No Reveal here — sits in the first viewport and must not hydrate-animate. */
export default function FeaturesBar() {
  return (
    <div className="overflow-visible">
      <div className="rounded-2xl border border-slate-100/80 bg-white shadow-[0_12px_32px_rgba(248,104,0,0.16)] sm:shadow-[0_18px_50px_rgba(248,104,0,0.22)]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.title}
                className={`flex h-full flex-col gap-1.5 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3.5 sm:px-5 sm:py-3.5 ${
                  index < features.length - 1
                    ? "lg:border-r lg:border-slate-100"
                    : ""
                } ${
                  index % 2 === 0
                    ? "border-r border-slate-100 lg:border-r"
                    : ""
                } ${
                  index < 2
                    ? "border-b border-slate-100 lg:border-b-0"
                    : ""
                }`}
              >
                <Icon
                  className="size-5 shrink-0 text-brand sm:size-10"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold leading-tight text-ink sm:text-[11px]">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 whitespace-normal text-[8px] leading-snug text-muted sm:mt-1 sm:whitespace-pre-line sm:text-[10px]">
                    {feature.description.replace(/\n/g, " ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
