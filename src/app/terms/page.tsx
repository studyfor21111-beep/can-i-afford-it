import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Can I Afford It? AI.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Can I Afford It? AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.`,
  },
  {
    title: "2. Not Financial Advice",
    content: `All content and calculators on Can I Afford It? AI are provided for informational and educational purposes only. Nothing on this site constitutes professional financial, investment, legal, or tax advice. Always consult a qualified financial advisor before making major financial decisions.`,
  },
  {
    title: "3. Accuracy of Calculations",
    content: `We strive for accuracy but do not guarantee that our calculators are error-free or suitable for your specific situation. Results are estimates based on the inputs you provide. We are not liable for any decisions made based on our tools.`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on this site, including text, design, code, and brand assets, is owned by Can I Afford It? AI and protected by copyright law. You may not reproduce or distribute our content without written permission.`,
  },
  {
    title: "5. Limitation of Liability",
    content: `To the maximum extent permitted by law, Can I Afford It? AI shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use this service.`,
  },
  {
    title: "6. Governing Law",
    content: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.`,
  },
  {
    title: "7. Changes",
    content: `We reserve the right to modify these Terms at any time. Changes are effective upon posting. Your continued use of the service constitutes acceptance.`,
  },
  {
    title: "8. Contact",
    content: `For questions about these Terms, contact us at legal@caniaffordit.ai.`,
  },
];

export default function Terms() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 60px" }}>
      <section style={{ padding: "52px 0 40px" }} aria-labelledby="terms-heading">
        <h1 id="terms-heading" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <p style={{ color: "var(--text3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
          Last updated: June 2026
        </p>
      </section>

      <div
        style={{
          background: "rgba(108,99,255,0.07)",
          border: "1px solid rgba(108,99,255,0.2)",
          borderRadius: "var(--radius2)",
          padding: 20,
          marginBottom: 36,
        }}
      >
        <p style={{ fontWeight: 700, color: "var(--accent2)", marginBottom: 6 }}>⚠️ Important</p>
        <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
          Our calculators provide estimates for informational purposes only. They do not constitute financial advice.
          Please consult a qualified financial advisor before making major financial decisions.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {SECTIONS.map((s) => (
          <section key={s.title} aria-labelledby={`section-${s.title}`}>
            <h2 id={`section-${s.title}`} style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--accent2)" }}>
              {s.title}
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.8 }}>{s.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
