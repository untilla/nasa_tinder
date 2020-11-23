import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from '../constants/globals';

export const callAPI: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
    },
  },
});
