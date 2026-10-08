import { pricingRules, type FleetVan } from "@/lib/data";

export function rentalDays(pickup: string, dropoff: string): number {
  if (!pickup || !dropoff) return 0;
  const start = new Date(`${pickup}T12:00:00`);
  const end = new Date(`${dropoff}T12:00:00`);
  const diff = end.getTime() - start.getTime();
  if (Number.isNaN(diff) || diff < 0) return 0;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(days, 1);
}

export function tierForDays(days: number) {
  return (
    pricingRules.tiers.find(
      (tier) => days >= tier.minDays && days <= tier.maxDays,
    ) ?? pricingRules.tiers[0]
  );
}

export function calculateRental(van: FleetVan, days: number) {
  const tier = tierForDays(days);
  const daily = van.priceFrom;
  const subtotal = daily * days;
  const discountLei = Math.round(subtotal * tier.discount);
  const total = subtotal - discountLei;
  const kmIncluded = pricingRules.kmIncludedPerDay * days;

  return {
    days,
    daily,
    subtotal,
    discountLei,
    discountPercent: tier.discount,
    tierLabel: tier.label,
    total,
    kmIncluded,
    depositLei: pricingRules.depositLei,
  };
}

export function formatLei(amount: number) {
  return `${amount.toLocaleString("ro-RO")} lei`;
}

export function formatDateRo(iso: string) {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
