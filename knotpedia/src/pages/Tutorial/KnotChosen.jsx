import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./KnotChosen.css";
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from 'react-router-dom';

const KnotChosen = () => {
  const { knotName } = useParams();
  const location = useLocation();
  const [currentKnot, setCurrentKnot] = useState(null);
  const [tagGroups, setTagGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("tutorial");
  
  // Get knot data either from location state or fetch from Firestore
  const { knot: locationKnot, origin } = location.state || {};

  useEffect(() => {
    let isMounted = true;

    const fetchKnotData = async () => {
      try {
        // If we have the full knot data from location state, use that
        if (locationKnot) {
          if (isMounted) {
            setCurrentKnot(locationKnot);
            setLoading(false);
          }
          return;
        }

        // Otherwise fetch by knot name from URL
        if (!knotName) {
          if (isMounted) {
            setLoading(false);
            setError("No knot specified");
          }
          return;
        }

        // Query Firestore for the specific knot
        const knotsQuery = query(
          collection(db, "knots"),
          where("name", "==", knotName)
        );
        
        const querySnapshot = await getDocs(knotsQuery);
        
        if (querySnapshot.empty) {
          if (isMounted) {
            setLoading(false);
            setError(`Knot "${knotName}" not found`);
          }
          return;
        }

        // Get the first matching knot (should be only one)
        const foundKnot = { 
          id: querySnapshot.docs[0].id, 
          ...querySnapshot.docs[0].data() 
        };

        if (isMounted) {
          setCurrentKnot(foundKnot);
          setLoading(false);
        }

      } catch (err) {
        console.error("Error fetching knot data:", err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchKnotData();

    return () => {
      isMounted = false;
    };
  }, [knotName, locationKnot]);

  useEffect(() => {
    // Only fetch related knots if we have a current knot with tags
    if (!currentKnot?.tags?.length) return;

    let isMounted = true;

    const fetchRelatedKnots = async () => {
      try {
        const tagsQuery = query(
          collection(db, "knots"),
          where("tags", "array-contains-any", currentKnot.tags),
          where("__name__", "!=", currentKnot.id)
        );
        
        const querySnapshot = await getDocs(tagsQuery);
        const allKnots = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));

        // Organize by tag
        const groupedByTag = currentKnot.tags.map(tag => ({
          tagName: tag,
          knots: allKnots.filter(k => k.tags?.includes(tag)),
          isExpanded: false
        }));

        if (isMounted) {
          setTagGroups(groupedByTag);
        }
      } catch (err) {
        console.error("Error fetching related knots:", err);
      }
    };

    fetchRelatedKnots();

    return () => {
      isMounted = false;
    };
  }, [currentKnot]);
  const toggleTagGroup = (tagName) => {
    setTagGroups(prevGroups =>
      prevGroups.map(group =>
        group.tagName === tagName
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

  const getSortedSteps = () => {
    if (!currentKnot?.steps) return [];
    
    try {
      // Handle both array and object formats
      const stepsData = Array.isArray(currentKnot.steps) 
        ? currentKnot.steps.map((step, i) => [`Step ${i + 1}`, step])
        : Object.entries(currentKnot.steps);
      
      return stepsData.sort(([a], [b]) => {
        // Extract numbers for numeric comparison
        const numA = parseInt((a.match(/\d+/) || [0])[0]);
        const numB = parseInt((b.match(/\d+/) || [0])[0]);
        return numA - numB;
      });
    } catch (error) {
      console.error("Error processing steps:", error);
      return [];
    }
  };

  const steps = getSortedSteps();

  if (loading) {
    return (
      <div className="knot-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading knot data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="knot-container">
        <div className="error-message">
          <p>⚠️ Error: {error}</p>
          <Link to="/knots/all" className="back-link">
            ← Back to all knots
          </Link>
        </div>
      </div>
    );
  }

  if (!currentKnot) {
    return (
      <div className="knot-container">
        <p>No knot data found.</p>
        <Link to="/knots/all" className="back-link">
          ← Back to all knots
        </Link>
      </div>
    );
  }

  return (
    <>
     <Navbar />
      <div className="subHeader-knot redCover-knot">
        <div className="container">
          <h1>{currentKnot?.name || 'Knot Details'}</h1>
          <p>{currentKnot?.description || ''}</p>
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
) : origin === "AllTypes" ? (
  <Link to="/knots/types">
    <span>All Types</span>
  </Link>
) : (
  <Link to="/knots/all">
    <span>All Knots</span>
  </Link>
)}
          &gt;
          <span className="active">{currentKnot.name}</span>
        </nav>

        <div className="knot-main-content">
          {/* LEFT: Main knot content */}
          <div className="knot-left">
            <img className="imgheadknot" src={currentKnot.image} alt={currentKnot.name} />

          

            <div className="ktab-content">
              
                <div className="ktutorial-content">
                  {steps.length > 0 ? (
                    steps.map(([stepKey, step], index) => (
                      <div key={stepKey} className="kstep">
                        <h3>{stepKey}</h3>
                        <p>{step.description}</p>
                        {step.image && (
                          <img
                            src={step.image}
                            alt={step.description || `Step ${index + 1}`}
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = '/assets/placeholder-knot.jpg';
                            }}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No tutorial steps available.</p>
                  )}
                </div>
              
            
            </div>
          </div>

          {/* RIGHT: Dynamic Tag-Based Sidebar */}
          <div className="knot-sidebar">
            <div className="ksidebar-menu">
              <h3 className="sidebar-title">Related Knots by Tag</h3>
              
              {tagGroups.length > 0 ? (
                tagGroups.map((group) => (
                  <div key={group.tagName} className="sidebar-tag-group">
                    <button
                      className={`sidebar-tag-header ${group.knots.length === 0 ? 'disabled' : ''}`}
                      onClick={() => toggleTagGroup(group.tagName)}
                      disabled={group.knots.length === 0}
                    >
                      {group.tagName}
                      <span className="tag-count">
                        ({group.knots.length})
                      </span>
                      <span className="toggle-icon">
                        {group.isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    
                    {group.knots.length > 0 && (
                      <ul className={`sidebar-knot-list ${group.isExpanded ? 'expanded' : ''}`}>
                        {group.knots.map((knotItem) => (
                          <li key={knotItem.id}>
                            <Link
                              to={`/knot/${knotItem.id}`}
                              state={{ knot: knotItem, origin }}
                              className={knotItem.id === currentKnot.id ? 'active-knot' : ''}
                            >
                              {knotItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-tags-message">No tags available for this knot.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KnotChosen;