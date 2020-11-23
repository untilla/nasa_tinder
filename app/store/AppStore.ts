import { observable, action, computed } from 'mobx';
import { fetchPhotoData } from '../api/nasa';
import { INasaPhoto } from '../types/global';
import { __photoData } from '../mocks/photoData';

export default class AppStore {
  @observable loadingCount: number = 0;
  @observable photoCards: INasaPhoto[] = [];

  private page: number = 1;

  @computed get isLoading(): boolean {
    return Boolean(this.loadingCount);
  }

  @action('Fetch photos')
  fetchPhotos = async (): Promise<void> => {
    this.loadingCount++;
    try {
      const res = await fetchPhotoData(this.page);
      this.photoCards = res.data.photos.slice(0, 3);
      this.page++;
    }
    catch (e) {
      this.photoCards = [...__photoData.slice(0, 3)];
      console.warn(e);
    }
    this.loadingCount--;
  }
}
