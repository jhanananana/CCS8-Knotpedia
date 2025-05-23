import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Pagination from "../Components/Pagination";
import "./Terminology.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const Terminology = () => {
  const [knots, setKnots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const knotsPerPage = 12;

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
        <h1 className="p-width">Knots Glossary</h1>
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
            <img src="/assets/home-icon.png" alt="Home Icon" title="Home" />
            <span>Home</span>
          </a>
          &gt;
          <span className="active">Knots Glossary</span>
        </nav>

        {/* Search bar */}
        <div className="search-page-bar">
          <div className="search-wrapper">
            <input
              type="text"
              id="search-input"
              placeholder="Search for a knot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              onKeyPress={(e) =>
                e.key === "Enter" && setSearchTerm(e.target.value)
              } // Trigger search on Enter key press
            />
            {searchTerm && (
              <button
                className="clear-search-icon"
                title="Clear"
                alt="Clear"
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
              <img src="/assets/search red.png" alt="Search" title="Search" />
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
          <p className="loading"><b>Loading knots...</b></p>
        ) : currentKnots.length === 0 ? (
          <p className="empty-message"><b>No exact matches found</b><br />Please try again.</p>
        ) : (
          <>
            {/* Display the number of results */}
            <div className="results-count">
              <b>{filteredKnots.length}</b> Results Found
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

            {/* Pagination Controls */}
            {filteredKnots.length > 0 && (
              <div className="glossary-pagination"></div>
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
