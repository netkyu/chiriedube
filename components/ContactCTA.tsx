import { MessageCircle, Phone } from "lucide-react";
import { contact } from "@/lib/data";

export default function ContactCTA() {
  return (
    <div
      className="fixed z-50 flex flex-row-reverse items-center gap-2 sm:flex-col sm:gap-2"
      style={{
        right: "max(1rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 text-[0.9375rem] font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-[#1ebe57] sm:px-4"
        aria-label="Contactează-ne pe WhatsApp"
      >
        <MessageCircle className="size-5" aria-hidden />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a
        href={contact.phoneHref}
        className="inline-flex items-center gap-2 rounded-full bg-brand px-3.5 py-3 text-[0.9375rem] font-semibold text-white shadow-lg shadow-orange-900/20 transition hover:bg-brand-dark sm:px-4"
        aria-label={`Sună la ${contact.phoneDisplay}`}
      >
        <Phone className="size-5" aria-hidden />
        <span className="hidden sm:inline">{contact.phoneDisplay}</span>
      </a>
    </div>
  );
}
