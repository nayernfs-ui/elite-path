import { NextResponse } from 'next/server';
import { getContent, setContent } from '@/lib/db';
import { verifySession, SESSION_CONFIG } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function POST(req) {
  // Only authenticated admin can save
  const token = req.cookies.get(SESSION_CONFIG.name)?.value;
  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const content = await req.json();
    await setContent(content);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Save error:', e);
    return NextResponse.json({ error: e.message || 'Failed to save' }, { status: 500 });
  }
}
