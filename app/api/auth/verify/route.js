import { NextResponse } from 'next/server';
import { verifySession, SESSION_CONFIG } from '@/lib/auth';

export async function GET(req) {
  const token = req.cookies.get(SESSION_CONFIG.name)?.value;
  const session = await verifySession(token);
  return NextResponse.json({ authenticated: !!session });
}
