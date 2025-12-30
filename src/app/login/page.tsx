"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/dashboard";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const r = await fetch("/api/proxy/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      if (!r.ok) {
        const j = await r.json().catch(() => ({ error: "Invalid OTP" }));
        setErr(j.error || "Invalid or expired OTP code");
        return;
      }

      const data = await r.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      router.push(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-blue-500/20">
        <div className="flex items-center justify-center mb-8">
          <Shield className="w-16 h-16 text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Valiance Security
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Enter your 6-digit access code
        </p>

        <form onSubmit={submit}>
          <div className="mb-6">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
              Access Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center text-2xl tracking-widest font-mono"
              placeholder="000000"
              maxLength={6}
              required
              autoComplete="off"
              disabled={loading}
            />
          </div>

          {err && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>🔐 Use <code className="bg-gray-700 px-2 py-1 rounded">vs!dashlogin</code> in Discord to generate a code</p>
        </div>
      </div>
    </div>
  );
}
