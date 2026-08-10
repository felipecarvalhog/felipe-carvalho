import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { AssetRef } from '@/config/types';

/**
 * Server-side existence check for files under `public/`.
 *
 * The brand files are produced by a separate pipeline and may not be on disk
 * yet. Rather than shipping a broken <img>, callers fall back to the
 * accessible text lockup.
 */
export const publicFileExists = (src: string): boolean => {
  if (!src.startsWith('/')) return false;
  // Reject traversal before touching the filesystem.
  if (src.includes('..')) return false;
  return existsSync(join(process.cwd(), 'public', src.slice(1)));
};

export const resolveAsset = (asset: AssetRef | undefined): AssetRef | null => {
  if (!asset) return null;
  return publicFileExists(asset.src) ? asset : null;
};
