import type { SoundcloudImportItem } from '$lib/api/songs/types';

/**
 * /songs/soundcloud-import
 */
export type APISoundcloudImportResult = Omit<SoundcloudImportItem, 'releaseDate'> & {
  releaseDate: string;
};
