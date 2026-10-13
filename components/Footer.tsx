"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company, contact, legalLinks, navLinks, siteConfig } from "@/lib/data";
import { openCookieSettings } from "@/components/CookieConsent";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-ink pb-[calc(3rem+env(safe-area-inset-bottom,0px))] text-white sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top band */}
        <div className="flex flex-col gap-5 border-b border-white/10 py-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:py-12">
          <Reveal variant="left">
            <div>
              <a href="/" className="inline-block">
                <span className="relative block h-[130px] w-[220px] sm:h-[168px] sm:w-[280px]">
                  <Image
                    src="/images/logo-chiriedube-footer-v5.png"
                    alt="ChirieDube.ro"
                    fill
                    unoptimized
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 220px, 280px"
                  />
                </span>
              </a>
              <p className="mt-2.5 max-w-md text-[14px] font-medium leading-relaxed text-slate-300 sm:mt-3 sm:text-[16px]">
                Închirieri de autoutilitare, remorci și auto în Satu Mare.
              </p>
              <p className="mt-2 hidden text-[12px] font-semibold leading-relaxed text-slate-500 sm:mt-3 sm:block sm:text-[13px]">
                {company.legalName} · CIF {company.cif} · {company.regCom}
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <div className="grid grid-cols-2 gap-2.5 self-start sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:self-auto">
              <a
                href={contact.phoneHref}
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 text-[14px] font-extrabold text-white transition hover:bg-white/10 sm:h-auto sm:px-5 sm:py-3 sm:text-[0.9375rem]"
              >
                <Phone className="size-4" strokeWidth={2.4} aria-hidden />
                Sună acum
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-extrabold text-white transition hover:bg-brand-dark sm:h-auto sm:px-5 sm:py-3 sm:text-[0.9375rem]"
              >
                Rezervă acum
                <ArrowUpRight className="size-4" strokeWidth={2.4} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[1fr_0.9fr_1.1fr_0.9fr] lg:gap-10 lg:py-12">
          <Reveal variant="up" delay={60} className="col-span-2 sm:col-span-1">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-300 sm:text-[12px]">
                Navigare
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-4 sm:gap-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="group block py-0.5 transition">
                      <span className="block text-[14px] font-semibold text-slate-200 transition group-hover:text-white sm:text-[16px]">
                        {link.label}
                      </span>
                      <span className="mt-0.5 hidden text-[13px] font-medium text-slate-500 transition group-hover:text-slate-400 sm:block">
                        {link.subtitle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-300 sm:text-[12px]">
                Legal
              </p>
              <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-block py-0.5 text-[13.5px] font-semibold text-slate-200 transition hover:text-white sm:text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => openCookieSettings()}
                    className="py-0.5 text-left text-[13.5px] font-semibold text-slate-200 transition hover:text-white sm:text-[15px]"
                  >
                    Setări cookies
                  </button>
                </li>
                <li>
                  <a
                    href="https://anpc.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-0.5 text-[13.5px] font-semibold text-slate-200 transition hover:text-white sm:text-[15px]"
                  >
                    ANPC
                  </a>
                </li>
                <li>
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-0.5 text-[13.5px] font-semibold text-slate-200 transition hover:text-white sm:text-[15px]"
                  >
                    SOL (UE)
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" delay={180} className="col-span-2 order-last sm:order-none sm:col-span-1">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-300 sm:text-[12px]">
                Contact
              </p>
              <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                <li>
                  <a
                    href={contact.phoneHref}
                    className="group flex min-h-9 items-center gap-3 text-[14px] font-semibold text-slate-200 transition hover:text-white sm:text-[16px]"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/10 text-brand transition group-hover:bg-brand group-hover:text-white sm:size-9">
                      <Phone className="size-4" strokeWidth={2.2} aria-hidden />
                    </span>
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex min-h-9 items-center gap-3 text-[14px] font-semibold text-slate-200 transition hover:text-white sm:text-[16px]"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/10 text-brand transition group-hover:bg-brand group-hover:text-white sm:size-9">
                      <Mail className="size-4" strokeWidth={2.2} aria-hidden />
                    </span>
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[13.5px] font-semibold leading-snug text-slate-200 sm:text-[15px]">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand sm:size-9">
                    <MapPin className="size-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="pt-1.5 sm:pt-2">{company.address}</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal variant="up" delay={240}>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-300 sm:text-[12px]">
                Program
              </p>
              <p className="mt-3 text-[13.5px] font-semibold text-white sm:text-[16px]">
                Luni până vineri, 08:00 la 18:00
              </p>
              <p className="mt-1 text-[12.5px] font-medium text-slate-400 sm:text-[15px]">
                Sâmbătă 09:00 la 14:00 · Duminică închis
              </p>
              <p className="mt-3 text-[12.5px] font-medium leading-relaxed text-slate-400 sm:mt-4 sm:text-[14px]">
                Pentru urgențe în județul Satu Mare, ne poți contacta și în
                afara programului.
              </p>
            </div>
          </Reveal>

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-1.5 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-6">
          <Reveal variant="up" delay={40}>
            <p className="text-[12px] font-medium text-slate-500 sm:text-[13px]">
              © {new Date().getFullYear()} {company.legalName} ·{" "}
              {siteConfig.name} · Toate drepturile rezervate
            </p>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p className="text-[12px] font-medium text-slate-500 sm:text-[13px]">
              CIF {company.cif} · {company.regCom}
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
