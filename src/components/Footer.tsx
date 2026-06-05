import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border2)",
        padding: "30px 20px 80px", // extra bottom for sticky mobile ad
        marginTop: 70,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <p style={{ color: "var(--text3)", fontSize: 13 }}>
          © {new Date().getFullYear()} Can I Afford It? AI — Free, always.
        </p>

        <nav aria-label="Footer navigation">
          <ul style={{ display: "flex", gap: 14, listStyle: "none", flexWrap: "wrap" }}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={{ color: "var(--text3)", textDecoration: "none", fontSize: 14 }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
