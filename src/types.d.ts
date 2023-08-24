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
  name: string;
  description: string;
}

export interface IRoomOwner {
  username: string;
  name: string;
  avatar: string;
}

export interface ICategory {
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
  owner: IRoomOwner;
  category: ICategory;
  is_on_wishlist: boolean;
  created_at: string;
  updated_at: string;
}
