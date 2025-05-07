import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
    // Scroll to top after changing page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "arrow disabled" : ""}
      >
        &lt; Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}


      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "arrow disabled" : ""}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
