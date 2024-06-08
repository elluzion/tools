import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import Socials from './bases/socials';
import Songs from './bases/songs';

export default class Db {
  public songs: Songs;
  public socials: Socials;

  /**
   * Constructs a new instance of the Db class.
   *
   * @param {SupabaseClient<Database>} supabase - The Supabase client used to interact with the database.
   */
  constructor(supabase: SupabaseClient<Database>) {
    this.songs = new Songs(supabase);
    this.socials = new Socials(supabase);
  }
}
