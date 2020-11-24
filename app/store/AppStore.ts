import { observable, action, computed } from 'mobx';
import { fetchPhotoData } from '../api/nasa';
import { INasaPhoto } from '../types/global';
import { __photoData } from '../mocks/photoData';
import { Image } from 'react-native';

export default class AppStore {
  @observable loadingCount: number = 0;
  @observable photoCards: INasaPhoto[] = [];

  private page: number = 1;

  @computed get isLoading(): boolean {
    return Boolean(this.loadingCount);
  }

  @action('Fetch photos')
  fetchPhotos = async (): Promise<boolean> => {
    this.loadingCount++;
    try {
      const res = await fetchPhotoData(this.page);
      this.photoCards = res.data.photos.slice(0, 10);
      const results = await Promise.all(this.photoCards.map(card => Image.prefetch(card.img_src)));
      console.log(results);
      this.page++;
    }
    catch (e) {
      this.photoCards = [...__photoData.slice(0, 10)];
      console.warn(e);
      return false;
    }
    this.loadingCount--;
    return true;
  }
}
