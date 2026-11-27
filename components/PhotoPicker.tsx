"use client";

import { useRef, useState } from "react";
import { ImagePlus, UserRound, X } from "lucide-react";

export default function PhotoPicker({
  name = "photo",
  label = "Poză (opțional)",
  hint = "JPG, PNG sau WebP · max 5 MB",
  existingUrl = null,
  clearName = "clear_image",
  variant = "image",
  compact = false,
}: {
  name?: string;
  label?: string;
  hint?: string;
  existingUrl?: string | null;
  clearName?: string;
  variant?: "image" | "avatar";
  /** Smaller drop zone for dense modals */
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);

  const shown = preview || (!cleared ? existingUrl : null);
  const isAvatar = variant === "avatar";
  const Icon = isAvatar ? UserRound : ImagePlus;

  return (
    <div className="relative space-y-1.5">
      <div>
        <span className="block text-[8px] font-extrabold uppercase tracking-widest text-muted">
          {label}
        </span>
        {!compact ? (
          <p className="mt-1 text-[8px] font-medium text-muted">{hint}</p>
        ) : (
          <p className="mt-0.5 text-[8px] font-medium text-muted">{hint}</p>
        )}
      </div>

      <input type="hidden" name={clearName} value={cleared ? "1" : "0"} />
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setCleared(false);
          setPreview(URL.createObjectURL(file));
        }}
      />

      {shown ? (
        <div
          className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ${
            isAvatar
              ? compact
                ? "aspect-square max-w-[96px]"
                : "aspect-square max-w-[140px]"
              : compact
                ? "aspect-16/10 max-h-28"
                : "aspect-16/9"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown} alt="" className="size-full object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setCleared(true);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-lg bg-ink/80 text-white"
            aria-label="Șterge"
          >
            <X className="size-3.5" strokeWidth={2.4} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 left-2 rounded-lg bg-white/95 px-2.5 py-1.5 text-[8px] font-extrabold text-ink"
          >
            Schimbă
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-[#F8FAFC] text-center transition hover:border-brand/40 hover:bg-brand-soft/30 ${
            compact ? "min-h-[53px] px-3 py-3" : "min-h-[90px] px-4 py-5 gap-2"
          }`}
        >
          <span
            className={`inline-flex items-center justify-center rounded-xl bg-brand-soft text-brand ${
              compact ? "size-8" : "size-10"
            }`}
          >
            <Icon className={compact ? "size-4" : "size-4.5"} strokeWidth={2} aria-hidden />
          </span>
          <span className={`font-extrabold text-ink ${compact ? "text-[8px]" : "text-[9px]"}`}>
            {isAvatar ? "Adaugă avatar" : "Adaugă o poză"}
          </span>
          {!compact ? (
            <span className="text-[8px] font-bold uppercase tracking-wide text-brand">
              Alege fișier
            </span>
          ) : null}
        </button>
      )}
    </div>
  );
}
