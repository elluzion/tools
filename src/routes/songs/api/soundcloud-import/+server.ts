import SongServices from '$lib/server/song-services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const url = (await request.json()).url as string;

  try {
    if (!url) {
      throw new Error();
    }

    const songServices = new SongServices();
    const data = await songServices.importFromSoundcloud(url);

    if (data) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      throw new Error();
    }
  } catch (e) {
    return new Response('Failed importing song from Soundcloud', { status: 500 });
  }
};
