import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Ruler,
  Settings2,
  Users,
  Weight,
} from "lucide-react";
import { type FleetVan } from "@/lib/data";

export default function VanCard({ van }: { van: FleetVan }) {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <Link href={`/flota/${van.id}`} className="block">
        <div className="relative aspect-[16/9] bg-[#F8FAFC] sm:aspect-[16/10]">
          <Image
            src={van.image}
            alt={van.name}
            fill
            className="object-cover object-[center_65%]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-brand shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[12px]">
            {van.categoryLabel}
          </span>
        </div>
      </Link>

      <div className="p-3 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/flota/${van.id}`} className="min-w-0">
            <h3 className="truncate text-[1rem] font-extrabold text-ink transition hover:text-brand sm:text-[1.3rem]">
              {van.name}
            </h3>
          </Link>
          {/* Mobile: price sits next to the title so the card stays short */}
          <p className="shrink-0 text-right leading-none sm:hidden">
            <span className="block text-[11px] font-semibold text-muted">de la</span>
            <span className="text-[17px] font-extrabold text-ink">
              {van.priceFrom} lei
              <span className="text-[12px] font-bold">/zi</span>
            </span>
          </p>
        </div>

        <div className="mt-2.5 flex flex-col gap-2.5 sm:mt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <ul className="grid grid-cols-2 gap-x-2.5 gap-y-1 text-[11.5px] font-semibold text-muted sm:grid-cols-1 sm:gap-y-1.5 sm:text-[14px]">
            <li className="flex min-w-0 items-center gap-1.5">
              <Box className="size-3.5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
              <span className="truncate">{van.volume}</span>
            </li>
            <li className="flex min-w-0 items-center gap-1.5">
              <Ruler
                className="size-3.5 shrink-0 text-brand"
                strokeWidth={2}
                aria-hidden
              />
              <span className="truncate">
                {van.heightCm > 0
                  ? `${van.lengthCm}×${van.widthCm}×${van.heightCm} cm`
                  : `${van.lengthCm}×${van.widthCm} cm`}
              </span>
            </li>
            <li className="flex min-w-0 items-center gap-1.5">
              <Weight
                className="size-3.5 shrink-0 text-brand"
                strokeWidth={2}
                aria-hidden
              />
              <span className="truncate">{van.payload}</span>
            </li>
            <li className="flex min-w-0 items-center gap-1.5">
              <Users
                className="size-3.5 shrink-0 text-brand"
                strokeWidth={2}
                aria-hidden
              />
              <span className="truncate">{van.seats}</span>
            </li>
            <li className="col-span-2 hidden min-w-0 items-center gap-1.5 sm:col-span-1 sm:flex">
              <Settings2
                className="size-3.5 shrink-0 text-brand"
                strokeWidth={2}
                aria-hidden
              />
              <span className="truncate">{van.transmission}</span>
            </li>
          </ul>

          <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:flex-col sm:items-end sm:text-right">
            <div className="hidden sm:block">
              <p className="text-[12px] font-semibold text-muted">de la</p>
              <p className="text-[21px] font-extrabold leading-none text-ink">
                {van.priceFrom} lei
                <span className="text-[14px] font-bold">/zi</span>
              </p>
            </div>
            <Link
              href={`/flota/${van.id}`}
              className="inline-flex h-[42px] w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-3.5 text-[13px] font-extrabold text-white transition hover:bg-brand-dark sm:mt-2.5 sm:h-auto sm:w-auto sm:py-2.5 sm:text-[0.9375rem]"
            >
              Detalii
              <ArrowRight className="size-4" strokeWidth={2.6} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
