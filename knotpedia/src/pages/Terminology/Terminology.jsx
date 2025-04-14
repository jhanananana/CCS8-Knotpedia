import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Terminology.css";

const Terminology = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/*Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a> &gt; FAQ
      </nav>

      {/* Page Header Section */}
      <header className="Terminology-header">
        <h1 className="p-width">Knotpedia Glossary</h1>
        <p className="p-width">
          Find the definitions for essential knot-related terms to help you
          understand different types of knots, their uses, and techniques.
        </p>
      </header>

      <div className="Glossary-container">
        <div class="search-bar">
          <input type="text" id="search-input" placeholder="Search..." />
          <button class="search-btn" aria-label="Search">
            <i class="search-icon">🔍</i>
          </button>
        </div>
      </div>

      <div class="alphabetical-filter">
    <span>Alphabetical Filter: </span>
    <button class="filter-btn active">All</button>
    <button class="filter-btn">A</button>
    <button class="filter-btn">B</button>
    <button class="filter-btn">C</button>
    <button class="filter-btn">D</button>
    <button class="filter-btn">E</button>
     </div>    

      <div class="pagination">
        <button class="pagination-btn">&lt; Previous</button>
        <button class="pagination-btn">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <button class="pagination-btn">Next &gt;</button>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Terminology;
