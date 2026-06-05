"use client";

import { useEffect, useRef } from "react";

const ADSTERERRA = {
  popunder: "https://pl29625287.effectivecpmnetwork.com/9e/f2/08/9ef2087cd6033292281988e5191a5e8b.js",
  socialBar: "https://pl29625289.effectivecpmnetwork.com/bd/1d/77/bd1d7706d0b1ff4d2791466936b05248.js",
  native: "https://pl29625288.effectivecpmnetwork.com/f827a786550fef25940817243ebb81a7/invoke.js",
  nativeContainer: "container-f827a786550fef25940817243ebb81a7",
};

const BANNERS = {
  top: {
    key: "70f0a98cecaf789cfbe9644770c6211b",
    width: 468,
    height: 60,
    src: "https://www.highperformanceformat.com/70f0a98cecaf789cfbe9644770c6211b/invoke.js",
  },
  rectangle: {
    key: "7e3484f1aceeb2c0ec2211189e8fe8b2",
    width: 300,
    height: 250,
    src: "https://www.highperformanceformat.com/7e3484f1aceeb2c0ec2211189e8fe8b2/invoke.js",
  },
  mobile: {
    key: "9bee68621d8df6b01f6af99d7846db6b",
    width: 320,
    height: 50,
    src: "https://www.highperformanceformat.com/9bee68621d8df6b01f6af99d7846db6b/invoke.js",
  },
  sideSmall: {
    key: "bab568b6602c3fc6da14f25d78b01262",
    width: 160,
    height: 300,
    src: "https://www.highperformanceformat.com/bab568b6602c3fc6da14f25d78b01262/invoke.js",
  },
  sideTall: {
    key: "15e821e608bfe93dda9500b64ffe30eb",
    width: 160,
    height: 600,
    src: "https://www.highperformanceformat.com/15e821e608bfe93dda9500b64ffe30eb/invoke.js",
  },
};

type BannerType = keyof typeof BANNERS;

interface AdSlotProps {
  slot?: string;
  format?: "auto" | "rectangle" | "leaderboard" | "banner";
  className?: string;
  style?: React.CSSProperties;
  hideOnMobile?: boolean;
  type?: BannerType | "native";
}

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
    __adsterraPopunderLoaded?: boolean;
    __adsterraSocialLoaded?: boolean;
  }
}

function appendScript(src: string, id?: string, parent: HTMLElement | DocumentFragment = document.body) {
  if (id && document.getElementById(id)) return null;

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  if (id) script.id = id;
  parent.appendChild(script);
  return script;
}

export function GlobalAdScripts() {
  useEffect(() => {
    if (!window.__adsterraPopunderLoaded) {
      appendScript(ADSTERERRA.popunder, "adsterra-popunder-global");
      window.__adsterraPopunderLoaded = true;
    }

    if (!window.__adsterraSocialLoaded) {
      appendScript(ADSTERERRA.socialBar, "adsterra-socialbar-global");
      window.__adsterraSocialLoaded = true;
    }
  }, []);

  return null;
}

function BannerAd({ type, className, hideOnMobile }: { type: BannerType; className?: string; hideOnMobile?: boolean }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  const banner = BANNERS[type];

  useEffect(() => {
    if (loaded.current || !holderRef.current) return;
    loaded.current = true;

    holderRef.current.innerHTML = "";
    window.atOptions = {
      key: banner.key,
      format: "iframe",
      height: banner.height,
      width: banner.width,
      params: {},
    };

    const script = document.createElement("script");
    script.src = banner.src;
    script.async = true;
    holderRef.current.appendChild(script);

    return () => {
      if (holderRef.current) holderRef.current.innerHTML = "";
    };
  }, [banner]);

  return (
    <div
      className={`${hideOnMobile ? "hidden sm:flex" : "flex"} justify-center ${className ?? ""}`}
      style={{ minHeight: banner.height, contain: "layout style" }}
      aria-hidden="true"
    >
      <div ref={holderRef} style={{ width: banner.width, minHeight: banner.height, maxWidth: "100%" }} />
    </div>
  );
}

function NativeBannerAd({ className }: { className?: string }) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    appendScript(ADSTERERRA.native, "adsterra-native-banner-script");
  }, []);

  return (
    <div
      className={className}
      style={{ minHeight: 160, contain: "layout style" }}
      aria-hidden="true"
    >
      <div id={ADSTERERRA.nativeContainer} />
    </div>
  );
}

export function AdSlot({ slot = "", format, className, style, hideOnMobile, type }: AdSlotProps) {
  let resolvedType: BannerType | "native" = type ?? "native";

  if (!type) {
    if (format === "leaderboard" || slot.toLowerCase().includes("top")) resolvedType = "top";
    else if (format === "rectangle" || slot.toLowerCase().includes("side")) resolvedType = "rectangle";
    else if (slot.toLowerCase().includes("bottom")) resolvedType = "top";
    else resolvedType = "native";
  }

  if (resolvedType === "native") {
    return (
      <div style={style} className={hideOnMobile ? "hidden sm:block" : undefined}>
        <NativeBannerAd className={className} />
      </div>
    );
  }

  return (
    <div style={style}>
      <BannerAd type={resolvedType} className={className} hideOnMobile={hideOnMobile} />
    </div>
  );
}

export function StickyMobileAd() {
  return (
    <div className="sticky-ad-bar sm:hidden" aria-hidden="true">
      <BannerAd type="mobile" />
    </div>
  );
}
