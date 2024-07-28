import { downloadFromSoundcloud, importFromSoundcloud } from '$lib/api/lib/soundcloud';
import Elysia, { error, t } from 'elysia';
import { SoundcloudSong } from '../types/soundcloud';

export const SoundcloudController = (app: Elysia) =>
  app.group('/soundcloud', (app) =>
    app
      .get(
        '/import',
        async ({ query: { url } }) => {
          // Check if URL is provided
          if (!url) {
            return error(400, 'No URL provided');
          }

          // Validate URL
          if (
            !url.startsWith('https://soundcloud.com') &&
            !url.startsWith('https://on.soundcloud.com')
          ) {
            return error(404, `"${url}" is not a soundcloud URL.`);
          }

          const data = await importFromSoundcloud(url);
          return data || error(404, 'Song not found');
        },
        {
          query: t.Object({
            url: t.String(),
          }),
          detail: { description: 'Returns a Song from a provided URL.' },
          response: {
            200: SoundcloudSong,
            400: t.String(),
            404: t.String(),
            500: t.String(),
          },
        },
      )
      .get(
        '/download',
        async ({ query: { url } }) => {
          // Check if URL is provided
          if (!url) {
            return error(400, 'No URL provided');
          }

          // Validate URL
          if (
            !url.startsWith('https://soundcloud.com') &&
            !url.startsWith('https://on.soundcloud.com')
          ) {
            return error(404, `"${url}" is not a soundcloud URL.`);
          }

          const file = await downloadFromSoundcloud(url);
          return file || error(500, 'Error downloading song');
        },
        {
          query: t.Object({
            url: t.String(),
          }),
          detail: { description: 'Returns a Song from a provided URL as an audio file.' },
          response: {
            200: t.File(),
            400: t.String(),
            404: t.String(),
            500: t.String(),
          },
        },
      ),
  );
