import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { db } }) => {
  const song = await db.songs.getSong(params.permalink);

  if (!song) {
    redirect(303, '/');
  }
  return { song };
};
