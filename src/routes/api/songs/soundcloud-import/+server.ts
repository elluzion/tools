import { APIError, APIErrorResponse } from '$lib/api/error';
import { importFromSoundcloud } from '$lib/api/songs';
import Soundcloud from 'soundcloud.ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  let url = (await request.json()).url as string;

  try {
    if (!url) {
      throw new APIError(500, 'No URL provided');
    }

    if (!url.startsWith('https://') || !url.includes('soundcloud.com')) {
      throw new APIError(500, 'The provided URL has to be a Soundcloud link');
    }

    // If the URL is a shortened URL, fetch the full URL
    if (url.startsWith('https://on.soundcloud.com/')) {
      const r = await fetch(url);
      if (!r.ok || !r.url) {
        throw new APIError(r.status, 'Error while resolving shortlink', url);
      }

      url = r.url;
    }

    try {
      // Fetch and return object from Soundcloud
      const soundcloud = new Soundcloud();
      const data = await importFromSoundcloud(soundcloud, url);
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (_e) {
      throw new APIError(500, 'Song not found', url);
    }
  } catch (e) {
    return APIErrorResponse(e);
  }
};
