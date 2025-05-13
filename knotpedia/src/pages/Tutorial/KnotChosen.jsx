import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Pagination from '../Components/Pagination';
import "./KnotChosen.css";
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const KnotChosen = () => {
  const { knotName } = useParams();
  const location = useLocation();
  const [currentKnot, setCurrentKnot] = useState(null);
  const [tagGroups, setTagGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState("tutorial");
  const [currentPage, setCurrentPage] = useState(1);
  const stepsPerPage = 4;

  // Get knot data either from location state or fetch from Firestore
  const { knot: locationKnot, origin } = location.state || {};

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openImageModal = (imgSrc) => {
    setFullscreenImage(imgSrc);
  };

  const closeImageModal = () => {
    setFullscreenImage(null);
  };

  // Pagination functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const saveToPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    setIsGeneratingPDF(true); // Show loading modal
    input.style.display = 'block';

    try {
      // Wait a frame to ensure layout is complete
      await new Promise(resolve => setTimeout(resolve, 100));

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margin
      const contentWidth = pdfWidth - margin * 2;

      // Create a canvas for each step to control page breaks
      const steps = input.querySelectorAll('.pdf-step');

      let currentY = margin;

      // Add title
      pdf.setFontSize(24);
      pdf.text(currentKnot?.name || 'Knot Guide', margin, currentY);
      currentY += 10;

      for (const step of steps) {
        const canvas = await html2canvas(step, {
          scale: 3,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false // Disable console logging for better performance
        });

        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);

        // Calculate image dimensions to fit content width
        const imgWidth = contentWidth / 1.5;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        // Check if we need a new page
        if (currentY + imgHeight > pdfHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }

        // Add the step to the PDF
        pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10; // Add some spacing between steps
      }

      pdf.save(`${currentKnot.name || "knot"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You could add error handling here if needed
    } finally {
      setIsGeneratingPDF(false); // Hide loading modal
      input.style.display = 'none';
    }
  };

  useEffect(() => {
    if (isGeneratingPDF) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isGeneratingPDF]);

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
  const totalPages = Math.ceil(steps.length / stepsPerPage);
  const currentSteps = steps.slice(
    (currentPage - 1) * stepsPerPage,
    currentPage * stepsPerPage
  );

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

      {fullscreenImage && (
        <div className="fullscreen-modal" onClick={closeImageModal}>
          <img src={fullscreenImage} alt="Full screen view" />
          <button className="close-btn" onClick={closeImageModal}>✖</button>
        </div>
      )}

      <div className="knot-container">
        <nav className="breadcrumb">
          <Link to="/">
            <img src="/assets/home-icon.png" alt="Home" />
            <span>Home</span>
          </Link>
          &gt;
          {origin === "AllActivities" ? (
            <Link to="/knots/activities">
              <span>Knots by Activities</span>
            </Link>
          ) : origin === "AllTypes" ? (
            <Link to="/knots/types">
              <span>Knots by Type</span>
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
            <div className="main-image-wrapper">
              <img
                className="imgheadknot"
                src={currentKnot.image}
                alt={currentKnot.name}
                title={currentKnot.name}
                onClick={() => openImageModal(currentKnot.image)} // Optional: allow image click
              />
              <button
                className="fullscreen-btn"
                onClick={() => openImageModal(currentKnot.image)}
                aria-label="View full screen"
              >
                ⛶
              </button>
            </div>
            <div className="tab-buttons-container">
              <button className="button red" style={{ fontSize: '1rem' }} onClick={saveToPDF}>
                Save as PDF
              </button>
              <hr></hr>
              <div className="pill-tabs">
                <button
                  className={`pill-tab ${activeTab === 'tutorial' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tutorial')}
                >
                  Step-by-Step Tutorial
                </button>
                <button
                  className={`pill-tab1 ${activeTab === 'uses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('uses')}
                >
                  Uses & Caution
                </button>
              </div>
            </div>

<hr></hr>
            <div className="ktab-content">
              {activeTab === 'tutorial' && (
                <div className="ktutorial-content">
                  {currentSteps.length > 0 ? (
                    currentSteps.map(([stepKey, step], index) => (
                      <div key={stepKey} className="kstep">
                        <h3>{stepKey.replace(/\b\w/g, c => c.toUpperCase())}</h3>
                        <p>{step.description}</p>
                        {step.image && (
                          <div className="image-wrapper">
                            <img
                              src={step.image}
                              alt={step.description || `Step ${index + 1}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/placeholder-knot.jpg';
                              }}
                              className="step-image"
                              onClick={() => openImageModal(step.image)}
                            />
                            <button
                              className="fullscreen-btn"
                              onClick={() => openImageModal(step.image)}
                              aria-label="View full screen"
                            >
                              ⛶
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No tutorial steps available.</p>
                  )}
                  <br></br>
                
                      
                
                </div>
              )}
              {activeTab === 'uses' && (
                <div className="kuses-content">
                  <p><div className="info-title">USES </div><br></br>{currentKnot.uses || "No uses information available."}</p>
                  <p ><div className="info-title">CAUTION  </div><br></br>{currentKnot.caution || "No uses information available."}</p>
                </div>
              )}
            </div>
            {activeTab === 'tutorial' && (   <Pagination
                             currentPage={currentPage}
                              totalPages={totalPages}
                             onPageChange={setCurrentPage}
                        />)}



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

      {/* PDF DOWNLOADABLE CONTENT */}
      <div
        id="pdf-content"
        style={{
          display: 'none',
          width: '210mm',
          padding: '20mm',
          fontFamily: 'Poppins, sans-serif',
          color: '#333',
        }}
      >
        {steps.length > 0 ? (
          Array.from({ length: Math.ceil(steps.length / 2) }, (_, rowIndex) => {
            const start = rowIndex * 2;
            const rowSteps = steps.slice(start, start + 2);

            return (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10mm',
                  marginBottom: '20mm',
                  pageBreakInside: 'avoid',
                }}
              >
                {rowSteps.map(([stepKey, step], index) => (
                  <div
                    key={stepKey}
                    className="pdf-step"
                    style={{
                      flex: 1,
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      padding: '10mm',
                      boxSizing: 'border-box',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '16pt',
                        margin: '0 0 6px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {stepKey}
                    </h3>
                    <p
                      style={{
                        fontSize: '12pt',
                        margin: '0 0 10px',
                        lineHeight: '1.4',
                      }}
                    >
                      {step.description}
                    </p>
                    {step.image && (
                      <img
                        src={step.image}
                        alt={step.description || `Step ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          marginTop: '10px',
                          borderRadius: '6px',
                          border: '1px solid #ddd',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/placeholder-knot.jpg';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <p style={{ fontSize: '14pt', textAlign: 'center' }}>No steps available.</p>
        )}
      </div>


      {/* Loading Modal */}
      {isGeneratingPDF && (
        <div className="pdf-loading-modal">
          <div className="pdf-loading-content">
            <div className="pdf-loading-spinner"></div>
            <p>Generating PDF...</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default KnotChosen;