import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const location = useLocation(); // Get the current URL path

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isShrunk ? "shrink" : ""}`}>
      <div className="navbar-left">
        <Link to="/"><img src="/assets/logo.png" className="navbar-logo" alt="Knotpedia Logo" /></Link>
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}><b>☰</b></button>
      </div>
      <ul className={`navbar-links ${menuOpen ? "mobile show" : ""}`}>
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
        <li className="dropdown">
          <a href="#">Explore Knots <span style={{fontSize: "13px"}}> &nbsp;▼</span></a>
          <ul className="dropdown-menu">
            <li><Link to="/AllKnots" className={location.pathname === "/AllKnots" ? "active" : ""}>All Knots</Link></li>
            <li><Link to="/activity-knots" className={location.pathname === "/activity-knots" ? "active" : ""}>Knots by Activity</Link></li>
            <li><Link to="/type-knots" className={location.pathname === "/type-knots" ? "active" : ""}>Knots by Type</Link></li>
            <li><Link to="/difficulty-knots" className={location.pathname === "/difficulty-knots" ? "active" : ""}>Knots by Difficulty</Link></li>
          </ul>
        </li>
        <li><Link to="/ContactUs" className={location.pathname === "/ContactUs" ? "active" : ""}>Contact Us</Link></li>
        <li><Link to="/AboutUs" className={location.pathname === "/AboutUs" ? "active" : ""}>About Us</Link></li>
        <li><Link to="/SiteMap" className={location.pathname === "/SiteMap" ? "active" : ""}>Site Map</Link></li>
        <li><Link to="/Preferences" className={location.pathname === "/Preferences" ? "active" : ""}>Preferences</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
