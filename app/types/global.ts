export interface INasaPhotoCamera {
  id: number,
  name: string,
  rover_id: number,
  full_name: string,
}

export interface INasaPhotoRover {
  id: number,
  name: string,
  landing_date: string,
  launch_date: string,
  status: string,
}

export interface INasaPhoto {
  id: number,
  sol: number,
  camera: INasaPhotoCamera,
  img_src: string,
  earth_date: string,
  rover: INasaPhotoRover,
}
