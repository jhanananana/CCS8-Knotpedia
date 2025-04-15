import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./AllKnots.css";
import { db } from "../../../firebase.js";
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
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedLetter, setSelectedLetter] = useState("All");

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
        setCurrentPage(1);
    }, [activityFilter, typeFilter, difficultyFilter, searchText]);

    const handleClearFilters = () => {
        setSearchText("");
        setActivityFilter("");
        setTypeFilter("");
        setDifficultyFilter("");
        setSortOrder("asc");
    };

    const filteredKnots = knots
        .filter((knot) => {
            const matchesLetter =
                selectedLetter === "All" || knot.name.charAt(0).toUpperCase() === selectedLetter;
            return (
                matchesLetter &&
                (activityFilter === "" || knot.activity === activityFilter) &&
                (typeFilter === "" || knot.type === typeFilter) &&
                (difficultyFilter === "" || knot.difficulty === difficultyFilter) &&
                (searchText === "" || knot.name.toLowerCase().includes(searchText.toLowerCase()))
            );
        })
        .sort((a, b) => {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

    const handleClearSearch = () => {
        setSearchText("");
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

                <div className="main-container">
                    {/* LEFT COLUMN (FILTERS + ALPHABETICAL FILTER) */}
                    <aside className="allknots-left-column">
                        <div className="letter-filter">
                            <span className="letter-main">Alphabetical Filter:</span>
                            <div className="letter-buttons">
                                <button
                                    className={`letter-btn ${selectedLetter === "All" ? "active" : ""}`}
                                    onClick={() => setSelectedLetter("All")}
                                >
                                    All
                                </button>
                                {Array.from({ length: 26 }, (_, i) => {
                                    const letter = String.fromCharCode(65 + i);
                                    return (
                                        <button
                                            key={letter}
                                            className={`letter-btn ${selectedLetter === letter ? "active" : ""}`}
                                            onClick={() => setSelectedLetter(letter)}
                                        >
                                            {letter}
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                        <hr />
                        <div className="filter-container">
                            <span className="letter-main">Sort By</span>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="asc">Ascending Order</option>
                                <option value="desc">Descending Order</option>
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

                            <button className="blue button" onClick={handleClearFilters}>
                                Clear Filter
                            </button>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN (KNOT DISPLAY) */}
                    <section className="allknots-right-column">
                        {currentKnots.length === 0 ? (
                            <p className="empty-message">
                                <b>No exact matches found</b><br></br>
                                Please try again.
                            </p>
                        ) : (
                            <div className="allknots-container">
                                {currentKnots.map((knot) => (
                                    <div key={knot.id} className="knot-card">
                                    <div className="knot-image">
                                        <img src={knot.image} alt={knot.name} />
                                    </div>
                                    <h3 className="knot-name">{knot.name}</h3>
                                    <p className="allknots-description">{knot.description}</p>
                                    <button className="button red">View Knot</button>
                                     </div>
                                ))}
                            </div>
                        )}


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
            </div >
    <Footer />
        </div >
    );
};

export default AllKnots;