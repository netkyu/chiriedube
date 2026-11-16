"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import {
  Check,
  CheckCircle2,
  Clock3,
  Inbox,
  MessageSquarePlus,
  Pencil,
  Star,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import {
  createAdminReview,
  deleteReview,
  setReviewStatus,
  updateReview,
} from "@/app/actions/reviews";
import {
  REVIEW_STATUS_LABEL,
  type Review,
  type ReviewStatus,
} from "@/lib/reviews";
import PhotoPicker from "@/components/PhotoPicker";
import FancySelect from "@/components/ui/FancySelect";

const fieldClass =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-[14px] font-medium text-ink outline-none transition ring-brand/20 focus:border-brand/40 focus:bg-white focus:ring-2";

const areaClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-[14px] font-medium text-ink outline-none transition ring-brand/20 focus:border-brand/40 focus:bg-white focus:ring-2";

const ratingOptions = [5, 4, 3, 2, 1].map((n) => ({
  value: String(n),
  label: `${n} stele`,
}));

const statusOptions = [
  { value: "approved", label: "Aprobată" },
  { value: "pending", label: "În așteptare" },
];

function StarsRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stele`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "fill-brand text-brand" : "text-slate-200"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function ReviewsManager({ reviews }: { reviews: Review[] }) {
  const [filter, setFilter] = useState<"all" | ReviewStatus>("pending");
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [editing, setEditing] = useState<Review | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const counts = {
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
    all: reviews.length,
  };

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    start(async () => {
      const res = await fn();
      setMessage(res.ok ? "Salvat." : res.error || "Eroare");
    });
  }

  const stats = [
    {
      key: "pending" as const,
      label: "În așteptare",
      hint: "De moderat",
      icon: Clock3,
      tint: "bg-amber-50 text-amber-600",
      active: "border-amber-300 bg-amber-50/80 ring-amber-200/70",
    },
    {
      key: "approved" as const,
      label: "Aprobate",
      hint: "Pe site",
      icon: CheckCircle2,
      tint: "bg-emerald-50 text-emerald-600",
      active: "border-emerald-300 bg-emerald-50/80 ring-emerald-200/70",
    },
    {
      key: "rejected" as const,
      label: "Respinse",
      hint: "Ascunse",
      icon: XCircle,
      tint: "bg-rose-50 text-rose-600",
      active: "border-rose-300 bg-rose-50/80 ring-rose-200/70",
    },
    {
      key: "all" as const,
      label: "Total",
      hint: "Toate",
      icon: Inbox,
      tint: "bg-brand-soft text-brand",
      active: "border-brand/40 bg-brand-soft ring-brand/20",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center sm:text-left">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand sm:text-[12px]">
          Moderare
        </p>
        <h1 className="mt-2 text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.4rem]">
          Recenzii <span className="text-brand">clienți</span>
        </h1>
        <p className="mt-2 max-w-xl text-[14px] font-medium leading-relaxed text-muted sm:text-[15px]">
          Aprobă, respinge, editează sau publică tu o recenzie pe landing.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100/80 bg-white shadow-[0_14px_40px_rgba(248,104,0,0.12)]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map(({ key, label, hint, icon: Icon, tint, active }, index) => {
            const isActive = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`flex items-center gap-3.5 px-4 py-4 text-left transition sm:gap-4 sm:px-5 sm:py-5 ${
                  index % 2 === 0 ? "border-r border-slate-100" : ""
                } ${index < 2 ? "border-b border-slate-100 lg:border-b-0" : ""} ${
                  index < 3 ? "lg:border-r lg:border-slate-100" : ""
                } ${isActive ? active : "hover:bg-slate-50/80"}`}
              >
                <span
                  className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
                >
                  <Icon className="size-5" strokeWidth={1.9} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[1.45rem] font-extrabold leading-none text-ink sm:text-[1.6rem]">
                    {counts[key]}
                  </span>
                  <span className="mt-1.5 block text-[13px] font-extrabold text-ink sm:text-[14px]">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-[12px] font-medium text-muted">
                    {hint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {message ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-[13px] font-semibold text-emerald-900 sm:text-left">
          {message}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(248,104,0,0.1)]">
        <button
          type="button"
          onClick={() => setAddOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
        >
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand text-white">
              <MessageSquarePlus className="size-4.5" strokeWidth={2.2} aria-hidden />
            </span>
            <span className="text-[15px] font-extrabold text-ink">Adaugă recenzie</span>
          </span>
          <span className="text-[13px] font-extrabold text-brand">
            {addOpen ? "Închide" : "Deschide"}
          </span>
        </button>

        {addOpen ? (
          <form
            className="space-y-5 border-t border-slate-100 bg-white px-6 py-6 sm:px-8 sm:py-7"
            action={(fd) =>
              run(async () => {
                const res = await createAdminReview(fd);
                if (res.ok) setAddOpen(false);
                return res;
              })
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <label className="block">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted">
                  Nume
                </span>
                <input
                  name="author_name"
                  required
                  placeholder="ex. Ioana D."
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted">
                  Context
                </span>
                <input
                  name="role"
                  placeholder="ex. Mutare apartament"
                  className={fieldClass}
                />
              </label>
              <FancySelect
                name="rating"
                label="Rating"
                defaultValue="5"
                options={ratingOptions}
              />
              <FancySelect
                name="status"
                label="Status"
                defaultValue="approved"
                options={statusOptions}
              />
            </div>

            <label className="block">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted">
                Text
              </span>
              <textarea
                name="body"
                required
                rows={3}
                placeholder="Ce ar spune clientul despre experiență..."
                className={areaClass}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <PhotoPicker
                variant="avatar"
                name="avatar"
                clearName="clear_avatar"
                label="Poză de profil"
                hint="Lângă nume pe site"
              />
              <PhotoPicker
                name="photo"
                clearName="clear_image"
                label="Poză în recenzie"
                hint="Pe cardul de pe landing"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-11 min-w-40 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[14px] font-extrabold text-white transition hover:bg-brand-dark disabled:opacity-60"
              >
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
                {pending ? "Se salvează..." : "Salvează"}
              </button>
            </div>
          </form>
        ) : null}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:py-16">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Inbox className="size-7" strokeWidth={1.7} aria-hidden />
            </span>
            <p className="mt-5 text-[1.15rem] font-extrabold text-ink">
              Nicio recenzie aici
            </p>
            <p className="mx-auto mt-2 max-w-md text-[14px] font-medium leading-relaxed text-muted">
              Când clienții trimit păreri de pe site, apar la „În așteptare” pentru
              aprobare.
            </p>
          </div>
        ) : (
          filtered.map((review) => (
            <article
              key={review.id}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              {editing?.id === review.id ? (
                <div className="p-5 sm:p-6">
                  <EditForm
                    review={review}
                    pending={pending}
                    onCancel={() => setEditing(null)}
                    onSave={(fd) =>
                      run(async () => {
                        const res = await updateReview(review.id, fd);
                        if (res.ok) setEditing(null);
                        return res;
                      })
                    }
                  />
                </div>
              ) : (
                <>
                  {review.image_url ? (
                    <div className="relative aspect-21/9 bg-slate-100 sm:aspect-[2.6/1]">
                      <Image
                        src={review.image_url}
                        alt={`Poză ${review.author_name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                    </div>
                  ) : null}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          {review.avatar_url ? (
                            <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                              <Image
                                src={review.avatar_url}
                                alt={review.author_name}
                                fill
                                className="object-cover"
                                sizes="44px"
                              />
                            </span>
                          ) : null}
                          <p className="text-[1.05rem] font-extrabold text-ink">
                            {review.author_name}
                          </p>
                          <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-muted">
                            {REVIEW_STATUS_LABEL[review.status]}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-muted">
                          <StarsRow rating={review.rating} />
                          <span>{review.role || "Fără context"}</span>
                          <span>{new Date(review.created_at).toLocaleString("ro-RO")}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {review.status !== "approved" ? (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => run(() => setReviewStatus(review.id, "approved"))}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-[12px] font-extrabold text-white disabled:opacity-60"
                          >
                            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                            Aprobă
                          </button>
                        ) : null}
                        {review.status !== "rejected" ? (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => run(() => setReviewStatus(review.id, "rejected"))}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-[12px] font-extrabold text-white disabled:opacity-60"
                          >
                            <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                            Respinge
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setEditing(review)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2 text-[12px] font-extrabold text-ink"
                        >
                          <Pencil className="size-3.5" strokeWidth={2.3} aria-hidden />
                          Editează
                        </button>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => {
                            if (confirm("Ștergi definitiv această recenzie?")) {
                              run(() => deleteReview(review.id));
                            }
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 px-3.5 py-2 text-[12px] font-extrabold text-rose-700 disabled:opacity-60"
                        >
                          <Trash2 className="size-3.5" strokeWidth={2.3} aria-hidden />
                          Șterge
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 border-t border-slate-100 pt-4 text-[15px] font-medium leading-relaxed text-ink/90">
                      „{review.body}”
                    </p>
                  </div>
                </>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}

function EditForm({
  review,
  pending,
  onCancel,
  onSave,
}: {
  review: Review;
  pending: boolean;
  onCancel: () => void;
  onSave: (fd: FormData) => void;
}) {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(new FormData(e.currentTarget));
      }}
    >
      <section className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 sm:p-5">
        <h3 className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink">
          Autor
        </h3>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <label className="block">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted">
                Nume
              </span>
              <input
                name="author_name"
                defaultValue={review.author_name}
                required
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted">
                Context
              </span>
              <input
                name="role"
                defaultValue={review.role ?? ""}
                className={fieldClass}
              />
            </label>
          </div>
          <PhotoPicker
            variant="avatar"
            name="avatar"
            clearName="clear_avatar"
            label="Poză de profil"
            hint="Lângă nume pe site"
            existingUrl={review.avatar_url}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 sm:p-5">
        <h3 className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink">
          Conținut recenzie
        </h3>
        <div className="grid gap-3">
          <div className="max-w-xs">
            <FancySelect
              name="rating"
              label="Rating"
              defaultValue={String(review.rating)}
              options={ratingOptions}
            />
          </div>
          <label className="block">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted">
              Text
            </span>
            <textarea
              name="body"
              defaultValue={review.body}
              required
              rows={3}
              className={areaClass}
            />
          </label>
          <PhotoPicker
            name="photo"
            clearName="clear_image"
            label="Poză în recenzie"
            hint="Pe cardul de pe landing"
            existingUrl={review.image_url}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center rounded-xl bg-brand px-5 text-[13px] font-extrabold text-white disabled:opacity-60"
        >
          Salvează
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-bold text-ink"
        >
          Anulează
        </button>
      </div>
    </form>
  );
}
