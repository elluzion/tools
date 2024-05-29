import { supabase } from '$lib/server/supabase';
import type { Song } from '$lib/types/song.js';

export const load = async () => {
  /** SONGS */
  const { data: tracks } = await supabase
    .from('releases_v2')
    .select('*')
    .order('release_date', { ascending: false });
  const { data: streamLinks } = await supabase.from('release_links_v2').select('*');
  const { data: downloadLinks } = await supabase.from('release_downloads_v2').select('*');

  const songs = tracks?.map((track) => {
    const streamLinksForTrack = streamLinks?.filter((link) => link.release_id === track.id);
    const downloadLinksForTrack = downloadLinks?.filter((link) => link.release_id === track.id);

    return {
      id: track.id,
      permalink: track.permalink,
      title: track.title,
      genre: track.genre,
      releaseDate: new Date(track.release_date),
      artUrl: track.art_url,
      type: track.type,
      artists: track.artists,
      streamLinks: streamLinksForTrack?.map((link) => link.url) || [],
      downloadLinks: downloadLinksForTrack || [],
    } as Song;
  });

  /** SOCIAL LINKS */
  const { data: socialLinks } = await supabase.from('social_links').select('*');
  return {
    songs,
    socialLinks,
  };
};
