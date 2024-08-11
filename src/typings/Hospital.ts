export interface Review {
    userName: string;
    text: string;
    rating: number | null;
}

export interface Hospital {
    id: string | number; // Allow both string and number
    hospitalName: string;
    address: string;
    location: string;
    shortDesc?: string;
    description?: string;
    reviews?: {
      userName: ReactNode; rating: number; text: string 
}[]; // Example structure
    avgRating?: number;
  }
