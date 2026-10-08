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
        <div className="relative aspect-[16/10] bg-[#F8FAFC]">
          <Image
            src={van.image}
            alt={van.name}
            fill
            className="object-cover object-[center_65%]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-extrabold text-brand shadow-sm">
            {van.sizeLabel}
          </span>
        </div>
      </Link>

      <div className="p-3.5 sm:p-5">
        <Link href={`/flota/${van.id}`}>
          <h3 className="text-[1.1rem] font-extrabold text-ink transition hover:text-brand sm:text-[1.3rem]">
            {van.name}
          </h3>
        </Link>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px] font-semibold text-muted sm:grid-cols-1 sm:gap-y-1.5 sm:text-[14px]">
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
                {van.lengthCm}×{van.widthCm}×{van.heightCm} cm
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
            <li className="col-span-2 flex min-w-0 items-center gap-1.5 sm:col-span-1">
              <Settings2
                className="size-3.5 shrink-0 text-brand"
                strokeWidth={2}
                aria-hidden
              />
              <span className="truncate">{van.transmission}</span>
            </li>
          </ul>

          <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:flex-col sm:items-end sm:text-right">
            <div>
              <p className="text-[12px] font-semibold text-muted">de la</p>
              <p className="text-[20px] font-extrabold leading-none text-ink sm:text-[21px]">
                {van.priceFrom} lei
                <span className="text-[14px] font-bold">/zi</span>
              </p>
            </div>
            <Link
              href={`/flota/${van.id}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-3.5 py-2.5 text-[0.9375rem] font-extrabold text-white transition hover:bg-brand-dark sm:mt-2.5 sm:w-auto"
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
