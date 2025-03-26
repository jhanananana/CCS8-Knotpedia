import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./AllKnots.css";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";

const AllKnots = () => {
    const [knots, setKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const knotsPerPage = 12;
    const [searchText, setSearchText] = useState("");
    const [activityFilter, setActivityFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");

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

    const handleClearSearch = () => {
        setSearchText("");
    };

    const indexOfLastKnot = currentPage * knotsPerPage;
    const indexOfFirstKnot = indexOfLastKnot - knotsPerPage;
    const currentKnots = knots.length
        ? Array(6).fill(knots[0]) // Duplicate the first knot 6 times
        : [];

    const totalPages = Math.ceil(knots.length / knotsPerPage);

    return (
        <div>
            <Navbar />

            <header className="allknots-header">
                <h1 className="p-width">Complete Knot List</h1>
                <p className="p-width">
                    Browse our complete list of knots, including step-by-step guides,
                    practical uses, and detailed explanations for various applications.
                </p>
            </header>

            <div className="content-container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <a href="/">Home</a> &gt; All Knots
                </nav>
                <div className="main-container">
                    {/* LEFT COLUMN (FILTERS + ALPHABETICAL FILTER) */}
                    <aside className="allknots-left-column">
                        <div className="letter-filter">
                            <span className="letter-main">Alphabetical Filter:</span>
                            <div className="letter-buttons">
                                <button className="letter-btn">All</button>
                                {Array.from({ length: 26 }, (_, i) => (
                                    <button key={i} className="letter-btn">
                                        {String.fromCharCode(65 + i)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className="filter-container">
                            <span className="letter-main">Sort By</span>
                            <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}>
                                <option value="">Name, A-Z</option>
                                <option value="Climbing">Name, Z-A</option>
                            </select>
                        </div>
                        <hr />
                        <div className="filter-container">
                            <span className="letter-main">Filter By</span>
                            <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}>
                                <option value="">Activity</option>
                                <option value="Climbing">Climbing</option>
                                <option value="Fishing">Fishing</option>
                            </select>
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                <option value="">Type</option>
                                <option value="Loop">Loop</option>
                                <option value="Hitch">Hitch</option>
                            </select>
                            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
                                <option value="">Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Hard">Hard</option>
                            </select>
                            <button className="blue button">Match Filter</button>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN (KNOT DISPLAY) */}
                    <section className="allknots-right-column">
                        <p>Showing <b>{Math.min(indexOfFirstKnot + 1, knots.length)}-{Math.min(indexOfLastKnot, knots.length)}</b> of {knots.length} knots</p>

                        <div className="knots-container">
                            {currentKnots.map((knot) => (
                                <a href={`/knot/${knot.id}`} className="knot-card" key={knot.id}>
                                    <div className="knot-image">
                                        <img src={knot.image} alt={knot.name} />
                                    </div>
                                    <h3 className="knot-name">{knot.name}</h3>
                                    <p className="knot-description">{knot.description}</p>
                                    <button className="button red">View Knot</button>
                                </a>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="pagination">
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={currentPage === i + 1 ? "active" : ""}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllKnots;