import type { Song } from '$lib/types/song.js';
import Formatter from '$lib/utilities/formatter';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { db } }) => {
  const song = await db.songs.getSong(params.permalink);

  if (!song) {
    redirect(303, '/');
  }

  const metadata = genMetadata(song);

  return { song, metadata };
};

function genMetadata(song: Song) {
  const fallbackImageUrl = 'https://i1.sndcdn.com/avatars-Sen1bkxTWtJUDjut-zCRlvQ-t500x500.jpg';

  // generate description
  // "<songname (is a <genre> track that) released on <date> (via <label>)."
  const description = `${song.title} ${
    song.genre ? `is a ${song.genre} track that ` : ''
  }released on ${Formatter.formatDate(song.releaseDate, false)}${
    song.label ? ` via ${song.label}` : ''
  }.`;

  /**
   * Note: this is a hacky way of getting a larger image, since Souncloud could potentially change their API and break it
   */
  let image = song.artUrl || fallbackImageUrl;
  if (song.artUrl.includes('sndcdn.com/artworks') && song.artUrl.includes('large')) {
    image = song.artUrl.replace('large', 't500x500');
  }

  return {
    title: song.title,
    description,
    image: image,
  };
}
