import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./AllKnots.css";
import { db } from "../../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pagination from '../../Components/Pagination.jsx';

const AllKnots = () => {
    const [knots, setKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [knotsPerPage, setKnotsPerPage] = useState(15);
    const [searchText, setSearchText] = useState("");
    const [activityFilter, setActivityFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewSize, setViewSize] = useState("small"); // Default view size is medium
    const [activityLabel, setActivityLabel] = useState("All Activities");
    const [typeLabel, setTypeLabel] = useState("All Types");
    const [sortLabel, setSortLabel] = useState("Name (A – Z)");
    const [viewLabel, setViewLabel] = useState("Small (Default)");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKnots = async () => {
            setLoading(true); // <-- Start loading
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
            } finally {
                setLoading(false)
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
    }, [activityFilter, typeFilter, searchText]);

    const handleClearFilters = () => {
        setSearchText("");
        setActivityFilter("");
        setTypeFilter("");
        setSortOrder("asc");
        setActivityLabel("All Activities");
        setTypeLabel("All Types");
        setSortLabel("Name (A – Z)");
        setViewLabel("Small (Default)");
        setViewSize("small");
    };

    const filteredKnots = knots
        .filter(knot => {
            const matchesSearch = knot.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = typeFilter ? knot.tags?.includes(typeFilter) : true;
            const matchesActivity = activityFilter ? knot.tags?.includes(activityFilter) : true;
            return matchesSearch && matchesActivity && matchesType;
        })
        .sort((a, b) => {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });


    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleViewChange = (value) => {
        setViewSize(value);
        setKnotsPerPage(value === "small" ? 15 : 12); // 15 for small, 12 for large
        setViewLabel(value === "small" ? "Small (Default)" : "Large");
        setCurrentPage(1); // Reset to first page when changing view
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
                        <img src="/assets/home-icon.png" alt="Home Icon" title="Home" />
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
                        {/* Activity Filter */}
                        <div>
                            <label className="filter-label">
                                Filter By: &nbsp;
                                <select
                                    className="dropdown"
                                    value={activityFilter}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setActivityFilter(value);
                                        setActivityLabel(value ? capitalizeWords(value) : "All Activities");
                                    }}
                                >
                                    <option value="">All Activities</option>
                                    <option value="arborist">Arborist</option>
                                    <option value="boating">Boating</option>
                                    <option value="climbing">Climbing</option>
                                    <option value="decorative">Decorative</option>
                                    <option value="fishing">Fishing</option>
                                    <option value="horse and farm">Horse & Farm</option>
                                    <option value="household">Household</option>
                                    <option value="rope care">Rope Care</option>
                                    <option value="scouting">Scouting</option>
                                    <option value="search and rescue">Search & Rescue</option>
                                    <option value="surgical">Surgical</option>
                                </select>
                            </label>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="filter-label">
                                <select
                                    className="dropdown"
                                    value={typeFilter}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setTypeFilter(value);
                                        setTypeLabel(value ? capitalizeWords(value) : "All Types");
                                    }}
                                >
                                    <option value="">All Types</option>
                                    <option value="basic">Basic</option>
                                    <option value="bends">Bends</option>
                                    <option value="end loops">End Loops</option>
                                    <option value="hitches">Hitches</option>
                                    <option value="mats">Mats</option>
                                    <option value="mid loops">Mid Loops</option>
                                    <option value="quick release">Quick Release</option>
                                    <option value="slide and grip">Slide & Grip</option>
                                    <option value="splicing">Splicing</option>
                                    <option value="stoppers">Stoppers</option>
                                </select>
                            </label>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label className="filter-label">
                                Sort By:&nbsp;
                                <select
                                    className="dropdown"
                                    value={sortOrder}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSortOrder(value);
                                        setSortLabel(value === "asc" ? "Name (A – Z)" : "Name (Z – A)");
                                    }}
                                >
                                    <option value="asc">Name (A – Z)</option>
                                    <option value="desc">Name (Z – A)</option>
                                </select>
                            </label>
                        </div>

                        {/* View Size */}
                        <div>
                            <label className="filter-label">
                                View:&nbsp;
                                <select
                                    className="dropdown"
                                    value={viewSize}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleViewChange(value);
                                    }}
                                >
                                    <option value="small">Small (Default)</option>
                                    <option value="large">Large</option>
                                </select>
                            </label>
                        </div>

                        {/* Clear Filters */}
                        <button className="blue button" onClick={handleClearFilters}>
                            Clear All
                        </button>
                    </div>


                </div>
                <div className="results-and-search">
                    <div className="results-info">
                    <b>{filteredKnots.length}</b> Result{filteredKnots.length !== 1 ? 's' : ''} Found
                    </div>
                </div>

                {/* KNOT DISPLAY */}
                {loading ? (
                    <p className="loading"><b>Loading knots...</b></p>
                ) : currentKnots.length === 0 ? (
                    <p className="empty-message"><b>No exact matches found</b><br />Please try again.</p>
                ) : (


                    <div className={`allknots-container ${viewSize}`}>

                        {currentKnots.map((knot) => (
                            <Link
                                key={knot.id}
                                to={`/knot/${knot.name}`}
                                state={{ knot }}
                                className="knots-card-link"
                            >
                                <div className="knots-card">
                                    <div className="knots-image">
                                        <img src={knot.image} alt={knot.name} />
                                    </div>
                                    <h3 className="knots-name">{knot.name}</h3>
                                    <p className="knots-description">{knot.description}</p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <button className="button red">View Knot</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {filteredKnots.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
            <Footer />
        </div >
    );
};

export default AllKnots;