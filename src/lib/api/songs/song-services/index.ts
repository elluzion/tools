import { Soundcloud } from 'soundcloud.ts';
import { downloadFromSoundcloud, importFromSoundcloud } from './helpers';

export default class SongServices {
  private soundcloudApi;
  //#region Constructor
  constructor() {
    this.soundcloudApi = new Soundcloud();
  }
  //#endregion

  //#region Public functions
  public importFromSoundcloud = async (url: string) => {
    return await importFromSoundcloud(this.soundcloudApi, url);
  };

  public downloadFromSoundcloud = async (url: string) => {
    return await downloadFromSoundcloud(this.soundcloudApi, url);
  };
  //#endregion
}
