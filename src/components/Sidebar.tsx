"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/config", label: "Config" },
  { href: "/dashboard/modules", label: "Modules" },
  { href: "/dashboard/whitelist", label: "Whitelist" },
  { href: "/dashboard/messages", label: "Messages" },
];

export default function Sidebar() {
  const p = usePathname();
  return (
    <aside className="sidebar">
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>ValianceSecurity</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
          Dashboard pro-novità
        </div>
      </div>

      <div className="grid">
        {items.map(i => (
          <Link key={i.href} className="navitem" href={i.href} style={{
            background: p === i.href ? "rgba(110,168,254,.18)" : undefined,
            border: p === i.href ? "1px solid rgba(110,168,254,.35)" : "1px solid transparent"
          }}>
            {i.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
