import Image from "next/image";

type Overlay = "light" | "dark" | "brand" | "soft";
type Variant = "photo" | "white" | "dark";

const overlays: Record<Overlay, string> = {
  light: "bg-gradient-to-b from-white/92 via-white/88 to-white/95",
  dark: "bg-gradient-to-b from-ink/75 via-ink/70 to-ink/85",
  brand: "bg-gradient-to-br from-ink/80 via-brand/55 to-ink/85",
  // Fully opaque at the top edge so dark→light joins don't show a blue fringe
  soft: "bg-gradient-to-b from-white via-white/92 to-white/88",
};

type SectionBackdropProps = {
  variant?: Variant;
  src?: string;
  alt?: string;
  overlay?: Overlay;
  children: React.ReactNode;
  id?: string;
  className?: string;
  priority?: boolean;
};

export default function SectionBackdrop({
  variant = "photo",
  src,
  alt = "",
  overlay = "light",
  children,
  id,
  className = "",
  priority = false,
}: SectionBackdropProps) {
  if (variant === "white") {
    return (
      <section id={id} className={`relative overflow-x-clip bg-white ${className}`}>
        <div className="relative z-10 overflow-visible">{children}</div>
      </section>
    );
  }

  if (variant === "dark") {
    return (
      <section
        id={id}
        className={`relative overflow-x-clip bg-ink ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(248,104,0,0.28),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_80%,rgba(248,104,0,0.12),transparent_45%)]" />
        <div className="relative z-10 overflow-visible">{children}</div>
      </section>
    );
  }

  return (
    <section id={id} className={`relative overflow-x-clip bg-white ${className}`}>
      <div className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : null}
        <div className={`absolute inset-0 ${overlays[overlay]}`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(248,104,0,0.08),transparent_55%)]" />
      </div>
      <div className="relative z-10 overflow-visible">{children}</div>
    </section>
  );
}
