"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Review } from "@/lib/reviews";

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "size-[12px]" : "size-3.5";
  return (
    <div className="flex shrink-0 gap-0.5" role="img" aria-label={`${rating} din 5 stele`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < rating ? "fill-brand text-brand" : "fill-slate-100 text-slate-200"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function Avatar({ name, url }: { name: string; url?: string | null }) {
  if (url) {
    return (
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white">
        <Image
          src={url}
          alt={`Avatar ${name}`}
          fill
          className="object-cover"
          sizes="40px"
        />
      </span>
    );
  }
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10px] font-extrabold tracking-wide text-brand">
      {initials(name)}
    </span>
  );
}

function AuthorRow({ review }: { review: Review }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar name={review.author_name} url={review.avatar_url} />
      <div className="min-w-0">
        <p className="truncate text-[11px] font-extrabold leading-tight text-ink">
          {review.author_name}
        </p>
        {review.role ? (
          <p className="mt-0.5 truncate text-[10px] font-medium leading-tight text-muted">
            {review.role}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Wider card: photo on top (full width), text on white below — readable + photo visible */
function PhotoReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_20px_44px_-10px_rgba(0,31,56,0.2)]">
      <div className="relative h-[104px] w-full shrink-0 overflow-hidden bg-ink sm:h-[111px]">
        <Image
          src={review.image_url!}
          alt={`Fotografie trimisă de ${review.author_name}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 420px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/30 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-2 py-1 shadow-sm">
          <Stars rating={review.rating} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 py-4 sm:px-5 sm:py-4.5">
        <p className="line-clamp-4 min-h-0 flex-1 text-[12px] font-medium leading-relaxed text-ink sm:text-[12px]">
          „{review.body}”
        </p>
        <div className="mt-3 shrink-0 border-t border-slate-100 pt-3">
          <AuthorRow review={review} />
        </div>
      </div>
    </article>
  );
}

/** Narrower quote card */
function QuoteReviewCard({ review }: { review: Review }) {
  return (
    <article className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_20px_44px_-10px_rgba(0,31,56,0.2)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-brand-soft/80"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand" />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_16px_rgba(248,104,0,0.3)]">
            <Quote className="size-4" strokeWidth={2.3} aria-hidden />
          </span>
          <Stars rating={review.rating} size="md" />
        </div>

        <p className="mt-4 line-clamp-6 flex-1 text-[12px] font-semibold leading-relaxed text-ink sm:text-[13px]">
          „{review.body}”
        </p>

        <div className="mt-4 shrink-0 border-t border-slate-100 pt-3.5">
          <AuthorRow review={review} />
        </div>
      </div>
    </article>
  );
}

/**
 * Fan poses — fixed px offsets so layout never depends on vw.
 * All wrappers share the SAME size (photo max). Quote cards sit
 * centered and narrower inside that shell.
 */
const FAN = [
  { x: 0, y: 0, r: -1.5, s: 1, z: 30 },
  { x: 118, y: 18, r: 7, s: 0.96, z: 20 },
  { x: -118, y: 26, r: -8, s: 0.93, z: 10 },
] as const;

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = reviews.length;

  if (count === 0) return null;

  const go = (dir: -1 | 1) => setIndex((cur) => (cur + dir + count) % count);

  const depth = Math.min(FAN.length, count);
  const stack = Array.from({ length: depth }, (_, offset) => ({
    review: reviews[(index + offset) % count],
    offset,
  })).reverse();

  const front = reviews[index];

  return (
    <div className="mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0">
      <div
        className="relative h-[280px] w-full sm:h-[301px]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[48%] h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/70 blur-2xl"
        />

        {stack.map(({ review, offset }) => {
          const pose = FAN[offset] ?? FAN[FAN.length - 1];
          const isFront = offset === 0;
          const hasPhoto = Boolean(review.image_url);

          return (
            <div
              key={review.id}
              aria-hidden={!isFront}
              className="absolute left-1/2 top-[46%] flex h-[238px] w-[min(100%,400px)] items-center justify-center will-change-transform sm:h-[252px] sm:w-[400px]"
              style={{
                transform: `translate(-50%, -50%) translate(${pose.x}px, ${pose.y}px) rotate(${pose.r}deg) scale(${pose.s})`,
                zIndex: pose.z,
                pointerEvents: isFront ? "auto" : "none",
                transition: "transform 560ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Same outer shell; quote cards are narrower inside */}
              <div
                className={`h-full ${
                  hasPhoto ? "w-full" : "w-[78%] max-w-[312px]"
                }`}
              >
                {hasPhoto ? (
                  <PhotoReviewCard review={review} />
                ) : (
                  <QuoteReviewCard review={review} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Recenzia anterioară"
            className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white shadow-[0_10px_22px_rgba(0,31,56,0.28)] transition hover:bg-ink/85 active:scale-95 sm:size-12"
          >
            <ChevronLeft className="size-5 sm:size-6" strokeWidth={2.4} aria-hidden />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Alege recenzia">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Recenzia ${i + 1} din ${count}`}
                onClick={() => setIndex(i)}
                className="flex h-7 items-center px-0.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === index ? "h-2 w-5 bg-brand" : "h-2 w-2 bg-slate-300 hover:bg-brand/55"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Recenzia următoare"
            className="inline-flex size-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_22px_rgba(248,104,0,0.35)] transition hover:bg-brand-dark active:scale-95 sm:size-12"
          >
            <ChevronRight className="size-5 sm:size-6" strokeWidth={2.4} aria-hidden />
          </button>
        </div>

        <p className="text-[10px] font-bold tracking-wide text-muted" aria-live="polite">
          {index + 1} / {count}
          <span className="sr-only">: {front.author_name}</span>
        </p>
      </div>
    </div>
  );
}
