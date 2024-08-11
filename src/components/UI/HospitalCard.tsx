import React from 'react';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Hospital } from '../../typings/Hospital';

interface HospitalCardProps {
  item: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ item }) => {
  return (
    <Col lg="3" md="4">
      <div className="product__item">
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/hospital/${item.id}`}>{item.hospitalName}</Link>
          </h3>
          <span>{item.location}</span>
        </div>
      </div>
    </Col>
  );
};

export default HospitalCard;