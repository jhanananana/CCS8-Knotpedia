import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setShowDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/assets/logo.png" className="navbar-logo" alt="Knotpedia Logo" />
        </Link>
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <b>☰</b>
        </button>
      </div>
      <ul className={`navbar-links ${menuOpen ? "mobile show" : ""}`}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        <li className={isMobile ? "" : "dropdown"}>
          <div
            className={`dropdown-toggle ${showDropdown ? "active" : ""}`}
            onClick={() => setShowDropdown(!showDropdown)} // This toggles the dropdown state
          >
            Explore Knots
            <i style={{marginLeft: '5px', fontSize: '10px'}} className={`fas fa-chevron-down ${showDropdown ? "active" : ""}`}></i>
          </div>


          {isMobile ? (
            <div className={`dropdown-submenu ${showDropdown ? "show" : ""}`}>
              <Link to="/AllKnots" className={location.pathname === "/AllKnots" ? "active" : ""}>
                All Knots
              </Link>
              <Link to="/activity-knots" className={location.pathname === "/activity-knots" ? "active" : ""}>
                Knots by Activity
              </Link>
              <Link to="/type-knots" className={location.pathname === "/type-knots" ? "active" : ""}>
                Knots by Type
              </Link>
              <Link to="/difficulty-knots" className={location.pathname === "/difficulty-knots" ? "active" : ""}>
                Knots by Difficulty
              </Link>
            </div>
          ) : (
            <ul className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <li>
                <Link to="/AllKnots">All Knots</Link>
              </li>
              <li>
                <Link to="/activity-knots">Knots by Activity</Link>
              </li>
              <li>
                <Link to="/type-knots">Knots by Type</Link>
              </li>
              <li>
                <Link to="/difficulty-knots">Knots by Difficulty</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/ContactUs" className={location.pathname === "/ContactUs" ? "active" : ""}>
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/AboutUs" className={location.pathname === "/AboutUs" ? "active" : ""}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/SiteMap" className={location.pathname === "/SiteMap" ? "active" : ""}>
            Site Map
          </Link>
        </li>
        <li>
          <Link to="/Preferences" className={location.pathname === "/Preferences" ? "active" : ""}>
            Preferences
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
