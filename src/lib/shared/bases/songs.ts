import type { Song } from '$lib/types/song';
import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export default class Songs {
  constructor(private supabase: SupabaseClient<Database>) {}

  /**
   * Retrieves a list of songs from the Supabase database.
   *
   * @return {Promise<Song[] | undefined>} A promise that resolves to an array of Song objects or undefined.
   */
  async getSongs(): Promise<Song[] | undefined> {
    /** SONGS */
    const { data: tracks } = await this.supabase
      .from('releases_v2')
      .select(songQuery)
      .order('release_date', { ascending: false });
    const songs = tracks?.map((track) => {
      return {
        id: track.id,
        permalink: track.permalink,
        title: track.title,
        genre: track.genre,
        releaseDate: new Date(track.release_date),
        artUrl: track.art_url,
        type: track.type,
        artists: track.artists,
        streamLinks: track.stream_links.map((link) => link.url) || [],
        downloadLinks: track.download_links || [],
      } as Song;
    });

    return songs;
  }

  async getSong(permalink: string): Promise<Song | undefined> {
    const { data: track } = await this.supabase
      .from('releases_v2')
      .select(songQuery)
      .eq('permalink', permalink)
      .single();

    if (track) {
      const song: Song = {
        id: track.id,
        permalink: track.permalink,
        title: track.title,
        genre: track.genre,
        releaseDate: new Date(track.release_date),
        label: track.label || undefined,
        tempo: track.tempo || undefined,
        artUrl: track.art_url,
        type: track.type,
        key: track.key || undefined,
        artists: track.artists,
        streamLinks: track.stream_links.map((link) => link.url) || [],
        downloadLinks: track.download_links || [],
      };
      return song;
    }
  }
}

const songQuery = `
  id,
  permalink,
  artists,
  title,
  description,
  stream_links:release_links_v2(url),
  download_links:release_downloads_v2(url, edit, format),
  genre,
  release_date,
  label,
  tempo,
  art_url,
  type,
  key
`;
