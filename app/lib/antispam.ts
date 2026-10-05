import type { NextRequest } from "next/server";

// Minimum time a human needs between page load and submit.
const MIN_FILL_MS = 3_000;
// Forms older than this are treated as replayed/scripted.
const MAX_FILL_MS = 24 * 60 * 60 * 1_000;

const RATE_WINDOW_MS = 10 * 60 * 1_000;
const RATE_MAX = 5;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort, per serverless instance. Catches bursts from a single IP.
const hits = new Map<string, number[]>();

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5_000) {
    for (const [k, ts] of hits) {
      if (ts.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_MAX;
}

/** True when the submission looks automated (honeypot filled or submitted too fast/too late). */
export function looksLikeBot(website: unknown, startedAt: unknown): boolean {
  if (typeof website === "string" && website.trim() !== "") return true;
  if (typeof startedAt !== "number") return true;
  const elapsed = Date.now() - startedAt;
  return elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS;
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

export function isText(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

/** Messages stuffed with links are almost always spam. */
export function hasTooManyLinks(text: string, max = 2): boolean {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length > max;
}
