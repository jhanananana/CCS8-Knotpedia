import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import "./Homepage.css";
import BackToTop from '../Components/BackToTop.jsx';
import { db } from "../../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    const [knots, setKnots] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && searchTerm) {
            handleSearch();
        }
    };

    return (
        <div>
            <Navbar />
            <header className="home header" >
                <div className="container">
                    <div className="content-wrapper">
                        <div className="text-space">
                            <h1>
                                The <span className="blue-text">Ultimate</span> <span className="red-text">Knot</span> Guide
                            </h1>
                            <p>
                                Explore <b>Knotpedia</b>, your go-to resource for learning and mastering
                                knots. Discover detailed guides, step-by-step tutorials, and
                                practical uses for various knots in everyday life, survival,
                                and specialized fields.
                            </p>
                            <div className="home-search-bar">
                                <div className="search-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Search for a knot..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={handleKeyPress} // Add the key press handler here
                                    />
                                    {searchTerm && (
                                        <span className="home-clear-icon" onClick={() => setSearchTerm("")}>✖</span>
                                    )}
                                    <button
                                        className="home-search-button"
                                        onClick={handleSearch} // Use the search handler here
                                    >
                                        <img src="/assets/search.png" alt="Search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="video-container">
                            <video controls>
                                <source src="path-to-your-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <section className="section-features flex-align-start">
                    <div className="text-column">
                        <span className="title-tag blueBg">Categories</span>
                        <h2>Begin Your <span className="blue-text">Knot</span> <span className="red-text">Journey</span></h2>
                        <p>Master the art of tying with confidence by exploring a variety of knots suited for different needs.</p>
                    </div>
                    <div className="box-column">
                        <a href="/type" className="box" style={{ backgroundColor: "#5192A5" }}>
                            <div className="icon">
                                <img src="/assets/home-type.png" alt="Type Icon" />
                            </div>
                            <div className="main-text">
                                <span className="big-text">Knots by Type</span>
                            </div>
                            <div className="sub-text">Explore knots by category.</div>
                        </a>
                        <a href="/activity" className="box" style={{ backgroundColor: "#0d6287" }}>
                            <div className="icon">
                                <img src="/assets/home-activity.png" alt="Activity Icon" />
                            </div>
                            <div className="main-text">
                                <span className="big-text">Knots by Activity</span>
                            </div>
                            <div className="sub-text">Find the perfect knot for any task!</div>
                        </a>

                    </div>
                </section>
            </div>

            <section className="featured-knots">
                <span className="title-tag redBg">FEATURED</span>
                <h2 style={{ color: 'white' }}>Must-Know Knots</h2>
                <p style={{ color: 'white' }}>These are the essential knots that everyone should learn for
                    daily tasks, outdoor adventures, and emergency situations. </p>
                <div className="container">
                    <div className="knots-container">
                        {knots.map((knot) => (
                            <Link
                                to={`/KnotChosen/${knot.id}`}
                                state={{ knot }} // Pass knot data via state
                                className="knot-card"
                                key={knot.id}
                            >
                                <div className="knot-image">
                                    <img src={knot.image} alt={knot.name} />
                                </div>
                                <h3 className="knot-name">{knot.name}</h3>
                                <p className="featured-knot-description">{knot.description}</p>
                                <div className="button-container">
                                    <button className="button red">View Knot</button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <a href="/AllKnots/"><button className="button blue">View All Knots</button> </a>
            </section>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Homepage;
