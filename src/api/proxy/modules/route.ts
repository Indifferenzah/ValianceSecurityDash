import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
  const r = await fetch(`${apiBase}/api/modules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const j = await r.json().catch(() => {});
    return NextResponse.json({ error: j.error || "Modules failed" }, { status: 401 });
  }
  const j = await r.json();
  const token = j.token;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("vs_session", token, {
    httpOnly:true,
    sameSite:"lax",
    path:"/",
    maxAge: 60*60
  });
  return res;
}
