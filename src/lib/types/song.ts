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
 * Song download link
 */
export type DownloadLink = Song['downloadLinks'][0];
