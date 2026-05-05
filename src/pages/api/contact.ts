import type { APIRoute } from 'astro';
import { getSupabase } from '../../lib/supabase';
import { getResend, FROM, STUDIO_EMAIL } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const text = await request.text();
  const params = new URLSearchParams(text);
  const honeypot = params.get('website');
  const name = params.get('name')?.trim();
  const email = params.get('email')?.trim();
  const message = params.get('message')?.trim();
  const type = params.get('type')?.trim();

  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (!name || !email || !message || !['contact', 'support'].includes(type ?? '')) {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
  }

  const { error: dbError } = await getSupabase()
    .from('contact_submissions')
    .insert({ name, email, message, type });

  if (dbError) {
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }

  const label = type === 'support' ? 'Support' : 'Contact';
  const resend = getResend();

  await resend.emails.send({
    from: FROM(),
    to: STUDIO_EMAIL(),
    subject: `[${label}] Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  await resend.emails.send({
    from: FROM(),
    to: email,
    subject: `We received your message — FriedGames`,
    text: `Hi ${name},\n\nWe received your message and will get back to you shortly.\n\n— FriedGames`,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
