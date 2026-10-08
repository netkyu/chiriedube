"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

function toIso(date: Date) {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
  return copy.toISOString().slice(0, 10);
}

function parseIso(iso: string) {
  return new Date(`${iso}T12:00:00`);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDisplay(iso: string) {
  if (!iso) return "";
  return parseIso(iso).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildCells(month: Date) {
  const first = startOfMonth(month);
  const startOffset = (first.getDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();

  const cells: Array<{ date: Date; inMonth: boolean }> = [];

  for (let i = 0; i < startOffset; i += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), -startOffset + i + 1);
    cells.push({ date, inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      date: new Date(month.getFullYear(), month.getMonth(), day),
      inMonth: true,
    });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
    cells.push({ date, inMonth: false });
  }

  return cells;
}

type DatePickerProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  placement?: "top" | "bottom";
};

export default function DatePicker({
  label,
  value,
  onChange,
  min,
  max,
  placement = "bottom",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() =>
    value ? startOfMonth(parseIso(value)) : startOfMonth(new Date()),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    if (value) setViewMonth(startOfMonth(parseIso(value)));
  }, [value]);

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

  const cells = useMemo(() => buildCells(viewMonth), [viewMonth]);
  const minDate = min ? parseIso(min) : undefined;
  const maxDate = max ? parseIso(max) : undefined;
  const selected = value ? parseIso(value) : null;

  const monthLabel = viewMonth.toLocaleDateString("ro-RO", {
    month: "long",
    year: "numeric",
  });

  function isDisabled(date: Date) {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }

  return (
    <div ref={rootRef} className="relative block">
      <span className="mb-1.5 block text-[12px] font-extrabold uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center gap-3 rounded-2xl border bg-[#F8FAFC] px-4 py-3 text-left outline-none transition ${
          open
            ? "border-brand bg-white ring-2 ring-brand/20"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <CalendarDays className="size-4" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate text-[15px] font-extrabold ${
              value ? "text-ink" : "text-slate-400"
            }`}
          >
            {value ? formatDisplay(value) : "Alege data"}
          </span>
        </span>
      </button>

      <div
        className={`absolute z-50 origin-top transition duration-150 ${
          placement === "top" ? "bottom-[calc(100%+0.5rem)]" : "top-full mt-2"
        } left-0 right-auto w-[min(100vw-2rem,20rem)] max-w-[calc(100vw-2rem)] sm:right-0 sm:w-auto sm:max-w-none ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0"
        }`}
      >
        <div
          id={listId}
          role="dialog"
          aria-label={`Calendar ${label}`}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_50px_rgba(15,23,42,0.16)]"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="Luna anterioară"
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              className="inline-flex size-9 items-center justify-center rounded-xl bg-surface text-ink transition hover:bg-brand-soft hover:text-brand"
            >
              <ChevronLeft className="size-4" strokeWidth={2.4} />
            </button>
            <p className="text-[15px] font-extrabold capitalize text-ink">
              {monthLabel}
            </p>
            <button
              type="button"
              aria-label="Luna următoare"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="inline-flex size-9 items-center justify-center rounded-xl bg-surface text-ink transition hover:bg-brand-soft hover:text-brand"
            >
              <ChevronRight className="size-4" strokeWidth={2.4} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-1 text-center text-[11px] font-extrabold uppercase tracking-wide text-slate-400"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map(({ date, inMonth }) => {
              const iso = toIso(date);
              const disabled = isDisabled(date);
              const isSelected = selected ? sameDay(date, selected) : false;
              const isToday = sameDay(date, today);

              return (
                <button
                  key={iso + String(inMonth)}
                  type="button"
                  disabled={disabled || !inMonth}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`flex min-h-10 aspect-square items-center justify-center rounded-xl text-[13px] font-extrabold transition ${
                    !inMonth
                      ? "invisible"
                      : disabled
                        ? "cursor-not-allowed text-slate-300"
                        : isSelected
                          ? "bg-brand text-white shadow-[0_8px_18px_rgba(248,104,0,0.35)]"
                          : isToday
                            ? "bg-brand-soft text-brand hover:bg-brand hover:text-white"
                            : "text-ink hover:bg-surface"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => {
                const iso = toIso(today);
                if (!isDisabled(today)) {
                  onChange(iso);
                  setViewMonth(startOfMonth(today));
                  setOpen(false);
                }
              }}
              className="text-[13px] font-extrabold text-brand transition hover:text-brand-dark"
            >
              Azi
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[13px] font-bold text-muted transition hover:text-ink"
            >
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
