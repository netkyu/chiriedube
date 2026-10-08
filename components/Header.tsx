"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Menu, X } from "lucide-react";
import { contact, navLinks } from "@/lib/data";

function sectionId(href: string) {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return null;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0]?.href ?? "/#acasa");

  useEffect(() => {
    if (pathname === "/flota") {
      setActive("/flota");
      return;
    }

    function updateActive() {
      const headerOffset = 100;
      let current = navLinks[0]?.href ?? "/#acasa";

      for (const link of navLinks) {
        const id = sectionId(link.href);
        if (!id) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - headerOffset <= 0) {
          current = link.href;
        }
      }

      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 80) {
        const lastHash = [...navLinks].reverse().find((l) => sectionId(l.href));
        current = lastHash?.href ?? current;
      }

      setActive(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-2 px-4 sm:h-[84px] sm:gap-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex shrink-0 items-center py-1.5 sm:py-2"
        >
          <span className="relative block h-[44px] w-[128px] sm:h-[58px] sm:w-[168px] lg:h-[62px] lg:w-[180px]">
            <Image
              src="/images/logo-chiriedube-v2.png"
              alt="ChirieDube.ro — Dube, platforme, auto"
              fill
              priority
              className="object-contain object-left"
              sizes="(max-width: 640px) 128px, 180px"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative pb-1 text-[15px] transition lg:text-[16px] ${
                  isActive
                    ? "font-extrabold text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-brand"
                    : "font-medium text-ink hover:text-brand"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-[0.875rem] font-semibold text-white transition hover:bg-brand-dark sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[0.9375rem]"
          >
            <CalendarDays className="size-4" strokeWidth={2.2} aria-hidden />
            <span className="hidden sm:inline">Rezervă acum</span>
            <span className="sm:hidden">Rezervă</span>
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-ink md:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-2 py-2.5 text-[0.9375rem] transition ${
                    isActive
                      ? "bg-brand-soft font-extrabold text-brand"
                      : "font-medium text-ink hover:bg-surface"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
