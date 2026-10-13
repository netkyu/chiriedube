"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fleet } from "@/lib/data";
import VanCard from "./VanCard";

const GAP = 16;
const LOOP = [...fleet, ...fleet, ...fleet];

function MobileSnapCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const stride = card.offsetWidth + GAP;
      const i = Math.round(el.scrollLeft / stride);
      setActive(Math.max(0, Math.min(fleet.length - 1, i)));
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative w-full sm:hidden">
      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {fleet.map((van) => (
          <div key={van.id} className="w-[84%] shrink-0 snap-center">
            <VanCard van={van} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {fleet.map((van, i) => (
          <span
            key={van.id}
            className={`block h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-brand" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(fleet.length);
  const [cardWidth, setCardWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      setViewportWidth(w);
      const units = w < 1024 ? 2.25 : 4;
      const gaps = w < 1024 ? 2 : 4;
      setCardWidth((w - GAP * gaps) / units);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function go(dir: "next" | "prev") {
    setAnimate(true);
    setIndex((current) => current + (dir === "next" ? 1 : -1));
  }

  useEffect(() => {
    if (index >= fleet.length * 2 || index < fleet.length) {
      const timer = window.setTimeout(() => {
        setAnimate(false);
        setIndex((current) => {
          if (current >= fleet.length * 2) return current - fleet.length;
          if (current < fleet.length) return current + fleet.length;
          return current;
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimate(true));
        });
      }, 550);
      return () => window.clearTimeout(timer);
    }
  }, [index]);

  const stride = cardWidth + GAP;
  const offset =
    cardWidth && viewportWidth
      ? index * stride - (viewportWidth - cardWidth) / 2
      : 0;
  const activeDot = ((index % fleet.length) + fleet.length) % fleet.length;

  return (
    <div className="relative hidden w-full overflow-visible sm:block">
      <div className="relative overflow-visible">
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <div
            className="flex will-change-transform"
            style={{
              gap: GAP,
              transform: cardWidth ? `translate3d(-${offset}px, 0, 0)` : undefined,
              transition: animate
                ? "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
          >
            {LOOP.map((van, i) => (
              <div
                key={`${van.id}-${i}`}
                className="shrink-0"
                style={{ width: cardWidth || undefined }}
              >
                <VanCard van={van} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Dube anterioare"
          onClick={() => go("prev")}
          className="absolute -left-5 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-[0_8px_24px_rgba(15,23,42,0.14)] transition hover:bg-brand hover:text-white lg:-left-7 lg:size-12 xl:-left-9"
        >
          <ChevronLeft className="size-5" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          aria-label="Dube următoare"
          onClick={() => go("next")}
          className="absolute -right-5 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-[0_8px_24px_rgba(15,23,42,0.14)] transition hover:bg-brand hover:text-white lg:-right-7 lg:size-12 xl:-right-9"
        >
          <ChevronRight className="size-5" strokeWidth={2.4} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {fleet.map((van, i) => (
          <button
            key={van.id}
            type="button"
            aria-label={`Mergi la ${van.name}`}
            onClick={() => {
              setAnimate(true);
              setIndex(fleet.length + i);
            }}
            className="flex h-[36px] items-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === activeDot ? "w-7 bg-brand" : "w-2 bg-slate-300 hover:bg-brand/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FleetCarousel() {
  return (
    <>
      <MobileSnapCarousel />
      <DesktopCarousel />
    </>
  );
}
