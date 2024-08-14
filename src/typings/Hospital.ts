// export interface Review {
//     userName: string;   // userName should be a string
//     text: string;
//     rating: number | null;
// }

// export interface Hospital {
//     id: string | number; // Allow both string and number
//     hospitalName: string;
//     address: string;
//     location: string;
//     shortDesc?: string;
//     description?: string;
//     reviews?: Review[];  // Use the Review interface for the reviews array
//     avgRating?: number;
// }


export interface Review {
    userName: string;
    rating: number;
    text: string;
  }
  
  export interface Hospital {
    id: string | number;
    hospitalName: string | null;
    location: string | null;
    address: string | null;
    shortDesc: string | null;
    description: string | null;
    reviews: Review[];
    avgRating: number;
  }
  
  