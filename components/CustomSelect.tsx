"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type CustomSelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
  required?: boolean;
};

export default function CustomSelect({
  name,
  label,
  placeholder = "Selectează",
  options,
  required = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

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
    <div ref={rootRef} className="relative block text-[0.9375rem]">
      <span className="mb-1.5 block font-extrabold text-ink">{label}</span>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border bg-surface px-3.5 py-3 text-left font-medium outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 ${
          open
            ? "border-brand bg-white ring-2 ring-brand/20"
            : "border-slate-200"
        }`}
      >
        <span
          className={`min-w-0 truncate ${value ? "text-ink" : "text-slate-400"}`}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-brand transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <div
        className={`absolute left-0 right-0 z-30 origin-top transition duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <ul
          id={listId}
          role="listbox"
          className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[0.9375rem] font-semibold transition ${
                    selected
                      ? "bg-brand-soft text-brand"
                      : "text-ink hover:bg-surface"
                  }`}
                >
                  {option}
                  {selected ? (
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
