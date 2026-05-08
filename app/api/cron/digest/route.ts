import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  // Vérification du secret Vercel Cron
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("playtest_requests")
    .select("email, skill, created_at")
    .gte("created_at", today.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ ok: true, sent: false });
  }

  const lines = data.map((r, i) => `${i + 1}. ${r.email} — ${r.skill}`).join("\n");

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL as string,
    to: "playtest@friedgames.com",
    subject: `[Stroom] ${data.length} nouvelle${data.length > 1 ? "s" : ""} demande${data.length > 1 ? "s" : ""} de playtest aujourd'hui`,
    text: `${data.length} demande${data.length > 1 ? "s" : ""} reçue${data.length > 1 ? "s" : ""} aujourd'hui :\n\n${lines}`,
  });

  return NextResponse.json({ ok: true, sent: true, count: data.length });
}
