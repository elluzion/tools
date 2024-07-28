import Formatter from '$lib/utilities/formatter';

/**
 *
 * @param query A song title query such as "Artist 1 , Artist 2 & Artist 3 - Song Title (feat. Artist 4) - Artist 5 Remix"
 * @returns an object with the title separated into artists and song title
 */
export function parseQuery(query: string) {
  // Cleanup query
  query = query
    .replace('(ft.', '(feat.') // some people use ft. as a short form, we unify it to feat.
    .replace('(w/', '(feat.') // or they use w/
    .replace('(featuring', '(feat.') // or they use featuring
    .replaceAll('[', '(') // replace [] with ()
    .replaceAll(']', ')'); // ^^

  // filter feature bracket artists from query if available
  const queryFeatureArtists = query.includes('(feat.')
    ? query.split('(feat.')[1].split(')')[0]
    : undefined;
  // remove feature bracket
  query = query.replace(`(feat.${queryFeatureArtists})`, '');

  const queryParts = query.split('-');
  const queryArtists = queryParts.length > 1 ? queryParts[0] : undefined;
  const queryTitle = queryArtists ? queryParts.slice(1).join(' ') : query;

  const title = Formatter.cleanWhitespace(queryTitle);
  let artists: string[] = [];

  // MAIN ARTISTS
  if (queryArtists) {
    artists.push(...artistStringToList(queryArtists));
  }

  // FEATURE ARTISTS
  if (queryFeatureArtists) {
    artists.push(...artistStringToList(queryFeatureArtists));
  }

  // ARTISTS FORMATTING (CAMEL CASE)
  artists = artists.map((artist) => {
    return artist
      .split(' ')
      .map((x) => Formatter.pascalCase(x))
      .join(' ');
  });

  // RELEASE TYPE
  const type = /remix|edit|vip|flip|bootleg/.test(queryTitle.toLowerCase()) ? 'Remix' : 'Original';

  return {
    title: title,
    artists: artists,
    type: type,
  };
}

export function artistStringToList(artistString: string) {
  // artists separated by comma or &
  return artistString.split(/(?:,|\s&|\sx)\s+/).map((x) => x.trim());
}
