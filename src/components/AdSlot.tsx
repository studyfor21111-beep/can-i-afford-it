"use client";
import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "banner";
  className?: string;
  style?: React.CSSProperties;
  hideOnMobile?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({
  slot,
  format = "auto",
  className,
  style,
  hideOnMobile,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only push once per mount — prevents duplicate ads on navigation
    if (initialized.current) return;
    if (!process.env.NEXT_PUBLIC_ADSENSE_PUB_ID) return;

    try {
      initialized.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded or blocked — silent fail
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_PUB_ID) {
    // Dev placeholder
    return (
      <div
        className={className}
        style={{
          minHeight: 90,
          background: "rgba(108,99,255,0.05)",
          border: "1px dashed var(--border2)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text3)",
          fontSize: 12,
          ...style,
        }}
        aria-hidden="true"
      >
        Ad Slot: {slot}
      </div>
    );
  }

  return (
    <div
      className={`ad-slot${hideOnMobile ? " hidden sm:block" : ""} ${className ?? ""}`}
      style={{ minHeight: 90, contain: "layout style", ...style }}
      aria-hidden="true"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Sticky bottom ad for mobile
export function StickyMobileAd() {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (!process.env.NEXT_PUBLIC_ADSENSE_PUB_ID) return;

    try {
      initialized.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silent
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_PUB_ID) return null;

  return (
    <div
      className="sticky-ad-bar sm:hidden"
      aria-hidden="true"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: 320, height: 50 }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
        data-ad-slot={process.env.NEXT_PUBLIC_AD_SLOT_MOBILE ?? ""}
        data-ad-format="banner"
      />
    </div>
  );
}
