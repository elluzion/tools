import type { Api as ApiType } from '$api';
import { PUBLIC_TOOLS_API_URL as API_URL, PUBLIC_TOOLS_API_URL } from '$env/static/public';
import { treaty } from '@elysiajs/eden';

export const Api = treaty<ApiType>(API_URL);
export const ApiUrl = PUBLIC_TOOLS_API_URL.endsWith('/')
  ? PUBLIC_TOOLS_API_URL.slice(0, -1)
  : PUBLIC_TOOLS_API_URL;
