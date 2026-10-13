"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "clip"
  | "soft"
  | "tilt";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 800,
  className = "",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible for SSR; hide after mount then reveal on scroll
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");

    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal reveal-${variant} ${visible ? "is-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
