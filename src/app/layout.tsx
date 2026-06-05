import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://caniaffordit.ai"
  ),
  title: {
    default: "Can I Afford It? AI — India's Free Affordability Calculator",
    template: "%s | Can I Afford It? AI",
  },
  description:
    "Free AI-powered affordability calculator for cars, homes, phones, laptops, and financial planning in India. Get an honest answer in 30 seconds.",
  keywords: [
    "affordability calculator india",
    "can i afford a car india",
    "home loan calculator india",
    "EMI calculator",
    "SIP calculator",
    "salary based financial planner",
    "can i afford it AI",
  ],
  authors: [{ name: "Can I Afford It? AI" }],
  creator: "Can I Afford It? AI",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Can I Afford It? AI — India's Free Affordability Calculator",
    description:
      "AI-powered affordability calculator for cars, homes, phones, and more. 100% free, no data stored.",
    siteName: "Can I Afford It? AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Can I Afford It? AI",
    description: "India's free AI affordability calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* AdSense — loads once globally, prevented from duplicating by script async */}
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </body>
    </html>
  );
}
