export const load = async ({ locals: { db } }) => {
  const songs = await db.songs.getSongs();
  const socialLinks = await db.socials.getSocialLinks();
  return {
    songs,
    socialLinks,
  };
};
