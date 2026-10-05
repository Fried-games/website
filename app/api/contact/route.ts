import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, hasTooManyLinks, isRateLimited, isText, isValidEmail, looksLikeBot } from "../../lib/antispam";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { name, email, message, website, startedAt } = body;

  if (isRateLimited(`contact:${clientIp(req)}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Pretend success so bots don't learn what tripped them.
  if (looksLikeBot(website, startedAt)) return NextResponse.json({ ok: true });

  if (!isText(name, 100) || !isValidEmail(email) || !isText(message, 5000)) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (hasTooManyLinks(message)) return NextResponse.json({ ok: true });

  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name: name.trim(), email: email.trim(), message: message.trim(), type: "contact" });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
