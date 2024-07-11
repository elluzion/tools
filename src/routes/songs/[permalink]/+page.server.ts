import type { PostgrestError } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { songFormSchema } from '../_lib/song-form';
import type { PageServerLoad } from './$types';

/** Asynchronously load the form validator and the form based on the schema */
export const load = (async ({ params, locals: { db } }) => {
  const song = await db.songs.getSong(params.permalink);

  if (!song) {
    redirect(303, '/');
  }

  return {
    song: song,
    form: await superValidate(zod(songFormSchema)),
    formSubmitResult: null,
  };
}) satisfies PageServerLoad;

export const actions = {
  update: async ({ request, locals: { db } }) => {
    const form = await superValidate(request, zod(songFormSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await db.songs.postSong(form.data, true);
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

  delete: async ({ params, locals: { db } }) => {
    await db.songs.deleteSong(params.permalink);
    redirect(303, '/');
  },
};
