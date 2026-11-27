"use client";

import { useActionState, useState, useTransition } from "react";
import { Check, KeyRound, Trash2, UserPlus, Users } from "lucide-react";
import {
  changeOwnPassword,
  createAdminAccount,
  deleteAdminAccount,
  type AuthResult,
} from "@/app/actions/admin-auth";
import type { AdminProfile } from "@/lib/reviews";

const initial: AuthResult | null = null;

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-[10px] font-medium text-ink outline-none transition ring-brand/20 focus:border-brand/40 focus:bg-white focus:ring-2";

export default function AccountManager({
  currentUserId,
  profiles,
}: {
  currentUserId: string;
  profiles: AdminProfile[];
}) {
  const [pwdState, pwdAction, pwdPending] = useActionState(
    changeOwnPassword,
    initial,
  );
  const [createState, createAction, createPending] = useActionState(
    createAdminAccount,
    initial,
  );
  const [pending, start] = useTransition();
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center sm:text-left">
        <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-brand sm:text-[8px]">
          Acces
        </p>
        <h1 className="mt-2 text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.4rem]">
          Conturi <span className="text-brand">admin</span>
        </h1>
        <p className="mt-2 max-w-xl text-[10px] font-medium leading-relaxed text-muted sm:text-[10px]">
          Schimbă parola și gestionează administratorii.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <KeyRound className="size-5" strokeWidth={1.9} aria-hidden />
            </span>
            <div>
              <h2 className="text-[1.05rem] font-extrabold text-ink">Parola ta</h2>
              <p className="text-[9px] font-medium text-muted">Minim 10 caractere</p>
            </div>
          </div>
          <form action={pwdAction} className="mt-6 grid gap-4">
            <label className="block">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Parolă nouă
              </span>
              <input name="password" type="password" required minLength={10} className={fieldClass} />
            </label>
            <label className="block">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Confirmă
              </span>
              <input name="confirm" type="password" required minLength={10} className={fieldClass} />
            </label>
            {pwdState?.ok ? (
              <p className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-emerald-700">
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
                Parola a fost actualizată.
              </p>
            ) : null}
            {pwdState && !pwdState.ok ? (
              <p className="text-[9px] font-semibold text-rose-700">{pwdState.error}</p>
            ) : null}
            <button
              type="submit"
              disabled={pwdPending}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-brand text-[10px] font-extrabold text-white shadow-[0_8px_18px_rgba(248,104,0,0.28)] transition hover:bg-brand-dark disabled:opacity-60"
            >
              {pwdPending ? "Se salvează..." : "Actualizează"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-white">
              <UserPlus className="size-5" strokeWidth={1.9} aria-hidden />
            </span>
            <div>
              <h2 className="text-[1.05rem] font-extrabold text-ink">Cont nou</h2>
              <p className="text-[9px] font-medium text-muted">Alt administrator</p>
            </div>
          </div>
          <form action={createAction} className="mt-6 grid gap-4">
            <label className="block">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Nume
              </span>
              <input name="display_name" className={fieldClass} />
            </label>
            <label className="block">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Email
              </span>
              <input name="email" type="email" required className={fieldClass} />
            </label>
            <label className="block">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Parolă
              </span>
              <input name="password" type="password" required minLength={10} className={fieldClass} />
            </label>
            {createState?.ok ? (
              <p className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-emerald-700">
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
                Cont creat.
              </p>
            ) : null}
            {createState && !createState.ok ? (
              <p className="text-[9px] font-semibold text-rose-700">
                {createState.error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={createPending}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-ink text-[10px] font-extrabold text-white transition hover:bg-[#003055] disabled:opacity-60"
            >
              {createPending ? "Se creează..." : "Creează"}
            </button>
          </form>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
          <Users className="size-4 text-brand" strokeWidth={2.2} aria-hidden />
          <h2 className="text-[1.05rem] font-extrabold text-ink">Conturi existente</h2>
          {deleteMsg ? (
            <p className="ml-auto text-[9px] font-semibold text-ink">{deleteMsg}</p>
          ) : null}
        </div>
        <ul className="divide-y divide-slate-100">
          {profiles.map((p) => (
            <li
              key={p.user_id}
              className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[10px] font-extrabold text-ink">
                  {p.display_name || p.email}
                  {p.user_id === currentUserId ? (
                    <span className="ml-2 text-[8px] font-bold text-brand">· tu</span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-[9px] font-semibold text-muted">{p.email}</p>
              </div>
              {p.user_id !== currentUserId ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (!confirm(`Ștergi contul ${p.email}?`)) return;
                    start(async () => {
                      const res = await deleteAdminAccount(p.user_id);
                      setDeleteMsg(res.ok ? "Cont șters." : res.error || "Eroare");
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 px-3.5 py-2 text-[8px] font-extrabold text-rose-700 disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" strokeWidth={2.3} aria-hidden />
                  Șterge
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
