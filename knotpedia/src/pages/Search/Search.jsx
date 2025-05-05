import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import Pagination from "../Components/Pagination.jsx";
import BackToTop from "../Components/BackToTop.jsx";
import "./Search.css";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const initialQuery = useQuery().get("query") || "";
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [knots, setKnots] = useState([]);
    const [filteredKnots, setFilteredKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchKnots = async () => {
            const q = query(collection(db, "knots"), orderBy("name"));
            const querySnapshot = await getDocs(q);
            const knotsData = querySnapshot.docs.map((doc, index) => ({
                id: `knotID-${index + 1}`,
                ...doc.data(),
            }));
            setKnots(knotsData);
        };
        fetchKnots();
    }, []);

    const handleSearch = () => {
        setCurrentPage(1);
        const results = knots.filter(knot =>
            knot.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredKnots(results);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    useEffect(() => {
        const results = knots.filter(knot =>
            knot.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredKnots(results);
    }, [knots, searchTerm]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredKnots.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredKnots.length / itemsPerPage);

    return (
        <div>
            <Navbar />
            <div className="container">
                {/* Breadcrumb and Search Bar */}
                <nav className="breadcrumb">
                    <a href="/" className="breadcrumb-link">
                        <img src="/assets/home-icon.png" alt="Home Icon" title="Home" />
                        <span>Home</span>
                    </a>
                    &gt;
                    <span className="active">Search</span>
                </nav>

                <div className="search-page-bar">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Search for a knot..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        {searchTerm && (
                            <span className="home-clear-icon" title="Clear" onClick={() => setSearchTerm("")}>✖</span>
                        )}
                        <button className="home-search-button" onClick={handleSearch}>
                            <img src="/assets/search.png" alt="Search" title="Search" />
                        </button>
                    </div>
                </div>

                <h2>Search Results for: <span className="searchTerm">{searchTerm}</span></h2>

                {currentItems.length > 0 ? (
                    <>
                        <div className="searchKnot-container">
                            {currentItems.map((knot) => (
                                <Link
                                    to={`/knot/${knot.name}`}
                                    state={{ knot }}
                                    className="search-card"
                                    key={knot.id}
                                >
                                    <div className="search-image">
                                        <img src={knot.image} alt={knot.name} />
                                    </div>
                                    <h3 className="search-name">{knot.name}</h3>
                                    <p className="search-description">{knot.description}</p>
                                    <div className="button-container">
                                        <button className="button red">View Knot</button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <p>No knots found for "{searchTerm}"</p>
                )}
            </div>
            <Footer />
            <BackToTop />
        </div>
    );
};


export default Search;
