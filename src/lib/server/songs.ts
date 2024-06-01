import { supabase } from '$lib/server/supabase';
import type { Song } from '$lib/types/song';

/**
 * Retrieves a list of songs from the Supabase database.
 *
 * @return {Promise<Song[] | undefined>} A promise that resolves to an array of Song objects or undefined.
 */
async function getSongs(): Promise<Song[] | undefined> {
  /** SONGS */
  const { data: tracks } = await supabase
    .from('releases_v2')
    .select(
      `
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
      `,
    )
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

async function getSong(permalink: string): Promise<Song | undefined> {
  const { data: track } = await supabase
    .from('releases_v2')
    .select(
      `
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
    `,
    )
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

export { getSong, getSongs };
