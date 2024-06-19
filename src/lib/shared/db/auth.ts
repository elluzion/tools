import type { Database } from '$lib/types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export default class Auth {
  constructor(private supabase: SupabaseClient<Database>) {}

  /**
   * Retrieves the user information from the Supabase authentication API.
   * @return The user information object, or undefined if the user is not authenticated.
   */
  async getUserInfo() {
    const { data } = await this.supabase.auth.getUser();
    return data?.user || undefined;
  }

  /**
   * Sign in the user using GitHub OAuth authentication.
   * @return The error object, or undefined if the sign in process is successful.
   */
  async signIn() {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin + '/login/callback',
      },
    });
    return error || undefined;
  }

  /**
   * Signs out the user by calling the `signOut` method of the `supabase.auth` object.
   * @return A promise that resolves when the sign out process is complete.
   */
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return error || undefined;
  }
}
