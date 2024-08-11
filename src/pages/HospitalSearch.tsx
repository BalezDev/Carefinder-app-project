import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/hospitalsearch.css";
import hospitalInfo from "../assets/data/hospitalInfo";
import HospitalList from "../components/UI/HospitalList";
import { CSVLink } from "react-csv";
import { Hospital } from "../typings/Hospital";

const HospitalSearch: React.FC = () => {
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);
  const [filteredData, setFilteredData] = useState<Hospital[]>([]);
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    setHospitalData([...hospitalInfo]);
    setFilteredData([...hospitalInfo]);
  }, []);

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;

    if (filterValue === "all") {
      setFilteredData(hospitalData);
    } else {
      const filteredLists = hospitalData.filter(
        (item) => item.location === filterValue
      );
      setFilteredData(filteredLists);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    const searchedProducts = hospitalData.filter((item) =>
      item.hospitalName.toLowerCase().includes(searchTerm)
    );

    setFilteredData(searchedProducts);
  };

  const exportHospitals = () => {
    return filteredData.map((item) => ({
      ID: item.id,
      HospitalName: item.hospitalName,
      Address: item.address,
      Location: item.location,
    }));
  };

  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedEntry = parseMarkdownInput(markdown);

    const updatedHospitalData = [...hospitalData, parsedEntry];
    setHospitalData(updatedHospitalData);
    setFilteredData(updatedHospitalData);
    setMarkdown("");
  };

  const parseMarkdownInput = (input: string): Hospital => {
    const [hospitalName, address, location] = input.split("\n");

    return {
      id: generateUniqueId(),
      hospitalName: hospitalName.trim(),
      address: address.trim(),
      location: location.trim(),
      shortDesc: "",
      description: "",
      reviews: [],
      avgRating: 0,
    };
  };

  const generateUniqueId = (): string | number => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `entry-${timestamp}-${randomSuffix}`;
  };

  return (
    <Helmet title="Hospital">
      <CommonSection title="Hospital Search" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" className="text-center">
              <div className="filter__widget">
                <label htmlFor="filter">Filter By States</label>
                <select id="filter" onChange={handleFilter}>
                  <option value="all">Filter By States</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="ogun">Ogun</option>
                  <option value="osun">Osun</option>
                  <option value="oyo">Oyo</option>
                  <option value="ondo">Ondo</option>
                  <option value="ekiti">Ekiti</option>
                  <option value="anambra">Anambra</option>
                  <option value="bauchi">Bauchi</option>
                  <option value="jos">Jos</option>
                  <option value="rivers">Rivers</option>
                  <option value="taraba">Taraba</option>
                  <option value="sokoto">Sokoto</option>
                  <option value="adamawa">Adamawa</option>
                  <option value="abia">Abia</option>
                  <option value="enugu">Enugu</option>
                  <option value="uyo">Uyo</option>
                  <option value="benue">Benue</option>
                  <option value="delta">Delta</option>
                  <option value="imo">Imo</option>
                  <option value="kwara">Kwara</option>
                  <option value="niger">Niger</option>
                  <option value="kano">Kano</option>
                  <option value="kaduna">Kaduna</option>
                  <option value="calabar">Calabar</option>
                  <option value="ebonyi">Ebonyi</option>
                </select>
              </div>
            </Col>

            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <label htmlFor="sort">Sort By</label>
                <select id="sort">
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="15" className="text-center">
              <div className="search__box">
                <input
                  type="text"
                  onChange={handleSearch}
                  placeholder="Search....."
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {filteredData.length === 0 ? (
              <h1 className="text-center fs-4">No Hospitals Found</h1>
            ) : (
              <HospitalList data={filteredData} />
            )}
          </Row>
        </Container>
      </section>

      <section>
        <CSVLink data={exportHospitals()} filename={"hospitals.csv"} className="export-link">
          Export Hospital List
        </CSVLink>
      </section>

      <section className="mark-section">
        <Container>
          <Row>
            <Col>
              <form onSubmit={handleSubmit} className="mark-form">
                <textarea
                  value={markdown}
                  onChange={handleMarkdownChange}
                  placeholder="Enter hospital details in markdown format"
                  className="mark-area"
                />
                <button type="submit" className="mark-button">Add Hospital</button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default HospitalSearch;
