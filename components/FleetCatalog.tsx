"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { fleet, type FleetSize } from "@/lib/data";
import VanCard from "./VanCard";

type SortKey = "price-asc" | "price-desc" | "volume-desc" | "name";

const sizeOptions: { value: FleetSize | "all"; label: string }[] = [
  { value: "all", label: "Toate" },
  { value: "mica", label: "Mică" },
  { value: "medie", label: "Medie" },
  { value: "mare", label: "Mare" },
];

const brands = ["all", ...Array.from(new Set(fleet.map((v) => v.brand)))];

const priceMax = Math.max(...fleet.map((v) => v.priceFrom));
const volumeMax = Math.max(...fleet.map((v) => v.volumeM3));

export default function FleetCatalog() {
  const [size, setSize] = useState<FleetSize | "all">("all");
  const [brand, setBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState(priceMax);
  const [minVolume, setMinVolume] = useState(0);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = fleet.filter((van) => {
      if (size !== "all" && van.size !== size) return false;
      if (brand !== "all" && van.brand !== brand) return false;
      if (van.priceFrom > maxPrice) return false;
      if (van.volumeM3 < minVolume) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.priceFrom - a.priceFrom;
        case "volume-desc":
          return b.volumeM3 - a.volumeM3;
        case "name":
          return a.name.localeCompare(b.name, "ro");
        case "price-asc":
        default:
          return a.priceFrom - b.priceFrom;
      }
    });
  }, [size, brand, maxPrice, minVolume, sort]);

  const hasFilters =
    size !== "all" ||
    brand !== "all" ||
    maxPrice < priceMax ||
    minVolume > 0;

  function resetFilters() {
    setSize("all");
    setBrand("all");
    setMaxPrice(priceMax);
    setMinVolume(0);
    setSort("price-asc");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-5 lg:sticky lg:top-28">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-[14px] font-extrabold text-ink lg:pointer-events-none"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal className="size-4 text-brand" aria-hidden />
            Filtre
            {hasFilters ? (
              <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-extrabold text-white">
                active
              </span>
            ) : null}
            <span className="text-[12px] font-bold text-muted lg:hidden">
              {filtersOpen ? "−" : "+"}
            </span>
          </button>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[13px] font-bold text-brand transition hover:text-brand-dark"
            >
              <X className="size-3.5" aria-hidden />
              Resetează
            </button>
          ) : null}
        </div>

        <div
          className={`mt-5 space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}
        >
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Dimensiune
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {sizeOptions.map((option) => {
                const active = size === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSize(option.value)}
                    className={`rounded-xl px-3 py-2 text-[13px] font-extrabold transition ${
                      active
                        ? "bg-brand text-white"
                        : "bg-surface text-ink hover:bg-brand-soft hover:text-brand"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Brand
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {brands.map((b) => {
                const active = brand === b;
                const label = b === "all" ? "Toate" : b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`rounded-xl px-3 py-2 text-[13px] font-extrabold transition ${
                      active
                        ? "bg-brand text-white"
                        : "bg-surface text-ink hover:bg-brand-soft hover:text-brand"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Preț maxim / zi
              </p>
              <span className="text-[14px] font-extrabold text-ink">
                {maxPrice} lei
              </span>
            </div>
            <input
              type="range"
              min={180}
              max={priceMax}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-brand"
              aria-label="Preț maxim pe zi"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Volum minim
              </p>
              <span className="text-[14px] font-extrabold text-ink">
                {minVolume > 0 ? `${minVolume} m³` : "Orice"}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={volumeMax}
              step={1}
              value={minVolume}
              onChange={(e) => setMinVolume(Number(e.target.value))}
              className="mt-3 w-full accent-brand"
              aria-label="Volum minim"
            />
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Sortează
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="mt-2.5 w-full rounded-xl border border-slate-200 bg-surface px-3 py-2.5 text-[14px] font-semibold text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            >
              <option value="price-asc">Preț: crescător</option>
              <option value="price-desc">Preț: descrescător</option>
              <option value="volume-desc">Volum: mare → mic</option>
              <option value="name">Nume: A → Z</option>
            </select>
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <p className="text-[15px] font-semibold text-muted">
            <span className="font-extrabold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "dubă găsită" : "dube găsite"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-surface px-6 py-14 text-center">
            <p className="text-[1.2rem] font-extrabold text-ink">
              Nicio dubă nu corespunde filtrelor
            </p>
            <p className="mt-2 text-[15px] font-medium text-muted">
              Încearcă să extinzi prețul maxim sau să resetezi filtrele.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex rounded-xl bg-brand px-5 py-2.5 text-[0.9375rem] font-extrabold text-white transition hover:bg-brand-dark"
            >
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((van) => (
              <VanCard key={van.id} van={van} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
