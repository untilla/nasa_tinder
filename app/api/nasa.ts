import { AxiosResponse } from 'axios';
import { callAPI } from '../lib/axios';
import { API_KEY } from '../constants/globals';

export const fetchPhotoData = (page: number = 1): Promise<AxiosResponse> =>
  callAPI.get(`?sol=1000&page=${page}&api_key=${API_KEY}`);
