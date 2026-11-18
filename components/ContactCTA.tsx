import { MessageCircle, Phone } from "lucide-react";
import { contact } from "@/lib/data";

export default function ContactCTA() {
  return (
    <div
      className="fixed z-50 flex flex-row-reverse items-center gap-2 sm:flex-col sm:gap-2"
      style={{
        right: "max(0.75rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-[52px] items-center justify-center gap-2 rounded-full bg-[#25D366] text-[0.9375rem] font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-[#1ebe57] sm:size-auto sm:px-4 sm:py-3"
        aria-label="Contactează-ne pe WhatsApp"
      >
        <MessageCircle className="size-5" aria-hidden />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      {/* Phone FAB only on tablet/desktop, mobile already has phone in hero/header/footer */}
      <a
        href={contact.phoneHref}
        className="hidden size-[52px] items-center justify-center gap-2 rounded-full bg-brand text-[0.9375rem] font-semibold text-white shadow-lg shadow-orange-900/20 transition hover:bg-brand-dark sm:inline-flex sm:size-auto sm:px-4 sm:py-3"
        aria-label={`Sună la ${contact.phoneDisplay}`}
      >
        <Phone className="size-5" aria-hidden />
        <span className="hidden sm:inline">{contact.phoneDisplay}</span>
      </a>
    </div>
  );
}
