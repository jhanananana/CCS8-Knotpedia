import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./KnotChosen.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust to your firebase config
import { Link } from 'react-router-dom';
const KnotChosen = () => {
  const location = useLocation();
  const [fetchedKnot, setFetchedKnot] = useState(null);

  const { knot, origin } = location.state || {};
  const [activeTab, setActiveTab] = useState("tutorial");

  useEffect(() => {
    const fetchMatchingKnot = async () => {
      if (!knot?.id) return;

      try {
        const knotsCollection = collection(db, "knots");
        const querySnapshot = await getDocs(knotsCollection);

        querySnapshot.forEach((docSnap) => {
          if (docSnap.id === knot.id) {
            const data = docSnap.data();
            setFetchedKnot({ ...knot, ...data });
          }
        });
      } catch (error) {
        console.error("Error fetching knots:", error);
      }
    };

    fetchMatchingKnot();
  }, [knot]);

  if (!knot) {
    return (
      <div className="knot-container">
        <p>⚠️ No knot data found. Please go back and select a knot.</p>
      </div>
    );
  }

  const currentKnot = fetchedKnot || knot;

  const steps = currentKnot?.steps
    ? Object.entries(currentKnot.steps).sort(([a], [b]) =>
        a.localeCompare(b, undefined, { numeric: true })
      )
    : [];

  return (
    <>
      <Navbar />
      <div className="subHeader-knot redCover-knot">
        <div className="container">
          <h1>{currentKnot.name}</h1>
          <p>{currentKnot.description}</p>
        </div>
      </div>
  <div className="knot-container">
  <nav className="breadcrumb">
  <Link to="/">
    <img src="/assets/home-icon.png" alt="Home" />
    <span>Home</span>
  </Link>
  &gt;
  {origin === "AllActivities" ? (
    <Link to="/knots/activities">
      <span>All Activities</span>
    </Link>
  ) : (
    <Link to="/knots/all">
      <span>All Knots</span>
    </Link>
  )}
  &gt;
  <span className="active">{currentKnot.name}</span>
</nav>

  <img className="imgheadknot" src={currentKnot.image} />

  {/* Knot Image */}
  
    

     
        <h1 className="knot-title"></h1>
        <p className="knot-description"></p>

        <div className="tab-buttons">
          <button
            className={activeTab === "tutorial" ? "active" : ""}
            onClick={() => setActiveTab("tutorial")}
          >
            Tutorial
          </button>
          <button
            className={activeTab === "safety" ? "active" : ""}
            onClick={() => setActiveTab("safety")}
          >
            Safety
          </button>
          <button
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        <div className="ktab-content">
          {activeTab === "tutorial" && (
            <div className="ktutorial-content">
              {steps.map(([stepKey, step], index) => (
                <div key={stepKey} className="kstep">
                  <h3>{stepKey}</h3>
                  <p>{step.description}</p>
                  <img
                    src={step.image}
                    alt={step.description || `Step ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
          {activeTab === "safety" && (
            <div className="safety-content">
              <p>{currentKnot.safety || "No safety information available."}</p>
            </div>
          )}
          {activeTab === "history" && (
            <div className="history-content">
              <p>{currentKnot.history || "No history available."}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KnotChosen;
