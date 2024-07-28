import {
  SECRET_GOOGLE_API_KEY,
  SECRET_GOOGLE_SEARCH_ENGINE_ID,
  SECRET_SPOTIFY_CLIENT_ID,
  SECRET_SPOTIFY_CLIENT_SECRET,
} from '$env/static/private';
import { customsearch } from '@googleapis/customsearch';
import { youtube } from '@googleapis/youtube';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Soundcloud } from 'soundcloud.ts';
import { downloadFromSoundcloud, importFromSoundcloud, parseQuery } from './helpers';

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

  public importFromSoundcloud = async (url: string) => {
    return await importFromSoundcloud(this.soundcloudApi, url);
  };

  public downloadFromSoundcloud = async (url: string) => {
    return await downloadFromSoundcloud(this.soundcloudApi, url);
  };
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
      const item = data.items.find((item) => item.title?.includes(parseQuery(searchQuery).title));
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
