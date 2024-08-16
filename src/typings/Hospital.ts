export interface Review {
    userName: string;
    text: string;
    rating: number | null;
}

export interface Hospital {
  id: string | number;
  name: string;
  address: string;
  location: string | null; // Adjust based on actual API response
  shortDesc: string;
  description: string;
  reviews: Review[];
  avgRating: number;
  tier_id: number;
  type_id: number;
  phone_number: string;
  state: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    name: string;
  };
  products: string[];
}
