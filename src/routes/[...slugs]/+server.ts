import api from '$lib/api';

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => api.handle(request);
export const POST: RequestHandler = ({ request }) => api.handle(request);
