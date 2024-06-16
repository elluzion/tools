import { APIError, APIErrorResponse } from '$lib/api/error';
import SongServices, { type SupportedServicesType } from '$lib/api/songs/song-services';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const json = await request.json();
    const platforms = json.platforms as SupportedServicesType[];
    const query = json.query as string;

    if (!platforms || !query || !(platforms.length > 0)) {
      throw new APIError(500, 'Missing query or platforms');
    }

    const songServices = new SongServices();
    const links = await songServices.get(query, platforms);

    return new Response(JSON.stringify(links), { status: 200 });
  } catch (e) {
    return APIErrorResponse(e);
  }
};
