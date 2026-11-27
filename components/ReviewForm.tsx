"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle2,
  MessageSquarePlus,
  Star,
  X,
} from "lucide-react";
import { submitPublicReview, type ActionResult } from "@/app/actions/reviews";
import PhotoPicker from "./PhotoPicker";

const initial: ActionResult | null = null;

const fieldClass =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-[10px] font-medium text-ink outline-none transition ring-brand/25 focus:border-brand/35 focus:bg-white focus:ring-2";

const areaClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-3 text-[10px] font-medium text-ink outline-none transition ring-brand/25 focus:border-brand/35 focus:bg-white focus:ring-2";

function ReviewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [state, action, pending] = useActionState(submitPublicReview, initial);
  const [rating, setRating] = useState(5);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (state?.ok) setDone(true);
  }, [state]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-80 flex items-end justify-center sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-ink/55 backdrop-blur-[1.5px]"
        aria-label="Închide"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_28px_80px_rgba(0,31,56,0.32)] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_16px_rgba(248,104,0,0.28)]">
              <MessageSquarePlus className="size-[13px]" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0">
              <h3
                id={titleId}
                className="text-[11px] font-extrabold tracking-tight text-ink"
              >
                Lasă o recenzie
              </h3>
              <p className="text-[9px] font-medium text-muted">
                Apare pe site după ce o aprobăm.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-slate-100 hover:text-ink"
            aria-label="Închide"
          >
            <X className="size-5" strokeWidth={2.2} aria-hidden />
          </button>
        </div>

        {done ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-7" strokeWidth={1.9} aria-hidden />
            </span>
            <p className="mt-4 text-[12px] font-extrabold text-ink">
              Mulțumim! Recenzia a fost trimisă.
            </p>
            <p className="mt-2 text-[10px] font-medium text-muted">
              Va apărea pe site după ce o aprobăm.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-[10px] font-extrabold text-white"
              onClick={onClose}
            >
              Închide
            </button>
          </div>
        ) : (
          <form action={action} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-muted">
                    Nume *
                  </span>
                  <input
                    name="author_name"
                    required
                    minLength={2}
                    maxLength={80}
                    className={fieldClass}
                    placeholder="ex. Ioana D."
                    autoComplete="name"
                  />
                </label>
                <label className="block">
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-muted">
                    Context
                  </span>
                  <input
                    name="role"
                    maxLength={80}
                    className={fieldClass}
                    placeholder="ex. Mutare apartament"
                  />
                </label>
              </div>

              <div>
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-muted">
                  Rating *
                </span>
                <input type="hidden" name="rating" value={rating} />
                <div className="mt-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className="inline-flex size-9 items-center justify-center rounded-lg transition hover:bg-brand-soft active:scale-95"
                      aria-label={`${n} stele`}
                      aria-pressed={n <= rating}
                    >
                      <Star
                        className={`size-6 ${n <= rating ? "fill-brand text-brand" : "text-slate-300"}`}
                        strokeWidth={1.8}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-muted">
                  Mesaj *
                </span>
                <textarea
                  name="body"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={3}
                  className={`${areaClass} min-h-[62px] resize-none`}
                  placeholder="Spune-ne cum a fost experiența..."
                />
              </label>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <PhotoPicker
                  compact
                  variant="avatar"
                  name="avatar"
                  clearName="clear_avatar"
                  label="Avatar"
                  hint="Opțional"
                />
                <PhotoPicker
                  compact
                  name="photo"
                  clearName="clear_image"
                  label="Poză experiență"
                  hint="Opțional · max 5 MB"
                />
              </div>

              <div
                className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
                aria-hidden
              >
                <label>
                  Website
                  <input name="company_website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {state && !state.ok ? (
                <p className="text-[9px] font-semibold text-red-600">{state.error}</p>
              ) : null}
            </div>

            {/* Sticky submit — always visible */}
            <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-3.5 sm:px-6">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 text-[10px] font-extrabold text-white shadow-[0_10px_22px_rgba(248,104,0,0.28)] transition hover:bg-brand-dark disabled:opacity-60"
              >
                {pending ? "Se trimite..." : "Trimite recenzia"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default function ReviewForm({
  className = "",
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setModalKey((k) => k + 1);
          setOpen(true);
        }}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[9px] font-extrabold text-white shadow-[0_10px_22px_rgba(248,104,0,0.28)] transition hover:bg-brand-dark sm:px-5 sm:text-[10px] ${className}`}
      >
        <MessageSquarePlus className="size-4" strokeWidth={2.3} aria-hidden />
        Lasă o recenzie
      </button>

      <ReviewModal
        key={modalKey}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
