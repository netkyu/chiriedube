import type { LucideIcon } from "lucide-react";

type SectionLabelProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  /** On dark section backgrounds */
  tone?: "brand" | "light";
  className?: string;
};

export default function SectionLabel({
  icon: Icon,
  children,
  tone = "brand",
  className = "",
}: SectionLabelProps) {
  const color =
    tone === "light" ? "text-orange-200" : "text-brand";

  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] ${color} sm:text-[12px] ${className}`}
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
      {children}
    </span>
  );
}
