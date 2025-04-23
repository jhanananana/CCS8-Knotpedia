import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./AllKnots.css";
import { db } from "../../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AllKnots = () => {
    const [knots, setKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const knotsPerPage = 12;
    const [searchText, setSearchText] = useState("");
    const [activityFilter, setActivityFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewSize, setViewSize] = useState("small"); // Default view size is medium
    const [activityLabel, setActivityLabel] = useState("Activity");
    const [typeLabel, setTypeLabel] = useState("Type");
    const [sortLabel, setSortLabel] = useState("Sort");
    const [viewLabel, setViewLabel] = useState("Small (Default)");
    const [filterActive, setFilterActive] = useState(false);
    useEffect(() => {
        const fetchKnots = async () => {
            try {
                const q = query(collection(db, "knots"), orderBy("name"));
                const querySnapshot = await getDocs(q);
                const knotsData = querySnapshot.docs.map((doc, index) => ({
                    id: `knotID-${index + 1}`,
                    ...doc.data(),
                }));
                setKnots(knotsData);
            } catch (error) {
                console.error("Error fetching knots:", error);
            }
        };
        fetchKnots();
    }, []);

    useEffect(() => {
        const dropdowns = document.querySelectorAll('.horizontal-filters select');

        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.focus();
            });
        });

        return () => {
            dropdowns.forEach((dropdown) => {
                dropdown.removeEventListener('mouseenter', () => {
                    dropdown.focus();
                });
            });
        };
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activityFilter, typeFilter, difficultyFilter, searchText]);

    const handleClearFilters = () => {
        setSearchText("");
        setActivityFilter("");
        setTypeFilter("");
        setDifficultyFilter("");
        setSortOrder("asc");
        setActivityLabel("Activity");
        setTypeLabel("Type");
        setSortLabel("Sort");
        setViewLabel("Small (Default)");
        setViewSize("small");
    };

    const filteredKnots = knots
        .sort((a, b) => {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

    const handleClearSearch = () => {
        setSearchText("");
    };

    const handleViewChange = (e) => {
        setViewSize(e.target.value); // Update view size based on selection
    };

    const toggleFilterOverlay = () => {
        setFilterActive(!filterActive);
    };

    const indexOfLastKnot = currentPage * knotsPerPage;
    const indexOfFirstKnot = indexOfLastKnot - knotsPerPage;
    const currentKnots = filteredKnots.slice(indexOfFirstKnot, indexOfLastKnot);
    const totalPages = Math.ceil(filteredKnots.length / knotsPerPage);

    return (
        <div>
            <Navbar />
            <header className="subHeader redCover">
                <div className="container">
                    <h1>Complete Knot List</h1>
                    <p>
                        Browse our complete list of knots, including step-by-step guides,
                        practical uses, and detailed explanations for various applications.
                    </p>
                </div>
            </header>

            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <a href="/" className="breadcrumb-link">
                        <img src="/assets/home-icon.png" alt="Home Icon" />
                        <span>Home</span>
                    </a>
                    &gt;
                    <span className="active">All Knots</span>
                </nav>

                {/* FILTER SECTION */}
                <div>
                    {/* Filter Overlay */}

                    {/* Horizontal Filters */}
                    <div className="horizontal-filters">
                        <div >
                            <div className="filter-label">Filter By: &nbsp;</div>

                            <div className="dropdown">
                                <button className="dropbtn">
                                    {activityLabel}
                                    <span className="chevron">▼</span> {/* Chevron icon */}
                                </button>
                                <div className="dropdown-content">
                                    <a onClick={() => {
                                        setActivityFilter("Climbing");
                                        setActivityLabel("Climbing");
                                    }}>Climbing</a>

                                    <a onClick={() => {
                                        setActivityFilter("Fishing");
                                        setActivityLabel("Fishing");
                                    }}>Fishing</a>
                                </div>
                            </div>
                            &nbsp;

                            <div className="dropdown">
                                <button className="dropbtn">
                                    {typeLabel}
                                    <span className="chevron">▼</span> {/* Chevron icon */}
                                </button>
                                <div className="dropdown-content">
                                    <a onClick={() => {
                                        setTypeFilter("Loop");
                                        setTypeLabel("Loop");
                                    }}>Loop</a>

                                    <a onClick={() => {
                                        setTypeFilter("Hitch");
                                        setTypeLabel("Hitch");
                                    }}>Hitch</a>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '200px'}}>
                            <div className="filter-label">Sort By: &nbsp;</div>

                            <div className="dropdown">
                                <button className="dropbtn">
                                    {sortLabel}
                                    <span className="chevron">▼</span>
                                </button>
                                <div className="dropdown-content">
                                    <a onClick={() => {
                                        setSortOrder("asc");
                                        setSortLabel("Name (A – Z)");
                                    }}>Name (A – Z)</a>

                                    <a onClick={() => {
                                        setSortOrder("desc");
                                        setSortLabel("Name (Z – A)");
                                    }}>Name (Z – A)</a>
                                </div>
                            </div>
                        </div>

                        <div >
                            <div className="filter-label">View: &nbsp;</div>
                            <div className="dropdown">
                                <button className="dropbtn">
                                    {viewLabel}
                                    <span className="chevron">▼</span>
                                </button>
                                <div className="dropdown-content">
                                    <a onClick={() => {
                                        handleViewChange({ target: { value: "small" } });
                                        setViewLabel("Small (Default)");
                                    }}>Small (Default)</a>
                                    <a onClick={() => {
                                        handleViewChange({ target: { value: "large" } });
                                        setViewLabel("Large");
                                    }}>Large</a>
                                </div>
                            </div>
                        </div>
                        <button className="blue button" onClick={handleClearFilters}>Clear All</button>
                    </div>

                </div>
                <div className="results-and-search">
                    <div className="results-info">
                        Showing results <b>{indexOfFirstKnot + 1}–
                            {Math.min(indexOfLastKnot, filteredKnots.length)}</b>  of {filteredKnots.length}, Page {currentPage}
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        {searchText && (
                            <span className="knots-clear-icon" onClick={() => setSearchText("")}>✖</span>

                        )}
                        <button className="knot-search-button">
                            <img src="/assets/search.png" alt="Search" />
                        </button>
                    </div>
                </div>

                {/* KNOT DISPLAY */}
                {currentKnots.length === 0 ? (
                    <p className="empty-message"><b>No exact matches found</b><br />Please try again.</p>
                ) : (

                    <div className={`allknots-container ${viewSize}`}>
                        {currentKnots.map((knot) => (
                            <Link key={knot.id} to={`/KnotChosen/${knot.id}`} className="knots-card-link">
                                <div className="knots-card">
                                    <div className="knots-image">
                                        <img src={knot.image} alt={knot.name} />
                                    </div>
                                    <h3 className="knots-name">{knot.name}</h3>
                                    <p  className="knots-description">{knot.description}</p>
                                    <div style={{marginTop: 'auto' }}>
                                        <button className="button red">View Knot</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                )}

                {/* PAGINATION */}
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default AllKnots;