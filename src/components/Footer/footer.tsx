import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import careicon from "../../assets/images/carefinder 1.jpg";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="logo">
              <div>
                <h1 className="text-white">
                  <span>
                    <img
                      src={careicon}
                      alt="CareFinder Logo"
                      className="careiconmain"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </span>
                  <Link to="/" className="Carehome2">
                    CareFinder
                  </Link>
                </h1>
              </div>
            </div>

            <p className="footer__text mt-4">
              Explore top-rated hospitals in your area and get the care you
              need.
            </p>
          </Col>

          <Col lg="2" md="3" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick__links-title">Carefinder Essentials</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/hospital" className="secondarylinks">
                    Hospital List
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/signup" className="secondarylinks">
                    Sign Up
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login" className="secondarylinks">
                    Log In
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/hospital" className="secondarylinks">
                    Add Hospital
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-2-line"></i>
                  </span>
                  <p>8, Herbert Macaulay Road, Yaba, Lagos, Nigeria</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+234 701 231 6574</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>admin@carefinder.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year} developed by Balez. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
