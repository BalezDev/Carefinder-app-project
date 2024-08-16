import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hospital } from "../../typings/Hospital"; // Ensure this type matches the API response

const API_URL = "https://api.reliancehmo.com/v3/providers";

interface HospitalInfoProps {
  onHospitalsFetched?: (hospitals: Hospital[]) => void;
}

const HospitalInfo: React.FC<HospitalInfoProps> = ({ onHospitalsFetched }) => {
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<{ data: Hospital[] }>(API_URL);

        // Ensure response.data.data is an array before processing
        if (response.data && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((hospital) => ({
            id: hospital.id,
            name: hospital.name,
            address: hospital.address,
            location: hospital.location ?? "Unknown Location", // Handle null case
            shortDesc: "Short description here", // Replace this with actual data if available
            description: "Full description here", // Replace this with actual data if available
            reviews: hospital.reviews ?? [], // Handle reviews, defaulting to an empty array if null
            avgRating: hospital.reviews && hospital.reviews.length > 0
              ? hospital.reviews.reduce((acc, review) => acc + (review.rating ?? 0), 0) / hospital.reviews.length
              : 0, // Calculate avgRating if reviews exist, else default to 0
            tier_id: hospital.tier_id ?? 0,
            type_id: hospital.type_id ?? 0,
            phone_number: hospital.phone_number ?? "N/A",
            state: hospital.state || { id: 0, name: "Unknown State" }, // Handle missing state
            type: hospital.type || { id: 0, name: "Unknown Type" }, // Handle missing type
            products: hospital.products ?? [], // Handle missing products
          }));

          setHospitalData(formattedData);

          // Call onHospitalsFetched callback if passed
          if (onHospitalsFetched) {
            onHospitalsFetched(formattedData);
          }
        } else {
          throw new Error("Unexpected API response format. Data is not an array.");
        }
      } catch (err) {
        // Ensure error is an instance of Error
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [onHospitalsFetched]);

  // Conditional rendering based on loading, error, and data
  if (loading) {
    return <p>Loading hospitals...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (hospitalData.length === 0) {
    return <p>No hospitals found.</p>;
  }

  return (
    <div>
      {hospitalData.map((hospital) => (
        <div key={hospital.id}>
          <h3>{hospital.name}</h3>
          <p>{hospital.location}</p>
          <p>{hospital.address}</p>
          <p>{hospital.phone_number}</p>
          {/* Additional hospital details */}
        </div>
      ))}
    </div>
  );
};

export default HospitalInfo;



// import { Hospital } from '../../typings/Hospital'; // Adjust the path as needed



// const hospitalInfo : Hospital[] = [
//   {
//     id: "01",
//     hospitalName: " Paelon Memorial Clinic ",
//     address: "9, Ajao Road Off Adeniyi Jones, Ikeja, Lagos.",
//     location: "lagos",
//     shortDesc: "Clinic",
//     description:
//       "A top rated hospital we recommend for your go-to healthcare needs! Assures a prompt service and welcoming atmosphere.",
//     reviews: [
//       {
//         userName: "John Doe",
//         rating: 4.8,
//         text: "I was so pleased with the service I received from this hospital. Very impressed with the quality of the service I received",
//       },

//       {
//         userName: "Jane Smith",
//         rating: 4.8,
//         text: "I was so pleased with the service I received from this hospital. Very impressed with the quality of the service I received",
//       },
//     ],
//     avgRating: 4.7,
//   },
// ];

// export default hospitalInfo;



