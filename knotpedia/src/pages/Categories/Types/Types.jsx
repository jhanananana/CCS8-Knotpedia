import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./Types.css";
import { db } from "../../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';
import Pagination from '../../Components/Pagination.jsx';

const Types = () => {
    const [knots, setKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const knotsPerPage = 12;
    const [searchText, setSearchText] = useState("");
    const [activityFilter, setActivityFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewSize, setViewSize] = useState("small"); // Default view size is medium
    const { type } = useParams();
    const location = useLocation();
    const [typeFilter, setTypeFilter] = useState(type || "");
    const [typeLabel, setTypeLabel] = useState(type ? type.charAt(0).toUpperCase() + type.slice(1) : "All Types");

    useEffect(() => {
        if (typeFilter) {
            window.history.pushState(null, "", `/knots/types/${typeFilter}`);
        } else {
            window.history.pushState(null, "", `/knots/types`);
        }
    }, [typeFilter]);

    useEffect(() => {
        if (type) {
            setTypeFilter(type);
            setTypeLabel(type.charAt(0).toUpperCase() + type.slice(1));
        } else {
            setTypeFilter("");
            setTypeLabel("All Types");
        }
    }, [location]);

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
            <header className="subHeader redCover">
                <div className="container">
                    <h1>Knots by Type</h1>
                    <p>Explore knots by category.
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
            </div>

            <div className="container types-layout">
                <aside className="sidebar horizontal-sidebar">
                    <div className="sidebarTitle" style={{ display: 'flex' }}>
                        <div className="icon">
                            <img src="/assets/home-type.png" alt="Type Icon" />
                        </div>
                        <h2>Types</h2>
                    </div>

                    <ul className="sidebar-list">
                        <li
                            className={typeFilter === "" ? "active-sidebar" : ""}
                            onClick={() => {
                                setTypeFilter("");
                                setTypeLabel("All Types");
                            }}
                        >
                            All Types
                        </li>
                        <li
                            className={typeFilter === "basic" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("basic"); setTypeLabel("Basic"); }}
                        >
                            Basic
                        </li>
                        <li
                            className={typeFilter === "bends" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("bends"); setTypeLabel("Bends"); }}
                        >
                            Bends
                        </li>
                        <li
                            className={typeFilter === "end loops" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("end loops"); setTypeLabel("End Loops"); }}
                        >
                            End Loops
                        </li>
                        <li
                            className={typeFilter === "hitches" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("hitches"); setTypeLabel("Hitches"); }}
                        >
                            Hitches
                        </li>
                        <li
                            className={typeFilter === "mats" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("mats"); setTypeLabel("Mats"); }}
                        >
                            Mats
                        </li>
                        <li
                            className={typeFilter === "mid loops" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("mid loops"); setTypeLabel("Mid Loops"); }}
                        >
                            Mid Loops
                        </li>
                        <li
                            className={typeFilter === "quick release" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("quick release"); setTypeLabel("Quick Release"); }}
                        >
                            Quick Release
                        </li>
                        <li
                            className={typeFilter === "slide and grip" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("slide and grip"); setTypeLabel("Slide & Grip"); }}
                        >
                            Slide & Grip
                        </li>
                        <li
                            className={typeFilter === "splicing" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("splicing"); setTypeLabel("Splicing"); }}
                        >
                            Splicing
                        </li>
                        <li
                            className={typeFilter === "stoppers" ? "active-sidebar" : ""}
                            onClick={() => { setTypeFilter("stoppers"); setTypeLabel("Stoppers"); }}
                        >
                            Stoppers
                        </li>
                    </ul>
                </aside>

                {/* FILTER SECTION */}
                <div>
                </div>
                {/* Main Content Area */}
                <main className="content-area">
                    <div className="category-title">
                        <h2>{typeLabel}</h2>
                    </div>

                    <div className="results-and-search">
                        <div className="results-info">
                            Showing results <b>{indexOfFirstKnot + 1}–{Math.min(indexOfLastKnot, filteredKnots.length)}</b> of {filteredKnots.length}, Page {currentPage}
                        </div>
                    </div>

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

                    {filteredKnots.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </main>
            </div>
            <Footer />
        </div >
    );
};

export default Types;