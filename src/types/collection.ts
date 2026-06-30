export interface CollectionPreviewPhoto {
  id: string;
  width: number;
  height: number;
  color: string | null;
  urls: {
    small: string;
    regular: string;
  };
}

export interface CollectionUser {
  id: string;
  name: string;
  username: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string | null;

  total_photos: number;

  cover_photo: CollectionPreviewPhoto;

  preview_photos: CollectionPreviewPhoto[];

  user: CollectionUser;
}