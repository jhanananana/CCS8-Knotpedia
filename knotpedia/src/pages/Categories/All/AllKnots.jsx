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
    const knotsPerPage = 12;
    const [searchText, setSearchText] = useState("");
    const [activityFilter, setActivityFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewSize, setViewSize] = useState("small"); // Default view size is medium
    const [activityLabel, setActivityLabel] = useState("All Activities");
    const [typeLabel, setTypeLabel] = useState("All Types");
    const [sortLabel, setSortLabel] = useState("Name (A – Z)");
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


    const handleViewChange = (e) => {
        setViewSize(e.target.value); // Update view size based on selection
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
                                    <div className="chevron"></div> {/* Chevron icon */}
                                </button>
                                <div className="dropdown-content">
                                    <a onClick={() => { setActivityFilter(""); setActivityLabel("All Activities"); }}>All Activities</a>
                                    <a onClick={() => { setActivityFilter("arborist"); setActivityLabel("Arborist"); }}>Arborist</a>
                                    <a onClick={() => { setActivityFilter("boating"); setActivityLabel("Boating"); }}>Boating</a>
                                    <a onClick={() => { setActivityFilter("climbing"); setActivityLabel("Climbing"); }}>Climbing</a>
                                    <a onClick={() => { setActivityFilter("decorative"); setActivityLabel("Decorative"); }}>Decorative</a>
                                    <a onClick={() => { setActivityFilter("fishing"); setActivityLabel("Fishing"); }}>Fishing</a>
                                    <a onClick={() => { setActivityFilter("horse and farm"); setActivityLabel("Horse & Farm"); }}>Horse & Farm</a>
                                    <a onClick={() => { setActivityFilter("household"); setActivityLabel("Household"); }}>Household</a>
                                    <a onClick={() => { setActivityFilter("neckties"); setActivityLabel("Neckties"); }}>Neckties</a>
                                    <a onClick={() => { setActivityFilter("rope care"); setActivityLabel("Rope Care"); }}>Rope Care</a>
                                    <a onClick={() => { setActivityFilter("scouting"); setActivityLabel("Scouting"); }}>Scouting</a>
                                    <a onClick={() => { setActivityFilter("search and rescue"); setActivityLabel("Search & Rescue"); }}>Search & Rescue</a>
                                    <a onClick={() => { setActivityFilter("surgical"); setActivityLabel("Surgical"); }}>Surgical</a>
                                </div>
                            </div>
                            &nbsp;

                            <div className="dropdown">
                                <button className="dropbtn">
                                    {typeLabel}<br></br>
                                    <div className="chevron"></div> {/* Chevron icon */}
                                </button>
                                <div className="dropdown-content">
                                    <a onClick={() => { setTypeFilter(""); setTypeLabel("All Types"); }}>All Types</a>
                                    <a onClick={() => { setTypeFilter("basic"); setTypeLabel("Basic"); }}>Basic</a>
                                    <a onClick={() => { setTypeFilter("bends"); setTypeLabel("Bends"); }}>Bends</a>
                                    <a onClick={() => { setTypeFilter("end loops"); setTypeLabel("End Loops"); }}>End Loops</a>
                                    <a onClick={() => { setTypeFilter("hitches"); setTypeLabel("Hitches"); }}>Hitches</a>
                                    <a onClick={() => { setTypeFilter("mats"); setTypeLabel("Mats"); }}>Mats</a>
                                    <a onClick={() => { setTypeFilter("mid loops"); setTypeLabel("Mid Loops"); }}>Mid Loops</a>
                                    <a onClick={() => { setTypeFilter("quick release"); setTypeLabel("Quick Release"); }}>Quick Release</a>
                                    <a onClick={() => { setTypeFilter("slide and grip"); setTypeLabel("Slide & Grip"); }}>Slide & Grip</a>
                                    <a onClick={() => { setTypeFilter("splicing"); setTypeLabel("Splicing"); }}>Splicing</a>
                                    <a onClick={() => { setTypeFilter("stoppers"); setTypeLabel("Stoppers"); }}>Stoppers</a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="filter-label">Sort By: &nbsp;</div>

                            <div className="dropdown">
                                <button className="dropbtn">
                                    {sortLabel}
                                    <div className="chevron"></div> {/* Chevron icon */}
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

                        <div>
                            <div className="filter-label">View: &nbsp;</div>
                            <div className="dropdown">
                                <button className="dropbtn">
                                    {viewLabel}
                                    <div className="chevron"></div> {/* Chevron icon */}
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
                </div>

                {/* KNOT DISPLAY */}
                {currentKnots.length === 0 ? (
                    <p className="empty-message"><b>No exact matches found</b><br />Please try again.</p>
                ) : (

                    <div className={`allknots-container ${viewSize}`}>

                        {currentKnots.map((knot) => (
                            <Link
                                key={knot.id}
                                to={`/KnotChosen/${knot.id}`}
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