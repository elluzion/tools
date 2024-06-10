import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export default class Socials {
  constructor(private supabase: SupabaseClient<Database>) {}

  /**
   * Retrieves the social links from the database.
   *
   * @return A promise that resolves to an array of social link objects.
   */
  async getSocialLinks() {
    const { data: socialLinks } = await this.supabase.from('social_links').select('*');
    return socialLinks;
  }
}
