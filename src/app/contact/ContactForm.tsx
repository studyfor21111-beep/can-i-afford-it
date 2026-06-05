"use client";
import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg2)",
  border: "1px solid var(--border2)",
  borderRadius: "var(--radius2)",
  padding: "11px 14px",
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Simulate — replace with real API call (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        style={{
          background: "rgba(34,211,163,0.08)",
          border: "1px solid rgba(34,211,163,0.25)",
          borderRadius: "var(--radius)",
          padding: 40,
          textAlign: "center",
        }}
        role="status"
        aria-live="polite"
      >
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--green)", marginBottom: 8 }}>Message sent!</h2>
        <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>
          Thanks for reaching out. We&apos;ll get back to you within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Contact form"
      style={{
        background: "rgba(26,26,38,0.95)",
        border: "1px solid var(--border2)",
        borderRadius: "var(--radius)",
        padding: 28,
      }}
    >
      <p style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 22 }}>
        Send a Message
      </p>

      {[
        { label: "Your Name", name: "name", type: "text", required: true },
        { label: "Email Address", name: "email", type: "email", required: true },
      ].map((f) => (
        <div key={f.name} style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 11, color: "var(--text3)", marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.5px" }}>
            {f.label}
          </label>
          <input
            type={f.type}
            name={f.name}
            value={form[f.name as keyof typeof form]}
            onChange={handleChange}
            required={f.required}
            style={inputStyle}
          />
        </div>
      ))}

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 11, color: "var(--text3)", marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.5px" }}>
          Subject
        </label>
        <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
          <option value="general">General Enquiry</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="partnership">Partnership / Advertising</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 11, color: "var(--text3)", marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.5px" }}>
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        style={{
          width: "100%",
          padding: 13,
          borderRadius: 30,
          fontSize: 14,
          fontWeight: 700,
          cursor: status === "sending" ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          background: "linear-gradient(135deg,#6c63ff,#a78bfa)",
          color: "#fff",
          border: "none",
          opacity: status === "sending" ? 0.7 : 1,
          transition: "opacity 0.2s",
          marginTop: 4,
        }}
      >
        {status === "sending" ? "Sending…" : "Send Message →"}
      </button>

      {status === "error" && (
        <p style={{ color: "#f87171", fontSize: 13, marginTop: 12, textAlign: "center" }} role="alert">
          Failed to send. Please email us directly.
        </p>
      )}
    </form>
  );
}
