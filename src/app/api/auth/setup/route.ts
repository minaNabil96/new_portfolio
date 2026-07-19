import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST() {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({
        email: "admin@portfolio.com",
        password: "01069534435",
        email_confirm: true,
        user_metadata: { username: "admin" },
      }),
    });

    const data = await res.json();

    if (res.status === 409) {
      return NextResponse.json({ exists: true });
    }

    if (!res.ok) {
      return NextResponse.json({ error: data.msg || "Setup failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
