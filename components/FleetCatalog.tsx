"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { fleet, type FleetCategory } from "@/lib/data";
import VanCard from "./VanCard";

type SortKey = "price-asc" | "price-desc" | "name";

const categoryOptions: { value: FleetCategory | "all"; label: string }[] = [
  { value: "all", label: "Toate" },
  { value: "autoutilitara", label: "Autoutilitare" },
  { value: "remorca", label: "Remorci" },
  { value: "autoturism", label: "Autoturisme" },
];

const brands = ["all", ...Array.from(new Set(fleet.map((v) => v.brand)))];
const priceMax = Math.max(...fleet.map((v) => v.priceFrom));
const priceMin = Math.min(...fleet.map((v) => v.priceFrom));

export default function FleetCatalog() {
  const [category, setCategory] = useState<FleetCategory | "all">("all");
  const [brand, setBrand] = useState("all");
  const [maxPrice, setMaxPrice] = useState(priceMax);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = fleet.filter((van) => {
      if (category !== "all" && van.category !== category) return false;
      if (brand !== "all" && van.brand !== brand) return false;
      if (van.priceFrom > maxPrice) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.priceFrom - a.priceFrom;
        case "name":
          return a.name.localeCompare(b.name, "ro");
        case "price-asc":
        default:
          return a.priceFrom - b.priceFrom;
      }
    });
  }, [category, brand, maxPrice, sort]);

  const hasFilters =
    category !== "all" || brand !== "all" || maxPrice < priceMax;

  function resetFilters() {
    setCategory("all");
    setBrand("all");
    setMaxPrice(priceMax);
    setSort("price-asc");
  }

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="h-fit min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-5 lg:sticky lg:top-28">
        {/* Mobile: category chips always visible as a scrollable row */}
        <div className="min-w-0 overflow-x-auto [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max max-w-none gap-2">
            {categoryOptions.map((option) => {
              const active = category === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCategory(option.value)}
                  className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-xl px-3.5 text-[13px] font-extrabold transition ${
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

        <div className="mt-3 flex items-center justify-between gap-3 lg:mt-0">
          <button
            type="button"
            className="inline-flex min-h-[36px] items-center gap-2 text-[14px] font-extrabold text-ink lg:pointer-events-none lg:min-h-0"
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
            <span className="text-muted lg:hidden" aria-hidden>
              {filtersOpen ? (
                <ChevronUp className="size-4" strokeWidth={2.4} />
              ) : (
                <ChevronDown className="size-4" strokeWidth={2.4} />
              )}
            </span>
          </button>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-[36px] items-center gap-1 text-[13px] font-bold text-brand transition hover:text-brand-dark lg:min-h-0"
            >
              <X className="size-3.5" aria-hidden />
              Resetează
            </button>
          ) : null}
        </div>

        <div
          className={`mt-4 space-y-5 sm:space-y-6 lg:mt-5 ${filtersOpen ? "block" : "hidden lg:block"}`}
        >
          <div className="hidden lg:block">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Categorie
            </p>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
              {categoryOptions.map((option) => {
                const active = category === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCategory(option.value)}
                    className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-extrabold transition ${
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
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted sm:text-[12px]">
              Brand
            </p>
            <div className="mt-2 flex flex-wrap gap-2 sm:mt-2.5">
              {brands.map((b) => {
                const active = brand === b;
                const label = b === "all" ? "Toate" : b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`min-h-[36px] rounded-xl px-3 py-1.5 text-[13px] font-extrabold transition sm:min-h-0 sm:py-2 ${
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 lg:gap-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted sm:text-[12px]">
                  Preț maxim / zi
                </p>
                <span className="text-[14px] font-extrabold text-ink">
                  {maxPrice} lei
                </span>
              </div>
              <input
                type="range"
                min={priceMin}
                max={priceMax}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 h-6 w-full accent-brand"
                aria-label="Preț maxim pe zi"
              />
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted sm:text-[12px]">
                Sortează
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-surface px-3 py-2.5 text-[14px] font-semibold text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 sm:mt-2.5"
              >
                <option value="price-asc">Preț: crescător</option>
                <option value="price-desc">Preț: descrescător</option>
                <option value="name">Nume: A → Z</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
          <p className="text-[13.5px] font-semibold text-muted sm:text-[15px]">
            <span className="font-extrabold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "vehicul găsit" : "vehicule găsite"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-surface px-5 py-10 text-center sm:px-6 sm:py-14">
            <p className="text-[1.05rem] font-extrabold text-ink sm:text-[1.2rem]">
              Niciun vehicul nu corespunde filtrelor
            </p>
            <p className="mt-2 text-[13.5px] font-medium text-muted sm:text-[15px]">
              Încearcă să extinzi prețul maxim sau să resetezi filtrele.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex min-h-[42px] items-center rounded-xl bg-brand px-5 text-[14px] font-extrabold text-white transition hover:bg-brand-dark sm:mt-5 sm:text-[0.9375rem]"
            >
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {filtered.map((van) => (
              <VanCard key={van.id} van={van} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
