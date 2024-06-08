export const load = async ({ params, locals: { db } }) => {
  const song = await db.songs.getSong(params.permalink);
  return { song };
};
