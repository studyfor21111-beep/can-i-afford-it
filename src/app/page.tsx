import type { Metadata } from "next";
import Link from "next/link";
import { AffordabilityCalculator } from "@/components/AffordabilityCalculator";
import { AdSlot, StickyMobileAd } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Can I Afford It? AI — India's Free Affordability Calculator",
  description:
    "India's AI-powered affordability calculator. Check if you can afford a car, home, phone, laptop or any purchase based on your salary and savings.",
};

const TOOLS = [
  { icon: "🚗", title: "Car Affordability", desc: "True monthly cost including EMI, fuel, insurance and maintenance." },
  { icon: "🏠", title: "Home Loan Planner", desc: "Estimate property affordability with full monthly cost analysis." },
  { icon: "💻", title: "Laptop Budget AI", desc: "See if your salary and savings support your next laptop purchase." },
  { icon: "📈", title: "SIP Calculator", desc: "Project long-term investment growth and retirement planning." },
  { icon: "🎓", title: "Education Cost", desc: "Plan tuition, hostel, and living expenses for any course." },
  { icon: "👴", title: "Retirement Planner", desc: "Calculate the corpus you need and the SIP to get there." },
];

const FAQS = [
  {
    q: "Is my financial data stored anywhere?",
    a: "No. All calculations happen in your browser. We never store, log, or sell your personal financial data.",
  },
  {
    q: "How does the affordability score work?",
    a: "Our score (0–100) factors in your debt-to-income ratio, post-EMI savings, and ability to meet the down payment. A score above 65 means you can afford it comfortably.",
  },
  {
    q: "Which loan interest rates are used?",
    a: "You enter the rate yourself — we don't assume one. This lets you use the actual quote from your bank.",
  },
  {
    q: "Is this tool free?",
    a: "100% free, forever. We're funded by non-intrusive ads, not by selling your data.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ padding: "70px 20px 0", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          style={{
            fontSize: "clamp(34px, 5vw, 60px)",
            lineHeight: 1.1,
            marginBottom: 18,
            fontWeight: 800,
          }}
        >
          Can You Really{" "}
          <span className="gradient-text-green">Afford It?</span>
        </h1>

        <p
          style={{
            color: "var(--text2)",
            maxWidth: 680,
            margin: "0 auto",
            lineHeight: 1.8,
            fontSize: 17,
          }}
        >
          India&apos;s AI-powered affordability calculator — helping you make smarter decisions
          for cars, homes, phones, education, and more. Get an honest answer in 30 seconds.
        </p>

        <Link
          href="#calculator"
          style={{
            display: "inline-block",
            marginTop: 28,
            padding: "14px 32px",
            borderRadius: 30,
            textDecoration: "none",
            color: "white",
            background: "linear-gradient(135deg,#6c63ff,#a78bfa)",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          ⚡ Start Free Analysis
        </Link>

        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 14 }}>
          No sign-up · No data stored · 100% free
        </p>
      </section>

      {/* Top ad */}
      <div style={{ maxWidth: 1000, margin: "32px auto 0", padding: "0 20px" }}>
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP ?? "top"} format="leaderboard" />
      </div>

      {/* Calculator */}
      <section
        id="calculator"
        style={{ maxWidth: 1000, margin: "48px auto 0", padding: "0 20px" }}
        aria-labelledby="calc-heading"
      >
        <h2 id="calc-heading" style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
          Affordability Calculator
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
          Enter your details below to get a personalised financial analysis.
        </p>
        <AffordabilityCalculator />
      </section>

      {/* Mid ad */}
      <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 20px" }}>
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_MID ?? "mid"} format="auto" />
      </div>

      {/* Popular Tools */}
      <section
        id="tools"
        style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}
        aria-labelledby="tools-heading"
      >
        <h2 id="tools-heading" style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
          Popular Tools
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 15, marginBottom: 24 }}>
          Comprehensive calculators for every major financial decision in India.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {TOOLS.map((t) => (
            <article
              key={t.title}
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border2)",
                borderRadius: "var(--radius)",
                padding: 22,
              }}
            >
              <p style={{ fontSize: 28, marginBottom: 10 }} aria-hidden="true">{t.icon}</p>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{t.title}</h3>
              <p style={{ color: "var(--text2)", fontSize: 13, lineHeight: 1.7 }}>{t.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{ maxWidth: 1000, margin: "60px auto 0", padding: "0 20px" }}
        aria-labelledby="faq-heading"
      >
        <h2 id="faq-heading" style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {FAQS.map((f) => (
            <details
              key={f.q}
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border2)",
                borderRadius: "var(--radius2)",
                padding: "16px 20px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 15,
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {f.q}
                <span style={{ color: "var(--accent2)", flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom ad */}
      <div style={{ maxWidth: 1000, margin: "40px auto 0", padding: "0 20px" }}>
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM ?? "bottom"} format="auto" />
      </div>

      {/* Sticky mobile ad */}
      <StickyMobileAd />
    </>
  );
}
