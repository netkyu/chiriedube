"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company, contact, legalLinks, navLinks, siteConfig } from "@/lib/data";
import { openCookieSettings } from "@/components/CookieConsent";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-ink pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] text-white sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top band */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-12">
          <Reveal variant="left">
            <div>
              <a href="/" className="inline-block">
                <span className="relative block h-16 w-[188px] sm:h-[76px] sm:w-[220px]">
                  <Image
                    src="/images/logo-chiriedube-footer.png"
                    alt="ChirieDube.ro — Dube, platforme, auto"
                    fill
                    className="object-contain object-left"
                    sizes="220px"
                  />
                </span>
              </a>
              <p className="mt-3 max-w-md text-[16px] font-medium leading-relaxed text-slate-300">
                Dube moderne pentru mutări, marfă și proiecte — cu sau fără șofer,
                clar de la început.
              </p>
              <p className="mt-3 text-[13px] font-semibold leading-relaxed text-slate-500">
                {company.legalName} · CIF {company.cif} · {company.regCom}
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <div className="flex w-full flex-col gap-2.5 self-start sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:self-auto">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[0.9375rem] font-extrabold text-white transition hover:bg-white/10"
              >
                <Phone className="size-4" strokeWidth={2.4} aria-hidden />
                Sună acum
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-[0.9375rem] font-extrabold text-white transition hover:bg-brand-dark"
              >
                Rezervă acum
                <ArrowUpRight className="size-4" strokeWidth={2.4} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_0.9fr_1.1fr_0.9fr] lg:gap-10 lg:py-12">
          <Reveal variant="up" delay={60}>
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-orange-300">
                Navigare
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="group block transition">
                      <span className="block text-[16px] font-semibold text-slate-200 transition group-hover:text-white">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-[13px] font-medium text-slate-500 transition group-hover:text-slate-400">
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
              <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-orange-300">
                Legal
              </p>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[15px] font-semibold text-slate-200 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => openCookieSettings()}
                    className="text-left text-[15px] font-semibold text-slate-200 transition hover:text-white"
                  >
                    Setări cookies
                  </button>
                </li>
                <li>
                  <a
                    href="https://anpc.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-semibold text-slate-200 transition hover:text-white"
                  >
                    ANPC
                  </a>
                </li>
                <li>
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-semibold text-slate-200 transition hover:text-white"
                  >
                    SOL (UE)
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" delay={180}>
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-orange-300">
                Contact
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={contact.phoneHref}
                    className="group flex items-center gap-3 text-[16px] font-semibold text-slate-200 transition hover:text-white"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                      <Phone className="size-4" strokeWidth={2.2} aria-hidden />
                    </span>
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-3 text-[16px] font-semibold text-slate-200 transition hover:text-white"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                      <Mail className="size-4" strokeWidth={2.2} aria-hidden />
                    </span>
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[15px] font-semibold leading-snug text-slate-200">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand">
                    <MapPin className="size-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  {company.address}
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal variant="up" delay={240}>
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-orange-300">
                Program
              </p>
              <p className="mt-3 text-[16px] font-semibold text-white">
                Luni – Vineri: 08:00 – 18:00
              </p>
              <p className="mt-1 text-[15px] font-medium text-slate-400">
                Sâmbătă: 09:00 – 14:00 · Duminică: închis
              </p>
              <p className="mt-4 text-[14px] font-medium leading-relaxed text-slate-400">
                Pentru urgențe în județul Satu Mare, ne poți contacta și în
                afara programului.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <Reveal variant="up" delay={40}>
            <p className="text-[13px] font-medium text-slate-500">
              © {new Date().getFullYear()} {company.legalName} ·{" "}
              {siteConfig.name} · Toate drepturile rezervate
            </p>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p className="text-[13px] font-medium text-slate-500">
              CIF {company.cif} · {company.regCom}
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
