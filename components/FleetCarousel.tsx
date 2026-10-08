"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fleet } from "@/lib/data";
import VanCard from "./VanCard";

const GAP = 16;
const LOOP = [...fleet, ...fleet, ...fleet];

export default function FleetCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(fleet.length);
  const [cardWidth, setCardWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [animate, setAnimate] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      setViewportWidth(w);
      // Mobile: one nearly-full card. Tablet/desktop: peek neighbors.
      const units = w < 640 ? 1 : w < 1024 ? 2.25 : 4;
      const gaps = w < 640 ? 0 : w < 1024 ? 2 : 4;
      const width = (w - GAP * gaps) / units;
      setCardWidth(width);
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
  // Center active card in the viewport
  const offset =
    cardWidth && viewportWidth
      ? index * stride - (viewportWidth - cardWidth) / 2
      : 0;
  const activeDot = ((index % fleet.length) + fleet.length) % fleet.length;

  return (
    <div className="relative w-full">
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden sm:[mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          const end = e.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 40) return;
          go(delta < 0 ? "next" : "prev");
        }}
      >
        <div
          className="flex will-change-transform"
          style={{
            gap: GAP,
            transform: cardWidth
              ? `translate3d(-${offset}px, 0, 0)`
              : undefined,
            transition: animate
              ? "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {LOOP.map((van, i) => (
            <div
              key={`${van.id}-${i}`}
              className="shrink-0"
              style={{
                width: cardWidth || undefined,
                minWidth: cardWidth || "85%",
              }}
            >
              <VanCard van={van} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Dube anterioare"
          onClick={() => go("prev")}
          className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-[0_6px_18px_rgba(248,104,0,0.14)] transition hover:bg-brand hover:text-white sm:size-11"
        >
          <ChevronLeft className="size-5" strokeWidth={2.4} />
        </button>

        <div className="flex items-center justify-center gap-2">
          {fleet.map((van, i) => (
            <button
              key={van.id}
              type="button"
              aria-label={`Mergi la ${van.name}`}
              onClick={() => {
                setAnimate(true);
                setIndex(fleet.length + i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "w-7 bg-brand"
                  : "w-2 bg-slate-300 hover:bg-brand/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Dube următoare"
          onClick={() => go("next")}
          className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-[0_6px_18px_rgba(248,104,0,0.14)] transition hover:bg-brand hover:text-white sm:size-11"
        >
          <ChevronRight className="size-5" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
