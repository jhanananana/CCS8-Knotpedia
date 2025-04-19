import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import BackToTop from "../Components/BackToTop.jsx";
import "./Search.css"; 
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const searchQuery = useQuery().get("query") || "";
    const [knots, setKnots] = useState([]);
    const [filteredKnots, setFilteredKnots] = useState([]);

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

    useEffect(() => {
        const results = knots.filter(knot =>
            knot.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredKnots(results);
    }, [knots, searchQuery]);

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Search Results for: <span style={{ color: "#0d6287" }}>{searchQuery}</span></h1>
                {filteredKnots.length > 0 ? (
                    <div className="searchKnot-container">
                        {filteredKnots.map((knot) => (
                            <Link
                                to={`/KnotChosen/${knot.id}`}
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
                ) : (
                    <p>No knots found for "{searchQuery}"</p>
                )}
            </div>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Search;
