// pages/HospitalInfo.tsx
import { Hospital } from "../../typings/Hospital";
import { useState, useEffect } from 'react';
import axios from 'axios';

// Function to transform hospital data
function hospitalTransform(hospital: any): Hospital {
  return {
    id: String(hospital.id), // Convert id to a string
    hospitalName: cleanData(hospital.name) ?? '',
    location: cleanData(hospital.location) ?? '',
    address: cleanData(hospital.address) ?? '',
    shortDesc: cleanData(hospital.shortDesc) ?? '',
    description: cleanData(hospital.description) ?? '',
    reviews: Array.isArray(hospital.reviews) ? hospital.reviews.map((review: any) => ({
      userName: cleanData(review.userName) ?? '',
      rating: review.rating ?? 0,
      text: cleanData(review.text) ?? '',
    })) : [],
    avgRating: hospital.avgRating ?? 0,
  };
}

// Function to clean data
function cleanData(data: any): string {
  return (data ?? '').toLowerCase(); // Default to empty string if data is null or undefined
}

// Component to display list of hospitals
const HospitalInfo: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.reliancehmo.com/v3/providers'); // Replace with your actual API endpoint

        // Assuming the data is an array of hospitals
        const transformedData = Array.isArray(response.data) ? response.data.map((hospital: any) => hospitalTransform(hospital)) : [];
        setHospitals(transformedData);
      } catch (error) {
        setError('Failed to fetch hospital data');
        console.error(error); // Log the actual error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Hospital List</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            <h2>{hospital.hospitalName}</h2>
            <p>{hospital.address}</p>
            <p>{hospital.location}</p>
            <p>{hospital.shortDesc}</p>
            <p>{hospital.description}</p>
            <p>Average Rating: {hospital.avgRating}</p>
            <ul>
              {hospital.reviews?.map((review, index) => (
                <li key={index}>
                  <strong>{review.userName}</strong> (Rating: {review.rating})
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalInfo;





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



