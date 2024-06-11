import SongServices from '$lib/server/song-services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const url = (await request.json()).url as string;

  try {
    if (!url) {
      throw new Error('No URL provided');
    }

    const songServices = new SongServices();
    const data = await songServices.importFromSoundcloud(url);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(undefined, {
      status: 500,
      statusText: 'Failed to import from soundcloud',
    });
  }
};
