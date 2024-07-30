import type { Api as ApiType } from '$api';
import { PUBLIC_TOOLS_API_URL as API_URL } from '$env/static/public';
import { treaty } from '@elysiajs/eden';

export const Api = treaty<ApiType>(API_URL);
