"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});

/** Load the banner after first paint so it does not compete with LCP. */
export default function LazyCookieConsent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const idleId = ric(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = setTimeout(enable, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;
  return <CookieConsent />;
}
