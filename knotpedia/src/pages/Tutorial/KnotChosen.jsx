import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./KnotChosen.css";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust to your firebase config

const KnotChosen = () => {
  const location = useLocation();
  const { knot } = location.state || {};
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
            // update the steps with the one from DB (ensures latest data)
            knot.steps = data.steps;
     
            console.log("Working");
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
  

  
  const steps = knot?.steps? Object.entries(knot.steps).sort(([a], [b]) =>
     a.localeCompare(b, undefined, { numeric: true })
    )
  : [];


  return (
    <>
      <Navbar />
      <div className="knot-container">
        <h1 className="knot-title">{knot.name}</h1>
        <p className="knot-description">{knot.description}</p>

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

        <div className="tab-content">
          {activeTab === "tutorial" && (
            <div className="tutorial-content">
              {steps.map(([stepKey, step], index) => (
                <div key={stepKey} className="step">
                  <h3>{stepKey}</h3>
                  <p>{step.description}</p>
                  <img src={step.image} alt={step.description || `Step ${index+1}`} />
                </div>
              ))}
            </div>
          )}
          {activeTab === "safety" && (
            <div className="safety-content">
              <p>{knot.safety || "No safety information available."}</p>
            </div>
          )}
          {activeTab === "history" && (
            <div className="history-content">
              <p>{knot.history || "No history available."}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KnotChosen;
