import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4068";
    const token = req.headers.get("authorization");
    
    const r = await fetch(`${apiBase}/api/modules`, {
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

export async function PUT(req: Request) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4068";
    const token = req.headers.get("authorization");
    const body = await req.json();
    
    const r = await fetch(`${apiBase}/api/modules/${body.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": token } : {})
      },
      body: JSON.stringify({ enabled: body.enabled })
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
