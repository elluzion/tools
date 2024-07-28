import { APIError, APIErrorResponse } from '$lib/api/error';
import { downloadFromSoundcloud } from '$lib/api/songs';
import Soundcloud from 'soundcloud.ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const jsonData = await request.json();
    if (!jsonData) {
      throw new APIError(500, 'No body provided');
    }
    let url = jsonData.url as string;

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
      const data = await downloadFromSoundcloud(soundcloud, url);
      return new Response(data, {
        status: 200,
        // headers: {
        //   'Content-Type': 'audio/mpeg',
        // },
      });
    } catch (_e) {
      throw new APIError(500, 'Song download link not found', url);
    }
  } catch (e) {
    return APIErrorResponse(e);
  }
};
