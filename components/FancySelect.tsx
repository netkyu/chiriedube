"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type FancySelectOption = {
  value: string;
  label: string;
  hint?: string;
};

type FancySelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FancySelectOption[];
  placeholder?: string;
};

export default function FancySelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Selectează",
}: FancySelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative block">
      <span className="mb-1.5 block text-[12px] font-extrabold uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border bg-[#F8FAFC] px-4 py-3.5 text-left outline-none transition ${
          open
            ? "border-brand bg-white ring-2 ring-brand/20"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <span className="min-w-0">
          <span
            className={`block truncate text-[15px] font-extrabold ${
              selected ? "text-ink" : "text-slate-400"
            }`}
          >
            {selected?.label ?? placeholder}
          </span>
          {selected?.hint ? (
            <span className="mt-0.5 block truncate text-[12px] font-medium text-muted">
              {selected.hint}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-brand transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <div
        className={`absolute left-0 right-0 z-40 origin-top transition duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <ul
          id={listId}
          role="listbox"
          className="mt-2 max-h-64 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_50px_rgba(15,23,42,0.16)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition ${
                    isSelected
                      ? "bg-brand-soft text-brand"
                      : "text-ink hover:bg-surface"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-extrabold">
                      {option.label}
                    </span>
                    {option.hint ? (
                      <span
                        className={`mt-0.5 block truncate text-[12px] font-medium ${
                          isSelected ? "text-brand/80" : "text-muted"
                        }`}
                      >
                        {option.hint}
                      </span>
                    ) : null}
                  </span>
                  {isSelected ? (
                    <Check className="size-4 shrink-0" aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
