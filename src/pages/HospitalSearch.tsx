import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/helmet";
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "../styles/hospitalsearch.css";
import HospitalList from "../components/UI/HospitalList";
import { CSVLink } from "react-csv";
import { Hospital } from "../typings/Hospital";
import axios from "axios";

const API_URL = "https://api.reliancehmo.com/v3/providers";

const HospitalSearch: React.FC = () => {
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);
  const [filteredData, setFilteredData] = useState<Hospital[]>([]);
  const [markdown, setMarkdown] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hospitalsPerPage] = useState<number>(30);

  const maxVisiblePages = 5;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(API_URL);
        let hospitalsArray: Hospital[] = [];

        if (Array.isArray(response.data)) {
          hospitalsArray = response.data;
        } else if (typeof response.data === "object" && response.data !== null) {
          const possibleArrays = Object.values(response.data).filter(Array.isArray);
          if (possibleArrays.length > 0) {
            hospitalsArray = possibleArrays[0] as Hospital[];
          }
        }

        if (hospitalsArray.length > 0) {
          setHospitalData(hospitalsArray);
          setFilteredData(hospitalsArray);
        } else {
          setError("No hospitals found in the data");
        }
      } catch (error) {
        setError("Failed to fetch hospital data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      setFilteredData(hospitalData);
    } else {
      const filteredLists = hospitalData.filter(
        (item) => item.location?.toLowerCase() === filterValue.toLowerCase()
      );
      setFilteredData(filteredLists);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchedHospitals = hospitalData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(searchedHospitals);
    setCurrentPage(1);
  };

  const exportHospitals = () => {
    return Array.isArray(filteredData)
      ? filteredData.map((item) => ({
          ID: item.id,
          HospitalName: item.name,
          Address: item.address,
          Location: item.location,
        }))
      : [];
  };

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    setMarkdown(text);
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
      name: hospitalName.trim(),
      address: address.trim(),
      location: location.trim() || "",
      shortDesc: "",
      description: "",
      reviews: [],
      avgRating: 0,
      tier_id: 0,
      type_id: 0,
      phone_number: "",
      state: { id: 0, name: "" },
      type: { id: 0, name: "" },
      products: [],
    };
  };

  const generateUniqueId = (): string | number => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `entry-${timestamp}-${randomSuffix}`;
  };

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredData.slice(indexOfFirstHospital, indexOfLastHospital);

  const totalPages = Math.ceil(filteredData.length / hospitalsPerPage);

  const getPageNumbers = () => {
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    const pages = [];

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                  <option value="all">All Locations</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                </select>
              </div>
            </Col>

            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <label htmlFor="sort">Sort By</label>
                <select id="sort">
                  <option value="default">Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="12" className="text-center">
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
            {isLoading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : currentHospitals.length > 0 ? (
              <HospitalList data={currentHospitals} />
            ) : (
              <h1 className="text-center fs-4">No Hospitals Found</h1>
            )}
          </Row>
        </Container>
      </section>

      <section className="pagination-section">
        <Container>
          <Row>
            <Col>
              <Pagination className="pagination">
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <PaginationItem key={index} disabled>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={index} active={currentPage === page}>
                      <PaginationLink onClick={() => paginate(Number(page))}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink next onClick={() => paginate(currentPage + 1)} />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <CSVLink
          data={exportHospitals()}
          filename={"hospitals.csv"}
          className="export-link"
        >
          Export Hospital List
        </CSVLink>
      </section>

      <section className="mark-section">
        <Container>
          <Row>
            <Col>
              <form onSubmit={handleSubmit} className="mark-form">
                <Editor
                  style={{ height: '500px' }}
                  value={markdown}
                  onChange={handleEditorChange}
                  renderHTML={text => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
                />
                <button type="submit" className="mark-button">
                  Add Hospital
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default HospitalSearch;
