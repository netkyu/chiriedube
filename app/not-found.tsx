import Link from "next/link";
import { ArrowLeft, Home, MessageCircle, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { contact } from "@/lib/data";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(248,104,0,0.12),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-24 select-none text-[9rem] font-extrabold leading-none tracking-tighter text-slate-100 sm:text-[14rem]"
        >
          404
        </div>

        <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand">
            Pagină negăsită
          </p>
          <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.8rem]">
            Drumul ăsta nu duce{" "}
            <span className="text-brand">nicăieri</span>
          </h1>
          <p className="mt-4 max-w-lg text-[16px] font-medium leading-relaxed text-muted">
            Linkul e greșit sau pagina a fost mutată. Poți reveni acasă, vedea
            flota sau ne poți scrie direct pe WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-[15px] font-extrabold text-white transition hover:bg-brand-dark"
            >
              <Home className="size-4" strokeWidth={2.4} aria-hidden />
              Acasă
            </Link>
            <Link
              href="/flota"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand bg-white px-5 py-3.5 text-[15px] font-extrabold text-brand transition hover:bg-brand-soft"
            >
              <Truck className="size-4" strokeWidth={2.4} aria-hidden />
              Vezi flota
            </Link>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-[15px] font-extrabold text-ink transition hover:bg-surface"
            >
              <MessageCircle className="size-4 text-[#25D366]" strokeWidth={2.4} aria-hidden />
              WhatsApp
            </a>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex w-fit items-center gap-1.5 text-[14px] font-bold text-brand transition hover:text-brand-dark"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2.4} aria-hidden />
            Înapoi la pagina principală
          </Link>
        </section>
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}
