"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  KeyRound,
  LogOut,
  MessageSquareQuote,
} from "lucide-react";
import { adminLogout } from "@/app/actions/admin-auth";

const nav = [
  { href: "/admin/reviews", label: "Recenzii", icon: MessageSquareQuote },
  { href: "/admin/account", label: "Conturi", icon: KeyRound },
] as const;

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#F7F8FA] text-ink">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(248,104,0,0.12),_transparent_58%)]"
        aria-hidden
      />

      <header className="relative z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-6 px-5 sm:h-[4.75rem] sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-7 sm:gap-10">
            <Link href="/admin/reviews" className="shrink-0">
              <span className="relative block h-11 w-[140px] sm:h-12 sm:w-[168px]">
                <Image
                  src="/images/logo-chiriedube-v2.png"
                  alt="ChirieDube.ro"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-left"
                  sizes="168px"
                />
              </span>
            </Link>

            <nav className="flex items-center gap-6 sm:gap-8">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative inline-flex items-center gap-2 py-1 text-[14px] transition sm:text-[15px] ${
                      active
                        ? "font-extrabold text-brand after:absolute after:inset-x-0 after:-bottom-1 after:h-[2.5px] after:rounded-full after:bg-brand"
                        : "font-semibold text-ink/55 hover:text-ink"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={2.2} aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-[13px] font-bold text-muted transition hover:text-brand sm:inline-flex"
            >
              Vezi site
              <ExternalLink className="size-3.5" strokeWidth={2.2} aria-hidden />
            </Link>
            <span className="hidden max-w-[180px] truncate text-[12px] font-semibold text-muted xl:inline">
              {email}
            </span>
            <form action={adminLogout}>
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-3.5 text-[13px] font-extrabold text-white shadow-[0_8px_18px_rgba(248,104,0,0.28)] transition hover:bg-brand-dark sm:px-4"
              >
                <LogOut className="size-3.5" strokeWidth={2.4} aria-hidden />
                Ieșire
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        {children}
      </main>
    </div>
  );
}
