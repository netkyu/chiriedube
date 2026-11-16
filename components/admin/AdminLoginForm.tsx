"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { adminLogin, type AuthResult } from "@/app/actions/admin-auth";

const initial: AuthResult | null = null;

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLogin, initial);
  const params = useSearchParams();
  const unauthorized = params.get("error") === "unauthorized";
  const unavailable = params.get("error") === "unavailable";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white px-7 py-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:px-9 sm:py-9">
      <div className="text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand">
          Autentificare
        </p>
        <h1 className="mt-2 text-[1.65rem] font-extrabold tracking-tight text-ink">
          Panou admin
        </h1>
        <p className="mt-1.5 text-[14px] font-medium text-muted">
          Recenzii și conturi
        </p>
      </div>

      {unauthorized ? (
        <p className="mt-5 rounded-xl bg-amber-50 px-3 py-2.5 text-center text-[13px] font-semibold text-amber-900">
          Contul nu are drepturi de administrator.
        </p>
      ) : null}

      {unavailable ? (
        <p className="mt-5 rounded-xl bg-amber-50 px-3 py-2.5 text-center text-[13px] font-semibold text-amber-900">
          Supabase nu răspunde (rețea/DNS). Verifică proiectul, apoi repornește serverul local.
        </p>
      ) : null}

      <form action={action} className="mt-7 space-y-4">
        <label className="block">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
            Email
          </span>
          <span className="relative mt-2 block">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand"
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              defaultValue="dual.vanzari@gmail.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-3 text-[14px] font-medium outline-none ring-brand/20 focus:border-brand/40 focus:ring-2"
            />
          </span>
        </label>

        <label className="block">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
            Parolă
          </span>
          <span className="relative mt-2 block">
            <LockKeyhole
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand"
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-3 text-[14px] font-medium outline-none ring-brand/20 focus:border-brand/40 focus:ring-2"
            />
          </span>
        </label>

        {state && !state.ok ? (
          <p className="text-center text-[13px] font-semibold text-red-700">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand text-[14px] font-extrabold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Se conectează..." : "Intră în panou"}
        </button>
      </form>
    </div>
  );
}
