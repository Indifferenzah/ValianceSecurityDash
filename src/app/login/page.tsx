"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/dashboard";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const r = await fetch("/api/proxy/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!r.ok) {
      const j = await r.json().catch(() => ({ error: "Login failed" }));
      setErr(j.error || "Login failed");
      return;
    }

    router.push(next);
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <p className="muted">Accedi per gestire moduli, config e whitelist.</p>

        <form onSubmit={submit} className="grid">
          <div className="grid">
            <label className="muted">Username</label>
            <input className="card" value={username} onChange={e => setU(e.target.value)} />
          </div>
          <div className="grid">
            <label className="muted">Password</label>
            <input className="card" type="password" value={password} onChange={e => setP(e.target.value)} />
          </div>

          {err && <div className="card" style={{ borderColor: "rgba(255,80,80,.4)" }}>{err}</div>}

          <button className="btn primary" type="submit">Entra</button>
        </form>
      </div>
    </div>
  );
}
