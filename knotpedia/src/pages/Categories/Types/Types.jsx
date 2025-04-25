import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./Types.css";
import { db } from "../../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Types = () => {
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

    const filteredKnots = knots
        .filter(knot => {
            const matchesSearch = knot.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = typeFilter ? knot.tags?.includes(typeFilter) : true;
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

    const indexOfLastKnot = currentPage * knotsPerPage;
    const indexOfFirstKnot = indexOfLastKnot - knotsPerPage;
    const currentKnots = filteredKnots.slice(indexOfFirstKnot, indexOfLastKnot);
    const totalPages = Math.ceil(filteredKnots.length / knotsPerPage);

    return (
        <div>
            <Navbar />
            <header className="subHeader blueCover">
                <div className="container">
                    <h1>Knots by Type</h1>
                    <p>
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
                            <Link key={knot.id} to={`/KnotChosen/${knot.id}`} className="knots-card-link">
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

export default Types;