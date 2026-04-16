import { NextResponse } from 'next/server';
import { SESSION_CONFIG } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_CONFIG.name, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}
