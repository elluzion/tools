import type { SoundcloudImportItem } from '$lib/server/song-services/types';

/**
 * The expected response from the API call.
 * The release date is returned as a string.
 */
export type Result = Omit<SoundcloudImportItem, 'releaseDate'> & { releaseDate: string };
