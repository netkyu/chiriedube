import { contact } from "@/lib/data";
import { formatDateRo, formatLei } from "@/lib/pricing";

type QuoteMessageInput = {
  vanName: string;
  pickup: string;
  dropoff: string;
  days: number;
  total: number;
  kmIncluded: number;
};

export function buildWhatsAppQuoteUrl(input: QuoteMessageInput) {
  const lines = [
    `Bună! Vreau o rezervare pe chiriedube.ro:`,
    ``,
    `• Dubă: ${input.vanName}`,
    `• Preluare: ${formatDateRo(input.pickup)}`,
    `• Predare: ${formatDateRo(input.dropoff)}`,
    `• Durată: ${input.days} ${input.days === 1 ? "zi" : "zile"}`,
    `• Estimare: ${formatLei(input.total)} (fără garanție)`,
    `• Km incluși: ~${input.kmIncluded} km`,
    ``,
    `Vă rog să confirmați disponibilitatea. Mulțumesc!`,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
}
