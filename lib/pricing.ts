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

export function calculateExtraKmLei(extraKm: number) {
  if (extraKm <= 0) return 0;
  const blocks = Math.ceil(extraKm / pricingRules.extraKmBlockSize);
  return blocks * pricingRules.extraKmBlockLei;
}

export function calculateRental(
  van: FleetVan,
  days: number,
  neededKm = 0,
) {
  const tier = tierForDays(days);
  const daily = van.priceFrom;
  const subtotal = daily * days;
  const discountLei = Math.round(subtotal * tier.discount);
  const rentalTotal = subtotal - discountLei;

  const kmIncluded = van.hasKmLimit
    ? pricingRules.kmIncludedPerDay * days
    : 0;
  const extraKm = van.hasKmLimit
    ? Math.max(0, neededKm - kmIncluded)
    : 0;
  const extraKmLei = calculateExtraKmLei(extraKm);
  const total = rentalTotal + extraKmLei;
  const depositLei = van.depositLei;

  return {
    days,
    daily,
    subtotal,
    discountLei,
    discountPercent: tier.discount,
    tierLabel: tier.label,
    rentalTotal,
    neededKm: van.hasKmLimit ? neededKm : null,
    kmIncluded: van.hasKmLimit ? kmIncluded : null,
    extraKm: van.hasKmLimit ? extraKm : null,
    extraKmLei,
    total,
    depositLei,
    hasKmLimit: van.hasKmLimit,
  };
}

export function formatLei(amount: number) {
  return `${amount.toLocaleString("ro-RO")} lei`;
}

export function formatDateRo(iso: string) {
  if (!iso) return "…";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
