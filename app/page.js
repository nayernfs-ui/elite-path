import { getContent } from '@/lib/db';
import SiteView from '@/components/SiteView';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getContent();
  return <SiteView content={content} />;
}
