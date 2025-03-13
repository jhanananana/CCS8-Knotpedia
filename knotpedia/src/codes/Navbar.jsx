import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/logo.png" className="navbar-logo" alt="Knotpedia Logo" />
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      <ul className={`navbar-links ${menuOpen ? "mobile show" : ""}`}>
        <li><a href="#">Home</a></li>
        <li className="dropdown">
          <a href="#">Explore Knots</a>
          <ul className="dropdown-menu">
            <li><a href="#">Knots by Activity</a></li>
            <li><a href="#">Knots by Type</a></li>
            <li><a href="#">Knots by Difficulty</a></li>
          </ul>
        </li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Site Map</a></li>
        <li><a href="#">Preferences</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
