import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, isRateLimited, isValidEmail, looksLikeBot } from "../../lib/antispam";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const SKILLS = ["BEGINNER", "CONFIRMED", "EXPERT"];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { email, skill, website, startedAt } = body;

  if (isRateLimited(`playtest:${clientIp(req)}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Honeypot / timing: pretend success so bots don't learn what tripped them.
  if (looksLikeBot(website, startedAt)) return NextResponse.json({ ok: true });

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();

  // One request per email is enough.
  const { count } = await supabase
    .from("playtest_requests")
    .select("email", { count: "exact", head: true })
    .eq("email", normalized);
  if (count) return NextResponse.json({ ok: true });

  const { error } = await supabase
    .from("playtest_requests")
    .insert({ email: normalized, skill: SKILLS.includes(skill) ? skill : "BEGINNER" });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
