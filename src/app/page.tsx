"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e:any) {
    e.preventDefault();
    const r = await fetch("/api/proxy/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p })
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      setErr(j.error ?? "Login failed");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={u} onChange={e=>setU(e.target.value)} />
      <input type="password" value={p} onChange={e=>setP(e.target.value)} />
      <button type="submit">Login</button>
      <div>{err}</div>
    </form>
  );
}
