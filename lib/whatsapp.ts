import { contact } from "@/lib/data";
import { formatDateRo, formatLei } from "@/lib/pricing";

type QuoteMessageInput = {
  vanName: string;
  categoryLabel: string;
  pickup: string;
  dropoff: string;
  days: number;
  total: number;
  kmIncluded: number | null;
  neededKm: number | null;
  extraKmLei: number;
  depositLei: number;
};

export function buildWhatsAppQuoteUrl(input: QuoteMessageInput) {
  const lines = [
    `Bună! Vreau o rezervare pe chiriedube.ro:`,
    ``,
    `• Vehicul: ${input.vanName} (${input.categoryLabel})`,
    `• Preluare: ${formatDateRo(input.pickup)}`,
    `• Predare: ${formatDateRo(input.dropoff)}`,
    `• Durată: ${input.days} ${input.days === 1 ? "zi" : "zile"}`,
    `• Estimare: ${formatLei(input.total)} (fără garanție)`,
  ];

  if (input.kmIncluded != null) {
    lines.push(`• Km incluși: ~${input.kmIncluded} km`);
    if (input.neededKm != null) {
      lines.push(`• Km estimați: ~${input.neededKm} km`);
    }
    if (input.extraKmLei > 0) {
      lines.push(`• Extra km: ${formatLei(input.extraKmLei)}`);
    }
  } else {
    lines.push(`• Km: fără limită (remorcă)`);
  }

  lines.push(
    `• Garanție: ${input.depositLei > 0 ? `${formatLei(input.depositLei)} (doar cash)` : "nu se aplică"}`,
    ``,
    `Vă rog să confirmați disponibilitatea. Mulțumesc!`,
  );

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
}
