"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="header"
      style={{
        borderBottom: "1px solid var(--border2)",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
        }}
      >
        <Link href="/" className="gradient-text" style={{ fontSize: 22, fontWeight: 800, textDecoration: "none" }}>
          Can I Afford It? AI
        </Link>

        <nav aria-label="Main navigation">
          <ul style={{ display: "flex", gap: 14, listStyle: "none", flexWrap: "wrap" }}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  style={{
                    color: pathname === item.href ? "var(--accent2)" : "var(--text2)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: pathname === item.href ? 600 : 400,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
