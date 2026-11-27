import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[9px] font-semibold text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight
                  className="size-3.5 shrink-0 text-slate-300"
                  strokeWidth={2.4}
                  aria-hidden
                />
              ) : null}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-brand transition hover:text-brand-dark"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={isLast ? "font-extrabold text-ink" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
