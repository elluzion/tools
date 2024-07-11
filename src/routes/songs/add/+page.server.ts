import type { PostgrestError } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { songFormSchema } from '../_lib/song-form';
import type { PageServerLoad } from './$types';

/** Asynchronously load the form validator and the form based on the schema */
export const load = (async () => {
  return {
    form: await superValidate(zod(songFormSchema)),
    formSubmitResult: null,
  };
}) satisfies PageServerLoad;

export const actions = {
  add: async ({ request, locals: { db } }) => {
    const form = await superValidate(request, zod(songFormSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await db.songs.postSong(form.data);
    } catch (e) {
      const pgError = e as PostgrestError;
      // If the permalink already exists, return an error
      if (pgError.code === '23505') {
        return error(500, 'Permalink already in use');
      }
      error(500, 'Something went wrong');
    }
    return { form };
  },
};
