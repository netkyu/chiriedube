"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowRightLeft, Check } from "lucide-react";
import { fleet, type FleetVan } from "@/lib/data";
import FancySelect from "./FancySelect";

type VanCompareProps = {
  current: FleetVan;
};

type DiffRow = {
  label: string;
  left: string;
  right: string;
  better: "left" | "right" | "same";
};

function buildDiff(left: FleetVan, right: FleetVan): DiffRow[] {
  return [
    {
      label: "Preț / zi",
      left: `${left.priceFrom} lei`,
      right: `${right.priceFrom} lei`,
      better:
        left.priceFrom === right.priceFrom
          ? "same"
          : left.priceFrom < right.priceFrom
            ? "left"
            : "right",
    },
    {
      label: "Tip",
      left: left.volume,
      right: right.volume,
      better: "same",
    },
    {
      label: "Detalii",
      left: left.payload.replace("Sarcină utilă: ", ""),
      right: right.payload.replace("Sarcină utilă: ", ""),
      better:
        left.payloadKg === right.payloadKg
          ? "same"
          : left.payloadKg > right.payloadKg
            ? "left"
            : "right",
    },
    {
      label: "Dimensiuni",
      left:
        left.heightCm > 0
          ? `${left.lengthCm}×${left.widthCm}×${left.heightCm}`
          : `${left.lengthCm}×${left.widthCm}`,
      right:
        right.heightCm > 0
          ? `${right.lengthCm}×${right.widthCm}×${right.heightCm}`
          : `${right.lengthCm}×${right.widthCm}`,
      better: "same",
    },
    {
      label: "Categorie",
      left: left.categoryLabel,
      right: right.categoryLabel,
      better: "same",
    },
    {
      label: "An",
      left: String(left.year),
      right: String(right.year),
      better:
        left.year === right.year
          ? "same"
          : left.year > right.year
            ? "left"
            : "right",
    },
  ];
}

function ValueCell({
  value,
  highlight,
}: {
  value: string;
  highlight: boolean;
}) {
  return (
    <span
      className={`inline-flex min-w-0 items-center gap-0.5 text-[11px] font-extrabold leading-snug sm:gap-1 sm:text-[13px] ${
        highlight ? "text-brand" : "text-ink"
      }`}
    >
      {highlight ? <Check className="size-3 shrink-0" aria-hidden /> : null}
      <span className="break-words">{value}</span>
    </span>
  );
}

export default function VanCompare({ current }: VanCompareProps) {
  const alternatives = fleet.filter((van) => van.id !== current.id);
  const [otherId, setOtherId] = useState(alternatives[0]?.id ?? "");
  const other = useMemo(
    () => fleet.find((van) => van.id === otherId),
    [otherId],
  );

  if (!other) return null;

  const rows = buildDiff(current, other);
  const leftWins = rows.filter((row) => row.better === "left").length;
  const rightWins = rows.filter((row) => row.better === "right").length;
  const leftShort = current.name.split(" ").slice(-1)[0];
  const rightShort = other.name.split(" ").slice(-1)[0];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand">
            <ArrowRightLeft className="size-3.5" aria-hidden />
            Compară
          </p>
          <h2 className="mt-0.5 text-[1.05rem] font-extrabold text-ink">
            {current.name} vs alt model
          </h2>
        </div>
        <div className="w-full sm:max-w-[240px]">
          <FancySelect
            label="Compară cu"
            value={otherId}
            onChange={setOtherId}
            options={alternatives.map((van) => ({
              value: van.id,
              label: van.name,
              hint: `${van.priceFrom} lei/zi · ${van.volumeM3} m³`,
            }))}
          />
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-slate-100">
        <div className="grid grid-cols-[minmax(0,4.5rem)_1fr_1fr] gap-1.5 bg-[#F8FAFC] px-2.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.06em] text-muted sm:grid-cols-[1fr_1fr_1fr] sm:gap-2 sm:px-3 sm:text-[11px] sm:tracking-[0.08em]">
          <span>Spec</span>
          <span className="truncate">{leftShort}</span>
          <span className="truncate">{rightShort}</span>
        </div>
        <ul className="divide-y divide-slate-100">
          {rows.map((row) => (
            <li
              key={row.label}
              className="grid grid-cols-[minmax(0,4.5rem)_1fr_1fr] gap-1.5 px-2.5 py-2 sm:grid-cols-[1fr_1fr_1fr] sm:gap-2 sm:px-3"
            >
              <span className="text-[11px] font-semibold leading-snug text-muted sm:text-[12px]">
                {row.label}
              </span>
              <ValueCell value={row.left} highlight={row.better === "left"} />
              <ValueCell value={row.right} highlight={row.better === "right"} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-[12px] font-medium text-muted">
          Avantaje:{" "}
          <span className="font-extrabold text-ink">
            {leftShort} {leftWins}
          </span>
          {" · "}
          <span className="font-extrabold text-ink">
            {rightShort} {rightWins}
          </span>
        </p>
        <Link
          href={`/flota/${other.id}`}
          className="inline-flex items-center gap-1 text-[13px] font-extrabold text-brand transition hover:text-brand-dark"
        >
          Vezi {rightShort}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
