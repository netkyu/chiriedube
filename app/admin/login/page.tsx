import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(248,104,0,0.14),_transparent_50%)]"
        aria-hidden
      />

      <Link href="/" className="relative z-10 mb-8 block">
        <span className="relative mx-auto block h-[39px] w-[118px] sm:h-[45px] sm:w-[133px]">
          <Image
            src="/images/logo-chiriedube-v2.png"
            alt="ChirieDube.ro"
            fill
            priority
            unoptimized
            className="object-contain"
            sizes="190px"
          />
        </span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-[12px] font-medium text-muted shadow-[0_18px_50px_rgba(248,104,0,0.12)]">
              Se încarcă...
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
