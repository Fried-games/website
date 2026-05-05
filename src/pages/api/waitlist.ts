import type { APIRoute } from 'astro';
import { getSupabase } from '../../lib/supabase';
import { getResend, FROM } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const text = await request.text();
  console.log('[waitlist] content-type:', request.headers.get('content-type'));
  console.log('[waitlist] raw body:', JSON.stringify(text));
  const params = new URLSearchParams(text);
  const honeypot = params.get('website');
  const email = params.get('email')?.trim();
  const name = params.get('name')?.trim() || undefined;
  console.log('[waitlist] email:', email, '| name:', name);

  if (honeypot) {
    return new Response(JSON.stringify({ ok: true, alreadyRegistered: false }), { status: 200 });
  }

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email required', debug: { text, email, name } }), { status: 400 });
  }

  const { error: dbError } = await getSupabase()
    .from('waitlist')
    .insert({ name: name ?? null, email })
    .select();

  if (dbError) {
    console.error('[waitlist] db error:', JSON.stringify(dbError));
    if (dbError.code === '23505') {
      return new Response(JSON.stringify({ ok: true, alreadyRegistered: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ error: 'Database error', detail: dbError.message, code: dbError.code }), { status: 500 });
  }

  try {
    await getResend().emails.send({
      from: FROM(),
      to: email,
      subject: `You're on the playtest waitlist — FriedGames`,
      text: `Hi${name ? ` ${name}` : ''},\n\nYou're on the list! We'll reach out when playtest spots open up.\n\n— FriedGames`,
    });
  } catch (emailErr) {
    console.error('[waitlist] email send failed:', emailErr);
  }

  return new Response(JSON.stringify({ ok: true, alreadyRegistered: false }), { status: 200 });
};
