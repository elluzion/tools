export const Platforms: Platform[] = [
  {
    id: 'amazon-music',
    name: 'Amazon Music',
    color: '#FF9900',
    brightColor: true,
    linkIncludes: 'amazon',
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    color: '#ffffff',
    brightColor: true,
    linkIncludes: 'apple',
  },
  {
    id: 'deezer',
    name: 'Deezer',
    color: '#A238FF',
    brightColor: false,
    linkIncludes: 'deezer',
  },
  {
    id: 'discord',
    name: 'Discord',
    color: '#5865F2',
    brightColor: false,
    linkIncludes: 'discord',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    brightColor: false,
    linkIncludes: 'instagram',
  },
  {
    id: 'pandora',
    name: 'Pandora',
    color: '#fb4dc1',
    brightColor: false,
    linkIncludes: 'pandora',
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    color: '#ff5500',
    brightColor: false,
    linkIncludes: 'soundcloud',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    color: '#1DB954',
    brightColor: false,
    linkIncludes: 'spotify',
  },
  {
    id: 'tidal',
    name: 'TIDAL',
    color: '#ffffff',
    brightColor: true,
    linkIncludes: 'tidal',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    brightColor: false,
    linkIncludes: 'youtu',
  },
];

/**
 * Resolves a platform based on the given query.
 *
 * @param {string} query - The query to resolve the platform. If it is a URL, it will search for a platform that includes the query in its linkIncludes property. Otherwise, it will search for a platform with an id matching the query.
 * @return {Platform} The resolved platform.
 * @throws {Error} If no platform is found.
 */
export function resolvePlatform(query: string): Platform {
  if (query.startsWith('https://')) {
    return Platforms.find((x) => query.includes(x.linkIncludes))!;
  } else {
    return Platforms.find((p) => p.id === query)!;
  }
}

export type Platform = {
  id: string;
  name: string;
  color: string;
  brightColor: boolean;
  linkIncludes: string;
};
