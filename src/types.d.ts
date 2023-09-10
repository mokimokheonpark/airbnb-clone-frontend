export interface IPhoto {
  pk: number;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

export interface IAmenity {
  pk: number;
  name: string;
  description: string;
}

export interface IOwner {
  username: string;
  name: string;
  avatar: string;
}

export interface ICategory {
  pk: number;
  name: string;
  category_kind: string;
}

export interface IRoomDetail extends IRoomList {
  address: string;
  room_kind: string;
  rooms: number;
  toilets: number;
  pet_friendly: boolean;
  description: string;
  amenities: IAmenity[];
  owner: IOwner;
  category: ICategory;
  is_on_wishlist: boolean;
  created_at: string;
  updated_at: string;
}

export interface IReview {
  user: IOwner;
  review: string;
  rating: number;
}

export interface IPublicUser extends IOwner {
  photo: string;
  email: string;
  is_host: boolean;
  date_joined: string;
}

export interface IPrivateUser extends IPublicUser {
  gender: string;
  language: string;
  currency: string;
  last_login: string;
}
