import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Can I Afford It? AI — reach our team with questions, feedback, or partnership inquiries.",
};

export default function Contact() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 60px" }}>
      <section style={{ padding: "52px 0 40px" }} aria-labelledby="contact-heading">
        <h1 id="contact-heading" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.8, maxWidth: 560 }}>
          Have a question, bug report, or partnership idea? We read every message and reply within 2 business days.
        </p>
      </section>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: 24,
        alignItems: "start",
      }}
      className="contact-grid"
      >
        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "📧", label: "Email", val: "hello@caniaffordit.ai", href: "mailto:hello@caniaffordit.ai", desc: "For general enquiries" },
            { icon: "🐛", label: "Bug Reports", val: "bugs@caniaffordit.ai", href: "mailto:bugs@caniaffordit.ai", desc: "Calculator issues or incorrect results" },
            { icon: "🤝", label: "Partnerships", val: "partners@caniaffordit.ai", href: "mailto:partners@caniaffordit.ai", desc: "Advertising or collaboration" },
          ].map((c) => (
            <div key={c.label} style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: "var(--radius2)", padding: 18 }}>
              <p style={{ fontSize: 22, marginBottom: 8 }} aria-hidden="true">{c.icon}</p>
              <p style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 5, fontFamily: "var(--font-mono)" }}>{c.label}</p>
              <a href={c.href} style={{ fontSize: 14, fontWeight: 600, color: "var(--accent2)", textDecoration: "none" }}>{c.val}</a>
              <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 5, lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <ContactForm />
      </div>

      <style>{`
        @media (max-width: 680px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
