import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid username or password (min 6 chars)" }, { status: 400 });
    }

    const email = `${username}@portfolio.com`;
    const supabase = await createClient();

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 409 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
