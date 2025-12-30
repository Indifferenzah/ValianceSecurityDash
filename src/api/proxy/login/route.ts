import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  const r = await fetch(`${apiBase}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    return NextResponse.json(
      { error: j.error || "Invalid OTP code" }, 
      { status: 401 }
    );
  }
  
  const j = await r.json();
  
  return NextResponse.json({ 
    token: j.token,
    user: j.user
  });
}
