import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, skill, website } = await req.json();

  // Honeypot — bots fill this, humans don't
  if (website) return NextResponse.json({ ok: true });

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { error } = await supabase
    .from("playtest_requests")
    .insert({ email, skill: skill ?? "BEGINNER" });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }


  return NextResponse.json({ ok: true });
}
