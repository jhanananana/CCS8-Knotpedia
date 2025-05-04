import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Terminology.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Terminology = () => {
  const [knots, setKnots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const knotsPerPage = 4; // Show 4 knots per page

  // Fetch knots from Firestore
  useEffect(() => {
    const fetchKnots = async () => {
      try {
        const knotsCollection = collection(db, "knots");
        const knotSnapshot = await getDocs(knotsCollection);
        const knotList = knotSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.id, // Using the document ID as the name
          ...doc.data(),
        }));
        setKnots(knotList); // Update state with fetched knots
        setLoading(false);
      } catch (error) {
        console.error("Error fetching knots:", error);
        setLoading(false);
      }
    };

    fetchKnots();
  }, []);

  // Filter knots based on selected letter
  const filteredKnots = knots.filter((knot) => {
    const matchesFilter =
      filter === "All" || knot.name.toUpperCase().startsWith(filter);
    const matchesSearch =
      searchTerm === "" ||
      knot.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate pagination indices
  const indexOfLastKnot = currentPage * knotsPerPage;
  const indexOfFirstKnot = indexOfLastKnot - knotsPerPage;
  const currentKnots = filteredKnots.slice(indexOfFirstKnot, indexOfLastKnot);
  const totalPages = Math.ceil(filteredKnots.length / knotsPerPage);

  // Change to a specific page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to page 1 when filter or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Page Header Section */}
      <header className="subHeader blueCover">
        <h1 className="p-width">Knotpedia Glossary</h1>
        <p className="p-width">
          Find the definitions for essential knot-related terms to help you
          understand different types of knots, their uses, and techniques.
        </p>
      </header>

      {/* Main content container */}
      <div className="content-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-link">
            <img src="/assets/home-icon.png" alt="Home Icon" />
            <span>Home</span>
          </a>
          &gt;
          <span className="active">Glossary</span>
        </nav>

        {/* Search bar */}
        <div className="search-wrapper">
          <div className="search-bar">
            <input
              type="text"
              id="search-input"
              placeholder="Search for a knot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              onKeyPress={(e) => e.key === "Enter" && setSearchTerm(e.target.value)} // Trigger search on Enter key press
            />
            {searchTerm && (
              <button
                className="clear-search-icon"
                onClick={() => setSearchTerm("")} // Clear search term
                aria-label="Clear search"
              >
                ✖
              </button>
            )}
            <button
              className="search-btn"
              onClick={() => console.log("Search triggered")} // Optional: Add additional logic here
              aria-label="Search"
            >
              <img src="/assets/search.png" alt="Search" />
            </button>
          </div>
        </div>

        {/* Alphabetical Filter */}
        <div className="alphabetical-filter">
          <span>Alphabetical Filter: </span>
          {[
            "All",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
          ].map((letter) => (
            <button
              key={letter}
              className={`filter-btn ${filter === letter ? "active" : ""}`}
              onClick={() => setFilter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Display loading message or knots */}
        {loading ? (
          <div className="loading">Loading knots...</div>
        ) : (
          <>
            {/* Display the number of results */}
            <div className="results-count">
              {filteredKnots.length} Results Found
            </div>

            {/* Display knots in a grid */}
            <div className="knots-grid">
              {currentKnots.map((knot) => (
                <div key={knot.id} className="glossaryknot-card">
                  <h3 className="knot-name">{knot.name}</h3>
                  <p className="knot-description">{knot.description}</p>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {filteredKnots.length > 0 && (
              <div className="glossary-pagination">
                <button
                  className={`glossary-pagination-btn previous ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  &lt; Previous
                </button>

                {/* Generate page buttons */}
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`glossary-pagination-btn ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                      onClick={() => paginate(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  className={`glossary-pagination-btn next ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terminology;