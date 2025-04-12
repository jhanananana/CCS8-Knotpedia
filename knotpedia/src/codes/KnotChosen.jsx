import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./KnotChosen.css";
const KnotChosen = () => {
    const location = useLocation();
    const { knot } = location.state || {}; // Access the knot data from location.state

    console.log("Received knot data:", knot); // Check if the knot data is passed correctly

    if (!knot) {
        return (
            <div className="knot-container">
                <p>⚠️ No knot data found. Please go back and select a knot.</p>
            </div>
        );
    }

    const steps = knot?.steps || []; // Use the knot's steps if available

    return (
        <>
            <Navbar />
            <div className="knot-container">
                <h1 className="knot-title">{knot.name}</h1>
                <p className="knot-description">{knot.description}</p>
                {/* Render steps and other data */}
            </div>
            <Footer />
        </>
    );
};

export default KnotChosen;
