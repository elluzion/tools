import type { SoundcloudImportItem } from '$lib/api/songs/song-services/types';

/**
 * /songs/get-stream-links
 */
export type APIGetStreamLinksResult = {
  links: string[];
  failed: string[];
};

/**
 * /songs/soundcloud-import
 */
export type APISoundcloudImportResult = Omit<SoundcloudImportItem, 'releaseDate'> & {
  releaseDate: string;
};
