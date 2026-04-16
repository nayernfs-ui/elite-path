// Database helper — uses Vercel KV if available, otherwise falls back to default content
import { defaultContent } from './defaultContent';

let kv = null;
try {
  // Only import KV if the environment variables are present
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    kv = require('@vercel/kv').kv;
  }
} catch (e) {
  console.warn('Vercel KV not available, using default content', e.message);
}

const CONTENT_KEY = 'elite-path:content';

export async function getContent() {
  if (!kv) return defaultContent;
  try {
    const stored = await kv.get(CONTENT_KEY);
    if (!stored) return defaultContent;
    // Merge stored content with defaults (so new fields we add later work)
    return { ...defaultContent, ...stored };
  } catch (e) {
    console.error('Failed to fetch content from KV:', e);
    return defaultContent;
  }
}

export async function setContent(content) {
  if (!kv) {
    throw new Error('Vercel KV is not configured. Content cannot be saved.');
  }
  await kv.set(CONTENT_KEY, content);
  return content;
}
