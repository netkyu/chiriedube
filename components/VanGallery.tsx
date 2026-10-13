"use client";

import { useState } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  label: string;
  alt: string;
};

type VanGalleryProps = {
  images: GalleryImage[];
  vanName: string;
  badge?: string;
};

export default function VanGallery({
  images,
  vanName,
  badge,
}: VanGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[16/10] bg-[#F8FAFC]">
        <Image
          key={current.src}
          src={current.src}
          alt={`${vanName}, ${current.alt}`}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-extrabold text-brand shadow-sm">
            {badge}
          </span>
        ) : null}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <span className="max-w-[65%] truncate rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur-sm sm:px-3 sm:text-[12px]">
            {current.label}
          </span>
          <span className="shrink-0 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm sm:px-3 sm:text-[12px]">
            {active + 1} / {images.length}
          </span>
        </div>
      </div>

      <div
        className={`grid gap-1 border-t border-slate-100 bg-white p-1.5 sm:gap-1.5 sm:p-2 ${
          images.length <= 2
            ? "grid-cols-2"
            : images.length === 3
              ? "grid-cols-3"
              : "grid-cols-4"
        }`}
      >
        {images.map((image, index) => {
          const isActive = index === active;
          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Vezi ${image.label}`}
              aria-pressed={isActive}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg transition ${
                isActive
                  ? "ring-2 ring-brand ring-offset-1"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="220px"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-0.5 pb-1 pt-3 text-center text-[10px] font-extrabold leading-tight text-white">
                {image.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
