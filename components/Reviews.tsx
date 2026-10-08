import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { reviews } from "@/lib/data";
import SectionBackdrop from "./SectionBackdrop";
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
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="clip">
            <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-brand">
              Recenzii
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[2.92rem]">
              Ce spun <span className="text-brand">clienții noștri</span>
            </h2>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <p className="mt-3 text-[16px] font-medium leading-relaxed text-muted">
              Experiențe reale de la oameni care au închiriat dube pentru mutări,
              transport marfă și proiecte de business.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={140} duration={800} className="mt-8 overflow-visible">
          <blockquote className="relative overflow-hidden rounded-[22px] bg-brand">
            <div className="relative h-40 w-full sm:absolute sm:inset-y-0 sm:right-0 sm:h-auto sm:w-[62%]">
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

            <div className="relative z-10 flex w-full max-w-xl flex-col justify-center px-5 py-6 sm:min-h-[260px] sm:px-7 sm:py-7 lg:max-w-[55%] lg:px-8">
              <div className="flex items-center gap-3">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-xl sm:size-12">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover object-center scale-110"
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
                  <cite className="mt-1 block text-[0.9375rem] font-extrabold not-italic text-white">
                    {featured.name}
                  </cite>
                  <p className="text-[13px] font-medium text-orange-100">
                    {featured.role}
                  </p>
                </div>
              </div>

              <Quote
                className="mt-3 size-5 text-white/70"
                strokeWidth={2.2}
                aria-hidden
              />
              <p className="mt-2 text-[15px] font-semibold leading-snug text-white sm:text-[16px]">
                „{featured.text}”
              </p>
            </div>
          </blockquote>
        </Reveal>

        <div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-3">
          {rest.map((review, index) => (
            <Reveal
              key={review.name}
              variant={cardVariants[index % cardVariants.length]}
              delay={120 + index * 110}
              className="overflow-visible h-full"
            >
              <blockquote className="flex h-full flex-col rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/15">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </span>
                  <div className="min-w-0">
                    <cite className="block truncate text-[0.9375rem] font-extrabold not-italic text-ink">
                      {review.name}
                    </cite>
                    <p className="truncate text-[13px] font-semibold text-muted">
                      {review.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Stars rating={review.rating} size="size-3.5" />
                </div>

                <p className="mt-3 flex-1 text-[15px] font-semibold leading-relaxed text-ink/90 sm:text-[16px]">
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
