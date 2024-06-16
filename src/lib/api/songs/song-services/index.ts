import {
  SECRET_GOOGLE_API_KEY,
  SECRET_GOOGLE_SEARCH_ENGINE_ID,
  SECRET_SPOTIFY_CLIENT_ID,
  SECRET_SPOTIFY_CLIENT_SECRET,
} from '$env/static/private';
import Formatter from '$lib/utilities/formatter';
import { customsearch } from '@googleapis/customsearch';
import { youtube } from '@googleapis/youtube';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Soundcloud } from 'soundcloud.ts';
import type { SoundcloudImportItem } from './types';

export default class SongServices {
  private spotifyApi;
  private soundcloudApi;
  private gCustomSearchApi;
  private YouTubeApi;

  //#region Constructor
  constructor() {
    this.spotifyApi = SpotifyApi.withClientCredentials(
      SECRET_SPOTIFY_CLIENT_ID,
      SECRET_SPOTIFY_CLIENT_SECRET,
    );
    this.soundcloudApi = new Soundcloud();
    this.gCustomSearchApi = customsearch('v1').cse;
    this.YouTubeApi = youtube('v3').search;
  }
  //#endregion

  //#region Public functions
  /**
   *
   * @param searchQuery A search query for the song, such as "Artist 1 & Artist 2 - Song Title"
   * @param platforms List of platforms to get the links for. Supported ones are {@link SupportedPlatforms}
   * @returns
   */
  async get(
    searchQuery: string,
    platforms: SupportedServicesType[],
  ): Promise<{ links: string[]; failed: string[] }> {
    const fetchedPlatforms: string[] = [];
    const failedPlatforms: string[] = [];

    for (const platform of platforms) {
      let link = null;

      try {
        switch (platform) {
          case 'apple-music':
            link = await this.getAppleMusic(searchQuery);
            break;
          case 'deezer':
            link = await this.getDeezer(searchQuery);
            break;
          case 'soundcloud':
            link = await this.getSoundcloud(searchQuery);
            break;
          case 'spotify':
            link = await this.getSpotify(searchQuery);
            break;
          case 'youtube':
            link = await this.getYoutube(searchQuery);
            break;
        }
      } catch (e) {
        console.error(e);
      }

      if (link) fetchedPlatforms.push(link);
      else failedPlatforms.push(platform);
    }

    return {
      links: fetchedPlatforms,
      failed: failedPlatforms,
    };
  }

  /**
   * Imports a song from Soundcloud based on the provided URL.
   *
   * @param {string} url - The URL of the Soundcloud track.
   * @return {Promise<SoundcloudImportItem>} The parsed data of the imported song.
   * @throws {Error}
   */
  async importFromSoundcloud(url: string) {
    const track = await this.soundcloudApi.tracks.getV2(url);

    const parsedQuery = this.parseQuery(track.title);
    const releaseDate = new Date(track.release_date || track.display_date);
    const labelName = track.label_name || track.user.username;

    const data: SoundcloudImportItem = {
      artists: parsedQuery.artists,
      title: parsedQuery.title,
      permalink: track.permalink,
      releaseDate: releaseDate,
      label: labelName,
      artUrl: track.artwork_url,
      genre: track.genre,
      type: parsedQuery.type,
    };

    return data;
  }
  //#endregion

  //#region Private functions
  private async getSoundcloud(searchQuery: string): Promise<string | undefined> {
    const search = await this.soundcloudApi.tracks.searchV2({
      q: searchQuery,
    });

    const url = search.collection[0].permalink_url;

    return url;
  }

  private async getSpotify(searchQuery: string): Promise<string | undefined> {
    const search = await this.spotifyApi.search(searchQuery, ['track'], undefined, 1);

    if (!search.tracks.items[0]) return;
    return `https://open.spotify.com/track/${search.tracks.items[0].id}`;
  }

  private async getAppleMusic(searchQuery: string): Promise<string | undefined> {
    const { data } = await this.gCustomSearchApi.list({
      q: searchQuery,
      cx: SECRET_GOOGLE_SEARCH_ENGINE_ID,
      key: SECRET_GOOGLE_API_KEY,
      siteSearch: 'music.apple.com',
      siteSearchFilter: 'i',
    });

    if (data.items && data.items.length > 0) {
      const item = data.items.find((item) =>
        item.title?.includes(this.parseQuery(searchQuery).title),
      );
      if (!item?.link) return;
      return item.link;
    }
  }

  private async getYoutube(searchQuery: string): Promise<string | undefined> {
    const { data } = await this.YouTubeApi.list({
      q: searchQuery,
      part: ['id'],
      type: ['video'],
      key: SECRET_GOOGLE_API_KEY,
    });

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      return 'https://youtube.com/watch?v=' + item.id!.videoId;
    }
  }

  private async getDeezer(searchQuery: string): Promise<string | undefined> {
    const request = await fetch(`https://api.deezer.com/search/track?q=${searchQuery}`);

    const search = await request.json();
    if (!search.data[0] || !search.data[0].link) return;
    return search.data[0].link;
  }
  //#endregion

  //#region Utilities
  /**
   *
   * @param query A song title query such as "Artist 1 , Artist 2 & Artist 3 - Song Title (feat. Artist 4) - Artist 5 Remix"
   * @returns an object with the title separated into artists and song title
   */
  private parseQuery(query: string) {
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
      artists.push(...this.artistStringToList(queryArtists));
    }

    // FEATURE ARTISTS
    if (queryFeatureArtists) {
      artists.push(...this.artistStringToList(queryFeatureArtists));
    }

    // ARTISTS FORMATTING (CAMEL CASE)
    artists = artists.map((artist) => {
      return artist
        .split(' ')
        .map((x) => Formatter.pascalCase(x))
        .join(' ');
    });

    // RELEASE TYPE
    const type = /remix|edit|vip|flip|bootleg/.test(queryTitle.toLowerCase())
      ? 'Remix'
      : 'Original';

    return {
      title: title,
      artists: artists,
      type: type,
    };
  }

  private artistStringToList(artistString: string) {
    // artists separated by comma or &
    return artistString.split(/(?:,|\s&|\sx)\s+/).map((x) => x.trim());
  }

  //#endregion
}

/*
 * Services that are supported to automatically fetch links for.
 */
export const SupportedServices = [
  'soundcloud',
  'spotify',
  'apple-music',
  'youtube',
  'deezer',
] as const;

/**
 * {@link SupportedServices} as type
 */
export type SupportedServicesType = (typeof SupportedServices)[number];
