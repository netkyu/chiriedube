"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type FancySelectOption = {
  value: string;
  label: string;
};

export default function FancySelect({
  name,
  label,
  options,
  defaultValue,
  required = false,
}: {
  name: string;
  label: string;
  options: FancySelectOption[];
  defaultValue?: string;
  required?: boolean;
}) {
  const listId = useId();
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative block">
      <span
        id={labelId}
        className="text-[8px] font-extrabold uppercase tracking-widest text-muted"
      >
        {label}
      </span>
      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
        className={`mt-2 flex h-11 w-full items-center justify-between gap-3 rounded-xl border bg-[#F8FAFC] px-4 text-left text-[10px] font-medium text-ink outline-none transition ${
          open
            ? "border-brand/40 bg-white ring-2 ring-brand/20"
            : "border-slate-200 hover:border-slate-300 focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/20"
        }`}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted transition ${open ? "rotate-180 text-brand" : ""}`}
          strokeWidth={2.2}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[10px] font-semibold transition ${
                    active
                      ? "bg-brand-soft text-brand"
                      : "text-ink hover:bg-slate-50"
                  }`}
                  onClick={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {active ? (
                    <Check className="size-4" strokeWidth={2.5} aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
