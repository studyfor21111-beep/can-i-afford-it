import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Can I Afford It? AI — India's free AI-powered affordability calculator for cars, homes, phones, and more.",
};

const STATS = [
  { num: "12+", lbl: "Financial Calculators" },
  { num: "200+", lbl: "Products in Database" },
  { num: "100%", lbl: "Free, Always" },
  { num: "0", lbl: "Data Sold" },
];

const TOOLS = [
  { icon: "⚡", name: "AI Affordability Analyzer", desc: "Full report with safety score, EMI impact, and 10-year projection" },
  { icon: "📈", name: "SIP Calculator", desc: "Project your mutual fund SIP growth over any time horizon" },
  { icon: "🏦", name: "FD Calculator", desc: "Fixed deposit maturity with any compounding frequency" },
  { icon: "🚗", name: "Car EMI Calculator", desc: "True monthly cost including insurance, fuel, and maintenance" },
  { icon: "🏠", name: "Home Loan Calculator", desc: "All-in cost with stamp duty, registration, and property tax" },
  { icon: "🎓", name: "Education Cost Planner", desc: "Total college cost including tuition, hostel, and living expenses" },
  { icon: "👴", name: "Retirement Planner", desc: "Corpus needed and monthly SIP to retire comfortably" },
  { icon: "📋", name: "Tax Calculator", desc: "India FY 2025-26 — both new and old tax regimes" },
  { icon: "🎯", name: "Goal Tracker", desc: "Set financial goals and track your progress over time" },
];

const VALUES = [
  { icon: "🔓", title: "Free Forever", body: "Financial education should not have a paywall. Every calculator, every feature, every guide on this site is and will always be 100% free." },
  { icon: "🛡️", title: "Privacy First", body: "Your financial data never leaves your browser. We don't store your salary, savings, or any personal financial information on our servers." },
  { icon: "💡", title: "Honest Answers", body: "We tell you the truth, even when it's not what you want to hear. Our tools are designed to protect your financial health, not encourage reckless spending." },
  { icon: "🇮🇳", title: "Built for India", body: "Every calculation accounts for Indian interest rates, tax laws, cost of living, and the specific products available in the Indian market." },
];

export default function About() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 60px" }}>
      {/* Hero */}
      <section style={{ padding: "56px 0 48px", textAlign: "center" }} aria-labelledby="about-heading">
        <h1
          id="about-heading"
          style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}
        >
          Smart Financial Decisions<br />
          <span className="gradient-text-green">Start Here</span>
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
          Can I Afford It? AI is India&apos;s most comprehensive free affordability calculator —
          helping people make confident financial decisions about cars, homes, education, gadgets, and more.
        </p>
      </section>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 56 }} role="list" aria-label="Key statistics">
        {STATS.map((s) => (
          <div key={s.lbl} role="listitem" style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: "var(--radius2)", padding: 22, textAlign: "center" }}>
            <p style={{ fontSize: 32, fontWeight: 800, color: "var(--accent2)", fontFamily: "var(--font-mono)" }}>{s.num}</p>
            <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 5 }}>{s.lbl}</p>
          </div>
        ))}
      </div>

      {/* What we do */}
      <section style={{ marginBottom: 48 }} aria-labelledby="what-we-do">
        <h2 id="what-we-do" style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>What We Do</h2>
        <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
          We built Can I Afford It? AI because making big financial decisions in India is hard. Bank websites
          give you EMI calculators but not the full picture. Advisors are expensive and often inaccessible.
          Friends give advice based on their own situation, not yours.
        </p>
        <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: 15 }}>
          Our tools combine your salary, savings, debts, and expenses to give you a personalised, honest answer:
          can you actually afford this right now, and if not, exactly what it will take to get there.
        </p>
      </section>

      {/* Tools */}
      <section style={{ marginBottom: 48 }} aria-labelledby="our-tools">
        <h2 id="our-tools" style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Our Tools</h2>
        <p style={{ color: "var(--text2)", fontSize: 15, marginBottom: 24 }}>Everything you need to plan any major financial decision in one place.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
          {TOOLS.map((t) => (
            <div key={t.name} style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: "var(--radius2)", padding: 16, display: "flex", gap: 12 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }} aria-hidden="true">{t.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ marginBottom: 48 }} aria-labelledby="our-values">
        <h2 id="our-values" style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>Our Values</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {VALUES.map((v) => (
            <div key={v.title} style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: "var(--radius2)", padding: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "var(--accent2)" }}>{v.icon} {v.title}</p>
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{
        background: "linear-gradient(135deg,rgba(108,99,255,0.12),rgba(34,211,163,0.08))",
        border: "1px solid rgba(108,99,255,0.25)",
        borderRadius: "var(--radius)",
        padding: 40,
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Ready to make a smarter decision?</h2>
        <p style={{ color: "var(--text2)", marginBottom: 24 }}>Enter your salary and the item you want to buy. Get an honest answer in 30 seconds.</p>
        <Link
          href="/#calculator"
          style={{
            display: "inline-block",
            padding: "13px 28px",
            borderRadius: 30,
            textDecoration: "none",
            background: "linear-gradient(135deg,#6c63ff,#a78bfa)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          ⚡ Start Your Analysis
        </Link>
      </div>
    </div>
  );
}
