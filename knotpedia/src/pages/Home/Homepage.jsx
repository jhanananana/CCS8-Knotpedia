import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import "./Homepage.css";
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

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

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
                                        <span className="home-clear-icon" title="Clear" onClick={() => setSearchTerm("")}>✖</span>
                                    )}
                                    <button
                                        className="home-search-button"
                                        onClick={handleSearch} // Use the search handler here
                                    >
                                        <img src="/assets/search red.png" alt="Search" title="Search"/>
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
                        <h2>Begin Your <span className="blue-text">Knot</span> <span className="red-text">Journey</span></h2>
                        <p>Master the art of tying with confidence by exploring a variety of knots suited for different needs.</p>
                        <a href="/knots/all">
                            <button className="button red" style={{margin: '0px'}}>View All Knots</button>
                        </a>
                    </div>
                    <div className="box-column">
                        <a href="/knots/types" className="box" style={{ backgroundColor: "#5192A5" }}>
                            <div className="icon">
                                <img src="/assets/home-type.png" title="Knots by Type" alt="Knots by Type" />
                            </div>
                            <div className="main-text">
                                <span className="big-text">Knots by Type</span>
                            </div>
                            <div className="sub-text">Explore knots by category.</div>
                        </a>
                        <a href="/knots/activities" className="box" style={{ backgroundColor: "#0d6287" }}>
                            <div className="icon">
                                <img src="/assets/home-activity.png" title="Knots by Activity" alt="Knots by Activity" />
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
                <h2>Must-Know Knots</h2>
                <div className="container">
                <a href="/knots/all">
                    <button className="button-darkred">View All Knots</button>
                </a>
                    <div className="allknots-container">
                        {knots.length > 0 && (
                            shuffleArray([...knots]) 
                                .slice(0, 8)
                                .map((knot) => (
                                    <Link
                                        to={`/knot/${knot.name}`}
                                        state={{ knot }}
                                        className="knots-card"
                                        key={knot.id}
                                    >
                                        <div className="knots-image">
                                            <img src={knot.image} alt={knot.name} />
                                        </div>
                                        <h3 className="knots-name">{knot.name}</h3>
                                        <p style={{fontSize: '1.1rem'}} className="knots-description">{knot.description}</p>
                                        <div className="button-container">
                                            <button className="button red">View Knot</button>
                                        </div>
                                    </Link>
                                ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Homepage;
