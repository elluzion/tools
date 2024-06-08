import Db from '$lib/shared/db';
import type { Database } from '$lib/types/supabase';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: Db;
      supabase: SupabaseClient<Database>;
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
