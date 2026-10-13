import Image from "next/image";
import { MessageSquareQuote, Quote, Star } from "lucide-react";
import { reviews } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

function Stars({ rating, size = "size-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5 text-brand" aria-label={`${rating} stele`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className={`${size} fill-brand`} aria-hidden />
      ))}
    </div>
  );
}

const cardVariants = ["up", "scale", "tilt"] as const;

export default function Reviews() {
  const [featured, ...rest] = reviews;

  return (
    <SectionBackdrop
      id="recenzii"
      variant="white"
      className="py-16 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <SectionLabel icon={MessageSquareQuote}>Recenzii</SectionLabel>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="mt-2.5 text-[1.7rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-3 sm:text-[2.92rem]">
              Ce zic <span className="text-brand">cei care au închiriat</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-muted sm:mt-3 sm:text-[16px]">
              Mutări, transport marfă și colaborări cu firme din zonă.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={140} duration={800} className="mt-5 overflow-visible sm:mt-8">
          <blockquote className="relative overflow-hidden rounded-[20px] bg-brand sm:rounded-[22px]">
            <div className="relative h-36 w-full sm:absolute sm:inset-y-0 sm:right-0 sm:h-auto sm:w-[62%]">
              <Image
                src="/images/review-move-v3.jpg"
                alt="Mutare apartament cu dubă"
                fill
                className="object-cover object-[center_18%]"
                sizes="(max-width: 640px) 100vw, 62vw"
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 hidden sm:block"
              style={{
                background:
                  "linear-gradient(90deg, #f86800 0%, #f86800 42%, rgba(248,104,0,0.88) 56%, rgba(248,104,0,0.4) 70%, transparent 86%)",
              }}
            />

            <div className="relative z-10 flex w-full max-w-xl flex-col justify-center px-4 py-4 sm:min-h-[260px] sm:px-7 sm:py-7 lg:max-w-[55%] lg:px-8">
              <div className="flex items-center gap-3">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-xl sm:size-12">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                </span>
                <div>
                  <div className="flex gap-0.5" aria-label="5 stele">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-white stroke-white"
                        strokeWidth={0}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <cite className="mt-0.5 block text-[14px] font-extrabold not-italic text-white sm:mt-1 sm:text-[0.9375rem]">
                    {featured.name}
                  </cite>
                  <p className="text-[12px] font-medium text-orange-100 sm:text-[13px]">
                    {featured.role}
                  </p>
                </div>
              </div>

              <Quote
                className="mt-2.5 size-4 text-white/70 sm:mt-3 sm:size-5"
                strokeWidth={2.2}
                aria-hidden
              />
              <p className="mt-1.5 text-[14px] font-semibold leading-snug text-white sm:mt-2 sm:text-[16px]">
                „{featured.text}”
              </p>
            </div>
          </blockquote>
        </Reveal>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:auto-rows-fr sm:gap-4 md:grid-cols-3">
          {rest.map((review, index) => (
            <Reveal
              key={review.name}
              variant={cardVariants[index % cardVariants.length]}
              delay={120 + index * 110}
              className="overflow-visible h-full"
            >
              <blockquote className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:rounded-[22px] sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/15 sm:size-12">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <cite className="block truncate text-[14px] font-extrabold not-italic text-ink sm:text-[0.9375rem]">
                      {review.name}
                    </cite>
                    <p className="truncate text-[12px] font-semibold text-muted sm:text-[13px]">
                      {review.role}
                    </p>
                  </div>
                  {/* Mobile: stars inline with the name row */}
                  <div className="sm:hidden">
                    <Stars rating={review.rating} size="size-3" />
                  </div>
                </div>

                <div className="mt-4 hidden sm:block">
                  <Stars rating={review.rating} size="size-3.5" />
                </div>

                <p className="mt-2.5 flex-1 text-[13.5px] font-semibold leading-relaxed text-ink/90 sm:mt-3 sm:text-[16px]">
                  „{review.text}”
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionBackdrop>
  );
}
