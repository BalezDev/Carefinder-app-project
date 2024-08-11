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
                <p className="hero__subtitle">Hospital locations in</p>
                <h2>Find Hospitals Near You Easily</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  nihil, esse rerum unde sunt reiciendis dolorum culpa quidem
                  magni debitis.
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
