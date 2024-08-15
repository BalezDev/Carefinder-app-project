export interface Review {
    userName: string;   // userName should be a string
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
    reviews?: Review[];  // Use the Review interface for the reviews array
    avgRating?: number;
}