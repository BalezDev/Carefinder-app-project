import React from "react";
import Helmet from "../components/Helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-pic.jpg";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <Helmet title="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h2>Find the Best Hospitals Near You.</h2>
                <p>
                  Search for hospitals in your area and get detailed information
                  about their services, amenities, and more.
                </p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="start-button"
                >
                  <Link to="/hospital">Start Now</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="Hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
