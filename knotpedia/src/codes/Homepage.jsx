import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Homepage.css";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Homepage = () => {
    const [knots, setKnots] = useState([]);

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

    return (
        <div>
            <Navbar />
            {/* <main className="content-container"> */}
            {/* Header Section */}
            <header className="home-header">
                <div className="text-space">
                    <h1 style={{fontSize: '40px'}}>
                        The <span className="blue-text">Ultimate</span> <span className="red-text">Knot</span> Guide
                    </h1>
                    <p className="p-width">
                        Explore <b>Knotpedia</b>, your go-to resource for learning and mastering
                        knots. Discover detailed guides, step-by-step tutorials, and
                        practical uses for various knots in everyday life, survival,
                        and specialized fields.
                    </p>
                    <button className="button blue">View All Knots</button>
                </div>
            </header>

            {/* Feature Section */}
            <div className="" >
            <section className="section-features">
                <h1>
                    Begin Your <span className="blue-text">Knot</span> <span className="red-text">Journey</span>
                </h1>

                <div className="box-container" >
                    <a href="/activity" className="box" style={{ backgroundColor: "#0d6287" }}>
                        <div className="icon">
                            <img src="/assets/home-activity.png" alt="Activity Icon" />
                        </div>
                        <div className="main-text">
                            <span className="small-text">Knots by</span><br />
                            <span className="big-text">Activity</span>
                        </div>
                        <div className="sub-text">Find the perfect knot for any task!</div>
                    </a>

                    <a href="/type" className="box" style={{ backgroundColor: "#5192A5" }}>
                        <div className="icon">
                            <img src="/assets/home-type.png" alt="Type Icon" />
                        </div>
                        <div className="main-text">
                            <span className="small-text">Knots by</span><br />
                            <span className="big-text">Type</span>
                        </div>
                        <div className="sub-text">Explore knots by category.</div>
                    </a>

                    <a href="/difficulty" className="box" style={{ backgroundColor: "#b54d49" }}>
                        <div className="icon">
                            <img src="/assets/home-difficulty.png" alt="Difficulty Icon" />
                        </div>
                        <div className="main-text">
                            <span className="small-text">Knots by</span><br />
                            <span className="big-text">Difficulty</span>
                        </div>
                        <div className="sub-text">Discover knots from beginner to expert.</div>
                    </a>
                </div>
            </section>

            {/* Featured Knots Section */}
            <section className="featured-knots" style={{backgroundColor: '#5192A5'}}>
                <h1 style={{color: 'white'}}>Featured Knots</h1>
                <button className="button blue">View All Knots</button>
                <div className="content-container" >
                <div className="knots-container">
                    {knots.map((knot) => (
                        <a href={`/knot/${knot.id}`} className="knot-card" key={knot.id}>
                            <div className="knot-image">
                                <img src={knot.image} alt={knot.name} />
                            </div>
                            <h3 className="knot-name">{knot.name}</h3>
                            <p className="knot-description">{knot.description}</p>
                            <button className="button red">View Knot</button>
                        </a>
                    ))}

                    {knots.map((knot) => (
                        <a href={`/knot/${knot.id}`} className="knot-card" key={knot.id}>
                            <div className="knot-image">
                                <img src={knot.image} alt={knot.name} />
                            </div>
                            <h3 className="knot-name">{knot.name}</h3>
                            <p className="knot-description">{knot.description}</p>
                            <button className="button red">View Knot</button>
                        </a>
                    ))}

                    {knots.map((knot) => (
                        <a href={`/knot/${knot.id}`} className="knot-card" key={knot.id}>
                            <div className="knot-image">
                                <img src={knot.image} alt={knot.name} />
                            </div>
                            <h3 className="knot-name">{knot.name}</h3>
                            <p className="knot-description">{knot.description}</p>
                            <button className="button red">View Knot</button>
                        </a>
                    ))}

                    {knots.map((knot) => (
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
                        </div>
            </section>
            </div>
            {/* </main> */}
            <Footer />
        </div>
    );
};

export default Homepage;
