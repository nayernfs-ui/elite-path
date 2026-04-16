import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession, SESSION_CONFIG } from '@/lib/auth';
import { getContent } from '@/lib/db';
import AdminEditor from '@/components/AdminEditor';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const token = cookies().get(SESSION_CONFIG.name)?.value;
  const session = await verifySession(token);
  if (!session) redirect('/admin/login');

  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
