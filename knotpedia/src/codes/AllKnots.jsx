import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./AllKnots.css";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const AllKnots = () => {
    const [knots, setKnots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const knotsPerPage = 12;

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

    const indexOfLastKnot = currentPage * knotsPerPage;
    const indexOfFirstKnot = indexOfLastKnot - knotsPerPage;
    const currentKnots = knots.slice(indexOfFirstKnot, indexOfLastKnot);

    const totalPages = Math.ceil(knots.length / knotsPerPage);

    return (
        <div>
            <Navbar />
            <div className="content-container">
                <header className="allknots-header">
                    <h1 style={{ fontSize: '40px' }}>
                        Complete <span className="blue-text">Knot List</span>
                    </h1>
                    <p className="p-width">
                        Browse our complete list of knots, including step-by-step guides,
                        practical uses, and detailed explanations for various applications.
                    </p>
                </header>

                {/* SEARCH BAR */}
                <div className="search-container">
                    Search for a knot
                    <div className="search-bar">
                        <input type="text" placeholder="I'm looking for..." />
                        <span className="search-icon">🔍</span> {/* Navigation Icon */}
                    </div>
                </div>

                <div className="letter-filter">
                    <span className="letter-main">Alphabetical Filter:</span>
                    <div className="letter-buttons">
                        {Array.from({ length: 26 }, (_, i) => (
                            <button key={i} className="letter-btn">
                                {String.fromCharCode(65 + i)}
                            </button>
                        ))}
                    </div>
                </div>
                <p>Showing {Math.min(indexOfFirstKnot + 1, knots.length)}-{Math.min(indexOfLastKnot, knots.length)} of {knots.length} knots</p>

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

            </div>
        </div>
    );
};

export default AllKnots;