import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { company, legalLinks } from "@/lib/data";

type LegalShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function LegalShell({
  title,
  description,
  children,
}: LegalShellProps) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="border-b border-slate-100 bg-[#F8FAFC]">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand">
              Informații legale
            </p>
            <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[2.6rem]">
              {title}
            </h1>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-muted sm:text-[16px]">
              {description}
            </p>
            <p className="mt-4 text-[13px] font-semibold text-slate-500">
              Ultima actualizare: {company.legalUpdated} · Operator:{" "}
              {company.legalName}
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <nav
            aria-label="Documente legale"
            className="mb-8 flex flex-wrap gap-2 border-b border-slate-100 pb-6"
          >
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl bg-surface px-3 py-2 text-[13px] font-extrabold text-ink transition hover:bg-brand-soft hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="legal-prose space-y-8 text-[15px] font-medium leading-relaxed text-ink/90">
            {children}
          </div>

          <aside className="mt-12 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5 sm:p-6">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand">
              Date societate
            </p>
            <dl className="mt-3 grid gap-2 text-[14px] sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-muted">Denumire</dt>
                <dd className="font-extrabold text-ink">{company.legalName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">CIF</dt>
                <dd className="font-extrabold text-ink">{company.cif}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">Reg. com.</dt>
                <dd className="font-extrabold text-ink">{company.regCom}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">Sediu</dt>
                <dd className="font-extrabold text-ink">{company.address}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-muted">IBAN · Bancă</dt>
                <dd className="font-extrabold text-ink">
                  {company.iban} · {company.bank}
                </dd>
              </div>
            </dl>
          </aside>
        </article>
      </main>
      <Footer />
      <ContactCTA />
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[1.25rem] font-extrabold tracking-tight text-ink sm:text-[1.35rem]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_a]:font-extrabold [&_a]:text-brand [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-extrabold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}
