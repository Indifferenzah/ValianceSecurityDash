import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4068";
    
    const r = await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await r.json();

    if (!r.ok) {
      return NextResponse.json(
        { error: data.error || "Invalid OTP code" }, 
        { status: r.status }
      );
    }
    
    return NextResponse.json({ 
      token: data.token,
      user: data.user
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Connection error" },
      { status: 500 }
    );
  }
}
