/**
 * Song object
 */
export type Song = {
  id: number;
  permalink: string;
  title: string;
  genre: string;
  releaseDate: Date;
  label?: string;
  tempo?: number;
  artUrl: string;
  type: string;
  key?: string;
  artists: string[];
  streamLinks: string[];
  downloadLinks: {
    url: string;
    edit: string;
    format: 'mp3' | 'wav';
  }[];
};

/**
 * Song stream link
 */
export type StreamLink = Song['streamLinks'][0];

/**
 * Song download link
 */
export type DownloadLink = Song['downloadLinks'][0];
