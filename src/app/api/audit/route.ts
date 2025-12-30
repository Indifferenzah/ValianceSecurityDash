import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4068";
    const token = req.headers.get("authorization");
    const { searchParams } = new URL(req.url);
    
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => params.append(key, value));
    
    const r = await fetch(`${apiBase}/api/audit?${params}`, {
      headers: token ? { "Authorization": token } : {}
    });

    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Connection error" },
      { status: 500 }
    );
  }
}
