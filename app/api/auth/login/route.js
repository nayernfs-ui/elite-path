import { NextResponse } from 'next/server';
import { verifyPassword, createSession, SESSION_CONFIG } from '@/lib/auth';

// Simple in-memory rate limiter (resets on deploy — good enough for small admin)
const attempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientKey(req) {
  return req.headers.get('x-forwarded-for') || req.ip || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  const record = attempts.get(key) || { count: 0, firstAt: now };
  if (now - record.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 0, firstAt: now });
    return false;
  }
  return record.count >= MAX_ATTEMPTS;
}

function trackAttempt(key, success) {
  const now = Date.now();
  const record = attempts.get(key) || { count: 0, firstAt: now };
  if (success) {
    attempts.delete(key);
    return;
  }
  if (now - record.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now });
  } else {
    attempts.set(key, { count: record.count + 1, firstAt: record.firstAt });
  }
}

export async function POST(req) {
  const key = getClientKey(req);

  if (isRateLimited(key)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const ok = await verifyPassword(password);
    trackAttempt(key, ok);

    if (!ok) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = await createSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_CONFIG.name, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: SESSION_CONFIG.maxAge,
      path: '/',
    });
    return response;
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
