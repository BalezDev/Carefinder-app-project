// import React, { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col } from "reactstrap";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import Helmet from "../components/Helmet/helmet";
// import CommonSection from "../components/UI/CommonSection";
// import hospitalInfo from "../assets/data/hospitalInfo"; // Adjust import based on actual data
// import { Hospital, Review } from "../typings/Hospital"; // Adjust import path as needed
// import "../styles/product-details.css";

// const HospitalDetails: React.FC = () => {
//   const [tab, setTab] = useState<string>("desc");
//   const [rating, setRating] = useState<number | null>(null);
//   const reviewUser = useRef<HTMLInputElement>(null);
//   const reviewMsg = useRef<HTMLTextAreaElement>(null);

//   const { id } = useParams<{ id: string }>();
//   const information = hospitalInfo.find((item) => item.id === id) as
//     | Hospital
//     | undefined;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [information]);

//   if (!information) {
//     return <p>Hospital not found</p>;
//   }

//   const {
//     hospitalName,
//     location,
//     avgRating = 0, // Provide a default value if undefined
//     reviews = [],
//     description,
//     shortDesc,
//   } = information;

//   console.log('Reviews Data:', reviews);

//   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const reviewUserName = reviewUser.current?.value || "Anonymous";
//     const reviewUserMsg = reviewMsg.current?.value || "";

//     const reviewObj: Review = {
//       userName: reviewUserName,
//       text: reviewUserMsg,
//       rating,
//     };
//     console.log(reviewObj);
//     toast.success("Review sent successfully");
//   };

//   return (
//     <Helmet title={hospitalName}>
//       <CommonSection title={hospitalName} />

//       <section className="pt-0">
//         <Container>
//           <Row>
//             <Col lg="6">
//               <div className="product__details">
//                 <h2>{hospitalName}</h2>
//                 <p>{location}</p>
//                 <div className="product__rating d-flex align-items-center gap-3 mb-3">
//                   <div>
//                     {Array.from({ length: 5 }, (_, index) => (
//                       <span key={index}>
//                         {index < Math.floor(avgRating) ? (
//                           <i className="ri-star-fill"></i>
//                         ) : index < avgRating ? (
//                           <i className="ri-star-half-s-fill"></i>
//                         ) : (
//                           <i className="ri-star-line"></i>
//                         )}
//                       </span>
//                     ))}
//                   </div>
//                   <p>
//                     (<span>{avgRating}</span> ratings)
//                   </p>
//                 </div>
//                 <p className="mt-3">{shortDesc}</p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       <section>
//         <Container>
//           <Row>
//             <Col lg="12">
//               <div className="tab__wrapper d-flex align-items-center gap-5">
//                 <h6
//                   className={tab === "desc" ? "active__tab" : ""}
//                   onClick={() => setTab("desc")}
//                 >
//                   Description
//                 </h6>
//                 <h6
//                   className={tab === "rev" ? "active__tab" : ""}
//                   onClick={() => setTab("rev")}
//                 >
//                   Reviews ({reviews.length})
//                 </h6>
//               </div>

//               {tab === "desc" ? (
//                 <div className="tab__content mt-5">
//                   <p>{description}</p>
//                 </div>
//               ) : (
//                 <div className="product__review mt-5">
//                   <div className="review__wrapper">
//                     <ul>
//                       {reviews.map((item, index) => (
//                         <li key={index} className="mb-4">
//                           <h6>{item.userName}</h6>
//                           <span>{item.rating} (average rating)</span>
//                           <p>{item.text}</p>
//                         </li>
//                       ))}
//                     </ul>

//                     <div className="review__form">
//                       <form onSubmit={submitHandler}>
//                         <h4>How would you rate this hospital? </h4>
//                         <div className="form__group">
//                           <input
//                             type="text"
//                             placeholder="Enter Name"
//                             required
//                             ref={reviewUser}
//                           />
//                         </div>

//                         <div className="form__group d-flex align-items-center gap-3 rating__group">
//                           {Array.from({ length: 5 }, (_, index) => (
//                             <motion.span
//                               key={index}
//                               whileTap={{ scale: 1.2 }}
//                               onClick={() => setRating(index + 1)}
//                             >
//                               {index + 1}
//                               <i className="ri-star-fill"></i>
//                             </motion.span>
//                           ))}
//                         </div>

//                         <div className="form__group">
//                           <textarea
//                             rows={4}
//                             placeholder="Review Message..."
//                             required
//                             ref={reviewMsg}
//                           />
//                         </div>

//                         <motion.button
//                           whileTap={{ scale: 1.2 }}
//                           type="submit"
//                           className="buy__button"
//                         >
//                           Submit
//                         </motion.button>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default HospitalDetails;


import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/helmet";
import CommonSection from "../components/UI/CommonSection";
import HospitalInfo from "../assets/data/hospitalInfo"; // Ensure this imports the correct data
import { Hospital, Review } from "../typings/Hospital";
import "../styles/product-details.css";

const HospitalDetails: React.FC = () => {
  const [tab, setTab] = useState<string>("desc");
  const [rating, setRating] = useState<number | null>(null);
  const reviewUser = useRef<HTMLInputElement>(null);
  const reviewMsg = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams<{ id: string }>();
  const information = HospitalInfo.find((item) => item.id === id) as Hospital | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [information]);

  if (!information) {
    return <p>Hospital not found</p>;
  }

  const {
    hospitalName,
    location,
    avgRating = 0,
    reviews = [],
    description,
    shortDesc,
  } = information;

  console.log('Reviews Data:', reviews);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current?.value || "Anonymous";
    const reviewUserMsg = reviewMsg.current?.value || "";

    const reviewObj: Review = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating: rating ?? 0, // Default to 0 if rating is null
    };
    console.log(reviewObj);
    toast.success("Review sent successfully");
  };

  return (
    <Helmet title={hospitalName}>
      <CommonSection title={hospitalName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <div className="product__details">
                <h2>{hospitalName}</h2>
                <p>{location}</p>
                <div className="product__rating d-flex align-items-center gap-3 mb-3">
                  <div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {index < Math.floor(avgRating) ? (
                          <i className="ri-star-fill"></i>
                        ) : index < avgRating ? (
                          <i className="ri-star-half-s-fill"></i>
                        ) : (
                          <i className="ri-star-line"></i>
                        )}
                      </span>
                    ))}
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <p className="mt-3">{shortDesc}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={tab === "desc" ? "active__tab" : ""}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={tab === "rev" ? "active__tab" : ""}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>{item.userName}</h6>
                          <span>{item.rating} (average rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <form onSubmit={submitHandler}>
                        <h4>How would you rate this hospital? </h4>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            required
                            ref={reviewUser}
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-3 rating__group">
                          {Array.from({ length: 5 }, (_, index) => (
                            <motion.span
                              key={index}
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(index + 1)}
                            >
                              {index + 1}
                              <i className="ri-star-fill"></i>
                            </motion.span>
                          ))}
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={4}
                            placeholder="Review Message..."
                            required
                            ref={reviewMsg}
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__button"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default HospitalDetails;
