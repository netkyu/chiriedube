"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Menu, MessageCircle, Phone, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-2 px-4 sm:h-[84px] sm:gap-4 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center py-1.5 sm:py-2">
          <span className="relative block h-[40px] w-[118px] sm:h-[58px] sm:w-[168px] lg:h-[62px] lg:w-[180px]">
            <Image
              src="/images/logo-chiriedube-v2.png"
              alt="ChirieDube.ro, Dube, platforme, auto"
              fill
              priority
              unoptimized
              className="object-contain object-left"
              sizes="(max-width: 640px) 118px, 180px"
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
                className={`relative pb-1 text-[15px] transition-colors duration-200 lg:text-[16px] ${
                  isActive
                    ? "font-extrabold text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-100 after:rounded-full after:bg-brand after:transition-transform after:duration-300"
                    : "font-medium text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[40px] items-center gap-1.5 rounded-xl bg-brand px-3 text-[13px] font-bold text-white transition duration-200 hover:bg-brand-dark active:scale-[0.97] sm:h-auto sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[0.9375rem] sm:font-semibold"
          >
            <CalendarDays className="size-4" strokeWidth={2.2} aria-hidden />
            <span className="hidden sm:inline">Rezervă acum</span>
            <span className="sm:hidden">Rezervă</span>
          </a>
          <button
            type="button"
            className="relative -mr-2 inline-flex size-[44px] items-center justify-center rounded-xl text-ink transition duration-200 active:bg-surface md:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu
              className={`absolute size-6 transition duration-300 ease-out ${
                open
                  ? "rotate-90 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              aria-hidden
            />
            <X
              className={`absolute size-6 transition duration-300 ease-out ${
                open
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-75 opacity-0"
              }`}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — always mounted for open/close animation */}
      <div
        className={`grid overflow-hidden border-slate-100 bg-white transition-[grid-template-rows,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open
            ? "grid-rows-[1fr] border-t"
            : "grid-rows-[0fr] border-t border-transparent"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`max-h-[calc(100dvh-60px)] overflow-y-auto px-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2 transition duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <nav className="flex flex-col">
              {navLinks.map((link, index) => {
                const isActive = active === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      transitionDelay: open ? `${60 + index * 45}ms` : "0ms",
                    }}
                    className={`flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2 transition duration-300 ease-out ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    } ${
                      isActive
                        ? "bg-brand-soft text-brand"
                        : "text-ink hover:bg-surface"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={`text-[15px] ${isActive ? "font-extrabold" : "font-semibold"}`}
                    >
                      {link.label}
                    </span>
                    {link.subtitle ? (
                      <span className="text-[12px] font-medium text-muted">
                        {link.subtitle}
                      </span>
                    ) : null}
                  </a>
                );
              })}
            </nav>
            <div
              style={{
                transitionDelay: open ? `${60 + navLinks.length * 45}ms` : "0ms",
              }}
              className={`mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 transition duration-300 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <a
                href={contact.phoneHref}
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl border border-brand bg-white text-[14px] font-extrabold text-brand transition active:scale-[0.98]"
              >
                <Phone className="size-4" strokeWidth={2.2} aria-hidden />
                Sună
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[14px] font-extrabold text-white transition active:scale-[0.98]"
              >
                <MessageCircle className="size-4" strokeWidth={2.2} aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
