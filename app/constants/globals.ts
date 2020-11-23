import { Dimensions } from 'react-native';

export const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width);
export const SCREEN_HEIGHT: number = Math.round(Dimensions.get('window').height);
export const API_ENDPOINT: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
export const API_KEY: string = 'FcEV6H4kVds7r7GYAH4C0wPtYzmIP66c3FWFgMDa';
