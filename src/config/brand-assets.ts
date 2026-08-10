import manifest from '../../public/brand/manifest.json';
import type { AssetRef } from './types';

/**
 * `public/brand/manifest.json` is owned by the assets pipeline and can be
 * overwritten at any time, so it is read defensively: unknown or missing keys
 * degrade to the accessible text lockup instead of breaking the build.
 */
export const brandAssetKeys = [
  'logoHorizontalColor',
  'logoVerticalColor',
  'logoHorizontalWhite',
  'logoHorizontalNegative',
  'symbol',
  'favicon',
] as const;

export type BrandAssetKey = (typeof brandAssetKeys)[number];

const isAssetRef = (value: unknown): value is AssetRef => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.src === 'string' &&
    typeof candidate.width === 'number' &&
    typeof candidate.height === 'number'
  );
};

const rawManifest = manifest as Record<string, unknown>;

export const brandAssets: Partial<Record<BrandAssetKey, AssetRef>> =
  Object.fromEntries(
    brandAssetKeys
      .map((key) => [key, rawManifest[key]] as const)
      .filter((entry): entry is readonly [BrandAssetKey, AssetRef] =>
        isAssetRef(entry[1]),
      ),
  );

export const getBrandAsset = (key: BrandAssetKey): AssetRef | undefined =>
  brandAssets[key];
