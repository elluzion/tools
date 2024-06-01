import { getSongs } from '$lib/server/songs';
import { supabase } from '$lib/server/supabase';

export const load = async () => {
  const songs = await getSongs();
  /** SOCIAL LINKS */
  const { data: socialLinks } = await supabase.from('social_links').select('*');
  return {
    songs,
    socialLinks,
  };
};
