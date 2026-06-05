import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <p style={{ fontSize: 64, marginBottom: 16 }} aria-hidden="true">🔍</p>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Page Not Found</h1>
      <p style={{ color: "var(--text2)", lineHeight: 1.7, marginBottom: 28 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
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
        ← Back to Home
      </Link>
    </div>
  );
}
