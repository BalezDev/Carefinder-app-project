import { Hospital } from "../../typings/Hospital";

const hospitalInfo : Hospital[] = [
  {
    id: "01",
    hospitalName: " Paelon Memorial Clinic ",
    address: "9, Ajao Road Off Adeniyi Jones, Ikeja, Lagos.",
    location: "lagos",
    shortDesc: "Clinic",
    description:
      "A top rated hospital we recommend for your go-to healthcare needs! Assures a prompt service and welcoming atmosphere.",
    reviews: [
      {
        userName: "John Doe",
        rating: 4.8,
        text: "I was so pleased with the service I received from this hospital. Very impressed with the quality of the service I received",
      },

      {
        userName: "Jane Smith",
        rating: 4.8,
        text: "I was so pleased with the service I received from this hospital. Very impressed with the quality of the service I received",
      },
    ],
    avgRating: 4.7,
  },
];

export default hospitalInfo;
