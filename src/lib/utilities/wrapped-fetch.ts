/**
 * Wraps the fetch function to handle successful responses only.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit | undefined} init - Optional request initialization options.
 * @return A promise that resolves to the parsed JSON response, if the request succeeded.
 */
export async function wrappedFetch(url: string, init?: RequestInit) {
  return await fetch(url, init)
    .then((res) => status(res))
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
}

function status(res: Response) {
  if (!res.ok) {
    return Promise.reject();
  }
  return res;
}
