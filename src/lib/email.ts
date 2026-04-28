import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend() {
  if (!_resend) {
    _resend = new Resend(import.meta.env.RESEND_API_KEY);
  }
  return _resend;
}

export const FROM = () => import.meta.env.FROM_EMAIL as string;
export const STUDIO_EMAIL = () => import.meta.env.STUDIO_EMAIL as string;
