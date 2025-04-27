import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "./Activities.css";
import { db } from "../../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';
import Pagination from '../../Components/Pagination.jsx';

const Activities = () => {
    const [knots, setKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const knotsPerPage = 12;
    const [searchText, setSearchText] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewSize, setViewSize] = useState("small");
    const { activity } = useParams();
    const location = useLocation();
    const [activityFilter, setActivityFilter] = useState(activity || "");
    const [activityLabel, setActivityLabel] = useState(activity ? activity.charAt(0).toUpperCase() + activity.slice(1) : "All Activities");

    useEffect(() => {
        if (activityFilter) {
            window.history.pushState(null, "", `/knots/activities/${activityFilter}`);
        } else {
            window.history.pushState(null, "", `/knots/activities`);
        }
    }, [activityFilter]);

    useEffect(() => {
        if (activity) {
            setActivityFilter(activity);
            setActivityLabel(activity.charAt(0).toUpperCase() + activity.slice(1));
        } else {
            setActivityFilter("");
            setActivityLabel("All Activities");
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
        setCurrentPage(1);
    }, [activityFilter, searchText]);

    const filteredKnots = knots
        .filter(knot => {
            const matchesSearch = knot.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesActivity = activityFilter ?
                knot.tags?.includes(activityFilter) : true;
            return matchesSearch && matchesActivity;
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
                    <h1>Knots by Activity</h1>
                    <p>Find the perfect knot for your specific needs.</p>
                </div>
            </header>

            <div className="container">
                <nav className="breadcrumb">
                    <a href="/" className="breadcrumb-link">
                        <img src="/assets/home-icon.png" alt="Home Icon" />
                        <span>Home</span>
                    </a>
                    &gt;
                    <span className="active">All Activities</span>
                </nav>
            </div>

            <div className="container types-layout">
                <aside className="sidebar horizontal-sidebar">
                    <div className="sidebarTitle" style={{ display: 'flex' }}>
                        <div className="icon">
                            <img src="/assets/home-activity.png" alt="Activity Icon" />
                        </div>
                        <h2>Activities</h2>
                    </div>

                    <ul className="sidebar-list">
                        <li
                            className={activityFilter === "" ? "active-sidebar" : ""}
                            onClick={() => {
                                setActivityFilter("");
                                setActivityLabel("All Activities");
                            }}
                        >
                            All Activities
                        </li>
                        <li
                            className={activityFilter === "arborist" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("arborist"); setActivityLabel("Arborist"); }}
                        >
                            Arborist
                        </li>
                        <li
                            className={activityFilter === "boating" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("boating"); setActivityLabel("Boating"); }}
                        >
                            Boating
                        </li>
                        <li
                            className={activityFilter === "climbing" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("climbing"); setActivityLabel("Climbing"); }}
                        >
                            Climbing
                        </li>
                        <li
                            className={activityFilter === "decorative" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("decorative"); setActivityLabel("Decorative"); }}
                        >
                            Decorative
                        </li>
                        <li
                            className={activityFilter === "fishing" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("fishing"); setActivityLabel("Fishing"); }}
                        >
                            Fishing
                        </li>
                        <li
                            className={activityFilter === "horse and farm" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("horse and farm"); setActivityLabel("Horse & Farm"); }}
                        >
                            Horse & Farm
                        </li>
                        <li
                            className={activityFilter === "household" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("household"); setActivityLabel("Household"); }}
                        >
                            Household
                        </li>
                        <li
                            className={activityFilter === "neckties" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("neckties"); setActivityLabel("Neckties"); }}
                        >
                            Neckties
                        </li>
                        <li
                            className={activityFilter === "rope care" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("rope care"); setActivityLabel("Rope Care"); }}
                        >
                            Rope Care
                        </li>
                        <li
                            className={activityFilter === "scouting" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("scouting"); setActivityLabel("Scouting"); }}
                        >
                            Scouting
                        </li>
                        <li
                            className={activityFilter === "search and rescue" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("search and rescue"); setActivityLabel("Search & Rescue"); }}
                        >
                            Search & Rescue
                        </li>
                        <li
                            className={activityFilter === "surgical" ? "active-sidebar" : ""}
                            onClick={() => { setActivityFilter("surgical"); setActivityLabel("Surgical"); }}
                        >
                            Surgical
                        </li>
                    </ul>
                </aside>


                <main className="content-area">
                    <div className="category-title">
                        <h2>{activityLabel}</h2>
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
                                <Link
                                    to={`/knot/${knot.name}`}
                                    state={{ knot }}
                                    className="knots-card-link"
                                    key={knot.id}
                                >                                    <div className="knots-card">
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
        </div>
    );
};

export default Activities;