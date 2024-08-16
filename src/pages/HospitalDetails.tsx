import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/helmet";
import CommonSection from "../components/UI/CommonSection";
import { Hospital, Review } from "../typings/Hospital";
import "../styles/product-details.css";
import axios from "axios";

const API_URL = "https://api.reliancehmo.com/v3/providers";

const HospitalDetails: React.FC = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [tab, setTab] = useState<string>("desc");
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const reviewUser = useRef<HTMLInputElement>(null);
  const reviewMsg = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: Hospital[] }>(API_URL);
        console.log(response.data);

        const hospitals = response.data.data;
        if (Array.isArray(hospitals)) {
          const hospital = hospitals.find((h) => String(h.id) === id);
          if (hospital) {
            setHospital(hospital);
            setError(null);
          } else {
            setError("Hospital not found");
            setHospital(null);
          }
        } else {
          throw new Error("Unexpected response format: data is not an array.");
        }
      } catch (err) {
        console.error("Error fetching hospital data:", err);
        setError("Error fetching hospital data");
        setHospital(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <p>Loading hospital details...</p>;
  }

  if (error) {
    return (
      <div className="hospital-not-found">
        <Container>
          <h2>{error}</h2>
          <Link to="/hospitals" className="btn btn-primary">
            Back to Hospital List
          </Link>
        </Container>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="hospital-not-found">
        <Container>
          <h2>Hospital Not Found</h2>
          <p>We couldn't find the hospital you're looking for.</p>
          <Link to="/hospitals" className="btn btn-primary">
            Back to Hospital List
          </Link>
        </Container>
      </div>
    );
  }

  const {
    name,
    state,
    address,
    phone_number,
    type,
    reviews = [],
    description = "",
  } = hospital;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + (review.rating ?? 0), 0) /
        reviews.length
      : 0;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === null) {
      toast.error("Please select a rating.");
      return;
    }

    const reviewUserName = reviewUser.current?.value || "Anonymous";
    const reviewUserMsg = reviewMsg.current?.value || "";

    const reviewObj: Review = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast.success("Review submitted successfully");
    if (reviewUser.current) reviewUser.current.value = "";
    if (reviewMsg.current) reviewMsg.current.value = "";
    setRating(null);
  };

  return (
    <Helmet title={name}>
      <CommonSection title={name} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <div className="product__details">
                <h2>{name}</h2>
                <p>{state?.name || "Unknown State"}</p>
                <p>{address}</p>
                <p>{phone_number}</p>
                <p>{type?.name || "Unknown Type"}</p>
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
                    (<span>{avgRating.toFixed(1)}</span> ratings)
                  </p>
                </div>
                <p className="mt-3">{description}</p>
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
                      {reviews.length > 0 ? (
                        reviews.map((item, index) => (
                          <li key={index} className="mb-4">
                            <h6>{item.userName}</h6>
                            <span>{item.rating} (average rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))
                      ) : (
                        <p>No reviews yet. Be the first to leave a review!</p>
                      )}
                    </ul>
                    <div className="review__form">
                      <form onSubmit={submitHandler}>
                        <h4>How would you rate this hospital? </h4>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-3 rating__group">
                          {Array.from({ length: 5 }, (_, index) => (
                            <motion.span
                              key={index}
                              whileTap={{ scale: 1.2 }}
                              className={
                                rating === index + 1 ? "selected-rating" : ""
                              }
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
