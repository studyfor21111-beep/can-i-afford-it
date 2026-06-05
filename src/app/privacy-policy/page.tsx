import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Can I Afford It? AI. We never store your personal financial data.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We do not collect, store, or transmit any personal financial information you enter into our calculators. All calculations are performed locally in your browser. We may collect non-personally-identifiable analytics data such as page views and device type through Google Analytics to improve our service.`,
  },
  {
    title: "2. Cookies",
    content: `We use cookies solely for analytics and advertising purposes (Google Analytics, Google AdSense). These cookies do not identify you personally. You may opt out using your browser settings or visiting Google's ad settings page.`,
  },
  {
    title: "3. Advertising",
    content: `We display ads through Google AdSense to fund our free service. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalised ads at google.com/settings/ads.`,
  },
  {
    title: "4. Third-Party Services",
    content: `Our site may use Google Fonts and other CDN resources that may log your IP address. We have no control over these third-party privacy practices. We encourage you to review Google's Privacy Policy.`,
  },
  {
    title: "5. Children's Privacy",
    content: `Our service is not directed at children under 13. We do not knowingly collect data from children under 13.`,
  },
  {
    title: "6. Changes",
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the site constitutes acceptance of the revised policy.`,
  },
  {
    title: "7. Contact",
    content: `For privacy-related questions, contact us at privacy@caniaffordit.ai.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 60px" }}>
      <section style={{ padding: "52px 0 40px" }} aria-labelledby="privacy-heading">
        <h1 id="privacy-heading" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <p style={{ color: "var(--text3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
          Last updated: June 2026
        </p>
      </section>

      <div
        style={{
          background: "rgba(34,211,163,0.06)",
          border: "1px solid rgba(34,211,163,0.2)",
          borderRadius: "var(--radius2)",
          padding: 20,
          marginBottom: 36,
        }}
      >
        <p style={{ fontWeight: 700, color: "var(--green)", marginBottom: 6 }}>🛡️ Short version</p>
        <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
          Your financial data never leaves your browser. We don&apos;t store, sell, or share your salary,
          savings, or any personal financial information. We run non-intrusive ads to keep the service free.
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
