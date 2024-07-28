import fs from 'node:fs';
import { Soundcloud } from 'soundcloud.ts';
import type { SoundcloudSong } from '../types/soundcloud';
import { parseQuery } from './utils';

/**
 * Imports a song from Soundcloud based on the provided URL.
 *
 * @param {string} url - The URL of the Soundcloud track.
 * @return {Promise<SoundcloudSong>} The parsed data of the imported song.
 * @throws {Error}
 */
export async function importFromSoundcloud(url: string) {
  try {
    const soundcloud = new Soundcloud();
    const track = await soundcloud.tracks.getV2(url);

    const { title, artists, type } = parseQuery(track.title);
    const releaseDate = new Date(track.release_date || track.display_date);
    const labelName = track.label_name || track.user.username;

    if (artists.length == 0) {
      artists.push(track.user.username);
    }

    const data: SoundcloudSong = {
      url: url,
      artists: artists,
      title: title,
      permalink: track.permalink,
      releaseDate: releaseDate,
      label: labelName,
      artUrl: track.artwork_url || track.user.avatar_url,
      genre: track.genre,
      type: type,
    };

    return data;
  } catch (e) {
    return undefined;
  }
}

export async function downloadFromSoundcloud(url: string) {
  const soundcloud = new Soundcloud();
  const tempId = Math.random().toString(36).substring(2, 10);

  try {
    let filePath = `temp/tracks/${tempId}`;
    filePath = await soundcloud.util.downloadTrack(url, filePath);

    // Read the downloaded audio file as a buffer
    const file = fs.readFileSync(filePath);

    // Delete the temporary file
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(filePath + ' was deleted');
    });

    return new File([file], 'audio.mp3');
  } catch (e) {
    return undefined;
  }
}
