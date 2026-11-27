import { MessageSquarePlus, MessageSquareQuote, Star } from "lucide-react";
import { createPublicClient } from "@/lib/supabase/public";
import type { Review } from "@/lib/reviews";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import ReviewForm from "./ReviewForm";
import ReviewsCarousel from "./ReviewsCarousel";

function StarsRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand" role="img" aria-label={`${rating} din 5 stele`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-brand text-brand" : "fill-slate-100 text-slate-200"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

async function getApprovedReviews(): Promise<Review[]> {
  try {
    // Public client (no cookies) so the homepage can be statically generated
    // and is not blocked on auth/cookie dynamic rendering.
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, author_name, role, rating, body, image_url, avatar_url, status, source, created_at, updated_at, reviewed_at",
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(24);

    if (error || !data) return [];
    return data as Review[];
  } catch {
    return [];
  }
}

export default async function Reviews() {
  const reviews = await getApprovedReviews();
  const avg =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <section id="recenzii" className="relative overflow-x-clip bg-white py-16 sm:py-20 lg:py-24">
      {/* Soft brand wash at the top only. It lives behind everything and
          the section never clips vertically, so the deck cannot be eaten. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-brand-soft/90 via-brand-soft/35 to-transparent sm:h-64"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {reviews.length === 0 ? (
          <div className="mx-auto max-w-2xl text-center">
            <Reveal variant="clip">
              <SectionLabel icon={MessageSquareQuote} className="justify-center">
                Recenzii
              </SectionLabel>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <h2 className="mt-3 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.85rem]">
                Încrederea <span className="text-brand">clienților</span>
              </h2>
            </Reveal>
            <Reveal variant="up" delay={140}>
              <p className="mx-auto mt-3 max-w-md text-[12px] font-medium leading-relaxed text-muted sm:text-[13px]">
                Poveștile celor care au închiriat de la noi, de la prima discuție până la predarea mașinii.
              </p>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <div className="mt-9 rounded-[1.4rem] border border-orange-100 bg-white px-6 py-12 text-center shadow-[0_20px_44px_-18px_rgba(0,31,56,0.16)]">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_rgba(248,104,0,0.3)]">
                  <MessageSquarePlus className="size-7" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="mt-5 text-[14px] font-extrabold text-ink">Fii primul care povestește</p>
                <p className="mx-auto mt-2 max-w-md text-[12px] font-medium leading-relaxed text-muted">
                  Ai închiriat de la noi? Spune cum a fost, în câteva rânduri.
                </p>
                <div className="mt-6 flex justify-center">
                  <ReviewForm />
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-12">
            {/* Left: title, rating, CTA */}
            <div className="max-w-xl pt-1 lg:max-w-none lg:pt-0">
              <Reveal variant="clip">
                <SectionLabel icon={MessageSquareQuote}>Recenzii</SectionLabel>
              </Reveal>

              <Reveal variant="up" delay={80}>
                <h2 className="mt-3 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.65rem] lg:text-[2.9rem]">
                  Încrederea <span className="text-brand">clienților</span>
                </h2>
              </Reveal>

              <Reveal variant="blur" delay={150}>
                <p className="mt-3 max-w-md text-[12px] font-medium leading-relaxed text-muted sm:text-[14px]">
                  Poveștile celor care au închiriat de la noi, de la prima discuție până la predarea mașinii.
                </p>
              </Reveal>

              <Reveal variant="up" delay={210}>
                <div className="mt-6 inline-flex items-center gap-3.5 rounded-2xl border border-orange-100 bg-white py-3 pl-4 pr-5 shadow-[0_14px_30px_-14px_rgba(0,31,56,0.18)]">
                  <span className="text-[22px] font-extrabold leading-none tracking-tight text-ink">
                    {avg.toFixed(1).replace(".", ",")}
                  </span>
                  <span className="h-9 w-px bg-slate-100" aria-hidden />
                  <span>
                    <StarsRow rating={Math.round(avg)} />
                    <span className="mt-1 block text-[11px] font-semibold leading-none text-muted">
                      din {reviews.length} {reviews.length === 1 ? "recenzie" : "recenzii"}
                    </span>
                  </span>
                </div>
              </Reveal>

              <Reveal variant="up" delay={270}>
                <div className="mt-7">
                  <ReviewForm />
                </div>
              </Reveal>
            </div>

            {/* Right: spread deck. overflow-visible so rotation is never cut. */}
            <div className="min-w-0">
              <Reveal variant="up" delay={120} className="overflow-visible">
                <ReviewsCarousel reviews={reviews} />
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
