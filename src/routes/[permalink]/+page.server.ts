import { getSong } from '$lib/server/songs.js';

export const load = async ({ params }) => {
  const song = await getSong(params.permalink);
  return { song };
};
