import type { DownloadLink, Song } from '$lib/types/song';
import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export default class Songs {
  constructor(private supabase: SupabaseClient<Database>) {}

  //#region PUBLIC
  /**
   * Retrieves a list of songs from the Supabase database.
   *
   * @return {Promise<Song[] | undefined>} A promise that resolves to an array of Song objects or undefined.
   */
  async getSongs(): Promise<Song[] | undefined> {
    /** SONGS */
    const { data: tracks } = await this.supabase
      .from('releases')
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
      .from('releases')
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

  /**
   * Inserts a new song into the 'releases' table in the Supabase database.
   *
   * @param {Song} song - The song object containing the details of the song to be inserted.
   * @throws {PostgrestError} - If there is an error inserting the song into the database.
   */
  async postSong(song: Song, update: boolean = false) {
    const insertObj = {
      id: update ? song.id : undefined,
      permalink: song.permalink,
      artists: song.artists,
      title: song.title,
      genre: song.genre,
      release_date: song.releaseDate.toISOString(),
      label: song.label,
      tempo: song.tempo,
      art_url: song.artUrl,
      type: song.type,
      key: song.key,
    };

    let id = song.id;
    if (!update) {
      const { data, error } = await this.supabase
        .from('releases')
        .insert(insertObj)
        .select()
        .single();

      if (error) {
        throw error;
      }

      id = data.id;
    } else {
      if (id == 0) {
        throw new Error('Song id cannot be 0 when updating.');
      }

      const { error } = await this.supabase
        .from('releases')
        .update(insertObj)
        .eq('id', song.id)
        .select()
        .single();

      if (error) {
        throw error;
      }
    }

    await this.postStreamLinks(id, update, song.streamLinks);
    await this.postDownloadLinks(id, update, song.downloadLinks);
  }

  async deleteSong(permalink: string) {
    await this.supabase.from('releases').delete().eq('permalink', permalink);
  }
  //#endregion

  //#region PRIVATE
  private async postStreamLinks(id: number, update: boolean, streamLinks: string[]) {
    // Clear existing stream links
    if (update) {
      const { error } = await this.supabase
        .from('release_links')
        .delete()
        .match({ release_id: id });
      if (error) throw error;
    }

    type streamLinkDb = Database['public']['Tables']['release_links']['Insert'];
    const mappedStreamLinks: streamLinkDb[] = streamLinks.map((link) => {
      return {
        release_id: id,
        url: link,
      };
    });
    const { error } = await this.supabase.from('release_links').insert(mappedStreamLinks);
    if (error) throw error;
  }

  private async postDownloadLinks(id: number, update: boolean, downloadLinks: DownloadLink[]) {
    // Clear existing download links
    if (update) {
      const { error } = await this.supabase
        .from('release_downloads')
        .delete()
        .match({ release_id: id });
      if (error) throw error;
    }

    // unlike stream links, download links can be empty
    if (downloadLinks.length === 0) return;

    type downloadLinkDb = Database['public']['Tables']['release_downloads']['Insert'];
    const mappedDownloadLinks: downloadLinkDb[] = downloadLinks.map((link) => {
      return {
        release_id: id,
        ...link,
      };
    });
    const { error } = await this.supabase.from('release_downloads').insert(mappedDownloadLinks);
    if (error) throw error;
  }
  //#endregion
}

const songQuery = `
  id,
  permalink,
  artists,
  title,
  description,
  stream_links:release_links(url),
  download_links:release_downloads(url, edit, format),
  genre,
  release_date,
  label,
  tempo,
  art_url,
  type,
  key
`;
