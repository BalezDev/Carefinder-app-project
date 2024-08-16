import React from "react";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Hospital } from "../../typings/Hospital";

interface HospitalCardProps {
  item: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ item }) => {
  return (
    <Col lg="3" md="4" className="mb-4">
      <div className="product__item p-3">
        <div className="product__info">
          <h3 className="product__name">
            <Link to={`/hospital/${item.id}`}>{item.name}</Link>
          </h3>
          <p>
            <strong>Location:</strong> {item.location}
          </p>
          <p>
            <strong>Address:</strong> {item.address}
          </p>
          <p>
            <strong>Phone:</strong> {item.phone_number || "N/A"}
          </p>
          <p>
            <strong>State:</strong> {item.state?.name || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {item.type?.name || "N/A"}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default HospitalCard;
