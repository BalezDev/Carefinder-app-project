import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import '../services/Services.css';
import serviceData from '../assets/data/servicesData'; // Import the data

// Define the type for the service data
interface ServiceItem {
  bg: string;
  icon: string;
  title: string;
  subtitle: string;
}

// Ensure serviceData is typed correctly in its own module
// If serviceData is imported from a module that already has correct typing, do not redeclare it here

const Services: React.FC = () => {
  return (
    <section className="services">
      <Container>
        <Row>
          {serviceData.map((item: ServiceItem, index: number) => (
            <Col lg="3" md="4" key={index}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="service__item"
                style={{ background: item.bg }}
              >
                <span><i className={item.icon}></i></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
