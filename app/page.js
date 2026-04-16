import { getContent } from '@/lib/db';
import SiteView from '@/components/SiteView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function HomePage() {
  const content = await getContent();
  return <SiteView content={content} />;
}