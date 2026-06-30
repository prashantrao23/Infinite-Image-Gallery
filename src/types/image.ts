export interface ImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Image {
  id: string;
  alt_description: string | null;
  width: number;
  height: number;
  color: string;
  urls: ImageUrls;
  user: User;
}

